var fun_aes = require('./aes.js')
var fun_base64 = require('./base64.js')
var Crypto = require('./cryptojs.js').Crypto


/*本工程业务相关的公共函数,非工具类*/

var key = fun_aes.CryptoJS.enc.Utf8.parse('U1MjU1M0FDOUZ.Qz')

var iv  = fun_aes.CryptoJS.enc.Utf8.parse('0000000000000000');  


/*
 *
 */
function formatCurrency(num) {
    if (isNaN(num)) {
        num = "0";
    }

    var number = new Number(num);
    num = number.toFixed(2);

    return num;
}

function integerOfNum(num) {
    var index = num.indexOf('.');
    if (index != -1) {
        return num.substring(0, index);
    } else {
        return num;
    }
}

function gradeOfNum(num) {
    var index = num.indexOf('.');
    if (index != -1) {
        return num.substring(index);
    } else {
        return "00";
    }
}

function showStamp(isBaoyou) {
    if (isBaoyou === 1) {
        return "block";
    } else {
        return "none";
    }
}

function desEncrypt(word) {
    var srcs = fun_aes.CryptoJS.enc.Utf8.parse(word);
    var encrypted = fun_aes.CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: fun_aes.CryptoJS.mode.CBC, padding: fun_aes.CryptoJS.pad.Pkcs7 });
    return encrypted.toString(fun_aes.CryptoJS.enc.Base64);
  }

  function desDecrypt(word) {
    var encryptedHexStr = fun_aes.CryptoJS.enc.Hex.parse(word);
    var srcs = fun_aes.CryptoJS.enc.Base64.stringify(encryptedHexStr);
    var decrypt = fun_aes.CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: fun_aes.CryptoJS.mode.CBC, padding: fun_aes.CryptoJS.pad.Pkcs7 });
    var decryptedStr = decrypt.toString(fun_aes.CryptoJS.enc.Utf8);
    return decryptedStr;
  }

function encryt(word) {
    var str = desEncrypt(word)
    var obj_base64 = new fun_base64.Base64();
    return obj_base64.encode(str)
}  

function Encrypt(word) {
  var mode = new Crypto.mode.CBC(Crypto.pad.pkcs7);
  var eb = Crypto.charenc.UTF8.stringToBytes(word);
  var kb = Crypto.charenc.UTF8.stringToBytes("U1MjU1M0FDOUZ.Qz");//KEY
  var vb = Crypto.charenc.UTF8.stringToBytes("0000000000000000");//IV
  var ub = Crypto.AES.encrypt(eb, kb, { iv: vb, mode: mode, asBpytes: true });
  return ub
  //var obj_base64 = new fun_base64.Base64();
  //return obj_base64.encode(ub);
}
function Decrypt(word) {
  var mode = new Crypto.mode.CBC(Crypto.pad.pkcs7);
  var eb = Crypto.util.base64ToBytes(word);
  var kb = Crypto.charenc.UTF8.stringToBytes("U1MjU1M0FDOUZ.Qz");//KEY
  var vb = Crypto.charenc.UTF8.stringToBytes("0000000000000000");//IV
  var ub = Crypto.AES.decrypt(eb, kb, { asBpytes: true, mode: mode, iv: vb });
  return ub;
}

module.exports = {
    formatCurrency: formatCurrency,
    integerOfNum: integerOfNum,
    gradeOfNum: gradeOfNum,
    showStamp: showStamp,
    desEncrypt: desEncrypt,
    desDecrypt: desDecrypt,
    encryt: encryt,
    Encrypt: Encrypt,
    Decrypt: Decrypt
}
