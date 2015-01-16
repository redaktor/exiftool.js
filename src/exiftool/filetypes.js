// exiftool/filetypes
// EXPERIMENTAL (alpha, pre 0.1)

// summary:
//    A file identifier module 
//    Useful for #mime, #filetype, #formatinfo s, #typemanager s
//    The "which mime?" for exiftool.js

// description:
//    ! Except for "text" we use a COMBINATION of 
//    - the MAGIG NUMBER of the buffer beginning
//    - some REGEX for internal signatures
//    - the external signatures ( aka file EXTENSION )  
//    to decide !
//    http://en.wikipedia.org/wiki/Magic_number_(programming)#Magic_numbers_in_files :
//    we use reverse engineering and tested descriptors of PRONOM / DROID
//    http://www.nationalarchives.gov.uk/PRONOM/
//    reasons:
//    mapping only by extension is neither precise nor reliable
//    one extension can be used by any vendor and thus mean multiple MIME (e.g. AU from Audacity and AU from Sun)
//    file extensions can be changed by anything/anyone very easily

//    if the MAGIC NUMBER is not found we fallback to various methods:
//    a1) clientside : get mime from browser - TODO - IE ..., e.g. image/pjpeg if jpg is progressive
//    a2) node.js+linux : get mime from file command
//    b) if nothing works ;) check only file extension with warning

// returns:
//    object with mime type and file descriptions and PUID* for multiple infos about the file


// authors:
//    Sebastian Lasse, redaktor (@sl007 or api/@\redaktorcms.com)

/* NOTE : 
we put some files in image where the mime type begins with "application"
this is due to the fact that they could have metadata detected by .meta.image ...
marked as DUE TO CHANGE

file extensions are handled case insensitive and all uppercase in internal use

exports.info contains general info about files, structured by its mime type
it is derived by redaktor.meta.filetype which is "database driven" :
disadvantage: The PUID relates to a PRONOM identifier but the PRONOM files are static in /filetypes
using node.js you can run ./filetypesMake.js to rebuild/update them from the original source

* The PUID is verified by typeof PUID in exports.info
For performance reasons we try to use fixed length magic numbers at the beginning of the buffer/file.
We can "deepcheck", when we got a PRONOM identifier :
The PUID parameter determines the PRONOM identifier by one of the following 3 signatures
has exactly one match
	specs: 0
has one of the matches in the Array, where the match is determined by a regex on the buffer beginning
	specs: [	{ PUID: 0, regex: /.../, description:'OPTIONAL', mime:'OPTIONAL' }, ... ]
has one of the matches in the Array, where the match is determined by file extension
	specs: [	{ PUID: 0, extensions: [], description:'OPTIONAL', mime:'OPTIONAL' }, ... ]
has a complicated match - we must unfortunately read the whole file if we need a PUID ...
	PUID [0, 99, 100]
*/

// TODO
// signature Offset and PUIDrelated
// tmpFileinfo
// verifyText and Options [ like "performance" vs. "accuracy" ]
// recheck MS (wmv, wma, asf) and related weirdness: PRONOM 131, 132, 133 vs. 441
// recheck that REGEX LENGTH should never exceed 131072 bytes
// new H.265 video AND HEVC still pictures when assigned : it's cool http://people.mozilla.org/~josh/lossy_compressed_image_study_october_2013/
// ? object.maxlength for PUID if object

