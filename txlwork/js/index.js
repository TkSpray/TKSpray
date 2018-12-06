var btn = document.getElementById("btn");

btn.onclick = function () {
    var username = document.getElementById("username").value;
    var password1 = document.getElementById("password").value;
    if (username == "") {
        document.getElementById("inform").innerHTML =
            "<span style='font-size:12px;'>用户名不能为空</span>";
    } else if (password == "") {
        document.getElementById("inform").innerHTML =
            "<span style='font-size:12px;'>密码不能为空</span>";
    } else {
        request(username, password1);
    }
};

function request(username, password1) {
    var xmlhttp;
    var formdata = new FormData();

    var studentId = username;
    var password = password1;

    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var xml = JSON.parse(xmlhttp.response);
            if (
                xml.errorCode == 0 ||
                xml.errorCode == 1 ||
                xml.errorCode == 4 ||
                xml.errorCode == 5
            ) {
                window.location.href = "./index1.html";
            } else if (xml.errorCode == 7) {
                window.location.href = "./admin.html";
            } else if (xml.errorCode == 6) {
                alert("密码错误");
            } else {
                alert("登陆失败！");
            }
        }
    };
    formdata.append("studentId", studentId);
    formdata.append("password", password);
    xmlhttp.open("post", "http://api.com/user/login", true);
    xmlhttp.withCredentials = true;
    xmlhttp.send(formdata);
}