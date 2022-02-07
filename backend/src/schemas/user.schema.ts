import { z } from 'zod'

export const createUserSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Not a valid email'),
    password: z
      .string({
        required_error: 'Name is required',
      })
      .min(6, 'Password should be of at least 6 characters'),
    phone_number: z.number({
      required_error: 'Phone number is required',
    }),
  }),
})
