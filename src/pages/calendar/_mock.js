const status = ['关闭', '运行中', '已上线', '异常'];
let tableListDataSource = [];

for (let i = 0; i < 20; i += 1) {
  tableListDataSource.push({
    key: i,
    goodsTypeShow: '我是货物类型'+i,
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
  'POST  /api/orderTaker/getOrderTakersInfoFields':  {
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
          },
          {
            formItemType: 'DATEPICKER',
            labelcol: 6,
            colSpan: 1,
            fieldcol: 11,
            viewAttr: 3,
            conditionType: 'DATEPICKER',
            rules: [{ required: true, message: '请填写出发时间' }],
            label: '出发时间',
            value: '',
            otherParams:{
              showTime: false,
            },
            domkey: ['beginDate'],
          },
          {
            formItemType: 'CHECKBOX',
            labelcol: 6,
            colSpan: 1,
            fieldcol: 11,
            viewAttr: 2,
            conditionType: 'CHECKBOX',
            label: '是否包车',
            hasBorder: true,
            value: '',
            domkey: ['packageFlg'],
          },
        ],
      },
    ],
    editdatas : [
      {
        key: '0',
        goodsType: '1120',
        startPlace: '上海',
        endPlace: '苏州',
        invoiceFlg: 1,
        price: 10,
        realCarry: 50,
      }
    ],
    editcolumns : [
      {
        title: '货物类型',
        dataIndex: 'goodsType',
        width: '20%',
        editable: true,
        cell:{
          domkey: ['goodsType'],
          formItemType: 'SELECT',
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
          rules: [{ required: true, message: '请填写货物类型' }],
        }
      },
      {
        title: '始发地',
        dataIndex: 'startPlace',
        width: '20%',
        editable: true,
        cell:{
          domkey: ['startPlace'],
          conditionType: "INPUT",
          formItemType: "INPUT",
          rules: [{ required: true, message: '请填写始发地' }],
        }
      },
      {
        title: '目的地',
        dataIndex: 'endPlace',
        width: '20%',
        editable: true,
        cell:{
          domkey: ['endPlace'],
          conditionType: "INPUT",
          formItemType: "INPUT",
          rules: [{ required: true, message: '请填写目的地' }],
        }
      },
      {
        title: '票据',
        dataIndex: 'invoiceFlg',
        width: '10%',
        editable: true,
        cell:{
          domkey: ['invoiceFlg'],
          conditionType: "CHECKBOX",
          formItemType: "CHECKBOX",
        }
      },
      {
        title: '单价',
        dataIndex: 'price',
        width: '15%',
        editable: true,
        cell:{
          domkey: ['price'],
          conditionType: "INPUTNUMBER",
          formItemType: "INPUTNUMBER",
          rules: [{ type:'number',required: true, message: '请填写单价' }],
        }
      },
      {
        title: '重量',
        dataIndex: 'realCarry',
        width: '15%',
        editable: true,
        cell:{
          domkey: ['realCarry'],
          conditionType: "INPUTNUMBER",
          formItemType: "INPUTNUMBER",
          rules: [{ type:'number',required: true, message: '请填写重量' }],
        }
      }
      
    ]

  
  },

  'POST  /api/orderTaker/getCondition':  {
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

  'POST  /api/clientInfor/getTableInfoList':  {
    columns: [
      {
        title: '客户',
        dataIndex: 'client',
        key: 'client',
        width: '10%',
      },
      {
        title: '货物类型',
        dataIndex: 'goodsTypeShow',
        key: 'goodsTypeShow',
        width: '10%',
      },
      {
        title: '始发地',
        dataIndex: 'startPlace',
        key: 'startPlace+',
        sorter: true,
        width: '15%',
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
        needTotal: true,
      },
      {
        title: '重量',
        dataIndex: 'realCarry',
        key: 'realCarry',
        sorter: true,
        width: '5%',
        needTotal: true,
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

  'POST  /api/orderTaker/addOrderTaker':  {
    status:true,
    id:1
  },

  'POST  /api/orderTaker/updateOrderTaker':  {
    status:true,
    id:1
  },

  'POST  /api/orderTaker/deleteOrderTaker':  {
    status:true,
  },
  
};


