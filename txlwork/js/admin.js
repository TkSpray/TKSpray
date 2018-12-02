var list = '';
var a = [1, 2, 3, 4];
var div = document.getElementsByClassName('sec2');

for (var n = 0; n < a.length; n++) {
    list += '<div class="part"><span> 辅导员:<a href="#">' + a[n] + '</a></span>' + '<span>平均分:' + a[n] + '</span>' + '<span>学生完成度:' + a[n] + '</span>' + '</div>';
}

div[0].innerHTML = list;

function requst() {
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onredystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var xml = JSON.parse(xmlhttp.response);
            teacher = xml.teacher;
            if (xml.errCode == 0) {

            } else if (xml.errCode == 1) {

            }
        }
    }
    xmlhttp.open('post', '', true);
    xmlhttp.send();
}