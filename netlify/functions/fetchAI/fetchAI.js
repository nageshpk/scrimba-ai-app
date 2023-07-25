import { Configuration, OpenAIApi } from 'openai'
// import { process } from './env'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

const handler = async (event) => {
  try {
    const response = await openai.createCompletion({
        model: 'davinci:ft-personal-2023-07-21-10-27-32',
        prompt: event.body,
        presence_penalty: 0,
        frequency_penalty: 0.3,
        max_tokens: 100,
        temperature: 0,
        stop: ['\n', '->']
    })
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        'reply': response.data
       }),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
