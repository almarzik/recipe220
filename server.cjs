const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=__dirname,port=Number(process.env.PORT||4173);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.txt':'text/plain; charset=utf-8'};
http.createServer((req,res)=>{
 let name;try{name=decodeURIComponent(new URL(req.url,'http://localhost').pathname).slice(1)||'index.html';}catch{res.writeHead(400).end();return;}
 const allowed=name==='index.html'||/^(?:src|data)\/[a-zA-Z0-9_/-]+\.(?:js|css|json)$/.test(name)||/^assets\/(?:[a-f0-9]{20}\.png|(?:engineering-)?credits\.json)$/.test(name)||name==='player-guides/chemistry-original.txt';
 const file=path.resolve(root,name);if(!allowed||!file.startsWith(root+path.sep)){res.writeHead(404).end('Not found');return;}
 fs.readFile(file,(error,bytes)=>{if(error){res.writeHead(404).end('Not found');return;}res.writeHead(200,{'Content-Type':types[path.extname(file)],'Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'});res.end(bytes);});
}).listen(port,'127.0.0.1',()=>console.log('Станция рецептов: http://127.0.0.1:'+port));
