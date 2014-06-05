// exiftool.js/makernotes/nikon

// summary:
//    Makernotes for the following Makes :
//    'NIKON CORPORATION'
//    'NIKON CORPORATIO'

// description:
//    ported from http://www.sno.phy.queensu.ca/~phil/exiftool/TagNames/Nikon.html

// returns:
//    a makernote object for exiftool.js and redaktor/meta

/* TODO 
// FIXME :
# most are little-endian, but D1 is big

// following seem to be only pointers - not done yet
// FIXME :
// we can use main/readMakernoteContainer() to do

// PictureControl ?
// ColorBalance: 11990,
// FlashInfo, (cam specific)
// ShotInfo, (cam specific)

// LensData might be decrypted and is needed to identify lenses!
*/

var MainRef = require('../exif').ref;

exports.info = {
	
	HeaderSize : {
		'NikonMM' : 18,
		'Nikon' : 8
	},
	MakerNoteByteAlignHeaderOffset : 10, 
	// headerstring looks like 'NikonMM.*....' for type 3
	// and like 'Nikon.....' for type 1
	UseMakernoteOffsetAsBase : {
		'NikonMM' : true,
		'Nikon' : false
	},
	AdjustOffsetBase : {
		'NikonMM' : 10,
		'Nikon' : 0
	},
	
	tags : {
		0x001d: 'SerialNumber',
		0x00a0: 'SerialNumber',
		0x0011: '_IFDpointer_Preview',
		0x0091: '_IFDpointer_ShotInfo', 
		0x0097: '_IFDpointer_ColorBalance',
		0x0023: '_IFDpointer_PictureControl',
		0x00bd: '_IFDpointer_PictureControl', 

		0x0098: 'LensData',
		
		0x0001: 'MakerNoteVersion',
		0x0002: 'ISO',
		0x0003: 'ColorMode',
		0x0004: 'Quality',
		0x0005: 'WhiteBalance',
		0x0006: 'Sharpness',
		0x0007: 'FocusMode',
		0x0008: 'FlashSetting',
		0x0009: 'FlashType',
		0x000b: 'WhiteBalanceFineTune',
		0x000c: 'WB_RBLevels',
		0x000d: 'ProgramShift',
		0x000e: 'ExposureDifference',
		0x000f: 'ISOSelection',
		0x0010: 'DataDump',
		0x0012: 'FlashExposureComp',
		0x0013: 'ISOSetting',
		0x0014: 'ColorBalanceA', 
		0x0016: 'ImageBoundary',
		0x0017: 'ExternalFlashExposureComp',
		0x0018: 'FlashExposureBracketValue',
		0x0019: 'ExposureBracketValue',
		0x001a: 'ImageProcessing',
		0x001b: 'CropHiSpeed',
		0x001c: 'ExposureTuning',
		0x001e: 'ColorSpace', 
		0x001f: 'VRInfo', 
		0x0020: 'ImageAuthentication', 
		0x0021: 'FaceDetect', 
		0x0022:	'ActiveDLighting', 
		0x0024: 'WorldTime', 
		0x0025: 'ISOInfo', 
		0x002a: 'VignetteControl', 
		0x002b: 'DistortInfo', 
		// 0x002c: 'UnknownInfo', 
		// 0x0032: 'UnknownInfo2', 
		0x0035: 'HDRInfo', 
		0x0039: 'LocationInfo', 
		0x003d: 'BlackLevel',
		0x0080: 'ImageAdjustment',
		0x0081: 'ToneComp',
		0x0082: 'AuxiliaryLens',
		0x0083: 'LensType', 
		0x0084: 'Lens',
		0x0085: 'ManualFocusDistance',
		0x0086: 'DigitalZoom',
		0x0088: 'AFInfo', 
		0x0089: 'ShootingMode', 
		0x008b: 'LensFStops',
		0x008c: 'ContrastCurve',
		0x008d: 'ColorHue',
		0x008f: 'SceneMode',
		0x0090: 'LightSource',
		0x0092: 'HueAdjustment',
		0x0094: 'Saturation',
		0x0095: 'NoiseReduction',
		0x0096: 'NEFLinearizationTable',
		0x0099: 'RawImageCenter',
		0x009a: 'SensorPixelSize',
		0x009c: 'SceneAssist',
		0x009e:	'RetouchHistory', 	
		0x00a2: 'ImageDataSize',
		0x00a5: 'ImageCount',
		0x00a6: 'DeletedImageCount',
		0x00a7: 'ShutterCount',
		0x00a8: 'FlashInfo', 
		0x00a9: 'ImageOptimization',
		0x00aa: 'Saturation',
		0x00ab: 'VariProgram',
		0x00ac: 'ImageStabilization',
		0x00ad: 'AFResponse',
		0x00b0: 'MultiExposure',
		0x00b3: 'ToningEffect',
		0x00b6: 'PowerUpTime',
		0x00b7: 'AFInfo2', 
		0x00b8: 'FileInfo', 
		0x00b9: 'AFTune', 
		0x0e00: 'PrintIM', 
		0x0e01: 'NikonCapture', 
		0x0e09: 'NikonCaptureVersion',
		0x0e0e: 'CaptureOffsets', 
		0x0e10: 'Scan', 
		0x0e13: 'NikonCapture', 
		0x0e1d: 'ICC_Profile', 
		0x0e1e: 'CaptureOutput',
		/* TODO
		0x0e22: 
		 { value: 'NEFBitDepth',
		   ? _val: '{'\0 0 0 0\':'n/a (JPEG)',  \8 8 8 0\':'8 x 3',  \12 0 0 0\':'12',  \14 0 0 0\':'14',  \16 16 16 0\':'16 x 3'}' }
		   */
		0x0e22: 'NEFBitDepth'
	},
	ref : {
		MakerNoteVersion: function(arr){ return MainRef.versions(arr); },
		ISO: function(n){ return (typeof n == 'number') ? {value:n, _val:n} : {value:parseInt(n[1]), _val:n}; },
		ISOSetting: function(n){ return exports.info.ref.ISO(n); },
		ISOInfoISO: function(n){ 
			return (typeof n == 'number') ? {value:(100*Math.exp((n/12-5)*Math.log(2))), _val:n} : {value:n, _val:n};
		},
		ColorSpace: {1:'sRGB',  2:'Adobe RGB'},
		ImageAuthentication: {0:'Off',  1:'On'},
		ActiveDLighting: {0: 'Off', 1: 'Low', 3: 'Normal', 5: 'High', 7: 'Extra High', 8: 'Extra High 1', 9: 'Extra High 2', 10: 'Extra High 3', 11: 'Extra High 4', 65535: 'Auto'},
		VignetteControl: {0:'Off',  1:'Low',  3:'Normal',  5:'High'},
		
		LensType: {0: 'AF', 2: 'Nikon D series Lens', 6: 'Nikon G series Lens', 10: 'Nikon D series Lens VR', 14: 'Nikon G series Lens VR', 24: 'Nikon VR [4]'},
		Lens: function(arr){ return MainRef.printLensInfo(arr); },
				
		RetouchHistory:{0: 'None', 3: 'B & W', 4: 'Sepia', 5: 'Trim', 6: 'Small Picture', 7: 'D-Lighting', 8: 'Red Eye', 9: 'Cyanotype', 10: 'Sky Light', 11: 'Warm Tone', 12: 'Color Custom', 13: 'Image Overlay', 14: 'Red Intensifier', 15: 'Green Intensifier', 16: 'Blue Intensifier', 17: 'Cross Screen', 19: 'NEF Processing', 23: 'Distortion Control', 25: 'Fisheye', 26: 'Straighten', 29: 'Perspective Control', 30: 'Color Outline', 31: 'Soft Filter', 32: 'Resize', 33: 'Miniature Effect', 34: 'Skin Softening', 35: 'Selected Frame', 37: 'Color Sketch', 38: 'Selective Color', 40: 'Drawing'},
		
		ShootingMode: function(int){
			var ShootingBitmask = {
				0: 'Continuous',
                1: 'Delay',
                2: 'PC Control',
                4: 'Exposure Bracketing',
                5: 'Auto ISO',
                6: 'White-Balance Bracketing',
                7: 'IR Control'
			};
			return { value:MainRef.bitmask(int, ShootingBitmask, 8, true /* TODO - CHECKME why reverse ? */ ), _val:int };
		},
		
		MultiExposure: function(arr){
			if ( !(arr instanceof Array) ) return { value:arr, _val:arr };
			/* TODO - not clear if this is in compliance with exiftool, but version should be first 4 values ... */
			var me = {
				0: { desc: 'MultiExposureVersion', fn: function(){ return MainRef.versions(arr, 4); } },
				4: { desc: 'MultiExposureMode', values: {0:'Off',  1:'Multiple Exposure',  2:'Image Overlay',  3:'HDR'} },
				5: { desc: 'MultiExposureShots', fn: function(){ return MainRef._arr(arr.slice(5,11)); } },
				11: { desc: 'MultiExposureAutoGain', values: {0:'Off',  1:'On'} }
			};
			return MainRef.multiple(arr,me);
		},
		CropHiSpeed: function(arr){
			if(arr.length>6){
				var crStr = (arr[0]==0) ? 'Off' : 'On';
				return {value:crStr.concat( ' (', arr[1],'x',arr[2],' cropped to ',arr[3],'x',arr[4],' at pixel ',arr[5],',',arr[6],')' ), _val:arr};
			}
			return {value:arr, _val:arr};
		},
		ImageBoundary: function(arr){
			if(arr.length==4){
				return {value:arr.join(' '), _val:arr};
			}
			return {value:arr, _val:arr};
		},
		RetouchHistory: function(arr){ return MainRef._arr(arr); },
		/* TODO - goes in thumb container - currently handled by redaktor.meta.preview
		PreviewIFD: { 
			0x00fe: { value: 'SubfileType',
				_val: {0x0:'Full-resolution Image',  0x1:'Reduced-resolution image',  0x2:'Single page of multi-page image',  0x3:'Single page of multi-page reduced-resolution image',  0x4:'Transparency mask',  0x5:'Transparency mask of reduced-resolution image',  0x6:'Transparency mask of multi-page image',  0x7:'Transparency mask of reduced-resolution multi-page image',  0x10001:'Alternate reduced-resolution image',  0xffffffff:'invalid'
				// TODO ,  Bit 0:'Reduced resolution',  Bit 1:'Single page',  Bit 2:'Transparency mask',  Bit 3:'TIFF/IT final page',  Bit 4:'TIFF-FX mixed raster content'
				} 
			},
			0x0103: { ref: 'EXIFCompression' },
			0x011a: 'XResolution',
			0x011b: 'YResolution',
			0x0128: { value: 'ResolutionUnit', _val: {1:'None',  2:'inches',  3:'cm'} },
			0x0201: 'PreviewImageStart',
			0x0202: 'PreviewImageLength',
			0x0213: { value: 'YCbCrPositioning', _val: {1:'Centered',  2:'Co-sited'} }
		},
		*/
		ColorBalanceA: 	{ 
			624: 'RedBalance', 
			625: 'BlueBalance' 
		},
		AFTune: function(arr){
			var af = {
				0: { desc: 'AFFineTune', values: {0:'Off',  1:'On (1)',  2:'On (2)'} },
				1: { desc: 'AFFineTuneIndex', values: {255:'n/a'} },
				2: { desc: 'AFFineTuneAdj', values: {255:'n/a'} }
			};
			return MainRef.multiple(arr,af);
		},
		DistortInfo: function(arr){
			if ( !(arr instanceof Array) ) return { value:arr, _val:arr };
			var di = {
				0: { desc: 'AutoDistortionVersion', /*charCodes: [0,1,2,3]*/ fn:function(arr){ 
					if ( !(arr instanceof Array) ) return { value:arr, _val:arr };
					return (arr!==null && arr instanceof Array) ?  MainRef.versions(arr, 4) : 'n/a'; } 
				},
				4: { desc: 'AutoDistortionControl', values: {0:'Off',  1:'On'} }
			};
			return MainRef.multiple(arr,di);
		},
		VRInfo: function(arr){ 
			if ( !(arr instanceof Array) ) return { value:arr, _val:arr };
			var vr = {
				0: { desc: 'VRInfoVersion', fn:function(arr){ 
					if ( !(arr instanceof Array) ) return { value:arr, _val:arr };
					return (arr!==null && arr instanceof Array) ?  MainRef.versions(arr, 4) : 'n/a'; } 
				},
				4: { desc: 'VibrationReduction', values: {0:'n/a', 1:'On', 2:'Off'} },
				6: { desc: 'VRMode', values: {0:'Normal', 1:'Active'} },
			};
			return MainRef.multiple(arr,vr);
		},
		ExposureBracketValue: function(data){ return MainRef.decToFrac(data); },
		FlashExposureBracketValue: function(arr){ return MainRef.brackets(arr); },
		FlashExposureComp: function(arr){ return MainRef.brackets(arr); },
		ExternalFlashExposureComp: function(arr){ return MainRef.brackets(arr); },
		ProgramShift: function(arr){ return MainRef.brackets(arr); },
		ExposureDifference: function(arr){ return MainRef.brackets(arr); },
		ExposureTuning: function(arr){ return MainRef.brackets(arr); },
		LensFStops: function(arr){ return MainRef.brackets(arr); },

		HDRInfo: function(arr){ 
			if ( !(arr instanceof Array) ) return { value:arr, _val:arr };
			var hdr = {
				0: { desc: 'HDRInfoVersion', /*charCodes: [0,1,2,3]*/ fn:function(arr){ 
					if ( !(arr instanceof Array) ) return { value:arr, _val:arr };
					return (arr!==null && arr instanceof Array) ?  MainRef.versions(arr, 4) : 'n/a'; } 
				},
				4: { desc: 'HDR', values: {0:'Off',  1:'On',  48:'Auto'} },
				5: { desc: 'HDRLevel', values: {0:'Auto',  1:'1 EV',  2:'2 EV',  3:'3 EV',  255:'n/a'} },
				6: { desc: 'HDRSmoothing', values: {0: 'Off',  1: 'Normal', 2: 'Low', 3: 'High', 48: 'Auto', 255: 'n/a'} },
				7: { desc: 'HDRLevel2', values: {0:'Auto',  1:'1 EV',  2:'2 EV',  3:'3 EV',  255:'n/a'} }	
			};
			return MainRef.multiple(arr,hdr);
		},
		ISOInfo: function(arr){ 
			var iso = {
				// 100*Math.exp(($val/12-5)*Mathlog(2))
				0: { desc: 'ISO', fn: function(){ return exports.info.ref.ISOInfoISO(arr[0]) } }, 
				/*(val = 100 * 2**(raw/12-5))*/
				4: { desc: 'ISOExpansion', values: { 0x0: 'Off', 0x101: 'Hi 0.3', 0x102: 'Hi 0.5', 0x103: 'Hi 0.7', 0x104: 'Hi 1.0', 0x105: 'Hi 1.3', 0x106: 'Hi 1.5', 0x107: 'Hi 1.7', 0x108: 'Hi 2.0', 0x201: 'Lo 0.3', 0x202: 'Lo 0.5', 0x203: 'Lo 0.7', 0x204: 'Lo 1.0	'} }, 
				6: { desc: 'ISO2', fn:function(){ return exports.info.ref.ISOInfoISO(arr[0]) } },
				10: { desc: 'ISOExpansion2', values: {0x0: 'Off', 0x101: 'Hi 0.3', 0x102: 'Hi 0.5', 0x103: 'Hi 0.7', 0x104: 'Hi 1.0', 0x105: 'Hi 1.3', 0x106: 'Hi 1.5', 0x107: 'Hi 1.7', 0x108: 'Hi 2.0', 0x201: 'Lo 0.3', 0x202: 'Lo 0.5', 0x203: 'Lo 0.7', 0x204: 'Lo 1.0'} }
			}
			return MainRef.multiple(arr,iso);
		},
		WorldTime: function(arr){ 
			if ( !(arr instanceof Array) ) return { value:arr, _val:arr };
			var wt = {
				0: { desc: 'Timezone', 
					fn:function(){
						// TODO - URGENT FIXME ! - TimezoneIssue - needs a fix
						// seems to have Endianess issues (e.g. [212,254] or [254,212])
						// If "using" exiftool perl fn., issue seems to be described (for a c++ library) : 'bogus timezone' :
						// http://dev.exiv2.org/boards/3/topics/1691
						// worst hardcoded quick-fix-pseudo-solution ;)
						var tz = {286: -8, 346: -7, 405:-6, 466:-5, 271:-4, 331:-3, 391:-2, 451:-1, 180: -1, 0:0, 60:1, 120:2, 180:3, 240:4, 45:5, 105:6, 165:7, 225:8, 30:9};
						if ( typeof arr[0]==='number' && typeof arr[1]==='number' && (arr[0]+arr[1]) in tz) {
							var pref = ((tz[(arr[0]+arr[1])]<0) ? '-':'+').concat( ((tz[(arr[0]+arr[1])]<10) ? '0':'') );
							return {value: pref.concat(tz[(arr[0]+arr[1])],':00'), _val:arr.slice(0,2)} 
						}
						return {value:arr.slice(0,2), _val:arr.slice(0,2)};
					} 
				},
				2: { desc: 'DaylightSavings', values: {0:'No',  1:'Yes'} },
				3: { desc: 'DateDisplayFormat', values: {0:'Y/M/D',  1:'M/D/Y',  2:'D/M/Y'} }
			}
			return MainRef.multiple(arr,wt);
		},
			
		FaceDetect: { 
			1: 'FaceDetectFrameSize',
			3: 'FacesDetected',
			4: 'Face1Position',
			8: 'Face2Position',
			12: 'Face3Position',
			16: 'Face4Position',
			20: 'Face5Position',
			24: 'Face6Position',
			28: 'Face7Position',
			32: 'Face8Position',
			36: 'Face9Position',
			40: 'Face10Position',
			44: 'Face11Position',
			48: 'Face12Position' 
		},
		_IFDpointer_PictureControl: { 
			0: 'PictureControlVersion',
			4: 'PictureControlName',
			24: 'PictureControlBase',
			48: { value: 'PictureControlAdjust', _val: {0:'Default Settings',  1:'Quick Adjust',  2:'Full Control'} },
			49: 'PictureControlQuickAdjust',
			50: 'Sharpness',
			51: 'Contrast',
			52: 'Brightness',
			53: 'Saturation',
			54: 'HueAdjustment',
			57: 'ToningSaturation'/*,
			
			0x80 = Off\n  0x81 = Yellow\n  0x82 = Orange': '',
			0x80 = B&W\n  0x81 = Sepia\n  0x82 = Cyanotype\n  0x83 = Red\n  0x84 = Yellow\n  0x85 = Green': ''  */
		},
		UnknownInfo: { 0: 'UnknownInfoVersion?' },
		UnknownInfo2: { 0: 'UnknownInfo2Version?' },
		LocationInfo: { 
			0: 'LocationInfoVersion',
			4: { value: 'TextEncoding', _val: {0:'n/a',  1:'UTF8',  2:'UTF16'} },
			5: 'CountryCode',
			9: 'Location' 
		},
		AFInfo: { 
			0: { value: 'AFAreaMode', _val: {0: 'Single Area', 1: 'Dynamic Area', 2: 'Dynamic Area (closest subject)', 3: 'Group Dynamic', 4: 'Single Area (wide)', 5: 'Dynamic Area (wide)'}},
			1: { value: 'AFPoint', _val: {0: 'Center', 1: 'Top', 2: 'Bottom', 3: 'Mid-left', 4: 'Mid-right', 5: 'Upper-left', 6: 'Upper-right', 7: 'Lower-left', 8: 'Lower-right', 9: 'Far Left', 10: 'Far Right'}},
			2: { value: 'AFPointsInFocus',  _val: ['Center', 'Top', 'Bottom', 'Mid-left', 'Upper-left', 'Lower-left', 'Far Left', 'Mid-right', 'Upper-right', 'Lower-right', 'Far Right'/* TODO ? 	0x7ff = All 11 Points (default) */] },
		},
		
		ColorBalance1: { 0: 'WB_RBGGLevels' },
		ColorBalance2: { 0: 'WB_RGGBLevels' },
		ColorBalance3: { 0: 'WB_RGBGLevels' },
		ColorBalance4: { 0: 'WB_GRBGLevels' },
		ColorBalanceUnknown: { 0: 'ColorBalanceVersion' },
		
		LensData: function(arr, model){
			var lensData = {
				0: { //00
					0: { desc: 'LensDataVersion' },
					6: { desc: 'LensIDNumber' },
					7: { desc: 'LensFStops' },
					8: { desc: 'MinFocalLength' },
					9: { desc: 'MaxFocalLength' },
					10: { desc: 'MaxApertureAtMinFocal' },
					11: { desc: 'MaxApertureAtMaxFocal' },
					12: { desc: 'MCUVersion' }
				},
				1: { //01
					0: { desc: 'LensDataVersion' },
					4: { desc: 'ExitPupilPosition' },
					5: { desc: 'AFAperture' },
					8: { desc: 'FocusPosition' },
					9: { desc: 'FocusDistance' },
					10: { desc: 'FocalLength' },
					11: { desc: 'LensIDNumber' },
					12: { desc: 'LensFStops' },
					13: { desc: 'MinFocalLength' },
					14: { desc: 'MaxFocalLength' },
					15: { desc: 'MaxApertureAtMinFocal' },
					16: { desc: 'MaxApertureAtMaxFocal' },
					17: { desc: 'MCUVersion' },
					18: { desc: 'EffectiveMaxAperture' }
				},
				2: { //204
					0: { desc: 'LensDataVersion' },
					4: { desc: 'ExitPupilPosition' },
					5: { desc: 'AFAperture' },
					8: { desc: 'FocusPosition' },
					10: { desc: 'FocusDistance' },
					11: { desc: 'FocalLength' },
					12: { desc: 'LensIDNumber' },
					13: { desc: 'LensFStops' },
					14: { desc: 'MinFocalLength' },
					15: { desc: 'MaxFocalLength' },
					16: { desc: 'MaxApertureAtMinFocal' },
					17: { desc: 'MaxApertureAtMaxFocal' },
					18: { desc: 'MCUVersion' },
					19: { desc: 'EffectiveMaxAperture' }
				},
				3: { //400
					0: { desc: 'LensDataVersion' }, 
					394: { desc: 'LensModel' } 
				},
				Unknown: { 0: { desc: 'LensDataVersion' } }
			}
			// TODO
			var table = 'Unknown';
			
			if (model.trim().indexOf(' D100')>-1 || model.trim().indexOf(' D1X')>-1){
				table = 0; 
			} else {
				// FIXME
				// tables 1, 2 and 3 are decrypted
				// implement encryption from perl
			}
			
			return MainRef.multiple(arr,lensData[table]);
		},
		
		FlashFirmware: { 
			'0 0': 'n/a',
			'1 1': '1.01 (SB-800 or Metz 58 AF-1)',
			'1 3': '1.03 (SB-800)',
			'2 1': '2.01 (SB-800)',
			'2 4': '2.04 (SB-600)',
			'2 5': '2.05 (SB-600)',
			'3 1': '3.01 (SU-800 Remote Commander)' 
		},
		
		FlashGNDistance: {
			0: '0', 
			1: '0.1 m',	
			2: '0.2 m',	
			3: '0.3 m',	
			4: '0.4 m',	
			5: '0.5 m',	
			6: '0.6 m',	
			7: '0.7 m',	
			8: '0.8 m',	
			9: '0.9 m',	
			10: '1.0 m',	
			11: '1.1 m',	
			12: '1.3 m',	
			13: '1.4 m',	
			14: '1.6 m',
			15: '1.8 m',
			16: '2.0 m',
			17: '2.2 m',
			18: '2.5 m',
			19: '2.8 m',
			20: '3.2 m',
			21: '3.6 m',
			22: '4.0 m',
			23: '4.5 m',
			24: '5.0 m',
			25: '5.6 m',
			26: '6.3 m',
			27: '7.1 m',
			28: '8.0 m',
			29: '9.0 m',
			30: '10.0 m',
			31: '11.0 m',
			32: '13.0 m',
			33: '14.0 m',
			34: '16.0 m',
			35: '18.0 m',
			36: '20.0 m',
			255: 'n/a'
		},
		FlashControlMode: {
			0x0: 'Off', 
			0x3: 'Auto Aperture', 
			0x6: 'Manual', 
			0x1: 'iTTL-BL', 
			0x4: 'Automatic', 
			0x7: 'Repeating Flash', 
			0x2: 'iTTL', 
			0x5: 'GN (distance priority)'	 	 
		},
		
		FlashInfo: function(arr, model){
			
			if (typeof arr === 'number') return { IFD : 'FlashInfo', _val:arr };
			if ( !(arr instanceof Array) ) return {};
			 
			/* TODO - FIXME - what do the decimal values mean ? */
			var flashData = { 
				1: { //100/101 - D2H, D2Hs, D2X, D2Xs, D50, D70, D70s, D80 and D200
					0: { desc: 'FlashInfoVersion', fn: function(){ return MainRef.versions(arr, 4); } },
					4: { desc: 'FlashSource', values: {0:'None',  1:'External',  2:'Internal'} },
					6: { desc: 'ExternalFlashFirmware', fn: function(){ 
						var key = arr.slice(6,8).join(' ');
						var ft = exports.info.ref.FlashFirmware
						return ( key in ft ) ? { value:ft[key], _val:key } : { value:'n/a', _val:key }
					} },
					8: { desc: 'ExternalFlashFlags', fn: function(int){
						var FlBitmask = {0:'Fired', 2:'Bounce Flash', 4:'Wide Flash Adapter', 5:'Dome Diffuser'};
						return { value:MainRef.bitmask(int, FlBitmask, 8, true /* TODO - CHECKME why reverse ? */ ), _val:int };
					} },
					10: { desc: 'FlashOutput_FlashCompensation' },
					11: { desc: 'FlashFocalLength' },
					12: { desc: 'RepeatingFlashRate' },
					13: { desc: 'RepeatingFlashCount' },
					14: { desc: 'FlashGNDistance', values: (function(){ return exports.info.ref.FlashGNDistance })() },
					15: { desc: 'FlashGroupAControlMode', values: (function(){ return exports.info.ref.FlashControlMode })() },
					16: { desc: 'FlashGroupBControlMode', values: (function(){ return exports.info.ref.FlashControlMode })() },
					17: { desc: 'FlashGroupAOutput_Compensation' },
					18: { desc: 'FlashGroupBOutput_Compensation' },
				//	9.1: { desc: 'FlashCommanderMode', values: {/*[Mask 0x80]*/  0x0:'Off',  0x80:'On'} },
				//	9.2: { ref: /*[Mask 0x7f]*/ 'FlashControlMode' } 
				},
				2: { //102 - D40, D40x, D3 and D300
					0: { desc: 'FlashInfoVersion', fn: function(){ return MainRef.versions(arr, 4); } },
					4: { desc: 'FlashSource', values: {0:'None',  1:'External',  2:'Internal'} },
					6: { desc: 'ExternalFlashFirmware', fn: function(){ 
						var key = arr.slice(6,8).join(' ');
						var ft = exports.info.ref.FlashFirmware
						return ( key in ft ) ? { value:ft[key], _val:key } : { value:'n/a', _val:key }
					} },
					8: { desc: 'ExternalFlashFlags', values: {0:'Fired', 2:'Bounce Flash', 4:'Wide Flash Adapter', 5:'Dome Diffuser'} },
					10: { desc: 'FlashOutput_FlashCompensation' },
					12: { desc: 'FlashFocalLength' },
					13: { desc: 'RepeatingFlashRate' },
					14: { desc: 'RepeatingFlashCount' },
					15: { desc: 'FlashGNDistance', values: (function(){ return exports.info.ref.FlashGNDistance })() },
					18: { desc: 'FlashGroupAOutput_Compensation' },
					19: { desc: 'FlashGroupBOutput_Compensation' },
					20: { desc: 'FlashGroupCOutput_Compensation' },
				//	9.1: { desc: 'FlashCommanderMode', values: {/*[Mask 0x80]*/  0x0:'Off',  0x80:'On'} },
				//	9.2: { ref: 'FlashControlMode' },
				//	16.1: { ref: 'FlashControlMode' },
				//	17.1: { ref: 'FlashControlMode' },
				//	17.2: { ref: 'FlashControlMode' } 
				},
				3: { //103 - D3 (firmware 2.x), D3X, D3S, D4, D90, D300 (firmware 1.10), D300S, D600, D700, D800, D3000, D3100, D3200, D5000, D5100, D5200, D7000
					0: { desc: 'FlashInfoVersion', fn: function(){ return MainRef.versions(arr, 4); } },
					4: { desc: 'FlashSource', values: {0:'None',  1:'External',  2:'Internal'} },
					6: { desc: 'ExternalFlashFirmware', fn: function(){ 
						var key = arr.slice(6,8).join(' ');
						var ft = exports.info.ref.FlashFirmware
						return ( key in ft ) ? { value:ft[key], _val:key } : { value:'n/a', _val:key }
					} },
					8: { desc: 'ExternalFlashFlags', values: ['Fired', null, 'Bounce Flash', null, 'Wide Flash Adapter', 'Dome Diffuser'] },
					10: { desc: 'FlashOutput_FlashCompensation' },
					12: { desc: 'FlashFocalLength' },
					13: { desc: 'RepeatingFlashRate' },
					14: { desc: 'RepeatingFlashCount' },
					15: { desc: 'FlashGNDistance', values: (function(){ return exports.info.ref.FlashGNDistance })() },
					16:	{ desc: 'FlashColorFilter', values: {0: 'None', 1: 'FL-GL1', 2: 'FL-GL2', 9: 'TN-A1', 10: 'TN-A2', 65: 'Red', 66: 'Blue', 67: 'Yellow', 68: 'Amber'} },	  
					19: { desc: 'FlashGroupAOutput_Compensation' },
					20: { desc: 'FlashGroupBOutput_Compensation' },
					21: { desc: 'FlashGroupCOutput_Compensation' },
					27: { desc: 'ExternalFlashCompensation' },
					29: { desc: 'FlashExposureComp3' },
					39: { desc: 'FlashExposureComp4' },
				//	9.1: { desc: 'FlashCommanderMode', values: {/*[Mask 0x80]*/  0x0:'Off',  0x80:'On'} },
				//	9.2: { ref: 'FlashControlMode' },
				//	17.1: { ref: 'FlashControlMode' },
				//	18.1: { ref: 'FlashControlMode' },
				//	18.2: { ref: 'FlashControlMode' }
				},
				Unknown: { 0: { desc: 'FlashInfoVersion' } }	
			};

			var version = parseFloat(MainRef.versions(arr, 4).value)*100;
			var table = 'Unknown';
			if(typeof version === 'number'){
				if ( version < 102 ){
					// 100 (eldest) or 101
					table = 1; 
				} else {
					// 102 or 103
					table = version-100; 
				}
			}
						
			return MainRef.multiple(arr,flashData[table]);
		},
		
		AFInfo2: { 
			0: 'AFInfo2Version',
			4: { value: 'ContrastDetectAF', _val: {/*(this is Off for the hybrid AF used in Nikon 1 models)*/  0:'Off',  1:'On'} },
			5: 'AFAreaMode', /* TODO - if ContrastDetectAF on or off */
			6: { value: 'PhaseDetectAF', _val: {0:'Off',  1:'On (51-point)',  2:'On (11-point)',  3:'On (39-point)',  4:'On (hybrid)'} },
			7: 'PrimaryAFPoint', /* TODO !!! - same models have different value meanings */
			8: { value: 'AFPointsUsed', _val: ['Center', 'Top', 'Bottom', 'Mid-left', 'Upper-left', 'Lower-left', 'Far Left', 'Mid-right', 'Upper-right', 'Lower-right', 'Far Right'/* TODO ? 	0x7ff = All 11 Points (default) */] },
		
			16: 'AFImageWidth',
			18: 'AFImageHeight',
			20: 'AFAreaXPosition',
			22: 'AFAreaYPosition',
			24: 'AFAreaWidth',
			26: 'AFAreaHeight',
			28: { value: 'ContrastDetectAFInFocus', _val: {0:'No',  1:'Yes'} },
		},
		FileInfo: { 
			0: 'FileInfoVersion',
			6: 'DirectoryNumber',
			8: 'FileNumber' 
		},
		CaptureOffsets: { 
			0x0001: '_IFDpointer_IFD0',
			0x0002: '_IFDpointer_Preview',
			0x0003: '_IFDpointer_Sub' 
		},
		Scan: { 
			0x0002: 'FilmType',
			0x0040: 'MultiSample',
			0x0041: 'BitDepth',
			0x0050: 'MasterGain',
			0x0051: 'ColorGain',
			0x0060: { value: 'ScanImageEnhancer', _val: {0:'Off',  1:'On'} },
			0x0100: 'DigitalICE',
			0x0110: { ref: 'ROC' },
			0x0120: { ref: 'GEM' },
			0x0200: 'DigitalDEEShadowAdj',
			0x0201: 'DigitalDEEThreshold',
			0x0202: 'DigitalDEEHighlightAdj' },
		ROC: { 0: 'DigitalROC' },
		GEM: { 0: 'DigitalGEM' },
		CaptureOutput: { 
			2: 'OutputImageWidth',
			3: 'OutputImageHeight',
			4: 'OutputResolution' },
		Type2: { 
			0x0003: 'Quality',
			0x0004: 'ColorMode',
			0x0005: 'ImageAdjustment',
			0x0006: 'CCDSensitivity',
			0x0007: 'WhiteBalance',
			0x0008: 'Focus',
			0x000a: 'DigitalZoom',
			0x000b: 'Converter' 
		},
		/* TODO ! Make+Model from NCTG ref in root? 
		'NCDT': { '\'NCDB\'': { ref: ' Nikon NCDB' },
			'\'NCHD\'': 'MakerNoteVersion',
			'\'NCTG\'': { ref: ' Nikon NCTG' },
			'\'NCTH\'': 'ThumbnailImage',
			'\'NCVW\'': 'PreviewImage' },
		'NCDB': {},
		*/
		NCTG: 
		
		  { 0x0001: 'Make',
			0x0002: 'Model',
			0x0003: 'Software',
			0x0011: 'CreateDate',
			0x0012: 'DateTimeOriginal',
			0x0013: 'FrameCount',
			0x0016: 'FrameRate',
			0x0022: 'FrameWidth',
			0x0023: 'FrameHeight',
			0x0032: 'AudioChannels',
			0x0033: 'AudioBitsPerSample',
			0x0034: 'AudioSampleRate',
			0x1108822: { value: 'ExposureProgram', _val:{	0: 'Not Defined', 1: 'Manual', 2: 'Program AE', 3: 'Aperture-priority AE', 4: 'Shutter speed priority AE', 5: 'Creative (Slow speed)', 6: 'Action (High speed)', 7: 'Portrait', 8: 'Landscape'} },
			0x1109204: 'ExposureCompensation',
			0x1109207: { value: 'MeteringMode', _val:{	0: 'Unknown', 1: 'Average', 2: 'Center-weighted average', 3: 'Spot', 4: 'Multi-spot', 5: 'Multi-segment', 6: 'Partial', 255: 'Other' } },
			0x110a434: 'LensModel',
			0x1200000: 'GPSVersionID',
			0x1200001: { value: 'GPSLatitudeRef', _val: {'N':'North', 'S':'South'} },
			0x1200002: 'GPSLatitude',
			0x1200003: { value: 'GPSLongitudeRef', _val: {'E':'East',  'W':'West'} },
			0x1200004: 'GPSLongitude',
			0x1200005: { value: 'GPSAltitudeRef', _val: {0:'Above Sea Level',  1:'Below Sea Level'} },
			0x1200006: 'GPSAltitude',
			0x1200007: 'GPSTimeStamp',
			0x1200008: 'GPSSatellites',
			0x1200010: { value: 'GPSImgDirectionRef', _val: {'M':'Magnetic North',  'T':'True North'} },
			0x1200011: 'GPSImgDirection',
			0x1200012: 'GPSMapDatum',
			0x120001d: 'GPSDateStamp',
			0x2000001: 'MakerNoteVersion',
			0x2000005: 'WhiteBalance',
			0x200000b: 'WhiteBalanceFineTune',
			0x200001e: { ref: 'ColorSpace' },
			0x2000023: { ref: ' Nikon PictureControl' },
			0x2000024: { ref: ' Nikon WorldTime' },
			0x200002c: { ref: ' Nikon UnknownInfo' },
			0x2000032: { ref: ' Nikon UnknownInfo' },
			0x2000039: { ref: ' Nikon LocationInfo' },
			0x2000083: { value: 'LensType', _val: ['MF', 'D', 'G', 'VR'] },
			0x2000084: 'Lens',
			0x20000ab: 'VariProgram' 
		},
		MOV: { 
			0: 'Make',
			24: 'Model',
			38: 'ExposureTime',
			42: 'FNumber',
			50: 'ExposureCompensation',
			68: { value: 'WhiteBalance', _val: { 0: 'Auto', 1: 'Daylight', 2: 'Shade', 3: 'Fluorescent', 4: 'Tungsten', 5: 'Manual' } },
			72: 'FocalLength',
			175: 'Software',
			223: 'ISO',
		},
		/* TODO
		,
		'AVI': { '\'nctg\'': { ref: ' Nikon AVITags' },
			'\'ncth\'': 'ThumbnailImage',
			'\'ncvr\'': { ref: ' Nikon AVIVers' },
			'\'ncvw\'': 'PreviewImage' 
		},
		'AVITags':  { 
			0x0003: 'Make',
			0x0004: 'Model',
			0x0005: 'Software',
			0x0006: 'Equipment',
			0x0008: 'ExposureTime',
			0x0009: 'FNumber',
			0x000a: 'ExposureCompensation',
			0x000b: 'MaxApertureValue',
			0x000f: 'FocalLength',
			0x0010: 'XResolution',
			0x0011: 'YResolution',
			0x0012: { value: 'ResolutionUnit', _val: {1:'None',  2:'inches',  3:'cm'} },
			0x0013: 'DateTimeOriginal',
			0x0014: 'CreateDate',
			0x0016: 'Duration',
			0x0018: 'FocusMode',
			0x001b: 'DigitalZoom',
			0x001d: 'ColorMode',
			0x001e: 'Sharpness',
			0x001f: 'WhiteBalance',
			0x0020: 'NoiseReduction' 
		}
		*/
		LensID:
		/* TODO
		// The Nikon LensID is constructed as a Composite tag from the raw hex values of 8 other tags: 
		// LensIDNumber, LensFStops, MinFocalLength, MaxFocalLength, MaxApertureAtMinFocal, MaxApertureAtMaxFocal, MCUVersion and LensType, in that order. 
		// (source: http://www.rottmerhusen.com/objektives/lensid/thirdparty.html.) 
		
		// 'AA 3C 37 6E 30 30 AC 0E'
		*/
		{ 
			'00 00 00 00 00 00 00 01': 'Manual Lens No CPU', 
			'00 00 00 00 00 00 E1 12': 'TC-17E II', 
			'00 00 00 00 00 00 F1 0C': 'TC-14E [II] or Sigma APO Tele Converter 1.4x EX DG or Kenko Teleplus PRO 300 DG 1.4x', 
			'00 00 00 00 00 00 F2 18': 'TC-20E [II] or Sigma APO Tele Converter 2x EX DG or Kenko Teleplus PRO 300 DG 2.0x', 
			'00 00 48 48 53 53 00 01': 'Loreo 40mm F11-22 3D Lens in a Cap 9005', 
			'00 36 1C 2D 34 3C 00 06': 'Tamron SP AF 11-18mm f/4.5-5.6 Di II LD Aspherical (IF) (A13)', 
			'00 3C 1F 37 30 30 00 06': 'Tokina AT-X 124 AF PRO DX (AF 12-24mm f/4)', 
			'00 3E 80 A0 38 3F 00 02': 'Tamron SP AF 200-500mm f/5-6.3 Di LD (IF) (A08)', 
			'00 3F 2D 80 2B 40 00 06': 'Tamron AF 18-200mm f/3.5-6.3 XR Di II LD Aspherical (IF) (A14)', 
			'00 3F 2D 80 2C 40 00 06': 'Tamron AF 18-200mm f/3.5-6.3 XR Di II LD Aspherical (IF) Macro (A14)', 
			'00 3F 80 A0 38 3F 00 02': 'Tamron SP AF 200-500mm f/5-6.3 Di (A08)', 
			'00 40 11 11 2C 2C 00 00': 'Samyang 8mm f/3.5 Fish-Eye', 
			'00 40 18 2B 2C 34 00 06': 'Tokina AT-X 107 AF DX Fisheye (AF 10-17mm f/3.5-4.5)', 
			'00 40 2A 72 2C 3C 00 06': 'Tokina AT-X 16.5-135 DX (AF 16.5-135mm F3.5-5.6)', 
			'00 40 2B 2B 2C 2C 00 02': 'Tokina AT-X 17 AF PRO (AF 17mm f/3.5)', 
			'00 40 2D 2D 2C 2C 00 00': 'Carl Zeiss Distagon T* 3.5/18 ZF.2', 
			'00 40 2D 80 2C 40 00 06': 'Tamron AF 18-200mm f/3.5-6.3 XR Di II LD Aspherical (IF) Macro (A14NII)', 
			'00 40 2D 88 2C 40 00 06': 'Tamron AF 18-250mm f/3.5-6.3 Di II LD Aspherical (IF) Macro (A18NII)', 
			'00 40 2D 88 2C 40 62 06': 'Tamron AF 18-250mm f/3.5-6.3 Di II LD Aspherical (IF) Macro (A18)', 
			'00 40 31 31 2C 2C 00 00': 'Voigtlander Color Skopar 20mm F3.5 SLII Aspherical', 
			'00 40 37 80 2C 3C 00 02': 'Tokina AT-X 242 AF (AF 24-200mm f/3.5-5.6)', 
			'00 40 64 64 2C 2C 00 00': 'Voigtlander APO-Lanthar 90mm F3.5 SLII Close Focus', 
			'00 44 60 98 34 3C 00 02': 'Tokina AT-X 840 D (AF 80-400mm f/4.5-5.6)', 
			'00 47 10 10 24 24 00 00': 'Fisheye Nikkor 8mm f/2.8 AiS', 
			'00 47 25 25 24 24 00 02': 'Tamron SP AF 14mm f/2.8 Aspherical (IF) (69E)', 
			'00 47 44 44 24 24 00 06': 'Tokina AT-X M35 PRO DX (AF 35mm f/2.8 Macro)', 
			'00 47 53 80 30 3C 00 06': 'Tamron AF 55-200mm f/4-5.6 Di II LD (A15)', 
			'00 48 1C 29 24 24 00 06': 'Tokina AT-X 116 PRO DX (AF 11-16mm f/2.8)', 
			'00 48 29 3C 24 24 00 06': 'Tokina AT-X 16-28 AF PRO FX (AF 16-28mm f/2.8)', 
			'00 48 29 50 24 24 00 06': 'Tokina AT-X 165 PRO DX (AF 16-50mm f/2.8)', 
			'00 48 32 32 24 24 00 00': 'Carl Zeiss Distagon T* 2.8/21 ZF.2', 
			'00 48 3C 60 24 24 00 02': 'Tokina AT-X 280 AF PRO (AF 28-80mm f/2.8)', 
			'00 48 3C 6A 24 24 00 02': 'Tamron SP AF 28-105mm f/2.8 LD Aspherical IF (176D)', 
			'00 48 50 50 18 18 00 00': 'Nikkor H 50mm f/2', 
			'00 48 50 72 24 24 00 06': 'Tokina AT-X 535 PRO DX (AF 50-135mm f/2.8)', 
			'00 48 5C 8E 30 3C 00 06': 'Tamron AF 70-300mm f/4-5.6 Di LD Macro 1:2 (A17NII)', 
			'00 48 68 68 24 24 00 00': 'Series E 100mm f/2.8', 
			'00 48 80 80 30 30 00 00': 'Nikkor 200mm f/4 AiS', 
			'00 49 30 48 22 2B 00 02': 'Tamron SP AF 20-40mm f/2.7-3.5 (166D)', 
			'00 4C 6A 6A 20 20 00 00': 'Nikkor 105mm f/2.5 AiS', 
			'00 4C 7C 7C 2C 2C 00 02': 'Tamron SP AF 180mm f/3.5 Di Model (B01)', 
			'00 53 2B 50 24 24 00 06': 'Tamron SP AF 17-50mm f/2.8 XR Di II LD Aspherical (IF) (A16)', 
			'00 54 2B 50 24 24 00 06': 'Tamron SP AF 17-50mm f/2.8 XR Di II LD Aspherical (IF) (A16NII)', 
			'00 54 3C 3C 18 18 00 00': 'Carl Zeiss Distagon T* 2/28 ZF.2', 
			'00 54 44 44 0C 0C 00 00': 'Nikkor 35mm f/1.4 AiS', 
			'00 54 44 44 18 18 00 00': 'Carl Zeiss Distagon T* 2/35 ZF.2', 
			'00 54 48 48 18 18 00 00': 'Voigtlander Ultron 40mm F2 SLII Aspherical', 
			'00 54 50 50 0C 0C 00 00': 'Carl Zeiss Planar T* 1.4/50 ZF.2', 
			'00 54 50 50 18 18 00 00': 'Carl Zeiss Makro-Planar T* 2/50 ZF.2', 
			'00 54 55 55 0C 0C 00 00': 'Voigtlander Nokton 58mm F1.4 SLII', 
			'00 54 56 56 30 30 00 00': 'Coastal Optical Systems 60mm 1:4 UV-VIS-IR Macro Apo', 
			'00 54 62 62 0C 0C 00 00': 'Carl Zeiss Planar T* 1.4/85 ZF.2', 
			'00 54 68 68 18 18 00 00': 'Carl Zeiss Makro-Planar T* 2/100 ZF.2', 
			'00 54 68 68 24 24 00 02': 'Tokina AT-X M100 AF PRO D (AF 100mm f/2.8 Macro)', 
			'00 54 8E 8E 24 24 00 02': 'Tokina AT-X 300 AF PRO (AF 300mm f/2.8)', 
			'00 58 64 64 20 20 00 00': 'Soligor C/D Macro MC 90mm f/2.5', 
			'01 00 00 00 00 00 02 00': 'TC-16A', 
			'01 00 00 00 00 00 08 00': 'TC-16A', 
			'01 58 50 50 14 14 02 00': 'AF Nikkor 50mm f/1.8', 
			'02 2F 98 98 3D 3D 02 00': 'Sigma APO 400mm F5.6', 
			'02 34 A0 A0 44 44 02 00': 'Sigma APO 500mm F7.2', 
			'02 37 5E 8E 35 3D 02 00': 'Sigma 75-300mm F4.5-5.6 APO', 
			'02 37 A0 A0 34 34 02 00': 'Sigma APO 500mm F4.5', 
			'02 3A 5E 8E 32 3D 02 00': 'Sigma 75-300mm F4.0-5.6', 
			'02 3B 44 61 30 3D 02 00': 'Sigma 35-80mm F4-5.6', 
			'02 3C B0 B0 3C 3C 02 00': 'Sigma APO 800mm F5.6', 
			'02 3F 24 24 2C 2C 02 00': 'Sigma 14mm F3.5', 
			'02 3F 3C 5C 2D 35 02 00': 'Sigma 28-70mm F3.5-4.5 UC', 
			'02 40 44 5C 2C 34 02 00': 'Exakta AF 35-70mm 1:3.5-4.5 MC', 
			'02 40 44 73 2B 36 02 00': 'Sigma 35-135mm F3.5-4.5 a', 
			'02 40 5C 82 2C 35 02 00': 'Sigma APO 70-210mm F3.5-4.5', 
			'02 42 44 5C 2A 34 02 00': 'AF Zoom-Nikkor 35-70mm f/3.3-4.5', 
			'02 42 44 5C 2A 34 08 00': 'AF Zoom-Nikkor 35-70mm f/3.3-4.5', 
			'02 46 37 37 25 25 02 00': 'Sigma 24mm F2.8 Super Wide II Macro', 
			'02 46 3C 5C 25 25 02 00': 'Sigma 28-70mm F2.8', 
			'02 46 5C 82 25 25 02 00': 'Sigma 70-210mm F2.8 APO', 
			'02 48 50 50 24 24 02 00': 'Sigma Macro 50mm F2.8', 
			'02 48 65 65 24 24 02 00': 'Sigma Macro 90mm F2.8', 
			'03 43 5C 81 35 35 02 00': 'Soligor AF C/D Zoom UMCS 70-210mm 1:4.5', 
			'03 48 5C 81 30 30 02 00': 'AF Zoom-Nikkor 70-210mm f/4', 
			'04 48 3C 3C 24 24 03 00': 'AF Nikkor 28mm f/2.8', 
			'05 54 50 50 0C 0C 04 00': 'AF Nikkor 50mm f/1.4', 
			'06 3F 68 68 2C 2C 06 00': 'Cosina AF 100mm F3.5 Macro', 
			'06 54 53 53 24 24 06 00': 'AF Micro-Nikkor 55mm f/2.8', 
			'07 36 3D 5F 2C 3C 03 00': 'Cosina AF Zoom 28-80mm F3.5-5.6 MC Macro', 
			'07 3E 30 43 2D 35 03 00': 'Soligor AF Zoom 19-35mm 1:3.5-4.5 MC', 
			'07 40 2F 44 2C 34 03 02': 'Tamron AF 19-35mm f/3.5-4.5 (A10)', 
			'07 40 30 45 2D 35 03 02': 'Tamron AF 19-35mm f/3.5-4.5 (A10)', 
			'07 40 3C 5C 2C 35 03 00': 'Tokina AF 270 II (AF 28-70mm f/3.5-4.5)', 
			'07 40 3C 62 2C 34 03 00': 'AF Zoom-Nikkor 28-85mm f/3.5-4.5', 
			'07 46 2B 44 24 30 03 02': 'Tamron SP AF 17-35mm f/2.8-4 Di LD Aspherical (IF) (A05)', 
			'07 46 3D 6A 25 2F 03 00': 'Cosina AF Zoom 28-105mm F2.8-3.8 MC', 
			'07 47 3C 5C 25 35 03 00': 'Tokina AF 287 SD (AF 28-70mm f/2.8-4.5)', 
			'07 48 3C 5C 24 24 03 00': 'Tokina AT-X 287 AF (AF 28-70mm f/2.8)', 
			'08 40 44 6A 2C 34 04 00': 'AF Zoom-Nikkor 35-105mm f/3.5-4.5', 
			'09 48 37 37 24 24 04 00': 'AF Nikkor 24mm f/2.8', 
			'0A 48 8E 8E 24 24 03 00': 'AF Nikkor 300mm f/2.8 IF-ED', 
			'0A 48 8E 8E 24 24 05 00': 'AF Nikkor 300mm f/2.8 IF-ED N', 
			'0B 3E 3D 7F 2F 3D 0E 00': 'Tamron AF 28-200mm f/3.8-5.6 (71D)', 
			'0B 3E 3D 7F 2F 3D 0E 02': 'Tamron AF 28-200mm f/3.8-5.6D (171D)', 
			'0B 48 7C 7C 24 24 05 00': 'AF Nikkor 180mm f/2.8 IF-ED', 
			'0D 40 44 72 2C 34 07 00': 'AF Zoom-Nikkor 35-135mm f/3.5-4.5', 
			'0E 48 5C 81 30 30 05 00': 'AF Zoom-Nikkor 70-210mm f/4', 
			'0E 4A 31 48 23 2D 0E 02': 'Tamron SP AF 20-40mm f/2.7-3.5 (166D)', 
			'0F 58 50 50 14 14 05 00': 'AF Nikkor 50mm f/1.8 N', 
			'10 3D 3C 60 2C 3C D2 02': 'Tamron AF 28-80mm f/3.5-5.6 Aspherical (177D)', 
			'10 48 8E 8E 30 30 08 00': 'AF Nikkor 300mm f/4 IF-ED', 
			'11 48 44 5C 24 24 08 00': 'AF Zoom-Nikkor 35-70mm f/2.8', 
			'12 36 5C 81 35 3D 09 00': 'Cosina AF Zoom 70-210mm F4.5-5.6 MC Macro', 
			'12 36 69 97 35 42 09 00': 'Soligor AF Zoom 100-400mm 1:4.5-6.7 MC', 
			'12 39 5C 8E 34 3D 08 02': 'Cosina AF Zoom 70-300mm F4.5-5.6 MC Macro', 
			'12 3B 68 8D 3D 43 09 02': 'Cosina AF Zoom 100-300mm F5.6-6.7 MC Macro', 
			'12 3B 98 98 3D 3D 09 00': 'Tokina AT-X 400 AF SD (AF 400mm f/5.6)', 
			'12 3D 3C 80 2E 3C DF 02': 'Tamron AF 28-200mm f/3.8-5.6 AF Aspherical LD (IF) (271D)', 
			'12 44 5E 8E 34 3C 09 00': 'Tokina AF 730 (AF 75-300mm F4.5-5.6)', 
			'12 48 5C 81 30 3C 09 00': 'AF Nikkor 70-210mm f/4-5.6', 
			'12 4A 5C 81 31 3D 09 00': 'Soligor AF C/D Auto Zoom+Macro 70-210mm 1:4-5.6 UMCS', 
			'13 42 37 50 2A 34 0B 00': 'AF Zoom-Nikkor 24-50mm f/3.3-4.5', 
			'14 48 60 80 24 24 0B 00': 'AF Zoom-Nikkor 80-200mm f/2.8 ED', 
			'14 48 68 8E 30 30 0B 00': 'Tokina AT-X 340 AF (AF 100-300mm f/4)', 
			'14 54 60 80 24 24 0B 00': 'Tokina AT-X 828 AF (AF 80-200mm f/2.8)', 
			'15 4C 62 62 14 14 0C 00': 'AF Nikkor 85mm f/1.8', 
			'17 3C A0 A0 30 30 0F 00': 'Nikkor 500mm f/4 P ED IF', 
			'17 3C A0 A0 30 30 11 00': 'Nikkor 500mm f/4 P ED IF', 
			'18 40 44 72 2C 34 0E 00': 'AF Zoom-Nikkor 35-135mm f/3.5-4.5 N', 
			'1A 54 44 44 18 18 11 00': 'AF Nikkor 35mm f/2', 
			'1B 44 5E 8E 34 3C 10 00': 'AF Zoom-Nikkor 75-300mm f/4.5-5.6', 
			'1C 48 30 30 24 24 12 00': 'AF Nikkor 20mm f/2.8', 
			'1D 42 44 5C 2A 34 12 00': 'AF Zoom-Nikkor 35-70mm f/3.3-4.5 N', 
			'1E 54 56 56 24 24 13 00': 'AF Micro-Nikkor 60mm f/2.8', 
			'1E 5D 64 64 20 20 13 00': 'Tamron SP AF 90mm f/2.5 (52E)', 
			'1F 54 6A 6A 24 24 14 00': 'AF Micro-Nikkor 105mm f/2.8', 
			'20 3C 80 98 3D 3D 1E 02': 'Tamron AF 200-400mm f/5.6 LD IF (75D)', 
			'20 48 60 80 24 24 15 00': 'AF Zoom-Nikkor 80-200mm f/2.8 ED', 
			'20 5A 64 64 20 20 14 00': 'Tamron SP AF 90mm f/2.5 Macro (152E)', 
			'21 40 3C 5C 2C 34 16 00': 'AF Zoom-Nikkor 28-70mm f/3.5-4.5', 
			'21 56 8E 8E 24 24 14 00': 'Tamron SP AF 300mm f/2.8 LD-IF (60E)', 
			'22 48 72 72 18 18 16 00': 'AF DC-Nikkor 135mm f/2', 
			'22 53 64 64 24 24 E0 02': 'Tamron SP AF 90mm f/2.8 Macro 1:1 (72E)', 
			'23 30 BE CA 3C 48 17 00': 'Zoom-Nikkor 1200-1700mm f/5.6-8 P ED IF', 
			'24 44 60 98 34 3C 1A 02': 'Tokina AT-X 840 AF-II (AF 80-400mm f/4.5-5.6)', 
			'24 48 60 80 24 24 1A 02': 'AF Zoom-Nikkor 80-200mm f/2.8D ED', 
			'24 54 60 80 24 24 1A 02': 'Tokina AT-X 828 AF PRO (AF 80-200mm f/2.8)', 
			'25 44 44 8E 34 42 1B 02': 'Tokina AF 353 (AF 35-300mm f/4.5-6.7)', 
			'25 48 3C 5C 24 24 1B 02.1': 'Tokina AT-X 270 AF PRO II (AF 28-70mm f/2.6-2.8)', 
			'25 48 3C 5C 24 24 1B 02.2': 'Tokina AT-X 287 AF PRO SV (AF 28-70mm f/2.8)', 
			'25 48 44 5C 24 24 1B 02': 'AF Zoom-Nikkor 35-70mm f/2.8D', 
			'25 48 44 5C 24 24 52 02': 'AF Zoom-Nikkor 35-70mm f/2.8D', 
			'26 3C 54 80 30 3C 1C 06': 'Sigma 55-200mm F4-5.6 DC', 
			'26 3C 5C 82 30 3C 1C 02': 'Sigma 70-210mm F4-5.6 UC-II', 
			'26 3C 5C 8E 30 3C 1C 02': 'Sigma 70-300mm F4-5.6 DG Macro', 
			'26 3C 98 98 3C 3C 1C 02': 'Sigma APO Tele Macro 400mm F5.6', 
			'26 3D 3C 80 2F 3D 1C 02': 'Sigma 28-300mm F3.8-5.6 Aspherical', 
			'26 3E 3C 6A 2E 3C 1C 02': 'Sigma 28-105mm F3.8-5.6 UC-III Aspherical IF', 
			'26 40 27 3F 2C 34 1C 02': 'Sigma 15-30mm F3.5-4.5 EX DG Aspherical DF', 
			'26 40 2D 44 2B 34 1C 02': 'Sigma 18-35mm F3.5-4.5 Aspherical', 
			'26 40 2D 50 2C 3C 1C 06': 'Sigma 18-50mm F3.5-5.6 DC', 
			'26 40 2D 70 2B 3C 1C 06': 'Sigma 18-125mm F3.5-5.6 DC', 
			'26 40 2D 80 2C 40 1C 06': 'Sigma 18-200mm F3.5-6.3 DC', 
			'26 40 37 5C 2C 3C 1C 02': 'Sigma 24-70mm F3.5-5.6 Aspherical HF', 
			'26 40 3C 5C 2C 34 1C 02': 'AF Zoom-Nikkor 28-70mm f/3.5-4.5D', 
			'26 40 3C 60 2C 3C 1C 02': 'Sigma 28-80mm F3.5-5.6 Mini Zoom Macro II Aspherical', 
			'26 40 3C 65 2C 3C 1C 02': 'Sigma 28-90mm F3.5-5.6 Macro', 
			'26 40 3C 80 2B 3C 1C 02': 'Sigma 28-200mm F3.5-5.6 Compact Aspherical Hyperzoom Macro', 
			'26 40 3C 80 2C 3C 1C 02': 'Sigma 28-200mm F3.5-5.6 Compact Aspherical Hyperzoom Macro', 
			'26 40 3C 8E 2C 40 1C 02': 'Sigma 28-300mm F3.5-6.3 Macro', 
			'26 40 7B A0 34 40 1C 02': 'Sigma APO 170-500mm F5-6.3 Aspherical RF', 
			'26 41 3C 8E 2C 40 1C 02': 'Sigma 28-300mm F3.5-6.3 DG Macro', 
			'26 44 73 98 34 3C 1C 02': 'Sigma 135-400mm F4.5-5.6 APO Aspherical', 
			'26 48 11 11 30 30 1C 02': 'Sigma 8mm F4 EX Circular Fisheye', 
			'26 48 27 27 24 24 1C 02': 'Sigma 15mm F2.8 EX Diagonal Fisheye', 
			'26 48 2D 50 24 24 1C 06': 'Sigma 18-50mm F2.8 EX DC', 
			'26 48 31 49 24 24 1C 02': 'Sigma 20-40mm F2.8', 
			'26 48 37 56 24 24 1C 02': 'Sigma 24-60mm F2.8 EX DG', 
			'26 48 3C 5C 24 24 1C 06': 'Sigma 28-70mm F2.8 EX DG', 
			'26 48 3C 5C 24 30 1C 02': 'Sigma 28-70mm F2.8-4 DG', 
			'26 48 3C 6A 24 30 1C 02': 'Sigma 28-105mm F2.8-4 Aspherical', 
			'26 48 8E 8E 30 30 1C 02': 'Sigma APO Tele Macro 300mm F4', 
			'26 54 2B 44 24 30 1C 02': 'Sigma 17-35mm F2.8-4 EX Aspherical', 
			'26 54 37 5C 24 24 1C 02': 'Sigma 24-70mm F2.8 EX DG Macro', 
			'26 54 37 73 24 34 1C 02': 'Sigma 24-135mm F2.8-4.5', 
			'26 54 3C 5C 24 24 1C 02': 'Sigma 28-70mm F2.8 EX', 
			'26 58 31 31 14 14 1C 02': 'Sigma 20mm F1.8 EX DG Aspherical RF', 
			'26 58 37 37 14 14 1C 02': 'Sigma 24mm F1.8 EX DG Aspherical Macro', 
			'26 58 3C 3C 14 14 1C 02': 'Sigma 28mm F1.8 EX DG Aspherical Macro', 
			'27 48 8E 8E 24 24 1D 02': 'AF-I Nikkor 300mm f/2.8D IF-ED', 
			'27 48 8E 8E 24 24 E1 02': 'AF-I Nikkor 300mm f/2.8D IF-ED + TC-17E', 
			'27 48 8E 8E 24 24 F1 02': 'AF-I Nikkor 300mm f/2.8D IF-ED + TC-14E', 
			'27 48 8E 8E 24 24 F2 02': 'AF-I Nikkor 300mm f/2.8D IF-ED + TC-20E', 
			'27 48 8E 8E 30 30 1D 02': 'Tokina AT-X 304 AF (AF 300mm f/4.0)', 
			'27 54 8E 8E 24 24 1D 02': 'Tamron SP AF 300mm f/2.8 LD-IF (360E)', 
			'28 3C A6 A6 30 30 1D 02': 'AF-I Nikkor 600mm f/4D IF-ED', 
			'28 3C A6 A6 30 30 E1 02': 'AF-I Nikkor 600mm f/4D IF-ED + TC-17E', 
			'28 3C A6 A6 30 30 F1 02': 'AF-I Nikkor 600mm f/4D IF-ED + TC-14E', 
			'28 3C A6 A6 30 30 F2 02': 'AF-I Nikkor 600mm f/4D IF-ED + TC-20E', 
			'2A 54 3C 3C 0C 0C 26 02': 'AF Nikkor 28mm f/1.4D', 
			'2B 3C 44 60 30 3C 1F 02': 'AF Zoom-Nikkor 35-80mm f/4-5.6D', 
			'2C 48 6A 6A 18 18 27 02': 'AF DC-Nikkor 105mm f/2D', 
			'2D 48 80 80 30 30 21 02': 'AF Micro-Nikkor 200mm f/4D IF-ED', 
			'2E 48 5C 82 30 3C 22 02': 'AF Nikkor 70-210mm f/4-5.6D', 
			'2E 48 5C 82 30 3C 28 02': 'AF Nikkor 70-210mm f/4-5.6D', 
			'2F 40 30 44 2C 34 29 02.1': 'Tokina AF 235 II (AF 20-35mm f/3.5-4.5)', 
			'2F 40 30 44 2C 34 29 02.2': 'Tokina AF 193 (AF 19-35mm f/3.5-4.5)', 
			'2F 48 30 44 24 24 29 02.1': 'AF Zoom-Nikkor 20-35mm f/2.8D IF', 
			'2F 48 30 44 24 24 29 02.2': 'Tokina AT-X 235 AF PRO (AF 20-35mm f/2.8)', 
			'30 48 98 98 24 24 24 02': 'AF-I Nikkor 400mm f/2.8D IF-ED', 
			'30 48 98 98 24 24 E1 02': 'AF-I Nikkor 400mm f/2.8D IF-ED + TC-17E', 
			'30 48 98 98 24 24 F1 02': 'AF-I Nikkor 400mm f/2.8D IF-ED + TC-14E', 
			'30 48 98 98 24 24 F2 02': 'AF-I Nikkor 400mm f/2.8D IF-ED + TC-20E', 
			'31 54 56 56 24 24 25 02': 'AF Micro-Nikkor 60mm f/2.8D', 
			'32 53 64 64 24 24 35 02': 'Tamron SP AF 90mm f/2.8 [Di] Macro 1:1 (172E/272E)', 
			'32 54 50 50 24 24 35 02': 'Sigma Macro 50mm F2.8 EX DG', 
			'32 54 6A 6A 24 24 35 02.1': 'AF Micro-Nikkor 105mm f/2.8D', 
			'32 54 6A 6A 24 24 35 02.2': 'Sigma Macro 105mm F2.8 EX DG', 
			'33 48 2D 2D 24 24 31 02': 'AF Nikkor 18mm f/2.8D', 
			'33 54 3C 5E 24 24 62 02': 'Tamron SP AF 28-75mm f/2.8 XR Di LD Aspherical (IF) Macro (A09)', 
			'34 48 29 29 24 24 32 02': 'AF Fisheye Nikkor 16mm f/2.8D', 
			'35 3C A0 A0 30 30 33 02': 'AF-I Nikkor 500mm f/4D IF-ED', 
			'35 3C A0 A0 30 30 E1 02': 'AF-I Nikkor 500mm f/4D IF-ED + TC-17E', 
			'35 3C A0 A0 30 30 F1 02': 'AF-I Nikkor 500mm f/4D IF-ED + TC-14E', 
			'35 3C A0 A0 30 30 F2 02': 'AF-I Nikkor 500mm f/4D IF-ED + TC-20E', 
			'36 48 37 37 24 24 34 02': 'AF Nikkor 24mm f/2.8D', 
			'37 48 30 30 24 24 36 02': 'AF Nikkor 20mm f/2.8D', 
			'38 4C 62 62 14 14 37 02': 'AF Nikkor 85mm f/1.8D', 
			'3A 40 3C 5C 2C 34 39 02': 'AF Zoom-Nikkor 28-70mm f/3.5-4.5D', 
			'3B 48 44 5C 24 24 3A 02': 'AF Zoom-Nikkor 35-70mm f/2.8D N', 
			'3C 48 60 80 24 24 3B 02': 'AF Zoom-Nikkor 80-200mm f/2.8D ED', 
			'3D 3C 44 60 30 3C 3E 02': 'AF Zoom-Nikkor 35-80mm f/4-5.6D', 
			'3E 48 3C 3C 24 24 3D 02': 'AF Nikkor 28mm f/2.8D', 
			'3F 40 44 6A 2C 34 45 02': 'AF Zoom-Nikkor 35-105mm f/3.5-4.5D', 
			'41 48 7C 7C 24 24 43 02': 'AF Nikkor 180mm f/2.8D IF-ED', 
			'42 54 44 44 18 18 44 02': 'AF Nikkor 35mm f/2D', 
			'43 54 50 50 0C 0C 46 02': 'AF Nikkor 50mm f/1.4D', 
			'44 44 60 80 34 3C 47 02': 'AF Zoom-Nikkor 80-200mm f/4.5-5.6D', 
			'45 3D 3C 60 2C 3C 48 02': 'Tamron AF 28-80mm f/3.5-5.6 Aspherical (177D)', 
			'45 40 3C 60 2C 3C 48 02': 'AF Zoom-Nikkor 28-80mm f/3.5-5.6D', 
			'45 41 37 72 2C 3C 48 02': 'Tamron SP AF 24-135mm f/3.5-5.6 AD Aspherical (IF) Macro (190D)', 
			'46 3C 44 60 30 3C 49 02': 'AF Zoom-Nikkor 35-80mm f/4-5.6D N', 
			'47 42 37 50 2A 34 4A 02': 'AF Zoom-Nikkor 24-50mm f/3.3-4.5D', 
			'48 38 1F 37 34 3C 4B 06': 'Sigma 12-24mm F4.5-5.6 EX DG Aspherical HSM', 
			'48 3C 19 31 30 3C 4B 06': 'Sigma 10-20mm F4-5.6 EX DC HSM', 
			'48 3C 50 A0 30 40 4B 02': 'Sigma 50-500mm F4-6.3 EX APO RF HSM', 
			'48 3C 8E B0 3C 3C 4B 02': 'Sigma APO 300-800mm F5.6 EX DG HSM', 
			'48 3C B0 B0 3C 3C 4B 02': 'Sigma APO 800mm F5.6 EX HSM', 
			'48 44 A0 A0 34 34 4B 02': 'Sigma APO 500mm F4.5 EX HSM', 
			'48 48 24 24 24 24 4B 02': 'Sigma 14mm F2.8 EX Aspherical HSM', 
			'48 48 2B 44 24 30 4B 06': 'Sigma 17-35mm F2.8-4 EX DG Aspherical HSM', 
			'48 48 68 8E 30 30 4B 02': 'Sigma 100-300mm F4 EX IF HSM', 
			'48 48 76 76 24 24 4B 06': 'Sigma APO Macro 150mm F2.8 EX DG HSM', 
			'48 48 8E 8E 24 24 4B 02': 'AF-S Nikkor 300mm f/2.8D IF-ED', 
			'48 48 8E 8E 24 24 E1 02': 'AF-S Nikkor 300mm f/2.8D IF-ED + TC-17E', 
			'48 48 8E 8E 24 24 F1 02': 'AF-S Nikkor 300mm f/2.8D IF-ED + TC-14E', 
			'48 48 8E 8E 24 24 F2 02': 'AF-S Nikkor 300mm f/2.8D IF-ED + TC-20E', 
			'48 4C 7C 7C 2C 2C 4B 02': 'Sigma APO Macro 180mm F3.5 EX DG HSM', 
			'48 4C 7D 7D 2C 2C 4B 02': 'Sigma APO Macro 180mm F3.5 EX DG HSM', 
			'48 54 3E 3E 0C 0C 4B 06': 'Sigma 30mm F1.4 EX DC HSM', 
			'48 54 5C 80 24 24 4B 02': 'Sigma 70-200mm F2.8 EX APO IF HSM', 
			'48 54 6F 8E 24 24 4B 02': 'Sigma APO 120-300mm F2.8 EX DG HSM', 
			'48 54 8E 8E 24 24 4B 02': 'Sigma APO 300mm F2.8 EX DG HSM', 
			'49 3C A6 A6 30 30 4C 02': 'AF-S Nikkor 600mm f/4D IF-ED', 
			'49 3C A6 A6 30 30 E1 02': 'AF-S Nikkor 600mm f/4D IF-ED + TC-17E', 
			'49 3C A6 A6 30 30 F1 02': 'AF-S Nikkor 600mm f/4D IF-ED + TC-14E', 
			'49 3C A6 A6 30 30 F2 02': 'AF-S Nikkor 600mm f/4D IF-ED + TC-20E', 
			'4A 40 11 11 2C 0C 4D 02': 'Samyang 8mm f/3.5 Fish-Eye CS', 
			'4A 48 24 24 24 0C 4D 02': 'Samyang AE 14mm f/2.8 ED AS IF UMC', 
			'4A 54 62 62 0C 0C 4D 02': 'AF Nikkor 85mm f/1.4D IF', 
			'4A 60 44 44 0C 0C 4D 02': 'Samyang 35mm f/1.4 AS UMC', 
			'4A 60 62 62 0C 0C 4D 02': 'Samyang AE 85mm f/1.4 AS IF UMC', 
			'4B 3C A0 A0 30 30 4E 02': 'AF-S Nikkor 500mm f/4D IF-ED', 
			'4B 3C A0 A0 30 30 E1 02': 'AF-S Nikkor 500mm f/4D IF-ED + TC-17E', 
			'4B 3C A0 A0 30 30 F1 02': 'AF-S Nikkor 500mm f/4D IF-ED + TC-14E', 
			'4B 3C A0 A0 30 30 F2 02': 'AF-S Nikkor 500mm f/4D IF-ED + TC-20E', 
			'4C 40 37 6E 2C 3C 4F 02': 'AF Zoom-Nikkor 24-120mm f/3.5-5.6D IF', 
			'4D 40 3C 80 2C 3C 62 02': 'AF Zoom-Nikkor 28-200mm f/3.5-5.6D IF', 
			'4D 41 3C 8E 2B 40 62 02': 'Tamron AF 28-300mm f/3.5-6.3 XR Di LD Aspherical (IF) (A061)', 
			'4D 41 3C 8E 2C 40 62 02': 'Tamron AF 28-300mm f/3.5-6.3 XR LD Aspherical (IF) (185D)', 
			'4E 48 72 72 18 18 51 02': 'AF DC-Nikkor 135mm f/2D', 
			'4F 40 37 5C 2C 3C 53 06': 'IX-Nikkor 24-70mm f/3.5-5.6', 
			'50 48 56 7C 30 3C 54 06': 'IX-Nikkor 60-180mm f/4-5.6', 
			'53 48 60 80 24 24 57 02': 'AF Zoom-Nikkor 80-200mm f/2.8D ED', 
			'53 48 60 80 24 24 60 02': 'AF Zoom-Nikkor 80-200mm f/2.8D ED', 
			'54 44 5C 7C 34 3C 58 02': 'AF Zoom-Micro Nikkor 70-180mm f/4.5-5.6D ED', 
			'54 44 5C 7C 34 3C 61 02': 'AF Zoom-Micro Nikkor 70-180mm f/4.5-5.6D ED', 
			'56 3C 5C 8E 30 3C 1C 02': 'Sigma 70-300mm F4-5.6 APO Macro Super II', 
			'56 48 5C 8E 30 3C 5A 02': 'AF Zoom-Nikkor 70-300mm f/4-5.6D ED', 
			'59 48 98 98 24 24 5D 02': 'AF-S Nikkor 400mm f/2.8D IF-ED', 
			'59 48 98 98 24 24 E1 02': 'AF-S Nikkor 400mm f/2.8D IF-ED + TC-17E', 
			'59 48 98 98 24 24 F1 02': 'AF-S Nikkor 400mm f/2.8D IF-ED + TC-14E', 
			'59 48 98 98 24 24 F2 02': 'AF-S Nikkor 400mm f/2.8D IF-ED + TC-20E', 
			'5A 3C 3E 56 30 3C 5E 06': 'IX-Nikkor 30-60mm f/4-5.6', 
			'5B 44 56 7C 34 3C 5F 06': 'IX-Nikkor 60-180mm f/4.5-5.6', 
			'5D 48 3C 5C 24 24 63 02': 'AF-S Zoom-Nikkor 28-70mm f/2.8D IF-ED', 
			'5E 48 60 80 24 24 64 02': 'AF-S Zoom-Nikkor 80-200mm f/2.8D IF-ED', 
			'5F 40 3C 6A 2C 34 65 02': 'AF Zoom-Nikkor 28-105mm f/3.5-4.5D IF', 
			'60 40 3C 60 2C 3C 66 02': 'AF Zoom-Nikkor 28-80mm f/3.5-5.6D', 
			'61 44 5E 86 34 3C 67 02': 'AF Zoom-Nikkor 75-240mm f/4.5-5.6D', 
			'63 48 2B 44 24 24 68 02': 'AF-S Nikkor 17-35mm f/2.8D IF-ED', 
			'64 00 62 62 24 24 6A 02': 'PC Micro-Nikkor 85mm f/2.8D', 
			'65 44 60 98 34 3C 6B 0A': 'AF VR Zoom-Nikkor 80-400mm f/4.5-5.6D ED', 
			'66 40 2D 44 2C 34 6C 02': 'AF Zoom-Nikkor 18-35mm f/3.5-4.5D IF-ED', 
			'67 48 37 62 24 30 6D 02': 'AF Zoom-Nikkor 24-85mm f/2.8-4D IF', 
			'67 54 37 5C 24 24 1C 02': 'Sigma 24-70mm F2.8 EX DG Macro', 
			'68 42 3C 60 2A 3C 6E 06': 'AF Zoom-Nikkor 28-80mm f/3.3-5.6G', 
			'69 47 5C 8E 30 3C 00 02': 'Tamron AF 70-300mm f/4-5.6 Di LD Macro 1:2 (A17N)', 
			'69 48 5C 8E 30 3C 6F 02': 'Tamron AF 70-300mm f/4-5.6 LD Macro 1:2 (572D/772D)', 
			'69 48 5C 8E 30 3C 6F 06': 'AF Zoom-Nikkor 70-300mm f/4-5.6G', 
			'6A 48 8E 8E 30 30 70 02': 'AF-S Nikkor 300mm f/4D IF-ED', 
			'6B 48 24 24 24 24 71 02': 'AF Nikkor ED 14mm f/2.8D', 
			'6D 48 8E 8E 24 24 73 02': 'AF-S Nikkor 300mm f/2.8D IF-ED II', 
			'6E 48 98 98 24 24 74 02': 'AF-S Nikkor 400mm f/2.8D IF-ED II', 
			'6F 3C A0 A0 30 30 75 02': 'AF-S Nikkor 500mm f/4D IF-ED II', 
			'70 3C A6 A6 30 30 76 02': 'AF-S Nikkor 600mm f/4D IF-ED II', 
			'72 48 4C 4C 24 24 77 00': 'Nikkor 45mm f/2.8 P', 
			'74 40 37 62 2C 34 78 06': 'AF-S Zoom-Nikkor 24-85mm f/3.5-4.5G IF-ED', 
			'75 40 3C 68 2C 3C 79 06': 'AF Zoom-Nikkor 28-100mm f/3.5-5.6G', 
			'76 58 50 50 14 14 7A 02': 'AF Nikkor 50mm f/1.8D', 
			'77 44 61 98 34 3C 7B 0E': 'Sigma 80-400mm F4.5-5.6 EX OS', 
			'77 48 5C 80 24 24 7B 0E': 'AF-S VR Zoom-Nikkor 70-200mm f/2.8G IF-ED', 
			'78 40 37 6E 2C 3C 7C 0E': 'AF-S VR Zoom-Nikkor 24-120mm f/3.5-5.6G IF-ED', 
			'79 40 11 11 2C 2C 1C 06': 'Sigma 8mm F3.5 EX Circular Fisheye', 
			'79 40 3C 80 2C 3C 7F 06': 'AF Zoom-Nikkor 28-200mm f/3.5-5.6G IF-ED', 
			'79 48 3C 5C 24 24 1C 06': 'Sigma 28-70mm F2.8 EX DG', 
			'79 48 5C 5C 24 24 1C 06': 'Sigma Macro 70mm F2.8 EX DG', 
			'7A 3B 53 80 30 3C 4B 06': 'Sigma 55-200mm F4-5.6 DC HSM', 
			'7A 3C 1F 37 30 30 7E 06.1': 'AF-S DX Zoom-Nikkor 12-24mm f/4G IF-ED', 
			'7A 3C 1F 37 30 30 7E 06.2': 'Tokina AT-X 124 AF PRO DX II (AF 12-24mm f/4)', 
			'7A 40 2D 50 2C 3C 4B 06': 'Sigma 18-50mm F3.5-5.6 DC HSM', 
			'7A 40 2D 80 2C 40 4B 0E': 'Sigma 18-200mm F3.5-6.3 DC OS HSM', 
			'7A 47 2B 5C 24 34 4B 06': 'Sigma 17-70mm F2.8-4.5 DC Macro Asp. IF HSM', 
			'7A 47 50 76 24 24 4B 06': 'Sigma 50-150mm F2.8 EX APO DC HSM', 
			'7A 48 2B 5C 24 34 4B 06': 'Sigma 17-70mm F2.8-4.5 DC Macro Asp. IF HSM', 
			'7A 48 2D 50 24 24 4B 06': 'Sigma 18-50mm F2.8 EX DC Macro', 
			'7A 48 5C 80 24 24 4B 06': 'Sigma 70-200mm F2.8 EX APO DG Macro HSM II', 
			'7A 54 6E 8E 24 24 4B 02': 'Sigma APO 120-300mm F2.8 EX DG HSM', 
			'7B 48 80 98 30 30 80 0E': 'AF-S VR Zoom-Nikkor 200-400mm f/4G IF-ED', 
			'7D 48 2B 53 24 24 82 06': 'AF-S DX Zoom-Nikkor 17-55mm f/2.8G IF-ED', 
			'7F 40 2D 5C 2C 34 84 06': 'AF-S DX Zoom-Nikkor 18-70mm f/3.5-4.5G IF-ED', 
			'7F 48 2B 5C 24 34 1C 06': 'Sigma 17-70mm F2.8-4.5 DC Macro Asp. IF', 
			'7F 48 2D 50 24 24 1C 06': 'Sigma 18-50mm F2.8 EX DC Macro', 
			'80 48 1A 1A 24 24 85 06': 'AF DX Fisheye-Nikkor 10.5mm f/2.8G ED', 
			'81 54 80 80 18 18 86 0E': 'AF-S VR Nikkor 200mm f/2G IF-ED', 
			'82 48 8E 8E 24 24 87 0E': 'AF-S VR Nikkor 300mm f/2.8G IF-ED', 
			'83 00 B0 B0 5A 5A 88 04': 'FSA-L2, EDG 65, 800mm F13 G', 
			'89 3C 53 80 30 3C 8B 06': 'AF-S DX Zoom-Nikkor 55-200mm f/4-5.6G ED', 
			'8A 54 6A 6A 24 24 8C 0E': 'AF-S VR Micro-Nikkor 105mm f/2.8G IF-ED', 
			'8B 40 2D 80 2C 3C 8D 0E': 'AF-S DX VR Zoom-Nikkor 18-200mm f/3.5-5.6G IF-ED', 
			'8B 40 2D 80 2C 3C FD 0E': 'AF-S DX VR Zoom-Nikkor 18-200mm f/3.5-5.6G IF-ED [II]', 
			'8B 4C 2D 44 14 14 4B 06': 'Sigma 18-35mm F1.8 DC HSM', 
			'8C 40 2D 53 2C 3C 8E 06': 'AF-S DX Zoom-Nikkor 18-55mm f/3.5-5.6G ED', 
			'8D 44 5C 8E 34 3C 8F 0E': 'AF-S VR Zoom-Nikkor 70-300mm f/4.5-5.6G IF-ED', 
			'8E 3C 2B 5C 24 30 4B 0E': 'Sigma 17-70mm F2.8-4 DC Macro OS HSM Contemporary', 
			'8F 40 2D 72 2C 3C 91 06': 'AF-S DX Zoom-Nikkor 18-135mm f/3.5-5.6G IF-ED', 
			'90 3B 53 80 30 3C 92 0E': 'AF-S DX VR Zoom-Nikkor 55-200mm f/4-5.6G IF-ED', 
			'91 54 44 44 0C 0C 4B 06': 'Sigma 35mm F1.4 DG HSM', 
			'92 2C 2D 88 2C 40 4B 0E': 'Sigma 18-250mm F3.5-6.3 DC Macro OS HSM', 
			'92 48 24 37 24 24 94 06': 'AF-S Zoom-Nikkor 14-24mm f/2.8G ED', 
			'93 48 37 5C 24 24 95 06': 'AF-S Zoom-Nikkor 24-70mm f/2.8G ED', 
			'94 40 2D 53 2C 3C 96 06': 'AF-S DX Zoom-Nikkor 18-55mm f/3.5-5.6G ED II', 
			'95 00 37 37 2C 2C 97 06': 'PC-E Nikkor 24mm f/3.5D ED', 
			'95 4C 37 37 2C 2C 97 02': 'PC-E Nikkor 24mm f/3.5D ED', 
			'96 38 1F 37 34 3C 4B 06': 'Sigma 12-24mm F4.5-5.6 II DG HSM', 
			'96 48 98 98 24 24 98 0E': 'AF-S VR Nikkor 400mm f/2.8G ED', 
			'97 3C A0 A0 30 30 99 0E': 'AF-S VR Nikkor 500mm f/4G ED', 
			'98 3C A6 A6 30 30 9A 0E': 'AF-S VR Nikkor 600mm f/4G ED', 
			'99 40 29 62 2C 3C 9B 0E': 'AF-S DX VR Zoom-Nikkor 16-85mm f/3.5-5.6G ED', 
			'99 48 76 76 24 24 4B 0E': 'Sigma APO Macro 150mm F2.8 EX DG OS HSM', 
			'9A 40 2D 53 2C 3C 9C 0E': 'AF-S DX VR Zoom-Nikkor 18-55mm f/3.5-5.6G', 
			'9B 00 4C 4C 24 24 9D 06': 'PC-E Micro Nikkor 45mm f/2.8D ED', 
			'9B 54 4C 4C 24 24 9D 02': 'PC-E Micro Nikkor 45mm f/2.8D ED', 
			'9B 54 62 62 0C 0C 4B 06': 'Sigma 85mm F1.4 EX DG HSM', 
			'9C 48 5C 80 24 24 4B 0E': 'Sigma 70-200mm F2.8 EX DG OS HSM', 
			'9C 54 56 56 24 24 9E 06': 'AF-S Micro Nikkor 60mm f/2.8G ED', 
			'9D 00 62 62 24 24 9F 06': 'PC-E Micro Nikkor 85mm f/2.8D', 
			'9D 48 2B 50 24 24 4B 0E': 'Sigma 17-50mm F2.8 EX DC OS HSM', 
			'9D 54 62 62 24 24 9F 02': 'PC-E Micro Nikkor 85mm f/2.8D', 
			'9E 38 11 29 34 3C 4B 06': 'Sigma 8-16mm F4.5-5.6 DC HSM', 
			'9E 40 2D 6A 2C 3C A0 0E': 'AF-S DX VR Zoom-Nikkor 18-105mm f/3.5-5.6G ED', 
			'9F 37 50 A0 34 40 4B 0E': 'Sigma 50-500mm F4.5-6.3 DG OS HSM', 
			'9F 58 44 44 14 14 A1 06': 'AF-S DX Nikkor 35mm f/1.8G', 
			'A0 40 2D 74 2C 3C BB 0E': 'AF-S DX Nikkor 18-140mm f/3.5-5.6G ED VR', 
			'A0 48 2A 5C 24 30 4B 0E': 'Sigma 17-70mm F2.8-4 DC Macro OS HSM', 
			'A0 54 50 50 0C 0C A2 06': 'AF-S Nikkor 50mm f/1.4G', 
			'A1 40 18 37 2C 34 A3 06': 'AF-S DX Nikkor 10-24mm f/3.5-4.5G ED', 
			'A1 41 19 31 2C 2C 4B 06': 'Sigma 10-20mm F3.5 EX DC HSM', 
			'A1 54 55 55 0C 0C BC 06': 'AF-S Nikkor 58mm f/1.4G', 
			'A2 40 2D 53 2C 3C BD 0E': 'AF-S DX VR Nikkor 18-55mm f/3.5-5.6G II', 
			'A2 48 5C 80 24 24 A4 0E': 'AF-S Nikkor 70-200mm f/2.8G ED VR II', 
			'A3 3C 29 44 30 30 A5 0E': 'AF-S Nikkor 16-35mm f/4G ED VR', 
			'A3 3C 5C 8E 30 3C 4B 0E': 'Sigma 70-300mm F4-5.6 DG OS', 
			'A4 47 2D 50 24 34 4B 0E': 'Sigma 18-50mm F2.8-4.5 DC OS HSM', 
			'A4 54 37 37 0C 0C A6 06': 'AF-S Nikkor 24mm f/1.4G ED', 
			'A5 40 2D 88 2C 40 4B 0E': 'Sigma 18-250mm F3.5-6.3 DC OS HSM', 
			'A5 40 3C 8E 2C 3C A7 0E': 'AF-S Nikkor 28-300mm f/3.5-5.6G ED VR', 
			'A6 48 37 5C 24 24 4B 06': 'Sigma 24-70mm F2.8 IF EX DG HSM', 
			'A6 48 8E 8E 24 24 A8 0E': 'AF-S VR Nikkor 300mm f/2.8G IF-ED II', 
			'A7 49 80 A0 24 24 4B 06': 'Sigma APO 200-500mm F2.8 EX DG', 
			'A7 4B 62 62 2C 2C A9 0E': 'AF-S DX Micro Nikkor 85mm f/3.5G ED VR', 
			'A8 48 80 98 30 30 AA 0E': 'AF-S VR Zoom-Nikkor 200-400mm f/4G IF-ED II', 
			'A9 54 80 80 18 18 AB 0E': 'AF-S Nikkor 200mm f/2G ED VR II', 
			'AA 3C 37 6E 30 30 AC 0E': 'AF-S Nikkor 24-120mm f/4G ED VR', 
			'AC 38 53 8E 34 3C AE 0E': 'AF-S DX VR Nikkor 55-300mm 4.5-5.6G ED', 
			'AD 3C 2D 8E 2C 3C AF 0E': 'AF-S DX Nikkor 18-300mm 3.5-5.6G ED VR', 
			'AE 54 62 62 0C 0C B0 06': 'AF-S Nikkor 85mm f/1.4G', 
			'AF 54 44 44 0C 0C B1 06': 'AF-S Nikkor 35mm f/1.4G', 
			'B0 4C 50 50 14 14 B2 06': 'AF-S Nikkor 50mm f/1.8G', 
			'B1 48 48 48 24 24 B3 06': 'AF-S DX Micro Nikkor 40mm f/2.8G', 
			'B2 48 5C 80 30 30 B4 0E': 'AF-S Nikkor 70-200mm f/4G ED VR', 
			'B3 4C 62 62 14 14 B5 06': 'AF-S Nikkor 85mm f/1.8G', 
			'B4 40 37 62 2C 34 B6 0E': 'AF-S VR Zoom-Nikkor 24-85mm f/3.5-4.5G IF-ED', 
			'B5 4C 3C 3C 14 14 B7 06': 'AF-S Nikkor 28mm f/1.8G', 
			'B6 48 37 56 24 24 1C 02': 'Sigma 24-60mm F2.8 EX DG', 
			'B7 44 60 98 34 3C B9 0E': 'AF-S Nikkor 80-400mm f/4.5-5.6G ED VR', 
			'B8 40 2D 44 2C 34 BA 06': 'AF-S Nikkor 18-35mm f/3.5-4.5G ED', 
			'CD 3D 2D 70 2E 3C 4B 0E': 'Sigma 18-125mm F3.8-5.6 DC OS HSM', 
			'CE 34 76 A0 38 40 4B 0E': 'Sigma 150-500mm F5-6.3 DG OS APO HSM', 
			'CF 38 6E 98 34 3C 4B 0E': 'Sigma APO 120-400mm F4.5-5.6 DG OS HSM', 
			'DC 48 19 19 24 24 4B 06': 'Sigma 10mm F2.8 EX DC HSM Fisheye', 
			'DE 54 50 50 0C 0C 4B 06': 'Sigma 50mm F1.4 EX DG HSM', 
			'E0 3C 5C 8E 30 3C 4B 06': 'Sigma 70-300mm F4-5.6 APO DG Macro HSM', 
			'E1 58 37 37 14 14 1C 02': 'Sigma 24mm F1.8 EX DG Aspherical Macro', 
			'E3 54 50 50 24 24 35 02': 'Sigma Macro 50mm F2.8 EX DG', 
			'E5 54 6A 6A 24 24 35 02': 'Sigma Macro 105mm F2.8 EX DG', 
			'E6 41 3C 8E 2C 40 1C 02': 'Sigma 28-300mm F3.5-6.3 DG Macro', 
			'E9 54 37 5C 24 24 1C 02': 'Sigma 24-70mm F2.8 EX DG Macro', 
			'EA 48 27 27 24 24 1C 02': 'Sigma 15mm F2.8 EX Diagonal Fisheye', 
			'ED 40 2D 80 2C 40 4B 0E': 'Sigma 18-200mm F3.5-6.3 DC OS HSM', 
			'EE 48 5C 80 24 24 4B 06': 'Sigma 70-200mm F2.8 EX APO DG Macro HSM II', 
			'F0 38 1F 37 34 3C 4B 06': 'Sigma 12-24mm F4.5-5.6 EX DG Aspherical HSM', 
			'F0 3F 2D 8A 2C 40 DF 0E': 'Tamron AF 18-270mm f/3.5-6.3 Di II VC PZD (B008)', 
			'F1 44 A0 A0 34 34 4B 02': 'Sigma APO 500mm F4.5 EX DG HSM', 
			'F1 47 5C 8E 30 3C DF 0E': 'Tamron SP 70-300mm f/4-5.6 Di VC USD (A005)', 
			'F3 48 68 8E 30 30 4B 02': 'Sigma APO 100-300mm F4 EX IF HSM', 
			'F3 54 2B 50 24 24 84 0E': 'Tamron SP AF 17-50mm f/2.8 XR Di II VC LD Aspherical (IF) (B005)', 
			'F4 54 56 56 18 18 84 06': 'Tamron SP AF 60mm f/2.0 Di II Macro 1:1 (G005)', 
			'F5 40 2C 8A 2C 40 40 0E': 'Tamron AF 18-270mm f/3.5-6.3 Di II VC LD Aspherical (IF) Macro (B003)', 
			'F5 48 76 76 24 24 4B 06': 'Sigma APO Macro 150mm F2.8 EX DG HSM', 
			'F6 3F 18 37 2C 34 84 06': 'Tamron SP AF 10-24mm f/3.5-4.5 Di II LD Aspherical (IF) (B001)', 
			'F6 48 2D 50 24 24 4B 06': 'Sigma 18-50mm F2.8 EX DC Macro', 
			'F7 53 5C 80 24 24 40 06': 'Tamron SP AF 70-200mm f/2.8 Di LD (IF) Macro (A001)', 
			'F7 53 5C 80 24 24 84 06': 'Tamron SP AF 70-200mm f/2.8 Di LD (IF) Macro (A001)', 
			'F8 54 3E 3E 0C 0C 4B 06': 'Sigma 30mm F1.4 EX DC HSM', 
			'F8 54 64 64 24 24 DF 06': 'Tamron SP AF 90mm f/2.8 Di Macro 1:1 (272NII)', 
			'F8 55 64 64 24 24 84 06': 'Tamron SP AF 90mm f/2.8 Di Macro 1:1 (272NII)', 
			'F9 3C 19 31 30 3C 4B 06': 'Sigma 10-20mm F4-5.6 EX DC HSM', 
			'F9 40 3C 8E 2C 40 40 0E': 'Tamron AF 28-300mm f/3.5-6.3 XR Di VC LD Aspherical (IF) Macro (A20)', 
			'FA 54 3C 5E 24 24 84 06': 'Tamron SP AF 28-75mm f/2.8 XR Di LD Aspherical (IF) Macro (A09NII)', 
			'FA 54 3C 5E 24 24 DF 06': 'Tamron SP AF 28-75mm f/2.8 XR Di LD Aspherical (IF) Macro (A09NII)', 
			'FA 54 6E 8E 24 24 4B 02': 'Sigma APO 120-300mm F2.8 EX DG HSM', 
			'FB 54 2B 50 24 24 84 06': 'Tamron SP AF 17-50mm f/2.8 XR Di II LD Aspherical (IF) (A16NII)', 
			'FB 54 8E 8E 24 24 4B 02': 'Sigma APO 300mm F2.8 EX DG HSM', 
			'FC 40 2D 80 2C 40 DF 06': 'Tamron AF 18-200mm f/3.5-6.3 XR Di II LD Aspherical (IF) Macro (A14NII)', 
			'FD 47 50 76 24 24 4B 06': 'Sigma 50-150mm F2.8 EX APO DC HSM II', 
			'FE 47 00 00 24 24 4B 06': 'Sigma 4.5mm F2.8 EX DC HSM Circular Fisheye', 
			'FE 48 37 5C 24 24 DF 0E': 'Tamron SP 24-70mm f/2.8 Di VC USD (A007)', 
			'FE 53 5C 80 24 24 84 06': 'Tamron SP AF 70-200mm f/2.8 Di LD (IF) Macro (A001)', 
			'FE 54 5C 80 24 24 DF 0E': 'Tamron SP 70-200mm f/2.8 Di VC USD (A009)', 
			'FE 54 64 64 24 24 DF 0E': 'Tamron SP 90mm f/2.8 Di VC USD Macro 1:1 (F004)', 
			'FF 40 2D 80 2C 40 4B 06': 'Sigma 18-200mm F3.5-6.3 DC'
		}
	},
	
	
	
	_IFDpointer_ShotInfo: { 
		0: 'ShotInfoVersion',
		4: 'FirmwareVersion',
		16: { value: 'DistortionControl', _val: {0:'Off',  1:'On'} },
		102:{ value: 'VR_0x66?', _val: {0:'Off',  1:'On (normal)',  2:'On (active)'} },
		106: 'ShutterCount',
		110: 'DeletedImageCount',
		117: { value: 'VibrationReduction', _val: {0:'Off',  1:'On (1)',  2:'On (2)',  3:'On (3)'} },
		130: { value: 'VibrationReduction', _val: {0:'Off',  1:'On'} },
		343: 'ShutterCount',
		430: { value: 'VibrationReduction', _val: {0x0:'n/a',  0xc:'Off',  0xf:'On'} },
		589: 'ShutterCount' 
	},
	MakerNoteCamInfos : {
		D40: {
			0: 'ShotInfoVersion',
			582: 'ShutterCount',
			729: { ref: /* Custom Settings BIG TODO see top...*/ 'D40' },
			586.1: { value: 'VibrationReduction', _val: { /*[Mask 0x08]*/ 0x0:'Off',  0x8:'On'} } 
		},
		D80: {
			0: 'ShotInfoVersion',
			586: 'ShutterCount',
			708: { value: 'NikonImageSize', _val: { /*[Mask 0xf0]*/  0x0:'Large (10.0 M)',  0x10:'Medium (5.6 M)',  0x20:'Small (2.5 M)'} },
			748: { ref: /* Custom Settings BIG TODO...*/ 'D80' },
			590.1: { value: 'Rotation', _val: { /*'[Mask 0x07]*/  0x0:'Horizontal',  0x1:'Rotated 270 CW',  0x2:'Rotated 90 CW',  0x3:'Rotated 180'} },
			590.2: { value: 'VibrationReduction', _val: {/*[Mask 0x18]*/ 0x0:'Off',  0x18:'On'} },
			590.3: { value: 'FlashFired', _val: [/*[Mask 0xe0]*/ null, null, null, null, null, null, 'Internal', 'External'] }
		},
		D90: { 
			0: 'ShotInfoVersion',
			4: 'FirmwareVersion',
			693: 'ISO2',
			725: 'ShutterCount',
			884: { ref: /* Custom Settings BIG TODO...*/ 'D90' }
		},
		D3a: {
			0: 'ShotInfoVersion',
			598: 'ISO2',
			630: 'ShutterCount',
			769: { ref: 'D3' },
			723.1: { value: 'NikonImageSize', _val: {/*[Mask 0x18]'*/  0x0:'Large',  0x8:'Medium',  0x10:'Small'}}
		},
		D3b: {
			0: 'ShotInfoVersion',
			4: 'FirmwareVersion',
			16: 
			 { value: 'ImageArea', _val: {0:'FX (36.0 x 23.9 mm)',  1:'DX (23.5 x 15.6 mm)',  2:'5:4 (30.0 x 23.9 mm)'} },
			605: 'ISO2', 
			637: 'ShutterCount',
			639: 'ShutterCount',
			650: 'PreFlashReturnStrength',
			778: { ref: 'D3' },
			732.1: 
			 { value: 'NikonImageSize',  _val: {/*[Mask 0x18]*/  0x0:'Large',  0x8:'Medium',  0x10:'Small'}}
		},
		D3X: {
			0: 'ShotInfoVersion',
			4: 'FirmwareVersion',
			605: 'ISO2',
			640: 'ShutterCount',
			779: { ref: 'D3'}
		},
		D3S: {
			0: 'ShotInfoVersion',
			4: 'FirmwareVersion',
			16: { value: 'ImageArea', _val: {0:'FX (36x24)', 1:'DX (24x16)', 2:'5:4 (30x24)', 3:'1.2x (30x20)'} },
			545: 'ISO2',
			578: 'ShutterCount',
			718: { ref: 'D3' }
		},
		D300a: {
			0: 'ShotInfoVersion',
			604: 'ISO2',
			633: 'ShutterCount',
			790: { ref: 'D3' }
		},
  		D300b: {
			0: 'ShotInfoVersion',
			4: 'FirmwareVersion',
			613: 'ISO2',
			644: 'ShutterCount',
			802: { ref: 'D3'}
		},
  		D300S: {
			0: 'ShotInfoVersion',
			4: 'FirmwareVersion',
			613: 'ISO2',
			646: 'ShutterCount',
			804: { ref: 'D3'}
		},
  		D700: {
			0: 'ShotInfoVersion',
			4: 'FirmwareVersion',
			613: 'ISO2',
			647: 'ShutterCount',
			804: { ref: 'D700'} 
		},
		D800: {
			0: 'ShotInfoVersion',
			4: 'FirmwareVersion',
			1216: 'RepeatingFlashOutputExternal',
			1218: 'RepeatingFlashRateExternal',
			1219: 'RepeatingFlashCountExternal',
			1234: 'FlashExposureComp2',
			1242: 'RepeatingFlashRateBuiltIn',
			1243: 'RepeatingFlashCountBuiltIn',
			1308: 'SequenceNumber',
			1531: 'ShutterCount',
			1772: { ref: 'D800' } 
		},
		D5000: {
			0: 'ShotInfoVersion',
			4: 'FirmwareVersion',
			693: 'ISO2',
			726: 'ShutterCount',
			888: { ref: 'D5000' } 
		},
		D5100: {
	  		0: 'ShotInfoVersion',
			4: 'FirmwareVersion',
			801: 'ShutterCount',
			1031: { ref: 'D5100' } 
		},
		D5200: {
	  		0: 'ShotInfoVersion',
			4: 'FirmwareVersion',
			3032: 'ShutterCount',
			3285: { ref: 'D5200' } 
		},
		D7000: {
			0: 'ShotInfoVersion',
			4: 'FirmwareVersion',
			800: 'ShutterCount',
			1028: { ref: 'D7000' } 
		}
	},
	
	MakerNoteCustomSettings : { 
		D40: { 
			0.1: { value: 'Beep', _val: {0x0:'On',  0x80:'Off'} },
			0.2: { value: 'AFAssist', _val: {0x0:'On',  0x40:'Off'} },
			0.3: { value: 'NoMemoryCard', _val: {0x0:'Release Locked',  0x20:'Enable Release'} },
			0.4: { value: 'ImageReview', _val: {0x0:'On',  0x10:'Off'} },
			1.1: { value: 'AutoISO', _val: {0x0:'Off',  0x80:'On'} },
			1.2: { value: 'AutoISOMax', _val: {0x10:'400',  0x20:'800',  0x30:'1600'} },
			/*0x0 = 1/125 s\n  0x1 = 1/60 s\n  0x2 = 1/30 s\n  0x3 = 1/15 s': '',*/
			2.1: { value: 'ImageReviewTime', _val: {0x0:'4 s',  0x1:'8 s',  0x2:'20 s',  0x3:'1 min',  0x4:'10 min'} },
			3.1: { value: 'MonitorOffTime', _val: {0x0:'4 s',  0x20:'8 s',  0x40:'20 s',  0x60:'1 min',  0x80:'10 min'} },
			3.2: { value: 'MeteringTime', _val: {0x0:'4 s',  0x4:'8 s',  0x8:'20 s',  0xc:'1 min',  0x10:'30 min'} },
			3.3: { value: 'SelfTimerTime', _val: {0x0:'2 s',  0x1:'5 s',  0x2:'10 s',  0x3:'20 s'} },
			3.4: { value: 'RemoteOnDuration', _val: {0x0:'1 min',  0x40:'5 min',  0x80:'10 min',  0xc0:'15 min'} },
			4.1: { value: 'AELockButton', _val: {0x0:'AE/AF Lock',  0x2:'AE Lock Only',  0x4:'AF Lock Only',  0x6:'AE Lock (hold)',  0x8:'AF-ON'} },
			4.2: { value: 'AELock', _val: {0x0:'Off',  0x1:'On'} },
			5.1: { value: 'ShootingModeSetting', _val: {0x0:'Single Frame',  0x10:'Continuous',  0x20:'Self-timer',  0x30:'Delayed Remote',  0x40:'Quick-response Remote'} },
			5.2: { value: 'TimerFunctionButton', _val: {0x0:'Shooting Mode',  0x1:'Image Quality/Size',  0x2:'ISO',  0x3:'White Balance',  0x4:'Self-timer'} },
			6.1: { value: 'Metering', _val: {0x0:'Matrix',  0x1:'Center-weighted',  0x2:'Spot'} },
			8.1: { value: 'InternalFlash', _val: {0x0:'TTL',  0x10:'Manual'} },
			8.2: 'ManualFlashOutput',
			9: 'FlashLevel',
			10.1: { value: 'FocusModeSetting', _val: {0x0:'Manual',  0x40:'AF-S',  0x80:'AF-C',  0xc0:'AF-A'} },
			11.1: { value: 'AFAreaModeSetting', _val: {0x0:'Single Area',  0x10:'Dynamic Area',  0x20:'Closest Subject'} } 
		},
		D80: { 
			0.1: { value: 'Beep', _val: {0x0:'On',  0x80:'Off'} },
			0.2: { value: 'AFAssist', _val: {0x0:'On',  0x40:'Off'} },
			0.3: { value: 'NoMemoryCard', _val: {0x0:'Release Locked',  0x20:'Enable Release'} },
			0.4: { value: 'ImageReview', _val: {0x0:'On',  0x10:'Off'} },
			0.5: { value: 'Illumination', _val: {0x0:'Off',  0x8:'On'} },
			0.6: { value: 'MainDialExposureComp', _val: {0x0:'Off',  0x4:'On'} },
			0.7: { value: 'EVStepSize', _val: {0x0:'1/3 EV',  0x1:'1/2 EV'} },
			1.1: { value: 'AutoISO', _val: {0x0:'Off',  0x40:'On'} },
			1.2: { value: 'AutoISOMax', _val: {0x0:'200',  0x10:'400',  0x20:'800',  0x30:'1600'} },
			/*0x0 = 1/125 s\n  0x1 = 1/100 s\n  0x2 = 1/80 s\n  0x3 = 1/60 s\n  0x4 = 1/40 s\n  0x5 = 1/30 s': '',*/
			2.1: { value: 'AutoBracketSet', _val: {0x0:'AE & Flash',  0x40:'AE Only',  0x80:'Flash Only',  0xc0:'WB Bracketing'} },
			2.2: { value: 'AutoBracketOrder', _val: {0x0:'0,-,+',  0x20:'-,0,+'} },
			/*0x0 = 5 s\n  0x20 = 10 s\n  0x40 = 20 s': '',
			0x0 = 4 s\n  0x4 = 6 s\n  0x8 = 8 s': '',*/
			3.3: { value: 'SelfTimerTime', _val: {0x0:'2 s',  0x1:'5 s',  0x2:'10 s',  0x3:'20 s'} },
			4.2: { value: 'AELock', _val: {0x0:'Off',  0x1:'On'} },
			4.3: { value: 'RemoteOnDuration', _val: {0x0:'1 min',  0x40:'5 min',  0x80:'10 min',  0xc0:'15 min'} },
			5.1: { value: 'CommandDials', _val: {0x0:'Standard (Main Shutter, Sub Aperture)',  0x80:'Reversed (Main Aperture, Sub Shutter)'} },
			/*0x0 = ISO Display\n  0x8 = Framing Grid\n  0x10 = AF-area Mode\n  0x18 = Center AF Area\n  0x20 = FV Lock': '',*/
			6.1: { value: 'GridDisplay', _val: {0x0:'Off',  0x80:'On'} },
			6.2: { value: 'ViewfinderWarning', _val: {0x0:'On',  0x40:'Off'} },
			6.3: { value: 'CenterWeightedAreaSize', _val: {0x0:'6 mm',  0x4:'8 mm',  0x8:'10 mm'} },
			6.4: { value: 'ExposureDelayMode', _val: {0x0:'Off',  0x20:'On'} },
			6.5: { value: 'MB-D80Batteries', _val: {0x0:'LR6 (AA Alkaline)',  0x1:'HR6 (AA Ni-MH)',  0x2:'FR6 (AA Lithium)',  0x3:'ZR6 (AA Ni-Mg)'} },
			7.1: { value: 'FlashWarning', _val: {0x0:'On',  0x80:'Off'} },
			7.2: 'FlashShutterSpeed',
			7.3: { value: 'AutoFP', _val: {0x0:'Off',  0x4:'On'} },
			7.4: { value: 'ModelingFlash', _val: {0x0:'Off',  0x2:'On'} },
			8.1: { value: 'InternalFlash', _val: {0x0:'TTL',  0x40:'Manual',  0x80:'Repeating Flash',  0xc0:'Commander Mode'} },
			8.2: 'ManualFlashOutput',
			9.1: 'RepeatingFlashOutput',
			9.2: 'RepeatingFlashCount',
			10.1: 'RepeatingFlashRate',
			10.2: 'CommanderChannel',
			11.1: { value: 'CommanderInternalFlash', _val: {0x0:'TTL',  0x40:'Manual',  0x80:'Off'} },
			11.2: { value: 'CommanderGroupAMode', _val: {0x0:'TTL',  0x10:'Auto Aperture',  0x20:'Manual',  0x30:'Off'} },
			11.3: { value: 'CommanderGroupBMode', _val: {0x0:'TTL',  0x4:'Auto Aperture',  0x8:'Manual',  0xc:'Off'} },
			12.1: 'CommanderInternalTTLComp',
			12.2: 'CommanderInternalManualOutput',
			13.1: 'CommanderGroupA_TTL-AAComp',
			13.2: 'CommanderGroupAManualOutput',
			14.1: 'CommanderGroupB_TTL-AAComp',
			14.2: 'CommanderGroupBManualOutput',
			15.1: { value: 'CenterAFArea', _val: {0x0:'Normal Zone',  0x80:'Wide Zone'} },
			15.2: { value: 'FocusAreaSelection', _val: {0x0:'No Wrap',  0x4:'Wrap'} },
			15.3: { value: 'AFAreaIllumination', _val: {0x0:'Auto',  0x1:'Off',  0x2:'On'} },
			16.1: { value: 'AFAreaModeSetting', _val: {0x0:'Single Area',  0x40:'Dynamic Area',  0x80:'Auto-area'} } 
		},
		D90: { 
			0.1: { value: 'LightSwitch', _val: {0x0:'LCD Backlight',  0x8:'LCD Backlight and Shooting Information'} },
			2.1: { value: 'AFAreaModeSetting', _val: {0x0:'Single Area',  0x20:'Dynamic Area',  0x40:'Auto-area',  0x60:'3D-tracking (11 points)'} },
			2.2: { value: 'CenterFocusPoint', _val: {0x0:'Normal Zone',  0x10:'Wide Zone'} },
			2.3: { value: 'AFAssist', _val: {0x0:'On',  0x1:'Off'} },
			2.4: { value: 'AFPointIllumination', _val: {0x0:'Auto',  0x2:'On',  0x4:'Off'} },
			2.5: { value: 'FocusPointWrap', _val: {0x0:'No Wrap',  0x8:'Wrap'} },
			3.2: { value: 'MB-D80BatteryType', _val: {0x0:'LR6 (AA alkaline)',  0x1:'HR6 (AA Ni-MH)',  0x2:'FR6 (AA lithium)',  0x3:'ZR6 (AA Ni-Mn)'} },
			4.1: { value: 'Beep', _val: {0x0:'Off',  0x40:'On'} },
			4.2: { value: 'GridDisplay', _val: {0x0:'Off',  0x2:'On'} },
			4.3: { value: 'ISODisplay', _val: {0x0:'Show ISO/Easy ISO',  0x4:'Show ISO Sensitivity',  0xc:'Show Frame Count'} },
			4.4: { value: 'ViewfinderWarning', _val: {0x0:'On',  0x1:'Off'} },
			4.5: { value: 'NoMemoryCard', _val: {0x0:'Release Locked',  0x20:'Enable Release'} },
			5.1: { value: 'ScreenTips', _val: {0x0:'Off',  0x4:'On'} },
			5.2: { value: 'FileNumberSequence', _val: {0x0:'On',  0x8:'Off'} },
			5.3: { value: 'ShootingInfoDisplay', _val: {0x0:'Auto',  0x80:'Manual (dark on light)',  0xc0:'Manual (light on dark)'} },
			5.4: { value: 'LCDIllumination', _val: {0x0:'Off',  0x20:'On'} },
			6.1: { value: 'EasyExposureComp', _val: {0x0:'Off',  0x1:'On'} },
			6.2: { value: 'ReverseIndicators', _val: {0x0:'+ 0 -',  0x80:'- 0 +'} },
			7.1: { value: 'ExposureControlStepSize', _val: {0x0:'1/3 EV',  0x40:'1/2 EV'} },
			8.1: { value: 'CenterWeightedAreaSize', _val: {0x0:'6 mm',  0x20:'8 mm',  0x40:'10 mm'} },
			8.2: 'FineTuneOptMatrixMetering',
			9.1: 'FineTuneOptCenterWeighted',
			9.2: 'FineTuneOptSpotMetering',
			11.1: 'CLModeShootingSpeed',
			11.2: { value: 'ExposureDelayMode', _val: {0x0:'Off',  0x40:'On'} },
			13.1: { value: 'AutoBracketSet', _val: {0x0:'AE & Flash',  0x20:'AE Only',  0x40:'Flash Only',  0x60:'WB Bracketing',  0x80:'Active D-Lighting'} },
			13.2: { value: 'AutoBracketOrder', _val: {0x0:'0,-,+',  0x10:'-,0,+'} },
			16.1: { value: 'OKButton', _val: {0x0:'Not Used',  0x8:'Select Center Focus Point',  0x10:'Highlight Active Focus Point',  0x18:'Not Used'} },
			/* 0x0 = AE/AF Lock\n  0x8 = AE Lock Only\n  0x10 = AF Lock Only': '', */
			18.1: { value: 'CommandDialsReverseRotation', _val: {0x0:'No',  0x80:'Yes'} },
			18.2: { value: 'ShutterReleaseButtonAE-L', _val: {0x0:'Off',  0x2:'On'} },
			/* 0x0 = 4 s\n  0x10 = 6 s\n  0x20 = 8 s\n  0x30 = 16 s\n  0x40 = 30 s': '', */
			19.2: { value: 'RemoteOnDuration', _val: {0x0:'1 min',  0x1:'5 min',  0x2:'10 min',  0x3:'15 min'} },
			20.1: { value: 'SelfTimerTime', _val: {0x0:'2 s',  0x40:'5 s',  0x80:'10 s',  0xc0:'20 s'} },
			20.2: 'SelfTimerShotCount',
			/* 
			0x0 = 4 s\n  0x4 = 10 s\n  0x8 = 20 s': '',
			0x0 = 4 s\n  0x20 = 10 s\n  0x40 = 20 s': '',
			0x0 = 1/60 s\n  0x1 = 1/30 s\n  0x2 = 1/15 s\n  0x3 = 1/8 s\n  0x4 = 1/4 s\n  0x5 = 1/2 s': '',
			*/
			24.1: { value: 'InternalFlash', _val: {0x0:'TTL',  0x40:'Manual',  0x80:'Repeating Flash',  0xc0:'Commander Mode'} },
			24.2: 'ManualFlashOutput',
			25.1: 'RepeatingFlashOutput',
			25.2: 'RepeatingFlashCount',
			26.1: 'RepeatingFlashRate',
			31.1: { value: 'FlashWarning', _val: {0x0:'On',  0x80:'Off'} },
			31.2: 'CommanderInternalTTLComp',
			31.3: { value: 'ModelingFlash', _val: {0x0:'On',  0x20:'Off'} },
			31.4: { value: 'AutoFP', _val: {0x0:'Off',  0x40:'On'} },
			32.1: 'CommanderGroupA_TTLComp',
			33.1: 'CommanderGroupB_TTLComp',
			34.1: { value: 'LiveViewAF', _val: {0x0:'Face Priority',  0x40:'Wide Area',  0x80:'Normal Area'} } 
		},
		D3: { /* TODO - D300 is different */
			11: 'MaxContinuousRelease',
			0.1: { value: 'CustomSettingsBank', _val: {0x0:'A',  0x1:'B',  0x2:'C',  0x3:'D'} },
			0.2: { value: 'CustomSettingsAllDefault', _val: {0x0:'Yes',  0x80:'No'} },
			1.1: { value: 'AF-CPrioritySelection', _val: {0x0:'Release',  0x40:'Release + Focus',  0x80:'Focus'} },
			1.2: { value: 'AF-SPrioritySelection', _val: {0x0:'Focus',  0x20:'Release'} },
			1.3: { value: 'AFPointSelection', _val: {0x0:'51 Points',  0x10:'11 Points'} },
			1.4: { value: 'DynamicAFArea', _val: {0x0:'9 Points',  0x4:'21 Points',  0x8:'51 Points',  0xc:'51 Points (3D-tracking)'} },
			1.5: { value: 'FocusTrackingLockOn', _val: {0x0:'Long',  0x1:'Normal',  0x2:'Short',  0x3:'Off'} },
			2.1: { value: 'AFActivation', _val: {0x0:'Shutter/AF-On',  0x80:'AF-On Only'} },
			2.2: { value: 'FocusPointWrap', _val: {0x0:'No Wrap',  0x8:'Wrap'} },
			/* TODO
			2.3: { value: 'AFPointIllumination', _val: {(D3)',  [Mask 0x60]',  0x0:'On in Continuous Shooting and Manual Focusing',  0x20:'On During Manual Focusing',  0x40:'On in Continuous Shooting Modes',  0x60:'Off',  (D300)',  [Mask 0x06]',  0x0:'Auto',  0x2:'Off',  0x4:'On'} },
			*/
			2.4: { value: 'AFPointBrightness', _val: {0x0:'Low',  0x2:'Normal',  0x4:'High',  0x6:'Extra High'} },
			2.5: { value: 'AFAssist', _val: {0x0:'On',  0x1:'Off'} },
			/* 0x0 = 5 (Long)\n  0x1 = 4\n  0x2 = 3 (Normal)': '', */
			4.2: { value: 'AssignBktButton', _val: {0x0:'Auto Bracketing',  0x8:'Multiple Exposure'} },
			4.3: { value: 'MultiSelectorLiveView', _val: {0x0:'Reset',  0x40:'Zoom On/Off',  0x80:'Start Movie Recording',  0xc0:'Not Used'} },
			4.4: { value: 'InitialZoomLiveView', _val: {0x0:'Low Magnification',  0x10:'Medium Magnification',  0x20:'High Magnification'} },
			6.1: { value: 'ISOStepSize', _val: {0x0:'1/3 EV',  0x40:'1/2 EV',  0x80:'1 EV'} },
			6.2: { value: 'ExposureControlStepSize', _val: {0x0:'1/3 EV',  0x10:'1/2 EV',  0x20:'1 EV'} },
			6.3: { value: 'ExposureCompStepSize', _val: {0x0:'1/3 EV',  0x4:'1/2 EV',  0x8:'1 EV'} },
			6.4: { value: 'EasyExposureCompensation', _val: {0x0:'Off',  0x1:'On',  0x2:'On (auto reset)'} },
			/* TODO
			7.1: { value: 'CenterWeightedAreaSize', _val: {(D3)',  [Mask 0xe0]',  0x0:'8 mm',  0x20:'12 mm',  0x40:'15 mm',  0x60:'20 mm',  0x80:'Average',  (D300)',  [Mask 0xe0]',  0x0:'6 mm',  0x20:'8 mm',  0x40:'10 mm',  0x60:'13 mm',  0x80:'Average'} },
			*/
			7.2: 'FineTuneOptCenterWeighted',
			8.1: 'FineTuneOptMatrixMetering',
			8.2: 'FineTuneOptSpotMetering',
			9.1: { value: 'MultiSelectorShootMode', _val: {0x0:'Select Center Focus Point',  0x40:'Highlight Active Focus Point',  0x80:'Not Used'} },
			9.2: { value: 'MultiSelectorPlaybackMode', _val: {0x0:'Thumbnail On/Off',  0x10:'View Histograms',  0x20:'Zoom On/Off',  0x30:'Choose Folder'} },
			/* TODO
			9.3: { value: 'InitialZoomSetting', _val: {(D3)',  [Mask 0x0c]',  0x0:'High Magnification',  0x4:'Medium Magnification',  0x8:'Low Magnification',  (D300)',  [Mask 0x0c]',  0x0:'Low Magnification',  0x4:'Medium Magnification',  0x8:'High Magnification'} },
			*/
			9.4: { value: 'MultiSelector', _val: {0x0:'Do Nothing',  0x1:'Reset Meter-off Delay'} },
			10.1: { value: 'ExposureDelayMode', _val: {0x0:'Off',  0x40:'On'} },
			10.2: 'CLModeShootingSpeed',
			10.3: { value: 'CHModeShootingSpeed', _val: {0x0:'9 fps',  0x10:'10 fps',  0x20:'11 fps'} },
			12.1: { value: 'ReverseIndicators', _val: {0x0:'+ 0 -',  0x20:'- 0 +'} },
			/* TODO
			12.2: { value: 'FileNumberSequence', _val: {(D3)',  [Mask 0x02]',  0x0:'On',  0x2:'Off',  (D300)',  [Mask 0x08]',  0x0:'On',  0x8:'Off'} },
			*/
			12.3: { value: 'RearDisplay', _val: {0x0:'ISO',  0x80:'Exposures Remaining'} },
			12.4: { value: 'ViewfinderDisplay', _val: {0x0:'Frame Count',  0x40:'Exposures Remaining'} },
			12.5: { value: 'BatteryOrder', _val: {0x0:'MB-D10 First',  0x4:'Camera Battery First'} },
			12.6: { value: 'MB-D10Batteries', _val: {0x0:'LR6 (AA alkaline)',  0x1:'HR6 (AA Ni-MH)',  0x2:'FR6 (AA lithium)',  0x3:'ZR6 (AA Ni-Mn)'} },
			12.7: { value: 'ScreenTips', _val: {0x0:'On',  0x10:'Off'} },
			13.1: { value: 'Beep', _val: {0x0:'High',  0x40:'Low',  0x80:'Off'} },
			13.2: { value: 'ShootingInfoDisplay', _val: {0x0:'Auto',  0x10:'Auto',  0x20:'Manual (dark on light)',  0x30:'Manual (light on dark)'} },
			13.3: { value: 'GridDisplay', _val: {0x0:'Off',  0x2:'On'} },
			13.4: { value: 'ViewfinderWarning', _val: {0x0:'On',  0x1:'Off'} },
			13.5: { value: 'MultiSelectorPlaybackMode', _val: {0x0:'Thumbnail On/Off',  0x1:'View Histograms',  0x2:'Zoom On/Off'} },
			17.1: { value: 'CommandDialsReverseRotation', _val: {0x0:'No',  0x80:'Yes'} },
			17.2: { value: 'CommandDialsChangeMainSub', _val: {0x0:'Off',  0x40:'On'} },
			17.3: { value: 'CommandDialsApertureSetting', _val: {0x0:'Sub-command Dial',  0x20:'Aperture Ring'} },
			17.4: { value: 'CommandDialsMenuAndPlayback', _val: {0x0:'Off',  0x10:'On'} },
			17.5: { value: 'LCDIllumination', _val: {0x0:'Off',  0x8:'On'} },
			17.6: { value: 'PhotoInfoPlayback', _val: {0x0:'Info Up-down, Playback Left-right',  0x4:'Info Left-right, Playback Up-down'} },
			17.7: { value: 'ShutterReleaseButtonAE-L', _val: {0x0:'Off',  0x2:'On'} },
			17.8: { value: 'ReleaseButtonToUseDial', _val: {0x0:'No',  0x1:'Yes'} },
			18.1: { value: 'SelfTimerTime', _val: {0x0:'2 s',  0x8:'5 s',  0x10:'10 s',  0x18:'20 s'} },
			18.2: { value: 'MonitorOffTime', _val: {0x0:'10 s',  0x1:'20 s',  0x2:'1 min',  0x3:'5 min',  0x4:'10 min'} },
			/*
			0x0 = 1/250 s (auto FP)\n  0x20 = 1/250 s\n  0x40 = 1/200 s\n  0x60 = 1/160 s': '',
			0x0 = 1/60 s\n  0x1 = 1/30 s\n  0x2 = 1/15 s\n  0x3 = 1/8 s\n  0x4 = 1/4 s\n  0x5 = 1/2 s': '',
			*/
			21.1: { value: 'AutoBracketSet', _val: {0x0:'AE & Flash',  0x40:'AE Only',  0x80:'Flash Only',  0xc0:'WB Bracketing'} },
			21.2: { value: 'AutoBracketModeM', _val: {0x0:'Flash/Speed',  0x10:'Flash/Speed/Aperture',  0x20:'Flash/Aperture',  0x30:'Flash Only'} },
			21.3: { value: 'AutoBracketOrder', _val: {0x0:'0,-,+',  0x8:'-,0,+'} },
			21.4: { value: 'ModelingFlash', _val: {0x0:'On',  0x1:'Off'} },
			22.1: { value: 'NoMemoryCard', _val: {0x0:'Release Locked',  0x80:'Enable Release'} },
			/*
			0x0 = 4 s\n  0x1 = 6 s\n  0x2 = 8 s\n  0x3 = 16 s\n  0x4 = 30 s': '',
			*/
			23.1: { value: 'InternalFlash', _val: {0x0:'TTL',  0x40:'Manual',  0x80:'Repeating Flash',  0xc0:'Commander Mode'} } 
		},
		D700: { 
			0.1: { value: 'CustomSettingsBank', _val: {0x0:'A',  0x1:'B',  0x2:'C',  0x3:'D'} },
			0.2: { value: 'CustomSettingsAllDefault', _val: {0x0:'Yes',  0x80:'No'} },
			1.1: { value: 'AF-CPrioritySelection', _val: {0x0:'Release',  0x40:'Release + Focus',  0x80:'Focus'} },
			1.2: { value: 'AF-SPrioritySelection', _val: {0x0:'Focus',  0x20:'Release'} },
			1.3: { value: 'AFPointSelection', _val: {0x0:'51 Points',  0x10:'11 Points'} },
			1.4: { value: 'DynamicAFArea', _val: {0x0:'9 Points',  0x4:'21 Points',  0x8:'51 Points',  0xc:'51 Points (3D-tracking)'} },
			2.1: { value: 'AFActivation', _val: {0x0:'Shutter/AF-On',  0x80:'AF-On Only'} },
			2.2: { value: 'FocusPointWrap', _val: {0x0:'No Wrap',  0x8:'Wrap'} },
			2.3: { value: 'AFPointIllumination', _val: {0x0:'Auto',  0x2:'Off',  0x4:'On'} },
			2.4: { value: 'AFAssist', _val: {0x0:'On',  0x1:'Off'} },
			/* 0x0 = 3 Normal\n  0x1 = 4\n  0x2 = 5 Long': '', */
			4.1: { value: 'ISOStepSize', _val: {0x0:'1/3 EV',  0x40:'1/2 EV',  0x80:'1 EV'} },
			4.2: { value: 'ExposureControlStepSize', _val: {0x0:'1/3 EV',  0x10:'1/2 EV',  0x20:'1 EV'} },
			4.3: { value: 'ExposureCompStepSize', _val: {0x0:'1/3 EV',  0x4:'1/2 EV',  0x8:'1 EV'} },
			4.4: { value: 'EasyExposureCompensation', _val: {0x0:'Off',  0x1:'On',  0x2:'On (auto reset)'} },
			5.1: { value: 'CenterWeightedAreaSize', _val: {0x0:'8 mm',  0x10:'12 mm',  0x20:'15 mm',  0x30:'20 mm',  0x40:'Average'} },
			6.1: 'FineTuneOptMatrixMetering',
			6.2: 'FineTuneOptSpotMetering',
			7.1: { value: 'ShutterReleaseButtonAE-L', _val: {0x0:'Off',  0x80:'On'} },
			7.2: { value: 'SelfTimerTime', _val: {0x0:'2 s',  0x10:'5 s',  0x20:'10 s',  0x30:'20 s'} },
			/*
			0x0 = 4 s\n  0x1 = 6 s\n  0x2 = 8 s\n  0x3 = 16 s\n  0x4 = 30 s': '',
			0x0 = 4 s\n  0x8 = 10 s\n  0x10 = 20 s': '',
			0x0 = 4 s\n  0x1 = 10 s\n  0x2 = 20 s': '',
			*/
			10.1: { value: 'Beep', _val: {0x0:'High',  0x40:'Low',  0x80:'Off'} },
			10.2: { value: 'ShootingInfoDisplay', _val: {0x0:'Auto',  0x10:'Auto',  0x20:'Manual (dark on light)',  0x30:'Manual (light on dark)'} },
			10.3: { value: 'LCDIllumination', _val: {0x0:'Off',  0x8:'On'} },
			10.4: { value: 'ExposureDelayMode', _val: {0x0:'Off',  0x4:'On'} },
			10.5: { value: 'GridDisplay', _val: {0x0:'Off',  0x2:'On'} },
			11.1: { value: 'FileNumberSequence', _val: {0x0:'On',  0x40:'Off'} },
			11.2: 'CLModeShootingSpeed',
			12: 'MaxContinuousRelease',
			13.1: { value: 'ScreenTips', _val: {0x0:'Off',  0x8:'On'} },
			13.2: { value: 'BatteryOrder', _val: {0x0:'MB-D10 First',  0x4:'Camera Battery First'} },
			13.3: { value: 'MB-D10BatteryType', _val: {0x0:'LR6 (AA alkaline)',  0x1:'HR6 (AA Ni-MH)',  0x2:'FR6 (AA lithium)',  0x3:'ZR6 (AA Ni-Mn)'} },
			/* 0x0 = 1/60 s\n  0x1 = 1/30 s\n  0x2 = 1/15 s\n  0x3 = 1/8 s\n  0x4 = 1/4 s\n  0x5 = 1/2 s': '', */
			16.1: { value: 'FlashControlBuilt-in', _val: {0x0:'TTL',  0x40:'Manual',  0x80:'Repeating Flash',  0xc0:'Commander Mode'} },
			16.2: 'ManualFlashOutput',
			17.1: 'RepeatingFlashOutput',
			17.2: 'RepeatingFlashCount',
			18.1: 'RepeatingFlashRate',
			18.2: { value: 'CommanderInternalTTLChannel', _val: {0x0:'1 ch',  0x1:'2 ch',  0x2:'3 ch',  0x3:'4 ch'} },
			20.1: 'CommanderInternalTTLCompBuiltin',
			21.1: 'CommanderInternalTTLCompGroupA',
			22.1: 'CommanderInternalTTLCompGroupB',
			26.1: { value: 'AutoBracketSet', _val: {0x0:'AE & Flash',  0x40:'AE Only',  0x80:'Flash Only',  0xc0:'WB Bracketing'} },
			26.2: { value: 'AutoBracketModeM', _val: {0x0:'Flash/Speed',  0x10:'Flash/Speed/Aperture',  0x20:'Flash/Aperture',  0x30:'Flash Only'} },
			26.3: { value: 'AutoBracketOrder', _val: {0x0:'0,-,+',  0x8:'-,0,+'} },
			26.4: { value: 'ModelingFlash', _val: {0x0:'On',  0x1:'Off'} },
			27.1: { value: 'MultiSelectorShootMode', _val: {0x0:'Select Center Focus Point',  0x40:'Highlight Active Focus Point',  0x80:'Not Used'} },
			27.2: { value: 'MultiSelectorPlaybackMode', _val: {0x0:'Thumbnail On/Off',  0x10:'View Histograms',  0x20:'Zoom On/Off',  0x30:'Choose Folder'} },
			27.3: { value: 'InitialZoomSetting', _val: {0x0:'Low Magnification',  0x4:'Medium Magnification',  0x8:'High Magnification'} },
			27.4: { value: 'MultiSelector', _val: {0x0:'Do Nothing',  0x1:'Reset Meter-off Delay'} },
			33.1: { value: 'CommandDialsReverseRotation', _val: {0x0:'No',  0x80:'Yes'} },
			33.2: { value: 'CommandDialsChangeMainSub', _val: {0x0:'Off',  0x40:'On'} },
			33.3: { value: 'CommandDialsApertureSetting', _val: {0x0:'Sub-command Dial',  0x20:'Aperture Ring'} },
			33.4: { value: 'CommandDialsMenuAndPlayback', _val: {0x0:'Off',  0x10:'On'} },
			33.5: { value: 'ReverseIndicators', _val: {0x0:'+ 0 -',  0x8:'- 0 +'} },
			33.6: { value: 'PhotoInfoPlayback', _val: {0x0:'Off',  0x4:'On'} },
			33.7: { value: 'NoMemoryCard', _val: {0x0:'Release Locked',  0x2:'Enable Release'} },
			33.8: { value: 'ReleaseButtonToUseDial', _val: {0x0:'No',  0x1:'Yes'} } },
		D800: { 
			12.1: { value: 'AutoBracketingSet', _val: {0x0:'AE & Flash',  0x20:'AE Only',  0x40:'Flash Only',  0x60:'WB Bracketing',  0x80:'Active D-Lighting'} },
			12.2: { value: 'AutoBracketOrder', _val: {0x0:'0,-,+',  0x10:'-,0,+'} },
			12.3: { value: 'AutoBracketingMode', _val: {0x0:'Flash/Speed',  0x4:'Flash/Speed/Aperture',  0x8:'Flash/Aperture',  0xc:'Flash Only'} },
			/* 0x0 = 1/60 s\n  0x1 = 1/30 s\n  0x2 = 1/15 s\n  0x3 = 1/8 s\n  0x4 = 1/4 s\n  0x5 = 1/2 s': '', */
			23.1: { value: 'FlashControlBuilt-in', _val: {0x0:'TTL',  0x40:'Manual',  0x80:'Repeating Flash',  0xc0:'Commander Mode'} },
			23.2: 'ManualFlashOutput',
			24.1: 'RepeatingFlashOutput',
			24.2: 'RepeatingFlashCount',
			25.1: 'RepeatingFlashRate',
			25.2: 'CommanderChannel',
			27.1: { value: 'CommanderInternalFlash', _val: {0x0:'TTL',  0x40:'Manual',  0x80:'Off'} },
			27.2: 'CommanderInternalManualOutput',
			28.1: { value: 'CommanderGroupAMode', _val: {0x0:'TTL',  0x40:'Auto Aperture',  0x80:'Manual',  0xc0:'Off'} },
			28.2: 'CommanderGroupAManualOutput',
			29.1: { value: 'CommanderGroupBMode', _val: {0x0:'TTL',  0x40:'Auto Aperture',  0x80:'Manual',  0xc0:'Off'} },
			29.2: 'CommanderGroupBManualOutput',
			30.1: { value: 'ModelingFlash', _val: {0x0:'On',  0x20:'Off'} },
			30.2: 'CommanderInternalTTLComp',
			31.1: 'CommanderGroupA_TTL-AAComp',
			32.1: 'CommanderGroupB_TTL-AAComp' 
		},
		D5000: { 
			0.1: { value: 'AFAreaModeSetting', _val: {0x0:'Single Area',  0x20:'Dynamic Area',  0x40:'Auto-area',  0x60:'3D-tracking (11 points)'} },
			0.2: { value: 'AFAssist', _val: {0x0:'On',  0x1:'Off'} },
			2.1: { value: 'Beep', _val: {0x0:'Off',  0x40:'Low',  0x80:'High'} },
			2.2: { value: 'GridDisplay', _val: {0x0:'On',  0x2:'Off'} },
			2.3: { value: 'ISODisplay', _val: {0x0:'On',  0x8:'Off'} },
			2.4: { value: 'NoMemoryCard', _val: {0x0:'Release Locked',  0x20:'Enable Release'} },
			3.1: { value: 'FileNumberSequence', _val: {0x0:'On',  0x8:'Off'} },
			4.1: { value: 'RangeFinder', _val: {0x0:'Off',  0x10:'On'} },
			4.2: { value: 'DateImprint', _val: {0x0:'Off',  0x8:'On'} },
			4.3: { value: 'ReverseIndicators', _val: {0x0:'+ 0 -',  0x80:'- 0 +'} },
			5.1: { value: 'EVStepSize', _val: {0x0:'1/3 EV',  0x40:'1/2 EV'} },
			9.1: { value: 'ExposureDelayMode', _val: {0x0:'Off',  0x40:'On'} },
			11.1: { value: 'AutoBracketSet', _val: {0x0:'Exposure',  0x40:'Active D-Lighting',  0x80:'WB Bracketing'} },
			15.1: { value: 'AELockButton', _val: {0x0:'AE/AF Lock',  0x8:'AE Lock Only',  0x10:'AF Lock Only',  0x18:'AE Lock (hold)',  0x20:'AF-ON'} },
			16.1: { value: 'ShutterReleaseButtonAE-L', _val: {0x0:'Off',  0x2:'On'} },
			16.2: { value: 'CommandDialsReverseRotation', _val: {0x0:'No',  0x80:'Yes'} },
			17.1: { value: 'MeteringTime', _val: {0x0:'4 s',  0x10:'8 s',  0x20:'20 s',  0x30:'1 min',  0x40:'30 min'} },
			17.2: { value: 'RemoteOnDuration', _val: {0x0:'1 min',  0x1:'5 min',  0x2:'10 min',  0x3:'15 min'} },
			18.1: { value: 'SelfTimerTime', _val: {0x0:'2 s',  0x40:'5 s',  0x80:'10 s',  0xc0:'20 s'} },
			18.2: 'SelfTimerShotCount',
			19.1: { value: 'ImageReviewTime', _val: {0x0:'4 s',  0x20:'8 s',  0x40:'20 s',  0x60:'1 min',  0x80:'10 min'} },
			20.1: { value: 'PlaybackMenusTime', _val: {0x0:'8 s',  0x20:'12 s',  0x40:'20 s',  0x60:'1 min',  0x80:'10 min'} },
			22.1: { value: 'InternalFlash', _val: {0x0:'TTL',  0x40:'Manual'} },
			22.2: 'ManualFlashOutput',
			32.1: { value: 'LiveViewAF', _val: {0x0:'Face Priority',  0x20:'Wide Area',  0x40:'Normal Area',  0x60:'Subject Tracking'} } },
		D5100: { 0.1: { value: 'AF-CPrioritySelection', _val: {0x0:'Release',  0x80:'Focus'} },
			1.1: { value: 'AFAssist', _val: {0x0:'On',  0x1:'Off'} },
			3.1: { value: 'Beep', _val: {0x0:'Off',  0x40:'Low',  0x80:'High'} },
			3.2: { value: 'NoMemoryCard', _val: {0x0:'Release Locked',  0x20:'Enable Release'} },
			3.3: { value: 'ISODisplay', _val: {0x0:'On',  0x8:'Off'} },
			4.1: { value: 'FileNumberSequence', _val: {0x0:'On',  0x8:'Off'} },
			5.1: { value: 'RangeFinder', _val: {0x0:'Off',  0x10:'On'} },
			5.2: { value: 'ReverseIndicators', _val: {0x0:'+ 0 -',  0x80:'- 0 +'} },
			6.1: { value: 'EVStepSize', _val: {0x0:'1/3 EV',  0x40:'1/2 EV'} },
			10.1: { value: 'ExposureDelayMode', _val: {0x0:'Off',  0x40:'On'} },
			12.1: { value: 'AutoBracketSet', _val: {0x0:'Exposure',  0x40:'WB Bracketing',  0x80:'Active D-Lighting'} },
			16.1: { value: 'AELockButton', _val: {0x0:'AE/AF Lock',  0x8:'AE Lock Only',  0x10:'AF Lock Only',  0x18:'AE Lock (hold)',  0x20:'AF-ON'} },
			17.1: { value: 'ShutterReleaseButtonAE-L', _val: {0x0:'Off',  0x2:'On'} },
			17.2: { value: 'CommandDialsReverseRotation', _val: {0x0:'No',  0x80:'Yes'} },
			18.1: { value: 'MeteringTime', _val: {0x0:'4 s',  0x10:'8 s',  0x20:'20 s',  0x30:'1 min',  0x40:'30 min'} },
			18.2: { value: 'RemoteOnDuration', _val: {0x0:'1 min',  0x1:'5 min',  0x2:'10 min',  0x3:'20 min'} },
			19.1: { value: 'SelfTimerTime', _val: {0x0:'2 s',  0x40:'5 s',  0x80:'10 s',  0xc0:'20 s'} },
			19.2: 'SelfTimerShotCount',
			20.1: { value: 'ImageReviewTime', _val: {0x0:'4 s',  0x20:'8 s',  0x40:'20 s',  0x60:'1 min',  0x80:'10 min'} },
			/* 0x0 = 3 min\n  0x4 = 5 min\n  0x8 = 10 min': '', */
			21.1: { value: 'PlaybackMenusTime', _val: {0x0:'8 s',  0x20:'12 s',  0x40:'20 s',  0x60:'1 min',  0x80:'10 min'} },
			23.1: 'ManualFlashOutput' 
		},
		D5200: { 
			0.1: { value: 'AF-CPrioritySelection', _val: {0x0:'Release',  0x80:'Focus'} },
			0.2: { value: 'NumberOfFocusPoints', _val: {0x0:'39 Points',  0x10:'11 Points'} },
			1.1: { value: 'AFAssist', _val: {0x0:'On',  0x1:'Off'} },
			3.1: { value: 'Beep', _val: {0x0:'Off',  0x40:'Low',  0x80:'High'} },
			3.2: { value: 'NoMemoryCard', _val: {0x0:'Release Locked',  0x20:'Enable Release'} },
			3.3: { value: 'ISODisplay', _val: {0x0:'On',  0x8:'Off'} },
			4.1: { value: 'FileNumberSequence', _val: {0x0:'On',  0x8:'Off'} },
			5.1: { value: 'RangeFinder', _val: {0x0:'Off',  0x4:'On'} },
			5.2: { value: 'ReverseExposureCompDial', _val: {0x0:'No',  0x10:'Yes'} },
			5.3: { value: 'ReverseShutterSpeedAperture', _val: {0x0:'No',  0x8:'Yes'} },
			5.4: { value: 'ReverseIndicators', _val: {0x0:'+ 0 -',  0x80:'- 0 +'} },
			6.1: { value: 'EVStepSize', _val: {0x0:'1/3 EV',  0x40:'1/2 EV'} },
			10.1: { value: 'ExposureDelayMode', _val: {0x0:'Off',  0x40:'On'} },
			12.1: { value: 'AutoBracketSet', _val: {0x0:'Exposure',  0x40:'WB Bracketing',  0x80:'Active D-Lighting'} },
			16.1: { value: 'AELockButton', _val: {0x3:'AE/AF Lock',  0x4:'AE Lock Only',  0x6:'AE Lock (hold)',  0x7:'AF Lock Only',  0x8:'AF-ON'} },
			17.1: { value: 'ShutterReleaseButtonAE-L', _val: {0x0:'Off',  0x2:'On'} },
			18.1: { value: 'StandbyTimer', _val: {0x0:'4 s',  0x20:'8 s',  0x40:'20 s',  0x60:'1 min',  0x80:'30 min'} },
			18.2: { value: 'RemoteOnDuration', _val: {0x0:'1 min',  0x1:'5 min',  0x2:'10 min',  0x3:'15 min'} },
			19.1: { value: 'SelfTimerTime', _val: {0x0:'2 s',  0x40:'5 s',  0x80:'10 s',  0xc0:'20 s'} },
			19.2: 'SelfTimerShotCount',
			20.1: { value: 'ImageReviewTime', _val: {0x20:'4 s',  0x40:'8 s',  0x80:'20 s',  0xa0:'1 min',  0xe0:'10 min'} },
			20.2: { value: 'LiveViewMonitorOffTime', _val: {0x4:'5 min',  0x8:'10 min',  0xc:'15 min',  0x10:'20 min',  0x14:'30 min'} },
			21.1: { value: 'PlaybackMenusTime', _val: {0x20:'8 s',  0x80:'20 s',  0xa0:'1 min',  0xc0:'5 min',  0xe0:'10 min'} },
			23.1: { value: 'InternalFlash', _val: {0x0:'TTL',  0x40:'Manual'} },
			23.2: 'ManualFlashOutput' 
		},
		D7000: { 11: 'MaxContinuousRelease',
			0.1: { value: 'AF-CPrioritySelection', _val: {0x0:'Release',  0x80:'Focus'} },
			0.2: { value: 'AF-SPrioritySelection', _val: {0x0:'Focus',  0x20:'Release'} },
			0.3: { value: 'NumberOfFocusPoints', _val: {0x0:'39 Points',  0x10:'11 Points'} },
			/* 0x0 = Off\n  0x1 = 1 Short\n  0x2 = 2: '', */
			1.2: { value: 'FocusPointWrap', _val: {0x0:'No Wrap',  0x8:'Wrap'} },
			1.3: { value: 'AFPointIllumination', _val: {0x0:'Auto',  0x2:'On',  0x4:'Off'} },
			1.4: { value: 'AFAssist', _val: {0x0:'On',  0x1:'Off'} },
			2.1: { value: 'BatteryOrder', _val: {0x0:'MB-D11 First',  0x40:'Camera Battery First'} },
			2.3: { value: 'MB-D11BatteryType', _val: {0x0:'LR6 (AA alkaline)',  0x1:'Ni-MH (AA Ni-MH)',  0x2:'FR6 (AA lithium)'} },
			3.1: { value: 'BeepPitch', _val: {0x0:'Off',  0x40:'Low',  0x80:'High'} },
			3.2: { value: 'NoMemoryCard', _val: {0x0:'Release Locked',  0x20:'Enable Release'} },
			3.3: { value: 'ISODisplay', _val: {0x0:'Show ISO/Easy ISO',  0x4:'Show ISO Sensitivity',  0xc:'Show Frame Count'} },
			3.4: { value: 'GridDisplay', _val: {0x0:'On',  0x2:'Off'} },
			3.5: { value: 'ViewfinderWarning', _val: {0x0:'On',  0x1:'Off'} },
			4.1: { value: 'ShootingInfoDisplay', _val: {0x0:'Auto',  0x80:'Manual (dark on light)',  0xc0:'Manual (light on dark)'} },
			4.2: { value: 'LCDIllumination', _val: {0x0:'Off',  0x20:'On'} },
			4.3: { value: 'FileNumberSequence', _val: {0x0:'On',  0x8:'Off'} },
			4.4: { value: 'ScreenTips', _val: {0x0:'Off',  0x4:'On'} },
			4.5: { value: 'BeepVolume', _val: {0x0:'Off',  0x1:'1',  0x2:'2',  0x3:'3'} },
			5.1: { value: 'ReverseIndicators', _val: {0x0:'+ 0 -',  0x80:'- 0 +'} },
			5.2: { value: 'EasyExposureCompensation', _val: {0x0:'Off',  0x1:'On',  0x2:'On Auto Reset'} },
			6.1: { value: 'ExposureControlStep', _val: {0x0:'1/3 EV',  0x40:'1/2 EV'} },
			6.2: { value: 'ISOSensitivityStep', _val: {0x0:'1/3 EV',  0x10:'1/2 EV'} },
			7.1: { value: 'CenterWeightedAreaSize', _val: {0x0:'6 mm',  0x20:'8 mm',  0x40:'10 mm',  0x60:'13 mm',  0x80:'Average'} },
			10.1: { value: 'ExposureDelayMode', _val: {0x0:'Off',  0x40:'On'} },
			10.2: 'CLModeShootingSpeed',
			12.1: { value: 'AutoBracketSet', _val: {0x0:'AE & Flash',  0x20:'AE Only',  0x40:'Flash Only',  0x60:'WB Bracketing',  0x80:'Active D-Lighting'} },
			12.2: { value: 'AutoBracketOrder', _val: {0x0:'0,-,+',  0x10:'-,0,+'} },
			15.1: { value: 'OKButton', _val: {0x0:'Off',  0x8:'Select Center Focus Point',  0x10:'Highlight Active Focus Point',  0x18:'Not Used'} },
			/* 0x0 = AE/AF Lock\n  0x8 = AE Lock Only\n  0x10 = AF Lock Only': '', */
			17.1: { value: 'CommandDialsReverseRotation', _val: {0x0:'No',  0x80:'Yes'} },
			17.2: { value: 'CommandDialsChangeMainSub', _val: {0x0:'Off',  0x20:'On',  0x40:'On (A mode only)'} },
			17.3: { value: 'CommandDialsApertureSetting', _val: {0x0:'Sub-command Dial',  0x4:'Aperture Ring'} },
			17.4: { value: 'CommandDialsMenuAndPlayback', _val: {0x0:'On',  0x8:'Off',  0x10:'On (Image Review Exclude)'} },
			17.5: { value: 'ShutterReleaseButtonAE-L', _val: {0x0:'Off',  0x2:'On'} },
			17.6: { value: 'ReleaseButtonToUseDial', _val: {0x0:'No',  0x1:'Yes'} },
			/* 0x0 = 4 s\n  0x10 = 6 s\n  0x20 = 8 s\n  0x30 = 16 s\n  0x40 = 30 s': '', */
			18.2: { value: 'RemoteOnDuration', _val: {0x0:'1 min',  0x1:'5 min',  0x2:'10 min',  0x3:'15 min'} },
			19.1: { value: 'SelfTimerTime', _val: {0x0:'2 s',  0x40:'5 s',  0x80:'10 s',  0xc0:'20 s'} },
			19.2: { value: 'SelfTimerInterval', _val: {0x0:'0.5 s',  0x10:'1 s',  0x20:'2 s',  0x30:'3 s'} },
			19.3: 'SelfTimerShotCount',
			/*
			0x0 = 4 s\n  0x20 = 10 s\n  0x40 = 20 s': '',
			0x0 = 4 s\n  0x4 = 10 s\n  0x8 = 20 s': '',
			0x0 = 1/60 s\n  0x1 = 1/30 s\n  0x2 = 1/15 s\n  0x3 = 1/8 s\n  0x4 = 1/4 s\n  0x5 = 1/2 s': '',
			*/
			23.1: { value: 'FlashControlBuilt-in', _val: {0x0:'TTL',  0x40:'Manual',  0x80:'Repeating Flash',  0xc0:'Commander Mode'} },
			23.2: 'ManualFlashOutput',
			24.1: 'RepeatingFlashOutput',
			24.2: 'RepeatingFlashCount',
			25.1: 'RepeatingFlashRate',
			26.1: 'CommanderInternalTTLCompBuiltin',
			27.1: 'CommanderInternalTTLCompGroupA',
			28.1: 'CommanderInternalTTLCompGroupB',
			30.1: { value: 'FlashWarning', _val: {0x0:'On',  0x80:'Off'} },
			30.2: { value: 'ModelingFlash', _val: {0x0:'On',  0x20:'Off'} },
			34.1: { value: 'LiveViewAFAreaMode', _val: {0x0:'Face-Priority',  0x20:'NormalArea',  0x40:'WideArea',  0x60:'SubjectTracking'} },
			34.2: { value: 'LiveViewAFMode', _val: {0x0:'AF-C',  0x2:'AF-F'} } 
		} 
	}
};