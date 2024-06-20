import { redirect } from 'next/navigation'
import { db } from '@/lib/db'

import Image from 'next/image'

import { AspectRatio } from '@/components/ui/aspect-ratio'

import { getChapter } from '@/actions/getChapter'
import Banner from '@/components/banner'
import VideoPlayer from './_components/VideoPlayer'
import CourseEnrollButton from './_components/CourseEnrollButton'
import { Separator } from '@/components/ui/separator'
import Preview from '@/components/preview'
import { File, CirclePlay, Clock, WifiOff } from 'lucide-react'
import CourseProgressButton from './_components/CourseProgressButton'
import { Button } from '@/components/ui/button'
import { currentUser } from '@/lib/auth'

const ChapterId = async ({
  params,
}: {
  params: { courseId: string; chapterId: string }
}) => {
  const user = await currentUser();
  if (!user) redirect('/sign-in')

  const {
    course,
    /* chapter,
    attachments,
    nextChapter, 
    userProgress,
    purchase, */
  } = await getChapter({
    userId: user!.userId,
/*     chapterId: params.chapterId, */
    courseId: params.courseId,
  })


const trianingDetails: { property: string; value: string }[] =  await db.trainingDetails.findMany({
    where: {
      courseId: params.courseId,
    },
    orderBy: {
      position: 'asc',
    },
  })
  console.log(course)
  if (!course) redirect('/')

/*   const isLocked = !chapter.isFree && !purchase */
/*   const completeOnEnd = !!purchase && !userProgress?.isCompleted */

  return (
    <div>
      <div className='felx bg-gray-200  flex-col max-w-7xl mx-auto pb-20'>
        <div className='w-full grid grid-cols-1 lg:grid-cols-2'>
          <div className='p-4   '>
            {/*<VideoPlayer 
              chapterId={params.chapterId}
              title={chapter.title}
              courseId={params.courseId}
              nextChapterId={nextChapter?.id}
              playbackId={muxData?.playbackId!}
              completeOnEnd={completeOnEnd}
              isLocked={isLocked}
            /> */}
            <Image
              src={course?.imageUrl || '/courseImage.png'}
              width={450}
              height={250}
              alt='Image'
              className='rounded-md shadow border w-full h-full object-cover'
            />
          </div>
          <div>
            <div className='p-4 grid grid-rows-4 gap-y-2'>
              <h2 className='text-2xl font-semibold mb-2 capitalize '>
                {course.title}
              </h2>
              <div className='flex gap-x-4  '>
                <span className='flex items-center gap-x-1'>
                  <Clock className='h-5 w-5  text-muted-foreground' />
                  15 min
                </span>
                <span className='flex items-center gap-x-1'>
                  <WifiOff className='h-5 w-5 text-muted-foreground' />
                  No internet required
                </span>
              </div>
              <div className='flex w-full items-center gap-x-3  '>
                {/* <CourseProgressButton
                  chapterId={params.chapterId}
                  courseId={params.courseId}
                  isCompleted={!!userProgress?.isCompleted}
                  nextChapterId={nextChapter?.id}
                /> */}
                <Button>Let's start</Button>
                <Button variant='link' className='flex items-center'>
                  <CirclePlay  className='w-5 h-5 mr-1'/>
                  <span className='text-sm '>Watch preview</span>
                  </Button>
              </div>
              <p className='text-sm text-muted-foreground '>
                {course.description}
              </p>
            </div>
          </div>
        </div>
        <div>
          {/*           <Preview value={chapter.description!} /> */}
          <h2 className='text-xl font-semibold p-4'>Training details</h2>
        </div>
        <>
          <div className='p-4 '>
            {trianingDetails.map((attachment, index) => (
              <div
                key={index}
                className={`grid grid-cols-2 items-center p-3 w-full rounded  text-black ${index % 2 === 0 ? 'bg-white' : ''} `}
              >
                <p className=''>{attachment.property}</p>
                <p className=''>{attachment.value}</p>
              </div>
            ))}
          </div>
        </>
      </div>
    </div>
  )
}

export default ChapterId
