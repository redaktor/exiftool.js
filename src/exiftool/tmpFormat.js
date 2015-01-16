var util = require('util');

var o = {
	
	_504B0304: {
		params: {
			
		},
		specs: [],
		extensions: [ 'ZIP' ],
		signature: [ 80, 75, 3, 4 ],
		description: 'PKZIP archive_1',
		mime: 'application/zip' 
	},
	_504B030414000100: {
		params: {
			
		},
		specs: [],
		extensions: [ 'ZIP' ],
		signature: [ 80, 75, 3, 4, 20, 0, 1, 0 ],
		description: 'ZLock Pro encrypted ZIP',
		mime: 'application/zip' 
	},
	_504B0708: {
		params: {
			
		},
		specs: [],
		extensions: [ 'ZIP' ],
		signature: [ 80, 75, 7, 8 ],
		description: 'PKZIP archive_3',
		mime: 'application/zip' 
	},
	_504B0506: {
		params: {
			
		},
		specs: [],
		extensions: [ 'ZIP' ],
		signature: [ 80, 75, 5, 6 ],
		description: 'PKZIP archive_2',
		mime: 'application/zip' 
	},
	_504B537058: {
		params: {
			
		},
		specs: [],
		extensions: [ 'ZIP' ],
		signature: [ 80, 75, 83, 112, 88 ],
		description: 'PKSFX self-extracting archive',
		mime: 'application/zip' 
	},
	_504B4C495445: {
		params: {
			
		},
		specs: [],
		extensions: [ 'ZIP' ],
		signature: [ 80, 75, 76, 73, 84, 69 ],
		description: 'PKLITE archive',
		mime: 'application/zip' 
	},
	_57696E5A6970: {
		params: {
			
		},
		specs: [],
		extensions: [ 'ZIP' ],
		signature: [ 87, 105, 110, 90, 105, 112 ],
		description: 'WinZip compressed archive',
		mime: 'application/zip' 
	},
	// JAR
	_4A4152435300: {
		params: {
			
		},
		specs: [],
		extensions: [ 'JAR' ],
		signature: [ 74, 65, 82, 67, 83, 0 ],
		description: 'JARCS compressed archive',
		mime: 'application/java-archive' 
	},
	_5F27A889: {
		params: {
			
		},
		specs: [],
		extensions: [ 'JAR' ],
		signature: [ 95, 39, 168, 137 ],
		description: 'Jar archive',
		mime: 'application/java-archive' 
	},
	_504B030414000800: {
		params: {
			
		},
		specs: [],
		extensions: [ 'JAR' ],
		signature: [ 80, 75, 3, 4, 20, 0, 8, 0 ],
		description: 'Java archive_2',
		mime: 'application/java-archive' 
	},
	// MAR
	_4D415243: {
		params: {
			
		},
		specs: [],
		extensions: [ 'MAR' ],
		signature: [ 77, 65, 82, 67 ],
		description: 'Microsoft|MSN MARC archive',
		mime: 'application/octet-stream' 
	},
	_4D41523100: {
		params: {
			
		},
		specs: [],
		extensions: [ 'MAR' ],
		signature: [ 77, 65, 82, 49, 0 ],
		description: 'Mozilla archive',
		mime: 'application/octet-stream' 
	},
	_4D41723000: {
		params: {
			
		},
		specs: [],
		extensions: [ 'MAR' ],
		signature: [ 77, 65, 114, 48, 0 ],
		description: 'MAr compressed archive',
		mime: 'application/octet-stream' 
	},
	// BIN (HEX)
	_2854686973206669: {
		params: {
			
		},
		specs: [],
		extensions: [ 'HQX' ],
		signature: [ 40, 84, 104, 105, 115, 32, 102, 105 ],
		description: 'BinHex 4 Compressed Archive',
		mime: 'application/mac-binhex40' 
	},
	_424C4932323351: {
		params: {
			
		},
		specs: [ 208 ],
		extensions: [ 'BIN' ],
		signature: [ 66, 76, 73, 50, 50, 51, 81 ],
		description: 'Speedtouch router firmware',
		mime: 'application/octet-stream' 
	},
	// DMS
	_444D5321: {
		params: {
			
		},
		specs: [],
		extensions: [ 'DMS' ],
		signature: [ 68, 77, 83, 33 ],
		description: 'Amiga DiskMasher compressed archive',
		mime: 'application/octet-stream' 
	},
	// CAB
	_4D534346: {
		params: {
			
		},
		specs: [],
		extensions: [ 'CAB' ],
		signature: [ 77, 83, 67, 70 ],
		description: 'Microsoft cabinet file',
		mime: 'application/vnd.ms-cab-compressed' 
	},
	_49536328: {
		params: {
			
		},
		specs: [],
		extensions: [ 'CAB' ],
		signature: [ 73, 83, 99, 40 ],
		description: 'Install Shield compressed file',
		mime: 'application/vnd.ms-cab-compressed' 
	},
	
	// ... word
	_576F726450726F: {
		params: {
			
		},
		specs: [ 340 ],
		SP: 
	[ { PUID: 340,
	  regex: '576F726450726F0000000000000000004C5750370000000000000000000000000000FFFFFFFF000000002E',
	  signatureOffset: 0,
	  description: 'Lotus WordPro 97/Millennium',
	  mime: '' } ],
		extensions: [ 'LWP' ],
		signature: [ 87, 111, 114, 100, 80, 114, 111 ],
		description: 'Lotus WordPro file',
		mime: 'application/vnd.lotus-wordpro' 
	},
		
	// ... image
	_43505446494C45: {
		params: {
			
		},
		specs: [],
		extensions: [ 'CPT' ],
		signature: [ 67, 80, 84, 70, 73, 76, 69 ],
		description: 'Corel Photopaint file_2',
		mime: 'application/mac-compactpro' 
	},
	_4350543746494C45: {
		params: {
			
		},
		specs: [],
		extensions: [ 'CPT' ],
		signature: [ 67, 80, 84, 55, 70, 73, 76, 69 ],
		description: 'Corel Photopaint file_1',
		mime: 'application/mac-compactpro' 
	},
	dynageo: {
		params: {
			
		},
		specs: [ 618 ],
		SP: 
	[ { PUID: 618,
	  regex: 'ACED00057372001B67656F6765627261',
	  signatureOffset: 0,
	  description: 'GeoGebra 1.0',
	  mime: '' } ],
		extensions: [ 'GEO' ],
		signature: false,
		description: '',
		mime: 'application/vnd.dynageo' 
	},
	
	// ... video - TODO Final Cut
	clonk_c4group: {
		params: {
			
		},
		specs: [ 415, 540 ],
		SP: 
	[ { PUID: 415,
	  regex: '464F524D.{4}4D433444',
	  signatureOffset: 0,
	  description: 'Cinema 4D 4.x',
	  mime: '' 
	},
	{ PUID: 540,
	  regex: '4D433530.{4}(50524635|444F4B35|43415435|46435635)',
	  signatureOffset: 0,
	  description: 'Cinema 4D 5.x',
	  mime: '' } ],
		extensions: [ 'C4G', 'C4D', 'C4F', 'C4P', 'C4U' ],
		signature: false,
		description: '',
		mime: 'application/vnd.clonk.c4group' 
	},
	
	// ... audio
	_72696666: {
		params: {
			
		},
		specs: [],
		extensions: [ 'AC' ],
		signature: [ 114, 105, 102, 102 ],
		description: 'Sonic Foundry Acid Music File',
		mime: 'application/pkix-attr-cert' 
	},
	_4E45534D1A01: {
		params: {
			
		},
		specs: [],
		extensions: [ 'NSF' ],
		signature: [ 78, 69, 83, 77, 26, 1 ],
		description: 'NES Sound file',
		mime: 'application/vnd.lotus-notes' 
	},
	
	// ... dtp and presentation
	framemaker: {
		params: {
			
		},
		specs: [ 190, 533, 534, 535, 536, 537, 538, 539 ],
		SP: 
		/* ???
		_3C4D616B65724669: {
		params: {
			
		},
			specs: [],
			extensions: [ 'MIF' ],
			signature: [ 60, 77, 97, 107, 101, 114, 70, 105 ],
			description: 'Adobe FrameMaker',
			mime: 'application/vnd.mif' 
		},
		*/
	[ { PUID: 190,
	  regex: '3C4D616B657246696C6520352E30593E',
	  signatureOffset: 0,
	  description: 'Framemaker Document Version 5.0',
	  mime: '' 
	},
	{ PUID: 533,
	  regex: '3C4D616B657246696C6520322E304A3E',
	  signatureOffset: 0,
	  description: 'Framemaker Document Version 2.0',
	  mime: '' 
	},
	{ PUID: 534,
	  regex: '3C4D616B657246696C6520332E30463E',
	  signatureOffset: 0,
	  description: 'Framemaker Document Version 3.0',
	  mime: '' 
	},
	{ PUID: 535,
	  regex: '3C4D616B657246696C6520342E304B3E',
	  signatureOffset: 0,
	  description: 'Framemaker Document Version 4.0',
	  mime: '' 
	},
	{ PUID: 536,
	  regex: '3C4D616B657246696C6520352E35513E',
	  signatureOffset: 0,
	  description: 'Framemaker Document Version 5.5',
	  mime: '' 
	},
	{ PUID: 537,
	  regex: '3C4D616B657246696C6520362E304A3E',
	  signatureOffset: 0,
	  description: 'Framemaker Document Version 6.0',
	  mime: '' 
	},
	{ PUID: 538,
	  regex: '3C4D616B657246696C6520372E30483E',
	  signatureOffset: 0,
	  description: 'Framemaker Document Version 7.0',
	  mime: '' 
	},
	{ PUID: 539,
	  regex: '3C4D616B657246696C6520392E30483E',
	  signatureOffset: 0,
	  description: 'Framemaker Document Version 9.0',
	  mime: '' 
	} ],

	extensions: [ 'FM', 'FRAME', 'MAKER', 'BOOK' ],
	signature: false,
	description: '',
	mime: 'application/vnd.framemaker' 
	},
	
	// ... spreadsheet
	_00001A00051004: {
		params: {
			
		},
		specs: [],
		extensions: [ '123' ],
		signature: [ 0, 0, 26, 0, 5, 16, 4 ],
		description: 'Lotus 1-2-3 (v9)',
		mime: 'application/vnd.lotus-1-2-3' 
	},
	
	// ... database
	epson_msf: {
		params: {
			
		},
		specs: [ 612 ],
		SP: 
	[ { PUID: 612,
	  regex: '2F2F203C212D2D203C6D64623A6D6F726B3A7A20',
	  signatureOffset: 0,
	  description: 'Mork',
	  mime: '' } ],
		extensions: [ 'MSF', 'DAT' ],
		signature: false,
		description: '',
		mime: 'application/vnd.epson.msf' 
	},
	_1A0000040000: {
		params: {
			
		},
		specs: [],
		extensions: [ 'NSF' ],
		signature: [ 26, 0, 0, 4, 0, 0 ],
		description: 'Lotus Notes database',
		mime: 'application/vnd.lotus-notes' 
	},
	_414F4C564D313030: {
		params: {
			
		},
		specs: [],
		extensions: [ 'ORG' ],
		signature: [ 65, 79, 76, 86, 77, 49, 48, 48 ],
		description: 'AOL personal file cabinet',
		mime: 'application/vnd.lotus-organizer' 
	},
	
	
	// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
	_8A0109000000E108: {
		params: {
			
		},
		specs: [],
		extensions: [ 'AW' ],
		signature: [ 138, 1, 9, 0, 0, 0, 225, 8 ],
		description: 'MS Answer Wizard',
		mime: 'application/applixware' 
	},
	_CAFEBABE: {
		params: {
			
		},
		specs: [],
		extensions: [ 'CLASS' ],
		signature: [ 202, 254, 186, 190 ],
		description: 'Java bytecode',
		mime: 'application/java-vm' 
	},
	
	
	
	
	_56657273696F6E20: {
		params: {
			
		},
		specs: [],
		extensions: [ 'MIF' ],
		signature: [ 86, 101, 114, 115, 105, 111, 110, 32 ],
		description: 'MapInfo Interchange Format file',
		mime: 'application/vnd.mif' 
	},
	
	_FDFFFFFF22: {
		params: {
			
		},
		specs: [ 172, 173, 174, 175, 176, 177, 178, 55, 56, 57, 59, 60, 61, 62 ],
		SP: 
	[ { PUID: 55,
	  regex: '09000400.{2}1000',
	  signatureOffset: 0,
	  description: 'BIFF 2 Worksheet',
	  mime: '' 
	},
	{ PUID: 56,
	  regex: '09020600.{2}1000',
	  signatureOffset: 0,
	  description: 'BIFF 3 Worksheet',
	  mime: '' 
	},
	{ PUID: 57,
	  regex: '09040600.{2}1000',
	  signatureOffset: 0,
	  description: 'BIFF 4 Worksheet',
	  mime: '' 
	},
	{ PUID: 59,
	  regex: '0908.{2}00050500',
	  signatureOffset: [ 512, 8192 ],
	  description: 'BIFF 5 & 7 Workbook (generic)',
	  mime: '' 
	},
	{ PUID: 61,
	  regex: '0908.{2}00060500',
	  signatureOffset: 512,
	  description: 'BIFF 8 & 8X Workbook (generic)',
	  mime: '' 
	},
	{ PUID: 62,
	  regex: '0908.{2}00060500',
	  signatureOffset: 512,
	  description: 'BIFF 8 & 8X Workbook (generic)',
	  mime: '' } ],
		extensions: [ 'XLS', 'XLW' ],
		signature: [ 253, 255, 255, 255, 34 ],
		description: 'Excel spreadsheet subheader_4',
		mime: 'application/vnd.ms-excel' 
	},
	_FDFFFFFF1F: {
		params: {
			
		},
		specs: [ 172, 173, 174, 175, 176, 177, 178, 55, 56, 57, 59, 60, 61, 62 ],
		SP: 
	[ { PUID: 55,
	  regex: '09000400.{2}1000',
	  signatureOffset: 0,
	  description: 'BIFF 2 Worksheet',
	  mime: '' 
	},
	{ PUID: 56,
	  regex: '09020600.{2}1000',
	  signatureOffset: 0,
	  description: 'BIFF 3 Worksheet',
	  mime: '' 
	},
	{ PUID: 57,
	  regex: '09040600.{2}1000',
	  signatureOffset: 0,
	  description: 'BIFF 4 Worksheet',
	  mime: '' 
	},
	{ PUID: 59,
	  regex: '0908.{2}00050500',
	  signatureOffset: [ 512, 8192 ],
	  description: 'BIFF 5 & 7 Workbook (generic)',
	  mime: '' 
	},
	{ PUID: 61,
	  regex: '0908.{2}00060500',
	  signatureOffset: 512,
	  description: 'BIFF 8 & 8X Workbook (generic)',
	  mime: '' 
	},
	{ PUID: 62,
	  regex: '0908.{2}00060500',
	  signatureOffset: 512,
	  description: 'BIFF 8 & 8X Workbook (generic)',
	  mime: '' } ],
		extensions: [ 'XLS', 'XLW' ],
		signature: [ 253, 255, 255, 255, 31 ],
		description: 'Excel spreadsheet subheader_3',
		mime: 'application/vnd.ms-excel' 
	},
	_FDFFFFFF10: {
		params: {
			
		},
		specs: [ 172, 173, 174, 175, 176, 177, 178, 55, 56, 57, 59, 60, 61, 62 ],
		SP: 
	[ { PUID: 55,
	  regex: '09000400.{2}1000',
	  signatureOffset: 0,
	  description: 'BIFF 2 Worksheet',
	  mime: '' 
	},
	{ PUID: 56,
	  regex: '09020600.{2}1000',
	  signatureOffset: 0,
	  description: 'BIFF 3 Worksheet',
	  mime: '' 
	},
	{ PUID: 57,
	  regex: '09040600.{2}1000',
	  signatureOffset: 0,
	  description: 'BIFF 4 Worksheet',
	  mime: '' 
	},
	{ PUID: 59,
	  regex: '0908.{2}00050500',
	  signatureOffset: [ 512, 8192 ],
	  description: 'BIFF 5 & 7 Workbook (generic)',
	  mime: '' 
	},
	{ PUID: 61,
	  regex: '0908.{2}00060500',
	  signatureOffset: 512,
	  description: 'BIFF 8 & 8X Workbook (generic)',
	  mime: '' 
	},
	{ PUID: 62,
	  regex: '0908.{2}00060500',
	  signatureOffset: 512,
	  description: 'BIFF 8 & 8X Workbook (generic)',
	  mime: '' } ],
		extensions: [ 'XLS', 'XLW' ],
		signature: [ 253, 255, 255, 255, 16 ],
		description: 'Excel spreadsheet subheader_2',
		mime: 'application/vnd.ms-excel' 
	},
	_0908100000060500: {
		params: {
			
		},
		specs: [ 172, 173, 174, 175, 176, 177, 178, 55, 56, 57, 59, 60, 61, 62 ],
		SP: 
	[ { PUID: 55,
	  regex: '09000400.{2}1000',
	  signatureOffset: 0,
	  description: 'BIFF 2 Worksheet',
	  mime: '' 
	},
	{ PUID: 56,
	  regex: '09020600.{2}1000',
	  signatureOffset: 0,
	  description: 'BIFF 3 Worksheet',
	  mime: '' 
	},
	{ PUID: 57,
	  regex: '09040600.{2}1000',
	  signatureOffset: 0,
	  description: 'BIFF 4 Worksheet',
	  mime: '' 
	},
	{ PUID: 59,
	  regex: '0908.{2}00050500',
	  signatureOffset: [ 512, 8192 ],
	  description: 'BIFF 5 & 7 Workbook (generic)',
	  mime: '' 
	},
	{ PUID: 61,
	  regex: '0908.{2}00060500',
	  signatureOffset: 512,
	  description: 'BIFF 8 & 8X Workbook (generic)',
	  mime: '' 
	},
	{ PUID: 62,
	  regex: '0908.{2}00060500',
	  signatureOffset: 512,
	  description: 'BIFF 8 & 8X Workbook (generic)',
	  mime: '' } ],
		extensions: [ 'XLS', 'XLW' ],
		signature: [ 9, 8, 16, 0, 0, 6, 5, 0 ],
		description: 'Excel spreadsheet subheader_1',
		mime: 'application/vnd.ms-excel' 
	},
	_FDFFFFFF29: {
		params: {
			
		},
		specs: [ 172, 173, 174, 175, 176, 177, 178, 55, 56, 57, 59, 60, 61, 62 ],
		SP: 
	[ { PUID: 55,
	  regex: '09000400.{2}1000',
	  signatureOffset: 0,
	  description: 'BIFF 2 Worksheet',
	  mime: '' 
	},
	{ PUID: 56,
	  regex: '09020600.{2}1000',
	  signatureOffset: 0,
	  description: 'BIFF 3 Worksheet',
	  mime: '' 
	},
	{ PUID: 57,
	  regex: '09040600.{2}1000',
	  signatureOffset: 0,
	  description: 'BIFF 4 Worksheet',
	  mime: '' 
	},
	{ PUID: 59,
	  regex: '0908.{2}00050500',
	  signatureOffset: [ 512, 8192 ],
	  description: 'BIFF 5 & 7 Workbook (generic)',
	  mime: '' 
	},
	{ PUID: 61,
	  regex: '0908.{2}00060500',
	  signatureOffset: 512,
	  description: 'BIFF 8 & 8X Workbook (generic)',
	  mime: '' 
	},
	{ PUID: 62,
	  regex: '0908.{2}00060500',
	  signatureOffset: 512,
	  description: 'BIFF 8 & 8X Workbook (generic)',
	  mime: '' } ],
		extensions: [ 'XLS', 'XLW' ],
		signature: [ 253, 255, 255, 255, 41 ],
		description: 'Excel spreadsheet subheader_7',
		mime: 'application/vnd.ms-excel' 
	},
	_FDFFFFFF28: {
		params: {
			
		},
		specs: [ 172, 173, 174, 175, 176, 177, 178, 55, 56, 57, 59, 60, 61, 62 ],
		SP: 
	[ { PUID: 55,
	  regex: '09000400.{2}1000',
	  signatureOffset: 0,
	  description: 'BIFF 2 Worksheet',
	  mime: '' 
	},
	{ PUID: 56,
	  regex: '09020600.{2}1000',
	  signatureOffset: 0,
	  description: 'BIFF 3 Worksheet',
	  mime: '' 
	},
	{ PUID: 57,
	  regex: '09040600.{2}1000',
	  signatureOffset: 0,
	  description: 'BIFF 4 Worksheet',
	  mime: '' 
	},
	{ PUID: 59,
	  regex: '0908.{2}00050500',
	  signatureOffset: [ 512, 8192 ],
	  description: 'BIFF 5 & 7 Workbook (generic)',
	  mime: '' 
	},
	{ PUID: 61,
	  regex: '0908.{2}00060500',
	  signatureOffset: 512,
	  description: 'BIFF 8 & 8X Workbook (generic)',
	  mime: '' 
	},
	{ PUID: 62,
	  regex: '0908.{2}00060500',
	  signatureOffset: 512,
	  description: 'BIFF 8 & 8X Workbook (generic)',
	  mime: '' } ],
		extensions: [ 'XLS', 'XLW' ],
		signature: [ 253, 255, 255, 255, 40 ],
		description: 'Excel spreadsheet subheader_6',
		mime: 'application/vnd.ms-excel' 
	},
	_FDFFFFFF23: {
		params: {
			
		},
		specs: [ 172, 173, 174, 175, 176, 177, 178, 55, 56, 57, 59, 60, 61, 62 ],
		SP: 
	[ { PUID: 55,
	  regex: '09000400.{2}1000',
	  signatureOffset: 0,
	  description: 'BIFF 2 Worksheet',
	  mime: '' 
	},
	{ PUID: 56,
	  regex: '09020600.{2}1000',
	  signatureOffset: 0,
	  description: 'BIFF 3 Worksheet',
	  mime: '' 
	},
	{ PUID: 57,
	  regex: '09040600.{2}1000',
	  signatureOffset: 0,
	  description: 'BIFF 4 Worksheet',
	  mime: '' 
	},
	{ PUID: 59,
	  regex: '0908.{2}00050500',
	  signatureOffset: [ 512, 8192 ],
	  description: 'BIFF 5 & 7 Workbook (generic)',
	  mime: '' 
	},
	{ PUID: 61,
	  regex: '0908.{2}00060500',
	  signatureOffset: 512,
	  description: 'BIFF 8 & 8X Workbook (generic)',
	  mime: '' 
	},
	{ PUID: 62,
	  regex: '0908.{2}00060500',
	  signatureOffset: 512,
	  description: 'BIFF 8 & 8X Workbook (generic)',
	  mime: '' } ],
		extensions: [ 'XLS', 'XLW' ],
		signature: [ 253, 255, 255, 255, 35 ],
		description: 'Excel spreadsheet subheader_5',
		mime: 'application/vnd.ms-excel' 
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
		
		// has x-fmt 252 - 257
		
		
	},
	
// AND
	
	_XXX: {
		params: {
			
		},
		specs: [ 125, 126, 179, 180, 181, 182 ],
		SP: 
	[ { PUID: 125,
	  regex: 'D0CF11E0A1B11AE1.{20}FEFF',
	  signatureOffset: 0,
	  description: 'Powerpoint 95',
	  mime: '' 
	},
	{ PUID: 126,
	  regex: 'D0CF11E0A1B11AE1.{20}FEFF',
	  signatureOffset: 0,
	  description: 'Powerpoint 97-2002',
	  mime: '' } ],
		extensions: [ 'PPT' ],
		signature: [ 253, 255, 255, 255, 28, 0, 0, 0 ],
		description: 'PowerPoint presentation subheader_5',
		mime: 'application/vnd.ms-powerpoint' 
	},
	_FDFFFFFFE000000: {
		params: {
			
		},
		specs: [ 125, 126, 179, 180, 181, 182 ],
		SP: 
	[ { PUID: 125,
	  regex: 'D0CF11E0A1B11AE1.{20}FEFF',
	  signatureOffset: 0,
	  description: 'Powerpoint 95',
	  mime: '' 
	},
	{ PUID: 126,
	  regex: 'D0CF11E0A1B11AE1.{20}FEFF',
	  signatureOffset: 0,
	  description: 'Powerpoint 97-2002',
	  mime: '' } ],
		extensions: [ 'PPT' ],
		signature: [ 253, 255, 255, 255, 14, 0, 0, 0 ],
		description: 'PowerPoint presentation subheader_4',
		mime: 'application/vnd.ms-powerpoint' 
	},
	_A0461DF0: {
		params: {
			
		},
		specs: [ 125, 126, 179, 180, 181, 182 ],
		SP: 
	[ { PUID: 125,
	  regex: 'D0CF11E0A1B11AE1.{20}FEFF',
	  signatureOffset: 0,
	  description: 'Powerpoint 95',
	  mime: '' 
	},
	{ PUID: 126,
	  regex: 'D0CF11E0A1B11AE1.{20}FEFF',
	  signatureOffset: 0,
	  description: 'Powerpoint 97-2002',
	  mime: '' } ],
		extensions: [ 'PPT' ],
		signature: [ 160, 70, 29, 240 ],
		description: 'PowerPoint presentation subheader_3',
		mime: 'application/vnd.ms-powerpoint' 
	},
	_F00E803: {
		params: {
			
		},
		specs: [ 125, 126, 179, 180, 181, 182 ],
		SP: 
	[ { PUID: 125,
	  regex: 'D0CF11E0A1B11AE1.{20}FEFF',
	  signatureOffset: 0,
	  description: 'Powerpoint 95',
	  mime: '' 
	},
	{ PUID: 126,
	  regex: 'D0CF11E0A1B11AE1.{20}FEFF',
	  signatureOffset: 0,
	  description: 'Powerpoint 97-2002',
	  mime: '' } ],
		extensions: [ 'PPT' ],
		signature: [ 15, 0, 232, 3 ],
		description: 'PowerPoint presentation subheader_2',
		mime: 'application/vnd.ms-powerpoint' 
	},
	_006E1EF0: {
		params: {
			
		},
		specs: [ 125, 126, 179, 180, 181, 182 ],
		SP: 
	[ { PUID: 125,
	  regex: 'D0CF11E0A1B11AE1.{20}FEFF',
	  signatureOffset: 0,
	  description: 'Powerpoint 95',
	  mime: '' 
	},
	{ PUID: 126,
	  regex: 'D0CF11E0A1B11AE1.{20}FEFF',
	  signatureOffset: 0,
	  description: 'Powerpoint 97-2002',
	  mime: '' } ],
		extensions: [ 'PPT' ],
		signature: [ 0, 110, 30, 240 ],
		description: 'PowerPoint presentation subheader_1',
		mime: 'application/vnd.ms-powerpoint' 
	},
	_FDFFFFFF43000000: {
		params: {
			
		},
		specs: [ 125, 126, 179, 180, 181, 182 ],
		SP: 
	[ { PUID: 125,
	  regex: 'D0CF11E0A1B11AE1.{20}FEFF',
	  signatureOffset: 0,
	  description: 'Powerpoint 95',
	  mime: '' 
	},
	{ PUID: 126,
	  regex: 'D0CF11E0A1B11AE1.{20}FEFF',
	  signatureOffset: 0,
	  description: 'Powerpoint 97-2002',
	  mime: '' } ],
		extensions: [ 'PPT' ],
		signature: [ 253, 255, 255, 255, 67, 0, 0, 0 ],
		description: 'PowerPoint presentation subheader_6',
		mime: 'application/vnd.ms-powerpoint' 
	},
	_FF00020004040554: {
		params: {
			
		},
		specs: 
	[ 166,
	167,
	168,
	220,
	227,
	228,
	229,
	230,
	231,
	247,
	250,
	253,
	257,
	262,
	263,
	264,
	270,
	271 ],
		SP: 
	[ { PUID: 166,
	  regex: '(00|FF)0002000404055402',
	  signatureOffset: 0,
	  description: 'Microsoft Works Spreadsheet 1-5',
	  mime: '' } ],
		extensions: [ 'WKS' ],
		signature: [ 255, 0, 2, 0, 4, 4, 5, 84 ],
		description: 'Works for Windows spreadsheet',
		mime: 'application/vnd.ms-works' 
	},
	_E574B53: {
		params: {
			
		},
		specs: 
	[ 166,
	167,
	168,
	220,
	227,
	228,
	229,
	230,
	231,
	247,
	250,
	253,
	257,
	262,
	263,
	264,
	270,
	271 ],
		SP: 
	[ { PUID: 166,
	  regex: '(00|FF)0002000404055402',
	  signatureOffset: 0,
	  description: 'Microsoft Works Spreadsheet 1-5',
	  mime: '' } ],
		extensions: [ 'WKS' ],
		signature: [ 14, 87, 75, 83 ],
		description: 'DeskMate Worksheet',
		mime: 'application/vnd.ms-works' 
	},
	
	musician: {
		params: {
			
		},
		specs: [ 397 ],
		SP: 
	[ { PUID: 397,
	  regex: '454E49474D412042494E4152592046494C45000000000000000000000000000046696E616C65285229',
	  signatureOffset: 0,
	  description: 'Enigma Binary File (Finale)',
	  mime: '' } ],
		extensions: [ 'MUS' ],
		signature: false,
		description: '',
		mime: 'application/vnd.musician' 
	},
	oasis_opendocument_database: {
		params: {
			
		},
		specs: [ 140, 424, 444 ],
		SP: 
	[ { PUID: 140,
	  regex: '504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E73756E2E786D6C2E62617365(.+)6F66666963653A76657273696F6E3D22312E30',
	  signatureOffset: 0,
	  description: 'ODF 1.0 database',
	  mime: '' } ],
		extensions: [ 'ODB' ],
		signature: false,
		description: '',
		mime: 'application/vnd.oasis.opendocument.database' 
	},
	
	oasis_opendocument_graphics: {
		params: {
			
		},
		specs: [ 139, 296, 297 ],
		SP: 
	[ { PUID: 139,
	  regex: '504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E6772617068696373(.+)6F66666963653A76657273696F6E3D22312E30',
	  signatureOffset: 0,
	  description: 'ODF 1.0 drawing',
	  mime: '' 
	},
	{ PUID: 296,
	  regex: '504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E6772617068696373(.+)6F66666963653A76657273696F6E3D22312E3122',
	  signatureOffset: 0,
	  description: 'ODF 1.1 graphics (with version number)',
	  mime: '' 
	},
	{ PUID: 296,
	  regex: '504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E6772617068696373',
	  signatureOffset: 0,
	  description: 'ODF 1.1 graphics (without version number)',
	  mime: '' 
	},
	{ PUID: 297,
	  regex: '504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E6772617068696373(.+)6F66666963653A76657273696F6E3D22312E3222',
	  signatureOffset: 0,
	  description: 'ODF 1.2 graphics',
	  mime: '' } ],
		extensions: [ 'ODG', 'OTG' ],
		signature: false,
		description: '',
		mime: 'application/vnd.oasis.opendocument.graphics' 
	},
	oasis_opendocument_graphics_template: {
		params: {
			
		},
		specs: [ 139, 296, 297 ],
		SP: 
	[ { PUID: 139,
	  regex: '504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E6772617068696373(.+)6F66666963653A76657273696F6E3D22312E30',
	  signatureOffset: 0,
	  description: 'ODF 1.0 drawing',
	  mime: '' 
	},
	{ PUID: 296,
	  regex: '504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E6772617068696373(.+)6F66666963653A76657273696F6E3D22312E3122',
	  signatureOffset: 0,
	  description: 'ODF 1.1 graphics (with version number)',
	  mime: '' 
	},
	{ PUID: 296,
	  regex: '504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E6772617068696373',
	  signatureOffset: 0,
	  description: 'ODF 1.1 graphics (without version number)',
	  mime: '' 
	},
	{ PUID: 297,
	  regex: '504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E6772617068696373(.+)6F66666963653A76657273696F6E3D22312E3222',
	  signatureOffset: 0,
	  description: 'ODF 1.2 graphics',
	  mime: '' } ],
		extensions: [ 'OTG' ],
		signature: false,
		description: '',
		mime: 'application/vnd.oasis.opendocument.graphics-template' 
	},
	oasis_opendocument_presentation_template: {
		params: {
			
		},
		specs: [ 138, 292, 293 ],
		SP: 
	[ { PUID: 138,
	  regex: '504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E70726573656E746174696F6E(.+)6F66666963653A76657273696F6E3D22312E30',
	  signatureOffset: 0,
	  description: 'ODF 1.0 presentation',
	  mime: '' 
	},
	{ PUID: 292,
	  regex: '504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E70726573656E746174696F6E(.+)6F66666963653A76657273696F6E3D22312E3122',
	  signatureOffset: 0,
	  description: 'ODF 1.1 presentation (with version number)',
	  mime: '' 
	},
	{ PUID: 292,
	  regex: '504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E70726573656E746174696F6E',
	  signatureOffset: 0,
	  description: 'ODF 1.1 presentation (without version number)',
	  mime: '' 
	},
	{ PUID: 293,
	  regex: '504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E70726573656E746174696F6E(.+)6F66666963653A76657273696F6E3D22312E3222',
	  signatureOffset: 0,
	  description: 'ODF 1.2 presentation',
	  mime: '' } ],
		extensions: [ 'OTP' ],
		signature: false,
		description: '',
		mime: 'application/vnd.oasis.opendocument.presentation-template' 
	},
	oasis_opendocument_spreadsheet: {
		params: {
			
		},
		specs: [ 137, 294, 295 ],
		SP: 
	[ { PUID: 137,
	  regex: '504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E7370726561647368656574(.+)6F66666963653A76657273696F6E3D22312E30',
	  signatureOffset: 0,
	  description: 'ODF 1.0 spreadsheet',
	  mime: '' 
	},
	{ PUID: 294,
	  regex: '504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E7370726561647368656574504B030414(.+)6F66666963653A76657273696F6E3D22312E3122',
	  signatureOffset: 0,
	  description: 'ODF 1.1 spreadsheet (with version number)',
	  mime: '' 
	},
	{ PUID: 294,
	  regex: '504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E7370726561647368656574504B030414',
	  signatureOffset: 0,
	  description: 'ODF 1.1 spreadsheet (without version number)',
	  mime: '' 
	},
	{ PUID: 295,
	  regex: '504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E7370726561647368656574504B030414(.+)6F66666963653A76657273696F6E3D22312E3222',
	  signatureOffset: 0,
	  description: 'ODF 1.2 spreadsheet',
	  mime: '' } ],
		extensions: [ 'ODS', 'OTS' ],
		signature: false,
		description: '',
		mime: 'application/vnd.oasis.opendocument.spreadsheet' 
	},
	oasis_opendocument_spreadsheet_template: {
		params: {
			
		},
		specs: [ 137, 294, 295 ],
		SP: 
	[ { PUID: 137,
	  regex: '504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E7370726561647368656574(.+)6F66666963653A76657273696F6E3D22312E30',
	  signatureOffset: 0,
	  description: 'ODF 1.0 spreadsheet',
	  mime: '' 
	},
	{ PUID: 294,
	  regex: '504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E7370726561647368656574504B030414(.+)6F66666963653A76657273696F6E3D22312E3122',
	  signatureOffset: 0,
	  description: 'ODF 1.1 spreadsheet (with version number)',
	  mime: '' 
	},
	{ PUID: 294,
	  regex: '504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E7370726561647368656574504B030414',
	  signatureOffset: 0,
	  description: 'ODF 1.1 spreadsheet (without version number)',
	  mime: '' 
	},
	{ PUID: 295,
	  regex: '504B0304.{26}6D696D65747970656170706C69636174696F6E2F766E642E6F617369732E6F70656E646F63756D656E742E7370726561647368656574504B030414(.+)6F66666963653A76657273696F6E3D22312E3222',
	  signatureOffset: 0,
	  description: 'ODF 1.2 spreadsheet',
	  mime: '' } ],
		extensions: [ 'OTS' ],
		signature: false,
		description: '',
		mime: 'application/vnd.oasis.opendocument.spreadsheet-template' 
	},
	_504B030414000600: {
		params: {
			
		},
		specs: [ 214 ],
		extensions: [ 'XLSX' ],
		signature: [ 80, 75, 3, 4, 20, 0, 6, 0 ],
		description: 'MS Office 2007 documents',
		mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
	},
	_4D6963726F736F667420432F432B2B20: {
		params: {
			
		},
		specs: [ 510 ],
		SP: 
	[ { PUID: 510,
	  regex: '44617461626173652056657273696F6E.{15}61EA',
	  signatureOffset: 43,
	  description: 'PowerProject Teamplan',
	  mime: '' } ],
		extensions: [ 'PDB' ],
		signature: [ 77, 105, 99, 114, 111, 115, 111, 102, 116, 32, 67, 47, 67, 43, 43, 32 ],
		description: 'MS C++ debugging symbols file',
		mime: 'application/vnd.palm' 
	},
	_4D2D5720506F636B: {
		params: {
			
		},
		specs: [ 510 ],
		SP: 
	[ { PUID: 510,
	  regex: '44617461626173652056657273696F6E.{15}61EA',
	  signatureOffset: 43,
	  description: 'PowerProject Teamplan',
	  mime: '' } ],
		extensions: [ 'PDB' ],
		signature: [ 77, 45, 87, 32, 80, 111, 99, 107 ],
		description: 'Merriam-Webster Pocket Dictionary',
		mime: 'application/vnd.palm' 
	},
	_ACED000573720012: {
		params: {
			
		},
		specs: [ 510 ],
		SP: 
	[ { PUID: 510,
	  regex: '44617461626173652056657273696F6E.{15}61EA',
	  signatureOffset: 43,
	  description: 'PowerProject Teamplan',
	  mime: '' } ],
		extensions: [ 'PDB' ],
		signature: [ 172, 237, 0, 5, 115, 114, 0, 18 ],
		description: 'BGBlitz position database file',
		mime: 'application/vnd.palm' 
	},
	_737A657A: {
		params: {
			
		},
		specs: [ 510 ],
		SP: 
	[ { PUID: 510,
	  regex: '44617461626173652056657273696F6E.{15}61EA',
	  signatureOffset: 43,
	  description: 'PowerProject Teamplan',
	  mime: '' } ],
		extensions: [ 'PDB' ],
		signature: [ 115, 122, 101, 122 ],
		description: 'PowerBASIC Debugger Symbols',
		mime: 'application/vnd.palm' 
	},
	_736D5F: {
		params: {
			
		},
		specs: [ 510 ],
		SP: 
	[ { PUID: 510,
	  regex: '44617461626173652056657273696F6E.{15}61EA',
	  signatureOffset: 43,
	  description: 'PowerProject Teamplan',
	  mime: '' } ],
		extensions: [ 'PDB' ],
		signature: [ 115, 109, 95 ],
		description: 'PalmOS SuperMemo',
		mime: 'application/vnd.palm' 
	},
	_00004D4D585052: {
		params: {
			
		},
		specs: [],
		extensions: [ 'QXD' ],
		signature: [ 0, 0, 77, 77, 88, 80, 82 ],
		description: 'Quark Express (Motorola)',
		mime: 'application/vnd.quark.quarkxpress' 
	},
	_00004949585052: {
		params: {
			
		},
		specs: [],
		extensions: [ 'QXD' ],
		signature: [ 0, 0, 73, 73, 88, 80, 82 ],
		description: 'Quark Express (Intel)',
		mime: 'application/vnd.quark.quarkxpress' 
	},
	_4E616D653A20: {
		params: {
			
		},
		specs: [],
		extensions: [ 'COD' ],
		signature: [ 78, 97, 109, 101, 58, 32 ],
		description: 'Agent newsreader character map',
		mime: 'application/vnd.rim.cod' 
	},
	_2E524D46: {
		params: {
			
		},
		specs: [],
		extensions: [ 'RMVB' ],
		signature: [ 46, 82, 77, 70 ],
		description: 'RealMedia streaming media',
		mime: 'application/vnd.rn-realmedia-vbr' 
	},
	_4D4D4D440000: {
		params: {
			
		},
		specs: [],
		extensions: [ 'MMF' ],
		signature: [ 77, 77, 77, 68, 0, 0 ],
		description: 'Yamaha Synthetic music Mobile Application Format',
		mime: 'application/vnd.smaf' 
	},
	_58435000: {
		params: {
			
		},
		specs: [],
		extensions: [ 'CAP' ],
		signature: [ 88, 67, 80, 0 ],
		description: 'Packet sniffer files',
		mime: 'application/vnd.tcpdump.pcap' 
	},
	_52545353: {
		params: {
			
		},
		specs: [],
		extensions: [ 'CAP' ],
		signature: [ 82, 84, 83, 83 ],
		description: 'WinNT Netmon capture file',
		mime: 'application/vnd.tcpdump.pcap' 
	},
	_504147454455: {
		params: {
			
		},
		specs: [],
		extensions: [ 'DMP' ],
		signature: [ 80, 65, 71, 69, 68, 85 ],
		description: 'Windows memory dump',
		mime: 'application/vnd.tcpdump.pcap' 
	},
	_4D444D5093A7: {
		params: {
			
		},
		specs: [],
		extensions: [ 'DMP' ],
		signature: [ 77, 68, 77, 80, 147, 167 ],
		description: 'Windows dump file',
		mime: 'application/vnd.tcpdump.pcap' 
	},
	_FF575043: {
		params: {
			
		},
		specs: [],
		extensions: [ 'WPD' ],
		signature: [ 255, 87, 80, 67 ],
		description: 'WordPerfect text and graphics',
		mime: 'application/vnd.wordperfect' 
	},
	xara: {
		params: {
			
		},
		specs: [ 600 ],
		SP: 
	[ { PUID: 600,
	  regex: '78617221001C',
	  signatureOffset: 0,
	  description: 'eXtensible ARchive format',
	  mime: '' } ],
		extensions: [ 'XAR' ],
		signature: false,
		description: '',
		mime: 'application/vnd.xara' 
	},
	_4C4E0200: {
		params: {
			
		},
		specs: [ 474 ],
		SP: 
	[ { PUID: 474,
	  regex: '3F5F0300.{4}FFFFFFFF',
	  signatureOffset: 0,
	  description: 'Windows Help File',
	  mime: '' } ],
		extensions: [ 'HLP' ],
		signature: [ 76, 78, 2, 0 ],
		description: 'Windows help file_3',
		mime: 'application/winhlp' 
	},
	_3F5F0300: {
		params: {
			
		},
		specs: [ 474 ],
		SP: 
	[ { PUID: 474,
	  regex: '3F5F0300.{4}FFFFFFFF',
	  signatureOffset: 0,
	  description: 'Windows Help File',
	  mime: '' } ],
		extensions: [ 'HLP' ],
		signature: [ 63, 95, 3, 0 ],
		description: 'Windows Help file_2',
		mime: 'application/winhlp' 
	},
	_0000FFFFFFFF: {
		params: {
			
		},
		specs: [ 474 ],
		SP: 
	[ { PUID: 474,
	  regex: '3F5F0300.{4}FFFFFFFF',
	  signatureOffset: 0,
	  description: 'Windows Help File',
	  mime: '' } ],
		extensions: [ 'HLP' ],
		signature: [ 0, 0, 255, 255, 255, 255 ],
		description: 'Windows Help file_1',
		mime: 'application/winhlp' 
	},
	
	_377ABCAF271C: {
		params: {
			
		},
		specs: [ 484 ],
		SP: 
	[ { PUID: 484,
	  regex: '377ABCAF271C',
	  signatureOffset: 0,
	  description: '7Zip',
	  mime: '' } ],
		extensions: [ '7Z' ],
		signature: [ 55, 122, 188, 175, 39, 28 ],
		description: '7-Zip compressed file',
		mime: 'application/x-7z-compressed' 
	},
	_454E545259564344: {
		params: {
			
		},
		specs: [],
		extensions: [ 'VCD' ],
		signature: [ 69, 78, 84, 82, 89, 86, 67, 68 ],
		description: 'VideoVCD|VCDImager file',
		mime: 'application/x-cdlink' 
	},
	_6375736800000002: {
		params: {
			
		},
		specs: [],
		extensions: [ 'CSH' ],
		signature: [ 99, 117, 115, 104, 0, 0, 0, 2 ],
		description: 'Photoshop Custom Shape',
		mime: 'application/x-csh' 
	},
	x_director: {
		params: {
			
		},
		specs: [ 192, 314, 315, 317, 486 ],
		SP: 
	[ { PUID: 314,
	  regex: '5053494400010076',
	  signatureOffset: 0,
	  description: 'Play Sid Audio Version 1',
	  mime: '' 
	},
	{ PUID: 315,
	  regex: '5053494400(01|02)007C',
	  signatureOffset: 0,
	  description: 'Play Sid Audio Version 2',
	  mime: '' 
	},
	{ PUID: 317,
	  regex: '58464952.{4}3339564D70616D6918000000010000002C',
	  signatureOffset: 0,
	  description: 'Macromedia Director Macintosh',
	  mime: '' 
	},
	{ PUID: 486,
	  regex: '52494658.{4}4647444D',
	  signatureOffset: 0,
	  description: 'Macromedia Director DCR Windows',
	  mime: '' 
	},
	{ PUID: 486,
	  regex: '58464952.{4}4D444746',
	  signatureOffset: 0,
	  description: 'Macromedia Director DCR Macintosh',
	  mime: '' } ],
		extensions: 
	[ 'DIR',
	'DCR',
	'CST',
	'CCT',
	'CXT',
	'W3D',
	'FGD',
	'SWA'
	],
		signature: false,
		description: '',
		mime: 'application/x-director' 
	},
	_1A03: {
		params: {
			
		},
		specs: [ 410 ],
		SP: 
	[ { PUID: 410,
	  regex: '66696C65646573633A2F2F.{1-132}20{1-3}2E{1-3}2E{1-3}2E{1-3}20{14}20746578742F706C61696E20{1-16}0A31203120(.+)0A55524C2049502D6164647265737320417263686976652D6461746520436F6E74656E742D7479706520417263686976652D6C656E677468',
	  signatureOffset: 0,
	  description: 'Internet Archive 1.1',
	  mime: '' } ],
		extensions: [ 'ARC' ],
		signature: [ 26, 3 ],
		description: 'LH archive (old vers.|type 2)',
		mime: 'application/x-freearc' 
	},
	_1A02: {
		params: {
			
		},
		specs: [ 410 ],
		SP: 
	[ { PUID: 410,
	  regex: '66696C65646573633A2F2F.{1-132}20{1-3}2E{1-3}2E{1-3}2E{1-3}20{14}20746578742F706C61696E20{1-16}0A31203120(.+)0A55524C2049502D6164647265737320417263686976652D6461746520436F6E74656E742D7479706520417263686976652D6C656E677468',
	  signatureOffset: 0,
	  description: 'Internet Archive 1.1',
	  mime: '' } ],
		extensions: [ 'ARC' ],
		signature: [ 26, 2 ],
		description: 'LH archive (old vers.|type 1)',
		mime: 'application/x-freearc' 
	},
	_1A09: {
		params: {
			
		},
		specs: [ 410 ],
		SP: 
	[ { PUID: 410,
	  regex: '66696C65646573633A2F2F.{1-132}20{1-3}2E{1-3}2E{1-3}2E{1-3}20{14}20746578742F706C61696E20{1-16}0A31203120(.+)0A55524C2049502D6164647265737320417263686976652D6461746520436F6E74656E742D7479706520417263686976652D6C656E677468',
	  signatureOffset: 0,
	  description: 'Internet Archive 1.1',
	  mime: '' } ],
		extensions: [ 'ARC' ],
		signature: [ 26, 9 ],
		description: 'LH archive (old vers.|type 5)',
		mime: 'application/x-freearc' 
	},
	_1A08: {
		params: {
			
		},
		specs: [ 410 ],
		SP: 
	[ { PUID: 410,
	  regex: '66696C65646573633A2F2F.{1-132}20{1-3}2E{1-3}2E{1-3}2E{1-3}20{14}20746578742F706C61696E20{1-16}0A31203120(.+)0A55524C2049502D6164647265737320417263686976652D6461746520436F6E74656E742D7479706520417263686976652D6C656E677468',
	  signatureOffset: 0,
	  description: 'Internet Archive 1.1',
	  mime: '' } ],
		extensions: [ 'ARC' ],
		signature: [ 26, 8 ],
		description: 'LH archive (old vers.|type 4)',
		mime: 'application/x-freearc' 
	},
	_41724301: {
		params: {
			
		},
		specs: [ 410 ],
		SP: 
	[ { PUID: 410,
	  regex: '66696C65646573633A2F2F.{1-132}20{1-3}2E{1-3}2E{1-3}2E{1-3}20{14}20746578742F706C61696E20{1-16}0A31203120(.+)0A55524C2049502D6164647265737320417263686976652D6461746520436F6E74656E742D7479706520417263686976652D6C656E677468',
	  signatureOffset: 0,
	  description: 'Internet Archive 1.1',
	  mime: '' } ],
		extensions: [ 'ARC' ],
		signature: [ 65, 114, 67, 1 ],
		description: 'FreeArc compressed file',
		mime: 'application/x-freearc' 
	},
	_1A04: {
		params: {
			
		},
		specs: [ 410 ],
		SP: 
	[ { PUID: 410,
	  regex: '66696C65646573633A2F2F.{1-132}20{1-3}2E{1-3}2E{1-3}2E{1-3}20{14}20746578742F706C61696E20{1-16}0A31203120(.+)0A55524C2049502D6164647265737320417263686976652D6461746520436F6E74656E742D7479706520417263686976652D6C656E677468',
	  signatureOffset: 0,
	  description: 'Internet Archive 1.1',
	  mime: '' } ],
		extensions: [ 'ARC' ],
		signature: [ 26, 4 ],
		description: 'LH archive (old vers.|type 3)',
		mime: 'application/x-freearc' 
	},
	_00000100: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SPL' ],
		signature: [ 0, 0, 1, 0 ],
		description: 'Windows icon|printer spool file',
		mime: 'application/x-futuresplash' 
	},
	_4344303031: {
		params: {
			
		},
		specs: [ 468 ],
		SP: 
	[ { PUID: 468,
	  regex: '4344303031.{1-16384}FF4344303031',
	  signatureOffset: 32769,
	  description: 'ISO Disk Image File',
	  mime: '' } ],
		extensions: [ 'ISO' ],
		signature: [ 67, 68, 48, 48, 49 ],
		description: 'ISO-9660 CD Disc Image',
		mime: 'application/x-iso9660-image' 
	},
	_2D6C68: {
		params: {
			
		},
		specs: [ 626 ],
		SP: 
	[ { PUID: 626,
	  regex: '2D6C68(30|31|34|35|36|37|64)2D',
	  signatureOffset: 2,
	  description: 'LHA File Format',
	  mime: '' } ],
		extensions: [ 'LHA', 'LZH' ],
		signature: [ 45, 108, 104 ],
		description: 'Compressed archive',
		mime: 'application/x-lzh-compressed' 
	},
	_74424D504B6E5772: {
		params: {
			
		},
		specs: [ 396 ],
		SP: 
	[ { PUID: 396,
	  regex: '424F4F4B4D4F4249',
	  signatureOffset: 60,
	  description: 'mobi/prc \'BOOKMOBI\'',
	  mime: '' 
	},
	{ PUID: 396,
	  regex: '5445587452454164',
	  signatureOffset: 60,
	  description: 'mobi/prc \'TEXTREAD\'',
	  mime: '' } ],
		extensions: [ 'PRC' ],
		signature: [ 116, 66, 77, 80, 75, 110, 87, 114 ],
		description: 'PathWay Map file',
		mime: 'application/x-mobipocket-ebook' 
	},
	_424F4F4B4D4F4249: {
		params: {
			
		},
		specs: [ 396 ],
		SP: 
	[ { PUID: 396,
	  regex: '424F4F4B4D4F4249',
	  signatureOffset: 60,
	  description: 'mobi/prc \'BOOKMOBI\'',
	  mime: '' 
	},
	{ PUID: 396,
	  regex: '5445587452454164',
	  signatureOffset: 60,
	  description: 'mobi/prc \'TEXTREAD\'',
	  mime: '' } ],
		extensions: [ 'PRC' ],
		signature: [ 66, 79, 79, 75, 77, 79, 66, 73 ],
		description: 'Palmpilot resource file',
		mime: 'application/x-mobipocket-ebook' 
	},
	
	_4C00000001140200: {
		params: {
			
		},
		specs: [],
		extensions: [ 'LNK' ],
		signature: [ 76, 0, 0, 0, 1, 20, 2, 0 ],
		description: 'Windows shortcut file',
		mime: 'application/x-ms-shortcut' 
	},
	_000100005374616E64617264204A6574204442: {
		params: {
			
		},
		specs: [],
		extensions: [ 'MDB' ],
		signature: [ 0, 1, 0, 0, 83, 116, 97, 110, 100, 97, 114, 100, 32, 74, 101, 116, 32, 68, 66 ],
		description: 'Microsoft Access',
		mime: 'application/x-msaccess' 
	},
	_E8: {
		params: {
			
		},
		specs: [],
		extensions: [ 'COM' ],
		signature: [ 232 ],
		description: 'Windows executable file_1',
		mime: 'application/x-msdownload' 
	},
	_4D5A: {
		params: {
			
		},
		specs: [],
		extensions: [ 'DLL' ],
		signature: [ 77, 90 ],
		description: 'Windows|DOS executable file',
		mime: 'application/x-msdownload' 
	},
	_EB: {
		params: {
			
		},
		specs: [],
		extensions: [ 'COM' ],
		signature: [ 235 ],
		description: 'Windows executable file_3',
		mime: 'application/x-msdownload' 
	},
	_E9: {
		params: {
			
		},
		specs: [],
		extensions: [ 'COM' ],
		signature: [ 233 ],
		description: 'Windows executable file_2',
		mime: 'application/x-msdownload' 
	},
	_2320: {
		params: {
			
		},
		specs: [],
		extensions: [ 'MSI' ],
		signature: [ 35, 32 ],
		description: 'Cerius2 file',
		mime: 'application/x-msdownload' 
	},
	
	_D7CDC69A: {
		params: {
			
		},
		specs: [],
		extensions: [ 'WMF' ],
		signature: [ 215, 205, 198, 154 ],
		description: 'Windows graphics metafile',
		mime: 'application/x-msmetafile' 
	},
	_000100004D534953414D204461746162617365: {
		params: {
			
		},
		specs: [],
		extensions: [ 'MNY' ],
		signature: [ 0, 1, 0, 0, 77, 83, 73, 83, 65, 77, 32, 68, 97, 116, 97, 98, 97, 115, 101 ],
		description: 'Microsoft Money file',
		mime: 'application/x-msmoney' 
	},
	_BE000000AB: {
		params: {
			
		},
		specs: [],
		extensions: [ 'WRI' ],
		signature: [ 190, 0, 0, 0, 171 ],
		description: 'MS Write file_3',
		mime: 'application/x-mswrite' 
	},
	_32BE: {
		params: {
			
		},
		specs: [],
		extensions: [ 'WRI' ],
		signature: [ 50, 190 ],
		description: 'MS Write file_2',
		mime: 'application/x-mswrite' 
	},
	_31BE: {
		params: {
			
		},
		specs: [],
		extensions: [ 'WRI' ],
		signature: [ 49, 190 ],
		description: 'MS Write file_1',
		mime: 'application/x-mswrite' 
	},
	x_netcdf: {
		params: {
			
		},
		specs: [ 282, 283 ],
		SP: 
	[ { PUID: 282,
	  regex: '43444601',
	  signatureOffset: 0,
	  description: 'netCDF-3 Classic',
	  mime: '' 
	},
	{ PUID: 283,
	  regex: '43444602',
	  signatureOffset: 0,
	  description: 'netCDF-3 64-bit',
	  mime: '' } ],
		extensions: [ 'NC', 'CDF' ],
		signature: false,
		description: '',
		mime: 'application/x-netcdf' 
	},
	_526172211A0700: {
		params: {
			
		},
		specs: [ 411, 613 ],
		SP: 
	[ { PUID: 411,
	  regex: '526172211A0700.{2}73{34}1D',
	  signatureOffset: 0,
	  description: 'RAR Archive 2.9',
	  mime: '' 
	},
	{ PUID: 613,
	  regex: '526172211A070100',
	  signatureOffset: 0,
	  description: 'RAR Archive',
	  mime: '' } ],
		extensions: [ 'RAR' ],
		signature: [ 82, 97, 114, 33, 26, 7, 0 ],
		description: 'WinRAR compressed archive',
		mime: 'application/x-rar-compressed' 
	},
	x_shar: {
		params: {
			
		},
		specs: [ 329 ],
		SP: 
	[ { PUID: 329,
	  regex: '2321.{0-1}2F62696E2F73680A2320546869732069732061207368656C6C2061726368697665',
	  signatureOffset: [ 0, 1936 ],
	  description: 'Shell Archive No. 1',
	  mime: '' 
	},
	{ PUID: 329,
	  regex: '2320546869732069732061207368656C6C2061726368697665',
	  signatureOffset: 0,
	  description: 'Shell Archive No. 2',
	  mime: '' } ],
		extensions: [ 'SHAR' ],
		signature: false,
		description: '',
		mime: 'application/x-shar' 
	},
	_465753: {
		params: {
			
		},
		specs: [ 104, 105, 106, 107, 108, 109, 110, 505, 506, 507 ],
		SP: 
	[ { PUID: 104,
	  regex: '46575301',
	  signatureOffset: 0,
	  description: 'SWF 1',
	  mime: '' 
	},
	{ PUID: 105,
	  regex: '46575302',
	  signatureOffset: 0,
	  description: 'SWF 2',
	  mime: '' 
	},
	{ PUID: 106,
	  regex: '46575303',
	  signatureOffset: 0,
	  description: 'SWF 3',
	  mime: '' 
	},
	{ PUID: 107,
	  regex: '46575304',
	  signatureOffset: 0,
	  description: 'SWF 4',
	  mime: '' 
	},
	{ PUID: 108,
	  regex: '46575305',
	  signatureOffset: 0,
	  description: 'SWF 5',
	  mime: '' 
	},
	{ PUID: 109,
	  regex: '46575306',
	  signatureOffset: 0,
	  description: 'SWF 6',
	  mime: '' 
	},
	{ PUID: 109,
	  regex: '43575306',
	  signatureOffset: 0,
	  description: 'SWF 6 - zlib compressed',
	  mime: '' 
	},
	{ PUID: 110,
	  regex: '46575307',
	  signatureOffset: 0,
	  description: 'SWF 7',
	  mime: '' 
	},
	{ PUID: 110,
	  regex: '43575307',
	  signatureOffset: 0,
	  description: 'SWF 7 - zlib compressed',
	  mime: '' 
	},
	{ PUID: 505,
	  regex: '46575308',
	  signatureOffset: 0,
	  description: 'SWF 8',
	  mime: '' 
	},
	{ PUID: 505,
	  regex: '43575308',
	  signatureOffset: 0,
	  description: 'SWF 8 - zlib compressed',
	  mime: '' 
	},
	{ PUID: 506,
	  regex: '46575309',
	  signatureOffset: 0,
	  description: 'SWF 9',
	  mime: '' 
	},
	{ PUID: 506,
	  regex: '43575309',
	  signatureOffset: 0,
	  description: 'SWF 9 - zlib compressed',
	  mime: '' 
	},
	{ PUID: 507,
	  regex: '46575310',
	  signatureOffset: 0,
	  description: 'SWF 10',
	  mime: '' 
	},
	{ PUID: 507,
	  regex: '43575310',
	  signatureOffset: 0,
	  description: 'SWF 10 - zlib compressed',
	  mime: '' } ],
		extensions: [ 'SWF' ],
		signature: [ 70, 87, 83 ],
		description: 'Shockwave Flash player',
		mime: 'application/x-shockwave-flash' 
	},
	_435753: {
		params: {
			
		},
		specs: [ 104, 105, 106, 107, 108, 109, 110, 505, 506, 507 ],
		SP: 
	[ { PUID: 104,
	  regex: '46575301',
	  signatureOffset: 0,
	  description: 'SWF 1',
	  mime: '' 
	},
	{ PUID: 105,
	  regex: '46575302',
	  signatureOffset: 0,
	  description: 'SWF 2',
	  mime: '' 
	},
	{ PUID: 106,
	  regex: '46575303',
	  signatureOffset: 0,
	  description: 'SWF 3',
	  mime: '' 
	},
	{ PUID: 107,
	  regex: '46575304',
	  signatureOffset: 0,
	  description: 'SWF 4',
	  mime: '' 
	},
	{ PUID: 108,
	  regex: '46575305',
	  signatureOffset: 0,
	  description: 'SWF 5',
	  mime: '' 
	},
	{ PUID: 109,
	  regex: '46575306',
	  signatureOffset: 0,
	  description: 'SWF 6',
	  mime: '' 
	},
	{ PUID: 109,
	  regex: '43575306',
	  signatureOffset: 0,
	  description: 'SWF 6 - zlib compressed',
	  mime: '' 
	},
	{ PUID: 110,
	  regex: '46575307',
	  signatureOffset: 0,
	  description: 'SWF 7',
	  mime: '' 
	},
	{ PUID: 110,
	  regex: '43575307',
	  signatureOffset: 0,
	  description: 'SWF 7 - zlib compressed',
	  mime: '' 
	},
	{ PUID: 505,
	  regex: '46575308',
	  signatureOffset: 0,
	  description: 'SWF 8',
	  mime: '' 
	},
	{ PUID: 505,
	  regex: '43575308',
	  signatureOffset: 0,
	  description: 'SWF 8 - zlib compressed',
	  mime: '' 
	},
	{ PUID: 506,
	  regex: '46575309',
	  signatureOffset: 0,
	  description: 'SWF 9',
	  mime: '' 
	},
	{ PUID: 506,
	  regex: '43575309',
	  signatureOffset: 0,
	  description: 'SWF 9 - zlib compressed',
	  mime: '' 
	},
	{ PUID: 507,
	  regex: '46575310',
	  signatureOffset: 0,
	  description: 'SWF 10',
	  mime: '' 
	},
	{ PUID: 507,
	  regex: '43575310',
	  signatureOffset: 0,
	  description: 'SWF 10 - zlib compressed',
	  mime: '' } ],
		extensions: [ 'SWF' ],
		signature: [ 67, 87, 83 ],
		description: 'Shockwave Flash file',
		mime: 'application/x-shockwave-flash' 
	},
	_5374756666497420: {
		params: {
			
		},
		specs: [ 639 ],
		SP: 
	[ { PUID: 639,
	  regex: '5374756666497420',
	  signatureOffset: 0,
	  description: 'Stuffit',
	  mime: '' } ],
		extensions: [ 'SIT' ],
		signature: [ 83, 116, 117, 102, 102, 73, 116, 32 ],
		description: 'StuffIt compressed archive',
		mime: 'application/x-stuffit' 
	},
	_5349542100: {
		params: {
			
		},
		specs: [ 639 ],
		SP: 
	[ { PUID: 639,
	  regex: '5374756666497420',
	  signatureOffset: 0,
	  description: 'Stuffit',
	  mime: '' } ],
		extensions: [ 'SIT' ],
		signature: [ 83, 73, 84, 33, 0 ],
		description: 'StuffIt archive',
		mime: 'application/x-stuffit' 
	},
	x_stuffitx: {
		params: {
			
		},
		specs: [ 399 ],
		SP: 
	[ { PUID: 399,
	  regex: '5374756666497421A136F7DC0AA2A29BDD4215F7DC0AA2A23399',
	  signatureOffset: 0,
	  description: 'StuffIt X',
	  mime: '' } ],
		extensions: [ 'SITX' ],
		signature: false,
		description: '',
		mime: 'application/x-stuffitx' 
	},
	_7573746172: {
		params: {
			
		},
		specs: [],
		extensions: [ 'TAR' ],
		signature: [ 117, 115, 116, 97, 114 ],
		description: 'Tape Archive',
		mime: 'application/x-tar' 
	},
	_80: {
		params: {
			
		},
		specs: [],
		extensions: [ 'OBJ' ],
		signature: [ 128 ],
		description: 'Relocatable object code',
		mime: 'application/x-tgif' 
	},
	_4C01: {
		params: {
			
		},
		specs: [],
		extensions: [ 'OBJ' ],
		signature: [ 76, 1 ],
		description: 'MS COFF relocatable object code',
		mime: 'application/x-tgif' 
	},
	_0764743264647464: {
		params: {
			
		},
		specs: [],
		extensions: [ 'DTD' ],
		signature: [ 7, 100, 116, 50, 100, 100, 116, 100 ],
		description: 'DesignTools 2D Design file',
		mime: 'application/xml-dtd' 
	},
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
// NO or WEAK signature	
	lotus_freelance: {
		params: {
			
		},
		specs: [],
		extensions: [ 'PRE' ],
		signature: false,
		description: '',
		mime: 'application/vnd.lotus-freelance' 
	},
	lotus_screencam: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SCM' ],
		signature: false,
		description: '',
		mime: 'application/vnd.lotus-screencam' 
	},
	mseq: {
		params: {
			
		},
		specs: [],
		extensions: [ 'MSEQ' ],
		signature: false,
		description: '',
		mime: 'application/vnd.mseq' 
	},
	wsdl_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'WSDL' ],
		signature: false,
		description: '',
		mime: 'application/wsdl+xml' 
	},
	wspolicy_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'WSPOLICY' ],
		signature: false,
		description: '',
		mime: 'application/wspolicy+xml' 
	},
	x_java_jnlp_file: {
		params: {
			
		},
		specs: [],
		extensions: [ 'JNLP' ],
		signature: false,
		description: '',
		mime: 'application/x-java-jnlp-file' 
	},
	x_ms_application: {
		params: {
			
		},
		specs: [],
		extensions: [ 'APPLICATION' ],
		signature: false,
		description: '',
		mime: 'application/x-ms-application' 
	},
	x_msmediaview: {
		params: {
			
		},
		specs: [],
		extensions: [ 'MVB', 'M13', 'M14' ],
		signature: false,
		description: '',
		mime: 'application/x-msmediaview' 
	},
	x_msschedule: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SCD' ],
		signature: false,
		description: '',
		mime: 'application/x-msschedule' 
	},
	x_msterminal: {
		params: {
			
		},
		specs: [],
		extensions: [ 'TRM' ],
		signature: false,
		description: '',
		mime: 'application/x-msterminal' 
	},
	x_silverlight_app: {
		params: {
			
		},
		specs: [],
		extensions: [ 'XAP' ],
		signature: false,
		description: '',
		mime: 'application/x-silverlight-app' 
	},
	

	andrew_inset: {
		params: {
			
		},
		specs: [],
		extensions: [ 'EZ' ],
		signature: false,
		description: '',
		mime: 'application/andrew-inset' 
	},
	atom_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'ATOM' ],
		signature: false,
		description: '',
		mime: 'application/atom+xml' 
	},
	atomcat_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'ATOMCAT' ],
		signature: false,
		description: '',
		mime: 'application/atomcat+xml' 
	},
	atomsvc_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'ATOMSVC' ],
		signature: false,
		description: '',
		mime: 'application/atomsvc+xml' 
	},
	ccxml_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'CCXML' ],
		signature: false,
		description: '',
		mime: 'application/ccxml+xml' 
	},
	cdmi_capability: {
		params: {
			
		},
		specs: [],
		extensions: [ 'CDMIA' ],
		signature: false,
		description: '',
		mime: 'application/cdmi-capability' 
	},
	cdmi_container: {
		params: {
			
		},
		specs: [],
		extensions: [ 'CDMIC' ],
		signature: false,
		description: '',
		mime: 'application/cdmi-container' 
	},
	cdmi_domain: {
		params: {
			
		},
		specs: [],
		extensions: [ 'CDMID' ],
		signature: false,
		description: '',
		mime: 'application/cdmi-domain' 
	},
	cdmi_object: {
		params: {
			
		},
		specs: [],
		extensions: [ 'CDMIO' ],
		signature: false,
		description: '',
		mime: 'application/cdmi-object' 
	},
	cdmi_queue: {
		params: {
			
		},
		specs: [],
		extensions: [ 'CDMIQ' ],
		signature: false,
		description: '',
		mime: 'application/cdmi-queue' 
	},
	cu_seeme: {
		params: {
			
		},
		specs: [],
		extensions: [ 'CU' ],
		signature: false,
		description: '',
		mime: 'application/cu-seeme' 
	},
	davmount_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'DAVMOUNT' ],
		signature: false,
		description: '',
		mime: 'application/davmount+xml' 
	},
	docbook_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'DBK' ],
		signature: false,
		description: '',
		mime: 'application/docbook+xml' 
	},
	dssc_der: {
		params: {
			
		},
		specs: [],
		extensions: [ 'DSSC' ],
		signature: false,
		description: '',
		mime: 'application/dssc+der' 
	},
	dssc_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'XDSSC' ],
		signature: false,
		description: '',
		mime: 'application/dssc+xml' 
	},
	emma_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'EMMA' ],
		signature: false,
		description: '',
		mime: 'application/emma+xml' 
	},
	exi: {
		params: {
			
		},
		specs: [],
		extensions: [ 'EXI' ],
		signature: false,
		description: '',
		mime: 'application/exi' 
	},
	font_tdpfr: {
		params: {
			
		},
		specs: [],
		extensions: [ 'PFR' ],
		signature: false,
		description: '',
		mime: 'application/font-tdpfr' 
	},
	gml_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'GML' ],
		signature: false,
		description: '',
		mime: 'application/gml+xml' 
	},
	gxf: {
		params: {
			
		},
		specs: [],
		extensions: [ 'GXF' ],
		signature: false,
		description: '',
		mime: 'application/gxf' 
	},
	hyperstudio: {
		params: {
			
		},
		specs: [],
		extensions: [ 'STK' ],
		signature: false,
		description: '',
		mime: 'application/hyperstudio' 
	},
	inkml_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'INK', 'INKML' ],
		signature: false,
		description: '',
		mime: 'application/inkml+xml' 
	},
	ipfix: {
		params: {
			
		},
		specs: [],
		extensions: [ 'IPFIX' ],
		signature: false,
		description: '',
		mime: 'application/ipfix' 
	},
	java_serialized_object: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SER' ],
		signature: false,
		description: '',
		mime: 'application/java-serialized-object' 
	},
	
	json: {
		params: {
			
		},
		specs: [],
		extensions: [ 'JSON' ],
		signature: false,
		description: '',
		mime: 'application/json' 
	},
	jsonml_json: {
		params: {
			
		},
		specs: [],
		extensions: [ 'JSONML' ],
		signature: false,
		description: '',
		mime: 'application/jsonml+json' 
	},
	lost_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'LOSTXML' ],
		signature: false,
		description: '',
		mime: 'application/lost+xml' 
	},
	
	mads_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'MADS' ],
		signature: false,
		description: '',
		mime: 'application/mads+xml' 
	},
	marc: {
		params: {
			
		},
		specs: [],
		extensions: [ 'MRC' ],
		signature: false,
		description: '',
		mime: 'application/marc' 
	},
	marcxml_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'MRCX' ],
		signature: false,
		description: '',
		mime: 'application/marcxml+xml' 
	},
	mathematica: {
		params: {
			
		},
		specs: [ 201 ],
		extensions: [ 'MA', 'NB', 'MB' ],
		signature: false,
		description: '',
		mime: 'application/mathematica' 
	},
	mathml_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'MATHML' ],
		signature: false,
		description: '',
		mime: 'application/mathml+xml' 
	},
	mbox: {
		params: {
			
		},
		specs: [],
		extensions: [ 'MBOX' ],
		signature: false,
		description: '',
		mime: 'application/mbox' 
	},
	mediaservercontrol_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'MSCML' ],
		signature: false,
		description: '',
		mime: 'application/mediaservercontrol+xml' 
	},
	metalink_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'METALINK' ],
		signature: false,
		description: '',
		mime: 'application/metalink+xml' 
	},
	metalink4_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'META4' ],
		signature: false,
		description: '',
		mime: 'application/metalink4+xml' 
	},
	mets_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'METS' ],
		signature: false,
		description: '',
		mime: 'application/mets+xml' 
	},
	mods_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'MODS' ],
		signature: false,
		description: '',
		mime: 'application/mods+xml' 
	},
	mp21: {
		params: {
			
		},
		specs: [],
		extensions: [ 'M21', 'MP21' ],
		signature: false,
		description: '',
		mime: 'application/mp21' 
	},
	mp4: {
		params: {
			
		},
		specs: [],
		extensions: [ 'MP4S' ],
		signature: false,
		description: '',
		mime: 'application/mp4' 
	},
	
	oda: {
		params: {
			
		},
		specs: [],
		extensions: [ 'ODA' ],
		signature: false,
		description: '',
		mime: 'application/oda' 
	},
	oebps_package_xml: {
		params: {
			
		},
		specs: [ 207 ],
		extensions: [ 'OPF' ],
		signature: false,
		description: '',
		mime: 'application/oebps-package+xml' 
	},
	
	omdoc_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'OMDOC' ],
		signature: false,
		description: '',
		mime: 'application/omdoc+xml' 
	},
	onenote: {
		params: {
			
		},
		specs: [],
		extensions: [ 'ONETOC', 'ONETOC2', 'ONETMP', 'ONEPKG' ],
		signature: false,
		description: '',
		mime: 'application/onenote' 
	},
	oxps: {
		params: {
			
		},
		specs: [],
		extensions: [ 'OXPS' ],
		signature: false,
		description: '',
		mime: 'application/oxps' 
	},
	patch_ops_error_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'XER' ],
		signature: false,
		description: '',
		mime: 'application/patch-ops-error+xml' 
	},
	_25504446: {
		params: {
			
		},
		specs: 
	[ 14,
	144,
	145,
	146,
	147,
	148,
	15,
	157,
	158,
	16,
	17,
	18,
	19,
	20,
	276,
	354,
	476,
	477,
	478,
	479,
	480,
	481,
	488,
	489,
	490,
	491,
	492,
	493,
	95 ],
		SP: 
	[ { PUID: 14,
	  regex: '255044462D312E30',
	  signatureOffset: [ 0, 4 ],
	  description: 'PDF 1.0',
	  mime: '' 
	},
	{ PUID: 144,
	  regex: '255044462D',
	  signatureOffset: 0,
	  description: 'PDF/X-1:1999',
	  mime: '' 
	},
	{ PUID: 145,
	  regex: '255044462D312E33',
	  signatureOffset: 0,
	  description: 'PDF/X-1:2001',
	  mime: '' 
	},
	{ PUID: 146,
	  regex: '255044462D312E34',
	  signatureOffset: 0,
	  description: 'PDF/X-1a:2003',
	  mime: '' 
	},
	{ PUID: 147,
	  regex: '255044462D312E34',
	  signatureOffset: 0,
	  description: 'PDF/X-2:2003',
	  mime: '' 
	},
	{ PUID: 148,
	  regex: '255044462D312E34',
	  signatureOffset: 0,
	  description: 'PDF/X-3:2003',
	  mime: '' 
	},
	{ PUID: 15,
	  regex: '255044462D312E31',
	  signatureOffset: [ 0, 4 ],
	  description: 'PDF 1.1',
	  mime: '' 
	},
	{ PUID: 157,
	  regex: '255044462D312E33',
	  signatureOffset: 0,
	  description: 'PDF/X-1a:2001',
	  mime: '' 
	},
	{ PUID: 158,
	  regex: '255044462D312E33',
	  signatureOffset: 0,
	  description: 'PDF/X-3:2002 (directory)',
	  mime: '' 
	},
	{ PUID: 158,
	  regex: '255044462D312E33',
	  signatureOffset: 0,
	  description: 'PDF/X-3:2002 (metadata)',
	  mime: '' 
	},
	{ PUID: 16,
	  regex: '255044462D312E32',
	  signatureOffset: [ 0, 4 ],
	  description: 'PDF 1.2',
	  mime: '' 
	},
	{ PUID: 17,
	  regex: '255044462D312E33',
	  signatureOffset: [ 0, 4 ],
	  description: 'PDF 1.3',
	  mime: '' 
	},
	{ PUID: 18,
	  regex: '255044462D312E34',
	  signatureOffset: [ 0, 4 ],
	  description: 'PDF 1.4',
	  mime: '' 
	},
	{ PUID: 19,
	  regex: '255044462D312E35',
	  signatureOffset: [ 0, 4 ],
	  description: 'PDF 1.5',
	  mime: '' 
	},
	{ PUID: 20,
	  regex: '255044462D312E36',
	  signatureOffset: [ 0, 4 ],
	  description: 'PDF 1.6',
	  mime: '' 
	},
	{ PUID: 276,
	  regex: '255044462D312E37',
	  signatureOffset: 0,
	  description: 'PDF 1.7',
	  mime: '' 
	},
	{ PUID: 354,
	  regex: '255044462D312E(33|34|35|36|37)',
	  signatureOffset: [ 0, 144 ],
	  description: 'Acrobat PDF/A 1b 1',
	  mime: '' 
	},
	{ PUID: 354,
	  regex: '255044462D312E(33|34|35|36|37)',
	  signatureOffset: [ 0, 144 ],
	  description: 'Acrobat PDF/A 1b 2',
	  mime: '' 
	},
	{ PUID: 476,
	  regex: '255044462D312E[30:37]',
	  signatureOffset: 0,
	  description: 'PDF/A-2A',
	  mime: '' 
	},
	{ PUID: 477,
	  regex: '255044462D312E[30:37]',
	  signatureOffset: 0,
	  description: 'PDF/A-2B',
	  mime: '' 
	},
	{ PUID: 478,
	  regex: '255044462D312E[30:37]',
	  signatureOffset: 0,
	  description: 'PDF/A-2U',
	  mime: '' 
	},
	{ PUID: 479,
	  regex: '255044462D312E[30:37]',
	  signatureOffset: 0,
	  description: 'PDF/A-3A',
	  mime: '' 
	},
	{ PUID: 480,
	  regex: '255044462D312E[30:37]',
	  signatureOffset: 0,
	  description: 'PDF/A-3B',
	  mime: '' 
	},
	{ PUID: 481,
	  regex: '255044462D312E[30:37]',
	  signatureOffset: 0,
	  description: 'PDF/A-3U',
	  mime: '' 
	},
	{ PUID: 488,
	  regex: '255044462D312E[30:37]',
	  signatureOffset: 0,
	  description: 'PDF/X-4',
	  mime: '' 
	},
	{ PUID: 489,
	  regex: '255044462D312E[30:37]',
	  signatureOffset: 0,
	  description: 'PDF/X-4p',
	  mime: '' 
	},
	{ PUID: 490,
	  regex: '255044462D312E[30:37]',
	  signatureOffset: 0,
	  description: 'PDF/X-5g',
	  mime: '' 
	},
	{ PUID: 491,
	  regex: '255044462D312E[30:37]',
	  signatureOffset: 0,
	  description: 'PDF/X-5pg',
	  mime: '' 
	},
	{ PUID: 492,
	  regex: '255044462D312E[30:37]',
	  signatureOffset: 0,
	  description: 'PDF/X-5n',
	  mime: '' 
	},
	{ PUID: 493,
	  regex: '255044462D312E[30:37]',
	  signatureOffset: 0,
	  description: 'PDF/E-1',
	  mime: '' 
	},
	{ PUID: 95,
	  regex: '255044462D312E34',
	  signatureOffset: 0,
	  description: 'Acrobat PDF/A-1a',
	  mime: '' } ],
		extensions: [ 'PDF' ],
		signature: [ 37, 80, 68, 70 ],
		description: 'PDF file',
		mime: 'application/pdf' 
	},
	pgp_encrypted: {
		params: {
			
		},
		specs: [],
		extensions: [ 'PGP' ],
		signature: false,
		description: '',
		mime: 'application/pgp-encrypted' 
	},
	pgp_signature: {
		params: {
			
		},
		specs: [],
		extensions: [ 'ASC', 'SIG' ],
		signature: false,
		description: '',
		mime: 'application/pgp-signature' 
	},
	pics_rules: {
		params: {
			
		},
		specs: [],
		extensions: [ 'PRF' ],
		signature: false,
		description: '',
		mime: 'application/pics-rules' 
	},
	_64000000: {
		params: {
			
		},
		specs: [],
		extensions: [ 'P10' ],
		signature: [ 100, 0, 0, 0 ],
		description: 'Intel PROset|Wireless Profile',
		mime: 'application/pkcs10' 
	},
	pkcs7_mime: {
		params: {
			
		},
		specs: [],
		extensions: [ 'P7M', 'P7C' ],
		signature: false,
		description: '',
		mime: 'application/pkcs7-mime' 
	},
	pkcs7_signature: {
		params: {
			
		},
		specs: [],
		extensions: [ 'P7S' ],
		signature: false,
		description: '',
		mime: 'application/pkcs7-signature' 
	},
	pkcs8: {
		params: {
			
		},
		specs: [],
		extensions: [ 'P8' ],
		signature: false,
		description: '',
		mime: 'application/pkcs8' 
	},
	
	pkix_cert: {
		params: {
			
		},
		specs: [],
		extensions: [ 'CER' ],
		signature: false,
		description: '',
		mime: 'application/pkix-cert' 
	},
	pkix_crl: {
		params: {
			
		},
		specs: [],
		extensions: [ 'CRL' ],
		signature: false,
		description: '',
		mime: 'application/pkix-crl' 
	},
	pkix_pkipath: {
		params: {
			
		},
		specs: [],
		extensions: [ 'PKIPATH' ],
		signature: false,
		description: '',
		mime: 'application/pkix-pkipath' 
	},
	pkixcmp: {
		params: {
			
		},
		specs: [],
		extensions: [ 'PKI' ],
		signature: false,
		description: '',
		mime: 'application/pkixcmp' 
	},
	pls_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'PLS' ],
		signature: false,
		description: '',
		mime: 'application/pls+xml' 
	},
	prs_cww: {
		params: {
			
		},
		specs: [],
		extensions: [ 'CWW' ],
		signature: false,
		description: '',
		mime: 'application/prs.cww' 
	},
	pskc_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'PSKCXML' ],
		signature: false,
		description: '',
		mime: 'application/pskc+xml' 
	},
	rdf_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'RDF' ],
		signature: false,
		description: '',
		mime: 'application/rdf+xml' 
	},
	reginfo_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'RIF' ],
		signature: false,
		description: '',
		mime: 'application/reginfo+xml' 
	},
	relax_ng_compact_syntax: {
		params: {
			
		},
		specs: [],
		extensions: [ 'RNC' ],
		signature: false,
		description: '',
		mime: 'application/relax-ng-compact-syntax' 
	},
	resource_lists_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'RL' ],
		signature: false,
		description: '',
		mime: 'application/resource-lists+xml' 
	},
	resource_lists_diff_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'RLD' ],
		signature: false,
		description: '',
		mime: 'application/resource-lists-diff+xml' 
	},
	rls_services_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'RS' ],
		signature: false,
		description: '',
		mime: 'application/rls-services+xml' 
	},
	rpki_ghostbusters: {
		params: {
			
		},
		specs: [],
		extensions: [ 'GBR' ],
		signature: false,
		description: '',
		mime: 'application/rpki-ghostbusters' 
	},
	rpki_manifest: {
		params: {
			
		},
		specs: [],
		extensions: [ 'MFT' ],
		signature: false,
		description: '',
		mime: 'application/rpki-manifest' 
	},
	rpki_roa: {
		params: {
			
		},
		specs: [],
		extensions: [ 'ROA' ],
		signature: false,
		description: '',
		mime: 'application/rpki-roa' 
	},
	rsd_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'RSD' ],
		signature: false,
		description: '',
		mime: 'application/rsd+xml' 
	},
	rss_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'RSS' ],
		signature: false,
		description: '',
		mime: 'application/rss+xml' 
	},
	sbml_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SBML' ],
		signature: false,
		description: '',
		mime: 'application/sbml+xml' 
	},
	scvp_cv_request: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SCQ' ],
		signature: false,
		description: '',
		mime: 'application/scvp-cv-request' 
	},
	scvp_cv_response: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SCS' ],
		signature: false,
		description: '',
		mime: 'application/scvp-cv-response' 
	},
	scvp_vp_request: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SPQ' ],
		signature: false,
		description: '',
		mime: 'application/scvp-vp-request' 
	},
	scvp_vp_response: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SPP' ],
		signature: false,
		description: '',
		mime: 'application/scvp-vp-response' 
	},
	sdp: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SDP' ],
		signature: false,
		description: '',
		mime: 'application/sdp' 
	},
	set_payment_initiation: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SETPAY' ],
		signature: false,
		description: '',
		mime: 'application/set-payment-initiation' 
	},
	set_registration_initiation: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SETREG' ],
		signature: false,
		description: '',
		mime: 'application/set-registration-initiation' 
	},
	shf_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SHF' ],
		signature: false,
		description: '',
		mime: 'application/shf+xml' 
	},
	
	sparql_query: {
		params: {
			
		},
		specs: [],
		extensions: [ 'RQ' ],
		signature: false,
		description: '',
		mime: 'application/sparql-query' 
	},
	sparql_results_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SRX' ],
		signature: false,
		description: '',
		mime: 'application/sparql-results+xml' 
	},
	srgs: {
		params: {
			
		},
		specs: [],
		extensions: [ 'GRAM' ],
		signature: false,
		description: '',
		mime: 'application/srgs' 
	},
	srgs_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'GRXML' ],
		signature: false,
		description: '',
		mime: 'application/srgs+xml' 
	},
	sru_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SRU' ],
		signature: false,
		description: '',
		mime: 'application/sru+xml' 
	},
	ssdl_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SSDL' ],
		signature: false,
		description: '',
		mime: 'application/ssdl+xml' 
	},
	ssml_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SSML' ],
		signature: false,
		description: '',
		mime: 'application/ssml+xml' 
	},
	tei_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'TEI', 'TEICORPUS' ],
		signature: false,
		description: '',
		mime: 'application/tei+xml' 
	},
	thraud_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'TFI' ],
		signature: false,
		description: '',
		mime: 'application/thraud+xml' 
	},
	timestamped_data: {
		params: {
			
		},
		specs: [],
		extensions: [ 'TSD' ],
		signature: false,
		description: '',
		mime: 'application/timestamped-data' 
	},
	_3gpp_pic_bw_large: {
		params: {
			
		},
		specs: [],
		extensions: [ 'PLB' ],
		signature: false,
		description: '',
		mime: 'application/vnd.3gpp.pic-bw-large' 
	},
	_3gpp_pic_bw_small: {
		params: {
			
		},
		specs: [],
		extensions: [ 'PSB' ],
		signature: false,
		description: '',
		mime: 'application/vnd.3gpp.pic-bw-small' 
	},
	_3gpp_pic_bw_var: {
		params: {
			
		},
		specs: [],
		extensions: [ 'PVB' ],
		signature: false,
		description: '',
		mime: 'application/vnd.3gpp.pic-bw-var' 
	},
	_3gpp2_tcap: {
		params: {
			
		},
		specs: [],
		extensions: [ 'TCAP' ],
		signature: false,
		description: '',
		mime: 'application/vnd.3gpp2.tcap' 
	},
	_3m_post_it_notes: {
		params: {
			
		},
		specs: [],
		extensions: [ 'PWN' ],
		signature: false,
		description: '',
		mime: 'application/vnd.3m.post-it-notes' 
	},
	accpac_simply_aso: {
		params: {
			
		},
		specs: [],
		extensions: [ 'ASO' ],
		signature: false,
		description: '',
		mime: 'application/vnd.accpac.simply.aso' 
	},
	accpac_simply_imp: {
		params: {
			
		},
		specs: [],
		extensions: [ 'IMP' ],
		signature: false,
		description: '',
		mime: 'application/vnd.accpac.simply.imp' 
	},
	acucobol: {
		params: {
			
		},
		specs: [],
		extensions: [ 'ACU' ],
		signature: false,
		description: '',
		mime: 'application/vnd.acucobol' 
	},
	acucorp: {
		params: {
			
		},
		specs: [],
		extensions: [ 'ATC', 'ACUTC' ],
		signature: false,
		description: '',
		mime: 'application/vnd.acucorp' 
	},
	adobe_air_application_installer_package_zip: {
		params: {
			
		},
		specs: [],
		extensions: [ 'AIR' ],
		signature: false,
		description: '',
		mime: 'application/vnd.adobe.air-application-installer-package+zip' 
	},
	adobe_formscentral_fcdt: {
		params: {
			
		},
		specs: [],
		extensions: [ 'FCDT' ],
		signature: false,
		description: '',
		mime: 'application/vnd.adobe.formscentral.fcdt' 
	},
	adobe_fxp: {
		params: {
			
		},
		specs: [],
		extensions: [ 'FXP', 'FXPL' ],
		signature: false,
		description: '',
		mime: 'application/vnd.adobe.fxp' 
	},
	adobe_xdp_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'XDP' ],
		signature: false,
		description: '',
		mime: 'application/vnd.adobe.xdp+xml' 
	},
	adobe_xfdf: {
		params: {
			
		},
		specs: [],
		extensions: [ 'XFDF' ],
		signature: false,
		description: '',
		mime: 'application/vnd.adobe.xfdf' 
	},
	ahead_space: {
		params: {
			
		},
		specs: [],
		extensions: [ 'AHEAD' ],
		signature: false,
		description: '',
		mime: 'application/vnd.ahead.space' 
	},
	airzip_filesecure_azf: {
		params: {
			
		},
		specs: [],
		extensions: [ 'AZF' ],
		signature: false,
		description: '',
		mime: 'application/vnd.airzip.filesecure.azf' 
	},
	airzip_filesecure_azs: {
		params: {
			
		},
		specs: [],
		extensions: [ 'AZS' ],
		signature: false,
		description: '',
		mime: 'application/vnd.airzip.filesecure.azs' 
	},
	amazon_ebook: {
		params: {
			
		},
		specs: [],
		extensions: [ 'AZW' ],
		signature: false,
		description: '',
		mime: 'application/vnd.amazon.ebook' 
	},
	americandynamics_acc: {
		params: {
			
		},
		specs: [],
		extensions: [ 'ACC' ],
		signature: false,
		description: '',
		mime: 'application/vnd.americandynamics.acc' 
	},
	amiga_ami: {
		params: {
			
		},
		specs: [],
		extensions: [ 'AMI' ],
		signature: false,
		description: '',
		mime: 'application/vnd.amiga.ami' 
	},
	android_package_archive: {
		params: {
			
		},
		specs: [],
		extensions: [ 'APK' ],
		signature: false,
		description: '',
		mime: 'application/vnd.android.package-archive' 
	},
	anser_web_certificate_issue_initiation: {
		params: {
			
		},
		specs: [],
		extensions: [ 'CII' ],
		signature: false,
		description: '',
		mime: 'application/vnd.anser-web-certificate-issue-initiation' 
	},
	anser_web_funds_transfer_initiation: {
		params: {
			
		},
		specs: [],
		extensions: [ 'FTI' ],
		signature: false,
		description: '',
		mime: 'application/vnd.anser-web-funds-transfer-initiation' 
	},
	antix_game_component: {
		params: {
			
		},
		specs: [],
		extensions: [ 'ATX' ],
		signature: false,
		description: '',
		mime: 'application/vnd.antix.game-component' 
	},
	apple_installer_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'MPKG' ],
		signature: false,
		description: '',
		mime: 'application/vnd.apple.installer+xml' 
	},
	apple_mpegurl: {
		params: {
			
		},
		specs: [],
		extensions: [ 'M3U8' ],
		signature: false,
		description: '',
		mime: 'application/vnd.apple.mpegurl' 
	},
	aristanetworks_swi: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SWI' ],
		signature: false,
		description: '',
		mime: 'application/vnd.aristanetworks.swi' 
	},
	astraea_software_iota: {
		params: {
			
		},
		specs: [],
		extensions: [ 'IOTA' ],
		signature: false,
		description: '',
		mime: 'application/vnd.astraea-software.iota' 
	},
	audiograph: {
		params: {
			
		},
		specs: [],
		extensions: [ 'AEP' ],
		signature: false,
		description: '',
		mime: 'application/vnd.audiograph' 
	},
	blueice_multipass: {
		params: {
			
		},
		specs: [],
		extensions: [ 'MPM' ],
		signature: false,
		description: '',
		mime: 'application/vnd.blueice.multipass' 
	},
	bmi: {
		params: {
			
		},
		specs: [],
		extensions: [ 'BMI' ],
		signature: false,
		description: '',
		mime: 'application/vnd.bmi' 
	},
	businessobjects: {
		params: {
			
		},
		specs: [],
		extensions: [ 'REP' ],
		signature: false,
		description: '',
		mime: 'application/vnd.businessobjects' 
	},
	chemdraw_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'CDXML' ],
		signature: false,
		description: '',
		mime: 'application/vnd.chemdraw+xml' 
	},
	chipnuts_karaoke_mmd: {
		params: {
			
		},
		specs: [],
		extensions: [ 'MMD' ],
		signature: false,
		description: '',
		mime: 'application/vnd.chipnuts.karaoke-mmd' 
	},
	cinderella: {
		params: {
			
		},
		specs: [],
		extensions: [ 'CDY' ],
		signature: false,
		description: '',
		mime: 'application/vnd.cinderella' 
	},
	claymore: {
		params: {
			
		},
		specs: [],
		extensions: [ 'CLA' ],
		signature: false,
		description: '',
		mime: 'application/vnd.claymore' 
	},
	cloanto_rp9: {
		params: {
			
		},
		specs: [],
		extensions: [ 'RP9' ],
		signature: false,
		description: '',
		mime: 'application/vnd.cloanto.rp9' 
	},
	
	cluetrust_cartomobile_config: {
		params: {
			
		},
		specs: [],
		extensions: [ 'C11AMC' ],
		signature: false,
		description: '',
		mime: 'application/vnd.cluetrust.cartomobile-config' 
	},
	cluetrust_cartomobile_config_pkg: {
		params: {
			
		},
		specs: [],
		extensions: [ 'C11AMZ' ],
		signature: false,
		description: '',
		mime: 'application/vnd.cluetrust.cartomobile-config-pkg' 
	},
	commonspace: {
		params: {
			
		},
		specs: [],
		extensions: [ 'CSP' ],
		signature: false,
		description: '',
		mime: 'application/vnd.commonspace' 
	},
	contact_cmsg: {
		params: {
			
		},
		specs: [],
		extensions: [ 'CDBCMSG' ],
		signature: false,
		description: '',
		mime: 'application/vnd.contact.cmsg' 
	},
	cosmocaller: {
		params: {
			
		},
		specs: [],
		extensions: [ 'CMC' ],
		signature: false,
		description: '',
		mime: 'application/vnd.cosmocaller' 
	},
	crick_clicker: {
		params: {
			
		},
		specs: [],
		extensions: [ 'CLKX' ],
		signature: false,
		description: '',
		mime: 'application/vnd.crick.clicker' 
	},
	crick_clicker_keyboard: {
		params: {
			
		},
		specs: [],
		extensions: [ 'CLKK' ],
		signature: false,
		description: '',
		mime: 'application/vnd.crick.clicker.keyboard' 
	},
	crick_clicker_palette: {
		params: {
			
		},
		specs: [],
		extensions: [ 'CLKP' ],
		signature: false,
		description: '',
		mime: 'application/vnd.crick.clicker.palette' 
	},
	crick_clicker_template: {
		params: {
			
		},
		specs: [],
		extensions: [ 'CLKT' ],
		signature: false,
		description: '',
		mime: 'application/vnd.crick.clicker.template' 
	},
	crick_clicker_wordbank: {
		params: {
			
		},
		specs: [],
		extensions: [ 'CLKW' ],
		signature: false,
		description: '',
		mime: 'application/vnd.crick.clicker.wordbank' 
	},
	criticaltools_wbs_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'WBS' ],
		signature: false,
		description: '',
		mime: 'application/vnd.criticaltools.wbs+xml' 
	},
	ctc_posml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'PML' ],
		signature: false,
		description: '',
		mime: 'application/vnd.ctc-posml' 
	},
	cups_ppd: {
		params: {
			
		},
		specs: [],
		extensions: [ 'PPD' ],
		signature: false,
		description: '',
		mime: 'application/vnd.cups-ppd' 
	},
	curl_car: {
		params: {
			
		},
		specs: [],
		extensions: [ 'CAR' ],
		signature: false,
		description: '',
		mime: 'application/vnd.curl.car' 
	},
	curl_pcurl: {
		params: {
			
		},
		specs: [],
		extensions: [ 'PCURL' ],
		signature: false,
		description: '',
		mime: 'application/vnd.curl.pcurl' 
	},
	dart: {
		params: {
			
		},
		specs: [],
		extensions: [ 'DART' ],
		signature: false,
		description: '',
		mime: 'application/vnd.dart' 
	},
	data_vision_rdz: {
		params: {
			
		},
		specs: [],
		extensions: [ 'RDZ' ],
		signature: false,
		description: '',
		mime: 'application/vnd.data-vision.rdz' 
	},
	dece_data: {
		params: {
			
		},
		specs: [],
		extensions: [ 'UVF', 'UVVF', 'UVD', 'UVVD' ],
		signature: false,
		description: '',
		mime: 'application/vnd.dece.data' 
	},
	dece_ttml_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'UVT', 'UVVT' ],
		signature: false,
		description: '',
		mime: 'application/vnd.dece.ttml+xml' 
	},
	dece_unspecified: {
		params: {
			
		},
		specs: [],
		extensions: [ 'UVX', 'UVVX' ],
		signature: false,
		description: '',
		mime: 'application/vnd.dece.unspecified' 
	},
	dece_zip: {
		params: {
			
		},
		specs: [],
		extensions: [ 'UVZ', 'UVVZ' ],
		signature: false,
		description: '',
		mime: 'application/vnd.dece.zip' 
	},
	denovo_fcselayout_link: {
		params: {
			
		},
		specs: [],
		extensions: [ 'FE_LAUNCH' ],
		signature: false,
		description: '',
		mime: 'application/vnd.denovo.fcselayout-link' 
	},
	dna: {
		params: {
			
		},
		specs: [],
		extensions: [ 'DNA' ],
		signature: false,
		description: '',
		mime: 'application/vnd.dna' 
	},
	dolby_mlp: {
		params: {
			
		},
		specs: [],
		extensions: [ 'MLP' ],
		signature: false,
		description: '',
		mime: 'application/vnd.dolby.mlp' 
	},
	dpgraph: {
		params: {
			
		},
		specs: [],
		extensions: [ 'DPG' ],
		signature: false,
		description: '',
		mime: 'application/vnd.dpgraph' 
	},
	dreamfactory: {
		params: {
			
		},
		specs: [],
		extensions: [ 'DFAC' ],
		signature: false,
		description: '',
		mime: 'application/vnd.dreamfactory' 
	},
	ds_keypoint: {
		params: {
			
		},
		specs: [],
		extensions: [ 'KPXX' ],
		signature: false,
		description: '',
		mime: 'application/vnd.ds-keypoint' 
	},
	dvb_ait: {
		params: {
			
		},
		specs: [],
		extensions: [ 'AIT' ],
		signature: false,
		description: '',
		mime: 'application/vnd.dvb.ait' 
	},
	dvb_service: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SVC' ],
		signature: false,
		description: '',
		mime: 'application/vnd.dvb.service' 
	},
	
	ecowin_chart: {
		params: {
			
		},
		specs: [],
		extensions: [ 'MAG' ],
		signature: false,
		description: '',
		mime: 'application/vnd.ecowin.chart' 
	},
	enliven: {
		params: {
			
		},
		specs: [],
		extensions: [ 'NML' ],
		signature: false,
		description: '',
		mime: 'application/vnd.enliven' 
	},
	epson_esf: {
		params: {
			
		},
		specs: [],
		extensions: [ 'ESF' ],
		signature: false,
		description: '',
		mime: 'application/vnd.epson.esf' 
	},
	
	epson_quickanime: {
		params: {
			
		},
		specs: [],
		extensions: [ 'QAM' ],
		signature: false,
		description: '',
		mime: 'application/vnd.epson.quickanime' 
	},
	epson_salt: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SLT' ],
		signature: false,
		description: '',
		mime: 'application/vnd.epson.salt' 
	},
	epson_ssf: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SSF' ],
		signature: false,
		description: '',
		mime: 'application/vnd.epson.ssf' 
	},
	eszigno3_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'ES3', 'ET3' ],
		signature: false,
		description: '',
		mime: 'application/vnd.eszigno3+xml' 
	},
	ezpix_album: {
		params: {
			
		},
		specs: [],
		extensions: [ 'EZ2' ],
		signature: false,
		description: '',
		mime: 'application/vnd.ezpix-album' 
	},
	ezpix_package: {
		params: {
			
		},
		specs: [],
		extensions: [ 'EZ3' ],
		signature: false,
		description: '',
		mime: 'application/vnd.ezpix-package' 
	},
	fdf: {
		params: {
			
		},
		specs: [],
		extensions: [ 'FDF' ],
		signature: false,
		description: '',
		mime: 'application/vnd.fdf' 
	},
	fdsn_mseed: {
		params: {
			
		},
		specs: [],
		extensions: [ 'MSEED' ],
		signature: false,
		description: '',
		mime: 'application/vnd.fdsn.mseed' 
	},
	fdsn_seed: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SEED', 'DATALESS' ],
		signature: false,
		description: '',
		mime: 'application/vnd.fdsn.seed' 
	},
	flographit: {
		params: {
			
		},
		specs: [],
		extensions: [ 'GPH' ],
		signature: false,
		description: '',
		mime: 'application/vnd.flographit' 
	},
	fluxtime_clip: {
		params: {
			
		},
		specs: [],
		extensions: [ 'FTC' ],
		signature: false,
		description: '',
		mime: 'application/vnd.fluxtime.clip' 
	},
	
	frogans_fnc: {
		params: {
			
		},
		specs: [],
		extensions: [ 'FNC' ],
		signature: false,
		description: '',
		mime: 'application/vnd.frogans.fnc' 
	},
	frogans_ltf: {
		params: {
			
		},
		specs: [],
		extensions: [ 'LTF' ],
		signature: false,
		description: '',
		mime: 'application/vnd.frogans.ltf' 
	},
	fsc_weblaunch: {
		params: {
			
		},
		specs: [],
		extensions: [ 'FSC' ],
		signature: false,
		description: '',
		mime: 'application/vnd.fsc.weblaunch' 
	},
	fujitsu_oasys: {
		params: {
			
		},
		specs: [],
		extensions: [ 'OAS' ],
		signature: false,
		description: '',
		mime: 'application/vnd.fujitsu.oasys' 
	},
	fujitsu_oasys2: {
		params: {
			
		},
		specs: [],
		extensions: [ 'OA2' ],
		signature: false,
		description: '',
		mime: 'application/vnd.fujitsu.oasys2' 
	},
	fujitsu_oasys3: {
		params: {
			
		},
		specs: [],
		extensions: [ 'OA3' ],
		signature: false,
		description: '',
		mime: 'application/vnd.fujitsu.oasys3' 
	},
	fujitsu_oasysgp: {
		params: {
			
		},
		specs: [],
		extensions: [ 'FG5' ],
		signature: false,
		description: '',
		mime: 'application/vnd.fujitsu.oasysgp' 
	},
	fujitsu_oasysprs: {
		params: {
			
		},
		specs: [],
		extensions: [ 'BH2' ],
		signature: false,
		description: '',
		mime: 'application/vnd.fujitsu.oasysprs' 
	},
	fujixerox_ddd: {
		params: {
			
		},
		specs: [ 457, 461 ],
		SP: 
	[ { PUID: 457,
	  regex: '23207374796C652E64646409312E37202D20312F31382F39340D0A232040282329',
	  signatureOffset: 0,
	  description: 'Verity Collection Document Dataset Descriptor Style Set',
	  mime: '' 
	},
	{ PUID: 461,
	  regex: '74576263.{60}242424{57}24246600',
	  signatureOffset: 0,
	  description: 'Verity Collection Index Descriptor File',
	  mime: '' } ],
		extensions: [ 'DDD', 'DID', 'PDD' ],
		signature: false,
		description: '',
		mime: 'application/vnd.fujixerox.ddd' 
	},
	fujixerox_docuworks: {
		params: {
			
		},
		specs: [],
		extensions: [ 'XDW' ],
		signature: false,
		description: '',
		mime: 'application/vnd.fujixerox.docuworks' 
	},
	fujixerox_docuworks_binder: {
		params: {
			
		},
		specs: [],
		extensions: [ 'XBD' ],
		signature: false,
		description: '',
		mime: 'application/vnd.fujixerox.docuworks.binder' 
	},
	fuzzysheet: {
		params: {
			
		},
		specs: [],
		extensions: [ 'FZS' ],
		signature: false,
		description: '',
		mime: 'application/vnd.fuzzysheet' 
	},
	genomatix_tuxedo: {
		params: {
			
		},
		specs: [],
		extensions: [ 'TXD' ],
		signature: false,
		description: '',
		mime: 'application/vnd.genomatix.tuxedo' 
	},
	geogebra_file: {
		params: {
			
		},
		specs: [ 617, 619, 620, 621, 622 ],
		extensions: [ 'GGB' ],
		signature: false,
		description: '',
		mime: 'application/vnd.geogebra.file' 
	},
	geogebra_tool: {
		params: {
			
		},
		specs: [],
		extensions: [ 'GGT' ],
		signature: false,
		description: '',
		mime: 'application/vnd.geogebra.tool' 
	},
	geometry_explorer: {
		params: {
			
		},
		specs: [],
		extensions: [ 'GEX', 'GRE' ],
		signature: false,
		description: '',
		mime: 'application/vnd.geometry-explorer' 
	},
	geonext: {
		params: {
			
		},
		specs: [],
		extensions: [ 'GXT' ],
		signature: false,
		description: '',
		mime: 'application/vnd.geonext' 
	},
	geoplan: {
		params: {
			
		},
		specs: [],
		extensions: [ 'G2W' ],
		signature: false,
		description: '',
		mime: 'application/vnd.geoplan' 
	},
	geospace: {
		params: {
			
		},
		specs: [],
		extensions: [ 'G3W' ],
		signature: false,
		description: '',
		mime: 'application/vnd.geospace' 
	},
	gmx: {
		params: {
			
		},
		specs: [],
		extensions: [ 'GMX' ],
		signature: false,
		description: '',
		mime: 'application/vnd.gmx' 
	},
	
	
	grafeq: {
		params: {
			
		},
		specs: [],
		extensions: [ 'GQF', 'GQS' ],
		signature: false,
		description: '',
		mime: 'application/vnd.grafeq' 
	},
	groove_account: {
		params: {
			
		},
		specs: [],
		extensions: [ 'GAC' ],
		signature: false,
		description: '',
		mime: 'application/vnd.groove-account' 
	},
	groove_help: {
		params: {
			
		},
		specs: [],
		extensions: [ 'GHF' ],
		signature: false,
		description: '',
		mime: 'application/vnd.groove-help' 
	},
	groove_identity_message: {
		params: {
			
		},
		specs: [],
		extensions: [ 'GIM' ],
		signature: false,
		description: '',
		mime: 'application/vnd.groove-identity-message' 
	},
	groove_injector: {
		params: {
			
		},
		specs: [],
		extensions: [ 'GRV' ],
		signature: false,
		description: '',
		mime: 'application/vnd.groove-injector' 
	},
	groove_tool_message: {
		params: {
			
		},
		specs: [],
		extensions: [ 'GTM' ],
		signature: false,
		description: '',
		mime: 'application/vnd.groove-tool-message' 
	},
	groove_tool_template: {
		params: {
			
		},
		specs: [],
		extensions: [ 'TPL' ],
		signature: false,
		description: '',
		mime: 'application/vnd.groove-tool-template' 
	},
	groove_vcard: {
		params: {
			
		},
		specs: [],
		extensions: [ 'VCG' ],
		signature: false,
		description: '',
		mime: 'application/vnd.groove-vcard' 
	},
	hal_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'HAL' ],
		signature: false,
		description: '',
		mime: 'application/vnd.hal+xml' 
	},
	handheld_entertainment_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'ZMM' ],
		signature: false,
		description: '',
		mime: 'application/vnd.handheld-entertainment+xml' 
	},
	hbci: {
		params: {
			
		},
		specs: [],
		extensions: [ 'HBCI' ],
		signature: false,
		description: '',
		mime: 'application/vnd.hbci' 
	},
	hhe_lesson_player: {
		params: {
			
		},
		specs: [],
		extensions: [ 'LES' ],
		signature: false,
		description: '',
		mime: 'application/vnd.hhe.lesson-player' 
	},
	hp_hpgl: {
		params: {
			
		},
		specs: [],
		extensions: [ 'HPGL' ],
		signature: false,
		description: '',
		mime: 'application/vnd.hp-hpgl' 
	},
	hp_hpPUID: {
		params: {
			
		},
		specs: [],
		extensions: [ 'HPID' ],
		signature: false,
		description: '',
		mime: 'application/vnd.hp-hpid' 
	},
	hp_hps: {
		params: {
			
		},
		specs: [],
		extensions: [ 'HPS' ],
		signature: false,
		description: '',
		mime: 'application/vnd.hp-hps' 
	},
	hp_jlyt: {
		params: {
			
		},
		specs: [],
		extensions: [ 'JLT' ],
		signature: false,
		description: '',
		mime: 'application/vnd.hp-jlyt' 
	},
	hp_pcl: {
		params: {
			
		},
		specs: [],
		extensions: [ 'PCL' ],
		signature: false,
		description: '',
		mime: 'application/vnd.hp-pcl' 
	},
	hp_pclxl: {
		params: {
			
		},
		specs: [],
		extensions: [ 'PCLXL' ],
		signature: false,
		description: '',
		mime: 'application/vnd.hp-pclxl' 
	},
	ibm_minipay: {
		params: {
			
		},
		specs: [],
		extensions: [ 'MPY' ],
		signature: false,
		description: '',
		mime: 'application/vnd.ibm.minipay' 
	},
	ibm_modcap: {
		params: {
			
		},
		specs: [],
		extensions: [ 'AFP', 'LISTAFP', 'LIST3820' ],
		signature: false,
		description: '',
		mime: 'application/vnd.ibm.modcap' 
	},
	ibm_rights_management: {
		params: {
			
		},
		specs: [],
		extensions: [ 'IRM' ],
		signature: false,
		description: '',
		mime: 'application/vnd.ibm.rights-management' 
	},
	ibm_secure_container: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SC' ],
		signature: false,
		description: '',
		mime: 'application/vnd.ibm.secure-container' 
	},
	iccprofile: {
		params: {
			
		},
		specs: [],
		extensions: [ 'ICC', 'ICM' ],
		signature: false,
		description: '',
		mime: 'application/vnd.iccprofile' 
	},
	igloader: {
		params: {
			
		},
		specs: [],
		extensions: [ 'IGL' ],
		signature: false,
		description: '',
		mime: 'application/vnd.igloader' 
	},
	immervision_ivp: {
		params: {
			
		},
		specs: [],
		extensions: [ 'IVP' ],
		signature: false,
		description: '',
		mime: 'application/vnd.immervision-ivp' 
	},
	immervision_ivu: {
		params: {
			
		},
		specs: [],
		extensions: [ 'IVU' ],
		signature: false,
		description: '',
		mime: 'application/vnd.immervision-ivu' 
	},
	insors_igm: {
		params: {
			
		},
		specs: [],
		extensions: [ 'IGM' ],
		signature: false,
		description: '',
		mime: 'application/vnd.insors.igm' 
	},
	intercon_formnet: {
		params: {
			
		},
		specs: [],
		extensions: [ 'XPW', 'XPX' ],
		signature: false,
		description: '',
		mime: 'application/vnd.intercon.formnet' 
	},
	intergeo: {
		params: {
			
		},
		specs: [],
		extensions: [ 'I2G' ],
		signature: false,
		description: '',
		mime: 'application/vnd.intergeo' 
	},
	intu_qbo: {
		params: {
			
		},
		specs: [],
		extensions: [ 'QBO' ],
		signature: false,
		description: '',
		mime: 'application/vnd.intu.qbo' 
	},
	
	ipunplugged_rcprofile: {
		params: {
			
		},
		specs: [],
		extensions: [ 'RCPROFILE' ],
		signature: false,
		description: '',
		mime: 'application/vnd.ipunplugged.rcprofile' 
	},
	irepository_package_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'IRP' ],
		signature: false,
		description: '',
		mime: 'application/vnd.irepository.package+xml' 
	},
	is_xpr: {
		params: {
			
		},
		specs: [],
		extensions: [ 'XPR' ],
		signature: false,
		description: '',
		mime: 'application/vnd.is-xpr' 
	},
	isac_fcs: {
		params: {
			
		},
		specs: [],
		extensions: [ 'FCS' ],
		signature: false,
		description: '',
		mime: 'application/vnd.isac.fcs' 
	},
	jam: {
		params: {
			
		},
		specs: [],
		extensions: [ 'JAM' ],
		signature: false,
		description: '',
		mime: 'application/vnd.jam' 
	},
	jcp_javame_midlet_rms: {
		params: {
			
		},
		specs: [],
		extensions: [ 'RMS' ],
		signature: false,
		description: '',
		mime: 'application/vnd.jcp.javame.midlet-rms' 
	},
	jisp: {
		params: {
			
		},
		specs: [],
		extensions: [ 'JISP' ],
		signature: false,
		description: '',
		mime: 'application/vnd.jisp' 
	},
	joost_joda_archive: {
		params: {
			
		},
		specs: [],
		extensions: [ 'JODA' ],
		signature: false,
		description: '',
		mime: 'application/vnd.joost.joda-archive' 
	},
	kahootz: {
		params: {
			
		},
		specs: [],
		extensions: [ 'KTZ', 'KTR' ],
		signature: false,
		description: '',
		mime: 'application/vnd.kahootz' 
	},
	kde_karbon: {
		params: {
			
		},
		specs: [],
		extensions: [ 'KARBON' ],
		signature: false,
		description: '',
		mime: 'application/vnd.kde.karbon' 
	},
	kde_kchart: {
		params: {
			
		},
		specs: [],
		extensions: [ 'CHRT' ],
		signature: false,
		description: '',
		mime: 'application/vnd.kde.kchart' 
	},
	kde_kformula: {
		params: {
			
		},
		specs: [],
		extensions: [ 'KFO' ],
		signature: false,
		description: '',
		mime: 'application/vnd.kde.kformula' 
	},
	kde_kivio: {
		params: {
			
		},
		specs: [],
		extensions: [ 'FLW' ],
		signature: false,
		description: '',
		mime: 'application/vnd.kde.kivio' 
	},
	kde_kontour: {
		params: {
			
		},
		specs: [],
		extensions: [ 'KON' ],
		signature: false,
		description: '',
		mime: 'application/vnd.kde.kontour' 
	},
	kde_kpresenter: {
		params: {
			
		},
		specs: [],
		extensions: [ 'KPR', 'KPT' ],
		signature: false,
		description: '',
		mime: 'application/vnd.kde.kpresenter' 
	},
	kde_kspread: {
		params: {
			
		},
		specs: [],
		extensions: [ 'KSP' ],
		signature: false,
		description: '',
		mime: 'application/vnd.kde.kspread' 
	},
	kenameaapp: {
		params: {
			
		},
		specs: [],
		extensions: [ 'HTKE' ],
		signature: false,
		description: '',
		mime: 'application/vnd.kenameaapp' 
	},
	kidspiration: {
		params: {
			
		},
		specs: [],
		extensions: [ 'KIA' ],
		signature: false,
		description: '',
		mime: 'application/vnd.kidspiration' 
	},
	kinar: {
		params: {
			
		},
		specs: [],
		extensions: [ 'KNE', 'KNP' ],
		signature: false,
		description: '',
		mime: 'application/vnd.kinar' 
	},
	koan: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SKP', 'SKD', 'SKT', 'SKM' ],
		signature: false,
		description: '',
		mime: 'application/vnd.koan' 
	},
	kodak_descriptor: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SSE' ],
		signature: false,
		description: '',
		mime: 'application/vnd.kodak-descriptor' 
	},
	las_las_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'LASXML' ],
		signature: false,
		description: '',
		mime: 'application/vnd.las.las+xml' 
	},
	llamagraphics_life_balance_desktop: {
		params: {
			
		},
		specs: [],
		extensions: [ 'LBD' ],
		signature: false,
		description: '',
		mime: 'application/vnd.llamagraphics.life-balance.desktop' 
	},
	llamagraphics_life_balance_exchange_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'LBE' ],
		signature: false,
		description: '',
		mime: 'application/vnd.llamagraphics.life-balance.exchange+xml' 
	},
	
	macports_portpkg: {
		params: {
			
		},
		specs: [],
		extensions: [ 'PORTPKG' ],
		signature: false,
		description: '',
		mime: 'application/vnd.macports.portpkg' 
	},
	mcd: {
		params: {
			
		},
		specs: [],
		extensions: [ 'MCD' ],
		signature: false,
		description: '',
		mime: 'application/vnd.mcd' 
	},
	medcalcdata: {
		params: {
			
		},
		specs: [],
		extensions: [ 'MC1' ],
		signature: false,
		description: '',
		mime: 'application/vnd.medcalcdata' 
	},
	mediastation_cdkey: {
		params: {
			
		},
		specs: [],
		extensions: [ 'CDKEY' ],
		signature: false,
		description: '',
		mime: 'application/vnd.mediastation.cdkey' 
	},
	mfer: {
		params: {
			
		},
		specs: [],
		extensions: [ 'MWF' ],
		signature: false,
		description: '',
		mime: 'application/vnd.mfer' 
	},
	mfmp: {
		params: {
			
		},
		specs: [],
		extensions: [ 'MFM' ],
		signature: false,
		description: '',
		mime: 'application/vnd.mfmp' 
	},
	micrografx_flo: {
		params: {
			
		},
		specs: [],
		extensions: [ 'FLO' ],
		signature: false,
		description: '',
		mime: 'application/vnd.micrografx.flo' 
	},
	micrografx_igx: {
		params: {
			
		},
		specs: [],
		extensions: [ 'IGX' ],
		signature: false,
		description: '',
		mime: 'application/vnd.micrografx.igx' 
	},
	
	mobius_daf: {
		params: {
			
		},
		specs: [],
		extensions: [ 'DAF' ],
		signature: false,
		description: '',
		mime: 'application/vnd.mobius.daf' 
	},
	mobius_dis: {
		params: {
			
		},
		specs: [],
		extensions: [ 'DIS' ],
		signature: false,
		description: '',
		mime: 'application/vnd.mobius.dis' 
	},
	mobius_mbk: {
		params: {
			
		},
		specs: [],
		extensions: [ 'MBK' ],
		signature: false,
		description: '',
		mime: 'application/vnd.mobius.mbk' 
	},
	mobius_mqy: {
		params: {
			
		},
		specs: [],
		extensions: [ 'MQY' ],
		signature: false,
		description: '',
		mime: 'application/vnd.mobius.mqy' 
	},
	mobius_msl: {
		params: {
			
		},
		specs: [],
		extensions: [ 'MSL' ],
		signature: false,
		description: '',
		mime: 'application/vnd.mobius.msl' 
	},
	mobius_plc: {
		params: {
			
		},
		specs: [ 456 ],
		SP: 
	[ { PUID: 456,
	  regex: '23207374796C652E706C6309312E3131202D20332F322F39340D0A232040282329436F707972696768742028432920313938372D31393934205665726974792C20496E632E0D0A230D0A23',
	  signatureOffset: 0,
	  description: 'Verity Collection Index Style Policy',
	  mime: '' } ],
		extensions: [ 'PLC' ],
		signature: false,
		description: '',
		mime: 'application/vnd.mobius.plc' 
	},
	mobius_txf: {
		params: {
			
		},
		specs: [],
		extensions: [ 'TXF' ],
		signature: false,
		description: '',
		mime: 'application/vnd.mobius.txf' 
	},
	mophun_application: {
		params: {
			
		},
		specs: [],
		extensions: [ 'MPN' ],
		signature: false,
		description: '',
		mime: 'application/vnd.mophun.application' 
	},
	mophun_certificate: {
		params: {
			
		},
		specs: [],
		extensions: [ 'MPC' ],
		signature: false,
		description: '',
		mime: 'application/vnd.mophun.certificate' 
	},
	mozilla_xul_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'XUL' ],
		signature: false,
		description: '',
		mime: 'application/vnd.mozilla.xul+xml' 
	},
	ms_artgalry: {
		params: {
			
		},
		specs: [],
		extensions: [ 'CIL' ],
		signature: false,
		description: '',
		mime: 'application/vnd.ms-artgalry' 
	},
	
	ms_excel_addin_macroenabled_12: {
		params: {
			
		},
		specs: [ 628 ],
		extensions: [ 'XLAM' ],
		signature: false,
		description: '',
		mime: 'application/vnd.ms-excel.addin.macroenabled.12' 
	},
	ms_excel_sheet_binary_macroenabled_12: {
		params: {
			
		},
		specs: [ 595 ],
		extensions: [ 'XLSB' ],
		signature: false,
		description: '',
		mime: 'application/vnd.ms-excel.sheet.binary.macroenabled.12' 
	},
	ms_excel_sheet_macroenabled_12: {
		params: {
			
		},
		specs: [ 445 ],
		extensions: [ 'XLSM' ],
		signature: false,
		description: '',
		mime: 'application/vnd.ms-excel.sheet.macroenabled.12' 
	},
	ms_excel_template_macroenabled_12: {
		params: {
			
		},
		specs: [ 627 ],
		extensions: [ 'XLTM' ],
		signature: false,
		description: '',
		mime: 'application/vnd.ms-excel.template.macroenabled.12' 
	},
	ms_fontobject: {
		params: {
			
		},
		specs: [],
		extensions: [ 'EOT' ],
		signature: false,
		description: '',
		mime: 'application/vnd.ms-fontobject' 
	},
	ms_ims: {
		params: {
			
		},
		specs: [],
		extensions: [ 'IMS' ],
		signature: false,
		description: '',
		mime: 'application/vnd.ms-ims' 
	},
	ms_lrm: {
		params: {
			
		},
		specs: [],
		extensions: [ 'LRM' ],
		signature: false,
		description: '',
		mime: 'application/vnd.ms-lrm' 
	},
	ms_officetheme: {
		params: {
			
		},
		specs: [ 524 ],
		extensions: [ 'THMX' ],
		signature: false,
		description: '',
		mime: 'application/vnd.ms-officetheme' 
	},
	_30xxx: {
		params: {
			
		},
		specs: [ 452 ],
		SP: 
	[ { PUID: 452,
	  regex: '410D0A',
	  signatureOffset: 0,
	  description: 'Acrobat Catalog Cat File',
	  mime: '' } ],
		extensions: [ 'CAT' ],
		signature: [ 48 ],
		description: 'MS security catalog file',
		mime: 'application/vnd.ms-pki.seccat' 
	},
	ms_pki_stl: {
		params: {
			
		},
		specs: [],
		extensions: [ 'STL' ],
		signature: false,
		description: '',
		mime: 'application/vnd.ms-pki.stl' 
	},
	
	ms_powerpoint_addin_macroenabled_12: {
		params: {
			
		},
		specs: [ 633 ],
		extensions: [ 'PPAM' ],
		signature: false,
		description: '',
		mime: 'application/vnd.ms-powerpoint.addin.macroenabled.12' 
	},
	ms_powerpoint_presentation_macroenabled_12: {
		params: {
			
		},
		specs: [ 487 ],
		extensions: [ 'PPTM' ],
		signature: false,
		description: '',
		mime: 'application/vnd.ms-powerpoint.presentation.macroenabled.12' 
	},
	ms_powerpoint_slide_macroenabled_12: {
		params: {
			
		},
		specs: [ 636 ],
		extensions: [ 'SLDM' ],
		signature: false,
		description: '',
		mime: 'application/vnd.ms-powerpoint.slide.macroenabled.12' 
	},
	ms_powerpoint_slideshow_macroenabled_12: {
		params: {
			
		},
		specs: [ 630 ],
		extensions: [ 'PPSM' ],
		signature: false,
		description: '',
		mime: 'application/vnd.ms-powerpoint.slideshow.macroenabled.12' 
	},
	ms_powerpoint_template_macroenabled_12: {
		params: {
			
		},
		specs: [ 632 ],
		extensions: [ 'POTM' ],
		signature: false,
		description: '',
		mime: 'application/vnd.ms-powerpoint.template.macroenabled.12' 
	},
	ms_project: {
		params: {
			
		},
		specs: [ 440 ],
		extensions: [ 'MPP', 'MPT' ],
		signature: false,
		description: '',
		mime: 'application/vnd.ms-project' 
	},
	ms_word_document_macroenabled_12: {
		params: {
			
		},
		specs: [ 523 ],
		extensions: [ 'DOCM' ],
		signature: false,
		description: '',
		mime: 'application/vnd.ms-word.document.macroenabled.12' 
	},
	ms_word_template_macroenabled_12: {
		params: {
			
		},
		specs: [ 599 ],
		extensions: [ 'DOTM' ],
		signature: false,
		description: '',
		mime: 'application/vnd.ms-word.template.macroenabled.12' 
	},
	
	muvee_style: {
		params: {
			
		},
		specs: [],
		extensions: [ 'MSTY' ],
		signature: false,
		description: '',
		mime: 'application/vnd.muvee.style' 
	},
	mynfc: {
		params: {
			
		},
		specs: [],
		extensions: [ 'TAGLET' ],
		signature: false,
		description: '',
		mime: 'application/vnd.mynfc' 
	},
	neurolanguage_nlu: {
		params: {
			
		},
		specs: [],
		extensions: [ 'NLU' ],
		signature: false,
		description: '',
		mime: 'application/vnd.neurolanguage.nlu' 
	},
	
	noblenet_directory: {
		params: {
			
		},
		specs: [],
		extensions: [ 'NND' ],
		signature: false,
		description: '',
		mime: 'application/vnd.noblenet-directory' 
	},
	noblenet_sealer: {
		params: {
			
		},
		specs: [],
		extensions: [ 'NNS' ],
		signature: false,
		description: '',
		mime: 'application/vnd.noblenet-sealer' 
	},
	noblenet_web: {
		params: {
			
		},
		specs: [],
		extensions: [ 'NNW' ],
		signature: false,
		description: '',
		mime: 'application/vnd.noblenet-web' 
	},
	nokia_n_gage_data: {
		params: {
			
		},
		specs: [],
		extensions: [ 'NGDAT' ],
		signature: false,
		description: '',
		mime: 'application/vnd.nokia.n-gage.data' 
	},
	nokia_radio_preset: {
		params: {
			
		},
		specs: [],
		extensions: [ 'RPST' ],
		signature: false,
		description: '',
		mime: 'application/vnd.nokia.radio-preset' 
	},
	nokia_radio_presets: {
		params: {
			
		},
		specs: [],
		extensions: [ 'RPSS' ],
		signature: false,
		description: '',
		mime: 'application/vnd.nokia.radio-presets' 
	},
	novadigm_edm: {
		params: {
			
		},
		specs: [],
		extensions: [ 'EDM' ],
		signature: false,
		description: '',
		mime: 'application/vnd.novadigm.edm' 
	},
	novadigm_edx: {
		params: {
			
		},
		specs: [],
		extensions: [ 'EDX' ],
		signature: false,
		description: '',
		mime: 'application/vnd.novadigm.edx' 
	},
	novadigm_ext: {
		params: {
			
		},
		specs: [],
		extensions: [ 'EXT' ],
		signature: false,
		description: '',
		mime: 'application/vnd.novadigm.extensions' 
	},
	oasis_opendocument_chart: {
		params: {
			
		},
		specs: [],
		extensions: [ 'ODC' ],
		signature: false,
		description: '',
		mime: 'application/vnd.oasis.opendocument.chart' 
	},
	oasis_opendocument_chart_template: {
		params: {
			
		},
		specs: [],
		extensions: [ 'OTC' ],
		signature: false,
		description: '',
		mime: 'application/vnd.oasis.opendocument.chart-template' 
	},
	oasis_opendocument_formula: {
		params: {
			
		},
		specs: [],
		extensions: [ 'ODF' ],
		signature: false,
		description: '',
		mime: 'application/vnd.oasis.opendocument.formula' 
	},
	oasis_opendocument_formula_template: {
		params: {
			
		},
		specs: [],
		extensions: [ 'ODFT' ],
		signature: false,
		description: '',
		mime: 'application/vnd.oasis.opendocument.formula-template' 
	},
	oasis_opendocument_image: {
		params: {
			
		},
		specs: [],
		extensions: [ 'ODI' ],
		signature: false,
		description: '',
		mime: 'application/vnd.oasis.opendocument.image' 
	},
	oasis_opendocument_image_template: {
		params: {
			
		},
		specs: [],
		extensions: [ 'OTI' ],
		signature: false,
		description: '',
		mime: 'application/vnd.oasis.opendocument.image-template' 
	},	
	oasis_opendocument_text_master: {
		params: {
			
		},
		specs: [],
		extensions: [ 'ODM' ],
		signature: false,
		description: '',
		mime: 'application/vnd.oasis.opendocument.text-master' 
	},
	oasis_opendocument_text_web: {
		params: {
			
		},
		specs: [],
		extensions: [ 'OTH' ],
		signature: false,
		description: '',
		mime: 'application/vnd.oasis.opendocument.text-web' 
	},
	olpc_sugar: {
		params: {
			
		},
		specs: [],
		extensions: [ 'XO' ],
		signature: false,
		description: '',
		mime: 'application/vnd.olpc-sugar' 
	},
	oma_dd2_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'DD2' ],
		signature: false,
		description: '',
		mime: 'application/vnd.oma.dd2+xml' 
	},
	openofficeorg_extension: {
		params: {
			
		},
		specs: [],
		extensions: [ 'OXT' ],
		signature: false,
		description: '',
		mime: 'application/vnd.openofficeorg.extension' 
	},
	
	openxmlformats_officedocument_presentationml_slide: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SLDX' ],
		signature: false,
		description: '',
		mime: 'application/vnd.openxmlformats-officedocument.presentationml.slide' 
	},
	openxmlformats_officedocument_presentationml_slideshow: {
		params: {
			
		},
		specs: [ 629 ],
		extensions: [ 'PPSX' ],
		signature: false,
		description: '',
		mime: 'application/vnd.openxmlformats-officedocument.presentationml.slideshow' 
	},
	openxmlformats_officedocument_presentationml_template: {
		params: {
			
		},
		specs: [ 631 ],
		extensions: [ 'POTX' ],
		signature: false,
		description: '',
		mime: 'application/vnd.openxmlformats-officedocument.presentationml.template' 
	},
	openxmlformats_officedocument_spreadsheetml_template: {
		params: {
			
		},
		specs: [ 598 ],
		extensions: [ 'XLTX' ],
		signature: false,
		description: '',
		mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.template' 
	},
	openxmlformats_officedocument_wordprocessingml_template: {
		params: {
			
		},
		specs: [ 597 ],
		extensions: [ 'DOTX' ],
		signature: false,
		description: '',
		mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.template' 
	},
	osgeo_mapguide_package: {
		params: {
			
		},
		specs: [],
		extensions: [ 'MGP' ],
		signature: false,
		description: '',
		mime: 'application/vnd.osgeo.mapguide.package' 
	},
	osgi_dp: {
		params: {
			
		},
		specs: [],
		extensions: [ 'DP' ],
		signature: false,
		description: '',
		mime: 'application/vnd.osgi.dp' 
	},
	osgi_subsystem: {
		params: {
			
		},
		specs: [],
		extensions: [ 'ESA' ],
		signature: false,
		description: '',
		mime: 'application/vnd.osgi.subsystem' 
	},
	
	pawaafile: {
		params: {
			
		},
		specs: [],
		extensions: [ 'PAW' ],
		signature: false,
		description: '',
		mime: 'application/vnd.pawaafile' 
	},
	pg_format: {
		params: {
			
		},
		specs: [ 210 ],
		extensions: [ 'STR' ],
		signature: false,
		description: '',
		mime: 'application/vnd.pg.format' 
	},
	pg_osasli: {
		params: {
			
		},
		specs: [],
		extensions: [ 'EI6' ],
		signature: false,
		description: '',
		mime: 'application/vnd.pg.osasli' 
	},
	picsel: {
		params: {
			
		},
		specs: [],
		extensions: [ 'EFIF' ],
		signature: false,
		description: '',
		mime: 'application/vnd.picsel' 
	},
	pmi_widget: {
		params: {
			
		},
		specs: [],
		extensions: [ 'WG' ],
		signature: false,
		description: '',
		mime: 'application/vnd.pmi.widget' 
	},
	pocketlearn: {
		params: {
			
		},
		specs: [],
		extensions: [ 'PLF' ],
		signature: false,
		description: '',
		mime: 'application/vnd.pocketlearn' 
	},
	powerbuilder6: {
		params: {
			
		},
		specs: [],
		extensions: [ 'PBD' ],
		signature: false,
		description: '',
		mime: 'application/vnd.powerbuilder6' 
	},
	previewsystems_box: {
		params: {
			
		},
		specs: [],
		extensions: [ 'BOX' ],
		signature: false,
		description: '',
		mime: 'application/vnd.previewsystems.box' 
	},
	proteus_magazine: {
		params: {
			
		},
		specs: [],
		extensions: [ 'MGZ' ],
		signature: false,
		description: '',
		mime: 'application/vnd.proteus.magazine' 
	},
	publishare_delta_tree: {
		params: {
			
		},
		specs: [],
		extensions: [ 'QPS' ],
		signature: false,
		description: '',
		mime: 'application/vnd.publishare-delta-tree' 
	},
	pvi_ptid1: {
		params: {
			
		},
		specs: [],
		extensions: [ 'PTID' ],
		signature: false,
		description: '',
		mime: 'application/vnd.pvi.ptid1' 
	},
	
	realvnc_bed: {
		params: {
			
		},
		specs: [],
		extensions: [ 'BED' ],
		signature: false,
		description: '',
		mime: 'application/vnd.realvnc.bed' 
	},
	recordare_musicxml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'MXL' ],
		signature: false,
		description: '',
		mime: 'application/vnd.recordare.musicxml' 
	},
	recordare_musicxml_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'MUSICXML' ],
		signature: false,
		description: '',
		mime: 'application/vnd.recordare.musicxml+xml' 
	},
	rig_cryptonote: {
		params: {
			
		},
		specs: [],
		extensions: [ 'CRYPTONOTE' ],
		signature: false,
		description: '',
		mime: 'application/vnd.rig.cryptonote' 
	},
	
	route66_link66_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'LINK66' ],
		signature: false,
		description: '',
		mime: 'application/vnd.route66.link66+xml' 
	},
	sailingtracker_track: {
		params: {
			
		},
		specs: [],
		extensions: [ 'ST' ],
		signature: false,
		description: '',
		mime: 'application/vnd.sailingtracker.track' 
	},
	seemail: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SEE' ],
		signature: false,
		description: '',
		mime: 'application/vnd.seemail' 
	},
	sema: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SEMA' ],
		signature: false,
		description: '',
		mime: 'application/vnd.sema' 
	},
	semd: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SEMD' ],
		signature: false,
		description: '',
		mime: 'application/vnd.semd' 
	},
	semf: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SEMF' ],
		signature: false,
		description: '',
		mime: 'application/vnd.semf' 
	},
	shana_informed_formdata: {
		params: {
			
		},
		specs: [],
		extensions: [ 'IFM' ],
		signature: false,
		description: '',
		mime: 'application/vnd.shana.informed.formdata' 
	},
	shana_informed_formtemplate: {
		params: {
			
		},
		specs: [],
		extensions: [ 'ITP' ],
		signature: false,
		description: '',
		mime: 'application/vnd.shana.informed.formtemplate' 
	},
	shana_informed_interchange: {
		params: {
			
		},
		specs: [],
		extensions: [ 'IIF' ],
		signature: false,
		description: '',
		mime: 'application/vnd.shana.informed.interchange' 
	},
	shana_informed_package: {
		params: {
			
		},
		specs: [],
		extensions: [ 'IPK' ],
		signature: false,
		description: '',
		mime: 'application/vnd.shana.informed.package' 
	},
	simtech_mindmapper: {
		params: {
			
		},
		specs: [],
		extensions: [ 'TWD', 'TWDS' ],
		signature: false,
		description: '',
		mime: 'application/vnd.simtech-mindmapper' 
	},
	
	smart_teacher: {
		params: {
			
		},
		specs: [],
		extensions: [ 'TEACHER' ],
		signature: false,
		description: '',
		mime: 'application/vnd.smart.teacher' 
	},
	solent_sdkm_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SDKM', 'SDKD' ],
		signature: false,
		description: '',
		mime: 'application/vnd.solent.sdkm+xml' 
	},
	spotfire_dxp: {
		params: {
			
		},
		specs: [],
		extensions: [ 'DXP' ],
		signature: false,
		description: '',
		mime: 'application/vnd.spotfire.dxp' 
	},
	spotfire_sfs: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SFS' ],
		signature: false,
		description: '',
		mime: 'application/vnd.spotfire.sfs' 
	},
	stardivision_calc: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SDC' ],
		signature: false,
		description: '',
		mime: 'application/vnd.stardivision.calc' 
	},
	stardivision_draw: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SDA' ],
		signature: false,
		description: '',
		mime: 'application/vnd.stardivision.draw' 
	},
	stardivision_impress: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SDD' ],
		signature: false,
		description: '',
		mime: 'application/vnd.stardivision.impress' 
	},
	stardivision_math: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SMF' ],
		signature: false,
		description: '',
		mime: 'application/vnd.stardivision.math' 
	},
	stardivision_writer: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SDW', 'VOR' ],
		signature: false,
		description: '',
		mime: 'application/vnd.stardivision.writer' 
	},
	stardivision_writer_global: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SGL' ],
		signature: false,
		description: '',
		mime: 'application/vnd.stardivision.writer-global' 
	},
	stepmania_package: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SMZIP' ],
		signature: false,
		description: '',
		mime: 'application/vnd.stepmania.package' 
	},
	stepmania_stepchart: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SM' ],
		signature: false,
		description: '',
		mime: 'application/vnd.stepmania.stepchart' 
	},
	sun_xml_calc_template: {
		params: {
			
		},
		specs: [],
		extensions: [ 'STC' ],
		signature: false,
		description: '',
		mime: 'application/vnd.sun.xml.calc.template' 
	},
	sun_xml_draw_template: {
		params: {
			
		},
		specs: [],
		extensions: [ 'STD' ],
		signature: false,
		description: '',
		mime: 'application/vnd.sun.xml.draw.template' 
	},
	sun_xml_impress_template: {
		params: {
			
		},
		specs: [],
		extensions: [ 'STI' ],
		signature: false,
		description: '',
		mime: 'application/vnd.sun.xml.impress.template' 
	},
	sun_xml_math: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SXM' ],
		signature: false,
		description: '',
		mime: 'application/vnd.sun.xml.math' 
	},
	sun_xml_writer_global: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SXG' ],
		signature: false,
		description: '',
		mime: 'application/vnd.sun.xml.writer.global' 
	},
	sun_xml_writer_template: {
		params: {
			
		},
		specs: [],
		extensions: [ 'STW' ],
		signature: false,
		description: '',
		mime: 'application/vnd.sun.xml.writer.template' 
	},
	sus_calendar: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SUS', 'SUSP' ],
		signature: false,
		description: '',
		mime: 'application/vnd.sus-calendar' 
	},
	svd: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SVD' ],
		signature: false,
		description: '',
		mime: 'application/vnd.svd' 
	},
	symbian_install: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SIS', 'SISX' ],
		signature: false,
		description: '',
		mime: 'application/vnd.symbian.install' 
	},
	syncml_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'XSM' ],
		signature: false,
		description: '',
		mime: 'application/vnd.syncml+xml' 
	},
	syncml_dm_wbxml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'BDM' ],
		signature: false,
		description: '',
		mime: 'application/vnd.syncml.dm+wbxml' 
	},
	syncml_dm_xml: {
		params: {
			
		},
		specs: [ 401 ],
		SP: 
	[ { PUID: 401,
	  regex: '000000??00000007000000(00|01|02)000000[01:20].{12}000000(00|01)000000(08|10|20)000000(00|01)000000(08|10|20)000000(01|02|03|04|05|06|07|08|09|0A|0B|0C|0D|0E|0F|10|18|20){4}000000[00:05]',
	  signatureOffset: 0,
	  description: 'X-Windows Screen Dump X11',
	  mime: '' } ],
		extensions: [ 'XDM' ],
		signature: false,
		description: '',
		mime: 'application/vnd.syncml.dm+xml' 
	},
	tao_intent_module_archive: {
		params: {
			
		},
		specs: [],
		extensions: [ 'TAO' ],
		signature: false,
		description: '',
		mime: 'application/vnd.tao.intent-module-archive' 
	},
	
	tmobile_livetv: {
		params: {
			
		},
		specs: [],
		extensions: [ 'TMO' ],
		signature: false,
		description: '',
		mime: 'application/vnd.tmobile-livetv' 
	},
	trid_tpt: {
		params: {
			
		},
		specs: [],
		extensions: [ 'TPT' ],
		signature: false,
		description: '',
		mime: 'application/vnd.trid.tpt' 
	},
	triscape_mxs: {
		params: {
			
		},
		specs: [],
		extensions: [ 'MXS' ],
		signature: false,
		description: '',
		mime: 'application/vnd.triscape.mxs' 
	},
	trueapp: {
		params: {
			
		},
		specs: [],
		extensions: [ 'TRA' ],
		signature: false,
		description: '',
		mime: 'application/vnd.trueapp' 
	},
	ufdl: {
		params: {
			
		},
		specs: [],
		extensions: [ 'UFD', 'UFDL' ],
		signature: false,
		description: '',
		mime: 'application/vnd.ufdl' 
	},
	uiq_theme: {
		params: {
			
		},
		specs: [],
		extensions: [ 'UTZ' ],
		signature: false,
		description: '',
		mime: 'application/vnd.uiq.theme' 
	},
	umajin: {
		params: {
			
		},
		specs: [],
		extensions: [ 'UMJ' ],
		signature: false,
		description: '',
		mime: 'application/vnd.umajin' 
	},
	unity: {
		params: {
			
		},
		specs: [],
		extensions: [ 'UNITYWEB' ],
		signature: false,
		description: '',
		mime: 'application/vnd.unity' 
	},
	uoml_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'UOML' ],
		signature: false,
		description: '',
		mime: 'application/vnd.uoml+xml' 
	},
	vcx: {
		params: {
			
		},
		specs: [ 379 ],
		SP: 
	[ { PUID: 379,
	  regex: '30??[01:0C][01:1F].{28}504C4154464F524D00000043{20}554E49515545494400000043{52}434C4153530000000000004D',
	  signatureOffset: 0,
	  description: 'Microsoft Visual FoxPro Class Library',
	  mime: '' } ],
		extensions: [ 'VCX' ],
		signature: false,
		description: '',
		mime: 'application/vnd.vcx' 
	},
	visionary: {
		params: {
			
		},
		specs: [],
		extensions: [ 'VIS' ],
		signature: false,
		description: '',
		mime: 'application/vnd.visionary' 
	},
	vsf: {
		params: {
			
		},
		specs: [],
		extensions: [ 'VSF' ],
		signature: false,
		description: '',
		mime: 'application/vnd.vsf' 
	},
	wap_wbxml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'WBXML' ],
		signature: false,
		description: '',
		mime: 'application/vnd.wap.wbxml' 
	},
	wap_wmlc: {
		params: {
			
		},
		specs: [],
		extensions: [ 'WMLC' ],
		signature: false,
		description: '',
		mime: 'application/vnd.wap.wmlc' 
	},
	wap_wmlscriptc: {
		params: {
			
		},
		specs: [],
		extensions: [ 'WMLSC' ],
		signature: false,
		description: '',
		mime: 'application/vnd.wap.wmlscriptc' 
	},
	webturbo: {
		params: {
			
		},
		specs: [],
		extensions: [ 'WTB' ],
		signature: false,
		description: '',
		mime: 'application/vnd.webturbo' 
	},
	wolfram_player: {
		params: {
			
		},
		specs: [],
		extensions: [ 'NBP' ],
		signature: false,
		description: '',
		mime: 'application/vnd.wolfram.player' 
	},
	
	wqd: {
		params: {
			
		},
		specs: [],
		extensions: [ 'WQD' ],
		signature: false,
		description: '',
		mime: 'application/vnd.wqd' 
	},
	wt_stf: {
		params: {
			
		},
		specs: [],
		extensions: [ 'STF' ],
		signature: false,
		description: '',
		mime: 'application/vnd.wt.stf' 
	},
	
	xfdl: {
		params: {
			
		},
		specs: [],
		extensions: [ 'XFDL' ],
		signature: false,
		description: '',
		mime: 'application/vnd.xfdl' 
	},
	yamaha_hv_dic: {
		params: {
			
		},
		specs: [],
		extensions: [ 'HVD' ],
		signature: false,
		description: '',
		mime: 'application/vnd.yamaha.hv-dic' 
	},
	yamaha_hv_script: {
		params: {
			
		},
		specs: [],
		extensions: [ 'HVS' ],
		signature: false,
		description: '',
		mime: 'application/vnd.yamaha.hv-script' 
	},
	yamaha_hv_voice: {
		params: {
			
		},
		specs: [],
		extensions: [ 'HVP' ],
		signature: false,
		description: '',
		mime: 'application/vnd.yamaha.hv-voice' 
	},
	yamaha_openscoreformat: {
		params: {
			
		},
		specs: [],
		extensions: [ 'OSF' ],
		signature: false,
		description: '',
		mime: 'application/vnd.yamaha.openscoreformat' 
	},
	yamaha_openscoreformat_osfpvg_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'OSFPVG' ],
		signature: false,
		description: '',
		mime: 'application/vnd.yamaha.openscoreformat.osfpvg+xml' 
	},
	yamaha_smaf_audio: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SAF' ],
		signature: false,
		description: '',
		mime: 'application/vnd.yamaha.smaf-audio' 
	},
	
	yellowriver_custom_menu: {
		params: {
			
		},
		specs: [],
		extensions: [ 'CMP' ],
		signature: false,
		description: '',
		mime: 'application/vnd.yellowriver-custom-menu' 
	},
	zul: {
		params: {
			
		},
		specs: [],
		extensions: [ 'ZIR', 'ZIRZ' ],
		signature: false,
		description: '',
		mime: 'application/vnd.zul' 
	},
	zzazz_deck_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'ZAZ' ],
		signature: false,
		description: '',
		mime: 'application/vnd.zzazz.deck+xml' 
	},
	voicexml_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'VXML' ],
		signature: false,
		description: '',
		mime: 'application/voicexml+xml' 
	},
	widget: {
		params: {
			
		},
		specs: [],
		extensions: [ 'WGT' ],
		signature: false,
		description: '',
		mime: 'application/widget' 
	},
	
	x_abiword: {
		params: {
			
		},
		specs: [],
		extensions: [ 'ABW' ],
		signature: false,
		description: '',
		mime: 'application/x-abiword' 
	},
	x_ace_compressed: {
		params: {
			
		},
		specs: [],
		extensions: [ 'ACE' ],
		signature: false,
		description: '',
		mime: 'application/x-ace-compressed' 
	},
	x_authorware_bin: {
		params: {
			
		},
		specs: [],
		extensions: [ 'AAB', 'X32', 'U32', 'VOX' ],
		signature: false,
		description: '',
		mime: 'application/x-authorware-bin' 
	},
	x_authorware_map: {
		params: {
			
		},
		specs: [],
		extensions: [ 'AAM' ],
		signature: false,
		description: '',
		mime: 'application/x-authorware-map' 
	},
	x_authorware_seg: {
		params: {
			
		},
		specs: [],
		extensions: [ 'AAS' ],
		signature: false,
		description: '',
		mime: 'application/x-authorware-seg' 
	},
	x_bcpio: {
		params: {
			
		},
		specs: [],
		extensions: [ 'BCPIO' ],
		signature: false,
		description: '',
		mime: 'application/x-bcpio' 
	},
	x_bittorrent: {
		params: {
			
		},
		specs: [],
		extensions: [ 'TORRENT' ],
		signature: false,
		description: '',
		mime: 'application/x-bittorrent' 
	},
	x_blorb: {
		params: {
			
		},
		specs: [],
		extensions: [ 'BLB', 'BLORB' ],
		signature: false,
		description: '',
		mime: 'application/x-blorb' 
	},
	x_bzip: {
		params: {
			
		},
		specs: [],
		extensions: [ 'BZ' ],
		signature: false,
		description: '',
		mime: 'application/x-bzip' 
	},
	_425A68: {
		params: {
			
		},
		specs: [],
		extensions: [ 'BZ2' ],
		signature: [ 66, 90, 104 ],
		description: 'bzip2 compressed archive',
		mime: 'application/x-bzip2' 
	},
	x_cbr: {
		params: {
			
		},
		specs: [],
		extensions: [ 'CBR', 'CBA', 'CBT', 'CBZ', 'CB7' ],
		signature: false,
		description: '',
		mime: 'application/x-cbr' 
	},
	
	x_cfs_compressed: {
		params: {
			
		},
		specs: [],
		extensions: [ 'CFS' ],
		signature: false,
		description: '',
		mime: 'application/x-cfs-compressed' 
	},
	x_chat: {
		params: {
			
		},
		specs: [],
		extensions: [ 'CHAT' ],
		signature: false,
		description: '',
		mime: 'application/x-chat' 
	},
	x_chess_pgn: {
		params: {
			
		},
		specs: [],
		extensions: [ 'PGN' ],
		signature: false,
		description: '',
		mime: 'application/x-chess-pgn' 
	},
	x_conference: {
		params: {
			
		},
		specs: [],
		extensions: [ 'NSC' ],
		signature: false,
		description: '',
		mime: 'application/x-conference' 
	},
	x_cpio: {
		params: {
			
		},
		specs: [ 635 ],
		SP: 
	[ { PUID: 635,
	  regex: 'C771',
	  signatureOffset: 0,
	  description: 'CPIO',
	  mime: '' } ],
		extensions: [ 'CPIO' ],
		signature: false,
		description: '',
		mime: 'application/x-cpio' 
	},
	
	x_debian_package: {
		params: {
			
		},
		specs: [],
		extensions: [ 'DEB', 'UDEB' ],
		signature: false,
		description: '',
		mime: 'application/x-debian-package' 
	},
	x_dgc_compressed: {
		params: {
			
		},
		specs: [],
		extensions: [ 'DGC' ],
		signature: false,
		description: '',
		mime: 'application/x-dgc-compressed' 
	},
	
	x_doom: {
		params: {
			
		},
		specs: [],
		extensions: [ 'WAD' ],
		signature: false,
		description: '',
		mime: 'application/x-doom' 
	},
	x_dtbncx_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'NCX' ],
		signature: false,
		description: '',
		mime: 'application/x-dtbncx+xml' 
	},
	x_dtbook_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'DTB' ],
		signature: false,
		description: '',
		mime: 'application/x-dtbook+xml' 
	},
	x_dtbresource_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'RES' ],
		signature: false,
		description: '',
		mime: 'application/x-dtbresource+xml' 
	},
	x_dvi: {
		params: {
			
		},
		specs: [ 160 ],
		SP: 
	[ { PUID: 160,
	  regex: 'F702',
	  signatureOffset: 0,
	  description: 'TeX/LaTeX Device-Independent Document',
	  mime: '' } ],
		extensions: [ 'DVI' ],
		signature: false,
		description: '',
		mime: 'application/x-dvi' 
	},
	x_envoy: {
		params: {
			
		},
		specs: [],
		extensions: [ 'EVY' ],
		signature: false,
		description: '',
		mime: 'application/x-envoy' 
	},
	x_eva: {
		params: {
			
		},
		specs: [],
		extensions: [ 'EVA' ],
		signature: false,
		description: '',
		mime: 'application/x-eva' 
	},
	x_font_bdf: {
		params: {
			
		},
		specs: [],
		extensions: [ 'BDF' ],
		signature: false,
		description: '',
		mime: 'application/x-font-bdf' 
	},
	x_font_ghostscript: {
		params: {
			
		},
		specs: [],
		extensions: [ 'GSF' ],
		signature: false,
		description: '',
		mime: 'application/x-font-ghostscript' 
	},
	x_font_linux_psf: {
		params: {
			
		},
		specs: [],
		extensions: [ 'PSF' ],
		signature: false,
		description: '',
		mime: 'application/x-font-linux-psf' 
	},
	x_font_otf: {
		params: {
			
		},
		specs: [ 520 ],
		SP: 
	[ { PUID: 520,
	  regex: '4F54544F.{8-40}43464620',
	  signatureOffset: 0,
	  description: 'OpenType Font File',
	  mime: '' } ],
		extensions: [ 'OTF' ],
		signature: false,
		description: '',
		mime: 'application/x-font-otf' 
	},
	x_font_pcf: {
		params: {
			
		},
		specs: [],
		extensions: [ 'PCF' ],
		signature: false,
		description: '',
		mime: 'application/x-font-pcf' 
	},
	x_font_snf: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SNF' ],
		signature: false,
		description: '',
		mime: 'application/x-font-snf' 
	},
	x_font_ttf: {
		params: {
			
		},
		specs: [],
		extensions: [ 'TTF', 'TTC' ],
		signature: false,
		description: '',
		mime: 'application/x-font-ttf' 
	},
	x_font_type1: {
		params: {
			
		},
		specs: [ 509, 525 ],
		SP: 
	[ { PUID: 509,
	  regex: '0001.{64}81000A002C012C01{43}1E00',
	  signatureOffset: 0,
	  description: 'Adobe PFM',
	  mime: '' 
	},
	{ PUID: 525,
	  regex: '8001.{4}252150532D41646F6265466F6E742D312E30',
	  signatureOffset: 0,
	  description: 'Adobe Printer Font Binary',
	  mime: '' } ],
		extensions: [ 'PFA', 'PFB', 'PFM', 'AFM' ],
		signature: false,
		description: '',
		mime: 'application/x-font-type1' 
	},
	font_woff: {
		params: {
			
		},
		specs: [ 616 ],
		SP: 
	[ { PUID: 616,
	  regex: '774F4646',
	  signatureOffset: 0,
	  description: 'Web Open Font Format',
	  mime: '' } ],
		extensions: [ 'WOFF' ],
		signature: false,
		description: '',
		mime: 'application/font-woff' 
	},
	
	x_gca_compressed: {
		params: {
			
		},
		specs: [],
		extensions: [ 'GCA' ],
		signature: false,
		description: '',
		mime: 'application/x-gca-compressed' 
	},
	x_glulx: {
		params: {
			
		},
		specs: [],
		extensions: [ 'ULX' ],
		signature: false,
		description: '',
		mime: 'application/x-glulx' 
	},
	x_gnumeric: {
		params: {
			
		},
		specs: [],
		extensions: [ 'GNUMERIC' ],
		signature: false,
		description: '',
		mime: 'application/x-gnumeric' 
	},
	x_gramps_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'GRAMPS' ],
		signature: false,
		description: '',
		mime: 'application/x-gramps-xml' 
	},
	x_gtar: {
		params: {
			
		},
		specs: [],
		extensions: [ 'GTAR' ],
		signature: false,
		description: '',
		mime: 'application/x-gtar' 
	},
	x_hdf: {
		params: {
			
		},
		specs: [],
		extensions: [ 'HDF' ],
		signature: false,
		description: '',
		mime: 'application/x-hdf' 
	},
	x_install_instructions: {
		params: {
			
		},
		specs: [],
		extensions: [ 'INSTALL' ],
		signature: false,
		description: '',
		mime: 'application/x-install-instructions' 
	},
	
	x_mie: {
		params: {
			
		},
		specs: [],
		extensions: [ 'MIE' ],
		signature: false,
		description: '',
		mime: 'application/x-mie' 
	},
	
	x_ms_wmd: {
		specs: [],
		extensions: [ 'WMD' ],
		signature: false,
		description: '',
		mime: 'application/x-ms-wmd' 
	},
	x_ms_xbap: {
		params: {
			
		},
		specs: [],
		extensions: [ 'XBAP' ],
		signature: false,
		description: '',
		mime: 'application/x-ms-xbap' 
	},
	
	x_msbinder: {
		params: {
			
		},
		specs: [ 237, 240 ],
		extensions: [ 'OBD' ],
		signature: false,
		description: '',
		mime: 'application/x-msbinder' 
	},
	x_mscardfile: {
		params: {
			
		},
		specs: [],
		extensions: [ 'CRD' ],
		signature: false,
		description: '',
		mime: 'application/x-mscardfile' 
	},
	x_msclip: {
		params: {
			
		},
		specs: [],
		extensions: [ 'CLP' ],
		signature: false,
		description: '',
		mime: 'application/x-msclip' 
	},
	
	x_nzb: {
		params: {
			
		},
		specs: [],
		extensions: [ 'NZB' ],
		signature: false,
		description: '',
		mime: 'application/x-nzb' 
	},
	x_pkcs12: {
		params: {
			
		},
		specs: [],
		extensions: [ 'P12', 'PFX' ],
		signature: false,
		description: '',
		mime: 'application/x-pkcs12' 
	},
	x_pkcs7_certificates: {
		params: {
			
		},
		specs: [],
		extensions: [ 'P7B', 'SPC' ],
		signature: false,
		description: '',
		mime: 'application/x-pkcs7-certificates' 
	},
	x_pkcs7_certreqresp: {
		params: {
			
		},
		specs: [],
		extensions: [ 'P7R' ],
		signature: false,
		description: '',
		mime: 'application/x-pkcs7-certreqresp' 
	},
	x_research_info_systems: {
		params: {
			
		},
		specs: [],
		extensions: [ 'RIS' ],
		signature: false,
		description: '',
		mime: 'application/x-research-info-systems' 
	},
	x_sh: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SH' ],
		signature: false,
		description: '',
		mime: 'application/x-sh' 
	},
	
	x_subrip: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SRT' ],
		signature: false,
		description: '',
		mime: 'application/x-subrip' 
	},
	x_sv4cpio: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SV4CPIO' ],
		signature: false,
		description: '',
		mime: 'application/x-sv4cpio' 
	},
	x_sv4crc: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SV4CRC' ],
		signature: false,
		description: '',
		mime: 'application/x-sv4crc' 
	},
	x_t3vm_image: {
		params: {
			
		},
		specs: [],
		extensions: [ 'T3' ],
		signature: false,
		description: '',
		mime: 'application/x-t3vm-image' 
	},
	x_tads: {
		params: {
			
		},
		specs: [],
		extensions: [ 'GAM' ],
		signature: false,
		description: '',
		mime: 'application/x-tads' 
	},
	x_tcl: {
		params: {
			
		},
		specs: [],
		extensions: [ 'TCL' ],
		signature: false,
		description: '',
		mime: 'application/x-tcl' 
	},
	x_tex: {
		params: {
			
		},
		specs: [],
		extensions: [ 'TEX' ],
		signature: false,
		description: '',
		mime: 'application/x-tex' 
	},
	x_tex_tfm: {
		params: {
			
		},
		specs: [],
		extensions: [ 'TFM' ],
		signature: false,
		description: '',
		mime: 'application/x-tex-tfm' 
	},
	x_texinfo: {
		params: {
			
		},
		specs: [],
		extensions: [ 'TEXINFO', 'TEXI' ],
		signature: false,
		description: '',
		mime: 'application/x-texinfo' 
	},
	
	x_ustar: {
		params: {
			
		},
		specs: [],
		extensions: [ 'USTAR' ],
		signature: false,
		description: '',
		mime: 'application/x-ustar' 
	},
	x_wais_source: {
		params: {
			
		},
		specs: [],
		extensions: [ 'SRC' ],
		signature: false,
		description: '',
		mime: 'application/x-wais-source' 
	},
	x_x509_ca_cert: {
		params: {
			
		},
		specs: [],
		extensions: [ 'DER', 'CRT' ],
		signature: false,
		description: '',
		mime: 'application/x-x509-ca-cert' 
	},
	x_xfig: {
		params: {
			
		},
		specs: [],
		extensions: [ 'FIG' ],
		signature: false,
		description: '',
		mime: 'application/x-xfig' 
	},
	x_xliff_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'XLF' ],
		signature: false,
		description: '',
		mime: 'application/x-xliff+xml' 
	},
	x_xz: {
		params: {
			
		},
		specs: [],
		extensions: [ 'XZ' ],
		signature: false,
		description: '',
		mime: 'application/x-xz' 
	},
	x_zmachine: {
		params: {
			
		},
		specs: [],
		extensions: [ 'Z1', 'Z2', 'Z3', 'Z4', 'Z5', 'Z6', 'Z7', 'Z8' ],
		signature: false,
		description: '',
		mime: 'application/x-zmachine' 
	},
	xaml_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'XAML' ],
		signature: false,
		description: '',
		mime: 'application/xaml+xml' 
	},
	xcap_diff_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'XDF' ],
		signature: false,
		description: '',
		mime: 'application/xcap-diff+xml' 
	},
	xenc_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'XENC' ],
		signature: false,
		description: '',
		mime: 'application/xenc+xml' 
	},
	
