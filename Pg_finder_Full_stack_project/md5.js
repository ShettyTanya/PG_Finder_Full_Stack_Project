function md5(msg) {
    function addUnsigned(a, b) {
        const a4 = a & 0x80000000;
        const b4 = b & 0x80000000;
        const a8 = a & 0x40000000;
        const b8 = b & 0x40000000;
        const result = (a & 0x3FFFFFFF) + (b & 0x3FFFFFFF);
        if (a8 & b8) return (result ^ 0x80000000 ^ a4 ^ b4);
        if (a8 | b8) {
            return (result & 0x40000000) ? (result ^ 0x80000000 ^ a4 ^ b4) : (result ^ a4 ^ b4);
        }
        return result ^ a4 ^ b4;
    }

    function rol(num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt));
    }

    function cmn(q, a, b, x, s, t) {
        return addUnsigned(rol(addUnsigned(addUnsigned(a, q), addUnsigned(x, t)), s), b);
    }

    function ff(a, b, c, d, x, s, t) {
        return cmn((b & c) | (~b & d), a, b, x, s, t);
    }

    function gg(a, b, c, d, x, s, t) {
        return cmn((b & d) | (c & ~d), a, b, x, s, t);
    }

    function hh(a, b, c, d, x, s, t) {
        return cmn(b ^ c ^ d, a, b, x, s, t);
    }

    function ii(a, b, c, d, x, s, t) {
        return cmn(c ^ (b | ~d), a, b, x, s, t);
    }

    function binl2hex(binarray) {
        const hex_tab = '0123456789abcdef';
        let str = '';
        for (let i = 0; i < binarray.length * 4; i++) {
            str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
                   hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
        }
        return str;
    }

    function str2binl(str) {
        const bin = [];
        const len = str.length;
        for (let i = 0; i < len * 8; i += 8) {
            bin[i >> 5] |= (str.charCodeAt(i / 8) & 0xFF) << (i % 32);
        }
        return bin;
    }

    function utf8_encode(string) {
        string = string.replace(/\r\n/g, "\n");
        let utftext = '';

        for (let n = 0; n < string.length; n++) {
            const c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if (c < 2048) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    }

    const x = str2binl(utf8_encode(msg));
    let a = 0x67452301; // Changed to let
    let b = 0xEFCDAB89; // Changed to let
    let c = 0x98BADCFE; // Changed to let
    let d = 0x10325476; // Changed to let

    const S11 = 7;
    const S12 = 12;
    const S13 = 17;
    const S14 = 22;
    const S21 = 5;
    const S22 = 9;
    const S23 = 14;
    const S24 = 20;
    const S31 = 4;
    const S32 = 11;
    const S33 = 16;
    const S34 = 23;
    const S41 = 6;
    const S42 = 10;
    const S43 = 15;
    const S44 = 21;

    x[msg.length >> 5] |= 0x80 << ((msg.length % 32) * 8);
    x[((msg.length + 64 >>> 9) << 4) + 14] = msg.length * 8;

    for (let i = 0; i < x.length; i += 16) {
        const olda = a;
        const oldb = b;
        const oldc = c;
        const oldd = d;

        a = ff(a, b, c, d, x[i], S11, 0xD76AA478);
        d = ff(d, a, b, c, x[i + 1], S12, 0xE8C7B756);
        c = ff(c, d, a, b, x[i + 2], S13, 0x242070DB);
        b = ff(b, c, d, a, x[i + 3], S14, 0xC1BDCEEE);
        a = ff(a, b, c, d, x[i + 4], S11, 0xF57C0FAF);
        d = ff(d, a, b, c, x[i + 5], S12, 0x4787C62A);
        c = ff(c, d, a, b, x[i + 6], S13, 0xA8304613);
        b = ff(b, c, d, a, x[i + 7], S14, 0xFD469501);
        a = ff(a, b, c, d, x[i + 8], S11, 0x698098D8);
        d = ff(d, a, b, c, x[i + 9], S12, 0x8B44F7AF);
        c = ff(c, d, a, b, x[i + 10], S13, 0xFFFF5BB1);
        b = ff(b, c, d, a, x[i + 11], S14, 0x895CD7BE);
        a = ff(a, b, c, d, x[i + 12], S11, 0x6B901122);
        d = ff(d, a, b, c, x[i + 13], S12, 0xFD987193);
        c = ff(c, d, a, b, x[i + 14], S13, 0xA679438E);
        b = ff(b, c, d, a, x[i + 15], S14, 0x49B40821);

        a = gg(a, b, c, d, x[i + 1], S21, 0xF61E2562);
        d = gg(d, a, b, c, x[i + 6], S22, 0xC040B340);
        c = gg(c, d, a, b, x[i + 11], S23, 0x265E5A51);
        b = gg(b, c, d, a, x[i], S24, 0xE9B6C7AA);
        a = gg(a, b, c, d, x[i + 5], S21, 0xD62F105D);
        d = gg(d, a, b, c, x[i + 10], S22, 0x02441453);
        c = gg(c, d, a, b, x[i + 15], S23, 0xD8A1E681);
        b = gg(b, c, d, a, x[i + 4], S24, 0xE7D3FBC8);
        a = gg(a, b, c, d, x[i + 9], S21, 0x21E1CDE6);
        d = gg(d, a, b, c, x[i + 14], S22, 0xC33707D6);
        c = gg(c, d, a, b, x[i + 3], S23, 0xF4D50D87);
        b = gg(b, c, d, a, x[i + 8], S24, 0x455A14ED);
        a = gg(a, b, c, d, x[i + 13], S21, 0xA9E3E905);
        d = gg(d, a, b, c, x[i + 2], S22, 0xFCEFA3F8);
        c = gg(c, d, a, b, x[i + 7], S23, 0x676F02D9);
        b = gg(b, c, d, a, x[i + 12], S24, 0x8D2A4C8A);

        a = hh(a, b, c, d, x[i + 5], S31, 0xFFFA3942);
        d = hh(d, a, b, c, x[i + 8], S32, 0x8771F681);
        c = hh(c, d, a, b, x[i + 11], S33, 0x6D9D6122);
        b = hh(b, c, d, a, x[i + 14], S34, 0xFDE5380C);
        a = hh(a, b, c, d, x[i + 1], S31, 0xA4BEEA44);
        d = hh(d, a, b, c, x[i + 4], S32, 0x4BDECFA9);
        c = hh(c, d, a, b, x[i + 7], S33, 0xF6BB4B60);
        b = hh(b, c, d, a, x[i + 10], S34, 0xBEBFBC70);
        a = hh(a, b, c, d, x[i + 13], S31, 0x289B7EC6);
        d = hh(d, a, b, c, x[i], S32, 0xEAA127FA);
        c = hh(c, d, a, b, x[i + 3], S33, 0xD4EF3085);
        b = hh(b, c, d, a, x[i + 6], S34, 0x04881D05);
        a = hh(a, b, c, d, x[i + 9], S31, 0xD9D4D039);
        d = hh(d, a, b, c, x[i + 12], S32, 0xE6DB99E5);
        c = hh(c, d, a, b, x[i + 15], S33, 0x1FA27CF8);
        b = hh(b, c, d, a, x[i + 2], S34, 0xC4AC5665);

        a = ii(a, b, c, d, x[i], S41, 0xF4292244);
        d = ii(d, a, b, c, x[i + 7], S42, 0x432AFF97);
        c = ii(c, d, a, b, x[i + 14], S43, 0xAB9423A7);
        b = ii(b, c, d, a, x[i + 5], S44, 0xFC93A039);
        a = ii(a, b, c, d, x[i + 12], S41, 0x655B59C3);
        d = ii(d, a, b, c, x[i + 3], S42, 0x8F0CCC92);
        c = ii(c, d, a, b, x[i + 10], S43, 0xFFEFF47D);
        b = ii(b, c, d, a, x[i + 1], S44, 0x85845DD1);
        a = ii(a, b, c, d, x[i + 8], S41, 0x6FA87E4F);
        d = ii(d, a, b, c, x[i + 15], S42, 0xFE2CE6E0);
        c = ii(c, d, a, b, x[i + 6], S43, 0xA3014314);
        b = ii(b, c, d, a, x[i + 13], S44, 0x4E0811A1);
        a = ii(a, b, c, d, x[i + 4], S41, 0xF7537E82);
        d = ii(d, a, b, c, x[i + 11], S42, 0xBD3AF235);
        c = ii(c, d, a, b, x[i + 2], S43, 0x2AD7D2BB);
        b = ii(b, c, d, a, x[i + 9], S44, 0xEB86D391);

        a = addUnsigned(a, olda);
        b = addUnsigned(b, oldb);
        c = addUnsigned(c, oldc);
        d = addUnsigned(d, oldd);
    }

    return binl2hex([a, b, c, d]);
}

module.exports = md5;
