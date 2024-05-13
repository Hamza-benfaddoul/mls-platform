import { Category, Chapter, Course } from '@prisma/client'
import { getProgress } from '@/actions/getProgress'

import { db } from '@/lib/db'

type CourseWithProgressWithCategory = Course & {
  category: Category
  chapters: Chapter[]
  progress: number | null
}
type DashboardCourses = {
  completedCourses: CourseWithProgressWithCategory[]
  coursesInProgress: CourseWithProgressWithCategory[]
}
export const getDashboardCourses = async (
  userId: string,
): Promise<DashboardCourses> => {
  try {
    const purchaseCourses = await db.purchase.findMany({
      where: {
        userId,
      },
      select: {
        course: {
          include: {
            category: true,
            chapters: {
              where: {
                isPublished: true,
              },
            },
          },
        },
      },
    })

    const courses = purchaseCourses.map(
      (purchase) => purchase.course,
    ) as CourseWithProgressWithCategory[]

    for (let course of courses) {
      const progress = await getProgress(userId, course.id)
      course['progress'] = progress
    }

    const completedCourses = courses.filter((course) => course.progress === 100)
    const coursesInProgress = courses.filter(
      (course) => (course.progress ?? 0) < 100,
    )
    return {
      completedCourses,
      coursesInProgress,
    }
  } catch (error) {
    console.log('[GET_DASHBOARD_COURSES_ERROR]', error)
    return {
      completedCourses: [],
      coursesInProgress: [],
    }
  }
}
