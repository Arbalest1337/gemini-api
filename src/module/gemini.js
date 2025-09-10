import { GoogleGenAI } from '@google/genai'
import { ProxyAgent, setGlobalDispatcher } from 'undici'

// proxy
if (process.env.USE_HTTP_PROXY.toLowerCase() === 'true') {
  setGlobalDispatcher(new ProxyAgent(process.env.HTTP_PROXY))
}

const ai = new GoogleGenAI({})

export const generateImage = async ({ imageUrl, prompt }) => {
  const contents = [
    {
      role: 'system',
      text: 'Translate the user’s input prompt into English, and based on the translated English prompt, always generate an image and return it.'
    },
    { text: prompt }
  ]
  if (imageUrl) {
    const response = await fetch(imageUrl)
    const mimeType = response.headers.get('Content-Type') || 'image/png'
    const imageArrayBuffer = await response.arrayBuffer()
    const base64Image = Buffer.from(imageArrayBuffer).toString('base64')
    contents.push({ inlineData: { mimeType, data: base64Image } })
  }

  const res = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image-preview',
    contents
  })

  const { finishReason } = res.candidates[0]
  if (finishReason !== 'STOP') {
    throw new Error(finishReason)
  }
  const buffers = []
  for (const part of res.candidates[0].content.parts) {
    const text = part.text ?? ''
    if (part.inlineData) {
      const { data: base64Data, mimeType } = part.inlineData
      buffers.push({ base64Data, mimeType, text })
    }
  }
  return buffers
}
