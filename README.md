# Language Miner v6.4.170

## v6.4.170 permanent completed-mine lesson replay

- Completed mines remain permanently expandable and replayable in the Expedition Hub, even if later practice changes current mastery values.
- Hiragana and Katakana family lessons, every Japanese JLPT section lesson, and every non-Japanese language lesson can be reopened from a completed mine.
- Replaying an old lesson preserves the player's completion records, guardian rewards, review results, and course progress.

## v6.4.169 native pronunciation and clue-safe alphabet questions

- Reviewed the pronunciation routes for all 17 supported learning languages and corrected the 16 non-Japanese courses so every request uses its canonical language and regional locale, including American English, Spain Spanish, German, Mandarin, Brazilian Portuguese, and the eight additional language packs.
- Left the Japanese learning course's existing pronunciation tuning and native question system unchanged, as requested.
- Fixed voice selection so a preferred voice gender can no longer override the requested regional accent, and limited extreme pitch/rate styles to pronunciation-safe ranges.
- Redesigned alphabet listening questions so they no longer print the phonetic answer in the prompt. They now ask the learner to listen and choose the symbol; the written letter name appears only after grading.
- English alphabet audio now sends the actual letter symbol to the American English voice instead of a phonetic respelling such as “ef,” while the post-answer explanation still shows the letter name.
- Applied the same native-language pronunciation service to regular lessons, Writing Practice, Echo Cavern, Crystal Memory Match, voice tests, and character speech.

## v6.4.168 tap the miner to swing

- Fixed the behavior shown in the supplied recording: tapping the mine character or held pickaxe now starts the complete mining swing instead of cycling motivational greetings.
- Protected the animation from repeated taps so a second tap cannot replace or interrupt the chest brace, overhead lift, lower-left strike, impact hold, and recovery.
- Kept motivational tap reactions for lesson, arcade, and settlement characters while making the mine interaction consistently perform the mining action.

## v6.4.167 reference-matched mining swing

- Rebuilt the character motion from the supplied video: brace the pickaxe across the chest, lift it fully overhead, drive it down toward the lower-left, and hold the impact before recovering.
- Added a much clearer crouch, forward torso lean, and leftward weight transfer so the character moves with the tool instead of remaining upright.
- Slowed the complete action to make every preparation and impact pose readable on phone, tablet, and desktop layouts, while keeping the unwanted detached grip shapes removed.

## v6.4.166 corrected left-side pickaxe strike

- Removed the two simulated leather grip shapes that looked like detached extra hands on the pickaxe handle.
- Corrected the mining arc so the pickaxe starts above the character's right shoulder, crosses the body continuously, and strikes down toward the character's lower-left side.
- Synchronized the character's wind-up and weight transfer with the same strike direction, while preserving the remodeled pickaxe, responsive sizing, and reduced-motion support.

## v6.4.165 realistic two-handed mining swing

- Rebuilt the pickaxe path as a continuous shoulder-to-ground arc instead of reversing it through the character's face.
- Added a planted setup, backswing, accelerating downward strike, ground impact, follow-through, recoil, and controlled return to the resting carry pose.
- Synchronized the character's crouch, torso lean, forward weight transfer, impact compression, and recovery with the pickaxe head.
- Added two visible leather grip points on the handle so the tool reads as held throughout the motion, plus impact-timed dust and a brief ground glow.
- Preserved the remodeled reversed pickaxe head, shortened handle, phone/tablet/desktop sizing, reduced-motion preference, Tier 1 pose entitlement, and narrated Patreon videos.

## v6.4.164 narrated Patreon heart videos

- Added English narration and a cinematic stereo music bed to all three 24-second Patreon tier feature reels, matching the existing Language Miner trailer's Ava narrator and audio treatment.
- Gave Supporter, Companion Keeper, and Settlement Founder their own narration that describes the real tier features visible in each admin-captured video.
- Mixed every reel to broadcast-friendly loudness with voice filtering, music fades, peak limiting, 48 kHz stereo AAC audio, and the original H.264 visuals preserved without re-encoding.
- Patreon videos now start with sound after the player's deliberate selection and provide an accessible Sound on/Sound off control; pausing, visibility checks, exact 24-second completion, heart eligibility, and the six-hour cooldown remain unchanged.

## v6.4.163 realistic character mining swing

