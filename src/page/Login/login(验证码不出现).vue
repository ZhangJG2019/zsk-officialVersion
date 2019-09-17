/* eslint-disable no-debugger */
<template>
  <div class="login v2">
    <div class="wrapper">
      <div
        class="dialog dialog-shadow"
        style="display: block; margin-top: -362px;"
      >
        <div class="title">
          <h4>使用 三济生物 账号 登录官网</h4>
        </div>
        <div v-if="loginPage" class="content">
          <ul class="common-form">
            <li class="username border-1p">
              <div class="input">
                <input
                  type="text"
                  v-model="ruleForm.userName"
                  placeholder="账号"
                />
              </div>
            </li>
            <li>
              <div class="input">
                <input
                  type="password"
                  v-model="ruleForm.userPwd"
                  @keyup.enter="login"
                  placeholder="密码"
                />
              </div>
            </li>
            <li>
              <div class="inputCode">
                <!-- <Valicode @getCode="login"></Valicode> -->
                <input
                  type="text"
                  value=""
                  v-model="ruleForm.code"
                  placeholder="请输入验证码"
                  class="input-val"
                  @keyup.enter="login"
                />
                <canvas id="canvas"></canvas>
              </div>
            </li>
            <li style="text-align: right" class="pr">
              <el-checkbox class="auto-login" v-model="autoLogin"
                >记住密码</el-checkbox
              >
              <a class="register" @click="home">首页</a>
              <a href="javascript:;" class="register" @click="toRegister"
                >注册 三济生物 账号</a
              >
              <a href="javascript:;" class="register" @click="toForgotpwd"
                >忘记密码 ?</a
              >
            </li>
          </ul>
          <!--登陆 -->
          <div style="margin-top: 25px">
            <y-button
              :text="logintxt"
              :classStyle="
                ruleForm.userPwd && ruleForm.userName && logintxt === '登录'
                  ? 'main-btn'
                  : 'disabled-btn'
              "
              @btnClick="login"
              style="margin: 0;width: 100%;height: 48px;font-size: 18px;line-height: 48px"
            ></y-button>
          </div>
          <!--返回-->
          <div>
            <y-button
              text="返回"
              @btnClick="login_back"
              style="marginTop: 10px;marginBottom: 15px;width: 100%;height: 48px;font-size: 18px;line-height: 48px"
            >
            </y-button>
          </div>
          <div class="border"></div>
          <div class="footer"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Valicode from '/components/validateCode'
