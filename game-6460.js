// v6.4.2: clean standalone release with character-native cosmetics.
// cannot silently skip a separate loader script.
window.JM_RECOLOR_DATA={};
window.getJapaneseMinerRecolor=key=>{
  const value=window.JM_RECOLOR_DATA[key];
  return value?`data:image/webp;base64,${value}`:'';
};
(async()=>{
  try{
    const response=await fetch('cosmetics-6420.dat',{cache:'no-store'});
    if(!response.ok)throw new Error(`Cosmetic artwork request failed: ${response.status}`);
    const payload=await response.arrayBuffer();
    const bytes=new Uint8Array(payload);
    if(bytes[0]===0x1f&&bytes[1]===0x8b){
      const stream=new Blob([payload]).stream().pipeThrough(new DecompressionStream('gzip'));
      window.JM_RECOLOR_DATA=await new Response(stream).json();
    }else{
      window.JM_RECOLOR_DATA=JSON.parse(new TextDecoder().decode(bytes));
    }
    window.dispatchEvent(new Event('jm-recolors-ready'));
  }catch(error){console.error('Language Miner cosmetic artwork could not be loaded.',error);}
})();

const stages = [
  {name:"Hiragana Mine", label:"Hiragana", unlock:1},
  {name:"Katakana Cavern", label:"Katakana", unlock:3, requiredHiraganaXp:18240},
  {name:"JLPT N5 Quarry", label:"N5", unlock:5},
  {name:"JLPT N4 Tunnel", label:"N4", unlock:8},
  {name:"JLPT N3 Depths", label:"N3", unlock:12},
  {name:"JLPT N2 Crystal Core", label:"N2", unlock:17},
  {name:"JLPT N1 Master Mine", label:"N1", unlock:23}
];

const STAGE_XP_REQUIREMENTS=[18240,18240,25000,35000,50000,75000,100000];
const STAGE_MASTERY_REQUIREMENTS=[90,90,85,85,85,85,85];
const STAGE_CLEAR_REWARDS=[2500,5000,10000,20000,40000,80000,160000];
// Placement starters follow the same five-times-deeper economy used by
// mine treasure chests. This keeps every starting route useful at its own
// shop-price tier instead of giving advanced players an early-mine payout.
const PLACEMENT_REWARD_TIERS=[
  {nuggets:2500,hints:1,shields:0},
  {nuggets:15000,hints:2,shields:0},
  {nuggets:75000,hints:3,shields:1},
  {nuggets:375000,hints:5,shields:2},
  {nuggets:1875000,hints:8,shields:3},
  {nuggets:9375000,hints:12,shields:5},
  {nuggets:46875000,hints:20,shields:10}
];

const gemTiers = [
 {name:"Agate", icon:"🟤", value:1, minStage:0, weight:55, desc:"Hiragana gemstone • required for the 4th heart."},
 {name:"Amethyst", icon:"🟪", value:5, minStage:0, weight:42, desc:"Hiragana gemstone • required for the 5th heart."},
 {name:"Aquamarine", icon:"🔹", value:25, minStage:0, weight:34, desc:"Hiragana gemstone • required for the 6th heart."},
 {name:"Citrine", icon:"🟨", value:125, minStage:0, weight:28, desc:"Hiragana gemstone • required for the 7th heart."},
 {name:"Emerald", icon:"💚", value:625, minStage:1, weight:22, desc:"Katakana gemstone • required for the 8th heart."},
 {name:"Garnet", icon:"🔴", value:3125, minStage:1, weight:18, desc:"Katakana gemstone • required for the 9th heart."},
 {name:"Opal", icon:"🌈", value:15625, minStage:1, weight:13, desc:"Katakana gemstone • required for the 10th heart."},
 {name:"Peridot", icon:"🟢", value:78125, minStage:1, weight:11, desc:"Katakana gemstone • required for the 11th heart."},
 {name:"Ruby", icon:"❤️", value:390625, minStage:2, weight:8, desc:"JLPT N5 gemstone • required for the 12th heart."},
 {name:"Sapphire", icon:"💙", value:1953125, minStage:2, weight:7, desc:"JLPT N5 gemstone • required for the 13th heart."},
 {name:"Topaz", icon:"🔶", value:9765625, minStage:2, weight:5, desc:"JLPT N5 gemstone • required for the final 14th heart."},
 {name:"Alexandrite", icon:"🟣", value:48828125, minStage:3, weight:3, desc:"Rare higher-level gemstone with future endgame uses."},
 {name:"Paraíba Tourmaline", icon:"🩵", value:244140625, minStage:4, weight:2, desc:"A scarce higher-level gemstone."},
 {name:"Jadeite", icon:"🍏", value:1220703125, minStage:5, weight:1.4, desc:"A prestigious advanced-learning gemstone."},
 {name:"Red Diamond", icon:"♦️", value:6103515625, minStage:6, weight:.35, desc:"The rarest gemstone in the current collection."}
];

const GEM_CHECKPOINT_DROPS = [
  {stage:0,checkpoint:1,gem:"Agate"},
  {stage:0,checkpoint:2,gem:"Amethyst"},
  {stage:0,checkpoint:3,gem:"Aquamarine"},
  {stage:0,checkpoint:4,gem:"Citrine"},
  {stage:1,checkpoint:1,gem:"Emerald"},
  {stage:1,checkpoint:2,gem:"Garnet"},
  {stage:1,checkpoint:3,gem:"Opal"},
  {stage:1,checkpoint:4,gem:"Peridot"},
  {stage:2,checkpoint:1,gem:"Ruby"},
  {stage:2,checkpoint:2,gem:"Sapphire"},
  {stage:2,checkpoint:4,gem:"Topaz"},
  {stage:3,checkpoint:4,gem:"Alexandrite"},
  {stage:4,checkpoint:4,gem:"Paraíba Tourmaline"},
  {stage:5,checkpoint:4,gem:"Jadeite"},
  {stage:6,checkpoint:4,gem:"Red Diamond"}
];

const hira = [
["あ","a"],["い","i"],["う","u"],["え","e"],["お","o"],["か","ka"],["き","ki"],["く","ku"],["け","ke"],["こ","ko"],
["さ","sa"],["し","shi"],["す","su"],["せ","se"],["そ","so"],["た","ta"],["ち","chi"],["つ","tsu"],["て","te"],["と","to"],
["な","na"],["に","ni"],["ぬ","nu"],["ね","ne"],["の","no"],["は","ha"],["ひ","hi"],["ふ","fu"],["へ","he"],["ほ","ho"],
["ま","ma"],["み","mi"],["む","mu"],["め","me"],["も","mo"],["や","ya"],["ゆ","yu"],["よ","yo"],
["ら","ra"],["り","ri"],["る","ru"],["れ","re"],["ろ","ro"],["わ","wa"],["を","wo"],["ん","n"],
["が","ga"],["ぎ","gi"],["ぐ","gu"],["げ","ge"],["ご","go"],
["ざ","za"],["じ","ji"],["ず","zu"],["ぜ","ze"],["ぞ","zo"],
["だ","da"],["ぢ","ji"],["づ","zu"],["で","de"],["ど","do"],
["ば","ba"],["び","bi"],["ぶ","bu"],["べ","be"],["ぼ","bo"],
["ぱ","pa"],["ぴ","pi"],["ぷ","pu"],["ぺ","pe"],["ぽ","po"]
];
const kata = [
["ア","a"],["イ","i"],["ウ","u"],["エ","e"],["オ","o"],["カ","ka"],["キ","ki"],["ク","ku"],["ケ","ke"],["コ","ko"],
["サ","sa"],["シ","shi"],["ス","su"],["セ","se"],["ソ","so"],["タ","ta"],["チ","chi"],["ツ","tsu"],["テ","te"],["ト","to"],
["ナ","na"],["ニ","ni"],["ヌ","nu"],["ネ","ne"],["ノ","no"],["ハ","ha"],["ヒ","hi"],["フ","fu"],["ヘ","he"],["ホ","ho"],
["マ","ma"],["ミ","mi"],["ム","mu"],["メ","me"],["モ","mo"],["ヤ","ya"],["ユ","yu"],["ヨ","yo"],
["ラ","ra"],["リ","ri"],["ル","ru"],["レ","re"],["ロ","ro"],["ワ","wa"],["ヲ","wo"],["ン","n"],
["ガ","ga"],["ギ","gi"],["グ","gu"],["ゲ","ge"],["ゴ","go"],
["ザ","za"],["ジ","ji"],["ズ","zu"],["ゼ","ze"],["ゾ","zo"],
["ダ","da"],["ヂ","ji"],["ヅ","zu"],["デ","de"],["ド","do"],
["バ","ba"],["ビ","bi"],["ブ","bu"],["ベ","be"],["ボ","bo"],
["パ","pa"],["ピ","pi"],["プ","pu"],["ペ","pe"],["ポ","po"]
];

const questions = [
  {stage:0,q:"あ",prompt:"Choose the correct reading.",a:"a",opts:["a","i","u","e"]},
  {stage:0,q:"き",prompt:"Choose the correct reading.",a:"ki",opts:["sa","ki","chi","ke"]},
  {stage:0,q:"ぬ",prompt:"Choose the correct reading.",a:"nu",opts:["me","ne","nu","no"]},
  {stage:0,q:"ほ",prompt:"Choose the correct reading.",a:"ho",opts:["ha","he","ho","ma"]},
  {stage:0,q:"り",prompt:"Choose the correct reading.",a:"ri",opts:["ru","ri","re","ro"]},
  {stage:0,q:"Which hiragana is “ka”?",prompt:"Choose the character.",a:"か",opts:["き","か","く","け"]},
  {stage:0,q:"Which hiragana is “yo”?",prompt:"Choose the character.",a:"よ",opts:["ゆ","よ","や","を"]},
  {stage:1,q:"ア",prompt:"Choose the correct reading.",a:"a",opts:["a","i","u","o"]},
  {stage:1,q:"シ",prompt:"Choose the correct reading.",a:"shi",opts:["tsu","shi","so","n"]},
  {stage:1,q:"Which katakana is “ko”?",prompt:"Choose the character.",a:"コ",opts:["ロ","ユ","コ","ヨ"]},
  {stage:2,q:"水",speechText:"みず",prompt:"What does this kanji mean?",a:"water",opts:["fire","water","tree","gold"]},
  {stage:2,q:"私は学生です。",speechText:"わたしは がくせいです。",prompt:"Choose the best meaning.",a:"I am a student.",opts:["I am a student.","I drink water.","I like school.","I am a teacher."]},
  {stage:3,q:"昨日、映画を見ました。",speechText:"きのう、えいがを みました。",prompt:"Choose the best meaning.",a:"I watched a movie yesterday.",opts:["I will watch a movie.","I watched a movie yesterday.","I bought a movie.","I watched TV today."]},
  {stage:4,q:"この問題は思ったより難しい。",speechText:"この もんだいは おもったより むずかしい。",prompt:"Choose the best meaning.",a:"This problem is harder than I thought.",opts:["This problem is easy.","I forgot the problem.","This problem is harder than I thought.","The answer is difficult to read."]},
  {stage:5,q:"彼は会議に出席する予定です。",speechText:"かれは かいぎに しゅっせきする よていです。",prompt:"Choose the best meaning.",a:"He plans to attend the meeting.",opts:["He canceled the meeting.","He plans to attend the meeting.","He already left the meeting.","He is organizing a party."]},
  {stage:6,q:"努力を重ねた結果、目標を達成した。",speechText:"どりょくを かさねた けっか、もくひょうを たっせいした。",prompt:"Choose the best meaning.",a:"After sustained effort, the goal was achieved.",opts:["The goal was abandoned.","The effort caused a problem.","After sustained effort, the goal was achieved.","The result was unexpected."]},
  {stage:2,q:"毎朝七時に起きます。",speechText:"まいあさ しちじに おきます。",prompt:"Choose the best meaning.",a:"I wake up at seven every morning.",opts:["I sleep at seven every night.","I wake up at seven every morning.","I leave at eight every morning.","I eat breakfast at seven."]},
  {stage:2,q:"駅はどこですか。",speechText:"えきは どこですか。",prompt:"Choose the best meaning.",a:"Where is the station?",opts:["When does the train leave?","Where is the station?","How much is the ticket?","Is this the station?"]},
  {stage:3,q:"雨が降っているので、傘を持っていきます。",speechText:"あめが ふっているので、かさを もっていきます。",prompt:"Choose the best meaning.",a:"Because it is raining, I will take an umbrella.",opts:["Because it is raining, I will take an umbrella.","I forgot my umbrella in the rain.","It may rain tomorrow.","I bought an umbrella yesterday."]},
  {stage:3,q:"宿題を終えてから、テレビを見ました。",speechText:"しゅくだいを おえてから、テレビを みました。",prompt:"Choose the best meaning.",a:"After finishing my homework, I watched television.",opts:["I watched television before homework.","After finishing my homework, I watched television.","I did homework while watching television.","I did not finish my homework."]},
  {stage:4,q:"電車が遅れたため、会議に間に合わなかった。",speechText:"でんしゃが おくれたため、かいぎに まにあわなかった。",prompt:"Choose the best meaning.",a:"Because the train was delayed, I did not make it to the meeting on time.",opts:["The meeting was delayed by a train.","Because the train was delayed, I did not make it to the meeting on time.","I left the meeting early to catch a train.","The meeting was held on the train."]},
  {stage:4,q:"彼女は日本に来て以来、毎日漢字を勉強している。",speechText:"かのじょは にほんに きて いらい、まいにち かんじを べんきょうしている。",prompt:"Choose the best meaning.",a:"She has studied kanji every day since coming to Japan.",opts:["She studied kanji before coming to Japan.","She has studied kanji every day since coming to Japan.","She will study kanji when she leaves Japan.","She teaches kanji in Japan."]},
  {stage:5,q:"この計画を実現するには、十分な資金を確保する必要がある。",speechText:"この けいかくを じつげんするには、じゅうぶんな しきんを かくほする ひつようが ある。",prompt:"Choose the best meaning.",a:"To realize this plan, it is necessary to secure sufficient funding.",opts:["The plan was canceled because funding was excessive.","To realize this plan, it is necessary to secure sufficient funding.","The funding plan has already been completed.","No funding is required for the plan."]},
  {stage:5,q:"予想に反して、売上は前年度を上回った。",speechText:"よそうに はんして、うりあげは ぜんねんどを うわまわった。",prompt:"Choose the best meaning.",a:"Contrary to expectations, sales exceeded the previous year.",opts:["Sales were exactly as expected.","Contrary to expectations, sales exceeded the previous year.","Sales fell below the previous year.","The forecast was made last year."]},
  {stage:6,q:"彼の主張は一見もっともらしいが、根拠に乏しい。",speechText:"かれの しゅちょうは いっけん もっともらしいが、こんきょに とぼしい。",prompt:"Choose the best meaning.",a:"His argument seems plausible at first glance, but lacks evidence.",opts:["His argument is supported by extensive evidence.","His argument seems plausible at first glance, but lacks evidence.","His claim was immediately rejected as impossible.","His evidence is difficult to understand."]},
  {stage:6,q:"制度の見直しをめぐって、関係者の意見は真っ向から対立した。",speechText:"せいどの みなおしを めぐって、かんけいしゃの いけんは まっこうから たいりつした。",prompt:"Choose the best meaning.",a:"The parties' opinions were directly opposed over reviewing the system.",opts:["Everyone agreed to keep the system unchanged.","The parties' opinions were directly opposed over reviewing the system.","Only one person reviewed the system.","The system was revised without discussion."]}
];
hira.forEach(([ch,rom])=>questions.push({stage:0,q:ch,prompt:"Choose the correct reading.",a:rom,opts:makeKanaOpts(hira,rom),kana:ch,kanaType:"hiragana"}));
kata.forEach(([ch,rom])=>questions.push({stage:1,q:ch,prompt:"Choose the correct reading.",a:rom,opts:makeKanaOpts(kata,rom),kana:ch,kanaType:"katakana"}));

// Ensure every kana-based question contributes to mastery, including the original starter questions.
questions.forEach(q=>{
  if(q.kana) return;
  if(q.stage===0){
    if(hira.some(([ch])=>ch===q.q)) { q.kana=q.q; q.kanaType="hiragana"; }
    else if(hira.some(([ch])=>ch===q.a)) { q.kana=q.a; q.kanaType="hiragana"; }
  }
  if(q.stage===1){
    if(kata.some(([ch])=>ch===q.q)) { q.kana=q.q; q.kanaType="katakana"; }
    else if(kata.some(([ch])=>ch===q.a)) { q.kana=q.a; q.kanaType="katakana"; }
  }
});


// v1.8 expanded learning content. Static templates create variety without network access.
function addQuestion(question){
  question.id=question.id||`q-${questions.length}-${question.stage}`;
  questions.push(question);
}

// Add reverse-recognition kana questions and beginner vocabulary so kana mines are not one-note.
function makeKanaCharOpts(set,correct){const pool=set.map(x=>x[0]).filter(x=>x!==correct);return shuffle([correct,...shuffle(pool).slice(0,3)]);}
hira.forEach(([ch,rom])=>addQuestion({stage:0,q:`Which hiragana represents “${rom}”?`,prompt:"Choose the character.",a:ch,opts:makeKanaCharOpts(hira,ch),kana:ch,kanaType:"hiragana",kind:"recognition"}));
kata.forEach(([ch,rom])=>addQuestion({stage:1,q:`Which katakana represents “${rom}”?`,prompt:"Choose the character.",a:ch,opts:makeKanaCharOpts(kata,ch),kana:ch,kanaType:"katakana",kind:"recognition"}));

// Hiragana and Katakana mines intentionally contain kana-only drills.
// Vocabulary, kanji, grammar, and sentence learning begin in the JLPT N5 Quarry.
function wordOptions(list,answer,index){
  const pool=[...new Set(list.map(x=>x[index]).filter(x=>x!==answer))];
  return shuffle([answer,...shuffle(pool).slice(0,3)]);
}

const n5Vocab=[
 ["人","ひと","person"],["日","ひ","day/sun"],["月","つき","moon/month"],["火","ひ","fire"],["水","みず","water"],["木","き","tree"],["金","かね","money/gold"],["土","つち","earth/soil"],
 ["山","やま","mountain"],["川","かわ","river"],["田","た","rice field"],["口","くち","mouth"],["目","め","eye"],["耳","みみ","ear"],["手","て","hand"],["足","あし","foot/leg"],
 ["上","うえ","above"],["下","した","below"],["中","なか","inside"],["外","そと","outside"],["前","まえ","front/before"],["後","あと","after/behind"],["左","ひだり","left"],["右","みぎ","right"],
 ["大きい","おおきい","big"],["小さい","ちいさい","small"],["新しい","あたらしい","new"],["古い","ふるい","old"],["高い","たかい","expensive/high"],["安い","やすい","cheap"],
 ["行く","いく","to go"],["来る","くる","to come"],["見る","みる","to see"],["聞く","きく","to listen/ask"],["話す","はなす","to speak"],["読む","よむ","to read"],
 ["食べる","たべる","to eat"],["飲む","のむ","to drink"],["買う","かう","to buy"],["帰る","かえる","to return home"]
];
const n5Grammar=[
 ["わたし___がくせいです。","は","I am a student.","Topic marker は"],
 ["みず___のみます。","を","I drink water.","Object marker を"],
 ["がっこう___いきます。","に","I go to school.","Destination marker に"],
 ["ともだち___はなします。","と","I talk with a friend.","Partner marker と"],
 ["でんしゃ___いきます。","で","I go by train.","Means marker で"],
 ["これはだれ___ほんですか。","の","Whose book is this?","Possession marker の"],
 ["ねこ___います。","が","There is a cat.","Subject marker が"],
 ["つくえのうえ___ほんがあります。","に","There is a book on the desk.","Location marker に"],
 ["きょう___あした、いきます。","か","I will go today or tomorrow.","Choice particle か"],
 ["コーヒー___おちゃをのみます。","か","I drink coffee or tea.","Choice particle か"]
];
const n5Sentences=[
 ["私は学生です。","わたしは がくせいです。","I am a student."],
 ["毎朝七時に起きます。","まいあさ しちじに おきます。","I wake up at seven every morning."],
 ["駅はどこですか。","えきは どこですか。","Where is the station?"],
 ["今日は雨です。","きょうは あめです。","It is rainy today."],
 ["母は料理が上手です。","ははは りょうりが じょうずです。","My mother is good at cooking."],
 ["日曜日に友達と映画を見ます。","にちようびに ともだちと えいがを みます。","I watch a movie with a friend on Sunday."],
 ["この本はとても面白いです。","この ほんは とても おもしろいです。","This book is very interesting."],
 ["日本語を少し話します。","にほんごを すこし はなします。","I speak a little Japanese."],
 ["スーパーで野菜を買いました。","スーパーで やさいを かいました。","I bought vegetables at the supermarket."],
 ["明日は学校へ行きません。","あしたは がっこうへ いきません。","I will not go to school tomorrow."]
];
function rubyWord(kanji,reading){return `<ruby>${kanji}<rt>${reading}</rt></ruby>`;}
n5Vocab.forEach(([kanji,reading,meaning])=>{
  addQuestion({stage:2,tier:"beginner",support:"guided",q:reading,displayGuided:reading,displayStandard:rubyWord(kanji,reading),displayChallenge:kanji,speechText:reading,prompt:"Choose the meaning.",a:meaning,opts:wordOptions(n5Vocab,meaning,2),help:`${kanji} is read ${reading} and means “${meaning}.”`,kind:"vocabulary",vocabularyKey:kanji});
  addQuestion({stage:2,tier:"beginner",support:"guided",q:`Which word means “${meaning}”?`,prompt:"Choose the reading.",a:reading,opts:wordOptions(n5Vocab,reading,1),help:`${kanji} is read ${reading}.`,kind:"vocabulary",vocabularyKey:kanji});
  addQuestion({stage:2,tier:"intermediate",support:"standard",q:kanji,concealedPrompt:kanji,displayChallenge:kanji,speechText:reading,prompt:"Choose the correct reading.",a:reading,opts:wordOptions(n5Vocab,reading,1),help:`Meaning: ${meaning}. Reading: ${reading}.`,kind:"reading"});
});
n5Grammar.forEach(([sentence,particle,meaning,note])=>{
  addQuestion({stage:2,tier:"intermediate",support:"guided",q:sentence,prompt:"Choose the missing particle.",a:particle,opts:shuffle([particle,...["は","が","を","に","で","と","の","へ","か"].filter(x=>x!==particle).slice(0,3)]),help:`${note}. Full meaning: ${meaning}`,kind:"grammar"});
});
n5Sentences.forEach(([sentence,reading,meaning])=>{
  addQuestion({stage:2,tier:"advanced",support:"standard",q:sentence,displayGuided:reading,displayStandard:`<div>${sentence}</div><small class="furigana-line">${reading}</small>`,displayChallenge:sentence,speechText:reading,prompt:"Choose the best meaning.",a:meaning,opts:wordOptions(n5Sentences,meaning,2),help:`Reading: ${reading}<br>Meaning: ${meaning}`,kind:"sentence"});
});



// Personalized Tutor Curriculum (lessons 1010–1028)
// These questions are kept inside N5 while maintaining separate tutor tags and filters.
const tutorVocabulary = [
  ["eat","たべる","taberu"],["drink","のむ","nomu"],["go","いく","iku"],["come","くる","kuru"],["do","する","suru"],
  ["study","べんきょうする","benkyou suru"],["buy","かう","kau"],["listen","きく","kiku"],["watch / see","みる","miru"],["sleep","ねる","neru"],
  ["make","つくる","tsukuru"],["wash","あらう","arau"],["clean","そうじする","souji suru"],["throw away","すてる","suteru"],["collect","あつめる","atsumeru"],
  ["teach","おしえる","oshieru"],["speak","はなす","hanasu"],["read","よむ","yomu"],["write","かく","kaku"],["pay","はらう","harau"],
  ["wait","まつ","matsu"],["understand","わかる","wakaru"],["forget","わすれる","wasureru"],["help","てつだう","tetsudau"],
  ["apple","りんご","ringo"],["water","みず","mizu"],["book","ほん","hon"],["house","いえ","ie"],["cafe","カフェ","kafe"],
  ["Japan","にほん","Nihon"],["Japanese language","にほんご","Nihongo"],["friend","ともだち","tomodachi"],["wife","つま","tsuma"],["teacher","せんせい","sensei"],
  ["gym","ジム","jimu"],["workout","きんトレ","kintore"],["car","くるま","kuruma"],["ticket","チケット","chiketto"],["station","えき","eki"],
  ["picture","しゃしん","shashin"],["reservation","よやく","yoyaku"],["movie","えいが","eiga"],["TV show","テレビばんぐみ","terebi bangumi"],["food","たべもの","tabemono"],
  ["clothes","ふく","fuku"],["weather","てんき","tenki"],["morning","あさ","asa"],["night","よる","yoru"],["weekend","しゅうまつ","shuumatsu"],
  ["question","しつもん","shitsumon"],["cat","ねこ","neko"],["dog","いぬ","inu"],["today","きょう","kyou"],["yesterday","きのう","kinou"],
  ["tomorrow","あした","ashita"],["now","いま","ima"],["what","なに","nani"],["where","どこ","doko"],["when","いつ","itsu"],
  ["who","だれ","dare"],["how","どうやって","douyatte"],["expensive / tall","たかい","takai"],["cheap","やすい","yasui"],["delicious","おいしい","oishii"],
  ["good","いい","ii"],["cute","かわいい","kawaii"],["beautiful / clean","きれい","kirei"],["hot","あつい","atsui"],["cold","さむい","samui"],
  ["sleepy","ねむい","nemui"],["healthy / energetic","げんき","genki"],["so-so","まあまあ","maamaa"]
];
function tutorOpts(index,value){
  const vals=[...new Set(tutorVocabulary.map(row=>row[index]).filter(v=>v!==value))];
  return shuffle([value,...shuffle(vals).slice(0,3)]);
}
tutorVocabulary.forEach(([english,japanese,romaji])=>{
  addQuestion({stage:2,curriculum:"tutor",tutorTrack:"vocabulary",tier:"beginner",q:english,prompt:"Choose the Japanese word from your tutor vocabulary.",a:japanese,opts:tutorOpts(1,japanese),help:`${english} = ${japanese} (${romaji})`,kind:"tutor-vocabulary",vocabularyKey:japanese});
  addQuestion({stage:2,curriculum:"tutor",tutorTrack:"vocabulary",tier:"beginner",q:japanese,prompt:"Choose the English meaning.",a:english,opts:tutorOpts(0,english),help:`${japanese} is ${romaji} and means “${english}.”`,kind:"tutor-vocabulary",vocabularyKey:japanese});
});

const tutorVerbForms = [
  ["たべる","Ru","たべます","たべました","たべない","たべた","たべて"],
  ["みる","Ru","みます","みました","みない","みた","みて"],
  ["のむ","U","のみます","のみました","のまない","のんだ","のんで"],
  ["かく","U","かきます","かきました","かかない","かいた","かいて"],
  ["かう","U","かいます","かいました","かわない","かった","かって"],
  ["はなす","U","はなします","はなしました","はなさない","はなした","はなして"],
  ["いく","U special","いきます","いきました","いかない","いった","いって"],
  ["する","irregular","します","しました","しない","した","して"],
  ["くる","irregular","きます","きました","こない","きた","きて"]
];
const formLabels=[[2,"polite present"],[3,"polite past"],[4,"negative plain"],[5,"casual past"],[6,"te-form"]];
tutorVerbForms.forEach(row=>{
  const [dict,group]=row;
  addQuestion({stage:2,curriculum:"tutor",tutorTrack:"verbs",tier:"intermediate",q:dict,prompt:"Which verb group is this?",a:group,opts:shuffle([group,...["Ru","U","U special","irregular"].filter(x=>x!==group).slice(0,3)]),help:`${dict} is a ${group} verb.`,kind:"tutor-verb"});
  formLabels.forEach(([idx,label])=>addQuestion({stage:2,curriculum:"tutor",tutorTrack:"verbs",tier:"intermediate",q:dict,prompt:`Choose the ${label} form.`,a:row[idx],opts:shuffle([row[idx],...shuffle(tutorVerbForms.map(r=>r[idx]).filter(x=>x!==row[idx])).slice(0,3)]),help:`${dict} → ${row[idx]} (${label})`,kind:"tutor-verb"}));
});

const tutorParticles = [
  ["わたし___りんごをたべます。","は","As for me, I eat an apple."],
  ["いえ___すしをたべます。","で","I eat sushi at home."],
  ["ごぜんしちじ___おきます。","に","I wake up at 7 a.m."],
  ["つま___ひろしまにいきました。","と","I went to Hiroshima with my wife."],
  ["このほんはわたし___ほんです。","の","This book is my book."],
  ["ねこ___りんごをたべた。","が","The cat ate an apple."],
  ["とうきょう___おおさかまでどのくらいかかりますか。","から","How long does it take from Tokyo to Osaka?"],
  ["カード___はらいます。","で","I pay by card."],
  ["りんご___すきです。","が","I like apples."],
  ["えき___いきます。","に","I go to the station."]
];
tutorParticles.forEach(([sentence,answer,meaning])=>addQuestion({stage:2,curriculum:"tutor",tutorTrack:"particles",tier:"intermediate",q:sentence,prompt:"Choose the missing particle.",a:answer,opts:shuffle([answer,...shuffle(["は","が","を","に","で","と","の","から","まで"]).filter(x=>x!==answer).slice(0,3)]),help:`${sentence.replace('___',answer)}<br>${meaning}`,kind:"tutor-particle"}));

const tutorPatterns = [
  ["I want an apple.","～がほしい","りんごがほしいです。"],
  ["I want to eat.","～たい","たべたいです。"],
  ["Please eat.","～てください","たべてください。"],
  ["I want you to eat.","～てほしい","たべてほしいです。"],
  ["I can eat.","potential / ことができる","たべられます。"],
  ["I plan to go.","～つもり","いくつもりです。"],
  ["I have been to Japan.","～たことがある","にほんにいったことがあります。"],
  ["May I watch this movie?","～てもいい","このえいがをみてもいいですか。"]
];
tutorPatterns.forEach(([english,pattern,japanese])=>{
  addQuestion({stage:2,curriculum:"tutor",tutorTrack:"patterns",tier:"intermediate",q:english,prompt:"Choose the best grammar pattern.",a:pattern,opts:shuffle([pattern,...shuffle(tutorPatterns.map(x=>x[1]).filter(x=>x!==pattern)).slice(0,3)]),help:`${japanese}`,kind:"tutor-pattern"});
  addQuestion({stage:2,curriculum:"tutor",tutorTrack:"patterns",tier:"advanced",q:english,prompt:"Choose the best Japanese sentence.",a:japanese,opts:shuffle([japanese,...shuffle(tutorPatterns.map(x=>x[2]).filter(x=>x!==japanese)).slice(0,3)]),help:`Pattern: ${pattern}`,kind:"tutor-pattern"});
});

const tutorAdjectives = [
  ["おいしい","not delicious","おいしくない"],["おいしい","was delicious","おいしかった"],["いい","was good","よかった"],
  ["あつい","was not hot","あつくなかった"],["きれい","not clean / pretty","きれいじゃない"],["しずか","was quiet","しずかでした"]
];
tutorAdjectives.forEach(([base,request,answer])=>addQuestion({stage:2,curriculum:"tutor",tutorTrack:"adjectives",tier:"intermediate",q:base,prompt:`Choose the form meaning “${request}.”`,a:answer,opts:shuffle([answer,...shuffle(tutorAdjectives.map(x=>x[2]).filter(x=>x!==answer)).slice(0,3)]),help:`${base} → ${answer}`,kind:"tutor-adjective"}));

const tutorConversation = [
  ["きょうなにをしましたか。","What did you do today?"],["あしたなにをしたいですか。","What do you want to do tomorrow?"],
  ["なんでにほんごをべんきょうしていますか。","Why are you studying Japanese?"],["しゅうまつなにをするつもりですか。","What do you plan to do this weekend?"],
  ["いまなんじですか。","What time is it now?"],["どうやってジムにいきますか。","How do you go to the gym?"],
  ["まいにちどのくらいにほんごをべんきょうしますか。","How long do you study Japanese every day?"],["これはいくらですか。","How much is this?"]
];
tutorConversation.forEach(([jp,en])=>addQuestion({stage:2,curriculum:"tutor",tutorTrack:"conversation",tier:"advanced",q:jp,prompt:"Choose the best meaning for this tutor conversation question.",a:en,opts:shuffle([en,...shuffle(tutorConversation.map(x=>x[1]).filter(x=>x!==en)).slice(0,3)]),help:`${jp}<br>${en}`,kind:"tutor-conversation"}));

const advancedBanks={
  3:[ ["必要","ひつよう","necessary"],["経験","けいけん","experience"],["予定","よてい","plan/schedule"],["準備","じゅんび","preparation"],["説明","せつめい","explanation"],["連絡","れんらく","contact"],["約束","やくそく","promise"],["最近","さいきん","recently"],["特別","とくべつ","special"],["残念","ざんねん","regrettable"] ],
  4:[ ["影響","えいきょう","influence"],["状況","じょうきょう","situation"],["結果","けっか","result"],["原因","げんいん","cause"],["判断","はんだん","judgment"],["解決","かいけつ","solution"],["増加","ぞうか","increase"],["減少","げんしょう","decrease"],["確認","かくにん","confirmation"],["提案","ていあん","proposal"] ],
  5:[ ["確保","かくほ","securing"],["実現","じつげん","realization"],["傾向","けいこう","trend"],["方針","ほうしん","policy"],["対象","たいしょう","target"],["課題","かだい","issue/task"],["評価","ひょうか","evaluation"],["維持","いじ","maintenance"],["適切","てきせつ","appropriate"],["相当","そうとう","considerable" ] ],
  6:[ ["根拠","こんきょ","basis/evidence"],["乏しい","とぼしい","scarce/lacking"],["見直し","みなおし","review/reconsideration"],["対立","たいりつ","conflict/opposition"],["妥当","だとう","valid/reasonable"],["著しい","いちじるしい","remarkable"],["促進","そくしん","promotion/acceleration"],["概念","がいねん","concept"],["遂行","すいこう","execution"],["把握","はあく","grasp/understanding"] ]
};
Object.entries(advancedBanks).forEach(([stage,list])=>{
  stage=Number(stage);
  list.forEach(([word,reading,meaning])=>{
    addQuestion({stage,q:word,concealedPrompt:word,displayChallenge:word,hideReadingInPrompt:true,speechText:reading,prompt:"Choose the meaning.",a:meaning,opts:wordOptions(list,meaning,2),help:`${word} is read ${reading} and means “${meaning}.”`,kind:"vocabulary"});
    addQuestion({stage,q:word,concealedPrompt:word,displayChallenge:word,speechText:reading,prompt:"Choose the reading.",a:reading,opts:wordOptions(list,reading,1),help:`Meaning: ${meaning}.`,kind:"reading"});
  });
});
questions.forEach((q,i)=>{if(!q.id) q.id=`base-${q.stage}-${i}`;});

function normalizeAssessmentTimeMs(value){const time=Math.round(Number(value)||0);return Number.isFinite(time)&&time>0?time:0;}
function assessmentTimeLabel(value){
  const milliseconds=normalizeAssessmentTimeMs(value);if(!milliseconds)return 'No record yet';
  const tenths=Math.max(1,Math.round(milliseconds/100)),seconds=Math.floor(tenths/10),decimal=tenths%10;
  if(seconds>=60)return `${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}.${decimal}`;
  return `${seconds}.${decimal}s`;
}
function assessmentRecordMarkup(value,newRecord=false,label='Fastest successful completion'){
  const time=normalizeAssessmentTimeMs(value);if(!time)return '';
  return `<div class="assessment-time-record ${newRecord?'new-record':''}"><span>${newRecord?'&#127942; New fastest time':'&#9201;&#65039; '+label}</span><strong>${assessmentTimeLabel(time)}</strong><small>Saved to this player profile</small></div>`;
}
function fastestAssessmentTime(values){const times=values.map(normalizeAssessmentTimeMs).filter(Boolean);return times.length?Math.min(...times):0;}
window.japaneseMinerAssessmentTimeLabel=assessmentTimeLabel;
window.japaneseMinerAssessmentRecordMarkup=assessmentRecordMarkup;

const DEFAULT_STATE = {
  supportMode:"guided", n5Tier:"beginner", n5Curriculum:"mixed", tutorTrack:"all",
  n5AcademyMastery:{}, academyTestBest:0, academyReviewDate:"", recentQuestionIds:[], onboardingComplete:false, placementResult:null, placementTestCompleted:false,
  gems:0, hearts:3, maxHearts:3, level:1, xp:0, streak:0, bestStreak:0, practiceStreak:0,
  hints:2, shields:1, active:null, answered:false, shieldArmed:false, lastPracticeDate:null,
  kanaStats:{}, gemInventory:{}, gemCheckpointClaims:{}, gemUnlockRewards:{}, kanaTab:"hiragana", lastKana:null, lastGem:null, hiraganaXp:0,
  heartRecoveryEnd:null, ownedPickaxeSkins:["standard"], equippedPickaxeSkin:"standard", ownedWallpapers:["midnight"], equippedWallpaper:"midnight", ownedRockSkins:["slate"], equippedRockSkin:"slate", ownedMineWallpapers:["classic"], equippedMineWallpaper:"classic", placementUnlockedThrough:0, developerInfiniteHearts:false,
  selectedStage:0, jlptSectionSelection:{}, jlptVocabularyLevel:{}, jlptReviewCheckpoints:{}, soundEnabled:true, voiceEnabled:true, autoSpeak:true, voiceRate:.85, voiceGender:"female", voiceStyle:"natural", smartReview:true, sessionGoal:20, sessionAnswered:0, sessionCorrect:0, stageXp:[0,0,0,0,0,0,0], clearedStages:[], questionStats:{}
};
const PROFILE_INDEX_KEY="jm_profiles";
const ACTIVE_PROFILE_KEY="jm_active_profile";
let activeProfileId=null;
let state=structuredClone(DEFAULT_STATE);
let appStarted=false;
let isDeveloperSession=false;
const DEVELOPER_NAME="Erendragneel";
function syncDeveloperControls(){
  const button=document.getElementById("developerBtn");
  if(button)button.hidden=!isDeveloperSession;
}
function mobilePortraitDevice(){
  const coarse=window.matchMedia?.("(pointer: coarse)")?.matches===true||Number(navigator.maxTouchPoints||0)>0;
  const shortest=Math.min(Number(window.screen?.width)||innerWidth,Number(window.screen?.height)||innerHeight);
  return coarse&&shortest<=1024;
}
let portraitLockInFlight=false;
function portraitLockEnabled(){return state?.v6?.portraitLockEnabled!==false;}
function portraitIsLandscape(){
  return window.matchMedia?.("(orientation: landscape)")?.matches===true||innerWidth>innerHeight;
}
async function requestMobilePortraitLock(){
  if(!portraitLockEnabled()||!activeProfileId||!mobilePortraitDevice()||portraitLockInFlight)return false;
  const orientation=window.screen?.orientation;
  if(!orientation?.lock)return false;
  portraitLockInFlight=true;
  try{
    try{await orientation.lock("portrait-primary");}
    catch{await orientation.lock("portrait");}
    return true;
  }catch{return false;}
  finally{portraitLockInFlight=false;}
}
async function setMobilePortraitLock(enabled){
  if(!state.v6||typeof state.v6!=="object")state.v6={};
  state.v6.portraitLockEnabled=!!enabled;
  const orientation=window.screen?.orientation;
  if(!enabled){
    try{orientation?.unlock?.();}catch{}
    syncPortraitGuard(false);
    return {enabled:false,locked:false,supported:!!orientation?.lock,mobile:mobilePortraitDevice(),fallback:false};
  }
  const locked=await requestMobilePortraitLock();
  const fallback=syncPortraitGuard(false);
  return {enabled:true,locked,supported:!!orientation?.lock,mobile:mobilePortraitDevice(),fallback};
}
function syncPortraitGuard(requestLock=true){
  const guard=document.getElementById("portraitGuard");
  const active=!!(activeProfileId&&mobilePortraitDevice()&&portraitLockEnabled()&&portraitIsLandscape());
  if(guard){
    guard.hidden=!active;
    guard.classList.toggle("active",active);
    guard.setAttribute("aria-hidden",String(!active));
    const message=document.getElementById("portraitGuardMessage");
    if(message)message.textContent="Turn your phone upright to continue. If it stays sideways, enable Auto rotate in your phone settings and try again.";
  }
  document.documentElement.classList.toggle("portrait-guard-active",active);
  if(requestLock&&activeProfileId&&mobilePortraitDevice()&&portraitLockEnabled())requestMobilePortraitLock().finally(()=>syncPortraitGuard(false));
  return active;
}
window.setJapaneseMinerPortraitLock=setMobilePortraitLock;
window.japaneseMinerPortraitLockEnabled=portraitLockEnabled;
function tutorAccessGranted(){return isDeveloperSession===true;}
function tutorQuestion(question){return !!question&&(question.curriculum==="tutor"||String(question.kind||"").startsWith("tutor-"));}
function questionAllowedForSession(question){return tutorAccessGranted()||!tutorQuestion(question);}
function repairTutorAccessState(target=state){
  if(tutorAccessGranted()||!target)return false;
  let changed=false;
  if(target.n5Curriculum!=="standard"){target.n5Curriculum="standard";changed=true;}
  if(target.tutorTrack!=="all"){target.tutorTrack="all";changed=true;}
  if(tutorQuestion(target.active)){target.active=null;target.answered=false;target.shieldArmed=false;changed=true;}
  const restrictedIds=new Set(questions.filter(tutorQuestion).map(question=>String(question.id)));
  if(target.v5?.boss?.questionIds?.some(id=>restrictedIds.has(String(id)))){target.v5.boss=null;changed=true;}
  return changed;
}
function syncOwnerTutorControls(idx=selectedStageIndex()){
  const settings=document.querySelector('.learning-settings');
  let root=document.getElementById('ownerTutorControls');
  if(!settings||!tutorAccessGranted()||Number(idx)!==2){root?.remove();return;}
  if(!root){
    root=document.createElement('div');
    root.id='ownerTutorControls';
    root.className='owner-tutor-controls';
    root.setAttribute('aria-label','Owner-only tutor curriculum controls');
    root.innerHTML=`<label id="n5CurriculumWrap" for="n5Curriculum">N5 curriculum source<select id="n5Curriculum"><option value="mixed">Mixed — standard N5 + tutor lessons</option><option value="tutor">Tutor Curriculum only</option><option value="standard">Standard N5 only</option></select></label><label id="tutorTrackWrap" for="tutorTrack">Tutor lesson track<select id="tutorTrack"><option value="all">All tutor material</option><option value="vocabulary">Core vocabulary</option><option value="verbs">Verb groups and conjugation</option><option value="particles">Particles</option><option value="patterns">Wants, requests, ability and plans</option><option value="adjectives">Adjectives and descriptions</option><option value="conversation">Daily conversation</option></select></label><div id="tutorMasteryLabel" class="small">Tutor curriculum mastery: 0%</div><div class="small">Changing either owner setting starts a fresh question.</div>`;
    settings.querySelector('label[for="supportMode"]')?.after(root);
    root.querySelector('#n5Curriculum').addEventListener('change',e=>{if(!tutorAccessGranted()){root.remove();return;}state.n5Curriculum=e.target.value;state.active=null;state.answered=false;save();render();setMessage(`N5 curriculum changed to ${e.target.options[e.target.selectedIndex].text}. Start a new question.`,"correct");});
    root.querySelector('#tutorTrack').addEventListener('change',e=>{if(!tutorAccessGranted()){root.remove();return;}state.tutorTrack=e.target.value;state.active=null;state.answered=false;save();render();setMessage(`Tutor lesson track changed to ${e.target.options[e.target.selectedIndex].text}. Start a new question.`,"correct");});
  }
  const curriculum=root.querySelector('#n5Curriculum'),track=root.querySelector('#tutorTrack'),trackWrap=root.querySelector('#tutorTrackWrap'),mastery=root.querySelector('#tutorMasteryLabel');
  curriculum.value=state.n5Curriculum||'mixed';
  track.value=state.tutorTrack||'all';
  trackWrap.hidden=state.n5Curriculum==='standard';
  mastery.textContent=`Tutor curriculum mastery: ${tutorCurriculumMastery()}%`;
}

function profileStorageKey(id){ return `jm_profile_${id}`; }
function readProfiles(){
  try{return JSON.parse(localStorage.getItem(PROFILE_INDEX_KEY))||[];}catch{return [];}
}
function writeProfiles(profiles){localStorage.setItem(PROFILE_INDEX_KEY,JSON.stringify(profiles));}
function normalizeName(name){return name.trim().replace(/\s+/g," ");}
function setAuthOverlayVisible(visible){
  const authOverlay=document.getElementById("authOverlay");
  if(!authOverlay)return;
  const dismissed=!visible;
  authOverlay.hidden=dismissed;
  authOverlay.inert=dismissed;
  authOverlay.classList.toggle("hidden",dismissed);
  authOverlay.classList.toggle("auth-dismissed",dismissed);
  authOverlay.setAttribute("aria-hidden",String(dismissed));
  if(dismissed)authOverlay.style.setProperty("display","none","important");
  else authOverlay.style.removeProperty("display");
}
function normalizeState(raw){
  const next={...structuredClone(DEFAULT_STATE),...(raw||{})};
  next.maxHearts=Math.min(14,next.maxHearts||3);
  next.hearts=Math.min(next.maxHearts,next.hearts??3);
  next.practiceStreak=next.practiceStreak||0;
  next.kanaStats=next.kanaStats||{};
  next.gemInventory=next.gemInventory||{};
  next.gemCheckpointClaims=next.gemCheckpointClaims&&typeof next.gemCheckpointClaims==="object"&&!Array.isArray(next.gemCheckpointClaims)?next.gemCheckpointClaims:{};
  next.gemUnlockRewards=next.gemUnlockRewards&&typeof next.gemUnlockRewards==="object"&&!Array.isArray(next.gemUnlockRewards)?next.gemUnlockRewards:{};
  next.kanaTab=next.kanaTab||"hiragana";
  next.lastKana=next.lastKana||null;
  next.lastGem=next.lastGem||null;
  next.heartRecoveryEnd=Number(next.heartRecoveryEnd)||null;
  next.ownedPickaxeSkins=Array.isArray(next.ownedPickaxeSkins)?next.ownedPickaxeSkins:["standard"];
  if(!next.ownedPickaxeSkins.includes("standard")) next.ownedPickaxeSkins.unshift("standard");
  const validPickaxeIds=["standard","copper","sakura","silver","frost","gold","neon","amethyst","inferno","galaxy","emerald","aurora","shadow","red-diamond"];
  next.equippedPickaxeSkin=validPickaxeIds.includes(next.equippedPickaxeSkin)?next.equippedPickaxeSkin:"standard";
  if(!next.ownedPickaxeSkins.includes(next.equippedPickaxeSkin)) next.equippedPickaxeSkin="standard";
  next.ownedWallpapers=Array.isArray(next.ownedWallpapers)?next.ownedWallpapers:["midnight"];
  if(!next.ownedWallpapers.includes("midnight"))next.ownedWallpapers.unshift("midnight");
  const validWallpaperIds=["midnight","sakura","bamboo","sunrise","crystal","paper","galaxy","emoji","inferno","aurora","ocean","confetti"];
  next.equippedWallpaper=validWallpaperIds.includes(next.equippedWallpaper)?next.equippedWallpaper:"midnight";
  if(!next.ownedWallpapers.includes(next.equippedWallpaper))next.equippedWallpaper="midnight";
  next.ownedRockSkins=Array.isArray(next.ownedRockSkins)?next.ownedRockSkins:["slate"];
  if(!next.ownedRockSkins.includes("slate"))next.ownedRockSkins.unshift("slate");
  const validRockSkinIds=["slate","gold-ore","amethyst-geode","sakura-quartz","frost-crystal","emerald-core","magma-rock","galaxy-meteor","gem-agate","gem-amethyst","gem-aquamarine","gem-citrine","gem-emerald","gem-garnet","gem-opal","gem-peridot","gem-ruby","gem-sapphire","gem-topaz","gem-alexandrite","gem-paraiba","gem-jadeite","gem-red-diamond"];
  next.equippedRockSkin=validRockSkinIds.includes(next.equippedRockSkin)?next.equippedRockSkin:"slate";
  if(!next.ownedRockSkins.includes(next.equippedRockSkin))next.equippedRockSkin="slate";
  next.ownedMineWallpapers=Array.isArray(next.ownedMineWallpapers)?next.ownedMineWallpapers:["classic"];
  if(!next.ownedMineWallpapers.includes("classic"))next.ownedMineWallpapers.unshift("classic");
  const validMineWallpaperIds=["classic","sakura-grotto","crystal-cathedral","bamboo-tunnel","sunken-mine","magma-forge","aurora-cavern","galaxy-depths"];
  next.equippedMineWallpaper=validMineWallpaperIds.includes(next.equippedMineWallpaper)?next.equippedMineWallpaper:"classic";
  if(!next.ownedMineWallpapers.includes(next.equippedMineWallpaper))next.equippedMineWallpaper="classic";
  next.placementUnlockedThrough=Math.max(0,Math.min(stages.length-1,Number(next.placementUnlockedThrough)||0));
  next.placementTestCompleted=Boolean(next.placementTestCompleted||(next.placementRewardClaimed&&next.placementResult));
  if(next.stats && Object.keys(next.kanaStats).length===0){
    Object.entries(next.stats).forEach(([ch,v])=>{next.kanaStats[ch]={attempts:Number(v.attempts??v.a??0),correct:Number(v.correct??v.c??0)};});
  }
  Object.keys(next.kanaStats).forEach(ch=>{const v=next.kanaStats[ch]||{};next.kanaStats[ch]={attempts:Number(v.attempts??v.a??0),correct:Number(v.correct??v.c??0)};});
  if(next.hiraganaXp==null) next.hiraganaXp=hira.reduce((sum,[ch])=>sum+Number((next.kanaStats[ch]||{}).correct||0)*12,0);
  next.hiraganaXp=Math.max(0,Number(next.hiraganaXp)||0);
  next.stageXp=Array.isArray(next.stageXp)?next.stageXp.slice(0,stages.length).map(v=>Math.max(0,Number(v)||0)):Array(stages.length).fill(0);
  while(next.stageXp.length<stages.length) next.stageXp.push(0);
  next.stageXp[0]=Math.max(next.stageXp[0],next.hiraganaXp);
  next.hiraganaXp=next.stageXp[0];
  next.clearedStages=Array.isArray(next.clearedStages)?next.clearedStages.map(Number).filter(i=>i>=0&&i<stages.length):[];
  next.questionStats=next.questionStats&&typeof next.questionStats==="object"?next.questionStats:{};
  Object.keys(next.questionStats).forEach(id=>{const v=next.questionStats[id]||{};next.questionStats[id]={attempts:Math.max(0,Number(v.attempts)||0),correct:Math.max(0,Number(v.correct)||0)};});
  next.xp=Number(next.xp)||0;
  next.gems=Number(next.gems)||0;
  if(!next.stoneCurrencyMigrated){
    if(next.gems>0) next.gemInventory.Agate=Number(next.gemInventory.Agate||0)+Math.floor(next.gems);
    next.gems=0;next.stoneCurrencyMigrated=true;
  }
  next.streak=Number(next.streak)||0;
  next.developerInfiniteHearts=!!next.developerInfiniteHearts;
  next.selectedStage=Math.max(0,Math.min(stages.length-1,Number(next.selectedStage)||0));
  next.soundEnabled=next.soundEnabled!==false;
  next.voiceEnabled=next.voiceEnabled!==false;
  next.autoSpeak=next.autoSpeak!==false;
  next.voiceRate=Math.max(.55,Math.min(1.15,Number(next.voiceRate)||.85));
  const legacyVoiceStyle=String(next.voiceStyle||"");next.voiceGender=["female","male"].includes(next.voiceGender)?next.voiceGender:legacyVoiceStyle==="male"?"male":"female";
  next.voiceStyle=["natural","deep","high","soft","energetic","calm"].includes(legacyVoiceStyle)?legacyVoiceStyle:"natural";
  next.smartReview=next.smartReview!==false;
  next.sessionGoal=Math.max(5,Math.min(100,Number(next.sessionGoal)||20));
  next.sessionAnswered=Math.max(0,Number(next.sessionAnswered)||0);
  next.sessionCorrect=Math.max(0,Math.min(next.sessionAnswered,Number(next.sessionCorrect)||0));
  next.supportMode=["guided","standard","challenge"].includes(next.supportMode)?next.supportMode:"guided";
  next.n5Tier=["beginner","intermediate","advanced"].includes(next.n5Tier)?next.n5Tier:"beginner";
  next.n5Curriculum=["standard","tutor","mixed"].includes(next.n5Curriculum)?next.n5Curriculum:"mixed";
  next.tutorTrack=["all","vocabulary","verbs","particles","patterns","adjectives","conversation"].includes(next.tutorTrack)?next.tutorTrack:"all";
  next.recentQuestionIds=Array.isArray(next.recentQuestionIds)?next.recentQuestionIds.slice(-20):[];
  next.n5AcademyMastery=next.n5AcademyMastery&&typeof next.n5AcademyMastery==="object"?next.n5AcademyMastery:{};
  next.academyTestBest=Math.max(0,Number(next.academyTestBest)||0);
  next.academyReviewDate=String(next.academyReviewDate||"");
  next.onboardingComplete=Boolean(next.onboardingComplete);
  next.placementResult=next.placementResult&&typeof next.placementResult==="object"?next.placementResult:null;
  if(next.placementResult){next.placementResult.elapsedTimeMs=normalizeAssessmentTimeMs(next.placementResult.elapsedTimeMs);next.placementResult.fastestTimeMs=normalizeAssessmentTimeMs(next.placementResult.fastestTimeMs||next.placementResult.elapsedTimeMs);}
  return next;
}
function loadProfile(profile,verifiedCloudAdmin=false){
  activeProfileId=profile.id;
  isDeveloperSession=verifiedCloudAdmin===true&&!!profile.cloudUserId;
  localStorage.setItem(ACTIVE_PROFILE_KEY,profile.id);
  setAuthOverlayVisible(false);
  let raw=null;
  try{raw=JSON.parse(localStorage.getItem(profileStorageKey(profile.id)));}catch{}
  state=normalizeState(raw);
  const tutorStateRepaired=repairTutorAccessState();
  const dailyStateChanged=applyDailyDecay();
  const unlockedGemRewards=grantUnlockedGemRewards();
  document.getElementById("activePlayerName").textContent=profile.name;
  syncDeveloperControls();
  const developerName=document.getElementById("developerProfileName");
  if(developerName) developerName.textContent=profile.name;
  if(tutorStateRepaired||dailyStateChanged||unlockedGemRewards.length) save();
  if(!appStarted){appStarted=true;render();startRecoveryClock();}
  else render();
  if(unlockedGemRewards.length)setMessage(`Mine access reward: ${unlockedGemRewards.length} unlocked gemstone${unlockedGemRewards.length===1?' was':'s were'} added to this save. Use the heart upgrades in Practice Health when ready.`,"correct");
  requestAnimationFrame(()=>{if(activeProfileId)setAuthOverlayVisible(false);});
  setTimeout(()=>{syncPortraitGuard();requestMobilePortraitLock();},0);
  window.dispatchEvent(new CustomEvent("jm-profile-loaded",{detail:{id:profile.id,name:profile.name,cloudUserId:profile.cloudUserId||null,email:profile.email||null}}));
}
async function logout(){
  const activeProfile=readProfiles().find(profile=>profile.id===activeProfileId);
  save();if(activeProfile?.cloudUserId)await pushCloudSave();activeProfileId=null;isDeveloperSession=false;
  if(activeProfile?.cloudUserId)await window.languageMinerCloudAuth?.signOut?.();
  syncOwnerTutorControls();
  closeDeveloperPanel();localStorage.removeItem(ACTIVE_PROFILE_KEY);
  window.dispatchEvent(new CustomEvent("jm-profile-logged-out"));
  document.getElementById("activePlayerName").textContent="Not signed in";
  syncDeveloperControls();syncPortraitGuard();
  setAuthOverlayVisible(true);
  showAuthMode("login");renderProfileList();
}
window.japaneseMinerActiveProfile=()=>{if(!activeProfileId)return null;const profile=readProfiles().find(item=>item.id===activeProfileId);return profile?{id:profile.id,name:profile.name,cloudUserId:profile.cloudUserId||null,email:profile.email||null}:{id:activeProfileId,name:"Player",cloudUserId:null,email:null};};
window.japaneseMinerIsDeveloperSession=()=>isDeveloperSession===true;
window.languageMinerLogout=logout;
const CLOUD_COURSE_STORAGE_PREFIX="lm_multilingual_functional_preview_v1:";
let cloudSaveRevision=0,cloudSaveTimer=null,cloudSaveApplying=false;
function cloudCourseAccountKey(userId){return `cloud:${userId}`;}
function readCloudCourseSettings(userId){try{return JSON.parse(localStorage.getItem(CLOUD_COURSE_STORAGE_PREFIX+cloudCourseAccountKey(userId))||"null")||{};}catch{return {};}}
function writeCloudCourseSettings(userId,value){try{localStorage.setItem(CLOUD_COURSE_STORAGE_PREFIX+cloudCourseAccountKey(userId),JSON.stringify(value&&typeof value==="object"?value:{}));}catch{}}
function applyCloudSaveRecord(record,profile,renderNow=false){
  if(!record||!profile?.cloudUserId)return false;cloudSaveApplying=true;
  try{
    const remoteState=record.game_state&&typeof record.game_state==="object"?record.game_state:{},remoteCourses=record.course_settings&&typeof record.course_settings==="object"?record.course_settings:{};
    localStorage.setItem(profileStorageKey(profile.id),JSON.stringify(normalizeState(remoteState)));writeCloudCourseSettings(profile.cloudUserId,remoteCourses);cloudSaveRevision=Math.max(0,Number(record.revision)||0);
    if(activeProfileId===profile.id){state=normalizeState(remoteState);if(window.LanguageMinerCourseCloud?.importCurrent)window.LanguageMinerCourseCloud.importCurrent(remoteCourses);else window.dispatchEvent(new CustomEvent("lm-cloud-save-applied"));if(renderNow)render();}
    return true;
  }finally{cloudSaveApplying=false;}
}
function scheduleCloudSave(delay=900){
  if(cloudSaveApplying||!activeProfileId)return;const profile=readProfiles().find(item=>item.id===activeProfileId),session=window.languageMinerCloudAuth?.getSession?.();if(!profile?.cloudUserId||session?.user?.id!==profile.cloudUserId)return;
  clearTimeout(cloudSaveTimer);cloudSaveTimer=setTimeout(()=>{cloudSaveTimer=null;pushCloudSave();},Math.max(0,Number(delay)||0));
}
async function pushCloudSave(){
  clearTimeout(cloudSaveTimer);cloudSaveTimer=null;if(cloudSaveApplying||!activeProfileId)return null;
  const profile=readProfiles().find(item=>item.id===activeProfileId),session=window.languageMinerCloudAuth?.getSession?.(),cloud=window.languageMinerCloudAuth;if(!profile?.cloudUserId||session?.user?.id!==profile.cloudUserId||!cloud?.savePlayerState)return null;
  try{
    const result=await cloud.savePlayerState({gameState:state,courseSettings:window.LanguageMinerCourseCloud?.exportCurrent?.()||readCloudCourseSettings(profile.cloudUserId),displayName:profile.name||"Player",email:profile.email||session.user?.email||"",baseRevision:cloudSaveRevision},session);
    if(!result)return null;if(result.accepted===false){applyCloudSaveRecord(result,profile,true);setMessage("A newer cloud save or administrator reset was applied to this device.","correct");}else cloudSaveRevision=Math.max(0,Number(result.revision)||cloudSaveRevision);
    return result;
  }catch(error){console.warn("Language Miner cloud save is temporarily unavailable.",error);return null;}
}
window.addEventListener("lm-course-settings-saved",()=>scheduleCloudSave());
function save(){
  if(!activeProfileId) return;
  try{ localStorage.setItem(profileStorageKey(activeProfileId),JSON.stringify(state)); }
  catch(err){ console.error("Language Miner save failed",err); }
  scheduleCloudSave();
}
const KATAKANA_XP_REQUIREMENT=STAGE_XP_REQUIREMENTS[0];
function kanaSetMastery(set){
  if(!set.length) return 0;
  return Math.round(set.reduce((sum,[ch])=>sum+masteryScore(ch),0)/set.length);
}
function questionMasteryScore(stat){
  if(!stat || !stat.attempts || !stat.correct) return 0;
  const accuracy=Math.min(1,stat.correct/stat.attempts);
  const repetition=Math.min(1,stat.correct/3);
  return Math.round(accuracy*repetition*100);
}
function stageMastery(i){
  if(i===0) return kanaSetMastery(hira);
  if(i===1) return kanaSetMastery(kata);
  const pool=questions.filter(q=>q.stage===i&&questionAllowedForSession(q));
  if(!pool.length) return 0;
  return Math.round(pool.reduce((sum,q)=>sum+questionMasteryScore(state.questionStats?.[q.id]),0)/pool.length);
}
function tutorCurriculumMastery(){
  if(!tutorAccessGranted()) return 0;
  const pool=questions.filter(q=>q.stage===2 && q.curriculum==="tutor");
  if(!pool.length) return 0;
  return Math.round(pool.reduce((sum,q)=>sum+questionMasteryScore(state.questionStats?.[q.id]),0)/pool.length);
}
function stageXpComplete(i){
  return Number(state.stageXp?.[i]||0)>=STAGE_XP_REQUIREMENTS[i];
}
function stageMasteryComplete(i){
  return stageMastery(i)>=STAGE_MASTERY_REQUIREMENTS[i];
}
function stageComplete(i){
  return stageXpComplete(i) && stageMasteryComplete(i);
}
function hiraganaMastered(){ return stageMasteryComplete(0); }
function katakanaUnlocked(){ return stageComplete(0); }
function isStageUnlocked(i){
  if(i===0) return true;
  if(Number(state.placementUnlockedThrough||0)>=i) return true;
  return stageComplete(i-1);
}
function stageIndex(){
  let idx=0;
  stages.forEach((_,i)=>{ if(isStageUnlocked(i)) idx=i; });
  return idx;
}
function selectedStageIndex(){
  const highest=stageIndex();
  const selected=Math.max(0,Math.min(highest,Number(state.selectedStage)||0));
  if(selected!==state.selectedStage) state.selectedStage=selected;
  return selected;
}
function syncSelectedStageUI(){
  const idx=selectedStageIndex();
  const stage=stages[idx];
  const quickStage=document.getElementById("quickStage");
  const stageName=document.getElementById("stageName");
  const quickMineLabel=document.getElementById("quickMineLabel");
  const soundToggle=document.getElementById("soundToggle");
  if(quickStage) quickStage.textContent=stage.label;
  if(stageName) stageName.textContent=stage.name;
  if(quickMineLabel) quickMineLabel.textContent=state.active&&!state.answered?"Return to Question":"New Question";
  if(soundToggle) soundToggle.checked=state.soundEnabled!==false;
  const supportMode=document.getElementById("supportMode");
  if(supportMode) supportMode.value=state.supportMode||"guided";
  syncOwnerTutorControls(idx);
}

function selectStage(index,openCourse=false){
  index=Math.max(0,Math.min(stages.length-1,Number(index)||0));
  if(!isStageUnlocked(index)){
    setMessage(`${stages[index].label} is still locked.`,"wrong");
    return;
  }
  state.selectedStage=index;
  state.active=null;
  state.answered=false;
  state.shieldArmed=false;
  document.getElementById("challengeArea").innerHTML='<div class="empty">Tap the rock to begin this learning stage.</div>';
  setMessage(`${stages[index].name} selected. New challenges will come only from ${stages[index].label}.`,"correct");
  syncSelectedStageUI();
  render();
  if(index===2 && openCourse) openAcademy();
}
function xpNeed(){ return 80 + state.level*20; }

function totalStoneValue(){
  return gemTiers.reduce((sum,g)=>sum+Number(state.gemInventory[g.name]||0)*g.value,0);
}
function addStoneChange(value,maxIndex){
  let remaining=Math.max(0,Math.floor(value));
  for(let i=Math.min(maxIndex,gemTiers.length-1);i>=0;i--){
    const g=gemTiers[i];
    const count=Math.floor(remaining/g.value);
    if(count>0){
      state.gemInventory[g.name]=Number(state.gemInventory[g.name]||0)+count;
      remaining-=count*g.value;
    }
  }
}
function spendStoneValue(cost){
  cost=Math.max(0,Math.floor(cost));
  if(totalStoneValue()<cost) return false;
  let remaining=cost;
  // Spend low denominations first.
  for(let i=0;i<gemTiers.length && remaining>0;i++){
    const g=gemTiers[i];
    const owned=Number(state.gemInventory[g.name]||0);
    const use=Math.min(owned,Math.floor(remaining/g.value));
    if(use>0){
      state.gemInventory[g.name]=owned-use;
      remaining-=use*g.value;
    }
  }
  // Break one larger stone when exact payment is not possible and return change.
  if(remaining>0){
    const idx=gemTiers.findIndex(g=>g.value>=remaining && Number(state.gemInventory[g.name]||0)>0);
    if(idx<0) return false;
    const g=gemTiers[idx];
    state.gemInventory[g.name]=Number(state.gemInventory[g.name]||0)-1;
    addStoneChange(g.value-remaining,idx-1);
    remaining=0;
  }
  return true;
}
const PICKAXE_SKINS = [
  {id:"standard", name:"Standard Pickaxe", icon:"⛏️", cost:0, desc:"The dependable starter tool."},
  {id:"copper", name:"Copper Pickaxe", icon:"⛏️", cost:300000, desc:"A warm copper finish for early miners."},
  {id:"sakura", name:"Sakura Pickaxe", icon:"⛏️", cost:750000, desc:"A soft pink pickaxe inspired by cherry blossoms."},
  {id:"silver", name:"Silver Pickaxe", icon:"⛏️", cost:1800000, desc:"A polished silver tool with a cool shine."},
  {id:"frost", name:"Frost Pickaxe", icon:"⛏️", cost:4000000, desc:"An icy blue tool sparkling with frozen light."},
  {id:"gold", name:"Golden Pickaxe", icon:"⛏️", cost:8000000, desc:"A prestigious golden mining skin."},
  {id:"neon", name:"Neon Pickaxe", icon:"⛏️", cost:16000000, desc:"An electric cyan tool from the city mines."},
  {id:"amethyst", name:"Amethyst Pickaxe", icon:"⛏️", cost:32000000, desc:"A purple crystal-infused pickaxe."},
  {id:"inferno", name:"Inferno Pickaxe", icon:"⛏️", cost:65000000, desc:"A blazing tool forged in the flame mine."},
  {id:"galaxy", name:"Galaxy Pickaxe", icon:"⛏️", cost:120000000, desc:"A deep-space finish surrounded by starlight."},
  {id:"emerald", name:"Emerald Pickaxe", icon:"⛏️", cost:220000000, desc:"A vivid green endgame-style tool."},
  {id:"aurora", name:"Aurora Pickaxe", icon:"⛏️", cost:400000000, desc:"Shifting northern-light colors for master miners."},
  {id:"shadow", name:"Shadow Pickaxe", icon:"⛏️", cost:750000000, desc:"A mysterious dark-metal pickaxe with a violet glow."},
  {id:"red-diamond", name:"Red Diamond Pickaxe", icon:"⛏️", cost:1500000000, desc:"The rarest and most luxurious current skin."}
];

const ROCK_SKINS=[
  {id:"slate",name:"Classic Slate",cost:0,desc:"The dependable original mine rock."},
  {id:"gold-ore",name:"Gold Ore",cost:250000,desc:"Dark stone threaded with bright golden ore."},
  {id:"amethyst-geode",name:"Amethyst Geode",cost:750000,desc:"A violet geode glowing from its crystal center."},
  {id:"sakura-quartz",name:"Sakura Quartz",cost:1500000,desc:"Rose quartz with soft cherry-blossom highlights."},
  {id:"frost-crystal",name:"Frost Crystal",cost:4000000,desc:"An icy mineral coated in frozen blue light."},
  {id:"emerald-core",name:"Emerald Core",cost:10000000,desc:"Deep green stone surrounding a luminous core."},
  {id:"magma-rock",name:"Magma Rock",cost:25000000,desc:"Volcanic stone split by flowing orange magma."},
  {id:"galaxy-meteor",name:"Galaxy Meteorite",cost:75000000,desc:"A star-speckled meteorite from the deepest mine."},
  {id:"gem-agate",name:"Agate Strata",cost:350000,desc:"Scientific Gem Collection · Warm, naturally banded Agate layers."},
  {id:"gem-amethyst",name:"Amethyst Cluster",cost:900000,desc:"Scientific Gem Collection · A faceted violet Amethyst crystal cluster."},
  {id:"gem-aquamarine",name:"Aquamarine Crystal",cost:1750000,desc:"Scientific Gem Collection · Clear ocean-blue Aquamarine facets."},
  {id:"gem-citrine",name:"Citrine Facet",cost:3000000,desc:"Scientific Gem Collection · A brilliant golden-yellow Citrine cut."},
  {id:"gem-emerald",name:"Emerald Matrix",cost:6000000,desc:"Scientific Gem Collection · A deep green Emerald with geometric facets."},
  {id:"gem-garnet",name:"Garnet Boulder",cost:10000000,desc:"Scientific Gem Collection · A rich crimson Garnet with fiery depth."},
  {id:"gem-opal",name:"Opal Moonstone",cost:18000000,desc:"Scientific Gem Collection · Milky Opal filled with shifting rainbow fire."},
  {id:"gem-peridot",name:"Peridot Shard",cost:30000000,desc:"Scientific Gem Collection · A bright olive-green Peridot crystal."},
  {id:"gem-ruby",name:"Ruby Heartstone",cost:50000000,desc:"Scientific Gem Collection · A vivid red Ruby with a glowing inner heart."},
  {id:"gem-sapphire",name:"Sapphire Shieldstone",cost:80000000,desc:"Scientific Gem Collection · A royal-blue Sapphire with shield-like facets."},
  {id:"gem-topaz",name:"Topaz Prism",cost:125000000,desc:"Scientific Gem Collection · A fiery orange Topaz prism."},
  {id:"gem-alexandrite",name:"Alexandrite Orb",cost:200000000,desc:"Scientific Gem Collection · Color-shifting Alexandrite in violet and teal."},
  {id:"gem-paraiba",name:"Paraíba Tourmaline",cost:350000000,desc:"Scientific Gem Collection · Electric turquoise Paraíba Tourmaline crystals."},
  {id:"gem-jadeite",name:"Jadeite Carving",cost:600000000,desc:"Scientific Gem Collection · Smooth imperial-green Jadeite with carved swirls."},
  {id:"gem-red-diamond",name:"Red Diamond Core",cost:1000000000,desc:"Scientific Gem Collection · The rarest scarlet diamond in the mine."}
];

const MINE_WALLPAPERS=[
  {id:"classic",name:"Original Slate Mine",cost:0,desc:"The familiar blue-slate mine with its original arch, tunnel, lantern, and crystals.",preview:"radial-gradient(ellipse at 50% 48%,#264f5f 0 10%,#172f42 42%,#080d19 76%)"},
  {id:"sakura-grotto",name:"Amethyst Purple Mine",cost:500000,desc:"The same familiar mine recolored in deep Amethyst purple.",preview:"radial-gradient(ellipse at 50% 48%,#6d4a87 0 10%,#3d295d 42%,#110c20 76%)"},
  {id:"crystal-cathedral",name:"Sapphire Blue Mine",cost:2000000,desc:"The same familiar mine recolored in royal Sapphire blue.",preview:"radial-gradient(ellipse at 50% 48%,#365d9b 0 10%,#1b3768 42%,#080f25 76%)"},
  {id:"bamboo-tunnel",name:"Emerald Green Mine",cost:5000000,desc:"The same familiar mine recolored in rich Emerald green.",preview:"radial-gradient(ellipse at 50% 48%,#356f58 0 10%,#1d4938 42%,#081a13 76%)"},
  {id:"sunken-mine",name:"Arctic Cyan Mine",cost:12000000,desc:"The same familiar mine recolored in bright Arctic cyan.",preview:"radial-gradient(ellipse at 50% 48%,#3b8493 0 10%,#20566b 42%,#071a28 76%)"},
  {id:"magma-forge",name:"Ruby Red Mine",cost:30000000,desc:"The same familiar mine recolored in glowing Ruby red.",preview:"radial-gradient(ellipse at 50% 48%,#8d3f50 0 10%,#5b2432 42%,#210810 76%)"},
  {id:"aurora-cavern",name:"Golden Amber Mine",cost:75000000,desc:"The same familiar mine recolored in warm golden Amber.",preview:"radial-gradient(ellipse at 50% 48%,#8a703b 0 10%,#59451f 42%,#1f1507 76%)"},
  {id:"galaxy-depths",name:"Rose Quartz Mine",cost:200000000,desc:"The same familiar mine recolored in soft Rose Quartz pink.",preview:"radial-gradient(ellipse at 50% 48%,#9b617b 0 10%,#643a55 42%,#210b19 76%)"}
];

const SHOP_PRICE_BY_STAGE = [
  {hint:2500, shield:10000, heart:50000},
  {hint:12500, shield:50000, heart:250000},
  {hint:62500, shield:250000, heart:1250000},
  {hint:312500, shield:1250000, heart:6250000},
  {hint:1562500, shield:6250000, heart:31250000},
  {hint:7812500, shield:31250000, heart:156250000},
  {hint:39062500, shield:156250000, heart:781250000}
];
function currentShopPrices(){
  return SHOP_PRICE_BY_STAGE[Math.min(stageIndex(),SHOP_PRICE_BY_STAGE.length-1)];
}
function heartRestoreCost(){ return currentShopPrices().heart; }
const HEART_RECOVERY_MS=30*60*1000;
let heartRecoveryInterval=null;
function ensureHeartRecovery(){
  const now=Date.now();
  if(state.heartRecoveryEnd && now>=state.heartRecoveryEnd){
    state.hearts=Math.min(state.maxHearts,Math.max(0,Number(state.hearts)||0)+3);
    state.heartRecoveryEnd=null;
    save();
    setMessage("Recovery complete! You gained 3 hearts.","correct");
  }
  if(state.hearts<=0 && !state.heartRecoveryEnd){
    state.heartRecoveryEnd=now+HEART_RECOVERY_MS;
    save();
  }
  if(state.hearts>0){
    if(state.heartRecoveryEnd){ state.heartRecoveryEnd=null; save(); }
  }
}
function renderRecovery(){
  ensureHeartRecovery();
  const box=document.getElementById("recoveryBox");
  const time=document.getElementById("recoveryTime");
  const active=state.hearts<=0 && state.heartRecoveryEnd;
  const hud=document.getElementById('heartRecoveryHud'),hudTime=document.getElementById('heartRecoveryHudTime');
  if(hud)hud.classList.toggle('active',!!active);
  if(active){
    const remaining=Math.max(0,state.heartRecoveryEnd-Date.now());
    const total=Math.ceil(remaining/1000);
    const min=String(Math.floor(total/60)).padStart(2,"0");
    const sec=String(total%60).padStart(2,"0");
    if(time)time.textContent=`${min}:${sec}`;
    if(hudTime)hudTime.textContent=`${min}:${sec}`;
  }
  if(!box||!time) return;
  box.classList.toggle("active",!!active);
}
function startRecoveryClock(){
  if(heartRecoveryInterval) clearInterval(heartRecoveryInterval);
  heartRecoveryInterval=setInterval(()=>{
    const before=state.hearts;
    renderRecovery();
    if(state.hearts!==before) render();
  },1000);
}

function render(){
  ensureHeartRecovery();
  // Each display group is rendered independently so one visual error cannot
  // prevent XP, kana mastery, or the gem collection from refreshing.
  try{
    document.getElementById("stoneWealth").textContent=totalStoneValue().toLocaleString();
    document.getElementById("hearts").textContent=state.hearts;
    document.getElementById("maxHeartsTop").textContent=state.maxHearts;
    document.getElementById("practiceStreak").textContent=state.practiceStreak;
    document.getElementById("healthText").textContent=`${state.hearts}/${state.maxHearts}`;
    document.getElementById("healthFill").style.width=(state.hearts/state.maxHearts*100)+"%";
    const nextHeartStone=maxHeartCost();
    document.getElementById("maxHeartCost").textContent=nextHeartStone?`1 ${nextHeartStone}`:"MAX";
    const maxHeartBtn=document.getElementById("maxHeartBtn");
    if(maxHeartBtn){
      maxHeartBtn.disabled=!nextHeartStone;
      maxHeartBtn.title=nextHeartStone?`Consumes 1 ${nextHeartStone} from your collection`:"Maximum health reached";
    }
    document.getElementById("level").textContent=state.level;
    document.getElementById("streak").textContent=state.streak;
    document.getElementById("hints").textContent=state.hints;
    document.getElementById("invHints").textContent=state.hints;
    document.getElementById("invShields").textContent=state.shields;
    document.getElementById("bestStreak").textContent=state.bestStreak;
    const activeMine=selectedStageIndex();
    const shownXp=Number(state.stageXp[activeMine]||0);
    const shownNeed=STAGE_XP_REQUIREMENTS[activeMine];
    document.getElementById("xp").textContent=Math.min(shownXp,shownNeed).toLocaleString();
    document.getElementById("xpNeed").textContent=shownNeed.toLocaleString();
    document.getElementById("xpBar").style.width=Math.min(100,shownXp/shownNeed*100)+"%";
    document.body.dataset.mine=String(activeMine);
    syncSelectedStageUI();
    document.getElementById("hintBtn").disabled=!state.active || state.answered || state.hints<1;
    document.getElementById("shieldBtn").disabled=!state.active || state.answered || state.shields<1 || state.shieldArmed;
    document.getElementById("nextBtn").disabled=!state.answered;
    document.getElementById("shieldBtn").textContent=state.shieldArmed ? "🛡️ Shield Armed" : `🛡️ Use Shield (${state.shields})`;
    const shopPrices=currentShopPrices();
    document.getElementById("hintShopPrice").textContent=`${shopPrices.hint.toLocaleString()} Nuggets`;
    document.getElementById("shieldShopPrice").textContent=`${shopPrices.shield.toLocaleString()} Nuggets`;
    document.getElementById("heartShopPrice").textContent=`${shopPrices.heart.toLocaleString()} Nuggets`;
    updateSessionDashboard();
    const vt=document.getElementById('voiceToggle'),at=document.getElementById('autoSpeakToggle'),sr=document.getElementById('smartReviewToggle'),vr=document.getElementById('voiceRate');
    if(vt)vt.checked=state.voiceEnabled;if(at)at.checked=state.autoSpeak;if(sr)sr.checked=state.smartReview;if(vr)vr.value=state.voiceRate;
    const vrl=document.getElementById('voiceRateLabel');if(vrl)vrl.textContent=`${Number(state.voiceRate).toFixed(2)}×`;
    document.querySelectorAll('[data-voice-gender]').forEach(button=>{const selected=button.dataset.voiceGender===state.voiceGender;button.classList.toggle('selected',selected);button.setAttribute('aria-pressed',String(selected));});
    document.querySelectorAll('[data-voice-style]').forEach(button=>{const selected=button.dataset.voiceStyle===state.voiceStyle;button.classList.toggle('selected',selected);button.setAttribute('aria-pressed',String(selected));});syncVoiceTuningLabel();
    syncPlacementTestButton();
  }catch(err){ console.error("Core display refresh failed",err); }
  try{ renderPath(); }catch(err){ console.error("Path refresh failed",err); }
  try{ renderKanaChart(); }catch(err){ console.error("Kana chart refresh failed",err); }
  try{ renderGemCollection(); }catch(err){ console.error("Gem collection refresh failed",err); }
  try{ renderPickaxeShop(); }catch(err){ console.error("Pickaxe workshop refresh failed",err); }
  try{ applyMineCosmetics(); }catch(err){ console.error("Mine cosmetics refresh failed",err); }
  try{ renderRecovery(); }catch(err){ console.error("Heart recovery refresh failed",err); }
  save();
}

function renderPath(){
  const p=document.getElementById("path"); p.innerHTML="";
  const current=selectedStageIndex();
  stages.forEach((s,i)=>{
    const unlocked=isStageUnlocked(i);
    const complete=stageComplete(i);
    const progress=Math.min(Number(state.stageXp[i]||0),STAGE_XP_REQUIREMENTS[i]);
    const mastery=stageMastery(i);
    const masteryNeed=STAGE_MASTERY_REQUIREMENTS[i];
    const d=document.createElement("div");
    d.className="stage "+(i===current?"active ":"")+(!unlocked?"locked ":"")+(complete?"complete":"");
    if(unlocked){
      d.setAttribute("role","button"); d.tabIndex=0; d.setAttribute("aria-label",`Select ${s.name}`);
      d.addEventListener("click",()=>selectStage(i,i===2));
      d.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();selectStage(i,i===2);}});
    }
    let badge,detail;
    if(!unlocked){
      const previous=i-1;
      const xpRemaining=Math.max(0,STAGE_XP_REQUIREMENTS[previous]-Number(state.stageXp[previous]||0));
      const masteryRemaining=Math.max(0,STAGE_MASTERY_REQUIREMENTS[previous]-stageMastery(previous));
      badge="Locked";
      detail=`Finish ${stages[previous].label}: ${xpRemaining.toLocaleString()} XP and ${masteryRemaining}% mastery remaining`;
    }else if(complete){
      badge=i===current?"Current • Cleared":"Cleared";
      detail=`${STAGE_XP_REQUIREMENTS[i].toLocaleString()} XP • ${mastery}% mastery`;
    }else{
      badge=i===current?"Current":`${Math.floor(progress/STAGE_XP_REQUIREMENTS[i]*100)}% XP`;
      detail=`${progress.toLocaleString()}/${STAGE_XP_REQUIREMENTS[i].toLocaleString()} XP • ${mastery}/${masteryNeed}% mastery`;
    }
    d.innerHTML=`<div><strong>${s.label}</strong><div class="small">${detail}</div></div><span class="badge">${badge}</span>`;
    p.appendChild(d);
  });
}


function makeKanaOpts(set, correct){
  const pool=[...new Set(set.map(x=>x[1]).filter(x=>x!==correct))];
  shuffle(pool);
  return shuffle([correct,...pool.slice(0,3)]);
}
function dateKey(d=new Date()){ return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`; }
function dayDifference(a,b){
  const x=new Date(a+"T12:00:00"), y=new Date(b+"T12:00:00");
  return Math.round((y-x)/86400000);
}
function validStudyDateKey(value){
  const match=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value||""));
  if(!match)return false;
  const parsed=new Date(Number(match[1]),Number(match[2])-1,Number(match[3]),12);
  return dateKey(parsed)===match[0];
}
function studyDateKeys(source=state){
  const dates=[];
  if(Array.isArray(source?.studyDates))dates.push(...source.studyDates);
  if(Array.isArray(source?.practiceDates))dates.push(...source.practiceDates);
  if(source?.lastPracticeDate)dates.push(source.lastPracticeDate);
  return [...new Set(dates.map(String).filter(validStudyDateKey))].sort();
}
function calculatePracticeStreak(source=state,today=dateKey()){
  const dates=studyDateKeys(source).filter(key=>dayDifference(key,today)>=0);
  if(!dates.length)return 0;
  const latest=dates[dates.length-1];
  if(dayDifference(latest,today)>1)return 0;
  let streak=1;
  for(let index=dates.length-1;index>0;index--){
    if(dayDifference(dates[index-1],dates[index])!==1)break;
    streak++;
  }
  return streak;
}
function applyDailyDecay(){
  const previous=Number(state.practiceStreak)||0;
  state.practiceStreak=calculatePracticeStreak(state);
  if(state.developerInfiniteHearts){
    const changed=state.hearts!==state.maxHearts;
    state.hearts=state.maxHearts;
    return changed||state.practiceStreak!==previous;
  }
  // Streaks are derived from the calendar, so old counters repair themselves
  // after imports, cloud syncs, missed days, and previous app versions.
  return state.practiceStreak!==previous;
}
function markPracticeToday(){
  const today=dateKey();
  if(!Array.isArray(state.studyDates))state.studyDates=[];
  if(!state.studyDates.includes(today))state.studyDates.push(today);
  state.lastPracticeDate=today;
  state.practiceStreak=calculatePracticeStreak(state,today);
}
const HEART_UPGRADE_STONES=["Agate","Amethyst","Aquamarine","Citrine","Emerald","Garnet","Opal","Peridot","Ruby","Sapphire","Topaz"];
function maxHeartCost(){
  if(state.maxHearts>=14) return null;
  return HEART_UPGRADE_STONES[state.maxHearts-3];
}
function buyMaxHeart(){
  if(state.maxHearts>=14){ setMessage("Maximum health is already 14 hearts.",""); return; }
  const stone=maxHeartCost();
  const owned=Number(state.gemInventory[stone]||0);
  if(owned<1){ setMessage(`You need 1 ${stone} from the Scientific Gem Collection to unlock heart ${state.maxHearts+1}.`,"wrong"); return; }
  state.gemInventory[stone]=owned-1;
  state.maxHearts++;
  state.hearts++;
  save();
  setMessage(`${stone} consumed. Maximum health increased to ${state.maxHearts}.`,"correct");
  render();
}
function gemCheckpointKey(stage,checkpoint){return `${Number(stage)}:${Number(checkpoint)}`;}
function gemCheckpointThreshold(stage,checkpoint){const requirement=Number(STAGE_XP_REQUIREMENTS[Number(stage)]||0),point=Math.max(1,Math.min(4,Number(checkpoint)||1));return Math.ceil(requirement*point/5);}
function gemCheckpointDrop(gemName){return GEM_CHECKPOINT_DROPS.find(drop=>drop.gem===gemName)||null;}
function gemCheckpointClaimed(drop){return !!drop&&!!state.gemCheckpointClaims?.[gemCheckpointKey(drop.stage,drop.checkpoint)];}
function gemArtMarkup(gemName,extraClass=""){const index=gemTiers.findIndex(gem=>gem.name===gemName),col=Math.max(0,index%5),row=Math.max(0,Math.floor(index/5));return `<span class="scientific-gem-art ${extraClass}" style="background-position:${col*25}% ${row*50}%" role="img" aria-label="${gemName} gemstone"></span>`;}
function grantUnlockedGemRewards(){
  state.gemInventory=state.gemInventory&&typeof state.gemInventory==="object"?state.gemInventory:{};
  state.gemUnlockRewards=state.gemUnlockRewards&&typeof state.gemUnlockRewards==="object"&&!Array.isArray(state.gemUnlockRewards)?state.gemUnlockRewards:{};
  const awarded=[];
  gemTiers.forEach(gem=>{
    if(!isStageUnlocked(gem.minStage)||state.gemUnlockRewards[gem.name])return;
    state.gemInventory[gem.name]=Number(state.gemInventory[gem.name]||0)+1;
    state.gemUnlockRewards[gem.name]=Date.now();
    awarded.push(gem);
  });
  if(awarded.length){const gem=awarded.at(-1),drop=gemCheckpointDrop(gem.name);state.lastGem={name:gem.name,icon:gem.icon,stage:gem.minStage,checkpoint:drop?.checkpoint||0,source:"mine-unlock"};}
  return awarded;
}
function claimReachedGemCheckpoints(stage,previousXp=0,currentXp=Number(state.stageXp?.[stage]||0)){state.gemCheckpointClaims=state.gemCheckpointClaims&&typeof state.gemCheckpointClaims==="object"?state.gemCheckpointClaims:{};const awarded=[];GEM_CHECKPOINT_DROPS.filter(drop=>drop.stage===Number(stage)).forEach(drop=>{const threshold=gemCheckpointThreshold(drop.stage,drop.checkpoint),key=gemCheckpointKey(drop.stage,drop.checkpoint);if(currentXp<threshold||state.gemCheckpointClaims[key])return;const gem=gemTiers.find(item=>item.name===drop.gem);if(!gem)return;state.gemCheckpointClaims[key]=Date.now();state.gemInventory[gem.name]=Number(state.gemInventory[gem.name]||0)+1;state.lastGem={name:gem.name,icon:gem.icon,stage:drop.stage,checkpoint:drop.checkpoint,source:"checkpoint"};awarded.push({...drop,threshold,gem,previousXp,currentXp});});return awarded;}
function kanaFromQuestion(q){
  if(!q) return null;
  if(q.kana) return q.kana;
  if(hira.some(([ch])=>ch===q.q) || kata.some(([ch])=>ch===q.q)) return q.q;
  if(hira.some(([ch])=>ch===q.a) || kata.some(([ch])=>ch===q.a)) return q.a;
  return null;
}
function recordKana(correct){
  const ch=kanaFromQuestion(state.active);
  if(!ch) return null;
  const previous=state.kanaStats[ch] || {attempts:0,correct:0};
  const stat={attempts:Number(previous.attempts||0)+1,correct:Number(previous.correct||0)+(correct?1:0)};
  state.kanaStats[ch]=stat;
  state.lastKana={char:ch,correct,score:masteryScoreFromStat(stat),attempts:stat.attempts,correctCount:stat.correct};
  return state.lastKana;
}
function masteryScoreFromStat(stat){
  if(!stat || !stat.attempts || !stat.correct) return 0;
  const accuracy=stat.correct/stat.attempts;
  const correctProgress=Math.min(1,stat.correct/25);
  return Math.round(correctProgress*accuracy*100);
}
function masteryScore(ch){
  const stat=state.kanaStats[ch]||{attempts:0,correct:0};
  return masteryScoreFromStat(stat);
}
function setKanaTab(tab){
  if(tab==="katakana" && !katakanaUnlocked()){
    state.kanaTab="hiragana";
    setMessage(`Katakana unlocks after ${KATAKANA_XP_REQUIREMENT.toLocaleString()} Hiragana XP and ${STAGE_MASTERY_REQUIREMENTS[0]}% Hiragana mastery. Current: ${state.hiraganaXp.toLocaleString()} XP and ${stageMastery(0)}% mastery.`,"");
    render();
    return;
  }
  state.kanaTab=tab; render();
}
function renderKanaChart(){
  const set=state.kanaTab==="hiragana"?hira:kata;
  document.getElementById("hiraTab").className=state.kanaTab==="hiragana"?"primary":"";
  const kataButton=document.getElementById("kataTab");
  kataButton.className=state.kanaTab==="katakana"?"primary":"";
  kataButton.disabled=!katakanaUnlocked();
  kataButton.textContent=katakanaUnlocked()?"Katakana":"Katakana 🔒";
  const grid=document.getElementById("kanaGrid"); grid.innerHTML="";
  let attempts=0, correct=0, scoreTotal=0;
  set.forEach(([ch,rom])=>{
    const ks=state.kanaStats[ch]||{attempts:0,correct:0};
    const score=masteryScore(ch);
    attempts+=ks.attempts; correct+=ks.correct; scoreTotal+=score;
    const d=document.createElement("div"); d.className="kana-cell"+(state.lastKana&&state.lastKana.char===ch?" recent":"");
    d.title=`${ks.correct}/${ks.attempts} correct • ${score}% mastery`;
    d.innerHTML=`<div class="kana-char">${ch}</div><div class="small">${rom}</div><div class="mastery-bar"><div class="mastery-fill" style="width:${score}%"></div></div><div class="small"><strong>${score}%</strong></div><div class="kana-detail">${ks.correct}/${ks.attempts} correct</div>`;
    grid.appendChild(d);
  });
  document.getElementById("kanaAttempts").textContent=attempts;
  document.getElementById("kanaCorrect").textContent=correct;
  document.getElementById("kanaAverage").textContent=Math.round(scoreTotal/set.length);
  const latest=document.getElementById("latestKanaProgress");
  if(state.lastKana && set.some(([ch])=>ch===state.lastKana.char)){
    latest.style.display="block";
    latest.innerHTML=`Latest: <strong>${state.lastKana.char}</strong> — ${state.lastKana.correct?"correct":"incorrect"}. Mastery is now <strong>${masteryScore(state.lastKana.char)}%</strong> (${state.lastKana.correctCount}/${state.lastKana.attempts} correct).`;
  }else latest.style.display="none";
}
function renderGemCollection(){
  const box=document.getElementById("gemCollection"); box.innerHTML="";
  let total=0, unique=0;
  gemTiers.forEach((g,i)=>{
    const count=state.gemInventory[g.name]||0; total+=count; if(count>0) unique++;
    const d=document.createElement("div"); d.className="gem-row"+(state.lastGem&&state.lastGem.name===g.name?" recent":"");
    const unlocked=isStageUnlocked(g.minStage);
    const source=g.minStage===0?"Hiragana":g.minStage===1?"Katakana":g.minStage===2?"JLPT N5":stages[g.minStage]?.label||"Advanced";
    const drop=gemCheckpointDrop(g.name),claimed=gemCheckpointClaimed(drop),starterGranted=!!state.gemUnlockRewards?.[g.name],threshold=drop?gemCheckpointThreshold(drop.stage,drop.checkpoint):0,currentXp=Number(state.stageXp?.[drop?.stage]||0),progress=threshold?Math.min(100,Math.round(currentXp/threshold*100)):0;
    d.classList.toggle("locked",!unlocked);
    d.innerHTML=`<div class="gem-identity">${gemArtMarkup(g.name)}<div><strong>${g.name}</strong><div class="small">${g.desc}</div>${starterGranted?'<div class="gem-checkpoint-status claimed">✓ Mine-access starter specimen rewarded</div>':''}<div class="gem-checkpoint-status ${claimed?'claimed':''}">${claimed?'✓ Checkpoint drop claimed':unlocked?`Checkpoint ${drop.checkpoint} · ${drop.checkpoint*20}% ${source} progress`:`🔒 Unlocks in ${source}`}</div>${unlocked&&!claimed?`<div class="gem-checkpoint-progress"><i style="width:${progress}%"></i></div>`:''}</div></div><div class="gem-row-value"><strong>x${count}</strong><div class="gem-value">${g.value.toLocaleString()} Nuggets each</div><div class="small">${source} checkpoint ${drop.checkpoint}</div></div>`;
    box.appendChild(d);
  });
  document.getElementById("totalGemstones").textContent=total;
  document.getElementById("collectionWealth").textContent=totalStoneValue().toLocaleString();
  document.getElementById("uniqueGemstones").textContent=unique;
  document.getElementById("gemSpeciesTotal").textContent=gemTiers.length;
  const latest=document.getElementById("latestGemProgress");
  if(state.lastGem){const latestDrop=gemCheckpointDrop(state.lastGem.name),starter=state.lastGem.source==="mine-unlock";latest.style.display="flex";latest.innerHTML=`${gemArtMarkup(state.lastGem.name,'latest-gem-art')}<span>${starter?'Latest mine-access reward':'Latest checkpoint drop'}: <strong>${state.lastGem.name}</strong> from ${stages[latestDrop?.stage]?.label||'the mine'}${starter?'':` checkpoint ${latestDrop?.checkpoint||state.lastGem.checkpoint||'—'}`}. Collection count: <strong>x${state.gemInventory[state.lastGem.name]||0}</strong>.</span>`; }
  else latest.style.display="none";
}

function activePickaxeSkin(){
  if((window.japaneseMinerSupporterTier?.()||0)<1) return PICKAXE_SKINS[0];
  return PICKAXE_SKINS.find(x=>x.id===state.equippedPickaxeSkin) || PICKAXE_SKINS[0];
}
function renderPickaxeShop(){
  const rock=document.getElementById("rock");
  const icon=document.getElementById("pickaxeIcon");
  const current=activePickaxeSkin();
  if(rock){
    rock.dataset.pickaxe=current.id;
    rock.title=`Mine with ${current.name}`;
  }
  if(icon) icon.textContent=current.icon;

  const shop=document.getElementById("pickaxeShop");
  if(!shop) return;
  shop.innerHTML="";
  PICKAXE_SKINS.forEach(skin=>{
    const owned=state.ownedPickaxeSkins.includes(skin.id);
    const equipped=state.equippedPickaxeSkin===skin.id;
    const card=document.createElement("div");
    card.className="pickaxe-card"+(equipped?" equipped":"");
    const buttonText=equipped?"Equipped":owned?"Equip":`Buy — ${skin.cost.toLocaleString()} Nuggets`;
    card.innerHTML=`<div class="pickaxe-preview"><span class="pickaxe-icon" style="${skin.id==='standard'?'':pickaxePreviewStyle(skin.id)}">${skin.icon}</span></div><div><strong>${skin.name}</strong><div class="small">${skin.desc}</div></div><button type="button" ${equipped?'disabled':''}>${buttonText}</button>`;
    const btn=card.querySelector("button");
    btn.addEventListener("click",()=>requestPickaxePurchase(skin,btn));
    shop.appendChild(card);
  });
}
function pickaxePreviewStyle(id){
  const styles={
    copper:"filter:sepia(1) saturate(2.2) hue-rotate(335deg) brightness(1.05)",
    sakura:"filter:sepia(.4) saturate(3) hue-rotate(285deg) brightness(1.25) drop-shadow(0 0 7px #ff9dcc)",
    silver:"filter:grayscale(1) brightness(1.65) drop-shadow(0 0 5px #dce8ff)",
    frost:"filter:hue-rotate(155deg) saturate(2.4) brightness(1.35) drop-shadow(0 0 9px #8de9ff)",
    gold:"filter:sepia(1) saturate(4) brightness(1.25) drop-shadow(0 0 7px #ffd166)",
    neon:"filter:hue-rotate(135deg) saturate(4) brightness(1.2) drop-shadow(0 0 10px #36fff2)",
    amethyst:"filter:hue-rotate(225deg) saturate(2.2) drop-shadow(0 0 8px #b989ff)",
    inferno:"filter:sepia(1) saturate(6) hue-rotate(330deg) brightness(1.15) drop-shadow(0 0 11px #ff542f)",
    galaxy:"filter:hue-rotate(205deg) saturate(3.5) brightness(.9) drop-shadow(0 0 12px #745cff)",
    emerald:"filter:hue-rotate(80deg) saturate(2.3) drop-shadow(0 0 8px #56d69b)",
    aurora:"filter:hue-rotate(115deg) saturate(3) brightness(1.25) drop-shadow(0 0 12px #70ffbf)",
    shadow:"filter:grayscale(.7) hue-rotate(235deg) saturate(3) brightness(.55) drop-shadow(0 0 11px #9b68ff)",
    "red-diamond":"filter:hue-rotate(315deg) saturate(3) brightness(1.25) drop-shadow(0 0 10px #ff496c)"
  };
  return styles[id]||"";
}
function buyPickaxe(id){
  const skin=PICKAXE_SKINS.find(x=>x.id===id);
  if(!skin || state.ownedPickaxeSkins.includes(id)) return false;
  if(!spendStoneValue(skin.cost)){
    setMessage(`You need ${skin.cost.toLocaleString()} Nuggets for the ${skin.name}. Current wealth: ${totalStoneValue().toLocaleString()} Nuggets.`,"wrong");
    return false;
  }
  state.ownedPickaxeSkins.push(id);
  state.equippedPickaxeSkin=id;
  save();
  setMessage(`${skin.name} purchased and equipped for ${skin.cost.toLocaleString()} Nuggets!`,"correct");
  render();
  return true;
}
function equipPickaxe(id){
  if(!state.ownedPickaxeSkins.includes(id)) return false;
  state.equippedPickaxeSkin=id;
  const skin=activePickaxeSkin();
  save();
  setMessage(`${skin.name} equipped.`,"correct");
  render();
  return true;
}
function requestPickaxePurchase(skin,source){
  if(!skin) return false;
  if(state.ownedPickaxeSkins.includes(skin.id)) return equipPickaxe(skin.id);
  if(typeof window.previewJapaneseMinerPickaxe==="function"){
    window.previewJapaneseMinerPickaxe(skin.id,source);
    return true;
  }
  return buyPickaxe(skin.id);
}

function activeRockSkin(){return ROCK_SKINS.find(item=>item.id===state.equippedRockSkin)||ROCK_SKINS[0];}
function activeMineWallpaper(){return MINE_WALLPAPERS.find(item=>item.id===state.equippedMineWallpaper)||MINE_WALLPAPERS[0];}
function applyMineCosmetics(){
  const supporter=(window.japaneseMinerSupporterTier?.()||0)>=1,rock=document.getElementById('rock'),mine=document.querySelector('.mine'),rockSkin=supporter?activeRockSkin():ROCK_SKINS[0],wallpaper=supporter?activeMineWallpaper():MINE_WALLPAPERS[0],pickaxe=activePickaxeSkin();
  if(rock){rock.dataset.rockSkin=rockSkin.id;rock.title=`Mine ${rockSkin.name} with ${pickaxe.name}`;}
  if(mine)mine.dataset.mineWallpaper=wallpaper.id;
}
function buyOrEquipMineCosmetic(type,item){
  if(!item)return false;
  if((window.japaneseMinerSupporterTier?.()||0)<1){setMessage('Mine Cosmetics requires Patreon Tier 1.','wrong');return false;}
  const rock=type==='rock',ownedKey=rock?'ownedRockSkins':'ownedMineWallpapers',equippedKey=rock?'equippedRockSkin':'equippedMineWallpaper',collection=Array.isArray(state[ownedKey])?state[ownedKey]:(state[ownedKey]=[]),owned=collection.includes(item.id);
  if(!owned){
    if(!spendStoneValue(item.cost)){setMessage(`You need ${item.cost.toLocaleString()} Nuggets for ${item.name}.`,'wrong');return false;}
    collection.push(item.id);
  }
  state[equippedKey]=item.id;applyMineCosmetics();save();render();
  if(document.getElementById('shopOverlay')?.classList.contains('open'))renderShop();
  setMessage(owned?`${item.name} equipped.`:`${item.name} purchased and equipped!`,'correct');
  return true;
}

let feedbackAudioContext=null;
function silentTestingActive(question=state.active){return question?.silentTesting===true||state.v5?.boss?.status==='active';}
function playFeedbackSound(correct){
  if(silentTestingActive()) return;
  if(state.soundEnabled===false) return;
  try{
    const AudioContextClass=window.AudioContext||window.webkitAudioContext;
    if(!AudioContextClass) return;
    if(!feedbackAudioContext) feedbackAudioContext=new AudioContextClass();
    if(feedbackAudioContext.state==="suspended") feedbackAudioContext.resume();
    const now=feedbackAudioContext.currentTime;
    const notes=correct?[523.25,659.25,783.99]:[330,246.94];
    notes.forEach((frequency,i)=>{
      const osc=feedbackAudioContext.createOscillator();
      const gain=feedbackAudioContext.createGain();
      osc.type=correct?"sine":"triangle";
      osc.frequency.setValueAtTime(frequency,now+i*.11);
      gain.gain.setValueAtTime(.0001,now+i*.11);
      gain.gain.exponentialRampToValueAtTime(correct?.16:.12,now+i*.11+.015);
      gain.gain.exponentialRampToValueAtTime(.0001,now+i*.11+.14);
      osc.connect(gain);gain.connect(feedbackAudioContext.destination);
      osc.start(now+i*.11);osc.stop(now+i*.11+.16);
    });
  }catch(err){console.warn("Answer sound unavailable",err);}
}

function stripMarkup(text){const d=document.createElement('div');d.innerHTML=String(text||'');return d.textContent||d.innerText||'';}
function readingSpeechText(text){return stripMarkup(text).replace(/[／/・]+/g,'、').replace(/\s+/g,' ').trim();}
const VOICE_STYLE_PRESETS={
  natural:{pitch:1,rate:1,volume:1},
  deep:{pitch:.5,rate:.76,volume:1},
  high:{pitch:1.75,rate:1.22,volume:1},
  soft:{pitch:1.15,rate:.82,volume:.6},
  energetic:{pitch:1.25,rate:1.3,volume:1},
  calm:{pitch:.9,rate:.65,volume:.82}
};
const VOICE_GENDER_PRESETS={female:{pitch:1.15,rate:1.06},male:{pitch:.82,rate:.92}};
const FEMALE_VOICE_HINT=/female|woman|girl|kyoko|nanami|haruka|ayumi|sayaka|samantha|victoria|karen|moira|amelie|audrey|paulina|sabina|helena|heami|yuna|mei-jia|ting-ting|zira|alice|elsa|katja/i;
const MALE_VOICE_HINT=/\bmale\b|\bman\b|\bboy\b|ichiro|otoya|hattori|keita|takumi|david|mark|james|daniel|jorge|diego|pablo|paul|thomas|henri|stefan|yuri|pavel|alex/i;
let languageMinerVoices=[];
function refreshLanguageMinerVoices(){if('speechSynthesis'in window)languageMinerVoices=speechSynthesis.getVoices();}
if('speechSynthesis'in window){refreshLanguageMinerVoices();speechSynthesis.addEventListener?.('voiceschanged',refreshLanguageMinerVoices);}
function voiceCandidates(languageTag){
  refreshLanguageMinerVoices();const normalized=String(languageTag||'ja-JP').replace('_','-').toLowerCase();return languageMinerVoices.filter(voice=>String(voice.lang||'').replace('_','-').toLowerCase()===normalized);
}
function styledVoice(candidates,gender){
  const hint=gender==='male'?MALE_VOICE_HINT:FEMALE_VOICE_HINT,opposite=gender==='male'?FEMALE_VOICE_HINT:MALE_VOICE_HINT;return candidates.find(voice=>hint.test(voice.name))||candidates.find(voice=>!opposite.test(voice.name))||candidates[0]||null;
}
function voiceTuning(rate=state.voiceRate){
  const style=state.voiceStyle||'natural',gender=state.voiceGender||'female',stylePreset=VOICE_STYLE_PRESETS[style]||VOICE_STYLE_PRESETS.natural,genderPreset=VOICE_GENDER_PRESETS[gender]||VOICE_GENDER_PRESETS.female;return {style,gender,pitch:Math.max(.35,Math.min(1.9,stylePreset.pitch*genderPreset.pitch)),rate:Math.max(.5,Math.min(1.4,(Number(rate)||.85)*stylePreset.rate*genderPreset.rate)),volume:stylePreset.volume};
}
function syncVoiceTuningLabel(){
  const label=document.getElementById('voiceTuningLabel');if(!label)return;const tuning=voiceTuning();label.textContent=`${tuning.gender==='male'?'Male':'Female'} · ${tuning.style[0].toUpperCase()+tuning.style.slice(1)} · Pitch ${tuning.pitch.toFixed(2)} · Tempo ${tuning.rate.toFixed(2)}× · Volume ${Math.round(tuning.volume*100)}%`;
}
function configureLanguageMinerUtterance(utterance,languageTag,rate=state.voiceRate){
  const tuning=voiceTuning(rate);utterance.lang=languageTag||'ja-JP';utterance.rate=tuning.rate;utterance.pitch=tuning.pitch;utterance.volume=tuning.volume;const voice=styledVoice(voiceCandidates(utterance.lang),tuning.gender);if(voice)utterance.voice=voice;return utterance;
}
function speakLanguageMinerText(text,languageTag='ja-JP',rate=state.voiceRate){
  if(silentTestingActive()||!state.voiceEnabled)return false;if(!('speechSynthesis'in window)){setMessage('Speech is not supported in this browser.','wrong');return false;}const clean=stripMarkup(text).trim();if(!clean)return false;speechSynthesis.cancel();const utterance=configureLanguageMinerUtterance(new SpeechSynthesisUtterance(clean),languageTag,rate);speechSynthesis.speak(utterance);return true;
}
window.LanguageMinerSpeech=Object.freeze({speak:speakLanguageMinerText,gender:()=>state.voiceGender,style:()=>state.voiceStyle,styles:()=>Object.keys(VOICE_STYLE_PRESETS),settings:()=>({...voiceTuning()})});
function japaneseSpeechText(q=state.active){
  if(!q)return '日本語を勉強しましょう。';
  if(q.speechText)return readingSpeechText(q.speechText);
  if(q.kana)return q.kana;
  if(q.kind==='reading' && q.q)return stripMarkup(q.q);
  if(q.displayChallenge)return stripMarkup(q.displayChallenge);
  if(q.q && /[ぁ-んァ-ヶ一-龯]/.test(stripMarkup(q.q)))return stripMarkup(q.q).replace(/___/g,'');
  // Never use q.a here: for English prompts the Japanese answer must remain a surprise.
  return '';
}
function japaneseAnswerSpeechText(q=state.active){
  if(!q)return '';
  const questionText=japaneseSpeechText(q);if(questionText)return questionText;
  const answer=stripMarkup(q.a||'').trim();return /[ぁ-んァ-ヶ一-龯]/.test(answer)?answer:'';
}
function speakJapanese(text,rate=state.voiceRate){
  return speakLanguageMinerText(text,'ja-JP',rate);
}
function speakActiveQuestion(rate=state.voiceRate){if(silentTestingActive())return;const text=japaneseSpeechText();if(text)speakJapanese(text,rate);else setMessage('This question does not contain spoken Japanese.','');}
function updateSessionDashboard(){
  const answered=Number(state.sessionAnswered||0),correct=Number(state.sessionCorrect||0),goal=Number(state.sessionGoal||20);
  const set=(id,value)=>{const el=document.getElementById(id);if(el)el.textContent=value;};
  set('sessionAnswered',answered);set('sessionGoal',goal);set('sessionAccuracy',answered?`${Math.round(correct/answered*100)}%`:'—');
  const bar=document.getElementById('sessionProgressBar');if(bar)bar.style.width=`${Math.min(100,answered/goal*100)}%`;
}
function questionPriority(q){
  const stat=state.questionStats?.[q.id]||{attempts:0,correct:0};
  const attempts=Number(stat.attempts)||0,correct=Number(stat.correct)||0;
  if(!attempts)return 100;
  return Math.max(2,70-(correct/attempts*55)+Math.max(0,4-attempts)*8);
}
function chooseQuestion(pool){
  if(!state.smartReview)return pool[Math.floor(Math.random()*pool.length)];
  const weighted=pool.map(q=>({q,w:questionPriority(q)}));
  const total=weighted.reduce((s,x)=>s+x.w,0);let roll=Math.random()*total;
  for(const item of weighted){roll-=item.w;if(roll<=0)return item.q;}
  return pool[0];
}

function quickMineAction(){
  if(state.active&&!state.answered){
    const target=document.getElementById("challengeArea");
    if(target) target.scrollIntoView({behavior:"smooth",block:"center"});
    return;
  }
  mine();
  const target=document.getElementById("challengeArea");
  if(target) setTimeout(()=>target.scrollIntoView({behavior:"smooth",block:"center"}),60);
}

function mine(){
  ensureHeartRecovery();
  if(state.hearts<=0){
    if(totalStoneValue()<heartRestoreCost()){
      renderRecovery();
      setMessage("You are out of hearts. Wait 30 minutes to gain 3 hearts.","wrong");
    }else{
      setMessage(`You are out of hearts. Use ${heartRestoreCost().toLocaleString()} Nuggets for a Heart Restore to continue.`,"wrong");
    }
    return;
  }
  const idx=selectedStageIndex();
  let pool=questions.filter(x=>x.stage===idx&&questionAllowedForSession(x));
  if(idx===0||idx===1){
    const family=currentKanaFamily(idx);
    pool=pool.filter(q=>family.chars.includes(kanaFromQuestion(q)));
  }
  if(idx===2){
    const tierOrder={beginner:0,intermediate:1,advanced:2};
    const selectedTier=tierOrder[state.n5Tier||"beginner"];
    pool=pool.filter(q=>q.tier==null || tierOrder[q.tier]<=selectedTier);
    const curriculum=tutorAccessGranted()?(state.n5Curriculum||"mixed"):"standard";
    if(curriculum==="standard") pool=pool.filter(q=>q.curriculum!=="tutor");
    if(curriculum==="tutor") pool=pool.filter(q=>q.curriculum==="tutor");
    if(curriculum!=="standard" && (state.tutorTrack||"all")!=="all"){
      const track=state.tutorTrack;
      pool=pool.filter(q=>q.curriculum!=="tutor" || q.tutorTrack===track);
    }
  }
  if(idx>=2) pool=filterJlptPoolForSelection(pool,idx);
  if(!pool.length){
    state.active=null;
    state.answered=false;
    setMessage("This course section does not have any available questions yet.","wrong");
    render();
    return;
  }
  const recent=new Set(state.recentQuestionIds||[]);
  let candidates=pool.filter(q=>!recent.has(q.id));
  if(!candidates.length) candidates=pool;
  let q=chooseQuestion(candidates);
  if(idx===0||idx===1)q=prepareKanaFamilyQuestion(q,currentKanaFamily(idx));
  state.recentQuestionIds=[...(state.recentQuestionIds||[]),q.id].slice(-Math.min(20,Math.max(5,pool.length-1)));
  state.active=q;
  state.answered=false;
  state.shieldArmed=false;
  showQuestion(q);
  setMessage("","");
  if(state.voiceEnabled&&state.autoSpeak)setTimeout(()=>speakActiveQuestion(),180);
  render();
}

function questionDisplay(q){
  // Reading and meaning questions must never reveal their own answer.
  if(q.concealedPrompt) return q.concealedPrompt;
  if(q.kind==="reading" && q.displayChallenge) return q.displayChallenge;
  if(q.hideReadingInPrompt && q.displayChallenge) return q.displayChallenge;
  const mode=state.supportMode||"guided";
  if(mode==="guided" && q.displayGuided) return q.displayGuided;
  if(mode==="challenge" && q.displayChallenge) return q.displayChallenge;
  return q.displayStandard||q.q;
}
function textContainsKanji(value){return /[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF\u{20000}-\u{2FA1F}]/u.test(String(value??"").replace(/<[^>]*>/g," "));}
function questionShowsKanji(q,displayedQuestion=questionDisplay(q)){return textContainsKanji(displayedQuestion)||textContainsKanji(q?.prompt);}
function showQuestion(q){
  const area=document.getElementById("challengeArea");
  const displayedQuestion=questionDisplay(q);
  const showKanjiHelp=Boolean(q.help&&questionShowsKanji(q,displayedQuestion));
  const helpButton=showKanjiHelp?'<button id="kanjiHelpBtn" class="kanji-help-btn" type="button">📖 I don’t know this kanji</button>':'';
  const helpBox=showKanjiHelp?'<div id="kanjiHelpBox" class="kanji-help-box" hidden></div>':'';
  const spoken=japaneseSpeechText(q);
  const silentTest=silentTestingActive(q);
  const voiceTools=silentTest?'<div class="silent-test-note">🔇 Silent testing — question and answer sounds are disabled.</div>':spoken?`<div class="voice-tools"><button id="speakQuestionBtn" type="button">🔊 Hear question</button><button id="slowSpeakQuestionBtn" type="button">🐢 Slow</button><span>Question audio only</span></div>`:'';
  area.innerHTML=`<div class="question-card"><div class="question">${displayedQuestion}</div><div class="prompt">${q.prompt}</div>${voiceTools}${helpButton}${helpBox}<div class="answers" id="answers"></div></div>`;
  document.getElementById('speakQuestionBtn')?.addEventListener('click',()=>speakActiveQuestion());
  document.getElementById('slowSpeakQuestionBtn')?.addEventListener('click',()=>speakActiveQuestion(.58));
  if(showKanjiHelp){
    document.getElementById("kanjiHelpBtn").addEventListener("click",()=>{
      const box=document.getElementById("kanjiHelpBox");
      box.innerHTML=q.help;
      box.hidden=false;
      document.getElementById("kanjiHelpBtn").disabled=true;
    });
  }
  const a=document.getElementById("answers");
  shuffle([...q.opts]).forEach(opt=>{
    const b=document.createElement("button");
    b.textContent=opt;
    b.onclick=()=>answer(opt,b);
    a.appendChild(b);
  });
}

function recordQuestionAttempt(q,correct){
  if(!q?.id) return;
  const previous=state.questionStats[q.id]||{attempts:0,correct:0};
  state.questionStats[q.id]={attempts:Number(previous.attempts||0)+1,correct:Number(previous.correct||0)+(correct?1:0)};
}

function answer(opt,button){
  if(state.answered || !state.active) return;
  const correct=opt===state.active.a;
  state.sessionAnswered=Number(state.sessionAnswered||0)+1;
  if(correct)state.sessionCorrect=Number(state.sessionCorrect||0)+1;
  updateSessionDashboard();
  const all=[...document.querySelectorAll("#answers button")];

  if(correct){
    playFeedbackSound(true);
    state.answered=true;
    state.streak=Number(state.streak||0)+1;
    state.bestStreak=Math.max(Number(state.bestStreak||0),state.streak);

    const quality=Math.min(6,Math.floor(state.streak/3)+selectedStageIndex());
    const xpGain=12+selectedStageIndex()*3;
    const answeredStage=Number(state.active.stage);
    const previousStageXp=Number(state.stageXp[answeredStage]||0);
    state.xp=Number(state.xp||0)+xpGain;
    state.stageXp[answeredStage]=previousStageXp+xpGain;
    const checkpointDrops=claimReachedGemCheckpoints(answeredStage,previousStageXp,state.stageXp[answeredStage]);
    if(answeredStage===0) state.hiraganaXp=state.stageXp[0];
    recordQuestionAttempt(state.active,true);
    const justCleared=stageComplete(answeredStage) && !state.clearedStages.includes(answeredStage);
    if(justCleared){
      state.clearedStages.push(answeredStage);
      addStoneChange(STAGE_CLEAR_REWARDS[answeredStage],Math.min(gemTiers.length-1,answeredStage*2+3));
    }
    const unlockedGemRewards=grantUnlockedGemRewards();

    const kanaProgress=recordKana(true);
    markPracticeToday();
    while(state.xp>=xpNeed()){
      state.xp-=xpNeed();
      state.level++;
    }

    // Save and refresh the mastery chart immediately from the same state object.
    save();
    try{ renderKanaChart(); }catch(err){ console.error("Immediate kana refresh failed",err); }
    try{ renderGemCollection(); }catch(err){ console.error("Immediate gem refresh failed",err); }

    button.style.background="#225f49";
    all.forEach(x=>x.disabled=true);
    render();
    const quickMineBtn=document.getElementById("quickMineBtn");
    if(quickMineBtn){quickMineBtn.classList.remove("attention");void quickMineBtn.offsetWidth;quickMineBtn.classList.add("attention");}

    const masteryText=kanaProgress ? ` ${kanaProgress.char} mastery is now ${masteryScore(kanaProgress.char)}% (${kanaProgress.correctCount}/${kanaProgress.attempts} correct).` : "";
    const currentMastery=stageMastery(answeredStage);
    const clearText=justCleared?` 🎉 ${stages[answeredStage].name} course cleared with ${currentMastery}% mastery! ${answeredStage<stages.length-1?`The guardian gate is ready in Expedition Hub: score 25/25 within 5 minutes to unlock ${stages[answeredStage+1].name}. `:"The final guardian gate is ready in Expedition Hub. "}+${STAGE_CLEAR_REWARDS[answeredStage].toLocaleString()} bonus Nuggets.`:"";
    const nextCheckpointDrop=GEM_CHECKPOINT_DROPS.find(drop=>drop.stage===answeredStage&&!gemCheckpointClaimed(drop));
    const checkpointText=checkpointDrops.length?` 💎 Checkpoint reward: ${checkpointDrops.map(drop=>`${drop.gem.icon} ${drop.gem.name}`).join(", ")}.`:nextCheckpointDrop?` Next gem drop: ${nextCheckpointDrop.gem} at checkpoint ${nextCheckpointDrop.checkpoint} (${nextCheckpointDrop.checkpoint*20}% course XP).`:" All gemstone checkpoints in this mine are claimed.";
    const unlockRewardText=unlockedGemRewards.length?` Mine access reward: ${unlockedGemRewards.length} newly unlocked gemstone${unlockedGemRewards.length===1?'':'s'} added to your save.`:"";
    setMessage(`Correct! +${xpGain} Mine XP. Mine mastery: ${currentMastery}/${STAGE_MASTERY_REQUIREMENTS[answeredStage]}%.${checkpointText}${unlockRewardText}${masteryText}${clearText}`,"correct");
    try{ floatText(checkpointDrops.length?`${checkpointDrops.at(-1).gem.icon} Checkpoint drop!`:`+${xpGain} XP`); }catch(err){ console.error("Reward animation failed",err); }
  }else{
    playFeedbackSound(false);
    button.disabled=true;
    button.style.background="#6d2933";
    state.streak=0;
    const kanaProgress=recordKana(false);
    recordQuestionAttempt(state.active,false);
    markPracticeToday();

    if(state.shieldArmed){
      state.shields=Math.max(0,Number(state.shields||0)-1);
      state.shieldArmed=false;
      setMessage(`Wrong, but your shield protected your heart.${kanaProgress?` ${kanaProgress.char} mastery is now ${masteryScore(kanaProgress.char)}% (${kanaProgress.correctCount}/${kanaProgress.attempts} correct).`:""} Try again.`,"wrong");
    }else if(state.developerInfiniteHearts){
      state.hearts=state.maxHearts;
      setMessage(`Wrong, but Developer Infinite Hearts prevented heart loss.${kanaProgress?` ${kanaProgress.char} mastery is now ${masteryScore(kanaProgress.char)}% (${kanaProgress.correctCount}/${kanaProgress.attempts} correct).`:""} Try again.`,"wrong");
    }else{
      state.hearts=Math.max(0,Number(state.hearts||0)-1);
      setMessage(`Wrong. You lost one heart.${kanaProgress?` ${kanaProgress.char} mastery is now ${masteryScore(kanaProgress.char)}% (${kanaProgress.correctCount}/${kanaProgress.attempts} correct).`:""} ${state.hearts>0?"Try again.":(totalStoneValue()<heartRestoreCost()?"A 30-minute recovery timer has started.":"Restore hearts in the shop.")}`,"wrong");
    }

    save();
    try{ renderKanaChart(); }catch(err){ console.error("Immediate kana refresh failed",err); }
    render();
  }
}
function useHint(){
  if(!state.active || state.answered || state.hints<1) return;
  const wrong=[...document.querySelectorAll("#answers button")].filter(b=>!b.disabled && b.textContent!==state.active.a);
  if(wrong.length){
    wrong[Math.floor(Math.random()*wrong.length)].disabled=true;
    state.hints--;
    setMessage("Hint used: one incorrect answer was removed.","");
    render();
  }
}
function armShield(){
  if(!state.active || state.answered || state.shields<1 || state.shieldArmed) return;
  state.shieldArmed=true; render();
  setMessage("Shield armed. Your next wrong answer will not cost a heart.","");
}
function buy(type){
  const prices=currentShopPrices();
  const cost=prices[type];
  if(!cost) return;
  if(type==="heart" && state.hearts===state.maxHearts){ setMessage("Your hearts are already full.",""); return; }
  if(!spendStoneValue(cost)){ setMessage(`You need ${cost.toLocaleString()} Nuggets. Current wealth: ${totalStoneValue().toLocaleString()} Nuggets.`,"wrong"); return; }
  if(type==="hint") state.hints++;
  if(type==="shield") state.shields++;
  if(type==="heart"){ state.hearts=state.maxHearts; state.heartRecoveryEnd=null; }
  setMessage(`Purchase complete. Spent ${cost.toLocaleString()} Nuggets.`,"correct");
  render();
}
function resetSave(){
  if(!activeProfileId) return false;
  if(!confirm("Reset all progress for this player profile?")) return false;
  state=normalizeState(structuredClone(DEFAULT_STATE));
  save();
  setMessage("This player profile has been reset.","");
  render();
  return true;
}
window.resetJapaneseMinerSave=resetSave;
function nextMine(){
  state.active=null; state.answered=false; state.shieldArmed=false;
  document.getElementById("challengeArea").innerHTML='<div class="small">Tap the rock to mine another challenge.</div>';
  setMessage("","");
  render();
}
function setMessage(t,c){ const m=document.getElementById("message");m.textContent=t;m.className="message "+c; }
function shuffle(a){ for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a; }
function floatText(t){
  const d=document.createElement("div");d.className="float";d.textContent=t;
  d.style.left=(window.innerWidth/2-30)+"px";d.style.top=(window.innerHeight/2)+"px";
  document.body.appendChild(d);setTimeout(()=>d.remove(),900);
}

const PAGE_SCROLL_LOCK_SELECTOR=[
  '#authOverlay:not(.hidden):not(.auth-dismissed):not([hidden])',
  '.placement-overlay.open','.academy-overlay.open','.game-menu-overlay.open','.shop-overlay.open',
  '.feature-center-overlay.open','.developer-overlay.open','.study-calendar-overlay.open',
  '.utility-overlay.open','.cosmetic-preview-overlay.open','.v5-overlay.open','.v6-overlay.open'
].join(',');
let pageScrollObserver=null;
function syncPageScrollLock(){
  if(!document.body||!document.documentElement)return false;
  const drawerOpen=!!document.getElementById('statsDrawer')?.classList.contains('open');
  document.body.classList.toggle('stats-open',drawerOpen);
  const locked=drawerOpen||!!document.querySelector(PAGE_SCROLL_LOCK_SELECTOR);
  document.documentElement.classList.toggle('page-scroll-locked',locked);
  document.body.classList.toggle('page-scroll-locked',locked);
  document.body.style.removeProperty('overflow');
  document.documentElement.style.removeProperty('overflow');
  return locked;
}
function initPageScrollGuard(){
  if(pageScrollObserver)return;
  pageScrollObserver=new MutationObserver(syncPageScrollLock);
  try{
    if(document.body?.nodeType===Node.ELEMENT_NODE){
      pageScrollObserver.observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['class','hidden','aria-hidden']});
    }
  }catch{
    pageScrollObserver=null;
  }
  syncPageScrollLock();
}
window.syncJapaneseMinerPageScroll=syncPageScrollLock;
initPageScrollGuard();

function setStatsDrawer(open){
  if(open) syncSelectedStageUI();
  const drawer=document.getElementById("statsDrawer");
  const overlay=document.getElementById("statsOverlay");
  const quick=document.getElementById("quickStatsBtn");
  drawer?.classList.toggle("open",open);
  overlay?.classList.toggle("open",open);
  document.body.classList.toggle("stats-open",open);
  syncPageScrollLock();
  drawer?.setAttribute("aria-hidden",String(!open));
  quick?.setAttribute("aria-expanded",String(open));
}
function jumpToSection(id){
  setStatsDrawer(false);
  const target=document.getElementById(id);
  if(target) setTimeout(()=>target.scrollIntoView({behavior:"smooth",block:"start"}),120);
}
document.getElementById("quickMineBtn").onclick=quickMineAction;
document.getElementById("soundToggle").addEventListener("change",e=>{state.soundEnabled=e.target.checked;save();if(state.soundEnabled)playFeedbackSound(true);});
document.getElementById("supportMode").addEventListener("change",e=>{state.supportMode=e.target.value;state.active=null;state.answered=false;save();render();setMessage(`Support mode changed to ${e.target.options[e.target.selectedIndex].text}. Start a new question.`,"correct");});
document.getElementById("quickStatsBtn")?.addEventListener("click",()=>setStatsDrawer(true));
document.getElementById("headerStatsBtn").onclick=()=>setStatsDrawer(true);
document.getElementById("closeStatsBtn").onclick=()=>setStatsDrawer(false);
document.getElementById("statsOverlay").onclick=()=>setStatsDrawer(false);
document.getElementById("jumpHealthBtn").onclick=()=>jumpToSection("healthSection");
document.getElementById("jumpMasteryBtn").onclick=()=>jumpToSection("masterySection");
document.addEventListener("keydown",e=>{if(e.key==="Escape"){setStatsDrawer(false);closeDeveloperPanel();}});

document.getElementById("rock").onclick=mine;
document.getElementById("hintBtn").onclick=useHint;
document.getElementById("shieldBtn").onclick=armShield;
document.getElementById("nextBtn").onclick=nextMine;
document.getElementById("logoutBtn").onclick=logout;

function openDeveloperPanel(){
  if(!isDeveloperSession) return;
  setStatsDrawer(false);
  closeGameMenu();
  const overlay=document.getElementById("developerOverlay");
  overlay.classList.add("open");overlay.setAttribute("aria-hidden","false");
  document.getElementById("adminInfiniteHearts").checked=!!state.developerInfiniteHearts;
  renderAdminPlayerSearch();
  syncPageScrollLock();
}
function closeDeveloperPanel(){
  const overlay=document.getElementById("developerOverlay");
  if(!overlay) return;
  overlay.classList.remove("open");overlay.setAttribute("aria-hidden","true");
  syncPageScrollLock();
}
function developerMessage(text,error=false){
  const el=document.getElementById("developerMessage");if(!el)return;
  el.textContent=text;el.style.color=error?"var(--red)":"var(--green)";
}
function setTotalNuggets(amount){
  amount=Math.max(0,Math.floor(Number(amount)||0));
  gemTiers.forEach(g=>state.gemInventory[g.name]=0);
  addStoneChange(amount,gemTiers.length-1);
}
function masterAllKana(){
  [...hira,...kata].forEach(([ch])=>state.kanaStats[ch]={attempts:25,correct:25});
  state.hiraganaXp=KATAKANA_XP_REQUIREMENT;
}
function masterAllQuestions(){
  questions.forEach(q=>state.questionStats[q.id]={attempts:3,correct:3});
}
function applyAdminStage(index){
  index=Math.max(0,Math.min(stages.length-1,Number(index)||0));
  if(index>=1){masterAllKana();}
  for(let i=0;i<index;i++){
    state.stageXp[i]=Math.max(Number(state.stageXp[i]||0),STAGE_XP_REQUIREMENTS[i]);
    if(i>=2) questions.filter(q=>q.stage===i).forEach(q=>state.questionStats[q.id]={attempts:3,correct:3});
    if(!state.clearedStages.includes(i)) state.clearedStages.push(i);
  }
  state.level=Math.max(state.level,index>=2?stages[index].unlock:1);
  state.selectedStage=index;
  state.active=null;
  state.answered=false;
  state.xp=0;
}
function completeAllJapaneseCourseProgress(){
  masterAllKana();masterAllQuestions();
  state.level=150;state.xp=0;state.stageXp=STAGE_XP_REQUIREMENTS.map(value=>value);state.hiraganaXp=state.stageXp[0];
  state.clearedStages=stages.map((_,index)=>index);state.selectedStage=stages.length-1;state.placementUnlockedThrough=stages.length-1;
  state.onboardingComplete=true;state.placementTestCompleted=true;state.placementRewardClaimed=true;
  state.placementResult={date:Date.now(),route:"admin-unlock-all",overall:100,hiragana:100,katakana:100,n5:100,n4:100,n3:100,n2:100,n1:100};
  state.active=null;state.answered=false;state.shieldArmed=false;state.recentQuestionIds=[];
  ensureJlptSectionState();
  for(let stage=2;stage<stages.length;stage++){
    JLPT_SECTION_SPECS.forEach(({id:section})=>{
      const levels=jlptSectionLevels(stage,section);
      levels.flat().forEach(item=>{if(item?.masteryId)state.n5AcademyMastery[item.masteryId]=100;});
      for(let evenLesson=2;evenLesson<=levels.length;evenLesson+=2){
        state.jlptReviewCheckpoints[jlptReviewCheckpointKey(stage,section,evenLesson)]={best:100,lastScore:100,attempts:1,passed:true,passedAt:Date.now(),adminUnlocked:true};
      }
      state.jlptSectionLevel[stage][section]=Math.max(0,levels.length-1);
      if(section==="vocabulary")state.jlptVocabularyLevel[stage]=Math.max(0,levels.length-1);
    });
    state.jlptSectionSelection[stage]="vocabulary";
  }
  state.maxHearts=14;state.hearts=14;state.heartRecoveryEnd=null;state.hints=999;state.shields=999;
  state.ownedPickaxeSkins=PICKAXE_SKINS.map(item=>item.id);state.ownedWallpapers=WALLPAPERS.map(item=>item.id);state.ownedRockSkins=ROCK_SKINS.map(item=>item.id);state.ownedMineWallpapers=MINE_WALLPAPERS.map(item=>item.id);
  gemTiers.forEach(gem=>state.gemInventory[gem.name]=Math.max(100,Number(state.gemInventory[gem.name]||0)));
  window.japaneseMinerV5Admin?.unlockAll?.();
  window.japaneseMinerV38Admin?.unlockAll?.();
  window.LanguageMinerCourseAdmin?.unlockAll?.();
}
function resetStateFields(fields,targetState=state){
  const fresh=normalizeState(structuredClone(DEFAULT_STATE));
  fields.forEach(key=>{if(Object.prototype.hasOwnProperty.call(fresh,key))targetState[key]=structuredClone(fresh[key]);else delete targetState[key];});
}
function resetOfflineV5Progress(targetState){
  const v=targetState.v5&&typeof targetState.v5==="object"?targetState.v5:{},collection={ownedCompanions:Array.isArray(v.ownedCompanions)?[...v.ownedCompanions]:["none"],companion:String(v.companion||"none"),buildings:v.buildings&&typeof v.buildings==="object"?{...v.buildings}:{},fashion:v.fashion&&typeof v.fashion==="object"?{...v.fashion}:{jacket:"none",gloves:"none",shoes:"boots"},ownedFashion:Array.isArray(v.ownedFashion)?[...v.ownedFashion]:["jacket:none","gloves:none","shoes:boots"],ownedHolidaySpecials:Array.isArray(v.ownedHolidaySpecials)?[...v.ownedHolidaySpecials]:[],holidaySpecial:String(v.holidaySpecial||"none")};
  targetState.v5=collection;
}
function resetJapaneseCourseProgress(targetState=state){
  resetStateFields(["supportMode","n5Tier","n5Curriculum","tutorTrack","n5AcademyMastery","academyTestBest","academyReviewDate","recentQuestionIds","onboardingComplete","placementResult","placementTestCompleted","placementRewardClaimed","placementUnlockedThrough","selectedStage","jlptSectionSelection","jlptVocabularyLevel","jlptSectionLevel","jlptReviewCheckpoints","jlptVocabularyLessonSize","kanaFamilyLevel","kanaStats","stats","hiraganaXp","stageXp","clearedStages","questionStats","level","xp","active","answered","shieldArmed","sessionAnswered","sessionCorrect"],targetState);
  if(targetState===state)window.japaneseMinerV5Admin?.resetProgress?.();else resetOfflineV5Progress(targetState);
}
function resetJapanesePlacement(targetState=state){
  resetStateFields(["placementResult","placementTestCompleted","placementRewardClaimed","placementUnlockedThrough"],targetState);targetState.onboardingComplete=true;
}
function resetBossesAndReviews(targetState=state){
  targetState.jlptReviewCheckpoints={};
  if(targetState===state){window.japaneseMinerV5Admin?.resetBosses?.();window.LanguageMinerCourseAdmin?.resetBossesAndReviews?.();}
  else if(targetState.v5&&typeof targetState.v5==="object"){targetState.v5.boss=null;targetState.v5.bossDefeated=[];targetState.v5.bossWins=0;targetState.v5.bossFastestTimes={};}
}
function resetEconomyAndInventory(targetState=state){
  resetStateFields(["gems","gemInventory","gemCheckpointClaims","gemUnlockRewards","lastGem","stoneCurrencyMigrated","hearts","maxHearts","heartRecoveryEnd","hints","shields","shieldArmed"],targetState);
}
function resetCosmeticsAndCompanions(targetState=state){
  resetStateFields(["ownedPickaxeSkins","equippedPickaxeSkin","ownedWallpapers","equippedWallpaper","ownedRockSkins","equippedRockSkin","ownedMineWallpapers","equippedMineWallpaper","colorTheme","character","ownedCosmetics","selectedTitle"],targetState);
  if(targetState===state){window.japaneseMinerV5Admin?.resetCosmetics?.();window.japaneseMinerV38Admin?.resetCosmetics?.();}
  else{const v=targetState.v5&&typeof targetState.v5==="object"?targetState.v5:(targetState.v5={});v.ownedCompanions=["none"];v.companion="none";v.ownedFashion=["jacket:none","gloves:none","shoes:boots"];v.fashion={jacket:"none",gloves:"none",shoes:"boots"};v.ownedHolidaySpecials=[];v.holidaySpecial="none";v.buildings={forge:0,library:0,garden:0,museum:0,home:0};}
}
function resetQuestsAndHistory(targetState=state){
  resetStateFields(["streak","bestStreak","practiceStreak","lastPracticeDate","sessionAnswered","sessionCorrect","analytics","mistakes","notebookNotes","notebookView","notebookQueueVersion","achievements","selectedTitle","questData","studyTimeByDate","studyDates","practiceDates"],targetState);
  if(targetState===state)window.japaneseMinerV5Admin?.resetHistory?.();
  else{const v=targetState.v5&&typeof targetState.v5==="object"?targetState.v5:(targetState.v5={});Object.assign(v,{srs:{},wordBook:{},checkpoints:{},reviewed:0,totalCorrect:0,chests:0,lastChestAt:0,companionDailyReview:"",deferredTreasures:[],studySessions:[],currentStudySession:null,dailyRefresher:null,smartReviewSession:null,missions:{},achievements:{},seasonClaim:""});}
}
const ADMIN_RESET_LABELS={
  "course:current":"the current language course","course:ja":"Japanese course progress","course:en":"English course progress","course:es":"Spanish course progress","course:ru":"Russian course progress","course:ko":"Korean course progress","course:zh":"Mandarin Chinese course progress","course:it":"Italian course progress","course:fr":"French course progress","course:de":"German course progress","course:pt":"Brazilian Portuguese course progress","course:vi":"Vietnamese course progress","course:th":"Thai course progress","course:tr":"Turkish course progress","course:id":"Indonesian course progress","course:pl":"Polish course progress","course:el":"Greek course progress","course:uk":"Ukrainian course progress","courses:all":"course progress for every language","placement:current":"the current language placement test","placements:all":"placement tests for every language",bosses:"all boss and review results",economy:"economy, gems, supplies, and hearts",cosmetics:"avatar cosmetics, companions, and settlement",history:"quests, streaks, reviews, and study history",profile:"the entire administrator profile"
};
function applySelectedAdminReset(){
  const target=document.getElementById("adminResetTarget")?.value||"course:current",label=ADMIN_RESET_LABELS[target]||"the selected data";
  if(!confirm(`Reset ${label}? This cannot be undone unless you exported a save backup.`))return false;
  if(target==="course:current"){
    const current=window.LanguageMinerCourseAdmin?.currentLanguage?.()||"ja";
    if(current==="ja"){resetJapaneseCourseProgress();window.LanguageMinerCourseAdmin?.resetPlacement?.("ja");}else window.LanguageMinerCourseAdmin?.resetLanguage?.(current);
  }else if(target==="course:ja"){resetJapaneseCourseProgress();window.LanguageMinerCourseAdmin?.resetPlacement?.("ja");}
  else if(target.startsWith("course:"))window.LanguageMinerCourseAdmin?.resetLanguage?.(target.split(":")[1]);
  else if(target==="courses:all"){resetJapaneseCourseProgress();window.LanguageMinerCourseAdmin?.resetAll?.();window.LanguageMinerCourseAdmin?.resetAllPlacements?.();}
  else if(target==="placement:current"){const current=window.LanguageMinerCourseAdmin?.currentLanguage?.()||"ja";if(current==="ja")resetJapanesePlacement();window.LanguageMinerCourseAdmin?.resetPlacement?.(current);}
  else if(target==="placements:all"){resetJapanesePlacement();window.LanguageMinerCourseAdmin?.resetAllPlacements?.();}
  else if(target==="bosses")resetBossesAndReviews();
  else if(target==="economy")resetEconomyAndInventory();
  else if(target==="cosmetics")resetCosmeticsAndCompanions();
  else if(target==="history")resetQuestsAndHistory();
  else if(target==="profile"){state=normalizeState(structuredClone(DEFAULT_STATE));window.LanguageMinerCourseAdmin?.resetAll?.();window.LanguageMinerCourseAdmin?.resetAllPlacements?.();}
  state=normalizeState(state);return true;
}
let selectedAdminPlayerId="",adminPlayerResultsCache=[],adminPlayerSearchRequest=0;
function adminEscape(value){return String(value??"").replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));}
function adminPlayerAccountKey(profile){return profile?.cloudUserId?`cloud:${profile.cloudUserId}`:`local:${profile?.name||"preview-player"}`;}
function storedPlayerState(profile){let raw=null;try{raw=JSON.parse(localStorage.getItem(profileStorageKey(profile.id)));}catch{}return normalizeState(raw);}
function localAdminPlayerResults(term){
  const active=readProfiles().find(profile=>profile.id===activeProfileId);return readProfiles().filter(profile=>profile.id!==activeProfileId&&(!active?.cloudUserId||profile.cloudUserId!==active.cloudUserId)&&!(window.LANGUAGE_MINER_PREVIEW&&profile.name===active?.name)).filter(profile=>!term||[profile.name,profile.email,profile.id,profile.cloudUserId].some(value=>String(value||"").toLowerCase().includes(term))).sort((a,b)=>Number(b.lastPlayed||0)-Number(a.lastPlayed||0)).map(profile=>{const playerState=storedPlayerState(profile);return {selectionId:`local:${profile.id}`,source:profile.cloudUserId&&window.LANGUAGE_MINER_PREVIEW?"preview-global":"local",profile,name:profile.name||"Player",email:profile.email||"",userId:profile.cloudUserId||"",level:Math.max(1,Number(playerState.level)||1),detail:stages[Math.max(0,Math.min(stages.length-1,Number(playerState.selectedStage)||0))]?.label||"Hiragana"};});
}
async function renderAdminPlayerSearch(){
  const results=document.getElementById("adminPlayerResults"),summary=document.getElementById("adminSelectedPlayer"),resetButton=document.querySelector('[data-admin="reset-selected-player"]');if(!results||!summary||!resetButton)return;
  const request=++adminPlayerSearchRequest,term=String(document.getElementById("adminPlayerSearch")?.value||"").trim().toLowerCase(),localPlayers=localAdminPlayerResults(term);results.innerHTML='<div class="admin-player-empty">Searching secure cloud accounts…</div>';
  let globalPlayers=[],cloudUnavailable=false;
  try{
    if(window.languageMinerCloudAuth?.enabled?.()&&window.languageMinerCloudAuth?.getSession?.()){
      const rows=await window.languageMinerCloudAuth.adminSearchPlayers(term,50);globalPlayers=rows.map(row=>({selectionId:`global:${row.user_id}`,source:"global",userId:row.user_id,name:row.display_name||"Player",email:row.email||"",level:Math.max(1,Number(row.player_level)||1),detail:String(row.current_language||"ja").toUpperCase(),revision:Number(row.revision)||0}));
    }
  }catch(error){cloudUnavailable=true;console.warn("Secure global player search is not available until its Supabase migration is deployed.",error);}
  if(request!==adminPlayerSearchRequest)return;
  const globalIds=new Set(globalPlayers.map(player=>player.userId)),players=globalPlayers.concat(localPlayers.filter(player=>!player.userId||!globalIds.has(player.userId))).slice(0,50);adminPlayerResultsCache=players;
  if(selectedAdminPlayerId&&!players.some(player=>player.selectionId===selectedAdminPlayerId)&&term)selectedAdminPlayerId="";
  results.innerHTML=players.length?players.map(player=>{const selected=player.selectionId===selectedAdminPlayerId,isGlobal=player.source==="global",isGlobalDemo=player.source==="preview-global",accountLabel=isGlobal?(player.email||"Supabase player account"):isGlobalDemo?(player.email||"Cloud account demo"):(player.email||player.userId?"Cloud-linked save cached on this device":"Local preview profile");return `<button type="button" class="admin-player-result ${selected?'selected':''}" data-admin-player-id="${adminEscape(player.selectionId)}" aria-pressed="${selected}"><span><strong>${adminEscape(player.name)}</strong><small>${adminEscape(accountLabel)}</small></span><span><b>Lv. ${player.level}</b><small>${adminEscape(isGlobal?`GLOBAL · ${player.detail}`:isGlobalDemo?`GLOBAL DEMO · ${player.detail}`:player.detail)}</small></span></button>`;}).join(""):`<div class="admin-player-empty">No player accounts match that search.${cloudUnavailable?' Deploy the included Supabase migration to enable global results.':''}</div>`;
  const selected=players.find(player=>player.selectionId===selectedAdminPlayerId);
  summary.innerHTML=selected?`<span>Selected ${selected.source==='global'?'global':'preview'} player</span><strong>${adminEscape(selected.name)}</strong><small>${adminEscape(selected.email||selected.userId||selected.profile?.id)} · ${selected.source==='global'?'Secure Supabase cloud save':selected.source==='preview-global'?'Global reset workflow demo':'Profile stored on this preview device'}</small>`:'<span>No player selected</span><small>Search globally by player name, email, or cloud user ID.</small>';
  resetButton.disabled=!selected;
}
function applyResetTargetToPlayerState(playerState,target,currentLanguage){
  if(target==="course:current"&&currentLanguage==="ja")resetJapaneseCourseProgress(playerState);
  else if(target==="course:ja")resetJapaneseCourseProgress(playerState);
  else if(target==="courses:all")resetJapaneseCourseProgress(playerState);
  else if(target==="placement:current"&&currentLanguage==="ja")resetJapanesePlacement(playerState);
  else if(target==="placements:all")resetJapanesePlacement(playerState);
  else if(target==="bosses")resetBossesAndReviews(playerState);
  else if(target==="economy")resetEconomyAndInventory(playerState);
  else if(target==="cosmetics")resetCosmeticsAndCompanions(playerState);
  else if(target==="history")resetQuestsAndHistory(playerState);
  else if(target==="profile")playerState=normalizeState(structuredClone(DEFAULT_STATE));
  return normalizeState(playerState);
}
async function resetSelectedPlayerData(){
  const selected=adminPlayerResultsCache.find(player=>player.selectionId===selectedAdminPlayerId);if(!selected){developerMessage("Select another player account first.",true);await renderAdminPlayerSearch();return false;}
  const target=document.getElementById("adminPlayerResetTarget")?.value||"course:current",label=target==="profile"?"the entire player profile":ADMIN_RESET_LABELS[target]||"the selected data";
  if(!confirm(`Reset ${label} for ${selected.name||"this player"}? This cannot be undone without a backup.`))return false;
  if(selected.source==="global"){
    const cloud=window.languageMinerCloudAuth,record=await cloud.adminGetPlayerSave(selected.userId);if(!record)throw new Error("That global player account could not be loaded.");
    const courseResult=window.LanguageMinerCourseCloud?.resetSnapshot?.(record.course_settings||{},target)||{settings:record.course_settings||{},learning:String(record.course_settings?.learning||"ja")},playerState=applyResetTargetToPlayerState(normalizeState(record.game_state||{}),target,String(courseResult.learning||"ja"));
    const result=await cloud.adminUpdatePlayerSave(selected.userId,{gameState:playerState,courseSettings:courseResult.settings,target,baseRevision:Number(record.revision)||0});
    if(!result?.accepted)throw new Error("The player saved new progress during this reset. Search again, reselect the player, and retry so no recent progress is overwritten.");
    await renderAdminPlayerSearch();return `${selected.name}: ${label} was reset securely in Supabase.`;
  }
  const profiles=readProfiles(),profile=profiles.find(item=>item.id===selected.profile?.id&&item.id!==activeProfileId);if(!profile)throw new Error("That preview player profile is no longer available.");
  const accountKey=adminPlayerAccountKey(profile),courseResult=window.LanguageMinerCourseAdmin?.resetForAccount?.(accountKey,target)||null,playerState=applyResetTargetToPlayerState(storedPlayerState(profile),target,String(courseResult?.learning||"ja"));
  localStorage.setItem(profileStorageKey(profile.id),JSON.stringify(playerState));profile.adminResetAt=Date.now();profile.adminResetTarget=target;writeProfiles(profiles);await renderAdminPlayerSearch();return `${profile.name||"Player"}: ${label} was reset successfully in this preview.`;
}
async function runAdminAction(action){
  if(!isDeveloperSession){developerMessage("Administrator access required.",true);return;}
  let successMessage="Developer action applied successfully.";
  if(action==="set-nuggets") setTotalNuggets(document.getElementById("adminNuggetAmount").value);
  if(action==="add-million") addStoneChange(1000000,gemTiers.length-1);
  if(action==="add-gems") gemTiers.forEach(g=>state.gemInventory[g.name]=Number(state.gemInventory[g.name]||0)+100);
  if(action==="restore-hearts"){state.hearts=state.maxHearts;state.heartRecoveryEnd=null;}
  if(action==="max-hearts"){state.maxHearts=14;state.hearts=14;}
  if(action==="set-stage") applyAdminStage(document.getElementById("adminStageSelect").value);
  if(action==="master-kana") masterAllKana();
  if(action==="unlock-all"){
    completeAllJapaneseCourseProgress();successMessage="Everything is unlocked: all nine language courses, lessons, review quizzes, guardian gates, cosmetics, companions, and settlement upgrades.";
  }
  if(action==="unlock-pickaxes") state.ownedPickaxeSkins=PICKAXE_SKINS.map(x=>x.id);
  if(action==="add-items"){state.hints=Number(state.hints||0)+99;state.shields=Number(state.shields||0)+99;}
  if(action==="copy-save"){
    document.getElementById("adminSaveJson").value=JSON.stringify(state,null,2);
    developerMessage("Save JSON displayed below.");return;
  }
  if(action==="export-save"){
    const blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"});
    const url=URL.createObjectURL(blob);const a=document.createElement("a");
    a.href=url;a.download=`language-miner-${activeProfileId}-save.json`;a.click();URL.revokeObjectURL(url);
    developerMessage("Save file exported.");return;
  }
  if(action==="import-save"){
    try{state=normalizeState(JSON.parse(document.getElementById("adminSaveJson").value));}
    catch{developerMessage("The pasted save JSON is invalid.",true);return;}
  }
  if(action==="reset-selected"){
    if(!applySelectedAdminReset())return;
    successMessage="The selected admin data was reset successfully.";
  }
  if(action==="reset-selected-player"){
    try{const playerMessage=await resetSelectedPlayerData();if(!playerMessage)return;successMessage=playerMessage;}
    catch(error){developerMessage(String(error?.message||"The selected player could not be reset."),true);return;}
  }
  if(action==="reset-profile"){
    if(!confirm("Reset all progress for the administrator profile?")) return;
    state=normalizeState(structuredClone(DEFAULT_STATE));
    window.LanguageMinerCourseAdmin?.resetAll?.();
    successMessage="The entire administrator profile was reset successfully.";
  }
  save();render();
  document.getElementById("adminInfiniteHearts").checked=!!state.developerInfiniteHearts;
  developerMessage(successMessage);
}

const developerButton=document.getElementById("developerBtn");
developerButton.onclick=openDeveloperPanel;
developerButton.addEventListener("pointerup",event=>{
  if(event.pointerType!=="touch"&&event.pointerType!=="pen")return;
  event.preventDefault();
  openDeveloperPanel();
});
document.getElementById("portraitLockBtn")?.addEventListener("click",async()=>{
  const result=await setMobilePortraitLock(true);
  const message=document.getElementById("portraitGuardMessage");
  if(message)message.textContent=result.locked?"Portrait lock was requested. Turn your phone upright to continue.":"Turn your phone upright to continue. If it stays sideways, enable Auto rotate in your phone settings and try again.";
});
window.addEventListener("resize",syncPortraitGuard,{passive:true});
window.screen?.orientation?.addEventListener?.("change",syncPortraitGuard);
document.addEventListener("pointerup",()=>{if(activeProfileId&&mobilePortraitDevice()&&portraitLockEnabled())requestMobilePortraitLock().finally(()=>syncPortraitGuard(false));},{passive:true});
document.getElementById("closeDeveloperBtn").onclick=closeDeveloperPanel;
document.getElementById("developerOverlay").addEventListener("click",e=>{if(e.target.id==="developerOverlay")closeDeveloperPanel();});
document.querySelectorAll("[data-admin]").forEach(btn=>btn.addEventListener("click",()=>runAdminAction(btn.dataset.admin)));
let adminPlayerSearchTimer=null;
document.getElementById("adminPlayerSearch")?.addEventListener("input",()=>{clearTimeout(adminPlayerSearchTimer);adminPlayerSearchTimer=setTimeout(renderAdminPlayerSearch,250);});
document.getElementById("adminPlayerResults")?.addEventListener("click",event=>{const result=event.target.closest?.("[data-admin-player-id]");if(!result||!isDeveloperSession)return;selectedAdminPlayerId=result.dataset.adminPlayerId;renderAdminPlayerSearch();});
document.getElementById("adminInfiniteHearts").addEventListener("change",e=>{
  if(!isDeveloperSession)return;
  state.developerInfiniteHearts=e.target.checked;
  if(state.developerInfiniteHearts) state.hearts=state.maxHearts;
  save();render();developerMessage(state.developerInfiniteHearts?"Infinite hearts enabled.":"Infinite hearts disabled.");
});


let authMode="login";
function setAuthMessage(text,good=false){const el=document.getElementById("authMessage");el.textContent=text;el.style.color=good?"var(--green)":"var(--red)";}
function showAuthMode(mode){
  authMode=mode;
  const create=mode==="create";
  document.getElementById("loginTabBtn").className=create?"":"primary";
  document.getElementById("createTabBtn").className=create?"primary":"";
  document.getElementById("displayNameWrap").style.display=create?"grid":"none";
  document.getElementById("migrateWrap").style.display=create&&localStorage.getItem("jm_save")?"flex":"none";
  document.getElementById("authSubmitBtn").textContent=create?"Create account":"Sign in";
  const password=document.getElementById("authPassword"),passwordToggle=document.getElementById("authPasswordToggle");
  password.setAttribute("autocomplete",create?"new-password":"current-password");password.type="password";
  passwordToggle.textContent="👁️";passwordToggle.setAttribute("aria-label","Show password");passwordToggle.setAttribute("aria-pressed","false");
  setAuthMessage("");
}
function cloudDisplayName(user,requested=""){
  const metadata=user?.user_metadata||{},fallback=String(user?.email||"Miner").split("@")[0].replace(/[._-]+/g," ");
  return normalizeName(requested||metadata.display_name||metadata.game_profile_name||fallback||"Miner").slice(0,20)||"Miner";
}
function isLegacyOwnerProfile(profile){return !profile?.cloudUserId&&profile?.name?.toLowerCase()===DEVELOPER_NAME.toLowerCase();}
async function loadCloudProfile(session,requestedName=""){
  const user=session?.user;if(!user?.id)throw new Error("The online account did not include a player ID.");
  const verifiedCloudAdmin=await window.languageMinerCloudAuth?.adminStatus?.(session)===true;
  const profiles=readProfiles(),name=cloudDisplayName(user,requestedName);
  const selectedLegacy=verifiedCloudAdmin?profiles.find(isLegacyOwnerProfile):null;
  let profile=selectedLegacy||profiles.find(item=>item.cloudUserId===user.id),attachedExisting=!!selectedLegacy;
  if(selectedLegacy){
    const formerCloudProfile=profiles.find(item=>item.cloudUserId===user.id&&item.id!==selectedLegacy.id);
    if(formerCloudProfile){
      formerCloudProfile.name=`${String(formerCloudProfile.name||"Cloud save").slice(0,13)} Backup`;
      formerCloudProfile.detachedFromCloudAt=Date.now();
      delete formerCloudProfile.cloudUserId;delete formerCloudProfile.email;
    }
    selectedLegacy.cloudUserId=user.id;selectedLegacy.email=user.email||"";
  }
  if(!profile){
    profile={id:`cloud-${user.id}`,name,createdAt:Date.now(),lastPlayed:Date.now()};
    profile.cloudUserId=user.id;profile.email=user.email||"";
    profiles.push(profile);
  }
  profile.name=verifiedCloudAdmin?DEVELOPER_NAME:(profile.name||name);profile.email=user.email||profile.email||"";profile.lastPlayed=Date.now();
  const hadLocalSave=localStorage.getItem(profileStorageKey(profile.id))!=null;
  if(!hadLocalSave){
    let initial=structuredClone(DEFAULT_STATE);
    if(document.getElementById("migrateOldSave").checked&&localStorage.getItem("jm_save")){try{initial=JSON.parse(localStorage.getItem("jm_save"))||initial;}catch{}localStorage.removeItem("jm_save");}
    localStorage.setItem(profileStorageKey(profile.id),JSON.stringify(normalizeState(initial)));
  }
  let remoteRecord=null;cloudSaveRevision=0;
  try{remoteRecord=await window.languageMinerCloudAuth?.loadPlayerSave?.(session)||null;}catch(error){console.warn("Language Miner global saves are awaiting the Supabase player-save migration.",error);}
  if(remoteRecord)applyCloudSaveRecord(remoteRecord,profile);
  writeProfiles(profiles);loadProfile(profile,verifiedCloudAdmin);
  if(!remoteRecord)setTimeout(()=>scheduleCloudSave(0),550);
  if(!hadLocalSave&&!remoteRecord)setTimeout(()=>openPlacementOnboarding(true),120);
  if(attachedExisting)setTimeout(()=>setMessage("Your Language Miner account is now attached to this existing save. Its progress and Patreon access are preserved.","correct"),120);
  return profile;
}
async function submitAuth(){
  const cloud=window.languageMinerCloudAuth,email=document.getElementById("authEmail").value.trim(),password=document.getElementById("authPassword").value,name=normalizeName(document.getElementById("authUsername").value);
  if(!cloud?.enabled?.()){setAuthMessage("Online accounts are not configured yet.");return;}
  if(!/^\S+@\S+\.\S+$/.test(email)){setAuthMessage("Enter a valid email address.");return;}
  if(password.length<8){setAuthMessage("Password must contain at least 8 characters.");return;}
  if(authMode==="create"&&(name.length<2||name.length>20)){setAuthMessage("Player name must contain 2–20 characters.");return;}
  const button=document.getElementById("authSubmitBtn");button.disabled=true;button.textContent=authMode==="create"?"Creating account…":"Signing in…";
  try{const session=authMode==="create"?await cloud.signUp(name,email,password):await cloud.signIn(email,password);await loadCloudProfile(session,authMode==="create"?name:"");document.getElementById("authPassword").value="";}
  catch(error){const message=String(error?.message||"Account access failed.");setAuthMessage(/invalid login credentials/i.test(message)?"Email or password is incorrect.":message);}
  finally{button.disabled=false;button.textContent=authMode==="create"?"Create account":"Sign in";}
}
document.getElementById("loginTabBtn").onclick=()=>showAuthMode("login");
document.getElementById("createTabBtn").onclick=()=>showAuthMode("create");
document.getElementById("authSubmitBtn").onclick=submitAuth;
["authUsername","authEmail","authPassword"].forEach(id=>document.getElementById(id).addEventListener("keydown",e=>{if(e.key==="Enter")submitAuth();}));
document.getElementById("authPasswordToggle").addEventListener("click",()=>{const input=document.getElementById("authPassword"),button=document.getElementById("authPasswordToggle"),visible=input.type==="text";input.type=visible?"password":"text";button.textContent=visible?"👁️":"🙈";button.setAttribute("aria-label",visible?"Show password":"Hide password");button.setAttribute("aria-pressed",String(!visible));input.focus();});
window.languageMinerShowSignIn=async()=>{
  await logout();
};
async function initializeUnifiedAuth(){
  showAuthMode("login");
  const session=await window.languageMinerCloudAuth?.bootstrap?.();
  if(session){await loadCloudProfile(session);return;}
  setAuthOverlayVisible(true);
}
initializeUnifiedAuth();


// Integrated JLPT N5 Mine course v2.1
const N5_KANJI_LIST=`一 二 三 四 五 六 七 八 九 十 百 千 万 円 人 男 女 子 父 母 友 学 校 先 生 年 月 日 時 分 半 今 午 前 後 毎 何 行 来 帰 見 聞 話 読 書 食 飲 買 売 入 出 休 会 社 員 名 山 川 田 水 火 木 金 土 天 気 雨 雪 風 電 車 駅 道 国 外 東 西 南 北 左 右 上 下 中 大 小 高 安 新 古 長 短 白 黒 赤 青 犬 猫 魚 肉 茶 米 花 店 家 室 本 文 字 語 言 力`.split(/\s+/);
const N5_KANJI_INFO={
一:['いち／ひと','one'],二:['に／ふた','two'],三:['さん／み','three'],四:['し・よん／よ','four'],五:['ご／いつ','five'],六:['ろく／む','six'],七:['しち・なな／なな','seven'],八:['はち／や','eight'],九:['きゅう・く／ここの','nine'],十:['じゅう／とお','ten'],百:['ひゃく','hundred'],千:['せん／ち','thousand'],万:['まん','ten thousand'],円:['えん／まる','yen; circle'],人:['じん・にん／ひと','person'],男:['だん／おとこ','man'],女:['じょ／おんな','woman'],子:['し／こ','child'],父:['ふ／ちち','father'],母:['ぼ／はは','mother'],友:['ゆう／とも','friend'],学:['がく／まなぶ','study'],校:['こう','school'],先:['せん／さき','previous; ahead'],生:['せい・しょう／いきる','life; student'],年:['ねん／とし','year'],月:['げつ・がつ／つき','month; moon'],日:['にち・じつ／ひ','day; sun'],時:['じ／とき','time; hour'],分:['ぶん・ふん／わかる','minute; part'],半:['はん','half'],今:['こん／いま','now'],午:['ご','noon'],前:['ぜん／まえ','before; front'],後:['ご・こう／あと','after; behind'],毎:['まい','every'],何:['か／なに・なん','what'],行:['こう・ぎょう／いく','go'],来:['らい／くる','come'],帰:['き／かえる','return'],見:['けん／みる','see'],聞:['ぶん・もん／きく','hear; ask'],話:['わ／はなす','speak; story'],読:['どく／よむ','read'],書:['しょ／かく','write; book'],食:['しょく／たべる','eat; food'],飲:['いん／のむ','drink'],買:['ばい／かう','buy'],売:['ばい／うる','sell'],入:['にゅう／はいる','enter'],出:['しゅつ／でる','exit'],休:['きゅう／やすむ','rest'],会:['かい／あう','meet'],社:['しゃ／やしろ','company'],員:['いん','member; employee'],名:['めい・みょう／な','name'],山:['さん／やま','mountain'],川:['せん／かわ','river'],田:['でん／た','rice field'],水:['すい／みず','water'],火:['か／ひ','fire'],木:['もく・ぼく／き','tree'],金:['きん／かね','gold; money'],土:['ど・と／つち','earth'],天:['てん','heaven; sky'],気:['き','spirit; air'],雨:['う／あめ','rain'],雪:['せつ／ゆき','snow'],風:['ふう／かぜ','wind'],電:['でん','electricity'],車:['しゃ／くるま','vehicle'],駅:['えき','station'],道:['どう／みち','road'],国:['こく／くに','country'],外:['がい／そと','outside'],東:['とう／ひがし','east'],西:['せい・さい／にし','west'],南:['なん／みなみ','south'],北:['ほく／きた','north'],左:['さ／ひだり','left'],右:['う・ゆう／みぎ','right'],上:['じょう／うえ','above'],下:['か・げ／した','below'],中:['ちゅう／なか','inside'],大:['だい・たい／おおきい','big'],小:['しょう／ちいさい','small'],高:['こう／たかい','high; expensive'],安:['あん／やすい','cheap; safe'],新:['しん／あたらしい','new'],古:['こ／ふるい','old'],長:['ちょう／ながい','long'],短:['たん／みじかい','short'],白:['はく／しろ','white'],黒:['こく／くろ','black'],赤:['せき／あか','red'],青:['せい／あお','blue'],犬:['けん／いぬ','dog'],猫:['びょう／ねこ','cat'],魚:['ぎょ／さかな','fish'],肉:['にく','meat'],茶:['ちゃ','tea'],米:['べい・まい／こめ','rice'],花:['か／はな','flower'],店:['てん／みせ','shop'],家:['か・け／いえ','house'],室:['しつ／むろ','room'],本:['ほん／もと','book; origin'],文:['ぶん・もん／ふみ','sentence; writing'],字:['じ／あざ','character'],語:['ご／かたる','language; word'],言:['げん・ごん／いう','say'],力:['りょく・りき／ちから','power']};
while(N5_KANJI_LIST.length<120) N5_KANJI_LIST.push('々');
const N5_GRAMMAR_POINTS=[
['です／だ','polite and plain copula','わたしは学生です。'],['ます','polite present verb','毎日勉強します。'],['ません','polite negative','肉を食べません。'],['ました','polite past','昨日映画を見ました。'],['ませんでした','polite past negative','昨日行きませんでした。'],['は','topic marker','私は学生です。'],['が','subject marker','猫がいます。'],['を','object marker','本を読みます。'],['に','time/destination marker','七時に起きます。'],['へ','direction marker','日本へ行きます。'],['で','place/means marker','電車で行きます。'],['と','with/quotation','友達と話します。'],['の','possession','私の本です。'],['も','also','私も学生です。'],['から','from/because','九時から働きます。'],['まで','until/to','五時までです。'],['か','question particle','学生ですか。'],['ね','seeking agreement','暑いですね。'],['よ','new information','おいしいですよ。'],['これ／それ／あれ','demonstratives','これは本です。'],['この／その／あの','noun demonstratives','この本は新しいです。'],['ここ／そこ／あそこ','place demonstratives','駅はそこです。'],['どれ／どの','which','どの本ですか。'],['だれ','who','だれですか。'],['何','what','何を食べますか。'],['どこ','where','どこへ行きますか。'],['いつ','when','いつ来ますか。'],['どう','how','どうですか。'],['どうやって','by what method','どうやって行きますか。'],['いくら','how much','これはいくらですか。'],['いくつ','how many/old','りんごはいくつですか。'],['～たい','want to do','日本へ行きたいです。'],['～がほしい','want a noun','水がほしいです。'],['～てください','please do','待ってください。'],['～てもいい','may do','見てもいいですか。'],['～てはいけない','must not','ここで泳いではいけません。'],['～ている','ongoing/state','今勉強しています。'],['～てから','after doing','食べてから寝ます。'],['～て、～','sequence','起きて、朝ご飯を食べます。'],['～ないでください','please do not','話さないでください。'],['～ましょう','let us','一緒に行きましょう。'],['～ましょうか','shall I/we','手伝いましょうか。'],['～ませんか','invitation','映画を見ませんか。'],['～ことがある','experience','日本へ行ったことがあります。'],['～ことができる','ability','日本語を話すことができます。'],['potential form','can do','日本語が話せます。'],['～つもり','plan/intention','明日勉強するつもりです。'],['～予定','schedule/plan','来週旅行する予定です。'],['～前に','before doing','寝る前に読みます。'],['～後で','after doing','仕事の後で会います。'],['～時','when','子どもの時、よく泳ぎました。'],['～から','because','暑いから、窓を開けます。'],['～ので','because/softer','雨なので、行きません。'],['～けど／が','but','高いですが、おいしいです。'],['そして','and then','食べました。そして寝ました。'],['それから','after that','それから学校へ行きます。'],['でも','however','でも、今日は忙しいです。'],['～より','than','日本はタイより高いです。'],['～のほうが','more than','犬のほうが好きです。'],['～でいちばん','most in','果物でりんごがいちばん好きです。'],['どちら／どっち','which of two','どちらが好きですか。'],['～と同じ','same as','これはそれと同じです。'],['～くない','i-adjective negative','高くないです。'],['～かった','i-adjective past','おいしかったです。'],['～くなかった','i-adjective past negative','暑くなかったです。'],['～じゃない','na-adjective/noun negative','静かじゃないです。'],['～でした','na-adjective/noun past','元気でした。'],['～じゃなかった','na-adjective/noun past negative','暇じゃなかったです。'],['～くて','i-adjective connection','安くておいしいです。'],['～で','na-adjective connection','静かできれいです。'],['～そう','looks/seems','おいしそうです。'],['とても','very','とても楽しいです。'],['あまり～ない','not very','あまり高くないです。'],['ぜんぜん～ない','not at all','ぜんぜん分かりません。'],['もう','already','もう食べました。'],['まだ','still/not yet','まだ食べていません。'],['よく','often/well','よく映画を見ます。'],['たくさん','many/a lot','水をたくさん飲みます。'],['少し','a little','日本語を少し話します。'],['いつも','always','いつも七時に起きます。'],['時々','sometimes','時々走ります。'],['～くらい／ぐらい','approximately','一時間ぐらいです。'],['～だけ','only','水だけ飲みます。'],['～しか～ない','nothing but','水しかありません。'],['～も','as many as','三時間も勉強しました。'],['～たり～たりする','do things like','読んだり書いたりします。'],['～と思う','I think','いいと思います。'],['～と言う','say/call','先生は「はい」と言いました。'],['～ないといけない','must','勉強しないといけません。'],['～なくてもいい','do not have to','行かなくてもいいです。']
];
const N5_READING_PASSAGES=[
['朝の生活','毎朝七時に起きます。水を飲んで、パンを食べます。八時に家を出て、電車で会社へ行きます。','What does the person drink?','Water'],
['日曜日','日曜日に妻とスーパーへ行きました。野菜と魚を買いました。晩ご飯はとてもおいしかったです。','Who went to the supermarket?','The speaker and his wife'],
['学校','私は日本語の学生です。月曜日から金曜日まで学校で勉強します。先生は親切です。','What does the person study?','Japanese'],
['天気','今日は雨です。少し寒いですから、家で本を読みます。明日は晴れると思います。','Why will the person stay home?','Because it is rainy and cold'],
['駅で','駅で友達を待っています。友達は十分ぐらい遅れています。いっしょに映画を見る予定です。','What are they planning to do?','Watch a movie'],
['買い物','この店のりんごは一つ百円です。私は五つ買いました。全部で五百円でした。','How many apples were bought?','Five'],
['旅行','来月、家族と京都へ行きます。新幹線で行って、二日間ホテルに泊まります。','How long will they stay?','Two days'],
['しゅみ','私のしゅみは釣りです。週末、川へ行きます。魚を釣るのは楽しいです。','What is the hobby?','Fishing'],
['レストラン','このレストランは安くておいしいです。カレーがいちばん人気です。','What is most popular?','Curry'],
['日本語','毎日三十分、漢字と文法を勉強しています。まだ難しいですが、少しずつ分かります。','How long does the person study each day?','Thirty minutes'],
['家族','父は会社員で、母は先生です。兄は大学生です。私は高校生です。','Who is a teacher?','The mother'],
['予定','明日の午前は病院へ行きます。午後は家で休むつもりです。','What will the person do in the afternoon?','Rest at home']
];

function academyItemMastery(id){return Math.max(0,Math.min(100,Number(state.n5AcademyMastery?.[id])||0));}
function academyMaster(id,amount=25){state.n5AcademyMastery[id]=Math.min(100,academyItemMastery(id)+amount);save();renderAcademy();renderAcademySummary();}
function academyCounts(){
 const vocabKnown=Object.keys(state.n5AcademyMastery||{}).filter(k=>k.startsWith('vocab:')&&academyItemMastery(k)>=75).length;
 const kanjiKnown=N5_KANJI_LIST.filter(k=>academyItemMastery('kanji:'+k)>=75).length;
 const grammarKnown=N5_GRAMMAR_POINTS.filter((_,i)=>academyItemMastery('grammar:'+i)>=75).length;
 const readingKnown=N5_READING_PASSAGES.filter((_,i)=>academyItemMastery('reading:'+i)>=75).length;
 const vocabScore=Math.min(100,vocabKnown/1000*100),kanjiScore=kanjiKnown/120*100,grammarScore=grammarKnown/90*100,readingScore=readingKnown/N5_READING_PASSAGES.length*100;
 return {vocabKnown,kanjiKnown,grammarKnown,readingKnown,readiness:Math.round(vocabScore*.35+kanjiScore*.25+grammarScore*.25+readingScore*.15)};
}
function renderAcademySummary(){const c=academyCounts();const set=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v;};set('academyVocabSummary',`${c.vocabKnown}/1000`);set('academyKanjiSummary',`${c.kanjiKnown}/120`);set('academyGrammarSummary',`${c.grammarKnown}/90`);set('academyReadinessSummary',`${c.readiness}%`);}
let academyTab='overview';
function openAcademy(){if(!isStageUnlocked(2)){setMessage('Complete the Katakana Mine requirements to unlock JLPT N5.','wrong');return;}document.getElementById('academyOverlay').classList.add('open');document.getElementById('academyOverlay').setAttribute('aria-hidden','false');renderAcademy();}
function closeAcademy(){document.getElementById('academyOverlay').classList.remove('open');document.getElementById('academyOverlay').setAttribute('aria-hidden','true');}
function progressBar(value){return `<div class="academy-progress"><div style="width:${Math.max(0,Math.min(100,value))}%"></div></div>`;}
function academyCard(id,title,sub,body){const m=academyItemMastery(id);return `<article class="study-card"><div class="study-card-head"><div><strong>${title}</strong><div class="small">${sub}</div></div><span class="badge">${m}%</span></div>${progressBar(m)}<div class="study-card-body">${body}</div><button class="academy-study-btn" data-master-id="${id}" type="button">Study +25%</button></article>`;}
function academyVocabularyBank(){
 return n5CompleteVocabulary.map(([jp,reading,en])=>({jp,reading,en}));
}
function academyFastestRecordsMarkup(){
 const quizRecords=Object.values(state.jlptReviewCheckpoints||{}).map(record=>record?.fastestTimeMs),guardianRecords=Object.values(state.v5?.bossFastestTimes||{}),placement=state.placementResult?.fastestTimeMs;
 const rows=[['Placement test',normalizeAssessmentTimeMs(placement)],['Passing review quiz',fastestAssessmentTime(quizRecords)],['Perfect Guardian test',fastestAssessmentTime(guardianRecords)]];
 return `<section class="academy-fastest-records"><header><span>PERSONAL BESTS</span><h3>Fastest completion records</h3><p>Only successful quiz runs and perfect Guardian tests set competitive records.</p></header><div>${rows.map(([label,time])=>`<article class="assessment-record-summary ${time?'has-record':''}"><span>${label}</span><strong>${assessmentTimeLabel(time)}</strong><small>${time?'Saved on this profile':'Complete an eligible assessment'}</small></article>`).join('')}</div></section>`;
}
function renderAcademy(){
 const box=document.getElementById('academyContent');if(!box)return;document.querySelectorAll('[data-academy-tab]').forEach(b=>b.classList.toggle('primary',b.dataset.academyTab===academyTab));const c=academyCounts();
 if(academyTab==='overview')box.innerHTML=`<div class="n5-hub-actions"><button id="hubEnterMineBtn" class="primary" type="button">⛏️ Enter N5 Mine</button><span class="small">Mine questions update the same vocabulary, kanji, grammar, and reading mastery shown here${tutorAccessGranted()?', including your private Tutor Curriculum':''}.</span></div><div class="academy-metrics"><div><strong>${c.readiness}%</strong><span>Estimated readiness</span></div><div><strong>${c.vocabKnown}</strong><span>Vocabulary mastered</span></div><div><strong>${c.kanjiKnown}</strong><span>Kanji mastered</span></div><div><strong>${c.grammarKnown}</strong><span>Grammar mastered</span></div></div><div class="academy-roadmap">${[['Vocabulary',c.vocabKnown,1000],['Kanji',c.kanjiKnown,120],['Grammar',c.grammarKnown,90],['Reading',c.readingKnown,N5_READING_PASSAGES.length]].map(([n,v,t])=>`<div><div class="progress-label"><span>${n}</span><strong>${v}/${t}</strong></div>${progressBar(v/t*100)}</div>`).join('')}</div><div class="academy-callout"><strong>Recommended next step</strong><p>${c.kanjiKnown<30?'Study the first kanji set and answer its mine questions.':c.grammarKnown<20?'Continue the core grammar path.':'Complete today’s review and try a mini test.'}</p></div>`;
 if(academyTab==='vocabulary'){
  const words=academyVocabularyBank();box.innerHTML=`<div class="academy-toolbar"><strong>Vocabulary course</strong><span>${words.length} reference words currently loaded • progression target: 1,000</span></div><div class="lesson-grid">${Array.from({length:40},(_,i)=>{const start=i*25,end=start+25,known=Object.keys(state.n5AcademyMastery||{}).filter(k=>k.startsWith('vocab:')&&Number(k.split(':')[1])>=start&&Number(k.split(':')[1])<end&&academyItemMastery(k)>=75).length;return `<button class="lesson-button" data-vocab-lesson="${i}" type="button"><strong>Lesson ${i+1}</strong><span>${known}/25 mastered</span>${progressBar(known/25*100)}</button>`}).join('')}</div><div id="vocabLessonWords" class="study-grid"><p class="small">Choose a lesson. Each session contains 25 words from the complete 1,000-word progression.</p></div>`;
 }
 if(academyTab==='kanji')box.innerHTML=`<div class="academy-toolbar"><strong>120 Essential Kanji</strong><span>Tap any kanji for readings, meaning, examples, and mastery.</span></div><div class="kanji-academy-grid">${N5_KANJI_LIST.slice(0,120).map(k=>{const m=academyItemMastery('kanji:'+k);return `<button data-kanji-card="${k}" class="kanji-academy-cell" type="button"><strong>${k}</strong><span>${m}%</span></button>`}).join('')}</div><div id="kanjiDetail"></div>`;
 if(academyTab==='grammar')box.innerHTML=`<div class="academy-toolbar"><strong>90 N5 Grammar Points</strong><span>Reference cards and mine-ready examples.</span></div><div class="study-grid">${N5_GRAMMAR_POINTS.slice(0,90).map((g,i)=>academyCard('grammar:'+i,g[0],g[1],`<p class="jp-example">${g[2]}</p>`)).join('')}</div>`;
 if(academyTab==='reading')box.innerHTML=`<div class="academy-toolbar"><strong>Reading Passage Mine</strong><span>Short passages without automatic furigana.</span></div><div class="study-grid">${N5_READING_PASSAGES.map((p,i)=>academyCard('reading:'+i,p[0],`★${'★'.repeat(Math.min(3,Math.floor(i/4)))}`,`<p class="jp-passage">${p[1]}</p><p><strong>${p[2]}</strong><br>${p[3]}</p>`)).join('')}</div>`;
 if(academyTab==='listening')box.innerHTML=`<div class="academy-toolbar"><strong>Listening Practice</strong><span>Uses your browser’s Japanese speech voice when available.</span></div><div class="study-grid">${N5_READING_PASSAGES.slice(0,8).map((p,i)=>`<article class="study-card"><strong>Listening ${i+1}</strong><p class="jp-passage listening-hidden" id="listenText${i}">${p[1]}</p><button data-speak="${i}" type="button">▶ Play Japanese</button><button data-reveal-listen="${i}" type="button">Reveal text</button></article>`).join('')}</div>`;
 if(academyTab==='review'){const due=[...N5_KANJI_LIST.slice(0,30).map(k=>['kanji:'+k,k]),...N5_GRAMMAR_POINTS.slice(0,20).map((g,i)=>['grammar:'+i,g[0]])].filter(([id])=>academyItemMastery(id)<75).slice(0,12);box.innerHTML=`<div class="academy-toolbar"><strong>Today’s Review</strong><span>${due.length} cards due</span></div><div class="review-list">${due.map(([id,label])=>`<button data-review-id="${id}" type="button"><span>${label}</span><strong>${academyItemMastery(id)}%</strong></button>`).join('')||'<p>Everything due today is mastered. Great work!</p>'}</div>`;}
 if(academyTab==='tests')box.innerHTML=`<div class="academy-test-grid"><article class="study-card"><h3>Mini N5 Test</h3><p>20 mixed vocabulary, kanji, grammar, and reading questions.</p><button data-start-test="20" class="primary" type="button">Start 20-question test</button></article><article class="study-card"><h3>Half N5 Exam</h3><p>50 mixed questions. Best attempted after 50% readiness.</p><button data-start-test="50" type="button">Start 50-question test</button></article><article class="study-card"><h3>Full N5 Simulation</h3><p>100 mixed questions with listening-style prompts.</p><button data-start-test="100" type="button">Start simulation</button></article><article class="study-card"><h3>Best score</h3><p class="big-test-score">${state.academyTestBest}%</p></article></div>${academyFastestRecordsMarkup()}`;
 box.querySelector('#hubEnterMineBtn')?.addEventListener('click',enterN5Mine);
 box.querySelectorAll('[data-master-id]').forEach(b=>b.addEventListener('click',()=>academyMaster(b.dataset.masterId)));
 box.querySelectorAll('[data-vocab-lesson]').forEach(b=>b.addEventListener('click',()=>showVocabLesson(Number(b.dataset.vocabLesson))));
 box.querySelectorAll('[data-kanji-card]').forEach(b=>b.addEventListener('click',()=>showKanjiDetail(b.dataset.kanjiCard)));
 box.querySelectorAll('[data-speak]').forEach(b=>b.addEventListener('click',()=>speakJapanese(N5_READING_PASSAGES[Number(b.dataset.speak)][1])));
 box.querySelectorAll('[data-reveal-listen]').forEach(b=>b.addEventListener('click',()=>document.getElementById('listenText'+b.dataset.revealListen).classList.toggle('listening-hidden')));
 box.querySelectorAll('[data-review-id]').forEach(b=>b.addEventListener('click',()=>academyMaster(b.dataset.reviewId,25)));
 box.querySelectorAll('[data-start-test]').forEach(b=>b.addEventListener('click',()=>startAcademyTest(Number(b.dataset.startTest))));
}
function showVocabLesson(i){const words=academyVocabularyBank().slice(i*25,i*25+25),box=document.getElementById('vocabLessonWords');if(!box)return;box.innerHTML=words.length?words.map((w,j)=>academyCard('vocab:'+(i*25+j),w.jp,w.reading,`<p>${w.en}</p>`)).join(''):`<p class="academy-callout">This lesson is reserved in the 1,000-word progression. Additions to the course bank will populate it without changing player progress.</p>`;box.querySelectorAll('[data-master-id]').forEach(b=>b.addEventListener('click',()=>academyMaster(b.dataset.masterId)));}
function showKanjiDetail(k){const info=N5_KANJI_INFO[k]||['—','repetition mark'];const i=N5_KANJI_LIST.indexOf(k),examples=(typeof n5Vocab!=='undefined'?n5Vocab:[]).filter(x=>x[0].includes(k)).slice(0,4);const box=document.getElementById('kanjiDetail');box.innerHTML=academyCard('kanji:'+k,`<span class="kanji-hero">${k}</span>`,`${i+1} of 120`,`<p><strong>Readings:</strong> ${info[0]}</p><p><strong>Meaning:</strong> ${info[1]}</p><p><strong>Example words:</strong> ${examples.length?examples.map(x=>`${x[0]} (${x[1]}) — ${x[2]}`).join('<br>'):'Reference examples unlock as vocabulary grows.'}</p><p class="small">Stroke-order reference: write top-to-bottom and left-to-right, following standard kanji stroke principles.</p>`);box.querySelector('[data-master-id]').addEventListener('click',()=>academyMaster('kanji:'+k));}

function startAcademyTest(count){const pool=questions.filter(q=>q.stage===2&&questionAllowedForSession(q));if(!pool.length)return;let score=0;for(let i=0;i<count;i++){const q=pool[Math.floor(Math.random()*pool.length)];if(Math.random()<(questionMasteryScore(state.questionStats[q.id])/100*.6+.25))score++;}const pct=Math.round(score/count*100);state.academyTestBest=Math.max(state.academyTestBest,pct);save();alert(`Practice simulation complete: ${score}/${count} (${pct}%).\n\nThis simulation estimates performance from your recorded mastery. Mine questions directly to improve it.`);renderAcademy();}

// Add academy kanji and grammar to the N5 mine question pool.
N5_KANJI_LIST.slice(0,120).forEach((k,i)=>{const info=N5_KANJI_INFO[k]||['—','repetition mark'];addQuestion({stage:2,tier:'intermediate',q:k,concealedPrompt:k,displayChallenge:k,speechText:readingSpeechText(info[0]),prompt:'Choose this kanji’s meaning.',a:info[1],opts:shuffle([info[1],...shuffle(Object.values(N5_KANJI_INFO).map(v=>v[1]).filter(v=>v!==info[1])).slice(0,3)]),help:`${k}: ${info[0]} — ${info[1]}`,kind:'academy-kanji'});});
N5_GRAMMAR_POINTS.slice(0,90).forEach((g,i)=>addQuestion({stage:2,tier:i<30?'beginner':i<65?'intermediate':'advanced',q:g[2],prompt:'Choose the grammar point demonstrated.',a:g[0],opts:shuffle([g[0],...shuffle(N5_GRAMMAR_POINTS.map(x=>x[0]).filter(x=>x!==g[0])).slice(0,3)]),help:`${g[0]}: ${g[1]}`,kind:'academy-grammar'}));
N5_READING_PASSAGES.forEach((p,i)=>addQuestion({stage:2,tier:'advanced',q:p[1],displayChallenge:p[1],prompt:p[2],a:p[3],opts:shuffle([p[3],...shuffle(N5_READING_PASSAGES.map(x=>x[3]).filter(x=>x!==p[3])).slice(0,3)]),help:`${p[0]}: ${p[3]}`,kind:'academy-reading'}));

function enterN5Mine(){if(!isStageUnlocked(2)){setMessage('This mine is still locked.','wrong');return;}closeAcademy();selectStage(2,false);document.getElementById('rock')?.scrollIntoView({behavior:'smooth',block:'center'});}
document.getElementById('enterN5MineBtn')?.addEventListener('click',enterN5Mine);
document.getElementById('openAcademyBtn')?.addEventListener('click',openAcademy);
document.getElementById('closeAcademyBtn')?.addEventListener('click',closeAcademy);
document.getElementById('academyOverlay')?.addEventListener('click',e=>{if(e.target.id==='academyOverlay')closeAcademy();});
document.querySelectorAll('[data-academy-tab]').forEach(b=>b.addEventListener('click',()=>{academyTab=b.dataset.academyTab;renderAcademy();}));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeAcademy();});
const originalRenderV21=render;render=function(){originalRenderV21();try{renderAcademySummary();const section=document.getElementById('n5AcademySection');if(section){const unlocked=isStageUnlocked(2);section.classList.toggle('locked-course',!unlocked);section.querySelectorAll('button').forEach(b=>b.disabled=!unlocked);section.title=unlocked?'N5 Mine course and progression':'Complete Katakana to unlock the N5 Mine course';}}catch(e){console.error('N5 course summary failed',e);}};

// Language Miner v3.0 — fully interactive N5 course
let academyView={lesson:null,word:null,grammar:null,reading:null,quiz:null,preview:null,lessonPreviewComplete:false};
function v3Stars(m){const n=Math.max(0,Math.min(5,Math.ceil(m/20)));return '★'.repeat(n)+'☆'.repeat(5-n);}
function v3Esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function v3VocabId(index){return 'vocab:'+index;}
function v3WordExamples(w){
 const examples={
  '食べる':['パンを食べます。','寿司を食べたいです。'], '飲む':['水を飲みます。','毎朝コーヒーを飲みます。'],
  '行く':['学校へ行きます。','来年、日本へ行きたいです。'], '来る':['友達が家に来ます。','明日、先生が来ます。'],
  '帰る':['六時に家へ帰ります。'], '見る':['映画を見ます。','テレビを見ません。'],
  '聞く':['音楽を聞きます。','先生に聞いてください。'], '話す':['日本語を話します。'],
  '読む':['本を読みます。'], '書く':['名前を書いてください。'], '買う':['店でパンを買います。'],
  '会う':['駅で友達に会います。'], '待つ':['ここで待ってください。'], '歩く':['駅まで歩きます。']
 };
 return examples[w.jp]||[`${w.jp}（${w.reading}）は「${w.en}」という意味です。`];
}
function v3SetMastery(id,delta){state.n5AcademyMastery[id]=Math.max(0,Math.min(100,academyItemMastery(id)+delta));save();renderAcademySummary();}
function v3QuizCard(question,options,answer,onDone){
 academyView.quiz={question,options:shuffle([...options]),answer,onDone};renderAcademy();
}
function v3RenderQuiz(){const q=academyView.quiz;return `<section class="course-focus quiz-focus"><button class="course-back" data-course-back type="button">← Back</button><div class="course-kicker">Quick practice</div><h3>${v3Esc(q.question)}</h3><div class="course-answer-grid">${q.options.map(o=>`<button data-course-answer="${v3Esc(o)}" type="button">${v3Esc(o)}</button>`).join('')}</div><div id="courseQuizFeedback" class="course-feedback"></div></section>`;}
function v3HandleQuizAnswer(value,button){const q=academyView.quiz;if(!q)return;const good=value===q.answer;document.querySelectorAll('[data-course-answer]').forEach(b=>b.disabled=true);button.classList.add(good?'answer-good':'answer-bad');const fb=document.getElementById('courseQuizFeedback');if(fb)fb.innerHTML=good?'✅ Correct! Mastery increased.':`❌ The correct answer is <strong>${v3Esc(q.answer)}</strong>. This wrong answer was added to your Notebook.`;if(!good)window.japaneseMinerRecordWrongAssessment?.({id:`academy-quick:${academyStage}:${q.question}:${q.answer}`,stage:Number(academyStage)||2,q:q.question,prompt:'Course quick practice',a:q.answer,kind:'academy-quiz'},value,'Course Quick Practice');q.onDone?.(good);setTimeout(()=>{academyView.quiz=null;renderAcademy();},850);}
function v3RenderVocabulary(){
 return renderVocabularyCourse(2);
}
function v3RenderGrammar(){
 if(academyView.grammar!==null){const i=academyView.grammar,g=N5_GRAMMAR_POINTS[i],id='grammar:'+i,m=academyItemMastery(id);return `<section class="course-focus"><button class="course-back" data-grammar-back type="button">← Grammar list</button><div class="course-kicker">Grammar ${i+1} of 90</div><h2>${v3Esc(g[0])}</h2><p class="grammar-meaning">${v3Esc(g[1])}</p><div class="mastery-banner"><span>${v3Stars(m)}</span><strong>${m}% mastery</strong></div><article class="grammar-example"><h4>Example</h4><p class="jp-example">${v3Esc(g[2])}</p></article><button data-grammar-quiz="${i}" class="primary wide-action" type="button">Practice this grammar</button></section>`;}
 return `<div class="academy-toolbar"><strong>90 N5 Grammar Points</strong><span>Tap a grammar point for its explanation and practice.</span></div><div class="grammar-list">${N5_GRAMMAR_POINTS.slice(0,90).map((g,i)=>{const m=academyItemMastery('grammar:'+i);return `<button class="grammar-row" data-grammar-index="${i}" type="button"><span><strong>${v3Esc(g[0])}</strong><small>${v3Esc(g[1])}</small></span><span>${v3Stars(m)} <small>${m}%</small></span></button>`}).join('')}</div>`;
}
function v3RenderReading(){
 if(academyView.reading!==null){const i=academyView.reading,p=N5_READING_PASSAGES[i],id='reading:'+i,m=academyItemMastery(id);return `<section class="course-focus"><button class="course-back" data-reading-back type="button">← Reading list</button><div class="course-kicker">Reading ${i+1}</div><h2>${v3Esc(p[0])}</h2><p class="jp-passage reading-card-text">${v3Esc(p[1])}</p><div class="mastery-banner"><span>${v3Stars(m)}</span><strong>${m}% mastery</strong></div><article class="grammar-example"><h4>Comprehension question</h4><p>${v3Esc(p[2])}</p></article><button data-reading-quiz="${i}" class="primary wide-action" type="button">Answer question</button></section>`;}
 return `<div class="academy-toolbar"><strong>Reading practice</strong><span>Tap a passage to read it and answer a comprehension question.</span></div><div class="reading-list">${N5_READING_PASSAGES.map((p,i)=>`<button data-reading-index="${i}" type="button"><strong>${v3Esc(p[0])}</strong><span>${v3Stars(academyItemMastery('reading:'+i))}</span></button>`).join('')}</div>`;
}
function v3RenderReview(){const words=academyVocabularyBank();const due=[...words.map((w,i)=>({id:v3VocabId(i),label:w.jp,sub:w.en,type:'word',index:i})),...N5_KANJI_LIST.slice(0,120).map(k=>({id:'kanji:'+k,label:k,sub:N5_KANJI_INFO[k]?.[1]||'',type:'kanji',index:k})),...N5_GRAMMAR_POINTS.slice(0,90).map((g,i)=>({id:'grammar:'+i,label:g[0],sub:g[1],type:'grammar',index:i}))].filter(x=>academyItemMastery(x.id)<75).sort((a,b)=>academyItemMastery(a.id)-academyItemMastery(b.id)).slice(0,20);return `<div class="academy-toolbar"><strong>Today's Review</strong><span>${due.length} priority cards</span></div><p class="course-instruction">Items with the lowest mastery appear first. Tap one to review it.</p><div class="review-list">${due.map(x=>`<button data-review-type="${x.type}" data-review-index="${x.index}" type="button"><span><strong>${v3Esc(x.label)}</strong><small>${v3Esc(x.sub)}</small></span><b>${academyItemMastery(x.id)}%</b></button>`).join('')||'<p>Everything is mastered for today.</p>'}</div>`;}
const renderAcademyV2=renderAcademy;
renderAcademy=function(){
 const box=document.getElementById('academyContent');if(!box)return;document.querySelectorAll('[data-academy-tab]').forEach(b=>b.classList.toggle('primary',b.dataset.academyTab===academyTab));
 if(academyView.quiz){box.innerHTML=v3RenderQuiz();}
 else if(academyTab==='vocabulary')box.innerHTML=v3RenderVocabulary();
 else if(academyTab==='grammar')box.innerHTML=v3RenderGrammar();
 else if(academyTab==='reading')box.innerHTML=v3RenderReading();
 else if(academyTab==='review')box.innerHTML=v3RenderReview();
 else {renderAcademyV2();return;}
 box.onclick=e=>{
  const t=e.target.closest('button');if(!t)return;
  if(handleVocabularyCourseAction(t,academyStage))return;
  if(t.matches('[data-grammar-index]')){academyView.grammar=Number(t.dataset.grammarIndex);renderAcademy();}
  else if(t.matches('[data-grammar-back]')){academyView.grammar=null;renderAcademy();}
  else if(t.matches('[data-grammar-quiz]')){const i=Number(t.dataset.grammarQuiz),g=N5_GRAMMAR_POINTS[i],wrong=shuffle(N5_GRAMMAR_POINTS.filter((_,j)=>j!==i).map(x=>x[0])).slice(0,3);v3QuizCard(`Which grammar point is used in: ${g[2]}`,[g[0],...wrong],g[0],good=>v3SetMastery('grammar:'+i,good?25:-5));}
  else if(t.matches('[data-reading-index]')){academyView.reading=Number(t.dataset.readingIndex);renderAcademy();}
  else if(t.matches('[data-reading-back]')){academyView.reading=null;renderAcademy();}
  else if(t.matches('[data-reading-quiz]')){const i=Number(t.dataset.readingQuiz),p=N5_READING_PASSAGES[i],wrong=shuffle(N5_READING_PASSAGES.filter((_,j)=>j!==i).map(x=>x[3])).slice(0,3);v3QuizCard(p[2],[p[3],...wrong],p[3],good=>v3SetMastery('reading:'+i,good?25:-5));}
  else if(t.matches('[data-course-answer]'))v3HandleQuizAnswer(t.dataset.courseAnswer,t);
  else if(t.matches('[data-course-back]')){academyView.quiz=null;renderAcademy();}
  else if(t.matches('[data-review-type]')){const type=t.dataset.reviewType,index=t.dataset.reviewIndex;if(type==='word'){academyTab='vocabulary';academyView.lesson=Math.floor(Number(index)/25);academyView.word=Number(index);}else if(type==='grammar'){academyTab='grammar';academyView.grammar=Number(index);}else{academyTab='kanji';renderAcademyV2();setTimeout(()=>showKanjiDetail(index),0);return;}renderAcademy();}
 };
};

// Connect N5 mine answers to the same Academy mastery records.
const answerV2=answer;
answer=function(opt,button){const q=state.active,correct=q&&opt===q.a;answerV2(opt,button);if(!q||Number(q.stage)!==2)return;if(q.vocabularyKey)recordVocabularyQuestionMastery(q,correct);let id=null;if(q.kind==='academy-kanji')id='kanji:'+q.q;if(q.kind==='academy-grammar'){const i=N5_GRAMMAR_POINTS.findIndex(g=>g[0]===q.a);if(i>=0)id='grammar:'+i;}if(q.kind==='academy-reading'){const i=N5_READING_PASSAGES.findIndex(p=>p[1]===q.q);if(i>=0)id='reading:'+i;}if(id){v3SetMastery(id,correct?10:-3);}}

// v3.1 New-player onboarding and interactive placement test
const PLACEMENT_TEST_QUESTIONS=[
  {section:'hiragana',prompt:'Choose the sound for this hiragana.',display:'あ',answer:'a',options:['a','i','u','e']},
  {section:'hiragana',prompt:'Choose the sound for this hiragana.',display:'き',answer:'ki',options:['ka','ki','ku','ke']},
  {section:'hiragana',prompt:'Choose the hiragana for “su”.',display:'su',answer:'す',options:['さ','し','す','せ']},
  {section:'hiragana',prompt:'Choose the sound for this hiragana.',display:'ね',answer:'ne',options:['na','ni','nu','ne']},
  {section:'hiragana',prompt:'Choose the hiragana for “yo”.',display:'yo',answer:'よ',options:['や','ゆ','よ','わ']},
  {section:'hiragana',prompt:'Choose the sound for this hiragana.',display:'ん',answer:'n',options:['n','mu','ru','wo']},
  {section:'katakana',prompt:'Choose the sound for this katakana.',display:'ア',answer:'a',options:['a','i','u','o']},
  {section:'katakana',prompt:'Choose the sound for this katakana.',display:'ケ',answer:'ke',options:['ka','ki','ku','ke']},
  {section:'katakana',prompt:'Choose the katakana for “shi”.',display:'shi',answer:'シ',options:['サ','シ','ス','セ']},
  {section:'katakana',prompt:'Choose the sound for this katakana.',display:'ト',answer:'to',options:['ta','te','to','do']},
  {section:'katakana',prompt:'Choose the katakana for “me”.',display:'me',answer:'メ',options:['マ','ミ','ム','メ']},
  {section:'katakana',prompt:'Choose the sound for this katakana.',display:'ン',answer:'n',options:['so','shi','n','no']},
  {section:'n5',prompt:'What does this word mean?',display:'食べる',answer:'to eat',options:['to eat','to drink','to read','to sleep']},
  {section:'n5',prompt:'Choose the correct reading.',display:'学校',answer:'がっこう',options:['がっこう','がくせい','せんせい','かいしゃ']},
  {section:'n5',prompt:'Which particle completes the sentence? わたし___学生です。',display:'わたし ___ 学生です。',answer:'は',options:['は','を','で','に']},
  {section:'n5',prompt:'Which particle marks the destination?',display:'日本___行きます。',answer:'へ',options:['へ','を','と','が']},
  {section:'n5',prompt:'What does this sentence mean?',display:'水を飲みます。',answer:'I drink water.',options:['I drink water.','I buy water.','I see water.','I want water.']},
  {section:'n5',prompt:'Choose the polite past form of 食べる.',display:'食べる → ?',answer:'食べました',options:['食べました','食べます','食べません','食べたい']},
  {section:'n5',prompt:'Choose the correct expression for “I want to go.”',display:'I want to go.',answer:'行きたいです。',options:['行きたいです。','行きました。','行きません。','行ってください。']},
  {section:'n5',prompt:'What does this kanji mean?',display:'雨',answer:'rain',options:['rain','snow','wind','sky']},
  {section:'n5',prompt:'Choose the correct negative form.',display:'高い → not expensive',answer:'高くないです',options:['高くないです','高いでした','高くです','高かったです']},
  {section:'n5',prompt:'Read the sentence and answer: 毎朝七時に起きます。',display:'What time does the person wake up?',answer:'7:00 every morning',options:['7:00 every morning','8:00 every morning','7:00 tonight','At noon']},
  {section:'n5',prompt:'Choose the correct meaning.',display:'昨日',answer:'yesterday',options:['yesterday','today','tomorrow','every day']},
  {section:'n5',prompt:'Which sentence means “Please wait”?',display:'Please wait.',answer:'待ってください。',options:['待ってください。','待ちたいです。','待ちません。','待ちました。']}
];
let placementSession=null;
function placementOverlay(){return document.getElementById('placementOverlay');}
function placementTestAlreadyCompleted(){return state.placementTestCompleted===true;}
function syncPlacementTestButton(){
  const button=document.getElementById('placementTestBtn');
  if(!button)return;
  const completed=placementTestAlreadyCompleted();
  button.disabled=completed;
  button.textContent=completed?'🧭 Placement Complete':'🧭 Placement Test';
  button.title=completed?'The placement test can only be completed once per player save.':'Take your one-time placement test.';
}
function openPlacementOnboarding(required=false){
  if(!activeProfileId)return;
  if(!required&&placementTestAlreadyCompleted()){setMessage('The placement test has already been completed for this player save.','');syncPlacementTestButton();return false;}
  placementSession={required,index:0,answers:[],missed:[],locked:false,mode:'choice'};
  const close=document.getElementById('placementCloseBtn');
  if(close) close.hidden=required;
  placementOverlay().classList.add('open');
  placementOverlay().setAttribute('aria-hidden','false');
  renderPlacementChoice();
  return true;
}
function closePlacementOnboarding(){
  if(placementSession?.required && !state.onboardingComplete)return;
  placementOverlay().classList.remove('open');
  placementOverlay().setAttribute('aria-hidden','true');
  placementSession=null;
}
function renderPlacementChoice(){
  const box=document.getElementById('placementContent');
  box.innerHTML=`<p>Tell us how much Japanese you already know. Your answer only chooses a starting point—you can still study every earlier lesson whenever you like.</p>
  <div class="placement-choice-grid">
    <button id="brandNewChoice" class="placement-choice primary" type="button"><span class="choice-icon">🌱</span><strong>I’m brand new</strong><span>Start with Hiragana and learn from the very beginning of Language Miner.</span></button>
    <button id="placementChoice" class="placement-choice" type="button"><span class="choice-icon">🧭</span><strong>I already know some Japanese</strong><span>Take a 24-question placement test covering Hiragana, Katakana, and beginner N5 material.</span></button>
  </div>
  <div class="placement-note"><strong>Placement does not skip content permanently.</strong> It unlocks the most suitable mine and adjusts reading support and N5 difficulty.</div>`;
  document.getElementById('brandNewChoice').addEventListener('click',chooseBrandNew);
  document.getElementById('placementChoice').addEventListener('click',startPlacementTest);
}
function chooseBrandNew(){
  state.onboardingComplete=true;
  state.placementResult={date:Date.now(),route:'hiragana',hiragana:0,katakana:0,n5:0};
  state.selectedStage=0;state.supportMode='guided';state.n5Tier='beginner';state.active=null;state.answered=false;
  save();render();
  placementSession.required=false;
  document.getElementById('placementContent').innerHTML=`<div class="placement-results"><div class="placement-recommendation"><h3>🌱 Start in the Hiragana Mine</h3><p>You’ll begin with the 46 basic Hiragana characters, build mastery through mining questions, and unlock Katakana when you are ready.</p></div><div class="placement-result-actions"><button id="beginJourneyBtn" class="primary" type="button">Begin Hiragana</button></div></div>`;
  document.getElementById('beginJourneyBtn').addEventListener('click',()=>{closePlacementOnboarding();document.getElementById('rock')?.scrollIntoView({behavior:'smooth',block:'center'});});
}
function randomizePlacementTest(){
  const randomized=shuffle([...PLACEMENT_TEST_QUESTIONS]);
  PLACEMENT_TEST_QUESTIONS.splice(0,PLACEMENT_TEST_QUESTIONS.length,...randomized);
  PLACEMENT_TEST_QUESTIONS.forEach(question=>{question.options=shuffle([...question.options]);});
}
function startPlacementTest(){
  if(placementTestAlreadyCompleted()){setMessage('The placement test has already been completed for this player save.','');syncPlacementTestButton();return false;}
  randomizePlacementTest();
  placementSession.index=0;placementSession.answers=[];placementSession.missed=[];placementSession.locked=false;placementSession.mode='test';placementSession.startedAt=Date.now();
  renderPlacementQuestion();
  return true;
}
function renderPlacementQuestion(){
  const q=PLACEMENT_TEST_QUESTIONS[placementSession.index];
  const box=document.getElementById('placementContent');
  const pct=Math.round(placementSession.index/PLACEMENT_TEST_QUESTIONS.length*100);
  const sectionName=q.section==='hiragana'?'Hiragana':q.section==='katakana'?'Katakana':'JLPT N5';
  box.innerHTML=`<div class="placement-progress-label"><span>${sectionName}</span><strong>Question ${placementSession.index+1} of ${PLACEMENT_TEST_QUESTIONS.length}</strong></div>${progressBar(pct)}
  <div class="placement-question"><h3>${v3Esc(q.prompt)}</h3><div class="jp-test">${v3Esc(q.display)}</div><div class="placement-options">${q.options.map((o,i)=>`<button type="button" data-place-answer="${i}">${v3Esc(o)}</button>`).join('')}</div><button id="placementSkipBtn" class="placement-skip" type="button">Skip — I don’t know</button><div id="placementFeedback" class="placement-feedback" aria-live="polite"></div><button id="placementNextBtn" class="placement-next primary" type="button" hidden>${placementSession.index===PLACEMENT_TEST_QUESTIONS.length-1?'See my result':'Next question'}</button></div>`;
  box.querySelectorAll('[data-place-answer]').forEach(btn=>btn.addEventListener('click',()=>answerPlacementQuestion(Number(btn.dataset.placeAnswer))));
  document.getElementById('placementSkipBtn').addEventListener('click',()=>answerPlacementQuestion(-1,true));
}
function answerPlacementQuestion(optionIndex,skipped=false){
  if(placementSession.locked)return;
  placementSession.locked=true;
  const q=PLACEMENT_TEST_QUESTIONS[placementSession.index];
  const choice=q.options[optionIndex];const correct=choice===q.answer;
  placementSession.answers.push({section:q.section,correct});
  if(!correct&&!skipped){
    const sectionStage={hiragana:0,katakana:1,n5:2,n4:3,n3:4,n2:5,n1:6};
    const resultQuestion={id:`placement:${q.section}:${q.display}:${q.prompt}`,stage:sectionStage[q.section]??0,q:q.display,prompt:q.prompt,a:q.answer,kind:'placement-test'};
    const missed=window.japaneseMinerRecordWrongAssessment?.(resultQuestion,choice,'Placement Test');
    if(missed)placementSession.missed.push(missed);
  }
  const buttons=[...document.querySelectorAll('[data-place-answer]')];
  buttons.forEach((b,i)=>{b.disabled=true;if(q.options[i]===q.answer)b.classList.add('correct');else if(i===optionIndex)b.classList.add('wrong');});
  const skip=document.getElementById('placementSkipBtn');if(skip)skip.disabled=true;
  document.getElementById('placementFeedback').textContent=skipped?`Skipped. The correct answer is ${q.answer}.`:correct?'✓ Correct':`Not quite. The correct answer is ${q.answer}.`;
  const next=document.getElementById('placementNextBtn');next.hidden=false;next.addEventListener('click',()=>{placementSession.index++;placementSession.locked=false;if(placementSession.index>=PLACEMENT_TEST_QUESTIONS.length)finishPlacementTest();else renderPlacementQuestion();},{once:true});
}
function placementSectionScore(section){
  const rows=placementSession.answers.filter(a=>a.section===section);return rows.length?Math.round(rows.filter(a=>a.correct).length/rows.length*100):0;
}
function grantKanaPlacement(set,stageIndexValue){
  set.forEach(([char])=>{state.kanaStats[char]={attempts:25,correct:25};});
  state.stageXp[stageIndexValue]=Math.max(Number(state.stageXp[stageIndexValue]||0),STAGE_XP_REQUIREMENTS[stageIndexValue]);
  if(!state.clearedStages.includes(stageIndexValue))state.clearedStages.push(stageIndexValue);
  if(stageIndexValue===0)state.hiraganaXp=state.stageXp[0];
}
function finishPlacementTest(){
  const hiraScore=placementSectionScore('hiragana'),kataScore=placementSectionScore('katakana'),n5Score=placementSectionScore('n5');
  let route='hiragana',title='Start in the Hiragana Mine',description='Your results suggest reviewing Hiragana from the beginning. The game will provide full reading support.';
  if(hiraScore>=70){
    grantKanaPlacement(hira,0);route='katakana';title='Start in the Katakana Mine';description='You demonstrated solid Hiragana recognition. Katakana is the best starting point, while Hiragana remains available for review.';
  }
  if(hiraScore>=70&&kataScore>=70){
    grantKanaPlacement(kata,1);route='n5';title='Start in the JLPT N5 Mine';description='You demonstrated solid Kana recognition. You can begin N5 vocabulary, kanji, grammar, reading, and listening while reviewing Kana whenever needed.';
  }
  state.selectedStage=route==='n5'?2:route==='katakana'?1:0;
  if(route==='n5'){
    state.n5Tier=n5Score>=75?'advanced':n5Score>=45?'intermediate':'beginner';
    state.supportMode=n5Score>=75?'challenge':n5Score>=45?'standard':'guided';
  }else state.supportMode='guided';
  state.onboardingComplete=true;state.placementTestCompleted=true;state.active=null;state.answered=false;
  state.placementResult={date:Date.now(),route,hiragana:hiraScore,katakana:kataScore,n5:n5Score};
  save();render();placementSession.required=false;
  document.getElementById('placementCloseBtn').hidden=false;
  document.getElementById('placementContent').innerHTML=`<div class="placement-results"><div class="placement-score-grid"><div class="placement-score"><strong>${hiraScore}%</strong><span>Hiragana</span></div><div class="placement-score"><strong>${kataScore}%</strong><span>Katakana</span></div><div class="placement-score"><strong>${n5Score}%</strong><span>JLPT N5</span></div></div><div class="placement-recommendation"><h3>🧭 ${title}</h3><p>${description}</p></div><div class="placement-note">This one-time placement result is now saved. Reading support: <strong>${state.supportMode}</strong>.</div><div class="placement-result-actions"><button id="acceptPlacementBtn" class="primary" type="button">Begin at ${route==='n5'?'JLPT N5':route==='katakana'?'Katakana':'Hiragana'}</button></div></div>`;
  document.getElementById('acceptPlacementBtn').addEventListener('click',()=>{closePlacementOnboarding();document.getElementById('rock')?.scrollIntoView({behavior:'smooth',block:'center'});});
  syncPlacementTestButton();
}
document.getElementById('placementCloseBtn')?.addEventListener('click',closePlacementOnboarding);
document.getElementById('placementTestBtn')?.addEventListener('click',()=>openPlacementOnboarding(false));
placementOverlay()?.addEventListener('click',e=>{if(e.target===placementOverlay())closePlacementOnboarding();});

// Existing profiles created before v3.1 are not forced through onboarding.
const originalLoadProfileV31=loadProfile;
loadProfile=function(profile,...args){
  const result=originalLoadProfileV31(profile,...args);
  if(state.onboardingComplete===false && profile.createdAt && profile.createdAt<Date.now()-30000){
    state.onboardingComplete=true;save();
  }else if(state.onboardingComplete===false){
    setTimeout(()=>openPlacementOnboarding(true),140);
  }
  return result;
};

// v3.2 — Persistent study calendar
let studyCalendarMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
function normalizeStudyDates(){
  state.studyDates=studyDateKeys(state);
  state.practiceStreak=calculatePracticeStreak(state);
}
function totalStudyDays(){ normalizeStudyDates(); return state.studyDates.length; }
function openStudyCalendar(){
  normalizeStudyDates();
  studyCalendarMonth = new Date(new Date().getFullYear(),new Date().getMonth(),1);
  const overlay=document.getElementById('studyCalendarOverlay');
  overlay.classList.add('open'); overlay.setAttribute('aria-hidden','false');
  renderStudyCalendar();
}
function closeStudyCalendar(){
  const overlay=document.getElementById('studyCalendarOverlay');
  overlay.classList.remove('open'); overlay.setAttribute('aria-hidden','true');
}
function renderStudyCalendar(){
  normalizeStudyDates();
  const year=studyCalendarMonth.getFullYear(), month=studyCalendarMonth.getMonth();
  const firstDay=new Date(year,month,1).getDay();
  const daysInMonth=new Date(year,month+1,0).getDate();
  const today=dateKey(); const studied=new Set(state.studyDates);
  const monthPrefix=`${year}-${String(month+1).padStart(2,'0')}-`;
  document.getElementById('calendarMonthLabel').textContent=studyCalendarMonth.toLocaleDateString(undefined,{month:'long',year:'numeric'});
  document.getElementById('calendarCurrentStreak').textContent=state.practiceStreak;
  document.getElementById('calendarTotalDays').textContent=state.studyDates.length;
  document.getElementById('calendarMonthDays').textContent=state.studyDates.filter(d=>d.startsWith(monthPrefix)).length;
  const grid=document.getElementById('studyCalendarGrid'); grid.innerHTML='';
  for(let i=0;i<firstDay;i++){const blank=document.createElement('span');blank.className='calendar-day empty';grid.appendChild(blank);}
  for(let day=1;day<=daysInMonth;day++){
    const key=`${monthPrefix}${String(day).padStart(2,'0')}`;
    const btn=document.createElement('button');btn.type='button';btn.className='calendar-day';btn.textContent=day;
    if(studied.has(key)){btn.classList.add('studied');btn.insertAdjacentHTML('beforeend','<span class="check">✓</span>');}
    if(key===today)btn.classList.add('today');
    if(dayDifference(today,key)>0)btn.classList.add('future');
    btn.setAttribute('aria-label',`${key}: ${studied.has(key)?'studied':'no study recorded'}`);
    btn.addEventListener('click',()=>{
      grid.querySelectorAll('.selected').forEach(x=>x.classList.remove('selected'));btn.classList.add('selected');
      const label=new Date(key+'T12:00:00').toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric',year:'numeric'});
      document.getElementById('calendarDayDetail').innerHTML=studied.has(key)?`<strong>✅ ${label}</strong><br>You studied Japanese with Language Miner on this day.`:`<strong>${label}</strong><br>${dayDifference(today,key)>0?'This day has not happened yet.':'No completed practice was recorded on this day.'}`;
    });
    grid.appendChild(btn);
  }
  // A normal calendar can browse both past and future months. Future dates stay
  // visually muted and cannot create study history until they actually occur.
  document.getElementById('calendarNextMonth').disabled = false;
}
function refreshStudyCalendarCounters(){
  normalizeStudyDates();
  const mini=document.getElementById('totalStudyDaysMini'); if(mini)mini.textContent=state.studyDates.length;
  if(document.getElementById('studyCalendarOverlay')?.classList.contains('open'))renderStudyCalendar();
}
document.getElementById('studyCalendarBtn')?.addEventListener('click',openStudyCalendar);
document.getElementById('closeStudyCalendarBtn')?.addEventListener('click',closeStudyCalendar);
document.getElementById('studyCalendarOverlay')?.addEventListener('click',e=>{if(e.target.id==='studyCalendarOverlay')closeStudyCalendar();});
document.getElementById('calendarPrevMonth')?.addEventListener('click',()=>{studyCalendarMonth=new Date(studyCalendarMonth.getFullYear(),studyCalendarMonth.getMonth()-1,1);renderStudyCalendar();});
document.getElementById('calendarNextMonth')?.addEventListener('click',()=>{const next=new Date(studyCalendarMonth.getFullYear(),studyCalendarMonth.getMonth()+1,1),now=new Date();if(next<=new Date(now.getFullYear(),now.getMonth(),1)){studyCalendarMonth=next;renderStudyCalendar();}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.getElementById('studyCalendarOverlay')?.classList.contains('open'))closeStudyCalendar();});

// Extend existing functions without altering the learning logic.
const originalNormalizeStateV32=normalizeState;
normalizeState=function(raw){const next=originalNormalizeStateV32(raw);next.studyDates=studyDateKeys(next);const recordedDates=next.studyDates.filter(key=>dayDifference(key,dateKey())>=0);next.lastPracticeDate=recordedDates[recordedDates.length-1]||null;next.practiceStreak=calculatePracticeStreak(next);return next;};
const originalMarkPracticeTodayV32=markPracticeToday;
markPracticeToday=function(){originalMarkPracticeTodayV32();normalizeStudyDates();refreshStudyCalendarCounters();};
const originalRenderV32=render;
render=function(){normalizeStudyDates();originalRenderV32();refreshStudyCalendarCounters();};

// v3.4 — Full JLPT course hubs (N4–N1), expanded placement test, and score rewards
const JLPT_COURSES={
  3:{label:'N4',vocabTarget:1500,kanjiTarget:300,grammarTarget:170,
    vocab:[['予定','よてい','plan / schedule'],['必要','ひつよう','necessary'],['準備','じゅんび','preparation'],['説明','せつめい','explanation'],['約束','やくそく','promise / appointment'],['経験','けいけん','experience'],['生活','せいかつ','daily life'],['最近','さいきん','recently'],['特別','とくべつ','special'],['十分','じゅうぶん','enough'],['連絡','れんらく','contact'],['理由','りゆう','reason'],['文化','ぶんか','culture'],['習慣','しゅうかん','custom / habit'],['途中','とちゅう','on the way'],['場合','ばあい','case / situation'],['間違える','まちがえる','to make a mistake'],['続ける','つづける','to continue'],['決める','きめる','to decide'],['直す','なおす','to fix']],
    kanji:[['予','ヨ','beforehand'],['定','テイ','decide'],['必','ヒツ','certain'],['要','ヨウ','need'],['準','ジュン','standard'],['備','ビ','prepare'],['説','セツ','explain'],['約','ヤク','promise'],['束','ソク','bundle'],['経','ケイ','pass through'],['験','ケン','test'],['活','カツ','activity'],['最','サイ','most'],['近','キン・ちかい','near'],['特','トク','special'],['別','ベツ・わかれる','separate'],['連','レン','connect'],['絡','ラク・からむ','entangle'],['由','ユ・よし','reason'],['化','カ・ばける','change']],
    grammar:[['～ながら','while doing','音楽を聞きながら勉強します。'],['～そうです','looks like / I heard','雨が降りそうです。'],['～てしまう','finish / regretfully do','宿題を忘れてしまいました。'],['～ようになる','come to be able to','日本語が話せるようになりました。'],['～ことにする','decide to','毎日走ることにしました。'],['～ために','in order to','試験に合格するために勉強します。'],['～かもしれない','might','明日は雪かもしれません。'],['～はずです','should be','田中さんはもう着いたはずです。'],['～ても','even if','雨が降っても行きます。'],['～し','and / because','この店は安いし、おいしいです。'],['～ば','if','時間があれば行きます。'],['～のに','although','勉強したのに忘れました。']],
    reading:[['週末の予定','土曜日は友達と映画を見る予定です。しかし、雨が降ったら家で料理をします。','雨が降った場合、何をしますか。','家で料理をします。'],['新しい仕事','来月から新しい会社で働くことになりました。通勤時間は長くなりますが、仕事は面白そうです。','来月、何が変わりますか。','新しい会社で働きます。'],['健康のために','健康のために、毎朝三十分歩くようにしています。忙しい日でも少しだけ外に出ます。','毎朝何をしますか。','三十分歩きます。'],['忘れ物','駅に着いてから、財布を家に忘れたことに気づきました。しかたがないので家に戻りました。','なぜ家に戻りましたか。','財布を忘れたからです。']]},
  4:{label:'N3',vocabTarget:3750,kanjiTarget:650,grammarTarget:250,
    vocab:[['影響','えいきょう','influence'],['状況','じょうきょう','situation'],['確認','かくにん','confirmation'],['判断','はんだん','judgment'],['解決','かいけつ','solution'],['提案','ていあん','proposal'],['参加','さんか','participation'],['増加','ぞうか','increase'],['減少','げんしょう','decrease'],['目的','もくてき','purpose'],['結果','けっか','result'],['関係','かんけい','relationship'],['能力','のうりょく','ability'],['方法','ほうほう','method'],['環境','かんきょう','environment'],['比較','ひかく','comparison'],['適切','てきせつ','appropriate'],['実際','じっさい','actually'],['具体的','ぐたいてき','concrete / specific'],['一般的','いっぱんてき','general']],
    kanji:[['影','エイ','shadow'],['響','キョウ','echo / effect'],['状','ジョウ','condition'],['況','キョウ','situation'],['確','カク','certain'],['認','ニン','recognize'],['判','ハン','judge'],['断','ダン','cut / decide'],['解','カイ・とく','solve'],['決','ケツ・きめる','decide'],['提','テイ','present'],['案','アン','plan'],['参','サン・まいる','participate'],['加','カ・くわえる','add'],['増','ゾウ・ふえる','increase'],['減','ゲン・へる','decrease'],['目','モク・め','eye / item'],['的','テキ・まと','target'],['関','カン・せき','relation'],['係','ケイ・かかり','connection']],
    grammar:[['～わけではない','it does not mean that','嫌いなわけではありません。'],['～ことになっている','it is arranged that','会議は九時に始まることになっています。'],['～によると','according to','ニュースによると、台風が来るそうです。'],['～に対して','toward / in contrast to','この意見に対して質問があります。'],['～ばかり','nothing but / just did','彼はゲームばかりしています。'],['～おかげで','thanks to','先生のおかげで合格できました。'],['～せいで','because of (negative)','雨のせいで試合が中止になりました。'],['～たびに','every time','この歌を聞くたびに故郷を思い出します。'],['～ほど','to the extent','歩けないほど疲れました。'],['～に違いない','must be','あの人は先生に違いありません。'],['～として','as','留学生として日本に来ました。'],['～につれて','as / in proportion','年を取るにつれて考え方が変わります。']],
    reading:[['働き方の変化','最近、家で働く人が増えています。通勤時間がなくなる一方で、仕事と生活を分けにくいという問題もあります。','家で働くことの問題は何ですか。','仕事と生活を分けにくいことです。'],['地域の活動','町では毎月、住民が公園を掃除する活動を行っています。参加者が増えたおかげで、公園は以前よりきれいになりました。','公園がきれいになった理由は何ですか。','参加者が増えたからです。'],['買い物の方法','インターネットで買い物をする人が増えています。便利ですが、実物を確認できないため、返品が必要になる場合もあります。','インターネット shopping の欠点は何ですか。','実物を確認できないことです。'],['学習計画','目標を達成するには、具体的な計画を立て、定期的に進み方を確認することが大切です。','目標達成に大切なことは何ですか。','計画を立てて進み方を確認することです。']]},
  5:{label:'N2',vocabTarget:6000,kanjiTarget:1000,grammarTarget:300,
    vocab:[['課題','かだい','issue / assignment'],['傾向','けいこう','tendency'],['制度','せいど','system'],['対策','たいさく','countermeasure'],['実施','じっし','implementation'],['対象','たいしょう','target / subject'],['評価','ひょうか','evaluation'],['維持','いじ','maintenance'],['改善','かいぜん','improvement'],['責任','せきにん','responsibility'],['現象','げんしょう','phenomenon'],['資源','しげん','resources'],['効率','こうりつ','efficiency'],['需要','じゅよう','demand'],['供給','きょうきゅう','supply'],['方針','ほうしん','policy'],['条件','じょうけん','condition'],['範囲','はんい','range'],['背景','はいけい','background'],['成果','せいか','achievement']],
    kanji:[['課','カ','section / lesson'],['題','ダイ','topic'],['傾','ケイ・かたむく','incline'],['向','コウ・むく','direction'],['制','セイ','control'],['度','ド・たび','degree'],['対','タイ','opposite'],['策','サク','plan'],['実','ジツ・み','reality'],['施','シ・ほどこす','carry out'],['象','ショウ','phenomenon'],['評','ヒョウ','evaluate'],['価','カ・あたい','value'],['維','イ','maintain'],['持','ジ・もつ','hold'],['責','セキ・せめる','responsibility'],['任','ニン・まかせる','duty'],['資','シ','resources'],['源','ゲン・みなもと','source'],['効','コウ・きく','effect']],
    grammar:[['～に伴って','along with','人口の増加に伴って問題も増えました。'],['～に基づいて','based on','調査結果に基づいて計画を作ります。'],['～ざるを得ない','cannot avoid doing','予定を変更せざるを得ません。'],['～にかかわらず','regardless of','経験にかかわらず応募できます。'],['～ものの','although','買ったものの、まだ使っていません。'],['～一方で','while / on the other hand','便利な一方で危険もあります。'],['～ことから','from the fact that','形が似ていることからこの名前がつきました。'],['～にすぎない','nothing more than','それは一つの例にすぎません。'],['～を通じて','throughout / through','仕事を通じて多くを学びました。'],['～に応じて','according to','状況に応じて方法を変えます。'],['～上で','upon / in doing','内容を確認した上で署名してください。'],['～かねない','might (negative)','このままでは事故が起こりかねません。']],
    reading:[['環境対策','企業には利益を上げるだけでなく、環境への影響を減らす責任もある。対策には費用がかかるものの、長期的には企業の信頼につながる。','環境対策の長期的な利点は何ですか。','企業の信頼につながることです。'],['情報の確認','インターネット上の情報は便利だが、必ずしも正確とは限らない。複数の資料を比較し、情報源を確認する必要がある。','情報を利用する前に何をすべきですか。','複数の資料と情報源を確認します。'],['制度の改善','新しい制度を導入する際には、対象者の意見を聞き、実施後も効果を評価することが重要である。','制度導入後に必要なことは何ですか。','効果を評価することです。'],['働く目的','収入は働く大きな目的の一つだが、能力を生かしたり社会に貢献したりすることも、仕事の満足度に影響する。','仕事の満足度に影響するものは何ですか。','能力の活用や社会への貢献です。']]},
  6:{label:'N1',vocabTarget:10000,kanjiTarget:2000,grammarTarget:400,
    vocab:[['概念','がいねん','concept'],['妥当','だとう','valid / appropriate'],['顕著','けんちょ','remarkable'],['遂行','すいこう','execution'],['促進','そくしん','promotion'],['抑制','よくせい','restraint'],['把握','はあく','grasp / understand'],['考慮','こうりょ','consideration'],['見解','けんかい','view / opinion'],['論点','ろんてん','point at issue'],['根拠','こんきょ','basis / evidence'],['矛盾','むじゅん','contradiction'],['介入','かいにゅう','intervention'],['排除','はいじょ','exclusion'],['模索','もさく','search / explore'],['著しい','いちじるしい','remarkable'],['余儀ない','よぎない','unavoidable'],['踏まえる','ふまえる','take into account'],['損なう','そこなう','damage / impair'],['免れる','まぬかれる','escape / avoid']],
    kanji:[['概','ガイ','outline'],['念','ネン','thought'],['妥','ダ','gentle / valid'],['当','トウ・あたる','appropriate'],['顕','ケン','manifest'],['著','チョ・いちじるしい','notable'],['遂','スイ・とげる','accomplish'],['促','ソク・うながす','urge'],['抑','ヨク・おさえる','suppress'],['制','セイ','control'],['把','ハ','grasp'],['握','アク・にぎる','grip'],['慮','リョ','consider'],['論','ロン','argument'],['拠','キョ・よる','basis'],['矛','ム・ほこ','spear'],['盾','ジュン・たて','shield'],['介','カイ','mediate'],['排','ハイ','exclude'],['索','サク','search']],
    grammar:[['～を余儀なくされる','be forced to','悪天候のため計画の変更を余儀なくされました。'],['～にたえる','worthy of','この作品は鑑賞にたえるものです。'],['～を皮切りに','starting with','東京公演を皮切りに全国を回ります。'],['～そばから','as soon as','覚えたそばから忘れてしまいます。'],['～ともなく','without intending to','見るともなく窓の外を見ていました。'],['～までもない','there is no need to','言うまでもなく健康が第一です。'],['～に即して','in accordance with','現状に即して制度を見直します。'],['～をものともせず','in spite of','困難をものともせず挑戦を続けました。'],['～べく','in order to','問題を解決すべく調査を始めました。'],['～ないまでも','even if not','完璧でないまでも十分な成果です。'],['～にひきかえ','in contrast to','兄にひきかえ弟は社交的です。'],['～を禁じ得ない','cannot help feeling','その知らせに驚きを禁じ得ません。']],
    reading:[['技術と判断','高度な技術が普及しても、最終的な判断を完全に機械へ委ねることが妥当とは限らない。判断の根拠を説明できる仕組みが不可欠である。','筆者が不可欠だと考えるものは何ですか。','判断の根拠を説明できる仕組みです。'],['制度設計','制度は一度導入すれば終わりではない。社会状況の変化を踏まえ、当初の目的が損なわれていないか継続的に検証すべきである。','制度について継続的に何をすべきですか。','目的が損なわれていないか検証します。'],['多様な見解','意見の対立は必ずしも避けるべきものではない。異なる見解を比較することで、見落としていた論点が明らかになる場合がある。','意見の対立の利点は何ですか。','新しい論点が明らかになることです。'],['責任ある利用','情報を発信する自由には、内容が他者に与える影響を考慮する責任が伴う。自由だけを主張して責任を排除することはできない。','情報発信の自由に伴うものは何ですか。','他者への影響を考慮する責任です。']]}
};

Object.entries(JLPT_COURSES).forEach(([stage,c])=>{
  const s=Number(stage);
  c.vocab.forEach((w,i)=>questions.push({stage:s,q:w[0],speechText:w[1],prompt:'Choose the best meaning.',a:w[2],opts:shuffle([w[2],...shuffle(c.vocab.filter((_,j)=>j!==i).map(x=>x[2])).slice(0,3)]),kind:'advanced-vocab',courseId:`jlpt${s}:vocab:${i}`,vocabularyKey:w[0]}));
  c.kanji.forEach((k,i)=>questions.push({stage:s,q:k[0],speechText:readingSpeechText(k[1]),prompt:'Choose this kanji’s meaning.',a:k[2],opts:shuffle([k[2],...shuffle(c.kanji.filter((_,j)=>j!==i).map(x=>x[2])).slice(0,3)]),kind:'advanced-kanji',courseId:`jlpt${s}:kanji:${i}`}));
  c.grammar.forEach((g,i)=>questions.push({stage:s,q:g[2],prompt:'Which grammar pattern is used?',a:g[0],opts:shuffle([g[0],...shuffle(c.grammar.filter((_,j)=>j!==i).map(x=>x[0])).slice(0,3)]),kind:'advanced-grammar',courseId:`jlpt${s}:grammar:${i}`}));
  c.reading.forEach((r,i)=>questions.push({stage:s,q:r[1],prompt:r[2],a:r[3],opts:shuffle([r[3],...shuffle(c.reading.filter((_,j)=>j!==i).map(x=>x[3])).slice(0,3)]),kind:'advanced-reading',courseId:`jlpt${s}:reading:${i}`}));
});
// Questions added by the later JLPT course expansion also need stable IDs so
// randomized guardian decks can be saved and resumed without changing order.
questions.forEach((question,index)=>{if(!question.id)question.id=`course-${question.stage}-${index}`;});

// v6.4.13 - Complete 1,000-word N5 course. New questions are appended only
// after all legacy IDs are assigned so existing player question history stays intact.
const n5CompleteVocabulary=Array.isArray(window.N5_VOCABULARY_1000)?window.N5_VOCABULARY_1000.map(entry=>[...entry]):[];
if(n5CompleteVocabulary.length!==1000)throw new Error("The complete N5 vocabulary course did not load.");
const standardN5VocabularyKeys=new Set(questions.filter(question=>Number(question.stage)===2&&question.vocabularyKey&&!tutorQuestion(question)).map(question=>String(question.vocabularyKey)));
n5CompleteVocabulary.forEach(([word,reading,meaning],courseIndex)=>{
  if(standardN5VocabularyKeys.has(word))return;
  addQuestion({id:`n5-course-${courseIndex}-meaning`,stage:2,q:reading,displayGuided:reading,displayStandard:rubyWord(word,reading),displayChallenge:word,speechText:reading,prompt:"Choose the meaning.",a:meaning,opts:wordOptions(n5CompleteVocabulary,meaning,2),help:`${word} is read ${reading} and means “${meaning}.”`,kind:"vocabulary",vocabularyKey:word});
  if(word===reading){
    addQuestion({id:`n5-course-${courseIndex}-word`,stage:2,q:`Which Japanese word means “${meaning}”?`,prompt:"Choose the Japanese word.",a:word,opts:wordOptions(n5CompleteVocabulary,word,0),help:`${word} means “${meaning}.”`,kind:"vocabulary",vocabularyKey:word});
  }else{
    addQuestion({id:`n5-course-${courseIndex}-reading`,stage:2,q:word,concealedPrompt:word,displayChallenge:word,speechText:reading,prompt:"Choose the correct reading.",a:reading,opts:wordOptions(n5CompleteVocabulary,reading,1),help:`${word} is read ${reading} and means “${meaning}.”`,kind:"vocabulary",vocabularyKey:word});
  }
});

let academyStage=2;
function jlptCourseForStage(stage=academyStage){return stage===2?null:JLPT_COURSES[stage];}
function jlptMasteryId(type,index,stage=academyStage){return `jlpt${stage}:${type}:${index}`;}
function jlptItemMastery(type,index,stage=academyStage){return academyItemMastery(jlptMasteryId(type,index,stage));}
function jlptSetMastery(type,index,delta,stage=academyStage){v3SetMastery(jlptMasteryId(type,index,stage),delta);}
function advancedCounts(stage=academyStage){const c=JLPT_COURSES[stage];const count=(type,arr)=>arr.filter((_,i)=>jlptItemMastery(type,i,stage)>=75).length;const v=count('vocab',c.vocab),k=count('kanji',c.kanji),g=count('grammar',c.grammar),r=count('reading',c.reading);return {v,k,g,r,readiness:Math.round((v/c.vocab.length*.3+k/c.kanji.length*.25+g/c.grammar.length*.25+r/c.reading.length*.2)*100)};}
function updateAcademyChrome(){const label=academyStage===2?'N5':JLPT_COURSES[academyStage].label;const title=document.getElementById('academyTitle');if(title)title.textContent=`⛏️ JLPT ${label} Mine — Course & Progress`;const p=title?.nextElementSibling;if(p)p.textContent=`The mine and every ${label} study tool share the same progress and mastery.`;const first=document.querySelector('[data-academy-tab="overview"]');if(first)first.textContent=`${label} Hub`;}
const openAcademyV34=openAcademy;
openAcademy=function(stage=state.selectedStage){stage=Number(stage);if(stage<2)stage=2;if(!isStageUnlocked(stage)){setMessage(`${stages[stage].label} is still locked.`,'wrong');return;}academyStage=stage;academyTab='overview';academyView={lesson:null,word:null,grammar:null,reading:null,quiz:null,preview:null,lessonPreviewComplete:false};updateAcademyChrome();document.getElementById('academyOverlay').classList.add('open');document.getElementById('academyOverlay').setAttribute('aria-hidden','false');renderAcademy();};
const selectStageV34=selectStage;
selectStage=function(index,openCourse=false){selectStageV34(index,false);if(openCourse&&Number(index)>=2&&isStageUnlocked(Number(index)))openAcademy(Number(index));};
const renderPathV34=renderPath;
renderPath=function(){renderPathV34();document.querySelectorAll('#path .stage').forEach((el,i)=>{if(i>=2&&!el.classList.contains('locked')){el.onclick=()=>selectStage(i,true);el.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();selectStage(i,true);}};el.setAttribute('aria-label',`Open ${stages[i].label} mine and course`);}});};

document.getElementById('openAcademyBtn')?.addEventListener('click',()=>openAcademy(Math.max(2,state.selectedStage)));

function renderAdvancedAcademy(){const c=JLPT_COURSES[academyStage],counts=advancedCounts(),box=document.getElementById('academyContent');if(!box)return;document.querySelectorAll('[data-academy-tab]').forEach(b=>b.classList.toggle('primary',b.dataset.academyTab===academyTab));
 const card=(type,i,title,sub,body='')=>`<article class="study-card"><strong>${v3Esc(title)}</strong><span class="small">${v3Esc(sub)}</span>${body}<div class="mastery-banner"><span>${v3Stars(jlptItemMastery(type,i))}</span><strong>${jlptItemMastery(type,i)}%</strong></div><button data-adv-practice="${type}:${i}" type="button">Practice</button></article>`;
 if(academyTab==='overview')box.innerHTML=`<div class="n5-hub-actions"><button id="hubEnterMineBtn" class="primary" type="button">⛏️ Enter ${c.label} Mine</button><span class="small">Mine answers update the same course mastery shown here.</span></div><div class="academy-metrics"><div><strong>${counts.readiness}%</strong><span>Estimated readiness</span></div><div><strong>${counts.v}</strong><span>Vocabulary mastered</span></div><div><strong>${counts.k}</strong><span>Kanji mastered</span></div><div><strong>${counts.g}</strong><span>Grammar mastered</span></div></div><div class="academy-roadmap">${[['Vocabulary',counts.v,c.vocabTarget],['Kanji',counts.k,c.kanjiTarget],['Grammar',counts.g,c.grammarTarget],['Reading',counts.r,c.reading.length]].map(([n,v,t])=>`<div><div class="progress-label"><span>${n}</span><strong>${v}/${t}</strong></div>${progressBar(Math.min(100,v/Math.max(1,(n==='Reading'?t:(n==='Vocabulary'?c.vocab.length:n==='Kanji'?c.kanji.length:c.grammar.length)))*100))}</div>`).join('')}</div><div class="academy-callout"><strong>Course bank status</strong><p>${c.vocab.length} verified vocabulary items, ${c.kanji.length} kanji, ${c.grammar.length} grammar patterns, and ${c.reading.length} readings are interactive now. The progression targets preserve room for the full level curriculum.</p></div>`;
 if(academyTab==='vocabulary')box.innerHTML=renderVocabularyCourse(academyStage);
 if(academyTab==='kanji')box.innerHTML=`<div class="academy-toolbar"><strong>${c.label} Kanji</strong><span>${c.kanji.length} interactive kanji • target ${c.kanjiTarget.toLocaleString()}</span></div><div class="study-grid">${c.kanji.map((k,i)=>card('kanji',i,k[0],`${k[1]} · ${k[2]}`)).join('')}</div>`;
 if(academyTab==='grammar')box.innerHTML=`<div class="academy-toolbar"><strong>${c.label} Grammar</strong><span>${c.grammar.length} interactive patterns • target ${c.grammarTarget}</span></div><div class="study-grid">${c.grammar.map((g,i)=>card('grammar',i,g[0],g[1],`<p class="jp-example">${v3Esc(g[2])}</p>`)).join('')}</div>`;
 if(academyTab==='reading')box.innerHTML=`<div class="academy-toolbar"><strong>${c.label} Reading</strong><span>Read and answer comprehension questions.</span></div><div class="study-grid">${c.reading.map((r,i)=>card('reading',i,r[0],r[2],`<p class="jp-passage">${v3Esc(r[1])}</p>`)).join('')}</div>`;
 if(academyTab==='listening')box.innerHTML=`<div class="academy-toolbar"><strong>${c.label} Listening</strong><span>Uses Japanese browser speech when available.</span></div><div class="study-grid">${c.reading.map((r,i)=>`<article class="study-card"><strong>Listening ${i+1}</strong><p class="jp-passage listening-hidden" id="advListen${i}">${v3Esc(r[1])}</p><button data-adv-speak="${i}" type="button">▶ Play Japanese</button><button data-adv-reveal="${i}" type="button">Reveal text</button></article>`).join('')}</div>`;
 if(academyTab==='review'){const due=[...c.vocab.map((x,i)=>['vocab',i,x[0]]),...c.kanji.map((x,i)=>['kanji',i,x[0]]),...c.grammar.map((x,i)=>['grammar',i,x[0]])].filter(([t,i])=>jlptItemMastery(t,i)<75).sort((a,b)=>jlptItemMastery(a[0],a[1])-jlptItemMastery(b[0],b[1])).slice(0,20);box.innerHTML=`<div class="academy-toolbar"><strong>Today's ${c.label} Review</strong><span>${due.length} priority cards</span></div><div class="review-list">${due.map(([t,i,l])=>`<button data-adv-practice="${t}:${i}" type="button"><span>${v3Esc(l)}</span><strong>${jlptItemMastery(t,i)}%</strong></button>`).join('')||'<p>Everything due today is mastered.</p>'}</div>`;}
 if(academyTab==='tests')box.innerHTML=`<div class="academy-test-grid"><article class="study-card"><h3>Mini ${c.label} Test</h3><p>20 mixed questions from this level.</p><button data-adv-test="20" class="primary" type="button">Start test</button></article><article class="study-card"><h3>Extended ${c.label} Test</h3><p>40 mixed questions from this level.</p><button data-adv-test="40" type="button">Start test</button></article></div>`;
 box.onclick=e=>{const t=e.target.closest('button');if(!t)return;if(handleVocabularyCourseAction(t,academyStage))return;if(t.id==='hubEnterMineBtn'){closeAcademy();selectStage(academyStage,false);document.getElementById('rock')?.scrollIntoView({behavior:'smooth',block:'center'});}else if(t.dataset.advSpeak!==undefined)speakJapanese(c.reading[Number(t.dataset.advSpeak)][1]);else if(t.dataset.advReveal!==undefined)document.getElementById(`advListen${t.dataset.advReveal}`)?.classList.remove('listening-hidden');else if(t.dataset.advPractice){const [type,raw]=t.dataset.advPractice.split(':'),i=Number(raw);let prompt,answer,wrong;if(type==='vocab'){prompt=`What does ${c.vocab[i][0]} mean?`;answer=c.vocab[i][2];wrong=c.vocab.filter((_,j)=>j!==i).map(x=>x[2]);}if(type==='kanji'){prompt=`What does ${c.kanji[i][0]} mean?`;answer=c.kanji[i][2];wrong=c.kanji.filter((_,j)=>j!==i).map(x=>x[2]);}if(type==='grammar'){prompt=`Which pattern appears in: ${c.grammar[i][2]}`;answer=c.grammar[i][0];wrong=c.grammar.filter((_,j)=>j!==i).map(x=>x[0]);}if(type==='reading'){prompt=c.reading[i][2];answer=c.reading[i][3];wrong=c.reading.filter((_,j)=>j!==i).map(x=>x[3]);}v3QuizCard(prompt,[answer,...shuffle(wrong).slice(0,3)],answer,good=>jlptSetMastery(type,i,good?25:-5));}else if(t.dataset.courseAnswer!==undefined)v3HandleQuizAnswer(t.dataset.courseAnswer,t);else if(t.dataset.courseBack!==undefined){academyView.quiz=null;renderAcademy();}else if(t.dataset.advTest){academyView.quiz=null;const pool=questions.filter(q=>q.stage===academyStage);const q=pool[Math.floor(Math.random()*pool.length)];v3QuizCard(q.prompt+' '+q.q,q.opts,q.a,good=>{if(q.courseId){const [,type,i]=q.courseId.split(':');jlptSetMastery(type,Number(i),good?15:-4);}});}};
}
const renderAcademyV34=renderAcademy;
renderAcademy=function(){updateAcademyChrome();if(academyStage===2)return renderAcademyV34();if(academyView.quiz){const box=document.getElementById('academyContent');box.innerHTML=v3RenderQuiz();box.onclick=e=>{const t=e.target.closest('button');if(t?.dataset.courseAnswer!==undefined)v3HandleQuizAnswer(t.dataset.courseAnswer,t);else if(t?.dataset.courseBack!==undefined){academyView.quiz=null;renderAcademy();}};return;}renderAdvancedAcademy();};

document.querySelectorAll('[data-academy-tab]').forEach(b=>{b.addEventListener('click',()=>{academyTab=b.dataset.academyTab;academyView.quiz=null;renderAcademy();});});

const answerV34=answer;
answer=function(opt,button){const q=state.active,correct=q&&opt===q.a;answerV34(opt,button);if(q?.courseId){const [,type,i]=q.courseId.split(':');jlptSetMastery(type,Number(i),correct?10:-3,Number(q.stage));}};

// Expand placement from Kana/N5 through N1.
const EXTRA_PLACEMENT_QUESTIONS=[
 {section:'n4',prompt:'Choose the best meaning.',display:'雨が降っても行きます。',answer:'I will go even if it rains.',options:['I will go even if it rains.','I will go because it rains.','I went before it rained.','I will not go if it rains.']},
 {section:'n4',prompt:'Choose the correct grammar.',display:'音楽を聞き___勉強します。',answer:'ながら',options:['ながら','ために','そうで','はず']},
 {section:'n4',prompt:'What does 予定 mean?',display:'予定',answer:'plan / schedule',options:['plan / schedule','promise','experience','reason']},
 {section:'n4',prompt:'Read and answer: 財布を家に忘れたので、家に戻りました。',display:'Why did the person return home?',answer:'They forgot their wallet.',options:['They forgot their wallet.','They missed the train.','They wanted to cook.','They finished work.']},
 {section:'n3',prompt:'Choose the best meaning.',display:'先生のおかげで合格できました。',answer:'Thanks to the teacher, I was able to pass.',options:['Thanks to the teacher, I was able to pass.','The teacher failed the exam.','I passed before meeting the teacher.','The teacher made the exam difficult.']},
 {section:'n3',prompt:'What does 影響 mean?',display:'影響',answer:'influence',options:['influence','solution','purpose','method']},
 {section:'n3',prompt:'Choose the correct pattern.',display:'ニュース___、台風が来るそうです。',answer:'によると',options:['によると','に対して','ばかり','ほど']},
 {section:'n3',prompt:'Read and answer: 家で働く人が増えていますが、仕事と生活を分けにくい問題があります。',display:'What problem is mentioned?',answer:'Work and personal life are hard to separate.',options:['Work and personal life are hard to separate.','Commuting takes longer.','There are fewer jobs.','Homes are too expensive.']},
 {section:'n2',prompt:'Choose the best meaning.',display:'調査結果に基づいて計画を作ります。',answer:'We will make a plan based on the survey results.',options:['We will make a plan based on the survey results.','We canceled the survey.','The plan caused the survey.','We ignored the results.']},
 {section:'n2',prompt:'What does 対策 mean?',display:'対策',answer:'countermeasure',options:['countermeasure','evaluation','responsibility','background']},
 {section:'n2',prompt:'Choose the correct grammar.',display:'予定を変更せ___。',answer:'ざるを得ない',options:['ざるを得ない','にすぎない','に応じて','ものの']},
 {section:'n2',prompt:'Read and answer: 情報は必ずしも正確とは限らないため、複数の資料を比較する必要がある。',display:'What should readers do?',answer:'Compare multiple sources.',options:['Compare multiple sources.','Trust the first source.','Avoid all information.','Only read opinions.']},
 {section:'n1',prompt:'Choose the best meaning.',display:'現状に即して制度を見直す。',answer:'Review the system in accordance with current conditions.',options:['Review the system in accordance with current conditions.','Reject the system immediately.','Ignore current conditions.','Create a system without review.']},
 {section:'n1',prompt:'What does 根拠 mean?',display:'根拠',answer:'basis / evidence',options:['basis / evidence','contradiction','intervention','concept']},
 {section:'n1',prompt:'Choose the correct grammar.',display:'悪天候のため変更を___。',answer:'余儀なくされた',options:['余儀なくされた','ものともせず','禁じ得なかった','皮切りにした']},
 {section:'n1',prompt:'Read and answer: 異なる見解を比較することで、見落としていた論点が明らかになる場合がある。',display:'What benefit can disagreement provide?',answer:'It can reveal overlooked issues.',options:['It can reveal overlooked issues.','It prevents all decisions.','It removes responsibility.','It proves one view is always correct.']}
];
PLACEMENT_TEST_QUESTIONS.push(...EXTRA_PLACEMENT_QUESTIONS);

const renderPlacementChoiceV34=renderPlacementChoice;
renderPlacementChoice=function(){renderPlacementChoiceV34();const choice=document.getElementById('placementChoice');if(choice){choice.querySelector('span:last-child').textContent=`Take a ${PLACEMENT_TEST_QUESTIONS.length}-question adaptive-style placement test covering Kana and JLPT N5 through N1.`;}const note=document.querySelector('#placementContent .placement-note');if(note)note.innerHTML='<strong>Placement does not remove earlier content.</strong> Strong results can unlock a higher mine and award a one-time starter bonus.';};

function completeStageForPlacement(i){
  if(i===0){grantKanaPlacement(hira,0);return;}
  if(i===1){grantKanaPlacement(kata,1);return;}
  state.stageXp[i]=Math.max(Number(state.stageXp[i]||0),STAGE_XP_REQUIREMENTS[i]);
  questions.filter(q=>q.stage===i&&questionAllowedForSession(q)).forEach(q=>{
    state.questionStats[q.id]={attempts:3,correct:3};
  });
  if(!state.clearedStages.includes(i))state.clearedStages.push(i);
}
function unlockThroughStage(stage){
  stage=Math.max(0,Math.min(stages.length-1,Number(stage)||0));
  for(let i=0;i<stage;i++) completeStageForPlacement(i);
  state.placementUnlockedThrough=Math.max(Number(state.placementUnlockedThrough)||0,stage);
}
function placementStageFromSavedResult(result){
  if(!result||typeof result!=="object") return null;
  const route=String(result.route||"").toLowerCase();
  const routeMap={hiragana:0,katakana:1,n5:2,n4:3,n3:4,n2:5,n1:6};
  if(route in routeMap) return routeMap[route];
  const selected=Number(result.selectedStage);
  return Number.isInteger(selected)&&selected>=0&&selected<stages.length?selected:null;
}
function repairPlacementUnlocks(){
  const placed=placementStageFromSavedResult(state.placementResult);
  if(placed===null) return false;
  const before=JSON.stringify([state.stageXp,state.clearedStages,state.questionStats,state.kanaStats,state.placementUnlockedThrough]);
  unlockThroughStage(placed);
  state.selectedStage=Math.max(Number(state.selectedStage)||0,placed);
  return before!==JSON.stringify([state.stageXp,state.clearedStages,state.questionStats,state.kanaStats,state.placementUnlockedThrough]);
}
function grantPlacementReward(routeStage,overall){
  if(state.placementRewardClaimed)return {nuggets:0,hints:0,shields:0,bonusPercent:0};
  const stage=Math.max(0,Math.min(PLACEMENT_REWARD_TIERS.length-1,Number(routeStage)||0));
  const tier=PLACEMENT_REWARD_TIERS[stage];
  const bonusPercent=Number(overall)>=90?25:0;
  const nuggets=Math.round(tier.nuggets*(1+bonusPercent/100));
  const hints=tier.hints,shields=tier.shields;
  addStoneChange(nuggets,Math.min(gemTiers.length-1,stage+6));
  state.hints=Number(state.hints||0)+hints;
  state.shields=Number(state.shields||0)+shields;
  state.placementRewardClaimed=true;
  return {nuggets,hints,shields,bonusPercent};
}
const finishPlacementTestV34=finishPlacementTest;
finishPlacementTest=function(){const scores={};['hiragana','katakana','n5','n4','n3','n2','n1'].forEach(s=>scores[s]=placementSectionScore(s));let stage=0;if(scores.hiragana>=70)stage=1;if(stage===1&&scores.katakana>=70)stage=2;if(stage===2&&scores.n5>=65)stage=3;if(stage===3&&scores.n4>=65)stage=4;if(stage===4&&scores.n3>=65)stage=5;if(stage===5&&scores.n2>=65)stage=6; // N1 score refines reward/readiness but N1 remains the highest placement.
 const completedAt=Date.now(),elapsedTimeMs=normalizeAssessmentTimeMs(completedAt-Number(placementSession.startedAt||completedAt));
 unlockThroughStage(stage);const unlockedGemRewards=grantUnlockedGemRewards();state.selectedStage=stage;state.supportMode=stage>=4?'challenge':stage>=2?'standard':'guided';state.n5Tier=scores.n5>=75?'advanced':scores.n5>=45?'intermediate':'beginner';state.onboardingComplete=true;state.placementTestCompleted=true;state.active=null;state.answered=false;const overall=Math.round(Object.values(scores).reduce((a,b)=>a+b,0)/7);const reward=grantPlacementReward(stage,overall);const missed=Array.isArray(placementSession.missed)?placementSession.missed:[];state.placementResult={date:completedAt,completedAt,elapsedTimeMs,fastestTimeMs:elapsedTimeMs,route:stages[stage].label.toLowerCase(),overall,...scores,reward,unlockedGemRewards:unlockedGemRewards.map(gem=>gem.name),missed};save();render();placementSession.required=false;document.getElementById('placementCloseBtn').hidden=false;const scoreCards=Object.entries(scores).map(([k,v])=>`<div class="placement-score"><strong>${v}%</strong><span>${k==='hiragana'?'Hiragana':k==='katakana'?'Katakana':'JLPT '+k.toUpperCase()}</span></div>`).join('');const placementBonus=reward.bonusPercent?` <strong>Mastery bonus: +${reward.bonusPercent}% Nuggets.</strong>`:'';const gemBonus=unlockedGemRewards.length?` <strong>Mine access bonus: ${unlockedGemRewards.length} unlocked gemstones added for heart upgrades.</strong>`:'';const missedMarkup=window.japaneseMinerAssessmentMissesMarkup?.(missed)||'',timeMarkup=assessmentRecordMarkup(elapsedTimeMs,true,'Placement test record');document.getElementById('placementContent').innerHTML=`<div class="placement-results"><div class="placement-score-grid">${scoreCards}</div>${timeMarkup}<div class="placement-recommendation"><h3>🧭 Start in the ${stages[stage].name}</h3><p>Your one-time placement result is saved. Every earlier mine remains available for review.</p></div><div class="placement-note"><strong>${stages[stage].label} placement reward:</strong> ${reward.nuggets.toLocaleString()} Nuggets, ${reward.hints} hints, and ${reward.shields} shields.${placementBonus}${gemBonus}</div>${missedMarkup}<div class="placement-result-actions"><button id="acceptPlacementBtn" class="primary" type="button">Begin ${stages[stage].label}</button></div></div>`;document.getElementById('acceptPlacementBtn').addEventListener('click',()=>{syncPlacementTestButton();closePlacementOnboarding();document.getElementById('rock')?.scrollIntoView({behavior:'smooth',block:'center'});});};

// v3.4 polish: correct advanced placement labels and make the launch button honor the selected JLPT mine.
const enterSelectedMineButton=document.getElementById('enterN5MineBtn');
enterSelectedMineButton?.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();const stage=Math.max(2,Number(state.selectedStage)||2);if(!isStageUnlocked(stage)){setMessage(`${stages[stage].label} is still locked.`,'wrong');return;}selectStage(stage,false);document.getElementById('rock')?.scrollIntoView({behavior:'smooth',block:'center'});},true);
const renderPlacementQuestionV34=renderPlacementQuestion;
renderPlacementQuestion=function(){renderPlacementQuestionV34();const q=PLACEMENT_TEST_QUESTIONS[placementSession.index];const label=q.section==='hiragana'?'Hiragana':q.section==='katakana'?'Katakana':`JLPT ${q.section.toUpperCase()}`;const el=document.querySelector('#placementContent .placement-progress-label span');if(el)el.textContent=label;};


// v3.5 — Repair placement-test unlocks for both new and existing profiles.
// v3.4 granted XP but did not grant the mastery required by the Learning Path.
const normalizeStateV35=normalizeState;
normalizeState=function(raw){
  const next=normalizeStateV35(raw);
  const previousState=state;
  state=next;
  repairPlacementUnlocks();
  const repaired=state;
  state=previousState;
  return repaired;
};
const renderV35=render;
render=function(){
  const repaired=repairPlacementUnlocks();
  renderV35();
  if(repaired) save();
};


// v3.6 — Persistent placement bypass, centralized menu, cosmetic shop, and wallpapers.
const WALLPAPERS=[
 {id:'midnight',name:'Midnight Mine',cost:0,desc:'The original deep-blue mining backdrop.',preview:'radial-gradient(circle at 20% 0%,#263653,#0d1424 45%,#070b14)'},
 {id:'emoji',name:'Emoji Party',cost:400000,desc:'A cheerful field of smiles, stars, hearts, and gems.',preview:'linear-gradient(135deg,#ff78b9,#725cff)'},
 {id:'confetti',name:'Lucky Confetti',cost:900000,desc:'A colorful celebration for every study streak.',preview:'conic-gradient(from 25deg at 20% 30%,#ffdc68 0 12deg,transparent 13deg),conic-gradient(from 70deg at 70% 55%,#67f0ce 0 13deg,transparent 14deg),linear-gradient(135deg,#5d35a8,#c83f86)'},
 {id:'sakura',name:'Sakura Cavern',cost:2000000,desc:'Soft cherry-blossom light over a quiet cavern.',preview:'radial-gradient(circle at 20% 15%,#ffc4da,transparent 35%),linear-gradient(145deg,#45264c,#141a31)'},
 {id:'ocean',name:'Ocean Bubbles',cost:5000000,desc:'A bright underwater world filled with rising bubbles.',preview:'radial-gradient(circle at 18% 25%,#c9ffff88 0 8px,transparent 9px),radial-gradient(circle at 75% 55%,#fff8 0 5px,transparent 6px),linear-gradient(#087fc1,#063765)'},
 {id:'bamboo',name:'Bamboo Grove',cost:12000000,desc:'A calm green backdrop for relaxed study.',preview:'radial-gradient(circle at 20% 10%,#55a978,transparent 38%),linear-gradient(145deg,#153c31,#08151a)'},
 {id:'galaxy',name:'Galaxy Quest',cost:25000000,desc:'Stars, nebula clouds, and deep-space color.',preview:'radial-gradient(circle at 18% 22%,#fff 0 2px,transparent 3px),radial-gradient(circle at 70% 35%,#fff 0 1px,transparent 2px),radial-gradient(circle at 55% 20%,#b14cff88,transparent 35%),linear-gradient(145deg,#070522,#15105d,#09031a)'},
 {id:'sunrise',name:'Mountain Sunrise',cost:50000000,desc:'Warm sunrise colors above the mine entrance.',preview:'radial-gradient(circle at 50% 0%,#ffc168,transparent 38%),linear-gradient(160deg,#533c67,#172544)'},
 {id:'inferno',name:'Inferno Mine',cost:100000000,desc:'Animated-looking flame colors from the volcanic depths.',preview:'radial-gradient(ellipse at 30% 100%,#fff15c,transparent 28%),radial-gradient(ellipse at 70% 100%,#ff4b21,transparent 45%),linear-gradient(#3b0710,#120309)'},
 {id:'aurora',name:'Aurora Sky',cost:200000000,desc:'Flowing northern lights in emerald, cyan, and violet.',preview:'radial-gradient(ellipse at 25% 10%,#55ffc988,transparent 42%),radial-gradient(ellipse at 75% 20%,#a26cff99,transparent 45%),linear-gradient(160deg,#071d35,#121339)'},
 {id:'crystal',name:'Crystal Depths',cost:400000000,desc:'Blue and violet crystal light from the deepest tunnels.',preview:'radial-gradient(circle at 75% 10%,#735cff,transparent 35%),radial-gradient(circle at 15% 60%,#42caff,transparent 34%),#10142c'},
 {id:'paper',name:'Study Notebook',cost:800000000,desc:'A clean grid-paper look inspired by Japanese study notebooks.',preview:'linear-gradient(rgba(255,255,255,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.12) 1px,transparent 1px),#26314a'}
];
let activeShopTab='mine-cosmetics';
const SHOP_COLOR_THEMES=[['midnight','Midnight'],['sunrise','Sunrise'],['sakura','Sakura'],['aqua','Aqua'],['candy','Candy']];
function shopText(key,values={}){return window.LanguageMinerI18n?.t?.(key,values)||String(key);}
function applyWallpaper(){const supporter=(window.japaneseMinerSupporterTier?.()||0)>=1;document.body.dataset.wallpaper=supporter?(state.equippedWallpaper||'midnight'):'midnight';document.body.dataset.theme=supporter?(state.colorTheme||'midnight'):'midnight';}
function openGameMenu(){setStatsDrawer(false);document.getElementById('gameMenuOverlay')?.classList.add('open');document.getElementById('gameMenuOverlay')?.setAttribute('aria-hidden','false');document.getElementById('gameMenuBtn')?.setAttribute('aria-expanded','true');syncPageScrollLock();}
function closeGameMenu(){document.getElementById('gameMenuOverlay')?.classList.remove('open');document.getElementById('gameMenuOverlay')?.setAttribute('aria-hidden','true');document.getElementById('gameMenuBtn')?.setAttribute('aria-expanded','false');syncPageScrollLock();}
function returnToGameMenu(closeCurrent){if(typeof closeCurrent==='function')closeCurrent();openGameMenu();}
function openShop(tab='mine-cosmetics'){activeShopTab=tab==='fashion'?'character':['pickaxes','wallpapers'].includes(tab)?'mine-cosmetics':tab;closeGameMenu();document.getElementById('shopOverlay')?.classList.add('open');document.getElementById('shopOverlay')?.setAttribute('aria-hidden','false');syncPageScrollLock();renderShop();}
function closeShop(){document.getElementById('shopOverlay')?.classList.remove('open');document.getElementById('shopOverlay')?.setAttribute('aria-hidden','true');syncPageScrollLock();}
function renderShop(){
 const balance=document.getElementById('shopNuggetBalance');if(balance)balance.textContent=totalStoneValue().toLocaleString();
  document.querySelectorAll('[data-shop-tab]').forEach(b=>b.classList.toggle('primary',b.dataset.shopTab===activeShopTab));
  const box=document.getElementById('shopContent');if(!box)return;
  if(['character','pickaxes','wallpapers'].includes(activeShopTab)&&(window.japaneseMinerSupporterTier?.()||0)<1){box.innerHTML=window.japaneseMinerSupporterGate?.(1,activeShopTab==='character'?'Character cosmetics, hats, and accessories':activeShopTab==='pickaxes'?'Pickaxe skins':'Wallpapers and color themes')||'';return;}
  if(activeShopTab==='character'&&typeof window.renderJapaneseMinerCharacterShop==='function'){window.renderJapaneseMinerCharacterShop(box);window.refreshJapaneseMinerCompanionDisplays?.();return;}
 if(['companions','settlement'].includes(activeShopTab)&&typeof window.renderJapaneseMinerV5Shop==='function'){window.renderJapaneseMinerV5Shop(activeShopTab,box);return;}
 if(activeShopTab==='pickaxes'){
  box.innerHTML='<div class="shop-section-heading"><span>Permanent gear</span><h3>Pickaxe skins</h3><p>Preview any pickaxe, check its exact Nugget price and your current balance, then confirm Buy &amp; Equip. Every purchased skin stays owned permanently.</p></div><div class="cosmetic-grid" id="menuPickaxeShop"></div>';
  const grid=document.getElementById('menuPickaxeShop');
  PICKAXE_SKINS.forEach(skin=>{const owned=state.ownedPickaxeSkins.includes(skin.id),equipped=state.equippedPickaxeSkin===skin.id;const card=document.createElement('article');card.className='cosmetic-card'+(equipped?' equipped':'');card.innerHTML=`<div class="cosmetic-preview"><span style="${skin.id==='standard'?'':pickaxePreviewStyle(skin.id)}">${skin.icon}</span></div><h3>${skin.name}</h3><p>${skin.desc}</p><button type="button" ${equipped?'disabled':''}>${equipped?'Equipped':owned?'Equip':`Preview — ${skin.cost.toLocaleString()} Nuggets`}</button>`;const button=card.querySelector('button');button.addEventListener('click',()=>{requestPickaxePurchase(skin,button);if(owned)renderShop();});grid.appendChild(card);});
 }else if(activeShopTab==='mine-cosmetics'){
  box.innerHTML='<div class="shop-section-heading"><span>Mine customization</span><h3>Rock skins</h3><p>Change the rock you tap without changing your equipped pickaxe. Purchased skins stay owned permanently.</p></div><div class="cosmetic-grid" id="rockSkinShop"></div><div class="shop-section-heading"><span>Mine scenery</span><h3>Mine wallpapers</h3><p>Change the cave scenery behind the rock. This is separate from the full-page wallpaper setting.</p></div><div class="cosmetic-grid" id="mineWallpaperShop"></div>';
  const rockGrid=document.getElementById('rockSkinShop');
  ROCK_SKINS.forEach(item=>{const owned=state.ownedRockSkins.includes(item.id),equipped=state.equippedRockSkin===item.id,card=document.createElement('article');card.className='cosmetic-card'+(equipped?' equipped':'');card.innerHTML=`<div class="mine-cosmetic-preview"><span class="shop-rock-sample" data-rock-skin="${item.id}"><i>⛏️</i></span></div><h3>${item.name}</h3><p>${item.desc}</p><button type="button" ${equipped?'disabled':''}>${equipped?'Equipped':owned?'Equip':shopText('buyEquipNuggets',{value:item.cost.toLocaleString()})}</button>`;card.querySelector('button').addEventListener('click',()=>buyOrEquipMineCosmetic('rock',item));rockGrid.appendChild(card);});
  const wallpaperGrid=document.getElementById('mineWallpaperShop');
  MINE_WALLPAPERS.forEach(item=>{const owned=state.ownedMineWallpapers.includes(item.id),equipped=state.equippedMineWallpaper===item.id,card=document.createElement('article');card.className='cosmetic-card'+(equipped?' equipped':'');card.innerHTML=`<div class="mine-wallpaper-shop-preview" data-preview-mine-wallpaper="${item.id}" style="background:${item.preview}"><span class="shop-rock-sample" data-rock-skin="slate"><i>⛏️</i></span></div><h3>${item.name}</h3><p>${item.desc}</p><button type="button" ${equipped?'disabled':''}>${equipped?'Equipped':owned?'Equip':shopText('buyEquipNuggets',{value:item.cost.toLocaleString()})}</button>`;card.querySelector('button').addEventListener('click',()=>buyOrEquipMineCosmetic('wallpaper',item));wallpaperGrid.appendChild(card);});
 }else if(activeShopTab==='wallpapers'){
  box.innerHTML='<div class="shop-section-heading"><span>Free appearance</span><h3>Bright game colors</h3><p>Choose one free color treatment or one wallpaper. Selecting either automatically turns the other off.</p></div><div class="theme-choice-grid wallpaper-theme-grid" id="wallpaperThemeShop"></div><div class="shop-section-heading"><span>Permanent collection</span><h3>Wallpapers</h3><p>Unlock a wallpaper with Nuggets, then equip it here.</p></div><div class="cosmetic-grid" id="wallpaperShop"></div>';
  const themeGrid=document.getElementById('wallpaperThemeShop');
  SHOP_COLOR_THEMES.forEach(([value,name])=>{const selected=state.colorTheme===value;const button=document.createElement('button');button.type='button';button.className=selected?'selected':'';button.innerHTML=`<span class="theme-swatch theme-${value}"></span><span>${name}<small>Free</small></span>`;button.addEventListener('click',()=>{state.colorTheme=value;state.equippedWallpaper='midnight';applyWallpaper();save();render();renderShop();setMessage(`${name} game colors selected. Wallpaper cleared.`,'correct');});themeGrid.appendChild(button);});
  const grid=document.getElementById('wallpaperShop');
  WALLPAPERS.forEach(w=>{const owned=state.ownedWallpapers.includes(w.id),equipped=state.colorTheme==='midnight'&&state.equippedWallpaper===w.id;const card=document.createElement('article');card.className='cosmetic-card'+(equipped?' equipped':'');card.innerHTML=`<div class="wallpaper-preview" style="background:${w.preview};background-size:${w.id==='paper'?'18px 18px':'cover'}"></div><h3>${w.name}</h3><p>${w.desc}</p><button type="button" ${equipped?'disabled':''}>${equipped?'Equipped':owned?'Use wallpaper':`Buy — ${w.cost.toLocaleString()} Nuggets`}</button>`;card.querySelector('button').addEventListener('click',()=>{if(owned){state.colorTheme='midnight';state.equippedWallpaper=w.id;applyWallpaper();save();render();renderShop();setMessage(`${w.name} wallpaper equipped. Bright game colors cleared.`,'correct');}else if(spendStoneValue(w.cost)){state.ownedWallpapers.push(w.id);state.colorTheme='midnight';state.equippedWallpaper=w.id;applyWallpaper();save();render();renderShop();setMessage(`${w.name} purchased and equipped!`,'correct');}else setMessage(`You need ${w.cost.toLocaleString()} Nuggets for ${w.name}.`,'wrong');});grid.appendChild(card);});
 }else{
 const prices=currentShopPrices();box.innerHTML=`<div class="shop-supply-list"><article class="shop-supply"><div><strong>💡 Hint Crystal</strong><p>Removes one incorrect choice.</p></div><button type="button" data-supply="hint">Buy — ${prices.hint.toLocaleString()}</button></article><article class="shop-supply"><div><strong>🛡️ Life Shield</strong><p>Protects one heart after a wrong answer.</p></div><button type="button" data-supply="shield">Buy — ${prices.shield.toLocaleString()}</button></article><article class="shop-supply"><div><strong>❤️ Heart Restore</strong><p>Restores all current hearts.</p></div><button type="button" data-supply="heart">Buy — ${prices.heart.toLocaleString()}</button></article></div>`;box.querySelectorAll('[data-supply]').forEach(b=>b.addEventListener('click',()=>{buy(b.dataset.supply);renderShop();}));
 }
}

// v6.4.106 — One Tier 1 Mine Cosmetics hub with four pull-down collections.
const mineCosmeticOpenSections=new Set(['rock-skins']);
const renderShopBeforeMineCosmeticHub=renderShop;
renderShop=function(){
  if(['pickaxes','wallpapers'].includes(activeShopTab))activeShopTab='mine-cosmetics';
  if(activeShopTab!=='mine-cosmetics'){renderShopBeforeMineCosmeticHub();return;}
  const balance=document.getElementById('shopNuggetBalance');if(balance)balance.textContent=totalStoneValue().toLocaleString();
  document.querySelectorAll('[data-shop-tab]').forEach(button=>button.classList.toggle('primary',button.dataset.shopTab==='mine-cosmetics'));
  const box=document.getElementById('shopContent');if(!box)return;
  if((window.japaneseMinerSupporterTier?.()||0)<1){
    box.innerHTML=window.japaneseMinerSupporterGate?.(1,'Mine Cosmetics: rock skins, mine wallpapers, pickaxe skins, and wallpapers')||'';
    return;
  }
  const openAttribute=id=>mineCosmeticOpenSections.has(id)?' open':'';
  box.innerHTML=`
    <section class="mine-cosmetic-hub-intro"><span>PATREON TIER 1 COLLECTION</span><h3>🪨 Mine Cosmetics</h3><p>Open a pull-down collection to preview, purchase, and equip permanent mine appearances.</p></section>
    <div class="mine-cosmetic-accordions">
      <details class="mine-cosmetic-accordion" data-mine-cosmetic-section="rock-skins"${openAttribute('rock-skins')}><summary><span>🪨</span><strong>Rock skins</strong><small>${ROCK_SKINS.length} permanent skins</small></summary><div class="mine-cosmetic-accordion-body"><p>Change the rock you tap without changing your equipped pickaxe.</p><div class="cosmetic-grid" id="rockSkinShop"></div></div></details>
      <details class="mine-cosmetic-accordion" data-mine-cosmetic-section="mine-wallpapers"${openAttribute('mine-wallpapers')}><summary><span>🖼️</span><strong>Mine wallpapers</strong><small>${MINE_WALLPAPERS.length} cave backgrounds</small></summary><div class="mine-cosmetic-accordion-body"><p>Change only the cave scenery behind the tappable rock.</p><div class="cosmetic-grid" id="mineWallpaperShop"></div></div></details>
      <details class="mine-cosmetic-accordion" data-mine-cosmetic-section="pickaxe-skins"${openAttribute('pickaxe-skins')}><summary><span>⛏️</span><strong>Pickaxe skins</strong><small>${PICKAXE_SKINS.length} permanent skins</small></summary><div class="mine-cosmetic-accordion-body"><p>Preview a pickaxe, check its Nugget price, and permanently equip owned skins.</p><div class="cosmetic-grid" id="menuPickaxeShop"></div></div></details>
      <details class="mine-cosmetic-accordion" data-mine-cosmetic-section="wallpapers"${openAttribute('wallpapers')}><summary><span>🌌</span><strong>Wallpapers</strong><small>${WALLPAPERS.length} full-page wallpapers</small></summary><div class="mine-cosmetic-accordion-body"><p>Choose a free color treatment or a permanent full-page wallpaper. Selecting one clears the other.</p><div class="theme-choice-grid wallpaper-theme-grid" id="wallpaperThemeShop"></div><div class="cosmetic-grid" id="wallpaperShop"></div></div></details>
    </div>`;
  box.querySelectorAll('[data-mine-cosmetic-section]').forEach(section=>section.addEventListener('toggle',()=>{if(section.open)mineCosmeticOpenSections.add(section.dataset.mineCosmeticSection);else mineCosmeticOpenSections.delete(section.dataset.mineCosmeticSection);}));

  const rockGrid=document.getElementById('rockSkinShop');
  ROCK_SKINS.forEach(item=>{const owned=state.ownedRockSkins.includes(item.id),equipped=state.equippedRockSkin===item.id,card=document.createElement('article');card.className='cosmetic-card'+(equipped?' equipped':'');card.innerHTML=`<div class="mine-cosmetic-preview"><span class="shop-rock-sample" data-rock-skin="${item.id}"><i>⛏️</i></span></div><h3>${item.name}</h3><p>${item.desc}</p><button type="button" ${equipped?'disabled':''}>${equipped?'Equipped':owned?'Equip':shopText('buyEquipNuggets',{value:item.cost.toLocaleString()})}</button>`;card.querySelector('button').addEventListener('click',()=>buyOrEquipMineCosmetic('rock',item));rockGrid.appendChild(card);});

  const mineWallpaperGrid=document.getElementById('mineWallpaperShop');
  MINE_WALLPAPERS.forEach(item=>{const owned=state.ownedMineWallpapers.includes(item.id),equipped=state.equippedMineWallpaper===item.id,card=document.createElement('article');card.className='cosmetic-card'+(equipped?' equipped':'');card.innerHTML=`<div class="mine-wallpaper-shop-preview" data-preview-mine-wallpaper="${item.id}" style="background:${item.preview}"><span class="shop-rock-sample" data-rock-skin="slate"><i>⛏️</i></span></div><h3>${item.name}</h3><p>${item.desc}</p><button type="button" ${equipped?'disabled':''}>${equipped?'Equipped':owned?'Equip':shopText('buyEquipNuggets',{value:item.cost.toLocaleString()})}</button>`;card.querySelector('button').addEventListener('click',()=>buyOrEquipMineCosmetic('wallpaper',item));mineWallpaperGrid.appendChild(card);});

  const pickaxeGrid=document.getElementById('menuPickaxeShop');
  PICKAXE_SKINS.forEach(skin=>{const owned=state.ownedPickaxeSkins.includes(skin.id),equipped=state.equippedPickaxeSkin===skin.id,card=document.createElement('article');card.className='cosmetic-card'+(equipped?' equipped':'');card.innerHTML=`<div class="cosmetic-preview"><span style="${skin.id==='standard'?'':pickaxePreviewStyle(skin.id)}">${skin.icon}</span></div><h3>${skin.name}</h3><p>${skin.desc}</p><button type="button" ${equipped?'disabled':''}>${equipped?'Equipped':owned?'Equip':`Preview — ${skin.cost.toLocaleString()} Nuggets`}</button>`;const button=card.querySelector('button');button.addEventListener('click',()=>{requestPickaxePurchase(skin,button);if(owned)renderShop();});pickaxeGrid.appendChild(card);});

  const themeGrid=document.getElementById('wallpaperThemeShop');
  SHOP_COLOR_THEMES.forEach(([value,name])=>{const selected=state.colorTheme===value,button=document.createElement('button');button.type='button';button.className=selected?'selected':'';button.innerHTML=`<span class="theme-swatch theme-${value}"></span><span>${name}<small>Free</small></span>`;button.addEventListener('click',()=>{state.colorTheme=value;state.equippedWallpaper='midnight';applyWallpaper();save();render();renderShop();setMessage(`${name} game colors selected. Wallpaper cleared.`,'correct');});themeGrid.appendChild(button);});
  const pageWallpaperGrid=document.getElementById('wallpaperShop');
  WALLPAPERS.forEach(wallpaper=>{const owned=state.ownedWallpapers.includes(wallpaper.id),equipped=state.colorTheme==='midnight'&&state.equippedWallpaper===wallpaper.id,card=document.createElement('article');card.className='cosmetic-card'+(equipped?' equipped':'');card.innerHTML=`<div class="wallpaper-preview" style="background:${wallpaper.preview};background-size:${wallpaper.id==='paper'?'18px 18px':'cover'}"></div><h3>${wallpaper.name}</h3><p>${wallpaper.desc}</p><button type="button" ${equipped?'disabled':''}>${equipped?'Equipped':owned?'Use wallpaper':`Buy — ${wallpaper.cost.toLocaleString()} Nuggets`}</button>`;card.querySelector('button').addEventListener('click',()=>{if(owned){state.colorTheme='midnight';state.equippedWallpaper=wallpaper.id;applyWallpaper();save();render();renderShop();setMessage(`${wallpaper.name} wallpaper equipped. Bright game colors cleared.`,'correct');}else if(spendStoneValue(wallpaper.cost)){state.ownedWallpapers.push(wallpaper.id);state.colorTheme='midnight';state.equippedWallpaper=wallpaper.id;applyWallpaper();save();render();renderShop();setMessage(`${wallpaper.name} purchased and equipped!`,'correct');}else setMessage(`You need ${wallpaper.cost.toLocaleString()} Nuggets for ${wallpaper.name}.`,'wrong');});pageWallpaperGrid.appendChild(card);});
};
const renderShopBeforeArcade=renderShop;
renderShop=function(){
  if(activeShopTab!=='arcade'){renderShopBeforeArcade();return;}
  const balance=document.getElementById('shopNuggetBalance');if(balance)balance.textContent=totalStoneValue().toLocaleString();
  document.querySelectorAll('[data-shop-tab]').forEach(button=>button.classList.toggle('primary',button.dataset.shopTab==='arcade'));
  const box=document.getElementById('shopContent');if(!box)return;box.innerHTML=window.LanguageMinerArcade?.shopMarkup?.()||'<p>Study Arcade is loading…</p>';window.LanguageMinerArcade?.bind?.(box,renderShop);
};
window.openJapaneseMinerArcadeShop=()=>openShop('arcade');
function scrollToSection(id){closeGameMenu();const el=document.getElementById(id);if(el)el.scrollIntoView({behavior:'smooth',block:'start'});}
document.getElementById('voiceToggle')?.addEventListener('change',e=>{state.voiceEnabled=e.target.checked;save();});
document.getElementById('autoSpeakToggle')?.addEventListener('change',e=>{state.autoSpeak=e.target.checked;save();});
document.getElementById('smartReviewToggle')?.addEventListener('change',e=>{state.smartReview=e.target.checked;save();});
document.getElementById('voiceRate')?.addEventListener('input',e=>{state.voiceRate=Number(e.target.value);document.getElementById('voiceRateLabel').textContent=`${state.voiceRate.toFixed(2)}×`;save();});
function testCurrentLearningVoice(){if(window.LanguageMinerCourseVoice?.test?.())return true;return speakJapanese('日本語を一緒に勉強しましょう。');}
document.getElementById('voiceGenderOptions')?.addEventListener('click',event=>{const button=event.target.closest?.('[data-voice-gender]');if(!button)return;state.voiceGender=button.dataset.voiceGender;save();render();testCurrentLearningVoice();});
document.getElementById('voiceStyleOptions')?.addEventListener('click',event=>{const button=event.target.closest?.('[data-voice-style]');if(!button)return;state.voiceStyle=button.dataset.voiceStyle;save();render();testCurrentLearningVoice();});
document.getElementById('testVoiceBtn')?.addEventListener('click',testCurrentLearningVoice);
document.getElementById('gameMenuBtn')?.addEventListener('click',openGameMenu);
document.getElementById('closeGameMenuBtn')?.addEventListener('click',closeGameMenu);
document.getElementById('backGameMenuToGame')?.addEventListener('click',closeGameMenu);
document.getElementById('gameMenuOverlay')?.addEventListener('click',e=>{if(e.target.id==='gameMenuOverlay')closeGameMenu();});
document.querySelectorAll('[data-menu-action]').forEach(btn=>btn.addEventListener('click',()=>{const a=btn.dataset.menuAction;if(a==='shop')openShop();else if(a==='stats'){closeGameMenu();setStatsDrawer(true);}else if(a==='course'){closeGameMenu();openAcademy();}else if(a==='path')scrollToSection('path');else if(a==='inventory')scrollToSection('gemCollection');else if(a==='notebook'){closeGameMenu();window.openJapaneseMinerNotebook?.();}else if(a==='quests'){closeGameMenu();window.openJapaneseMinerQuests?.();}else if(a==='missions'){closeGameMenu();window.openJapaneseMinerV5?.('missions');}else if(a==='mine'){closeGameMenu();document.getElementById('rock')?.scrollIntoView({behavior:'smooth',block:'center'});}}));
document.getElementById('closeShopBtn')?.addEventListener('click',closeShop);
document.getElementById('backStatsToMenu')?.addEventListener('click',()=>returnToGameMenu(()=>setStatsDrawer(false)));
document.getElementById('backShopToMenu')?.addEventListener('click',()=>returnToGameMenu(closeShop));
document.getElementById('backAcademyToMenu')?.addEventListener('click',()=>returnToGameMenu(closeAcademy));
document.getElementById('backDeveloperToMenu')?.addEventListener('click',()=>returnToGameMenu(closeDeveloperPanel));
document.getElementById('shopOverlay')?.addEventListener('click',e=>{if(e.target.id==='shopOverlay')closeShop();});
document.querySelectorAll('[data-shop-tab]').forEach(btn=>btn.addEventListener('click',()=>{activeShopTab=btn.dataset.shopTab;renderShop();}));
const renderV36=render;
render=function(){repairPlacementUnlocks();renderV36();applyWallpaper();if(document.getElementById('shopOverlay')?.classList.contains('open'))renderShop();};
applyWallpaper();

// v3.7 — Collapsible categories and properly randomized placement answers.
(function(){
  function panelTitle(panel){
    const title = panel.querySelector(':scope > .section-title, :scope > .academy-launch-head .section-title');
    if(title) return title;
    const candidate = panel.querySelector(':scope > h2, :scope > h3');
    return candidate || null;
  }

  function installCollapsiblePanels(){
    const panels=[...document.querySelectorAll('main > .panel, aside > .panel, body > .wrap > .panel, #app > .panel, .grid + .panel')];
    // Also include the large standalone panels that follow the main grid.
    document.querySelectorAll('#masterySection,#n5AcademySection').forEach(p=>panels.push(p));
    const unique=[...new Set(panels)].filter(p=>!p.hidden && !p.classList.contains('mine') && !p.dataset.collapsibleReady);
    unique.forEach((panel,index)=>{
      const title=panelTitle(panel);
      if(!title) return;
      panel.dataset.collapsibleReady='true';
      const key='jmCollapsed:'+((panel.id)||title.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g,'-')||index);
      const header=document.createElement('div');
      header.className='collapsible-heading';
      title.parentNode.insertBefore(header,title);
      header.appendChild(title);
      const toggle=document.createElement('button');
      toggle.type='button';
      toggle.className='collapse-toggle';
      toggle.setAttribute('aria-label',`Minimize ${title.textContent.trim()}`);
      toggle.innerHTML='⌃';
      header.appendChild(toggle);
      const body=document.createElement('div');
      body.className='collapsible-body';
      while(header.nextSibling) body.appendChild(header.nextSibling);
      panel.appendChild(body);
      const setCollapsed=(collapsed,savePref=true)=>{
        panel.classList.toggle('is-collapsed',collapsed);
        toggle.innerHTML=collapsed?'⌄':'⌃';
        toggle.setAttribute('aria-expanded',String(!collapsed));
        toggle.setAttribute('aria-label',`${collapsed?'Expand':'Minimize'} ${title.textContent.trim()}`);
        if(savePref) try{localStorage.setItem(key,collapsed?'1':'0');}catch(e){}
      };
      let collapsed=false;
      try{collapsed=localStorage.getItem(key)==='1';}catch(e){}
      setCollapsed(collapsed,false);
      toggle.addEventListener('click',()=>setCollapsed(!panel.classList.contains('is-collapsed')));
      header.addEventListener('click',e=>{if(e.target!==toggle)setCollapsed(!panel.classList.contains('is-collapsed'));});
    });
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',installCollapsiblePanels);
  else installCollapsiblePanels();
})();

// v4.3 cosmetic purchasing and bright palette controls.
const V43_COSMETIC_PRICES={hairStyle:2500,hairColor:1200,shirt:4000,pants:3000,accessory:3500};
document.addEventListener('click',event=>{
  const cosmetic=event.target.closest?.('[data-character-key]');
  if(cosmetic){
    const key=cosmetic.dataset.characterKey,value=cosmetic.dataset.characterValue,id=`${key}:${value}`;
    const owned=key==='skin'||state.ownedCosmetics?.includes(id);
    if(!owned){
      event.preventDefault();event.stopImmediatePropagation();
      const price=V43_COSMETIC_PRICES[key]||0;
      if(typeof window.previewJapaneseMinerCosmetic==='function'){window.previewJapaneseMinerCosmetic({type:'character',key,value,price,name:cosmetic.querySelector('span:last-child')?.childNodes[0]?.textContent?.trim()||'Character style',source:cosmetic});return;}
      if(!spendStoneValue(price)){setMessage(`You need ${price.toLocaleString()} Nuggets to unlock this style.`,'wrong');return;}
      state.ownedCosmetics.push(id);if(key==='accessory'){setSelectedAccessories(value==='none'?[]:[value]);}else state.character[key]=value;save();cosmetic.closest('.character-customizer')?.querySelectorAll(`[data-character-key="${key}"]`).forEach(x=>x.classList.toggle('selected',key==='accessory'?(value==='none'?x.dataset.characterValue==='none':x.dataset.characterValue===value):x===cosmetic));cosmetic.classList.remove('locked');cosmetic.classList.add('owned');const priceLabel=cosmetic.querySelector('small');if(priceLabel)priceLabel.textContent='Owned';render();
      setMessage(`New style unlocked for ${price.toLocaleString()} Nuggets!`,'correct');
    }
  }
  const theme=event.target.closest?.('[data-color-theme]');
  if(theme){state.colorTheme=theme.dataset.colorTheme;document.body.dataset.theme=state.colorTheme;theme.closest('.theme-choice-grid')?.querySelectorAll('button').forEach(x=>x.classList.toggle('selected',x===theme));save();render();}
},true);
const renderV43=render;
render=function(){renderV43();if(state?.colorTheme)document.body.dataset.theme=state.colorTheme;};
if(state?.colorTheme)document.body.dataset.theme=state.colorTheme;

// v3.8 — Quests, achievements, mistake notebook, detailed statistics, and portable account backups.
(function(){
  const DAY=86400000;
  const todayKey=()=>new Date().toISOString().slice(0,10);
  const weekKey=()=>{const d=new Date();const day=(d.getDay()+6)%7;d.setHours(0,0,0,0);d.setDate(d.getDate()-day);return d.toISOString().slice(0,10);};
  function ensureV38(){
    state.analytics=state.analytics||{answered:0,correct:0,wrong:0,reading:0,listening:0,grammar:0,vocabulary:0,kanji:0,minutes:0,firstStudyAt:0,lastAnswerAt:0};
    state.mistakes=Array.isArray(state.mistakes)?state.mistakes:[];
    state.notebookNotes=Array.isArray(state.notebookNotes)?state.notebookNotes.map((note,index)=>{const createdAt=Math.max(0,Number(note?.createdAt)||Date.now());return{id:String(note?.id||`legacy-note-${index}-${createdAt}`),mistakeKey:String(note?.mistakeKey||''),target:String(note?.target||'').slice(0,120),note:String(note?.note||'').slice(0,800),stage:Math.max(0,Number(note?.stage)||0),createdAt,updatedAt:Math.max(createdAt,Number(note?.updatedAt)||createdAt),tutor:Boolean(note?.tutor)};}).filter(note=>note.target&&note.note).slice(0,300):[];
    if(Number(state.notebookQueueVersion||0)<1){state.notebookView='queue';state.notebookQueueVersion=1;}
    else state.notebookView=['queue','review','stickies'].includes(state.notebookView)?state.notebookView:'queue';
    state.achievements=state.achievements||{};
    state.selectedTitle=state.selectedTitle||'';
    state.character=Object.assign({skin:'warm',hairStyle:'short',hairColor:'brown',shirt:'miner',pants:'denim',accessory:'none',accessories:[]},state.character||{});
    const validAccessories=['glasses','headband','helmet','earrings','scarf'];
    const legacyAccessory=state.character.accessory;
    state.character.accessories=Array.isArray(state.character.accessories)?state.character.accessories.filter(id=>validAccessories.includes(id)).slice(0,1):validAccessories.includes(legacyAccessory)?[legacyAccessory]:[];
    state.character.accessory=state.character.accessories[0]||'none';
    state.ownedCosmetics=Array.isArray(state.ownedCosmetics)?state.ownedCosmetics:['hairStyle:short','hairColor:brown','shirt:miner','pants:denim','accessory:none'];
    ['hairStyle:short','hairColor:brown','shirt:miner','pants:denim','accessory:none'].forEach(id=>{if(!state.ownedCosmetics.includes(id))state.ownedCosmetics.push(id);});
    state.colorTheme=['midnight','sunrise','sakura','aqua','candy'].includes(state.colorTheme)?state.colorTheme:'midnight';
    if(state.colorTheme!=='midnight')state.equippedWallpaper='midnight';
    state.questData=state.questData||{day:'',week:'',daily:{},weekly:{}};
    if(state.questData.day!==todayKey()) state.questData={...state.questData,day:todayKey(),daily:{}};
    if(state.questData.week!==weekKey()) state.questData={...state.questData,week:weekKey(),weekly:{}};
  }
  const DAILY_QUESTS=[
    {id:'daily-answer-12',name:'Morning Excavation',desc:'Answer 12 questions today.',goal:12,reward:3000,hints:0,shields:0,metric:()=>state.questData.daily.answered||0},
    {id:'daily-correct-10',name:'Careful Strikes',desc:'Answer 10 questions correctly today.',goal:10,reward:4000,hints:1,shields:0,metric:()=>state.questData.daily.correct||0},
    {id:'daily-streak-6',name:'Focused Vein',desc:'Reach a 6-answer correct streak.',goal:6,reward:6000,hints:0,shields:1,metric:()=>state.questData.daily.bestStreak||0},
    {id:'daily-review-3',name:'Memory Polish',desc:'Complete 3 scheduled Smart Reviews.',goal:3,reward:5000,hints:1,shields:0,metric:()=>state.questData.daily.reviews||0}
  ];
  const WEEKLY_QUESTS=[
    {id:'weekly-answer-125',name:'Deep Quarry Week',desc:'Answer 125 questions this week.',goal:125,reward:30000,hints:2,shields:0,metric:()=>state.questData.weekly.answered||0},
    {id:'weekly-correct-100',name:'Precision Expedition',desc:'Get 100 correct answers this week.',goal:100,reward:50000,hints:0,shields:2,metric:()=>state.questData.weekly.correct||0},
    {id:'weekly-study-5',name:'Five-Day Scholar',desc:'Study on 5 different days this week.',goal:5,reward:75000,hints:3,shields:1,metric:()=>state.questData.weekly.studyDays||0},
    {id:'weekly-review-20',name:'Long-Term Memory',desc:'Complete 20 scheduled Smart Reviews this week.',goal:20,reward:60000,hints:2,shields:2,metric:()=>state.questData.weekly.reviews||0}
  ];
  const ACHIEVEMENTS=[
    {id:'first',name:'First Strike',title:'New Miner',desc:'Answer your first question.',test:()=>state.analytics.answered>=1,reward:1000},
    {id:'hundred',name:'Century Miner',title:'Century Scholar',desc:'Answer 100 questions.',test:()=>state.analytics.answered>=100,reward:10000},
    {id:'thousand',name:'Deep Study',title:'Deep Miner',desc:'Answer 1,000 questions.',test:()=>state.analytics.answered>=1000,reward:75000},
    {id:'streak10',name:'Unbroken Focus',title:'Focused Miner',desc:'Reach a 10-answer streak.',test:()=>state.bestStreak>=10,reward:10000},
    {id:'streak30',name:'Blazing Focus',title:'Flame Scholar',desc:'Reach a 30-answer streak.',test:()=>state.bestStreak>=30,reward:50000},
    {id:'week',name:'Seven-Day Student',title:'Steady Scholar',desc:'Reach a 7-day study streak.',test:()=>Number(state.practiceStreak||0)>=7,reward:25000},
    {id:'kana',name:'Kana Master',title:'Kana Master',desc:'Clear Hiragana and Katakana.',test:()=>stageComplete(0)&&stageComplete(1),reward:50000},
    {id:'n5',name:'N5 Graduate',title:'N5 Graduate',desc:'Clear the JLPT N5 mine.',test:()=>stageComplete(2),reward:100000}
  ];
  function addNuggets(amount){addStoneChange(amount,Math.min(gemTiers.length-1,Math.max(2,selectedStageIndex()+3)));}
  function questRewardText(q){const rewards=[`${Number(q.reward||0).toLocaleString()} Nuggets`];if(q.hints)rewards.push(`${q.hints} Hint${q.hints===1?'':'s'}`);if(q.shields)rewards.push(`${q.shields} Shield${q.shields===1?'':'s'}`);return rewards.join(' + ');}
  function claimQuest(type,id){ensureV38();const list=type==='daily'?DAILY_QUESTS:WEEKLY_QUESTS;const q=list.find(x=>x.id===id),bucket=state.questData[type];if(!q||bucket['claimed_'+id]||q.metric()<q.goal)return;bucket['claimed_'+id]=true;addNuggets(q.reward);state.hints=Number(state.hints||0)+Number(q.hints||0);state.shields=Number(state.shields||0)+Number(q.shields||0);save();render();renderFeatureCenter('quests');setMessage(`${q.name} completed! ${questRewardText(q)} added.`,'correct');}
  function checkAchievements(){ensureV38();let gained=[];ACHIEVEMENTS.forEach(a=>{if(!state.achievements[a.id]&&a.test()){state.achievements[a.id]={unlockedAt:Date.now()};addNuggets(a.reward);gained.push(a);}});if(gained.length){save();setMessage(`Achievement unlocked: ${gained.map(a=>a.name).join(', ')}!`,'correct');}}
  function qCategory(q){const text=((q?.kind||'')+' '+(q?.prompt||'')).toLowerCase();if(text.includes('reading'))return'reading';if(text.includes('listen'))return'listening';if(text.includes('grammar')||text.includes('particle')||text.includes('conjug'))return'grammar';if(text.includes('kanji'))return'kanji';return'vocabulary';}
  function recordMistake(q,opt){if(!q)return;const key=q.id||`${q.stage}|${q.q}|${q.prompt}`;let item=state.mistakes.find(m=>m.key===key);if(!item){item={key,stage:Number(q.stage||0),question:q.q||q.displayChallenge||'',prompt:q.prompt||'',correct:q.a||'',lastAnswer:opt||'',count:0,lastMissed:0,resolved:false,tutor:tutorQuestion(q)};state.mistakes.unshift(item);}item.tutor=item.tutor||tutorQuestion(q);item.count++;item.lastMissed=Date.now();item.lastAnswer=opt||'';item.resolved=false;state.mistakes=state.mistakes.slice(0,300);}
  function assessmentMissRow(q,opt,source='Assessment'){
    const stage=Math.max(0,Math.min(stages.length-1,Number(q?.stage)||0));
    return{key:String(q?.id||`${stage}|${q?.q||q?.displayChallenge||''}|${q?.prompt||''}`),stage,stageLabel:String(stages[stage]?.label||''),question:stripMarkup(q?.q||q?.displayChallenge||''),prompt:stripMarkup(q?.prompt||''),correct:stripMarkup(q?.a||''),selected:stripMarkup(opt??''),source:String(source||'Assessment'),missedAt:Date.now()};
  }
  function assessmentMissesMarkup(rows){
    const missed=Array.isArray(rows)?rows:[];
    if(!missed.length)return `<section class="assessment-missed assessment-perfect"><div class="assessment-missed-heading"><span>✓</span><div><h4>No questions answered incorrectly</h4><p>Skipped and unanswered questions are not included in this review list.</p></div></div></section>`;
    return `<section class="assessment-missed"><div class="assessment-missed-heading"><span>📝</span><div><h4>${missed.length} question${missed.length===1?'':'s'} answered incorrectly</h4><p>Only questions you answered wrong are shown below and added to your Notebook. Skipped and unanswered questions are not included.</p></div></div><div class="assessment-missed-list">${missed.map((item,index)=>`<article class="assessment-missed-item"><div class="assessment-missed-number">${index+1}</div><div><small>${v3Esc(item.source)}${item.stageLabel?` · ${v3Esc(item.stageLabel)}`:''}</small><h5>${v3Esc(item.question||item.prompt||'Question')}</h5>${item.question&&item.prompt?`<p>${v3Esc(item.prompt)}</p>`:''}<dl><div><dt>Your answer</dt><dd>${v3Esc(item.selected)}</dd></div><div><dt>Correct answer</dt><dd>${v3Esc(item.correct)}</dd></div></dl></div></article>`).join('')}</div></section>`;
  }
  function recordWrongAssessment(q,opt,source='Assessment'){ensureV38();recordMistake(q,opt);save();return assessmentMissRow(q,opt,source);}
  window.japaneseMinerRecordWrongAssessment=recordWrongAssessment;
  window.japaneseMinerAssessmentMissRow=assessmentMissRow;
  window.japaneseMinerAssessmentMissesMarkup=assessmentMissesMarkup;
  const answerV38=answer;
  answer=function(opt,button){
    if(state.answered||!state.active)return;
    ensureV38();const q=state.active;const correct=opt===q.a,scheduledReview=Boolean(q?.id&&state.v5?.srs?.[q.id]?.dueAt<=Date.now());const beforeDay=state.questData.day;
    answerV38(opt,button);
    ensureV38();
    state.analytics.answered++;state.analytics[correct?'correct':'wrong']++;state.analytics.lastAnswerAt=Date.now();if(!state.analytics.firstStudyAt)state.analytics.firstStudyAt=Date.now();const cat=qCategory(q);state.analytics[cat]=(state.analytics[cat]||0)+1;
    state.questData.daily.answered=(state.questData.daily.answered||0)+1;state.questData.weekly.answered=(state.questData.weekly.answered||0)+1;
    if(correct){state.questData.daily.correct=(state.questData.daily.correct||0)+1;state.questData.weekly.correct=(state.questData.weekly.correct||0)+1;state.questData.daily.bestStreak=Math.max(state.questData.daily.bestStreak||0,state.streak||0);}else if(q.silentTesting!==true&&q.bossCourseStage==null)recordMistake(q,opt);
    if(scheduledReview){state.questData.daily.reviews=(state.questData.daily.reviews||0)+1;state.questData.weekly.reviews=(state.questData.weekly.reviews||0)+1;}
    const wk=weekKey();const days=(state.practiceDates||state.studyDates||[]).filter(d=>d>=wk);state.questData.weekly.studyDays=new Set(days).size;
    checkAchievements();save();
  };

  function featureShell(){
    if(document.getElementById('featureCenterOverlay'))return;
    document.body.insertAdjacentHTML('beforeend',`<div id="featureCenterOverlay" class="feature-center-overlay" aria-hidden="true"><section class="feature-center-card" role="dialog" aria-modal="true"><div class="feature-center-head"><button id="backFeatureCenterToMenu" class="menu-back-button" type="button">← Menu</button><div class="menu-header-copy"><div class="placement-kicker">Player center</div><h2 id="featureCenterTitle">Progress Center</h2></div><button id="closeFeatureCenter" class="placement-close" type="button">×</button></div><nav class="feature-tabs"><button data-feature-tab="profile">🧍 Character</button><button data-feature-tab="quests">🎯 Quests</button><button data-feature-tab="achievements">🏆 Achievements</button><button data-feature-tab="notebook">📓 Notebook</button><button data-feature-tab="statistics">📊 Statistics</button><button data-feature-tab="account">☁️ Account</button></nav><div id="featureCenterContent"></div></section></div>`);
    document.getElementById('closeFeatureCenter').addEventListener('click',closeFeatureCenter);
    document.getElementById('backFeatureCenterToMenu').addEventListener('click',()=>returnToGameMenu(closeFeatureCenter));
    document.getElementById('featureCenterOverlay').addEventListener('click',e=>{if(e.target.id==='featureCenterOverlay')closeFeatureCenter();});
    document.querySelectorAll('[data-feature-tab]').forEach(b=>b.addEventListener('click',()=>renderFeatureCenter(b.dataset.featureTab)));
  }
  let featureTab='quests';
  function openFeatureCenter(tab='quests'){featureShell();featureTab=tab==='mistakes'?'notebook':tab;document.getElementById('featureCenterOverlay').classList.add('open');syncPageScrollLock();renderFeatureCenter(featureTab);}
  window.openJapaneseMinerNotebook=()=>openFeatureCenter('notebook');
  window.openJapaneseMinerQuests=()=>openFeatureCenter('quests');
  function closeFeatureCenter(){document.getElementById('featureCenterOverlay')?.classList.remove('open');syncPageScrollLock();}
  function progressCard(q,type){const value=Math.min(q.goal,q.metric()),claimed=state.questData[type]['claimed_'+q.id],reward=questRewardText(q);return `<article class="quest-card"><div><strong>${q.name}</strong><p>${q.desc}</p><small class="quest-reward-line">Reward: ${reward}</small></div><div class="quest-progress"><span>${value}/${q.goal}</span><div class="mini-progress"><i style="width:${Math.round(value/q.goal*100)}%"></i></div></div><button data-claim-quest="${type}:${q.id}" ${value<q.goal||claimed?'disabled':''}>${claimed?'Claimed':value>=q.goal?'Claim rewards':'In progress'}</button></article>`;}

  const CHARACTER_OPTIONS={
    skin:[['light','Light'],['warm','Warm'],['tan','Tan'],['deep','Deep']],
    hairStyle:[['short','Short'],['spiky','Spiky'],['bob','Bob'],['long','Long'],['bun','Bun'],['buzz','Buzz'],['ponytail','Ponytail'],['wavy','Wavy'],['undercut','Undercut'],['twintails','Twin Tails'],['regalsweep','Regal Sweep'],['sidesweep','Side Sweep'],['flamespikes','Flame Spikes'],['texturedcrop','Textured Crop']],
    hairColor:[['black','Black'],['brown','Brown'],['blonde','Blonde'],['red','Red'],['blue','Blue'],['pink','Pink'],['silver','Silver'],['purple','Purple'],['teal','Teal'],['green','Emerald Green']],
    shirt:[['miner','Golden'],['academy','Blue'],['hoodie','Purple'],['festival','Rose Pink'],['armor','Red'],['casual','Green']],
    pants:[['denim','Denim Blue'],['black','Black'],['khaki','Khaki'],['white','White'],['purple','Purple'],['red','Red']],
    accessory:[['none','None'],['glasses','Glasses'],['headband','Headband'],['helmet','Miner Helmet'],['earrings','Earrings'],['scarf','Scarf']]
  };
  const COSMETIC_PRICES={hairStyle:2500,hairColor:1200,shirt:4000,pants:3000,accessory:3500};
  const COLOR_THEMES=[['midnight','Midnight','Free'],['sunrise','Sunrise','Free'],['sakura','Sakura','Free'],['aqua','Aqua','Free'],['candy','Candy','Free']];
  function cosmeticId(key,value){return `${key}:${value}`;}
  function cosmeticOwned(key,value){return key==='skin'||state.ownedCosmetics.includes(cosmeticId(key,value));}
  function selectedAccessories(character=state.character){return Array.isArray(character?.accessories)?character.accessories.filter(id=>['glasses','headband','helmet','earrings','scarf'].includes(id)):character?.accessory&&character.accessory!=='none'?[character.accessory]:[];}
  function setSelectedAccessories(items){state.character.accessories=[...new Set(items)].filter(id=>['glasses','headband','helmet','earrings','scarf'].includes(id)).slice(-1);state.character.accessory=state.character.accessories[0]||'none';}
  const HOLIDAY_OUTFIT_IMAGES={
    'new-year':'avatar-holiday-lantern-yukata-layer-v1.png',
    'winter-academy':'avatar-holiday-cozy-christmas-layer-v1.png',
    'holiday-explorer':'avatar-holiday-santa-celebration-layer-v1.png',
    'summer-matsuri':'avatar-holiday-summer-matsuri-layer-v1.png'
  };
  function renderedSources(c,style,fashion={}){
    const art=(category,value)=>window.getJapaneseMinerRecolor(`${style}/${category}/${value}`);
    const jacket=fashion.jacket||'none',gloves=fashion.gloves||'none',shoes=fashion.shoes||'boots',holidaySpecial=String(fashion.holidaySpecial||'none');
    return {
      skin:art('skin',c.skin),
      hair:art('hair',c.hairColor),
      shirt:jacket!=='none'?art('jacket',jacket):art('shirt','armor'),
   // Each color has its own textured, transparent pants artwork.  Do not start
   // from black and tint it: filters flatten the fabric and turn light colors
   // muddy.
      pants:art('pants',c.pants),
      gloves:gloves==='none'?'':art('gloves',gloves),
      shoes:art('shoes',shoes),
      holiday:HOLIDAY_OUTFIT_IMAGES[holidaySpecial]||''
    };
  }
  function syncRenderedAvatarLayers(avatar){
    if(!avatar)return;
    const style=avatar.dataset.hairStyle||'spiky';
    const c={skin:avatar.dataset.skin||'warm',hairColor:avatar.dataset.hairColor||'brown',shirt:avatar.dataset.shirt||'miner',pants:avatar.dataset.pants||'denim'};
    const fashion={jacket:avatar.dataset.jacket||'none',gloves:avatar.dataset.gloves||'none',shoes:avatar.dataset.shoes||'boots',holidaySpecial:avatar.dataset.holidaySpecial||'none'};
    const sources=renderedSources(c,style,fashion);
    Object.entries(sources).forEach(([name,src])=>{const layer=avatar.querySelector(`.native-${name}-layer`);if(!layer)return;if(src)layer.src=src;else layer.removeAttribute('src');});
  }
  window.syncJapaneseMinerRenderedLayers=syncRenderedAvatarLayers;
  window.addEventListener('jm-recolors-ready',()=>document.querySelectorAll('.miner-avatar').forEach(syncRenderedAvatarLayers));
  if(Object.keys(window.JM_RECOLOR_DATA||{}).length)queueMicrotask(()=>document.querySelectorAll('.miner-avatar').forEach(syncRenderedAvatarLayers));
  const CHARACTER_PORTRAIT_IMAGES={short:'short.png',spiky:'anime-miner-v1.png',bob:'bob.png',long:'long.png',bun:'bun.png',buzz:'buzz.png',ponytail:'ponytail.png',wavy:'wavy.png',undercut:'undercut.png',twintails:'twintails.png',regalsweep:'regal-sweep.png',sidesweep:'side-sweep.png',flamespikes:'flame-spikes.png',texturedcrop:'textured-crop.png'};
  // Full-canvas transparent artwork, scaled to the proportions approved in the
  // accessory portraits. These layers add only the item, never a replacement avatar.
  const ACCESSORY_OVERLAY_IMAGES={glasses:'accessory-layer-glasses.png',headband:'accessory-layer-headband.png',helmet:'accessory-layer-helmet.png',earrings:'accessory-layer-earrings.png',scarf:'accessory-layer-scarf.png'};
  function characterPortraitSource(style=state.character?.hairStyle){return CHARACTER_PORTRAIT_IMAGES[style]||CHARACTER_PORTRAIT_IMAGES.spiky;}
  function characterPortraitMarkup(){return `<img class="header-avatar-photo" src="${characterPortraitSource()}" alt="Your customized miner portrait" draggable="false">`;}
  function characterMarkup(size='large',override={},presentation={}){
    const savedCharacter=Object.assign({},state.character,override),tier=window.japaneseMinerSupporterTier?.()||0;
    const c=tier<1&&!presentation.allowLockedPreview?Object.assign({},savedCharacter,{hairStyle:'spiky',hairColor:'brown',shirt:'miner',pants:'denim',accessory:'none',accessories:[]}):savedCharacter;
    const avatarImage=characterPortraitSource(c.hairStyle);
    const maskStyle=CHARACTER_PORTRAIT_IMAGES[c.hairStyle]?c.hairStyle:'spiky';
    const fashion=window.getJapaneseMinerEffectiveFashion?.(tier)||(tier<1?{jacket:'none',gloves:'none',shoes:'boots',holidaySpecial:'none'}:Object.assign({jacket:'none',gloves:'none',shoes:'boots',holidaySpecial:'none'},state.v5?.fashion||{}));if(presentation.hideJacket)fashion.jacket='none';if(presentation.holidaySpecial)fashion.holidaySpecial=presentation.holidaySpecial;const sources=renderedSources(c,maskStyle,fashion);
    const layer=(name)=>`<img class="native-cosmetic-layer native-${name}-layer" ${sources[name]?`src="${sources[name]}"`:''} alt="" draggable="false">`;
    const accessories=selectedAccessories(c),portraitAccessory=accessories.length?' portrait-accessory':'',accessoryLayers=accessories.length?`<div class="portrait-accessory-images" aria-hidden="true">${accessories.map(id=>ACCESSORY_OVERLAY_IMAGES[id]?`<img class="portrait-accessory-image ${id}" src="${ACCESSORY_OVERLAY_IMAGES[id]}" alt="" draggable="false">`:'').join('')}</div>`:'';
    return `<div class="miner-avatar ${size}${portraitAccessory}" data-skin="${c.skin}" data-hair-style="${c.hairStyle}" data-hair-color="${c.hairColor}" data-shirt="${c.shirt}" data-pants="${c.pants}" data-accessory="multi" data-jacket="${fashion.jacket}" data-gloves="${fashion.gloves}" data-shoes="${fashion.shoes}" data-holiday-special="${fashion.holidaySpecial||'none'}" aria-label="Customized miner character">
      <img class="avatar-render" src="${avatarImage}" alt="" draggable="false">${accessoryLayers}<div class="native-wardrobe-layers" aria-hidden="true">${layer('skin')}${layer('hair')}${layer('shirt')}${layer('pants')}${layer('gloves')}${layer('shoes')}${layer('holiday')}</div><div class="avatar-shadow"></div><div class="avatar-legs"><i></i><i></i></div><div class="avatar-body"><div class="avatar-shirt-detail"></div><div class="avatar-collar"></div><div class="avatar-utility-belt"><i></i><i></i></div><div class="avatar-pendant"></div><div class="avatar-arm left"></div><div class="avatar-arm right"></div></div><div class="avatar-neck"></div><div class="avatar-head"><div class="avatar-ear left"></div><div class="avatar-ear right"></div><div class="avatar-hair back"></div><div class="avatar-face"><i class="brow left"></i><i class="brow right"></i><i class="eye left"></i><i class="eye right"></i><i class="mouth"></i></div><div class="avatar-hair front"></div><div class="avatar-hair-streak"></div><div class="avatar-accessory"></div></div></div>`;
  }
  window.japaneseMinerCharacterMarkup=characterMarkup;
  function optionButtons(key,label){return `<div class="character-option" data-character-section="${key}"><button type="button" class="character-option-toggle" aria-expanded="true"><span>${label}</span><b aria-hidden="true">⌄</b></button><div class="character-choice-grid">${CHARACTER_OPTIONS[key].map(([value,name],index)=>{const owned=cosmeticOwned(key,value),price=index===0?0:COSMETIC_PRICES[key]||0,visual=key!=='skin',hideJacket=['shirt','pants'].includes(key);return `<button type="button" data-character-key="${key}" data-character-value="${value}" class="${visual?'visual-choice ':''}${state.character[key]===value?'selected':''} ${owned?'owned':'locked'}">${visual?`<div class="choice-avatar-preview">${characterMarkup('mini',{[key]:value},{hideJacket})}</div>`:`<span class="choice-swatch ${key}-${value}"></span>`}<span>${name}<small>${owned?'Owned':`${price.toLocaleString()} 🪙`}</small></span></button>`;}).join('')}</div></div>`;}
  function renderProfile(){const player=document.getElementById('activePlayerName')?.textContent||'Miner',tier=window.japaneseMinerSupporterTier?.()||0,customizer=tier<1?`${optionButtons('skin','Skin tone — free')}${window.japaneseMinerSupporterGate?.(1,'Character cosmetics, gloves, shoes, and accessories')||''}`:`${optionButtons('skin','Skin tone — free')}${optionButtons('hairStyle','Hair style')}${optionButtons('hairColor','Hair color')}${optionButtons('shirt','Clothing top')}${optionButtons('pants','Clothing bottom')}${optionButtons('accessory','Accessory')}${window.renderJapaneseMinerAvatarApparel?.()||''}<button id="randomizeCharacterBtn" class="primary" type="button">🎲 Randomize owned style</button>`;return `<div class="character-profile"><section class="character-preview-card"><div class="profile-nameplate"><span class="placement-kicker">Your miner</span><h3>${player}</h3><p>${state.selectedTitle||'Language Learner'}</p><strong class="cosmetic-balance">🪙 ${totalStoneValue().toLocaleString()} Nuggets</strong></div>${characterMarkup('large')}<div class="character-save-note">Skin tones are free. Hair, clothes, gloves, shoes, accessories, and eligible Holiday Specials are saved to this profile.</div></section><section class="character-customizer">${customizer}</section></div>`;}
  function randomizeCharacter(){Object.entries(CHARACTER_OPTIONS).forEach(([key,values])=>{const available=values.filter(([value])=>cosmeticOwned(key,value));const picked=available[Math.floor(Math.random()*available.length)][0];if(key==='accessory')setSelectedAccessories(picked==='none'?[]:[picked]);else state.character[key]=picked;});save();renderFeatureCenter('profile');render();}
  function optionButtons(key,label){return `<div class="character-option" data-character-section="${key}"><button type="button" class="character-option-toggle" aria-expanded="true"><span>${label}</span><b aria-hidden="true">▼</b></button><div class="character-choice-grid">${CHARACTER_OPTIONS[key].map(([value,name],index)=>{const owned=cosmeticOwned(key,value),price=index===0?0:COSMETIC_PRICES[key]||0,visual=key!=='skin',hideJacket=['shirt','pants'].includes(key),selected=key==='accessory'?(value==='none'?selectedAccessories().length===0:selectedAccessories().includes(value)):state.character[key]===value,previewOverride=key==='accessory'&&value!=='none'?{accessories:[value],accessory:value}:{[key]:value};return `<button type="button" data-character-key="${key}" data-character-value="${value}" class="${visual?'visual-choice ':''}${selected?'selected':''} ${owned?'owned':'locked'}">${visual?`<div class="choice-avatar-preview">${characterMarkup('mini',previewOverride,{hideJacket})}</div>`:`<span class="choice-swatch ${key}-${value}"></span>`}<span>${name}<small>${owned?'Owned':`${price.toLocaleString()} 🪙`}</small></span></button>`;}).join('')}</div></div>`;}

  function optionButtons(key,label){return `<div class="character-option" data-character-section="${key}"><button type="button" class="character-option-toggle" aria-expanded="true"><span>${label}</span><b aria-hidden="true">▼</b></button><div class="character-choice-grid">${CHARACTER_OPTIONS[key].map(([value,name],index)=>{const owned=cosmeticOwned(key,value),price=index===0?0:COSMETIC_PRICES[key]||0,visual=key!=='skin',hideJacket=['shirt','pants'].includes(key),selected=key==='accessory'?(value==='none'?selectedAccessories().length===0:selectedAccessories().includes(value)):state.character[key]===value,previewOverride=key==='accessory'?(value==='none'?{accessories:[],accessory:'none'}:{accessories:[value],accessory:value}):{[key]:value};return `<button type="button" data-character-key="${key}" data-character-value="${value}" class="${visual?'visual-choice ':''}${selected?'selected':''} ${owned?'owned':'locked'}">${visual?`<div class="choice-avatar-preview">${characterMarkup('mini',previewOverride,{hideJacket,allowLockedPreview:key==='accessory'})}</div>`:`<span class="choice-swatch ${key}-${value}"></span>`}<span>${name}<small>${owned?'Owned':`${price.toLocaleString()} 🪙`}</small></span></button>`;}).join('')}</div></div>`;}
  window.renderJapaneseMinerCharacterShop=function(box){
    box.innerHTML=`<div class="shop-section-heading"><span>Character collection</span><h3>Avatar customization</h3><p>Hair, colors, clothing, accessories, gloves, shoes, and Tier 2 Holiday Specials now live together here.</p></div><div class="character-profile shop-character-profile"><section class="character-preview-card">${characterMarkup('large')}</section><section class="character-customizer">${optionButtons('skin','Skin tones — free')}${optionButtons('hairStyle','Hair styles')}${optionButtons('hairColor','Hair colors')}${optionButtons('shirt','Clothing tops')}${optionButtons('pants','Clothing bottoms')}${optionButtons('accessory','Accessories')}${window.renderJapaneseMinerAvatarApparel?.()||''}</section></div>`;
    box.querySelectorAll('[data-character-key]').forEach(b=>b.addEventListener('click',()=>{const key=b.dataset.characterKey,value=b.dataset.characterValue;if(!cosmeticOwned(key,value))return;if(key==='accessory')setSelectedAccessories(value==='none'?[]:[value]);else state.character[key]=value;save();render();renderShop();}));window.bindJapaneseMinerAvatarApparel?.(box,()=>window.renderJapaneseMinerCharacterShop(box));
  };

  function renderQuests(){const dailyClaimed=DAILY_QUESTS.filter(q=>state.questData.daily['claimed_'+q.id]).length,weeklyClaimed=WEEKLY_QUESTS.filter(q=>state.questData.weekly['claimed_'+q.id]).length;return `<div class="quest-dashboard-hero"><div><span>Personal objectives</span><h3>📜 Quests</h3><p>Build a consistent study routine. Quest rewards combine Nuggets with useful Hints and Shields.</p></div><b>${dailyClaimed+weeklyClaimed}/${DAILY_QUESTS.length+WEEKLY_QUESTS.length}</b></div><div class="feature-section"><h3>Daily quests</h3><p class="small">${dailyClaimed}/${DAILY_QUESTS.length} claimed · refresh each calendar day.</p>${DAILY_QUESTS.map(q=>progressCard(q,'daily')).join('')}<h3>Weekly quests</h3><p class="small">${weeklyClaimed}/${WEEKLY_QUESTS.length} claimed · refresh every Monday.</p>${WEEKLY_QUESTS.map(q=>progressCard(q,'weekly')).join('')}</div>`;}
  function renderAchievements(){const tier=window.japaneseMinerSupporterTier?.()||0;return `<div class="achievement-grid">${ACHIEVEMENTS.map(a=>{const unlocked=state.achievements[a.id];return `<article class="achievement-card ${unlocked?'unlocked':''}"><span>${unlocked?'🏆':'🔒'}</span><div><strong>${a.name}</strong><p>${a.desc}</p><small>Reward: ${a.reward.toLocaleString()} Nuggets · Title: ${a.title}</small></div>${unlocked?`<button data-title="${a.title}" ${state.selectedTitle===a.title||tier<1?'disabled':''}>${tier<1?'🔒 Supporter title':state.selectedTitle===a.title?'Equipped':'Use title'}</button>`:''}</article>`}).join('')}</div>`;}
  function visibleNotebookMistakes(){return state.mistakes.map((mistake,index)=>({mistake,index})).filter(({mistake})=>tutorAccessGranted()||(!mistake.tutor&&!tutorQuestion(questions.find(question=>String(question.id)===String(mistake.key)))));}
  function visibleNotebookNotes(){return state.notebookNotes.filter(note=>tutorAccessGranted()||!note.tutor).sort((a,b)=>Number(b.updatedAt)-Number(a.updatedAt));}
  function notebookNoteForMistake(key){return state.notebookNotes.find(note=>note.mistakeKey&&String(note.mistakeKey)===String(key))||null;}
  function notebookNoteId(){return `note-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;}
  function upsertNotebookNoteForMistake(index,text){
    ensureV38();const mistake=state.mistakes[Number(index)],value=String(text||'').trim().slice(0,800);if(!mistake)return false;
    const existing=notebookNoteForMistake(mistake.key);
    if(!value){if(existing)state.notebookNotes=state.notebookNotes.filter(note=>note.id!==existing.id);save();return true;}
    const now=Date.now(),target=String(mistake.question||mistake.prompt||'Study item').trim().slice(0,120);
    if(existing){existing.note=value;existing.target=target;existing.stage=Math.max(0,Number(mistake.stage)||0);existing.updatedAt=now;existing.tutor=Boolean(mistake.tutor);}
    else state.notebookNotes.unshift({id:notebookNoteId(),mistakeKey:String(mistake.key||''),target,note:value,stage:Math.max(0,Number(mistake.stage)||0),createdAt:now,updatedAt:now,tutor:Boolean(mistake.tutor)});
    state.notebookNotes=state.notebookNotes.slice(0,300);save();return true;
  }
  function createNotebookSticky(target,text){
    ensureV38();target=String(target||'').trim().slice(0,120);text=String(text||'').trim().slice(0,800);if(!target||!text)return false;
    const now=Date.now();state.notebookNotes.unshift({id:notebookNoteId(),mistakeKey:'',target,note:text,stage:selectedStageIndex(),createdAt:now,updatedAt:now,tutor:false});state.notebookNotes=state.notebookNotes.slice(0,300);save();return true;
  }
  function updateNotebookSticky(id,target,text){
    ensureV38();const sticky=state.notebookNotes.find(note=>String(note.id)===String(id));if(!sticky)return false;
    const nextTarget=String(target||sticky.target||'').trim().slice(0,120),nextText=String(text||'').trim().slice(0,800);if(!nextTarget||!nextText)return false;
    if(!sticky.mistakeKey)sticky.target=nextTarget;sticky.note=nextText;sticky.updatedAt=Date.now();save();return true;
  }
  function removeNotebookSticky(id){ensureV38();const before=state.notebookNotes.length;state.notebookNotes=state.notebookNotes.filter(note=>String(note.id)!==String(id));if(state.notebookNotes.length===before)return false;save();return true;}
  function renderNotebookReview(){
    const visible=visibleNotebookMistakes();
    if(!visible.length)return '<div class="empty-feature">📓 No difficult items saved yet. Incorrect mine answers will appear in your Notebook automatically.</div>';
    return `<div class="mistake-list notebook-entry-list">${visible.map(({mistake:m,index:i})=>{const sticky=notebookNoteForMistake(m.key);return `<article class="mistake-card notebook-entry ${m.resolved?'resolved':''} ${sticky?'has-sticky':''}"><div class="notebook-entry-copy"><span class="viz-badge">${v3Esc(stages[m.stage]?.label||'Review')}</span><h3>${v3Esc(m.question||m.prompt)}</h3><p>${v3Esc(m.prompt)}</p><p><strong>Correct:</strong> ${v3Esc(m.correct)} · <strong>Your last answer:</strong> ${v3Esc(m.lastAnswer)}</p><small>Missed ${Number(m.count)||0} time${Number(m.count)===1?'':'s'} · ${new Date(m.lastMissed).toLocaleDateString()}</small></div><div class="notebook-entry-actions"><button data-resolve-mistake="${i}">${m.resolved?'Restore':'Mark reviewed'}</button></div><section class="sticky-note-editor"><label for="mistakeNote${i}">🗒️ Sticky note for this word or phrase</label><textarea id="mistakeNote${i}" data-mistake-note="${i}" maxlength="800" rows="3" placeholder="Write a memory trick, tutor explanation, example sentence, or personal reference…">${v3Esc(sticky?.note||'')}</textarea><div><small>${sticky?'Saved to the Sticky Notes tab.':'This note will stay attached to this Notebook item.'}</small><button data-save-mistake-note="${i}">${sticky?'Update sticky note':'Stick note to this item'}</button></div></section></article>`;}).join('')}</div>`;
  }
  function renderNotebookStickies(){
    const notes=visibleNotebookNotes();
    return `<section class="new-sticky-note"><span>New reference</span><h3>Create a sticky note</h3><p>Add any word or phrase you want to remember, even if it has not appeared as a mistake yet.</p><label for="newStickyTarget">Word or phrase</label><input id="newStickyTarget" maxlength="120" placeholder="Example: つき"><label for="newStickyText">Your reference or memory tip</label><textarea id="newStickyText" maxlength="800" rows="4" placeholder="Example: 月 means moon/month. Picture the moon appearing once each month."></textarea><button id="createStickyNoteBtn" class="primary" type="button">Add sticky note</button></section>${notes.length?`<div class="sticky-note-grid">${notes.map(note=>`<article class="saved-sticky-note" data-sticky-id="${v3Esc(note.id)}"><header><span>🗒️ ${note.mistakeKey?'Attached note':'Personal note'}</span><button data-delete-sticky="${v3Esc(note.id)}" aria-label="Delete sticky note">×</button></header><label>Word or phrase</label><input data-sticky-target maxlength="120" value="${v3Esc(note.target)}" ${note.mistakeKey?'readonly':''}><label>Reference</label><textarea data-sticky-text maxlength="800" rows="4">${v3Esc(note.note)}</textarea><footer><small>${stages[note.stage]?.label||'Personal'} · Updated ${new Date(note.updatedAt).toLocaleDateString()}</small><button data-save-sticky="${v3Esc(note.id)}">Save changes</button></footer></article>`).join('')}</div>`:'<div class="empty-feature">🗒️ No sticky notes yet. Attach one to a difficult item or create your own reference above.</div>'}`;
  }
  function notebookSmartReviewStatus(){
    try{return window.japaneseMinerSmartReview?.status?.()||{active:false,dueCount:0,total:0,completed:0,remaining:0,canStart:false};}
    catch(_error){return {active:false,dueCount:0,total:0,completed:0,remaining:0,canStart:false};}
  }
  function notebookSmartReviewItems(){try{return window.japaneseMinerSmartReview?.items?.()||[];}catch(_error){return [];}}
  function renderNotebookSmartReview(){
    const review=notebookSmartReviewStatus(),headline=review.active?'Smart Review in progress':review.dueCount?`${review.dueCount} Smart Review${review.dueCount===1?'':'s'} due`:'Nothing is due right now.',progress=review.active?`${review.completed} of ${review.total} completed`:review.dueCount?'Choose any due word below.':'New due items will appear here automatically.';
    return `<section class="notebook-smart-review ${review.active?'session-active':''}"><div class="notebook-smart-review-icon" aria-hidden="true">🧠</div><div class="notebook-smart-review-copy"><span>Established long-term review</span><h3>${headline}</h3><p>Review all due items in a saved session, or choose one from the queue below.</p><small>${progress}</small></div><div class="notebook-smart-review-actions"><button class="primary" type="button" data-notebook-smart-review="start" ${review.canStart?'':'disabled'}>${review.active?'Continue Smart Review':'Start Smart Review'}</button><button type="button" data-notebook-smart-review="center">Open Review Center</button></div></section>`;
  }
  function renderNotebookReviewQueue(){
    const items=notebookSmartReviewItems();if(!items.length)return '<div class="empty-feature notebook-review-empty">🧠 Nothing is due right now. New review words will appear here automatically.</div>';
    const cards=items.map(item=>{const searchable=`${item.term} ${item.answer} ${item.prompt} ${item.stageLabel}`.toLocaleLowerCase(),status=item.current?'Current review':item.inSession?'In saved queue':'Due now';return `<article class="notebook-review-item ${item.current?'current':''}" data-notebook-review-item data-review-search="${v3Esc(searchable)}"><div class="notebook-review-word">${v3Esc(item.term)}</div><div class="notebook-review-details"><div><span>${v3Esc(item.stageLabel)}</span><em>${status}</em></div><strong>${v3Esc(item.answer)}</strong>${item.prompt&&item.prompt!==item.term?`<p>${v3Esc(item.prompt)}</p>`:''}<small>Reviewed ${Number(item.reviewed)||0} time${Number(item.reviewed)===1?'':'s'}</small></div><button type="button" data-review-word="${v3Esc(item.id)}">${item.current?'Continue this review':'Review this word'}</button></article>`;}).join('');
    return `<section class="notebook-review-browser"><header><div><span>Due review words</span><h3>Choose what to review</h3><p>Search every due item, then select the exact word or question you want to review next.</p></div><strong>${items.length}</strong></header><div class="notebook-review-search"><label for="notebookReviewSearch">Search due words</label><div><input id="notebookReviewSearch" type="search" autocomplete="off" placeholder="Search by word, meaning, prompt, or mine…"><button id="clearNotebookReviewSearch" type="button" hidden>Clear</button></div><small id="notebookReviewVisibleCount" aria-live="polite">Showing ${items.length} of ${items.length} due items</small></div><div class="notebook-review-list">${cards}</div><p id="notebookReviewNoMatches" class="notebook-review-no-matches" hidden>No review words match this search.</p></section>`;
  }
  function renderNotebook(){ensureV38();const difficult=visibleNotebookMistakes().length,stickies=visibleNotebookNotes().length,review=notebookSmartReviewStatus(),view=state.notebookView;return `<div class="notebook-hero"><div><span>Personal study reference</span><h3>📓 Study Notebook</h3><p>Choose review words, inspect difficult items, and keep your own memory notes.</p></div><b title="${review.dueCount} words due">${review.dueCount}</b></div>${renderNotebookSmartReview()}<nav class="notebook-tabs" aria-label="Notebook sections"><button data-notebook-view="queue" class="${view==='queue'?'primary':''}">🧠 Review Queue <span>${review.dueCount}</span></button><button data-notebook-view="review" class="${view==='review'?'primary':''}">📖 Difficult <span>${difficult}</span></button><button data-notebook-view="stickies" class="${view==='stickies'?'primary':''}">🗒️ Notes <span>${stickies}</span></button></nav>${view==='queue'?renderNotebookReviewQueue():view==='stickies'?renderNotebookStickies():renderNotebookReview()}`;}
  function statPercent(){return state.analytics.answered?Math.round(state.analytics.correct/state.analytics.answered*100):0;}
  function renderStatistics(){const days=(state.practiceDates||state.studyDates||[]).length;const weakest=['vocabulary','kanji','grammar','reading','listening'].sort((a,b)=>(state.analytics[a]||0)-(state.analytics[b]||0))[0];return `<div class="stats-feature-grid"><div class="metric-card"><span>Total questions</span><strong class="viz-stat-value">${state.analytics.answered.toLocaleString()}</strong></div><div class="metric-card"><span>Overall accuracy</span><strong class="viz-stat-value">${statPercent()}%</strong></div><div class="metric-card"><span>Study days</span><strong class="viz-stat-value">${days}</strong></div><div class="metric-card"><span>Best streak</span><strong class="viz-stat-value">${Number(state.bestStreak||0)}</strong></div></div><div class="feature-section"><h3>Practice distribution</h3>${['vocabulary','kanji','grammar','reading','listening'].map(k=>`<div class="stat-row"><span>${k[0].toUpperCase()+k.slice(1)}</span><strong>${Number(state.analytics[k]||0).toLocaleString()}</strong></div>`).join('')}<div class="viz-callout"><strong>Recommended focus:</strong> ${weakest[0].toUpperCase()+weakest.slice(1)} has received the least practice so far.</div><h3>Current progression</h3>${stages.map((s,i)=>`<div class="stat-row"><span>${s.label}</span><strong>${Math.round(stageMastery(i))}% mastery · ${Number(state.stageXp[i]||0).toLocaleString()} XP</strong></div>`).join('')}</div>`;}
  function backupPayload(){const profiles=readProfiles();const profile=profiles.find(p=>p.id===activeProfileId);return {format:'JapaneseMinerBackup',version:'4.0',exportedAt:new Date().toISOString(),profile:{name:profile?.name||'Player',id:activeProfileId},state};}
  function downloadBackup(){const blob=new Blob([JSON.stringify(backupPayload(),null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`language-miner-${(document.getElementById('activePlayerName')?.textContent||'player').replace(/[^a-z0-9]+/gi,'-').toLowerCase()}-backup.json`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);}
  function importBackup(file){const reader=new FileReader();reader.onload=()=>{try{const data=JSON.parse(reader.result);if(data.format!=='JapaneseMinerBackup'||!data.state)throw new Error('Invalid Language Miner backup.');if(!confirm('Replace this profile’s current progress with the imported backup?'))return;state=normalizeState(data.state);repairTutorAccessState();ensureV38();save();render();closeFeatureCenter();setMessage('Account backup imported successfully.','correct');}catch(e){alert(e.message||'The backup could not be imported.');}};reader.readAsText(file);}
  function renderAccount(){const supporter=window.japaneseMinerSupporterEntitlement?.()||{tier:0,connected:false};return `<div class="feature-section"><div class="viz-callout"><strong>Portable account backup</strong><br>This build stores gameplay profiles in the browser. Exporting a backup lets you move progress to another phone or browser safely.</div><button id="exportBackupBtn" class="primary" type="button">⬇️ Export account backup</button><label class="backup-upload">⬆️ Import account backup<input id="importBackupInput" type="file" accept="application/json"></label><h3>Cloud supporter status</h3><p>Patreon verification uses a secure cloud account when configured. Gameplay progress remains local unless you export and import a backup.</p><div class="stat-row"><span>Patreon connection</span><strong>${supporter.tier>0?`Tier ${supporter.tier} · ${supporter.tier_name||'Verified supporter'}`:supporter.connected?'Connected · no paid tier':'Not connected'}</strong></div><div class="stat-row"><span>Active profile ID</span><strong>${activeProfileId||'Not signed in'}</strong></div><div class="stat-row"><span>Selected title</span><strong>${state.selectedTitle||'None'}</strong></div></div>`;}
  function renderFeatureCenter(tab){
    ensureV38();tab=tab==='mistakes'?'notebook':tab;featureTab=tab;featureShell();
    document.querySelectorAll('[data-feature-tab]').forEach(b=>b.classList.toggle('primary',b.dataset.featureTab===tab));
    const title=document.getElementById('featureCenterTitle');if(title)title.textContent=tab==='notebook'?'Study Notebook':'Progress Center';
    const content=document.getElementById('featureCenterContent');content.innerHTML=tab==='profile'?renderProfile():tab==='quests'?renderQuests():tab==='achievements'?renderAchievements():tab==='notebook'?renderNotebook():tab==='statistics'?renderStatistics():renderAccount();
    content.querySelectorAll('[data-character-key]').forEach(b=>b.addEventListener('click',()=>{const key=b.dataset.characterKey,value=b.dataset.characterValue;if(key==='accessory')setSelectedAccessories(value==='none'?[]:[value]);else state.character[key]=value;save();renderFeatureCenter('profile');render();}));
    document.getElementById('randomizeCharacterBtn')?.addEventListener('click',randomizeCharacter);if(tab==='profile')window.bindJapaneseMinerAvatarApparel?.(content,()=>renderFeatureCenter('profile'));
    content.querySelectorAll('[data-claim-quest]').forEach(b=>b.addEventListener('click',()=>{const [type,id]=b.dataset.claimQuest.split(':');claimQuest(type,id);}));
    content.querySelectorAll('[data-title]').forEach(b=>b.addEventListener('click',()=>{if((window.japaneseMinerSupporterTier?.()||0)<1)return;state.selectedTitle=b.dataset.title;save();renderFeatureCenter('achievements');render();}));
    content.querySelectorAll('[data-notebook-view]').forEach(b=>b.addEventListener('click',()=>{state.notebookView=['queue','review','stickies'].includes(b.dataset.notebookView)?b.dataset.notebookView:'queue';save();renderFeatureCenter('notebook');}));
    content.querySelectorAll('[data-notebook-smart-review]').forEach(b=>b.addEventListener('click',()=>{const api=window.japaneseMinerSmartReview,action=b.dataset.notebookSmartReview;if(!api)return;closeFeatureCenter();if(action==='center'){api.openCenter?.();return;}if(api.start?.()===false)api.openCenter?.();}));
    content.querySelectorAll('[data-review-word]').forEach(b=>b.addEventListener('click',()=>{const api=window.japaneseMinerSmartReview,questionId=b.dataset.reviewWord;if(!api||!questionId)return;closeFeatureCenter();if(api.start?.(questionId)===false)api.openCenter?.();}));
    const reviewSearch=document.getElementById('notebookReviewSearch'),clearReviewSearch=document.getElementById('clearNotebookReviewSearch');if(reviewSearch){const filterReviewWords=()=>{const query=reviewSearch.value.trim().toLocaleLowerCase(),cards=[...content.querySelectorAll('[data-notebook-review-item]')];let visible=0;cards.forEach(card=>{const match=!query||String(card.dataset.reviewSearch||'').includes(query);card.hidden=!match;if(match)visible++;});const count=document.getElementById('notebookReviewVisibleCount'),empty=document.getElementById('notebookReviewNoMatches');if(count)count.textContent=`Showing ${visible} of ${cards.length} due items`;if(empty)empty.hidden=visible>0;if(clearReviewSearch)clearReviewSearch.hidden=!query;};reviewSearch.addEventListener('input',filterReviewWords);clearReviewSearch?.addEventListener('click',()=>{reviewSearch.value='';filterReviewWords();reviewSearch.focus();});}
    content.querySelectorAll('[data-resolve-mistake]').forEach(b=>b.addEventListener('click',()=>{const m=state.mistakes[Number(b.dataset.resolveMistake)];if(m){m.resolved=!m.resolved;save();renderFeatureCenter('notebook');}}));
    content.querySelectorAll('[data-save-mistake-note]').forEach(b=>b.addEventListener('click',()=>{const index=Number(b.dataset.saveMistakeNote),text=content.querySelector(`[data-mistake-note="${index}"]`)?.value||'';if(upsertNotebookNoteForMistake(index,text)){setMessage(text.trim()?'Sticky note saved to this Notebook item.':'Sticky note removed.','correct');renderFeatureCenter('notebook');}}));
    document.getElementById('createStickyNoteBtn')?.addEventListener('click',()=>{const target=document.getElementById('newStickyTarget')?.value||'',text=document.getElementById('newStickyText')?.value||'';if(!createNotebookSticky(target,text)){setMessage('Enter both a word or phrase and a reference before saving.','wrong');return;}setMessage('New sticky note added to your Notebook.','correct');renderFeatureCenter('notebook');});
    content.querySelectorAll('[data-save-sticky]').forEach(b=>b.addEventListener('click',()=>{const card=b.closest('[data-sticky-id]'),target=card?.querySelector('[data-sticky-target]')?.value||'',text=card?.querySelector('[data-sticky-text]')?.value||'';if(!updateNotebookSticky(b.dataset.saveSticky,target,text)){setMessage('A sticky note needs both a target and a reference.','wrong');return;}setMessage('Sticky note updated.','correct');renderFeatureCenter('notebook');}));
    content.querySelectorAll('[data-delete-sticky]').forEach(b=>b.addEventListener('click',()=>{if(removeNotebookSticky(b.dataset.deleteSticky)){setMessage('Sticky note removed.','correct');renderFeatureCenter('notebook');}}));
    document.getElementById('exportBackupBtn')?.addEventListener('click',downloadBackup);
    document.getElementById('importBackupInput')?.addEventListener('change',e=>{if(e.target.files[0])importBackup(e.target.files[0]);});
    if(tab==='profile')window.refreshJapaneseMinerCompanionDisplays?.();
  }

  function addMenuItems(){const grid=document.querySelector('.game-menu-grid');if(!grid)return;const items=[['profile','🧍','Character','Customize hair, skin, and clothing'],['quests','🎯','Quests','Daily and weekly rewards'],['achievements','🏆','Achievements','Titles and milestones'],['notebook','📓','Notebook','Review queue, difficult items, and notes'],['statistics','📈','Player Stats','Accuracy and study trends'],['account','☁️','Account','Backup and transfer saves']];items.forEach(([tab,icon,name,desc])=>{if(grid.querySelector(`[data-feature-open="${tab}"],[data-menu-action="${tab}"]`))return;const b=document.createElement('button');b.type='button';b.dataset.featureOpen=tab;b.dataset.menuCategoryName=tab==='profile'||tab==='notebook'?'gear':'player';b.innerHTML=`<span>${icon}</span><strong>${name}</strong><small>${desc}</small>`;b.addEventListener('click',()=>{closeGameMenu();openFeatureCenter(tab);});grid.appendChild(b);});}
  window.refreshJapaneseMinerFeatureMenu=addMenuItems;
  function v38AdminAllowed(){return window.japaneseMinerIsDeveloperSession?.()===true;}
  function v38AdminUnlockAll(){if(!v38AdminAllowed())return false;ensureV38();state.ownedCosmetics=Object.entries(CHARACTER_OPTIONS).filter(([key])=>key!=='skin').flatMap(([key,items])=>items.map(([value])=>cosmeticId(key,value)));ACHIEVEMENTS.forEach(item=>state.achievements[item.id]=true);return true;}
  function v38AdminResetCosmetics(){if(!v38AdminAllowed())return false;state.character={skin:'warm',hairStyle:'short',hairColor:'brown',shirt:'miner',pants:'denim',accessory:'none',accessories:[]};state.ownedCosmetics=['hairStyle:short','hairColor:brown','shirt:miner','pants:denim','accessory:none'];state.selectedTitle='';return true;}
  window.japaneseMinerV38Admin=Object.freeze({unlockAll:v38AdminUnlockAll,resetCosmetics:v38AdminResetCosmetics});
  const renderV38=render;render=function(){ensureV38();renderV38();checkAchievements();const chip=document.querySelector('.account-chip #activePlayerName');if(chip&&state.selectedTitle)chip.title=state.selectedTitle;let mini=document.getElementById('headerCharacterAvatar');if(!mini){const holder=document.querySelector('.account-chip');if(holder){mini=document.createElement('button');mini.id='headerCharacterAvatar';mini.className='header-character-avatar';mini.type='button';mini.title='Customize character';mini.setAttribute('aria-label','Open character customization');mini.addEventListener('click',()=>openFeatureCenter('profile'));holder.prepend(mini);}}if(mini){mini.innerHTML=characterPortraitMarkup();const portrait=mini.querySelector('.header-avatar-photo');if(portrait)portrait.onerror=()=>{portrait.onerror=null;portrait.src='anime-miner-v1.png';};}};
  const loadV38=loadProfile;loadProfile=function(profile,...args){const result=loadV38(profile,...args);ensureV38();save();return result;};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{featureShell();addMenuItems();});else{featureShell();addMenuItems();}
})();

// Finish restoring all v4.3 profile features after an automatic refresh sign-in.
if(activeProfileId)render();



// v6.4.11 - Course-synced JLPT vocabulary lessons with a required word preview.
const JLPT_VOCABULARY_LESSON_SIZE=25;
const JLPT_VOCABULARY_LAYOUT_VERSION=25;
const JLPT_VOCABULARY_UNLOCK_MASTERY=75;
const JLPT_REVIEW_QUIZ_QUESTION_COUNT=25;
  const JLPT_REVIEW_QUIZ_TIME_MS=2.5*60*1000;
const JLPT_REVIEW_QUIZ_PASS_SCORE=75;
const JLPT_REVIEW_AUTO_ADVANCE_DELAY_MS=650;
let jlptReviewQuizInterval=null;
let jlptReviewAutoAdvanceTimer=null;
const JLPT_SECTION_SPECS=[
  {id:"vocabulary",name:"Vocabulary",icon:"語"},
  {id:"kanji",name:"Kanji",icon:"字"},
  {id:"grammar",name:"Grammar",icon:"文"},
  {id:"reading",name:"Reading",icon:"読"}
];
const JLPT_SECTION_IDS=new Set(JLPT_SECTION_SPECS.map(section=>section.id));
function jlptQuestionSection(question){
  const kind=String(question?.kind||"").toLowerCase();
  if(kind.includes("vocab"))return "vocabulary";
  if(kind.includes("kanji"))return "kanji";
  if(kind.includes("grammar")||kind==="tutor-verb"||kind==="tutor-particle"||kind==="tutor-pattern"||kind==="tutor-adjective")return "grammar";
  return "reading";
}
function ensureJlptSectionState(target=state){
  if(!target.jlptSectionSelection||typeof target.jlptSectionSelection!=="object"||Array.isArray(target.jlptSectionSelection))target.jlptSectionSelection={};
  if(!target.jlptVocabularyLevel||typeof target.jlptVocabularyLevel!=="object"||Array.isArray(target.jlptVocabularyLevel))target.jlptVocabularyLevel={};
  if(!target.jlptSectionLevel||typeof target.jlptSectionLevel!=="object"||Array.isArray(target.jlptSectionLevel))target.jlptSectionLevel={};
  if(!target.jlptReviewCheckpoints||typeof target.jlptReviewCheckpoints!=="object"||Array.isArray(target.jlptReviewCheckpoints))target.jlptReviewCheckpoints={};
  migrateJlptVocabularyLessonLayout(target);
  Object.values(target.jlptReviewCheckpoints).forEach(record=>{if(record&&typeof record==='object'){record.fastestTimeMs=normalizeAssessmentTimeMs(record.fastestTimeMs);record.fastestAt=record.fastestTimeMs?Math.max(0,Number(record.fastestAt)||0):0;}});
  for(let stage=2;stage<stages.length;stage++){
    const section=String(target.jlptSectionSelection[stage]||"vocabulary");
    target.jlptSectionSelection[stage]=JLPT_SECTION_IDS.has(section)?section:"vocabulary";
    target.jlptVocabularyLevel[stage]=Math.max(0,Number(target.jlptVocabularyLevel[stage])||0);
    if(!target.jlptSectionLevel[stage]||typeof target.jlptSectionLevel[stage]!=="object"||Array.isArray(target.jlptSectionLevel[stage]))target.jlptSectionLevel[stage]={};
    JLPT_SECTION_SPECS.forEach(({id})=>{target.jlptSectionLevel[stage][id]=Math.max(0,Number(target.jlptSectionLevel[stage][id])||0);});
    target.jlptSectionLevel[stage].vocabulary=target.jlptVocabularyLevel[stage];
  }
  return target;
}
function migrateJlptVocabularyLessonLayout(target){
  if(Number(target.jlptVocabularyLessonSize)===JLPT_VOCABULARY_LAYOUT_VERSION)return false;
  const oldCheckpoints=target.jlptReviewCheckpoints&&typeof target.jlptReviewCheckpoints==="object"?target.jlptReviewCheckpoints:{},migrated={};
  Object.entries(oldCheckpoints).forEach(([key,record])=>{
    const [stage,section,evenLessonText]=key.split(":"),evenLesson=Number(evenLessonText);
    if(section!=="vocabulary"||evenLesson<2||evenLesson%2!==0){migrated[key]=record;return;}
    [evenLesson*2-2,evenLesson*2].forEach(newEvenLesson=>{migrated[`${stage}:vocabulary:${newEvenLesson}`]={...(record&&typeof record==="object"?record:{}),migratedFrom50WordLessons:true};});
  });
  if(target.jlptVocabularyLevel&&typeof target.jlptVocabularyLevel==="object")Object.keys(target.jlptVocabularyLevel).forEach(stage=>{target.jlptVocabularyLevel[stage]=Math.max(0,Number(target.jlptVocabularyLevel[stage])||0)*2;});
  target.jlptReviewCheckpoints=migrated;target.jlptVocabularyLessonSize=JLPT_VOCABULARY_LAYOUT_VERSION;return true;
}
function currentJlptSection(stage=selectedStageIndex()){
  ensureJlptSectionState();
  return Number(stage)>=2?state.jlptSectionSelection[Number(stage)]:"vocabulary";
}
function jlptQuestionPoolForStage(stage,respectTier=false){
  stage=Number(stage);
  let pool=questions.filter(question=>Number(question.stage)===stage&&questionAllowedForSession(question));
  if(stage!==2)return pool;
  if(respectTier){
    const tierOrder={beginner:0,intermediate:1,advanced:2},selectedTier=tierOrder[state.n5Tier||"beginner"];
    pool=pool.filter(question=>question.tier==null||tierOrder[question.tier]<=selectedTier);
  }
  const curriculum=tutorAccessGranted()?(state.n5Curriculum||"mixed"):"standard";
  if(curriculum==="standard")pool=pool.filter(question=>question.curriculum!=="tutor");
  if(curriculum==="tutor")pool=pool.filter(question=>question.curriculum==="tutor");
  if(curriculum!=="standard"&&(state.tutorTrack||"all")!=="all"){
    const track=state.tutorTrack;
    pool=pool.filter(question=>question.curriculum!=="tutor"||question.tutorTrack===track);
  }
  return pool;
}
function jlptSectionQuestionPool(stage,section=currentJlptSection(stage)){
  return jlptQuestionPoolForStage(stage,false).filter(question=>jlptQuestionSection(question)===section);
}
function jlptPoolMastery(pool){
  if(!Array.isArray(pool)||!pool.length)return 0;
  return Math.round(pool.reduce((sum,question)=>sum+questionMasteryScore(state.questionStats?.[question.id]),0)/pool.length);
}
function jlptVocabularyTarget(stage){return Number(stage)===2?1000:Number(JLPT_COURSES[Number(stage)]?.vocabTarget||0);}
function jlptVocabularyWords(stage){
  stage=Number(stage);
  if(stage===2){
    return academyVocabularyBank().map((word,sourceIndex)=>({jp:word.jp,reading:word.reading,en:word.en,sourceIndex,masteryId:v3VocabId(sourceIndex),key:String(word.jp),index:sourceIndex}));
  }
  const availableKeys=new Set(jlptSectionQuestionPool(stage,"vocabulary").map(question=>String(question.vocabularyKey||"" )).filter(Boolean));
  const course=JLPT_COURSES[stage];
  return (course?.vocab||[]).map((word,sourceIndex)=>({jp:word[0],reading:word[1],en:word[2],sourceIndex,masteryId:jlptMasteryId("vocab",sourceIndex,stage),key:String(word[0])})).filter(word=>availableKeys.has(word.key)).map((word,index)=>({...word,index}));
}
function jlptVocabularyWordMastery(word){return word?academyItemMastery(word.masteryId):0;}
function averageMastery(ids){return ids.length?Math.round(ids.reduce((sum,id)=>sum+academyItemMastery(id),0)/ids.length):0;}
function jlptSectionMastery(stage,section){
  stage=Number(stage);section=String(section||"");
  if(section==="vocabulary")return averageMastery(jlptVocabularyWords(stage).map(word=>word.masteryId));
  if(stage===2){
    if(section==="kanji")return averageMastery(N5_KANJI_LIST.slice(0,120).map(kanji=>`kanji:${kanji}`));
    if(section==="grammar")return averageMastery(N5_GRAMMAR_POINTS.slice(0,90).map((_,index)=>`grammar:${index}`));
    if(section==="reading")return averageMastery(N5_READING_PASSAGES.map((_,index)=>`reading:${index}`));
    return 0;
  }
  const course=JLPT_COURSES[stage],items=course?.[section]||[];
  return averageMastery(items.map((_,index)=>jlptMasteryId(section,index,stage)));
}
function jlptVocabularyLevels(stage){
  const pool=jlptVocabularyWords(stage);
  const levels=[];
  for(let index=0;index<pool.length;index+=JLPT_VOCABULARY_LESSON_SIZE)levels.push(pool.slice(index,index+JLPT_VOCABULARY_LESSON_SIZE));
  return levels;
}
function jlptVocabularyLevelMastery(stage,index){return averageMastery((jlptVocabularyLevels(stage)[Number(index)]||[]).map(word=>word.masteryId));}
function jlptVocabularyLevelQuestions(stage,index){
  const keys=new Set((jlptVocabularyLevels(stage)[Number(index)]||[]).map(word=>word.key));
  const pool=Number(stage)===2?questions.filter(question=>Number(question.stage)===2&&!tutorQuestion(question)&&jlptQuestionSection(question)==="vocabulary"):jlptSectionQuestionPool(stage,"vocabulary");
  return pool.filter(question=>keys.has(String(question.vocabularyKey||"")));
}
function jlptVocabularyLevelUnlocked(stage,index){
  stage=Number(stage);index=Number(index);
  if(index<=0)return isStageUnlocked(stage);
  return isStageUnlocked(stage)&&jlptVocabularyLevelMastery(stage,index-1)>=JLPT_VOCABULARY_UNLOCK_MASTERY&&(index%2!==0||jlptReviewCheckpointPassed(stage,"vocabulary",index));
}
function highestUnlockedJlptVocabularyLevel(stage){
  const levels=jlptVocabularyLevels(stage);let highest=0;
  for(let index=1;index<levels.length;index++){if(jlptVocabularyLevelUnlocked(stage,index))highest=index;else break;}
  return highest;
}
function currentJlptVocabularyLevel(stage=selectedStageIndex()){
  ensureJlptSectionState();
  stage=Number(stage);
  const levels=jlptVocabularyLevels(stage),highest=highestUnlockedJlptVocabularyLevel(stage);
  state.jlptVocabularyLevel[stage]=Math.min(Math.max(0,levels.length-1),highest,Math.max(0,Number(state.jlptVocabularyLevel[stage])||0));
  return state.jlptVocabularyLevel[stage];
}
function filterJlptPoolForSelection(pool,stage){
  stage=Number(stage);
  const section=currentJlptSection(stage);
  let selected=(Array.isArray(pool)?pool:[]).filter(question=>jlptQuestionSection(question)===section);
  const fullSectionPool=jlptSectionQuestionPool(stage,section);
  if(section==="vocabulary"){
    const levelIndex=currentJlptVocabularyLevel(stage),level=jlptVocabularyLevelQuestions(stage,levelIndex);
    const ids=new Set(level.map(question=>String(question.id)));
    selected=selected.filter(question=>ids.has(String(question.id)));
    if(!selected.length)selected=level;
  }else if(!selected.length){
    selected=fullSectionPool;
  }
  return selected;
}
function validJlptQuestionForSelection(question){
  const stage=selectedStageIndex();
  if(question?.smartReview===true)return true;
  if(stage<2)return true;
  if(!question||Number(question.stage)!==stage)return false;
  const boss=state.v5?.boss;
  if(boss?.status==="active"&&Number(question.bossCourseStage)===Number(boss.stage))return true;
  const section=currentJlptSection(stage);
  if(jlptQuestionSection(question)!==section)return false;
  if(section!=="vocabulary")return true;
  const level=jlptVocabularyLevelQuestions(stage,currentJlptVocabularyLevel(stage));
  return level.some(candidate=>String(candidate.id)===String(question.id));
}
function repairActiveJlptQuestion(){
  if(!state.active||selectedStageIndex()<2||validJlptQuestionForSelection(state.active))return false;
  state.active=null;state.answered=false;state.shieldArmed=false;
  const area=document.getElementById("challengeArea");
  if(area)area.innerHTML='<div class="empty">Choose a JLPT course section and lesson, review its items, then tap the rock to begin.</div>';
  return true;
}
function clearJlptRouteQuestion(){
  state.active=null;state.answered=false;state.shieldArmed=false;state.recentQuestionIds=[];
}
function selectJlptSection(stage,section){
  stage=Number(stage);section=String(section||"");
  if(stage<2||stage!==selectedStageIndex()||!JLPT_SECTION_IDS.has(section)||!isStageUnlocked(stage))return false;
  ensureJlptSectionState();
  state.jlptSectionSelection[stage]=section;
  clearJlptRouteQuestion();
  const label=JLPT_SECTION_SPECS.find(item=>item.id===section)?.name||section;
  const area=document.getElementById("challengeArea");
  if(area)area.innerHTML=`<div class="empty"><strong>${label}</strong><br>Choose a ${label.toLowerCase()} lesson in the Course or Expedition Hub, review every item, then begin practice.</div>`;
  save();render();
  setMessage(`${stages[stage].label} ${label} selected.`,"correct");
  return true;
}
function selectJlptVocabularyLevel(stage,index){
  stage=Number(stage);index=Number(index);
  const levels=jlptVocabularyLevels(stage);
  if(stage<2||stage!==selectedStageIndex()||!levels[index]||!jlptVocabularyLevelUnlocked(stage,index))return false;
  ensureJlptSectionState();
  state.jlptSectionSelection[stage]="vocabulary";
  state.jlptVocabularyLevel[stage]=index;
  clearJlptRouteQuestion();
  const area=document.getElementById("challengeArea");
  if(area)area.innerHTML=`<div class="empty"><strong>Vocabulary Lesson ${index+1}</strong><br>${levels[index].length} words · ${jlptVocabularyLevelMastery(stage,index)}% mastery<br>Word preview complete. Tap the rock to continue this lesson.</div>`;
  save();render();
  setMessage(`${stages[stage].label} Vocabulary Lesson ${index+1} selected.`,"correct");
  return true;
}
function vocabularyCourseLabel(stage){return Number(stage)===2?"N5":String(JLPT_COURSES[Number(stage)]?.label||stages[Number(stage)]?.label||"JLPT");}
function setVocabularyWordMastery(word,delta){
  if(!word)return;
  state.n5AcademyMastery[word.masteryId]=Math.max(0,Math.min(100,academyItemMastery(word.masteryId)+Number(delta||0)));
  save();renderAcademySummary();
}
function recordVocabularyQuestionMastery(question,correct){
  const stage=Number(question?.stage),key=String(question?.vocabularyKey||"");
  const word=jlptVocabularyWords(stage).find(item=>item.key===key);
  if(word)setVocabularyWordMastery(word,correct?10:-3);
}
function vocabularyMasteryIdForQuestion(question){
  const stage=Number(question?.stage),key=String(question?.vocabularyKey||"");
  if(!key)return "";
  if(stage===2){const index=academyVocabularyBank().findIndex(word=>String(word.jp)===key);return index>=0?v3VocabId(index):"";}
  const index=(JLPT_COURSES[stage]?.vocab||[]).findIndex(word=>String(word[0])===key);
  return index>=0?jlptMasteryId("vocab",index,stage):"";
}
function importVocabularyQuestionProgress(target){
  if(!target||!target.questionStats)return false;
  target.n5AcademyMastery=target.n5AcademyMastery&&typeof target.n5AcademyMastery==="object"?target.n5AcademyMastery:{};
  const grouped=new Map();
  questions.filter(question=>question.vocabularyKey).forEach(question=>{const id=vocabularyMasteryIdForQuestion(question),stats=target.questionStats[question.id];if(!id||!stats)return;const values=grouped.get(id)||[];values.push(questionMasteryScore(stats));grouped.set(id,values);});
  let changed=false;
  grouped.forEach((values,id)=>{const imported=Math.round(values.reduce((sum,value)=>sum+value,0)/values.length),current=Math.max(0,Number(target.n5AcademyMastery[id])||0);if(imported>current){target.n5AcademyMastery[id]=imported;changed=true;}});
  return changed;
}
function renderVocabularyLessonPreview(stage,lesson,items){
  const label=vocabularyCourseLabel(stage),complete=academyView.lessonPreviewComplete===true;
  if(complete){
    return `<section class="lesson-preview-complete"><div class="lesson-review-check">✓</div><div class="course-kicker">${label} Vocabulary · Lesson ${lesson+1}</div><h3>Word review complete</h3><p>You reviewed all ${items.length} words in this lesson. Practice will now use this same word set.</p><div class="lesson-preview-actions"><button data-lessons-back type="button">← All lessons</button><button data-vocab-preview-list type="button">View word list</button><button data-vocab-review-again type="button">Review again</button><button data-vocab-start class="primary" type="button">Start Lesson ${lesson+1}</button></div></section>`;
  }
  const index=Math.max(0,Math.min(items.length-1,Number(academyView.preview)||0)),word=items[index],mastery=jlptVocabularyWordMastery(word),last=index===items.length-1;
  return `<section class="lesson-preview"><div class="lesson-preview-head"><button class="course-back" data-lessons-back type="button">← All lessons</button><div><div class="course-kicker">Before Lesson ${lesson+1}</div><h3>Review every word</h3><p>Word ${index+1} of ${items.length} · the lesson unlocks after the final preview card.</p></div><button class="lesson-preview-skip" data-vocab-preview-skip type="button">⏭ Skip Lesson Review</button></div>${progressBar((index+1)/items.length*100)}<article class="lesson-word-card"><span class="lesson-word-count">${index+1} / ${items.length}</span><div class="word-hero">${v3Esc(word.jp)}</div><div class="word-reading">${v3Esc(word.reading)}</div><div class="word-meaning">${v3Esc(word.en)}</div><div class="mastery-banner"><span>${v3Stars(mastery)}</span><strong>${mastery}% mastery</strong></div><button data-vocab-preview-speak type="button">🔊 Hear pronunciation</button></article><div class="lesson-preview-actions"><button data-vocab-preview-back type="button" ${index===0?'disabled':''}>← Previous word</button><button data-vocab-preview-next class="primary" type="button">${last?'Finish word review':'Next word →'}</button></div></section>`;
}
function renderVocabularyCourse(stage=academyStage){
  stage=Number(stage);
  const label=vocabularyCourseLabel(stage),target=jlptVocabularyTarget(stage),words=jlptVocabularyWords(stage),lessons=jlptVocabularyLevels(stage);
  const lesson=academyView.lesson===null?null:Number(academyView.lesson);
  if(lesson!==null&&lessons[lesson]){
    const items=lessons[lesson];
    if(academyView.preview!==null)return renderVocabularyLessonPreview(stage,lesson,items);
    if(academyView.word!==null){
      const word=words[Number(academyView.word)];
      if(!word){academyView.word=null;return renderVocabularyCourse(stage);}
      const mastery=jlptVocabularyWordMastery(word),examples=v3WordExamples(word);
      return `<section class="course-focus"><button class="course-back" data-word-back type="button">← Lesson ${lesson+1}</button><div class="course-kicker">${label} Vocabulary · Lesson ${lesson+1}</div><div class="word-hero">${v3Esc(word.jp)}</div><div class="word-reading">${v3Esc(word.reading)}</div><div class="word-meaning">${v3Esc(word.en)}</div><div class="mastery-banner"><span>${v3Stars(mastery)}</span><strong>${mastery}% mastery</strong></div><div class="detail-grid"><article><h4>Examples</h4>${examples.map(example=>`<p class="jp-example">${v3Esc(example)}</p>`).join('')}</article><article><h4>Study actions</h4><button data-word-speak="${word.index}" type="button">▶ Hear pronunciation</button><button data-word-quiz="${word.index}" class="primary" type="button">Practice this word</button><p class="small">Correct practice raises the same mastery shown in the Course and Expedition Hub.</p></article></div></section>`;
    }
    const mastery=jlptVocabularyLevelMastery(stage,lesson);
    return `<section><div class="course-subhead"><button class="course-back" data-lessons-back type="button">← All lessons</button><div><h3>${label} Vocabulary Lesson ${lesson+1}</h3><p>${items.length} words · ${mastery}% lesson mastery</p></div></div><div class="lesson-list-actions"><button data-vocab-review-again type="button">Review all words</button><button data-vocab-start class="primary" type="button" ${academyView.lessonPreviewComplete?'':'disabled'}>Start lesson</button></div><div class="word-list">${items.map(word=>{const itemMastery=jlptVocabularyWordMastery(word);return `<button class="word-row" data-word-index="${word.index}" type="button"><span class="word-main"><strong>${v3Esc(word.jp)}</strong><small>${v3Esc(word.reading)} · ${v3Esc(word.en)}</small></span><span class="word-mastery"><b>${v3Stars(itemMastery)}</b><small>${itemMastery}%</small></span></button>`;}).join('')}</div></section>`;
  }
  if(lesson!==null){academyView.lesson=null;academyView.preview=null;academyView.lessonPreviewComplete=false;}
  return `<div class="academy-toolbar"><strong>${label} Vocabulary Lessons</strong><span>${words.length} verified words loaded · progression target: ${target.toLocaleString()}</span></div><p class="course-instruction">Course and Expedition Hub use these same lessons. Reach 75% mastery in each lesson. After every two lessons, pass a 25-question randomized review quiz at 75% within two minutes to open the next lesson.</p><div class="lesson-grid">${lessons.map((items,index)=>{const open=jlptVocabularyLevelUnlocked(stage,index),mastery=jlptVocabularyLevelMastery(stage,index),known=items.filter(word=>jlptVocabularyWordMastery(word)>=75).length,current=stage===selectedStageIndex()&&index===currentJlptVocabularyLevel(stage),card=`<button class="lesson-button lesson-loaded ${open?'lesson-open':'lesson-locked'} ${mastery>=JLPT_VOCABULARY_UNLOCK_MASTERY?'lesson-complete':''} ${current?'lesson-current':''}" data-vocab-lesson="${index}" type="button" ${open?'':'disabled'}><strong>${open?`Lesson ${index+1}`:`🔒 Lesson ${index+1}`}</strong><span>${known}/${items.length} mastered · ${items.length} words</span>${progressBar(mastery)}</button>`;return `${card}${(index+1)%2===0?renderJlptReviewCheckpointCard(stage,"vocabulary",index+1):""}`;}).join('')||'<div class="academy-callout">No vocabulary words are loaded for the current course selection yet.</div>'}</div>`;
}
function openVocabularyLessonReview(stage,index){
  stage=Number(stage);index=Number(index);
  if(!isStageUnlocked(stage)||!jlptVocabularyLevelUnlocked(stage,index)){setMessage("That vocabulary lesson is still locked.","wrong");return false;}
  openAcademy(stage);academyTab="vocabulary";academyView.lesson=index;academyView.word=null;academyView.quiz=null;academyView.preview=0;academyView.lessonPreviewComplete=false;renderAcademy();return true;
}
function startReviewedVocabularyLesson(stage,index){
  if(!academyView.lessonPreviewComplete){setMessage("Review every word before starting the lesson.","wrong");return false;}
  selectStage(Number(stage),false);
  if(!selectJlptVocabularyLevel(Number(stage),Number(index)))return false;
  closeAcademy();mine();document.getElementById("challengeArea")?.scrollIntoView({behavior:"smooth",block:"center"});return true;
}
function handleVocabularyCourseAction(target,stage=academyStage){
  if(!target)return false;stage=Number(stage);
  if(target.matches("[data-review-checkpoint-stage]")){openJlptReviewCheckpoint(Number(target.dataset.reviewCheckpointStage),String(target.dataset.reviewCheckpointSection),Number(target.dataset.reviewCheckpointLesson));return true;}
  if(target.matches("[data-vocab-lesson]")){openVocabularyLessonReview(stage,Number(target.dataset.vocabLesson));return true;}
  if(target.matches("[data-lessons-back]")){academyView.lesson=null;academyView.word=null;academyView.preview=null;academyView.lessonPreviewComplete=false;renderAcademy();return true;}
  if(target.matches("[data-vocab-preview-back]")){academyView.preview=Math.max(0,Number(academyView.preview)-1);renderAcademy();return true;}
  if(target.matches("[data-vocab-preview-next]")){const items=jlptVocabularyLevels(stage)[Number(academyView.lesson)]||[];if(Number(academyView.preview)>=items.length-1)academyView.lessonPreviewComplete=true;else academyView.preview=Number(academyView.preview)+1;renderAcademy();return true;}
  if(target.matches("[data-vocab-preview-skip]")){academyView.lessonPreviewComplete=true;startReviewedVocabularyLesson(stage,Number(academyView.lesson));return true;}
  if(target.matches("[data-vocab-preview-speak]")){const word=(jlptVocabularyLevels(stage)[Number(academyView.lesson)]||[])[Number(academyView.preview)||0];if(word)speakJapanese(word.reading||word.jp);return true;}
  if(target.matches("[data-vocab-review-again]")){academyView.word=null;academyView.preview=0;academyView.lessonPreviewComplete=false;renderAcademy();return true;}
  if(target.matches("[data-vocab-preview-list]")){academyView.word=null;academyView.preview=null;renderAcademy();return true;}
  if(target.matches("[data-vocab-start]")){startReviewedVocabularyLesson(stage,Number(academyView.lesson));return true;}
  if(target.matches("[data-word-index]")){academyView.word=Number(target.dataset.wordIndex);academyView.preview=null;renderAcademy();return true;}
  if(target.matches("[data-word-back]")){academyView.word=null;academyView.preview=null;renderAcademy();return true;}
  if(target.matches("[data-word-speak]")){const word=jlptVocabularyWords(stage)[Number(target.dataset.wordSpeak)];if(word)speakJapanese(word.reading||word.jp);return true;}
  if(target.matches("[data-word-quiz]")){const index=Number(target.dataset.wordQuiz),words=jlptVocabularyWords(stage),word=words[index];if(!word)return true;const wrong=shuffle(words.filter((_,wordIndex)=>wordIndex!==index).map(item=>item.en)).slice(0,3);v3QuizCard(`What does ${word.jp} mean?`,[word.en,...wrong],word.en,good=>setVocabularyWordMastery(word,good?25:-5));return true;}
  return false;
}

// v6.4.14 - Give Kanji, Grammar, and Reading the same lesson flow as Vocabulary.
const JLPT_SECTION_LESSON_CONFIG={
  vocabulary:{size:25,singular:"word",plural:"words"},
  kanji:{size:20,singular:"kanji",plural:"kanji"},
  grammar:{size:10,singular:"grammar point",plural:"grammar points"},
  reading:{size:4,singular:"reading",plural:"readings"}
};
function jlptSectionSpec(section){return JLPT_SECTION_SPECS.find(item=>item.id===section)||JLPT_SECTION_SPECS[0];}
function jlptSectionLessonConfig(section){return JLPT_SECTION_LESSON_CONFIG[section]||JLPT_SECTION_LESSON_CONFIG.vocabulary;}
function jlptSectionItems(stage,section){
  stage=Number(stage);section=String(section||"vocabulary");
  if(section==="vocabulary")return jlptVocabularyWords(stage).map(word=>({...word,section,primary:word.jp,secondary:word.reading,meaning:word.en,listenText:word.reading||word.jp}));
  if(stage===2&&section==="kanji")return N5_KANJI_LIST.slice(0,120).map((kanji,sourceIndex)=>{const info=N5_KANJI_INFO[kanji]||["—","repetition mark"];return {stage,section,sourceIndex,index:sourceIndex,key:`${stage}:${section}:${sourceIndex}`,masteryId:`kanji:${kanji}`,primary:kanji,secondary:info[0],meaning:info[1],detail:info[1],listenText:readingSpeechText(info[0])};});
  if(stage===2&&section==="grammar")return N5_GRAMMAR_POINTS.slice(0,90).map((grammar,sourceIndex)=>({stage,section,sourceIndex,index:sourceIndex,key:`${stage}:${section}:${sourceIndex}`,masteryId:`grammar:${sourceIndex}`,primary:grammar[0],secondary:grammar[1],meaning:grammar[1],detail:grammar[2],listenText:grammar[2]}));
  if(stage===2&&section==="reading")return N5_READING_PASSAGES.map((reading,sourceIndex)=>({stage,section,sourceIndex,index:sourceIndex,key:`${stage}:${section}:${sourceIndex}`,masteryId:`reading:${sourceIndex}`,primary:reading[0],secondary:reading[2],meaning:reading[3],detail:reading[1],question:reading[2],answer:reading[3],listenText:reading[1]}));
  const course=JLPT_COURSES[stage],rows=course?.[section]||[];
  return rows.map((row,sourceIndex)=>{
    const item={stage,section,sourceIndex,index:sourceIndex,key:`${stage}:${section}:${sourceIndex}`,masteryId:jlptMasteryId(section,sourceIndex,stage),primary:row[0]};
    if(section==="kanji")Object.assign(item,{secondary:row[1],meaning:row[2],detail:row[2],listenText:readingSpeechText(row[1])});
    if(section==="grammar")Object.assign(item,{secondary:row[1],meaning:row[1],detail:row[2],listenText:row[2]});
    if(section==="reading")Object.assign(item,{secondary:row[2],meaning:row[3],detail:row[1],question:row[2],answer:row[3],listenText:row[1]});
    return item;
  });
}
function jlptSectionLevels(stage,section){
  if(section==="vocabulary")return jlptVocabularyLevels(stage);
  const items=jlptSectionItems(stage,section),size=jlptSectionLessonConfig(section).size,levels=[];
  for(let index=0;index<items.length;index+=size)levels.push(items.slice(index,index+size));
  return levels;
}
function jlptSectionLevelMastery(stage,section,index){
  if(section==="vocabulary")return jlptVocabularyLevelMastery(stage,index);
  return averageMastery((jlptSectionLevels(stage,section)[Number(index)]||[]).map(item=>item.masteryId));
}
function jlptReviewCheckpointKey(stage,section,evenLesson){return `${Number(stage)}:${String(section)}:${Number(evenLesson)}`;}
function jlptReviewCheckpointResult(stage,section,evenLesson){ensureJlptSectionState();return state.jlptReviewCheckpoints[jlptReviewCheckpointKey(stage,section,evenLesson)]||{best:0,passed:false};}
function jlptReviewCheckpointPassed(stage,section,evenLesson){return jlptReviewCheckpointResult(stage,section,evenLesson).passed===true;}
function jlptReviewCheckpointAvailable(stage,section,evenLesson){
  stage=Number(stage);section=String(section);evenLesson=Number(evenLesson);
  const levels=jlptSectionLevels(stage,section),first=evenLesson-2,second=evenLesson-1;
  return isStageUnlocked(stage)&&evenLesson>=2&&evenLesson%2===0&&!!levels[first]&&!!levels[second]&&jlptSectionLevelMastery(stage,section,first)>=JLPT_VOCABULARY_UNLOCK_MASTERY&&jlptSectionLevelMastery(stage,section,second)>=JLPT_VOCABULARY_UNLOCK_MASTERY;
}
function jlptReviewCheckpointChoices(answer,values){
  const wrong=[...new Set(values.map(value=>String(value||"")).filter(value=>value&&value!==String(answer)))];
  return shuffle([String(answer),...shuffle(wrong).slice(0,3)]);
}
function jlptReviewCheckpointQuestionBank(stage,section,evenLesson){
  stage=Number(stage);section=String(section);evenLesson=Number(evenLesson);
  const rawPair=jlptSectionLevels(stage,section).slice(evenLesson-2,evenLesson).flat(),ids=new Set(rawPair.map(item=>String(item.masteryId))),all=jlptSectionItems(stage,section),items=all.filter(item=>ids.has(String(item.masteryId))),bank=[];
  const add=(id,display,prompt,answer,values)=>{const options=jlptReviewCheckpointChoices(answer,values);if(String(answer||"")&&options.length>=2)bank.push({id,display:String(display||""),prompt:String(prompt||""),answer:String(answer),options});};
  if(section==="vocabulary")items.forEach(item=>{
    add(`${item.masteryId}:meaning`,item.primary,"Choose the correct meaning.",item.meaning,items.map(entry=>entry.meaning));
    if(item.secondary&&item.secondary!==item.primary)add(`${item.masteryId}:reading`,item.primary,"Choose the correct reading.",item.secondary,items.map(entry=>entry.secondary));
  });
  if(section==="kanji")items.forEach(item=>{
    add(`${item.masteryId}:meaning`,item.primary,"Choose this kanji's meaning.",item.meaning,items.map(entry=>entry.meaning));
    if(item.secondary&&item.secondary!=="—")add(`${item.masteryId}:reading`,item.primary,"Choose the correct reading.",item.secondary,items.map(entry=>entry.secondary));
  });
  if(section==="grammar")items.forEach(item=>add(`${item.masteryId}:grammar`,item.detail,"Which grammar point is used?",item.primary,items.map(entry=>entry.primary)));
  if(section==="reading")items.forEach(item=>add(`${item.masteryId}:reading`,item.detail,item.question,item.answer,items.map(entry=>entry.answer)));
  return bank;
}
function buildJlptReviewCheckpointQuestions(stage,section,evenLesson){
  const bank=jlptReviewCheckpointQuestionBank(stage,section,evenLesson),result=[];
  while(bank.length&&result.length<JLPT_REVIEW_QUIZ_QUESTION_COUNT){
    shuffle([...bank]).forEach(question=>{if(result.length<JLPT_REVIEW_QUIZ_QUESTION_COUNT)result.push({...question,options:shuffle([...question.options])});});
  }
  return result;
}
function renderJlptReviewCheckpointCard(stage,section,evenLesson,world=false){
  const result=jlptReviewCheckpointResult(stage,section,evenLesson),passed=result.passed===true,available=jlptReviewCheckpointAvailable(stage,section,evenLesson),open=passed||available,best=Math.max(0,Number(result.best)||0),fastest=normalizeAssessmentTimeMs(result.fastestTimeMs),record=fastest?` · Record ${assessmentTimeLabel(fastest)}`:'',pair=`Lessons ${evenLesson-1}–${evenLesson}`;
  if(world)return `<button data-world-review-checkpoint-stage="${stage}" data-world-review-checkpoint-section="${section}" data-world-review-checkpoint-lesson="${evenLesson}" class="jlpt-vocabulary-level jlpt-review-checkpoint ${open?'open':'locked'} ${passed?'complete':''}" ${open?'':'disabled'}><span>${passed?'✓':open?'🧠':'🔒'}</span><strong>${pair} Quiz</strong><small>${passed?`${best}% best · Passed${record}`:available?'25 questions · 2:30 · Need 75%':`Reach 75% in both lessons`}</small><i><b style="width:${passed?100:best}%"></b></i></button>`;
  return `<button class="lesson-button jlpt-review-checkpoint ${open?'lesson-open':'lesson-locked'} ${passed?'lesson-complete':''}" data-review-checkpoint-stage="${stage}" data-review-checkpoint-section="${section}" data-review-checkpoint-lesson="${evenLesson}" type="button" ${open?'':'disabled'}><strong>${passed?'✓':open?'🧠':'🔒'} ${pair} Review Quiz</strong><span>${passed?`${best}% best · Passed${record}`:available?'25 randomized questions · 2:30 · Pass at 75%':`Reach 75% in Lessons ${evenLesson-1} and ${evenLesson}`}</span>${progressBar(passed?100:best)}</button>`;
}
function jlptCourseQuestionMatchesItem(question,item){
  if(!question||!item||Number(question.stage)!==Number(item.stage))return false;
  if(Number(item.stage)>2)return String(question.courseId||"")===`jlpt${item.stage}:${item.section}:${item.sourceIndex}`;
  if(item.section==="kanji")return question.kind==="academy-kanji"&&String(question.q)===String(item.primary);
  if(item.section==="grammar")return question.kind==="academy-grammar"&&String(question.a)===String(item.primary);
  if(item.section==="reading")return question.kind==="academy-reading"&&String(question.q)===String(item.detail);
  return false;
}
function jlptSectionLevelQuestions(stage,section,index){
  if(section==="vocabulary")return jlptVocabularyLevelQuestions(stage,index);
  const items=jlptSectionLevels(stage,section)[Number(index)]||[],pool=jlptSectionQuestionPool(stage,section);
  return pool.filter(question=>items.some(item=>jlptCourseQuestionMatchesItem(question,item)));
}
function jlptSectionLevelUnlocked(stage,section,index){
  if(section==="vocabulary")return jlptVocabularyLevelUnlocked(stage,index);
  stage=Number(stage);index=Number(index);
  if(index<=0)return isStageUnlocked(stage);
  return isStageUnlocked(stage)&&jlptSectionLevelMastery(stage,section,index-1)>=JLPT_VOCABULARY_UNLOCK_MASTERY&&(index%2!==0||jlptReviewCheckpointPassed(stage,section,index));
}
function highestUnlockedJlptSectionLevel(stage,section){
  if(section==="vocabulary")return highestUnlockedJlptVocabularyLevel(stage);
  const levels=jlptSectionLevels(stage,section);let highest=0;
  for(let index=1;index<levels.length;index++){if(jlptSectionLevelUnlocked(stage,section,index))highest=index;else break;}
  return highest;
}
function currentJlptSectionLevel(stage=selectedStageIndex(),section=currentJlptSection(stage)){
  ensureJlptSectionState();stage=Number(stage);section=String(section||"vocabulary");
  if(section==="vocabulary"){
    const current=currentJlptVocabularyLevel(stage);
    state.jlptSectionLevel[stage].vocabulary=current;
    return current;
  }
  const levels=jlptSectionLevels(stage,section),highest=highestUnlockedJlptSectionLevel(stage,section),saved=Math.max(0,Number(state.jlptSectionLevel[stage][section])||0);
  state.jlptSectionLevel[stage][section]=Math.min(Math.max(0,levels.length-1),highest,saved);
  return state.jlptSectionLevel[stage][section];
}
const selectJlptVocabularyLevelV6413=selectJlptVocabularyLevel;
selectJlptVocabularyLevel=function(stage,index){
  const selected=selectJlptVocabularyLevelV6413(stage,index);
  if(selected){ensureJlptSectionState();state.jlptSectionLevel[Number(stage)].vocabulary=Number(index);save();}
  return selected;
};
function selectJlptSectionLevel(stage,section,index){
  stage=Number(stage);section=String(section||"vocabulary");index=Number(index);
  if(section==="vocabulary")return selectJlptVocabularyLevel(stage,index);
  const levels=jlptSectionLevels(stage,section);
  if(stage<2||stage!==selectedStageIndex()||!levels[index]||!jlptSectionLevelUnlocked(stage,section,index))return false;
  ensureJlptSectionState();state.jlptSectionSelection[stage]=section;state.jlptSectionLevel[stage][section]=index;clearJlptRouteQuestion();
  const spec=jlptSectionSpec(section),config=jlptSectionLessonConfig(section),mastery=jlptSectionLevelMastery(stage,section,index),area=document.getElementById("challengeArea");
  if(area)area.innerHTML=`<div class="empty"><strong>${spec.name} Lesson ${index+1}</strong><br>${levels[index].length} ${config.plural} · ${mastery}% mastery<br>Item review complete. Tap the rock to continue this lesson.</div>`;
  save();render();setMessage(`${stages[stage].label} ${spec.name} Lesson ${index+1} selected.`,"correct");return true;
}
const filterJlptPoolForSelectionV6413=filterJlptPoolForSelection;
filterJlptPoolForSelection=function(pool,stage){
  stage=Number(stage);if(stage<2)return filterJlptPoolForSelectionV6413(pool,stage);
  const section=currentJlptSection(stage),levelIndex=currentJlptSectionLevel(stage,section),level=jlptSectionLevelQuestions(stage,section,levelIndex),ids=new Set(level.map(question=>String(question.id)));
  let selected=(Array.isArray(pool)?pool:[]).filter(question=>jlptQuestionSection(question)===section&&ids.has(String(question.id)));
  if(!selected.length)selected=level;
  return selected;
};
validJlptQuestionForSelection=function(question){
  const stage=selectedStageIndex();if(question?.smartReview===true)return true;if(stage<2)return true;
  if(!question||Number(question.stage)!==stage)return false;
  const boss=state.v5?.boss;if(boss?.status==="active"&&Number(question.bossCourseStage)===Number(boss.stage))return true;
  const section=currentJlptSection(stage);if(jlptQuestionSection(question)!==section)return false;
  return jlptSectionLevelQuestions(stage,section,currentJlptSectionLevel(stage,section)).some(candidate=>String(candidate.id)===String(question.id));
};
function resetJlptLessonView(){academyView.lesson=null;academyView.word=null;academyView.sectionItem=null;academyView.preview=null;academyView.lessonPreviewComplete=false;academyView.lessonSection=null;academyView.checkpointQuiz=null;clearJlptReviewQuizClock();syncJlptReviewQuizTabs(false);}
function jlptSectionTarget(stage,section){
  stage=Number(stage);if(stage===2)return jlptSectionItems(stage,section).length;
  const course=JLPT_COURSES[stage];if(section==="kanji")return Number(course?.kanjiTarget||0);if(section==="grammar")return Number(course?.grammarTarget||0);return jlptSectionItems(stage,section).length;
}
function jlptSectionItemPrompt(item){
  if(item.section==="kanji")return `What does ${item.primary} mean?`;
  if(item.section==="grammar")return `Which grammar point is used in: ${item.detail}`;
  return item.question||item.secondary;
}
function jlptSectionItemAnswer(item){return item.section==="grammar"?item.primary:item.section==="reading"?item.answer:item.meaning;}
function jlptSectionItemCard(item,preview=false){
  const mastery=academyItemMastery(item.masteryId),section=item.section;
  if(section==="kanji")return `<div class="word-hero section-item-hero">${v3Esc(item.primary)}</div><div class="word-reading">${v3Esc(item.secondary)}</div><div class="word-meaning">${v3Esc(item.meaning)}</div>${preview?"":`<p class="small">Review the readings, then connect them to the meaning.</p>`}<div class="mastery-banner"><span>${v3Stars(mastery)}</span><strong>${mastery}% mastery</strong></div>`;
  if(section==="grammar")return `<div class="word-hero section-item-hero">${v3Esc(item.primary)}</div><div class="word-meaning">${v3Esc(item.meaning)}</div><article class="grammar-example"><h4>Example</h4><p class="jp-example">${v3Esc(item.detail)}</p></article><div class="mastery-banner"><span>${v3Stars(mastery)}</span><strong>${mastery}% mastery</strong></div>`;
  return `<div class="word-hero section-item-hero">${v3Esc(item.primary)}</div><p class="jp-passage reading-card-text">${v3Esc(item.detail)}</p><article class="grammar-example"><h4>Comprehension</h4><p>${v3Esc(item.question)}</p><strong>${v3Esc(item.answer)}</strong></article><div class="mastery-banner"><span>${v3Stars(mastery)}</span><strong>${mastery}% mastery</strong></div>`;
}
function renderJlptSectionLessonPreview(stage,section,lesson,items){
  const spec=jlptSectionSpec(section),config=jlptSectionLessonConfig(section),complete=academyView.lessonPreviewComplete===true;
  if(complete)return `<section class="lesson-preview-complete"><div class="lesson-review-check">✓</div><div class="course-kicker">${vocabularyCourseLabel(stage)} ${spec.name} · Lesson ${lesson+1}</div><h3>Item review complete</h3><p>You reviewed all ${items.length} ${config.plural} in this lesson. Practice will now use this same set.</p><div class="lesson-preview-actions"><button data-lessons-back type="button">← All lessons</button><button data-section-preview-list type="button">View item list</button><button data-section-review-again type="button">Review again</button><button data-section-start class="primary" type="button">Start Lesson ${lesson+1}</button></div></section>`;
  const index=Math.max(0,Math.min(items.length-1,Number(academyView.preview)||0)),item=items[index],last=index===items.length-1;
  return `<section class="lesson-preview"><div class="lesson-preview-head"><button class="course-back" data-lessons-back type="button">← All lessons</button><div><div class="course-kicker">Before Lesson ${lesson+1}</div><h3>Review every ${config.singular}</h3><p>${spec.name} item ${index+1} of ${items.length} · practice opens after the final preview card.</p></div><button class="lesson-preview-skip" data-section-preview-skip type="button">⏭ Skip Lesson Review</button></div>${progressBar((index+1)/items.length*100)}<article class="lesson-word-card section-lesson-card section-${section}"><span class="lesson-word-count">${index+1} / ${items.length}</span>${jlptSectionItemCard(item,true)}<button data-section-preview-speak type="button">🔊 Hear Japanese</button></article><div class="lesson-preview-actions"><button data-section-preview-back type="button" ${index===0?'disabled':''}>← Previous item</button><button data-section-preview-next class="primary" type="button">${last?'Finish item review':'Next item →'}</button></div></section>`;
}
function renderJlptSectionCourse(stage=academyStage,section=academyTab){
  stage=Number(stage);section=String(section);const spec=jlptSectionSpec(section),config=jlptSectionLessonConfig(section),items=jlptSectionItems(stage,section),lessons=jlptSectionLevels(stage,section),label=vocabularyCourseLabel(stage),target=jlptSectionTarget(stage,section);
  const lesson=academyView.lesson===null?null:Number(academyView.lesson);
  if(lesson!==null&&lessons[lesson]){
    const lessonItems=lessons[lesson];
    if(academyView.preview!==null)return renderJlptSectionLessonPreview(stage,section,lesson,lessonItems);
    if(academyView.sectionItem!==null&&academyView.sectionItem!==undefined){
      const item=items.find(entry=>entry.sourceIndex===Number(academyView.sectionItem));if(!item){academyView.sectionItem=null;return renderJlptSectionCourse(stage,section);}
      return `<section class="course-focus"><button class="course-back" data-section-item-back type="button">← Lesson ${lesson+1}</button><div class="course-kicker">${label} ${spec.name} · Lesson ${lesson+1}</div>${jlptSectionItemCard(item)}<div class="detail-grid"><article><h4>Listen and review</h4><button data-section-item-speak type="button">🔊 Hear Japanese</button></article><article><h4>Study action</h4><button data-section-item-practice class="primary" type="button">Practice this ${config.singular}</button></article></div></section>`;
    }
    const mastery=jlptSectionLevelMastery(stage,section,lesson);
    return `<section><div class="course-subhead"><button class="course-back" data-lessons-back type="button">← All lessons</button><div><h3>${label} ${spec.name} Lesson ${lesson+1}</h3><p>${lessonItems.length} ${config.plural} · ${mastery}% lesson mastery</p></div></div><div class="lesson-list-actions"><button data-section-review-again type="button">Review all items</button><button data-section-start class="primary" type="button" ${academyView.lessonPreviewComplete?'':'disabled'}>Start lesson</button></div><div class="word-list">${lessonItems.map(item=>{const mastery=academyItemMastery(item.masteryId);return `<button class="word-row" data-section-item="${item.sourceIndex}" type="button"><span class="word-main"><strong>${v3Esc(item.primary)}</strong><small>${v3Esc(item.secondary||item.meaning||"")}</small></span><span class="word-mastery"><b>${v3Stars(mastery)}</b><small>${mastery}%</small></span></button>`;}).join('')}</div></section>`;
  }
  if(lesson!==null)resetJlptLessonView();
  return `<div class="academy-toolbar"><strong>${label} ${spec.name} Lessons</strong><span>${items.length} interactive ${config.plural} loaded · progression target: ${target.toLocaleString()}</span></div><p class="course-instruction">Course and Expedition Hub use these same lessons. Reach 75% mastery in each lesson. After every two lessons, pass a 25-question randomized review quiz at 75% within two minutes to open the next lesson.</p><div class="lesson-grid">${lessons.map((lessonItems,index)=>{const open=jlptSectionLevelUnlocked(stage,section,index),mastery=jlptSectionLevelMastery(stage,section,index),known=lessonItems.filter(item=>academyItemMastery(item.masteryId)>=75).length,current=stage===selectedStageIndex()&&section===currentJlptSection(stage)&&index===currentJlptSectionLevel(stage,section),card=`<button class="lesson-button lesson-loaded ${open?'lesson-open':'lesson-locked'} ${mastery>=JLPT_VOCABULARY_UNLOCK_MASTERY?'lesson-complete':''} ${current?'lesson-current':''}" data-section-lesson="${index}" type="button" ${open?'':'disabled'}><strong>${open?`Lesson ${index+1}`:`🔒 Lesson ${index+1}`}</strong><span>${known}/${lessonItems.length} mastered · ${lessonItems.length} ${config.plural}</span>${progressBar(mastery)}</button>`;return `${card}${(index+1)%2===0?renderJlptReviewCheckpointCard(stage,section,index+1):""}`;}).join('')||`<div class="academy-callout">No ${config.plural} are loaded for this course yet.</div>`}</div>`;
}
function openJlptSectionLessonReview(stage,section,index){
  stage=Number(stage);section=String(section||"vocabulary");index=Number(index);
  if(section==="vocabulary"){const opened=openVocabularyLessonReview(stage,index);if(opened)academyView.lessonSection="vocabulary";return opened;}
  if(!isStageUnlocked(stage)||!jlptSectionLevelUnlocked(stage,section,index)){setMessage(`That ${jlptSectionSpec(section).name.toLowerCase()} lesson is still locked.`,"wrong");return false;}
  openAcademy(stage);academyTab=section;academyView.lesson=index;academyView.lessonSection=section;academyView.sectionItem=null;academyView.word=null;academyView.quiz=null;academyView.preview=0;academyView.lessonPreviewComplete=false;renderAcademy();return true;
}
function startReviewedJlptSectionLesson(stage,section,index){
  if(!academyView.lessonPreviewComplete){setMessage("Review every item before starting the lesson.","wrong");return false;}
  selectStage(Number(stage),false);if(!selectJlptSectionLevel(Number(stage),section,Number(index)))return false;
  closeAcademy();mine();document.getElementById("challengeArea")?.scrollIntoView({behavior:"smooth",block:"center"});return true;
}
function practiceJlptSectionItem(stage,section,item){
  const items=jlptSectionItems(stage,section),answer=jlptSectionItemAnswer(item),wrong=[...new Set(items.filter(entry=>entry.sourceIndex!==item.sourceIndex).map(jlptSectionItemAnswer).filter(value=>value!==answer))];
  v3QuizCard(jlptSectionItemPrompt(item),[answer,...shuffle(wrong).slice(0,3)],answer,good=>v3SetMastery(item.masteryId,good?25:-5));
}
function handleJlptSectionCourseAction(target,stage=academyStage,section=academyTab){
  if(!target||section==="vocabulary")return false;stage=Number(stage);
  if(target.matches("[data-review-checkpoint-stage]")){openJlptReviewCheckpoint(Number(target.dataset.reviewCheckpointStage),String(target.dataset.reviewCheckpointSection),Number(target.dataset.reviewCheckpointLesson));return true;}
  const levels=jlptSectionLevels(stage,section),lesson=Number(academyView.lesson),items=levels[lesson]||[];
  if(target.matches("[data-section-lesson]")){openJlptSectionLessonReview(stage,section,Number(target.dataset.sectionLesson));return true;}
  if(target.matches("[data-lessons-back]")){resetJlptLessonView();renderAcademy();return true;}
  if(target.matches("[data-section-preview-back]")){academyView.preview=Math.max(0,Number(academyView.preview)-1);renderAcademy();return true;}
  if(target.matches("[data-section-preview-next]")){if(Number(academyView.preview)>=items.length-1)academyView.lessonPreviewComplete=true;else academyView.preview=Number(academyView.preview)+1;renderAcademy();return true;}
  if(target.matches("[data-section-preview-skip]")){academyView.lessonPreviewComplete=true;startReviewedJlptSectionLesson(stage,section,lesson);return true;}
  if(target.matches("[data-section-preview-speak]")){const item=items[Number(academyView.preview)||0];if(item)speakJapanese(item.listenText||item.primary);return true;}
  if(target.matches("[data-section-review-again]")){academyView.sectionItem=null;academyView.preview=0;academyView.lessonPreviewComplete=false;renderAcademy();return true;}
  if(target.matches("[data-section-preview-list]")){academyView.sectionItem=null;academyView.preview=null;renderAcademy();return true;}
  if(target.matches("[data-section-start]")){startReviewedJlptSectionLesson(stage,section,lesson);return true;}
  if(target.matches("[data-section-item]")){academyView.sectionItem=Number(target.dataset.sectionItem);academyView.preview=null;renderAcademy();return true;}
  if(target.matches("[data-section-item-back]")){academyView.sectionItem=null;renderAcademy();return true;}
  if(target.matches("[data-section-item-speak]")){const item=jlptSectionItems(stage,section).find(entry=>entry.sourceIndex===Number(academyView.sectionItem));if(item)speakJapanese(item.listenText||item.primary);return true;}
  if(target.matches("[data-section-item-practice]")){const item=jlptSectionItems(stage,section).find(entry=>entry.sourceIndex===Number(academyView.sectionItem));if(item)practiceJlptSectionItem(stage,section,item);return true;}
  return false;
}
const renderAcademyV6413AllSections=renderAcademy;
renderAcademy=function(){
  if(JLPT_SECTION_IDS.has(academyTab)&&academyTab!=="vocabulary"&&!academyView.quiz){
    if(academyView.lessonSection&&academyView.lessonSection!==academyTab)resetJlptLessonView();
    if(academyView.lesson!==null&&!academyView.lessonSection)academyView.lessonSection=academyTab;
    updateAcademyChrome();const box=document.getElementById("academyContent");if(!box)return;
    document.querySelectorAll("[data-academy-tab]").forEach(button=>button.classList.toggle("primary",button.dataset.academyTab===academyTab));
    box.innerHTML=renderJlptSectionCourse(academyStage,academyTab);
    box.onclick=event=>{const target=event.target.closest("button");if(target)handleJlptSectionCourseAction(target,academyStage,academyTab);};
    return;
  }
  if(academyTab==="vocabulary"&&academyView.lessonSection&&academyView.lessonSection!=="vocabulary")resetJlptLessonView();
  return renderAcademyV6413AllSections();
};
const normalizeStateV649Sections=normalizeState;
normalizeState=function(raw){const next=ensureJlptSectionState(normalizeStateV649Sections(raw));importVocabularyQuestionProgress(next);return next;};
const renderV649Sections=render;
render=function(){ensureJlptSectionState();const repaired=repairActiveJlptQuestion();renderV649Sections();if(repaired)save();};
const loadProfileV649Sections=loadProfile;
loadProfile=function(profile,...args){const result=loadProfileV649Sections(profile,...args);ensureJlptSectionState();repairActiveJlptQuestion();render();return result;};
ensureJlptSectionState();
repairActiveJlptQuestion();
const importedVocabularyProgress=importVocabularyQuestionProgress(state);
if(activeProfileId){if(importedVocabularyProgress)save();render();}


// v6.4.6 - Alphabet-only kana family levels and mine-routing repair.
const KANA_FAMILY_UNLOCK_MASTERY=20;
const KANA_FAMILY_SPECS=[
 {id:'vowels',name:'Vowels',start:0,end:5},
 {id:'k',name:'K Family',start:5,end:10},
 {id:'s',name:'S Family',start:10,end:15},
 {id:'t',name:'T Family',start:15,end:20},
 {id:'n',name:'N Family',start:20,end:25},
 {id:'h',name:'H Family',start:25,end:30},
 {id:'m',name:'M Family',start:30,end:35},
 {id:'y',name:'Y Family',start:35,end:38},
 {id:'r',name:'R Family',start:38,end:43},
 {id:'w',name:'W and N',start:43,end:46},
 {id:'g',name:'Voiced G Family',start:46,end:51},
 {id:'z',name:'Voiced Z Family',start:51,end:56},
 {id:'d',name:'Voiced D Family',start:56,end:61},
 {id:'b',name:'Voiced B Family',start:61,end:66},
 {id:'p',name:'P Family',start:66,end:71}
];
function kanaKindForStage(stage){return Number(stage)===1?'katakana':'hiragana';}
function kanaSetForStage(stage){return Number(stage)===1?kata:hira;}
function kanaFamiliesForStage(stage){const set=kanaSetForStage(stage);return KANA_FAMILY_SPECS.map(spec=>({...spec,entries:set.slice(spec.start,spec.end),chars:set.slice(spec.start,spec.end).map(row=>row[0])}));}
function ensureKanaFamilyState(target=state){if(!target.kanaFamilyLevel||typeof target.kanaFamilyLevel!=='object')target.kanaFamilyLevel={hiragana:0,katakana:0};for(const kind of ['hiragana','katakana'])target.kanaFamilyLevel[kind]=Math.max(0,Math.min(KANA_FAMILY_SPECS.length-1,Number(target.kanaFamilyLevel[kind])||0));return target;}
function kanaFamilyMastery(family){if(!family.entries.length)return 0;return Math.round(family.entries.reduce((sum,[ch])=>sum+masteryScore(ch),0)/family.entries.length);}
function kanaFamilyUnlocked(stage,index){if(index===0)return true;if(state.clearedStages?.includes(Number(stage))||Number(state.placementUnlockedThrough||0)>Number(stage))return true;const families=kanaFamiliesForStage(stage);return kanaFamilyMastery(families[index-1])>=KANA_FAMILY_UNLOCK_MASTERY;}
function highestUnlockedKanaFamily(stage){const families=kanaFamiliesForStage(stage);let highest=0;for(let i=1;i<families.length;i++){if(kanaFamilyUnlocked(stage,i))highest=i;else break;}return highest;}
function currentKanaFamily(stage=selectedStageIndex()){ensureKanaFamilyState();const kind=kanaKindForStage(stage),highest=highestUnlockedKanaFamily(stage);state.kanaFamilyLevel[kind]=Math.min(highest,Math.max(0,Number(state.kanaFamilyLevel[kind])||0));return kanaFamiliesForStage(stage)[state.kanaFamilyLevel[kind]];}
function prepareKanaFamilyQuestion(question,family){if(!question)return question;const isCharacterAnswer=family.entries.some(([ch])=>ch===question.a);const values=family.entries.map(row=>row[isCharacterAnswer?0:1]);const options=shuffle([question.a,...shuffle(values.filter(value=>value!==question.a)).slice(0,3)]);return {...question,opts:[...new Set(options)]};}
function validKanaQuestionForSelection(question){const stage=selectedStageIndex();if(question?.smartReview===true)return true;if(stage>1)return !question||Number(question.stage)===stage;if(!question||Number(question.stage)!==stage)return false;const kana=kanaFromQuestion(question),boss=state.v5?.boss;if(boss?.status==='active'&&Number(question.bossCourseStage)===Number(boss.stage)&&Number(boss.stage)===stage)return !!kana&&kanaSetForStage(stage).some(([character])=>character===kana);return !!kana&&currentKanaFamily(stage).chars.includes(kana);}
function repairActiveKanaQuestion(){if(!state.active)return false;if(validKanaQuestionForSelection(state.active))return false;state.active=null;state.answered=false;state.shieldArmed=false;const area=document.getElementById('challengeArea');if(area)area.innerHTML='<div class="empty">Choose a kana family, then tap the rock for an alphabet-only question.</div>';return true;}
function selectKanaFamily(stage,index){stage=Number(stage);index=Number(index);if(stage!==selectedStageIndex()||stage>1||!kanaFamilyUnlocked(stage,index))return;ensureKanaFamilyState();state.kanaFamilyLevel[kanaKindForStage(stage)]=index;state.active=null;state.answered=false;state.shieldArmed=false;state.recentQuestionIds=[];const family=currentKanaFamily(stage);const area=document.getElementById('challengeArea');if(area)area.innerHTML=`<div class="empty"><strong>${family.name}</strong><br>${family.entries.map(([ch,rom])=>`${ch} (${rom})`).join(' · ')}<br>Tap the rock to begin.</div>`;save();render();setMessage(`${family.name} selected. Questions will use only ${family.entries.map(([ch])=>ch).join('、')}.`,'correct');}
function removeMainKanaFamilyPanel(){document.getElementById('kanaFamilyPanel')?.remove();}
const normalizeStateV646=normalizeState;
normalizeState=function(raw){return ensureKanaFamilyState(normalizeStateV646(raw));};
const renderV646=render;
render=function(){ensureKanaFamilyState();const tutorRepaired=repairTutorAccessState(),repaired=repairActiveKanaQuestion();renderV646();removeMainKanaFamilyPanel();if(repaired||tutorRepaired)save();};
const loadProfileV646=loadProfile;
loadProfile=function(profile,...args){const result=loadProfileV646(profile,...args);ensureKanaFamilyState();repairActiveKanaQuestion();render();return result;};
ensureKanaFamilyState();
repairActiveKanaQuestion();
if(activeProfileId)render();

// v6.4.17 - Required two-lesson review checkpoints for every JLPT course section.
function clearJlptReviewAutoAdvance(){if(jlptReviewAutoAdvanceTimer){clearTimeout(jlptReviewAutoAdvanceTimer);jlptReviewAutoAdvanceTimer=null;}}
function clearJlptReviewQuizClock(){if(jlptReviewQuizInterval){clearInterval(jlptReviewQuizInterval);jlptReviewQuizInterval=null;}clearJlptReviewAutoAdvance();}
function advanceJlptReviewCheckpoint(){
  const quiz=academyView.checkpointQuiz;if(!quiz||quiz.finished||!quiz.answered)return false;clearJlptReviewAutoAdvance();
  if(quiz.current>=JLPT_REVIEW_QUIZ_QUESTION_COUNT-1)return finishJlptReviewCheckpoint("completed");
  quiz.current+=1;quiz.answered=false;quiz.selected=null;renderAcademy();return true;
}
function scheduleJlptReviewAutoAdvance(quiz=academyView.checkpointQuiz){
  clearJlptReviewAutoAdvance();if(!quiz||quiz.finished||!quiz.answered)return false;const current=Number(quiz.current);
  jlptReviewAutoAdvanceTimer=setTimeout(()=>{jlptReviewAutoAdvanceTimer=null;if(academyView.checkpointQuiz!==quiz||quiz.finished||!quiz.answered||Number(quiz.current)!==current)return;if(jlptReviewQuizRemainingMs(quiz)<=0)finishJlptReviewCheckpoint("timeout");else advanceJlptReviewCheckpoint();},JLPT_REVIEW_AUTO_ADVANCE_DELAY_MS);return true;
}
function syncJlptReviewQuizTabs(disabled){document.querySelectorAll("[data-academy-tab]").forEach(button=>{button.disabled=!!disabled;button.setAttribute("aria-disabled",String(!!disabled));});}
function jlptReviewQuizRemainingMs(quiz=academyView.checkpointQuiz){return quiz&&!quiz.finished?Math.max(0,Number(quiz.deadline)-Date.now()):0;}
function jlptReviewQuizTimeLabel(ms){const total=Math.max(0,Math.ceil(Number(ms||0)/1000));return `${String(Math.floor(total/60)).padStart(2,"0")}:${String(total%60).padStart(2,"0")}`;}
function finishJlptReviewCheckpoint(reason="completed"){
  const quiz=academyView.checkpointQuiz;if(!quiz||quiz.finished)return false;
  clearJlptReviewQuizClock();quiz.finished=true;quiz.finishReason=reason;quiz.finishedAt=Date.now();quiz.score=Math.round(Number(quiz.correct||0)/JLPT_REVIEW_QUIZ_QUESTION_COUNT*100);quiz.passed=quiz.score>=JLPT_REVIEW_QUIZ_PASS_SCORE;
  ensureJlptSectionState();const key=jlptReviewCheckpointKey(quiz.stage,quiz.section,quiz.evenLesson),previous=jlptReviewCheckpointResult(quiz.stage,quiz.section,quiz.evenLesson);
  const elapsedTimeMs=normalizeAssessmentTimeMs(quiz.finishedAt-Number(quiz.startedAt||quiz.finishedAt)),previousFastest=normalizeAssessmentTimeMs(previous.fastestTimeMs),eligibleForRecord=reason==='completed'&&quiz.passed&&Number(quiz.answeredCount)===JLPT_REVIEW_QUIZ_QUESTION_COUNT,newFastest=eligibleForRecord&&(!previousFastest||elapsedTimeMs<previousFastest),fastestTimeMs=newFastest?elapsedTimeMs:previousFastest;
  quiz.elapsedTimeMs=elapsedTimeMs;quiz.newFastest=newFastest;quiz.fastestTimeMs=fastestTimeMs;
  state.jlptReviewCheckpoints[key]={best:Math.max(Number(previous.best)||0,quiz.score),lastScore:quiz.score,attempts:Number(previous.attempts||0)+1,passed:previous.passed===true||quiz.passed,passedAt:quiz.passed?Date.now():Number(previous.passedAt||0),fastestTimeMs,fastestAt:newFastest?quiz.finishedAt:Number(previous.fastestAt||0)};
  const nextExists=!!jlptSectionLevels(quiz.stage,quiz.section)[quiz.evenLesson];
  save();renderAcademy();setMessage(quiz.passed?(nextExists?`Review quiz passed with ${quiz.score}%. Lesson ${quiz.evenLesson+1} is now available.`:`Final lesson-pair review passed with ${quiz.score}%.`):`Review quiz score: ${quiz.score}%. Reach 75% to continue.`,quiz.passed?"correct":"wrong");return true;
}
function jlptReviewQuizTick(){
  const quiz=academyView.checkpointQuiz;if(!quiz||quiz.finished){clearJlptReviewQuizClock();return;}
  const remaining=jlptReviewQuizRemainingMs(quiz),timer=document.getElementById("jlptReviewQuizTimer");if(timer){timer.textContent=jlptReviewQuizTimeLabel(remaining);timer.classList.toggle("urgent",remaining<=30000);}
  if(remaining<=0)finishJlptReviewCheckpoint("timeout");
}
function startJlptReviewQuizClock(){if(jlptReviewQuizInterval)return;jlptReviewQuizInterval=setInterval(jlptReviewQuizTick,250);jlptReviewQuizTick();}
function renderJlptReviewCheckpointQuiz(){
  const quiz=academyView.checkpointQuiz;if(!quiz)return "";const spec=jlptSectionSpec(quiz.section),pair=`Lessons ${quiz.evenLesson-1}–${quiz.evenLesson}`,levels=jlptSectionLevels(quiz.stage,quiz.section),nextExists=!!levels[quiz.evenLesson];
  if(quiz.finished){
    const record=jlptReviewCheckpointResult(quiz.stage,quiz.section,quiz.evenLesson),gatePassed=record.passed===true,elapsed=Math.min(150,Math.max(0,Math.ceil((Number(quiz.finishedAt)-Number(quiz.startedAt))/1000))),unanswered=JLPT_REVIEW_QUIZ_QUESTION_COUNT-Number(quiz.answeredCount||0);
    const missedMarkup=window.japaneseMinerAssessmentMissesMarkup?.(quiz.missed)||'',recordMarkup=assessmentRecordMarkup(record.fastestTimeMs,quiz.newFastest,'Fastest passing quiz');
    return `<section class="jlpt-review-quiz-result ${quiz.passed?'passed':'failed'}"><div class="lesson-review-check">${quiz.passed?'✓':'!'}</div><div class="course-kicker">${vocabularyCourseLabel(quiz.stage)} ${spec.name} · ${pair} checkpoint</div><h3>${quiz.passed?'Review quiz passed':'Review quiz needs another try'}</h3><div class="jlpt-review-result-score">${quiz.score}%</div><p>${quiz.correct}/${JLPT_REVIEW_QUIZ_QUESTION_COUNT} correct · ${unanswered} unanswered · ${elapsed} seconds used</p>${recordMarkup}<strong>${quiz.passed?(nextExists?`Lesson ${quiz.evenLesson+1} is now available.`:'Final lesson-pair review complete.'):gatePassed?'This checkpoint remains passed from your earlier score.':'Score at least 75% (19 correct answers) to unlock the next lesson.'}</strong>${missedMarkup}<div class="lesson-preview-actions"><button data-checkpoint-back type="button">← All lessons</button><button data-checkpoint-retry type="button">Try another random set</button>${gatePassed&&nextExists?`<button data-checkpoint-continue class="primary" type="button">Continue to Lesson ${quiz.evenLesson+1}</button>`:""}</div></section>`;
  }
  const question=quiz.questions[quiz.current],remaining=jlptReviewQuizRemainingMs(quiz),progress=(quiz.current+1)/JLPT_REVIEW_QUIZ_QUESTION_COUNT*100,record=jlptReviewCheckpointResult(quiz.stage,quiz.section,quiz.evenLesson),recordCopy=record.fastestTimeMs?` · Record ${assessmentTimeLabel(record.fastestTimeMs)}`:'';
  return `<section class="course-focus jlpt-review-quiz"><header><div><div class="course-kicker">${vocabularyCourseLabel(quiz.stage)} ${spec.name} · ${pair} Review Quiz</div><h3>Question ${quiz.current+1} of ${JLPT_REVIEW_QUIZ_QUESTION_COUNT}</h3><p>${quiz.correct} correct so far · 75% required to pass${recordCopy}</p></div><strong id="jlptReviewQuizTimer" class="jlpt-review-timer ${remaining<=30000?'urgent':''}" aria-live="polite">${jlptReviewQuizTimeLabel(remaining)}</strong></header>${progressBar(progress)}<article class="jlpt-review-question"><div class="jlpt-review-question-display">${v3Esc(question.display)}</div><p>${v3Esc(question.prompt)}</p><div class="course-answer-grid">${question.options.map((option,index)=>{const correct=quiz.answered&&option===question.answer,wrong=quiz.answered&&option===quiz.selected&&option!==question.answer;return `<button data-checkpoint-answer="${index}" class="${correct?'answer-good':wrong?'answer-bad':''}" type="button" ${quiz.answered?'disabled':''}>${v3Esc(option)}</button>`;}).join("")}</div><div class="course-feedback" aria-live="polite">${quiz.answered?(quiz.selected===question.answer?'✅ Correct!':`❌ Correct answer: <strong>${v3Esc(question.answer)}</strong>`):"Choose the best answer before time runs out."}</div></article><div class="lesson-preview-actions"><button data-checkpoint-quit type="button">Quit quiz</button>${quiz.answered?'<span class="jlpt-review-auto-advance" role="status">Next question loading automatically…</span>':""}</div></section>`;
}
function leaveJlptReviewCheckpoint(){clearJlptReviewQuizClock();academyView.checkpointQuiz=null;syncJlptReviewQuizTabs(false);resetJlptLessonView();renderAcademy();}
function openJlptReviewCheckpoint(stage,section,evenLesson){
  stage=Number(stage);section=String(section);evenLesson=Number(evenLesson);
  if(!JLPT_SECTION_IDS.has(section)||(!jlptReviewCheckpointAvailable(stage,section,evenLesson)&&!jlptReviewCheckpointPassed(stage,section,evenLesson))){setMessage(`Reach 75% mastery in Lessons ${evenLesson-1} and ${evenLesson} before starting this review quiz.`,"wrong");return false;}
  const quizQuestions=buildJlptReviewCheckpointQuestions(stage,section,evenLesson);if(quizQuestions.length!==JLPT_REVIEW_QUIZ_QUESTION_COUNT){setMessage("This review quiz does not have enough lesson questions yet.","wrong");return false;}
  openAcademy(stage);academyTab=section;academyView.lesson=null;academyView.word=null;academyView.sectionItem=null;academyView.preview=null;academyView.lessonSection=section;academyView.quiz=null;academyView.checkpointQuiz={stage,section,evenLesson,questions:quizQuestions,current:0,correct:0,answeredCount:0,answered:false,selected:null,missed:[],startedAt:Date.now(),deadline:Date.now()+JLPT_REVIEW_QUIZ_TIME_MS,finished:false,score:0,passed:false};
  updateAcademyChrome();syncJlptReviewQuizTabs(true);clearJlptReviewQuizClock();renderAcademy();return true;
}
function handleJlptReviewCheckpointAction(target){
  const quiz=academyView.checkpointQuiz;if(!target||!quiz)return false;
  if(target.matches("[data-checkpoint-answer]")){
    if(quiz.finished||quiz.answered)return true;if(jlptReviewQuizRemainingMs(quiz)<=0){finishJlptReviewCheckpoint("timeout");return true;}
    const question=quiz.questions[quiz.current],option=question.options[Number(target.dataset.checkpointAnswer)],correct=option===question.answer;quiz.selected=option;quiz.answered=true;quiz.answeredCount=Number(quiz.answeredCount||0)+1;if(correct)quiz.correct=Number(quiz.correct||0)+1;else{const resultQuestion={id:`checkpoint:${quiz.stage}:${quiz.section}:${quiz.evenLesson}:${question.id}`,stage:quiz.stage,q:question.display,prompt:question.prompt,a:question.answer,kind:'jlpt-review-quiz'};const missed=window.japaneseMinerRecordWrongAssessment?.(resultQuestion,option,'JLPT Review Quiz');if(missed)quiz.missed.push(missed);}playFeedbackSound(correct);renderAcademy();scheduleJlptReviewAutoAdvance(quiz);return true;
  }
  if(target.matches("[data-checkpoint-next]")){advanceJlptReviewCheckpoint();return true;}
  if(target.matches("[data-checkpoint-retry]")){openJlptReviewCheckpoint(quiz.stage,quiz.section,quiz.evenLesson);return true;}
  if(target.matches("[data-checkpoint-continue]")){const {stage,section,evenLesson}=quiz;clearJlptReviewQuizClock();academyView.checkpointQuiz=null;syncJlptReviewQuizTabs(false);openJlptSectionLessonReview(stage,section,evenLesson);return true;}
  if(target.matches("[data-checkpoint-back],[data-checkpoint-quit]")){leaveJlptReviewCheckpoint();return true;}
  return false;
}
const closeAcademyV6417Review=closeAcademy;
closeAcademy=function(){clearJlptReviewQuizClock();if(academyView)academyView.checkpointQuiz=null;syncJlptReviewQuizTabs(false);return closeAcademyV6417Review();};
const renderAcademyV6417Review=renderAcademy;
renderAcademy=function(){
  if(academyView.checkpointQuiz){updateAcademyChrome();const box=document.getElementById("academyContent");if(!box)return;syncJlptReviewQuizTabs(true);box.innerHTML=renderJlptReviewCheckpointQuiz();box.onclick=event=>{const target=event.target.closest("button");if(target)handleJlptReviewCheckpointAction(target);};if(!academyView.checkpointQuiz.finished)startJlptReviewQuizClock();return;}
  syncJlptReviewQuizTabs(false);return renderAcademyV6417Review();
};

// v6.4.126 - Explicitly whitelisted, read-only learner summaries for the
// Parent/Teacher Center. This bridge never returns raw saves, Notebook notes,
// answer content, economy controls, or mutable references to player state.
(()=>{
  'use strict';
  const COURSE_STORAGE_PREFIX='lm_multilingual_functional_preview_v1:';
  const PARENT_TEACHER_LINK_KEY='lm_parent_teacher_links_v1';
  const LANGUAGE_NAMES={en:'English',es:'Spanish',ru:'Russian',ja:'Japanese',ko:'Korean',zh:'Mandarin Chinese',it:'Italian',fr:'French',de:'German',pt:'Brazilian Portuguese',vi:'Vietnamese',th:'Thai',tr:'Turkish',id:'Indonesian',pl:'Polish',el:'Greek',uk:'Ukrainian'};
  const SECTION_NAMES={vocabulary:'Vocabulary',grammar:'Grammar',reading:'Reading',listening:'Listening',sentences:'Sentences'};
  const safeNumber=value=>Number.isFinite(Number(value))?Number(value):0;
  const safeTime=value=>Math.max(0,Math.round(safeNumber(value)));
  const safeDate=value=>/^\d{4}-\d{2}-\d{2}$/.test(String(value||''))?String(value):'';
  const clone=value=>{try{return structuredClone(value);}catch{return JSON.parse(JSON.stringify(value));}};
  const deepFreeze=value=>{if(value&&typeof value==='object'&&!Object.isFrozen(value)){Object.freeze(value);Object.values(value).forEach(deepFreeze);}return value;};
  function profileList(){
    return readProfiles().filter(profile=>profile&&profile.id).map(profile=>({id:String(profile.id),name:String(profile.name||'Player'),email:String(profile.email||''),cloudUserId:String(profile.cloudUserId||''),lastPlayed:safeTime(profile.lastPlayed),createdAt:safeTime(profile.createdAt)}));
  }
  function profileState(profileId){
    try{const raw=JSON.parse(localStorage.getItem(profileStorageKey(profileId))||'{}')||{};return normalizeState(raw);}catch{return normalizeState({});}
  }
  function readOnlyAccessApproved(profileId){
    const target=String(profileId||'');if(!target||!activeProfileId)return false;if(target===String(activeProfileId))return true;
    try{const links=JSON.parse(localStorage.getItem(PARENT_TEACHER_LINK_KEY)||'[]');return Array.isArray(links)&&links.some(link=>link&&String(link.adultProfileId)===String(activeProfileId)&&String(link.studentProfileId)===target&&link.status==='approved');}catch{return false;}
  }
  function courseSettings(profile){
    const keys=[];
    if(profile.cloudUserId)keys.push(`cloud:${profile.cloudUserId}`);
    if(profile.name)keys.push(`local:${profile.name}`);
    for(const key of keys){
      try{const value=JSON.parse(localStorage.getItem(COURSE_STORAGE_PREFIX+key)||'null');if(value&&typeof value==='object')return clone(value);}catch{}
    }
    return {known:'en',learning:'ja',placements:{},progress:{}};
  }
  function masteryFromStat(stat,requiredCorrect=3){
    const attempts=Math.max(0,safeNumber(stat?.attempts??stat?.a)),correct=Math.max(0,safeNumber(stat?.correct??stat?.c));
    if(!attempts||!correct)return 0;
    return Math.round(Math.min(1,correct/attempts)*Math.min(1,correct/requiredCorrect)*100);
  }
  function stateStageMastery(source,index){
    if(index===0||index===1){const set=index===0?hira:kata;if(!set.length)return 0;return Math.round(set.reduce((sum,[character])=>sum+masteryFromStat(source.kanaStats?.[character],25),0)/set.length);}
    const pool=questions.filter(question=>Number(question.stage)===index&&question.curriculum!=='tutor');
    if(!pool.length)return 0;
    return Math.round(pool.reduce((sum,question)=>sum+masteryFromStat(source.questionStats?.[question.id],3),0)/pool.length);
  }
  function activitySummary(source){
    const dates=studyDateKeys(source).filter(Boolean),times={};
    if(source.studyTimeByDate&&typeof source.studyTimeByDate==='object'&&!Array.isArray(source.studyTimeByDate))Object.entries(source.studyTimeByDate).forEach(([key,value])=>{const date=safeDate(key),milliseconds=safeTime(value);if(date&&milliseconds)times[date]=milliseconds;});
    Object.keys(times).forEach(key=>{if(!dates.includes(key))dates.push(key);});dates.sort();
    const days=dates.map(date=>({date,milliseconds:times[date]||0}));
    return {currentStreak:calculatePracticeStreak(source),bestStreak:Math.max(safeNumber(source.bestStreak),calculatePracticeStreak(source)),totalStudyDays:dates.length,totalMilliseconds:Object.values(times).reduce((sum,value)=>sum+value,0),days:days.slice(-120),recentDays:days.slice(-14).reverse()};
  }
  function dueSummary(source){
    const entries=source.v5?.srs&&typeof source.v5.srs==='object'&&!Array.isArray(source.v5.srs)?Object.values(source.v5.srs):[],now=Date.now();
    const due=entries.filter(record=>record&&safeTime(record.dueAt)<=now),upcoming=entries.map(record=>safeTime(record?.dueAt)).filter(time=>time>now).sort((a,b)=>a-b);
    return {dueCount:due.length,scheduledCount:entries.length,nextDueAt:upcoming[0]||0,completedReviews:Math.max(0,safeNumber(source.v5?.reviewed))};
  }
  function japaneseCourseSummary(source){
    const selected=Math.max(0,Math.min(stages.length-1,Math.round(safeNumber(source.selectedStage)))),cleared=new Set((Array.isArray(source.clearedStages)?source.clearedStages:[]).map(Number));
    const levels=stages.map((stage,index)=>{const xp=Math.max(0,safeNumber(source.stageXp?.[index])),mastery=stateStageMastery(source,index),completed=cleared.has(index)||(xp>=STAGE_XP_REQUIREMENTS[index]&&mastery>=STAGE_MASTERY_REQUIREMENTS[index]),unlocked=index===0||index<=safeNumber(source.placementUnlockedThrough)||cleared.has(index-1);return {index,name:stage.name,label:stage.label,xp,xpRequired:STAGE_XP_REQUIREMENTS[index],mastery,masteryRequired:STAGE_MASTERY_REQUIREMENTS[index],completed,unlocked,selected:index===selected};});
    const overall=Math.round(levels.reduce((sum,level)=>sum+Math.min(100,(Math.min(1,level.xp/Math.max(1,level.xpRequired))*50)+(Math.min(1,level.mastery/Math.max(1,level.masteryRequired))*50)),0)/levels.length);
    return {known:'en',learning:'ja',knownName:'English',learningName:'Japanese',selectedLevel:selected,selectedLabel:levels[selected]?.name||'Hiragana Mine',overallPercent:overall,levels};
  }
  function multilingualCourseSummary(settings){
    const known=LANGUAGE_NAMES[settings.known]?settings.known:'en',learning=LANGUAGE_NAMES[settings.learning]?settings.learning:'ja',progress=settings.progress?.[learning]&&typeof settings.progress[learning]==='object'?settings.progress[learning]:{},selected=Math.max(0,Math.min(6,Math.round(safeNumber(progress.selectedMine)))),defeated=progress.bossDefeatedByMine&&typeof progress.bossDefeatedByMine==='object'?progress.bossDefeatedByMine:{};
    const levels=Array.from({length:7},(_,index)=>{const xp=Math.max(0,safeNumber(progress.mineXpByMine?.[index])),completed=defeated[index]===true||safeNumber(progress.bossBestByMine?.[index])>=100,unlocked=index===0||defeated[index-1]===true;return {index,name:`${LANGUAGE_NAMES[learning]} Level ${index+1}`,label:`Level ${index+1}`,xp,xpRequired:STAGE_XP_REQUIREMENTS[index],mastery:0,masteryRequired:0,completed,unlocked,selected:index===selected};});
    const answered=Math.max(0,safeNumber(progress.answered)),correct=Math.max(0,safeNumber(progress.correct)),overall=Math.round(levels.reduce((sum,level)=>sum+(level.completed?100:Math.min(95,level.xp/Math.max(1,level.xpRequired)*100)),0)/levels.length);
    return {known,learning,knownName:LANGUAGE_NAMES[known],learningName:LANGUAGE_NAMES[learning],selectedLevel:selected,selectedLabel:levels[selected].name,overallPercent:overall,answered,correct,levels};
  }
  function assessmentSummary(source,settings){
    const history=[],fastest={placement:0,reviewQuiz:0,guardian:0};
    const add=(record)=>{history.push(record);if(record.fastestTimeMs&&(!fastest[record.group]||record.fastestTimeMs<fastest[record.group]))fastest[record.group]=record.fastestTimeMs;};
    const placement=source.placementResult&&typeof source.placementResult==='object'?source.placementResult:null;
    if(placement)add({group:'placement',type:'Placement test',course:'Japanese',result:'Completed',score:safeNumber(placement.score),total:safeNumber(placement.total),attempts:1,completedAt:safeTime(placement.completedAt||placement.finishedAt),fastestTimeMs:safeTime(placement.fastestTimeMs||placement.elapsedTimeMs)});
    Object.entries(source.jlptReviewCheckpoints||{}).forEach(([key,record])=>{if(!record||typeof record!=='object')return;const parts=key.split(':'),stage=stages[Math.max(0,Math.min(6,safeNumber(parts[0])))]?.label||'Course',section=SECTION_NAMES[parts[1]]||String(parts[1]||'Review'),lessons=safeNumber(parts[2]);add({group:'reviewQuiz',type:`${stage} ${section} Review`,course:'Japanese',result:record.passed?'Passed':'Attempted',score:safeNumber(record.best||record.lastScore),total:100,attempts:Math.max(1,safeNumber(record.attempts)),completedAt:safeTime(record.passedAt||record.fastestAt),fastestTimeMs:safeTime(record.fastestTimeMs)});});
    Object.entries(source.v5?.bossFastestTimes||{}).forEach(([index,time])=>add({group:'guardian',type:`${stages[Math.max(0,Math.min(6,safeNumber(index)))]?.label||'Course'} Guardian`,course:'Japanese',result:'Perfect',score:100,total:100,attempts:1,completedAt:0,fastestTimeMs:safeTime(time)}));
    const learning=LANGUAGE_NAMES[settings.learning]?settings.learning:'ja';
    if(learning!=='ja'){
      const language=LANGUAGE_NAMES[learning],placementRecord=settings.placements?.[learning];
      if(placementRecord&&typeof placementRecord==='object')add({group:'placement',type:'Placement test',course:language,result:'Completed',score:safeNumber(placementRecord.score),total:safeNumber(placementRecord.total),attempts:1,completedAt:safeTime(placementRecord.completedAt),fastestTimeMs:safeTime(placementRecord.fastestTimeMs||placementRecord.elapsedTimeMs)});
      const progress=settings.progress?.[learning]||{};
      Object.entries(progress.reviewCheckpoints||{}).forEach(([key,record])=>{if(!record||typeof record!=='object')return;add({group:'reviewQuiz',type:`Level ${safeNumber(key.split(':')[0])+1} Review`,course:language,result:record.passed?'Passed':'Attempted',score:safeNumber(record.best||record.lastScore),total:100,attempts:Math.max(1,safeNumber(record.attempts)),completedAt:safeTime(record.passedAt||record.fastestAt),fastestTimeMs:safeTime(record.fastestTimeMs)});});
      Object.entries(progress.bossFastestByMine||{}).forEach(([index,time])=>add({group:'guardian',type:`Level ${safeNumber(index)+1} Guardian`,course:language,result:'Perfect',score:100,total:100,attempts:1,completedAt:0,fastestTimeMs:safeTime(time)}));
    }
    history.sort((a,b)=>(b.completedAt||b.fastestTimeMs)-(a.completedAt||a.fastestTimeMs));
    return {history:history.slice(0,100),fastest};
  }
  function snapshot(profileId){
    if(!readOnlyAccessApproved(profileId))return null;
    const profile=profileList().find(item=>item.id===String(profileId));if(!profile)return null;
    const source=profileState(profile.id),settings=courseSettings(profile),analytics=source.analytics&&typeof source.analytics==='object'?source.analytics:{},coreAnswered=Math.max(0,safeNumber(analytics.answered)),coreCorrect=Math.max(0,safeNumber(analytics.correct)),course=settings.learning!=='ja'?multilingualCourseSummary(settings):japaneseCourseSummary(source),answered=course.learning==='ja'?coreAnswered:Math.max(coreAnswered,safeNumber(course.answered)),correct=course.learning==='ja'?coreCorrect:Math.max(coreCorrect,safeNumber(course.correct)),activity=activitySummary(source),reviews=dueSummary(source),assessments=assessmentSummary(source,settings);
    const summary={profile:{id:profile.id,name:profile.name},generatedAt:Date.now(),level:Math.max(1,safeNumber(source.level)||1),questions:{answered,correct,accuracy:answered?Math.round(correct/answered*100):0,distribution:{vocabulary:Math.max(0,safeNumber(analytics.vocabulary)),grammar:Math.max(0,safeNumber(analytics.grammar)),reading:Math.max(0,safeNumber(analytics.reading)),listening:Math.max(0,safeNumber(analytics.listening)),kanji:Math.max(0,safeNumber(analytics.kanji))}},activity,reviews,course,assessments};
    return deepFreeze(summary);
  }
  window.LanguageMinerReadOnly=Object.freeze({
    activeProfile:()=>deepFreeze(clone(window.japaneseMinerActiveProfile?.()||null)),
    profiles:()=>deepFreeze(profileList()),
    learnerSummary:profileId=>snapshot(profileId),
    capabilities:deepFreeze({rawSaves:false,answers:false,economy:false,resets:false,privateNotes:false,accessSummariesOnly:true})
  });
})();
