export function isValidParam(key: string, value: unknown): boolean {
    if (value === undefined) return false
    if (key === 'memo' && value === '') return false
    return !(key === 'date' && (
        (typeof value === 'number' && isNaN(value)) ||
        (value instanceof Date && isNaN(value.getTime()))
    ))
}