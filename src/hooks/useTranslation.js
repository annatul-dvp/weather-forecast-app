import axios from 'axios'
import { ref } from 'vue'

export default async function (text) {
  console.log(text)
  const trans = ref(null)

  const encodedParams = new URLSearchParams()
  encodedParams.set('from', 'en')
  encodedParams.set('to', 'ru')
  encodedParams.set('text', text)

  const options = {
    method: 'POST',
    url: 'https://google-translate113.p.rapidapi.com/api/v1/translator/text',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': 'cd94b319d9mshe1fc3798c8d46cap1d220fjsnf8d9ea40bab1',
      'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com'
    },
    data: encodedParams
  }

  try {
    const response = await axios.request(options)
    trans.value = response.data.trans
    console.log('Перевод')
    console.log(response.data.trans)
    console.log(response.data)
  } catch (error) {
    console.error(error)
  }

  return {
    trans: trans.value
  }
}
