function isChromeBased() {
    if (typeof navigator === 'undefined') {
        return false;
    }
    const userAgent = navigator.userAgent.toLowerCase();
    return userAgent.indexOf('chrome') > -1 || userAgent.indexOf('chromium') > -1;
}

function isWebKitBased() {
    if (typeof navigator === 'undefined') {
        return false;
    }
    const userAgent = navigator.userAgent.toLowerCase();
    return userAgent.indexOf('applewebkit') > -1;
}

export function checkSupportBrowser(): boolean {
    return isChromeBased() || isWebKitBased()
}