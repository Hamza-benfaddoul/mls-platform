
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

    const course= await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
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
