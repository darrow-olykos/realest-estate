import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { AntRace } from '../components/ant-race'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ant Race</title>
        <meta name="description" content="an ant race calculator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <AntRace />
      </main>
    </div>
  )
}
