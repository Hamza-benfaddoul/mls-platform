import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

import { db } from '@/lib/db'

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } },
) {
  try {
    const { userId } = auth()

    const { property, value } = await req.json()

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

    const lastTrainingDetail = await db.trainingDetails.findFirst({
      where: {
        courseId: params.courseId,
      },
      orderBy: {
        position: 'desc',
      },
    })

    const newPosition = lastTrainingDetail ? lastTrainingDetail.position + 1 : 1

    const trainingDetail = await db.trainingDetails.create({
      data: {
        userId: userId,
        courseId: params.courseId,
        position: newPosition,
        value: value,
        property: property,
      },
    })
    return NextResponse.json(trainingDetail)
  } catch (error) {
    console.log('[TRAINING DETAILS]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string } },
) {
  try {
    const { userId } = auth()
    const {id, property, value } = await req.json()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const coureseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    })

    if (!coureseOwner) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    await db.trainingDetails.update({
      where: {
        courseId: params.courseId,
        id: id,
      },
      data: { property: property, value: value },
    })

    return NextResponse.json('Success', { status: 200 })
  } catch (error) {
    console.log('[REORDER]', error)
    return new NextResponse('Internal Erroor', { status: 500 })
  }
}
