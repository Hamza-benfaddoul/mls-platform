import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { currentUser } from '@/lib/auth';

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } },
) {
  try {
    const  user =await currentUser();

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

    const unpulishedChapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        isPublished: false,
      },
    })

    const publishedChapter = await db.chapter.findMany({
      where: {
        courseId: params.courseId,
        isPublished: true,
      },
    })
    if (!publishedChapter.length) {
      await db.course.update({
        where: {
          id: params.courseId,
        },
        data: {
          published: false,
        },
      })
    }
    return NextResponse.json(unpulishedChapter)
  } catch (error) {
    console.log('[CHAPTRE_UNPUPLISH]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
