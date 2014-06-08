// exiftool.js/makernotes/olympus

// summary:
//    Makernotes for the following Makes :
//    'OLYMPUS IMAGING CORP.'
//    'OLYMPUS CORPORATION'
//    'OLYMPUS OPTICAL CO.,LTD'
//    'OLYMPUS OPTICAL CO,.LTD.'

// description:
//    ported from http://www.sno.phy.queensu.ca/~phil/exiftool/TagNames/Olympus.html

// returns:
//    a makernote object for exiftool.js and redaktor/meta

// note:
//    please also note the nice (german) olypedia.de
//    see http://olypedia.de/Olympus_Makernotes

/* TODO - some Minolta Models
{
	# the DiMAGE E323 (MINOL) and E500 (CAMER), and some models
	# of Mustek, Pentax, Ricoh and Vivitar (CAMER).
	Name => 'MakerNoteMinolta2',
	Condition => '$$valPt =~ /^(MINOL|CAMER)\0/ and $$self{OlympusCAMER} = 1',
	SubDirectory => {
		# these models use Olympus tags in the range 0x200-0x221 plus 0xf00
		TagTable => 'Image::ExifTool::Olympus::Main',
		Start => '$valuePtr + 8',
		ByteOrder => 'Unknown',
	},
},
*/

var MainRef = require('../exif').ref;

exports.info = {

	HeaderSize : {
		'OLYMP' : 8,
		'EPSON' : 8,
		'OLYMPUS' : 12,
		'OLYMPUSII' : 12,
		'SONY PI' : 12,
		'PREMI' : 12
		// TODO - some Minolta Models
	},
	
	MakerNoteByteAlignHeaderOffset : 8, // offset from start of header in which
	// to find the byte align code (0x4949 or 0x4D4D)
	
	UseMakernoteOffsetAsBase : {
		'OLYMP' : false,
		'EPSON' : false,
		'OLYMPUS' : true,
		'OLYMPUSII' : true,
		'SONY PI' : true,
		'PREMI' : true
		// TODO - some Minolta Models
	},
	
	AdjustOffsetBase : {
		'OLYMP' : 0,
		'EPSON' : 0,
		'OLYMPUS' : 0,
		'OLYMPUSII' : 0,
		'SONY PI' : 0,
		'PREMI' : 4
		// TODO - some Minolta Models
	},

	SerialWithinIFD : '_IFDpointer_Equipment',
	IFDHeaderSize : 0
};
	
exports.tags = {
	0x2010: '_IFDpointer_Equipment',
	0x2020: '_IFDpointer_CameraSettings',
	0x2030: '_IFDpointer_RawDevelopment',
	0x2031: '_IFDpointer_RawDevelopment2',
	0x2040: '_IFDpointer_ImageProcessing',
	0x2050: '_IFDpointer_FocusInfo',
	0x3000: '_IFDpointer_RawInfo',
	0x4000: '_IFDpointer_MainInfo',
	0x5000: '_IFDpointer_UnknownInfo',
	
	0x0000: 'MakerNoteVersion',
	0x0001: 'CameraSettings',
	0x0003: 'CameraSettings',
	0x0040: 'CompressedImageSize',
	0x0081: 'PreviewImageData',
	0x0088: 'PreviewImageStart',
	0x0089: 'PreviewImageLength',
	0x0100: 'ThumbnailImage',
	0x0104: 'BodyFirmwareVersion',
	0x0200: 'SpecialMode',
	0x0201: 'Quality',
	0x0202: 'Macro', 
	0x0203: 'BWMode', 
	0x0204: 'DigitalZoom',
	0x0205: 'FocalPlaneDiagonal',
	0x0206: 'LensDistortionParams',
	0x0207: 'CameraType',
	0x0208: 'TextInfo',
	0x0209: 'CameraID',
	0x020b: 'EpsonImageWidth',
	0x020c: 'EpsonImageHeight',
	0x020d: 'EpsonSoftware',
	0x0280: 'PreviewImage',
	0x0300: 'PreCaptureFrames',
	0x0301: 'WhiteBoard',
	0x0302: 'OneTouchWB', 
	0x0303: 'WhiteBalanceBracket',
	0x0304: 'WhiteBalanceBias',
	0x0404: 'SerialNumber',
	0x0405: 'Firmware',
	0x0e00: 'PrintIM',
	0x0f00: 'DataDump',
	0x0f01: 'DataDump2',
	0x0f04: 'ZoomedPreviewStart',
	0x0f05: 'ZoomedPreviewLength',
	0x0f06: 'ZoomedPreviewSize',
	0x1000: 'ShutterSpeedValue',
	0x1001: 'ISOValue',
	0x1002: 'ApertureValue',
	0x1003: 'BrightnessValue',
	0x1004: 'FlashStatus', 
	0x1006: 'ExposureCompensation',
	0x1007: 'SensorTemperature',
	0x1008: 'LensTemperature',
	0x1009: 'LightCondition',
	0x100a: 'FocusRange', 
	0x100b: 'FocusMode', 
	0x100c: 'ManualFocusDistance',
	0x100d: 'ZoomStepCount',
	0x100e: 'FocusStepCount',
	0x100f: 'Sharpness', 
	0x1010: 'FlashChargeLevel',
	0x1011: 'ColorMatrix',
	0x1012: 'BlackLevel',
	0x1013: 'ColorTemperatureBG',
	0x1014: 'ColorTemperatureRG',
	0x1017: 'RedBalance',
	0x1018: 'BlueBalance',
	0x1019: 'ColorMatrixNumber',
	0x101a: 'SerialNumber',
	0x101b: 'ExternalFlashAE1_0',
	0x101c: 'ExternalFlashAE2_0',
	0x101d: 'InternalFlashAE1_0',
	0x101e: 'InternalFlashAE2_0',
	0x101f: 'ExternalFlashAE1',
	0x1020: 'ExternalFlashAE2',
	0x1021: 'InternalFlashAE1',
	0x1022: 'InternalFlashAE2',
	0x1023: 'FlashExposureComp',
	0x1024: 'InternalFlashTable',
	0x1025: 'ExternalFlashGValue',
	0x1026: 'ExternalFlashBounce', 
	0x1027: 'ExternalFlashZoom',
	0x1028: 'ExternalFlashMode',
	0x1029: 'Contrast', 
	0x102a: 'SharpnessFactor',
	0x102b: 'ColorControl',
	0x102c: 'ValidBits',
	0x102d: 'CoringFilter',
	0x102e: 'OlympusImageWidth',
	0x102f: 'OlympusImageHeight',
	0x1030: 'SceneDetect',
	0x1031: 'SceneArea',
	0x1033: 'SceneDetectData',
	0x1034: 'CompressionRatio',
	0x1035: 'PreviewImageValid', 
	0x1036: 'PreviewImageStart',
	0x1037: 'PreviewImageLength',
	0x1038: 'AFResult',
	0x1039: 'CCDScanMode', 
	0x103a: 'NoiseReduction', 
	0x103b: 'FocusStepInfinity',
	0x103c: 'FocusStepNear',
	0x103d: 'LightValueCenter',
	0x103e: 'LightValuePeriphery',
	0x103f: 'FieldCount'
	
	/* TODO
	0x2100: 'FE',
	0x2200: 'FE',
	0x2300: 'FE',
	0x2400: 'FE',
	0x2500: 'FE',
	0x2600: 'FE',
	0x2700: 'FE',
	0x2800: 'FE',
	0x2900: 'FE',
	*/
};
	
