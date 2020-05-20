const status = ['关闭', '运行中', '已上线', '异常'];
let tableListDataSource = [];

for (let i = 0; i < 20; i += 1) {
  tableListDataSource.push({
    key: i,
    reportNumber:'CDTxxtweds'+i,
    packageFlg: '是',
    packagePrice: '20'+i,
    truckNumber: '苏5364'+i,
    driver: '驾驶员'+i,
    client: '我是客户'+i,
    goodsType: '我是货物类型'+i,
    
    startPlace: '始发地'+i,
    endPlace: '目的地'+i,
    price: '150'+i,
    realCarry: '45'+i,
    beginDate: '2020-04-11',
    endDate: '2020-04-18',
    cost: '15608',
    expensens: '5608',
    profit: '10000',
    
    createDate: '2020-04-10 15:08',
  });
}

export default {

  'POST  /api/orderReceipt/getOrderReceiptDispatchInfo':  {
    data: [
      {
        title: '基本信息',
        defaultshow: true,
        items: [
          {
            formItemType: 'SELECT',
            labelcol: 6,
            colSpan: 1,
            fieldcol: 11,
            viewAttr: 1,
            options: [
              {
                disabled: false,
                key: '0',
                selected: true,
                showname: '客户1',
                visible: true,
              },
              {
                disabled: false,
                key: '1120',
                selected: false,
                showname: '客户2',
                visible: true,
              },
              {
                disabled: false,
                key: '1121',
                selected: false,
                showname: '客户3',
                visible: true,
              },
              {
                disabled: false,
                key: '1122',
                selected: false,
                showname: '客户4',
                visible: true,
              },
            ],
            conditionType: 'SELECT',
            rules: [{ required: true, message: '请填写客户' }],
            label: '客户',
            domkey: ['client'],
            values:'0'
          },
          {
            formItemType: 'SELECT',
            labelcol: 6,
            colSpan: 1,
            fieldcol: 11,
            viewAttr: 1,
            options: [
              {
                disabled: false,
                key: '0',
                selected: true,
                showname: '货物类型1',
                visible: true,
              },
              {
                disabled: false,
                key: '1120',
                selected: false,
                showname: '货物类型2',
                visible: true,
              },
              {
                disabled: false,
                key: '1121',
                selected: false,
                showname: '货物类型3',
                visible: true,
              },
              {
                disabled: false,
                key: '1122',
                selected: false,
                showname: '货物类型4',
                visible: true,
              },
            ],
            conditionType: 'SELECT',
            rules: [{ required: true, message: '请填写客户' }],
            label: '货物类型',
            domkey: ['client_1'],
            values:'0,1120'
          },
          {
            formItemType: 'DATEPICKER',
            labelcol: 6,
            colSpan: 1,
            fieldcol: 11,
            viewAttr: 1,
            conditionType: 'DATEPICKER',
            rules: [{ required: true, message: '请填写出发时间' }],
            label: '出发时间',
            value: '',
            otherParams:{
              showTime: false,
            },
            domkey: ['beginDate'],
            values:'2020-04-08'
          },
          {
            formItemType: 'INPUT',
            labelcol: 6,
            colSpan: 1,
            fieldcol: 11,
            viewAttr: 1,
            conditionType: 'INPUT',
            label: '是否包车',
            hasBorder: true,
            value: '',
            domkey: ['packageFlg'],
            values:'是'
          },
          {
            formItemType: 'INPUTNUMBER',
            labelcol: 6,
            colSpan: 1,
            fieldcol: 11,
            viewAttr: 1,
            conditionType: 'INPUTNUMBER',
            label: '包车总价',
            hasBorder: true,
            value: '',
            domkey: ['packagePrice'],
            values:'12548'
          },
          {
            formItemType: 'CHECKBOXGROUP',
            labelcol: 6,
            colSpan: 1,
            fieldcol: 11,
            viewAttr: 1,
            options: [
              { label: '个人', value: '0',disabled :false },
              { label: '伙伴', value: '1' ,disabled :false},
            ],
            conditionType: 'CHECKBOXGROUP',
            rules: [{ required: true, message: '请填写分配状态' }],
            label: '分配状态',
            domkey: ['truckPart'],
            values:'0'
          },
          {
            formItemType: 'SELECT',
            labelcol: 6,
            colSpan: 1,
            fieldcol: 11,
            viewAttr: 1,
            options: [
              {
                disabled: false,
                key: '1',
                selected: true,
                showname: '车牌号1',
                visible: true,
              },
              {
                disabled: false,
                key: '2',
                selected: false,
                showname: '车牌号2',
                visible: true,
              },
              {
                disabled: false,
                key: '3',
                selected: false,
                showname: '车牌号3',
                visible: true,
              },
              {
                disabled: false,
                key: '4',
                selected: false,
                showname: '车牌号4',
                visible: true,
              },
            ],
            conditionType: 'SELECT',
            rules: [{ required: true, message: '请填写车牌号' }],
            label: '车牌号',
            domkey: ['truckNumber'],
            values:'4'
          },//车牌号
          {
            formItemType: 'SELECT',
            labelcol: 6,
            colSpan: 1,
            fieldcol: 11,
            viewAttr: 1,
            options: [
              {
                disabled: false,
                key: '0',
                selected: true,
                showname: '司机1',
                visible: true,
              },
              {
                disabled: false,
                key: '1120',
                selected: false,
                showname: '司机2',
                visible: true,
              },
              {
                disabled: false,
                key: '1121',
                selected: false,
                showname: '司机3',
                visible: true,
              },
              {
                disabled: false,
                key: '1122',
                selected: false,
                showname: '司机4',
                visible: true,
              },
            ],
            conditionType: 'SELECT',
            rules: [{ required: true, message: '请填写客户' }],
            label: '司机',
            domkey: ['driver'],
            values:'0'
          },
        ],
      },
      {
        title: '货物详细',
        defaultshow: true,
        items: [
          {
            formItemType: 'SELECT',
            labelcol: 6,
            colSpan: 1,
            fieldcol: 11,
            viewAttr: 1,
            options: [
              {
                disabled: false,
                key: '0',
                selected: true,
                showname: '货物类型1',
                visible: true,
              },
              {
                disabled: false,
                key: '1120',
                selected: false,
                showname: '货物类型2',
                visible: true,
              },
              {
                disabled: false,
                key: '1121',
                selected: false,
                showname: '货物类型3',
                visible: true,
              },
              {
                disabled: false,
                key: '1122',
                selected: false,
                showname: '货物类型4',
                visible: true,
              },
            ],
            conditionType: 'SELECT',
            rules: [{ required: true, message: '请填写客户' }],
            label: '货物类型',
            domkey: ['goodsType_1'],
            values:'0'
          },
          {
            formItemType: 'INPUT',
            labelcol: 6,
            colSpan: 1,
            fieldcol: 11,
            viewAttr: 1,
            domkey: ['startPlace_1'],
            conditionType: "INPUT",
            formItemType: "INPUT",
            rules: [{ required: true, message: '请填写始发地' }],
            label: '始发地',
            values: '上海_1',
          },
          {
            formItemType: 'INPUT',
            labelcol: 6,
            colSpan: 1,
            fieldcol: 11,
            viewAttr: 1,
            domkey: ['endPlace_1'],
            conditionType: "INPUT",
            formItemType: "INPUT",
            rules: [{ required: true, message: '请填目的地' }],
            label: '目的地',
            values: '苏州_1',
          },
          {
            labelcol: 6,
            colSpan: 1,
            fieldcol: 11,
            viewAttr: 1,
            domkey: ['invoiceFlg_1'],
            conditionType: "CHECKBOX",
            formItemType: "CHECKBOX",
            label: '开票',
            values: true,
          },
          {
            labelcol: 6,
            colSpan: 1,
            fieldcol: 11,
            viewAttr: 1,
            domkey: ['price_1'],
            conditionType: "INPUTNUMBER",
            formItemType: "INPUTNUMBER",
            label: '单价',
            values: 50,
          },
          {
            labelcol: 6,
            colSpan: 1,
            fieldcol: 11,
            viewAttr: 3,
            domkey: ['realCarry_1'],
            conditionType: "INPUTNUMBER",
            formItemType: "INPUTNUMBER",
            label: '重量',
            values: 60,
          },
        ],
      },
      {
        title: '费用计算',
        defaultshow: true,
        col:3,
        items: [
          {
            labelcol: 6,
            colSpan: 1,
            fieldcol: 11,
            viewAttr: 3,
            domkey: ['expensens'],
            conditionType: "INPUTNUMBER",
            formItemType: "INPUTNUMBER",
            label: '运费',
            values: 5000,
          },
          {
            labelcol: 6,
            colSpan: 1,
            fieldcol: 11,
            viewAttr: 3,
            domkey: ['cost'],
            conditionType: "INPUTNUMBER",
            formItemType: "INPUTNUMBER",
            label: '费用',
            values: 5000,
          },
          {
            labelcol: 6,
            colSpan: 1,
            fieldcol: 11,
            viewAttr: 3,
            domkey: ['profit'],
            conditionType: "INPUTNUMBER",
            formItemType: "INPUTNUMBER",
            label: '盈利',
            values: 5000,
          },
        ],
      },
      {
        title: '订单回执信息',
        defaultshow: true,
        items: [
          {
            formItemType: 'DATEPICKER',
            labelcol: 6,
            colSpan: 1,
            fieldcol: 11,
            viewAttr: 3,
            conditionType: 'DATEPICKER',
            rules: [{ required: true, message: '请填写到达时间' }],
            label: '到达时间',
            value: '',
            otherParams:{
              showTime: false,
            },
            domkey: ['endDate'],
            values:'2020-04-08'
          },
          {
            labelcol: 6,
            colSpan: 1,
            fieldcol: 11,
            viewAttr: 3,
            domkey: ['settlement'],
            conditionType: "CHECKBOX",
            formItemType: "CHECKBOX",
            label: '是否结算运费',
            values: 1,
          }
        ]
      },
      {
        title: '费用详细',
        defaultshow: true,
        items: [
          {
            labelcol: 6,
            colSpan: 1,
            fieldcol: 11,
            viewAttr: 3,
            domkey: ['oilFee'],
            conditionType: "INPUTNUMBER",
            formItemType: "INPUTNUMBER",
            label: '油费',
            values: 5000,
          },
          {
            labelcol: 6,
            colSpan: 1,
            fieldcol: 11,
            viewAttr: 3,
            domkey: ['tollFee'],
            conditionType: "INPUTNUMBER",
            formItemType: "INPUTNUMBER",
            label: '过路费',
            values: 5000,
          },
          {
            labelcol: 6,
            colSpan: 1,
            fieldcol: 11,
            viewAttr: 3,
            domkey: ['repairFee'],
            conditionType: "INPUTNUMBER",
            formItemType: "INPUTNUMBER",
            label: '修车费',
            values: 5000,
          },
          {
            labelcol: 6,
            colSpan: 1,
            fieldcol: 11,
            viewAttr: 3,
            domkey: ['tyreFee'],
            conditionType: "INPUTNUMBER",
            formItemType: "INPUTNUMBER",
            label: '轮胎费',
            values: 5000,
          },
          {
            labelcol: 6,
            colSpan: 1,
            fieldcol: 11,
            viewAttr: 3,
            domkey: ['guideWayFee'],
            conditionType: "INPUTNUMBER",
            formItemType: "INPUTNUMBER",
            label: '带路费',
            values: 5000,
          },
          {
            labelcol: 6,
            colSpan: 1,
            fieldcol: 11,
            viewAttr: 3,
            domkey: ['other'],
            conditionType: "INPUTNUMBER",
            formItemType: "INPUTNUMBER",
            label: '其他',
            values: 5000,
          },
          {
            labelcol: 6,
            colSpan: 1,
            fieldcol: 11,
            viewAttr: 3,
            domkey: ['allowance'],
            conditionType: "INPUTNUMBER",
            formItemType: "INPUTNUMBER",
            label: '补助',
            values: 5000,
          },
          {
            labelcol: 6,
            colSpan: 1,
            fieldcol: 11,
            viewAttr: 3,
            domkey: ['forfeit'],
            conditionType: "INPUTNUMBER",
            formItemType: "INPUTNUMBER",
            label: '罚款',
            values: 5000,
          },
          {
            labelcol: 6,
            colSpan: 1,
            fieldcol: 11,
            viewAttr: 3,
            domkey: ['parts'],
            conditionType: "INPUTNUMBER",
            formItemType: "INPUTNUMBER",
            label: '配件',
            values: 5000,
          },
          {
            labelcol: 6,
            colSpan: 1,
            fieldcol: 11,
            viewAttr: 3,
            domkey: ['breakRulesFee'],
            conditionType: "INPUTNUMBER",
            formItemType: "INPUTNUMBER",
            label: '处理违章',
            values: 5000,
          },
          {
            labelcol: 6,
            colSpan: 1,
            fieldcol: 11,
            viewAttr: 3,
            domkey: ['compensate'],
            conditionType: "INPUTNUMBER",
            formItemType: "INPUTNUMBER",
            label: '赔偿',
            values: 5000,
          },
          {
            labelcol: 6,
            colSpan: 1,
            fieldcol: 11,
            viewAttr: 3,
            domkey: ['remark'],
            conditionType: "INPUT",
            formItemType: "INPUT",
            label: '备注',
            values: 5000,
          },
          {
            labelcol: 6,
            colSpan: 1,
            fieldcol: 11,
            viewAttr: 3,
            domkey: ['carryNumber'],
            conditionType: "INPUT",
            formItemType: "INPUT",
            label: '客户订单编号',
            values: 5000,
          }
        ],
      },
      {
        title: '回执单',
        defaultshow: true,
        items: [
          {
            formItemType: 'UPLOAD',
            labelcol: 6,
            colSpan: 1,
            fieldcol: 11,
            viewAttr: 3,
            conditionType: 'UPLOAD',
            label: '回执单',
            value: '',
            otherParams:{
              showTime: false,
            },
            domkey: ['receiptPic'],
          }
        ]
      },
    ],
  },

  'POST  /api/orderReceipt/getCondition':  {
    data: [
      {
        title: '基本信息',
        defaultshow: true,
        items: [
          {
            formItemType: 'SELECT',
            hasAddBtn: true,
            labelcol: 6,
            colSpan: 1,
            fieldcol: 11,
            viewAttr: 3,
            options: [
              {
                disabled: false,
                key: '0',
                selected: false,
                showname: '未分配',
                visible: true,
              },
              {
                disabled: false,
                key: '1',
                selected: false,
                showname: '已分配',
                visible: true,
              },
              {
                disabled: false,
                key: '2',
                selected: false,
                showname: '已删除',
                visible: true,
              },
              {
                disabled: false,
                key: '3',
                selected: true,
                showname: '全部',
                visible: true,
              },
            ],
            conditionType: 'SELECT',
            label: '状态',
            domkey: ['orderStatus'],
          },
          {
            formItemType: 'SELECT',
            hasAddBtn: true,
            labelcol: 6,
            colSpan: 1,
            fieldcol: 11,
            viewAttr: 3,
            options: [
              {
                disabled: false,
                key: '0',
                selected: true,
                showname: '客户1',
                visible: true,
              },
              {
                disabled: false,
                key: '1120',
                selected: false,
                showname: '客户2',
                visible: true,
              },
              {
                disabled: false,
                key: '1121',
                selected: false,
                showname: '客户3',
                visible: true,
              },
              {
                disabled: false,
                key: '1122',
                selected: false,
                showname: '客户4',
                visible: true,
              },
            ],
            conditionType: 'SELECT',
            label: '客户',
            domkey: ['client'],
          },
          {
            formItemType: 'SELECT',
            hasAddBtn: true,
            labelcol: 6,
            colSpan: 1,
            fieldcol: 11,
            viewAttr: 3,
            options: [
              {
                disabled: false,
                key: '0',
                selected: true,
                showname: '货物类型1',
                visible: true,
              },
              {
                disabled: false,
                key: '1120',
                selected: false,
                showname: '货物类型2',
                visible: true,
              },
              {
                disabled: false,
                key: '1121',
                selected: false,
                showname: '货物类型3',
                visible: true,
              },
              {
                disabled: false,
                key: '1122',
                selected: false,
                showname: '货物类型4',
                visible: true,
              },
            ],
            conditionType: 'SELECT',
            label: '货物类型',
            domkey: ['goodsType'],
          },
          {
            formItemType: 'DATE',
            labelcol: 6,
            colSpan: 1,
            fieldcol: 11,
            viewAttr: 3,
            conditionType: 'DATE',
            label: '出发时间',
            value: '',
            otherParams:{
              showTime: false,
            },
            domkey: ['timeSag','beginDate'],
          }
        ],
      },
    ]
  
  },

  'POST  /api/orderReceipt/getTableInfoList':  {
    columns: [
      {
        title: '出车编号',
        dataIndex: 'reportNumber',
        key: 'reportNumber',
        width: '8%',
      },
      {
        title: '包车',
        dataIndex: 'packageFlg',
        key: 'packageFlg',
        width: '5%',
      },
      {
        title: '包车价格',
        dataIndex: 'packagePrice',
        key: 'packagePrice',
        sorter: true,
        width: '5%',
        // align: 'right',
        // needTotal: true,
      },
      {
        title: '车牌',
        dataIndex: 'truckNumber',
        key: 'truckNumber',
        width: '5%',
      },
      {
        title: '驾驶员',
        dataIndex: 'driver',
        key: 'driver',
        sorter: true,
        width: '5%',
      },
      {
        title: '客户',
        dataIndex: 'client',
        key: 'client',
        sorter: true,
        width: '10%',
      },
      {
        title: '货物类型',
        dataIndex: 'goodsType',
        key: 'goodsType',
        sorter: true,
        width: '10%',
      },
      {
        title: '始发地',
        dataIndex: 'startPlace',
        key: 'startPlace',
        sorter: true,
        width: '10%',
      },
      {
        title: '目的地',
        dataIndex: 'endPlace',
        key: 'endPlace',
        sorter: true,
        width: '10%',
      },
      {
        title: '单价',
        dataIndex: 'price',
        key: 'price',
        sorter: true,
        width: '5%',
      },
      {
        title: '重量',
        dataIndex: 'realCarry',
        key: 'realCarry',
        sorter: true,
        width: '5%',
      },
      {
        title: '出发时间',
        dataIndex: 'beginDate',
        key: 'beginDate',
        sorter: true,
        width: '7%',
      },
      {
        title: '到达时间',
        dataIndex: 'endDate',
        key: 'endDate',
        sorter: true,
        width: '7%',
      },
      {
        title: '总费用',
        dataIndex: 'cost',
        key: 'cost',
        sorter: true,
        width: '5%',
      },
      {
        title: '运费',
        dataIndex: 'expensens',
        key: 'expensens',
        sorter: true,
        width: '5%',
      },
      {
        title: '利润',
        dataIndex: 'profit',
        key: 'profit',
        sorter: true,
        width: '5%',
      }
    ],
    data: {
      list: tableListDataSource,
      pagination: {
        total: 10,
      },
    }
  },

  'POST  /api/orderReceipt/updateOrderReceipt':  {
    status:true,
    id:1
  },

  'POST  /api/orderReceipt/deleteOrderReceipt':  {
    status:true,
  },
  
};


