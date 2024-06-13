
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

import { db } from '@/lib/db'

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string } },
) {
  try {
    const { userId } = auth()
    const { list } = await req.json()

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

    for (let item of list) {
      await db.trainingDetails.update({
        where: { id: item.id },
        data: { position: item.position, },
      })
    }

    return NextResponse.json('Success', { status: 200 })
  } catch (error) {
    console.log('[REORDER]', error)
    return new NextResponse('Internal Erroor', { status: 500 })
  }
}
