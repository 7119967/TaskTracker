export const isNotEmpty = (text) => {
    if (!text) return 'error'

    if (text.toString().length > 0) return 'success'
    return 'error'
}

export const isTextLongerThan = (text, length) => {
    if (!text) return

    if (text.toString().length > 0 && text.toString().length >= length) return 'success'
    return 'error'
}

export const isTextShorterThan = (text, length) => {
    if (!text) return

    if (text.toString().length > 0 && text.toString().length <= length) return 'success'
    return 'error'
}