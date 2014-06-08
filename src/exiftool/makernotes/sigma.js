// exiftool.js/makernotes/sigma

// summary:
//    Makernotes for the following Makes :
//    'SIGMA'
//    'FOVEON'

// description:
//    ported from http://www.sno.phy.queensu.ca/~phil/exiftool/TagNames/Sigma.html

// returns:
//    a makernote object for exiftool.js and redaktor/meta


var MainRef = require('../exif').ref;

exports.info = {
	DefaultHeaderSize : 10,
	FixMakernotesOffset: true,
};
exports.tags = {
	0x0002: 'SerialNumber',
	0x0003: 'DriveMode',
	0x0004: 'ResolutionMode',
	0x0005: 'AFMode',
	0x0006: 'FocusSetting',
	0x0007: 'WhiteBalance',
	0x0008: 'ExposureMode',
	0x0009: 'MeteringMode',
	0x000a: 'LensFocalRange',
	0x000b: 'ColorSpace',
	0x000c: 'ExposureAdjust',
	0x000d: 'Contrast',
	0x000e: 'Shadow',
	0x000f: 'Highlight',
	0x0010: 'Saturation',
	0x0011: 'Sharpness',
	0x0012: 'X3FillLight',
	0x0014: 'ColorAdjustment',
	0x0015: 'AdjustmentMode',
	0x0016: 'Quality',
	0x0017: 'Firmware',
	0x0018: 'Software',
	0x0019: 'AutoBracket',
	0x001a: 'PreviewImageStart',
	0x001b: 'PreviewImageLength',
	0x001c: 'PreviewImageSize',
	0x001d: 'MakerNoteVersion',
	0x001e: 'PreviewImageSize',
	0x001f: 'AFPoint',
	0x0022: 'FileFormat',
	0x0024: 'Calibration', // (invalid for SD9,SD14?)
	0x0026: 'FileFormat',
	0x0027: 'LensType',
	0x002a: 'LensFocalRange',
	0x002b: 'LensMaxApertureRange',
	0x002c: 'ColorMode',
	0x0030: 'LensApertureRange',
	0x0031: 'FNumber',
	0x0032: 'ExposureTime',
	0x0033: 'ExposureTime2',
	0x0034: 'BurstShot',
	0x0035: 'ExposureCompensation',
	0x0039: 'SensorTemperature',
	0x003a: 'FlashExposureComp',
	0x003b: 'Firmware',
	0x003c: 'WhiteBalance',
	0x003d: 'PictureMode',
	0x0048: 'LensApertureRange',
	0x0049: 'FNumber',
	0x004a: 'ExposureTime',
	0x004b: 'ExposureTime2',
	0x004d: 'ExposureCompensation',
	0x0055: 'SensorTemperature',
	0x0056: 'FlashExposureComp',
	0x0057: 'Firmware',
	0x0058: 'WhiteBalance',
	0x0059: 'DigitalFilter'
};

