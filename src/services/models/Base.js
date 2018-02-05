import axios from '@/services'
import qs from 'qs'
import {ReadOnly, BaseURL} from '@/utils/decorators'

@BaseURL('http://tvi3.f3322.net:8053/zhsq')
class Base {
  static $name = ''
  static $http = axios

  constructor (id = '') {
    this.id = id
  }

  @ReadOnly
  $get (
    url,
    params,
    options = { baseURL: `${Base.$name}${this.constructor.$name}` }
  ) {
    return Base.$http.get(options.baseURL + url, Object.assign(options, {params}))
  }
  @ReadOnly
  $post (
    url,
    data,
    options = { baseURL: `${Base.$name}${this.constructor.$name}` }
  ) {
    return Base.$http.post(options.baseURL + url, qs.stringify(data), options)
  }
  find (params, _url = '/pagelist') {
    return this.$get(_url, params)
  }
  async findOne (params, _url = 'findOne.action') {
    let data = await this.$get(_url, params)
    return new this.constructor(data)
  }
  save (params, _url = 'save.action', options = {
    baseURL: `${Base.$name}${this.constructor.$name}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }) {
    return this.$post(_url, params, options)
  }
  delete (params, _url = 'delete.action', options = {
    baseURL: `${Base.$name}${this.constructor.$name}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }) {
    return this.$post(_url, params, options)
  }
}

export default Base
