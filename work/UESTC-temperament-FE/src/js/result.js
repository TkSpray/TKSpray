var resultPage = document.querySelector('.result-page')
// document.querySelector('body').addEventListener('touchmove', function (e) {
//   e.preventDefault();
// });
// bg.classList.add('bg3')

// if (!sessionStorage.imgurl) {
//   alert("获取图片链接失败！请重新作答");
//   window.location.href = './login.html'
// }

// var adNum = resultPage.querySelector('.ad-num').querySelector('span')
// var stuName = resultPage.querySelector('.stu-name').querySelector('span')
// var stuResult = resultPage.querySelector('.stu-result').querySelector('span')
// var userInf = JSON.parse(sessionStorage.userInf)
// adNum.innerHTML = userInf.username
// stuName.innerHTML = userInf.name
// stuResult.innerHTML = sessionStorage.score
// ? JSON.parse(sessionStorage.score)
// : userInf.score
function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

function getcoo(para) {
  let array = document.cookie.split('; ')
  for (i in array) {
    if (array[i].split('=')[0] == para) {
      return array[i].split('=')[1]
    }
  }
  return
}
let slogan = [
  [
    '“超级计算机”',
    '“长大了我要当太空人”',
    '“东风快递，使命必达”',
    '“空间站”',
    '“无人机”',
    '“人工智能”',
    '“大数据”',
    '“5G”',
    '“航母”',
    '“物联网”',
    '“量子纠缠”'
  ],
  [
    '“努力学习建设祖国”',
    '“跟我走吧~天亮就出发”',
    '“勇推科技进步”',
    '“建设种花家”',
    '“汉字真的让人感动”',
    '“科技发展冲鸭！！”',
    '“爸爸！我要学！”',
    '“让人泪目的文化传承”',
    '“感谢科学”'
  ],
  [
    '“我曾经跨过山和大海”',
    '“我们的征途是星辰大海”',
    '“CET”',
    '“TOEFL”',
    '“IELTS”',
    '“GRE”',
    '“GPA4.0”',
    '“offer”',
    '“异国风情”',
    '“一带一路”',
    '“人类命运共同体”',
    '“挣鹰酱的小钱钱”'
  ],
  [
    '“自强不息！！”',
    '“青年当自强”',
    '“国旗的力量”',
    '“此生不悔入华夏”',
    '“壮哉我大中华！”',
    '“爱你❤大中华”',
    '“阿中哥哥加油”',
    '“我爱中国”',
    '“祖国万岁”',
    '“天佑中华”',
    '“永远的中国红！”',
    '“很幸运自己是中国人！”',
    '“祖国我爱你❤❤❤❤❤！”',
    '“心中一样亲”',
    '“加油↖(^ω^)↗中国”',
    '“因为他是我伟大的祖国”'
  ]
]
var jsondata = {
  score1: getcoo('score1'), //梦追科学型
  score2: getcoo('score2'), //情怀人文型
  score3: getcoo('score3'), //五洋九天型
  score4: getcoo('score4') //报国赤枕型
}
// var jsondata = {
//   score1: 13, //梦追科学型
//   score2: 6, //情怀人文型
//   score3: 12, //五洋九天型
//   score4: 10 //报国赤枕型
// }
var userkind = ['梦追科学型', '情怀人文型', '五洋九天型', '报国赤枕型']
var brDiv = document.createElement('div')
brDiv.innerHTML = '<br/>'
let randomarr = []
let arraydata = []
let headsrc = getcoo('headimgurl')
let usernick = getcoo('nickname')
document.querySelector('.res-headimg').src = decodeURIComponent(headsrc)
document.querySelector('.res-username').innerHTML = decodeURIComponent(usernick)
for (let userscore of Object.values(jsondata)) {
  arraydata.push(parseInt(userscore))
}
let maxscore = arraydata[0]
let maxindex = 0
let secindex = 0
let slogancolor = ['#b0e7cf', '#e8e6aa', '#ffbe8a', '#ff7f80']

// document.getElementById('res-name').innerHTML = '&nbsp 昵称：'

//获取用户类型
let temparr = arraydata.slice()
temparr = temparr.sort(function (a, b) {
  return a - b
})
maxindex = arraydata.findIndex(item => item == temparr[3])
secindex = arraydata.findIndex(item => item == temparr[2]);
[arraydata[0], arraydata[maxindex]] = [arraydata[maxindex], arraydata[0]]

var slowrap = document.getElementById('slogan-wrap')

while (randomarr.length < 2) {
  let sloindex = random(0, slogan[maxindex].length)
  if (randomarr.indexOf(sloindex) == -1) {
    randomarr.push(sloindex)
  }
}
// document.getElementsByClassName('res-type')[0].style.color =
//   slogancolor[maxindex]
// document.getElementsByClassName('res-type')[0].innerHTML = userkind[maxindex]

//添加弹幕
let elespan1 = document.createElement('div')
elespan1.innerHTML =
  slogan[secindex][random(0, slogan[secindex].length)] + '<br>'
