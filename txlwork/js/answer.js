window.onload = function () {
    var xmlhttp;
    var str = 'xxx';
    var p1 = document.getElementsByClassName('p1')[0];
    var p2 = document.getElementsByClassName('p1')[1];
    var que = document.getElementsByClassName('question')[0];

    p1.innerHTML = "您需要评议的辅导员有" + str;
    p2.innerHTML = "您正在评议的辅导员是" + str;
    que.innerHTML = str;
    xmlhttp.open('post', '', true);
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onredystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var xml = JSON.parse(xmlhttp.response);
            if (xml.errCode == 0) {

            } else if (xml.errCode == 1) {

            }
        }
    }
    formdata.append('data', JSON.stringify(message));
    xmlhttp.send(formdata);
}
var btn = document.getElementById('btn');
var input = document.getElementsByName('ques_1');
document.getElementsByTagName('input').onclick = function () {
    for (var i = 0; i < input.length; i++) {
        if (input[i].checked == true) {
            alert(i);
        }
    }
}
btn.onclick = function () {
    for (var i = 0; i < input.length; i++) {
        if (input[i].checked == true) {
            alert(i);
        }
    }
}