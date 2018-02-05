import {menuMap} from '@/services/models/Role'

export const joinMenuName = menuId => menuId.map(v => menuMap[v]).join('，')
