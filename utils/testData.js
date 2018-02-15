//utils/testData.js
var app = getApp()

function getData(url){
  
  var urlarray = url.toString().split("?");
  console.log("urlarray",urlarray);
  var path = urlarray[0];

  switch (path){
    //获取订单详细信息（顾客）
    case app.globalData.server + '/getOrderDetail':
      return {
        'orderNo':'WD101238972187162471',
        'createTime':new Date(),
        'orderTime':new Date(),
        'cartList': [{ name: "琥珀珍珠奶茶（中杯）", orderNum: 10, number: 1, sum: 10 }, 
            { name: "琥珀珍珠奶茶（中杯）", orderNum: 10, number: 1, sum: 10 }, 
            { name: "琥珀珍珠奶茶（中杯）", orderNum: 10, number: 1, sum: 10 }, 
            { name: "琥珀珍珠奶茶（中杯）", orderNum: 10, number: 1, sum: 10 }],
        'sumMonney':37,
        'cupNumber':2,
        'takeNo':'TX1224' //取餐码
      };
    //获取订单列表（顾客）
    case app.globalData.server + '/getOrderList':
      return [
        { 'orderNo':'SXD000000000001','orderTime': '2018-02-12 10:00', 'sum': '￥17.00', 'cnt': 1 },
        { 'orderNo': 'SXD000000000333', 'orderTime': '2018-02-13 17:00', 'sum': '￥100.00', 'cnt': 3 },
        { 'orderNo': 'SXD000000000eee2', 'orderTime': '2018-02-14 17:00', 'sum': '￥65.00', 'cnt': 2 },
        { 'orderNo': 'SXD000000000eee2', 'orderTime': '2018-02-14 17:00', 'sum': '￥65.00', 'cnt': 2 }

      ];
    //获取订单统计信息（店员）
    case app.globalData.server + '/getWaiterOrderSts':
      return { 'chked': 20, 'done': 18, 'taked': 16, 'untake': 2 };
    //获取订单列表（店员） 状态:0已确认 1待取餐 2已取餐 3未取餐
    case app.globalData.server + '/getWaiterOrderList':
      return [
        {
          'orderNo': 'C001-180213-001', 'takeNo': 'C001', 'status': '2', 'statusName': '已取餐', 'orderTime': '2018-02-12 10:00', 'sum': '￥17.00', 'customerName': '顾客名称', 'orderTime': '2018-02-02 10:00', 'takeTime': '2018-02-11 16:00', 'memo': '', 'foodList': [{ 'name': '芒果益菌多/中杯', 'cnt': 1, 'price': 17 }
          ]
        },
        {
          'orderNo': 'C001-180213-001', 'takeNo': 'C001', 'status': '3', 'statusName': '未取餐', 'orderTime': '2018-02-12 10:00', 'sum': '￥17.00', 'customerName': '顾客名称', 'orderTime': '2018-02-02 10:00', 'takeTime': '2018-02-11 16:00', 'memo': '', 'foodList': [{ 'name': '芒果益菌多/中杯', 'cnt': 1, 'price': 17 }
          ]
        },
        {
          'orderNo': 'C001-180213-001', 'takeNo': 'C001', 'status': '1', 'statusName': '待取餐', 'orderTime': '2018-02-12 10:00', 'sum': '￥17.00', 'customerName': '顾客名称', 'orderTime': '2018-02-02 10:00', 'takeTime': '2018-02-11 16:00', 'memo': '', 'foodList': [{ 'name': '芒果益菌多/中杯', 'cnt': 1, 'price': 17 }
          ]
        },
        {
          'orderNo': 'C001-180213-001', 'takeNo': 'C001', 'status': '0', 'statusName': '待制作', 'orderTime': '2018-02-12 10:00', 'sum': '￥17.00', 'customerName': '顾客名称', 'orderTime': '2018-02-02 10:00', 'takeTime': '2018-02-11 16:00', 'memo': '', 'foodList': [{ 'name': '芒果益菌多/中杯', 'cnt': 1, 'price': 17 }
          ]
        }
      ];
    //获取订单统计信息（客服） 
    case app.globalData.server + '/getServiceOrderSts':
      return { 'all':50,'unChk':22,'unCancel':2,'chked':21,'canceled':6,};
    //获取订单列表（客服） 状态:0未确认 1已确认 2已取消 opType:0申请确认 1申请取消
    case app.globalData.server + '/getServiceOrderList':
      return [
        {
          'orderNo': 'SXD000000000004', 'status': '0', 'orderTime': '2018-02-12 10:00', 'sum': '￥17.00', 'opName': '申请取消', 'opType': '1', 'customerName': '顾客名称', 'orderTime': '2018-02-02 10:00', 'takeTime': '2018-02-11 16:00', 'memo': '', 'foodList': [{ 'name': '芒果益菌多/中杯', 'cnt': 1, 'price': 17 }
            ]
          } ,
        {
          'orderNo': 'SXD000000000002', 'status': '0', 'orderTime': '2018-02-12 10:00', 'sum': '￥17.00', 'opName': '申请确认', 'opType': '0','customerName': '顾客名称', 'orderTime': '2018-02-02 10:00', 'takeTime': '2018-02-11 16:00', 'memo': '', 'foodList': [{ 'name': '芒果益菌多/中杯', 'cnt': 1, 'price': 17 }
            ]
          },
                  { 'orderNo': 'SXD000000000001','status':'1','orderTime': '2018-02-12 10:00', 'sum': '￥17.00', 'opName':'申请确认','opType':'0', 'customerName': '顾客名称', 'orderTime': '2018-02-02 10:00', 'takeTime': '2018-02-11 16:00', 'memo': '', 'foodList': [{ 'name': '芒果益菌多/中杯', 'cnt': 1, 'price': 17 }, 
            { 'name': '芒果益菌多/中杯', 'cnt': 1, 'price': 17 },
            { 'name': '芒果益菌多/中杯', 'cnt': 1, 'price': 17 }
        ]},
        {
          'orderNo': 'SXD000000000003', 'status': '2', 'orderTime': '2018-02-12 10:00', 'sum': '￥17.00', 'opName': '申请确认', 'opType': '0', 'customerName': '顾客名称', 'orderTime': '2018-02-02 10:00', 'takeTime': '2018-02-11 16:00', 'memo': '', 'foodList': [{ 'name': '芒果益菌多/中杯', 'cnt': 1, 'price': 17 },
            { 'name': '芒果益菌多/中杯', 'cnt': 1, 'price': 17 }
            ]
          } ,
        {
          'orderNo': 'SXD000000000001', 'status': '1', 'orderTime': '2018-02-12 10:00', 'sum': '￥17.00', 'opName': '申请确认', 'opType': '0', 'customerName': '顾客名称', 'orderTime': '2018-02-02 10:00', 'takeTime': '2018-02-11 16:00', 'memo': '', 'foodList': [{ 'name': '芒果益菌多/中杯', 'cnt': 1, 'price': 17 },
          { 'name': '芒果益菌多/中杯', 'cnt': 1, 'price': 17 },
          { 'name': '芒果益菌多/中杯', 'cnt': 1, 'price': 17 }
          ]
        },
        {
          'orderNo': 'SXD000000000003', 'status': '2', 'orderTime': '2018-02-12 10:00', 'sum': '￥17.00', 'opName': '申请确认', 'opType': '0', 'customerName': '顾客名称', 'orderTime': '2018-02-02 10:00', 'takeTime': '2018-02-11 16:00', 'memo': '', 'foodList': [{ 'name': '芒果益菌多/中杯', 'cnt': 1, 'price': 17 },
          { 'name': '芒果益菌多/中杯', 'cnt': 1, 'price': 17 }
          ]
        }
      ];
    //获取取餐二维码（顾客）
    case 'https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode':
      return "../../../images/tmpRQCODE.png";
    //获取订单统计信息（厨师）
    case app.globalData.server + '/getChefOrderSts':
      return { 'all': 100, 'done': 88, 'undo': 16, };
    //获取订单列表（厨师） open:是否展开订单明细 hasMemo：是否有定制
    case app.globalData.server + '/getChefOrders':
      return [{
        "name": "鲜果鲜茶",
        "foods": [{'foodId':1,'open':false,'hasMemo':false,
          "image_url": "https://fuss10.elemecdn.com/1/e1/354946bf21c191e250d2b17dbbdd4jpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
          "name": "法式奶霜草莓果茶/大杯",
          "orderNum": 16,
          "uptime":'2018-02-11 10:00',
          'orderList':[{'orderNo':'C001-180213-001','takeTime':'2018-02-02 02:00','memo':''},
            { 'orderNo': 'C001-180213-001', 'takeTime': '2018-02-02 02:00', 'memo': '' }]
        }, {
            'foodId': 2, 'open': true, 'hasMemo': true,
          "image_url": "https://fuss10.elemecdn.com/d/c2/3c4586c80b9734ac488462e30d3eejpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
          "name": "鲜百香双响炮/大杯",
          "orderNum": 12,
          "uptime": '2018-02-11 10:00',
          'orderList': [{ 'orderNo': 'C001-180213-001', 'takeTime': '2018-02-02 02:00', 'memo': '' },
          { 'orderNo': 'C001-180213-001', 'takeTime': '2018-02-02 02:00', 'memo': '撒旦号丧' }]
          }, {
            'foodId': 3, 'open': false, 'hasMemo': false,
          "image_url": "https://fuss10.elemecdn.com/5/8d/dc459a6278cf2fd87ba1e4291aa7ejpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
          "name": "柠檬霸/大杯",
          "orderNum": 8,
          "uptime": '2018-02-11 10:00',
          'orderList': [{ 'orderNo': 'C001-180213-001', 'takeTime': '2018-02-02 02:00', 'memo': '' },
          { 'orderNo': 'C001-180213-001', 'takeTime': '2018-02-02 02:00', 'memo': '' }]
        }]
      }, {
        "name": "益菌多多",
        "foods": [{
          'foodId': 4, 'open': false, 'hasMemo': false,
          "image_url": "https://fuss10.elemecdn.com/7/f4/bb627b39b80fdb1f2e71239dd33a5jpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
          "name": "葡萄柚益菌多/大杯",
          "orderNum": 2,
          "uptime": '2018-02-11 10:00',
          'orderList': [{ 'orderNo': 'C001-180213-001', 'takeTime': '2018-02-02 02:00', 'memo': '' },
          { 'orderNo': 'C001-180213-001', 'takeTime': '2018-02-02 02:00', 'memo': '' }]
        }, {
            'foodId': 5, 'open': false, 'hasMemo': false,
          "image_url": "https://fuss10.elemecdn.com/0/4a/ff67d5523ad5f91f7497a04cdd8ebjpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
          "name": "芒果益菌多/中杯",
          "orderNum": 1,
          "uptime": '2018-02-11 10:00',
          'orderList': [{ 'orderNo': 'C001-180213-001', 'takeTime': '2018-02-02 02:00', 'memo': '' },
          { 'orderNo': 'C001-180213-001', 'takeTime': '2018-02-02 02:00', 'memo': '' }]
          }, {
            'foodId': 6, 'open': false, 'hasMemo': false,
          "image_url": "https://fuss10.elemecdn.com/1/b0/0f5e7ff9d304eaa0cb4f75239e40ajpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
          "name": "绿茶益菌多/中杯",
          "orderNum": 7,
          "uptime": '2018-02-11 10:00',
          'orderList': [{ 'orderNo': 'C001-180213-001', 'takeTime': '2018-02-02 02:00', 'memo': '' },
          { 'orderNo': 'C001-180213-001', 'takeTime': '2018-02-02 02:00', 'memo': '' }]
        }]
      }, {
        "name": "法式奶霜",
        "foods": [{
          'foodId': 7, 'open': false, 'hasMemo': false,
          "image_url": "https://fuss10.elemecdn.com/1/e1/354946bf21c191e250d2b17dbbdd4jpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
          "name": "法式奶霜草莓果茶/大杯",
          "orderNum": 5,
          "uptime": '2018-02-11 10:00',
          'orderList': [{ 'orderNo': 'C001-180213-001', 'takeTime': '2018-02-02 02:00', 'memo': '' },
          { 'orderNo': 'C001-180213-001', 'takeTime': '2018-02-02 02:00', 'memo': '' }]
        }, {
            'foodId': 8, 'open': false, 'hasMemo': false,
          "image_url": "https://fuss10.elemecdn.com/c/f1/e7d3a34bef76ea0a52107241d6edcjpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
          "name": "17岁轻茶奶霜/大杯",
          "orderNum": 7,
          "uptime": '2018-02-11 10:00',
          'orderList': [{ 'orderNo': 'C001-180213-001', 'takeTime': '2018-02-02 02:00', 'memo': '' },
          { 'orderNo': 'C001-180213-001', 'takeTime': '2018-02-02 02:00', 'memo': '' }]
          }, {
            'foodId': 9, 'open': false, 'hasMemo': false,
            "image_url": "https://fuss10.elemecdn.com/c/f1/e7d3a34bef76ea0a52107241d6edcjpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
            "name": "17岁轻茶奶霜/大杯",
            "orderNum": 10,
            "uptime": '2018-02-11 10:00',
            'orderList': [{ 'orderNo': 'C001-180213-001', 'takeTime': '2018-02-02 02:00', 'memo': '' },
            { 'orderNo': 'C001-180213-001', 'takeTime': '2018-02-02 02:00', 'memo': '' }]
        }, {
            'foodId': 11, 'open': false, 'hasMemo': false,
          "image_url": "https://fuss10.elemecdn.com/c/f1/e7d3a34bef76ea0a52107241d6edcjpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
          "name": "17岁轻茶奶霜/大杯",
          "orderNum": 12,
          "uptime": '2018-02-11 10:00',
          'orderList': [{ 'orderNo': 'C001-180213-001', 'takeTime': '2018-02-02 02:00', 'memo': '' },
          { 'orderNo': 'C001-180213-001', 'takeTime': '2018-02-02 02:00', 'memo': '' }]
          }, {
            'foodId': 13, 'open': false, 'hasMemo': false,
            "image_url": "https://fuss10.elemecdn.com/c/f1/e7d3a34bef76ea0a52107241d6edcjpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
            "name": "17岁轻茶奶霜/大杯",
            "orderNum": 2,
            "uptime": '2018-02-11 10:00',
            'orderList': [{ 'orderNo': 'C001-180213-001', 'takeTime': '2018-02-02 02:00', 'memo': '' },
            { 'orderNo': 'C001-180213-001', 'takeTime': '2018-02-02 02:00', 'memo': '' }]
        }, {
            'foodId': 14, 'open': false, 'hasMemo': false,
          "image_url": "https://fuss10.elemecdn.com/c/f1/e7d3a34bef76ea0a52107241d6edcjpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
          "name": "17岁轻茶奶霜/大杯",
          "orderNum": 4,
          "uptime": '2018-02-11 10:00',
          'orderList': [{ 'orderNo': 'C001-180213-001', 'takeTime': '2018-02-02 02:00', 'memo': '' },
          { 'orderNo': 'C001-180213-001', 'takeTime': '2018-02-02 02:00', 'memo': '' }]
        }]
      }
    ];
    //获取菜单（顾客）
    case app.globalData.server +'/getFoods':
      return [{
        "name": "热销推荐",
        "foods": [{
          "image_url": "https://fuss10.elemecdn.com/c/f1/e7d3a34bef76ea0a52107241d6edcjpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
          "name": "17岁轻茶奶霜（大杯）",
            "price": 3,
        }, {
          "image_url": "https://fuss10.elemecdn.com/d/c2/3c4586c80b9734ac488462e30d3eejpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
          "name": "鲜百香双响炮（大杯）",
          "price": 1
        }, {
          "image_url": "https://fuss10.elemecdn.com/c/8e/04076f034f16c110c9b242e0f0fc3jpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
          "name": "琥珀珍珠奶茶（大杯）",
          "price": 2
        }, {
          "image_url": "https://fuss10.elemecdn.com/c/8e/04076f034f16c110c9b242e0f0fc3jpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
          "name": "琥珀珍珠奶茶（中杯）",
          "price": 4
        }, {
          "image_url": "https://fuss10.elemecdn.com/8/26/2760aa963a181bb4afccda0831ce4jpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
          "name": "香柠咖啡（大杯）",
          "price": 2
        }, {
          "image_url": "https://fuss10.elemecdn.com/b/8f/73c28247fa6c7036a39f577d2c444jpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
          "name": "柠檬椰果养乐多/大杯",
          "price":12
        }, {
          "image_url": "https://fuss10.elemecdn.com/a/1e/6d3db1062f397848b3dc58b9d1862jpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
          "name": "芒果养乐多/大杯",
          "price": 16
        }, {
          "image_url": "https://fuss10.elemecdn.com/5/6b/86c69aa53c630143c551b65e054f1jpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
          "name": "葡萄柚养乐多/大杯",
          "price": 11
        }, {
          "image_url": "https://fuss10.elemecdn.com/0/fc/1c922d576a4484a5eaed9ec53baeajpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
          "name": "绿茶养乐多/大杯",
          "price": 16
        }, {
          "image_url": "https://fuss10.elemecdn.com/6/3a/6fb836e42a3d74d11a53b0aaa5e81jpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
            "name": "加9.9元得冷饮杯",
            "price": 16
        }, {
          "image_url": "https://fuss10.elemecdn.com/0/6f/2c84800878263ed2e21b3b9016cdfjpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
          "name": "红茶拿铁/大杯",
          "price": 16
        }, {
          "image_url": "https://fuss10.elemecdn.com/7/be/13876535e55dae0378463b204ead1jpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
          "name": "珍珠红茶拿铁/大杯",
          "price": 16
        }, {
          "image_url": "https://fuss10.elemecdn.com/7/90/145ddb6b3a0888e00a8b9782a3ea6jpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
          "name": "鲜醇牛奶三兄弟/中杯",
          "price": 16
        }, {
          "image_url": "https://fuss10.elemecdn.com/9/d6/37228857be1e0c9427e43231b961fjpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
          "name": "鲜醇草莓欧蕾/中杯",
          "price": 16
        }, {
          "image_url": "https://fuss10.elemecdn.com/f/15/46bb9f521780b9c516e7f2630ea84jpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
          "name": "鲜醇芒果欧蕾/中杯",
          "price": 16
        }, {
          "image_url": "https://fuss10.elemecdn.com/8/36/bb9c8705e3e3b8b54fe534fe29ecejpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
          "name": "铁观音茶拿铁珍珠/大杯",
          "price": 16
        }]
      }, {
        "name": "鲜果鲜茶",
        "foods": [{
          "image_url": "https://fuss10.elemecdn.com/1/e1/354946bf21c191e250d2b17dbbdd4jpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
          "name": "法式奶霜草莓果茶（大杯）",
          "price": 16
        }, {
          "image_url": "https://fuss10.elemecdn.com/d/c2/3c4586c80b9734ac488462e30d3eejpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
            "name": "鲜百香双响炮/大杯",
            "price": 16
        }, {
          "image_url": "https://fuss10.elemecdn.com/5/8d/dc459a6278cf2fd87ba1e4291aa7ejpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
          "name": "柠檬霸/大杯",
          "price": 16
        }, {
          "image_url": "https://fuss10.elemecdn.com/3/55/ea3d32a9850b0ac76ed133e7799f5jpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
          "name": "金桔柠檬汁/中杯",
          "price": 16
        }, {
          "image_url": "https://fuss10.elemecdn.com/6/2a/44b5b95ac6509230e331c055e0544jpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
          "name": "葡萄柚绿茶/中杯",
          "price": 16
        }, {
          "image_url": "https://fuss10.elemecdn.com/1/3c/bb7c94c01915f5fe48253b6f261dbjpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
            "name": "草莓果茶/中杯",
            "price": 16
        }, {
          "image_url": "https://fuss10.elemecdn.com/f/d0/275c56d29631ac7814ddcdef57bebjpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
          "name": "鲜柠檬红茶/中杯",
          "price": 16
        }, {
          "image_url": "https://fuss10.elemecdn.com/9/83/0e0fc97275f0937ce863fc5c865abjpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
          "name": "鲜柠檬绿茶/中杯",
          "price": 16
        }, {
          "image_url": "https://fuss10.elemecdn.com/7/09/a14cfc9c2104a59ea5675facf9e4bjpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
          "name": "鲜百香绿茶/中杯",
          "price": 16
        }]
      }, {
        "name": "益菌多多",
        "foods": [{
          "image_url": "https://fuss10.elemecdn.com/7/f4/bb627b39b80fdb1f2e71239dd33a5jpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
          "name": "葡萄柚益菌多/大杯",
          "price": 16
        }, {
          "image_url": "https://fuss10.elemecdn.com/d/71/8c898f4f7294c1257cff072199462jpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
          "name": "柠檬椰果益菌多/中杯",
          "price": 16
        }, {
          "image_url": "https://fuss10.elemecdn.com/0/4a/ff67d5523ad5f91f7497a04cdd8ebjpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
          "name": "芒果益菌多/中杯",
          "price": 16
        }, {
          "image_url": "https://fuss10.elemecdn.com/1/b0/0f5e7ff9d304eaa0cb4f75239e40ajpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
          "name": "绿茶益菌多/中杯",
          "price": 16
        }]
      }, {
        "name": "法式奶霜",
        "foods": [{
          "image_url": "https://fuss10.elemecdn.com/1/e1/354946bf21c191e250d2b17dbbdd4jpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
          "name": "法式奶霜草莓果茶/大杯",
          "price": 16
        }, {
          "image_url": "https://fuss10.elemecdn.com/c/f1/e7d3a34bef76ea0a52107241d6edcjpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
          "name": "17岁轻茶奶霜/大杯",
          "price": 16
        }, {
          "image_url": "https://fuss10.elemecdn.com/7/bc/a0ad59fef30dc4eb61056c7496cb5jpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
          "name": "法式奶霜铁观音/大杯",
          "price": 16
        }, {
          "image_url": "https://fuss10.elemecdn.com/7/bc/a0ad59fef30dc4eb61056c7496cb5jpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
            "name": "法式奶霜铁观音/中杯",
            "price": 16
        }, {
          "image_url": "https://fuss10.elemecdn.com/8/1c/5d6a14fb5126eca5d933aac79ca67jpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
          "name": "法式奶霜绿茶/大杯",
          "price": 16
        }, {
          "image_url": "https://fuss10.elemecdn.com/8/1c/5d6a14fb5126eca5d933aac79ca67jpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
          "name": "法式奶霜绿茶/中杯",
          "price": 16
        }, {
          "image_url": "https://fuss10.elemecdn.com/3/d6/2787765b0ce758410d54f8a0474ebjpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
          "name": "法式奶霜红茶/大杯",
          "price": 16
        }, {
          "image_url": "https://fuss10.elemecdn.com/3/d6/2787765b0ce758410d54f8a0474ebjpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
          "name": "法式奶霜红茶/中杯",
          "price": 16
        }]
      }, {
        "name": "香浓牛奶",
        "foods": [{
          "image_url": "https://fuss10.elemecdn.com/0/6f/2c84800878263ed2e21b3b9016cdfjpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/",
          "name": "红茶拿铁/中杯",
          "price": 16
        }]
      }];
  }
}

module.exports = {
  getData: getData
}