// exiftool.js/makernotes/ricoh

// summary:
//    Makernotes for the following Makes :
//    'PENTAX RICOH IMAGING'
//    'RICOH'

// description:
//    ported from http://www.sno.phy.queensu.ca/~phil/exiftool/TagNames/Ricoh.html

// returns:
//    a makernote object for exiftool.js and redaktor/meta


var MainRef = require('../exif').ref;

exports.info = {
	
	DefaultHeaderSize : 8,
	
	tags : {
		0x2001: '_IFDpointer_Ricoh',
		0x4001: '_IFDpointer_Theta',
		
		0x0001: 'MakerNoteType', 
    	0x0002: 'FirmwareVersion',
		0x0005: 'SerialNumber',
		0x0e00: 'PrintIM',
		0x1000: 'RecordingFormat',
		0x1001: 'ImageInfo',
		0x1002: 'DriveMode',
		0x1003: 'Sharpness',
		0x1004: 'WhiteBalanceFineTune',
		0x1006: 'FocusMode',
		0x1007: 'AutoBracketing',
		0x1009: 'MacroMode',
		0x100a: 'FlashMode',
		0x100b: 'FlashExposureComp',
		0x100c: 'ManualFlashOutput',
		0x100d: 'FullPressSnap',
		0x100e: 'DynamicRangeExpansion',
		0x100f: 'NoiseReduction',
		0x1010: 'ImageEffects',
		0x1011: 'Vignetting',
		0x1012: 'Contrast',
		0x1013: 'Saturation',
		0x1014: 'Sharpness',
		0x1015: 'ToningEffect',
		0x1016: 'HueAdjust',
		0x1017: 'WideAdapter',
		0x1018: 'CropMode35mm',
		0x1019: 'NDFilter',
		0x101a: 'WBBracketShotNumber',
		// 0x1100 - related to DR correction (ref 3)
		0x1307: 'ColorTempKelvin',
		0x1308: 'ColorTemperature',
		0x1500: 'FocalLength',
		0x1200: 'AFStatus',
		0x1201: 'AFAreaXPosition1',
		0x1202: 'AFAreaYPosition1',
		0x1203: 'AFAreaXPosition',
		0x1204: 'AFAreaYPosition',
		0x1205: 'AFAreaMode',
		0x1601: 'SensorWidth',
		0x1602: 'SensorHeight',
		0x1603: 'CroppedImageWidth',
		0x1604: 'CroppedImageHeight'		
	},
	
	ref : {
		FirmwareVersion: function(s){
			if ( typeof s !== 'string' || s.indexOf('Rev')==-1 ) return { value:s, _val:s };
			return (parseInt(s.replace('Rev', ''))/100).toFixed(2);
		},
		SerialNumber: function(x){
			if ( new RegExp(/^[-\w ]+$/).test(x) === false ) return { key: 'InternalSerialNumber', value:x, _val:x }
			return { value:x.replace (/^(.*)(.{8})$/, function (match, a, b) { return '('.concat(a, ')', b); } ), _val:x }
		},
		RecordingFormat: {
            2: 'JPEG',
            3: 'DNG',
        },
		ImageInfo: function(x, model){
			// GR writes this as ExposureProgram
			if (model==='GR') {
				var ep = {
					1: 'Auto',
					2: 'Program AE',
					3: 'Aperture-priority AE',
					4: 'Shutter speed priority AE',
					5: 'Shutter/aperture priority AE', // TAv
					6: 'Manual',
					7: 'Movie' //PH
				};
				return (x in ep) ? { key:'ExposureProgram', value:ep[x], _val:x } : { key:'ExposureProgram', value:x, _val:x };
			}
			return { value:x, _val:x }; /* TODO ! This is ifd pointer for ImageInfo */
		},
		DriveMode: {
            0: 'Single-frame',
            1: 'Continuous',
            8: 'AF-priority Continuous',
        },
		Sharpness: function(x, model){
			// GR writes this as WhiteBalance
			if (model==='GR') {
				var wb = {
					0: 'Auto',
					1: 'Multi-P Auto',
					2: 'Daylight',
					3: 'Cloudy',
					4: 'Incandescent 1',
					5: 'Incandescent 2',
					6: 'Daylight Fluorescent',
					7: 'Neutral White Fluorescent',
					8: 'Cool White Fluorescent',
					9: 'Warm White Fluorescent',
					10: 'Manual',
					11: 'Kelvin'
				};
				return (x in wb) ? { key:'WhiteBalance', value:wb[x], _val:x } : { key:'WhiteBalance', value:x, _val:x };
			}
			var sh = {
				0: 'Sharp',
				1: 'Normal',
				2: 'Soft',
			};
			return (x in sh) ? { value:sh[x], _val:x } : { value:x, _val:x };
		},
		FocusMode: {
            1: 'Manual',
            2: 'Multi AF',
            3: 'Spot AF',
            4: 'Snap',
            5: 'Infinity',
            7: 'Face Detect', //PH
            8: 'Subject Tracking',
            9: 'Pinpoint AF',
            10: 'Movie' //PH
        },
		AutoBracketing: {
            0: 'Off',
            9: 'AE',
            11: 'WB',
            16: 'DR', // (dynamic range)
            17: 'Contrast',
            18: 'WB2', // (selects two different WB presets besides normal)
            19: 'Effect'
        },
		MacroMode: { 0: 'Off', 1: 'On' },
		FlashMode: {
            0: 'Off',
            1: 'Auto, Fired',
            2: 'On',
            3: 'Auto, Fired, Red-eye reduction',
            4: 'Slow Sync',
            5: 'Manual',
            6: 'On, Red-eye reduction',
            7: 'Synchro, Red-eye reduction',
            8: 'Auto, Did not fire'
        },
		ManualFlashOutput: function(n){
			var mf = {
				  0: 'Full',
				 24: '1/1.4',
				 48: '1/2',
				 72: '1/2.8',
				 96: '1/4',
				120: '1/5.6',
				144: '1/8',
				168: '1/11',
				192: '1/16',
				216: '1/22',
				240: '1/32',
				288: '1/64'
			};
			return (Math.abs(n) in mf) ? { value:mf[Math.abs(n)], _val:n } : { value:n, _val:n };
		},
		FullPressSnap: { 0: 'Off', 1: 'On' },
		DynamicRangeExpansion: {
			0: 'Off',
			3: 'Weak',
			4: 'Medium',
			5: 'Strong',
		},
		NoiseReduction: {
			0: 'Off',
			1: 'Weak',
			2: 'Medium',
			3: 'Strong'
		},
		ImageEffects: {
			0: 'Standard',
			1: 'Vivid',
			3: 'Black & White',
			5: 'B&W Toning Effect',
			6: 'Setting 1',
			7: 'Setting 2',
			9: 'High-contrast B&W',
			10: 'Cross Process',
			11: 'Positive Film',
			12: 'Bleach Bypass',
			13: 'Retro',
			15: 'Miniature',
			17: 'High Key'
		},
		Vignetting: {
			0: 'Off',
			1: 'Low',
			2: 'Medium',
			3: 'High'
		},
		ToningEffect: {
            0: 'Off',
            1: 'Sepia',
            2: 'Red',
            3: 'Green',
            4: 'Blue',
            5: 'Purple',
            6: 'B&W',
            7: 'Color'
        },
		HueAdjust: {
            0: 'Off',
            1: 'Basic',
            2: 'Magenta',
            3: 'Yellow',
            4: 'Normal',
            5: 'Warm',
            6: 'Cool'
        },
		WideAdapter: {
            0: 'Not Attached',
            2: 'Attached' // (21mm)
        },
		CropMode35mm: { 0: 'Off', 1: 'On' },
		NDFilter: { 0: 'Off', 1: 'On' },
		FocalLength: function(n){
			return (typeof n === 'number') ? { value: n.toFixed(1).concat(' mm'), _val:n } : { value:n , _val:n };
		},
		AFStatus: {
            0: 'Out of Focus',
            1: 'In Focus'
        },
		AFAreaMode: {
            0: 'Auto',
            2: 'Manual'
        },
		
	} 
	/* TODO
    0x2001: [
        {
            Name: 'RicohSubdir',
            Condition: q{
                $self->{Model} !~ /^Caplio RR1\b/ and
                ($format ne 'int32u' or $count != 1)
            },
            SubDirectory: {
                Validate: '$val =~ /^\[Ricoh Camera Info\]/',
                TagTable: 'Image::ExifTool::Ricoh::Subdir',
                Start: '$valuePtr + 20',
                ByteOrder: 'BigEndian',
            },
        },
        {
            Name: 'RicohSubdirIFD',
            // the CX6 and GR Digital 4 write an int32u pointer in AVI videos -- doh!
            Condition: '$self->{Model} !~ /^Caplio RR1\b/',
            Flags: 'SubIFD',
            SubDirectory: {
                TagTable: 'Image::ExifTool::Ricoh::Subdir',
                Start: '$val + 20', // (skip over "[Ricoh Camera Info]\0" header)
                ByteOrder: 'BigEndian',
            },
        },
        {
            Name: 'RicohRR1Subdir',
            SubDirectory: {
                Validate: '$val =~ /^\[Ricoh Camera Info\]/',
                TagTable: 'Image::ExifTool::Ricoh::Subdir',
                Start: '$valuePtr + 20',
                ByteOrder: 'BigEndian',
                // the Caplio RR1 uses a different base address -- doh!
                Base: '$start-20',
            },
        },
    ],
    0x4001: 'ThetaSubdir',
        Groups: { 1: 'MakerNotes' },    // SubIFD needs group 1 set
        Flags: 'SubIFD',
        SubDirectory: {
            TagTable: 'Image::ExifTool::Ricoh::ThetaSubdir',
            Start: '$val',
        },
    },
	*/
};