// exiftool.js/makernotes/panasonicLeica2

// summary:
//    Makernotes for the following Makes :
//    'LEICA' (X1)

// description:
//    ported from http://www.sno.phy.queensu.ca/~phil/exiftool/TagNames/Panasonic.html
//    (contains Leica tags)

// returns:
//    a makernote object for exiftool.js and redaktor/meta

exports.info = {
	
	DefaultHeaderSize : 8,
	
	tags : {
		0x0407: 'OriginalFileName',
		0x0408: 'OriginalDirectory',
		0x040d: 'ExposureMode',
		0x0410: 'ShotInfo',
		0x0411: 'ModeInfo',
		0x0412: 'FilmMode', 
		0x0413: 'WB_RGBLevels'
	},
	
	ref: {
		ExposureMode: function(arr){
			if( !(arr instanceof Array) ) return { value:'n/a', _val:arr };
			var modes = {
				0: 'Program AE',
				1: 'Aperture-priority AE',
				2: 'Shutter speed priority AE', //(guess)
				3: 'Manual'
			}
			return (arr[0] in modes) ? { value:modes[arr[0]], _val:arr } : { value:arr, _val:arr };
		},
		ModeInfo: function(arr){
			if( !(arr instanceof Array) ) return { value:'n/a', _val:arr };
			var modes = {
				1: 'Standard',
				2: 'Vivid',
				3: 'Natural',
				4: 'BW Natural',
				5: 'BW High Contrast'
			}
			return (arr[0] in modes) ? { value:modes[arr[0]], _val:arr } : { value:arr, _val:arr };
		}
	}
};