// XML
	_3C3F786D6C2076657273696F6E3D22312E30223F3E: {
		params: {
			
		},
		specs: [ 101, 120, 121 ],
		SP: 
	[ { PUID: 101,
	  regex: '3C3F786D6C2076657273696F6E3D(22|27)312E30(22|27)',
	  signatureOffset: [ 0, 3 ],
	  description: 'XML 1.0',
	  mime: '' 
	},
	{ PUID: 120,
	  regex: '.{0-50}3C46696C65436F6C6C656374696F6E20{0-100}3C44524F494456657273696F6E3E{1-10}3C2F44524F494456657273696F6E3E',
	  signatureOffset: 0,
	  description: 'DROID File Collection File',
	  mime: '' 
	},
	{ PUID: 121,
	  regex: '.{0-50}3C46465369676E617475726546696C6520{0-100}56657273696F6E3D',
	  signatureOffset: 0,
	  description: 'DROID Signature File',
	  mime: '' } ],
		extensions: [ 'XML' ],
		signature: [ 60, 63, 120, 109, 108, 32, 118, 101, 114, 115, 105, 111, 110, 61, 34, 49, 46, 48, 34, 63, 62 ],
		description: 'User Interface Language',
		mime: 'application/xml' 
	},
	xop_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'XOP' ],
		signature: false,
		description: '',
		mime: 'application/xop+xml' 
	},
	xproc_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'XPL' ],
		signature: false,
		description: '',
		mime: 'application/xproc+xml' 
	},
	xslt_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'XSLT' ],
		signature: false,
		description: '',
		mime: 'application/xslt+xml' 
	},
	xspf_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'XSPF' ],
		signature: false,
		description: '',
		mime: 'application/xspf+xml' 
	},
	xv_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'MXML', 'XHVML', 'XVML', 'XVM' ],
		signature: false,
		description: '',
		mime: 'application/xv+xml' 
	},
	yang: {
		params: {
			
		},
		specs: [],
		extensions: [ 'YANG' ],
		signature: false,
		description: '',
		mime: 'application/yang' 
	},
	yin_xml: {
		params: {
			
		},
		specs: [],
		extensions: [ 'YIN' ],
		signature: false,
		description: '',
		mime: 'application/yin+xml' 
	}
}




