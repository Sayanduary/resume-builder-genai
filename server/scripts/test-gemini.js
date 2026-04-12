import 'dotenv/config'
import { invokeGeminiAI } from '../src/services/ai.service.js'

const prompt =
  process.argv.slice(2).join(' ').trim() ||
  'Write one short greeting in exactly five words.'

const run = async () => {
  try {
    const response = await invokeGeminiAI(prompt)
    console.log('Prompt:', prompt)
    console.log('Response:', response)
  } catch (error) {
    console.error('Gemini test failed:', error.message)
    process.exit(1)
  }
}

run()
