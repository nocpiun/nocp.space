export interface RawModule {
    default: string
}

export interface ProjectInfo {
    name: string
    year: number
    description: string
    url?: string
    repo: string
}

export interface BadgeInfo {
    text: string
    color: string
    logo: string
    logoColor: string
    linkTo: string
}

export interface TreasureInfo {
    name: string
    url: string
    description: string
}

export interface TextInfo {
    title: string
    date: Date
    __content: string // markdown
}

export interface Blog extends TextInfo {
    author: string
    tags: string[]
    photo?: string
    excerpt?: string
    hidden?: boolean
}

export interface BlogTag {
    name: string
    amount: number
}

export interface LinkInfo {
    name: string
    description: string
    url: string
}

export interface DynamicInfo extends TextInfo {
    photoList?: string[]
}
