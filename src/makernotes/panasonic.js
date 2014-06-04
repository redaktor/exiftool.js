// exiftool.js/makernotes/panasonic

// summary:
//    Makernotes for the following Makes :
//    'PanasonicB'
//    'PANASONIC'

// description:
//    ported from http://www.sno.phy.queensu.ca/~phil/exiftool/TagNames/Panasonic.html

// returns:
//    a makernote object for exiftool.js and redaktor/meta

/* TODO / FIXME - Leica Makes
*/

var MainRef = require('../exif').ref;


exports.info = {
	
	HeaderSize : {
		'PanasonicB': 12,
		'PanasonicE': 12,
		'LEICA': 8
	},
	
	tags : {
		0x001d: 'SerialNumber',
		0x00a0: 'SerialNumber',
		0x0001: 'Quality',
    	0x0002: 'FirmwareVersion',
		0x0003: 'WhiteBalance',
		0x0007: 'FocusMode',
		0x000f: 'AFAreaMode',
		0x001a: 'ImageStabilization',
		0x001c: 'MacroMode',
		0x001f: 'ShootingMode',
		0x0020: 'Audio',
		0x0021: 'DataDump',
		0x0023: 'WhiteBalanceBias',
		0x0024: 'FlashBias',
		0x0025: 'InternalSerialNumber',
		0x0026: 'PanasonicExifVersion',
		0x0028: 'ColorEffect',
		0x0029: 'TimeSincePowerOn',
		0x002a: 'BurstMode',
		0x002b: 'SequenceNumber',
		0x002c: 'ContrastMode',
		0x002d: 'NoiseReduction',
		0x002e: 'SelfTimer',
		0x0030: 'Rotation',
		0x0031: 'AFAssistLamp',
		0x0032: 'ColorMode',
		0x0033: 'BabyAge',
		0x0034: 'OpticalZoomMode',
		0x0035: 'ConversionLens',
		0x0036: 'TravelDay',
		0x0039: 'Contrast',
		0x003a: 'WorldTimeLocation',
		0x003b: 'TextStamp',
		0x003c: 'ISOSetting', 
		0x003d: 'AdvancedSceneType',
		0x003e: 'TextStamp',
		0x003f: 'FacesDetected',
		0x0040: 'Saturation',
		0x0041: 'Sharpness',
		0x0042: 'FilmMode',
		0x0044: 'ColorTemperature',
		0x0045: 'BracketSettings',
		0x0046: 'WBShiftAB',
		0x0047: 'WBShiftGM',
		0x0048: 'FlashCurtain',
		0x0049: 'LongExposureNoiseReduction',
		0x004b: 'PanasonicImageWidth',
		0x004c: 'PanasonicImageHeight',
		0x004d: 'AFPointPosition',
		0x004e: 'FaceDetInfo',
		0x0051: 'LensType',
		0x0052: 'LensSerialNumber',
		0x0053: 'AccessoryType',
		0x0054: 'AccessorySerialNumber',
		0x0059: 'Transform',
		0x005d: 'IntelligentExposure',
		0x0060: 'LensFirmwareVersion',
		0x0061: 'FaceRecInfo',
		0x0062: 'FlashWarning',
		0x0063: 'RecognizedFaceFlags',
		0x0065: 'Title',
		0x0066: 'BabyName',
		0x0067: 'Location',
		0x0069: 'Country', 
		0x006b: 'State',
		0x006d: 'City', 
		0x006f: 'Landmark',
		0x0070: 'IntelligentResolution',
		0x0077: 'BurstSpeed',
		0x0079: 'IntelligentD-Range',
		0x007c: 'ClearRetouch',
		0x0086: 'ManometerPressure',
		0x0089: 'PhotoStyle',
		0x008a: 'ShadingCompensation',
		0x008c: 'AccelerometerZ',
		0x008d: 'AccelerometerX',
		0x008e: 'AccelerometerY',
		0x008f: 'CameraOrientation',
		0x0090: 'RollAngle',
		0x0091: 'PitchAngle',
		0x0093: 'SweepPanoramaDirection',
		0x0094: 'SweepPanoramaFieldOfView',
		0x0096: 'TimerRecording',
		0x009d: 'InternalNDFilter',
		0x009e: 'HDR',
		0x009f: 'ShutterType',
		0x00ab: 'TouchAE',
		0x0e00: 'PrintIM',
		0x8000: 'MakerNoteVersion',
		0x8001: 'SceneMode',
		0x8004: 'WBRedLevel',
		0x8005: 'WBGreenLevel',
		0x8006: 'WBBlueLevel',
		0x8007: 'FlashFired',
		0x8008: 'TextStamp',
		0x8009: 'TextStamp',
		0x8010: 'BabyAge',
		0x8012: 'Transform'
	},
	
	ref: {
		shootingMode: {
			1 : 'Normal',
			2 : 'Portrait',
			3 : 'Scenery',
			4 : 'Sports',
			5 : 'Night Portrait',
			6 : 'Program',
			7 : 'Aperture Priority',
			8 : 'Shutter Priority',
			9 : 'Macro',
			10: 'Spot', //7
			11: 'Manual',
			12: 'Movie Preview', //PH (LZ6)
			13: 'Panning',
			14: 'Simple', //PH (LZ6)
			15: 'Color Effects', //7
			16: 'Self Portrait', //PH (TZ5)
			17: 'Economy', //7
			18: 'Fireworks',
			19: 'Party',
			20: 'Snow',
			21: 'Night Scenery',
			22: 'Food', //7
			23: 'Baby', //JD
			24: 'Soft Skin', //PH (LZ6)
			25: 'Candlelight', //PH (LZ6)
			26: 'Starry Night', //PH (LZ6)
			27: 'High Sensitivity', //7 (LZ6)
			28: 'Panorama Assist', //7
			29: 'Underwater', //7
			30: 'Beach', //PH (LZ6)
			31: 'Aerial Photo', //PH (LZ6)
			32: 'Sunset', //PH (LZ6)
			33: 'Pet', //JD
			34: 'Intelligent ISO', //PH (LZ6)
			35: 'Clipboard', //7
			36: 'High Speed Continuous Shooting', //7
			37: 'Intelligent Auto', //7
			39: 'Multi-aspect', //PH (TZ5)
			41: 'Transform', //PH (FS7)
			42: 'Flash Burst', //PH (FZ28)
			43: 'Pin Hole', //PH (FZ28)
			44: 'Film Grain', //PH (FZ28)
			45: 'My Color', //PH (GF1)
			46: 'Photo Frame', //PH (FS7)
			48: 'Movie', //PH (GM1)
			// 49 - seen for FS4 (snow?)
			51: 'HDR', //12
			55: 'Handheld Night Shot', //PH (FZ47)
			57: '3D', //PH (3D1)
			59: 'Creative Control', //PH (FZ47)
			62: 'Panorama', //17
			63: 'Glass Through', //17
			64: 'HDR', //17
			66: 'Digital Filter', //PH (GF5 "Impressive Art", "Cross Process", "Color Select", "Star")
			67: 'Clear Portrait', //18
			68: 'Silky Skin', //18
			69: 'Backlit Softness', //18
			70: 'Clear in Backlight', //18
			71: 'Relaxing Tone', //18
			72: "Sweet Child's Face", //18
			73: 'Distinct Scenery', //18
			74: 'Bright Blue Sky', //18
			75: 'Romantic Sunset Glow', //18
			76: 'Vivid Sunset Glow', //18
			77: 'Glistening Water', //18
			78: 'Clear Nightscape', //18
			79: 'Cool Night Sky', //18
			80: 'Warm Glowing Nightscape', //18
			81: 'Artistic Nightscape', //18
			82: 'Glittering Illuminations', //18
			83: 'Clear Night Portrait', //18
			84: 'Soft Image of a Flower', //18
			85: 'Appetizing Food', //18
			86: 'Cute Desert', //18
			87: 'Freeze Animal Motion', //18
			88: 'Clear Sports Shot', //18
			89: 'Monochrome', //18
			90: 'Creative Control', //18	
		},
		
		Quality: {
            1: 'TIFF', //PH (FZ20)
            2: 'High',
            3: 'Normal',
            5: '1920x1080, 30fps SZ7 video',
            6: 'Very High', //3 (Leica)
            7: 'Raw', //3 (Leica)
            9: 'Motion Picture', //PH (LZ6)
        },
		WhiteBalance: {
            1: 'Auto',
            2: 'Daylight',
            3: 'Cloudy',
            4: 'Incandescent', //PH
            5: 'Manual',
            8: 'Flash',
            10: 'Black & White', //3 (Leica)
            11: 'Manual', //PH (FZ8)
            12: 'Shade', //PH (FS7)
            13: 'Kelvin', //PeterK (NC)
        },
		FocusMode: {
            1: 'Auto',
            2: 'Manual',
            4: 'Auto, Focus button', //4
            5: 'Auto, Continuous', //4
            6: 'AF-S', //18 (also seen for GF1 - PH)
            7: 'AF-C', //18
            8: 'AF-F', //18 (auto-focus flexible)
        },
		AFAreaMode: function(arr, model){
			if( !(arr instanceof Array) || arr.length!=2 ) return { value:'Auto', _val:arr };
			var ref = { //PH
                '0 1'  : '9-area', // (FS7)
                '0 16' : '3-area (high speed)', // (FZ8)
                '0 23' : '23-area', //PH (FZ47,NC)
                '1 0'  : 'Spot Focusing', // (FZ8)
                '1 1'  : '5-area', // (FZ8)
                '16'   : 'Normal?', // (only mode for DMC-LC20)
                '16 0' : '1-area', // (FZ8)
                '16 16': '1-area (high speed)', // (FZ8)
                // '32 0' is Face Detect for FS7, and Face Detect or Focus Tracking
                // for the DMC-FZ200 (ref 17), and Auto is DMC-L1 guess,
                '32 0' : 'Tracking',
                '32 1' : '3-area (left)?', // (DMC-L1 guess)
                '32 2' : '3-area (center)?', // (DMC-L1 guess)
                '32 3' : '3-area (right)?', // (DMC-L1 guess)
                '64 0' : 'Face Detect',
                '128 0': 'Spot Focusing 2', //18
            };
			
			if (model.indexOf('DMC-FZ10')>-1){
				ref = {
					_0_1: 'Spot Mode On',
					_0_16: 'Spot Mode Off'
				};
			}
			var v = '_'.concat(arr[0],'_',arr[1]);
			return (v in ref) ? { value:ref[v], _val:arr } : { value:arr, _val:arr };
		},
		ImageStabilization: {
            2: 'On, Mode 1',
            3: 'Off',
            4: 'On, Mode 2',
            5: 'Panning', //18
            // GF1 also has a "Mode 3" - PH
            6: 'On, Mode 3', //PH (GX7, sensor shift?)
        },
		MacroMode: {
            1: 'On',
            2: 'Off',
            0x101: 'Tele-Macro', //7
            0x201: 'Macro Zoom', //PH (FS7)
        },
		ShootingMode: function(n){ 
			return (n in exports.info.ref.shootingMode) ? {value: exports.info.ref.shootingMode[n], _val:n } : { value:n, _val:n }; 
		},
		Audio: {
            1: 'Yes',
            2: 'No',
            3: 'Stereo', //PH (NC)
        },
		DataDump: function(n){ 
			if (typeof n !== 'number') return { value:'n/a', _val:0 };
			return { value: '(Binary data '.concat(n, ' bytes)'), _val: n };
		},
		WhiteBalanceBias: function(n){
			return MainRef.decToFrac(n/3);
		},
		FlashBias: function(n){
			return MainRef.decToFrac(n/3);
		},
		ColorEffect: {
            1: 'Off',
            2: 'Warm',
            3: 'Cool',
            4: 'Black & White',
            5: 'Sepia',
            6: 'Happy', //PH (FX70) (yes, really. you wouldn't want sad colors now would you?)
            8: 'Vivid', //PH (SZ3)
        },
		TimeSincePowerOn: function(n){
			var v = Math.round(n / 100);
			var rStr = '';
            if (v >= 24 * 3600) {
                var d = Math.round(v / (24 * 3600));
                rStr = rStr.concat(d, 'days ');
                v -= d * 24 * 3600;
            }
            var h = Math.round(v / 3600);
            v -= h * 3600;
            var m = Math.round(v / 60);
            v -= m * 60;
            var s = Math.round(v);
            var f = 100 * (v - s);
            return rStr.concat(h, m, s, f);
		},
		BurstMode: {
            0: 'Off',
            1: 'On', //PH (TZ5) [was "Low/High Quality" from ref 4]
            2: 'Auto Exposure Bracketing (AEB)', //17
            4: 'Unlimited', //PH (TZ5)
            8: 'White Balance Bracketing', //18
            17: 'On (with flash)', //forum5597
        },
		ContrastMode: function(n, model){
			var r = {
                0: 'Normal',
                1: 'Low',
                2: 'High',
                // 3 - observed with LZ6 and TZ5 in Fireworks mode
                //     and GX7 in Fantasy/Retro/OldDays/HighKey - PH
                // 4 - observed in MP4 movie with GM1 (EXIF and 0x39 Contrast "Normal") - PH
                // 5 - observed with FX01, FX40 and FP8 (EXIF contrast "Normal") - PH
                6: 'Medium Low', //PH (FZ18)
                7: 'Medium High', //PH (FZ18)
                // 8 - GX7 in DynamicMonochrome mode
                13: 'High Dynamic', //PH (FZ47 in ?)
                // DMC-LC1 values:
                0x100: 'Low',
                0x110: 'Normal',
                0x120: 'High',
            };
			if( new RegExp(/^DMC-(GF\d+|G2)$/).test(model) ){
				r = { // (decoded for GF1 unless otherwise noted)
					0: '-2',
					1: '-1',
					2: 'Normal',
					3: '+1',
					4: '+2',
					// Note: Other Contrast tags will be "Normal" in any of these modes:
					5: 'Normal 2', // 5 - seen for Portrait (FX80) and Normal (GF6)
					7: 'Nature (Color Film)', // (GF1,G2; GF3 "Miniature")
					9: 'Expressive', //(GF3)
					12: 'Smooth (Color Film) or Pure (My Color)', //(GF1,G2 "Smooth Color")
					17: 'Dynamic (B&W Film)', //(GF1,G2)
					22: 'Smooth (B&W Film)', //(GF1,G2)
					25: 'High Dynamic', //(GF5)
					26: 'Retro', //(GF5)
					27: 'Dynamic (Color Film)', //(GF1,G2) (GF3 "High Key")
					28: 'Low Key', //(GF5)
					29: 'Toy Effect', //(GF5)
					32: 'Vibrant (Color Film) or Expressive (My Color)', // (GF1; G2 "Vibrant"; GF2,GF5 "Expressive")
					33: 'Elegant (My Color)',
					37: 'Nostalgic (Color Film)', // (GF1,G2; GF5 "Sepia")
					41: 'Dynamic Art (My Color)', // (GF5 "High Key")
					42: 'Retro (My Color)',
					45: 'Cinema', //(GF2)
					47: 'Dynamic Mono', //(GF5)
					50: 'Impressive Art', //(GF5)
					51: 'Cross Process', //(GF5)
					107: 'Expressive 2', //(GF6)
					122: 'Dynamic Monochrome', //(GF6)
					// more new modes for GF6:
					// ?: 'Old Days',
					// ?: 'Toy Pop',
					// ?: 'Bleach Bypass',
					// ?: 'Fantasy',
					// ?: 'Star Filter',
					// ?: 'One Point Color',
					// ?: 'Sunshine',
				};
			} else if(new RegExp(/^DMC-(TZ10|ZS7)$/).test(model)){
				r = {
					0: 'Normal',
					1: '-2',
					2: '+2',
					5: '-1',
					6: '+1',
				};
			}
			
			return ( n in r ) ? { value:r[n], _val:n } : { value:n, _val:n };
		},
		NoiseReduction: {
            0: 'Standard',
            1: 'Low (-1)',
            2: 'High (+1)',
            3: 'Lowest (-2)', //JD
            4: 'Highest (+2)', //JD
        },
		SelfTimer: {
            1: 'Off',
            2: '10 s',
            3: '2 s',
            4: '10 s / 3 pictures', //17
        },
		Rotation: {
            1: 'Horizontal (normal)',
            3: 'Rotate 180', //PH
            6: 'Rotate 90 CW', //PH (ref 7 gives 270 CW)
            8: 'Rotate 270 CW', //PH (ref 7 gives 90 CW)
        },
		AFAssistLamp: {
            1: 'Fired',
            2: 'Enabled but Not Used',
            3: 'Disabled but Required',
            4: 'Disabled and Not Required',
            // have seen a value of 5 - PH
            // values possibly related to FOC-L? - JD
        },
		ColorMode: {
            0: 'Normal',
            1: 'Natural',
            2: 'Vivid',
            // have seen 3 for GF2 - PH
        },
		BabyAge: function(n){
			return (n==='9999:99:99 00:00:00') ? { value:'not set', _val:0 } : { value:n, _val:n };
		},
		OpticalZoomMode: {
            1: 'Standard',
            2: 'Extended',
        },
		ConversionLens: { //PH (unconfirmed)
            1: 'Off',
            2: 'Wide',
            3: 'Telephoto',
            4: 'Macro',
        },
		TravelDay: function(n){
			return (typeof n !== 'number' || n === 65535) ? { value:'n/a', _val:0 } : { value:'Day '.concat(n), _val:n }
		},
		/*
		0x39: { //7 (L1/L10)
			Name: 'Contrast',
			Format: 'int16s',
			Writable: 'int16u',
			%Image::ExifTool::Exif::printParameter,
		},
		0x40: { //7 (L1/L10)
			Name: 'Saturation',
			Format: 'int16s',
			Writable: 'int16u',
			%Image::ExifTool::Exif::printParameter,
		},
		0x41: { //7 (L1/L10)
			Name: 'Sharpness',
			Format: 'int16s',
			Writable: 'int16u',
			%Image::ExifTool::Exif::printParameter,
		},
		*/
		WorldTimeLocation: {
            1: 'Home',
            2: 'Destination',
        },
		TextStamp: { 1: 'Off', 2: 'On' },
		ISOSetting: function(n){
			if (typeof n !== 'number' || n === 65535) return { value:'n/a', _val:0 };
			if (n === 65534) return { value:'Intelligent ISO', _val:n };
			return { value:n, _val:n };
		},
		/*
		0x3d: { //PH
			Name: 'AdvancedSceneType',
			Writable: 'int16u',
			Notes: 'used together with SceneMode to derive Composite AdvancedSceneMode',
		},
		*/
		FilmMode: {
            0: 'n/a', //PH (ie. FZ100 "Photo Frame" ShootingMode)
            1: 'Standard (color)',
            2: 'Dynamic (color)',
            3: 'Nature (color)',
            4: 'Smooth (color)',
            5: 'Standard (B&W)',
            6: 'Dynamic (B&W)',
            7: 'Smooth (B&W)',
            // 8: 'My Film 1'? (from owner manual)
            // 9: 'My Film 2'?
            10: 'Nostalgic', //(GH1)
            11: 'Vibrant', //(GH1)
            12: 'Multi Film'
        },
		BracketSettings: {
            0: 'No Bracket',
            1: '3 Images, Sequence 0/-/+',
            2: '3 Images, Sequence -/0/+',
            3: '5 Images, Sequence 0/-/+',
            4: '5 Images, Sequence -/0/+',
            5: '7 Images, Sequence 0/-/+',
            6: '7 Images, Sequence -/0/+'
        },
		WBShiftAB: function(n){
			if (typeof n !== 'number' || n === 0) return { value:'Normal', _val:0 };
			return (n>0) ? { value: 'shift toward blue: '.concat(arr[0]), _val:n } : { value: 'shift toward yellow: '.concat(arr[0]), _val:n };
		},
		WBShiftGM: function(n){
			if (typeof n !== 'number' || n === 0) return { value:'Normal', _val:0 };
			return (n>0) ? { value: 'shift toward green: '.concat(arr[0]), _val:n } : { value: 'shift toward red: '.concat(arr[0]), _val:n };
		},
		FlashCurtain: {
            0: 'n/a',
            1: '1st',
            2: '2nd'
        },
		LongExposureNoiseReduction: { 1: 'Off', 2: 'On' },
		AFPointPosition: function(arr){
			if( !(arr instanceof Array) || arr.length!=2 ) return { value:'n/a', _val:arr };
			return ( arr[0]+arr[1] === 16777216*2 ) ? { value:'None', _val:arr } : { value:arr.join(' '), _val:arr };
		},
		
		Transform: function(arr){
			if( !(arr instanceof Array) || arr.length!=2 ) return { value:'Off', _val:arr };
			var r = {
				0: 'Off',
				4: 'Slim High',
				5: 'Slim Low',
				7: 'Stretch Low',
				10: 'Stretch High'
			}
			return ((arr[0]+arr[1]+5) in r) ? { value:r[(arr[0]+arr[1]+5)], _val:arr } : { value:'Off', _val:arr };
        },
		IntelligentExposure: {
            0: 'Off',
            1: 'Low',
            2: 'Standard',
            3: 'High'
        },
		IntelligentResolution: {
            0: 'Off', 
            1: 'Low',
            2: 'Standard',
            3: 'High',
            4: 'Extended',
        },
		/* TODO
			0x60: { //18
			Name: 'LensFirmwareVersion',
			Writable: 'undef',
			Format: 'int8u',
			Count: 4,
			PrintConv: '$val=~tr/ /./; $val',
			PrintConvInv: '$val=~tr/./ /; $val',
		},
		*/
		FaceDetInfo: function(arr){
			var fd =  {
				0: { desc: 'NumFacePositions' }, 
				1: { desc: 'Face1Position' },
				5: { desc: 'Face2Position' },
				9: { desc: 'Face3Position' },
				13: { desc: 'Face4Position' },
				17: { desc: 'Face5Position' }
			};
			return (arr[0]===0) ? { value:'None', _val:0 } : MainRef.multiple(arr,fd);
		},
		FaceRecInfo: function(arr){
			/* TODO - redaktor.meta for notes
			// exiftool.pm:
			// "Tags written by cameras with facial recognition.  
			// These cameras not only detect faces in an image, 
			// but also recognize specific people based a user-supplied set of known faces.
			*/
			
			var fr =  {
				0: { desc: 'FacesRecognized' },
				4: { desc: 'RecognizedFace1Name' },
				24: { desc: 'RecognizedFace1Position' },
				32: { desc: 'RecognizedFace1Age' },
				52: { desc: 'RecognizedFace2Name' },
				72: { desc: 'RecognizedFace2Position' },
				80: { desc: 'RecognizedFace2Age' },
				100: { desc: 'RecognizedFace3Name' },
				120: { desc: 'RecognizedFace3Position' },
				128: { desc: 'RecognizedFace3Age' }
			};
			return (arr[0]===0) ? { value:'None', _val:0 } : MainRef.multiple(arr,fr);
		},
		/* TODO - strings?
		LensType: '',
		LensSerialNumber: '',
		*/
		FlashWarning: { 0: 'No', 1: 'Yes (flash required but disabled)' },
		RecognizedFaceFlags: function(arr){
			if( !(arr instanceof Array) || arr.length<4 ) return { value:'n/a', _val:arr };
			return { value:arr.join(', '), _val:arr };
		},
		BurstSpeed: function(n){
			if (typeof n !== 'number') return { value:'n/a', _val:0 };
			return { value:n.toString().concat(' images per second'), _val:n };
		},
		IntelligentD_Range: {
            0: 'Off',
            1: 'Low',
            2: 'Standard',
            3: 'High'
        },
		ClearRetouch: { 0: 'Off', 1: 'On' },
		ManometerPressure: function(n){
			return (typeof n === 'number') ? { value: (n/10).toString().concat(' kPa'), _val:n } : { value:n, _val:n }
		}, 
		PhotoStyle: {
            0: 'Auto',
            1: 'Standard or Custom',
            2: 'Vivid',
            3: 'Natural',
            4: 'Monochrome',
            5: 'Scenery',
            6: 'Portrait',
        },
		ShadingCompensation: { 0: 'Off', 1: 'On' },
		CameraOrientation: {
            0: 'Normal',
            1: 'Rotate CW',
            2: 'Rotate 180',
            3: 'Rotate CCW',
            4: 'Tilt Upwards',
            5: 'Tilt Downwards'
        },
		RollAngle: function(n){
			return (typeof n === 'number') ? { value: (n/10), _val:n } : { value:n, _val:n }
		}, 
		PitchAngle: function(n){
			return (typeof n === 'number') ? { value: (n/10), _val:n } : { value:n, _val:n }
		}, 
		SweepPanoramaDirection:{
            0: 'Off',
            1: 'Left to Right',
            2: 'Right to Left',
            3: 'Top to Bottom',
            4: 'Bottom to Top'
        },
		TimerRecording: {
            0: 'Off',
            1: 'Time Lapse',
            2: 'Stop-motion Animation',
        },
		HDR: {
            0: 'Off',
            100: '1 EV',
            200: '2 EV',
            300: '3 EV',
            32868: '1 EV (Auto)',
            32968: '2 EV (Auto)',
            33068: '3 EV (Auto)',
        },
		ShutterType: {
            0: 'Mechanical',
            1: 'Electronic',
            2: 'Hybrid', //PH (GM1, 1st curtain electronic, 2nd curtain mechanical)
        },
		TouchAE: { 0: 'Off', 1: 'On' },
		ColorTemperature: function(n){ return { value: n.toString().concat(' Kelvin'), _val:n  } },
		
		PanasonicExifVersion: function(arr){ return MainRef.versions(arr, 4); },
		MakerNoteVersion: function(arr){ return MainRef.versions(arr, 4); },
		
		SceneMode: function(n){ 
			return (n in exports.info.ref.shootingMode) ? {value: exports.info.ref.shootingMode[n], _val:n } : { value:'Off', _val:n }; 
		},
		
		FlashFired: { 1: 'No', 2: 'Yes' }
		
	}
};