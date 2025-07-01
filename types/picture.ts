export type Picture = {
    id: string | number
    slug: string

    image: {
        src: string
        alt: string
        caption: string
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
}
