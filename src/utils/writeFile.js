import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

export const writeFile = async (folder, name, content) => {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const projectRoot = path.resolve(__dirname, '..', '..')
  const imageDir = path.join(projectRoot, 'public', folder)
  if (!fs.existsSync(imageDir)) fs.mkdirSync(imageDir, { recursive: true })
  fs.writeFileSync(`${imageDir}/${name}`, content)
}
