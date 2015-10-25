/**
 * @author weimingtom
 */

/**
 * @see http://www.w3.org/TR/2dcontext/ 
 */

function TextMetrics() {};
TextMetrics.prototype.width = 0;
var textMetrics = new TextMetrics();


/**
 * ------------------------------------------------- 
 */

function CanvasRenderingContext2D() {};
var ctx = new CanvasRenderingContext2D();

/**
 * @type {String} 
 */
CanvasRenderingContext2D.prototype.fillStyle = new String();

/**
 * (default 10px sans-serif)
 * @type {String} 
 */
CanvasRenderingContext2D.prototype.font = new String();

/**
 * "start",<br/> 
 * "end", <br/>
 * "left", <br/>
 * "right", <br/>
 * "center" <br/>
 * (default: "start")<br/>
 * @type {String} 
 */
CanvasRenderingContext2D.prototype.textAlign = new String();

/**
 * "top",<br/>
 * "hanging",<br/> 
 * "middle",<br/>
 * "alphabetic",<br/> 
 * "ideographic",<br/>
 * "bottom",<br/>
 * (default: "alphabetic")<br/> 
 * @type {String} 
 */
CanvasRenderingContext2D.prototype.textBaseline = new String();

/**
 * 
 * @param {DOMString} text
 * @param {double} x
 * @param {double} y
 * @param {double} maxWidth
 */
CanvasRenderingContext2D.prototype.fillText = function(text, x, y, maxWidth){};

/**
 * @param {DOMString} text
 * @return {TextMetrics}
 */
CanvasRenderingContext2D.prototype.measureText = function(text){};

/**
 * @param {double} x
 * @param {double} y
 * @param {double} w
 * @param {double} h
 */
CanvasRenderingContext2D.prototype.clearRect = function(x, y, w, h){};

/**
 * @param {double} x
 * @param {double} y
 * @param {double} w
 * @param {double} h
 */
CanvasRenderingContext2D.prototype.fillRect = function(x, y, w, h){};

/**
 * @param {double} x
 * @param {double} y
 * @param {double} w
 * @param {double} h
 */
CanvasRenderingContext2D.prototype.strokeRect = function(x, y, w, h){};

/**
 * 
 * @param {Image} image
 * @param {double} dx
 * @param {double} dy
 */
CanvasRenderingContext2D.prototype.drawImage = function(image, dx, dy){};

/**
 * 
 * @param {Image} image
 * @param {double} dx
 * @param {double} dy
 * @param {double} dw
 * @param {double} dh
 */
CanvasRenderingContext2D.prototype.drawImage = function(image, dx, dy, dw, dh){};

/**
 * 
 * @param {Image} image
 * @param {double} sx
 * @param {double} sy
 * @param {double} sw
 * @param {double} sh
 * @param {double} dx
 * @param {double} dy
 * @param {double} dw
 * @param {double} dh
 */
CanvasRenderingContext2D.prototype.drawImage = function(image, sx, sy, sw, sh, dx, dy, dw, dh){};


