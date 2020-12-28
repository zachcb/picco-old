import { PostController } from "@/controllers/post";

export const PostResolver = {
  authors: ({ id }, args, ctx: Context) => {
    return ctx.post({ id }).author();
  }
}
