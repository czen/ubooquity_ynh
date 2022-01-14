/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
 * in FIPS 180-2
 * Version 2.2 Copyright Angel Marin, Paul Johnston 2000 - 2009.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 * Also http://anmar.eu.org/projects/jssha2/
 */
var hexcase = 0

function hex_sha256 (a) {return rstr2hex(rstr_sha256(str2rstr_utf8(a)))}

function hex_hmac_sha256 (a, b) {return rstr2hex(rstr_hmac_sha256(str2rstr_utf8(a), str2rstr_utf8(b)))}

function sha256_vm_test () {return hex_sha256('abc').toLowerCase() == 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'}

function rstr_sha256 (a) {return binb2rstr(binb_sha256(rstr2binb(a), a.length * 8))}

function rstr_hmac_sha256 (c, f) {
  var e = rstr2binb(c)
  if (e.length > 16) {e = binb_sha256(e, c.length * 8)}
  var a = Array(16), d = Array(16)
  for (var b = 0; b < 16; b++) {
    a[b] = e[b] ^ 909522486
    d[b] = e[b] ^ 1549556828
  }
  var g = binb_sha256(a.concat(rstr2binb(f)), 512 + f.length * 8)
  return binb2rstr(binb_sha256(d.concat(g), 512 + 256))
}

function rstr2hex (c) {
  try {hexcase} catch (g) {hexcase = 0}
  var f = hexcase ? '0123456789ABCDEF' : '0123456789abcdef'
  var b = ''
  var a
  for (var d = 0; d < c.length; d++) {
    a = c.charCodeAt(d)
    b += f.charAt((a >>> 4) & 15) + f.charAt(a & 15)
  }
  return b
}

function str2rstr_utf8 (c) {
  var b = ''
  var d = -1
  var a, e
  while (++d < c.length) {
    a = c.charCodeAt(d)
    e = d + 1 < c.length ? c.charCodeAt(d + 1) : 0
    if (55296 <= a && a <= 56319 && 56320 <= e && e <= 57343) {
      a = 65536 + ((a & 1023) << 10) + (e & 1023)
      d++
    }
    if (a <= 127) {b += String.fromCharCode(a)} else {if (a <= 2047) {b += String.fromCharCode(192 | ((a >>> 6) & 31), 128 | (a & 63))} else {if (a <= 65535) {b += String.fromCharCode(224 | ((a >>> 12) & 15), 128 | ((a >>> 6) & 63), 128 | (a & 63))} else {if (a <= 2097151) {b += String.fromCharCode(240 | ((a >>> 18) & 7), 128 | ((a >>> 12) & 63), 128 | ((a >>> 6) & 63), 128 | (a & 63))}}}}
  }
  return b
}

function rstr2binb (b) {
  var a = Array(b.length >> 2)
  for (var c = 0; c < a.length; c++) {a[c] = 0}
  for (var c = 0; c < b.length * 8; c += 8) {a[c >> 5] |= (b.charCodeAt(c / 8) & 255) << (24 - c % 32)}
  return a
}

function binb2rstr (b) {
  var a = ''
  for (var c = 0; c < b.length * 32; c += 8) {a += String.fromCharCode((b[c >> 5] >>> (24 - c % 32)) & 255)}
  return a
}

function sha256_S (b, a) {return (b >>> a) | (b << (32 - a))}

function sha256_R (b, a) {return (b >>> a)}

function sha256_Ch (a, c, b) {return ((a & c) ^ ((~a) & b))}

function sha256_Maj (a, c, b) {return ((a & c) ^ (a & b) ^ (c & b))}

function sha256_Sigma0256 (a) {return (sha256_S(a, 2) ^ sha256_S(a, 13) ^ sha256_S(a, 22))}

function sha256_Sigma1256 (a) {return (sha256_S(a, 6) ^ sha256_S(a, 11) ^ sha256_S(a, 25))}

function sha256_Gamma0256 (a) {return (sha256_S(a, 7) ^ sha256_S(a, 18) ^ sha256_R(a, 3))}

function sha256_Gamma1256 (a) {return (sha256_S(a, 17) ^ sha256_S(a, 19) ^ sha256_R(a, 10))}

function sha256_Sigma0512 (a) {return (sha256_S(a, 28) ^ sha256_S(a, 34) ^ sha256_S(a, 39))}

function sha256_Sigma1512 (a) {return (sha256_S(a, 14) ^ sha256_S(a, 18) ^ sha256_S(a, 41))}

function sha256_Gamma0512 (a) {return (sha256_S(a, 1) ^ sha256_S(a, 8) ^ sha256_R(a, 7))}

function sha256_Gamma1512 (a) {return (sha256_S(a, 19) ^ sha256_S(a, 61) ^ sha256_R(a, 6))}

var sha256_K = new Array(1116352408, 1899447441, -1245643825, -373957723, 961987163, 1508970993, -1841331548, -1424204075, -670586216, 310598401, 607225278, 1426881987, 1925078388, -2132889090, -1680079193, -1046744716, -459576895, -272742522, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, -1740746414, -1473132947, -1341970488, -1084653625, -958395405, -710438585, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, -2117940946, -1838011259, -1564481375, -1474664885, -1035236496, -949202525, -778901479, -694614492, -200395387, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, -2067236844, -1933114872, -1866530822, -1538233109, -1090935817, -965641998)

function binb_sha256 (n, o) {
  var p = new Array(1779033703, -1150833019, 1013904242, -1521486534, 1359893119, -1694144372, 528734635, 1541459225)
  var k = new Array(64)
  var B, A, z, y, w, u, t, s
  var r, q, x, v
  n[o >> 5] |= 128 << (24 - o % 32)
  n[((o + 64 >> 9) << 4) + 15] = o
  for (r = 0; r < n.length; r += 16) {
    B = p[0]
    A = p[1]
    z = p[2]
    y = p[3]
    w = p[4]
    u = p[5]
    t = p[6]
    s = p[7]
    for (q = 0; q < 64; q++) {
      if (q < 16) {k[q] = n[q + r]} else {k[q] = safe_add(safe_add(safe_add(sha256_Gamma1256(k[q - 2]), k[q - 7]), sha256_Gamma0256(k[q - 15])), k[q - 16])}
      x = safe_add(safe_add(safe_add(safe_add(s, sha256_Sigma1256(w)), sha256_Ch(w, u, t)), sha256_K[q]), k[q])
      v = safe_add(sha256_Sigma0256(B), sha256_Maj(B, A, z))
      s = t
      t = u
      u = w
      w = safe_add(y, x)
      y = z
      z = A
      A = B
      B = safe_add(x, v)
    }
    p[0] = safe_add(B, p[0])
    p[1] = safe_add(A, p[1])
    p[2] = safe_add(z, p[2])
    p[3] = safe_add(y, p[3])
    p[4] = safe_add(w, p[4])
    p[5] = safe_add(u, p[5])
    p[6] = safe_add(t, p[6])
    p[7] = safe_add(s, p[7])
  }
  return p
}

function safe_add (a, d) {
  var c = (a & 65535) + (d & 65535)
  var b = (a >> 16) + (d >> 16) + (c >> 16)
  return (b << 16) | (c & 65535)
}

module.exports = {
  hex_hmac_sha256: hex_hmac_sha256
}