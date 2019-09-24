

var encoding = require("encoding");

var writeFnMap = {
    '>c': Buffer.prototype.writeUInt8,
    '>C': Buffer.prototype.writeInt8,
    '>b': Buffer.prototype.writeUInt8,
    '>B': Buffer.prototype.writeInt8,
    '>?': Buffer.prototype.writeUInt8,
    '>h': Buffer.prototype.writeUInt16BE,
    '>H': Buffer.prototype.writeInt16BE,
    '>i': Buffer.prototype.writeUInt32BE,
    '>I': Buffer.prototype.writeInt32BE,
    '>l': Buffer.prototype.writeBigUInt64BE,
    '>L': Buffer.prototype.writeBigInt64BE,
    '>f': Buffer.prototype.writeFloatBE,
    '>F': Buffer.prototype.writeFloatBE,
    '>d': Buffer.prototype.writeDoubleBE,
    '>D': Buffer.prototype.writeDoubleBE,
    '>s': Buffer.prototype.writeUInt8,
    '>S': Buffer.prototype.writeUInt8,

    '<c': Buffer.prototype.writeUInt8,
    '<C': Buffer.prototype.writeInt8,
    '<b': Buffer.prototype.writeUInt8,
    '<B': Buffer.prototype.writeInt8,
    '<?': Buffer.prototype.writeUInt8,
    '<h': Buffer.prototype.writeUInt16LE,
    '<H': Buffer.prototype.writeInt16LE,
    '<i': Buffer.prototype.writeUInt32LE,
    '<I': Buffer.prototype.writeInt32LE,
    '<l': Buffer.prototype.writeBigUInt64LE,
    '<L': Buffer.prototype.writeBigInt64LE,
    '<f': Buffer.prototype.writeFloatLE,
    '<F': Buffer.prototype.writeFloatLE,
    '<d': Buffer.prototype.writeDoubleLE,
    '<D': Buffer.prototype.writeDoubleLE,
    '<s': Buffer.prototype.writeUInt8,
    '<S': Buffer.prototype.writeUInt8,
}

var readFnMap = {
    '>c': Buffer.prototype.readUInt8,
    '>C': Buffer.prototype.readInt8,
    '>b': Buffer.prototype.readUInt8,
    '>B': Buffer.prototype.readInt8,
    '>?': Buffer.prototype.readUInt8,
    '>h': Buffer.prototype.readUInt16BE,
    '>H': Buffer.prototype.readInt16BE,
    '>i': Buffer.prototype.readUInt32BE,
    '>I': Buffer.prototype.readInt32BE,
    '>l': Buffer.prototype.readBigUInt64BE,
    '>L': Buffer.prototype.readBigInt64BE,
    '>f': Buffer.prototype.readFloatBE,
    '>F': Buffer.prototype.readFloatBE,
    '>d': Buffer.prototype.readDoubleBE,
    '>D': Buffer.prototype.readDoubleBE,
    '>s': Buffer.prototype.slice,
    '>S': Buffer.prototype.slice,

    '<c': Buffer.prototype.readUInt8,
    '<C': Buffer.prototype.readInt8,
    '<b': Buffer.prototype.readUInt8,
    '<B': Buffer.prototype.readInt8,
    '<?': Buffer.prototype.readUInt8,
    '<h': Buffer.prototype.readUInt16LE,
    '<H': Buffer.prototype.readInt16LE,
    '<i': Buffer.prototype.readUInt32LE,
    '<I': Buffer.prototype.readInt32LE,
    '<l': Buffer.prototype.readBigUInt64LE,
    '<L': Buffer.prototype.readBigInt64LE,
    '<f': Buffer.prototype.readFloatLE,
    '<F': Buffer.prototype.readFloatLE,
    '<d': Buffer.prototype.readDoubleLE,
    '<D': Buffer.prototype.readDoubleLE,
    '<s': Buffer.prototype.slice,
    '<S': Buffer.prototype.slice,
}

var typeSizeMap = {
    'c': 1,
    'b': 1,
    '?': 1,
    'h': 2,
    'i': 4,
    'l': 8,
    'f': 4,
    'd': 8,
    's': 1,
}


function format(fmt) {
    var re = /(>|<)?(\d*[cb\?hilqfds]|p)+?/ig;
    return fmt.match(re);
}

