import axios from 'axios'
import { ref } from 'vue'
import { theRapidKey } from '@/config'

export default async function (text, from, to) {
  // console.log(text)
  const trans = ref(null)

  const encodedParams = new URLSearchParams()
  encodedParams.set('from', from) // auto,en
  encodedParams.set('to', to) // ru, eng...
  encodedParams.set('text', text)

  const options = {
    method: 'POST',
    url: 'https://google-translate113.p.rapidapi.com/api/v1/translator/text',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': theRapidKey,
      'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com'
    },
    data: encodedParams
  }

  try {
    const response = await axios.request(options)
    trans.value = response.data.trans
  } catch (error) {
    console.error(error)
  }

  return {
    trans: trans.value
  }
}
