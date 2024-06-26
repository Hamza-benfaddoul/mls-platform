import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { currentUser } from '@/lib/auth'

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } },
) {

    console.log(
      'hamza', params.courseId
    )
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: user.userId,
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
        userId: user.userId,
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
