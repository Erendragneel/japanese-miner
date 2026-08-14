// Language Miner complete beginner handbook.
(()=>{
'use strict';
const TEXT={
 kicker:'GAME HANDBOOK',title:'Everything in Language Miner, explained',intro:'Choose a topic or search for anything you cannot find. Every topic shows the exact path through the game and explains what each control does.',search:'Search the guide',searchPlaceholder:'Search controls, review, rewards, Patreon, settings…',allTopics:'All topics',where:'WHERE TO FIND IT',how:'HOW IT WORKS',remember:'REMEMBER',openArea:'Open this area',backAll:'Back to all topics',previous:'Previous topic',next:'Next topic',finish:'Finish guide',close:'Close guide',menu:'Menu',noResults:'No guide topics match that search.',topics:'{count} topics',topicCount:'Topic {current} of {total}',complete:'Guide complete. You can reopen it from Menu → Player → Game Guide.',startHere:'Not sure where to begin? Start with “Your first five minutes.”'
};
const CATEGORIES=[
 {id:'start',icon:'🧭',name:'Start Here'},
 {id:'learning',icon:'📚',name:'Learning'},
 {id:'progress',icon:'📈',name:'Progress & Rewards'},
 {id:'collection',icon:'🎒',name:'Collection & Support'},
 {id:'help',icon:'🛟',name:'Help & Safety'}
];
const TOPICS=[
 {id:'first-five-minutes',category:'start',icon:'🌱',title:'Your first five minutes',summary:'Use this simple route whenever you are unsure how to begin.',path:'Home screen',steps:[
  'Check the language pair at the top. The language on the left is the language you know; the language on the right is the course you are learning.',
  'Tap the mine rock or New Question, choose one answer, and read the correction.',
  'Use Next Question to continue. Answered questions, mastery, rewards, and study time save to the current player profile.',
  'For a structured lesson, open Menu → Explore → Expedition Hub and choose an available mine or lesson.'
 ],note:'The Game Guide is always available at Menu → Player → Game Guide.',actions:[['mine','Go to the Mine'],['expedition','Open Expedition Hub']]},
 {id:'main-controls',category:'start',icon:'🎮',title:'Main screen controls',summary:'Learn what the buttons around the mine do and how to return from other screens.',path:'Home screen',steps:[
  'The top bar contains Change Language, your player identity, quick Stats, the Practice Calendar, and Log out.',
  'The center of the home screen shows the active mine, question, answers, reading support, audio, Hints, Shields, hearts, and the correction after an answer.',
  'The round Menu button at the lower-right opens every major game area. Companion visibility is managed in the Companions tab of the Shop.',
  'Use ← Menu to return to the category menu. Use × to close an overlay and return directly to the mine.'
 ],note:'If a button is off-screen on a phone, scroll inside the open panel.',actions:[['menu','Open the Menu']]},
 {id:'menu-map',category:'start',icon:'☰',title:'Where everything is in the Menu',summary:'The Menu is divided into Explore, Gear, and Player so related features stay together.',path:'Home screen → Menu',steps:[
  'Explore contains Expedition Hub, Course, Learning Path, Mine, Quests, and Missions.',
  'Gear contains Shop, Inventory or Bag, Character, and Notebook.',
  'Player contains the Player Dashboard, Player Stats, Parent/Teacher Center, Achievements, Calendar, Account, Game Guide, Share Game, Accessibility, Feedback, and Patreon.',
  'Choose a category first, then choose its feature. The selected category controls which feature buttons are visible.'
 ],note:'When you cannot find something, return to Menu and check all three category buttons.',actions:[['menu','Open the Menu']]},
 {id:'languages-and-profile',category:'start',icon:'🌐',title:'Languages, placement, and player profiles',summary:'The known language controls the interface; the learning language controls the course.',path:'Home screen → Change Language · Menu → Player → Account',steps:[
  'Known language translates menus, instructions, and answer meanings. Learning language selects lesson words, pronunciation, Expedition Hub, and course progress.',
  'Each learning language keeps separate lesson, quiz, guardian, and placement progress.',
  'A placement test is stored once per player and learning language. Changing only the known language does not create another attempt.',
  'Always check the active player name before studying. Account tools export or import that player’s saved progress.'
 ],note:'If the wrong course appears, use Change Language and confirm both sides of the language pair.',actions:[['language','Change Language'],['account','Open Account']]},
 {id:'expedition-hub',category:'learning',icon:'🗺️',title:'Expedition Hub and course map',summary:'Use the Expedition Hub to choose a mine, lesson, guardian, or related study tool.',path:'Menu → Explore → Expedition Hub',steps:[
  'The Hub always follows the selected learning language. Available or highlighted mines can be opened; a lock explains the requirement for a later mine.',
  'Open a mine card, then choose an available family, section, lesson, checkpoint, or guardian.',
  'The Hub tabs also lead to Bosses, Review, Word Book, Companions, Settlement, Missions, Events, and Fashion.',
  'Expedition Hub, Course, and Learning Path are different views of the same saved course progress.'
 ],note:'Selecting a lesson makes it the active route used by the mine on the home screen.',actions:[['expedition','Open Expedition Hub'],['course','Open Course']]},
 {id:'lessons-and-mastery',category:'learning',icon:'📘',title:'Lessons, preview cards, and mastery',summary:'Lessons organize the course into manageable groups and unlock later checkpoints.',path:'Menu → Explore → Course · Expedition Hub → open a mine',steps:[
  'Open a lesson to see its preview cards, then begin the practice questions. Skip Lesson Review enters the lesson without opening every preview card.',
  'Alphabet and kana routes unlock their next family as the current family reaches its displayed mastery requirement.',
  'Vocabulary, grammar, reading, listening, and sentence lessons show their own mastery and checkpoint requirements.',
  'Complete the requirement printed on the lesson or checkpoint to unlock the next part of the course.'
 ],note:'Lesson progress is saved after answered questions, not merely by opening a lesson.',actions:[['course','Open Course'],['mine','Go to the Mine']]},
 {id:'writing-practice',category:'learning',icon:'✍️',title:'Alphabet and character writing practice',summary:'Trace and write the selected course’s alphabet, script, Kana, Kanji, Hangul, Hanzi, or other characters in short saved lessons.',path:'Menu → Explore → Writing Practice',steps:[
  'Writing Practice automatically follows the learning language shown at the top of the game.',
  'Choose a writing set and lesson, select a character, then trace the faint guide on the writing pad.',
  'Hide the guide and write the character again from memory. Clear removes the page, while Undo removes only the most recent stroke.',
  'Complete & Next saves that character to the current player and advances through the lesson. Every language keeps its own writing record.'
 ],note:'Writing completion is practice progress; it does not spend hearts, supplies, or Nuggets.',actions:[['writing','Open Writing Practice']]},
 {id:'question-controls',category:'learning',icon:'⛏️',title:'Answering questions and using study controls',summary:'Understand the normal question loop, optional help, and correction controls.',path:'Menu → Explore → Mine · Home screen → mine rock',steps:[
  'Tap the rock or New Question to load a question from the active course route.',
  'Use the optional audio control when you want pronunciation. Reading support and furigana can be adjusted without changing the language course.',
  'Choose one answer. The game marks it, explains the correction, updates progress, and then enables the next-question control.',
  'Hint removes uncertainty, Shield protects one normal mistake, and “I don’t know this kanji” appears only when the visible prompt contains kanji.'
 ],note:'Normal practice can use hearts. Placement, quizzes, and guardians show their own rules before they begin.',actions:[['mine','Go to the Mine'],['health','Open Practice Health']]},
 {id:'quizzes-and-tests',category:'learning',icon:'⏱️',title:'Quizzes, tests, and fastest times',summary:'Assessments use saved attempts, clear result screens, and personal completion records.',path:'Menu → Explore → Course → lesson checkpoint or Tests',steps:[
  'Placement recommends a starting point. Lesson review quizzes check recent lessons. Guardian tests decide when the next mine unlocks.',
  'The question count, pass score, and timer are shown before or during each assessment. Answers advance automatically where the test says they will.',
  'Incorrect answered questions appear in the results and Notebook; skipped or unanswered questions are not recorded as mistakes.',
  'The fastest successful completion is saved to the current player profile. A slower later success does not replace the record.'
 ],note:'Leaving an active assessment may end that attempt, so finish it before opening another game area.',actions:[['course','Open Course'],['notebook','Open Notebook']]},
 {id:'guardians',category:'learning',icon:'👹',title:'Guardians and unlocking the next mine',summary:'Guardians are the final course gates at the end of each mine.',path:'Menu → Explore → Expedition Hub → Bosses',steps:[
  'A guardian uses questions from the mine you are trying to complete.',
  'The challenge is silent, continues after wrong answers, and shows results when all questions are answered or its timer expires.',
  'Meet the pass requirement shown by that guardian to unlock the next mine. A lock remains until the required earlier guardian is defeated.',
  'Successful guardian completion times are saved so the best time remains visible.'
 ],note:'Guardian attempts do not spend normal-practice hearts or Shields.',actions:[['bosses','Open Bosses'],['expedition','Open Expedition Hub']]},
 {id:'smart-review',category:'learning',icon:'🧠',title:'Daily Refresher, Smart Review, and Review Queue',summary:'Use review tools to revisit previous material without losing your place.',path:'Menu → Gear → Notebook → Review Queue · Expedition Hub → Review',steps:[
  'Daily Refresher prepares up to ten familiar questions from the previous completed study session and has no timer, heart loss, or lesson penalty.',
  'Smart Review uses a saved spaced-repetition queue. It stays in review mode across stages and lessons until the queue is complete or you deliberately end it.',
  'Notebook Review Queue shows every due word. Search the list or select one exact word to move it to the current review position.',
  'Continue Smart Review resumes the exact unanswered queue item after leaving or reloading.'
 ],note:'Review progress is separate from the active lesson, so Smart Review does not silently return to normal lesson questions.',actions:[['notebook','Open Notebook'],['review','Open Review Center']]},
 {id:'notebook-and-word-book',category:'learning',icon:'📓',title:'Notebook, difficult items, notes, and Word Book',summary:'Notebook manages work that needs attention; Word Book stores collected vocabulary.',path:'Menu → Gear → Notebook · Expedition Hub → Word Book',steps:[
  'Review Queue lists due Smart Review material. Difficult lists quiz and test questions you answered incorrectly.',
  'Notes lets you create, edit, reopen, resolve, or delete your own study reminders.',
  'Correct course vocabulary enters the permanent Word Book automatically, where you can inspect mastery and use optional listening.',
  'Notebook and Word Book are different: Notebook organizes review work; Word Book is the vocabulary collection.'
 ],note:'Use Notebook search when you know the exact word, meaning, prompt, or mine you want.',actions:[['notebook','Open Notebook'],['wordbook','Open Word Book']]},
 {id:'stats-streak-calendar',category:'progress',icon:'📅',title:'Stats, study streak, Calendar, and records',summary:'These screens explain what has been studied and when it happened.',path:'Top bar → Stats or Calendar · Menu → Player → Player Stats',steps:[
  'A study day is recorded when practice questions are answered. Merely opening the game does not add a study day.',
  'Current streak counts consecutive recorded study days. Total study days never decreases when a streak ends.',
  'Practice Calendar shows daily activity, monthly totals, current streak, and total study time. Select a date to inspect that day.',
  'Player Stats shows accuracy, total questions, mastery, practice distribution, recommended focus, and saved assessment records.'
 ],note:'Study timing pauses while the game page is hidden and resumes when it becomes active.',actions:[['calendar','Open Calendar'],['statistics','Open Player Stats']]},
 {id:'parent-teacher-center',category:'progress',icon:'🏫',title:'Parent/Teacher Center and learner access',summary:'Approved adults can switch between linked learners and view progress without controlling the game.',path:'Menu → Player → Parent/Teacher Center',steps:[
  'The Center is a separate read-only area for activity, streaks, due-review counts, course progress, assessment history, and fastest completion records.',
  'Use Link student to send a request to another player profile. Nothing is shared while the request is waiting.',
  'The learner signs in to their own profile, opens Parent/Teacher Center, and chooses Approve or Decline. Only the learner can approve access.',
  'Use Switch student to change reports. Manage access lets an adult cancel or remove a link, and lets a learner revoke previously approved access.'
 ],note:'Linked adults cannot answer questions, spend Nuggets, reset progress, or read private Notebook notes.',actions:[['parentteacher','Open Parent/Teacher Center']]},
 {id:'rewards-and-health',category:'progress',icon:'💎',title:'Nuggets, gemstones, treasure, supplies, and hearts',summary:'Learn what each reward is for and where balances are stored.',path:'Menu → Player → Player Dashboard · Menu → Gear → Inventory',steps:[
  'Nuggets are the main spending value shown in the Shop. Scientific gemstones are fixed checkpoint specimens with saved Nugget values.',
  'Treasure chests appear after answer-streak milestones. Quests, Missions, guardians, achievements, events, and review rewards can add more Nuggets or supplies.',
  'Hints and Shields are supplies shown in Inventory. Hearts are practice health and recover while the game is closed; missing a study day does not remove hearts.',
  'Player Dashboard contains Practice Health, Nugget Exchange, Inventory, mastery, course, Learning Path, and Gem Collection tabs.'
 ],note:'A purchase shows its price before charging. Permanent items do not need to be purchased twice.',actions:[['inventory','Open Inventory or Bag'],['gems','Open Gem Collection']]},
 {id:'goals',category:'progress',icon:'🎯',title:'Quests, Missions, Achievements, and Events',summary:'These systems reward different kinds of consistent play.',path:'Menu → Explore → Quests or Missions · Menu → Player → Achievements · Expedition Hub → Events',steps:[
  'Quests contain daily and weekly goals. Complete the requirement, then use Claim rewards when the reward is ready.',
  'Missions are daily expedition objectives tied to answers, accuracy, review, and treasure. Their Nugget values follow the active mine when the board resets.',
  'Achievements unlock automatically from lifetime milestones and can award Nuggets or character titles.',
  'Events contain seasonal activities and rewards with their own availability or claim rules.'
 ],note:'A completed goal is not always paid automatically; look for a visible Claim button.',actions:[['quests','Open Quests'],['missions','Open Missions']]},
 {id:'shop-bag-character',category:'collection',icon:'🛍️',title:'Shop, Inventory or Bag, and Character',summary:'Buy, find, equip, and manage permanent collection items.',path:'Menu → Gear → Shop, Inventory, or Character',steps:[
  'Shop tabs separate mine cosmetics, pickaxes, character options, fashion, companions, settlement, Arcade, wallpapers, and supplies.',
  'Previewable permanent items show their appearance and price before purchase. Owned items can be equipped again without another charge.',
  'Inventory or Bag groups everything owned, marks equipped items, shows supply counts, and contains claimed Study Arcade games.',
  'Character changes skin tone, hair, clothing, and accessories for the active player profile.'
 ],note:'If an item is missing from the Bag, first claim or purchase it in its Shop tab.',actions:[['shop','Open Shop'],['inventory','Open Inventory or Bag'],['character','Open Character']]},
 {id:'companions',category:'collection',icon:'🐾',title:'3D companions, wardrobes, and display',summary:'Adopt one active companion, dress it in saved outfits, and control where it appears.',path:'Menu, then Gear, then Shop, then Companions',steps:[
  'Companions require verified Patreon Tier 2 or higher. Each companion has a dimensional character portrait, an unlock condition, an adoption cost, and a specialized gameplay bonus.',
  'Equip an adopted companion to open its wardrobe. Explorer Gear is included; Academy, Festival, and Crystal Guardian outfits are global unlocks that work with every adopted companion.',
  'Each companion remembers its own equipped outfit. Switching companions restores the clothing previously selected for that companion.',
  'Use the Companion display button at the top of the Companions Shop to show or hide the dressed companion. Tapping the floating portrait opens this area.'
 ],note:'Clothing is cosmetic. Hiding a companion or changing its outfit never disables the equipped companion’s gameplay bonus.',actions:[['companions','Open Companions']]},
 {id:'settlement',category:'collection',icon:'🏘️',title:'Settlement and permanent upgrades',summary:'Settlement gives Player Levels and Nuggets a long-term upgrade purpose.',path:'Menu → Explore → Expedition Hub → Settlement · Shop → Settlement',steps:[
  'Settlement is a Patreon Tier 3 benefit. Buildings require both the displayed Player Level and Nugget price.',
  'Building levels are permanent. Existing purchased levels stay owned even if later requirements change.',
  'Sakura Garden improves daily Mission Nuggets, while Gem Forge improves answer-streak treasure chest rewards.',
  'Other buildings expand settlement, collection, and long-term progression features as their levels increase.'
 ],note:'The next upgrade button explains whether Player Level, Nuggets, or Patreon access is still required.',actions:[['settlement','Open Settlement'],['patreon','View Patreon Tiers']]},
 {id:'patreon-and-arcade',category:'collection',icon:'⭐',title:'Patreon tiers and the Study Arcade',summary:'Supporter benefits are unlocked by the verified membership attached to the game account.',path:'Menu → Player → Patreon · Menu → Gear → Shop → Arcade',steps:[
  'Tier 1 is the $1 Supporter level for cosmetics, wallpapers, titles, and community benefits.',
  'Tier 2 is the $3 Companion Keeper level and includes Tier 1 plus the companion system.',
  'Tier 3 is the $5 Settlement Founder level and includes everything above, Settlement, Memory Mine, Crystal Match, and Star Word Defender.',
  'Tier 3 players claim each Arcade game once in the Shop, then launch it from Shop or Inventory or Bag without spending Nuggets.'
 ],note:'Patreon access follows the verified account. If Tier 3 ends, Arcade games lock even if they were claimed earlier.',actions:[['patreon','View Patreon Tiers'],['arcade','Open Study Arcade']]},
 {id:'settings-install',category:'help',icon:'⚙️',title:'Accessibility, portrait lock, installation, and recovery',summary:'Adjust comfort, display, sound, rotation, installation, and local safety tools.',path:'Menu → Player → Accessibility',steps:[
  'Text size, reduced motion, high contrast, color indicators, explanations, sound effects, music, and companion display can be changed here.',
  'Portrait lock asks the device to stay upright and also blocks landscape play inside the game. Some phones still require system auto-rotate to be turned off.',
  'Install App now follows https://erendragneel.github.io/language-miner/. If a system prompt is unavailable, the button shows browser-specific Add to Home Screen instructions. Remove an old shortcut once before reinstalling from the renamed address.',
  'Safety snapshots create local recovery points. Restoring a snapshot replaces the current saved state, so inspect its date first.'
 ],note:'Settings save to this browser and active player unless the control says it is device-wide.',actions:[['settings','Open Accessibility']]},
 {id:'sharing-and-backups',category:'help',icon:'📱',title:'Share the game and protect a save',summary:'Use a QR code for the game link and a backup file for player progress.',path:'Menu → Player → Share Game · Menu → Player → Account',steps:[
  'Share Game creates a QR code, copyable link, native share action, and downloadable QR image for the current hosted game address.',
  'A localhost or file preview cannot be opened from another phone. Publish the game online before sharing that preview address.',
  'Account export creates a portable backup of the active player. Import restores that backup in another supported browser or device.',
  'Export a backup before clearing browser storage, resetting a save, changing devices, or making a risky recovery change.'
 ],note:'The QR code shares the game address; it does not contain private player progress.',actions:[['share','Open Share Game'],['account','Open Account']]},
 {id:'common-questions',category:'help',icon:'🛟',title:'Common questions when something looks wrong',summary:'Use these checks before assuming progress or a feature has disappeared.',path:'Menu → Player → Game Guide',steps:[
  'Wrong language: check the top language pair, then use Change Language. Interface text follows the known language; course content follows the learning language.',
  'Missing feature: open Menu and check Explore, Gear, and Player. Some panels also contain tabs that scroll horizontally on a phone.',
  'Locked feature: read the lock message for its guardian, lesson mastery, Player Level, Nugget, or Patreon requirement.',
  'Progress did not change: confirm the active player, answer at least one question, finish or claim the activity, then reopen its progress screen.'
 ],note:'Search this guide by the name printed on any button or screen.',actions:[['language','Change Language'],['menu','Open the Menu']]}
];
const GUIDE_PHRASES=[...Object.values(TEXT),...CATEGORIES.map(item=>item.name),...TOPICS.flatMap(topic=>[topic.title,topic.summary,topic.path,...topic.steps,topic.note,...topic.actions.map(action=>action[1])])];
if(typeof module!=='undefined'&&module.exports){module.exports=[...new Set(GUIDE_PHRASES)];return;}

const escape=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const t=value=>window.LanguageMinerI18n?.translate?.(String(value))||String(value);
const format=(value,data={})=>Object.entries(data).reduce((text,[key,replacement])=>text.replaceAll(`{${key}}`,String(replacement)),t(value));
let selectedCategory='all',searchText='',activeTopicId='';

function createShell(){
 if(document.getElementById('completeGameGuide'))return;
 document.body.insertAdjacentHTML('beforeend',`<div id="completeGameGuide" class="complete-guide-overlay" aria-hidden="true"><section class="complete-guide-panel" role="dialog" aria-modal="true" aria-labelledby="completeGuideTitle"><header class="complete-guide-head"><button id="completeGuideMenu" class="menu-back-button" type="button">← ${escape(t(TEXT.menu))}</button><div><span>${escape(t(TEXT.kicker))}</span><h2 id="completeGuideTitle">${escape(t(TEXT.title))}</h2></div><button id="completeGuideClose" type="button" aria-label="${escape(t(TEXT.close))}">×</button></header><main id="completeGuideContent"></main></section></div>`);
 const overlay=document.getElementById('completeGameGuide');
 document.getElementById('completeGuideClose').onclick=closeGuide;
 document.getElementById('completeGuideMenu').onclick=()=>{closeGuide();setTimeout(()=>document.getElementById('gameMenuBtn')?.click(),0);};
 overlay.onclick=event=>{if(event.target===overlay)closeGuide();};
}
function syncShellText(){const overlay=document.getElementById('completeGameGuide');if(!overlay)return;overlay.querySelector('.complete-guide-head span').textContent=t(TEXT.kicker);document.getElementById('completeGuideTitle').textContent=t(TEXT.title);document.getElementById('completeGuideMenu').textContent=`← ${t(TEXT.menu)}`;document.getElementById('completeGuideClose').setAttribute('aria-label',t(TEXT.close));}
function openGuide(topicId=''){
 document.getElementById('lmFlowClose')?.click();
 document.querySelector('#v6TourOverlay.open [data-v6-close="tour"]')?.click();
 createShell();syncShellText();activeTopicId=TOPICS.some(topic=>topic.id===topicId)?topicId:'';
 const overlay=document.getElementById('completeGameGuide');overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');
 window.syncJapaneseMinerPageScroll?.();
 if(activeTopicId)renderTopic(activeTopicId);else renderIndex();
 setTimeout(()=>document.getElementById(activeTopicId?'completeGuideBackAll':'completeGuideSearch')?.focus(),0);
 return true;
}
function closeGuide(){const overlay=document.getElementById('completeGameGuide');if(!overlay)return;overlay.classList.remove('open');overlay.setAttribute('aria-hidden','true');window.syncJapaneseMinerPageScroll?.();}
function filteredTopics(){const query=searchText.trim().toLocaleLowerCase();return TOPICS.filter(topic=>selectedCategory==='all'||topic.category===selectedCategory).filter(topic=>!query||[topic.title,topic.summary,topic.path,...topic.steps,topic.note].some(value=>t(value).toLocaleLowerCase().includes(query)));}
function cardMarkup(topic){const category=CATEGORIES.find(item=>item.id===topic.category);return `<button type="button" class="complete-guide-card" data-guide-topic="${topic.id}"><span class="complete-guide-card-icon">${topic.icon}</span><div><small>${escape(t(category.name))}</small><strong>${escape(t(topic.title))}</strong><p>${escape(t(topic.summary))}</p><em>📍 ${escape(t(topic.path))}</em></div><b>›</b></button>`;}
function renderTopicCards(){const results=document.getElementById('completeGuideResults'),count=document.getElementById('completeGuideResultCount');if(!results)return;const topics=filteredTopics();if(count)count.textContent=format(TEXT.topics,{count:topics.length});results.innerHTML=topics.length?topics.map(cardMarkup).join(''):`<div class="complete-guide-empty">${escape(t(TEXT.noResults))}</div>`;results.querySelectorAll('[data-guide-topic]').forEach(button=>button.onclick=()=>renderTopic(button.dataset.guideTopic));}
function renderIndex(){
 activeTopicId='';const content=document.getElementById('completeGuideContent');
 content.innerHTML=`<section class="complete-guide-intro"><div><span>${escape(t(TEXT.kicker))}</span><h3>${escape(t(TEXT.title))}</h3><p>${escape(t(TEXT.intro))}</p></div><aside><b>🌱</b><p>${escape(t(TEXT.startHere))}</p><button type="button" data-guide-topic="first-five-minutes">${escape(t(TOPICS[0].title))}</button></aside></section><label class="complete-guide-search"><span>🔎</span><div><small>${escape(t(TEXT.search))}</small><input id="completeGuideSearch" type="search" value="${escape(searchText)}" placeholder="${escape(t(TEXT.searchPlaceholder))}" autocomplete="off"></div></label><div class="complete-guide-filter" id="completeGuideFilter"><button type="button" data-guide-category="all" class="${selectedCategory==='all'?'active':''}">${escape(t(TEXT.allTopics))}</button>${CATEGORIES.map(item=>`<button type="button" data-guide-category="${item.id}" class="${selectedCategory===item.id?'active':''}">${item.icon} ${escape(t(item.name))}</button>`).join('')}</div><div class="complete-guide-results-head"><strong id="completeGuideResultCount"></strong></div><div class="complete-guide-results" id="completeGuideResults"></div><button id="completeGuideFinish" class="complete-guide-finish" type="button">✓ ${escape(t(TEXT.finish))}</button>`;
 content.querySelectorAll('[data-guide-topic]').forEach(button=>button.onclick=()=>renderTopic(button.dataset.guideTopic));
 const input=document.getElementById('completeGuideSearch');input.oninput=()=>{searchText=input.value;renderTopicCards();};
 document.querySelectorAll('[data-guide-category]').forEach(button=>button.onclick=()=>{selectedCategory=button.dataset.guideCategory;document.querySelectorAll('[data-guide-category]').forEach(item=>item.classList.toggle('active',item===button));renderTopicCards();});
 document.getElementById('completeGuideFinish').onclick=completeGuide;
 renderTopicCards();content.scrollTop=0;
}
function renderTopic(id){
 const topic=TOPICS.find(item=>item.id===id);if(!topic)return renderIndex();activeTopicId=id;const index=TOPICS.indexOf(topic),category=CATEGORIES.find(item=>item.id===topic.category),content=document.getElementById('completeGuideContent');
 content.innerHTML=`<article class="complete-guide-topic"><button id="completeGuideBackAll" class="complete-guide-back-all" type="button">← ${escape(t(TEXT.backAll))}</button><div class="complete-guide-topic-title"><span>${topic.icon}</span><div><small>${escape(t(category.name))} · ${escape(format(TEXT.topicCount,{current:index+1,total:TOPICS.length}))}</small><h3>${escape(t(topic.title))}</h3><p>${escape(t(topic.summary))}</p></div></div><section class="complete-guide-location"><span>📍 ${escape(t(TEXT.where))}</span><strong>${escape(t(topic.path))}</strong></section><section class="complete-guide-explanation"><h4>${escape(t(TEXT.how))}</h4><ol>${topic.steps.map(step=>`<li>${escape(t(step))}</li>`).join('')}</ol></section><aside class="complete-guide-remember"><span>💡 ${escape(t(TEXT.remember))}</span><p>${escape(t(topic.note))}</p></aside><div class="complete-guide-open-actions"><span>${escape(t(TEXT.openArea))}</span><div>${topic.actions.map(action=>`<button type="button" data-guide-action="${action[0]}">${escape(t(action[1]))}</button>`).join('')}</div></div><nav class="complete-guide-topic-nav"><button id="completeGuidePrevious" type="button" ${index===0?'disabled':''}>← ${escape(t(TEXT.previous))}</button><button id="completeGuideNext" type="button">${escape(t(index===TOPICS.length-1?TEXT.finish:TEXT.next))} ${index===TOPICS.length-1?'✓':'→'}</button></nav></article>`;
 document.getElementById('completeGuideBackAll').onclick=renderIndex;
 document.getElementById('completeGuidePrevious').onclick=()=>renderTopic(TOPICS[index-1]?.id);
 document.getElementById('completeGuideNext').onclick=()=>index===TOPICS.length-1?completeGuide():renderTopic(TOPICS[index+1].id);
 content.querySelectorAll('[data-guide-action]').forEach(button=>button.onclick=()=>openArea(button.dataset.guideAction));content.scrollTop=0;
}
function completeGuide(){try{state.v6=state.v6||{};state.v6.tourComplete=true;save();}catch{}closeGuide();window.setMessage?.(t(TEXT.complete),'correct');}
function click(selector){const target=document.querySelector(selector);if(target){target.click();return true;}return false;}
function openArea(action){
 closeGuide();setTimeout(()=>{
  if(action==='mine')document.getElementById('rock')?.scrollIntoView({behavior:'smooth',block:'center'});
  else if(action==='menu')document.getElementById('gameMenuBtn')?.click();
  else if(action==='language')document.getElementById('lmChangeLanguageBtn')?.click();
  else if(action==='expedition')window.openJapaneseMinerV5?.('map');
  else if(action==='bosses')window.openJapaneseMinerV5?.('boss');
  else if(action==='review')window.openJapaneseMinerV5?.('review');
  else if(action==='wordbook')window.openJapaneseMinerV5?.('book');
  else if(action==='missions')window.openJapaneseMinerV5?.('missions');
  else if(action==='settlement')window.openJapaneseMinerV5?.('settlement');
  else if(action==='course')click('[data-menu-action="course"]');
  else if(action==='writing')window.openLanguageMinerWritingPractice?.();
  else if(action==='notebook')window.openJapaneseMinerNotebook?.();
  else if(action==='quests')window.openJapaneseMinerQuests?.();
  else if(action==='calendar')document.getElementById('studyCalendarBtn')?.click();
  else if(action==='statistics')click('[data-feature-open="statistics"]');
  else if(action==='parentteacher')window.openLanguageMinerParentTeacherCenter?.();
  else if(action==='account')click('[data-feature-open="account"]');
  else if(action==='character')click('[data-feature-open="profile"]');
  else if(action==='inventory')window.openJapaneseMinerDashboard?.('inventory');
  else if(action==='health')window.openJapaneseMinerDashboard?.('health');
  else if(action==='gems')window.openJapaneseMinerDashboard?.('gems');
  else if(action==='shop'){if(typeof window.openShop==='function')window.openShop('mine-cosmetics');else click('[data-menu-action="shop"]');}
  else if(action==='companions')window.openShop?.('companions');
  else if(action==='patreon')window.openJapaneseMinerPatreon?.();
  else if(action==='arcade')window.openJapaneseMinerArcadeShop?.();
  else if(action==='settings')window.openJapaneseMinerSettings?.();
  else if(action==='share')window.openLanguageMinerShare?.();
 },0);
}
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&document.getElementById('completeGameGuide')?.classList.contains('open'))closeGuide();});
window.addEventListener('lm-interface-language-changed',()=>{createShell();syncShellText();if(!document.getElementById('completeGameGuide')?.classList.contains('open'))return;activeTopicId?renderTopic(activeTopicId):renderIndex();});
const installGuideOverride=()=>{window.openLanguageMinerTranslatedGuide=topicId=>openGuide(topicId);};
installGuideOverride();
window.addEventListener('DOMContentLoaded',installGuideOverride,{once:true});
window.addEventListener('load',installGuideOverride,{once:true});
window.LanguageMinerGameGuide=Object.freeze({open:openGuide,close:closeGuide,topics:()=>TOPICS.map(topic=>({id:topic.id,category:topic.category,title:topic.title,path:topic.path}))});
})();
