exports.info = { FormatID: '795',
  FormatName: 'Digital Negative Format (DNG)',
  FormatVersion: '1.1',
  FormatAliases: '',
  FormatFamilies: '',
  FormatTypes: 'Image (Raster)',
  FormatDisclosure: '',
  FormatDescription: 'The Digital Negative (DNG) Specification describes a non-proprietary file format for storing camera raw files that can be used by a wide range of hardware and software vendors. DNG is an extension of the TIFF format, and is compatible with the TIFF-EP standard. This version was published in February 2005 and corrected the flaws in the first version. It has proved capable of representing raw images for a large variety of cameras (both when written in-camera or via conversion from other raw image formats) for a few years, and it is the version still typically written in-camera.',
  BinaryFileFormat: 'Text',
  ByteOrders: '',
  ReleaseDate: '',
  WithdrawnDate: '',
  ProvenanceSourceID: '1',
  ProvenanceName: 'Digital Preservation Department / The National Archives',
  ProvenanceSourceDate: '02 Feb 2007',
  ProvenanceDescription: '',
  LastUpdatedDate: '11 Jun 2012',
  FormatNote: '',
  FormatRisk: '',
  TechnicalEnvironment: '',
  FileFormatIdentifier: 
   [ { Identifier: 'fmt/152', IdentifierType: 'PUID' },
     { Identifier: 'image/tiff', IdentifierType: 'MIME' } ],
  ExternalSignature: 
   [ { ExternalSignatureID: '803',
       Signature: 'dng',
       SignatureType: 'File extension' },
     { ExternalSignatureID: '804',
       Signature: 'tif',
       SignatureType: 'File extension' },
     { ExternalSignatureID: '824',
       Signature: 'tiff',
       SignatureType: 'File extension' } ],
  InternalSignature: 
   [ { SignatureID: '660',
       SignatureName: 'DNG 1.1 (little-endian, BOF)',
       SignatureNote: 'TIFF header plus DNGVersion tag near BOF',
       ByteSequence: 
        { ByteSequenceID: '808',
          PositionType: 'Absolute from BOF',
          Offset: '0',
          MaxOffset: '',
          IndirectOffsetLocation: '',
          IndirectOffsetLength: '',
          Endianness: 'Little-endian',
          ByteSequenceValue: '49492A00{0-4080}12C601000400000001010000' } },
     { SignatureID: '661',
       SignatureName: 'DNG 1.1 (little-endian, BOF+EOF)',
       SignatureNote: 'TIFF header plus DNGVersion tag near EOF',
       ByteSequence: 
        [ { ByteSequenceID: '809',
            PositionType: 'Absolute from BOF',
            Offset: '0',
            MaxOffset: '',
            IndirectOffsetLocation: '',
            IndirectOffsetLength: '',
            Endianness: 'Little-endian',
            ByteSequenceValue: '49492A00' },
          { ByteSequenceID: '810',
            PositionType: 'Absolute from EOF',
            Offset: '0',
            MaxOffset: '4084',
            IndirectOffsetLocation: '',
            IndirectOffsetLength: '',
            Endianness: 'Little-endian',
            ByteSequenceValue: '12C601000400000001010000' } ] },
     { SignatureID: '662',
       SignatureName: 'DNG 1.1 (big-endian, BOF)',
       SignatureNote: 'TIFF header plus DNGVersion tag near BOF',
       ByteSequence: 
        { ByteSequenceID: '811',
          PositionType: 'Absolute from BOF',
          Offset: '0',
          MaxOffset: '',
          IndirectOffsetLocation: '',
          IndirectOffsetLength: '',
          Endianness: 'Big-endian',
          ByteSequenceValue: '4D4D002A{0-4080}C61200010000000401010000' } },
     { SignatureID: '663',
       SignatureName: 'DNG 1.1 (big-endian, BOF+EOF)',
       SignatureNote: 'TIFF header plus DNGVersion tag near EOF',
       ByteSequence: 
        [ { ByteSequenceID: '812',
            PositionType: 'Absolute from BOF',
            Offset: '0',
            MaxOffset: '',
            IndirectOffsetLocation: '',
            IndirectOffsetLength: '',
            Endianness: 'Big-endian',
            ByteSequenceValue: '4D4D002A' },
          { ByteSequenceID: '813',
            PositionType: 'Absolute from EOF',
            Offset: '0',
            MaxOffset: '4084',
            IndirectOffsetLocation: '',
            IndirectOffsetLength: '',
            Endianness: 'Big-endian',
            ByteSequenceValue: 'C61200010000000401010000' } ] } ],
  RelatedFormat: 
   [ { RelationshipType: 'Has priority over',
       RelatedFormatID: '385',
       RelatedFormatName: 'Tape Archive Format',
       RelatedFormatVersion: '' },
     { RelationshipType: 'Has priority over',
       RelatedFormatID: '672',
       RelatedFormatName: 'Exchangeable Image File Format (Uncompressed)',
       RelatedFormatVersion: '2.2' },
     { RelationshipType: 'Has priority over',
       RelatedFormatID: '673',
       RelatedFormatName: 'Exchangeable Image File Format (Uncompressed)',
       RelatedFormatVersion: '2.1' },
     { RelationshipType: 'Has priority over',
       RelatedFormatID: '752',
       RelatedFormatName: 'Exchangeable Image File Format (Uncompressed)',
       RelatedFormatVersion: '2.0' },
     { RelationshipType: 'Has priority over',
       RelatedFormatID: '1099',
       RelatedFormatName: 'Tagged Image File Format',
       RelatedFormatVersion: '' },
     { RelationshipType: 'Is previous version of',
       RelatedFormatID: '1224',
       RelatedFormatName: 'Digital Negative Format (DNG)',
       RelatedFormatVersion: '1.2' },
     { RelationshipType: 'Is subsequent version of',
       RelatedFormatID: '1223',
       RelatedFormatName: 'Digital Negative Format (DNG)',
       RelatedFormatVersion: '1.0' },
     { RelationshipType: 'Is subtype of',
       RelatedFormatID: '612',
       RelatedFormatName: 'Tagged Image File Format',
       RelatedFormatVersion: '6' } ] }