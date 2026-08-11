# Language Miner v6.4.108

## v6.4.108 consistent mine colorways

- All eight mine-scene wallpapers now preserve the original cavern layout: rock arch, central tunnel, hanging lantern, and crystal formations.
- The former themed environments are replaced by Original Slate, Amethyst Purple, Sapphire Blue, Emerald Green, Arctic Cyan, Ruby Red, Golden Amber, and Rose Quartz colorways.
- Existing wallpaper IDs, purchases, ownership, equipped selections, Admin unlocks, cloud saves, and backups remain compatible, so players do not lose cosmetics.
- Shop preview cards now match the recolored mine scenes instead of showing unrelated environments.

## v6.4.107 Scientific Gem Collection rock skins

- All eight existing rock skins remain available exactly as before.
- Fifteen new rock skins now match the game's Scientific Gem Collection: Agate, Amethyst, Aquamarine, Citrine, Emerald, Garnet, Opal, Peridot, Ruby, Sapphire, Topaz, Alexandrite, Paraíba Tourmaline, Jadeite, and Red Diamond.
- Every scientific skin has its own gem-inspired color, facets, glow, Shop preview, permanent Nugget price, saved ownership, and equipped state.
- The expanded 23-skin Rock Skins collection remains inside the Tier 1 Mine Cosmetics pull-down and is included by Admin Unlock Everything.

## v6.4.106 consolidated Tier 1 Mine Cosmetics

- Rock skins, mine wallpapers, pickaxe skins, and full-page wallpapers now share one **Mine Cosmetics** Shop tab.
- Each of the four collections uses its own accessible pull-down section so the Shop stays compact on desktop and phone.
- The separate Pickaxe Skins and Wallpapers tabs are hidden because those collections now live inside Mine Cosmetics.
- The entire Mine Cosmetics hub requires Patreon Tier 1; non-supporters see the Tier 1 gate and standard appearances while saved ownership remains intact.

## v6.4.105 portrait-lock setting

- The blocking landscape warning is permanently disabled, so it cannot stop an installed player from using the game.
- Accessibility & Settings now has one saved button that switches between **Lock portrait** and **Unlock rotation**.
- Portrait locking is attempted directly through the device orientation API without incorrectly telling installed players to reinstall the app.
- When a browser or phone does not allow app-controlled locking, the status explains that the phone's own rotation control can be used.

## v6.4.104 mine cosmetics

- A new **Mine Cosmetics** Shop tab adds eight permanent rock skins and eight permanent mine-scene wallpapers.
- Rock skins change the tappable rock without changing the equipped pickaxe.
- Mine wallpapers change only the cave scenery behind the rock and remain independent from full-page wallpapers.
- Purchases, ownership, and equipped selections are stored per player, included in cloud saves and backups, available to Admin Unlock Everything, and restored by the cosmetics reset.

## v6.4.103 compact language dropdowns

- The 17-card known-language grid is replaced by one clean, localized dropdown.
- The 17-card learning-language grid is replaced by a matching dropdown that prevents selecting the same language twice.
- Both controls show each language's flag, native name, and English name while remaining compact on desktop and mobile.

## v6.4.102 eight complete new language courses

- Brazilian Portuguese, Vietnamese, Thai, Turkish, Indonesian, Polish, Greek, and Ukrainian are now complete selectable known and learning languages.
- Each new learning language has its writing-system foundation, six progressive content mines, 1,000 vocabulary entries, 80 grammar patterns, 120 practical sentences, required two-lesson reviews, placement testing, and 25/25 guardian gates.
- Each new language has a localized interface and game guide, native letter or script names, independent saved progress, cloud-save compatibility, and dedicated Admin reset targets.
- Speech uses exact native regional locales: Brazilian Portuguese (`pt-BR`), Vietnamese (`vi-VN`), Thai (`th-TH`), Turkish (`tr-TR`), Indonesian (`id-ID`), Polish (`pl-PL`), Greek (`el-GR`), and Ukrainian (`uk-UA`).

## v6.4.101 mobile Admin and portrait play

- The existing header **Admin** button now has a larger, non-scrolling phone touch target, a direct touch/pen activation fallback, and an Admin panel that always opens above mobile drawers.
- The Admin button stays in its original account-header location and remains unavailable to regular players.
- Installed mobile apps request `portrait-primary` through the web-app manifest and Screen Orientation API.
- Mobile browsers that do not permit programmatic orientation locking pause sideways play with a portrait guard until the phone is upright.

