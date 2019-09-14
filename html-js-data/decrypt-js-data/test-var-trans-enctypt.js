var h1h;
(function() {
    function k3h(C4D) {
        return (k3h = "function" == typeof Symbol && "symbol" == typeof Symbol["iterator"] ? function (v4D) {
            return typeof v4D;
        } : function (W8D) {
            return W8D && "function" == typeof Symbol && W8D["constructor"] === Symbol && W8D !== Symbol["prototype"] ? "symbol" : typeof W8D;
        })(C4D);
    }

h1h = function (t8D) {
    t8D = void 0 !== (t8D = t8D || {}) ? t8D : {};
    var F8D, W0D = {};
    for (F8D in t8D)
        t8D.hasOwnProperty(F8D) && (W0D[F8D] = t8D[F8D]);
    t8D.arguments = [], t8D.thisProgram = "./this.program", t8D.quit = function (M6D, O6D) {
        throw O6D;
    }, t8D.preRun = [], t8D.postRun = [];
    var g0D, l0D, G0D, C8D = !1;
    if (g0D = "object" === ("undefined" == typeof window ? "undefined" : k3h(window)), l0D = "function" == typeof importScripts, C8D = "object" === ("undefined" == typeof process ? "undefined" : k3h(process)) && "function" == typeof require && !g0D && !l0D, G0D = !g0D && !C8D && !l0D, t8D.ENVIRONMENT)
        throw new Error("Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -s ENVIRONMENT=web or -s ENVIRONMENT=node)");
    j8D(void 0 === t8D.memoryInitializerPrefixURL, "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead"), j8D(void 0 === t8D.pthreadMainPrefixURL, "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead"), j8D(void 0 === t8D.cdInitializerPrefixURL, "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead"), j8D(void 0 === t8D.filePackagePrefixURL, "Module.filePackagePrefixURL option was removed, use Module.locateFile instead");
    var p0D, t0D, T8D = "";
    if (C8D)
        T8D = __dirname + "/", t8D.read = function (J6D, n6D) {
            var y6D;
            return (y6D = f8D(J6D)) || (p0D || (p0D = require("fs")), t0D || (t0D = require("path")), J6D = t0D.normalize(J6D), y6D = p0D.readFileSync(J6D)), n6D ? y6D : y6D.toString();
        }, t8D.readBinary = function (X6D) {
            var A6D = t8D.read(X6D, !0);
            return A6D.buffer || (A6D = new Uint8Array(A6D)), j8D(A6D.buffer), A6D;
        }, process.argv.length > 1 && (t8D.thisProgram = process.argv[1].replace(/\\/g, "/")), t8D.arguments = process.argv.slice(2), process.on("uncaughtException", function (G6D) {
            if (!(G6D instanceof R0D))
                throw G6D;
        }), process.on("unhandledRejection", N8D), t8D.quit = function (I6D) {
            process.exit(I6D);
        }, t8D.inspect = function () {
            return "[Emscripten Module object]";
        };
    else if (G0D)
        "undefined" != typeof read && (t8D.read = function (p6D) {
            var Z6D = f8D(p6D);
            return Z6D ? h0D(Z6D) : read(p6D);
        }), t8D.readBinary = function (x6D) {
            var P6D;
            return (P6D = f8D(x6D)) ? P6D : "function" == typeof readbuffer ? new Uint8Array(readbuffer(x6D)) : (j8D("object" === k3h(P6D = read(x6D, "binary"))), P6D);
        }, "undefined" != typeof scriptArgs ? t8D.arguments = scriptArgs : void 0 !== arguments && (t8D.arguments = arguments), "function" == typeof quit && (t8D.quit = function (t6D) {
            quit(t6D);
        });
    else {
        if (!g0D && !l0D)
            throw new Error("environment detection error");
        l0D ? T8D = self.location.href : document.currentScript && (T8D = document.currentScript.src), T8D = 0 !== T8D.indexOf("blob:") ? T8D.substr(0, T8D.lastIndexOf("/") + 1) : "", t8D.read = function (Y6D) {
            try {
                var N6D = new XMLHttpRequest();
                return N6D.open("GET", Y6D, !1), N6D.send(null), N6D.responseText;
            }
            catch (d6D) {
                var j6D = f8D(Y6D);
                if (j6D)
                    return h0D(j6D);
                throw d6D;
            }
        }, l0D && (t8D.readBinary = function (s6D) {
            try {
                var i6D = new XMLHttpRequest();
                return i6D.open("GET", s6D, !1), i6D.responseType = "arraybuffer", i6D.send(null), new Uint8Array(i6D.response);
            }
            catch (S6D) {
                var h6D = f8D(s6D);
                if (h6D)
                    return h6D;
                throw S6D;
            }
        }), t8D.readAsync = function (c6D, V6D, k6D) {
            var U6D = new XMLHttpRequest();
            U6D.open("GET", c6D, !0), U6D.responseType = "arraybuffer", U6D.onload = function () {
                if (200 == U6D.status || 0 == U6D.status && U6D.response)
                    V6D(U6D.response);
                else {
                    var T6D = f8D(c6D);
                    T6D ? V6D(T6D.buffer) : k6D();
                }
            }, U6D.onerror = k6D, U6D.send(null);
        }, t8D.setWindowTitle = function (e6D) {
            document.title = e6D;
        };
    }
    var D0D = t8D.print || ("undefined" != typeof console ? console.log.bind(console) : "undefined" != typeof print ? print : null), s8D = t8D.printErr || ("undefined" != typeof printErr ? printErr : "undefined" != typeof console && console.warn.bind(console) || D0D);
    for (F8D in W0D)
        W0D.hasOwnProperty(F8D) && (t8D[F8D] = W0D[F8D]);
    W0D = void 0;
    var U0D = 16;
    function Q6D(a6D, b6D) {
        return b6D || (b6D = U0D), a6D = Math.ceil(a6D / b6D) * b6D;
    }
    L8D = v8D = K0D = function () {
        N8D("cannot use the stack before compiled code is ready to run, and has provided stack access");
    };
    var u0D = !1;
    function j8D(f6D, r6D) {
        f6D || N8D("Assertion failed: " + r6D);
    }
    var y0D = { stackSave: function () {
        L8D();
    }, stackRestore: function () {
        v8D();
    }, arrayToC: function (F6D) {
        var L6D, E6D, B6D = K0D(F6D.length);
        return E6D = B6D, j8D((L6D = F6D).length >= 0, "writeArrayToMemory array must have a length (should be an array or typed array)"), q6D.set(L6D, E6D), B6D;
    }, stringToC: function (C6D) {
        var v6D = 0;
        if (null != C6D && 0 !== C6D) {
            var W5D = 1 + (C6D.length << 2);
            (function (Q5D, z5D, l5D) {
                j8D("number" == typeof l5D, "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!"), function (m5D, w5D, R5D, H5D) {
                    if (!(H5D > 0))
                        return 0;
                    for (var o5D = R5D, D5D = R5D + H5D - 1, K5D = 0; K5D < m5D.length; ++K5D) {
                        var g5D = m5D.charCodeAt(K5D);
                        if (g5D >= 55296 && g5D <= 57343) {
                            var q5D = m5D.charCodeAt(++K5D);
                            g5D = 65536 + ((1023 & g5D) << 10) | 1023 & q5D;
                        }
                        if (g5D <= 127) {
                            if (R5D >= D5D)
                                break;
                            w5D[R5D++] = g5D;
                        }
                        else if (g5D <= 2047) {
                            if (R5D + 1 >= D5D)
                                break;
                            w5D[R5D++] = 192 | g5D >> 6, w5D[R5D++] = 128 | 63 & g5D;
                        }
                        else if (g5D <= 65535) {
                            if (R5D + 2 >= D5D)
                                break;
                            w5D[R5D++] = 224 | g5D >> 12, w5D[R5D++] = 128 | g5D >> 6 & 63, w5D[R5D++] = 128 | 63 & g5D;
                        }
                        else if (g5D <= 2097151) {
                            if (R5D + 3 >= D5D)
                                break;
                            w5D[R5D++] = 240 | g5D >> 18, w5D[R5D++] = 128 | g5D >> 12 & 63, w5D[R5D++] = 128 | g5D >> 6 & 63, w5D[R5D++] = 128 | 63 & g5D;
                        }
                        else if (g5D <= 67108863) {
                            if (R5D + 4 >= D5D)
                                break;
                            w5D[R5D++] = 248 | g5D >> 24, w5D[R5D++] = 128 | g5D >> 18 & 63, w5D[R5D++] = 128 | g5D >> 12 & 63, w5D[R5D++] = 128 | g5D >> 6 & 63, w5D[R5D++] = 128 | 63 & g5D;
                        }
                        else {
                            if (R5D + 5 >= D5D)
                                break;
                            w5D[R5D++] = 252 | g5D >> 30, w5D[R5D++] = 128 | g5D >> 24 & 63, w5D[R5D++] = 128 | g5D >> 18 & 63, w5D[R5D++] = 128 | g5D >> 12 & 63, w5D[R5D++] = 128 | g5D >> 6 & 63, w5D[R5D++] = 128 | 63 & g5D;
                        }
                    }
                    w5D[R5D] = 0;
                }(Q5D, U8D, z5D, l5D);
            }(C6D, v6D = K0D(W5D), W5D));
        }
        return v6D;
    } }, z6D = { string: y0D.stringToC, array: y0D.arrayToC };
    function l6D(O5D, u5D) {
        if (0 === u5D || !O5D)
            return "";
        for (var A5D, y5D = 0, M5D = 0; j8D(O5D + M5D < c8D), y5D |= A5D = U8D[O5D + M5D >> 0], (0 != A5D || u5D) && (M5D++, !u5D || M5D != u5D);)
            ;
        u5D || (u5D = M5D);
        var J5D = "";
        if (y5D < 128) {
            for (var n5D; u5D > 0;)
                n5D = String.fromCharCode.apply(String, U8D.subarray(O5D, O5D + Math.min(u5D, 1024))), J5D = J5D ? J5D + n5D : n5D, O5D += 1024, u5D -= 1024;
            return J5D;
        }
        return function (X5D) {
            return H6D(U8D, X5D);
        }(O5D);
    }
    var J0D = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0;
    function H6D(Z5D, I5D) {
        for (var x5D = I5D; Z5D[x5D];)
            ++x5D;
        if (x5D - I5D > 16 && Z5D.subarray && J0D)
            return J0D.decode(Z5D.subarray(I5D, x5D));
        for (var G5D, p5D, t5D, N5D, j5D, P5D = "";;) {
            if (!(G5D = Z5D[I5D++]))
                return P5D;
            if (128 & G5D)
                if (p5D = 63 & Z5D[I5D++], 192 != (224 & G5D))
                    if (t5D = 63 & Z5D[I5D++], 224 == (240 & G5D) ? G5D = (15 & G5D) << 12 | p5D << 6 | t5D : (N5D = 63 & Z5D[I5D++], 240 == (248 & G5D) ? G5D = (7 & G5D) << 18 | p5D << 12 | t5D << 6 | N5D : (j5D = 63 & Z5D[I5D++], G5D = 248 == (252 & G5D) ? (3 & G5D) << 24 | p5D << 18 | t5D << 12 | N5D << 6 | j5D : (1 & G5D) << 30 | p5D << 24 | t5D << 18 | N5D << 12 | j5D << 6 | 63 & Z5D[I5D++])), G5D < 65536)
                        P5D += String.fromCharCode(G5D);
                    else {
                        var Y5D = G5D - 65536;
                        P5D += String.fromCharCode(55296 | Y5D >> 10, 56320 | 1023 & Y5D);
                    }
                else
                    P5D += String.fromCharCode((31 & G5D) << 6 | p5D);
            else
                P5D += String.fromCharCode(G5D);
        }
    }
    var S8D, q6D, U8D, m6D, e8D, E8D, B8D, i0D, S0D, g6D, k8D, n0D, j0D;
    "undefined" != typeof TextDecoder && new TextDecoder("utf-16le");
    function u6D(d5D) {
        return function i5D(h5D) {
            i5D.shown || (i5D.shown = {}), i5D.shown[h5D] || (i5D.shown[h5D] = 1, s8D(h5D));
        }("warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling"), d5D;
    }
    function o6D() {
        var s5D = function () {
            var S5D = new Error();
            if (!S5D.stack) {
                try {
                    throw new Error(0);
                }
                catch (U5D) {
                    S5D = U5D;
                }
                if (!S5D.stack)
                    return "(no stack trace available)";
            }
            return S5D.stack.toString();
        }();
        return t8D.extraStackTrace && (s5D += "\n" + t8D.extraStackTrace()), s5D.replace(/__Z[\w\d_]+/g, function (c5D) {
            var V5D = u6D(c5D);
            return c5D === V5D ? c5D : V5D + " [" + c5D + "]";
        });
    }
    function m0D() {
        if (34821223 == E8D[(k8D >> 2) - 1] && 2310721022 == E8D[(k8D >> 2) - 2] || N8D("Stack overflow! Stack cookie has been overwritten, expected hex dwords 0x89BACDFE and 0x02135467, but received 0x" + E8D[(k8D >> 2) - 2].toString(16) + " " + E8D[(k8D >> 2) - 1].toString(16)), 1668509029 !== e8D[0])
            throw "Runtime error: The application has corrupted its heap memory area (address zero)!";
    }
    function R6D() {
        N8D("Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value " + c8D + ", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime but prevents some optimizations, (3) set Module.TOTAL_MEMORY to a higher value before the program runs, or (4) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ");
    }
    B8D = k8D = 0, i0D = !1;
    var H0D = t8D.TOTAL_STACK || 5242880, c8D = t8D.TOTAL_MEMORY || 16777216;
    if (c8D < H0D && s8D("TOTAL_MEMORY should be larger than TOTAL_STACK, was " + c8D + "! (TOTAL_STACK=" + H0D + ")"), j8D("undefined" != typeof Int32Array && "undefined" != typeof Float64Array && void 0 !== Int32Array.prototype.subarray && void 0 !== Int32Array.prototype.set, "JS engine does not provide full typed array support"), t8D.buffer ? j8D((S8D = t8D.buffer).byteLength === c8D, "provided buffer should be " + c8D + " bytes, but it is " + S8D.byteLength) : (j8D((S8D = new ArrayBuffer(c8D)).byteLength === c8D), t8D.buffer = S8D), t8D.HEAP8 = q6D = new Int8Array(S8D), t8D.HEAP16 = m6D = new Int16Array(S8D), t8D.HEAP32 = e8D = new Int32Array(S8D), t8D.HEAPU8 = U8D = new Uint8Array(S8D), t8D.HEAPU16 = new Uint16Array(S8D), t8D.HEAPU32 = E8D = new Uint32Array(S8D), t8D.HEAPF32 = new Float32Array(S8D), t8D.HEAPF64 = new Float64Array(S8D), e8D[0] = 1668509029, m6D[1] = 25459, 115 !== U8D[2] || 99 !== U8D[3])
        throw "Runtime error: expected the system to be little-endian!";
    function q0D(e5D) {
        for (; e5D.length > 0;) {
            var k5D = e5D.shift();
            if ("function" != typeof k5D) {
                var T5D = k5D.func;
                "number" == typeof T5D ? void 0 === k5D.arg ? t8D.dynCall_v(T5D) : t8D.dynCall_vi(T5D, k5D.arg) : T5D(void 0 === k5D.arg ? null : k5D.arg);
            }
            else
                k5D();
        }
    }
    var Z0D = [], I0D = [], D6D = [], A0D = [], h8D = !1;
    Math.imul && -5 === Math.imul(4294967295, 5) || (Math.imul = function (f5D, r5D) {
        var b5D = 65535 & f5D, a5D = 65535 & r5D;
        return b5D * a5D + ((f5D >>> 16) * a5D + b5D * (r5D >>> 16) << 16) | 0;
    }), Math.imul = Math.imul, Math.clz32 || (Math.clz32 = function (B5D) {
        var L5D = 32, F5D = B5D >> 16;
        return F5D && (L5D -= 16, B5D = F5D), (F5D = B5D >> 8) && (L5D -= 8, B5D = F5D), (F5D = B5D >> 4) && (L5D -= 4, B5D = F5D), (F5D = B5D >> 2) && (L5D -= 2, B5D = F5D), (F5D = B5D >> 1) ? L5D - 2 : L5D - B5D;
    }), Math.clz32 = Math.clz32, Math.trunc || (Math.trunc = function (E5D) {
        return E5D < 0 ? Math.ceil(E5D) : Math.floor(E5D);
    }), Math.trunc = Math.trunc;
    var a8D = 0, b8D = null, Q0D = null, z0D = {};
    t8D.preloadedImages = {}, t8D.preloadedAudios = {};
    var V8D = null, d8D = { error: function () {
        N8D("Filesystem support (FS) was not included. The problem is that you are using files from JS, but files were not used from C/C++, so filesystem support was not auto-included. You can force-include filesystem support with  -s FORCE_FILESYSTEM=1");
    }, init: function () {
        d8D.error();
    }, createDataFile: function () {
        d8D.error();
    }, createPreloadedFile: function () {
        d8D.error();
    }, createLazyFile: function () {
        d8D.error();
    }, open: function () {
        d8D.error();
    }, mkdev: function () {
        d8D.error();
    }, registerDevice: function () {
        d8D.error();
    }, analyzePath: function () {
        d8D.error();
    }, loadFilesFromDB: function () {
        d8D.error();
    }, ErrnoError: function () {
        d8D.error();
    } };
    t8D.FS_createDataFile = d8D.createDataFile, t8D.FS_createPreloadedFile = d8D.createPreloadedFile;
    var O0D = "data:application/octet-stream;base64,";
    function K6D(C5D) {
        return String.prototype.startsWith ? C5D.startsWith(O0D) : 0 === C5D.indexOf(O0D);
    }
    B8D = 2344, I0D.push(), V8D = "data:application/octet-stream;base64,AAAAAAAAAAAP57jKldKS6lWa2dpsg0hOBb/5CbeLpX2rF3WgeIpqLXEwUQxAFlbbUlC6tnattWdGBNHE9obmiR1Us6nNK0Ei7CiwWNV5cG/B/n7Jcy83ueQYT8c2OhkxWfi0BkOAd4U0iBvxA4I//PocjpAUAKdjodg9R5emEzz3S5/ocgHQYf+PmJu+y0qUlvJFINdg+1qEXSMmwwJ8CGniGvCvqJ3FEv0hZgdJTSkuX4GHCtwOLD5ome1/Km1b6SfdFVMeEfU4k8KMZOverFzT9G7W7jLOkeWeOaNC1OGuyBCNqjvvnMzjV2JEH2XgpN8zwLw1JLsLe8/zxkx6XqKxdLINayW90faR0tBw+Nr4vhT3DvdJyiU3N/BuLjkReUEYvrrvKDNXX2n6ft/uLujrRrSSCPheGLMm8TIW5KKpixvlzvT7Dev57RFtiIsoCjf3J2N+WxKaOIDPLvgmAGYw9y5s9zGnDt5bjmJSwvgyPDixHOeYmvpz9b/mLZ3X44lvGT2e5LxstEeYOupeUZbXjll1IG+RImRovT6CZLa5iJTRfLWgKuYmnuXAuPCVWoEud6E5F+4e704hYKobwYu1Gx78GEYAeAVI7Tyj5u/A8oGJb9DGKu7qvUP91eMPlNcnJKfIsik7fRAwV1WE94932aYAqiOR4WkOpBFlCxU/7NMIZ1DNuRRYiJ6wDNKCQmxJCjdLTtjWL03fagZ+F7jdFs62+Sva8PiaWbec6aH0h7/zLEd5Yhn+1HygqIv8lmjnky3RugMe9Lj394nKDvbbm9Jw9NrQNyU38C45u25fV2n63+4ufuHkhhgE9F6SQamx5fjxDc6LebQe7yQzGhO0Jvu26KIyBQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAIAAAAYAwAAAAQAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAACv////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJAC";
    var X0D = B8D;
    B8D += 16, j8D(X0D % 8 == 0);
    var i8D = { varargs: 0, get: function (v5D) {
        return i8D.varargs += 4, e8D[i8D.varargs - 4 >> 2];
    }, getStr: function () {
        return l6D(i8D.get());
    }, get64: function () {
        var W9Q = i8D.get(), l9Q = i8D.get();
        return j8D(W9Q >= 0 ? 0 === l9Q : -1 === l9Q), W9Q;
    }, getZero: function () {
        j8D(0 === i8D.get());
    } };
    function r8D(q9Q, H9Q) {
        i8D.varargs = H9Q;
        try {
            var K9Q = i8D.get(), R9Q = i8D.get(), m9Q = i8D.get(), w9Q = 0;
            r8D.buffers || (r8D.buffers = [null, [], []], r8D.printChar = function (O9Q, u9Q) {
                var o9Q = r8D.buffers[O9Q];
                j8D(o9Q), 0 === u9Q || 10 === u9Q ? ((1 === O9Q ? D0D : s8D)(H6D(o9Q, 0)), o9Q.length = 0) : o9Q.push(u9Q);
            });
            for (var Q9Q = 0; Q9Q < m9Q; Q9Q++) {
                for (var D9Q = e8D[R9Q + 8 * Q9Q >> 2], g9Q = e8D[R9Q + (8 * Q9Q + 4) >> 2], z9Q = 0; z9Q < g9Q; z9Q++)
                    r8D.printChar(K9Q, U8D[D9Q + z9Q]);
                w9Q += g9Q;
            }
            return w9Q;
        }
        catch (M9Q) {
            return void 0 !== d8D && M9Q instanceof d8D.ErrnoError || N8D(M9Q), -M9Q.errno;
        }
    }
    function h0D(A9Q) {
        for (var n9Q = [], y9Q = 0; y9Q < A9Q.length; y9Q++) {
            var J9Q = A9Q[y9Q];
            J9Q > 255 && (j8D(!1, "Character code " + J9Q + " (" + String.fromCharCode(J9Q) + ")  at offset " + y9Q + " not in 0x00-0xFF."), J9Q &= 255), n9Q.push(String.fromCharCode(J9Q));
        }
        return n9Q.join("");
    }
    j0D = function (G9Q) {
        j8D(!i0D);
        var X9Q = B8D;
        return j8D((B8D = B8D + G9Q + 15 & -16) < c8D, "not enough memory for static allocation - increase TOTAL_MEMORY"), X9Q;
    }(4), S0D = g6D = Q6D(B8D), n0D = Q6D(k8D = S0D + H0D), e8D[j0D >> 2] = n0D, i0D = !0, j8D(n0D < c8D, "TOTAL_MEMORY not big enough for stack");
    var s0D = "function" == typeof atob ? atob : function (I9Q) {
        var N9Q, Y9Q, d9Q, t9Q, x9Q, j9Q, p9Q = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", P9Q = "", Z9Q = 0;
        I9Q = I9Q.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        do {
            N9Q = p9Q.indexOf(I9Q.charAt(Z9Q++)) << 2 | (t9Q = p9Q.indexOf(I9Q.charAt(Z9Q++))) >> 4, Y9Q = (15 & t9Q) << 4 | (x9Q = p9Q.indexOf(I9Q.charAt(Z9Q++))) >> 2, d9Q = (3 & x9Q) << 6 | (j9Q = p9Q.indexOf(I9Q.charAt(Z9Q++))), P9Q += String.fromCharCode(N9Q), 64 !== x9Q && (P9Q += String.fromCharCode(Y9Q)), 64 !== j9Q && (P9Q += String.fromCharCode(d9Q));
        } while (Z9Q < I9Q.length);
        return P9Q;
    };
    function f8D(i9Q) {
        if (K6D(i9Q))
            return function (U9Q) {
                if ("boolean" == typeof C8D && C8D) {
                    var h9Q;
                    try {
                        h9Q = Buffer.from(U9Q, "base64");
                    }
                    catch (V9Q) {
                        h9Q = new Buffer(U9Q, "base64");
                    }
                    return new Uint8Array(h9Q.buffer, h9Q.byteOffset, h9Q.byteLength);
                }
                try {
                    for (var S9Q = s0D(U9Q), c9Q = new Uint8Array(S9Q.length), s9Q = 0; s9Q < S9Q.length; ++s9Q)
                        c9Q[s9Q] = S9Q.charCodeAt(s9Q);
                    return c9Q;
                }
                catch (k9Q) {
                    throw new Error("Converting base64 string to bytes failed.");
                }
            }(i9Q.slice(O0D.length));
    }
    t8D.asmGlobalArg = { Math: Math, Int8Array: Int8Array, Int16Array: Int16Array, Int32Array: Int32Array, Uint8Array: Uint8Array, Uint16Array: Uint16Array, Uint32Array: Uint32Array, Float32Array: Float32Array, Float64Array: Float64Array, NaN: NaN, Infinity: 1 / 0 }, t8D.asmLibraryArg = { abort: N8D, assert: j8D, enlargeMemory: function () {
        R6D();
    }, getTotalMemory: function () {
        return c8D;
    }, abortOnCannotGrowMemory: R6D, abortStackOverflow: function (T9Q) {
        N8D("Stack overflow! Attempted to allocate " + T9Q + " bytes on the stack, but stack has only " + (k8D - L8D() + T9Q) + " bytes available!");
    }, nullFunc_ii: function (e9Q) {
        s8D("Invalid function pointer called with signature 'ii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)"), s8D("Build with ASSERTIONS=2 for more info."), N8D(e9Q);
    }, nullFunc_iiii: function (b9Q) {
        s8D("Invalid function pointer called with signature 'iiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)"), s8D("Build with ASSERTIONS=2 for more info."), N8D(b9Q);
    }, invoke_ii: function (f9Q, r9Q) {
        var a9Q = L8D();
        try {
            return t8D.dynCall_ii(f9Q, r9Q);
        }
        catch (B9Q) {
            if (v8D(a9Q), "number" != typeof B9Q && "longjmp" !== B9Q)
                throw B9Q;
            t8D.setThrew(1, 0);
        }
    }, invoke_iiii: function (L9Q, E9Q, C9Q, v9Q) {
        var F9Q = L8D();
        try {
            return t8D.dynCall_iiii(L9Q, E9Q, C9Q, v9Q);
        }
        catch (W1Q) {
            if (v8D(F9Q), "number" != typeof W1Q && "longjmp" !== W1Q)
                throw W1Q;
            t8D.setThrew(1, 0);
        }
    }, ___lock: function () {
    }, ___setErrNo: function (l1Q) {
        return t8D.___errno_location ? e8D[t8D.___errno_location() >> 2] = l1Q : s8D("failed to set errno from JS"), l1Q;
    }, ___syscall140: function (K1Q, D1Q) {
        i8D.varargs = D1Q;
        try {
            var Q1Q = i8D.getStreamFromFD(), R1Q = (i8D.get(), i8D.get()), w1Q = i8D.get(), z1Q = i8D.get(), g1Q = R1Q;
            return d8D.llseek(Q1Q, g1Q, z1Q), e8D[w1Q >> 2] = Q1Q.position, Q1Q.getdents && 0 === g1Q && 0 === z1Q && (Q1Q.getdents = null), 0;
        }
        catch (m1Q) {
            return void 0 !== d8D && m1Q instanceof d8D.ErrnoError || N8D(m1Q), -m1Q.errno;
        }
    }, ___syscall146: r8D, ___syscall54: function (q1Q, H1Q) {
        i8D.varargs = H1Q;
        try {
            return 0;
        }
        catch (o1Q) {
            return void 0 !== d8D && o1Q instanceof d8D.ErrnoError || N8D(o1Q), -o1Q.errno;
        }
    }, ___syscall6: function (M1Q, O1Q) {
        i8D.varargs = O1Q;
        try {
            var u1Q = i8D.getStreamFromFD();
            return d8D.close(u1Q), 0;
        }
        catch (J1Q) {
            return void 0 !== d8D && J1Q instanceof d8D.ErrnoError || N8D(J1Q), -J1Q.errno;
        }
    }, ___unlock: function () {
    }, _emscripten_memcpy_big: function (y1Q, n1Q, A1Q) {
        return U8D.set(U8D.subarray(n1Q, n1Q + A1Q), y1Q), y1Q;
    }, flush_NO_FILESYSTEM: function () {
        var G1Q = t8D._fflush;
        G1Q && G1Q(0);
        var X1Q = r8D.printChar;
        if (X1Q) {
            var I1Q = r8D.buffers;
            I1Q[1].length && X1Q(1, 10), I1Q[2].length && X1Q(2, 10);
        }
    }, DYNAMICTOP_PTR: j0D, tempDoublePtr: X0D, STACKTOP: g6D, STACK_MAX: k8D };
    var Y8D = function (t1Q, j1Q, h1Q) {
        "use asm";
        
        var $Int8Array_h1Q = new t1Q.Int8Array(h1Q);
        var $Int16Array_h1Q = new t1Q.Int16Array(h1Q);
        var $Int32Array_h1Q = new t1Q.Int32Array(h1Q);
        var $Uint8Array_h1Q = new t1Q.Uint8Array(h1Q);
        var $Uint16Array_h1Q = new t1Q.Uint16Array(h1Q);
        var $Uint32Array_h1Q = new t1Q.Uint32Array(h1Q);
        var $Float32Array_h1Q = new t1Q.Float32Array(h1Q);
        var $Float64Array_h1Q = new t1Q.Float64Array(h1Q);
        var $DYNAMICTOP_PTR = j1Q.DYNAMICTOP_PTR | 0;
        var $tempDoublePtr = j1Q.tempDoublePtr | 0;
        var $STACKTOP = j1Q.STACKTOP | 0;
        var $STACK_MAX = j1Q.STACK_MAX | 0;
        var $NaN = t1Q.NaN, $Infinity = t1Q.Infinity;
        var $0 = 0;
        var $floor = t1Q.Math.floor;
        var $abs = t1Q.Math.abs;
        var $sqrt = t1Q.Math.sqrt;
        var $pow = t1Q.Math.pow;
        var $cos = t1Q.Math.cos;
        var $sin = t1Q.Math.sin;
        var $tan = t1Q.Math.tan;
        var $acos = t1Q.Math.acos;
        var $asin = t1Q.Math.asin;
        var $atan = t1Q.Math.atan;
        var $atan2 = t1Q.Math.atan2;
        var $exp = t1Q.Math.exp;
        var $log = t1Q.Math.log;
        var $ceil = t1Q.Math.ceil;
        var $imul = t1Q.Math.imul;
        var $min = t1Q.Math.min;
        var $max = t1Q.Math.max;
        var $clz32 = t1Q.Math.clz32;
        var $abort = j1Q.abort;
        var $assert = j1Q.assert;
        var $enlargeMemory = j1Q.enlargeMemory;
        var $getTotalMemory = j1Q.getTotalMemory;
        var $abortOnCannotGrowMemory = j1Q.abortOnCannotGrowMemory;
        var $abortStackOverflow = j1Q.abortStackOverflow;
        var $nullFunc_ii = j1Q.nullFunc_ii;
        var $nullFunc_iiii = j1Q.nullFunc_iiii;
        var $invoke_ii = j1Q.invoke_ii;
        var $invoke_iiii = j1Q.invoke_iiii;
        var $___lock = j1Q.___lock;
        var $___setErrNo = j1Q.___setErrNo;
        var $___syscall140 = j1Q.___syscall140;
        var $___syscall146 = j1Q.___syscall146;
        var $___syscall54 = j1Q.___syscall54;
        var $___syscall6 = j1Q.___syscall6;
        var $___unlock = j1Q.___unlock;
        var $_emscripten_memcpy_big = j1Q._emscripten_memcpy_big;
        var $flush_NO_FILESYSTEM = j1Q.flush_NO_FILESYSTEM;
        function $stackAlloc(H3Q) {
            H3Q = H3Q | 0;
            var q3Q = 0;
            q3Q = $STACKTOP;
            $STACKTOP = $STACKTOP + H3Q | 0;
            $STACKTOP = $STACKTOP + 15 & -16;
            if (($STACKTOP | 0) >= ($STACK_MAX | 0))
                $abortStackOverflow(H3Q | 0);
            return q3Q | 0;
        }
        function $stackSave() {
            return $STACKTOP | 0;
        }
        function $stackRestore(o3Q) {
            o3Q = o3Q | 0;
            $STACKTOP = o3Q;
        }
        function $establishStackSpace(u3Q, O3Q) {
            u3Q = u3Q | 0;
            O3Q = O3Q | 0;
            $STACKTOP = u3Q;
            $STACK_MAX = O3Q;
        }
        function $setThrew(M3Q, J3Q) {
            M3Q = M3Q | 0;
            J3Q = J3Q | 0;
        }
        function $setTempRet0(y3Q) {
            y3Q = y3Q | 0;
            $0 = y3Q;
        }
        function $getTempRet0() {
            return $0 | 0;
        }
        
        // _Process
        // socketId, bufferOffset, length, userEncryptKey, userDecryptKey, broadcastDecryptKey
        function $_Process(flags, bufferOffset, bufferLength, userEncryptKey, userDecryptKey, broadcastDecryptKey) {
            
            flags = flags | 0;
            bufferOffset = bufferOffset | 0;
            bufferLength = bufferLength | 0;
            userEncryptKey = userEncryptKey | 0;
            userDecryptKey = userDecryptKey | 0;
            broadcastDecryptKey = broadcastDecryptKey | 0;
            var var_1 = 0, var_2 = 0, var_3 = 0, var_4 = 0, var_5 = 0, var_6 = 0;
            var_6 = $STACKTOP;
            $STACKTOP = $STACKTOP + 80 | 0;
            if (($STACKTOP | 0) >= ($STACK_MAX | 0))
                $abortStackOverflow(80);
            var_5 = var_6 + 68 | 0;
            var_4 = var_6 + 64 | 0;
            var_3 = var_6;
            if (bufferLength >>> 0 < 12) {
                var_5 = -1;
                $STACKTOP = var_6;
                return var_5 | 0;
            }
            debugger
            var_1 = $Int32Array_h1Q[bufferOffset >> 2] | 0;
            flags = $_llvm_bswap_i32_1(var_1) | 0;
            console.log(flags);
            switch (flags | 0) {
                case 301825: {
                    userDecryptKey = bufferOffset + 12 | 0;
                    var_5 = $Int8Array_h1Q[userDecryptKey >> 0] | 0;
                    broadcastDecryptKey = bufferOffset + 13 | 0;
                    broadcastDecryptKey = $_llvm_bswap_i32_1($Uint8Array_h1Q[broadcastDecryptKey >> 0] | $Uint8Array_h1Q[broadcastDecryptKey + 1 >> 0] << 8 | $Uint8Array_h1Q[broadcastDecryptKey + 2 >> 0] << 16 | $Uint8Array_h1Q[broadcastDecryptKey + 3 >> 0] << 24) | 0;
                    if (var_5 << 24 >> 24) {
                        $Int32Array_h1Q[bufferOffset >> 2] = $_llvm_bswap_i32_1(broadcastDecryptKey) | 0;
                        var_5 = 3;
                        $STACKTOP = var_6;
                        return var_5 | 0;
                    }
                    var_2 = bufferOffset + 8 | 0;
                    flags = $Int32Array_h1Q[var_2 >> 2] | 0;
                    var_1 = $_llvm_bswap_i32_1(flags) | 0;
                    switch (((var_1 >>> 0) % 3 | 0) & 3) {
                        case 1: {
                            flags = ((((($Uint8Array_h1Q[16 + ($Uint8Array_h1Q[bufferOffset + 9 >> 0] | 0) >> 0] | 0) + ($Uint8Array_h1Q[16 + (flags & 255) >> 0] | 0) | 0) * 131 | 0) + ($Uint8Array_h1Q[16 + ($Uint8Array_h1Q[bufferOffset + 10 >> 0] | 0) >> 0] | 0) + ($Uint8Array_h1Q[16 + ($Uint8Array_h1Q[bufferOffset + 11 >> 0] | 0) >> 0] | 0) | 0) * 131 | 0) + 2 | 0;
                            break;
                        }
                        case 2: {
                            flags = (var_1 & 44879) + 2 + ((($Uint8Array_h1Q[16 + (flags + ($Uint8Array_h1Q[bufferOffset + 11 >> 0] | 0) & 255) >> 0] | 0) + ($Uint8Array_h1Q[16 + (($Uint8Array_h1Q[bufferOffset + 10 >> 0] | 0) + ($Uint8Array_h1Q[bufferOffset + 9 >> 0] | 0) & 255) >> 0] | 0) | 0) * 131 | 0) | 0;
                            break;
                        }
                        default: flags = ((($Uint8Array_h1Q[16 + ($Uint8Array_h1Q[bufferOffset + 9 >> 0] | 0) >> 0] | 0) + ($Uint8Array_h1Q[16 + (flags & 255) >> 0] | 0) + ($Uint8Array_h1Q[16 + ($Uint8Array_h1Q[bufferOffset + 10 >> 0] | 0) >> 0] | 0) + ($Uint8Array_h1Q[16 + ($Uint8Array_h1Q[bufferOffset + 11 >> 0] | 0) >> 0] | 0) | 0) * 131 | 0) + 2 | 0;
                    }
                    $Int32Array_h1Q[bufferOffset >> 2] = $_llvm_bswap_i32_1(301826) | 0;
                    $Int32Array_h1Q[bufferOffset + 4 >> 2] = $_llvm_bswap_i32_1(16) | 0;
                    $Int32Array_h1Q[var_2 >> 2] = $_llvm_bswap_i32_1(flags ^ broadcastDecryptKey & 1688052650 | -2147483648) | 0;
                    $Int32Array_h1Q[userDecryptKey >> 2] = $_llvm_bswap_i32_1(broadcastDecryptKey ^ userEncryptKey) | 0;
                    $Int32Array_h1Q[bufferOffset + 16 >> 2] = $_llvm_bswap_i32_1(broadcastDecryptKey) | 0;
                    var_5 = 2;
                    $STACKTOP = var_6;
                    return var_5 | 0;
                }
                case 301569: {
                    $Int32Array_h1Q[bufferOffset >> 2] = $_llvm_bswap_i32_1($_llvm_bswap_i32_1($Int32Array_h1Q[bufferOffset + 12 >> 2] | 0) | 0) | 0;
                    var_5 = 4;
                    $STACKTOP = var_6;
                    return var_5 | 0;
                }
                case 301840:
                case 301584: {
                    userEncryptKey = $_llvm_bswap_i32_1($Int32Array_h1Q[bufferOffset + 8 >> 2] | 0) | 0;
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
                        var_1 = $_llvm_bswap_i32_1(flags) | 0;
                        $Int32Array_h1Q[var_4 >> 2] = var_1;
                        flags = var_1 & 255;
                        broadcastDecryptKey = var_1 >>> 8 & 255;
                        userDecryptKey = var_1 >>> 16 & 255;
                        var_1 = var_1 >>> 24 & 255;
                    }
                    if (((userEncryptKey >>> 0) % 7 | 0) >>> 0 > 3) {
                        flags = flags ^ $Int8Array_h1Q[272 + (userEncryptKey & 63) >> 0];
                        $Int8Array_h1Q[var_4 >> 0] = flags;
                        broadcastDecryptKey = broadcastDecryptKey ^ $Int8Array_h1Q[272 + (userEncryptKey + 1 & 63) >> 0];
                        $Int8Array_h1Q[var_4 + 1 >> 0] = broadcastDecryptKey;
                        var_2 = userDecryptKey ^ $Int8Array_h1Q[272 + (userEncryptKey + 2 & 63) >> 0];
                        $Int8Array_h1Q[var_4 + 2 >> 0] = var_2;
                        var_1 = var_1 ^ $Int8Array_h1Q[272 + (userEncryptKey + 3 & 63) >> 0];
                        $Int8Array_h1Q[var_4 + 3 >> 0] = var_1;
                    }
                    else
                        var_2 = userDecryptKey;
                    do {
                        if ((userEncryptKey + -200 | 0) >>> 0 < 100) {
                            if (bufferLength >>> 0 > 12) {
                                flags = 12;
                                do {
                                    userEncryptKey = flags + -12 | 0;
                                    var_3 = bufferOffset + flags | 0;
                                    $Int8Array_h1Q[var_3 >> 0] = $Int8Array_h1Q[336 + ((userEncryptKey >>> 0) % 67 | 0) >> 0] ^ ($Int8Array_h1Q[var_3 >> 0] ^ $Int8Array_h1Q[var_4 + (userEncryptKey & 3) >> 0]);
                                    flags = flags + 1 | 0;
                                } while ((flags | 0) != (bufferLength | 0));
                            }
                            userEncryptKey = bufferOffset + 12 | 0;
                            var_2 = bufferLength + -12 | 0;
                            userDecryptKey = $_llvm_bswap_i32_1(1522487922) | 0;
                            $Int32Array_h1Q[var_5 >> 2] = userDecryptKey;
                            broadcastDecryptKey = var_2 >>> 2;
                            if (!broadcastDecryptKey)
                                flags = 0;
                            else {
                                var_1 = 0;
                                flags = 0;
                                while (1) {
                                    flags = userEncryptKey + flags | 0;
                                    $Int32Array_h1Q[flags >> 2] = $Int32Array_h1Q[flags >> 2] ^ userDecryptKey;
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
                                    $Int8Array_h1Q[bufferLength >> 0] = $Int8Array_h1Q[bufferLength >> 0] ^ $Int8Array_h1Q[var_5 + (flags & 3) >> 0];
                                    flags = flags + 1 | 0;
                                } while ((flags | 0) != (var_2 | 0));
                        }
                        else {
                            if ((userEncryptKey + -300 | 0) >>> 0 < 100) {
                                if (bufferLength >>> 0 > 12) {
                                    flags = 12;
                                    do {
                                        var_3 = bufferOffset + flags | 0;
                                        $Int8Array_h1Q[var_3 >> 0] = $Int8Array_h1Q[16 + (($Int8Array_h1Q[var_4 + (flags & 3) >> 0] ^ $Int8Array_h1Q[var_3 >> 0]) & 255) >> 0] | 0;
                                        flags = flags + 1 | 0;
                                    } while ((flags | 0) != (bufferLength | 0));
                                }
                                userEncryptKey = bufferOffset + 12 | 0;
                                var_2 = bufferLength + -12 | 0;
                                userDecryptKey = $_llvm_bswap_i32_1(1522487922) | 0;
                                $Int32Array_h1Q[var_5 >> 2] = userDecryptKey;
                                broadcastDecryptKey = var_2 >>> 2;
                                if (!broadcastDecryptKey)
                                    flags = 0;
                                else {
                                    var_1 = 0;
                                    flags = 0;
                                    while (1) {
                                        flags = userEncryptKey + flags | 0;
                                        $Int32Array_h1Q[flags >> 2] = $Int32Array_h1Q[flags >> 2] ^ userDecryptKey;
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
                                        $Int8Array_h1Q[bufferLength >> 0] = $Int8Array_h1Q[bufferLength >> 0] ^ $Int8Array_h1Q[var_5 + (flags & 3) >> 0];
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
                                        $Int8Array_h1Q[var_3 >> 0] = $Int8Array_h1Q[336 + ((userEncryptKey >>> 0) % 67 | 0) >> 0] ^ ($Int8Array_h1Q[var_3 >> 0] ^ $Int8Array_h1Q[var_4 + (userEncryptKey + var_1 & 3) >> 0]);
                                        flags = flags + 1 | 0;
                                    } while ((flags | 0) != (bufferLength | 0));
                                }
                                userEncryptKey = bufferOffset + 12 | 0;
                                var_2 = bufferLength + -12 | 0;
                                userDecryptKey = $_llvm_bswap_i32_1(1522487922) | 0;
                                $Int32Array_h1Q[var_5 >> 2] = userDecryptKey;
                                broadcastDecryptKey = var_2 >>> 2;
                                if (!broadcastDecryptKey)
                                    flags = 0;
                                else {
                                    var_1 = 0;
                                    flags = 0;
                                    while (1) {
                                        flags = userEncryptKey + flags | 0;
                                        $Int32Array_h1Q[flags >> 2] = $Int32Array_h1Q[flags >> 2] ^ userDecryptKey;
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
                                        $Int8Array_h1Q[bufferLength >> 0] = $Int8Array_h1Q[bufferLength >> 0] ^ $Int8Array_h1Q[var_5 + (flags & 3) >> 0];
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
                                        $Int8Array_h1Q[var_3 >> 0] = $Int8Array_h1Q[336 + ((((var_2 + userEncryptKey | 0) >>> 0) % 47 | 0) + var_1) >> 0] ^ ($Int8Array_h1Q[var_3 >> 0] ^ $Int8Array_h1Q[var_4 + (var_2 & 3) >> 0]);
                                        flags = flags + 1 | 0;
                                    } while ((flags | 0) != (bufferLength | 0));
                                }
                                userEncryptKey = bufferOffset + 12 | 0;
                                var_2 = bufferLength + -12 | 0;
                                userDecryptKey = $_llvm_bswap_i32_1(1522487922) | 0;
                                $Int32Array_h1Q[var_5 >> 2] = userDecryptKey;
                                broadcastDecryptKey = var_2 >>> 2;
                                if (!broadcastDecryptKey)
                                    flags = 0;
                                else {
                                    var_1 = 0;
                                    flags = 0;
                                    while (1) {
                                        flags = userEncryptKey + flags | 0;
                                        $Int32Array_h1Q[flags >> 2] = $Int32Array_h1Q[flags >> 2] ^ userDecryptKey;
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
                                        $Int8Array_h1Q[bufferLength >> 0] = $Int8Array_h1Q[bufferLength >> 0] ^ $Int8Array_h1Q[var_5 + (flags & 3) >> 0];
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
                                        flags = $Int8Array_h1Q[var_3 >> 0] | 0;
                                        $Int8Array_h1Q[var_3 >> 0] = flags ^ var_2 ^ $Int8Array_h1Q[464 + (((userEncryptKey + ($Uint8Array_h1Q[var_4 + (var_1 & 3) >> 0] | 0) | 0) >>> 0) % 113 | 0) >> 0];
                                        var_1 = var_1 + 1 | 0;
                                    } while ((var_1 | 0) != (bufferLength | 0));
                                }
                                userEncryptKey = bufferOffset + 12 | 0;
                                var_2 = bufferLength + -12 | 0;
                                userDecryptKey = $_llvm_bswap_i32_1(1522487922) | 0;
                                $Int32Array_h1Q[var_5 >> 2] = userDecryptKey;
                                broadcastDecryptKey = var_2 >>> 2;
                                if (!broadcastDecryptKey)
                                    flags = 0;
                                else {
                                    var_1 = 0;
                                    flags = 0;
                                    while (1) {
                                        flags = userEncryptKey + flags | 0;
                                        $Int32Array_h1Q[flags >> 2] = $Int32Array_h1Q[flags >> 2] ^ userDecryptKey;
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
                                        $Int8Array_h1Q[bufferLength >> 0] = $Int8Array_h1Q[bufferLength >> 0] ^ $Int8Array_h1Q[var_5 + (flags & 3) >> 0];
                                        flags = flags + 1 | 0;
                                    } while ((flags | 0) != (var_2 | 0));
                                break;
                            }
                            if ((userEncryptKey + -954 | 0) >>> 0 < 56) {
                                flags = $Int32Array_h1Q[var_4 >> 2] | 0;
                                $Int32Array_h1Q[var_3 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 4 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 8 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 12 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 16 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 20 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 24 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 28 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 32 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 36 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 40 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 44 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 48 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 52 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 56 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 60 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 64 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 68 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 72 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 76 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 80 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 84 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 88 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 92 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 96 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 100 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 104 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 108 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 112 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 116 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 120 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 124 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 128 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 132 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 136 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 140 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 144 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 148 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 152 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 156 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 160 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 164 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 168 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 172 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 176 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 180 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 184 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 188 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 192 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 196 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 200 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 204 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 208 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 212 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 216 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 220 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 224 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 228 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 232 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 236 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 240 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 244 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 248 >> 2] = flags;
                                $Int32Array_h1Q[var_3 + 252 >> 2] = flags;
                                flags = 0;
                                var_1 = userEncryptKey;
                                do {
                                    broadcastDecryptKey = var_3 + flags | 0;
                                    var_2 = $Int8Array_h1Q[broadcastDecryptKey >> 0] | 0;
                                    var_4 = var_3 + (var_1 & 63) | 0;
                                    $Int8Array_h1Q[broadcastDecryptKey >> 0] = $Int8Array_h1Q[var_4 >> 0] | 0;
                                    $Int8Array_h1Q[var_4 >> 0] = var_2;
                                    var_1 = ((var_1 & 16777215) * 131 | 0) + flags | 0;
                                    flags = flags + 1 | 0;
                                } while ((flags | 0) != 64);
                                if (bufferLength >>> 0 > 12) {
                                    var_1 = userEncryptKey + -12 | 0;
                                    flags = 12;
                                    do {
                                        var_4 = bufferOffset + flags | 0;
                                        $Int8Array_h1Q[var_4 >> 0] = $Int8Array_h1Q[var_4 >> 0] ^ $Int8Array_h1Q[var_3 + (((var_1 + flags | 0) >>> 0) % 53 | 0) >> 0];
                                        flags = flags + 1 | 0;
                                    } while ((flags | 0) != (bufferLength | 0));
                                }
                                userEncryptKey = bufferOffset + 12 | 0;
                                var_2 = bufferLength + -12 | 0;
                                userDecryptKey = $_llvm_bswap_i32_1(1522487922) | 0;
                                $Int32Array_h1Q[var_5 >> 2] = userDecryptKey;
                                broadcastDecryptKey = var_2 >>> 2;
                                if (!broadcastDecryptKey)
                                    flags = 0;
                                else {
                                    var_1 = 0;
                                    flags = 0;
                                    while (1) {
                                        flags = userEncryptKey + flags | 0;
                                        $Int32Array_h1Q[flags >> 2] = $Int32Array_h1Q[flags >> 2] ^ userDecryptKey;
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
                                        $Int8Array_h1Q[bufferLength >> 0] = $Int8Array_h1Q[bufferLength >> 0] ^ $Int8Array_h1Q[var_5 + (flags & 3) >> 0];
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
                                        flags = flags & 255 ^ ($Uint8Array_h1Q[464 + ((((userDecryptKey + ($Uint8Array_h1Q[var_4 + (var_1 & 3) >> 0] | 0) | 0) >>> 0) % 69 | 0) + 13) >> 0] | 0) ^ ($Uint8Array_h1Q[var_3 >> 0] | 0);
                                        $Int8Array_h1Q[var_3 >> 0] = flags;
                                        var_1 = var_1 + 1 | 0;
                                    } while ((var_1 | 0) != (bufferLength | 0));
                                }
                                userEncryptKey = bufferOffset + 12 | 0;
                                var_2 = bufferLength + -12 | 0;
                                userDecryptKey = $_llvm_bswap_i32_1(1522487922) | 0;
                                $Int32Array_h1Q[var_5 >> 2] = userDecryptKey;
                                broadcastDecryptKey = var_2 >>> 2;
                                if (!broadcastDecryptKey)
                                    flags = 0;
                                else {
                                    var_1 = 0;
                                    flags = 0;
                                    while (1) {
                                        flags = userEncryptKey + flags | 0;
                                        $Int32Array_h1Q[flags >> 2] = $Int32Array_h1Q[flags >> 2] ^ userDecryptKey;
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
                                        $Int8Array_h1Q[bufferLength >> 0] = $Int8Array_h1Q[bufferLength >> 0] ^ $Int8Array_h1Q[var_5 + (flags & 3) >> 0];
                                        flags = flags + 1 | 0;
                                    } while ((flags | 0) != (var_2 | 0));
                                break;
                            }
                            if ((userEncryptKey + -1104 | 0) >>> 0 < 48) {
                                if (bufferLength >>> 0 > 12) {
                                    var_1 = 12;
                                    do {
                                        userDecryptKey = bufferOffset + var_1 | 0;
                                        broadcastDecryptKey = $Int8Array_h1Q[userDecryptKey >> 0] ^ $Int8Array_h1Q[var_4 + (var_1 & 3) >> 0];
                                        $Int8Array_h1Q[userDecryptKey >> 0] = broadcastDecryptKey;
                                        flags = var_1 + userEncryptKey | 0;
                                        if (!(var_1 & 1))
                                            flags = 336 + (((flags + 77 | 0) >>> 0) % 119 | 0) | 0;
                                        else
                                            flags = 464 + (flags + 11 & 127) | 0;
                                        $Int8Array_h1Q[userDecryptKey >> 0] = $Int8Array_h1Q[flags >> 0] ^ broadcastDecryptKey;
                                        var_1 = var_1 + 1 | 0;
                                    } while ((var_1 | 0) != (bufferLength | 0));
                                }
                                userEncryptKey = bufferOffset + 12 | 0;
                                var_2 = bufferLength + -12 | 0;
                                userDecryptKey = $_llvm_bswap_i32_1(1522487922) | 0;
                                $Int32Array_h1Q[var_5 >> 2] = userDecryptKey;
                                broadcastDecryptKey = var_2 >>> 2;
                                if (!broadcastDecryptKey)
                                    flags = 0;
                                else {
                                    var_1 = 0;
                                    flags = 0;
                                    while (1) {
                                        flags = userEncryptKey + flags | 0;
                                        $Int32Array_h1Q[flags >> 2] = $Int32Array_h1Q[flags >> 2] ^ userDecryptKey;
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
                                        $Int8Array_h1Q[bufferLength >> 0] = $Int8Array_h1Q[bufferLength >> 0] ^ $Int8Array_h1Q[var_5 + (flags & 3) >> 0];
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
                                        $Int8Array_h1Q[var_3 >> 0] = $Int8Array_h1Q[592 + ((var_2 >>> 3 & 7 | var_2 << 3) + userEncryptKey & 63) >> 0] ^ ($Int8Array_h1Q[var_3 >> 0] ^ $Int8Array_h1Q[var_4 + (var_2 & 3) >> 0]);
                                        flags = flags + 1 | 0;
                                    } while ((flags | 0) != (bufferLength | 0));
                                }
                                userEncryptKey = bufferOffset + 12 | 0;
                                var_2 = bufferLength + -12 | 0;
                                userDecryptKey = $_llvm_bswap_i32_1(1522487922) | 0;
                                $Int32Array_h1Q[var_5 >> 2] = userDecryptKey;
                                broadcastDecryptKey = var_2 >>> 2;
                                if (!broadcastDecryptKey)
                                    flags = 0;
                                else {
                                    var_1 = 0;
                                    flags = 0;
                                    while (1) {
                                        flags = userEncryptKey + flags | 0;
                                        $Int32Array_h1Q[flags >> 2] = $Int32Array_h1Q[flags >> 2] ^ userDecryptKey;
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
                                        $Int8Array_h1Q[bufferLength >> 0] = $Int8Array_h1Q[bufferLength >> 0] ^ $Int8Array_h1Q[var_5 + (flags & 3) >> 0];
                                        flags = flags + 1 | 0;
                                    } while ((flags | 0) != (var_2 | 0));
                                break;
                            }
                            var_1 = bufferLength >>> 2;
                            if (bufferLength >>> 0 > 15) {
                                userDecryptKey = $Int32Array_h1Q[var_4 >> 2] | 0;
                                flags = 3;
                                do {
                                    var_3 = bufferOffset + (flags << 2) | 0;
                                    $Int32Array_h1Q[var_3 >> 2] = $Int32Array_h1Q[var_3 >> 2] ^ userDecryptKey;
                                    flags = flags + 1 | 0;
                                } while (flags >>> 0 < var_1 >>> 0);
                                flags = flags << 2;
                            }
                            else
                                flags = 12;
                            if (flags >>> 0 < bufferLength >>> 0)
                                do {
                                    var_3 = bufferOffset + flags | 0;
                                    $Int8Array_h1Q[var_3 >> 0] = $Int8Array_h1Q[var_3 >> 0] ^ $Int8Array_h1Q[var_4 + (flags & 3) >> 0];
                                    flags = flags + 1 | 0;
                                } while ((flags | 0) != (bufferLength | 0));
                            userEncryptKey = bufferOffset + 12 | 0;
                            var_2 = bufferLength + -12 | 0;
                            userDecryptKey = $_llvm_bswap_i32_1(1522487922) | 0;
                            $Int32Array_h1Q[var_5 >> 2] = userDecryptKey;
                            broadcastDecryptKey = var_2 >>> 2;
                            if (!broadcastDecryptKey)
                                flags = 0;
                            else {
                                var_1 = 0;
                                flags = 0;
                                while (1) {
                                    flags = userEncryptKey + flags | 0;
                                    $Int32Array_h1Q[flags >> 2] = $Int32Array_h1Q[flags >> 2] ^ userDecryptKey;
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
                                    $Int8Array_h1Q[bufferLength >> 0] = $Int8Array_h1Q[bufferLength >> 0] ^ $Int8Array_h1Q[var_5 + (flags & 3) >> 0];
                                    flags = flags + 1 | 0;
                                } while ((flags | 0) != (var_2 | 0));
                        }
                    } while (0);
                    var_5 = 1;
                    $STACKTOP = var_6;
                    return var_5 | 0;
                }
                default: {
                    userDecryptKey = $_llvm_bswap_i32_1(1522487922) | 0;
                    $Int32Array_h1Q[var_5 >> 2] = userDecryptKey;
                    broadcastDecryptKey = bufferLength >>> 2;
                    if (!broadcastDecryptKey)
                        flags = 0;
                    else {
                        $Int32Array_h1Q[bufferOffset >> 2] = var_1 ^ userDecryptKey;
                        if ((broadcastDecryptKey | 0) != 1) {
                            var_1 = 4;
                            flags = 1;
                            while (1) {
                                $Int32Array_h1Q[bufferOffset + var_1 >> 2] = $Int32Array_h1Q[bufferOffset + var_1 >> 2] ^ userDecryptKey;
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
                            $Int8Array_h1Q[var_4 >> 0] = $Int8Array_h1Q[var_4 >> 0] ^ $Int8Array_h1Q[var_5 + (flags & 3) >> 0];
                            flags = flags + 1 | 0;
                        } while ((flags | 0) != (bufferLength | 0));
                    var_5 = 0;
                    $STACKTOP = var_6;
                    return var_5 | 0;
                }
            }
            return 0;
        }
        function $_Encrypt(arg_1, arg_2, arg_3, arg_4, arg_5, arg_6, arg_7) {
            arg_1 = arg_1 | 0;
            arg_2 = arg_2 | 0;
            arg_3 = arg_3 | 0;
            arg_4 = arg_4 | 0;
            arg_5 = arg_5 | 0;
            arg_6 = arg_6 | 0;
            arg_7 = arg_7 | 0;
            var var_1 = 0, var_2 = 0, var_3 = 0;
            var_3 = $STACKTOP;
            $STACKTOP = $STACKTOP + 16 | 0;
            if (($STACKTOP | 0) >= ($STACK_MAX | 0))
                $abortStackOverflow(16);
            var_1 = var_3;
            var_2 = arg_3 + 12 | 0;
            if (var_2 >>> 0 > arg_4 >>> 0) {
                arg_3 = -1;
                $STACKTOP = var_3;
                return arg_3 | 0;
            }
            arg_7 = $_llvm_bswap_i32_1(arg_5) | 0;
            $Int32Array_h1Q[var_1 >> 2] = arg_7;
            $_memmove(arg_2 + 12 | 0, arg_2 | 0, arg_3 | 0) | 0;
            $Int32Array_h1Q[arg_2 >> 2] = $_llvm_bswap_i32_1(301840) | 0;
            $Int32Array_h1Q[arg_2 + 4 >> 2] = $_llvm_bswap_i32_1(var_2) | 0;
            $Int32Array_h1Q[arg_2 + 8 >> 2] = $_llvm_bswap_i32_1(2) | 0;
            arg_4 = arg_3 >>> 2;
            if (!arg_4)
                arg_1 = 0;
            else {
                arg_6 = 0;
                arg_1 = 0;
                while (1) {
                    arg_1 = arg_2 + (arg_1 + 12) | 0;
                    $Int32Array_h1Q[arg_1 >> 2] = $Int32Array_h1Q[arg_1 >> 2] ^ arg_7;
                    arg_1 = arg_6 + 1 | 0;
                    if ((arg_1 | 0) == (arg_4 | 0))
                        break;
                    else {
                        arg_6 = arg_1;
                        arg_1 = arg_1 << 2;
                    }
                }
                arg_1 = arg_3 & -4;
            }
            if (arg_1 >>> 0 < arg_3 >>> 0)
                do {
                    arg_5 = arg_2 + (arg_1 + 12) | 0;
                    $Int8Array_h1Q[arg_5 >> 0] = $Int8Array_h1Q[arg_5 >> 0] ^ $Int8Array_h1Q[var_1 + (arg_1 & 3) >> 0];
                    arg_1 = arg_1 + 1 | 0;
                } while ((arg_1 | 0) != (arg_3 | 0));
            arg_3 = var_2;
            $STACKTOP = var_3;
            return arg_3 | 0;
        }
        function $_malloc(e3Q) {
            e3Q = e3Q | 0;
            var T3Q = 0, b3Q = 0, f3Q = 0, C3Q = 0, r3Q = 0, E3Q = 0, F3Q = 0, B3Q = 0, L3Q = 0, l7Q = 0, v3Q = 0, R7Q = 0, D7Q = 0, w7Q = 0, z7Q = 0, K7Q = 0, m7Q = 0, W7Q = 0, Q7Q = 0, a3Q = 0, g7Q = 0;
            g7Q = $STACKTOP;
            $STACKTOP = $STACKTOP + 16 | 0;
            if (($STACKTOP | 0) >= ($STACK_MAX | 0))
                $abortStackOverflow(16);
            R7Q = g7Q;
            do {
                if (e3Q >>> 0 < 245) {
                    L3Q = e3Q >>> 0 < 11 ? 16 : e3Q + 11 & -8;
                    e3Q = L3Q >>> 3;
                    v3Q = $Int32Array_h1Q[456] | 0;
                    b3Q = v3Q >>> e3Q;
                    if (b3Q & 3 | 0) {
                        T3Q = (b3Q & 1 ^ 1) + e3Q | 0;
                        e3Q = 1864 + (T3Q << 1 << 2) | 0;
                        b3Q = e3Q + 8 | 0;
                        f3Q = $Int32Array_h1Q[b3Q >> 2] | 0;
                        C3Q = f3Q + 8 | 0;
                        r3Q = $Int32Array_h1Q[C3Q >> 2] | 0;
                        if ((r3Q | 0) == (e3Q | 0))
                            $Int32Array_h1Q[456] = v3Q & ~(1 << T3Q);
                        else {
                            $Int32Array_h1Q[r3Q + 12 >> 2] = e3Q;
                            $Int32Array_h1Q[b3Q >> 2] = r3Q;
                        }
                        a3Q = T3Q << 3;
                        $Int32Array_h1Q[f3Q + 4 >> 2] = a3Q | 3;
                        a3Q = f3Q + a3Q + 4 | 0;
                        $Int32Array_h1Q[a3Q >> 2] = $Int32Array_h1Q[a3Q >> 2] | 1;
                        a3Q = C3Q;
                        $STACKTOP = g7Q;
                        return a3Q | 0;
                    }
                    l7Q = $Int32Array_h1Q[458] | 0;
                    if (L3Q >>> 0 > l7Q >>> 0) {
                        if (b3Q | 0) {
                            T3Q = 2 << e3Q;
                            T3Q = b3Q << e3Q & (T3Q | 0 - T3Q);
                            T3Q = (T3Q & 0 - T3Q) + -1 | 0;
                            F3Q = T3Q >>> 12 & 16;
                            T3Q = T3Q >>> F3Q;
                            b3Q = T3Q >>> 5 & 8;
                            T3Q = T3Q >>> b3Q;
                            r3Q = T3Q >>> 2 & 4;
                            T3Q = T3Q >>> r3Q;
                            e3Q = T3Q >>> 1 & 2;
                            T3Q = T3Q >>> e3Q;
                            f3Q = T3Q >>> 1 & 1;
                            f3Q = (b3Q | F3Q | r3Q | e3Q | f3Q) + (T3Q >>> f3Q) | 0;
                            T3Q = 1864 + (f3Q << 1 << 2) | 0;
                            e3Q = T3Q + 8 | 0;
                            r3Q = $Int32Array_h1Q[e3Q >> 2] | 0;
                            F3Q = r3Q + 8 | 0;
                            b3Q = $Int32Array_h1Q[F3Q >> 2] | 0;
                            if ((b3Q | 0) == (T3Q | 0)) {
                                e3Q = v3Q & ~(1 << f3Q);
                                $Int32Array_h1Q[456] = e3Q;
                            }
                            else {
                                $Int32Array_h1Q[b3Q + 12 >> 2] = T3Q;
                                $Int32Array_h1Q[e3Q >> 2] = b3Q;
                                e3Q = v3Q;
                            }
                            a3Q = f3Q << 3;
                            E3Q = a3Q - L3Q | 0;
                            $Int32Array_h1Q[r3Q + 4 >> 2] = L3Q | 3;
                            C3Q = r3Q + L3Q | 0;
                            $Int32Array_h1Q[C3Q + 4 >> 2] = E3Q | 1;
                            $Int32Array_h1Q[r3Q + a3Q >> 2] = E3Q;
                            if (l7Q | 0) {
                                f3Q = $Int32Array_h1Q[461] | 0;
                                T3Q = l7Q >>> 3;
                                b3Q = 1864 + (T3Q << 1 << 2) | 0;
                                T3Q = 1 << T3Q;
                                if (!(e3Q & T3Q)) {
                                    $Int32Array_h1Q[456] = e3Q | T3Q;
                                    T3Q = b3Q;
                                    e3Q = b3Q + 8 | 0;
                                }
                                else {
                                    e3Q = b3Q + 8 | 0;
                                    T3Q = $Int32Array_h1Q[e3Q >> 2] | 0;
                                }
                                $Int32Array_h1Q[e3Q >> 2] = f3Q;
                                $Int32Array_h1Q[T3Q + 12 >> 2] = f3Q;
                                $Int32Array_h1Q[f3Q + 8 >> 2] = T3Q;
                                $Int32Array_h1Q[f3Q + 12 >> 2] = b3Q;
                            }
                            $Int32Array_h1Q[458] = E3Q;
                            $Int32Array_h1Q[461] = C3Q;
                            a3Q = F3Q;
                            $STACKTOP = g7Q;
                            return a3Q | 0;
                        }
                        r3Q = $Int32Array_h1Q[457] | 0;
                        if (r3Q) {
                            b3Q = (r3Q & 0 - r3Q) + -1 | 0;
                            C3Q = b3Q >>> 12 & 16;
                            b3Q = b3Q >>> C3Q;
                            f3Q = b3Q >>> 5 & 8;
                            b3Q = b3Q >>> f3Q;
                            E3Q = b3Q >>> 2 & 4;
                            b3Q = b3Q >>> E3Q;
                            F3Q = b3Q >>> 1 & 2;
                            b3Q = b3Q >>> F3Q;
                            B3Q = b3Q >>> 1 & 1;
                            B3Q = $Int32Array_h1Q[2128 + ((f3Q | C3Q | E3Q | F3Q | B3Q) + (b3Q >>> B3Q) << 2) >> 2] | 0;
                            b3Q = B3Q;
                            F3Q = B3Q;
                            B3Q = ($Int32Array_h1Q[B3Q + 4 >> 2] & -8) - L3Q | 0;
                            while (1) {
                                e3Q = $Int32Array_h1Q[b3Q + 16 >> 2] | 0;
                                if (!e3Q) {
                                    e3Q = $Int32Array_h1Q[b3Q + 20 >> 2] | 0;
                                    if (!e3Q)
                                        break;
                                }
                                E3Q = ($Int32Array_h1Q[e3Q + 4 >> 2] & -8) - L3Q | 0;
                                C3Q = E3Q >>> 0 < B3Q >>> 0;
                                b3Q = e3Q;
                                F3Q = C3Q ? e3Q : F3Q;
                                B3Q = C3Q ? E3Q : B3Q;
                            }
                            E3Q = F3Q + L3Q | 0;
                            if (E3Q >>> 0 > F3Q >>> 0) {
                                C3Q = $Int32Array_h1Q[F3Q + 24 >> 2] | 0;
                                T3Q = $Int32Array_h1Q[F3Q + 12 >> 2] | 0;
                                do {
                                    if ((T3Q | 0) == (F3Q | 0)) {
                                        e3Q = F3Q + 20 | 0;
                                        T3Q = $Int32Array_h1Q[e3Q >> 2] | 0;
                                        if (!T3Q) {
                                            e3Q = F3Q + 16 | 0;
                                            T3Q = $Int32Array_h1Q[e3Q >> 2] | 0;
                                            if (!T3Q) {
                                                b3Q = 0;
                                                break;
                                            }
                                        }
                                        while (1) {
                                            f3Q = T3Q + 20 | 0;
                                            b3Q = $Int32Array_h1Q[f3Q >> 2] | 0;
                                            if (!b3Q) {
                                                f3Q = T3Q + 16 | 0;
                                                b3Q = $Int32Array_h1Q[f3Q >> 2] | 0;
                                                if (!b3Q)
                                                    break;
                                                else {
                                                    T3Q = b3Q;
                                                    e3Q = f3Q;
                                                }
                                            }
                                            else {
                                                T3Q = b3Q;
                                                e3Q = f3Q;
                                            }
                                        }
                                        $Int32Array_h1Q[e3Q >> 2] = 0;
                                        b3Q = T3Q;
                                    }
                                    else {
                                        b3Q = $Int32Array_h1Q[F3Q + 8 >> 2] | 0;
                                        $Int32Array_h1Q[b3Q + 12 >> 2] = T3Q;
                                        $Int32Array_h1Q[T3Q + 8 >> 2] = b3Q;
                                        b3Q = T3Q;
                                    }
                                } while (0);
                                do {
                                    if (C3Q | 0) {
                                        T3Q = $Int32Array_h1Q[F3Q + 28 >> 2] | 0;
                                        e3Q = 2128 + (T3Q << 2) | 0;
                                        if ((F3Q | 0) == ($Int32Array_h1Q[e3Q >> 2] | 0)) {
                                            $Int32Array_h1Q[e3Q >> 2] = b3Q;
                                            if (!b3Q) {
                                                $Int32Array_h1Q[457] = r3Q & ~(1 << T3Q);
                                                break;
                                            }
                                        }
                                        else {
                                            a3Q = C3Q + 16 | 0;
                                            $Int32Array_h1Q[(($Int32Array_h1Q[a3Q >> 2] | 0) == (F3Q | 0) ? a3Q : C3Q + 20 | 0) >> 2] = b3Q;
                                            if (!b3Q)
                                                break;
                                        }
                                        $Int32Array_h1Q[b3Q + 24 >> 2] = C3Q;
                                        T3Q = $Int32Array_h1Q[F3Q + 16 >> 2] | 0;
                                        if (T3Q | 0) {
                                            $Int32Array_h1Q[b3Q + 16 >> 2] = T3Q;
                                            $Int32Array_h1Q[T3Q + 24 >> 2] = b3Q;
                                        }
                                        T3Q = $Int32Array_h1Q[F3Q + 20 >> 2] | 0;
                                        if (T3Q | 0) {
                                            $Int32Array_h1Q[b3Q + 20 >> 2] = T3Q;
                                            $Int32Array_h1Q[T3Q + 24 >> 2] = b3Q;
                                        }
                                    }
                                } while (0);
                                if (B3Q >>> 0 < 16) {
                                    a3Q = B3Q + L3Q | 0;
                                    $Int32Array_h1Q[F3Q + 4 >> 2] = a3Q | 3;
                                    a3Q = F3Q + a3Q + 4 | 0;
                                    $Int32Array_h1Q[a3Q >> 2] = $Int32Array_h1Q[a3Q >> 2] | 1;
                                }
                                else {
                                    $Int32Array_h1Q[F3Q + 4 >> 2] = L3Q | 3;
                                    $Int32Array_h1Q[E3Q + 4 >> 2] = B3Q | 1;
                                    $Int32Array_h1Q[E3Q + B3Q >> 2] = B3Q;
                                    if (l7Q | 0) {
                                        f3Q = $Int32Array_h1Q[461] | 0;
                                        T3Q = l7Q >>> 3;
                                        b3Q = 1864 + (T3Q << 1 << 2) | 0;
                                        T3Q = 1 << T3Q;
                                        if (!(T3Q & v3Q)) {
                                            $Int32Array_h1Q[456] = T3Q | v3Q;
                                            T3Q = b3Q;
                                            e3Q = b3Q + 8 | 0;
                                        }
                                        else {
                                            e3Q = b3Q + 8 | 0;
                                            T3Q = $Int32Array_h1Q[e3Q >> 2] | 0;
                                        }
                                        $Int32Array_h1Q[e3Q >> 2] = f3Q;
                                        $Int32Array_h1Q[T3Q + 12 >> 2] = f3Q;
                                        $Int32Array_h1Q[f3Q + 8 >> 2] = T3Q;
                                        $Int32Array_h1Q[f3Q + 12 >> 2] = b3Q;
                                    }
                                    $Int32Array_h1Q[458] = B3Q;
                                    $Int32Array_h1Q[461] = E3Q;
                                }
                                a3Q = F3Q + 8 | 0;
                                $STACKTOP = g7Q;
                                return a3Q | 0;
                            }
                            else
                                v3Q = L3Q;
                        }
                        else
                            v3Q = L3Q;
                    }
                    else
                        v3Q = L3Q;
                }
                else if (e3Q >>> 0 <= 4294967231) {
                    e3Q = e3Q + 11 | 0;
                    L3Q = e3Q & -8;
                    f3Q = $Int32Array_h1Q[457] | 0;
                    if (f3Q) {
                        C3Q = 0 - L3Q | 0;
                        e3Q = e3Q >>> 8;
                        if (e3Q) {
                            if (L3Q >>> 0 > 16777215)
                                B3Q = 31;
                            else {
                                v3Q = (e3Q + 1048320 | 0) >>> 16 & 8;
                                z7Q = e3Q << v3Q;
                                F3Q = (z7Q + 520192 | 0) >>> 16 & 4;
                                z7Q = z7Q << F3Q;
                                B3Q = (z7Q + 245760 | 0) >>> 16 & 2;
                                B3Q = 14 - (F3Q | v3Q | B3Q) + (z7Q << B3Q >>> 15) | 0;
                                B3Q = L3Q >>> (B3Q + 7 | 0) & 1 | B3Q << 1;
                            }
                        }
                        else
                            B3Q = 0;
                        b3Q = $Int32Array_h1Q[2128 + (B3Q << 2) >> 2] | 0;
                        a: do {
                            if (!b3Q) {
                                b3Q = 0;
                                e3Q = 0;
                                z7Q = 61;
                            }
                            else {
                                e3Q = 0;
                                F3Q = L3Q << ((B3Q | 0) == 31 ? 0 : 25 - (B3Q >>> 1) | 0);
                                r3Q = 0;
                                while (1) {
                                    E3Q = ($Int32Array_h1Q[b3Q + 4 >> 2] & -8) - L3Q | 0;
                                    if (E3Q >>> 0 < C3Q >>> 0)
                                        if (!E3Q) {
                                            e3Q = b3Q;
                                            C3Q = 0;
                                            z7Q = 65;
                                            break a;
                                        }
                                        else {
                                            e3Q = b3Q;
                                            C3Q = E3Q;
                                        }
                                    z7Q = $Int32Array_h1Q[b3Q + 20 >> 2] | 0;
                                    b3Q = $Int32Array_h1Q[b3Q + 16 + (F3Q >>> 31 << 2) >> 2] | 0;
                                    r3Q = (z7Q | 0) == 0 | (z7Q | 0) == (b3Q | 0) ? r3Q : z7Q;
                                    if (!b3Q) {
                                        b3Q = r3Q;
                                        z7Q = 61;
                                        break;
                                    }
                                    else
                                        F3Q = F3Q << 1;
                                }
                            }
                        } while (0);
                        if ((z7Q | 0) == 61) {
                            if ((b3Q | 0) == 0 & (e3Q | 0) == 0) {
                                e3Q = 2 << B3Q;
                                e3Q = (e3Q | 0 - e3Q) & f3Q;
                                if (!e3Q) {
                                    v3Q = L3Q;
                                    break;
                                }
                                v3Q = (e3Q & 0 - e3Q) + -1 | 0;
                                E3Q = v3Q >>> 12 & 16;
                                v3Q = v3Q >>> E3Q;
                                r3Q = v3Q >>> 5 & 8;
                                v3Q = v3Q >>> r3Q;
                                F3Q = v3Q >>> 2 & 4;
                                v3Q = v3Q >>> F3Q;
                                B3Q = v3Q >>> 1 & 2;
                                v3Q = v3Q >>> B3Q;
                                b3Q = v3Q >>> 1 & 1;
                                e3Q = 0;
                                b3Q = $Int32Array_h1Q[2128 + ((r3Q | E3Q | F3Q | B3Q | b3Q) + (v3Q >>> b3Q) << 2) >> 2] | 0;
                            }
                            if (!b3Q) {
                                F3Q = e3Q;
                                E3Q = C3Q;
                            }
                            else
                                z7Q = 65;
                        }
                        if ((z7Q | 0) == 65) {
                            r3Q = b3Q;
                            while (1) {
                                v3Q = ($Int32Array_h1Q[r3Q + 4 >> 2] & -8) - L3Q | 0;
                                b3Q = v3Q >>> 0 < C3Q >>> 0;
                                C3Q = b3Q ? v3Q : C3Q;
                                e3Q = b3Q ? r3Q : e3Q;
                                b3Q = $Int32Array_h1Q[r3Q + 16 >> 2] | 0;
                                if (!b3Q)
                                    b3Q = $Int32Array_h1Q[r3Q + 20 >> 2] | 0;
                                if (!b3Q) {
                                    F3Q = e3Q;
                                    E3Q = C3Q;
                                    break;
                                }
                                else
                                    r3Q = b3Q;
                            }
                        }
                        if (((F3Q | 0) != 0 ? E3Q >>> 0 < (($Int32Array_h1Q[458] | 0) - L3Q | 0) >>> 0 : 0) ? (l7Q = F3Q + L3Q | 0, l7Q >>> 0 > F3Q >>> 0) : 0) {
                            r3Q = $Int32Array_h1Q[F3Q + 24 >> 2] | 0;
                            T3Q = $Int32Array_h1Q[F3Q + 12 >> 2] | 0;
                            do {
                                if ((T3Q | 0) == (F3Q | 0)) {
                                    e3Q = F3Q + 20 | 0;
                                    T3Q = $Int32Array_h1Q[e3Q >> 2] | 0;
                                    if (!T3Q) {
                                        e3Q = F3Q + 16 | 0;
                                        T3Q = $Int32Array_h1Q[e3Q >> 2] | 0;
                                        if (!T3Q) {
                                            T3Q = 0;
                                            break;
                                        }
                                    }
                                    while (1) {
                                        C3Q = T3Q + 20 | 0;
                                        b3Q = $Int32Array_h1Q[C3Q >> 2] | 0;
                                        if (!b3Q) {
                                            C3Q = T3Q + 16 | 0;
                                            b3Q = $Int32Array_h1Q[C3Q >> 2] | 0;
                                            if (!b3Q)
                                                break;
                                            else {
                                                T3Q = b3Q;
                                                e3Q = C3Q;
                                            }
                                        }
                                        else {
                                            T3Q = b3Q;
                                            e3Q = C3Q;
                                        }
                                    }
                                    $Int32Array_h1Q[e3Q >> 2] = 0;
                                }
                                else {
                                    a3Q = $Int32Array_h1Q[F3Q + 8 >> 2] | 0;
                                    $Int32Array_h1Q[a3Q + 12 >> 2] = T3Q;
                                    $Int32Array_h1Q[T3Q + 8 >> 2] = a3Q;
                                }
                            } while (0);
                            do {
                                if (r3Q) {
                                    e3Q = $Int32Array_h1Q[F3Q + 28 >> 2] | 0;
                                    b3Q = 2128 + (e3Q << 2) | 0;
                                    if ((F3Q | 0) == ($Int32Array_h1Q[b3Q >> 2] | 0)) {
                                        $Int32Array_h1Q[b3Q >> 2] = T3Q;
                                        if (!T3Q) {
                                            f3Q = f3Q & ~(1 << e3Q);
                                            $Int32Array_h1Q[457] = f3Q;
                                            break;
                                        }
                                    }
                                    else {
                                        a3Q = r3Q + 16 | 0;
                                        $Int32Array_h1Q[(($Int32Array_h1Q[a3Q >> 2] | 0) == (F3Q | 0) ? a3Q : r3Q + 20 | 0) >> 2] = T3Q;
                                        if (!T3Q)
                                            break;
                                    }
                                    $Int32Array_h1Q[T3Q + 24 >> 2] = r3Q;
                                    e3Q = $Int32Array_h1Q[F3Q + 16 >> 2] | 0;
                                    if (e3Q | 0) {
                                        $Int32Array_h1Q[T3Q + 16 >> 2] = e3Q;
                                        $Int32Array_h1Q[e3Q + 24 >> 2] = T3Q;
                                    }
                                    e3Q = $Int32Array_h1Q[F3Q + 20 >> 2] | 0;
                                    if (e3Q) {
                                        $Int32Array_h1Q[T3Q + 20 >> 2] = e3Q;
                                        $Int32Array_h1Q[e3Q + 24 >> 2] = T3Q;
                                    }
                                }
                            } while (0);
                            a: do {
                                if (E3Q >>> 0 < 16) {
                                    a3Q = E3Q + L3Q | 0;
                                    $Int32Array_h1Q[F3Q + 4 >> 2] = a3Q | 3;
                                    a3Q = F3Q + a3Q + 4 | 0;
                                    $Int32Array_h1Q[a3Q >> 2] = $Int32Array_h1Q[a3Q >> 2] | 1;
                                }
                                else {
                                    $Int32Array_h1Q[F3Q + 4 >> 2] = L3Q | 3;
                                    $Int32Array_h1Q[l7Q + 4 >> 2] = E3Q | 1;
                                    $Int32Array_h1Q[l7Q + E3Q >> 2] = E3Q;
                                    T3Q = E3Q >>> 3;
                                    if (E3Q >>> 0 < 256) {
                                        b3Q = 1864 + (T3Q << 1 << 2) | 0;
                                        e3Q = $Int32Array_h1Q[456] | 0;
                                        T3Q = 1 << T3Q;
                                        if (!(e3Q & T3Q)) {
                                            $Int32Array_h1Q[456] = e3Q | T3Q;
                                            T3Q = b3Q;
                                            e3Q = b3Q + 8 | 0;
                                        }
                                        else {
                                            e3Q = b3Q + 8 | 0;
                                            T3Q = $Int32Array_h1Q[e3Q >> 2] | 0;
                                        }
                                        $Int32Array_h1Q[e3Q >> 2] = l7Q;
                                        $Int32Array_h1Q[T3Q + 12 >> 2] = l7Q;
                                        $Int32Array_h1Q[l7Q + 8 >> 2] = T3Q;
                                        $Int32Array_h1Q[l7Q + 12 >> 2] = b3Q;
                                        break;
                                    }
                                    T3Q = E3Q >>> 8;
                                    if (T3Q) {
                                        if (E3Q >>> 0 > 16777215)
                                            b3Q = 31;
                                        else {
                                            Q7Q = (T3Q + 1048320 | 0) >>> 16 & 8;
                                            a3Q = T3Q << Q7Q;
                                            W7Q = (a3Q + 520192 | 0) >>> 16 & 4;
                                            a3Q = a3Q << W7Q;
                                            b3Q = (a3Q + 245760 | 0) >>> 16 & 2;
                                            b3Q = 14 - (W7Q | Q7Q | b3Q) + (a3Q << b3Q >>> 15) | 0;
                                            b3Q = E3Q >>> (b3Q + 7 | 0) & 1 | b3Q << 1;
                                        }
                                    }
                                    else
                                        b3Q = 0;
                                    T3Q = 2128 + (b3Q << 2) | 0;
                                    $Int32Array_h1Q[l7Q + 28 >> 2] = b3Q;
                                    e3Q = l7Q + 16 | 0;
                                    $Int32Array_h1Q[e3Q + 4 >> 2] = 0;
                                    $Int32Array_h1Q[e3Q >> 2] = 0;
                                    e3Q = 1 << b3Q;
                                    if (!(f3Q & e3Q)) {
                                        $Int32Array_h1Q[457] = f3Q | e3Q;
                                        $Int32Array_h1Q[T3Q >> 2] = l7Q;
                                        $Int32Array_h1Q[l7Q + 24 >> 2] = T3Q;
                                        $Int32Array_h1Q[l7Q + 12 >> 2] = l7Q;
                                        $Int32Array_h1Q[l7Q + 8 >> 2] = l7Q;
                                        break;
                                    }
                                    T3Q = $Int32Array_h1Q[T3Q >> 2] | 0;
                                    b: do {
                                        if (($Int32Array_h1Q[T3Q + 4 >> 2] & -8 | 0) != (E3Q | 0)) {
                                            f3Q = E3Q << ((b3Q | 0) == 31 ? 0 : 25 - (b3Q >>> 1) | 0);
                                            while (1) {
                                                b3Q = T3Q + 16 + (f3Q >>> 31 << 2) | 0;
                                                e3Q = $Int32Array_h1Q[b3Q >> 2] | 0;
                                                if (!e3Q)
                                                    break;
                                                if (($Int32Array_h1Q[e3Q + 4 >> 2] & -8 | 0) == (E3Q | 0)) {
                                                    T3Q = e3Q;
                                                    break b;
                                                }
                                                else {
                                                    f3Q = f3Q << 1;
                                                    T3Q = e3Q;
                                                }
                                            }
                                            $Int32Array_h1Q[b3Q >> 2] = l7Q;
                                            $Int32Array_h1Q[l7Q + 24 >> 2] = T3Q;
                                            $Int32Array_h1Q[l7Q + 12 >> 2] = l7Q;
                                            $Int32Array_h1Q[l7Q + 8 >> 2] = l7Q;
                                            break a;
                                        }
                                    } while (0);
                                    Q7Q = T3Q + 8 | 0;
                                    a3Q = $Int32Array_h1Q[Q7Q >> 2] | 0;
                                    $Int32Array_h1Q[a3Q + 12 >> 2] = l7Q;
                                    $Int32Array_h1Q[Q7Q >> 2] = l7Q;
                                    $Int32Array_h1Q[l7Q + 8 >> 2] = a3Q;
                                    $Int32Array_h1Q[l7Q + 12 >> 2] = T3Q;
                                    $Int32Array_h1Q[l7Q + 24 >> 2] = 0;
                                }
                            } while (0);
                            a3Q = F3Q + 8 | 0;
                            $STACKTOP = g7Q;
                            return a3Q | 0;
                        }
                        else
                            v3Q = L3Q;
                    }
                    else
                        v3Q = L3Q;
                }
                else
                    v3Q = -1;
            } while (0);
            b3Q = $Int32Array_h1Q[458] | 0;
            if (b3Q >>> 0 >= v3Q >>> 0) {
                T3Q = b3Q - v3Q | 0;
                e3Q = $Int32Array_h1Q[461] | 0;
                if (T3Q >>> 0 > 15) {
                    a3Q = e3Q + v3Q | 0;
                    $Int32Array_h1Q[461] = a3Q;
                    $Int32Array_h1Q[458] = T3Q;
                    $Int32Array_h1Q[a3Q + 4 >> 2] = T3Q | 1;
                    $Int32Array_h1Q[e3Q + b3Q >> 2] = T3Q;
                    $Int32Array_h1Q[e3Q + 4 >> 2] = v3Q | 3;
                }
                else {
                    $Int32Array_h1Q[458] = 0;
                    $Int32Array_h1Q[461] = 0;
                    $Int32Array_h1Q[e3Q + 4 >> 2] = b3Q | 3;
                    a3Q = e3Q + b3Q + 4 | 0;
                    $Int32Array_h1Q[a3Q >> 2] = $Int32Array_h1Q[a3Q >> 2] | 1;
                }
                a3Q = e3Q + 8 | 0;
                $STACKTOP = g7Q;
                return a3Q | 0;
            }
            E3Q = $Int32Array_h1Q[459] | 0;
            if (E3Q >>> 0 > v3Q >>> 0) {
                W7Q = E3Q - v3Q | 0;
                $Int32Array_h1Q[459] = W7Q;
                a3Q = $Int32Array_h1Q[462] | 0;
                Q7Q = a3Q + v3Q | 0;
                $Int32Array_h1Q[462] = Q7Q;
                $Int32Array_h1Q[Q7Q + 4 >> 2] = W7Q | 1;
                $Int32Array_h1Q[a3Q + 4 >> 2] = v3Q | 3;
                a3Q = a3Q + 8 | 0;
                $STACKTOP = g7Q;
                return a3Q | 0;
            }
            if (!($Int32Array_h1Q[574] | 0)) {
                $Int32Array_h1Q[576] = 4096;
                $Int32Array_h1Q[575] = 4096;
                $Int32Array_h1Q[577] = -1;
                $Int32Array_h1Q[578] = -1;
                $Int32Array_h1Q[579] = 0;
                $Int32Array_h1Q[567] = 0;
                $Int32Array_h1Q[574] = R7Q & -16 ^ 1431655768;
                e3Q = 4096;
            }
            else
                e3Q = $Int32Array_h1Q[576] | 0;
            F3Q = v3Q + 48 | 0;
            B3Q = v3Q + 47 | 0;
            r3Q = e3Q + B3Q | 0;
            C3Q = 0 - e3Q | 0;
            L3Q = r3Q & C3Q;
            if (L3Q >>> 0 <= v3Q >>> 0) {
                a3Q = 0;
                $STACKTOP = g7Q;
                return a3Q | 0;
            }
            e3Q = $Int32Array_h1Q[566] | 0;
            if (e3Q | 0 ? (l7Q = $Int32Array_h1Q[564] | 0, R7Q = l7Q + L3Q | 0, R7Q >>> 0 <= l7Q >>> 0 | R7Q >>> 0 > e3Q >>> 0) : 0) {
                a3Q = 0;
                $STACKTOP = g7Q;
                return a3Q | 0;
            }
            a: do {
                if (!($Int32Array_h1Q[567] & 4)) {
                    b3Q = $Int32Array_h1Q[462] | 0;
                    b: do {
                        if (b3Q) {
                            f3Q = 2272;
                            while (1) {
                                R7Q = $Int32Array_h1Q[f3Q >> 2] | 0;
                                if (R7Q >>> 0 <= b3Q >>> 0 ? (R7Q + ($Int32Array_h1Q[f3Q + 4 >> 2] | 0) | 0) >>> 0 > b3Q >>> 0 : 0)
                                    break;
                                e3Q = $Int32Array_h1Q[f3Q + 8 >> 2] | 0;
                                if (!e3Q) {
                                    z7Q = 128;
                                    break b;
                                }
                                else
                                    f3Q = e3Q;
                            }
                            T3Q = r3Q - E3Q & C3Q;
                            if (T3Q >>> 0 < 2147483647) {
                                e3Q = $_sbrk(T3Q | 0) | 0;
                                if ((e3Q | 0) == (($Int32Array_h1Q[f3Q >> 2] | 0) + ($Int32Array_h1Q[f3Q + 4 >> 2] | 0) | 0)) {
                                    if ((e3Q | 0) != (-1 | 0)) {
                                        E3Q = T3Q;
                                        r3Q = e3Q;
                                        z7Q = 145;
                                        break a;
                                    }
                                }
                                else {
                                    f3Q = e3Q;
                                    z7Q = 136;
                                }
                            }
                            else
                                T3Q = 0;
                        }
                        else
                            z7Q = 128;
                    } while (0);
                    do {
                        if ((z7Q | 0) == 128) {
                            b3Q = $_sbrk(0) | 0;
                            if ((b3Q | 0) != (-1 | 0) ? (T3Q = b3Q, D7Q = $Int32Array_h1Q[575] | 0, w7Q = D7Q + -1 | 0, T3Q = ((w7Q & T3Q | 0) == 0 ? 0 : (w7Q + T3Q & 0 - D7Q) - T3Q | 0) + L3Q | 0, D7Q = $Int32Array_h1Q[564] | 0, w7Q = T3Q + D7Q | 0, T3Q >>> 0 > v3Q >>> 0 & T3Q >>> 0 < 2147483647) : 0) {
                                R7Q = $Int32Array_h1Q[566] | 0;
                                if (R7Q | 0 ? w7Q >>> 0 <= D7Q >>> 0 | w7Q >>> 0 > R7Q >>> 0 : 0) {
                                    T3Q = 0;
                                    break;
                                }
                                e3Q = $_sbrk(T3Q | 0) | 0;
                                if ((e3Q | 0) == (b3Q | 0)) {
                                    E3Q = T3Q;
                                    r3Q = b3Q;
                                    z7Q = 145;
                                    break a;
                                }
                                else {
                                    f3Q = e3Q;
                                    z7Q = 136;
                                }
                            }
                            else
                                T3Q = 0;
                        }
                    } while (0);
                    do {
                        if ((z7Q | 0) == 136) {
                            b3Q = 0 - T3Q | 0;
                            if (!(F3Q >>> 0 > T3Q >>> 0 & (T3Q >>> 0 < 2147483647 & (f3Q | 0) != (-1 | 0))))
                                if ((f3Q | 0) == (-1 | 0)) {
                                    T3Q = 0;
                                    break;
                                }
                                else {
                                    E3Q = T3Q;
                                    r3Q = f3Q;
                                    z7Q = 145;
                                    break a;
                                }
                            e3Q = $Int32Array_h1Q[576] | 0;
                            e3Q = B3Q - T3Q + e3Q & 0 - e3Q;
                            if (e3Q >>> 0 >= 2147483647) {
                                E3Q = T3Q;
                                r3Q = f3Q;
                                z7Q = 145;
                                break a;
                            }
                            if (($_sbrk(e3Q | 0) | 0) == (-1 | 0)) {
                                $_sbrk(b3Q | 0) | 0;
                                T3Q = 0;
                                break;
                            }
                            else {
                                E3Q = e3Q + T3Q | 0;
                                r3Q = f3Q;
                                z7Q = 145;
                                break a;
                            }
                        }
                    } while (0);
                    $Int32Array_h1Q[567] = $Int32Array_h1Q[567] | 4;
                    z7Q = 143;
                }
                else {
                    T3Q = 0;
                    z7Q = 143;
                }
            } while (0);
            if (((z7Q | 0) == 143 ? L3Q >>> 0 < 2147483647 : 0) ? (W7Q = $_sbrk(L3Q | 0) | 0, w7Q = $_sbrk(0) | 0, K7Q = w7Q - W7Q | 0, m7Q = K7Q >>> 0 > (v3Q + 40 | 0) >>> 0, !((W7Q | 0) == (-1 | 0) | m7Q ^ 1 | W7Q >>> 0 < w7Q >>> 0 & ((W7Q | 0) != (-1 | 0) & (w7Q | 0) != (-1 | 0)) ^ 1)) : 0) {
                E3Q = m7Q ? K7Q : T3Q;
                r3Q = W7Q;
                z7Q = 145;
            }
            if ((z7Q | 0) == 145) {
                T3Q = ($Int32Array_h1Q[564] | 0) + E3Q | 0;
                $Int32Array_h1Q[564] = T3Q;
                if (T3Q >>> 0 > ($Int32Array_h1Q[565] | 0) >>> 0)
                    $Int32Array_h1Q[565] = T3Q;
                B3Q = $Int32Array_h1Q[462] | 0;
                b: do {
                    if (B3Q) {
                        T3Q = 2272;
                        while (1) {
                            e3Q = $Int32Array_h1Q[T3Q >> 2] | 0;
                            b3Q = $Int32Array_h1Q[T3Q + 4 >> 2] | 0;
                            if ((r3Q | 0) == (e3Q + b3Q | 0)) {
                                z7Q = 154;
                                break;
                            }
                            f3Q = $Int32Array_h1Q[T3Q + 8 >> 2] | 0;
                            if (!f3Q)
                                break;
                            else
                                T3Q = f3Q;
                        }
                        if (((z7Q | 0) == 154 ? (Q7Q = T3Q + 4 | 0, ($Int32Array_h1Q[T3Q + 12 >> 2] & 8 | 0) == 0) : 0) ? r3Q >>> 0 > B3Q >>> 0 & e3Q >>> 0 <= B3Q >>> 0 : 0) {
                            $Int32Array_h1Q[Q7Q >> 2] = b3Q + E3Q;
                            a3Q = ($Int32Array_h1Q[459] | 0) + E3Q | 0;
                            W7Q = B3Q + 8 | 0;
                            W7Q = (W7Q & 7 | 0) == 0 ? 0 : 0 - W7Q & 7;
                            Q7Q = B3Q + W7Q | 0;
                            W7Q = a3Q - W7Q | 0;
                            $Int32Array_h1Q[462] = Q7Q;
                            $Int32Array_h1Q[459] = W7Q;
                            $Int32Array_h1Q[Q7Q + 4 >> 2] = W7Q | 1;
                            $Int32Array_h1Q[B3Q + a3Q + 4 >> 2] = 40;
                            $Int32Array_h1Q[463] = $Int32Array_h1Q[578];
                            break;
                        }
                        if (r3Q >>> 0 < ($Int32Array_h1Q[460] | 0) >>> 0)
                            $Int32Array_h1Q[460] = r3Q;
                        b3Q = r3Q + E3Q | 0;
                        T3Q = 2272;
                        while (1) {
                            if (($Int32Array_h1Q[T3Q >> 2] | 0) == (b3Q | 0)) {
                                z7Q = 162;
                                break;
                            }
                            e3Q = $Int32Array_h1Q[T3Q + 8 >> 2] | 0;
                            if (!e3Q)
                                break;
                            else
                                T3Q = e3Q;
                        }
                        if ((z7Q | 0) == 162 ? ($Int32Array_h1Q[T3Q + 12 >> 2] & 8 | 0) == 0 : 0) {
                            $Int32Array_h1Q[T3Q >> 2] = r3Q;
                            l7Q = T3Q + 4 | 0;
                            $Int32Array_h1Q[l7Q >> 2] = ($Int32Array_h1Q[l7Q >> 2] | 0) + E3Q;
                            l7Q = r3Q + 8 | 0;
                            l7Q = r3Q + ((l7Q & 7 | 0) == 0 ? 0 : 0 - l7Q & 7) | 0;
                            T3Q = b3Q + 8 | 0;
                            T3Q = b3Q + ((T3Q & 7 | 0) == 0 ? 0 : 0 - T3Q & 7) | 0;
                            L3Q = l7Q + v3Q | 0;
                            F3Q = T3Q - l7Q - v3Q | 0;
                            $Int32Array_h1Q[l7Q + 4 >> 2] = v3Q | 3;
                            c: do {
                                if ((B3Q | 0) == (T3Q | 0)) {
                                    a3Q = ($Int32Array_h1Q[459] | 0) + F3Q | 0;
                                    $Int32Array_h1Q[459] = a3Q;
                                    $Int32Array_h1Q[462] = L3Q;
                                    $Int32Array_h1Q[L3Q + 4 >> 2] = a3Q | 1;
                                }
                                else {
                                    if (($Int32Array_h1Q[461] | 0) == (T3Q | 0)) {
                                        a3Q = ($Int32Array_h1Q[458] | 0) + F3Q | 0;
                                        $Int32Array_h1Q[458] = a3Q;
                                        $Int32Array_h1Q[461] = L3Q;
                                        $Int32Array_h1Q[L3Q + 4 >> 2] = a3Q | 1;
                                        $Int32Array_h1Q[L3Q + a3Q >> 2] = a3Q;
                                        break;
                                    }
                                    e3Q = $Int32Array_h1Q[T3Q + 4 >> 2] | 0;
                                    if ((e3Q & 3 | 0) == 1) {
                                        E3Q = e3Q & -8;
                                        f3Q = e3Q >>> 3;
                                        a: do {
                                            if (e3Q >>> 0 < 256) {
                                                e3Q = $Int32Array_h1Q[T3Q + 8 >> 2] | 0;
                                                b3Q = $Int32Array_h1Q[T3Q + 12 >> 2] | 0;
                                                if ((b3Q | 0) == (e3Q | 0)) {
                                                    $Int32Array_h1Q[456] = $Int32Array_h1Q[456] & ~(1 << f3Q);
                                                    break;
                                                }
                                                else {
                                                    $Int32Array_h1Q[e3Q + 12 >> 2] = b3Q;
                                                    $Int32Array_h1Q[b3Q + 8 >> 2] = e3Q;
                                                    break;
                                                }
                                            }
                                            else {
                                                r3Q = $Int32Array_h1Q[T3Q + 24 >> 2] | 0;
                                                e3Q = $Int32Array_h1Q[T3Q + 12 >> 2] | 0;
                                                do {
                                                    if ((e3Q | 0) == (T3Q | 0)) {
                                                        b3Q = T3Q + 16 | 0;
                                                        f3Q = b3Q + 4 | 0;
                                                        e3Q = $Int32Array_h1Q[f3Q >> 2] | 0;
                                                        if (!e3Q) {
                                                            e3Q = $Int32Array_h1Q[b3Q >> 2] | 0;
                                                            if (!e3Q) {
                                                                e3Q = 0;
                                                                break;
                                                            }
                                                        }
                                                        else
                                                            b3Q = f3Q;
                                                        while (1) {
                                                            C3Q = e3Q + 20 | 0;
                                                            f3Q = $Int32Array_h1Q[C3Q >> 2] | 0;
                                                            if (!f3Q) {
                                                                C3Q = e3Q + 16 | 0;
                                                                f3Q = $Int32Array_h1Q[C3Q >> 2] | 0;
                                                                if (!f3Q)
                                                                    break;
                                                                else {
                                                                    e3Q = f3Q;
                                                                    b3Q = C3Q;
                                                                }
                                                            }
                                                            else {
                                                                e3Q = f3Q;
                                                                b3Q = C3Q;
                                                            }
                                                        }
                                                        $Int32Array_h1Q[b3Q >> 2] = 0;
                                                    }
                                                    else {
                                                        a3Q = $Int32Array_h1Q[T3Q + 8 >> 2] | 0;
                                                        $Int32Array_h1Q[a3Q + 12 >> 2] = e3Q;
                                                        $Int32Array_h1Q[e3Q + 8 >> 2] = a3Q;
                                                    }
                                                } while (0);
                                                if (!r3Q)
                                                    break;
                                                b3Q = $Int32Array_h1Q[T3Q + 28 >> 2] | 0;
                                                f3Q = 2128 + (b3Q << 2) | 0;
                                                do {
                                                    if (($Int32Array_h1Q[f3Q >> 2] | 0) != (T3Q | 0)) {
                                                        a3Q = r3Q + 16 | 0;
                                                        $Int32Array_h1Q[(($Int32Array_h1Q[a3Q >> 2] | 0) == (T3Q | 0) ? a3Q : r3Q + 20 | 0) >> 2] = e3Q;
                                                        if (!e3Q)
                                                            break a;
                                                    }
                                                    else {
                                                        $Int32Array_h1Q[f3Q >> 2] = e3Q;
                                                        if (e3Q | 0)
                                                            break;
                                                        $Int32Array_h1Q[457] = $Int32Array_h1Q[457] & ~(1 << b3Q);
                                                        break a;
                                                    }
                                                } while (0);
                                                $Int32Array_h1Q[e3Q + 24 >> 2] = r3Q;
                                                b3Q = T3Q + 16 | 0;
                                                f3Q = $Int32Array_h1Q[b3Q >> 2] | 0;
                                                if (f3Q | 0) {
                                                    $Int32Array_h1Q[e3Q + 16 >> 2] = f3Q;
                                                    $Int32Array_h1Q[f3Q + 24 >> 2] = e3Q;
                                                }
                                                b3Q = $Int32Array_h1Q[b3Q + 4 >> 2] | 0;
                                                if (!b3Q)
                                                    break;
                                                $Int32Array_h1Q[e3Q + 20 >> 2] = b3Q;
                                                $Int32Array_h1Q[b3Q + 24 >> 2] = e3Q;
                                            }
                                        } while (0);
                                        T3Q = T3Q + E3Q | 0;
                                        C3Q = E3Q + F3Q | 0;
                                    }
                                    else
                                        C3Q = F3Q;
                                    T3Q = T3Q + 4 | 0;
                                    $Int32Array_h1Q[T3Q >> 2] = $Int32Array_h1Q[T3Q >> 2] & -2;
                                    $Int32Array_h1Q[L3Q + 4 >> 2] = C3Q | 1;
                                    $Int32Array_h1Q[L3Q + C3Q >> 2] = C3Q;
                                    T3Q = C3Q >>> 3;
                                    if (C3Q >>> 0 < 256) {
                                        b3Q = 1864 + (T3Q << 1 << 2) | 0;
                                        e3Q = $Int32Array_h1Q[456] | 0;
                                        T3Q = 1 << T3Q;
                                        if (!(e3Q & T3Q)) {
                                            $Int32Array_h1Q[456] = e3Q | T3Q;
                                            T3Q = b3Q;
                                            e3Q = b3Q + 8 | 0;
                                        }
                                        else {
                                            e3Q = b3Q + 8 | 0;
                                            T3Q = $Int32Array_h1Q[e3Q >> 2] | 0;
                                        }
                                        $Int32Array_h1Q[e3Q >> 2] = L3Q;
                                        $Int32Array_h1Q[T3Q + 12 >> 2] = L3Q;
                                        $Int32Array_h1Q[L3Q + 8 >> 2] = T3Q;
                                        $Int32Array_h1Q[L3Q + 12 >> 2] = b3Q;
                                        break;
                                    }
                                    T3Q = C3Q >>> 8;
                                    do {
                                        if (!T3Q)
                                            f3Q = 0;
                                        else {
                                            if (C3Q >>> 0 > 16777215) {
                                                f3Q = 31;
                                                break;
                                            }
                                            Q7Q = (T3Q + 1048320 | 0) >>> 16 & 8;
                                            a3Q = T3Q << Q7Q;
                                            W7Q = (a3Q + 520192 | 0) >>> 16 & 4;
                                            a3Q = a3Q << W7Q;
                                            f3Q = (a3Q + 245760 | 0) >>> 16 & 2;
                                            f3Q = 14 - (W7Q | Q7Q | f3Q) + (a3Q << f3Q >>> 15) | 0;
                                            f3Q = C3Q >>> (f3Q + 7 | 0) & 1 | f3Q << 1;
                                        }
                                    } while (0);
                                    T3Q = 2128 + (f3Q << 2) | 0;
                                    $Int32Array_h1Q[L3Q + 28 >> 2] = f3Q;
                                    e3Q = L3Q + 16 | 0;
                                    $Int32Array_h1Q[e3Q + 4 >> 2] = 0;
                                    $Int32Array_h1Q[e3Q >> 2] = 0;
                                    e3Q = $Int32Array_h1Q[457] | 0;
                                    b3Q = 1 << f3Q;
                                    if (!(e3Q & b3Q)) {
                                        $Int32Array_h1Q[457] = e3Q | b3Q;
                                        $Int32Array_h1Q[T3Q >> 2] = L3Q;
                                        $Int32Array_h1Q[L3Q + 24 >> 2] = T3Q;
                                        $Int32Array_h1Q[L3Q + 12 >> 2] = L3Q;
                                        $Int32Array_h1Q[L3Q + 8 >> 2] = L3Q;
                                        break;
                                    }
                                    T3Q = $Int32Array_h1Q[T3Q >> 2] | 0;
                                    a: do {
                                        if (($Int32Array_h1Q[T3Q + 4 >> 2] & -8 | 0) != (C3Q | 0)) {
                                            f3Q = C3Q << ((f3Q | 0) == 31 ? 0 : 25 - (f3Q >>> 1) | 0);
                                            while (1) {
                                                b3Q = T3Q + 16 + (f3Q >>> 31 << 2) | 0;
                                                e3Q = $Int32Array_h1Q[b3Q >> 2] | 0;
                                                if (!e3Q)
                                                    break;
                                                if (($Int32Array_h1Q[e3Q + 4 >> 2] & -8 | 0) == (C3Q | 0)) {
                                                    T3Q = e3Q;
                                                    break a;
                                                }
                                                else {
                                                    f3Q = f3Q << 1;
                                                    T3Q = e3Q;
                                                }
                                            }
                                            $Int32Array_h1Q[b3Q >> 2] = L3Q;
                                            $Int32Array_h1Q[L3Q + 24 >> 2] = T3Q;
                                            $Int32Array_h1Q[L3Q + 12 >> 2] = L3Q;
                                            $Int32Array_h1Q[L3Q + 8 >> 2] = L3Q;
                                            break c;
                                        }
                                    } while (0);
                                    Q7Q = T3Q + 8 | 0;
                                    a3Q = $Int32Array_h1Q[Q7Q >> 2] | 0;
                                    $Int32Array_h1Q[a3Q + 12 >> 2] = L3Q;
                                    $Int32Array_h1Q[Q7Q >> 2] = L3Q;
                                    $Int32Array_h1Q[L3Q + 8 >> 2] = a3Q;
                                    $Int32Array_h1Q[L3Q + 12 >> 2] = T3Q;
                                    $Int32Array_h1Q[L3Q + 24 >> 2] = 0;
                                }
                            } while (0);
                            a3Q = l7Q + 8 | 0;
                            $STACKTOP = g7Q;
                            return a3Q | 0;
                        }
                        T3Q = 2272;
                        while (1) {
                            e3Q = $Int32Array_h1Q[T3Q >> 2] | 0;
                            if (e3Q >>> 0 <= B3Q >>> 0 ? (a3Q = e3Q + ($Int32Array_h1Q[T3Q + 4 >> 2] | 0) | 0, a3Q >>> 0 > B3Q >>> 0) : 0)
                                break;
                            T3Q = $Int32Array_h1Q[T3Q + 8 >> 2] | 0;
                        }
                        C3Q = a3Q + -47 | 0;
                        e3Q = C3Q + 8 | 0;
                        e3Q = C3Q + ((e3Q & 7 | 0) == 0 ? 0 : 0 - e3Q & 7) | 0;
                        C3Q = B3Q + 16 | 0;
                        e3Q = e3Q >>> 0 < C3Q >>> 0 ? B3Q : e3Q;
                        T3Q = e3Q + 8 | 0;
                        b3Q = E3Q + -40 | 0;
                        W7Q = r3Q + 8 | 0;
                        W7Q = (W7Q & 7 | 0) == 0 ? 0 : 0 - W7Q & 7;
                        Q7Q = r3Q + W7Q | 0;
                        W7Q = b3Q - W7Q | 0;
                        $Int32Array_h1Q[462] = Q7Q;
                        $Int32Array_h1Q[459] = W7Q;
                        $Int32Array_h1Q[Q7Q + 4 >> 2] = W7Q | 1;
                        $Int32Array_h1Q[r3Q + b3Q + 4 >> 2] = 40;
                        $Int32Array_h1Q[463] = $Int32Array_h1Q[578];
                        b3Q = e3Q + 4 | 0;
                        $Int32Array_h1Q[b3Q >> 2] = 27;
                        $Int32Array_h1Q[T3Q >> 2] = $Int32Array_h1Q[568];
                        $Int32Array_h1Q[T3Q + 4 >> 2] = $Int32Array_h1Q[569];
                        $Int32Array_h1Q[T3Q + 8 >> 2] = $Int32Array_h1Q[570];
                        $Int32Array_h1Q[T3Q + 12 >> 2] = $Int32Array_h1Q[571];
                        $Int32Array_h1Q[568] = r3Q;
                        $Int32Array_h1Q[569] = E3Q;
                        $Int32Array_h1Q[571] = 0;
                        $Int32Array_h1Q[570] = T3Q;
                        T3Q = e3Q + 24 | 0;
                        do {
                            Q7Q = T3Q;
                            T3Q = T3Q + 4 | 0;
                            $Int32Array_h1Q[T3Q >> 2] = 7;
                        } while ((Q7Q + 8 | 0) >>> 0 < a3Q >>> 0);
                        if ((e3Q | 0) != (B3Q | 0)) {
                            r3Q = e3Q - B3Q | 0;
                            $Int32Array_h1Q[b3Q >> 2] = $Int32Array_h1Q[b3Q >> 2] & -2;
                            $Int32Array_h1Q[B3Q + 4 >> 2] = r3Q | 1;
                            $Int32Array_h1Q[e3Q >> 2] = r3Q;
                            T3Q = r3Q >>> 3;
                            if (r3Q >>> 0 < 256) {
                                b3Q = 1864 + (T3Q << 1 << 2) | 0;
                                e3Q = $Int32Array_h1Q[456] | 0;
                                T3Q = 1 << T3Q;
                                if (!(e3Q & T3Q)) {
                                    $Int32Array_h1Q[456] = e3Q | T3Q;
                                    T3Q = b3Q;
                                    e3Q = b3Q + 8 | 0;
                                }
                                else {
                                    e3Q = b3Q + 8 | 0;
                                    T3Q = $Int32Array_h1Q[e3Q >> 2] | 0;
                                }
                                $Int32Array_h1Q[e3Q >> 2] = B3Q;
                                $Int32Array_h1Q[T3Q + 12 >> 2] = B3Q;
                                $Int32Array_h1Q[B3Q + 8 >> 2] = T3Q;
                                $Int32Array_h1Q[B3Q + 12 >> 2] = b3Q;
                                break;
                            }
                            T3Q = r3Q >>> 8;
                            if (T3Q) {
                                if (r3Q >>> 0 > 16777215)
                                    f3Q = 31;
                                else {
                                    Q7Q = (T3Q + 1048320 | 0) >>> 16 & 8;
                                    a3Q = T3Q << Q7Q;
                                    W7Q = (a3Q + 520192 | 0) >>> 16 & 4;
                                    a3Q = a3Q << W7Q;
                                    f3Q = (a3Q + 245760 | 0) >>> 16 & 2;
                                    f3Q = 14 - (W7Q | Q7Q | f3Q) + (a3Q << f3Q >>> 15) | 0;
                                    f3Q = r3Q >>> (f3Q + 7 | 0) & 1 | f3Q << 1;
                                }
                            }
                            else
                                f3Q = 0;
                            b3Q = 2128 + (f3Q << 2) | 0;
                            $Int32Array_h1Q[B3Q + 28 >> 2] = f3Q;
                            $Int32Array_h1Q[B3Q + 20 >> 2] = 0;
                            $Int32Array_h1Q[C3Q >> 2] = 0;
                            T3Q = $Int32Array_h1Q[457] | 0;
                            e3Q = 1 << f3Q;
                            if (!(T3Q & e3Q)) {
                                $Int32Array_h1Q[457] = T3Q | e3Q;
                                $Int32Array_h1Q[b3Q >> 2] = B3Q;
                                $Int32Array_h1Q[B3Q + 24 >> 2] = b3Q;
                                $Int32Array_h1Q[B3Q + 12 >> 2] = B3Q;
                                $Int32Array_h1Q[B3Q + 8 >> 2] = B3Q;
                                break;
                            }
                            T3Q = $Int32Array_h1Q[b3Q >> 2] | 0;
                            a: do {
                                if (($Int32Array_h1Q[T3Q + 4 >> 2] & -8 | 0) != (r3Q | 0)) {
                                    f3Q = r3Q << ((f3Q | 0) == 31 ? 0 : 25 - (f3Q >>> 1) | 0);
                                    while (1) {
                                        b3Q = T3Q + 16 + (f3Q >>> 31 << 2) | 0;
                                        e3Q = $Int32Array_h1Q[b3Q >> 2] | 0;
                                        if (!e3Q)
                                            break;
                                        if (($Int32Array_h1Q[e3Q + 4 >> 2] & -8 | 0) == (r3Q | 0)) {
                                            T3Q = e3Q;
                                            break a;
                                        }
                                        else {
                                            f3Q = f3Q << 1;
                                            T3Q = e3Q;
                                        }
                                    }
                                    $Int32Array_h1Q[b3Q >> 2] = B3Q;
                                    $Int32Array_h1Q[B3Q + 24 >> 2] = T3Q;
                                    $Int32Array_h1Q[B3Q + 12 >> 2] = B3Q;
                                    $Int32Array_h1Q[B3Q + 8 >> 2] = B3Q;
                                    break b;
                                }
                            } while (0);
                            Q7Q = T3Q + 8 | 0;
                            a3Q = $Int32Array_h1Q[Q7Q >> 2] | 0;
                            $Int32Array_h1Q[a3Q + 12 >> 2] = B3Q;
                            $Int32Array_h1Q[Q7Q >> 2] = B3Q;
                            $Int32Array_h1Q[B3Q + 8 >> 2] = a3Q;
                            $Int32Array_h1Q[B3Q + 12 >> 2] = T3Q;
                            $Int32Array_h1Q[B3Q + 24 >> 2] = 0;
                        }
                    }
                    else {
                        a3Q = $Int32Array_h1Q[460] | 0;
                        if ((a3Q | 0) == 0 | r3Q >>> 0 < a3Q >>> 0)
                            $Int32Array_h1Q[460] = r3Q;
                        $Int32Array_h1Q[568] = r3Q;
                        $Int32Array_h1Q[569] = E3Q;
                        $Int32Array_h1Q[571] = 0;
                        $Int32Array_h1Q[465] = $Int32Array_h1Q[574];
                        $Int32Array_h1Q[464] = -1;
                        $Int32Array_h1Q[469] = 1864;
                        $Int32Array_h1Q[468] = 1864;
                        $Int32Array_h1Q[471] = 1872;
                        $Int32Array_h1Q[470] = 1872;
                        $Int32Array_h1Q[473] = 1880;
                        $Int32Array_h1Q[472] = 1880;
                        $Int32Array_h1Q[475] = 1888;
                        $Int32Array_h1Q[474] = 1888;
                        $Int32Array_h1Q[477] = 1896;
                        $Int32Array_h1Q[476] = 1896;
                        $Int32Array_h1Q[479] = 1904;
                        $Int32Array_h1Q[478] = 1904;
                        $Int32Array_h1Q[481] = 1912;
                        $Int32Array_h1Q[480] = 1912;
                        $Int32Array_h1Q[483] = 1920;
                        $Int32Array_h1Q[482] = 1920;
                        $Int32Array_h1Q[485] = 1928;
                        $Int32Array_h1Q[484] = 1928;
                        $Int32Array_h1Q[487] = 1936;
                        $Int32Array_h1Q[486] = 1936;
                        $Int32Array_h1Q[489] = 1944;
                        $Int32Array_h1Q[488] = 1944;
                        $Int32Array_h1Q[491] = 1952;
                        $Int32Array_h1Q[490] = 1952;
                        $Int32Array_h1Q[493] = 1960;
                        $Int32Array_h1Q[492] = 1960;
                        $Int32Array_h1Q[495] = 1968;
                        $Int32Array_h1Q[494] = 1968;
                        $Int32Array_h1Q[497] = 1976;
                        $Int32Array_h1Q[496] = 1976;
                        $Int32Array_h1Q[499] = 1984;
                        $Int32Array_h1Q[498] = 1984;
                        $Int32Array_h1Q[501] = 1992;
                        $Int32Array_h1Q[500] = 1992;
                        $Int32Array_h1Q[503] = 2e3;
                        $Int32Array_h1Q[502] = 2e3;
                        $Int32Array_h1Q[505] = 2008;
                        $Int32Array_h1Q[504] = 2008;
                        $Int32Array_h1Q[507] = 2016;
                        $Int32Array_h1Q[506] = 2016;
                        $Int32Array_h1Q[509] = 2024;
                        $Int32Array_h1Q[508] = 2024;
                        $Int32Array_h1Q[511] = 2032;
                        $Int32Array_h1Q[510] = 2032;
                        $Int32Array_h1Q[513] = 2040;
                        $Int32Array_h1Q[512] = 2040;
                        $Int32Array_h1Q[515] = 2048;
                        $Int32Array_h1Q[514] = 2048;
                        $Int32Array_h1Q[517] = 2056;
                        $Int32Array_h1Q[516] = 2056;
                        $Int32Array_h1Q[519] = 2064;
                        $Int32Array_h1Q[518] = 2064;
                        $Int32Array_h1Q[521] = 2072;
                        $Int32Array_h1Q[520] = 2072;
                        $Int32Array_h1Q[523] = 2080;
                        $Int32Array_h1Q[522] = 2080;
                        $Int32Array_h1Q[525] = 2088;
                        $Int32Array_h1Q[524] = 2088;
                        $Int32Array_h1Q[527] = 2096;
                        $Int32Array_h1Q[526] = 2096;
                        $Int32Array_h1Q[529] = 2104;
                        $Int32Array_h1Q[528] = 2104;
                        $Int32Array_h1Q[531] = 2112;
                        $Int32Array_h1Q[530] = 2112;
                        a3Q = E3Q + -40 | 0;
                        W7Q = r3Q + 8 | 0;
                        W7Q = (W7Q & 7 | 0) == 0 ? 0 : 0 - W7Q & 7;
                        Q7Q = r3Q + W7Q | 0;
                        W7Q = a3Q - W7Q | 0;
                        $Int32Array_h1Q[462] = Q7Q;
                        $Int32Array_h1Q[459] = W7Q;
                        $Int32Array_h1Q[Q7Q + 4 >> 2] = W7Q | 1;
                        $Int32Array_h1Q[r3Q + a3Q + 4 >> 2] = 40;
                        $Int32Array_h1Q[463] = $Int32Array_h1Q[578];
                    }
                } while (0);
                T3Q = $Int32Array_h1Q[459] | 0;
                if (T3Q >>> 0 > v3Q >>> 0) {
                    W7Q = T3Q - v3Q | 0;
                    $Int32Array_h1Q[459] = W7Q;
                    a3Q = $Int32Array_h1Q[462] | 0;
                    Q7Q = a3Q + v3Q | 0;
                    $Int32Array_h1Q[462] = Q7Q;
                    $Int32Array_h1Q[Q7Q + 4 >> 2] = W7Q | 1;
                    $Int32Array_h1Q[a3Q + 4 >> 2] = v3Q | 3;
                    a3Q = a3Q + 8 | 0;
                    $STACKTOP = g7Q;
                    return a3Q | 0;
                }
            }
            $Int32Array_h1Q[($___errno_location() | 0) >> 2] = 12;
            a3Q = 0;
            $STACKTOP = g7Q;
            return a3Q | 0;
        }
        function $_free(H7Q) {
            H7Q = H7Q | 0;
            var q7Q = 0, o7Q = 0, O7Q = 0, y7Q = 0, n7Q = 0, J7Q = 0, u7Q = 0, M7Q = 0;
            if (!H7Q)
                return;
            o7Q = H7Q + -8 | 0;
            y7Q = $Int32Array_h1Q[460] | 0;
            H7Q = $Int32Array_h1Q[H7Q + -4 >> 2] | 0;
            q7Q = H7Q & -8;
            M7Q = o7Q + q7Q | 0;
            do {
                if (!(H7Q & 1)) {
                    O7Q = $Int32Array_h1Q[o7Q >> 2] | 0;
                    if (!(H7Q & 3))
                        return;
                    J7Q = o7Q + (0 - O7Q) | 0;
                    n7Q = O7Q + q7Q | 0;
                    if (J7Q >>> 0 < y7Q >>> 0)
                        return;
                    if (($Int32Array_h1Q[461] | 0) == (J7Q | 0)) {
                        H7Q = M7Q + 4 | 0;
                        q7Q = $Int32Array_h1Q[H7Q >> 2] | 0;
                        if ((q7Q & 3 | 0) != 3) {
                            u7Q = J7Q;
                            q7Q = n7Q;
                            break;
                        }
                        $Int32Array_h1Q[458] = n7Q;
                        $Int32Array_h1Q[H7Q >> 2] = q7Q & -2;
                        $Int32Array_h1Q[J7Q + 4 >> 2] = n7Q | 1;
                        $Int32Array_h1Q[J7Q + n7Q >> 2] = n7Q;
                        return;
                    }
                    o7Q = O7Q >>> 3;
                    if (O7Q >>> 0 < 256) {
                        H7Q = $Int32Array_h1Q[J7Q + 8 >> 2] | 0;
                        q7Q = $Int32Array_h1Q[J7Q + 12 >> 2] | 0;
                        if ((q7Q | 0) == (H7Q | 0)) {
                            $Int32Array_h1Q[456] = $Int32Array_h1Q[456] & ~(1 << o7Q);
                            u7Q = J7Q;
                            q7Q = n7Q;
                            break;
                        }
                        else {
                            $Int32Array_h1Q[H7Q + 12 >> 2] = q7Q;
                            $Int32Array_h1Q[q7Q + 8 >> 2] = H7Q;
                            u7Q = J7Q;
                            q7Q = n7Q;
                            break;
                        }
                    }
                    y7Q = $Int32Array_h1Q[J7Q + 24 >> 2] | 0;
                    H7Q = $Int32Array_h1Q[J7Q + 12 >> 2] | 0;
                    do {
                        if ((H7Q | 0) == (J7Q | 0)) {
                            q7Q = J7Q + 16 | 0;
                            o7Q = q7Q + 4 | 0;
                            H7Q = $Int32Array_h1Q[o7Q >> 2] | 0;
                            if (!H7Q) {
                                H7Q = $Int32Array_h1Q[q7Q >> 2] | 0;
                                if (!H7Q) {
                                    H7Q = 0;
                                    break;
                                }
                            }
                            else
                                q7Q = o7Q;
                            while (1) {
                                O7Q = H7Q + 20 | 0;
                                o7Q = $Int32Array_h1Q[O7Q >> 2] | 0;
                                if (!o7Q) {
                                    O7Q = H7Q + 16 | 0;
                                    o7Q = $Int32Array_h1Q[O7Q >> 2] | 0;
                                    if (!o7Q)
                                        break;
                                    else {
                                        H7Q = o7Q;
                                        q7Q = O7Q;
                                    }
                                }
                                else {
                                    H7Q = o7Q;
                                    q7Q = O7Q;
                                }
                            }
                            $Int32Array_h1Q[q7Q >> 2] = 0;
                        }
                        else {
                            u7Q = $Int32Array_h1Q[J7Q + 8 >> 2] | 0;
                            $Int32Array_h1Q[u7Q + 12 >> 2] = H7Q;
                            $Int32Array_h1Q[H7Q + 8 >> 2] = u7Q;
                        }
                    } while (0);
                    if (y7Q) {
                        q7Q = $Int32Array_h1Q[J7Q + 28 >> 2] | 0;
                        o7Q = 2128 + (q7Q << 2) | 0;
                        if (($Int32Array_h1Q[o7Q >> 2] | 0) == (J7Q | 0)) {
                            $Int32Array_h1Q[o7Q >> 2] = H7Q;
                            if (!H7Q) {
                                $Int32Array_h1Q[457] = $Int32Array_h1Q[457] & ~(1 << q7Q);
                                u7Q = J7Q;
                                q7Q = n7Q;
                                break;
                            }
                        }
                        else {
                            u7Q = y7Q + 16 | 0;
                            $Int32Array_h1Q[(($Int32Array_h1Q[u7Q >> 2] | 0) == (J7Q | 0) ? u7Q : y7Q + 20 | 0) >> 2] = H7Q;
                            if (!H7Q) {
                                u7Q = J7Q;
                                q7Q = n7Q;
                                break;
                            }
                        }
                        $Int32Array_h1Q[H7Q + 24 >> 2] = y7Q;
                        q7Q = J7Q + 16 | 0;
                        o7Q = $Int32Array_h1Q[q7Q >> 2] | 0;
                        if (o7Q | 0) {
                            $Int32Array_h1Q[H7Q + 16 >> 2] = o7Q;
                            $Int32Array_h1Q[o7Q + 24 >> 2] = H7Q;
                        }
                        q7Q = $Int32Array_h1Q[q7Q + 4 >> 2] | 0;
                        if (q7Q) {
                            $Int32Array_h1Q[H7Q + 20 >> 2] = q7Q;
                            $Int32Array_h1Q[q7Q + 24 >> 2] = H7Q;
                            u7Q = J7Q;
                            q7Q = n7Q;
                        }
                        else {
                            u7Q = J7Q;
                            q7Q = n7Q;
                        }
                    }
                    else {
                        u7Q = J7Q;
                        q7Q = n7Q;
                    }
                }
                else {
                    u7Q = o7Q;
                    J7Q = o7Q;
                }
            } while (0);
            if (J7Q >>> 0 >= M7Q >>> 0)
                return;
            H7Q = M7Q + 4 | 0;
            O7Q = $Int32Array_h1Q[H7Q >> 2] | 0;
            if (!(O7Q & 1))
                return;
            if (!(O7Q & 2)) {
                if (($Int32Array_h1Q[462] | 0) == (M7Q | 0)) {
                    M7Q = ($Int32Array_h1Q[459] | 0) + q7Q | 0;
                    $Int32Array_h1Q[459] = M7Q;
                    $Int32Array_h1Q[462] = u7Q;
                    $Int32Array_h1Q[u7Q + 4 >> 2] = M7Q | 1;
                    if ((u7Q | 0) != ($Int32Array_h1Q[461] | 0))
                        return;
                    $Int32Array_h1Q[461] = 0;
                    $Int32Array_h1Q[458] = 0;
                    return;
                }
                if (($Int32Array_h1Q[461] | 0) == (M7Q | 0)) {
                    M7Q = ($Int32Array_h1Q[458] | 0) + q7Q | 0;
                    $Int32Array_h1Q[458] = M7Q;
                    $Int32Array_h1Q[461] = J7Q;
                    $Int32Array_h1Q[u7Q + 4 >> 2] = M7Q | 1;
                    $Int32Array_h1Q[J7Q + M7Q >> 2] = M7Q;
                    return;
                }
                y7Q = (O7Q & -8) + q7Q | 0;
                o7Q = O7Q >>> 3;
                do {
                    if (O7Q >>> 0 < 256) {
                        q7Q = $Int32Array_h1Q[M7Q + 8 >> 2] | 0;
                        H7Q = $Int32Array_h1Q[M7Q + 12 >> 2] | 0;
                        if ((H7Q | 0) == (q7Q | 0)) {
                            $Int32Array_h1Q[456] = $Int32Array_h1Q[456] & ~(1 << o7Q);
                            break;
                        }
                        else {
                            $Int32Array_h1Q[q7Q + 12 >> 2] = H7Q;
                            $Int32Array_h1Q[H7Q + 8 >> 2] = q7Q;
                            break;
                        }
                    }
                    else {
                        n7Q = $Int32Array_h1Q[M7Q + 24 >> 2] | 0;
                        H7Q = $Int32Array_h1Q[M7Q + 12 >> 2] | 0;
                        do {
                            if ((H7Q | 0) == (M7Q | 0)) {
                                q7Q = M7Q + 16 | 0;
                                o7Q = q7Q + 4 | 0;
                                H7Q = $Int32Array_h1Q[o7Q >> 2] | 0;
                                if (!H7Q) {
                                    H7Q = $Int32Array_h1Q[q7Q >> 2] | 0;
                                    if (!H7Q) {
                                        o7Q = 0;
                                        break;
                                    }
                                }
                                else
                                    q7Q = o7Q;
                                while (1) {
                                    O7Q = H7Q + 20 | 0;
                                    o7Q = $Int32Array_h1Q[O7Q >> 2] | 0;
                                    if (!o7Q) {
                                        O7Q = H7Q + 16 | 0;
                                        o7Q = $Int32Array_h1Q[O7Q >> 2] | 0;
                                        if (!o7Q)
                                            break;
                                        else {
                                            H7Q = o7Q;
                                            q7Q = O7Q;
                                        }
                                    }
                                    else {
                                        H7Q = o7Q;
                                        q7Q = O7Q;
                                    }
                                }
                                $Int32Array_h1Q[q7Q >> 2] = 0;
                                o7Q = H7Q;
                            }
                            else {
                                o7Q = $Int32Array_h1Q[M7Q + 8 >> 2] | 0;
                                $Int32Array_h1Q[o7Q + 12 >> 2] = H7Q;
                                $Int32Array_h1Q[H7Q + 8 >> 2] = o7Q;
                                o7Q = H7Q;
                            }
                        } while (0);
                        if (n7Q | 0) {
                            H7Q = $Int32Array_h1Q[M7Q + 28 >> 2] | 0;
                            q7Q = 2128 + (H7Q << 2) | 0;
                            if (($Int32Array_h1Q[q7Q >> 2] | 0) == (M7Q | 0)) {
                                $Int32Array_h1Q[q7Q >> 2] = o7Q;
                                if (!o7Q) {
                                    $Int32Array_h1Q[457] = $Int32Array_h1Q[457] & ~(1 << H7Q);
                                    break;
                                }
                            }
                            else {
                                O7Q = n7Q + 16 | 0;
                                $Int32Array_h1Q[(($Int32Array_h1Q[O7Q >> 2] | 0) == (M7Q | 0) ? O7Q : n7Q + 20 | 0) >> 2] = o7Q;
                                if (!o7Q)
                                    break;
                            }
                            $Int32Array_h1Q[o7Q + 24 >> 2] = n7Q;
                            H7Q = M7Q + 16 | 0;
                            q7Q = $Int32Array_h1Q[H7Q >> 2] | 0;
                            if (q7Q | 0) {
                                $Int32Array_h1Q[o7Q + 16 >> 2] = q7Q;
                                $Int32Array_h1Q[q7Q + 24 >> 2] = o7Q;
                            }
                            H7Q = $Int32Array_h1Q[H7Q + 4 >> 2] | 0;
                            if (H7Q | 0) {
                                $Int32Array_h1Q[o7Q + 20 >> 2] = H7Q;
                                $Int32Array_h1Q[H7Q + 24 >> 2] = o7Q;
                            }
                        }
                    }
                } while (0);
                $Int32Array_h1Q[u7Q + 4 >> 2] = y7Q | 1;
                $Int32Array_h1Q[J7Q + y7Q >> 2] = y7Q;
                if ((u7Q | 0) == ($Int32Array_h1Q[461] | 0)) {
                    $Int32Array_h1Q[458] = y7Q;
                    return;
                }
            }
            else {
                $Int32Array_h1Q[H7Q >> 2] = O7Q & -2;
                $Int32Array_h1Q[u7Q + 4 >> 2] = q7Q | 1;
                $Int32Array_h1Q[J7Q + q7Q >> 2] = q7Q;
                y7Q = q7Q;
            }
            H7Q = y7Q >>> 3;
            if (y7Q >>> 0 < 256) {
                o7Q = 1864 + (H7Q << 1 << 2) | 0;
                q7Q = $Int32Array_h1Q[456] | 0;
                H7Q = 1 << H7Q;
                if (!(q7Q & H7Q)) {
                    $Int32Array_h1Q[456] = q7Q | H7Q;
                    H7Q = o7Q;
                    q7Q = o7Q + 8 | 0;
                }
                else {
                    q7Q = o7Q + 8 | 0;
                    H7Q = $Int32Array_h1Q[q7Q >> 2] | 0;
                }
                $Int32Array_h1Q[q7Q >> 2] = u7Q;
                $Int32Array_h1Q[H7Q + 12 >> 2] = u7Q;
                $Int32Array_h1Q[u7Q + 8 >> 2] = H7Q;
                $Int32Array_h1Q[u7Q + 12 >> 2] = o7Q;
                return;
            }
            H7Q = y7Q >>> 8;
            if (H7Q) {
                if (y7Q >>> 0 > 16777215)
                    O7Q = 31;
                else {
                    J7Q = (H7Q + 1048320 | 0) >>> 16 & 8;
                    M7Q = H7Q << J7Q;
                    n7Q = (M7Q + 520192 | 0) >>> 16 & 4;
                    M7Q = M7Q << n7Q;
                    O7Q = (M7Q + 245760 | 0) >>> 16 & 2;
                    O7Q = 14 - (n7Q | J7Q | O7Q) + (M7Q << O7Q >>> 15) | 0;
                    O7Q = y7Q >>> (O7Q + 7 | 0) & 1 | O7Q << 1;
                }
            }
            else
                O7Q = 0;
            H7Q = 2128 + (O7Q << 2) | 0;
            $Int32Array_h1Q[u7Q + 28 >> 2] = O7Q;
            $Int32Array_h1Q[u7Q + 20 >> 2] = 0;
            $Int32Array_h1Q[u7Q + 16 >> 2] = 0;
            q7Q = $Int32Array_h1Q[457] | 0;
            o7Q = 1 << O7Q;
            a: do {
                if (!(q7Q & o7Q)) {
                    $Int32Array_h1Q[457] = q7Q | o7Q;
                    $Int32Array_h1Q[H7Q >> 2] = u7Q;
                    $Int32Array_h1Q[u7Q + 24 >> 2] = H7Q;
                    $Int32Array_h1Q[u7Q + 12 >> 2] = u7Q;
                    $Int32Array_h1Q[u7Q + 8 >> 2] = u7Q;
                }
                else {
                    H7Q = $Int32Array_h1Q[H7Q >> 2] | 0;
                    b: do {
                        if (($Int32Array_h1Q[H7Q + 4 >> 2] & -8 | 0) != (y7Q | 0)) {
                            O7Q = y7Q << ((O7Q | 0) == 31 ? 0 : 25 - (O7Q >>> 1) | 0);
                            while (1) {
                                o7Q = H7Q + 16 + (O7Q >>> 31 << 2) | 0;
                                q7Q = $Int32Array_h1Q[o7Q >> 2] | 0;
                                if (!q7Q)
                                    break;
                                if (($Int32Array_h1Q[q7Q + 4 >> 2] & -8 | 0) == (y7Q | 0)) {
                                    H7Q = q7Q;
                                    break b;
                                }
                                else {
                                    O7Q = O7Q << 1;
                                    H7Q = q7Q;
                                }
                            }
                            $Int32Array_h1Q[o7Q >> 2] = u7Q;
                            $Int32Array_h1Q[u7Q + 24 >> 2] = H7Q;
                            $Int32Array_h1Q[u7Q + 12 >> 2] = u7Q;
                            $Int32Array_h1Q[u7Q + 8 >> 2] = u7Q;
                            break a;
                        }
                    } while (0);
                    J7Q = H7Q + 8 | 0;
                    M7Q = $Int32Array_h1Q[J7Q >> 2] | 0;
                    $Int32Array_h1Q[M7Q + 12 >> 2] = u7Q;
                    $Int32Array_h1Q[J7Q >> 2] = u7Q;
                    $Int32Array_h1Q[u7Q + 8 >> 2] = M7Q;
                    $Int32Array_h1Q[u7Q + 12 >> 2] = H7Q;
                    $Int32Array_h1Q[u7Q + 24 >> 2] = 0;
                }
            } while (0);
            M7Q = ($Int32Array_h1Q[464] | 0) + -1 | 0;
            $Int32Array_h1Q[464] = M7Q;
            if (M7Q | 0)
                return;
            H7Q = 2280;
            while (1) {
                H7Q = $Int32Array_h1Q[H7Q >> 2] | 0;
                if (!H7Q)
                    break;
                else
                    H7Q = H7Q + 8 | 0;
            }
            $Int32Array_h1Q[464] = -1;
            return;
        }
        function V2Q(A7Q) {
            A7Q = A7Q | 0;
            var X7Q = 0, G7Q = 0;
            X7Q = $STACKTOP;
            $STACKTOP = $STACKTOP + 16 | 0;
            if (($STACKTOP | 0) >= ($STACK_MAX | 0))
                $abortStackOverflow(16);
            G7Q = X7Q;
            $Int32Array_h1Q[G7Q >> 2] = a2Q($Int32Array_h1Q[A7Q + 60 >> 2] | 0) | 0;
            A7Q = s1Q($___syscall6(6, G7Q | 0) | 0) | 0;
            $STACKTOP = X7Q;
            return A7Q | 0;
        }
        function L1Q(P7Q, N7Q, t7Q) {
            P7Q = P7Q | 0;
            N7Q = N7Q | 0;
            t7Q = t7Q | 0;
            var p7Q = 0, I7Q = 0, Z7Q = 0, s7Q = 0, i7Q = 0, h7Q = 0, Y7Q = 0, S7Q = 0, d7Q = 0, j7Q = 0, x7Q = 0;
            d7Q = $STACKTOP;
            $STACKTOP = $STACKTOP + 48 | 0;
            if (($STACKTOP | 0) >= ($STACK_MAX | 0))
                $abortStackOverflow(48);
            Y7Q = d7Q + 32 | 0;
            Z7Q = d7Q + 16 | 0;
            I7Q = d7Q;
            i7Q = P7Q + 28 | 0;
            p7Q = $Int32Array_h1Q[i7Q >> 2] | 0;
            $Int32Array_h1Q[I7Q >> 2] = p7Q;
            h7Q = P7Q + 20 | 0;
            p7Q = ($Int32Array_h1Q[h7Q >> 2] | 0) - p7Q | 0;
            $Int32Array_h1Q[I7Q + 4 >> 2] = p7Q;
            $Int32Array_h1Q[I7Q + 8 >> 2] = N7Q;
            $Int32Array_h1Q[I7Q + 12 >> 2] = t7Q;
            p7Q = p7Q + t7Q | 0;
            s7Q = P7Q + 60 | 0;
            $Int32Array_h1Q[Z7Q >> 2] = $Int32Array_h1Q[s7Q >> 2];
            $Int32Array_h1Q[Z7Q + 4 >> 2] = I7Q;
            $Int32Array_h1Q[Z7Q + 8 >> 2] = 2;
            Z7Q = s1Q($___syscall146(146, Z7Q | 0) | 0) | 0;
            a: do {
                if ((p7Q | 0) != (Z7Q | 0)) {
                    N7Q = 2;
                    while (1) {
                        if ((Z7Q | 0) < 0)
                            break;
                        p7Q = p7Q - Z7Q | 0;
                        x7Q = $Int32Array_h1Q[I7Q + 4 >> 2] | 0;
                        j7Q = Z7Q >>> 0 > x7Q >>> 0;
                        I7Q = j7Q ? I7Q + 8 | 0 : I7Q;
                        N7Q = N7Q + (j7Q << 31 >> 31) | 0;
                        x7Q = Z7Q - (j7Q ? x7Q : 0) | 0;
                        $Int32Array_h1Q[I7Q >> 2] = ($Int32Array_h1Q[I7Q >> 2] | 0) + x7Q;
                        j7Q = I7Q + 4 | 0;
                        $Int32Array_h1Q[j7Q >> 2] = ($Int32Array_h1Q[j7Q >> 2] | 0) - x7Q;
                        $Int32Array_h1Q[Y7Q >> 2] = $Int32Array_h1Q[s7Q >> 2];
                        $Int32Array_h1Q[Y7Q + 4 >> 2] = I7Q;
                        $Int32Array_h1Q[Y7Q + 8 >> 2] = N7Q;
                        Z7Q = s1Q($___syscall146(146, Y7Q | 0) | 0) | 0;
                        if ((p7Q | 0) == (Z7Q | 0)) {
                            S7Q = 3;
                            break a;
                        }
                    }
                    $Int32Array_h1Q[P7Q + 16 >> 2] = 0;
                    $Int32Array_h1Q[i7Q >> 2] = 0;
                    $Int32Array_h1Q[h7Q >> 2] = 0;
                    $Int32Array_h1Q[P7Q >> 2] = $Int32Array_h1Q[P7Q >> 2] | 32;
                    if ((N7Q | 0) == 2)
                        t7Q = 0;
                    else
                        t7Q = t7Q - ($Int32Array_h1Q[I7Q + 4 >> 2] | 0) | 0;
                }
                else
                    S7Q = 3;
            } while (0);
            if ((S7Q | 0) == 3) {
                x7Q = $Int32Array_h1Q[P7Q + 44 >> 2] | 0;
                $Int32Array_h1Q[P7Q + 16 >> 2] = x7Q + ($Int32Array_h1Q[P7Q + 48 >> 2] | 0);
                $Int32Array_h1Q[i7Q >> 2] = x7Q;
                $Int32Array_h1Q[h7Q >> 2] = x7Q;
            }
            $STACKTOP = d7Q;
            return t7Q | 0;
        }
        function T2Q(c7Q, T7Q, e7Q) {
            c7Q = c7Q | 0;
            T7Q = T7Q | 0;
            e7Q = e7Q | 0;
            var V7Q = 0, k7Q = 0, U7Q = 0;
            k7Q = $STACKTOP;
            $STACKTOP = $STACKTOP + 32 | 0;
            if (($STACKTOP | 0) >= ($STACK_MAX | 0))
                $abortStackOverflow(32);
            U7Q = k7Q;
            V7Q = k7Q + 20 | 0;
            $Int32Array_h1Q[U7Q >> 2] = $Int32Array_h1Q[c7Q + 60 >> 2];
            $Int32Array_h1Q[U7Q + 4 >> 2] = 0;
            $Int32Array_h1Q[U7Q + 8 >> 2] = T7Q;
            $Int32Array_h1Q[U7Q + 12 >> 2] = V7Q;
            $Int32Array_h1Q[U7Q + 16 >> 2] = e7Q;
            if ((s1Q($___syscall140(140, U7Q | 0) | 0) | 0) < 0) {
                $Int32Array_h1Q[V7Q >> 2] = -1;
                c7Q = -1;
            }
            else
                c7Q = $Int32Array_h1Q[V7Q >> 2] | 0;
            $STACKTOP = k7Q;
            return c7Q | 0;
        }
        function s1Q(b7Q) {
            b7Q = b7Q | 0;
            if (b7Q >>> 0 > 4294963200) {
                $Int32Array_h1Q[($___errno_location() | 0) >> 2] = 0 - b7Q;
                b7Q = -1;
            }
            return b7Q | 0;
        }
        function $___errno_location() {
            return 2320;
        }
        function a2Q(a7Q) {
            a7Q = a7Q | 0;
            return a7Q | 0;
        }
        function f2Q(r7Q, F7Q, L7Q) {
            r7Q = r7Q | 0;
            F7Q = F7Q | 0;
            L7Q = L7Q | 0;
            var f7Q = 0, B7Q = 0;
            B7Q = $STACKTOP;
            $STACKTOP = $STACKTOP + 32 | 0;
            if (($STACKTOP | 0) >= ($STACK_MAX | 0))
                $abortStackOverflow(32);
            f7Q = B7Q;
            $Int32Array_h1Q[r7Q + 36 >> 2] = 3;
            if (($Int32Array_h1Q[r7Q >> 2] & 64 | 0) == 0 ? ($Int32Array_h1Q[f7Q >> 2] = $Int32Array_h1Q[r7Q + 60 >> 2], $Int32Array_h1Q[f7Q + 4 >> 2] = 21523, $Int32Array_h1Q[f7Q + 8 >> 2] = B7Q + 16, $___syscall54(54, f7Q | 0) | 0) : 0)
                $Int8Array_h1Q[r7Q + 75 >> 0] = -1;
            f7Q = L1Q(r7Q, F7Q, L7Q) | 0;
            $STACKTOP = B7Q;
            return f7Q | 0;
        }
        function r2Q() {
            $___lock(2324);
            return 2332;
        }
        function B2Q() {
            $___unlock(2324);
            return;
        }
        function $_fflush(E7Q) {
            E7Q = E7Q | 0;
            var C7Q = 0;
            do {
                if (E7Q) {
                    if (($Int32Array_h1Q[E7Q + 76 >> 2] | 0) <= -1) {
                        C7Q = k1Q(E7Q) | 0;
                        break;
                    }
                    C7Q = k1Q(E7Q) | 0;
                }
                else {
                    if (!($Int32Array_h1Q[195] | 0))
                        C7Q = 0;
                    else
                        C7Q = $_fflush($Int32Array_h1Q[195] | 0) | 0;
                    E7Q = $Int32Array_h1Q[(r2Q() | 0) >> 2] | 0;
                    if (E7Q)
                        do {
                            if (($Int32Array_h1Q[E7Q + 20 >> 2] | 0) >>> 0 > ($Int32Array_h1Q[E7Q + 28 >> 2] | 0) >>> 0)
                                C7Q = k1Q(E7Q) | 0 | C7Q;
                            E7Q = $Int32Array_h1Q[E7Q + 56 >> 2] | 0;
                        } while ((E7Q | 0) != 0);
                    B2Q();
                }
            } while (0);
            return C7Q | 0;
        }
        function k1Q(v7Q) {
            v7Q = v7Q | 0;
            var W4Q = 0, l4Q = 0, Q4Q = 0, z4Q = 0, g4Q = 0, R4Q = 0;
            W4Q = v7Q + 20 | 0;
            R4Q = v7Q + 28 | 0;
            if (($Int32Array_h1Q[W4Q >> 2] | 0) >>> 0 > ($Int32Array_h1Q[R4Q >> 2] | 0) >>> 0 ? (U1Q[$Int32Array_h1Q[v7Q + 36 >> 2] & 3](v7Q, 0, 0) | 0, ($Int32Array_h1Q[W4Q >> 2] | 0) == 0) : 0)
                v7Q = -1;
            else {
                l4Q = v7Q + 4 | 0;
                Q4Q = $Int32Array_h1Q[l4Q >> 2] | 0;
                z4Q = v7Q + 8 | 0;
                g4Q = $Int32Array_h1Q[z4Q >> 2] | 0;
                if (Q4Q >>> 0 < g4Q >>> 0)
                    U1Q[$Int32Array_h1Q[v7Q + 40 >> 2] & 3](v7Q, Q4Q - g4Q | 0, 1) | 0;
                $Int32Array_h1Q[v7Q + 16 >> 2] = 0;
                $Int32Array_h1Q[R4Q >> 2] = 0;
                $Int32Array_h1Q[W4Q >> 2] = 0;
                $Int32Array_h1Q[z4Q >> 2] = 0;
                $Int32Array_h1Q[l4Q >> 2] = 0;
                v7Q = 0;
            }
            return v7Q | 0;
        }
        function $_llvm_bswap_i32_1(w4Q) {
            w4Q = w4Q | 0;
            return $_llvm_bswap_i32_2(w4Q) | 0;
        }
        function $_llvm_bswap_i32_2(D4Q) {
            D4Q = D4Q | 0;
            return $_llvm_bswap_i32(D4Q | 0) | 0;
        }
        function $runPostSets() {
        }
        function $_llvm_bswap_i32(K4Q) {
            K4Q = K4Q | 0;
            return (K4Q & 255) << 24 | (K4Q >> 8 & 255) << 16 | (K4Q >> 16 & 255) << 8 | K4Q >>> 24 | 0;
        }
        function $_memcpy(m4Q, H4Q, q4Q) {
            m4Q = m4Q | 0;
            H4Q = H4Q | 0;
            q4Q = q4Q | 0;
            var O4Q = 0, o4Q = 0, u4Q = 0;
            if ((q4Q | 0) >= 8192)
                return $_emscripten_memcpy_big(m4Q | 0, H4Q | 0, q4Q | 0) | 0;
            u4Q = m4Q | 0;
            o4Q = m4Q + q4Q | 0;
            if ((m4Q & 3) == (H4Q & 3)) {
                while (m4Q & 3) {
                    if (!q4Q)
                        return u4Q | 0;
                    $Int8Array_h1Q[m4Q >> 0] = $Int8Array_h1Q[H4Q >> 0] | 0;
                    m4Q = m4Q + 1 | 0;
                    H4Q = H4Q + 1 | 0;
                    q4Q = q4Q - 1 | 0;
                }
                q4Q = o4Q & -4 | 0;
                O4Q = q4Q - 64 | 0;
                while ((m4Q | 0) <= (O4Q | 0)) {
                    $Int32Array_h1Q[m4Q >> 2] = $Int32Array_h1Q[H4Q >> 2];
                    $Int32Array_h1Q[m4Q + 4 >> 2] = $Int32Array_h1Q[H4Q + 4 >> 2];
                    $Int32Array_h1Q[m4Q + 8 >> 2] = $Int32Array_h1Q[H4Q + 8 >> 2];
                    $Int32Array_h1Q[m4Q + 12 >> 2] = $Int32Array_h1Q[H4Q + 12 >> 2];
                    $Int32Array_h1Q[m4Q + 16 >> 2] = $Int32Array_h1Q[H4Q + 16 >> 2];
                    $Int32Array_h1Q[m4Q + 20 >> 2] = $Int32Array_h1Q[H4Q + 20 >> 2];
                    $Int32Array_h1Q[m4Q + 24 >> 2] = $Int32Array_h1Q[H4Q + 24 >> 2];
                    $Int32Array_h1Q[m4Q + 28 >> 2] = $Int32Array_h1Q[H4Q + 28 >> 2];
                    $Int32Array_h1Q[m4Q + 32 >> 2] = $Int32Array_h1Q[H4Q + 32 >> 2];
                    $Int32Array_h1Q[m4Q + 36 >> 2] = $Int32Array_h1Q[H4Q + 36 >> 2];
                    $Int32Array_h1Q[m4Q + 40 >> 2] = $Int32Array_h1Q[H4Q + 40 >> 2];
                    $Int32Array_h1Q[m4Q + 44 >> 2] = $Int32Array_h1Q[H4Q + 44 >> 2];
                    $Int32Array_h1Q[m4Q + 48 >> 2] = $Int32Array_h1Q[H4Q + 48 >> 2];
                    $Int32Array_h1Q[m4Q + 52 >> 2] = $Int32Array_h1Q[H4Q + 52 >> 2];
                    $Int32Array_h1Q[m4Q + 56 >> 2] = $Int32Array_h1Q[H4Q + 56 >> 2];
                    $Int32Array_h1Q[m4Q + 60 >> 2] = $Int32Array_h1Q[H4Q + 60 >> 2];
                    m4Q = m4Q + 64 | 0;
                    H4Q = H4Q + 64 | 0;
                }
                while ((m4Q | 0) < (q4Q | 0)) {
                    $Int32Array_h1Q[m4Q >> 2] = $Int32Array_h1Q[H4Q >> 2];
                    m4Q = m4Q + 4 | 0;
                    H4Q = H4Q + 4 | 0;
                }
            }
            else {
                q4Q = o4Q - 4 | 0;
                while ((m4Q | 0) < (q4Q | 0)) {
                    $Int8Array_h1Q[m4Q >> 0] = $Int8Array_h1Q[H4Q >> 0] | 0;
                    $Int8Array_h1Q[m4Q + 1 >> 0] = $Int8Array_h1Q[H4Q + 1 >> 0] | 0;
                    $Int8Array_h1Q[m4Q + 2 >> 0] = $Int8Array_h1Q[H4Q + 2 >> 0] | 0;
                    $Int8Array_h1Q[m4Q + 3 >> 0] = $Int8Array_h1Q[H4Q + 3 >> 0] | 0;
                    m4Q = m4Q + 4 | 0;
                    H4Q = H4Q + 4 | 0;
                }
            }
            while ((m4Q | 0) < (o4Q | 0)) {
                $Int8Array_h1Q[m4Q >> 0] = $Int8Array_h1Q[H4Q >> 0] | 0;
                m4Q = m4Q + 1 | 0;
                H4Q = H4Q + 1 | 0;
            }
            return u4Q | 0;
        }
        function $_memmove(M4Q, J4Q, y4Q) {
            M4Q = M4Q | 0;
            J4Q = J4Q | 0;
            y4Q = y4Q | 0;
            var n4Q = 0;
            if ((J4Q | 0) < (M4Q | 0) & (M4Q | 0) < (J4Q + y4Q | 0)) {
                n4Q = M4Q;
                J4Q = J4Q + y4Q | 0;
                M4Q = M4Q + y4Q | 0;
                while ((y4Q | 0) > 0) {
                    M4Q = M4Q - 1 | 0;
                    J4Q = J4Q - 1 | 0;
                    y4Q = y4Q - 1 | 0;
                    $Int8Array_h1Q[M4Q >> 0] = $Int8Array_h1Q[J4Q >> 0] | 0;
                }
                M4Q = n4Q;
            }
            else
                $_memcpy(M4Q, J4Q, y4Q) | 0;
            return M4Q | 0;
        }
        function $_memset(A4Q, G4Q, I4Q) {
            A4Q = A4Q | 0;
            G4Q = G4Q | 0;
            I4Q = I4Q | 0;
            var p4Q = 0, P4Q = 0, Z4Q = 0, X4Q = 0;
            Z4Q = A4Q + I4Q | 0;
            G4Q = G4Q & 255;
            if ((I4Q | 0) >= 67) {
                while (A4Q & 3) {
                    $Int8Array_h1Q[A4Q >> 0] = G4Q;
                    A4Q = A4Q + 1 | 0;
                }
                p4Q = Z4Q & -4 | 0;
                P4Q = p4Q - 64 | 0;
                X4Q = G4Q | G4Q << 8 | G4Q << 16 | G4Q << 24;
                while ((A4Q | 0) <= (P4Q | 0)) {
                    $Int32Array_h1Q[A4Q >> 2] = X4Q;
                    $Int32Array_h1Q[A4Q + 4 >> 2] = X4Q;
                    $Int32Array_h1Q[A4Q + 8 >> 2] = X4Q;
                    $Int32Array_h1Q[A4Q + 12 >> 2] = X4Q;
                    $Int32Array_h1Q[A4Q + 16 >> 2] = X4Q;
                    $Int32Array_h1Q[A4Q + 20 >> 2] = X4Q;
                    $Int32Array_h1Q[A4Q + 24 >> 2] = X4Q;
                    $Int32Array_h1Q[A4Q + 28 >> 2] = X4Q;
                    $Int32Array_h1Q[A4Q + 32 >> 2] = X4Q;
                    $Int32Array_h1Q[A4Q + 36 >> 2] = X4Q;
                    $Int32Array_h1Q[A4Q + 40 >> 2] = X4Q;
                    $Int32Array_h1Q[A4Q + 44 >> 2] = X4Q;
                    $Int32Array_h1Q[A4Q + 48 >> 2] = X4Q;
                    $Int32Array_h1Q[A4Q + 52 >> 2] = X4Q;
                    $Int32Array_h1Q[A4Q + 56 >> 2] = X4Q;
                    $Int32Array_h1Q[A4Q + 60 >> 2] = X4Q;
                    A4Q = A4Q + 64 | 0;
                }
                while ((A4Q | 0) < (p4Q | 0)) {
                    $Int32Array_h1Q[A4Q >> 2] = X4Q;
                    A4Q = A4Q + 4 | 0;
                }
            }
            while ((A4Q | 0) < (Z4Q | 0)) {
                $Int8Array_h1Q[A4Q >> 0] = G4Q;
                A4Q = A4Q + 1 | 0;
            }
            return Z4Q - I4Q | 0;
        }
        function $_sbrk(N4Q) {
            N4Q = N4Q | 0;
            var x4Q = 0, t4Q = 0;
            t4Q = $Int32Array_h1Q[$DYNAMICTOP_PTR >> 2] | 0;
            x4Q = t4Q + N4Q | 0;
            if ((N4Q | 0) > 0 & (x4Q | 0) < (t4Q | 0) | (x4Q | 0) < 0) {
                $abortOnCannotGrowMemory() | 0;
                $___setErrNo(12);
                return -1;
            }
            $Int32Array_h1Q[$DYNAMICTOP_PTR >> 2] = x4Q;
            if ((x4Q | 0) > ($getTotalMemory() | 0) ? ($enlargeMemory() | 0) == 0 : 0) {
                $Int32Array_h1Q[$DYNAMICTOP_PTR >> 2] = t4Q;
                $___setErrNo(12);
                return -1;
            }
            return t4Q | 0;
        }
        function $dynCall_ii(j4Q, Y4Q) {
            j4Q = j4Q | 0;
            Y4Q = Y4Q | 0;
            return w2Q[j4Q & 1](Y4Q | 0) | 0;
        }
        function $dynCall_iiii(d4Q, i4Q, h4Q, s4Q) {
            d4Q = d4Q | 0;
            i4Q = i4Q | 0;
            h4Q = h4Q | 0;
            s4Q = s4Q | 0;
            return U1Q[d4Q & 3](i4Q | 0, h4Q | 0, s4Q | 0) | 0;
        }
        function D3Q(S4Q) {
            S4Q = S4Q | 0;
            $nullFunc_ii(0);
            return 0;
        }
        function K3Q(U4Q, c4Q, V4Q) {
            U4Q = U4Q | 0;
            c4Q = c4Q | 0;
            V4Q = V4Q | 0;
            $nullFunc_iiii(1);
            return 0;
        }
        var w2Q = [D3Q, V2Q];
        var U1Q = [K3Q, f2Q, T2Q, L1Q];
        return { _Encrypt: $_Encrypt, _Process: $_Process, ___errno_location: $___errno_location, _fflush: $_fflush, _free: $_free, _llvm_bswap_i32: $_llvm_bswap_i32, _malloc: $_malloc, _memcpy: $_memcpy, _memmove: $_memmove, _memset: $_memset, _sbrk: $_sbrk, dynCall_ii: $dynCall_ii, dynCall_iiii: $dynCall_iiii, establishStackSpace: $establishStackSpace, getTempRet0: $getTempRet0, runPostSets: $runPostSets, setTempRet0: $setTempRet0, setThrew: $setThrew, stackAlloc: $stackAlloc, stackRestore: $stackRestore, stackSave: $stackSave };
    }(t8D.asmGlobalArg, t8D.asmLibraryArg, S8D), _Encrypt2 = Y8D._Encrypt;
    Y8D._Encrypt = function () {
        return j8D(h8D, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), j8D(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), _Encrypt2.apply(null, arguments);
    };
    var _Process2 = Y8D._Process;
    Y8D._Process = function () {
        return j8D(h8D, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), j8D(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), _Process2.apply(null, arguments);
    };
    var ___errno_location2 = Y8D.___errno_location;
    Y8D.___errno_location = function () {
        return j8D(h8D, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), j8D(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), ___errno_location2.apply(null, arguments);
    };
    var _fflush2 = Y8D._fflush;
    Y8D._fflush = function () {
        return j8D(h8D, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), j8D(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), _fflush2.apply(null, arguments);
    };
    var _free2 = Y8D._free;
    Y8D._free = function () {
        return j8D(h8D, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), j8D(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), _free2.apply(null, arguments);
    };
    var _llvm_bswap_i322 = Y8D._llvm_bswap_i32;
    Y8D._llvm_bswap_i32 = function () {
        return j8D(h8D, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), j8D(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), _llvm_bswap_i322.apply(null, arguments);
    };
    var _malloc2 = Y8D._malloc;
    Y8D._malloc = function () {
        return j8D(h8D, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), j8D(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), _malloc2.apply(null, arguments);
    };
    var _memmove2 = Y8D._memmove;
    Y8D._memmove = function () {
        return j8D(h8D, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), j8D(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), _memmove2.apply(null, arguments);
    };
    var _sbrk2 = Y8D._sbrk;
    Y8D._sbrk = function () {
        return j8D(h8D, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), j8D(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), _sbrk2.apply(null, arguments);
    };
    var establishStackSpace2 = Y8D.establishStackSpace;
    Y8D.establishStackSpace = function () {
        return j8D(h8D, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), j8D(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), establishStackSpace2.apply(null, arguments);
    };
    var getTempRet02 = Y8D.getTempRet0;
    Y8D.getTempRet0 = function () {
        return j8D(h8D, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), j8D(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), getTempRet02.apply(null, arguments);
    };
    var setTempRet02 = Y8D.setTempRet0;
    Y8D.setTempRet0 = function () {
        return j8D(h8D, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), j8D(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), setTempRet02.apply(null, arguments);
    };
    var setThrew2 = Y8D.setThrew;
    Y8D.setThrew = function () {
        return j8D(h8D, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), j8D(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), setThrew2.apply(null, arguments);
    };
    var stackAlloc2 = Y8D.stackAlloc;
    Y8D.stackAlloc = function () {
        return j8D(h8D, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), j8D(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), stackAlloc2.apply(null, arguments);
    };
    var stackRestore2 = Y8D.stackRestore;
    Y8D.stackRestore = function () {
        return j8D(h8D, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), j8D(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), stackRestore2.apply(null, arguments);
    };
    var stackSave2 = Y8D.stackSave;
    Y8D.stackSave = function () {
        return j8D(h8D, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), j8D(!0, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), stackSave2.apply(null, arguments);
    };
    t8D._Encrypt = Y8D._Encrypt, t8D._Process = Y8D._Process, t8D.___errno_location = Y8D.___errno_location, t8D._fflush = Y8D._fflush, t8D._free = Y8D._free, t8D._llvm_bswap_i32 = Y8D._llvm_bswap_i32, t8D._malloc = Y8D._malloc, t8D._memcpy = Y8D._memcpy, t8D._memmove = Y8D._memmove, t8D._memset = Y8D._memset, t8D._sbrk = Y8D._sbrk, t8D.establishStackSpace = Y8D.establishStackSpace, t8D.getTempRet0 = Y8D.getTempRet0, t8D.runPostSets = Y8D.runPostSets, t8D.setTempRet0 = Y8D.setTempRet0, t8D.setThrew = Y8D.setThrew;
    var o0D, M0D, K0D = t8D.stackAlloc = Y8D.stackAlloc, v8D = t8D.stackRestore = Y8D.stackRestore, L8D = t8D.stackSave = Y8D.stackSave;
    t8D.dynCall_ii = Y8D.dynCall_ii, t8D.dynCall_iiii = Y8D.dynCall_iiii;
    if (t8D.asm = Y8D, t8D.intArrayFromString || (t8D.intArrayFromString = function () {
        N8D("'intArrayFromString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.intArrayToString || (t8D.intArrayToString = function () {
        N8D("'intArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.ccall = function (F4Q, f4Q, L4Q, b4Q, E4Q) {
        var B4Q = function (v4Q) {
            var C4Q = t8D["_" + v4Q];
            return j8D(C4Q, "Cannot call unknown function " + v4Q + ", make sure it is exported"), C4Q;
        }(F4Q), a4Q = [], T4Q = 0;
        if (j8D("array" !== f4Q, 'Return type should not be "array".'), b4Q)
            for (var k4Q = 0; k4Q < b4Q.length; k4Q++) {
                var r4Q = z6D[L4Q[k4Q]];
                r4Q ? (0 === T4Q && (T4Q = L8D()), a4Q[k4Q] = r4Q(b4Q[k4Q])) : a4Q[k4Q] = b4Q[k4Q];
            }
        var e4Q = B4Q.apply(null, a4Q);
        return e4Q = function (W8Q) {
            return "string" === f4Q ? l6D(W8Q) : "boolean" === f4Q ? Boolean(W8Q) : W8Q;
        }(e4Q), 0 !== T4Q && v8D(T4Q), e4Q;
    }, t8D.cwrap || (t8D.cwrap = function () {
        N8D("'cwrap' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.setValue || (t8D.setValue = function () {
        N8D("'setValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.getValue || (t8D.getValue = function () {
        N8D("'getValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.allocate || (t8D.allocate = function () {
        N8D("'allocate' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.getMemory || (t8D.getMemory = function () {
        N8D("'getMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
    }), t8D.Pointer_stringify || (t8D.Pointer_stringify = function () {
        N8D("'Pointer_stringify' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.AsciiToString || (t8D.AsciiToString = function () {
        N8D("'AsciiToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.stringToAscii || (t8D.stringToAscii = function () {
        N8D("'stringToAscii' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.UTF8ArrayToString || (t8D.UTF8ArrayToString = function () {
        N8D("'UTF8ArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.UTF8ToString || (t8D.UTF8ToString = function () {
        N8D("'UTF8ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.stringToUTF8Array || (t8D.stringToUTF8Array = function () {
        N8D("'stringToUTF8Array' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.stringToUTF8 || (t8D.stringToUTF8 = function () {
        N8D("'stringToUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.lengthBytesUTF8 || (t8D.lengthBytesUTF8 = function () {
        N8D("'lengthBytesUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.UTF16ToString || (t8D.UTF16ToString = function () {
        N8D("'UTF16ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.stringToUTF16 || (t8D.stringToUTF16 = function () {
        N8D("'stringToUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.lengthBytesUTF16 || (t8D.lengthBytesUTF16 = function () {
        N8D("'lengthBytesUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.UTF32ToString || (t8D.UTF32ToString = function () {
        N8D("'UTF32ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.stringToUTF32 || (t8D.stringToUTF32 = function () {
        N8D("'stringToUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.lengthBytesUTF32 || (t8D.lengthBytesUTF32 = function () {
        N8D("'lengthBytesUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.allocateUTF8 || (t8D.allocateUTF8 = function () {
        N8D("'allocateUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.stackTrace || (t8D.stackTrace = function () {
        N8D("'stackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.addOnPreRun || (t8D.addOnPreRun = function () {
        N8D("'addOnPreRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.addOnInit || (t8D.addOnInit = function () {
        N8D("'addOnInit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.addOnPreMain || (t8D.addOnPreMain = function () {
        N8D("'addOnPreMain' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.addOnExit || (t8D.addOnExit = function () {
        N8D("'addOnExit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.addOnPostRun || (t8D.addOnPostRun = function () {
        N8D("'addOnPostRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.writeStringToMemory || (t8D.writeStringToMemory = function () {
        N8D("'writeStringToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.writeArrayToMemory || (t8D.writeArrayToMemory = function () {
        N8D("'writeArrayToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.writeAsciiToMemory || (t8D.writeAsciiToMemory = function () {
        N8D("'writeAsciiToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.addRunDependency || (t8D.addRunDependency = function () {
        N8D("'addRunDependency' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
    }), t8D.removeRunDependency || (t8D.removeRunDependency = function () {
        N8D("'removeRunDependency' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
    }), t8D.ENV || (t8D.ENV = function () {
        N8D("'ENV' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.FS || (t8D.FS = function () {
        N8D("'FS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.FS_createFolder || (t8D.FS_createFolder = function () {
        N8D("'FS_createFolder' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
    }), t8D.FS_createPath || (t8D.FS_createPath = function () {
        N8D("'FS_createPath' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
    }), t8D.FS_createDataFile || (t8D.FS_createDataFile = function () {
        N8D("'FS_createDataFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
    }), t8D.FS_createPreloadedFile || (t8D.FS_createPreloadedFile = function () {
        N8D("'FS_createPreloadedFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
    }), t8D.FS_createLazyFile || (t8D.FS_createLazyFile = function () {
        N8D("'FS_createLazyFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
    }), t8D.FS_createLink || (t8D.FS_createLink = function () {
        N8D("'FS_createLink' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
    }), t8D.FS_createDevice || (t8D.FS_createDevice = function () {
        N8D("'FS_createDevice' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
    }), t8D.FS_unlink || (t8D.FS_unlink = function () {
        N8D("'FS_unlink' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you");
    }), t8D.GL || (t8D.GL = function () {
        N8D("'GL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.staticAlloc || (t8D.staticAlloc = function () {
        N8D("'staticAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.dynamicAlloc || (t8D.dynamicAlloc = function () {
        N8D("'dynamicAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.warnOnce || (t8D.warnOnce = function () {
        N8D("'warnOnce' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.loadDynamicLibrary || (t8D.loadDynamicLibrary = function () {
        N8D("'loadDynamicLibrary' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.loadWebAssemblyModule || (t8D.loadWebAssemblyModule = function () {
        N8D("'loadWebAssemblyModule' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.getLEB || (t8D.getLEB = function () {
        N8D("'getLEB' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.getFunctionTables || (t8D.getFunctionTables = function () {
        N8D("'getFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.alignFunctionTables || (t8D.alignFunctionTables = function () {
        N8D("'alignFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.registerFunctions || (t8D.registerFunctions = function () {
        N8D("'registerFunctions' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.addFunction || (t8D.addFunction = function () {
        N8D("'addFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.removeFunction || (t8D.removeFunction = function () {
        N8D("'removeFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.getFuncWrapper || (t8D.getFuncWrapper = function () {
        N8D("'getFuncWrapper' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.prettyPrint || (t8D.prettyPrint = function () {
        N8D("'prettyPrint' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.makeBigInt || (t8D.makeBigInt = function () {
        N8D("'makeBigInt' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.dynCall || (t8D.dynCall = function () {
        N8D("'dynCall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.getCompilerSetting || (t8D.getCompilerSetting = function () {
        N8D("'getCompilerSetting' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.stackSave || (t8D.stackSave = function () {
        N8D("'stackSave' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.stackRestore || (t8D.stackRestore = function () {
        N8D("'stackRestore' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.stackAlloc || (t8D.stackAlloc = function () {
        N8D("'stackAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.establishStackSpace || (t8D.establishStackSpace = function () {
        N8D("'establishStackSpace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.print || (t8D.print = function () {
        N8D("'print' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.printErr || (t8D.printErr = function () {
        N8D("'printErr' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.intArrayFromBase64 || (t8D.intArrayFromBase64 = function () {
        N8D("'intArrayFromBase64' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.tryParseAsDataURI || (t8D.tryParseAsDataURI = function () {
        N8D("'tryParseAsDataURI' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    }), t8D.ALLOC_NORMAL || Object.defineProperty(t8D, "ALLOC_NORMAL", { get: function () {
        N8D("'ALLOC_NORMAL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    } }), t8D.ALLOC_STACK || Object.defineProperty(t8D, "ALLOC_STACK", { get: function () {
        N8D("'ALLOC_STACK' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    } }), t8D.ALLOC_STATIC || Object.defineProperty(t8D, "ALLOC_STATIC", { get: function () {
        N8D("'ALLOC_STATIC' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    } }), t8D.ALLOC_DYNAMIC || Object.defineProperty(t8D, "ALLOC_DYNAMIC", { get: function () {
        N8D("'ALLOC_DYNAMIC' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    } }), t8D.ALLOC_NONE || Object.defineProperty(t8D, "ALLOC_NONE", { get: function () {
        N8D("'ALLOC_NONE' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
    } }), V8D)
        if (K6D(V8D) || (M0D = V8D, V8D = t8D.locateFile ? t8D.locateFile(M0D, T8D) : T8D + M0D), C8D || G0D) {
            var w6D = t8D.readBinary(V8D);
            U8D.set(w6D, 8);
        }
        else {
            var N0D = function () {
                t8D.readAsync(V8D, w0D, function () {
                    throw "could not load memory initializer " + V8D;
                });
            };
            o0D = "memory initializer", a8D++, t8D.monitorRunDependencies && t8D.monitorRunDependencies(a8D), o0D ? (j8D(!z0D[o0D]), z0D[o0D] = 1, null === b8D && "undefined" != typeof setInterval && (b8D = setInterval(function () {
                if (u0D)
                    return clearInterval(b8D), void (b8D = null);
                var l8Q = !1;
                for (var Q8Q in z0D)
                    l8Q || (l8Q = !0, s8D("still waiting on run dependencies:")), s8D("dependency: " + Q8Q);
                l8Q && s8D("(end of list)");
            }, 1e4))) : s8D("warning: run dependency added without ID");
            var w0D = function (z8Q) {
                z8Q.byteLength && (z8Q = new Uint8Array(z8Q));
                for (var g8Q = 0; g8Q < z8Q.length; g8Q++)
                    j8D(0 === U8D[8 + g8Q], "area for memory initializer should not have been touched before it's loaded");
                U8D.set(z8Q, 8), t8D.memoryInitializerRequest && delete t8D.memoryInitializerRequest.response, function (R8Q) {
                    if (a8D--, t8D.monitorRunDependencies && t8D.monitorRunDependencies(a8D), R8Q ? (j8D(z0D[R8Q]), delete z0D[R8Q]) : s8D("warning: run dependency removed without ID"), 0 == a8D && (null !== b8D && (clearInterval(b8D), b8D = null), Q0D)) {
                        var w8Q = Q0D;
                        Q0D = null, w8Q();
                    }
                }("memory initializer");
            }, Y0D = f8D(V8D);
            if (Y0D)
                w0D(Y0D.buffer);
            else if (t8D.memoryInitializerRequest) {
                var d0D = function () {
                    var D8Q = t8D.memoryInitializerRequest, K8Q = D8Q.response;
                    if (200 !== D8Q.status && 0 !== D8Q.status) {
                        var m8Q = f8D(t8D.memoryInitializerRequestURL);
                        if (!m8Q)
                            return console.warn("a problem seems to have happened with Module.memoryInitializerRequest, status: " + D8Q.status + ", retrying " + V8D), void N0D();
                        K8Q = m8Q.buffer;
                    }
                    w0D(K8Q);
                };
                t8D.memoryInitializerRequest.response ? setTimeout(d0D, 0) : t8D.memoryInitializerRequest.addEventListener("load", d0D);
            }
            else
                N0D();
        }
    function R0D(H8Q) {
        this.name = "ExitStatus", this.message = "Program terminated with exit(" + H8Q + ")", this.status = H8Q;
    }
    function P0D(q8Q) {
        function o8Q() {
            t8D.calledRun || (t8D.calledRun = !0, u0D || (m0D(), h8D || (h8D = !0, q0D(I0D)), m0D(), q0D(D6D), t8D.onRuntimeInitialized && t8D.onRuntimeInitialized(), j8D(!t8D._main, 'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]'), function () {
                if (m0D(), t8D.postRun)
                    for ("function" == typeof t8D.postRun && (t8D.postRun = [t8D.postRun]); t8D.postRun.length;)
                        u8Q = t8D.postRun.shift(), A0D.unshift(u8Q);
                var u8Q;
                q0D(A0D);
            }()));
        }
        q8Q = q8Q || t8D.arguments, a8D > 0 || (j8D(0 == (3 & k8D)), E8D[(k8D >> 2) - 1] = 34821223, E8D[(k8D >> 2) - 2] = 2310721022, function () {
            if (t8D.preRun)
                for ("function" == typeof t8D.preRun && (t8D.preRun = [t8D.preRun]); t8D.preRun.length;)
                    O8Q = t8D.preRun.shift(), Z0D.unshift(O8Q);
            var O8Q;
            q0D(Z0D);
        }(), a8D > 0 || t8D.calledRun || (t8D.setStatus ? (t8D.setStatus("Running..."), setTimeout(function () {
            setTimeout(function () {
                t8D.setStatus("");
            }, 1), o8Q();
        }, 1)) : o8Q(), m0D()));
    }
    R0D.prototype = new Error(), R0D.prototype.constructor = R0D, Q0D = function M8Q() {
        t8D.calledRun || P0D(), t8D.calledRun || (Q0D = M8Q);
    }, t8D.run = P0D;
    var x0D = [];
    function N8D(J8Q) {
        t8D.onAbort && t8D.onAbort(J8Q), void 0 !== J8Q ? (D0D(J8Q), s8D(J8Q), J8Q = JSON.stringify(J8Q)) : J8Q = "", u0D = !0;
        var y8Q = "abort(" + J8Q + ") at " + o6D();
        throw x0D && x0D.forEach(function (n8Q) {
            y8Q = n8Q(y8Q, J8Q);
        }), y8Q;
    }
    if (t8D.abort = N8D, t8D.preInit)
        for ("function" == typeof t8D.preInit && (t8D.preInit = [t8D.preInit]); t8D.preInit.length > 0;)
            t8D.preInit.pop()();
    return t8D.noExitRuntime = !0, P0D(), t8D;
}();

})();
