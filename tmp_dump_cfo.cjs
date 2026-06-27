const fs = require('fs');
const path = require('path');
const base = 'c:/Projects/virdixgreen/tmp_cfo_xlsx/xl';
function read(p){ return fs.readFileSync(path.join(base,p),'utf8'); }
function attrs(s){ const o={}; for (const m of s.matchAll(/([A-Za-z_:][\w:.-]*)="([^"]*)"/g)) o[m[1]]=m[2]; return o; }
function decodeXml(s){ return (s||'').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&apos;/g,"'"); }
const wb = read('workbook.xml');
const rels = read('_rels/workbook.xml.rels');
const relMap = {};
for (const m of rels.matchAll(/<Relationship\b([^>]*)\/>/g)) { const a=attrs(m[1]); relMap[a.Id]=a.Target; }
const sheets = [];
for (const m of wb.matchAll(/<sheet\b([^>]*)\/>/g)) { const a=attrs(m[1]); sheets.push({name:a.name, target:relMap[a['r:id']]}); }
const sstXml = read('sharedStrings.xml');
const sst=[];
for (const m of sstXml.matchAll(/<si>([\s\S]*?)<\/si>/g)) sst.push([...m[1].matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map(x=>decodeXml(x[1])).join(''));
function colToNum(ref){ const col=ref.match(/[A-Z]+/)[0]; let n=0; for (const ch of col) n=n*26+(ch.charCodeAt(0)-64); return n; }
function rowNum(ref){ return Number(ref.match(/\d+/)[0]); }
function cellText(cell){
  const a=attrs(cell.match(/<c\b([^>]*)>/)?.[1]||'');
  const f=cell.match(/<f[^>]*>([\s\S]*?)<\/f>/)?.[1];
  const v=cell.match(/<v[^>]*>([\s\S]*?)<\/v>/)?.[1];
  let value='';
  if (a.t==='s') value = sst[Number(v)] || '';
  else if (a.t==='inlineStr') value = decodeXml(cell.match(/<t[^>]*>([\s\S]*?)<\/t>/)?.[1]||'');
  else value = v || '';
  return {ref:a.r, row:rowNum(a.r), col:colToNum(a.r), type:a.t||'', value:decodeXml(value), formula:f?decodeXml(f):''};
}
function sheetCells(name){
 const sh=sheets.find(s=>s.name===name); const xml=read(sh.target.replace(/^\//,'')); return [...xml.matchAll(/<c\b[\s\S]*?<\/c>/g)].map(m=>cellText(m[0]));
}
function matrix(name, r1,r2,c1,c2){
 const cells=sheetCells(name); const map=new Map(cells.map(c=>[`${c.row}:${c.col}`, c]));
 console.log(`\n=== ${name} R${r1}:${r2} C${c1}:${c2} ===`);
 for(let r=r1;r<=r2;r++){
   const vals=[];
   for(let c=c1;c<=c2;c++){ const x=map.get(`${r}:${c}`); vals.push(x ? (x.formula ? '=' + x.formula : x.value) : ''); }
   if(vals.some(Boolean)) console.log(r + '\t' + vals.join('\t'));
 }
}
matrix('ข้อมูล',1,41,1,18);
matrix('Fr-04.1',6,48,2,45);
matrix('Fr-05',5,34,2,6);
matrix('EF TGO AR5',2,90,1,14);
matrix('ระบบ Septic tank',1,17,1,14);
matrix('การขนส่งต้นน้ำ',2,7,2,10);
matrix('การเดินทางของพนักงาน',2,20,3,14);
matrix('ขยะทั่วไป',1,58,1,17);
