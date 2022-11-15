/*
 * @Description: file desc
 * @Author: zhangwang
 * @Date: 2022-03-31 11:16:32
 * @LastEditors: zhangwang
 * @LastEditTime: 2022-04-20 16:28:20
 * @FilePath: \explorer\src\store\getters.js
 */
const getters = {
  sidebar: state => state.app.sidebar,
  blockToken: state => state.user.blockToken,
  username: state => state.user.username,
  areaId: state => state.user.areaId,
  areaCode: state => state.user.areaCode,
  id: state => state.user.id,
  clientId: state => state.user.clientId,
  role: state => state.user.role,
  status: state => state.user.status,
  permission_routes: state => state.permission.routes
}

export default getters
