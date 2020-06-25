var html = document.querySelector('html')
var bg = document.querySelector('.bg')
bg.classList.remove('bg')
bg.classList.add('bg2')
formHandler()

function formHandler() {
  window.sessionStorage.clear()
  var loginBtn = document.querySelector('.login-btn')
  loginBtn.addEventListener('click', function (e) {
    e.preventDefault()
    window.location.href = 'http://meeting.uestc.cn/api/auth/get'
  })
}