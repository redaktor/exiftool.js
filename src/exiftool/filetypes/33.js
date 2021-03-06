exports.info = { FormatID: '706',
  FormatName: 'AutoCAD Drawing',
  FormatVersion: 'R13',
  FormatAliases: 'DWG (R13)',
  FormatFamilies: 'DWG',
  FormatTypes: 'Image (Vector)',
  FormatDisclosure: 'Partial',
  FormatDescription: 'The AutoCAD Drawing format is a vector graphics format, and is the native file format of AutoDesk\'s AutoCAD family of products. The format is proprietary and AutoDesk does not make details of its structure public. The information contained here is derived primarily from the OpenDWG Alliance\'s reverse-engineered documentation of the format, and should not therefore be regarded as definitive. The basic structure of a DWG file comprises a header section, a drawing class definitions section, the drawing object data, a drawing object map, which contains the locations of all the objects in the drawing, and an image data section, which may contain a raster image of the drawing in either Windows Bitmap (BMP) or Windows Metafile (WMF) format. DWG version 13 is the version of the format associated with Release 13 of AutoCAD.',
  BinaryFileFormat: 'Binary',
  ByteOrders: 'Little-endian (Intel)',
  ReleaseDate: '01 Nov 1994',
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
   [ { Identifier: 'fmt/33', IdentifierType: 'PUID' },
     { Identifier: 'image/vnd.dwg', IdentifierType: 'MIME' } ],
  Document: 
   { DocumentID: '7',
     DisplayText: 'OpenDWG Alliance, 2000, AutoCAD R13/R14/R2000 DWG File Specification: Version 2.0',
     DocumentType: 'Speculative',
     AvailabilityDescription: 'Public',
     AvailabilityNote: '',
     PublicationDate: '01 Jan 2000',
     TitleText: 'AutoCAD R13/R14/R2000 DWG File Specification: Version 2.0',
     DocumentIPR: '',
     DocumentNote: '',
     DocumentIdentifier: 
      { Identifier: 'www.opendesign.com/downloads/spec/formatSpec13-15.rtf',
        IdentifierType: 'URL' },
     Author: 
      { AuthorID: '118',
        AuthorName: '',
        OrganisationName: 'OpenDWG Alliance',
        AuthorCompoundName: 'OpenDWG Alliance' },
     Publisher: 
      { PublisherID: '118',
        PublisherName: '',
        OrganisationName: 'OpenDWG Alliance',
        PublisherCompoundName: 'OpenDWG Alliance' } },
  ExternalSignature: 
   { ExternalSignatureID: '556',
     Signature: 'dwg',
     SignatureType: 'File extension' },
  InternalSignature: 
   { SignatureID: '95',
     SignatureName: 'AutoCAD Drawing Format R13',
     SignatureNote: 'Header',
     ByteSequence: 
      { ByteSequenceID: '13',
        PositionType: 'Absolute from BOF',
        Offset: '0',
        MaxOffset: '',
        IndirectOffsetLocation: '',
        IndirectOffsetLength: '',
        Endianness: '',
        ByteSequenceValue: '414331303132' } },
  RelatedFormat: 
   [ { RelationshipType: 'Has lower priority than',
       RelatedFormatID: '722',
       RelatedFormatName: 'Drawing Interchange File Format (ASCII)',
       RelatedFormatVersion: 'R13' },
     { RelationshipType: 'Is previous version of',
       RelatedFormatID: '707',
       RelatedFormatName: 'AutoCAD Drawing',
       RelatedFormatVersion: 'R14' },
     { RelationshipType: 'Is subsequent version of',
       RelatedFormatID: '705',
       RelatedFormatName: 'AutoCAD Drawing',
       RelatedFormatVersion: 'R11/12' },
     { RelationshipType: 'Is subsequent version of',
       RelatedFormatID: '740',
       RelatedFormatName: 'Drawing Interchange File Format (Binary)',
       RelatedFormatVersion: 'R11/12' } ] }