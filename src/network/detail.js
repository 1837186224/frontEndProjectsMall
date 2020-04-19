import {
  request
} from './request.js'


export function getDetail(iid) {
  return request({
    url: '/api/h8/detail',
    params: {
      iid
    }
  })
}

export function getRecommend() {
  return request({
    url: '/api/h8/recommend'

  })
}

// 详情页-轮播图下的商品详细信息
// 等号后面的 title discountDesc等都是后端传来的指定值
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.relaPrice = itemInfo.lowNowPrice
    this.discountBgColor = itemInfo.discountBgColor
  }
}
// 店铺信息
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
  }
}
export class GoodsParam {
  constructor(info, rule) {
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizess = rule.tables;
  }
}