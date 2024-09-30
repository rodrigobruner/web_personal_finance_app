import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {AppRouterCacheProvider} from '@mui/material-nextjs/v14-appRouter'

import { Roboto } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto',
});

export default async function LocaleLayout({
    children,
    params: {locale}
}: {
    children: React.ReactNode;
    params: {locale: string};
}) {
    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body className={roboto.variable} style={{margin:0}}>
                <AppRouterCacheProvider options={{ key: 'css' }}>
                    <NextIntlClientProvider messages={messages}>
                        <ThemeProvider theme={theme}>
                            {children}
                        </ThemeProvider>
                    </NextIntlClientProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}