<template>
  <div class="right">
    <img
      src="../assets/头像.png"
      @mouseover="flag = !flag"
      @mouseout="flag = !flag"
      class="icon"
    />
    <img
      src="../assets/route.png"
      v-bind:class="[{ arrowhead: 1 }, { rotate1: flag }, { rotate2: !flag }]"
    />
    <transition name="draw">
      <div
        class="userbox"
        v-show="flag"
        @mouseover="flag = 1"
        @mouseout="flag = 0"
      >
        <!-- <button
          class="btn"
          v-show="flag"
          @click="revisebar"
        >个人信息</button> -->
        <button class="btn" v-show="flag" @click="quit">退出登陆</button>
      </div>
    </transition>
  </div>
</template>

<script>
import bus from '../components/bus.js'
export default {
  name: 'banner',
  data() {
    return {
      flag: false,
      userflag: false
    }
  },
  methods: {
    quit: function() {
      this.setCookie('', '', '', '', -1)
      if (
        this.$route.path === '/adminindex/overview' ||
        this.$route.path === '/adminindex'
      ) {
        this.$router.push({ path: '/managerlogin' })
      } else {
        this.$router.push({ name: 'home' })
      }
    },
    revisebar: function() {
      this.userflag = !this.userflag
      this.$emit('usershow', this.userflag)
    },
    setCookie(name, pwd, adna, adpas, day) {
      var exdate = new Date()
      exdate.setTime(exdate.getTime() + 10 * 60 * 1000 * day)
      window.document.cookie =
        'userName' + '=' + name + ';path=/;expires=' + exdate.toGMTString()
      window.document.cookie =
        'userPwd' + '=' + pwd + ';path=/;expires=' + exdate.toGMTString()
      window.document.cookie =
        'adminName' + '=' + name + ';path=/;expires=' + exdate.toGMTString()
      window.document.cookie =
        'adminPwd' + '=' + pwd + ';path=/;expires=' + exdate.toGMTString()
    }
  },
  mounted() {
    bus.$on('listen', show => {
      this.userflag = show
    })
  }
}
</script>

<style>
@media (min-width: 400px) {
  .right {
    position: relative;
    /* background-color: rgba(0, 0, 0, 0.3); */
    text-align: right;
    width: 160px;
  }

  .icon {
    height: 50px;
    width: 50px;
    margin-right: 8px;
    border-radius: 50%;
  }

  .icon:hover .btn:hover {
    cursor: pointer;
  }
  .arrowhead {
    height: 25px;
    margin-bottom: 12px;
    margin-left: 7px;
    display: inline-block;
    width: 12px;
  }

  .rotate1 {
    transform-origin: center center;
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    -o-transform: rotate(90deg);
    transition: transform 0.2s;
    -moz-transition: -moz-transform 0.2s;
    -moz-transition: -moz-transform 0.2s;
    -o-transition: -o-transform 0.2s;
    -ms-transition: -ms-transform 0.2s;
  }

  .rotate2 {
    transform-origin: center center;
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transition: transform 0.2s;
    -moz-transition: -moz-transform 0.2s;
    -moz-transition: -moz-transform 0.2s;
    -o-transition: -o-transform 0.2s;
    -ms-transition: -ms-transform 0.2s;
  }
  .userbox {
    height: 40px;
    width: 98px;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.3);
    top: 52px;
    right: -20px;
    /* padding-top: 10px; */
  }
  .draw-enter-active,
  .draw-leave-active {
    transition: all 1s ease;
  }
  .draw-enter, .draw-leave-to /* .fade-leave-active below version 2.1.8 */ {
    height: 0;
  }

  .btn {
    width: inherit;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.3);
    color: #ffffff;
    border: 0;
    font-size: 1rem;
  }
  .btn:hover {
    cursor: pointer;
  }
}

@media (max-width: 700px) {
  .right {
    display: none;
  }
}
</style>
