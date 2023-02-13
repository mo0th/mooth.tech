// import type { GetStaticProps } from 'next'
import type { ProjectFrontMatter } from '~/types/project'
import PostLayout from '~/components/layout/PostLayout'
import ProjectCard from '~/components/projects/ProjectCard'
import ProjectsGrid from '~/components/projects/ProjectsGrid'
import { featuredProjects, PUBLIC_URL } from '~/constants'
import { getAllFilesFrontMatter } from '~/lib/data'
import { getOgImageForData } from '~/utils/og'
import { VoidComponent } from 'solid-js'
import { createServerData$ } from 'solid-start/server'
import { useRouteData } from 'solid-start'
// import { NextSeo } from 'next-seo'

interface ProjectsPageProps {
  projects: ProjectFrontMatter[]
  numMainProjects: number
}

const description = "Things I've made. Some are more useful and cooler than others."
const title = 'Projects'
const url = `${PUBLIC_URL}/projects`

const ProjectsPage: VoidComponent = () => {
  const { projects } = useRouteData<typeof routeData>()
  return (
    <PostLayout title="Projects">
      {/* <NextSeo
        description={description}
        title={title}
        canonical={url}
        openGraph={{
          title,
          description,
          type: 'website',
          url,
          images: [getOgImageForData(DataType.projects)],
        }}
      /> */}
      <p class="mt-6 mb-12 text-center text-lg">{description}</p>
      <ProjectsGrid>
        {projects()?.main.map(project => (
          <ProjectCard project={project} />
        ))}
      </ProjectsGrid>
      <h2 class="mt-16 mb-8 text-4xl">Other Projects</h2>
      <ProjectsGrid>
        {projects()?.other.map(project => (
          <ProjectCard project={project} />
        ))}
      </ProjectsGrid>
    </PostLayout>
  )
}

export default ProjectsPage

export const routeData = () => {
  const projects = createServerData$(async () => {
    const projectOrder = [
      ...featuredProjects,
      'aqrm',
      'wordle-score',
      'slidy',
      'fight-for-tribeland',
    ]
    const getProjectIndex = (project: ProjectFrontMatter): number => {
      const idx = projectOrder.indexOf(project.slug)
      return idx >= 0 ? idx : projectOrder.length + 10
    }

    const aboveFold = new Set(projectOrder)
    const projects = await getAllFilesFrontMatter<ProjectFrontMatter>('projects')

    const mainProjects = projects.filter(p => aboveFold.has(p.slug))
    const otherProjects = projects.filter(p => !aboveFold.has(p.slug))

    return {
      main: mainProjects.sort((a, b) => getProjectIndex(a) - getProjectIndex(b)),
      other: otherProjects,
    }
  })

  return {
    projects,
  }
}