import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';
import {Locale} from '../types';

export default getRequestConfig(async ({locale}) => {
    // Validate that the incoming `locale` parameter is valid
    if (!routing.locales.includes(locale as Locale)) notFound();
    return {
        messages: (await import(`../locales/${locale}.json`)).default
    };
});