'use client';

import { useEffect, useState } from 'react'


export default function WebApp() {
    const [webApp, setWebApp] = useState<Telegram['WebApp'] | null>(null);

    useEffect(() => {
        const app = window.Telegram?.WebApp;
        if (app) {
            app.ready();
            setWebApp(app);
            console.log('WebApp', app);
        }
    }, []);

    useEffect(() => {
        if (webApp) {
            let timeLeftMS = 5000;
            
            webApp.onEvent('mainButtonClicked', () => {
                const closeInterval = setInterval(() => {
                    if (timeLeftMS > 0) {
                        console.log({ message: `Closing in ${(timeLeftMS / 1000).toFixed(0)}`});
                        timeLeftMS -= 1000;
                    }
                    if (timeLeftMS <= 0) {
                        clearInterval(closeInterval);
                        webApp.switchInlineQuery("i guess that's it")
                    }
                }, 1000);

                
                webApp.MainButton.showProgress();
            });

            webApp.MainButton.show();
        }
    }, [webApp]);

    const getRawInitData = (webApp: WebApp) => {
        console.log('InitData', webApp?.initData);
        return webApp?.initData;
    };

    return (
        <>
            {webApp && <div key='webappdata'>{getRawInitData(webApp)}</div>}
        </>
    )
}