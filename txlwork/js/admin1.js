var list1 = '';
var list2 = '<p>未完成学生名单</p><br>';
var list3 = '';
var a = [1, 2, 3, 4];
var div1 = document.getElementsByClassName('sec2');
var div2 = document.getElementsByClassName('sec3');
var div3 = document.getElementsByClassName('sec4');

list1 = '<span>' + a[0] + '</span>' + '<span>平均分:' + a[1] + '</span>' + '<span>学生完成度:' + a[3] + '/' + a[2] + '</span>' + '</div>';
div1[0].innerHTML = list1;

for (var n = 0; n < a.length; n++) {
    list2 += '<span>' + '&nbsp' + '&nbsp' + a[n] + '</span>';
}
div2[0].innerHTML = list2;



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