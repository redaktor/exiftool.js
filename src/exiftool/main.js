// https://github.com/mattburns/exiftool.js
// exiftool.js/main

// summary:
//    A pure javascript implementation of Phil Harvey's excellent exiftool. 
//    This extends work started by Jacob Seidelin.
//    [ WIP ] - It aims to support parsing of all the tags that exiftool is capable of ...

// description:
//    see readme.md and contributing.md (TBA) - 
//    original project reference : http://www.sno.phy.queensu.ca/~phil/exiftool/

// returns:
//    an object with explained informations for 
//    - EXIF, 
//    - GPS (if device is compatible), 
//    - TIFF/IMAGE/THUMB
//    - MAKERNOTE (if device is supported),
//    - [ TBA ] IPTC and XMP support

// authors/contributors:
//    Matt Burns, Stolen Camera Finder
//    Sebastian Lasse, redaktor


// original credits:
//    *1) included here [javascript] , *2) tags and functions ported from [perl]
//    ---------------------------------------------------------------------------------------

//    1)
//    /*
//     * Javascript EXIF Reader - exiftool.js
//     * Copyright (c) 2008 Jacob Seidelin, cupboy@gmail.com, http://blog.nihilogic.dk/
//     * Licensed under the MPL License [http://www.nihilogic.dk/licenses/mpl-license.txt]
//     * 
//     */
 
//    2)
//    #--------------------------------------------------------------------------------------
//    # ExifTool.pm
//    #
//    # Description:  Read and write meta information
//    #
//    # URL:          http://owl.phy.queensu.ca/~phil/exiftool/
//    #
//    # Revisions:    Nov. 12/2003 - P. Harvey Created
//    #               (See html/history.html for revision history)
//    #
//    # Legal:        Copyright (c) 2003-2014, Phil Harvey (phil at owl.phy.queensu.ca)
//    #               This library is free software; you can redistribute it and/or
//    #               modify it under the same terms as Perl itself.
//    #--------------------------------------------------------------------------------------


// FIXME :
//    - custom 'APP..' makernotes
//    - flags for writing (from perl)...
//    - composite Tags in supported makernotes (from perl)

// TODO :	
//    + support binary and custom methods for reading makernotes (and apple plist)
//    + support movie tags in makernotes
//    + write more makernote files

// NOTE :
//    ...
//    see TODOs and FIXMEs in makernote files


