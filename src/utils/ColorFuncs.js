//input color needs to be 2 chars by channel: #RRGGBB
export function hexToRGB( hexColor ) {
    const RR = parseInt( hexColor.substr( 1, 2 ).toLowerCase(), 16 );
    const GG = parseInt( hexColor.substr( 3, 2 ).toLowerCase(), 16 );
    const BB = parseInt( hexColor.substr( 5, 2 ).toLowerCase(), 16 );

    return {
        r: RR,
        g: GG,
        b: BB
    }
}