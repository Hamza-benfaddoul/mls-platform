import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { getChapter } from '@/actions/getChapter'
import Banner from '@/components/banner'
import VideoPlayer from './_components/VideoPlayer'

const ChapterId = async ({
  params,
}: {
  params: { courseId: string; chapterId: string }
}) => {
  const { userId } = auth()
  if (!userId) redirect('/')

  const {
    course,
    chapter,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId,
  })
  if (!chapter || !course) redirect('/')

  const isLocked = !chapter.isFree && !purchase
  const completeOnEnd = !!purchase && !userProgress?.isCompleted

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner variant='success' label='You already completed this chapter.' />
      )}

      {isLocked && (
        <Banner
          variant='warning'
          label='You need to purchase this course to watch this chapter.'
        />
      )}
      <div className='felx flex-col max-w-4xl mx-auto pb-20'>
        <div className='p-4'>
          <VideoPlayer
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            completeOnEnd={completeOnEnd}
            isLocked={isLocked}
          />
        </div>
      </div>
    </div>
  )
}

export default ChapterId
