var gl;
var canvas;
var vertexPositionAttribute;
var textureCoordAttribute;
var perspectiveMatrix;
var lastTime = 0;
var scene;

var shaders = {};

function start() {
    scene = new Scene();

    shaders['card'] = new shader.Shader();
    shaders['card'].fragment = $( "#card-fs" );
    shaders['card'].vertex = $( "#card-vs" );
    shaders['card'].compile();

    var texture1 = new Texture("media/avacyn.png");
    var texture2 = new Texture("media/narset.jpg");

    var card1 = mesh.create($( "#mesh-card" ).text(), shaders['card']);
    card1.texture = texture1;
    var card2 = mesh.create($( "#mesh-card" ).text(), shaders['card']);
    card2.texture = texture2;

    var avacyn = new Node("Archangel Avacyn");
    avacyn.position = [-1.1, 0.1, -4.5];
    avacyn.rotation = [0, 10, 0];
    avacyn.mesh = card1;
    avacyn.mesh.init();

    var narset = new Node("Narset, Enlightened Master");
    narset.position = [1.1, 0.1, -4.5];
    narset.rotation = [0, -10, 0];
    narset.mesh = card2;
    narset.mesh.init();

    scene.addNode(avacyn);
    scene.addNode(narset);

    setInterval(scene.render, 15);
}