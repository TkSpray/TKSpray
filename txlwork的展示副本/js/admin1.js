var list1 = '';
var list2 = '<p>未完成学生名单</p><br>';
var list3 = '';
var a = [1, 2, 3, 4];
var div1 = document.getElementsByClassName('sec2');
var div2 = document.getElementsByClassName('sec3');
var div3 = document.getElementsByClassName('sec4');
var que = ['Q1.作风正派，责任心强，工作有激情', 'Q2.工作能力强，有成效', 'Q3.关心同学，帮助解决思想上的困惑', 'Q4.引导同学成长成才，指导职业规划、就业考研和创新创业', 'Q5.关注同学学业，深入课堂，关心同学的学习进步和变化', 'Q6.深入寝室，与同学交心谈心，开展寝室文化建设和卫生安全教育活动', 'Q7.在各类评选、评定中公正无私，真实透明', 'Q8.关心关爱家庭经济困难学生', 'Q9.妥善协调同学关系，及时化解各种矛盾', 'Q10.总体评价'];
var btn = document.getElementById('btn');
var h1 = document.querySelector('h1');
var nm = decodeURI(window.location.href.split('=')[1]);
var btn1 = document.getElementById('btn1');

h1.innerHTML = '辅导员' + nm + '工作满意度测评';

window.onload = function () {
    var Name = new FormData();
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var xml = JSON.parse(xmlhttp.response);
            var data = xml.data;
            var names = data.names;
            var finished = data.finished;
            var unfinished = data.unfinished;
            var ques = data.questions;
            var points = ques.ques_all;
            var all = Number(finished) + Number(unfinished);
            var per = finished / all;

            if (xml.errorCode == 0 || xml.errorCode == 1 || xml.errorCode == 4 || xml.errorCode == 7) {
                list1 = '<span>' + nm + '</span>' + '<span>总平均分:' + points + '</span>' + '<span>学生完成度:' + finished + '/' + all + '(' + toPercent(per) + ')' + '</span>' + '</div>';
                div1[0].innerHTML = list1;

                for (var a = 0; a < names.length; a++) {
                    list2 += '<span>' + '&nbsp' + '&nbsp' + names[a] + '</span>';
                }

                for (var n = 0; n < que.length; n++) {
                    list3 += '<div class="part"><p>' + que[n] + '</p>' + '<span>平均分:' + Object.values(ques)[n + 1] + '分</span></div>';
                }

                div2[0].innerHTML = list2;
                div3[0].innerHTML = list3;
            } else {
                alert('系统错误');
            }
        }
    };
    Name.append('teacher_name', nm);
    xmlhttp.open('post', 'http://stuhome.uestc.edu.cn/api/v1/counselors/admin/teacher', true);
    xmlhttp.withCredentials = true;
    xmlhttp.send(Name);
};
btn.onclick = function () {
    window.location.href = "http://stuhome.uestc.edu.cn/api/v1/counselors/admin/download?teacher=" + nm;
};
btn1.onclick = function () {
    window.location.href = "admin.html";
};

function toPercent(point) {
    var str = Number(point * 100).toFixed(2);
    str += "%";
    return str;
}