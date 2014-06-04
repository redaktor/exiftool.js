// exiftool.js/makernotes/kodak

// summary:
//    Makernotes for the following Makes :
//    'EASTMAN KODAK COMPANY'
//    'KODAK'

// description:
//    ported from http://www.sno.phy.queensu.ca/~phil/exiftool/TagNames/FujiFilm.html

// returns:
//    a makernote object for exiftool.js and redaktor/meta

/* TODO / FIXME
//	THIS IS A STUB !!!
*/

var MainRef = require('../exif').ref;

exports.info = {
	SerialFoundAtStartOfMakerNotes : true,
	InvalidSerialStart : 'KDK',
	MinimumBelievableLength : 12,
	
	tags: {
		
	},
	
	ref: {
		
	}
};