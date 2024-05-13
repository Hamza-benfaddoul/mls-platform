import { db } from '@/lib/db'
import { Course, Purchase } from '@prisma/client'

type PurchaseWithCourse = Purchase & {
  course: Course
}

const groupByCourse = (purcheses: PurchaseWithCourse[]) => {
  const grouped: { [courseTitle: string]: number } = {}

  purcheses.forEach((purchase) => {
    const courseTitle = purchase.course.title
    if (!grouped[courseTitle!]) {
      grouped[courseTitle!] = 0
    }
    grouped[courseTitle!] += purchase.course.price!
  })
  return grouped
}

export const getAnalytics = async (userId: string) => {
  try {
    const purcheses = await db.purchase.findMany({
      where: {
        userId,
      },
      include: {
        course: true,
      },
    })

    const groupedEarnings = groupByCourse(purcheses)
    const data = Object.entries(groupedEarnings).map(
      ([courseTitle, total]) => ({ name: courseTitle, total }),
    )
    const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0)
    const totalSales = purcheses.length

    return {
      data,
      totalRevenue,
      totalSales,
    }
  } catch (error) {
    console.log('[GET_ANALYTICS_ERROR]', error)
    return {
      data: [],
      totalRevenue: 0,
      totalSales: 0,
    }
  }
}
