import GetsList from './gets/GetsList';

import WebApp from './WebApp';
import Script from 'next/script';

export default function Home() {
  return (
    <>
      <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      <GetsList />
    </>
  )
}