## v6.4.100 separate voice and style controls

- Male and Female are now a separate saved choice from the speech effect.
- Players independently choose Natural, Deep, High, Soft, Energetic, or Calm, producing twelve voice/style combinations.
- Stronger pitch, tempo, and volume profiles make the six styles noticeably different. Quick Stats shows the active tuning values for verification.
- The selected course still uses its exact native regional locale and pronunciation.

## v6.4.99 player voice styles

- This release introduced the original combined voice-style selector, superseded by the separate controls in v6.4.100.
- The selected style is stored in that player's save and follows their cloud save between devices.
- Voice style applies to Japanese and every multilingual course. Exact regional tags provide native regional pronunciation for all seventeen supported languages. Language Miner prefers an exact-locale installed voice and uses pitch/rate tuning so all choices remain distinct.
- Voice-style controls and help text are localized into all seventeen supported interface languages.

## v6.4.98 secure global player management

- Supabase now stores each signed-in player's Japanese save and multilingual course settings as one revisioned cloud save.
- Verified administrators can securely search all registered Supabase users and reset a selected player's data. The browser never receives a service-role key, and every search/read/reset RPC verifies `app_admins` on the server.
- Players can reset only the current placement test or every language placement test without erasing lesson progress.
- Cloud save revision checks prevent a stale phone or computer from overwriting a newer administrator reset.

Deploy `supabase/migrations/202608110001_global_player_management.sql` to the connected Supabase project before enabling production global search and resets. GitHub Pages can continue hosting the frontend; Supabase owns the player data and privileged operations.

## v6.4.97 player account reset manager

- Verified administrators can search other player profiles stored on the current device by name, email, profile ID, or cloud user ID.
- A selected player can have one language, all languages, bosses/reviews, economy, cosmetics, history, or the entire gameplay profile reset without deleting the login account.
- The manager clearly distinguishes local profiles from cloud-linked saves cached on this device and requires confirmation before every reset.

## v6.4.96 admin progression controls

- **Unlock Everything** now completes every Japanese and multilingual lesson, required two-lesson review quiz, guardian result, and mine gate instead of changing only level and XP.
- The Developer Control Center can reset one specific language or only bosses, reviews, economy, cosmetics, quests/history, all courses, or the entire profile.
- All new progress mutations remain limited to the verified administrator session.

Language Miner is the renamed, save-compatible release of the Japanese-learning mining game.

## Included

- Complete Hiragana through JLPT N1 learning game
- Seventeen selectable known and learning languages
- Interface navigation and instructions automatically use the selected known language
- Seven-stage non-Japanese Expedition Hubs matching the Japanese course progression pattern
- A guardian boss in every course stage; only a 25/25 Perfect Gate result unlocks the next mine
- Functional per-mine dropdowns in every Expedition Hub, including Japanese
- Verified administrator status now survives every profile-loader extension, and hidden admin controls stay hidden for non-admin users on mobile
- Four sequential alphabet or writing-system lessons per non-Japanese language, with 20% mastery required to advance
- 1,000 vocabulary concepts distributed across the six non-alphabet mines
- 80 grammar examples and 120 practical sentences distributed across those course levels
- Japanese-style 75% lesson gates and required 25-question review quizzes after every two lessons
- Silent five-minute guardian tests with 25 distinct randomized questions from the full mine
- Separate multilingual lesson mastery saved for each learning language
- Correct Japanese pronunciation routing
- Optional floating pet display
- Deferred quiz and test treasure notifications
- Wrong-answer-only assessment results and Notebook review
- One Supabase account for game access and Patreon OAuth 2 linking
- Install App and secure Forgot Password controls on the sign-in screen
- Existing local saves can attach that account without losing progress
- Verified Patreon Tier 1–3 entitlements
- Signed membership webhooks and seven-day offline grace
- Beginner-friendly Patreon/Supabase setup guide
- Safe helper for finding Patreon campaign and tier IDs

## Existing saves

Player storage keys and the backup data format intentionally keep their historical internal names. This lets existing players continue using their saves after the visible game name changes to Language Miner.

## Patreon setup

Patreon linking is enabled in this connected release for the Language Miner Supabase project. The database migration, five Edge Functions, protected secrets, OAuth client, tier mapping, and signed Patreon webhook were configured on August 7, 2026. [PATREON-SETUP.md](PATREON-SETUP.md) remains included as the administrator reference.

Never place a Patreon Client Secret, Creator Access Token, webhook secret, database password, or Supabase service-role key in GitHub or browser files.
