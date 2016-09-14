var fs 	 = require('fs');
var path = require('path');

var UglifyJS = require('uglify-js');
var CleanCSS = require('clean-css');
var fnv 	 = require('fnv-plus');

var jsSrc = '../js/main.js';
var jsDst = '../js/main-min.js';
var minStrNew = UglifyJS.minify( jsSrc ).code;
var minStrOld = fs.existsSync( jsDst ) ? fs.readFileSync( jsDst ).toString() : '';
if( minStrNew !== minStrOld ){
	fs.writeFileSync( jsDst, minStrNew );
	console.log('update: '+ jsDst );
}

var cssSrc = '../css/style.css';
var cssDst = '../css/style-min.css';
var str = fs.readFileSync( cssSrc );
var minStrNew = new CleanCSS().minify( str ).styles;
var minStrOld = fs.existsSync( cssDst ) ? fs.readFileSync( cssDst ).toString() : '';
if( minStrNew !== minStrOld ){
	fs.writeFileSync( cssDst, minStrNew );
	console.log('update: '+ cssDst );
}

var cssStr  = fs.readFileSync( cssDst ).toString();
var jsStr   = fs.readFileSync( jsDst ).toString();
var cssHash = fnv.hash( cssStr, 64 ).str();
var jsHash  = fnv.hash( jsStr, 	64 ).str();


var htmlSrc = '../html/main-dev.html';
var htmlDst = '../html/main.html';
var htmlOld = fs.readFileSync( htmlSrc ).toString();
var htmlNew = htmlOld
				.replace( cssSrc, cssDst +'?v='+ cssHash )
				.replace( jsSrc, jsDst +'?v='+ jsHash );
if( htmlNew !== htmlOld ){
	fs.writeFileSync( htmlDst, htmlNew );
	console.log('update: '+ htmlDst );
}