function calcSize(fmt) {
    var menmoryFmt = '>';
    var size = 0;
    var fmtArray = format(fmt);
    if (fmtArray.length >= 1) {
        while(fmtArray.length > 0) {
            var fmt = fmtArray.shift();
            var type;
            var length;
            if ('<>'.indexOf(fmt.slice(0, 1)) > -1) {
                menmoryFmt = fmt.slice(0, 1);
                type = fmt.slice(fmt.length-1, fmt.length);
                length = parseInt(fmt.slice(1, fmt.length-1));
            } else {
                type = fmt.slice(fmt.length-1, fmt.length);
                length = parseInt(fmt.slice(0, fmt.length-1));
            }
            if (isNaN(length)) {
                length = 1;
            }
            var typeSize = typeSizeMap[type.toLowerCase()];
            size += length * typeSize;
        }
    }
    return size;
}


function pack(fmt, ...args) {

    var menmoryFmt = '>';
    var position = 0;
    var packDataIndex = 0;
    var buffer = Buffer.alloc(calcSize(fmt));

    var fmtArray = format(fmt);
    if (fmtArray.length >= 1) {
        while(fmtArray.length > 0) {
            var fmt = fmtArray.shift();
            var type;
            var length;
            if ('<>'.indexOf(fmt.slice(0, 1)) > -1) {
                menmoryFmt = fmt.slice(0, 1);
                type = fmt.slice(fmt.length-1, fmt.length);
                length = parseInt(fmt.slice(1, fmt.length-1));
            } else {
                type = fmt.slice(fmt.length-1, fmt.length);
                length = parseInt(fmt.slice(0, fmt.length-1));
            }

            if (isNaN(length)) {
                length = 1;
            }
            var typeSize = typeSizeMap[type.toLowerCase()];
            var writeFn = writeFnMap[menmoryFmt + type];
            if (['s', 'S'].indexOf(type) > -1) {
                var val = args[packDataIndex];
                if(type == 's'){
                    if(typeof val == 'string') {
                        val = encoding.convert(val, 'gb2312', 'utf-8', false);
                    } else if(val instanceof Buffer || val instanceof Array) {
                        val = encoding.convert(val, 'gb2312', 'gb2312', false);
                    } else {
                        throw new Error('data type error');
                    }
                } else if (type == 'S') {
                    val = encoding.convert(val, 'utf-8', 'utf-8', false);
                }
                [...val.slice(0, length)].forEach((val, index) => {
                    writeFn.apply(buffer, [val, position + index]);
                });

                packDataIndex += 1;

            } else {
                [...new Array(length)].forEach((_, index) => {
                    var val = args[packDataIndex + index];
                    writeFn.apply(buffer, [val, position + typeSize * index]);
                });
                packDataIndex += length;
            }
            position += length * typeSize;
            
        }
    }
    return buffer;
}


function unpack(fmt, buffer) {
    var menmoryFmt = '>';
    var position = 0;
    var fmtArray = format(fmt);
    var result = [];
    if (fmtArray.length >= 1) {

        while(fmtArray.length > 0) {
            var fmt = fmtArray.shift();
            var type;
            var length;
            if ('<>'.indexOf(fmt.slice(0, 1)) > -1) {
                menmoryFmt = fmt.slice(0, 1);
                type = fmt.slice(fmt.length-1, fmt.length);
                length = parseInt(fmt.slice(1, fmt.length-1));
            } else {
                type = fmt.slice(fmt.length-1, fmt.length);
                length = parseInt(fmt.slice(0, fmt.length-1));
            }

            if (isNaN(length)) {
                length = 1;
            }
            var typeSize = typeSizeMap[type.toLowerCase()];
            var readFn = readFnMap[menmoryFmt + type];

            if (['s', 'S'].indexOf(type) > -1) {
                var val = readFn.apply(buffer, [position, position + length]);
                if(type == 's') {
                    result.push(encoding.convert(val, 'utf-8', 'gb2312', false).toString());
                } else if(type == 'S') {
                    result.push(encoding.convert(val, 'utf-8', 'utf-8', false).toString());
                }
            } else {
                result.push(readFn.apply(buffer, [position]));
            }
            position += length * typeSize;
        }
    }
    return result;
}


module.exports = {
    unpack,
    pack,
    calcSize
}
