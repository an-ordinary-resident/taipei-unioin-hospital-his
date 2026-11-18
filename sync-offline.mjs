import fs from 'node:fs/promises';import path from 'node:path';
const root=process.cwd();const content=JSON.parse(await fs.readFile(path.join(root,'content.json'),'utf8'));
if(content.schemaVersion!==1||!Array.isArray(content.documents)||!Array.isArray(content.glossary))throw Error('content.json 格式不符，未更新離線快照。');
await fs.writeFile(path.join(root,'content.js'),'window.__HIS_CONTENT__='+JSON.stringify(content)+';\n');
console.log('Offline snapshot updated from content.json');
if(process.argv.includes('--pages')){
 const dest=path.join(root,'_site');await fs.mkdir(dest,{recursive:true});
 // Only deploy runtime files. Author sources, reports, backups and credentials are excluded.
 const entries=['index.html','app.css','assets','config.js','content.json','content.js','media','reader-avatars','covers','hospital-mark-v3.png','missing-image.svg','favicon.svg','.nojekyll'];
 for(const name of entries){const from=path.join(root,name);try{await fs.cp(from,path.join(dest,name),{recursive:true})}catch(e){if(e.code!=='ENOENT')throw e;}}
}
