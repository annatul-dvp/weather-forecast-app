import transformTime from '@/hooks/useTimeStilization'
import { ref } from 'vue'

export default function numberFormat (lang, format, value) {
  const newVAlue = ref(value)
  switch (format) {
    case 'fahrenheit':
      newVAlue.value = new Intl.NumberFormat(lang, { style: 'unit', unit: 'fahrenheit' }).format(value)
      break
    case 'celsius':
      newVAlue.value = new Intl.NumberFormat(lang, { style: 'unit', unit: 'celsius' }).format(value)
      break
    case 'milliliter':
      newVAlue.value = new Intl.NumberFormat(lang, { style: 'unit', unit: 'milliliter' }).format(value)
      break
    case 'inch':
      newVAlue.value = new Intl.NumberFormat(lang, { style: 'unit', unit: 'inch' }).format(value)
      break
    case 'percent':
      newVAlue.value = new Intl.NumberFormat(lang, { style: 'unit', unit: 'percent' }).format(value)
      break
    case 'millibar':
      if (lang === 'ru') {
        newVAlue.value = String(value + ' милибар')
      } else {
        newVAlue.value = String(value + ' milibar')
      }
      break
    case 'time':
      newVAlue.value = transformTime(lang, value)
      break
    default:
      break
  }
  return newVAlue.value
}
