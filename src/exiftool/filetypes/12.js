exports.info = { FormatID: '665',
  FormatName: 'Portable Network Graphics',
  FormatVersion: '1.1',
  FormatAliases: 'PNG (1.1)',
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
   [ { Identifier: 'fmt/12', IdentifierType: 'PUID' },
     { Identifier: 'image/png', IdentifierType: 'MIME' },
     { Identifier: 'public.png',
       IdentifierType: 'Apple Uniform Type Identifier' } ],
  ExternalSignature: 
   { ExternalSignatureID: '589',
     Signature: 'png',
     SignatureType: 'File extension' },
  InternalSignature: 
   [ { SignatureID: '183',
       SignatureName: 'PNG 1.1iCCP',
       SignatureNote: 'Signature + IHDR and iCCP chunks at BOF, IEND chunk at EOF',
       ByteSequence: 
        [ { ByteSequenceID: '228',
            PositionType: 'Absolute from BOF',
            Offset: '0',
            MaxOffset: '',
            IndirectOffsetLocation: '',
            IndirectOffsetLength: '',
            Endianness: '',
            ByteSequenceValue: '89504E470D0A1A0A0000000D49484452*69434350' },
          { ByteSequenceID: '231',
            PositionType: 'Absolute from EOF',
            Offset: '0',
            MaxOffset: '',
            IndirectOffsetLocation: '',
            IndirectOffsetLength: '',
            Endianness: '',
            ByteSequenceValue: '0000000049454E44AE426082' } ] },
     { SignatureID: '184',
       SignatureName: 'PNG 1.1sPLT',
       SignatureNote: 'Signature + IHDR and sPLT chunks at BOF, IEND chunk at EOF',
       ByteSequence: 
        [ { ByteSequenceID: '229',
            PositionType: 'Absolute from BOF',
            Offset: '0',
            MaxOffset: '',
            IndirectOffsetLocation: '',
            IndirectOffsetLength: '',
            Endianness: '',
            ByteSequenceValue: '89504E470D0A1A0A0000000D49484452*73504C54' },
          { ByteSequenceID: '232',
            PositionType: 'Absolute from EOF',
            Offset: '0',
            MaxOffset: '',
            IndirectOffsetLocation: '',
            IndirectOffsetLength: '',
            Endianness: '',
            ByteSequenceValue: '0000000049454E44AE426082' } ] },
     { SignatureID: '185',
       SignatureName: 'PNG 1.1sRGB',
       SignatureNote: 'Signature + IHDR and sRGB chunks at BOF, IEND chunk at EOF',
       ByteSequence: 
        [ { ByteSequenceID: '230',
            PositionType: 'Absolute from BOF',
            Offset: '0',
            MaxOffset: '',
            IndirectOffsetLocation: '',
            IndirectOffsetLength: '',
            Endianness: '',
            ByteSequenceValue: '89504E470D0A1A0A0000000D49484452*73524742' },
          { ByteSequenceID: '233',
            PositionType: 'Absolute from EOF',
            Offset: '0',
            MaxOffset: '',
            IndirectOffsetLocation: '',
            IndirectOffsetLength: '',
            Endianness: '',
            ByteSequenceValue: '0000000049454E44AE426082' } ] } ],
  RelatedFormat: 
   [ { RelationshipType: 'Has lower priority than',
       RelatedFormatID: '666',
       RelatedFormatName: 'Portable Network Graphics',
       RelatedFormatVersion: '1.2' },
     { RelationshipType: 'Has priority over',
       RelatedFormatID: '664',
       RelatedFormatName: 'Portable Network Graphics',
       RelatedFormatVersion: '1.0' },
     { RelationshipType: 'Is previous version of',
       RelatedFormatID: '666',
       RelatedFormatName: 'Portable Network Graphics',
       RelatedFormatVersion: '1.2' },
     { RelationshipType: 'Is subsequent version of',
       RelatedFormatID: '664',
       RelatedFormatName: 'Portable Network Graphics',
       RelatedFormatVersion: '1.0' } ],
  FormatProperties: 
   { FormatProperty: 
      [ { PropertyName: 'Image Width',
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
        { PropertyName: 'Number Of Channels',
          PropertyDescription: '',
          PropertyType: 'Instance',
          PropertyRiskScore: '',
          PropertyHighRisk: '',
          PropertyValueDescription: '',
          PropertyRisks: '' } ] } }