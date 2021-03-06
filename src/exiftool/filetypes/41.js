exports.info = { FormatID: '670',
  FormatName: 'Raw JPEG Stream',
  FormatVersion: '',
  FormatAliases: 'JPEG',
  FormatFamilies: '',
  FormatTypes: 'Image (Raster)',
  FormatDisclosure: '',
  FormatDescription: 'This is an outline record only, and requires further details, research or authentication to provide information that will enable users to further understand the format and to assess digital preservation risks associated with it if appropriate. If you are able to help by supplying any additional information concerning this entry, please return to the main PRONOM page and select ‘Add an Entry’.',
  BinaryFileFormat: 'Binary',
  ByteOrders: 'Big-endian (Motorola)',
  ReleaseDate: '',
  WithdrawnDate: '',
  ProvenanceSourceID: '1',
  ProvenanceName: 'Digital Preservation Department / The National Archives',
  ProvenanceSourceDate: '11 Mar 2005',
  ProvenanceDescription: '',
  LastUpdatedDate: '02 Aug 2005',
  FormatNote: '',
  FormatRisk: '',
  TechnicalEnvironment: '',
  FileFormatIdentifier: 
   [ { Identifier: 'fmt/41', IdentifierType: 'PUID' },
     { Identifier: 'image/jpeg', IdentifierType: 'MIME' } ],
  ExternalSignature: 
   [ { ExternalSignatureID: '554',
       Signature: 'jpe',
       SignatureType: 'File extension' },
     { ExternalSignatureID: '578',
       Signature: 'jpg',
       SignatureType: 'File extension' },
     { ExternalSignatureID: '652',
       Signature: 'jpeg',
       SignatureType: 'File extension' } ],
  InternalSignature: 
   [ { SignatureID: '69',
       SignatureName: 'Raw JPEG',
       SignatureNote: 'SOI marker at BOF, EOI marker at EOF',
       ByteSequence: 
        [ { ByteSequenceID: '174',
            PositionType: 'Absolute from BOF',
            Offset: '0',
            MaxOffset: '',
            IndirectOffsetLocation: '',
            IndirectOffsetLength: '',
            Endianness: '',
            ByteSequenceValue: 'FFD8FF' },
          { ByteSequenceID: '175',
            PositionType: 'Absolute from EOF',
            Offset: '0',
            MaxOffset: '16000',
            IndirectOffsetLocation: '',
            IndirectOffsetLength: '',
            Endianness: '',
            ByteSequenceValue: 'FFD9' } ] },
     { SignatureID: '697',
       SignatureName: 'Photoshop JPEG',
       SignatureNote: 'BOF: SOI marker (FF|D8), APP14 - Photoshop Segment Marker (FF|ED), segment size {2}, Photoshop identification string, in ASCII: Photoshop 3.0. EOF: EOI marker (FF|D9) with a large offset due to the amount of photoshop metadata seen after the end of image marker in sample files.',
       ByteSequence: 
        [ { ByteSequenceID: '868',
            PositionType: 'Absolute from BOF',
            Offset: '0',
            MaxOffset: '',
            IndirectOffsetLocation: '',
            IndirectOffsetLength: '',
            Endianness: '',
            ByteSequenceValue: 'FFD8FFED{2}50686F746F73686F7020332E30003842494D' },
          { ByteSequenceID: '869',
            PositionType: 'Absolute from EOF',
            Offset: '',
            MaxOffset: '16000',
            IndirectOffsetLocation: '',
            IndirectOffsetLength: '',
            Endianness: '',
            ByteSequenceValue: 'FFD9' } ] } ],
  RelatedFormat: 
   [ { RelationshipType: 'Has lower priority than',
       RelatedFormatID: '667',
       RelatedFormatName: 'JPEG File Interchange Format',
       RelatedFormatVersion: '1.00' },
     { RelationshipType: 'Has lower priority than',
       RelatedFormatID: '668',
       RelatedFormatName: 'JPEG File Interchange Format',
       RelatedFormatVersion: '1.01' },
     { RelationshipType: 'Has lower priority than',
       RelatedFormatID: '669',
       RelatedFormatName: 'JPEG File Interchange Format',
       RelatedFormatVersion: '1.02' },
     { RelationshipType: 'Has lower priority than',
       RelatedFormatID: '671',
       RelatedFormatName: 'Still Picture Interchange File Format',
       RelatedFormatVersion: '1.0' },
     { RelationshipType: 'Has lower priority than',
       RelatedFormatID: '675',
       RelatedFormatName: 'Exchangeable Image File Format (Compressed)',
       RelatedFormatVersion: '2.1' },
     { RelationshipType: 'Has lower priority than',
       RelatedFormatID: '676',
       RelatedFormatName: 'Exchangeable Image File Format (Compressed)',
       RelatedFormatVersion: '2.2' },
     { RelationshipType: 'Has lower priority than',
       RelatedFormatID: '751',
       RelatedFormatName: 'Exchangeable Image File Format (Compressed)',
       RelatedFormatVersion: '2.0' } ],
  FormatProperties: 
   { FormatProperty: 
      [ { PropertyName: 'Compression Type',
          PropertyDescription: '',
          PropertyType: 'Instance',
          PropertyRiskScore: '',
          PropertyHighRisk: '',
          PropertyValueDescription: '',
          PropertyRisks: '' },
        { PropertyName: 'Compression Level',
          PropertyDescription: '',
          PropertyType: 'Instance',
          PropertyRiskScore: '',
          PropertyHighRisk: '',
          PropertyValueDescription: '',
          PropertyRisks: '' },
        { PropertyName: 'Image Width',
          PropertyDescription: '',
          PropertyType: 'Instance',
          PropertyRiskScore: '',
          PropertyHighRisk: '',
          PropertyValueDescription: '',
          PropertyRisks: '' },
        { PropertyName: 'Image Height',
          PropertyDescription: '',
          PropertyType: 'Instance',
          PropertyRiskScore: '',
          PropertyHighRisk: '',
          PropertyValueDescription: '',
          PropertyRisks: '' },
        { PropertyName: 'Colour Space',
          PropertyDescription: '',
          PropertyType: 'Instance',
          PropertyRiskScore: '',
          PropertyHighRisk: '',
          PropertyValueDescription: '',
          PropertyRisks: '' },
        { PropertyName: 'Sampling Frequency Unit',
          PropertyDescription: '',
          PropertyType: 'Instance',
          PropertyRiskScore: '',
          PropertyHighRisk: '',
          PropertyValueDescription: '',
          PropertyRisks: '' },
        { PropertyName: 'X Sampling Frequency',
          PropertyDescription: '',
          PropertyType: 'Instance',
          PropertyRiskScore: '',
          PropertyHighRisk: '',
          PropertyValueDescription: '',
          PropertyRisks: '' },
        { PropertyName: 'Y Sampling Frequency',
          PropertyDescription: '',
          PropertyType: 'Instance',
          PropertyRiskScore: '',
          PropertyHighRisk: '',
          PropertyValueDescription: '',
          PropertyRisks: '' },
        { PropertyName: 'Bits Per Sample',
          PropertyDescription: '',
          PropertyType: 'Instance',
          PropertyRiskScore: '',
          PropertyHighRisk: '',
          PropertyValueDescription: '',
          PropertyRisks: '' },
        { PropertyName: 'Samples Per Pixel',
          PropertyDescription: '',
          PropertyType: 'Instance',
          PropertyRiskScore: '',
          PropertyHighRisk: '',
          PropertyValueDescription: '',
          PropertyRisks: '' },
        { PropertyName: 'Byte Order',
          PropertyDescription: '',
          PropertyType: 'Instance',
          PropertyRiskScore: '',
          PropertyHighRisk: '',
          PropertyValueDescription: '',
          PropertyRisks: '' },
        { PropertyName: 'Comments',
          PropertyDescription: '',
          PropertyType: 'Instance',
          PropertyRiskScore: '',
          PropertyHighRisk: '',
          PropertyValueDescription: '',
          PropertyRisks: '' } ] } }