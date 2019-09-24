// game: bac
// version: v189

function AGSecurity(data) {
    var stackHeader = new Uint8Array(new Uint32Array([1668509029, 0]).buffer);
    var stackBody = Buffer.from('AAAAAAAAAAAP57jKldKS6lWa2dpsg0hOBb/5CbeLpX2rF3WgeIpqLXEwUQxAFlbbUlC6tnattWdGBNHE9obmiR1Us6nNK0Ei7CiwWNV5cG/B/n7Jcy83ueQYT8c2OhkxWfi0BkOAd4U0iBvxA4I//PocjpAUAKdjodg9R5emEzz3S5/ocgHQYf+PmJu+y0qUlvJFINdg+1qEXSMmwwJ8CGniGvCvqJ3FEv0hZgdJTSkuX4GHCtwOLD5ome1/Km1b6SfdFVMeEfU4k8KMZOverFzT9G7W7jLOkeWeOaNC1OGuyBCNqjvvnMzjV2JEH2XgpN8zwLw1JLsLe8/zxkx6XqKxdLINayW90faR0tBw+Nr4vhT3DvdJyiU3N/BuLjkReUEYvrrvKDNXX2n6ft/uLujrRrSSCPheGLMm8TIW5KKpixvlzvT7Dev57RFtiIsoCjf3J2N+WxKaOIDPLvgmAGYw9y5s9zGnDt5bjmJSwvgyPDixHOeYmvpz9b/mLZ3X44lvGT2e5LxstEeYOupeUZbXjll1IG+RImRovT6CZLa5iJTRfLWgKuYmnuXAuPCVWoEud6E5F+4e704hYKobwYu1Gx78GEYAeAVI7Tyj5u/A8oGJb9DGKu7qvUP91eMPlNcnJKfIsik7fRAwV1WE94932aYAqiOR4WkOpBFlCxU/7NMIZ1DNuRRYiJ6wDNKCQmxJCjdLTtjWL03fagZ+F7jdFs62+Sva8PiaWbec6aH0h7/zLEd5Yhn+1HygqIv8lmjnky3RugMe9Lj394nKDvbbm9Jw9NrQNyU38C45u25fV2n63+4ufuHkhhgE9F6SQamx5fjxDc6LebQe7yQzGhO0Jvu26KIyBQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAIAAAAYAwAAAAQAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAACv////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJAC', 'base64');
    var pad = 8 - (stackHeader.length + stackBody.length) % 8;
    var pad2 = 8 - (stackHeader.length + stackBody.length + pad + data.length) % 8;
    // 加上8000 防止encrypt崩溃
    var stackBuffer = Buffer.concat([stackHeader, stackBody, new Uint8Array(pad), new Uint8Array(data), new Uint8Array(pad2 + 8 * 1024)]);
    var stackBufferTemp = new Uint8Array(stackBuffer).buffer;

    var Int8Array_stack = new Int8Array(stackBufferTemp);
    var Int16Array_stack = new Int16Array(stackBufferTemp);
    var Int32Array_stack = new Int32Array(stackBufferTemp);
    var Uint8Array_stack = new Uint8Array(stackBufferTemp);
    var Uint16Array_stack = new Uint16Array(stackBufferTemp);
    var Uint32Array_stack = new Uint32Array(stackBufferTemp);
    var Float32Array_stack = new Float32Array(stackBufferTemp);
    var Float64Array_stack = new Float64Array(stackBufferTemp);
    var STACKTOP = 0;
    var STACK_MAX = 2147483647;
    var abortStackOverflow = (T9Q) => new Error("Stack overflow! Attempted to allocate " + T9Q + " bytes");
    var bufferOffset = stackHeader.length + stackBody.length + pad;

    var dataLength = data.length;
    function bswap_i32(K4Q) {
        K4Q = K4Q | 0;
        return (K4Q & 255) << 24 | (K4Q >> 8 & 255) << 16 | (K4Q >> 16 & 255) << 8 | K4Q >>> 24 | 0;
    }

    function Process(userEncryptKey, userDecryptKey, broadcastDecryptKey) {
        var flags = 0;
        var bufferLength = dataLength;
        flags = flags | 0;
        bufferOffset = bufferOffset | 0;
        bufferLength = bufferLength | 0;
        userEncryptKey = userEncryptKey | 0;
        userDecryptKey = userDecryptKey | 0;
        broadcastDecryptKey = broadcastDecryptKey | 0;
        var var_1 = 0, var_2 = 0, var_3 = 0, var_4 = 0, var_5 = 0, var_6 = 0;
        var_6 = STACKTOP;
        STACKTOP = STACKTOP + 80 | 0;
        if ((STACKTOP | 0) >= (STACK_MAX | 0))
            abortStackOverflow(80);
        var_5 = var_6 + 68 | 0;
        var_4 = var_6 + 64 | 0;
        var_3 = var_6;
        if (bufferLength >>> 0 < 12) {
            var_5 = -1;
            STACKTOP = var_6;
            return var_5 | 0;
        }
        var_1 = Int32Array_stack[bufferOffset >> 2] | 0;
        flags = bswap_i32(var_1) | 0;
        console.log('------flags:' + flags);
        switch (flags | 0) {
            case 301825: {
                userDecryptKey = bufferOffset + 12 | 0;
                var_5 = Int8Array_stack[userDecryptKey >> 0] | 0;
                broadcastDecryptKey = bufferOffset + 13 | 0;
                broadcastDecryptKey = bswap_i32(Uint8Array_stack[broadcastDecryptKey >> 0] | Uint8Array_stack[broadcastDecryptKey + 1 >> 0] << 8 | Uint8Array_stack[broadcastDecryptKey + 2 >> 0] << 16 | Uint8Array_stack[broadcastDecryptKey + 3 >> 0] << 24) | 0;
                if (var_5 << 24 >> 24) {
                    Int32Array_stack[bufferOffset >> 2] = bswap_i32(broadcastDecryptKey) | 0;
                    var_5 = 3;
                    STACKTOP = var_6;
                    return var_5 | 0;
                }
                var_2 = bufferOffset + 8 | 0;
                flags = Int32Array_stack[var_2 >> 2] | 0;
                var_1 = bswap_i32(flags) | 0;
                switch (((var_1 >>> 0) % 3 | 0) & 3) {
                    case 1: {
                        flags = (((((Uint8Array_stack[16 + (Uint8Array_stack[bufferOffset + 9 >> 0] | 0) >> 0] | 0) + (Uint8Array_stack[16 + (flags & 255) >> 0] | 0) | 0) * 131 | 0) + (Uint8Array_stack[16 + (Uint8Array_stack[bufferOffset + 10 >> 0] | 0) >> 0] | 0) + (Uint8Array_stack[16 + (Uint8Array_stack[bufferOffset + 11 >> 0] | 0) >> 0] | 0) | 0) * 131 | 0) + 2 | 0;
                        break;
                    }
                    case 2: {
                        flags = (var_1 & 44879) + 2 + (((Uint8Array_stack[16 + (flags + (Uint8Array_stack[bufferOffset + 11 >> 0] | 0) & 255) >> 0] | 0) + (Uint8Array_stack[16 + ((Uint8Array_stack[bufferOffset + 10 >> 0] | 0) + (Uint8Array_stack[bufferOffset + 9 >> 0] | 0) & 255) >> 0] | 0) | 0) * 131 | 0) | 0;
                        break;
                    }
                    default: flags = (((Uint8Array_stack[16 + (Uint8Array_stack[bufferOffset + 9 >> 0] | 0) >> 0] | 0) + (Uint8Array_stack[16 + (flags & 255) >> 0] | 0) + (Uint8Array_stack[16 + (Uint8Array_stack[bufferOffset + 10 >> 0] | 0) >> 0] | 0) + (Uint8Array_stack[16 + (Uint8Array_stack[bufferOffset + 11 >> 0] | 0) >> 0] | 0) | 0) * 131 | 0) + 2 | 0;
                }
                Int32Array_stack[bufferOffset >> 2] = bswap_i32(301826) | 0;
                Int32Array_stack[bufferOffset + 4 >> 2] = bswap_i32(16) | 0;
                Int32Array_stack[var_2 >> 2] = bswap_i32(flags ^ broadcastDecryptKey & 1688052650 | -2147483648) | 0;
                Int32Array_stack[userDecryptKey >> 2] = bswap_i32(broadcastDecryptKey ^ userEncryptKey) | 0;
                Int32Array_stack[bufferOffset + 16 >> 2] = bswap_i32(broadcastDecryptKey) | 0;
                var_5 = 2;
                STACKTOP = var_6;
                return var_5 | 0;
            }
            case 301569: {
                Int32Array_stack[bufferOffset >> 2] = bswap_i32(bswap_i32(Int32Array_stack[bufferOffset + 12 >> 2] | 0) | 0) | 0;
                var_5 = 4;
                STACKTOP = var_6;
                return var_5 | 0;
            }
            case 301840:
            case 301584: {
                userEncryptKey = bswap_i32(Int32Array_stack[bufferOffset + 8 >> 2] | 0) | 0;
                switch (flags | 0) {
                    case 301584: {
                        flags = broadcastDecryptKey;
                        var_2 = 13;
                        break;
                    }
                    case 301840: {
                        flags = userDecryptKey;
                        var_2 = 13;
                        break;
                    }
                    default: {
                        flags = 0;
                        broadcastDecryptKey = 0;
                        userDecryptKey = 0;
                        var_1 = 0;
                    }
                }
                if ((var_2 | 0) == 13) {
                    var_1 = bswap_i32(flags) | 0;  // broadcastDecryptKey
                    Int32Array_stack[var_4 >> 2] = var_1;   // 64 
                    flags = var_1 & 255;
                    broadcastDecryptKey = var_1 >>> 8 & 255;  // 1
                    userDecryptKey = var_1 >>> 16 & 255;  // 2
                    var_1 = var_1 >>> 24 & 255; // 3
                }
                if (((userEncryptKey >>> 0) % 7 | 0) >>> 0 > 3) {
                    flags = flags ^ Int8Array_stack[272 + (userEncryptKey & 63) >> 0];
                    Int8Array_stack[var_4 >> 0] = flags;
                    broadcastDecryptKey = broadcastDecryptKey ^ Int8Array_stack[272 + (userEncryptKey + 1 & 63) >> 0];
                    Int8Array_stack[var_4 + 1 >> 0] = broadcastDecryptKey;
                    var_2 = userDecryptKey ^ Int8Array_stack[272 + (userEncryptKey + 2 & 63) >> 0];
                    Int8Array_stack[var_4 + 2 >> 0] = var_2;
                    var_1 = var_1 ^ Int8Array_stack[272 + (userEncryptKey + 3 & 63) >> 0];
                    Int8Array_stack[var_4 + 3 >> 0] = var_1;
                }
                else
                    var_2 = userDecryptKey; // 2
                do {
                    if ((userEncryptKey + -200 | 0) >>> 0 < 100) {
                        if (bufferLength >>> 0 > 12) {
                            flags = 12;
                            do {
                                userEncryptKey = flags + -12 | 0;
                                var_3 = bufferOffset + flags | 0;
                                Int8Array_stack[var_3 >> 0] = Int8Array_stack[336 + ((userEncryptKey >>> 0) % 67 | 0) >> 0] ^ (Int8Array_stack[var_3 >> 0] ^ Int8Array_stack[var_4 + (userEncryptKey & 3) >> 0]);
                                flags = flags + 1 | 0;
                            } while ((flags | 0) != (bufferLength | 0));
                        }
                        userEncryptKey = bufferOffset + 12 | 0;
                        var_2 = bufferLength + -12 | 0;
                        userDecryptKey = bswap_i32(1522487922) | 0;
                        Int32Array_stack[var_5 >> 2] = userDecryptKey;
                        broadcastDecryptKey = var_2 >>> 2;
                        if (!broadcastDecryptKey)
                            flags = 0;
                        else {
                            var_1 = 0;
                            flags = 0;
                            while (1) {
                                flags = userEncryptKey + flags | 0;
                                Int32Array_stack[flags >> 2] = Int32Array_stack[flags >> 2] ^ userDecryptKey;
                                flags = var_1 + 1 | 0;
                                if ((flags | 0) == (broadcastDecryptKey | 0))
                                    break;
                                else {
                                    var_1 = flags;
                                    flags = flags << 2;
                                }
                            }
                            flags = var_2 & -4;
                        }
                        if (flags >>> 0 < var_2 >>> 0)
                            do {
                                bufferLength = userEncryptKey + flags | 0;
                                Int8Array_stack[bufferLength >> 0] = Int8Array_stack[bufferLength >> 0] ^ Int8Array_stack[var_5 + (flags & 3) >> 0];
                                flags = flags + 1 | 0;
                            } while ((flags | 0) != (var_2 | 0));
                    }
                    else {
                        if ((userEncryptKey + -300 | 0) >>> 0 < 100) {
                            if (bufferLength >>> 0 > 12) {
                                flags = 12;
                                do {
                                    var_3 = bufferOffset + flags | 0;
                                    Int8Array_stack[var_3 >> 0] = Int8Array_stack[16 + ((Int8Array_stack[var_4 + (flags & 3) >> 0] ^ Int8Array_stack[var_3 >> 0]) & 255) >> 0] | 0;
                                    flags = flags + 1 | 0;
                                } while ((flags | 0) != (bufferLength | 0));
                            }
                            userEncryptKey = bufferOffset + 12 | 0;
                            var_2 = bufferLength + -12 | 0;
                            userDecryptKey = bswap_i32(1522487922) | 0;
                            Int32Array_stack[var_5 >> 2] = userDecryptKey;
                            broadcastDecryptKey = var_2 >>> 2;
                            if (!broadcastDecryptKey)
                                flags = 0;
                            else {
                                var_1 = 0;
                                flags = 0;
                                while (1) {
                                    flags = userEncryptKey + flags | 0;
                                    Int32Array_stack[flags >> 2] = Int32Array_stack[flags >> 2] ^ userDecryptKey;
                                    flags = var_1 + 1 | 0;
                                    if ((flags | 0) == (broadcastDecryptKey | 0))
                                        break;
                                    else {
                                        var_1 = flags;
                                        flags = flags << 2;
                                    }
                                }
                                flags = var_2 & -4;
                            }
                            if (flags >>> 0 < var_2 >>> 0)
                                do {
                                    bufferLength = userEncryptKey + flags | 0;
                                    Int8Array_stack[bufferLength >> 0] = Int8Array_stack[bufferLength >> 0] ^ Int8Array_stack[var_5 + (flags & 3) >> 0];
                                    flags = flags + 1 | 0;
                                } while ((flags | 0) != (var_2 | 0));
                            break;
                        }
                        if ((userEncryptKey + -400 | 0) >>> 0 < 100) {
                            var_1 = (userEncryptKey >>> 0) % 31 | 0;
                            if (bufferLength >>> 0 > 12) {
                                flags = 12;
                                do {
                                    userEncryptKey = flags + -12 | 0;
                                    var_3 = bufferOffset + flags | 0;
                                    Int8Array_stack[var_3 >> 0] = Int8Array_stack[336 + ((userEncryptKey >>> 0) % 67 | 0) >> 0] ^ (Int8Array_stack[var_3 >> 0] ^ Int8Array_stack[var_4 + (userEncryptKey + var_1 & 3) >> 0]);
                                    flags = flags + 1 | 0;
                                } while ((flags | 0) != (bufferLength | 0));
                            }
                            userEncryptKey = bufferOffset + 12 | 0;
                            var_2 = bufferLength + -12 | 0;
                            userDecryptKey = bswap_i32(1522487922) | 0;
                            Int32Array_stack[var_5 >> 2] = userDecryptKey;
                            broadcastDecryptKey = var_2 >>> 2;
                            if (!broadcastDecryptKey)
                                flags = 0;
                            else {
                                var_1 = 0;
                                flags = 0;
                                while (1) {
                                    flags = userEncryptKey + flags | 0;
                                    Int32Array_stack[flags >> 2] = Int32Array_stack[flags >> 2] ^ userDecryptKey;
                                    flags = var_1 + 1 | 0;
                                    if ((flags | 0) == (broadcastDecryptKey | 0))
                                        break;
                                    else {
                                        var_1 = flags;
                                        flags = flags << 2;
                                    }
                                }
                                flags = var_2 & -4;
                            }
                            if (flags >>> 0 < var_2 >>> 0)
                                do {
                                    bufferLength = userEncryptKey + flags | 0;
                                    Int8Array_stack[bufferLength >> 0] = Int8Array_stack[bufferLength >> 0] ^ Int8Array_stack[var_5 + (flags & 3) >> 0];
                                    flags = flags + 1 | 0;
                                } while ((flags | 0) != (var_2 | 0));
                            break;
                        }
                        if ((userEncryptKey + -800 | 0) >>> 0 < 78) {
                            var_1 = (userEncryptKey >>> 0) % 80 | 0;
                            if (bufferLength >>> 0 > 12) {
                                flags = 12;
                                do {
                                    var_2 = flags + -12 | 0;
                                    var_3 = bufferOffset + flags | 0;
                                    Int8Array_stack[var_3 >> 0] = Int8Array_stack[336 + ((((var_2 + userEncryptKey | 0) >>> 0) % 47 | 0) + var_1) >> 0] ^ (Int8Array_stack[var_3 >> 0] ^ Int8Array_stack[var_4 + (var_2 & 3) >> 0]);
                                    flags = flags + 1 | 0;
                                } while ((flags | 0) != (bufferLength | 0));
                            }
                            userEncryptKey = bufferOffset + 12 | 0;
                            var_2 = bufferLength + -12 | 0;
                            userDecryptKey = bswap_i32(1522487922) | 0;
                            Int32Array_stack[var_5 >> 2] = userDecryptKey;
                            broadcastDecryptKey = var_2 >>> 2;
                            if (!broadcastDecryptKey)
                                flags = 0;
                            else {
                                var_1 = 0;
                                flags = 0;
                                while (1) {
                                    flags = userEncryptKey + flags | 0;
                                    Int32Array_stack[flags >> 2] = Int32Array_stack[flags >> 2] ^ userDecryptKey;
                                    flags = var_1 + 1 | 0;
                                    if ((flags | 0) == (broadcastDecryptKey | 0))
                                        break;
                                    else {
                                        var_1 = flags;
                                        flags = flags << 2;
                                    }
                                }
                                flags = var_2 & -4;
                            }
                            if (flags >>> 0 < var_2 >>> 0)
                                do {
                                    bufferLength = userEncryptKey + flags | 0;
                                    Int8Array_stack[bufferLength >> 0] = Int8Array_stack[bufferLength >> 0] ^ Int8Array_stack[var_5 + (flags & 3) >> 0];
                                    flags = flags + 1 | 0;
                                } while ((flags | 0) != (var_2 | 0));
                            break;
                        }
                        if ((userEncryptKey + -900 | 0) >>> 0 < 54) {
                            if (bufferLength >>> 0 > 12) {
                                flags = ((((((flags * 131 & 255) + (var_2 & 255) & 255) * 13 | 0) + (broadcastDecryptKey & 255) & 255) * 23 | 0) + (var_1 & 255) & 255) * 41 & 255;
                                var_1 = 12;
                                do {
                                    var_3 = bufferOffset + var_1 | 0;
                                    var_2 = flags;
                                    flags = Int8Array_stack[var_3 >> 0] | 0;
                                    Int8Array_stack[var_3 >> 0] = flags ^ var_2 ^ Int8Array_stack[464 + (((userEncryptKey + (Uint8Array_stack[var_4 + (var_1 & 3) >> 0] | 0) | 0) >>> 0) % 113 | 0) >> 0];
                                    var_1 = var_1 + 1 | 0;
                                } while ((var_1 | 0) != (bufferLength | 0));
                            }
                            userEncryptKey = bufferOffset + 12 | 0;
                            var_2 = bufferLength + -12 | 0;
                            userDecryptKey = bswap_i32(1522487922) | 0;
                            Int32Array_stack[var_5 >> 2] = userDecryptKey;
                            broadcastDecryptKey = var_2 >>> 2;
                            if (!broadcastDecryptKey)
                                flags = 0;
                            else {
                                var_1 = 0;
                                flags = 0;
                                while (1) {
                                    flags = userEncryptKey + flags | 0;
                                    Int32Array_stack[flags >> 2] = Int32Array_stack[flags >> 2] ^ userDecryptKey;
                                    flags = var_1 + 1 | 0;
                                    if ((flags | 0) == (broadcastDecryptKey | 0))
                                        break;
                                    else {
                                        var_1 = flags;
                                        flags = flags << 2;
                                    }
                                }
                                flags = var_2 & -4;
                            }
                            if (flags >>> 0 < var_2 >>> 0)
                                do {
                                    bufferLength = userEncryptKey + flags | 0;
                                    Int8Array_stack[bufferLength >> 0] = Int8Array_stack[bufferLength >> 0] ^ Int8Array_stack[var_5 + (flags & 3) >> 0];
                                    flags = flags + 1 | 0;
                                } while ((flags | 0) != (var_2 | 0));
                            break;
                        }
                        if ((userEncryptKey + -954 | 0) >>> 0 < 56) {
                            flags = Int32Array_stack[var_4 >> 2] | 0;
                            Int32Array_stack[var_3 >> 2] = flags;
                            Int32Array_stack[var_3 + 4 >> 2] = flags;
                            Int32Array_stack[var_3 + 8 >> 2] = flags;
                            Int32Array_stack[var_3 + 12 >> 2] = flags;
                            Int32Array_stack[var_3 + 16 >> 2] = flags;
                            Int32Array_stack[var_3 + 20 >> 2] = flags;
                            Int32Array_stack[var_3 + 24 >> 2] = flags;
                            Int32Array_stack[var_3 + 28 >> 2] = flags;
                            Int32Array_stack[var_3 + 32 >> 2] = flags;
                            Int32Array_stack[var_3 + 36 >> 2] = flags;
                            Int32Array_stack[var_3 + 40 >> 2] = flags;
                            Int32Array_stack[var_3 + 44 >> 2] = flags;
                            Int32Array_stack[var_3 + 48 >> 2] = flags;
                            Int32Array_stack[var_3 + 52 >> 2] = flags;
                            Int32Array_stack[var_3 + 56 >> 2] = flags;
                            Int32Array_stack[var_3 + 60 >> 2] = flags;
                            Int32Array_stack[var_3 + 64 >> 2] = flags;
                            Int32Array_stack[var_3 + 68 >> 2] = flags;
                            Int32Array_stack[var_3 + 72 >> 2] = flags;
                            Int32Array_stack[var_3 + 76 >> 2] = flags;
                            Int32Array_stack[var_3 + 80 >> 2] = flags;
                            Int32Array_stack[var_3 + 84 >> 2] = flags;
                            Int32Array_stack[var_3 + 88 >> 2] = flags;
                            Int32Array_stack[var_3 + 92 >> 2] = flags;
                            Int32Array_stack[var_3 + 96 >> 2] = flags;
                            Int32Array_stack[var_3 + 100 >> 2] = flags;
                            Int32Array_stack[var_3 + 104 >> 2] = flags;
                            Int32Array_stack[var_3 + 108 >> 2] = flags;
                            Int32Array_stack[var_3 + 112 >> 2] = flags;
                            Int32Array_stack[var_3 + 116 >> 2] = flags;
                            Int32Array_stack[var_3 + 120 >> 2] = flags;
                            Int32Array_stack[var_3 + 124 >> 2] = flags;
                            Int32Array_stack[var_3 + 128 >> 2] = flags;
                            Int32Array_stack[var_3 + 132 >> 2] = flags;
                            Int32Array_stack[var_3 + 136 >> 2] = flags;
                            Int32Array_stack[var_3 + 140 >> 2] = flags;
                            Int32Array_stack[var_3 + 144 >> 2] = flags;
                            Int32Array_stack[var_3 + 148 >> 2] = flags;
                            Int32Array_stack[var_3 + 152 >> 2] = flags;
                            Int32Array_stack[var_3 + 156 >> 2] = flags;
                            Int32Array_stack[var_3 + 160 >> 2] = flags;
                            Int32Array_stack[var_3 + 164 >> 2] = flags;
                            Int32Array_stack[var_3 + 168 >> 2] = flags;
                            Int32Array_stack[var_3 + 172 >> 2] = flags;
                            Int32Array_stack[var_3 + 176 >> 2] = flags;
                            Int32Array_stack[var_3 + 180 >> 2] = flags;
                            Int32Array_stack[var_3 + 184 >> 2] = flags;
                            Int32Array_stack[var_3 + 188 >> 2] = flags;
                            Int32Array_stack[var_3 + 192 >> 2] = flags;
                            Int32Array_stack[var_3 + 196 >> 2] = flags;
                            Int32Array_stack[var_3 + 200 >> 2] = flags;
                            Int32Array_stack[var_3 + 204 >> 2] = flags;
                            Int32Array_stack[var_3 + 208 >> 2] = flags;
                            Int32Array_stack[var_3 + 212 >> 2] = flags;
                            Int32Array_stack[var_3 + 216 >> 2] = flags;
                            Int32Array_stack[var_3 + 220 >> 2] = flags;
                            Int32Array_stack[var_3 + 224 >> 2] = flags;
                            Int32Array_stack[var_3 + 228 >> 2] = flags;
                            Int32Array_stack[var_3 + 232 >> 2] = flags;
                            Int32Array_stack[var_3 + 236 >> 2] = flags;
                            Int32Array_stack[var_3 + 240 >> 2] = flags;
                            Int32Array_stack[var_3 + 244 >> 2] = flags;
                            Int32Array_stack[var_3 + 248 >> 2] = flags;
                            Int32Array_stack[var_3 + 252 >> 2] = flags;
                            flags = 0;
                            var_1 = userEncryptKey;
                            do {
                                broadcastDecryptKey = var_3 + flags | 0;
                                var_2 = Int8Array_stack[broadcastDecryptKey >> 0] | 0;
                                var_4 = var_3 + (var_1 & 63) | 0;
                                Int8Array_stack[broadcastDecryptKey >> 0] = Int8Array_stack[var_4 >> 0] | 0;
                                Int8Array_stack[var_4 >> 0] = var_2;
                                var_1 = ((var_1 & 16777215) * 131 | 0) + flags | 0;
                                flags = flags + 1 | 0;
                            } while ((flags | 0) != 64);
                            if (bufferLength >>> 0 > 12) {
                                var_1 = userEncryptKey + -12 | 0;
                                flags = 12;
                                do {
                                    var_4 = bufferOffset + flags | 0;
                                    Int8Array_stack[var_4 >> 0] = Int8Array_stack[var_4 >> 0] ^ Int8Array_stack[var_3 + (((var_1 + flags | 0) >>> 0) % 53 | 0) >> 0];
                                    flags = flags + 1 | 0;
                                } while ((flags | 0) != (bufferLength | 0));
                            }
                            userEncryptKey = bufferOffset + 12 | 0;
                            var_2 = bufferLength + -12 | 0;
                            userDecryptKey = bswap_i32(1522487922) | 0;
                            Int32Array_stack[var_5 >> 2] = userDecryptKey;
                            broadcastDecryptKey = var_2 >>> 2;
                            if (!broadcastDecryptKey)
                                flags = 0;
                            else {
                                var_1 = 0;
                                flags = 0;
                                while (1) {
                                    flags = userEncryptKey + flags | 0;
                                    Int32Array_stack[flags >> 2] = Int32Array_stack[flags >> 2] ^ userDecryptKey;
                                    flags = var_1 + 1 | 0;
                                    if ((flags | 0) == (broadcastDecryptKey | 0))
                                        break;
                                    else {
                                        var_1 = flags;
                                        flags = flags << 2;
                                    }
                                }
                                flags = var_2 & -4;
                            }
                            if (flags >>> 0 < var_2 >>> 0)
                                do {
                                    bufferLength = userEncryptKey + flags | 0;
                                    Int8Array_stack[bufferLength >> 0] = Int8Array_stack[bufferLength >> 0] ^ Int8Array_stack[var_5 + (flags & 3) >> 0];
                                    flags = flags + 1 | 0;
                                } while ((flags | 0) != (var_2 | 0));
                            break;
                        }
                        if ((userEncryptKey + -1010 | 0) >>> 0 < 45) {
                            if (bufferLength >>> 0 > 12) {
                                userDecryptKey = userEncryptKey + 231 | 0;
                                flags = ((broadcastDecryptKey & 255) * 124 | 0) + ((flags & 255) * 232 | 0) + ((var_2 & 255) * 79 | 0) + ((var_1 & 255) << 3) | 0;
                                var_1 = 12;
                                do {
                                    var_3 = bufferOffset + var_1 | 0;
                                    flags = flags & 255 ^ (Uint8Array_stack[464 + ((((userDecryptKey + (Uint8Array_stack[var_4 + (var_1 & 3) >> 0] | 0) | 0) >>> 0) % 69 | 0) + 13) >> 0] | 0) ^ (Uint8Array_stack[var_3 >> 0] | 0);
                                    Int8Array_stack[var_3 >> 0] = flags;
                                    var_1 = var_1 + 1 | 0;
                                } while ((var_1 | 0) != (bufferLength | 0));
                            }
                            userEncryptKey = bufferOffset + 12 | 0;
                            var_2 = bufferLength + -12 | 0;
                            userDecryptKey = bswap_i32(1522487922) | 0;
                            Int32Array_stack[var_5 >> 2] = userDecryptKey;
                            broadcastDecryptKey = var_2 >>> 2;
                            if (!broadcastDecryptKey)
                                flags = 0;
                            else {
                                var_1 = 0;
                                flags = 0;
                                while (1) {
                                    flags = userEncryptKey + flags | 0;
                                    Int32Array_stack[flags >> 2] = Int32Array_stack[flags >> 2] ^ userDecryptKey;
                                    flags = var_1 + 1 | 0;
                                    if ((flags | 0) == (broadcastDecryptKey | 0))
                                        break;
                                    else {
                                        var_1 = flags;
                                        flags = flags << 2;
                                    }
                                }
                                flags = var_2 & -4;
                            }
                            if (flags >>> 0 < var_2 >>> 0)
                                do {
                                    bufferLength = userEncryptKey + flags | 0;
                                    Int8Array_stack[bufferLength >> 0] = Int8Array_stack[bufferLength >> 0] ^ Int8Array_stack[var_5 + (flags & 3) >> 0];
                                    flags = flags + 1 | 0;
                                } while ((flags | 0) != (var_2 | 0));
                            break;
                        }
                        if ((userEncryptKey + -1104 | 0) >>> 0 < 48) {
                            if (bufferLength >>> 0 > 12) {
                                var_1 = 12;
                                do {
                                    userDecryptKey = bufferOffset + var_1 | 0;
                                    broadcastDecryptKey = Int8Array_stack[userDecryptKey >> 0] ^ Int8Array_stack[var_4 + (var_1 & 3) >> 0];
                                    Int8Array_stack[userDecryptKey >> 0] = broadcastDecryptKey;
                                    flags = var_1 + userEncryptKey | 0;
                                    if (!(var_1 & 1))
                                        flags = 336 + (((flags + 77 | 0) >>> 0) % 119 | 0) | 0;
                                    else
                                        flags = 464 + (flags + 11 & 127) | 0;
                                    Int8Array_stack[userDecryptKey >> 0] = Int8Array_stack[flags >> 0] ^ broadcastDecryptKey;
                                    var_1 = var_1 + 1 | 0;
                                } while ((var_1 | 0) != (bufferLength | 0));
                            }
                            userEncryptKey = bufferOffset + 12 | 0;
                            var_2 = bufferLength + -12 | 0;
                            userDecryptKey = bswap_i32(1522487922) | 0;
                            Int32Array_stack[var_5 >> 2] = userDecryptKey;
                            broadcastDecryptKey = var_2 >>> 2;
                            if (!broadcastDecryptKey)
                                flags = 0;
                            else {
                                var_1 = 0;
                                flags = 0;
                                while (1) {
                                    flags = userEncryptKey + flags | 0;
                                    Int32Array_stack[flags >> 2] = Int32Array_stack[flags >> 2] ^ userDecryptKey;
                                    flags = var_1 + 1 | 0;
                                    if ((flags | 0) == (broadcastDecryptKey | 0))
                                        break;
                                    else {
                                        var_1 = flags;
                                        flags = flags << 2;
                                    }
                                }
                                flags = var_2 & -4;
                            }
                            if (flags >>> 0 < var_2 >>> 0)
                                do {
                                    bufferLength = userEncryptKey + flags | 0;
                                    Int8Array_stack[bufferLength >> 0] = Int8Array_stack[bufferLength >> 0] ^ Int8Array_stack[var_5 + (flags & 3) >> 0];
                                    flags = flags + 1 | 0;
                                } while ((flags | 0) != (var_2 | 0));
                            break;
                        }
                        if ((userEncryptKey + -1055 | 0) >>> 0 < 76) {
                            if (bufferLength >>> 0 > 12) {
                                flags = 12;
                                do {
                                    var_2 = flags + -12 | 0;
                                    var_3 = bufferOffset + flags | 0;
                                    Int8Array_stack[var_3 >> 0] = Int8Array_stack[592 + ((var_2 >>> 3 & 7 | var_2 << 3) + userEncryptKey & 63) >> 0] ^ (Int8Array_stack[var_3 >> 0] ^ Int8Array_stack[var_4 + (var_2 & 3) >> 0]);
                                    flags = flags + 1 | 0;
                                } while ((flags | 0) != (bufferLength | 0));
                            }
                            userEncryptKey = bufferOffset + 12 | 0;
                            var_2 = bufferLength + -12 | 0;
                            userDecryptKey = bswap_i32(1522487922) | 0;
                            Int32Array_stack[var_5 >> 2] = userDecryptKey;
                            broadcastDecryptKey = var_2 >>> 2;
                            if (!broadcastDecryptKey)
                                flags = 0;
                            else {
                                var_1 = 0;
                                flags = 0;
                                while (1) {
                                    flags = userEncryptKey + flags | 0;
                                    Int32Array_stack[flags >> 2] = Int32Array_stack[flags >> 2] ^ userDecryptKey;
                                    flags = var_1 + 1 | 0;
                                    if ((flags | 0) == (broadcastDecryptKey | 0))
                                        break;
                                    else {
                                        var_1 = flags;
                                        flags = flags << 2;
                                    }
                                }
                                flags = var_2 & -4;
                            }
                            if (flags >>> 0 < var_2 >>> 0)
                                do {
                                    bufferLength = userEncryptKey + flags | 0;
                                    Int8Array_stack[bufferLength >> 0] = Int8Array_stack[bufferLength >> 0] ^ Int8Array_stack[var_5 + (flags & 3) >> 0];
                                    flags = flags + 1 | 0;
                                } while ((flags | 0) != (var_2 | 0));
                            break;
                        }
                        var_1 = bufferLength >>> 2;
                        if (bufferLength >>> 0 > 15) {
                            userDecryptKey = Int32Array_stack[var_4 >> 2] | 0;
                            flags = 3;
                            do {
                                var_3 = bufferOffset + (flags << 2) | 0;
                                Int32Array_stack[var_3 >> 2] = Int32Array_stack[var_3 >> 2] ^ userDecryptKey;
                                flags = flags + 1 | 0;
                            } while (flags >>> 0 < var_1 >>> 0);
                            flags = flags << 2;
                        }
                        else
                            flags = 12;
                        if (flags >>> 0 < bufferLength >>> 0)
                            do {
                                var_3 = bufferOffset + flags | 0;
                                Int8Array_stack[var_3 >> 0] = Int8Array_stack[var_3 >> 0] ^ Int8Array_stack[var_4 + (flags & 3) >> 0];
                                flags = flags + 1 | 0;
                            } while ((flags | 0) != (bufferLength | 0));
                        userEncryptKey = bufferOffset + 12 | 0;
                        var_2 = bufferLength + -12 | 0;
                        userDecryptKey = bswap_i32(1522487922) | 0;
                        Int32Array_stack[var_5 >> 2] = userDecryptKey;
                        broadcastDecryptKey = var_2 >>> 2;
                        if (!broadcastDecryptKey)
                            flags = 0;
                        else {
                            var_1 = 0;
                            flags = 0;
                            while (1) {
                                flags = userEncryptKey + flags | 0;
                                Int32Array_stack[flags >> 2] = Int32Array_stack[flags >> 2] ^ userDecryptKey;
                                flags = var_1 + 1 | 0;
                                if ((flags | 0) == (broadcastDecryptKey | 0))
                                    break;
                                else {
                                    var_1 = flags;
                                    flags = flags << 2;
                                }
                            }
                            flags = var_2 & -4;
                        }
                        if (flags >>> 0 < var_2 >>> 0)
                            do {
                                bufferLength = userEncryptKey + flags | 0;
                                Int8Array_stack[bufferLength >> 0] = Int8Array_stack[bufferLength >> 0] ^ Int8Array_stack[var_5 + (flags & 3) >> 0];
                                flags = flags + 1 | 0;
                            } while ((flags | 0) != (var_2 | 0));
                    }
                } while (0);
                var_5 = 1;
                STACKTOP = var_6;
                return var_5 | 0;
            }
            default: {
                userDecryptKey = bswap_i32(1522487922) | 0;
                Int32Array_stack[var_5 >> 2] = userDecryptKey;
                broadcastDecryptKey = bufferLength >>> 2;
                if (!broadcastDecryptKey)
                    flags = 0;
                else {
                    Int32Array_stack[bufferOffset >> 2] = var_1 ^ userDecryptKey;
                    if ((broadcastDecryptKey | 0) != 1) {
                        var_1 = 4;
                        flags = 1;
                        while (1) {
                            Int32Array_stack[bufferOffset + var_1 >> 2] = Int32Array_stack[bufferOffset + var_1 >> 2] ^ userDecryptKey;
                            flags = flags + 1 | 0;
                            if ((flags | 0) == (broadcastDecryptKey | 0))
                                break;
                            else
                                var_1 = flags << 2;
                        }
                    }
                    flags = bufferLength & -4;
                }
                if (flags >>> 0 < bufferLength >>> 0)
                    do {
                        var_4 = bufferOffset + flags | 0;
                        Int8Array_stack[var_4 >> 0] = Int8Array_stack[var_4 >> 0] ^ Int8Array_stack[var_5 + (flags & 3) >> 0];
                        flags = flags + 1 | 0;
                    } while ((flags | 0) != (bufferLength | 0));
                var_5 = 0;
                STACKTOP = var_6;
                return var_5 | 0;
            }
        }
        return 0;
    }

    function Encrypt(userEncryptKey, userDecryptKey, broadcastDecryptKey) {
        var flags = 0;
        var bufferLength = dataLength;
        flags = flags | 0;
        bufferOffset = bufferOffset | 0;
        bufferLength = bufferLength | 0;
        var bufferLength_12 = bufferLength + 12;
        bufferLength_12 = bufferLength_12 | 0;
        userEncryptKey = userEncryptKey | 0;
        userDecryptKey = userDecryptKey | 0;
        broadcastDecryptKey = broadcastDecryptKey | 0;
        var var_1 = 0, var_2 = 0, var_3 = 0;
        var_3 = STACKTOP;
        STACKTOP = STACKTOP + 16 | 0;
        if ((STACKTOP | 0) >= (STACK_MAX | 0))
            abortStackOverflow(16);
        var_1 = var_3;
        var_2 = bufferLength + 12 | 0;
        if (var_2 >>> 0 > bufferLength_12 >>> 0) {
            bufferLength = -1;
            STACKTOP = var_3;
            return bufferLength | 0;
        }

        broadcastDecryptKey = bswap_i32(userEncryptKey) | 0;
        Int32Array_stack[var_1 >> 2] = broadcastDecryptKey;
        // memmove(bufferOffset + 12 | 0, bufferOffset | 0, bufferLength | 0) | 0;
        Uint8Array_stack.set(Uint8Array_stack.slice(bufferOffset, bufferOffset + bufferLength), bufferOffset + 12);

        Int8Array_stack = new Int8Array(Uint8Array_stack.buffer);
        Int16Array_stack = new Int16Array(Uint8Array_stack.buffer);
        Int32Array_stack = new Int32Array(Uint8Array_stack.buffer);
        Uint8Array_stack = new Uint8Array(Uint8Array_stack.buffer);
        Uint16Array_stack = new Uint16Array(Uint8Array_stack.buffer);
        Uint32Array_stack = new Uint32Array(Uint8Array_stack.buffer);
        Float32Array_stack = new Float32Array(Uint8Array_stack.buffer);
        Float64Array_stack = new Float64Array(Uint8Array_stack.buffer);
        

        Int32Array_stack[bufferOffset >> 2] = bswap_i32(301840) | 0;
        Int32Array_stack[bufferOffset + 4 >> 2] = bswap_i32(var_2) | 0;
        Int32Array_stack[bufferOffset + 8 >> 2] = bswap_i32(2) | 0;
        bufferLength_12 = bufferLength >>> 2;
        if (!bufferLength_12)
            flags = 0;
        else {
            userDecryptKey = 0;
            flags = 0;
            while (1) {
                flags = bufferOffset + (flags + 12) | 0;
                Int32Array_stack[flags >> 2] = Int32Array_stack[flags >> 2] ^ broadcastDecryptKey;
                flags = userDecryptKey + 1 | 0;
                if ((flags | 0) == (bufferLength_12 | 0))
                    break;
                else {
                    userDecryptKey = flags;
                    flags = flags << 2;
                }
            }
            flags = bufferLength & -4;
        }
        if (flags >>> 0 < bufferLength >>> 0)
            do {
                userEncryptKey = bufferOffset + (flags + 12) | 0;
                Int8Array_stack[userEncryptKey >> 0] = Int8Array_stack[userEncryptKey >> 0] ^ Int8Array_stack[var_1 + (flags & 3) >> 0];
                flags = flags + 1 | 0;
            } while ((flags | 0) != (bufferLength | 0));
        bufferLength = var_2;
        STACKTOP = var_3;
        return bufferLength | 0;
    }

    this.Encrypt = function(userEncryptKey=0, userDecryptKey=0, broadcastDecryptKey=0) {
        try {
            var len = Encrypt(userEncryptKey, userDecryptKey, broadcastDecryptKey);
            var result = Uint8Array_stack.slice(bufferOffset, bufferOffset + len);
            return result;
        } catch(err) {
            return null;
        }
    }

    this.Process = function(userEncryptKey=0, userDecryptKey=0, broadcastDecryptKey=0) {
        try {
            var type = Process(userEncryptKey, userDecryptKey, broadcastDecryptKey);
            switch(type) {
                case 0:
                case 1:
                    var result = Uint8Array_stack.slice(bufferOffset, bufferOffset + data.length).slice(12 * type);
                    var jsDecryptKey = [90, 191, 82, 114];
                    var decryptResult = [];
                    for(var i=0; i<result.length; i++) {
                        decryptResult.push(result[i] ^ jsDecryptKey[i % 4]);
                    }
                    return {
                        type,
                        data: Buffer.from(new Uint8Array(decryptResult).buffer).toString('base64')
                    };
                case 2:
                    var m = Uint8Array_stack.slice(bufferOffset, bufferOffset + 20);
                    return {
                        type,
                        userEncryptKey: bswap_i32(new Int32Array(new Uint8Array(m.slice(16, 20)).buffer)[0]),
                        data: Buffer.from(new Uint8Array(m.slice(0, 16)).buffer).toString('base64')
                    };
                case 3:
                    return {
                        type,
                        userDecryptKey: bswap_i32(new Int32Array(new Uint8Array(Uint8Array_stack.slice(bufferOffset, bufferOffset + 4)).buffer)[0])
                    }
                case 4:
                    // pass
                    return {
                        type,
                        broadcastDecryptKey: bswap_i32(new Int32Array(new Uint8Array(Uint8Array_stack.slice(bufferOffset, bufferOffset + 4)).buffer)[0])
                    }
                default:
                    return {
                        type: -1
                    }
            }
        } catch(err) {
            return {
                type: -1
            }
        }
        
    };
    return this;
}

function encrypt(data,  userEncryptKey, userDecryptKey, broadcastDecryptKey) {
    return new AGSecurity(data).Encrypt(userEncryptKey, userDecryptKey, broadcastDecryptKey);
}

function decrypt(data, userEncryptKey, userDecryptKey, broadcastDecryptKey) {
    return new AGSecurity(data).Process(userEncryptKey, userDecryptKey, broadcastDecryptKey);
}


module.exports = {
    encrypt,
    decrypt
}


