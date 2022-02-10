import { z } from 'zod'

export const createHostelSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'name is required',
    }),
    district: z.string({
      required_error: 'district is required',
    }),
    city: z.string({
      required_error: 'city is required',
    }),
    ward: z.string({
      required_error: 'ward number is required',
    }),
    street: z.string(),
  }),
})
