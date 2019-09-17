/* eslint-disable no-debugger */
<template>
  <div>
    <input
      type="text"
      value=""
      placeholder="请输入验证码"
      class="input-val"
      @click="msgCode"
    />
    <canvas id="canvas"></canvas>
  </div>
</template>
<script>
import 'element-ui'
import 'jquery'
export default {
  created() {
    this.msgCode()
  },
  data() {
    return {
      shows_num: [],
      show_val: ''
    }
  },
  mounted() {
    // 留言动态验证码
    $(function() {
      // eslint-disable-next-line camelcase
      this.shows_num = []
      draw(this.shows_num)
      $('#canvas').on('click', function() {
        draw(this.shows_num)
      })
      $('.btn').on('click', function() {
        var val = $('.input-val')
          .val()
          .toLowerCase()
        this.show_val = val
        var num = this.shows_num.join('')
        // eslint-disable-next-line eqeqeq
        if (val == '') {
          this.$message({
            message: '请输入验证码',
            type: 'error'
          })
          // eslint-disable-next-line eqeqeq
        } else if (val == num) {
          $('.input-val').val('')
          // draw(this.shows_num);
          return this.val
        } else {
          this.$message({
            message: '验证码错误！请重新输入！',
            type: 'error'
          })
          $('.input-val').val('')
          // draw(this.shows_num);
        }
      })
    })
    // 生成并渲染出验证码图形
    // eslint-disable-next-line camelcase
    function draw() {
      // eslint-disable-next-line camelcase
      var canvasWidth = $('#canvas').width()
      // eslint-disable-next-line camelcase
      var canvas_height = $('#canvas').height()
      var canvas = document.getElementById('canvas') // 获取到canvas的对象，演员
      var context = canvas.getContext('2d') // 获取到canvas画图的环境，演员表演的舞台
      // eslint-disable-next-line camelcase
      canvas.width = canvasWidth
      // eslint-disable-next-line camelcase
      canvas.height = canvas_height
      var sCode =
        'a,b,c,d,e,f,g,h,i,j,k,m,n,p,q,r,s,t,u,v,w,x,y,z,A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0'
      var aCode = sCode.split(',')
      var aLength = aCode.length // 获取到数组的长度
      for (var i = 0; i < 4; i++) {
        // 这里的for循环可以控制验证码位数（如果想显示6位数，4改成6即可）
        var j = Math.floor(Math.random() * aLength) // 获取到随机的索引值
        // var deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
        var deg = Math.random() - 0.5 // 产生一个随机弧度
        var txt = aCode[j] // 得到随机的一个内容
        this.shows_num[i] = txt.toLowerCase()
        var x = 10 + i * 20 // 文字在canvas上的x坐标
        var y = 20 + Math.random() * 8 // 文字在canvas上的y坐标
        context.font = 'bold 23px 微软雅黑'
        context.translate(x, y)
        context.rotate(deg)
        context.fillStyle = randomColor()
        context.fillText(txt, 0, 0)
        context.rotate(-deg)
        context.translate(-x, -y)
      }
      // eslint-disable-next-line no-redeclare
      for (var i = 0; i <= 5; i++) {
        // 验证码上显示线条
        context.strokeStyle = randomColor()
        context.beginPath()
        context.moveTo(
          // eslint-disable-next-line camelcase
          Math.random() * canvasWidth,
          // eslint-disable-next-line camelcase
          Math.random() * canvas_height
        )
        context.lineTo(
          // eslint-disable-next-line camelcase
          Math.random() * canvasWidth,
          // eslint-disable-next-line camelcase
          Math.random() * canvas_height
        )
        context.stroke()
      }
      // eslint-disable-next-line no-redeclare
      for (var i = 0; i <= 30; i++) {
        // 验证码上显示小点
        context.strokeStyle = randomColor()
        context.beginPath()
        let x = Math.random() * canvasWidth
        context.moveTo(x, y)
        context.lineTo(x + 1, y + 1)
        context.stroke()
      }
    }
    // 得到随机的颜色值
    function randomColor() {
      var r = Math.floor(Math.random() * 256)
      var g = Math.floor(Math.random() * 256)
      var b = Math.floor(Math.random() * 256)
      return 'rgb(' + r + ',' + g + ',' + b + ')'
    }
  },
  methods: {
    msgCode(val) {
      // eslint-disable-next-line no-debugger
      // debugger
      // let data = {
      //   show_name: this.show_num,
      //   show_val: this.show_val
      // }
      this.$emit('getCode', this.show_num, this.show_val) // select事件触发后，自动触发showCityName事件
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.input-val {
  // width: 90px;
  // height: 30px;
  border: 1px solid #bfcbd9;
  vertical-align: middle;
  margin-left: 10px;
}
#canvas {
  // width: 100px;
  // height: 30px;
  border: 1px solid #bfcbd9;
  vertical-align: middle;
}
</style>