exports.ref = {
	
	/* helpers */
	firmware: function(n){
		var v = parseFloat(n.toString(16))/1000;
		return (typeof v === 'number') ? {value:v, _val:n} : {value:n, _val:n};
	},
	aperture: function(n){
		var v = (typeof n === 'number') ? Math.pow( Math.SQRT2, (n / 256)).toFixed(1) : n;
		return { value:v, _val:n }
	},
	flashStrength: function(arr){
		if( !(arr instanceof Array) ) return { value:'n/a', _val:arr };
		var v = arr.join(', ');
		return (v!=='NaN, NaN, NaN') ? { value: v, _val: arr } : { value: 0, _val: [] };
	}, 
	minmax: function(arr){
		if( !(arr instanceof Array) ) return { value:'n/a', _val:arr };
		return a[0].toString().concat(' (min ', a[1], ' max ', a[2], ')');
	},
	arr0: function(arr, ref){ 
		if( !(arr instanceof Array) ) arr = [arr];
		var rStr = (arr[0] in ref) ? ref[arr.shift()] : arr.shift().toString();
		rStr = rStr.concat('; ', arr.join('; '), ';' );
		return { value:rStr, _val:arr };
	},
	/**/
	_IFDpointer_MainInfo: {
		0x0000: 'MakerNoteVersion',
		0x0001: 'CameraSettings',
		0x0003: 'CameraSettings',
		0x0040: 'CompressedImageSize',
		0x0081: 'PreviewImageData',
		0x0088: 'PreviewImageStart',
		0x0089: 'PreviewImageLength',
		0x0100: 'ThumbnailImage',
		0x0104: 'BodyFirmwareVersion',
		0x0200: 'SpecialMode',
		0x0201: 'Quality',
		0x0202: 'Macro', 
		0x0203: 'BWMode', 
		0x0204: 'DigitalZoom',
		0x0205: 'FocalPlaneDiagonal',
		0x0206: 'LensDistortionParams',
		0x0207: 'CameraType',
		0x0208: 'TextInfo',
		0x0209: 'CameraID',
		0x020b: 'EpsonImageWidth',
		0x020c: 'EpsonImageHeight',
		0x020d: 'EpsonSoftware',
		0x0280: 'PreviewImage',
		0x0300: 'PreCaptureFrames',
		0x0301: 'WhiteBoard',
		0x0302: 'OneTouchWB', 
		0x0303: 'WhiteBalanceBracket',
		0x0304: 'WhiteBalanceBias',
		0x0404: 'SerialNumber',
		0x0405: 'Firmware',
		0x0e00: 'PrintIM',
		0x0f00: 'DataDump',
		0x0f01: 'DataDump2',
		0x0f04: 'ZoomedPreviewStart',
		0x0f05: 'ZoomedPreviewLength',
		0x0f06: 'ZoomedPreviewSize',
		0x1000: 'ShutterSpeedValue',
		0x1001: 'ISOValue',
		0x1002: 'ApertureValue',
		0x1003: 'BrightnessValue',
		0x1004: 'FlashStatus', 
		0x1006: 'ExposureCompensation',
		0x1007: 'SensorTemperature',
		0x1008: 'LensTemperature',
		0x1009: 'LightCondition',
		0x100a: 'FocusRange', 
		0x100b: 'FocusMode', 
		0x100c: 'ManualFocusDistance',
		0x100d: 'ZoomStepCount',
		0x100e: 'FocusStepCount',
		0x100f: 'Sharpness', 
		0x1010: 'FlashChargeLevel',
		0x1011: 'ColorMatrix',
		0x1012: 'BlackLevel',
		0x1013: 'ColorTemperatureBG',
		0x1014: 'ColorTemperatureRG',
		0x1017: 'RedBalance',
		0x1018: 'BlueBalance',
		0x1019: 'ColorMatrixNumber',
		0x101a: 'SerialNumber',
		0x101b: 'ExternalFlashAE1_0',
		0x101c: 'ExternalFlashAE2_0',
		0x101d: 'InternalFlashAE1_0',
		0x101e: 'InternalFlashAE2_0',
		0x101f: 'ExternalFlashAE1',
		0x1020: 'ExternalFlashAE2',
		0x1021: 'InternalFlashAE1',
		0x1022: 'InternalFlashAE2',
		0x1023: 'FlashExposureComp',
		0x1024: 'InternalFlashTable',
		0x1025: 'ExternalFlashGValue',
		0x1026: 'ExternalFlashBounce', 
		0x1027: 'ExternalFlashZoom',
		0x1028: 'ExternalFlashMode',
		0x1029: 'Contrast', 
		0x102a: 'SharpnessFactor',
		0x102b: 'ColorControl',
		0x102c: 'ValidBits',
		0x102d: 'CoringFilter',
		0x102e: 'OlympusImageWidth',
		0x102f: 'OlympusImageHeight',
		0x1030: 'SceneDetect',
		0x1031: 'SceneArea',
		0x1033: 'SceneDetectData',
		0x1034: 'CompressionRatio',
		0x1035: 'PreviewImageValid', 
		0x1036: 'PreviewImageStart',
		0x1037: 'PreviewImageLength',
		0x1038: 'AFResult',
		0x1039: 'CCDScanMode', 
		0x103a: 'NoiseReduction', 
		0x103b: 'FocusStepInfinity',
		0x103c: 'FocusStepNear',
		0x103d: 'LightValueCenter',
		0x103e: 'LightValuePeriphery',
		0x103f: 'FieldCount'
	},
	
	_IFDpointer_Equipment: {
		0x0000: 'EquipmentVersion',
		0x0100: 'CameraType', /*{ ref: ' Olympus CameraType Values' }, // TODO */
		0x0101: 'SerialNumber',
		0x0102: 'InternalSerialNumber',
		0x0103: 'FocalPlaneDiagonal',
		0x0104: 'BodyFirmwareVersion',
		0x0201: 'LensType', /*{ ref: ' Olympus LensType Values' }, // TODO */
		0x0202: 'LensSerialNumber',
		0x0203: 'LensModel',
		0x0204: 'LensFirmwareVersion',
		0x0205: 'MaxApertureAtMinFocal',
		0x0206: 'MaxApertureAtMaxFocal',
		0x0207: 'MinFocalLength',
		0x0208: 'MaxFocalLength',
		0x020a: 'MaxAperture',
		0x020b: 'LensProperties',
		0x0301: 'Extender',
		0x0302: 'ExtenderSerialNumber',
		0x0303: 'ExtenderModel',
		0x0304: 'ExtenderFirmwareVersion',
		0x0403: 'ConversionLens',
		0x1000: 'FlashType',
		0x1002: 'FlashFirmwareVersion',
		0x1003: 'FlashSerialNumber' 
	},
	
	_IFDpointer_CameraSettings: {
		0x0000: 'CameraSettingsVersion',
		0x0100: 'PreviewImageValid',
		0x0101: 'PreviewImageStart',
		0x0102: 'PreviewImageLength',
		0x0200: 'ExposureMode', 
		0x0201: 'AELock', 
		0x0202: 'MeteringMode',
		0x0203: 'ExposureShift',
		0x0204: 'NDFilter', 
		0x0300: 'MacroMode', 
		0x0301: 'FocusMode', 
		0x0302: 'FocusProcess',
		0x0303: 'AFSearch', 
		0x0304: 'AFAreas',
		0x0305: 'AFPointSelected',
		0x0306: 'AFFineTune', 
		0x0307: 'AFFineTuneAdj', 
		0x0400: 'FlashMode', 
		0x0401: 'FlashExposureComp', 
		0x0403: 'FlashRemoteControl', 
		0x0404: 'FlashControlMode', 
		0x0405: 'FlashIntensity',
		0x0406: 'ManualFlashStrength',
		0x0500: 'WhiteBalance',
		0x0501: 'WhiteBalanceTemperature',
		0x0502: 'WhiteBalanceBracket',
		0x0503: 'CustomSaturation',
		0x0504: 'ModifiedSaturation',
		0x0505: 'ContrastSetting',
		0x0506: 'SharpnessSetting',
		0x0507: 'ColorSpace',
		0x0509: 'SceneMode',
		0x050a: 'NoiseReduction',
		0x050b: 'DistortionCorrection', 
		0x050c: 'ShadingCompensation', 
		0x050d: 'CompressionFactor',
		0x050f: 'Gradation',
		0x0520: 'PictureMode',
		0x0521: 'PictureModeSaturation',
		0x0522: 'PictureModeHue',
		0x0523: 'PictureModeContrast',
		0x0524: 'PictureModeSharpness', 
		0x0525: 'PictureModeBWFilter', 
		0x0526: 'PictureModeTone',
		0x0527: 'NoiseFilter', 
		0x0529: 'ArtFilter', 
		0x052c: 'MagicFilter',
		0x052d: 'PictureModeEffect', 
		// 0x052e: 'ToneLevel', 
		// 0x052f: 'ArtFilterEffect', 
		0x0600: 'DriveMode',
		0x0601: 'PanoramaMode',
		0x0603: 'ImageQuality', 
		0x0604: 'ImageStabilization', 
		0x0900: 'ManometerPressure',
		0x0901: 'ManometerReading',
		0x0902: 'ExtendedWBDetect', 
		0x0903: 'LevelGaugeRoll', 
		0x0904: 'LevelGaugePitch', 
		0x0908: 'DateTimeUTC' 
	},
	
	_IFDpointer_RawDevelopment: {
		0x0000: 'RawDevVersion',
		0x0100: 'RawDevExposureBiasValue',
		0x0101: 'RawDevWhiteBalanceValue',
		0x0102: 'RawDevWBFineAdjustment',
		0x0103: 'RawDevGrayPoint',
		0x0104: 'RawDevSaturationEmphasis',
		0x0105: 'RawDevMemoryColorEmphasis',
		0x0106: 'RawDevContrastValue',
		0x0107: 'RawDevSharpnessValue',
		0x0108: 'RawDevColorSpace',
		0x0109: 'RawDevEngine',
		0x010a: 'RawDevNoiseReduction',
		0x010b: 'RawDevEditStatus',
		0x010c: 'RawDevSettings'
	},
	
	_IFDpointer_RawDevelopment2: {
		0x0000: 'RawDevVersion',
		0x0100: 'RawDevExposureBiasValue',
		0x0101: 'RawDevWhiteBalance',
		0x0102: 'RawDevWhiteBalanceValue',
		0x0103: 'RawDevWBFineAdjustment',
		0x0104: 'RawDevGrayPoint',
		0x0105: 'RawDevContrastValue',
		0x0106: 'RawDevSharpnessValue',
		0x0107: 'RawDevSaturationEmphasis',
		0x0108: 'RawDevMemoryColorEmphasis',
		0x0109: 'RawDevColorSpace',
		0x010a: 'RawDevNoiseReduction',
		0x010b: 'RawDevEngine',
		0x010c: 'RawDevPictureMode',
		0x010d: 'RawDevPMSaturation',
		0x010e: 'RawDevPMContrast', 
		0x010f: 'RawDevPMSharpness', 
		0x0110: 'RawDevPM_BWFilter',
		0x0111: 'RawDevPMPictureTone',
		0x0112: 'RawDevGradation', 
		0x0113: 'RawDevSaturation3', 
		0x0119: 'RawDevAutoGradation', 
		0x0120: 'RawDevPMNoiseFilter', 
		0x0121: 'RawDevArtFilter'
	},
	
	_IFDpointer_ImageProcessing: {
		0x0000: 'ImageProcessingVersion',
		0x0100: 'WB_RBLevels', 
		0x0102: 'WB_RBLevels3000K', 
		0x0103: 'WB_RBLevels3300K', 
		0x0104: 'WB_RBLevels3600K', 
		0x0105: 'WB_RBLevels3900K', 
		0x0106: 'WB_RBLevels4000K', 
		0x0107: 'WB_RBLevels4300K', 
		0x0108: 'WB_RBLevels4500K', 
		0x0109: 'WB_RBLevels4800K', 
		0x010a: 'WB_RBLevels5300K', 
		0x010b: 'WB_RBLevels6000K', 
		0x010c: 'WB_RBLevels6600K', 
		0x010d: 'WB_RBLevels7500K', 
		0x010e: 'WB_RBLevelsCWB1',  
		0x010f: 'WB_RBLevelsCWB2',  
		0x0110: 'WB_RBLevelsCWB3',  
		0x0111: 'WB_RBLevelsCWB4',  
		0x0113: 'WB_GLevel3000K',
		0x0114: 'WB_GLevel3300K',
		0x0115: 'WB_GLevel3600K',
		0x0116: 'WB_GLevel3900K',
		0x0117: 'WB_GLevel4000K',
		0x0118: 'WB_GLevel4300K',
		0x0119: 'WB_GLevel4500K',
		0x011a: 'WB_GLevel4800K',
		0x011b: 'WB_GLevel5300K',
		0x011c: 'WB_GLevel6000K',
		0x011d: 'WB_GLevel6600K',
		0x011e: 'WB_GLevel7500K',
		0x011f: 'WB_GLevel', 
		0x0200: 'ColorMatrix',
		0x0300: 'Enhancer', 
		0x0301: 'EnhancerValues',
		0x0310: 'CoringFilter', 
		0x0311: 'CoringValues', 
		0x0600: 'BlackLevel2',  
		0x0610: 'GainBase', 
		0x0611: 'ValidBits', 
		0x0612: 'CropLeft', 
		0x0613: 'CropTop',  
		0x0614: 'CropWidth', 
		0x0615: 'CropHeight',
		0x0635: 'UnknownBlock1',
		0x0636: 'UnknownBlock2',
		0x0805: 'SensorCalibration',
		0x1010: 'NoiseReduction2',
		0x1011: 'DistortionCorrection2',
		0x1012: 'ShadingCompensation2',
		0x101c: 'MultipleExposureMode',
		0x1103: 'UnknownBlock3',
		0x1104: 'UnknownBlock4',
		0x1112: 'AspectRatio',
		0x1113: 'AspectFrame',
		0x1200: 'FacesDetected',
		0x1201: 'FaceDetectArea',
		0x1202: 'MaxFaces', 
		0x1203: 'FaceDetectFrameSize', 
		0x1207: 'FaceDetectFrameCrop', 
		0x1306: 'CameraTemperature'
	},
	
	_IFDpointer_FocusInfo: {
		0x0000: 'FocusInfoVersion', 
		0x0209: 'AutoFocus',
		0x0210: 'SceneDetect',
		0x0211: 'SceneArea',
		/* 0x0212: 'SceneDetectData', 
		// much binary data where nobody knows what it means 
		// TODO - realy nobody? 
		*/
		0x0300: 'ZoomStepCount', 
		0x0301: 'FocusStepCount', 
		0x0303: 'FocusStepInfinity', 
		0x0304: 'FocusStepNear', 
		0x0305: 'FocusDistance',
		0x0308: 'AFPoint',
		0x1201: 'ExternalFlash',
		0x1203: 'ExternalFlashGuideNumber',
		0x1204: 'ExternalFlashBounce',
		0x1205: 'ExternalFlashZoom', 
		0x1208: 'InternalFlash',
		0x1209: 'ManualFlash',
		0x120a: 'MacroLED',
		0x1500: 'SensorTemperature',
		0x1600: 'ImageStabilization2'
	},
	
	SpecialMode: function(arr){
		if( !(arr instanceof Array) || arr.length<3 ) return { value:arr, _val:arr };
		var ref = {
			0: {0:'Normal', 1:'Unknown (1)', 2:'Fast', 3:'Panorama'},
			2: {0:'(none)', 1:'Left to Right', 2:'Right to Left', 3:'Bottom to Top', 4:'Top to Bottom'},
		};
		var v0 = (arr[0] in ref[0]) ? ref[0][arr[0]] : 'Unknown ('.concat(arr[0], ')');
		var v2 = (arr[2] in ref[2]) ? ref[2][arr[2]] : 'Unknown ('.concat(arr[2], ')');
		v0.concat(', Sequence: ', arr[1], ', Panorama: ', v2 );
	},
	Quality: function(n, model){
		var ref = (new RegExp(/^SX(?!151\b)/).test(model)) ?
		{
			0: 'SQ (Low)',
			1: 'HQ (Normal)',
			2: 'SHQ (Fine)',
			6: 'RAW'
		}
		:
		{
			1: 'SQ (Low)',
			2: 'HQ (Normal)',
			3: 'SHQ (Fine)',
			4: 'RAW',
			5: 'Medium-Fine',
			6: 'Small-Fine', 
			33: 'Uncompressed'	
		};
		return (n in ref) ? { value:ref[n], _val:n } : { value:n, _val:n };
	},
	Macro: {
		0: 'Off',
		1: 'On',
		2: 'Super Macro'
	},
	BWMode: { 0: 'Off', 1: 'On' },
	
	OneTouchWB: {
		0: 'Off',
		1: 'On',
		2: 'On (Preset)',
	},
	
	ShutterSpeedValue: function(n){
		if( typeof n !== 'number' ) return { value:n, _val:n };
		var v = Math.abs(n)<100 ? Math.pow(2, -Math.abs(n)) : 0;
		return { value:MainRef.expoTime(v), _val:n };
	},
	
	ISOValue: function(n){
		if( typeof n !== 'number' ) return { value:n, _val:n };
		return { value:Math.round( ((100 * Math.pow(2, (n-5))) * 100 + 0.5) / 100 ), _val:n };
	},
	
	ApertureValue: function(n){
		if( typeof n !== 'number' ) return { value:n, _val:n };
		return { value:Math.pow(2, (n / 2)).toFixed(1), _val:n };
	},
	
	FlashDevice: {
		0: 'None',
		1: 'Internal',
		4: 'External',
		5: 'Internal + External',
	},
	
	FocusRange: {
		0: 'Normal',
		1: 'Macro',
	},
	
	ManualFocusDistance: function(n){
		return n.toString().concat(' mm');
	},
	
	Sharpness: {
		0: 'Normal',
		1: 'Hard',
		2: 'Soft',
	},
	
	WBMode: function(arr){
		if( !(arr instanceof Array) || arr.length!=2 ) return { value:'Auto', _val:arr };
		var ref = {
			_1_  : 'Auto',
			_1_0: 'Auto',
			_1_2: 'Auto (2)',
			_1_4: 'Auto (4)',
			_2_2: '3000 Kelvin',
			_2_3: '3700 Kelvin',
			_2_4: '4000 Kelvin',
			_2_5: '4500 Kelvin',
			_2_6: '5500 Kelvin',
			_2_7: '6500 Kelvin',
			_2_8: '7500 Kelvin',
			_3_0: 'One-touch'
		};
		var v = '_'.concat(arr[0],'_',arr[1]);
		return (v in ref) ? { value:ref[v], _val:arr } : { value:arr, _val:arr };
	},
	
	ExternalFlashBounce: {
		0: 'No',
		1: 'Yes'
	},
	
	Contrast: { 
		0: 'High',
		1: 'Normal',
		2: 'Low'
	},
	
	/* IFD-Versions ... */
	MakerNoteVersion: function(arr){ return MainRef.versions(arr, 4); }, 
	EquipmentVersion: function(arr){ return MainRef.versions(arr, 4); }, 
	CameraSettingsVersion: function(arr){ return MainRef.versions(arr, 4); },
	RawDevVersion: function(arr){ return MainRef.versions(arr, 4); },
	FocusInfoVersion: function(arr){ return MainRef.versions(arr, 4); },
	RawDevVersion: function(arr){ return MainRef.versions(arr, 4); },
	ImageProcessingVersion: function(arr){ return MainRef.versions(arr, 4); },
	RawInfoVersion: function(arr){ return MainRef.versions(arr, 4); },
	
	/* IFD Equipment ... */
	/* points just to a string... - PH: "this really should have been a string" */
	CameraID: '',
	/* this just seems to identify original Olympus vs vendors using Olympus style exif 
	// the model can be found in CameraType
	*/
	FocalPlaneDiagonal: function(n){
		var v = (typeof n === 'number') ? n.toString().concat(' mm') : n;
		return {value:v, _val:n};
	},
	
	BodyFirmwareVersion: function(n){ return exports.ref.firmware(n); },
	LensFirmwareVersion: function(n){ return exports.ref.firmware(n); },
	ExtenderFirmwareVersion: function(n){ return exports.ref.firmware(n); },
	FlashFirmwareVersion: function(n){ return exports.ref.firmware(n); },
	MaxApertureAtMinFocal: function(n){ return exports.ref.aperture(n); },
	MaxApertureAtMaxFocal: function(n){ return exports.ref.aperture(n); },
	MaxAperture: function(n){ return exports.ref.aperture(n); },
	
	FlashModel: {
		0: 'None',
		1: 'FL-20 or Inon UW', // (or subtronic digital or Inon UW flash, ref 11)
		2: 'FL-50 or SCA', // (or Metzblitz+SCA or Cullmann 34, ref 11)
		3: 'RF-11',
		4: 'TF-22',
		5: 'FL-36',
		6: 'FL-50R or Metz', //11 (or Metz mecablitz digital)
		7: 'FL-36R', //11
		9: 'Unknown'
	},
	
	Extender: function(arr){
		if( !(arr instanceof Array) ) return { value:'n/a', _val:arr };
		var extenders = {
			_0_0: 'None',
			_0_4: 'Olympus Zuiko Digital EC-14 1.4x Teleconverter',
			_0_8: 'Olympus EX-25 Extension Tube',
			_0_16: 'Olympus Zuiko Digital EC-20 2.0x Teleconverter'
		}
		
		var val = '_'.concat(arr[0], '_', arr[2]);
		return (val in extenders) ? { value: extenders[val], _val: arr } : { value: arr, _val: arr };
	},
	
	LensType: function(arr){
		if( !(arr instanceof Array) ) return { value:'n/a', _val:arr };
		var lenses = {
			_0_0_0: 'n/a',
			// Olympus lenses (also Kenko Tokina)
			_0_1_0: 'Olympus Zuiko Digital ED 50mm F2.0 Macro',
			_0_1_1: 'Olympus Zuiko Digital 40-150mm F3.5-4.5', //8
			_0_1_16: 'Olympus M.Zuiko Digital ED 14-42mm F3.5-5.6', //PH (E-P1 pre-production)
			_0_2_0: 'Olympus Zuiko Digital ED 150mm F2.0',
			_0_2_16: 'Olympus M.Zuiko Digital 17mm F2.8 Pancake', //PH (E-P1 pre-production)
			_0_3_0: 'Olympus Zuiko Digital ED 300mm F2.8',
			_0_3_16: 'Olympus M.Zuiko Digital ED 14-150mm F4.0-5.6', //11
			_0_4_16: 'Olympus M.Zuiko Digital ED 9-18mm F4.0-5.6', //11
			_0_5_0: 'Olympus Zuiko Digital 14-54mm F2.8-3.5',
			_0_5_1: 'Olympus Zuiko Digital Pro ED 90-250mm F2.8', //9
			_0_5_16: 'Olympus M.Zuiko Digital ED 14-42mm F3.5-5.6 L', //11 (E-PL1)
			_0_6_0: 'Olympus Zuiko Digital ED 50-200mm F2.8-3.5',
			_0_6_1: 'Olympus Zuiko Digital ED 8mm F3.5 Fisheye', //9
			_0_6_16: 'Olympus M.Zuiko Digital ED 40-150mm F4.0-5.6', //PH
			_0_7_0: 'Olympus Zuiko Digital 11-22mm F2.8-3.5',
			_0_7_1: 'Olympus Zuiko Digital 18-180mm F3.5-6.3', //6
			_0_7_16: 'Olympus M.Zuiko Digital ED 12mm F2.0', //PH
			_0_8_1: 'Olympus Zuiko Digital 70-300mm F4.0-5.6', //7 (seen as release 1 - PH)
			_0_8_16: 'Olympus M.Zuiko Digital ED 75-300mm F4.8-6.7', //PH
			_0_9_16: 'Olympus M.Zuiko Digital 14-42mm F3.5-5.6 II', //PH (E-PL2)
			_0_16_1: 'Kenko Tokina Reflex 300mm F6.3 MF Macro', //20
			_0_16_16: 'Olympus M.Zuiko Digital ED 12-50mm F3.5-6.3 EZ', //PH
			_0_17_16: 'Olympus M.Zuiko Digital 45mm F1.8', //17
			_0_18_16: 'Olympus M.Zuiko Digital ED 60mm F2.8 Macro', //20
			_0_19_16: 'Olympus M.Zuiko Digital 14-42mm F3.5-5.6 II R', //PH/20
			_0_20_16: 'Olympus M.Zuiko Digital ED 40-150mm F4.0-5.6 R', //19
			/* 
			_0_14 10.1': 'Olympus M.Zuiko Digital ED 14-150mm F4.0-5.6 II', 
			// 11 (questionable & unconfirmed)
			*/
			_0_21_0: 'Olympus Zuiko Digital ED 7-14mm F4.0',
			_0_21_16: 'Olympus M.Zuiko Digital ED 75mm F1.8', //PH
			_0_22_16: 'Olympus M.Zuiko Digital 17mm F1.8', //20
			_0_23_0: 'Olympus Zuiko Digital Pro ED 35-100mm F2.0', //7
			_0_24_0: 'Olympus Zuiko Digital 14-45mm F3.5-5.6',
			_0_24_16: 'Olympus M.Zuiko Digital ED 75-300mm F4.8-6.7 II', //20
			_0_25_16: 'Olympus M.Zuiko Digital ED 12-40mm F2.8 Pro', //PH
			_0_32_0: 'Olympus Zuiko Digital 35mm F3.5 Macro', //9
			_0_32_16: 'Olympus M.Zuiko Digital ED 40-150mm F2.8 Pro', //PH (guess)
			_0_33_16: 'Olympus M.Zuiko Digital ED 14-42mm F3.5-5.6 EZ', //20
			_0_34_0: 'Olympus Zuiko Digital 17.5-45mm F3.5-5.6', //9
			_0_34_16: 'Olympus M.Zuiko Digital 25mm F1.8', //20
			_0_35_0: 'Olympus Zuiko Digital ED 14-42mm F3.5-5.6', //PH
			_0_36_0: 'Olympus Zuiko Digital ED 40-150mm F4.0-5.6', //PH
			_0_48_0: 'Olympus Zuiko Digital ED 50-200mm F2.8-3.5 SWD', //7
			_0_49_0: 'Olympus Zuiko Digital ED 12-60mm F2.8-4.0 SWD', //7
			_0_50_0: 'Olympus Zuiko Digital ED 14-35mm F2.0 SWD', //PH
			_0_51_0: 'Olympus Zuiko Digital 25mm F2.8', //PH
			_0_52_0: 'Olympus Zuiko Digital ED 9-18mm F4.0-5.6', //7
			_0_53_0: 'Olympus Zuiko Digital 14-54mm F2.8-3.5 II', //PH
			// Sigma lenses
			_1_1_0: 'Sigma 18-50mm F3.5-5.6 DC', //8
			_1_1_16: 'Sigma 30mm F2.8 EX DN', //20
			_1_2_0: 'Sigma 55-200mm F4.0-5.6 DC',
			_1_2_16: 'Sigma 19mm F2.8 EX DN', //20
			_1_3_0: 'Sigma 18-125mm F3.5-5.6 DC',
			_1_3_16: 'Sigma 30mm F2.8 DN | A', //20
			_1_4_0: 'Sigma 18-125mm F3.5-5.6 DC', //7
			_1_4_16: 'Sigma 19mm F2.8 DN | A', //20
			_1_5_0: 'Sigma 30mm F1.4 EX DC HSM', //10
			_1_5_16: 'Sigma 60mm F2.8 DN | A', //20
			_1_6_0: 'Sigma APO 50-500mm F4.0-6.3 EX DG HSM', //6
			_1_7_0: 'Sigma Macro 105mm F2.8 EX DG', //PH
			_1_8_0: 'Sigma APO Macro 150mm F2.8 EX DG HSM', //PH
			_1_9_0: 'Sigma 18-50mm F2.8 EX DC Macro', //20
			_1_16_0: 'Sigma 24mm F1.8 EX DG Aspherical Macro', //PH
			_1_17_0: 'Sigma APO 135-400mm F4.5-5.6 DG', //11
			_1_18_0: 'Sigma APO 300-800mm F5.6 EX DG HSM', //11
			_1_19_0: 'Sigma 30mm F1.4 EX DC HSM', //11
			_1_20_0: 'Sigma APO 50-500mm F4.0-6.3 EX DG HSM', //11
			_1_21_0: 'Sigma 10-20mm F4.0-5.6 EX DC HSM', //11
			_1_22_0: 'Sigma APO 70-200mm F2.8 II EX DG Macro HSM', //11
			_1_23_0: 'Sigma 50mm F1.4 EX DG HSM', //11
			// Panasonic/Leica lenses (ref 11)
			_2_1_0: 'Leica D Vario Elmarit 14-50mm F2.8-3.5 Asph.',
			_2_1_16: 'Lumix G Vario 14-45mm F3.5-5.6 Asph. Mega OIS', //16
			_2_2_0: 'Leica D Summilux 25mm F1.4 Asph.',
			_2_2_16: 'Lumix G Vario 45-200mm F4.0-5.6 Mega OIS', //16
			_2_3_0: 'Leica D Vario Elmar 14-50mm F3.8-5.6 Asph. Mega OIS', //11
			_2_3_1: 'Leica D Vario Elmar 14-50mm F3.8-5.6 Asph.', //14 (L10 kit)
			_2_3_16: 'Lumix G Vario HD 14-140mm F4.0-5.8 Asph. Mega OIS', //16
			_2_4_0: 'Leica D Vario Elmar 14-150mm F3.5-5.6', //13
			_2_4_16: 'Lumix G Vario 7-14mm F4.0 Asph.', //PH (E-P1 pre-production)
			_2_5_16: 'Lumix G 20mm F1.7 Asph.', //16
			_2_6_16: 'Leica DG Macro-Elmarit 45mm F2.8 Asph. Mega OIS', //PH
			_2_7_16: 'Lumix G Vario 14-42mm F3.5-5.6 Asph. Mega OIS', //20
			_2_8_16: 'Lumix G Fisheye 8mm F3.5', //PH
			_2_9_16: 'Lumix G Vario 100-300mm F4.0-5.6 Mega OIS', //11
			_2_16_16: 'Lumix G 14mm F2.5 Asph.', //17
			_2_17_16: 'Lumix G 12.5mm F12 3D', //20 (H-FT012)
			_2_18_16: 'Leica DG Summilux 25mm F1.4 Asph.', //20
			_2_19_16: 'Lumix G X Vario PZ 45-175mm F4.0-5.6 Asph. Power OIS', //20
			_2_20_16: 'Lumix G X Vario PZ 14-42mm F3.5-5.6 Asph. Power OIS', //20
			_2_21_16: 'Lumix G X Vario 12-35mm F2.8 Asph. Power OIS', //PH
			_2_22_16: 'Lumix G Vario 45-150mm F4.0-5.6 Asph. Mega OIS', //20
			_2_23_16: 'Lumix G X Vario 35-100mm F2.8 Power OIS', //PH
			_2_24_16: 'Lumix G Vario 14-42mm F3.5-5.6 II Asph. Mega OIS', //20
			_2_25_16: 'Lumix G Vario 14-140mm F3.5-5.6 Asph. Power OIS', //20
			_2_32_16: 'Lumix G Vario 12-32mm F3.5-5.6 Asph. Mega OIS', //20
			_2_33_16: 'Leica DG Nocticron 42.5mm F1.2 Asph. Power OIS', //20
			_3_1_0: 'Leica D Vario Elmarit 14-50mm F2.8-3.5 Asph.',
			_3_2_0: 'Leica D Summilux 25mm F1.4 Asph.'
		};
		
		var val = '_'.concat(arr[0], '_', arr[2], '_', arr[3]);
		return (val in lenses) ? { value: lenses[val], _val: arr } : { value: arr, _val: arr };
	},
	
	CameraType: {
		D4028:  'X-2,C-50Z',
		D4029:  'E-20,E-20N,E-20P',
		D4034:  'C720UZ',
		D4040:  'E-1',
		D4041:  'E-300',
		D4083:  'C2Z,D520Z,C220Z',
		D4106:  'u20D,S400D,u400D',
		D4120:  'X-1',
		D4122:  'u10D,S300D,u300D',
		D4125:  'AZ-1',
		D4141:  'C150,D390',
		D4193:  'C-5000Z',
		D4194:  'X-3,C-60Z',
		D4199:  'u30D,S410D,u410D',
		D4205:  'X450,D535Z,C370Z',
		D4210:  'C160,D395',
		D4211:  'C725UZ',
		D4213:  'FerrariMODEL2003',
		D4216:  'u15D',
		D4217:  'u25D',
		D4220:  'u-miniD,Stylus V',
		D4221:  'u40D,S500,uD500',
		D4231:  'FerrariMODEL2004',
		D4240:  'X500,D590Z,C470Z',
		D4244:  'uD800,S800',
		D4256:  'u720SW,S720SW',
		D4261:  'X600,D630,FE5500',
		D4262:  'uD600,S600',
		D4301:  'u810/S810', // (yes, "/".  Olympus is not consistent in the notation)
		D4302:  'u710,S710',
		D4303:  'u700,S700',
		D4304:  'FE100,X710',
		D4305:  'FE110,X705',
		D4310:  'FE-130,X-720',
		D4311:  'FE-140,X-725',
		D4312:  'FE150,X730',
		D4313:  'FE160,X735',
		D4314:  'u740,S740',
		D4315:  'u750,S750',
		D4316:  'u730/S730',
		D4317:  'FE115,X715',
		D4321:  'SP550UZ',
		D4322:  'SP510UZ',
		D4324:  'FE170,X760',
		D4326:  'FE200',
		D4327:  'FE190/X750', // (also SX876)
		D4328:  'u760,S760',
		D4330:  'FE180/X745', // (also SX875)
		D4331:  'u1000/S1000',
		D4332:  'u770SW,S770SW',
		D4333:  'FE240/X795',
		D4334:  'FE210,X775',
		D4336:  'FE230/X790',
		D4337:  'FE220,X785',
		D4338:  'u725SW,S725SW',
		D4339:  'FE250/X800',
		D4341:  'u780,S780',
		D4343:  'u790SW,S790SW',
		D4344:  'u1020,S1020',
		D4346:  'FE15,X10',
		D4348:  'FE280,X820,C520',
		D4349:  'FE300,X830',
		D4350:  'u820,S820',
		D4351:  'u1200,S1200',
		D4352:  'FE270,X815,C510',
		D4353:  'u795SW,S795SW',
		D4354:  'u1030SW,S1030SW',
		D4355:  'SP560UZ',
		D4356:  'u1010,S1010',
		D4357:  'u830,S830',
		D4359:  'u840,S840',
		D4360:  'FE350WIDE,X865',
		D4361:  'u850SW,S850SW',
		D4362:  'FE340,X855,C560',
		D4363:  'FE320,X835,C540',
		D4364:  'SP570UZ',
		D4366:  'FE330,X845,C550',
		D4368:  'FE310,X840,C530',
		D4370:  'u1050SW,S1050SW',
		D4371:  'u1060,S1060',
		D4372:  'FE370,X880,C575',
		D4374:  'SP565UZ',
		D4377:  'u1040,S1040',
		D4378:  'FE360,X875,C570',
		D4379:  'FE20,X15,C25',
		D4380:  'uT6000,ST6000',
		D4381:  'uT8000,ST8000',
		D4382:  'u9000,S9000',
		D4384:  'SP590UZ',
		D4385:  'FE3010,X895',
		D4386:  'FE3000,X890',
		D4387:  'FE35,X30',
		D4388:  'u550WP,S550WP',
		D4390:  'FE5000,X905',
		D4391:  'u5000',
		D4392:  'u7000,S7000',
		D4396:  'FE5010,X915',
		D4397:  'FE25,X20',
		D4398:  'FE45,X40',
		D4401:  'XZ-1',
		D4402:  'uT6010,ST6010',
		D4406:  'u7010,S7010 / u7020,S7020',
		D4407:  'FE4010,X930',
		D4408:  'X560WP',
		D4409:  'FE26,X21',
		D4410:  'FE4000,X920,X925',
		D4411:  'FE46,X41,X42',
		D4412:  'FE5020,X935',
		D4413:  'uTough-3000',
		D4414:  'StylusTough-6020',
		D4415:  'StylusTough-8010',
		D4417:  'u5010,S5010',
		D4418:  'u7040,S7040',
		D4419:  'u9010,S9010',
		D4423:  'FE4040',
		D4424:  'FE47,X43',
		D4426:  'FE4030,X950',
		D4428:  'FE5030,X965,X960',
		D4430:  'u7030,S7030',
		D4432:  'SP600UZ',
		D4434:  'SP800UZ',
		D4439:  'FE4020,X940',
		D4442:  'FE5035',
		D4448:  'FE4050,X970',
		D4450:  'FE5050,X985',
		D4454:  'u-7050',
		D4464:  'T10,X27',
		D4470:  'FE5040,X980',
		D4472:  'TG-310',
		D4474:  'TG-610',
		D4476:  'TG-810',
		D4478:  'VG145,VG140,D715',
		D4479:  'VG130,D710',
		D4480:  'VG120,D705',
		D4482:  'VR310,D720',
		D4484:  'VR320,D725',
		D4486:  'VR330,D730',
		D4488:  'VG110,D700',
		D4490:  'SP-610UZ',
		D4492:  'SZ-10',
		D4494:  'SZ-20',
		D4496:  'SZ-30MR',
		D4498:  'SP-810UZ',
		D4500:  'SZ-11',
		D4504:  'TG-615',
		D4508:  'TG-620',
		D4510:  'TG-820',
		D4512:  'TG-1',
		D4516:  'SH-21',
		D4519:  'SZ-14',
		D4520:  'SZ-31MR',
		D4521:  'SH-25MR',
		D4523:  'SP-720UZ',
		D4529:  'VG170',
		D4531:  'XZ-2',
		D4535:  'SP-620UZ',
		D4536:  'TG-320',
		D4537:  'VR340,D750',
		D4541:  'SZ-12',
		D4545:  'VH410',
		D4546:  'XZ-10', //21
		D4547:  'TG-2',
		D4548:  'TG-830',
		D4549:  'TG-630',
		D4550:  'SH-50',
		D4553:  'SZ-16,DZ-105',
		D4562:  'SP-820UZ',
		D4566:  'SZ-15',
		D4572:  'STYLUS1',
		D4809:  'C2500L',
		D4842:  'E-10',
		D4856:  'C-1',
		D4857:  'C-1Z,D-150Z',
		DCHC:  	'D500L',
		DCHT:  	'D600L / D620L',
		S0003:  'E-330',
		S0004:  'E-500',
		S0009:  'E-400',
		S0010:  'E-510',
		S0011:  'E-3',
		S0013:  'E-410',
		S0016:  'E-420',
		S0017:  'E-30',
		S0018:  'E-520',
		S0019:  'E-P1',
		S0023:  'E-620',
		S0026:  'E-P2',
		S0027:  'E-PL1',
		S0029:  'E-450',
		S0030:  'E-600',
		S0032:  'E-P3',
		S0033:  'E-5',
		S0034:  'E-PL2',
		S0036:  'E-M5',
		S0038:  'E-PL3',
		S0039:  'E-PM1',
		S0040:  'E-PL1s',
		S0042:  'E-PL5',
		S0043:  'E-PM2',
		S0044:  'E-P5',
		S0045:  'E-PL6',
		S0047:  'E-M1',
		S0051:  'E-M10',
		SR45:  	'D220',
		SR55:  	'D320L',
		SR83:  	'D340L',
		SR85:  	'C830L,D340R',
		SR852:  'C860L,D360L',
		SR872:  'C900Z,D400Z',
		SR874:  'C960Z,D460Z',
		SR951:  'C2000Z',
		SR952:  'C21',
		SR953:  'C21T.commu',
		SR954:  'C2020Z',
		SR955:  'C990Z,D490Z',
		SR956:  'C211Z',
		SR959:  'C990ZS,D490Z',
		SR95A:  'C2100UZ',
		SR971:  'C100,D370',
		SR973:  'C2,D230',
		SX151:  'E100RS',
		SX351:  'C3000Z / C3030Z',
		SX354:  'C3040Z',
		SX355:  'C2040Z',
		SX357:  'C700UZ',
		SX358:  'C200Z,D510Z',
		SX374:  'C3100Z,C3020Z',
		SX552:  'C4040Z',
		SX553:  'C40Z,D40Z',
		SX556:  'C730UZ',
		SX558:  'C5050Z',
		SX571:  'C120,D380',
		SX574:  'C300Z,D550Z',
		SX575:  'C4100Z,C4000Z',
		SX751:  'X200,D560Z,C350Z',
		SX752:  'X300,D565Z,C450Z',
		SX753:  'C750UZ',
		SX754:  'C740UZ',
		SX755:  'C755UZ',
		SX756:  'C5060WZ',
		SX757:  'C8080WZ',
		SX758:  'X350,D575Z,C360Z',
		SX759:  'X400,D580Z,C460Z',
		SX75A:  'AZ-2ZOOM',
		SX75B:  'D595Z,C500Z',
		SX75C:  'X550,D545Z,C480Z',
		SX75D:  'IR-300',
		SX75F:  'C55Z,C5500Z',
		SX75G:  'C170,D425',
		SX75J:  'C180,D435',
		SX771:  'C760UZ',
		SX772:  'C770UZ',
		SX773:  'C745UZ',
		SX774:  'X250,D560Z,C350Z',
		SX775:  'X100,D540Z,C310Z',
		SX776:  'C460ZdelSol',
		SX777:  'C765UZ',
		SX77A:  'D555Z,C315Z',
		SX851:  'C7070WZ',
		SX852:  'C70Z,C7000Z',
		SX853:  'SP500UZ',
		SX854:  'SP310',
		SX855:  'SP350',
		SX873:  'SP320',
		SX875:  'FE180/X745', // (also D4330)
		SX876:  'FE190/X750' // (also D4327)
		/*
		//   other brands
		//    4MP9Q3:  'Camera 4MP-9Q3'
		//    4MP9T2:  'BenQ DC C420 / Camera 4MP-9T2'
		//    5MP9Q3:  'Camera 5MP-9Q3',
		//    5MP9X9:  'Camera 5MP-9X9',
		//    5MP-9T: 'Camera 5MP-9T3',
		//    5MP-9Y: 'Camera 5MP-9Y2',
		//    6MP-9U: 'Camera 6MP-9U9',
		//    7MP9Q3:  'Camera 7MP-9Q3',
		//    8MP-9U: 'Camera 8MP-9U4',
		//    CE5330:  'Acer CE-5330',
		//    CP-853: 'Acer CP-8531',
		//    CS5531:  'Acer CS5531',
		//    DC500 :  'SeaLife DC500',
		//    DC7370:  'Camera 7MP-9GA',
		//    DC7371:  'Camera 7MP-9GM',
		//    DC7371:  'Hitachi HDC-751E',
		//    DC7375:  'Hitachi HDC-763E / Rollei RCP-7330X / Ricoh Caplio RR770 / Vivitar ViviCam 7330',
		//    DC E63: 'BenQ DC E63+',
		//    DC P86: 'BenQ DC P860',
		//    DS5340:  'Maginon Performic S5 / Premier 5MP-9M7',
		//    DS5341:  'BenQ E53+ / Supra TCM X50 / Maginon X50 / Premier 5MP-9P8',
		//    DS5346:  'Premier 5MP-9Q2',
		//    E500  :  'Konica Minolta DiMAGE E500',
		//    MAGINO:  'Maginon X60',
		//    Mz60  :  'HP Photosmart Mz60',
		//    Q3DIGI:  'Camera 5MP-9Q3',
		//    SLIMLI:  'Supra Slimline X6',
		//    V8300s:  'Vivitar V8300s'
		*/
	},
	
	
	/* IFD CameraSettings ... */
	PreviewImageValid: { 0: 'No', 1: 'Yes' },
	
	ExposureMode: {
		1: 'Manual',
		2: 'Program', 
		3: 'Aperture-priority AE',
		4: 'Shutter speed priority AE',
		5: 'Program-shift'
	},
	
	AELock: { 0: 'Off', 1: 'On' },
	
	MeteringMode: {
		2: 'Center-weighted average',
		3: 'Spot',
		5: 'ESP',
		261: 'Pattern+AF', 
		515: 'Spot+Highlight control', 
		1027: 'Spot+Shadow control'
	},
	
	ExposureShift: { 0: 'Off', 1: 'On' },
	
	MacroMode: {
		0: 'Off',
		1: 'On',
		2: 'Super Macro'
	},
	
	FocusMode: function(n){
		var fm = {
			0: 'Single AF',
			1: 'Sequential shooting AF',
			2: 'Continuous AF',
			3: 'Multi AF',
			5: 'Face detect', 
			10: 'MF'
		};
		var fmBitmask = {
			0: 'S-AF',
			2: 'C-AF',
			4: 'MF',
			5: 'Face detect',
			6: 'Imager AF',
			7: 'Live View Magnification Frame',
			8: 'AF sensor'
		}
		if(typeof n === 'number') n = [n];
		if (n.length === 1){
			return (n[0] in fm) ? { value:fm[n[0]], _val:n } : { value:'n/a', _val:n };
		} else {
			return { value:MainRef.bitmask(n, fmBitmask, 8, true /*TODO - why reverse?*/ ), _val:n };
		}
	},
	
	FocusProcess: function(n){
		var v = ( n instanceof Array ) ? n.shift() : n;
		var ref = { 0: 'AF Not Used', 1: 'AF Used' };
		return (v in ref) ? { value:ref[v], _val:n } : { value:'n/a', _val:n };
	},
	
	AFSearch: { 0: 'Not Ready', 1: 'Ready' },

	AFAreas: function(arr){
		// TODO - FIXME
		if( !(arr instanceof Array) ) return { value:'n/a', _val:arr };
		if( arr instanceof Array ) return arr[0];
	},
	
	AFPointSelected: function(arr){
		if( !(arr instanceof Array) ) return { value:'n/a', _val:arr };
		arr.shift();
		var v = arr.map( function(n){return Math.round(n*100).toString().concat('%');} );
		return (v!='%') ? { value: v, _val: arr } : { value: arr, _val: arr };
	},
	
	AFFineTune: { 0: 'Off', 1: 'On' },
	
	AFFineTuneAdj: function(arr){ 
		if( arr instanceof Array ) return arr.slice(0, 3).join(',');
		return { value:0, _val:0 };
	},
	
	FlashStatus: { 0: 'Off', 1: 'On' },
	
	FlashMode: function(n){
		if( typeof n !== 'number' || n===0 ) return { value:'Off', _val:0 };
		var flBitmask = {0:'On',  1: 'Fill-in', 2:'Red-eye', 3: 'Slow-sync', 4:'Forced On', 5:'2nd Curtain'};
		return { value:MainRef.bitmask(n, flBitmask, 5, true /*TODO - why reverse?*/ ), _val:n };
	},
	
	FlashRemoteControl: {
		0: 'Off',
		0x01: 'Channel 1, Low',
		0x02: 'Channel 2, Low',
		0x03: 'Channel 3, Low',
		0x04: 'Channel 4, Low',
		0x09: 'Channel 1, Mid',
		0x0a: 'Channel 2, Mid',
		0x0b: 'Channel 3, Mid',
		0x0c: 'Channel 4, Mid',
		0x11: 'Channel 1, High',
		0x12: 'Channel 2, High',
		0x13: 'Channel 3, High',
		0x14: 'Channel 4, High'
	},
	
	FlashControlMode: function(arr){
		var flc = {
			0: 'Off',
			3: 'TTL',
			4: 'Auto',
			5: 'Manual'
		};
		return exports.ref.arr0(arr, flc);
	},
	
	FlashIntensity: function(arr){ return exports.ref.flashStrength(arr); },
	ManualFlashStrength: function(arr){ return exports.ref.flashStrength(arr); },
	
	WhiteBalance: {
		0: 'Auto',
		16: '7500K (Fine Weather with Shade)',
		17: '6000K (Cloudy)',
		18: '5300K (Fine Weather)',
		20: '3000K (Tungsten light)',
		21: '3600K (Tungsten light-like)',
		33: '6600K (Daylight fluorescent)',
		34: '4500K (Neutral white fluorescent)',
		35: '4000K (Cool white fluorescent)',
		48: '3600K (Tungsten light-like)',
		256: 'Custom WB 1',
		257: 'Custom WB 2',
		258: 'Custom WB 3',
		259: 'Custom WB 4',
		512: 'Custom WB 5400K',
		513: 'Custom WB 2900K',
		514: 'Custom WB 8000K'
	},
	
	WhiteBalanceTemperature: function(n){
		return (typeof n==='number' && n>0) ? { value:n.toString().concat(' Kelvin'), _val:n } : { value:'Auto', _val:0 };
	},
	
	CustomSaturation: function(arr,model){
		if( !(arr instanceof Array) ) return { value:'n/a', _val:arr };
		console.log( 'CustomSaturation1', arr );
		console.log( 'CustomSaturation2', model );
		if(model.indexOf('E-1') === 0){
			var a = arr[0]-arr[1];
			var c = arr[2]-arr[1];
			return 'CS'.concat(a, ' (min CS0', ' max ', c, ')');
		} else {
			return a[0].toString().concat(' (min ', a[1], ' max ', a[2], ')');
		}	
	},
	
	ModifiedSaturation: {
		0: 'Off',
		1: 'CM1 (Red Enhance)',
		2: 'CM2 (Green Enhance)',
		3: 'CM3 (Blue Enhance)',
		4: 'CM4 (Skin Tones)'
	},
	
	ContrastSetting: function(arr){ return exports.ref.minmax(arr); },
	SharpnessSetting: function(arr){ return exports.ref.minmax(arr); },
	
	ColorSpace: { 
		0: 'sRGB',
		1: 'Adobe RGB',
		2: 'Pro Photo RGB'
	},
	
	SceneMode: {
		0: 'Standard',
		6: 'Auto', //6
		7: 'Sport',
		8: 'Portrait',
		9: 'Landscape+Portrait',
		10: 'Landscape',
		11: 'Night Scene',
		12: 'Self Portrait', //11
		13: 'Panorama', //6
		14: '2 in 1', //11
		15: 'Movie', //11
		16: 'Landscape+Portrait', //6
		17: 'Night+Portrait',
		18: 'Indoor', //11 (Party - PH)
		19: 'Fireworks',
		20: 'Sunset',
		21: 'Beauty Skin', //PH
		22: 'Macro',
		23: 'Super Macro', //11
		24: 'Food', //11
		25: 'Documents',
		26: 'Museum',
		27: 'Shoot & Select', //11
		28: 'Beach & Snow',
		29: 'Self Protrait+Timer', //11
		30: 'Candle',
		31: 'Available Light', //11
		32: 'Behind Glass', //11
		33: 'My Mode', //11
		34: 'Pet', //11
		35: 'Underwater Wide1', //6
		36: 'Underwater Macro', //6
		37: 'Shoot & Select1', //11
		38: 'Shoot & Select2', //11
		39: 'High Key',
		40: 'Digital Image Stabilization', //6
		41: 'Auction', //11
		42: 'Beach', //11
		43: 'Snow', //11
		44: 'Underwater Wide2', //6
		45: 'Low Key', //6
		46: 'Children', //6
		47: 'Vivid', //11
		48: 'Nature Macro', //6
		49: 'Underwater Snapshot', //11
		50: 'Shooting Guide', //11
		54: 'Face Portrait', //11
		57: 'Bulb', //11
		59: 'Smile Shot', //11
		60: 'Quick Shutter', //11
		63: 'Slow Shutter', //11
		64: 'Bird Watching', //11
		65: 'Multiple Exposure', //11
		66: 'e-Portrait', //11
		67: 'Soft Background Shot', //11
		142: 'Hand-held Starlight', //PH (SH-21)
		154: 'HDR' //PH (XZ-2)
	},
	
	DistortionCorrection: { 0: 'Off', 1: 'On' },
	ShadingCompensation: { 0: 'Off', 1: 'On' },
	
	Gradation: function(n){
		if( typeof n === 'undefined' ) return { value:'n/a', _val:0 };
		var ref = {
			0: 'User-Selected',
			1: 'Auto-Override',
		};
		var v = n;
		if(n instanceof Array){
			v = '_'.concat(arr.join('_'));
			ref = {
			   '_0_0_0': 'n/a', 
			   '_-1_-1_1': 'Low Key',
				'_0_-1_1': 'Normal',
				'_1_-1_1': 'High Key',
			};	
		}
		return (v in ref) ? { value:ref[v], _val:n } : { value:'n/a', _val:n };
	},
	
	NoiseReduction: function(n){
		if( typeof n !== 'number' || n===0 ) return { value:'Off', _val:0 };
		var nrBitmask = {0:'On',  1: 'Fill-in', 2:'Red-eye', 3: 'Slow-sync', 4:'Forced On', 5:'2nd Curtain'};
		return { value:MainRef.bitmask(n, nrBitmask, 5, true /*TODO - why reverse?*/ ), _val:n };
	},
	
	PictureMode: function(arr){
		if( !(arr instanceof Array) ) arr = [arr];
		var pm = {
			1: 'Vivid',
			2: 'Natural',
			3: 'Muted',
			4: 'Portrait',
			5: 'i-Enhance',
			256: 'Monotone',
			512: 'Sepia'
		};
		var rStr = (arr[0] in pm) ? pm[arr[0]] : arr[0];
		return { value:rStr, _val:arr };
	},
	
	PictureModeSaturation: function(arr){ return exports.ref.minmax(arr); },
	PictureModeContrast: function(arr){ return exports.ref.minmax(arr); },
	PictureModeSharpness: function(arr){ return exports.ref.minmax(arr); },
	
	PictureModeBWFilter: {
		0: 'n/a',
		1: 'Neutral',
		2: 'Yellow',
		3: 'Orange',
		4: 'Red',
		5: 'Green',
	},
	
	PictureModeTone: {
		0: 'n/a',
		1: 'Neutral',
		2: 'Sepia',
		3: 'Blue',
		4: 'Purple',
		5: 'Green',
	},
	
	filters: {
		0: 'Off',
		1: 'Soft Focus', // (XZ-1)
		2: 'Pop Art', // (SZ-10 magic filter 1,SZ-31MR,E-M5,E-PL3)
		3: 'Pale & Light Color',
		4: 'Light Tone',
		5: 'Pin Hole', // (SZ-10 magic filter 2,SZ-31MR,E-PL3)
		6: 'Grainy Film',
		9: 'Diorama',
		10: 'Cross Process',
		12: 'Fish Eye', // (SZ-10 magic filter 3)
		13: 'Drawing', // (SZ-10 magic filter 4)
		14: 'Gentle Sepia', // (E-5)
		15: 'Tender Light', //11
		16: 'Pop Art II', //11 (E-PL3 "(dark)" - PH)
		17: 'Pin Hole II', //11 (E-PL3 "(color 2)" - PH)
		18: 'Pin Hole III', //11 (E-M5, E-PL3 "(color 3)" - PH)
		19: 'Grainy Film II', //11
		20: 'Dramatic Tone', // (XZ-1,SZ-31MR)
		21: 'Punk', // (SZ-10 magic filter 6)
		22: 'Soft Focus 2', // (SZ-10 magic filter 5)
		23: 'Sparkle', // (SZ-10 magic filter 7)
		24: 'Watercolor', // (SZ-10 magic filter 8)
		25: 'Key Line', // (E-M5)
		27: 'Miniature', // (SZ-31MR)
		28: 'Reflection', // (TG-820,SZ-31MR)
		29: 'Fragmented', // (TG-820,SZ-31MR)
		32: 'Dramatic Tone B&W', // (E-M5)
		33: 'Watercolor II' // (E-PM2)
	},
	
	NoiseFilter: function(n){
		if( typeof n === 'undefined' ) return { value:'n/a', _val:0 };
		var ref = {
		   '_0_0_0': 'n/a', 
		   '_-2_-2_1': 'Off',
		   '_-1_-2_1': 'Low',
		   '_0_-2_1': 'Standard',
		   '_1_-2_1': 'High'
		};	
		var v = n;
		if(n instanceof Array){
			v = '_'.concat(arr.join('_'));
		}
		return (v in ref) ? { value:ref[v], _val:n } : { value:'n/a', _val:n };
	},
	
	PictureModeEffect: function(n){
		if( typeof n === 'undefined' ) return { value:'n/a', _val:0 };
		var ref = {
		   '_0_0_0': 'n/a', 
		   '_-1_-1_1': 'Low',
		   '_0_-1_1': 'Standard',
		   '_1_-1_1': 'High'
		};	
		var v = n;
		if(n instanceof Array){
			v = '_'.concat(arr.join('_'));
		}
		return (v in ref) ? { value:ref[v], _val:n } : { value:'n/a', _val:n };
	},
	
	ArtFilter: function(arr){ 
		return exports.ref.arr0(arr, exports.ref.filters);
	},
	MagicFilter: function(arr){ 
		return exports.ref.arr0(arr, exports.ref.filters);
	},
	
	DriveMode: function(arr){ 
		if( !(arr instanceof Array) ) return { value:'Single Shot', _val:arr };
		if (arr[0] == 5 && arr.length>2) {
			var bracketBitmask = {
				0: 'AE Bracketing',
				1: 'WB Bracketing',
				2: 'FL Bracketing',
				3: 'MF Bracketing'
			};
			var v = MainRef.bitmask(arr[2], bracketBitmask, 3, true /*TODO - why reverse?*/ );
			return { value: v.concat(', Shot ', arr[1]), _val:arr }; 
		} else if (arr.length>1) {
			var modes = {
				0: 'Single Shot',
				1: 'Continuous Shooting',
				2: 'Exposure Bracketing',
				3: 'White Balance Bracketing',
				4: 'Exposure+WB Bracketing'
			};
			return (arr[0] in modes) ? { value:modes[arr[0]].concat(', Shot ', arr[1]), _val:arr } : { value:'n/a '.concat(arr[0]), _val:arr };
		}
		return { value:'n/a', _val:arr };
	},
	
	PanoramaMode: function(arr){ 
		if( !(arr instanceof Array) ) return { value:'Off', _val:arr };
		var pano = {
			0: 'Off',
			1: 'Left to Right',
			2: 'Right to Left',
			3: 'Bottom to Top',
			4: 'Top to Bottom'
		}
		return (arr[0] in pano) ? { value:pano[arr[0]].concat(', Shot ', arr[1]), _val:arr } : { value:'n/a '.concat(arr[0]), _val:arr };
	},
	
	ImageQuality: {
		1: 'SQ',
		2: 'HQ',
		3: 'SHQ',
		4: 'RAW',
		5: 'SQ (5)'
	},
	
	ImageStabilization: {
		0: 'Off',
		1: 'On, Mode 1',
		2: 'On, Mode 2',
		3: 'On, Mode 3',
		4: 'On, Mode 4'
	},
	ImageStabilization2: function(n){
		/* TODO
		# if the first 4 bytes are non-zero, then bit 0x01 of byte 44
		# gives the stabilization mode
		PrintConv => q{
			$val =~ /^\0{4}/ ? 'Off' : 'On, ' .
			(unpack('x44C',$val) & 0x01 ? 'Mode 1' : 'Mode 2')
		},
		*/
	},
	
	ExtendedWBDetect: { 0: 'Off', 1: 'On' },
	LevelGaugeRoll: { 0: 'Off', 1: 'On' },
	LevelGaugePitch: { 0: 'Off', 1: 'On' },
	
	ManometerPressure: function(n){
		return (typeof n === 'number') ? { value: (n/10).toString().concat(' kPa'), _val:n } : { value:n, _val:n }
	}, 
	
	ManometerReading: function(arr){
		if( !(arr instanceof Array) || arr.length<2 || typeof arr[0] !== 'number' || typeof arr[1] !== 'number' ){ 
			return { value:'Unknown', _val:arr };
		}
		arr = arr.map( function(n){return Math.round(n/10);} );
		return arr[0].toString().concat(' m, ', arr[1], ' ft');
	},
	
	DateTimeUTC: function(n){
		/* TODO
		PrintConv: '$self->ConvertDateTime($val)',
		*/
		return n;
	},
	
	
	/* IFD RawDevelopment ... */
	RawDevGrayPoint: function(n){ return (n instanceof Array) ? { value:n.join(', '), _val:n } : { value:n, _val:n } },
	RawDevSaturationEmphasis: function(n){ return (n instanceof Array) ? { value:n.join(', '), _val:n } : { value:n, _val:n } },
	RawDevContrastValue: function(n){ return (n instanceof Array) ? { value:n.join(', '), _val:n } : { value:n, _val:n } },
	RawDevSharpnessValue: function(n){ return (n instanceof Array) ? { value:n.join(', '), _val:n } : { value:n, _val:n } },
	
	RawDevColorSpace: {
		0: 'sRGB',
		1: 'Adobe RGB',
		2: 'Pro Photo RGB',
	},
	
	RawDevEngine: { 
		0: 'High Speed',
		1: 'High Function',
		2: 'Advanced High Speed',
		3: 'Advanced High Function',
	},
	
	RawDevNoiseReduction: function(n){
		if( typeof n !== 'number' || n<0 ) return { value:'Off', _val:-1 };
		var nrBitmask = {
			0: 'Noise Reduction',
			1: 'Noise Filter',
			2: 'Noise Filter (ISO Boost)',
		};
		return { value:MainRef.bitmask(n, nrBitmask, 2, true /*TODO - why reverse?*/ ), _val:n };
	},
	
	RawDevEditStatus: {
		0: 'Original',
		1: 'Edited (Landscape)',
		6: 'Edited (Portrait)',
		8: 'Edited (Portrait)',
	},
	
	RawDevSettings: function(n){
		if( typeof n !== 'number' || n<0 ) return { value:'Off', _val:-1 };
		var nrBitmask = {
			0: 'WB Color Temp',
			1: 'WB Gray Point',
			2: 'Saturation',
			3: 'Contrast',
			4: 'Sharpness',
			5: 'Color Space',
			6: 'High Function',
			7: 'Noise Reduction',
		};
		return { value:MainRef.bitmask(n, nrBitmask, 7, true /*TODO - why reverse?*/ ), _val:n };
	},
	
	/* IFD RawDevelopment2 additional values... */
	RawDevWhiteBalance: {
		1: 'Color Temperature',
		2: 'Gray Point',
	},
	
	RawDevPictureMode: {
		1: 'Vivid',
		2: 'Natural',
		3: 'Muted',
		256: 'Monotone',
		512: 'Sepia',
	},
	
	RawDevPMSaturation: function(n){ return (n instanceof Array) ? { value:n.join(', '), _val:n } : { value:n, _val:n } },
	RawDevPMContrast: function(n){ return (n instanceof Array) ? { value:n.join(', '), _val:n } : { value:n, _val:n } },
	RawDevPMSharpness: function(n){ return (n instanceof Array) ? { value:n.join(', '), _val:n } : { value:n, _val:n } },
	
	RawDevPM_BWFilter: {
		1: 'Neutral',
		2: 'Yellow',
		3: 'Orange',
		4: 'Red',
		5: 'Green',
	},
	
	RawDevPMPictureTone: {
		1: 'Neutral',
		2: 'Sepia',
		3: 'Blue',
		4: 'Purple',
		5: 'Green',
	},
	
	RawDevGradation: function(n){ return (n instanceof Array) ? { value:n.join(', '), _val:n } : { value:n, _val:n } },
	RawDevSaturation3: function(n){ return (n instanceof Array) ? { value:n.join(', '), _val:n } : { value:n, _val:n } },
	
	RawDevAutoGradation: { 0: 'Off', 1: 'On' },
	
	RawDevArtFilter: function(n){ return (n instanceof Array) ? { value:n.join(', '), _val:n } : { value:n, _val:n } },
	
	
	/* IFD ImageProcessing ... */
	WB_RBLevels: function(n){ return (n instanceof Array) ? { value:n.join(', '), _val:n } : { value:n, _val:n } },
	WB_RBLevels3000K: function(n){ return (n instanceof Array) ? { value:n.join(', '), _val:n } : { value:n, _val:n } },
	WB_RBLevels3300K: function(n){ return (n instanceof Array) ? { value:n.join(', '), _val:n } : { value:n, _val:n } },
	WB_RBLevels3600K: function(n){ return (n instanceof Array) ? { value:n.join(', '), _val:n } : { value:n, _val:n } },
	WB_RBLevels3900K: function(n){ return (n instanceof Array) ? { value:n.join(', '), _val:n } : { value:n, _val:n } },
	WB_RBLevels4000K: function(n){ return (n instanceof Array) ? { value:n.join(', '), _val:n } : { value:n, _val:n } },
	WB_RBLevels4300K: function(n){ return (n instanceof Array) ? { value:n.join(', '), _val:n } : { value:n, _val:n } },
	WB_RBLevels4500K: function(n){ return (n instanceof Array) ? { value:n.join(', '), _val:n } : { value:n, _val:n } },
	WB_RBLevels4800K: function(n){ return (n instanceof Array) ? { value:n.join(', '), _val:n } : { value:n, _val:n } },
	WB_RBLevels5300K: function(n){ return (n instanceof Array) ? { value:n.join(', '), _val:n } : { value:n, _val:n } },
	WB_RBLevels6000K: function(n){ return (n instanceof Array) ? { value:n.join(', '), _val:n } : { value:n, _val:n } },
	WB_RBLevels6600K: function(n){ return (n instanceof Array) ? { value:n.join(', '), _val:n } : { value:n, _val:n } },
	WB_RBLevels7500K: function(n){ return (n instanceof Array) ? { value:n.join(', '), _val:n } : { value:n, _val:n } },
	WB_RBLevelsCWB1: function(n){ return (n instanceof Array) ? { value:n.join(', '), _val:n } : { value:n, _val:n } },
	WB_RBLevelsCWB2: function(n){ return (n instanceof Array) ? { value:n.join(', '), _val:n } : { value:n, _val:n } },
	WB_RBLevelsCWB3: function(n){ return (n instanceof Array) ? { value:n.join(', '), _val:n } : { value:n, _val:n } },
	WB_RBLevelsCWB4: function(n){ return (n instanceof Array) ? { value:n.join(', '), _val:n } : { value:n, _val:n } },
	/* TODO
	0x200: { #6
		Name: 'ColorMatrix',
		Writable: 'int16u',
		Format: 'int16s',
		Count: 9,
	},
	# color matrices (ref 11):
	# 0x0201-0x020d are sRGB color matrices
	# 0x020e-0x021a are Adobe RGB color matrices
	# 0x021b-0x0227 are ProPhoto RGB color matrices
	# 0x0228 and 0x0229 are ColorMatrix for E-330
	# 0x0250-0x0252 are sRGB color matrices
	# 0x0253-0x0255 are Adobe RGB color matrices
	# 0x0256-0x0258 are ProPhoto RGB color matrices
	*/
	EnhancerValues: function(n){ return (n instanceof Array) ? { value:n.join(', '), _val:n } : { value:n, _val:n } },
	CoringValues: function(n){ return (n instanceof Array) ? { value:n.join(', '), _val:n } : { value:n, _val:n } },
	BlackLevel2: function(n){ return (n instanceof Array) ? { value:n.join(', '), _val:n } : { value:n, _val:n } },
	ValidBits: function(n){ return (n instanceof Array) ? { value:n.join(', '), _val:n } : { value:n, _val:n } },
	
	CropLeft: function(n){ 
		if(typeof n === 'number') n = n.toString();
		return (n instanceof Array) ? { value:n.map(MainRef.px).join(', '), _val:n } : { value:n.concat(' px'), _val:n } 
	
	},
	CropTop:  function(n){ 
		if(typeof n === 'number') n = n.toString();
		return (n instanceof Array) ? { value:n.map(MainRef.px).join(', '), _val:n } : { value:n.concat(' px'), _val:n } 
	},
	
	CropWidth: function(n){ return MainRef.px(n); },
	CropHeight: function(n){ return MainRef.px(n); },
	
	SensorCalibration: function(arr){
		if( !(arr instanceof Array) || arr.length<2 ) return { value:arr, _val:arr };
		return { value: 'recommended maximum: '.concat(arr[0], ', calibration midpoint: ', arr[1]), _val:arr };
	},
	
	NoiseReduction2: function(n){
		if( typeof n !== 'number' || n<0 ) return { value:'Off', _val:-1 };
		var nrBitmask = {
			0: 'Noise Reduction',
			1: 'Noise Filter',
			2: 'Noise Filter (ISO Boost)',
		};
		return { value:MainRef.bitmask(n, nrBitmask, 2, true /*TODO - why reverse?*/ ), _val:n };
	},
	
	DistortionCorrection2: { 0: 'Off', 1: 'On' },
	ShadingCompensation2: { 0: 'Off', 1: 'On' },
	
	MultipleExposureMode: function(arr){
		if( !(arr instanceof Array) || arr.length<2 ) return { value:arr, _val:arr };
		if(arr[0]===0) return { value:'Off', _val:arr };
		if(arr[0]===2 || arr[1]===2) return { value:'On (2 frames)', _val:arr };
		return { value:'On (3 frames)', _val:arr };
	},
	
	AspectRatio: function(arr){
		if( !(arr instanceof Array) || arr.length!=2 ) return { value:arr, _val:arr };
		var ar = {
			_0_0: 'unknown or 16:9 (XZ-1)',
			_1_1: '4:3',
			_1_4: '1:1', 
			_2_2: '3:2',
			_3_3: '16:9',
			_4_4: '6:6',
			_5_5: '5:4',
			_6_6: '7:6',
			_7_7: '6:5',
			_8_8: '7:5',
			_9_9: '3:4'
		}
		var key = '_'.concat(arr[0], '_', arr[1]);
		return (key in ar) ? { value:ar[key], _val:arr } : { value:arr, _val:arr };
	},
	
	/* IFD FocusInfo ... */
	AutoFocus: { 0: 'Off', 1: 'On' },
	
	FocusDistance: function(arr){
		if( !(arr instanceof Array) ) arr = [arr*10];
		if( arr[0] === -1 || arr[0] === 4294967295 ) return { value:0, _val:0 };
		return { value: (arr[0]/1000).toString().concat(' m'), _val:arr };
	},
	
	AFPoint: function(n, model){
		// model specific	
		var v = [(n & 0x1f),(n & 0xffe0)];
		if ( new RegExp(/E-(3|5|30)\b/).test(model) ) {
			var ref = [
				{
					0x00: '(none)',
					0x01: 'Top-left (horizontal)',
					0x02: 'Top-center (horizontal)',
					0x03: 'Top-right (horizontal)',
					0x04: 'Left (horizontal)',
					0x05: 'Mid-left (horizontal)',
					0x06: 'Center (horizontal)',
					0x07: 'Mid-right (horizontal)',
					0x08: 'Right (horizontal)',
					0x09: 'Bottom-left (horizontal)',
					0x0a: 'Bottom-center (horizontal)',
					0x0b: 'Bottom-right (horizontal)',
					0x0c: 'Top-left (vertical)',
					0x0d: 'Top-center (vertical)',
					0x0e: 'Top-right (vertical)',
					0x0f: 'Left (vertical)',
					0x10: 'Mid-left (vertical)',
					0x11: 'Center (vertical)',
					0x12: 'Mid-right (vertical)',
					0x13: 'Right (vertical)',
					0x14: 'Bottom-left (vertical)',
					0x15: 'Bottom-center (vertical)',
					0x16: 'Bottom-right (vertical)',
					0x1f: 'n/a'
				},
				{
					0x00: 'Single Target',
					0x40: 'All Target',
					0x80: 'Dynamic Single Target',
					0xe0: 'n/a'
				}
			];
			var rStr = '';
			if( v[1] in ref[1] ) rStr = rStr.concat(ref[1][v[1]]); 
			if( v[0] in ref[0] ) rStr = rStr.concat(', ', ref[0][v[0]]);
			return (rStr!=='') ? { value: rStr, _val:v } : { value: v, _val:n }
		} else if ( new RegExp(/E-(520|600|620)\b/).test(model) ) {
			var ref = [
				{
					0x00: '(none)',
					0x01: 'Center'
					// TODO
				},
				{
					0x00: 'Single Target',
					0x40: 'All Target'
				}
			];
			var rStr = '';
			if( v[1] in ref[1] ) rStr = rStr.concat(ref[1][v[1]]); 
			if( v[0] in ref[0] ){ 
				rStr = rStr.concat(', ', ref[0][v[0]]) 
			} else { 
				rStr = rStr.concat(', not Center'); 
			};
			return (rStr!=='') ? { value: rStr, _val: v } : { value: v, _val: n }
			
		} else {
			if (typeof n === 'number') n = [n];
			var ref = { 0: 'Left (or n/a)', 1: 'Center (horizontal)', 2: 'Right', 3: 'Center (vertical)', 255: 'None' };
			return ( n[0] in ref ) ? { value: ref[n[0]], _val: n } : { value: n, _val: n }
		}
	},
	
	ExternalFlash: function(arr){
		if( !(arr instanceof Array) || arr.length!=2 || typeof arr[0] != 'number' ) return { value:arr, _val:arr };
		var stat = { 0: 'Off', 1: 'On' };
		var v = arr.reduce(function(a, b) { return a + b; });
		return ( v in stat ) ? { value: stat[v], _val: v } : { value: v, _val: v };
	},
	
	ExternalFlashBounce: {
		0: 'Bounce or Off',
		1: 'Direct',
	},
	
	InternalFlash: function(n){
		if( (n instanceof Array) ) n = n.reduce(function(a, b) { return a + b; });
		var stat = { 0: 'Off', 1: 'On' };
		return ( n in stat ) ? { value: stat[n], _val: n } : { value: n, _val: n };
	},
	
	ManualFlash: function(arr){
		if( !(arr instanceof Array) || arr.length!=2 || typeof arr[0] != 'number' || arr[0]===0 ){ 
			return { value:'Off', _val:arr };
		}
		var v = 'On '.concat( '(', ((arr[1] == 1) ? 'Full' : '1/'.concat(arr[1])), ' strength)' );
		return { value: v, _val: arr };
	},
	
	MacroLED: { 0: 'Off', 1: 'On' },
	
	SensorTemperature: function(n, model){
		// model specific
		if (typeof n === 'object' && !('value' in n)) return {value:'n/a', _val:n};
		var v = '';
		if ( new RegExp(/E-(1|M5)\b/).test(model) ) {
			v = (typeof n === 'number') ? n.toString().concat(' C') : n.replace(' 0 0', '').concat(' C');
		} else {
			if( typeof n !== 'number' ) return { value: 'n/a', _val: n }
			v = 84 - 3 * n / 26;
			return { value: v.toFixed(2).concat(' C'), _val: n };
		}
	},
	
	CameraTemperature: function(n){
		if(typeof n === 'undefined' || n === 0) return { value: 'Auto', _val: 0 };
		return { value: n.toString().concat(' C'), _val: n }	
	}
	
	
	/* IFD RawInfo ... */
	
};
	

