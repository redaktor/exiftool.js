// exiftool.js/makernotes/canon

// summary:
//    Makernotes for the following Makes :
//    'Canon'

// description:
//    ported from http://www.sno.phy.queensu.ca/~phil/exiftool/TagNames/Canon.html

// returns:
//    a makernote object for exiftool.js and redaktor/meta

/* TODO : 
// - CustomFunctions/CustomFunctionsEOS (cam specific)
// - DustRemovalData 
// - FlashBits
// - FileNumber /_ShutterCount

// - Cam specific CameraInfo:
// FIXME: arrays for some EOS models are too short - we currently return an error

*/

var MainRef = require('../exif').ref;

exports.info = {
	
	tags : {
		0x000d: 'CameraInfo',
		
		0x000c: 'SerialNumber', /* models see Canon.pm : "0xa =>" */
		0xa431: 'SerialNumber', 
		0x0096: 'SerialNumber', /* EOS 5D only */
		0x0096: 'InternalSerialInfo',
		0x4019:	'LensInternalSerialInfo',
		0x0015: 'SerialNumberFormat',
		0x0028: 'ImageUniqueID',
		
		0x0001: 'CameraSettings', 
		0x0002: 'FocalLength', 
		0x0003: 'CanonFlashInfo', 
		0x0004: 'ShotInfo', 
		0x0005: 'Panorama', 
		0x0006: 'ImageType', 
		0x0007: 'FirmwareVersion', 
		0x0008: 'FileNumber', 
		0x0009: 'OwnerName', 
		/*TODO 0x000a: 'UnknownD30', */
		0x001c: 'DateStampMode',
		0x000e:	'CanonFileLength',
		/* TODO 0x000f: 'CustomFunctionsDeprecated', */
		0x0010: 'ModelID', 
		0x0011: 'MovieInfo',
		0x0012: 'AFInfo', 
		0x0013: 'ThumbnailImageValidArea', 
		0x001a: 'SuperMacro',
		0x0024: 'Categories', 
		0x0024: 'FaceDetect1',
		0x0025: 'FaceDetect2',
		0x0026: 'AFInfo2', 
		0x0027: 'ContrastInfo',
		0x002f: 'FaceDetect3',
		0x0035: 'TimeInfo',
		0x0081: 'RawDataOffset',
		0x0083: 'OriginalDecisionDataOffset', 
		0x0090:	'CustomFunctions1D',
		0x0091:	'PersonalFunctions',
		0x0092:	'PersonalFunctionsValues',
		0x0093:	'FileInfo',
		0x0094:	'AFPointsInFocus1D',
		0x0095: 'LensModel',
		/* 0x0097: '_IFDpointer_DustRemovalData', */
		0x0098: 'CropInfo',
		/*TODO  0x0099: 'CustomFunctions', */
		0x009a: 'AspectInfo',
		0x00a0: 'ProcessingInfo',
		0x00a1: 'ToneCurve',
		0x00a2: 'Sharpness',
		0x00a3: 'SharpnessFreqTable',
		0x00a4: 'WhiteBalanceTable', 
		0x00a9: 'ColorBalance',
		0x00aa: 'MeasuredColor', 
		0x00ae: 'ColorTemperature',
		0x00b0: 'Flags',
		0x00b1: 'ModifiedInfo',
		/*TODO
		0x00b2: 'ToneCurveMatching',
		0x00b3: 'WhiteBalanceMatching',
		0xb6 => {
			Name => 'PreviewImageInfo',
			SubDirectory => {
				# Note: the first word of this block gives the correct block size in bytes, but
				# the size is wrong by a factor of 2 in the IFD, so we must account for this
				Validate => 'Image::ExifTool::Canon::Validate($dirData,$subdirStart,$size/2)',
				TagTable => 'Image::ExifTool::Canon::PreviewImageInfo',
			},
		},
		*/
		0x00b4: 'ColorSpace',  
		0x00d0: 'VRDOffset', 
		0x00e0: 'SensorInfo', 
		0x4001: 'ColorData',
		0x4003: 'ColorInfo',
		0x4015: 'VignettingCorr',
		0x4016: 'VignettingCorr2',
		0x4018: 'VignettingCorr2',
		0x4020: 'AmbienceInfo',
		0x4024: 'FilterInfo'
	},
	
	ref : {
		/* helpers */
		
		CanonEV: function(n){
			if (typeof n !== 'number' && n==0) return 0;
			var f = 0;
			var m = 1;
			if ( n < 0 ) {
				n = -Math.abs(n);
				m = -1;
			}
			f = (n & 0x1f);
			n -= f;
			if ( f == 0x0c ) {
				f = (0x20 / 3);
			} else if ( f == 20 ) {
				f = (0x40 / 3);
			};
			var v = (m*(parseFloat(n+f)/0x20));
			if( typeof v !== 'number' ) v = n;
			f, m = null;
			return { value:v.toString().concat(' EV'), _val:v };
		},
		CanonAperture: function(n){
			var v = (typeof n === 'number') ? Math.round(Math.exp( exports.info.ref.CanonEV(n)._val * Math.log(2)/2 ) * 100)/100 : n;
			return (typeof n === 'number') ? { value: v.toFixed(1) , _val: n } : { value: n , _val: n };
		},
		Selftimer: 	function(val){
			if( (typeof val === 'string' && val.indexOf('Off')>-1) || (typeof val === 'number' && val == 0) ) return 'Off';
			return (typeof val !== 'number') ? val : (val / 10).toString().concat( ' s', ( (val & 0x4000) ? ', Custom' : '') );
		},
		
		Quality: {_:'n/a',0:'n/a', 1:'Economy', 2:'Normal', 3:'Fine', 4:'RAW', 5:'Superfine', 128: '640x480 Movie', 129: 'Medium Movie', 130:'Normal Movie', 137: '1280x720 Movie', 142: '1920x1080 Movie'},
		
		Size: {0:'Large', 1:'Medium', 2:'Small', 5:'Medium 1', 6:'Medium 2', 7:'Medium 3', 8:'Postcard', 9:'Widescreen', 10:'Medium Widescreen', 14:'Small 1', 15:'Small 2', 16:'Small 3', 128:'640x480 Movie', 129:'Medium Movie', 130:'Small Movie', 137:'1280x720 Movie', 142:'1920x1080 Movie'},
		
		ColorSpace: {
			1: 'sRGB',
			2: 'Adobe RGB',	
		},
		WhiteBalance: { 
			_:'ClickedOrPasted',
			0:'Auto', 
			1:'Daylight', 
			2:'Cloudy', 
			3:'Tungsten', 
			4:'Fluorescent', 
			5:'Flash', 
			6:'Custom', 
			7:'Black & White', 
			8:'Shade', 
			9:'Manual Temperature (Kelvin)',
			10:'PC Set1', 
			11:'PC Set2', 
			12:'PC Set3', 
			14:'Daylight Fluorescent',
			15:'Custom 1', 
			16:'Custom 2',  
			17:'Underwater', 
			18:'Custom 3', 
			19:'Custom 4', 
			20:'PC Set4',  
			21:'PC Set5'
		},
		PictureStyle: {
			0x0: 'None', 
			0x1: 'Standard',
			0x2: 'Portrait', 
			0x3: 'High Saturation', 
			0x4: 'Adobe RGB',
			0x5: 'Low Saturation',
			0x6: 'CM Set 1',
			0x7: 'CM Set 2', 
			0x21: 'User Def. 1', 
			0x22: 'User Def. 2', 
			0x23: 'User Def. 3',
			0x41: 'PC 1', 
			0x42: 'PC 2',
			0x43: 'PC 3',
			0x81: 'Standard',
			0x82: 'Portrait',
			0x83: 'Landscape',
			0x84: 'Neutral',
			0x85: 'Faithful',
 			0x86: 'Monochrome',
			0x87: 'Auto'
		},	
		PictureStyleInfo: {
			0: 'ContrastStandard',
			4: 'SharpnessStandard',
			8: 'SaturationStandard',
			12: 'ColorToneStandard',
			16: 'FilterEffectStandard',
			20: 'ToningEffectStandard',
			24: 'ContrastPortrait',
			28: 'SharpnessPortrait',
			32: 'SaturationPortrait',
			36: 'ColorTonePortrait',
			40: 'FilterEffectPortrait',
			44: 'ToningEffectPortrait',
			48: 'ContrastLandscape',
			52: 'SharpnessLandscape',
			56: 'SaturationLandscape',
			60: 'ColorToneLandscape',
			64: 'FilterEffectLandscape',
			68: 'ToningEffectLandscape',
			72: 'ContrastNeutral',
			76: 'SharpnessNeutral',
			80: 'SaturationNeutral',
			84: 'ColorToneNeutral',
			88: 'FilterEffectNeutral',
			92: 'ToningEffectNeutral',
			96: 'ContrastFaithful',
			100: 'SharpnessFaithful',
			104: 'SaturationFaithful',
			108: 'ColorToneFaithful',
			112: 'FilterEffectFaithful',
			116: 'ToningEffectFaithful',
			120: 'ContrastMonochrome',
			124: 'SharpnessMonochrome',
			128: 'SaturationMonochrome',
			132: 'ColorToneMonochrome',
			144: 'ContrastUserDef1',
			148: 'SharpnessUserDef1',
			152: 'SaturationUserDef1',
			156: 'ColorToneUserDef1',
			168: 'ContrastUserDef2',
			172: 'SharpnessUserDef2',
			176: 'SaturationUserDef2',
			180: 'ColorToneUserDef2',
			192: 'ContrastUserDef3',
			196: 'SharpnessUserDef3',
			200: 'SaturationUserDef3',
			204: 'ColorToneUserDef3',
		},
		PictureStyleInfo2: {
			0: 'ContrastStandard',
			4: 'SharpnessStandard',
			8: 'SaturationStandard',
			12: 'ColorToneStandard',
			16: 'FilterEffectStandard',
			20: 'ToningEffectStandard',
			24: 'ContrastPortrait',
			28: 'SharpnessPortrait',
			32: 'SaturationPortrait',
			36: 'ColorTonePortrait',
			40: 'FilterEffectPortrait',
			44: 'ToningEffectPortrait',
			48: 'ContrastLandscape',
			52: 'SharpnessLandscape',
			56: 'SaturationLandscape',
			60: 'ColorToneLandscape',
			64: 'FilterEffectLandscape',
			68: 'ToningEffectLandscape',
			72: 'ContrastNeutral',
			76: 'SharpnessNeutral',
			80: 'SaturationNeutral',
			84: 'ColorToneNeutral',
			88: 'FilterEffectNeutral',
			92: 'ToningEffectNeutral',
			96: 'ContrastFaithful',
			100: 'SharpnessFaithful',
			104: 'SaturationFaithful',
			108: 'ColorToneFaithful',
			112: 'FilterEffectFaithful',
			116: 'ToningEffectFaithful',
			120: 'ContrastMonochrome',
			124: 'SharpnessMonochrome',
			128: 'SaturationMonochrome',
			132: 'ColorToneMonochrome',
			144: 'ContrastAuto',
			148: 'SharpnessAuto',
			152: 'SaturationAuto',
			156: 'ColorToneAuto',
			168: 'ContrastUserDef1',
			172: 'SharpnessUserDef1',
			176: 'SaturationUserDef1',
			180: 'ColorToneUserDef1',
			192: 'ContrastUserDef2',
			196: 'SharpnessUserDef2',
			200: 'SaturationUserDef2',
			204: 'ColorToneUserDef2',
			216: 'ContrastUserDef3',
			220: 'SharpnessUserDef3',
			224: 'SaturationUserDef3',
			228: 'ColorToneUserDef3',
			240: { desc: 'UserDef1PictureStyle', values: {0x41: 'PC 1',0x42: 'PC 2',0x43: 'PC 3',0x81: 'Standard',0x82: 'Portrait',0x83: 'Landscape',0x84: 'Neutral',0x85: 'Faithful',0x86: 'Monochrome',0x87: 'Auto'} },
			242: { desc: 'UserDef2PictureStyle', values: {0x41: 'PC 1',0x42: 'PC 2',0x43: 'PC 3',0x81: 'Standard',0x82: 'Portrait',0x83: 'Landscape',0x84: 'Neutral',0x85: 'Faithful',0x86: 'Monochrome',0x87: 'Auto'} },
			/* TODO - jacks 5DMKII returned other values (?) */
			244: { desc: 'UserDef3PictureStyle', values: {0x41: 'PC 1',0x42: 'PC 2',0x43: 'PC 3',0x81: 'Standard',0x82: 'Portrait',0x83: 'Landscape',0x84: 'Neutral',0x85: 'Faithful',0x86: 'Monochrome',0x87: 'Auto'} },
			
		},
		UserDefStyle: {
			0x41: 'PC 1',0x42: 'PC 2',0x43: 'PC 3',0x81: 'Standard',0x82: 'Portrait',0x83: 'Landscape',0x84: 'Neutral',0x85: 'Faithful',0x86: 'Monochrome',0x87: 'Auto'
		},
		/*helpers end*/
		
		
		_IFDpointer_CameraInfo: function(n,model){
			console.log( 'CameraInfo n', n );	
			console.log( 'CameraInfo m', model );
			return {
				0x38: 'AFPointsInFocus5D'
			};
		},
		CameraInfo: function(arr){ 
			// TODO :
			return { value:'', _val:arr, err:'Not covered yet. '.concat( (arr instanceof Array) ? arr.length : '0', ' values found here.') }; 
		},
		
		SerialNumberFormat: {
			0x90000000: 'Format 1',
			0xA0000000: 'Format 2'
		},
		/* handled currently in main ...*/
		/* TODO - FIXME : 
		// redaktor.meta makes shorter Canon serials always 8digits, 
		// while exiftool.js makes it 6digits
		
		SerialNumber: function(data){
			console.log( 'Serial', data );
			// IF <9
			return (typeof data === 'number') ? { value:(1e15+data+'').slice(-8), _val:data } : { value:data, _val:data };
			// ELSE might be a scanner or so with alpha AND digits
			// should be 10 ...
		},
		*/
		SuperMacro: {
			0: 'Off',
			1: 'On (1)',
			2: 'On (2)'
		},
		DateStampMode: {
			0: 'Off',
			1: 'Date',
			2: 'Date & Time',
		},	
		MeasuredColor: function(arr){
			if ( !(arr instanceof Array) ) return  { value:arr, _val:arr };
			var mc = { 
				1: { desc: 'MeasuredRGGB', fn:function(){ return { value:arr.slice(1, 5).join(' '), _val:arr.slice(1, 5) } } }
			};
			return MainRef.multiple(arr, mc);
		},
		Categories: {
			// not always returned
			// FIXME: $val =~ s/^8
			0: 'People',
			1: 'Scenery',
			2: 'Events',
			3: 'User 1',
            4: 'User 2',
            5: 'User 3',
            6: 'To Do'
		},	
		ContrastInfo: function(arr){
			var ci = { 
				4: { desc: 'IntelligentContrast', values:{ 0x0: 'Off', 0x8: 'On', 0xffff: 'n/a' } }
			};
			return MainRef.multiple(arr, ci);
		},
		
		FileNumber: function(x, model){
			if (typeof x === 'number') x = x.toString();
			var v = x.replace(/(\d+)(\d{4})/, function(str,a,b){ return a.concat('-', b); });
			console.log( 'FileNumber', v );
			
			/* TODO - FileNumber is very model specific ... from perl:*/
			if (model.match(/\b(20D|350D|REBEL XT|Kiss Digital N)\b/)) {
				// TODO
				/*
				# Thanks to Juha Eskelinen for figuring this out:
				# [this is an odd bit mapping -- it looks like the file number exists as
				# a 16-bit integer containing the high bits, followed by an 8-bit integer
				# with the low bits.  But it is more convenient to have this in a single
				# word, so some bit manipulations are necessary... - PH]
				# The bit pattern of the 32-bit word is:
				#   31....24 23....16 15.....8 7......0
				#   00000000 ffffffff DDDDDDDD ddFFFFFF
				#     0 = zero bits (not part of the file number?)
				#     f/F = low/high bits of file number
				#     d/D = low/high bits of directory number
				# The directory and file number are then converted into decimal
				# and separated by a '-' to give the file number used in the 20D
				ValueConv => '(($val&0xffc0)>>6)*10000+(($val>>16)&0xff)+(($val&0x3f)<<8)',
				ValueConvInv => q{
					my $d = int($val/10000);
					my $f = $val - $d * 10000;
					return (($d<<6) & 0xffc0) + (($f & 0xff)<<16) + (($f>>8) & 0x3f);
				},
				PrintConv => '$_=$val,s/(\d+)(\d{4})/$1-$2/,$_',
				PrintConvInv => '$val=~s/-//g;$val',
				*/
				return { value:v, _val:x };
			} else if (model.match(/\b(30D|400D|REBEL XTi|Kiss Digital X|K236)\b/)) {
				// TODO
				/*
				Notes => q{
					the location of the upper 4 bits of the directory number is a mystery for
					the EOS 30D, so the reported directory number will be incorrect for original
					images with a directory number of 164 or greater
				},
				# Thanks to Emil Sit for figuring this out:
				# [more insane bit maniplations like the 20D/350D above, but this time we
				# appear to have lost the upper 4 bits of the directory number (this was
				# verified through tests with directory numbers 100, 222, 801 and 999) - PH]
				# The bit pattern for the 30D is: (see 20D notes above for more information)
				#   31....24 23....16 15.....8 7......0
				#   00000000 ffff0000 ddddddFF FFFFFFFF
				# [NOTE: the 4 high order directory bits don't appear in this record, but
				# I have chosen to write them into bits 16-19 since these 4 zero bits look
				# very suspicious, and are a convenient place to store this information - PH]
				ValueConv  => q{
					my $d = ($val & 0xffc00) >> 10;
					# we know there are missing bits if directory number is < 100
					$d += 0x40 while $d < 100;  # (repair the damage as best we can)
					return $d*10000 + (($val&0x3ff)<<4) + (($val>>20)&0x0f);
				},
				ValueConvInv => q{
					my $d = int($val/10000);
					my $f = $val - $d * 10000;
					return ($d << 10) + (($f>>4)&0x3ff) + (($f&0x0f)<<20);
				},
				PrintConv => '$_=$val,s/(\d+)(\d{4})/$1-$2/,$_',
				PrintConvInv => '$val=~s/-//g;$val',
				*/
				return { value:v, _val:x };
			} else if (model.match(/\b1Ds? Mark II\b/)) {
				// TODO
				/*
				{ #7 (1DmkII, 1DSmkII, 1DSmkIIN)
					Name => 'ShutterCount',
					# ref http://www.luminous-landscape.com/forum/index.php?topic=36469 :
					Notes => q{
						there are reports that the ShutterCount changed when loading a settings file
						on the 1DSmkII
					},
					Condition => '$$self{Model} =~ /\b1Ds? Mark II\b/',
					Format => 'int32u',
					ValueConv => '($val>>16)|(($val&0xffff)<<16)',
					ValueConvInv => '($val>>16)|(($val&0xffff)<<16)',
				},
				# 5D gives a single byte value (unknown)
				# 40D stores all zeros
				{ #7 (1D, 1Ds)
					Name => 'ShutterCount',
					Condition => 'GetByteOrder() eq "MM"',
					Format => 'int32u',
				},
				*/
				return { value:v, _val:x };
			} else {
				return { value:v, _val:x };
			} 
		}, 
		FileInfo: function(arr, model){
			
			var fi = {
				1: { desc: 'FileNumber', fn: function(){ return exports.info.ref.FileNumber(arr[1], model); } },
				
				3: { desc: 'BracketMode', values: {0:'Off',  1:'AEB',  2:'FEB',  3:'ISO',  4:'WB'} },
				4: { desc: 'BracketValue' },
				5: { desc: 'BracketShotNumber' },
				6: { desc: 'RawJpgQuality', values: (function(){ return exports.info.ref.Quality })() },
				7: { desc: 'RawJpgSize', values: (function(){ return exports.info.ref.Size })() },
				8: { desc: 'LongExposureNoiseReduction2', values: { 0:'Off',  1:'On (1D)',  3:'On',  4:'Auto'} },
				9: { desc: 'WBBracketMode', values: {0:'Off',  1:'On (shift AB)',  2:'On (shift GM)'} },
				12: { desc: 'WBBracketValueAB' },
				13: { desc: 'WBBracketValueGM' },
				14: { desc: 'FilterEffect', values: {0:'None',  1:'Yellow',  2:'Orange',  3:'Red',  4:'Green'} },
				15: { desc: 'ToningEffect', values: {0:'None',  1:'Sepia',  2:'Blue',  3:'Purple',  4:'Green'} },
				16: { desc: 'MacroMagnification' },
				19: { desc: 'LiveViewShooting', values: {0:'Off',  1:'On'} },
				/* 655.345 is where infinity begins ;) */ 
				20: { desc: 'FocusDistanceUpper', fn:function(){ return MainRef.distance( (arr[20]/100), 655.345); } },
				21: { desc: 'FocusDistanceLower', fn:function(){ return MainRef.distance( (arr[21]/100), 655.345); } },
				25: { desc: 'FlashExposureLock', values: {0:'Off',  1:'On'} }
			}
			return MainRef.multiple(arr, fi);
		},
		
		_IFDpointer_DustRemovalData: {
			0x00: 'Version',
			0x01: 'LensInternalSerialInfo',
			0x02: 'AVValue',
			0x03: 'POValue',
			0x04: 'DustCount',
			0x06: 'FocalLength',
			0x08: 'LensID',
			0x0a: 'Width',
			0x0c: 'Height',
			0x0e: 'RAW_Width',
			0x10: 'RAW_Height',
			0x12: 'PixelPitch [um]',
			0x14: 'LpfDistance [mm]',
			0x16: 'TopOffset',
			0x17: 'BottomOffset',
			0x18: 'LeftOffset',
			0x19: 'RightOffset',
			0x1a: 'Year',
			0x1b: 'Month',
			0x1c: 'Day',
			0x1d: 'Hour',
			0x1e: 'Minutes',
			0x1f: 'BrightDiff'		
		},
		
		FaceDetect1: function(arr){
			if ( !(arr instanceof Array) ) return  { value:arr, _val:arr };
			var s2 = function(i){ return { value:arr.slice(i, i+2).join(' '), _val:arr.slice(i, i+2) }; };
			var fd = { 
				2: { desc: 'FacesDetected' }, 
				3: { desc: 'FaceDetectFrameSize', fn:function(){ return s2(3); } }, 
				8: { desc: 'Face1Position', fn:function(){ return s2(8); } }, 
				10: { desc: 'Face2Position', fn:function(){ return s2(10); } }, 
				12: { desc: 'Face3Position', fn:function(){ return s2(12); } }, 
				14: { desc: 'Face4Position', fn:function(){ return s2(14); } }, 
				16: { desc: 'Face5Position', fn:function(){ return s2(16); } }, 
				18: { desc: 'Face6Position', fn:function(){ return s2(18); } }, 
				20: { desc: 'Face7Position', fn:function(){ return s2(20); } }, 
				22: { desc: 'Face8Position', fn:function(){ return s2(22); } }, 
				24: { desc: 'Face9Position', fn:function(){ return s2(24); } } };
			return MainRef.multiple(arr, fd);
		},
		FaceDetect2: function(arr){
			var fd = { 1: { desc: 'FaceWidth' }, 2: { desc: 'FacesDetected' } };
			return MainRef.multiple(arr, fd);
		},
		FaceDetect3: function(arr){
			var fd = { 3: { desc: 'FacesDetected' } };
			return MainRef.multiple(arr, fd);
		},
		
		ThumbnailImageValidArea: function(arr){
			if ( !(arr instanceof Array) ) return  { value:arr, _val:arr };
			return { value:arr.join(' '), _val:arr };
		},
		
		Panorama: function(arr){
			var pa = {
				2: {desc: 'PanoramaFrameNumber' },
				5: {desc: 'PanoramaDirection', values: {0:'Left to Right', 1:'Right to Left', 2:'Bottom to Top', 3:'Top to Bottom', 4:'2x2 Matrix (Clockwise)'}}
			};
			return MainRef.multiple(arr,pa);
		},
		
		FocalLength: function(arr){
			var fo = {
				0: {desc: 'FocalType', values: {0: 'AF', 1: 'Fixed', 2: 'Zoom'}}, 
				
				1: {desc: 'FocalLength', fn: function(){
						var v = (typeof arr[1] == 'number') ? arr[1].toFixed(1).replace('.0','') : arr[1];
						return { value:v, _val:arr[1] };
					} 
				},
				
				2: {desc: 'FocalPlaneXSize', fn: function(){
						var v = (typeof arr[2] == 'number') ? (arr[2] * 25.4 / 1000).toFixed(2).concat(' mm') : arr[2];
						return { value:v, _val:arr[2] };
					} 
				},
				3: {desc: 'FocalPlaneYSize', fn: function(){
						var v = (typeof arr[3] == 'number') ? (arr[3] * 25.4 / 1000).toFixed(2).concat(' mm') : arr[3];
						return { value:v, _val:arr[3] };
					} 
				},
			};
			return MainRef.multiple(arr,fo);
		},
		
		AFInfo: function(arr){
			var af = {
				0: { desc: 'NumAFPoints' },
				1: { desc: 'ValidAFPoints' },	
				2: { desc: 'CanonImageWidth', fn: function(){ return MainRef.px(arr[2]); } },	
				3: { desc: 'CanonImageHeight', fn: function(){ return MainRef.px(arr[3]); } },	
				4: { desc: 'AFImageWidth', fn: function(){ return MainRef.px(arr[4]); } },	
				5: { desc: 'AFImageHeight', fn: function(){ return MainRef.px(arr[5]); } },		
				6: { desc: 'AFAreaWidth', fn: function(){ return MainRef.px(arr[6]); } },	
				7: { desc: 'AFAreaHeight', fn: function(){ return MainRef.px(arr[7]); } },		
				8: { desc: 'AFAreaXPositions' },
				9: { desc: 'AFAreaYPositions' },
				10: { desc: 'AFPointsInFocus' /* TODO bitmask */ },
				11: { desc: 'PrimaryAFPoint' },
				12: { desc: 'PrimaryAFPoint' }
			};
			return MainRef.multiple(arr,af);
		},
		AFInfo2: function(arr){
			if ( !(arr instanceof Array) ) return  { value:arr, _val:arr };
			var af2 = {
				0: { desc: 'AFInfoSize' },
				1: { desc: 'AFAreaMode', values: { 0: 'Off (Manual Focus)', 2: 'Single-point AF', 4: 'Multi-point AF or AI AF', 5: 'Face Detect AF', 6: 'Face + Tracking', 7: 'Zone AF', 8: 'AF Point Expansion', 9: 'Spot AF', 11: 'Flexizone Multi', 13: 'Flexizone Single'} 
				},
				2: { desc: 'NumAFPoints' },
				3: { desc: 'ValidAFPoints' },	
				4: { desc: 'CanonImageWidth', fn: function(){ return MainRef.px(arr[4]); } },	
				5: { desc: 'CanonImageHeight', fn: function(){ return MainRef.px(arr[5]); } },	
				6: { desc: 'AFImageWidth', fn: function(){ return MainRef.px(arr[6]); } },	
				7: { desc: 'AFImageHeight', fn: function(){ return MainRef.px(arr[7]); } },		
				8: { desc: 'AFAreaWidths', fn:function(){ return arr.slice(8,17).join(' '); }  },
				9: { desc: 'AFAreaHeights', fn:function(){ return arr.slice(17,26).join(' '); }  },	
				/* TODO - bitmasks and signed ints
				10: { desc: 'AFAreaXPositions', },
				11: { desc: 'AFAreaYPositions', },
				44: { desc: 'AFPointsInFocus' },
				45: { desc: 'AFPointsSelected' },
				46: { desc: 'PrimaryAFPoint' }
				*/
			};
			return MainRef.multiple(arr,af2);
		},
		
		CameraSettings: function(arr){
			var cs = {
				/* These are valid for all Canon cameras. 
				// Model specific values can be found below in 'camInfos' and 'references'
				*/
				1: { desc: 'MacroMode', values: {0: 'Unknown (0)', 1: 'Macro', 2: 'Normal'} },
				
				2: { desc: 'SelfTimer', fn:function(){ return exports.info.ref.Selftimer(arr[2]) }  },
				
				3: { desc: 'Quality', values: (function(){ return exports.info.ref.Quality })() },
				
				4: { desc: 'CanonFlashMode', values: {_:'n/a',0:'Off', 1:'Auto', 2:'On', 3:'Red-eye reduction', 4:'Slow-sync', 5:'Red-eye reduction (Auto)', 6:'Red-eye reduction (On)', 16:'External flash'} },
				
				5: { desc: 'ContinuousDrive', values: {0:'Single', 1:'Continuous', 2:'Movie', 3:'Continuous, Speed Priority', 4:'Continuous, Low', 5:'Continuous, High', 6:'Silent Single', 9:'Single, Silent', 10:'Continuous, Silent'} },
				
				7: { desc: 'FocusMode', values: {_:'n/a', 0:'One-shot AF', 1:'AI Servo AF', 2:'AI Focus AF', 3:'Manual Focus (3)', 4:'Single', 5:'Continuous', 6:'Manual Focus (6)', 16:'Pan Focus', 256:'AF + MF', 512:'Movie Snap Focus', 519:'Movie Servo AF'} },
				
				9: { desc: 'RecordMode', values: {1:'JPEG', 2:'CRW+THM', 3:'AVI+THM', 4:'TIF', 5:'TIF+JPEG', 6:'CR2', 7:'CR2+JPEG', 9:'MOV', 10:'MP4'} },
				
				10: { desc: 'CanonImageSize', values: (function(){ return exports.info.ref.Size })() },
				
				11: { desc: 'EasyMode', 
					values: {0:'Full auto', 1:'Manual', 2:'Landscape', 3:'Fast shutter', 4:'Slow shutter', 5:'Night', 6:'Gray Scale', 7:'Sepia', 8:'Portrait', 9:'Sports', 10:'Macro', 11:'Black & White', 12:'Pan focus', 13:'Vivid', 14:'Neutral', 15:'Flash Off', 16:'Long Shutter', 17:'Super Macro', 18:'Foliage', 19:'Indoor', 20:'Fireworks', 21:'Beach', 22:'Underwater', 23:'Snow', 24:'Kids & Pets', 25:'Night Snapshot', 26:'Digital Macro', 27:'My Colors', 28:'Movie Snap', 29:'Super Macro 2', 30:'Color Accent', 31:'Color Swap', 32:'Aquarium', 33:'ISO 3200', 34:'ISO 6400', 35:'Creative Light Effect', 36:'Easy', 37:'Quick Shot', 38:'Creative Auto', 39:'Zoom Blur', 40:'Low Light', 41:'Nostalgic', 42:'Super Vivid', 43:'Poster Effect', 44:'Face Self-timer', 45:'Smile', 46:'Wink Self-timer', 47:'Fisheye Effect', 48:'Miniature Effect', 49:'High-speed Burst', 50:'Best Image Selection', 51:'High Dynamic Range', 52:'Handheld Night Scene', 53:'Movie Digest', 54:'Live View Control', 55:'Discreet', 56:'Blur Reduction', 57:'Monochrome', 58:'Toy Camera Effect', 59:'Scene Intelligent Auto', 60:'High-speed Burst HQ', 61:'Smooth Skin', 62:'Soft Focus', 257:'Spotlight', 258:'Night 2', 259:'Night+', 260:'Super Night', 261:'Sunset', 263:'Night Scene', 264:'Surface', 265:'Low Light 2'} },

				12: { desc: 'DigitalZoom', values: {0:'None', 1:'2x', 2:'4x', 3:'Other'} },
				
				13: { desc: 'Contrast', fn: function(){ 
					var r = arr[13];
					if (0x7fff===r) return { value:'n/a', _val:r };
					return (r in MainRef.Contrast) ? { value:MainRef.Contrast[r], _val:r } : { value:r, _val:r };
					}
				}, 
				
				14: { desc: 'Saturation', fn: function(){ 
					var r = arr[14];
					if (0x7fff===r) return { value:'n/a', _val:r };
					return (r in MainRef.Contrast) ? { value:MainRef.Contrast[r], _val:r } : { value:r, _val:r };
					}
				},  
				
				15: { desc: 'Sharpness', fn: function(){ 
					var r = arr[15];
					if (0x7fff===r) return { value:'n/a', _val:r };
					return { value:r, _val:r };
					}
				}, 
				
				/*TODO 16: { desc: 'CameraISO' }, */
				
				17: { desc: 'MeteringMode', fn: function(){
						var mm = {0:'Default', 1:'Spot', 2:'Average', 3:'Evaluative', 4:'Partial', 5:'Center-weighted average'};
						return (arr[17] in mm) ? { value:mm[arr[17]], _val:arr[17], priority:true } : { value:arr[17], _val:arr[17]};
					}
				},
				
				18: { desc: 'FocusRange', values: {0:'Manual', 1:'Auto', 2:'Not Known or Auto', 3:'Macro', 4:'Very Close', 5:'Close', 6:'Middle Range', 7:'Far Range', 8:'Pan Focus', 9:'Super Macro', 10:'Infinity'} },
				
				19: { desc: 'AFPoint', values: { 0:'Not Known or All', 0x2005: 'Manual AF point selection', 0x3000: 'None (MF)', 0x3001: 'Auto AF point selection', 0x3002: 'Right', 0x3003: 'Center', 0x3004: 'Left', 0x4001: 'Auto AF point selection', 0x4006: 'Face Detect' } },
				 
				20: { desc: 'CanonExposureMode', values: {0: 'Easy', 1: 'Program AE', 2: 'Shutter speed priority AE', 3: 'Aperture-priority AE', 4: 'Manual', 5: 'Depth-of-field AE', 6: 'M-Dep', 7: 'Bulb'} },		
				
				22: { desc: 'LensType', fn:function(){ 
						var lt = (function(){ return exports.info.ref.LensType })();
						
						if(arr[22] in lt){
							if( typeof lt[arr[22]] === 'object' ){
								var l = { value: lt[arr[22]]._, _val:arr[22] };
								var key = Math.round(arr[23]+arr[24]+(exports.info.ref.CanonAperture(arr[26]).value*10));
								
								if( typeof key === 'number' && key in lt[arr[22]] ){
									l = { value: lt[arr[22]][key], _val:arr[22] };
								}
								
								return l;
							} else {
								return { value: lt[arr[22]], _val:arr[22] };
							}
						}
						return { value: 'n/a', _val:arr[22] };
					}
				},
				
				
				23: { desc: 'MaxFocalLength', fn: function(){ 
						var fu = (typeof arr[25] === 'number' && arr[25]>0) ? arr[25] : 1; 
						return MainRef.focal(arr[23]/fu) 
					} 
				},
				24: { desc: 'MinFocalLength', fn: function(){ 
						var fu = (typeof arr[25] === 'number' && arr[25]>0) ? arr[25] : 1; 
						return MainRef.focal(arr[24]/fu) 
					} 
				},		
				25: { desc: 'FocalUnits', fn: function(){ 
						return (typeof arr[25] === 'number' && arr[25]>0) ? arr[25].toString().concat('/mm') : '1/mm';
					} 
				},
				26: { desc: 'MaxAperture', fn: function(){ return exports.info.ref.CanonAperture(arr[26]) } },
				27: { desc: 'MinAperture', fn: function(){ return exports.info.ref.CanonAperture(arr[27]) } },
				28: { desc: 'FlashActivity', values: {_:'n/a'} }, 
				29: { desc: 'FlashBits'/* TODO: BITMASK (see main) , fn:function(){ 
						var fb = { 0: 'Manual', 1: 'TTL', 2: 'A-TTL', 3: 'E-TTL', 4: 'FP sync enabled', 7: '2nd-curtain sync used', 11: 'FP sync used', 13: 'Built-in', 14: 'External'};
						return MainRef.bitmask(arr[29], fb);
					} */
				}, 
				32: { desc: 'FocusContinuous', values: {_:'n/a', 0:'Single', 1:'Continuous', 8:'Manual'} },
				
				33: { desc: 'AESetting', values: {_:'n/a', 0:'Normal AE', 1:'Exposure Compensation', 2:'AE Lock', 3:'AE Lock + Exposure Comp.', 4:'No AE'} },
				
				34: { desc: 'ImageStabilization', values: {_:'n/a', 0:'Off', 1:'On', 2:'Shoot Only', 3:'Panning', 4:'Dynamic', 256:'Off (2)', 257:'On (2)', 258:'Shoot Only (2)', 259:'Panning (2)', 260:'Dynamic (2)'} },
				
				35: { desc: 'DisplayAperture', fn: function(){ return arr[35]/10; } }, 
				36: { desc: 'ZoomSourceWidth' }, 
				37: { desc: 'ZoomTargetWidth' },
				 
				39: { desc: 'SpotMeteringMode', values: {_:'n/a', 0:'Center', 1:'AF Point'} },
				
				40: { desc: 'PhotoEffect', values: {_:'n/a', 0:'Off', 1:'Vivid', 2:'Neutral', 3:'Smooth', 4:'Sepia', 5:'B&W', 6:'Custom', 100:'My Color Data'} },
				
				41: { desc: 'ManualFlashOutput', values: {0: 'n/a', 0x500: 'Full', 0x502: 'Medium', 0x504: 'Low', 0x7fff: 'n/a'} }, 
				
				42: { desc: 'ColorTone', values: {_:'n/a', 0:'Normal'} },
				
				46: { desc: 'SRAWQuality', values: {_:'n/a', 0:'n/a', 1:'sRAW1 (mRAW) ', 2:'sRAW2 (sRAW)'} }
			};
			return MainRef.multiple(arr,cs);
		},
		
		ShotInfo: function(arr){
			var si = {
				1: { desc:'AutoISO', fn: function(){ 
					return (typeof arr[1] === 'number') ? { value:Math.round(Math.exp(arr[1]/32*Math.log(2))*100), _val:arr[1] } : { value:0, _val:0 } 
				} }, 
				/*(actual ISO used = BaseISO * AutoISO / 100)*/ 
				2: { desc:'BaseISO', fn: function(){ 
					console.log('BaseISO', arr[2]);
					return (typeof arr[2] === 'number') ? { value:Math.round(Math.exp(arr[2]/32*Math.log(2))*100/32), _val:arr[2] } : { value:0, _val:0 } 
				} }, 
				
				3: { desc:'MeasuredEV', fn: function(){ 
					console.log('MeasuredEV', arr[3]); //199
					return (typeof arr[3] === 'number') ? { value:Math.round((arr[3]/32 + 4.99) * 100)/100, _val:arr[3] } : { value:0, _val:0 } 
				} }, 
				
				4: { desc:'TargetAperture', fn: function(){ return exports.info.ref.CanonAperture(arr[4]) } },
				
				5: { desc:'TargetExposureTime', fn: function(){ 
					if(typeof arr[5] !== 'number' || arr[5]==-32768 || arr[5]==32768) return { value:'n/a', _val:0 };
					return MainRef.expoTime( Math.exp( -Math.abs(exports.info.ref.CanonEV(arr[5])._val ) * Math.log(2) ) ) 
				} }, 
				
				6: { desc:'ExposureCompensation', fn: function(){ 
					return MainRef.decToFrac(exports.info.ref.CanonEV(arr[6])._val);
				} },
				 
				7: { desc: 'WhiteBalance', fn: function(){ 
						return (arr[7] in exports.info.ref.WhiteBalance) ? {value:exports.info.ref.WhiteBalance[arr[7]], _val:arr[7], priority:true} : {value:arr[7], _val:arr[7]};
					}
				},
							
				8: { desc: 'SlowShutter', values: {_:'n/a',0:'Off', 1:'Night Scene', 2:'On', 3:'None'} }, 
				
				9: { desc: 'SequenceNumber' }, 
				
				10: { desc: 'OpticalZoomCode', values:{8:'n/a'} }, 
				
				12: { desc: 'CameraTemperature', fn: function(){ 
					/* TODO
					// for most models this comes from subIFD CameraInfo
					// which is not done yet - this tag is the only relevant CameraInfo tag we found (yet)
					*/
					var v =  (typeof arr[12] === 'number' && arr[12]!==0) ? Math.abs(arr[12]-128).toString().concat(' C') : 'n/a';
					return { value: v, _val:arr[12] }; 
				} }, 
				
				13: { desc: 'FlashGuideNumber', fn: function(){ return (typeof arr[13] === 'number' && arr[13]!=0) ? arr[13]/32 : 0 } },  
				
				14: { desc: 'AFPointsInFocus', values: {12288:'None(MF)', 12289:'Right', 12290:'Center', 12291:'Center+Right', 12292:'Left', 12293:'Left+Right', 12294:'Left+Center', 12295:'All'} },

				15: { desc: 'FlashExposureComp', fn: function(){ 
					return MainRef.decToFrac(exports.info.ref.CanonEV(arr[15])._val) 
				} }, 
				
				16: { desc: 'AutoExposureBracketing', values: {_:'On',0:'Off', 1:'On (shot 1)', 2:'On (shot 2)', 3:'On (shot 3)'} },
				 
				17: { desc: 'AEBBracketValue', fn: function(){ return MainRef.decToFrac(exports.info.ref.CanonEV(arr[17])._val) } }, 
				
				18: { desc: 'ControlMode', values: {0:'n/a', 1:'Camera Local Control', 2:'On', 3:'Computer Remote Control'} }, 
				
				19: { desc: 'FocusDistanceUpper', fn: function(){ return (arr[19]/100) > 655.345 ? 'inf' : (arr[19]/100).toString().concat(' m') } },
				
				20: { desc: 'FocusDistanceLower', fn: function(){ return (arr[20]/100) > 655.345 ? 'inf' : (arr[20]/100).toString().concat(' m') } },
				
				21: { desc: 'FNumber', fn: function(){ return exports.info.ref.CanonAperture(arr[21]) } },
				
				22: { desc: 'ExposureTime' },
				/* TODO
				 # encoding is different for 20D and 350D (darn!)
				# (but note that encoding is the same for TargetExposureTime - PH)
				Condition => '$$self{Model} =~ /\b(20D|350D|REBEL XT|Kiss Digital N)\b/',
				Priority => 0,
				# many models write 0 here in JPEG images (even though 0 is the
				# value for an exposure time of 1 sec), but apparently a value of 0
				# is valid in a CRW image (=1s, D60 sample)
				RawConv => '($val or $$self{FILE_TYPE} eq "CRW") ? $val : undef',
				# approximate big translation table by simple calculation - PH
				ValueConv => 'exp(-Image::ExifTool::Canon::CanonEv($val)*log(2))*1000/32',
				ValueConvInv => 'Image::ExifTool::Canon::CanonEvInv(-log($val*32/1000)/log(2))',
				PrintConv => 'Image::ExifTool::Exif::PrintExposureTime($val)',
				PrintConvInv => 'Image::ExifTool::Exif::ConvertFraction($val)',
				
				# many models write 0 here in JPEG images (even though 0 is the
				# value for an exposure time of 1 sec), but apparently a value of 0
				# is valid in a CRW image (=1s, D60 sample)
				RawConv => '($val or $$self{FILE_TYPE} eq "CRW") ? $val : undef',
				# approximate big translation table by simple calculation - PH
				ValueConv => 'exp(-Image::ExifTool::Canon::CanonEv($val)*log(2))',
				ValueConvInv => 'Image::ExifTool::Canon::CanonEvInv(-log($val)/log(2))',
				PrintConv => 'Image::ExifTool::Exif::PrintExposureTime($val)',
				PrintConvInv => 'Image::ExifTool::Exif::ConvertFraction($val)',
				*/
				23: { desc: 'MeasuredEV2', fn: function(){ return (typeof arr[23] === 'number' && arr[23]!=0) ? (arr[23]/8)-6 : 0; } },
				24: { desc: 'BulbDuration', fn: function(){ return (typeof arr[24] === 'number' && arr[24]!=0) ? (arr[24]/10) : 0; } },
				
				26: { desc: 'CameraType', values: {0:'n/a', 248:'EOS High-end', 250:'Compact', 252:'EOS Mid-range', 255:'DV Camera'} }, 
				
				27: { desc: 'AutoRotate', values: {_:'n/a',0:'None', 1:'Rotate 90 CW', 2:'Rotate 180', 3:'Rotate 270 CW'} }, 
				
				28: { desc: 'NDFilter', values: {_:'n/a',0:'Off', 1:'On'} }, 
				
				29: { desc: 'SelfTimer', fn:function(){ return exports.info.ref.Selftimer(arr[29]) } },
				33: { desc: 'FlashOutput' }
			};
			return MainRef.multiple(arr,si);
		},
		
		ProcessingInfo: function(arr){
			var pr = {
				1: { desc: 'ToneCurve', values: {0:'Standard', 1:'Manual', 2:'Custom'} }, 
				2: { desc: 'Sharpness' },
				3: { desc: 'SharpnessFrequency', values: {0: 'n/a', 1: 'Lowest', 2: 'Low', 3: 'Standard', 4: 'High', 5: 'Highest'} },
				4: { desc: 'SensorRedLevel' },
				5: { desc: 'SensorBlueLevel' },
				6: { desc: 'WhiteBalanceRed' },
				7: { desc: 'WhiteBalanceBlue' },
				8: { desc: 'WhiteBalance', values: (function(){ return exports.info.ref.WhiteBalance })() },
				9: { desc: 'ColorTemperature' },
				10: { desc: 'PictureStyle', values: (function(){ return exports.info.ref.PictureStyle })() },
				11: { desc: 'DigitalGain', fn: function(){ 
					return (typeof arr[11] === 'number' && arr[11]!=0) ? { value:arr[11]*10, _val:arr[11] } : { value:0, _val:0 };
				} },
				12: { desc: 'WBShiftAB', values: {} },
				13: { desc: 'WBShiftGM', values: {} },
				
			};
			return MainRef.multiple(arr,pr);
		},
		
		SensorInfo: function(arr){
			var se = {
				1: { desc: 'SensorWidth', fn: function(){ return MainRef.px(arr[1]); } }, 
				2: { desc: 'SensorHeight', fn: function(){ return MainRef.px(arr[2]); } },
				5: { desc: 'SensorLeftBorder', fn: function(){ return MainRef.px(arr[5]); } },
				6: { desc: 'SensorTopBorder', fn: function(){ return MainRef.px(arr[6]); } },
				7: { desc: 'SensorRightBorder', fn: function(){ return MainRef.px(arr[7]); } },
				8: { desc: 'SensorBottomBorder', fn: function(){ return MainRef.px(arr[8]); } },
				9: { desc: 'BlackMaskLeftBorder', fn: function(){ return MainRef.px(arr[9]); } },
				/*note: coordinates for the area to the left or right of the image used to calculate
            the average black level*/
				10: { desc: 'BlackMaskTopBorder', fn: function(){ return MainRef.px(arr[10]); } },
				11: { desc: 'BlackMaskRightBorder', fn: function(){ return MainRef.px(arr[11]); } },
				12: { desc: 'BlackMaskBottomBorder', fn: function(){ return MainRef.px(arr[12]); } }
			};
			return MainRef.multiple(arr,se);
		},
		
		Flags: function(arr){
			var fl = { 
				1: { desc: 'ModifiedParamFlag' }
			};
			return MainRef.multiple(arr, fl);
		},
		
		ModifiedInfo: function(arr){
			var mo = { 
				1: { desc: 'ModifiedToneCurve', values: {0: 'Standard', 1: 'Manual', 2: 'Custom' } },
				2: { desc: 'ModifiedSharpness', values: {0: 'n/a', 1: 'Lowest', 2: 'Low', 3: 'Standard', 4: 'High', 5: 'Highest'} },
				3: { desc: 'ModifiedSharpnessFreq' },	
				4: { desc: 'ModifiedSensorRedLevel' }, 
				5: { desc: 'ModifiedSensorBlueLevel' },
				6: { desc: 'ModifiedWhiteBalanceRed' },
				7: { desc: 'ModifiedWhiteBalanceBlue' },
				8: { desc: 'ModifiedWhiteBalance', values:(function(){ return exports.info.ref.WhiteBalance })() }, 
				9: { desc: 'ModifiedColorTemp' },
				10: { desc: 'ModifiedPictureStyle', values:(function(){ return exports.info.ref.PictureStyle })() }, 
				11: { desc: 'ModifiedDigitalGain' } 
			};
			return MainRef.multiple(arr, mo);
		},
		
		VignettingCorr2: function(arr){
			var vi = { 
				5: { desc: 'PeripheralLightingSetting', values: {0: 'Off', 1: 'On'} },
				6: { desc: 'ChromaticAberrationSetting', values: {0: 'Off', 1: 'On'} }
			};
			return MainRef.multiple(arr, vi);
		},
		
		CustomFunctions1D: function(arr){
			/* TODO formatting functions */
			var cf = {
			0: { desc:'FocusingScreen', values:{ 0: 'Ec-N, R', 1: 'Ec-A,B,C,CII,CIII,D,H,I,L' } },
			1: { desc:'FinderDisplayDuringExposure', values:{ 0: 'Off', 1: 'On' } },
			2: { desc:'ShutterReleaseNoCFCard', values:{ 0: 'Yes', 1: 'No' } },
			3: { desc:'ISOSpeedExpansion', values:{ 0: 'No', 1: 'Yes' } },
			4: { desc:'ShutterAELButton', values:{ 0: 'AF/AE lock stop', 1: 'AE lock/AF', 2: 'AF/AF lock, No AE lock', 3: 'AE/AF, No AE lock' } },
			5: { desc:'ManualTv', values:{ 0: 'Tv=Main/Av=Control', 1: 'Tv=Control/Av=Main', 2: 'Tv=Main/Av=Main w/o lens', 3: 'Tv=Control/Av=Main w/o lens' } },
			6: { desc:'ExposureLevelIncrements', values:{ 0: '1/3-stop set, 1/3-stop comp.', 1: '1-stop set, 1/3-stop comp.', 2: '1/2-stop set, 1/2-stop comp.' } },
			7: { desc:'USMLensElectronicMF', values:{ 0: 'Turns on after one-shot AF', 1: 'Turns off after one-shot AF', 2: 'Always turned off' } },
			8: { desc:'LCDPanels', values:{ 0: 'Remain. shots/File no.', 1: 'ISO/Remain. shots', 2: 'ISO/File no.', 3: 'Shots in folder/Remain. shots' } },
			9: { desc:'AEBSequenceAutoCancel', values:{ 0: '0,-,+/Enabled', 1: '0,-,+/Disabled', 2: '-,0,+/Enabled', 3: '-,0,+/Disabled' } },
			10: { desc:'AFPointIllumination', values:{ 0: 'On', 1: 'Off', 2: 'On without dimming', 3: 'Brighter' } },
			11: { desc:'AFPointSelection', values:{ 0: 'H=AF+Main/V=AF+Command', 1: 'H=Comp+Main/V=Comp+Command', 2: 'H=Command only/V=Assist+Main', 3: 'H=FEL+Main/V=FEL+Command' } },
			12: { desc:'MirrorLockup', values:{ 0: 'Disable', 1: 'Enable' } },
			13: { desc:'AFPointSpotMetering', values:{ 0: '45/Center AF point', 1: '11/Active AF point', 2: '11/Center AF point', 3: '9/Active AF point' } },
			14: { desc:'FillFlashAutoReduction', values:{ 0: 'Enable', 1: 'Disable' } },
			15: { desc:'ShutterCurtainSync', values:{ 0: '1st-curtain sync', 1: '2nd-curtain sync' } },
			16: { desc:'SafetyShiftInAvOrTv', values:{ 0: 'Disable', 1: 'Enable' } },
			17: { desc:'AFPointActivationArea', values:{ 0: 'Single AF point', 1: 'Expanded (TTL. of 7 AF points)', 2: 'Automatic expanded (max. 13)' } },
			18: { desc:'SwitchToRegisteredAFPoint', values:{ 0: 'Assist + AF', 1: 'Assist', 2: 'Only while pressing assist' } },
			19: { desc:'LensAFStopButton', values:{ 0: 'AF stop', 1: 'AF start', 2: 'AE lock while metering', 3: 'AF point: M -> Auto / Auto -> Ctr.', 4: 'AF mode: ONE SHOT <-> AI SERVO', 5: 'IS start' } },
			20: { desc:'AIServoTrackingSensitivity', values:{ 0: 'Standard', 1: 'Slow', 2: 'Moderately slow', 3: 'Moderately fast', 4: 'Fast' } },
			21: { desc:'AIServoContinuousShooting', values:{ 0: 'Shooting not possible without focus', 1: 'Shooting possible without focus' } }
			};
			return MainRef.multiple(arr, cf);
		},
		
		PersonalFunctions: function(arr){
			var pf = {
				1: { desc:'PF0CustomFuncRegistration' }, 
				2: { desc:'PF1DisableShootingModes' }, 
				3: { desc:'PF2DisableMeteringModes' }, 
				4: { desc:'PF3ManualExposureMetering' }, 
				5: { desc:'PF4ExposureTimeLimits' }, 
				6: { desc:'PF5ApertureLimits' }, 
				7: { desc:'PF6PresetShootingModes' }, 
				8: { desc:'PF7BracketContinuousShoot' }, 
				9: { desc:'PF8SetBracketShots' }, 
				10: { desc:'PF9ChangeBracketSequence' }, 
				11: { desc:'PF10RetainProgramShift' }, 
				14: { desc:'PF13DrivePriority' }, 
				15: { desc:'PF14DisableFocusSearch' }, 
				16: { desc:'PF15DisableAFAssistBeam' }, 
				17: { desc:'PF16AutoFocusPointShoot' }, 
				18: { desc:'PF17DisableAFPointSel' }, 
				19: { desc:'PF18EnableAutoAFPointSel' }, 
				20: { desc:'PF19ContinuousShootSpeed' }, 
				21: { desc:'PF20LimitContinousShots' }, 
				22: { desc:'PF21EnableQuietOperation' }, 
				24: { desc:'PF23SetTimerLengths' }, 
				25: { desc:'PF24LightLCDDuringBulb' }, 
				26: { desc:'PF25DefaultClearSettings' }, 
				27: { desc:'PF26ShortenReleaseLag' }, 
				28: { desc:'PF27ReverseDialRotation' }, 
				29: { desc:'PF28NoQuickDialExpComp' }, 
				30: { desc:'PF29QuickDialSwitchOff' }, 
				31: { desc:'PF30EnlargementMode' }, 
				32: { desc:'PF31OriginalDecisionData' }
			};
			return MainRef.multiple(arr, pf);
		},
		
		PersonalFunctionsValues: function(arr){
			var pf = {
				1: { desc:'PF1Value' }, 
				2: { desc:'PF2Value' }, 
				3: { desc:'PF3Value' }, 
				4: { desc:'PF4ExposureTimeMin' }, 
				5: { desc:'PF4ExposureTimeMax' }, 
				6: { desc:'PF5ApertureMin' }, 
				7: { desc:'PF5ApertureMax' }, 
				8: { desc:'PF8BracketShots' }, 
				9: { desc:'PF19ShootingSpeedLow' }, 
				10: { desc:'PF19ShootingSpeedHigh' }, 
				11: { desc:'PF20MaxContinousShots' }, 
				12: { desc:'PF23ShutterButtonTime' }, 
				13: { desc:'PF23FELockTime' }, 
				14: { desc:'PF23PostReleaseTime' }, 
				15: { desc:'PF25AEMode' }, 
				16: { desc:'PF25MeteringMode' }, 
				17: { desc:'PF25DriveMode' }, 
				18: { desc:'PF25AFMode' }, 
				19: { desc:'PF25AFPointSel' }, 
				20: { desc:'PF25ImageSize' }, 
				21: { desc:'PF25WBMode' }, 
				22: { desc:'PF25Parameters' }, 
				23: { desc:'PF25ColorMatrix' }, 
				24: { desc:'PF27Value' }
			};
			return MainRef.multiple(arr, pf);
		},
		
		ModelID: { 
			0x1010000: 'PowerShot A30',
			0x1040000: 'PowerShot S300 / Digital IXUS 300 / IXY Digital 300',
			0x1060000: 'PowerShot A20',
			0x1080000: 'PowerShot A10',
			0x1090000: 'PowerShot S110 / Digital IXUS v / IXY Digital 200',
			0x1100000: 'PowerShot G2',
			0x1110000: 'PowerShot S40',
			0x1120000: 'PowerShot S30',
			0x1130000: 'PowerShot A40',
			0x1140000: 'EOS D30',
			0x1150000: 'PowerShot A100',
			0x1160000: 'PowerShot S200 / Digital IXUS v2 / IXY Digital 200a',
			0x1170000: 'PowerShot A200',
			0x1180000: 'PowerShot S330 / Digital IXUS 330 / IXY Digital 300a',
			0x1190000: 'PowerShot G3',
			0x1210000: 'PowerShot S45',
			0x1230000: 'PowerShot SD100 / Digital IXUS II / IXY Digital 30',
			0x1240000: 'PowerShot S230 / Digital IXUS v3 / IXY Digital 320',
			0x1250000: 'PowerShot A70',
			0x1260000: 'PowerShot A60',
			0x1270000: 'PowerShot S400 / Digital IXUS 400 / IXY Digital 400',
			0x1290000: 'PowerShot G5',
			0x1300000: 'PowerShot A300',
			0x1310000: 'PowerShot S50',
			0x1340000: 'PowerShot A80',
			0x1350000: 'PowerShot SD10 / Digital IXUS i / IXY Digital L',
			0x1360000: 'PowerShot S1 IS',
			0x1370000: 'PowerShot Pro1',
			0x1380000: 'PowerShot S70',
			0x1390000: 'PowerShot S60',
			0x1400000: 'PowerShot G6',
			0x1410000: 'PowerShot S500 / Digital IXUS 500 / IXY Digital 500',
			0x1420000: 'PowerShot A75',
			0x1440000: 'PowerShot SD110 / Digital IXUS IIs / IXY Digital 30a',
			0x1450000: 'PowerShot A400',
			0x1470000: 'PowerShot A310',
			0x1490000: 'PowerShot A85',
			0x1520000: 'PowerShot S410 / Digital IXUS 430 / IXY Digital 450',
			0x1530000: 'PowerShot A95',
			0x1540000: 'PowerShot SD300 / Digital IXUS 40 / IXY Digital 50',
			0x1550000: 'PowerShot SD200 / Digital IXUS 30 / IXY Digital 40',
			0x1560000: 'PowerShot A520',
			0x1570000: 'PowerShot A510',
			0x1590000: 'PowerShot SD20 / Digital IXUS i5 / IXY Digital L2',
			0x1640000: 'PowerShot S2 IS',
			0x1650000: 'PowerShot SD430 / Digital IXUS Wireless / IXY Digital Wireless',
			0x1660000: 'PowerShot SD500 / Digital IXUS 700 / IXY Digital 600',
			0x1668000: 'EOS D60',
			0x1700000: 'PowerShot SD30 / Digital IXUS i Zoom / IXY Digital L3',
			0x1740000: 'PowerShot A430',
			0x1750000: 'PowerShot A410',
			0x1760000: 'PowerShot S80',
			0x1780000: 'PowerShot A620',
			0x1790000: 'PowerShot A610',
			0x1800000: 'PowerShot SD630 / Digital IXUS 65 / IXY Digital 80',
			0x1810000: 'PowerShot SD450 / Digital IXUS 55 / IXY Digital 60',
			0x1820000: 'PowerShot TX1',
			0x1870000: 'PowerShot SD400 / Digital IXUS 50 / IXY Digital 55',
			0x1880000: 'PowerShot A420',
			0x1890000: 'PowerShot SD900 / Digital IXUS 900 Ti / IXY Digital 1000',
			0x1900000: 'PowerShot SD550 / Digital IXUS 750 / IXY Digital 700',
			0x1920000: 'PowerShot A700',
			0x1940000: 'PowerShot SD700 IS / Digital IXUS 800 IS / IXY Digital 800 IS',
			0x1950000: 'PowerShot S3 IS',
			0x1960000: 'PowerShot A540',
			0x1970000: 'PowerShot SD600 / Digital IXUS 60 / IXY Digital 70',
			0x1980000: 'PowerShot G7',
			0x1990000: 'PowerShot A530',
			0x2000000: 'PowerShot SD800 IS / Digital IXUS 850 IS / IXY Digital 900 IS',
			0x2010000: 'PowerShot SD40 / Digital IXUS i7 / IXY Digital L4',
			0x2020000: 'PowerShot A710 IS',
			0x2030000: 'PowerShot A640',
			0x2040000: 'PowerShot A630',
			0x2090000: 'PowerShot S5 IS',
			0x2100000: 'PowerShot A460',
			0x2120000: 'PowerShot SD850 IS / Digital IXUS 950 IS / IXY Digital 810 IS',
			0x2130000: 'PowerShot A570 IS',
			0x2140000: 'PowerShot A560',
			0x2150000: 'PowerShot SD750 / Digital IXUS 75 / IXY Digital 90',
			0x2160000: 'PowerShot SD1000 / Digital IXUS 70 / IXY Digital 10',
			0x2180000: 'PowerShot A550',
			0x2190000: 'PowerShot A450',
			0x2230000: 'PowerShot G9',
			0x2240000: 'PowerShot A650 IS',
			0x2260000: 'PowerShot A720 IS',
			0x2290000: 'PowerShot SX100 IS',
			0x2300000: 'PowerShot SD950 IS / Digital IXUS 960 IS / IXY Digital 2000 IS',
			0x2310000: 'PowerShot SD870 IS / Digital IXUS 860 IS / IXY Digital 910 IS',
			0x2320000: 'PowerShot SD890 IS / Digital IXUS 970 IS / IXY Digital 820 IS',
			0x2360000: 'PowerShot SD790 IS / Digital IXUS 90 IS / IXY Digital 95 IS',
			0x2370000: 'PowerShot SD770 IS / Digital IXUS 85 IS / IXY Digital 25 IS',
			0x2380000: 'PowerShot A590 IS',
			0x2390000: 'PowerShot A580',
			0x2420000: 'PowerShot A470',
			0x2430000: 'PowerShot SD1100 IS / Digital IXUS 80 IS / IXY Digital 20 IS',
			0x2460000: 'PowerShot SX1 IS',
			0x2470000: 'PowerShot SX10 IS',
			0x2480000: 'PowerShot A1000 IS',
			0x2490000: 'PowerShot G10',
			0x2510000: 'PowerShot A2000 IS',
			0x2520000: 'PowerShot SX110 IS',
			0x2530000: 'PowerShot SD990 IS / Digital IXUS 980 IS / IXY Digital 3000 IS',
			0x2540000: 'PowerShot SD880 IS / Digital IXUS 870 IS / IXY Digital 920 IS',
			0x2550000: 'PowerShot E1',
			0x2560000: 'PowerShot D10',
			0x2570000: 'PowerShot SD960 IS / Digital IXUS 110 IS / IXY Digital 510 IS',
			0x2580000: 'PowerShot A2100 IS',
			0x2590000: 'PowerShot A480',
			0x2600000: 'PowerShot SX200 IS',
			0x2610000: 'PowerShot SD970 IS / Digital IXUS 990 IS / IXY Digital 830 IS',
			0x2620000: 'PowerShot SD780 IS / Digital IXUS 100 IS / IXY Digital 210 IS',
			0x2630000: 'PowerShot A1100 IS',
			0x2640000: 'PowerShot SD1200 IS / Digital IXUS 95 IS / IXY Digital 110 IS',
			0x2700000: 'PowerShot G11',
			0x2710000: 'PowerShot SX120 IS',
			0x2720000: 'PowerShot S90',
			0x2750000: 'PowerShot SX20 IS',
			0x2760000: 'PowerShot SD980 IS / Digital IXUS 200 IS / IXY Digital 930 IS',
			0x2770000: 'PowerShot SD940 IS / Digital IXUS 120 IS / IXY Digital 220 IS',
			0x2800000: 'PowerShot A495',
			0x2810000: 'PowerShot A490',
			0x2820000: 'PowerShot A3100 IS / A3150 IS',
			0x2830000: 'PowerShot A3000 IS',
			0x2840000: 'PowerShot SD1400 IS / IXUS 130 / IXY 400F',
			0x2850000: 'PowerShot SD1300 IS / IXUS 105 / IXY 200F',
			0x2860000: 'PowerShot SD3500 IS / IXUS 210 / IXY 10S',
			0x2870000: 'PowerShot SX210 IS',
			0x2880000: 'PowerShot SD4000 IS / IXUS 300 HS / IXY 30S',
			0x2890000: 'PowerShot SD4500 IS / IXUS 1000 HS / IXY 50S',
			0x2920000: 'PowerShot G12',
			0x2930000: 'PowerShot SX30 IS',
			0x2940000: 'PowerShot SX130 IS',
			0x2950000: 'PowerShot S95',
			0x2980000: 'PowerShot A3300 IS',
			0x2990000: 'PowerShot A3200 IS',
			0x3000000: 'PowerShot ELPH 500 HS / IXUS 310 HS / IXY 31S',
			0x3010000: 'PowerShot Pro90 IS',
			0x3010001: 'PowerShot A800',
			0x3020000: 'PowerShot ELPH 100 HS / IXUS 115 HS / IXY 210F',
			0x3030000: 'PowerShot SX230 HS',
			0x3040000: 'PowerShot ELPH 300 HS / IXUS 220 HS / IXY 410F',
			0x3050000: 'PowerShot A2200',
			0x3060000: 'PowerShot A1200',
			0x3070000: 'PowerShot SX220 HS',
			0x3080000: 'PowerShot G1 X',
			0x3090000: 'PowerShot SX150 IS',
			0x3100000: 'PowerShot ELPH 510 HS / IXUS 1100 HS / IXY 51S',
			0x3110000: 'PowerShot S100 (new)',
			0x3120000: 'PowerShot ELPH 310 HS / IXUS 230 HS / IXY 600F',
			0x3130000: 'PowerShot SX40 HS',
			0x3140000: 'IXY 32S',
			0x3160000: 'PowerShot A1300',
			0x3170000: 'PowerShot A810',
			0x3180000: 'PowerShot ELPH 320 HS / IXUS 240 HS / IXY 420F',
			0x3190000: 'PowerShot ELPH 110 HS / IXUS 125 HS / IXY 220F',
			0x3200000: 'PowerShot D20',
			0x3210000: 'PowerShot A4000 IS',
			0x3220000: 'PowerShot SX260 HS',
			0x3230000: 'PowerShot SX240 HS',
			0x3240000: 'PowerShot ELPH 530 HS / IXUS 510 HS / IXY 1',
			0x3250000: 'PowerShot ELPH 520 HS / IXUS 500 HS / IXY 3',
			0x3260000: 'PowerShot A3400 IS',
			0x3270000: 'PowerShot A2400 IS',
			0x3280000: 'PowerShot A2300',
			0x3330000: 'PowerShot G15',
			0x3340000: 'PowerShot SX50',
			0x3350000: 'PowerShot SX160 IS',
			0x3360000: 'PowerShot S110 (new)',
			0x3370000: 'PowerShot SX500 IS',
			0x3380000: 'PowerShot N',
			0x3390000: 'IXUS 245 HS / IXY 430F',
			0x3400000: 'PowerShot SX280 HS',
			0x3410000: 'PowerShot SX270 HS',
			0x3420000: 'PowerShot A3500 IS',
			0x3430000: 'PowerShot A2600',
			0x3450000: 'PowerShot A1400',
			0x3460000: 'PowerShot ELPH 130 IS / IXUS 140 / IXY 110F',
			0x3470000: 'PowerShot ELPH 115/120 IS / IXUS 132/135 / IXY 90F/100F',
			0x3490000: 'PowerShot ELPH 330 HS / IXUS 255 HS / IXY 610F',
			0x3510000: 'PowerShot A2500',
			0x3540000: 'PowerShot G16',
			0x3550000: 'PowerShot S120',
			0x3560000: 'PowerShot SX170 IS',
			0x3580000: 'PowerShot SX510 HS',
			0x3590000: 'PowerShot S200 (new)',
			0x3600000: 'IXY 620F',
			0x3610000: 'PowerShot N100',
			0x3640000: 'PowerShot G1 X Mark II',
			0x3650000: 'PowerShot D30',
			0x3660000: 'PowerShot SX700 HS',
			0x3670000: 'PowerShot SX600 HS',
			0x3680000: 'PowerShot ELPH 140 IS / IXUS 150',
			0x3690000: 'PowerShot ELPH 135 / IXUS 145 / IXY 120',
			0x3700000: 'PowerShot ELPH 340 HS / IXUS 265 HS / IXY 630',
			0x3710000: 'PowerShot ELPH 150 IS / IXUS 155 / IXY 140',
			0x4040000: 'PowerShot G1',
			0x6040000: 'PowerShot S100 / Digital IXUS / IXY Digital',
			0x4007d673: 'DC19/DC21/DC22',
			0x4007d674: 'XH A1',
			0x4007d675: 'HV10',
			0x4007d676: 'MD130/MD140/MD150/MD160/ZR850',
			0x4007d777: 'DC50',
			0x4007d778: 'HV20',
			0x4007d779: 'DC211',
			0x4007d77a: 'HG10',
			0x4007d77b: 'HR10',
			0x4007d77d: 'MD255/ZR950',
			0x4007d81c: 'HF11',
			0x4007d878: 'HV30',
			0x4007d87c: 'XH A1S',
			0x4007d87e: 'DC301/DC310/DC311/DC320/DC330',
			0x4007d87f: 'FS100',
			0x4007d880: 'HF10',
			0x4007d882: 'HG20/HG21',
			0x4007d925: 'HF21',
			0x4007d926: 'HF S11',
			0x4007d978: 'HV40',
			0x4007d987: 'DC410/DC411/DC420',
			0x4007d988: 'FS19/FS20/FS21/FS22/FS200',
			0x4007d989: 'HF20/HF200',
			0x4007d98a: 'HF S10/S100',
			0x4007da8e: 'HF R10/R16/R17/R18/R100/R106',
			0x4007da8f: 'HF M30/M31/M36/M300/M306',
			0x4007da90: 'HF S20/S21/S200',
			0x4007da92: 'FS31/FS36/FS37/FS300/FS305/FS306/FS307',
			0x4007dda9: 'HF G25',
			0x80000001: 'EOS-1D',
			0x80000167: 'EOS-1DS',
			0x80000168: 'EOS 10D',
			0x80000169: 'EOS-1D Mark III',
			0x80000170: 'EOS 300D / Digital Rebel / Kiss Digital',
			0x80000174: 'EOS-1D Mark II',
			0x80000175: 'EOS 20D',
			0x80000176: 'EOS 450D / Digital Rebel XSi / Kiss X2',
			0x80000188: 'EOS-1Ds Mark II',
			0x80000189: 'EOS 350D / Digital Rebel XT / Kiss Digital N',
			0x80000190: 'EOS 40D',
			0x80000213: 'EOS 5D',
			0x80000215: 'EOS-1Ds Mark III',
			0x80000218: 'EOS 5D Mark II',
			0x80000219: 'WFT-E1',
			0x80000232: 'EOS-1D Mark II N',
			0x80000234: 'EOS 30D',
			0x80000236: 'EOS Digital Rebel XTi / 400D / Kiss Digital X',
			0x80000241: 'WFT-E2',
			0x80000246: 'WFT-E3',
			0x80000250: 'EOS 7D',
			0x80000252: 'EOS 500D / Rebel T1i / Kiss X3',
			0x80000254: 'EOS 1000D / Rebel XS / Kiss F',
			0x80000261: 'EOS 50D',
			0x80000269: 'EOS-1D X',
			0x80000270: 'EOS 550D / Rebel T2i / Kiss X4',
			0x80000271: 'WFT-E4',
			0x80000273: 'WFT-E5',
			0x80000281: 'EOS-1D Mark IV',
			0x80000285: 'EOS 5D Mark III',
			0x80000286: 'EOS 600D / Rebel T3i / Kiss X5',
			0x80000287: 'EOS 60D',
			0x80000288: 'EOS 1100D / Rebel T3 / Kiss X50',
			0x80000297: 'WFT-E2 II',
			0x80000298: 'WFT-E4 II',
			0x80000301: 'EOS 650D / Rebel T4i / Kiss X6i',
			0x80000302: 'EOS 6D',
			0x80000324: 'EOS-1D C',
			0x80000325: 'EOS 70D',
			0x80000326: 'EOS 700D / Rebel T5i / Kiss X7i',
			0x80000327: 'EOS 1200D / Rebel T5 / Kiss X70',
			0x80000331: 'EOS M',
			0x80000346: 'EOS 100D / Rebel SL1 / Kiss X7',
			0x80000355: 'EOS M2'	
		},
		
		LensType: {
			/* TODO - lens 27 
			// Note - composite values are in an object 
			// this is different to the original implementation
			// we use Math.round(MaxFocalLength+MinFocalLength+(MaxAperture*10)) as key !!!
			// _ is a fallback key
			
			// [notes from exiftool.pm] :
			// Note: Removed 'USM' from 'L' lenses since it is redundant - PH
			// (or is it?  Ref 32 shows 5 non-USM L-type lenses)
			// --> have relaxed this for new lenses because Canon has been
			//    consistent about keeping "USM" in the model name
			
			// Decimal values have been added to differentiate lenses which would otherwise
			// have the same LensType, and are used by the Composite LensID tag when
			// attempting to identify the specific lens model.
			*/
			
			1: 'Canon EF 50mm f/1.8',
			2: 'Canon EF 28mm f/2.8', // (3 removed in current Kamisaka list)
			3: 'Canon EF 135mm f/2.8 Soft', // 15/32
			4: { 
				_: 'Canon EF 35-105mm f/3.5-4.5 or Sigma Lens', // 28
				175: 'Canon EF 35-105mm f/3.5-4.5',
				210: 'Sigma UC Zoom 35-135mm f/4-5.6'
			},
			5: 'Canon EF 35-70mm f/3.5-4.5', // 32
			6: { 
				_: 'Canon EF 28-70mm f/3.5-4.5 or Sigma or Tokina Lens', // 32
				89: 'Tokina AF 193-2 19-35mm f/3.5-4.5',
				103: 'Sigma 18-50mm f/3.5-5.6 DC', // 23
				133: 'Canon EF 28-70mm f/3.5-4.5',
				143: 'Sigma 28-80mm f/3.5-5.6 II Macro', // 47
				178: 'Sigma 18-125mm f/3.5-5.6 DC IF ASP'
			},
			7: 'Canon EF 100-300mm f/5.6L', // 15
			8: { 
				_: 'Canon EF 100-300mm f/5.6 or Sigma or Tokina Lens', // 32
				259: 'Tokina AT-X 242 AF 24-200mm f/3.5-5.6', // 15
				374: 'Sigma 70-300mm f/4-5.6 [APO] DG Macro',
				456: 'Canon EF 100-300mm f/5.6'
				/* 15 (both APO and non-APO, ref http://u88.n24.queensu.ca/exiftool/forum/index.php/topic,2947.0.html)*/
			},
			9: { 
				_: 'Canon EF 70-210mm f/4.0 or Sigma Lens', // 32
				259: 'Sigma 55-200mm f/4-5.6 DC', // 34
				320: 'Canon EF 70-210mm f/4.0'
			},
			10: { 
				_: 'Canon EF 50mm f/2.5 Macro or Sigma Lens', // 10 (+ LSC Life Size Converter --> 70mm - PH)
				74: 'Sigma 28mm f/1.8',
				125: 'Canon EF 50mm f/2.5 Macro',
				128: 'Sigma 50mm f/2.8 EX', // 4
				168: 'Sigma 70mm f/2.8 EX DG Macro EF', // Jean-Michel Dubois
				238: 'Sigma 105mm f/2.8 Macro EX' // 15
			},
			11: 'Canon EF 35mm f/2.0', // 9
			13: 'Canon EF 15mm f/2.8 Fisheye', // 9
			14: 'Canon EF 50-200mm f/3.5-4.5L', // 32
			15: 'Canon EF 50-200mm f/3.5-4.5', // 32
			16: 'Canon EF 35-135mm f/3.5-4.5', // 32
			17: 'Canon EF 35-70mm f/3.5-4.5A', // 32
			18: 'Canon EF 28-70mm f/3.5-4.5', // 32
			20: 'Canon EF 100-200mm f/4.5A', // 32
			21: 'Canon EF 80-200mm f/2.8L',
			22: { 
				_: 'Canon EF 20-35mm f/2.8L or Tokina Lens', // 32
				83: 'Canon EF 20-35mm f/2.8L', 
				136: 'Tokina AT-X 280 AF Pro 28-80mm f/2.8 Aspherical' // 15
			},
			23: 'Canon EF 35-105mm f/3.5-4.5', // 32
			24: 'Canon EF 35-80mm f/4-5.6 Power Zoom', // 32
			25: 'Canon EF 35-80mm f/4-5.6 Power Zoom', // 32
			26: { 
				_: 'Canon EF 100mm f/2.8 Macro or Other Lens',
				114: 'Carl Zeiss Planar T* 50mm f/1.4', // PH
				208: 'Tamron SP AF 90mm f/2.8 Di Macro', // 15
				228: 'Canon EF 100mm f/2.8 Macro',
				235: 'Cosina 100mm f/3.5 Macro AF',
				395: 'Tamron SP AF 180mm f/3.5 Di Macro' // 15
			},
			27: 'Canon EF 35-80mm f/4-5.6', // 32
			// 27: 'Carl Zeiss Distagon T* 28mm f/2 ZF', // PH (must be with an adapter, because the ZF version is a Nikon mount)
			// 27: 'EMF adapter for Canon EOS digital cameras', // 50 (reports MaxFocalLength of 65535)
			// 27: optix adapter
			28: { 
				_: 'Canon EF 80-200mm f/4.5-5.6 or Tamron Lens', // 32
				161: 'Tamron SP AF 28-105mm f/2.8 LD Aspherical IF', // 15
				131: 'Tamron SP AF 28-75mm f/2.8 XR Di LD Aspherical [IF] Macro', // 4
				266: 'Tamron AF Aspherical 28-200mm f/3.8-5.6', // 14
				320: 'Canon EF 80-200mm f/4.5-5.6',
				410: 'Tamron AF 70-300mm f/4-5.6 Di LD 1:2 Macro', // 47
				415: 'Tamron AF 70-300mm f/4.5-5.6 Di LD 1:2 Macro Zoom'
			},
			29: 'Canon EF 50mm f/1.8 II',
			30: 'Canon EF 35-105mm f/4.5-5.6', // 32
			31: { 
				_: 'Canon EF 75-300mm f/4-5.6 or Tamron Lens', // 32
				415: 'Canon EF 75-300mm f/4-5.6',
				628: 'Tamron SP AF 300mm f/2.8 LD IF' // 15
			},
			32: { 
				_: 'Canon EF 24mm f/2.8 or Sigma Lens', // 10
				58: 'Sigma 15mm f/2.8 EX Fisheye', // 11
				76: 'Canon EF 24mm f/2.8'
			},
			33: { 
				_: 'Voigtlander or Carl Zeiss Lens',
				58: 'Carl Zeiss Distagon T* 15mm f/2.8 ZE', // PH
				70: 'Carl Zeiss Distagon T* 21mm f/2.8 ZE', // PH
				71: 'Carl Zeiss Distagon T* 18mm f/3.5 ZE', // PH
				75: 'Voigtlander Color Skopar 20mm f/3.5 SLII Aspherical', // 50
				76: 'Carl Zeiss Distagon T* 28mm f/2 ZE', // PH
				90: 'Carl Zeiss Distagon T* 35mm f/2 ZE', // PH
				100: 'Voigtlander Ultron 40mm f/2.0 SLII Aspherical', // 45
				215: 'Voigtlander APO-Lanthar 90mm f/3.5 SLII Close Focus' // 50
			},
			35: 'Canon EF 35-80mm f/4-5.6', // 32
			36: 'Canon EF 38-76mm f/4.5-5.6', // 32
			37: { 
				_: 'Canon EF 35-80mm f/4-5.6 or Tamron Lens', // 32
				95: 'Tamron SP AF 17-50mm f/2.8 XR Di II VC LD Aspherical [IF]', // 34
				255: 'Canon EF 35-80mm f/4-5.6', 
				298: 'Tamron 70-200mm f/2.8 Di LD IF Macro', // PH
				363: 'Tamron AF 28-300mm f/3.5-6.3 XR Di VC LD Aspherical [IF] Macro Model A20', // 38
				323: 'Tamron AF 18-270mm f/3.5-6.3 Di II VC LD Aspherical [IF] Macro'
				/* http://u88.n24.queensu.ca/exiftool/forum/index.php/topic,2937.0.html */
			},
			38: 'Canon EF 80-200mm f/4.5-5.6', // 32
			39: 'Canon EF 75-300mm f/4-5.6',
			40: 'Canon EF 28-80mm f/3.5-5.6',
			41: 'Canon EF 28-90mm f/4-5.6', // 32
			42: { 
				_: 'Canon EF 28-200mm f/3.5-5.6 or Tamron Lens', // 32
				263: 'Canon EF 28-200mm f/3.5-5.6',
				363: 'Tamron AF 28-300mm f/3.5-6.3 XR Di VC LD Aspherical [IF] Macro Model A20' // 15
			},
			43: 'Canon EF 28-105mm f/4-5.6', // 10
			44: 'Canon EF 90-300mm f/4.5-5.6', // 32
			45: 'Canon EF-S 18-55mm f/3.5-5.6 [II]', // PH (same ID for version II, ref 20)
			46: 'Canon EF 28-90mm f/4-5.6', // 32
			48: 'Canon EF-S 18-55mm f/3.5-5.6 IS', // 20
			49: 'Canon EF-S 55-250mm f/4-5.6 IS', // 23
			50: 'Canon EF-S 18-200mm f/3.5-5.6 IS',
			51: 'Canon EF-S 18-135mm f/3.5-5.6 IS', // PH
			52: 'Canon EF-S 18-55mm f/3.5-5.6 IS II', // PH
			53: 'Canon EF-S 18-55mm f/3.5-5.6 III', // Jon Charnas
			54: 'Canon EF-S 55-250mm f/4-5.6 IS II', // 47
			94: 'Canon TS-E 17mm f/4L', // 42
			95: 'Canon TS-E 24.0mm f/3.5 L II', // 43
			124: 'Canon MP-E 65mm f/2.8 1-5x Macro Photo', // 9
			125: 'Canon TS-E 24mm f/3.5L',
			126: 'Canon TS-E 45mm f/2.8', // 15
			127: 'Canon TS-E 90mm f/2.8', // 15
			129: 'Canon EF 300mm f/2.8L', // 32
			130: 'Canon EF 50mm f/1.0L', // 10/15
			131: { 
				_: 'Canon EF 28-80mm f/2.8-4L or Sigma Lens', // 32
				37: 'Sigma 4.5mm f/2.8 EX DC HSM Circular Fisheye', // PH
				51: 'Sigma 8mm f/3.5 EX DG Circular Fisheye', // 15
				80: 'Sigma 17-35mm f/2.8-4 EX DG Aspherical HSM', // 15
				115: 'Sigma 17-70mm f/2.8-4.5 DC Macro', // PH (NC)
				136: 'Canon EF 28-80mm f/2.8-4L',
				228: 'Sigma APO 50-150mm f/2.8 [II] EX DC HSM', // 15 ([II] ref PH)
				298: 'Sigma 70-200mm f/2.8 APO EX HSM', // PH 
				448: 'Sigma APO 120-300mm f/2.8 EX DG HSM' // 15
			},
			132: 'Canon EF 1200mm f/5.6L', // 32
			134: 'Canon EF 600mm f/4L IS', // 15
			135: 'Canon EF 200mm f/1.8L',
			136: 'Canon EF 300mm f/2.8L',
			137: { 
				_: 'Canon EF 85mm f/1.2L or Sigma or Tamron Lens', // 10
				65: 'Sigma 10-20mm f/3.5 EX DC HSM', // Gerald Erdmann
				69: 'Sigma 8-16mm f/4.5-5.6 DC HSM', // 50-Zwielicht
				71: 'Sigma 18-35mm f/1.8 DC HSM', // David Monro
				95: 'Sigma 17-50mm f/2.8 OS HSM or Tamron SP 17-50mm f/2.8 XR Di II VC', // 47
				96: 'Sigma 18-50mm f/2.8-4.5 DC OS HSM', // PH
				115: 'Sigma 17-70mm f/2.8-4 DC Macro OS HSM', // http://u88.n24.queensu.ca/exiftool/forum/index.php/topic,2819.0.html 
				122: 'Sigma 24-70mm f/2.8 IF EX DG HSM or Tamron SP 24-70mm f/2.8 Di VC USD', // PH
				140: 'Tamron SP 60mm f/2 Macro Di II', // 50 (model G005)
				181: 'Sigma 18-125mm f/3.8-5.6 DC OS HSM', // PH
				182: 'Canon EF 85mm f/1.2L',
				253: 'Sigma 18-200mm f/3.5-6.3 II DC OS HSM', // PH
				290: 'Sigma 50-200mm f/4-5.6 DC OS HSM', // PH
				303: 'Sigma 18-250mm f/3.5-6.3 DC OS HSM', // PH (also Sigma 18-250mm f/3.5-6.3 DC Macro OS HSM)			
				333: 'Tamron AF 18-270mm f/3.5-6.3 Di II VC PZD'
			},
			138: 'Canon EF 28-80mm f/2.8-4L', // 32
			139: 'Canon EF 400mm f/2.8L',
			140: 'Canon EF 500mm f/4.5L', // 32
			141: 'Canon EF 500mm f/4.5L',
			142: 'Canon EF 300mm f/2.8L IS', // 15
			143: 'Canon EF 500mm f/4L IS', // 15
			144: 'Canon EF 35-135mm f/4-5.6 USM', // 26
			145: 'Canon EF 100-300mm f/4.5-5.6 USM', // 32
			146: 'Canon EF 70-210mm f/3.5-4.5 USM', // 32
			147: 'Canon EF 35-135mm f/4-5.6 USM', // 32
			148: 'Canon EF 28-80mm f/3.5-5.6 USM', // 32
			149: 'Canon EF 100mm f/2 USM', // 9
			150: { 
				_: 'Canon EF 14mm f/2.8L or Sigma Lens', // 10
				56: 'Canon EF 14mm f/2.8L', 
				58: 'Sigma 20mm EX f/1.8', // 4
				66: 'Sigma 24mm f/1.8 DG Macro EX', // 15
				74: 'Sigma 30mm f/1.4 DC HSM' // 15
			},
			151: 'Canon EF 200mm f/2.8L',
			152: { 
				_: 'Canon EF 300mm f/4L IS or Sigma Lens', // 15
				56: 'Sigma 14mm f/2.8 EX Aspherical HSM', // 15
				70: 'Sigma 10-20mm f/4-5.6', // 14
				81: 'Sigma 12-24mm f/4.5-5.6 EX DG ASPHERICAL HSM', // 15
				440: 'Sigma 100-300mm f/4.0', // (ref Bozi)
				640: 'Canon EF 300mm f/4L IS'
			},
			153: { 
				_: 'Canon EF 35-350mm f/3.5-5.6L or Sigma or Tamron Lens', // PH
				253: 'Tamron AF 18-200mm f/3.5-6.3 XR Di II LD Aspherical [IF] Macro Model A14', // 15
				303: 'Tamron 18-250mm f/3.5-6.3 Di II LD Aspherical [IF] Macro', // PH
				363: 'Tamron AF 28-300mm f/3.5-6.3 XR LD Aspherical [IF] Macro',
				420: 'Canon EF 35-350mm f/3.5-5.6L',
				590: 'Sigma 50-500mm f/4-6.3 APO HSM EX' // 15
			},
			154: 'Canon EF 20mm f/2.8 USM', // 15
			155: 'Canon EF 85mm f/1.8 USM',
			156: { 
				_: 'Canon EF 28-105mm f/3.5-4.5 USM or Tamron Lens',
				168: 'Canon EF 28-105mm f/3.5-4.5 USM', 
				410: 'Tamron SP 70-300mm f/4.0-5.6 Di VC USD' // PH (model A005)
			},
			160: { 
				_: 'Canon EF 20-35mm f/3.5-4.5 USM or Tamron or Tokina Lens',
				65: 'Tokina AT-X 116 AF Pro DX 11-16mm f/2.8', // http://u88.n24.queensu.ca/exiftool/forum/index.php/topic,3967.0.html
				72: 'Tokina AT-X 107 AF DX 10-17mm f/3.5-4.5 Fisheye', // PH (http://osdir.com/ml/digikam-devel/2011-04/msg00275.html)
				76: 'Tokina AT-X 124 AF Pro DX 12-24mm f/4.0', // 49
				89: 'Tamron AF 19-35mm f/3.5-4.5', // 44	
				90: 'Canon EF 20-35mm f/3.5-4.5 USM'			
			},
			161: { 
				_: 'Canon EF 28-70mm f/2.8L or Sigma or Tamron Lens',
				95: 'Tamron AF 17-50mm f/2.8 Di-II LD Aspherical', // 40
				112: 'Sigma 24-60mm f/2.8 EX DG', // PH 
				122: 'Sigma 24-70mm f/2.8 EX',
				126: 'Canon EF 28-70mm f/2.8L (or Sigma 28-70mm f/2.8 EX)', // PH (http://www.breezesys.com/forum/showthread.php?t=3718)
				208: 'Tamron 90mm f/2.8'
			},
			162: 'Canon EF 200mm f/2.8L', // 32
			163: 'Canon EF 300mm f/4L', // 32
			164: 'Canon EF 400mm f/5.6L', // 32
			165: 'Canon EF 70-200mm f/2.8 L',
			166: 'Canon EF 70-200mm f/2.8 L + 1.4x',
			167: 'Canon EF 70-200mm f/2.8 L + 2x',
			168: 'Canon EF 28mm f/1.8 USM', // 15
			169: { 
				_: 'Canon EF 17-35mm f/2.8L or Sigma Lens', // 15
				74: 'Sigma 30mm f/1.4 EX DC HSM', // Rodolfo Borges
				80: 'Canon EF 17-35mm f/2.8L or Sigma 15-30mm f/3.5-4.5 EX DG Aspherical', // 4
				84: 'Sigma 35mm f/1.4 DG HSM', // PH
				96: 'Sigma 18-50mm f/2.8 Macro', // 26
				114: 'Sigma 50mm f/1.4 EX DG HSM', // PH
				184: 'Sigma 85mm f/1.4 EX DG HSM', // Rolando Ruzic
				253: 'Sigma 18-200mm f/3.5-6.3 DC OS' // 23
			},
			170: 'Canon EF 200mm f/2.8L II', // 9
			171: 'Canon EF 300mm f/4L', // 15
			172: 'Canon EF 400mm f/5.6L', // 32
			173: { 
				_: 'Canon EF 180mm Macro f/3.5L or Sigma Lens', // 9
				328: 'Sigma APO Macro 150mm f/2.8 EX DG HSM', // 14
				395: 'Canon EF 180mm Macro f/3.5L (or Sigma 180mm EX HSM Macro f/3.5)' // 14
			},
			174: { 
				_: 'Canon EF 135mm f/2L or Sigma Lens', // 9
				290: 'Canon EF 135mm f/2L',
				298: 'Sigma 70-200mm f/2.8 EX DG APO OS HSM', // PH (probably version II of this lens)
				595: 'Sigma 50-500mm f/4.5-6.3 APO DG OS HSM', // http://u88.n24.queensu.ca/exiftool/forum/index.php/topic,4031.0.html
				700: 'Sigma 150-500mm f/5-6.3 APO DG OS HSM' // 47
			},
			175: 'Canon EF 400mm f/2.8L', // 32
			176: 'Canon EF 24-85mm f/3.5-4.5 USM',
			177: 'Canon EF 300mm f/4L IS', // 9
			178: 'Canon EF 28-135mm f/3.5-5.6 IS',
			179: 'Canon EF 24mm f/1.4L', // 20
			180: 'Canon EF 35mm f/1.4L', // 9
			181: 'Canon EF 100-400mm f/4.5-5.6L IS + 1.4x', // 15
			182: 'Canon EF 100-400mm f/4.5-5.6L IS + 2x',
			183: { 
				_: 'Canon EF 100-400mm f/4.5-5.6L IS or Sigma Lens',
				238: 'Sigma 105mm f/2.8 EX DG OS HSM Macro', // 50
				328: 'Sigma 150mm f/2.8 EX DG OS HSM APO Macro', // 50
				545: 'Canon EF 100-400mm f/4.5-5.6L'
			},
			184: 'Canon EF 400mm f/2.8L + 2x', // 15
			185: 'Canon EF 600mm f/4L IS', // 32
			186: 'Canon EF 70-200mm f/4L', // 9
			187: 'Canon EF 70-200mm f/4L + 1.4x', // 26
			188: 'Canon EF 70-200mm f/4L + 2x', // PH
			189: 'Canon EF 70-200mm f/4L + 2.8x', // 32
			190: 'Canon EF 100mm f/2.8 Macro',
			191: 'Canon EF 400mm f/4 DO IS', // 9
			193: 'Canon EF 35-80mm f/4-5.6 USM', // 32
			194: 'Canon EF 80-200mm f/4.5-5.6 USM', // 32
			195: 'Canon EF 35-105mm f/4.5-5.6 USM', // 32
			196: 'Canon EF 75-300mm f/4-5.6 USM', // 15/32
			197: 'Canon EF 75-300mm f/4-5.6 IS USM',
			198: { 
				_: 'Canon EF 50mm f/1.4 USM or Zeiss Lens',
				114: 'Canon EF 50mm f/1.4 USM',
				124: 'Zeiss Otus 55mm f/1.4 ZE' // Jos Roost 
			},
			199: 'Canon EF 28-80mm f/3.5-5.6 USM', // 32
			200: 'Canon EF 75-300mm f/4-5.6 USM', // 32
			201: 'Canon EF 28-80mm f/3.5-5.6 USM', // 32
			202: 'Canon EF 28-80mm f/3.5-5.6 USM IV',
			208: 'Canon EF 22-55mm f/4-5.6 USM', // 32
			209: 'Canon EF 55-200mm f/4.5-5.6', // 32
			210: 'Canon EF 28-90mm f/4-5.6 USM', // 32
			211: 'Canon EF 28-200mm f/3.5-5.6 USM', // 15
			212: 'Canon EF 28-105mm f/4-5.6 USM', // 15
			213: { 
				_: 'Canon EF 90-300mm f/4.5-5.6 USM or Tamron Lens',
				430: 'Canon EF 90-300mm f/4.5-5.6 USM',
				800: 'Tamron SP 150-600mm F/5-6.3 Di VC USD' // topic5565 (Model A011)
			},
			214: 'Canon EF-S 18-55mm f/3.5-5.6 USM', // PH/34
			215: 'Canon EF 55-200mm f/4.5-5.6 II USM',
			217: 'Tamron AF 18-270mm f/3.5-6.3 Di II VC PZD', // 47
			224: 'Canon EF 70-200mm f/2.8L IS', // 11
			225: 'Canon EF 70-200mm f/2.8L IS + 1.4x', // 11
			226: 'Canon EF 70-200mm f/2.8L IS + 2x', // 14
			227: 'Canon EF 70-200mm f/2.8L IS + 2.8x', // 32
			228: 'Canon EF 28-105mm f/3.5-4.5 USM', // 32
			229: 'Canon EF 16-35mm f/2.8L', // PH
			230: 'Canon EF 24-70mm f/2.8L', // 9
			231: 'Canon EF 17-40mm f/4L',
			232: 'Canon EF 70-300mm f/4.5-5.6 DO IS USM', // 15
			233: 'Canon EF 28-300mm f/3.5-5.6L IS', // PH
			234: 'Canon EF-S 17-85mm f4-5.6 IS USM', // 19
			235: 'Canon EF-S 10-22mm f/3.5-4.5 USM', // 15
			236: 'Canon EF-S 60mm f/2.8 Macro USM', // 15
			237: 'Canon EF 24-105mm f/4L IS', // 15
			238: 'Canon EF 70-300mm f/4-5.6 IS USM', // 15
			239: 'Canon EF 85mm f/1.2L II', // 15
			240: 'Canon EF-S 17-55mm f/2.8 IS USM', // 15
			241: 'Canon EF 50mm f/1.2L', // 15
			242: 'Canon EF 70-200mm f/4L IS', // PH
			243: 'Canon EF 70-200mm f/4L IS + 1.4x', // 15
			244: 'Canon EF 70-200mm f/4L IS + 2x', // PH
			245: 'Canon EF 70-200mm f/4L IS + 2.8x', // 32
			246: 'Canon EF 16-35mm f/2.8L II', // PH
			247: 'Canon EF 14mm f/2.8L II USM', // 32
			248: 'Canon EF 200mm f/2L IS', // 42
			249: 'Canon EF 800mm f/5.6L IS', // 35
			250: 'Canon EF 24 f/1.4L II', // 41
			251: 'Canon EF 70-200mm f/2.8L IS II USM',
			252: 'Canon EF 70-200mm f/2.8L IS II USM + 1.4x', // 50 (1.4x Mk II)
			253: 'Canon EF 70-200mm f/2.8L IS II USM + 2x', // PH (NC)
			254: 'Canon EF 100mm f/2.8L Macro IS USM', // 42
			// Note: LensType 488 (0x1e8) is reported as 232 (0xe8) in 7D CameraSettings
			488: 'Canon EF-S 15-85mm f/3.5-5.6 IS USM', // PH
			489: 'Canon EF 70-300mm f/4-5.6L IS USM', // Gerald Kapounek
			490: 'Canon EF 8-15mm f/4L USM', // Klaus Reinfeld
			491: 'Canon EF 300mm f/2.8L IS II USM', // 42
			492: 'Canon EF 400mm f/2.8L IS II USM', // PH
			493: 'Canon EF 24-105mm f/4L IS USM', // PH
			494: 'Canon EF 600mm f/4.0L IS II USM', // PH
			495: 'Canon EF 24-70mm f/2.8L II USM', // PH
			496: 'Canon EF 200-400mm f/4L IS USM', // PH
			499: 'Canon EF 200-400mm f/4L IS USM + 1.4x', // 50
			502: 'Canon EF 28mm f/2.8 IS USM', // PH
			503: 'Canon EF 24mm f/2.8 IS USM', // PH
			504: 'Canon EF 24-70mm f/4L IS USM', // PH
			505: 'Canon EF 35mm f/2 IS USM', // PH
			// (STM lenses seem to start with 0x10xx)
			4142: 'Canon EF-S 18-135mm f/3.5-5.6 IS STM',
			4143: 'Canon EF-M 18-55mm f/3.5-5.6 IS STM',
			4144: 'Canon EF 40mm f/2.8 STM', // 50
			4145: 'Canon EF-M 22mm f/2 STM', // 34
			4146: 'Canon EF-S 18-55mm f/3.5-5.6 IS STM', // PH
			4147: 'Canon EF-M 11-22mm f/4-5.6 IS STM', // 42
			4148: 'Canon EF-S 55-250mm f/4-5.6 IS STM', // 42
		},
		
		ColorCalib: { /*TODO These tags are extracted only when the Unknown option is used. ???*/ },
		ColorData: function(arr){
			if ( !(arr instanceof Array) ) return  { value:arr, _val:arr };
			/* TODO */
			var lengths = { 
				582: 1, 
				653: 2, 
				796: 3, 
				692: 4, 674: 4, 702: 4, 1227: 4, 1250: 4, 1251: 4, 1337: 4, 1338: 4, 1346: 4, 
				5120: 5, 
				1273: 6, 1275: 6, 
				1312: 7, 1313: 7, 1316: 7 
			};
			var s4 = function(i){ return { value:arr.slice(i, i+4).join(' '), _val:arr.slice(i, i+4) }; };
			var colors = {
				1: {
					25: { desc: 'WB_RGGBLevelsAsShot', fn:function(){ return s4(25); } },
					29: { desc: 'ColorTempAsShot' },
					30: { desc: 'WB_RGGBLevelsAuto', fn:function(){ return s4(30); } },
					34: { desc: 'ColorTempAuto' },
					35: { desc: 'WB_RGGBLevelsDaylight', fn:function(){ return s4(35); } },
					39: { desc: 'ColorTempDaylight' },
					40: { desc: 'WB_RGGBLevelsShade', fn:function(){ return s4(40); } },
					44: { desc: 'ColorTempShade' },
					45: { desc: 'WB_RGGBLevelsCloudy', fn:function(){ return s4(45); } },
					49: { desc: 'ColorTempCloudy' },
					50: { desc: 'WB_RGGBLevelsTungsten', fn:function(){ return s4(50); } },
					54: { desc: 'ColorTempTungsten' },
					55: { desc: 'WB_RGGBLevelsFluorescent', fn:function(){ return s4(55); } },
					59: { desc: 'ColorTempFluorescent' },
					60: { desc: 'WB_RGGBLevelsFlash', fn:function(){ return s4(60); } },
					64: { desc: 'ColorTempFlash' },
					65: { desc: 'WB_RGGBLevelsCustom1', fn:function(){ return s4(65); } },
					69: { desc: 'ColorTempCustom1' },
					70: { desc: 'WB_RGGBLevelsCustom2', fn:function(){ return s4(70); } },
					74: { desc: 'ColorTempCustom2' },
					//75: { ref: ' Canon ColorCalib Tags\n  (A, B, C, Temperature)' }	
				},
				2: {
					24: { desc: 'WB_RGGBLevelsAuto', fn:function(){ return s4(24); } },
					28: { desc: 'ColorTempAuto' },
					29: { desc: 'WB_RGGBLevelsUnknown', fn:function(){ return s4(29); } },
					33: { desc: 'ColorTempUnknown' },
					34: { desc: 'WB_RGGBLevelsAsShot', fn:function(){ return s4(34); } },
					38: { desc: 'ColorTempAsShot' },
					39: { desc: 'WB_RGGBLevelsDaylight', fn:function(){ return s4(39); } },
					43: { desc: 'ColorTempDaylight' },
					44: { desc: 'WB_RGGBLevelsShade', fn:function(){ return s4(44); } },
					48: { desc: 'ColorTempShade' },
					49: { desc: 'WB_RGGBLevelsCloudy', fn:function(){ return s4(49); } },
					53: { desc: 'ColorTempCloudy' },
					54: { desc: 'WB_RGGBLevelsTungsten', fn:function(){ return s4(54); } },
					58: { desc: 'ColorTempTungsten' },
					59: { desc: 'WB_RGGBLevelsFluorescent', fn:function(){ return s4(59); } },
					63: { desc: 'ColorTempFluorescent' },
					64: { desc: 'WB_RGGBLevelsKelvin', fn:function(){ return s4(64); } },
					68: { desc: 'ColorTempKelvin' },
					69: { desc: 'WB_RGGBLevelsFlash', fn:function(){ return s4(69); } },
					73: { desc: 'ColorTempFlash' },
					74: { desc: 'WB_RGGBLevelsUnknown2', fn:function(){ return s4(74); } },
					78: { desc: 'ColorTempUnknown2' },
					79: { desc: 'WB_RGGBLevelsUnknown3', fn:function(){ return s4(79); } },
					83: { desc: 'ColorTempUnknown3' },
					84: { desc: 'WB_RGGBLevelsUnknown4', fn:function(){ return s4(84); } },
					88: { desc: 'ColorTempUnknown4' },
					89: { desc: 'WB_RGGBLevelsUnknown5', fn:function(){ return s4(89); } },
					93: { desc: 'ColorTempUnknown5' },
					94: { desc: 'WB_RGGBLevelsUnknown6', fn:function(){ return s4(94); } },
					98: { desc: 'ColorTempUnknown6' },
					99: { desc: 'WB_RGGBLevelsUnknown7', fn:function(){ return s4(99); } },
					103: { desc: 'ColorTempUnknown7' },
					104: { desc: 'WB_RGGBLevelsUnknown8', fn:function(){ return s4(104); } },
					108: { desc: 'ColorTempUnknown8' },
					109: { desc: 'WB_RGGBLevelsUnknown9', fn:function(){ return s4(109); } },
					113: { desc: 'ColorTempUnknown9' },
					114: { desc: 'WB_RGGBLevelsUnknown10', fn:function(){ return s4(114); } },
					118: { desc: 'ColorTempUnknown10' },
					119: { desc: 'WB_RGGBLevelsUnknown11', fn:function(){ return s4(119); } },
					123: { desc: 'ColorTempUnknown11' },
					124: { desc: 'WB_RGGBLevelsUnknown12', fn:function(){ return s4(124); } },
					128: { desc: 'ColorTempUnknown12' },
					129: { desc: 'WB_RGGBLevelsUnknown13', fn:function(){ return s4(129); } },
					133: { desc: 'ColorTempUnknown13' },
					134: { desc: 'WB_RGGBLevelsUnknown14', fn:function(){ return s4(134); } },
					138: { desc: 'ColorTempUnknown14' },
					139: { desc: 'WB_RGGBLevelsUnknown15', fn:function(){ return s4(139); } },
					143: { desc: 'ColorTempUnknown15' },
					144: { desc: 'WB_RGGBLevelsPC1', fn:function(){ return s4(144); } },
					148: { desc: 'ColorTempPC1' },
					149: { desc: 'WB_RGGBLevelsPC2', fn:function(){ return s4(149); } },
					153: { desc: 'ColorTempPC2' },
					154: { desc: 'WB_RGGBLevelsPC3', fn:function(){ return s4(154); } },
					158: { desc: 'ColorTempPC3' },
					159: { desc: 'WB_RGGBLevelsUnknown16', fn:function(){ return s4(159); } },
					163: { desc: 'ColorTempUnknown16' },
					//164: { ref: ' Canon ColorCalib Tags\n  (A, B, C, Temperature)' },
					618: { desc: 'RawMeasuredRGGB', fn:function(){ return s4(618); } }
				},
				3: {
					0: { desc: 'ColorDataVersion', values:{ 1: '1 (1DmkIIN/5D/30D/400D)' } },
					63: { desc: 'WB_RGGBLevelsAsShot', fn:function(){ return s4(63); } },
					67: { desc: 'ColorTempAsShot' },
					68: { desc: 'WB_RGGBLevelsAuto', fn:function(){ return s4(68); } },
					72: { desc: 'ColorTempAuto' },
					73: { desc: 'WB_RGGBLevelsMeasured', fn:function(){ return s4(73); } },
					77: { desc: 'ColorTempMeasured' },
					78: { desc: 'WB_RGGBLevelsDaylight', fn:function(){ return s4(78); } },
					82: { desc: 'ColorTempDaylight' },
					83: { desc: 'WB_RGGBLevelsShade', fn:function(){ return s4(83); } },
					87: { desc: 'ColorTempShade' },
					88: { desc: 'WB_RGGBLevelsCloudy', fn:function(){ return s4(88); } },
					92: { desc: 'ColorTempCloudy' },
					93: { desc: 'WB_RGGBLevelsTungsten', fn:function(){ return s4(93); } },
					97: { desc: 'ColorTempTungsten' },
					98: { desc: 'WB_RGGBLevelsFluorescent', fn:function(){ return s4(98); } },
					102: { desc: 'ColorTempFluorescent' },
					103: { desc: 'WB_RGGBLevelsKelvin', fn:function(){ return s4(103); } },
					107: { desc: 'ColorTempKelvin' },
					108: { desc: 'WB_RGGBLevelsFlash', fn:function(){ return s4(108); } },
					112: { desc: 'ColorTempFlash' },
					113: { desc: 'WB_RGGBLevelsPC1', fn:function(){ return s4(113); } },
					117: { desc: 'ColorTempPC1' },
					118: { desc: 'WB_RGGBLevelsPC2', fn:function(){ return s4(118); } },
					122: { desc: 'ColorTempPC2' },
					123: { desc: 'WB_RGGBLevelsPC3', fn:function(){ return s4(123); } },
					127: { desc: 'ColorTempPC3' },
					128: { desc: 'WB_RGGBLevelsCustom', fn:function(){ return s4(128); } },
					132: { desc: 'ColorTempCustom' },
					//133: { ref: ' Canon ColorCalib Tags\n  (B, C, A, Temperature)' },
					196: { desc: 'PerChannelBlackLevel', fn:function(){ return s4(196); } },
					584: { desc: 'FlashOutput' },
					585: { desc: 'FlashBatteryLevel' },
					586: { desc: 'ColorTempFlashData' },
					647: { desc: 'MeasuredRGGBData', fn:function(){ return s4(647); } }
				},
				4: {
					0: { desc: 'ColorDataVersion', values:{ 2: '2 (1DmkIII)', 3: '3 (40D)', 4: '4 (1DSmkIII)', 5: '5 (450D/1000D)', 6: '6 (50D/5DmkII)', 7: '7 (500D/550D/7D/1DmkIV)', 9: '9 (60D/1100D)' } },
					//63: { ref: ' Canon ColorCoefs Tags' },
					//168: { ref: ' Canon ColorCalib Tags\n  (B, C, A, Temperature)' },
					231: { desc: 'AverageBlackLevel', fn:function(){ return s4(231); } },
					640: { desc: 'RawMeasuredRGGB', fn:function(){ return s4(640); } },
					692: { desc: 'PerChannelBlackLevel', fn:function(){ return s4(692); } },
					696: { desc: 'NormalWhiteLevel' },
					697: { desc: 'SpecularWhiteLevel' },
					698: { desc: 'LinearityUpperMargin' },
					715: { desc: 'PerChannelBlackLevel', fn:function(){ return s4(715); } },
					719: { desc: 'NormalWhiteLevel', /*TODO $$self{ColorDataVersion} == 9 --> s4*/ },
					720: { desc: 'SpecularWhiteLevel' },
					721: { desc: 'LinearityUpperMargin' },
					723: { desc: 'NormalWhiteLevel' },
					724: { desc: 'SpecularWhiteLevel' },
					725: { desc: 'LinearityUpperMargin' }
				},
				5: {
					0: { desc: 'ColorDataVersion', fn: function(){ return '8'; } }, 
					//71: { ref: ' Canon ColorCoefs Tags' },
					186: { desc: 'CameraColorCalibration01', fn:function(){ return s5(186); } },
					191: { desc: 'CameraColorCalibration02', fn:function(){ return s5(191); } },
					196: { desc: 'CameraColorCalibration03', fn:function(){ return s5(196); } },
					201: { desc: 'CameraColorCalibration04', fn:function(){ return s5(201); } },
					206: { desc: 'CameraColorCalibration05', fn:function(){ return s5(206); } },
					211: { desc: 'CameraColorCalibration06', fn:function(){ return s5(211); } },
					216: { desc: 'CameraColorCalibration07', fn:function(){ return s5(216); } },
					221: { desc: 'CameraColorCalibration08', fn:function(){ return s5(221); } },
					226: { desc: 'CameraColorCalibration09', fn:function(){ return s5(226); } },
					231: { desc: 'CameraColorCalibration10', fn:function(){ return s5(231); } },
					236: { desc: 'CameraColorCalibration11', fn:function(){ return s5(236); } },
					241: { desc: 'CameraColorCalibration12', fn:function(){ return s5(241); } },
					246: { desc: 'CameraColorCalibration13', fn:function(){ return s5(246); } },
					251: { desc: 'CameraColorCalibration14', fn:function(){ return s5(251); } },
					256: { desc: 'CameraColorCalibration15', fn:function(){ return s5(256); } }
				},
				6: {
					0: { desc: 'ColorDataVersion', values:{10: '10 (600D/1200D)'} }, 
					63: { desc: 'WB_RGGBLevelsAsShot', fn:function(){ return s4(63); } },
					67: { desc: 'ColorTempAsShot' },
					68: { desc: 'WB_RGGBLevelsAuto', fn:function(){ return s4(68); } },
					72: { desc: 'ColorTempAuto' },
					73: { desc: 'WB_RGGBLevelsMeasured', fn:function(){ return s4(73); } },
					77: { desc: 'ColorTempMeasured' },
					78: { desc: 'WB_RGGBLevelsUnknown', fn:function(){ return s4(78); } },
					82: { desc: 'ColorTempUnknown' },
					83: { desc: 'WB_RGGBLevelsUnknown2', fn:function(){ return s4(83); } },
					87: { desc: 'ColorTempUnknown2' },
					88: { desc: 'WB_RGGBLevelsUnknown3', fn:function(){ return s4(88); } },
					92: { desc: 'ColorTempUnknown3' },
					93: { desc: 'WB_RGGBLevelsUnknown4', fn:function(){ return s4(93); } },
					97: { desc: 'ColorTempUnknown4' },
					98: { desc: 'WB_RGGBLevelsUnknown5', fn:function(){ return s4(98); } },
					102: { desc: 'ColorTempUnknown5' },
					103: { desc: 'WB_RGGBLevelsDaylight', fn:function(){ return s4(103); } },
					107: { desc: 'ColorTempDaylight' },
					108: { desc: 'WB_RGGBLevelsShade', fn:function(){ return s4(108); } },
					112: { desc: 'ColorTempShade' },
					113: { desc: 'WB_RGGBLevelsCloudy', fn:function(){ return s4(113); } },
					117: { desc: 'ColorTempCloudy' },
					118: { desc: 'WB_RGGBLevelsTungsten', fn:function(){ return s4(118); } },
					122: { desc: 'ColorTempTungsten' },
					123: { desc: 'WB_RGGBLevelsFluorescent', fn:function(){ return s4(123); } },
					127: { desc: 'ColorTempFluorescent' },
					128: { desc: 'WB_RGGBLevelsKelvin', fn:function(){ return s4(128); } },
					132: { desc: 'ColorTempKelvin' },
					133: { desc: 'WB_RGGBLevelsFlash', fn:function(){ return s4(133); } },
					137: { desc: 'ColorTempFlash' },
					138: { desc: 'WB_RGGBLevelsUnknown6', fn:function(){ return s4(138); } },
					142: { desc: 'ColorTempUnknown6' },
					143: { desc: 'WB_RGGBLevelsUnknown7', fn:function(){ return s4(143); } },
					147: { desc: 'ColorTempUnknown7' },
					148: { desc: 'WB_RGGBLevelsUnknown8', fn:function(){ return s4(148); } },
					152: { desc: 'ColorTempUnknown8' },
					153: { desc: 'WB_RGGBLevelsUnknown9', fn:function(){ return s4(153); } },
					157: { desc: 'ColorTempUnknown9' },
					158: { desc: 'WB_RGGBLevelsUnknown10', fn:function(){ return s4(158); } },
					162: { desc: 'ColorTempUnknown10' },
					163: { desc: 'WB_RGGBLevelsUnknown11', fn:function(){ return s4(163); } },
					167: { desc: 'ColorTempUnknown11' },
					168: { desc: 'WB_RGGBLevelsUnknown12', fn:function(){ return s4(168); } },
					172: { desc: 'ColorTempUnknown12' },
					173: { desc: 'WB_RGGBLevelsUnknown13', fn:function(){ return s4(173); } },
					177: { desc: 'ColorTempUnknown13' },
					178: { desc: 'WB_RGGBLevelsUnknown14', fn:function(){ return s4(178); } },
					182: { desc: 'ColorTempUnknown14' },
					183: { desc: 'WB_RGGBLevelsUnknown15', fn:function(){ return s4(183); } },
					187: { desc: 'ColorTempUnknown15' },
					//188: { ref: ' Canon ColorCalib Tags\n  (B, C, A, Temperature)' },
					251: { desc: 'AverageBlackLevel', fn:function(){ return s4(251); } },
					404: { desc: 'RawMeasuredRGGB', fn:function(){ return s4(404); } },
					479: { desc: 'PerChannelBlackLevel', fn:function(){ return s4(479); } },
					483: { desc: 'NormalWhiteLevel' },
					484: { desc: 'SpecularWhiteLevel' },
					485: { desc: 'LinearityUpperMargin' } 
				},
				7: {
					0: { desc: 'ColorDataVersion' },
					63: { desc: 'WB_RGGBLevelsAsShot', fn:function(){ return s4(63); } },
					67: { desc: 'ColorTempAsShot' },
					68: { desc: 'WB_RGGBLevelsAuto', fn:function(){ return s4(68); } },
					72: { desc: 'ColorTempAuto' },
					73: { desc: 'WB_RGGBLevelsMeasured', fn:function(){ return s4(73); } },
					77: { desc: 'ColorTempMeasured' },
					78: { desc: 'WB_RGGBLevelsUnknown', fn:function(){ return s4(78); } },
					82: { desc: 'ColorTempUnknown' },
					83: { desc: 'WB_RGGBLevelsUnknown2', fn:function(){ return s4(83); } },
					87: { desc: 'ColorTempUnknown2' },
					88: { desc: 'WB_RGGBLevelsUnknown3', fn:function(){ return s4(88); } },
					92: { desc: 'ColorTempUnknown3' },
					93: { desc: 'WB_RGGBLevelsUnknown4', fn:function(){ return s4(93); } },
					97: { desc: 'ColorTempUnknown4' },
					98: { desc: 'WB_RGGBLevelsUnknown5', fn:function(){ return s4(98); } },
					102: { desc: 'ColorTempUnknown5' },
					103: { desc: 'WB_RGGBLevelsUnknown6', fn:function(){ return s4(103); } },
					107: { desc: 'ColorTempUnknown6' },
					108: { desc: 'WB_RGGBLevelsUnknown7', fn:function(){ return s4(108); } },
					112: { desc: 'ColorTempUnknown7' },
					113: { desc: 'WB_RGGBLevelsUnknown8', fn:function(){ return s4(113); } },
					117: { desc: 'ColorTempUnknown8' },
					118: { desc: 'WB_RGGBLevelsUnknown9', fn:function(){ return s4(118); } },
					122: { desc: 'ColorTempUnknown9' },
					123: { desc: 'WB_RGGBLevelsUnknown10', fn:function(){ return s4(123); } },
					127: { desc: 'ColorTempUnknown10' },
					128: { desc: 'WB_RGGBLevelsDaylight', fn:function(){ return s4(128); } },
					132: { desc: 'ColorTempDaylight' },
					133: { desc: 'WB_RGGBLevelsShade', fn:function(){ return s4(133); } },
					137: { desc: 'ColorTempShade' },
					138: { desc: 'WB_RGGBLevelsCloudy', fn:function(){ return s4(138); } },
					142: { desc: 'ColorTempCloudy' },
					143: { desc: 'WB_RGGBLevelsTungsten', fn:function(){ return s4(143); } },
					147: { desc: 'ColorTempTungsten' },
					148: { desc: 'WB_RGGBLevelsFluorescent', fn:function(){ return s4(148); } },
					152: { desc: 'ColorTempFluorescent' },
					153: { desc: 'WB_RGGBLevelsKelvin', fn:function(){ return s4(153); } },
					157: { desc: 'ColorTempKelvin' },
					158: { desc: 'WB_RGGBLevelsFlash', fn:function(){ return s4(158); } },
					162: { desc: 'ColorTempFlash' },
					163: { desc: 'WB_RGGBLevelsUnknown11', fn:function(){ return s4(163); } },
					167: { desc: 'ColorTempUnknown11' },
					168: { desc: 'WB_RGGBLevelsUnknown12', fn:function(){ return s4(168); } },
					172: { desc: 'ColorTempUnknown12' },
					173: { desc: 'WB_RGGBLevelsUnknown13', fn:function(){ return s4(173); } },
					177: { desc: 'ColorTempUnknown13' },
					178: { desc: 'WB_RGGBLevelsUnknown14', fn:function(){ return s4(178); } },
					182: { desc: 'ColorTempUnknown14' },
					183: { desc: 'WB_RGGBLevelsUnknown15', fn:function(){ return s4(183); } },
					187: { desc: 'ColorTempUnknown15' },
					188: { desc: 'WB_RGGBLevelsUnknown16', fn:function(){ return s4(188); } },
					192: { desc: 'ColorTempUnknown16' },
					193: { desc: 'WB_RGGBLevelsUnknown17', fn:function(){ return s4(193); } },
					197: { desc: 'ColorTempUnknown17' },
					198: { desc: 'WB_RGGBLevelsUnknown18', fn:function(){ return s4(198); } },
					202: { desc: 'ColorTempUnknown18' },
					203: { desc: 'WB_RGGBLevelsUnknown19', fn:function(){ return s4(203); } },
					207: { desc: 'ColorTempUnknown19' },
					208: { desc: 'WB_RGGBLevelsUnknown20', fn:function(){ return s4(208); } },
					212: { desc: 'ColorTempUnknown20' },
					//213: { ref: ' Canon ColorCalib Tags\n  (B, C, A, Temperature)' },
					276: { desc: 'AverageBlackLevel', fn:function(){ return s4(276); } },
					429: { desc: 'RawMeasuredRGGB', fn:function(){ return s4(429); } },
					504: { desc: 'PerChannelBlackLevel', fn:function(){ return s4(504); } },
					508: { desc: 'NormalWhiteLevel' },
					509: { desc: 'SpecularWhiteLevel' },
					510: { desc: 'LinearityUpperMargin' }
				},
				unknown: {
					0: { desc: 'ColorDataVersion' } 
				}
				
			}
			var table = (arr.length in lengths) ? colors[lengths[arr.length]] : colors.unknown;
			return MainRef.multiple(arr, table);
		}
	}	
};