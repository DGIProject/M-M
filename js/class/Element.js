/**
 * Created by Dylan on 10/11/2015.
 */

Element = function(x, y, width, height, blockId, collision) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.blockId = blockId;

    this.collision = collision;
};