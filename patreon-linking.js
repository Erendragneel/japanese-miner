// Language Miner v6.4.91 - Patreon verification reuses the main game account and existing saves.
(()=>{
"use strict";
const CONFIG=window.JAPANESE_MINER_PATREON_CONFIG||{};
const CACHE_PREFIX="jm_patreon_entitlement_v2:";
const TIER_NAMES=["No active tier","Supporter","Companion Keeper","Settlement Founder"];
const linkState={session:null,entitlement:null,busy:false,message:"",messageType:"",callbackHandled:false};

function esc(value){return String(value??"").replace(/[&<>\"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));}
function ui(value){return window.LanguageMinerI18n?.translate?.(value)||String(value);}
function activeProfile(){return window.japaneseMinerActiveProfile?.()||null;}
function cloud(){return window.languageMinerCloudAuth||null;}
function sessionUserId(){return linkState.session?.user?.id||activeProfile()?.cloudUserId||activeProfile()?.id||"guest";}
function cacheKey(){return CACHE_PREFIX+sessionUserId();}
function integrationEnabled(){return CONFIG.enabled===true&&/^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/i.test(String(CONFIG.supabaseUrl||""))&&String(CONFIG.supabaseAnonKey||"").length>30&&!String(CONFIG.supabaseAnonKey).includes("YOUR_");}
function functionsUrl(name){return `${String(CONFIG.supabaseUrl).replace(/\/$/,"")}/functions/v1/${name}`;}
function readJson(key){try{return JSON.parse(localStorage.getItem(key)||"null");}catch{return null;}}
function writeJson(key,value){try{if(value==null)localStorage.removeItem(key);else localStorage.setItem(key,JSON.stringify(value));}catch{}}
function setNotice(message,type=""){linkState.message=message;linkState.messageType=type;renderLinkPanel();}
function applyEntitlement(entitlement,source="server"){const tier=Math.max(0,Math.min(3,Number(entitlement?.tier)||0));linkState.entitlement=Object.assign({},entitlement,{tier,source});window.setJapaneseMinerVerifiedSupporterEntitlement?.(linkState.entitlement);}
function clearEntitlement(){writeJson(cacheKey(),null);applyEntitlement({tier:0,connected:false,verified_at:null,grace_until:null},"none");}
function applyCachedEntitlement(){const cached=linkState.entitlement,graceUntil=Date.parse(cached?.grace_until||"");if(cached&&Number(cached.tier)>0&&Number.isFinite(graceUntil)&&graceUntil>Date.now())applyEntitlement(cached,"offline-cache");else applyEntitlement({tier:0,connected:!!cached?.connected},"unverified");}
function loadConnection(){linkState.session=cloud()?.getSession?.()||null;linkState.entitlement=readJson(cacheKey());applyCachedEntitlement();}
async function jsonRequest(url,{method="GET",body=null,token=null}={}){const headers={apikey:String(CONFIG.supabaseAnonKey||""),Accept:"application/json"};if(body!=null)headers["Content-Type"]="application/json";if(token)headers.Authorization=`Bearer ${token}`;const response=await fetch(url,{method,headers,body:body==null?undefined:JSON.stringify(body)});let payload={};try{payload=await response.json();}catch{}if(!response.ok)throw new Error(payload?.error_description||payload?.msg||payload?.error||payload?.message||`Request failed (${response.status})`);return payload;}
async function validSession(){const session=await cloud()?.validSession?.();linkState.session=session||null;if(!session)throw new Error("Sign in to your Language Miner account first.");return session;}
async function functionRequest(name,{method="GET",body=null}={}){const session=await validSession();return jsonRequest(functionsUrl(name),{method,body,token:session.accessToken});}
async function refreshEntitlement({silent=false}={}){
  if(!integrationEnabled()){clearEntitlement();renderLinkPanel();return null;}
  linkState.session=cloud()?.getSession?.()||null;
  if(!linkState.session){clearEntitlement();renderLinkPanel();return null;}
  try{
    const payload=await functionRequest("patreon-status"),entitlement={connected:payload.connected===true,tier:Math.max(0,Math.min(3,Number(payload.tier)||0)),tier_name:payload.tier_name||TIER_NAMES[Number(payload.tier)||0],patron_status:payload.patron_status||null,last_charge_status:payload.last_charge_status||null,verified_at:payload.verified_at||new Date().toISOString(),grace_until:payload.grace_until||null};
    writeJson(cacheKey(),entitlement);applyEntitlement(entitlement,"server");
    if(!silent)setNotice(entitlement.connected?`Membership refreshed: ${entitlement.tier_name}.`:"Your Patreon account is not connected yet.",entitlement.tier>0?"success":"");else renderLinkPanel();
    return entitlement;
  }catch(error){applyCachedEntitlement();if(!silent)setNotice(`Could not verify Patreon right now. ${error.message}`,"error");else renderLinkPanel();return null;}
}
async function connectPatreon(){const payload=await functionRequest("patreon-start",{method:"POST",body:{profile_id:activeProfile()?.id||""}});if(!/^https:\/\/www\.patreon\.com\/oauth2\/authorize(?:\?|$)/.test(String(payload.authorization_url||"")))throw new Error("The backend returned an invalid Patreon authorization address.");location.assign(payload.authorization_url);}
async function unlinkPatreon(){if(!confirm(ui("Disconnect Patreon from this Language Miner account? Patreon benefits will lock immediately.")))return;await functionRequest("patreon-unlink",{method:"POST"});clearEntitlement();setNotice("Patreon disconnected. Your Patreon subscription was not cancelled.","success");}
function accountEmail(){return linkState.session?.user?.email||activeProfile()?.email||"Language Miner account";}
function noticeMarkup(){return linkState.message?`<div class="patreon-link-notice ${esc(linkState.messageType)}" role="status">${esc(ui(linkState.message))}</div>`:"";}
function connectionMarkup(){
  if(!integrationEnabled())return `<section id="patreonLinkAccount" class="patreon-link-account setup-needed"><span>${esc(ui("ADMINISTRATOR SETUP REQUIRED"))}</span><h3>${esc(ui("Patreon linking is installed but not configured"))}</h3><p>${esc(ui("Finish the Supabase and Patreon administrator setup before accepting memberships."))}</p><a class="supporter-join-link" href="${esc(CONFIG.patreonJoinUrl||"https://www.patreon.com/")}" target="_blank" rel="noopener">${esc(ui("View Patreon memberships"))}</a></section>`;
  if(!linkState.session)return `<section id="patreonLinkAccount" class="patreon-link-account"><span>ONE LANGUAGE MINER ACCOUNT</span><h3>Attach an account to this save</h3><p>This existing local save can use Patreon benefits. Sign in to or create the Language Miner account that will own this save and its supporter access. Progress will not be reset.</p>${noticeMarkup()}<button id="openUnifiedSignInBtn" class="primary" type="button">Attach account to this save</button></section>`;
  const ent=linkState.entitlement||{},tier=Math.max(0,Math.min(3,Number(ent.tier)||0)),connected=ent.connected===true,verified=ent.verified_at?new Date(ent.verified_at).toLocaleString():ui("Not verified yet"),tierName=ui(ent.tier_name||TIER_NAMES[tier]);
  return `<section id="patreonLinkAccount" class="patreon-link-account ${tier>0?"active-member":""}"><span>${esc(ui(tier>0?`ACTIVE PATREON TIER ${tier}`:"LANGUAGE MINER ACCOUNT"))}</span><h3>${esc(tier>0?tierName:ui(connected?"Patreon connected — no paid tier active":"Ready to connect Patreon"))}</h3><p>${esc(ui(`Game account: ${accountEmail()}`))}</p>${tier>0?`<div class="patreon-entitlement-badge"><b>${tier}</b><span>${esc(tierName)}<small>${esc(ui(`Verified ${verified}`))}${ent.source==="offline-cache"?` · ${esc(ui("offline grace"))}`:""}</small></span></div>`:connected?`<p>${esc(ui("Your Patreon account is linked, but Patreon is not currently reporting an active Language Miner tier."))}</p>`:`<p>${esc(ui("Connect the Patreon account used for your Language Miner membership. You only need to do this once."))}</p>`}${noticeMarkup()}<div class="patreon-link-actions">${connected?"":`<button id="connectPatreonBtn" class="primary" type="button">${esc(ui("Connect Patreon"))}</button>`}<button id="refreshPatreonBtn" type="button">${esc(ui("Refresh membership"))}</button>${connected?`<button id="unlinkPatreonBtn" type="button">${esc(ui("Disconnect Patreon"))}</button>`:""}</div><small>${esc(ui("Use the Log out button at the top of the game to sign out of this account."))}</small></section>`;
}
function renderLinkPanel(){
  const box=document.getElementById("v6FeedbackContent");if(!box)return;
  const note=box.querySelector(".supporter-link-note");if(note)note.textContent=ui("Your game account securely owns the Patreon tier reported by your active membership.");
  box.querySelector("#patreonLinkAccount")?.remove();const joinLink=box.querySelector(".supporter-join-link");if(joinLink)joinLink.insertAdjacentHTML("beforebegin",connectionMarkup());else box.insertAdjacentHTML("afterbegin",connectionMarkup());
  document.getElementById("openUnifiedSignInBtn")?.addEventListener("click",()=>window.languageMinerShowSignIn?.());
  document.getElementById("connectPatreonBtn")?.addEventListener("click",()=>runBusy(connectPatreon));
  document.getElementById("refreshPatreonBtn")?.addEventListener("click",()=>runBusy(()=>refreshEntitlement()));
  document.getElementById("unlinkPatreonBtn")?.addEventListener("click",()=>runBusy(unlinkPatreon));
  box.querySelectorAll("#patreonLinkAccount button").forEach(button=>button.disabled=linkState.busy);
}
async function runBusy(task){if(linkState.busy)return;linkState.busy=true;renderLinkPanel();try{await task();}catch(error){setNotice(error.message||"The Patreon connection could not be completed.","error");}finally{linkState.busy=false;renderLinkPanel();}}
function handleOAuthReturn(){if(linkState.callbackHandled)return;const url=new URL(location.href),result=url.searchParams.get("patreon");if(!result)return;linkState.callbackHandled=true;const detail=url.searchParams.get("detail")||"";url.searchParams.delete("patreon");url.searchParams.delete("detail");history.replaceState({},"",url.pathname+(url.search?url.search:"")+url.hash);if(result==="linked"){linkState.message="Patreon connected successfully. Verifying your membership…";linkState.messageType="success";refreshEntitlement({silent:true}).finally(()=>window.openJapaneseMinerPatreon?.());}else{linkState.message=detail||"Patreon did not complete the connection.";linkState.messageType="error";window.openJapaneseMinerPatreon?.();}}
function profileLoaded(){loadConnection();refreshEntitlement({silent:true});handleOAuthReturn();}
window.renderJapaneseMinerPatreonLinking=renderLinkPanel;
window.refreshJapaneseMinerPatreonEntitlement=refreshEntitlement;
window.addEventListener("jm-profile-loaded",profileLoaded);
window.addEventListener("jm-profile-logged-out",()=>{linkState.session=null;linkState.entitlement=null;applyEntitlement({tier:0,connected:false},"none");renderLinkPanel();});
window.addEventListener("lm-cloud-session-changed",()=>{linkState.session=cloud()?.getSession?.()||null;renderLinkPanel();});
if(activeProfile())profileLoaded();else handleOAuthReturn();
})();
