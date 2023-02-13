import type { BlogPostFrontMatter } from '~/types/blog-post'
import { PostHeading } from '~/components/layout/PostLayout'
import { getAllFilesFrontMatter } from '~/lib/data'
import { DataType } from '~/types/data'
import PostCard from '~/components/posts/BlogPostCard'
import MainLayout from '~/components/layout/MainLayout'
import { getOgImageForData } from '~/utils/og'
import { blogPostFilter, sortByCreatedAtField } from '~/utils/content'
import { PUBLIC_URL } from '~/constants'
import { For } from 'solid-js'
import { createServerData$ } from 'solid-start/server'
import { useRouteData } from 'solid-start'

const description =
  'Attempts at writing about things that I think are interesting, useful, or just cool'
const title = 'Blog'
const url = `${PUBLIC_URL}/blog`

const PostsPage = () => {
  const { posts } = useRouteData<typeof routeData>()
  return (
    <MainLayout>
      {/* <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          title,
          description,
          type: 'website',
          url,
          images: [getOgImageForData(DataType.blog)],
        }}
      /> */}
      <PostHeading>Blog</PostHeading>
      <p class="mt-6 mb-12 text-center text-lg">{description}</p>
      <div class="grid grid-cols-1 gap-8">
        <For each={posts()}>{post => <PostCard post={post} />}</For>
      </div>
      <div class="my-12 text-center">{posts()?.length} ramblings total</div>
    </MainLayout>
  )
}

export default PostsPage

export const routeData = () => {
  const posts = createServerData$(async () => {
    return blogPostFilter(
      sortByCreatedAtField(await getAllFilesFrontMatter<BlogPostFrontMatter>('blog'))
    )
  })

  return {
    posts,
  }
}
