// Language Miner v6.4.141 - learner-approved, read-only progress sharing across devices.
(()=>{
  'use strict';
  const LINK_KEY='lm_parent_teacher_links_v1';
  let selectedLearnerId='',activeTab='overview',activeView='dashboard';
  let cloudLinks=[],cloudSummaries=new Map(),cloudBusy=false,cloudError='',cloudLastSync=0,cloudTimer=0;
  const bridge=()=>window.LanguageMinerReadOnly;
  const cloud=()=>window.languageMinerCloudAuth;
  const current=()=>bridge()?.activeProfile?.()||null;
  const profiles=()=>bridge()?.profiles?.()||[];
  const t=value=>{
    const source=String(value),packs=window.LANGUAGE_MINER_PARENT_TEACHER_TRANSLATIONS||{},english=packs.en||{};
    const locale=document.documentElement.dataset.lmKnownLanguage||window.LanguageMinerI18n?.getLocale?.()||'en';
    const key=Object.keys(english).find(item=>english[item]===source);
    return (key&&packs[locale]?.[key])||window.LanguageMinerI18n?.translate?.(source)||source;
  };
  const esc=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const languageDisplayCode={zh:'zh-Hans',pt:'pt-BR'};
  function locale(){return document.documentElement.dataset.lmKnownLanguage||window.LanguageMinerI18n?.getLocale?.()||'en';}
  function languageName(code,fallback){try{return new Intl.DisplayNames([locale()],{type:'language'}).of(languageDisplayCode[code]||code)||fallback;}catch{return fallback;}}
  function courseLevelName(course,level){return course.learning!=='ja'?`${languageName(course.learning,course.learningName)} ${t('Level')} ${level.index+1}`:t(level.name);}
  function recordLabel(value){const exact=t(value);if(exact!==value)return exact;return String(value).replace(/\bLevel\b/g,t('Level')).replace(/\bReview\b/g,t('Review')).replace(/\bGuardian\b/g,t('Guardian'));}
  const uid=()=>`ptc-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,9)}`;
  const linkLabel=status=>status==='approved'?t('Approved'):status==='pending'?t('Awaiting approval'):t('Declined');
  const previewCloudMode=()=>window.LANGUAGE_MINER_PREVIEW===true&&!String(current()?.cloudUserId||'');
  const currentCloudUserId=()=>String(current()?.cloudUserId||cloud()?.getSession?.()?.user?.id||(previewCloudMode()?'preview-cloud-adult':''));
  const cloudReady=()=>previewCloudMode()||!!(currentCloudUserId()&&cloud()?.enabled?.()&&cloud()?.listParentTeacherLinks);
  function readLinks(){
    try{
      const value=JSON.parse(localStorage.getItem(LINK_KEY)||'[]');
      if(!Array.isArray(value))return[];
      const knownIds=new Set(profiles().map(profile=>profile.id));
      return value.filter(link=>link&&knownIds.has(String(link.adultProfileId))&&knownIds.has(String(link.studentProfileId))&&link.adultProfileId!==link.studentProfileId&&['pending','approved','declined'].includes(link.status)).map(link=>({id:String(link.id||uid()),adultProfileId:String(link.adultProfileId),studentProfileId:String(link.studentProfileId),status:String(link.status),requestedAt:Number(link.requestedAt)||Date.now(),respondedAt:Number(link.respondedAt)||0}));
    }catch{return[];}
  }
  function writeLinks(links){
    localStorage.setItem(LINK_KEY,JSON.stringify(links));
    window.dispatchEvent(new CustomEvent('lm-parent-teacher-access-changed'));
  }
  function normalizeCloudLink(row){
    const adultUserId=String(row?.adult_user_id||''),studentUserId=String(row?.student_user_id||'');
    return {id:`cloud:${row?.id||uid()}`,cloud:true,cloudId:String(row?.id||''),adultUserId,studentUserId,adultProfileId:`cloud:${adultUserId}`,studentProfileId:`cloud:${studentUserId}`,adultName:String(row?.adult_display_name||t('Parent or teacher')),studentName:String(row?.student_display_name||t('Learner')),adultEmail:String(row?.adult_email||''),studentEmail:String(row?.student_email||''),status:String(row?.status||'pending'),requestedAt:Date.parse(String(row?.requested_at||''))||Date.now(),respondedAt:Date.parse(String(row?.responded_at||''))||0};
  }
  function isAdult(link){return link.cloud?link.adultUserId===currentCloudUserId():link.adultProfileId===current()?.id;}
  function isStudent(link){return link.cloud?link.studentUserId===currentCloudUserId():link.studentProfileId===current()?.id;}
  function profileName(id){
    const local=profiles().find(profile=>profile.id===id);if(local)return local.name;
    const remote=cloudLinks.find(link=>link.adultProfileId===id||link.studentProfileId===id);
    if(remote)return remote.adultProfileId===id?remote.adultName:remote.studentName;
    return t('Player');
  }
  function allLinks(){return [...readLinks(),...cloudLinks];}
  function approvedLearners(){
    const local=readLinks().filter(link=>isAdult(link)&&link.status==='approved').map(link=>profiles().find(profile=>profile.id===link.studentProfileId)).filter(Boolean);
    const remote=cloudLinks.filter(link=>isAdult(link)&&link.status==='approved').map(link=>({id:link.studentProfileId,name:link.studentName,email:link.studentEmail,cloudUserId:link.studentUserId,source:'cloud'}));
    const found=new Map();[...local,...remote].forEach(profile=>found.set(profile.id,profile));return [...found.values()];
  }
  function incomingRequests(){return allLinks().filter(link=>isStudent(link)&&link.status==='pending');}
  function centerOpen(){return document.getElementById('parentTeacherCenter')?.classList.contains('open');}
  function cloudTime(value){if(!value)return t('Not synced yet');try{return new Date(value).toLocaleString(locale(),{dateStyle:'medium',timeStyle:'short'});}catch{return new Date(value).toLocaleString();}}
  async function syncCloudData(announce=false){
    if(!cloudReady()){cloudLinks=[];cloudSummaries=new Map();cloudError='';if(centerOpen())render();return false;}
    if(previewCloudMode()){cloudError='';cloudLastSync=Date.now();if(announce)window.setMessage?.(t('Preview cross-device progress refreshed.'),'correct');if(centerOpen())render();return true;}
    if(cloudBusy)return false;cloudBusy=true;cloudError='';if(centerOpen())render();
    try{
      await window.languageMinerPushCloudSave?.();
      const rows=await cloud().listParentTeacherLinks();cloudLinks=rows.map(normalizeCloudLink);
      const approved=cloudLinks.filter(link=>isAdult(link)&&link.status==='approved'),summaries=new Map();
      await Promise.all(approved.map(async link=>{const record=await cloud().loadLinkedLearnerProgress(link.studentUserId);const summary=bridge()?.cloudLearnerSummary?.(record);if(summary)summaries.set(link.studentProfileId,summary);}));
      cloudSummaries=summaries;cloudLastSync=Date.now();
      if(announce)window.setMessage?.(t('Linked learner progress refreshed from the cloud.'),'correct');
      return true;
    }catch(error){cloudError=String(error?.message||error||t('Cloud learner data is temporarily unavailable.'));if(announce)window.setMessage?.(cloudError,'wrong');return false;}
    finally{cloudBusy=false;const learners=approvedLearners();if(!selectedLearnerId||!learners.some(item=>item.id===selectedLearnerId))selectedLearnerId=learners[0]?.id||'';if(centerOpen())render();}
  }
  function startCloudRefresh(){clearInterval(cloudTimer);cloudTimer=setInterval(()=>{if(centerOpen()&&!document.hidden)syncCloudData(false);},30000);}
  function seedPreviewAccess(){
    if(window.LANGUAGE_MINER_PREVIEW!==true)return;
    const adult=current();if(!adult||!['codex-preview','codex-preview-player'].includes(adult.id))return;const candidates=profiles().filter(profile=>profile.id!==adult.id&&profile.id.startsWith('preview-player-')).slice(0,2);if(!candidates.length)return;
    const links=readLinks();let changed=false;
    candidates.forEach(student=>{if(links.some(link=>link.adultProfileId===adult.id&&link.studentProfileId===student.id&&link.status!=='declined'))return;links.push({id:uid(),adultProfileId:adult.id,studentProfileId:student.id,status:'approved',requestedAt:Date.now()-86400000*5,respondedAt:Date.now()-86400000*4});changed=true;});
    if(changed)writeLinks(links);
  }
  function ensureShell(){
    if(document.getElementById('parentTeacherCenter'))return;
    document.body.insertAdjacentHTML('beforeend',`<div id="parentTeacherCenter" class="ptc-overlay" aria-hidden="true"><section class="ptc-panel" role="dialog" aria-modal="true" aria-labelledby="ptcTitle"><header class="ptc-head"><button id="ptcBackMenu" class="menu-back-button" type="button">← ${esc(t('Menu'))}</button><div><span>${esc(t('READ-ONLY LEARNER INSIGHTS'))}</span><h2 id="ptcTitle">🏫 ${esc(t('Parent/Teacher Center'))}</h2></div><button id="ptcClose" class="ptc-close" type="button" aria-label="${esc(t('Close Parent/Teacher Center'))}">×</button></header><main id="ptcContent" class="ptc-content"></main></section></div>`);
    const overlay=document.getElementById('parentTeacherCenter');
    document.getElementById('ptcClose').onclick=closeCenter;
    document.getElementById('ptcBackMenu').onclick=()=>{closeCenter();setTimeout(()=>document.getElementById('gameMenuBtn')?.click(),0);};
    overlay.onclick=event=>{if(event.target===overlay)closeCenter();};
    document.getElementById('ptcContent').onclick=handleAction;
    document.getElementById('ptcContent').onsubmit=handleSubmit;
  }
  function openCenter(view='dashboard'){
    if(!current()){window.setMessage?.(t('Sign in to a player profile before opening the Parent/Teacher Center.'),'wrong');return false;}
    const gameMenu=document.getElementById('gameMenuOverlay');gameMenu?.classList.remove('open');gameMenu?.setAttribute('aria-hidden','true');document.getElementById('gameMenuBtn')?.setAttribute('aria-expanded','false');
    seedPreviewAccess();ensureShell();activeView=['dashboard','manage','link'].includes(view)?view:'dashboard';
    const learners=approvedLearners();if(!selectedLearnerId||!learners.some(item=>item.id===selectedLearnerId))selectedLearnerId=learners[0]?.id||'';
    const overlay=document.getElementById('parentTeacherCenter');overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');render();window.syncJapaneseMinerPageScroll?.();
    startCloudRefresh();syncCloudData(false);setTimeout(()=>document.querySelector('#ptcContent button:not([disabled])')?.focus(),0);return true;
  }
  function closeCenter(){const overlay=document.getElementById('parentTeacherCenter');if(!overlay)return;overlay.classList.remove('open');overlay.setAttribute('aria-hidden','true');clearInterval(cloudTimer);cloudTimer=0;window.syncJapaneseMinerPageScroll?.();}
  function refreshHeader(){const root=document.getElementById('parentTeacherCenter');if(!root)return;root.querySelector('.ptc-head>div>span').textContent=t('READ-ONLY LEARNER INSIGHTS');document.getElementById('ptcTitle').textContent=`🏫 ${t('Parent/Teacher Center')}`;document.getElementById('ptcBackMenu').textContent=`← ${t('Menu')}`;document.getElementById('ptcClose').setAttribute('aria-label',t('Close Parent/Teacher Center'));}
  function privacyBanner(){return `<aside class="ptc-privacy"><span>🛡️</span><div><strong>${esc(t('Read-only means read-only'))}</strong><p>${esc(t('Adults can review approved progress summaries. They cannot answer questions, spend Nuggets, reset progress, or read private Notebook notes.'))}</p></div></aside>`;}
  function requestCards(){
    const incoming=incomingRequests();if(!incoming.length)return'';
    return `<section class="ptc-requests"><header><span>${esc(t('STUDENT APPROVAL REQUIRED'))}</span><h3>${esc(t('Requests awaiting your approval'))}</h3><p>${esc(t('Only this learner account can approve or decline these requests.'))}</p></header>${incoming.map(link=>`<article><div><strong>${esc(profileName(link.adultProfileId))}</strong><small>${esc(t('wants read-only access to your learning summaries'))}${link.cloud?` · ${esc(t('Cross-device request'))}`:''}</small></div><div><button type="button" data-ptc-decline="${esc(link.id)}">${esc(t('Decline'))}</button><button class="primary" type="button" data-ptc-approve="${esc(link.id)}">${esc(t('Approve'))}</button></div></article>`).join('')}</section>`;
  }
  function cloudStatus(){
    if(!cloudReady())return `<aside class="ptc-cloud-status offline"><span>☁️</span><div><strong>${esc(t('Cross-device linking needs an online account'))}</strong><small>${esc(t('Sign in on both devices with separate Language Miner accounts.'))}</small></div></aside>`;
    if(previewCloudMode())return `<aside class="ptc-cloud-status"><span>🧪</span><div><strong>${esc(t('Cross-device linking preview'))}</strong><small>${esc(t('Requests entered here stay inside this playable preview. The packaged build uses signed-in cloud accounts.'))}</small></div><button type="button" data-ptc-refresh>↻ ${esc(t('Refresh'))}</button></aside>`;
    return `<aside class="ptc-cloud-status ${cloudError?'error':''}"><span>${cloudBusy?'⏳':'☁️'}</span><div><strong>${esc(cloudBusy?t('Refreshing linked progress…'):cloudError?t('Cloud refresh needs attention'):t('Cross-device progress is connected'))}</strong><small>${esc(cloudError||`${t('Last refreshed')}: ${cloudTime(cloudLastSync)}`)}</small></div><button type="button" data-ptc-refresh ${cloudBusy?'disabled':''}>↻ ${esc(t('Refresh'))}</button></aside>`;
  }
  function centerIntro(){return `<section class="ptc-intro"><div><span>${esc(t('FAMILY & CLASSROOM VIEW'))}</span><h3>${esc(t('Clear progress without gameplay controls'))}</h3><p>${esc(t('Switch between learners who approved access, then review their latest cloud-synced activity, course progress, due reviews, assessments, and personal best times.'))}</p></div><div class="ptc-intro-actions"><button type="button" data-ptc-view="manage">⚙️ ${esc(t('Manage access'))}</button><button class="primary" type="button" data-ptc-view="link">＋ ${esc(t('Link student'))}</button></div></section>${cloudStatus()}`;}
  function learnerSwitcher(learners){
    if(!learners.length)return `<section class="ptc-empty"><span>👥</span><h3>${esc(t('No approved learners yet'))}</h3><p>${esc(t('Use Link student to send a request. The student must sign in to their own profile and approve it before any progress appears here.'))}</p><button class="primary" type="button" data-ptc-view="link">＋ ${esc(t('Link student'))}</button></section>`;
    return `<section class="ptc-switcher"><header><div><span>${esc(t('LINKED LEARNERS'))}</span><h3>${esc(t('Switch student'))}</h3></div><small>${learners.length} ${esc(t(learners.length===1?'approved learner':'approved learners'))}</small></header><div>${learners.map(profile=>`<button type="button" data-ptc-learner="${esc(profile.id)}" class="${profile.id===selectedLearnerId?'active':''}"><span>${esc(profile.name.slice(0,1).toUpperCase())}</span><strong>${esc(profile.name)}</strong><small>${esc(t(profile.id===selectedLearnerId?'Viewing now':'View progress'))}</small></button>`).join('')}</div></section>`;
  }
  function metric(label,value,help,icon){return `<article class="ptc-metric"><span>${icon} ${esc(t(label))}</span><strong>${esc(value)}</strong><small>${esc(t(help))}</small></article>`;}
  function duration(milliseconds){const total=Math.max(0,Math.floor(Number(milliseconds)||0)),minutes=Math.floor(total/60000),hours=Math.floor(minutes/60);if(hours)return `${hours}h ${minutes%60}m`;if(minutes)return `${minutes}m`;return `${Math.floor(total/1000)}s`;}
  function recordTime(milliseconds){if(!milliseconds)return t('No record yet');const seconds=Math.floor(milliseconds/1000),minutes=Math.floor(seconds/60),hours=Math.floor(minutes/60);return hours?`${hours}:${String(minutes%60).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`:`${minutes}:${String(seconds%60).padStart(2,'0')}`;}
  function dateLabel(value){if(!value)return t('Date not recorded');try{return new Date(value.length===10?`${value}T12:00:00`:Number(value)).toLocaleDateString(locale(),{month:'short',day:'numeric',year:'numeric'});}catch{return String(value);}}
  function summaryHeader(summary){return `<section class="ptc-learner-head"><div class="ptc-learner-avatar">${esc(summary.profile.name.slice(0,1).toUpperCase())}</div><div><span>${esc(t('LEARNER PROGRESS'))}</span><h3>${esc(summary.profile.name)}</h3><p>${esc(languageName(summary.course.known,summary.course.knownName))} → ${esc(languageName(summary.course.learning,summary.course.learningName))} · ${esc(t('Player Level'))} ${summary.level}${summary.cloudUpdatedAt?` · ${esc(t('Synced'))} ${esc(cloudTime(summary.cloudUpdatedAt))}`:''}</p></div><b>🔒 ${esc(t('Read-only'))}</b></section>`;}
  function summaryMetrics(summary){const recorded=Object.values(summary.assessments.fastest).filter(Boolean),best=recorded.length?Math.min(...recorded):0,selected=summary.course.levels[summary.course.selectedLevel];return `<section class="ptc-metrics">${metric('Current streak',`${summary.activity.currentStreak} ${t(summary.activity.currentStreak===1?'day':'days')}`,'Consecutive recorded study days','🔥')}${metric('Due reviews',summary.reviews.dueCount.toLocaleString(),'Smart Review items ready now','🧠')}${metric('Course progress',`${summary.course.overallPercent}%`,selected?courseLevelName(summary.course,selected):summary.course.selectedLabel,'🗺️')}${metric('Fastest time',recordTime(best),'Best eligible assessment','⏱️')}</section>`;}
  function tabs(){return `<nav class="ptc-tabs" aria-label="${esc(t('Learner report sections'))}">${[['overview','Overview'],['activity','Activity & Calendar'],['course','Course Progress'],['assessments','Assessments & Fastest Times']].map(([id,label])=>`<button type="button" data-ptc-tab="${id}" class="${activeTab===id?'active':''}">${esc(t(label))}</button>`).join('')}</nav>`;}
  function overview(summary){
    const distribution=summary.questions.distribution,max=Math.max(1,...Object.values(distribution));
    return `<section class="ptc-report-grid"><article class="ptc-report-card"><span>${esc(t('ACTIVITY SUMMARY'))}</span><h3>${esc(t('Learning at a glance'))}</h3><div class="ptc-facts"><p><small>${esc(t('Total questions'))}</small><strong>${summary.questions.answered.toLocaleString()}</strong></p><p><small>${esc(t('Overall accuracy'))}</small><strong>${summary.questions.accuracy}%</strong></p><p><small>${esc(t('Total study days'))}</small><strong>${summary.activity.totalStudyDays}</strong></p><p><small>${esc(t('Total study time'))}</small><strong>${duration(summary.activity.totalMilliseconds)}</strong></p></div></article><article class="ptc-report-card"><span>${esc(t('PRACTICE DISTRIBUTION'))}</span><h3>${esc(t('What has been practiced'))}</h3><div class="ptc-bars">${Object.entries(distribution).map(([name,value])=>`<div><label><span>${esc(t(name[0].toUpperCase()+name.slice(1)))}</span><b>${value.toLocaleString()}</b></label><i><b style="width:${Math.round(value/max*100)}%"></b></i></div>`).join('')}</div></article><article class="ptc-report-card ptc-wide"><span>${esc(t('UPCOMING STUDY'))}</span><h3>${esc(t('Review status'))}</h3><div class="ptc-review-facts"><p><strong>${summary.reviews.dueCount}</strong><span>${esc(t('due now'))}</span></p><p><strong>${summary.reviews.scheduledCount}</strong><span>${esc(t('scheduled items'))}</span></p><p><strong>${summary.reviews.completedReviews}</strong><span>${esc(t('completed reviews'))}</span></p><p><strong>${summary.reviews.nextDueAt?dateLabel(summary.reviews.nextDueAt):t('None scheduled')}</strong><span>${esc(t('next future review'))}</span></p></div></article></section>`;
  }
  function recentCalendar(summary){
    const byDate=new Map(summary.activity.days.map(day=>[day.date,day.milliseconds])),today=new Date(),cells=[];
    for(let offset=34;offset>=0;offset--){const date=new Date(today.getFullYear(),today.getMonth(),today.getDate()-offset),key=`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`,ms=byDate.get(key)||0;cells.push(`<div class="${byDate.has(key)?'studied':''}" title="${esc(key)}${ms?` · ${duration(ms)}`:''}"><span>${date.getDate()}</span>${ms?`<small>${duration(ms)}</small>`:''}</div>`);}
    const recent=summary.activity.recentDays;
    return `<section class="ptc-report-grid"><article class="ptc-report-card ptc-wide"><span>${esc(t('LAST 35 DAYS'))}</span><h3>${esc(t('Activity calendar'))}</h3><div class="ptc-calendar-week"><b>${esc(t('Sun'))}</b><b>${esc(t('Mon'))}</b><b>${esc(t('Tue'))}</b><b>${esc(t('Wed'))}</b><b>${esc(t('Thu'))}</b><b>${esc(t('Fri'))}</b><b>${esc(t('Sat'))}</b></div><div class="ptc-calendar">${cells.join('')}</div></article><article class="ptc-report-card ptc-wide"><span>${esc(t('RECENT HISTORY'))}</span><h3>${esc(t('Recorded study days'))}</h3>${recent.length?`<div class="ptc-table"><div class="ptc-table-head"><span>${esc(t('Date'))}</span><span>${esc(t('Study time'))}</span><span>${esc(t('Status'))}</span></div>${recent.map(day=>`<div><strong>${esc(dateLabel(day.date))}</strong><span>${esc(day.milliseconds?duration(day.milliseconds):t('Activity recorded'))}</span><b>✓ ${esc(t('Studied'))}</b></div>`).join('')}</div>`:`<div class="ptc-inline-empty">${esc(t('No study days have been recorded yet.'))}</div>`}</article></section>`;
  }
  function courseReport(summary){return `<section class="ptc-report-grid"><article class="ptc-report-card ptc-wide"><span>${esc(t('SELECTED COURSE'))}</span><h3>${esc(languageName(summary.course.learning,summary.course.learningName))}</h3><p>${esc(t('The learner’s current route and each level’s saved progress.'))}</p><div class="ptc-course-overall"><strong>${summary.course.overallPercent}%</strong><i><b style="width:${summary.course.overallPercent}%"></b></i><small>${esc(t('overall course progress'))}</small></div><div class="ptc-levels">${summary.course.levels.map(level=>{const xpPercent=Math.min(100,Math.round(level.xp/Math.max(1,level.xpRequired)*100));return `<article class="${level.selected?'selected':''} ${level.completed?'completed':''} ${!level.unlocked?'locked':''}"><span>${level.completed?'✓':level.unlocked?'◆':'🔒'}</span><div><strong>${esc(courseLevelName(summary.course,level))}</strong><small>${level.masteryRequired?`${level.mastery}% ${esc(t('mastery'))} · `:''}${level.xp.toLocaleString()} / ${level.xpRequired.toLocaleString()} XP</small><i><b style="width:${level.completed?100:xpPercent}%"></b></i></div><em>${esc(t(level.completed?'Complete':level.selected?'Current':level.unlocked?'Available':'Locked'))}</em></article>`;}).join('')}</div></article></section>`;}
  function assessments(summary){
    const fastest=summary.assessments.fastest,history=summary.assessments.history;
    return `<section class="ptc-report-grid"><article class="ptc-report-card ptc-wide"><span>${esc(t('PERSONAL BESTS'))}</span><h3>${esc(t('Fastest completion records'))}</h3><div class="ptc-records">${[['placement','Placement test'],['reviewQuiz','Passing review quiz'],['guardian','Perfect Guardian test']].map(([key,label])=>`<div class="${fastest[key]?'has-record':''}"><span>${esc(t(label))}</span><strong>${esc(recordTime(fastest[key]))}</strong><small>${esc(t(fastest[key]?'Fastest eligible completion':'No eligible result yet'))}</small></div>`).join('')}</div></article><article class="ptc-report-card ptc-wide"><span>${esc(t('ASSESSMENT HISTORY'))}</span><h3>${esc(t('Tests and quizzes'))}</h3>${history.length?`<div class="ptc-table ptc-assessment-table"><div class="ptc-table-head"><span>${esc(t('Assessment'))}</span><span>${esc(t('Result'))}</span><span>${esc(t('Fastest'))}</span></div>${history.map(record=>`<div><strong>${esc(recordLabel(record.type))}<small>${esc(languageName(summary.course.learning,record.course))}</small></strong><span>${esc(t(record.result))}${record.total?` · ${record.score}/${record.total}`:''}<small>${record.attempts} ${esc(t(record.attempts===1?'attempt':'attempts'))}</small></span><b>${esc(recordTime(record.fastestTimeMs))}</b></div>`).join('')}</div>`:`<div class="ptc-inline-empty">${esc(t('No assessment attempts have been recorded yet.'))}</div>`}</article></section>`;
  }
  function dashboard(){
    const learners=approvedLearners(),incoming=requestCards(),switcher=learnerSwitcher(learners);let report='';
    if(selectedLearnerId){const summary=selectedLearnerId.startsWith('cloud:')?cloudSummaries.get(selectedLearnerId):bridge()?.learnerSummary?.(selectedLearnerId);if(summary)report=`${summaryHeader(summary)}${summaryMetrics(summary)}${tabs()}<div class="ptc-report">${activeTab==='activity'?recentCalendar(summary):activeTab==='course'?courseReport(summary):activeTab==='assessments'?assessments(summary):overview(summary)}</div>`;else if(cloudBusy)report=`<section class="ptc-inline-empty">${esc(t('Loading the learner’s latest progress…'))}</section>`;}
    return `${incoming}${centerIntro()}${privacyBanner()}${switcher}${report}`;
  }
  function manageView(){
    const links=allLinks(),outgoing=links.filter(link=>isAdult(link)&&link.status!=='declined'),adultAccess=links.filter(link=>isStudent(link)&&link.status==='approved'),incoming=links.filter(link=>isStudent(link)&&link.status==='pending');
    const sourceLabel=link=>link.cloud?` · ${t('Across devices')}`:'';
    return `<button class="ptc-sub-back" type="button" data-ptc-view="dashboard">← ${esc(t('Back to Center'))}</button><section class="ptc-subhead"><span>${esc(t('CONSENT & ACCESS'))}</span><h3>⚙️ ${esc(t('Manage access'))}</h3><p>${esc(t('Review pending requests, approved learner links, and adults who can see this profile’s summaries.'))}</p></section>${cloudStatus()}${privacyBanner()}<section class="ptc-access-grid"><article><header><span>${esc(t('AS AN ADULT OR TEACHER'))}</span><h3>${esc(t('Learners you requested'))}</h3></header>${outgoing.length?outgoing.map(link=>`<div class="ptc-access-row"><span class="ptc-person">${esc(profileName(link.studentProfileId).slice(0,1).toUpperCase())}</span><div><strong>${esc(profileName(link.studentProfileId))}</strong><small>${esc(linkLabel(link.status)+sourceLabel(link))}</small></div><button type="button" data-ptc-remove="${esc(link.id)}">${esc(t(link.status==='pending'?'Cancel request':'Remove access'))}</button></div>`).join(''):`<p class="ptc-inline-empty">${esc(t('You have not requested access to a learner.'))}</p>`}<button class="primary ptc-full-button" type="button" data-ptc-view="link">＋ ${esc(t('Link student'))}</button></article><article><header><span>${esc(t('AS A LEARNER'))}</span><h3>${esc(t('Adults with access'))}</h3></header>${adultAccess.length?adultAccess.map(link=>`<div class="ptc-access-row"><span class="ptc-person">${esc(profileName(link.adultProfileId).slice(0,1).toUpperCase())}</span><div><strong>${esc(profileName(link.adultProfileId))}</strong><small>${esc(t('Approved read-only access')+sourceLabel(link))}</small></div><button type="button" data-ptc-revoke="${esc(link.id)}">${esc(t('Revoke'))}</button></div>`).join(''):`<p class="ptc-inline-empty">${esc(t('No adults currently have access to this profile.'))}</p>`}${incoming.length?`<h4>${esc(t('Pending requests'))}</h4>${incoming.map(link=>`<div class="ptc-access-row"><span class="ptc-person">${esc(profileName(link.adultProfileId).slice(0,1).toUpperCase())}</span><div><strong>${esc(profileName(link.adultProfileId))}</strong><small>${esc(t('Waiting for your decision')+sourceLabel(link))}</small></div><div class="ptc-row-actions"><button type="button" data-ptc-decline="${esc(link.id)}">${esc(t('Decline'))}</button><button class="primary" type="button" data-ptc-approve="${esc(link.id)}">${esc(t('Approve'))}</button></div></div>`).join('')}`:''}</article></section>`;
  }
  function linkView(){
    const me=current(),links=readLinks(),blocked=new Set(links.filter(link=>link.adultProfileId===me.id&&link.status!=='declined').map(link=>link.studentProfileId)),candidates=profiles().filter(profile=>profile.id!==me.id&&!blocked.has(profile.id));
    const cloudForm=cloudReady()?`<section class="ptc-cloud-link"><header><span>${esc(t('LINK ANOTHER DEVICE'))}</span><h3>${esc(t('Find the student’s account'))}</h3><p>${esc(t('Enter the exact email address they use to sign in to Language Miner.'))}</p></header><form data-ptc-cloud-form><label for="ptcStudentEmail">${esc(t('Student account email'))}</label><div><input id="ptcStudentEmail" name="studentEmail" type="email" inputmode="email" autocomplete="email" required placeholder="student@example.com"><button class="primary" type="submit" ${cloudBusy?'disabled':''}>＋ ${esc(t('Send request'))}</button></div><small>${esc(t('The learner must approve on their own account before any progress is shared.'))}</small></form></section>`:`<section class="ptc-cloud-link unavailable"><header><span>${esc(t('LINK ANOTHER DEVICE'))}</span><h3>${esc(t('Sign in to use cross-device linking'))}</h3><p>${esc(t('Both people need separate online Language Miner accounts. After signing in, enter the learner’s account email here.'))}</p></header></section>`;
    return `<button class="ptc-sub-back" type="button" data-ptc-view="dashboard">← ${esc(t('Back to Center'))}</button><section class="ptc-subhead"><span>${esc(t('STUDENT-CONTROLLED LINKING'))}</span><h3>＋ ${esc(t('Link student'))}</h3><p>${esc(t('Send a read-only access request to the learner’s account. Nothing is shared until that learner approves it.'))}</p></section><section class="ptc-link-note"><span>1</span><p><strong>${esc(t('Send request'))}</strong><small>${esc(t('Enter the learner’s account email.'))}</small></p><i></i><span>2</span><p><strong>${esc(t('Student approves'))}</strong><small>${esc(t('They sign in on their device and open this Center.'))}</small></p><i></i><span>3</span><p><strong>${esc(t('Progress stays current'))}</strong><small>${esc(t('Their cloud-saved progress becomes visible on your device.'))}</small></p></section>${cloudForm}<section class="ptc-candidates"><header><span>${esc(t('PROFILES ON THIS DEVICE'))}</span><h3>${esc(t('Optional local linking'))}</h3></header>${candidates.length?candidates.map(profile=>`<article><span>${esc(profile.name.slice(0,1).toUpperCase())}</span><div><strong>${esc(profile.name)}</strong><small>${profile.email?esc(profile.email):esc(t('Local player profile'))}</small></div><button class="primary" type="button" data-ptc-request="${esc(profile.id)}">${esc(t('Send request'))}</button></article>`).join(''):`<div class="ptc-inline-empty">${esc(t('No additional local profiles are available. Use the account email above to link another device.'))}</div>`}</section><aside class="ptc-device-note"><strong>${esc(t('Private and read-only'))}</strong><p>${esc(t('Approved adults can see learning progress, activity, reviews, course completion, and assessment records. They cannot play as the learner, spend anything, reset progress, or read private Notebook notes. The learner can revoke access at any time.'))}</p></aside>`;
  }
  function render(){const content=document.getElementById('ptcContent');if(!content)return;refreshHeader();content.innerHTML=activeView==='manage'?manageView():activeView==='link'?linkView():dashboard();window.LanguageMinerI18n?.localize?.(content);content.scrollTop=0;}
  async function updateLink(id,action){
    if(String(id).startsWith('cloud:')){
      const cloudId=String(id).slice(6);if(!cloudId||!cloudReady())return;
      if(previewCloudMode()){const index=cloudLinks.findIndex(link=>link.cloudId===cloudId);if(index<0)return;if(action==='remove'||action==='revoke')cloudLinks.splice(index,1);else if(action==='approve'||action==='decline'){cloudLinks[index].status=action==='approve'?'approved':'declined';cloudLinks[index].respondedAt=Date.now();}cloudLastSync=Date.now();render();return;}
      try{
        if(action==='approve'||action==='decline')await cloud().respondStudentLink(cloudId,action==='approve');
        else if(action==='revoke'||action==='remove')await cloud().removeStudentLink(cloudId);
        else return;
        await syncCloudData(true);
      }catch(error){cloudError=String(error?.message||error);window.setMessage?.(cloudError,'wrong');render();}
      return;
    }
    const me=current(),links=readLinks(),index=links.findIndex(link=>link.id===id);if(index<0)return;const link=links[index];
    if(action==='approve'&&link.studentProfileId===me.id){link.status='approved';link.respondedAt=Date.now();}
    else if(action==='decline'&&link.studentProfileId===me.id){link.status='declined';link.respondedAt=Date.now();}
    else if(action==='revoke'&&link.studentProfileId===me.id&&link.status==='approved')links.splice(index,1);
    else if(action==='remove'&&link.adultProfileId===me.id)links.splice(index,1);
    else return;
    writeLinks(links);const learners=approvedLearners();if(!learners.some(profile=>profile.id===selectedLearnerId))selectedLearnerId=learners[0]?.id||'';render();
  }
  async function handleSubmit(event){
    const form=event.target.closest?.('[data-ptc-cloud-form]');if(!form)return;event.preventDefault();
    const input=form.querySelector('#ptcStudentEmail'),email=String(input?.value||'').trim();if(!email||cloudBusy)return;
    if(previewCloudMode()){
      const normalized=email.toLowerCase(),studentUserId=`preview-student-${normalized.replace(/[^a-z0-9]+/g,'-')}`;
      if(!cloudLinks.some(link=>link.adultUserId===currentCloudUserId()&&link.studentEmail.toLowerCase()===normalized&&link.status!=='declined'))cloudLinks.unshift(normalizeCloudLink({id:`preview-link-${Date.now()}`,adult_user_id:currentCloudUserId(),student_user_id:studentUserId,status:'pending',requested_at:new Date().toISOString(),adult_display_name:current()?.name||'Tutor Preview',student_display_name:normalized.split('@')[0]||'Learner Preview',adult_email:current()?.email||'',student_email:normalized}));
      cloudLastSync=Date.now();activeView='manage';window.setMessage?.(t('Preview request created. Production requests go to the learner’s signed-in account.'),'correct');render();return;
    }
    cloudBusy=true;cloudError='';render();
    try{await cloud().requestStudentLink(email);activeView='manage';window.setMessage?.(t('Cross-device access request sent. The learner must approve it from their account.'),'correct');}
    catch(error){cloudError=String(error?.message||error);window.setMessage?.(cloudError,'wrong');}
    finally{cloudBusy=false;await syncCloudData(false);if(centerOpen())render();}
  }
  async function handleAction(event){
    const button=event.target.closest('button');if(!button)return;
    if(button.dataset.ptcView){activeView=button.dataset.ptcView;render();return;}
    if(button.dataset.ptcLearner){selectedLearnerId=button.dataset.ptcLearner;activeTab='overview';render();return;}
    if(button.dataset.ptcTab){activeTab=button.dataset.ptcTab;render();return;}
    if(button.dataset.ptcRefresh!=null){await syncCloudData(true);return;}
    if(button.dataset.ptcApprove){await updateLink(button.dataset.ptcApprove,'approve');return;}
    if(button.dataset.ptcDecline){await updateLink(button.dataset.ptcDecline,'decline');return;}
    if(button.dataset.ptcRevoke){await updateLink(button.dataset.ptcRevoke,'revoke');return;}
    if(button.dataset.ptcRemove){await updateLink(button.dataset.ptcRemove,'remove');return;}
    if(button.dataset.ptcRequest){const me=current(),studentId=button.dataset.ptcRequest,links=readLinks();if(!me||studentId===me.id||links.some(link=>link.adultProfileId===me.id&&link.studentProfileId===studentId&&link.status!=='declined'))return;links.push({id:uid(),adultProfileId:me.id,studentProfileId:studentId,status:'pending',requestedAt:Date.now(),respondedAt:0});writeLinks(links);activeView='manage';render();window.setMessage?.(t('Access request sent. The learner must approve it from their profile.'),'correct');}
  }
  function addMenuItem(){
    const grid=document.querySelector('.menu-wheel,.game-menu-grid');if(!grid||grid.querySelector('[data-parent-teacher-center]'))return;
    const button=document.createElement('button');button.type='button';button.dataset.parentTeacherCenter='1';button.dataset.menuCategoryName='player';button.innerHTML='<span>🏫</span><strong>Parent/Teacher Center</strong><small>Read-only progress for approved linked learners</small>';button.onclick=()=>{window.closeGameMenu?.();openCenter();};grid.appendChild(button);const layout=grid.closest('.miner-interface-menu');if(layout)button.hidden=layout.dataset.category!=='player';window.LanguageMinerI18n?.localize?.(button);window.refreshJapaneseMinerFeatureMenu?.();
  }
  function init(){ensureShell();addMenuItem();}
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&document.getElementById('parentTeacherCenter')?.classList.contains('open'))closeCenter();});
  window.addEventListener('jm-profile-loaded',()=>{selectedLearnerId='';activeTab='overview';activeView='dashboard';cloudLinks=[];cloudSummaries=new Map();cloudError='';cloudLastSync=0;setTimeout(init,0);});
  window.addEventListener('jm-profile-logged-out',()=>{clearInterval(cloudTimer);cloudTimer=0;cloudLinks=[];cloudSummaries=new Map();cloudError='';cloudLastSync=0;});
  window.addEventListener('lm-cloud-session-changed',()=>{if(centerOpen())syncCloudData(false);});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden&&centerOpen())syncCloudData(false);});
  window.addEventListener('lm-interface-language-changed',()=>{ensureShell();addMenuItem();if(document.getElementById('parentTeacherCenter')?.classList.contains('open'))render();});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
  window.openLanguageMinerParentTeacherCenter=openCenter;
  window.LanguageMinerParentTeacher=Object.freeze({open:openCenter,close:closeCenter,manage:()=>openCenter('manage'),link:()=>openCenter('link'),refresh:()=>syncCloudData(true),links:()=>allLinks().map(link=>({...link}))});
})();
