import prismaServie from "@/utils/prisma";
import { middleware } from "./trpc";
import { TRPCError } from "@trpc/server";



export const checkToken = middleware(async ({ ctx, next, }) => {
    try {
        if (ctx.isError) {
            throw new TRPCError({ code: 'UNAUTHORIZED' })
        }
        const user = await prismaServie.user.findUnique({ where: { user_id: ctx.userId } });
        if (!user) {
            await prismaServie.user.create({ data: { user_id: ctx.userId } })
        }

        return next();
    } catch (e) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
    }

})