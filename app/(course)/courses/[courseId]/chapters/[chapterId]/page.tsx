import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { getChapter } from '@/actions/getChapter'
import Banner from '@/components/banner'
import VideoPlayer from './_components/VideoPlayer'
import CourseEnrollButton from './_components/CourseEnrollButton'
import { Separator } from '@/components/ui/separator'
import Preview from '@/components/preview'
import { File } from 'lucide-react'
import CourseProgressButton from './_components/CourseProgressButton'

const ChapterId = async ({
  params,
}: {
  params: { courseId: string; chapterId: string }
}) => {
  const { userId } = auth()
  if (!userId) redirect('/sign-in')

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
        <div>
          <div className='p-4 flex flex-col md:flex-row justify-between items-center'>
            <h2 className='text-2xl font-semibold mb-2 '>{chapter.title}</h2>
            {purchase ? (
              <CourseProgressButton
                chapterId={params.chapterId}
                courseId={params.courseId}
                isCompleted={!!userProgress?.isCompleted}
                nextChapterId={nextChapter?.id}
              />
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
                price={course.price!}
              />
            )}
          </div>
          <Separator />
          <div>
            <Preview value={chapter.description!} />
          </div>
          {!!attachments.length && (
            <>
              <Separator />
              <div className='p-4 '>
                {attachments.map((attachment) => (
                  <a
                    key={attachment.id}
                    href={attachment.url}
                    target='_blank'
                    className='flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline'
                  >
                    <File />
                    <p className='line-clamp-1'>{attachment.name}</p>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChapterId
