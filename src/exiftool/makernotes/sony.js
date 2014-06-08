// exiftool.js/makernotes/sony

// summary:
//    Makernotes for the following Makes :
//    'Sony'

// description:
//    ported from http://www.sno.phy.queensu.ca/~phil/exiftool/TagNames/Sony.html

// returns:
//    a makernote object for exiftool.js and redaktor/meta

/* TODO / FIXME
1) reading IFDs binary

2) "2010 tags" - what do they mean - how to encrypt - see bottom for reference

3) different infos for raws (SR2+ARW): HeaderSize 0 :
{
	Name: 'MakerNoteSony5', // used in SR2 and ARW images
	Condition: '$$self{Make}=~/^SONY/ and $$valPt!~/^\x01\x00/',
	SubDirectory: {
		TagTable: 'Image::ExifTool::Sony::Main',
		Start: '$valuePtr',
		ByteOrder: 'Unknown',
	},
}

*/

var MainRef = require('../exif').ref;
var Minolta = require('./minolta');

exports.info = {
	DefaultHeaderSize : 12,
	MakerNoteByteAlignHeaderOffset : 0, // offset from start of header in which
	// to find the byte align code (0x4949 or 0x4D4D)
};
exports.tags = {
	0x0010: '_IFDpointer_CameraInfo',
	0x0114: '_IFDpointer_CameraSettings',
	0x0020: '_IFDpointer_FocusAndMoreInfo',
	0x3000: '_IFDpointer_ShotInfo',
	
	0x0000: 'MakerNoteVersion',
	0x0102: 'Quality',
	0x0104: 'FlashExposureComp', 
	0x0105: 'Teleconverter',
	0x0112: 'WhiteBalanceFineTune',
	0x0115: 'WhiteBalance',
	0x0116: 'ExtraInfo',
	0x0e00: 'PrintIM',
	0x1000: 'MultiBurstMode',
	0x1001: 'MultiBurstImageWidth',
	0x1002: 'MultiBurstImageHeight',
	0x1003: 'Panorama',
	0x2001: 'PreviewImage',
	0x2002: 'Rating',
	0x2004: 'Contrast',
	0x2005: 'Saturation',
	0x2006: 'Sharpness',
	0x2007: 'Brightness',
	0x2008: 'LongExposureNoiseReduction',
	0x2009: 'HighISONoiseReduction',
	0x200a: 'HDR',
	0x200b: 'MultiFrameNoiseReduction',
	0x200e: 'PictureEffect',
	0x200f: 'SoftSkinEffect',
	0x2010: 'Tags2010', /* TODO 2010 */
	0x2011: 'VignettingCorrection',
	0x2012: 'LateralChromaticAberration',
	0x2013: 'DistortionCorrection',
	0x2014: 'WBShiftAB_GM',
	0x2016: 'AutoPortraitFramed',
	0x201b: 'FocusMode',
	0x201c: 'AFAreaModeSetting',
	0x201d: 'FlexibleSpotPosition',
	0x201e: 'AFPointSelected',
	0x2020: 'AFInfo2',
	
	0x900b: 'Tag900b',
	0x9050: 'Tag9050',
	0x9400: 'Tag9400',
	0x9401: '__1',
	0x9402: 'Tag9402',
	0x9403: 'Tag9403',
	0x9404: '__4',
	0x9405: 'Tag9405a',
	0x9406: 'Tag9406',
	0x9407: '__7',
	0x9408: '__8',
	0x9409: '__9',
	0x940a: 'Tag940a',
	0x940b: 'Tag940b',
	0x940c: 'Tag940c',
	0x940d: 'Tag940d',
	0x940e: 'AFInfo',
	0x940f: 'Tag940f',
	0x9411: 'Tag9411',
	0xb000: 'FileFormat',
	0xb001: 'ModelID',
	0xb020: 'CreativeStyle',
	0xb021: 'ColorTemperature',
	0xb022: 'ColorCompensationFilter',
	0xb023: 'SceneMode',
	0xb024: 'ZoneMatching',
	0xb025: 'DynamicRangeOptimizer',
	0xb026: 'ImageStabilization',
	0xb027: 'LensType',
	0xb028: 'MinoltaMakerNote',
	0xb029: 'ColorMode',
	0xb02a: 'LensSpec',
	0xb02b: 'FullImageSize',
	0xb02c: 'PreviewImageSize',
	0xb040: 'Macro',
	0xb041: 'ExposureMode',
	0xb042: 'FocusMode',
	0xb043: 'AFAreaMode',
	0xb044: 'AFIlluminator',
	0xb047: 'JPEGQuality',
	0xb048: 'FlashLevel',
	0xb049: 'ReleaseMode',
	0xb04a: 'SequenceNumber',
	0xb04b: 'Anti-Blur',
	0xb04e: 'FocusMode',
	0xb04f: 'DynamicRangeOptimizer',
	0xb050: 'HighISONoiseReduction2',
	0xb052: 'IntelligentAuto',
	0xb054: 'WhiteBalance'
};

