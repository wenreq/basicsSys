<template>
  <div>
    <div class="searchContainer">
      <Collapse v-model="openValue">
        <Panel name="1">
            查询条件
            <div slot="content">
              <Form ref="formCustom" :model="formCustom" :label-width="90">
                <Row>
                  <Col span="6">
                    <FormItem label="区域：" prop="area">
                      <Cascader v-model="formCustom.area" :data="areaDate" :load-data="loadData" change-on-select @on-change='changeArea'></Cascader>
                    </FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem label="小区：" prop="estateId">
                      <Select clearable v-model="formCustom.estateId">
                        <Option v-for="item in streetDateList" :value="item.id" :key="item.id">{{ item.housingEstate }}</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem label="手机号：" prop="phone">
                      <Input clearable type="text" placeholder="请输入手机号" v-model="formCustom.phone" number></Input>
                    </FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem label="IC卡号：" prop="icNo">
                      <Input clearable type="text" placeholder="请输入IC卡号" v-model="formCustom.icNo" number></Input>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="6">
                    <FormItem label="是否办卡：" prop="isflag">
                      <Select clearable v-model="formCustom.isflag">
                        <Option v-for="item in isFullPayments" :value="item.id" :key="item.id">{{ item.name }}</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem label="会员状态：" prop="lock">
                      <Select clearable v-model="formCustom.lock">
                        <Option v-for="item in lockList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem label="注册来源：" prop="client">
                      <!-- <Input clearable type="text" v-model="formCustom.client" number></Input> -->
                      <Select clearable v-model="formCustom.client">
                        <Option value="全部" >全部</Option>
                        <Option value="0" >APP注册</Option>
                        <Option value="1" >IC开卡</Option>
                        <Option value="2" >设备</Option>
                        <Option value="3" >小程序</Option>
                        <Option value="4" >数据导入</Option>
                        <Option value="5" >客服录入</Option>
                        <Option value="6" >小哥录入</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem label="注册时间：" prop="time">
                      <DatePicker v-model="formCustom.time" :value="formCustom.time" format="yyyy-MM-dd" type="daterange" placement="bottom-end" placeholder="请选择"></DatePicker>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <div style="text-align:right;">
                    <Button type="primary" @click="handleSubmit('formCustom')">查询</Button>
                    <Button @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
                  </div>
                </Row>
              </Form>
            </div>
        </Panel>
      </Collapse>
    </div>
    <Table :loading="loading" border ref="selection" :columns="columns" :data="dataList">
      <template slot-scope="{ row }" slot="originName">
          <span style="font-weight: 600;">{{ row.originName }}</span>
      </template>
      <template slot-scope="{ row }" slot="isLock">
        <Tag color="success" v-if="row.isLock === 0">启用</Tag>
        <Tag color="error" v-else>禁用</Tag>
      </template>
      <template slot-scope="{ row, index }" slot="action">
          <Button type="default" size="small" style="margin-right: 5px" @click="show(row)">查看</Button>
          <Button type="primary" size="small" @click="edit(index)">编辑</Button>
      </template>
    </Table>
    <wen-page :totalCount="totalCount" @pageIndex="handlePageIndex" @pageSize="handlePageSize"></wen-page>
    <!-- <div style="text-align:center;margin:15px 0">
      <Page @on-change="changePage" @on-page-size-change="changePageSize" :total="totalCount" show-total show-elevator show-sizer />
    </div> -->
  </div>
</template>

<script>
import {areaList, getEstateByStreet} from '@/request/Api/common.js'
import {getList} from '@/request/Api/member.js'
import wenPage from '@/components/wenPage'

