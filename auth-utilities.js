// Sign-in helpers: installable PWA prompt and Supabase password recovery.
(()=>{
  'use strict';
  let installPrompt=null;
  let recoveryAccessToken='';
  const message=(text,good=false)=>{const node=document.getElementById('authMessage');if(!node)return;node.textContent=text;node.style.color=good?'var(--green)':'var(--red)';};
  function syncInstallButton(){
    const button=document.getElementById('installAppBtn');if(!button)return;
    const installed=window.matchMedia?.('(display-mode: standalone)')?.matches||window.navigator.standalone===true;
    button.textContent=installed?'✓ App Installed':'📲 Install App';button.disabled=installed;
    button.dataset.installReady=String(!!installPrompt);
  }
  window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();installPrompt=event;syncInstallButton();});
  window.addEventListener('appinstalled',()=>{installPrompt=null;syncInstallButton();message('Language Miner was installed successfully.',true);});
  window.addEventListener('DOMContentLoaded',()=>{
    const hash=new URLSearchParams(location.hash.replace(/^#/,''));
    if(hash.get('type')==='recovery'&&hash.get('access_token')){
      recoveryAccessToken=hash.get('access_token');const card=document.querySelector('.auth-card'),panel=document.getElementById('authRecoveryPanel');
      card?.classList.add('auth-recovery-active');if(panel)panel.hidden=false;setTimeout(()=>document.getElementById('authRecoveryPassword')?.focus(),0);
    }
    syncInstallButton();
    document.getElementById('installAppBtn')?.addEventListener('click',async()=>{
      if(!installPrompt){message('If no install window opens, use your browser menu and choose “Install app” or “Add to Home screen.”',true);return;}
      const prompt=installPrompt;installPrompt=null;await prompt.prompt();await prompt.userChoice.catch(()=>null);syncInstallButton();
    });
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
