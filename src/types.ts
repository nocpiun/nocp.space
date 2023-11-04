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

export interface Blog {
    title: string
    date: Date
    tags: string[]
    excerpt?: string
    id: string
    __content: string // markdown
}
