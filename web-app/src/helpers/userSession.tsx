import { UserSession } from '../types/User';
import { ReactSession } from 'react-client-session';
import { redirect } from 'next/navigation';

// WARNING: This implementation is insecure
// TODO: implement JWT to perform the authorization and authentication process.

const SESSION_NAME = process.env.NEXT_PUBLIC_SESSION_NAME || "userSession";
const SESSION_EXPIRATION = parseInt(process.env.NEXT_PUBLIC_SESSION_EXPIRATION || "3600000");
const SESSION_TYPE = process.env.NEXT_PUBLIC_SESSION_TYPE || "localStorage";

function isBrowser() {
    return typeof window !== 'undefined';
}

export function setUserSession(user: UserSession) {
    if (isBrowser()) {
        user.expiration = new Date(new Date().getTime() + SESSION_EXPIRATION);
        ReactSession.setStoreType(SESSION_TYPE);
        ReactSession.set(SESSION_NAME, JSON.stringify(user));
    }
}

export function getUserSession(): Promise<UserSession | null> {
    return new Promise((resolve, reject) => {
        if (isBrowser()) {
            ReactSession.setStoreType(SESSION_TYPE);
            const user = ReactSession.get(SESSION_NAME);
            console.log("User 1:" + user);
            if (user) {
                console.log("User 2:" + user);
                try {
                    const parsedUser = JSON.parse(user);
                    resolve(parsedUser);
                } catch (error) {
                    reject(error);
                }
            } else {
                resolve(null);
            }
        } else {
            resolve(null);
        }
    });
}

export function removeUserSession() {
    ReactSession.setStoreType(SESSION_TYPE);
    ReactSession.remove(SESSION_NAME);
}

export async function isUserSessionValid(): Promise<boolean> {
    if (isBrowser()) {
        const user = await getUserSession();
        if (user) {
            return user.expiration > new Date();
        }
    }
    return false;
}

export async function checkUserSession(): Promise<UserSession | null> {
    try {
        const session = await getUserSession();
        return session;
    } catch (error) {
        console.error("Error checking user session:", error);
        return null;
    }
}