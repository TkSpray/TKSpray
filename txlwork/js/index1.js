window.onload = function () {
    var xmlhttp;
    var p = document.querySelector('p');
    var btn = document.querySelector('button');
    btn.innerHTML = '开始测评';
    p.className = 'text';
    p.innerHTML = '欢迎您参加2018年辅导员工作满意度测评<br><br>您需要测评的辅导员是' + '<br><br>每位辅导员有对应的9个测评问题,请根据实际情况选择对应选项<br><br>若中途退出，数据将不予以保存,因此请尽量一次填写完问卷，谢谢';

    xmlhttp.open('post', '', true);
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onredystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var xml = JSON.parse(xmlhttp.response);
            if (xml.errCode == 0) {
                p.innerHTML = '您已经完成了所有的测评<br>感谢您的参与！';
            } else if (xml.errCode == 1) {
                p.innerHTML = '您需要评议的辅导员有' + str + '的测评未完成';
            } else if (xml.errCode == 2) {
                btn.innerHTML = '开始评测';
                p.className = 'text';
                p.innerHTML = '欢迎您参加2018年辅导员工作满意度测评<br><br>您需要测评的辅导员是' + '<br><br>每位辅导员有对应的9个测评问题,请根据实际情况选择对应选项<br><br>若中途退出，数据将不予以保存,因此请尽量一次填写完问卷，谢谢';
            }
        }
    }
    formdata.append('data', JSON.stringify(message));
    xmlhttp.send(formdata);
}