// Sign-in helpers: installable PWA prompt and Supabase password recovery.
(()=>{
  'use strict';
  let installPrompt=null;
  let recoveryAccessToken='';
  const message=(text,good=false)=>{const node=document.getElementById('authMessage');if(!node)return;node.textContent=text;node.style.color=good?'var(--green)':'var(--red)';};
  const isInstalled=()=>window.matchMedia?.('(display-mode: standalone)')?.matches||window.navigator.standalone===true;
  const isAppleMobile=()=>/iphone|ipad|ipod/i.test(window.navigator.userAgent)||window.navigator.platform==='MacIntel'&&window.navigator.maxTouchPoints>1;
  const publicUrl=()=>String(window.LANGUAGE_MINER_PUBLIC_URL||document.querySelector('meta[name="language-miner-share-url"]')?.content||'https://erendragneel.github.io/language-miner/').trim();
  function installState(){return {installed:isInstalled(),ready:!!installPrompt,appleMobile:isAppleMobile(),secure:window.isSecureContext!==false,publicUrl:publicUrl()};}
  function installStatusText(state=installState()){
    if(state.installed)return 'Language Miner is installed from the current website.';
    if(state.ready)return 'Language Miner is ready to install from '+state.publicUrl;
    if(state.appleMobile)return 'Tap Install App for Safari Add to Home Screen instructions.';
    if(!state.secure)return 'Installation requires the secure Language Miner website: '+state.publicUrl;
    return 'Tap Install App for browser instructions. If no system prompt appears, choose Install app or Add to Home screen from the browser menu.';
  }
  function syncInstallButtons(){
    const state=installState();
    document.querySelectorAll('[data-language-miner-install]').forEach(button=>{
      button.textContent=state.installed?'✓ App Installed':'📲 Install App';
      button.disabled=state.installed;
      button.dataset.installReady=String(state.ready);
      button.dataset.installState=state.installed?'installed':state.ready?'ready':state.appleMobile?'ios-help':state.secure?'browser-help':'secure-site-required';
      button.title=state.installed?'Language Miner is already installed':state.ready?'Install Language Miner on this device':state.appleMobile?'Show iPhone or iPad installation steps':'Show installation steps for this browser';
    });
    const status=document.getElementById('v6InstallStatus');if(status)status.textContent=installStatusText(state);
    const instructions=document.getElementById('v6InstallInstructions');if(instructions&&(state.ready||state.installed))instructions.hidden=true;
  }
  function showInstallInstructions(){
    const state=installState();
    const instructions=state.appleMobile
      ?'To install Language Miner on iPhone or iPad: open the game in Safari, tap Share, then choose Add to Home Screen and Add.'
      :'To install Language Miner: open '+state.publicUrl+' in Chrome, Edge, or Samsung Internet. Open the browser menu, choose Install app or Add to Home screen, then confirm Install.';
    const panel=document.getElementById('v6InstallInstructions');
    if(panel){panel.hidden=false;const copy=panel.querySelector('p'),link=panel.querySelector('a');if(copy)copy.textContent=instructions;if(link)link.href=state.publicUrl;panel.scrollIntoView?.({behavior:'smooth',block:'nearest'});}
    message(instructions,true);
  }
  async function requestInstall(){
    const state=installState();if(state.installed){syncInstallButtons();return {outcome:'installed'};}
    if(!installPrompt){showInstallInstructions();syncInstallButtons();return {outcome:'instructions'};}
    const prompt=installPrompt;installPrompt=null;
    try{
      await prompt.prompt();
      const result=await Promise.resolve(prompt.userChoice).catch(()=>null);
      if(result?.outcome==='accepted')message('Language Miner was installed successfully.',true);
      else if(result?.outcome==='dismissed')message('Installation was cancelled. You can try again from the browser menu.',true);
      syncInstallButtons();return result||{outcome:'prompted'};
    }catch(error){showInstallInstructions();syncInstallButtons();return {outcome:'instructions',error:String(error?.message||error)};}
  }
  function bindInstallButtons(root=document){
    root.querySelectorAll?.('[data-language-miner-install]').forEach(button=>{if(button.dataset.installBound)return;button.dataset.installBound='1';button.addEventListener('click',requestInstall);});
    syncInstallButtons();
  }
  window.LanguageMinerInstall=Object.freeze({bind:bindInstallButtons,sync:syncInstallButtons,request:requestInstall,state:installState,publicUrl});
  window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();installPrompt=event;syncInstallButtons();});
  window.addEventListener('appinstalled',()=>{installPrompt=null;syncInstallButtons();message('Language Miner was installed successfully.',true);});
  window.addEventListener('DOMContentLoaded',()=>{
    const hash=new URLSearchParams(location.hash.replace(/^#/,''));
    if(hash.get('type')==='recovery'&&hash.get('access_token')){
      recoveryAccessToken=hash.get('access_token');const card=document.querySelector('.auth-card'),panel=document.getElementById('authRecoveryPanel');
      card?.classList.add('auth-recovery-active');if(panel)panel.hidden=false;setTimeout(()=>document.getElementById('authRecoveryPassword')?.focus(),0);
    }
    bindInstallButtons();
    document.getElementById('forgotPasswordBtn')?.addEventListener('click',async()=>{
      const email=document.getElementById('authEmail')?.value?.trim(),button=document.getElementById('forgotPasswordBtn');
      button.disabled=true;button.textContent='Sending reset email…';
      try{await window.languageMinerCloudAuth?.resetPassword?.(email);message('Password reset email sent. Open the email and follow the secure reset link.',true);}
      catch(error){message(String(error?.message||'Password reset could not be started.'));}
      finally{button.disabled=false;button.textContent='Forgot password?';}
    });
    document.getElementById('authRecoverySubmit')?.addEventListener('click',async()=>{
      const password=document.getElementById('authRecoveryPassword')?.value||'',confirm=document.getElementById('authRecoveryConfirm')?.value||'',button=document.getElementById('authRecoverySubmit');
      if(password.length<8){message('Your new password must contain at least 8 characters.');return;}
      if(password!==confirm){message('The two new passwords do not match.');return;}
      button.disabled=true;button.textContent='Saving password…';
      try{await window.languageMinerCloudAuth?.updatePassword?.(recoveryAccessToken,password);history.replaceState(null,'',location.pathname+location.search);document.querySelector('.auth-card')?.classList.remove('auth-recovery-active');document.getElementById('authRecoveryPanel').hidden=true;document.getElementById('authPassword').value='';message('Password updated. You can now sign in with your new password.',true);}
      catch(error){message(String(error?.message||'The new password could not be saved.'));}
      finally{button.disabled=false;button.textContent='Save New Password';}
    });
  });
})();
