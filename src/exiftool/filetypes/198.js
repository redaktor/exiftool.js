exports.info = { FormatID: '923',
  FormatName: 'MPEG Audio Stream, Layer II',
  FormatVersion: '',
  FormatAliases: '',
  FormatFamilies: '',
  FormatTypes: 'Audio',
  FormatDisclosure: '',
  FormatDescription: 'This is an outline record only, and requires further details, research or authentication to provide information that will enable users to further understand the format and to assess digital preservation risks associated with it if appropriate. If you are able to help by supplying any additional information concerning this entry, please return to the main PRONOM page and select ‘Add an Entry’.',
  BinaryFileFormat: 'Text',
  ByteOrders: '',
  ReleaseDate: '',
  WithdrawnDate: '',
  ProvenanceSourceID: '1',
  ProvenanceName: 'Digital Preservation Department / The National Archives',
  ProvenanceSourceDate: '27 Oct 2009',
  ProvenanceDescription: '',
  LastUpdatedDate: '27 Oct 2009',
  FormatNote: '',
  FormatRisk: '',
  TechnicalEnvironment: '',
  FileFormatIdentifier: 
   [ { Identifier: 'audio/mpeg', IdentifierType: 'MIME' },
     { Identifier: 'fmt/198', IdentifierType: 'PUID' } ],
  ExternalSignature: 
   [ { ExternalSignatureID: '905',
       Signature: 'mp2',
       SignatureType: 'File extension' },
     { ExternalSignatureID: '1110',
       Signature: 'mpw',
       SignatureType: 'File extension' },
     { ExternalSignatureID: '1111',
       Signature: 'mpa',
       SignatureType: 'File extension' } ],
  InternalSignature: 
   [ { SignatureID: '495',
       SignatureName: 'MPEG-1 Audio Layer II (protected)',
       SignatureNote: 'You have to check for two or more frames in a row to be sure you are dealing with an mpeg file. Frame header: MPEG-1, layer II, protected (FFFCh); Bitrate index Sampling Frequency, padding bit (1 byte), Minimum value 10h, maximum value Ebh; Minimum length of frame-3 to maximum length of frame -3; next frame header (FFFCh) repeat',
       ByteSequence: 
        { ByteSequenceID: '612',
          PositionType: 'Absolute from BOF',
          Offset: '0',
          MaxOffset: '',
          IndirectOffsetLocation: '',
          IndirectOffsetLength: '',
          Endianness: '',
          ByteSequenceValue: 'FFFC[10:EB]{45-1726}FFFC[10:EB]{45-1726}FFFC[10:EB]{45-1726}FFFC[10:EB]{45-1726}' } },
     { SignatureID: '496',
       SignatureName: 'MPEG-1 Audio Layer II (unprotected)',
       SignatureNote: 'You have to check for two or more frames in a row to be sure you are dealing with an mpeg file. Frame header: MPEG-1, layer II, unprotected (FFFDh); Bitrate index Sampling Frequency, padding bit (1 byte), Minimum value 10h, maximum value EBh; Minimum length of frame-3 to maximum length of frame -3; next frame header (FFFDh) repeat',
       ByteSequence: 
        { ByteSequenceID: '613',
          PositionType: 'Absolute from BOF',
          Offset: '0',
          MaxOffset: '',
          IndirectOffsetLocation: '',
          IndirectOffsetLength: '',
          Endianness: '',
          ByteSequenceValue: 'FFFD[10:EB]{45-1726}FFFD[10:EB]{45-1726}FFFD[10:EB]{45-1726}FFFD[10:EB]{45-1726}' } },
     { SignatureID: '497',
       SignatureName: 'MPEG-2 Audio Layer II (protected)',
       SignatureNote: 'You have to check for two or more frames in a row to be sure you are dealing with an mpeg file. Frame header: MPEG-2, layer II, protected (FFF4h); Bitrate index Sampling Frequency, padding bit (1 byte), Minimum value 10h, maximum value Ebh; Minimum length of frame-3 to maximum length of frame -3; next frame header (FFF4h) repeat',
       ByteSequence: 
        { ByteSequenceID: '614',
          PositionType: 'Absolute from BOF',
          Offset: '0',
          MaxOffset: '',
          IndirectOffsetLocation: '',
          IndirectOffsetLength: '',
          Endianness: '',
          ByteSequenceValue: 'FFF4[10:EB]{45-1726}FFF4[10:EB]{45-1726}FFF4[10:EB]{45-1726}FFF4[10:EB]{45-1726}' } },
     { SignatureID: '498',
       SignatureName: 'MPEG-2 Audio Layer II (unprotected)',
       SignatureNote: 'You have to check for two or more frames in a row to be sure you are dealing with an mpeg file. Frame header: MPEG-2, layer II, unprotected (FFF5h); Bitrate index Sampling Frequency, padding bit (1 byte), Minimum value 10h, maximum value EBh; Minimum length of frame-3 to maximum length of frame -3; next frame header (FFF5h); repeat',
       ByteSequence: 
        { ByteSequenceID: '615',
          PositionType: 'Absolute from BOF',
          Offset: '0',
          MaxOffset: '',
          IndirectOffsetLocation: '',
          IndirectOffsetLength: '',
          Endianness: '',
          ByteSequenceValue: 'FFF5[10:EB]{45-1726}FFF5[10:EB]{45-1726}FFF5[10:EB]{45-1726}FFF5[10:EB]{45-1726}' } },
     { SignatureID: '499',
       SignatureName: 'MPEG-1 Audio Layer II with ID3v2 Metadata Tag (protected)',
       SignatureNote: 'You have to check for two or more frames in a row to be sure you are dealing with an mpeg file. Frame header: MPEG-1, layer II, protected (FFFCh); Bitrate index Sampling Frequency, padding bit (1 byte), Minimum value 10h, maximum value EBh; Minimum length of frame-3 to maximum length of frame -3; next frame header (FFFCh) Regularly-spaced frame headers should always be discoverable near EOF. An ID3v1 tag of up to 355 bytes may be present at EOF. The BOF byte sequence represents the MP3 ID3 tag.',
       ByteSequence: 
        [ { ByteSequenceID: '616',
            PositionType: 'Absolute from BOF',
            Offset: '0',
            MaxOffset: '',
            IndirectOffsetLocation: '',
            IndirectOffsetLength: '',
            Endianness: '',
            ByteSequenceValue: '494433' },
          { ByteSequenceID: '617',
            PositionType: 'Absolute from EOF',
            Offset: '0',
            MaxOffset: '',
            IndirectOffsetLocation: '',
            IndirectOffsetLength: '',
            Endianness: '',
            ByteSequenceValue: 'FFFC[10:EB]{45-1726}FFFC[10:EB]{45-1726}FFFC[10:EB]{45-1726}FFFC[10:EB]{45-1726}FFFC[10:EB]{7-500}000000{36-1426}' } ] },
     { SignatureID: '500',
       SignatureName: 'MPEG-1 Audio Layer II with ID3v2 Metadata Tag (unprotected)',
       SignatureNote: 'You have to check for two or more frames in a row to be sure you are dealing with an mpeg file. Frame header: MPEG-1, layer II, unprotected (FFFDh); Bitrate index Sampling Frequency, padding bit (1 byte), Minimum value 10h, maximum value EBh; Minimum length of frame-3 to maximum length of frame -3; next frame header (FFFDh) Regularly-spaced frame headers should always be discoverable near EOF. An ID3v1 tag of up to 355 bytes may be present at EOF. The BOF byte sequence represents the MP3 ID3 tag.',
       ByteSequence: 
        [ { ByteSequenceID: '618',
            PositionType: 'Absolute from BOF',
            Offset: '0',
            MaxOffset: '',
            IndirectOffsetLocation: '',
            IndirectOffsetLength: '',
            Endianness: '',
            ByteSequenceValue: '494433' },
          { ByteSequenceID: '619',
            PositionType: 'Absolute from EOF',
            Offset: '0',
            MaxOffset: '',
            IndirectOffsetLocation: '',
            IndirectOffsetLength: '',
            Endianness: '',
            ByteSequenceValue: 'FFFD[10:EB]{45-1726}FFFD[10:EB]{45-1726}FFFD[10:EB]{45-1726}FFFD[10:EB]{45-1726}FFFD[10:EB]{7-500}000000{36-1426}' } ] },
     { SignatureID: '501',
       SignatureName: 'MPEG-2 Audio Layer II with ID3v2 Metadata Tag (protected)',
       SignatureNote: 'You have to check for two or more frames in a row to be sure you are dealing with an mpeg file. Frame header: MPEG-2, layer II, protected (FFF4h); Bitrate index Sampling Frequency, padding bit (1 byte), Minimum value 10h, maximum value EBh; Minimum length of frame-3 to maximum length of frame -3; next frame header (FFF4h) Regularly-spaced frame headers should always be discoverable near EOF. An ID3v1 tag of up to 355 bytes may be present at EOF. The BOF byte sequence represents the MP3 ID3 tag.',
       ByteSequence: 
        [ { ByteSequenceID: '620',
            PositionType: 'Absolute from BOF',
            Offset: '0',
            MaxOffset: '',
            IndirectOffsetLocation: '',
            IndirectOffsetLength: '',
            Endianness: '',
            ByteSequenceValue: '494433' },
          { ByteSequenceID: '621',
            PositionType: 'Absolute from EOF',
            Offset: '0',
            MaxOffset: '',
            IndirectOffsetLocation: '',
            IndirectOffsetLength: '',
            Endianness: '',
            ByteSequenceValue: 'FFF4[10:EB]{45-1726}FFF4[10:EB]{45-1726}FFF4[10:EB]{45-1726}FFF4[10:EB]{45-1726}FFF4[10:EB]{7-500}000000{36-1426}' } ] },
     { SignatureID: '502',
       SignatureName: 'MPEG-2 Audio Layer II with ID3v2 Metadata Tag (unprotected)',
       SignatureNote: 'You have to check for two or more frames in a row to be sure you are dealing with an mpeg file. Frame header: MPEG-2, layer II, unprotected (FFF5h); Bitrate index Sampling Frequency, padding bit (1 byte), Minimum value 10h, maximum value EBh; Minimum length of frame-3 to maximum length of frame -3; next frame header (FFF5h) Regularly-spaced frame headers should always be discoverable near EOF. An ID3v1 tag of up to 355 bytes may be present at EOF. The BOF byte sequence represents the MP3 ID3 tag.',
       ByteSequence: 
        [ { ByteSequenceID: '622',
            PositionType: 'Absolute from BOF',
            Offset: '0',
            MaxOffset: '',
            IndirectOffsetLocation: '',
            IndirectOffsetLength: '',
            Endianness: '',
            ByteSequenceValue: '494433' },
          { ByteSequenceID: '623',
            PositionType: 'Absolute from EOF',
            Offset: '0',
            MaxOffset: '',
            IndirectOffsetLocation: '',
            IndirectOffsetLength: '',
            Endianness: '',
            ByteSequenceValue: 'FFF5[10:EB]{45-1726}FFF5[10:EB]{45-1726}FFF5[10:EB]{45-1726}FFF5[10:EB]{45-1726}FFF5[10:EB]{7-500}000000{36-1426}' } ] } ] }