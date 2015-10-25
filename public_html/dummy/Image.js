/**
 * @author weimingtom
 */

function Image() {};
Image.prototype = new Object();

/**
 * @type {String}
 */
Image.prototype.src = '';

/**
 * @type {function}
 */
Image.prototype.onload = new Function();
