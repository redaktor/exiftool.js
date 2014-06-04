// summary:
//    The "which makernote?" for exiftool.js

// description:
//    we use a shortened MAKE to decide :
//    key = tidyString(oTags.image.Make.substr(0,15).toUpperCase())
//    [ just to fix typos by some D4s writing "Corporatio" and Olympus' ".Ltd"/"Ltd." fail etc. ] 

// returns:
//    name of the makernote file

exports.info = { 
	'AGFA' 				: 'agfa.js',

	'CANON' 			: 'canon.js',
	
	'FUJIFILM' 			: 'fujifilm.js',
	'FUJI PHOTO FILM' 	: 'fujifilm.js',
	'GENERALE' 			: 'fujifilm.js',
	'GE' 				: 'fujifilm.js',
	/* TODO - GE is a function to cover GE makernotes which are not done :
		Name => 'MakerNoteGE',
		Condition => '$$valPt =~ /^GE(\0\0|NIC\0)/',
		SubDirectory => {
			TagTable => 'Image::ExifTool::GE::Main',
			Start => '$valuePtr + 18',
			FixBase => 1,
			AutoFix => 1,
			ByteOrder => 'Unknown',
	   },
	*/
	
	'EASTMAN KODAK C' 	: 'kodak.js',
	'KODAK' 			: 'kodak.js',
	
	'LEICA CAMERA AG'	: function(make, model, headerStr){
		if ( headerStr === 'LEICA' ){
			if ( model === 'S2' || model === 'LEICA M (Typ 240)' || model === 'LEICA S (Typ 006)' ){
				return 'panasonicLeica6.js'	
			/* TODO : find exact values : */	
			} else if ( model.indexOf('X1')>-1 || model.indexOf('X2')>-1 || model.indexOf('X VARIO')>-1 ){
				return 'panasonicLeica5.js'
			} else {
				return 'panasonicLeica2.js'
			}
		} else {
			if ( model != 'S2' && model != 'LEICA M (Typ 240)' ){
				return 'panasonicLeica3.js'
			} else if ( headerStr === 'LEICA0' ){
				return 'panasonicLeica4.js'
			} else {
				// should not happen ...
				return 'panasonicLeica5.js'
			}
		}
	}, 
	
	'LEICA' 			: 'panasonic.js',
	'PANASONIC' 		: 'panasonic.js',
	
	'OLYMPUS IMAGING' 	: 'olympus.js', 	/* makernote is in subIFDs */
	'OLYMPUS CORPORA' 	: 'olympus.js', 	/* makernote is in subIFDs */
	'OLYMPUS OPTICAL' 	: 'olympus.js', 	/* makernote is in root */
	
	'KONICA MINOLTA' 	: 'minolta.js',
	'MINOLTA CO.,LTD' 	: function(make, model, headerStr){
		/* TODO - models using different tags - MAYBE ALL HERE (those where make != 'KONICA MINOLTA')
		
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
		{
			# /^MLY0/ - DiMAGE G400, G500, G530, G600
			# /^KC/   - Revio KD-420Z, DiMAGE E203
			# /^+M+M/ - DiMAGE E201
			# /^\xd7/ - DiMAGE RD3000
			Name => 'MakerNoteMinolta3',
			Condition => '$$self{Make} =~ /^(Konica Minolta|Minolta)/i',
			Binary => 1,
			Notes => 'not EXIF-based',
		},
			
		*/
		return 'minolta.js';
	},
	
	'NIKON CORPORATI' 	: 'nikon.js',		
	/*  :: covers tags for headerStr :
	//	NikonMM = type3 headerless (used by all DSLR cameras), 
	//	Nikon   = type1 (used by most consumer cameras) */
	
	/* TODO - pentax is a mess - add Ashahi etc. pp. */
	'PENTAX' 			: 'pentax.js',
	'PENTAX CORPORAT' 	: 'pentax.js',

	'PENTAX RICOH IM' 	: 'ricoh.js',
	'RICOH' 			: 'ricoh.js',
	
	'SANYO ELECTRIC ' 	: 'sanyo.js',
	'SANYO'   			: 'sanyo.js',
	
	'SIGMA'				: 'sigma.js',
	'FOVEON'			: 'sigma.js',
	
	'SONY' 				: function(make, model, headerStr){ /* makernote can be olympus */			
		if ( headerStr==='SONY PI'){
			return 'olympus.js';
		} else if ( headerStr==='PREMI' && new RegExp(/^(DSLR-.*|SLT-A(33|35|55V)|NEX-(3|5|C3|VG10E))$/).test(model) ){
			return 'olympus.js';
		}
		
		/* TODO
		{
			Name => 'MakerNoteSony4',
			# (starts with "SONY PIC\0" -- DSC-H200/J20/W370/W510, MHS-TS20)
			Condition => '$$valPt=~/^SONY PIC\0/',
			SubDirectory => { TagTable => 'Image::ExifTool::Sony::PIC' },
		}, 
		{
			Name => 'MakerNoteSonyEricsson',
			Condition => '$$valPt =~ /^SEMC MS\0/',
			SubDirectory => {
				TagTable => 'Image::ExifTool::Sony::Ericsson',
				Start => '$valuePtr + 20',
				Base => '$start - 8',
				ByteOrder => 'Unknown',
			},
		},
		{
			Name => 'MakerNoteSonySRF',
			Condition => '$$self{Make}=~/^SONY/',
			SubDirectory => {
				TagTable => 'Image::ExifTool::Sony::SRF',
				Start => '$valuePtr',
				ByteOrder => 'Unknown',
			},
		},
		*/
		
		return 'sony.js';
	}
}