// exiftool.js/makernotes/minolta

// summary:
//    Makernotes for the following Makes :
//    'Konica Minolta'
//    'Minolta'
//    with headers ['MINOL', 'CAMER', 'MLY0', 'KC']

// description:
//    ported from http://www.sno.phy.queensu.ca/~phil/exiftool/TagNames/Minolta.html

// returns:
//    a makernote object for exiftool.js and redaktor/meta

/* TODO / FIXME
1) reading IFDs binary
*/

var MainRef = require('../exif').ref;

exports.info = {};
	
exports.tags = {
	0x0001: '_IFDpointer_CameraSettingsOld',
	0x0003: '_IFDpointer_CameraSettings',
	0x0114: '_IFDpointer_CameraSettings2',
	0x0004: '_IFDpointer_CameraSettings7D',
	0x0010: '_IFDpointer_CameraInfoA100',
	0x0020: '_IFDpointer_WBInfoA100',
	
	0x0000: 'MakerNoteVersion',
	0x0018: 'ImageStabilization',
	0x0040: 'CompressedImageSize',
	0x0081: 'PreviewImageTagInfo', // DiMAGE 7 only
	0x0088: 'PreviewImageStart',
	0x0089: 'PreviewImageLength',
	0x0100: 'SceneMode',
	0x0101: 'ColorMode',
	0x0102: 'Quality',
	0x0103: 'Quality2',
	0x0104: 'FlashExposureComp',
	0x0105: 'Teleconverter',
	0x0107: 'ImageStabilizationStatus',
	0x0109: 'RawAndJpgRecording',
	0x010a: 'ZoneMatching',
	0x010b: 'ColorTemperature',
	0x010c: 'LensType',
	0x0111: 'ColorCompensationFilter',
	0x0112: 'WhiteBalanceFineTune',
	0x0113: 'ImageStabilization',
	0x0115: 'WhiteBalance',
	0x0e00: 'PrintIM',
	0x0f00: 'CameraSettingsUnknown'
};

