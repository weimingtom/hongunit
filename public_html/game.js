/**
 * @author weimingtom
 */

function CSprite(){};
CSprite.prototype = new Object();

/**
 * @type {Image}
 */
CSprite.prototype.img = null;

/**
 * @type {String}
 */
CSprite.prototype.src = "";

/**
 * @type {double}
 */
CSprite.prototype.dx = 0;

/**
 * @type {double}
 */
CSprite.prototype.dy = 0;

/**
 * @type {double}
 */
CSprite.prototype.dw = 0;

/**
 * @type {double}
 */
CSprite.prototype.dh = 0;

/**
 * relative x
 * @type {double}
 */
CSprite.prototype.rx = 0.0;

/**
 * relative y
 * @type {double}
 */
CSprite.prototype.ry = 0.0;

/**
 * relative w
 * @type {double}
 */
CSprite.prototype.rw = 1.0;

/**
 * relative h
 * @type {double}
 */
CSprite.prototype.rh = 1.0;

/**
 * @type {double}
 */
CSprite.prototype.level = 0;

/**
 * @type {boolean}
 */
CSprite.prototype.visible = true;

var sprite = new CSprite();
var spriteTarget = new CSprite();

function CGame(){};
CGame.prototype = new Object();

/**
 * @type {boolean}
 */
CGame.prototype.isShowInfo = true;

/**
 * @type {double}
 */
CGame.prototype.frameInterval = 1000 / 8;

/**
 * @type {boolean}
 */
CGame.prototype.isShowEventInfo = true;

/**
 * @type {HTMLCanvasElement}
 */
CGame.prototype.canvas = null;

/**
 * @type {CanvasRenderingContext2D}
 */
CGame.prototype.context = null;

/**
 * @type {double}
 */
CGame.prototype.lastTime = 0;

/**
 * @type {double}
 */
CGame.prototype.lastPaintTime = 0;

/**
 * may be null, Event[]
 * @type {Array}
 */
CGame.prototype.touches = [];

/**
 * @type {boolean}
 */
CGame.prototype.isTouchDown = false;

/**
 * @type {CSprite}
 */
CGame.prototype.bg = null;

/**
 * @type {Array}
 */
CGame.prototype.bgs = [];

/**
 * @type {Array}
 */
CGame.prototype.fgs = [];

/**
 * @see http://milk0824.sakura.ne.jp/doukana/illust/sozai/
 * @type {Array}
 */
CGame.prototype.fg_urls = [
    "images/02_reimu01.png",
    "images/02_reimu02.png",
    "images/02_reimu03.png",
    "images/02_reimu04.png",   
    "images/02_reimu05.png",
    "images/02_reimu06.png"
];

/**
 * @see http://b.app111.com/iphone/14-73-0-9/#secondCateAchor
 * @type {Array}
 */
CGame.prototype.bg_urls = [
    "images/nc69366.jpg",
    "images/nc78903.jpg"
];

CGame.prototype.FG_WIDTH = 463;
CGame.prototype.FG_HEIGHT = 600;
CGame.prototype.BG_WIDTH = 640;
CGame.prototype.BG_HEIGHT = 480;

/**
 * @type {double}
 */
CGame.prototype.step = 0;

var game = new CGame();

/**
 * @param {CGame} game
 * @param {String} id
 */
var CGame_init = function(game, id) {
    game.canvas = document.getElementById(id);
    game.context = game.canvas.getContext('2d');
    game.lastTime = game.lastPaintTime = new Date().getTime();
    game.touches = null;
    game.isTouchDown = false;
};

/**
 * 
 * @param {CGame} game
 * @param {String} str
 */
var CGame_showText = function(game, str) {
    var ctx = game.context;
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 16px Arial, sans-serif';
    ctx.textBaseline = 'top';
    ctx.fillText(str, 0, 0);
};

/**
 * 
 * @param {CGame} game
 * @param {CSprite} sprite
 * @param {double} x
 * @param {double} y
 * @param {double} w
 * @param {double} h
 */
var CGame_drawCenter = function(game, sprite, x, y, w, h) {
    var ctx = game.context;
    if (ctx && sprite && sprite.img) {
        var dx, dy, dw, dh;
        var sw = sprite.img.width;
        var sh = sprite.img.height;
        if (sw / w > sh / h) {
            dh = sh / sw * w;
            dw = w;
        } else {
            dw = sw / sh * h;
            dh = h;
        }
        dx = x + w / 2 - dw / 2;
        dy = y + h / 2 - dh / 2;
        ctx.drawImage(sprite.img, dx, dy, dw, dh);
        sprite.dx = dx;
        sprite.dy = dy;
        sprite.dw = dw;
        sprite.dh = dh;
    }
};

