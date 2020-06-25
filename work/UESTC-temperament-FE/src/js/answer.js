 // if (!sessionStorage.userTestData) window.location.replace = './login.html'
 var ansPage = document.querySelector('.answer-page')
 var userTestData = JSON.parse(sessionStorage.userTestData)
 var quesCon = ansPage.querySelector('.test-content')
 var ulCon = ansPage.querySelector('.ul-con')
 var currentNum = ansPage.querySelector('.current-num')
 var numNav = ansPage.querySelector('.num-nav')
 var numCon = ansPage.querySelector('.num-con')
 var prevBtn = ansPage.querySelector('.test-prev')
 var nextBtn = ansPage.querySelector('.test-next')
 var testWrap = ansPage.querySelector('.test-wrap')
 var h2 = ansPage.querySelector('h2')
 var btn = ansPage.querySelector('.pop-btn')
 var popSubmit = ansPage.querySelector('.pop-submit')
 var popCon = ansPage.querySelector('.pop-con')
 var popQuit = ansPage.querySelector('.pop-quit')
 var index = 0
 var html = document.querySelector('html')
 var bg = document.querySelector('.bg')

 function Itemcontent(index) {
   ulCon.innerHTML = ''
   ulCon.scrollTop = 0
   if (index == 0) prevBtn.classList.add('hide')
   else {
     prevBtn.classList.remove('hide')
     nextBtn.classList.remove('hide')
   }
   quesCon.innerHTML = userTestData[index].title
   currentNum.innerHTML = index + 1
   var optionCon = document.createElement('ul')
   for (var i = 0; i < userTestData[index].options.length; i++) {
     let li = document.createElement('li')
     let a = document.createElement('a')
     let img = document.createElement('img')
     a.innerHTML = userTestData[index].options[i]
     if (index == 5 || index == 6) {
       img.src = '../src/images/' + index + i + '.png'
       li.classList.add('ul-img')
       a.classList.add('ul-a')
       if (index == 5) {
         a.classList.add('none')
         li.classList.remove('ul-img')
         li.classList.add('ul-img2')
       }
       li.appendChild(img)
     }
     li.appendChild(a)
     optionCon.appendChild(li)
   }
   ulCon.appendChild(optionCon)
   selectEvent(index, optionCon)
 }

 function selectEvent(index, optionCon) {
   var ulList = optionCon.querySelectorAll('li')
   for (var i = 0; i < ulList.length; i++) {
     userTestData[index].answer.forEach(item => {
       if (ulList[i].querySelector('a').innerHTML == item) {
         ulList[i].classList.add('on')
       }
     })
   }
   optionCon.addEventListener(
     'click',
     function (e) {
       var target = e.target
       if (target.tagName == 'LI' || target.tagName == 'A') {
         for (var i = 0; i < ulList.length; i++) {
           if (ulList[i] == target || ulList[i].querySelector('a') == target) {
             if (userTestData[index].answer.length == 0) {
               ulList[i].classList.add('on')
               if (target.tagName == 'LI')
                 userTestData[index].answer.push(
                   target.querySelector('a').innerHTML
                 )
               if (target.tagName == 'A')
                 userTestData[index].answer.push(target.innerHTML)
             } else {
               if (index == 4 || index == 5 || index == 8 || index == 9 || index == 10) {
                 let pre = userTestData[index].answer[0]
                 for (let ulindex in ulList) {
                   if (ulList[ulindex].classList.contains('on')) {
                     ulList[ulindex].classList.remove('on')
                     break
                   }
                 }
                 if (target.tagName == 'A') {
                   if (
                     pre == target.innerHTML
                   ) {
                     userTestData[index].answer.splice(0, 1)
                     break
                   } else {
                     userTestData[index].answer.splice(0, 1, target.innerHTML)
                   }
                 }
                 if (target.tagName == 'LI') {
                   if (
                     pre ==
                     target.querySelector('a').innerHTML
                   ) {
                     userTestData[index].answer.splice(0, 1)
                     break
                   } else {
                     userTestData[index].answer.splice(0, 1, target.querySelector('a').innerHTML)
                   }
                 }
                 ulList[i].classList.add('on')
               } else {
                 for (let ansindex in userTestData[index].answer) {
                   if (target.tagName == 'A') {
                     if (
                       userTestData[index].answer[ansindex] == target.innerHTML
                     ) {
                       ulList[i].classList.remove('on')
                       userTestData[index].answer.splice(ansindex, 1)
                       break
                     }
                     if (
                       ansindex == userTestData[index].answer.length - 1 &&
                       userTestData[index].answer[ansindex] !== target.innerHTML
                     )
                       userTestData[index].answer.push(target.innerHTML)
                     ulList[i].classList.add('on')
                   }
                   if (target.tagName == 'LI') {
                     if (
                       userTestData[index].answer[ansindex] ==
                       target.querySelector('a').innerHTML
                     ) {
                       ulList[i].classList.remove('on')
                       userTestData[index].answer.splice(ansindex, 1)
                       break
                     }
                     if (
                       ansindex == userTestData[index].answer.length - 1 &&
                       userTestData[index].answer[ansindex] !== target.innerHTML
                     )
                       userTestData[index].answer.push(
                         target.querySelector('a').innerHTML
                       )
                     ulList[i].classList.add('on')
                   }
                 }
               }
             }
           }
         }
       }
     },
     false
   )
 }
 Itemcontent(index)
 nextBtn.addEventListener(
   'click',
   function () {
     if (index + 1 == userTestData.length) {
       popCon.classList.remove('hide')
       popQuit.addEventListener('click', function () {
         popCon.classList.add('hide')
       })
     } else {
       Itemcontent(++index)
     }
   },
   false
 )
 prevBtn.addEventListener(
   'click',
   function () {
     Itemcontent(--index)
   },
   false
 )

 function submitBtnH() {
   let done = 1
   window.onbeforeunload = function (e) {
     var e = window.event || e
     e.preventDefault()
   }
   let data = userTestData
   for (let i = 0; i < 14; i++) {
     if (data[i].answer.length == 0) {
       alert('您第' + (i + 1) + '题还未选择答案')
       done = 0
       return
     }
   }
   for (let i = 0; i < 14; i++) {
     delete data[i].title
     delete data[i].options
   }

   if (done == 1) {
     //  var userInf = JSON.parse(sessionStorage.userInf)
     //  var username = userInf.username;
     $.ajax({
       async: false,
       type: 'POST',
       dataType: 'json',
       url: 'http://meeting.uestc.cn/api/question/submit',
       data: {
         'data': data
       },
       success: function (result) {
         //  if (result.code == 1) {
         //  sessionStorage.score = JSON.stringify(result.data.score)
         // $.ajax({
         //   async: false,
         //   type: 'GET',
         //   dataType: 'image/png',
         //   url: 'meeting.uestc.cn/api/pic/get?openid='+window.getCookie('openid'),
         //   success: function(subresult) {
         //     sessionStorage.resultimg = subresult
         //   },
         //   error: function() {
         //     alert('获取结果图片失败，请重新作答');
         //     window.location.replace="./answer.html";
         //   }
         // })
         // sessionStorage.url = JSON.stringify(result.url);
         // sessionStorage.imgurl = 'meeting.uestc.cn/api/pic/get?openid='+window.getCookie('openid');
         //  jsondata = result.splice(0, 1)
         window.location.href = './result.html'
       },
       error: function () {
         alert('异常！')
       }
     })
   }
 }
 //离开事件
 window.onbeforeunload = function (e) {
   var e = window.event || e
   e.returnValue = confirm('确定离开当前页面吗？')
 }

 window.onunload = unloadPage

 function unloadPage() {
   submitBtnH()
 }

 function pushHistory() {
   var state = {
     title: 'title',
     url: '#'
   }
   window.history.pushState(state, 'title', '#')
 }
 popSubmit.addEventListener('click', function (e) {
   e.preventDefault()
   submitBtnH()
 })
 window.addEventListener(
   'popstate',
   function (e) {
     popCon.classList.remove('hide')
     popQuit.addEventListener('click', function () {
       popCon.classList.add('hide')
     })
   },
   false
 )