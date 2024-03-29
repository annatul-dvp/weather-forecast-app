import { ref } from 'vue'

export default function isLanguageCorrect (lang, timeTxt) {
  const regexpRu = /^[А-ЯЁа-яё'. -,]+$/
  const regexpEn = /^[A-Za-z'. -,]+$/

  const isCorrect = ref(false)
  switch (lang) {
    case 'ru':
      isCorrect.value = timeTxt.match(regexpRu) !== null
      break
    case 'en':
      isCorrect.value = timeTxt.match(regexpEn) !== null
      break
    default:
      break
  }

  return isCorrect.value
}
