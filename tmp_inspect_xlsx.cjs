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
for (const m of wb.matchAll(/<sheet\b([^>]*)\/>/g)) { const a=attrs(m[1]); sheets.push({name:a.name, sheetId:a.sheetId, rid:a['r:id'], target:relMap[a['r:id']]}); }
const sstXml = read('sharedStrings.xml');
const sst=[];
for (const m of sstXml.matchAll(/<si>([\s\S]*?)<\/si>/g)) {
  const texts=[...m[1].matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map(x=>decodeXml(x[1]));
  sst.push(texts.join(''));
}
function cellText(cell){
  const a=attrs(cell.match(/<c\b([^>]*)>/)?.[1]||'');
  const f=cell.match(/<f[^>]*>([\s\S]*?)<\/f>/)?.[1];
  const v=cell.match(/<v[^>]*>([\s\S]*?)<\/v>/)?.[1];
  let value='';
  if (a.t==='s') value = sst[Number(v)] || '';
  else if (a.t==='inlineStr') value = decodeXml(cell.match(/<t[^>]*>([\s\S]*?)<\/t>/)?.[1]||'');
  else value = v || '';
  return {ref:a.r, type:a.t||'', value:decodeXml(value), formula:f?decodeXml(f):''};
}
console.log('Sheets:');
for (const sh of sheets) console.log(`${sh.sheetId}: ${sh.name} -> ${sh.target}`);
console.log('\nSummary per sheet:');
for (const sh of sheets) {
  const xml = read(sh.target.replace(/^\//,''));
  const dim = xml.match(/<dimension ref="([^"]+)"/)?.[1] || '';
  const cells = [...xml.matchAll(/<c\b[\s\S]*?<\/c>/g)].map(m=>cellText(m[0]));
  const formulas = cells.filter(c=>c.formula);
  const textCells = cells.filter(c=>c.value && isNaN(Number(c.value))).slice(0,80);
  console.log(`\n[${sh.name}] dim=${dim} cells=${cells.length} formulas=${formulas.length}`);
  console.log('First text cells:', textCells.slice(0,30).map(c=>`${c.ref}=${c.value}`).join(' | '));
  console.log('First formulas:', formulas.slice(0,20).map(c=>`${c.ref}=${c.formula}`).join(' | '));
}