- Added a coordinated wind-up, accelerated strike, impact follow-through, recoil, and recovery motion while the character holds the pickaxe.
- Synchronized the character's bracing, lean, and body weight shift with the pickaxe arc instead of rotating the tool by itself.
- Flipped the remodeled steel head an additional 180 degrees as requested and shortened only the lower handle while keeping the head near the character's hand and shoulder.
- Preserved responsive phone, tablet, and desktop animation timing, including the low-performance character setting.

## v6.4.162 remodeled classic pickaxe

- Replaced the flat, arrow-like tool with a recognizable classic miner pickaxe featuring a forged steel head and central wood socket.
- Added a slimmer wood-grain handle, reinforced wrapped grip, metal highlights, and more natural proportions.
- Preserved the requested reversed orientation, diagonal hand placement, responsive sizing, and linked mining animation.

## v6.4.161 reversed held pickaxe

- Rotated the complete held pickaxe 180 degrees while keeping its compact diagonal placement across the character.
- Reversed both the metal head and wooden handle together across phone, tablet, and desktop layouts.
- Locked the reversed tool to the character's earlier visual footprint so rotation does not make it appear larger.
- Preserved the linked idle and mining animations with the newly rotated tool orientation.

## v6.4.160 natural diagonal held pickaxe

- Repositioned the mine pickaxe across the front of the character, with the metal head resting near the lower-left cave floor and the handle rising through the hand toward the right shoulder.
- Kept the pickaxe aligned with the character at phone, tablet, and desktop sizes.
- Re-anchored the mining swing at the raised grip so the tool returns to the same natural carrying position after every animation.

## v6.4.159 real Patreon feature videos

- Replaced the three animated Patreon poster slides with three real MP4 feature reels captured from the live admin build.
- Every Supporter, Companion Keeper, and Settlement Founder video is exactly 24 seconds long and clearly labels the tier's active in-game benefits.
- Tier 1 demonstrates the animated miner, character customization, and Mine Cosmetics; Tier 2 demonstrates the eleven-companion collection, wardrobes, and active bonuses; Tier 3 demonstrates the settlement map, permanent upgrades, Study Arcade library, and Memory Mine in play.
- The heart reward now waits for the real video to finish, pauses if the game tab becomes hidden, prevents seeking, and retains all missing-heart, player-profile, and six-hour cooldown checks.
- Added offline caching and responsive playback for all three feature reels.

## v6.4.158 character-aware writing and assessment-safe animations

- Writing Practice now changes its numbered guide for the selected course character instead of showing the same three arrows for every character; the opening Kanji lesson includes distinct, ordered guides for 人, 日, 月, 火, 水, 木, 金, and 土.
- The lesson-partner decorator is now idempotent, removes stale duplicates, and never inserts a character card into an active review quiz, placement assessment, Perfect Gate, boss, or timed test.
- Added a CSS assessment safety guard so interactive character actors, the study-guide dock, and the floating menu cannot cover answer buttons, questions, timers, or assessment results even while the page is re-rendering; every assessment retains its own visible Quit control.
- Enlarged the mine character across phone, tablet, and desktop layouts while preserving its lower-center position beneath the challenge copy.
- Moved the mine pickaxe out of its floating circle and into the character's hand, with the mining swing anchored at the grip.
- Patreon Tier 1 and higher now unlock a linked character pose pack for ready, mining, victory, retry, celebration, wave, study, arcade, and settlement animation states.
- Holiday Specials now render as one complete replacement outfit; the normal portrait, head, arms, hands, footwear, accessories, and recolor layers stay hidden underneath and return unchanged when the outfit is unequipped.

## v6.4.157 language-aware polish and fair cosmetic prices

- The animated miner now uses the player's known/interface language for spoken motivational phrases instead of the language being studied.
- Non-Japanese Stats Center views now show the selected course language, language-appropriate sections such as Alphabet and Sentences, and seven course levels instead of Japanese-only Hiragana and Kanji labels.
- Multilingual practice now records section-level answer totals for accurate future distribution reports while preserving older activity in an honest Earlier course activity row.
- Full-page wallpapers, rock skins, and mine wallpapers now use a smoother 50,000–10,000,000 Nugget progression instead of rapidly climbing into hundreds of millions or billions.
- The animated character now hides empty optional wardrobe-image slots, removing the browser's rectangular broken-image placeholder across mine wallpapers, screen sizes, and interaction states.

## v6.4.156 illustrated mine wallpaper collection

