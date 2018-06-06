
const hexToIntMap = {
    '0': 0,
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    'a': 10,
    'b': 11,
    'c': 12,
    'd': 13,
    'e': 14,
    'f': 15
}

//assign the correct decimal value based on 
//the position of the digit
function wheighHexValue( hexValue, position ) {
    return Math.pow( 16, position ) * hexToIntMap[hexValue];
}
//converts a hex string into a decimal value
function hexToInt( hexValue ) {
    let number = 0;
    let digitPosition;
    const lastCharAt = hexValue.length - 1; 
    for( let i = lastCharAt; i >=0; i-- ) {
        digitPosition = lastCharAt - i;
        number += wheighHexValue( hexValue.charAt( i ), digitPosition );
    }

    return number;
}
//input color needs to be 2 chars by channel: #RRGGBB
export function hexToRGB( hexColor ) {
    const RR = hexColor.substr( 1, 2 ).toLowerCase();
    const GG = hexColor.substr( 3, 2 ).toLowerCase();
    const BB = hexColor.substr( 5, 2 ).toLowerCase();

    return {
        r: hexToInt( RR ),
        g: hexToInt( GG ),
        b: hexToInt( BB )
    }
}