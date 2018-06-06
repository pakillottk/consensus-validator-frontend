export function areaTriangle2( p1, p2, p3 ) {
  return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
}

export function pointInTriangle( p, v1, v2, v3 ) {
  //Get the area of the three possible triangles
  const [ a1, a2, a3 ] = [
    areaTriangle2( p, v1, v2 ),
    areaTriangle2( p, v2, v3 ),
    areaTriangle2( p, v3, v1 )
  ];

  //Check if it's colinear to an edge
  if( a1 === 0.0 || a2 === 0.0 || a3 === 0.0 ) {
    return true;
  }

  //Check if all three signs are equal
  const [ b1, b2, b3 ] = [
    a1 < 0.0,
    a2 < 0.0,
    a3 < 0.0
  ];

  return b1 === b2 && b2 === b3;
}

export function quadraticBezier( p0, p1, p2, t ) {
  return addVectors(
    addVectors (
      vectorMulScalar( p0, ( 1 - t ) * ( 1 - t ) ),
      vectorMulScalar( p1, 2*t*(1-t) )
    ),
    vectorMulScalar( p2, t * t )
  );
}

export function addVectors( v1, v2 ) {
  return { x: v1.x + v2.x, y: v1.y +  v2.y };
}

export function vectorMulScalar( v, scalar ) {
  return { x: v.x * scalar, y: v.y *  scalar };
}

export function inBox( minX, minY, maxX, maxY, point ) {
  return point.x >= minX && point.x <= maxX && point.y >= minY && point.y <= maxY;
}
