export default class SetFuncs {
    //given array a and b, returns the intersecion
    //( requires comparable primitive items )
    static intersect( a, b ) {
        const setA = new Set(a);
        const setB = new Set(b);
        const intersection = new Set([...setA].filter( x => setB.has( x ) ))
        
        return Array.from( intersection )
    }
};