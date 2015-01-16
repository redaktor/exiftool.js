exports.info = { FormatID: '655',
  FormatName: 'Audio/Video Interleaved Format',
  FormatVersion: '',
  FormatAliases: 'AVI (Generic)',
  FormatFamilies: '',
  FormatTypes: 'Audio, Video',
  FormatDisclosure: 'Full',
  FormatDescription: 'Audio/Video Interleaved Format (AVI) is a chunk-based video format developed by Microsoft, based on the generic Resource Interchange File Format (RIFF) specification developed by Microsoft and IBM. Structurally, an AVI file is composed of a number of chunks, each comprising a four character code chunk identifier, the chunk size, and the chunk data. It comprises a RIFF header with an AVI data type identifier, followed by a series of chunks. Every file must include two List chunks. The first List chunk is the main AVI header chunk, which contain one or more Stream Header chunks, one for each data stream, describing the format of the data streams. The second LIST chunk is the ‘movi’ chunk, which contains the actual data for the audio and video data streams. Other optional chunks are also allowed. The format supports a wide variety of compressed and uncompressed video encodings, but all audio streams are stored in Microsoft’s Waveform Audio format.',
  BinaryFileFormat: 'Binary',
  ByteOrders: 'Little-endian (Intel)',
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
   [ { Identifier: 'fmt/5', IdentifierType: 'PUID' },
     { Identifier: 'public.avi',
       IdentifierType: 'Apple Uniform Type Identifier' },
     { Identifier: 'video/x-msvideo', IdentifierType: 'MIME' } ],
  Document: 
   { DocumentID: '6',
     DisplayText: 'Microsoft Corporation, 2004, Microsoft DirectX 9.0 SDK Update: AVI File Format',
     DocumentType: 'Authoritative',
     AvailabilityDescription: 'Public',
     AvailabilityNote: '',
     PublicationDate: '01 Oct 2004',
     TitleText: 'Microsoft DirectX 9.0 SDK Update: AVI File Format',
     DocumentIPR: '',
     DocumentNote: '',
     DocumentIdentifier: 
      { Identifier: 'msdn.microsoft.com/library/default.asp?url=/library/en-us/directshow/htm/avifileformat.asp',
        IdentifierType: 'URL' },
     Author: 
      { AuthorID: '93',
        AuthorName: '',
        OrganisationName: 'Microsoft Corporation',
        AuthorCompoundName: 'Microsoft Corporation' },
     Publisher: 
      { PublisherID: '93',
        PublisherName: '',
        OrganisationName: 'Microsoft Corporation',
        PublisherCompoundName: 'Microsoft Corporation' } },
  ExternalSignature: 
   { ExternalSignatureID: '698',
     Signature: 'avi',
     SignatureType: 'File extension' },
  InternalSignature: 
   { SignatureID: '51',
     SignatureName: 'AVI',
     SignatureNote: 'RIFF header, AVI ID, LIST hdrl chunk with avih sub-chunk + LIST movi chunk',
     ByteSequence: 
      { ByteSequenceID: '155',
        PositionType: 'Absolute from BOF',
        Offset: '0',
        MaxOffset: '',
        IndirectOffsetLocation: '',
        IndirectOffsetLength: '',
        Endianness: '',
        ByteSequenceValue: '52494646{4}41564920*4C495354{4}6864726C61766968*4C495354{4}6D6F7669' } } }