<template>
  <!-- <div class="checkout"> -->
  <div class="taskhalls">
    <y-header> <div slot="nav"></div></y-header>
    <div class="activity-panel">
      <ul class="box">
        <!-- 左侧内容区域  start-->
        <li style="margin-right:10px;background-color:#fff;">
          <div class="main_content">
            <!-- 顶部筛选条件 1-->
            <div class="task_classify clearfix">
              <ul class="task_class " style="border-bottom:1px solid #ccc">
                <strong class="fl">任务类型 :</strong>
                <li class="fl anow"><a>全部</a></li>
                <li class="fl"><a>基本信息类</a></li>
                <li class="fl"><a>注释类信息</a></li>
                <li class="fl"><a>文献原文指标分解整理</a></li>
                <li class="fl"><a>上传</a></li>
                <li class="fl"><a>数据统计</a></li>
              </ul>
              <!-- <ul class="task_power">
                <span class="fl">任务权限 :</span>
                <li class="fl actived">全部</li>
                <li class="fl">完全开放</li>
                <li class="fl">勋章开放</li>
              </ul> -->
              <el-select
                v-model="value1"
                multiple
                style="width:800px;"
                class="taskchoose"
              >
                <el-option
                  id="task"
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  style="overflow: auto;height:36px;"
                >
                </el-option>
              </el-select>
            </div>
            <!-- 顶部筛选条件 2-->
            <!-- 左侧具体内容区 1-->
            <div class="slide_center news">
              <ul>
                <!-- 任务搜索框 1-->
                <li style="float:right;margin-bottom:13px">
                  <el-autocomplete
                    icon="search"
                    v-model="input"
                    minlength="1"
                    maxlength="100"
                    :fetch-suggestions="querySearchAsync"
                    @select="handleSelect"
                    :on-icon-click="handleIconClick"
                    @keydown.enter.native="handleIconClick"
                  >
                  </el-autocomplete>
                </li>
                <!-- 任务搜索框 2-->
                <!-- 任务大厅具体列表数据展示 1-->
                <li
                  class="center_content"
                  v-for="(item, key) in taskhall.slice(
                    (currentPage - 1) * pageSize,
                    currentPage * pageSize
                  )"
                  :key="key"
                  :id="forId(key)"
                  @current-change="handleCurrentChange"
                >
                  <img
                    src="../../../static/images/liwu.png"
                    alt=""
                    style="color:blue;float:left!important; display:inline-block;"
                  />
                  <a
                    @click="See(item.articleLinkUrl)"
                    class="title"
                    style="float:left!important; display:inline-block;"
                    v-text="item.name"
                  ></a>
                  <!-- <el-button
                    :id="forId2(key)"
                    type="primary"
                    @click="lingqu(item.id)"
                    :disabled="disabled"
                    v-if="disabled == false"
                    style="margin-left:15px"
                    >领取
                  </el-button> -->
                  <el-button
                    :id="forId2(key)"
                    type="button"
                    @click="bianji1(item.id)"
                    v-if="disabled == false"
                    v-text="btntxt"
                  >
                  </el-button>
                </li>
                <!-- 任务大厅具体列表数据展示 2-->
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
                    :page-sizes="[3, 6, 9]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="taskhall.length"
                    style="float:right;margin:25px 10px 0 0;"
                  >
                  </el-pagination>
                </li>
                <!-- 分页 2-->
              </ul>
            </div>
            <!-- 左侧具体内容区 1-->
          </div>
        </li>
        <!-- 左侧内容区域  end-->
        <!-- 右侧内容区域 start-->
        <li class="side-left left" style="margin-right:10px;">
          <div class="side_left ">
            <!-- 帮助指南 -->
            <div class=" news " style="width:326px;">
              <h2>
                <a @click="See(columnLinkUrl)"><strong>帮助指南</strong></a>
              </h2>
              <ul class="left_ul left_content">
                <li v-for="(item, key) in topNews" :key="key">
                  <span v-text="item.id"></span>
                  <a
                    @click="See(item.articleLinkUrl)"
                    v-text="item.articleTitle"
                  >
                  </a>
                </li>
              </ul>
            </div>
            <!-- 常见问题 -->
            <div class=" news" style="width:326px;margin-top:18px">
              <h2>
                <a @click="See(columnLinkUrl)"><strong>常见问题</strong></a>
              </h2>
              <ul id="newlog" class="left_content">
                <li v-for="(item, key) in newContent" :key="key">
                  <span v-text="item.id" class="new_content "></span>
                  <a
                    @click="See(item.articleLinkUrl)"
                    v-text="item.articleTitle"
                  ></a>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <!-- 右侧内容区域 end-->
      </ul>
    </div>
    <y-footer></y-footer>
  </div>
</template>

