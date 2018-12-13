window.onload = function () {
    var xmlhttp;
    var p = document.querySelector('p');
    var btn = document.getElementById('btn');
    var finished1 = '';
    var unfinished1 = '';
    btn.innerHTML = '开始测评';
    p.className = 'text';
    p.innerHTML = '欢迎您参加2018年辅导员工作满意度测评<br><br>您需要测评的辅导员是' + '<span>' + 'xxx' + '&nbsp&nbsp</span>' + '<br>还需要对' + '<span>' + 'xxx' + '&nbsp&nbsp</span>' + '继续评测' + '<br><br>每位辅导员有对应的9个测评问题<br>请根据实际情况选择对应选项<br>若中途退出，数据将不予以保存<br>因此请尽量一次填写完问卷，谢谢!';

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function () {

        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var xml = JSON.parse(this.responseText);
            var data = xml.data;
            var finished = data.finished;
            var unfinished = data.unfinished;

            if (xml.errorCode == 5) {
                btn.innerHTML = '返回';
                p.innerHTML = '您已经完成了所有的测评<br>感谢您的参与！';
                btn.onclick = function () {
                    window.location.href = "index.html";
                };
            } else if (xml.errorCode == 0 || xml.errorCode == 1 || xml.errorCode == 4) {

                for (var n = 0; n < finished.length; n++) {
                    finished1 += '<span>' + finished[n] + '&nbsp&nbsp</span>';
                }
                console.log(finished1);
                for (var i = 0; i < unfinished.length; i++) {
                    unfinished1 += '<span>' + unfinished[i] + '&nbsp&nbsp</span>';
                }
                console.log(unfinished1);
                btn.innerHTML = '开始评测';
                p.className = 'text';
                p.innerHTML = '欢迎您参加2018年辅导员工作满意度测评<br><br>您需要测评的辅导员是' + finished1 + unfinished1 + '<br>还需要对' + unfinished1 + '继续评测' + '<br><br>每位辅导员有对应的9个测评问题,请根据实际情况选择对应选项<br>若中途退出，数据将不予以保存<br>因此请尽量一次填写完问卷，谢谢!';
                btn.onclick = function () {
                    window.location.href = "answer.html";
                };
            } else if (xml.errorCode == 2 || xml.errorCode == 3 || xml.errorCode == 6) {
                alert('登录失败');
                btn.onclick = function () {
                    window.location.href = "index.html";
                };
            } else if (xml.errorCode == 8) {
                alert('非法操作，权限不够');
            } else if (xml.errorCode == 10) {
                alert('该学生不在评测范围内');
            } else {
                alert('系统错误');
            }
        }
    };
    xmlhttp.open('get', 'http://api.com/user/remains', true);
    xmlhttp.withCredentials = true;
    xmlhttp.send();
};