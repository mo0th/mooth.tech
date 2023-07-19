import type { SnippetFrontMatter } from '~/types/snippet'
import PostLayout from '~/components/posts/PostLayout'
import { getAllFilesFrontMatter } from '~/lib/data'
import SnippetCard from '~/components/posts/SnippetCard'
import BlogPostCard from '~/components/posts/BlogPostCard'
import { getOgImageForData } from '~/utils/og'
import { blogPostFilter, sortByCreatedAtField } from '~/utils/content'
import { PUBLIC_URL } from '~/constants'
import type { BlogPostFrontMatter } from '~/types/blog-post'

const description = "All the stuff I've written on this site"
const title = 'All Posts'
const url = `${PUBLIC_URL}/all-posts`

export const metadata = {
  title,
  description,
  alternates: {
    canonical: url,
  },
  openGraph: {
    title,
    description,
    type: 'website',
    url,
    images: [getOgImageForData('snippets')],
  },
}

const SnippetsPage = async () => {
  const [snippets, blogPosts] = await Promise.all([
    getAllFilesFrontMatter<SnippetFrontMatter>('snippets'),
    getAllFilesFrontMatter<BlogPostFrontMatter>('blog'),
  ])

  const posts = sortByCreatedAtField([
    ...snippets.map(s => ({ ...s, type: 'snippets' as const })),
    ...blogPostFilter(blogPosts).map(p => ({ ...p, type: 'blog' as const })),
  ])

  return (
    <PostLayout title="All Posts" description={description}>
      <div>
        <div
          style={{ '--initial-step': '2' }}
          className="slide-in grid auto-cols-min grid-flow-dense grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 sm:gap-x-8 lg:gap-12"
        >
          {posts.map(p => {
            const key = `${p.type}/${p.slug}`

            return p.type === 'snippets' ? (
              <SnippetCard key={key} snippet={p} />
            ) : (
              <div className="grid sm:col-span-2" key={key}>
                <BlogPostCard post={p} />
              </div>
            )
          })}
        </div>
      </div>
      <div className="my-12 text-center">{posts.length} posts total</div>
    </PostLayout>
  )
}

export default SnippetsPage
