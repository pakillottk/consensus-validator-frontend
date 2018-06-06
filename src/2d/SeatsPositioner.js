import { quadraticBezier } from './utils';

function horizontalPositioner( polygon, rowOffset, rowDirection, seats, seatSize, seatSpacing, startMargin ) {
  const startX = (seatSize + startMargin) * ( rowDirection === "left" ? 1 : -1 ) + ( rowDirection === "left" ? polygon.bounds[ 0 ] : polygon.bounds[ 2 ] );
  const inrX =  ( rowDirection === "left" ? 1 : -1 ) * ( seatSize + seatSpacing );
  const rowY =  ( rowOffset + ( seatSize / 2 ) ) + polygon.bounds[ 1 ];

  const positions = [];
  let adjustOffset = 0;
  for( let i = 0; i < seats; i++ ) {
    let currentX = startX + inrX * (i + adjustOffset );
    let point = { x: currentX, y: rowY };
    while( !polygon.isInside( point ) && polygon.inBounds( point ) ) {
      currentX = startX + inrX * (i + ++adjustOffset );
      point = { x: currentX, y: rowY };
    }

    positions.push( point );
  }

  return positions;
}

function verticalPositioner( polygon, rowOffset, rowDirection, seats, seatSize, seatSpacing, startMargin ) {
  const startY = ( seatSize + startMargin ) * ( rowDirection === "left" ? 1 : -1 ) + ( rowDirection === "left" ? polygon.bounds[ 1 ] : polygon.bounds[ 3 ] );
  const inrY = ( rowDirection === "left" ? 1 : -1 ) * ( seatSize + seatSpacing );
  const rowX = ( rowOffset + ( seatSize / 2 ) ) + polygon.bounds[ 0 ];

  const positions = [];
  let adjustOffset = 0;
  for( let i = 0; i < seats; i++ ) {
    let currentY = startY + inrY * ( i + adjustOffset );
    let point = { x: rowX, y: currentY };
    while( !polygon.isInside( point ) && polygon.inBounds( point ) ) {
      currentY = startY + inrY * (i + ++adjustOffset );
      point = { x: rowX, y: currentY };
    }

    positions.push( point );
  }

  return positions;
}

export function SeatsPositioner( polygon, rowOffset, rowDirection, orientation, seats, seatSize, seatSpacing, startMargin ) {
  return orientation === 'horizontal' ? horizontalPositioner( polygon, rowOffset, rowDirection, seats, seatSize, seatSpacing, startMargin ) :
                                        verticalPositioner( polygon, rowOffset, rowDirection, seats, seatSize, seatSpacing, startMargin );
}

export function SeatsPositionerCurve( curve, direction, seats, seatSize ) {
  const seatLength = seatSize;
  const totalLength = ( seats * seatLength ) - seatLength;

  const positions = [];
  for( let i = 0; i < seats; i++ ) {
    const currentLength = i * seatLength;
    const t = totalLength === 0 ? 0.0 : ( currentLength / totalLength );

    const curvePoint = quadraticBezier( curve.p0, curve.p1, curve.p2, direction === 'right' ? ( 1.0 - t ) : t  );
    const point = { x: curvePoint.x - seatSize * 0.5, y: curvePoint.y - seatSize * 0.5 };
    positions.push( point );
  }

  return positions;
}