- Added 12 original illustrated mine wallpapers to the Tier 1 Mine Cosmetics collection, bringing the mine-scene total to 20.
- Added permanent ownership, escalating Nugget prices, full shop previews, equipped-state persistence, responsive cave rendering, and offline caching for every new scene.
- Kept the rock, challenge copy, and animated player readable above every illustrated background.
- Added the preview-only `minewallpaper=<wallpaper-id>` URL option so each scene can be reviewed without bypassing production purchase rules.

## v6.4.155 character outline removed

- Removed the rectangular focus/tap outline around animated player characters.
- Keyboard focus now uses a soft glow around the character instead of a box.

## v6.4.154 centered mine character

- Moved the customized animated miner from the cave's lower-left corner to the lower-center position beneath the challenge instructions.
- Reduced the mine-scene character scale slightly so the miner stays between the lower crystals without covering the challenge title or instruction line.
- Moved the temporary speech and Skip animation controls beside the character near the cave floor.
- Added responsive centered positioning for phones, tablets, laptops, and desktop displays while leaving lesson, arcade, and settlement character positions unchanged.

## v6.4.153 optional Patreon video hearts

- Added three separate animated in-game Patreon tier videos: Supporter, Companion Keeper, and Settlement Founder.
- A signed-in player who is missing hearts can choose and finish any one video to earn exactly one heart.
- The free optional reward does not require a Patreon account, membership, external ad network, or purchase.
- Added a six-hour per-player cooldown that begins only after a successful video completion and is saved locally and to the connected cloud save.
- Rechecks sign-in, missing-heart, player-profile, full-heart, valid-video, completion-time, and cooldown requirements before granting the reward.
- Added responsive phone, tablet, laptop, and desktop layouts plus reduced-motion support.

## v6.4.152 restored Install App locations

- Removed Install from the signed-in player header.
- Restored a prominent Install App control on the sign-in and account-creation screen.
- Restored the full Install Language Miner section inside Player → Settings, including browser-specific installation status and fallback instructions.

## v6.4.151 signed-out interface lock

- Removed the game menu, Kōji study guide, New Question control, companion launcher, heart HUD, and other gameplay surfaces from the sign-in and account-creation screens.
- Made the complete game shell hidden and inert until a player has successfully signed in, preventing keyboard and assistive-technology access to signed-in controls.
- Restored the gameplay interface and character guide only after profile authentication, and added a direct signed-out preview for verification.

## v6.4.150 five-game Study Arcade expansion

- Added Echo Cavern with target-language audio, Easy replay support, and natural-speed Hard mode.
- Added Grammar Forge with multilingual sentence ordering, undo/clear tools, and Hard-mode distractor pieces.
- Added Treasure Translator with translated direction clues, a responsive five-by-five map, and harder unlabeled controls.
- Added Crystal Memory Match, a three-way word, meaning, and pronunciation memory game.
- Added Impostor Word with multilingual vocabulary categories and a meaning explanation after every answer.
- Connected all five games to the existing Tier 3 unlock system, lesson/language selection, Easy/Hard preference, permanent best scores, completion history, responsive layouts, reduced-motion support, and customized-character reactions.

## v6.4.149 New Question button for every language

- Restored the floating New Question control explicitly whenever any supported non-Japanese course is active.
- Kept the control visible through language changes and updated its text and accessible label between New Question and Return to Question.
- Added `learning=` support to the playable preview so every language-specific course can be checked directly without repeating setup.

## v6.4.148 Crystal Cavern wallpaper collection

- Added five original full-page crystal-cavern wallpapers: Moonstone Cathedral, Amethyst Crown Cavern, Emerald Geode Sanctuary, Sapphire Ice Grotto, and Sunstone Ember Vault.
- Added permanent Nugget purchase, ownership, equipping, inventory, responsive cover cropping, and offline caching for the complete collection.
- Added direct wallpaper-shop and selected-wallpaper preview support for desktop, phone, and tablet visual checks.

## v6.4.147 interactive customized-character animations

- Added one reusable animation system that renders the learner's currently equipped character, clothing, accessories, gloves, shoes, and Holiday Special outfit.
- Added idle, mining, correct-answer, encouraging incorrect-answer, celebration, lesson, arcade, settlement, and tap-to-wave character states.
- Placed the character beside the core mine, inside lesson reviews, alongside active Study Arcade games, and on the interactive Settlement map.
- Added character reactions for answer results, five-answer streak milestones, lesson navigation, arcade actions/results, settlement building visits, and building upgrades.
- Added tap-to-speak encouragement in the current learning language, an accessible Skip animation control, reduced-motion support, an animation visibility setting, and a low-performance character mode.
- Added responsive character layouts for phones, tablets, laptops, and desktop displays.

