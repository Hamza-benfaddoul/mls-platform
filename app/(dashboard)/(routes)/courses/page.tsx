import { db } from '@/lib/db'
import Categories from './_components/Categories'

import SearchInput from '@/components/SearchInput'
import { getCourses } from '@/actions/getCourses'
import CoursesList from '@/components/CoursesList'
import { currentUser } from '@/lib/auth'

interface SearchProps {
  searchParams: {
    categoryId: string
    title: string
  }
}

const Search = async ({ searchParams }: SearchProps) => {
  const user = await currentUser()

  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  const courses = await getCourses({
    userId: user!.userId,
    ...searchParams,
  })

  return (
    <>
      <div className='px-6 pt-6 md:hidden md:mb-0 block'>
        <SearchInput />
      </div>
      <div className='p-6 space-y-4'>
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  )
}
export default Search
