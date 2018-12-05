var data = new FormData();
var btn = document.getElementById('btn');
var input = document.getElementsByName('ques');
var n = 1;
var p1 = document.getElementsByClassName('p1')[0];
var p2 = document.getElementsByClassName('p1')[1];
var que = document.getElementsByClassName('question')[0];

window.onload = function () {
    var xmlhttp1;

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp1 = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp1 = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp1.onredystatechange = function () {
        if (xmlhttp1.readyState == 4 && xmlhttp1.status == 200) {
            var xml1 = JSON.parse(xmlhttp1.response);
            var doing = xml1.data[0];
            var finished = xml1.data;

            if (xml1.errCode == 0 || xml1.errCode == 1 || xml1.errCode == 4) {
                data.append('teacher', doing);
                p1.innerHTML = "您需要评议的辅导员有" + finished;
                p2.innerHTML = "您正在评议的辅导员是" + doing;
                data.append('teacher', doing);
            } else if (xml1.errCode == 5) {
                alert('您已完成所有评测！');
                window.location.href = 'index.html';
            } else if (xml1.errCode == 2 || xml1.errCode == 3) {
                alert('未登录');
                window.location.href = "index.html";
            } else if (xml1.errCode == 6) {
                alert('密码错误!');
                window.location.href = 'index.html';
            } else if (xml1.errCode == 7) {
                window.location.href = 'admin.html';
            }
        }
    }
    xmlhttp1.open('get', 'http://api.com/user/remains', true);
    xmlhttp1.send();

    que.innerHTML = '1/9.作风正派，责任心强，工作有激情';
}

function request() {
    var xmlhttp;

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
    xmlhttp.open('post', 'http://api.com/user/store', true);
    xmlhttp.send(data);
}

btn.onclick = function () {
    if (n <= 9) {
        for (var i = 0; i < input.length; i++) {
            if (input[i].checked == true) {
                var value = input[i].value;
                val = parseFloat(value);
                data.append('ques_' + n, val);
                n++;
                console.log(data.get(ques_))
                switch (n) {
                    case 2:
                        que.innerHTML = '2/9.工作能力强，有成效';
                        break;
                    case 3:
                        que.innerHTML = '3/9.关心同学，帮助解决思想上的困惑';
                        break;
                    case 4:
                        que.innerHTML = '4/9.引导同学成长成才，指导职业规划、就业考研和创新创业';
                        break;
                    case 5:
                        que.innerHTML = '5/9.关注同学学业，深入课堂，关心同学的学习进步和变化';
                        break;
                    case 6:
                        que.innerHTML = '6/9.深入寝室，与同学交心谈心，开展寝室文化建设和卫生安全教育活动';
                        break;
                    case 7:
                        que.innerHTML = '7/9.在各类评选、评定中公正无私，真实透明';
                        break;
                    case 8:
                        que.innerHTML = '8/9.关心关爱家庭经济困难学生';
                        break;
                    case 9:
                        que.innerHTML = '9/9.妥善协调同学关系，及时化解各种矛盾';
                        btn.innerHTML = '提交';
                        break;
                    case 10:
                        request();
                        break;
                }
            }
        }
    }
}