// Language Miner v6.0 â€” The Polish Update
(()=>{
'use strict';
const VERSION='6.4.144-community-shortcuts', SNAPSHOT_PREFIX='jm_v6_snapshots_', FEEDBACK_INBOX_KEY='jm_v6_admin_feedback_inbox', FEEDBACK_INBOX_LIMIT=200;
let deferredInstallPrompt=null,installEventsBound=false,verifiedSupporterTier=0,verifiedSupporterEntitlement={tier:0,connected:false,source:'none'};
const TOUR=[
 {section:'Getting started',icon:'â›ï¸',title:'Welcome to Language Miner',text:'Answer Japanese questions, build independently tracked practice mastery, collect scientific gemstones, and progress from Hiragana through JLPT N1-oriented practice.',tips:['Create or sign in to a player profile so every feature uses the same save.','Tap New Question or the mine rock to begin the selected course route.','Use the round menu button at the bottom-right whenever you need another game area.']},
 {section:'Getting started',icon:'ðŸ§­',title:'One-time placement test',text:'A new save may take one randomized placement assessment. Its result can recommend and unlock the correct starting mine.',tips:['The placement assessment may be completed only once per save.','Question order and answer order are randomized for that one attempt.','Earlier mines remain available for review after accepting the recommended starting point.']},
 {section:'Getting started',icon:'ðŸ§™',title:'Ask KÅji for todayâ€™s plan',text:'KÅji the Mine Gnome permanently waits beside the mine and turns your saved progress into a short, clickable study plan.',tips:['Tap KÅji whenever you want to see your previous-session refresher, due Smart Reviews, the active lesson, missions, hearts, or a ready guardian.','Each reminder opens the correct game area directly.','KÅji stays in the cave and updates as your progress changes.']},
 {section:'Navigation',icon:'â˜°',title:'Explore, Gear, and Player menus',text:'The Game Menu separates progression, owned equipment, and account tools into three clear categories.',tips:['Explore contains Expedition Hub, Course, Writing Practice, and Goals.','Gear contains Shop, Inventory, Notebook, and Character.','Player contains Stats, Settings, Account & Support, Parent/Teacher Center, and Help & Community. Use â† Menu to return from any full-screen menu.']},
 {section:'Course progression',icon:'ðŸ—ºï¸',title:'Use the Expedition Hub',text:'The Expedition Hub is the world map for choosing a mine route, checking checkpoints, and entering guardian encounters.',tips:['Green or highlighted nodes are available; lock icons show what still needs progression.','Select a node to make that family, section, or level the active mining route.','The Course screen provides detailed lessons for the same saved progress.']},
 {section:'Course progression',icon:'ã‚',title:'Hiragana and Katakana families',text:'The two alphabet mines contain only their own kana and advance one character family at a time.',tips:['Start with Vowels, then unlock K, S, T, N, H, M, Y, R, W/N, voiced families, and P.','Reach 20% mastery in the current family to unlock the next family.','Choose families from their nodes in the Expedition Hub; the large family panel stays off the home mining screen.']},
 {section:'Course progression',icon:'èªž',title:'JLPT section lessons',text:'Each JLPT mine is divided into Vocabulary, Kanji, Grammar, and Reading lessons before its guardian.',tips:['N5 contains 40 Vocabulary lessons with 25 words per session, 6 Kanji lessons, 9 Grammar lessons, and 3 Reading lessons.','The Course and Expedition Hub show the same lesson items, unlocks, mastery, and review checkpoints.','Reach 75% mastery in each lesson. After every two lessons, pass a 25-question randomized review quiz at 75% within two minutes; each answer advances automatically.']},
 {section:'Questions',icon:'ðŸ“–',title:'Question help and kanji support',text:'Read the prompt, choose an answer, and use the explanation to understand why it was correct or incorrect.',tips:['The â€œI donâ€™t know this kanjiâ€ button appears only when the visible question or instruction actually contains kanji.','It stays hidden on English-, Hiragana-, and Katakana-only prompts.','Question audio and answer explanations can be adjusted in Accessibility settings.']},
 {section:'Guardian tests',icon:'ðŸ‘¹',title:'Pass the silent Boss Gate',text:'Every guardian blocks the next mine until its Perfect Gate Challenge is passed.',tips:['Each attempt draws 25 different randomized questions from the guardianâ€™s full course.','The test is silent and lasts up to 5 minutes; every answer advances automatically and wrong answers are recorded.','Results appear after question 25 or when time expires. Only 25/25 unlocks the next mine.']},
 {section:'Goals and rewards',icon:'ðŸŽ¯',title:'Use the combined Goals center',text:'Daily, weekly, and expedition objectives now share one screen instead of competing menu entries.',tips:['Open Goals from Explore, then choose Daily, Weekly, or Expedition.','Daily goals reset each calendar day; weekly goals reset every Monday.','Expedition rewards follow the active mine when the board resets, and each Sakura Garden level adds 10% to mission Nuggets.']},
 {section:'Mining economy',icon:'ðŸ’Ž',title:'Scientific gems and checkpoints',text:'Scientific gemstones support heart upgrades, rewards, and the Nugget economy.',tips:['Each save receives one starter specimen of every gem shown as unlocked by its available mines.','Each starter specimen is granted once; fixed XP checkpoints can still award additional gems.','Heart upgrades consume Agate through Topaz in order, and every purchase now saves immediately.']},
 {section:'Mining economy',icon:'ðŸŽ',title:'Treasure chests and Nuggets',text:'A treasure chest appears every 25 correct answers and awards a mine-scaled Nugget amount.',tips:['Deeper mines produce larger chest rewards suited to their higher shop prices.','The Gem Forge modestly improves chest rewards.','Quests, Missions, bosses, achievements, events, and scientific drops provide additional controlled income.']},
 {section:'Shop and collection',icon:'ðŸ›ï¸',title:'Buy permanent equipment',text:'Shop purchases are permanent for the active profile and remain compatible with account backups.',tips:['Pickaxes, wallpapers, avatar styles, gloves, shoes, Holiday Specials, companions, supplies, and settlement upgrades have visible prices.','Locked permanent items use preview and confirmation before charging Nuggets.','Already-owned items can be equipped again without paying a second time.']},
 {section:'Companions',icon:'ðŸ¾',title:'Choose one balanced companion',text:'Only the equipped companion is active. Later companions cost more, require deeper mines, and provide modest specialized bonuses.',tips:['Companions can help with XP, review selection, supplies, chest rewards, boss rewards, or discounts.','Lion, Tiger, Panda, Squirrel, Mole, and Golem are part of the expanded roster.','Open Companions from the Expedition Hub or the organized Shop to compare exact abilities.']},
 {section:'Settlement',icon:'ðŸ˜ï¸',title:'Build long-term upgrades with Player Levels',text:'Settlement buildings are escalating investments that give account-wide Player XP and Player Levels a permanent progression purpose.',tips:['Building Levels 1â€“5 require Player Levels 50, 75, 100, 125, and 150.','The Sakura Garden raises daily Mission Nuggets, while the Gem Forge improves question-streak treasure chests.','Purchased building levels are permanent and grandfathered; only the next upgrade must meet its Player Level and Nugget requirements.']},
 {section:'Study tools',icon:'ðŸ§ ',title:'Daily Refresher, Smart Review, and Word Book',text:'Daily Refresher revisits up to 10 tap-answer items from the playerâ€™s previous study session. Smart Review remains an optional spaced-repetition tool.',tips:['Daily Refresher has no microphone, speaking requirement, timer, heart loss, or lesson penalty.','Optional Smart Reviews return missed or difficult material sooner while mastered material waits longer.','Correct Japanese items enter the Word Book, where listening remains an optional study aid.']},
 {section:'Study tools',icon:'ðŸ““',title:'Notebook and Sticky Notes',text:'Only quiz and test questions that the player actually answers incorrectly appear in results and enter the Notebook. Skipped and unanswered questions are excluded.',tips:['Open Notebook from Gear or the Player Center.','Attach an 800-character Sticky Note directly to a difficult word, phrase, or question.','Create independent notes, edit or remove them, and mark difficult items reviewed without deleting their attached study context.']},
 {section:'Practice support',icon:'â¤ï¸',title:'Hearts, Shields, and silent tests',text:'Time away never costs hearts. Normal wrong answers can cost hearts, shields protect one mistake, and recovery continues while the game is closed.',tips:['Missing practice days resets the practice streak but leaves hearts unchanged.','When the recovery timer expires, returning to the game restores three hearts.','Boss testing is always silent and does not consume hearts or shields.']},
 {section:'Progress records',icon:'ðŸ“…',title:'Study time, Calendar, and Statistics',text:'Visible practice time, study dates, accuracy, streaks, and course distribution are stored with the active profile.',tips:['The Practice Calendar shows studied days, monthly activity, and total study time.','Timing pauses when the page is hidden and resumes when active again.','Statistics identify the least-practiced category and show mastery throughout the course.']},
 {section:'Private curriculum',icon:'ðŸ”',title:'Tutor and Admin material',text:'Tutor-provided curriculum is protected like Admin tools and remains visible only to the PIN-authenticated owner account.',tips:['Standard players cannot select, receive, review, or import protected Tutor questions.','Signing in to the authorized owner profile restores the private curriculum.','Boss decks, Word Book entries, Notebook items, and backups respect the same access rule.']},
 {section:'Settings and safety',icon:'âš™ï¸',title:'Settings, installation, saves, and recovery',text:'Use Settings for reading support, voice, Smart Review, text, motion, contrast, audio, app installation, explanations, and local safety snapshots.',tips:['Install App or Add to Home Screen is available inside Settings when supported by the device.','Safety snapshots provide local recovery points; restoring one replaces the current saved state.','Use the visible Back buttons to return to the parent menu, and avoid clearing browser storage before exporting a backup.']}
];
function ensureV6(){
 state.v6=Object.assign({tourComplete:false,onboardingGuideOffered:false,textSize:'normal',reducedMotion:false,highContrast:false,colorAssist:false,showFloatingCompanion:true,sfxVolume:70,musicVolume:35,explanations:true,portraitLockEnabled:true,feedback:[],storySeen:[],lastSnapshot:0,supporterTier:0},state.v6||{});
 if(!Array.isArray(state.v6.feedback))state.v6.feedback=[];
 state.v6.supporterTier=Math.max(0,Math.min(3,Number(state.v6.supporterTier)||0));
 if(!Array.isArray(state.v6.storySeen))state.v6.storySeen=[];
}
function companionDisplayInfo(){
 ensureV6();const companionId=String(state.v5?.companion||'none'),equipped=companionId!=='none',available=equipped&&supporterTier()>=2,shown=available&&state.v6.showFloatingCompanion!==false,selected=window.getJapaneseMinerActiveCompanion?.(),icon=selected?.icon||'🐾';
 return {companionId,equipped,available,shown,icon};
}
function syncCompanionDisplayButton(){
 const button=document.getElementById('companionDisplayBtn'),status=document.getElementById('companionDisplayStatus'),icon=document.getElementById('companionDisplayIcon');if(!button)return;
 const info=companionDisplayInfo(),label=!info.equipped?'Choose':!info.available?'Locked':info.shown?'Shown':'Hidden';if(status)status.textContent=label;if(icon)icon.textContent=info.icon;button.dataset.state=label.toLowerCase();button.classList.toggle('has-companion',info.available);button.classList.toggle('companion-hidden',info.available&&!info.shown);button.setAttribute('aria-pressed',String(info.shown));button.setAttribute('aria-label',!info.equipped?'Choose a companion':!info.available?'Open companion access':info.shown?'Hide equipped companion':'Show equipped companion');button.title=!info.equipped?'Choose a companion':!info.available?'Open Companions':`Companion display is ${info.shown?'shown':'hidden'}. Tap to ${info.shown?'hide':'show'} it.`;
 const settingsToggle=document.getElementById('v6FloatingCompanion');if(settingsToggle)settingsToggle.checked=state.v6.showFloatingCompanion!==false;
}
function manageCompanionDisplay(){
 const info=companionDisplayInfo();if(!info.available){state.v6.showFloatingCompanion=true;save();syncCompanionDisplayButton();document.querySelector('#shopContent .v5-grid')?.scrollIntoView({behavior:'smooth',block:'start'});return;}
 state.v6.showFloatingCompanion=state.v6.showFloatingCompanion===false;save();window.refreshJapaneseMinerCompanionDisplays?.();syncCompanionDisplayButton();setMessage(`Companion display ${state.v6.showFloatingCompanion?'shown':'hidden'}.`,'correct');
}
function initCompanionDisplayButton(){const button=document.getElementById('companionDisplayBtn');if(button&&!button.dataset.bound){button.dataset.bound='true';button.addEventListener('click',manageCompanionDisplay);}syncCompanionDisplayButton();}
window.syncJapaneseMinerCompanionDisplayButton=syncCompanionDisplayButton;
window.bindJapaneseMinerCompanionDisplayButton=initCompanionDisplayButton;
function supporterTier(){ensureV6();if(window.LANGUAGE_MINER_PREVIEW&&Number.isFinite(Number(window.LANGUAGE_MINER_PREVIEW_TIER)))return Math.max(0,Math.min(3,Number(window.LANGUAGE_MINER_PREVIEW_TIER)||0));return isDeveloperSession===true?3:verifiedSupporterTier;}
function supporterGateMarkup(tier,feature){const label=['','Supporter','Companion Keeper','Settlement Founder'][tier]||'Supporter';return `<section class="supporter-gate" data-supporter-tier="${tier}"><span>ðŸ”’ PATREON TIER ${tier}</span><h3>${esc6(feature)} is for ${label}s</h3><p>Connect and verify the Patreon account that owns your Language Miner membership.</p><button type="button" onclick="window.openJapaneseMinerPatreon?.()">Connect Patreon</button><strong>Required tier: ${label}</strong></section>`;}
window.japaneseMinerSupporterTier=supporterTier;
window.japaneseMinerSupporterGate=supporterGateMarkup;
window.setJapaneseMinerVerifiedSupporterEntitlement=entitlement=>{verifiedSupporterEntitlement=Object.assign({tier:0,connected:false,source:'none'},entitlement||{});verifiedSupporterTier=Math.max(0,Math.min(3,Number(verifiedSupporterEntitlement.tier)||0));if(state?.v6){state.v6.supporterTier=verifiedSupporterTier;state.v6.supporterVerifiedAt=verifiedSupporterEntitlement.verified_at||null;}try{applyWallpaper();render();window.refreshJapaneseMinerCompanionDisplays?.();}catch{}window.dispatchEvent(new CustomEvent('jm-supporter-entitlement-changed',{detail:Object.assign({},verifiedSupporterEntitlement,{tier:verifiedSupporterTier})}));};
window.japaneseMinerSupporterEntitlement=()=>Object.assign({},verifiedSupporterEntitlement,{tier:supporterTier()});
function esc6(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function shell(){
 if(document.getElementById('v6TourOverlay'))return;
 document.body.insertAdjacentHTML('beforeend',`
 <div id="v6TourOverlay" class="v6-overlay" aria-hidden="true"><section class="v6-dialog v6-tour-dialog"><button class="menu-back-button v6-menu-back" type="button" data-v6-back="tour">â† Menu</button><button class="v6-close" data-v6-close="tour">Ã—</button><div id="v6TourContent"></div></section></div>
 <div id="v6SettingsOverlay" class="v6-overlay" aria-hidden="true"><section class="v6-dialog"><header><button class="menu-back-button" type="button" data-v6-back="settings">â† Menu</button><div class="menu-header-copy"><span>Player comfort</span><h2>âš™ï¸ Accessibility & Settings</h2></div><button class="v6-close" data-v6-close="settings">Ã—</button></header><div id="v6SettingsContent"></div></section></div>
 <div id="v6FeedbackOverlay" class="v6-overlay" aria-hidden="true"><section class="v6-dialog"><header><button class="menu-back-button" type="button" data-v6-back="feedback">â† Menu</button><div class="menu-header-copy"><span>Help improve the mine</span><h2>ðŸ’¬ Player Feedback</h2></div><button class="v6-close" data-v6-close="feedback">Ã—</button></header><div id="v6FeedbackContent"></div></section></div>
 <div id="v6StoryToast" class="v6-story-toast" aria-live="polite"></div>`);
 document.querySelectorAll('[data-v6-close]').forEach(b=>b.onclick=()=>closeOverlay(b.dataset.v6Close));
 document.querySelectorAll('[data-v6-back]').forEach(b=>b.onclick=()=>returnToGameMenu(()=>closeOverlay(b.dataset.v6Back)));
 document.querySelectorAll('.v6-overlay').forEach(o=>o.onclick=e=>{if(e.target===o)closeOverlay(o.id.includes('Tour')?'tour':o.id.includes('Settings')?'settings':'feedback');});
}
function overlay(name){return document.getElementById(name==='tour'?'v6TourOverlay':name==='settings'?'v6SettingsOverlay':'v6FeedbackOverlay');}
function openOverlay(name){shell();const o=overlay(name);o.classList.add('open');o.setAttribute('aria-hidden','false');window.syncJapaneseMinerPageScroll?.();}
function closeOverlay(name){const o=overlay(name);o?.classList.remove('open');o?.setAttribute('aria-hidden','true');window.syncJapaneseMinerPageScroll?.();}
let tourIndex=0;
function openTour(start=0){if(window.openLanguageMinerTranslatedGuide?.())return;ensureV6();tourIndex=start;openOverlay('tour');renderTour();}
function renderTour(){const s=TOUR[tourIndex],box=document.getElementById('v6TourContent');box.innerHTML=`<div class="v6-tour-progress"><i style="width:${(tourIndex+1)/TOUR.length*100}%"></i></div><div class="v6-tour-icon">${s.icon}</div><span>${esc6(s.section)} Â· Guide ${tourIndex+1} of ${TOUR.length}</span><h2>${esc6(s.title)}</h2><p>${esc6(s.text)}</p><ul class="v6-guide-tips">${(s.tips||[]).map(tip=>`<li>${esc6(tip)}</li>`).join('')}</ul><div class="v6-tour-actions"><button id="v6TourBack" ${tourIndex===0?'disabled':''}>Back</button><button id="v6TourNext" class="primary">${tourIndex===TOUR.length-1?'Finish guide':'Next'}</button></div><button id="v6TourSkip" class="v6-link">Close guide</button>`;document.getElementById('v6TourBack').onclick=()=>{tourIndex--;renderTour();};document.getElementById('v6TourNext').onclick=()=>{if(tourIndex<TOUR.length-1){tourIndex++;renderTour();}else completeTour();};document.getElementById('v6TourSkip').onclick=completeTour;}
function completeTour(){state.v6.tourComplete=true;save();closeOverlay('tour');setMessage('Guide complete. Your Study Coach will recommend what to do next.','correct');}
function recommendation(){
 ensureV6();
 if(state.hearts<=0)return{icon:'â¤ï¸â€ðŸ©¹',title:'Hearts are recovering',text:'Use review tools or explore your collection while the recovery timer counts down.',action:'dashboard',label:'View health'};
 const due=state.v5?.srs?Object.values(state.v5.srs).filter(x=>x?.dueAt<=Date.now()).length:0;
 if(due)return{icon:'ðŸ§ ',title:`${due} review${due===1?'':'s'} ready`,text:'A short Smart Review session is the best next step for long-term memory.',action:'review',label:'Start review'};
 if(!state.active)return{icon:'â›ï¸',title:`Continue ${stages[selectedStageIndex()]?.label||'your mine'}`,text:'Use the permanent New Question button below when you are ready to continue mining.',action:'mine',label:'New question'};
 if(state.active&&!state.answered)return{icon:'ðŸŽŒ',title:'Finish your current challenge',text:'Your question is already waiting below. Read carefully, listen if available, and choose the best answer.',action:'question',label:'Return to question'};
 return{icon:'ðŸ—ºï¸',title:'Explore your next checkpoint',text:'Open the expedition map to see your current mine and upcoming guardian.',action:'map',label:'Open map'};
}
let coachHideTimer=0;
function coachShell(){let c=document.getElementById('v6CoachCard');if(!c){c=document.createElement('section');c.id='v6CoachCard';c.className='v6-coach-card';c.setAttribute('aria-live','polite');c.setAttribute('aria-hidden','true');document.querySelector('.v5-launch-card')?.after(c);}}
function coachMessage(kind){if(kind==='correct')return{icon:'âœ¨',title:'Great strike!',text:'That answer was correct. Your Japanese knowledge and mining progress both grew.',action:'',label:''};if(kind==='wrong')return{icon:'ðŸ“˜',title:'Letâ€™s learn from that',text:Number(state.hearts||0)>0?'Compare your choice with the correct answer, then keep going. Every mistake strengthens your review path.':'Your hearts are recovering. Review the explanation while your mine energy returns.',action:state.hearts>0?'':'dashboard',label:'View health'};return recommendation();}
function renderCoach(kind='question'){coachShell();const c=document.getElementById('v6CoachCard');if(!c)return;const r=coachMessage(kind),duplicate=['mine','question'].includes(r.action);c.classList.toggle('informational',duplicate||!r.action);c.innerHTML=`<div class="v6-gnome" aria-hidden="true"><i class="gnome-hat"></i><i class="gnome-face"></i><i class="gnome-nose"></i><i class="gnome-beard"></i><i class="gnome-body"></i></div><div class="v6-coach-speech"><span>KÅŒJI Â· MINE GNOME</span><h2>${r.icon} ${r.title}</h2><p>${r.text}</p></div>${!r.action?'':`<button class="primary" data-v6-coach="${r.action}">${r.label}</button>`}`;const action=c.querySelector('[data-v6-coach]');if(action)action.onclick=()=>coachAction(r.action);clearTimeout(coachHideTimer);c.classList.add('visible');c.setAttribute('aria-hidden','false');coachHideTimer=setTimeout(()=>{c.classList.remove('visible');c.setAttribute('aria-hidden','true');},7000);}
function coachAction(a){if(a==='mine'){mine();document.getElementById('challengeArea')?.scrollIntoView({behavior:'smooth'});}else if(a==='question')document.getElementById('challengeArea')?.scrollIntoView({behavior:'smooth'});else if(a==='map')window.openJapaneseMinerV5?.('map');else if(a==='review')window.openJapaneseMinerV5?.('review');else if(a==='dashboard')window.openJapaneseMinerDashboard?.('health');}

// v6.4.27 - Restored website scrolling with a single overlay-aware page scroll guard.
// v6.4.28 - Matched KÅji's launcher dimensions to the round menu button.
// v6.4.29 - Removed the separate N5 learning-track selector and its UI wiring.
// v6.4.30 - Tutor curriculum controls are created only for the authenticated owner account.
// v6.4.35 - Versioned pickaxe icon URLs prevent launchers from reusing the original hammer artwork.
// v6.4.36 - Boss auto-advance survives state normalization, test timers are extended, and the header uses a dedicated player portrait.
// v6.4.37 - KÅji's phone reminder stays inside safe-area edges with a compact, internally scrolling layout.
// v6.4.34 - Install App moved from the header into Accessibility & Settings.
// v6.4.33 - Advanced forged pickaxe artwork replaces the original launcher icon.
// v6.4.32 - Menu access remains available when optional quick-stat controls are absent.
// v6.4.31 - Review now refreshes the previous study session without microphone or speaking tests.
// v6.4.26 - Boss Gate and lesson-review questions advance automatically after answers.
// v6.4.25 - Player feedback creates unread notifications in the device-local administrator inbox.
// v6.4.24 - Reset Save moved from the mining controls into Accessibility > Save management.
// v6.4.23 - Every save receives one starter specimen of each unlocked gem so heart upgrades work correctly.
// v6.4.22 - Removed the large Expedition Hub launch card from the home screen; menu and KÅji access remain.
// v6.4.21 - Settlement upgrade tiers now require Player Levels 50, 75, 100, 125, and 150.
// v6.4.20 - N5 vocabulary now uses 40 focused lessons of 25 words each.
// v6.4.19 - Phone-first responsive layouts, safe areas, installation, and offline app support.
// v6.4.18 - KÅji is fixed directly above the round menu button on every screen size.
// v6.4.17 - Every two JLPT lessons now lead to a required 25-question, two-minute review quiz.
// v6.4.16 - Every later JLPT lesson now requires 75% mastery in the lesson before it.
// v6.4.15 - KÅji is now a permanent, clickable guide inside the mine.
let coachLastFeedback=null;
function coachDueReviewCount(){
 const srs=state.v5?.srs||{},now=Date.now();
 return questions.filter(question=>questionAllowedForSession(question)&&srs[question.id]&&Number(srs[question.id].dueAt||0)<=now).length;
}
function coachDailyRefresherReady(){const sessions=Array.isArray(state.v5?.studySessions)?state.v5.studySessions:[],last=sessions.at(-1),result=state.v5?.dailyRefresher;return !!last?.questionIds?.length&&!(result?.status==='complete'&&result.day===dateKey());}
function coachMissionSummary(){
 const missions=state.v5?.missions,specs=typeof MISSION_SPECS==='undefined'?[]:MISSION_SPECS;
 if(!missions||!specs.length)return{claimable:0,claimed:0,total:0,remaining:0};
 const claimable=specs.filter(spec=>!missions.claimed?.[spec.id]&&Number(missions[spec.metric]||0)>=Number(spec.goal||0)).length;
 const claimed=specs.filter(spec=>missions.claimed?.[spec.id]).length;
 return{claimable,claimed,total:specs.length,remaining:Math.max(0,specs.length-claimed)};
}
function coachLessonReminder(){
 const stage=selectedStageIndex();
 if(stage<2){
  const family=currentKanaFamily(stage),mastery=kanaFamilyMastery(family);
  return{icon:stage===0?'ã‚':'ã‚¢',title:`Continue ${family.name}`,text:`This kana family is at ${mastery}% mastery. Reach ${KANA_FAMILY_UNLOCK_MASTERY}% to open the next family.`,action:'map',label:'Open family map'};
 }
 const section=currentJlptSection(stage),spec=jlptSectionSpec(section),levels=jlptSectionLevels(stage,section);
 const checkpoint=Array.from({length:Math.floor(levels.length/2)},(_,index)=>(index+1)*2).find(evenLesson=>jlptReviewCheckpointAvailable(stage,section,evenLesson)&&!jlptReviewCheckpointPassed(stage,section,evenLesson));
 if(checkpoint)return{icon:'ðŸ§ ',title:`${spec.name} Lessons ${checkpoint-1}â€“${checkpoint} review is ready`,text:'Answer 25 randomized questions in two minutes and score at least 75% to unlock the next lesson.',action:'checkpoint',label:'Start review quiz',stage,section,evenLesson:checkpoint};
 let level=currentJlptSectionLevel(stage,section),mastery=jlptSectionLevelMastery(stage,section,level);
 if(mastery>=JLPT_VOCABULARY_UNLOCK_MASTERY&&levels[level+1]&&jlptSectionLevelUnlocked(stage,section,level+1)){level+=1;mastery=jlptSectionLevelMastery(stage,section,level);}
 const items=levels[level]||[],config=jlptSectionLessonConfig(section);
 return{icon:spec.icon,title:`${spec.name} Lesson ${level+1} is next`,text:`${mastery}% mastery Â· ${items.length} ${config.plural}. Review every item before practice.`,action:'lesson',label:`Open Lesson ${level+1}`,stage,section,level};
}
function coachReminderTasks(){
 ensureV6();const tasks=[],due=coachDueReviewCount(),dailyRefresherReady=coachDailyRefresherReady(),missions=coachMissionSummary(),stage=selectedStageIndex(),today=dateKey();
 if(Number(state.hearts||0)<=0)tasks.push({icon:'â¤ï¸â€ðŸ©¹',title:'Hearts are recovering',text:'Your hearts are safe while you are away. Check the recovery timer or use this time to review your course plan.',action:'dashboard',label:'View health'});
 if(dailyRefresherReady)tasks.push({icon:'ðŸ”„',title:'Your Daily Refresher is ready',text:'Revisit up to 10 tap-answer items from your previous study session with no timer, microphone, heart loss, or lesson penalty.',action:'review',label:'Open refresher'});
 if(due>0)tasks.push({icon:'ðŸ§ ',title:`${due} optional Smart Review${due===1?'':'s'} ready`,text:'Spaced repetition is available after your previous-session refresher.',action:'review',label:'Open review'});
 if(state.active&&!state.answered)tasks.push({icon:'ðŸŽŒ',title:'Finish your current challenge',text:'A question is waiting. Return to it before starting another activity.',action:'question',label:'Return to question'});
 tasks.push(coachLessonReminder());
 if(missions.claimable>0)tasks.push({icon:'ðŸŽ',title:`${missions.claimable} mission reward${missions.claimable===1?'':'s'} ready`,text:'You completed mission goals that are waiting to be claimed.',action:'missions',label:'Claim rewards'});
 else if(missions.remaining>0)tasks.push({icon:'ðŸŽ¯',title:'Daily missions in progress',text:`${missions.claimed}/${missions.total} mission rewards claimed today. Check the board for your next objective.`,action:'missions',label:'View missions'});
 if(state.lastPracticeDate!==today)tasks.push({icon:'ðŸ”¥',title:Number(state.practiceStreak||0)>0?`Protect your ${state.practiceStreak}-day streak`:'Start todayâ€™s study',text:'One focused lesson or review session keeps your learning routine moving.',action:'mine',label:'Practice now'});
 if(typeof bossUnlocked==='function'&&bossUnlocked(stage)&&!state.v5?.bossDefeated?.includes(stage))tasks.push({icon:'ðŸ‘¹',title:`${stages[stage].label} guardian is ready`,text:'Your course checkpoint has reached the guardian gate. Review first, then attempt the silent test.',action:'boss',label:'View guardian'});
 if(tasks.length<3)tasks.push({icon:'ðŸ—ºï¸',title:'Check your next checkpoint',text:'The Expedition Hub shows your active route, mastery, lessons, and guardian progress.',action:'map',label:'Open map'});
 const seen=new Set();return tasks.filter(task=>{const key=`${task.action}:${task.title}`;if(seen.has(key))return false;seen.add(key);return true;}).slice(0,4);
}
function closeCoach(){const dock=document.getElementById('v6CoachDock'),button=document.getElementById('v6CoachButton'),card=document.getElementById('v6CoachCard');dock?.classList.remove('open');button?.setAttribute('aria-expanded','false');card?.setAttribute('aria-hidden','true');}
function openCoach(){renderCoach('refresh');const dock=document.getElementById('v6CoachDock'),button=document.getElementById('v6CoachButton'),card=document.getElementById('v6CoachCard');dock?.classList.add('open');button?.setAttribute('aria-expanded','true');card?.setAttribute('aria-hidden','false');}
coachShell=function(){
 let dock=document.getElementById('v6CoachDock');if(!document.body)return;
 if(!dock){
  dock=document.createElement('div');dock.id='v6CoachDock';dock.className='v6-coach-dock';dock.innerHTML=`<button id="v6CoachButton" class="v6-coach-character" type="button" aria-label="Open KÅjiâ€™s study reminders" aria-expanded="false" aria-controls="v6CoachCard" title="KÅji the Mine Gnome â€” open todayâ€™s study plan"><span id="v6CoachBadge" class="v6-coach-badge" hidden></span><span class="v6-gnome" aria-hidden="true"><i class="gnome-hat"></i><i class="gnome-face"></i><i class="gnome-nose"></i><i class="gnome-beard"></i><i class="gnome-body"></i></span><strong>KÅji</strong><small>Study guide</small></button><section id="v6CoachCard" class="v6-coach-popover" aria-hidden="true" aria-label="KÅjiâ€™s study reminders"><header><div class="v6-coach-heading"><span>KÅŒJI Â· MINE GNOME</span><h2>Todayâ€™s plan</h2></div><div class="v6-coach-header-actions"><a class="v6-coach-social v6-coach-discord" href="https://discord.gg/AGrGMFjXQm" target="_blank" rel="noopener noreferrer" aria-label="Join the Language Miner Discord" title="Join Discord"><span aria-hidden="true">D</span><strong>Discord</strong></a><a class="v6-coach-social v6-coach-patreon" href="https://www.patreon.com/cw/Erendragneel/membership" target="_blank" rel="noopener noreferrer" aria-label="Support Language Miner on Patreon" title="Open Patreon"><span aria-hidden="true">P</span><strong>Patreon</strong></a><button id="v6CoachClose" type="button" aria-label="Close KÅjiâ€™s reminders">Ã—</button></div></header><div id="v6CoachContent"></div></section>`;
   document.body.appendChild(dock);
  dock.querySelector('#v6CoachButton').onclick=()=>dock.classList.contains('open')?closeCoach():openCoach();
  dock.querySelector('#v6CoachClose').onclick=closeCoach;
  }
  if(dock.parentElement!==document.body)document.body.appendChild(dock);
 if(!document.body.dataset.kojiOutsideBound){document.body.dataset.kojiOutsideBound='1';document.addEventListener('click',event=>{const current=document.getElementById('v6CoachDock');if(current?.classList.contains('open')&&!event.target.closest('#v6CoachDock'))closeCoach();});}
};
recommendation=function(){return coachReminderTasks()[0]||{icon:'ðŸ—ºï¸',title:'Stay on track',text:'Open the Expedition Hub to choose your next lesson.',action:'map',label:'Open map'};};
renderCoach=function(kind='refresh'){
 coachShell();const dock=document.getElementById('v6CoachDock'),card=document.getElementById('v6CoachCard'),content=document.getElementById('v6CoachContent'),button=document.getElementById('v6CoachButton'),badge=document.getElementById('v6CoachBadge');if(!dock||!card||!content||!button)return;
 if(kind==='correct'||kind==='wrong'){coachLastFeedback={...coachMessage(kind),kind,at:Date.now()};button.classList.remove('react-correct','react-wrong');void button.offsetWidth;button.classList.add(kind==='correct'?'react-correct':'react-wrong');setTimeout(()=>button.classList.remove('react-correct','react-wrong'),900);}
 const tasks=coachReminderTasks(),feedback=coachLastFeedback&&Date.now()-coachLastFeedback.at<15000?coachLastFeedback:null,due=coachDueReviewCount(),missions=coachMissionSummary(),attention=due+missions.claimable;
 badge.hidden=attention<=0;badge.textContent=attention>9?'9+':String(attention);button.setAttribute('aria-label',`KÅji study guide. ${tasks[0]?.title||'Open todayâ€™s plan'}.`);
 content.innerHTML=`${feedback?`<div class="v6-coach-feedback ${feedback.kind}"><strong>${feedback.icon} ${esc6(feedback.title)}</strong><span>${esc6(feedback.text)}</span></div>`:''}<div class="v6-coach-reminder-list">${tasks.map((task,index)=>`<button type="button" data-v6-coach-task="${index}"><span>${task.icon}</span><span><strong>${esc6(task.title)}</strong><small>${esc6(task.text)}</small></span><b>${esc6(task.label)} â†’</b></button>`).join('')}</div>`;
 content.querySelectorAll('[data-v6-coach-task]').forEach(taskButton=>taskButton.onclick=()=>{const task=tasks[Number(taskButton.dataset.v6CoachTask)];if(task)coachAction(task.action,task);});
};
coachAction=function(action,task={}){
 closeCoach();
 if(action==='mine'){mine();document.getElementById('challengeArea')?.scrollIntoView({behavior:'smooth'});}
 else if(action==='question')document.getElementById('challengeArea')?.scrollIntoView({behavior:'smooth'});
 else if(action==='map')window.openJapaneseMinerV5?.('map');
 else if(action==='review')window.openJapaneseMinerV5?.('review');
 else if(action==='dashboard')window.openJapaneseMinerDashboard?.('health');
 else if(action==='missions')window.openLanguageMinerGoals?.('expedition');
 else if(action==='boss')window.openJapaneseMinerV5?.('boss');
 else if(action==='lesson'){const stage=Number(task.stage),section=String(task.section||'vocabulary'),level=Number(task.level)||0;selectStage(stage,false);openJlptSectionLessonReview(stage,section,level);}
 else if(action==='checkpoint'){openJlptReviewCheckpoint(Number(task.stage),String(task.section||'vocabulary'),Number(task.evenLesson));}
};
function explanation(q,chosen,correct){
 if(!state.v6.explanations||!q)return;
 let box=document.getElementById('v6AnswerExplanation');if(!box){box=document.createElement('section');box.id='v6AnswerExplanation';box.className='v6-answer-explanation';document.getElementById('message')?.after(box);}
 const answer=q.a||'',reading=q.speechText||q.reading||q.kana||'',meaning=q.meaning||q.en||'',listenText=japaneseAnswerSpeechText(q);
 box.innerHTML=`<span>${correct?'âœ… WHY IT WORKS':'ðŸ“˜ LEARN FROM THIS'}</span><h3>Correct answer: ${esc6(answer)}</h3>${reading&&reading!==answer?`<p><strong>Reading:</strong> ${esc6(reading)}</p>`:''}${meaning?`<p><strong>Meaning:</strong> ${esc6(meaning)}</p>`:''}<p>${correct?'You matched the prompt correctly.':'Your choice was '+esc6(chosen)+'. Compare it with the correct answer, then use Smart Review to see this item again.'}</p><div><button data-v6-explain="listen" ${listenText?'':'disabled'}>ðŸ”Š Hear Japanese</button><button data-v6-explain="review">ðŸ§  Review later</button></div>`;
 box.querySelector('[data-v6-explain="listen"]').onclick=()=>{if(listenText)speakJapanese(listenText);};box.querySelector('[data-v6-explain="review"]').onclick=()=>{if(state.v5?.srs&&q.id){state.v5.srs[q.id]={ease:1.8,interval:1,dueAt:Date.now()};save();setMessage('Added to Smart Review.','correct');}};
}
function applySettings(){ensureV6();document.documentElement.dataset.textSize=state.v6.textSize;document.body.dataset.reducedMotion=String(!!state.v6.reducedMotion);document.body.dataset.highContrast=String(!!state.v6.highContrast);document.body.dataset.colorAssist=String(!!state.v6.colorAssist);syncCompanionDisplayButton();}
function openSettings(){
 ensureV6();
 openOverlay('settings');
 const box=document.getElementById('v6SettingsContent');
 box.innerHTML=`<div class="v6-settings-grid"><label>Text size<select id="v6TextSize"><option value="normal">Normal</option><option value="large">Large</option><option value="xlarge">Extra large</option></select></label><label class="v6-switch"><input id="v6ReducedMotion" type="checkbox"><span>Reduce animations</span></label><label class="v6-switch"><input id="v6HighContrast" type="checkbox"><span>High contrast</span></label><label class="v6-switch"><input id="v6ColorAssist" type="checkbox"><span>Color-blind indicators</span></label><label class="v6-switch"><input id="v6Explanations" type="checkbox"><span>Answer explanations</span></label><label class="v6-switch"><input id="v6FloatingCompanion" type="checkbox"><span>Show equipped pet beside Menu</span></label><label>Sound effects <output id="v6SfxOut"></output><input id="v6Sfx" type="range" min="0" max="100"></label><label>Music <output id="v6MusicOut"></output><input id="v6Music" type="range" min="0" max="100"></label></div><section class="v6-install-app"><div><span>DEVICE APP</span><h3>ðŸ“² Install Language Miner</h3><p id="v6InstallStatus">Checking whether installation is available on this deviceâ€¦</p><small>The installer now follows the renamed Language Miner address. Remove an older home-screen shortcut once, open the current website, and install again.</small><div id="v6InstallInstructions" class="v6-install-instructions" hidden><strong>Install from the current Language Miner link</strong><p></p><a href="https://erendragneel.github.io/language-miner/" target="_blank" rel="noopener">Open current website</a></div></div><button id="installAppBtn" class="install-app-btn" type="button" data-language-miner-install>📲 Install App</button></section><section class="v6-save-recovery"><h3>ðŸ›Ÿ Save recovery</h3><p>Language Miner keeps rolling safety snapshots on this device.</p><div id="v6SnapshotList"></div><button id="v6SnapshotNow">Create safety snapshot</button></section><section class="v6-save-management"><h3>ðŸ—‘ï¸ Save management</h3><p>Reset only the currently signed-in playerâ€™s progress. You will be asked to confirm before anything is erased.</p><button id="v6ResetSave" class="danger" type="button">Reset Save</button></section>`;
 box.querySelector('.v6-settings-grid')?.insertAdjacentHTML('afterend',`<section class="v6-orientation-setting"><div><span>SCREEN ROTATION</span><h3>📱 Portrait lock</h3><p id="v6PortraitLockStatus"></p></div><button id="v6PortraitLockToggle" type="button"></button></section>`);
 box.querySelector('.v6-orientation-setting')?.insertAdjacentHTML('afterend',`<section class="v6-learning-preferences"><div class="v6-learning-preferences-head"><span>LEARNING &amp; AUDIO</span><h3>🔊 Question support</h3><p>Reading, answer audio, native voice, and Smart Review controls now live here.</p></div><div class="v6-settings-grid"><label>Reading support<select id="v6SupportMode"><option value="guided">Guided — readings and furigana</option><option value="standard">Standard — normal furigana</option><option value="challenge">Challenge — reduced furigana</option></select></label><label class="v6-switch"><input id="v6AnswerSounds" type="checkbox"><span>Answer sounds</span></label><label class="v6-switch"><input id="v6VoiceEnabled" type="checkbox"><span>Learning-language voice</span></label><label class="v6-switch"><input id="v6AutoSpeak" type="checkbox"><span>Speak new questions automatically</span></label><label class="v6-switch"><input id="v6SmartReview" type="checkbox"><span>Smart Review weak questions</span></label><label>Voice speed <output id="v6VoiceRateOut"></output><input id="v6VoiceRate" type="range" min="0.55" max="1.15" step="0.05"></label></div><div class="v6-voice-choice"><strong>Voice</strong><div role="group" aria-label="Voice gender"><button type="button" data-v6-voice-gender="male">👨 Male</button><button type="button" data-v6-voice-gender="female">👩 Female</button></div><strong>Style</strong><div role="group" aria-label="Voice style"><button type="button" data-v6-voice-style="natural">🗣️ Natural</button><button type="button" data-v6-voice-style="deep">🎙️ Deep</button><button type="button" data-v6-voice-style="high">🎵 High</button><button type="button" data-v6-voice-style="soft">🌙 Soft</button><button type="button" data-v6-voice-style="energetic">⚡ Energetic</button><button type="button" data-v6-voice-style="calm">🍃 Calm</button></div><button id="v6TestVoice" type="button">🔊 Test learning-language voice</button></div></section>`);
 const bind=(id,key,type='checked',afterChange)=>{const el=document.getElementById(id);el[type]=state.v6[key];el.onchange=()=>{state.v6[key]=el[type];applySettings();save();afterChange?.();};};
 document.getElementById('v6TextSize').value=state.v6.textSize;
 document.getElementById('v6TextSize').onchange=e=>{state.v6.textSize=e.target.value;applySettings();save();};
 bind('v6ReducedMotion','reducedMotion');
 bind('v6HighContrast','highContrast');
 bind('v6ColorAssist','colorAssist');
 bind('v6Explanations','explanations');
 bind('v6FloatingCompanion','showFloatingCompanion','checked',()=>window.refreshJapaneseMinerCompanionDisplays?.());
 const portraitButton=document.getElementById('v6PortraitLockToggle'),portraitStatus=document.getElementById('v6PortraitLockStatus');
 const renderPortraitSetting=(message='')=>{const enabled=state.v6.portraitLockEnabled!==false;portraitButton.textContent=enabled?'Unlock rotation':'Lock portrait';portraitButton.classList.toggle('primary',!enabled);portraitButton.setAttribute('aria-pressed',String(enabled));portraitStatus.textContent=message||(enabled?'Portrait lock is on. Landscape play is blocked if the phone refuses app-controlled rotation.':'Rotation is unlocked.');};
 renderPortraitSetting();
 portraitButton.onclick=async()=>{const enabled=state.v6.portraitLockEnabled===false;state.v6.portraitLockEnabled=enabled;save();renderPortraitSetting(enabled?'Trying portrait lock…':'Rotation is unlocked.');const result=await window.setJapaneseMinerPortraitLock?.(enabled);if(!enabled){renderPortraitSetting('Rotation is unlocked.');return;}if(result?.locked){renderPortraitSetting('Portrait lock is active.');return;}if(result?.fallback){renderPortraitSetting('Portrait lock is on. Turn the phone upright to continue; landscape play is blocked.');return;}if(result&&!result.supported){renderPortraitSetting('Portrait lock is on. This browser cannot rotate the screen itself, so landscape play will be blocked.');return;}renderPortraitSetting(result?.mobile?'Portrait lock is on. Landscape play will be blocked if app-controlled rotation is refused.':'Portrait lock is saved for phone play.');};
 const supportMode=document.getElementById('v6SupportMode');supportMode.value=state.supportMode;supportMode.onchange=()=>{state.supportMode=supportMode.value;state.active=null;state.answered=false;save();render();setMessage(`Reading support changed to ${supportMode.options[supportMode.selectedIndex].text}. Start a new question.`,'correct');};
 [['v6AnswerSounds','soundEnabled'],['v6VoiceEnabled','voiceEnabled'],['v6AutoSpeak','autoSpeak'],['v6SmartReview','smartReview']].forEach(([id,key])=>{const control=document.getElementById(id);control.checked=state[key]!==false;control.onchange=()=>{state[key]=control.checked;save();if(key==='soundEnabled'&&control.checked)playFeedbackSound(true);};});
 const syncVoiceChoices=()=>{box.querySelectorAll('[data-v6-voice-gender]').forEach(button=>button.classList.toggle('primary',button.dataset.v6VoiceGender===state.voiceGender));box.querySelectorAll('[data-v6-voice-style]').forEach(button=>button.classList.toggle('primary',button.dataset.v6VoiceStyle===state.voiceStyle));};syncVoiceChoices();
 box.querySelectorAll('[data-v6-voice-gender]').forEach(button=>button.onclick=()=>{state.voiceGender=button.dataset.v6VoiceGender;save();syncVoiceChoices();testCurrentLearningVoice();});
 box.querySelectorAll('[data-v6-voice-style]').forEach(button=>button.onclick=()=>{state.voiceStyle=button.dataset.v6VoiceStyle;save();syncVoiceChoices();testCurrentLearningVoice();});
 const voiceRate=document.getElementById('v6VoiceRate'),voiceRateOut=document.getElementById('v6VoiceRateOut');voiceRate.value=state.voiceRate;voiceRateOut.textContent=`${Number(state.voiceRate).toFixed(2)}×`;voiceRate.oninput=()=>{state.voiceRate=Number(voiceRate.value);voiceRateOut.textContent=`${state.voiceRate.toFixed(2)}×`;save();};
 document.getElementById('v6TestVoice').onclick=testCurrentLearningVoice;
 [['v6Sfx','sfxVolume','v6SfxOut'],['v6Music','musicVolume','v6MusicOut']].forEach(([id,key,out])=>{const e=document.getElementById(id),o=document.getElementById(out);e.value=state.v6[key];o.textContent=e.value+'%';e.oninput=()=>{state.v6[key]=Number(e.value);o.textContent=e.value+'%';save();};});
 document.getElementById('v6SnapshotNow').onclick=()=>{createSnapshot(true);renderSnapshots();};
 document.getElementById('v6ResetSave').onclick=()=>{if(window.resetJapaneseMinerSave?.())closeOverlay('settings');};
 initInstallApp();
 renderSnapshots();
}
function snapshotKey(){return SNAPSHOT_PREFIX+(activeProfileId||'guest');}
function getSnapshots(){try{return JSON.parse(localStorage.getItem(snapshotKey())||'[]');}catch{return[];}}
function createSnapshot(force=false){ensureV6();if(!activeProfileId)return;if(!force&&Date.now()-state.v6.lastSnapshot<120000)return;const rows=getSnapshots();rows.unshift({at:Date.now(),state:JSON.parse(JSON.stringify(state))});localStorage.setItem(snapshotKey(),JSON.stringify(rows.slice(0,3)));state.v6.lastSnapshot=Date.now();}
function renderSnapshots(){const box=document.getElementById('v6SnapshotList');if(!box)return;const rows=getSnapshots();box.innerHTML=rows.map((r,i)=>`<button data-v6-restore="${i}"><strong>${new Date(r.at).toLocaleString()}</strong><small>Restore this snapshot</small></button>`).join('')||'<p>No snapshots yet.</p>';box.querySelectorAll('[data-v6-restore]').forEach(b=>b.onclick=()=>{const r=rows[Number(b.dataset.v6Restore)];if(r&&confirm('Restore this safety snapshot? Your current state will be replaced.')){state=normalizeState(r.state);repairTutorAccessState();ensureV6();save();render();closeOverlay('settings');setMessage('Safety snapshot restored.','correct');}});}
function readAdminFeedbackInbox(){
 try{const rows=JSON.parse(localStorage.getItem(FEEDBACK_INBOX_KEY)||'[]');return Array.isArray(rows)?rows.filter(row=>row&&typeof row==='object').slice(0,FEEDBACK_INBOX_LIMIT):[];}catch{return[];}
}
function writeAdminFeedbackInbox(rows){
 try{localStorage.setItem(FEEDBACK_INBOX_KEY,JSON.stringify(rows.slice(0,FEEDBACK_INBOX_LIMIT)));}catch{}
}
function activeFeedbackPlayerName(){return document.getElementById('activePlayerName')?.textContent?.trim()||'Player';}
function submitPlayerFeedback(category,text){
 const at=Date.now(),record={id:`${at}-${Math.random().toString(36).slice(2,10)}`,at,profileId:activeProfileId||'',playerName:activeFeedbackPlayerName(),category:String(category),text:String(text),read:false};
 state.v6.feedback.push({at,category:record.category,text:record.text,sentToAdmin:!isDeveloperSession});
 if(!isDeveloperSession){const inbox=readAdminFeedbackInbox();inbox.unshift(record);writeAdminFeedbackInbox(inbox);}
 save();
 return record;
}
function unreadAdminFeedbackCount(){return isDeveloperSession?readAdminFeedbackInbox().filter(row=>!row.read).length:0;}
function updateAdminFeedbackNotification(){
 const button=document.querySelector('[data-v6-menu="help"]');
 if(!button)return;
 button.querySelector('.v6-menu-notification')?.remove();
 const unread=unreadAdminFeedbackCount();
 button.classList.toggle('has-notification',unread>0);
 if(unread){const badge=document.createElement('b');badge.className='v6-menu-notification';badge.textContent=unread>99?'99+':String(unread);badge.setAttribute('aria-label',`${unread} unread player feedback notification${unread===1?'':'s'}`);button.appendChild(badge);}
}
function renderAdminFeedbackInbox(box){
 const inbox=readAdminFeedbackInbox(),unread=inbox.filter(row=>!row.read).length;
 box.innerHTML=`<section class="v6-admin-feedback-summary"><div><span>ADMIN INBOX Â· THIS DEVICE</span><h3>Player feedback</h3><p>Submissions from player profiles using this browser appear here. Feedback from another phone needs a shared online inbox, which is not connected in this GitHub-only build.</p></div><strong>${unread} unread</strong></section><div class="v6-feedback-actions"><button id="v6MarkAllFeedbackRead" type="button" ${unread?'':'disabled'}>Mark all read</button><button id="v6ClearAdminFeedback" class="danger" type="button" ${inbox.length?'':'disabled'}>Clear inbox</button></div><div class="v6-admin-feedback-inbox">${inbox.map(row=>`<article class="${row.read?'read':'unread'}"><header><span><strong>${esc6(row.playerName||'Player')}</strong><small>${esc6(row.category||'Feedback')}</small></span><time>${new Date(row.at).toLocaleString()}</time></header><p>${esc6(row.text||'')}</p>${row.read?'<span class="v6-feedback-read-state">âœ“ Read</span>':`<button data-v6-feedback-read="${esc6(row.id)}" type="button">Mark read</button>`}</article>`).join('')||'<div class="v6-feedback-empty"><strong>No feedback on this device yet</strong><p>Player profiles in this browser create unread notifications here.</p></div>'}</div>`;
 box.querySelectorAll('[data-v6-feedback-read]').forEach(button=>button.onclick=()=>{const rows=readAdminFeedbackInbox(),item=rows.find(row=>String(row.id)===button.dataset.v6FeedbackRead);if(item)item.read=true;writeAdminFeedbackInbox(rows);updateAdminFeedbackNotification();renderAdminFeedbackInbox(box);});
 document.getElementById('v6MarkAllFeedbackRead').onclick=()=>{const rows=readAdminFeedbackInbox();rows.forEach(row=>row.read=true);writeAdminFeedbackInbox(rows);updateAdminFeedbackNotification();renderAdminFeedbackInbox(box);};
 document.getElementById('v6ClearAdminFeedback').onclick=()=>{if(confirm('Clear every message from the administrator feedback inbox?')){writeAdminFeedbackInbox([]);updateAdminFeedbackNotification();renderAdminFeedbackInbox(box);}};
 updateAdminFeedbackNotification();
}
function renderPlayerFeedback(box,notice=''){
 box.innerHTML='';
 return;
 box.innerHTML=`${notice?`<div class="v6-feedback-sent" role="status">âœ“ ${esc6(notice)}</div>`:''}<p>Save feedback for the administrator profile on this device. A copy stays in this player profile and is included in account backups.</p><div class="v6-feedback-device-warning"><strong>Different phone?</strong> This GitHub-only version cannot transfer feedback between devices until a shared online inbox is connected.</div><label>Category<select id="v6FeedbackCategory"><option>Something is confusing</option><option>Learning content</option><option>Balance or rewards</option><option>Visual or mobile issue</option><option>Feature idea</option></select></label><label>Message<textarea id="v6FeedbackText" rows="5" maxlength="800" placeholder="Tell the administrator what happened or what would improve the game..."></textarea></label><div class="v6-feedback-actions"><button id="v6SendFeedback" class="primary" type="button">Save Feedback</button><button id="v6ClearFeedback" type="button">Clear my history</button></div><h3>Your saved feedback (${state.v6.feedback.length})</h3><div class="v6-feedback-history">${state.v6.feedback.slice().reverse().map(x=>`<article><strong>${esc6(x.category)}</strong><p>${esc6(x.text)}</p><small>${new Date(x.at).toLocaleString()} Â· ${x.sentToAdmin===true?'Saved in this deviceâ€™s admin inbox':x.sentToAdmin===false?'Saved note':'Saved before admin inbox'}</small></article>`).join('')||'<p>No feedback saved yet.</p>'}</div>`;
 document.getElementById('v6SendFeedback').onclick=()=>{const text=document.getElementById('v6FeedbackText').value.trim();if(!text)return;submitPlayerFeedback(document.getElementById('v6FeedbackCategory').value,text);renderPlayerFeedback(box,'Feedback saved to the administrator inbox on this device.');};
 document.getElementById('v6ClearFeedback').onclick=()=>{if(confirm('Clear this profileâ€™s feedback history? Messages already sent to the administrator will remain in the admin inbox.')){state.v6.feedback=[];save();renderPlayerFeedback(box);}};
}
function openFeedback(){ensureV6();openOverlay('feedback');const dialog=document.getElementById('v6FeedbackOverlay'),box=document.getElementById('v6FeedbackContent');if(dialog){const kicker=dialog.querySelector('.menu-header-copy span'),title=dialog.querySelector('.menu-header-copy h2');if(kicker)kicker.textContent='Help improve the mine';if(title)title.textContent='💬 Player Feedback';}if(isDeveloperSession)box.innerHTML='';else renderPlayerFeedback(box);box?.insertAdjacentHTML('afterbegin','<section class="v6-discord-feedback"><span>COMMUNITY DISCORD</span><h3>Join the Language Miner community</h3><p>Share ideas, report issues, and talk with other players on Discord.</p><a class="supporter-join-link" href="https://discord.gg/AGrGMFjXQm" target="_blank" rel="noopener">Join our Discord</a></section>');}
function shareGameUrl(){
 const configured=String(window.LANGUAGE_MINER_PUBLIC_URL||document.querySelector('meta[name="language-miner-share-url"]')?.content||'').trim();if(configured)return configured;
 let source=location.href;try{if(window.top!==window&&window.top.location.origin===location.origin)source=window.top.location.href;}catch{}
 const url=new URL(source);url.hash='';url.search='';if(/\/preview\.html$/i.test(url.pathname))url.pathname=url.pathname.replace(/preview\.html$/i,'index.html');return url.href;
}
function localShareLink(value){try{const url=new URL(value);return url.protocol==='file:'||['localhost','127.0.0.1','::1'].includes(url.hostname);}catch{return true;}}
async function copyShareLink(value){
 try{if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(value);return true;}}catch{}
 const input=document.getElementById('v6ShareUrl');if(!input)return false;input.focus();input.select();try{return document.execCommand('copy');}catch{return false;}
}
function openShareGame(){
 ensureV6();openOverlay('feedback');const dialog=document.getElementById('v6FeedbackOverlay'),box=document.getElementById('v6FeedbackContent'),url=shareGameUrl();if(!dialog||!box)return;
 const kicker=dialog.querySelector('.menu-header-copy span'),title=dialog.querySelector('.menu-header-copy h2');if(kicker)kicker.textContent='Easy game sharing';if(title)title.textContent='📱 Share Language Miner';
 box.innerHTML=`<section class="v6-share-card"><span>SCAN TO PLAY</span><h3>Let friends open the game instantly</h3><p>Scan this code with a phone camera or send the link directly.</p><div class="v6-share-qr"><canvas id="v6ShareQr" role="img" aria-label="QR code for the Language Miner game link"></canvas></div><label class="v6-share-link"><span>Game link</span><input id="v6ShareUrl" type="url" readonly value="${esc6(url)}"></label>${localShareLink(url)?'<p class="v6-share-warning">This is a local preview link. Publish the game online before sharing it with another device.</p>':''}<div class="v6-share-actions"><button id="v6CopyShareLink" class="primary" type="button">Copy Link</button><button id="v6NativeShare" type="button">Share</button><button id="v6DownloadQr" type="button">Download QR</button></div><div id="v6ShareStatus" class="v6-share-status" role="status" aria-live="polite"></div></section>`;
 const canvas=document.getElementById('v6ShareQr'),status=document.getElementById('v6ShareStatus');try{window.LanguageMinerQR.draw(canvas,url,{size:288});canvas.dataset.shareUrl=url;}catch(error){status.textContent='QR code could not be created for this link.';canvas.hidden=true;document.getElementById('v6DownloadQr').disabled=true;}
 document.getElementById('v6CopyShareLink').onclick=async()=>{status.textContent=await copyShareLink(url)?'Link copied.':'Could not copy the link. Select it above and copy it manually.';};
 document.getElementById('v6NativeShare').onclick=async()=>{if(!navigator.share){status.textContent=await copyShareLink(url)?'Link copied.':'Could not share this link.';return;}try{await navigator.share({title:'Language Miner',text:'Learn languages by mining gems in Language Miner.',url});status.textContent='Game link shared.';}catch(error){status.textContent=error?.name==='AbortError'?'Share cancelled.':'Could not share this link.';}};
 document.getElementById('v6DownloadQr').onclick=()=>{const link=document.createElement('a');link.download='language-miner-qr.png';link.href=canvas.toDataURL('image/png');link.click();status.textContent='QR code downloaded.';};
}
function openHelpCommunity(){ensureV6();openOverlay('feedback');const dialog=document.getElementById('v6FeedbackOverlay'),box=document.getElementById('v6FeedbackContent');if(!dialog||!box)return;const kicker=dialog.querySelector('.menu-header-copy span'),title=dialog.querySelector('.menu-header-copy h2');if(kicker)kicker.textContent='Guidance, sharing, and community';if(title)title.textContent='🛟 Help & Community';box.innerHTML=`<section class="v6-help-community"><article><span>❔</span><div><h3>Game Guide</h3><p>Search the complete how-to for courses, goals, rewards, study tools, and account features.</p></div><button id="v6HelpGuide" type="button">Open Guide</button></article><article><span>📱</span><div><h3>Share Language Miner</h3><p>Show a QR code, copy the game link, or use your device share menu.</p></div><button id="v6HelpShare" type="button">Share Game</button></article><article><span>💬</span><div><h3>Feedback &amp; Discord</h3><p>Join the community, report an issue, or share an idea.</p></div><button id="v6HelpFeedback" type="button">Open Community</button></article></section>`;const openFromHelp=action=>{closeOverlay('feedback');setTimeout(action,0);};document.getElementById('v6HelpGuide').onclick=()=>openFromHelp(()=>openTour());document.getElementById('v6HelpShare').onclick=()=>openFromHelp(openShareGame);document.getElementById('v6HelpFeedback').onclick=()=>openFromHelp(openFeedback);}
function addMenuItems(){const grid=document.querySelector('.menu-wheel');if(!grid)return;const existing=[...grid.querySelectorAll('[data-v6-menu]')];if(existing.length===2&&grid.querySelector('[data-v6-menu="settings"]')&&grid.querySelector('[data-v6-menu="help"]')){updateAdminFeedbackNotification();return;}existing.forEach(button=>button.remove());[['settings','⚙️','Settings','Reading, audio, accessibility, recovery, and saves'],['help','🛟','Help & Community','Guide, sharing, feedback, and Discord']].forEach(([id,icon,name,desc])=>{const b=document.createElement('button');b.type='button';b.dataset.v6Menu=id;b.dataset.menuCategoryName='player';b.innerHTML=`<span>${icon}</span><strong>${name}</strong><small>${desc}</small>`;b.onclick=()=>{closeGameMenu();id==='settings'?openSettings():openHelpCommunity();};grid.appendChild(b);});updateAdminFeedbackNotification();}
function storyCheck(){ensureV6();const selectedLearning=document.documentElement.dataset.lmLearningLanguage;if(!selectedLearning||selectedLearning!=='ja')return;const stage=selectedStageIndex(),id='stage-'+stage;if(state.v6.storySeen.includes(id)||!activeProfileId)return;state.v6.storySeen.push(id);save();const toast=document.getElementById('v6StoryToast');if(!toast)return;const lines=['Your first lantern is lit. The Hiragana tunnels await.','Katakana markings glow on the cavern wall.','The N5 quarry opens into the wider world of Japanese.','Your journey reaches the N4 tunnel. Sentences grow richer here.','The N3 depths demand sharper reading and listening.','N2 crystals respond only to disciplined learners.','The N1 practice mine stands before you.'][stage];toast.innerHTML=`<span>ðŸ“– JOURNEY UPDATE</span><strong>${stages[stage]?.name||'New mine'}</strong><p>${lines}</p>`;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),5000);}
function advertiseGuideAfterOnboarding(){
 ensureV6();
 if(state.v6.onboardingGuideOffered||state.v6.tourComplete)return;
 state.v6.onboardingGuideOffered=true;
 save();
 setTimeout(()=>openTour(0),300);
}
function isStandaloneApp(){return window.matchMedia?.('(display-mode: standalone)').matches||window.navigator.standalone===true;}
function isAppleMobileDevice(){return /iphone|ipad|ipod/i.test(navigator.userAgent)||navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1;}
function syncInstallAppControl(){
 if(window.LanguageMinerInstall){window.LanguageMinerInstall.sync();return;}
 const button=document.getElementById('installAppBtn'),status=document.getElementById('v6InstallStatus');
 if(!button)return;
 const installed=isStandaloneApp(),appleMobile=isAppleMobileDevice(),ready=!!deferredInstallPrompt;
 button.hidden=installed;
 button.disabled=!installed&&!appleMobile&&!ready;
 button.title=installed?'Language Miner is already installed':appleMobile?'Add Language Miner to the iPhone or iPad Home Screen':ready?'Install Language Miner on this device':'Installation is not currently available in this browser';
 if(status)status.textContent=installed?'Language Miner is installed. Remove the old home-screen app once and reinstall it to refresh its name and launcher icon.':appleMobile?'Tap Install App for iPhone or iPad Add to Home Screen instructions.':ready?'Language Miner is ready to install with the advanced pickaxe icon.':'Your browser will enable this button when Language Miner is ready to install.';
}
async function requestInstallApp(){
 if(window.LanguageMinerInstall){await window.LanguageMinerInstall.request();return;}
 if(deferredInstallPrompt){const prompt=deferredInstallPrompt;deferredInstallPrompt=null;await prompt.prompt();const result=await prompt.userChoice;if(result.outcome==='accepted')setMessage('Language Miner is installed and ready to play.','correct');syncInstallAppControl();return;}
 if(isAppleMobileDevice())alert('To install Language Miner: tap the Share button in Safari, then choose Add to Home Screen.');
}
function initInstallApp(){
 if(window.LanguageMinerInstall){window.LanguageMinerInstall.bind(document);return;}
 if(!installEventsBound){
  installEventsBound=true;
  window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();deferredInstallPrompt=event;syncInstallAppControl();});
  window.addEventListener('appinstalled',()=>{deferredInstallPrompt=null;syncInstallAppControl();setMessage('Language Miner is installed and ready to play.','correct');});
 }
 const button=document.getElementById('installAppBtn');
 if(button&&!button.dataset.installBound){button.dataset.installBound='1';button.addEventListener('click',requestInstallApp);}
 syncInstallAppControl();
}
function init(){ensureV6();shell();initCompanionDisplayButton();applySettings();renderCoach('refresh');addMenuItems();storyCheck();createSnapshot();initInstallApp();}
function openPatreon(){
 ensureV6();openOverlay('feedback');
 const dialog=document.getElementById('v6FeedbackOverlay'),box=document.getElementById('v6FeedbackContent');
 if(dialog){const kicker=dialog.querySelector('.menu-header-copy span'),title=dialog.querySelector('.menu-header-copy h2');if(kicker)kicker.textContent='Language Miner Support';if(title)title.textContent='⭐ Patreon Tiers';}
 if(box)box.innerHTML=`<section class="supporter-tier-list" aria-label="Patreon membership benefits">
  <article class="supporter-tier tier-one">
   <div class="supporter-tier-media"><img src="patreon-tier-1-supporter.png?v=6.4.126-parent-teacher-center" alt="Supporter tier: one dollar per month" width="1254" height="1254"></div>
   <div class="supporter-tier-copy"><span>🟩 TIER 1 · SUPPORTER · $1 / MONTH</span><h3>Cosmetics and community</h3><p>Access character outfits, hair, hats, accessories, rock skins, mine backgrounds, pickaxe skins, full-page wallpapers, color themes, and achievement titles. Purchased cosmetics stay in the player's Bag. Community extras include the Discord role, behind-the-scenes posts, development updates, polls, and optional Supporter credits.</p></div>
  </article>
  <article class="supporter-tier tier-two">
   <div class="supporter-tier-media"><img src="patreon-tier-2-companion-keeper.png?v=6.4.126-parent-teacher-center" alt="Companion Keeper tier: three dollars per month" width="1254" height="1254"></div>
   <div class="supporter-tier-copy"><span>🟦 TIER 2 · COMPANION KEEPER · $3 / MONTH</span><h3>Everything in Tier 1, plus companions</h3><p>Discover 11 named companions. Adopt and equip one, manage Show, Hide, or Choose from the Shop, and receive its active bonus for XP, supplies, Smart Review, Guardian rewards, treasure, or shop prices.</p></div>
  </article>
  <article class="supporter-tier tier-three">
   <div class="supporter-tier-media"><img src="patreon-tier-3-settlement-founder.png?v=6.4.126-parent-teacher-center" alt="Settlement Founder tier: five dollars per month" width="1254" height="1254"></div>
   <div class="supporter-tier-copy"><span>🟨 TIER 3 · SETTLEMENT FOUNDER · $5 / MONTH</span><h3>Everything above, plus settlements</h3><p>Build five Settlement buildings through 25 permanent upgrades, decorations, and lasting bonuses. Claim Memory Mine, Crystal Match, and Star Word Defender without spending Nuggets, choose any unlocked lesson inside each game, and save personal-best moves, completion times, and scores.</p></div>
  </article>
  <p class="supporter-link-note">Your game account securely owns the Patreon tier reported by your active membership.</p>
 </section><a class="supporter-join-link" href="https://www.patreon.com/cw/Erendragneel/membership" target="_blank" rel="noopener">Join Language Miner on Patreon</a>`;
 window.renderJapaneseMinerPatreonLinking?.(box);
};
window.openJapaneseMinerPatreon=()=>openPatreon();
const oldShowQuestion=showQuestion;showQuestion=function(q){oldShowQuestion(q);renderCoach('question');};
const oldAnswer=answer;answer=function(opt,button){const q=state.active,was=state.answered,correct=!!q&&opt===q.a;if(q&&!was&&/[\u3040-\u30ff\u3400-\u9fff]/.test(stripMarkup(opt)))speakJapanese(opt);oldAnswer(opt,button);if(q&&!was){explanation(q,opt,correct);renderCoach(correct?'correct':'wrong');}createSnapshot();};
const oldRender=render;render=function(){ensureV6();oldRender();applySettings();renderCoach('refresh');addMenuItems();storyCheck();};
const oldSave=save;save=function(){oldSave();if(state?.v6)createSnapshot();};
const oldLoad=loadProfile;loadProfile=function(profile,...args){const result=oldLoad(profile,...args);ensureV6();applySettings();setTimeout(init,0);return result;};
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeCoach();document.querySelectorAll('.v6-overlay.open').forEach(o=>closeOverlay(o.id.includes('Tour')?'tour':o.id.includes('Settings')?'settings':'feedback'));}});
document.addEventListener('click',e=>{if(e.target.closest?.('#beginJourneyBtn,#acceptPlacementBtn'))advertiseGuideAfterOnboarding();});
document.addEventListener('click',e=>{const toggle=e.target.closest?.('.character-option-toggle');if(!toggle)return;const section=toggle.closest('.character-option'),collapsed=section.classList.toggle('collapsed');toggle.setAttribute('aria-expanded',String(!collapsed));const key=section.dataset.characterSection;if(key)try{localStorage.setItem('jmCharacterSection:'+key,collapsed?'collapsed':'open');}catch{}});
document.addEventListener('jm-character-sections-ready',()=>document.querySelectorAll('.character-option[data-character-section]').forEach(section=>{try{if(localStorage.getItem('jmCharacterSection:'+section.dataset.characterSection)==='collapsed'){section.classList.add('collapsed');section.querySelector('.character-option-toggle')?.setAttribute('aria-expanded','false');}}catch{}}));
const characterSectionObserver=new MutationObserver(rows=>{if(rows.some(r=>[...r.addedNodes].some(n=>n.nodeType===1&&(n.matches?.('.character-option')||n.querySelector?.('.character-option')))))document.dispatchEvent(new Event('jm-character-sections-ready'));});
const observeCharacterSections=()=>{try{if(document.body?.nodeType===Node.ELEMENT_NODE)characterSectionObserver.observe(document.body,{childList:true,subtree:true});}catch{}};
if(document.body)observeCharacterSections();else document.addEventListener('DOMContentLoaded',observeCharacterSections,{once:true});
window.openJapaneseMinerGuide=openTour;window.openJapaneseMinerSettings=openSettings;window.openJapaneseMinerFeedback=openFeedback;window.openLanguageMinerHelpCommunity=openHelpCommunity;window.openLanguageMinerShare=openShareGame;window.languageMinerShareUrl=shareGameUrl;
window.addEventListener('lm-interface-language-changed',event=>{if(event.detail?.learning==='ja')return;const toast=document.getElementById('v6StoryToast');if(toast){toast.classList.remove('show');toast.replaceChildren();}});
init();
})();

