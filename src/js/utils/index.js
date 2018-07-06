export function formatTime(date){
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day]
      .map(formatNumber)
      .join('-') + ' ' + [hour, minute, second]
      .map(formatNumber)
      .join(':')
}
const dateFormat = (date, fmt = 'YYYY-MM-DD HH:mm:ss') => {
  if (!date) {
      return ''
  }
  if (typeof date === 'string') {
      date = new Date(date.replace(/-/g, '/'))
  }
  if (typeof date === 'number') {
      date = new Date(date)
  }
  var o = {
      'M+': date.getMonth() + 1,
      'D+': date.getDate(),
      'h+': date.getHours() % 12 === 0
          ? 12
          : date.getHours() % 12,
      'H+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      'S': date.getMilliseconds()
  }
  var week = {
      '0': '\u65e5',
      '1': '\u4e00',
      '2': '\u4e8c',
      '3': '\u4e09',
      '4': '\u56db',
      '5': '\u4e94',
      '6': '\u516d'
  }
  if (/(Y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  if (/(E+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1)
          ? (RegExp.$1.length > 2
              ? '\u661f\u671f'
              : '\u5468')
          : '') + week[date.getDay() + ''])
  }
  for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1)
              ? (o[k])
              : (('00' + o[k]).substr(('' + o[k]).length)))
      }
  }
  return fmt
};
export function showLongTime(LongTime){
  let time = (typeof LongTime === 'number')
      ? dateFormat(new Date(LongTime), 'YYYY-MM-DD HH:mm:ss')
      : LongTime
  let currentTime = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss');

  if (time.substr(0, 7) === currentTime.substr(0, 7)) {
      if (time.substr(0, 10) === currentTime.substr(0, 10)) 
          return "今天" + time.substr(11, 5);
      return "今天" + time.substr(11, 5);
      if (new Date(time).getDate() + 1 === new Date(currentTime).getDate()) 
          return "昨天" + time.substr(11, 5);
      return time.substr(5, 5);
  }
  if (time.substr(0, 4) === currentTime.substr(0, 4)) 
      return time.substr(5, 5); //今年
  return time.substr(0, 10); //早些年月
};
