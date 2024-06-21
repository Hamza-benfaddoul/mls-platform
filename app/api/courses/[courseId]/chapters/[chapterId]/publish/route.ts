import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { currentUser } from '@/lib/auth';

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } },
) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: user.userId,
      },
    })

    if (!courseOwner) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const chapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
    })

    const MuxData = await db.muxData.findUnique({
      where: {
        chapterId: params.chapterId,
      },
    })

    if (
      !chapter ||
      !chapter.title ||
      !chapter.description
      /* !chapter.videoUrl ||
      !MuxData || */
    ) {
      return new NextResponse('Messing required fields', { status: 400 })
    }

    const pulishedChapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        isPublished: true,
      },
    })
    return NextResponse.json(pulishedChapter)
  } catch (error) {
    console.log('[CHAPTRE_PUPLISH]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