/**
 * @param {CGame} game
 * @param {CSprite} sprite
 * @param {CSprite} spriteTarget
 * @param {double} rx
 * @param {double} ry
 * @param {double} rw
 * @param {double} rh
 */
var CGame_drawRelative = function(game, sprite, spriteTarget, rx, ry, rw, rh) {
    var ctx = game.context;
    if (ctx && sprite && sprite.img && spriteTarget && spriteTarget.img) {
        sprite.dx = spriteTarget.dx + spriteTarget.dw * rx;
        sprite.dy = spriteTarget.dy + spriteTarget.dh * ry;
        sprite.dw = spriteTarget.dw * rw;
        sprite.dh = spriteTarget.dh * rh;
        //console.log("CGame_drawRelative" + sprite.dx + ", " + sprite.dy + ", " + sprite.dw + ", " + sprite.dh);       
        ctx.drawImage(sprite.img, sprite.dx, sprite.dy, sprite.dw, sprite.dh);
    }
};



/**
 * @param {CGame} game
 */
var CGame_onPaint = function(game) {
    game.canvas = document.getElementById('myCanvas');
    game.context = game.canvas.getContext('2d');
    if (false) {
        game.canvas.width = document.body.clientWidth;
        game.canvas.height = document.body.clientHeight;
    } else {
        game.canvas.width = window.innerWidth;
        game.canvas.height = window.innerHeight;
    }
    var ctx = game.context;
    if (ctx) {
        ctx.save();
        var curTime = new Date().getTime();
        var time = curTime - game.lastTime;
        game.lastTime = curTime;
        
        var screenW = game.canvas.width;
        var screenH = game.canvas.height;
        ctx.clearRect(0, 0, screenW, screenH);
        var bgs_len = game.bgs.length;
        for (var bg_level = 0; bg_level < bgs_len; bg_level++) {
            var bg = game.bgs[bg_level];
            if (bg && bg.visible) {
                game.bg = bg;
                CGame_drawCenter(game, game.bg, 0, 0, screenW, screenH);
            }
        }
        var fgs_len = game.fgs.length;
        if (game.bg) {
            for (var fg_level = 0; fg_level < fgs_len; fg_level++) {
                var fg = game.fgs[fg_level];
                if (fg && fg.visible) {
                    CGame_drawRelative(game, fg, game.bg, fg.rx, fg.ry, fg.rw, fg.rh);
                }
            }
        }
        if (game.isShowInfo) {
            var fpsStr = (1000.0 / time).toFixed(0);
            var touchinfo = "";
            if (game.isTouchDown && game.touches) {
                touchinfo = game.touches[0].clientX + "," + game.touches[0].clientY;
            }
            CGame_showText(game, 
                "W" + screenW + "," + 
                "H" + screenH + "," +
                //"T" + curTime + "," +
                //"T" + time + "," + 
                "FPS" + fpsStr + "," + 
                "touch" + touchinfo + "," +
                "bgs_len" + bgs_len + "," + 
                "fgs_len" + fgs_len + ","
            );
            var lastPaintTime = new Date().getTime();
            if (lastPaintTime - game.lastPaintTime > 5000) {
                game.lastPaintTime = lastPaintTime;
                console.log("->CGame_onPaint" + screenW + ", " + screenH); 
            }
        }
        ctx.restore();
    }
};

/**
 * 
 * @param {CGame} game
 */
var CGame_doResize = function(game) {
    console.log("CGame_doResize " + game + ", " + game.canvas);
    CGame_init(game, 'myCanvas');
    game.canvas.width = document.body.clientWidth;
    game.canvas.height = document.body.clientHeight;
};

/**
 * @param {CGame} game
 * @param {String} src
 */
var CGame_loadBG = function(game, src, level, visible) {
    var img = new Image();
    img.onload = function() {
        console.log("bg onload:" + img.src);
        var sprite = new CSprite();
        sprite.img = img;
        sprite.src = src;
        sprite.level = level;
        sprite.visible = visible;
        game.bgs[level] = sprite;
        img = null;
        CGame_onLoadFinish(game);
    };
    img.src = src;
};

/**
 * @see CGame_onPaint
 * @param {CGame} game
 * @param {String} src
 * @param {double} level
 * @param {double} rx
 * @param {double} ry
 * @param {double} rw
 * @param {double} rh
 */
var CGame_loadFG = function(game, src, level, rx, ry, rw, rh, visible) {
    var img = new Image();
    img.onload = function() {
        console.log("sprite onload:" + img.src);
        var sprite = new CSprite();
        sprite.img = img;
        sprite.src = src;
        sprite.level = level;
        sprite.rx = rx;
        sprite.ry = ry;
        sprite.rw = rw;
        sprite.rh = rh;
        sprite.visible = visible;
        game.fgs[level] = sprite;
        img = null;
        CGame_onLoadFinish(game);
    };
    img.src = src;
};

