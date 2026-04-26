import { GoogleGenerativeAI } from '@google/generative-ai'

const modelName = 'gemini-3.1-flash-lite-preview'

const googleAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY ?? '')
const model = googleAI.getGenerativeModel({ model: modelName })

export const queryModel = async (prompt: string) => {
  try {
    const result = await model.generateContent(prompt)
    const text = result.response.text()

    return text
  } catch (error) {
    console.error('Error querying model:', error)
    throw new Error('Failed to query model')
  }
}
