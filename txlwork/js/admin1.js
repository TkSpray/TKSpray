var list1 = '';
var list2 = '<p>未完成学生名单</p><br>';
var list3 = '';
var a = [1, 2, 3, 4];
var div1 = document.getElementsByClassName('sec2');
var div2 = document.getElementsByClassName('sec3');
var div3 = document.getElementsByClassName('sec4');
var que = ['Q1.作风正派，责任心强，工作有激情', 'Q2.工作能力强，有成效', 'Q3.关心同学，帮助解决思想上的困惑', 'Q4.引导同学成长成才，指导职业规划、就业考研和创新创业', 'Q5.关注同学学业，深入课堂，关心同学的学习进步和变化', 'Q6.深入寝室，与同学交心谈心，开展寝室文化建设和卫生安全教育活动', 'Q7.在各类评选、评定中公正无私，真实透明', 'Q8.关心关爱家庭经济困难学生', 'Q9.妥善协调同学关系，及时化解各种矛盾'];

list1 = '<span>' + a[0] + '</span>' + '<span>平均分:' + a[1] + '</span>' + '<span>学生完成度:' + a[3] + '/' + a[2] + '</span>' + '</div>';
div1[0].innerHTML = list1;

for (var n = 0; n < a.length; n++) {
    list2 += '<span>' + '&nbsp' + '&nbsp' + a[n] + '</span>';
    list3 += '<div class="part"><p>' + que[n] + '</p>' + '<span>平均分:' + a[n] + '分</span></div>';
}
div2[0].innerHTML = list2;

div3[0].innerHTML = list3;

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