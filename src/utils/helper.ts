function toCamelCase(word: string) {
    return word
        .toLowerCase()
        .replace(/[-_]+/g, ' ')
        .replace(/[^\w\s]/g, '')
        .replace(/ (.)/g, function ($1) {
            return $1.toUpperCase();
        })
        .replace(/ /g, '');
}

export function objectToCamelCase(origObj: any) {
    //WHY: any object to Camel case
    return Object.keys(origObj).reduce(function (newObj: any, key) {
        const val = origObj[key];
        const newVal = typeof val === 'object' ? objectToCamelCase(val) : val;
        newObj[toCamelCase(key)] = newVal;
        return newObj;
    }, {});
}

export function limitWord(
    string: string,
    limit: number = 10,
    suffix: string = '...',
) {
    if (string) {
        const numberWords = string.split(' ');
        if (numberWords.length > limit) {
            return [...numberWords.slice(0, limit), suffix].join(' ');
        }
    }
    return string;
}

export function limitChar(
    string: string,
    limit: number = 20,
    suffix: string = '...',
) {
    if (string) {
        const numberWords = string.split(' ');
        let newString = numberWords[0];
        for (let index = 1; index < numberWords.length; index++) {
            const word = numberWords[index];
            const wordToCheck = `${newString} ${word}`;
            if (wordToCheck.length > limit) {
                newString += suffix;
                break;
            } else {
                newString = wordToCheck;
            }
        }
        return newString;
    }
    return string;
}
