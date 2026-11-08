export type Currency = 'USD' | 'EUR' | 'UAH'

export type PictureImage = {
    src: string
    alt: string
    // responsive copies, the full-screen file and intrinsic size from the CMS
    srcset?: string
    full?: string
    width?: number
    height?: number
}

export type Picture = {
    documentId: string
    slug: string

    image: PictureImage & { caption: string }
    // every photo of the painting, the main one first (detail requests only)
    photos?: PictureImage[]
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
