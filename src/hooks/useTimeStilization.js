export default function transformTime (lang, timeTxt) {
  const time = typeof str === 'string' ? timeTxt.trim().replace(/\s{2,}/g, ' ') : timeTxt
  const regexpRu = /^\d{2}([:])\d{2}$/
  const regexpEn = /^\d{2}([:])\d{2}([\s])([a|A|p|P])\.?([m|M])\.?$/

  const isRuMatched = time.match(regexpRu) !== null
  const isEnMatched = time.match(regexpEn) !== null

  if (lang === 'ru' & isEnMatched) {
    const timeDataArray = time.split(/\s|:/)
    if (timeDataArray[2].toLowerCase() === 'pm') {
      return String(Number(timeDataArray[0]) + 12) + ':' + timeDataArray[1]
    } else {
      return timeDataArray[0] + ':' + timeDataArray[1]
    }
  }
  if (lang === 'en' & isRuMatched) {
    const timeDataArray = time.split(':')
    if (Number(timeDataArray[0]) > 12 & Number(timeDataArray[0]) > 21) {
      return String(Number(timeDataArray[0]) - 12) + ':' + timeDataArray[1] + ' PM'
    }
    if (Number(timeDataArray[0]) > 12 & Number(timeDataArray[0]) < 22) {
      return '0' + String(Number(timeDataArray[0]) - 12) + ':' + timeDataArray[1] + ' PM'
    } else {
      return timeDataArray[0] + ':' + timeDataArray[1] + ' AM'
    }
  } else {
    return time
  }
}
