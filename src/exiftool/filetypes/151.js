exports.info = { FormatID: '794',
  FormatName: 'JPX (JPEG 2000 part 2)',
  FormatVersion: '',
  FormatAliases: 'JPF',
  FormatFamilies: 'JPEG 2000',
  FormatTypes: 'Image (Raster)',
  FormatDisclosure: '',
  FormatDescription: 'JPEG 2000 Extended File Format is an optional, lossless, extension of the JP2 format, the main file format for the JPEG 2000 international standard for image coding, created by the Joint Photographic Experts Group in 2000 for the compression of photographic images for storage or transmission. The standard specifies how an image and its metadata is transformed into byte stream data. This format is widely used for storing and transmitting photos and other compressed image data online. Although it is based on JP2 it can support multiple layers, animation and other features, and is a lossless image compression file. Like JP2 the format is made up of a contiguous sequence of boxes, beginning with a signature box and a file type box, which provides version and file type information.',
  BinaryFileFormat: 'Text',
  ByteOrders: 'Big-endian (Motorola)',
  ReleaseDate: '',
  WithdrawnDate: '',
  ProvenanceSourceID: '1',
  ProvenanceName: 'Digital Preservation Department / The National Archives',
  ProvenanceSourceDate: '02 Feb 2007',
  ProvenanceDescription: '',
  LastUpdatedDate: '02 Feb 2007',
  FormatNote: '',
  FormatRisk: '',
  TechnicalEnvironment: '',
  FileFormatIdentifier: { Identifier: 'fmt/151', IdentifierType: 'PUID' },
  ExternalSignature: 
   [ { ExternalSignatureID: '801',
       Signature: 'jpx',
       SignatureType: 'File extension' },
     { ExternalSignatureID: '802',
       Signature: 'jpf',
       SignatureType: 'File extension' } ],
  InternalSignature: 
   { SignatureID: '720',
     SignatureName: 'JPEG 2000 with Extensions',
     SignatureNote: 'BOF: ....jP ..‡.{4}ftypjpx',
     ByteSequence: 
      { ByteSequenceID: '906',
        PositionType: 'Absolute from BOF',
        Offset: '0',
        MaxOffset: '',
        IndirectOffsetLocation: '',
        IndirectOffsetLength: '',
        Endianness: '',
        ByteSequenceValue: '0000000C6A5020200D0A870A{4}667479706A7078' } } }