exports.ref = {
// TODO - IFDpointers	
	_IFDpointer_CameraInfo: {
			0x0000: 'LensSpec',
			0x0014: 'FocusModeSetting',
			0x0015: 'AFPointInFocus',
			0x0019: 'AFPoint',
			0x0130: 'AFMicroAdjValue',
			0x0131: 'AFMicroAdjMode'
			
	/*
	_IFDpointer_CameraInfo: function(arr, model){
		console.log( 'CameraInfo arr', arr );	
		console.log( 'CameraInfo m', model );
		return {
			0x0000: 'LensSpec',
			0x0014: 'FocusModeSetting',
			0x0015: 'AFPointInFocus',
			0x0019: 'AFPoint',
			0x0130: 'AFMicroAdjValue',
			0x0131: 'AFMicroAdjMode'
		};
		*/
		
		/* TODO
		[ //PH
			{
				Name: 'CameraInfo',
				// count: A33/A35/A55V/A450/A500/A550/A560/A580/NEX3/5/5C/C3/VG10E=15360
				Condition: '$count == 15360',
				SubDirectory: { TagTable: 'Image::ExifTool::Sony::CameraInfo' },
			},{
				Name: 'CameraInfo2',
				// count: A850/A900=5478, A200/A300/A350=5506, A230/A290/A330/A380/A390=6118, A700=368
				SubDirectory: { TagTable: 'Image::ExifTool::Sony::CameraInfo2' },
			}
		],
		*/
	},
	
	// for DSLR
	_IFDpointer_FocusAndMoreInfo: {
		0x0e: 'DriveMode2',
		0x10: 'Rotation',
		0x14: 'ImageStabilizationSetting',
		0x15: 'DynamicRangeOptimizerMode',
		0x2b: 'BracketShotNumber',
		0x2c: 'WhiteBalanceBracketing',
		0x2d: 'BracketShotNumber2',
		0x2e: 'DynamicRangeOptimizerBracket',
		0x2f: 'ExposureBracketShotNumber',
		0x3f: 'ExposureProgram',
		0x41: 'CreativeStyle',
		0x0846:'ShutterCount', 
		0x09bb: 'FocusPosition'
	},
	/* TODO
	FocusAndMoreInfo: function(arr, model){
		
		[ // not present for NEX-5C
			{
				Name: 'FocusInfo', //PH
				// count: A200/A230/A290/A300/A330/A350/A380/A390==19154, A700/A850/A900=19148
				Condition: '$count == 19154 or $count == 19148',
				SubDirectory: {
					TagTable: 'Image::ExifTool::Sony::FocusInfo',
					ByteOrder: 'LittleEndian',
				},
			},{
				Name: 'MoreInfo', //12
				// count: A450/A500/A550/A560/A580/A33/A35/A55/NEX-3/5/C3/VG10E==20480
				SubDirectory: {
					TagTable: 'Image::ExifTool::Sony::MoreInfo',
					ByteOrder: 'LittleEndian',
				},
			},
		],
		
		return {
		};
	},
	*/
	_IFDpointer_CameraSettings: {
		0: 	'ExposureTime',	 
		1:	'FNumber', 
		4:	'DriveMode'
	},
	// for SLT only
	AFInfo: {
		/* TODO ?
		// AFInfo (SLT models only) (ref PH, decoded mainly from A77)
		%Image::ExifTool::Sony::AFInfo = (
			PROCESS_PROC: \&ProcessEnciphered,
			WRITE_PROC: \&WriteEnciphered,
			CHECK_PROC: \&Image::ExifTool::CheckBinaryData,
			FORMAT: 'int8u',
			WRITABLE: 1,
			FIRST_ENTRY: 0,
			PRIORITY: 0,
			GROUPS: { 0: 'MakerNotes', 2: 'Camera' },
			DATAMEMBER: [ 0x02 ],
			NOTES: 'These tags are currently extracted for SLT models only.',
			// first 4 bytes (deciphered) (ref 12):
			// (perhaps 0x02 indicates the 15- or 19-point AF?)
			//   2 1 1 0  for A65V
			//   2 1 2 0  for A77V
			//   0 1 1 0  for A37, A57, A58
			//   0 1 2 0  for A99V
			//   0 0 0 0  for NEX
			//   2 0 0 0  for NEX
			//   0 2 0 0  for NEX with A-mount lens via LA-EA2 Phase-AF adapter
			//   2 2 0 0  for NEX with A-mount lens via LA-EA2 Phase-AF adapter
			0x02: {
				Name: 'AFType',
				RawConv: '$$self{AFType} = $val',
				PrintConv: {
					// 0: '?? n.a.', // seen on some A99V images with non-AF (Samyang) lens
					1: '15-point',
					2: '19-point',
				},
			},
			// 0x0004 start 74 Blocks of 164 bytes each for NEX with LA-EA2 15-point Phase-detect AF adapter and A-Mount lens (ref 12).
			// For the NEX probably only the 11th byte might be the AFPoint.
			0x07: [ // the active AF sensor
				{
					Name: 'AFPoint',
					Condition: '$$self{AFType} == 1',
					Notes: 'models with 15-point AF',
					PrintConvColumns: 2,
					PrintConv: \%afPoint15,
				},{
					Name: 'AFPoint',
					Condition: '$$self{AFType} == 2',
					Notes: 'models with 19-point AF',
					PrintConvColumns: 2,
					PrintConv: \%afPoint19,
				},
			],
			0x08: [ // the AF sensor in focus at focus time (shutter release half press)
				{
					Name: 'AFPointInFocus',
					Condition: '$$self{AFType} == 1',
					Notes: 'models with 15-point AF',
					PrintConvColumns: 2,
					PrintConv: {
						%afPoint15,
						255: '(none)',
					},
				},{
					Name: 'AFPointInFocus',
					Condition: '$$self{AFType} == 2',
					Notes: 'models with 19-point AF',
					PrintConvColumns: 2,
					PrintConv: {
						%afPoint19,
						255: '(none)',
					},
				},
			],
			0x09: [ // the AF sensor in focus at shutter release (shutter release full press)
				{
					Name: 'AFPointAtShutterRelease',
					Condition: '$$self{AFType} == 1',
					Notes: 'models with 15-point AF',
					PrintConvColumns: 2,
					PrintConv: {
						%afPoint15,
						30: '(out of focus)',
					},
				},{
					Name: 'AFPointAtShutterRelease',
					Condition: '$$self{AFType} == 2',
					Notes: 'models with 19-point AF',
					PrintConvColumns: 2,
					PrintConv: {
						%afPoint19,
						30: '(out of focus)',
					},
				},
			],
			0x0a: {
				Name: 'AFAreaMode',
				PrintConv: {
					0: 'Wide',
					1: 'Spot',
					2: 'Local',
					3: 'Zone',
				},
			},
			0x0b: {
				Name: 'FocusMode',
				PrintConvColumns: 2,
				// validated for A77 firmware 1.03, 1.04 and 1.07 and A99
				// - not confirmed for A37,A57 and A65 which also write this tag
				PrintConv: {
					0: 'Manual',
					2: 'AF-S',
					3: 'AF-C',
					4: 'AF-A',
					6: 'DMF',
					7: 'AF-D', // (unique to A99)
				},
			},
			0x017d: { //PH (verified for the A77/A99; likely valid for other SLT models - ref 12)
				// (different from AFMicroAdjValue because it is 0 when the adjustment is off)
				Name: 'AFMicroAdj',
				Format: 'int8s',
			},
			0x017e: { //12
				Name: 'ExposureProgram',
				Priority: 0,
				SeparateTable: 'ExposureProgram3',
				PrintConv: \%sonyExposureProgram3,
			},
			// 0x01b8 start 65 Blocks of 180 bytes each for SLT (ref 12)
			// In each block, the 9th, 10th and 11th byte appear to relate to AFPoint as at offsets 0x07, 0x08, 0x09 above..
			// Possibly, these blocks relate to sequential focusing attempts and/or object tracking,
			// the first byte being an Index or Counter.
			// The last block before the block with index 0, appears to relate to the AF data at ShutterRelease.
		
			// 0xf38,0x1208,0x14d8,0x158c,0x1640,(and more) - 0 if AFMicroAdj is On, 1 if Off
			// 0x1ab6 - 0x80 if AFMicroAdj is On, 0 if Off
			// tags also related to AFPoint (PH, A77):
			//   0x11ec, 0x122a, 0x1408, 0x1446, 0x14bc, 0x1f86,
			//   0x14fa, 0x1570, 0x1572, 0x15ae, 0x1f48
		);
		*/	
	},
	
	CameraSettings: function(arr, model){
		/* TODO
		[ //PH
			{
				Name: 'CameraSettings',
				// count: A200/A300/A350/A700=280, A850/A900=364
				Condition: '$count == 280 or $count == 364',
				SubDirectory: {
					TagTable: 'Image::ExifTool::Sony::CameraSettings',
					ByteOrder: 'BigEndian',
				},
			},{
				Name: 'CameraSettings2',
				// count: A230/A290/A330/A380/A390=332
				Condition: '$count == 332',
				SubDirectory: {
					TagTable: 'Image::ExifTool::Sony::CameraSettings2',
					ByteOrder: 'BigEndian',
				},
			},{
				Name: 'CameraSettings3',
				// count: A560/A580/A33/A35/A55/NEX3/5/5C/C3/VG10E=1536, A450/A500/A550=2048
				Condition: '$count == 1536 || $count == 2048',
				SubDirectory: {
					TagTable: 'Image::ExifTool::Sony::CameraSettings3',
					ByteOrder: 'LittleEndian',
				},
			},{
				Name: 'CameraSettingsUnknown',
				SubDirectory: {
					TagTable: 'Image::ExifTool::Sony::CameraSettingsUnknown',
					ByteOrder: 'BigEndian',
				},
			},
		],
		*/
	},
	
	ExtraInfo: {
		/* TODO
		[ //12
			{
				Name: 'ExtraInfo',
				Condition: '$$self{Model} =~ /^DSLR-A(850|900)\b/',
				SubDirectory: {
					TagTable: 'Image::ExifTool::Sony::ExtraInfo',
					ByteOrder: 'BigEndian',
				},
			},{
				Name: 'ExtraInfo2',
				Condition: '$$self{Model} =~ /^DSLR-A(230|290|330|380|390)\b/',
				SubDirectory: { TagTable: 'Image::ExifTool::Sony::ExtraInfo2' },
			},{
				Name: 'ExtraInfo3',
				// for DSLR-A450/500/550/560/580, SLT-A33/35/55 and NEX-3/5/5C.
				SubDirectory: { TagTable: 'Image::ExifTool::Sony::ExtraInfo3' },
			}
		],
		*/	
	},
	
	ShotInfo: {
		/* TODO
		{
			Name: 'ShotInfo',
			SubDirectory: { TagTable: 'Image::ExifTool::Sony::ShotInfo' },
		},
		*/
	},
	
	/* TODO - thumb
	PreviewImage: {
		
		{ //PH (JPEG images from all DSLR's except the A100)
			Name: 'PreviewImage',
			Writable: 'undef',
			DataTag: 'PreviewImage',
			// Note: the preview data starts with a 32-byte proprietary Sony header
			WriteCheck: 'return $val=~/^(none|.{32}\xff\xd8\xff)/s ? undef : "Not a valid image"',
			RawConv: q{
				return \$val if $val =~ /^Binary/;
				$val = substr($val,0x20) if length($val) > 0x20;
				return \$val if $val =~ s/^.(\xd8\xff\xdb)/\xff$1/s;
				$$self{PreviewError} = 1 unless $val eq 'none';
				return undef;
			},
			// must construct 0x20-byte header which contains length, width and height
			ValueConvInv: q{
				return 'none' unless $val;
				my $e = new Image::ExifTool;
				my $info = $e->ImageInfo(\$val,'ImageWidth','ImageHeight');
				return undef unless $$info{ImageWidth} and $$info{ImageHeight};
				my $size = Set32u($$info{ImageWidth}) . Set32u($$info{ImageHeight});
				return Set32u(length $val) . $size . ("\0" x 8) . $size . ("\0" x 4) . $val;
			},
		},
		
	},
	
	FullImageSize: {
		
		{ //PH (A550 JPEG and A200, A230, A300, A350, A380, A700 and A900 ARW)
			Name: 'FullImageSize',
			Writable: 'int32u',
			Count: 2,
			// values stored height first, so swap to get "width height"
			ValueConv: 'join(" ", reverse split(" ", $val))',
			ValueConvInv: 'join(" ", reverse split(" ", $val))',
			PrintConv: '$val =~ tr/ /x/; $val',
			PrintConvInv: '$val =~ tr/x/ /; $val',
		},
		
	},
	PreviewImageSize: {
		
		{ //PH (A550 JPEG and A200, A230, A300, A350, A380, A700 and A900 ARW)
			Name: 'PreviewImageSize',
			Writable: 'int32u',
			Count: 2,
			ValueConv: 'join(" ", reverse split(" ", $val))',
			ValueConvInv: 'join(" ", reverse split(" ", $val))',
			PrintConv: '$val =~ tr/ /x/; $val',
			PrintConvInv: '$val =~ tr/x/ /; $val',
		},
		
	},
	*/		
	
	Quality: {
		0: 'RAW',
		1: 'Super Fine',
		2: 'Fine',
		3: 'Standard',
		4: 'Economy',
		5: 'Extra Fine',
		6: 'RAW + JPEG',
		7: 'Compressed RAW',
		8: 'Compressed RAW + JPEG',
		0xffffffff: 'n/a', //PH (SLT-A57 panorama)
	},

	Teleconverter: (function(){ return Minolta.ref.Teleconverter })(),

	
	WhiteBalance: {
		0x00: 'Auto',
		0x01: 'Color Temperature/Color Filter',
		0x10: 'Daylight',
		0x20: 'Cloudy',
		0x30: 'Shade',
		0x40: 'Tungsten',
		0x50: 'Flash',
		0x60: 'Fluorescent',
		0x70: 'Custom'
	},
	
	MultiBurstMode: { 0: 'Off', 1: 'On' },
	MultiBurstImageWidth: function(n){ return MainRef.px(n); },
	MultiBurstImageHeight: function(n){ return MainRef.px(n); },
	
	Rating: function(n){
		return (typeof n === 'number' && n<6) ? { value:n.toString().concat(' stars'), _val:n } : { value:n, _val:n };
	},
	
	Contrast: function(n){ return MainRef.plusminus(n); },
	Saturation: function(n){ return MainRef.plusminus(n); },
	Sharpness: function(n){ return MainRef.plusminus(n); },
	Brightness: function(n){ return MainRef.plusminus(n); },
	
	LongExposureNoiseReduction: {
		0: 'Off',
		1: 'On (unused)',
		0x10001: 'On (dark subtracted)', // (NEX-C3)
		0xffff0000: 'Off (65535)',
		0xffff0001: 'On (65535)',
		0xffffffff: 'n/a'
	},
		
	HighISONoiseReduction: {
		0: 'Off',
		1: 'Low',
		2: 'Normal',
		3: 'High',
		256: 'Auto',
		// it seems that all DSC models except DSC-RX models give n/a here (ref 12)
		65535: 'n/a',
	},
	
	HDR: function(n, model){
		var ref = { //12 (A580)
			0: 'Uncorrected image',  // A580 stores 2 images: uncorrected and HDR
			1: 'HDR image (good)',
			2: 'HDR image (fail 1)', // alignment problem?
			3: 'HDR image (fail 2)' // contrast problem?
		}
		if (model === 'DSLR-A550'){
			ref = {
				0x0: 'Off',
				0x01: 'Auto',
				0x10: '1.0 EV',
				0x11: '1.5 EV',
				0x12: '2.0 EV',
				0x13: '2.5 EV',
				0x14: '3.0 EV',
				0x15: '3.5 EV',
				0x16: '4.0 EV',
				0x17: '4.5 EV',
				0x18: '5.0 EV',
				0x19: '5.5 EV',
				0x1a: '6.0 EV'
			}
		}
		return (n in ref) ? { value:ref[n], _val:n } : { value:n, _val:n };
	},
	
	MultiFrameNoiseReduction: {
		0: 'Off',
		1: 'On',
		255: 'n/a',
	},

	PictureEffect: {
		0: 'Off',
		1: 'Toy Camera', //12 (A35)
		2: 'Pop Color', // (also A35/NEX-C3, ref 12)
		3: 'Posterization', //12 (A35)
		4: 'Posterization B/W', //12 (A35)
		5: 'Retro Photo', //12 (A35, NEX-5)
		6: 'Soft High Key', // (also A65V, A35/NEX-C3 call this "High-key", ref 12)
		7: 'Partial Color (red)', //12 (A35)
		8: 'Partial Color (green)', //12 (A35, NEX-5)
		9: 'Partial Color (blue)', //12 (A35)
		10: 'Partial Color (yellow)', //12 (A35, NEX-5)
		13: 'High Contrast Monochrome', //12 (A35)
		16: 'Toy Camera (normal)', // (also A65, ref 12)
		17: 'Toy Camera (cool)', // (RX100)
		18: 'Toy Camera (warm)', // (RX100)
		19: 'Toy Camera (green)', // (RX100)
		20: 'Toy Camera (magenta)', // (RX100)
		32: 'Soft Focus (low)', //12 (RX100)
		33: 'Soft Focus', //12 (A65V)
		34: 'Soft Focus (high)', // (RX100)
		48: 'Miniature (auto)', //12 (A65V/NEX-7, horizontal)
		49: 'Miniature (top)', // (RX100)
		50: 'Miniature (middle horizontal)', // (WX100/HX20V, horizontal)
		51: 'Miniature (bottom)', // (WX100, rotate 90 CW)
		52: 'Miniature (left)', // (RX100)
		53: 'Miniature (middle vertical)', // (RX100)
		54: 'Miniature (right)', // (RX100)
		64: 'HDR Painting (low)', // (RX100)
		65: 'HDR Painting', // (also A65V, ref 12)
		66: 'HDR Painting (high)', // (RX100)
		80: 'Rich-tone Monochrome', // (also A65V, ref 12)
		97: 'Water Color', // (HX200V)
		98: 'Water Color 2',
		112: 'Illustration (low)', // (RX100)
		113: 'Illustration', // (RX100)
		114: 'Illustration (high)', // (RX100)
	},
	
	SoftSkinEffect: {
		0: 'Off',
		1: 'Low',
		2: 'Mid',
		3: 'High',
		0x10001: 'Unknown',
		0x10002: 'Landscape or Portrait flash',
		0xffffffff: 'n/a', // (A35)
	},
	
	/* *2010 */
	// Tags: {},
	
	VignettingCorrection: { 0: 'Off', 2: 'Auto', 0xffffffff: 'n/a' },
	LateralChromaticAberration: { 0: 'Off', 2: 'Auto', 0xffffffff: 'n/a' },
	DistortionCorrection: { 0: 'Off', 2: 'Auto', 0xffffffff: 'n/a' },
	
	WBShiftAB_GM: function(arr){
		return (arr instanceof Array && arr.length === 2) ? 
		{ value: 'shift toward amber: '.concat(arr[0], ', shift toward magenta: ', arr[1]), _val:arr } :
		{ value: arr, _val:arr }	
	},
	
	AutoPortraitFramed: { 0: 'No', 1: 'Yes' },
	
	FocusMode: {
		0: 'Manual',
		2: 'AF-S',
		3: 'AF-C',
		4: 'AF-A',
		6: 'DMF', // "Direct Manual Focus"
		7: 'AF-D', // "Depth Map Assist Continuous AF"
	},
			
	AFAreaModeSetting: function(n, model){
		/* TODO
		{
			Name: 'AFAreaModeSetting',
			Condition: '$$self{Model} =~ /^SLT-/',
			Notes: 'SLT models',
			Writable: 'int8u',
			// (the actual AFAreaMode used may be different because
			// the camera overrides this to use Wide mode when tracking)
			PrintConv: {
				0: 'Wide',
				4: 'Local',
				8: 'Zone', //PH
				9: 'Spot',
			},
		},{
			Name: 'AFAreaModeSetting',
			Condition: '$$self{Model} =~ /^(NEX-|ILCE-)/',
			Notes: 'NEX models',
			Writable: 'int8u',
			PrintConv: {
				0: 'Multi',
				1: 'Center',
				3: 'Flexible Spot',
				11: 'Zone', //12 (NC)
			},
		},
		*/	
	},
			
	AFPointSelected: {
		// TODO : for models /^DSC-/ this is in CameraInfo and shouldn't be returned
		0: 'Auto', // (NC) (always 0 for NEX/ILCE unless AFAreaModeSetting is Zone, ref 12)
		1: 'Center',
		2: 'Top',
		3: 'Upper-right',
		4: 'Right',
		5: 'Lower-right',
		6: 'Bottom',
		7: 'Lower-left',
		8: 'Left',
		9: 'Upper-left',
		10: 'Far Right',
		11: 'Far Left',
		12: 'Upper-middle',
		13: 'Near Right',
		14: 'Lower-middle',
		15: 'Near Left',
		16: 'Upper Far Right',
		17: 'Lower Far Right',
		18: 'Lower Far Left',
		19: 'Upper Far Left',
	},
	
	AFInfo2: function(n, model){
		if( typeof n !== 'number' || n<0 ) return { value:'Off', _val:-1 };
		if(model.indexOf('SLT-')!==0) return { value: 'none', _val:0 };
		var afBitmask = {
			0: 'Center',
			1: 'Top',
			2: 'Upper-right',
			3: 'Right',
			4: 'Lower-right',
			5: 'Bottom',
			6: 'Lower-left',
			7: 'Left',
			8: 'Upper-left',
			9: 'Far Right',
			10: 'Far Left',
			11: 'Upper-middle',
			12: 'Near Right',
			13: 'Lower-middle',
			14: 'Near Left',
			15: 'Upper Far Right',
			16: 'Lower Far Right',
			17: 'Lower Far Left',
			18: 'Upper Far Left',
		};
		return { value:MainRef.bitmask(n, afBitmask, 18, true /*TODO - why reverse?*/ ), _val:n };
	},
	
	/* TODO */
	Tag900b: {},
	Tag9050: {},
	Tag9400: {},
	__1: {},
	Tag9402: {},
	Tag9403: {},
	__4: {},
	Tag9405a: {},
	Tag9406: {},
	__7: {},
	__8: {},
	__9: {},
	Tag940a: {},
	Tag940b: {},
	Tag940c: {},
	Tag940d: {},
	Tag940f: {},
	Tag9411: {},
	
	FileFormat: function(arr){
		if( !(arr instanceof Array) || arr.length<4 ) return { value:arr, _val:arr };
		// TODO - dynamically set the file type to SR2 because we could have assumed ARW up till now
		var ref = {
			_0_0_0_2: 'JPEG',
			_1_0_0_0: 'SR2',
			_2_0_0_0: 'ARW 1.0',
			_3_0_0_0: 'ARW 2.0',
			_3_1_0_0: 'ARW 2.1',
			_3_2_0_0: 'ARW 2.2', //PH (NEX-5)
			_3_3_0_0: 'ARW 2.3', //PH (SLT-A65,SLT-A77)
			_3_3_1_0: 'ARW 2.3.1' //PH/12 (RX1R,RX100M2)
			// what about cRAW images?
		}
		var key = '_'.concat(arr.slice(0,4).join('_'));
		return (key in ref) ? { value:ref[key], _val:arr } : { value:'Unknown or cRAW', _val:arr };
	},
	
	
	ModelID: {
		2: 'DSC-R1',
		256: 'DSLR-A100',
		257: 'DSLR-A900',
		258: 'DSLR-A700',
		259: 'DSLR-A200',
		260: 'DSLR-A350',
		261: 'DSLR-A300',
		262: 'DSLR-A900 (APS-C mode)', //http://u88.n24.queensu.ca/exiftool/forum/index.php/topic,3994.0.html
		263: 'DSLR-A380/A390', //PH (A390)
		264: 'DSLR-A330',
		265: 'DSLR-A230',
		266: 'DSLR-A290', //PH
		269: 'DSLR-A850',
		270: 'DSLR-A850 (APS-C mode)', //http://u88.n24.queensu.ca/exiftool/forum/index.php/topic,3994.0.html
		273: 'DSLR-A550',
		274: 'DSLR-A500', //PH
		275: 'DSLR-A450', //http://dev.exiv2.org/issues/show/0000611
		278: 'NEX-5', //PH
		279: 'NEX-3', //PH
		280: 'SLT-A33', //PH
		281: 'SLT-A55 / SLT-A55V', //PH (A55 NC)
		282: 'DSLR-A560', //PH
		283: 'DSLR-A580', //http://u88.n24.queensu.ca/exiftool/forum/index.php/topic,2881.0.html
		284: 'NEX-C3', //PH
		285: 'SLT-A35', //12
		286: 'SLT-A65 / SLT-A65V', //PH
		287: 'SLT-A77 / SLT-A77V', //PH
		288: 'NEX-5N', //PH
		289: 'NEX-7', //PH
		290: 'NEX-VG20E', //12
		291: 'SLT-A37', //12
		292: 'SLT-A57', //12
		293: 'NEX-F3', //PH
		294: 'SLT-A99 / SLT-A99V', //12
		295: 'NEX-6', //12
		296: 'NEX-5R', //12
		297: 'DSC-RX100', //PH (also used by Hasselblad Stellar, ref 12)
		298: 'DSC-RX1', //12
		299: 'NEX-VG900', //12
		300: 'NEX-VG30E', //12
		302: 'ILCE-3000', //12
		303: 'SLT-A58', //12
		305: 'NEX-3N', //PH
		306: 'ILCE-7', //12
		307: 'NEX-5T', //12
		308: 'DSC-RX100M2', //12
		309: 'DSC-RX10', //12
		310: 'DSC-RX1R', //12
		311: 'ILCE-7R', //12
		312: 'ILCE-6000', //12
		313: 'ILCE-5000', //12
	},
	
	CreativeStyle: {
		None       : 'None',
		AdobeRGB   : 'Adobe RGB',
		Real       : 'Real',
		Standard   : 'Standard',
		Vivid      : 'Vivid',
		Portrait   : 'Portrait',
		Landscape  : 'Landscape',
		Sunset     : 'Sunset',
		Nightview  : 'Night View/Portrait',
		BW         : 'B&W',
		Neutral    : 'Neutral',
		Clear      : 'Clear',
		Deep       : 'Deep',
		Light      : 'Light',
		Autumnleaves: 'Autumn Leaves',
		Sepia      : 'Sepia',
	},
	
	ColorTemperature: function(n){
		return {
			value: (typeof n === 'number' && n>0) ? (n==0xffffffff ? 'n/a' : n.toString().concat(' Kelvin')) : 'Auto',
			_val: n
		};
	},
	ColorCompensationFilter: function(n){
		if( typeof n !== 'number' ) return { value:'n/a', _val:n };
		return {
			value:  (n>0) ? 'Magenta ('.concat(n,')') : 'Green ('.concat(n,')'),
			_val: n
		};
	},
	
	SceneMode: (function(){ return Minolta.ref.SceneMode })(),
	
	ZoneMatching: {
		0: 'ISO Setting Used',
		1: 'High Key',
		2: 'Low Key',
	},
	DynamicRangeOptimizer: {
		0: 'Off',
		1: 'Standard',
		2: 'Advanced Auto',
		3: 'Auto', // (A550)
		8: 'Advanced Lv1', //JD
		9: 'Advanced Lv2', //JD
		10: 'Advanced Lv3', //JD
		11: 'Advanced Lv4', //JD
		12: 'Advanced Lv5', //JD
		16: 'Lv1', // (NEX-5)
		17: 'Lv2',
		18: 'Lv3',
		19: 'Lv4',
		20: 'Lv5',
	},
	ImageStabilization: {
		0: 'Off',
		1: 'On',
		0xffffffff: 'n/a', // (HX9V sweep panorama, ref 12)
	},
	
	LensType: {
		/* TODO
		{ //2
			Name: 'LensType',
			Writable: 'int32u',
			SeparateTable: 1,
			// set to 65535 for E-Mount lenses (values 0x80xx)
			ValueConvInv: '($val & 0xff00) == 0x8000 ? 65535 : int($val)',
			PrintConv: \%sonyLensTypes,
		},
		*/
	},
	MinoltaMakerNote: {
		/* TODO
		{ //2
			// (used by the DSLR-A100)
			Name: 'MinoltaMakerNote',
			// must check for zero since apparently a value of zero indicates the IFD doesn't exist
			// (dumb Sony -- they shouldn't write this tag if the IFD is missing!)
			Condition: '$$valPt ne "\0\0\0\0"',
			Flags: 'SubIFD',
			SubDirectory: {
				TagTable: 'Image::ExifTool::Minolta::Main',
				Start: '$val',
			},
		},
		*/
	},
	ColorMode: {
		0: 'Standard', 
		1: 'Vivid', //PH
		2: 'Portrait',
		3: 'Landscape',
		4: 'Sunset',
		5: 'Night View/Portrait', //(portrait if flash is on)
		6: 'B&W',
		7: 'Adobe RGB',
		12: 'Neutral', // Sony
		13: 'Clear', //25 (NC)
		14: 'Deep', //25
		15: 'Light', //25 (NC)
		16: 'Autumn Leaves', //25 (NC)
		17: 'Sepia', //25
		100: 'Neutral', //JD
		101: 'Clear', //JD
		102: 'Deep', //JD
		103: 'Light', //JD
		104: 'Night View', //JD
		105: 'Autumn Leaves', //JD
		0xffffffff: 'n/a', //PH	
	},
	LensSpec: {
		/* TODO
		{
			Name: 'LensSpec',
			Format: 'undef',
			Writable: 'int8u',
			Count: 8,
			Notes: q{
				like LensInfo, but also specifies lens features: DT, E, ZA, G, SSM, SAM,
				OSS, STF, Reflex, Macro and Fisheye
			},
			ValueConv: \&ConvLensSpec,
			ValueConvInv: \&ConvInvLensSpec,
			PrintConv: \&PrintLensSpec,
			PrintConvInv: \&PrintInvLensSpec,
		},
		*/	
	},
	Macro: {
		0: 'Off',
		1: 'On',
		2: 'Close Focus', //9
		65535: 'n/a', //PH (A100)
	},
	ExposureMode: {
		0: 'Program AE', // (RX100 'Program','Sunset' - PH)
		1: 'Portrait', //PH (HX1)
		2: 'Beach', //9
		3: 'Sports', //9
		4: 'Snow', //9
		5: 'Landscape',
		6: 'Auto', // (RX100 'Intelligent Auto' - PH)
		7: 'Aperture-priority AE',
		8: 'Shutter speed priority AE',
		9: 'Night Scene / Twilight',//2/9
		10: 'Hi-Speed Shutter', //9
		11: 'Twilight Portrait', //9 (RX100 'Night Portrait' - PH)
		12: 'Soft Snap/Portrait', //9 (TX7 'Soft Snap'; RX100/A37 'Portrait' but manuals say "reproduces soft skin tone" - PH)
		13: 'Fireworks', //9
		14: 'Smile Shutter', //9 (T200)
		15: 'Manual',
		18: 'High Sensitivity', //9
		19: 'Macro', //12
		20: 'Advanced Sports Shooting', //9
		29: 'Underwater', //9
		// 30 seen for DSC-W110 and W390, maybe something with Face or Portrait ??
		33: 'Food', //9
		34: 'Sweep Panorama', //PH (HX1)
		35: 'Handheld Night Shot', //PH (HX1/TX1, also called "Hand-held Twilight")
		36: 'Anti Motion Blur', //PH (TX1)
		37: 'Pet', //9
		38: 'Backlight Correction HDR', //9
		39: 'Superior Auto', //9
		40: 'Background Defocus', //PH (HX20V)
		41: 'Soft Skin', //12 (HX9V) (HX200V Portrait - PH)
		42: '3D Image', //12 (HX9V)
		// 50 seen for DSC-W530
		65535: 'n/a', //PH (A100)
	},
	FocusMode: {
			
		/* TODO
		{ //9
			Name: 'FocusMode',
			// Only FocusMode for older DSC models;
			// Newest DSC models give only 0, many models of 'HX9V generation' give only 4 -
			// these models give FocusMode in tag 0xb04e, and are excluded here.
			Condition: q{
				($$self{TagB042} = Get16u($valPt, 0)) and
				(not $$self{MetaVersion} or $$self{MetaVersion} ne 'DC7303320222000')
			},
			Notes: 'not valid for all models',
			Writable: 'int16u',
			RawConv: '$val == 65535 ? undef : $val',
			PrintConv: {
				// 0 - seen this for panorama shot
				1: 'AF-S', // (called Single-AF by Sony)
				2: 'AF-C', // (called Monitor-AF by Sony)
				4: 'Permanent-AF', // (TX7,HX9V?)
				65535: 'n/a', //PH (A100), also for DSC-W690 panorama shots
			},
		},
		{ //PH (RX100)
			Name: 'FocusMode',
			Condition: '$$self{MetaVersion} and $$self{MetaVersion} eq "DC7303320222000"', //12
			Notes: 'valid for DSC-HX9V generation and newer',
			Writable: 'int16u',
			PrintConv: {
				0: 'Manual',
				// 1 - seen for DSC-WX7 burst, HDR-CX130E/CX560E
				2: 'AF-S',
				3: 'AF-C',
				// 4 - seen for HDR-CX360E/CX700E
				5: 'Semi-manual', //12 (HX9V)
				6: 'DMF', // "Direct Manual Focus"
			},
		},
		*/
	},
	AFAreaMode: {
		
		/* TODO
		{ //9
			Name: 'AFAreaMode',
			// AFAreaMode only for older models;
			// exclude newest DSC models, which give AFAreaMode in Tag9402 0x0017 (ie. RX100 - PH)
			Writable: 'int16u',
			Condition: 'not $$self{MetaVersion} or $$self{MetaVersion} ne "DC7303320222000"', //12
			RawConv: '$val == 65535 ? undef : $val',
			Notes: 'older models',
			PrintConv: {
				// 0 - (takes this value after camera reset, but can't be set back once changed)
				0: 'Default',
				1: 'Multi',
				2: 'Center',
				3: 'Spot',
				4: 'Flexible Spot', // (T200)
				6: 'Touch',
				14: 'Tracking', //12 (HX9V) ("Manual" for the T200?, ref 9)
				15: 'Face Tracking', // (not set when in face detect mode and no faces detected)
				65535: 'n/a', //PH (A100)
			},
		},{ //12
			Name: 'AFAreaMode',
			// AFAreaMode for DSC-HX9V generation, having values that appear to be different from older models.
			Writable: 'int16u',
			Condition: '$$self{TagB042} and $$self{TagB042} != 0',
			Notes: 'DSC-HX9V generation cameras',
			PrintConv: {
				0: 'Multi',
				1: 'Center',
				2: 'Spot', // (NC) seen for DSC-WX9
				3: 'Flexible Spot',
				10: 'Selective (for Miniature effect)', // seen for Miniature effect of DSC-WX30
				14: 'Tracking',
				15: 'Face Tracking',
				255: 'Manual',
			},
		}
		*/
	},
	AFIlluminator: {
		0: 'Off',
		1: 'Auto',
		65535: 'n/a', //PH (A100)
	},
	JPEGQuality: {
		0: 'Standard',
		1: 'Fine',
		2: 'Extra Fine', //12
		65535: 'n/a', //PH (A100)
	},
	FlashLevel: function(n,model){
		if ( (model === 'DSLR-A100' && n === -1) || typeof n !== 'number' ) return { value: 'n/a', _val:n };
		var v = 'Normal';
		if ( n < -6 ) v = 'Low';
		if ( n >  6 ) v = 'High';
		if ( n !==0 ) v = (n>0) ? '+'.concat(n, '/3') : n.toString().concat('/3');
		return { value: v, _val:n };
	},
	ReleaseMode: {
		0: 'Normal', // (ie. shutter button)
		2: 'Continuous',
		5: 'Exposure Bracketing',
		6: 'White Balance Bracketing', // (HX5)
		65535: 'n/a', //PH (A100)
	},
	SequenceNumber: {
		0: 'Single',
		65535: 'n/a', //PH (A100)
	},
	AntiBlur: {
		0: 'Off',
		1: 'On (Continuous)', //PH (NC)
		2: 'On (Shooting)', //PH (NC)
		65535: 'n/a',
	},
	DynamicRangeOptimizer: {
		0: 'Off',
		1: 'Standard',
		2: 'Plus',
		// 8 for HDR models - what does this mean?
	},
	HighISONoiseReduction2: {
		0: 'Normal',
		1: 'High',
		2: 'Low',
		3: 'Off', //12
		// it seems that all SLT and NEX models give n/a here (ref 12)
		65535: 'n/a',
	},
	IntelligentAuto: {
		0: 'Off',
		1: 'On',
		2: 'Advanced', //9
	},
	WhiteBalance:{
		0: 'Auto',
		4: 'Custom', // (manual)
		5: 'Daylight',
		6: 'Cloudy',
		// PrintConv names matching Exif Fluorescent LightSource names (ref 12)
		// (Sony uses conflicting names for some models)
		7: 'Cool White Fluorescent', // (RX100) (TX7/HX9V "Fluorescent 1 (White)", ref 9/12)
		8: 'Day White Fluorescent',  // (RX100) (TX7/HX9V "Fluorescent 2 (Natural White)", ref 9/12)
		9: 'Daylight Fluorescent',   // (RX100) (TX7/HX9V "Fluorescent 3 (Day White)", ref 9/12)
		10: 'Incandescent2', //12 (HX9V)
		11: 'Warm White Fluorescent',
		14: 'Incandescent',
		15: 'Flash',
		17: 'Underwater 1 (Blue Water)', //9
		18: 'Underwater 2 (Green Water)', //9
	}		
};



