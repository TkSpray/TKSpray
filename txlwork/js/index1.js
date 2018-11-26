window.onload = function () {
    var xmlhttp;
    var p = document.querySelector('p');
    var btn = document.querySelector('button');

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onredystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var xml = JSON.parse(xmlhttp.response);
            var user = ;
            if (xml.errCode == 0) {
                p.innerHTML = '您已经完成了所有的测评<br>感谢您的参与！';
            } else if (xml.errCode == 1) {
                p.innerHTML = '您需要评议的辅导员有' + str + '的测评未完成';
            }
        }
    }
    formdata.append('data', JSON.stringify(message));
    xmlhttp.send(formdata);
}