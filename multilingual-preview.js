// Functional multilingual entry flow layered onto Language Miner v6.4.94.
(()=>{
  'use strict';
  const LANGUAGES={
    en:{name:'English',native:'English',flag:'🇺🇸',path:'Alphabet Mine through advanced practice',mine:'English Alphabet Mine',voice:'en-US',accent:'American English · United States'},
    es:{name:'Spanish',native:'Español',flag:'🇪🇸',path:'Alphabet Mine through advanced practice',mine:'Spanish Alphabet Mine',voice:'es-ES',accent:'Español de España · Spain'},
    ru:{name:'Russian',native:'Русский',flag:'🇷🇺',path:'Cyrillic Alphabet through advanced practice',mine:'Cyrillic Alphabet Mine',voice:'ru-RU',accent:'Русский · Russia'},
    ja:{name:'Japanese',native:'日本語',flag:'🇯🇵',path:'Hiragana through advanced JLPT-oriented practice',mine:'Hiragana Mine',voice:'ja-JP',accent:'日本語 · Japan'},
    ko:{name:'Korean',native:'한국어',flag:'🇰🇷',path:'Hangul through advanced TOPIK-oriented practice',mine:'Hangul Alphabet Mine',voice:'ko-KR',accent:'한국어 · South Korea'},
    zh:{name:'Chinese (Mandarin)',native:'中文（普通话）',flag:'🇨🇳',path:'Pinyin and tones through advanced HSK-oriented practice',mine:'Pinyin Alphabet & Tone Mine',voice:'zh-CN',accent:'普通话 · Mainland China'},
    it:{name:'Italian',native:'Italiano',flag:'🇮🇹',path:'Alphabet Mine through advanced practice',mine:'Italian Alphabet Mine',voice:'it-IT',accent:'Italiano · Italy'},
    fr:{name:'French',native:'Français',flag:'🇫🇷',path:'Alphabet Mine through advanced DALF-oriented practice',mine:'French Alphabet Mine',voice:'fr-FR',accent:'Français de France · France'},
    de:{name:'German',native:'Deutsch',flag:'🇩🇪',path:'Alphabet Mine through advanced practice',mine:'German Alphabet Mine',voice:'de-DE',accent:'Deutsch · Germany'}
  };
  const EXPEDITION_COURSES={
    en:[
      ['English Alphabet Mine','A–Z letters and their names','🔤'],
      ['Everyday English Cavern','Daily vocabulary and useful sentences','🏘️'],
      ['English Grammar Quarry','Sentence patterns and core grammar','🧱'],
      ['Conversation Tunnel','Listening and real-world conversation','💬'],
      ['Intermediate English Range','Independent reading and expression','⛰️'],
      ['Advanced English Depths','Nuance and advanced-text practice','📚'],
      ['C2-oriented Summit','Advanced practice milestone · not a proficiency certificate','🏆']
    ],
    es:[
      ['Spanish Alphabet Mine','A–Z, Ñ, and Spanish letter names','Ñ'],
      ['Everyday Spanish Cavern','Daily vocabulary and useful sentences','🏘️'],
      ['Spanish Grammar Quarry','Gender, verbs, and sentence patterns','🧱'],
      ['Conversation Tunnel','Listening and real-world conversation','💬'],
      ['Intermediate Spanish Range','Independent reading and expression','⛰️'],
      ['Advanced Spanish Depths','Nuance and advanced-text practice','📚'],
      ['C2-oriented Summit','Advanced practice milestone · not a proficiency certificate','🏆']
    ],
    ru:[
      ['Cyrillic Alphabet Mine','All 33 Russian Cyrillic letters','Я'],
      ['Everyday Russian Cavern','Daily vocabulary and useful sentences','🏘️'],
      ['Russian Cases Quarry','Cases, verbs, and sentence patterns','🧱'],
      ['Conversation Tunnel','Listening and real-world conversation','💬'],
      ['Intermediate Russian Range','Independent reading and expression','⛰️'],
      ['Advanced Russian Depths','Nuance and advanced-text practice','📚'],
      ['C2-oriented Summit','Advanced practice milestone · not a proficiency certificate','🏆']
    ],
    ja:[
      ['Hiragana Mine','Hiragana character families','あ'],
      ['Katakana Cavern','Katakana character families','カ'],
      ['JLPT N5 Quarry','Beginning Japanese','語'],
      ['JLPT N4 Tunnel','Elementary Japanese','文'],
      ['JLPT N3 Ridge','Intermediate Japanese','読'],
      ['JLPT N2 Depths','Advanced Japanese','聴'],
      ['JLPT N1-oriented Summit','Advanced Japanese practice milestone · not JLPT certification','🏆']
    ],
    ko:[
      ['Hangul Alphabet Mine','Basic Hangul consonants and vowels','한'],
      ['Everyday Korean Cavern','Daily vocabulary and useful sentences','🏘️'],
      ['Korean Grammar Quarry','Particles, verbs, and sentence patterns','🧱'],
      ['Conversation Tunnel','Listening and real-world conversation','💬'],
      ['TOPIK I Range','Beginning Korean proficiency','⛰️'],
      ['TOPIK II Depths','Intermediate and advanced Korean','📚'],
      ['TOPIK 6-oriented Summit','Advanced Korean practice milestone · not TOPIK certification','🏆']
    ],
    zh:[
      ['Pinyin Alphabet & Tone Mine','Pinyin initials, finals, and four tones','声'],
      ['Character & Word Cavern','Core characters and daily vocabulary','字'],
      ['Mandarin Grammar Quarry','Word order and sentence patterns','🧱'],
      ['Conversation Tunnel','Listening and real-world conversation','💬'],
      ['HSK 1–3 Range','Beginning Mandarin proficiency','⛰️'],
      ['HSK 4–6 Depths','Intermediate Mandarin proficiency','📚'],
      ['HSK 7–9-oriented Summit','Advanced Mandarin practice milestone · not HSK certification','🏆']
    ],
    it:[
      ['Italian Alphabet Mine','The 21 standard Italian letters','A'],
      ['Everyday Italian Cavern','Daily vocabulary and useful sentences','🏘️'],
      ['Italian Grammar Quarry','Gender, verbs, and sentence patterns','🧱'],
      ['Conversation Tunnel','Listening and real-world conversation','💬'],
      ['Intermediate Italian Range','Independent reading and expression','⛰️'],
      ['Advanced Italian Depths','Nuance and advanced-text practice','📚'],
      ['C2-oriented Summit','Advanced practice milestone · not a proficiency certificate','🏆']
    ],
    fr:[
      ['French Alphabet Mine','A–Z and French letter names','É'],
      ['Everyday French Cavern','Daily vocabulary and useful sentences','🏘️'],
      ['French Grammar Quarry','Gender, verbs, and sentence patterns','🧱'],
      ['Conversation Tunnel','Listening and real-world conversation','💬'],
      ['Intermediate French Range','Independent reading and expression','⛰️'],
      ['Advanced French Depths','Nuance and advanced-text practice','📚'],
      ['DALF C2-oriented Summit','Advanced French practice milestone · not DALF certification','🏆']
    ],
    de:[
      ['German Alphabet Mine','A–Z, Ä, Ö, Ü, and ß','Ä'],
      ['Everyday German Cavern','Daily vocabulary and useful sentences','🏘️'],
      ['German Grammar Quarry','Cases, verbs, and sentence patterns','🧱'],
      ['Conversation Tunnel','Listening and real-world conversation','💬'],
      ['Intermediate German Range','Independent reading and expression','⛰️'],
      ['Advanced German Depths','Nuance and advanced-text practice','📚'],
      ['C2-oriented Summit','Advanced practice milestone · not a proficiency certificate','🏆']
    ]
  };
  const COURSE_LEVEL_LABELS={
    en:['Alphabet','A1-oriented','A2-oriented','B1-oriented','B2-oriented','C1-oriented','C2-oriented'],
    es:['Alfabeto','A1-oriented','A2-oriented','B1-oriented','B2-oriented','C1-oriented','C2-oriented'],
    ru:['Кириллица','A1-oriented','A2-oriented','B1-oriented','B2-oriented','C1-oriented','C2-oriented'],
    ko:['한글','TOPIK 1-oriented','TOPIK 2-oriented','TOPIK 3-oriented','TOPIK 4-oriented','TOPIK 5-oriented','TOPIK 6-oriented'],
    zh:['拼音与声调','HSK 1-oriented','HSK 2-oriented','HSK 3-oriented','HSK 4–5-oriented','HSK 6-oriented','HSK 7–9-oriented'],
    it:['Alfabeto','A1-oriented','A2-oriented','B1-oriented','B2-oriented','C1-oriented','C2-oriented'],
    fr:['Alphabet','A1-oriented','A2-oriented','B1-oriented','B2-oriented','C1-oriented','DALF C2-oriented'],
    de:['Alphabet','A1-oriented','A2-oriented','B1-oriented','B2-oriented','C1-oriented','C2-oriented']
  };
  function alphabetUnits(source){
    return source.split('|').map(entry=>{const [symbol,name,spoken]=entry.split('~');return {symbol,name,spoken:spoken||name||symbol};});
  }
  const ALPHABET_SYSTEMS={
    en:{name:'English Alphabet',summary:'26 letters · A–Z',units:alphabetUnits('A~ay|B~bee|C~cee|D~dee|E~ee|F~ef|G~gee|H~aitch|I~eye|J~jay|K~kay|L~el|M~em|N~en|O~oh|P~pee|Q~cue|R~ar|S~ess|T~tee|U~you|V~vee|W~double-u|X~ex|Y~why|Z~zee')},
    es:{name:'Spanish Alphabet',summary:'27 letters · includes Ñ',units:alphabetUnits('A~a|B~be|C~ce|D~de|E~e|F~efe|G~ge|H~hache|I~i|J~jota|K~ka|L~ele|M~eme|N~ene|Ñ~eñe|O~o|P~pe|Q~cu|R~erre|S~ese|T~te|U~u|V~uve|W~uve doble|X~equis|Y~ye|Z~zeta')},
    ru:{name:'Russian Cyrillic Alphabet',summary:'33 Cyrillic letters',units:alphabetUnits('А~а|Б~бэ|В~вэ|Г~гэ|Д~дэ|Е~е|Ё~ё|Ж~жэ|З~зэ|И~и|Й~и краткое|К~ка|Л~эл|М~эм|Н~эн|О~о|П~пэ|Р~эр|С~эс|Т~тэ|У~у|Ф~эф|Х~ха|Ц~цэ|Ч~че|Ш~ша|Щ~ща|Ъ~твёрдый знак|Ы~ы|Ь~мягкий знак|Э~э|Ю~ю|Я~я')},
    ko:{name:'Korean Hangul Alphabet',summary:'14 consonants · 10 vowels',units:alphabetUnits('ㄱ~기역|ㄴ~니은|ㄷ~디귿|ㄹ~리을|ㅁ~미음|ㅂ~비읍|ㅅ~시옷|ㅇ~이응|ㅈ~지읒|ㅊ~치읓|ㅋ~키읔|ㅌ~티읕|ㅍ~피읖|ㅎ~히읗|ㅏ~아|ㅑ~야|ㅓ~어|ㅕ~여|ㅗ~오|ㅛ~요|ㅜ~우|ㅠ~유|ㅡ~으|ㅣ~이')},
    zh:{name:'Mandarin Pinyin Alphabet & Tones',summary:'Pinyin initials, finals, and four tones',units:alphabetUnits('b~b (bā)~八|p~p (pā)~趴|m~m (mā)~妈|f~f (fā)~发|d~d (dā)~搭|t~t (tā)~他|n~n (nā)~拿|l~l (lā)~拉|g~g (gē)~哥|k~k (kē)~科|h~h (hē)~喝|j~j (jī)~鸡|q~q (qī)~七|x~x (xī)~西|zh~zh (zhī)~知|ch~ch (chī)~吃|sh~sh (shī)~师|r~r (rì)~日|z~z (zī)~资|c~c (cī)~疵|s~s (sī)~思|y~y (yī)~一|w~w (wū)~屋|a~final a|o~final o|e~final e|i~final i|u~final u|ü~final ü|ā~first tone|á~second tone|ǎ~third tone|à~fourth tone')},
    it:{name:'Italian Alphabet',summary:'21 standard letters',units:alphabetUnits('A~a|B~bi|C~ci|D~di|E~e|F~effe|G~gi|H~acca|I~i|L~elle|M~emme|N~enne|O~o|P~pi|Q~cu|R~erre|S~esse|T~ti|U~u|V~vi|Z~zeta')},
    fr:{name:'French Alphabet',summary:'26 letters · A–Z',units:alphabetUnits('A~a|B~bé|C~cé|D~dé|E~e|F~effe|G~gé|H~ache|I~i|J~ji|K~ka|L~elle|M~emme|N~enne|O~o|P~pé|Q~qu|R~erre|S~esse|T~té|U~u|V~vé|W~double vé|X~ix|Y~i grec|Z~zède')},
    de:{name:'German Alphabet',summary:'26 letters · Ä, Ö, Ü, and ß',units:alphabetUnits('A~a|B~be|C~ce|D~de|E~e|F~eff|G~ge|H~ha|I~i|J~jot|K~ka|L~el|M~em|N~en|O~o|P~pe|Q~ku|R~er|S~es|T~te|U~u|V~vau|W~we|X~iks|Y~ypsilon|Z~zett|Ä~A-Umlaut|Ö~O-Umlaut|Ü~U-Umlaut|ß~Eszett')}
  };
  const FOUNDATION_CONCEPTS=[
    {id:'hello',forms:{en:'Hello',es:'Hola',ru:'Привет',ja:'こんにちは',ko:'안녕하세요',zh:'你好',it:'Ciao',fr:'Bonjour',de:'Hallo'}},
    {id:'thank-you',forms:{en:'Thank you',es:'Gracias',ru:'Спасибо',ja:'ありがとう',ko:'감사합니다',zh:'谢谢',it:'Grazie',fr:'Merci',de:'Danke'}},
    {id:'water',forms:{en:'Water',es:'Agua',ru:'Вода',ja:'水',ko:'물',zh:'水',it:'Acqua',fr:'Eau',de:'Wasser'}},
    {id:'food',forms:{en:'Food',es:'Comida',ru:'Еда',ja:'食べ物',ko:'음식',zh:'食物',it:'Cibo',fr:'Nourriture',de:'Essen'}},
    {id:'cat',forms:{en:'Cat',es:'Gato',ru:'Кошка',ja:'猫',ko:'고양이',zh:'猫',it:'Gatto',fr:'Chat',de:'Katze'}},
    {id:'dog',forms:{en:'Dog',es:'Perro',ru:'Собака',ja:'犬',ko:'개',zh:'狗',it:'Cane',fr:'Chien',de:'Hund'}},
    {id:'one',forms:{en:'One',es:'Uno',ru:'Один',ja:'一',ko:'하나',zh:'一',it:'Uno',fr:'Un',de:'Eins'}},
    {id:'two',forms:{en:'Two',es:'Dos',ru:'Два',ja:'二',ko:'둘',zh:'二',it:'Due',fr:'Deux',de:'Zwei'}},
    {id:'good-morning',forms:{en:'Good morning',es:'Buenos días',ru:'Доброе утро',ja:'おはようございます',ko:'좋은 아침이에요',zh:'早上好',it:'Buongiorno',fr:'Bonjour',de:'Guten Morgen'}},
    {id:'goodbye',forms:{en:'Goodbye',es:'Adiós',ru:'До свидания',ja:'さようなら',ko:'안녕히 가세요',zh:'再见',it:'Arrivederci',fr:'Au revoir',de:'Auf Wiedersehen'}}
  ];
  const QUESTION_PROMPTS={
    en:(meaning,target)=>`Which ${target} expression means “${meaning}”?`,
    es:(meaning,target)=>`¿Qué expresión en ${target} significa “${meaning}”?`,
    ru:(meaning,target)=>`Какое выражение на языке ${target} означает «${meaning}»?`,
    ja:(meaning,target)=>`「${meaning}」と同じ意味の${target}はどれ？`,
    ko:(meaning,target)=>`${target}에서 “${meaning}”와 같은 뜻은 어느 것입니까?`,
    zh:(meaning,target)=>`哪个${target}表达的意思是“${meaning}”？`,
    it:(meaning,target)=>`Quale espressione in ${target} significa “${meaning}”?`,
    fr:(meaning,target)=>`Quelle expression en ${target} signifie « ${meaning} » ?`,
    de:(meaning,target)=>`Welcher Ausdruck auf ${target} bedeutet „${meaning}“?`
  };
  const ALPHABET_PROMPTS={
    en:(name,target)=>`Which symbol in the ${target} alphabet is called “${name}”?`,
    es:(name,target)=>`¿Qué símbolo del alfabeto de ${target} se llama “${name}”?`,
    ru:(name,target)=>`Какой символ алфавита ${target} называется «${name}»?`,
    ja:(name,target)=>`${target}の文字で「${name}」と呼ばれるものはどれ？`,
    ko:(name,target)=>`${target} 문자 중 “${name}”라고 부르는 것은 무엇입니까?`,
    zh:(name,target)=>`${target}字母中哪个符号叫“${name}”？`,
    it:(name,target)=>`Quale simbolo dell'alfabeto ${target} si chiama “${name}”?`,
    fr:(name,target)=>`Quel symbole de l’alphabet ${target} s’appelle « ${name} » ?`,
    de:(name,target)=>`Welches Zeichen im ${target}-Alphabet heißt „${name}“?`
  };
  const POST_GUIDE_TRANSLATIONS={
    en:{title:'Game Guide',subtitle:'Your quick guide to the {language} course.',section:'Quick Start',back:'Back',next:'Next',finish:'Enter Mine',skip:'Skip guide',complete:'Guide complete. Your mine is ready.',pages:[
      ['⛏️','Start mining','Tap the rock or New Question to begin {mine}.',['Choose one answer, then review the correction.','Every answered question builds this language’s saved progress.']],
      ['🔊','Use pronunciation when you want it','Questions stay silent when they open. Use the optional audio button when you want a pronunciation clue.',['The correct pronunciation plays after grading.','Quizzes, placement tests, and guardian tests follow their own audio rules.']],
      ['🗺️','Follow the Expedition Hub','Open the Expedition Hub to see the complete {language} course route.',['Finish lesson checkpoints to move deeper into the course.','Pass each guardian to unlock the next mine.']],
      ['☰','Use your player tools','The menu opens courses, review, the Word Book, Notebook, character, shop, settings, and supporter features.',['Stats and Calendar remain in the header.','Kōji the Mine Gnome recommends what to study next.']],
      ['💎','Review and keep progressing','Correct answers produce gems, progress, and rewards while difficult material returns for review.',['Quiz and test mistakes appear in results and the Notebook.','Use Change Language to switch courses; each language keeps separate progress.']]
    ]},
    es:{title:'Guía del juego',subtitle:'Guía rápida para el curso de {language}.',section:'Inicio rápido',back:'Atrás',next:'Siguiente',finish:'Entrar en la mina',skip:'Omitir guía',complete:'Guía completada. Tu mina está lista.',pages:[
      ['⛏️','Empieza a minar','Pulsa la roca o Nueva pregunta para comenzar {mine}.',['Elige una respuesta y después revisa la corrección.','Cada pregunta contestada guarda progreso para este idioma.']],
      ['🔊','Usa la pronunciación cuando quieras','Las preguntas permanecen en silencio al abrirse. Usa el botón de audio opcional cuando quieras una pista de pronunciación.',['La pronunciación correcta se reproduce después de calificar.','Los cuestionarios, las pruebas de nivel y los guardianes tienen sus propias reglas de audio.']],
      ['🗺️','Sigue el Centro de Expedición','Abre el Centro de Expedición para ver toda la ruta del curso de {language}.',['Completa los puntos de control para avanzar.','Supera cada guardián para desbloquear la siguiente mina.']],
      ['☰','Usa tus herramientas','El menú abre cursos, repaso, vocabulario, cuaderno, personaje, tienda, ajustes y beneficios de Patreon.',['Las estadísticas y el calendario permanecen en la cabecera.','Kōji, el gnomo de la mina, recomienda qué estudiar.']],
      ['💎','Repasa y sigue progresando','Las respuestas correctas producen gemas, progreso y recompensas; el material difícil vuelve al repaso.',['Los errores de cuestionarios y pruebas aparecen en resultados y en el cuaderno.','Cambiar idioma permite cambiar de curso; cada idioma guarda su propio progreso.']]
    ]},
    ru:{title:'Руководство по игре',subtitle:'Краткое руководство по курсу {language}.',section:'Быстрый старт',back:'Назад',next:'Далее',finish:'Войти в шахту',skip:'Пропустить руководство',complete:'Руководство завершено. Шахта готова.',pages:[
      ['⛏️','Начните добычу','Нажмите на камень или «Новый вопрос», чтобы начать {mine}.',['Выберите ответ, затем прочитайте исправление.','Каждый отвеченный вопрос сохраняет прогресс этого языка.']],
      ['🔊','Используйте произношение по желанию','Новый вопрос открывается без звука. Нажмите дополнительную кнопку аудио, если нужна подсказка произношения.',['Правильное произношение звучит после проверки ответа.','Викторины, тест уровня и испытания хранителей используют собственные правила звука.']],
      ['🗺️','Следуйте по Центру экспедиций','Откройте Центр экспедиций, чтобы увидеть весь маршрут курса {language}.',['Проходите контрольные точки уроков, чтобы двигаться дальше.','Победите хранителя, чтобы открыть следующую шахту.']],
      ['☰','Используйте инструменты игрока','Меню открывает курсы, повторение, словарь, блокнот, персонажа, магазин, настройки и бонусы Patreon.',['Статистика и календарь находятся в верхней панели.','Шахтёрский гном Кодзи подсказывает, что учить дальше.']],
      ['💎','Повторяйте и развивайтесь','Правильные ответы дают самоцветы, прогресс и награды, а трудный материал возвращается на повторение.',['Ошибки в викторинах и тестах показываются в результатах и блокноте.','Кнопка смены языка переключает курс; прогресс каждого языка хранится отдельно.']]
    ]},
    ja:{title:'ゲームガイド',subtitle:'{language}コースのクイックガイドです。',section:'クイックスタート',back:'戻る',next:'次へ',finish:'鉱山に入る',skip:'ガイドをスキップ',complete:'ガイドが完了しました。鉱山の準備ができました。',pages:[
      ['⛏️','採掘を始める','岩または「新しい問題」を押して、{mine}を始めます。',['答えを一つ選び、判定後の説明を確認します。','回答した問題ごとに、この言語の進行状況が保存されます。']],
      ['🔊','必要なときだけ発音を聞く','問題を開いたときは自動再生されません。発音のヒントが必要な場合だけ音声ボタンを押します。',['正しい発音は採点後に再生されます。','クイズ、レベル判定、守護者テストにはそれぞれの音声ルールがあります。']],
      ['🗺️','遠征ハブを進む','遠征ハブを開くと、{language}コース全体のルートを確認できます。',['レッスンのチェックポイントを完了して先へ進みます。','守護者をクリアすると次の鉱山が開放されます。']],
      ['☰','プレイヤーツールを使う','メニューからコース、復習、単語帳、ノート、キャラクター、ショップ、設定、Patreon特典を開けます。',['統計とカレンダーはヘッダーにあります。','鉱山ノームのコージが次の学習内容を提案します。']],
      ['💎','復習して成長する','正解すると宝石、進行度、報酬を獲得し、難しい内容は復習に戻ります。',['クイズとテストで間違えた問題だけが結果とノートに表示されます。','「言語を変更」でコースを切り替えられ、進行度は言語ごとに保存されます。']]
    ]},
    ko:{title:'게임 가이드',subtitle:'{language} 코스를 위한 빠른 안내입니다.',section:'빠른 시작',back:'뒤로',next:'다음',finish:'광산 입장',skip:'가이드 건너뛰기',complete:'가이드를 완료했습니다. 광산이 준비되었습니다.',pages:[
      ['⛏️','채굴 시작하기','바위 또는 새 문제를 눌러 {mine}을 시작하세요.',['답을 하나 선택한 뒤 채점 설명을 확인하세요.','답한 문제마다 이 언어의 진행 상황이 저장됩니다.']],
      ['🔊','필요할 때만 발음 듣기','문제가 열릴 때 자동으로 소리가 나지 않습니다. 발음 힌트가 필요할 때만 선택형 오디오 버튼을 누르세요.',['정답 발음은 채점 후 재생됩니다.','퀴즈, 배치 시험, 수호자 시험에는 각각의 오디오 규칙이 있습니다.']],
      ['🗺️','원정 허브 따라가기','원정 허브를 열어 전체 {language} 코스 경로를 확인하세요.',['레슨 체크포인트를 완료해 더 깊이 진행하세요.','각 수호자를 통과하면 다음 광산이 열립니다.']],
      ['☰','플레이어 도구 사용하기','메뉴에서 코스, 복습, 단어장, 노트북, 캐릭터, 상점, 설정, Patreon 혜택을 열 수 있습니다.',['통계와 달력은 상단에 있습니다.','광산 노움 코지가 다음 학습 내용을 추천합니다.']],
      ['💎','복습하며 성장하기','정답은 보석, 진행도, 보상을 만들고 어려운 내용은 복습에 다시 나타납니다.',['퀴즈와 시험에서 틀린 문제만 결과와 노트북에 표시됩니다.','언어 변경으로 코스를 바꿀 수 있으며 진행도는 언어별로 저장됩니다.']]
    ]},
    zh:{title:'游戏指南',subtitle:'{language}课程快速指南。',section:'快速开始',back:'返回',next:'下一步',finish:'进入矿井',skip:'跳过指南',complete:'指南已完成。矿井已准备好。',pages:[
      ['⛏️','开始采矿','点击岩石或“新问题”即可开始{mine}。',['选择一个答案，然后查看批改说明。','每个已回答的问题都会保存该语言的进度。']],
      ['🔊','需要时再听发音','问题打开时不会自动播放声音。需要发音提示时，请主动点击可选音频按钮。',['正确发音会在评分后播放。','测验、分级测试和守护者测试各有自己的音频规则。']],
      ['🗺️','使用远征中心','打开远征中心即可查看完整的{language}课程路线。',['完成课程检查点以继续深入。','通过每位守护者即可解锁下一座矿井。']],
      ['☰','使用玩家工具','菜单可打开课程、复习、单词本、笔记本、角色、商店、设置和Patreon权益。',['统计和日历位于顶部栏。','矿山地精Kōji会建议下一步学习内容。']],
      ['💎','复习并继续进步','正确答案会带来宝石、进度和奖励，困难内容会再次进入复习。',['只有测验和测试中的错题才会出现在结果和笔记本中。','使用“更改语言”切换课程；每种语言分别保存进度。']]
    ]},
    it:{title:'Guida di gioco',subtitle:'Guida rapida al corso di {language}.',section:'Guida rapida',back:'Indietro',next:'Avanti',finish:'Entra nella miniera',skip:'Salta la guida',complete:'Guida completata. La miniera è pronta.',pages:[
      ['⛏️','Inizia a scavare','Tocca la roccia o Nuova domanda per iniziare {mine}.',['Scegli una risposta e poi controlla la correzione.','Ogni domanda completata salva i progressi di questa lingua.']],
      ['🔊','Usa la pronuncia quando vuoi','Le domande restano silenziose quando si aprono. Usa il pulsante audio facoltativo quando vuoi un suggerimento di pronuncia.',['La pronuncia corretta viene riprodotta dopo la valutazione.','Quiz, test di livello e guardiani seguono regole audio proprie.']],
      ['🗺️','Segui il Centro spedizioni','Apri il Centro spedizioni per vedere l’intero percorso del corso di {language}.',['Completa i punti di controllo per avanzare.','Supera ogni guardiano per sbloccare la miniera successiva.']],
      ['☰','Usa gli strumenti del giocatore','Il menu apre corsi, ripasso, vocabolario, taccuino, personaggio, negozio, impostazioni e vantaggi Patreon.',['Statistiche e calendario restano nell’intestazione.','Kōji, lo gnomo della miniera, consiglia cosa studiare.']],
      ['💎','Ripassa e continua a progredire','Le risposte corrette producono gemme, progressi e ricompense; il materiale difficile ritorna nel ripasso.',['Gli errori di quiz e test compaiono nei risultati e nel taccuino.','Cambia lingua permette di cambiare corso; ogni lingua conserva progressi separati.']]
    ]},
    fr:{title:'Guide du jeu',subtitle:'Guide rapide du cours de {language}.',section:'Démarrage rapide',back:'Retour',next:'Suivant',finish:'Entrer dans la mine',skip:'Ignorer le guide',complete:'Guide terminé. Votre mine est prête.',pages:[
      ['⛏️','Commencer à miner','Touchez le rocher ou Nouvelle question pour commencer {mine}.',['Choisissez une réponse, puis consultez la correction.','Chaque question répondue enregistre la progression de cette langue.']],
      ['🔊','Écouter la prononciation au besoin','Les questions restent silencieuses à leur ouverture. Utilisez le bouton audio facultatif lorsque vous souhaitez un indice de prononciation.',['La bonne prononciation est jouée après la correction.','Les quiz, tests de niveau et gardiens ont leurs propres règles audio.']],
      ['🗺️','Suivre le Centre d’expédition','Ouvrez le Centre d’expédition pour voir tout le parcours du cours de {language}.',['Terminez les étapes des leçons pour progresser.','Réussissez chaque gardien pour débloquer la mine suivante.']],
      ['☰','Utiliser les outils du joueur','Le menu ouvre les cours, révisions, vocabulaire, carnet, personnage, boutique, réglages et avantages Patreon.',['Les statistiques et le calendrier restent dans l’en-tête.','Kōji, le gnome de la mine, recommande la prochaine étude.']],
      ['💎','Réviser et progresser','Les bonnes réponses donnent des gemmes, de la progression et des récompenses; les difficultés reviennent en révision.',['Les erreurs des quiz et tests apparaissent dans les résultats et le carnet.','Changer de langue permet de changer de cours; chaque langue garde sa propre progression.']]
    ]},
    de:{title:'Spielanleitung',subtitle:'Kurzanleitung für den {language}-Kurs.',section:'Schnellstart',back:'Zurück',next:'Weiter',finish:'Mine betreten',skip:'Anleitung überspringen',complete:'Anleitung abgeschlossen. Deine Mine ist bereit.',pages:[
      ['⛏️','Mit dem Schürfen beginnen','Tippe auf den Felsen oder auf Neue Frage, um {mine} zu beginnen.',['Wähle eine Antwort und lies danach die Korrektur.','Jede beantwortete Frage speichert den Fortschritt dieser Sprache.']],
      ['🔊','Aussprache nur bei Bedarf hören','Neue Fragen bleiben beim Öffnen stumm. Nutze die optionale Audio-Schaltfläche nur, wenn du einen Aussprachehinweis möchtest.',['Die richtige Aussprache wird nach der Bewertung abgespielt.','Quizze, Einstufungstests und Wächterprüfungen haben eigene Audioregeln.']],
      ['🗺️','Dem Expeditionszentrum folgen','Öffne das Expeditionszentrum, um den vollständigen {language}-Kursweg zu sehen.',['Schließe Lektionen und Kontrollpunkte ab, um weiterzukommen.','Bestehe jeden Wächter, um die nächste Mine freizuschalten.']],
      ['☰','Spielerwerkzeuge verwenden','Das Menü öffnet Kurse, Wiederholung, Wörterbuch, Notizbuch, Charakter, Shop, Einstellungen und Patreon-Vorteile.',['Statistik und Kalender bleiben in der Kopfzeile.','Kōji, der Minengnom, empfiehlt den nächsten Lernschritt.']],
      ['💎','Wiederholen und weiterlernen','Richtige Antworten bringen Edelsteine, Fortschritt und Belohnungen; schwierige Inhalte kehren zur Wiederholung zurück.',['Fehler aus Quizzen und Tests erscheinen in den Ergebnissen und im Notizbuch.','Mit Sprache ändern wechselst du den Kurs; jede Sprache speichert ihren Fortschritt getrennt.']]
    ]}
  };
  const GUIDE_REVIEW_SKIP_TIPS={
    en:'Use Skip Lesson Review to enter a lesson without viewing every preview card.',
    es:'Usa Omitir repaso de la lección para entrar sin ver todas las tarjetas de vista previa.',
    ru:'Нажмите «Пропустить обзор урока», чтобы начать урок без просмотра всех карточек.',
    ja:'すべてのプレビューカードを見ずに始める場合は「レッスン復習をスキップ」を使います。',
    ko:'모든 미리보기 카드를 보지 않고 시작하려면 레슨 복습 건너뛰기를 사용하세요.',
    zh:'如果不想查看全部预览卡片，可使用“跳过课程复习”直接进入课程。',
    it:'Usa Salta ripasso della lezione per entrare senza vedere tutte le schede di anteprima.',
    fr:'Utilisez Ignorer la révision de la leçon pour commencer sans parcourir toutes les cartes d’aperçu.',
    de:'Mit Lektionswiederholung überspringen startest du, ohne alle Vorschaukarten anzusehen.'
  };
  const ADDITIONAL_PACKS=window.LANGUAGE_MINER_ADDITIONAL_LANGUAGE_PACKS||{};
  // Legal-readiness normalization: external frameworks and examinations are
  // curriculum reference points, not promises of certification or mastery.
  Object.values(ADDITIONAL_PACKS.languages||{}).forEach(language=>{
    language.path=String(language.path||'').replace(/(?:Alphabet Mine|Alphabet & Tones|Script|Cyrillic)(?: to| through)? (?:CEFR )?C2/i,'Foundation through advanced practice');
  });
  Object.values(ADDITIONAL_PACKS.expeditions||{}).forEach(route=>{
    route.forEach(level=>{if(!Array.isArray(level))return;level[0]=String(level[0]||'').replace(/CEFR C2 Summit/i,'C2-oriented Summit').replace(/Advanced Thai Summit/i,'Advanced-practice Summit');level[1]=String(level[1]||'').replace(/Complete [A-Za-z ()-]+ mastery/i,'Advanced practice milestone · not a proficiency certificate').replace(/Nuance, fluency, and advanced texts/i,'Nuance and advanced-text practice');});
  });
  Object.entries(ADDITIONAL_PACKS.levelLabels||{}).forEach(([language,levels])=>{ADDITIONAL_PACKS.levelLabels[language]=levels.map((label,index)=>index?String(label).replace(/^CEFR\s*/,'')+'-oriented':label);});
  Object.assign(LANGUAGES,ADDITIONAL_PACKS.languages||{});
  Object.assign(EXPEDITION_COURSES,ADDITIONAL_PACKS.expeditions||{});
  Object.assign(COURSE_LEVEL_LABELS,ADDITIONAL_PACKS.levelLabels||{});
  Object.assign(ALPHABET_SYSTEMS,ADDITIONAL_PACKS.alphabetSystems||{});
  FOUNDATION_CONCEPTS.forEach(concept=>{
    const forms=ADDITIONAL_PACKS.foundationForms?.[concept.id];
    if(forms)Object.assign(concept.forms,forms);
  });
  Object.entries(ADDITIONAL_PACKS.questionPromptTemplates||{}).forEach(([languageId,template])=>{
    QUESTION_PROMPTS[languageId]=(meaning,target)=>String(template).replace(/\{meaning\}/g,meaning).replace(/\{target\}/g,target);
  });
  Object.entries(ADDITIONAL_PACKS.alphabetPromptTemplates||{}).forEach(([languageId,template])=>{
    ALPHABET_PROMPTS[languageId]=(name,target)=>String(template).replace(/\{name\}/g,name).replace(/\{target\}/g,target);
  });
  Object.assign(POST_GUIDE_TRANSLATIONS,ADDITIONAL_PACKS.guides||{});
  Object.assign(GUIDE_REVIEW_SKIP_TIPS,ADDITIONAL_PACKS.guideTips||{});

  const STORAGE_PREFIX='lm_multilingual_functional_preview_v1:';
  const MULTILINGUAL_BOSS_QUESTION_TARGET=25;
  const MULTILINGUAL_BOSS_TIME_LIMIT_MS=5*60*1000;
  const MULTILINGUAL_BOSS_AUTO_ADVANCE_DELAY_MS=400;
  const MULTILINGUAL_BOSS_XP_REQUIREMENT=250;
  const MULTILINGUAL_ALPHABET_BOSS_MASTERY=20;
  const MULTILINGUAL_REVIEW_QUESTION_TARGET=25;
  const MULTILINGUAL_REVIEW_TIME_LIMIT_MS=2.5*60*1000;
  const MULTILINGUAL_REVIEW_PASS_SCORE=75;
  const MULTILINGUAL_REVIEW_AUTO_ADVANCE_DELAY_MS=400;
  const MULTILINGUAL_LESSON_MASTERY_REQUIREMENT=75;
  const MULTILINGUAL_PLACEMENT_REWARDS=[2500,15000,75000,375000];
  const MULTILINGUAL_REVIEW_REWARDS=[2500,5000,10000,20000,40000,80000,160000];
  const MULTILINGUAL_GUARDIAN_REWARDS=[25000,45000,65000,85000,105000,125000,145000];
  let known='en',learning='ja',step='languages',openedAutomatically=false,activePreviewQuestion=null,multilingualPlacement=null,postGuideIndex=0;
  let selectedCourseMine=0,selectedCourseSection='alphabet',selectedCourseLesson=0,multilingualBoss=null;
  let multilingualBossTimer=null,multilingualBossAutoAdvanceTimer=null;
  let multilingualReviewQuiz=null,multilingualReviewTimer=null,multilingualReviewAutoAdvanceTimer=null;
  const expandedCourseMines=new Set([0]);
  let overlay,content,title,copy,icon,indicator,changeButton,toast;

  function ui(key,values={}){return window.LanguageMinerI18n?.t?.(key,values)||String(key);}
  function courseAssessmentTime(value){const time=Math.round(Number(value)||0);return time>0?time:0;}
  function courseAssessmentTimeLabel(value){return window.japaneseMinerAssessmentTimeLabel?.(value)||`${Math.max(0,Number(value)||0)/1000}s`;}
  function courseAssessmentRecordMarkup(value,newRecord=false,label=ui('fastestSuccessfulCompletion')){const time=courseAssessmentTime(value);if(!time)return '';return `<div class="assessment-time-record ${newRecord?'new-record':''}"><span>${newRecord?`&#127942; ${escapeHtml(ui('newFastestTime'))}`:`&#9201;&#65039; ${escapeHtml(label)}`}</span><strong>${escapeHtml(courseAssessmentTimeLabel(time))}</strong><small>${escapeHtml(ui('savedToPlayerProfile'))}</small></div>`;}
  function targetName(id=learning){return LANGUAGES[id]?.native||LANGUAGES[id]?.name||id;}
  function coursePurpose(settings=currentSettings()){return settings?.purposes?.[learning]==='travel'?'travel':'full';}
  function travelCourseActive(settings=currentSettings()){return coursePurpose(settings)==='travel';}
  function fullJapaneseCourse(settings=currentSettings()){return learning==='ja'&&!travelCourseActive(settings);}
  function coursePath(){
    if(travelCourseActive())return window.LanguageMinerI18n?.translate?.('Travel & common phrases')||'Travel & common phrases';
    if(learning==='ru')return ui('cyrillicPath');
    if(learning==='ja')return ui('hiraganaPath');
    if(learning==='ko')return ui('hangulPath');
    if(learning==='zh')return ui('pinyinPath');
    if(learning==='fr')return ui('frenchPath');
    return ui('alphabetMine');
  }
  function sectionKey(section){return section==='sentences'?'sentences':section;}
  function sectionLabel(section){return section==='travel'?(window.LanguageMinerI18n?.translate?.('Travel & common phrases')||'Travel & common phrases'):ui(sectionKey(section));}

  function accountKey(){
    const profile=window.japaneseMinerActiveProfile?.();
    if(profile?.cloudUserId)return `cloud:${profile.cloudUserId}`;
    const cloudId=window.languageMinerCloudAuth?.getSession?.()?.user?.id;
    if(cloudId)return `cloud:${cloudId}`;
    const player=profile?.name||document.getElementById('activePlayerName')?.textContent?.trim();
    return `local:${player&&player!=='Not signed in'?player:'preview-player'}`;
  }
  function readSettingsFor(targetAccountKey=accountKey()){
    try{
      let raw=localStorage.getItem(STORAGE_PREFIX+targetAccountKey);
      if(!raw&&targetAccountKey===accountKey()){
        const profile=window.japaneseMinerActiveProfile?.(),player=profile?.name||document.getElementById('activePlayerName')?.textContent?.trim(),fallbacks=[player&&player!=='Not signed in'?`local:${player}`:'',window.languageMinerCloudAuth?.getSession?.()?.user?.id?`cloud:${window.languageMinerCloudAuth.getSession().user.id}`:''].filter(Boolean);
        for(const fallback of fallbacks){if(fallback===targetAccountKey)continue;raw=localStorage.getItem(STORAGE_PREFIX+fallback);if(raw){localStorage.setItem(STORAGE_PREFIX+targetAccountKey,raw);break;}}
      }
      return JSON.parse(raw||'null')||{known:'en',learning:'ja',placements:{}};
    }catch{return {known:'en',learning:'ja',placements:{}};}
  }
  function saveSettingsFor(targetAccountKey,next){try{localStorage.setItem(STORAGE_PREFIX+targetAccountKey,JSON.stringify(next));}catch{}}
  function normalizeSettings(saved){saved=saved&&typeof saved==='object'?saved:{};saved.known=LANGUAGES[saved.known]?saved.known:'en';saved.learning=LANGUAGES[saved.learning]?saved.learning:'ja';saved.placements=saved.placements&&typeof saved.placements==='object'?saved.placements:{};saved.purposes=saved.purposes&&typeof saved.purposes==='object'&&!Array.isArray(saved.purposes)?saved.purposes:{};saved.progress=saved.progress&&typeof saved.progress==='object'?saved.progress:{};saved.guides=saved.guides&&typeof saved.guides==='object'?saved.guides:{};Object.keys(saved.purposes).forEach(id=>saved.purposes[id]=saved.purposes[id]==='travel'?'travel':'full');Object.values(saved.placements).forEach(record=>{if(record&&typeof record==='object'){record.elapsedTimeMs=courseAssessmentTime(record.elapsedTimeMs);record.fastestTimeMs=courseAssessmentTime(record.fastestTimeMs||record.elapsedTimeMs);}});Object.values(saved.progress).forEach(progress=>{if(!progress||typeof progress!=='object')return;progress.bossFastestByMine=progress.bossFastestByMine&&typeof progress.bossFastestByMine==='object'&&!Array.isArray(progress.bossFastestByMine)?progress.bossFastestByMine:{};Object.keys(progress.bossFastestByMine).forEach(mine=>{const time=courseAssessmentTime(progress.bossFastestByMine[mine]);if(time)progress.bossFastestByMine[mine]=time;else delete progress.bossFastestByMine[mine];});Object.values(progress.reviewCheckpoints||{}).forEach(record=>{if(record&&typeof record==='object')record.fastestTimeMs=courseAssessmentTime(record.fastestTimeMs);});});return saved;}
  function readSettings(){return readSettingsFor(accountKey());}
  function saveSettings(next){saveSettingsFor(accountKey(),next);window.dispatchEvent(new CustomEvent('lm-course-settings-saved'));}
  function currentSettings(){return normalizeSettings(readSettings());}
  function signedIn(){
    const auth=document.getElementById('authOverlay'),player=document.getElementById('activePlayerName')?.textContent?.trim();
    const authHidden=!auth||auth.hidden||auth.classList.contains('hidden')||auth.classList.contains('auth-dismissed')||getComputedStyle(auth).display==='none';
    return authHidden&&player&&player!=='Not signed in';
  }
  function languageSelectOptions(selected,disabledId=''){
    const placeholder=selected?'':`<option value="" selected disabled>${escapeHtml(ui('selectLanguage'))}</option>`;
    return `${placeholder}${Object.entries(LANGUAGES).map(([id,language])=>{
      const disabled=id===disabledId;
      return `<option value="${id}" ${selected===id?'selected':''} ${disabled?'disabled':''}>${language.flag} ${escapeHtml(language.native)} — ${escapeHtml(language.name)}${disabled?` · ${escapeHtml(ui('alreadyKnown'))}`:''}</option>`;
    }).join('')}`;
  }
  function progress(index){document.querySelectorAll('.lm-flow-progress i').forEach((bar,i)=>bar.classList.toggle('active',i<=index));}
  function setHead(nextIcon,nextTitle,nextCopy){icon.textContent=nextIcon;title.textContent=nextTitle;copy.textContent=nextCopy;}
  function renderLanguages(){
    window.LanguageMinerI18n?.setLocale?.(known,{known,learning});
    step='languages';progress(0);setHead('🌐','Language Miner','');
    content.innerHTML=`<section class="lm-flow-screen lm-language-dropdown-screen"><div class="lm-choice-block lm-language-dropdown-block"><div class="lm-language-step"><span>1</span><div><h3>${escapeHtml(ui('knownQuestion'))}</h3><p>${escapeHtml(ui('knownHelp'))}</p></div></div><div class="lm-language-select-wrap"><select id="lmKnownLanguageSelect" name="lm-known" aria-label="${escapeHtml(ui('knownQuestion'))}">${languageSelectOptions(known)}</select><span aria-hidden="true">▼</span></div></div><div class="lm-choice-block lm-language-dropdown-block"><div class="lm-language-step"><span>2</span><div><h3>${escapeHtml(ui('learningQuestion'))}</h3><p>${escapeHtml(ui('learningHelp'))}</p></div></div><div class="lm-language-select-wrap"><select id="lmLearningLanguageSelect" name="lm-learning" aria-label="${escapeHtml(ui('learningQuestion'))}">${languageSelectOptions(learning,known)}</select><span aria-hidden="true">▼</span></div></div><div class="lm-flow-note">${escapeHtml(ui('oneEach'))}</div><div class="lm-flow-actions"><button id="lmContinuePlacement" class="lm-flow-primary" type="button" ${known&&learning&&known!==learning?'':'disabled'}>${escapeHtml(ui('continuePlacement'))}</button></div></section>`;
    document.getElementById('lmKnownLanguageSelect')?.addEventListener('change',event=>{known=event.target.value;window.LanguageMinerI18n?.setLocale?.(known,{known,learning});if(learning===known)learning='';renderLanguages();});
    document.getElementById('lmLearningLanguageSelect')?.addEventListener('change',event=>{learning=event.target.value;renderLanguages();});
    document.getElementById('lmContinuePlacement')?.addEventListener('click',renderPlacement);
  }
  function originalJapanesePlacementComplete(){return learning==='ja'&&window.placementTestAlreadyCompleted?.()===true;}
  function persistPair(placementValue,purposeValue){const settings=currentSettings();settings.known=known;settings.learning=learning;if(placementValue)settings.placements[learning]=placementValue;if(purposeValue)settings.purposes[learning]=purposeValue==='travel'?'travel':'full';saveSettings(settings);applyCourse(settings);}
  function postGuideText(value){
    const target=LANGUAGES[learning];return String(value).replaceAll('{language}',target.native).replaceAll('{mine}',target.mine);
  }
  function renderPostPlacementGuide(){
    const guide=POST_GUIDE_TRANSLATIONS[known]||POST_GUIDE_TRANSLATIONS.en,page=guide.pages[postGuideIndex],target=LANGUAGES[learning],last=postGuideIndex===guide.pages.length-1;
    const tips=page[3].concat(postGuideIndex===2?[GUIDE_REVIEW_SKIP_TIPS[known]||GUIDE_REVIEW_SKIP_TIPS.en]:[]);
    step='post-guide';progress(2);setHead('📘',guide.title,postGuideText(guide.subtitle));
    content.innerHTML=`<section class="lm-post-guide"><div class="lm-guide-pair">${LANGUAGES[known].flag} ${escapeHtml(LANGUAGES[known].native)} <strong>→</strong> ${target.flag} ${escapeHtml(target.native)}</div><div class="lm-post-guide-count"><span>${escapeHtml(guide.section)}</span><strong>${postGuideIndex+1}/${guide.pages.length}</strong></div><div class="lm-placement-meter"><i style="width:${(postGuideIndex+1)/guide.pages.length*100}%"></i></div><article class="lm-post-guide-page"><span class="lm-post-guide-icon">${page[0]}</span><div><h3>${escapeHtml(postGuideText(page[1]))}</h3><p>${escapeHtml(postGuideText(page[2]))}</p><ul>${tips.map(tip=>`<li>${escapeHtml(postGuideText(tip))}</li>`).join('')}</ul></div></article><div class="lm-flow-actions"><button id="lmPostGuideSkip" class="lm-flow-secondary" type="button">${escapeHtml(guide.skip)}</button><button id="lmPostGuideBack" class="lm-flow-secondary" type="button" ${postGuideIndex===0?'disabled':''}>${escapeHtml(guide.back)}</button><button id="lmPostGuideNext" class="lm-flow-primary" type="button">${escapeHtml(last?guide.finish:guide.next)}</button></div></section>`;
    document.getElementById('lmPostGuideSkip').addEventListener('click',completePostPlacementGuide);document.getElementById('lmPostGuideBack').addEventListener('click',()=>{if(postGuideIndex>0){postGuideIndex--;renderPostPlacementGuide();}});document.getElementById('lmPostGuideNext').addEventListener('click',()=>{if(last)completePostPlacementGuide();else{postGuideIndex++;renderPostPlacementGuide();}});
  }
  function openPostPlacementGuide(force=false){
    if(overlay.classList.contains('open')&&step==='post-guide')return;
    const v6Guide=document.querySelector('#v6TourOverlay.open [data-v6-close="tour"]');v6Guide?.click();
    const settings=currentSettings(),guideKey=`${known}:${learning}`;if(!force&&settings.guides[guideKey]===true){finishFlow(`${LANGUAGES[learning].name} course ready.`);return;}
    postGuideIndex=0;overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');renderPostPlacementGuide();
  }
  function completePostPlacementGuide(){
    const guide=POST_GUIDE_TRANSLATIONS[known]||POST_GUIDE_TRANSLATIONS.en,settings=currentSettings();settings.guides[`${known}:${learning}`]=true;saveSettings(settings);finishFlow(guide.complete);
  }
  function placementRecordComplete(record){return record==='tested'||!!(record&&typeof record==='object'&&record.status==='tested');}
  function placementRecordBeginner(record){return record==='beginner'||!!(record&&typeof record==='object'&&record.status==='beginner');}
  function hideOriginalJapanesePlacementForOtherCourses(){
    if(fullJapaneseCourse())return;
    const japanesePlacement=document.getElementById('placementOverlay');
    if(!japanesePlacement)return;
    japanesePlacement.classList.remove('open');japanesePlacement.setAttribute('aria-hidden','true');window.syncJapaneseMinerPageScroll?.();
  }
  function renderPlacement(){
    step='placement';progress(1);
    const target=LANGUAGES[learning],settings=currentSettings(),placement=settings.placements[learning],tested=placementRecordComplete(placement)||originalJapanesePlacementComplete(),beginner=placementRecordBeginner(placement),travel=travelCourseActive(settings),score=placement&&typeof placement==='object'?Number(placement.score):null,fastest=placement&&typeof placement==='object'?courseAssessmentTime(placement.fastestTimeMs):0;
    hideOriginalJapanesePlacementForOtherCourses();
    setHead('📝',ui('chooseStart'),ui('choiceStored',{language:targetName()}));
    content.innerHTML=`<section class="lm-flow-screen"><div class="lm-placement-status">${escapeHtml(travel?'Travel & common phrases selected':tested?`${ui('placementCompleted')}${Number.isFinite(score)?` · ${score}/10`:''}${fastest?` · ${ui('recordTime',{time:courseAssessmentTimeLabel(fastest)})}`:''}`:beginner?ui('beginnerSaved'):ui('testAvailable'))}</div><div class="lm-placement-options"><article class="lm-placement-option"><span class="lm-big-icon">🌱</span><h3>${escapeHtml(ui('newToLanguage',{language:targetName()}))}</h3><p>${escapeHtml(ui('newHelp',{language:targetName()}))}</p><button id="lmSkipPlacement" class="lm-flow-secondary lm-flow-skip" type="button" ${tested?'disabled':''}>${escapeHtml(ui('skipTest'))}</button></article><article class="lm-placement-option"><span class="lm-big-icon">🧭</span><h3>${escapeHtml(ui('knowSomeLanguage',{language:targetName()}))}</h3><p>${escapeHtml(ui('knowSomeHelp',{language:targetName()}))}</p><button id="lmStartPlacement" class="lm-flow-primary" type="button" ${tested?'disabled':''}>${escapeHtml(tested?ui('placementComplete'):ui('startTest',{language:targetName()}))}</button></article><article class="lm-placement-option lm-travel-placement-option"><span class="lm-big-icon">🧳</span><h3>Travel & common phrases</h3><p>Use the game only for greetings, directions, dining, shopping, health, and hotels—without taking the full language course.</p><button id="lmChooseTravel" class="lm-flow-primary" type="button">${travel?'Continue travel course':'Choose travel course'}</button></article></div><div class="lm-flow-note">${escapeHtml(ui('oneAttemptNote'))}</div><div class="lm-flow-actions"><button id="lmPlacementBack" class="lm-flow-secondary" type="button">${escapeHtml(ui('backToLanguages'))}</button>${tested||travel?`<button id="lmEnterCurrentCourse" class="lm-flow-primary" type="button">${travel?'Open travel course':escapeHtml(ui('continueGuide'))}</button>`:''}</div></section>`;
    document.getElementById('lmPlacementBack').addEventListener('click',renderLanguages);document.getElementById('lmSkipPlacement')?.addEventListener('click',skipPlacement);document.getElementById('lmStartPlacement')?.addEventListener('click',startPlacement);document.getElementById('lmChooseTravel')?.addEventListener('click',chooseTravelCourse);document.getElementById('lmEnterCurrentCourse')?.addEventListener('click',travel?chooseTravelCourse:openPostPlacementGuide);
  }
  function multilingualPlacementQuestion(concept,targetId,knownId){
    const answer=concept.forms[targetId],meaning=concept.forms[knownId],options=[answer];
    for(const candidate of shuffled(FOUNDATION_CONCEPTS)){const value=candidate.forms[targetId];if(!options.includes(value))options.push(value);if(options.length===4)break;}
    return {concept,answer,meaning,options:shuffled(options)};
  }
  function beginMultilingualPlacement(){
    const settings=currentSettings();
    if(placementRecordComplete(settings.placements[learning])){renderPlacement();return;}
    multilingualPlacement={learning,known,index:0,correct:0,answered:false,startedAt:Date.now(),questions:shuffled(FOUNDATION_CONCEPTS).map(concept=>multilingualPlacementQuestion(concept,learning,known))};
    renderMultilingualPlacementQuestion();
  }
  function renderMultilingualPlacementQuestion(){
    const session=multilingualPlacement;if(!session)return renderPlacement();
    const target=LANGUAGES[session.learning],question=session.questions[session.index],number=session.index+1,total=session.questions.length,prompt=(QUESTION_PROMPTS[session.known]||QUESTION_PROMPTS.en)(question.meaning,targetName(session.learning));
    step='placement-test';progress(1);setHead('🧭',ui('placement',{language:targetName(session.learning)}),ui('placementQuestionCopy',{number,total,language:targetName(session.learning)}));
    content.innerHTML=`<section class="lm-placement-test-shell"><div class="lm-placement-test-top"><span>${target.flag} ${escapeHtml(ui('placementLabel',{language:targetName(session.learning)}))}</span><strong>${number}/${total}</strong></div><div class="lm-placement-meter"><i style="width:${(session.index/total)*100}%"></i></div><article class="lm-placement-question"><div class="lm-question-kicker">${escapeHtml(ui('foundationPlacement',{language:targetName(session.learning)}))}</div><h3>${escapeHtml(prompt)}</h3><button id="lmPlacementSpeak" class="lm-speak-button" type="button">🔊 ${escapeHtml(ui('hearQuestion',{language:targetName(session.known)}))}</button><div class="lm-answer-grid" data-lm-no-interface-translate>${question.options.map((option,index)=>`<button type="button" data-lm-placement-option="${index}">${escapeHtml(option)}</button>`).join('')}</div><div id="lmPlacementFeedback" class="lm-course-feedback" aria-live="polite"></div><button id="lmPlacementNext" class="lm-next-course-question" type="button" hidden>${escapeHtml(ui(number===total?'seePlacementResult':'nextQuestion'))}</button></article><div class="lm-flow-note">${escapeHtml(ui('oneTimeTest',{language:targetName(session.learning)}))}</div></section>`;
    document.getElementById('lmPlacementSpeak')?.addEventListener('click',()=>speakLanguage(prompt,session.known));content.querySelectorAll('[data-lm-placement-option]').forEach(button=>button.addEventListener('click',()=>answerMultilingualPlacement(button)));document.getElementById('lmPlacementNext')?.addEventListener('click',advanceMultilingualPlacement);
  }
  function answerMultilingualPlacement(button){
    const session=multilingualPlacement;if(!session||session.answered)return;
    const question=session.questions[session.index],selected=question.options[Number(button.dataset.lmPlacementOption)],correct=selected===question.answer;session.answered=true;if(correct)session.correct++;
    content.querySelectorAll('[data-lm-placement-option]').forEach(option=>{option.disabled=true;const value=question.options[Number(option.dataset.lmPlacementOption)];if(value===question.answer)option.classList.add('correct');else if(option===button)option.classList.add('wrong');});
    const feedback=document.getElementById('lmPlacementFeedback');if(feedback){feedback.className=`lm-course-feedback ${correct?'correct':'wrong'}`;feedback.innerHTML=correct?`✓ ${escapeHtml(ui('correct'))} — <strong>${escapeHtml(question.answer)}</strong>`:escapeHtml(ui('correctAnswerIs',{answer:question.answer}));}
    document.getElementById('lmPlacementNext').hidden=false;speakTarget(question.answer);
  }
  function advanceMultilingualPlacement(){
    const session=multilingualPlacement;if(!session||!session.answered)return;
    if(session.index>=session.questions.length-1){finishMultilingualPlacement();return;}
    session.index++;session.answered=false;renderMultilingualPlacementQuestion();
  }
  function finishMultilingualPlacement(){
    const session=multilingualPlacement;if(!session)return;
    const target=LANGUAGES[session.learning],score=session.correct,total=session.questions.length,completedAt=Date.now(),elapsedTimeMs=Math.max(1,completedAt-Number(session.startedAt||completedAt));
    const lesson=score<=3?1:score<=6?2:score<=8?3:4,band={xp:(lesson-1)*25,label:ui('lesson',{number:lesson}),title:ui('recommendedStart',{language:targetName(session.learning),lesson}),copy:ui('resultCopy')};
    const settings=currentSettings(),previousPlacement=settings.placements[session.learning]&&typeof settings.placements[session.learning]==='object'?settings.placements[session.learning]:{},rewardEligible=previousPlacement.status!=='tested'&&!previousPlacement.rewardClaimedAt,rewardRequested=MULTILINGUAL_PLACEMENT_REWARDS[Math.max(0,Math.min(MULTILINGUAL_PLACEMENT_REWARDS.length-1,lesson-1))],placementReward=rewardEligible?Number(window.LanguageMinerEconomy?.grantNuggets?.(rewardRequested,Math.max(0,lesson-1),`${targetName(session.learning)} placement reward`)||0):0;settings.placements[session.learning]={status:'tested',score,total,recommendedXp:band.xp,completedAt,elapsedTimeMs,fastestTimeMs:elapsedTimeMs,rewardNuggets:placementReward||Number(previousPlacement.rewardNuggets)||0,rewardClaimedAt:placementReward?completedAt:Number(previousPlacement.rewardClaimedAt)||0};settings.purposes[session.learning]='full';const savedProgress=settings.progress[session.learning]||{answered:0,correct:0,xp:0};savedProgress.xp=Math.max(Number(savedProgress.xp)||0,band.xp);settings.progress[session.learning]=savedProgress;settings.known=session.known;settings.learning=session.learning;saveSettings(settings);applyCourse(settings);multilingualPlacement=null;
    setHead('🎯',ui('placementResult',{language:targetName(session.learning)}),ui('placementScore',{score,total,language:targetName(session.learning)}));
    content.innerHTML=`<section class="lm-placement-result"><span>${target.flag} ${escapeHtml(ui('placementResult',{language:targetName(session.learning)}))}</span><strong>${score}/${total}</strong>${courseAssessmentRecordMarkup(elapsedTimeMs,true,ui('placementTestRecord'))}${placementReward?`<div class="lm-course-reward">🪙 +${placementReward.toLocaleString()} Nuggets</div>`:''}<h3>${escapeHtml(band.title)}</h3><p>${escapeHtml(band.copy)}</p><div class="lm-placement-recommendation">${escapeHtml(ui('recommendedStartingPoint',{value:band.label}))}</div><div class="lm-flow-actions"><button id="lmFinishPlacement" class="lm-flow-primary" type="button">${escapeHtml(ui('continueGuide'))}</button></div></section>`;
    document.getElementById('lmFinishPlacement').addEventListener('click',openPostPlacementGuide);
  }
  function skipPlacement(){persistPair('beginner','full');hideOriginalJapanesePlacementForOtherCourses();if(learning==='ja'){closeFlow();if(window.openPlacementOnboarding?.(true))window.chooseBrandNew?.();return;}openPostPlacementGuide();}
  function startPlacement(){persistPair(null,'full');if(learning==='ja'){closeFlow();if(window.openPlacementOnboarding?.(true))window.startPlacementTest?.();return;}hideOriginalJapanesePlacementForOtherCourses();beginMultilingualPlacement();}
  function chooseTravelCourse(){const now=Date.now();persistPair({status:'travel',completedAt:now},'travel');selectedCourseMine=0;selectedCourseSection='travel';selectedCourseLesson=0;activePreviewQuestion=null;const progress=languageProgress();progress.selectedMine=0;progress.selectedSection='travel';progress.selectedLesson=0;saveLanguageProgress(progress);closeFlow();renderCourseQuestion('travel',0);showToast(`${targetName()} travel & common phrases course ready.`);}
  function finishFlow(message){persistPair();closeFlow();showToast(message);}
  function escapeHtml(value){return String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));}
  function shuffled(values){const copy=[...values];for(let index=copy.length-1;index>0;index--){const swap=Math.floor(Math.random()*(index+1));[copy[index],copy[swap]]=[copy[swap],copy[index]];}return copy;}
  function languageProgress(){const settings=currentSettings();return settings.progress[learning]||{answered:0,correct:0,xp:0};}
  function saveLanguageProgress(progress){const settings=currentSettings();settings.progress[learning]=progress;saveSettings(settings);}
  function courseMineXp(mineIndex,progress=languageProgress()){return Math.max(0,Number(progress.mineXpByMine?.[Number(mineIndex)])||0);}
  function courseBossDefeated(mineIndex,progress=languageProgress()){return progress.bossDefeatedByMine?.[Number(mineIndex)]===true||Number(progress.bossBestByMine?.[Number(mineIndex)])===100;}
  function courseBossUnlocked(mineIndex,progress=languageProgress()){
    mineIndex=Number(mineIndex)||0;
    if(!courseMineUnlocked(mineIndex,progress)||courseMineXp(mineIndex,progress)<MULTILINGUAL_BOSS_XP_REQUIREMENT)return false;
    if(mineIndex!==0)return true;
    const lessons=courseSectionLessons('alphabet',0);
    return lessons.length>0&&lessons.every((_,index)=>courseLessonMastery('alphabet',index,0)>=MULTILINGUAL_ALPHABET_BOSS_MASTERY);
  }
  function courseBossRequirement(mineIndex){
    const progress=languageProgress(),xp=Math.min(MULTILINGUAL_BOSS_XP_REQUIREMENT,courseMineXp(mineIndex,progress));
    if(Number(mineIndex)===0){
      const lessons=courseSectionLessons('alphabet',0),ready=lessons.filter((_,index)=>courseLessonMastery('alphabet',index,0)>=MULTILINGUAL_ALPHABET_BOSS_MASTERY).length;
      return ui('bossAlphabetRequirement',{ready,total:lessons.length,xp,needed:MULTILINGUAL_BOSS_XP_REQUIREMENT});
    }
    return ui('bossXpRequirement',{xp,needed:MULTILINGUAL_BOSS_XP_REQUIREMENT});
  }
  function courseReviewKey(mineIndex,section,evenLesson){return `${Number(mineIndex)}:${String(section)}:${Number(evenLesson)}`;}
  function courseReviewResult(mineIndex,section,evenLesson,progress=languageProgress()){return progress.reviewCheckpoints?.[courseReviewKey(mineIndex,section,evenLesson)]||{best:0,passed:false};}
  function courseReviewPassed(mineIndex,section,evenLesson,progress=languageProgress()){return courseReviewResult(mineIndex,section,evenLesson,progress).passed===true;}
  function courseReviewAvailable(mineIndex,section,evenLesson){
    const lessons=courseSectionLessons(section,mineIndex),first=Number(evenLesson)-2,second=Number(evenLesson)-1;
    return courseMineUnlocked(mineIndex)&&evenLesson>=2&&evenLesson%2===0&&!!lessons[first]&&!!lessons[second]&&courseLessonUnlocked(section,first,mineIndex)&&courseLessonUnlocked(section,second,mineIndex)&&courseLessonMastery(section,first,mineIndex)>=MULTILINGUAL_LESSON_MASTERY_REQUIREMENT&&courseLessonMastery(section,second,mineIndex)>=MULTILINGUAL_LESSON_MASTERY_REQUIREMENT;
  }
  function courseLessonUnlocked(section,lesson,mineIndex=selectedCourseMine){
    lesson=Number(lesson)||0;mineIndex=Number(mineIndex)||0;if(!courseMineUnlocked(mineIndex))return false;if(lesson<=0)return true;
    if(!courseLessonUnlocked(section,lesson-1,mineIndex))return false;
    const requirement=section==='alphabet'?MULTILINGUAL_ALPHABET_BOSS_MASTERY:MULTILINGUAL_LESSON_MASTERY_REQUIREMENT;
    if(courseLessonMastery(section,lesson-1,mineIndex)<requirement)return false;
    return section==='alphabet'||lesson%2!==0||courseReviewPassed(mineIndex,section,lesson);
  }
  function multilingualCourseData(){return window.LANGUAGE_MINER_MULTILINGUAL_COURSE_DATA||{vocabulary:[],grammar:[],sentences:[]};}
  function splitEvenly(values,count=4){
    const result=[],base=Math.floor(values.length/count),extra=values.length%count;let offset=0;
    for(let index=0;index<count;index++){const size=base+(index<extra?1:0);result.push(values.slice(offset,offset+size));offset+=size;}
    return result;
  }
  function courseSectionLessonsFor(languageId,section,mineIndex=selectedCourseMine){
    mineIndex=Number(mineIndex);const data=multilingualCourseData();
    if(section==='travel'){const phrases=data.sentences.filter(item=>[1,2,3,4,7,11].includes(Number(item.topic))),result=[];if(mineIndex!==0)return result;for(let offset=0;offset<phrases.length;offset+=10)result.push(phrases.slice(offset,offset+10));return result;}
    if(section==='alphabet')return mineIndex===0?splitEvenly(ALPHABET_SYSTEMS[languageId]?.units||[],4):[];
    const source=section==='vocabulary'?data.vocabulary:section==='grammar'?data.grammar:section==='sentences'?data.sentences:[];
    if(!source.length||mineIndex===0)return section==='boss'?[[]]:[];
    const stageItems=splitEvenly(source,6)[Math.max(0,Math.min(5,mineIndex-1))]||[],size=section==='vocabulary'?25:10,result=[];
    for(let offset=0;offset<stageItems.length;offset+=size)result.push(stageItems.slice(offset,offset+size));
    return result;
  }
  function courseSectionLessons(section){return courseSectionLessonsFor(learning,section,arguments.length>1?Number(arguments[1]):selectedCourseMine);}
  function courseMasteryId(section,item){return `${section}:${item?.id??item?.symbol??''}`;}
  function courseMasteryValue(section,item,progress=languageProgress()){return Math.max(0,Math.min(100,Number(progress.courseMastery?.[courseMasteryId(section,item)])||0));}
  function courseLessonMastery(section,lesson,mineIndex=selectedCourseMine){
    if(section==='boss')return Number(languageProgress().bossBestByMine?.[mineIndex])||0;
    const items=courseSectionLessons(section,mineIndex)[Number(lesson)]||[];if(!items.length)return 0;
    return Math.round(items.reduce((sum,item)=>sum+courseMasteryValue(section,item),0)/items.length);
  }
  function courseSectionMastery(section,mineIndex=selectedCourseMine){
    const lessons=courseSectionLessons(section,mineIndex);if(!lessons.length)return 0;
    return Math.round(lessons.reduce((sum,_,index)=>sum+courseLessonMastery(section,index,mineIndex),0)/lessons.length);
  }
  function courseMineSections(mineIndex){if(travelCourseActive())return Number(mineIndex)===0?['travel']:[];return Number(mineIndex)===0?['alphabet','travel','boss']:['vocabulary','grammar','sentences','boss'];}
  function courseMineMastery(mineIndex){const sections=courseMineSections(mineIndex);return Math.round(sections.reduce((sum,section)=>sum+courseSectionMastery(section,mineIndex),0)/sections.length);}
  function courseMineUnlocked(mineIndex,progress=languageProgress()){return Number(mineIndex)===0||courseBossDefeated(Number(mineIndex)-1,progress);}
  function recordCourseMastery(question,correct){
    if(question?.mode==='boss')return;
    const progress=languageProgress();progress.courseMastery=progress.courseMastery&&typeof progress.courseMastery==='object'?progress.courseMastery:{};
    const id=courseMasteryId(question.sourceSection||question.mode,question.item);progress.courseMastery[id]=Math.min(100,Math.max(0,(Number(progress.courseMastery[id])||0)+(correct?25:-5)));
    const xpGain=correct?10:0;progress.mineXpByMine=progress.mineXpByMine&&typeof progress.mineXpByMine==='object'?progress.mineXpByMine:{};progress.mineXpByMine[selectedCourseMine]=Number(progress.mineXpByMine[selectedCourseMine]||0)+xpGain;
    progress.answered=Number(progress.answered||0)+1;progress.correct=Number(progress.correct||0)+(correct?1:0);progress.xp=Number(progress.xp||0)+xpGain;saveLanguageProgress(progress);const economy=window.LanguageMinerEconomy?.recordCourseAnswer?.({correct,stage:selectedCourseMine,review:false,deferTreasure:false})||null;updateFoundationProgress();return economy;
  }
  function updateFoundationProgress(){
    if(fullJapaneseCourse())return;
    const progress=languageProgress(),xpNeed=100,xp=Math.min(xpNeed,courseMineMastery(selectedCourseMine));
    const xpText=document.getElementById('xp'),needText=document.getElementById('xpNeed'),bar=document.getElementById('xpBar');
    if(xpText)xpText.textContent=String(xp);if(needText)needText.textContent=String(xpNeed);if(bar)bar.style.width=`${xp}%`;
    const levelLabel=COURSE_LEVEL_LABELS[learning]?.[selectedCourseMine]||`${ui('level')} ${selectedCourseMine+1}`,label=travelCourseActive()?`${targetName()} · Travel & common phrases`:`${targetName()} · ${levelLabel}`;
    const stage=document.getElementById('stageName'),quickStage=document.getElementById('quickStage');if(stage)stage.textContent=label;if(quickStage)quickStage.textContent=label;
  }
  function speakLanguage(text,languageId){
    if(!text)return false;const language=(LANGUAGES[languageId]||LANGUAGES.en).voice;if(window.LanguageMinerSpeech?.speak)return window.LanguageMinerSpeech.speak(text,language,.82);if(!('speechSynthesis'in window))return false;speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(text);utterance.lang=language;utterance.rate=.82;speechSynthesis.speak(utterance);return true;
  }
  function speakTarget(text){speakLanguage(text,learning);}
  window.LanguageMinerCourseVoice=Object.freeze({test:()=>{speakTarget(FOUNDATION_CONCEPTS[0].forms[learning]);return true;},currentLanguage:()=>learning});
  function makeFoundationQuestion(){
    const concept=shuffled(FOUNDATION_CONCEPTS.filter(item=>item.id!==activePreviewQuestion?.concept?.id))[0]||FOUNDATION_CONCEPTS[0];
    const answer=concept.forms[learning],meaning=concept.forms[known],options=[answer];
    for(const item of shuffled(FOUNDATION_CONCEPTS)){const value=item.forms[learning];if(!options.includes(value))options.push(value);if(options.length===4)break;}
    return {concept,answer,meaning,options:shuffled(options)};
  }
  function makeAlphabetQuestion(lesson=selectedCourseLesson){
    const system=ALPHABET_SYSTEMS[learning],units=courseSectionLessons('alphabet',selectedCourseMine)[Number(lesson)]||system.units,previous=activePreviewQuestion?.unit?.symbol;
    const unit=shuffled(units.filter(item=>item.symbol!==previous))[0]||units[0],options=[unit.symbol];
    for(const item of shuffled(units.length>=4?units:system.units)){if(!options.includes(item.symbol))options.push(item.symbol);if(options.length===4)break;}
    return {mode:'alphabet',sourceSection:'alphabet',item:unit,unit,answer:unit.symbol,label:unit.name,spoken:unit.spoken,options:shuffled(options)};
  }
  function makeMeaningQuestion(section,lesson=selectedCourseLesson){
    const sourceSection=section==='boss'?shuffled(['vocabulary','grammar','sentences'])[0]:section;
    const lessons=courseSectionLessons(sourceSection,selectedCourseMine),items=section==='boss'?lessons.flat():lessons[Number(lesson)]||[],previous=activePreviewQuestion?.item?.id;
    const item=shuffled(items.filter(candidate=>candidate.id!==previous))[0]||items[0],answer=item?.forms?.[learning],meaning=item?.forms?.[known],options=[answer];
    for(const candidate of shuffled(items)){const value=candidate.forms?.[learning];if(value&&!options.includes(value))options.push(value);if(options.length===4)break;}
    if(options.length<4){for(const candidate of shuffled(lessons.flat())){const value=candidate.forms?.[learning];if(value&&!options.includes(value))options.push(value);if(options.length===4)break;}}
    return {mode:section,sourceSection,item,answer,meaning,label:meaning,spoken:answer,options:shuffled(options)};
  }
  function courseBossOptions(answer,values){
    const options=[String(answer)];
    for(const value of shuffled(values)){const text=String(value??'');if(text&&!options.includes(text))options.push(text);if(options.length===4)break;}
    return shuffled(options);
  }
  function buildCourseBossDeck(mineIndex){
    const pool=[];
    if(Number(mineIndex)===0){
      const units=ALPHABET_SYSTEMS[learning]?.units||[],symbols=units.map(unit=>unit.symbol),names=units.map(unit=>unit.name);
      units.forEach(unit=>{
        pool.push({id:`alphabet:${unit.symbol}:recognition`,mode:'boss',sourceSection:'alphabet',item:unit,answer:unit.symbol,spoken:unit.spoken,prompt:(ALPHABET_PROMPTS[known]||ALPHABET_PROMPTS.en)(unit.name,targetName()),options:courseBossOptions(unit.symbol,symbols)});
        pool.push({id:`alphabet:${unit.symbol}:recall`,mode:'boss',sourceSection:'alphabet',item:unit,answer:unit.name,spoken:unit.spoken,prompt:ui('bossAlphabetRecall',{symbol:unit.symbol,language:targetName()}),options:courseBossOptions(unit.name,names)});
      });
    }else{
      ['vocabulary','grammar','sentences'].forEach(section=>{
        const items=courseSectionLessons(section,mineIndex).flat(),answers=items.map(item=>item.forms?.[learning]).filter(Boolean);
        items.forEach(item=>{const answer=item.forms?.[learning],meaning=item.forms?.[known];if(!answer||!meaning)return;pool.push({id:`${section}:${item.id}`,mode:'boss',sourceSection:section,item,answer,spoken:answer,prompt:(QUESTION_PROMPTS[known]||QUESTION_PROMPTS.en)(meaning,targetName()),options:courseBossOptions(answer,answers)});});
      });
    }
    const unique=[],seen=new Set();
    for(const question of shuffled(pool)){const key=`${question.id}:${question.prompt}:${question.answer}`;if(seen.has(key)||question.options.length<2)continue;seen.add(key);unique.push({...question,options:shuffled(question.options)});if(unique.length===MULTILINGUAL_BOSS_QUESTION_TARGET)break;}
    return unique;
  }
  function clearCourseBossClock(){if(multilingualBossTimer){clearInterval(multilingualBossTimer);multilingualBossTimer=null;}if(multilingualBossAutoAdvanceTimer){clearTimeout(multilingualBossAutoAdvanceTimer);multilingualBossAutoAdvanceTimer=null;}}
  function persistCourseBoss(){const progress=languageProgress();progress.activeBoss=multilingualBoss?JSON.parse(JSON.stringify(multilingualBoss)):null;saveLanguageProgress(progress);}
  function savedCourseBoss(mineIndex){
    const saved=languageProgress().activeBoss;if(!saved||Number(saved.mine)!==Number(mineIndex)||!['ready','active','failed','passed'].includes(saved.status))return null;
    saved.index=Math.max(0,Number(saved.index)||0);saved.answeredCount=Math.max(0,Math.min(MULTILINGUAL_BOSS_QUESTION_TARGET,Number(saved.answeredCount)||0));saved.correct=Math.max(0,Math.min(saved.answeredCount,Number(saved.correct)||0));saved.missed=Array.isArray(saved.missed)?saved.missed:[];
    if(saved.status==='active'&&(!Array.isArray(saved.questions)||saved.questions.length!==MULTILINGUAL_BOSS_QUESTION_TARGET))return null;
    if(saved.status==='active'&&saved.answered){saved.index=saved.answeredCount;saved.answered=false;}
    return saved;
  }
  function courseBossRemainingMs(boss=multilingualBoss){return boss?.status==='active'?Math.max(0,Number(boss.deadline||0)-Date.now()):MULTILINGUAL_BOSS_TIME_LIMIT_MS;}
  function updateCourseBossTimer(){
    if(!multilingualBoss||multilingualBoss.status!=='active'){clearCourseBossClock();return;}
    const remaining=courseBossRemainingMs(),timer=document.getElementById('lmBossTimer');if(timer){timer.textContent=`${Math.ceil(remaining/1000)}s`;timer.classList.toggle('urgent',remaining<=30000);}
    if(remaining<=0)finishCourseBoss('timeout');
  }
  function startCourseBossClock(){if(multilingualBossTimer)return;multilingualBossTimer=setInterval(updateCourseBossTimer,250);updateCourseBossTimer();}
  function courseBossMissedMarkup(boss){
    const missed=Array.isArray(boss?.missed)?boss.missed:[];if(!missed.length)return '';
    return `<details class="lm-boss-misses"><summary>${escapeHtml(ui('reviewBossMistakes',{count:missed.length}))}</summary><ol>${missed.map(item=>`<li><strong>${escapeHtml(item.prompt)}</strong><span>${escapeHtml(ui('yourAnswer',{answer:item.selected}))}</span><span>${escapeHtml(ui('correctAnswerIs',{answer:item.answer}))}</span></li>`).join('')}</ol></details>`;
  }
  function renderCourseBossQuestion(){
    const boss=multilingualBoss;if(!boss||boss.status!=='active')return renderCourseBossArena();
    if(courseBossRemainingMs(boss)<=0){finishCourseBoss('timeout');return;}
    const question=boss.questions[boss.index],area=document.getElementById('challengeArea'),target=LANGUAGES[learning];if(!area||!question){finishCourseBoss('deck-error');return;}
    activePreviewQuestion=question;const progress=boss.answeredCount/MULTILINGUAL_BOSS_QUESTION_TARGET*100;
    area.innerHTML=`<section class="lm-course-question lm-perfect-gate-question" aria-label="${escapeHtml(targetName())} ${escapeHtml(ui('guardianBoss'))}"><header class="lm-perfect-gate-head"><div><div class="lm-question-kicker">${target.flag} ${escapeHtml(ui('perfectGateChallenge'))}</div><h3>${escapeHtml(ui('bossQuestionNumber',{number:boss.answeredCount+1,total:MULTILINGUAL_BOSS_QUESTION_TARGET}))}</h3><p>${escapeHtml(ui('bossCorrectSoFar',{correct:boss.correct,total:MULTILINGUAL_BOSS_QUESTION_TARGET}))}</p></div><strong id="lmBossTimer" class="lm-boss-timer">${Math.ceil(courseBossRemainingMs(boss)/1000)}s</strong></header><div class="lm-boss-test-progress"><i style="width:${progress}%"></i></div><div class="lm-silent-test-note">🔇 ${escapeHtml(ui('silentBossTest'))}</div><h3 class="lm-course-prompt" data-lm-no-interface-translate>${escapeHtml(question.prompt)}</h3><div class="lm-answer-grid" data-lm-no-interface-translate>${question.options.map(option=>`<button type="button" data-lm-course-answer="${escapeHtml(option)}">${escapeHtml(option)}</button>`).join('')}</div><div id="lmCourseFeedback" class="lm-course-feedback" aria-live="polite"></div></section>`;
    document.querySelectorAll('[data-lm-course-answer]').forEach(button=>button.addEventListener('click',()=>answerCourseQuestion(button)));const message=document.getElementById('message');if(message)message.textContent='';const quickLabel=document.getElementById('quickMineLabel');if(quickLabel)quickLabel.textContent=ui('returnToQuestion');area.scrollIntoView({behavior:'smooth',block:'center'});startCourseBossClock();
  }
  function renderCourseBossArena(){
    const boss=multilingualBoss,area=document.getElementById('challengeArea'),target=LANGUAGES[learning];if(!area||!boss)return;
    if(boss.status==='active'){renderCourseBossQuestion();return;}
    clearCourseBossClock();activePreviewQuestion=null;const finished=boss.status==='failed'||boss.status==='passed',passed=boss.status==='passed',elapsed=finished?Math.min(300,Math.max(0,Math.ceil((Number(boss.finishedAt)-Number(boss.startedAt))/1000))):0,unanswered=MULTILINGUAL_BOSS_QUESTION_TARGET-Number(boss.answeredCount||0),fastest=courseAssessmentTime(languageProgress().bossFastestByMine?.[boss.mine]),recordMarkup=courseAssessmentRecordMarkup(fastest,boss.newFastest,ui('fastestPerfectGuardian'));
    area.innerHTML=`<section class="lm-course-question lm-boss-arena ${passed?'passed':boss.status==='failed'?'failed':''}"><div class="lm-boss-sprite">${Number(boss.mine)===6?'🐉':'👹'}</div><div class="lm-question-kicker">${target.flag} ${escapeHtml(ui('courseBoss',{language:targetName()}))}</div><h3>${escapeHtml(ui('perfectGateChallenge'))}</h3><div class="lm-boss-rules"><strong>${escapeHtml(ui('bossRuleSummary',{level:COURSE_LEVEL_LABELS[learning]?.[boss.mine]||`${ui('level')} ${boss.mine+1}`}))}</strong><span>${escapeHtml(ui('bossRuleDetails'))}${fastest?` ${escapeHtml(ui('currentRecord',{time:courseAssessmentTimeLabel(fastest)}))}`:''}</span></div>${finished?`<div class="lm-boss-result-score">${boss.correct}/${MULTILINGUAL_BOSS_QUESTION_TARGET}</div><h3>${escapeHtml(ui(passed?'bossDefeated':'keepTraining'))}</h3><p>${escapeHtml(ui('bossResultDetails',{incorrect:Number(boss.answeredCount||0)-Number(boss.correct||0),unanswered,seconds:elapsed}))}</p>${recordMarkup}${boss.rewardNuggets?`<div class="lm-course-reward">🪙 +${Number(boss.rewardNuggets).toLocaleString()} Nuggets · First Guardian victory</div>`:''}${boss.treasureReward?`<div class="lm-course-reward treasure">🎁 +${Number(boss.treasureReward).toLocaleString()} Nuggets · Answer-streak treasure</div>`:''}<strong>${escapeHtml(ui(passed?'bossPerfectSuccess':'bossPerfectFailure',{correct:boss.correct,total:MULTILINGUAL_BOSS_QUESTION_TARGET}))}</strong>${courseBossMissedMarkup(boss)}<div class="lm-boss-actions">${passed?'':`<button data-lm-boss-action="retry" class="lm-boss-primary" type="button">${escapeHtml(ui('retryRandomBoss'))}</button>`}<button data-lm-boss-action="map" type="button">${escapeHtml(ui('returnToMap'))}</button></div>`:`<div class="lm-boss-metrics"><b>25<small>${escapeHtml(ui('questions'))}</small></b><b>5:00<small>${escapeHtml(ui('timeLimit'))}</small></b><b>25/25<small>${escapeHtml(ui('requiredScore'))}</small></b></div><div class="lm-boss-actions"><button data-lm-boss-action="begin" class="lm-boss-primary" type="button">${escapeHtml(ui('beginSilentTest'))}</button><button data-lm-boss-action="map" type="button">${escapeHtml(ui('returnToMap'))}</button></div>`}</section>`;
    area.scrollIntoView({behavior:'smooth',block:'center'});
  }
  function beginCourseBossAttempt(){
    if(!multilingualBoss){showToast(ui('bossStateMissing'));return false;}if(!courseBossUnlocked(multilingualBoss.mine)){showToast(courseBossRequirement(multilingualBoss.mine));return false;}
    const deck=buildCourseBossDeck(multilingualBoss.mine);if(deck.length!==MULTILINGUAL_BOSS_QUESTION_TARGET){showToast(ui('bossDeckTooSmall',{count:deck.length,needed:MULTILINGUAL_BOSS_QUESTION_TARGET}));return false;}
    clearCourseBossClock();const now=Date.now();multilingualBoss={mine:multilingualBoss.mine,status:'active',questions:deck,index:0,answeredCount:0,correct:0,answered:false,missed:[],startedAt:now,deadline:now+MULTILINGUAL_BOSS_TIME_LIMIT_MS,finishedAt:0,finishReason:''};persistCourseBoss();renderCourseBossQuestion();return true;
  }
  function answerCourseBossQuestion(button){
    const boss=multilingualBoss,question=activePreviewQuestion;if(!boss||boss.status!=='active'||boss.answered||!question)return;
    if(courseBossRemainingMs(boss)<=0){finishCourseBoss('timeout');return;}
    const selected=button.dataset.lmCourseAnswer,correct=selected===question.answer;boss.answered=true;boss.answeredCount=Math.min(MULTILINGUAL_BOSS_QUESTION_TARGET,Number(boss.answeredCount||0)+1);if(correct)boss.correct=Number(boss.correct||0)+1;else boss.missed.push({id:question.id,prompt:question.prompt,answer:question.answer,selected,section:question.sourceSection});window.LanguageMinerEconomy?.recordCourseAnswer?.({correct,stage:boss.mine,review:false,deferTreasure:true});
    document.querySelectorAll('[data-lm-course-answer]').forEach(item=>{item.disabled=true;if(item.dataset.lmCourseAnswer===question.answer)item.classList.add('correct');else if(item===button)item.classList.add('wrong');});const feedback=document.getElementById('lmCourseFeedback');if(feedback){feedback.className=`lm-course-feedback ${correct?'correct':'wrong'}`;feedback.innerHTML=correct?`✓ ${escapeHtml(ui('correct'))}`:escapeHtml(ui('correctAnswerIs',{answer:question.answer}));}persistCourseBoss();
    if(boss.answeredCount>=MULTILINGUAL_BOSS_QUESTION_TARGET){finishCourseBoss('completed');return;}
    multilingualBossAutoAdvanceTimer=setTimeout(()=>{multilingualBossAutoAdvanceTimer=null;if(!multilingualBoss||multilingualBoss.status!=='active')return;multilingualBoss.index=multilingualBoss.answeredCount;multilingualBoss.answered=false;persistCourseBoss();renderCourseBossQuestion();},MULTILINGUAL_BOSS_AUTO_ADVANCE_DELAY_MS);
  }
  function finishCourseBoss(reason='completed'){
    const boss=multilingualBoss;if(!boss||boss.status!=='active')return false;clearCourseBossClock();const finishedAt=Date.now(),passed=reason==='completed'&&Number(boss.answeredCount)===MULTILINGUAL_BOSS_QUESTION_TARGET&&Number(boss.correct)===MULTILINGUAL_BOSS_QUESTION_TARGET&&finishedAt<=Number(boss.deadline||0);boss.status=passed?'passed':'failed';boss.finishedAt=finishedAt;boss.finishReason=reason;
    const progress=languageProgress();progress.bossBestByMine=progress.bossBestByMine&&typeof progress.bossBestByMine==='object'?progress.bossBestByMine:{};progress.bossDefeatedByMine=progress.bossDefeatedByMine&&typeof progress.bossDefeatedByMine==='object'?progress.bossDefeatedByMine:{};progress.bossFastestByMine=progress.bossFastestByMine&&typeof progress.bossFastestByMine==='object'?progress.bossFastestByMine:{};progress.bossRewardClaimsByMine=progress.bossRewardClaimsByMine&&typeof progress.bossRewardClaimsByMine==='object'?progress.bossRewardClaimsByMine:{};
    const firstVictory=passed&&!courseBossDefeated(boss.mine,progress),rewardRequested=MULTILINGUAL_GUARDIAN_REWARDS[Math.max(0,Math.min(MULTILINGUAL_GUARDIAN_REWARDS.length-1,Number(boss.mine)||0))];progress.bossBestByMine[boss.mine]=Math.max(Number(progress.bossBestByMine[boss.mine])||0,Math.round(Number(boss.correct||0)/MULTILINGUAL_BOSS_QUESTION_TARGET*100));if(passed){progress.bossDefeatedByMine[boss.mine]=true;const elapsedTimeMs=Math.max(1,finishedAt-Number(boss.startedAt||finishedAt)),previousFastest=courseAssessmentTime(progress.bossFastestByMine[boss.mine]),newFastest=!previousFastest||elapsedTimeMs<previousFastest;boss.elapsedTimeMs=elapsedTimeMs;boss.newFastest=newFastest;if(newFastest)progress.bossFastestByMine[boss.mine]=elapsedTimeMs;}
    boss.treasureReward=Number(window.LanguageMinerEconomy?.releaseTreasures?.(false)?.amount)||0;boss.rewardNuggets=firstVictory&&!progress.bossRewardClaimsByMine[boss.mine]?Number(window.LanguageMinerEconomy?.grantNuggets?.(rewardRequested,boss.mine,`${targetName()} Guardian reward`)||0):0;if(boss.rewardNuggets)progress.bossRewardClaimsByMine[boss.mine]={amount:boss.rewardNuggets,claimedAt:finishedAt};progress.activeBoss=JSON.parse(JSON.stringify(boss));saveLanguageProgress(progress);if(passed&&boss.mine<6)expandedCourseMines.add(boss.mine+1);const hub=document.getElementById('v5Content');if(hub){delete hub.dataset.lmLearning;delete hub.dataset.lmExpeditionPreview;}renderCourseBossArena();updateFoundationProgress();return passed;
  }
  function buildCourseReviewDeck(mineIndex,section,evenLesson){
    const items=courseSectionLessons(section,mineIndex).slice(Number(evenLesson)-2,Number(evenLesson)).flat(),answers=items.map(item=>item.forms?.[learning]).filter(Boolean),bank=[];
    items.forEach(item=>{const answer=item.forms?.[learning],meaning=item.forms?.[known];if(!answer||!meaning)return;const options=courseBossOptions(answer,answers);if(options.length>=2)bank.push({id:`${section}:${item.id}`,mode:'review',sourceSection:section,item,answer,spoken:answer,prompt:(QUESTION_PROMPTS[known]||QUESTION_PROMPTS.en)(meaning,targetName()),options});});
    const deck=[];while(bank.length&&deck.length<MULTILINGUAL_REVIEW_QUESTION_TARGET){for(const question of shuffled(bank)){deck.push({...question,options:shuffled(question.options)});if(deck.length===MULTILINGUAL_REVIEW_QUESTION_TARGET)break;}}
    return deck;
  }
  function clearCourseReviewClock(){if(multilingualReviewTimer){clearInterval(multilingualReviewTimer);multilingualReviewTimer=null;}if(multilingualReviewAutoAdvanceTimer){clearTimeout(multilingualReviewAutoAdvanceTimer);multilingualReviewAutoAdvanceTimer=null;}}
  function courseReviewRemainingMs(quiz=multilingualReviewQuiz){return quiz&&!quiz.finished?Math.max(0,Number(quiz.deadline||0)-Date.now()):0;}
  function courseReviewTimeLabel(ms){const total=Math.max(0,Math.ceil(Number(ms||0)/1000));return `${String(Math.floor(total/60)).padStart(2,'0')}:${String(total%60).padStart(2,'0')}`;}
  function updateCourseReviewTimer(){const quiz=multilingualReviewQuiz;if(!quiz||quiz.finished){clearCourseReviewClock();return;}const remaining=courseReviewRemainingMs(quiz),timer=document.getElementById('lmReviewTimer');if(timer){timer.textContent=courseReviewTimeLabel(remaining);timer.classList.toggle('urgent',remaining<=30000);}if(remaining<=0)finishCourseReview('timeout');}
  function startCourseReviewClock(){if(multilingualReviewTimer)return;multilingualReviewTimer=setInterval(updateCourseReviewTimer,250);updateCourseReviewTimer();}
  function renderCourseReviewQuiz(){
    const quiz=multilingualReviewQuiz,area=document.getElementById('challengeArea');if(!quiz||!area)return;if(!quiz.finished&&courseReviewRemainingMs(quiz)<=0){finishCourseReview('timeout');return;}
    const first=quiz.evenLesson-1,second=quiz.evenLesson,nextExists=!!courseSectionLessons(quiz.section,quiz.mine)[quiz.evenLesson],title=ui('reviewQuizTitle',{first,second});
    if(quiz.finished){clearCourseReviewClock();const result=courseReviewResult(quiz.mine,quiz.section,quiz.evenLesson),gatePassed=result.passed===true,unanswered=MULTILINGUAL_REVIEW_QUESTION_TARGET-Number(quiz.answeredCount||0),elapsed=Math.min(150,Math.max(0,Math.ceil((Number(quiz.finishedAt)-Number(quiz.startedAt))/1000))),recordMarkup=courseAssessmentRecordMarkup(result.fastestTimeMs,quiz.newFastest,ui('fastestPassingQuiz'));
      area.innerHTML=`<section class="lm-course-question lm-review-result ${quiz.passed?'passed':'failed'}"><div class="lm-review-check">${quiz.passed?'✓':'!'}</div><div class="lm-question-kicker">${escapeHtml(title)}</div><h3>${escapeHtml(ui(quiz.passed?'reviewPassed':'reviewTryAgain'))}</h3><div class="lm-boss-result-score">${quiz.score}%</div><p>${escapeHtml(ui('reviewResultDetails',{correct:quiz.correct,total:MULTILINGUAL_REVIEW_QUESTION_TARGET,unanswered,seconds:elapsed}))}</p>${recordMarkup}${quiz.rewardNuggets?`<div class="lm-course-reward">🪙 +${Number(quiz.rewardNuggets).toLocaleString()} Nuggets · First-pass reward</div>`:''}${quiz.treasureReward?`<div class="lm-course-reward treasure">🎁 +${Number(quiz.treasureReward).toLocaleString()} Nuggets · Answer-streak treasure</div>`:''}<strong>${escapeHtml(quiz.passed?(nextExists?ui('reviewUnlockNext',{lesson:quiz.evenLesson+1}):ui('reviewFinalComplete')):gatePassed?ui('reviewStillPassed'):ui('reviewNeedScore'))}</strong><div class="lm-boss-actions"><button data-lm-review-action="retry" class="lm-boss-primary" type="button">${escapeHtml(ui('retryReview'))}</button>${gatePassed&&nextExists?`<button data-lm-review-action="continue" type="button">${escapeHtml(ui('continueLesson',{lesson:quiz.evenLesson+1}))}</button>`:''}<button data-lm-review-action="map" type="button">${escapeHtml(ui('returnToMap'))}</button></div></section>`;area.scrollIntoView({behavior:'smooth',block:'center'});return;}
    const question=quiz.questions[quiz.index],remaining=courseReviewRemainingMs(quiz),progress=(quiz.index+1)/MULTILINGUAL_REVIEW_QUESTION_TARGET*100,record=courseReviewResult(quiz.mine,quiz.section,quiz.evenLesson),recordCopy=record.fastestTimeMs?` · ${ui('recordTime',{time:courseAssessmentTimeLabel(record.fastestTimeMs)})}`:'';activePreviewQuestion=question;
    area.innerHTML=`<section class="lm-course-question lm-review-quiz"><header class="lm-perfect-gate-head"><div><div class="lm-question-kicker">${escapeHtml(title)}</div><h3>${escapeHtml(ui('reviewQuestionNumber',{number:quiz.index+1,total:MULTILINGUAL_REVIEW_QUESTION_TARGET}))}</h3><p>${escapeHtml(ui('reviewCorrectSoFar',{correct:quiz.correct})+recordCopy)}</p></div><strong id="lmReviewTimer" class="lm-boss-timer ${remaining<=30000?'urgent':''}">${courseReviewTimeLabel(remaining)}</strong></header><div class="lm-boss-test-progress"><i style="width:${progress}%"></i></div><h3 class="lm-course-prompt" data-lm-no-interface-translate>${escapeHtml(question.prompt)}</h3><div class="lm-answer-grid" data-lm-no-interface-translate>${question.options.map((option,index)=>`<button type="button" data-lm-review-answer="${index}">${escapeHtml(option)}</button>`).join('')}</div><div id="lmCourseFeedback" class="lm-course-feedback" aria-live="polite">${escapeHtml(ui('reviewChooseAnswer'))}</div></section>`;area.scrollIntoView({behavior:'smooth',block:'center'});startCourseReviewClock();
  }
  function openCourseReview(mineIndex,section,evenLesson){
    mineIndex=Number(mineIndex);evenLesson=Number(evenLesson);if(!courseReviewAvailable(mineIndex,section,evenLesson)&&!courseReviewPassed(mineIndex,section,evenLesson)){showToast(ui('reviewLocked',{first:evenLesson-1,second:evenLesson}));return false;}
    clearCourseBossClock();clearCourseReviewClock();selectedCourseMine=mineIndex;selectedCourseSection=section;selectedCourseLesson=Math.max(0,evenLesson-1);const questions=buildCourseReviewDeck(mineIndex,section,evenLesson);if(questions.length!==MULTILINGUAL_REVIEW_QUESTION_TARGET){showToast(ui('reviewDeckTooSmall'));return false;}const now=Date.now();multilingualReviewQuiz={mine:mineIndex,section,evenLesson,questions,index:0,correct:0,answeredCount:0,answered:false,selected:null,startedAt:now,deadline:now+MULTILINGUAL_REVIEW_TIME_LIMIT_MS,finished:false,finishedAt:0,score:0,passed:false};document.getElementById('v5Close')?.click();renderCourseReviewQuiz();return true;
  }
  function answerCourseReview(button){
    const quiz=multilingualReviewQuiz;if(!quiz||quiz.finished||quiz.answered)return;if(courseReviewRemainingMs(quiz)<=0){finishCourseReview('timeout');return;}const question=quiz.questions[quiz.index],selected=question.options[Number(button.dataset.lmReviewAnswer)],correct=selected===question.answer;quiz.selected=selected;quiz.answered=true;quiz.answeredCount=Number(quiz.answeredCount||0)+1;if(correct)quiz.correct=Number(quiz.correct||0)+1;window.LanguageMinerEconomy?.recordCourseAnswer?.({correct,stage:quiz.mine,review:true,deferTreasure:true});
    document.querySelectorAll('[data-lm-review-answer]').forEach((item,index)=>{item.disabled=true;const option=question.options[index];if(option===question.answer)item.classList.add('correct');else if(item===button)item.classList.add('wrong');});const feedback=document.getElementById('lmCourseFeedback');if(feedback){feedback.className=`lm-course-feedback ${correct?'correct':'wrong'}`;feedback.innerHTML=correct?`✓ ${escapeHtml(ui('correct'))}`:escapeHtml(ui('correctAnswerIs',{answer:question.answer}));}
    if(quiz.answeredCount>=MULTILINGUAL_REVIEW_QUESTION_TARGET){finishCourseReview('completed');return;}multilingualReviewAutoAdvanceTimer=setTimeout(()=>{multilingualReviewAutoAdvanceTimer=null;if(!multilingualReviewQuiz||multilingualReviewQuiz.finished)return;multilingualReviewQuiz.index+=1;multilingualReviewQuiz.answered=false;multilingualReviewQuiz.selected=null;renderCourseReviewQuiz();},MULTILINGUAL_REVIEW_AUTO_ADVANCE_DELAY_MS);
  }
  function finishCourseReview(reason='completed'){
    const quiz=multilingualReviewQuiz;if(!quiz||quiz.finished)return false;clearCourseReviewClock();quiz.finished=true;quiz.finishedAt=Date.now();quiz.finishReason=reason;quiz.score=Math.round(Number(quiz.correct||0)/MULTILINGUAL_REVIEW_QUESTION_TARGET*100);quiz.passed=quiz.score>=MULTILINGUAL_REVIEW_PASS_SCORE;
    const progress=languageProgress();progress.reviewCheckpoints=progress.reviewCheckpoints&&typeof progress.reviewCheckpoints==='object'?progress.reviewCheckpoints:{};
    const key=courseReviewKey(quiz.mine,quiz.section,quiz.evenLesson),previous=courseReviewResult(quiz.mine,quiz.section,quiz.evenLesson,progress),elapsedTimeMs=Math.max(1,quiz.finishedAt-Number(quiz.startedAt||quiz.finishedAt)),previousFastest=courseAssessmentTime(previous.fastestTimeMs),eligibleForRecord=reason==='completed'&&quiz.passed&&Number(quiz.answeredCount)===MULTILINGUAL_REVIEW_QUESTION_TARGET,newFastest=eligibleForRecord&&(!previousFastest||elapsedTimeMs<previousFastest),fastestTimeMs=newFastest?elapsedTimeMs:previousFastest,firstPassReward=eligibleForRecord&&previous.passed!==true&&!previous.rewardClaimedAt,rewardRequested=MULTILINGUAL_REVIEW_REWARDS[Math.max(0,Math.min(MULTILINGUAL_REVIEW_REWARDS.length-1,Number(quiz.mine)||0))];
    quiz.elapsedTimeMs=elapsedTimeMs;quiz.newFastest=newFastest;quiz.fastestTimeMs=fastestTimeMs;quiz.treasureReward=Number(window.LanguageMinerEconomy?.releaseTreasures?.(false)?.amount)||0;quiz.rewardNuggets=firstPassReward?Number(window.LanguageMinerEconomy?.grantNuggets?.(rewardRequested,quiz.mine,`${targetName()} review quiz reward`)||0):0;
    progress.reviewCheckpoints[key]={...previous,best:Math.max(Number(previous.best)||0,quiz.score),lastScore:quiz.score,attempts:Number(previous.attempts||0)+1,passed:previous.passed===true||quiz.passed,passedAt:quiz.passed?Date.now():Number(previous.passedAt||0),fastestTimeMs,fastestAt:newFastest?quiz.finishedAt:Number(previous.fastestAt||0),rewardNuggets:quiz.rewardNuggets||Number(previous.rewardNuggets)||0,rewardClaimedAt:quiz.rewardNuggets?quiz.finishedAt:Number(previous.rewardClaimedAt)||0};saveLanguageProgress(progress);const hub=document.getElementById('v5Content');if(hub)delete hub.dataset.lmLearning;renderCourseReviewQuiz();return quiz.passed;
  }
  function courseQuestionPrompt(question,target){
    if(question.prompt)return question.prompt;
    if(question.mode==='alphabet'||question.sourceSection==='alphabet')return (ALPHABET_PROMPTS[known]||ALPHABET_PROMPTS.en)(question.label,targetName());
    return (QUESTION_PROMPTS[known]||QUESTION_PROMPTS.en)(question.meaning,targetName());
  }
  function enqueueCurrentCourseQuestion(question=activePreviewQuestion){
    if(!question?.answer)return false;const itemId=question.item?.id??question.unit?.symbol??question.id??question.answer,id=`multilingual:${learning}:${selectedCourseMine}:${question.sourceSection||question.mode}:${itemId}:${known}`;return window.japaneseMinerSmartReview?.enqueue?.({id,stage:selectedCourseMine,q:question.spoken||question.answer,displayChallenge:question.spoken||question.answer,prompt:courseQuestionPrompt(question,LANGUAGES[learning]),a:question.answer,opts:question.options,speechText:question.spoken||question.answer})===true;
  }
  function renderCourseQuestion(section=selectedCourseSection,lesson=selectedCourseLesson){
    if(fullJapaneseCourse())return;selectedCourseSection=section;selectedCourseLesson=Number(lesson)||0;if(section==='boss'){renderCourseBossArena();return;}
    const target=LANGUAGES[learning],system=ALPHABET_SYSTEMS[learning],question=section==='alphabet'||(section==='boss'&&selectedCourseMine===0)?makeAlphabetQuestion(section==='boss'?Math.floor(Math.random()*4):selectedCourseLesson):makeMeaningQuestion(section,selectedCourseLesson),area=document.getElementById('challengeArea'),message=document.getElementById('message');
    if(section==='boss')question.mode='boss';
    activePreviewQuestion=question;if(!area||!question?.answer)return;
    const lessonTotal=courseSectionLessons(section,selectedCourseMine).length,translatedSection=sectionLabel(section),bossStatus=section==='boss'&&multilingualBoss?` · ${ui('boss')} ${multilingualBoss.index+1}/${multilingualBoss.total}`:'';
    const alphabetQuestion=section==='alphabet'||question.sourceSection==='alphabet',optionalAudio=alphabetQuestion?`<div class="lm-question-actions"><button id="lmSpeakQuestion" class="lm-speak-button" type="button">🔊 ${escapeHtml(ui('replayClue'))}</button></div>`:'';
    area.innerHTML=`<section class="lm-course-question ${alphabetQuestion?'lm-alphabet-question':''}" aria-label="${escapeHtml(targetName())} ${escapeHtml(translatedSection)}"><div class="lm-question-kicker">${target.flag} ${escapeHtml(alphabetQuestion?system.name:`${targetName()} ${translatedSection} ${ui('mine')}`)} · ${escapeHtml(ui('lesson',{number:selectedCourseLesson+1}))}/${lessonTotal}${bossStatus}</div><h3 class="lm-course-prompt" data-lm-no-interface-translate>${escapeHtml(courseQuestionPrompt(question,target))}</h3>${optionalAudio}<button id="lmUnknownCourseItem" class="lm-unknown-course-item" type="button">📖 I don’t know this yet — add to review</button><div class="lm-answer-grid ${alphabetQuestion?'lm-alphabet-answers':''}" data-lm-no-interface-translate>${question.options.map(option=>`<button type="button" data-lm-course-answer="${escapeHtml(option)}">${escapeHtml(option)}</button>`).join('')}</div><div id="lmCourseFeedback" class="lm-course-feedback" aria-live="polite"></div></section>`;
    if(message)message.textContent='';document.getElementById('lmSpeakQuestion')?.addEventListener('click',()=>speakTarget(question.spoken));document.getElementById('lmUnknownCourseItem')?.addEventListener('click',event=>{if(enqueueCurrentCourseQuestion(question)){event.currentTarget.disabled=true;event.currentTarget.textContent='✓ Added to Smart Review';const feedback=document.getElementById('lmCourseFeedback');if(feedback){feedback.className='lm-course-feedback correct';feedback.textContent='Added to unlimited Smart Review. No hearts, rewards, or penalties are used there.';}}});document.querySelectorAll('[data-lm-course-answer]').forEach(button=>button.addEventListener('click',()=>answerCourseQuestion(button)));
    const quickLabel=document.getElementById('quickMineLabel');if(quickLabel)quickLabel.textContent=ui('returnToQuestion');updateFoundationProgress();area.scrollIntoView({behavior:'smooth',block:'center'});
  }
  function answerCourseQuestion(button){
    const question=activePreviewQuestion,selected=button.dataset.lmCourseAnswer,correct=selected===question.answer,buttons=[...document.querySelectorAll('[data-lm-course-answer]')];
    if(question?.mode==='boss'){answerCourseBossQuestion(button);return;}
    buttons.forEach(item=>{item.disabled=true;if(item.dataset.lmCourseAnswer===question.answer)item.classList.add('correct');else if(item===button)item.classList.add('wrong');});const economy=recordCourseMastery(question,correct);
    const feedback=document.getElementById('lmCourseFeedback');if(feedback){feedback.className=`lm-course-feedback ${correct?'correct':'wrong'}`;feedback.innerHTML=correct?`✓ ${escapeHtml(ui('correct'))} — <strong>${escapeHtml(question.answer)}</strong>${economy?.treasureAmount?`<span class="lm-inline-reward">🪙 +${Number(economy.treasureAmount).toLocaleString()} Nuggets</span>`:''}`:escapeHtml(ui('notQuite',{answer:question.answer}));}
    activePreviewQuestion=null;const quickLabel=document.getElementById('quickMineLabel');if(quickLabel)quickLabel.textContent=ui('newQuestion');speakTarget(question.spoken||question.answer);
  }
  function advanceCourseQuestion(){
    renderCourseQuestion(selectedCourseSection,selectedCourseLesson);
  }
  function startCourseLesson(section,lesson,mineIndex=selectedCourseMine){
    if(!courseMineUnlocked(mineIndex)||section!=='boss'&&!courseLessonUnlocked(section,lesson,mineIndex))return;selectedCourseMine=Number(mineIndex)||0;selectedCourseSection=section;selectedCourseLesson=Number(lesson)||0;activePreviewQuestion=null;clearCourseBossClock();clearCourseReviewClock();multilingualReviewQuiz=null;const progress=languageProgress();progress.selectedMine=selectedCourseMine;saveLanguageProgress(progress);
    if(section!=='boss'){progress.selectedSection=selectedCourseSection;progress.selectedLesson=selectedCourseLesson;saveLanguageProgress(progress);}
    if(section==='boss'){if(!courseBossUnlocked(selectedCourseMine)){showToast(courseBossRequirement(selectedCourseMine));return;}multilingualBoss=savedCourseBoss(selectedCourseMine)||{mine:selectedCourseMine,status:'ready',questions:[],index:0,answeredCount:0,correct:0,answered:false,missed:[],startedAt:0,deadline:0,finishedAt:0,finishReason:''};if(multilingualBoss.status==='passed')multilingualBoss={mine:selectedCourseMine,status:'ready',questions:[],index:0,answeredCount:0,correct:0,answered:false,missed:[],startedAt:0,deadline:0,finishedAt:0,finishReason:''};if(multilingualBoss.status==='active'&&courseBossRemainingMs(multilingualBoss)<=0)finishCourseBoss('timeout');else persistCourseBoss();}else multilingualBoss=null;
    document.getElementById('v5Close')?.click();renderCourseQuestion(section,selectedCourseLesson);showToast(ui('courseOpened',{language:targetName(),section:sectionLabel(section)}));
  }
  function renderFoundationQuestion(){renderCourseQuestion(selectedCourseSection,selectedCourseLesson);}
  function answerFoundationQuestion(button){answerCourseQuestion(button);}
  function updateCourseChrome(){
    const target=LANGUAGES[learning],mineTitle=document.querySelector('.mine-title');
    if(mineTitle)mineTitle.textContent=ui('minePrompt',{language:targetName()});
    const mineNote=document.querySelector('.mine-note');if(mineNote)mineNote.textContent=ui('mineNote');
    const voiceLabel=document.querySelector('label[for="voiceToggle"] .form-check-label'),voiceTest=document.getElementById('testVoiceBtn');if(voiceLabel)voiceLabel.textContent=ui('voice',{language:targetName()});if(voiceTest)voiceTest.textContent=`🔊 ${ui('voice',{language:targetName()})}`;
    const quickLabel=document.getElementById('quickMineLabel');if(quickLabel&&!activePreviewQuestion)quickLabel.textContent=ui('newQuestion');
    const empty=document.querySelector('#challengeArea .small');if(empty&&/No challenge active\.?/i.test(empty.textContent))empty.textContent=ui('noChallengeActive');
    if(!fullJapaneseCourse())updateFoundationProgress();
    syncExpeditionHub();
  }
  function nonJapaneseCoursePlan(){
    const alphabet=ALPHABET_SYSTEMS[learning],labels=COURSE_LEVEL_LABELS[learning]||[];
    if(travelCourseActive())return [{mine:0,title:`${targetName()} · Travel & common phrases`,summary:'60 essential phrases for greetings, directions, dining, shopping, health, and hotels.',icon:'🧳'}];
    return Array.from({length:7},(_,index)=>({mine:index,title:`${targetName()} · ${labels[index]||`${ui('level')} ${index+1}`}`,summary:index===0?ui('alphabetPlan',{summary:window.LanguageMinerI18n?.translate?.(alphabet.summary)||alphabet.summary}):ui('levelPlan'),icon:EXPEDITION_COURSES[learning]?.[index]?.[2]||(index===6?'🏆':'⛏️')}));
  }
  function courseLessonSubtitle(section,items,index){
    if(section==='travel')return `${index*10+1}–${index*10+items.length} · essential travel phrases`;
    if(section==='alphabet')return `${items.map(item=>item.symbol).join(' · ')} · ${ui('symbols',{count:items.length})}`;
    if(section==='vocabulary')return `${index*25+1}–${index*25+items.length} · ${ui('words',{count:items.length})}`;
    if(section==='grammar')return ui('grammarExamples',{start:index*10+1,end:index*10+items.length});
    if(section==='sentences')return ui('practicalSentences',{start:index*10+1,end:index*10+items.length});
    return ui('bossPlan');
  }
  function courseReviewCheckpointCard(section,mineIndex,evenLesson){
    const result=courseReviewResult(mineIndex,section,evenLesson),passed=result.passed===true,available=courseReviewAvailable(mineIndex,section,evenLesson),open=passed||available,best=Math.max(0,Number(result.best)||0),fastest=courseAssessmentTime(result.fastestTimeMs),first=evenLesson-1,second=evenLesson,copy=passed?`${ui('reviewPlanPassed',{best})}${fastest?` · ${ui('recordTime',{time:courseAssessmentTimeLabel(fastest)})}`:''}`:available?ui('reviewPlanAvailable'):ui('reviewPlanLocked',{first,second});
    return `<button type="button" class="lm-mine-lesson lm-review-checkpoint ${passed?'complete':open?'':'locked'}" data-lm-review-mine="${mineIndex}" data-lm-review-section="${section}" data-lm-review-even-lesson="${evenLesson}" ${open?'':'disabled'}><span>${passed?'✓':open?'🧠':'🔒'}</span><strong>${escapeHtml(ui('reviewQuizTitle',{first,second}))}</strong><small>${escapeHtml(copy)}</small><i><b style="width:${passed?100:best}%"></b></i><em>${passed?'✓':`${best}%`}</em></button>`;
  }
  function courseLessonGrid(section,mineIndex){
    const lessons=courseSectionLessons(section,mineIndex);
    return `<div class="lm-mine-lesson-grid lm-${section}-lesson-grid">${lessons.map((items,index)=>{const mastery=courseLessonMastery(section,index,mineIndex),active=selectedCourseMine===mineIndex&&selectedCourseSection===section&&selectedCourseLesson===index;if(section==='boss'){const defeated=courseBossDefeated(mineIndex),unlocked=courseBossUnlocked(mineIndex),fastest=courseAssessmentTime(languageProgress().bossFastestByMine?.[mineIndex]),copy=defeated?`${ui('bossPassedPlan')}${fastest?` · ${ui('recordTime',{time:courseAssessmentTimeLabel(fastest)})}`:''}`:unlocked?ui('bossPlan'):courseBossRequirement(mineIndex);return `<button type="button" class="lm-mine-lesson lm-guardian-lesson ${active?'current':''} ${defeated?'complete':unlocked?'':'locked'}" data-lm-course-mine="${mineIndex}" data-lm-course-section="boss" data-lm-course-lesson="0" ${!unlocked||defeated?'disabled':''}><span>${defeated?'✓':'⚔️'}</span><strong>${escapeHtml(ui('guardianBoss'))}</strong><small>${escapeHtml(copy)}</small><i><b style="width:${defeated?100:Math.min(100,courseMineXp(mineIndex)/MULTILINGUAL_BOSS_XP_REQUIREMENT*100)}%"></b></i><em>${defeated?'25/25':`${mastery}%`}</em></button>`;}const unlocked=courseLessonUnlocked(section,index,mineIndex),requirement=section==='alphabet'?MULTILINGUAL_ALPHABET_BOSS_MASTERY:MULTILINGUAL_LESSON_MASTERY_REQUIREMENT,copy=unlocked?courseLessonSubtitle(section,items,index):ui(section==='alphabet'?'alphabetLessonUnlockRequirement':'lessonUnlockRequirement',{mastery:requirement});const card=`<button type="button" class="lm-mine-lesson ${active?'current':''} ${mastery>=requirement?'complete':''} ${unlocked?'':'locked'}" data-lm-course-mine="${mineIndex}" data-lm-course-section="${section}" data-lm-course-lesson="${index}" ${unlocked?'':'disabled'}><span>${unlocked?index+1:'🔒'}</span><strong>${escapeHtml(ui('lesson',{number:index+1}))}</strong><small>${escapeHtml(copy)}</small><i><b style="width:${mastery}%"></b></i><em>${mastery}%</em></button>`;return `${card}${section!=='alphabet'&&(index+1)%2===0?courseReviewCheckpointCard(section,mineIndex,index+1):''}`;}).join('')}</div>`;
  }
  const courseLessonGridBeforeFastestReplay=courseLessonGrid;
  courseLessonGrid=function(section,mineIndex){return courseLessonGridBeforeFastestReplay(section,mineIndex).replace(/(<button[^>]*class="[^"]*lm-guardian-lesson[^"]*complete[^"]*"[^>]*?) disabled(>)/g,'$1$2');};
  function courseMineContents(mineIndex){
    return courseMineSections(mineIndex).map(section=>`<section class="lm-stage-course-section"><h4>${section==='boss'?'🏯':section==='travel'?'🧳':'📘'} ${escapeHtml(section==='boss'?ui('guardianBoss'):sectionLabel(section))}</h4>${courseLessonGrid(section,mineIndex)}</section>`).join('');
  }
  function multilingualExpeditionMap(){
    const target=LANGUAGES[learning],course=nonJapaneseCoursePlan();
    const mapIntro=travelCourseActive()?'A focused phrase course for real travel situations. Practice only what you need, with no full-language pathway required.':(window.LanguageMinerI18n?.translate?.('Every course follows seven levels. Each level contains lessons and its own guardian boss; defeat each boss to unlock the next mine.')||'Every course follows seven levels. Each level contains lessons and its own guardian boss; defeat each boss to unlock the next mine.');
    return `<div class="lm-course-world-map" data-lm-course-language="${escapeHtml(learning)}"><div class="v5-hero world-hero lm-expedition-hero"><div><span>${escapeHtml(ui('mapTitle',{language:targetName()}))}</span><h3>${escapeHtml(ui('courseExpedition',{language:targetName()}))}</h3><p>${escapeHtml(mapIntro)}</p></div><b>${target.flag}</b></div><div class="world-legend"><span>🟢 ${escapeHtml(ui('available'))}</span><span>⭐ ${escapeHtml(ui('currentLesson'))}</span><span>🔒 ${escapeHtml(ui('locked'))}</span><span>🏯 ${escapeHtml(ui('guardianBoss'))}</span></div><div class="lm-expedition-mine-list">${course.map((stage,index)=>{const unlocked=courseMineUnlocked(index),expanded=unlocked&&expandedCourseMines.has(index),mastery=courseMineMastery(index),panelId=`lmMinePanel${index}`;return `<section class="world-region lm-expedition-mine region-${index} ${selectedCourseMine===index?'current-region':''} ${expanded?'expanded':''} ${unlocked?'':'locked-region'}"><div class="lm-mine-summary"><div class="region-scenery">${unlocked?stage.icon:'🔒'}<small>${escapeHtml(targetName())} ${escapeHtml(ui('mine'))} ${index+1}</small></div><div class="region-label"><strong>${escapeHtml(stage.title)}</strong><span>${escapeHtml(unlocked?stage.summary:ui('passPreviousBoss'))}</span><i><b style="width:${mastery}%"></b></i><em>${escapeHtml(ui('complete',{value:mastery}))}</em></div><button class="lm-mine-dropdown" data-lm-mine-toggle="${index}" type="button" ${unlocked?'':'disabled'} aria-expanded="${expanded}" aria-controls="${panelId}" aria-label="${escapeHtml(ui(expanded?'collapse':'expand',{value:stage.title}))}"><span>${unlocked?(expanded?'▲':'▼'):'🔒'}</span></button></div><div id="${panelId}" class="lm-mine-dropdown-panel" ${expanded?'':'hidden'}>${unlocked?courseMineContents(index):''}</div></section>`;}).join('')}</div><div class="world-finish">🏆 ${escapeHtml(targetName())} ${escapeHtml(ui('mastery'))}</div></div>`;
  }
  function updateExpeditionHeader(hub){
    const target=LANGUAGES[learning],copyBlock=hub.querySelector('.menu-header-copy'),tab=hub.querySelector('[data-v5tab="map"]');
    if(copyBlock){const eyebrow=copyBlock.querySelector('span'),heading=copyBlock.querySelector('h2');if(eyebrow)eyebrow.textContent=fullJapaneseCourse()?'Language Miner v5.0':ui('mapTitle',{language:targetName()});if(heading)heading.textContent=fullJapaneseCourse()?ui('expeditionHub'):`${targetName()} ${travelCourseActive()?'Travel Course':ui('expeditionHub')}`;}
    if(tab)tab.textContent=`${fullJapaneseCourse()?'🗺️':target.flag} ${travelCourseActive()?'Travel':ui('expedition')}`;
  }
  let syncingExpeditionHub=false,expeditionHubObserver=null,expeditionHubObservedContent=null;
  function ensureExpeditionHubObserver(){
    const content=document.getElementById('v5Content');if(!content||content===expeditionHubObservedContent)return;
    expeditionHubObserver?.disconnect();expeditionHubObservedContent=content;expeditionHubObserver=new MutationObserver(()=>{if(syncingExpeditionHub||fullJapaneseCourse())return;const hub=document.getElementById('v5Overlay'),mapTab=hub?.querySelector('[data-v5tab="map"]');if(!hub?.classList.contains('open')||!mapTab?.classList.contains('active'))return;if(content.dataset.lmLearning!==learning||content.querySelector('.lm-course-world-map')?.dataset.lmCourseLanguage!==learning)syncExpeditionHub();});try{if(content?.nodeType===Node.ELEMENT_NODE)expeditionHubObserver.observe(content,{childList:true});}catch{}
  }
  function syncExpeditionHub(){
    const hub=document.getElementById('v5Overlay'),content=document.getElementById('v5Content'),mapTab=hub?.querySelector('[data-v5tab="map"]');
    if(!hub||!content||!mapTab)return;
    ensureExpeditionHubObserver();
    updateExpeditionHeader(hub);
    if(!mapTab.classList.contains('active'))return;
    if(fullJapaneseCourse()){
      if(content.dataset.lmExpeditionPreview==='true'){
        delete content.dataset.lmExpeditionPreview;delete content.dataset.lmLearning;
        mapTab.click();
      }
      return;
    }
    if(content.dataset.lmLearning===learning&&content.querySelector('.lm-course-world-map')?.dataset.lmCourseLanguage===learning)return;
    syncingExpeditionHub=true;try{
      content.dataset.lmExpeditionPreview='true';content.dataset.lmLearning=learning;content.innerHTML=multilingualExpeditionMap();
      const map=content.querySelector('.lm-course-world-map');
      map?.querySelector('.lm-expedition-hero')?.insertAdjacentHTML('afterend','<aside class="lm-framework-disclaimer"><strong>Independent practice pathway</strong><span>Framework names describe the skills practiced. Language Miner does not issue official CEFR, JLPT, TOPIK, HSK, or DALF certification.</span></aside>');
      const finish=map?.querySelector('.world-finish');if(finish)finish.textContent='🏆 Advanced practice milestone';
    }finally{syncingExpeditionHub=false;}
  }
  const openExpeditionBeforeCourse=window.openJapaneseMinerV5;
  if(typeof openExpeditionBeforeCourse==='function')window.openJapaneseMinerV5=function(tab='map',...args){const result=openExpeditionBeforeCourse.call(this,tab,...args);if(tab==='map'){ensureExpeditionHubObserver();syncExpeditionHub();}return result;};
  let lastAppliedLearning='',lastAppliedPurpose='';
  function applyCourse(settings=currentSettings()){
    const previous=learning;known=settings.known&&LANGUAGES[settings.known]?settings.known:'en';learning=settings.learning&&LANGUAGES[settings.learning]?settings.learning:'ja';const purpose=coursePurpose(settings),courseChanged=previous!==learning||lastAppliedLearning!==learning||lastAppliedPurpose!==purpose;
    if(courseChanged){clearCourseBossClock();clearCourseReviewClock();activePreviewQuestion=null;selectedCourseMine=0;selectedCourseSection='alphabet';selectedCourseLesson=0;multilingualBoss=null;multilingualReviewQuiz=null;expandedCourseMines.clear();expandedCourseMines.add(0);}
    if(!fullJapaneseCourse(settings)){const progress=languageProgress(),maxMine=travelCourseActive(settings)?0:6,savedMine=Math.max(0,Math.min(maxMine,Number(progress.selectedMine)||0));if(courseMineUnlocked(savedMine))selectedCourseMine=savedMine;if(courseChanged){const sections=courseMineSections(selectedCourseMine).filter(section=>section!=='boss'),savedSection=String(progress.selectedSection||sections[0]||(travelCourseActive(settings)?'travel':'alphabet'));selectedCourseSection=sections.includes(savedSection)?savedSection:sections[0];const lessons=courseSectionLessons(selectedCourseSection,selectedCourseMine),savedLesson=Math.max(0,Math.min(Math.max(0,lessons.length-1),Number(progress.selectedLesson)||0));selectedCourseLesson=courseLessonUnlocked(selectedCourseSection,savedLesson,selectedCourseMine)?savedLesson:0;}expandedCourseMines.add(selectedCourseMine);}
    window.LanguageMinerI18n?.setLocale?.(known,{known,learning});
    if(indicator)indicator.innerHTML=`${LANGUAGES[known].flag} ${escapeHtml(LANGUAGES[known].native)} <b>→</b> ${LANGUAGES[learning].flag} ${escapeHtml(LANGUAGES[learning].native)}`;
    const voiceToggleLabel=document.querySelector('#voiceToggle + .form-check-label');if(voiceToggleLabel)voiceToggleLabel.textContent=ui('voice',{language:targetName()});
    const accentLabel=document.getElementById('voiceAccentLabel');if(accentLabel)accentLabel.textContent=ui('nativeAccent',{accent:LANGUAGES[learning].accent,code:LANGUAGES[learning].voice});
    if(learning==='ja'&&lastAppliedLearning&&lastAppliedLearning!=='ja')window.render?.();
    hideOriginalJapanesePlacementForOtherCourses();updateCourseChrome();lastAppliedLearning=learning;lastAppliedPurpose=purpose;
  }
  function handleCourseControls(event){
    if(fullJapaneseCourse()||overlay?.classList.contains('open'))return;
    const reviewAnswer=event.target.closest?.('[data-lm-review-answer]'),reviewAction=event.target.closest?.('[data-lm-review-action]'),reviewCheckpoint=event.target.closest?.('[data-lm-review-section]'),bossAction=event.target.closest?.('[data-lm-boss-action]'),expeditionTab=event.target.closest?.('[data-v5tab="map"]'),mineToggle=event.target.closest?.('[data-lm-mine-toggle]'),courseLesson=event.target.closest?.('[data-lm-course-section]'),rock=event.target.closest?.('#rock'),quick=event.target.closest?.('#quickMineBtn'),voiceTest=event.target.closest?.('#testVoiceBtn');
    if(reviewAnswer){event.preventDefault();event.stopImmediatePropagation();answerCourseReview(reviewAnswer);return;}
    if(reviewAction){event.preventDefault();event.stopImmediatePropagation();const action=reviewAction.dataset.lmReviewAction,quiz=multilingualReviewQuiz;if(!quiz)return;if(action==='retry')openCourseReview(quiz.mine,quiz.section,quiz.evenLesson);else if(action==='continue'){const {mine,section,evenLesson}=quiz;clearCourseReviewClock();multilingualReviewQuiz=null;startCourseLesson(section,evenLesson,mine);}else if(action==='map'){clearCourseReviewClock();multilingualReviewQuiz=null;window.openJapaneseMinerV5?.('map');setTimeout(()=>{const content=document.getElementById('v5Content');if(content){delete content.dataset.lmLearning;syncExpeditionHub();}},0);}return;}
    if(reviewCheckpoint){event.preventDefault();event.stopImmediatePropagation();openCourseReview(Number(reviewCheckpoint.dataset.lmReviewMine),reviewCheckpoint.dataset.lmReviewSection,Number(reviewCheckpoint.dataset.lmReviewEvenLesson));return;}
    if(bossAction){event.preventDefault();event.stopImmediatePropagation();const action=bossAction.dataset.lmBossAction;if(action==='begin'||action==='retry'){if(action==='retry')multilingualBoss={mine:selectedCourseMine,status:'ready',questions:[],index:0,answeredCount:0,correct:0,answered:false,missed:[],startedAt:0,deadline:0,finishedAt:0,finishReason:''};beginCourseBossAttempt();}else if(action==='map'){clearCourseBossClock();window.openJapaneseMinerV5?.('map');setTimeout(()=>{const content=document.getElementById('v5Content');if(content){delete content.dataset.lmLearning;syncExpeditionHub();}},0);}return;}
    if(expeditionTab){event.preventDefault();event.stopImmediatePropagation();window.openJapaneseMinerV5?.('map');return;}
    if(mineToggle){event.preventDefault();event.stopImmediatePropagation();const index=Number(mineToggle.dataset.lmMineToggle),panel=document.getElementById(mineToggle.getAttribute('aria-controls')),expanded=mineToggle.getAttribute('aria-expanded')==='true';if(expanded)expandedCourseMines.delete(index);else expandedCourseMines.add(index);mineToggle.setAttribute('aria-expanded',String(!expanded));mineToggle.setAttribute('aria-label',ui(expanded?'expand':'collapse',{value:`${targetName()} ${ui('mine')} ${index+1}`}));const symbol=mineToggle.querySelector('span');if(symbol)symbol.textContent=expanded?'▼':'▲';if(panel)panel.hidden=expanded;mineToggle.closest('.lm-expedition-mine')?.classList.toggle('expanded',!expanded);return;}
    if(courseLesson){event.preventDefault();event.stopImmediatePropagation();startCourseLesson(courseLesson.dataset.lmCourseSection,Number(courseLesson.dataset.lmCourseLesson),Number(courseLesson.dataset.lmCourseMine));return;}
    if(rock){event.preventDefault();event.stopImmediatePropagation();renderFoundationQuestion();return;}
    if(quick){event.preventDefault();event.stopImmediatePropagation();if(activePreviewQuestion)document.getElementById('challengeArea')?.scrollIntoView({behavior:'smooth',block:'center'});else renderFoundationQuestion();return;}
    if(voiceTest){event.preventDefault();event.stopImmediatePropagation();speakTarget(FOUNDATION_CONCEPTS[0].forms[learning]);}
  }
  function openFlow(){
    const settings=currentSettings();known=settings.known||'en';learning=settings.learning||'ja';
    const originalPlacement=document.getElementById('placementOverlay');originalPlacement?.classList.remove('open');originalPlacement?.setAttribute('aria-hidden','true');
    overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');renderLanguages();
  }
  function closeFlow(){overlay.classList.remove('open');overlay.setAttribute('aria-hidden','true');}
  function scheduleGuideAfterJapanesePlacement(event){
    if(!event.target.closest?.('#beginJourneyBtn,#acceptPlacementBtn'))return;
    setTimeout(openPostPlacementGuide,340);
  }
  function showToast(message){toast.textContent=message;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),4500);}
  function multilingualAdminAllowed(){return window.japaneseMinerIsDeveloperSession?.()===true;}
  function nonJapaneseLanguageIds(){return Object.keys(LANGUAGES).filter(id=>id!=='ja');}
  function completedLanguageProgress(languageId,existing={}){
    const data=multilingualCourseData(),courseMastery={...(existing.courseMastery||{})},mineXpByMine={...(existing.mineXpByMine||{})},bossDefeatedByMine={...(existing.bossDefeatedByMine||{})},bossBestByMine={...(existing.bossBestByMine||{})},reviewCheckpoints={...(existing.reviewCheckpoints||{})};
    (ALPHABET_SYSTEMS[languageId]?.units||[]).forEach(item=>courseMastery[courseMasteryId('alphabet',item)]=100);
    [['vocabulary',data.vocabulary],['grammar',data.grammar],['sentences',data.sentences]].forEach(([section,items])=>(items||[]).forEach(item=>courseMastery[courseMasteryId(section,item)]=100));
    for(let mine=0;mine<=6;mine++){
      mineXpByMine[mine]=Math.max(MULTILINGUAL_BOSS_XP_REQUIREMENT,Number(mineXpByMine[mine])||0);bossDefeatedByMine[mine]=true;bossBestByMine[mine]=100;
      if(mine>0)['vocabulary','grammar','sentences'].forEach(section=>{const lessons=courseSectionLessonsFor(languageId,section,mine);for(let evenLesson=2;evenLesson<=lessons.length;evenLesson+=2)reviewCheckpoints[courseReviewKey(mine,section,evenLesson)]={best:100,lastScore:100,attempts:1,passed:true,passedAt:Date.now(),adminUnlocked:true};});
    }
    return {...existing,courseMastery,mineXpByMine,bossDefeatedByMine,bossBestByMine,reviewCheckpoints,selectedMine:6,activeBoss:null,xp:Math.max(1750,Number(existing.xp)||0)};
  }
  function refreshAfterAdmin(settings){
    clearCourseBossClock();clearCourseReviewClock();activePreviewQuestion=null;multilingualBoss=null;multilingualReviewQuiz=null;applyCourse(settings);expandedCourseMines.clear();for(let mine=0;mine<=6;mine++)expandedCourseMines.add(mine);
    const hub=document.getElementById('v5Content');if(hub){delete hub.dataset.lmLearning;delete hub.dataset.lmExpeditionPreview;syncExpeditionHub();}updateFoundationProgress();
  }
  function adminUnlockAllLanguages(){
    if(!multilingualAdminAllowed())return false;const settings=currentSettings();nonJapaneseLanguageIds().forEach(id=>{settings.progress[id]=completedLanguageProgress(id,settings.progress[id]||{});settings.placements[id]={status:'tested',score:10,total:10,recommendedXp:100,completedAt:Date.now(),adminUnlocked:true};});saveSettings(settings);refreshAfterAdmin(settings);return true;
  }
  function adminResetLanguage(languageId){
    if(!multilingualAdminAllowed()||!LANGUAGES[languageId]||languageId==='ja')return false;const settings=currentSettings();delete settings.progress[languageId];delete settings.placements[languageId];delete settings.guides[languageId];saveSettings(settings);refreshAfterAdmin(settings);return true;
  }
  function adminResetAllLanguages(){
    if(!multilingualAdminAllowed())return false;const settings=currentSettings();nonJapaneseLanguageIds().forEach(id=>{delete settings.progress[id];delete settings.placements[id];delete settings.guides[id];});saveSettings(settings);refreshAfterAdmin(settings);return true;
  }
  function adminResetBossesAndReviews(){
    if(!multilingualAdminAllowed())return false;const settings=currentSettings();nonJapaneseLanguageIds().forEach(id=>{const progress=settings.progress[id];if(!progress)return;progress.bossDefeatedByMine={};progress.bossBestByMine={};progress.bossFastestByMine={};progress.bossRewardClaimsByMine={};progress.reviewCheckpoints={};progress.activeBoss=null;progress.selectedMine=0;});saveSettings(settings);refreshAfterAdmin(settings);return true;
  }
  function cloneSettings(value){try{return structuredClone(value);}catch{try{return JSON.parse(JSON.stringify(value));}catch{return {};}}}
  function resetSettingsSnapshot(source,target){
    target=String(target||'course:current');const settings=normalizeSettings(cloneSettings(source)),selectedLanguage=target==='course:current'||target==='placement:current'?settings.learning:target.startsWith('course:')?target.split(':')[1]:'';
    const resetLanguage=id=>{if(!LANGUAGES[id])return;delete settings.placements[id];delete settings.guides[id];if(id!=='ja')delete settings.progress[id];};
    if(target==='course:current')resetLanguage(selectedLanguage);
    else if(target.startsWith('course:'))resetLanguage(selectedLanguage);
    else if(target==='courses:all'||target==='profile'){settings.placements={};settings.guides={};nonJapaneseLanguageIds().forEach(id=>delete settings.progress[id]);}
    else if(target==='placement:current')delete settings.placements[selectedLanguage];
    else if(target==='placements:all')settings.placements={};
    else if(target==='bosses')nonJapaneseLanguageIds().forEach(id=>{const progress=settings.progress[id];if(!progress)return;progress.bossDefeatedByMine={};progress.bossBestByMine={};progress.bossFastestByMine={};progress.bossRewardClaimsByMine={};progress.reviewCheckpoints={};progress.activeBoss=null;progress.selectedMine=0;});
    return {settings,learning:selectedLanguage||settings.learning,target};
  }
  function adminResetPlacement(languageId){
    if(!multilingualAdminAllowed()||!LANGUAGES[languageId])return false;const settings=currentSettings();delete settings.placements[languageId];saveSettings(settings);refreshAfterAdmin(settings);return true;
  }
  function adminResetAllPlacements(){if(!multilingualAdminAllowed())return false;const result=resetSettingsSnapshot(currentSettings(),'placements:all');saveSettings(result.settings);refreshAfterAdmin(result.settings);return true;}
  function adminResetForAccount(targetAccountKey,target){
    if(!multilingualAdminAllowed()||!String(targetAccountKey||''))return false;const result=resetSettingsSnapshot(readSettingsFor(targetAccountKey),target);saveSettingsFor(targetAccountKey,result.settings);if(targetAccountKey===accountKey())refreshAfterAdmin(result.settings);return {...result,accountKey:targetAccountKey};
  }
  function adminCourseStatus(languageId=learning){
    if(!multilingualAdminAllowed()||languageId==='ja'||!LANGUAGES[languageId])return null;const progress=currentSettings().progress[languageId]||{},bosses=Array.from({length:7},(_,mine)=>progress.bossDefeatedByMine?.[mine]===true&&Number(progress.bossBestByMine?.[mine])===100),expectedMastery=(ALPHABET_SYSTEMS[languageId]?.units||[]).length+Object.values(multilingualCourseData()).filter(Array.isArray).reduce((sum,items)=>sum+items.length,0);return {languageId,bossesDefeated:bosses.filter(Boolean).length,minesUnlocked:1+bosses.slice(0,6).filter(Boolean).length,masteredItems:Object.values(progress.courseMastery||{}).filter(value=>Number(value)>=100).length,expectedMastery};
  }
  function courseArcadeLesson(mineIndex=selectedCourseMine,section=selectedCourseSection,lesson=selectedCourseLesson){
    if(fullJapaneseCourse()||section==='boss')return null;mineIndex=Number(mineIndex)||0;lesson=Number(lesson)||0;const items=courseSectionLessons(section,mineIndex)[lesson]||[],pairs=[];
    items.forEach((item,index)=>{const learn=section==='alphabet'?item?.symbol:item?.forms?.[learning],meaning=section==='alphabet'?item?.name:item?.forms?.[known];if(learn&&meaning&&String(learn)!==String(meaning))pairs.push({id:`course-${mineIndex}-${section}-${lesson}-${item?.id??item?.symbol??index}`,learn:String(learn),meaning:String(meaning)});});
    if(!pairs.length)return null;const sectionName=section==='alphabet'?(ALPHABET_SYSTEMS[learning]?.name||sectionLabel(section)):sectionLabel(section);return {key:`course:${mineIndex}:${section}:${lesson}`,learning,known,mine:mineIndex,section,lesson,label:`${targetName()} Â· ${sectionName} Â· ${ui('lesson',{number:lesson+1})}`,pairs};
  }
  function courseArcadeLessonOptions(){
    if(fullJapaneseCourse())return[];const options=[],maxMine=travelCourseActive()?0:6;
    for(let mineIndex=0;mineIndex<=maxMine;mineIndex++){if(!courseMineUnlocked(mineIndex))continue;courseMineSections(mineIndex).filter(section=>section!=='boss').forEach(section=>courseSectionLessons(section,mineIndex).forEach((_,lesson)=>{if(!courseLessonUnlocked(section,lesson,mineIndex))return;const record=courseArcadeLesson(mineIndex,section,lesson);if(record)options.push({key:record.key,label:record.label});}));}
    return options;
  }
  function selectCourseArcadeLesson(key){
    const match=/^course:(\d+):([a-z]+):(\d+)$/.exec(String(key||''));if(!match||fullJapaneseCourse())return false;const mineIndex=Number(match[1]),section=match[2],lesson=Number(match[3]);if(!courseMineUnlocked(mineIndex)||section==='boss'||!courseLessonUnlocked(section,lesson,mineIndex)||!courseSectionLessons(section,mineIndex)[lesson])return false;
    selectedCourseMine=mineIndex;selectedCourseSection=section;selectedCourseLesson=lesson;activePreviewQuestion=null;const progress=languageProgress();progress.selectedMine=mineIndex;progress.selectedSection=section;progress.selectedLesson=lesson;saveLanguageProgress(progress);expandedCourseMines.add(mineIndex);updateFoundationProgress();return true;
  }
  window.LanguageMinerCourseAdmin=Object.freeze({unlockAll:adminUnlockAllLanguages,resetLanguage:adminResetLanguage,resetAll:adminResetAllLanguages,resetBossesAndReviews:adminResetBossesAndReviews,resetPlacement:adminResetPlacement,resetAllPlacements:adminResetAllPlacements,resetForAccount:adminResetForAccount,currentLanguage:()=>multilingualAdminAllowed()?learning:null,status:adminCourseStatus});
  window.LanguageMinerCourseCloud=Object.freeze({exportCurrent:()=>cloneSettings(currentSettings()),importCurrent:value=>{const settings=normalizeSettings(cloneSettings(value));saveSettings(settings);refreshAfterAdmin(settings);return settings;},resetSnapshot:(value,target)=>resetSettingsSnapshot(value,target)});
  window.LanguageMinerCourseLesson=Object.freeze({current:()=>courseArcadeLesson(),options:courseArcadeLessonOptions,select:selectCourseArcadeLesson});
  window.LanguageMinerCourseWriting=Object.freeze({
    currentLanguage:()=>learning,
    languageInfo:(languageId=learning)=>cloneSettings(LANGUAGES[languageId]||LANGUAGES.en),
    alphabetSystem:(languageId=learning)=>cloneSettings(ALPHABET_SYSTEMS[languageId]||null)
  });
  function build(){
    overlay=document.createElement('div');overlay.id='lmMultilingualOverlay';overlay.className='lm-multilingual-overlay';overlay.setAttribute('aria-hidden','true');overlay.innerHTML=`<section class="lm-multilingual-card" role="dialog" aria-modal="true" aria-labelledby="lmFlowTitle"><header class="lm-flow-head"><div id="lmFlowIcon" class="lm-flow-icon">🌐</div><div class="lm-flow-copy"><h2 id="lmFlowTitle">Choose your Language Miner course</h2><p id="lmFlowCopy"></p></div><button id="lmFlowClose" class="lm-flow-close" type="button" aria-label="Close language setup">×</button></header><div class="lm-flow-progress" aria-label="Language setup progress"><i class="active"></i><i></i><i></i></div><div id="lmFlowContent"></div></section>`;document.body.appendChild(overlay);
    toast=document.createElement('div');toast.className='lm-preview-toast';toast.setAttribute('role','status');document.body.appendChild(toast);
    content=document.getElementById('lmFlowContent');title=document.getElementById('lmFlowTitle');copy=document.getElementById('lmFlowCopy');icon=document.getElementById('lmFlowIcon');indicator=document.getElementById('lmCourseIndicator');changeButton=document.getElementById('lmChangeLanguageBtn');
    document.getElementById('lmFlowClose').addEventListener('click',closeFlow);changeButton?.addEventListener('click',openFlow);document.addEventListener('click',handleCourseControls,true);document.addEventListener('click',scheduleGuideAfterJapanesePlacement);window.openLanguageMinerTranslatedGuide=()=>{openPostPlacementGuide(true);return true;};ensureExpeditionHubObserver();applyCourse();
    const timer=setInterval(()=>{if(!signedIn())return;applyCourse();if(!openedAutomatically&&!localStorage.getItem(STORAGE_PREFIX+accountKey())){openedAutomatically=true;openFlow();}else if(!openedAutomatically){openedAutomatically=true;}clearInterval(timer);},350);
    setInterval(()=>{if(signedIn()&&!overlay.classList.contains('open'))applyCourse();},800);
    window.addEventListener('lm-cloud-session-changed',()=>{openedAutomatically=false;});
  }
  window.addEventListener('DOMContentLoaded',build);
})();