var resObj = {}; 
for (var key in o){
	var res = { signatureOffset: 0, params: {}, specs: 0, SP: 0 };
	var obj = o[key];
	if ('signatureOffset' in obj) {
		res.signatureOffset = obj.signatureOffset;
	} else {
		delete res.signatureOffset;
	}
	if ('description' in obj) res.params.description = obj.description;
	if ('extensions' in obj) res.params.extensions = obj.extensions;
	if ('mime' in obj) res.params.mime = obj.mime;
	if ('specs' in obj && obj['specs'] instanceof Array && typeof obj.specs[0] === 'object'){
		var specs = [];
		obj.specs.forEach(function(objS){
			var s = { PUID: 0, params: {}, regex: '' };
			if ('PUID' in objS) {
				s.PUID = objS.PUID;
			} else {
				delete s.PUID;
			}
			if ('description' in objS) s.params.description = objS.description;
			if ('extensions' in objS) s.params.extensions = objS.extensions;
			if ('mime' in objS) s.params.mime = objS.mime;
			if ('regex' in objS) s.regex = objS.regex;
			specs.push(s);
		});
		res.specs = specs;
	} else if ('specs' in obj && obj['specs'] instanceof Array) {
		if (obj.specs.length>0) {
			var s = (obj.specs.length===1 && (typeof obj.specs[0] === 'number')) ? { PUID: obj.specs[0] } : obj.specs.map(function(n){ return { PUID: n }; });
			res.specs = s;
		} else {
			delete res.specs;
		}
	} else if (typeof obj === 'object' && 'specs' in obj) {
		res.specs = (typeof obj.specs === 'number') ? { PUID: obj.specs } : obj.specs;
	} else {
		delete res.specs;
	}
	
	if ('SP' in obj && obj['SP'] instanceof Array && typeof obj.SP[0] === 'object'){
		var SP = [];
		obj.SP.forEach(function(objS){
			var s = { PUID: 0, params: {}, regex: '' };
			if ('PUID' in objS) {
				s.PUID = objS.PUID;
			} else {
				delete s.PUID;
			}
			if ('description' in objS) s.params.description = objS.description;
			if ('extensions' in objS) s.params.extensions = objS.extensions;
			if ('mime' in objS) s.params.mime = objS.mime;
			if ('regex' in objS) s.regex = objS.regex;
			SP.push(s);
		});
		res.SP = SP;
	} else if (typeof obj === 'object' && 'SP' in obj) {
		res.SP = (typeof obj.SP === 'number') ? { PUID: obj.SP } : obj.SP;
	} else if ('SP' in obj && obj['SP'] instanceof Array) {
		res.SP = obj.SP;
	} else {
		delete res.SP;
	}
	resObj[key] = res;
}

console.log( util.inspect(resObj, {depth:null, colors:true}) );