import YFooter from '/common/footer'
import YButton from '/components/YButton'
import { userLogin } from '/api/index.js'
import { setStore, getStore, removeStore } from '/utils/storage.js'
import 'element-ui'
// import { isvalidUsername } from '@/utils/validate'
// import SIdentify from '@/components/identify/identify.vue'
export default {
  data() {
    return {
      loginPage: true,
      ruleForm: {
        userName: '111',
        userPwd: '123456',
        code: '',
        num: [],
        errMsg: ''
      },
      autoLogin: false,
      logintxt: '登录'
    }
  },
  computed: {
    count() {
      return this.$store.state.login
    }
  },
  methods: {
    // 提示信息消息框
    open(t, m) {
      this.$notify.info({
        title: t,
        message: m
      })
    },
    messageSuccess() {
      this.$message({
        message: '恭喜您，注册成功！赶紧登录体验吧',
        type: 'success'
      })
    },
    message(m) {
      this.$message.error({
        message: m,
        type: 'error'
      })
    },
    // 获取vuex中登陆的状态
    getRemembered() {
      var judge = getStore('remember')
      if (judge === 'true') {
        this.autoLogin = true
        this.ruleForm.userName = getStore('rusername')
        this.ruleForm.userPwd = getStore('rpassword')
      }
    },
    // 使用vuex保存登录状态
    rememberPass() {
      if (this.autoLogin === true) {
        setStore('remember', 'true')
        setStore('rusername', this.ruleForm.userName)
        setStore('rpassword', this.ruleForm.userPwd)
      } else {
        setStore('remember', 'false')
        removeStore('rusername')
        removeStore('rpassword')
      }
    },
    // 跳转到登录页
    toRegister() {
      this.$router.push({
        path: '/register'
      })
    },
    // 跳转到忘记密码页
    toForgotpwd() {
      window.location.href = '/#/forgetpwd'
      // this.$router.push({
      //   path: '/pwd'
      // })
    },
    // 跳转到首页
    home() {
      window.location.href = '/'
    },
    // getCode(arg1, arg2) {
    //   console.log('子组件传过来的数据是', arg1, arg2)
    // },
    // 登录返回按钮
    login_back() {
      this.$router.go(-1)
    },
    // 登录
    // 从validateCode组件中获取用户输入的验证码和系统自动生成的验证码
    login(arg1, arg2) {
      this.logintxt = '登录中...'
      this.rememberPass()
      if (
        !this.ruleForm.userName ||
        !this.ruleForm.userPwd ||
        !this.ruleForm.code
      ) {
        // this.ruleForm.errMsg = '账号或者密码不能为空!'
        this.message('账号、密码或者验证码不能为空!')
        this.logintxt = '登录'
        console.log(this.ruleForm.code)
        console.log(this.ruleForm.num)
        return
      } else {
        if (this.ruleForm.code !== this.ruleForm.num) {
          console.log(this.ruleForm.code)
          console.log(this.ruleForm.num)
          this.message('验证码不正确!')
          this.logintxt = '登录'
          return
        }
      }
      let data = new FormData()
      data.append('username', this.ruleForm.userName)
      data.append('password', this.ruleForm.userPwd)
      userLogin(data)
        .then(res => {
          // console.log(res)
          // console.log(res.data)
          // console.log(res.data.user)
          // console.log(res.data.user.activeId)
          if (res.data !== null && res.data.user !== null) {
            setStore('token', res.data.token)
            setStore('userId', res.data.user.id)
            setStore('activeId', res.data.user.activeId)
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.logintxt = '登录'
            return this.$router.push({
              path: '/'
            })
          } else {
            this.logintxt = '登录'
            return this.$message.error(res.message)
          }
        })
        .catch(res => {
          // eslint-disable-next-line no-debugger
          if (res.response === null) {
            this.$message.error('用户不存在')
            this.logintxt = '登录'
            return
          } else {
            this.$message.error('用户或密码错误')
            this.logintxt = '登录'
            return
          }
        })
    }
  },
  created() {
    // 留言动态验证码
    $(function() {
      // eslint-disable-next-line camelcase
      var showNum = []
      this.ruleForm.num = showNum
      draw(this.ruleForm.num)
      $('#canvas').on('click', function() {
        draw(this.ruleForm.num)
      })
      $('.btn').on('click', function() {
        this.ruleForm.code = $('.input-val')
          .val()
          .toLowerCase()
        this.ruleForm.num = this.ruleForm.num.join('')
        // eslint-disable-next-line eqeqeq
        if (this.ruleForm.code == '') {
          this.$message({
            message: '请输入验证码',
            type: 'error'
          })
          // eslint-disable-next-line eqeqeq
        } else if (this.ruleForm.code == this.ruleForm.num) {
          $('.input-val').val('')
          // draw(show_num);
        } else {
          this.$message({
            message: '验证码错误！请重新输入！',
            type: 'error'
          })
          $('.input-val').val('')
          // draw(show_num);
        }
      })
    })
    // 生成并渲染出验证码图形
    // eslint-disable-next-line camelcase
    function draw(show_num) {
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
      for (var i = 0; i < 6; i++) {
        // 这里的for循环可以控制验证码位数（如果想显示6位数，4改成6即可）
        var j = Math.floor(Math.random() * aLength) // 获取到随机的索引值
        // var deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
        var deg = Math.random() - 0.5 // 产生一个随机弧度
        var txt = aCode[j] // 得到随机的一个内容
        show_num[i] = txt.toLowerCase()
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
  mounted() {
    this.getRemembered()
    // this.login_addCart()
    // this.init_geetest()
    // this.open('登录提示', '测试体验账号密码：admin | 123456')
  },
  components: {
    Valicode,
    YFooter,
    YButton
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
* {
  box-sizing: content-box;
}

.login {
  overflow-x: hidden;
  overflow-y: hidden;
  .input {
    height: 50px;
    display: flex;
    align-items: center;
    input {
      font-size: 16px;
      width: 100%;
      height: 100%;
      padding: 10px 15px;
      box-sizing: border-box;
      border: 1px solid #ccc;
      border-radius: 6px;
    }
  }
  .wrapper {
    background: url(/static/images/bg_9b9dcb65ff.png) repeat;
    background-size: 100px;
    min-height: 800px;
    min-width: 630px;
  }
}

.v2 .dialog {
  width: 450px;
  border: 1px solid #dadada;
  border-radius: 10px;
  top: 50%;
  left: 50%;
  margin-left: -225px;
  position: absolute;
  .title {
    background: linear-gradient(#fff, #f5f5f5);
    height: auto;
    overflow: visible;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
    position: relative;
    // background-image: url(/static/images/smartisan_4ada7fecea.png);
    background-image: url(/static/images/smartisan_4ada7fecea.jpg);

    background-size: 140px;
    background-position: top center;
    background-repeat: no-repeat;
    height: 92px;
    margin: 23px 0 50px;
    padding: 75px 0 0;
    box-shadow: none;
    h4 {
      padding: 0;
      text-align: center;
      color: #666;
      border-bottom: 1px solid #dcdcdc;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      font-weight: 700;
      position: absolute;
      bottom: 0;
      width: 100%;
      text-align: center;
      margin: 0;
      padding: 0;
      border-bottom: 0;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      line-height: 1em;
      height: auto;
      color: #333;
      font-weight: 400;
    }
  }
  .content {
    padding: 0 40px 22px;
    height: auto;
    .common-form {
      li {
        clear: both;
        margin-bottom: 15px;
        position: relative;
      }
    }
  }
}

.dialog-shadow,
.v2 .bbs .dialog-shadow,
.v2 .dialog-shadow {
  -webkit-box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
    0 18px 20px -10px rgba(0, 0, 0, 0.04), 0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 10px 20px -10px rgba(0, 0, 0, 0.04);
  -moz-box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
    0 18px 20px -10px rgba(0, 0, 0, 0.04), 0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 10px 20px -10px rgba(0, 0, 0, 0.04);
  box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
    0 18px 20px -10px rgba(0, 0, 0, 0.04), 0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 10px 20px -10px rgba(0, 0, 0, 0.04);
}

@media screen and (min-width: 737px),
  screen and (-webkit-max-device-pixel-ratio: 1.9) and (max-width: 736px) and (min-device-width: 737px) {
  .wrapper {
    background: url(/static/images/con-bg_04f25dbf8e.jpg) repeat-x;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .dialog {
    background: url(/static/images/dialog-gray-bg.png) #fff bottom repeat-x;
    border-radius: 12px;
    display: none;
    margin: -163px 0 0 -218px;
    width: 436px;
    position: fixed;
    left: 50%;
    top: 50%;
  }
  .dialog .title h4 {
    border-bottom: #d1d1d1 solid 1px;
    box-shadow: 0 2px 6px #d1d1d1;
    color: #666;
    font-size: 20px;
    height: 61px;
    line-height: 61px;
    padding: 0 0 0 35px;
  }
  .common-form li {
    clear: both;
    margin-bottom: 15px;
    position: relative;
  }
  .auto-login {
    position: absolute;
    top: 0px;
    left: 2px;
    color: #999;
  }
  .register {
    padding: 1px 10px 0;
    border-right: 1px solid #ccc;
  }
  .border {
    margin-top: 10px;
    border-bottom: 1px solid #ccc;
  }
  .other {
    margin: 20px 5px 0 0;
    width: auto;
    color: #bbb;
    font-size: 12px;
    cursor: default;
    color: #999;
  }
  .footer {
    display: flex;
    flex-direction: row;
  }
  .agree {
    margin-bottom: 30px;
    color: #999;
  }
}

.registered {
  h4 {
    padding: 0;
    text-align: center;
    color: #666;
    border-bottom: 1px solid #dcdcdc;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    font-weight: 700;
    font-size: 20px;
    height: 60px;
    line-height: 60px;
  }
}

#wait {
  text-align: left;
  color: #999;
  margin: 0;
}
</style>
<style>
/* // 验证码新样式 */
.inputCode .input-val {
  width: 50% !important;
  height: 50px;
  border-radius: 6px;
  padding: 10px 15px;
  margin: 0 !important;
  vertical-align: middle;
  box-sizing: border-box;
}
.inputCode #canvas {
  width: 40% !important;
  height: 50px !important;
  border-radius: 6px;
  vertical-align: middle;
}
</style>
