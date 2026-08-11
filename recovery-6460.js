// Language Miner v6.4.6 recovered integration layer.
// Restores v6.4.3 accumulated study time after the kana-family branch.
// v6.4.3 - Accumulated daily study time.
const STUDY_ACTIVITY_WINDOW_MS=2*60*1000;
let studyTimerLastTick=Date.now();
let studyTimerActiveUntil=0;
function normalizeStudyTime(raw){const clean={};if(raw&&typeof raw==="object"&&!Array.isArray(raw)){Object.entries(raw).forEach(([key,value])=>{if(/^\d{4}-\d{2}-\d{2}$/.test(key)){const ms=Math.max(0,Math.floor(Number(value)||0));if(ms)clean[key]=ms;}});}return clean;}
function localDateKeyAt(timestamp){const d=new Date(timestamp);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;}
function nextLocalMidnight(timestamp){const d=new Date(timestamp);return new Date(d.getFullYear(),d.getMonth(),d.getDate()+1).getTime();}
function ensureStudyTimeState(){state.studyTimeByDate=normalizeStudyTime(state.studyTimeByDate);state.studyDates=Array.isArray(state.studyDates)?state.studyDates:[];}
function addStudyElapsed(start,end){ensureStudyTimeState();let cursor=start;while(cursor<end){const segmentEnd=Math.min(end,nextLocalMidnight(cursor));const key=localDateKeyAt(cursor);state.studyTimeByDate[key]=Math.max(0,Number(state.studyTimeByDate[key])||0)+(segmentEnd-cursor);if(!state.studyDates.includes(key))state.studyDates.push(key);cursor=segmentEnd;}state.studyDates.sort();}
function flushStudyTimer(now=Date.now(),allowHidden=false){if(activeProfileId&&(allowHidden||document.visibilityState!=="hidden")&&studyTimerLastTick<studyTimerActiveUntil){const end=Math.min(now,studyTimerActiveUntil);if(end>studyTimerLastTick){addStudyElapsed(studyTimerLastTick,end);save();}}studyTimerLastTick=now;}
function markStudyActivity(now=Date.now()){flushStudyTimer(now);studyTimerActiveUntil=now+STUDY_ACTIVITY_WINDOW_MS;studyTimerLastTick=now;}
function pauseStudyTimer(now=Date.now()){flushStudyTimer(now,true);studyTimerActiveUntil=0;studyTimerLastTick=now;}
function resumeStudyTimer(now=Date.now()){studyTimerLastTick=now;studyTimerActiveUntil=activeProfileId&&document.visibilityState!=="hidden"?now+STUDY_ACTIVITY_WINDOW_MS:0;}
function studyMillisecondsFor(key){ensureStudyTimeState();return Math.max(0,Number(state.studyTimeByDate[key])||0);}
function formatStudyDuration(milliseconds,{compact=false}={}){const totalMilliseconds=Math.max(0,Number(milliseconds)||0),totalMinutes=Math.floor(totalMilliseconds/60000);if(totalMinutes<1){const seconds=Math.floor(totalMilliseconds/1000);return compact?`${seconds}s`:`${seconds} ${seconds===1?"second":"seconds"}`;}const hours=Math.floor(totalMinutes/60),minutes=totalMinutes%60;if(compact)return hours?`${hours}h${minutes?` ${minutes}m`:""}`:`${minutes}m`;return hours?`${hours} ${hours===1?"hour":"hours"}${minutes?` ${minutes} ${minutes===1?"minute":"minutes"}`:""}`:`${minutes} ${minutes===1?"minute":"minutes"}`;}
function totalStudyMilliseconds(){ensureStudyTimeState();return Object.values(state.studyTimeByDate).reduce((sum,value)=>sum+Math.max(0,Number(value)||0),0);}
const normalizeStateV643=normalizeState;
normalizeState=function(raw){const next=normalizeStateV643(raw);next.studyTimeByDate=normalizeStudyTime(next.studyTimeByDate);return next;};
const mineV643=mine;
mine=function(){markStudyActivity();return mineV643();};
const answerV643=answer;
answer=function(...args){markStudyActivity();return answerV643(...args);};
const renderStudyCalendarV643=renderStudyCalendar;
renderStudyCalendar=function(){flushStudyTimer();renderStudyCalendarV643();ensureStudyTimeState();const year=studyCalendarMonth.getFullYear(),month=studyCalendarMonth.getMonth();const monthPrefix=`${year}-${String(month+1).padStart(2,"0")}-`;const monthMilliseconds=Object.entries(state.studyTimeByDate).filter(([key])=>key.startsWith(monthPrefix)).reduce((sum,[,value])=>sum+Number(value||0),0);const stats=document.querySelector(".study-calendar-stats");if(stats){let total=stats.querySelector("[data-study-time-total]");if(!total){const card=document.createElement("div");card.innerHTML='<span>Total study time</span><strong data-study-time-total>0m</strong>';stats.appendChild(card);total=card.querySelector("[data-study-time-total]");}total.textContent=formatStudyDuration(totalStudyMilliseconds(),{compact:true});const monthCard=document.getElementById("calendarMonthDays")?.closest("div");if(monthCard){monthCard.querySelector("span").textContent="This month";monthCard.querySelector("strong").innerHTML=`${state.studyDates.filter(d=>d.startsWith(monthPrefix)).length} days <small>${formatStudyDuration(monthMilliseconds,{compact:true})}</small>`;}}document.querySelectorAll("#studyCalendarGrid .calendar-day:not(.empty)").forEach(button=>{const day=String(button.childNodes[0]?.textContent||"").trim();const key=`${monthPrefix}${day.padStart(2,"0")}`;const milliseconds=studyMillisecondsFor(key);if(milliseconds>0){const duration=document.createElement("span");duration.className="calendar-duration";duration.textContent=formatStudyDuration(milliseconds,{compact:true});button.appendChild(duration);button.setAttribute("aria-label",`${key}: studied for ${formatStudyDuration(milliseconds)}`);}button.addEventListener("click",()=>{const detail=document.getElementById("calendarDayDetail");if(milliseconds>0&&detail){const label=new Date(key+"T12:00:00").toLocaleDateString(undefined,{weekday:"long",month:"long",day:"numeric",year:"numeric"});detail.innerHTML=`<strong>${label}</strong><br><b>${formatStudyDuration(milliseconds)}</b> of Japanese study recorded.`;}});});};
const logoutV643=logout;
logout=function(){pauseStudyTimer();return logoutV643();};
const loadProfileV643=loadProfile;
loadProfile=function(profile,...args){pauseStudyTimer();const result=loadProfileV643(profile,...args);ensureStudyTimeState();resumeStudyTimer();return result;};
setInterval(()=>{flushStudyTimer();if(document.getElementById("studyCalendarOverlay")?.classList.contains("open"))renderStudyCalendar();},15000);
document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden")pauseStudyTimer();else resumeStudyTimer();});
document.addEventListener("pointerdown",()=>{if(activeProfileId&&document.visibilityState!=="hidden")markStudyActivity();},{passive:true});
document.addEventListener("keydown",()=>{if(activeProfileId&&document.visibilityState!=="hidden")markStudyActivity();});
window.addEventListener("pagehide",()=>pauseStudyTimer());
window.addEventListener("beforeunload",()=>pauseStudyTimer());
ensureStudyTimeState();
if(activeProfileId)resumeStudyTimer();
window.JapaneseMinerRecovery=Object.freeze({
  version:'6.4.6-recovered',
  selectedStage:()=>selectedStageIndex(),
  activeQuestionStage:()=>state.active?Number(state.active.stage):null,
  routeIsValid:()=>validKanaQuestionForSelection(state.active),
  currentKanaFamily:()=>selectedStageIndex()<=1?currentKanaFamily(selectedStageIndex()).id:null,
  totalStudyMilliseconds:()=>totalStudyMilliseconds()
});
