const status = ['关闭', '运行中', '已上线', '异常'];
let tableListDataSource = [];

for (let i = 0; i < 20; i += 1) {
  tableListDataSource.push({
    key: i,
    goodsType: '我是货物类型'+i,
    client: '我是客户'+i,
    startPlace: '始发地'+i,
    endPlace: '目的地'+i,
    price: '150'+i,
    realCarry: '45'+i,
    beginDate: '2020-04-11',
    packageFlg: '是',
    createDate: '2020-04-10 15:08',
  });
}

export default {

  'POST  /api/orderApportion/getOrderApportionFields':  {
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
            value:'0'
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
            value:'2020-04-08'
          },
          {
            formItemType: 'CHECKBOX',
            labelcol: 6,
            colSpan: 1,
            fieldcol: 11,
            viewAttr: 1,
            conditionType: 'CHECKBOX',
            label: '是否包车',
            hasBorder: true,
            value: '',
            domkey: ['packageFlg'],
            value:true
          },
        ],
      },
      {
        title: '货物信息',
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
            domkey: ['client_1'],
            value:'0'
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
            value: '上海_1',
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
            value: '苏州_1',
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
            value: true,
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
            value: 50,
          },
          {
            labelcol: 6,
            colSpan: 1,
            fieldcol: 11,
            viewAttr: 1,
            domkey: ['realCarry_1'],
            conditionType: "INPUTNUMBER",
            formItemType: "INPUTNUMBER",
            label: '重量',
            value: 60,
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
            domkey: ['client_2'],
            value:'0'
          },
          {
            formItemType: 'INPUT',
            labelcol: 6,
            colSpan: 1,
            fieldcol: 11,
            viewAttr: 1,
            domkey: ['startPlace_2'],
            conditionType: "INPUT",
            formItemType: "INPUT",
            rules: [{ required: true, message: '请填写始发地' }],
            label: '始发地',
            value: '上海_1',
          },
          {
            formItemType: 'INPUT',
            labelcol: 6,
            colSpan: 1,
            fieldcol: 11,
            viewAttr: 1,
            domkey: ['endPlace_2'],
            conditionType: "INPUT",
            formItemType: "INPUT",
            rules: [{ required: true, message: '请填目的地' }],
            label: '目的地',
            value: '苏州_1',
          },
          {
            labelcol: 6,
            colSpan: 1,
            fieldcol: 11,
            viewAttr: 1,
            domkey: ['invoiceFlg_2'],
            conditionType: "CHECKBOX",
            formItemType: "CHECKBOX",
            label: '开票',
            value: true,
          },
          {
            labelcol: 6,
            colSpan: 1,
            fieldcol: 11,
            viewAttr: 1,
            domkey: ['price_2'],
            conditionType: "INPUTNUMBER",
            formItemType: "INPUTNUMBER",
            label: '单价',
            value: 50,
          },
          {
            labelcol: 6,
            colSpan: 1,
            fieldcol: 11,
            viewAttr: 1,
            domkey: ['realCarry_2'],
            conditionType: "INPUTNUMBER",
            formItemType: "INPUTNUMBER",
            label: '重量',
            value: 60,
          },
        ],
      },
    ],
    initFormFields:{
      goodsType:{
        formItemType: 'SELECT',
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
        rules: [{ required: true, message: '请填写客户' }],
        label: '货物类型',
        domkey: ['goodsType'],
      },//货物类型
      truckPart:{
        formItemType: 'CHECKBOXGROUP',
        labelcol: 6,
        colSpan: 1,
        fieldcol: 11,
        viewAttr: 3,
        options: [
          { label: '个人', value: '0',disabled :false },
          { label: '伙伴', value: '1' ,disabled :false},
        ],
        conditionType: 'CHECKBOXGROUP',
        rules: [{ required: true, message: '请填写分配状态' }],
        label: '分配状态',
        domkey: ['truckPart'],
      },//分配状态
      truckNumber:{
        formItemType: 'SELECT',
        labelcol: 6,
        colSpan: 1,
        fieldcol: 11,
        viewAttr: 3,
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
        rules: [{ required: true, message: '请填写货物类型' }],
        label: '车牌号',
        domkey: ['truckNumber'],
      },//车牌号
      driver:{
        formItemType: 'SELECT',
        labelcol: 6,
        colSpan: 1,
        fieldcol: 11,
        viewAttr: 3,
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
      },// 司机
      partner:{
        formItemType: 'INPUT',
        labelcol: 6,
        colSpan: 1,
        fieldcol: 11,
        viewAttr: 3,
        domkey: ['partner'],
        conditionType: "INPUT",
        formItemType: "INPUT",
        rules: [{ required: true, message: '请填写伙伴' }],
        label: '伙伴',
      },//伙伴
      partnerCarry:{
        formItemType: 'INPUT',
        labelcol: 6,
        colSpan: 1,
        fieldcol: 11,
        viewAttr: 3,
        domkey: ['partnerCarry'],
        conditionType: "INPUT",
        formItemType: "INPUT",
        rules: [{ required: true, message: '请填写重量' }],
        label: '重量',
      },//重量
      partnerPrice:{
        formItemType: 'INPUT',
        labelcol: 6,
        colSpan: 1,
        fieldcol: 11,
        viewAttr: 3,
        domkey: ['partnerPrice'],
        conditionType: "INPUT",
        formItemType: "INPUT",
        rules: [{ required: true, message: '请填写单价' }],
        label: '单价',
      },//单价
    },
    initDatas:[
      {
        goodsType:'0',
        truckPart:'0',
        truckNumber:'4',
        driver:'0',
        partner:'sss',
        partnerCarry:20,
        partnerPrice:10,
      },
      {
        goodsType:'0',
        truckPart:'0',
        truckNumber:'4',
        driver:'0',
        partner:'sss',
        partnerCarry:20,
        partnerPrice:10,
      },
    ]
  },

  'POST  /api/orderApportion/getCondition':  {
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

  'POST  /api/orderApportion/getTableInfoList':  {
    columns: [
      {
        title: '客户',
        dataIndex: 'client',
        key: 'client',
        width: '10%',
      },
      {
        title: '货物类型',
        dataIndex: 'goodsType',
        key: 'goodsType',
        width: '10%',
      },
      {
        title: '始发地',
        dataIndex: 'startPlace',
        key: 'startPlace+',
        sorter: true,
        width: '15%',
        // align: 'right',
        // needTotal: true,
      },
      {
        title: '目的地',
        dataIndex: 'endPlace',
        key: 'endPlace',
        width: '15%',
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
        title: '出发日期',
        dataIndex: 'beginDate',
        key: 'beginDate',
        sorter: true,
        width: '10%',
      },
      {
        title: '是否包车',
        dataIndex: 'packageFlg',
        key: 'packageFlg',
        sorter: true,
        width: '5%',
      },
      {
        title: '创建日期',
        dataIndex: 'createDate',
        key: 'createDate',
        sorter: true,
        width: '10%',
      }
    ],
    data: {
      list: tableListDataSource,
      pagination: {
        total: 10,
      },
    }
  },

  'POST  /api/orderApportion/addOrderTaker':  {
    status:true,
    id:1
  },

  'POST  /api/orderApportion/updateOrderTaker':  {
    status:true,
    id:1
  },

  'POST  /api/orderApportion/deleteOrderTaker':  {
    status:true,
  },
  
};


