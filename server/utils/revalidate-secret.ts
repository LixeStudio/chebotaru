import { createHash, timingSafeEqual } from 'node:crypto'

// Secret of the CMS → site "content changed" call (NUXT_CMS_REVALIDATE_SECRET). Compared in constant time on hashes,
// so neither the content nor the length of the secret leaks through response timing. No secret configured = refused.
export function isRevalidateSecret(given: string | undefined | null, expected: string | undefined | null): boolean {
    if (!expected || !given) return false
    const digest = (value: string) => createHash('sha256').update(value).digest()
    return timingSafeEqual(digest(given), digest(expected))
}
