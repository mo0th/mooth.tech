import type { GetStaticProps } from 'next'
import type { SnippetFrontMatter } from '@/types/snippet'
import { NextSeo } from 'next-seo'
import PostLayout from '@/components/PostLayout'
import { getAllFilesFrontMatter } from '@/lib/data'
import { DataType } from '@/types/data'
import SnippetCard from '@/components/SnippetCard'
import BlogPostCard from '@/components/BlogPostCard'
import { getOgImageForData } from '@/utils/og'
import { filterNonPrivate, sortByCreatedAtField } from '@/utils/content'
import { PUBLIC_URL } from '@/constants'
import type { BlogPostFrontMatter } from '@/types/blog-post'

type ModifiedSnippet = SnippetFrontMatter & { type: DataType.snippets }
type ModifiedBlogPost = BlogPostFrontMatter & { type: DataType.blog }

interface SnippetsPageProps {
  posts: (ModifiedSnippet | ModifiedBlogPost)[]
}

const description = "All the stuff I've written on this site"
const title = 'All Posts'
const url = `${PUBLIC_URL}/all-posts`

const SnippetsPage: React.FC<SnippetsPageProps> = ({ posts }) => {
  return (
    <PostLayout title="All Posts">
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          title,
          description,
          type: 'website',
          url,
          images: [getOgImageForData(DataType.snippets)],
        }}
      />
      <p className="mt-6 mb-12 text-center text-lg">{description}</p>
      <div
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}
        className="grid auto-cols-min grid-flow-dense grid-cols-1 gap-y-8 gap-x-6 sm:!grid-cols-2 sm:gap-x-8 lg:gap-12"
      >
        {posts.map(p => {
          const key = `${p.type}/${p.slug}`

          return p.type === DataType.snippets ? (
            <SnippetCard key={key} snippet={p} />
          ) : (
            <div className="col-span-2 grid" key={key}>
              <BlogPostCard post={p} />
            </div>
          )
        })}
      </div>
      <div className="my-12 text-center">{posts.length} posts total</div>
    </PostLayout>
  )
}

export default SnippetsPage

export const getStaticProps: GetStaticProps<SnippetsPageProps> = async () => {
  const [snippets, blogPosts] = await Promise.all([
    getAllFilesFrontMatter<SnippetFrontMatter>(DataType.snippets),
    getAllFilesFrontMatter<BlogPostFrontMatter>(DataType.blog),
  ])

  const posts = sortByCreatedAtField([
    ...snippets.map(s => ({ ...s, type: DataType.snippets as const })),
    ...filterNonPrivate(blogPosts).map(p => ({ ...p, type: DataType.blog as const })),
  ])

  return {
    props: { posts },
  }
}