## v6.4.146 unified Install App location

- Consolidated every Install App control into one consistent button beside the player name in the top header on phone and desktop.
- Removed the duplicate installer controls from the sign-in card and Accessibility & Settings.
- Updated the in-game guide and installation fallback so they point players to the new shared header location.

## v6.4.145 settlement paths and complete learner gradebook

- Gave every settlement landmark its own five-step Player Level path. Miner Lodge unlocks at Level 1, Japanese Library at 25, Sakura Garden at 50, Gem Forge at 75, and Gem Museum at 100; each landmark's later upgrades rise in 25-level increments.
- Preserved every existing purchased building level while making the more valuable landmarks progressively harder to unlock and finish.
- Moved the Easy/Hard quiz selector into the Expedition Hub lesson header and made the selected mode apply to every supported language. Easy uses more guidance and up to three choices; Hard uses reduced guidance and the full four-choice set.
- Expanded the read-only Parent/Teacher Center into a learner gradebook with suggested evidence-weighted grades, lesson-by-lesson completion and mastery, individual quiz/test attempts, Easy/Hard mode, scores, pass status, elapsed times, daily active study time, streak health, learning alerts, and CSV/print export.
- Added durable assessment-attempt and active-time telemetry. Existing aggregate progress remains visible; exact Easy/Hard mode, per-attempt history, and timed daily activity are recorded from this release forward.
- Added `supabase/migrations/202608200001_parent_teacher_gradebook_reports.sql` to refresh the learner-link RPCs, expose only the new whitelisted gradebook fields, and reload the PostgREST schema cache.

For cross-device teacher reports, deploy all pending migrations with `supabase db push`. This is required to resolve older cloud projects that report `list_parent_teacher_links` as missing from the schema cache.

## v6.4.144 community shortcuts and balanced menu tabs

- Added one-tap Discord and Patreon buttons to Kōji's Today’s Plan header so players can find both community destinations directly from the homepage.
- Gave the Discord and Patreon shortcuts distinct branded colors, descriptive labels, keyboard focus styling, and safe new-tab behavior.
- Distributed the Explore, Gear, and Player category buttons evenly across the full Game Menu bar on phone and compact layouts.

## v6.4.143 natural pronunciation and header polish

- Removed the large build/version badge from the homepage account controls.
- Added regional fallback matching so each course uses the closest installed native-language voice instead of the browser's unrelated default voice.
- Prefer higher-quality natural, neural, enhanced, and platform voices when several voices match.
- Added language-specific natural pacing for every supported pronunciation language.
- Removed artificial gender pitch changes in Natural mode; voice gender now selects an appropriate native voice when the device provides one.
- Unified writing-practice pronunciation with the main course voice engine.
- Added persistent Easy/Hard quiz modes across the shared quiz engine. Easy uses fuller reading support and up to three answer choices; Hard reduces reading aids and keeps the full four-choice distractor set. Japanese vocabulary additionally uses kana in Easy and kanji in Hard.
- Fixed signed-in cross-device linking inside the playable preview so it no longer falls back to a simulated request when a real cloud session exists.
- Added background link-request syncing and a prominent notification button in the homepage player header when a learner has requests awaiting approval.
- Added a prominent homepage Install button and a guided desktop-install dialog so players can install Language Miner with its own desktop and Start menu icon.
- Made the web-app manifest path-relative so installation works from the official hosted subdirectory and other secure deployments.

## v6.4.142 navigation consolidation

- Simplified the Game Menu to four Explore destinations, four Gear destinations, and five Player destinations.
- Combined Quests and Missions into one Goals center with Daily, Weekly, and Expedition tabs.
- Replaced duplicate Quick Stats and Player Stats entry points with one Stats Center, with Calendar available in the header and Stats.
- Moved reading support, question audio, native voice, and Smart Review preferences into Settings.
- Combined account backup, Privacy & Safety, and Patreon membership access under Account & Support.
- Combined Game Guide, Share Game, Feedback, and Discord access under Help & Community.
- Removed the duplicate Mine, Calendar, Player Dashboard, Placement Complete, and separate Privacy menu controls.

## v6.4.141 cross-device learner linking

