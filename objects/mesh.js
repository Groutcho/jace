var mesh = (function () {

function Mesh() {
    this.vertices = [];
    this.indices = [];
    this.texcoord0 = [];
    this.shader = null;
    this.texture = null;

    this.vertexBuffer = null;
    this.texcoord0Buffer = null;

    this.init = () => {
        this.vertexBuffer = gl.createBuffer();
        this.texcoord0Buffer = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.texcoord0Buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.texcoord0), gl.STATIC_DRAW);
    }

    this.render = (p, r) => meshRender(this, p, r);
}

function meshRender(mesh, p, r) {
    mvPushMatrix();

    mvTranslate(p);
    mvRotate(r[0], [1, 0, 0]);
    mvRotate(r[1], [0, 1, 0]);
    mvRotate(r[2], [0, 0, 1]);

    // TODO: apply mesh transform here

    gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vertexBuffer);
    gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, mesh.texcoord0Buffer);
    gl.vertexAttribPointer(textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, mesh.texture.texture);
    gl.uniform1i(gl.getUniformLocation(mesh.shader.program, "uSampler"), 0);

    setMatrixUniforms();
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    mvPopMatrix();
}

function createFromJson(json, shader) {
    var m = new Mesh();
    var js = JSON.parse(json);
    m.vertices = js.vertices;
    m.texcoord0 = js.texcoord0;
    m.shader = shader;

    return m;
}

    return { "Mesh": Mesh,
             "create" : createFromJson }
}());