var gl;

function Scene() {
    this.nodes = null;

    this.canvas = document.getElementById("glcanvas");

    gl = getContext(this.canvas);

    gl.viewport(0, 0, this.canvas.width, this.canvas.height);

    gl.clearColor(0.33, 0.3, 0.33, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Methods

    this.render = () => sceneDraw(this);
    this.addNode = (obj) => sceneAddNode(this, obj);
}

function sceneAddNode(scene, obj) {
    if (scene.nodes == null) {
        scene.nodes = [];
    }

    console.log(`Scene: add node <${obj.name}>`);

    scene.nodes.push(obj);
}

function sceneDraw(scene) {
        // erase completely the viewport.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        perspectiveMatrix = makePerspective(40, scene.canvas.width / scene.canvas.height, 0.1, 100.0);

        loadIdentity();

        for (var i = 0; i < scene.nodes.length; i++) {
            scene.nodes[i].render();
        }
    }

function getContext(canvas) {
    gl = null;

    try {
        result = canvas.getContext("webgl");
    }
    catch (e) {
    }

    if (!result) {
        alert("Unable to initialize WebGL.");
    }

    return result;
}