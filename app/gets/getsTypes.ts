export interface GetBase {
    id: number,
    name: string,
    type: string
}

export interface GetText extends GetBase {
    text: string
}

export interface GetMedia extends GetBase {
    thumbnail_url: string | null,
    text?: string | null
}

export interface GetPhoto extends GetMedia {
    photo_url: string
}

export interface GetVideo extends GetMedia {
    video_url: string
}

export type GetType = GetVideo | GetPhoto;