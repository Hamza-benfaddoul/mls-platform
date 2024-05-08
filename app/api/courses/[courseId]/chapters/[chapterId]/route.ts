import { NextResponse } from 'next/server'

import Mux from '@mux/mux-node'

import { auth } from '@clerk/nextjs/server'

import { db } from '@/lib/db'

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET
});

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } },
) {
  try {
    const { userId } = auth()
    const { isPublished, ...values } = await req.json()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    })

    if (!courseOwner) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const chapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        ...values,
      },
    })

    if (values.videoUrl) {
      const existingMuxVideo = await db.muxData.findFirst({
        where: {
          chapterId: params.chapterId,
        },
      })
      if (existingMuxVideo) {
        await mux.video.assets.delete(existingMuxVideo.assetId)
        await db.muxData.delete({
          where: {
            id: existingMuxVideo.id,
          },
        })
      }
    }


    const asset = await mux.video.assets.create({
      input: values.videoUrl,
      playback_policy: ['public'],
      test: false
    })


    await db.muxData.create({
      data: {
        assetId: asset.id,
        chapterId: params.chapterId,
        playbackId: asset.playback_ids?.[0]?.id,
      },
    })

    return NextResponse.json(chapter)
  } catch (error) {
    console.log('[COURSE_CHAPTER_ID]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
