import Head from 'next/head'

export default function Layout({children}) {
    return (
        <div className='layout-container'>
            <Head>
                <title>Trivalia</title>
                <meta name="description" content="Welcome to Trivalia. The most anticipated quiz show of many things."/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <meta name="theme-color" content="#892cb3" />
            </Head>
            <div className='main-container flex flex-col justify-center items-center'>
                <main className='w-11/12 md:w-9/12 lg:max-w-7xl xl:w-7/12 h-4/5 rounded greyish-border shadow bg-white'>
                    {children}
                </main>
            </div>
        </div>
    )
}