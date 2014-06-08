// exiftool.js/makernotes/panasonicLeica2

// summary:
//    Makernotes for the following Makes :
//    'LEICA0' (some models)

// description:
//    ported from http://www.sno.phy.queensu.ca/~phil/exiftool/TagNames/Panasonic.html
//    (contains Leica tags)

// returns:
//    a makernote object for exiftool.js and redaktor/meta

exports.info = { DefaultHeaderSize : 8 };
	
exports.tags = {
	0x0d: 'WB_RGBLevels'
};
	
exports.ref = {
	WB_RGBLevels: function(arr){
		if( !(arr instanceof Array) || arr.length<3 ) return { value:'n/a', _val:arr };
		return { value: arr.join(', '), _val:arr }	
	}
};