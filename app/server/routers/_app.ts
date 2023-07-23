import { createCode, getCode } from "../services/handleHtmlFile"
import { createPost, getAllPosts, getPostById, updatePost } from "../services/post"
import { t } from "../trpc"


const methods = {
    getCode,
    createCode,
    getAllPosts,
    getPostById,
    createPost,
    updatePost
}

export const appRouter = t.router(methods)

export type AppRouter = typeof appRouter