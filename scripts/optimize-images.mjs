import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const dir = path.resolve(import.meta.dirname, '..', 'public', 'images')
const files = fs.readdirSync(dir)
let before = 0
let after = 0
let n = 0
for (const f of files) {
  const p = path.join(dir, f)
  const size = fs.statSync(p).size
  before += size
  if (/\.svg$/i.test(f)) continue
  try {
    const meta = await sharp(p).metadata()
    let img = sharp(p, { failOn: 'none' })
    if ((meta.width || 0) > 900) {
      img = img.resize({ width: 900, withoutEnlargement: true })
    }
    const ext = path.extname(f).toLowerCase()
    if (ext === '.png') {
      img = img.png({ quality: 85, compressionLevel: 9 })
    } else {
      img = img.jpeg({ quality: 82, mozjpeg: true })
    }
    const buf = await img.toBuffer()
    if (buf.length < size) {
      fs.writeFileSync(p, buf)
      after += buf.length
    } else {
      after += size
    }
    n++
  } catch (e) {
    console.log('skip', f, String(e).slice(0, 120))
    after += size
  }
}
console.log('processed', n, 'files. before MB', (before / 1048576).toFixed(1), 'after MB', (after / 1048576).toFixed(1))
