import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; attachmentId: string } },
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    })
    console.log('userId', userId)
    console.log('courseId', params.courseId)
    console.log('attachmentId', params.attachmentId)

    console.log('[COURSE_ID_ATTACHMENTS]', courseOwner)
    if (!courseOwner) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const attachment = await db.attachment.delete({
      where: {
        courseId: params.courseId,
        id: params.attachmentId,
      },
    })

    return NextResponse.json(attachment)
  } catch (error) {
    console.log('[COURSE_ID_ATTACHMENTS]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
