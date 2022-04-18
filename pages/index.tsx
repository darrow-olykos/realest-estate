import Link from 'next/link'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Card } from '../components/display'

import { CityListContainer } from '../components/features/city-list-container'
import { useState } from 'react'
import { Nav, NavBar } from '../components/layout'

export default function Home() {
  return (
    <>
      <Head>
        <title>Realest Estate</title>
        <meta name="description" content="an ant race calculator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.app}>
        <div className={styles.top}>
          <NavBar backArrow={false}>Realest Estate</NavBar>
        </div>
        <main className={styles.body}>
          <CityListContainer />
        </main>
        <div className={styles.bottom}>
          <Nav />
        </div>
      </div>
    </>
  )
}
