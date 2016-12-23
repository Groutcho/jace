var shader = (function () {
    function Shader() {
        this.fragment = undefined;
        this.vertex = undefined;
        this.program = undefined;
        this.compile = () => createShader(this);
    }

    function createSubshader(source) {
        var result;

        if (source.attr("type") == "x-shader/x-fragment") {
            result = gl.createShader(gl.FRAGMENT_SHADER);
        } else if (source.attr("type") == "x-shader/x-vertex") {
            result = gl.createShader(gl.VERTEX_SHADER);
        }

        gl.shaderSource(result, source.text());
        gl.compileShader(result);

        return result;
    }

    function createShader(shader) {
        var vs = createSubshader(shader.vertex);
        var fs = createSubshader(shader.fragment);

        shader.program = gl.createProgram();
        gl.attachShader(shader.program, vs);
        gl.attachShader(shader.program, fs);
        gl.linkProgram(shader.program);

        if (!gl.getProgramParameter(shader.program, gl.LINK_STATUS)) {
            alert("Could not compile shader.");
        }

        gl.useProgram(shader.program);

        vertexPositionAttribute = gl.getAttribLocation(shader.program, "aVertexPosition");
        gl.enableVertexAttribArray(vertexPositionAttribute);

        textureCoordAttribute = gl.getAttribLocation(shader.program, "aTextureCoord");
        gl.enableVertexAttribArray(textureCoordAttribute);
    }

    return { "Shader": Shader }
}());