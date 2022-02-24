type SupportedFormType = "el-input-number" | "el-input" | "el-radio-group" | "el-select" | "el-switch" | "el-date-picker"

declare interface State {
    cache: { [key: string]: string?}
}

declare interface FormRule {
    required?: boolean
    min?: number
    max?: number
    message?: string
    type?: "date" | "array" | "email"
    trigger?: "blur" | "change"
    validator?: (rule: FormRule, value: any, callback: (error?: Error) => void) => void
}

declare interface FormOption {
    type: SupportedFormType
    placeholder?: string
    rule?: FormRule
    options?: { label: string, value: string | number | boolean }[]
    params?: { [key: string]: any }
}

declare interface Column {
    prop: string
    label: string
    hideOnIndex?: boolean
    hideOnDetail?: boolean
    notSort?: boolean

    /**
     * 在format之后调用 如果是数组则会应用到每一个元素
     */
    mapping?: { readonly [key: string]: string }

    edit?: boolean

    formOption?: FormOption

    /**
     * 是否可用跳转到详情页的路由”名称“
     * 
     */
    linkDetail?: string

    /**
     * 如果是数组则会应用到每个元素上
     * 
     */
    format?: (o: any, parent?: any) => string

    isArray?: boolean

    isNest?: boolean

    /**
     * 当isArray=true或者isNest=true时可应用与嵌套展示数据，
     * 启用时format将失效,最多嵌套一层数据
     * 仅限于EntityDetail中使用
     * 
     */
    elementColumns?: Column[]
}

declare interface EntityAction<T = any> {
    name: string
    color?: string
    func: (entity: T) => void
}