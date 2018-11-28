var data = new Object();
var btn = document.getElementById('btn');
var input = document.getElementsByName('ques_1');
var teacher;
var n = 1;
var p1 = document.getElementsByClassName('p1')[0];
var p2 = document.getElementsByClassName('p1')[1];
var que = document.getElementsByClassName('question')[0];

window.onload = function () {
    var finished = 'xxx';
    var doing = 'xx';
    p1.innerHTML = "您需要评议的辅导员有" + finished;
    p2.innerHTML = "您正在评议的辅导员是" + doing;
    que.innerHTML = '1/9.作风正派，责任心强，工作有激情';
}

function requst() {
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
    xmlhttp.open('post', '', true);
    xmlhttp.send(data);
}

btn.onclick = function () {
    for (var i = 0; i < input.length; i++) {
        if (input[i].checked == true) {
            n++;
            var value = input[i].value;
            val = parseFloat(value);
            data["ques_" + n] = val;
            console.log(data);
            if (n <= 9) {
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
                    default:
                        alert('无问题！');
                        break;
                }
            } else if (n = 10) {
                request();
            }
        }
    }
}