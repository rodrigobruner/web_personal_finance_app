import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import { locales } from './config';

export default createMiddleware(routing);

const localePattern = `(${locales.join('|')})`;
const dynamicRoute = `/${localePattern}/:path*`;

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', dynamicRoute]
};