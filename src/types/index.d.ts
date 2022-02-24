declare interface BaseDto {
    [key: string]: string | number | boolean | Date
    dateStart?: Date
    dateEnd?: Date
}

declare interface PageDto {
    pageSize: number
    pageNum: number
    orderBy?: string
    dir?: "ASC" | "DESC"
}

declare interface Page<T> {
    total: number
    pages: number
    content: T[]
}

declare type Role = string