export const ensureProtocol = (url: string): string => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:') || url.startsWith('tel:')) {
        return url;
    }
    return `https://${url}`;
};
