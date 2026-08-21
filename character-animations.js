// Language Miner v6.4.171 — staged mining swing plus strict native-language character speech.
(()=>{
'use strict';

const DURATIONS={idle:0,mining:1880,correct:1100,incorrect:950,celebration:1900,wave:1150,lesson:0,arcade:900,settlement:1150};
const SUPPORTER_POSES={idle:'ready',mining:'mining',correct:'victory',incorrect:'retry',celebration:'celebration',wave:'wave',lesson:'study',arcade:'action',settlement:'work'};
const PHRASES={
  ja:['こんにちは！','いっしょに がんばろう！','すごい！'],es:['¡Hola!','¡Vamos a aprender!','¡Muy bien!'],fr:['Bonjour !','On apprend ensemble !','Bravo !'],de:['Hallo!','Lass uns lernen!','Sehr gut!'],
  it:['Ciao!','Impariamo insieme!','Bravissimo!'],ko:['안녕하세요!','같이 공부해요!','잘했어요!'],zh:['你好！','一起学习吧！','做得好！'],ru:['Привет!','Давай учиться!','Отлично!'],
  pt:['Olá!','Vamos aprender!','Muito bem!'],vi:['Xin chào!','Cùng học nhé!','Làm tốt lắm!'],th:['สวัสดี!','มาเรียนกันเถอะ!','เก่งมาก!'],tr:['Merhaba!','Haydi öğrenelim!','Çok iyi!'],
  id:['Halo!','Ayo belajar!','Bagus sekali!'],pl:['Cześć!','Uczmy się razem!','Świetnie!'],el:['Γεια σου!','Ας μάθουμε μαζί!','Μπράβο!'],uk:['Привіт!','Вчімося разом!','Чудово!'],
  ar:['مرحبًا!','هيا نتعلم!','أحسنت!'],hi:['नमस्ते!','चलो सीखें!','बहुत बढ़िया!'],nl:['Hallo!','Laten we leren!','Heel goed!'],sv:['Hej!','Nu lär vi oss!','Bra jobbat!'],en:['Hello!','Let’s learn together!','Great job!']
};
const VOICE_TAGS={ja:'ja-JP',es:'es-ES',fr:'fr-FR',de:'de-DE',it:'it-IT',ko:'ko-KR',zh:'zh-CN',ru:'ru-RU',pt:'pt-BR',vi:'vi-VN',th:'th-TH',tr:'tr-TR',id:'id-ID',pl:'pl-PL',el:'el-GR',uk:'uk-UA',ar:'ar-SA',hi:'hi-IN',nl:'nl-NL',sv:'sv-SE',en:'en-US'};
const SETTLEMENT_ACTIVITY={home:['build','🔨','Building at Miner Lodge'],library:['study','📚','Studying at the Library'],garden:['garden','🌸','Tending Sakura Garden'],forge:['forge','🔥','Forging a new gem'],museum:['museum','💎','Displaying a museum gem']};
const timers=new WeakMap(),seenArcadeResults=new WeakSet();
let decorateQueued=false,phraseIndex=0,lastCelebratedStreak=0,lastArcadeSignal='',lastSettlementActivity='home',mineSwingStartedAt=0,mineSwingUntil=0;

function gameState(){try{return typeof state!=='undefined'?state:null;}catch{return null;}}
function supporterPosesUnlocked(){return Math.max(0,Number(window.japaneseMinerSupporterTier?.()||0))>=1;}
function ensurePreferences(){
  const current=gameState();
  if(!current)return {enabled:true,lowPerformance:false};
  current.v6=current.v6&&typeof current.v6==='object'?current.v6:{};
  if(typeof current.v6.characterAnimations!=='boolean')current.v6.characterAnimations=true;
  if(typeof current.v6.characterLowPerformance!=='boolean')current.v6.characterLowPerformance=false;
  return {enabled:current.v6.characterAnimations!==false,lowPerformance:current.v6.characterLowPerformance===true};
}
function savePreferences(){try{if(typeof save==='function')save();}catch{}}
function applyPreferences(){
  const preferences=ensurePreferences();
  document.body.dataset.characterAnimations=String(preferences.enabled);
  document.body.dataset.characterPerformance=preferences.lowPerformance?'low':'full';
  document.body.dataset.characterSupporterPoses=String(supporterPosesUnlocked());
  return preferences;
}
function escapeHtml(value){return String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));}
function hash(value){let result=2166136261;for(let index=0;index<value.length;index++){result^=value.charCodeAt(index);result=Math.imul(result,16777619);}return (result>>>0).toString(36);}
function avatarMarkup(){
  if(typeof window.japaneseMinerCharacterMarkup==='function')return window.japaneseMinerCharacterMarkup('large');
  return '<div class="lm-character-fallback" aria-label="Miner character">🧑‍🏭</div>';
}
function contextCopy(context,activity=''){
  if(context==='lesson')return ['LESSON PARTNER','Your miner is reviewing this lesson with you.','📖'];
  if(context==='arcade'){
    const activities={shooter:['Your miner is defending the word line.','🛡️'],memory:['Your miner is searching the Memory Mine.','🧠'],matching:['Your miner is matching crystal words.','💎'],echo:['Your miner is listening to the cavern echo.','🔊'],grammar:['Your miner is forging a complete sentence.','⚒️'],treasure:['Your miner is following the translated map.','🗺️'],'crystal-memory':['Your miner is connecting crystal trios.','💎'],impostor:['Your miner is investigating the impostor word.','🕵️']},detail=activities[activity]||activities.memory;
    return ['ARCADE PARTNER',detail[0],detail[1]];
  }
  if(context==='settlement'){const detail=SETTLEMENT_ACTIVITY[activity]||SETTLEMENT_ACTIVITY.home;return ['SETTLEMENT ACTIVITY',detail[2],detail[1]];}
  return ['YOUR ACTIVE MINER','Tap your character for an encouraging phrase.','⛏️'];
}
function actorElement(context='mine',layout='mine',activity=''){
  const [label,contextDescription,prop]=contextCopy(context,activity),copy=currentKnown()==='en'?contextDescription:knownMotivation('encourage'),actor=document.createElement('aside');
  const propMarkup=context==='mine'?'<span class="lm-held-pickaxe-motion"><span class="lm-held-pickaxe"><i class="lm-held-pickaxe-shaft"></i><i class="lm-held-pickaxe-head"></i></span></span>':escapeHtml(prop);
  actor.className=`lm-character-actor lm-character-layout-${layout}`;
  actor.dataset.context=context;actor.dataset.activity=activity;actor.dataset.state=context==='lesson'?'lesson':'idle';
  actor.dataset.pose=supporterPosesUnlocked()?(SUPPORTER_POSES[actor.dataset.state]||'ready'):'neutral';
  actor.setAttribute('aria-label',`${label}. ${copy}`);
  actor.innerHTML=`<span class="lm-character-stage" role="button" tabindex="0" aria-label="Interact with your customized miner"><span class="lm-character-aura" aria-hidden="true"></span><span class="lm-character-avatar-shell">${avatarMarkup()}</span><span class="lm-character-prop" aria-hidden="true">${propMarkup}</span><span class="lm-character-particles" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></span></span><div class="lm-character-copy"><strong>${escapeHtml(label)}</strong><span class="lm-character-speech" aria-live="polite">${escapeHtml(copy)}</span></div><button class="lm-character-skip" type="button" hidden>Skip animation</button>`;
  actor.dataset.avatarSignature=hash(actor.querySelector('.lm-character-avatar-shell')?.innerHTML||'');
  bindActor(actor);syncAvatar(actor);return actor;
}
function syncAvatar(root){root.querySelectorAll('.miner-avatar').forEach(avatar=>window.syncJapaneseMinerRenderedLayers?.(avatar));}
function refreshAvatar(actor){
  if(!actor)return;const markup=avatarMarkup(),signature=hash(markup),shell=actor.querySelector('.lm-character-avatar-shell');
  if(!shell||actor.dataset.avatarSignature===signature)return;
  shell.innerHTML=markup;actor.dataset.avatarSignature=signature;syncAvatar(actor);
}
function bindActor(actor){
  const interact=()=>{if(actor.dataset.context==='mine'){if(actor.dataset.state!=='mining')play('mining',{context:'mine'});return;}touchReaction(actor);};
  const stage=actor.querySelector('.lm-character-stage');stage?.addEventListener('click',interact);stage?.addEventListener('keydown',event=>{if(event.key!=='Enter'&&event.key!==' ')return;event.preventDefault();interact();});
  actor.querySelector('.lm-character-skip')?.addEventListener('click',event=>{event.stopPropagation();if(actor.dataset.context==='mine')mineSwingUntil=0;settle(actor);});
}
function isVisible(actor){return actor?.isConnected&&actor.getClientRects().length>0;}
function settle(actor,speech=''){
  clearTimeout(timers.get(actor));timers.delete(actor);
  const now=performance.now(),remaining=mineSwingUntil-now;
  if(actor.dataset.context==='mine'&&actor.dataset.state==='mining'&&remaining>40){playOnActor(actor,'mining',{context:'mine',duration:remaining,animationElapsed:Math.max(0,now-mineSwingStartedAt),resume:true});return;}
  actor.style.removeProperty('--lm-mining-animation-delay');actor.dataset.state=actor.dataset.context==='lesson'?'lesson':'idle';
  actor.dataset.pose=supporterPosesUnlocked()?(SUPPORTER_POSES[actor.dataset.state]||'ready'):'neutral';
  const copy=actor.querySelector('.lm-character-speech');if(copy)copy.textContent=speech||stateSpeech('idle',actor.dataset.context);
  const skip=actor.querySelector('.lm-character-skip');if(skip)skip.hidden=true;
}
function currentKnown(){try{return String(window.LanguageMinerCourseCloud?.exportCurrent?.()?.known||window.LanguageMinerI18n?.getContext?.()?.known||'en');}catch{return'en';}}
function knownMotivation(kind='encourage',language=currentKnown()){
  const phrases=PHRASES[language]||PHRASES.en;
  return kind==='hello'?phrases[0]:kind==='praise'?phrases[2]:phrases[1];
}
function stateSpeech(name,context='mine'){
  if(currentKnown()!=='en')return knownMotivation(name==='correct'||name==='celebration'?'praise':'encourage');
  if(name==='mining')return 'Mining a new language challenge…';
  if(name==='correct')return 'Great answer! A new gem is yours.';
  if(name==='incorrect')return 'Good try—inspect it and try again.';
  if(name==='celebration')return context==='arcade'?'Arcade challenge complete!':'Milestone reached—amazing work!';
  if(name==='lesson')return 'Point, listen, read, and learn together.';
  if(name==='arcade')return 'Your miner is playing alongside you!';
  if(name==='settlement')return 'Your miner is helping the settlement grow.';
  return 'Ready for the next challenge!';
}
function playOnActor(actor,name,options={}){
  if(!actor||!applyPreferences().enabled)return;
  clearTimeout(timers.get(actor));
  if(options.activity){actor.dataset.activity=options.activity;const detail=contextCopy(actor.dataset.context,options.activity);actor.querySelector('.lm-character-prop').textContent=detail[2];}
  if(name==='mining')actor.style.setProperty('--lm-mining-animation-delay',`${-Math.max(0,Number(options.animationElapsed)||0)}ms`);else actor.style.removeProperty('--lm-mining-animation-delay');
  actor.dataset.state='';void actor.offsetWidth;actor.dataset.state=name;
  actor.dataset.pose=supporterPosesUnlocked()?(SUPPORTER_POSES[name]||'ready'):'neutral';
  const copy=actor.querySelector('.lm-character-speech');if(copy)copy.textContent=options.speech||stateSpeech(name,actor.dataset.context);
  const reduced=document.body.dataset.reducedMotion==='true'||matchMedia('(prefers-reduced-motion: reduce)').matches;
  const duration=Number(options.duration??DURATIONS[name]??900),skip=actor.querySelector('.lm-character-skip');if(skip)skip.hidden=!duration||reduced;
  if(duration){const performanceCap=name==='mining'?1880:720,actual=reduced?420:applyPreferences().lowPerformance?Math.min(duration,performanceCap):duration;timers.set(actor,setTimeout(()=>settle(actor),actual));}
}
function actorsFor(context=''){
  decorateContexts();const all=[...document.querySelectorAll('.lm-character-actor')].filter(isVisible);
  const selected=context?all.filter(actor=>actor.dataset.context===context):all;
  return selected.length?selected:all.filter(actor=>actor.dataset.context==='mine');
}
function play(name,options={}){
  const context=options.context||'',duration=Number(options.duration??DURATIONS[name]??900);
  if(name==='mining'&&context==='mine'&&!options.resume){mineSwingStartedAt=performance.now();mineSwingUntil=mineSwingStartedAt+duration;}
  const animationElapsed=name==='mining'&&context==='mine'?Math.max(0,performance.now()-mineSwingStartedAt):0;
  actorsFor(context).forEach(actor=>playOnActor(actor,name,name==='mining'?{...options,animationElapsed}:options));
}
function speakPhrase(text,language){
  const current=gameState();if(current?.voiceEnabled===false||typeof speechSynthesis==='undefined'||typeof SpeechSynthesisUtterance==='undefined')return;
  try{if(typeof silentTestingActive==='function'&&silentTestingActive())return;}catch{}
  try{const tag=VOICE_TAGS[language]||language;if(tag&&window.LanguageMinerSpeech?.pronounce)window.LanguageMinerSpeech.pronounce(text,tag,.88);}catch{}
}
function touchReaction(actor){
  const language=currentKnown(),phrases=PHRASES[language]||PHRASES.en,phrase=phrases[phraseIndex++%phrases.length];
  playOnActor(actor,'wave',{speech:phrase,duration:DURATIONS.wave});speakPhrase(phrase,language);
}
function milestone(streak){
  let toast=document.getElementById('lmCharacterMilestone');if(!toast){toast=document.createElement('div');toast.id='lmCharacterMilestone';toast.className='lm-character-milestone';toast.setAttribute('role','status');document.body.appendChild(toast);}
  toast.innerHTML=`<span>🔥</span><div><strong>${streak}-answer streak!</strong><small>Your customized miner is celebrating with you.</small></div>`;
  toast.classList.remove('show');void toast.offsetWidth;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2600);
}
function onPositive(message=''){
  const current=gameState(),streak=Math.max(0,Number(current?.streak)||0),answer=String(message).startsWith('Correct!');
  if(answer&&streak>=5&&streak%5===0&&streak!==lastCelebratedStreak){lastCelebratedStreak=streak;play('celebration',{speech:currentKnown()==='en'?`${streak} correct answers in a row!`:`${streak}! ${knownMotivation('praise')}`,duration:2100});milestone(streak);return;}
  if(/cleared|complete|passed|defeated|unlocked|upgraded|purchased|achievement/i.test(String(message)))play('celebration',{duration:1800});
  else play('correct');
}
function onNegative(){play('incorrect');}
function wrapMessages(){
  const original=window.setMessage;if(typeof original!=='function'||original.__lmCharacterAnimations)return;
  const wrapped=function(text,type){const result=original.apply(this,arguments);if(type==='correct')onPositive(text);else if(type==='wrong')onNegative(text);return result;};
  wrapped.__lmCharacterAnimations=true;wrapped.__lmCharacterOriginal=original;window.setMessage=wrapped;
}
function decorateMine(){
  const mine=document.querySelector('.panel.mine');if(!mine)return;
  mine.classList.add('mine-has-character');
  let actor=mine.querySelector(':scope>.lm-character-actor[data-context="mine"]'),created=false;
  if(!actor){actor=actorElement('mine','mine');created=true;const cave=mine.querySelector('.cave-scene');cave?.insertAdjacentElement('afterend',actor);if(!cave)mine.prepend(actor);}
  refreshAvatar(actor);
  const now=performance.now(),remaining=mineSwingUntil-now;
  if(remaining>40&&(!timers.has(actor)||actor.dataset.state!=='mining')){const animationElapsed=Math.max(0,now-mineSwingStartedAt);requestAnimationFrame(()=>{if(actor.isConnected)playOnActor(actor,'mining',{context:'mine',duration:remaining,animationElapsed,resume:true});});}
}
function assessmentActive(){
  if(document.body?.classList.contains('boss-question-active'))return true;
  return [
    '#academyOverlay.open .jlpt-review-quiz',
    '#academyOverlay.open .lm-review-quiz',
    '#academyOverlay.open .lm-perfect-gate-question',
    '#placementOverlay.open .placement-question',
    '#languageCourseOverlay.open .lm-placement-question',
    '#languageCourseOverlay.open .lm-review-quiz',
    '#languageCourseOverlay.open .lm-perfect-gate-question',
    '#challengeArea .lm-review-quiz',
    '#challengeArea .lm-perfect-gate-question'
  ].some(selector=>[...document.querySelectorAll(selector)].some(element=>element.getClientRects().length>0));
}
function syncAssessmentSafety(){
  const active=assessmentActive();document.body?.classList.toggle('lm-assessment-active',active);
  if(active)document.querySelectorAll('.lm-character-actor[data-context="lesson"]').forEach(actor=>actor.remove());
  return active;
}
function decorateLesson(){
  if(syncAssessmentSafety())return;
  const roots=[...document.querySelectorAll('#academyOverlay.open .lesson-preview,#academyOverlay.open .lesson-preview-complete,#academyOverlay.open .course-focus')].filter(root=>root.getClientRects().length>0&&!root.matches('.jlpt-review-quiz,.lm-review-quiz,.lm-perfect-gate-question'));
  const root=roots[0];
  document.querySelectorAll('.lm-character-actor[data-context="lesson"]').forEach(actor=>{if(!root||!root.contains(actor))actor.remove();});
  if(!root)return;
  const existing=[...root.querySelectorAll('.lm-character-actor[data-context="lesson"]')];let actor=existing.shift();existing.forEach(duplicate=>duplicate.remove());
  if(!actor)actor=actorElement('lesson','card','study');
  if(actor.parentElement!==root){const head=[...root.children].find(child=>child.matches?.('.lesson-preview-head,.course-kicker,.lesson-review-check'));if(head)head.insertAdjacentElement('afterend',actor);else root.prepend(actor);}
  refreshAvatar(actor);if(root.matches('.lesson-preview-complete'))playOnActor(actor,'celebration',{speech:currentKnown()==='en'?'Lesson review complete!':knownMotivation('praise'),duration:1700});else if(!timers.has(actor))actor.dataset.state='lesson';
}
function arcadeActivity(){
  if(document.querySelector('.arcade-shooter-field'))return'shooter';if(document.querySelector('.arcade-echo-stage'))return'echo';if(document.querySelector('.arcade-grammar-forge'))return'grammar';if(document.querySelector('.arcade-treasure-game'))return'treasure';if(document.querySelector('.arcade-crystal-memory-grid'))return'crystal-memory';if(document.querySelector('.arcade-impostor-game'))return'impostor';if(document.querySelector('.arcade-memory-grid'))return'memory';if(document.querySelector('.arcade-match-board'))return'matching';return'';
}
function decorateArcade(){
  const overlay=document.getElementById('arcadeOverlay');if(!overlay?.classList.contains('open'))return;
  const root=overlay.querySelector('.arcade-results,.arcade-game-head');if(!root)return;const activity=arcadeActivity()||'memory';
  let actor=root.parentElement?.querySelector(':scope>.lm-character-actor[data-context="arcade"]');
  if(!actor){actor=actorElement('arcade','card',activity);root.insertAdjacentElement('afterend',actor);}
  actor.dataset.activity=activity;refreshAvatar(actor);
  const results=overlay.querySelector('.arcade-results');if(results&&!seenArcadeResults.has(results)){seenArcadeResults.add(results);playOnActor(actor,'celebration',{speech:currentKnown()==='en'?'Arcade challenge complete!':knownMotivation('praise'),duration:2000});}
}
function selectedSettlement(){
  const title=document.querySelector('#v5Overlay.open .settlement-building-detail h3')?.textContent||'';
  return Object.keys(SETTLEMENT_ACTIVITY).find(id=>title.toLowerCase().includes(id==='home'?'lodge':id))||lastSettlementActivity||'home';
}
function decorateSettlement(){
  const map=document.querySelector('#v5Overlay.open .settlement-village-map');if(!map)return;const activity=selectedSettlement();
  let actor=map.querySelector(':scope>.lm-character-actor[data-context="settlement"]');
  if(!actor){actor=actorElement('settlement','map',activity);map.appendChild(actor);}actor.dataset.activity=activity;
  const detail=contextCopy('settlement',activity);actor.querySelector('.lm-character-prop').textContent=detail[2];actor.querySelector('.lm-character-speech').textContent=currentKnown()==='en'?detail[1]:knownMotivation('encourage');refreshAvatar(actor);
}
function injectSettings(){
  const grid=document.querySelector('#v6SettingsContent .v6-settings-grid');if(!grid||grid.querySelector('#lmCharacterAnimations'))return;const preferences=ensurePreferences();
  grid.insertAdjacentHTML('beforeend',`<label class="v6-switch lm-character-setting"><input id="lmCharacterAnimations" type="checkbox" ${preferences.enabled?'checked':''}><span>Show interactive character animations</span></label><label class="v6-switch lm-character-setting"><input id="lmCharacterLowPerformance" type="checkbox" ${preferences.lowPerformance?'checked':''}><span>Low-performance character mode</span></label>`);
  document.getElementById('lmCharacterAnimations').onchange=event=>{const current=gameState();if(!current)return;current.v6.characterAnimations=event.target.checked;applyPreferences();savePreferences();};
  document.getElementById('lmCharacterLowPerformance').onchange=event=>{const current=gameState();if(!current)return;current.v6.characterLowPerformance=event.target.checked;applyPreferences();savePreferences();};
}
function inspectArcadeFeedback(){
  const overlay=document.getElementById('arcadeOverlay');if(!overlay?.classList.contains('open')){lastArcadeSignal='';return;}
  const correct=overlay.querySelectorAll('.matched,.aligned-correct').length,wrong=overlay.querySelectorAll('.wrong,.aligned-wrong').length,signal=`${correct}:${wrong}`;
  if(signal===lastArcadeSignal)return;const previous=lastArcadeSignal;lastArcadeSignal=signal;if(!previous)return;
  const [oldCorrect,oldWrong]=previous.split(':').map(Number);if(correct>oldCorrect)play('correct',{context:'arcade'});else if(wrong>oldWrong)play('incorrect',{context:'arcade'});
}
function decorateContexts(){
  decorateQueued=false;applyPreferences();syncAssessmentSafety();decorateMine();decorateLesson();decorateArcade();decorateSettlement();document.querySelectorAll('.lm-character-actor').forEach(actor=>{actor.dataset.pose=supporterPosesUnlocked()?(SUPPORTER_POSES[actor.dataset.state]||'ready'):'neutral';if(timers.has(actor))return;const speech=actor.querySelector('.lm-character-speech');if(speech)speech.textContent=stateSpeech(actor.dataset.context==='lesson'?'lesson':'idle',actor.dataset.context);});injectSettings();inspectArcadeFeedback();
}
function scheduleDecorate(){if(decorateQueued)return;decorateQueued=true;requestAnimationFrame(decorateContexts);}
function bindInteractions(){
  document.addEventListener('click',event=>{
    const target=event.target.closest?.('button,.rock');if(!target)return;
    if(target.matches('#rock,#quickMineBtn,#nextBtn'))play('mining',{context:'mine'});
    else if(target.matches('[data-vocab-preview-next],[data-section-preview-next],[data-vocab-preview-speak],[data-section-preview-speak]'))play('lesson',{context:'lesson',duration:700});
    else if(target.matches('[data-memory-card],[data-crystal-card],[data-echo-choice],[data-grammar-token],[data-treasure-direction],[data-impostor-choice],.arcade-match-board button,.arcade-shooter-controls button,.arcade-forge-actions button,.arcade-audio-button'))play('arcade',{context:'arcade',activity:arcadeActivity(),duration:700});
    const settlement=target.dataset?.settlementFocus||target.dataset?.building;if(settlement){lastSettlementActivity=settlement;setTimeout(()=>{scheduleDecorate();play('settlement',{context:'settlement',activity:settlement});},80);}
  },true);
  window.addEventListener('lm-character-animation',event=>play(String(event.detail?.state||'idle'),event.detail||{}));
}
function init(){
  applyPreferences();wrapMessages();bindInteractions();decorateContexts();
  const observerRoot=document.body||document.documentElement;
  try{
    if(!observerRoot||observerRoot.nodeType!==1||typeof window.MutationObserver!=='function')throw new Error('MutationObserver unavailable');
    const observer=new window.MutationObserver(scheduleDecorate);
    observer.observe(observerRoot,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});
  }catch(_error){window.setInterval(scheduleDecorate,700);}
  window.addEventListener('jm-supporter-entitlement-changed',scheduleDecorate);
  window.addEventListener('lm-course-settings-saved',scheduleDecorate);
}
window.LanguageMinerCharacterAnimations=Object.freeze({play,refresh:scheduleDecorate,skip:()=>actorsFor().forEach(actor=>settle(actor)),preferences:()=>({...ensurePreferences()})});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
