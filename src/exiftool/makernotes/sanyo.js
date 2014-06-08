// exiftool.js/makernotes/sanyo

// summary:
//    Makernotes for the following Makes :
//    'SANYO'
//    'SANYO Electric Co., Ltd.'

// description:
//    ported from http://www.sno.phy.queensu.ca/~phil/exiftool/TagNames/Sanyo.html

// returns:
//    a makernote object for exiftool.js and redaktor/meta


var MainRef = require('../exif').ref;

exports.info = {
	DefaultHeaderSize : 8,
	FixMakernotesOffset: true
};
	
exports.tags = {
	0x00ff: 'MakerNoteOffset',
	0x0100: 'SanyoThumbnail',
	0x0200: 'SpecialMode',
	0x0201: 'SanyoQuality',
	0x0202: 'Macro',
	0x0204: 'DigitalZoom',
	0x0207: 'SoftwareVersion',
	0x0208: 'PictInfo',
	0x0209: 'CameraID',
	0x020e: 'SequentialShot',
	0x020f: 'WideRange',
	0x0210: 'ColorAdjustmentMode',
	0x0213: 'QuickShot',
	0x0214: 'SelfTimer',
	0x0215: 'FlashRelated',
	0x0216: 'VoiceMemo',
	0x0217: 'RecordShutterRelease',
	0x0218: 'FlickerReduce',
	0x0219: 'OpticalZoomOn',
	0x021b: 'DigitalZoomOn',
	0x021d: 'LightSourceSpecial',
	0x021e: 'Resaved',
	0x021f: 'SceneSelect',
	0x0223: 'ManualFocusDistance',
	0x0224: 'SequenceShotInterval',
	0x0225: 'FlashMode',
	0x0e00: 'PrintIM',
	0x0f00: 'DataDump'
};

exports.ref = {
	SpecialMode: function(arr){
		if ( !(arr instanceof Array) || arr.length<3 ) return { value:'n/a', _val:arr };
		return { value:arr.join(', '), _val:arr };
	},
	SanyoQuality: {
		0x0000: 'Normal / Very Low',
		0x0001: 'Normal / Low',
		0x0002: 'Normal / Medium Low',
		0x0003: 'Normal / Medium',
		0x0004: 'Normal / Medium High',
		0x0005: 'Normal / High',
		0x0006: 'Normal / Very High',
		0x0007: 'Normal / Super High',
		// have seen 0x11 with HD2000 in '8M-H JPEG' mode - PH
		0x0100: 'Fine / Very Low',
		0x0101: 'Fine / Low',
		0x0102: 'Fine / Medium Low',
		0x0103: 'Fine / Medium',
		0x0104: 'Fine / Medium High',
		0x0105: 'Fine / High',
		0x0106: 'Fine / Very High',
		0x0107: 'Fine / Super High',
		0x0200: 'Super Fine / Very Low',
		0x0201: 'Super Fine / Low',
		0x0202: 'Super Fine / Medium Low',
		0x0203: 'Super Fine / Medium',
		0x0204: 'Super Fine / Medium High',
		0x0205: 'Super Fine / High',
		0x0206: 'Super Fine / Very High',
		0x0207: 'Super Fine / Super High',
	},
	Macro: {
		0: 'Normal',
		1: 'Macro',
		2: 'View',
		3: 'Manual',
	},
	SequentialShot: {
		0: 'None',
		1: 'Standard',
		2: 'Best',
		3: 'Adjust Exposure',
	},
	WideRange: { 0: 'Off', 1: 'On' },
	ColorAdjustmentMode: { 0: 'Off', 1: 'On' },
	QuickShot: { 0: 'Off', 1: 'On' },
	SelfTimer: { 0: 'Off', 1: 'On' },
	VoiceMemo: { 0: 'Off', 1: 'On' },
	RecordShutterRelease: {
		0: 'Record while down',
		1: 'Press start, press stop'
	},
	FlickerReduce: { 0: 'Off', 1: 'On' },
	OpticalZoomOn: { 0: 'Off', 1: 'On' },
	DigitalZoomOn: { 0: 'Off', 1: 'On' },
	LightSourceSpecial: { 0: 'Off', 1: 'On' },
	Resaved: { 0: 'No', 1: 'Yes' },
	SceneSelect: {
		0: 'Off',
		1: 'Sport',
		2: 'TV',
		3: 'Night',
		4: 'User 1',
		5: 'User 2',
		6: 'Lamp', //PH
	},
	SequenceShotInterval: {
		0: '5 frames/s',
		1: '10 frames/s',
		2: '15 frames/s',
		3: '20 frames/s',
	},
	FlashMode: {
		0: 'Auto',
		1: 'Force',
		2: 'Disabled',
		3: 'Red eye',
	},
	ManualFocusDistance: function(n){
		// TODO - see below
		if(typeof n !== 'number') return { key:'FaceInfo',  value:n, _val:n };
		return { value:n, _val:n }
	}
	
	
/*
	%Image::ExifTool::Sanyo::FaceInfo = (
	PROCESS_PROC => \&Image::ExifTool::ProcessBinaryData,
	WRITE_PROC => \&Image::ExifTool::WriteBinaryData,
	CHECK_PROC => \&Image::ExifTool::CheckBinaryData,
	GROUPS => { 0 => 'MakerNotes', 2 => 'Image' },
	WRITABLE => 1,
	FORMAT => 'int32u',
	FIRST_ENTRY => 0,
	0 => 'FacesDetected',
	4 => {
		Name => 'FacePosition',
		Format => 'int32u[4]',
		Notes => q{
			left, top, right and bottom coordinates of detected face in an unrotated
			640-pixel-wide image, with increasing Y downwards
		},
	},
);

*/
};