import {BaseURL} from '@/utils/decorators'
import Base from './Base'

@BaseURL('/systemConfiguration/system-configuration!')
class Setting extends Base {
  constructor (args) {
    super(args.id)

    this.induName = args.induName
    this.induDesc = args.dictionaryName
    this.createName = args.createName
    this.createData = args.createData
    this.modifyData = args.modifyData
  }

  async find (params) {
    let res = await super.find(params, 'getConfiguration.action')
    return res.map(v => new Setting(v))
  }
  save ({id = '', induName, induDesc, operate = true}) {
    return super.save({induId: id, induName, induDesc, operate}, 'saveByOperate.action')
  }
  delete ({id}) {
    return super.delete({id})
  }
}

export default new Setting({
  id: '',
  induName: '',
  dictionaryName: '',
  createName: '',
  createData: '',
  modifyData: ''
})
export {Setting}