exports.ref = {
	ExposureMode: {
		A: 'Aperture-priority AE',
		M: 'Manual',
		P: 'Program AE',
		S: 'Shutter speed priority AE'
	},
	MeteringMode: {
		A: 'Average',
		C: 'Center-weighted average',
		8: 'Multi-segment'
	},
	ExposureAdjust: function(x){
		if (typeof x === 'string') {
			// written by Sigma Photo Pro this is a string
			return { value:x.replace(/Expo:/g, ''), _val:x };
		} else {
			return { value:x, _val:x };
		}
	},
	Contrast: function(x){
		if (typeof x === 'string') {
			// written by Sigma Photo Pro this is a string
			return { value:x.replace(/Cont:/g, ''), _val:x };
		} else {
			return { value:x, _val:x };
		}
	},
	Shadow: function(x){
		if (typeof x === 'string') {
			// written by Sigma Photo Pro this is a string
			return { value:x.replace(/Shad:/g, ''), _val:x };
		} else {
			return { value:x, _val:x };
		}
	},
	Highlight: function(x){
		if (typeof x === 'string') {
			// written by Sigma Photo Pro this is a string
			return { value:x.replace(/High:/g, ''), _val:x };
		} else {
			return { value:x, _val:x };
		}
	},
	Saturation: function(x){
		if (typeof x === 'string') {
			// written by Sigma Photo Pro this is a string
			return { value:x.replace(/Satu:/g, ''), _val:x };
		} else {
			return { value:x, _val:x };
		}
	},
	Sharpness: function(x){
		if (typeof x === 'string') {
			// written by Sigma Photo Pro this is a string
			return { value:x.replace(/Shar:/g, ''), _val:x };
		} else {
			return { value:x, _val:x };
		}
	},
	X3FillLight: function(x){
		if (typeof x === 'string') {
			// written by Sigma Photo Pro this is a string
			return { value:x.replace(/Fill:/g, ''), _val:x };
		} else {
			return { value:x, _val:x };
		}
	},
	ColorAdjustment: function(x){
		if (typeof x === 'string') {
			// written by Sigma Photo Pro this is a string
			return { value:x.replace(/CC:/g, ''), _val:x };
		} else {
			return { value:x, _val:x };
		}
	},
	Quality: function(x){
		if (typeof x === 'string') {
			// written by Sigma Photo Pro this is a string
			return { value:x.replace(/Qual:/g, ''), _val:x };
		} else {
			return { value:x, _val:x };
		}
	},		
	PreviewImageStart: function(x){
		if (typeof x === 'number') {
			return { value:x, _val:x };
		} else {
			// written by Sigma Photo Pro this is string "ChrominanceNoiseReduction"
			return { key:'ChrominanceNoiseReduction', value:x.replace(/Chro:/g, ''), _val:x };
		}
	},
	PreviewImageLength: function(x){
		if (typeof x === 'number') {
			return { value:x, _val:x };
		} else {
			// written by Sigma Photo Pro this is string "LuminanceNoiseReduction"
			return { key:'LuminanceNoiseReduction', value:x.replace(/Luma:/g, ''), _val:x };
		}
	},
	PreviewImageSize: function(x, model){
		if (new RegExp(/^SIGMA (SD1( Merrill)?|DP\d Merrill)/).test(model) === false){
			return { value:x, _val:x };
		} else {
			// written by the SD1 and Merrill models this is "PreviewImageStart"
			return { key:'PreviewImageStart', value:x, _val:x };
		}
	},
	MakerNoteVersion: function(x, model){
		if (new RegExp(/^SIGMA (SD1( Merrill)?|DP\d Merrill)/).test(model) === false){
			return (x instanceof Array) ? MainRef.versions(x) : { value:x, _val:x };
		} else {
			// written by the SD1 and Merrill models this is "PreviewImageStart"
			return { key:'PreviewImageLength', value:x, _val:x };
		}
	},
	AFPoint: function(x, model){
		if (new RegExp(/^SIGMA (SD1( Merrill)?|DP\d Merrill)/).test(model) === false){
			return { value:x, _val:x };
		} else {
			// written by the SD1 and Merrill models this is "MakerNoteVersion"
			if (x instanceof Array === false) return { value:x, _val:x };
			var v = MainRef.versions(x);
			v.key = 'MakerNoteVersion';
			return v;
		}
	},
	LensType: {
		16: 'Sigma 18-50mm F3.5-5.6 DC',
		129: 'Sigma 14mm F2.8 EX Aspherical',
		131: 'Sigma 17-70mm F2.8-4.5 DC Macro',
		145: 'Sigma Lens (145)',
		145.1: 'Sigma 15-30mm F3.5-4.5 EX DG Aspherical',
		145.2: 'Sigma 18-50mm F2.8 EX DG', //(NC)
		145.3: 'Sigma 20-40mm F2.8 EX DG',
		165: 'Sigma 70-200mm F2.8 EX', // ...but what specific model?:
		// 70-200mm F2.8 EX APO - Original version, minimum focus distance 1.8m (1999)
		// 70-200mm F2.8 EX DG - Adds 'digitally optimized' lens coatings to reduce flare (2005)
		// 70-200mm F2.8 EX DG Macro (HSM) - Minimum focus distance reduced to 1m (2006)
		// 70-200mm F2.8 EX DG Macro HSM II - Improved optical performance (2007)
		169: 'Sigma 18-50mm F2.8 EX DC', //(NC)
		581: 'Sigma 18-50mm F2.8 EX DC Macro', // (SD1)
		583: 'Sigma 17-50mm F2.8 EX DC OS', // (SD1 kit)
		1003: 'Sigma 19mm F2.8', // (DP1 Merrill kit)
		1004: 'Sigma 30mm F2.8', // (DP2 Merrill kit)
		1005: 'Sigma 50mm F2.8 Macro', // (DP3 Merrill kit)
		8900: 'Sigma 70-300mm F4-5.6 DG OS', // (SD15)
		'A100': 'Sigma 24-70mm F2.8 DG Macro', // (SD15)
		'FFFF': '28-70mm F2.8 ?'
	},
	ColorMode: {
		0: 'n/a',
		1: 'Sepia',
		2: 'B&W',
		3: 'Standard',
		4: 'Vivid',
		5: 'Neutral',
		6: 'Portrait',
		7: 'Landscape',
		8: 'FOV Classic Blue',
	},
	LensApertureRange: function(x, model){
		if (new RegExp(/^SIGMA (SD1( Merrill)?|DP\d Merrill)/).test(model) === false){
			return { value:x, _val:x };
		} else {
			// written by the SD1 and Merrill models this is "PreviewImageStart"
			return { key:'Calibration', value:x, _val:x };
		}
	},
	FNumber: function(n){
		if( typeof n !== 'number' ) return { value:n, _val:n };
		return { value:n.toFixed(1), _val:n };
	},
	ExposureTime: function(n){ return MainRef.expoTime(n); },
	ExposureTime2: function(n){ return MainRef.expoTime(n * 1e-6); },
	ExposureCompensation: function(n){ return MainRef.plusminus(n); },
	SensorTemperature: function(n){ return (typeof n === 'number') ? { value:n.toString().concat(' C'), _val:n } : { value:n, _val:n } },
	PictureMode: {
		0: 'n/a',
		1: 'Standard',
		2: 'Standard',
		3: 'Standard',
		4: 'Vivid',
		5: 'Neutral',
		6: 'Portrait',
		7: 'Landscape',
		8: 'FOV Classic Blue',
	}
};