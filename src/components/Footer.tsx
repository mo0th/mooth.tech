import { contact } from '@/contact-links'
import Link from 'next/link'
import { ReactNode } from 'react'
import Container from './Container'
import { EmailIcon, GithubIcon, HeartIcon, LinkedinIcon } from './icons'

type LinkType = {
  href: string
  key?: string
} & ({ title: string } | { title: ReactNode; key: string })

const LINKS: LinkType[][] = [
  [
    {
      title: 'home',
      key: 'home',
      href: '/',
    },
    {
      title: 'about',
      href: '/about',
    },
    {
      title: 'resume',
      key: 'resume',
      href: '/',
    },
  ],
  [
    {
      title: 'projects',
      href: '/projects',
    },
    {
      title: 'snippets',
      href: '/snippets',
    },
    {
      title: 'posts',
      href: '/posts',
    },
  ],
  [
    {
      title: (
        <span className="inline-flex items-center space-x-1">
          <GithubIcon className="w-3 h-3" />
          <span>mo0th</span>
        </span>
      ),
      key: 'github',
      href: contact.github,
    },
    {
      title: (
        <span className="inline-flex items-center space-x-1">
          <EmailIcon className="w-3 h-3" />
          <span>email</span>
        </span>
      ),
      key: 'email',
      href: `mailto:${contact.email}`,
    },
    {
      title: (
        <span className="inline-flex items-center space-x-1">
          <LinkedinIcon className="w-3 h-3" />
          <span>soorria</span>
        </span>
      ),
      key: 'linkedin',
      href: contact.linkedin,
    },
  ],
]

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <Container>
      <footer className="flex flex-col py-8 space-y-8 border-t border-drac-curr">
        <div className="text-center">
          Made with{' '}
          <span className="relative inline-block w-5 h-5 align-middle group">
            <HeartIcon className="absolute inset-0 fill-current text-drac-pink" />
            <HeartIcon className="absolute inset-0 fill-current text-drac-purple group-hover:animate-ping" />
          </span>{' '}
          by Soorria
        </div>
        <div className="grid justify-center max-w-sm grid-cols-1 gap-4 mx-auto text-center lowercase sm:grid-cols-3">
          {LINKS.map((col, i) => (
            <div key={i} className="flex flex-col w-32 mx-auto space-y-4">
              {col.map(({ title, href, key }) =>
                href.match(/^(mailto|http)/i) ? (
                  <a
                    key={key ?? (title as string)}
                    className="transition-colors hover:text-drac-purple text-drac-comment"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {title}
                  </a>
                ) : (
                  <Link href={href} key={key ?? (title as string)}>
                    <a className="transition-colors hover:text-drac-purple text-drac-comment">
                      {title}
                    </a>
                  </Link>
                )
              )}
            </div>
          ))}
        </div>
      </footer>
    </Container>
  )
}

export default Footer
