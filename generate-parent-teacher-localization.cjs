const fs=require('fs');
const path=require('path');

const root=path.resolve(__dirname,'..');
const source=fs.readFileSync(path.join(root,'parent-teacher-center.js'),'utf8');
const phrases=new Set();
for(const match of source.matchAll(/(?<![\w.])t\('((?:\\'|[^'])*)'\)/g))phrases.add(match[1].replace(/\\'/g,"'"));
[
  'approved learner','approved learners','day','days','attempt','attempts',
  'Viewing now','View progress',
  'Current streak','Consecutive recorded study days','Due reviews','Smart Review items ready now',
  'Course progress','Fastest time','Best eligible assessment',
  'Overview','Activity & Calendar','Course Progress','Assessments & Fastest Times',
  'Vocabulary','Grammar','Reading','Listening','Kanji',
  'Complete','Current','Available','Locked',
  'Placement test','Passing review quiz','Perfect Guardian test',
  'Fastest eligible completion','No eligible result yet',
  'Completed','Passed','Attempted','Perfect','Level','Course','Review','Guardian',
  'Parent/Teacher Center and learner access',
  'Approved adults can switch between linked learners and view progress without controlling the game.',
  'Menu → Player → Parent/Teacher Center',
  'The Center is a separate read-only area for activity, streaks, due-review counts, course progress, assessment history, and fastest completion records.',
  'Use Link student to send a request to another player profile. Nothing is shared while the request is waiting.',
  'The learner signs in to their own profile, opens Parent/Teacher Center, and chooses Approve or Decline. Only the learner can approve access.',
  'Use Switch student to change reports. Manage access lets an adult cancel or remove a link, and lets a learner revoke previously approved access.',
  'Linked adults cannot answer questions, spend Nuggets, reset progress, or read private Notebook notes.',
  'Open Parent/Teacher Center',
  'Player contains the Player Dashboard, Player Stats, Parent/Teacher Center, Achievements, Calendar, Account, Game Guide, Share Game, Accessibility, Feedback, and Patreon.'
].forEach(value=>phrases.add(value));
const SOURCES=[...phrases].filter(Boolean);
const TARGETS={es:'es',ru:'ru',ja:'ja',ko:'ko',zh:'zh-CN',it:'it',fr:'fr',de:'de',pt:'pt',vi:'vi',th:'th',tr:'tr',id:'id',pl:'pl',el:'el',uk:'uk'};
const cacheFile=path.join(__dirname,'parent-teacher-translations.json');
let cache={};try{cache=JSON.parse(fs.readFileSync(cacheFile,'utf8'));}catch{}
const requested=process.argv[2]?process.argv[2].split(',').filter(Boolean):Object.keys(TARGETS);
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function translate(text,target,attempt=0){
  const url=`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${encodeURIComponent(target)}&dt=t&q=${encodeURIComponent(text)}`;
  try{const response=await fetch(url);if(!response.ok)throw new Error(String(response.status));const data=await response.json();const value=(data[0]||[]).map(part=>part?.[0]||'').join('').trim();if(!value)throw new Error('empty');return value;}catch(error){if(attempt>=4)throw error;await wait(350*Math.pow(2,attempt));return translate(text,target,attempt+1);}
}
async function pool(items,worker,limit=12){let index=0;const runners=Array.from({length:Math.min(limit,items.length)},async()=>{while(index<items.length){const current=index++;await worker(items[current]);}});await Promise.all(runners);}
async function main(){
  for(const language of requested){
    if(!TARGETS[language])continue;cache[language]=cache[language]||{};const missing=SOURCES.filter(text=>!cache[language][text]);
    await pool(missing,async text=>{cache[language][text]=await translate(text,TARGETS[language]);},14);
    fs.writeFileSync(cacheFile,JSON.stringify(cache,null,2));
    process.stdout.write(`${language}: ${SOURCES.length-missing.length} cached, ${missing.length} translated\n`);
  }
  if(process.argv.includes('--compile')||requested.length===Object.keys(TARGETS).length){
    const lines=[];lines.push('// Generated translations for the v6.4.126 Parent/Teacher Center and handbook topic.');lines.push('(()=>{');lines.push("  'use strict';");lines.push('  const sources='+JSON.stringify(SOURCES,null,2)+';');lines.push('  const translations='+JSON.stringify(Object.fromEntries(Object.keys(TARGETS).map(language=>[language,SOURCES.map(text=>cache[language]?.[text]||text)])),null,2)+';');lines.push('  const parentTeacherPacks={en:{}};');lines.push("  sources.forEach((source,index)=>{parentTeacherPacks.en[`parentTeacher${index}`]=source;});");lines.push("  Object.entries(translations).forEach(([language,values])=>{parentTeacherPacks[language]={};sources.forEach((source,index)=>{parentTeacherPacks[language][`parentTeacher${index}`]=values[index]||source;});});");lines.push("  window.LANGUAGE_MINER_PARENT_TEACHER_TRANSLATIONS=parentTeacherPacks;");lines.push("  document.documentElement.dataset.lmParentTeacherTranslations='ready';");lines.push('  const packs=window.LANGUAGE_MINER_FULL_INTERFACE_TRANSLATIONS;');lines.push("  if(packs)Object.entries(parentTeacherPacks).forEach(([language,values])=>{if(packs[language])Object.assign(packs[language],values);});");lines.push('})();');
    fs.writeFileSync(path.join(root,'parent-teacher-localization.js'),lines.join('\n')+'\n','utf8');
    process.stdout.write(`compiled ${SOURCES.length} phrases\n`);
  }
}
main().catch(error=>{console.error(error);process.exitCode=1;});
