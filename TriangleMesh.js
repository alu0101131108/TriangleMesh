'use strict';

class TriangleMesh {
  #vertices;
  #normals;
  #colors;
  #indexes;

  #pos;
  


  // x: 0,
  // y: 0,
  // z: 0,
  // width: 200,
  // height: 200,
  // segmentsHori: 10
  // segmentsVert: 10

  constructor (options) {
    
  }

  #generateMeshSquare(bl, br, tl, tr) {
    let vertexPositions; // 3 (vertexPerTriangle) * 2 (trianglePerSquare) * 3 (dimensions) = 18.

    const primaryDiagonal = Math.sqrt((tl.x - br.x) ** 2 + (tl.y - br.y) ** 2);
    const secondaryDiagonal = Math.sqrt((tr.x - bl.x) ** 2 + (tr.y - bl.y) ** 2);

    if (primaryDiagonal >= secondaryDiagonal) {
      // Create tr and bl triangles.
      vertexPositions = [ 
        tl.x, tl.y, tl.z,
        tr.x, tr.y, tr.z,
        br.x, br.y, br.z,
        tl.x, tl.y, tl.z,
        br.x, br.y, br.z,
        bl.x, bl.y, bl.z
      ];
      this.#ids.concat([tl.id, tr.id, br.id, tl.id, br.id, bl.id]);
    }
    else {
      // Create tl and br triangles.
      vertexPositions = [ 
        bl.x, bl.y, bl.z,
        tl.x, tl.y, tl.z,
        tr.x, tr.y, tr.z,
        bl.x, bl.y, bl.z,
        tr.x, tr.y, tr.z,
        br.x, br.y, br.z
      ];
      this.#ids.concat([bl.id, tl.id, tr.id, bl.id, tr.id, br.id]);
    }
    return vertexPositions;
  }

  #getVertexIdFrom(i, j) {
    return j * this.#vertexBySide + i;
  }

  getPositions() {
    return this.#positions;
  }

  getIds() {
    return this.#ids;
  }
}

export {TriangleMesh};