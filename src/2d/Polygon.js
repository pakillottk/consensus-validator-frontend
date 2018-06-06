import { areaTriangle2, pointInTriangle } from './utils';

class Polygon {
  constructor( points ) {
    this.id = Polygon.counter;
    this.points = points || [];
    this.bounds = null;
    this.updateBounds();
  }

  static get counter() {
     Polygon._counter = (Polygon._counter || 0) + 1;
     return Polygon._counter;
   }

  addPoint( point ) {
    this.points =  [...this.points, point];
    this.updateBounds();
  }

  updateBounds() {
    if( this.points.length === 0 ) {
      this.bounds = [ 0, 0, 0, 0 ];
    } else {
      let minX = Number.MAX_VALUE;
      let minY = Number.MAX_VALUE;
      let maxX = Number.MIN_VALUE;
      let maxY = Number.MIN_VALUE;
      for( let i = 0; i < this.points.length; i++ ) {
        if( this.points[ i ].x < minX ) {
          minX = this.points[ i ].x;
        }
        if( this.points[ i ].x > maxX ) {
          maxX = this.points[ i ].x;
        }
        if( this.points[ i ].y < minY ) {
          minY = this.points[ i ].y;
        }
        if( this.points[ i ].y > maxY ) {
          maxY = this.points[ i ].y;
        }
      }
      this.bounds = [ minX, minY, maxX, maxY ];
    }
  }

  inBounds( point ) {
    return point.x < this.bounds[ 2 ] &&
      point.x >  this.bounds[ 0 ] &&
      point.y < this.bounds[ 3 ] &&
      point.y >  this.bounds[ 1 ];
  }

  get sizeX() {
    if( this.bounds ) {
      return this.bounds[ 2 ] - this.bounds[ 0 ];
    }
    return 0;
  }

  get sizeY() {
    if( this.bounds ) {
      return this.bounds[ 3 ] - this.bounds[ 1 ];
    }
    return 0;
  }

  /*
    ONLY WORKS FOR CONVEX POLYGONS
    =============================
  */
  isInsideConvex( point ) {
    let inside = false;

    //Cast a ray across the polygon including the target point. Inside if interesections are
    //odd
    for( let i = 0,  j =  this.points.length - 1; i < this.points.length; j = i++ ) {
      if
      (
        ( this.points[ i ].y > point.y ) !== ( this.points[ j ].y > point.y ) &&
        point.x < ( this.points[ j ].x  - this.points[ i ].x ) * ( point.y  - this.points[ i ].y ) / ( this.points[ j ].y - this.points[ i ].y ) + this.points[ i ].x
      ) {
        inside = !inside;
      }
    }

    return inside;
  }

  //Works for non-convex, but slower
  isInside( point ) {
    //If not in bounding box, is out
    if( !this.inBounds( point ) || this.points.length < 3 ) {
      return false;
    }

    //It's a triangle, do simple test
    if( this.points.length === 3 ) {
      return pointInTriangle( point, this.points[ 0 ], this.points[ 1 ], this.points[ 2 ] );
    }

    let inside = 0.0;
    let [ i, j ] = [ 0, this.points.length - 1 ];
    //Bottom-left corner of bounding box
    const boxCorner = { x: this.bounds[ 0 ], y: this.bounds[ 1 ] };
    //All triangles of form: boxCorner, vi, vj (vi and vj are the polygon's vertices)
    for( i,j; i < this.points.length; j = i++ ) {
      const [ v1, v2 ] = [ this.points[ j ], this.points[ i ] ];
      const triArea = areaTriangle2( boxCorner, v1, v2 );
      const sign = triArea === 0.0 ? 0.0 : triArea < 0.0 ? -1.0 : 1.0;
      const inTriangle = pointInTriangle( point, boxCorner, v1, v2 );
      //if point in current triangle add or substract 1
      inside += sign * inTriangle;
    }
    //point is inside if it's not in a possitive and negative triangle at once
    return inside !== 0.0;
  }
}

export default Polygon;
