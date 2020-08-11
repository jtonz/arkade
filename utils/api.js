import fetch from 'node-fetch'
import crypto from 'crypto'

const api = 'https://gateway.marvel.com:443/v1/public'
const apiKey = 'ce8fd395626b2809b9b50c4757d73847'
const priv = process.env.PRIV_KEY  
const timestamp = parseInt(Date.now() / 1000, 10)
const combined = timestamp + priv + apiKey
const hash = crypto.createHash('md5').update(combined).digest('hex')

const get = async (path, params) => {
  let query = null
  if(params) {
    query = Object.keys(params)
      .map(key => `${key}=${params[key]}`)
      .join('&')
  }

  if(path) {
    const response = await fetch(`${api}/${path}?apikey=${apiKey}&ts=${timestamp}&hash=${hash}${query ? `&${query}` : ''}`)
    return await response.json()
  }
  return false
}

const getCharacters = async (params = {}) => {
  const characters = await get('characters', params)

  if(characters.data) {
    return characters
  }
}

// the /character endpoint was throwing a CORS error, no idea why
// this is a hack to get around it and return a single response
const getCharacterByName = async (name, params = {}) => {
  const characters = await get('characters', {
    name,
    ...params
  })

  if(characters.data 
    && characters.data.results
    && characters.data.results.length
  ) {
    return characters.data.results[0]
  }
}

export {
  getCharacters,
  getCharacterByName,
}