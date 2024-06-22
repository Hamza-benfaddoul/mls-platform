
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { currentUser } from '@/lib/auth'

export async function PATCH(
  { params }: { params: { courseId: string } },
) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const course= await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: user.userId,
      },
    })

    if (!course) {
      return new NextResponse('Unauthorized', { status: 401 })
    }



    const unPulishedCourse = await db.course.update({
      where: {
        id: params.courseId
      },
      data: {
        published: false,
      },
    })
    return NextResponse.json(unPulishedCourse)
  } catch (error) {
    console.log('[COURSE_UNPUPLISH]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
