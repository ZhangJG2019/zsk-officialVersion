/* eslint-disable no-debugger */
<template>
  <div class="taskhall">
    <y-header>
      <div slot="nav"></div>
    </y-header>
    <el-card class="box-card" style="width:76.5rem; margin:0 auto;">
      <div class="tablecontent">
        <div class="content_title">
          <el-row>
            <el-col :span="24"
              ><p
                style="font-size: 3.5625rem;font-family:microsoft yahei;margin-bottom:1.25rem;font-weight:100;"
              >
                基因(gene)
              </p>
              <p style="text-indent:2em;font-size:1.1rem;">
                基因（遗传因子）是产生一条多肽链或功能RNA所需的全部核苷酸序列。基因支持着生命的基本构造和性能。储存着生命的种族、血型、孕育、生长、凋亡等过程的全部信息。环境和遗传的互相依赖，演绎着生命的繁衍、细胞分裂和蛋白质合成等重要生理过程。生物体的生、长、衰、病、老、死等一切生命现象都与基因有关。它也是决定生命健康的内在因素。因此，基因具有双重属性：物质性（存在方式）和信息性（根本属性）。
              </p>
              <br />
              <p style="text-indent:2em;font-size:1.1rem;">
                带有遗传讯息的DNA片段称为基因，其他的DNA序列，有些直接以自身构造发挥作用，有些则参与调控遗传讯息的表现。组成简单生命最少要265到350个基因。（这涉及到了基因工作组的力量，人类的基因工作组与果蝇的基本相似）
              </p></el-col
            >
          </el-row>
          <el-row style="margin-top:30px;">
            <!-- 左侧菜单栏 -->
            <el-col :span="6">
              <ul class="leftmenu">
                <li class="left_type">类别</li>
                <li v-for="(item, key) in keytitle" :key="key">
                  <el-checkbox
                    name="check10"
                    class="checkboxs"
                    @change="handleCheckedTypesChange(item.id)"
                    ><span
                      :id="item.id"
                      class="left_title"
                      v-text="item.name"
                    ></span>
                    &nbsp;&nbsp;(<span v-text="map.get(item.id)"></span
                    >)</el-checkbox
                  >
                </li>
              </ul>
            </el-col>
            <!-- 右侧内容区 -->
            <el-col :span="18">
              <!-- 过滤输入框和数据总数 -->
              <div style="font-size:18px;margin-bottom:40px;">
                过滤&nbsp;:<el-input
                  style="width:300px;text-indent: 2.3em;"
                  v-model="filter_input"
                  placeholder="请输入内容"
                ></el-input>
                <p style="float:right;margin-right:5.625rem;color:#B8D1E8;">
                  <span style="color:#B0B7C2;" v-text="totalNum"></span>个途径
                </p>
              </div>
              <!-- 下方具体数据展示列表 -->
              <ul class="gene_list">
                <li
                  v-for="(item, key) in geneList"
                  :key="key"
                  style="cursor:pointer;"
                >
                  <div class="right_left" style="float:left; ">
                    <span
                      class="iconfont icon-jiyinsuanfa"
                      style="font-size:50px;"
                    ></span>
                  </div>
                  <div
                    class="right_right"
                    style="float:left;margin-left:1.75rem;width:90%;border-bottom:1px solid #eee;padding:20px 0;cursor:pointer;"
                  >
                    <div
                      class="left_content"
                      style="float:left; overflow: hidden; text-overflow: ellipsis;white-space: nowrap;width:600px;"
                    >
                      <span style="color:#8b94a6;font-size:14px;">途径</span>
                      <br />
                      <span class="right_title" v-text="item.name"> </span>
                      <br />
                      <span
                        class="right_title"
                        style="font-style:italic"
                        v-text="item.type"
                      >
                      </span>
                      <br />
                      <span class="right_title" v-text="item.introduce"> </span>
                    </div>
                    <img
                      flaot="right"
                      class="right_img"
                      src="../../../static/images/PA165986279-100px.png"
                      alt=""
                    />
                  </div>
                </li>
              </ul>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-card>
    <y-footer></y-footer>
  </div>
