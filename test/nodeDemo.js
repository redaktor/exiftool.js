var start = Date.now();
var exec = require('child_process').exec;
// optional, enter absolute path to perl exiftool here:
var perl = 'exiftool';

var exiftool = require('../');
var util = require('util');

var img = './sampleImages/Canon/CanonEOS5D_MarkIII.jpg';

exec( perl.concat(" -q -q -F -j --FileAccessDate --FileModifyDate --FileInodeChangeDate '", img, "'"), function(error, stdout, stderr) {
	if (error !== null) {
		console.log('could not generate REFERENCE RESULT (perl) - exec error with ' + img + ': ' + error);
		console.log('if perl exiftool is installed but not in your PATH, specify the absolute path in this file ...')
	} else {
		// stdout string takes some munging...
		var exifFromPerl = String(stdout);
		exifFromPerl = exifFromPerl.replace(/\r?\n|\r/g, ""); // lose newlines
		exifFromPerl = exifFromPerl.substring(1, exifFromPerl.length - 1); // lose surrounding []
		console.log( 'perl exiftool finished in ', Date.now()-start, ' ms' );
		console.log( 'REFERENCE RESULT (perl) ', exifFromPerl );
	}
});


exiftool.getExif(img, function(meta) {
	console.log( 'js exiftool finished in ', Date.now()-start, ' ms' );
	console.log( util.inspect(meta, {depth:8}) );
	
	/* 
	// all tags in one object ...
	var r = {};
	var flat = function(obj) {
		for (var i in obj) {
			if (!obj.hasOwnProperty(i)) continue;
			
			if (typeof obj[i] === 'object' && !(obj[i] instanceof Array)) {
				if ('value' in obj[i]) {
					if( !(i in r) || 'priority' in obj[i] ){ 
						r[i] = obj[i].value;
					}
				} else {
					var flatObject = flat(obj[i]);
					for (var x in flatObject) {
						if (!flatObject.hasOwnProperty(x)) continue;
						if( !(x in r) || (typeof flatObject[x] === 'object' && 'priority' in flatObject[x]) ){ 
							r[x] = (typeof flatObject[x] === 'object' && 'value' in flatObject[x]) ? flatObject[x].value : flatObject[x];
						}
					}
				}
			} else {
				if( !(i in r) ) r[i] = obj[i];
			}
		}
		return r;
	};
	console.log( util.inspect(flat(meta), {depth:8}) );
	*/
});
