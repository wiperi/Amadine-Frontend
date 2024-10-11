# 构建一个antd数据展示页面

quiz组件是一个antd数据展示页面

## 顶部控制栏

 - 不随页面滚动
 - 左侧有：create button， select button
 - 右侧有：radio button group, 选项包含newest， oldest， recent
 - 当select button按下后，它本身变成激活状态，顶部控制栏中间出现select all，delete，transfer三个按钮

## 内容卡片区域

 - 展示内容卡片的地方
 - 一行包含几个内容卡片

## 内容卡片

 - 一个正方形卡片，包含两个区域，上方的图像区域，下方的说明区域
 - 图像区域占据卡片上方的大部分位置
 - 底部的说明区域显示卡片的名字
 - 当鼠标hover内容卡片的时候，底部说明区域上浮，覆盖图像区域，占满整个内容卡片，展示出额外的信息：duration，num of question，time created
 - 当鼠标点击内容卡片，弹出一个内容编辑modal

## 内容编辑modal

 - 在第一行展示name
 - 在第二行展示description
 - 在第三行展示duration，num of question
 - 在第四行展示time created，time last edit
 - 在第五行展示question区域

 ## question区域

 - 是一个列表
 - 列表项是一个长方形question卡片
 - 列表项包含几个按钮：edit，三个点样子的展开按钮
 - 列表项左侧有拖拽图标，可以调整顺序
 - 可以点击列表项展开answers子列表
 - 展开子列表时，列表项上出现save按钮

 ## answers子列表

 - 列表项是一个answer卡片
 - 包含1个输入栏，1个下拉选择栏
