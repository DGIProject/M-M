/**
 * Created by Dylan on 10/11/2015.
 */

var game = null;

function startGame() {
    game = new Game('gameCanvas', {w: window.innerWidth, h: window.innerHeight});
    game.loadMap('map01.json');
    game.addCar();
}

window.onload = function() {
    startGame();
};

window.onresize = function() {
    console.log('resize window');

    game.resizeCanvas({w: window.innerWidth, h: window.innerHeight});
};

var tabKeys = [];

window.onkeydown = function(e) {
    var code = e.keyCode;

    if(code == 27)
    {
        //escape
    }
    else
    {
        if(tabKeys.indexOf(code) < 0)
        {
            tabKeys.push(code);
        }
    }

    //console.log(tabKeys);
};

window.onkeyup = function(e) {
    var code = e.keyCode;
    var index = tabKeys.indexOf(code);

    if(index >= 0)
    {
        tabKeys.splice(index, 1);
    }
};

Number.prototype.map = function (in_min, in_max, out_min, out_max) {
    return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};

function getXMLHttpRequest()
{
    var xhr = null;

    if (window.XMLHttpRequest || window.ActiveXObject)
    {
        if (window.ActiveXObject)
        {
            try
            {
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            }
            catch(e)
            {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
        }
        else
        {
            xhr = new XMLHttpRequest();
        }
    }
    else
    {
        alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
        return null;
    }

    return xhr;
}