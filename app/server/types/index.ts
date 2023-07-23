import { z } from "zod"


export const payloadSchema = z.object({
    iss: z.string(),
    sub: z.string(),
    aud: z.array(z.string()),
    iat: z.number(),
    exp: z.number(),
    azp: z.string(),
    scope: z.string(),
    userId: z.string()
})
export type Payload = z.infer<typeof payloadSchema>;