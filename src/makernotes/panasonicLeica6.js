// exiftool.js/makernotes/panasonicLeica2

// summary:
//    Makernotes for the following Makes :
//    'LEICA0' (S2 and M (Typ 240))

// description:
//    ported from http://www.sno.phy.queensu.ca/~phil/exiftool/TagNames/Panasonic.html
//    (contains Leica tags)

// returns:
//    a makernote object for exiftool.js and redaktor/meta

exports.info = {
	
	DefaultHeaderSize : 8,
	
	tags : {
		0x300: 'PreviewImage',
		0x301: 'UnknownBlock',
		0x303: 'LensType'
	} 
};