exports.info = { FormatID: '1099',
  FormatName: 'Tagged Image File Format',
  FormatVersion: '',
  FormatAliases: 'TIFF',
  FormatFamilies: '',
  FormatTypes: 'Image (Raster)',
  FormatDisclosure: 'Full',
  FormatDescription: 'The Tagged Image File Format (TIFF) is a raster image format originally developed by the Aldus Corporation, primarily for use in scanning and desktop publishing. When Adobe Systems Incorporated purchased Aldus in 1994, they acquired the rights to the TIFF format and have maintained it since then. TIFF files comprise three sections: an Image File Header (IFH), an Image File Directory (IFD), and the image data. TIFF files can contain multiple images (multi-page TIFF), and each image has a separate IFD. The IFH always appears at the beginning of the file, and is immediately followed by a pointer to the first IFD. The IFD contains metadata which describes the associated image, stored as a series of tags. The IFD also contains a pointer to the actual image data. TIFF supports colour depths from 1 bit to 24 bit (e.g. monochrome to true colour), and a wide range of compression types (RLE, LZW, CCITT Group 3 and Group 4, and JPEG), as well as uncompressed data.',
  BinaryFileFormat: '',
  ByteOrders: 'Little-endian (Intel) and Big-endian (Motorola)',
  ReleaseDate: '01 Aug 1986',
  WithdrawnDate: '',
  ProvenanceSourceID: '1',
  ProvenanceName: 'Digital Preservation Department / The National Archives',
  ProvenanceSourceDate: '07 Jul 2011',
  ProvenanceDescription: 'PUID created for the TIFF format in response to the difficulties we have been having with multiple identification of the format and a consensus on a new interpretation of the standard from within The National Archives and outside with external stakeholders.',
  LastUpdatedDate: '07 Jul 2011',
  FormatNote: '',
  FormatRisk: '',
  TechnicalEnvironment: '',
  FileFormatIdentifier: 
   [ { Identifier: 'fmt/353', IdentifierType: 'PUID' },
     { Identifier: 'image/tiff', IdentifierType: 'MIME' },
     { Identifier: 'public.tiff',
       IdentifierType: 'Apple Uniform Type Identifier' } ],
  Developers: 
   { DeveloperID: '82',
     DeveloperName: '',
     OrganisationName: 'Aldus Corporation',
     DeveloperCompoundName: 'Aldus Corporation' },
  Document: 
   [ { DocumentID: '52',
       DisplayText: 'Adobe Systems Incorporated, 1992, TIFF Revision 6.0',
       DocumentType: 'Authoritative',
       AvailabilityDescription: 'Public',
       AvailabilityNote: '',
       PublicationDate: '03 Jun 1992',
       TitleText: 'TIFF Revision 6.0',
       DocumentIPR: '',
       DocumentNote: '',
       DocumentIdentifier: 
        { Identifier: 'partners.adobe.com/public/developer/en/tiff/TIFF6.pdf',
          IdentifierType: 'URL' },
       Author: 
        { AuthorID: '7',
          AuthorName: '',
          OrganisationName: 'Adobe Systems Incorporated',
          AuthorCompoundName: 'Adobe Systems Incorporated' },
       Publisher: 
        { PublisherID: '7',
          PublisherName: '',
          OrganisationName: 'Adobe Systems Incorporated',
          PublisherCompoundName: 'Adobe Systems Incorporated' } },
     { DocumentID: '53',
       DisplayText: 'Adobe Systems Incorporated, 1995, TIFF Technical Note #2 (draft)',
       DocumentType: 'Authoritative',
       AvailabilityDescription: 'Public',
       AvailabilityNote: '',
       PublicationDate: '01 Jan 1995',
       TitleText: 'TIFF Technical Note #2 (draft)',
       DocumentIPR: '',
       DocumentNote: 'The implementation of JPEG compression described in Revision 6.0 is flawed: a revised design was issued as TIFF Technical Note #2, which should be followed instead.',
       DocumentIdentifier: 
        { Identifier: 'www.remotesensing.org/libtiff/TIFFTechNote2.html',
          IdentifierType: 'URL' },
       Author: 
        { AuthorID: '7',
          AuthorName: '',
          OrganisationName: 'Adobe Systems Incorporated',
          AuthorCompoundName: 'Adobe Systems Incorporated' },
       Publisher: 
        { PublisherID: '7',
          PublisherName: '',
          OrganisationName: 'Adobe Systems Incorporated',
          PublisherCompoundName: 'Adobe Systems Incorporated' } },
     { DocumentID: '54',
       DisplayText: 'Adobe Systems Incorporated, 1995, Adobe PageMaker 6.0: TIFF Technical Notes',
       DocumentType: 'Informative',
       AvailabilityDescription: 'Public',
       AvailabilityNote: '',
       PublicationDate: '01 Jan 1995',
       TitleText: 'Adobe PageMaker 6.0: TIFF Technical Notes',
       DocumentIPR: '',
       DocumentNote: '',
       DocumentIdentifier: 
        { Identifier: 'partners.adobe.com/public/developer/en/tiff/TIFFPM6.pdf',
          IdentifierType: 'URL' },
       Author: 
        { AuthorID: '7',
          AuthorName: '',
          OrganisationName: 'Adobe Systems Incorporated',
          AuthorCompoundName: 'Adobe Systems Incorporated' },
       Publisher: 
        { PublisherID: '7',
          PublisherName: '',
          OrganisationName: 'Adobe Systems Incorporated',
          PublisherCompoundName: 'Adobe Systems Incorporated' } },
     { DocumentID: '55',
       DisplayText: 'Adobe Systems Incorporated, 2002, Adobe Photoshop: TIFF Technical Notes',
       DocumentType: 'Informative',
       AvailabilityDescription: 'Public',
       AvailabilityNote: '',
       PublicationDate: '01 Jan 2002',
       TitleText: 'Adobe Photoshop: TIFF Technical Notes',
       DocumentIPR: '',
       DocumentNote: '',
       DocumentIdentifier: 
        { Identifier: 'partners.adobe.com/public/developer/en/tiff/TIFFphotoshop.pdf',
          IdentifierType: 'URL' },
       Author: 
        { AuthorID: '7',
          AuthorName: '',
          OrganisationName: 'Adobe Systems Incorporated',
          AuthorCompoundName: 'Adobe Systems Incorporated' },
       Publisher: 
        { PublisherID: '7',
          PublisherName: '',
          OrganisationName: 'Adobe Systems Incorporated',
          PublisherCompoundName: 'Adobe Systems Incorporated' } } ],
  ExternalSignature: 
   [ { ExternalSignatureID: '1120',
       Signature: 'tif',
       SignatureType: 'File extension' },
     { ExternalSignatureID: '1121',
       Signature: 'tiff',
       SignatureType: 'File extension' } ],
  InternalSignature: 
   [ { SignatureID: '9',
       SignatureName: 'TIFF generic (little-endian)',
       SignatureNote: 'Header',
       ByteSequence: 
        { ByteSequenceID: '183',
          PositionType: 'Absolute from BOF',
          Offset: '0',
          MaxOffset: '',
          IndirectOffsetLocation: '',
          IndirectOffsetLength: '',
          Endianness: '',
          ByteSequenceValue: '49492A00' } },
     { SignatureID: '10',
       SignatureName: 'TIFF generic (big-endian)',
       SignatureNote: 'Header',
       ByteSequence: 
        { ByteSequenceID: '184',
          PositionType: 'Absolute from BOF',
          Offset: '0',
          MaxOffset: '',
          IndirectOffsetLocation: '',
          IndirectOffsetLength: '',
          Endianness: '',
          ByteSequenceValue: '4D4D002A' } } ],
  RelatedFormat: 
   [ { RelationshipType: 'Has lower priority than',
       RelatedFormatID: '672',
       RelatedFormatName: 'Exchangeable Image File Format (Uncompressed)',
       RelatedFormatVersion: '2.2' },
     { RelationshipType: 'Has lower priority than',
       RelatedFormatID: '673',
       RelatedFormatName: 'Exchangeable Image File Format (Uncompressed)',
       RelatedFormatVersion: '2.1' },
     { RelationshipType: 'Has lower priority than',
       RelatedFormatID: '752',
       RelatedFormatName: 'Exchangeable Image File Format (Uncompressed)',
       RelatedFormatVersion: '2.0' },
     { RelationshipType: 'Has lower priority than',
       RelatedFormatID: '795',
       RelatedFormatName: 'Digital Negative Format (DNG)',
       RelatedFormatVersion: '1.1' },
     { RelationshipType: 'Has lower priority than',
       RelatedFormatID: '797',
       RelatedFormatName: 'Tagged Image File Format for Electronic Photography (TIFF/EP)',
       RelatedFormatVersion: '' },
     { RelationshipType: 'Has lower priority than',
       RelatedFormatID: '798',
       RelatedFormatName: 'Geographic Tagged Image File Format (GeoTIFF)',
       RelatedFormatVersion: '' },
     { RelationshipType: 'Has lower priority than',
       RelatedFormatID: '799',
       RelatedFormatName: 'Tagged Image File Format for Internet Fax (TIFF-FX)',
       RelatedFormatVersion: '' },
     { RelationshipType: 'Has lower priority than',
       RelatedFormatID: '1223',
       RelatedFormatName: 'Digital Negative Format (DNG)',
       RelatedFormatVersion: '1.0' },
     { RelationshipType: 'Has lower priority than',
       RelatedFormatID: '1224',
       RelatedFormatName: 'Digital Negative Format (DNG)',
       RelatedFormatVersion: '1.2' },
     { RelationshipType: 'Has lower priority than',
       RelatedFormatID: '1225',
       RelatedFormatName: 'Digital Negative Format (DNG)',
       RelatedFormatVersion: '1.3' },
     { RelationshipType: 'Has lower priority than',
       RelatedFormatID: '1384',
       RelatedFormatName: 'Canon RAW',
       RelatedFormatVersion: '2.0' },
     { RelationshipType: 'Is supertype of',
       RelatedFormatID: '798',
       RelatedFormatName: 'Geographic Tagged Image File Format (GeoTIFF)',
       RelatedFormatVersion: '' },
     { RelationshipType: 'Is supertype of',
       RelatedFormatID: '1223',
       RelatedFormatName: 'Digital Negative Format (DNG)',
       RelatedFormatVersion: '1.0' },
     { RelationshipType: 'Is supertype of',
       RelatedFormatID: '1224',
       RelatedFormatName: 'Digital Negative Format (DNG)',
       RelatedFormatVersion: '1.2' },
     { RelationshipType: 'Is supertype of',
       RelatedFormatID: '1225',
       RelatedFormatName: 'Digital Negative Format (DNG)',
       RelatedFormatVersion: '1.3' } ],
  CompressionType: 
   [ { CompressionID: '11',
       CompressionName: 'Baseline JPEG',
       CompressionVersion: '',
       CompressionAliases: 'Discrete Cosine Transform, DCT, JPEG',
       CompressionFamilies: '',
       Description: 'The JPEG compression algorithm was developed in 1990 by the Joint Photographic Experts Group of ISO and CCITT, for the transmission of colour and greyscale images. It is a lossy technique which provides best compression rates with complex 24-bit (True Colour) images. It achieves its effect by discarding image data which is imperceptible to the human eye, using a technique called Discrete Cosine Transform (DCT). It then applies Huffman encoding to achieve further compression. The JPEG specification allows users to set the degree of compression, using an abstract Quality Setting. This provides a trade-off between compression rate and image quality. It is important to note that the Quality Setting is not an absolute value, with different JPEG encoders use different scales, and that even the maximum quality setting for baseline JPEG involves some loss. JPEG compression is most commonly used in the JPEG File Interchange Format (JFIF), SPIFF and TIFF.',
       Lossiness: 'Lossy',
       ReleaseDate: '01 Jan 1994',
       WithdrawnDate: '',
       CompressionDocumentation: 'ISO/IEC 10918-1: 1994, Information technology - Digital compression and coding of continuous-tone still images: Requirements and guidelines',
       CompressionIPR: '',
       CompressionNote: '',
       CompressionIdentifier: { Identifier: 'x-cmp/11', IdentifierType: 'PUID' },
       Developer: 
        { DeveloperID: '112',
          DeveloperName: '',
          OrganisationName: 'International Standards Organisation',
          DeveloperCompoundName: 'International Standards Organisation' } },
     { CompressionID: '12',
       CompressionName: 'Lempel-Ziv-Welch',
       CompressionVersion: '',
       CompressionAliases: 'LZW',
       CompressionFamilies: '',
       Description: 'The Lempel-Ziv-Welch compression algorithm was developed by Terry Welch in 1984, as a modification of the LZ78 compressor. It is a lossless technique which can be applied to almost any type of data, but is most commonly used for image compression. LZW compression is effective on images with colour depths from 1-bit (monochrome) to 24-bit (True Colour). LZW compression is encountered in a range of common graphics file formats, including TIFF and GIF.',
       Lossiness: 'Lossless',
       ReleaseDate: '01 Jan 1984',
       WithdrawnDate: '',
       CompressionDocumentation: 'Welch, T A, 1984, A technique for high performance data compression, IEEE Computer, 17: 6',
       CompressionIPR: '',
       CompressionNote: '',
       CompressionIdentifier: { Identifier: 'x-cmp/12', IdentifierType: 'PUID' },
       Developer: 
        { DeveloperID: '121',
          DeveloperName: 'T A Welch',
          OrganisationName: '',
          DeveloperCompoundName: 'T A Welch / [No organisation specified]' } },
     { CompressionID: '13',
       CompressionName: 'Run Length Encoding',
       CompressionVersion: '',
       CompressionAliases: 'RLE',
       CompressionFamilies: '',
       Description: 'Run length encoding (RLE) is perhaps the simplest image compression technique in common use. RLE algorithms are lossless, and work by searching for runs of bits, bytes, or pixels of the same value, and encoding the length and value of the run. As such, RLE achieves best results with images containing large areas of contiguous colour, and especially monochrome images. Complex colour images, such as photographs, do not compress well – in some cases, RLE can actually increase the file size. There are a number of RLE variants in common use, which are encountered in the TIFF, PCX and BMP graphics formats.',
       Lossiness: 'Lossless',
       ReleaseDate: '',
       WithdrawnDate: '',
       CompressionDocumentation: '',
       CompressionIPR: '',
       CompressionNote: '',
       CompressionIdentifier: { Identifier: 'x-cmp/13', IdentifierType: 'PUID' } },
     { CompressionID: '14',
       CompressionName: 'CCITT T.4',
       CompressionVersion: '',
       CompressionAliases: 'CCITT Group 3',
       CompressionFamilies: '',
       Description: 'Officially known as CCITT T.4, Group 3 is a compression algorithm developed by the International Telegraph and Telephone Consultative Committee in 1985 for encoding and compressing 1-bit (monochrome) image data. Its primary use has been in fax transmission, and it is optimised for scanned printed or handwritten documents. Group 3 is a lossless algorithm, of which two forms exist: one-dimensional (which is a modified version of Huffman encoding) and two-dimensional, which offers superior compression rates. Due to its origin as a data transmission protocol, Group 3 encoding incorporates error detection codes. Group 3 compression is most commonly used in the TIFF file format.',
       Lossiness: 'Lossless',
       ReleaseDate: '01 Jan 1985',
       WithdrawnDate: '',
       CompressionDocumentation: 'CCITT Blue Book, 1989, Volume VII, Fascicle VII.3: Terminal equipment and protocols for telematic services, recommendations T.0 - T.63',
       CompressionIPR: '',
       CompressionNote: '',
       CompressionIdentifier: { Identifier: 'x-cmp/14', IdentifierType: 'PUID' },
       Developer: 
        { DeveloperID: '124',
          DeveloperName: '',
          OrganisationName: 'International Telecommunication Union',
          DeveloperCompoundName: 'International Telecommunication Union' } },
     { CompressionID: '15',
       CompressionName: 'CCITT T.6',
       CompressionVersion: '',
       CompressionAliases: 'CCITT Group 4',
       CompressionFamilies: '',
       Description: 'Officially known as CCITT T.6, Group 4 is a compression algorithm developed by the International Telegraph and Telephone Consultative Committee as a development of the two-dimensional Group 3 standard for encoding and compressing 1-bit (monochrome) image data. It is faster, and offers compression rates which are typically double those of Group 3. Like Group 3, it is lossless and designed for 1-bit images. However, being designed as a storage rather than transmission format, it does not incorporate the error detection and correction functions of Group 3 compression. Group 4 compression is most commonly used in the TIFF file format.',
       Lossiness: 'Lossless',
       ReleaseDate: '01 Jan 1989',
       WithdrawnDate: '',
       CompressionDocumentation: 'CCITT Blue Book, 1989, Volume VII, Fascicle VII.3: Terminal equipment and protocols for telematic services, recommendations T.0 - T.63',
       CompressionIPR: '',
       CompressionNote: '',
       CompressionIdentifier: { Identifier: 'x-cmp/15', IdentifierType: 'PUID' },
       Developer: 
        { DeveloperID: '124',
          DeveloperName: '',
          OrganisationName: 'International Telecommunication Union',
          DeveloperCompoundName: 'International Telecommunication Union' } } ],
  FormatProperties: 
   { FormatProperty: 
      [ { PropertyName: 'Bits Per Sample',
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
        { PropertyName: 'Colour Space',
          PropertyDescription: '',
          PropertyType: 'Instance',
          PropertyRiskScore: '',
          PropertyHighRisk: '',
          PropertyValueDescription: '',
          PropertyRisks: '' },
        { PropertyName: 'Compression Type',
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
          PropertyRisks: '' } ] } }