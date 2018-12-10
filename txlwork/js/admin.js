var list = '';
var a = [1, 2, 3, 4];
var div = document.getElementsByClassName('sec2');
var btn = document.getElementById('btn');

window.onload = function () {
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var xml = JSON.parse(this.responseText);
            var data = xml.data;
            if (xml.errorCode == 0 || xml.errorCode == 1 || xml.errorCode == 4 || xml.errorCode == 7) {

                for (var n = 0; n < data.length; n++) {
                    var nm = data[n].name;
                    var points = data[n].ques_all;
                    var finished = data[n].finished;
                    var unfinished = data[n].unfinished;
                    var all = Number(finished) + Number(unfinished);
                    var per = finished / all;
                    list += '<div class="part"><span> 辅导员:<a href="#">' + nm + '</a></span>' + '<span>平均分:' + points + '</span>' + '<span>学生完成度:' + finished + '/' + all + '(' + toPercent(per) + ')' + '</span>' + '</div>';
                }

                div[0].innerHTML = list;
            } else {
                alert('系统错误');
            }
        }
    };
    xmlhttp.open('get', 'http://api.com/admin/teachers', true);
    xmlhttp.withCredentials = true;
    xmlhttp.send();
};

btn.onclick = function () {
    window.location.href = "http://api.com/admin/downloads";
};

document.addEventListener('click', function (ev) {
    if (ev.target.nodeName === "A") {
        var name = ev.target.innerText;
        window.location.href = 'admin1.html#name=' + name;
    }
});

function toPercent(point) {
    var str = Number(point * 100).toFixed(2);
    str += "%";
    return str;
}