exports.ref = {
	MakerNoteVersion: function(arr){ return MainRef.versions(arr, 4) },
	Quality: {
		0: 'Raw',
		1: 'Super Fine',
		2: 'Fine',
		3: 'Standard',
		4: 'Economy',
		5: 'Extra fine'
	},
	SceneMode: {
		0: 'Standard',
		1: 'Portrait',
		2: 'Text',
		3: 'Night Scene',
		4: 'Sunset',
		5: 'Sports',
		6: 'Landscape',
		7: 'Night Portrait', //JD
		8: 'Macro',
		9: 'Super Macro',
		16: 'Auto', // (RX100 'Intelligent Auto' - PH)
		17: 'Night View/Portrait',
		18: 'Sweep Panorama', //PH (SLT-A55V)
		19: 'Handheld Night Shot', //PH
		20: 'Anti Motion Blur', //PH
		21: 'Cont. Priority AE', //PH
		22: 'Auto+',
		23: '3D Sweep Panorama', //PH (SLT-A55V)
		24: 'Superior Auto', //28
		25: 'High Sensitivity', //28
		26: 'Fireworks', //28
		27: 'Food', //28
		28: 'Pet', //28
		0xffff: 'n/a' //PH
	},
	Teleconverter: {
		0x00: 'None',
		0x04: 'Minolta/Sony AF 1.4x APO (D) (0x04)', // (Andy Johnson, A77 APO and APO D)
		0x05: 'Minolta/Sony AF 2x APO (D) (0x05)', // (Andy Johnson, A77 APO D)
		0x48: 'Minolta/Sony AF 2x APO (D)',
		// 0x48: 'Sony 2x Teleconverter (SAL20TC)', (ref 25)
		0x50: 'Minolta AF 2x APO II',
		0x60: 'Minolta AF 2x APO',//26
		0x88: 'Minolta/Sony AF 1.4x APO (D)',
		// 0x88: 'Sony 1.4x Teleconverter (SAL14TC)', (ref 25)
		0x90: 'Minolta AF 1.4x APO II',
		0xa0: 'Minolta AF 1.4x APO' //26
	},
	ColorMode: {
		// TODO - can it be Sony Color Mode for Sony Make here as well?
		0: 'Natural color',
		1: 'Black & White',
		2: 'Vivid color',
		3: 'Solarization',
		4: 'Adobe RGB',
		5: 'Sepia', //10
		9: 'Natural', //10
		12: 'Portrait', //10
		13: 'Natural sRGB',
		14: 'Natural+ sRGB',
		15: 'Landscape', //10
		16: 'Evening', //10
		17: 'Night Scene', //10
		18: 'Night Portrait', //10
		0x84: 'Embed Adobe RGB'
	},
	
	/* TODO
	Quality2 !!!
	// (0x0103 is the same as 0x0102 above) -- this is true for some
	// cameras (A2/7Hi), but not others - PH
	0x0103: [
		{
			Name: 'Quality',
			Writable: 'int32u',
			Condition: '$self->{Model} =~ /^DiMAGE (A2|7Hi)$/',
			Notes: 'quality for DiMAGE A2/7Hi',
			Priority: 0, // lower priority because this doesn't work for A200
			PrintConv: { //4
				0: 'Raw',
				1: 'Super Fine',
				2: 'Fine',
				3: 'Standard',
				4: 'Economy',
				5: 'Extra fine',
			},
		},
		{
			Name: 'ImageSize',
			Writable: 'int32u',
			Condition: '$self->{Model} !~ /^DiMAGE A200$/',
			Notes: 'image size for other models except A200',
			PrintConv: {
				1: '1600x1200',
				2: '1280x960',
				3: '640x480',
				5: '2560x1920',
				6: '2272x1704',
				7: '2048x1536',
			},
		},
	],
	*/
	
	ImageStabilization: { 1: 'Off', 5: 'On' },
	RawAndJpgRecording: { 0: 'Off', 1: 'On' },
	ZoneMatching: {
		0: 'ISO Setting Used',
		1: 'High Key',
		2: 'Low Key',
	},
	ColorTemperature: function(n){
		return {
			value: (typeof n === 'number' && n>0) ? (n==0xffffffff ? 'n/a' : n.toString().concat(' Kelvin')) : 'Auto',
			_val: n
		};
	},
	LensType: {
		0: 'Minolta AF 28-85mm F3.5-4.5 New', // New added (ref 13/18)
		1: 'Minolta AF 80-200mm F2.8 HS-APO G',
		2: 'Minolta AF 28-70mm F2.8 G',
		3: 'Minolta AF 28-80mm F4-5.6',
		4: 'Minolta AF 85mm F1.4G', //exiv2 0.23
		5: 'Minolta AF 35-70mm F3.5-4.5 [II]', // (original and II, ref 13)
		6: 'Minolta AF 24-85mm F3.5-4.5 [New]', // (original and New, ref 13)
		// 7: 'AF 100-400mm F4.5-6.7 (D)', ??
		7: 'Minolta AF 100-300mm F4.5-5.6 APO [New] or 100-400mm or Sigma Lens',
		7.1: 'Minolta AF 100-400mm F4.5-6.7 APO', //JD
		7.2: 'Sigma AF 100-300mm F4 EX DG IF', //JD
		8: 'Minolta AF 70-210mm F4.5-5.6 [II]', // (original and II, ref 13)
		9: 'Minolta AF 50mm F3.5 Macro',
		10: 'Minolta AF 28-105mm F3.5-4.5 [New]', // (original and New, ref 13)
		11: 'Minolta AF 300mm F4 HS-APO G',
		12: 'Minolta AF 100mm F2.8 Soft Focus',
		13: 'Minolta AF 75-300mm F4.5-5.6 (New or II)', // (II and New, ref 13)
		14: 'Minolta AF 100-400mm F4.5-6.7 APO',
		15: 'Minolta AF 400mm F4.5 HS-APO G',
		16: 'Minolta AF 17-35mm F3.5 G',
		17: 'Minolta AF 20-35mm F3.5-4.5',
		18: 'Minolta AF 28-80mm F3.5-5.6 II',
		19: 'Minolta AF 35mm F1.4 G', // G added (ref 18), but not New as per ref 13
		20: 'Minolta/Sony 135mm F2.8 [T4.5] STF',
		// 20: 'Sony 135mm F2.8 [T4.5] STF (SAL135F28)', (ref 25)
		22: 'Minolta AF 35-80mm F4-5.6 II', // II added (ref 13)
		23: 'Minolta AF 200mm F4 Macro APO G',
		24: 'Minolta/Sony AF 24-105mm F3.5-4.5 (D) or Sigma or Tamron Lens',
		// 24: 'Sony 24-105mm F3.5-4.5 (SAL24105)', (ref 25)
		24.1: 'Sigma 18-50mm F2.8',
		24.2: 'Sigma 17-70mm F2.8-4.5 (D)',
		24.3: 'Sigma 20-40mm F2.8 EX DG Aspherical IF', //JD/22
		24.4: 'Sigma 18-200mm F3.5-6.3 DC', //22
		24.5: 'Sigma DC 18-125mm F4-5,6 D', //exiv2 0.23
	  // 24.6: 'Tamron SP AF 28-75mm F2.8 XR Di (IF) Macro', //JD
		24.6: 'Tamron SP AF 28-75mm F2.8 XR Di LD Aspherical [IF] Macro', //4 (Model A09)
		25: 'Minolta AF 100-300mm F4.5-5.6 APO (D) or Sigma Lens',
		25.1: 'Sigma 100-300mm F4 EX (APO (D) or D IF)', //JD
		25.2: 'Sigma 70mm F2.8 EX DG Macro', //JD
		25.3: 'Sigma 20mm F1.8 EX DG Aspherical RF', //19
		25.4: 'Sigma 30mm F1.4 EX DC', //21/27
		25.5: 'Sigma 24mm F1.8 EX DG ASP Macro', //Florian Knorn
		27: 'Minolta AF 85mm F1.4 G (D)', // added (D) (ref 13)
		28: 'Minolta/Sony AF 100mm F2.8 Macro (D) or Tamron Lens',
		// 28: 'Sony 100mm F2.8 Macro (SAL100M28)', (ref 18/25)
		28.1: 'Tamron SP AF 90mm F2.8 Di Macro', //JD (Model 272E)
		28.2: 'Tamron SP AF 180mm F3.5 Di LD [IF] Macro', //27 (Model B01) ("SP" moved - ref 25)
		29: 'Minolta/Sony AF 75-300mm F4.5-5.6 (D)', // Sony added (ref 13)
		// 29: 'Sony 75-300mm F4.5-5.6 (SAL75300)', (ref 25)
		30: 'Minolta AF 28-80mm F3.5-5.6 (D) or Sigma Lens',
		30.1: 'Sigma AF 10-20mm F4-5.6 EX DC', //JD
		30.2: 'Sigma AF 12-24mm F4.5-5.6 EX DG',
		30.3: 'Sigma 28-70mm EX DG F2.8', //16
		30.4: 'Sigma 55-200mm F4-5.6 DC', //JD
		31: 'Minolta/Sony AF 50mm F2.8 Macro (D) or F3.5',
		// 31: 'Sony 50mm F2.8 Macro (SAL50M28)', (ref 25)
		31.1: 'Minolta/Sony AF 50mm F3.5 Macro',
		32: 'Minolta/Sony AF 300mm F2.8 G or 1.5x Teleconverter', //13/18
		// 32: 'Minolta AF 300mm F2.8 G (D) SSM', (ref 13)
		// 32: 'Sony 300mm F2.8 G (SAL300F28G)', (ref 18/25)
		33: 'Minolta/Sony AF 70-200mm F2.8 G',
		// 33: 'Sony 70-200mm F2.8 G (SAL70200G)', (ref 25)
		// 33: 'Minolta AF 70-200mm F2.8 G (D) SSM' (ref 13)
		35: 'Minolta AF 85mm F1.4 G (D) Limited',
		36: 'Minolta AF 28-100mm F3.5-5.6 (D)',
		38: 'Minolta AF 17-35mm F2.8-4 (D)', // (Konica Minolta, ref 13)
		39: 'Minolta AF 28-75mm F2.8 (D)', // (Konica Minolta, ref 13)
		40: 'Minolta/Sony AF DT 18-70mm F3.5-5.6 (D)', // (Konica Minolta, ref 13)
		// 40: 'Sony DT 18-70mm F3.5-5.6 (SAL1870)', (ref 25)
		//40.1: 'Sony AF DT 18-200mm F3.5-6.3', //11 (anomaly? - PH)
		41: 'Minolta/Sony AF DT 11-18mm F4.5-5.6 (D) or Tamron Lens', // (Konica Minolta, ref 13)
		// 41: 'Sony DT 11-18mm F4.5-5.6 (SAL1118)', (ref 25)
		41.1: 'Tamron SP AF 11-18mm F4.5-5.6 Di II LD Aspherical IF', //JD (Model A13)
		42: 'Minolta/Sony AF DT 18-200mm F3.5-6.3 (D)', // Sony added (ref 13) (Konica Minolta, ref 13)
		// 42: 'Sony DT 18-200mm F3.5-6.3 (SAL18200)', (ref 25)
		43: 'Sony 35mm F1.4 G (SAL35F14G)', // changed from Minolta to Sony (ref 13/18/25) (but ref 11 shows both!)
		44: 'Sony 50mm F1.4 (SAL50F14)', // changed from Minolta to Sony (ref 13/18/25)
		45: 'Carl Zeiss Planar T* 85mm F1.4 ZA (SAL85F14Z)', //25
		46: 'Carl Zeiss Vario-Sonnar T* DT 16-80mm F3.5-4.5 ZA (SAL1680Z)', //25
		47: 'Carl Zeiss Sonnar T* 135mm F1.8 ZA (SAL135F18Z)', //25
		48: 'Carl Zeiss Vario-Sonnar T* 24-70mm F2.8 ZA SSM (SAL2470Z)', //11/25
		49: 'Sony DT 55-200mm F4-5.6 (SAL55200)', //JD/25
		50: 'Sony DT 18-250mm F3.5-6.3 (SAL18250)', //11/25
		51: 'Sony DT 16-105mm F3.5-5.6 (SAL16105)', //11/25
		//51.1: 'Sony AF DT 55-200mm F4-5.5', //11 (anomaly? - PH)
		52: 'Sony 70-300mm F4.5-5.6 G SSM (SAL70300G) or Tamron Lens', //JD/25
		52.1: 'Tamron SP 70-300mm F4-5.6 Di USD', //25,4 (Model A005)
		53: 'Sony 70-400mm F4-5.6 G SSM (SAL70400G)', //17(/w correction by Stephen Bishop)/25
		54: 'Carl Zeiss Vario-Sonnar T* 16-35mm F2.8 ZA SSM (SAL1635Z)', //17/25
		55: 'Sony DT 18-55mm F3.5-5.6 SAM [II] (SAL1855)', //PH/25
		56: 'Sony DT 55-200mm F4-5.6 SAM (SAL55200-2)', //22/25
		57: 'Sony DT 50mm F1.8 SAM (SAL50F18) or Tamron Lens', //22/25
		57.1: 'Tamron SP AF 60mm F2 Di II LD [IF] Macro 1:1', // (Model G005) (ref http://u88.n24.queensu.ca/exiftool/forum/index.php/topic,3858.0.html)
		57.2: 'Tamron 18-270mm F3.5-6.3 Di II PZD', //27 (Model B008)
		58: 'Sony DT 30mm F2.8 Macro SAM (SAL30M28)', //22/25
		59: 'Sony 28-75mm F2.8 SAM (SAL2875)', //21/25
		60: 'Carl Zeiss Distagon T* 24mm F2 ZA SSM (SAL24F20Z)', //17/25
		61: 'Sony 85mm F2.8 SAM (SAL85F28)', //17/25
		62: 'Sony DT 35mm F1.8 SAM (SAL35F18)', //PH/25
		63: 'Sony DT 16-50mm F2.8 SSM (SAL1650)', //17/25
		64: 'Sony 500mm F4.0 G SSM (SAL500F40G)', //29
		65: 'Sony DT 18-135mm F3.5-5.6 SAM (SAL18135)', //25
		66: 'Sony 300mm F2.8 G SSM II (SAL300F28G2)', //29
		67: 'Sony 70-200mm F2.8 G SSM II (SAL70200G2)', //25
		68: 'Sony DT 55-300mm F4.5-5.6 SAM (SAL55300)', //29
		69: 'Sony 70-400mm F4-5.6 G SSM II (SAL70400G2)', //25
		70: 'Carl Zeiss Planar T* 50mm F1.4 ZA SSM (SAL50F14Z)', //25
		128: 'Tamron or Sigma Lens (128)',
		128.1: 'Tamron AF 18-200mm F3.5-6.3 XR Di II LD Aspherical [IF] Macro', //25 (Model A14)
		// was 128.1: 'Tamron 18-200mm F3.5-6.3',
		128.2: 'Tamron AF 28-300mm F3.5-6.3 XR Di LD Aspherical [IF] Macro', //25 (Model A061)
		// was 128.2: 'Tamron 28-300mm F3.5-6.3',
		128.3: 'Tamron 80-300mm F3.5-6.3',
		128.4: 'Tamron AF 28-200mm F3.8-5.6 XR Di Aspherical [IF] Macro', //JD (Model A031)
		128.5: 'Tamron SP AF 17-35mm F2.8-4 Di LD Aspherical IF', //JD (Model A05)
		128.6: 'Sigma AF 50-150mm F2.8 EX DC APO HSM II', //JD
		128.7: 'Sigma 10-20mm F3.5 EX DC HSM', //11 (Model 202-205)
		128.8: 'Sigma 70-200mm F2.8 II EX DG APO MACRO HSM', //24
		128.9: 'Sigma 10mm F2.8 EX DC HSM Fisheye', //Florian Knorn
		// (yes, '128.10'.  My condolences to typed languages that use this database - PH)
	   '128.10': 'Sigma 50mm F1.4 EX DG HSM', //Florian Knorn
	   '128.11': 'Sigma 85mm F1.4 EX DG HSM', //27
	   '128.12': 'Sigma 24-70mm F2.8 IF EX DG HSM', //27
	   '128.13': 'Sigma 18-250mm F3.5-6.3 DC OS HSM', //27
	   '128.14': 'Sigma 17-50mm F2.8 EX DC HSM', //Exiv2
	   '128.15': 'Sigma 17-70mm F2.8-4 DC Macro HSM', //25
		129: 'Tamron Lens (129)',
		129.1: 'Tamron 200-400mm F5.6 LD', //12 (LD ref 23)
		129.2: 'Tamron 70-300mm F4-5.6 LD', //12
		131: 'Tamron 20-40mm F2.7-3.5 SP Aspherical IF', //23 (Model 266D)
		135: 'Vivitar 28-210mm F3.5-5.6', //16
		136: 'Tokina EMZ M100 AF 100mm F3.5', //JD
		137: 'Cosina 70-210mm F2.8-4 AF', //11
		138: 'Soligor 19-35mm F3.5-4.5', //11
		142: 'Voigtlander 70-300mm F4.5-5.6', //JD
		146: 'Voigtlander Macro APO-Lanthar 125mm F2.5 SL', //JD
		194: 'Tamron SP AF 17-50mm F2.8 XR Di II LD Aspherical [IF]', //23 (Model A16)
		203: 'Tamron SP 70-200mm F2.8 Di USD', //25 (Model A009)
		// ?: 'Tamron SP 24-70mm F2.8 Di USD', //25 (Model A007)
		// ?: 'Tamron SP 150-600mm F5-6.3 Di USD', //25 (Model A011)
		// ?: 'Tamron SP 90mm F2.8 Di Macro 1:1 USD', //25 (Model F004)
		255: 'Tamron Lens (255)',
		255.1: 'Tamron SP AF 17-50mm F2.8 XR Di II LD Aspherical', // (Model A16)
		255.2: 'Tamron AF 18-250mm F3.5-6.3 XR Di II LD', //JD (Model A18?)
	 //? 225.2: 'Tamron AF 18-250mm F3.5-6.3 Di II LD Aspherical [IF] Macro', //25 (Model A18)
		255.3: 'Tamron AF 55-200mm F4-5.6 Di II LD Macro', // (Model A15) (added "LD Macro", ref 23)
		255.4: 'Tamron AF 70-300mm F4-5.6 Di LD Macro 1:2', // (Model A17)
		255.5: 'Tamron SP AF 200-500mm F5.0-6.3 Di LD IF', // (Model A08)
		255.6: 'Tamron SP AF 10-24mm F3.5-4.5 Di II LD Aspherical IF', //22 (Model B001)
		255.7: 'Tamron SP AF 70-200mm F2.8 Di LD IF Macro', //22 (Model A001)
		255.8: 'Tamron SP AF 28-75mm F2.8 XR Di LD Aspherical IF', //24 (Model A09)
		255.9: 'Tamron AF 90-300mm F4.5-5.6 Telemacro', //Fredrik Agert
		25501: 'Minolta AF 50mm F1.7', //7
		25511: 'Minolta AF 35-70mm F4 or Other Lens',
		25511.1: 'Sigma UC AF 28-70mm F3.5-4.5', //12/16(HighSpeed-AF)
		25511.2: 'Sigma AF 28-70mm F2.8', //JD
		25511.3: 'Sigma M-AF 70-200mm F2.8 EX Aspherical', //12
		25511.4: 'Quantaray M-AF 35-80mm F4-5.6', //JD
		25521: 'Minolta AF 28-85mm F3.5-4.5 or Other Lens', // not New (ref 18)
		25521.1: 'Tokina 19-35mm F3.5-4.5', //3
		25521.2: 'Tokina 28-70mm F2.8 AT-X', //7
		25521.3: 'Tokina 80-400mm F4.5-5.6 AT-X AF II 840', //JD
		25521.4: 'Tokina AF PRO 28-80mm F2.8 AT-X 280', //JD
		25521.5: 'Tokina AT-X PRO II AF 28-70mm F2.6-2.8 270', //24
		25521.6: 'Tamron AF 19-35mm F3.5-4.5', //JD (Model A10)
		25521.7: 'Angenieux AF 28-70mm F2.6', //JD
		25521.8: 'Tokina AT-X 17 AF 17mm F3.5', //27
		25531: 'Minolta AF 28-135mm F4-4.5 or Sigma Lens',
		25531.1: 'Sigma ZOOM-alpha 35-135mm F3.5-4.5', //16
		25531.2: 'Sigma 28-105mm F2.8-4 Aspherical', //JD
		25531.3: 'Sigma 28-105mm F4-5.6 UC', //25
		25541: 'Minolta AF 35-105mm F3.5-4.5', //13
		25551: 'Minolta AF 70-210mm F4 Macro or Sigma Lens',
		25551.1: 'Sigma 70-210mm F4-5.6 APO', //7
		25551.2: 'Sigma M-AF 70-200mm F2.8 EX APO', //6
		25551.3: 'Sigma 75-200mm F2.8-3.5', //22
		25561: 'Minolta AF 135mm F2.8',
		25571: 'Minolta/Sony AF 28mm F2.8', // Sony added (ref 18)
		// 25571: 'Sony 28mm F2.8 (SAL28F28)', (ref 18/25)
		25581: 'Minolta AF 24-50mm F4',
		25601: 'Minolta AF 100-200mm F4.5',
		25611: 'Minolta AF 75-300mm F4.5-5.6 or Sigma Lens', //13
		25611.1: 'Sigma 70-300mm F4-5.6 DL Macro', //12 (also DG version ref 27, and APO version ref 25)
		25611.2: 'Sigma 300mm F4 APO Macro', //3/7
		25611.3: 'Sigma AF 500mm F4.5 APO', //JD
		25611.4: 'Sigma AF 170-500mm F5-6.3 APO Aspherical', //JD
		25611.5: 'Tokina AT-X AF 300mm F4', //JD
		25611.6: 'Tokina AT-X AF 400mm F5.6 SD', //22
		25611.7: 'Tokina AF 730 II 75-300mm F4.5-5.6', //JD
		25611.8: 'Sigma 800mm F5.6 APO', //http://u88.n24.queensu.ca/exiftool/forum/index.php/topic,3472.0.html
		25611.9: 'Sigma AF 400mm F5.6 APO Macro', //27
		25621: 'Minolta AF 50mm F1.4 [New]', // original and New, not Sony (ref 13/18)
		25631: 'Minolta AF 300mm F2.8 APO or Sigma Lens', // changed G to APO (ref 13)
		25631.1: 'Sigma AF 50-500mm F4-6.3 EX DG APO', //JD
		25631.2: 'Sigma AF 170-500mm F5-6.3 APO Aspherical', //JD (also DG version, ref 27)
		25631.3: 'Sigma AF 500mm F4.5 EX DG APO', //JD
		25631.4: 'Sigma 400mm F5.6 APO', //22
		25641: 'Minolta AF 50mm F2.8 Macro or Sigma Lens',
		25641.1: 'Sigma 50mm F2.8 EX Macro', //11
		25651: 'Minolta AF 600mm F4',
		25661: 'Minolta AF 24mm F2.8 or Sigma Lens',
		25661.1: 'Sigma 17-35mm F2.8-4 EX Aspherical', //http://u88.n24.queensu.ca/exiftool/forum/index.php/topic,3789.msg17679.html//msg17679
		25721: 'Minolta/Sony AF 500mm F8 Reflex',
		// 25721: 'Sony 500mm F8 Reflex (SAL500F80)', (ref 25)
		25781: 'Minolta/Sony AF 16mm F2.8 Fisheye or Sigma Lens', // Sony added (ref 13/18)
		// 25781: 'Sony 16mm F2.8 Fisheye (SAL16F28)', (ref 18/25)
		25781.1: 'Sigma 8mm F4 EX [DG] Fisheye',
		25781.2: 'Sigma 14mm F3.5',
		25781.3: 'Sigma 15mm F2.8 Fisheye', //JD (writes 16mm to EXIF)
		25791: 'Minolta/Sony AF 20mm F2.8 or Tokina Lens', // Sony added (ref 11)
		// 25791: 'Sony 20mm F2.8 (SAL20F28)', (ref 25)
		25791.1: 'Tokina AT-X Pro DX 11-16mm F2.8', //http://u88.n24.queensu.ca/exiftool/forum/index.php/topic,3593.0.html
		25811: 'Minolta AF 100mm F2.8 Macro [New] or Sigma or Tamron Lens', // not Sony (ref 13/18)
		25811.1: 'Sigma AF 90mm F2.8 Macro', //JD
		25811.2: 'Sigma AF 105mm F2.8 EX [DG] Macro', //JD
		25811.3: 'Sigma 180mm F5.6 Macro',
		25811.4: 'Sigma 180mm F3.5 EX DG Macro', //http://u88.n24.queensu.ca/exiftool/forum/index.php/topic,3789.msg17679.html//msg17679
		25811.5: 'Tamron 90mm F2.8 Macro',
		25851: 'Beroflex 35-135mm F3.5-4.5', //16
		25858: 'Minolta AF 35-105mm F3.5-4.5 New or Tamron Lens',
		25858.1: 'Tamron 24-135mm F3.5-5.6', // (Model 190D)
		25881: 'Minolta AF 70-210mm F3.5-4.5',
		25891: 'Minolta AF 80-200mm F2.8 APO or Tokina Lens',
		25891.1: 'Tokina 80-200mm F2.8',
		// 25901 - Note: only get this with older 1.4x and lenses with 5-digit LensTypes (ref 27)
		// 25901 - also "Minolta AF 200mm F2.8 HS-APO G + Minolta AF 1.4x APO"
		25901: 'Minolta AF 200mm F2.8 G APO + Minolta AF 1.4x APO or Other Lens + 1.4x', //26
		25901.1: 'Minolta AF 600mm F4 HS-APO G + Minolta AF 1.4x APO', //27
		25911: 'Minolta AF 35mm F1.4', //(from Sony list) (not G as per ref 13)
		25921: 'Minolta AF 85mm F1.4 G (D)',
		25931: 'Minolta AF 200mm F2.8 G APO',
		25941: 'Minolta AF 3x-1x F1.7-2.8 Macro',
		25961: 'Minolta AF 28mm F2',
		25971: 'Minolta AF 35mm F2 [New]', //13
		25981: 'Minolta AF 100mm F2',
		// 26011 - Note: only get this with older 2x and lenses with 5-digit LensTypes (ref 27)
		// 26011 - also "Minolta AF 200mm F2.8 HS-APO G + Minolta AF 2x APO"
		26011: 'Minolta AF 200mm F2.8 G APO + Minolta AF 2x APO or Other Lens + 2x', //26
		26011.1: 'Minolta AF 600mm F4 HS-APO G + Minolta AF 2x APO', //27
		26041: 'Minolta AF 80-200mm F4.5-5.6',
		26051: 'Minolta AF 35-80mm F4-5.6', //(from Sony list)
		26061: 'Minolta AF 100-300mm F4.5-5.6', // not (D) (ref 13/18)
		26071: 'Minolta AF 35-80mm F4-5.6', //13
		26081: 'Minolta AF 300mm F2.8 HS-APO G', // HS-APO added (ref 13/18)
		26091: 'Minolta AF 600mm F4 HS-APO G',
		26121: 'Minolta AF 200mm F2.8 HS-APO G',
		26131: 'Minolta AF 50mm F1.7 New',
		26151: 'Minolta AF 28-105mm F3.5-4.5 xi', // xi, not Power Zoom (ref 13/18)
		26161: 'Minolta AF 35-200mm F4.5-5.6 xi', // xi, not Power Zoom (ref 13/18)
		26181: 'Minolta AF 28-80mm F4-5.6 xi', // xi, not Power Zoom (ref 13/18)
		26191: 'Minolta AF 80-200mm F4.5-5.6 xi', // xi, not Power Zoom (ref 13/18)
		26201: 'Minolta AF 28-70mm F2.8 G', //11
		26211: 'Minolta AF 100-300mm F4.5-5.6 xi', // xi, not Power Zoom (ref 13/18)
		26241: 'Minolta AF 35-80mm F4-5.6 Power Zoom',
		26281: 'Minolta AF 80-200mm F2.8 G', //11
		26291: 'Minolta AF 85mm F1.4 New',
		26311: 'Minolta/Sony AF 100-300mm F4.5-5.6 APO', //11
		26321: 'Minolta AF 24-50mm F4 New',
		26381: 'Minolta AF 50mm F2.8 Macro New',
		26391: 'Minolta AF 100mm F2.8 Macro',
		26411: 'Minolta/Sony AF 20mm F2.8 New', // Sony added (ref 13)
		26421: 'Minolta AF 24mm F2.8 New',
		26441: 'Minolta AF 100-400mm F4.5-6.7 APO', //11
		26621: 'Minolta AF 50mm F1.4 New',
		26671: 'Minolta AF 35mm F2 New',
		26681: 'Minolta AF 28mm F2 New',
		26721: 'Minolta AF 24-105mm F3.5-4.5 (D)', //11
		// 30464: newer firmware versions of the Speed Booster report type 30464 (=0x7700)
		// - this is the base to which the Canon LensType is added
		30464: 'Metabones Canon EF Speed Booster', //Metabones
		45671: 'Tokina 70-210mm F4-5.6', //22
		45741: '2x Teleconverter or Tamron or Tokina Lens', //18
		45741.1: 'Tamron SP AF 90mm F2.5', //JD
		45741.2: 'Tokina RF 500mm F8.0 x2', //JD
		45741.3: 'Tokina 300mm F2.8 x2',
		45751: '1.4x Teleconverter', //18
		45851: 'Tamron SP AF 300mm F2.8 LD IF', //11
		45861: 'Tamron SP AF 35-105mm F2.8 LD Aspherical IF', //Fredrik Agert
		45871: 'Tamron AF 70-210mm F2.8 SP LD', //Fabio Suprani
		// 61184: older firmware versions of both the Speed Booster and the Smart Adapter
		// report type 61184 (=0xef00), and add only the lower byte of the Canon LensType (ref 25).
		// For newer firmware versions this is only used by the Smart Adapter, and
		// the full Canon LensType code is added - PH
		61184: 'Metabones Canon EF Adapter', //25
		// all M42-type lenses give a value of 65535 (and FocalLength=0, FNumber=1)
		65535: 'E-Mount, T-Mount, Other Lens or no lens', //JD/25
	//
	// Sony E-type lenses (NOTE: these should be kept in sync with %sonyLensTypes2 of Sony.pm)
	//
		65535.1 : 'Sony E 16mm F2.8',                 //PH (SEL16F28   - 32784)
		65535.2 : 'Sony E 18-55mm F3.5-5.6 OSS',      //PH (SEL1855    - 32785)
		65535.3 : 'Sony E 55-210mm F4.5-6.3 OSS',     //PH (SEL55210   - 32786)
		65535.4 : 'Sony E 18-200mm F3.5-6.3 OSS',     //PH (SEL18200   - 32787)
		65535.5 : 'Sony E 30mm F3.5 Macro',           //25 (SEL30M35   - 32788)
		65535.6 : 'Sony E 24mm F1.8 ZA',              //PH (SEL24F18Z  - 32789)
		65535.7 : 'Sony E 50mm F1.8 OSS',             //PH (SEL50F18   - 32790)
		65535.8 : 'Sony E 16-70mm F4 ZA OSS',         //25 (SEL1670Z   - 32791)
		65535.9 : 'Sony E 10-18mm F4 OSS',            //PH (SEL1018    - 32792)
	   '65535.10': 'Sony E PZ 16-50mm F3.5-5.6 OSS',  //PH (SELP1650   - 32793)
	   '65535.11': 'Sony FE 35mm F2.8 ZA',            //25 (SEL35F28Z  - 32794)
	   '65535.12': 'Sony FE 24-70mm F4 ZA OSS',       //25 (SEL2470Z   - 32795)
	   '65535.13': 'Sony E 18-200mm F3.5-6.3 OSS LE', //25 (SEL18200LE - 32797)
	   '65535.14': 'Sony E 20mm F2.8',                //PH (SEL20F28   - 32798)
	   '65535.15': 'Sony E 35mm F1.8 OSS',            //25 (SEL35F18   - 32799)
	   '65535.16': 'Sony E PZ 18-105mm F4 G OSS',     //25 (SELP18105G - 32800)
	   '65535.17': 'Sony E PZ 18-200mm F3.5-6.3 OSS', //25 (SELP18200  - 32807)
	   '65535.18': 'Sony FE 55mm F1.8 ZA',            //25 (SEL55F18Z  - 32808)
	   '65535.19': 'Sony FE 70-200mm F4 G OSS',       //25 (SEL70200G  - 32810)
	   '65535.20': 'Sony FE 28-70mm F3.5-5.6 OSS',    //25 (SEL2870    - 32813)
	//
	// 3rd party E lenses
	//
	   '65535.21': 'Sigma 19mm F2.8 [EX] DN', //25
	   '65535.22': 'Sigma 30mm F2.8 [EX] DN', //25
	   '65535.23': 'Sigma 60mm F2.8 DN', //25
	   '65535.24': 'Tamron 18-200mm F3.5-6.3 Di III VC', //25 (Model B011)
	   '65535.25': 'Zeiss Touit 12mm F2.8', //25
	   '65535.26': 'Zeiss Touit 32mm F1.8', //25
	   '65535.27': 'Zeiss Touit 50mm F2.8 Macro', //25 
	// 
	// other lenses 
	// 
	   '65535.28': 'Arax MC 35mm F2.8 Tilt+Shift', //JD 
	   '65535.29': 'Arax MC 80mm F2.8 Tilt+Shift', //JD 
	   '65535.30': 'Zenitar MF 16mm F2.8 Fisheye M42', //JD 
	   '65535.31': 'Samyang 500mm Mirror F8.0', //19 
	   '65535.32': 'Pentacon Auto 135mm F2.8', //19 
	   '65535.33': 'Pentacon Auto 29mm F2.8', //19 
	   '65535.34': 'Helios 44-2 58mm F2.0', //19 
	},
	WhiteBalance: {
		0x00: 'Auto',
		0x01: 'Color Temperature/Color Filter',
		0x10: 'Daylight',
		0x20: 'Cloudy',
		0x30: 'Shade',
		0x40: 'Tungsten',
		0x50: 'Flash',
		0x60: 'Fluorescent',
		0x70: 'Custom',
	},
	
	
	
	_IFDpointer_CameraSettingsOld: {},
	_IFDpointer_CameraSettings: {},
	_IFDpointer_CameraSettings2: {
		/*
		1: {
			Name: 'ExposureMode',
			PrintConv: {
				0: 'Program',
				1: 'Aperture Priority',
				2: 'Shutter Priority',
				3: 'Manual',
			},
		},
		2: {
			Name: 'FlashMode',
			PrintConv: {
				0: 'Fill flash',
				1: 'Red-eye reduction',
				2: 'Rear flash sync',
				3: 'Wireless',
				4: 'Off?', //PH
			},
		},
		3: {
			Name: 'WhiteBalance',
			PrintConv: 'Image::ExifTool::Minolta::ConvertWhiteBalance($val)',
		},
		4: {
			Name: 'MinoltaImageSize',
			PrintConv: {
				0: 'Full',
				1: '1600x1200',
				2: '1280x960',
				3: '640x480',
				6: '2080x1560', //PH (A2)
				7: '2560x1920', //PH (A2)
				8: '3264x2176', //PH (A2)
			},
		},
		5: {
			Name: 'MinoltaQuality',
			PrintConv: { //4
				0: 'Raw',
				1: 'Super Fine',
				2: 'Fine',
				3: 'Standard',
				4: 'Economy',
				5: 'Extra Fine',
			},
		},
		6: {
			Name: 'DriveMode',
			PrintConv: {
				0: 'Single',
				1: 'Continuous',
				2: 'Self-timer',
				4: 'Bracketing',
				5: 'Interval',
				6: 'UHS continuous',
				7: 'HS continuous',
			},
		},
		7: {
			Name: 'MeteringMode',
			PrintConv: {
				0: 'Multi-segment',
				1: 'Center-weighted average',
				2: 'Spot',
			},
		},
		8: {
			Name: 'ISO',
			ValueConv: '2 ** (($val-48)/8) * 100',
			ValueConvInv: '48 + 8*log($val/100)/log(2)',
			PrintConv: 'int($val + 0.5)',
			PrintConvInv: '$val',
		},
		9: {
			Name: 'ExposureTime',
			ValueConv: '2 ** ((48-$val)/8)',
			ValueConvInv: '48 - 8*log($val)/log(2)',
			PrintConv: 'Image::ExifTool::Exif::PrintExposureTime($val)',
			PrintConvInv: 'Image::ExifTool::Exif::ConvertFraction($val)',
		},
		10: {
			Name: 'FNumber',
			ValueConv: '2 ** (($val-8)/16)',
			ValueConvInv: '8 + 16*log($val)/log(2)',
			PrintConv: 'sprintf("%.1f",$val)',
			PrintConvInv: '$val',
		},
		11: {
			Name: 'MacroMode',
			PrintConv: {
				0: 'Off',
				1: 'On',
			},
		},
		12: {
			Name: 'DigitalZoom',
			PrintConv: {
				0: 'Off',
				1: 'Electronic magnification',
				2: '2x',
			},
		},
		13: {
			Name: 'ExposureCompensation',
			ValueConv: '$val/3 - 2',
			ValueConvInv: '($val + 2) * 3',
			PrintConv: 'Image::ExifTool::Exif::PrintFraction($val)',
			PrintConvInv: 'Image::ExifTool::Exif::ConvertFraction($val)',
		},
		14: {
			Name: 'BracketStep',
			PrintConv: {
				0: '1/3 EV',
				1: '2/3 EV',
				2: '1 EV',
			},
		},
		16: 'IntervalLength',
		17: 'IntervalNumber',
		18: {
			Name: 'FocalLength',
			ValueConv: '$val / 256',
			ValueConvInv: '$val * 256',
			PrintConv: 'sprintf("%.1f mm",$val)',
			PrintConvInv: '$val=~s/\s*mm$//;$val',
		},
		19: {
			Name: 'FocusDistance',
			ValueConv: '$val / 1000',
			ValueConvInv: '$val * 1000',
			PrintConv: '$val ? "$val m" : "inf"',
			PrintConvInv: '$val eq "inf" ? 0 : $val =~ s/\s*m$//, $val',
		},
		20: {
			Name: 'FlashFired',
			PrintConv: {
				0: 'No',
				1: 'Yes',
			},
		},
		21: {
			Name: 'MinoltaDate',
			Groups: { 2: 'Time' },
			Shift: 'Time',
			ValueConv: 'sprintf("%4d:%.2d:%.2d",$val>>16,($val&0xff00)>>8,$val&0xff)',
			ValueConvInv: 'my @a=($val=~/(\d+):(\d+):(\d+)/); @a ? ($a[0]<<16)+($a[1]<<8)+$a[2] : undef',
		},
		22: {
			Name: 'MinoltaTime',
			Groups: { 2: 'Time' },
			Shift: 'Time',
			ValueConv: 'sprintf("%.2d:%.2d:%.2d",$val>>16,($val&0xff00)>>8,$val&0xff)',
			ValueConvInv: 'my @a=($val=~/(\d+):(\d+):(\d+)/); @a ? ($a[0]<<16)+($a[1]<<8)+$a[2] : undef',
		},
		23: {
			Name: 'MaxAperture',
			ValueConv: '2 ** (($val-8)/16)',
			ValueConvInv: '8 + 16*log($val)/log(2)',
			PrintConv: 'sprintf("%.1f",$val)',
			PrintConvInv: '$val',
		},
		26: {
			Name: 'FileNumberMemory',
			PrintConv: \%offOn,
		},
		27: 'LastFileNumber',
		28: {
			Name: 'ColorBalanceRed',
			ValueConv: '$val / 256',
			ValueConvInv: '$val * 256',
		},
		29: {
			Name: 'ColorBalanceGreen',
			ValueConv: '$val / 256',
			ValueConvInv: '$val * 256',
		},
		30: {
			Name: 'ColorBalanceBlue',
			ValueConv: '$val / 256',
			ValueConvInv: '$val * 256',
		},
		31: {
			Name: 'Saturation',
			ValueConv: '$val - ($self->{Model}=~/DiMAGE A2/ ? 5 : 3)',
			ValueConvInv: '$val + ($self->{Model}=~/DiMAGE A2/ ? 5 : 3)',
			%Image::ExifTool::Exif::printParameter,
		},
		32: {
			Name: 'Contrast',
			ValueConv: '$val - ($self->{Model}=~/DiMAGE A2/ ? 5 : 3)',
			ValueConvInv: '$val + ($self->{Model}=~/DiMAGE A2/ ? 5 : 3)',
			%Image::ExifTool::Exif::printParameter,
		},
		33: {
			Name: 'Sharpness',
			PrintConv: {
				0: 'Hard',
				1: 'Normal',
				2: 'Soft',
			},
		},
		34: {
			Name: 'SubjectProgram',
			PrintConv: {
				0: 'None',
				1: 'Portrait',
				2: 'Text',
				3: 'Night portrait',
				4: 'Sunset',
				5: 'Sports action',
			},
		},
		35: {
			Name: 'FlashExposureComp',
			Description: 'Flash Exposure Compensation',
			ValueConv: '($val - 6) / 3',
			ValueConvInv: '$val * 3 + 6',
			PrintConv: 'Image::ExifTool::Exif::PrintFraction($val)',
			PrintConvInv: 'Image::ExifTool::Exif::ConvertFraction($val)',
		},
		36: {
			Name: 'ISOSetting',
			PrintConv: {
				0: 100,
				1: 200,
				2: 400,
				3: 800,
				4: 'Auto',
				5: 64,
			},
		},
		37: {
			Name: 'MinoltaModelID',
			PrintConv: {
				0: 'DiMAGE 7, X1, X21 or X31',
				1: 'DiMAGE 5',
				2: 'DiMAGE S304',
				3: 'DiMAGE S404',
				4: 'DiMAGE 7i',
				5: 'DiMAGE 7Hi',
				6: 'DiMAGE A1',
				7: 'DiMAGE A2 or S414',
			},
		},
		38: {
			Name: 'IntervalMode',
			PrintConv: {
				0: 'Still Image',
				1: 'Time-lapse Movie',
			},
		},
		39: {
			Name: 'FolderName',
			PrintConv: {
				0: 'Standard Form',
				1: 'Data Form',
			},
		},
		40: {
			Name: 'ColorMode',
			PrintConv: {
				0: 'Natural color',
				1: 'Black & White',
				2: 'Vivid color',
				3: 'Solarization',
				4: 'Adobe RGB',
			},
		},
		41: {
			Name: 'ColorFilter',
			ValueConv: '$val - ($self->{Model}=~/DiMAGE A2/ ? 5 : 3)',
			ValueConvInv: '$val + ($self->{Model}=~/DiMAGE A2/ ? 5 : 3)',
		},
		42: 'BWFilter',
		43: {
			Name: 'InternalFlash',
			PrintConv: {
				0: 'No',
				1: 'Fired',
			},
		},
		44: {
			Name: 'Brightness',
			ValueConv: '$val/8 - 6',
			ValueConvInv: '($val + 6) * 8',
		},
		45: 'SpotFocusPointX',
		46: 'SpotFocusPointY',
		47: {
			Name: 'WideFocusZone',
			PrintConv: {
				0: 'No zone',
				1: 'Center zone (horizontal orientation)',
				2: 'Center zone (vertical orientation)',
				3: 'Left zone',
				4: 'Right zone',
			},
		},
		48: {
			Name: 'FocusMode',
			PrintConv: {
				0: 'AF',
				1: 'MF',
			},
		},
		49: {
			Name: 'FocusArea',
			PrintConv: {
				0: 'Wide Focus (normal)',
				1: 'Spot Focus',
			},
		},
		50: {
			Name: 'DECPosition',
			PrintConv: {
				0: 'Exposure',
				1: 'Contrast',
				2: 'Saturation',
				3: 'Filter',
			},
		},
		// 7Hi only:
		51: {
			Name: 'ColorProfile',
			Condition: '$self->{Model} eq "DiMAGE 7Hi"',
			Notes: 'DiMAGE 7Hi only',
			PrintConv: {
				0: 'Not Embedded',
				1: 'Embedded',
			},
		},
		// (the following may be entry 51 for other models?)
		52: {
			Name: 'DataImprint',
			Condition: '$self->{Model} eq "DiMAGE 7Hi"',
			Notes: 'DiMAGE 7Hi only',
			PrintConv: {
				0: 'None',
				1: 'YYYY/MM/DD',
				2: 'MM/DD/HH:MM',
				3: 'Text',
				4: 'Text + ID//',
			},
		},
		63: { //9
			Name: 'FlashMetering',
			PrintConv: {
				0: 'ADI (Advanced Distance Integration)',
				1: 'Pre-flash TTL',
				2: 'Manual flash control',
			},
		},
				*/
			}	
};