export default {
  components: {
    wenPage
  },
  data () {
    return {
      openValue: '1',
      columns: [
        {
          title: '手机号',
          key: 'cellPhone'
        },
        {
          title: 'IC卡号',
          key: 'carNum'
        },
        {
          title: '注册来源',
          // key: 'originName',
          slot: 'originName'
        },
        {
          title: '注册时间',
          key: 'createTime',
          width: 182
        },
        {
          title: '绑卡时间',
          key: 'bindDate',
          width: 182
        },
        {
          title: '小区',
          key: 'estateName'
        },
        {
          title: '可用余额',
          key: 'catCoin'
        },
        {
          title: '可用环保值',
          key: 'balanceEnviron'
        },
        {
          title: '会员状态',
          key: 'isLock',
          slot: 'isLock'
        },
        {
          title: '操作',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      formCustom: {
        area: [],
        estateId: '',
        phone: '',
        icNo: '',
        isflag: '全部',
        lock: '全部',
        client: '全部',
        time: ''
      },
      areaDate: [],
      dataList: [],
      loading: false,
      streetDateList: [],
      lockList: [
        {
          id: '全部',
          name: '全部'
        },
        {
          id: 0,
          name: '启用'
        },
        {
          id: 1,
          name: '禁用'
        }
      ],
      isFullPayments: [
        {
          id: '全部',
          name: '全部'
        },
        {
          id: 1,
          name: '是'
        },
        {
          id: 2,
          name: '否'
        }
      ],
      selectedData: [],
      totalCount: 0,
      page: 1,
      pageSize: 10
    }
  },
  created () {
    this.areaList()
    this.getParms()
    this.changeArea([], [])
  },
  methods: {
    getParms () {
      this.getList({
        page: this.page,
        pageSize: this.pageSize
      })
    },
    handlePageSize (pageSize) {
      this.pageSize = pageSize
      this.getParms()
    },
    handlePageIndex (pageIndex) {
      this.page = pageIndex
      this.getParms()
    },
    // changePage (index) {
    //   this.page = index
    //   this.getParms()
    // },
    // changePageSize (size) {
    //   this.pageSize = size
    //   this.getParms()
    // },
    getList (params) {
      this.loading = true
      getList(params).then(res => {
        this.dataList = res.result.data
        this.totalCount = res.result.totalCount
        this.loading = false
      })
    },
    areaList () {
      let params = {
        id: '',
        layer: 2
      }
      areaList(params).then(res => {
        if (res) {
          this.areaDate = this.tansFormArea(res.result.data, 2)
        }
      })
    },
    tansFormArea (list, layer) {
      list.forEach(element => {
        element['value'] = element.id
        element['label'] = element.name
        if (layer < 4) {
          element['children'] = []
          element['loading'] = false
        }
      })
      return list
    },
    handleSelectAll (lock) {
      this.$refs.selection.selectAll(lock)
    },
    show (item) {
      console.log(item)
    },
    edit (index) {
      console.log(index)
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          let params = {}
          if (this.formCustom.area.length !== 0) {
            if (this.formCustom.area[0]) {
              params.province = this.selectedData[0].name
            }
            if (this.formCustom.area[1]) {
              params.city = this.selectedData[1].name
            }
            if (this.formCustom.area[2]) {
              params.area = this.selectedData[2].name
            }
          }
          if (this.formCustom.estateId) {
            params.estateId = this.formCustom.estateId
          }
          if (this.formCustom.isflag !== '全部') {
            params.isflag = this.formCustom.isflag
          }
          if (this.formCustom.lock !== '全部') {
            params.lock = this.formCustom.lock
          }
          if (this.formCustom.client !== '全部') {
            params.client = this.formCustom.client
          }
          if (this.formCustom.phone) {
            params.phone = this.formCustom.phone
          }
          if (this.formCustom.icNo) {
            params.icNo = this.formCustom.icNo
          }
          if (this.formCustom.time && this.formCustom.time[0] && this.formCustom.time[0]) {
            let start = new Date(this.formCustom.time[0])
            let end = new Date(this.formCustom.time[1])
            params.startTime = start.getFullYear() + '-' + this.prestion((start.getMonth() + 1)) + '-' + this.prestion(start.getDate())
            params.endTime = end.getFullYear() + '-' + this.prestion((end.getMonth() + 1)) + '-' + this.prestion(end.getDate())
          }
          this.getList(params)
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    prestion (s) {
      return s < 10 ? '0' + s : s
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    loadData (item, callback) {
      item.loading = true
      debugger
      let params = {
        id: item.value,
        layer: item.layer + 1
      }
      areaList(params).then(res => {
        if (res) {
          this.$set(item, 'children', this.tansFormArea(res.result.data, item.layer + 1))
          item.loading = false
          callback()
        }
      })
    },
    changeArea (value, selectedData) {
      this.selectedData = selectedData
      let params = {
        areaIds: value.join(',')
      }
      getEstateByStreet(params).then(res => {
        if (res) {
          this.streetDateList = res.result
        }
      })
    }
  }
}
</script>

<style scoped>
.searchContainer{
  margin-bottom: 15px;
}
.ivu-date-picker{
  display: block;
}
</style>
