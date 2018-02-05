import {BaseURL, Memorize} from '@/utils/decorators'
import Base from './Base'

const userStatusMap = {
  '0': '正常',
  '1': '未知'
}
const areaAttrMap = {
  '1': '省级',
  '2': '市级'
}

@BaseURL('/usrInfo/usr-info!')
class User extends Base {
  constructor (args) {
    super(args.id)

    this.cityCd = args.cityCd
    this.cityName = args.cityName
    this.countyCd = args.countyCd
    this.countyName = args.countyName
    this.email = args.email
    this.isAdmin = args.isAdmin
    this.jobTitle = args.jobTitle
    this.orgId = args.orgId
    this.phone = args.phone
    this.provCd = args.provCd
    this.provName = args.provName
    this.rangId = areaAttrMap[args.rangId]
    this.roleDesc = args.roleDesc
    this.roleId = args.roleId
    this.roleName = args.roleName
    this.statCd = userStatusMap[args.statCd]
    this.usrAcc = args.usrAcc
    this.usrId = args.usrId
    this.usrName = args.usrName
  }
  @Memorize()
  async find ({filter = '', page = 1, rows = 15} = {}) {
    let {totalCount, usrList} = await super.find({filter, page, rows}, 'getUsrs.action')
    return {
      totalCount,
      usrList: usrList.map(v => new this.constructor(v))
    }
  }
}

export default new User({
  cityCd: '',
  cityName: '',
  countyCd: '',
  countyName: '',
  email: '',
  isAdmin: '',
  jobTitle: '',
  orgId: '',
  phone: '',
  provCd: '',
  provName: '',
  rangId: '',
  roleDesc: '',
  roleId: '',
  roleName: '',
  statCd: '',
  usrAcc: '',
  usrId: '',
  usrName: ''
})
export {User}