elespan1.style.color = '#ffffff'
if (elespan1.innerHTML.length <= 12) {
  elespan1.style.fontSize = random(47, 63) + 'px'
} else {
  elespan1.style.fontSize = random(30, 40) + 'px'
}
elespan1.style.textAlign = 'right'
slowrap.appendChild(elespan1)

for (let i = 0; i < 2; i++) {
  let elespan = document.createElement('div')
  elespan.innerHTML = slogan[maxindex][randomarr[i]] + '<br>'
  elespan.style.color = '#ffffff'
  if (elespan.innerHTML.length <= 12) {
    elespan.style.fontSize = random(47, 63) + 'px'
  } else {
    elespan.style.fontSize = random(35, 40) + 'px'
  }
  elespan.style.textAlign = ['left', 'right'][i]
  slowrap.appendChild(elespan)
}

let elespan2 = document.createElement('div')
elespan2.innerHTML = slogan[3][random(0, slogan[3].length)] + '<br>'
elespan2.style.color = '#ffffff'
if (elespan2.innerHTML.length <= 12) {
  elespan2.style.fontSize = random(47, 63) + 'px'
} else {
  elespan2.style.fontSize = random(30, 40) + 'px'
}
slowrap.appendChild(elespan2)

//修改类型
document.getElementsByClassName('radar-bg')[0].src =
  '../src/images/kind' + maxindex + '.png'
document.getElementsByClassName('seal')[0].src =
  '../src/images/seal' + maxindex + '.png'
//绘制雷达图
var mychart = echarts.init(document.getElementById('main'))
var option = {
  radar: [{
    indicator: [{
        text: userkind[0],
        max: 20
      },
      {
        text: userkind[1],
        max: 20
      },
      {
        text: userkind[2],
        max: 20
      },
      {
        text: userkind[3],
        max: 20
      }
    ],
    center: ['50%', '50%'],
    radius: '70%',
    splitNumber: 4,
    shape: 'polygon',
    startAngle: 90,
    splitArea: {
      areaStyle: {
        color: [
          'rgba(255, 255, 255,0.6)',
          'rgba(255, 255, 255,0.6)',
          'rgba(255, 255, 255,0.3)',
          'rgba(255, 255, 255,0)'
        ]
      }
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: 'rgba(255, 255, 255)'
      }
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: 'white'
      }
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(255, 255, 255)'
      }
    },
    name: {
      fontSize: 40,
      textStyle: {
        color: '#ffffff'
      },
      show: false
    }
  }],
  animation: false,
  series: [{
    type: 'radar',
    symbol: 'angle',
    symbolSize: 10,
    smooth: true,
    color: '#ec878a',
    data: [{
      value: arraydata,
      name: 'data',
      areaStyle: {
        normal: {
          color: '#ec878a'
        }
      },
      lineStyle: {
        color: 'rgba(255,255,255,0)'
      }
    }]
  }],
  itemStyle: {
    normal: {
      borderWidth: 0,
      color: '#2CBAFF'
    }
  }
}
mychart.setOption(option)
let canvas = document.getElementsByTagName('canvas')[0]
canvas.classList.add('hide')
let canvasimg = canvas.toDataURL()
var img = document.createElement('img')
img.classList.add('radarimg')
img.setAttribute('src', canvasimg)
document.getElementById('resultimg').appendChild(img)

//整个页面转换为img
window.onload = function () {
  setTimeout(function () {
    var copyDom = document.getElementsByClassName('result-page')[0] //要保存的dom
    var width = copyDom.offsetWidth //dom宽
    var height = copyDom.offsetHeight //dom高
    var scale = 2
    new html2canvas(document.getElementsByClassName('result-page')[0], {
      allowTaint: false,
      dpi: window.devicePixelRatio * 2,
      scale: scale,
      width: width,
      heigth: height,
      useCORS: true,
      logging: true
    }).then(canvas => {
      // canvas为转换后的Canvas对象
      let oImg = new Image()
      oImg.src = canvas.toDataURL() // 导出图片
      document.body.appendChild(oImg) // 将生成的图片添加到body
      oImg.style.width = '100%'
      oImg.style.height = '100vh'
      document.getElementsByClassName('seal')[0].classList.add('hide')
      document.getElementsByClassName('result-page')[0].classList.add('hide')
      let waitwrap = document.getElementsByClassName('whitewrap')[0]
      setTimeout(x => {
        waitwrap.classList.add('hide')
      }, 1000)
    })
  }, 3000)
}
var mo = function (e) {
  e.preventDefault()
}

function change() {
  let i = 0
  i++;
  if (document.all) o.style.filter = "Alpha(Opacity=" + i + ")"; //for IE    
  else o.style.opacity = i / 100; //for FF
  if (i > 100) i = 0;
}

function stop() {
  document.body.style.overflow = 'hidden'
  document.addEventListener('touchmove', mo, {
    passive: false
  }) //禁止页面滑动
}
//直接默认不让滑动
stop()