</template>
<script>
import YShelf from '/components/shelf'
import YButton from '/components/YButton'
import YHeader from '/common/header'
import YFooter from '/common/footer'
// import $ from 'jquery'
import 'element-ui'
import axios from 'axios'
export default {
  // 生命周期函数

  data() {
    return {
      getGene: [], // 获取列表所有具体数据存放的数组，点击复选框，发ajax重新请求所对应的新数据
      geneList: [],
      totalNum: 0, // 复选框数据（括号里面的数字）的总数
      keytitle: [],
      type: '',
      filter_input: '',
      map: new Map(),
      ids: ''
    }
  },
  created() {
    this.getNotice()
    this.getNoticeTitle()
  },
  mounted() {},
  methods: {
    // 所有基因数据列表获取
    getNotice() {
      // var gonggao = '公告'
      // var url = '/apis/cms/api/getColumnNewList?title=' + gonggao
      var url = 'static/data/getGene.json'
      axios({
        method: 'get',
        url: url
      }).then(res => {
        // 把获得好的数据 赋予 给getGene成员
        this.getGene = res.data
        this.geneList = this.getGene
        this.totalNum = this.getGene.length
        // console.log(res)
        for (let i = 0; i < this.getGene.length; i++) {
          this.map.set(
            this.getGene[i].typeId,
            this.map.get(this.getGene[i].typeId) == null
              ? 1
              : this.map.get(this.getGene[i].typeId) + 1
          )
        }
      })
    },
    // 基因数据左侧标题获取
    getNoticeTitle() {
      // var gonggao = '公告'
      // var url = '/apis/cms/api/getColumnNewList?title=' + gonggao
      var url = 'static/data/getGenetitle.json'
      axios({
        method: 'get',
        url: url
      }).then(res => {
        // 把获得好的数据 赋予 给getGene成员
        this.keytitle = res.data
        // console.log(res)
      })
    },
    // 点击基因数据标题获取对应列表数据
    handleCheckedTypesChange(id) {
      this.geneList = []
      if (this.ids.indexOf(id + ',') === -1) {
        this.ids += id + ','
      } else {
        this.ids = this.ids.replace(id + ',', '')
      }
      console.log(this.ids)
      if (this.ids === '') {
        this.geneList = this.getGene
        return
      }
      for (let i = 0; i < this.getGene.length; i++) {
        let typeId = this.getGene[i].typeId + ','
        if (this.ids.indexOf(typeId) !== -1) {
          this.geneList.push(this.getGene[i])
        }
      }
      // var url = 'static/data/getGene.json'
      // axios({ methods: 'get', url: url }).then(res => {
      //   // console.log(res.data)
      //   for (let i = 0; i < this.getGene.length; i++) {
      //     this.map.set(
      //       this.getGene[i].typeId,
      //       this.map.get(this.getGene[i].typeId) == null
      //         ? 1
      //         : this.map.get(this.getGene[i].typeId) + 1
      //     )
      //   }
      // })
    }
  },
  components: {
    YShelf,
    YButton,
    YHeader,
    YFooter
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.gene_list li:hover {
  // background-color: #f9f9fa;
  background-color: red;
}
.gene_list {
  width: 50rem;
}
.gene_list li {
  width: 100%;
  height: 100%;
}
.gene_list li:hover {
  background-color: green;
  width: 100%;
  height: 100%;
}
.right_img {
  float: right;
  margin: 1rem 1.25rem 0 0;
}
.right_right img {
  width: 3.125rem;
  height: 3.8125rem;
}
.clearfix {
  margin-bottom: 20px;
}
.right_title {
  font-size: 1rem;
  line-height: 1.5;
  font-weight: 300;
}

.left_type {
  font-size: 20px;
}
.leftmenu li {
  margin-top: 5px;
}

.leftmenu li .left_title {
  font-size: 17px;
  cursor: pointer;
  margin-left: 10px;
}
</style>
