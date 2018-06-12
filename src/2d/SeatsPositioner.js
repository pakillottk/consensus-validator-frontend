import { quadraticBezier, quadraticBezierArcLength } from './utils';

function horizontalPositioner( polygon, rowOffset, rowDirection, seats, seatSize, seatSpacing, startMargin ) {
  const startX = (seatSize + startMargin) * ( rowDirection === "left" ? 1 : -1 ) + ( rowDirection === "left" ? polygon.bounds[ 0 ] : polygon.bounds[ 2 ] );
  const inrX =  ( rowDirection === "left" ? 1 : -1 ) * ( seatSize + seatSpacing );
  const rowY =  ( rowOffset + ( seatSize / 2 ) ) + polygon.bounds[ 1 ];

  const positions = [];
  let adjustOffset = 0;
  for( let i = 0; i < seats; i++ ) {
    let currentX = startX + inrX * (i + adjustOffset );
    let point = { x: currentX, y: rowY };
    while( !polygon.isInside( point ) ) {
      if( !polygon.inBounds( point ) ) {
        return positions;
      }
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
    while( !polygon.isInside( point ) ) {
      if( !polygon.inBounds( point ) ) {
        return positions;
      }
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

export function SeatsPositionerCurve( polygon, curve, direction, offset, seats, seatSize, seatSpacing ) {
  const arcLength = quadraticBezierArcLength( curve.p0, curve.p1, curve.p2 );
  const unitaryT = 1.0 / arcLength;
  const tOffset = offset * unitaryT;
  let t = direction === 'left' ? ( 0 + tOffset ) : ( 1 -  tOffset ); 
  
  const spacingStep = unitaryT * seatSpacing; 
  const seatStep = unitaryT * seatSize;
  const positions = [];
  let step, point; 
  let adjustOffset = 0;
  for( let i = 0; i < seats; i++ ) {
    step = (direction === 'left' ? 1.0 : -1.0) * (i + adjustOffset) * (spacingStep + seatStep);
    point = quadraticBezier( curve.p0, curve.p1, curve.p2, t + step );
    
    while( !polygon.isInside( point ) ) {
      if( !polygon.inBounds( point ) ) {
        return positions;
      }
      adjustOffset++;
      step = (direction === 'left' ? 1.0 : -1.0) * (i + adjustOffset) * (spacingStep + seatStep);
      point = quadraticBezier( curve.p0, curve.p1, curve.p2, t + step );
    }

    positions.push( point );
  } 

  return positions;
}