/*
	{
		Name: 'Tag900b',
		Condition: '$$valPt =~ /^\xae/',
		SubDirectory: { TagTable: 'Image::ExifTool::Sony::Tag900b' },
	},
	*/
	
	/*
	{
		Name: 'Tag9050',
		// 944 bytes for A37, A57, A99, NEX-F3, NEX-5R, NEX-6, DSC-RX1, DSC-RX100
		// 3072 bytes for A65, A77, NEX-5N, NEX-7, NEX-VG20 (ref 12)
		Condition: '$$self{Model} !~ /^Stellar/',
		SubDirectory: {
			TagTable: 'Image::ExifTool::Sony::Tag9050',
			ByteOrder: 'LittleEndian',
		},
	},
	*/
	
	/*
	[
	// first byte:
	// 0x07 (e) for DSC-HX7V/HX9V/HX100V/TX10/TX100/TX100V/WX7/WX9/WX10, HDR-CX../PJ..
	// 0x09 (e) for DSC-TX20/TX55/WX30
	// 0x0a (e) for SLT-A37/A57/A65V/A77V, NEX-F3/5N/5R/5T/6/7/VG20E, DSC-RX100/RX1/RX1R/HX10V/HX20V/HX30V/HX200V/TX200V/TX300V/TX66/WX50/WX100/WX150
	// 0x0c (e) for ILCE-3000, NEX-3N, SLT-A58, DSC-HX50V/HX300/RX100M2/TX30/WX60/WX80/WX200/WX300, DSC-QX10/QX100
	// 0xd0 (e) H90, W650, W690: tag9400 decoding appears not valid/different
	// 0x23 (e) for DSC-RX10/HX60V/HX400V, ILCE-7/7R/5000/6000
	// first byte decoded: 40, 204, 202, 27, 58, 62 respectively
	{
		Name: 'Tag9400a',
		Condition: q{
			$$valPt =~ /^[\x07\x09\x0a]/ or
		   ($$valPt =~ /^[\x5e\xe7\x04]/ and $$self{DoubleCipher} = 1)
		},
		SubDirectory: { TagTable: 'Image::ExifTool::Sony::Tag9400a' },
	},{
		Name: 'Tag9400b',
		Condition: '$$valPt =~ /^\x0c/',
		SubDirectory: { TagTable: 'Image::ExifTool::Sony::Tag9400b' },
	},{
		Name: 'Tag9400c',
		Condition: '$$valPt =~ /^\x23/',
		SubDirectory: { TagTable: 'Image::ExifTool::Sony::Tag9400c' },
	},{
		Name: 'Sony_0x9400',
		%unknownCipherData,
	}],
	*/
	
	/*
	{
		Name: 'Sony_0x9401',
		%unknownCipherData,
		// notes for data in this block (ref PH/12):
		//   0x02-0x03 appear to have some relation to start-offset of data...
		//   0x00 - 0x03    Metering
		//                  Mode
		//   f4 00 00 03      -        -   DSC-H90/W650/W690
		//   cf 0b 9f 0f    0x09bc    (a)  DSC-WX9
		//   1c 00 ac 0f    0x09c9    (b)  HDR-CX130E/CX160E/CX360E/CX560E/CX700E/PJ10E/PJ30E
		//   b7 0f f7 0f    0x09dd    (c)  DSC-HX7V/TX10/WX7/WX10
		//   b7 0f fa 0f    0x09e0    (d)  DSC-HX9V/HX100V/TX100/TX100V
		//   27 00 fd 0f    0x09e7    (e)  DSC-TX20/TX55/WX30
		//   69 1f ff 0f    0x09e9    (f)  NEX-5N
		//   21 2b cf 0f    0x09e9    (f)  NEX-7/VG20E, SLT-A65V/A77V
		//   2d 00 d5 0d    0x09a2    (g)  DSC-HX10V/HX20V/HX30V/HX200V/TX66/TX200V/TX300V/WX50/WX70/WX100/WX150
		//   2f 00 d6 0d    0x09a3    (h)  NEX-F3, SLT-A37/A57
		//   30 00 d8 0d    0x09a5    (i)  HDR-AS15
		//   32 00 e2 0d    0x09ac    (j)  DSC-RX100
		//   33 00 e2 0d    0x09ac    (j)  NEX-5R/5T/6, NEX-VG900/VG30E
		//   33 50 e2 0d    0x09ac    (j)  SLT-A99V
		//   33 40 0d 0e    0x09d7    (k)  DSC-RX1
		//   33 41 0d 0e    0x09d7    (k)  DSC-RX1, DSC-RX1R
		//   38 00 32 0e    0x09fc    (l)  SLT-A58, ILCE-3000, NEX-3N, DSC-HX300/HX50V/WX200/WX300/WX60/WX80/TX30
		//   3a 10 3a 0e    0x0a01    (m)  DSC-QX10/QX100
		//   3a 20 47 0e    0x0a01    (m)  DSC-RX100M2
		//   43 00 66 0e    0x0a1b    (n)  ILCE-7/7R/5000, DSC-RX10/HX400V
		//   44 00 9c 0e    0x0a39    (o)  ILCE-6000, DSC-HX60V
		//
		// 0x0004 - (RX100: 0 or 1. subsequent data valid only if 1 - PH)
		// 0x0007: {
		//     Name: 'DynamicRangeOptimizer_9401',
		//     PrintConv: {
		//         0: 'Disabled', // seen for Panorama images
		//         1: 'Auto',
		//         3: 'Lv1', //NC
		//         4: 'Lv2', //NC
		//         5: 'Lv3',
		//         6: 'Lv4',
		//         7: 'Lv5',
		//         // 8 - seen for VG20E and some other models - PH
		//         255: 'Off',
		//     },
		// },
	},
	*/
	
	/*
	[{
		Name: 'Tag9402',
		// first 2 bytes deciphered:
		//   0x00      0x00     SLT-A37/A57/A65/A77
		//   0x0e      0x00     DSC-HX9V generation
		//   0x0f      0x01     NEX-5N/7/VG20
		//   0x10      0x01     DSC-RX100 etc., ILCE-3000, NEX-3N/5R/5T/6/VG30/VG900
		//   0x11      0x01     DSC-RX100M2/QX10/QX100
		//   0x12,0x13 0x01     ILCE-7/7R/5000, DSC-RX10/HX400V
		//   0x14      0x01     ILCE-6000, DSC-HX60V
		//   var       var      SLT-A58/A99V
		// only valid when first byte 0x0f, 0x10, 0x11, 0x12, 0x13, 0x14 (enciphered 0x8a, 0x70, 0xb6, 0x69, 0x88, 0x20)
		Condition: '$$self{DoubleCipher} ? $$valPt =~ /^[\x7e\x46\x1d\x18\x3a\x95]\x01/ : $$valPt =~ /^[\x8a\x70\xb6\x69\x88\x20]\x01/',
		SubDirectory: { TagTable: 'Image::ExifTool::Sony::Tag9402' },
	},{
		Name: 'Sony_0x9402',
		%unknownCipherData,
	}],
	*/
	
	/*
	[{
		Name: 'Tag9403',
		// first byte must be 0x01
		Condition: '$$valPt =~ /^\x01/',
		SubDirectory: { TagTable: 'Image::ExifTool::Sony::Tag9403' },
	},{
		Name: 'Sony_0x9403',
		%unknownCipherData,
	}],
	*/
	
	/*
	{
		Name: 'Sony_0x9404',
		%unknownCipherData,
	},
	// 0x9405 first 2 bytes:
	// DSC-H90                             0   0  (0x00 = 0 0 enc.)
	// DSC and HDR of HX9V generation      2   0  (0x08 = 8 0 enc.)
	// SLT, DSC-RX100/RX1, NEX, ILCE-3000  3   0  (0x1b = 27 0 enc.)  (many DSC of RX100 generation, also QX10 and QX100)
	// DSC-RX1R                            4   0  (0x40 = 64 0 enc.)
	// DSC-RX100M2                         5   0  (0x7d = 125 0 enc.)
	// DSC-RX10/HX400V/HX60V, ILCE-7/7R/5000/6000   136 var  (0x3a = 58 var enc.)
	*/
	
	/*
	[{
		Name: 'Tag9405a',
		// first byte must be 0x1b
		Condition: '$$valPt =~ /^\x1b/',
		SubDirectory: { TagTable: 'Image::ExifTool::Sony::Tag9405a' },
	},{
		Name: 'Tag9405b',
		// first byte must be 0x3a
		Condition: '$$valPt =~ /^\x3a/',
		SubDirectory: { TagTable: 'Image::ExifTool::Sony::Tag9405b' },
	},{
		Name: 'Sony_0x9405',
		%unknownCipherData,
	}],
	*/
	
	/*
	[{
		Name: 'Tag9406',
		// - first byte must be 0x01 or 0x02 (enciphered 0x01 or 0x08) and
		//   third byte must be 0x02 or 0x03 (enciphered 0x08 or 0x1b) - ref 12
		// (applies to most SLT and NEX models, but no DSC models)
		Condition: '$$valPt =~ /^[\x01\x08].[\x08\x1b]/s',
		SubDirectory: { TagTable: 'Image::ExifTool::Sony::Tag9406' },
	},{
		Name: 'Sony_0x9406',
		%unknownCipherData,
	}],
	*/
	
	/*
	{
		Name: 'Sony_0x9407',
		%unknownCipherData,
	},
	*/
	
	/*
	{
		Name: 'Sony_0x9408',
		%unknownCipherData,
	},
	*/
	
	/*
	{
		Name: 'Sony_0x9409',
		%unknownCipherData,
	},
	*/
	
	/*
	[{
		Name: 'Tag940a',
		Condition: '$$self{Model} =~ /^SLT-/',
		SubDirectory: { TagTable: 'Image::ExifTool::Sony::Tag940a' },
	},{
		Name: 'Sony_0x940a',
		%unknownCipherData,
	}],
	*/
	
	/*
	{
		Name: 'Sony_0x940b',
		%unknownCipherData,
	},
	*/
	
	/*
	[{
		Name: 'Tag940c',
		Condition: '$$self{Model} !~ /^(SLT-|DSC-)\b/',
		SubDirectory: { TagTable: 'Image::ExifTool::Sony::Tag940c' },
	},{
		Name: 'Sony_0x940c',
		%unknownCipherData,
	}],
	*/
	
	/*
	{
		Name: 'Sony_0x940d',
		%unknownCipherData,
	},
// 0x940e: 2nd byte = 0: no AFInfo, default for NEX
//         2nd byte = 1: AFInfo for SLT models (but also seen 1 for DSC-HX20W/HX300/WX70 ...)
//         2nd byte = 2: AFInfo for NEX/ILCE with LA-EA2 Phase-detect AF Adapter
	*/
	
	/*
	[{
		Name: 'AFInfo',
		Condition: '$$self{Model} =~ /^SLT-/',
		SubDirectory: { TagTable: 'Image::ExifTool::Sony::AFInfo' },
	},{
		Name: 'Sony_0x940e',
		%unknownCipherData,
	}],
	*/
	
	/*
	{
		Name: 'Sony_0x940f',
		%unknownCipherData,
	},
	*/
	
	/*
	{
		Name: 'Sony_0x9411',
		%unknownCipherData,
		// 0x02 - int32u?: 1,3,5,7,9 (A77)
	},
	*/
	
