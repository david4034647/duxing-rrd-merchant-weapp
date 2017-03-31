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

module.exports = {
    formatCurrency: formatCurrency,
    integerOfNum: integerOfNum,
    gradeOfNum: gradeOfNum,
    showStamp: showStamp
}
