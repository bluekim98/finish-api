import { Request } from 'express';

export function detectDevice(request: Request): string {
    const userAgent = request.header('user-agent') || '';
    if (/android/i.test(userAgent)) {
        return 'Android';
    } else if (/iphone|ipad|ipod/i.test(userAgent)) {
        return 'iOS';
    } else if (/mozilla/i.test(userAgent) && !/mobile/i.test(userAgent)) {
        return 'Web';
    } else {
        return 'Unknown';
    }
}
