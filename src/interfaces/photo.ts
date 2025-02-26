
export interface PexelsApiResponse {
    page: number;
    per_page: number;
    photos: Photo[];
    next_page: string;
    total_results: number;
}

export interface Photo {
    id: number;
    width: number;
    height: number;
    url: string;
    photographer: string;
    photographer_url: string;
    photographer_id: number;
    avg_color: string;
    src: PhotoSrc,
    liked: false,
    alt: "Brown Rocks During Golden Hour"
}

export interface PhotoSrc {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
}