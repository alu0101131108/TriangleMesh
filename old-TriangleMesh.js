'use strict';

class TriangleMesh {
  #vertexBySide;
  #positions;
  #ids;

  constructor (center, sideSize, squarePerSide) {
    this.#vertexBySide = squarePerSide + 1;
    const squareSideSize = sideSize / squarePerSide;
    const totalVertex = this.#vertexBySide ** 2;
    this.#positions = new Float32Array(squarePerSide ** 2 * 18);
    this.#ids = [];
    
    let bl, br, tl, tr;
    let writeIndex = 0;
    let i = center.x - (squarePerSide / 2) * squareSideSize;
    for (let col = 0; col < squarePerSide; col++) {
      let j = center.y - (squarePerSide / 2) * squareSideSize
      for (let row = 0; row < squarePerSide; row++) {
        bl = {
          x: i, 
          y: j, 
          z: center.z, // + 50 - Math.random() * 100, 
          id: this.#getVertexIdFrom(row, col)
        };
        br = {
          x: i + squareSideSize, 
          y: j, 
          z: center.z, // + 50 - Math.random() * 100, 
          id: this.#getVertexIdFrom(row + 1, col)
        };
        tl = {
          x: i, 
          y: j + squareSideSize, 
          z: center.z, // + 50 - Math.random() * 100, 
          id: this.#getVertexIdFrom(row, col + 1)
        };
        tr = {
          x: i + squareSideSize, 
          y: j + squareSideSize, 
          z: center.z, // + 50 - Math.random() * 100, 
          id: this.#getVertexIdFrom(row + 1, col + 1)
        };

        let squareVertices = this.#generateMeshSquare(bl, br, tl, tr);
        this.#positions.set(squareVertices, writeIndex);
        writeIndex += squareVertices.length;
        j += squareSideSize;  
      }
      i += squareSideSize;
    }
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