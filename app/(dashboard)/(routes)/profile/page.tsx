'use client';


import { useState, useTransition } from 'react'

import * as z from 'zod'
import { UpdateSchema } from '@/schemas'

import { Input } from '@/components/ui/input'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';

import { update } from '@/actions/update';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Header from '@/components/auth/header';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useSession } from 'next-auth/react';


const ProfilePage = () => {
  const user = useCurrentUser();
  const { update: updateSession } = useSession()


  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof UpdateSchema>>({
    resolver: zodResolver(UpdateSchema),
    defaultValues: {
      name: user?.name!,
      email: user?.email!,
    },
  })

  const onSubmit = (values: z.infer<typeof UpdateSchema>) => {
    console.log('hello', values);
    setError('')
    setSuccess('')

    startTransition(() => {
      update(values, user?.userId!).then((data) => {
        setError(data.error)
        setSuccess(data.success)
        updateSession()

      })
    })
  }
  return (
    <div className='flex h-full items-center justify-center'>
      <Card>
        <CardHeader>
          <Header label='Editing profile' title='Profile' />
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <div className='space-y-4'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder='John Doe'
                          type='text'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder='john.doe@example.com'
                          type='email'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />


              </div>
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button type='submit' className='w-full'>
                Update profile
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProfilePage
