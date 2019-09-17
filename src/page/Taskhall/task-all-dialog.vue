<template>
  <div>
    <!-- 弹窗 2 -->
    <div class="two">
      <el-dialog
        title="编辑任务2"
        :visible.sync="dialogFormVisible2"
        class="two"
      >
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="任务信息" name="first">
            <div class="">
              任务名称：
              <el-input suffix-icon="el-icon-date" v-model="input1"> </el-input>
              评论内容：
              <el-input
                type="textarea"
                prefix-icon="el-icon-search"
                v-model="input2"
              >
              </el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="任务编辑" name="second">
            <div class="TestWord">
              <div class="insertbutton">
                <el-button @click="addLine_two" class="addrow"
                  >添加行数</el-button
                >
              </div>
              <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="xuhao" label="序号" width="100px">
                  <template slot-scope="scope">
                    <label v-text="scope.$index + 1"></label>
                  </template>
                </el-table-column>
                <el-table-column prop="drugGenericName" label="药物通用名">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.drugGenericName"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="drugTradeName" label="药物商品名">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.drugTradeName"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="approvalNumber" label="批准文号">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.approvalNumber"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="specifications" label="规格">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.specifications"
                    ></el-input>
                  </template> </el-table-column
                ><el-table-column prop="originPlace" label="国家/厂家">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.originPlace"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="caozuo" label="操作">
                  <template slot-scope="scope">
                    <div class="insertbutton">
                      <!-- <el-button
                    class="delete"
                    size="mini"
                    v-if="!scope.row.editing"
                    icon="el-icon-delete"
                    @click="handleDelete(scope.$index, scope.row)"
                    >删除
                  </el-button> -->
                      <i
                        class="el-icon-delete delete"
                        size="mini"
                        v-if="!scope.row.editing"
                        icon="el-icon-delete"
                        @click="handleDelete(scope.$index, scope.row)"
                      ></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>

        <div slot="footer" class="dialog-footer">
          <el-button
            @click="dialogFormVisible2 = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >取 消</el-button
          >
          <el-button
            type="primary"
            @click="save"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >确 定</el-button
          >
          <el-button
            @click="dialogFormVisible2 = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >放弃任务</el-button
          >
        </div>
      </el-dialog>
    </div>
    <!-- 弹窗 2 -->

    <!-- 弹窗 3 -->
    <div class="three">
      <el-dialog title="外层 Dialog 编辑任务3" :visible.sync="outerVisible">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="任务信息" name="first">
            <div class="">
              任务名称：
              <el-input suffix-icon="el-icon-date" v-model="input_three">
              </el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="任务编辑" name="second">
            <div class="TestThree">
              <div class="insertbutton">
                <el-button @click="addLine_three" class="addrow"
                  >添加行数</el-button
                >
              </div>
              <el-table :data="tableData_three" style="width: 100%">
                <el-table-column prop="xuhao" label="序号" width="100px">
                  <template slot-scope="scope">
                    <label v-text="scope.$index + 1"></label>
                  </template>
                </el-table-column>
                <el-table-column prop="pmid" label="PMID">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.pmid"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="文献名称">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.name"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="文献内容提取">
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      v-model="scope.row.approvalNumber"
                      @click="bianji"
                      >编辑</el-button
                    >
                  </template>
                </el-table-column>
                <el-table-column prop="accessoryId" label="文献上传">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.accessoryId"></el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="caozuo" label="操作">
                  <template slot-scope="scope">
                    <div class="insertbutton">
                      <i
                        class="el-icon-delete delete"
                        size="mini"
                        v-if="!scope.row.editing"
                        icon="el-icon-delete"
                        @click="handleDelete_three(scope.$index, scope.row)"
                      ></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button
            @click="outerVisible = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >取 消</el-button
          >
          <el-button
            type="primary"
            @click="save"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >确 定</el-button
          >
          <el-button
            @click="outerVisible = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >放弃任务</el-button
          >
        </div>
      </el-dialog>
    </div>
    <!-- 内层弹窗 开始-->
    <el-dialog
      width="30%"
      title="内层 Dialog3（不带three）"
      :visible.sync="innerVisible"
      :append-to-body="true"
    >
      <li
        class="center_content"
        v-for="(item, key_three) in tasklist"
        :key="key_three"
        style="margin-bottom:10px;"
      >
        <span style="float:left;width:100px;" v-text="item.name"></span>
        <el-input
          v-model="form.name"
          style="width:83%"
          v-if="item.type.indexOf('_input') >= 0"
        ></el-input>
        <el-input
          style="width:83%"
          type="textarea"
          :rows="2"
          v-model="textarea"
          v-if="item.type.indexOf('_textarea') >= 0"
        >
          <!-- v-if="item.type.indexOf('_ckeditor') >= 0" -->
        </el-input>
        <el-select
          v-model="form.region"
          style="width:83%"
          v-if="item.type.indexOf('_select') > 0"
        >
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </li>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 内层弹窗 结束-->
    <!-- 弹窗 3 -->

    <!-- 弹窗 4 -->
    <div class="four">
      <el-dialog
        title="外层 Dialog 任务信息整理"
        :visible.sync="outerVisible_four"
      >
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="任务信息" name="first">
            <div class="">
              任务名称：
              <el-input suffix-icon="el-icon-date" v-model="input_three">
              </el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="任务编辑" name="second">
            <div class="TestFour">
              <div class="insertbutton">
                <el-button @click="addLine_four" class="addrow"
                  >添加行数</el-button
                >
              </div>
              <el-table :data="tableData_four" style="width: 100%">
                <el-table-column prop="xuhao" label="序号" width="100px">
                  <template slot-scope="scope">
                    <label v-text="scope.$index + 1"></label>
                  </template>
                </el-table-column>
                <el-table-column prop="pmid" label="Pathways">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.pathways"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="RELATED PATHWAYS">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.relatedPathways"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="PUBLICATION">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.publication"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="Authors">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.authors"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="更多信息">
                  <template slot-scope="scope">
                    <el-button type="primary" @click="bianji">编辑</el-button>
                  </template>
                </el-table-column>

                <el-table-column prop="caozuo" label="操作">
                  <template slot-scope="scope">
                    <div class="insertbutton">
                      <i
                        class="el-icon-delete delete"
                        size="mini"
                        v-if="!scope.row.editing"
                        icon="el-icon-delete"
                        @click="handleDelete_four(scope.$index, scope.row)"
                      ></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button
            @click="outerVisible_four = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >取 消</el-button
          >
          <el-button
            type="primary"
            @click="save"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >确 定</el-button
          >
          <el-button
            @click="outerVisible_four = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >放弃任务</el-button
          >
        </div>
      </el-dialog>
    </div>
    <!-- 内层弹窗 开始-->
    <el-dialog
      width="30%"
      title="内层 Dialog 任务信息整理"
      :visible.sync="innerVisible"
      :append-to-body="true"
    >
      <li
        class="center_content"
        v-for="(item, key_three) in tasklist"
        :key="key_three"
        style="margin-bottom:10px;"
      >
        <span style="float:left;width:100px;" v-text="item.name"></span>
        <el-input
          v-model="form.name"
          style="width:83%"
          v-if="item.type.indexOf('_input') >= 0"
        ></el-input>
        <el-input
          style="width:83%"
          type="textarea"
          :rows="2"
          v-model="textarea"
          v-if="item.type.indexOf('_textarea') >= 0"
        >
        </el-input>
        <el-select
          v-model="form.region"
          style="width:83%"
          v-if="item.type.indexOf('_select') >= 0"
        >
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </li>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 内层弹窗 结束-->
    <!-- 弹窗 4 -->

    <!-- 弹窗 5 和11重复，切prop不如11全-->
    <div class="five">
      <el-dialog
        title="外层 Dialog 任务信息整理（药物基因组成部分）"
        :visible.sync="outerVisible_five"
      >
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="任务信息" name="first">
            <div class="">
              任务名称：
              <el-input suffix-icon="el-icon-date" v-model="input_three">
              </el-input>
              评论内容：
              <el-input
                type="textarea"
                prefix-icon="el-icon-search"
                v-model="input2"
              >
              </el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="任务编辑" name="second">
            <div class="TestFive">
              <div class="insertbutton">
                <el-button @click="addLine_five" class="addrow"
                  >添加行数</el-button
                >
              </div>
              <el-table :data="tableData_five" style="width: 100%">
                <el-table-column prop="xuhao" label="序号" width="100px">
                  <template slot-scope="scope">
                    <label v-text="scope.$index + 1"></label>
                  </template>
                </el-table-column>
                <el-table-column prop="pmid" label="Pathways">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.pathways"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="Drugs/Drug Classes">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.drugs"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="Genes">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.genes"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="Diseases">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.diseases"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="更多信息">
                  <template slot-scope="scope">
                    <el-button type="primary" @click="bianji">编辑</el-button>
                  </template>
                </el-table-column>
                <el-table-column prop="caozuo" label="操作">
                  <template slot-scope="scope">
                    <div class="insertbutton">
                      <i
                        class="el-icon-delete delete"
                        size="mini"
                        v-if="!scope.row.editing"
                        icon="el-icon-delete"
                        @click="handleDelete_five(scope.$index, scope.row)"
                      ></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button
            @click="outerVisible_five = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >取 消</el-button
          >
          <el-button
            type="primary"
            @click="save"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >确 定</el-button
          >
          <el-button
            @click="outerVisible_five = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >放弃任务</el-button
          >
        </div>
      </el-dialog>
    </div>
    <!-- 内层弹窗 开始-->
    <el-dialog
      width="30%"
      title="内层 Dialog 任务信息整理(动态生成)"
      :visible.sync="innerVisible"
      :append-to-body="true"
    >
      <li
        class="center_content"
        v-for="(item, key_three) in tasklist"
        :key="key_three"
        style="margin-bottom:10px;"
      >
        <span style="float:left;width:100px;" v-text="item.name"></span>
        <el-input
          v-model="form.name"
          style="width:83%"
          v-if="item.type.indexOf('_input') >= 0"
        ></el-input>
        <el-input
          style="width:83%"
          type="textarea"
          :rows="2"
          v-model="textarea"
          v-if="item.type.indexOf('_textarea') >= 0"
        >
        </el-input>
        <el-select
          v-model="form.region"
          style="width:83%"
          v-if="item.type.indexOf('_select') >= 0"
        >
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </li>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 内层弹窗 结束-->
    <!-- 弹窗 5 -->

    <!-- 弹窗 6 -->
    <div class="six">
      <el-dialog
        title="外层 Dialog 任务信息整理（药物基因相关通路）"
        :visible.sync="outerVisible_six"
      >
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="任务信息" name="first">
            <div class="">
              任务名称：
              <el-input suffix-icon="el-icon-date" v-model="input_three">
              </el-input>
              评论内容：
              <el-input
                type="textarea"
                prefix-icon="el-icon-search"
                v-model="input2"
              >
              </el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="任务编辑" name="second">
            <div class="TestSix">
              <div class="insertbutton">
                <el-button @click="addLine_six" class="addrow"
                  >添加行数</el-button
                >
              </div>
              <el-table :data="tableData_six" style="width: 100%">
                <el-table-column prop="xuhao" label="序号" width="100px">
                  <template slot-scope="scope">
                    <label v-text="scope.$index + 1"></label>
                  </template>
                </el-table-column>
                <el-table-column prop="pathways" label="Pathways">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.pathways"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="relatedPathways"
                  label="Related Pathways"
                >
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.relatedPathways"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="caozuo" label="操作">
                  <template slot-scope="scope">
                    <div class="insertbutton">
                      <i
                        class="el-icon-delete delete"
                        size="mini"
                        v-if="!scope.row.editing"
                        icon="el-icon-delete"
                        @click="handleDelete_six(scope.$index, scope.row)"
                      ></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button
            @click="outerVisible_six = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >取 消</el-button
          >
          <el-button
            type="primary"
            @click="save"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >确 定</el-button
          >
          <el-button
            @click="outerVisible_six = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >放弃任务</el-button
          >
        </div>
      </el-dialog>
    </div>
    <!-- 弹窗 6 -->

    <!-- 弹窗 7 -->
    <div class="seven">
      <el-dialog
        title="外层 Dialog 药品说明书整理"
        :visible.sync="outerVisible_seven"
      >
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="任务信息" name="first">
            <div class="">
              任务名称：
              <el-input suffix-icon="el-icon-date" v-model="input_three">
              </el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="药品说明书整理" name="second">
            <div class="TestSeven">
              <div class="insertbutton">
                <el-button @click="addLine_seven" class="addrow"
                  >添加行数</el-button
                >
              </div>
              <el-table :data="tableData_seven" style="width: 100%">
                <el-table-column prop="xuhao" label="序号" width="100px">
                  <template slot-scope="scope">
                    <label v-text="scope.$index + 1"></label>
                  </template>
                </el-table-column>
                <el-table-column prop="pmid" label="说明书来源">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.pmid"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="通用名称">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.name"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="内容提取">
                  <template slot-scope="scope">
                    <el-button type="primary" @click="bianji">编辑</el-button>
                    <el-button
                      type="textarea"
                      style="display:none;"
                      v-model="scope.row.liter_content"
                    ></el-button>
                  </template>
                </el-table-column>
                <el-table-column label="原文上传" prop="accessoryId_value">
                  <template slot-scope="scope">
                    <el-select
                      style="width:83%"
                      v-model="scope.row.accessoryId_value"
                      clearable
                      placeholder="请选择"
                    >
                      <!-- <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option> -->
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label="包装图片上传">
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      v-model="scope.row.drugInstruction_picture"
                      @click="yulan"
                      >预览</el-button
                    >
                  </template>
                </el-table-column>
                <el-table-column prop="caozuo" label="操作">
                  <template slot-scope="scope">
                    <div class="insertbutton">
                      <i
                        class="el-icon-delete delete"
                        size="mini"
                        v-if="!scope.row.editing"
                        icon="el-icon-delete"
                        @click="handleDelete_seven(scope.$index, scope.row)"
                      ></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button
            @click="outerVisible_seven = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >取 消</el-button
          >
          <el-button
            type="primary"
            @click="save"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >确 定</el-button
          >
          <el-button
            @click="outerVisible_seven = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >放弃任务</el-button
          >
        </div>
      </el-dialog>
    </div>
    <!-- 内层弹窗 开始-->
    <el-dialog
      width="30%"
      title="内层 Dialog 药品说明书整理-编辑(动态生成)"
      :visible.sync="innerVisible"
      :append-to-body="true"
    >
      <li
        class="center_content"
        v-for="(item, key_three) in tasklist"
        :key="key_three"
        style="margin-bottom:10px;"
      >
        <span style="float:left;width:100px;" v-text="item.name"></span>
        <el-input
          v-model="form.name"
          style="width:83%"
          v-if="item.type.indexOf('_input') >= 0"
        ></el-input>
        <el-input
          style="width:83%"
          type="textarea"
          :rows="2"
          v-model="textarea"
          v-if="item.type.indexOf('_textarea') >= 0"
        >
        </el-input>
        <el-select
          v-model="form.region"
          style="width:83%"
          v-if="item.type.indexOf('_select') >= 0"
        >
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </li>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      width="30%"
      title="内层 Dialog 图片预览"
      :visible.sync="innerVisible_img"
      :append-to-body="true"
    >
      <!-- 图片上传 1-->
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="innerVisible_img = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >关闭</el-button
        >
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible_imgshow">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
    <!-- 图片上传 2-->
    <!-- 内层弹窗 结束-->
    <!-- 弹窗 7 -->

    <!-- 弹窗 8 -->
    <div class="eight">
      <el-dialog
        title="外层 Dialog （药物医保目录查询）"
        :visible.sync="outerVisible_eight"
      >
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="任务信息" name="first">
            <div class="">
              任务名称：
              <el-input suffix-icon="el-icon-date" v-model="input_three">
              </el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="任务编辑" name="second">
            <div class="TestEight">
              <div class="insertbutton">
                <el-button @click="addLine_eight" class="addrow"
                  >添加行数</el-button
                >
              </div>
              <el-table :data="tableData_eight" style="width: 100%">
                <el-table-column prop="xuhao" label="序号" width="100px">
                  <template slot-scope="scope">
                    <label v-text="scope.$index + 1"></label>
                  </template>
                </el-table-column>
                <el-table-column prop="medicalInsuranceArea" label="医保地区">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.medicalInsuranceArea"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="number" label="编号">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.number"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="drugName" label="药品名称">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.drugName"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="drugForm" label="剂型">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.drugForm"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="drugClassification" label="药品类别">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.drugClassification"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="medicalInsuranceCategory"
                  label="医保类别"
                >
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.medicalInsuranceCategory"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="supplementaryInformation"
                  label="增补情况"
                >
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.supplementaryInformation"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="changes" label="变更情况">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.changes"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="remarks" label="备注">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.remarks"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="caozuo" label="操作">
                  <template slot-scope="scope">
                    <div class="insertbutton">
                      <i
                        class="el-icon-delete delete"
                        size="mini"
                        v-if="!scope.row.editing"
                        icon="el-icon-delete"
                        @click="handleDelete_eight(scope.$index, scope.row)"
                      ></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button
            @click="outerVisible_eight = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >取 消</el-button
          >
          <el-button
            type="primary"
            @click="save"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >确 定</el-button
          >
          <el-button
            @click="outerVisible_eight = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >放弃任务</el-button
          >
        </div>
      </el-dialog>
    </div>
    <!-- 弹窗 8 -->

    <!-- 弹窗 9 -->
    <div class="nine">
      <el-dialog
        title="外层 Dialog （药物相互作用）"
        :visible.sync="outerVisible_nine"
      >
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="任务信息" name="first">
            <div class="">
              任务名称：
              <el-input suffix-icon="el-icon-date" v-model="input_three">
              </el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="任务编辑" name="second">
            <div class="TestNine">
              <div class="insertbutton">
                <el-button @click="addLine_nine" class="addrow"
                  >添加行数</el-button
                >
              </div>
              <el-table :data="tableData_nine" style="width: 100%">
                <el-table-column prop="xuhao" label="序号" width="100px">
                  <template slot-scope="scope">
                    <label v-text="scope.$index + 1"></label>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="药品名称">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.name"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="interactiveDrugs" label="相互作用的药品">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.interactiveDrugs"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="effectiveness" label="作用效果">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.effectiveness"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="caozuo" label="操作">
                  <template slot-scope="scope">
                    <div class="insertbutton">
                      <i
                        class="el-icon-delete delete"
                        size="mini"
                        v-if="!scope.row.editing"
                        icon="el-icon-delete"
                        @click="handleDelete_nine(scope.$index, scope.row)"
                      ></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button
            @click="outerVisible_nine = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >取 消</el-button
          >
          <el-button
            type="primary"
            @click="save"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >确 定</el-button
          >
          <el-button
            @click="outerVisible_nine = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >放弃任务</el-button
          >
        </div>
      </el-dialog>
    </div>
    <!-- 弹窗 9 -->

    <!-- 弹窗 10 -->
    <div class="ten">
      <el-dialog
        title="外层 Dialog （药物基因位点用药建议）"
        :visible.sync="outerVisible_ten"
      >
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="任务信息" name="first">
            <div class="">
              任务名称：
              <el-input suffix-icon="el-icon-date" v-model="input_three">
              </el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="任务编辑" name="second">
            <div class="TestEight">
              <div class="insertbutton">
                <el-button @click="addLine_ten" class="addrow"
                  >添加行数</el-button
                >
              </div>
              <el-table :data="tableData_ten" style="width: 100%">
                <el-table-column prop="xuhao" label="序号" width="100px">
                  <template slot-scope="scope">
                    <label v-text="scope.$index + 1"></label>
                  </template>
                </el-table-column>
                <el-table-column prop="medicationType" label="用药类型">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.medicationType"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="evidenceLevel" label="询证等级">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.evidenceLevel"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="race" label="种族">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.race"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="raceDetails" label="种族详情">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.raceDetails"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="phenotypes" label="表型">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.phenotypes"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="genotype" label="基因型">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.genotype"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="porMedicationSuggestionEnglish"
                  label="药物基因位点用药建议（英文）"
                >
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.porMedicationSuggestionEnglish"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="porMedicationSuggestionChinese"
                  label="药物基因位点用药建议（中文）"
                >
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.porMedicationSuggestionChinese"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="caozuo" label="操作">
                  <template slot-scope="scope">
                    <div class="insertbutton">
                      <i
                        class="el-icon-delete delete"
                        size="mini"
                        v-if="!scope.row.editing"
                        icon="el-icon-delete"
                        @click="handleDelete_ten(scope.$index, scope.row)"
                      ></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button
            @click="outerVisible_ten = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >取 消</el-button
          >
          <el-button
            type="primary"
            @click="save"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >确 定</el-button
          >
          <el-button
            @click="outerVisible_ten = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >放弃任务</el-button
          >
        </div>
      </el-dialog>
    </div>
    <!-- 弹窗 10 -->

    <!-- 弹窗 11 -->
    <div class="eleven">
      <el-dialog
        title="外层 Dialog 任务信息整理（药物基因组成部分）"
        :visible.sync="outerVisible_eleven"
      >
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="任务信息" name="first">
            <div class="">
              任务名称：
              <el-input suffix-icon="el-icon-date" v-model="input_three">
              </el-input>
              评论内容：
              <el-input
                type="textarea"
                prefix-icon="el-icon-search"
                v-model="input2"
              >
              </el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="任务编辑" name="second">
            <div class="TestEleven">
              <div class="insertbutton">
                <el-button @click="addLine_eleven" class="addrow"
                  >添加行数</el-button
                >
              </div>
              <el-table :data="tableData_eleven" style="width: 100%">
                <el-table-column prop="xuhao" label="序号" width="100px">
                  <template slot-scope="scope">
                    <label v-text="scope.$index + 1"></label>
                  </template>
                </el-table-column>
                <el-table-column prop="pathways" label="Pathways">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.pathways"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="drugs" label="Drugs/Drug Classes">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.drugs"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="genes" label="Genes">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.genes"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="diseases" label="Diseases">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.diseases"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="更多信息">
                  <template slot-scope="scope" prop="liter_content">
                    <el-button type="primary" @click="bianji">编辑</el-button>
                  </template>
                </el-table-column>
                <el-table-column prop="caozuo" label="操作">
                  <template slot-scope="scope">
                    <div class="insertbutton">
                      <i
                        class="el-icon-delete delete"
                        size="mini"
                        v-if="!scope.row.editing"
                        icon="el-icon-delete"
                        @click="handleDelete_eleven(scope.$index, scope.row)"
                      ></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button
            @click="outerVisible_eleven = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >取 消</el-button
          >
          <el-button
            type="primary"
            @click="save"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >确 定</el-button
          >
          <el-button
            @click="outerVisible_eleven = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >放弃任务</el-button
          >
        </div>
      </el-dialog>
    </div>
    <!-- 内层弹窗 开始-->
    <el-dialog
      width="30%"
      title="内层 Dialog 任务信息整理(动态生成)"
      :visible.sync="innerVisible"
      :append-to-body="true"
    >
      <li
        class="center_content"
        v-for="(item, key_three) in tasklist"
        :key="key_three"
        style="margin-bottom:10px;"
      >
        <span style="float:left;width:100px;" v-text="item.name"></span>
        <el-input
          v-model="form.name"
          style="width:83%"
          v-if="item.type.indexOf('_input') >= 0"
        ></el-input>
        <el-input
          style="width:83%"
          type="textarea"
          :rows="2"
          v-model="textarea"
          v-if="item.type.indexOf('_textarea') >= 0"
        >
        </el-input>
        <el-select
          v-model="form.region"
          style="width:83%"
          v-if="item.type.indexOf('_select') >= 0"
        >
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </li>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 内层弹窗 结束-->
    <!-- 弹窗 11 -->

    <!-- 弹窗 12 -->
    <div class="twelve">
      <el-dialog
        title="外层 Dialog（药物基因用药建议）"
        :visible.sync="outerVisible_twelve"
      >
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="任务信息" name="first">
            <div class="">
              任务名称：
              <el-input suffix-icon="el-icon-date" v-model="input_three">
              </el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="任务编辑" name="second">
            <div class="TestTwelve">
              <div class="insertbutton">
                <el-button @click="addLine_twelve" class="addrow"
                  >添加行数</el-button
                >
              </div>
              <el-table :data="tableData_twelve" style="width: 100%">
                <el-table-column prop="xuhao" label="序号" width="100px">
                  <template slot-scope="scope">
                    <label v-text="scope.$index + 1"></label>
                  </template>
                </el-table-column>
                <el-table-column label="组合型" prop="liter_content">
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      v-model="scope.row.liter_content"
                      @click="bianji"
                      >编辑</el-button
                    >
                  </template>
                </el-table-column>
                <el-table-column prop="conclusion" label="用药建议">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.conclusion"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="caozuo" label="操作">
                  <template slot-scope="scope">
                    <div class="insertbutton">
                      <i
                        class="el-icon-delete delete"
                        size="mini"
                        v-if="!scope.row.editing"
                        icon="el-icon-delete"
                        @click="handleDelete_twelve(scope.$index, scope.row)"
                      ></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button
            @click="outerVisible_twelve = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >取 消</el-button
          >
          <el-button
            type="primary"
            @click="save"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >确 定</el-button
          >
          <el-button
            @click="outerVisible_twelve = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >放弃任务</el-button
          >
        </div>
      </el-dialog>
    </div>
    <!-- 内层弹窗 开始-->
    <el-dialog
      width="30%"
      title="内层 Dialog 任务信息整理(动态生成，非表中生成)"
      :visible.sync="innerVisible"
      :append-to-body="true"
    >
      <li
        class="center_content"
        v-for="(item, key_three) in tasklist"
        :key="key_three"
        style="margin-bottom:10px;"
      >
        <span style="float:left;width:100px;" v-text="item.name"></span>
        <el-input
          v-model="form.name"
          style="width:83%"
          v-if="item.type.indexOf('_input') >= 0"
        ></el-input>
        <el-input
          style="width:83%"
          type="textarea"
          :rows="2"
          v-model="textarea"
          v-if="item.type.indexOf('_textarea') >= 0"
        >
        </el-input>
        <el-select
          v-model="form.region"
          style="width:83%"
          v-if="item.type.indexOf('_select') >= 0"
        >
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        <!-- v-if="item.type.indexOf('_ckeditor') >= 0" -->
        <div id="item.value"></div>
      </li>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 内层弹窗 结束-->
    <!-- 弹窗 12 -->

    <!-- 弹窗 13 -->
    <div class="thirteen">
      <el-dialog
        title="外层 Dialog 基因通路的参考文献提取整理 13"
        :visible.sync="outerVisible_thirteen"
      >
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="任务信息" name="first">
            <div class="">
              任务名称：
              <el-input suffix-icon="el-icon-date" v-model="input_three">
              </el-input>
              评论内容：
              <el-input
                type="textarea"
                suffix-icon="el-icon-date"
                v-model="input_thirteen"
              >
              </el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="任务编辑" name="second">
            <div class="TestThirteen">
              <div class="insertbutton">
                <el-button @click="addLine_thirteen" class="addrow"
                  >添加行数</el-button
                >
              </div>
              <el-table :data="tableData_thirteen" style="width: 100%">
                <el-table-column prop="xuhao" label="序号" width="100px">
                  <template slot-scope="scope">
                    <label v-text="scope.$index + 1"></label>
                  </template>
                </el-table-column>
                <el-table-column prop="pmid" label="PMID">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.pmid"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="文献名称">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.name"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="文献内容提取">
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      v-model="scope.row.approvalNumber"
                      @click="bianji"
                      >编辑</el-button
                    >
                  </template>
                </el-table-column>
                <el-table-column prop="accessoryId" label="文献上传">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.accessoryId"></el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="caozuo" label="操作">
                  <template slot-scope="scope">
                    <div class="insertbutton">
                      <i
                        class="el-icon-delete delete"
                        size="mini"
                        v-if="!scope.row.editing"
                        icon="el-icon-delete"
                        @click="handleDelete_thirteen(scope.$index, scope.row)"
                      ></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button
            @click="outerVisible_thirteen = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >取 消</el-button
          >
          <el-button
            type="primary"
            @click="save"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >确 定</el-button
          >
          <el-button
            @click="outerVisible_thirteen = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >放弃任务</el-button
          >
        </div>
      </el-dialog>
    </div>
    <!-- 内层弹窗 开始-->
    <el-dialog
      width="30%"
      title="内层 Dialog13"
      :visible.sync="innerVisible"
      :append-to-body="true"
    >
      <li
        class="center_content"
        v-for="(item, key_three) in tasklist"
        :key="key_three"
        style="margin-bottom:10px;"
      >
        <span style="float:left;width:100px;" v-text="item.name"></span>
        <el-input
          v-model="form.name"
          style="width:83%"
          v-if="item.type.indexOf('_input') >= 0"
        ></el-input>
        <el-input
          style="width:83%"
          type="textarea"
          :rows="2"
          v-model="textarea"
          v-if="item.type.indexOf('_textarea') >= 0"
        >
          <!-- v-if="item.type.indexOf('_ckeditor') >= 0" -->
        </el-input>
        <el-select
          v-model="form.region"
          style="width:83%"
          v-if="item.type.indexOf('_select') > 0"
        >
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </li>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 内层弹窗 结束-->
    <!-- 弹窗 13 -->

    <!-- 弹窗 14 调用13的弹窗及内容,不包含评论内容-->
    <div class="fourteen">
      <el-dialog
        title="外层 Dialog 国内外指南文献的上传 无评论内容 14"
        :visible.sync="outerVisible_fourteen"
      >
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="任务信息" name="first">
            <div class="">
              任务名称：
              <el-input suffix-icon="el-icon-date" v-model="input_three">
              </el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="任务编辑" name="second">
            <div class="TestFourteen">
              <div class="insertbutton">
                <el-button @click="addLine_thirteen" class="addrow"
                  >添加行数</el-button
                >
              </div>
              <el-table :data="tableData_thirteen" style="width: 100%">
                <el-table-column prop="xuhao" label="序号" width="100px">
                  <template slot-scope="scope">
                    <label v-text="scope.$index + 1"></label>
                  </template>
                </el-table-column>
                <el-table-column prop="pmid" label="PMID">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.pmid"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="文献名称">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.name"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="文献内容提取">
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      v-model="scope.row.approvalNumber"
                      @click="bianji"
                      >编辑</el-button
                    >
                  </template>
                </el-table-column>
                <el-table-column prop="accessoryId" label="文献上传">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.accessoryId"></el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="caozuo" label="操作">
                  <template slot-scope="scope">
                    <div class="insertbutton">
                      <i
                        class="el-icon-delete delete"
                        size="mini"
                        v-if="!scope.row.editing"
                        icon="el-icon-delete"
                        @click="handleDelete_fourteen(scope.$index, scope.row)"
                      ></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="文献上传" name="three">
            <div class="">
              <el-upload
                style="display:inline-block"
                :limit="2"
                class="upload-demo"
                ref="upload"
                action="/hqx/knowledge/importKnowledge"
                :file-list="fileList"
                :http-request="uploadSectionFile"
                :auto-upload="false"
              >
                <el-button slot="trigger" size="small" type="primary" plain
                  >选取文件</el-button
                >
                <el-button
                  style="margin-left: 10px;"
                  size="small"
                  icon="el-icon-upload2"
                  type="success"
                  @click="submitUpload"
                  >导入</el-button
                >
              </el-upload>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button
            @click="outerVisible_fourteen = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >取 消</el-button
          >
          <el-button
            type="primary"
            @click="save"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >确 定</el-button
          >
          <el-button
            @click="outerVisible_fourteen = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >放弃任务</el-button
          >
        </div>
      </el-dialog>
    </div>
    <!-- 内层弹窗 开始-->
    <el-dialog
      width="30%"
      title="内层 Dialog13"
      :visible.sync="innerVisible"
      :append-to-body="true"
    >
      <li
        class="center_content"
        v-for="(item, key_three) in tasklist"
        :key="key_three"
        style="margin-bottom:10px;"
      >
        <span style="float:left;width:100px;" v-text="item.name"></span>
        <el-input
          v-model="form.name"
          style="width:83%"
          v-if="item.type.indexOf('_input') >= 0"
        ></el-input>
        <el-input
          style="width:83%"
          type="textarea"
          :rows="2"
          v-model="textarea"
          v-if="item.type.indexOf('_textarea') >= 0"
        >
          <!-- v-if="item.type.indexOf('_ckeditor') >= 0" -->
        </el-input>
        <el-select
          v-model="form.region"
          style="width:83%"
          v-if="item.type.indexOf('_select') > 0"
        >
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </li>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 内层弹窗 结束-->
    <!-- 弹窗 14 -->
    <!-- 弹窗 15 和14一样，调用13的弹窗及内容,且包含评论内容-->
    <div class="fiveteen">
      <el-dialog
        title="外层 Dialog 国内外指南文献的上传 15 和14一样，含评论内容"
        :visible.sync="outerVisible_fiveteen"
      >
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="任务信息" name="first">
            <div class="">
              任务名称：
              <el-input suffix-icon="el-icon-date" v-model="input_three">
              </el-input>
              评论内容：
              <el-input
                type="textarea"
                suffix-icon="el-icon-date"
                v-model="tableData_fiveteen[0].currentTaskComment"
              >
              </el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="任务编辑" name="second">
            <div class="TestFiveteen">
              <div class="insertbutton">
                <el-button @click="addLine_thirteen" class="addrow"
                  >添加行数</el-button
                >
              </div>
              <el-table :data="tableData_thirteen" style="width: 100%">
                <el-table-column prop="xuhao" label="序号" width="100px">
                  <template slot-scope="scope">
                    <label v-text="scope.$index + 1"></label>
                  </template>
                </el-table-column>
                <el-table-column prop="pmid" label="PMID">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.pmid"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="文献名称">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.name"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="文献内容提取">
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      v-model="scope.row.approvalNumber"
                      @click="bianji"
                      >编辑</el-button
                    >
                  </template>
                </el-table-column>
                <el-table-column prop="accessoryId" label="文献上传">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.accessoryId"></el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="caozuo" label="操作">
                  <template slot-scope="scope">
                    <div class="insertbutton">
                      <i
                        class="el-icon-delete delete"
                        size="mini"
                        v-if="!scope.row.editing"
                        icon="el-icon-delete"
                        @click="handleDelete_thirteen(scope.$index, scope.row)"
                      ></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="文献上传" name="three">
            <div class="">
              <el-upload
                style="display:inline-block"
                :limit="2"
                class="upload-demo"
                ref="upload"
                action="/hqx/knowledge/importKnowledge"
                :file-list="fileList"
                :http-request="uploadSectionFile"
                :auto-upload="false"
              >
                <el-button slot="trigger" size="small" type="primary" plain
                  >选取文件</el-button
                >
                <el-button
                  style="margin-left: 10px;"
                  size="small"
                  icon="el-icon-upload2"
                  type="success"
                  @click="submitUpload"
                  >导入</el-button
                >
              </el-upload>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button
            @click="outerVisible_thirteen = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >取 消</el-button
          >
          <el-button
            type="primary"
            @click="save"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >确 定</el-button
          >
          <el-button
            @click="outerVisible_thirteen = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >放弃任务</el-button
          >
        </div>
      </el-dialog>
    </div>
    <!-- 内层弹窗 开始-->
    <el-dialog
      width="30%"
      title="内层 Dialog13"
      :visible.sync="innerVisible"
      :append-to-body="true"
    >
      <li
        class="center_content"
        v-for="(item, key_three) in tasklist"
        :key="key_three"
        style="margin-bottom:10px;"
      >
        <span style="float:left;width:100px;" v-text="item.name"></span>
        <el-input
          v-model="form.name"
          style="width:83%"
          v-if="item.type.indexOf('_input') >= 0"
        ></el-input>
        <el-input
          style="width:83%"
          type="textarea"
          :rows="2"
          v-model="textarea"
          v-if="item.type.indexOf('_textarea') >= 0"
        >
          <!-- v-if="item.type.indexOf('_ckeditor') >= 0" -->
        </el-input>
        <el-select
          v-model="form.region"
          style="width:83%"
          v-if="item.type.indexOf('_select') > 0"
        >
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </li>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 内层弹窗 结束-->
    <!-- 弹窗 15 -->

    <!-- 弹窗 16 国内外药物标签文献的上传，含评论内容-->
    <div class="sixteen">
      <el-dialog
        title="外层 Dialog 国内外药物标签文献的上传，含评论内容"
        :visible.sync="outerVisible_sixteen"
      >
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="任务信息" name="first">
            <div class="">
              任务名称：
              <el-input suffix-icon="el-icon-date" v-model="input_three">
              </el-input>
              评论内容：
              <el-input
                type="textarea"
                suffix-icon="el-icon-date"
                v-model="tableData_sixteen[0].currentTaskComment"
              >
              </el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="任务编辑" name="second">
            <div class="TestFiveteen">
              <div class="insertbutton">
                <el-button @click="addLine_sixteen" class="addrow"
                  >添加行数</el-button
                >
              </div>
              <el-table :data="tableData_sixteen" style="width: 100%">
                <el-table-column prop="xuhao" label="序号" width="100px">
                  <template slot-scope="scope">
                    <label v-text="scope.$index + 1"></label>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="文献名称">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.name"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="文献内容提取">
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      v-model="scope.row.approvalNumber"
                      @click="bianji"
                      >编辑</el-button
                    >
                  </template>
                </el-table-column>
                <el-table-column prop="accessoryId" label="文献上传">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.accessoryId"></el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="caozuo" label="操作">
                  <template slot-scope="scope">
                    <div class="insertbutton">
                      <i
                        class="el-icon-delete delete"
                        size="mini"
                        v-if="!scope.row.editing"
                        icon="el-icon-delete"
                        @click="handleDelete_sixteen(scope.$index, scope.row)"
                      ></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="文献上传" name="three">
            <div class="">
              <el-upload
                style="display:inline-block"
                :limit="2"
                class="upload-demo"
                ref="upload"
                action="/hqx/knowledge/importKnowledge"
                :file-list="fileList"
                :http-request="uploadSectionFile"
                :auto-upload="false"
              >
                <el-button slot="trigger" size="small" type="primary" plain
                  >选取文件</el-button
                >
                <el-button
                  style="margin-left: 10px;"
                  size="small"
                  icon="el-icon-upload2"
                  type="success"
                  @click="submitUpload"
                  >导入</el-button
                >
              </el-upload>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button
            @click="outerVisible_sixteen = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >取 消</el-button
          >
          <el-button
            type="primary"
            @click="save"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >确 定</el-button
          >
          <el-button
            @click="outerVisible_sixteen = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >放弃任务</el-button
          >
        </div>
      </el-dialog>
    </div>
    <!-- 内层弹窗 开始-->
    <el-dialog
      width="30%"
      title="内层 Dialog13"
      :visible.sync="innerVisible"
      :append-to-body="true"
    >
      <li
        class="center_content"
        v-for="(item, key_three) in tasklist"
        :key="key_three"
        style="margin-bottom:10px;"
      >
        <span style="float:left;width:100px;" v-text="item.name"></span>
        <el-input
          v-model="form.name"
          style="width:83%"
          v-if="item.type.indexOf('_input') >= 0"
        ></el-input>
        <el-input
          style="width:83%"
          type="textarea"
          :rows="2"
          v-model="textarea"
          v-if="item.type.indexOf('_textarea') >= 0"
        >
          <!-- v-if="item.type.indexOf('_ckeditor') >= 0" -->
        </el-input>
        <el-select
          v-model="form.region"
          style="width:83%"
          v-if="item.type.indexOf('_select') > 0"
        >
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        <div
          id="history"
          v-if="item.type.indexOf('_ckeditor') >= 0"
          style="width:100%"
        ></div>
      </li>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 内层弹窗 结束-->
    <!-- 弹窗 16 -->

    <!-- 弹窗 17 国内外药物标签文献的上传，不含评论内容-->
    <div class="seventeen">
      <el-dialog
        title="外层 Dialog 国内外药物标签文献的上传，17，不含评论内容"
        :visible.sync="outerVisible_seventeen"
      >
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="任务信息" name="first">
            <div class="">
              任务名称：
              <el-input suffix-icon="el-icon-date" v-model="input_three">
              </el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="任务编辑" name="second">
            <div class="TestFiveteen">
              <div class="insertbutton">
                <el-button @click="addLine_seventeen" class="addrow"
                  >添加行数</el-button
                >
              </div>
              <el-table :data="tableData_seventeen" style="width: 100%">
                <el-table-column prop="xuhao" label="序号" width="100px">
                  <template slot-scope="scope">
                    <label v-text="scope.$index + 1"></label>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="文献名称">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.name"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="文献内容提取">
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      v-model="scope.row.approvalNumber"
                      @click="bianji"
                      >编辑</el-button
                    >
                  </template>
                </el-table-column>
                <el-table-column prop="accessoryId" label="文献上传">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.accessoryId"></el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="caozuo" label="操作">
                  <template slot-scope="scope">
                    <div class="insertbutton">
                      <i
                        class="el-icon-delete delete"
                        size="mini"
                        v-if="!scope.row.editing"
                        icon="el-icon-delete"
                        @click="handleDelete_seventeen(scope.$index, scope.row)"
                      ></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="文献上传" name="three">
            <div class="">
              <el-upload
                style="display:inline-block"
                :limit="2"
                class="upload-demo"
                ref="upload"
                action="/hqx/knowledge/importKnowledge"
                :file-list="fileList"
                :http-request="uploadSectionFile"
                :auto-upload="false"
              >
                <el-button slot="trigger" size="small" type="primary" plain
                  >选取文件</el-button
                >
                <el-button
                  style="margin-left: 10px;"
                  size="small"
                  icon="el-icon-upload2"
                  type="success"
                  @click="submitUpload"
                  >导入</el-button
                >
              </el-upload>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button
            @click="outerVisible_seventeen = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >取 消</el-button
          >
          <el-button
            type="primary"
            @click="save"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >确 定</el-button
          >
          <el-button
            @click="outerVisible_seventeen = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >放弃任务</el-button
          >
        </div>
      </el-dialog>
    </div>
    <!-- 内层弹窗 开始-->
    <el-dialog
      width="30%"
      title="内层 Dialog13"
      :visible.sync="innerVisible"
      :append-to-body="true"
    >
      <li
        class="center_content"
        v-for="(item, key_three) in tasklist"
        :key="key_three"
        style="margin-bottom:10px;"
      >
        <span style="float:left;width:100px;" v-text="item.name"></span>
        <el-input
          v-model="form.name"
          style="width:83%"
          v-if="item.type.indexOf('_input') >= 0"
        ></el-input>
        <el-input
          style="width:83%"
          type="textarea"
          :rows="2"
          v-model="textarea"
          v-if="item.type.indexOf('_textarea') >= 0"
        >
          <!-- v-if="item.type.indexOf('_ckeditor') >= 0" -->
        </el-input>
        <el-select
          v-model="form.region"
          style="width:83%"
          v-if="item.type.indexOf('_select') > 0"
        >
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        <div
          id="history"
          v-if="item.type.indexOf('_ckeditor') >= 0"
          style="width:100%"
        ></div>
      </li>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 内层弹窗 结束-->
    <!-- 弹窗 17 -->

    <!-- 弹窗 18 国内外药物标签文献的上传，含评论内容-->
    <div class="eighteen">
      <el-dialog
        title="外层 Dialog 国内外专利注释文献的上传，含评论内容"
        :visible.sync="outerVisible_eighteen"
      >
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="任务信息" name="first">
            <div class="">
              任务名称：
              <el-input suffix-icon="el-icon-date" v-model="input_three">
              </el-input>
              评论内容：
              <el-input
                type="textarea"
                suffix-icon="el-icon-date"
                v-model="tableData_eighteen[0].currentTaskComment"
              >
              </el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="任务编辑" name="second">
            <div class="TestFiveteen">
              <div class="insertbutton">
                <el-button @click="addLine_eighteen" class="addrow"
                  >添加行数</el-button
                >
              </div>
              <el-table :data="tableData_eighteen" style="width: 100%">
                <el-table-column prop="xuhao" label="序号" width="100px">
                  <template slot-scope="scope">
                    <label v-text="scope.$index + 1"></label>
                  </template>
                </el-table-column>
                <el-table-column prop="pmid" label="公开号">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.pmid"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="文献名称">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.name"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="文献内容提取">
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      v-model="scope.row.approvalNumber"
                      @click="bianji"
                      >编辑</el-button
                    >
                  </template>
                </el-table-column>
                <el-table-column prop="accessoryId" label="文献上传">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.accessoryId"></el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="caozuo" label="操作">
                  <template slot-scope="scope">
                    <div class="insertbutton">
                      <i
                        class="el-icon-delete delete"
                        size="mini"
                        v-if="!scope.row.editing"
                        icon="el-icon-delete"
                        @click="handleDelete_eighteen(scope.$index, scope.row)"
                      ></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="文献上传" name="three">
            <div class="">
              <el-upload
                style="display:inline-block"
                :limit="2"
                class="upload-demo"
                ref="upload"
                action="/hqx/knowledge/importKnowledge"
                :file-list="fileList"
                :http-request="uploadSectionFile"
                :auto-upload="false"
              >
                <el-button slot="trigger" size="small" type="primary" plain
                  >选取文件</el-button
                >
                <el-button
                  style="margin-left: 10px;"
                  size="small"
                  icon="el-icon-upload2"
                  type="success"
                  @click="submitUpload"
                  >导入</el-button
                >
              </el-upload>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button
            @click="outerVisible_eighteen = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >取 消</el-button
          >
          <el-button
            type="primary"
            @click="save"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >确 定</el-button
          >
          <el-button
            @click="outerVisible_eighteen = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >放弃任务</el-button
          >
        </div>
      </el-dialog>
    </div>
    <!-- 内层弹窗 开始-->
    <el-dialog
      width="30%"
      title="内层 Dialog13"
      :visible.sync="innerVisible"
      :append-to-body="true"
    >
      <li
        class="center_content"
        v-for="(item, key_three) in tasklist"
        :key="key_three"
        style="margin-bottom:10px;"
      >
        <span style="float:left;width:100px;" v-text="item.name"></span>
        <el-input
          v-model="form.name"
          style="width:83%"
          v-if="item.type.indexOf('_input') >= 0"
        ></el-input>
        <el-input
          style="width:83%"
          type="textarea"
          :rows="2"
          v-model="textarea"
          v-if="item.type.indexOf('_textarea') >= 0"
        >
          <!-- v-if="item.type.indexOf('_ckeditor') >= 0" -->
        </el-input>
        <el-select
          v-model="form.region"
          style="width:83%"
          v-if="item.type.indexOf('_select') > 0"
        >
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        <div
          id="history"
          v-if="item.type.indexOf('_ckeditor') >= 0"
          style="width:100%"
        ></div>
      </li>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 内层弹窗 结束-->
    <!-- 弹窗 18 -->

    <!-- 弹窗 19 说明书原文上传，含评论内容-->
    <div class="nineteen">
      <el-dialog
        title="外层 Dialog 说明书原文上传，含评论内容"
        :visible.sync="outerVisible_nineteen"
      >
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="任务信息" name="first">
            <div class="">
              任务名称：
              <el-input suffix-icon="el-icon-date" v-model="input_three">
              </el-input>
              评论内容：
              <el-input
                type="textarea"
                suffix-icon="el-icon-date"
                v-model="tableData_nineteen[0].currentTaskComment"
              >
              </el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="药品说明书整理" name="second">
            <div class="TestFiveteen">
              <div class="insertbutton">
                <el-button @click="addLine_nineteen" class="addrow"
                  >添加行数</el-button
                >
              </div>
              <el-table :data="tableData_nineteen" style="width: 100%">
                <el-table-column prop="xuhao" label="序号" width="100px">
                  <template slot-scope="scope">
                    <label v-text="scope.$index + 1"></label>
                  </template>
                </el-table-column>
                <el-table-column prop="pmid" label="说明书来源">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.pmid"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="通用名称">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.name"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="内容提取">
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      v-model="scope.row.approvalNumber"
                      @click="bianji"
                      >查看</el-button
                    >
                  </template>
                </el-table-column>
                <el-table-column prop="accessoryId" label="原文上传">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.accessoryId"></el-select>
                  </template>
                </el-table-column>
                <el-table-column label="包装图片上传">
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      v-model="scope.row.drugInstruction_picture"
                      @click="yulan"
                      >预览？？？？？？？[无效果]</el-button
                    >
                  </template>
                </el-table-column>
                <el-table-column prop="caozuo" label="操作">
                  <template slot-scope="scope">
                    <div class="insertbutton">
                      <i
                        class="el-icon-delete delete"
                        size="mini"
                        v-if="!scope.row.editing"
                        icon="el-icon-delete"
                        @click="handleDelete_nineteen(scope.$index, scope.row)"
                      ></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="说明书原文上传" name="three">
            <div class="">
              <el-upload
                style="display:inline-block"
                :limit="2"
                class="upload-demo"
                ref="upload"
                action="/hqx/knowledge/importKnowledge"
                :file-list="fileList"
                :http-request="uploadSectionFile"
                :auto-upload="false"
              >
                <el-button slot="trigger" size="small" type="primary" plain
                  >选取文件</el-button
                >
                <el-button
                  style="margin-left: 10px;"
                  size="small"
                  icon="el-icon-upload2"
                  type="success"
                  @click="submitUpload"
                  >导入</el-button
                >
              </el-upload>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button
            @click="outerVisible_nineteen = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >取 消</el-button
          >
          <el-button
            type="primary"
            @click="save"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >确 定</el-button
          >
          <el-button
            @click="outerVisible_nineteen = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >放弃任务</el-button
          >
        </div>
      </el-dialog>
    </div>
    <!-- 内层弹窗 开始-->
    <el-dialog
      width="30%"
      title="内层 Dialog13"
      :visible.sync="innerVisible"
      :append-to-body="true"
    >
      <li
        class="center_content"
        v-for="(item, key_three) in tasklist"
        :key="key_three"
        style="margin-bottom:10px;"
      >
        <span style="float:left;width:100px;" v-text="item.name"></span>
        <el-input
          v-model="form.name"
          style="width:83%"
          v-if="item.type.indexOf('_input') >= 0"
        ></el-input>
        <el-input
          style="width:83%"
          type="textarea"
          :rows="2"
          v-model="textarea"
          v-if="item.type.indexOf('_textarea') >= 0"
        >
          <!-- v-if="item.type.indexOf('_ckeditor') >= 0" -->
        </el-input>
        <el-select
          v-model="form.region"
          style="width:83%"
          v-if="item.type.indexOf('_select') > 0"
        >
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        <div
          id="history"
          v-if="item.type.indexOf('_ckeditor') >= 0"
          style="width:100%"
        ></div>
      </li>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      width="30%"
      title="内层 Dialog 图片预览"
      :visible.sync="innerVisible_img"
      :append-to-body="true"
    >
      <!-- 图片上传 1-->
      <!-- <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <i class="el-icon-plus"></i>
      </el-upload> -->
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="innerVisible_img = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >关闭</el-button
        >
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible_imgshow">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
    <!-- 内层弹窗 结束-->
    <!-- 弹窗 19 -->

    <!-- 弹窗 20 3GBio基因位点频率地理分布（中国）-->
    <div class="twenty">
      <el-dialog
        title="外层 Dialog 3GBio基因位点频率地理分布，含评论内容"
        :visible.sync="outerVisible_twenty"
      >
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="任务信息" name="first">
            <div class="">
              任务名称：
              <el-input suffix-icon="el-icon-date" v-model="input_three">
              </el-input>
              评论内容：
              <el-input
                type="textarea"
                suffix-icon="el-icon-date"
                v-model="tableData_twenty[0].currentTaskComment"
              >
              </el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="任务编辑" name="second">
            <div class="TestFiveteen">
              <div class="insertbutton">
                <el-button @click="addLine_twenty" class="addrow"
                  >添加行数</el-button
                >
              </div>
              <el-table :data="tableData_twenty" style="width: 100%">
                <el-table-column prop="xuhao" label="序号" width="100px">
                  <template slot-scope="scope">
                    <label v-text="scope.$index + 1"></label>
                  </template>
                </el-table-column>
                <el-table-column prop="dataSource" label="数据来源">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.dataSource"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="year" label="年份">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.year"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="project" label="项目">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.project"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="area" label="地区">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.area"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="receiveLaboratory" label="收检实验室">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.receiveLaboratory"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="sex" label="性别">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.sex"></el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="ageGroup" label="年龄段">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.ageGroup"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="sampleType" label="样本类别">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.sampleType"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="porResultId" label="位点结果">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.porResultId"></el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="testAmount" label="检测量">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.testAmount"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="caozuo" label="操作">
                  <template slot-scope="scope">
                    <div class="insertbutton">
                      <i
                        class="el-icon-delete delete"
                        size="mini"
                        v-if="!scope.row.editing"
                        icon="el-icon-delete"
                        @click="handleDelete_twenty(scope.$index, scope.row)"
                      ></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button
            @click="outerVisible_twenty = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >取 消</el-button
          >
          <el-button
            type="primary"
            @click="save"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >确 定</el-button
          >
          <el-button
            @click="outerVisible_twenty = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >放弃任务</el-button
          >
        </div>
      </el-dialog>
    </div>
    <!-- 弹窗 20 -->

    <!-- 弹窗 21 3GBio基因位点频率地理分布（世界）-->
    <div class="twentyOne">
      <el-dialog
        title="外层 Dialog 3GBio基因位点频率地理分布(世界)，含评论内容"
        :visible.sync="outerVisible_twentyOne"
      >
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="任务信息" name="first">
            <div class="">
              任务名称：
              <el-input suffix-icon="el-icon-date" v-model="input_three">
              </el-input>
              评论内容：
              <el-input
                type="textarea"
                suffix-icon="el-icon-date"
                v-model="tableData_twentyOne[0].currentTaskComment"
              >
              </el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="任务编辑" name="second">
            <div class="TestFiveteen">
              <div class="insertbutton">
                <el-button @click="addLine_twentyOne" class="addrow"
                  >添加行数</el-button
                >
              </div>
              <el-table :data="tableData_twentyOne" style="width: 100%">
                <el-table-column prop="xuhao" label="序号" width="100px">
                  <template slot-scope="scope">
                    <label v-text="scope.$index + 1"></label>
                  </template>
                </el-table-column>
                <el-table-column prop="dataSource" label="数据来源">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.dataSource"
                    ></el-input>
                  </template>
                </el-table-column>

                <el-table-column prop="project" label="项目">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.project"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="fatherRace" label="父种族">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.fatherRace"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="race" label="种族">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.race"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="area" label="所处地区">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.area"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="porResultId" label="位点结果">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.porResultId"></el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="testAmount" label="检测量">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.testAmount"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="caozuo" label="操作">
                  <template slot-scope="scope">
                    <div class="insertbutton">
                      <i
                        class="el-icon-delete delete"
                        size="mini"
                        v-if="!scope.row.editing"
                        icon="el-icon-delete"
                        @click="handleDelete_twentyOne(scope.$index, scope.row)"
                      ></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button
            @click="outerVisible_twentyOne = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >取 消</el-button
          >
          <el-button
            type="primary"
            @click="save"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >确 定</el-button
          >
          <el-button
            @click="outerVisible_twentyOne = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >放弃任务</el-button
          >
        </div>
      </el-dialog>
    </div>
    <!-- 弹窗 21 -->

    <!-- 弹窗 22 3GBio住院病案首页数据统计 -->
    <div class="twentyTwo">
      <el-dialog
        title="外层 Dialog 3GBio住院病案首页数据统计，含评论内容"
        :visible.sync="outerVisible_twentyTwo"
      >
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="任务信息" name="first">
            <div class="">
              任务名称：
              <el-input suffix-icon="el-icon-date" v-model="input_three">
              </el-input>
              评论内容：
              <el-input
                type="textarea"
                suffix-icon="el-icon-date"
                v-model="tableData_twentyTwo[0].currentTaskComment"
              >
              </el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="任务编辑" name="second">
            <div class="TestFiveteen">
              <div class="insertbutton">
                <el-button @click="addLine_twentyTwo" class="addrow"
                  >添加行数</el-button
                >
              </div>
              <el-table :data="tableData_twentyTwo" style="width: 100%">
                <el-table-column prop="xuhao" label="序号" width="100px">
                  <template slot-scope="scope">
                    <label v-text="scope.$index + 1"></label>
                  </template>
                </el-table-column>
                <el-table-column prop="dataSource" label="数据来源">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.dataSource"
                    ></el-input>
                  </template>
                </el-table-column>

                <el-table-column prop="project" label="项目">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.project"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="sex" label="性别">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.sex"></el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="ageGroup" label="年龄段">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.ageGroup"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="nation" label="民族">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.nation"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="nativePlace" label="籍贯">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.nativePlace"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="porResultId" label="位点结果">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.porResultId"></el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="testAmount" label="检测量">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.testAmount"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="caozuo" label="操作">
                  <template slot-scope="scope">
                    <div class="insertbutton">
                      <i
                        class="el-icon-delete delete"
                        size="mini"
                        v-if="!scope.row.editing"
                        icon="el-icon-delete"
                        @click="handleDelete_twentyTwo(scope.$index, scope.row)"
                      ></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button
            @click="outerVisible_twentyTwo = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >取 消</el-button
          >
          <el-button
            type="primary"
            @click="save"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >确 定</el-button
          >
          <el-button
            @click="outerVisible_twentyTwo = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >放弃任务</el-button
          >
        </div>
      </el-dialog>
    </div>
    <!-- 弹窗 22 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 弹窗 1
      content: null,
      editorOption: {
        action: '/img/uploadImg ', // 必填参数 图片上传地址
        methods: 'post', // 必填参数 图片上传方式
        name: 'upload_file' // 必填参数 文件的参数名
      },
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
          accessoryId: '',
          caozuo: ''
        }
      ],
      tableData_four: [
        {
          Pathways: '',
          relatedPathways: '',
          publication: '',
          authors: '',
          caozuo: ''
        }
      ],
      dialogTableVisible: false,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      outerVisible: false,
      innerVisible: false,
      outerVisible_four: false,
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
  }
}
</script>

<style scoped>
</style>

