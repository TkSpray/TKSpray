String.prototype.trim = function () {
    return this.replace(/(^/s * ) | (/s*$)/g, "");
}
var postfixList = ['163.com', 'gmail.com', '126.com', 'qq.com', '263.net'];