/**
 * @param {CGame} game
 * @param {Array} ids
 */
var CGame_showBG = function(game, ids) {
    if (game && ids) {
        var bgs_len = game.bgs.length;
        var ids_len = ids.length;
        for (var level = 0; level < bgs_len; level++) { 
            var sprite = game.bgs[level];
            if (sprite) {
                var isFound = false;
                for (var i = 0; i < ids_len; i++) {
                    var id = ids[i];
                    if (level == id) {
                        isFound = true;
                        sprite.visible = true;
                        break;
                    }
                }
                if (!isFound) {
                    sprite.visible = false;
                }
            }
        }
    }
};

/**
 * @param {CGame} game
 * @param {Array} ids
 */
var CGame_showFG = function(game, ids) {
    if (game && ids) {
        var fgs_len = game.fgs.length;
        var ids_len = ids.length;
        for (var level = 0; level < fgs_len; level++) { 
            var sprite = game.fgs[level];
            if (sprite) {
                var isFound = false;
                for (var i = 0; i < ids_len; i++) {
                    var id = ids[i];
                    if (level == id) {
                        isFound = true;
                        sprite.visible = true;
                        break;
                    }
                }
                if (!isFound) {
                    sprite.visible = false;
                }
            }
        }
    }
};

/**
 * @param {CGame} game
 */
var CGame_onStep = function(game) {
      switch(game.step) {
        case 0:
            CGame_showBG(game, [0]);
            CGame_showFG(game, [0]);
            break;
            
        case 1:
            CGame_showBG(game, [1]);
            CGame_showFG(game, [1]);        
            break;
      }
      game.step++;
};

/**
 * @param {CGame} game
 */
var CGame_onLoadFinish = function(game) {
    if (game.bgs.length == game.bg_urls.length &&
        game.fgs.length == game.fg_urls.length) {
        // Now, everything is OK
        CGame_onStep(game);
    }
};

/**
 * ---------------------------------------------
 */

window.onresize = function() {
    if (game.isShowEventInfo) {
        console.log("window.onresize");
    }
    CGame_doResize(game); 
};

window.onload = function() {
    if (game.isShowEventInfo) {
        console.log("window.onload");
    }
    CGame_doResize(game);
    var bg_urls_len = game.bg_urls.length;
    for (var i = 0; i < bg_urls_len; i++) {
        CGame_loadBG(game, game.bg_urls[i], i, false);
    }
    var fg_urls_len = game.fg_urls.length;
    for (var i = 0; i < fg_urls_len; i++) {
        CGame_loadFG(game, game.fg_urls[i], i,
            (1 - game.FG_WIDTH / game.BG_WIDTH) / 2, 0, game.FG_WIDTH / game.BG_WIDTH, game.FG_HEIGHT / game.BG_HEIGHT, false);
    }
    //CGame_onStep(game);
};

window.setInterval(function() {
    CGame_onPaint(game);
}, game.frameInterval);

/**
 * @see http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventListener
 */
document.body.addEventListener('mousedown', function(event) {
    event.preventDefault();
    if (game.isShowEventInfo) {  
        console.log("mousedown:" + event);  
    }
    CGame_onStep(game);
    game.touches = [event];
    game.isTouchDown = true;
}, false);

document.body.addEventListener('mousemove', function(event) {
    event.preventDefault();
    if (game.isTouchDown) {  
        if (game.isShowEventInfo) {
            console.log("mousemove:" + event.clientX + ", " + event.clientY);  
        }
        game.touches = [event];
    }
}, false);

document.body.addEventListener('mouseup', function(event) {
    event.preventDefault();  
    if (game.isShowEventInfo) {
        console.log("mouseup:" + event);  
    }
    game.touches = null;
    game.isTouchDown = false;
}, false);

document.body.addEventListener('mouseout', function(event) {
    event.preventDefault();
    if (game.isShowEventInfo) {
        console.log("mouseout:" + event);
    }
    game.touches = null;
    game.isTouchDown = false;
}, false);

document.body.addEventListener('touchstart', function(event) {
    event.preventDefault();  
    if (game.isShowEventInfo) {
        console.log("touchstart:" + event.touches);  
    }
    CGame_onStep(game);
    game.touches = event.touches;
    game.isTouchDown = true;
}, false);

document.body.addEventListener('touchmove', function(event) {  
    event.preventDefault();  
    if (game.isTouchDown) {  
        if (game.isShowEventInfo) {
            console.log("touchmove:" + event.touches[0].clientX + ", " + event.touches[0].clientY);  
        }
        game.touches = event.touches;
    }  
}, false);

document.body.addEventListener('touchend', function(event) {
    event.preventDefault();  
    if (game.isShowEventInfo) {
        console.log("touchend:" + event.touches);  
    }
    game.touches = null;
    game.isTouchDown = false;
}, false);
