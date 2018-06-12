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

export function quadraticBezierArcLength( p0, p1, p2 ) {
  const ax = p0.x - 2 * p1.x + p2.x;
  const ay = p0.y - 2 * p1.y + p2.y;
  const bx = 2 * p1.x - 2 * p0.x;
  const by = 2 * p1.y - 2 * p0.y;
  const A = 4 * (ax * ax + ay * ay);
  const B = 4 * (ax * bx + ay * by);
  const C = bx * bx + by * by;

  const Sabc = 2 * Math.sqrt(A+B+C);
  const A_2 = Math.sqrt(A);
  const A_32 = 2 * A * A_2;
  const C_2 = 2 * Math.sqrt(C);
  const BA = B / A_2;

  return (A_32 * Sabc + A_2 * B * (Sabc - C_2) + (4 * C * A - B * B) * Math.log((2 * A_2 + BA + Sabc) / (BA + C_2))) / (4 * A_32);
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
