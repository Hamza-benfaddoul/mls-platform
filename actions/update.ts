'use server'

import * as z from 'zod'

import { generateVerificationToken } from '@/data/tokens'

import { db } from '@/lib/db'

import { UpdateSchema } from '@/schemas'
import { getUserByEmail } from '@/data/user'
import { sendVerificationEmail } from '@/lib/mail'

export const update = async (values: z.infer<typeof UpdateSchema>, id: string) => {
  const validatedFields = UpdateSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  const { email, name} = validatedFields.data

  const existingUser = await getUserByEmail(email);

  if (existingUser && existingUser.id != id) {
    return { error: 'Email already in use!' }
  }

  await db.user.update({
    where: { id },
    data: {
      email,
      name,
    },
  });

  //TODO: VerificationEmail

  // const verificationToken = await generateVerificationToken(email);

//   await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: 'Profile updated!' }
}