- Parent/Teacher Center can send a learner-approved request to the exact email on another Language Miner account.
- Approved adults can refresh whitelisted progress summaries from the learner's latest cloud save on any signed-in device.
- Learners can approve, decline, or revoke access from their own account; adults can cancel pending requests or remove access.
- Linked progress refreshes whenever the Center opens, every 30 seconds while visible, when the app regains focus, and on demand.
- The duplicate Learning Path screen and menu entry were removed; Expedition Hub is now the single course map.
- Deploy `supabase/migrations/202608180001_cross_device_parent_teacher_links.sql` before using cross-device linking in production.

## v6.4.140 travel-path separation

- Travel & common phrases now appears only for players who explicitly choose the travel-purpose option during language setup.
- Standard beginner and placement-test pathways no longer include the travel section in their normal language-course map.
- Existing travel-purpose selections continue to open the focused 60-phrase travel course.

## v6.4.139 study-flow update

- Keeps the mobile heart-recovery HUD from covering the bottom course controls.
- Makes Smart Review unlimited, available at zero hearts, and completely neutral: no XP, currency, gems, streaks, quests, rewards, or penalties.
- Adds every language’s “I don’t know this yet” item directly to the saved Smart Review queue.
- Removes reviewed cards from Notebook → Difficult and fixes the persistent multilingual New Question control while removing its duplicate inline button.
- Restricts new gemstone awards to correct answers inside the gemstone’s matching mine.
- Adds a travel-only onboarding purpose and 60 common phrases for every supported language.
- Adds a required stroke-direction preview plus shape, placement, coverage, and direction validation to Writing Practice.

## v6.4.138 legal-readiness controls

- Adds age-category assurance without collecting an exact birth date and blocks direct under-13 account creation before signup data is sent.
- Versions Terms and Privacy acknowledgement in Supabase account metadata and the new `legal_consents` table.
- Adds Player → Privacy & Safety with a data inventory, JSON export, authenticated privacy requests, and permanent self-service account deletion.
- Adds a Privacy Policy, Terms of Service, expanded third-party notices, release asset register, educational-claims register, and preliminary trademark screen.
- Adds clear independent/non-certification wording to CEFR-, JLPT-, TOPIK-, HSK-, and DALF-oriented pathways.
- Adds `scripts/legal-readiness-check.ps1` and a deployment checklist for the required Supabase migration and account-deletion Edge Function.

Before commercial launch, complete every `HOLD` item in [ASSET-PROVENANCE.md](ASSET-PROVENANCE.md), add the operator's verified public contact details to the policies, deploy the new Supabase migration/function, and obtain final review from qualified privacy and trademark counsel.

## v6.4.126 Parent/Teacher Center

- Adds a separate read-only Parent/Teacher Center under Menu → Player.
- Adults and teachers can switch between learner-approved profiles and review activity, streaks, due-review counts, course progress, assessment history, and fastest completion records.
- Link student sends a pending request; only the learner can approve or decline it from their own profile.
- Manage access lets adults cancel or remove links and lets learners revoke approved access.
- The Center receives only whitelisted summaries and cannot answer questions, spend Nuggets, reset progress, inspect raw saves, or read private Notebook notes.
- Adds a complete Game Guide topic explaining learner linking, approval, switching, permissions, and access removal.
- Adds Parent/Teacher Center translations for all 17 supported known languages.

## v6.4.125 Patreon benefits refresh

- Rebuilt all three Patreon tier graphics so each image advertises the benefits that are actually available in the game.
- Expanded the in-game descriptions for Tier 1 customization, Tier 2's 11 active companions and Shop display controls, and Tier 3's five-building Settlement, 25 upgrades, and three lesson-based Study Arcade games.
- Removed the old Tier 2 claims for companion cosmetics, custom names, and idle animations because those features are not implemented.
- Added the Tier 3 lesson selector and saved personal-best moves, completion times, and scores to the advertised Arcade benefits.
- Redesigned each benefit card with responsive side-by-side artwork and copy on desktop and a clean stacked layout on phones.
- Moved account linking below the tier benefits so players see the membership offers first and connect only after choosing a tier.
- Added the corrected tier descriptions to all 17 known-language interface packs and cached the new graphics for installed/offline play.

## v6.4.124 lesson-based Study Arcade

