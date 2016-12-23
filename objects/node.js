function Node(name) {
    this.name = name;
    console.log(`Node: create <${name}>`);
    this.mesh = null;
    this.position = [0, 0, 0];
    this.rotation = [0, 0, 0];
    this.children = [];

    this.render = () => {
        if (this.mesh === undefined) {
            console.log("Node: error: cannot render undefined mesh.");
        } else {
            this.mesh.render(this.position, this.rotation);
        }
    }
}