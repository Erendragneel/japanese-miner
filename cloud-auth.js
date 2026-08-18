// Language Miner v6.4.141 - Supabase accounts, cloud saves, and learner-approved cross-device progress sharing.
(()=>{
"use strict";
const CONFIG=window.JAPANESE_MINER_PATREON_CONFIG||{};
const SESSION_KEY="lm_cloud_session_v2";
const LEGACY_SESSION_PREFIX="jm_patreon_session_v1:";

function enabled(){return CONFIG.enabled===true&&/^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/i.test(String(CONFIG.supabaseUrl||""))&&String(CONFIG.supabaseAnonKey||"").length>30;}
function authUrl(path){return `${String(CONFIG.supabaseUrl).replace(/\/$/,"")}/auth/v1/${path}`;}
function restUrl(path){return `${String(CONFIG.supabaseUrl).replace(/\/$/,"")}/rest/v1/${path}`;}
function functionUrl(path){return `${String(CONFIG.supabaseUrl).replace(/\/$/,"")}/functions/v1/${path}`;}
function readJson(key){try{return JSON.parse(localStorage.getItem(key)||"null");}catch{return null;}}
function writeJson(key,value){try{if(value==null)localStorage.removeItem(key);else localStorage.setItem(key,JSON.stringify(value));}catch{}}
function normalizeSession(payload){
  if(!payload?.access_token)return null;
  return {accessToken:payload.access_token,refreshToken:payload.refresh_token||"",expiresAt:Number(payload.expires_at)||Math.floor(Date.now()/1000)+Number(payload.expires_in||3600),user:payload.user||null};
}
function migrateLegacySession(){
  const current=readJson(SESSION_KEY);
  if(current?.accessToken)return current;
  try{
    for(let index=0;index<localStorage.length;index++){
      const key=localStorage.key(index);
      if(!String(key||"").startsWith(LEGACY_SESSION_PREFIX))continue;
      const legacy=readJson(key);
      if(legacy?.accessToken){
        const migrated=Object.assign({},legacy,{migratedProfileId:key.slice(LEGACY_SESSION_PREFIX.length)});
        writeJson(SESSION_KEY,migrated);
        return migrated;
      }
    }
  }catch{}
  return null;
}
let session=migrateLegacySession();

function announce(){window.dispatchEvent(new CustomEvent("lm-cloud-session-changed",{detail:{authenticated:!!session,user:session?.user||null}}));}
function saveSession(next){session=next||null;writeJson(SESSION_KEY,session);announce();return session;}
function getSession(){return session;}
async function request(path,{method="POST",body=null,token=null}={}){
  if(!enabled())throw new Error("Online accounts are not configured yet.");
  const headers={apikey:String(CONFIG.supabaseAnonKey||""),Accept:"application/json"};
  if(body!=null)headers["Content-Type"]="application/json";
  if(token)headers.Authorization=`Bearer ${token}`;
  const response=await fetch(authUrl(path),{method,headers,body:body==null?undefined:JSON.stringify(body)});
  let payload={};try{payload=await response.json();}catch{}
  if(!response.ok)throw new Error(payload?.error_description||payload?.msg||payload?.error||payload?.message||`Account request failed (${response.status})`);
  return payload;
}
async function refresh(){
  if(!session?.refreshToken)throw new Error("Your Language Miner session expired. Please sign in again.");
  const payload=await request("token?grant_type=refresh_token",{body:{refresh_token:session.refreshToken}}),next=normalizeSession(payload);
  if(!next)throw new Error("Language Miner could not refresh your account session.");
  if(session.migratedProfileId)next.migratedProfileId=session.migratedProfileId;
  return saveSession(next);
}
async function validSession(){
  if(!session)return null;
  if(Number(session.expiresAt||0)>Math.floor(Date.now()/1000)+60)return session;
  try{return await refresh();}catch(error){saveSession(null);throw error;}
}
async function bootstrap(){
  if(!session)return null;
  try{return await validSession();}catch{return null;}
}
async function signIn(email,password){
  const payload=await request("token?grant_type=password",{body:{email:String(email||"").trim(),password}}),next=normalizeSession(payload);
  if(!next)throw new Error("Language Miner did not return an account session.");
  return saveSession(next);
}
async function signUp(displayName,email,password,legal={}){
  const name=String(displayName||"").trim().replace(/\s+/g," ");
  const redirectTo=`${location.origin}${location.pathname}`;
  const role=String(legal?.account_role||""),ageAssurance=String(legal?.age_assurance||"");
  if(!["learner_13_plus","adult_guardian","educator"].includes(role))throw new Error("Choose an eligible age and account category.");
  if(!String(legal?.terms_version||"")||!String(legal?.privacy_version||""))throw new Error("Accept the current Terms and Privacy Policy before creating an account.");
  const metadata={display_name:name,game_profile_name:name,account_role:role,age_assurance:ageAssurance,terms_version:String(legal.terms_version),privacy_version:String(legal.privacy_version),consented_at:String(legal.consented_at||new Date().toISOString())};
  const payload=await request(`signup?redirect_to=${encodeURIComponent(redirectTo)}`,{body:{email:String(email||"").trim(),password,data:metadata}}),next=normalizeSession(payload);
  if(!next)throw new Error("Account created. Email confirmation is still enabled; confirm the email, then return and sign in.");
  return saveSession(next);
}
async function resetPassword(email){
  const normalized=String(email||"").trim();
  if(!/^\S+@\S+\.\S+$/.test(normalized))throw new Error("Enter the email address used for your Language Miner account.");
  const redirectTo=`${location.origin}${location.pathname}`;
  await request(`recover?redirect_to=${encodeURIComponent(redirectTo)}`,{body:{email:normalized}});
  return true;
}
async function updatePassword(accessToken,password){
  if(String(password||'').length<8)throw new Error('Your new password must contain at least 8 characters.');
  await request('user',{method:'PUT',token:String(accessToken||''),body:{password}});
  return true;
}
async function updateUserMetadata(data){
  const current=await validSession();
  const payload=await request("user",{method:"PUT",token:current.accessToken,body:{data:data&&typeof data==="object"?data:{}}});
  if(!payload?.id)throw new Error("The account update did not return a user record.");
  return saveSession({...current,user:payload});
}
async function signOut(){
  const token=session?.accessToken;
  if(token)try{await request("logout",{token});}catch{}
  saveSession(null);
  try{for(let index=localStorage.length-1;index>=0;index--){const key=localStorage.key(index);if(String(key||"").startsWith(LEGACY_SESSION_PREFIX))localStorage.removeItem(key);}}catch{}
}
async function adminStatus(candidate=session){
  const current=candidate?.accessToken?candidate:await validSession();
  const userId=current?.user?.id;
  if(!userId)return false;
  const response=await fetch(restUrl(`app_admins?user_id=eq.${encodeURIComponent(userId)}&select=user_id&limit=1`),{headers:{apikey:String(CONFIG.supabaseAnonKey||""),Authorization:`Bearer ${current.accessToken}`,Accept:"application/json"}});
  if(!response.ok)return false;
  let rows=[];try{rows=await response.json();}catch{}
  return Array.isArray(rows)&&rows.some(row=>row?.user_id===userId);
}

async function rpc(name,body={},candidate=session,retried=false){
  const current=candidate?.accessToken?candidate:await validSession();
  if(!current?.accessToken)throw new Error("Sign in to use cloud player data.");
  const response=await fetch(restUrl(`rpc/${encodeURIComponent(name)}`),{
    method:"POST",
    headers:{apikey:String(CONFIG.supabaseAnonKey||""),Authorization:`Bearer ${current.accessToken}`,Accept:"application/json","Content-Type":"application/json"},
    body:JSON.stringify(body||{})
  });
  if(response.status===401&&!retried&&session?.refreshToken){const refreshed=await refresh();return rpc(name,body,refreshed,true);}
  let payload=null;try{payload=await response.json();}catch{}
  if(!response.ok)throw new Error(payload?.message||payload?.hint||payload?.details||`Cloud player request failed (${response.status})`);
  return payload;
}
function firstRow(payload){return Array.isArray(payload)?payload[0]||null:payload&&typeof payload==="object"?payload:null;}
async function loadPlayerSave(candidate=session){return firstRow(await rpc("load_player_save",{},candidate));}
async function savePlayerState(payload,candidate=session){
  return firstRow(await rpc("save_player_state",{
    p_game_state:payload?.gameState||{},p_course_settings:payload?.courseSettings||{},
    p_display_name:String(payload?.displayName||""),p_email:String(payload?.email||""),
    p_base_revision:Math.max(0,Number(payload?.baseRevision)||0)
  },candidate));
}
async function adminSearchPlayers(search="",limit=50){
  const payload=await rpc("admin_search_players",{p_search:String(search||"").trim(),p_limit:Math.max(1,Math.min(100,Number(limit)||50))});
  return Array.isArray(payload)?payload:[];
}
async function adminGetPlayerSave(userId){return firstRow(await rpc("admin_get_player_save",{p_user_id:String(userId||"")}));}
async function adminUpdatePlayerSave(userId,payload){
  return firstRow(await rpc("admin_update_player_save",{
    p_user_id:String(userId||""),p_game_state:payload?.gameState||{},p_course_settings:payload?.courseSettings||{},
    p_target:String(payload?.target||"selected"),p_base_revision:Math.max(0,Number(payload?.baseRevision)||0)
  }));
}
async function listParentTeacherLinks(){const payload=await rpc("list_parent_teacher_links",{});return Array.isArray(payload)?payload:[];}
async function requestStudentLink(email){
  const normalized=String(email||"").trim().toLowerCase();
  if(!/^\S+@\S+\.\S+$/.test(normalized))throw new Error("Enter the email address on the learner's Language Miner account.");
  return firstRow(await rpc("request_student_link",{p_student_email:normalized}));
}
async function respondStudentLink(linkId,approve){return firstRow(await rpc("respond_student_link",{p_link_id:String(linkId||""),p_approve:approve===true}));}
async function removeStudentLink(linkId){return firstRow(await rpc("remove_parent_teacher_link",{p_link_id:String(linkId||"")}));}
async function loadLinkedLearnerProgress(studentUserId){return firstRow(await rpc("load_linked_learner_progress",{p_student_user_id:String(studentUserId||"")}));}
async function recordLegalConsent(legal){
  try{return firstRow(await rpc("record_legal_consent",{p_account_role:String(legal?.account_role||""),p_age_assurance:String(legal?.age_assurance||""),p_terms_version:String(legal?.terms_version||""),p_privacy_version:String(legal?.privacy_version||"")}));}
  catch(error){console.warn("The legal-consent database migration is not deployed yet.",error);return null;}
}
async function updateLegalConsent(legal){const next=await updateUserMetadata(legal);await recordLegalConsent(legal);return next;}
async function createPrivacyRequest(type,details){return firstRow(await rpc("create_privacy_request",{p_request_type:String(type||"other"),p_details:String(details||"")}));}
async function listPrivacyRequests(){const payload=await rpc("list_my_privacy_requests",{});return Array.isArray(payload)?payload:[];}
async function deleteAccount(){
  const current=await validSession();
  const response=await fetch(functionUrl("account-delete"),{method:"POST",headers:{apikey:String(CONFIG.supabaseAnonKey||""),Authorization:`Bearer ${current.accessToken}`,Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({confirm:"DELETE"})});
  let payload={};try{payload=await response.json();}catch{}
  if(!response.ok)throw new Error(payload?.error||payload?.message||`Account deletion failed (${response.status})`);
  saveSession(null);return payload;
}

window.languageMinerCloudAuth=Object.freeze({enabled,getSession,saveSession,bootstrap,validSession,signIn,signUp,resetPassword,updatePassword,updateUserMetadata,updateLegalConsent,recordLegalConsent,createPrivacyRequest,listPrivacyRequests,deleteAccount,signOut,adminStatus,loadPlayerSave,savePlayerState,adminSearchPlayers,adminGetPlayerSave,adminUpdatePlayerSave,listParentTeacherLinks,requestStudentLink,respondStudentLink,removeStudentLink,loadLinkedLearnerProgress});
})();
