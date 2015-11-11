/**
 * Created by Dylan on 10/11/2015.
 */

Game = function(canvasId, size) {
    this.canvas = {
        element: document.getElementById(canvasId),
        context: document.getElementById(canvasId).getContext('2d')
    };

    this.resizeCanvas(size);

    this.size = size;

    this.map = null;
    this.cars = [];

    this.refreshInterval = null;
};

Game.prototype.resizeCanvas = function(size) {
    this.canvas.element.width = size.w;
    this.canvas.element.height = size.h;
    this.canvas.context.width = size.w;
    this.canvas.context.height = size.h;
};

Game.prototype.loadMap = function(fileName) {
    this.map = new Map(fileName);
    this.map.loadMap(this);
};

Game.prototype.startGame = function() {
    var that = this;

    this.refreshInterval = setInterval(function() {
        that.refreshMap();
        that.analyzeKeys();
    }, 30);
};

Game.prototype.stopGame = function() {
    if(this.refreshInterval)
        clearInterval(this.refreshInterval);
};

Game.prototype.refreshMap = function() {
    this.canvas.context.fillStyle = '#FFFFFF';
    this.canvas.context.fillRect(0, 0, this.canvas.element.width, this.canvas.element.height);
    //console.log('refresh');
    this.map.drawElements(this.canvas.context);

    for(var i = 0; i < this.cars.length; i++)
        this.cars[i].drawElement(this.canvas.context, this.map);
};

Game.prototype.analyzeKeys = function () {
    var isGo = CAR_GO.NONE;
    var isTurn = CAR_TURN.NONE;

    for(var i = 0; i < tabKeys.length; i++) {
        if(tabKeys[i] == 90)
            isGo = CAR_GO.NORMAL;
        else if(tabKeys[i] == 83)
            isGo = CAR_GO.BACK;

        if(tabKeys[i] == 81)
            isTurn = CAR_TURN.LEFT;
        else if(tabKeys[i] == 68)
            isTurn = CAR_TURN.RIGHT;
    }

    this.cars[0].isGo = isGo;
    this.cars[0].isTurn = isTurn;
};

Game.prototype.addCar = function(x, y, orientation) {
    if(x != null && y != null)
        this.cars.push(new Car(x, y, orientation, this.map.blockSize, this.map.car.blockId));
    else
        this.cars.push(new Car(this.map.checkPoints[0].x, this.map.checkPoints[0].y, this.map.car.orientation, this.map.blockSize, this.map.car.blockId));
};