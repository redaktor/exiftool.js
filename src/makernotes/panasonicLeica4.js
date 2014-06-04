// exiftool.js/makernotes/panasonicLeica2

// summary:
//    Makernotes for the following Makes :
//    'LEICA' (M9)
//    all infos are in subIFDs

// description:
//    ported from http://www.sno.phy.queensu.ca/~phil/exiftool/TagNames/Panasonic.html
//    (contains Leica tags)

// returns:
//    a makernote object for exiftool.js and redaktor/meta

exports.info = {
	
	DefaultHeaderSize : 8,
	
	tags : {
		0x3000: 'Subdir3000',
		0x3100: 'Subdir3100',
		0x3400: 'Subdir3400',
		0x3900: 'Subdir3900'
	},
	
	ref: {
		/* TODO
		# Leica M9 SubDirectory tags (ref PH)
		%Image::ExifTool::Panasonic::Subdir = (
			WRITE_PROC => \&Image::ExifTool::Exif::WriteExif,
			CHECK_PROC => \&Image::ExifTool::Exif::CheckExif,
			GROUPS => { 0 => 'MakerNotes', 1 => 'Leica', 2 => 'Camera' },
			TAG_PREFIX => 'Leica_Subdir',
			WRITABLE => 1,
			# 0x3001 - normally 0 but value of 2 when manual coding is used
			#          with a coded lens (but only tested with Elmar-M 50mm f/2.8) - PH
			0x300a => {
				Name => 'Contrast',
				Writable => 'int32u',
				PrintConv => {
					0 => 'Low',
					1 => 'Medium Low',
					2 => 'Normal',
					3 => 'Medium High',
					4 => 'High',
				},
			},
			0x300b => {
				Name => 'Sharpening',
				Writable => 'int32u',
				PrintConv => {
					0 => 'Off',
					1 => 'Low',
					2 => 'Normal',
					3 => 'Medium High',
					4 => 'High',
				},
			},
			0x300d => {
				Name => 'Saturation',
				Writable => 'int32u',
				PrintConv => {
					0 => 'Low',
					1 => 'Medium Low',
					2 => 'Normal',
					3 => 'Medium High',
					4 => 'High',
					5 => 'Black & White',
					6 => 'Vintage B&W',
				},
			},
			# 0x3032 - some sort of RGB coefficients? (zeros unless Kelvin WB, but same for all Color Temps)
			0x3033 => {
				Name => 'WhiteBalance',
				Writable => 'int32u',
				PrintConv => { #13
					0 => 'Auto',
					1 => 'Tungsten',
					2 => 'Fluorescent',
					3 => 'Daylight Fluorescent',
					4 => 'Daylight',
					5 => 'Flash',
					6 => 'Cloudy',
					7 => 'Shade',
					8 => 'Manual',
					9 => 'Kelvin',
				},
			},
			0x3034 => {
				Name => 'JPEGQuality',
				Writable => 'int32u',
				PrintConv => {
					94 => 'Basic',
					97 => 'Fine',
				},
			},
			# 0x3035 (int32u): -1 unless Manual WB (2 in my Manual sample)
			0x3036 => {
				Name => 'WB_RGBLevels',
				Writable => 'rational64u',
				Count => 3,
			},
			0x3038 => {
				Name => 'UserProfile', # (CameraProfile according to ref 14)
				Writable => 'string',
			},
			0x303a => {
				Name => 'JPEGSize',
				Writable => 'int32u',
				PrintConv => {
					0 => '5216x3472',
					1 => '3840x2592',
					2 => '2592x1728',
					3 => '1728x1152',
					4 => '1280x864',
				},
			},
			0x3103 => { #13 (valid for FW 1.116 and later)
				Name => 'SerialNumber',
				Writable => 'string',
			},
			# 0x3104 body-dependent string ("00012905000000") (not serial number)
			# 0x3105 body-dependent string ("00012905000000")
			# 0x3107 - body-dependent string ("4H205800116800") (not serial number)
			0x3109 => {
				Name => 'FirmwareVersion',
				Writable => 'string',
			},
			0x312a => { #14 (NC)
				Name => 'BaseISO',
				Writable => 'int32u',
			},
			0x312b => {
				Name => 'SensorWidth',
				Writable => 'int32u',
			},
			0x312c => {
				Name => 'SensorHeight',
				Writable => 'int32u',
			},
			0x312d => { #14 (NC)
				Name => 'SensorBitDepth',
				Writable => 'int32u',
			},
			0x3402 => { #PH/13
				Name => 'CameraTemperature',
				Writable => 'int32s',
				PrintConv => '"$val C"',
				PrintConvInv => '$val=~s/ ?C//; $val',
			},
			0x3405 => {
				Name => 'LensType',
				Writable => 'int32u',
				SeparateTable => 1,
				ValueConv => '($val >> 2) . " " . ($val & 0x3)',
				ValueConvInv => \&LensTypeConvInv,
				PrintConv => \%leicaLensTypes,
			},
			0x3406 => { #PH/13
				Name => 'ApproximateFNumber',
				Writable => 'rational64u',
				PrintConv => 'sprintf("%.1f", $val)',
				PrintConvInv => '$val',
			},
			0x3407 => { #14
				Name => 'MeasuredLV',
				Writable => 'int32s',
				Notes => 'imaging sensor or TTL exposure meter measurement',
				ValueConv => '$val / 1e5', #PH (NC)
				ValueConvInv => '$val * 1e5', #PH (NC)
				PrintConv => 'sprintf("%.2f", $val)',
				PrintConvInv => '$val',
			},
			0x3408 => { #14
				Name => 'ExternalSensorBrightnessValue',
				Writable => 'int32s',
				Notes => '"blue dot" measurement',
				ValueConv => '$val / 1e5', #PH (NC)
				ValueConvInv => '$val * 1e5', #PH (NC)
				PrintConv => 'sprintf("%.2f", $val)',
				PrintConvInv => '$val',
			},
			0x3901 => {
				Name => 'Data1',
				SubDirectory => { TagTable => 'Image::ExifTool::Panasonic::Data1' },
			},
			0x3902 => {
				Name => 'Data2',
				SubDirectory => { TagTable => 'Image::ExifTool::Panasonic::Data2' },
			},
			# 0x3903 - larger binary data block
			
			
			
			
			%Image::ExifTool::Panasonic::Data1 = (
				PROCESS_PROC => \&Image::ExifTool::ProcessBinaryData,
				WRITE_PROC => \&Image::ExifTool::WriteBinaryData,
				CHECK_PROC => \&Image::ExifTool::CheckBinaryData,
				GROUPS => { 0 => 'MakerNotes', 1 => 'Leica', 2 => 'Camera' },
				WRITABLE => 1,
				TAG_PREFIX => 'Leica_Data1',
				FIRST_ENTRY => 0,
				0x0016 => {
					Name => 'LensType',
					Writable => 'int32u',
					Priority => 0,
					SeparateTable => 1,
					ValueConv => '($val >> 2) . " " . ($val & 0x3)',
					ValueConvInv => \&LensTypeConvInv,
					PrintConv => \%leicaLensTypes,
				},
			);
			
			%Image::ExifTool::Panasonic::Data2 = (
				PROCESS_PROC => \&Image::ExifTool::ProcessBinaryData,
				GROUPS => { 0 => 'MakerNotes', 1 => 'Leica', 2 => 'Camera' },
				TAG_PREFIX => 'Leica_Data2',
				FIRST_ENTRY => 0,
		*/	
	}
};