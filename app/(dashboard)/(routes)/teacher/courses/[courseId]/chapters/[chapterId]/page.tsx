import IconBadge from '@/components/icon-badge'
import { db } from '@/lib/db'
import { ArrowLeft, Eye, LayoutDashboard, Video } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import ChapterTitleFrom from './_components/ChapterTitleForm'
import ChapterDescriptionForm from './_components/ChapterDescriptionFrom'
import ChapterAccessFrom from './_components/ChapterAccessFrom'
import ChapterVideoForm from './_components/ChapterVideoForm'

const ChapterId = async ({
  params,
}: {
  params: { courseId: string; chapterId: string }
}) => {
  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
    include: {
      muxData: true,
    },
  })

  if (!chapter) {
    redirect('/')
  }

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl]

  const totalFields = requiredFields.length
  const completedFields = requiredFields.filter(Boolean).length

  const comppletionText = `${completedFields}/${totalFields}`

  return (
    <div className='p-6'>
      {/* go back to course setup */}
      <div className='flex items-center justify-between'>
        <div className='w-full'>
          <Link
            href={`/teacher/courses/${params.courseId}`}
            className='flex items-center text-sm hover:opacity-75 transition mb-6'
          >
            <ArrowLeft className='h-4 w-4 mr-2' />
            Back to course setup
          </Link>

          {/* Completed Fields*/}
          <div className='flex items-center justify-between w-full'>
            <div className='flex flex-col gap-y-2'>
              <h1 className='text-2xl font-bold'>{chapter.title}</h1>
              <span className='text-sm text-gray-500'>
                Completed all fields {`(${comppletionText})`}
              </span>
            </div>
          </div>
        </div>
      </div>
      {''}
      {/* Chapter Fields */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-16'>
        {/* Grid col 1 */}
        <div className='space-y-4'>
          <div className='flex items-center gap-x-2'>
            <IconBadge icon={LayoutDashboard} />
            <h2 className='text-xl'>Customise your chapter</h2>
          </div>

          {/*  ChapterTitleForm*/}
          <ChapterTitleFrom
            initialData={chapter}
            courseId={params.courseId}
            chapterId={params.chapterId}
          />
          {/* ChapterDescriptionForm*/}
          <ChapterDescriptionForm
            initialData={chapter}
            courseId={params.courseId}
            chapterId={params.chapterId}
          />

          {/* Access Settings*/}
          <div>
            <div className='flex items-center gap-x-2'>
              <IconBadge icon={Eye} />
              <h2 className='text-xl'>Access Settings</h2>
            </div>
            <ChapterAccessFrom
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
          </div>
        </div>

        {/* Grid col 1 */}
        {/* start Video */}
        <div>
          <div className='flex items-center gap-x-2'>
            <IconBadge icon={Video} />
            <h2 className='text-xl'>Add a video</h2>
          </div>
          <ChapterVideoForm initialData={chapter} courseId={params.courseId} chapterId={params.chapterId}/>
        </div>
      </div>
    </div>
  )
}

export default ChapterId
