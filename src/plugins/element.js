/*
 * @Description: file desc
 * @Author: zhangwang
 * @Date: 2022-03-31 11:45:53
 * @LastEditors: zhangwang
 * @LastEditTime: 2022-05-07 16:16:02
 * @FilePath: \explorer\src\plugins\element.js
 */
import Vue from 'vue'
import {
  Scrollbar,
  Menu,
  Submenu,
  MenuItem,
  Icon,
  Tooltip,
  Breadcrumb,
  BreadcrumbItem,
  // Avatar,
  Form,
  FormItem,
  Input,
  Button,
  ButtonGroup,
  Select,
  Option,
  Radio,
  // RadioGroup,
  Table,
  TableColumn,
  Pagination,
  Image,
  // Upload,
  Progress,
  Notification,
  Message,
  MessageBox,
  Dialog,
  Loading,
  // DatePicker,
  // ColorPicker,
  // Tag,
  Row,
  Col,
  Card,
  Tabs,
  TabPane,
  Cascader,
  Descriptions,
  DescriptionsItem,
  Divider,
  Tree,
  Checkbox,
  CheckboxGroup
} from 'element-ui'

Vue.use(Scrollbar)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Icon)
Vue.use(Tooltip)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
// Vue.use(Avatar)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Select)
Vue.use(Option)
Vue.use(Radio)
// Vue.use(RadioGroup)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Image)
// Vue.use(Upload)
Vue.use(Progress)
// 引入Message时，Vue.use(Message)这种写法会在页面刷新时自动弹出message，且无信息显示，所以使用如下引用
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.use(Dialog)
Vue.use(Loading)
// Vue.use(DatePicker)
// Vue.use(ColorPicker)
// Vue.use(Tag)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Cascader)
Vue.use(Descriptions)
Vue.use(DescriptionsItem)
Vue.use(Divider)
Vue.use(Tree)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