/* TODO *2010

[ //12
			// different camera models have similar content but at different offsets, appears to correlate with:
			// 0x1206 - 0x1207 deciphered (0x1205 changes with firmware version):
			//   ad c3 - NEX-5N
			// 0x0192 - 0x0193 deciphered (0x0191 changes with firmware version):
			//   91 c3 - NEX-VG20E
			//   93 c3 - NEX-7, SLT-A65V/A77V
			// 0x0012 - 0x0013 deciphered (0x0011 changes with firmware version):
			//   94 c3 - SLT-A37/A57, NEX-F3
			//   95 d3 - DSC-WX50, WX70
			//   98 c3 - DSC-HX200V, HX20V, HX30V, TX200V, TX300V
			//   98 d3 - DSC-HX10V, TX66, WX100, WX150
			//   9a c3 - DSC-RX1, RX1R
			//   9b c3 - SLT-A99V
			//   9c c3 - NEX-VG30E
			//   9d c3 - DSC-RX100
			//   9e c3 - NEX-VG900, SLT-A58
			//   a1 d3 - DSC-TX30
			//   a2 d3 - DSC-WX60, WX80, WX200, WX300
			//   a3 c3 - NEX-6, DSC-HX300, HX50V
			//   a4 c3 - NEX-3N/5R/5T, ILCE-3000
			// unknown offsets or values for DSC-TX20/TX55/RX100M2/QX10/QX100/RX10/HX60V/HX400V, ILCE-7/7R/5000/6000
		{
			Name: 'Tag2010a', // ad
			Condition: '$$self{Model} =~ /^NEX-5N$/',
			SubDirectory: { TagTable: 'Image::ExifTool::Sony::Tag2010a' },
		},{
			Name: 'Tag2010b', // 91, 93
			Condition: '$$self{Model} =~ /^(SLT-A(65|77)V?|NEX-(7|VG20E))$/',
			SubDirectory: { TagTable: 'Image::ExifTool::Sony::Tag2010b' },
		},{
			Name: 'Tag2010c', // 94
			Condition: '$$self{Model} =~ /^(SLT-A(37|57)|NEX-F3)$/',
			SubDirectory: { TagTable: 'Image::ExifTool::Sony::Tag2010c' },
		},{
			Name: 'Tag2010d', // 95, 98
			Condition: q{
				$$self{Model} =~ /^(DSC-(HX10V|HX20V|HX30V|HX200V|TX66|TX200V|TX300V|WX50|WX70|WX100|WX150))$/ and
				not $$self{Panorama}
			},
			SubDirectory: { TagTable: 'Image::ExifTool::Sony::Tag2010d' },
		},{
			Name: 'Tag2010e', // 9a, 9b, 9c, 9d, 9e, a1, a2, a3, a4
			Condition: q{
				$$self{Model} =~ /^(SLT-A99V?|SLT-A58|ILCE-3000|NEX-(3N|5R|5T|6|VG900|VG30E)|DSC-(RX100|RX1|RX1R)|Stellar)$/ or
				($$self{Model} =~ /^(DSC-(HX300|HX50V|TX30|WX60|WX80|WX200|WX300))$/ and not $$self{Panorama})
			},
			SubDirectory: { TagTable: 'Image::ExifTool::Sony::Tag2010e' },
		},{
			Name: 'Tag2010f', // ?
			Condition: '$$self{Model} =~ /^(DSC-(RX100M2|QX10|QX100))$/',
			SubDirectory: { TagTable: 'Image::ExifTool::Sony::Tag2010f' },
		},{
			Name: 'Tag2010g', // ?
			Condition: '$$self{Model} =~ /^(DSC-(RX10|HX60V|HX400V)|ILCE-(7R?|[56]000))\b/',
			SubDirectory: { TagTable: 'Image::ExifTool::Sony::Tag2010g' },
		},{
			Name: 'Tag_0x2010',
			%unknownCipherData,
		}],
	
::
	
// tag definitions for Tag2010 tables (ref 12)
my %sonyDateTime2010 = (
    Name: 'SonyDateTime',
    Format: 'undef[7]',
    Shift: 'Time',
    ValueConv: q{
        my @v = unpack('vC*', $val);
        return sprintf("%.4d:%.2d:%.2d %.2d:%.2d:%.2d", @v)
    },
    ValueConvInv: q{
        my @v = ($val =~ /\d+/g);
        return undef unless @v == 6;
        return pack('vC*', @v);
    },
    PrintConv: '$self->ConvertDateTime($val)',
    PrintConvInv: '$self->InverseDateTime($val,0)',
);
my %releaseMode2010 = (
    Name: 'ReleaseMode3',
    PrintConv: {
        0: 'Normal',
        1: 'Continuous',
        2: 'Continuous - Bracketing', // (also white balance bracketing - PH)
        // 3: 'Remote Commander', (NC) (seen this when other ReleaseMode and ReleaseMode2 are 'Normal' - PH, A77)
        // 4: 'Continuous - Burst', (NC)
        5: 'Continuous - Speed/Advance Priority',
    },
);
my %gain2010 = (
    Name: 'StopsAboveBaseISO',
    // BaseISO is 100 for SLT, ILCE-3000, NEX-5N/5R/5T/6/7/VG20/VG30/VG900, DSC-RX1/RX1R
    // BaseISO is 200 for NEX-F3/3N
    // BaseISO is 160 for DSC-RX100M2
    // BaseISO is 125 for DSC-RX100
    // Also several other DSC models have BaseISO different from 100.
    Format: 'int16u',
    ValueConv: '16 - $val/256',
    ValueConvInv: '(16 - $val) * 256',
    PrintConv: '$val ? sprintf("%.1f",$val) : $val',
    PrintConvInv: '$val',
);
my %brightnessValue2010 = (
    Name: 'BrightnessValue',
    Format: 'int16u',
    ValueConv: '$val/256 - 56.6',
    ValueConvInv: '($val + 56.6) * 256',
);
my %dynamicRangeOptimizer2010 = (
    Name: 'DynamicRangeOptimizer',
    PrintConv: {
        0: 'Off',
        1: 'Auto',
        3: 'Lv1',
        4: 'Lv2',
        5: 'Lv3',
        6: 'Lv4',
        7: 'Lv5',
        8: 'n/a',
    },
);
my %hdr2010 = (
    Name: 'HDRSetting', // (Off when HDR tag is On for RX100 superior auto backlight - PH)
    PrintConv: {
        0: 'Off',
        1: 'HDR Auto',
        7: 'HDR 3 EV',
        9: 'HDR 4 EV',
        11: 'HDR 5 EV',
        13: 'HDR 6 EV',
    },
);
my %exposureComp2010 = (
    Name: 'ExposureCompensation',
    Format=>'int16s',
    ValueConv: '-$val/256',
    ValueConvInv: '-$val*256',
    PrintConv: '$val ? sprintf("%+.1f",$val) : $val',
    PrintConvInv: '$val',
);
my %pictureEffect2010 = (
    Name: 'PictureEffect2',
    SeparateTable: 'PictureEffect2',
    PrintConv: {
        0: 'Off',
        1: 'Toy Camera',
        2: 'Pop Color',
        3: 'Posterization',
        4: 'Retro Photo',
        5: 'Soft High Key',
        6: 'Partial Color',
        7: 'High Contrast Monochrome',
        8: 'Soft Focus',
        9: 'HDR Painting',
        10: 'Rich-tone Monochrome',
        11: 'Miniature',
        12: 'Water Color',
        13: 'Illustration',
    },
);
my %quality2010 = (
    Name: 'Quality2',
    PrintConv: {
        0: 'JPEG',
        1: 'RAW',
        2: 'RAW + JPEG',
    },
);
my %meteringMode2010 = (
    Name: 'MeteringMode',
    PrintConv: {
        0: 'Multi-segment',
        2: 'Center-weighted average',
        3: 'Spot',
    },
);
my %exposureProgram2010 = (
    Name: 'ExposureProgram',
    SeparateTable: 'ExposureProgram3',
    PrintConv: \%sonyExposureProgram3,
);

%Image::ExifTool::Sony::Tag2010a = ( //12
    PROCESS_PROC: \&ProcessEnciphered,
    WRITE_PROC: \&WriteEnciphered,
    CHECK_PROC: \&Image::ExifTool::CheckBinaryData,
    FORMAT: 'int8u',
    NOTES: 'Valid for NEX-5N.',
    WRITABLE: 1,
    FIRST_ENTRY: 0,
    PRIORITY: 0,
    GROUPS: { 0: 'MakerNotes', 2: 'Image' },
    0x1128: { %releaseMode2010 },
    0x112c: { %releaseMode2 },
    0x113e: { %gain2010 },
    0x1140: { %brightnessValue2010 },
    0x1144: { %dynamicRangeOptimizer2010 },
    0x1148: { %hdr2010 },
    0x114c: { %exposureComp2010 },
    0x1163: { %pictureEffect2010 },
    0x1170: { %quality2010 },
    0x1174: { %meteringMode2010 },
    0x1175: { %exposureProgram2010 },
    0x117c: { Name: 'WB_RGBLevels', Format: 'int16u[3]' },
    //0x1a08: { Name: 'SonyImageWidth', Format: 'int16u' },
    //0x1a0c: { Name: 'SonyImageHeight', Format: 'int16u' },
    0x04b0: {
        Name: 'MeterInfo',
        Format: 'int32u[486]',
        Unknown: 1,
        SubDirectory: { TagTable: 'Image::ExifTool::Sony::MeterInfo' },
    },
);

%Image::ExifTool::Sony::Tag2010b = ( //12
    PROCESS_PROC: \&ProcessEnciphered,
    WRITE_PROC: \&WriteEnciphered,
    CHECK_PROC: \&Image::ExifTool::CheckBinaryData,
    FORMAT: 'int8u',
    NOTES: 'Valid for SLT-A65/A77, NEX-7/VG20E.',
    WRITABLE: 1,
    FIRST_ENTRY: 0,
    PRIORITY: 0,
    GROUPS: { 0: 'MakerNotes', 2: 'Image' },
    0x0000: { %sequenceImageNumber }, //PH
    0x0004: { %sequenceFileNumber }, //PH
    0x0008: { %releaseMode2, Format: 'int32u' },
    //0x0044: { Name: 'SonyImageWidth3', Format: 'int16u' },
    //0x0048: { Name: 'SonyImageHeight3', Format: 'int16u' },
    //0x0054: { Name: 'SonyImageWidth2', Format: 'int16u' },
    //0x0058: { Name: 'SonyImageHeight2', Format: 'int16u' },
    //0x0064: { Name: 'SonyImageWidth', Format: 'int16u' },
    //0x0068: { Name: 'SonyImageHeight', Format: 'int16u' },
    //0x00a8: { Name: 'SonyImageWidth2', Format: 'int16u' },
    //0x00ac: { Name: 'SonyImageHeight2', Format: 'int16u' },
    //0x00b8: { Name: 'SonyImageWidth2', Format: 'int16u' },
    //0x00bc: { Name: 'SonyImageHeight2', Format: 'int16u' },
    //0x00c8: { Name: 'SonyImageWidth', Format: 'int16u' },
    //0x00cc: { Name: 'SonyImageHeight', Format: 'int16u' },
    0x01b6: { %sonyDateTime2010, Groups: { 2: 'Time' } },
    //0x0204: { Name: 'SonyImageWidth', Format: 'int16u' },
    //0x0206: { Name: 'SonyImageHeight', Format: 'int16u' },
    0x04b4: {
        Name: 'MeterInfo',
        Format: 'int32u[486]',
        Unknown: 1,
        SubDirectory: { TagTable: 'Image::ExifTool::Sony::MeterInfo' },
    },
    0x1128: { %releaseMode2010 },
    0x112c: { %releaseMode2 },
    0x113e: { %gain2010 },
    0x1140: { %brightnessValue2010 },
    0x1144: { %dynamicRangeOptimizer2010 },
    0x1148: { %hdr2010 },
    0x114c: { %exposureComp2010 },
    0x1167: { %pictureEffect2010 },
    0x1174: { %quality2010 },
    0x1178: { %meteringMode2010 },     //1154
    0x1179: { %exposureProgram2010 },
    0x1180: { Name: 'WB_RGBLevels', Format: 'int16u[3]' },
    //0x1a08: { Name: 'SonyImageWidth', Format: 'int16u' },
    //0x1a0c: { Name: 'SonyImageHeight', Format: 'int16u' },
);

%Image::ExifTool::Sony::Tag2010c = ( //12
    PROCESS_PROC: \&ProcessEnciphered,
    WRITE_PROC: \&WriteEnciphered,
    CHECK_PROC: \&Image::ExifTool::CheckBinaryData,
    FORMAT: 'int8u',
    NOTES: 'Valid for SLT-A37/A57 and NEX-F3.',
    WRITABLE: 1,
    FIRST_ENTRY: 0,
    PRIORITY: 0,
    GROUPS: { 0: 'MakerNotes', 2: 'Image' },
    0x0000: { %sequenceImageNumber }, //PH
    0x0004: { %sequenceFileNumber }, //PH
    0x0008: { %releaseMode2, Format: 'int32u' },
    //0x0048: { Name: 'SonyImageWidth3', Format: 'int16u' },
    //0x004c: { Name: 'SonyImageHeight3', Format: 'int16u' },
    //0x0058: { Name: 'SonyImageWidth2', Format: 'int16u' },
    //0x005c: { Name: 'SonyImageHeight2', Format: 'int16u' },
    //0x0068: { Name: 'SonyImageWidth', Format: 'int16u' },
    //0x006c: { Name: 'SonyImageHeight', Format: 'int16u' },
    //0x00c0: { Name: 'SonyImageWidth2', Format: 'int16u' },
    //0x00c4: { Name: 'SonyImageHeight2', Format: 'int16u' },
    //0x00d0: { Name: 'SonyImageWidth2', Format: 'int16u' },
    //0x00d4: { Name: 'SonyImageHeight2', Format: 'int16u' },
    //0x00e0: { Name: 'SonyImageWidth', Format: 'int16u' },
    //0x00e4: { Name: 'SonyImageHeight', Format: 'int16u' },
    //0x0134: { Name: 'SonyImageHeight', Format: 'int16u' },
    //0x0144: { Name: 'SonyImageHeight', Format: 'int16u' },
    //0x0154: { Name: 'SonyImageHeight', Format: 'int16u' },
    0x0200: { Name: 'DigitalZoomRatio', ValueConv: '$val/16', ValueConvInv: '$val*16' },
    0x0210: { %sonyDateTime2010, Groups: { 2: 'Time' } },
    0x0490: {
        Name: 'MeterInfo',
        Format: 'int32u[486]',
        Unknown: 1,
        SubDirectory: { TagTable: 'Image::ExifTool::Sony::MeterInfo' },
    },
    0x1104: { %releaseMode2010 },
    0x1108: { %releaseMode2 },
    0x111a: { %gain2010 },
    0x111c: { %brightnessValue2010 },
    0x1120: { %dynamicRangeOptimizer2010 },
    0x1124: { %hdr2010 },
    0x1128: { %exposureComp2010 },
    0x1143: { %pictureEffect2010 },
    0x1150: { %quality2010 },
    0x1154: { %meteringMode2010 },
    0x1155: { %exposureProgram2010 },
    0x115c: { Name: 'WB_RGBLevels', Format: 'int16u[3]' },
    //0x1a08: { Name: 'SonyImageWidth', Format: 'int16u' },
    //0x1a0c: { Name: 'SonyImageHeight', Format: 'int16u' },
);

%Image::ExifTool::Sony::Tag2010d = ( //12
    PROCESS_PROC: \&ProcessEnciphered,
    WRITE_PROC: \&WriteEnciphered,
    CHECK_PROC: \&Image::ExifTool::CheckBinaryData,
    FORMAT: 'int8u',
    NOTES: q{
        Valid for DSC-HX10V/HX20V/HX200V/TX66/TX200V/TX300V/WX50/WX100/WX150, but
        not valid for panorama images.
    },
    WRITABLE: 1,
    FIRST_ENTRY: 0,
    PRIORITY: 0,
    GROUPS: { 0: 'MakerNotes', 2: 'Image' },
    0x0000: { %sequenceImageNumber }, //PH
    0x0004: { %sequenceFileNumber }, //PH
    0x0008: { %releaseMode2, Format: 'int32u' },
    //0x0048: { Name: 'SonyImageWidth3', Format: 'int16u' },
    //0x004c: { Name: 'SonyImageHeight3', Format: 'int16u' },
    //0x0058: { Name: 'SonyImageWidth2', Format: 'int16u' },
    //0x005c: { Name: 'SonyImageHeight2', Format: 'int16u' },
    //0x0068: { Name: 'SonyImageWidth', Format: 'int16u' },
    //0x006c: { Name: 'SonyImageHeight', Format: 'int16u' },
    //0x00c0: { Name: 'SonyImageWidth2', Format: 'int16u' },
    //0x00c4: { Name: 'SonyImageHeight2', Format: 'int16u' },
    //0x00d0: { Name: 'SonyImageWidth2', Format: 'int16u' },
    //0x00d4: { Name: 'SonyImageHeight2', Format: 'int16u' },
    //0x00e0: { Name: 'SonyImageWidth', Format: 'int16u' },
    //0x00e4: { Name: 'SonyImageHeight', Format: 'int16u' },
    0x01fe: { %sonyDateTime2010, Groups: { 2: 'Time' } },
    0x050c: {
        Name: 'MeterInfo',
        Format: 'int32u[486]',
        Unknown: 1,
        SubDirectory: { TagTable: 'Image::ExifTool::Sony::MeterInfo' },
    },
    0x1180: { %releaseMode2010 },
    0x1184: { %releaseMode2 },
    0x1196: { %gain2010 },
    0x1198: { %brightnessValue2010 },
    0x119c: { %dynamicRangeOptimizer2010 },
    0x11a0: { %hdr2010 },
    0x11bf: { %pictureEffect2010 },
    0x11d0: { %meteringMode2010 },
    // 0x11d1 - not valid for HX20V panorama images - PH
    0x11d1: { %exposureProgram2010 },
    0x11d8: { Name: 'WB_RGBLevels', Format: 'int16u[3]' },
);

%Image::ExifTool::Sony::Tag2010e = ( //12
    PROCESS_PROC: \&ProcessEnciphered,
    WRITE_PROC: \&WriteEnciphered,
    CHECK_PROC: \&Image::ExifTool::CheckBinaryData,
    FORMAT: 'int8u',
    NOTES: q{
        Valid for SLT-A58/A99, ILCE-3000, NEX-3N/5R/5T/6/VG30E/VG900, DSC-RX100,
        DSC-RX1/RX1R. Also valid for DSC-HX300/HX50V/TX30/WX60/WX200/WX300, but not
        for panorama images.
    },
    WRITABLE: 1,
    FIRST_ENTRY: 0,
    PRIORITY: 0,
    GROUPS: { 0: 'MakerNotes', 2: 'Image' },
    0x0000: { %sequenceImageNumber }, //PH
    0x0004: { %sequenceFileNumber }, //PH
    0x0008: { %releaseMode2, Format: 'int32u' },
    //0x0048: { Name: 'SonyImageWidth3', Format: 'int16u' },
    //0x004c: { Name: 'SonyImageHeight3', Format: 'int16u' },
    //0x0058: { Name: 'SonyImageWidth2', Format: 'int16u' },
    //0x005c: { Name: 'SonyImageHeight2', Format: 'int16u' },
    //0x0068: { Name: 'SonyImageWidth', Format: 'int16u' },
    //0x006c: { Name: 'SonyImageHeight', Format: 'int16u' },
    //0x00c0: { Name: 'SonyImageWidth2', Format: 'int16u' },
    //0x00c4: { Name: 'SonyImageHeight2', Format: 'int16u' },
    //0x00d0: { Name: 'SonyImageWidth2', Format: 'int16u' },
    //0x00d4: { Name: 'SonyImageHeight2', Format: 'int16u' },
    //0x00e0: { Name: 'SonyImageWidth', Format: 'int16u' },
    //0x00e4: { Name: 'SonyImageHeight', Format: 'int16u' },
    //0x01fa: { Name: 'SonyImageHeight', Format: 'int16u' },
    //0x0200: { Name: 'SonyImageWidth', Format: 'int16u' },
    0x021c: { Name: 'DigitalZoomRatio', ValueConv: '$val/16', ValueConvInv: '$val*16' },
    0x022c: { %sonyDateTime2010, Groups: { 2: 'Time' } },
    0x04b8: {
        Name: 'MeterInfo',
        Format: 'int32u[486]',
        Unknown: 1,
        SubDirectory: { TagTable: 'Image::ExifTool::Sony::MeterInfo' },
    },
    0x115c: { %releaseMode2010 },
    0x1160: { %releaseMode2 },
    0x1172: { %gain2010 },
    0x1174: { %brightnessValue2010 },
    0x1178: { %dynamicRangeOptimizer2010 },
    0x117c: { %hdr2010 },
    0x1180: { %exposureComp2010 },
    0x119b: { %pictureEffect2010 },
    0x11a8: { %quality2010 },
    0x11ac: { %meteringMode2010 },
    0x11ad: { %exposureProgram2010 },
    0x11b4: { Name: 'WB_RGBLevels', Format: 'int16u[3]' },
    0x1278: {
        Condition: '$$self{Model} =~ /^(SLT-A58|NEX-3N|ILCE-3000)\b/',
        Name: 'FocalLength',
        Format: 'int16u',
        ValueConv: '$val / 10',
        ValueConvInv: '$val * 10',
        PrintConv: 'sprintf("%.1f mm",$val)',
        PrintConvInv: '$val =~ / ?mm//; $val',
    },
    0x127a: {
        Condition: '$$self{Model} =~ /^(SLT-A58|NEX-3N|ILCE-3000)\b/',
        Name: 'MinFocalLength',
        Format: 'int16u',
        ValueConv: '$val / 10',
        ValueConvInv: '$val * 10',
        PrintConv: 'sprintf("%.1f mm",$val)',
        PrintConvInv: '$val =~ / ?mm//; $val',
    },
    0x127c: { // may give 0 for fixed focal length lenses
        Condition: '$$self{Model} =~ /^(SLT-A58|NEX-3N|ILCE-3000)\b/',
        Name: 'MaxFocalLength',
        Format: 'int16u',
        RawConv: '$val || undef',
        ValueConv: '$val / 10',
        ValueConvInv: '$val * 10',
        PrintConv: 'sprintf("%.1f mm",$val)',
        PrintConvInv: '$val =~ / ?mm//; $val',
    },
    //0x1914: { Name: 'SonyImageWidth', Format: 'int16u' },
    //0x1918: { Name: 'SonyImageHeight', Format: 'int16u' },
    //0x192e: { Name: 'SonyImageWidth', Format: 'int16u' },
    //0x1930: { Name: 'SonyImageHeight', Format: 'int16u' },
);

%Image::ExifTool::Sony::Tag2010f = ( //12
    PROCESS_PROC: \&ProcessEnciphered,
    WRITE_PROC: \&WriteEnciphered,
    CHECK_PROC: \&Image::ExifTool::CheckBinaryData,
    FORMAT: 'int8u',
    NOTES: 'Valid for DSC-RX100M2, DSC-QX10/QX100.',
    WRITABLE: 1,
    FIRST_ENTRY: 0,
    PRIORITY: 0,
    GROUPS: { 0: 'MakerNotes', 2: 'Image' },
    0x0004: { %releaseMode2, Format: 'int32u' }, // NOT at offset 0x08 !
    //0x002e: { Name: 'SonyImageWidth3', Format: 'int16u' },
    //0x0042: { Name: 'SonyImageWidth3', Format: 'int16u' },
    0x01e0: {
        Name: 'MeterInfo',
        Format: 'int32u[486]',
        Unknown: 1,
        SubDirectory: { TagTable: 'Image::ExifTool::Sony::MeterInfo' },
    },
    0x1014: { %releaseMode2010 },
    0x1018: { %releaseMode2 },
    0x102a: { %gain2010 },
    0x102c: { %brightnessValue2010 },
    0x1030: { %dynamicRangeOptimizer2010 },
    0x1034: { %hdr2010 },
    0x1038: { %exposureComp2010 },
    0x1053: { %pictureEffect2010 },
    0x1060: { %quality2010 },
    0x1064: { %meteringMode2010 },
    0x1065: { %exposureProgram2010 },
    0x106c: { Name: 'WB_RGBLevels', Format: 'int16u[3]' },
    //0x1096: { Name: 'SonyImageWidth3', Format: 'int16u' },
    //0x10aa: { Name: 'SonyImageWidth3', Format: 'int16u' },
    0x1134: {
        Name: 'FocalLength',
        Format: 'int16u',
        ValueConv: '$val / 10',
        ValueConvInv: '$val * 10',
        PrintConv: 'sprintf("%.1f mm",$val)',
        PrintConvInv: '$val =~ / ?mm//; $val',
    },
    0x1136: {
        Name: 'MinFocalLength',
        Format: 'int16u',
        ValueConv: '$val / 10',
        ValueConvInv: '$val * 10',
        PrintConv: 'sprintf("%.1f mm",$val)',
        PrintConvInv: '$val =~ / ?mm//; $val',
    },
    0x1138: {
        Name: 'MaxFocalLength',
        Format: 'int16u',
        ValueConv: '$val / 10',
        ValueConvInv: '$val * 10',
        PrintConv: 'sprintf("%.1f mm",$val)',
        PrintConvInv: '$val =~ / ?mm//; $val',
    },
    //0x1914: { Name: 'SonyImageWidth', Format: 'int16u' },
    //0x1918: { Name: 'SonyImageHeight', Format: 'int16u' },
    //0x192e: { Name: 'SonyImageWidth', Format: 'int16u' },
    //0x1930: { Name: 'SonyImageHeight', Format: 'int16u' },
);

%Image::ExifTool::Sony::Tag2010g = ( //12
    PROCESS_PROC: \&ProcessEnciphered,
    WRITE_PROC: \&WriteEnciphered,
    CHECK_PROC: \&Image::ExifTool::CheckBinaryData,
    FORMAT: 'int8u',
    NOTES: 'Valid for DSC-RX10/HX60V/HX400V, ILCE-7/7R/5000/6000.',
    WRITABLE: 1,
    FIRST_ENTRY: 0,
    PRIORITY: 0,
    GROUPS: { 0: 'MakerNotes', 2: 'Image' },
    0x0004: { %releaseMode2, Format: 'int32u' }, // NOT at offset 0x08 !
    0x020c: { %releaseMode2010 },
    0x0210: { %releaseMode2 },
    0x0222: { %gain2010 },
    0x0224: { %brightnessValue2010 },
    0x0228: { %dynamicRangeOptimizer2010 },
    0x022c: { %hdr2010 },
    0x0230: { %exposureComp2010 },
    0x024b: { %pictureEffect2010 },
    0x0258: { %quality2010 },
    0x025c: { %meteringMode2010 },
    0x025d: { %exposureProgram2010 },
    0x0264: { Name: 'WB_RGBLevels', Format: 'int16u[3]' },
    0x032c: {
        Name: 'FocalLength',
        Format: 'int16u',
        ValueConv: '$val / 10',
        ValueConvInv: '$val * 10',
        PrintConv: 'sprintf("%.1f mm",$val)',
        PrintConvInv: '$val =~ / ?mm//; $val',
    },
    0x032e: {
        Name: 'MinFocalLength',
        Format: 'int16u',
        ValueConv: '$val / 10',
        ValueConvInv: '$val * 10',
        PrintConv: 'sprintf("%.1f mm",$val)',
        PrintConvInv: '$val =~ / ?mm//; $val',
    },
    0x0330: { // may give 0 for fixed focal length lenses
        Name: 'MaxFocalLength',
        Format: 'int16u',
        RawConv: '$val || undef',
        ValueConv: '$val / 10',
        ValueConvInv: '$val * 10',
        PrintConv: 'sprintf("%.1f mm",$val)',
        PrintConvInv: '$val =~ / ?mm//; $val',
    },
    0x0388: {
        Name: 'MeterInfo',
        Format: 'int32u[486]',
        Unknown: 1,
        SubDirectory: { TagTable: 'Image::ExifTool::Sony::MeterInfo' },
    },
);
*/