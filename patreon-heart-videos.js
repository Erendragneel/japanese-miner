// Language Miner v6.4.164 - narrated 24-second Patreon feature reels can restore one missing heart every six hours.
(() => {
  'use strict';

  const TIERS = [
    {
      tier: 1,
      name: 'Supporter',
      title: 'Supporter Spotlight',
      image: 'patreon-tier-1-supporter.png',
      video: 'patreon-tier-1-feature-reel.mp4',
      accent: '#70f2c8',
      slides: [
        ['TIER 1 · SUPPORTER', 'Help new lessons and accessibility improvements reach more learners.'],
        ['KEEP THE MINE GROWING', 'Support ongoing course updates, practice tools, and community features.'],
        ['THANKS FOR WATCHING', 'Patreon membership is optional. Learning and this heart reward stay free.']
      ]
    },
    {
      tier: 2,
      name: 'Companion Keeper',
      title: 'Companion Keeper Spotlight',
      image: 'patreon-tier-2-companion-keeper.png',
      video: 'patreon-tier-2-feature-reel.mp4',
      accent: '#8bb8ff',
      slides: [
        ['TIER 2 · COMPANION KEEPER', 'Meet the companions that celebrate practice, progress, and persistence.'],
        ['TRAVEL WITH A FRIEND', 'Companion styles bring more personality to lessons and expeditions.'],
        ['THANKS FOR WATCHING', 'Watching is optional and never requires a Patreon account or purchase.']
      ]
    },
    {
      tier: 3,
      name: 'Settlement Founder',
      title: 'Settlement Founder Spotlight',
      image: 'patreon-tier-3-settlement-founder.png',
      video: 'patreon-tier-3-feature-reel.mp4',
      accent: '#d89cff',
      slides: [
        ['TIER 3 · SETTLEMENT FOUNDER', 'Help expand settlements, arcade activities, and larger learning adventures.'],
        ['BUILD THE NEXT EXPEDITION', 'Founder support helps ambitious new game systems take shape.'],
        ['THANKS FOR WATCHING', 'The video is free to watch. Patreon membership remains completely optional.']
      ]
    }
  ];

  let activeSession = null;
  let watchTimer = null;
  let watchedMs = 0;
  let lastTickAt = 0;
  let lastSlide = -1;

  function api(){ return window.LanguageMinerPatreonHeartReward; }
  function escapeHtml(value){ return String(value ?? '').replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character])); }
  function formatCooldown(milliseconds){
    const totalMinutes = Math.max(1, Math.ceil(Number(milliseconds || 0) / 60000));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return hours ? `${hours} hr${hours === 1 ? '' : 's'}${minutes ? ` ${minutes} min` : ''}` : `${minutes} min`;
  }

  function ensureOverlay(){
    let overlay = document.getElementById('patreonHeartVideoOverlay');
    if(overlay) return overlay;
    overlay = document.createElement('div');
    overlay.id = 'patreonHeartVideoOverlay';
    overlay.className = 'patreon-heart-video-overlay';
    overlay.hidden = true;
    overlay.inert = true;
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = `<section class="patreon-heart-video-panel" role="dialog" aria-modal="true" aria-labelledby="patreonHeartVideoTitle">
      <header class="patreon-heart-video-head">
        <div><span>OPTIONAL HEART RECOVERY</span><h2 id="patreonHeartVideoTitle">Watch one Patreon tier video</h2></div>
        <button id="patreonHeartVideoClose" type="button" aria-label="Close Patreon video">×</button>
      </header>
      <main id="patreonHeartVideoContent"></main>
    </section>`;
    document.body.appendChild(overlay);
    overlay.querySelector('#patreonHeartVideoClose').addEventListener('click', closeOverlay);
    overlay.addEventListener('click', event => { if(event.target === overlay) closeOverlay(); });
    return overlay;
  }

  function selectionMarkup(){
    return `<div class="patreon-heart-video-intro">
      <strong>Earn exactly <span>+1 heart</span></strong>
      <p>Choose and finish any one of these three 24-second in-game videos. This free option can be used once every six hours while you are missing hearts.</p>
      <small>No Patreon account, paid membership, external ad network, or purchase is required.</small>
    </div>
    <div class="patreon-heart-video-grid" aria-label="Choose one of three Patreon tier videos">
      ${TIERS.map(tier => `<button class="patreon-heart-video-choice" type="button" data-patreon-video-tier="${tier.tier}" style="--tier-accent:${tier.accent}">
        <img src="${tier.image}" alt="${escapeHtml(tier.name)} Patreon tier artwork">
        <span>VIDEO ${tier.tier} · TIER ${tier.tier}</span>
        <strong>${escapeHtml(tier.title)}</strong>
        <small>🔊 Watch with sound · earn 1 heart</small>
      </button>`).join('')}
    </div>`;
  }

  function showSelection(){
    const content = document.getElementById('patreonHeartVideoContent');
    if(!content) return;
    content.innerHTML = selectionMarkup();
    content.querySelectorAll('[data-patreon-video-tier]').forEach(button => button.addEventListener('click', () => startVideo(Number(button.dataset.patreonVideoTier))));
  }

  function openOverlay(){
    const status = api()?.status?.();
    if(!status?.eligible){ refresh(); return; }
    const overlay = ensureOverlay();
    showSelection();
    overlay.hidden = false;
    overlay.inert = false;
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('patreon-heart-video-open');
    overlay.querySelector('#patreonHeartVideoClose')?.focus();
  }

  function stopWatching(cancelSession = true){
    if(watchTimer) clearInterval(watchTimer);
    watchTimer = null;
    const video = document.getElementById('patreonTierVideo');
    if(video) video.pause();
    if(cancelSession && activeSession?.sessionId) api()?.cancel?.(activeSession.sessionId);
    activeSession = null;
    watchedMs = 0;
    lastTickAt = 0;
    lastSlide = -1;
  }

  function closeOverlay(){
    stopWatching(true);
    const overlay = document.getElementById('patreonHeartVideoOverlay');
    if(!overlay) return;
    overlay.classList.remove('open');
    overlay.hidden = true;
    overlay.inert = true;
    overlay.setAttribute('aria-hidden', 'true');
    document.documentElement.classList.remove('patreon-heart-video-open');
    refresh();
  }

  function videoMarkup(tier, durationMs){
    return `<section class="patreon-tier-video" style="--tier-accent:${tier.accent}">
      <div class="patreon-tier-video-frame">
        <video id="patreonTierVideo" poster="${tier.image}" preload="auto" playsinline disablepictureinpicture controlslist="nodownload noplaybackrate noremoteplayback" tabindex="0" aria-label="${escapeHtml(tier.name)} Patreon tier feature video with narration and background music">
          <source src="${tier.video}" type="video/mp4">
          Your browser cannot play this Patreon feature video.
        </video>
        <button id="patreonVideoSound" class="patreon-tier-video-sound" type="button" aria-pressed="false" aria-label="Mute narration and background music">🔊 Sound on</button>
      </div>
      <div class="patreon-tier-video-progress" role="progressbar" aria-label="Video progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><i id="patreonVideoProgress"></i></div>
      <div class="patreon-tier-video-meta"><strong>${escapeHtml(tier.title)}</strong><span id="patreonVideoTime">${Math.ceil(durationMs / 1000)} seconds remaining</span></div>
      <p class="patreon-tier-video-note">Narration and background music are on. Keep this 24-second video visible until it finishes. Tap the video to pause or resume. Closing it gives no reward.</p>
      <button id="patreonVideoCancel" type="button">Stop video · no reward</button>
    </section>`;
  }

  function updateSlide(tier, progress){
    const slideIndex = Math.min(tier.slides.length - 1, Math.floor(progress * tier.slides.length));
    if(slideIndex === lastSlide) return;
    lastSlide = slideIndex;
    const [kicker, caption] = tier.slides[slideIndex];
    const captionBox = document.querySelector('.patreon-tier-video-caption');
    if(captionBox){
      captionBox.classList.remove('show');
      requestAnimationFrame(() => {
        const kickerElement = document.getElementById('patreonVideoKicker');
        const captionElement = document.getElementById('patreonVideoCaption');
        if(kickerElement) kickerElement.textContent = kicker;
        if(captionElement) captionElement.textContent = caption;
        captionBox.classList.add('show');
      });
    }
  }

  function renderResult(result, tier){
    const content = document.getElementById('patreonHeartVideoContent');
    if(!content) return;
    if(!result?.ok){
      content.innerHTML = `<section class="patreon-heart-video-result failed"><span>⚠️</span><h3>Heart not awarded</h3><p>${escapeHtml(result?.reason || 'The reward could not be completed.')}</p><button id="patreonVideoResultClose" type="button">Close</button></section>`;
    }else{
      const joinUrl = window.JAPANESE_MINER_PATREON_CONFIG?.patreonJoinUrl || 'https://www.patreon.com/cw/Erendragneel/membership';
      content.innerHTML = `<section class="patreon-heart-video-result"><span class="reward-heart">❤️</span><h3>+1 heart earned!</h3><p>${escapeHtml(tier.name)} video complete. Your next optional video heart becomes available in six hours if you are missing hearts.</p><strong>${result.status.hearts}/${result.status.maxHearts} hearts</strong><div><button id="patreonVideoResultClose" class="primary" type="button">Return to the game</button><a href="${escapeHtml(joinUrl)}" target="_blank" rel="noopener noreferrer">Explore Patreon tiers (optional)</a></div></section>`;
    }
    content.querySelector('#patreonVideoResultClose')?.addEventListener('click', closeOverlay);
  }

  function completeVideo(tier){
    if(!activeSession) return;
    const sessionId = activeSession.sessionId;
    stopWatching(false);
    const result = api()?.claim?.(sessionId) || {ok:false, reason:'The heart reward system is unavailable.'};
    renderResult(result, tier);
    refresh();
  }

  function tickVideo(tier){
    if(!activeSession) return;
    const video = document.getElementById('patreonTierVideo');
    if(!video) return;
    if(document.visibilityState !== 'visible' && !video.paused) video.pause();
    const durationMs = Number.isFinite(video.duration) && video.duration > 0 ? video.duration * 1000 : 24000;
    watchedMs = Math.min(durationMs, Math.max(0, Number(video.currentTime || 0) * 1000));
    const progress = Math.min(1, watchedMs / durationMs);
    const progressElement = document.getElementById('patreonVideoProgress');
    const progressRoot = progressElement?.parentElement;
    if(progressElement) progressElement.style.width = `${progress * 100}%`;
    if(progressRoot) progressRoot.setAttribute('aria-valuenow', String(Math.round(progress * 100)));
    const remaining = Math.max(0, Math.ceil((durationMs - watchedMs) / 1000));
    const time = document.getElementById('patreonVideoTime');
    if(time) time.textContent = remaining ? `${remaining} second${remaining === 1 ? '' : 's'} remaining` : 'Completing reward…';
  }

  function startVideo(tierNumber){
    const tier = TIERS.find(item => item.tier === tierNumber);
    if(!tier) return;
    const started = api()?.begin?.(tierNumber);
    if(!started?.ok){ refresh(); return; }
    activeSession = started;
    watchedMs = 0;
    lastTickAt = performance.now();
    lastSlide = -1;
    const content = document.getElementById('patreonHeartVideoContent');
    content.innerHTML = videoMarkup(tier, started.durationMs);
    content.querySelector('#patreonVideoCancel')?.addEventListener('click', closeOverlay);
    const video = content.querySelector('#patreonTierVideo');
    const soundButton = content.querySelector('#patreonVideoSound');
    const updateSoundButton = () => {
      if(!video || !soundButton) return;
      const muted = video.muted || video.volume === 0;
      soundButton.textContent = muted ? '🔇 Sound off' : '🔊 Sound on';
      soundButton.setAttribute('aria-pressed', String(muted));
      soundButton.setAttribute('aria-label', muted ? 'Turn on narration and background music' : 'Mute narration and background music');
    };
    if(video){
      video.muted = false;
      video.defaultMuted = false;
      video.volume = 0.9;
    }
    video?.addEventListener('click', () => video.paused ? video.play().catch(() => {}) : video.pause());
    video?.addEventListener('keydown', event => {
      if(event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      video.paused ? video.play().catch(() => {}) : video.pause();
    });
    video?.addEventListener('volumechange', updateSoundButton);
    soundButton?.addEventListener('click', event => {
      event.stopPropagation();
      if(!video) return;
      video.muted = !video.muted;
      if(!video.muted && video.volume === 0) video.volume = 0.9;
      updateSoundButton();
    });
    video?.addEventListener('ended', () => completeVideo(tier), {once:true});
    video?.addEventListener('error', () => {
      const note = content.querySelector('.patreon-tier-video-note');
      if(note) note.textContent = 'The feature video could not load. Please close this window and try again; no reward has been used.';
    });
    video?.play().catch(() => {
      const note = content.querySelector('.patreon-tier-video-note');
      if(note) note.textContent = 'Tap the video to begin with narration and background music. The full 24 seconds must play before the heart is awarded.';
    });
    updateSoundButton();
    tickVideo(tier);
    watchTimer = setInterval(() => tickVideo(tier), 100);
  }

  function ensureCard(){
    const healthSection = document.getElementById('healthSection');
    if(!healthSection) return null;
    let card = document.getElementById('patreonHeartRewardCard');
    if(!card){
      card = document.createElement('section');
      card.id = 'patreonHeartRewardCard';
      card.className = 'patreon-heart-reward-card';
      card.setAttribute('aria-live', 'polite');
      const maxHeartButton = document.getElementById('maxHeartBtn');
      if(maxHeartButton?.parentElement === healthSection) healthSection.insertBefore(card, maxHeartButton);
      else healthSection.appendChild(card);
    }
    return card;
  }

  function ensureLauncher(){
    const app = document.querySelector('.app');
    if(!app) return null;
    let launcher = document.getElementById('patreonHeartRewardLauncher');
    if(!launcher){
      launcher = document.createElement('button');
      launcher.id = 'patreonHeartRewardLauncher';
      launcher.className = 'patreon-heart-reward-launcher';
      launcher.type = 'button';
      launcher.innerHTML = '<span>▶</span><strong>Earn 1 heart</strong><small>Optional video</small>';
      launcher.addEventListener('click', openOverlay);
      app.appendChild(launcher);
    }
    return launcher;
  }

  function refresh(){
    const card = ensureCard();
    const launcher = ensureLauncher();
    const status = api()?.status?.();
    if(!card || !status) return;
    const activePlayer = window.japaneseMinerActiveProfile?.();
    const shouldShow = Boolean(activePlayer && status.hearts < status.maxHearts && !window.japaneseMinerIsDeveloperSession?.() && status.reason !== 'This optional reward is for regular player profiles.');
    card.hidden = !shouldShow;
    if(launcher){
      launcher.hidden = !shouldShow || !status.eligible;
      launcher.setAttribute('aria-label', `Watch an optional Patreon tier video to earn one heart. Current health: ${status.hearts} of ${status.maxHearts}.`);
    }
    if(!shouldShow) return;
    if(status.eligible){
      card.classList.remove('cooldown');
      card.innerHTML = `<span>OPTIONAL · FREE HEART</span><h4>▶ Watch a Patreon tier video</h4><p>Choose 1 of 3 short tier videos and finish it to earn exactly one heart.</p><small>Once every 6 hours · no membership or purchase required</small><button id="openPatreonHeartVideos" class="primary" type="button">Choose a video · +1 ❤️</button>`;
      card.querySelector('#openPatreonHeartVideos')?.addEventListener('click', openOverlay);
    }else{
      card.classList.add('cooldown');
      const wait = formatCooldown(status.remainingMs);
      card.innerHTML = `<span>OPTIONAL HEART VIDEO</span><h4>⏳ Available again in ${escapeHtml(wait)}</h4><p>You already earned a video heart during this six-hour period.</p><small>The option will reactivate automatically if you are still missing hearts.</small><button type="button" disabled>Cooldown active</button>`;
    }
  }

  window.LanguageMinerPatreonHeartVideos = Object.freeze({refresh, open:openOverlay});
  window.addEventListener('jm-profile-loaded', refresh);
  window.addEventListener('jm-profile-logged-out', closeOverlay);
  window.addEventListener('lm-patreon-heart-reward-updated', refresh);
  document.addEventListener('visibilitychange', () => { lastTickAt = performance.now(); });
  setInterval(refresh, 30000);
  refresh();
})();
