// exiftool.js/makernotes/panasonicLeica2

// summary:
//    Makernotes for the following Makes :
//    'LEICA' (most models)

// description:
//    ported from http://www.sno.phy.queensu.ca/~phil/exiftool/TagNames/Panasonic.html
//    (contains Leica tags)

// returns:
//    a makernote object for exiftool.js and redaktor/meta

/* TODO / FIXME - WHAT'S UP WITH M9 subdirectory ? - M9 returns more ...
*/

exports.info = {
	
	DefaultHeaderSize : 8,
	
	tags : {
		0x300: 'Quality',
		0x302: 'UserProfile',
		0x303: 'SerialNumber',
		0x304: 'WhiteBalance',
		0x310: 'LensType',
		0x312: 'MeasuredLV',
		0x313: 'ApproximateFNumber',
		0x320: 'CameraTemperature',
		0x321: 'ColorTemperature',
		0x322: 'WBRedLevel', 
		0x323: 'WBGreenLevel', 
		0x324: 'WBBlueLevel', 
		0x325: 'UV_IRFilterCorrection',
		0x330: 'CCDVersion',      
		0x331: 'CCDBoardVersion', 
		0x332: 'ControllerBoardVersion', 
		0x333: 'M16CVersion',     
		0x340: 'ImageIDNumber' 
	},
	
	ref: {
		Quality: { 1: 'Fine', 2: 'Basic', },
		UserProfile: {
			1: 'User Profile 1',
			2: 'User Profile 2',
			3: 'User Profile 3',
			4: 'User Profile 0 (Dynamic)',
		},
		WhiteBalance: function(n){
			if ( typeof n !== 'number' ) return { value: 'n/a', _val:n }
			var r = {
				0: 'Auto or Manual',
				1: 'Daylight',
				2: 'Fluorescent',
				3: 'Tungsten',
				4: 'Flash',
				10: 'Cloudy',
				11: 'Shade'
			};
			if (n > 0x8000) return { value: n.toString().concat(' Kelvin'), _val:n }
			return (n in r) ? { value: r[n], _val:n } : { value: 'Auto', _val:n }
		},
		LensType: function(n){
			var lenses = {
				1: 'Elmarit-M 21mm f/2.8',            // 11134
				3: 'Elmarit-M 28mm f/2.8 (III)',      // 11804
				4: 'Tele-Elmarit-M 90mm f/2.8 (II)',  // 11800
				5: 'Summilux-M 50mm f/1.4 (II)',      // 11868/11856/11114
				6: 'Summicron-M 35mm f/2 (IV)',       // 11310/11311
				'6 0': 'Summilux-M 35mm f/1.4',       // 11869/11870/11860
				7: 'Summicron-M 90mm f/2 (II)',       // 11136/11137
				9: 'Elmarit-M 135mm f/2.8 (I/II)',    // 11829
				'9 0': 'Apo-Telyt-M 135mm f/3.4',     // 11889
				16: 'Tri-Elmar-M 16-18-21mm f/4 ASPH.',// 11626
				'16 1': 'Tri-Elmar-M 16-18-21mm f/4 ASPH. (at 16mm)',
				'16 2': 'Tri-Elmar-M 16-18-21mm f/4 ASPH. (at 18mm)',
				'16 3': 'Tri-Elmar-M 16-18-21mm f/4 ASPH. (at 21mm)',
				23: 'Summicron-M 50mm f/2 (III)',     // 11817, version (I) in camera menu
				24: 'Elmarit-M 21mm f/2.8 ASPH.',     // 11135/11897
				25: 'Elmarit-M 24mm f/2.8 ASPH.',     // 11878/11898
				26: 'Summicron-M 28mm f/2 ASPH.',     // 11604
				27: 'Elmarit-M 28mm f/2.8 (IV)',      // 11809
				28: 'Elmarit-M 28mm f/2.8 ASPH.',     // 11606
				29: 'Summilux-M 35mm f/1.4 ASPH.',    // 11874/11883
				'29 0': 'Summilux-M 35mm f/1.4 ASPHERICAL', // 11873 (different from "ASPH." model!)
				30: 'Summicron-M 35mm f/2 ASPH.',     // 11879/11882
				31: 'Noctilux-M 50mm f/1',            // 11821/11822
				'31 0': 'Noctilux-M 50mm f/1.2',      // 11820
				32: 'Summilux-M 50mm f/1.4 ASPH.',    // 11891/11892
				33: 'Summicron-M 50mm f/2 (IV, V)',   // 11819/11825/11826/11816, version (II,III) in camera menu
				34: 'Elmar-M 50mm f/2.8',             // 11831/11823/11825
				35: 'Summilux-M 75mm f/1.4',          // 11814/11815/11810
				36: 'Apo-Summicron-M 75mm f/2 ASPH.', // 11637
				37: 'Apo-Summicron-M 90mm f/2 ASPH.', // 11884/11885
				38: 'Elmarit-M 90mm f/2.8',           // 11807/11808, version (II) in camera menu
				39: 'Macro-Elmar-M 90mm f/4',         // 11633/11634
				'39 0': 'Tele-Elmar-M 135mm f/4 (II)',// 11861
				40: 'Macro-Adapter M',                // 14409
				'41 3': 'Apo-Summicron-M 50mm f/2 Asph', //16
				42: 'Tri-Elmar-M 28-35-50mm f/4 ASPH.',// 11625
				'42 1': 'Tri-Elmar-M 28-35-50mm f/4 ASPH. (at 28mm)',
				'42 2': 'Tri-Elmar-M 28-35-50mm f/4 ASPH. (at 35mm)',
				'42 3': 'Tri-Elmar-M 28-35-50mm f/4 ASPH. (at 50mm)',
				43: 'Summarit-M 35mm f/2.5',          // ? (ref PH)
				44: 'Summarit-M 50mm f/2.5',          // ? (ref PH)
				45: 'Summarit-M 75mm f/2.5',          // ? (ref PH)
				46: 'Summarit-M 90mm f/2.5',          // ?
				47: 'Summilux-M 21mm f/1.4 ASPH.',    // ? (ref 11)
				48: 'Summilux-M 24mm f/1.4 ASPH.',    // ? (ref 11)
				49: 'Noctilux-M 50mm f/0.95 ASPH.',   // ? (ref 11)
				50: 'Elmar-M 24mm f/3.8 ASPH.',       // ? (ref 11)
				51: 'Super-Elmar-M 21mm f/3.4 Asph',  // ? (ref 16, frameSelectorBits=1)
				'51 2': 'Super-Elmar-M 14mm f/3.8 Asph', // ? (ref 16)
				52: 'Super-Elmar-M 18mm f/3.8 ASPH.', // ? (ref PH/11)
				'53 2': 'Apo-Telyt-M 135mm f/3.4', //16
			};
			var lensID = (n >> 2);
			var specLensID = lensID.toString().concat( ' ', (n & 0x3)) 
			if (specLensID in lenses) return { value:lenses[specLensID], _val:n };
			return (lensID in lenses) ? { value:lenses[lensID], _val:n } : { value:n, _val:n };
		},
		ExternalSensorBrightnessValue: function(n){
			if( typeof n !== 'number' ) return { value:n, _val:n };
			return { value:n.toFixed(2), _val:n };
		},
		MeasuredLV: function(n){
			if( typeof n !== 'number' ) return { value:n, _val:n };
			return { value:n.toFixed(2), _val:n };
		},
		ApproximateFNumber: function(n){
			if( typeof n !== 'number' ) return { value:n, _val:n };
			return { value:n.toFixed(1), _val:n };
		},
		CameraTemperature: function(n){
			if(typeof n === 'undefined' || n === 0) return { value: 'Auto', _val: 0 };
			return { value: n.toString().concat(' C'), _val: n }	
		},
		ColorTemperature: function(n){
			if ( typeof n !== 'number' ) return { value: 'n/a', _val:n }
			return { value: n.toString().concat(' Kelvin'), _val:n };
		},
		UV_IRFilterCorrection: {
			0: 'Not Active',
			1: 'Active',
		}
	}
};