type ColumnChain = (content: any, col: Column, parent: any) => string

const solveMapping: ColumnChain = (content, col, parent) => {
    if (col.mapping) {
        return col.mapping[content]
    }
    return content
}

const solveFormat: ColumnChain = (content, col, parent) => {
    if (col.format) {
        return col.format(content, parent)
    }
    return content
}

const transformBoolean: ColumnChain = (content, col, parent) => {
    if (content === "true" || content === true) {
        return "是"
    }
    if (content === "false" || content === false) {
        return "否"
    }
    return content
}

const chains = [
    solveFormat,
    solveMapping,
    transformBoolean
]

export default chains

export function solveChains(content: any, col: Column, parent: any): string {
    if(content == undefined) {
        return "无"
    }
    let res = content;
    chains.forEach(solve => {
        res = solve(res, col, parent)
    })
    return res;
}