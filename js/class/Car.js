/**
 * Created by Dylan on 10/11/2015.
 */

CAR_ORIENTATION = {
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3
};

CAR_GO = {
    NONE: 0,
    NORMAL: 1,
    BACK: 2
};

CAR_TURN = {
    NONE: 0,
    LEFT: 1,
    RIGHT: 2
};

Car = function(x, y, orientation, blockSize, blockId) {
    this.x = x * blockSize;
    this.y = y * blockSize;
    this.rotation = 0;
    this.orientation = orientation;
    this.width = 1;
    this.height = 2;

    this.blockId = blockId;

    this.speedCar = 5;
    this.accelerationCar = 0.1;
    this.decelerationCar = 0.2;
    this.currentSpeed = 0;

    this.isGo = CAR_GO.NONE;
    this.lastIsGo = CAR_GO.NONE;

    this.isTurn = CAR_TURN.NONE;
};

Car.prototype.drawElement = function(context, map) {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.rotation * Math.PI / 180);
    context.translate(-25, -75);
    context.drawImage(
        document.getElementById(map.blocks[this.blockId].imgName),
        map.blocks[this.blockId].sx,
        map.blocks[this.blockId].sy,
        map.blocks[this.blockId].swidth,
        map.blocks[this.blockId].sheight,
        0,
        0,
        this.width * map.blockSize,
        this.height * map.blockSize
    );

    context.restore();

    if(this.isGo == CAR_GO.NORMAL)
        this.go();
    else if(this.isGo == CAR_GO.BACK)
        this.goBack();
    else
        this.engineBrake();
};

Car.prototype.go = function() {
    this.turn();

    if(this.currentSpeed < 0) {
        this.currentSpeed += this.decelerationCar * 2;
    }
    else {
        if(this.currentSpeed >= this.speedCar)
            this.currentSpeed = this.speedCar;
        else
            this.currentSpeed += this.accelerationCar;
    }

    this.x += Math.sin(this.rotation * Math.PI / 180) * this.currentSpeed;
    this.y -= Math.cos(this.rotation * Math.PI / 180) * this.currentSpeed;

    this.lastIsGo = this.isGo;
};


Car.prototype.goBack = function() {
    this.turn();

    if(this.currentSpeed > 0) {
        this.currentSpeed -= this.decelerationCar * 2;
    }
    else {
        if(this.currentSpeed <= -this.speedCar)
            this.currentSpeed = -this.speedCar;
        else
            this.currentSpeed -= this.accelerationCar;
    }

    this.x += Math.sin(this.rotation * Math.PI / 180) * this.currentSpeed;
    this.y -= Math.cos(this.rotation * Math.PI / 180) * this.currentSpeed;

    this.lastIsGo = this.isGo;
};

Car.prototype.engineBrake = function() {
    if(this.lastIsGo == CAR_GO.NORMAL) {
        if(this.currentSpeed <= 0)
            this.currentSpeed = 0;
        else
            this.currentSpeed -= this.decelerationCar;
    }
    else {
        if(this.currentSpeed >= 0)
            this.currentSpeed = 0;
        else
            this.currentSpeed += this.decelerationCar;
    }

    this.x += Math.sin(this.rotation * Math.PI / 180) * this.currentSpeed;
    this.y -= Math.cos(this.rotation * Math.PI / 180) * this.currentSpeed;
};

Car.prototype.turn = function() {
    if(this.isTurn == CAR_TURN.LEFT) {
        this.rotation -= ((this.speedCar * 1.5) - ((this.currentSpeed < 0) ? -this.currentSpeed : this.currentSpeed)) * 0.8 * ((this.isGo == CAR_GO.NORMAL) ? 1 : -1);
    }
    else if(this.isTurn == CAR_TURN.RIGHT) {
        this.rotation += ((this.speedCar * 1.5) - ((this.currentSpeed < 0) ? -this.currentSpeed : this.currentSpeed)) * 0.8 * ((this.isGo == CAR_GO.NORMAL) ? 1 : -1);
    }
};