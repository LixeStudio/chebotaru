export type Currency = 'USD' | 'EUR' | 'UAH'

export type Picture = {
    documentId: string
    slug: string

    image: {
        src: string
        alt: string
        caption: string
        // responsive copies and intrinsic size from the CMS
        srcset?: string
        width?: number
        height?: number
    }
    title: string
    description?: string | null

    publishedAt?: string
    details: {
        year: string
        size: string
        material: string
        style: string
        // "<width>x<height>" in centimeters
        sizeInSm: string
    }

    // as stored in the CMS: no conversion between currencies
    price: number | null
    currency: Currency
    availability: 'available' | 'sold'

    orientation?: 'vertical' | 'horizontal' | 'square' | null

    // slug of every locale the picture is visible in (detail requests only)
    localizedSlugs?: Record<string, string>
}
