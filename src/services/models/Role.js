import {BaseURL} from '@/utils/decorators'
import Base from './Base'

const menuMap = {
  '1': '商圈分析',
  '2': '商业辅助选址',
  '3': '系统及业务管理'
}

@BaseURL('/roleInfo/role-info!')
class Role extends Base {
  constructor (args) {
    super(args.id)

    this.roleId = args.roleId
    this.roleName = args.roleName
    this.menuId = args.menuId
  }

  async find (params) {
    let res = await this.$get('getRoleMenuList.action', params, {
      baseURL: `${Base.$name}/roleMenu/role-menu!`
    })
    return res.map(v => new Role(v))
  }
  save ({roleId = '', roleName, operate = true}) {
    return super.save({roleId, roleName, operate}, 'saveByOperate.action')
  }
  saveMenu ({roleId, menuId = [], operate = true}) {
    return super.save({roleId, menuId: menuId.join(','), operate}, 'saveByOperate.action', {
      baseURL: `${Base.$name}/roleMenu/role-menu!`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }
  delete ({roleId}) {
    return super.delete({roleId}, undefined, {
      baseURL: `${Base.$name}/roleMenu/role-menu!`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }
}

export default new Role({
  roleId: '',
  roleName: '',
  menuId: []
})
export {Role, menuMap}
