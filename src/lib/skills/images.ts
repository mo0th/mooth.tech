import javascriptImg from './logos/javascript.svg'
import typescriptImg from './logos/typescript.svg'
import kotlinImg from './logos/kotlin.svg'
import pythonImg from './logos/python.svg'
import htmlImg from './logos/html.svg'
import cssImg from './logos/css.svg'
import reactImg from './logos/react.svg'
import nextImg from './logos/nextjs.svg'
import remixImg from './logos/remix.svg'
import expressImg from './logos/express.svg'
import flaskImg from './logos/flask.svg'
import fastapiImg from './logos/fastapi.svg'
import postgresImg from './logos/postgres.svg'
import mongoImg from './logos/mongodb.svg'
import jestImg from './logos/jest.svg'
import cypressImg from './logos/cypress.svg'
import springImg from './logos/spring-boot.svg'
import githubImg from './logos/github-actions.svg'
import dockerImg from './logos/docker.svg'
import awsImg from './logos/aws-lambda.svg'
import terraformImg from './logos/terraform.svg'
import vueImg from './logos/vue.svg'
import nuxtImg from './logos/nuxt.svg'
import solidImg from './logos/solidjs.svg'
import type { StaticImageData } from 'next/image'

export const skillLabelToImage = {
  JavaScript: javascriptImg as StaticImageData,
  TypeScript: typescriptImg as StaticImageData,
  Kotlin: kotlinImg as StaticImageData,
  PostgreSQL: postgresImg as StaticImageData,
  MongoDB: mongoImg as StaticImageData,
  React: reactImg as StaticImageData,
  'Vue.js': vueImg as StaticImageData,
  SolidJS: solidImg as StaticImageData,
  Python: pythonImg as StaticImageData,
  HTML: htmlImg as StaticImageData,
  CSS: cssImg as StaticImageData,
  'Next.js': nextImg as StaticImageData,
  'Remix.run': remixImg as StaticImageData,
  'Express.js': expressImg as StaticImageData,
  Flask: flaskImg as StaticImageData,
  FastAPI: fastapiImg as StaticImageData,
  Jest: jestImg as StaticImageData,
  Cypress: cypressImg as StaticImageData,
  Spring: springImg as StaticImageData,
  'CI/CD': githubImg as StaticImageData,
  Docker: dockerImg as StaticImageData,
  Lambda: awsImg as StaticImageData,
  Terraform: terraformImg as StaticImageData,
  NuxtJS: nuxtImg as StaticImageData,
} satisfies Record<string, StaticImageData>