/* TODO - FIXME and port:
IFD RawInfo ...
    0x100: { Name: 'WB_RBLevelsUsed',           Writable: 'int16u', Count: 2 },
    0x110: { Name: 'WB_RBLevelsAuto',           Writable: 'int16u', Count: 2 },
    0x120: { Name: 'WB_RBLevelsShade',          Writable: 'int16u', Count: 2 },
    0x121: { Name: 'WB_RBLevelsCloudy',         Writable: 'int16u', Count: 2 },
    0x122: { Name: 'WB_RBLevelsFineWeather',    Writable: 'int16u', Count: 2 },
    0x123: { Name: 'WB_RBLevelsTungsten',       Writable: 'int16u', Count: 2 },
    0x124: { Name: 'WB_RBLevelsEveningSunlight',Writable: 'int16u', Count: 2 },
    0x130: { Name: 'WB_RBLevelsDaylightFluor',  Writable: 'int16u', Count: 2 },
    0x131: { Name: 'WB_RBLevelsDayWhiteFluor',  Writable: 'int16u', Count: 2 },
    0x132: { Name: 'WB_RBLevelsCoolWhiteFluor', Writable: 'int16u', Count: 2 },
    0x133: { Name: 'WB_RBLevelsWhiteFluorescent',Writable: 'int16u', Count: 2 },
    0x200: {
        Name: 'ColorMatrix2',
        Format: 'int16s',
        Writable: 'int16u',
        Count: 9,
    },
    # 0x240: 'ColorMatrixDefault', ?
    # 0x250: 'ColorMatrixSaturation', ?
    # 0x251: 'ColorMatrixHue', ?
    # 0x252: 'ColorMatrixContrast', ?
    # 0x300: sharpness-related
    # 0x301: list of sharpness-related values
    0x310: { Name: 'CoringFilter',      Writable: 'int16u' },
    0x311: { Name: 'CoringValues',      Writable: 'int16u', Count: 11 },
    0x600: { Name: 'BlackLevel2',       Writable: 'int16u', Count: 4 },
    0x601: {
        Name: 'YCbCrCoefficients',
        Notes: 'stored as int16u[6], but extracted as rational32u[3]',
        Format: 'rational32u',
    },
    0x611: { Name: 'ValidPixelDepth',   Writable: 'int16u', Count: 2 },
    0x612: { Name: 'CropLeft',          Writable: 'int16u' }, #11
    0x613: { Name: 'CropTop',           Writable: 'int16u' }, #11
    0x614: { Name: 'CropWidth',         Writable: 'int32u' },
    0x615: { Name: 'CropHeight',        Writable: 'int32u' },
    0x1000: {
        Name: 'LightSource',
        Writable: 'int16u',
        PrintConv: {
            0: 'Unknown',
            16: 'Shade',
            17: 'Cloudy',
            18: 'Fine Weather',
            20: 'Tungsten (Incandescent)',
            22: 'Evening Sunlight',
            33: 'Daylight Fluorescent',
            34: 'Day White Fluorescent',
            35: 'Cool White Fluorescent',
            36: 'White Fluorescent',
            256: 'One Touch White Balance',
            512: 'Custom 1-4',
        },
    },
    # the following 5 tags all have 3 values: val, min, max
    0x1001: { Name: 'WhiteBalanceComp',         Writable: 'int16s', Count: 3 },
    0x1010: { Name: 'SaturationSetting',        Writable: 'int16s', Count: 3 },
    0x1011: { Name: 'HueSetting',               Writable: 'int16s', Count: 3 },
    0x1012: { Name: 'ContrastSetting',          Writable: 'int16s', Count: 3 },
    0x1013: { Name: 'SharpnessSetting',         Writable: 'int16s', Count: 3 },
    # settings written by Camedia Master 4.x
    0x2000: { Name: 'CMExposureCompensation',   Writable: 'rational64s' },
    0x2001: { Name: 'CMWhiteBalance',           Writable: 'int16u' },
    0x2002: { Name: 'CMWhiteBalanceComp',       Writable: 'int16s' },
    0x2010: { Name: 'CMWhiteBalanceGrayPoint',  Writable: 'int16u', Count: 3 },
    0x2020: { Name: 'CMSaturation',             Writable: 'int16s', Count: 3 },
    0x2021: { Name: 'CMHue',                    Writable: 'int16s', Count: 3 },
    0x2022: { Name: 'CMContrast',               Writable: 'int16s', Count: 3 },
    0x2023: { Name: 'CMSharpness',              Writable: 'int16s', Count: 3 },
);

# Olympus unknown information tags
%Image::ExifTool::Olympus::UnknownInfo = (
    WRITE_PROC: \&Image::ExifTool::Exif::WriteExif,
    CHECK_PROC: \&Image::ExifTool::Exif::CheckExif,
    GROUPS: { 0: 'MakerNotes', 2: 'Camera' },
);

# Tags found only in some FE models
%Image::ExifTool::Olympus::FETags = (
    WRITE_PROC: \&Image::ExifTool::Exif::WriteExif,
    CHECK_PROC: \&Image::ExifTool::Exif::CheckExif,
    GROUPS: { 0: 'MakerNotes', 2: 'Camera' },
    NOTES: q{
        Some FE models write a large number of tags here, but most of this
        information remains unknown.
    },
    0x0100: {
        Name: 'BodyFirmwareVersion',
        Writable: 'string',
    },
);



# Olympus unknown information tags
%Image::ExifTool::Olympus::UnknownInfo = (
    WRITE_PROC => \&Image::ExifTool::Exif::WriteExif,
    CHECK_PROC => \&Image::ExifTool::Exif::CheckExif,
    GROUPS => { 0 => 'MakerNotes', 2 => 'Camera' },
);

# Tags found only in some FE models
%Image::ExifTool::Olympus::FETags = (
    WRITE_PROC => \&Image::ExifTool::Exif::WriteExif,
    CHECK_PROC => \&Image::ExifTool::Exif::CheckExif,
    GROUPS => { 0 => 'MakerNotes', 2 => 'Camera' },
    NOTES => q{
        Some FE models write a large number of tags here, but most of this
        information remains unknown.
    },
    0x0100 => {
        Name => 'BodyFirmwareVersion',
        Writable => 'string',
    },
);

# tags in Olympus QuickTime videos (ref PH)
# (similar information in Kodak,Minolta,Nikon,Olympus,Pentax and Sanyo videos)
%Image::ExifTool::Olympus::MOV1 = (
    PROCESS_PROC => \&Image::ExifTool::ProcessBinaryData,
    GROUPS => { 0 => 'MakerNotes', 2 => 'Camera' },
    FIRST_ENTRY => 0,
    NOTES => q{
        This information is found in MOV videos from Olympus models such as the
        D540Z, D595Z, FE100, FE110, FE115, FE170 and FE200.
    },
    0x00 => {
        Name => 'Make',
        Format => 'string[24]',
    },
    0x18 => {
        Name => 'Model',
        Description => 'Camera Model Name',
        Format => 'string[8]',
        SeparateTable => 'CameraType',
        PrintConv => \%olympusCameraTypes,
    },
    # (01 00 at offset 0x20)
    0x26 => {
        Name => 'ExposureUnknown',
        Unknown => 1,
        Format => 'int32u',
        # this conversion doesn't work for all models (ie. gives "1/100000")
        ValueConv => '$val ? 10 / $val : 0',
        PrintConv => 'Image::ExifTool::Exif::PrintExposureTime($val)',
    },
    0x2a => {
        Name => 'FNumber',
        Format => 'rational64u',
        PrintConv => 'sprintf("%.1f",$val)',
    },
    0x32 => { #(NC)
        Name => 'ExposureCompensation',
        Format => 'rational64s',
        PrintConv => 'Image::ExifTool::Exif::PrintFraction($val)',
    },
  # 0x44 => WhiteBalance ?
    0x48 => {
        Name => 'FocalLength',
        Format => 'rational64u',
        PrintConv => 'sprintf("%.1f mm",$val)',
    },
  # 0xb1 => 'ISO', #(I don't think this works - PH)
);

# tags in Olympus QuickTime videos (ref PH)
# (similar information in Kodak,Minolta,Nikon,Olympus,Pentax and Sanyo videos)
%Image::ExifTool::Olympus::MOV2 = (
    PROCESS_PROC => \&Image::ExifTool::ProcessBinaryData,
    GROUPS => { 0 => 'MakerNotes', 2 => 'Camera' },
    FIRST_ENTRY => 0,
    NOTES => q{
        This information is found in MOV videos from Olympus models such as the
        FE120, FE140 and FE190.
    },
    0x00 => {
        Name => 'Make',
        Format => 'string[24]',
    },
    0x18 => {
        Name => 'Model',
        Description => 'Camera Model Name',
        Format => 'string[24]',
        Notes => 'the actual model name, no decoding necessary',
    },
    # (01 00 at offset 0x30)
    0x36 => {
        Name => 'ExposureTime',
        Format => 'int32u',
        ValueConv => '$val ? 10 / $val : 0',
        PrintConv => 'Image::ExifTool::Exif::PrintExposureTime($val)',
    },
    0x3a => {
        Name => 'FNumber',
        Format => 'rational64u',
        PrintConv => 'sprintf("%.1f",$val)',
    },
    0x42 => { #(NC)
        Name => 'ExposureCompensation',
        Format => 'rational64s',
        PrintConv => 'Image::ExifTool::Exif::PrintFraction($val)',
    },
    0x58 => {
        Name => 'FocalLength',
        Format => 'rational64u',
        PrintConv => 'sprintf("%.1f mm",$val)',
    },
    0xc1 => {
        Name => 'ISO',
        Format => 'int16u',
    },
);

# tags in Olympus MP4 videos (ref PH)
%Image::ExifTool::Olympus::MP4 = (
    PROCESS_PROC => \&Image::ExifTool::ProcessBinaryData,
    GROUPS => { 0 => 'MakerNotes', 2 => 'Camera' },
    FIRST_ENTRY => 0,
    NOTES => q{
        This information is found in MP4 videos from Olympus models such as the
        u7040 and u9010.
    },
    0x00 => {
        Name => 'Make',
        Format => 'string[24]',
    },
    0x18 => {
        Name => 'Model',
        Description => 'Camera Model Name',
        Format => 'string[24]',
        Notes => 'oddly different than CameraType values in JPEG images by the same camera',
        PrintConv => {
            SG472 => 'u7040,S7040',
            SG473 => 'u9010,S9010',
            SG475 => 'SP800UZ',
            SG551 => 'SZ-30MR',
            SG553 => 'SP-610UZ',
            SG554 => 'SZ-10',
            SG555 => 'SZ-20',
            SG573 => 'SZ-14',
            SG575 => 'SP-620UZ',
        },
    },
    0x28 => {
        Name => 'FNumber',
        Format => 'rational64u',
        PrintConv => 'sprintf("%.1f",$val)',
    },
    0x30 => { #(NC)
        Name => 'ExposureCompensation',
        Format => 'rational64s',
        PrintConv => 'Image::ExifTool::Exif::PrintFraction($val)',
    },
    # 0x38 - int32u: 3
    # 0x3c - int32u: 1
    # 0x40 - int16u: 5
    # 0x42 - int16u: 0,4,9
    # 0x64 - int32u: 0,6000,12000
    # 0x48 - int32u: 100 (ISO?)
    0x68 => {
        Name => 'MovableInfo',
        Condition => '$$valPt =~ /^DIGI/',
        SubDirectory => { TagTable => 'Image::ExifTool::Olympus::MovableInfo' },
    },
    0x72 => {
        Name => 'MovableInfo',
        Condition => '$$valPt =~ /^DIGI/',
        SubDirectory => { TagTable => 'Image::ExifTool::Olympus::MovableInfo' },
    },
);

# yet a different QuickTime TAGS format (PH, E-M5)
%Image::ExifTool::Olympus::MOV3 = (
    GROUPS => { 0 => 'MakerNotes', 2 => 'Camera' },
    NOTES => 'QuickTime information found in the TAGS atom of MOV videos from the E-M5.',
    OLYM => {
        Name => 'OlympusAtom',
        SubDirectory => { TagTable => 'Image::ExifTool::Olympus::OLYM2' },
    },
);

# yet a different QuickTime OLYM atom format (PH, E-M5)
%Image::ExifTool::Olympus::OLYM2 = (
    GROUPS => { 0 => 'MakerNotes', 2 => 'Camera' },
    prms => {
        Name => 'MakerNotes',
        SubDirectory => { TagTable => 'Image::ExifTool::Olympus::prms' },
    },
    thmb =>{
        Name => 'ThumbInfo',
        SubDirectory => { TagTable => 'Image::ExifTool::Olympus::thmb2' },
    },
    scrn =>{
        Name => 'PreviewInfo',
        SubDirectory => { TagTable => 'Image::ExifTool::Olympus::scrn2' },
    },
);

# the "prms" atom in E-M5 MOV videos (PH, E-M5)
%Image::ExifTool::Olympus::prms = (
    PROCESS_PROC => \&Image::ExifTool::ProcessBinaryData,
    GROUPS => { 0 => 'MakerNotes', 2 => 'Camera' },
    FIRST_ENTRY => 0,
    NOTES => q{
        Information extracted from the "prms" atom in MOV videos from Olympus models
        such as the OM E-M5.
    },
    0x12 => {
        Name => 'Make',
        Format => 'string[24]',
    },
    0x2c => {
        Name => 'Model',
        Description => 'Camera Model Name',
        Format => 'string[24]',
        SeparateTable => 'CameraType',
        PrintConv => \%olympusCameraTypes,
    },
    0x83 => {
        Name => 'DateTime1',
        Format => 'string[24]',
        Groups => { 2 => 'Time' },
    },
    0x9d => {
        Name => 'DateTime2',
        Format => 'string[24]',
        Groups => { 2 => 'Time' },
    },
);

# yet a different "thmb" atom format (PH, E-M5)
%Image::ExifTool::Olympus::thmb2 = (
    PROCESS_PROC => \&Image::ExifTool::ProcessBinaryData,
    GROUPS => { 0 => 'MakerNotes', 2 => 'Camera' },
    0 => {
        Name => 'ThumbnailWidth',
        Format => 'int16u',
    },
    2 => {
        Name => 'ThumbnailHeight',
        Format => 'int16u',
    },
    4 => {
        Name => 'ThumbnailLength',
        Format => 'int32u',
    },
    8 => {
        Name => 'ThumbnailImage',
        Format => 'undef[$val{4}]',
        Notes => '160x120 JPEG thumbnail image',
        RawConv => '$self->ValidateImage(\$val,$tag)',
    },
);

# yet a different "scrn" atom format (PH, E-M5)
%Image::ExifTool::Olympus::scrn2 = (
    PROCESS_PROC => \&Image::ExifTool::ProcessBinaryData,
    GROUPS => { 0 => 'MakerNotes', 2 => 'Camera' },
    # 0 => int16u: 1 - number of preview images?
    2 => {
        Name => 'OlympusPreview',
        SubDirectory => { TagTable => 'Image::ExifTool::Olympus::scrn' },
    },
);

# movable information found in MP4 videos
%Image::ExifTool::Olympus::MovableInfo = (
    PROCESS_PROC => \&Image::ExifTool::ProcessBinaryData,
    GROUPS => { 0 => 'MakerNotes', 2 => 'Camera' },
    FIRST_ENTRY => 0,
    0x04 => { #(NC)
        Name => 'ISO',
        Format => 'int32u',
    },
    0x2c => {
        Name => 'EncoderVersion',
        Format => 'string[16]',
    },
    0x3c => {
        Name => 'DecoderVersion',
        Format => 'string[16]',
    },
    0x83 => {
        Name => 'Thumbnail',
        SubDirectory => {
            TagTable => 'Image::ExifTool::Olympus::Thumbnail',
            Base => '$start', # (use a separate table because of this)
        },
    },
);

# thumbnail image information found in MP4 videos (similar in Olympus,Samsung,Sanyo) (ref PH)
%Image::ExifTool::Olympus::Thumbnail = (
    PROCESS_PROC => \&Image::ExifTool::ProcessBinaryData,
    GROUPS => { 0 => 'MakerNotes', 2 => 'Camera' },
    FIRST_ENTRY => 0,
    FORMAT => 'int32u',
    1 => 'ThumbnailWidth',
    2 => 'ThumbnailHeight',
    3 => 'ThumbnailLength',
    4 => { Name => 'ThumbnailOffset', IsOffset => 1 },
);

# thumbnail information found in 'thmb' atom of MP4 videos from the TG-810 (ref PH)
%Image::ExifTool::Olympus::thmb = (
    NOTES => 'Information extracted from the "thmb" atom of Olympus MP4 videos.',
    PROCESS_PROC => \&Image::ExifTool::ProcessBinaryData,
    GROUPS => { 0 => 'MakerNotes', 2 => 'Camera' },
    0 => {
        Name => 'ThumbnailLength',
        Format => 'int32u',
    },
    4 => {
        Name => 'ThumbnailImage',
        Format => 'undef[$val{0}]',
        Notes => '160x120 JPEG thumbnail image',
        RawConv => '$self->ValidateImage(\$val,$tag)',
    },
);

# thumbnail information found in 'scrn' atom of MP4 videos from the TG-810 (ref PH)
%Image::ExifTool::Olympus::scrn = (
    NOTES => 'Information extracted from the "scrn" atom of Olympus MP4 videos.',
    PROCESS_PROC => \&Image::ExifTool::ProcessBinaryData,
    GROUPS => { 0 => 'MakerNotes', 2 => 'Camera' },
    0 => {
        Name => 'PreviewImageLength',
        Format => 'int32u',
    },
    4 => {
        Name => 'PreviewImage',
        Format => 'undef[$val{0}]',
        Notes => '640x480 JPEG preview image',
        RawConv => '$self->ValidateImage(\$val,$tag)',
    },
);

# information in OLYM atom of MP4 videos from the TG-810 (ref PH)
%Image::ExifTool::Olympus::OLYM = (
    NOTES => 'Tags found in the OLYM atom of MP4 videos from the TG-810.',
    PROCESS_PROC => \&Image::ExifTool::ProcessBinaryData,
    GROUPS => { 0 => 'MakerNotes', 2 => 'Camera' },
    0x0e => {
        Name => 'Make',
        Format => 'string[26]',
    },
    0x28 => {
        Name => 'Model',
        Description => 'Camera Model Name',
        Format => 'string[24]',
        SeparateTable => 'CameraType',
        PrintConv => \%olympusCameraTypes,
    },
    0x5a => {
        Name => 'FNumber',
        Format => 'rational64u',
        PrintConv => 'sprintf("%.1f",$val)',
    },
    0x7f => {
        Name => 'DateTimeOriginal', #(NC)
        Format => 'string[24]',
        Groups => { 2 => 'Time' },
        PrintConv => '$self->ConvertDateTime($val)',
    },
    0x99 => {
        Name => 'DateTime2',
        Format => 'string[24]',
        Groups => { 2 => 'Time' },
    },
    0x109 => {
        Name => 'ThumbnailWidth',
        Format => 'int16u',
    },
    0x10b => {
        Name => 'ThumbnailHeight',
        Format => 'int16u',
    },
);

# tags in Olympus AVI videos (ref PH)
# (very similar to Pentax::Junk2 tags)
%Image::ExifTool::Olympus::AVI = (
    PROCESS_PROC => \&Image::ExifTool::ProcessBinaryData,
    GROUPS => { 0 => 'MakerNotes', 2 => 'Camera' },
    FIRST_ENTRY => 0,
    NOTES => 'This information is found in Olympus AVI videos.',
    0x12 => {
        Name => 'Make',
        Format => 'string[24]',
    },
    0x2c => {
        Name => 'Model',
        Description => 'Camera Model Name',
        Format => 'string[24]',
        SeparateTable => 'CameraType',
        PrintConv => \%olympusCameraTypes,
    },
    0x5e => {
        Name => 'FNumber',
        Format => 'rational64u',
        PrintConv => 'sprintf("%.1f",$val)',
    },
    0x83 => {
        Name => 'DateTime1',
        Format => 'string[24]',
        Groups => { 2 => 'Time' },
    },
    0x9d => {
        Name => 'DateTime2',
        Format => 'string[24]',
        Groups => { 2 => 'Time' },
    },
    0x129 => {
        Name => 'ThumbInfo',
        SubDirectory => { TagTable => 'Image::ExifTool::Olympus::thmb2' },
    },
);

# tags in WAV files from Olympus PCM linear recorders (ref 18)
%Image::ExifTool::Olympus::WAV = (
    PROCESS_PROC => \&Image::ExifTool::ProcessBinaryData,
    GROUPS => { 0 => 'MakerNotes', 2 => 'Audio' },
    FIRST_ENTRY => 0,
    NOTES => q{
        This information is found in WAV files from Olympus PCM linear recorders
        like the LS-5, LS-10, LS-11.
    },
    0x0c => {
        Name => 'Model',
        Description => 'Camera Model Name',
        Format => 'string[16]',
    },
    0x1c => {
        Name => 'FileNumber',
        Format => 'int32u',
        PrintConv => 'sprintf("%.4d", $val)',
    },
    0x26 => {
        Name => 'DateTimeOriginal',
        Description => 'Date/Time Original',
        Groups => { 2 => 'Time' },
        Format => 'undef[12]',
        Notes => 'time at start of recording',
        ValueConv => q{
            return undef unless $val =~ /^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/;
            my $y = $1 < 70 ? "20$1" : "19$1";
            return "$y:$2:$3 $4:$5:$6";
        },
        PrintConv => '$self->ConvertDateTime($val)',
    },
    0x32 => {
        Name => 'DateTimeEnd',
        Groups => { 2 => 'Time' },
        Format => 'undef[12]',
        Notes => 'time at end of recording',
        ValueConv => q{
            return undef unless $val =~ /^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/;
            my $y = $1 < 70 ? "20$1" : "19$1";
            return "$y:$2:$3 $4:$5:$6";
        },
        PrintConv => '$self->ConvertDateTime($val)',
    },
    0x3e => {
        Name => 'RecordingTime',
        Format => 'undef[6]',
        ValueConv => '$val =~ s/^(\d{2})(\d{2})/$1:$2:/; $val',
    },
    0x200 => {
        Name => 'Duration',
        Format => 'int32u',
        ValueConv => '$val / 1000',
        PrintConv => 'ConvertDuration($val)',
    },
    0x20a => { Name => 'Index01', %indexInfo },
    0x214 => { Name => 'Index02', %indexInfo },
    0x21e => { Name => 'Index03', %indexInfo },
    0x228 => { Name => 'Index04', %indexInfo },
    0x232 => { Name => 'Index05', %indexInfo },
    0x23c => { Name => 'Index06', %indexInfo },
    0x246 => { Name => 'Index07', %indexInfo },
    0x250 => { Name => 'Index08', %indexInfo },
    0x25a => { Name => 'Index09', %indexInfo },
    0x264 => { Name => 'Index10', %indexInfo },
    0x26e => { Name => 'Index11', %indexInfo },
    0x278 => { Name => 'Index12', %indexInfo },
    0x282 => { Name => 'Index13', %indexInfo },
    0x28c => { Name => 'Index14', %indexInfo },
    0x296 => { Name => 'Index15', %indexInfo },
    0x2a0 => { Name => 'Index16', %indexInfo },
);

# Olympus composite tags
%Image::ExifTool::Olympus::Composite = (
    GROUPS => { 2 => 'Camera' },
    ExtenderStatus => {
        Notes => q{
            Olympus cameras have the quirk that they may retain the extender settings
            after the extender is removed until the camera is powered off.  This tag is
            an attempt to represent the actual status of the extender.
        },
        Require => {
            0 => 'Olympus:Extender',
            1 => 'Olympus:LensType',
            2 => 'MaxApertureValue',
        },
        ValueConv => 'Image::ExifTool::Olympus::ExtenderStatus($val[0],$prt[1],$val[2])',
        PrintConv => {
            0 => 'Not attached',
            1 => 'Attached',
            2 => 'Removed',
        },
    },
    ZoomedPreviewImage => {
        Require => {
            0 => 'ZoomedPreviewStart',
            1 => 'ZoomedPreviewLength',
        },
        RawConv => 'Image::ExifTool::Exif::ExtractImage($self,$val[0],$val[1],"ZoomedPreviewImage")',
    },
);
*/






