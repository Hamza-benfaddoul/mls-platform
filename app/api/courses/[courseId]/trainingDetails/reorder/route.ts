
import { NextResponse } from 'next/server'

import { db } from '@/lib/db'
import { currentUser } from '@/lib/auth'

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string } },
) {
  try {
    const user = await currentUser()
    const { list } = await req.json()

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const coureseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: user.userId,
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