- Added a Current lesson dropdown to the Study Arcade library and inside Memory Mine, Crystal Match, and Star Word Defender.
- Every Arcade game now builds its complete study set from the exact unlocked lesson the player selects instead of a general language word pool.
- Changing the Arcade lesson also updates and saves the active Course or Expedition lesson, including Japanese kana families, JLPT sections, and every non-Japanese course.
- Memory Mine and Crystal Match adapt to the number of items in smaller lessons, while Star Word Defender keeps every prompt and target inside the same selected lesson.
- Learning words still follow the selected learning language, and meanings continue to follow the selected known language whenever that course material provides them.

## v6.4.123 visible Memory cards and arrow alignment game

- Memory Mine now uses explicit card faces so every turned card visibly shows its learning word or known-language meaning on phone and desktop browsers.
- Star Word Defender is now a timed alignment game: move the arrow left or right beneath the matching falling word before it reaches the target line.
- Each correct alignment awards exactly one point; a missed or incorrect alignment awards no point.
- Removed the Fire button, lasers, target tapping, shooting controls, and shooting penalties.
- The revised Arcade name, instructions, target line, and movement labels are included in all 17 known-language interfaces.

## v6.4.122 Study Arcade Bag dropdown

- Added a clear expand/collapse button to the right side of the Study Arcade header in the Inventory or Bag.
- The dropdown hides or reveals the complete mini-game card collection without changing game ownership or personal-best records.
- Its expanded or collapsed state is saved to the current player profile and restored when the Bag is reopened.
- The arrow, accessibility state, and responsive layout work on desktop and phone screens.

## v6.4.121 companion display control moved into the Shop

- Removed the Companion Show/Hide/Choose control from the main mine screen.
- Added the same saved display control to the companion-roster summary in Menu, then Gear, then Shop, then Companions.
- The control clearly shows Shown, Hidden, or Choose and remains synchronized with the Accessibility setting.
- Hiding affects only the companion's display; the equipped companion and its active bonus remain selected.
- The updated Game Guide explains the new location in all 17 known-language interfaces.

## v6.4.120 cleaner header

- Removed the course-description banner beneath the Language Miner logo.
- The language pair, Change Language button, account controls, hero artwork, and course behavior remain unchanged.
- Switching either the known language or learning language cannot bring the removed banner back.
- Desktop and phone header layouts retain their responsive spacing without the extra text.

## v6.4.119 complete beginner Game Guide

- The Player menu’s Game Guide now opens a searchable handbook instead of the old five-page quick-start guide.
- Twenty-one topics explain the main controls, every Menu category, language selection, lessons, assessments, guardians, Smart Review, Notebook, Word Book, streaks, rewards, Shop, Bag, companions, Settlement, Patreon, Arcade, settings, sharing, backups, and common problems.
- Every topic includes an exact “Where to find it” path, four plain-language instructions, a reminder, and direct buttons that open the feature being explained.
- A searchable topic index and five category filters make the guide manageable on phones without forcing players through every page in order.
- The guide distinguishes commonly confused systems such as Notebook versus Word Book, Shop versus Inventory or Bag, Quests versus Missions, and Stats versus Calendar.
- The full handbook and its search controls are bundled in all 17 known-language interfaces.

## v6.4.118 Tier 3 Study Arcade

- A new Study Arcade collection is available in the Shop and appears in the player Bag after each game is claimed.
- The Arcade is exclusive to verified Patreon Tier 3 ($5/month); Tier 1 and Tier 2 accounts stay locked, and an open game closes immediately if Tier 3 access is lost.
- Memory Mine is a six-pair learning-word memorization game, while Crystal Match challenges players to connect eight words to meanings before its timer expires.
- Star Word Defender is a 45-second, Galaga-inspired word shooter with movement, fire controls, falling answer targets, scoring, and persistent personal bests.
- Mini-game ownership and best results persist in the player profile. Study words follow the selected learning language while instructions and meanings follow the selected known language.
- The Patreon Tier 3 membership page now lists the complete Study Arcade benefit, and the new Arcade interface is included in all 17 known-language packs.

## v6.4.117 manageable Notebook review queue

- The Study Notebook now opens on a dedicated Review Queue tab beside compact Difficult and Notes tabs.
- Every currently due review word or question is shown, including items beyond the normal 20-question Smart Review session limit.
- Players can search the complete due list by word, answer, prompt, or mine and clear the filter with one tap.
- Each row shows the review term, answer, mine, review count, and whether it is current, saved in the active queue, or due outside it.
- Review this word starts with the exact selected item; choosing another item during an active session safely moves it to the current position.
- The Notebook summary is shorter on phones, while Start/Continue Smart Review and the full Review Center remain available.
- All new queue labels, search controls, statuses, and buttons are included in every known-language interface.

