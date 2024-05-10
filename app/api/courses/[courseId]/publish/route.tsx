import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } },
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    })

    if (!course) {
      return new NextResponse('Not found', { status: 404 })
    }

    const hasPublishedChapters = course.chapters.some((chapter) => chapter.isPublished)

    if (
      !course||
      !course.title ||
      !course.description ||
      !course.price ||
      !course.imageUrl ||
/*       !course.categoryId || */
      !hasPublishedChapters
    ) {
      return new NextResponse('Messing required fields', { status: 400 })
    }

    const pulishedCourse = await db.course.update({
      where: {
        id: params.courseId,
        userId: userId,
      },
      data: {
        published: true,
      },
    })
    return NextResponse.json(pulishedCourse)
    
  } catch (error) {
    console.log('[COURSE_PUPLISH]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
