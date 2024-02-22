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
    author: string
    date: Date
    tags: string[]
    photo?: string
    excerpt?: string
    hidden?: boolean
    __content: string // markdown
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
