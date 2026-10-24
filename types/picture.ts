export type Picture = {
    id: string | number
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
    documentId: string,
    title: string
    description?: string

    createdAt: string
    publishedAt?: string
    details: {
        year: string
        size: string
        material: string
        style: string
        sizeInSm: string
    }

    price: number
    availability: 'available' | 'sold'

    orientation?: 'vertical' | 'horizontal' | 'square'

    // slug of every locale the picture is translated to (detail requests only)
    localizedSlugs?: Record<string, string>
}
