import Head from 'next/head'
import styles from '../styles/Home.module.css'

import { AntListContainer } from '../components/features/ant-list-container'
import { Nav, NavBar } from '../components/layout'

export default function Home() {
    return (
        <>
            <Head>
                <title>Ant Race</title>
                <meta name="description" content="an ant race calculator" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.app}>
                <div className={styles.top}>
                    <NavBar backArrow={false}>Ant Race</NavBar>
                </div>
                <main className={styles.body}>
                    <AntListContainer />
                </main>
                <div className={styles.bottom}>
                    <Nav />
                </div>
            </div>
        </>
    )
}
