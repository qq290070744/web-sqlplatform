<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>工单管理</el-breadcrumb-item>
      <el-breadcrumb-item>历史数据导出工单</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form :inline="true" class="demo-form-inline">
        <span class="demonstration"> - 选择日期: </span>
        <el-date-picker
          v-model="datetimevalue"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
        >
        </el-date-picker>
        -
        <el-form-item label="用户名">
          <el-input v-model="sponsor" placeholder="user"></el-input>
        </el-form-item>
        -
        <el-form-item label="host">
          <el-input v-model="host" placeholder="host"></el-input>
        </el-form-item>
        -
        <el-form-item label="数据库名">
          <el-input v-model="dbname" placeholder="dbname"></el-input>
        </el-form-item>
        <el-checkbox v-model="is_check">查看是否检查</el-checkbox>
        -
        <el-button type="primary" @click="get_workorder">搜索</el-button>
      </el-form>
      <el-table :data="tableData" style="width: 100%" border stripe>
        <el-table-column
          label="#"
          type="index"
          align="center"
          header-align="center"
        ></el-table-column>
        <el-table-column
          label="发起人"
          prop="sponsor"
          align="center"
          header-align="center"
        ></el-table-column>
        <el-table-column
          label="审核人"
          prop="approver_manager"
          align="center"
          header-align="center"
        ></el-table-column>
        <!--        <el-table-column label="审核dba" prop="approver_dba" align="center" header-align="center"></el-table-column>-->
        <el-table-column
          label="实例名称"
          prop="ins_name"
          align="center"
          header-align="center"
        ></el-table-column>
        <el-table-column
          label="实例地址"
          prop="host"
          align="center"
          header-align="center"
        ></el-table-column>
        <el-table-column
          label="数据库"
          prop="dbname"
          align="center"
          header-align="center"
        ></el-table-column>
        <el-table-column label="sql" align="center" header-align="center">
          <template slot-scope="scope">
            <pre><div v-html="scope.row.sql.slice(0,10)"></div></pre>
            <el-button
              type="primary"
              @click="alert_sql(scope.row.sql)"
              size="mini"
              round
              >查看全部sql</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" header-align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status == 0 ? true : false" type="info">
              <span class="el-icon-success">待审批</span>
            </el-tag>
            <el-tag v-if="scope.row.status == 1 ? true : false" type="success">
              <span class="el-icon-success">通过</span>
            </el-tag>
            <el-tag v-if="scope.row.status == 2 ? true : false" type="danger">
              <span class="el-icon-error">驳回</span>
            </el-tag>
            <el-tag v-if="scope.row.status == 3 ? true : false" type="success">
              <span class="el-icon-success">已下载</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="sql执行状态"
          align="center"
          header-align="center"
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.sql_exec_status === 1" type="info">
              <span class="el-icon-success">执行中</span>
            </el-tag>
            <el-tag v-if="scope.row.sql_exec_status === 2" type="success">
              <span class="el-icon-success">执行完成</span>
            </el-tag>
            <el-tag v-if="scope.row.sql_exec_status === 3" type="danger">
              <span class="el-icon-error">sql报错</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="链接" align="center" header-align="center">
          <template slot-scope="scope">
            <el-link
              type="primary"
              v-if="scope.row.status == 1 ? true : false"
              v-bind:href="scope.row.path"
              target="_blank"
              >下载链接</el-link
            >
          </template>
        </el-table-column>
        <el-table-column
          label="发起时间"
          width="110"
          prop="create_time"
          align="center"
          header-align="center"
        ></el-table-column>
        <el-table-column
          label="审批时间"
          width="110"
          align="center"
          header-align="center"
        >
          <template slot-scope="scope">
            <span type="primary" v-if="scope.row.status >= 1">{{
              scope.row.approve_time
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="下载时间"
          width="110"
          align="center"
          header-align="center"
        >
          <template slot-scope="scope">
            <span type="primary" v-if="scope.row.status === 3">{{
              scope.row.download_time
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="工单说明"
          prop="remark"
          align="center"
          header-align="center"
        ></el-table-column>
        <el-table-column
          prop="is_check"
          label="是否检查"
          align="center"
          header-align="center"
        >
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.is_check === 1"
              type="success"
              class="iconfont icon-zhengchang"
            ></el-tag>
            <el-tag
              v-if="scope.row.is_check === 0"
              type="danger"
              class="iconfont icon-yichang"
            ></el-tag>
            <el-button
              v-if="scope.row.is_check === 0"
              type="primary"
              size="mini"
              @click="order_mark_check(scope.row.id)"
              >点击标记检查
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="offset"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="limit"
        :hide-on-single-page="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>
<script>
import hljs from "highlight.js";
import sqlFormatter from "sql-formatter";

export default {
  data() {
    return {
      tableData: [],
      offset: 1,
      limit: 10,
      total: 0,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      datetimevalue: [],
      is_check: 2,
      sponsor: "",
      host: "",
      dbname: "",
    };
  },
  mounted() {
    this.get_workorder();
  },
  methods: {
    handleSizeChange(val) {
      this.limit = val;
      this.get_workorder();
    },
    handleCurrentChange(val) {
      this.offset = val;
      this.get_workorder();
    },
    async get_workorder() {
      let is_check;
      if (this.is_check === true) {
        is_check = 1;
      } else if (this.is_check === false) {
        is_check = 0;
      } else if (this.is_check === 2) {
        is_check = 2;
      }
      let start_time = "";
      let end_time = "";
      // console.log(this.datetimevalue)
      if (this.datetimevalue) {
        if (this.datetimevalue.length > 1) {
          const date = new Date(this.datetimevalue[0]);
          const date1 = new Date(this.datetimevalue[1]);
          start_time = Date.parse(date) / 1000;
          end_time = Date.parse(date1) / 1000;
        }
      }
      const { data: res } = await this.$ajax
        .get(
          `/historyorder_data_export/?offset=${this.offset}&limit=${this.limit}&is_check=${is_check}&start_time=${start_time}&end_time=${end_time}&sponsor=${this.sponsor}&host=${this.host}&dbname=${this.dbname}`
        )
        .catch(() => {
          return this.$notify.error({
            title: "错误",
            message: "发起请求历史工单失败",
          });
        });
      if (res.msg !== "success") return this.$message.error("获取历史工单失败");
      this.tableData = res.data;
      this.total = res.total;
      // this.tableData.forEach(item => {
      //   item.sql.forEach(i => {
      //     i.sql = hljs.highlight("sql", i.sql).value;
      //   });
      // });
    },
    async alert_sql(sql) {
      sql = sqlFormatter.format(sql);
      sql = hljs.highlight("sql", sql).value;
      this.$alert("<pre>" + sql + "</pre>", "sql", {
        dangerouslyUseHTMLString: true,
      });
    },
    async alert_remark(remark) {
      await this.$alert("<pre>" + remark + "</pre>", "remark", {
        dangerouslyUseHTMLString: true,
      });
    },
    async order_mark_check(id) {
      const { data: res } = await this.$ajax
        .post(`/data_export_order_mark_check/${id}/`)
        .catch(() => {
          return this.$notify.error({
            title: "错误",
            message: "发起请求失败",
          });
        });
      if (res.msg !== "success") return this.$message.error(res.msg);
      await this.get_workorder();
    },
  },
};
</script>

<style lang="less" scoped>
.el-card {
  margin-top: 20px;
  min-height: 630px;
}
</style>
<style>
.steps_class .el-step__title {
  font-size: 10px;
  line-height: 38px;
}

.iconfon {
  font-size: 11px;
  width: 18px;
  height: 18px;
}

.el-pagination {
  margin-top: 20px;
}

.el-step__icon.is-icon {
  width: 20px !important;
}

.el-step__icon-inner[class*="el-icon"]:not(.is-status) {
  color: #67c23a;
}

.el-step__head.is-finish {
  height: 24px !important;
  color: #67c23a !important;
}

.el-step__title.is-finish {
  height: 37.6px !important;
  color: #67c23a !important;
}
</style>