exports.info = { 
// NOTE FOR PRONOM REGEX: replacements
// * = (.+)
// { = .{


/* ************************************************************************************************************************ 
I M A G E
************************************************************************************************************************ */
image: {
	// JPEG
	// see hilarious http://stackoverflow.com/questions/5413022/is-the-2nd-and-3rd-byte-of-a-jpeg-image-always-the-app0-or-app1-marker
	_FFD8: { 
		params: {
			description: 'jpeg: JPEG File, App0 marker not recognized',
			extensions: ['JPG', 'JPEG', 'SPF', 'SPIF', 'SPIFF'],
			mime: 'image/jpeg',
			specifications: [
				{ text:'Specification for the JFIF file format', href:'http://www.w3.org/Graphics/JPEG/jfif3.pdf', type:'W3', format:'pdf' },
				{ text:'The JPEG compression specification', href:'http://www.w3.org/Graphics/JPEG/itu-t81.pdf', type:'W3', format:'pdf' },
				{ text:'Exchangeable image file format for digital still cameras', href:'http://home.jeita.or.jp/tsc/std-pdf/CP3451C.pdf', type:'vendor', format:'pdf' }
			], 
			references: [
				{ text:'JPEG JFIF W3 Info', href:'http://www.w3.org/Graphics/JPEG/', type:'W3', format:'html' },
				{ text:'JPEG.org', href:'http://www.jpeg.org/', type:'info', format:'html' },
				{ text:'JPEG Exif App markers', href:'http://www.sno.phy.queensu.ca/~phil/exiftool/TagNames/JPEG.html', type:'info', format:'html'}
			]
		},
		specs: [
		// , little-endian (Intel) (LSB first)
		// , big-endian (Motorola) (LSB last)
			{ 
				PUID: 112, 
				params: {
					description: 'jpeg: Still Picture Interchange Format (SPIF)', 
					endian: 'big',
					version: 1.00
				},
				regex: /^FFD8FFE8(.{2})53504946460001/, 
				regexCapture: [
					{ key: 'recordedSignature' }, 
					{ key: 'segmentLength', fn: function(h){ return { value:parseInt(h, 16), _val:h.toString() }; } }
				]
			}, 
			{ 
				PUID: 44, 
				params: {
					description: 'jpeg: JPEG File Interchange Format (JFIF)',
					extensions: ['JPG', 'JPEG'],
					endian: 'big',
					version: 1.02
				},
				regex: /^FFD8FFE0(.{2})4A464946000102/, 
				regexCapture: [
					{ key: 'recordedSignature' }, 
					{ key: 'segmentLength', fn: function(h){ return { value:parseInt(h, 16), _val:h.toString() }; } }
				] 					
			},
			{ 
				PUID: 43, 
				params: {
					description: 'jpeg: JPEG File Interchange Format (JFIF)',
					extensions: ['JPG', 'JPEG'],
					endian: 'big',
					version: 1.01
				}, 
				regex: /^FFD8FFE0(.{2})4A464946000101/, 
				regexCapture: [
					{ key: 'recordedSignature' }, 
					{ key: 'segmentLength', fn: function(h){ return { value:parseInt(h, 16), _val:h.toString() }; } }
				]
			},
			{ 
				PUID: 42, 
				params: {
					description: 'jpeg: JPEG File Interchange Format (JFIF)',
					extensions: ['JPG', 'JPEG'],
					endian: 'big',
					version: 1.00
				},
				regex: /^FFD8FFE0(.{2})4A464946000100/, 
				regexCapture: [
					{ key: 'recordedSignature' }, 
					{ key: 'segmentLength', fn: function(h){ return { value:parseInt(h, 16), _val:h.toString() }; } }
				]
			}, 			
			{ 
				PUID: 41, 
				xPUID: 398,
				params: {
					description: 'jpeg: JPEG Exchangeable Image File Format (Exif)',
					extensions: ['JPG', 'JPEG'],
					endian: 'little',
					version: 2.0
				},
				regex: /^FFD8FFE1(.{2})45786966000049492A00(.+)009007000400000030323030/, 
				regexCapture: [
					{ key: 'recordedSignature' }, 
					{ key: 'segmentLength', fn: function(h){ return { value:parseInt(h, 16), _val:h.toString() }; } }
				]
			}, 
			{ 
				PUID: 41, 
				xPUID: 398, 
				params: {
					description: 'jpeg: JPEG Exchangeable Image File Format (Exif)',
					extensions: ['JPG', 'JPEG'],
					endian: 'big',
					version: 2.0
				},
				regex: /^FFD8FFE1(.{2})4578696600004D4D002A(.+)900000070000000430323030/, 
				regexCapture: [
					{ key: 'recordedSignature' }, 
					{ key: 'segmentLength', fn: function(h){ return { value:parseInt(h, 16), _val:h.toString() }; } }
				]
			},  			
			{ 
				PUID: 41, 
				xPUID: 390,
				params: {
					description: 'jpeg: JPEG Exchangeable Image File Format (Exif)',
					extensions: ['JPG', 'JPEG'],
					endian: 'little',
					version: 2.1
				},
				regex: /^FFD8FFE1(.{2})45786966000049492A00(.+)009007000400000030323130/, 
				regexCapture: [
					{ key: 'recordedSignature' }, 
					{ key: 'segmentLength', fn: function(h){ return { value:parseInt(h, 16), _val:h.toString() }; } }
				]
			}, 
			{ 
				PUID: 41, 
				xPUID: 390, 
				params: {
					description: 'jpeg: JPEG Exchangeable Image File Format (Exif)',
					extensions: ['JPG', 'JPEG'],
					endian: 'big',
					version: 2.1,
				},
				regex: /^FFD8FFE1(.{2})4578696600004D4D002A(.+)900000070000000430323130/, 
				regexCapture: [
					{ key: 'recordedSignature' }, 
					{ key: 'segmentLength', fn: function(h){ return { value:parseInt(h, 16), _val:h.toString() }; } }
				]
			}, 			
			{ 
				PUID: 41, 
				xPUID: 391,
				params: {
					description: 'jpeg: JPEG Exchangeable Image File Format (Exif)',
					extensions: ['JPG', 'JPEG'],
					endian: 'little',
					version: 2.2,
				},
				regex: /^FFD8FFE1(.{2})45786966000049492A00(.+)009007000400000030323230/, 
				regexCapture: [
					{ key: 'recordedSignature' }, 
					{ key: 'segmentLength', fn: function(h){ return { value:parseInt(h, 16), _val:h.toString() }; } }
				]
			}, 
			{ 
				PUID: 41, 
				xPUID: 391, 
				params: {
					description: 'jpeg: JPEG Exchangeable Image File Format (Exif)',
					extensions: ['JPG', 'JPEG'],
					endian: 'big',
					version: 2.2,
				},
				regex: /^FFD8FFE1(.{2})4578696600004D4D002A(.+)900000070000000430323230/, 
				regexCapture: [
					{ key: 'recordedSignature' }, 
					{ key: 'segmentLength', fn: function(h){ return { value:parseInt(h, 16), _val:h.toString() }; } }
				]
			}, 
			// TODO - specific JPEG (all begin with FFD8FF, map them to PUID 41)
			{ 
				PUID: 41, 
				params: {
					description: 'jpeg: JPEG Image File, Adobe JPEG, Photoshop CMYK buffer', 
					extensions: ['JPG', 'JPEG'],
					endian: 'big' 
				},
				regex: /^FFD8FFED/, 
				regexCapture: [ { key: 'recordedSignature' } ]
			}, 
			{ 
				PUID: 41, 
				params: {
					description: 'jpeg: JPEG Image File, Canon JPEG, Canon EOS-1D', 
					extensions: ['JPG', 'JPEG'],
					endian: 'big' 
				},
				regex: /^FFD8FFE2/, 
				regexCapture: [ { key: 'recordedSignature' } ],
			}, 
			{ 
				PUID: 41, 
				params: {
					description: 'jpeg: JPEG Image File, Samsung JPEG, e.g. Samsung D500', 
					extensions: ['JPG', 'JPEG'],
					endian: 'big' 
				},
				regex: /^FFD8FFE3/, 
				regexCapture: [ { key: 'recordedSignature' } ], 
			}, 
			{ 
				PUID: 41, 
				params: {
					description: 'jpeg: JPEG Image File, Samsung JPEG, e.g. Samsung D807', 
					extensions: ['JPG', 'JPEG'],
					endian: 'big' 
				},
				regex: /^FFD8FFDB/, 
				regexCapture: [ { key: 'recordedSignature' } ],
			}
		]
	}, 
	
	// JPEG 2000
	_0000000C6A5020200D0A870A: { 
		params: {
			description: 'jp2: JPEG 2000',
			extensions: ['JP2', 'JPX', 'JPF', 'JPG', 'JPEG'],
			mime: 'image/jpx',
			endian: 'big'
		},
		specs: [
			// seperation from JPG video [ part 3 ]
			// http://www.jpeg.org/jpeg2000
			{ 
				PUID: 151,
				params: {
					description: 'jp2: JPEG 2000', 
					extensions: ['JPX', 'JPF'],
					mime: 'image/jpx',
					endian: 'big',
					type: 'part 2 (JPX)'
				}, 
				regex: /^0000000C6A5020200D0A870A.{4}667479706A7078/,
				regexCapture: [ { key: 'recordedSignature' } ]
			},
			{ 
				xPUID: 392, 
				params: {
					description: 'jp2: JPEG 2000',
					extensions: ['JP2', 'JPF'],
					mime: 'image/jp2',
					endian: 'big',
					type: 'part 1 (JP2)'
				}, 
				regex: /^0000000C6A5020200D0A870A.{4}667479706A7032/,
				regexCapture: [ { key: 'recordedSignature' } ]
			},
			{
				PUID: 151,
				params: {
					description: 'jp2: JPEG 2000',
					extensions: ['JPM', 'JPF'],
					mime: 'image/jpm',
					endian: 'big',
					type: 'part 6 (JPM), document imaging, for pre-press and fax-like applications, etc.'
				}, 
				regex: /^0000000C6A5020200D0A87A6/,
				regexCapture: [ { key: 'recordedSignature' } ]
			}
		]
	},
	
	// PNG
	_89504E470D0A1A0A: { 
		params: {
			description: 'png: PNG image',
			extensions: ['PNG'],
			mime: 'image/png', 
			endian: 'big'
		},
		specs: [
			// seperation from JPG video [ part 3 ]
			// http://www.jpeg.org/jpeg2000
			{ 
				PUID: 13, 
				params: { 
					endian: 'big',
					version: 1.2 
				},
				regex: /^89504E470D0A1A0A0000000D49484452(.+)69545874/,
				regexCapture: [ { key: 'recordedSignature' } ]
			},
			{ 
				PUID: 12, 
				params: { 
					endian: 'big',
					version: 1.1 
				},
				regex: /^89504E470D0A1A0A0000000D49484452(.+)69434350/,
				regexCapture: [ { key: 'recordedSignature' } ]
			},
			{
				PUID: 13, 
				params: { 
					endian: 'big',
					version: 1.0 
				},
				regex: /^89504E470D0A1A0A0000000D49484452/,
				regexCapture: [ { key: 'recordedSignature' } ]
			}
		]
	},
	
	// Canon raw
	_49492A001000000043520200: { 
		params: {
			description: 'raw: CANON EOS Raw (CR2) raw image',
			extensions: ['CR2'],
			mime: 'image/x-canon-cr2',
			endian: 'little',
			version: 2.0
		},
		specs: 592,
		priority: true
	},
	_49491A0000004845415043434452: { 
		params: {
			description: 'raw: CANON Raw (CRW) raw image',
			extensions: ['CRW'],
			mime: 'image/x-canon-crw',
			endian: 'little',
			version: 1.0
		},
		specs: 593,
		priority: true 
	},
	
	
	
	/* TIFF based files */
	// many RAW formats are TIFF based
	// and as so are DNG and TIF ...
	
	// big endian based tiff
	_4D4D002A: { 
		params: {
			description: 'tif: Tiff based image / Raw image',
			extensions: ['TIFF', 'TIF', 'GEOTIFF', 'NEF', 'NRW', 'ERF', 'DNG'],
			mime: 'image/tiff',
			endian: 'big'
		},	
		specs: [
			// Nikon raw
			{ 
				PUID: 202, // is a stub, no internalSignature
				params: {
					description: 'raw: Nikon Electronic Format (NEF) raw image', 
					extensions: ['NEF'],
					mime: 'image/x-nikon-nef',
					type: 'NEF Standard'
				}
			},
			{ 
				PUID: 202, // is a stub, no internalSignature
				params: {
					description: 'raw: NIKON Raw (NRW) raw image', 
					extensions: ['NRW'],
					mime: 'image/x-nikon-nrw',
					type: 'NRW COOLPIX'
				}
			},
			// Epson Raw
			{ 
				PUID: 641,
				params: {
					description: 'raw: Epson Raw Format (ERF) raw image, based on DNG',
					extensions: ['ERF'],
					mime: 'image/x-epson-erf'
				},
				regex: /^4D4D002A.{304}4550534F4E204453432050696374757265005345494B4F204550534F4E20434F52502E00522D4431/
			},
			// DNG, adobe digital negative - TODO : v. 1.1 was missing in PRONOM, using 1.0
			{ 
				PUID: 438, 
				params: { 
					description: 'raw: Adobe Digital Negative 1.3 (used e.g. by Leica, Pentax, Ricoh)',
					extensions: ['DNG'],
					mime: 'image/x-adobe-dng',
					version: 1.3 
				},
				regex: /^4D4D002A.{0,4080}C61200010000000401030000/
			} ,
			{ 
				PUID: 437, 
				params: { 
					description: 'raw: Adobe Digital Negative 1.2 (used e.g. by Leica, Pentax, Ricoh)',
					extensions: ['DNG'],
					mime: 'image/x-adobe-dng',
					version: 1.2 
				},
				regex: /^4D4D002A.{0,4080}C61200010000000401020000/
			} ,
			{ 
				PUID: 436, 
				params: { 
					description: 'raw: Adobe Digital Negative 1.1 (used e.g. by Leica)',
					extensions: ['DNG'],
					mime: 'image/x-adobe-dng',
					version: 1.0,
					versionsIncluded: [1.1] 
				},
				regex: /^4D4D002A.{0,4080}C61200010000000401010000/ 
			},
			// tiff
			// Exif is near EOF in tiff ... see PRONOM http://goo.gl/ZggVqR
			{ 
				PUID: 154, 
				params: { 
					description: 'tiff: TIF format (Tagged Image File Format type 3), TIFF/EP',
					extensions: ['TIF', 'TIFF'],
					mime: 'image/tiff', 
					type: 'EP' 
				},
				regex: /^4D4D002A.{6,4080}921600010000000401000000/
			},
			{ 
				PUID: 155, 
				params: { 
					description: 'tiff: TIF format (Tagged Image File Format type 3), GeoTIFF',
					extensions: ['GEOTIFF', 'TIF', 'TIFF'],
					mime: 'image/tiff', 
					type: 'GEO' 
				},
				regex: /^4D4D002A.{6,4080}87AF0003000000/
			},
			{ 
				PUID: 353, 
				params: { 
					description: 'tiff: TIF format (Tagged Image File Format type 3)',
					extensions: ['TIF', 'TIFF'],
					mime: 'image/tiff', 
					type: 'Generic' 
				},
				regex: /^4D4D002A/
			}
		]
	},
	_4D4D002B: {
		params: {
			description: 'tiff: TIF format (Tagged Image File Format type 4) (aka BigTIFF), files (>4 GB)',
			extensions: ['TIF', 'TIFF'],
			mime: 'image/tiff', 
			endian: 'big'
		},
		specs: 153,	 	
	},
	
	// little endian based tiff
	_49492A00: { 
		params: {
			description: 'tif: Tiff based image / Raw image',
			extensions: ['TIFF', 'TIF', 'GEOTIFF', 'NEF', 'NRW', 'ERF', 'DNG'],
			mime: 'image/tiff',
			endian: 'little'
		},	
		specs: [
			// Nikon raw
			{ 
				PUID: 202, // is a stub, no internalSignature
				params: {
					description: 'raw: Nikon Electronic Format (NEF) raw image', 
					extensions: ['NEF'],
					mime: 'image/x-nikon-nef',
					type: 'NEF little endian, E5700'
				}
			},
			{ 
				PUID: 202, // is a stub, no internalSignature
				params: {
					description: 'raw: NIKON Raw (NRW) raw image', 
					extensions: ['NRW'],
					mime: 'image/x-nikon-nrw',
					type: 'NRW little endian, COOLPIX'
				}
			},
			// DNG, adobe digital negative - TODO : v. 1.1 was missing in PRONOM, using 1.0
			{ 
				PUID: 438, 
				params: { 
					description: 'raw: Adobe Digital Negative file (used e.g. by Leica, Pentax, Ricoh)',
					extensions: ['DNG'],
					mime: 'image/x-adobe-dng',
					endian: 'little',
					version: 1.3 
				},
				regex: /^49492A00.{0,4080}12C601000400000001030000/
			},
			{ 
				PUID: 437, 
				params: { 
					description: 'raw: Adobe Digital Negative file (used e.g. by Leica, Pentax, Ricoh)',
					extensions: ['DNG'],
					mime: 'image/x-adobe-dng',
					endian: 'little',
					version: 1.2 
				},
				regex: /^49492A00.{0,4080}12C601000400000001020000/
			},
			{ 
				PUID: 436, 
				params: { 
					description: 'raw: Adobe Digital Negative file (used e.g. by Leica, Pentax, Ricoh)',
					extensions: ['DNG'],
					mime: 'image/x-adobe-dng',
					endian: 'little',
					version: 1.0,
					versionsIncluded: [1.1] 
				},
				regex: /^49492A00.{0,4080}12C601000400000001010000/ 
			},
			// tiff
			// Exif is near EOF in tiff ... see PRONOM http://goo.gl/ZggVqR
			{ 
				PUID: 154, 
				params: { 
					description: 'tiff: TIF format (Tagged Image File Format type 2)',
					extensions: ['TIF', 'TIFF'],
					mime: 'image/tiff', 
					description: 'tiff: TIF format (Tagged Image File Format type 2), TIFF/EP',
					type: 'EP' 
				},
				regex: /^49492A00.{6,4080}169201000400000000000001/
			},
			{ 
				PUID: 155, 
				params: { 
					description: 'tiff: TIF format (Tagged Image File Format type 2)',
					extensions: ['TIF', 'TIFF'],
					mime: 'image/tiff', 
					description: 'tiff: TIF format (Tagged Image File Format type 2), GeoTIFF',
					type: 'GEO' 
				},
				regex: /^49492A00.{6,4080}AF870300/
			},
			{ 
				PUID: 353, 
				params: { 
					description: 'tiff: TIF format (Tagged Image File Format type 2)',
					extensions: ['TIF', 'TIFF'],
					mime: 'image/tiff', 
					description: 'tiff: TIF format (Tagged Image File Format type 2)',
					type: 'Generic' 
				},
				regex: /^49492A00/
			}
		]
	},
	_492049: {
		params: {
			description: 'tiff: TIF format (Tagged Image File Format type 1), deprecated',
			extensions: ['TIF', 'TIFF'],
			mime: 'image/tiff', 
			endian: 'little',
			type: 'Deprecated'
		},
		PUIDrelated: 153,
	},	
	/* TIFF based files end*/
	
	
	// Fujifilm Raw
	_46554A4946494C4D4343442D52415720: { 
		params: {
			description: 'raw: Fujifilm CCD (RAF) raw image',
			extensions: ['RAF'],
			mime: 'image/x-fujifilm-raf',
			endian: 'big'
		},
		specs: 642
	},
	// Olympus Raw
	_4D4D4F5208000000: { 
		params: {
			description: 'raw: Olympus Raw Format (ORF) raw image',
			extensions: ['ORF'],
			mime: 'image/x-olympus-orf',
			endian: 'big',
			type: 'ORF 2'
		}
		
	},
	_4949524F08000000: { 
		params: {
			description: 'raw: Olympus Raw Format (ORF) raw image',
			extensions: ['ORF'],
			mime: 'image/x-olympus-orf',
			endian: 'little',
			type: 'ORF IIRO'
		}
		
	},
	_4949525308000000: { 
		params: {
			description: 'raw: Olympus Raw Format (ORF) raw image',
			extensions: ['ORF'],
			mime: 'image/x-olympus-orf',
			endian: 'little',
			type: 'ORF IIRS'
		}
		
	}, 
	
	// Minolta Raw
	_004D524D: { 
		params: {
			description: 'raw: Minolta Raw (MRW) raw image',
			extensions: ['MRW', 'MDC'],
			mime: 'image/x-minolta-mrw',
			endian: 'big'
		},
		
	}, 
	__004D524D: {
		params: {
			description: 'raw: Sony Raw (ARW) raw image',
			extensions: ['ARW', 'SRF', 'SR2'],
			mime: 'image/x-sony-arw',
			endian: 'little'
		}
	},
	// TODO - check for 'SRF', 'SR2' !  \x05\x00\x00\x00AW1\x2E
	
	// Panasonic Raw
	_494955001800000088E774D8: { 
		params: {
			description: 'raw: Panasonic raw image (also Leica, Contax)',
			extensions: ['RAW', 'RW2'],
			mime: 'image/x-panasonic-raw',
			endian: 'little'
		}
	},
	
	
	/* TODO [ other raw files, samples: http://raw.fotosite.pl/ ]
	Hasselblad: 3FR, FFF
	Mamiya: MEF, MFW, IIQ
	Pentax: PEF
	Samsung: SRW
	Sigma: X3F												46 4F 56 62
	
	Sinar CaptureShop für Macintosh: CS1, CS4, CS16
	Kodak: DCR, DCS, KDC (für EasyShare P850, Z990), raw
	
	Corel Photopaint		CPT								CPT[789]?FILE	0
	Corel Draw				CDR								RIFF....CDR	0	~33
	Corel Binary Metafile 	CMX								CMX1	8	~33

	Freehand (MX) Project	FH10, FH11						\x1C\x01\x00\x00\x02\x00\x04\x1C\x01\x14\x00\x02\x00\x14\x1C\x01\x16\x00\x02\x00	0
	Freehand drawing (v3)	FH3, FH31						0
	Freehand drawing		FH9, FH8, FH7, FH5				AGD[1-4]	0
	*/
	
	
	// RIFF contained images (e.g. WEBP)
	_52494646: {
		params: {
			description: 'riff: Resource Interchange File Format (RIFF) contained Image file', 
			extensions: ['WEBP', 'CMX'], 		
			mime: 'image/webp' 
		},
		specs: [
			// WEBP - NOTE : proposal, not assigned by IANA as time of writing
			{ 
				PUID: 566, 
				params: {
					description: 'riff: webp file (Resource Interchange File Format), developed by google',
					extensions: ['WEBP'], 
					mime: 'image/webp',
					type: 'Lossy',
					regex: /^52494646.{4}5745425056503820/ 
				}
			},
			{ 
				PUID: 567, 
				params: {
					description: 'riff: webp file (Resource Interchange File Format), developed by google',
					extensions: ['WEBP'], 
					mime: 'image/webp',
					type: 'Lossless',
					regex: /^52494646.{4}574542505650384C/ 
				}
			},
			{ 
				PUID: 568, 
				params: {
					description: 'riff: webp file (Resource Interchange File Format), developed by google',
					extensions: ['WEBP'], 
					mime: 'image/webp',
					type: 'Extended',
					regex: /^52494646.{4}5745425056503858/ 
				}
			},
			// CMX (Corel)
			{ 
				PUID: 624, 
				params: {
					description: 'corel: Corel Presentation Exchange metadata',
					extensions: ['CMX'], 
					mime: 'image/x-cmx',
					regex: /^52494646.{4}50414C2064617461/ 
				}
			}
		]
	},
	
	// GIF
   	_474946383761: {
		params: {
			description: 'gif: Compuserve GIF, type 1 (1987)',
			extensions: ['GIF'], 
			mime: 'image/gif' 
		},
	 	specs: 3
	},
	_474946383961: {
		params: {
			description: 'gif: Compuserve GIF, type 2 (1989)', 
			extensions: ['GIF'], 
			mime: 'image/gif' 
		},
		specs: 4
	},
	
	// BMP
	_424D: {
		params: {
			description: 'bmp: Bitmap image', 
			extensions: ['BMP', 'BM', 'DIB'], 
			mime: 'image/bmp', 
			endian: 'little'
		},
		specs: [
			{ 
				PUID: 119, 
				params: {
					description:'bmp: Bitmap image',
					version: 5.0,
					type: 'Standard'
				},
				regex: /^424D.{4}00000000.{4}7C000000.{8}0100(01|04|08|10|18|20)00(00|01|02|03|04|05)00000000/   
			},
			{ 
				PUID: 118, 
				params: {
					description:'bmp: Bitmap image',
					version: 4.0,
					type: 'Standard'
				},
				regex: /^424D.{4}00000000.{4}6C000000.{8}0100(01|04|08|10|18|20)00(00|01|02|03)00000000/   
			},
			{ 
				PUID: 117, 
				params: {
					description:'bmp: Bitmap image',
					version: 3.0,
					type: 'NT, Standard'
				},
				regex: /^424D.{4}00000000.{4}28000000.{8}0100(10|20)0003000000/   
			},
			{ 
				PUID: 116, 
				params: {
					description:'bmp: Bitmap image',
					version: 3.0,
					type: 'Standard'
				},
				regex: /^424D.{4}00000000.{4}28000000.{8}0100(01|04|08|18)00(00|01|02)000000/   
			},
			{ 
				PUID: 115, 
				params: {
					description:'bmp: Bitmap image',
					version: 2.0,
					type: 'Standard'
				},
				regex: /^424D.{4}00000000.{4}0C000000.{4}0100(01|04|08|18)00/   
			},
			{ 
				PUID: 114, 
				params: {
					description:'bmp: Bitmap image, deprecated',
					extensions: ['BMP', 'DDB'], 
					version: 1.0,
					type: 'Standard'
				},
				regex: /^0000.{6}01(01|04|08)/   // TODO does not match because was device dependent
			},
			{ 
				xPUID: 270, 
				params: {
					description:'bmp: Bitmap image OS/2',
					extensions: ['BMP', 'BM'], 
					version: 2.0,
					type: 'OS/2, Native'
				},
				regex: /^424D.{12}(10|30|40)000000.{8}0100/   
			},
			{ 
				xPUID: 270, 
				params: {
					description:'bmp: Bitmap image OS/2',
					extensions: ['BMP', 'BM'], 
					version: 2.0,
					type: 'OS/2, Huffman 1D compression'
				},
				regex: /^424D.{12}28000000.{8}0100180004000000/   
			},
			{ 
				xPUID: 270, 
				params: {
					description:'bmp: Bitmap image OS/2',
					extensions: ['BMP', 'BM'], 
					version: 2.0,
					type: 'OS/2, 24-bit RLE compression'
				},
				regex: /^424D.{12}28000000.{8}0100010003000000/   
			}
		]
	},
	_53434D49: {
		params: {
			description: 'bmp: Ventura Bitmap',
			extensions: ['IMG'],
			mime: 'image/x-ventura' 
		},
		PUIDrelated: 115	 	
	},
	_504943540008: {
		params: {
			description: 'bmp: ChromaGraph Graphics Card Bitmap',
			extensions: ['IMG'],
			mime: 'image/x-chromagraph' 
		},
		PUIDrelated: 115
	},
	_5034: {
		params: {
			description: 'bmp: Portable Bitmap',
			extensions: ['PBM', 'PNM', 'PBMB'],
			mime: 'image/x-portable-bitmap' // TODO - should PNM and PBMB be 'image/x-portable-anymap' ?
		},
		specs: [
			// signature to weak ...
			{ 
				PUID: 409,
				params: {
					description:'bmp: Portable Bitmap',
					type: 'Binary (with comment)'
				},
				regex: /^5034(20|0D|0A).{0,2}23.{0,70}0A(30|31|32|33|34|35|36|37|38|39|20|0A|0D)/
			},
			{ 
				PUID: 409,
				params: {
					description:'bmp: Portable Bitmap',
					type: 'Binary (without comment)'
				},
				regex: /^5034(20|0D|0A)(30|31|32|33|34|35|36|37|38|39|20|0A|0D)/
			}
		]
	},
	_5031: {
		params: {
			description: 'bmp: Portable Bitmap',
			extensions: ['PBM'],
			mime: 'image/x-portable-bitmap' // TODO - should PNM and PBMB be 'image/x-portable-anymap' ?
		},
		specs: [
			{ 
				xPUID: 164,
				params: {
					description:'bmp: Portable Bitmap, ascii',
					type: 'ASCII'
				},
				regex: /^5031(20|09|0D0A|0A)/
			}
		]
	},
  	_23646566696E65: {
		params: {
			description: 'bmp: X-Windows Bitmap',
			extensions: ['XBM'],
			mime: 'image/x-xbitmap' 
		},
	 	specs: [
			{ 
				xPUID: 207,
				params: {
					description:'bmp: X11 Bitmap',
					type: 'X11'
				},
				regex: /^23646566696E6520.{1,30}5F776964746820.{1,16}23646566696E6520.{1,30}5F68656967687420.{1-300}73746174696320/
			},
			{ 
				xPUID: 299,
				params: {
					description:'bmp: X10 Bitmap',
					type: 'X10'
				},
				regex: /^23646566696E6520.{1,30}5F776964746820.{1,16}23646566696E6520.{1,30}5F68656967687420/
			}
		]
	},
	
	// PSD
	_38425053: {
		params: {
			description: 'psd: Photoshop image',
			extensions: ['PSD'],
			mime: 'image/vnd.adobe.photoshop' 
		},
		specs: [
			{ xPUID: 92 }
		]
	},
	
	// TGA
	_5452554556495349: {
		params: {
			description: 'tga: TGA file, Truevision',
			extensions: ['TGA'], 
			mime: 'image/x-tga',
			type: 'Truevision' 
		},
		specs: 402 // has only EOF signature
	},
	_4F4E2D5846494C45: {
		params: {
			description: 'tga: TGA file, ON X',
			extensions: ['TGA'], 
			mime: 'image/x-tga',
			type: 'ON X' 
		},
		specs: 402 // has only EOF signature
	},
	
    // MS specific
	_4949BC01: {
		params: {
			description: 'ms: MS Photo file',
			extensions: ['WDP', 'JXR'],
			mime: 'image/vnd.ms-photo'
		},
		specs: 590
	},
	_4D5357494D: {
		params: {
			description: 'ms: MS Document Imaging file, Windows Imaging Format',
			extensions: ['WIM', 'SWM'],
			mime: 'application/octet-stream' // non conform !?
		},
		specs: 614
	},
	_0A0501: {
		params: {
			description: 'zsoft: ZSOFT Paintbrush file',
			extensions: ['PCX'],
			mime: 'image/x-pcx',
			type: '5'  
		},
		specs: 90
	},
	_0A0401: {
		params: {
			description: 'zsoft: ZSOFT Paintbrush file',
			extensions: ['PCX'],
			mime: 'image/x-pcx' ,
			type: '4'  
		},
		specs: 89
	},
	_0A0301: {
		params: {
			description: 'zsoft: ZSOFT Paintbrush file',
			extensions: ['PCX'],
			mime: 'image/x-pcx',
			type: '3'   
		},
		specs: 88
	},
	_0A0201: {
		params: {
			description: 'zsoft: ZSOFT Paintbrush file',
			extensions: ['PCX'],
			mime: 'image/x-pcx',
			type: '2'   
		},
		specs: 87
	},
	_0A0101: {
		params: {
			description: 'zsoft: ZSOFT Paintbrush file',
			extensions: ['PCX'],
			mime: 'image/x-pcx', 
			type: '1'  
		},
		PUIDrelated: 86
	},
	_0A0001: {
		params: {
			description: 'zsoft: ZSOFT Paintbrush file',
			extensions: ['PCX'],
			mime: 'image/x-pcx',
			type: '0'  
		},
		specs: 86
	},
	
	// PGM
	_5035: {
		params: {
			description: 'pgm: Portable Graymap Graphic',
			extensions: ['PGM'],
			mime: 'image/x-portable-graymap' 
		},
		specs: 406
	},
	
	// HDR
	_233F52414449414E: {
		params: {
			description: 'hdr: Radiance High Dynamic Range image',
			extensions: ['HDR'],
			mime: 'image/x-hdr'
		},
		specs: 591 
	},
	
	// DPX (SMPTE/KODAK CINEO)
	_53445058: {
		params: {
			description: 'dpx: Digital Picture Exchange (DPX) image',
			extensions: ['DPX'],
			mime: 'image/x-dpx',
			type: 'SMPTE',
			endian: 'big'
		},
		specs: [
			{ 
				PUID: 541, 
				params: { version: 2.0 },
				regex: /^53445058.{4}56322E30/ 
			},
			{ 
				PUID: 193, 
				params: { version: 1.0 },
				regex: /^53445058.{4}56312E30/ 
			}
		]
	},
	_58504453: {
		params: {
			description: 'dpx: Digital Picture Exchange (DPX) image',
			extensions: ['DPX'],
			mime: 'image/x-dpx',
			type: 'SMPTE',
			endian: 'little'
		},
		specs: [
			{ 
				PUID: 541, 
				params: { version: 2.0 },
				regex: /^58504453.{4}56322E30/ 
			},
			{ 
				PUID: 193, 
				params: { version: 1.0 },
				regex: /^58504453.{4}56312E30/ 
			}
		]
	},
	_802A5FD7: {
		params: {
			description: 'dpx: Digital Picture Exchange (DPX) image, Kodak Cineon',
			extensions: ['CIN'],
			mime: 'image/x-dpx', 
			type: 'Kodak Cineon',
			endian: 'big'
		},
		
	},						

	// SID
	_6D736964: {
		params: {
			description: 'Multi-resolution Seamless Image Database (MrSID) Image Format',
			extensions: ['SID'],
			mime: 'image/x-mrsid-image' 
		},
		specs: 392
	},
	_23202449643A20: {
		params: {
			description: 'Multi-resolution Seamless Image Database (MrSID) Image Format',
			extensions: ['SID'],
			mime: 'image/x-mrsid-image' 
		},
		PUIDrelated: 392
	},
	
	// PM
	_5036: {
		params: {
			description: 'pmp: Portable Pixel Map, Binary',
			extensions: ['PM', 'XPM'], 
			mime: 'image/x-xpixmap',
			type: 'Binary'
		},
		specs: [
			{ 
				PUID: 408, 
				params: {
					description: 'pmp: Portable Pixel Map, Binary, X11',
					extensions: ['PM', 'XPM'], 
					mime: 'image/x-xpixmap', 
					type: 'X11'
				},
				regex: /^5036(20|0D|0A)(30|31|32|33|34|35|36|37|38|39|20|0A|0D)/ 
			},
			{ 
				PUID: 408, 
				params: {
					description: 'pmp: Portable Pixel Map, Binary, X11',
					extensions: ['PPM', 'PPMB'], 
					mime: 'image/x-portable-pixmap', 
					type: 'X11'
				},
				regex: /^5036(20|0D|0A)(30|31|32|33|34|35|36|37|38|39|20|0A|0D)/ 
			}
		]
	},
	_2F2A2058504D202A2F: {
		params: {
			description: 'pmp: Portable Pixel Map, Binary, X10',
			extensions: ['PM', 'XPM'], 
			mime: 'image/x-xpixmap', 
			type: 'X10'
		},
		specs: [
			{ xPUID: 208 }
		]
	},
	
	// TODO 0001000800(01|04)0002 	GEM Paint Image 	IMG 	x-fmt/159
	
	// AI adobe illustrator
	_255044462D312E: {
		params: {
			extensions: ['AI'],
			description: 'ps: Adobe Illustrator document',
			mime: 'application/postscript' 	
		},
		specs: [
			{ 
				PUID: 565, 
				params: { version: 16.0 },
				regex: /^255044462D312E35(.+)252150532D41646F62652D332E30.{128,1024}254149355F46696C65466F726D6174203132/ 
			},
			{ 
				PUID: 564, 
				params: { version: 15.0 },
				regex: /^255044462D312E35(.+)252150532D41646F62652D332E30.{128,1024}254149355F46696C65466F726D6174203131/ 
			},
			{ 
				PUID: 563, 
				params: { version: 14.0 },
				regex: /^255044462D312E35(.+)252150532D41646F62652D332E30.{128,1024}254149355F46696C65466F726D6174203130/ 
			},
			{ 
				PUID: 562, 
				params: { version: 13.0 },
				regex: /^255044462D312E35(.+)252150532D41646F62652D332E30.{128,1024}254149355F46696C65466F726D61742039/ 
			},
			{ 
				PUID: 561, 
				params: { version: 12.0 },
				regex: /^255044462D312E34(.+)252150532D41646F62652D332E30.{128,1024}254149355F46696C65466F726D61742038/ 
			},
			{ 
				PUID: 560, 
				params: { version: 11.0 },
				regex: /^255044462D312E34(.+)252150532D41646F62652D332E30.{128,1024}254149355F46696C65466F726D61742037/ 
			},
			{ 
				PUID: 559, 
				params: { version: 10.0 },
				regex: /^255044462D312E34(.+)252150532D41646F62652D332E30.{128,1024}254149355F46696C65466F726D61742036/ 
			},
			{ 
				PUID: 558, 
				params: { version: 9.0 },
				regex: /^255044462D312E(33|34)(.+)252150532D41646F62652D332E30.{128,1024}254149355F46696C65466F726D61742035/ 
			}
		]
	},
	_252150532D41646F62652D332E30: {
		params: {
			extensions: ['AI', 'AI8', 'EPS'],
			description: 'ps: Adobe Illustrator document',
			mime: 'application/postscript' 	
		},
		specs: [
			{ 
				PUID: 557, 
				params: { version: 8.0 },
				regex: /^252150532D41646F62652D332E30.{128,1024}254149355F46696C65466F726D61742034/ 
			},
			{ 
				PUID: 423, 
				params: { version: 7.0 },
				regex: /^252150532D41646F62652D332E30.{128,1024}254149355F46696C65466F726D61742033/ 
			},
			{ 
				PUID: 422, 
				params: { version: 6.0 },
				regex: /^252150532D41646F62652D332E30.{128,1024}254149355F46696C65466F726D61742032/ 
			},
			{ 
				PUID: 420, 
				params: { version: 5.0, versionsIncluded: [5.5] },
				regex: /^252150532D41646F62652D332E30.{128,1024}254149355F46696C65466F726D61742031/ 
			},
			{ 
				PUID: 419, 
				params: { version: 4.0 },
				regex: /^252150532D41646F62652D332E30.{1,128}252543726561746F723A/ 
			},
			{ 
				PUID: 418, 
				params: { version: 3.0, versionsIncluded: [3.1, 3.2] },
				regex: /^252150532D41646F62652D332E30.{16,512}2525446F63756D656E74/ 
			}
		]
	},
	_252150532D41646F62652D322E3020455053462D312E32: {
		params: {
			extensions: ['AI', 'AI8', 'EPS'],
			description: 'ps: Adobe Illustrator document, elder than v.3 / 88, deprecated',
			mime: 'application/postscript', 
			type: 'deprecated'	
		},
		specs: 417
	},
	
	// PDF
	_25504446: { 
		params: { 
			description: 'PDF file',
			extensions: [ 'PDF' ],
			mime: 'application/pdf' 
		},
		specs: [ 
			{
				PUID: 14,
				params: { type: 'PDF 1.0' },
				regex: '^255044462D312E30' 
			},
			{ 
				PUID:144,
				params: { type: 'PDF/X-1:1999' },
				regex: '^255044462D' 
			},
			{ 
				PUID:145,
				params: { type: 'PDF/X-1:2001' },
				regex: '^255044462D312E33' 
			},
			{ 
				PUID:146,
				params: { type: 'PDF/X-1a:2003' },
				regex: '^255044462D312E34' 
			},
			{ 
				PUID:147,
				params: { type: 'PDF/X-2:2003' },
				regex: '^255044462D312E34' 
			},
			{ 
				PUID:148,
				params: { type: 'PDF/X-3:2003' },
				regex: '^255044462D312E34' 
			},
			{ 
				PUID:15,
				params: { type: 'PDF 1.1' },
				regex: '^255044462D312E31' 
			},
			{ 
				PUID:157,
				params: { type: 'PDF/X-1a:2001' },
				regex: '^255044462D312E33' 
			},
			{ 
				PUID:158,
				params: { type: 'PDF/X-3:2002 (directory)' },
				regex: '^255044462D312E33' 
			},
			{ 
				PUID:158,
				params: { type: 'PDF/X-3:2002 (metadata)' },
				regex: '^255044462D312E33' 
			},
			{ 
				PUID:16,
				params: { type: 'PDF 1.2' },
				regex: '^255044462D312E32' 
			},
			{ 
				PUID:17,
				params: { type: 'PDF 1.3' },
				regex: '^255044462D312E33' 
			},
			{ 
				PUID:18,
				params: { type: 'PDF 1.4' },
				regex: '^255044462D312E34' 
			},
			{ 
				PUID:19,
				params: { type: 'PDF 1.5' },
				regex: '^255044462D312E35' 
			},
			{ 
				PUID:20,
				params: { type: 'PDF 1.6' },
				regex: '^255044462D312E36' 
			},
			{ 
				PUID:276,
				params: { type: 'PDF 1.7' },
				regex: '^255044462D312E37' 
			},
			{ 
				PUID:354,
				params: { type: 'Acrobat PDF/A 1b 1' },
				regex: '^255044462D312E(33|34|35|36|37)' 
			},
			{ 
				PUID:354,
				params: { type: 'Acrobat PDF/A 1b 2' },
				regex: '^255044462D312E(33|34|35|36|37)' 
			},
			{ 
				PUID:476,
				params: { type: 'PDF/A-2A' },
				regex: '^255044462D312E[30:37]' 
			},
			{ 
				PUID:477,
				params: { type: 'PDF/A-2B' },
				regex: '^255044462D312E[30:37]' 
			},
			{ 
				PUID:478,
				params: { type: 'PDF/A-2U' },
				regex: '^255044462D312E[30:37]' 
			},
			{ 
				PUID:479,
				params: { type: 'PDF/A-3A' },
				regex: '^255044462D312E[30:37]' 
			},
			{ 
				PUID:480,
				params: { type: 'PDF/A-3B' },
				regex: '^255044462D312E[30:37]' 
			},
			{ 
				PUID:481,
				params: { type: 'PDF/A-3U' },
				regex: '^255044462D312E[30:37]' 
			},
			{ 
				PUID:488,
				params: { type: 'PDF/X-4' },
				regex: '^255044462D312E[30:37]' 
			},
			{ 
				PUID:489,
				params: { type: 'PDF/X-4p' },
				regex: '^255044462D312E[30:37]' 
			},
			{ 
				PUID:490,
				params: { type: 'PDF/X-5g' },
				regex: '^255044462D312E[30:37]' 
			},
			{ 
				PUID:491,
				params: { type: 'PDF/X-5pg' },
				regex: '^255044462D312E[30:37]' 
			},
			{ 
				PUID:492,
				params: { type: 'PDF/X-5n' },
				regex: '^255044462D312E[30:37]' 
			},
			{ 
				PUID:493,
				params: { type: 'PDF/E-1' },
				regex: '^255044462D312E[30:37]' 
			},
			{ 
				PUID:95,
				params: { type: 'Acrobat PDF/A-1a' },
				regex: '^255044462D312E34'
			} 
		] 
	},
	
	// DWG (AutoCad)
	_41433130: {
		params: {
			description: 'dwg: Generic AutoCAD Drawing file', 
			extensions: ['DWG'], 
			mime: 'image/vnd.dwg' 
		},
		specs: [
			{ 
				PUID: 531, 
				params: { type: 'v. 2013-2014', version: 2014, versionsIncluded:[2013] },
				regex: /^414331303237/ 
			},
			{ 
				PUID: 434, 
				params: { type: 'v. 2010-2012', version: 2012, versionsIncluded:[2010] },
				regex: /^4143313032340000/ 
			},
			{ 
				PUID: 36, 
				params: { type: 'v. 2004-2005', version: 2005, versionsIncluded:[2004] },
				regex: /^414331303138/ 
			},
			{ 
				PUID: 35, 
				params: { type: 'v. 2000-2002', version: 2002, versionsIncluded:[2000] },
				regex: /^414331303135/ 
			},
			{ 
				PUID: 34, 
				params: { type: 'v. R14', version: 14 },
				regex: /^414331303134/ 
			},
			{ 
				PUID: 33, 
				params: { type: 'v. R13', version: 13 },
				regex: /^414331303132/ 
			},
			{ 
				PUID: 32, 
				params: { type: 'v. R11-12', version: 11, versionsIncluded:[12] },
				regex: /^414331303039/ 
			},
			{ 
				PUID: 31, 
				params: { type: 'v. R10', version: 10 },
				regex: /^414331303036/ 
			},
			{ 
				PUID: 30, 
				params: { type: 'v. R9', version: 9 },
				regex: /^414331303034/ 
			},
			{ 
				PUID: 29, 
				params: { version: 2.6 },
				regex: /^414331303033/ 
			},
			{ 
				PUID: 28, 
				params: { version: 2.5 },
				regex: /^414331303032/ 
			},
			{ 
				PUID: 27, 
				params: { version: 2.2 },
				regex: /^4143(322E3231|322E3232|31303031)/ 
			},
			{ 
				PUID: 26, 
				params: { version: 2.1 },
				regex: /^4143322E3130/ 
			},
			{ 
				PUID: 25, 
				params: { version: 2.0 },
				regex: /^4143312E3530/ 
			},
			{ 
				PUID: 24, 
				params: { version: 1.4 },
				regex: /^4143312E3430/ 
			},
			{ 
				PUID: 23, 
				params: { version: 1.3 },
				regex: /^4143312E33/ 
			},
			{ 
				PUID: 22, 
				params: { version: 1.2 },
				regex: /^4143312E32/ 
			},
			{ 
				PUID: 21, 
				params: { version: 1.0 },
				regex: /^4143312E31/ 
			}
		]
	},
	_53564631: {
		params: {
			description: 'dwg: Simple Vector Format (SVF)',
			extensions: ['SVF'],
			mime: 'image/vnd.dwg',
			version: 1 
		},
		
	},
	_53564632: {
		params: {
			description: 'dwg: Simple Vector Format (SVF)',
			extensions: ['SVF'],
			mime: 'image/vnd.dwg',
			version: 2 
		},
		
	},
	
	// DXF TODO
	
	/* DXF TODO - FIXME and correct
	! recent versions can basically be 30{1-2}53454354494F4E  ?
	*/
	_30: {
		params: {
			description: 'Drawing Interchange Format (ASCII)',
			extensions: ['DXF'], 
			mime: 'image/vnd.dxf'
		},
		specs: [
			{
				PUID: 532,
				params: { version: 2013, versionsIncluded: [2014] },
				regex: /^30.{1,2}53454354494F4E.{1,2}202032.{1,2}484541444552.{1}(.+)39.{1,2}2441434144564552.{1,2}202031.{1,2}414331303237.{1}(.+)30.{1,2}454E44534543/
			},
			{
				PUID: 435,
				params: { version: 2010, versionsIncluded: [2011, 2012] },
				regex: /^30.{1,2}53454354494F4E.{1,2}202032.{1,2}484541444552.{1,2}(.+)39.{1,2}2441434144564552.{1,2}202031.{1,2}414331303234/
			},
			{
				PUID: 433,
				params: { version: 2007, versionsIncluded: [2008, 2009] },
				regex: /^300D0A53454354494F4E0D0A2020320D0A4845414445520D0A/
			},
			{
				PUID: 79,
				params: { version: 2006, versionsIncluded: [2004, 2005] },
				regex: /^300D0A53454354494F4E0D0A2020320D0A4845414445520D0A(.+)390D0A24414341445645520D0A2020310D0A4143313031380D0A(.+)300D0A454E445345430D0A/
			},
			{
				PUID: 79,
				params: { version: 2006, versionsIncluded: [2004, 2005] },
				regex: /^300A53454354494F4E0A2020320A4845414445520A/
			},
			{
				PUID: 78,
				params: { version: 2000, versionsIncluded: [2001, 2002] },
				regex: /^300D0A53454354494F4E0D0A2020320D0A4845414445520D0A(.+)390D0A24414341445645520D0A2020310D0A4143313031350D0A(.+)300D0A454E445345430D0A/
			},
			{
				PUID: 78,
				params: { version: 2000, versionsIncluded: [2001, 2002] },
				regex: /^300A53454354494F4E0A2020320A4845414445520A(.+)390A24414341445645520A2020310A4143313031350A(.+)300A454E445345430A/
			},
			
			{
				PUID: 77,
				params: { version: 14 },
				regex: /^300D0A53454354494F4E0D0A2020320D0A4845414445520D0A(.+)390D0A24414341445645520D0A2020310D0A4143313031340D0A(.+)300D0A454E445345430D0A/
			},
			{
				PUID: 76,
				params: { version: 13 },
				regex: /^300D0A53454354494F4E0D0A2020320D0A4845414445520D0A(.+)390D0A24414341445645520D0A2020310D0A4143313031320D0A(.+)300D0A454E445345430D0A/
			},
			{
				PUID: 75,
				params: { version: 11, versionsIncluded: [12] },
				regex: /^30(0D0A|0A)53454354494F4E(0D0A|0A)202032(0D0A|0A)484541444552(0D0A|0A)(.+)39(0D0A|0A)2441434144564552(0D0A|0A)202031(0D0A|0A)414331303039(0D0A|0A)(.+)30(0D0A|0A)454E44534543(0D0A|0A)/
			}
			//	74 		R10 elder 		300D0A53454354494F4E0D0A2020320D0A4845414445520D0A
			
		]		
	},
	_4175746F4341442042696E617279204458460D0A1A00: {
		params: {
			description: 'Drawing Interchange Format (ASCII)', 
			extensions: ['DXF'], 
			mime: 'image/vnd.dxf' 
		},
		specs: [
			{
				PUID: 85,
				params: { version: 2004, versionsIncluded: [2005] },
				regex: /^4175746F4341442042696E617279204458460D0A1A00(.+)000053454354494F4E00020048454144455200(.+)0900244143414456455200010041433130313800(.+)0000454E4453454300/
			},
			{
				PUID: 84,
				params: { version: 2000, versionsIncluded: [2001, 2002] },
				regex: /^4175746F4341442042696E617279204458460D0A1A00(.+)000053454354494F4E00020048454144455200(.+)0900244143414456455200010041433130313500(.+)0000454E4453454300/
			},
			{
				PUID: 83,
				params: { version: 14 },
				regex: /^4175746F4341442042696E617279204458460D0A1A00(.+)000053454354494F4E00020048454144455200(.+)0900244143414456455200010041433130313400(.+)0000454E4453454300/
			},
			{
				PUID: 82,
				params: { version: 13 },
				regex: /^4175746F4341442042696E617279204458460D0A1A00(.+)0053454354494F4E000248454144455200(.+)092441434144564552000141433130313200(.+)00454E4453454300/
			},
			{
				PUID: 81,
				params: { version: 11, versionsIncluded: [12] },
				regex: /^4175746F4341442042696E617279204458460D0A1A00(.+)0053454354494F4E000248454144455200(.+)092441434144564552000141433130303900(.+)00454E4453454300/
			},
			{
				PUID: 80,
				params: { version: 10 },
				regex: /^4175746F4341442042696E617279204458460D0A1A00(.+)0053454354494F4E000248454144455200(.+)092441434144564552000141433130303600(.+)00454E4453454300/
			},
		] 
	},
	
	// Freehand FH
	_1C0100000200041C0114000200141C0116000200091C011E000A4672656548616E6431311C01280008: {
		params: {
			description: 'ps: Adobe/Macromedia Freehand 11 (MX) document',
			extensions: ['FH11', 'FH'],
	 		mime: 'image/x-freehand', 
			version: 11
		},
		specs: 400
	},	
	_1C0100000200041C0114000200141C0116000200081C011E000A4672656548616E643130: {
		params: {
			description: 'ps: Adobe/Macromedia Freehand 10 document',
			extensions: ['FH10', 'FH'],
	 		mime: 'image/x-freehand', 
			version: 10
		},
		specs: 547
	},
	_41474434: {
		params: {
			description: 'ps: Adobe/Macromedia Freehand 9 document',
			extensions: ['FH9', 'FH'],
	 		mime: 'image/x-freehand', 
			version: 9
		},
		specs: 546
	},
	_41474433: {
		params: {
			description: 'ps: Adobe/Macromedia Freehand 8 document',
			extensions: ['FH8', 'FH'],
	 		mime: 'image/x-freehand', 
			version: 8
		},
		specs: 545
	},
	_41474432: {
		params: {
			description: 'ps: Adobe/Macromedia Freehand 7 document',
			extensions: ['FH7', 'FH'],
	 		mime: 'image/x-freehand', 
			version: 7
		},
		specs: 544
	},
	
	// POSTSCRIPT
	_252150532D41646F62652D322E3020455053462D312E32: {
		params: {
			description: 'ps: Adobe Encapsulated PostScript Format',
			extensions: ['EPS', 'EPSF', 'PS'],
			mime: 'application/postscript', 
			version: 1.2
		},
		specs: 122
	},
	_252150532D41646F62652D322E3020455053462D322E30: {
		params: {
			description: 'ps: Adobe Encapsulated PostScript Format',
			extensions: ['EPS', 'EPSF', 'PS'],
			mime: 'application/postscript', 
			version: 2.0, 
			versionsIncluded: [3.0]
		},
		specs: 123
	},
	_252150532D41646F62652D332E31: {
		params: {
			description: 'ps: Adobe Encapsulated PostScript Format',
			extensions: ['EPS', 'EPSF', 'PS'],
			mime: 'application/postscript', 
			version: 3.0
		},
		specs: 124
	},
	_252150532D41646F62652D332E3120455053462D332E30: {
		params: {
			description: 'ps: Adobe Encapsulated PostScript Format',
			extensions: ['EPS', 'EPSF', 'PS'],
			mime: 'application/postscript', 
			version: 3.1
		},
		specs: 124
	},
	
	_252150532D41646F62652D332E31: {
		params: {
			description: 'ps: Generic PostScript Format, PostScript DSC 3.1',
			extensions: ['PS'],
			mime: 'application/postscript',
			version: 3.1
		},
		specs: 501
	},
	_252150532D41646F62652D332E30: {
		params: {
			description: 'ps: Generic PostScript Format, PostScript DSC 3.0',
			extensions: ['PS'],
			mime: 'application/postscript',
			version: 3.0
		},
		specs: [
			{ xPUID: 408 }
		]
	},
	_252150532D41646F62652D322E31: {
		params: {
			description: 'ps: Generic PostScript Format, PostScript DSC 2.1',
			extensions: ['PS'],
			mime: 'application/postscript',
			version: 2.1
		},
		specs: [
			{ xPUID: 407 }
		]
	},
	_252150532D41646F62652D322E30: {
		params: {
			description: 'ps: Generic PostScript Format, PostScript DSC 2.0',
			extensions: ['PS'],
			mime: 'application/postscript',
			version: 2.0
		},
		specs: [
			{ xPUID: 406 }
		]
	},
	_252150532D41646F62652D312E30: {
		params: {
			description: 'ps: Generic PostScript Format, PostScript DSC 1.0',
			extensions: ['PS'],
			mime: 'application/postscript',
			version: 1.0
		},
		specs: [
			{ xPUID: 91 }
		]
	},
	// SVG or X3D
	_3C3F786D6C2076657273696F6E3D22312E3022: {
		params: {
			description: 'xml: Scalable Vector Graphics',
			extensions: ['SVG', 'SVGZ', 'X3D', 'MSC', 'DXF'], 
			mime: 'image/svg+xml' 
		},
		specs: [			
			{ 
				PUID: 413, 
				params: {
					extensions: ['SVG', 'SVGZ'],
					version: 1.2
				},
				regex:/^3C3F786D6C2076657273696F6E3D22312E3022(.+)3C737667[0-512]76657273696F6E3D22312E3222/
			},
			{ 
				PUID: 92, 
				params: {
					extensions: ['SVG', 'SVGZ'],
					version: 1.1
				},
				regex:/^3C3F786D6C2076657273696F6E3D22312E3022(.+)3C737667(.+)76657273696F6E3D22312E3122/
			},
			{ 
				PUID: 91, 
				params: {
					extensions: ['SVG', 'SVGZ'],
					version: 1.0
				},
				regex:/^3C3F786D6C2076657273696F6E3D22312E3022(.+)3C737667(.+)7376673E/
			},
			
			{ 
				PUID: 582, 
				params: {
					description:'xml: ISO draft / X3D', 
					extensions: ['X3D'], 
					mime:'model/x3d+xml',
					version: 3.3
				},
				regex:'^3C3F786D6C2076657273696F6E3D22312E302220656E636F64696E673D225554462D38223F3E0A3C21444F435459504520583344205055424C4943202249534F2F2F57656233442F2F4454442058334420332E332F2F454E22' 
			},
			
			{ 
				PUID: 581, 
				params: {
					description:'xml: ISO draft / X3D', 
					extensions: ['X3D'], 
					mime:'model/x3d+xml',
					version: 3.2
				},
				regex:'^3C3F786D6C2076657273696F6E3D22312E302220656E636F64696E673D225554462D38223F3E0A3C21444F435459504520583344205055424C4943202249534F2F2F57656233442F2F4454442058334420332E322F2F454E22' 
			},
			{ 
				PUID: 580, 
				params: {
					description:'xml: ISO draft / X3D', 
					extensions: ['X3D'], 
					mime:'model/x3d+xml',
					version: 3.1
				},
				regex:'^3C3F786D6C2076657273696F6E3D22312E302220656E636F64696E673D225554462D38223F3E0A3C21444F435459504520583344205055424C4943202249534F2F2F57656233442F2F4454442058334420332E312F2F454E22' 
			},
			{ 
				PUID: 579, 
				params: {
					description:'xml: ISO draft / X3D', 
					extensions: ['X3D'], 
					mime:'model/x3d+xml',
					version: 3.0
				},
				regex:'^3C3F786D6C2076657273696F6E3D22312E302220656E636F64696E673D225554462D38223F3E0A3C21444F435459504520583344205055424C4943202249534F2F2F57656233442F2F4454442058334420332E302F2F454E22' 
			},
			
			// MSC
			{ 
				PUID: 475, 
				params: {
					description:'xml: MS Management Console Snap-in Control', 
					extensions: ['MSC'], 
					mime:'application/octet-stream'
				},
				regex:/^3C3F786D6C2076657273696F6E3D22312E30223F3E0D0A3C4D4D435F436F6E736F6C6546696C6520436F6E736F6C6556657273696F6E3D22/ 
			},
		]
	},
	
	// PICT
	_001102FF0C00: {
		signatureOffset: 522,
		params: {
			description: 'apple: Macintosh PICT Image / QuickDraw picture',
			extensions: ['PICT', 'PICT2', 'PCT', 'PIC'],
	 		mime: 'image/x-pict'
		},
		specs: 341 
	},
	
	// NTF (NITF)
	_4E49544630: {
		params: {
			description: 'ntf: National Imagery Transmission Format (NITF)',
			extensions: ['NTF', 'NITF'],
	 		mime: 'image/x-ntf' 
		},
		specs: [
			{ 
				PUID: 366, 
				params: { version: 2.1 },
				regex: /^4E49544630322E3130/ 
			},
			{ 
				PUID: 365, 
				params: { version: 2.0 },
				regex: /^4E49544630322E3030/ 
			},
			{ 
				PUID: 364, 
				params: { version: 1.0 },
				regex: /^4E49544630312E3130.{16}/ 
			}
		],
		
	},
	
	// DjVu
	_41542654464F524D: {
		params: {
			description: 'Caminova DjVu Format',
			extensions: ['DJVU', 'DJV'], 
			mime: 'image/vnd.djvu' 
		},
		specs: 255
	},	
	
	
// NO PUID, but PUID was requested by submitting
	// RGB
	_1DA110: {
		params: {
			description: 'rgb: Silicon Graphics RGB Bitmap',
			extensions: ['RGB', 'SGI'], 
	 		mime: 'image/x-rgb' 
		}
	},
	// FPX
	_D0CF11E0A1B11AE1: {
		params: {
			description: 'fpx: FlashPix', 
			extensions: ['FPX'], 
			mime: 'image/vnd.fpx' 
		}
	},
	_4550: {
		params: {
			description: 'ms: MS Document Imaging',
			extensions: ['MDI'],
			mime: 'image/vnd.ms-modi' 
		}
	},
	// ART aol
	_4A473E: {
		params: {
			description: 'aol: AOL art',
			extensions: ['ART'],
			mime: 'image/x-jg'
		}
	},
	_4A474E: {
		params: {
			description: 'aol: AOL art',
			extensions: ['ART'], 
	 		mime: 'image/x-jg' 
		}
	},
	// RAS (CMU)
	_59A66A95: {
		params: {
			description: 'raster: CMU raster',
	 		extensions: ['RAS', 'RAST'], 
	 		mime: 'image/x-cmu-raster' 
		}
	},
	_000000: {
		params: {
			description: 'X-Windows Screen Dump',
	 		extensions: ['XWD'],
	 		mime: 'image/x-xwindowdump' 
		},
		specs: [
			// signature to weak ...
			{ PUID: 401, regex: /^000000?00000007000000(00|01|02)000000/, description: 'X-Windows Screen Dump' }
		]
	},
	
	// TODO : signature/key, PUID and desc
	/*
	http://apps.nationalarchives.gov.uk/PRONOM/Format/proFormatSearch.aspx?status=detailReport&id=1083&strPageToDisplay=signatures
	PRONOM 301-306			CGM 	Computer Graphics Metafile
	4A4946393961			JIF		Jeff's Image Format ???
	76 2F 31 01				EXR		OpenEXR image
	5380F6344020			PIC		Softimage 3D Picture
	803E445343494D			J6I		Ricoh Camera Image File
	*/	
	
//image - TODO !!! NOTHING YET !!! Fallback with strong warning.
	G3: {
		params: {
			description: 'raster: G3 fax raster file',
			extensions: ['G3'],
			mime: 'image/g3fax'
		} 
	},
	IEF_IEFS: {
		params: {
			description: 'raster: Image Exchange Format, b/w Internet Fax',
			extensions: ['IEF', 'IEFS'], 
			mime: 'image/ief' 
		}
	},	
	UVI_UVVI_UVG_UVVG: {
		params: {
			description: 'DECE Graphic File',
			extensions: ['UVI', 'UVVI', 'UVG', 'UVVG'], 
			mime: 'image/vnd.dece.graphic'
		}
	},
	SUB: {
		params: {
			description: 'DVB Subtitle file',
			extensions: ['SUB'], 
			mime: 'image/vnd.dvb.subtitle' 
		}
	},
	FST: {
		params: {
			description: 'FastPictureViewer preview file',
			extensions: ['FST'], 
			mime: 'image/vnd.fst'  
		},
	},
	MMR: {
		params: {
			description: 'Fujixerox MMR',
			extensions: ['MMR'], 
			mime: 'image/vnd.fujixerox.edmics-mmr'
		}, 
	},
	RLC: {
		params: {
			description: 'Fujixerox RLC',
			extensions: ['RLC'], 
			mime: 'image/vnd.fujixerox.edmics-rlc' 
		},
	},
	XIF_XIFF: {
		params: {
			description: 'ScanSoft Pagis Text Recognition (OCR) file', 
			extensions: ['XIF'], 
			mime: 'image/vnd.xiff' 
		},
	}
},

/* ************************************************************************************************************************ 
V I D E O
************************************************************************************************************************ */
// TODO - Timelines (Final Cut, AVID)
video: {
	// Apple Lossless 
	_667479704D344120: {
		signatureOffset: 4, 
     	params: {
			description: 'Apple Lossless Audio Codec / MPEG-4 Media File',
			extensions: ['M4A', 'MP4'],
			mime: 'audio/mp4', // TODO - can be video as well ?
		},
		specs: 596
	}, 
	// 3GP
	_667479703367: {
		signatureOffset: 4, 
     	params: {
			description: '3GPP2 multimedia files',
			extensions: ['3GP', '3GPP'],
			mime: 'video/3gpp'
		},
     	specs: 357
	},  
	// MP4
	_66747970: {
		signatureOffset: 4,
		params: {
			description: 'MPEG-4 Media File', 
			extensions: ['MP4', 'MP4V', 'MPG4', 'M4V', 'M4A', 'F4V', 'F4A'],
			mime: 'video/mp4', // TODO - should we return 'video/x-m4v' for 'M4V', 'M4V', 'F4V' ?
		},
     	specs: 199
	},  
	// TODO
	H264: {
		params: {
			description: 'H264 video file',
			extensions: ['H264'],
	     	mime: 'video/h264'
		}
		// specs: 0
	},  
	H263: {
		params: {
			description: 'H263 video file',
			extensions: ['H263'],
	     	mime: 'video/h263'
		} 
		// specs: 0
	},  
	H261: {
     	params: {
			description: 'H261 video file',
			extensions: ['H261'],
	     	mime: 'video/h261'
		}
		// specs: 0
	},  
	
	// OGV
	_4F6767530002: {
		params: {
			description: 'Ogg Vorbis Codec compressed file',
			extensions: ['OGG', 'OGV', 'OGX'],
			mime: 'video/ogg' 
		},
     	specs: 203
	},  	
	// WEBM and MATROSKA
	_1A45DFA3: {
		params: {
			description: 'WEBM video file, developed by google or Matroska stream file',
			extensions: ['WEBM', 'WEBM', 'MKV', 'MKV', 'MK3D', 'MKA', 'MKS'],		
     		mime: 'video/webm' 
		},
     	specs:  [
			{ 
				PUID: 569, 
				params: {
					description: 'Matroska stream video file', 
					mime: 'video/x-matroska'
				},
				regex: /^1A45DFA3.{0,32}4282886D6174726F736B614287/
			},
			{ 
				PUID: 573, 
				params: {
					description: 'WEBM video file, developed by google', 
					mime: 'video/webm'
				},
				regex: /^1A45DFA3.{0,32}4282847765626D4287/
			}
		] 
	},
	
	// RIFF contained videos (e.g. AVI)
	_52494646: {
		params: {
			description: 'riff: RIFF contained Video file',
			extensions: ['AVI'],
	     	mime: 'video/x-msvideo' 
		},
     	specs: [ 
			// AVI
			{ 
				PUID: 5, 
				params: {
					description: 'Audio/Video Interleaved (AVI) Format video file'
				},
				regex:/^52494646.{4}41564920/ 
			}
		] 
	},  
	// MOV
	_736B6970: {
		signatureOffset: 4,
		params: {
			description: 'Apple QuickTime movie file',
			extensions: ['MOV'],
     		mime: 'video/quicktime',
			type: '6' 
		},
     	// specs: 0,
	},  
	_706E6F74: {
		signatureOffset: 4,
		params: {
			description: 'Apple QuickTime movie file',
			extensions: ['MOV'],
     		mime: 'video/quicktime',
			type: '5' 
		},
     	// specs: 0,
	},  
	_77696465: {
		signatureOffset: 4,
		params: {
			description: 'Apple QuickTime movie file',
			extensions: ['MOV'],
     		mime: 'video/quicktime',
			type: '4' 
		},
     	// specs: 0, 
	},  
	_6D646174: {
		signatureOffset: 4,
		params: {
			description: 'Apple QuickTime movie file',
			extensions: ['MOV'],
     		mime: 'video/quicktime',
			type: '3' 
		},
     	// specs: 0,
	},  
	_66726565: {
		signatureOffset: 4,
		params: {
			description: 'Apple QuickTime movie file',
			extensions: ['MOV'],
     		mime: 'video/quicktime',
			type: '2' 
		},
     	// specs: 0,
	},  
	_6D6F6F76: {
		signatureOffset: 4,
		params: {
			description: 'Apple QuickTime movie file',
			extensions: ['MOV'],
     		mime: 'video/quicktime',
			type: '1' 
		},
     	// specs: 0,
	}, 
	// MPG
	_000001B3: {
		params: {
			description: 'MPEG video file',
			extensions: ['MPG', 'MPG'],		
     		mime: 'video/mpeg' 
		},
		specs:  [
			{ 
				PUID: 640, 
				params: {
					description: 'MPEG-2 video file' 
				},		
				regex: /^000001B3.{64,128}000001B8/
			}
		]
	},  
	// FLV and related
	_464C5601: {
		params: {
			description: 'Flash video file',
			extensions: ['FLV'],
     		mime: 'video/x-flv' 
		},
     	// specs: 0,
     	
	},  
	_464C49420200: {
		params: {
			description: 'Flic video file',
			extensions: ['FLI'],
     		mime: 'video/x-fli' 
		},
     	specs: 299
	},  
	// ASF, WMV (MS)
	_3026B2758E66CF11A6D900AA0062CE6C: {
		params: {
			description: 'Windows Media Video 9 Advanced Profile (WVC1)',
			extensions: ['ASF'],
			mime: 'application/vnd.ms-asf'
		},
     	specs: [
			{ 
				PUID: 131, 
				params: {
					description:'Advanced Systems Format, Windows Media Audio|Video File', 
					extensions: ['ASF'] 
				}
			},
			{ 
				PUID: 441, 
				params: {
					description:'Windows Media Video 9 Advanced Profile (WVC1)',
					extensions: ['WMV'], 
					mime:'video/x-ms-wmv'
				}
			}
		]
	},  
	// VOB
	_000001BA: {
		params: {
			description: 'DVD video file',
			extensions: ['VOB'],
     		mime: 'video/x-ms-vob'
		},
     	specs: 425
	},  
	// R3D REDCAM
	_0000014452454431: {
		params: {
			description: 'REDCODE RAW (R3D) audio/video file, Red Digital Cinema Camera Company',
			extensions: ['R3D'],
     		mime: 'image/x-raw-red' 
		},
     	specs: 588
	},  
	// JPEG video
	_0000000C6A5020200D0A870A: {
		params: {
			description: 'Motion JPEG video file',
			extensions: ['MJ2', 'MJP2', 'JPM', 'JPGM'],
     		mime: 'video/mj2' 
		},
     	specs: [ 
			{ 
				PUID: 337, 
				regex:/^0000000C6A5020200D0A870A.{4}667479706D6A7032/, 
				description:'Motion JPEG video file' 
			} 
		]
	},  	
	JPGV: {
		params: {
			description: 'Motion JPEG video file',
			extensions: ['JPGV'],
     		mime: 'video/jpeg' 
		},
     	// specs: 0,
	},  
	// Vivo
	_0D0A56657273696F6E3A5669766F2F312E3030: {
		signatureOffset: 3, 
		params: {
			description: 'VivoActive video file',
			extensions: ['VIV'],
     		mime: 'video/vnd.vivo'
		},
     	specs: 499
	},  	
	// MNG
	_8A4D4E470D0A1A0A0000001C4D484452: {
		params: {
			description: 'Multiple-image Network Graphics video file',
			extensions: ['MNG'],
     		mime: 'video/x-mng' 
		},
     	specs: 528
	},  
	// WMX
	_3C61737820: {
		params: {
			description: 'Windows Media Metafile / Advanced Stream Redirector',
			extensions: ['WMX', 'WAX', 'WVX', 'ASX'],
     		mime: 'video/x-ms-wmx'
		},
     	specs: 584
	},  
	// DPX
	_53445058: {
		params: {
			description: 'dpx: Digital Picture Exchange (DPX) image',
			extensions: ['DPX'],
			mime: 'image/x-dpx',
			type: 'SMPTE',
			endian: 'big'
		},
		specs: [
			{ 
				PUID: 541, 
				params: { version: 2.0 },
				regex: /^53445058.{4}56322E30/ 
			},
			{ 
				PUID: 193, 
				params: { version: 1.0 },
				regex: /^53445058.{4}56312E30/ 
			}
		]
	},
	_58504453: {
		params: {
			description: 'dpx: Digital Picture Exchange (DPX) image',
			extensions: ['DPX'],
			mime: 'image/x-dpx',
			type: 'SMPTE',
			endian: 'little'
		},
		specs: [
			{ 
				PUID: 541, 
				params: { version: 2.0 },
				regex: /^58504453.{4}56322E30/ 
			},
			{ 
				PUID: 193, 
				params: { version: 1.0 },
				regex: /^58504453.{4}56312E30/ 
			}
		]
	},
	// MXF
	_060E2B34020501010D0102010102: {
		params: {
			description: 'Material Exchange Format file',
			extensions: ['MXF'],
     		mime: 'application/mxf' 
		},
     	specs: 200
	},  
	// M2T
	M2T: {
		params: {
			description: 'MPEG 2 Transport Stream',
			extensions: ['M2T', 'MP2T'],
			mime: 'video/MP2T'
		},
		specs: [ 
			{ 
				PUID: 585, 
				regex: /^47.{187}47.{187}47.{187}47.{187}47.{187}47.{187}47.{187}47/ 
			} 
		]
	},
	// RV
	RV: {
		params: {
			description: 'RealVideo Clip video file',
			extensions: ['RV'],
     		mime: 'video/vnd.rn-realvideo'
		},
     	specs: 204
	}, 
	
	//video - TODO !!! NOTHING YET !!! Fallback with strong warning.
	UVH_UVVH: {
		params: {
			description: 'DECE High Definition Video file',
			extensions: ['UVH', 'UVVH'],
			mime: 'video/vnd.dece.hd' 
		}
     	// specs: 0,
	},  
	UVM_UVVM: {
		params: {
			description: 'DECE Mobile Video file',
			extensions: ['UVM', 'UVVM'],
     		mime: 'video/vnd.dece.mobile' 
		},
     	// specs: 0,
	},  
	UVP_UVVP: {
		params: {
			description: 'DECE PD Video file',
			extensions: ['UVP', 'UVVP'],
     		mime: 'video/vnd.dece.pd' 
		}
     	// specs: 0,
	},  
	UVS_UVVS: {
		params: {
			description: 'DECE SD Video file',
			extensions: ['UVS', 'UVVS'],
     		mime: 'video/vnd.dece.sd' 
		}
     	// specs: 0,
     	
	},  
	UVV_UVVV: {
		params: {
			description: 'DECE Video file',
			extensions: ['UVV', 'UVVV'],
     		mime: 'video/vnd.dece.video' 
		}
     	// specs: 0,
     	
	},  
	UVU_UVVU: {
		params: {
			description: 'DECE MP4 Video file',
			extensions: ['UVU', 'UVVU'],
     		mime: 'video/vnd.uvvu.mp4' 
		}
     	// specs: 0,
	}, 
	DVB: {
		params: {
			description: 'Digital Video Broadcasting',
			extensions: ['DVB'],
			mime: 'video/vnd.dvb.file',
			spec: [ { title:'ETSI TS 102 833', url:'http://www.etsi.org/deliver/etsi_ts/102800_102899/102833/01.02.01_60/ts_102833v010201p.pdf' } ]
			
		}
     	// specs: 0,
	},  
	FVT: {
		params: {
			description: 'FAST Search & Transfer ASA file',
			extensions: ['FVT'],
     		mime: 'video/vnd.fvt'
		}
     	// specs: 0,
	},  
	MXU_M4U: {
		params: {
			description: 'MPEG Url file',
			extensions: ['MXU', 'M4U'],
     		mime: 'video/vnd.mpegurl' 
		}
     	// specs: 0,
	},  
	PYV: {
		params: {
			description: 'MS PlayReady Ecosystem Video file',
	     	extensions: ['PYV'],
    	 	mime: 'video/vnd.ms-playready.media.pyv'
		}
     	// specs: 0, 
	},   
	WM: {
		params: {
			description: 'MS Windows Media',
			extensions: ['WM'],
     		mime: 'video/x-ms-wm' 
		}
     	// specs: 0,
	},  
	MOVIE: {
		params: {
			description: 'SGI Movie video file',
			extensions: ['MOVIE'],
     		mime: 'video/x-sgi-movie' 
		}
     	// specs: 0,
	},
	SMV: {
		params: {
			description: 'Sigma Motion SMV video file',
			extensions: ['SMV'],
     		mime: 'video/x-smv' 
		}
     	// specs: 0,
	} 
},

/* ************************************************************************************************************************ 
A U D I O
************************************************************************************************************************ */
audio: {
	// Apple Lossless 
	_667479704D344120: {
		signatureOffset: 4, 
		params: {
			description: 'Apple Lossless Audio Codec',
			extensions: ['M4A', 'MP4'],
     		mime: 'audio/mp4',
		},
     	specs: 596
	}, 
	// 3GP
	_667479703367: { 
		signatureOffset: 4,
		params: {
			description: '3GPP2 multimedia files',
			extensions: ['3GP', '3GPP'],
     		mime: 'audio/3gpp'
		},
     	specs: 357
	},  
	// MP4
	_66747970: {
		signatureOffset: 4,
		params: {
			description: 'MPEG-4 Media File',
			extensions: ['MP4', 'M4A', 'F4A'],
     		mime: 'audio/mp4', // TODO - should we return 'audio/x-m4v' for 'M4A', 'F4A' ?
		},
     	specs: 199
	},  
	// MP3, MP2, MP1
	_494433: {
		params: {
			description: 'mp3: MP3 audio file, MPEG-1/2 Audio Layer 3 with ID3v2 Tag',
			extensions: ['MP3'],
			mime: 'audio/mpeg' 
		},
		specs: [
			{ 
				PUID: 134, 
				params: {
					description:'mp3: MP3 audio file, MPEG-1/2 Audio Layer 3 with ID3v2 Tag', 
					extensions: ['MP3']
				}
			},
			{ 
				PUID: 198, 
				params: {
					description:'mp2: MP2 audio file, MPEG-2 Audio Layer 2 with ID3v2 Tag', 
					extensions: ['MP2', 'MPW', 'MPA']
				}
			},
			{ 
				PUID: 347, 
				description:'mp1: MP1 audio file, MPEG-1 Audio Layer 1 with ID3v2 Tag',
				extensions: ['MP1'] 
			}
		]
	},
	_FFFA: {
		params: {
			description: 'mp3: MP3 audio file, MPEG-1 Audio Layer 3 without ID3v2 Tag (protected)',
			extensions: ['MP3'],		
			mime: 'audio/mpeg' 
		},
		specs: 134
	},
	_FFFB: {
		params: {
			description: 'mp3: MP3 audio file, MPEG-1 Audio Layer 3 without ID3v2 Tag',
			extensions: ['MP3'],
			mime: 'audio/mpeg' 
		},
		specs: 134
	},
	_FFFC: {
		params: { 
			description: 'mp2: MP2 audio file, MPEG-1 Audio Layer 2 without ID3v2 Tag (protected)',
			extensions: [ 'MP2', 'MPW', 'MPA' ],
			mime: 'audio/mpeg' 
		},
		specs: { PUID: 198 } 
	},
	_FFFD: {
		params: { 
			description: 'mp2: MP2 audio file, MPEG-1 Audio Layer 2 without ID3v2 Tag',
			extensions: [ 'MP2', 'MPW', 'MPA' ],
			mime: 'audio/mpeg' 
		},
		specs: { PUID: 198 } 
	},
	_FFFE: {
		params: { 
			description: 'mp1: MP1 audio file, MPEG-1 Audio Layer 1 without ID3v2 Tag (protected)',
			extensions: [ 'MP1' ],
			mime: 'audio/mpeg' 
		},
		specs: { PUID: 347 } 
	},
	_FFFF: {
		params: { 
			description: 'mp1: MP1 audio file, MPEG-1 Audio Layer 1 without ID3v2 Tag',
			extensions: [ 'MP1' ],
			mime: 'audio/mpeg' 
		},
		specs: { PUID: 347 } 
	},
	_FFF2: {
		params: { 
			description: 'mp3: MP3 audio file, MPEG-2 Audio Layer 3 without ID3v2 Tag (protected)',
			extensions: [ 'MP3' ],
			mime: 'audio/mpeg' 
		},
		specs: { PUID: 134 } 
	},
	_FFF3: {
		params: { 
			description: 'mp3: MP3 audio file, MPEG-2 Audio Layer 3 without ID3v2 Tag',
			extensions: [ 'MP3' ],
			mime: 'audio/mpeg' 
		},
		specs: { PUID: 134 } 
	},
	_FFF4: {
		params: { 
			description: 'mp2: MP2 audio file, MPEG-2 Audio Layer 2 without ID3v2 Tag (protected)',
			extensions: [ 'MP2', 'MPW', 'MPA' ],
			mime: 'audio/mpeg' 
		},
		specs: { PUID: 198 } 
	},
	_FFF5: {
		params: { 
			description: 'mp2: MP2 audio file, MPEG-2 Audio Layer 2 without ID3v2 Tag',
			extensions: [ 'MP2', 'MPW', 'MPA' ],
			mime: 'audio/mpeg' 
		},
		specs: { PUID: 198 } 
	},
	_FFF6: {
		params: { 
			description: 'mp1: MP1 audio file, MPEG-2 Audio Layer 1 without ID3v2 Tag (protected)',
			extensions: [ 'MP1' ],
			mime: 'audio/mpeg' 
		},
		specs: { PUID: 347 } 
	},
	_FFF7: {
		params: { 
			description: 'mp1: MP1 audio file, MPEG-2 Audio Layer 1 without ID3v2 Tag',
			extensions: [ 'MP1' ],
			mime: 'audio/mpeg' 
		},
		specs: { PUID: 347 } 
	},
	_FFF1: {
		params: { 
			description: 'aac: Advanced Audio Coding (AAC) Low Complexity (LC) audio file (MPEG 4)',
			extensions: [ 'AAC' ],
			mime: 'audio/x-aac' 
		} 
	},
	_FFF9: {
		params: { 
			description: 'aac: Advanced Audio Coding (AAC) Low Complexity (LC) audio file (MPEG 2)',
			extensions: [ 'AAC' ],
			mime: 'audio/x-aac' 
		} 
	},
	
	// OGG
	_4F6767530002: {
		params: { 
			description: 'Ogg Vorbis Codec compressed file',
			extensions: [ 'OGG', 'OGX' ],
			mime: 'audio/ogg' 
		},
		specs: { PUID: 203 } 
	},
	
	// CAF - Apple's hot new audio format
	_636166660001000064657363: {
		params: { 
			description: 'Apple Core Audio Format',
			extensions: [ 'CAF' ],
			mime: 'audio/x-caf' 
		},
		specs: { PUID: 416 } 
	},
	
	// MIDI
	/*
	stanford : http://www.ccarh.org/courses/253/handout/smf/
	The International MIDI Association : spec http://www.cs.cmu.edu/~music/cmsip/readings/Standard-MIDI-file-format-updated.pdf
	*/
	_4D546864: {
		params: { 
			description: 'MIDI sound file',
			extensions: [ 'MIDI' ],
			mime: 'audio/midi' 
		} 
	},
	
	// IFF and AIFF (8SVX was Electronic Arts for Commodore Amiga originally ;))
	_464F524D: {
		params: { 
			description: 'Audio Interchange File',
			extensions: [ 'AIFF', 'AIF', 'IFF', '8SVX' ],
			mime: 'audio/x-aiff' 
		},
		specs: 
			[ 
				{ 
					PUID: 414, 
					params: { description: 'iff: Audio Interchange (AIFF) File' },
					regex: /^464F524D.{4}41494646/ 
				},
				/* TODO - check
				All interchange file format files must start with either 'FORM', 'LIST', or 'CAT ' values. This is a generic signature that will identify Interchange Files which do not have a more complete and specific signature assigned to them within PRONOM.
				(464F524D|4C495354|43415420)00
				*/
				{ 
					PUID: 339, 
					params: { description: 'iff: Interchange File Format 8-bit Sampled Voice', mime: 'audio/8svx' },
					regex: /^464F524D.{4}3853565856484452/ 
				} 
			] 
	},
	
	// RIFF contained audio (e.g. WAVE)
	_52494646: {
		params: { 
			description: 'riff: Resource Interchange File Format (RIFF) contained Audio file',
			extensions: [ 'WAV', 'WAVE' ],
			mime: 'audio/x-wav' 
			/* TODO
			x-fmt/397
			x-fmt/389
			x-fmt/396
			*/
		},
		specs: [ 
			{ 
				PUID: 527,
				params: { 
					description: 'riff: Broadcast WAVE', 
					type: 'BWAVE PCM 2',
					version: 2.0
				},
				regex: /^52494646.{4}57415645(.+)62657874.{350}0200/ },
			
			{ 
				PUID: 527,
				params: { 
					description: 'riff: Broadcast WAVE', 
					type: 'BWAVE MPEG 2',
					version: 2.0
				},
				regex: /^52494646.{4}57415645(.+)62657874.{350}0200/ },
			
			{ 
				PUID: 527,
				params: { 
					description: 'riff: Broadcast WAVE', 
					type: 'PCM 2 variant',
					version: 2.0
				},
				regex: /^52494646.{4}57415645666D7420100000000100.{38}6661637404000000.{4}6D6578740C000000.{12}64617461/ },
			
			{ 
				PUID: 527,
				params: { 
					description: 'riff: Broadcast WAVE', 
					type: 'MPEG 2 variant',
					version: 2.0
				},
				regex: /^52494646.{4}57415645666D7420280000005000.{38}6661637404000000.{4}6D6578740C000000.{12}(.+)62657874.{350}0200/ },
			
			{ 
				PUID: 2,
				params: { 
					description: 'riff: Broadcast WAVE', 
					type: 'BWAVE PCM 1',
					version: 1.0
				},
				regex: /^52494646.{4}57415645(.+)62657874.{350}0100/ },
			
			{ 
				PUID: 2,
				params: { 
					description: 'riff: Broadcast WAVE', 
					type: 'BWAVE MPEG 1',
					version: 1.0
				},
				regex: /^52494646.{4}57415645(.+)62657874.{350}0100/ },
			
			{ 
				PUID: 2,
				params: { 
					description: 'riff: Broadcast WAVE', 
					type: 'PCM 1 variant',
					version: 1.0
				},
				regex: /^52494646.{4}57415645666D7420100000000100(.+)62657874.{350}0100/ },
			
			{ 
				PUID: 2,
				params: { 
					description: 'riff: Broadcast WAVE', 
					type: 'MPEG 1 variant',
					version: 1.0
				},
				regex: /^52494646.{4}57415645666D7420280000005000.{38}6661637404000000.{4}6D6578740C000000.{12}(.+)62657874.{350}0100/ },
			
			{ 
				PUID: 1,
				params: { 
					description: 'riff: Broadcast WAVE', 
					type: 'BWAVE PCM 0',
					version: 0
				},
				regex: /^52494646.{4}57415645(.+)62657874.{350}0000/ },
			
			{ 
				PUID: 1,
				params: { 
					description: 'riff: Broadcast WAVE', 
					type: 'BWAVE MPEG 0',
					version: 0
				},
				regex: /^52494646.{4}57415645(.+)62657874.{350}0000/ },
			
			{ 
				PUID: 1,
				params: { 
					description: 'riff: Broadcast WAVE', 
					type: 'PCM 0 variant',
					version: 0
				},
				regex: /^52494646.{4}57415645666D7420100000000100(.+)62657874.{350}0000/ },
			
			{ 
				PUID: 1,
				params: { 
					description: 'riff: Broadcast WAVE', 
					type: 'MPEG 0 variant',
					version: 0
				},
				regex: /^52494646.{4}57415645666D7420280000005000/ },
			
			{ 
				PUID: 6,
				params: { 
					description: 'riff: Waveform Audio', 
					type: 'Standard, MS'
				},
				regex: /^52494646.{4}57415645(.+)666D7420.{18,*}64617461/ },
			
			{ 
				PUID: 143,
				params: { 
					description: 'riff: Waveform Audio', 
					type: 'PCMWAVEFORMAT'
				},
				regex: /^52494646.{4}57415645666D7420.{4}FEFF/ },
			
			{ 
				PUID: 142,
				params: { 
					description: 'riff: Waveform Audio', 
					type: 'WAVEFORMATEX'
				},
				regex: /^52494646.{4}57415645666D7420((?!10).)/ },
			
			{ 
				PUID: 141,
				params: { 
					description: 'riff: Waveform Audio', 
					type: 'WAVEFORMATEXTENSIBLE'
				},
				regex: /^52494646.{4}57415645666D7420100000000100/ 
			} 
		] 
	},
	
	// ADP
	_D0CF11E0A1B11AE1: {
		params: { 
			description: 'Adaptive differential pulse-code modulation Audio File',
			extensions: [ 'ADX', 'ADP', 'WAV' ],
			mime: 'audio/adpcm' 
		} 
	},
	
	// ASF, WMA (MS) and related
	_3026B2758E66CF11A6D900AA0062CE6C: {
		params: { 
			description: 'Windows Media Video 9 Advanced Profile (WVC1)',
			extensions: [ 'ASF', 'WMA' ],
			mime: 'application/vnd.ms-asf' 
		},
		specs: [ 
			{ 
				PUID: 131,
				params: { 
					description: 'Windows Media Video 9 Advanced Profile (WVC1)',
					extensions: [ 'ASF' ] 
				}
			},
			{ 
				PUID: 441,
				params: { 
					description: 'Windows Media Audio|Video File',
					extensions: [ 'WMA' ],
					mime: 'audio/x-ms-wma' 
				}
			} 
		] 
	},
					
	// REAL and related
	_2E7261FD000400002E726134: {
		params: { 
			description: 'RealAudio streaming media file',
			extensions: [ 'RA' ],
			mime: 'audio/x-pn-realaudio' 
		},
		specs: { PUID: 404 } 
	},
	_2E524D4600000012: {
		params: { 
			description: 'RealAudio file',
			extensions: [ 'RA' ],
			mime: 'audio/x-pn-realaudio' 
		} 
	},
	_525349440002007C: {
		params: { 
			description: 'Real SID Audio file',
			extensions: [ 'SID', 'RA' ],
			mime: 'audio/prs.sid' 
		},
		specs: { PUID: 316 } 
	},
	_727473703A2F2F: {
		params: { 
			description: 'RealMedia metafile',
			extensions: [ 'RAM' ],
			mime: 'audio/x-pn-realaudio' 
		} 
	},
	RMP: {
		params: { 
			description: 'Real Audio Sound audio file',
			extensions: [ 'RMP' ],
			mime: 'audio/x-pn-realaudio-plugin' 
		} 
	},
	
	// WEBM and MATROSKA
	_1A45DFA3: {
		params: { 
			description: 'WEBM video file, developed by google or Matroska stream file',
			extensions: [ 'WEBM', 'WEBM', 'MKV', 'MKV', 'MK3D', 'MKA', 'MKS' ],
			mime: 'audio/webm' 
		},
		specs: [ 
			{ 
				PUID: 569,
				params: { 
					description: 'Matroska stream video file',
					mime: 'audio/x-matroska' 
				},
				regex: /^1A45DFA3.{0,32}4282886D6174726F736B614287/ 
			},
			{ 
				PUID: 573,
				params: { 
					description: 'WEBM video file, developed by google',
					mime: 'audio/webm' 
				},
				regex: /^1A45DFA3.{0,32}4282847765626D4287/ 
			} 
		]
	},
					
	// FLAC
	_664C614300000022: { 
		signatureOffset: [ 0, 4 ],
		 params: 
			{ description: 'FLAC (Free Lossless Audio Codec) audio file',
			extensions: [ 'FLAC' ],
			mime: 'audio/x-flac' 
		},
		specs: { PUID: 279 } 
	},
	
	// WAX
	_3C61737820: {
		params: { 
			description: 'Windows Media Metafile',
			extensions: [ 'WAX', 'WVX', 'ASX' ],
			mime: 'audio/x-ms-wax' 
		},
		specs: { PUID: 584 } 
	},
	_3C41535820: {
		params: { 
			description: 'Windows Media Metafile',
			extensions: [ 'WAX', 'WVX', 'ASX' ],
			mime: 'audio/x-ms-wax' 
		},
		specs: { PUID: 584 } 
	},
	
	// XM
	_457874656E646564204D6F64756C653A20: {
		params: { 
			description: 'Extended Module Audio File',
			extensions: [ 'XM' ],
			mime: 'audio/xm' 
		},
		specs: { PUID: 323 } 
	},
	
	// AU from Sun
	_2E736E64: {
		params: { 
			description: 'NeXT|Sun Microsystems audio file',
			extensions: [ 'AU' ],
			mime: 'audio/basic' 
		} 
	},
	// AU from Audacity
	_646E732E: {
		params: { 
			description: 'Audacity audio file',
			extensions: [ 'AU' ],
			mime: 'audio/basic' 
		} 
	},
	
	// DXR / Play SID
	_5053494400010076: {
		params: { 
			description: 'Play Sid Audio Version 1',
			extensions: [ 'DXR', 'PSID' ],
			mime: 'audio/x-sd2' 
		},
		specs: { PUID: 314 } 
	},
	_505349440001007C: {
		params: { 
			description: 'Play Sid Audio Version 2 (2.1 ?)',
			extensions: [ 'DXR', 'PSID' ],
			mime: 'audio/x-sd2' 
		},
		specs: { PUID: 315 } 
	},
	_505349440002007C: {
		params: { 
			description: 'Play Sid Audio Version 2 (2.2 ?)',
			extensions: [ 'DXR', 'PSID' ],
			mime: 'audio/x-sd2' 
		},
		specs: { PUID: 315 } 
	},
	
	// AMR
	_2321414D520A: {
		params: { 
			description: 'Adaptive Multi-Rate audio file',
			extensions: [ 'AMR' ],
			mime: 'audio/amr' 
		},
		specs: { PUID: 356 } 
	},
	
	// MSV Sony
	_4D535F564F4943450000005001020000534F4E5920434F52504F524154494F4E: {
		params: { 
			description: 'Sony Digital Voice File/Sony Memory Stick Voice File',
			extensions: [ 'MSV', 'DVF' ],
			mime: 'audio/msv' 
		},
		specs: { PUID: 472 } 
	},
	
	// R3D REDCAM
	_0000014452454431: {
		params: { 
			description: 'REDCODE RAW (R3D) audio/video file, Red Digital Cinema Camera Company',
			extensions: [ 'R3D' ],
			mime: 'image/x-raw-red' 
		},
		specs: { PUID: 588 } 
	},
	
	// MXF
	_060E2B34020501010D0102010102: {
		params: { 
			description: 'Material Exchange Format file',
			extensions: [ 'MXF' ],
			mime: 'application/mxf' 
		},
		specs: { PUID: 200 } 
	},
	
	// M2T
	M2T: {
		params: { 
			description: 'MPEG 2 Transport Stream',
			extensions: [ 'M2T', 'MP2T' ],
			mime: 'video/MP2T' 
		},
		specs: [ 
			{   
				PUID: 585,
				params: {}, 
				regex: /^47.{187}47.{187}47.{187}47.{187}47.{187}47.{187}47.{187}47/ 
			} 
		] 
	},
					
	//audio - TODO !!! NOTHING YET !!! Fallback with strong warning.
	SD2: {
		params: { 
			description: 'Sound Designer 2 audio file',
			extensions: [ 'SD2' ],
			mime: 'audio/s3m' 
		},
		specs: { PUID: 209 } 
	},
	M3U: {
		params: { 
			description: 'M3U (Multimedia Playlist) file',
			extensions: [ 'M3U' ],
			mime: 'audio/x-mpegurl' 
		} 
	},
	S3M: {
		params: { 
			description: 'Future Crew - MS DOS S3M audio file',
			extensions: [ 'S3M' ],
			mime: 'audio/s3m' 
		} 
	},
	SIL: {
		params: { 
			description: 'SILK LPC audio file',
			extensions: [ 'SIL' ],
			mime: 'audio/silk' 
		} 
	},
	UVA_UVVA: {
		params: { 
			description: 'DECE Audio file',
			extensions: [ 'UVA', 'UVVA' ],
			mime: 'audio/vnd.dece.audio' 
		} 
	},
	EOL: {
		params: { 
			description: 'Digital Winds Music audio file',
			extensions: [ 'EOL' ],
			mime: 'audio/vnd.digital-winds' 
		} 
	},
	DRA: {
		params: { 
			description: 'DRA Audio file',
			extensions: [ 'DRA' ],
			mime: 'audio/vnd.dra' 
		} 
	},
	DTS: {
		params: { 
			description: 'DTS Audio file',
			extensions: [ 'DTS' ],
			mime: 'audio/vnd.dts' 
		} 
	},
	DTSHD: {
		params: { 
			description: 'DTS High Definition Audio file',
			extensions: [ 'DTSHD' ],
			mime: 'audio/vnd.dts.hd' 
		} 
	},
	LVP: {
		params: { 
			description: 'Lucent Voice audio file',
			extensions: [ 'LVP' ],
			mime: 'audio/vnd.lucent.voice' 
		} 
	},
	PYA: {
		params: { 
			description: 'MS Playready Media audio file',
			extensions: [ 'PYA' ],
			mime: 'audio/vnd.ms-playready.media.pya' 
		} 
	},
	ECELP4800: {
		params: { 
			description: 'Nuera ECELP 4800 audio file',
			extensions: [ 'ECELP4800' ],
			mime: 'audio/vnd.nuera.ecelp4800' 
		} 
	},
	ECELP7470: {
		params: { 
			description: 'Nuera ECELP 7470 audio file',
			extensions: [ 'ECELP7470' ],
			mime: 'audio/vnd.nuera.ecelp7470' 
		} 
	},
	ECELP9600: {
		params: { 
			description: 'Nuera ECELP 9600 audio file',
			extensions: [ 'ECELP9600' ],
			mime: 'audio/vnd.nuera.ecelp9600' 
		} 
	},
	RIP: {
		params: { 
			description: 'Hit\'n\'Mix audio file',
			extensions: [ 'RIP' ],
			mime: 'audio/vnd.rip' 
		} 
	} 

},
/* ************************************************************************************************************************ 
W O R D  processed
************************************************************************************************************************ */
word: {
	// RTF
	_7B5C7274: {
		params: {
			description: 'Rich Text file (RTF)', 
			extensions: ['RTF', 'RTX', 'RT'], 		
			mime: 'application/rtf' 
		},
		specs:  [
			{ 
				PUID: 45, 
				params: {
					version: 1.0,
					versionsIncluded: [ 1.1, 1.2, 1.3, 1.4 ],
					type: 'v. 1.0-1.4'
				},
				regex: /^7B5C7274(66|6631)5C(616E7369|6D6163|7063|706361)/ 
			},
			{ 
				PUID: 50, 
				params: {
					version: 1.5,
					versionsIncluded: [ 1.6 ],
					type: 'v. 1.5-1.6'
				},
				regex: /^7B5C7274(66|6631){0,1}5C(616E7369|6D6163|7063|706361)5C616E7369637067/ 
			},
			{ 
				PUID: 52, 
				params: {
					version: 1.7,
					versionsIncluded: [ 2002 ],
					type: 'v. 1.7 / XP / 2002'
				},
				regex: '^7B5C7274(66|6631)5C(616E7369|6D6163|7063|706361)5C616E7369637067.{3-*}5C737473686664626368.{1-4}5C73747368666C6F6368.{1-4}5C737473686668696368.{1-4}5C73747368666269' 
			},
			{ 
				PUID: 53, 
				params: {
					version: 1.8,
					versionsIncluded: [ 2003 ],
					type: 'v. 1.8 / 2003'
				},
				regex: '^7B5C7274(66|6631).{0-15}(616E7369|6D6163|7063|706361)5C616E7369637067.{3-*}5C737473686664626368.{1-4}5C73747368666C6F6368.{1-4}5C737473686668696368.{1-4}5C73747368666269(.+)5C6C73647374696D6178' 
			},
			{ 
				PUID: 355, 
				params: {
					version: 1.9,
					type: 'v. 1.9'
				},
				regex: '^7B5C7274(66|6631).{0-15}(616E7369|6D6163|7063|706361)5C616E7369637067.{3-*}5C737473686664626368.{1-5}5C73747368666C6F6368.{1-5}5C737473686668696368.{1-5}5C73747368666269.{0-64000}(7B5C2A5C636F6C6F72736368656D656D617070696E67|5C6166656C6576|7B5C2A5C6461746173746F7265|7B5C2A5C646566636870)'
			}
		]
	},
	
	// Open XML based - Word, ODF, IBOOKS, EPUB
	_504B0304: {
		params: {
			description: 'Open XML document (OpenDocument Format, MS Word for Windows or ebook)',
			extensions: ['ODF', 'ODT', 'OTT', 'OTM', 'IBOOKS', 'EPUB', 'DOC', 'DOT', 'DOCX', 'DOTX', 'DOCM', 'DOTM'],
	 		mime: 'application/vnd.oasis.opendocument.formula' 
		},
	 	specs: [
			{ 
				PUID:189,  // TODO
				params: { 
					description: 'MS Word for Windows, MS Office Open XML Document',
					extensions: ['DOC', 'DOT', 'DOCX', 'DOTX', 'DOCM', 'DOTM'],
					mime: 'application/msword'
				},
				regex: /^504B0304.{26}5B436F6E74656E745F54797065735D2E786D6C20A2/
			},
			// TODO we need to handle owner files which are temporary files that have a .doc file name extension as well, see PUID 473		
			{ 
				PUID: 136, 
				params: { 
					description:'OpenDocument Text',
					extensions: ['ODT'],
					mime: 'application/vnd.oasis.opendocument.text',
					version: 1.0, 
					type: 'Text'
				},
				regex:'^504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E74657874(.+)6F66666963653A76657273696F6E3D22312E30' 
			},
			{ 
				PUID: 136, 
				params: { 
					description:'OpenDocument Text',
					extensions: ['OTT'],
					mime: 'application/vnd.oasis.opendocument.text-template',
					version: 1.0, 
					type: 'Template'
				},
				regex:'^504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E74657874(.+)6F66666963653A76657273696F6E3D22312E30' 
			},
			{ 
				PUID: 136, 
				params: { 
					description:'OpenDocument Text',
					extensions: ['OTM'],
					mime: 'application/vnd.oasis.opendocument.text-master',
					version: 1.0, 
					type: 'Master'
				},
				regex:'^504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E74657874(.+)6F66666963653A76657273696F6E3D22312E30' 
			},
			{ 
				PUID: 290, 
				params: { 
					description:'OpenDocument Text',
					extensions: ['ODT'],
					mime: 'application/vnd.oasis.opendocument.text',
					version: 1.1, 
					type: 'Text'
				},
				regex:'^504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E74657874' 
			},
			{ 
				PUID: 290, 
				params: { 
					description:'OpenDocument Text',
					extensions: ['OTT'],
					mime: 'application/vnd.oasis.opendocument.text-template',
					version: 1.1, 
					type: 'Template'
				},
				regex:'^504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E74657874' 
			},
			{ 
				PUID: 290, 
				params: { 
					description:'OpenDocument Text',
					extensions: ['OTM'],
					mime: 'application/vnd.oasis.opendocument.text-master',
					version: 1.1, 
					type: 'Master'
				},
				regex:'^504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E74657874' 
			},
			{ 
				PUID: 291, 
				params: { 
					description:'OpenDocument Text',
					extensions: ['ODT'],
					mime: 'application/vnd.oasis.opendocument.text',
					version: 1.2, 
					type: 'Text'
				},
				regex:'^504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E74657874(.+)6F66666963653A76657273696F6E3D22312E3222' 
			},
			{ 
				PUID: 291, 
				params: { 
					description:'OpenDocument Text',
					extensions: ['OTT'],
					mime: 'application/vnd.oasis.opendocument.text-template',
					version: 1.2, 
					type: 'Template'
				},
				regex:'^504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E74657874(.+)6F66666963653A76657273696F6E3D22312E3222' 
			},
			{ 
				PUID: 291, 
				params: { 
					description:'OpenDocument Text',
					extensions: ['OTM'],
					mime: 'application/vnd.oasis.opendocument.text-master',
					version: 1.2, 
					type: 'Master'
				},
				regex:'^504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E74657874(.+)6F66666963653A76657273696F6E3D22312E3222' 
			},
			{ 
				PUID: 135, 
				params: { 
					description:'OpenDocument Format',
					extensions: ['ODF'],
					mime: 'application/vnd.oasis.opendocument.text',
					version: 1.0, 
					type: 'Generic'
				},
				regex:/^504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E/ 
			},
			{ 
				PUID: 482, 
				params: {
					description:'Apple iBook Format file', 
					extensions: ['IBOOKS'],
					mime:'application/x-ibooks+zip'
				},
				regex:/^504B0304.{26}6D696D65747970656170706C69636174696F6E2F782D69626F6F6B732B7A6970/ 
			},
			{ 
				PUID: 483, 
				params: {
					description:'ePub Format file', 
					extensions: ['EPUB'],
					mime:'application/epub+zip'
				},
				regex:/^504B0304.{26}6D696D65747970656170706C69636174696F6E2F657075622B7A6970/
			} 
		]
	},
	
	// Other ebooks
	_B00CB00C: {
		params: {
			description: 'Rocket Book eBook Format file',
			extensions: ['RB'],
	 		mime: 'application/x-rocketbook'
		},
		specs: [ { PUID: 485, regex:/^B00CB00C.{2}4E55564F/ } ]
	},
	_4C00520046000000: {
		params: {
			description: 'Broad Band eBook Format file',
			extensions: ['LRF'],
	 		mime: 'application/octet-stream'
		},
		specs: 518
	},
	
	// TODO : other ebooks, see http://www.openplanetsfoundation.org/blogs/2012-11-19-identifying-ebooks-file-id-hackathon
	
	// XMP
	_3C3F787061636B657420626567696E3D22EFBBBF222069643D2257354D304D7043656869487A7265537A4E54637A6B633964223F3E0A3C783A786D706D65746120786D6C6E733A783D2261646F62653A6E733A6D6574612F22: {
		params: {
			description: 'Extensible Metadata Platform Packet (XMP)',
			extensions: ['XMP'],
	 		mime: 'application/octet-stream'
		},
		specs: 570
	},
	
	// DOC Binary based (until v. 2002)
	_FF575043: {
		params: {
			description: 'MS Word Perfect 6-12',
			extensions: ['DOC', 'WPD', 'WP6', 'WP', 'WP60'],
			mime: 'application/msword'
		},	
		specs: [
			{ xPUID:274, params: { version: 4.0 }, regex: /^FF575043.{4}010A0201/ },
			
		]
	},
	_31BE000000AB0000000000000000: {
		params: {
			description: 'MS Word for MS DOS',
			extensions: ['DOC'],
			mime: 'application/msword'
		},
		specs: [
			{ xPUID:274, params: { version: 4.0 }, regex: /^31BE000000AB0000000000000000.{82}0000.{18}00/ },
			{ xPUID:275, params: { version: 5.0 }, regex: /^31BE000000AB0000000000000000.{82}0000.{18}04/ },
			{ xPUID:276, params: { version: 5.5 }, regex: /^31BE000000AB0000000000000000.{82}0000.{18}07/ },
		],
	},
	
	_9BA5: {
		params: {
			description: 'MS Word for Windows',
			extensions: ['DOC'],
			mime: 'application/msword', 
			version: 1.0
		},
		specs: [{ PUID:37, regex: /^9BA5.{16}00000000/}],
		
	},
	_DBA5: {
		params: {
			description: 'MS Word for Windows',
			extensions: ['DOC'],
			mime: 'application/msword', 
			version: 2.0
		},
		specs: [{ PUID:38, regex: /^DBA5.{16}00000000/}],
	},
	
	
	// OLE contained
	_D0CF11E0A1B11AE1: {
		params: {
			description: 'MS Word for Windows 6.0 - 2002',
			extensions: ['DOC', 'DOCX', 'OLE', 'OLE2', 'OCX'],
			mime: 'application/msword'
		},
		specs: [
			{ 
				PUID:40, 
				params: {
					extensions: ['DOC', 'DOCX'],
					version: 97,
					versionsIncluded: [2002]
				},
				regex: /4D6963726F736F667420576F7264(20382E30|20392E30|2031302E30|2D446F6B756D656E74)/
			},
			{ 
				PUID:39, 
				params: {
					extensions: ['DOC', 'DOCX'],
					version: 6.0,
					versionsIncluded: [95]
				},
				regex: /4D6963726F736F667420576F726420(362E30|666F722057696E646F7773203935|362E302D446F6B756D656E74)/
			},
			
			{ 
				PUID:111, 
				params: { 
					description: 'OLE2 Compound Document Format',
					extensions: ['OLE', 'OLE2', 'OCX'], 	
					version: 2.0 
				},
				regex: /^D0CF11E0A1B11AE1.{20}FEFF/ 
			},
			{ 
				PUID:609, 
				params: { 
					extensions: ['DOC', 'DOCX'],
					type: 'Generic' 
				},
				regex: /^D0CF11E0A1B11AE1/ 
			},
			// TODO we need to handle owner files which are temporary files that have a .doc file name extension as well, see e.g. PUID 473
		]
	},
	
	// Open XML contained see above (also some ebooks)
	
	_0E11FC0DD0CF110E: {
		specs: 111,
		extensions: ['OLE', 'OCX'], 
		description: 'OLE Compound Document Format (beta)', 
		mime: '' // just compound
	}, 
	
	
	
	
	
},
	

/* ************************************************************************************************************************ 
T E X T 
************************************************************************************************************************ */
text: {
	// LOG
	_2A2A2A2020496E73: {
		params: {
			description: 'Symantec Wise Installer log file',
			extensions: ['LOG'],	 	
	 		mime: 'text/plain' 
		},
		// specs: 0,
	},
	// INF/README
	INF_README: {
		params: {
			description: 'Information or Setup File',
			extensions: ['INF', 'README'],
			mime: 'text/plain' 
		},
		specs: 212
	},
	// CONF
	CONF: {
		params: {
			description: 'Configuration File',
			extensions: ['CONF'],
	 		mime: 'text/plain' 
		},
		// specs: 0,
	},
	// LOG
	CONF: {
		params: {
			description: 'Logging File',
			extensions: ['LOG'],		
	 		mime: 'text/plain' 
		},
		// specs: 0,
	},
	// XML AND RELATED !
	XML: {
		params: {
			description: 'Extensible Markup Language (XML)', 
			extensions: ['XML', 'KML', 'KMZ', 'DXL'], 
			mime: 'application/xml'
		},
		specs: [
			{ 
				PUID:244, 
				params: {
					description:'Keyhole Markup Language', 
					extensions: ['KML', 'KMZ']
				},
				regex:/^.{0,3}3C3F786D6C2076657273696F6E3D(22|27)312E30(22|27)/ 
			},
			{ 
				PUID:571, 
				params: { 
					description:'Domino XML Document Export', 
					extensions: ['DXL']
				},
				regex:/^3C646F63756D656E7420666F726D3D(22|27).{0-32}(22|27)3E.{0-32}3C6E6F7465696E666F206E6F746569643D/
			},
			{ 
				PUID:101, 
				params: { 
					extensions: ['XML']
				},
				regex:/^.{0,1024}3C3F786D6C2076657273696F6E3D(22|27)312E30(22|27)/ 
			}
		]
	},
	OPML: {
		params: {
			description: 'Outline Processor Markup Language (OPML)', 
			extensions: ['OPML'], 		
			mime: 'text/x-opml' 
		},
		
	},
	// SQL
	SQL: {
		params: {
			description: 'Structured Query Language Data', 
			extensions: ['SQL'], 
			mime: 'application/x-sql' 
		},
		specs: 206
	},
	SMI_SMIL: {
		params: {
			description: 'Synchronized Multimedia Integration Language', 
			extensions: ['SMI', 'SMIL'], 
			mime: 'application/smil+xml' 
		},
		specs: 205
	},
	GPX: {
		params: {
			description: 'GPS eXchange Format', 
			extensions: ['GPX'], 		
			mime: 'text/css' 
		},
		specs: 243
	},
	// XHTML
	XHTML_HTM_HTML: {
		params: {
			description: 'Extensible Hypertext Markup Language (XHTML) file',
			extensions: ['XHTML', 'HTML', 'HTM'], 
			mime: 'application/xhtml+xml'
		},
		specs: [
			{ 
				PUID:102, 
				params: {
					description:'Extensible Hypertext Markup Language (XHTML)',
					version: 1.0
				},
				regex:/^.{0,1024}3C21444F43545950452068746D6C205055424C494320222D2F2F5733432F2F445444205848544D4C20312E30/
			},
			{ 
				PUID:102, 
				params: {
					description:'Extensible Hypertext Markup Language (XHTML)',
					version: 1.1
				}, 
				regex:/^.{0,1024}3C21444F43545950452068746D6C205055424C494320222D2F2F5733432F2F445444205848544D4C20312E31/
			}
		]
	},
	// RHTML
	RHTM_RHTML: {
		params: {
			description: 'eRuby HTML document', 
			extensions: ['RHTM', 'RHTML'], 
			mime: 'application/x-httpd-eruby' 
		},
		specs: 530
	},
	// HTML 
	HTM_HTML: {
		params: {
			description: 'Hypertext Markup Language (HTML) file',
			extensions: ['HTML', 'HTM', 'HTMLS', 'SHTML', 'HTX'],
	 		mime: 'text/html' 
		},
	 	specs: [
			{ 
				PUID: 96, 
				params: { 
					description:'Hypertext Markup Language (HTML) file, v. 1.0 / HTML without doctype',
					version: 1.0
				},
				regex:'^.{0,1024}3C(48544D4C|68746D6C)'
			},
			{ 
				PUID: 97, 
				params: { 
					description:'Hypertext Markup Language (HTML) file, HTML2',
					version: 2.0
				},
				regex:'^.{0,1024}3C21(444F4354595045|646F6374797065)20(48544D4C|68746D6C)20(5055424C4943|7075626C6963)20222D2F2F.{1,16}2F2F(445444|647464)20.{0,64}(48544D4C|68746D6C)20322E30'
			},
			{ 
				PUID: 98, 
				params: { 
					description:'Hypertext Markup Language (HTML) file, HTML3',
					version: 3.0,
					versionsIncluded: [3.2]
				},
				regex:'^.{0,1024}3C21(444F4354595045|646F6374797065)20(48544D4C|68746D6C)20(5055424C4943|7075626C6963)20222D2F2F.{1,16}2F2F(445444|647464)20.{0,64}(48544D4C|68746D6C)20332E32'
			},
			{ 
				PUID: 99, 
				params: { 
					description:'Hypertext Markup Language (HTML) file, HTML4',
					version: 4.0
				},
				regex:'^.{0,1024}3C21(444F4354595045|646F6374797065)20(48544D4C|68746D6C)20(5055424C4943|7075626C6963)20222D2F2F.{1,16}2F2F(445444|647464)20.{0,64}(48544D4C|68746D6C)20342E(3020|302F)'
			},
			{ 
				PUID: 100, 
				params: { 
					description:'Hypertext Markup Language (HTML) file, HTML4.1',
					version: 4.1
				},
				regex:'^.{0,1024}3C21(444F4354595045|646F6374797065)20(48544D4C|68746D6C)20(5055424C4943|7075626C6963)20222D2F2F.{1,16}2F2F(445444|647464)20.{0,64}(48544D4C|68746D6C)20342E3031'
			},
			{ 
				PUID: 471, 
				params: { 
					description:'Hypertext Markup Language (HTML) file, HTML5',
					version: 5
				},
				regex:'^.{0,1024}3C21(444F4354595045|646F6374797065).{0,4}(48544D4C|68746D6C)(.{0,4}(53595354454D|73797374656D).{0,4}(27|22)61626F75743A6C65676163792D636F6D706174(27|22))?3E' 
			}
		]
	},
	
	// CSS
	CSS: {
		params: {
			description: 'Cascading Stylesheet (CSS) file', 
			extensions: ['CSS'], 		
			mime: 'text/css' 
		}
	},
	// JS
	JS: {
		params: {
			description: 'Javascript file', 
			extensions: ['JS'], 		
			mime: 'application/javascript'
		},
		/*
		.js		text/javascript
		.js		text/ecmascript
		*/ 
	},
	C: {
		params: {
			description: '', 
			extensions: ['C', 'CC', 'CXX', 'CPP', 'H', 'HH', 'DIC'],
			mime: 'text/plain'
		},	 
		/*
		.c		text/plain
		.c		text/x-c
		.cpp	text/x-c
		.h		text/plain
		.cxx	text/plain
		*/
		
		/* TODO - from stackoverflow "AProgrammer":
		Historically, the first extensions used for C++ were .c and .h, exactly like for C. 
		This caused practical problems, especially the .c which didn't allow build systems to easily differentiate C++ and C files.

		Unix, on which C++ has been developed, has case sensitive file systems. 
		So some used .C for C++ files. Other used .c++, .cc and .cxx.  .C and .c++ have the problem that they aren't available on other file systems and their use quickly dropped. 
		DOS and Windows C++ compilers tended to use .cpp, and some of them make the choice difficult, if not impossible, to configure. 
		Portability consideration made that choice the most common, even outside MS-Windows.
		
		Headers have used the corresponding .H, .h++, .hh, .hxx and .hpp. 
		But unlike the main files, .h remains to this day a popular choice for C++ even with the disadvantage that it doesn't allow to know if the header can be included in C context or not. 
		Standard headers now have no extension at all.
		
		Additionally, some are using .ii, .ixx, .ipp, .inl for headers providing inline definitions and .txx, .tpp and .tpl for template definitions. 
		Those are either included in the headers providing the definition, or manually in the contexts where they are needed.
		*/ 
	},
	JAVA: {
		params: {
			description: '', 
			extensions: ['JAV', 'JAVA'], 		
			mime: 'text/x-java-source' 
		}
		/*
		.jav	text/plain
		.jav	text/x-java-source
		.java	text/plain
		.java	text/x-java-source
		*/
	},
	RUBY: {
		params: {
			description: '', 
			extensions: ['RB'], 
			mime: ''  // TODO
		}
	},
	
	APPCACHE: {
		params: {
			description: '',
			extensions: ['APPCACHE'],	 	
	 		mime: 'text/cache-manifest' 
		}
	},
	CSV: {
		params: {
			description: '', 
			extensions: ['CSV'], 		
			mime: 'text/csv' 
		}
	},
	FORTRAN: {
		params: {
			description: '',
			extensions: ['F', 'FOR', 'F77', 'F90'],
			mime: 'text/x-fortran' 
		}	 	
	},
	PASCAL: {
		params: {
			description: '',
			extensions: ['P', 'PAS'],	 	
	 		mime: 'text/x-pascal' 
		}
	},
	PERL: {
		params: {
			description: '',
			extensions: ['PL', 'PM'],
	 		mime: 'text/x-script.perl'
		},
		/*
		.pl		text/plain
		.pl		text/x-script.perl
		.pm		text/x-script.perl-module
		*/ 
	},
	PYTHON: {
		params: {
			description: '',
			extensions: ['PY'],	 	
	 		mime: 'text/x-script.phyton'
		}
	},
	// TODO : more prog. languages (all plaintext ...)
	// e.g. dart, scala - see http://sogrady-media.redmonk.com/sogrady/files/2014/01/lang-rank-114-wm.png ;)
	/*	
	
	ecmascript: {
		params: {
			
		},
		specs: [],
		extensions: [ 'ECMA' ],
		signature: false,
		description: '',
		mime: 'application/ecmascript' 
	},
	.ssi	text/x-server-parsed-html
	.com	text/plain
	.def	text/plain
	.el		text/x-script.elisp
	.etx	text/x-setext
	.g		text/plain
	.flx	text/vnd.fmi.flexstor
	.for	text/plain
	.htc	text/x-component
	.htt	text/webviewhtml
	.idc	text/plain
	.ksh	text/x-script.ksh
	.list	text/plain
	.lsp	text/x-script.lisp
	.lst	text/plain
	.lsx	text/x-la-asf
	.m		text/plain
	.mar	text/plain
	.scm	text/x-script.guile
	.scm	text/x-script.scheme
	.sdml	text/plain
	.sh		text/x-script.sh
	.spc	text/x-speech
	.talk	text/x-speech
	.tcl	text/x-script.tcl
	.tcsh	text/x-script.tcsh
	.uil	text/x-uil
	.zsh	text/x-script.zsh
	*/
	// PRO - Prime OCR
	_3433302C: { 
		params: { 
			description: 'Prime OCR, v. 4.3',
			extensions: [ 'PRO' ],
			mime: 'text/x-pro' 
		},
		specs: { PUID: 188 } 
	},
	_3432302C: { 
		params: { 
			description: 'Prime OCR, v. 4.2',
			extensions: [ 'PRO' ],
			mime: 'text/x-pro' 
		},
		specs: { PUID: 187 } 
	},
	_3430302C: { 
		params: { 
			description: 'Prime OCR, v. 4.0',
			extensions: [ 'PRO' ],
			mime: 'text/x-pro' 
		},
		specs: { PUID: 186 } 
	},
	_3339302C: { 
		params: { 
			description: 'Prime OCR, v. 3.9',
			extensions: [ 'PRO' ],
			mime: 'text/x-pro' 
		},
		specs: { PUID: 185 } 
	},
	_3338302C: { 
		params: { 
			description: 'Prime OCR, v. 3.8',
			extensions: [ 'PRO' ],
			mime: 'text/x-pro' 
		},
		specs: { PUID: 184 } 
	},
	_3330302C: { 
		params: { 
			description: 'Prime OCR, v. 3.0',
			extensions: [ 'PRO' ],
			mime: 'text/x-pro' 
		},
		specs: { PUID: 183 } 
	},
	_4F4658484541444552: { 
		params: { 
			description: 'Open Financial Exchange',
			extensions: [ 'OFX', 'QFX' ],
			mime: 'application/x-ofx ' 
		},
		specs: [ 
			{ 
				PUID:313,
				params: { version: 2.11 },
				regex: /^4F46584845414445523D(22|27)323030(22|27)0D0A56455253494F4E3D(22|27)323131/ 
			},
			{ 
				PUID:312,
				params: { version: 2.03 },
				regex: /^4F46584845414445523D(22|27)323030(22|27)0D0A56455253494F4E3D(22|27)323033/ 
			},
			{ 	
				PUID:311,
				params: { version: 1.6 },
				regex: /^4F46584845414445523A3130300D0A444154413A(.+)0D0A56455253494F4E3A3136300D0A53454355524954593A/ 
			},
			{ 
				PUID:310,
				params: { version: 1.03 },
				regex: /^4F46584845414445523A313030.{0,2}444154413A(.+)56455253494F4E3A313033/ 
			},
			{ 
				PUID:309,
				params: { version: 1.02 },
				regex: /^4F46584845414445523A313030.{0,2}444154413A(.+)56455253494F4E3A313032/ 
			} 
		] 
	},
	_3C3F77706C2076657273696F6E3D22312E30223F3E: { 
		params: { 
			description: 'Windows Media Playlist',
			extensions: [ 'WPL' ],
			mime: 'application/vnd.ms-wpl' 
		},
		specs: { PUID: 589 } 
	},
	_646E3A20: { 
		params: { 
			description: 'LDAP Data Interchange Format',
			extensions: [ 'LDIF' ],
			mime: 'text/directory' 
		},
		specs: { PUID: 611 } 
	},
	_49545346: { 
		params: { 
			description: 'MS Compiled HTML Help',
			extensions: [ 'CHM', 'CHW' ],
			mime: 'application/vnd.ms-htmlhelp ' 
		},
		specs: { PUID: 634 } 
	},
	_424547494E3A5643415244: { 
		params: { 
			description: 'vCard file',
			extensions: [ 'VCF' ],
			mime: 'text/vcard' 
		},
		specs: { PUID: 395 } 
	},
	VCARD: { 
		params: { 
			description: 'vCard file',
			extensions: [ 'VCARD' ],
			mime: 'text/vcard' 
		} 
	},
	_424547494E3A5643414C454E444152: { 
		params: { 
			description: 'vCalendar Format file',
			extensions: [ 'VCS', 'ICS', 'IFB' ],
			mime: 'text/calendar' 
		},
		specs: [ 
			{ 
				PUID:387,
				params: { 
					description: 'vCalendar Format file',
					mime: 'text/x-vCalendar' 
				},
				regex: /^424547494E3A5643414C454E444152(.+)56455253494F4E.{0,2}3A312E30/ 
			},
			{ 
				PUID:388,
				params: { 
					description: 'Internet Calendar and Scheduling Format file' 
				},
				regex: /424547494E3A5643414C454E444152(.+)56455253494F4E.{0,2}3A322E30/ 
			} 
		] 
	},
	LATEX_LTX: { 
		params: { 
			description: 'LaTeX Document',
			extensions: [ 'LATEX', 'LTX' ],
			mime: 'application/x-latex' 
		},
		specs: [ 
			{ 
				PUID:280,
				params: { description: 'LaTeX Master document' },
				regex: /^.{0,4096}5C646F63756D656E74636C617373/ 
			},
			{ 
				PUID:281,
				params: { description: 'LaTeX Subdocument' },
          		regex: /^.{0,4096}5C(7573657061636B6167657B|636861707465727B|73656374696F6E7B|73756273656374696F6E7B|626567696E7B)/ 
			} 
		] 
	},
	ESRI: { 
		params: { 
			description: 'ESRI World File Format',
			extensions: [ 'TFW', 'TIFW', 'BLW', 'BILW', 'JGW', 'PGW', 'BPW', 'JPGW', 'RASTERW', 'BTW' ],
			mime: 'text/plain' 
		},
		specs: { PUID: 367 } 
	},
	ENL: { 
		params: { 
			description: 'EndNote Library',
			extensions: [ 'ENL' ],
			mime: 'application/x-endnote-library' 
		},
		specs: { PUID: 325 } 
	},
	LCK: { 
		params: { 
			description: 'Dreamweaver Lock File',
			extensions: [ 'LCK' ],
			mime: 'text/plain' 
		},
		specs: { PUID: 335 } 
	},
	NSI: { 
		params: { 
			description: 'Nullsoft Scriptable Install System',
			extensions: [ 'NSI' ],
			mime: 'text/plain' 
		},
		specs: { PUID: 644 } 
	},

//text - TODO !!! NOTHING YET !!! Fallback with strong warning.		
	LAS: { 
		params: { 
			description: 'Log ASCII Standard Format',
			extensions: [ 'LAS' ],
			mime: 'text/plain' 
		} 
	},
	N3: { 
		params: { 
			description: '',
			extensions: [ 'N3' ],
			mime: 'text/n3' 
		} 
	},
	SGML: { 
		params: { 
			description: '',
			extensions: [ 'SGML', 'SGM' ],
			mime: 'text/sgml' 
		} 
	},
	TSV: { 
		params: { 
			description: '',
			extensions: [ 'TSV', 'TAB' ],
			mime: 'text/tab-separated-values' 
		} 
	},
	TROFF: { 
		params: { 
			description: '',
			extensions: [ 'T', 'TR', 'ROFF', 'MAN', 'ME', 'MS' ],
			mime: 'text/troff' 
		} 
	},
	TTL: { 
		params: { 
			description: '',
			extensions: [ 'TTL' ],
			mime: 'text/turtle' 
		} 
	},
	URI: { 
		params: { 
			description: '',
			extensions: [ 'URI', 'URIS', 'UNI', 'UNIS', 'URLS' ],
			mime: 'text/uri-list' 
		} 
	},
	CURL: { 
		params: { 
			description: '',
			extensions: [ 'CURL' ],
			mime: 'text/vnd.curl' 
		} 
	},
	CURL_DCURL: { 
		params: { 
			description: '',
			extensions: [ 'DCURL' ],
			mime: 'text/vnd.curl.dcurl' 
		} 
	},
	CURL_SCURL: { 
		params: { 
			description: '',
			extensions: [ 'SCURL' ],
			mime: 'text/vnd.curl.scurl' 
		} 
	},
	CURL_MCURL: { 
		params: { 
			description: '',
			extensions: [ 'MCURL' ],
			mime: 'text/vnd.curl.mcurl' 
		} 
	},
	SUB: { 
		params: { 
			description: '',
			extensions: [ 'SUB' ],
			mime: 'text/vnd.dvb.subtitle' 
		} 
	},
	FLY: { 
		params: { 
			description: '',
			extensions: [ 'FLY' ],
			mime: 'text/vnd.fly' 
		} 
	},
	FLX: { 
		params: { 
			description: '',
			extensions: [ 'FLX' ],
			mime: 'text/vnd.fmi.flexstor' 
		} 
	},
	GV: { 
		params: { 
			description: '',
			extensions: [ 'GV' ],
			mime: 'text/vnd.graphviz' 
		} 
	},
	DML: { 
		params: { 
			description: '',
			extensions: [ '3DML' ],
			mime: 'text/vnd.in3d.3dml' 
		} 
	},
	SPOT: { 
		params: { 
			description: '',
			extensions: [ 'SPOT' ],
			mime: 'text/vnd.in3d.spot' 
		} 
	},
	JAD: { 
		params: { 
			description: '',
			extensions: [ 'JAD' ],
			mime: 'text/vnd.sun.j2me.app-descriptor' 
		} 
	},
	WML: { 
		params: { 
			description: '',
			extensions: [ 'WML' ],
			mime: 'text/vnd.wap.wml' 
		} 
	},
	WMLS: { 
		params: { 
			description: '',
			extensions: [ 'WMLS' ],
			mime: 'text/vnd.wap.wmlscript' 
		} 
	},
	ASM: { 
		params: { 
			description: '',
			extensions: [ 'S', 'ASM' ],
			mime: 'text/x-asm' 
		} 
	},
	NFO: { 
		params: { 
			description: '',
			extensions: [ 'NFO' ],
			mime: 'text/x-nfo' 
		} 
	},
	ETC: { 
		params: { 
			description: '',
			extensions: [ 'ETX' ],
			mime: 'text/x-setext' 
		} 
	},
	SFV: { 
		params: { 
			description: '',
			extensions: [ 'SFV' ],
			mime: 'text/x-sfv' 
		} 
	},
	x_uuencode: { 
		params: { 
			description: '',
			extensions: [ 'UU', 'UUE' ],
			mime: 'text/x-uuencode' 
		} 
	},
	
	// txt
	TXT: { 
		params: { 
			description: 'Plain Text file',
			extensions: [ 'TXT' ],
			mime: 'text/plain' 
		} 
	} 
	
	/* TODO - after KODAK DCS was done 
	prs_lines_tag: {
		params: {
			
		},
	 	extensions: 'dsc',
		signature: false,
	 	description: '',
	 	mime: 'text/prs.lines.tag' },
	*/
},


/* ************************************************************************************************************************ 
M E S S A G E
************************************************************************************************************************ */
message: {
	_0D0A582D4D696D654F4C453A2050726F6475636564204279204D6963726F736F6674204D696D654F4C452056362E30302E: {
		signatureOffset: [0, 1024],
		params: {
			description: 'Internet Message Format',
			extensions: ['EML', 'MIME'],
			mime: 'message/rfc822' 
		},
		specs: 278
	} 
},

/* ************************************************************************************************************************ 
C H E M I C A L
************************************************************************************************************************ */

/* ************************************************************************************************************************ 
M O D E L
************************************************************************************************************************ */

/* ************************************************************************************************************************ 
A P P L I C A T I O N
************************************************************************************************************************ */
application: {
// ... archives / compressed ...
	// ZIP
	// x-fmt/263
	_504B0304: { // Open XML ...
		params: { 
			description: 'PKZIP archive',
			extensions: [ 'ZIP' ],
			mime: 'application/zip' 
		}
	},
	_504B0708: { 
		params: { 
			description: 'PKZIP archive',
			extensions: [ 'ZIP' ],
			mime: 'application/zip' 
		}
	},
	_504B0506: { 
		params: { 
			description: 'PKZIP archive',
			extensions: [ 'ZIP' ],
			mime: 'application/zip' 
		}
	},
	_504B537058: { 
		params: { 
			description: 'PKSFX self-extracting archive',
			extensions: [ 'ZIP' ],
			mime: 'application/zip' 
		}
	},
	_504B4C495445: { 
		params: { 
			description: 'PKLITE archive',
			extensions: [ 'ZIP' ],
			mime: 'application/zip' 
		}
	},
	_504B030414000100: {
		params: { 
			description: 'ZLock Pro encrypted ZIP archive',
			extensions: [ 'ZIP' ],
			mime: 'application/zip' 
		}
	},
	_57696E5A6970: { 
		params: { 
			description: 'WinZip compressed archive',
			extensions: [ 'ZIP' ],
			mime: 'application/zip' 
		}
	},
	_377ABCAF271C: { 
		params: { 
			description: '7-Zip compressed archive',
			extensions: [ '7Z' ],
			mime: 'application/x-7z-compressed' 
		},
		specs: { PUID: 484 }
	},
	
	// SIT StuffIt
	_5374756666497420: { 
		params: { 
			description: 'StuffIt compressed archive',
			extensions: [ 'SIT' ],
			mime: 'application/x-stuffit' 
		},
		specs: { PUID: 639 }
	},
	_5349542100: { 
		params: { 
			description: 'StuffIt compressed archive',
			extensions: [ 'SIT' ],
			mime: 'application/x-stuffit' 
		},
		specs: { PUID: 639 }
	},
	x_stuffitx: { 
		params: { 
			description: 'StuffIt X compressed archive',
			extensions: [ 'SITX' ],
			mime: 'application/x-stuffitx' 
		},
		specs: { PUID: 399 }
	},
	
	// JAR
	_4A4152435300: { 
		params: { 
			description: 'JARCS compressed archive',
			extensions: [ 'JAR' ],
			mime: 'application/java-archive' 
		}
	},
	_5F27A889: { 
		params: { 
			description: 'Jar archive',
			extensions: [ 'JAR' ],
			mime: 'application/java-archive' 
		}
	},
	_504B030414000800: { // Open XML
		params: { 
			description: 'Java archive',
			extensions: [ 'JAR' ],
			mime: 'application/java-archive' 
		}
	},
	// TAR
	_7573746172: { 
		params: { 
			description: 'Tape Archive',
			extensions: [ 'TAR' ],
			mime: 'application/x-tar'
		} 
	},
	// MAR
	_4D415243: { 
		params: { 
			description: 'MS|MSN MARC archive',
			extensions: [ 'MAR' ],
			mime: 'application/octet-stream' 
		}
	},
	_4D41523100: { 
		params: { 
			description: 'Mozilla archive (MAR) compressed archive',
			extensions: [ 'MAR' ],
			mime: 'application/octet-stream' 
		}
	},
	_4D41723000: { 
		params: { 
			description: 'Mozilla archive (MAR) compressed archive',
			extensions: [ 'MAR' ],
			mime: 'application/octet-stream' 
		}
	},
	
	// BIN (HEX)
	_2854686973206669: { 
		params: { 
			description: 'BinHex 4 Compressed Archive',
			extensions: [ 'HQX' ],
			mime: 'application/mac-binhex40' 
		}
	},
	
	// TODO
	_424C4932323351: { 
		params: { 
			description: 'Speedtouch router firmware',
			extensions: [ 'BIN' ],
			mime: 'application/octet-stream'
		},
		specs: { PUID: 208 }
	},
	
	// DMS
	_444D5321: { 
		params: { 
			description: 'Amiga DiskMasher compressed archive',
			extensions: [ 'DMS' ],
			mime: 'application/octet-stream' 
		}
	},
	
	// CAB
	_4D534346: { 
		params: { 
			description: 'MS cabinet file',
			extensions: [ 'CAB' ],
			mime: 'application/vnd.ms-cab-compressed' 
		}
	},
	_49536328: { 
		params: { 
			description: 'Install Shield compressed file',
			extensions: [ 'CAB' ],
			mime: 'application/vnd.ms-cab-compressed' 
		}
	},
	
	_1A03: { 
		params: { 
			description: 'LH archive (old vers.|type 2)',
			extensions: [ 'ARC' ],
			mime: 'application/x-freearc' 
		},
		specs: { PUID: 410 },
		SP: [ 
			{
				PUID: 410,
				params: { 
					description: 'Internet Archive 1.1',
				},
				regex: '^66696C65646573633A2F2F.{1-132}20{1-3}2E{1-3}2E{1-3}2E{1-3}20{14}20746578742F706C61696E20{1-16}0A31203120(.+)0A55524C2049502D6164647265737320417263686976652D6461746520436F6E74656E742D7479706520417263686976652D6C656E677468'
			} 
		] 
	},
	_1A02: { 
		params: { 
			description: 'LH archive (old vers.|type 1)',
			extensions: [ 'ARC' ],
			mime: 'application/x-freearc' 
		},
		specs: { PUID: 410 },
		SP: [ 
			{
				PUID: 410,
				params: { 
					description: 'Internet Archive 1.1',
				},
				regex: '^66696C65646573633A2F2F.{1-132}20{1-3}2E{1-3}2E{1-3}2E{1-3}20{14}20746578742F706C61696E20{1-16}0A31203120(.+)0A55524C2049502D6164647265737320417263686976652D6461746520436F6E74656E742D7479706520417263686976652D6C656E677468'
			} 
		] 
	},
	_1A09: { 
		params: { 
			description: 'LH archive (old vers.|type 5)',
			extensions: [ 'ARC' ],
			mime: 'application/x-freearc' 
		},
		specs: { PUID: 410 },
		SP: [ 
			{
				PUID: 410,
				params: { 
					description: 'Internet Archive 1.1',
				},
				regex: '^66696C65646573633A2F2F.{1-132}20{1-3}2E{1-3}2E{1-3}2E{1-3}20{14}20746578742F706C61696E20{1-16}0A31203120(.+)0A55524C2049502D6164647265737320417263686976652D6461746520436F6E74656E742D7479706520417263686976652D6C656E677468'
			} 
		] 
	},
	_1A08: { 
		params: { 
			description: 'LH archive (old vers.|type 4)',
			extensions: [ 'ARC' ],
			mime: 'application/x-freearc' 
		},
		specs: { PUID: 410 },
		SP: [ 
			{
				PUID: 410,
				params: { 
					description: 'Internet Archive 1.1',
				},
				regex: '^66696C65646573633A2F2F.{1-132}20{1-3}2E{1-3}2E{1-3}2E{1-3}20{14}20746578742F706C61696E20{1-16}0A31203120(.+)0A55524C2049502D6164647265737320417263686976652D6461746520436F6E74656E742D7479706520417263686976652D6C656E677468'
			} 
		] 
	},
	_41724301: { 
		params: { 
			description: 'FreeArc compressed file',
			extensions: [ 'ARC' ],
			mime: 'application/x-freearc' 
		},
		specs: { PUID: 410 },
		SP: [ 
			{
				PUID: 410,
				params: { 
					description: 'Internet Archive 1.1',
				},
				regex: '^66696C65646573633A2F2F.{1-132}20{1-3}2E{1-3}2E{1-3}2E{1-3}20{14}20746578742F706C61696E20{1-16}0A31203120(.+)0A55524C2049502D6164647265737320417263686976652D6461746520436F6E74656E742D7479706520417263686976652D6C656E677468'
			} 
		] 
	},
	_1A04: { 
		params: { 
			description: 'LH archive (old vers.|type 3)',
			extensions: [ 'ARC' ],
			mime: 'application/x-freearc' 
		},
		specs: { PUID: 410 },
		SP: [ 
			{
				PUID: 410,
				params: { 
					description: 'Internet Archive 1.1',
				},
				regex: '^66696C65646573633A2F2F.{1-132}20{1-3}2E{1-3}2E{1-3}2E{1-3}20{14}20746578742F706C61696E20{1-16}0A31203120(.+)0A55524C2049502D6164647265737320417263686976652D6461746520436F6E74656E742D7479706520417263686976652D6C656E677468'
			} 
		] 
	},
	_2D6C68: { 
		params: { 
			description: 'LHA File Format Compressed archive',
			extensions: [ 'LHA', 'LZH' ],
			mime: 'application/x-lzh-compressed' 
		},
		specs: { PUID: 626, regex: '^2D6C68(30|31|34|35|36|37|64)2D' }
	},
	_526172211A0700: { 
		params: { 
			description: 'WinRAR compressed archive',
			extensions: [ 'RAR' ],
			mime: 'application/x-rar-compressed' 
		},
		 	specs: [ { PUID: 411 }, { PUID: 613 } ],
		SP: [ 
			{
				PUID: 411,
				params: { description: 'RAR Archive 2.9'},
				regex: '^526172211A0700.{2}73{34}1D' 
			},
			{ 
				PUID:613,
				params: { description: 'RAR Archive'},
				regex: '^526172211A070100'
			} 
		] 
	},
	_4344303031: { 
		params: { 
			description: 'ISO-9660 CD Disc Image',
			extensions: [ 'ISO' ],
			mime: 'application/x-iso9660-image' 
		},
		specs: { PUID: 468 }
	},
	x_shar: { 
		params: { 
			description: '',
			extensions: [ 'SHAR' ],
			mime: 'application/x-shar' 
		},
		specs: { PUID: 329 },
		SP: [ 
			{
				PUID: 329,
				params: { 
					description: 'Shell Archive No. 1',
				},
				regex: '^2321.{0-1}2F62696E2F73680A2320546869732069732061207368656C6C2061726368697665' 
			},
			{ 
				PUID:329,
				params: { 
					description: 'Shell Archive No. 2',
				},
				regex: '^2320546869732069732061207368656C6C2061726368697665'
			} 
		] 
	},
	
	
	// ... word
	_576F726450726F: { 
		params: { 
			description: 'Lotus WordPro file',
			extensions: [ 'LWP' ],
			mime: 'application/vnd.lotus-wordpro'
		},
		specs: [ 
			{ 
				PUID: 340,
				params: { description: 'Lotus WordPro 97/Millennium' },
				regex: /^576F726450726F0000000000000000004C5750370000000000000000000000000000FFFFFFFF000000002E/ 
			 } 
		]  
	},
		
	// ... image
	_43505446494C45: { 
		params: { 
			description: 'Corel Photopaint file_2',
			extensions: [ 'CPT' ],
			mime: 'application/mac-compactpro' 
		}
	},
	_4350543746494C45: { 
		params: { 
			description: 'Corel Photopaint file_1',
			extensions: [ 'CPT' ],
			mime: 'application/mac-compactpro' 
		}
	},
	_ACED00057372001B67656F6765627261: { 
		params: { 
			description: 'GeoGebra vector image',
			extensions: [ 'GEO' ],
			mime: 'application/vnd.dynageo'
		},
		specs: { PUID: 618 } 
	},
	
	_504B0304: { 
		params: { 
			description: 'ODF graphics',
			extensions: [ 'ODG', 'OTG' ],
			mime: 'application/vnd.oasis.opendocument.graphics' 
		},
		specs: [ 
			{
				PUID: 139,
				params: { 
					extensions: [ 'ODG' ],
					mime: 'application/vnd.oasis.opendocument.graphics', 
					version: 1.0,
					type: 'Graphics'
				},
				regex: '^504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E6772617068696373(.+)6F66666963653A76657273696F6E3D22312E30' 
			},
			{
				PUID: 139,
				params: { 
					extensions: [ 'OTG' ],
					mime: 'application/vnd.oasis.opendocument.graphics-template', 
					version: 1.0,
					type: 'Template'
				},
				regex: '^504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E6772617068696373(.+)6F66666963653A76657273696F6E3D22312E30' 
			},
			{ 
				PUID:296,
				params: { 
					extensions: [ 'ODG' ],
					mime: 'application/vnd.oasis.opendocument.graphics', 
					version: 1.1,
					type: 'Graphics, with version number'
				},
				regex: '^504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E6772617068696373(.+)6F66666963653A76657273696F6E3D22312E3122' 
			},
			{ 
				PUID:296,
				params: { 
					extensions: [ 'OTG' ],
					mime: 'application/vnd.oasis.opendocument.graphics-template',  
					version: 1.1,
					type: 'Template, with version number'
				},
				regex: '^504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E6772617068696373(.+)6F66666963653A76657273696F6E3D22312E3122' 
			},
			{ 
				PUID:296,
				params: { 
					extensions: [ 'ODG' ],
					mime: 'application/vnd.oasis.opendocument.graphics', 
					version: 1.1,
					type: 'Graphics, without version number'
				},
				regex: '^504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E6772617068696373' 
			},
			{ 
				PUID:296,
				params: { 
					extensions: [ 'OTG' ],
					mime: 'application/vnd.oasis.opendocument.graphics-template',  
					version: 1.1,
					type: 'Template, without version number'
				},
				regex: '^504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E6772617068696373' 
			},
			{ 
				PUID:297,
				params: { 
					extensions: [ 'ODG' ],
					mime: 'application/vnd.oasis.opendocument.graphics', 
					version: 1.2,
					type: 'Graphics'
				},
				regex: '^504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E6772617068696373(.+)6F66666963653A76657273696F6E3D22312E3222'
			},
			{ 
				PUID:297,
				params: { 
					extensions: [ 'OTG' ],
					mime: 'application/vnd.oasis.opendocument.graphics-template',  
					version: 1.2,
					type: 'Template'
				},
				regex: '^504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E6772617068696373(.+)6F66666963653A76657273696F6E3D22312E3222'
			}
		] 
	},
	
	
	
	// ... video - TODO Final Cut
	_464F524D: { 
		params: { 
			description: 'Cinema 4D',
			extensions: [ 'C4G', 'C4D', 'C4F', 'C4P', 'C4U' ],
			mime: 'application/vnd.clonk.c4group'
		},
		specs: [ 
			{ 
				PUID: 415,
				params: { version: 4.0, type: '4.x' },
				regex: /^464F524D.{4}4D433444/ 
			}
		] 
	},
	_4D433530: { 
		params: { 
			description: 'Cinema 4D',
			extensions: [ 'C4G', 'C4D', 'C4F', 'C4P', 'C4U' ],
			mime: 'application/vnd.clonk.c4group'
		},
		specs: [ 
			{ 
				PUID: 540,
				params: { version: 5.0, type: '5.x' },
				regex: /^4D433530.{4}(50524635|444F4B35|43415435|46435635)/ 
			}
		] 
	},
	
	// ... audio
	_72696666: { 
		params: { 
			description: 'Sonic Foundry Acid Music File',
			extensions: [ 'AC' ],
			mime: 'application/pkix-attr-cert' 
		}
	},
	_4E45534D1A01: { 
		params: { 
			description: 'NES Sound file',
			extensions: [ 'NSF' ],
			mime: 'application/vnd.lotus-notes' 
		}
	},
	_454E49474D412042494E4152592046494C45000000000000000000000000000046696E616C65285229: { 
		params: { 
			description: 'Enigma Binary File (Finale)',
			extensions: [ 'MUS' ],
			mime: 'application/vnd.musician' 
		},
		specs: { PUID: 397 }
	},
	
	
	// ... dtp and ... presentation
	_00004D4D585052: { 
		params: { 
			description: 'Quark Express (Motorola)',
			extensions: [ 'QXD' ],
			mime: 'application/vnd.quark.quarkxpress'
		}, 
		specs: { xPUID: 182 }
	},
	_00004949585052: { 
		params: { 
			description: 'Quark Express (Intel)',
			extensions: [ 'QXD' ],
			mime: 'application/vnd.quark.quarkxpress'
		}, 
		specs: { xPUID: 182 }
	},
	_3C4D616B657246696C6520352E: { 
		params: { 
			description: 'Framemaker Document',
			extensions: [ 'FM', 'FRAME', 'MAKER', 'BOOK' ],
			mime: 'application/vnd.framemaker' 
		},
		specs: [ 
			{ 
				PUID: 539,
				params: { version: 9.0 },
				regex: /^3C4D616B657246696C6520392E30483E/ 
			},
			{ 
				PUID: 538,
				params: { version: 7.0 },
				regex: /^3C4D616B657246696C6520372E30483E/ 
			},
			{ 
				PUID: 537,
				params: { version: 6.0 },
				regex: /^3C4D616B657246696C6520362E304A3E/ 
			},
			{ 
				PUID: 536,
				params: { version: 5.5 },
				regex: /^3C4D616B657246696C6520352E35513E/ 
			},
			{ 
				PUID: 190,
				params: { version: 5.0 },
				regex: /^3C4D616B657246696C6520352E30593E/ 
			},
			{ 
				PUID: 535,
				params: { version: 4.0 },
				regex: /^3C4D616B657246696C6520342E304B3E/ 
			},
			{ 
				PUID: 534,
				params: { version: 3.0 },
				regex: /^3C4D616B657246696C6520332E30463E/ 
			},
			{ 
				PUID: 533,
				params: { version: 2.0 },
				regex: /^3C4D616B657246696C6520322E304A3E/ 
			}
		] 
	},
	_D0CF11E0A1B11AE1: {  
		params: { 
			description: 'MS PowerPoint presentation',
			extensions: [ 'PPT' ],
			mime: 'application/vnd.ms-powerpoint' 
		},
		specs: [ { PUID: 215 }, { PUID: 487 }, { PUID: 494 } ], //x88
		SP: [ 
			{
				PUID: 125,
				params: { version: 95 },
				regex: /^50006F0077006500720050006F0069006E007400200044006F00630075006D0065006E007400/ 
			},
			{ 
				PUID:126,
				params: { version: 97, versionsIncluded:[2002] },
				regex: /^50006F0077006500720050006F0069006E007400200044006F00630075006D0065006E007400/
			} 
		] 
	},
	_504B0304: { // Open XML ...
		params: { 
			description: 'Open XML presentation (OpenDocument Format, MS PowerPoint)',
			extensions: [ 'ODP', 'OTP', 'PPT', 'PPTM', 'PPTX' ],
			mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
		},
		specs: [ 
			{
				PUID: 215,
				params: { 
					extensions: [ 'PPTX', 'PPT' ],
					mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
					type: 'Standard'
				}
			},
			{ 
				PUID: 487,
				params: { 
					extensions: [ 'PPTM', 'PPT' ],
					mime: 'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
					type: 'Macro-Enabled'
				}
			},
			{
				PUID: 138,
				params: { 
					description: 'ODF presentation',
					extensions: [ 'ODP' ],
					mime: 'application/vnd.oasis.opendocument.presentation',
					version: 1.0,
					type: 'Presentation' 
				},
				regex: '^504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E70726573656E746174696F6E(.+)6F66666963653A76657273696F6E3D22312E30' 
			},
			{
				PUID: 138,
				params: { 
					description: 'ODF presentation',
					extensions: [ 'OTP' ],
					mime: 'application/vnd.oasis.opendocument.presentation-template',
					version: 1.0,
					type: 'Template' 
				},
				regex: '^504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E70726573656E746174696F6E(.+)6F66666963653A76657273696F6E3D22312E30' 
			},
			{ 
				PUID:292,
				params: { 
					description: 'ODF presentation',
					extensions: [ 'ODP' ],
					mime: 'application/vnd.oasis.opendocument.presentation',
					version: 1.0,
					type: 'Presentation with version number'
				},
				regex: '^504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E70726573656E746174696F6E(.+)6F66666963653A76657273696F6E3D22312E3122' 
			},
			{ 
				PUID:292,
				params: { 
					description: 'ODF presentation',
					extensions: [ 'OTP' ],
					mime: 'application/vnd.oasis.opendocument.presentation-template',
					version: 1.0,
					type: 'Template with version number'
				},
				regex: '^504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E70726573656E746174696F6E(.+)6F66666963653A76657273696F6E3D22312E3122' 
			},
			{ 
				PUID:292,
				params: { 
					description: 'ODF presentation',
					extensions: [ 'ODP' ],
					mime: 'application/vnd.oasis.opendocument.presentation',
					version: 1.1,
					type: 'Presentation without version number'
				},
				regex: '^504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E70726573656E746174696F6E' 
			},
			{ 
				PUID:292,
				params: { 
					description: 'ODF presentation',
					extensions: [ 'OTP' ],
					mime: 'application/vnd.oasis.opendocument.presentation-template',
					version: 1.1,
					type: 'Template without version number'
				},
				regex: '^504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E70726573656E746174696F6E' 
			},
			{ 
				PUID:293,
				params: { 
					description: 'ODF presentation',
					extensions: [ 'ODP' ],
					mime: 'application/vnd.oasis.opendocument.presentation',
					version: 1.2,
					type: 'Presentation'
				},
				regex: '^504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E70726573656E746174696F6E(.+)6F66666963653A76657273696F6E3D22312E3222'
			}, 
			{ 
				PUID:293,
				params: { 
					description: 'ODF presentation',
					extensions: [ 'OTP' ],
					mime: 'application/vnd.oasis.opendocument.presentation-template',
					version: 1.2,
					type: 'Template'
				},
				regex: '^504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E70726573656E746174696F6E(.+)6F66666963653A76657273696F6E3D22312E3222'
			}
		]
	},
	
	// ... spreadsheet
	_00001A00051004: { 
		params: { 
			description: 'Lotus 1-2-3 (v9)',
			extensions: [ '123' ],
			mime: 'application/vnd.lotus-1-2-3'
		} 
	},
	
	// Excel
	_09: { 
		params: { 
			description: 'MS Excel spreadsheet',
			extensions: [ 'XLS', 'XLW' ],
			mime: 'application/vnd.ms-excel' 
		},
		specs: [ 
			{
				PUID: 55,
				params: { 
					type: 'BIFF Worksheet 2',
					version: 2.0,
					versionsIncluded: [2.1]
				},
				regex: '^09000400.{2}1000' 
			},
			{ 
				PUID: 56,
				params: { 
					type: 'BIFF Worksheet 3',
					version: 3.0
				},
				regex: '^09020600.{2}1000' 
			},
			{ 
				PUID: 57,
				params: { 
					type: 'BIFF Worksheet 4',
					version: 4.0
				},
				regex: '^09040600.{2}1000' 
			},
			{ 
				PUID: 58,
				params: { 
					type: 'BIFF Workbook 4',
					version: 4.0
				},
				regex: '^0904060000040001' 
			},
			{ 
				PUID: 59,
				params: { 
					type: 'BIFF Workbook 5 & 7, generic',
					version: 5.0,
					versionsIncluded: [95]
				},
				regex: '^0908.{2}00050500' 
			},
			{ 
				PUID: 61,
				params: { 
					type: 'BIFF 8 & 8X Workbook, generic',
					version: 97,
					versionsIncluded: [2000]
				},
				regex: '^0908.{2}00060500' 
			},
			{ 
				PUID: 62,
				params: { 
					type: 'BIFF 8 & 8X Workbook, generic',
					version: 2000,
					versionsIncluded: [2002]
				},
				regex: '^0908.{2}00060500'
			}
		] 
	},
	
	_504B0304: { // Open XML ...
		params: { 
			description: 'Open XML spreadsheet (OpenDocument Format, MS Excel 2007 onwards)',
			extensions: [ 'XLSX', 'XLSM', 'XLSB', 'XLS', 'XLW' ],
			mime: 'application/vnd.ms-excel',
			version: 2007 
		},
		specs: [ 
			{
				PUID: 137,
				params: { 
					description: 'ODF spreadsheet',
					extensions: [ 'ODS' ],
					version: 1.0,
					type: 'Spreadsheet',
					mime: 'application/vnd.oasis.opendocument.spreadsheet' 
				},
				regex: '^504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E7370726561647368656574(.+)6F66666963653A76657273696F6E3D22312E30' 
			},
			{
				PUID: 137,
				params: { 
					description: 'ODF spreadsheet',
					extensions: [ 'OTS' ],
					version: 1.0,
					type: 'Template',
					mime: 'application/vnd.oasis.opendocument.spreadsheet-template' 
				},
				regex: '^504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E7370726561647368656574(.+)6F66666963653A76657273696F6E3D22312E30' 
			},
			{ 
				PUID:294,
				params: { 
					description: 'ODF spreadsheet',
					extensions: [ 'ODS' ],
					version: 1.1,
					type: 'Spreadsheet, with version number',
					mime: 'application/vnd.oasis.opendocument.spreadsheet' 
				},
				regex: '^504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E7370726561647368656574504B030414(.+)6F66666963653A76657273696F6E3D22312E3122' 
			},
			{ 
				PUID:294,
				params: { 
					description: 'ODF spreadsheet',
					extensions: [ 'OTS' ],
					version: 1.1,
					type: 'Template, with version number',
					mime: 'application/vnd.oasis.opendocument.spreadsheet-template' 
				},
				regex: '^504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E7370726561647368656574504B030414(.+)6F66666963653A76657273696F6E3D22312E3122' 
			},
			{ 
				PUID:294,
				params: { 
					description: 'ODF 1.1 spreadsheet (without version number)',
					extensions: [ 'ODS' ],
					version: 1.1,
					type: 'Spreadsheet, without version number',
					mime: 'application/vnd.oasis.opendocument.spreadsheet' 
				},
				regex: '^504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E7370726561647368656574504B030414' 
			},
			{ 
				PUID:294,
				params: { 
					description: 'ODF 1.1 spreadsheet (without version number)',
					extensions: [ 'OTS' ],
					version: 1.1,
					type: 'Template',
					mime: 'application/vnd.oasis.opendocument.spreadsheet-template' 
				},
				regex: '^504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E7370726561647368656574504B030414' 
			},
			{ 
				PUID:295,
				params: { 
					description: 'ODF 1.2 spreadsheet',
					extensions: [ 'ODS' ],
					version: 1.2,
					type: 'Spreadsheet',
					mime: 'application/vnd.oasis.opendocument.spreadsheet' 
				},
				regex: '^504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E7370726561647368656574504B030414(.+)6F66666963653A76657273696F6E3D22312E3222'
			},
			{ 
				PUID:295,
				params: { 
					description: 'ODF 1.2 spreadsheet',
					extensions: [ 'OTS' ],
					version: 1.2,
					type: 'Template',
					mime: 'application/vnd.oasis.opendocument.spreadsheet-template' 
				},
				regex: '^504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E7370726561647368656574504B030414(.+)6F66666963653A76657273696F6E3D22312E3222'
			},
			{
				PUID: 214,
				params: { 
					extensions: [ 'XLSX', 'XLS', 'XLW' ],
					mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
					type: 'Standard'
				}
			},
			{ 
				PUID: 445,
				params: { 
					extensions: [ 'XLSM', 'XLS', 'XLW' ],
					mime: 'application/vnd.ms-excel.sheet.macroEnabled.12',
					type: 'Macro-Enabled'
				}
			},
			{ 
				PUID: 595,
				params: { 
					extensions: [ 'XLSB', 'XLS', 'XLW' ],
					mime: 'application/vnd.ms-excel.sheet.binary.macroEnabled.12',
					type: 'Binary Workbook, Non-XML'
				}
			},
		]
	},
	
	// ... database
	_504B0304: { // Open XML ... 
		params: { 
			description: 'ODF 1.0 database',
			extensions: [ 'ODB' ],
			mime: 'application/vnd.oasis.opendocument.database' 
		},
		specs: [ 
			{
				PUID: 140,
				regex: '^504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E73756E2E786D6C2E62617365(.+)6F66666963653A76657273696F6E3D22312E30'
			} 
		] 
	},
	_2F2F203C212D2D203C6D64623A6D6F726B3A7A20: { 
		params: { 
			description: 'Epson Mork Database',
			extensions: [ 'MSF', 'DAT' ],
			mime: 'application/vnd.epson.msf' 
		},
		specs: { PUID: 612 },
	},
	_1A0000040000: { 
		params: { 
			description: 'Lotus Notes database',
			extensions: [ 'NSF' ],
			mime: 'application/vnd.lotus-notes'
		} 
	},
	_414F4C564D313030: { 
		params: { 
			description: 'AOL personal file cabinet',
			extensions: [ 'ORG' ],
			mime: 'application/vnd.lotus-organizer'
		} 
	},
	
	
	// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
	// TODO	
	_FF00020004040554: { 
		params: { 
			description: 'Works for Windows spreadsheet',
			extensions: [ 'WKS' ],
			mime: 'application/vnd.ms-works' 
		},
		specs: [ { PUID: 166 }, { PUID: 167 }, { PUID: 168 }, { PUID: 220 }, { PUID: 227 }, { PUID: 228 }, { PUID: 229 }, { PUID: 230 }, { PUID: 231 }, { PUID: 247 }, { PUID: 250 }, { PUID: 253 }, { PUID: 257 }, { PUID: 262 }, { PUID: 263 }, { PUID: 264 }, { PUID: 270 }, { PUID: 271 } ],
		SP: [ 
			{
				PUID: 166,
				params: { 
					description: 'Microsoft Works Spreadsheet 1-5',
				},
				regex: '(00|FF)0002000404055402'
			} 
		] 
	},
	_E574B53: { 
		params: { 
			description: 'DeskMate Worksheet',
			extensions: [ 'WKS' ],
			mime: 'application/vnd.ms-works' 
		},
		specs: [ { PUID: 166 }, { PUID: 167 }, { PUID: 168 }, { PUID: 220 }, { PUID: 227 }, { PUID: 228 }, { PUID: 229 }, { PUID: 230 }, { PUID: 231 }, { PUID: 247 }, { PUID: 250 }, { PUID: 253 }, { PUID: 257 }, { PUID: 262 }, { PUID: 263 }, { PUID: 264 }, { PUID: 270 }, { PUID: 271 } ],
		SP: [ 
			{
				PUID: 166,
				params: { 
					description: 'Microsoft Works Spreadsheet 1-5',
				},
				regex: '(00|FF)0002000404055402'
			} 
		] 
	},
	
// TODO - belongs to OLE !!!	
	
	// OLE contained PUB
	__D0CF11E0A1B11AE1: {
		params: {
			description: 'MS Publisher for Windows 6.0 - 2002',
			extensions: [ 'PUB' ],
			mime: 'application/x-mspublisher' 
		},
		specs: [],
		// TODO has x-fmt 252 - 257		
	},
	// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 

	_465753: { 
		params: { 
			description: 'Shockwave Flash player (SWF)',
			extensions: [ 'SWF' ],
			mime: 'application/x-shockwave-flash' 
		},
		specs: [ 
			{
				PUID: 104,
				params: { version: 1.0, type:'Standard' },
				regex: '46575301' 
			},
			{ 
				PUID:105,
				params: { version: 2.0, type:'Standard' },
				regex: '46575302' 
			},
			{ 
				PUID:106,
				params: { version: 3.0, type:'Standard' },
				regex: '46575303' 
			},
			{ 
				PUID:107,
				params: { version: 4.0, type:'Standard' },
				regex: '46575304' 
			},
			{ 
				PUID:108,
				params: { version: 5.0, type:'Standard' },
				regex: '46575305' 
			},
			{ 
				PUID:109,
				params: { version: 1.0, type:'Standard'},
				regex: '46575306' 
			},
			{ 
				PUID:109,
				params: { version: 6.0, type:'Zlib compressed' },
				regex: '43575306' 
			},
			{ 
				PUID:110,
				params: { version: 7.0, type:'Standard' },
				regex: '46575307' 
			},
			{ 
				PUID:110,
				params: { version: 7.0, type:'Zlib compressed' },
				regex: '43575307' 
			},
			{ 
				PUID:505,
				params: { version: 8.0, type:'Standard' },
				regex: '46575308' 
			},
			{ 
				PUID:505,
				params: { version: 8.0, type:'Zlib compressed' },
				regex: '43575308' 
			},
			{ 
				PUID:506,
				params: { version: 9.0, type:'Standard' },
				regex: '46575309' 
			},
			{ 
				PUID:506,
				params: { version: 9.0, type:'Zlib compressed' },
				regex: '43575309' 
			},
			{ 
				PUID:507,
				params: { version: 10.0, type:'Standard' },
				regex: '46575310' 
			},
			{ 
				PUID:507,
				params: { version: 10.0, type:'Zlib compressed' },
				regex: '43575310'
			} 
		] 
	},
	x_director: { 
		params: { 
			description: '',
			extensions: 
				 [ 'DIR', 'DCR', 'CST', 'CCT', 'CXT', 'W3D', 'FGD', 'SWA' ],
			mime: 'application/x-director' 
		},
		specs: [ { PUID: 192 }, { PUID: 314 }, { PUID: 315 }, { PUID: 317 }, { PUID: 486 } ],
		SP: [ 
			{
				PUID: 314,
				params: { 
					description: 'Play Sid Audio Version 1',
				},
				regex: '5053494400010076' 
			},
			{ 
				PUID:315,
				params: { 
					description: 'Play Sid Audio Version 2',
				},
				regex: '5053494400(01|02)007C' 
			},
			{ 
				PUID:317,
				params: { 
					description: 'Macromedia Director Macintosh',
				},
				regex: '58464952.{4}3339564D70616D6918000000010000002C' 
			},
			{ 
				PUID:486,
				params: { 
					description: 'Macromedia Director DCR Windows',
				},
				regex: '52494658.{4}4647444D' 
			},
			{ 
				PUID:486,
				params: { 
					description: 'Macromedia Director DCR Macintosh',
				},
				regex: '58464952.{4}4D444746'
			} 
		] 
	},
	
	
	
	_74424D504B6E5772: { 
		params: { 
			description: 'PathWay Map file',
			extensions: [ 'PRC' ],
			mime: 'application/x-mobipocket-ebook' 
		},
		specs: { PUID: 396 },
		SP: [ 
			{
				PUID: 396,
				params: { 
					description: 'mobi/prc \'BOOKMOBI\'',
				},
				regex: '424F4F4B4D4F4249' 
			},
			{ 
				PUID:396,
				params: { 
					description: 'mobi/prc \'TEXTREAD\'',
				},
				regex: '5445587452454164'
			} 
		] 
	},
	_424F4F4B4D4F4249: { 
		params: { 
			description: 'Palmpilot resource file',
			extensions: [ 'PRC' ],
			mime: 'application/x-mobipocket-ebook',
			type: 'BOOKMOBI' 
		},
		specs: { PUID: 396 }
	},
	_5445587452454164: { 
		params: { 
			description: 'Palmpilot resource file',
			extensions: [ 'PRC' ],
			mime: 'application/x-mobipocket-ebook',
			type: 'TEXTREAD' 
		},
		specs: { PUID: 396 }
	},
	_4C4E0200: { 
		params: { 
			description: 'Windows Help file',
			extensions: [ 'HLP' ],
			mime: 'application/winhlp',
			version: 3.0 
		},
		specs: { PUID: 474 }
	},
	_3F5F0300: { 
		params: { 
			description: 'Windows Help file',
			extensions: [ 'HLP' ],
			mime: 'application/winhlp',
			version: 2.0 
		},
		specs: { PUID: 474 }
	},
	_0000FFFFFFFF: { 
		params: { 
			description: 'Windows Help file',
			extensions: [ 'HLP' ],
			mime: 'application/winhlp',
			version: 2.0 
		},
		specs: { PUID: 474 }
	},
	_44617461626173652056657273696F6E: {
		params: { 
			description: 'PowerProject Teamplan',
			extensions: [ 'PDB' ],
			mime: '' // ? TODO 
		},
		specs: [ 
			{
				PUID: 510,
				params: { 
					description: 'PowerProject Teamplan',
				},
				regex: '44617461626173652056657273696F6E.{15}61EA'
			} 
		] 
	},
	_434446: { 
		params: { 
			description: '',
			extensions: [ 'NC', 'CDF' ],
			mime: 'application/x-netcdf' 
		},
		 specs: [ 
			{
				PUID: 282,
				params: { 
					description: 'netCDF-3 Classic',
				},
				regex: '43444601' 
			},
			{ 
				PUID:283,
				params: { description: 'netCDF-3 64-bit'},
				regex: '43444602'
			} 
		] 
	},
	geogebra_file: { 
		params: { 
			description: '',
			extensions: [ 'GGB' ],
			mime: 'application/vnd.geogebra.file' 
		},
		specs: [ { PUID: 617 }, { PUID: 619 }, { PUID: 620 }, { PUID: 621 }, { PUID: 622 } ] 
	},
	geogebra_tool: { 
		params: { 
			description: '',
			extensions: [ 'GGT' ],
			mime: 'application/vnd.geogebra.tool'
		} 
	},
	ms_excel_addin_macroenabled_12: { 
		params: { 
			description: '',
			extensions: [ 'XLAM' ],
			mime: 'application/vnd.ms-excel.addin.macroenabled.12' 
		},
		specs: { PUID: 628 } 
	},
	ms_excel_sheet_binary_macroenabled_12: { 
		params: { 
			description: '',
			extensions: [ 'XLSB' ],
			mime: 'application/vnd.ms-excel.sheet.binary.macroenabled.12' 
		},
		specs: { PUID: 595 } 
	},
	ms_excel_sheet_macroenabled_12: { 
		params: { 
			description: '',
			extensions: [ 'XLSM' ],
			mime: 'application/vnd.ms-excel.sheet.macroenabled.12' 
		},
		specs: { PUID: 445 } 
	},
	ms_excel_template_macroenabled_12: { 
		params: { 
			description: '',
			extensions: [ 'XLTM' ],
			mime: 'application/vnd.ms-excel.template.macroenabled.12' 
		},
		specs: { PUID: 627 } 
	},
	ms_officetheme: { 
		params: { 
			description: '',
			extensions: [ 'THMX' ],
			mime: 'application/vnd.ms-officetheme' 
		},
		specs: { PUID: 524 } 
	},
	_30xxx: { 
		params: { 
			description: 'MS security catalog file',
			extensions: [ 'CAT' ],
			mime: 'application/vnd.ms-pki.seccat' 
		},
		specs: { PUID: 452 }	
	},
	ms_powerpoint_addin_macroenabled_12: { 
		params: { 
			description: '',
			extensions: [ 'PPAM' ],
			mime: 'application/vnd.ms-powerpoint.addin.macroenabled.12' 
		},
		specs: { PUID: 633 } 
	},
	ms_powerpoint_presentation_macroenabled_12: { 
		params: { 
			description: '',
			extensions: [ 'PPTM' ],
			mime: 'application/vnd.ms-powerpoint.presentation.macroenabled.12' 
		},
		specs: { PUID: 487 } 
	},
	ms_powerpoint_slide_macroenabled_12: { 
		params: { 
			description: '',
			extensions: [ 'SLDM' ],
			mime: 'application/vnd.ms-powerpoint.slide.macroenabled.12' 
		},
		specs: { PUID: 636 } 
	},
	ms_powerpoint_slideshow_macroenabled_12: { 
		params: { 
			description: '',
			extensions: [ 'PPSM' ],
			mime: 'application/vnd.ms-powerpoint.slideshow.macroenabled.12' 
		},
		specs: { PUID: 630 } 
	},
	ms_powerpoint_template_macroenabled_12: { 
		params: { 
			description: '',
			extensions: [ 'POTM' ],
			mime: 'application/vnd.ms-powerpoint.template.macroenabled.12' 
		},
		specs: { PUID: 632 } 
	},
	ms_project: { 
		params: { 
			description: '',
			extensions: [ 'MPP', 'MPT' ],
			mime: 'application/vnd.ms-project' 
		},
		specs: { PUID: 440 } 
	},
	ms_word_document_macroenabled_12: { 
		params: { 
			description: '',
			extensions: [ 'DOCM' ],
			mime: 'application/vnd.ms-word.document.macroenabled.12' 
		},
		specs: { PUID: 523 } 
	},
	ms_word_template_macroenabled_12: { 
		params: { 
			description: '',
			extensions: [ 'DOTM' ],
			mime: 'application/vnd.ms-word.template.macroenabled.12' 
		},
		specs: { PUID: 599 } 
	},
	openxmlformats_officedocument_presentationml_slideshow: { 
		params: { 
			description: '',
			extensions: [ 'PPSX' ],
			mime: 'application/vnd.openxmlformats-officedocument.presentationml.slideshow' 
		},
		specs: { PUID: 629 } 
	},
	openxmlformats_officedocument_presentationml_template: { 
		params: { 
			description: '',
			extensions: [ 'POTX' ],
			mime: 'application/vnd.openxmlformats-officedocument.presentationml.template' 
		},
		specs: { PUID: 631 } 
	},
	openxmlformats_officedocument_spreadsheetml_template: { 
		params: { 
			description: '',
			extensions: [ 'XLTX' ],
			mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.template' 
		},
		specs: { PUID: 598 } 
	},
	openxmlformats_officedocument_wordprocessingml_template: { 
		params: { 
			description: '',
			extensions: [ 'DOTX' ],
			mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.template' 
		},
		specs: { PUID: 597 } 
	},
	pg_format: { 
		params: { 
			description: '',
			extensions: [ 'STR' ],
			mime: 'application/vnd.pg.format' 
		},
		specs: { PUID: 210 } 
	},
	syncml_dm_xml: { 
		params: { 
			description: '',
			extensions: [ 'XDM' ],
			mime: 'application/vnd.syncml.dm+xml' 
		},
		specs: { PUID: 401 },
		SP: [ 
			{
				PUID: 401,
				params: { 
					description: 'X-Windows Screen Dump X11',
				},
				regex: '000000??00000007000000(00|01|02)000000[01:20].{12}000000(00|01)000000(08|10|20)000000(00|01)000000(08|10|20)000000(01|02|03|04|05|06|07|08|09|0A|0B|0C|0D|0E|0F|10|18|20){4}000000[00:05]'
			} 
		] 
	},
	vcx: { 
		params: { 
			description: '',
			extensions: [ 'VCX' ],
			mime: 'application/vnd.vcx' 
		},
		specs: { PUID: 379 },
		SP: [ 
			{
				PUID: 379,
				params: { 
					description: 'Microsoft Visual FoxPro Class Library',
				},
				regex: '30??[01:0C][01:1F].{28}504C4154464F524D00000043{20}554E49515545494400000043{52}434C4153530000000000004D'
			} 
		] 
	},
	x_cpio: { 
		params: { 
			description: '',
			extensions: [ 'CPIO' ],
			mime: 'application/x-cpio' 
		},
		specs: { PUID: 635 },
		SP: [ 
			{
				PUID: 635,
				params: { description: 'CPIO'},
				regex: 'C771'
			} 
		] 
	},
	x_dvi: { 
		params: { 
			description: '',
			extensions: [ 'DVI' ],
			mime: 'application/x-dvi' 
		},
		specs: { PUID: 160 },
		SP: [ 
			{
				PUID: 160,
				params: { 
					description: 'TeX/LaTeX Device-Independent Document',
				},
				regex: 'F702'
			} 
		] 
	},
	x_font_otf: { 
		params: { 
			description: '',
			extensions: [ 'OTF' ],
			mime: 'application/x-font-otf' 
		},
		specs: { PUID: 520 },
		SP: [ 
			{
				PUID: 520,
				params: { 
					description: 'OpenType Font File',
				},
				regex: '4F54544F.{8-40}43464620'
			} 
		] 
	},
	x_font_type1: { 
		params: { 
			description: '',
			extensions: 
				 [ 'PFA', 'PFB', 'PFM', 'AFM' ],
			mime: 'application/x-font-type1' 
		},
		 	specs: [ { PUID: 509 }, { PUID: 525 } ],
		SP: [ 
			{
				PUID: 509,
				params: { description: 'Adobe PFM'},
				regex: '0001.{64}81000A002C012C01{43}1E00' 
			},
			{ 
				PUID:525,
				params: { 
					description: 'Adobe Printer Font Binary',
				},
				regex: '8001.{4}252150532D41646F6265466F6E742D312E30'
			} 
		] 
	},
	font_woff: { 
		params: { 
			description: '',
			extensions: [ 'WOFF' ],
			mime: 'application/font-woff' 
		},
		specs: { PUID: 616 },
		SP: [ 
			{
				PUID: 616,
				params: { 
					description: 'Web Open Font Format',
				},
				regex: '774F4646'
			} 
		] 
	},
	x_font_bdf: { 
		params: { 
			description: '',
			extensions: [ 'BDF' ],
			mime: 'application/x-font-bdf'
		} 
	},
	x_font_ghostscript: { 
		params: { 
			description: '',
			extensions: [ 'GSF' ],
			mime: 'application/x-font-ghostscript'
		} 
	},
	x_font_linux_psf: { 
		params: { 
			description: '',
			extensions: [ 'PSF' ],
			mime: 'application/x-font-linux-psf'
		} 
	},
	x_font_pcf: { 
		params: { 
			description: '',
			extensions: [ 'PCF' ],
			mime: 'application/x-font-pcf'
		} 
	},
	x_font_snf: { 
		params: { 
			description: '',
			extensions: [ 'SNF' ],
			mime: 'application/x-font-snf'
		} 
	},
	x_font_ttf: { 
		params: { 
			description: '',
			extensions: [ 'TTF', 'TTC' ],
			mime: 'application/x-font-ttf'
		} 
	},
	
	
	
	_8A0109000000E108: { 
		params: { 
			description: 'MS Answer Wizard',
			extensions: [ 'AW' ],
			mime: 'application/applixware'
		} 
	},
	_CAFEBABE: { 
		params: { 
			description: 'Java bytecode',
			extensions: [ 'CLASS' ],
			mime: 'application/java-vm'
		} 
	},
	_56657273696F6E20: { 
		params: { 
			description: 'MapInfo Interchange Format file',
			extensions: [ 'MIF' ],
			mime: 'application/vnd.mif'
		} 
	},
	_736D5F: { 
		params: { 
			description: 'PalmOS SuperMemo',
			extensions: [ 'PDB' ],
			mime: 'application/vnd.palm' 
		}
	},
	_4D6963726F736F667420432F432B2B20: { 
		params: { 
			description: 'MS C++ debugging symbols file',
			extensions: [ 'PDB' ],
			mime: '' 
		} 
	},
	_4D2D5720506F636B: { 
		params: { 
			description: 'Merriam-Webster Pocket Dictionary',
			extensions: [ 'PDB' ],
			mime: '' 
		}
	},
	_ACED000573720012: { 
		params: { 
			description: 'BGBlitz (Backgammon) position database file',
			extensions: [ 'PDB' ],
			mime: '' 
		}
	},
	_737A657A: { 
		params: { 
			description: 'PowerBASIC Debugger Symbols',
			extensions: [ 'PDB' ],
			mime: '' 
		}
	},
	_4E616D653A20: { 
		params: { 
			description: 'Agent newsreader character map',
			extensions: [ 'COD' ],
			mime: 'application/vnd.rim.cod'
		} 
	},
	_2E524D46: { 
		params: { 
			description: 'RealMedia streaming media',
			extensions: [ 'RMVB' ],
			mime: 'application/vnd.rn-realmedia-vbr'
		} 
	},
	_4D4D4D440000: { 
		params: { 
			description: 'Yamaha Synthetic music Mobile Application Format',
			extensions: [ 'MMF' ],
			mime: 'application/vnd.smaf'
		} 
	},
	_58435000: { 
		params: { 
			description: 'Packet sniffer files',
			extensions: [ 'CAP' ],
			mime: 'application/vnd.tcpdump.pcap'
		} 
	},
	_52545353: { 
		params: { 
			description: 'WinNT Netmon capture file',
			extensions: [ 'CAP' ],
			mime: 'application/vnd.tcpdump.pcap'
		} 
	},
	_504147454455: { 
		params: { 
			description: 'Windows memory dump',
			extensions: [ 'DMP' ],
			mime: 'application/vnd.tcpdump.pcap'
		} 
	},
	_4D444D5093A7: { 
		params: { 
			description: 'Windows dump file',
			extensions: [ 'DMP' ],
			mime: 'application/vnd.tcpdump.pcap'
		} 
	},
	_FF575043: { 
		params: { 
			description: 'WordPerfect text and graphics',
			extensions: [ 'WPD' ],
			mime: 'application/vnd.wordperfect'
		} 
	},
	_454E545259564344: { 
		params: { 
			description: 'VideoVCD|VCDImager file',
			extensions: [ 'VCD' ],
			mime: 'application/x-cdlink'
		} 
	},
	_6375736800000002: { 
		params: { 
			description: 'Photoshop Custom Shape',
			extensions: [ 'CSH' ],
			mime: 'application/x-csh'
		} 
	},
	
	// TODO ?
	_00000100: { 
		params: { 
			description: 'Windows icon|printer spool file',
			extensions: [ 'SPL' ],
			mime: 'application/x-futuresplash'
		} 
	},
	_4C00000001140200: { 
		params: { 
			description: 'Windows shortcut file',
			extensions: [ 'LNK' ],
			mime: 'application/x-ms-shortcut'
		} 
	},
	_000100005374616E64617264204A6574204442: { 
		params: { 
			description: 'Microsoft Access',
			extensions: [ 'MDB' ],
			mime: 'application/x-msaccess'
		} 
	},
	_E8: { 
		params: { 
			description: 'Windows executable file_1',
			extensions: [ 'COM' ],
			mime: 'application/x-msdownload'
		} 
	},
	_4D5A: { 
		params: { 
			description: 'Windows|DOS executable file',
			extensions: [ 'DLL' ],
			mime: 'application/x-msdownload'
		} 
	},
	_EB: { 
		params: { 
			description: 'Windows executable file_3',
			extensions: [ 'COM' ],
			mime: 'application/x-msdownload'
		} 
	},
	_E9: { 
		params: { 
			description: 'Windows executable file_2',
			extensions: [ 'COM' ],
			mime: 'application/x-msdownload'
		} 
	},
	_2320: { 
		params: { 
			description: 'Cerius2 file',
			extensions: [ 'MSI' ],
			mime: 'application/x-msdownload'
		} 
	},
	_D7CDC69A: { 
		params: { 
			description: 'Windows graphics metafile',
			extensions: [ 'WMF' ],
			mime: 'application/x-msmetafile'
		} 
	},
	_000100004D534953414D204461746162617365: { 
		params: { 
			description: 'Microsoft Money file',
			extensions: [ 'MNY' ],
			mime: 'application/x-msmoney'
		} 
	},
	_BE000000AB: { 
		params: { 
			description: 'MS Write file_3',
			extensions: [ 'WRI' ],
			mime: 'application/x-mswrite'
		} 
	},
	_32BE: { 
		params: { 
			description: 'MS Write file_2',
			extensions: [ 'WRI' ],
			mime: 'application/x-mswrite'
		} 
	},
	_31BE: { 
		params: { 
			description: 'MS Write file_1',
			extensions: [ 'WRI' ],
			mime: 'application/x-mswrite'
		} 
	},
	/* TODO
	_80: { 
		params: { 
			description: 'Relocatable object code',
			extensions: [ 'OBJ' ],
			mime: 'application/x-tgif'
		} 
	},
	_4C01: { 
		params: { 
			description: 'MS COFF relocatable object code',
			extensions: [ 'OBJ' ],
			mime: 'application/x-tgif'
		} 
	},
	*/
	_0764743264647464: { 
		params: { 
			description: 'DesignTools 2D Design file',
			extensions: [ 'DTD' ],
			mime: 'application/xml-dtd'
		} 
	},
	
	
// TODO - NO or WEAK signature	
	
	xara: { 
		// TODO see PUID 600
		params: { 
			description: '',
			extensions: [ 'XAR' ],
			mime: 'application/vnd.xara' 
		}
	},
	lotus_freelance: { 
		params: { 
			description: '',
			extensions: [ 'PRE' ],
			mime: 'application/vnd.lotus-freelance'
		} 
	},
	lotus_screencam: { 
		params: { 
			description: '',
			extensions: [ 'SCM' ],
			mime: 'application/vnd.lotus-screencam'
		} 
	},
	mseq: { 
		params: { 
			description: '',
			extensions: [ 'MSEQ' ],
			mime: 'application/vnd.mseq'
		} 
	},
	wsdl_xml: { 
		params: { 
			description: '',
			extensions: [ 'WSDL' ],
			mime: 'application/wsdl+xml'
		} 
	},
	wspolicy_xml: { 
		params: { 
			description: '',
			extensions: [ 'WSPOLICY' ],
			mime: 'application/wspolicy+xml'
		} 
	},
	x_java_jnlp_file: { 
		params: { 
			description: '',
			extensions: [ 'JNLP' ],
			mime: 'application/x-java-jnlp-file'
		} 
	},
	x_ms_application: { 
		params: { 
			description: '',
			extensions: [ 'APPLICATION' ],
			mime: 'application/x-ms-application'
		} 
	},
	x_msmediaview: { 
		params: { 
			description: '',
			extensions: [ 'MVB', 'M13', 'M14' ],
			mime: 'application/x-msmediaview'
		} 
	},
	x_msschedule: { 
		params: { 
			description: '',
			extensions: [ 'SCD' ],
			mime: 'application/x-msschedule'
		} 
	},
	x_msterminal: { 
		params: { 
			description: '',
			extensions: [ 'TRM' ],
			mime: 'application/x-msterminal'
		} 
	},
	x_silverlight_app: { 
		params: { 
			description: '',
			extensions: [ 'XAP' ],
			mime: 'application/x-silverlight-app'
		} 
	},
	andrew_inset: { 
		params: { 
			description: '',
			extensions: [ 'EZ' ],
			mime: 'application/andrew-inset'
		} 
	},
	atom_xml: { 
		params: { 
			description: '',
			extensions: [ 'ATOM' ],
			mime: 'application/atom+xml'
		} 
	},
	atomcat_xml: { 
		params: { 
			description: '',
			extensions: [ 'ATOMCAT' ],
			mime: 'application/atomcat+xml'
		} 
	},
	atomsvc_xml: { 
		params: { 
			description: '',
			extensions: [ 'ATOMSVC' ],
			mime: 'application/atomsvc+xml'
		} 
	},
	ccxml_xml: { 
		params: { 
			description: '',
			extensions: [ 'CCXML' ],
			mime: 'application/ccxml+xml'
		} 
	},
	cdmi_capability: { 
		params: { 
			description: '',
			extensions: [ 'CDMIA' ],
			mime: 'application/cdmi-capability'
		} 
	},
	cdmi_container: { 
		params: { 
			description: '',
			extensions: [ 'CDMIC' ],
			mime: 'application/cdmi-container'
		} 
	},
	cdmi_domain: { 
		params: { 
			description: '',
			extensions: [ 'CDMID' ],
			mime: 'application/cdmi-domain'
		} 
	},
	cdmi_object: { 
		params: { 
			description: '',
			extensions: [ 'CDMIO' ],
			mime: 'application/cdmi-object'
		} 
	},
	cdmi_queue: { 
		params: { 
			description: '',
			extensions: [ 'CDMIQ' ],
			mime: 'application/cdmi-queue'
		} 
	},
	cu_seeme: { 
		params: { 
			description: '',
			extensions: [ 'CU' ],
			mime: 'application/cu-seeme'
		} 
	},
	davmount_xml: { 
		params: { 
			description: '',
			extensions: [ 'DAVMOUNT' ],
			mime: 'application/davmount+xml'
		} 
	},
	docbook_xml: { 
		params: { 
			description: '',
			extensions: [ 'DBK' ],
			mime: 'application/docbook+xml'
		} 
	},
	dssc_der: { 
		params: { 
			description: '',
			extensions: [ 'DSSC' ],
			mime: 'application/dssc+der'
		} 
	},
	dssc_xml: { 
		params: { 
			description: '',
			extensions: [ 'XDSSC' ],
			mime: 'application/dssc+xml'
		} 
	},
	emma_xml: { 
		params: { 
			description: '',
			extensions: [ 'EMMA' ],
			mime: 'application/emma+xml'
		} 
	},
	exi: { 
		params: { 
			description: '',
			extensions: [ 'EXI' ],
			mime: 'application/exi'
		} 
	},
	font_tdpfr: { 
		params: { 
			description: '',
			extensions: [ 'PFR' ],
			mime: 'application/font-tdpfr'
		} 
	},
	gml_xml: { 
		params: { 
			description: '',
			extensions: [ 'GML' ],
			mime: 'application/gml+xml'
		} 
	},
	gxf: { 
		params: { 
			description: '',
			extensions: [ 'GXF' ],
			mime: 'application/gxf'
		} 
	},
	hyperstudio: { 
		params: { 
			description: '',
			extensions: [ 'STK' ],
			mime: 'application/hyperstudio'
		} 
	},
	inkml_xml: { 
		params: { 
			description: '',
			extensions: [ 'INK', 'INKML' ],
			mime: 'application/inkml+xml'
		} 
	},
	ipfix: { 
		params: { 
			description: '',
			extensions: [ 'IPFIX' ],
			mime: 'application/ipfix'
		} 
	},
	java_serialized_object: { 
		params: { 
			description: '',
			extensions: [ 'SER' ],
			mime: 'application/java-serialized-object'
		} 
	},
	json: { 
		params: { 
			description: '',
			extensions: [ 'JSON' ],
			mime: 'application/json'
		} 
	},
	jsonml_json: { 
		params: { 
			description: '',
			extensions: [ 'JSONML' ],
			mime: 'application/jsonml+json'
		} 
	},
	lost_xml: { 
		params: { 
			description: '',
			extensions: [ 'LOSTXML' ],
			mime: 'application/lost+xml'
		} 
	},
	mads_xml: { 
		params: { 
			description: '',
			extensions: [ 'MADS' ],
			mime: 'application/mads+xml'
		} 
	},
	marc: { 
		params: { 
			description: '',
			extensions: [ 'MRC' ],
			mime: 'application/marc'
		} 
	},
	marcxml_xml: { 
		params: { 
			description: '',
			extensions: [ 'MRCX' ],
			mime: 'application/marcxml+xml'
		} 
	},
	mathematica: { 
		params: { 
			description: '',
			extensions: [ 'MA', 'NB', 'MB' ],
			mime: 'application/mathematica' 
		},
		specs: { PUID: 201 } 
	},
	mathml_xml: { 
		params: { 
			description: '',
			extensions: [ 'MATHML' ],
			mime: 'application/mathml+xml'
		} 
	},
	mbox: { 
		params: { 
			description: '',
			extensions: [ 'MBOX' ],
			mime: 'application/mbox'
		} 
	},
	mediaservercontrol_xml: { 
		params: { 
			description: '',
			extensions: [ 'MSCML' ],
			mime: 'application/mediaservercontrol+xml'
		} 
	},
	metalink_xml: { 
		params: { 
			description: '',
			extensions: [ 'METALINK' ],
			mime: 'application/metalink+xml'
		} 
	},
	metalink4_xml: { 
		params: { 
			description: '',
			extensions: [ 'META4' ],
			mime: 'application/metalink4+xml'
		} 
	},
	mets_xml: { 
		params: { 
			description: '',
			extensions: [ 'METS' ],
			mime: 'application/mets+xml'
		} 
	},
	mods_xml: { 
		params: { 
			description: '',
			extensions: [ 'MODS' ],
			mime: 'application/mods+xml'
		} 
	},
	mp21: { 
		params: { 
			description: '',
			extensions: [ 'M21', 'MP21' ],
			mime: 'application/mp21'
		} 
	},
	mp4: { 
		params: { 
			description: '',
			extensions: [ 'MP4S' ],
			mime: 'application/mp4'
		} 
	},
	oda: { 
		params: { 
			description: '',
			extensions: [ 'ODA' ],
			mime: 'application/oda'
		} 
	},
	oebps_package_xml: { 
		params: { 
			description: '',
			extensions: [ 'OPF' ],
			mime: 'application/oebps-package+xml' 
		},
		specs: { PUID: 207 } 
	},
	omdoc_xml: { 
		params: { 
			description: '',
			extensions: [ 'OMDOC' ],
			mime: 'application/omdoc+xml'
		} 
	},
	onenote: { 
		params: { 
			description: '',
			extensions: 
				 [ 'ONETOC', 'ONETOC2', 'ONETMP', 'ONEPKG' ],
			mime: 'application/onenote'
		} 
	},
	oxps: { 
		params: { 
			description: '',
			extensions: [ 'OXPS' ],
			mime: 'application/oxps'
		} 
	},
	patch_ops_error_xml: { 
		params: { 
			description: '',
			extensions: [ 'XER' ],
			mime: 'application/patch-ops-error+xml'
		} 
	},
	
	pgp_encrypted: { 
		params: { 
			description: '',
			extensions: [ 'PGP' ],
			mime: 'application/pgp-encrypted'
		} 
	},
	pgp_signature: { 
		params: { 
			description: '',
			extensions: [ 'ASC', 'SIG' ],
			mime: 'application/pgp-signature'
		} 
	},
	pics_rules: { 
		params: { 
			description: '',
			extensions: [ 'PRF' ],
			mime: 'application/pics-rules'
		} 
	},
	_64000000: { 
		params: { 
			description: 'Intel PROset|Wireless Profile',
			extensions: [ 'P10' ],
			mime: 'application/pkcs10'
		} 
	},
	pkcs7_mime: { 
		params: { 
			description: '',
			extensions: [ 'P7M', 'P7C' ],
			mime: 'application/pkcs7-mime'
		} 
	},
	pkcs7_signature: { 
		params: { 
			description: '',
			extensions: [ 'P7S' ],
			mime: 'application/pkcs7-signature'
		} 
	},
	pkcs8: { 
		params: { 
			description: '',
			extensions: [ 'P8' ],
			mime: 'application/pkcs8'
		} 
	},
	pkix_cert: { 
		params: { 
			description: '',
			extensions: [ 'CER' ],
			mime: 'application/pkix-cert'
		} 
	},
	pkix_crl: { 
		params: { 
			description: '',
			extensions: [ 'CRL' ],
			mime: 'application/pkix-crl'
		} 
	},
	pkix_pkipath: { 
		params: { 
			description: '',
			extensions: [ 'PKIPATH' ],
			mime: 'application/pkix-pkipath'
		} 
	},
	pkixcmp: { 
		params: { 
			description: '',
			extensions: [ 'PKI' ],
			mime: 'application/pkixcmp'
		} 
	},
	pls_xml: { 
		params: { 
			description: '',
			extensions: [ 'PLS' ],
			mime: 'application/pls+xml'
		} 
	},
	prs_cww: { 
		params: { 
			description: '',
			extensions: [ 'CWW' ],
			mime: 'application/prs.cww'
		} 
	},
	pskc_xml: { 
		params: { 
			description: '',
			extensions: [ 'PSKCXML' ],
			mime: 'application/pskc+xml'
		} 
	},
	rdf_xml: { 
		params: { 
			description: '',
			extensions: [ 'RDF' ],
			mime: 'application/rdf+xml'
		} 
	},
	reginfo_xml: { 
		params: { 
			description: '',
			extensions: [ 'RIF' ],
			mime: 'application/reginfo+xml'
		} 
	},
	relax_ng_compact_syntax: { 
		params: { 
			description: '',
			extensions: [ 'RNC' ],
			mime: 'application/relax-ng-compact-syntax'
		} 
	},
	resource_lists_xml: { 
		params: { 
			description: '',
			extensions: [ 'RL' ],
			mime: 'application/resource-lists+xml'
		} 
	},
	resource_lists_diff_xml: { 
		params: { 
			description: '',
			extensions: [ 'RLD' ],
			mime: 'application/resource-lists-diff+xml'
		} 
	},
	rls_services_xml: { 
		params: { 
			description: '',
			extensions: [ 'RS' ],
			mime: 'application/rls-services+xml'
		} 
	},
	rpki_ghostbusters: { 
		params: { 
			description: '',
			extensions: [ 'GBR' ],
			mime: 'application/rpki-ghostbusters'
		} 
	},
	rpki_manifest: { 
		params: { 
			description: '',
			extensions: [ 'MFT' ],
			mime: 'application/rpki-manifest'
		} 
	},
	rpki_roa: { 
		params: { 
			description: '',
			extensions: [ 'ROA' ],
			mime: 'application/rpki-roa'
		} 
	},
	rsd_xml: { 
		params: { 
			description: '',
			extensions: [ 'RSD' ],
			mime: 'application/rsd+xml'
		} 
	},
	rss_xml: { 
		params: { 
			description: '',
			extensions: [ 'RSS' ],
			mime: 'application/rss+xml'
		} 
	},
	sbml_xml: { 
		params: { 
			description: '',
			extensions: [ 'SBML' ],
			mime: 'application/sbml+xml'
		} 
	},
	scvp_cv_request: { 
		params: { 
			description: '',
			extensions: [ 'SCQ' ],
			mime: 'application/scvp-cv-request'
		} 
	},
	scvp_cv_response: { 
		params: { 
			description: '',
			extensions: [ 'SCS' ],
			mime: 'application/scvp-cv-response'
		} 
	},
	scvp_vp_request: { 
		params: { 
			description: '',
			extensions: [ 'SPQ' ],
			mime: 'application/scvp-vp-request'
		} 
	},
	scvp_vp_response: { 
		params: { 
			description: '',
			extensions: [ 'SPP' ],
			mime: 'application/scvp-vp-response'
		} 
	},
	sdp: { 
		params: { 
			description: '',
			extensions: [ 'SDP' ],
			mime: 'application/sdp'
		} 
	},
	set_payment_initiation: { 
		params: { 
			description: '',
			extensions: [ 'SETPAY' ],
			mime: 'application/set-payment-initiation'
		} 
	},
	set_registration_initiation: { 
		params: { 
			description: '',
			extensions: [ 'SETREG' ],
			mime: 'application/set-registration-initiation'
		} 
	},
	shf_xml: { 
		params: { 
			description: '',
			extensions: [ 'SHF' ],
			mime: 'application/shf+xml'
		} 
	},
	sparql_query: { 
		params: { 
			description: '',
			extensions: [ 'RQ' ],
			mime: 'application/sparql-query'
		} 
	},
	sparql_results_xml: { 
		params: { 
			description: '',
			extensions: [ 'SRX' ],
			mime: 'application/sparql-results+xml'
		} 
	},
	srgs: { 
		params: { 
			description: '',
			extensions: [ 'GRAM' ],
			mime: 'application/srgs'
		} 
	},
	srgs_xml: { 
		params: { 
			description: '',
			extensions: [ 'GRXML' ],
			mime: 'application/srgs+xml'
		} 
	},
	sru_xml: { 
		params: { 
			description: '',
			extensions: [ 'SRU' ],
			mime: 'application/sru+xml'
		} 
	},
	ssdl_xml: { 
		params: { 
			description: '',
			extensions: [ 'SSDL' ],
			mime: 'application/ssdl+xml'
		} 
	},
	ssml_xml: { 
		params: { 
			description: '',
			extensions: [ 'SSML' ],
			mime: 'application/ssml+xml'
		} 
	},
	tei_xml: { 
		params: { 
			description: '',
			extensions: [ 'TEI', 'TEICORPUS' ],
			mime: 'application/tei+xml'
		} 
	},
	thraud_xml: { 
		params: { 
			description: '',
			extensions: [ 'TFI' ],
			mime: 'application/thraud+xml'
		} 
	},
	timestamped_data: { 
		params: { 
			description: '',
			extensions: [ 'TSD' ],
			mime: 'application/timestamped-data'
		} 
	},
	_3gpp_pic_bw_large: { 
		params: { 
			description: '',
			extensions: [ 'PLB' ],
			mime: 'application/vnd.3gpp.pic-bw-large'
		} 
	},
	_3gpp_pic_bw_small: { 
		params: { 
			description: '',
			extensions: [ 'PSB' ],
			mime: 'application/vnd.3gpp.pic-bw-small'
		} 
	},
	_3gpp_pic_bw_var: { 
		params: { 
			description: '',
			extensions: [ 'PVB' ],
			mime: 'application/vnd.3gpp.pic-bw-var'
		} 
	},
	_3gpp2_tcap: { 
		params: { 
			description: '',
			extensions: [ 'TCAP' ],
			mime: 'application/vnd.3gpp2.tcap'
		} 
	},
	_3m_post_it_notes: { 
		params: { 
			description: '',
			extensions: [ 'PWN' ],
			mime: 'application/vnd.3m.post-it-notes'
		} 
	},
	accpac_simply_aso: { 
		params: { 
			description: '',
			extensions: [ 'ASO' ],
			mime: 'application/vnd.accpac.simply.aso'
		} 
	},
	accpac_simply_imp: { 
		params: { 
			description: '',
			extensions: [ 'IMP' ],
			mime: 'application/vnd.accpac.simply.imp'
		} 
	},
	acucobol: { 
		params: { 
			description: '',
			extensions: [ 'ACU' ],
			mime: 'application/vnd.acucobol'
		} 
	},
	acucorp: { 
		params: { 
			description: '',
			extensions: [ 'ATC', 'ACUTC' ],
			mime: 'application/vnd.acucorp'
		} 
	},
	adobe_air_application_installer_package_zip: { 
		params: { 
			description: '',
			extensions: [ 'AIR' ],
			mime: 'application/vnd.adobe.air-application-installer-package+zip'
		} 
	},
	adobe_formscentral_fcdt: { 
		params: { 
			description: '',
			extensions: [ 'FCDT' ],
			mime: 'application/vnd.adobe.formscentral.fcdt'
		} 
	},
	adobe_fxp: { 
		params: { 
			description: '',
			extensions: [ 'FXP', 'FXPL' ],
			mime: 'application/vnd.adobe.fxp'
		} 
	},
	adobe_xdp_xml: { 
		params: { 
			description: '',
			extensions: [ 'XDP' ],
			mime: 'application/vnd.adobe.xdp+xml'
		} 
	},
	adobe_xfdf: { 
		params: { 
			description: '',
			extensions: [ 'XFDF' ],
			mime: 'application/vnd.adobe.xfdf'
		} 
	},
	ahead_space: { 
		params: { 
			description: '',
			extensions: [ 'AHEAD' ],
			mime: 'application/vnd.ahead.space'
		} 
	},
	airzip_filesecure_azf: { 
		params: { 
			description: '',
			extensions: [ 'AZF' ],
			mime: 'application/vnd.airzip.filesecure.azf'
		} 
	},
	airzip_filesecure_azs: { 
		params: { 
			description: '',
			extensions: [ 'AZS' ],
			mime: 'application/vnd.airzip.filesecure.azs'
		} 
	},
	amazon_ebook: { 
		params: { 
			description: '',
			extensions: [ 'AZW' ],
			mime: 'application/vnd.amazon.ebook'
		} 
	},
	americandynamics_acc: { 
		params: { 
			description: '',
			extensions: [ 'ACC' ],
			mime: 'application/vnd.americandynamics.acc'
		} 
	},
	amiga_ami: { 
		params: { 
			description: '',
			extensions: [ 'AMI' ],
			mime: 'application/vnd.amiga.ami'
		} 
	},
	android_package_archive: { 
		params: { 
			description: '',
			extensions: [ 'APK' ],
			mime: 'application/vnd.android.package-archive'
		} 
	},
	anser_web_certificate_issue_initiation: { 
		params: { 
			description: '',
			extensions: [ 'CII' ],
			mime: 'application/vnd.anser-web-certificate-issue-initiation'
		} 
	},
	anser_web_funds_transfer_initiation: { 
		params: { 
			description: '',
			extensions: [ 'FTI' ],
			mime: 'application/vnd.anser-web-funds-transfer-initiation'
		} 
	},
	antix_game_component: { 
		params: { 
			description: '',
			extensions: [ 'ATX' ],
			mime: 'application/vnd.antix.game-component'
		} 
	},
	apple_installer_xml: { 
		params: { 
			description: '',
			extensions: [ 'MPKG' ],
			mime: 'application/vnd.apple.installer+xml'
		} 
	},
	apple_mpegurl: { 
		params: { 
			description: '',
			extensions: [ 'M3U8' ],
			mime: 'application/vnd.apple.mpegurl'
		} 
	},
	aristanetworks_swi: { 
		params: { 
			description: '',
			extensions: [ 'SWI' ],
			mime: 'application/vnd.aristanetworks.swi'
		} 
	},
	astraea_software_iota: { 
		params: { 
			description: '',
			extensions: [ 'IOTA' ],
			mime: 'application/vnd.astraea-software.iota'
		} 
	},
	audiograph: { 
		params: { 
			description: '',
			extensions: [ 'AEP' ],
			mime: 'application/vnd.audiograph'
		} 
	},
	blueice_multipass: { 
		params: { 
			description: '',
			extensions: [ 'MPM' ],
			mime: 'application/vnd.blueice.multipass'
		} 
	},
	bmi: { 
		params: { 
			description: '',
			extensions: [ 'BMI' ],
			mime: 'application/vnd.bmi'
		} 
	},
	businessobjects: { 
		params: { 
			description: '',
			extensions: [ 'REP' ],
			mime: 'application/vnd.businessobjects'
		} 
	},
	chemdraw_xml: { 
		params: { 
			description: '',
			extensions: [ 'CDXML' ],
			mime: 'application/vnd.chemdraw+xml'
		} 
	},
	chipnuts_karaoke_mmd: { 
		params: { 
			description: '',
			extensions: [ 'MMD' ],
			mime: 'application/vnd.chipnuts.karaoke-mmd'
		} 
	},
	cinderella: { 
		params: { 
			description: '',
			extensions: [ 'CDY' ],
			mime: 'application/vnd.cinderella'
		} 
	},
	claymore: { 
		params: { 
			description: '',
			extensions: [ 'CLA' ],
			mime: 'application/vnd.claymore'
		} 
	},
	cloanto_rp9: { 
		params: { 
			description: '',
			extensions: [ 'RP9' ],
			mime: 'application/vnd.cloanto.rp9'
		} 
	},
	cluetrust_cartomobile_config: { 
		params: { 
			description: '',
			extensions: [ 'C11AMC' ],
			mime: 'application/vnd.cluetrust.cartomobile-config'
		} 
	},
	cluetrust_cartomobile_config_pkg: { 
		params: { 
			description: '',
			extensions: [ 'C11AMZ' ],
			mime: 'application/vnd.cluetrust.cartomobile-config-pkg'
		} 
	},
	commonspace: { 
		params: { 
			description: '',
			extensions: [ 'CSP' ],
			mime: 'application/vnd.commonspace'
		} 
	},
	contact_cmsg: { 
		params: { 
			description: '',
			extensions: [ 'CDBCMSG' ],
			mime: 'application/vnd.contact.cmsg'
		} 
	},
	cosmocaller: { 
		params: { 
			description: '',
			extensions: [ 'CMC' ],
			mime: 'application/vnd.cosmocaller'
		} 
	},
	crick_clicker: { 
		params: { 
			description: '',
			extensions: [ 'CLKX' ],
			mime: 'application/vnd.crick.clicker'
		} 
	},
	crick_clicker_keyboard: { 
		params: { 
			description: '',
			extensions: [ 'CLKK' ],
			mime: 'application/vnd.crick.clicker.keyboard'
		} 
	},
	crick_clicker_palette: { 
		params: { 
			description: '',
			extensions: [ 'CLKP' ],
			mime: 'application/vnd.crick.clicker.palette'
		} 
	},
	crick_clicker_template: { 
		params: { 
			description: '',
			extensions: [ 'CLKT' ],
			mime: 'application/vnd.crick.clicker.template'
		} 
	},
	crick_clicker_wordbank: { 
		params: { 
			description: '',
			extensions: [ 'CLKW' ],
			mime: 'application/vnd.crick.clicker.wordbank'
		} 
	},
	criticaltools_wbs_xml: { 
		params: { 
			description: '',
			extensions: [ 'WBS' ],
			mime: 'application/vnd.criticaltools.wbs+xml'
		} 
	},
	ctc_posml: { 
		params: { 
			description: '',
			extensions: [ 'PML' ],
			mime: 'application/vnd.ctc-posml'
		} 
	},
	cups_ppd: { 
		params: { 
			description: '',
			extensions: [ 'PPD' ],
			mime: 'application/vnd.cups-ppd'
		} 
	},
	curl_car: { 
		params: { 
			description: '',
			extensions: [ 'CAR' ],
			mime: 'application/vnd.curl.car'
		} 
	},
	curl_pcurl: { 
		params: { 
			description: '',
			extensions: [ 'PCURL' ],
			mime: 'application/vnd.curl.pcurl'
		} 
	},
	dart: { 
		params: { 
			description: '',
			extensions: [ 'DART' ],
			mime: 'application/vnd.dart'
		} 
	},
	data_vision_rdz: { 
		params: { 
			description: '',
			extensions: [ 'RDZ' ],
			mime: 'application/vnd.data-vision.rdz'
		} 
	},
	dece_data: { 
		params: { 
			description: '',
			extensions: 
				 [ 'UVF', 'UVVF', 'UVD', 'UVVD' ],
			mime: 'application/vnd.dece.data'
		} 
	},
	dece_ttml_xml: { 
		params: { 
			description: '',
			extensions: [ 'UVT', 'UVVT' ],
			mime: 'application/vnd.dece.ttml+xml'
		} 
	},
	dece_unspecified: { 
		params: { 
			description: '',
			extensions: [ 'UVX', 'UVVX' ],
			mime: 'application/vnd.dece.unspecified'
		} 
	},
	dece_zip: { 
		params: { 
			description: '',
			extensions: [ 'UVZ', 'UVVZ' ],
			mime: 'application/vnd.dece.zip'
		} 
	},
	denovo_fcselayout_link: { 
		params: { 
			description: '',
			extensions: [ 'FE_LAUNCH' ],
			mime: 'application/vnd.denovo.fcselayout-link'
		} 
	},
	dna: { 
		params: { 
			description: '',
			extensions: [ 'DNA' ],
			mime: 'application/vnd.dna'
		} 
	},
	dolby_mlp: { 
		params: { 
			description: '',
			extensions: [ 'MLP' ],
			mime: 'application/vnd.dolby.mlp'
		} 
	},
	dpgraph: { 
		params: { 
			description: '',
			extensions: [ 'DPG' ],
			mime: 'application/vnd.dpgraph'
		} 
	},
	dreamfactory: { 
		params: { 
			description: '',
			extensions: [ 'DFAC' ],
			mime: 'application/vnd.dreamfactory'
		} 
	},
	ds_keypoint: { 
		params: { 
			description: '',
			extensions: [ 'KPXX' ],
			mime: 'application/vnd.ds-keypoint'
		} 
	},
	dvb_ait: { 
		params: { 
			description: '',
			extensions: [ 'AIT' ],
			mime: 'application/vnd.dvb.ait'
		} 
	},
	dvb_service: { 
		params: { 
			description: '',
			extensions: [ 'SVC' ],
			mime: 'application/vnd.dvb.service'
		} 
	},
	ecowin_chart: { 
		params: { 
			description: '',
			extensions: [ 'MAG' ],
			mime: 'application/vnd.ecowin.chart'
		} 
	},
	enliven: { 
		params: { 
			description: '',
			extensions: [ 'NML' ],
			mime: 'application/vnd.enliven'
		} 
	},
	epson_esf: { 
		params: { 
			description: '',
			extensions: [ 'ESF' ],
			mime: 'application/vnd.epson.esf'
		} 
	},
	epson_quickanime: { 
		params: { 
			description: '',
			extensions: [ 'QAM' ],
			mime: 'application/vnd.epson.quickanime'
		} 
	},
	epson_salt: { 
		params: { 
			description: '',
			extensions: [ 'SLT' ],
			mime: 'application/vnd.epson.salt'
		} 
	},
	epson_ssf: { 
		params: { 
			description: '',
			extensions: [ 'SSF' ],
			mime: 'application/vnd.epson.ssf'
		} 
	},
	eszigno3_xml: { 
		params: { 
			description: '',
			extensions: [ 'ES3', 'ET3' ],
			mime: 'application/vnd.eszigno3+xml'
		} 
	},
	ezpix_album: { 
		params: { 
			description: '',
			extensions: [ 'EZ2' ],
			mime: 'application/vnd.ezpix-album'
		} 
	},
	ezpix_package: { 
		params: { 
			description: '',
			extensions: [ 'EZ3' ],
			mime: 'application/vnd.ezpix-package'
		} 
	},
	fdf: { 
		params: { 
			description: '',
			extensions: [ 'FDF' ],
			mime: 'application/vnd.fdf'
		} 
	},
	fdsn_mseed: { 
		params: { 
			description: '',
			extensions: [ 'MSEED' ],
			mime: 'application/vnd.fdsn.mseed'
		} 
	},
	fdsn_seed: { 
		params: { 
			description: '',
			extensions: [ 'SEED', 'DATALESS' ],
			mime: 'application/vnd.fdsn.seed'
		} 
	},
	flographit: { 
		params: { 
			description: '',
			extensions: [ 'GPH' ],
			mime: 'application/vnd.flographit'
		} 
	},
	fluxtime_clip: { 
		params: { 
			description: '',
			extensions: [ 'FTC' ],
			mime: 'application/vnd.fluxtime.clip'
		} 
	},
	frogans_fnc: { 
		params: { 
			description: '',
			extensions: [ 'FNC' ],
			mime: 'application/vnd.frogans.fnc'
		} 
	},
	frogans_ltf: { 
		params: { 
			description: '',
			extensions: [ 'LTF' ],
			mime: 'application/vnd.frogans.ltf'
		} 
	},
	fsc_weblaunch: { 
		params: { 
			description: '',
			extensions: [ 'FSC' ],
			mime: 'application/vnd.fsc.weblaunch'
		} 
	},
	fujitsu_oasys: { 
		params: { 
			description: '',
			extensions: [ 'OAS' ],
			mime: 'application/vnd.fujitsu.oasys'
		} 
	},
	fujitsu_oasys2: { 
		params: { 
			description: '',
			extensions: [ 'OA2' ],
			mime: 'application/vnd.fujitsu.oasys2'
		} 
	},
	fujitsu_oasys3: { 
		params: { 
			description: '',
			extensions: [ 'OA3' ],
			mime: 'application/vnd.fujitsu.oasys3'
		} 
	},
	fujitsu_oasysgp: { 
		params: { 
			description: '',
			extensions: [ 'FG5' ],
			mime: 'application/vnd.fujitsu.oasysgp'
		} 
	},
	fujitsu_oasysprs: { 
		params: { 
			description: '',
			extensions: [ 'BH2' ],
			mime: 'application/vnd.fujitsu.oasysprs'
		} 
	},
	fujixerox_ddd: { 
		params: { 
			description: '',
			extensions: [ 'DDD', 'DID', 'PDD' ],
			mime: 'application/vnd.fujixerox.ddd' 
		}
	},
	fujixerox_docuworks: { 
		params: { 
			description: '',
			extensions: [ 'XDW' ],
			mime: 'application/vnd.fujixerox.docuworks'
		} 
	},
	fujixerox_docuworks_binder: { 
		params: { 
			description: '',
			extensions: [ 'XBD' ],
			mime: 'application/vnd.fujixerox.docuworks.binder'
		} 
	},
	fuzzysheet: { 
		params: { 
			description: '',
			extensions: [ 'FZS' ],
			mime: 'application/vnd.fuzzysheet'
		} 
	},
	genomatix_tuxedo: { 
		params: { 
			description: '',
			extensions: [ 'TXD' ],
			mime: 'application/vnd.genomatix.tuxedo'
		} 
	},
	geometry_explorer: { 
		params: { 
			description: '',
			extensions: [ 'GEX', 'GRE' ],
			mime: 'application/vnd.geometry-explorer'
		} 
	},
	geonext: { 
		params: { 
			description: '',
			extensions: [ 'GXT' ],
			mime: 'application/vnd.geonext'
		} 
	},
	geoplan: { 
		params: { 
			description: '',
			extensions: [ 'G2W' ],
			mime: 'application/vnd.geoplan'
		} 
	},
	geospace: { 
		params: { 
			description: '',
			extensions: [ 'G3W' ],
			mime: 'application/vnd.geospace'
		} 
	},
	gmx: { 
		params: { 
			description: '',
			extensions: [ 'GMX' ],
			mime: 'application/vnd.gmx'
		} 
	},
	grafeq: { 
		params: { 
			description: '',
			extensions: [ 'GQF', 'GQS' ],
			mime: 'application/vnd.grafeq'
		} 
	},
	groove_account: { 
		params: { 
			description: '',
			extensions: [ 'GAC' ],
			mime: 'application/vnd.groove-account'
		} 
	},
	groove_help: { 
		params: { 
			description: '',
			extensions: [ 'GHF' ],
			mime: 'application/vnd.groove-help'
		} 
	},
	groove_identity_message: { 
		params: { 
			description: '',
			extensions: [ 'GIM' ],
			mime: 'application/vnd.groove-identity-message'
		} 
	},
	groove_injector: { 
		params: { 
			description: '',
			extensions: [ 'GRV' ],
			mime: 'application/vnd.groove-injector'
		} 
	},
	groove_tool_message: { 
		params: { 
			description: '',
			extensions: [ 'GTM' ],
			mime: 'application/vnd.groove-tool-message'
		} 
	},
	groove_tool_template: { 
		params: { 
			description: '',
			extensions: [ 'TPL' ],
			mime: 'application/vnd.groove-tool-template'
		} 
	},
	groove_vcard: { 
		params: { 
			description: '',
			extensions: [ 'VCG' ],
			mime: 'application/vnd.groove-vcard'
		} 
	},
	hal_xml: { 
		params: { 
			description: '',
			extensions: [ 'HAL' ],
			mime: 'application/vnd.hal+xml'
		} 
	},
	handheld_entertainment_xml: { 
		params: { 
			description: '',
			extensions: [ 'ZMM' ],
			mime: 'application/vnd.handheld-entertainment+xml'
		} 
	},
	hbci: { 
		params: { 
			description: '',
			extensions: [ 'HBCI' ],
			mime: 'application/vnd.hbci'
		} 
	},
	hhe_lesson_player: { 
		params: { 
			description: '',
			extensions: [ 'LES' ],
			mime: 'application/vnd.hhe.lesson-player'
		} 
	},
	hp_hpgl: { 
		params: { 
			description: '',
			extensions: [ 'HPGL' ],
			mime: 'application/vnd.hp-hpgl'
		} 
	},
	hp_hpPUID: { 
		params: { 
			description: '',
			extensions: [ 'HPID' ],
			mime: 'application/vnd.hp-hpid'
		} 
	},
	hp_hps: { 
		params: { 
			description: '',
			extensions: [ 'HPS' ],
			mime: 'application/vnd.hp-hps'
		} 
	},
	hp_jlyt: { 
		params: { 
			description: '',
			extensions: [ 'JLT' ],
			mime: 'application/vnd.hp-jlyt'
		} 
	},
	hp_pcl: { 
		params: { 
			description: '',
			extensions: [ 'PCL' ],
			mime: 'application/vnd.hp-pcl'
		} 
	},
	hp_pclxl: { 
		params: { 
			description: '',
			extensions: [ 'PCLXL' ],
			mime: 'application/vnd.hp-pclxl'
		} 
	},
	ibm_minipay: { 
		params: { 
			description: '',
			extensions: [ 'MPY' ],
			mime: 'application/vnd.ibm.minipay'
		} 
	},
	ibm_modcap: { 
		params: { 
			description: '',
			extensions: [ 'AFP', 'LISTAFP', 'LIST3820' ],
			mime: 'application/vnd.ibm.modcap'
		} 
	},
	ibm_rights_management: { 
		params: { 
			description: '',
			extensions: [ 'IRM' ],
			mime: 'application/vnd.ibm.rights-management'
		} 
	},
	ibm_secure_container: { 
		params: { 
			description: '',
			extensions: [ 'SC' ],
			mime: 'application/vnd.ibm.secure-container'
		} 
	},
	iccprofile: { 
		params: { 
			description: '',
			extensions: [ 'ICC', 'ICM' ],
			mime: 'application/vnd.iccprofile'
		} 
	},
	igloader: { 
		params: { 
			description: '',
			extensions: [ 'IGL' ],
			mime: 'application/vnd.igloader'
		} 
	},
	immervision_ivp: { 
		params: { 
			description: '',
			extensions: [ 'IVP' ],
			mime: 'application/vnd.immervision-ivp'
		} 
	},
	immervision_ivu: { 
		params: { 
			description: '',
			extensions: [ 'IVU' ],
			mime: 'application/vnd.immervision-ivu'
		} 
	},
	insors_igm: { 
		params: { 
			description: '',
			extensions: [ 'IGM' ],
			mime: 'application/vnd.insors.igm'
		} 
	},
	intercon_formnet: { 
		params: { 
			description: '',
			extensions: [ 'XPW', 'XPX' ],
			mime: 'application/vnd.intercon.formnet'
		} 
	},
	intergeo: { 
		params: { 
			description: '',
			extensions: [ 'I2G' ],
			mime: 'application/vnd.intergeo'
		} 
	},
	intu_qbo: { 
		params: { 
			description: '',
			extensions: [ 'QBO' ],
			mime: 'application/vnd.intu.qbo'
		} 
	},
	ipunplugged_rcprofile: { 
		params: { 
			description: '',
			extensions: [ 'RCPROFILE' ],
			mime: 'application/vnd.ipunplugged.rcprofile'
		} 
	},
	irepository_package_xml: { 
		params: { 
			description: '',
			extensions: [ 'IRP' ],
			mime: 'application/vnd.irepository.package+xml'
		} 
	},
	is_xpr: { 
		params: { 
			description: '',
			extensions: [ 'XPR' ],
			mime: 'application/vnd.is-xpr'
		} 
	},
	isac_fcs: { 
		params: { 
			description: '',
			extensions: [ 'FCS' ],
			mime: 'application/vnd.isac.fcs'
		} 
	},
	jam: { 
		params: { 
			description: '',
			extensions: [ 'JAM' ],
			mime: 'application/vnd.jam'
		} 
	},
	jcp_javame_midlet_rms: { 
		params: { 
			description: '',
			extensions: [ 'RMS' ],
			mime: 'application/vnd.jcp.javame.midlet-rms'
		} 
	},
	jisp: { 
		params: { 
			description: '',
			extensions: [ 'JISP' ],
			mime: 'application/vnd.jisp'
		} 
	},
	joost_joda_archive: { 
		params: { 
			description: '',
			extensions: [ 'JODA' ],
			mime: 'application/vnd.joost.joda-archive'
		} 
	},
	kahootz: { 
		params: { 
			description: '',
			extensions: [ 'KTZ', 'KTR' ],
			mime: 'application/vnd.kahootz'
		} 
	},
	kde_karbon: { 
		params: { 
			description: '',
			extensions: [ 'KARBON' ],
			mime: 'application/vnd.kde.karbon'
		} 
	},
	kde_kchart: { 
		params: { 
			description: '',
			extensions: [ 'CHRT' ],
			mime: 'application/vnd.kde.kchart'
		} 
	},
	kde_kformula: { 
		params: { 
			description: '',
			extensions: [ 'KFO' ],
			mime: 'application/vnd.kde.kformula'
		} 
	},
	kde_kivio: { 
		params: { 
			description: '',
			extensions: [ 'FLW' ],
			mime: 'application/vnd.kde.kivio'
		} 
	},
	kde_kontour: { 
		params: { 
			description: '',
			extensions: [ 'KON' ],
			mime: 'application/vnd.kde.kontour'
		} 
	},
	kde_kpresenter: { 
		params: { 
			description: '',
			extensions: [ 'KPR', 'KPT' ],
			mime: 'application/vnd.kde.kpresenter'
		} 
	},
	kde_kspread: { 
		params: { 
			description: '',
			extensions: [ 'KSP' ],
			mime: 'application/vnd.kde.kspread'
		} 
	},
	kenameaapp: { 
		params: { 
			description: '',
			extensions: [ 'HTKE' ],
			mime: 'application/vnd.kenameaapp'
		} 
	},
	kidspiration: { 
		params: { 
			description: '',
			extensions: [ 'KIA' ],
			mime: 'application/vnd.kidspiration'
		} 
	},
	kinar: { 
		params: { 
			description: '',
			extensions: [ 'KNE', 'KNP' ],
			mime: 'application/vnd.kinar'
		} 
	},
	koan: { 
		params: { 
			description: '',
			extensions: 
				 [ 'SKP', 'SKD', 'SKT', 'SKM' ],
			mime: 'application/vnd.koan'
		} 
	},
	kodak_descriptor: { 
		params: { 
			description: '',
			extensions: [ 'SSE' ],
			mime: 'application/vnd.kodak-descriptor'
		} 
	},
	las_las_xml: { 
		params: { 
			description: '',
			extensions: [ 'LASXML' ],
			mime: 'application/vnd.las.las+xml'
		} 
	},
	llamagraphics_life_balance_desktop: { 
		params: { 
			description: '',
			extensions: [ 'LBD' ],
			mime: 'application/vnd.llamagraphics.life-balance.desktop'
		} 
	},
	llamagraphics_life_balance_exchange_xml: { 
		params: { 
			description: '',
			extensions: [ 'LBE' ],
			mime: 'application/vnd.llamagraphics.life-balance.exchange+xml'
		} 
	},
	macports_portpkg: { 
		params: { 
			description: '',
			extensions: [ 'PORTPKG' ],
			mime: 'application/vnd.macports.portpkg'
		} 
	},
	mcd: { 
		params: { 
			description: '',
			extensions: [ 'MCD' ],
			mime: 'application/vnd.mcd'
		} 
	},
	medcalcdata: { 
		params: { 
			description: '',
			extensions: [ 'MC1' ],
			mime: 'application/vnd.medcalcdata'
		} 
	},
	mediastation_cdkey: { 
		params: { 
			description: '',
			extensions: [ 'CDKEY' ],
			mime: 'application/vnd.mediastation.cdkey'
		} 
	},
	mfer: { 
		params: { 
			description: '',
			extensions: [ 'MWF' ],
			mime: 'application/vnd.mfer'
		} 
	},
	mfmp: { 
		params: { 
			description: '',
			extensions: [ 'MFM' ],
			mime: 'application/vnd.mfmp'
		} 
	},
	micrografx_flo: { 
		params: { 
			description: '',
			extensions: [ 'FLO' ],
			mime: 'application/vnd.micrografx.flo'
		} 
	},
	micrografx_igx: { 
		params: { 
			description: '',
			extensions: [ 'IGX' ],
			mime: 'application/vnd.micrografx.igx'
		} 
	},
	mobius_daf: { 
		params: { 
			description: '',
			extensions: [ 'DAF' ],
			mime: 'application/vnd.mobius.daf'
		} 
	},
	mobius_dis: { 
		params: { 
			description: '',
			extensions: [ 'DIS' ],
			mime: 'application/vnd.mobius.dis'
		} 
	},
	mobius_mbk: { 
		params: { 
			description: '',
			extensions: [ 'MBK' ],
			mime: 'application/vnd.mobius.mbk'
		} 
	},
	mobius_mqy: { 
		params: { 
			description: '',
			extensions: [ 'MQY' ],
			mime: 'application/vnd.mobius.mqy'
		} 
	},
	mobius_msl: { 
		params: { 
			description: '',
			extensions: [ 'MSL' ],
			mime: 'application/vnd.mobius.msl'
		} 
	},
	mobius_plc: { 
		params: { 
			description: '',
			extensions: [ 'PLC' ],
			mime: 'application/vnd.mobius.plc' 
		}
	},
	mobius_txf: { 
		params: { 
			description: '',
			extensions: [ 'TXF' ],
			mime: 'application/vnd.mobius.txf'
		} 
	},
	mophun_application: { 
		params: { 
			description: '',
			extensions: [ 'MPN' ],
			mime: 'application/vnd.mophun.application'
		} 
	},
	mophun_certificate: { 
		params: { 
			description: '',
			extensions: [ 'MPC' ],
			mime: 'application/vnd.mophun.certificate'
		} 
	},
	mozilla_xul_xml: { 
		params: { 
			description: '',
			extensions: [ 'XUL' ],
			mime: 'application/vnd.mozilla.xul+xml'
		} 
	},
	ms_artgalry: { 
		params: { 
			description: '',
			extensions: [ 'CIL' ],
			mime: 'application/vnd.ms-artgalry'
		} 
	},
	ms_fontobject: { 
		params: { 
			description: '',
			extensions: [ 'EOT' ],
			mime: 'application/vnd.ms-fontobject'
		} 
	},
	ms_ims: { 
		params: { 
			description: '',
			extensions: [ 'IMS' ],
			mime: 'application/vnd.ms-ims'
		} 
	},
	ms_lrm: { 
		params: { 
			description: '',
			extensions: [ 'LRM' ],
			mime: 'application/vnd.ms-lrm'
		} 
	},
	ms_pki_stl: { 
		params: { 
			description: '',
			extensions: [ 'STL' ],
			mime: 'application/vnd.ms-pki.stl'
		} 
	}, 
	muvee_style: { 
		params: { 
			description: '',
			extensions: [ 'MSTY' ],
			mime: 'application/vnd.muvee.style'
		} 
	},
	mynfc: { 
		params: { 
			description: '',
			extensions: [ 'TAGLET' ],
			mime: 'application/vnd.mynfc'
		} 
	},
	neurolanguage_nlu: { 
		params: { 
			description: '',
			extensions: [ 'NLU' ],
			mime: 'application/vnd.neurolanguage.nlu'
		} 
	},
	noblenet_directory: { 
		params: { 
			description: '',
			extensions: [ 'NND' ],
			mime: 'application/vnd.noblenet-directory'
		} 
	},
	noblenet_sealer: { 
		params: { 
			description: '',
			extensions: [ 'NNS' ],
			mime: 'application/vnd.noblenet-sealer'
		} 
	},
	noblenet_web: { 
		params: { 
			description: '',
			extensions: [ 'NNW' ],
			mime: 'application/vnd.noblenet-web'
		} 
	},
	nokia_n_gage_data: { 
		params: { 
			description: '',
			extensions: [ 'NGDAT' ],
			mime: 'application/vnd.nokia.n-gage.data'
		} 
	},
	nokia_radio_preset: { 
		params: { 
			description: '',
			extensions: [ 'RPST' ],
			mime: 'application/vnd.nokia.radio-preset'
		} 
	},
	nokia_radio_presets: { 
		params: { 
			description: '',
			extensions: [ 'RPSS' ],
			mime: 'application/vnd.nokia.radio-presets'
		} 
	},
	novadigm_edm: { 
		params: { 
			description: '',
			extensions: [ 'EDM' ],
			mime: 'application/vnd.novadigm.edm'
		} 
	},
	novadigm_edx: { 
		params: { 
			description: '',
			extensions: [ 'EDX' ],
			mime: 'application/vnd.novadigm.edx'
		} 
	},
	novadigm_ext: { 
		params: { 
			description: '',
			extensions: [ 'EXT' ],
			mime: 'application/vnd.novadigm.extensions'
		} 
	},
	oasis_opendocument_chart: { 
		params: { 
			description: '',
			extensions: [ 'ODC' ],
			mime: 'application/vnd.oasis.opendocument.chart'
		} 
	},
	oasis_opendocument_chart_template: { 
		params: { 
			description: '',
			extensions: [ 'OTC' ],
			mime: 'application/vnd.oasis.opendocument.chart-template'
		} 
	},
	oasis_opendocument_formula: { 
		params: { 
			description: '',
			extensions: [ 'ODF' ],
			mime: 'application/vnd.oasis.opendocument.formula'
		} 
	},
	oasis_opendocument_formula_template: { 
		params: { 
			description: '',
			extensions: [ 'ODFT' ],
			mime: 'application/vnd.oasis.opendocument.formula-template'
		} 
	},
	oasis_opendocument_image: { 
		params: { 
			description: '',
			extensions: [ 'ODI' ],
			mime: 'application/vnd.oasis.opendocument.image'
		} 
	},
	oasis_opendocument_image_template: { 
		params: { 
			description: '',
			extensions: [ 'OTI' ],
			mime: 'application/vnd.oasis.opendocument.image-template'
		} 
	},
	oasis_opendocument_text_master: { 
		params: { 
			description: '',
			extensions: [ 'ODM' ],
			mime: 'application/vnd.oasis.opendocument.text-master'
		} 
	},
	oasis_opendocument_text_web: { 
		params: { 
			description: '',
			extensions: [ 'OTH' ],
			mime: 'application/vnd.oasis.opendocument.text-web'
		} 
	},
	olpc_sugar: { 
		params: { 
			description: '',
			extensions: [ 'XO' ],
			mime: 'application/vnd.olpc-sugar'
		} 
	},
	oma_dd2_xml: { 
		params: { 
			description: '',
			extensions: [ 'DD2' ],
			mime: 'application/vnd.oma.dd2+xml'
		} 
	},
	openofficeorg_extension: { 
		params: { 
			description: '',
			extensions: [ 'OXT' ],
			mime: 'application/vnd.openofficeorg.extension'
		} 
	},
	openxmlformats_officedocument_presentationml_slide: { 
		params: { 
			description: '',
			extensions: [ 'SLDX' ],
			mime: 'application/vnd.openxmlformats-officedocument.presentationml.slide'
		} 
	},
	osgeo_mapguide_package: { 
		params: { 
			description: '',
			extensions: [ 'MGP' ],
			mime: 'application/vnd.osgeo.mapguide.package'
		} 
	},
	osgi_dp: { 
		params: { 
			description: '',
			extensions: [ 'DP' ],
			mime: 'application/vnd.osgi.dp'
		} 
	},
	osgi_subsystem: { 
		params: { 
			description: '',
			extensions: [ 'ESA' ],
			mime: 'application/vnd.osgi.subsystem'
		} 
	},
	pawaafile: { 
		params: { 
			description: '',
			extensions: [ 'PAW' ],
			mime: 'application/vnd.pawaafile'
		} 
	},
	pg_osasli: { 
		params: { 
			description: '',
			extensions: [ 'EI6' ],
			mime: 'application/vnd.pg.osasli'
		} 
	},
	picsel: { 
		params: { 
			description: '',
			extensions: [ 'EFIF' ],
			mime: 'application/vnd.picsel'
		} 
	},
	pmi_widget: { 
		params: { 
			description: '',
			extensions: [ 'WG' ],
			mime: 'application/vnd.pmi.widget'
		} 
	},
	pocketlearn: { 
		params: { 
			description: '',
			extensions: [ 'PLF' ],
			mime: 'application/vnd.pocketlearn'
		} 
	},
	powerbuilder6: { 
		params: { 
			description: '',
			extensions: [ 'PBD' ],
			mime: 'application/vnd.powerbuilder6'
		} 
	},
	previewsystems_box: { 
		params: { 
			description: '',
			extensions: [ 'BOX' ],
			mime: 'application/vnd.previewsystems.box'
		} 
	},
	proteus_magazine: { 
		params: { 
			description: '',
			extensions: [ 'MGZ' ],
			mime: 'application/vnd.proteus.magazine'
		} 
	},
	publishare_delta_tree: { 
		params: { 
			description: '',
			extensions: [ 'QPS' ],
			mime: 'application/vnd.publishare-delta-tree'
		} 
	},
	pvi_ptid1: { 
		params: { 
			description: '',
			extensions: [ 'PTID' ],
			mime: 'application/vnd.pvi.ptid1'
		} 
	},
	realvnc_bed: { 
		params: { 
			description: '',
			extensions: [ 'BED' ],
			mime: 'application/vnd.realvnc.bed'
		} 
	},
	recordare_musicxml: { 
		params: { 
			description: '',
			extensions: [ 'MXL' ],
			mime: 'application/vnd.recordare.musicxml'
		} 
	},
	recordare_musicxml_xml: { 
		params: { 
			description: '',
			extensions: [ 'MUSICXML' ],
			mime: 'application/vnd.recordare.musicxml+xml'
		} 
	},
	rig_cryptonote: { 
		params: { 
			description: '',
			extensions: [ 'CRYPTONOTE' ],
			mime: 'application/vnd.rig.cryptonote'
		} 
	},
	route66_link66_xml: { 
		params: { 
			description: '',
			extensions: [ 'LINK66' ],
			mime: 'application/vnd.route66.link66+xml'
		} 
	},
	sailingtracker_track: { 
		params: { 
			description: '',
			extensions: [ 'ST' ],
			mime: 'application/vnd.sailingtracker.track'
		} 
	},
	seemail: { 
		params: { 
			description: '',
			extensions: [ 'SEE' ],
			mime: 'application/vnd.seemail'
		} 
	},
	sema: { 
		params: { 
			description: '',
			extensions: [ 'SEMA' ],
			mime: 'application/vnd.sema'
		} 
	},
	semd: { 
		params: { 
			description: '',
			extensions: [ 'SEMD' ],
			mime: 'application/vnd.semd'
		} 
	},
	semf: { 
		params: { 
			description: '',
			extensions: [ 'SEMF' ],
			mime: 'application/vnd.semf'
		} 
	},
	shana_informed_formdata: { 
		params: { 
			description: '',
			extensions: [ 'IFM' ],
			mime: 'application/vnd.shana.informed.formdata'
		} 
	},
	shana_informed_formtemplate: { 
		params: { 
			description: '',
			extensions: [ 'ITP' ],
			mime: 'application/vnd.shana.informed.formtemplate'
		} 
	},
	shana_informed_interchange: { 
		params: { 
			description: '',
			extensions: [ 'IIF' ],
			mime: 'application/vnd.shana.informed.interchange'
		} 
	},
	shana_informed_package: { 
		params: { 
			description: '',
			extensions: [ 'IPK' ],
			mime: 'application/vnd.shana.informed.package'
		} 
	},
	simtech_mindmapper: { 
		params: { 
			description: '',
			extensions: [ 'TWD', 'TWDS' ],
			mime: 'application/vnd.simtech-mindmapper'
		} 
	},
	smart_teacher: { 
		params: { 
			description: '',
			extensions: [ 'TEACHER' ],
			mime: 'application/vnd.smart.teacher'
		} 
	},
	solent_sdkm_xml: { 
		params: { 
			description: '',
			extensions: [ 'SDKM', 'SDKD' ],
			mime: 'application/vnd.solent.sdkm+xml'
		} 
	},
	spotfire_dxp: { 
		params: { 
			description: '',
			extensions: [ 'DXP' ],
			mime: 'application/vnd.spotfire.dxp'
		} 
	},
	spotfire_sfs: { 
		params: { 
			description: '',
			extensions: [ 'SFS' ],
			mime: 'application/vnd.spotfire.sfs'
		} 
	},
	stardivision_calc: { 
		params: { 
			description: '',
			extensions: [ 'SDC' ],
			mime: 'application/vnd.stardivision.calc'
		} 
	},
	stardivision_draw: { 
		params: { 
			description: '',
			extensions: [ 'SDA' ],
			mime: 'application/vnd.stardivision.draw'
		} 
	},
	stardivision_impress: { 
		params: { 
			description: '',
			extensions: [ 'SDD' ],
			mime: 'application/vnd.stardivision.impress'
		} 
	},
	stardivision_math: { 
		params: { 
			description: '',
			extensions: [ 'SMF' ],
			mime: 'application/vnd.stardivision.math'
		} 
	},
	stardivision_writer: { 
		params: { 
			description: '',
			extensions: [ 'SDW', 'VOR' ],
			mime: 'application/vnd.stardivision.writer'
		} 
	},
	stardivision_writer_global: { 
		params: { 
			description: '',
			extensions: [ 'SGL' ],
			mime: 'application/vnd.stardivision.writer-global'
		} 
	},
	stepmania_package: { 
		params: { 
			description: '',
			extensions: [ 'SMZIP' ],
			mime: 'application/vnd.stepmania.package'
		} 
	},
	stepmania_stepchart: { 
		params: { 
			description: '',
			extensions: [ 'SM' ],
			mime: 'application/vnd.stepmania.stepchart'
		} 
	},
	sun_xml_calc_template: { 
		params: { 
			description: '',
			extensions: [ 'STC' ],
			mime: 'application/vnd.sun.xml.calc.template'
		} 
	},
	sun_xml_draw_template: { 
		params: { 
			description: '',
			extensions: [ 'STD' ],
			mime: 'application/vnd.sun.xml.draw.template'
		} 
	},
	sun_xml_impress_template: { 
		params: { 
			description: '',
			extensions: [ 'STI' ],
			mime: 'application/vnd.sun.xml.impress.template'
		} 
	},
	sun_xml_math: { 
		params: { 
			description: '',
			extensions: [ 'SXM' ],
			mime: 'application/vnd.sun.xml.math'
		} 
	},
	sun_xml_writer_global: { 
		params: { 
			description: '',
			extensions: [ 'SXG' ],
			mime: 'application/vnd.sun.xml.writer.global'
		} 
	},
	sun_xml_writer_template: { 
		params: { 
			description: '',
			extensions: [ 'STW' ],
			mime: 'application/vnd.sun.xml.writer.template'
		} 
	},
	sus_calendar: { 
		params: { 
			description: '',
			extensions: [ 'SUS', 'SUSP' ],
			mime: 'application/vnd.sus-calendar'
		} 
	},
	svd: { 
		params: { 
			description: '',
			extensions: [ 'SVD' ],
			mime: 'application/vnd.svd'
		} 
	},
	symbian_install: { 
		params: { 
			description: '',
			extensions: [ 'SIS', 'SISX' ],
			mime: 'application/vnd.symbian.install'
		} 
	},
	syncml_xml: { 
		params: { 
			description: '',
			extensions: [ 'XSM' ],
			mime: 'application/vnd.syncml+xml'
		} 
	},
	syncml_dm_wbxml: { 
		params: { 
			description: '',
			extensions: [ 'BDM' ],
			mime: 'application/vnd.syncml.dm+wbxml'
		} 
	},
	
	tao_intent_module_archive: { 
		params: { 
			description: '',
			extensions: [ 'TAO' ],
			mime: 'application/vnd.tao.intent-module-archive'
		} 
	},
	tmobile_livetv: { 
		params: { 
			description: '',
			extensions: [ 'TMO' ],
			mime: 'application/vnd.tmobile-livetv'
		} 
	},
	trid_tpt: { 
		params: { 
			description: '',
			extensions: [ 'TPT' ],
			mime: 'application/vnd.trid.tpt'
		} 
	},
	triscape_mxs: { 
		params: { 
			description: '',
			extensions: [ 'MXS' ],
			mime: 'application/vnd.triscape.mxs'
		} 
	},
	trueapp: { 
		params: { 
			description: '',
			extensions: [ 'TRA' ],
			mime: 'application/vnd.trueapp'
		} 
	},
	ufdl: { 
		params: { 
			description: '',
			extensions: [ 'UFD', 'UFDL' ],
			mime: 'application/vnd.ufdl'
		} 
	},
	uiq_theme: { 
		params: { 
			description: '',
			extensions: [ 'UTZ' ],
			mime: 'application/vnd.uiq.theme'
		} 
	},
	umajin: { 
		params: { 
			description: '',
			extensions: [ 'UMJ' ],
			mime: 'application/vnd.umajin'
		} 
	},
	unity: { 
		params: { 
			description: '',
			extensions: [ 'UNITYWEB' ],
			mime: 'application/vnd.unity'
		} 
	},
	uoml_xml: { 
		params: { 
			description: '',
			extensions: [ 'UOML' ],
			mime: 'application/vnd.uoml+xml'
		} 
	},
	visionary: { 
		params: { 
			description: '',
			extensions: [ 'VIS' ],
			mime: 'application/vnd.visionary'
		} 
	},
	vsf: { 
		params: { 
			description: '',
			extensions: [ 'VSF' ],
			mime: 'application/vnd.vsf'
		} 
	},
	wap_wbxml: { 
		params: { 
			description: '',
			extensions: [ 'WBXML' ],
			mime: 'application/vnd.wap.wbxml'
		} 
	},
	wap_wmlc: { 
		params: { 
			description: '',
			extensions: [ 'WMLC' ],
			mime: 'application/vnd.wap.wmlc'
		} 
	},
	wap_wmlscriptc: { 
		params: { 
			description: '',
			extensions: [ 'WMLSC' ],
			mime: 'application/vnd.wap.wmlscriptc'
		} 
	},
	webturbo: { 
		params: { 
			description: '',
			extensions: [ 'WTB' ],
			mime: 'application/vnd.webturbo'
		} 
	},
	wolfram_player: { 
		params: { 
			description: '',
			extensions: [ 'NBP' ],
			mime: 'application/vnd.wolfram.player'
		} 
	},
	wqd: { 
		params: { 
			description: '',
			extensions: [ 'WQD' ],
			mime: 'application/vnd.wqd'
		} 
	},
	wt_stf: { 
		params: { 
			description: '',
			extensions: [ 'STF' ],
			mime: 'application/vnd.wt.stf'
		} 
	},
	xfdl: { 
		params: { 
			description: '',
			extensions: [ 'XFDL' ],
			mime: 'application/vnd.xfdl'
		} 
	},
	yamaha_hv_dic: { 
		params: { 
			description: '',
			extensions: [ 'HVD' ],
			mime: 'application/vnd.yamaha.hv-dic'
		} 
	},
	yamaha_hv_script: { 
		params: { 
			description: '',
			extensions: [ 'HVS' ],
			mime: 'application/vnd.yamaha.hv-script'
		} 
	},
	yamaha_hv_voice: { 
		params: { 
			description: '',
			extensions: [ 'HVP' ],
			mime: 'application/vnd.yamaha.hv-voice'
		} 
	},
	yamaha_openscoreformat: { 
		params: { 
			description: '',
			extensions: [ 'OSF' ],
			mime: 'application/vnd.yamaha.openscoreformat'
		} 
	},
	yamaha_openscoreformat_osfpvg_xml: { 
		params: { 
			description: '',
			extensions: [ 'OSFPVG' ],
			mime: 'application/vnd.yamaha.openscoreformat.osfpvg+xml'
		} 
	},
	yamaha_smaf_audio: { 
		params: { 
			description: '',
			extensions: [ 'SAF' ],
			mime: 'application/vnd.yamaha.smaf-audio'
		} 
	},
	yellowriver_custom_menu: { 
		params: { 
			description: '',
			extensions: [ 'CMP' ],
			mime: 'application/vnd.yellowriver-custom-menu'
		} 
	},
	zul: { 
		params: { 
			description: '',
			extensions: [ 'ZIR', 'ZIRZ' ],
			mime: 'application/vnd.zul'
		} 
	},
	zzazz_deck_xml: { 
		params: { 
			description: '',
			extensions: [ 'ZAZ' ],
			mime: 'application/vnd.zzazz.deck+xml'
		} 
	},
	voicexml_xml: { 
		params: { 
			description: '',
			extensions: [ 'VXML' ],
			mime: 'application/voicexml+xml'
		} 
	},
	widget: { 
		params: { 
			description: '',
			extensions: [ 'WGT' ],
			mime: 'application/widget'
		} 
	},
	x_abiword: { 
		params: { 
			description: '',
			extensions: [ 'ABW' ],
			mime: 'application/x-abiword'
		} 
	},
	x_ace_compressed: { 
		params: { 
			description: '',
			extensions: [ 'ACE' ],
			mime: 'application/x-ace-compressed'
		} 
	},
	x_authorware_bin: { 
		params: { 
			description: '',
			extensions: 
				 [ 'AAB', 'X32', 'U32', 'VOX' ],
			mime: 'application/x-authorware-bin'
		} 
	},
	x_authorware_map: { 
		params: { 
			description: '',
			extensions: [ 'AAM' ],
			mime: 'application/x-authorware-map'
		} 
	},
	x_authorware_seg: { 
		params: { 
			description: '',
			extensions: [ 'AAS' ],
			mime: 'application/x-authorware-seg'
		} 
	},
	x_bcpio: { 
		params: { 
			description: '',
			extensions: [ 'BCPIO' ],
			mime: 'application/x-bcpio'
		} 
	},
	x_bittorrent: { 
		params: { 
			description: '',
			extensions: [ 'TORRENT' ],
			mime: 'application/x-bittorrent'
		} 
	},
	x_blorb: { 
		params: { 
			description: '',
			extensions: [ 'BLB', 'BLORB' ],
			mime: 'application/x-blorb'
		} 
	},
	x_bzip: { 
		params: { 
			description: '',
			extensions: [ 'BZ' ],
			mime: 'application/x-bzip'
		} 
	},
	_425A68: { 
		params: { 
			description: 'bzip2 compressed archive',
			extensions: [ 'BZ2' ],
			mime: 'application/x-bzip2'
		} 
	},
	x_cbr: { 
		params: { 
			description: '',
			extensions: 
				 [ 'CBR', 'CBA', 'CBT', 'CBZ', 'CB7' ],
			mime: 'application/x-cbr'
		} 
	},
	x_cfs_compressed: { 
		params: { 
			description: '',
			extensions: [ 'CFS' ],
			mime: 'application/x-cfs-compressed'
		} 
	},
	x_chat: { 
		params: { 
			description: '',
			extensions: [ 'CHAT' ],
			mime: 'application/x-chat'
		} 
	},
	x_chess_pgn: { 
		params: { 
			description: '',
			extensions: [ 'PGN' ],
			mime: 'application/x-chess-pgn'
		} 
	},
	x_conference: { 
		params: { 
			description: '',
			extensions: [ 'NSC' ],
			mime: 'application/x-conference'
		} 
	}, 
	x_debian_package: { 
		params: { 
			description: '',
			extensions: [ 'DEB', 'UDEB' ],
			mime: 'application/x-debian-package'
		} 
	},
	x_dgc_compressed: { 
		params: { 
			description: '',
			extensions: [ 'DGC' ],
			mime: 'application/x-dgc-compressed'
		} 
	},
	x_doom: { 
		params: { 
			description: '',
			extensions: [ 'WAD' ],
			mime: 'application/x-doom'
		} 
	},
	x_dtbncx_xml: { 
		params: { 
			description: '',
			extensions: [ 'NCX' ],
			mime: 'application/x-dtbncx+xml'
		} 
	},
	x_dtbook_xml: { 
		params: { 
			description: '',
			extensions: [ 'DTB' ],
			mime: 'application/x-dtbook+xml'
		} 
	},
	x_dtbresource_xml: { 
		params: { 
			description: '',
			extensions: [ 'RES' ],
			mime: 'application/x-dtbresource+xml'
		} 
	},
	x_envoy: { 
		params: { 
			description: '',
			extensions: [ 'EVY' ],
			mime: 'application/x-envoy'
		} 
	},
	x_eva: { 
		params: { 
			description: '',
			extensions: [ 'EVA' ],
			mime: 'application/x-eva'
		} 
	},
	x_gca_compressed: { 
		params: { 
			description: '',
			extensions: [ 'GCA' ],
			mime: 'application/x-gca-compressed'
		} 
	},
	x_glulx: { 
		params: { 
			description: '',
			extensions: [ 'ULX' ],
			mime: 'application/x-glulx'
		} 
	},
	x_gnumeric: { 
		params: { 
			description: '',
			extensions: [ 'GNUMERIC' ],
			mime: 'application/x-gnumeric'
		} 
	},
	x_gramps_xml: { 
		params: { 
			description: '',
			extensions: [ 'GRAMPS' ],
			mime: 'application/x-gramps-xml'
		} 
	},
	x_gtar: { 
		params: { 
			description: '',
			extensions: [ 'GTAR' ],
			mime: 'application/x-gtar'
		} 
	},
	x_hdf: { 
		params: { 
			description: '',
			extensions: [ 'HDF' ],
			mime: 'application/x-hdf'
		} 
	},
	x_install_instructions: { 
		params: { 
			description: '',
			extensions: [ 'INSTALL' ],
			mime: 'application/x-install-instructions'
		} 
	},
	x_mie: { 
		params: { 
			description: '',
			extensions: [ 'MIE' ],
			mime: 'application/x-mie'
		} 
	},
	x_ms_wmd: { 
		params: { 
			description: '',
			extensions: [ 'WMD' ],
			mime: 'application/x-ms-wmd'
		} 
	},
	x_ms_xbap: { 
		params: { 
			description: '',
			extensions: [ 'XBAP' ],
			mime: 'application/x-ms-xbap'
		} 
	},
	x_msbinder: { 
		params: { 
			description: '',
			extensions: [ 'OBD' ],
			mime: 'application/x-msbinder' 
		}
	},
	x_mscardfile: { 
		params: { 
			description: '',
			extensions: [ 'CRD' ],
			mime: 'application/x-mscardfile'
		} 
	},
	x_msclip: { 
		params: { 
			description: '',
			extensions: [ 'CLP' ],
			mime: 'application/x-msclip'
		} 
	},
	x_nzb: { 
		params: { 
			description: '',
			extensions: [ 'NZB' ],
			mime: 'application/x-nzb'
		} 
	},
	x_pkcs12: { 
		params: { 
			description: '',
			extensions: [ 'P12', 'PFX' ],
			mime: 'application/x-pkcs12'
		} 
	},
	x_pkcs7_certificates: { 
		params: { 
			description: '',
			extensions: [ 'P7B', 'SPC' ],
			mime: 'application/x-pkcs7-certificates'
		} 
	},
	x_pkcs7_certreqresp: { 
		params: { 
			description: '',
			extensions: [ 'P7R' ],
			mime: 'application/x-pkcs7-certreqresp'
		} 
	},
	x_research_info_systems: { 
		params: { 
			description: '',
			extensions: [ 'RIS' ],
			mime: 'application/x-research-info-systems'
		} 
	},
	x_sh: { 
		params: { 
			description: '',
			extensions: [ 'SH' ],
			mime: 'application/x-sh'
		} 
	},
	x_subrip: { 
		params: { 
			description: '',
			extensions: [ 'SRT' ],
			mime: 'application/x-subrip'
		} 
	},
	x_sv4cpio: { 
		params: { 
			description: '',
			extensions: [ 'SV4CPIO' ],
			mime: 'application/x-sv4cpio'
		} 
	},
	x_sv4crc: { 
		params: { 
			description: '',
			extensions: [ 'SV4CRC' ],
			mime: 'application/x-sv4crc'
		} 
	},
	x_t3vm_image: { 
		params: { 
			description: '',
			extensions: [ 'T3' ],
			mime: 'application/x-t3vm-image'
		} 
	},
	x_tads: { 
		params: { 
			description: '',
			extensions: [ 'GAM' ],
			mime: 'application/x-tads'
		} 
	},
	x_tcl: { 
		params: { 
			description: '',
			extensions: [ 'TCL' ],
			mime: 'application/x-tcl'
		} 
	},
	x_tex: { 
		params: { 
			description: '',
			extensions: [ 'TEX' ],
			mime: 'application/x-tex'
		} 
	},
	x_tex_tfm: { 
		params: { 
			description: '',
			extensions: [ 'TFM' ],
			mime: 'application/x-tex-tfm'
		} 
	},
	x_texinfo: { 
		params: { 
			description: '',
			extensions: [ 'TEXINFO', 'TEXI' ],
			mime: 'application/x-texinfo'
		} 
	},
	x_ustar: { 
		params: { 
			description: '',
			extensions: [ 'USTAR' ],
			mime: 'application/x-ustar'
		} 
	},
	x_wais_source: { 
		params: { 
			description: '',
			extensions: [ 'SRC' ],
			mime: 'application/x-wais-source'
		} 
	},
	x_x509_ca_cert: { 
		params: { 
			description: '',
			extensions: [ 'DER', 'CRT' ],
			mime: 'application/x-x509-ca-cert'
		} 
	},
	x_xfig: { 
		params: { 
			description: '',
			extensions: [ 'FIG' ],
			mime: 'application/x-xfig'
		} 
	},
	x_xliff_xml: { 
		params: { 
			description: '',
			extensions: [ 'XLF' ],
			mime: 'application/x-xliff+xml'
		} 
	},
	x_xz: { 
		params: { 
			description: '',
			extensions: [ 'XZ' ],
			mime: 'application/x-xz'
		} 
	},
	x_zmachine: { 
		params: { 
			description: '',
			extensions: 
				 [ 'Z1', 'Z2', 'Z3', 'Z4', 'Z5', 'Z6', 'Z7', 'Z8' ],
			mime: 'application/x-zmachine'
		} 
	},
	xaml_xml: { 
		params: { 
			description: '',
			extensions: [ 'XAML' ],
			mime: 'application/xaml+xml'
		} 
	},
	xcap_diff_xml: { 
		params: { 
			description: '',
			extensions: [ 'XDF' ],
			mime: 'application/xcap-diff+xml'
		} 
	},
	xenc_xml: { 
		params: { 
			description: '',
			extensions: [ 'XENC' ],
			mime: 'application/xenc+xml'
		} 
	},
	xop_xml: { 
		params: { 
			description: '',
			extensions: [ 'XOP' ],
			mime: 'application/xop+xml'
		} 
	},
	xproc_xml: { 
		params: { 
			description: '',
			extensions: [ 'XPL' ],
			mime: 'application/xproc+xml'
		} 
	},
	xslt_xml: { 
		params: { 
			description: '',
			extensions: [ 'XSLT' ],
			mime: 'application/xslt+xml'
		} 
	},
	xspf_xml: { 
		params: { 
			description: '',
			extensions: [ 'XSPF' ],
			mime: 'application/xspf+xml'
		} 
	},
	xv_xml: { 
		params: { 
			description: '',
			extensions: 
				 [ 'MXML', 'XHVML', 'XVML', 'XVM' ],
			mime: 'application/xv+xml'
		} 
	},
	yang: { 
		params: { 
			description: '',
			extensions: [ 'YANG' ],
			mime: 'application/yang'
		} 
	},
	yin_xml: { 
		params: { 
			description: '',
			extensions: [ 'YIN' ],
			mime: 'application/yin+xml' 
		} 
	}

},




/* TODO
  
	pgp public ring	 		99 00	..
	pgp security ring	 	95 01	..
	pgp security ring	 	95 00	..
	pgp encrypted data	 	a6 00	¦.
		
	//? ico
	_00000100: {
		params: {
			
		},
		extensions: ['ICO'],
		signature: [ 0, 0, 1, 0 ],
		description: 'ico: Windows icon',
		mime: 'image/x-icon' 
	},

//mime chemical and model 
	chemical: 
	{ x_cdx: {
		params: {
			
		},extensions: 'cdx', signature: false, description: '', mime: 'chemical/x-cdx' },
	 x_cif: {
		params: {
			
		},extensions: 'cif', signature: false, description: '', mime: 'chemical/x-cif' },
	 x_cmdf: {
		params: {
			
		},
		extensions: 'cmdf',
		signature: false,
		description: '',
		mime: 'chemical/x-cmdf' },
	 x_cml: {
		params: {
			
		},extensions: 'cml', signature: false, description: '', mime: 'chemical/x-cml' },
	 x_csml: {
		params: {
			
		},
		extensions: 'csml',
		signature: false,
		description: '',
		mime: 'chemical/x-csml' },
	 x_xyz: {
		params: {
			
		},extensions: 'xyz', signature: false, description: '', mime: 'chemical/x-xyz' } },
			
	model: 
	{ iges: {
		params: {
			
		},
		extensions: ['igs', 'iges'],
		signature: false,
		description: '',
		mime: 'model/iges' },
	 mesh: {
		params: {
			
		},
		extensions: ['msh', 'mesh', 'silo'],
		signature: false,
		description: '',
		mime: 'model/mesh' },
	collada_xml: {
		params: {
			
		},
		extensions: 'dae',
		signature: false,
		description: '',
		mime: 'model/vnd.collada+xml' },
	dwf: {
		params: {
			
		},extensions: 'dwf', signature: false, description: '', mime: 'model/vnd.dwf' },
	gdl: {
		params: {
			
		},extensions: 'gdl', signature: false, description: '', mime: 'model/vnd.gdl' },
	gtw: {
		params: {
			
		},extensions: 'gtw', signature: false, description: '', mime: 'model/vnd.gtw' },
	mts: {
		params: {
			
		},extensions: 'mts', signature: false, description: '', mime: 'model/vnd.mts' },
	vtu: {
		params: {
			
		},extensions: 'vtu', signature: false, description: '', mime: 'model/vnd.vtu' },
	vrml: {
		params: {
			
		},
		extensions: ['wrl', 'vrml'],
		signature: false,
		description: '',
		mime: 'model/vrml' },
	 x3d_binary: {
		params: {
			
		},
		extensions: ['x3db', 'x3dbz'],
		signature: false,
		description: '',
		mime: 'model/x3d+binary' },
	 x3d_vrml: {
		params: {
			
		},
		extensions: ['x3dv', 'x3dvz'],
		signature: false,
		description: '',
		mime: 'model/x3d+vrml' },
	 x3d_xml: {
		params: {
			
		},
		extensions: ['x3d', 'x3dz'],
		signature: false,
		description: '',
		mime: 'model/x3d+xml' } },
*/

/* TODO - dev internal

// RECHECK RIFF FILES AFTERWARDS
  'RIFF' /
  '52494646': [ 
  	 { PUID: 1, extensions: ['WAV'] },
     { PUID: 1, extensions: ['WAV'] },
     { PUID: 1, extensions: ['WAV'] },
     { PUID: 1, extensions: ['WAV'] },
     { PUID: 141, extensions: ['WAV', 'WAV'] },
     { PUID: 142, extensions: ['WAV', 'WAVE'] },
     { PUID: 143, extensions: ['WAV', 'WAVE'] },
     { PUID: 2, extensions: ['WAV'] },
     { PUID: 2, extensions: ['WAV'] },
     { PUID: 2, extensions: ['WAV'] },
     { PUID: 2, extensions: ['WAV'] },
     { PUID: 386, extensions: ['ANI'] },
     { PUID: 431, extensions: ['CLK'] },
     { PUID: 432, extensions: ['CLK'] },
     { PUID: 464, extensions: ['CDR'] },
     { PUID: 465, extensions: ['CDR'] },
     { PUID: 5, extensions: ['AVI'] },
     { PUID: 527, extensions: ['WAV'] },
     { PUID: 527, extensions: ['WAV'] },
     { PUID: 527, extensions: ['WAV'] },
     { PUID: 527, extensions: ['WAV'] },
     { PUID: 566, extensions: ['WEBP'] },
     { PUID: 567, extensions: ['WEBP'] },
     { PUID: 568, extensions: ['WEBP'] },
     { PUID: 6, extensions: ['WAV'] },
     { PUID: 624, extensions: ['PAL'] } ],

	 
	 var res = {};
	for (var key in exports.info.image){
		var sig = exports.info.image[key].signature;
		if (sig instanceof Array && sig.length==0) {
			var s = key.substr(1);
			var arr = [];
			for (var i = 0; i < s.length; i += 2) {
				arr.push( parseInt(s.substr(i, 2), 16) );
			}
			res[key] = arr;
		}
	}
	console.log( res );
	
    }
	
		
	var extArr = [];
	for (var key in exports.info.application){
		exports.info.application[key].extensions.forEach(function(e){
			if(extArr.indexOf(e)<0) extArr.push(e);
		});
	}
	console.log( extArr );
*/
 
}

/*
var res = {};
for (var key in exports.info.application){
	var o = exports.info.application[key];
	if ('SP' in o && o.SP instanceof Array){
		o.SP.forEach(function(sp){
			if('regex' in sp && 'PUID' in sp){
				var info = require( './filetypes/'.concat(sp.PUID,'.js') ).info;
				var sigs = (info.InternalSignature instanceof Array) ? info.InternalSignature : [info.InternalSignature];
				sigs.forEach(function(s){
					console.log( s.ByteSequence );
					var bss = (s.ByteSequence instanceof Array) ? s.ByteSequence : [s.ByteSequence];
					bss.forEach(function(bs){
						if (bs.ByteSequenceValue.indexOf(sp.regex)>-1) console.log(bs.ByteSequenceValue);
						if (bs.ByteSequenceValue.indexOf(sp.regex)>-1 && bs.PositionType.indexOf('BOF')<0){
							res[sp.PUID] = bs.PositionType;
						}
					});
				});
				
			}
		});
	}
}
console.log(res);
*/ 





















