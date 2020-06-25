var html = document.querySelector('html')
var bg = document.querySelector('.bg')
var ua = navigator.userAgent.toLowerCase() //获取UA
if (!ua.match(/micromessenger/i))
  if (!document.querySelector('.otherua-page'))
    //是其他浏览器
    window.location.href = '../../templates/otherua.html'
var otheruaPage = document.querySelector('.otherua-page')
if (otheruaPage) {
  bg.classList.add('bg2')
  window.sessionStorage.clear()
  if (ua.match(/micromessenger/i))
    //是微信浏览器
    window.location.href = '../../templates/login.html'
}

function getcoo(para) {
  let cook = document.cookie.split('; ')
  for (i in cook) {
    if (cook[i].split('=')[0] == para) {
      return cook[i].split('=')[1]
    }
  }
  return
}

if (document.cookie.split('; ')) {
  if (!document.getElementsByClassName('res-bg')[0]) {
    if (getcoo('status') == 1)
      window.location.href = '../../templates/result.html'
  }
}
/*
    登录页面 
*/

/*
答题说明页面
*/

/* 
    答题页面
*/

//成绩页面