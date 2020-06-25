<template>
  <div id="app">
    <router-view />
    <footer>
      <div class="card border-0 rounded-0">
        <div class="card-body p-0">
          <a target="_blank"
             href="https://github.com/mrthanlon/kase-be">Kase</a>
          强力驱动
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  name: 'app',
  data: function () {
    return {
      year: new Date().getFullYear()
    }
  },
  created () {
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))))
    }
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state))
    })
  }
}
</script>
<style>
footer {
  text-align: center;
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
}
textarea {
  resize: none !important;
}
</style>