## v6.4.116 Notebook Smart Review access

- Smart Review now appears as a permanent status card near the top of the Study Notebook.
- The card shows whether review is empty, how many questions are due, or the completed and total count for an active saved queue.
- Start Smart Review and Continue Smart Review open the established review flow directly from the Notebook without creating a separate session.
- Continuing resumes the exact unanswered item, while the Review Center shortcut opens the full queue and session controls.
- The card is phone-responsive and its new controls and statuses are included in all 17 known-language interfaces.

## v6.4.115 shareable game QR code

- A clearly labeled Share Game button now appears in the Player menu.
- The Share page generates a scannable QR code from the live hosted game address without contacting an external QR service.
- Players can copy the game link, open the device's native sharing sheet, or download the QR code as a PNG.
- Preview, administrator, and other query parameters are removed from the shared address, and the preview page resolves to the playable `index.html` page.
- Localhost and file previews show a warning because those addresses cannot be opened from another device.
- The complete sharing interface automatically follows the player's selected known language.

## v6.4.114 complete known-language interface localization

- The selected known language now controls the whole game interface, including every menu category and the pages opened from those buttons.
- Patreon, Accessibility, Feedback, Shop, Expedition tabs, Smart Review, Word Book, Companions, Settlement, Missions, Events, Fashion, Character, Statistics, and Account now relocalize automatically.
- All 17 known-language choices include bundled offline interface packs; newly rendered buttons, descriptions, status messages, placeholders, and accessibility labels are translated without calling an online service during play.
- Changing the known language retranslates existing screens immediately while lesson questions, answer options, and pronunciation stay in the selected learning language.
- The feature menu now refreshes after its late-loaded sections are created, so Character, Achievements, Statistics, and Account controls remain available and localized.
- Non-Japanese courses no longer show stale Japanese Word Book wording or Japanese journey notifications.

## v6.4.113 selected-language Expeditions and rewards

- The Expedition Hub is now anchored to the active profile's selected learning language and repairs any late Japanese map render before it can replace that course.
- Existing local course settings automatically migrate to the profile's stable cloud identity, preventing a language reset while sign-in finishes.
- Multilingual lesson, review, and Guardian answers now update the shared answer counters, streak, missions, companion effects, and 25-correct treasure system.
- Placement, first-pass review, and first Guardian rewards are saved as one-time claims, while assessment replays can still earn their normal answer-streak treasures without duplicating milestone payouts.

## v6.4.112 companion display control

- A permanent Companion button now sits beside the round Menu button.
- The button clearly shows whether the equipped companion is Shown or Hidden and toggles the display with one tap.
- Players without an equipped companion can use the same button to open the Companion selection area.
- The floating companion was moved above its new control so it no longer covers the button row.

## v6.4.111 fastest assessment records

- Placement tests now save and display their completion time on the player profile.
- Passing two-lesson review quizzes keep the fastest successful time for each checkpoint.
- Perfect Guardian tests keep a fastest time for each mine and can be replayed to improve the record.
- Records are shown on results, course/checkpoint cards, and the Japanese Tests tab, and are supported in every language course.

## v6.4.110 persistent Smart Review sessions

- Smart Review now creates a saved queue of up to 20 due questions instead of opening one review question and falling back into the active lesson.
- Next Review, the mine rock, and the permanent quick-action button all continue the active review queue across stages and lessons.
- Review progress, first-try recall, total attempts, and missed items remain saved across page refreshes and sign-ins on the same profile.
- The Review Center shows the active queue, supports resuming or explicitly ending it, and returns to the original lesson route only after completion or an intentional exit.
- Lesson and kana route validation now recognizes Smart Review questions instead of discarding them when they come from a different saved lesson.

## v6.4.109 portrait lock and streak repairs

- Portrait lock now uses the Screen Orientation API when Android permits it and blocks landscape play with a full-screen portrait guard when the browser refuses the lock.
- The portrait guard can no longer be suppressed by its old CSS rule, and touch-device detection also supports browsers that do not report a coarse pointer.
- The current practice streak is recalculated from consecutive calendar study dates, automatically repairing counters from older saves, imports, and cloud syncs.
- A current streak remains protected through the day after the latest practice and resets once a full calendar day is missed.

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
