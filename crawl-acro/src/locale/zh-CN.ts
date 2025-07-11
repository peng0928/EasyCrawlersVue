import localeMessageBox from '@/components/message-box/locale/zh-CN';
import localeLogin from '@/views/login/locale/zh-CN';

import localeWorkplace from '@/views/dashboard/workplace/locale/zh-CN';

import localeSettings from './zh-CN/settings';

export default {
  'menu.dashboard': '仪表盘',
  'menu.home': '首页',
  'menu.spider': '爬虫',
  'menu.spiderAdd': '新增爬虫',
  'menu.spiderCode': '爬虫代码',
  'menu.task': '任务',
  'menu.schedule': '定时调度',
  'menu.setting': '设置',
  'menu.dbConfig': '数据库',
  'menu.runConfig': '运行环境',
  'menu.logConfig': '日志配置',
  'menu.project': '项目',
  'menu.system': '系统监控',
  'menu.server.dashboard': '仪表盘-服务端',
  'menu.server.workplace': '工作台-服务端',
  'menu.server.monitor': '实时监控-服务端',
  'menu.list': '列表页',
  'menu.result': '结果页',
  'menu.exception': '异常页',
  'menu.form': '表单页',
  'menu.profile': '详情页',
  'menu.visualization': '数据可视化',
  'menu.user': '个人中心',
  'menu.arcoWebsite': 'Arco Design',
  'menu.faq': '常见问题',
  'navbar.docs': '文档中心',
  'navbar.action.locale': '切换为中文',
  'spider.input.url': '请输入网址',
  ...localeSettings,
  ...localeMessageBox,
  ...localeLogin,
  ...localeWorkplace,
};
