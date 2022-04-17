import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { AntListContainer } from "../components/features/ant-list-container"

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ant Race</title>
        <meta name="description" content="an ant race calculator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <AntListContainer />
      </main>
    </div>
  )
}