<script>
import YShelf from '/components/shelf'
import YButton from '/components/YButton'
import YHeader from '/common/header'
import YFooter from '/common/footer'
// import { taskHall } from '/api/index.js' // zsk模拟接口
import 'jquery'
import 'element-ui'
import axios from 'axios'
import Editor from 'wangeditor'
export default {
  // 生命周期函数
  created() {
    this.getHelp() // 帮助指南
    this.getProblems() // 常见问题
    this.getNum() // 左侧内容数字
    this.getTaskList() // 任务大厅列表
    // this.test() // zsk连接测试
  },
  data() {
    return {
      // 弹窗 1
      input_thirteen: '', // 任务信息弹窗中的评论内容
      accessoryId_value: '',
      dialogImageUrl: '',
      activeName: 'first',
      input1: '',
      input2: '',
      input_three: '',
      tableData: [
        {
          drugGenericName: '',
          caozuo: '',
          approvalNumber: '',
          specifications: '',
          drugTradeName: '',
          originPlace: ''
        }
      ],
      tableData_three: [
        {
          pmid: '',
          name: '',
          liter_content: '',
          accessoryId: ''
        }
      ],
      tableData_four: [
        {
          pathways: '',
          relatedPathways: '',
          publication: '',
          authors: '',
          caozuo: ''
        }
      ],
      tableData_five: [
        {
          pathways: '',
          drugs: '',
          genes: '',
          diseases: ''
        }
      ],
      tableData_six: [
        {
          pathways: '',
          relatedPathways: ''
        }
      ],
      tableData_seven: [
        {
          pmid: '',
          name: '',
          liter_content: '',
          accessoryId: '',
          drugInstruction_picture: ''
        }
      ],
      tableData_eight: [
        {
          medicalInsuranceArea: '',
          number: '',
          drugName: '',
          drugForm: '',
          drugClassification: '',
          medicalInsuranceCategory: '',
          supplementaryInformation: '',
          changes: '',
          remarks: ''
        }
      ],
      tableData_nine: [
        {
          name: '',
          interactiveDrugs: '',
          effectiveness: ''
        }
      ],
      tableData_ten: [
        {
          medicationType: '',
          evidenceLevel: '',
          race: '',
          raceDetails: '',
          phenotypes: '',
          genotype: '',
          porMedicationSuggestionEnglish: '',
          porMedicationSuggestionChinese: ''
        }
      ],
      tableData_eleven: [
        {
          pathways: '',
          drugs: '',
          genes: '',
          diseases: ''
        }
      ],
      tableData_twelve: [
        {
          conclusion: ''
        }
      ],
      tableData_thirteen: [
        {
          pmid: '',
          name: '',
          liter_content: '',
          accessoryId: '',
          currentTaskComment: ''
        }
      ],
      tableData_fourteen: [
        {
          pmid: '',
          name: '',
          liter_content: '',
          accessoryId: ''
        }
      ],
      tableData_fiveteen: [
        {
          pmid: '',
          name: '',
          liter_content: '',
          accessoryId: '',
          currentTaskComment: ''
        }
      ],
      tableData_sixteen: [
        {
          name: '',
          liter_content: '',
          accessoryId: '',
          currentTaskComment: ''
        }
      ],
      tableData_seventeen: [
        {
          name: '',
          liter_content: '',
          accessoryId: ''
        }
      ],
      tableData_eighteen: [
        {
          pmid: '',
          name: '',
          liter_content: '',
          accessoryId: '',
          drugInstruction_picture: '',
          currentTaskComment: ''
        }
      ],
      tableData_nineteen: [
        {
          pmid: '',
          name: '',
          liter_content: '',
          accessoryId: '',
          currentTaskComment: ''
        }
      ],
      tableData_twentyOne: [
        {
          dataSource: '',
          project: '',
          fatherRace: '',
          race: '',
          area: '',
          porResultId: '',
          testAmount: '',
          currentTaskComment: ''
        }
      ],
      tableData_twentyTwo: [
        {
          dataSource: '',
          project: '',
          sex: '',
          ageGroup: '',
          nation: '',
          nativePlace: '',
          currentTaskComment: ''
        }
      ],
      dialogTableVisible: false,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      innerVisible_img: false,
      dialogVisible_imgshow: false,
      outerVisible: false,
      innerVisible: false,
      outerVisible_four: false,
      outerVisible_five: false,
      outerVisible_six: false,
      outerVisible_seven: false,
      outerVisible_eight: false,
      outerVisible_nine: false,
      outerVisible_ten: false,
      outerVisible_eleven: false,
      outerVisible_twelve: false,
      outerVisible_thirteen: false,
      outerVisible_fourteen: false, // 国外指南文献的上传,国内指南文献的上传,
      outerVisible_fiveteen: false, // 国内外药物基因文献的上传
      outerVisible_sixteen: false, // 国内外药物标签文献的上传 有评论内容
      outerVisible_seventeen: false, // 国内外药物标签文献的上传 无评论内容。。国内外临床注释文献的上传
      outerVisible_eighteen: false, // 国内外专利注释文献的上传 有评论内容,无评论内容
      outerVisible_nineteen: false, // 说明书原文上传、、说明书包装图片
      outerVisible_twenty: false, // 3GBio基因位点频率地理分布【中国 】
      outerVisible_twentyOne: false, // 3GBio基因位点频率地理分布【世界 】
      outerVisible_twentyTwo: false, // 3GBio住院病案首页数据统计

      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      textarea: '',
      formLabelWidth: '100px',
      tasklist: [],
      fileList: [], // 上传文件列表
      // 弹窗 2
      value1: [],
      options: [
        {
          value: '选项1',
          label: '位点基本信息位点基本信息位点基本信息位点基本信息位点基本信息'
        },
        {
          value: '选项2',
          label:
            '药物基本信息位点基本信息位点基本信息位点基本信息位点基本信息位点基本信息'
        },
        {
          value: '选项3',
          label:
            '基因基本信息基因基本信息基因基本信息基因基本信息基因基本信息基因基本信息基因基本信息'
        },
        {
          value: '选项4',
          label: '疾病基本信息'
        },
        {
          value: '选项5',
          label: '项目基本信息'
        }
      ],
      id: [],
      name: '',
      taskTitleUrl: '',
      btntxt: '编辑',
      disabled: false,
      currentPage4: 1,
      input: '',
      input3: '',
      select: '',
      // 中间八个分类 1
      genenum: '',
      drugnum: '',
      drugGenePairnum: '',
      authoritynum: '',
      drugLabelsnum: '',

      // 中间八个分类 2
      total: '',
      articleTitle: '', // 小标题
      articleLinkUrl: '', // 小标题链接=具体内容页面
      columnTitle: '', // 分组大标题
      columnLinkUrl: '', // 分组大标题链接【最新事件，最新研究内容，公告】
      date: new Date(),
      error: false,
      home: [],
      loading: true,
      notify: '1',
      dialogVisible: false,
      timer: '',
      // 接收最新事件列表信息
      topNews: [],
      // 接收最新研究内容列表信息
      newContent: [],
      // taskHall: [], // 暂存请求到的任务大厅数据
      taskhall: [], // 暂存请求到的任务大厅数据
      currentPage: 1, // 当前页面
      alltotal: '', // 最多条数
      pageSize: 3 // 每页15条
    }
  },
  mounted() {
    // 菜单切换高亮显示 1
    $(document).ready(function() {
      $('.task_class li').click(function() {
        $(this)
          .addClass('anow')
          .siblings()
          .removeClass('anow')
      })
    })
    // 菜单切换高亮显示 2
  },
  methods: {
    // 上传文献
    submitUpload() {
      let list = document.getElementsByClassName(
        'el-upload-list__item is-ready'
      )
      if (list.length === 0) {
        this.$message({
          type: 'warning',
          message: '请选择需要导入的模板！'
        })
        return
      }
      this.$refs.upload.submit()
    },
    uploadSectionFile(param) {
      var fileObj = param.file
      // FormData 对象
      var form = new FormData()
      // 文件对象
      form.append('file', fileObj)
      form.append('userId', this.userId)
      form.append('userName', this.userName)
      this.GLOBAL.POST('/hqx/knowledge/importKnowledge', form).then(res => {
        if (res.data.success === true) {
          this.$message({
            type: 'success',
            message: res.data.msg
          })
          this.fileList = []
        } else {
          this.$message({
            type: 'success',
            message: res.data.msg
          })
          this.fileList = []
        }
      })
    },
    // 上传图片
    handleRemove(file) {
      // console.log(file)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible_imgshow = true
    },
    handleDownload(file) {
      // console.log(file)
    },
    yulan() {
      this.innerVisible_img = true
    },
    // 富文本编辑器(meiyou)
    handleClick(tab, event) {
      // console.log(tab, event)
    },
    addLine_two() {
      // 添加行数
      var newValue = {
        drugGenericName: '',
        drugTradeName: '',
        approvalNumber: '',
        specifications: '',
        originPlace: '',
        caozuo: ''
      }
      // 添加新的行数
      this.tableData.push(newValue)
    },
    addLine_three() {
      // 添加行数
      var newValue = {
        pmid: '',
        name: '',
        accessoryId: '',
        caozuo: ''
      }
      // 添加新的行数
      this.tableData_three.push(newValue)
    },
    addLine_four() {
      // 添加行数
      var newValue = {
        pathways: '',
        relatedPathways: '',
        publication: '',
        authors: '',
        caozuo: ''
      }
      // 添加新的行数
      this.tableData_four.push(newValue)
    },
    addLine_five() {
      // 添加行数
      var newValue = {
        pathways: '',
        drugs: '',
        genes: '',
        diseases: ''
      }
      // 添加新的行数
      this.tableData_five.push(newValue)
    },
    addLine_six() {
      // 添加行数
      var newValue = {
        pathways: '',
        relatedPathways: ''
      }
      // 添加新的行数
      this.tableData_six.push(newValue)
    },
    addLine_seven() {
      // 添加行数
      var newValue = {
        pmid: '',
        name: '',
        liter_content: '',
        accessoryId: '',
        drugInstruction_picture: ''
      }
      // 添加新的行数
      this.tableData_seven.push(newValue)
    },
    addLine_eight() {
      // 添加行数
      var newValue = {
        medicalInsuranceArea: '',
        number: '',
        drugName: '',
        drugForm: '',
        drugClassification: '',
        medicalInsuranceCategory: '',
        supplementaryInformation: '',
        changes: '',
        remarks: ''
      }
      // 添加新的行数
      this.tableData_eight.push(newValue)
    },
    addLine_nine() {
      // 添加行数
      var newValue = {
        name: '',
        interactiveDrugs: '',
        effectiveness: ''
      }
      // 添加新的行数
      this.tableData_nine.push(newValue)
    },
    addLine_ten() {
      // 添加行数
      var newValue = {
        medicationType: '',
        evidenceLevel: '',
        race: '',
        raceDetails: '',
        phenotypes: '',
        genotype: '',
        porMedicationSuggestionEnglish: '',
        porMedicationSuggestionChinese: ''
      }
      // 添加新的行数
      this.tableData_ten.push(newValue)
    },
    addLine_eleven() {
      // 添加行数
      var newValue = {
        pathways: '',
        drugs: '',
        genes: '',
        diseases: ''
      }
      // 添加新的行数
      this.tableData_eleven.push(newValue)
    },
    addLine_twelve() {
      // 添加行数
      var newValue = {
        conclusion: ''
      }
      // 添加新的行数
      this.tableData_twelve.push(newValue)
    },
    addLine_thirteen() {
      // 添加行数
      var newValue = {
        pmid: '',
        name: '',
        liter_content: '',
        accessoryId: '',
        currentTaskComment: ''
      }
      // 添加新的行数
      this.tableData_thirteen.push(newValue)
    },
    addLine_fourteen() {
      // 添加行数
      var newValue = {
        pmid: '',
        name: '',
        liter_content: '',
        accessoryId: ''
      }
      // 添加新的行数
      this.tableData_fourteen.push(newValue)
    },
    addLine_fiveteen() {
      // 添加行数
      var newValue = {
        pmid: '',
        name: '',
        liter_content: '',
        accessoryId: '',
        currentTaskComment: ''
      }
      // 添加新的行数
      this.tableData_fiveteen.push(newValue)
    },
    addLine_sixteen() {
      // 添加行数
      var newValue = {
        name: '',
        liter_content: '',
        accessoryId: '',
        currentTaskComment: ''
      }
      // 添加新的行数
      this.tableData_sixteen.push(newValue)
    },
    addLine_seventeen() {
      // 添加行数
      var newValue = {
        name: '',
        liter_content: '',
        accessoryId: ''
      }
      // 添加新的行数
      this.tableData_seventeen.push(newValue)
    },
    addLine_eighteen() {
      // 添加行数
      var newValue = {
        pmid: '',
        name: '',
        liter_content: '',
        accessoryId: '',
        currentTaskComment: ''
      }
      // 添加新的行数
      this.tableData_eighteen.push(newValue)
    },
    addLine_nineteen() {
      // 添加行数
      var newValue = {
        pmid: '',
        name: '',
        liter_content: '',
        accessoryId: '',
        drugInstruction_picture: '',
        currentTaskComment: ''
      }
      // 添加新的行数
      this.tableData_nineteen.push(newValue)
    },
    addLine_twenty() {
      // 添加行数
      var newValue = {
        dataSource: '',
        year: '',
        project: '',
        area: '',
        receiveLaboratory: '',
        sex: '',
        ageGroup: '',
        sampleType: '',
        porResultId: '',
        testAmount: '',
        currentTaskComment: ''
      }
      // 添加新的行数
      this.tableData_twenty.push(newValue)
    },
    addLine_twentyOne() {
      // 添加行数
      var newValue = {
        dataSource: '',
        project: '',
        fatherRace: '',
        race: '',
        area: '',
        porResultId: '',
        testAmount: '',
        currentTaskComment: ''
      }
      // 添加新的行数
      this.tableData_twentyOne.push(newValue)
    },
    addLine_twentyTwo() {
      // 添加行数
      var newValue = {
        dataSource: '',
        project: '',
        sex: '',
        ageGroup: '',
        nation: '',
        nativePlace: '',
        currentTaskComment: ''
      }
      // 添加新的行数
      this.tableData_twentyTwo.push(newValue)
    },
    addLine_twentyThree()[
        {
          pmid: '',
          name: '',
          liter_content: '',
          accessoryId: ''
        }
      ],
    bianji1() {
      this.outerVisible_twentyTwo = true
    },
    // 删除行22
    handleDelete_twentyTwo(index) {
      // console.log(index)
      // 删除行数
      this.tableData_twentyTwo.splice(index, 1)
    },
    // 删除行21
    handleDelete_twentyOne(index) {
      // console.log(index)
      // 删除行数
      this.tableData_twentyOne.splice(index, 1)
    },
    // 删除行20
    handleDelete_twenty(index) {
      // console.log(index)
      // 删除行数
      this.tableData_twenty.splice(index, 1)
    },
    // 删除行19
    handleDelete_nineteen(index) {
      // console.log(index)
      // 删除行数
      this.tableData_nineteen.splice(index, 1)
    },
    // 删除行18
    handleDelete_eighteen(index) {
      // console.log(index)
      // 删除行数
      this.tableData_eighteen.splice(index, 1)
    },
    // 删除行17
    handleDelete_seventeen(index) {
      // console.log(index)
      // 删除行数
      this.tableData_seventeen.splice(index, 1)
    },
    // 删除行16
    handleDelete_sixteen(index) {
      // console.log(index)
      // 删除行数
      this.tableData_sixteen.splice(index, 1)
    },
    // 删除行15
    handleDelete_fiveteen(index) {
      // console.log(index)
      // 删除行数
      this.tableData_fiveteen.splice(index, 1)
    },
    // 删除行14
    handleDelete_fourteen(index) {
      // console.log(index)
      // 删除行数
      this.tableData_fourteen.splice(index, 1)
    },
    // 删除行13
    handleDelete_thirteen(index) {
      console.log(index)
      // 删除行数
      this.tableData_thirteen.splice(index, 1)
    },
    // 删除行12
    handleDelete_twelve(index) {
      console.log(index)
      // 删除行数
      this.tableData_twelve.splice(index, 1)
    },
    // 删除行11
    handleDelete_eleven(index) {
      console.log(index)
      // 删除行数
      this.tableData_eleven.splice(index, 1)
    },
    // 删除行10
    handleDelete_ten(index) {
      console.log(index)
      // 删除行数
      this.tableData_ten.splice(index, 1)
    },
    // 删除行9
    handleDelete_nine(index) {
      console.log(index)
      // 删除行数
      this.tableData_nine.splice(index, 1)
    },
    // 删除行8
    handleDelete_eight(index) {
      console.log(index)
      // 删除行数
      this.tableData_eight.splice(index, 1)
    },
    // 删除行7
    handleDelete_seven(index) {
      console.log(index)
      // 删除行数
      this.tableData_seven.splice(index, 1)
    },
    // 删除行6
    handleDelete_six(index) {
      console.log(index)
      // 删除行数
      this.tableData_six.splice(index, 1)
    },
    // 删除行5
    handleDelete_five(index) {
      console.log(index)
      // 删除行数
      this.tableData_five.splice(index, 1)
    },
    // 删除行4
    handleDelete_four(index) {
      console.log(index)
      // 删除行数
      this.tableData_four.splice(index, 1)
    },
    // 删除行3
    handleDelete_three(index) {
      console.log(index)
      // 删除行数
      this.tableData_three.splice(index, 1)
    },
    // 删除行2
    handleDelete(index) {
      console.log(index)
      // 删除行数
      this.tableData.splice(index, 1)
    },
    // 弹窗中确定提交按钮
    save() {
      this.outerVisible_five = false
      // 这部分应该是保存提交你添加的内容
      // console.log(JSON.stringify(this.tableData_five))
    },
    // 给任务大厅数据列表动态添加id
    forId: function(index) {
      return 'forid_' + index
    },
    //  给任务大厅数据列表中按钮动态添加id
    forId2: function(index) {
      return 'forid2_' + index
    },
    // 获取任务大厅数据列表
    getTaskList() {
      var url = 'static/data/taskhall.json'
      axios({
        method: 'get',
        url: url,
        rows: '3',
        page: '1'
      }).then(res => {
        // console.log(res)
        // console.log(res.data[0])
        this.taskhall = res.data
        this.name = res.data[0].name
        this.taskTitleUrl = res.data[0].taskTitleUrl
        this.id = res.data.id
      })
    },
    bianji() {
      this.innerVisible = true
      this.tasklist = []
      // var url = 'static/data/taskhall.json'
      // axios({
      //   method: 'get',
      //   url: url
      // }).then(res => {
      //   // debugger
      //   console.log(res)
      //   let data1 = res.data
      //   for (var key3 in data2) {
      //     // console.log(key3 + ' : ' + data2[key3])
      //     let id = key3.substring(0, key3.lastIndexOf('_'))
      //     let type = key3.substring(key3.lastIndexOf('_'), key3.length)
      //     let s = {
      //       name: data2[key3],
      //       value: id,
      //       type: type
      //     }
      //     this.tasklist.push(s)
      //   }
      // })
      let data2 = {
        id_input: 'id',
        drug_input: 'DRUGS',
        genes_input: 'GENES',
        title_input: 'TITLE',
        source_textarea: 'SOURCE',
        summary_textarea: 'Summary',
        publications_textarea: 'Publications',
        // history_ckeditor2: 'History',
        annotation_ckeditor1: 'Annotation'
      }
      for (var key3 in data2) {
        // console.log(key3 + ' : ' + data2[key3])
        let id = key3.substring(0, key3.lastIndexOf('_'))
        let type = key3.substring(key3.lastIndexOf('_'), key3.length)
        let s = {
          name: data2[key3],
          value: id,
          type: type
        }
        this.tasklist.push(s)
      }

      setTimeout(function() {
        // for (let k of this.tasklist) {
        // debugger
        // if (k.type.indexOf('_ckeditor') >= 0) {
        // var editor1 = new Editor('#' + k.value)

        var editor1 = new Editor('#history')
        editor1.create()
        // }
        // }
      }, 1000)
    },
    lingqu(id) {
      this.disabled = true
    },
    test() {
      // 链接知识库跨域测试
      // let data = new FormData()
      // data.append('test', 'hello world')
      // taskHall(data).then(res => {
      //   console.log(res)
      // })
    },
    // 任务列表数据分页
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.pageSize = val // 动态改变
      this.getTaskList() // 重新获取数据列表
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.currentPage = val // 动态改变
      this.getTaskList() // 重新获取数据列表
    },
    // 查询信息
    handleIconClick(ev) {
      if (this.$route.path === '/search') {
        this.$router.push({
          path: '/refreshsearch',
          query: {
            key: this.input
          }
        })
      } else {
        this.$router.push({
          path: '/search',
          query: {
            key: this.input
          }
        })
      }
    },
    querySearchAsync(queryString, cb) {
      if (this.input === undefined) {
        cb([])
        return
      }
      this.input = this.input.trim()
      if (this.input === '') {
        cb([])
        return
      } else {
        this.loadAll()
        setTimeout(() => {
          cb(this.searchResults)
        }, 300)
      }
    },
    handleSelect(item) {
      this.input = item.value
    },
    // 基因
    gene() {
      this.$router.push({
        path: '/gene'
      })
    },
    // 获取各分类标签数量
    getNum() {
      var url = 'static/data/home_center.json'
      axios({
        method: 'get',
        url: url
      }).then(res => {
        // console.log(res)
        // console.log(res.data[0].genenum)
        this.genenum = res.data[0].genenum
        this.drugnum = res.data[0].drugnum
        this.drugGenePairnum = res.data[0].drugGenePairnum
        this.authoritynum = res.data[0].authoritynum
        this.drugLabelsnum = res.data[0].drugLabelsnum
      })
    },
    // 帮助指南
    getHelp() {
      // var topNew = '最新事件'
      // var url = '/apis/cms/api/getColumnNewList?title=' + topNew
      var url = 'static/data/home_gethelp.json'
      axios({
        method: 'get',
        url: url
      }).then(res => {
        // console.log(res)
        // console.log(res.data[0].columnTitle)
        // 把获得好的最新事件 赋予topNews 给成员
        this.topNews = res.data
        this.columnLinkUrl = res.data[0].columnLinkUrl
      })
    },
    // 常见问题
    getProblems() {
      // var newContent = '常见问题'
      // var url = '/apis/cms/api/getColumnNewList?title=' + newContent
      var url = 'static/data/home_newContent.json'
      axios({
        method: 'get',
        url: url
      }).then(res => {
        // 把获得好的最新事件 赋予 给NewContent成员
        this.newContent = res.data
        this.columnLinkUrl = res.data[0].columnLinkUrl
      })
    },
    // cms页面跳转
    See(e) {
      window.location = e
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
//中间顶部筛选条件 1
// .el-select .el-input {
//   width: 130px;
// }
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.task_classify {
  width: 100%;
  background-color: #fafafa;
  height: 100px;
  padding: 15px;
  box-sizing: border-box;
}
.task_classify .task_power {
  margin-top: 10px;
}
.task_classify ul {
  height: 36px;
  line-height: 20px;
}
.task_classify ul li {
  margin: 0 10px;
  padding: 0 20px;
  cursor: pointer;
}
.task_class li.anow {
  border: 2px solid #13cb6a;
}
.task_classify ul li.fl {
  float: left;
}
//中间顶部筛选条件 2
// .el-textarea .el-textarea__inner {
//   // 然后找到对应的类名，在这里将拉伸去掉即可
//   resize: none;
// }
#box {
  display: flex;
}
.left {
  width: 326px;
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
  border: 1px solid #ddd;
  border-top: 0;
  padding-top: 10px;
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
.side_left ul li {
  width: 300px;
  box-sizing: border-box;
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.side_left ul span {
  margin-right: 15px;
  width: 10px;
  height: 10px;
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
  width: 870px;
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
  margin-top: 2.5rem;
}
.slide_center ul li button {
  height: 2.5rem;
  width: 7rem;
  float: right;
  margin: 2.5rem;
  border-radius: 1.5625rem;
}
.side_left .news .right_content {
  height: 217px;
  background-color: #fafafa;
}
.side_left .right_content li {
  width: 260px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.tel {
  margin-top: 20px;
  background-color: #fff;
  border-left: 1px solid #ccc;
  // padding-bottom: 20px;
}
.Message {
  background-color: #fff;
  margin-top: 20px;
}
.Message h2 {
  line-height: 56px;
  font-size: 15px;
  color: black;
  background-color: #f1f1f1;
}
.el-form--label-top .el-form-item__label {
  font-size: 16px !important;
  padding-left: 10px;
}
.el-form-item {
  margin: 10px 0 10px 0;
}
.left_form {
  margin-left: 10px;
}
.Message .left_form label {
  font-size: 14px;
  margin: 15px 0 5px 0 !important;
  display: inline-block;
}
.left_form input {
  height: 26px;
  width: 238px;
  // background-color: #f8f8f8;
}
.left_form .auth_code {
  vertical-align: middle;
  width: 50px;
  float: left;
}
.left_form a {
  vertical-align: middle;
  width: 95px;
  height: 30px;
  background-color: #17c2ce;
  display: inline-block;
  line-height: 30px;
  padding-left: 15px;
  box-sizing: border-box;
}
/* 底部业务划分区域 */
.guide {
  height: 120px;
}
.guide_ul {
  float: left;
  margin-left: 10px;
}
.guide_ul li {
  float: left;
  width: 285px;
  height: 76px;
  margin: 20px 0 0 20px;
  cursor: pointer;
}
.guide_ul li:first-child {
  margin-left: 0;
}
.guide_ul li i {
  font-size: 45px;
  color: white;
  margin: 15px 0 0 15px;
  float: left;
}
.guide_ul li p {
  margin-left: 16px;
  height: 76px;
  line-height: 76px;
  /* display: inline-block; */
  font-size: 20px;
  color: #fff;
  float: left;
}
/* .partners{height: 94px;} */
/* 底部轮播图 */
* {
  margin: 0px;
  padding: 0px;
}
#box {
  width: 1200px;
  height: 65px;
  overflow: hidden;
  position: relative;
  background: #f2f2f2;
}
#box ul {
  position: absolute;
  left: 0px;
  right: 0px;
}
#box ul li {
  float: left;
  list-style: none;
  width: 118px;
  height: 58px;
  padding: 10px 0;
  box-sizing: border-box;
}
// 自己加的
.center_content {
  position: relative;
}
.guide {
  width: 1200px;
}
.home {
  display: flex;
  flex-direction: column;
}
.no-info {
  padding: 100px 0;
  text-align: center;
  font-size: 30px;
  display: flex;
  flex-direction: column;
  .no-data {
    align-self: center;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.page {
  position: absolute;
  width: 100%;
  top: 470px;
  z-index: 30;
  .dots {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .dot-active {
      display: inline-block;
      width: 15px;
      height: 15px;
      background-color: whitesmoke;
      border-radius: 8px;
      margin-right: 10px;
      cursor: pointer;
    }
    .dot {
      opacity: 0.2;
    }
  }
}
.activity-panel {
  width: 1220px;
  margin: 0 auto;
  .box {
    overflow: hidden;
    position: relative;
    z-index: 0;
    margin-top: 15px;
    box-sizing: border-box;
    // border: 1px solid rgba(0, 0, 0, 0.14);
    border-radius: 8px;
    background: #ededed;
    box-shadow: 0 3px 8px -6px rgba(0, 0, 0, 0.1);
  }
  .content {
    float: left;
    position: relative;
    box-sizing: border-box;
    width: 25%;
    height: 200px;
    text-align: center;
  }
  .content ::before {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    box-sizing: border-box;
    border-left: 1px solid #f2f2f2;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 100%;
    content: '';
    pointer-events: none;
  }
  .i {
    width: 305px;
    height: 200px;
  }
  .cover-link {
    cursor: pointer;
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 4;
    background: url(data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEHAAEALAAAAAABAAEAAAICTAEAOw==)
      repeat;
  }
  a {
    color: #5079d9;
    cursor: pointer;
    transition: all 0.15s ease-out;
    text-decoration: none;
  }
  a:hover {
    // box-shadow: inset 0 0 38px rgba(0, 0, 0, 0.08);
    transition: all 0.15s ease;
  }
}
.banner,
.banner span,
.banner div {
  font-family: 'Microsoft YaHei';
  transition: all 0.3s;
  transition-timing-function: linear;
}
.banner {
  cursor: pointer;
  perspective: 3000px;
  position: relative;
  z-index: 19;
  margin: 0 auto;
  width: 1220px;
}
.bg {
  position: relative;
  width: 1220px;
  height: 500px;
  margin: 20px auto;
  background-size: 100% 100%;
  border-radius: 10px;
  transform-style: preserve-3d;
  transform-origin: 50% 50%;
  transform: rotateY(0deg) rotateX(0deg);
  & div {
    position: relative;
    height: 100%;
    width: 100%;
  }
}
.img1 {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  border-radius: 10px;
}
.img2 {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 5px;
  left: 0;
  background-size: 95% 100%;
  border-radius: 10px;
}
.img3 {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  border-radius: 10px;
}
.a {
  z-index: 20;
  transform: translateZ(40px);
}
.b {
  z-index: 20;
  transform: translateZ(30px);
}
.c {
  transform: translateZ(0px);
}
.sk_item {
  width: 170px;
  height: 225px;
  padding: 0 14px 0 15px;
  > div {
    width: 100%;
  }
  a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.3s;
    &:hover {
      transform: translateY(-5px);
    }
  }
  img {
    width: 130px;
    height: 130px;
    margin: 17px 0;
  }
  .sk_item_name {
    color: #999;
    display: block;
    max-width: 100%;
    _width: 100%;
    overflow: hidden;
    font-size: 12px;
    text-align: left;
    height: 32px;
    line-height: 16px;
    word-wrap: break-word;
    word-break: break-all;
  }
  .sk_item_price {
    padding: 3px 0;
    height: 25px;
  }
  .price_new {
    font-size: 18px;
    font-weight: 700;
    margin-right: 8px;
    color: #f10214;
  }
  .price_origin {
    color: #999;
    font-size: 12px;
  }
}
.box {
  overflow: hidden;
  position: relative;
  z-index: 0;
  margin-top: 29px;
  box-sizing: border-box;
  // border: 1px solid rgba(0, 0, 0, 0.14);
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 3px 8px -6px rgba(0, 0, 0, 0.1);
}
ul.box {
  display: flex;
  li {
    // flex: 1;
    img {
      display: block;
      width: 305px;
      height: 200px;
    }
  }
}
.mt30 {
  margin-top: 30px;
}
.hot {
  display: flex;
  > div {
    flex: 1;
    width: 25%;
  }
}
.floors {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  .imgbanner {
    width: 50%;
    height: 430px;
    .cover-link {
      cursor: pointer;
      display: block;
      position: absolute;
      top: 60px;
      left: 0;
      width: 50%;
      height: 430px;
      z-index: 4;
      background: url(data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEHAAEALAAAAAABAAEAAAICTAEAOw==)
        repeat;
    }
    .cover-link:hover {
      box-shadow: inset 0 0 38px rgba(0, 0, 0, 0.08);
      transition: all 0.15s ease;
    }
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
// 清除浮动
.clearfix {
  zoom: 1;
} /*==for IE6/7 Maxthon2==*/
.clearfix :after {
  clear: both;
  content: '.';
  display: block;
  width: 0;
  height: 0;
  visibility: hidden;
} /*==for FF/chrome/opera/IE8==*/
</style>

<style>
.insertbutton .addrow {
  width: 90px;
  height: 30px;
  border-radius: 15px;
  color: #20a0ff;
  border-color: #20a0ff;
  float: right;
}
.insertbutton .delete {
  /* width: 90px;
  height: 30px;
  border-radius: 15px; */
  font-size: 20px;
  color: hsla(3, 82%, 69%, 0.77);
}
.two .el-dialog--small,
.three .el-dialog--small,
.four .el-dialog--small,
.five .el-dialog--small,
.six .el-dialog--small,
.seven .el-dialog--small,
.nine .el-dialog--small,
.thirteen .el-dialog--small,
.fourteen .el-dialog--small,
.fiveteen .el-dialog--small,
.sixteen .el-dialog--small,
.seventeen .el-dialog--small,
.eighteen .el-dialog--small {
  width: 86% !important;
}
.eight .el-dialog--small,
.ten .el-dialog--small,
.eleven .el-dialog--small,
.nineteen .el-dialog--small,
.twenty .el-dialog--small,
.twentyOne .el-dialog--small,
.twentyTwo .el-dialog--small {
  width: 100% !important;
}
.el-dialog__header {
  background-color: #eee;
  padding: 10px;
}

.el-tag .el-select__tags-text {
  float: left !important;
}
.el-tag .el-icon-close {
  float: left !important;
  margin-top: 4px;
}
.el-icon-caret-top {
  margin-top: 2px !important;
}
.el-select__tags {
  float: left;
  height: 60px;
  overflow: auto;
}
.el-select__tags::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
.el-select__tags::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.2);
  box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.2);
}

.el-select__tags::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.2);
  box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.2);
  border-radius: 0;
  background: rgba(255, 255, 255, 0.1);
}
.el-select__tags span.el-tag {
  float: left;
}
</style>
