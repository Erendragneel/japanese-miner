// Patreon benefit copy refreshed for v6.4.125.
// Loaded after the base interface packs so each known-language setting gets the current entitlements.
(()=>{
  'use strict';
  const refresh={
  "en": {
    "tier1Desc": "Access character outfits, hair, hats, accessories, rock skins, mine backgrounds, pickaxe skins, full-page wallpapers, color themes, and achievement titles. Purchased cosmetics stay in the player's Bag. Community extras include the Discord role, behind-the-scenes posts, development updates, polls, and optional Supporter credits.",
    "tier2Desc": "Discover 11 named companions. Adopt and equip one, manage Show, Hide, or Choose from the Shop, and receive its active bonus for XP, supplies, Smart Review, Guardian rewards, treasure, or shop prices.",
    "tier3Desc": "Build five Settlement buildings through 25 permanent upgrades, decorations, and lasting bonuses. Claim Memory Mine, Crystal Match, and Star Word Defender without spending Nuggets, choose any unlocked lesson inside each game, and save personal-best moves, completion times, and scores."
  },
  "es": {
    "tier1Desc": "Acceda a trajes de personajes, cabello, sombreros, accesorios, diseños de rocas, fondos de minas, diseños de picos, fondos de pantalla de página completa, temas de color y títulos de logros. Los cosméticos comprados permanecen en la bolsa del jugador. Los extras de la comunidad incluyen el rol de Discord, publicaciones detrás de escena, actualizaciones de desarrollo, encuestas y créditos de apoyo opcionales.",
    "tier2Desc": "Descubre 11 compañeros con nombre. Adopte y equipe uno, administre Mostrar, Ocultar o Elegir en la Tienda y reciba su bonificación activa por XP, suministros, Smart Review, recompensas de Guardián, tesoros o precios de la tienda.",
    "tier3Desc": "Construye cinco edificios de asentamiento a través de 25 mejoras permanentes, decoraciones y bonificaciones duraderas. Reclama Memory Mine, Crystal Match y Star Word Defender sin gastar Nuggets, elige cualquier lección desbloqueada dentro de cada juego y guarda tus mejores movimientos personales, tiempos de finalización y puntuaciones."
  },
  "ru": {
    "tier1Desc": "Получите доступ к костюмам персонажей, прическам, головным уборам, аксессуарам, скинам камней, фону шахт, скинам кирки, полностраничным обоям, цветовым темам и названиям достижений. Купленная косметика остается в Сумке игрока. Дополнительные возможности сообщества включают роль в Discord, закулисные публикации, обновления разработки, опросы и дополнительные кредиты сторонника.",
    "tier2Desc": "Откройте для себя 11 именных спутников. Возьмите и оснастите его, управляйте «Показать», «Спрятать» или «Выбрать в магазине» и получите активный бонус в виде опыта, расходных материалов, умного обзора, наград Стража, сокровищ или цен в магазине.",
    "tier3Desc": "Постройте пять зданий поселений, используя 25 постоянных улучшений, украшений и постоянных бонусов. Получите «Шахту памяти», «Кристальную спичку» и «Защитника звездного слова», не тратя самородки, выберите любой разблокированный урок в каждой игре и сохраните свои лучшие ходы, время выполнения и результаты."
  },
  "ja": {
    "tier1Desc": "キャラクターの衣装、髪、帽子、アクセサリー、岩のスキン、鉱山の背景、つるはしのスキン、フルページの壁紙、カラーテーマ、実績タイトルにアクセスします。購入した化粧品はプレイヤーのバッグに残ります。コミュニティの追加機能には、Discord の役割、舞台裏の投稿、開発の最新情報、投票、およびオプションのサポーター クレジットが含まれます。",
    "tier2Desc": "11 人の名前付きコンパニオンを発見します。採用して装備し、表示、非表示、またはショップからの選択を管理し、XP、消耗品、スマート レビュー、ガーディアンの報酬、宝物、またはショップの価格に対するアクティブなボーナスを受け取ります。",
    "tier3Desc": "25 の恒久的なアップグレード、装飾、永続的なボーナスを通じて 5 つの居住地の建物を建設します。ナゲットを消費せずにメモリー マイン、クリスタル マッチ、スター ワード ディフェンダーを獲得し、各ゲーム内のロック解除されたレッスンを選択して、自己ベストの動き、完了時間、スコアを保存します。"
  },
  "ko": {
    "tier1Desc": "캐릭터 의상, 헤어, 모자, 액세서리, 바위 스킨, 광산 배경, 곡괭이 스킨, 전체 페이지 배경화면, 색상 테마 및 업적 제목에 액세스하세요. 구매한 화장품은 플레이어의 가방에 보관됩니다. 커뮤니티 추가 기능에는 Discord 역할, 비하인드 스토리 게시물, 개발 업데이트, 여론 조사 및 선택적 Supporter 크레딧이 포함됩니다.",
    "tier2Desc": "지명된 동료 11명을 발견하세요. 하나를 채택하고 장착하고, 상점에서 표시, 숨기기 또는 선택을 관리하고 XP, 소모품, Smart Review, Guardian 보상, 보물 또는 상점 가격에 대한 활성 보너스를 받으세요.",
    "tier3Desc": "25개의 영구 업그레이드, 장식 및 지속적인 보너스를 통해 5개의 정착지 건물을 건설하세요. Nuggets을 사용하지 않고도 Memory Mine, Crystal Match 및 Star Word Defender를 획득하고, 각 게임 내에서 잠금 해제된 레슨을 선택하고, 개인 최고 수, 완료 시간 및 점수를 저장하세요."
  },
  "zh": {
    "tier1Desc": "访问角色服装、头发、帽子、配饰、岩石皮肤、矿山背景、镐皮肤、整页壁纸、颜色主题和成就标题。购买的化妆品会留在玩家的包里。社区附加功能包括 Discord 角色、幕后帖子、开发更新、民意调查和可选的支持者积分。",
    "tier2Desc": "发现 11 位指定同伴。采用并装备一个，管理显示、隐藏或从商店中选择，并获得 XP、补给品、智能评论、守护者奖励、宝藏或商店价格的主动奖励。",
    "tier3Desc": "通过 25 项永久升级、装饰和持久奖励，建造五座定居点建筑。无需花费金块即可领取记忆矿井、水晶匹配和星言防御者，选择每个游戏中的任何解锁课程，并保存个人最佳动作、完成时间和分数。"
  },
  "it": {
    "tier1Desc": "Accedi agli abiti dei personaggi, ai capelli, ai cappelli, agli accessori, alle skin delle rocce, agli sfondi delle miniere, alle skin dei picconi, agli sfondi a pagina intera, ai temi colorati e ai titoli degli obiettivi. I cosmetici acquistati rimangono nella borsa del giocatore. Gli extra della community includono il ruolo Discord, post dietro le quinte, aggiornamenti sullo sviluppo, sondaggi e crediti di Sostenitore opzionali.",
    "tier2Desc": "Scopri 11 compagni con nome. Adotta ed equipaggia uno, gestisci Mostra, Nascondi o Scegli dal Negozio e ricevi il suo bonus attivo per XP, materiali, Smart Review, premi Guardiano, tesoro o prezzi del negozio.",
    "tier3Desc": "Costruisci cinque edifici dell'insediamento attraverso 25 potenziamenti permanenti, decorazioni e bonus duraturi. Richiedi Memory Mine, Crystal Match e Star Word Defender senza spendere Nuggets, scegli qualsiasi lezione sbloccata all'interno di ogni gioco e salva le migliori mosse personali, i tempi di completamento e i punteggi."
  },
  "fr": {
    "tier1Desc": "Accédez aux tenues, cheveux, chapeaux, accessoires des personnages, aux skins de rock, aux arrière-plans de mines, aux skins de pioche, aux fonds d'écran pleine page, aux thèmes de couleurs et aux titres de réussite. Les produits cosmétiques achetés restent dans le sac du joueur. Les extras de la communauté incluent le rôle Discord, les publications en coulisses, les mises à jour de développement, les sondages et les crédits de supporteur facultatifs.",
    "tier2Desc": "Découvrez 11 compagnons nommés. Adoptez et équipez-en un, gérez Afficher, Masquer ou Choisir dans la boutique et recevez son bonus actif pour l'XP, les fournitures, la Smart Review, les récompenses du Gardien, le trésor ou les prix de la boutique.",
    "tier3Desc": "Construisez cinq bâtiments de colonie grâce à 25 améliorations permanentes, décorations et bonus durables. Réclamez Memory Mine, Crystal Match et Star Word Defender sans dépenser de Nuggets, choisissez n'importe quelle leçon débloquée dans chaque jeu et enregistrez vos meilleurs mouvements, temps de réalisation et scores."
  },
  "de": {
    "tier1Desc": "Greifen Sie auf Charakter-Outfits, Haare, Hüte, Accessoires, Fels-Skins, Minen-Hintergründe, Spitzhacken-Skins, ganzseitige Hintergrundbilder, Farbthemen und Erfolgstitel zu. Gekaufte Kosmetika bleiben in der Tasche des Spielers. Zu den Community-Extras gehören die Discord-Rolle, Beiträge hinter den Kulissen, Entwicklungsupdates, Umfragen und optionale Unterstützer-Credits.",
    "tier2Desc": "Entdecken Sie 11 namentlich genannte Gefährten. Adoptiere einen und rüste ihn aus, verwalte „Anzeigen“, „Verstecken“ oder „Auswählen“ im Shop und erhalte seinen aktiven Bonus für XP, Vorräte, Smart Review, Wächter-Belohnungen, Schätze oder Shop-Preise.",
    "tier3Desc": "Bauen Sie fünf Siedlungsgebäude mit 25 permanenten Upgrades, Dekorationen und dauerhaften Boni. Beanspruchen Sie Memory Mine, Crystal Match und Star Word Defender, ohne Nuggets auszugeben, wählen Sie in jedem Spiel eine beliebige freigeschaltete Lektion und speichern Sie persönliche Bestzüge, Abschlusszeiten und Punktestände."
  },
  "pt": {
    "tier1Desc": "Acesse roupas de personagens, cabelos, chapéus, acessórios, skins de rocha, planos de fundo de minas, skins de picareta, papéis de parede de página inteira, temas de cores e títulos de conquistas. Os cosméticos comprados ficam na Bolsa do jogador. Os extras da comunidade incluem a função Discord, postagens de bastidores, atualizações de desenvolvimento, enquetes e créditos opcionais de Apoiador.",
    "tier2Desc": "Descubra 11 companheiros nomeados. Adote e equipe um, gerencie Mostrar, Esconder ou Escolher na Loja e receba seu bônus ativo em XP, suprimentos, Revisão Inteligente, recompensas de Guardiões, tesouros ou preços da loja.",
    "tier3Desc": "Construa cinco edifícios do assentamento por meio de 25 atualizações permanentes, decorações e bônus duradouros. Reivindique Memory Mine, Crystal Match e Star Word Defender sem gastar Nuggets, escolha qualquer lição desbloqueada dentro de cada jogo e salve seus melhores movimentos, tempos de conclusão e pontuações."
  },
  "vi": {
    "tier1Desc": "Truy cập trang phục nhân vật, tóc, mũ, phụ kiện, da đá, hình nền mỏ, da cuốc, hình nền toàn trang, chủ đề màu sắc và tiêu đề thành tích. Mỹ phẩm đã mua sẽ ở trong Túi của người chơi. Các tính năng bổ sung của cộng đồng bao gồm vai trò Discord, bài đăng hậu trường, cập nhật phát triển, cuộc thăm dò ý kiến ​​và tín dụng Người hỗ trợ tùy chọn.",
    "tier2Desc": "Khám phá 11 người bạn đồng hành được đặt tên. Nhận và trang bị một chiếc, quản lý Hiển thị, Ẩn hoặc Chọn từ Cửa hàng và nhận phần thưởng hoạt động của nó cho XP, vật tư, Đánh giá thông minh, phần thưởng Người giám hộ, kho báu hoặc giá cửa hàng.",
    "tier3Desc": "Xây dựng năm tòa nhà định cư thông qua 25 nâng cấp vĩnh viễn, đồ trang trí và phần thưởng lâu dài. Yêu cầu Mỏ bộ nhớ, Crystal Match và Star Word Defender mà không tốn Nuggets, chọn bất kỳ bài học đã mở khóa nào trong mỗi trò chơi và lưu các bước di chuyển, thời gian hoàn thành và điểm số tốt nhất của cá nhân."
  },
  "th": {
    "tier1Desc": "เข้าถึงเสื้อผ้าของตัวละคร ผม หมวก เครื่องประดับ สกินหิน พื้นหลังของเหมือง สกินพลั่ว วอลเปเปอร์แบบเต็มหน้า ธีมสี และชื่อความสำเร็จ เครื่องสำอางที่ซื้อมาจะอยู่ในกระเป๋าของผู้เล่น ความพิเศษของชุมชน ได้แก่ บทบาท Discord, โพสต์เบื้องหลัง, อัปเดตการพัฒนา, โพล และเครดิตผู้สนับสนุนเพิ่มเติม",
    "tier2Desc": "ค้นพบสหายที่มีชื่อ 11 คน เลือกและติดตั้ง จัดการแสดง ซ่อน หรือเลือกจากร้านค้า และรับโบนัสที่ใช้งานอยู่สำหรับ XP, ของใช้จำเป็น, Smart Review, รางวัล Guardian, สมบัติ หรือราคาร้านค้า",
    "tier3Desc": "สร้างอาคารตั้งถิ่นฐานห้าแห่งผ่านการอัปเกรดถาวร การตกแต่ง และโบนัสถาวร 25 รายการ รับ Memory Mine, Crystal Match และ Star Word Defender โดยไม่ต้องใช้นักเก็ต เลือกบทเรียนที่ปลดล็อคในแต่ละเกม และบันทึกการเคลื่อนไหวส่วนตัว เวลาสำเร็จ และคะแนนที่ดีที่สุด"
  },
  "tr": {
    "tier1Desc": "Karakter kıyafetlerine, saçlarına, şapkalarına, aksesuarlarına, kaya görünümlerine, maden arka planlarına, kazma görünümlerine, tam sayfa duvar kağıtlarına, renk temalarına ve başarı başlıklarına erişin. Satın alınan kozmetikler oyuncunun Çantasında kalır. Topluluk ekstraları arasında Discord rolü, kamera arkası gönderileri, geliştirme güncellemeleri, anketler ve isteğe bağlı Destekçi kredileri yer alır.",
    "tier2Desc": "Adlandırılmış 11 yoldaşı keşfedin. Bir tanesini benimseyin ve donatın, Göster, Gizle veya Mağazadan Seç'i yönetin ve XP, sarf malzemeleri, Akıllı İnceleme, Muhafız ödülleri, hazine veya mağaza fiyatları için aktif bonusunu alın.",
    "tier3Desc": "25 kalıcı yükseltme, dekorasyon ve kalıcı bonuslarla beş Yerleşim binası inşa edin. Nuggets harcamadan Memory Mine, Crystal Match ve Star Word Defender'ı alın, her oyunda kilidi açılmış herhangi bir dersi seçin ve kişisel en iyi hamleleri, tamamlama sürelerini ve puanları kaydedin."
  },
  "id": {
    "tier1Desc": "Akses pakaian karakter, rambut, topi, aksesori, kulit batu, latar belakang tambang, kulit beliung, wallpaper satu halaman penuh, tema warna, dan judul pencapaian. Kosmetik yang dibeli tetap berada di Tas pemain. Ekstra komunitas mencakup peran Discord, postingan di belakang layar, pembaruan pengembangan, jajak pendapat, dan kredit Pendukung opsional.",
    "tier2Desc": "Temukan 11 nama sahabat. Adopsi dan lengkapi satu, kelola Tampilkan, Sembunyikan, atau Pilih dari Toko, dan terima bonus aktifnya untuk XP, persediaan, Tinjauan Cerdas, hadiah Penjaga, harta karun, atau harga toko.",
    "tier3Desc": "Bangun lima bangunan Pemukiman melalui 25 peningkatan permanen, dekorasi, dan bonus abadi. Klaim Memory Mine, Crystal Match, dan Star Word Defender tanpa menghabiskan Nuggets, pilih pelajaran apa pun yang tidak terkunci di dalam setiap game, dan simpan gerakan terbaik pribadi, waktu penyelesaian, dan skor."
  },
  "pl": {
    "tier1Desc": "Uzyskaj dostęp do strojów postaci, włosów, czapek, akcesoriów, skórek skał, tła kopalni, skórek kilofów, całostronicowych tapet, motywów kolorystycznych i tytułów osiągnięć. Zakupione kosmetyki pozostają w torbie gracza. Dodatki społecznościowe obejmują rolę na Discordzie, posty zza kulis, aktualizacje dotyczące rozwoju, ankiety i opcjonalne kredyty wspierające.",
    "tier2Desc": "Odkryj 11 nazwanych towarzyszy. Adoptuj i wyposaż jednego, zarządzaj Pokaż, Ukryj lub Wybierz ze Sklepu, a otrzymasz aktywny bonus w postaci PD, zaopatrzenia, Inteligentnego Przeglądu, nagród Strażników, skarbów lub cen w sklepie.",
    "tier3Desc": "Zbuduj pięć budynków osadniczych, korzystając z 25 stałych ulepszeń, dekoracji i trwałych bonusów. Zdobądź Memory Mine, Crystal Match i Star Word Defender bez wydawania Nuggetsów, wybierz dowolną odblokowaną lekcję w każdej grze i zapisuj swoje najlepsze ruchy, czasy ukończenia i wyniki."
  },
  "el": {
    "tier1Desc": "Αποκτήστε πρόσβαση σε ρούχα χαρακτήρων, μαλλιά, καπέλα, αξεσουάρ, ροκ δέρματα, υπόβαθρα, αξίνες, ολοσέλιδες ταπετσαρίες, έγχρωμα θέματα και τίτλους επιτευγμάτων. Τα αγορασμένα καλλυντικά παραμένουν στην τσάντα του παίκτη. Στα πρόσθετα της κοινότητας περιλαμβάνονται ο ρόλος Discord, οι αναρτήσεις στα παρασκήνια, οι ενημερώσεις ανάπτυξης, οι δημοσκοπήσεις και οι προαιρετικοί τίτλοι Υποστηρικτών.",
    "tier2Desc": "Ανακαλύψτε 11 επώνυμους συντρόφους. Υιοθετήστε και εξοπλίστε ένα, διαχειριστείτε Εμφάνιση, Απόκρυψη ή Επιλογή από το Κατάστημα και λάβετε το ενεργό του μπόνους για XP, προμήθειες, Έξυπνη κριτική, ανταμοιβές Guardian, θησαυρό ή τιμές καταστήματος.",
    "tier3Desc": "Κατασκευάστε πέντε κτίρια Settlement μέσω 25 μόνιμων αναβαθμίσεων, διακοσμήσεων και διαρκών μπόνους. Διεκδικήστε το Memory Mine, το Crystal Match και το Star Word Defender χωρίς να ξοδέψετε Nuggets, επιλέξτε οποιοδήποτε ξεκλείδωτο μάθημα μέσα σε κάθε παιχνίδι και αποθηκεύστε τις καλύτερες προσωπικές κινήσεις, χρόνους ολοκλήρωσης και σκορ."
  },
  "uk": {
    "tier1Desc": "Отримайте доступ до одягу персонажів, волосся, капелюхів, аксесуарів, скінів каменів, фонів шахт, скінів кирки, шпалер на всю сторінку, кольорових тем і назв досягнень. Придбана косметика залишається в сумці гравця. Додаткові переваги спільноти включають роль Discord, закулісні публікації, оновлення розробок, опитування та додаткові кредити Supporter.",
    "tier2Desc": "Відкрийте для себе 11 іменованих супутників. Прийміть і екіпіруйте один, керуйте Показати, Приховати або Вибрати з магазину та отримайте його активний бонус за досвід, припаси, Smart Review, винагороди Guardian, скарби або ціни магазину.",
    "tier3Desc": "Побудуйте п’ять будівель Поселення за допомогою 25 постійних покращень, прикрас і довготривалих бонусів. Вимагайте Memory Mine, Crystal Match і Star Word Defender, не витрачаючи самородки, вибирайте будь-який незаблокований урок у кожній грі та зберігайте особисті найкращі ходи, час завершення та бали."
  }
};
  const packs=window.LANGUAGE_MINER_FULL_INTERFACE_TRANSLATIONS;
  if(!packs)return;
  Object.entries(refresh).forEach(([language,values])=>{
    if(packs[language])Object.assign(packs[language],values);
  });
})();
