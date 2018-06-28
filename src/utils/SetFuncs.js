export default class SetFuncs {
    //given array a and b, returns the intersecion
    //( requires comparable primitive items )
    static intersect( a, b ) {
        const setA = new Set(a);
        const setB = new Set(b);
        const intersection = new Set([...setA].filter( x => setB.has( x ) ));
        
        return Array.from( intersection );
    }

    //given array a and b, returns the union of both arrays
    //(union != concatenation, equal elements won't repeat)
    static union( a, b ) {
        const output = [];

        const elementsDict = {};
        for( let i = 0; i < a.length; i++ ) {
            elementsDict[ a[i] ] = a[i];
        }
        for( let i = 0; i < b.length; i++ ) {
            elementsDict[ b[i] ] = b[i];
        }

        for( let key in elementsDict ) {
            output.push( elementsDict[ key ] );
        }

        return output;
    }

    //given array a and b, returns a minus b.
    static minus( a,b ) {
        const setA = new Set(a);
        const setB = new Set(b);
        const minus = new Set([...setA].filter( x => !setB.has( x ) ));
        
        return Array.from( minus );
    }
};