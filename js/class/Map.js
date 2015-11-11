/**
 * Created by Dylan on 10/11/2015.
 */

Map = function(fileName) {
    this.fileName = fileName;

    this.blockSize = 50;

    this.name = null;
    this.version = null;

    this.car = null;
    this.checkPoints = null;

    this.blocks = [];
    this.elements = [];
};

Map.prototype.getContentFile = function() {
    var xhr = getXMLHttpRequest();

    xhr.open("GET", 'map/' + this.fileName, false);
    xhr.send(null);
    if(xhr.readyState != 4 || (xhr.status != 200 && xhr.status != 0)) // Code == 0 en local
        throw new Error("Impossible de charger la carte nommée \"" + this.fileName + "\" (code HTTP : " + xhr.status + ").");
    var mapJsonData = xhr.responseText;

    return JSON.parse(mapJsonData);
};

Map.prototype.loadMap = function() {
    var content = this.getContentFile();

    this.name = content.name;
    this.version = content.version;

    this.car = content.car;
    this.checkPoints = content.checkPoints;

    this.blocks = content.blocks;

    for(var y = 0; y < this.blocks.length; y++) {
        var image = document.createElement('img');
        image.id = this.blocks[y].imgName;
        image.src = 'img/' + this.blocks[y].texture;

        image.onload = function() {
            console.log('loaded');
        };

        image.onerror = function() {
            alert('Error');
        };

        document.getElementById('images').appendChild(image);
    }

    for(var i = 0; i < content.elements.length; i++) {
        this.elements.push(new Element(content.elements[i].x, content.elements[i].y, content.elements[i].width, content.elements[i].height, content.elements[i].blockId, content.elements[i].collision));
    }
};

Map.prototype.drawElements = function(context) {
    for(var i = 0; i < this.elements.length; i++) {
        var element = this.elements[i];

        context.drawImage(
            document.getElementById(this.blocks[element.blockId].imgName),
            this.blocks[element.blockId].sx,
            this.blocks[element.blockId].sy,
            this.blocks[element.blockId].swidth,
            this.blocks[element.blockId].sheight,
            element.x * this.blockSize,
            element.y * this.blockSize,
            element.width * this.blockSize,
            element.height * this.blockSize
        );
    }

    for(var y = 0; y < 10; y++) {
        for(var x = 0; x < 10; x++) {
            context.strokeRect(x*50, y*50, 50, 50);
        }
    }
};

Map.prototype.detectCollision = function(x, y) {
    //console.log(x, y);

    /*
    for(var i = 0; i < this.elements.length; i++) {
        var element = this.elements[i];

        if((x - 2) < ((element.x * this.blockSize) + (element.width * this.blockSize)) && y > element.y && y < ((element.y * this.blockSize) + (element.width * this.blockSize)) && element.collision.is) {
            console.log('left collision');
        }
    }
    */

    var element = this.elements[1];

    //console.log((x-2), ((element.x * this.blockSize) + (element.width * this.blockSize)), element.collision.is);

    if((x - 2) < ((element.x * this.blockSize) + (element.width * this.blockSize)) && y > element.y && y < ((element.y * this.blockSize) + (element.width * this.blockSize)) && element.collision.is) {
        //console.log('left collision');
    }
};