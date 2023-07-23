import { z } from "zod";
import { t } from "../trpc";
import prismaServie from "@/utils/prisma";
import { Prisma } from "@prisma/client";
import Error from "next/error";
import { checkToken } from "../middleware";



export const createPost = t.procedure.use(checkToken).input(z.object({
    title: z.string(),
    content: z.string()
})).mutation(async ({ input, ctx }) => {
    const user: Prisma.UserCreateNestedOneWithoutPostInput = ctx.userId ? { connect: { user_id: ctx.userId } } : {};
    await prismaServie.post.create({ data: { title: input.title, content: input.content, user } });
})

export const updatePost = t.procedure.use(checkToken)
    .input(z.object({ id: z.number(), content: z.string() }))
    .mutation(async ({ input, ctx }) => {
        const post = await prismaServie.post.findUnique({ where: { id: input.id }, include: { user: true } });
        if (!post) {
            throw new Error({ statusCode: 404, title: '記事が見つかりませんでした' })
        }
        if (post.user && post.user.user_id !== ctx.userId) {
            throw new Error({ statusCode: 401, title: '編集権限がありません' })
        }

        await prismaServie.post.update({ where: { id: input.id }, data: { content: input.content } })
    })

export const getAllPosts = t.procedure.output(z.array(z.object({ id: z.number(), title: z.string() }))).query(async () => {
    const posts = await prismaServie.post.findMany({ include: { user: true } });
    return posts;
})

export const getPostById = t.procedure
    .input(z.number())
    .query(async ({ input }) => await prismaServie.post.findUnique({ where: { id: input }, include: { user: true } }))