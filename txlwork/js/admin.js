var list = '';
var a = [1, 2, 3, 4];
var div = document.getElementsByClassName('sec2');
var btn = document.getElementById('btn');

for (var n = 0; n < a.length; n++) {
    list += '<div class="part"><span> 辅导员:<a href="#">' + a[n] + '</a></span>' + '<span>平均分:' + a[n] + '</span>' + '<span>学生完成度:' + a[n] + '</span>' + '</div>';
}

div[0].innerHTML = list;

window.onload = function () {
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onredystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var xml = JSON.parse(xmlhttp.response);
            var data = xml.data;
            if (xml.errCode == 0 || xml.errCode == 1 || xml.errCode == 4 || xml.errCode == 7) {

                for (var n = 0; n < data.length; n++) {
                    var nm = data[n].name;
                    var points = data[n].points;
                    var finished = data[n].finished;
                    var unfinished = data[n].unfinished;
                    list += '<div class="part"><span> 辅导员:<a href="#">' + nm[n] + '</a></span>' + '<span>平均分:' + points[n] + '</span>' + '<span>学生完成度:' + finished[n] + '/' + unfinished[n] + '</span>' + '</div>';
                }

                div[0].innerHTML = list;
            } else {
                alert('系统错误');
            }
        }
    }
    xmlhttp.open('get', 'http://api.com/admin/teachers', true);
    xmlhttp.send();
};

btn.onclick = function () {
    window.location.href = "http://api.com/admin/download_all";
};

document.addEventListener('click', function (ev) {
    if (ev.target.nodeName === "A") {
        var name = ev.target.innerText;
        window.location.href = 'file:///Users/txl/txl/txlwork/admin1.html#name=' + name;
    }
});