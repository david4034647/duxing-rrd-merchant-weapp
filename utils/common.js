var Crypto = require('./cryptojs.js').Crypto


/*本工程业务相关的公共函数,非工具类*/

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

function Encrypt(word) {
  var mode = new Crypto.mode.CBC(Crypto.pad.pkcs7);
  var eb = Crypto.charenc.UTF8.stringToBytes(JSON.stringify(word));
  var kb = Crypto.charenc.UTF8.stringToBytes('U1MjU1M0FDOUZ.Qz');//KEY
  var vb = Crypto.charenc.UTF8.stringToBytes('0000000000000000');//IV
  var ub = Crypto.AES.encrypt(eb, kb, { iv: vb, mode: mode, asBpytes: true });
  return Crypto.charenc.UTF8.bytesToString(Crypto.charenc.UTF8.stringToBytes(ub));
}

function Decrypt(word) {
  var mode = new Crypto.mode.CBC(Crypto.pad.pkcs7);
  var eb = Crypto.util.base64ToBytes(word);
  var kb = Crypto.charenc.UTF8.stringToBytes("U1MjU1M0FDOUZ.Qz");//KEY
  var vb = Crypto.charenc.UTF8.stringToBytes("0000000000000000");//IV
  var ub = Crypto.AES.decrypt(eb, kb, { asBpytes: true, mode: mode, iv: vb });
  return Crypto.util.bytesToHex(ub);
}

module.exports = {
    formatCurrency: formatCurrency,
    integerOfNum: integerOfNum,
    gradeOfNum: gradeOfNum,
    showStamp: showStamp,
    Encrypt: Encrypt,
    Decrypt: Decrypt
}
