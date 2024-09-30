import {defineRouting} from 'next-intl/routing';
import {createSharedPathnamesNavigation} from 'next-intl/navigation';
import { locales, defaultLocale } from '../config';

export const routing = defineRouting({
    locales: locales,

    defaultLocale: defaultLocale
});

export const {Link, redirect, usePathname, useRouter} =
  createSharedPathnamesNavigation(routing);