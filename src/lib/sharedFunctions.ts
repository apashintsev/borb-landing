export function getQueryVariable(variable: string) {
    var query = window.location.search.substring(1)
    var vars = query.split('&')
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=')
        if (pair[0] == variable) {
            return pair[1]
        }
    }
    return false
}

export const addressToPointsFormat = (
    address: string,
    firstPartTo: number,
    secondPartFrom: number
): string => {
    return `${address.slice(0, firstPartTo)}....${address.slice(
        secondPartFrom
    )}`
}