import { padString } from '../util'

// 格式化音乐听众数据
export const listenFormat = function(val) {
  return padString(val, -4, '.', 0, 1);
}

// 获取当日为今年的第几年
export const getDayOfYear = function(val) {
  return padString(val, -4, '.', 0, 1);
}

