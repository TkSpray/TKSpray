var data = new FormData();
var btn = document.getElementById("btn");
var input = document.getElementsByName("ques");
var n = 1;
var p1 = document.getElementsByClassName("p1")[0];
var p2 = document.getElementsByClassName("p1")[1];
var que = document.getElementsByClassName("question")[0];
var list = "";
var wait = 1;
var cho = false;
var b = 0;
p1.innerHTML = "您需要评议的辅导员有" + "<br>";
p2.innerHTML = "您正在评议的辅导员是";

window.onload = function() {
  var xmlhttp1;
  for (var a = 0; a < input.length; a++) {
    input[a].setAttribute("tag", "0");
  }
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp1 = new XMLHttpRequest();
  } else {
    // code for IE6, IE5
    xmlhttp1 = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xmlhttp1.onreadystatechange = function() {
    if (xmlhttp1.readyState == 4 && xmlhttp1.status == 200) {
      var xml1 = JSON.parse(this.responseText);
      var res = xml1.data;
      var doing = res.unfinished[0];
      var finished = res.finished;
      var unfinished = res.unfinished;

      if (xml1.errorCode == 0 || xml1.errorCode == 1 || xml1.errorCode == 4) {
        data.append("teacher", doing);
        if (unfinished.length == 1) {
          p1.innerHTML = "";
        } else {
          for (var a = 0; a < unfinished.length; a++) {
            list += "<span>" + "&nbsp" + "&nbsp" + unfinished[a] + "</span>";
          }
          p1.innerHTML = "您需要评议的辅导员有<br>" + list;
        }
        p2.innerHTML = "您正在评议的辅导员是   &nbsp" + doing;
      } else if (xml1.errorCode == 5) {
        alert("您已完成所有评测！");
        window.location.href = "index.html";
      } else if (xml1.errorCode == 2 || xml1.errorCode == 3) {
        alert("未登录");
        window.location.href = "index.html";
      } else if (xml1.errorCode == 6) {
        alert("密码错误!");
        window.location.href = "index.html";
      } else if (xml1.errorCode == 7) {
        window.location.href = "admin.html";
      } else if (xml.errorCode == 8) {
        alert("非法操作，权限不够");
        window.location.href = "index.html";
      } else if (xml.errorCode == 10) {
        alert("该学生不在评测范围内");
        window.location.href = "index.html";
      }
    }
  };
  xmlhttp1.open("get", "http://api.com/user/remains", true);
  xmlhttp1.withCredentials = true;
  xmlhttp1.send();

  que.innerHTML = "1/10.作风正派，责任心强，工作有激情";
};

function request() {
  var xmlhttp;

  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  } else {
    // code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var xml = JSON.parse(xmlhttp.response);
      teacher = xml.teacher;
      if (xml.errorCode == 0) {
      } else if (xml.errorCode == 1) {
      }
    }
  };
  xmlhttp.open("post", "http://api.com/user/store", true);
  xmlhttp.withCredentials = true;
  xmlhttp.send(data);
  alert("已完成该辅导员评测！");
  window.location.href = "index1.html";
}

btn.onclick = function() {
  if (n <= 10) {
    for (var i = 0; i < input.length; i++) {
      if (input[i].checked == true) {
        var value = input[i].value;
        val = parseFloat(value);
        data.append("ques_" + n, val);
        n++;
        cho = true;
        switch (n) {
          case 2:
            que.innerHTML = "2/10.工作能力强，有成效";
            break;
          case 3:
            que.innerHTML = "3/10.关心同学，帮助解决思想上的困惑";
            break;
          case 4:
            que.innerHTML =
              "4/10.引导同学成长成才，指导职业规划、就业考研和创新创业";
            break;
          case 5:
            que.innerHTML =
              "5/10.关注同学学业，深入课堂，关心同学的学习进步和变化";
            break;
          case 6:
            que.innerHTML =
              "6/10.深入寝室，与同学交心谈心，开展寝室文化建设和卫生安全教育活动";
            break;
          case 7:
            que.innerHTML = "7/10.在各类评选、评定中公正无私，真实透明";
            break;
          case 8:
            que.innerHTML = "8/10.关心关爱家庭经济困难学生";
            break;
          case 9:
            que.innerHTML = "9/10.妥善协调同学关系，及时化解各种矛盾";
            break;
          case 10:
            que.innerHTML = "10/10.总体评价";
            break;
          case 11:
            console.log(data);
            request();
            break;
        }
        input[i].checked = false;
        input[i].tag = 0;
        time(this);
      }
    }
    if (!cho) {
      alert("请选择");
    }
    cho = false;
  }
};

function time(a) {
  if (wait == 0) {
    a.removeAttribute("disabled");
    a.innerHTML = "下一题";
    wait = 1;
    b++;
    console.log(b);
    if (b == 18) {
      a.innerHTML = "提交";
    }
  } else {
    a.setAttribute("disabled", true);
    a.innerHTML = "下一题(" + wait + ")";
    wait--;
    b++;
    if (b == 17) {
      a.innerHTML = "提交";
    }
    setTimeout(function() {
      time(a);
    }, 1000);
  }
}

function check(radio) {
  if (radio.tag == 1) {
    radio.checked = false;
    radio.tag = 0;
  } else {
    radio.checked = true;
    radio.tag = 1;
  }
}
