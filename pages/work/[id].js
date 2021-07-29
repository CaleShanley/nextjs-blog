import Layout from '../../components/layout'
import { getAllWorkIds, getWorkData } from '../../lib/work'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

export async function getStaticProps({ params }) {
  const workData = await getWorkData(params.id)
  return {
    props: {
      workData
    }
  }
}

export default function Post({ workData }) {
  return (
    <Layout>
      <Head>
        <title>{workData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{workData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={workData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: workData.contentHtml }} />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllWorkIds()
  return {
    paths,
    fallback: false
  }
}
