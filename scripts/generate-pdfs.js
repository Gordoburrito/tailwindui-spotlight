const puppeteer = require('puppeteer')
const path = require('path')
const fs = require('fs')

const SLUGS = [
  'forge-fde',
  'healthcare-ai-founding',
  'pe-workflow-founding',
  'humeo-founding',
  'temper-founding',
]

const PORT = 3100
const BASE_URL = `http://localhost:${PORT}`

async function main() {
  console.log('Connecting to running Next.js server...\n')

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/usr/bin/chromium',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  })

  const outDir = path.resolve(__dirname, '..', 'public', 'pdfs')
  fs.mkdirSync(outDir, { recursive: true })

  for (const slug of SLUGS) {
    const page = await browser.newPage()
    const url = `${BASE_URL}/resume/${slug}`
    console.log(`Generating: ${slug}...`)

    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 })
    await new Promise((r) => setTimeout(r, 500))

    const outPath = path.join(outDir, `Gordon_Lewis_Resume_${slug}.pdf`)
    await page.pdf({
      path: outPath,
      format: 'Letter',
      margin: { top: 0, bottom: 0, left: 0, right: 0 },
      printBackground: true,
    })

    await page.close()
    const size = (fs.statSync(outPath).size / 1024).toFixed(1)
    console.log(`  -> ${path.relative(path.resolve(__dirname, '..'), outPath)} (${size} KB)`)
  }

  await browser.close()
  console.log('\nAll PDFs generated successfully!')
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
