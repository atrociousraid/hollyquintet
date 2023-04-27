import './globals.sass'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { SearchInput } from '../components/search-input'
import { SearchOptions } from '../components/search-options'
import { TopBar } from '../components/top-bar'

export default function App({ Component, pageProps }: any) {
  const router = useRouter()

  const isHome = router.pathname === '/'

  return (
    <>
      <Head>
        <link rel='shortcut icon' href='/favicon.png' />
      </Head>
      <TopBar />
      <SearchInput />
      {isHome || <SearchOptions />}
      <Component {...pageProps} />
      <a
        className='github-fork-ribbon right-top color-[#333] origin-top-right scale-75 before:bg-white before:content-[""]'
        href='https://github.com/arianrhodsandlot/quintet'
        data-ribbon='Star me on GitHub'
        title='Star me on GitHub'
        target='_blank'
        rel='noreferrer'
      >
        Star me on GitHub
      </a>
    </>
  )
}