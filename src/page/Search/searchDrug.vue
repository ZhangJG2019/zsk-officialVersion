<template>
  <div class="searchContent">
    <y-header>
      <div slot="nav"></div>
    </y-header>
    <!-- 顶部标签名 1-->
    <el-col :span="24">
      <div style="height:6rem;background-color:#fafbfd;width:100%;">
        <div class="center" style="width:76.5rem;margin:0 auto;height:100%;">
          <img
            src="../../../static/images/gene4.png"
            style="width:70px;height:70px;margin:15px 0 0 20px;opacity:0.4;"
            alt=""
          />
          <!-- <span style="font-size:30px;margin-left:10px;font-weight:200;line-height:100px;height:100px;vertical-align: top;" v-text="searchName">ABT-751
 </span> -->
          <span
            style="font-size:30px;margin-left:10px;font-weight:200;line-height:100px;height:100px;vertical-align: top;"
            >ABT-751
          </span>
        </div>
      </div>
    </el-col>
    <!-- 顶部标签名 1-->
    <!-- 中间内容 1-->
    <el-card class="box-card" style="width:76.5rem; margin:0 auto;">
      <div class="tablecontent">
        <el-tabs tab-position="left" style="height: 100%;" class="tab">
          <el-tab-pane label="总结">
            <el-col :span="24" style="padding-left:15px;">
              <!-- <span v-text="searchName">名称&代码 </span> -->
              <p style="font-size:25px;font-weight:500;">药物基本信息</p>
              <br />
              <p>
                <span style="font-size:18px;font-weight:500;">药物I:</span>
                <br />
                <span
                  style="font-size:15px;height:20px;line-height:30px;font-weight:100;"
                  >消化道及代谢 </span
                ><br />
                <span style="font-size:18px;font-weight:500;">药物II类: </span>
                <br />
                <span
                  style="font-size:15px;height:20px;line-height:30px;font-weight:100;"
                  >治疗与胃酸分泌相关疾病的药物
                </span>
                <br />
                <span style="font-size:18px;font-weight:500;">药物III类: </span>
                <br />
                <span
                  style="font-size:15px;height:20px;line-height:30px;font-weight:100;"
                  >消化道溃疡和胃食管返流病治疗药物
                </span>
                <br />
                <span style="font-size:18px;font-weight:500;">药物VI类: </span>
                <br />
                <span
                  style="font-size:15px;height:20px;line-height:30px;font-weight:100;"
                  >质子泵抑制药
                </span>
                <br />
                <span style="font-size:18px;font-weight:500;"
                  >药物中文名称:
                </span>
                <br />
                <span
                  style="font-size:15px;height:20px;line-height:30px;font-weight:100;"
                  >奥美拉唑
                </span>
                <br />
                <span style="font-size:18px;font-weight:500;"
                  >药物英文名称:
                </span>
                <br />
                <span
                  style="font-size:15px;height:20px;line-height:30px;font-weight:100;"
                  >omeprazole
                </span>
                <br />
                <span style="font-size:18px;font-weight:500;"
                  >药物ATC编码:
                </span>
                <br />
                <span
                  style="font-size:15px;height:20px;line-height:30px;font-weight:100;"
                  >A02BC01
                </span>
              </p>
              <br />
              <p style="margin-bottom:30px;">
                <span style="font-size:25px;font-weight:500;"
                  >药物商品名:
                </span>
                <br />
                <span
                  style="font-size:15px;height:20px;line-height:30px;font-weight:100;"
                >
                  奥美拉唑肠溶胶囊, 艾司奥美拉唑镁肠溶片, 奥美拉唑钠肠溶片,
                  奥美拉唑肠溶片, 注射用奥美拉唑钠, 注射用奥美拉唑钠(静脉滴注),
                  奥美拉唑镁肠溶片, 注射用艾司奥美拉唑钠, 艾司奥美拉唑肠溶胶囊
                </span>
                <br />
              </p>
              <br />

              <el-row style="margin:10px 0 60px 0;">
                <el-col :span="7">
                  <div class="gq-category" data-section="Literature">
                    <h3>
                      <font class="h3_title" style="vertical-align: inherit;"
                        >临床指南<!--<span
                      :id="item.code"
                      class="left_title"
                      v-text="item.name"
                    ></span> -->
                        &nbsp;&nbsp; ( 35
                        <!-- <span
                      v-text="
                        map.get(item.code) === undefined
                          ? 0
                          : map.get(item.code)
                      "
                    ></span> -->
                        )</font
                      >
                    </h3>
                    <ul class="ncbi-unstyled-list">
                      <li>
                        国外临床指南<!--<span
                      :id="item.code"
                      class="left_title"
                      v-text="item.name"
                    ></span> -->
                        &nbsp;&nbsp;<span>(30)</span>
                        <!--( 
                         <span
                      v-text="
                        map.get(item.code) === undefined
                          ? 0
                          : map.get(item.code)
                      "
                    ></span> 
                        )-->
                      </li>
                      <li>
                        国内专家共识<!--<span
                      :id="item.code"
                      class="left_title"
                      v-text="item.name"
                    ></span> -->
                        &nbsp;&nbsp;<span>(5)</span>
                        <!--( 
                         <span
                      v-text="
                        map.get(item.code) === undefined
                          ? 0
                          : map.get(item.code)
                      "
                    ></span> 
                        )-->
                      </li>
                    </ul>
                  </div>
                </el-col>
                <el-col :span="7" :offset="1">
                  <div class="gq-category" data-section="Literature">
                    <h3>
                      <font class="h3_title" style="vertical-align: inherit;"
                        >药物标签<!--<span
                      :id="item.code"
                      class="left_title"
                      v-text="item.name"
                    ></span> -->
                        &nbsp;&nbsp; ( 50
                        <!-- <span
                      v-text="
                        map.get(item.code) === undefined
                          ? 0
                          : map.get(item.code)
                      "
                    ></span> -->
                        )</font
                      >
                    </h3>
                    <ul class="ncbi-unstyled-list">
                      <li>
                        国外药物标签<!--<span
                      :id="item.code"
                      class="left_title"
                      v-text="item.name"
                    ></span> -->
                        &nbsp;&nbsp;<span>(50)</span>
                        <!--( 
                         <span
                      v-text="
                        map.get(item.code) === undefined
                          ? 0
                          : map.get(item.code)
                      "
                    ></span> 
                        )-->
                      </li>
                      <li>
                        国内CFDA<!--<span
                      :id="item.code"
                      class="left_title"
                      v-text="item.name"
                    ></span> -->
                        &nbsp;&nbsp;<span>(10)</span>
                        <!-- (
                        <span
                      v-text="
                        map.get(item.code) === undefined
                          ? 0
                          : map.get(item.code)
                      "
                    ></span> 
                        )-->
                      </li>
                    </ul>
                  </div>
                </el-col>
                <el-col :span="7" :offset="1">
                  <div class="gq-category" data-section="Literature">
                    <h3>
                      <font class="h3_title" style="vertical-align: inherit;"
                        >临床试验<!--<span
                      :id="item.code"
                      class="left_title"
                      v-text="item.name"
                    ></span> -->
                        &nbsp;&nbsp; <span>(10)</span
                        ><!--( 
                         <span
                      v-text="
                        map.get(item.code) === undefined
                          ? 0
                          : map.get(item.code)
                      "
                    ></span> 
                        )--></font
                      >
                    </h3>
                    <ul class="ncbi-unstyled-list">
                      <li>
                        国外临床试验<!--<span
                      :id="item.code"
                      class="left_title"
                      v-text="item.name"
                    ></span> -->
                        &nbsp;&nbsp;<span>(7)</span>
                        <!--( 
                         <span
                      v-text="
                        map.get(item.code) === undefined
                          ? 0
                          : map.get(item.code)
                      "
                    ></span> 
                        )-->
                      </li>
                      <li>
                        国内临床试验<!--<span
                      :id="item.code"
                      class="left_title"
                      v-text="item.name"
                    ></span> -->
                        &nbsp;&nbsp;<span>(3)</span
                        ><!-- ( 
                         <span
                      v-text="
                        map.get(item.code) === undefined
                          ? 0
                          : map.get(item.code)
                      "
                    ></span> 
                        )-->
                      </li>
                    </ul>
                  </div>
                </el-col>
              </el-row>

              <el-row style="margin-bottom:10px;">
                <el-col :span="7">
                  <div class="gq-category" data-section="Literature">
                    <h3>
                      <font class="h3_title" style="vertical-align: inherit;"
                        >临床注释<!--<span
                      :id="item.code"
                      class="left_title"
                      v-text="item.name"
                    ></span> -->
                        &nbsp;&nbsp; ( 75
                        <!-- <span
                      v-text="
                        map.get(item.code) === undefined
                          ? 0
                          : map.get(item.code)
                      "
                    ></span> -->
                        )</font
                      >
                    </h3>
                    <ul class="ncbi-unstyled-list">
                      <li>
                        国外临床注释<!--<span
                      :id="item.code"
                      class="left_title"
                      v-text="item.name"
                    ></span> -->
                        &nbsp;&nbsp;<span>(40)</span
                        ><!-- ( 
                         <span
                      v-text="
                        map.get(item.code) === undefined
                          ? 0
                          : map.get(item.code)
                      "
                    ></span> 
                        )-->
                      </li>
                      <li>
                        国内临床注释<!--<span
                      :id="item.code"
                      class="left_title"
                      v-text="item.name"
                    ></span> -->
                        &nbsp;&nbsp;<span>(35)</span>
                        <!--( 
                         <span
                      v-text="
                        map.get(item.code) === undefined
                          ? 0
                          : map.get(item.code)
                      "
                    ></span> 
                        )-->
                      </li>
                    </ul>
                  </div>
                </el-col>
                <el-col :span="7" :offset="1">
                  <div class="gq-category" data-section="Literature">
                    <h3>
                      <font class="h3_title" style="vertical-align: inherit;"
                        >通路<!--<span
                      :id="item.code"
                      class="left_title"
                      v-text="item.name"
                    ></span> -->
                        &nbsp;&nbsp; ( 5
                        <!-- <span
                      v-text="
                        map.get(item.code) === undefined
                          ? 0
                          : map.get(item.code)
                      "
                    ></span> -->
                        )</font
                      >
                    </h3>
                    <ul class="ncbi-unstyled-list">
                      <li>
                        国外通路<!--<span
                      :id="item.code"
                      class="left_title"
                      v-text="item.name"
                    ></span> -->
                        &nbsp;&nbsp;<span>(3)</span>
                        <!-- ( 
                        <span
                      v-text="
                        map.get(item.code) === undefined
                          ? 0
                          : map.get(item.code)
                      "
                    ></span> 
                        )-->
                      </li>
                      <li>
                        国内通路<!--<span
                      :id="item.code"
                      class="left_title"
                      v-text="item.name"
                    ></span> -->
                        &nbsp;&nbsp;<span>(2)</span>
                        <!--( 
                        <span
                      v-text="
                        map.get(item.code) === undefined
                          ? 0
                          : map.get(item.code)
                      "
                    ></span> 
                        )-->
                      </li>
                    </ul>
                  </div>
                </el-col>
                <el-col :span="7" :offset="1">
                  <div class="gq-category" data-section="Literature">
                    <h3>
                      <font class="h3_title" style="vertical-align: inherit;"
                        >专利<!--<span
                      :id="item.code"
                      class="left_title"
                      v-text="item.name"
                    ></span> -->
                        &nbsp;&nbsp; ( 5
                        <!-- <span
                      v-text="
                        map.get(item.code) === undefined
                          ? 0
                          : map.get(item.code)
                      "
                    ></span> -->
                        )</font
                      >
                    </h3>
                    <ul class="ncbi-unstyled-list">
                      <li>
                        国外专利<!--<span
                      :id="item.code"
                      class="left_title"
                      v-text="item.name"
                    ></span> -->
                        &nbsp;&nbsp;<span>(0)</span>
                        <!-- ( 
                         <span
                      v-text="
                        map.get(item.code) === undefined
                          ? 0
                          : map.get(item.code)
                      "
                    ></span>
                        ) -->
                      </li>
                      <li>
                        国内专利<!--<span
                      :id="item.code"
                      class="left_title"
                      v-text="item.name"
                    ></span> -->
                        &nbsp;&nbsp;<span>(5)</span>
                        <!--( 5
                         <span
                      v-text="
                        map.get(item.code) === undefined
                          ? 0
                          : map.get(item.code)
                      "
                    ></span> 
                        )-->
                      </li>
                    </ul>
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-tab-pane>
          <el-tab-pane label="临床指南">
            <el-tabs type="border-card">
              <el-tab-pane label="全部">全部</el-tab-pane>
              <el-tab-pane label="国内临床指南">国内临床指南</el-tab-pane>
              <el-tab-pane label="国外临床指南">国外临床指南</el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane label="药物标签">
            <el-tabs type="border-card">
              <el-tab-pane label="全部">全部</el-tab-pane>
              <el-tab-pane label="国内药物标签">国内药物标签</el-tab-pane>
              <el-tab-pane label="国外药物标签">国外药物标签</el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane label="临床注释">
            <el-tabs type="border-card">
              <el-tab-pane label="全部">全部</el-tab-pane>
              <el-tab-pane label="国内临床注释">国内临床注释</el-tab-pane>
              <el-tab-pane label="国外临床注释">国外临床注释</el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane label="临床试验">
            <el-tabs type="border-card">
              <el-tab-pane label="全部">全部</el-tab-pane>
              <el-tab-pane label="国内临床试验">国内临床试验</el-tab-pane>
              <el-tab-pane label="国外临床试验">国外临床试验</el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane label="专利">
            <el-tabs type="border-card">
              <el-tab-pane label="全部">全部</el-tab-pane>
              <el-tab-pane label="国内专利">国内专利</el-tab-pane>
              <el-tab-pane label="国外专利">国外专利</el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane label="参与通路">
            <el-tabs type="border-card">
              <el-tab-pane label="全部">全部</el-tab-pane>
              <el-tab-pane label="国内参与通路">国内参与通路</el-tab-pane>
              <el-tab-pane label="国外参与通路">国外参与通路</el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane label="药物扩展数据">
            <el-tabs type="border-card">
              <el-tab-pane label="全部">全部</el-tab-pane>
              <el-tab-pane label="国内药物扩展数据"
                >国内药物扩展数据</el-tab-pane
              >
              <el-tab-pane label="国外药物扩展数据"
                >国外药物扩展数据</el-tab-pane
              >
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane label="基因扩展数据">
            <el-tabs type="border-card">
              <el-tab-pane label="全部">全部</el-tab-pane>
              <el-tab-pane label="国内基因扩展数据"
                >国内基因扩展数据</el-tab-pane
              >
              <el-tab-pane label="国外基因扩展数据"
                >国外基因扩展数据</el-tab-pane
              >
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane label="数据统计">
            <el-tabs type="border-card">
              <el-tab-pane label="全部">全部</el-tab-pane>
              <el-tab-pane label="国内数据统计">国内数据统计</el-tab-pane>
              <el-tab-pane label="国外数据统计">国外数据统计</el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane label="疾病扩展数据">
            <el-tabs type="border-card">
              <el-tab-pane label="全部">全部</el-tab-pane>
              <el-tab-pane label="国内临床指南">国内疾病扩展数据</el-tab-pane>
              <el-tab-pane label="国外临床指南">国外疾病扩展数据</el-tab-pane>
            </el-tabs>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
    <!-- 中间内容 1-->
    <y-footer></y-footer>
  </div>
