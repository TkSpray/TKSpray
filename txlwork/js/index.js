var btn = document.getElementById('btn');

btn.onclick = function () {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    if (username == '') {
        document.getElementById('inform').innerHTML = "<span style='font-size:12px;'>用户名不能为空</span>";
    } else if (password == '') {
        document.getElementById('inform').innerHTML = "<span style='font-size:12px;'>密码不能为空</span>";
    } else {
        request(username, password);
    }
}

function request(username, password) {
    var xmlhttp;
    var data = new Object();
    xmlhttp.open('post', '', true);
    data.studentId = document.getElementById('username').value;
    data.password = document.getElementById('password').value;

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function () {

        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var xml = JSON.parse(xmlhttp.response);
            if (xml.errCode == 0) {
                window.location.href = "index1.html";
            } else if (xml.errCode == 100) {
                window.location.href = "admin.html";
            } else {
                alert("登陆失败！");
            }

        }
    }
    xmlhttp.send(data);
}