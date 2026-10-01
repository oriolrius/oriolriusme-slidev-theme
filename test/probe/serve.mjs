// Static SPA server for a `slidev build` output: node serve.mjs <dist> <port>
import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'

const root = process.argv[2]
const port = +process.argv[3] || 47321
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf', '.jpg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.json': 'application/json' }
http.createServer((req, res) => {
  const p = decodeURIComponent(req.url.split('?')[0])
  let f = path.join(root, p)
  if (!fs.existsSync(f) || fs.statSync(f).isDirectory())
    f = path.join(root, 'index.html')
  res.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream' })
  fs.createReadStream(f).pipe(res)
}).listen(port, '127.0.0.1', () => console.log('serving', root, 'on', port))
