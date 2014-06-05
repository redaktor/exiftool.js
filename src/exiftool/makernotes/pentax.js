// exiftool.js/makernotes/pentax

// summary:
//    Makernotes for the following Makes :
//    'Panasonic'
//    'PENTAX'
//    'PENTAX Corporation'

// description:
//    ported from http://www.sno.phy.queensu.ca/~phil/exiftool/TagNames/Pentax.html

// returns:
//    a makernote object for exiftool.js and redaktor/meta

/* TODO / FIXME
//	THIS IS A STUB !!!
*/

var MainRef = require('../exif').ref;

exports.info = {
	
	InternalSerialWithinIFDArray : 'CameraInfo',
	
	InternalSerialWithinIFDArrayElement : 4,
	
	DefaultHeaderSize : 6,
	
	MakerNoteByteAlignHeaderOffset : 4,
	
	FixMakernotesOffset : true,
	
	tags : {
		0x0215 : 'CameraInfo',
		0x0229 : 'SerialNumber'
	},
	
	ref: {
		
	}
};