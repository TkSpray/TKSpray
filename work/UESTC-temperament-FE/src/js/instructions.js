// if (
//   String(window.location.replace).split('/')[
//     String(window.location.replace).split('/').length - 1
//   ] === 'instructions.html'
// ) {
var html = document.querySelector('html')
var bg = document.querySelector('.bg')
bg.classList.remove('bg')
bg.classList.add('bg2')

function getcoo(para) {
  array = document.cookie.split('; ')
  for (i in array) {
    if (array[i].split('=')[0] == para) {
      return array[i].split('=')[1]
    }
  }
  return
}
// if (!document.cookie.split('; ')[1].split('=')[1])
//   window.location.replace = './login.html'
// if (document.cookie.split('; ')[3].split('=')[1] == 1) {
//   sessionStorage.imgurl = 'http://meeting.uestc.cn/api/pic/get'
//   alert('您已作答！将跳转至结果页面')
//   window.location.replace = './result.html'
// }

let username = getcoo('nickname')
if (getcoo('status') == 1) {
  window.location.replace = './result.html'
}
$('.usrname')
  .find('span')
  .text('欢迎你，' + decodeURI(username))

var beginBtn = document.querySelector('.begin-btn')
beginBtn.addEventListener('click', function () {
  $.ajax({
    async: false,
    type: 'GET', //方法类型
    dataType: 'json', //预期服务器返回的数据类型
    // url: "http://121.48.165.113:17901/user/getproblem" ,
    url: '../../mockBE/user/getproblem.json',
    success: function (result) {
      if (result.errorCode == 0) {
        sessionStorage.userTestData = JSON.stringify(result.data)
        window.location.href = './answer.html'
      }
    },
    error: function () {
      alert('异常！')
    }
  })
})
// }