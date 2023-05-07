import GetsList from './gets/GetsList';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <script src="https://telegram.org/js/telegram-web-app.js"></script>
      </Head>
      <div className='text-center'>
        <GetsList />
      </div>
    </>
  )
}
