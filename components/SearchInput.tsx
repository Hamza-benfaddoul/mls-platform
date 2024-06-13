'use client'

import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'

import { Search, X } from 'lucide-react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import qs from 'query-string'

import { Input } from '@/components/ui/input'

import * as z from 'zod'

const formSchema = z.object({
  title: z.string(),
})

const SearchInput = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const currentCategoryId = searchParams.get('categoryId')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: currentCategoryId,
          title: values.title,
        },
      },
      { skipEmptyString: true, skipNull: true },
    )
    form.setFocus('title')
    router.push(url)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex '>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormControl>
                <div className='relative'>
                  <Input
                    className='w-full lg:w-[300px]  pl-9  bg-white'
                    placeholder='Search for a course'
                    {...field}
                  />
                  <X
                    onClick={() => {
                      form.reset({ title: '' })
                      router.push(pathname)
                    }}
                    className='absolute top-3 right-3 h-4 w-4'
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='h-10 rounded-none rounded-r-md  p-0 w-10'
        >
          <Search className=' w-4 h-4 p-0  text-white ' />
        </Button>
      </form>
    </Form>
  )
}

export default SearchInput