</template>
<script>
import YShelf from '/components/shelf'
import YButton from '/components/YButton'
import YHeader from '/common/header'
import YFooter from '/common/footer'
import 'jquery'
import 'element-ui'
// import axios from 'axios'
export default {
  // 生命周期函数

  data() {
    return {
      // tabPosition: 'left', // 控制tab栏显示位置
      searchName: '',
      searchKey: 'gene', // 子组件Yheader传过来的搜索关键字
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
  created() {},
  mounted() {},
  methods: {},
  components: {
    YShelf,
    YButton,
    YHeader,
    YFooter
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.gq-category {
  border-top: 5px solid #9bdaf1;
  border-bottom: 1px solid #ccc;
}
.gq-category .h3_title {
  font-size: 1.4375rem;
  height: 4rem;
  line-height: 4rem;
}
.gq-category .ncbi-unstyled-list li {
  font-size: 1rem;
  line-height: 2.5rem;
  border-top: 1px solid #ccc;
}
.gq-category .ncbi-unstyled-list li span {
  float: right;
}
.right_title .search_title li:hover {
  background-color: #ddd;
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
.right_right:hover {
  background-color: #e3effc;
}
.right_right img {
  width: 3.125rem;
  height: 3.8125rem;
}
.clearfix {
  margin-bottom: 20px;
}
.right_title {
  padding-left: 1.4rem;
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