(function() {
	
	var EXIF = require('./exif.js');
	var MAKE = require('./makernotes.js');
	
	/* TODO - check node mode (dev vs production) */
	// MANUAL DEBUG - set to false in production
	EXIF.debug = false;
	
    var BinaryFile = function(strData, iDataOffset, iDataLength) {
        var data = strData;
        var dataOffset = iDataOffset || 0;
        var dataLength = 0;

        this.getRawData = function() {
            return data;
        }
        if (typeof strData == 'string') {
            dataLength = iDataLength || data.length;
            this.getByteAt = function(iOffset) {
                return data.charCodeAt(iOffset + dataOffset) & 0xFF;
            }
        } else if (typeof strData == 'unknown') {
            dataLength = iDataLength || IEBinary_getLength(data);
            this.getByteAt = function(iOffset) {
                return IEBinary_getByteAt(data, iOffset + dataOffset);
            }
        }
        this.getLength = function() {
            return dataLength;
        }
        this.getSByteAt = function(iOffset) {
            var iByte = this.getByteAt(iOffset);
            if (iByte > 127)
                return iByte - 256;
            else
                return iByte;
        }
        this.getShortAt = function(iOffset, bBigEndian) {
            var iShort = bBigEndian ? (this.getByteAt(iOffset) << 8)
                    + this.getByteAt(iOffset + 1) : (this
                    .getByteAt(iOffset + 1) << 8)
                    + this.getByteAt(iOffset)
            if (iShort < 0)
                iShort += 65536;
            return iShort;
        }
        this.getSShortAt = function(iOffset, bBigEndian) {
            var iUShort = this.getShortAt(iOffset, bBigEndian);
            if (iUShort > 32767)
                return iUShort - 65536;
            else
                return iUShort;
        }
        this.getLongAt = function(iOffset, bBigEndian) {
            var iByte1 = this.getByteAt(iOffset), iByte2 = this
                    .getByteAt(iOffset + 1), iByte3 = this
                    .getByteAt(iOffset + 2), iByte4 = this
                    .getByteAt(iOffset + 3);

            var iLong = bBigEndian ? (((((iByte1 << 8) + iByte2) << 8) + iByte3) << 8)
                    + iByte4
                    : (((((iByte4 << 8) + iByte3) << 8) + iByte2) << 8)
                            + iByte1;
            if (iLong < 0)
                iLong += 4294967296;
            return iLong;
        }
        this.getSLongAt = function(iOffset, bBigEndian) {
            var iULong = this.getLongAt(iOffset, bBigEndian);
            if (iULong > 2147483647)
                return iULong - 4294967296;
            else
                return iULong;
        }
        this.getStringAt = function(iOffset, iLength) {
            var aStr = [];
            for (var i = iOffset, j = 0; i < iOffset + iLength; i++, j++) {
                aStr[j] = String.fromCharCode(this.getByteAt(i));
            }
            return aStr.join('');
        }
        this.getCharAt = function(iOffset) {
            return String.fromCharCode(this.getByteAt(iOffset));
        }
        this.toBase64 = function() {
            return btoa(data);
        }
        this.fromBase64 = function(strBase64) {
            data = atob(strBase64);
        }
    }

    var BinaryAjax = (function() {

        function createRequest() {
            var oHTTP = null;
            if (XMLHttpRequest) {
                oHTTP = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                oHTTP = new ActiveXObject('Microsoft.XMLHTTP');
            }
            return oHTTP;
        }

        function getHead(strURL, fncCallback, fncError) {
            var oHTTP = createRequest();
            if (oHTTP) {
                if (fncCallback) {
                    if (typeof (oHTTP.onload) != 'undefined') {
                        oHTTP.onload = function() {
                            if (oHTTP.status == '200') {
                                fncCallback(this);
                            } else {
                                if (fncError)
                                    fncError();
                            }
                            oHTTP = null;
                        };
                    } else {
                        oHTTP.onreadystatechange = function() {
                            if (oHTTP.readyState == 4) {
                                if (oHTTP.status == '200') {
                                    fncCallback(this);
                                } else {
                                    if (fncError) fncError();
                                }
                                oHTTP = null;
                            }
                        };
                    }
                }
                oHTTP.open('HEAD', strURL, true);
                oHTTP.send(null);
            } else {
                if (fncError) fncError();
            }
        }

        function sendRequest(strURL, fncCallback, fncError, aRange, bAcceptRanges, iFileSize) {

            var oHTTP = createRequest();
            if (oHTTP) {

                var iDataOffset = 0;
                if (aRange && !bAcceptRanges) iDataOffset = aRange[0];
                var iDataLen = 0;
                if (aRange) iDataLen = aRange[1] - aRange[0] + 1;

                if (fncCallback) {
                    if (typeof (oHTTP.onload) != 'undefined') {
                        oHTTP.onload = function() {
                            if (oHTTP.status == '200' || oHTTP.status == '206' || oHTTP.status == '0') {
                                this.binaryResponse = new BinaryFile( this.responseText, iDataOffset, iDataLen);
                                this.fileSize = iFileSize || this.getResponseHeader('Content-Length');
                                fncCallback(this);
                            } else {
                                if (fncError) fncError();
                            }
                            oHTTP = null;
                        };
                    } else {
                        oHTTP.onreadystatechange = function() {
                            if (oHTTP.readyState == 4) {
                                if (oHTTP.status == '200' || oHTTP.status == '206' || oHTTP.status == '0') {
                                    this.binaryResponse = new BinaryFile( oHTTP.responseBody, iDataOffset, iDataLen);
                                    this.fileSize = iFileSize || this.getResponseHeader('Content-Length');
                                    fncCallback(this);
                                } else {
                                    if (fncError) fncError();
                                }
                                oHTTP = null;
                            }
                        };
                    }
                }
                oHTTP.open('GET', strURL, true);

                if (oHTTP.overrideMimeType)
                    oHTTP.overrideMimeType('text/plain; charset=x-user-defined');

                if (aRange && bAcceptRanges) {
                    oHTTP.setRequestHeader('Range', 'bytes=' + aRange[0] + '-' + aRange[1]);
                }

                // This is causing problems GETting some images
                // (http://www.acbc.com.au/deploycontrol/images/upload/News_NAT_CND_2012_PM_J_Gillard_1_l.jpg)
                //
                // oHTTP.setRequestHeader('If-Modified-Since', 'Sat, 1 Jan 1970 00:00:00 GMT');

                oHTTP.send(null);
            } else {
                if (fncError) fncError();
            }
        }

        return function(strURL, fncCallback, fncError, aRange) {

            if (aRange) {
                getHead(strURL, function(oHTTP) {
                    var iLength = parseInt(oHTTP.getResponseHeader('Content-Length'), 10);
                    var strAcceptRanges = oHTTP.getResponseHeader('Accept-Ranges');

                    var iStart, iEnd;
                    iStart = aRange[0];
                    if (aRange[0] < 0)
                        iStart += iLength;
                    iEnd = iStart + aRange[1] - 1;

                    sendRequest(strURL, fncCallback, fncError,
                            [ iStart, iEnd ], (strAcceptRanges == 'bytes'),
                            iLength);
                });

            } else {
                sendRequest(strURL, fncCallback, fncError);
            }
        }

    }());
	

    (function() {

        function addEvent(oElement, strEvent, fncHandler) {
            if (oElement.addEventListener) {
                oElement.addEventListener(strEvent, fncHandler, false);
            } else if (oElement.attachEvent) {
                oElement.attachEvent('on' + strEvent, fncHandler);
            }
        }

        function imageHasData(oImg) {
            return !!(oImg.exifdata);
        }

        function imageHasBeenScanned(oImg) {
            return !!(oImg.imageScanned);
        }

        function getImageData(oImg, fncCallback) {
            BinaryAjax(oImg.src, function(oHTTP) {
                var oEXIF = findEXIFinJPEG(oHTTP.binaryResponse, {path: oImg.src});
                oImg.exifdata = oEXIF || {};
                oImg.imageScanned = true;
                if (fncCallback) fncCallback();
            })
        }

        function getExif (url, onComplete) {
			if (typeof module !== 'undefined' && 'exports' in module){
			/* NOTE 
			// RUNS IN node.js
			*/
				var fs = require('fs');	
				var readBuffer = function(buffer, info){
					var binaryResponse = new BinaryFile(buffer.toString('binary'), 0, buffer.length);
					info.path = url;
					var oEXIF = findEXIFinJPEG(binaryResponse, info);
					if (onComplete) onComplete((oEXIF || {}), url);
				}
				if (Buffer.isBuffer(url)){
					readBuffer(buffer);
				} else {
					fs.open(url, 'r', function(err, fd) {
						if (err) {
							// TODO - error first callback
							if (EXIF.debug===true) console.log('Status ', err.message);
							return {};
						}
						var buffer = new Buffer(131072);
						fs.read(fd, buffer, 0, buffer.length, 0, function(err, num) {
							readBuffer(buffer, fs.fstatSync(fd));
							fs.close(fd);
						});
					});
				}
			} else {
			/* NOTE 
			// RUNS IN browsers
			*/
				// TODO data/urls ...
				BinaryAjax(url, (function(theUrl) { 
					// I absolutely hate this closure syntax, hurts my head. Must try harder!
					return function(oHttp) {
						var oEXIF = findEXIFinJPEG(oHttp.binaryResponse);
						if (onComplete) onComplete((oEXIF || {}), theUrl);
					}
				})(url))
				return false;	
			}
            
        }

        function findEXIFinJPEG(oFile, fileInfo) {
            var aMarkers = [];

            if (oFile.getByteAt(0) != 0xFF || oFile.getByteAt(1) != 0xD8) {
				if (EXIF.debug===true) console.log( '!! not a valid jpg' );
                return false; // not a valid jpeg
            }
            var iOffset = 2;
            var iLength = oFile.getLength();

            var oExifData = new Object();
            var oXmpData = new Object();

            while (iOffset < iLength) {
                if (oFile.getByteAt(iOffset) != 0xFF) {
                    // return false; // not a valid marker, something is wrong
					if (EXIF.debug===true) console.log( '!! not a valid marker - iOffset: ', iOffset,':: byte ', oFile.getByteAt(iOffset) );
                    return oExifData;
                }

                var iMarker = oFile.getByteAt(iOffset + 1);

                // we could implement handling for other markers here,
                // but we're only looking for 0xFFE1 for EXIF and XMP data

                if (iMarker == 22400) {
                    return readEXIFData(oFile, iOffset + 4, oFile.getShortAt(iOffset + 2, true) - 2, fileInfo);
                    iOffset += 2 + oFile.getShortAt(iOffset + 2, true);

                } else if (iMarker == 225) {
                    // 0xE1 = Application-specific 1 (for EXIF)

                    var headerAsString = oFile.getStringAt(iOffset + 4, 28);
                    if (headerAsString.indexOf('http://ns.adobe.com/xap/1.0/') != -1) {
                        var sXmpData = oFile.getStringAt(iOffset + 33, oFile.getShortAt(iOffset + 2, true) - 31);

                        var xmlDoc;
                        try {
                            sXmpData = sXmpData.trim();
                            sXmpData = sXmpData.substr(sXmpData.indexOf('<'), sXmpData.lastIndexOf('>') + 1);
                            xmlDoc = $.parseXML(sXmpData);
                        } catch (e) {
                            // error parsing xml
                        }

                        if (xmlDoc != null) {
							$([ 'SerialNumber', 'ImageUniqueID' ]).each( function(index, tagName) {
								var tagVal = $(xmlDoc).find(tagName);
								var tagValue = tagVal.text();
							
								$([ 'aux', 'exif' ]).each( function(index, namespacePrefix) {
									if (typeof tagValue === 'undefined' || tagValue.length == 0) {
										// 2 backslash to escape colon
										$(xmlDoc).find(
											'['
											+ namespacePrefix
											+ '\\:'
											+ tagName
											+ ']'
										).each( function() {
											// but only 1 backslash needed here:
											tagValue = $(this).attr(
												namespacePrefix
												+ '\:'
												+ tagName
											);
											// //whyDoIDoThisJob?
										});
									}
								});
								
								if (typeof tagValue != 'undefined' && tagValue.length > 0) {
									tagValue = tidyString(tagValue);
									if (!(tagName in oXmpData)) oXmpData[tagName] = tagValue;
									if (typeof oExifData[tagName] === 'undefined' || tidyString(oExifData[tagName]).length == 0) {
										oExifData[tagName] = tagValue;
									}
								}
							});
							oExifData = sortArrayByKeys(oExifData);
                        }
                    } else {
                        oExifData = readEXIFData(oFile, iOffset + 4, oFile.getShortAt(iOffset + 2, true) - 2, fileInfo);
                    }

                    iOffset += 2 + oFile.getShortAt(iOffset + 2, true);
                } else {
                    iOffset += 2 + oFile.getShortAt(iOffset + 2, true);
                }
            }
            return oExifData;
        }

        function logInt(i, name) {
            console.log(name + ': ' + i + ' (hex: ' + (i).toString(16) + ')');
        }

        function calculateOffsetBase(oFile, iTIFFStart, iDirStart, bBigEnd, iHeaderSize, iOffsetBase) {
            if (!iHeaderSize) {
                iHeaderSize = 0;
            }
            if (!iOffsetBase) {
                iOffsetBase = 0;
            }
            if (typeof iDirStart === 'undefined') {
				if (EXIF.debug===true) console.log( '!! iDirStart is "undefined"' );
                return {};
            }

            var iTIFFStartHex = (iTIFFStart).toString(16);
            var iDirStartHex = (iDirStart).toString(16);
            var iOffsetBaseHex = (iOffsetBase).toString(16);
            var diffHex = (iEntriesPosition - iTIFFStart).toString(16);

            var iEntriesPosition = iDirStart + iHeaderSize;
            var iEntriesPositionHex = (iEntriesPosition).toString(16);

            var iEntries = oFile.getShortAt(iTIFFStart + iEntriesPosition,
                    bBigEnd);

            var expectedFirst_valueLocation = iEntriesPosition + 2
                    + (iEntries * 12);
            var next_value = oFile.getLongAt(expectedFirst_valueLocation
                    + iTIFFStart, bBigEnd);
            var next_valueHex = (next_value).toString(16);
            if (next_value == 0x00000000) { // if next IFD pointer is blank,
                // jump over it
                expectedFirst_valueLocation += 4;
            }
            var expectedFirst_valueLocationHex = (expectedFirst_valueLocation)
                    .toString(16);

            for (var i = 0; i < iEntries; i++) {
                var iEntryOffset = iTIFFStart + iEntriesPosition + i * 12 + 2;
                var type = oFile.getShortAt(iEntryOffset + 2, bBigEnd);
                var dataSize = oFile.getLongAt(iEntryOffset + 4, bBigEnd);

                if ((type == 1 && dataSize > 4) || (type == 2 && dataSize > 4)
                        || (type == 3 && dataSize > 2)
                        || (type == 4 && dataSize > 1)
                        || (type == 5 && dataSize > 1)
                        || (type == 7 && dataSize > 4)
                        || (type == 9 && dataSize > 1)
                        || (type == 10 && dataSize > 1)
                        || (type == 13 && dataSize > 1)) { 
						
						// i.e., if more than 8 bytes, this must be a pointer
                    var ifdPointer = oFile.getLongAt(iEntryOffset + 8, bBigEnd);
                    var ifdPointerHex = (ifdPointer).toString(16);

                    var differenceBetweenExpectedAndActual = expectedFirst_valueLocation
                            - ifdPointer;
                    var differenceBetweenExpectedAndActualHex = (differenceBetweenExpectedAndActual)
                            .toString(16);
                    return differenceBetweenExpectedAndActual;
                }
            }
            return 0; // default to no offset
        }

        function readTags(oFile, iTIFFStart, iDirStart, oStrings, bBigEnd, iHeaderSize, iOffsetBase, ref) {
            if (!iHeaderSize) {
                iHeaderSize = 0;
            }
            if (!iOffsetBase) {
                iOffsetBase = 0;
            }
            if (typeof iDirStart === 'undefined') {
				if (EXIF.debug===true) console.log( '!! iDirStart is "undefined"' );
                return {};
            }

            var iTIFFStartHex = (iTIFFStart).toString(16);
            var iDirStartHex = (iDirStart).toString(16);
            var iOffsetBaseHex = (iOffsetBase).toString(16);
            var diffHex = (iEntriesPosition - iTIFFStart).toString(16);

            var iEntriesPosition = iDirStart + iHeaderSize;
            var iEntriesPositionHex = (iEntriesPosition).toString(16);

            var iEntries = oFile.getShortAt(iTIFFStart + iEntriesPosition, bBigEnd);


            var oTags = new Object();

            for (var i = 0; i < iEntries; i++) {
                var iEntryOffset = iTIFFStart + iEntriesPosition + i * 12 + 2;
                var iEntryOffsetHex = (iEntryOffset).toString(16);
                var localAddress = oFile.getShortAt(iEntryOffset, bBigEnd);
				
                var strTag = oStrings[localAddress];
				var forceStr = (typeof ref === 'object' && strTag in ref && typeof ref[strTag] === 'string') ? true : false;

                if ( typeof strTag === 'undefined' ) {
                    continue;
                }
				try {
	                oTags[strTag] = readTagValue(oFile, iEntryOffset, iTIFFStart, iDirStart, bBigEnd, iHeaderSize, iOffsetBase, strTag, forceStr);
				} catch(e) {
					oTags[strTag] = { error:e };	
				}
				if (iEntries > 1000) {
					if (EXIF.debug===true) console.log( '[more than 1000 iEntries]' );
                    return oTags;
                }
            }
            return oTags;
        }

        function readTagValue(oFile, iEntryOffset, iTIFFStart, iDirStart, bBigEnd, iHeaderSize, iOffsetBase, strTag, forceStr) {
						
            var iTIFFStartHex = (iTIFFStart).toString(16);
            var iDirStartHex = (iDirStart).toString(16);
            var iEntryOffsetHex = (iEntryOffset).toString(16);
            var iOffsetBaseHex = (iOffsetBase).toString(16);

            var iType = oFile.getShortAt(iEntryOffset + 2, bBigEnd);
            var iNumValues = oFile.getLongAt(iEntryOffset + 4, bBigEnd);
            var iValueOffset = oFile.getLongAt(iEntryOffset + 8, bBigEnd)
                    + iTIFFStart + iOffsetBase;
            var iValueOffsetHex = (iValueOffset).toString(16);
			
			if (forceStr === true){ 
				var iStringOffset = iNumValues > 4 ? iValueOffset : (iEntryOffset + 8);
				return { value: tidyString(oFile.getStringAt(iStringOffset, iNumValues)), _val:iEntryOffset };
			} 

            switch (iType) {
				case 1: // byte, 8-bit unsigned int
					if (iNumValues == 1) {
						return oFile.getByteAt(iEntryOffset + 8, bBigEnd);
					} else if (iNumValues<2000){ 
						/* FIXME :
						limited up to 2000 becuase: 
						MIGHT BE NIKON BINARY AS WELL somehow, see e.g. Nikon D3100 */
						var iValOffset = iNumValues > 4 ? iValueOffset : (iEntryOffset + 8);
						var aVals = [];
						for (var n = 0; n < iNumValues; n++) {
							aVals[n] = oFile.getByteAt(iValOffset + n);
						}
						return aVals;
					}
					if (EXIF.debug===true) console.log( '8 bit unsigned int value: [more than 1000 iNumValues]' );
					return [];
				break;
	
				case 2: // ascii, 8-bit byte
					var iStringOffset = iNumValues > 4 ? iValueOffset : (iEntryOffset + 8);
					var iStringOffsetHex = (iStringOffset).toString(16);
					var iActualOffset = (iStringOffset - iTIFFStart);
					var iActualOffsetHex = (iActualOffset).toString(16);

 					if (iNumValues<2000){ 
						/* FIXME :
						limited up to 2000 becuase: 
						MIGHT BE NIKON BINARY AS WELL somehow, see e.g. Nikon D3100 */	
						if (strTag == 'SerialNumber' || strTag == 'InternalSerialNumber') { 
							// TODO: needed for Fujifilm FinePix E900
							// but I'm not sure why...
							iNumValues++;
						}
						return oFile.getStringAt(iStringOffset, iNumValues - 1);
					}
					return '';
				break;
	
				case 3: // short, 16 bit int
					if (iNumValues == 1) {
						return oFile.getShortAt(iEntryOffset + 8, bBigEnd);
					} else {
						var iValOffset = iNumValues > 2 ? iValueOffset
								: (iEntryOffset + 8);
						var aVals = [];
						for (var n = 0; n < iNumValues; n++) {
							aVals[n] = oFile.getShortAt(iValOffset + 2 * n, bBigEnd);
						}
						return aVals;
					}
				break;
	
				case 4: // long, 32 bit int
					if (iNumValues == 1) {
						return oFile.getLongAt(iEntryOffset + 8, bBigEnd);
					} else if (iNumValues<2000){
						/* FIXME :
						limited up to 2000 becuase: 
						MIGHT BE NIKON BINARY AS WELL somehow, see e.g. Nikon D3100 */	
						var aVals = [];
						for (var n = 0; n < iNumValues; n++) {
							aVals[n] = oFile.getLongAt(iValueOffset + 4 * n, bBigEnd);
						}
						return aVals;
					}
					if (EXIF.debug===true) console.log( '32 bit int value: [more than 1000 iNumValues]' );
					return [];
				break;
				
				case 5: // rational = two long values, first is numerator, second is
					// denominator
					if (iNumValues == 1) {
						return oFile.getLongAt(iValueOffset, bBigEnd) / oFile.getLongAt(iValueOffset + 4, bBigEnd);
					} else {
						var aVals = [];
						for (var n = 0; n < iNumValues; n++) {
							aVals[n] = oFile.getLongAt(iValueOffset + 8 * n, bBigEnd) / oFile.getLongAt(iValueOffset + 4 + 8 * n, bBigEnd);
						}
						return aVals;
					}
				break;
				
				// case 7: // undefined, 8-bit byte, value depending on field
				case 7: // IFDPointer
					if (iNumValues == 1) {
						return oFile.getByteAt(iEntryOffset + 8, bBigEnd);
					} else if (iNumValues > 40) { // lets assume it's a IFD pointer?
						return oFile.getLongAt(iEntryOffset + 8, bBigEnd);
					} else {
						var iValOffset = iNumValues > 4 ? iValueOffset : (iEntryOffset + 8);
						var aVals = [];
						for (var n = 0; n < iNumValues; n++) {
							aVals[n] = oFile.getByteAt(iValOffset + n);
						}
						return aVals;
					}
				break;
				
				case 9: // slong, 32 bit signed int
					if (iNumValues == 1) {
						return oFile.getSLongAt(iEntryOffset + 8, bBigEnd);
					} else {
						var aVals = [];
						for (var n = 0; n < iNumValues; n++) {
							aVals[n] = oFile.getSLongAt(iValueOffset + 4 * n, bBigEnd);
						}
						return aVals;
					}
				break;
				
				case 10: // signed rational, two slongs, first is numerator, second is denominator
					if (iNumValues == 1) {
						return oFile.getSLongAt(iValueOffset, bBigEnd)
								/ oFile.getSLongAt(iValueOffset + 4, bBigEnd);
					} else if (iNumValues > 1 && iNumValues < 1000){
						var aVals = [];
						for (var n = 0; n < iNumValues; n++) {
							aVals[n] = oFile.getSLongAt(iValueOffset + 8 * n, bBigEnd)
									/ oFile.getSLongAt(iValueOffset + 4 + 8 * n, bBigEnd);
						}
						return aVals;
					}
					return {};
				break;
				case 13: // IFDPointer
					return oFile.getLongAt(iEntryOffset + 8, bBigEnd) + iDirStart;
				break;
				
				// 30 is e.g. decoded binary in Nikon ...
				
            }
			return {};
        }
		

        function readEXIFData(oFile, iStart, iLength, fileInfo) {
			
            if (oFile.getStringAt(iStart, 4) != 'Exif') {
                return false;
            }

            var bBigEnd;

            var iTIFFOffset = iStart + 6;

            // test for TIFF validity and endianness
            if (oFile.getShortAt(iTIFFOffset) == 0x4949) {
                bBigEnd = false;
            } else if (oFile.getShortAt(iTIFFOffset) == 0x4D4D) {
                bBigEnd = true;
            } else {
                return false;
            }

            if (oFile.getShortAt(iTIFFOffset + 2, bBigEnd) != 0x002A) {
                return false;
            }
            if (oFile.getLongAt(iTIFFOffset + 4, bBigEnd) != 0x00000008) {
                return false;
            }
			
            var oTags = { file: {}, image: {}, exif:{}, makernote:{}, gps:{}, thumb:{}, iptc:{}, xmp:{}, unknown:{} };
			
			var explainTags = function(type){
				var eTags = oTags[type];
				
				for ( var key in EXIF.ref ) {
					var ref = EXIF.ref[key];
					if (key in eTags){
						switch (typeof ref) {
							case 'function': 
								if (key.concat('Ref') in eTags) {
									eTags[key] = ref(eTags[key], eTags[key.concat('Ref')].value);
								} else {
									eTags[key] = ref(eTags[key]);
								}
							break;
							default:
								if (eTags[key] in ref){ 
									eTags[key] = { value:ref[eTags[key]], _val:eTags[key] };
								} else {
									eTags[key] = { value:eTags[key], _val:eTags[key] };
								}
							break;
						}
					}
				}
				oTags[type] = eTags;
			}
			
			if (EXIF.debug===true) console.log( '! READING "image"' );
			oTags.image = readTags(oFile, iTIFFOffset, 8, EXIF.tiffTags, bBigEnd);
			explainTags('image');
			
			if (EXIF.debug===true) console.log( '! READING "unknown"' );
			oTags.unknown = readTags(oFile, iTIFFOffset, 8, EXIF.unknownTags, bBigEnd);
			explainTags('unknown');
			
			if (EXIF.debug===true) console.log( '! READING "exif"' );
            if (oTags.image._IFDpointer_EXIF) {
                oTags.exif = readTags(oFile, iTIFFOffset, oTags.image._IFDpointer_EXIF, EXIF.tags, bBigEnd);
				explainTags('exif');
            }
			if (EXIF.debug===true) console.log( '! READING "gps"' );
            if (oTags.image._IFDpointer_GPS) {
                oTags.gps = readTags(oFile, iTIFFOffset, oTags.image._IFDpointer_GPS, EXIF.gpsTags, bBigEnd);
				explainTags('gps');
            }
			
			
			if('Make' in oTags.image && typeof oTags.image.Make==='string') {
				oTags.image.Make = oTags.image.Make.trim();
				var makeID = tidyString(oTags.image.Make.substr(0,15).toUpperCase());
				if (EXIF.debug===true) console.log( 'MAKER ID', makeID, makeID.length );
			}

            if ( '_IFDpointer_Makernote' in oTags.exif && 'Make' in oTags.image && makeID in MAKE.info ) {
				
				// TODO - makernotes amd support like redaktor.meta
				var header = oFile.getStringAt(iTIFFOffset + oTags.exif._IFDpointer_Makernote, 16);
				var headerStr = tidyString(header);
				// headerStr is easy readable but senseless if the header variable is "nonsense" like with Minolta.
				// we use a simple hash for that ...
				if (headerStr==''){ 
					headerStr = Math.abs( header.split('').reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0) );
				}

				// check wich makernote file to require ...
				var mFile = '';
				if (typeof MAKE.info[makeID] === 'function') { 
					mFile = MAKE.info[makeID](oTags.image.Make, oTags.image.Model, headerStr);
				} else { 
					mFile = MAKE.info[makeID];
				}
                /* TODO - check if mFile exists (or is supported) */
				var oMakeInfo = require( './makernotes/'.concat(mFile) ).info;
				
				if (EXIF.debug===true && ('HeaderSize' in oMakeInfo || 'DefaultHeaderSize' in oMakeInfo)) console.log( 'headerStr', headerStr );
				
                var bMakerNoteEndianess = bBigEnd;
				
                if (oMakeInfo.MakerNoteByteAlignHeaderOffset) {
                    var iBigEndPointer = iTIFFOffset
                            + oTags.exif._IFDpointer_Makernote
                            + oMakeInfo.MakerNoteByteAlignHeaderOffset;
                    var iByteAlign = oFile.getShortAt(iBigEndPointer);
                    if (iByteAlign == 0x4949) {
                        bMakerNoteEndianess = false;
                    } else if (iByteAlign == 0x4D4D) {
                        bMakerNoteEndianess = true;
                    } else {
                        if (EXIF.debug===true) console.log('Failed to find legal endianess in makernotes. Using default');
                        // fall through to use default for TIFF
                    }
                }

                if (oMakeInfo.MakerNoteByteAlign) {
                    if (oMakeInfo.MakerNoteByteAlign == 0x4949) {
                        bMakerNoteEndianess = false;
                    } else if (oMakeInfo.MakerNoteByteAlign == 0x4D4D) {
                        bMakerNoteEndianess = true;
                    }
                }
                

                var iMakerNoteHeaderSize = 0;
                if (oMakeInfo.DefaultHeaderSize) {
                    iMakerNoteHeaderSize = oMakeInfo.DefaultHeaderSize;
                }
                if (oMakeInfo.HeaderSize && headerStr in oMakeInfo.HeaderSize) {
                    iMakerNoteHeaderSize = oMakeInfo.HeaderSize[headerStr];
                }

                var iOffsetBase = 0;
                if (oMakeInfo.FixMakernotesOffset || oTags.exif.OffsetSchema) {
                    iOffsetBase = calculateOffsetBase(oFile, iTIFFOffset,
                            oTags.exif._IFDpointer_Makernote, 
                            bMakerNoteEndianess, iMakerNoteHeaderSize,
                            iOffsetBase);
                }
                // if (oTags.exif.OffsetSchema) {
                // FIXME: implement this in 'calculateOffsetBase()' then ignore
                // this broken microsoft tag 'exif.OffsetSchema'\
                // iOffsetBase = oTags.exif.OffsetSchema;
                // }
                if (oMakeInfo.UseMakernoteOffsetAsBase) { 
					// then we need to add makernote location as an offset
                    if (oMakeInfo.UseMakernoteOffsetAsBase[headerStr]) {
                        iOffsetBase = oTags.exif._IFDpointer_Makernote;
                    }
                }
                if (oMakeInfo.AdjustOffsetBase) {
                    if (headerStr in oMakeInfo.AdjustOffsetBase) {
                        iOffsetBase += oMakeInfo.AdjustOffsetBase[headerStr];
                    }
                }
				
				
				
				// now we know the values from the image which are called Extra Tags in perl...
				// put it to the image section for compliance with perl reference
				// basically metametadata
				
				var _srcFile = (typeof fileInfo === 'object' && 'path' in fileInfo) ? fileInfo.path : '[binary]';
				
				var extra = {
					srcFile : '', 
					dirName : '',
					fileName: ''
				};
				var getReadableFileSize = function(fileSizeInBytes) {
					var i = -1;
					var byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
					do {
						fileSizeInBytes = fileSizeInBytes / 1024;
						i++;
					} while (fileSizeInBytes > 1024);
					return (fileSizeInBytes===0) ? 0 : Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
				};
				var getReadablePermissions = function(octalNumeric) {
					var dec = parseInt(octalNumeric.toString(8), 10); //33188 = 100644
					var decType = parseInt(dec.toString().substr(0,2), 10);
					var decPerm = dec.toString().substr(3,6);
					var types = { 4:'Directory', 10:'File', 12:'Symbolic link', 16:'Gitlink' };
					var perms = { 0:'---', 1: '--x', 2: '-w-', 3: '-wx', 4: 'r--', 5: 'r-x', 6: 'rw-', 7: 'rwx' };
					var tStr = 'n/a';
					var pStr = '';
					for (var i = 0; i < 3; i++) {
						if (parseInt(decPerm[i]) in perms) pStr = pStr.concat(perms[decPerm[i]]);
					}
					if (decType in types) tStr = types[decType];
					return { type: { value:tStr, _val:decType }, permissions: { value:pStr, _val:parseInt(decPerm) } };
				};
				
				
				if (_srcFile === '[binary]'){
					extra.srcFile = '[binary]'; extra.fileName = '[binary]'; extra.dirName = '[binary]'; extra.filePerm = 'n/a';
					// TODO - could be replaced by EXIF: extra.dateModi = 'n/a'; extra.dateCrea = 'n/a';
					// TODO: // extra.mimeType = ''; extra.fileSize = ''; extra.fileType = ''; 
				} else if (typeof module !== 'undefined' && 'exports' in module) {
					extra.srcFile = _srcFile.replace(/^.\//,'');
					extra.fileName = extra.srcFile.replace(/^.*[\\\/]/, '');
					extra.dirName = extra.srcFile.replace(extra.fileName, '').replace(/[\\\/:]$/, '');
					console.log( fileInfo );
					if ('size' in fileInfo) { 
						oTags.file.FileSize = { value: getReadableFileSize(fileInfo.size), _val: fileInfo.size };
					}
					if ('mode' in fileInfo) {
						var pInfo = getReadablePermissions(fileInfo.mode);
						oTags.file.FilePermissions = pInfo.permissions;
						oTags.file.FileType = pInfo.type; 	
						oTags.file.ModifyDate = { value:fileInfo.mtime, _val:Date.parse(fileInfo.mtime) };
						oTags.file.CreateDate = { value:fileInfo.ctime, _val:Date.parse(fileInfo.ctime) };
						/* file.fileType: is a "stub" here 
						// image.fileType is more detailed and will have priority 
						*/
					}
					
				} else {
					extra.srcFile = _srcFile.replace(/^.\//,'');
					extra.fileName = extra.srcFile.replace(/^.*[\\\/]/, '');
					extra.dirName = extra.srcFile.replace(extra.fileName, '').replace(/[\\\/:]$/, '');
				}
				
				
				oTags.file.SourceFile = { value: extra.srcFile , _val: _srcFile };
				oTags.file.Directory = { value: extra.dirName, _val: extra.dirName };
				oTags.file.FileName = { value: extra.fileName, _val: extra.fileName };
				
				var byteOrderStr = (bMakerNoteEndianess===false) ? 'Little-endian (Intel, II)' : 'Big-endian (Motorola, MM)';
				oTags.image.ExifByteOrder = { value: byteOrderStr, _val: bMakerNoteEndianess };
				
				
				var explainMakernote = function(tags, key){
					var val = tags[key];
					var ref = oMakeInfo.ref[key];
					/* for aliasses [multiple keys share 1 table] : */
					if (typeof ref === 'object' && 'ref' in ref ) ref = oMakeInfo.ref[ref.ref]; 
					
					switch (typeof ref) {
						case 'function':
							tags[key] = ref(val, oTags.image.Model);
						break;
						case 'string':
							tags[key] = val;
						break;
						default:
							if (val in ref){ 
								tags[key] = { 
									value:ref[val], 
									_val: (typeof val === 'string') ? tidyString(val) : val 
								};
							} else {
								tags[key] = { 
									value:(typeof val === 'string') ? tidyString(val) : val, 
									_val: (typeof val === 'string') ? tidyString(val) : val 
								};
							}
						break;
					}
				};
				
				var parseMakernoteContainer = function(tags, name){
					if (typeof name === 'string') oTags.makernote[name] = new Object();
					for ( var key in tags) {
						if ( typeof tags[key] === 'undefined' ){ 
							if (EXIF.debug===true) console.log( '[', key, ' is undefined]' );
							continue;
						}
						/* check if it's an IFD itself */
						var isIFD = (key.substr(0,12)==='_IFDpointer_' && key!=oMakeInfo.SerialWithinIFD) ? true : false;
						if (isIFD && key in oMakeInfo.ref && typeof tags[key] === 'number'){
							if (EXIF.debug===true) console.log( '! READING subIFD "'.concat(key.split('_IFDpointer_').join(''), '"') );
							
							var _name = key.split('_IFDpointer_').join('');	
							var headerSize = ('IFDHeaderSize' in oMakeInfo && typeof oMakeInfo.IFDHeaderSize === 'number') ? oMakeInfo.IFDHeaderSize : 0;
							
							var ref = (typeof oMakeInfo.ref[key] === 'function') ? oMakeInfo.ref[key](null, oTags.image.Model) : oMakeInfo.ref[key];
							
							if (EXIF.debug===true) console.log( 'IFD ref', ref );
							var oIFDTags = readTags(oFile, iTIFFOffset,
									tags[key],
									ref, 
									bMakerNoteEndianess, headerSize, 
									iOffsetBase
							);
							if (EXIF.debug===true) console.log( 'IFD result', oIFDTags );
							
							if (typeof oMakeInfo.ref[key] === 'function'){
								parseMakernoteContainer( oMakeInfo.ref[key](oIFDTags, oTags.image.Model), _name );
							} else {
								parseMakernoteContainer(oIFDTags, _name);
							}
						}
						
						if ('ref' in oMakeInfo && key in oMakeInfo.ref && !isIFD ){ 
							explainMakernote(tags, key);
						}
						
						var v = tags[key];
						
						if (v instanceof Array) {
							v = EXIF.ref._arr(v);
							(typeof name === 'string') ? oTags.makernote[name][key] = v : oTags.makernote[key] = v;
						} else if (typeof v === 'object' && 'multipleValues' in v){
							(typeof name === 'string') ? oTags.makernote[name][key] = new Object() : oTags.makernote[key] = new Object();
							for ( var mkey in v.multipleValues ) {
								(typeof name === 'string') ? 
									oTags.makernote[name][key][mkey] = v.multipleValues[mkey] :
									oTags.makernote[key][mkey] = v.multipleValues[mkey];
							}
						} else if (typeof v === 'object' && 'key' in v) {
							key = v.key;
							delete v.key;
							(typeof name === 'string') ? oTags.makernote[name][key] = v : oTags.makernote[key] = v;
						} else if (typeof v !== 'undefined') {
							if (typeof v === 'string') v = tidyString(v);
							if (typeof name === 'string') { 
								oTags.makernote[name][key] = (typeof v === 'object') ? v : { value:v, _val:v }; 
							} else {
								oTags.makernote[key] = (typeof v === 'object') ? v : { value:v, _val:v };
							}
						}
					}
				};
				
				
                // now read MakerNotes...
				oTags.makernote._type = mFile.replace('.js','');
				if (EXIF.debug===true) console.log( '! READING "makernotes" '.concat(oTags.makernote._type) );

				var mTags = new Object();
				mTags = readTags(oFile, iTIFFOffset,
						oTags.exif._IFDpointer_Makernote, 
						oMakeInfo.tags,
						bMakerNoteEndianess, iMakerNoteHeaderSize,
						iOffsetBase,
						oMakeInfo.ref
				);
				
				/* 
				// preparse some values which might be used 
				// to decrypt other values by some venors, e.g. SerialNumber 
				*/

                if (oMakeInfo.SerialFoundAtStartOfMakerNotes) {
					// only Kodak yet ...
                    var serialNumber = tidyString(oFile.getStringAt(iTIFFOffset
                            + oTags.exif._IFDpointer_Makernote, 16));
                    if (oMakeInfo.InvalidSerialStart) {
                        var startOfSerial = serialNumber.substr(0, oMakeInfo.InvalidSerialStart.length);
                        if (startOfSerial != oMakeInfo.InvalidSerialStart) {
                            mTags.SerialNumber = serialNumber;
							oTags.exif.SerialNumber = serialNumber;
                        }
                    } else {
                        mTags.SerialNumber = serialNumber;
						oTags.exif.SerialNumber = serialNumber;
                    }					
                }
                				
				if (oMakeInfo.SerialWithinIFD) {
					// e.g. Olympus
					// let's preparse the whole ifd ...
                    var container = oMakeInfo.SerialWithinIFD;
                    var oIFDTags = readTags(oFile, iTIFFOffset,
                            mTags[container],
                            oMakeInfo.ref[container], 
							bMakerNoteEndianess, oMakeInfo.IFDHeaderSize, 
							iOffsetBase
					);
					var name = container.split('_IFDpointer_').join('');	
					parseMakernoteContainer(oIFDTags, name);
					if (EXIF.debug===true) console.log( '! READING subIFD "'.concat(name,'"') );
					if ('SerialNumber' in oTags.makernote[name]) oTags.exif.SerialNumber = oTags.makernote[name].SerialNumber;				
                }
				
                if (oMakeInfo.InternalSerialWithinIFDArray) {
					// not needed yet
                    IFDArray = mTags[oMakeInfo.InternalSerialWithinIFDArray];
                    if (IFDArray) {
                        internalSerialNumber = IFDArray[oMakeInfo.InternalSerialWithinIFDArrayElement];
                        mTags.InternalSerialNumber = internalSerialNumber;
						oTags.exif.InternalSerialNumber = serialNumber;
                    }
					
                }
				
				for (tag in { 'SerialNumber' : null, 'InternalSerialNumber' : null  }) {
                    if (oTags.makernote[tag]) {
                        oTags.makernote[tag] = {value:formatSerialNumber(oTags, oTags.makernote[tag].value), _val:oTags.makernote[tag]._val};
						if (!(tag in oTags.exif)) oTags.exif[tag] = oTags.makernote[tag];
                        if (oMakeInfo.MinimumBelievableLength) {
                            if (oTags.makernote[tag].length < oMakeInfo.MinimumBelievableLength) {
                                oTags.makernote[tag] = null;
                            }
                        }
                        if (isBlank(oTags.makernote[tag])) {
                            delete oTags.makernote[tag];
                        }
                    }
                }

                if (oTags.makernote.ImageUniqueID) {
                    oTags.makernote.ImageUniqueID = intArrayToHexString(oTags.makernote.ImageUniqueID);
                }
				/* preparse END */
				
				
				parseMakernoteContainer(mTags);
				
                
            }
			
            for (var key in oTags) oTags[key] = tidyExifValues( sortArrayByKeys(oTags[key]) );
            return sortArrayByKeys(oTags);
        }
		

        function tidyExifValues(tags) {
            var tidyData = new Object();
            // $.each(tags, function(key, value) {
            for ( var key in tags) {
				if (typeof tags[key] === 'string'){
					tidyData[key] = { value: tidyString(tags[key]), _val:tags[key] };
				} else if (typeof tags[key] === 'number'){
					tidyData[key] = { value: tags[key], _val:tags[key] };
				} else {
	                tidyData[key] = tags[key];
				}
            }
            return tidyData;
        }

        function isBlank(str) {
            return (!str || /^\s*$/.test(str));
        }

        function sortArrayByKeys(inputarray) {
            var arraykeys = [];
            for ( var k in inputarray) {
                arraykeys.push(k);
            }
            arraykeys.sort();

            var outputarray = new Object();
            for (var i = 0; i < arraykeys.length; i++) {
                outputarray[arraykeys[i]] = inputarray[arraykeys[i]];
            }
            return outputarray;
        }

        function formatSerialNumber(tags, serial) {
			
			if (typeof serial === 'number') serial = serial.toString();
			
            var returnSerial = tidyString(serial);

            switch (tags.image.Make) {
            case 'Canon':
                // if (tags.image.SerialNumberFormat == 0xa0000000) {
                if (returnSerial.length > 6) {
                    returnSerial = pad(returnSerial, '0', 10);
                } else {
                    returnSerial = pad(returnSerial, '0', 6);
                }
                break;
            case 'FUJIFILM':
                var startOf12CharBlock = returnSerial.lastIndexOf(' ') + 1;
                if (startOf12CharBlock == -1) {
                    returnSerial + '';
                    break;
                }
                var iDateIndex = startOf12CharBlock + 12;
                var year = returnSerial.substr(iDateIndex, 2);
                if (year > 80) {
                    year = '19' + year;
                } else {
                    year = '20' + year;
                }
                var month = returnSerial.substr(iDateIndex + 2, 2);
                var date = returnSerial.substr(iDateIndex + 4, 2);
                var lastChunk = returnSerial.substr(iDateIndex + 6, 12);
                var returnSerial = returnSerial.substr(0, iDateIndex) + ' '
                        + year + ':' + month + ':' + date + ' ' + lastChunk;
                if (lastChunk.length < 12) {
                    returnSerial = '';
                }

                break;
            case 'Panasonic':
                var year = String.fromCharCode(serial[3])
                        + String.fromCharCode(serial[4]);
                var month = String.fromCharCode(serial[5])
                        + String.fromCharCode(serial[6]);
                var date = String.fromCharCode(serial[7])
                        + String.fromCharCode(serial[8]);

                var iYear = parseInt(year, 10);
                var iMonth = parseInt(month, 10);
                var iDate = parseInt(date, 10);

                returnSerial = '';

                if (isNaN(iYear) || isNaN(iMonth) || isNaN(iDate) || iYear < 0
                        || iYear > 99 || iMonth < 1 || iMonth > 12 || iDate < 1
                        || iDate > 31) {
                    // error
                } else {
                    returnSerial = '(' + String.fromCharCode(serial[0])
                            + String.fromCharCode(serial[1])
                            + String.fromCharCode(serial[2]) + ')';
                    returnSerial += ' 20' + year; // year
                    returnSerial += ':' + month; // month
                    returnSerial += ':' + date; // date
                    returnSerial += ' no. ' + String.fromCharCode(serial[9])
                            + String.fromCharCode(serial[10])
                            + String.fromCharCode(serial[11])
                            + String.fromCharCode(serial[12]); // id
                }
                break;
            case 'Pentax':
                if (returnSerial.length != 7) {
                    returnSerial = '';
                }
                break;

            }
			
            return returnSerial;
        }

        function pad(input, chr, len) {
            var returnString = input;
            while (returnString.length < len) {
                returnString = chr + returnString;
            }
            return returnString;
        }

        function intArrayToHexString(arrayOfInts) {
            var response = '';
            for ( var i in arrayOfInts) {
                response += pad(arrayOfInts[i].toString(16), '0', 2);
            }
            return response;
        }

        EXIF.getData = function(oImg, fncCallback) {
            if (!oImg.complete)
                return false;
            if (!imageHasData(oImg)) {
                getImageData(oImg, fncCallback);
            } else {
                if (fncCallback)
                    fncCallback();
            }
            return true;
        }

        EXIF.getTag = function(oImg, strTag) {
            if (!imageHasData(oImg))
                return;
            return oImg.exifdata[strTag];
        }

        EXIF.getAllTags = function(oImg) {
            if (!imageHasData(oImg))
				if (EXIF.debug===true) console.log( '!! image has no data' );
                return {};
            var oData = oImg.exifdata;
            var oAllTags = new Object();
            for ( var a in oData) {
                if (oData.hasOwnProperty(a)) {
                    oAllTags[a] = oData[a];
                }
            }
            return oAllTags;
        }

        EXIF.pretty = function(oImg) {
            if (!imageHasData(oImg))
                return '';
            var oData = oImg.exifdata;
            var strPretty = '';
            for ( var a in oData) {
                if (oData.hasOwnProperty(a)) {
                    if (typeof oData[a] == 'object') {
                        strPretty += a + ' : [' + oData[a].length
                                + ' values]\r\n';
                    } else {
                        strPretty += a + ' : ' + oData[a] + '\r\n';
                    }
                }
            }
            return strPretty;
        }

        EXIF.readFromBinaryFile = function(oFile) {
            return findEXIFinJPEG(oFile);
        }

        function loadAllImages() {
            var aImages = document.getElementsByTagName('img');
            for (var i = 0; i < aImages.length; i++) {
                var filename = aImages[i].src.toLowerCase()
                if (filename.substr(-3) === 'jpg' || filename.substr(-4) === 'jpeg') {
                    if (!aImages[i].complete) {
                        addEvent(aImages[i], 'load', function() {
                            EXIF.getData(this);
                        });
                    } else {
                        EXIF.getData(aImages[i]);
                    }
                }
            }
        }

        function tidyString(str) {
			if (typeof str === 'number') return str;
            if (typeof str === 'undefined') str = '';
            str = str + '';

            str = str.replace(/[^a-z0-9 \-\/\.\(\)\:\;\,\©\@\\]/gi, '');
            str = str.replace(/^\s+|\s+$/g, ''); // trim
            if (str.toLowerCase() == 'undefined') {
                str = '';
            }
            return str.trim();
        }

        function allImagesLoaded() {
            var aImages = document.getElementsByTagName('img');
            for (var i = 0; i < aImages.length; i++) {
                var filename = aImages[i].src.toLowerCase()
                if (filename.substr(-3) === 'jpg'
                        || filename.substr(-4) === 'jpeg') {
                    if (!aImages[i].imageScanned) {
                        return false;
                    }
                }
            }
            return true;
        }
		
		/*
			README : makernotes are currently supported by node.js ONLY
			// TODO : 
			// bundle either with http://requirejs.org OR
			// another CommonJS implementation (http://www.commonjs.org/impl/) OR
			// use dojo / jQuery require
			
			// it would be very unhandy to put all makernote desrciptions in one file
		*/

		/* TODO support amd/dojo/commonJS etc ...
		if (typeof define === 'function' && define.amd) {
			define([], function() {
				// exports.getExif = getExif;
				// exports.ref = EXIF.ref;
				return exports;
			});
		} else */ if (typeof module !== 'undefined' && 'exports' in module) {
			/* renamed, TODO : support node buffers */
            module.exports.getExif = getExif;
			module.exports.ref = EXIF.ref;
		} 
		
		if (typeof (jQuery) === 'undefined') {
			if (typeof window !== 'undefined') window.getExif = getExif;
		} else {
			jQuery.fn.loadAllImages = loadAllImages;
			jQuery.fn.allImagesLoaded = allImagesLoaded;
			jQuery.fn.getExif = getExif;
			jQuery.fn.tidyString = tidyString;

			// load data for images manually
			jQuery.fn.exifLoad = function(fncCallback) {
				return this.each(function() {
					EXIF.getData(this, fncCallback)
				});
			}

			jQuery.fn.findEXIFinJPEG = function(oFileText) {
				return findEXIFinJPEG(new BinaryFile(oFileText));
			}

			jQuery.fn.exif = function(strTag) {
				var aStrings = [];
				this.each(function() {
					aStrings.push(EXIF.getTag(this, strTag));
				});
				return aStrings;
			}

			jQuery.fn.exifString = function(strTag) {
				var aStrings = [];
				this.each(function() {
					aStrings.push(EXIF.getTag(this, strTag));
				});
				return aStrings[0];
			}

			jQuery.fn.exifAll = function() {
				var aStrings = [];
				this.each(function() {
					aStrings.push(EXIF.getAllTags(this));
				});
				return aStrings;
			}

			jQuery.fn.exifPretty = function() {
				var aStrings = [];
				this.each(function() {
					aStrings.push(EXIF.pretty(this));
				});
				return aStrings;
			}
		}
        
    })();

})();