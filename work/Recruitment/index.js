var act = new Vue({
    el: "#part2",
    data: {
        flag1: "display:block",
        flag2: "display:none",
        text: "确认登录",
        flag: true,
        hide: false
    },
    methods: {
        x1: function () {
            this.flag1 = "display:block";
            this.flag2 = "display:none";
            this.text = "确认登录";
            this.flag = true;
            this.hide = false;
        },
        x2: function () {
            this.flag1 = "display:none";
            this.flag2 = "display:block";
            this.text = "注册";
            this.flag = false;
            this.hide = true;
        }
    }
});