const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const files = new Set(['index.html','styles.css','enhancements.css','botany.css','players.css','app.js','botany.js','players.js','player-guides.js','chemistry.js','recipes.js','README.md','data-summary.json','assets/credits.json','player-guides/chemistry-original.txt']);
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.md':'text/plain; charset=utf-8','.txt':'text/plain; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png'};
const port = Number(process.env.PORT || 4173);
for(const file of ['compact.css','chef-menu.js','security.css','security.js','security-data.js','scientist.css','scientist.js','scientist-data.js'])files.add(file);
for(const file of ['anomalies.js','anomalies-data.js'])files.add(file);
for(const file of ['engineering.js','engineering-data.js','engineering.css'])files.add(file);
for(const file of ['atmos-economy.js','supermatter.js'])files.add(file);
files.add('assets/engineering-credits.json');
for(const file of ['sm-observer.js','sm-observer.css'])files.add(file);
http.createServer((req,res)=>{
  const file = new URL(req.url,'http://localhost').pathname.slice(1) || 'index.html';
  if (!files.has(file) && !/^assets\/[a-f0-9]{20}\.png$/.test(file)) {res.writeHead(404);res.end('Not found');return;}
  fs.readFile(path.join(__dirname,file),(error,bytes)=>{
    if(error){res.writeHead(500);res.end('File unavailable');return;}
    res.writeHead(200,{'Content-Type':types[path.extname(file)],'Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'});res.end(bytes);
  });
}).listen(port,'127.0.0.1',()=>console.log(`Станция рецептов: http://127.0.0.1:${port}\nДля остановки нажмите Ctrl+C.`));
