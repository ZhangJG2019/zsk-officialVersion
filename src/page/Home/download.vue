/* eslint-disable no-debugger */
<template>
  <div class="taskUser">
    <y-header>
      <div slot="nav"></div>
    </y-header>
    <el-card class="box-card" style="width:76.5rem; margin:0 auto;">
      <div class="tablecontent">
        <div class="content_title">
          <el-row>
            <el-col :span="24" style="margin-bottom:20px;">
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }" style="font-size:15px;"
                  >首页</el-breadcrumb-item
                >
                <el-breadcrumb-item style="font-size:15px;"
                  >下载</el-breadcrumb-item
                >
              </el-breadcrumb>
            </el-col>
            <!-- <el-col :span="8">
              <el-input
                style="float:right;margin-bottom:13px"
                icon="search"
                placeholder="请输入关键字"
                v-model="input"
                :minlength="1"
                :maxlength="100"
                :on-icon-click="handleIconClick"
                @keydown.enter.native="handleIconClick"
              >
              </el-input>
            </el-col> -->
            <el-col :span="24">
              <!-- 左侧具体内容区 1-->
              <div class="slide_center news">
                <ul>
                  <!-- 任务搜索框 1-->
                  <!-- 任务搜索框 2-->
                  <!-- 任务大厅具体列表数据展示 1-->
                  <li
                    style="line-height:60px;"
                    class="center_content"
                    v-for="(item, key) in taskhall"
                    :key="key"
                    :id="item.subCategoryId"
                    @current-change="handleCurrentChange"
                  >
                    <div
                      class="right_left"
                      style="float:left;margin-top:40px; "
                    >
                      <span
                        class="iconfont icon-jiyinsuanfa"
                        style="font-size:50px;"
                      ></span>
                    </div>
                    <div
                      class="right_right"
                      style="float:left;margin-left:1.75rem;width:90%;border-bottom:1px solid #eee;cursor:pointer;"
                    >
                      <div
                        class="left_content"
                        style="float:left; overflow: hidden; text-overflow: ellipsis;white-space: nowrap;width:900px;"
                      >
                        <span
                          style="color:#8b94a6;font-size:25px;"
                          v-text="item.name"
                        ></span>
                        <br />
                        <span
                          style="color:#8b94a6;font-size:20px;"
                          class="right_title"
                          v-text="detailGroups"
                        >
                        </span>
                        <!-- <br />
                        <span
                          class="right_title"
                          style="color:#8b94a6;font-size:14px;height:20px;"
                          v-text="item.name"
                        >
                        </span> -->
                        <!-- <br />
                        <span
                          class="right_title"
                          style="color:#8b94a6;font-size:14px;height:20px;"
                          v-text="item.name"
                        >
                        </span> -->
                      </div>

                      <img
                        flaot="right"
                        class="right_img"
                        src="../../../static/images/download.png"
                        alt=""
                        @click="xiazai(item.id, item.url)"
                      />
                    </div>
                  </li>

                  <!-- 分页 1-->
                  <li
                    style="height:60px;line-height:60px;  "
                    class="center_content"
                  >
                    <el-pagination
                      background
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="currentPage"
                      :page-sizes="[8, 20, 30]"
                      :page-size="pageSize"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="total"
                      style="float:right;margin:25px 10px 0 0;"
                    >
                    </el-pagination>
                  </li>
                  <!-- 分页 2-->
                </ul>
              </div>
              <!-- 左侧具体内容区 1-->
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
import { Download } from '/api/index.js'
// import $ from 'jquery'
import 'element-ui'
import axios from 'axios'
export default {
  // 生命周期函数
  data() {
    return {
      href: '', // 下载路径地址
      id: 0, // 要下载数据的id
      detailGroups: '', // 所属分类
      input: '',
      taskhall: [], // 暂存请求到的所有下载列表数据
      type: '',
      downloadName: '', // 下载内容名称
      flag1: 'true', // 分页中，点击下一页
      total: 1, // 最大条数,初始化默认为1
      currentPage: 1, // 当前页
      pageSize: 8, // 每页8条
      order: 'uploaddate', // 数据请求参数
      orderType: 'desc' // 数据请求参数
    }
  },
  created() {
    this.getMsgList()
  },
  methods: {
    // 领取任务
    xiazai(id, path) {
      location.href = 'http://47.105.75.254:8080' + path
      Download(id).then(res => {
        // console.log(res)
      })
    },
    // 搜索框
    handleIconClick() {
      // console.log(this.input)
      if (this.input === '' || this.input === null) {
        this.searchString = ''
        this.getMsgList()
      } else {
        this.searchField = 'name'
        this.searchString = this.input
        this.searchOper = 'EqualTo'
        this.getMsgList()
      }
    },
    // 下载页具体数据展示
    getMsgList() {
      var topNew = this.currentPage
      var pageSize = this.pageSize
      var orderType = this.orderType
      var order = this.order
      // var url = '../../../static/data/taskhall.json'
      var url =
        '/apis/document/getfiels?page=' +
        topNew +
        '&rows=' +
        pageSize +
        '&orderType=' +
        orderType +
        '&order=' +
        order
      // var url = '/apis/document/getfiels?page=' + topNew + '&rows=' + pageSize
      axios.defaults.withCredentials = true
      let data = new FormData()
      data.append('page', this.currentPage)
      data.append('rows', this.pageSize)
      data.append(
        'order',
        'convert(t.`create_time` USING gbk) COLLATE gbk_chinese_ci'
      )
      data.append('orderType', 'asc')
      if (this.searchString === '') {
        data.append('search', 'false')
      } else {
        data.append('search', 'true')
        data.append('searchField', this.searchField)
        data.append('searchString', this.searchString)
        data.append('searchOper', this.searchOper)
      }

      axios({
        method: 'get',
        url: url,
        withCredentials: true
      }).then(res => {
        this.currentPage = res.data.pageNum // 当前页
        this.pageSize = res.data.pageSize // 当前页展示条数
        this.total = res.data.total // 返回数据总条数
        // this.detailGroups = res.data.list
        let groupName = res.data.list // 获取所属分类
        for (let i = 0; i < groupName.length; i++) {
          // console.log(groupName[i].detailGroups)
          if (groupName[i].detailGroups === 0) {
            this.detailGroups = '分类一'
          } else if (groupName[i].detailGroups === 1) {
            this.detailGroups = '分类二'
          } else if (groupName[i].detailGroups === 2) {
            this.detailGroups = '分类三'
          } else if (groupName[i].detailGroups === 3) {
            this.detailGroups = '分类四'
          }
        }
        if (groupName.length > 0) {
          this.taskhall = groupName
          // console.log(this.taskhall)
          // console.log(this.taskhall[0].path)
        } else {
          let zuixin = '.zuixin'
          this.showdiv(zuixin)
        }
      })
    },
    // 当公告、最新事件、最新研究内容没有数据时显示提示
    showdiv(e) {
      if ($(e).css('display') === 'none') {
        // 如果show是隐藏的
        $(e).css('display', 'block') // show的display属性设置为block（显示）
      } else {
        // 如果show是显示的
        $(e).css('display', 'none') // show的display属性设置为none（隐藏）
      }
    },
    // 任务列表数据分页 1
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.pageSize = val // 动态改变
      this.getMsgList() // 重新获取数据列表
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.currentPage = val // 动态改变
      this.getMsgList() // 重新获取数据列表
    }
    // 任务列表数据分页 2
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
.center_content {
  position: relative;
}
.news h2 {
  height: 56px;
  line-height: 56px;
  background: #ffffff;
  color: rgb(66, 126, 236);
  border: 1px solid #ddd;
  border-bottom: 3px solid #cdcdcd;
  border-radius: 3px 3px 0 0;
  -webkit-border-radius: 3px 3px 0 0;
}
.news h2 a {
  color: rgb(66, 126, 236);
  box-sizing: border-box;
  display: block;
  text-decoration: none;
}
.news h2 strong {
  font: bold 20px 'microsoft yahei';
  height: 56px;
  padding: 0px 24px;
  box-sizing: border-box;
}
.news h2 strong:hover {
  border-bottom: 3px solid #417eec;
  padding-bottom: 14px;
}
.left_content {
  // border: 1px solid #ddd;
  border-top: 0;
  padding-left: 20px;
  box-sizing: border-box;
  background-color: #fff;
}
.news .left_ul {
  height: 334px;
  overflow: hidden;
}
.news #newlog {
  height: 386px;
  overflow: hidden;
  padding-top: 15px;
  box-sizing: border-box;
}
.news ul li {
  width: 263px;
  height: 40px;
  line-height: 40px;
  padding: 0 0 0 20px;
  float: left;
  overflow: hidden;
}
.news ul li a {
  color: #666;
}
.slide_center ul {
  height: 100%;
  padding: 15px;
  box-sizing: border-box;
}
.slide_center ul .num {
  position: absolute;
  bottom: 5px;
  right: 20px;
  font-size: 30px;
  color: white;
}
.slide_center ul li.center_content {
  width: 100%;
  height: 120px;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
  border-top: 1px solid #ccc;
}
.slide_center ul li.center_content img {
  width: 50px;
  height: 50px;
  float: left;
  margin-top: 35px;
}
.slide_center ul li a.title {
  font-size: 20px;
  float: left;
  margin-left: 1.25rem;
  margin-top: 1rem;
}
.slide_center ul li button {
  height: 2.5rem;
  width: 7rem;
  float: right;
  margin: 2.5rem;
  border-radius: 1.5625rem;
}
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
