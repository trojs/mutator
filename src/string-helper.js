export const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1)

export const capitalizeWords = (string) =>
    string
        .split(/[_| ]/)
        .map((word)=>capitalizeFirstLetter(word))
        .join('')
