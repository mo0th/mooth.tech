import type { BaseFrontMatter } from '@/types/data'
import { bundleMDX } from 'mdx-bundler'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis'
import remarkTwoslash from 'remark-shiki-twoslash'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { nodeTypes } from '@mdx-js/mdx'
import { remarkTypeScriptTransform } from './remark.server'
import { rehypeRearrangeShikiOutput } from './rehype.server'

const STYLE_UTILS = `
import { createElement } from 'react'
import { setup, styled, css } from 'goober'
setup(createElement)
export { styled, css }
`

export const render = async <T extends BaseFrontMatter>(source: string, components = '') => {
  return bundleMDX<T>({
    source,
    files: {
      './components': components,
      ...(source.includes('$styles') ? { $styles: STYLE_UTILS } : null),
    },
    mdxOptions(options) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkGfm,
        remarkTypeScriptTransform,
        [
          remarkTwoslash,
          {
            theme: 'dracula',
            langs: [
              'html',
              'css',
              'javascript',
              'typescript',
              'jsx',
              'tsx',
              'bash',
              'yaml',
              'toml',
              'latex',
              'r',
              'haskell',
              'csharp',
              'astro',
              'c',
              'cpp',
              'go',
              'java',
              'kotlin',
              'markdown',
              'matlab',
              'mdx',
              'perl',
              'python',
              'rust',
              'bash',
              'sql',
              'svelte',
              'vue',
              'json',
            ],
          },
        ],
      ]
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        [rehypeRaw, { passThrough: nodeTypes }],
        rehypeSlug,
        rehypeRearrangeShikiOutput,
        [
          rehypeAutolinkHeadings,
          {
            behaviour: 'append',
            properties: { className: 'heading-anchor', ariaHidden: true, tabIndex: -1 },
            content: [],
          },
        ],
        rehypeAccessibleEmojis,
      ]
      return options
    },
  })
}
