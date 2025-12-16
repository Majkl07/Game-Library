// Game Database Application
// Data model and state management

class GameDatabase {
    constructor() {
        this.games = this.loadGames();
        this.currentFilter = {
            search: '',
            platform: '',
            genre: '',
            status: ''
        };
        this.editingGameId = null;
    }

    // Load games from localStorage
    loadGames() {
        const saved = localStorage.getItem('gameDatabase');
        if (saved) {
            return JSON.parse(saved);
        }
        // Sample data with 50+ real Steam games
        return [
            {
                id: this.generateId(),
                title: 'The Witcher 3: Wild Hunt',
                platform: 'PC',
                genre: 'RPG',
                year: 2015,
                rating: 5,
                review: 'Naprosto úžasná hra s bohatým příběhem, skvělými postavami a obrovským otevřeným světem.',
                description: 'Jako profesionální lovec monster Geralt z Rivie se vydáváte na epickou cestu napříč fantasy světem plným morálních dilemat a nebezpečných monster. Hledejte svou adoptivní dceru Ciri a odhalte tajemství Divoké honby.',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg',
                status: 'Completed'
            },
            {
                id: this.generateId(),
                title: 'Red Dead Redemption 2',
                platform: 'Multi-platform',
                genre: 'Action',
                year: 2018,
                rating: 5,
                review: 'Mistrovské dílo od Rockstar Games. Příběh Arthura Morgana je dojemný a svět hry je neuvěřitelně detailní.',
                description: 'Amerika, 1899. Éra divokého západu se chýlí ke konci. Po neúspěšné loupežné akci v městě Blackwater je gang Dutche van der Lindeho nucen prchat. S federálními agenty a nejlepšími lovci odměn v patách musí gang loupit, krást a bojovat napříč drsným srdcem Ameriky.',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg',
                status: 'Owned'
            },
            {
                id: this.generateId(),
                title: 'Hollow Knight',
                platform: 'Nintendo Switch',
                genre: 'Platformer',
                year: 2017,
                rating: 4,
                review: 'Krásný metroidvania titul s výbornou atmosférou a náročnou obtížností.',
                description: 'Sestupte do podzemního království hmyzu, prozkoumejte starobylé jeskyně, bojujte s poškozenými tvory a spřátelte se s podivnými hmyzími bytostmi v klasickém 2D akčním dobrodružství.',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/367520/header.jpg',
                status: 'Completed'
            },
            {
                id: this.generateId(),
                title: 'Grand Theft Auto V',
                platform: 'Multi-platform',
                genre: 'Action',
                year: 2013,
                rating: 5,
                review: 'Ikonická open-world hra. Los Santos je obrovský a plný života.',
                description: 'Když mladý pouliční podvodník, vyřazený bankovní lupič a děsivý psychopat se zapletou s nejstrašnějšími a nejšílenějšími postavami podsvětí, americké vlády a zábavního průmyslu, musí provést sérii nebezpečných loupežných akcí, aby přežili.',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg',
                status: 'Owned'
            },
            {
                id: this.generateId(),
                title: 'Counter-Strike 2',
                platform: 'PC',
                genre: 'FPS',
                year: 2023,
                rating: 5,
                review: 'Nová verze legendárního CS:GO na Source 2 enginu.',
                description: 'Desetiletí trvající hra Counter-Strike dostává největší technologický skok ve své historii. Counter-Strike 2 je kompletní přepracování hry na Source 2 enginu s vylepšenou grafikou, fyzikou kouře a novými herními mechanismy.',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg',
                status: 'Installed'
            },
            {
                id: this.generateId(),
                title: 'Cyberpunk 2077',
                platform: 'PC',
                genre: 'RPG',
                year: 2020,
                rating: 4,
                review: 'Po mnoha patchích je to skvělá hra. Night City je neuvěřitelně detailní.',
                description: 'Cyberpunk 2077 je open-world akční adventura odehrávající se v Night City, megalopoli posedlé mocí, glamourem a modifikacemi těla. Hrajete za V, žoldáka na zakázku, který hledá jedinečný implantát - klíč k nesmrtelnosti.',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg',
                status: 'Installed'
            },
            {
                id: this.generateId(),
                title: 'Elden Ring',
                platform: 'Multi-platform',
                genre: 'RPG',
                year: 2022,
                rating: 5,
                review: 'FromSoftware v kombinaci s George R.R. Martinem vytvořili masterpiece.',
                description: 'Nová fantasy akční RPG hra. Povstaňte, Poskvrněný, a nechte se vést milostí, abyste mohli ovládnout moc Eldenského prstenu a stát se Eldenskými Pány v Mezizemí.',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg',
                status: 'Wishlist'
            },
            {
                id: this.generateId(),
                title: 'Portal 2',
                platform: 'PC',
                genre: 'Puzzle',
                year: 2011,
                rating: 5,
                review: 'Geniální pokračování s kooperativním módem a skvělým humorem.',
                description: 'Portal 2 vás vtáhne zpět do Aperture Science Laboratories s ještě více hlavolamovými výzvami, novými herními mechanikami a dvojnásobkem zábavy. Kooperativní mód přidává zcela novou dimenzi.',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/620/header.jpg',
                status: 'Completed'
            },
            {
                id: this.generateId(),
                title: 'Stardew Valley',
                platform: 'Multi-platform',
                genre: 'Simulation',
                year: 2016,
                rating: 5,
                review: 'Relaxační farmářská simulace s nekonečnou hratelností.',
                description: 'Převezmete starou farmu svého dědečka ve Stardew Valley. Vyzbrojeni ručními nástroji a několika mincemi se vydáváte začít svůj nový život. Dokážete se naučit žít ze země a proměnit tato zarostlá pole v prosperující domov?',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/413150/header.jpg',
                status: 'Owned'
            },
            {
                id: this.generateId(),
                title: 'Half-Life 2',
                platform: 'PC',
                genre: 'FPS',
                year: 2004,
                rating: 5,
                review: 'Legendární FPS, které definovalo žánr.',
                description: 'Vraťte se do role Gordona Freemana, který musí čelit důsledkům svých akcí v Black Mesa a bojovat proti mimozemské invazi Combine, která zotročila lidstvo.',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/220/header.jpg',
                status: 'Completed'
            },
            {
                id: this.generateId(),
                title: 'Dark Souls III',
                platform: 'Multi-platform',
                genre: 'RPG',
                year: 2016,
                rating: 5,
                review: 'Náročná, ale neuvěřitelně odměňující hra.',
                description: 'Když plameny slábnou a svět se hroutí, vydejte se na cestu do temného a atmosférického světa plného epických bossů a náročných soubojů. Pouze nejodvážnější přežijí.',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/374320/header.jpg',
                status: 'Owned'
            },
            {
                id: this.generateId(),
                title: 'Terraria',
                platform: 'Multi-platform',
                genre: 'Adventure',
                year: 2011,
                rating: 4,
                review: '2D sandbox s nekonečnými možnostmi.',
                description: 'Kopejte, bojujte, prozkoumávejte a stavte! Nic není nemožné v tomto akčním dobrodružném sandboxu. Svět je vaším plátnem a země sama je vaším barvami!',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/105600/header.jpg',
                status: 'Installed'
            },
            {
                id: this.generateId(),
                title: 'Hades',
                platform: 'Multi-platform',
                genre: 'Action',
                year: 2020,
                rating: 5,
                review: 'Perfektní roguelike s úžasným příběhem.',
                description: 'Prolomte se z podsvětí jako syn Háda v tomto roguelike dungeon crawleru od tvůrců Bastion a Transistor. Každá smrt vás posílí a přiblíží k úniku.',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1145360/header.jpg',
                status: 'Completed'
            },
            {
                id: this.generateId(),
                title: 'Minecraft',
                platform: 'Multi-platform',
                genre: 'Simulation',
                year: 2011,
                rating: 5,
                review: 'Nekonečná kreativita a zábava.',
                description: 'Minecraft je hra o umísťování bloků a dobrodružství. Prozkoumávejte náhodně generované světy a stavte úžasné věci od nejjednodušších domů po nejvelkolepější hrady.',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1794680/header.jpg',
                status: 'Owned'
            },
            {
                id: this.generateId(),
                title: 'Sekiro: Shadows Die Twice',
                platform: 'Multi-platform',
                genre: 'Action',
                year: 2019,
                rating: 5,
                review: 'Brutálně náročná samurajská akce.',
                description: 'Prozkoumejte Japonsko období Sengoku na konci roku 1500, éru brutálního konfliktu, jako jednoruký vlk, válečník na pokraji smrti. Čelíte nepřátelům v smrtelném souboji.',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/814380/header.jpg',
                status: 'Wishlist'
            },
            {
                id: this.generateId(),
                title: 'Doom Eternal',
                platform: 'Multi-platform',
                genre: 'FPS',
                year: 2020,
                rating: 5,
                review: 'Adrenalinová jízda plná akce.',
                description: 'Peklo\'s armády vtrhly na Zemi. Staňte se Slayerem v epické single-player kampani a kombinujte ikonické zbraně a schopnosti pro demolici démonů.',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/782330/header.jpg',
                status: 'Installed'
            },
            {
                id: this.generateId(),
                title: 'Celeste',
                platform: 'Multi-platform',
                genre: 'Platformer',
                year: 2018,
                rating: 5,
                review: 'Emotivní příběh s perfektní platformovou mechanikou.',
                description: 'Pomozte Madeline přežít její vnitřní démony na její cestě na vrchol hory Celeste v tomto super těžkém platformeru od tvůrců TowerFall.',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/504230/header.jpg',
                status: 'Completed'
            },
            {
                id: this.generateId(),
                title: 'The Elder Scrolls V: Skyrim',
                platform: 'Multi-platform',
                genre: 'RPG',
                year: 2011,
                rating: 5,
                review: 'Epické fantasy RPG s nekonečným obsahem.',
                description: 'Skyrim je pátá hra v sérii Elder Scrolls. Draci se vrátili do Tamrielu a vy jste jediný, kdo jim může čelit. Prozkoumejte obrovský otevřený svět a staňte se legendou.',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/489830/header.jpg',
                status: 'Owned'
            },
            {
                id: this.generateId(),
                title: 'Bioshock Infinite',
                platform: 'Multi-platform',
                genre: 'FPS',
                year: 2013,
                rating: 4,
                review: 'Úžasný příběh a atmosféra.',
                description: 'Přiveďte nás ptáka a vymažte dluh. Jediná věc, kterou musíte udělat, je najít dívku. Elizabeth. Jednoduché, že? Vydejte se do plovoucího města Columbia a odhalte jeho temná tajemství.',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/8870/header.jpg',
                status: 'Completed'
            },
            {
                id: this.generateId(),
                title: 'Factorio',
                platform: 'PC',
                genre: 'Strategy',
                year: 2020,
                rating: 5,
                review: 'Návyková tovární simulace.',
                description: 'Factorio je hra o budování továren a automatizaci výroby. Stavte složité výrobní linky, prozkoumávejte a využívejte zdroje a bráňte svou továrnu před nepřátelskými tvory.',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/427520/header.jpg',
                status: 'Owned'
            },
            {
                id: this.generateId(),
                title: 'Dishonored 2',
                platform: 'Multi-platform',
                genre: 'Action',
                year: 2016,
                rating: 4,
                review: 'Skvělá stealth hra s mnoha možnostmi.',
                description: 'Vraťte se do mystického města Dunwall nebo prozkoumejte exotické Karnaca. Hrajte jako Emily Kaldwin nebo Corvo Attano a využijte nadpřirozené schopnosti k odstranění nepřátel.',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/403640/header.jpg',
                status: 'Wishlist'
            },
            {
                id: this.generateId(),
                title: 'Ori and the Will of the Wisps',
                platform: 'Multi-platform',
                genre: 'Platformer',
                year: 2020,
                rating: 5,
                review: 'Nádherná vizuální a hudební zkušenost.',
                description: 'Vydejte se na nové dobrodružství v úchvatném světě plném nových přátel a nepřátel. Ori musí využít své schopnosti k záchraně lesa Niwen.',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1057090/header.jpg',
                status: 'Completed'
            },
            {
                id: this.generateId(),
                title: 'Resident Evil 4',
                platform: 'Multi-platform',
                genre: 'Horror',
                year: 2023,
                rating: 5,
                review: 'Perfektní remake klasiky.',
                description: 'Přežijte a unikněte z děsivého evropského města plného kultistů. Leon S. Kennedy musí zachránit dceru prezidenta v tomto remaku legendární survival horror hry.',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/header.jpg',
                status: 'Installed'
            },
            {
                id: this.generateId(),
                title: 'Baldur\'s Gate 3',
                platform: 'Multi-platform',
                genre: 'RPG',
                year: 2023,
                rating: 5,
                review: 'Nejlepší RPG posledních let.',
                description: 'Shromážděte svou družinu a vraťte se do Forgotten Realms v příběhu o přátelství a zradě, oběti a přežití a lákání absolutní moci.',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg',
                status: 'Owned'
            },
            {
                id: this.generateId(),
                title: 'Dead Cells',
                platform: 'Multi-platform',
                genre: 'Action',
                year: 2018,
                rating: 4,
                review: 'Skvělý roguelike s rychlou akcí.',
                description: 'Dead Cells je roguelike metroidvania akční hra. Prozkoumávejte rozsáhlý, neustále se měnící hrad a bojujte s jeho obyvateli v rychlých, brutálních soubojích.',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/588650/header.jpg',
                status: 'Owned'
            },
            {
                id: this.generateId(),
                title: 'God of War',
                platform: 'PlayStation',
                genre: 'Action',
                year: 2022,
                rating: 5,
                review: 'Epický příběh otce a syna.',
                description: 'Jeho pomsta proti bohům Olympu je minulostí. Kratos nyní žije v říši severských bohů a monster. V tomto drsném, nemilosrdném světě musí bojovat o přežití a učit svého syna dělat totéž.',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/header.jpg',
                status: 'Wishlist'
            },
            {
                id: this.generateId(),
                title: 'Undertale',
                platform: 'Multi-platform',
                genre: 'RPG',
                year: 2015,
                rating: 5,
                review: 'Jedinečný příběh s nezapomenutelnými postavami.',
                description: 'Vítejte v podzemí. Navigujte jedinečnými boji založenými na kulkách, kde nemusíte zabít nikoho. Každý nepřítel může být poražen nenásilně.',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/391540/header.jpg',
                status: 'Completed'
            },
            {
                id: this.generateId(),
                title: 'Rocket League',
                platform: 'Multi-platform',
                genre: 'Sports',
                year: 2015,
                rating: 4,
                review: 'Fotbal s auty - geniální koncept.',
                description: 'Rocket League je hybridní hra kombinující arkádový fotbal a vozidlovou mayhem s jednoduchým ovládáním a plynulou fyzikou. Soutěžte v intenzivních online zápasech.',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/252950/header.jpg',
                status: 'Installed'
            },
            {
                id: this.generateId(),
                title: 'Subnautica',
                platform: 'Multi-platform',
                genre: 'Adventure',
                year: 2018,
                rating: 5,
                review: 'Úžasná podvodní explorace.',
                description: 'Sestupte do hlubin cizího oceánu na této planetě. Subnautica je open world survival hra odehrávající se na cizí oceánské planetě. Potopte se do obrovského podvodního světa.',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/264710/header.jpg',
                status: 'Owned'
            },
            {
                id: this.generateId(),
                title: 'Cuphead',
                platform: 'Multi-platform',
                genre: 'Platformer',
                year: 2017,
                rating: 4,
                review: 'Krásná animace ve stylu 30. let.',
                description: 'Cuphead je klasická run and gun akční hra silně zaměřená na boss boje. Inspirovaná kreslených filmů ze 30. let, vizuály a audio jsou pečlivě vytvořeny pomocí stejných technik té doby.',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/268910/header.jpg',
                status: 'Completed'
            },
            {
                id: this.generateId(),
                title: 'Divinity: Original Sin 2',
                platform: 'Multi-platform',
                genre: 'RPG',
                year: 2017,
                rating: 5,
                review: 'Nejlepší tahové RPG.',
                description: 'Nejnovější hra v oceňované sérii Divinity. Shromážděte svou družinu a rozvíjejte vztahy, bojujte s nepřáteli v taktických tahových soubojích a prozkoumávejte bohatý svět plný příběhů.',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/435150/header.jpg',
                status: 'Owned'
            },
            {
                id: this.generateId(),
                title: 'Monster Hunter: World',
                platform: 'Multi-platform',
                genre: 'Action',
                year: 2018,
                rating: 4,
                review: 'Epické lovy obřích monster.',
                description: 'Vítejte v novém světě! Využijte prostředí a ekosystém k lovu obřích monster. Lovte sami nebo v kooperaci až se 3 dalšími hráči.',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/582010/header.jpg',
                status: 'Installed'
            },
            {
                id: this.generateId(),
                title: 'Persona 5 Royal',
                platform: 'Multi-platform',
                genre: 'RPG',
                year: 2022,
                rating: 5,
                review: 'Stylové JRPG s úžasnou hudbou.',
                description: 'Noste masku. Odhalte pravdu. Připravte se na oceňované RPG zkušenosti v této definitivní verzi Persona 5 Royal, nyní vylepšené pro PC s vylepšenou grafikou.',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1687950/header.jpg',
                status: 'Wishlist'
            },
            {
                id: this.generateId(),
                title: 'Titanfall 2',
                platform: 'Multi-platform',
                genre: 'FPS',
                year: 2016,
                rating: 5,
                review: 'Nejlepší FPS kampaň.',
                description: 'Respawn Entertainment vám přináší Titanfall 2. Prozkoumejte vazbu mezi Pilotem a Titanem v této oceňované FPS hře s inovativní single-player kampaní a rychlým multiplayerem.',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1237970/header.jpg',
                status: 'Completed'
            },
            {
                id: this.generateId(),
                title: 'Valheim',
                platform: 'PC',
                genre: 'Survival',
                year: 2021,
                rating: 4,
                review: 'Skvělá survival hra s vikingskou tématikou.',
                description: 'Brutální explorace a survival hra pro 1-10 hráčů, zasazená do procedurálně generovaného purgatory inspirovaného vikingskou kulturou. Bojujte, stavte a dobývejte svou cestu do ságy hodné Odinova požehnání!',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/892970/header.jpg',
                status: 'Owned'
            },
            {
                id: this.generateId(),
                title: 'Control',
                platform: 'Multi-platform',
                genre: 'Action',
                year: 2019,
                rating: 4,
                review: 'Nadpřirozená akce s úžasnou atmosférou.',
                description: 'Po tajemném incidentu se stanete novým ředitelem Federal Bureau of Control. Prozkoumejte a bojujte v nadpřirozeném světě plném paranormálních jevů.',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/870780/header.jpg',
                status: 'Installed'
            },
            {
                id: this.generateId(),
                title: 'The Binding of Isaac: Rebirth',
                platform: 'Multi-platform',
                genre: 'Action',
                year: 2014,
                rating: 4,
                review: 'Návykový roguelike s temnou tématikou.',
                description: 'The Binding of Isaac: Rebirth je náhodně generovaná akční střílečka s těžkými prvky roguelike. Následujte Isaaca na jeho cestě a najděte podivné poklady, které mění Isaacovu formu.',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/250900/header.jpg',
                status: 'Owned'
            },
            {
                id: this.generateId(),
                title: 'Hitman 3',
                platform: 'Multi-platform',
                genre: 'Action',
                year: 2021,
                rating: 4,
                review: 'Perfektní stealth sandbox.',
                description: 'Agent 47 se vrací jako nemilosrdný profesionální zabiják v Hitman 3. Dokončete World of Assassination trilogii a staňte se ultimátním vrahem.',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1659040/header.jpg',
                status: 'Wishlist'
            },
            {
                id: this.generateId(),
                title: 'Slay the Spire',
                platform: 'Multi-platform',
                genre: 'Strategy',
                year: 2019,
                rating: 5,
                review: 'Geniální kombinace karetní hry a roguelike.',
                description: 'Vytvořte si unikátní balíček, setkejte se s bizarními tvory, objevte relikvie nesmírné moci a pokořte Spire! Slay the Spire kombinuje karetní hry a roguelikes.',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/646570/header.jpg',
                status: 'Owned'
            },
            {
                id: this.generateId(),
                title: 'It Takes Two',
                platform: 'Multi-platform',
                genre: 'Adventure',
                year: 2021,
                rating: 5,
                review: 'Nejlepší kooperativní hra.',
                description: 'Vydejte se na nejšílenější cestu svého života v It Takes Two, platformové adventuře vytvořené výhradně pro kooperativní hraní. Pozvěte přítele a hrajte zdarma s Friend\'s Pass.',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1426210/header.jpg',
                status: 'Completed'
            },
            {
                id: this.generateId(),
                title: 'Forza Horizon 5',
                platform: 'Xbox',
                genre: 'Racing',
                year: 2021,
                rating: 5,
                review: 'Nejlepší závodní hra.',
                description: 'Vaše Ultimate Horizon Adventure vás čeká! Prozkoumejte živé a neustále se vyvíjející otevřené světy v krajinách Mexika s neomezenou, zábavnou jízdou ve stovkách nejlepších světových aut.',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/header.jpg',
                status: 'Wishlist'
            },
            {
                id: this.generateId(),
                title: 'Outer Wilds',
                platform: 'Multi-platform',
                genre: 'Adventure',
                year: 2019,
                rating: 5,
                review: 'Jedinečná explorace vesmíru.',
                description: 'Outer Wilds je oceňovaná a fascinující open world mystery o sluneční soustavě uvězněné v nekonečné časové smyčce. Prozkoumávejte, objevujte tajemství a odhalte pravdu.',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/753640/header.jpg',
                status: 'Completed'
            },
            {
                id: this.generateId(),
                title: 'A Way Out',
                platform: 'Multi-platform',
                genre: 'Adventure',
                year: 2018,
                rating: 4,
                review: 'Emotivní kooperativní příběh.',
                description: 'A Way Out je výhradně kooperativní adventura, kde hrajete za dva vězně, kteří se snaží utéct z vězení. Hrajte celou hru s přítelem online nebo lokálně pomocí split-screen.',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1222700/header.jpg',
                status: 'Owned'
            },
            {
                id: this.generateId(),
                title: 'Disco Elysium',
                platform: 'Multi-platform',
                genre: 'RPG',
                year: 2019,
                rating: 5,
                review: 'Nejlepší psaní v herním průmyslu.',
                description: 'Disco Elysium je revoluční RPG. Staňte se detektivem a vyřešte vraždu na pobřeží. Prozkoumejte, manipulujte, sbírejte úplatky nebo se staňte hrdinou. Celý svět je váš.',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/632470/header.jpg',
                status: 'Completed'
            },
            {
                id: this.generateId(),
                title: 'Satisfactory',
                platform: 'PC',
                genre: 'Simulation',
                year: 2024,
                rating: 4,
                review: 'Tovární simulace v 3D.',
                description: 'Satisfactory je first-person open-world tovární budovací hra s nádechem explorace a boje. Hrajte sami nebo s přáteli, prozkoumávejte cizí planetu a vytvářejte multi-podlažní továrny.',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/526870/header.jpg',
                status: 'Installed'
            },
            {
                id: this.generateId(),
                title: 'Horizon Zero Dawn',
                platform: 'Multi-platform',
                genre: 'Action',
                year: 2020,
                rating: 4,
                review: 'Úžasný post-apokalyptický svět s roboty-dinosaury.',
                description: 'Prozkoumejte živý, post-apokalyptický svět, kde vládnou stroje. Jako Aloy, mladá lovkyně, prozkoumejte úchvatné krajiny, setkejte se s rivaly a odhalte tajemství minulosti.',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1151640/header.jpg',
                status: 'Wishlist'
            },
            {
                id: this.generateId(),
                title: 'Rust',
                platform: 'PC',
                genre: 'Survival',
                year: 2018,
                rating: 4,
                review: 'Brutální survival multiplayer.',
                description: 'Jediný cíl v Rustu je přežít. Udělejte cokoliv je potřeba k přežití. Zabíjejte zvířata pro maso. Chraňte se před ostatními hráči a zabíjejte je pro maso. Vytvořte spojenectví s jinými hráči.',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/252490/header.jpg',
                status: 'Owned'
            },
            {
                id: this.generateId(),
                title: 'Fall Guys',
                platform: 'Multi-platform',
                genre: 'Action',
                year: 2020,
                rating: 3,
                review: 'Zábavná party hra.',
                description: 'Fall Guys je masivní multiplayer party game s až 60 hráči online v chaotické závodní bitvě přes kolo za kolem eskalujícího chaosu, dokud nezůstane jeden vítěz!',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1097150/header.jpg',
                status: 'Installed'
            },
            {
                id: this.generateId(),
                title: 'Phasmophobia',
                platform: 'PC',
                genre: 'Horror',
                year: 2020,
                rating: 4,
                review: 'Děsivý kooperativní ghost hunting.',
                description: 'Phasmophobia je 4 hráčská online kooperativní psychologická hororová hra, kde vy a vaši členové týmu paranormálních vyšetřovatelů vstoupíte do strašidelných lokací plných paranormální aktivity.',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/739630/header.jpg',
                status: 'Owned'
            },
            {
                id: this.generateId(),
                title: 'Among Us',
                platform: 'Multi-platform',
                genre: 'Strategy',
                year: 2018,
                rating: 3,
                review: 'Sociální dedukční hra.',
                description: 'Hrajte online nebo přes místní WiFi se 4-15 hráči, když se připravujete na odlet, ale pozor, protože jeden nebo více náhodných hráčů mezi posádkou jsou Impostors, kteří chtějí zabít všechny!',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/945360/header.jpg',
                status: 'Installed'
            },
            {
                id: this.generateId(),
                title: 'Death Stranding',
                platform: 'Multi-platform',
                genre: 'Action',
                year: 2020,
                rating: 4,
                review: 'Jedinečná zkušenost od Hidea Kojimy.',
                description: 'Od legendárního herního tvůrce Hidea Kojimy přichází zcela nový žánr. Sam Bridges musí překonat zničenou Ameriku a spojit poslední pozůstatky budoucnosti lidstva.',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1190460/header.jpg',
                status: 'Wishlist'
            },
            {
                id: this.generateId(),
                title: 'Gris',
                platform: 'Multi-platform',
                genre: 'Platformer',
                year: 2018,
                rating: 4,
                review: 'Krásné umělecké dílo.',
                description: 'Gris je naděplná dívka ztracená ve svém vlastním světě, která se vypořádává s bolestivou zkušeností ve svém životě. Její cesta skrz smutkem se projevuje v její šatech, které jí poskytují nové schopnosti.',
                image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/683320/header.jpg',
                status: 'Completed'
            },
            {
                id: this.generateId(),
                title: 'No Man\'s Sky',
                platform: 'Multi-platform',
                genre: 'Adventure',
                year: 2016,
                rating: 4,
                review: 'Po mnoha updatech skvělá hra.',
                description: 'Prozkoumávejte nekonečný vesmír plný planet. Po katastrofálním startu se hra stala jedním z největších comebacků v herní historii.',
                image: 'https://via.placeholder.com/900x300/1e2749/667eea?text=No+Mans+Sky',
                status: 'Owned'
            },
            {
                id: this.generateId(),
                title: 'Battlefield 2042',
                platform: 'Multi-platform',
                genre: 'FPS',
                year: 2021,
                rating: 2,
                review: 'Zklamání. Chybí základní funkce.',
                description: 'Futuristická válečná střílečka, která měla být evolucí série, ale skončila jako nedodělaný produkt s mnoha technickými problémy.',
                image: 'https://via.placeholder.com/900x300/1e2749/667eea?text=Battlefield+2042',
                status: 'Wishlist'
            },
            {
                id: this.generateId(),
                title: 'Spider-Man Remastered',
                platform: 'Multi-platform',
                genre: 'Action',
                year: 2022,
                rating: 5,
                review: 'Nejlepší superhero hra.',
                description: 'Staňte se Spider-Manem a prozkoumejte New York. Perfektní adaptace postavy s úžasným příběhem a mechanikami.',
                image: 'https://via.placeholder.com/900x300/1e2749/667eea?text=Spider-Man',
                status: 'Completed'
            },
            {
                id: this.generateId(),
                title: 'FIFA 23',
                platform: 'Multi-platform',
                genre: 'Sports',
                year: 2022,
                rating: 3,
                review: 'Stejná hra každý rok.',
                description: 'Fotbalová simulace s minimálními změnami oproti předchozím ročníkům. Mikrotransakce dominují hernímu zážitku.',
                image: 'https://via.placeholder.com/900x300/1e2749/667eea?text=FIFA+23',
                status: 'Owned'
            },
            {
                id: this.generateId(),
                title: 'Assassin\'s Creed Valhalla',
                platform: 'Multi-platform',
                genre: 'Action',
                year: 2020,
                rating: 4,
                review: 'Solidní vikinské dobrodružství.',
                description: 'Staňte se vikingským válečníkem Eivorem a dobývejte Anglii. Obrovský svět s desítkami hodin obsahu.',
                image: 'https://via.placeholder.com/900x300/1e2749/667eea?text=AC+Valhalla',
                status: 'Installed'
            },
            {
                id: this.generateId(),
                title: 'The Last of Us Part I',
                platform: 'Multi-platform',
                genre: 'Action',
                year: 2022,
                rating: 5,
                review: 'Emotivní masterpiece.',
                description: 'Remake kultovní post-apokalyptické hry. Joel a Ellie na cestě napříč zničenou Amerikou.',
                image: 'https://via.placeholder.com/900x300/1e2749/667eea?text=The+Last+of+Us',
                status: 'Completed'
            },
            {
                id: this.generateId(),
                title: 'Overwatch 2',
                platform: 'Multi-platform',
                genre: 'FPS',
                year: 2022,
                rating: 3,
                review: 'Kontroverzní přechod na F2P.',
                description: 'Týmová hero shooter hra. Přechod na free-to-play model s battle passem rozčílil mnoho fanoušků.',
                image: 'https://via.placeholder.com/900x300/1e2749/667eea?text=Overwatch+2',
                status: 'Installed'
            },
            {
                id: this.generateId(),
                title: 'Starfield',
                platform: 'Xbox',
                genre: 'RPG',
                year: 2023,
                rating: 3,
                review: 'Ambiciózní, ale prázdné.',
                description: 'Vesmírné RPG od Bethesdy. Tisíce planet, ale většina z nich je prázdná a nudná.',
                image: 'https://via.placeholder.com/900x300/1e2749/667eea?text=Starfield',
                status: 'Wishlist'
            },
            {
                id: this.generateId(),
                title: 'Lies of P',
                platform: 'Multi-platform',
                genre: 'Action',
                year: 2023,
                rating: 4,
                review: 'Překvapivě dobrý soulslike.',
                description: 'Temná interpretace příběhu Pinocchia. Náročné souboje ve stylu Dark Souls s unikátní atmosférou.',
                image: 'https://via.placeholder.com/900x300/1e2749/667eea?text=Lies+of+P',
                status: 'Owned'
            },
            {
                id: this.generateId(),
                title: 'Street Fighter 6',
                platform: 'Multi-platform',
                genre: 'Fighting',
                year: 2023,
                rating: 5,
                review: 'Návrat legendy.',
                description: 'Nejnovější díl ikonické fighting série. Moderní ovládání pro nováčky i klasické pro veterány.',
                image: 'https://via.placeholder.com/900x300/1e2749/667eea?text=Street+Fighter+6',
                status: 'Installed'
            },
            {
                id: this.generateId(),
                title: 'Redfall',
                platform: 'Xbox',
                genre: 'FPS',
                year: 2023,
                rating: 2,
                review: 'Obrovské zklamání.',
                description: 'Kooperativní FPS od Arkane Studios. Technické problémy a nudný gameplay zničily potenciál.',
                image: 'https://via.placeholder.com/900x300/1e2749/667eea?text=Redfall',
                status: 'Download'
            },
            {
                id: this.generateId(),
                title: 'Hogwarts Legacy',
                platform: 'Multi-platform',
                genre: 'RPG',
                year: 2023,
                rating: 4,
                review: 'Splněný sen pro fanoušky HP.',
                description: 'Prozkoumejte Bradavice v 19. století. Open-world RPG ve světě Harryho Pottera s magií a tajemstvími.',
                image: 'https://via.placeholder.com/900x300/1e2749/667eea?text=Hogwarts+Legacy',
                status: 'Completed'
            },
            {
                id: this.generateId(),
                title: 'Diablo IV',
                platform: 'Multi-platform',
                genre: 'RPG',
                year: 2023,
                rating: 4,
                review: 'Temný návrat série.',
                description: 'Akční RPG plné démonů a lootu. Návrat k temnějším kořenům série s moderními mechanikami.',
                image: 'https://via.placeholder.com/900x300/1e2749/667eea?text=Diablo+IV',
                status: 'Installed'
            },
            {
                id: this.generateId(),
                title: 'Resident Evil Village',
                platform: 'Multi-platform',
                genre: 'Horror',
                year: 2021,
                rating: 5,
                review: 'Skvělá atmosféra a Lady Dimitrescu.',
                description: 'Ethan Winters hledá svou dceru v tajemné vesnici plné monster. Mix akce a horroru.',
                image: 'https://via.placeholder.com/900x300/1e2749/667eea?text=RE+Village',
                status: 'Completed'
            },
            {
                id: this.generateId(),
                title: 'Back 4 Blood',
                platform: 'Multi-platform',
                genre: 'FPS',
                year: 2021,
                rating: 3,
                review: 'Není to Left 4 Dead 3.',
                description: 'Kooperativní zombie shooter od tvůrců L4D. Chybí mu kouzlo originálu.',
                image: 'https://via.placeholder.com/900x300/1e2749/667eea?text=Back+4+Blood',
                status: 'Owned'
            },
            {
                id: this.generateId(),
                title: 'Returnal',
                platform: 'PlayStation',
                genre: 'Action',
                year: 2021,
                rating: 4,
                review: 'Náročný roguelike s úžasnou grafikou.',
                description: 'Sci-fi roguelike třetí osoby. Každá smrt vás vrací na začátek, ale s novými znalostmi.',
                image: 'https://via.placeholder.com/900x300/1e2749/667eea?text=Returnal',
                status: 'Wishlist'
            },
            {
                id: this.generateId(),
                title: 'Deathloop',
                platform: 'Multi-platform',
                genre: 'Action',
                year: 2021,
                rating: 4,
                review: 'Kreativní časová smyčka.',
                description: 'Zabijte 8 cílů v jednom dni, nebo opakujte smyčku. Unikátní koncept od Arkane Studios.',
                image: 'https://via.placeholder.com/900x300/1e2749/667eea?text=Deathloop',
                status: 'Owned'
            },
            {
                id: this.generateId(),
                title: 'Gotham Knights',
                platform: 'Multi-platform',
                genre: 'Action',
                year: 2022,
                rating: 2,
                review: 'Promarněný potenciál.',
                description: 'Batman je mrtvý, jeho následovníci musí chránit Gotham. Repetitivní a technicky slabé.',
                image: 'https://via.placeholder.com/900x300/1e2749/667eea?text=Gotham+Knights',
                status: 'Download'
            },
            {
                id: this.generateId(),
                title: 'Atomic Heart',
                platform: 'Multi-platform',
                genre: 'FPS',
                year: 2023,
                rating: 3,
                review: 'Zajímavý svět, průměrný gameplay.',
                description: 'Alternativní sovětská realita plná robotů. Vizuálně úžasné, ale s problémy v designu.',
                image: 'https://via.placeholder.com/900x300/1e2749/667eea?text=Atomic+Heart',
                status: 'Owned'
            },
            {
                id: this.generateId(),
                title: 'Sifu',
                platform: 'Multi-platform',
                genre: 'Fighting',
                year: 2022,
                rating: 4,
                review: 'Brutální kung-fu akce.',
                description: 'Každá smrt vás stárne. Mistrovský bojový systém inspirovaný kung-fu filmy.',
                image: 'https://via.placeholder.com/900x300/1e2749/667eea?text=Sifu',
                status: 'Completed'
            },
            {
                id: this.generateId(),
                title: 'Ghostwire: Tokyo',
                platform: 'Multi-platform',
                genre: 'Action',
                year: 2022,
                rating: 3,
                review: 'Zajímavý koncept, slabá realizace.',
                description: 'Tokio je prázdné, všichni zmizeli. Bojujte proti duchům s nadpřirozenými schopnostmi.',
                image: 'https://via.placeholder.com/900x300/1e2749/667eea?text=Ghostwire+Tokyo',
                status: 'Wishlist'
            },
            {
                id: this.generateId(),
                title: 'Ratchet & Clank: Rift Apart',
                platform: 'PlayStation',
                genre: 'Platformer',
                year: 2021,
                rating: 5,
                review: 'Technologický zázrak PS5.',
                description: 'Skákejte mezi dimenzemi bez loading screenů. Nádherná grafika a zábavný gameplay.',
                image: 'https://via.placeholder.com/900x300/1e2749/667eea?text=Ratchet+Clank',
                status: 'Completed'
            },
            {
                id: this.generateId(),
                title: 'Kena: Bridge of Spirits',
                platform: 'Multi-platform',
                genre: 'Adventure',
                year: 2021,
                rating: 4,
                review: 'Krásná indie hra.',
                description: 'Akční adventura s roztomilými pomocníky Rot. Vypadá jako Pixar film.',
                image: 'https://via.placeholder.com/900x300/1e2749/667eea?text=Kena',
                status: 'Owned'
            },
            {
                id: this.generateId(),
                title: 'Saints Row (2022)',
                platform: 'Multi-platform',
                genre: 'Action',
                year: 2022,
                rating: 2,
                review: 'Ztratilo duši série.',
                description: 'Reboot série Saints Row. Technické problémy a nezajímavé postavy zklamaly fanoušky.',
                image: 'https://via.placeholder.com/900x300/1e2749/667eea?text=Saints+Row',
                status: 'Download'
            },
            {
                id: this.generateId(),
                title: 'Guardians of the Galaxy',
                platform: 'Multi-platform',
                genre: 'Action',
                year: 2021,
                rating: 4,
                review: 'Překvapivě dobrá story hra.',
                description: 'Hrajte za Star-Lorda a veďte Guardians. Skvělý příběh a dialogy, i když gameplay je jednodušší.',
                image: 'https://via.placeholder.com/900x300/1e2749/667eea?text=Guardians+Galaxy',
                status: 'Completed'
            },
            {
                id: this.generateId(),
                title: 'Forspoken',
                platform: 'Multi-platform',
                genre: 'Action',
                year: 2023,
                rating: 2,
                review: 'Prázdný otevřený svět.',
                description: 'Magické parkour v fantasy světě. Špatné dialogy a repetitivní mise zničily potenciál.',
                image: 'https://via.placeholder.com/900x300/1e2749/667eea?text=Forspoken',
                status: 'Wishlist'
            },
            {
                id: this.generateId(),
                title: 'A Plague Tale: Requiem',
                platform: 'Multi-platform',
                genre: 'Adventure',
                year: 2022,
                rating: 5,
                review: 'Emotivní pokračování.',
                description: 'Amicia a Hugo pokračují v útěku. Temný příběh ve středověku plném krys a inkvizice.',
                image: 'https://via.placeholder.com/900x300/1e2749/667eea?text=Plague+Tale',
                status: 'Completed'
            },
            {
                id: this.generateId(),
                title: 'Dying Light 2',
                platform: 'Multi-platform',
                genre: 'Action',
                year: 2022,
                rating: 3,
                review: 'Dobrý parkour, slabý příběh.',
                description: 'Zombie apokalypsa s parkourem. Gameplay je zábavný, ale příběh zklamal.',
                image: 'https://via.placeholder.com/900x300/1e2749/667eea?text=Dying+Light+2',
                status: 'Installed'
            },
            {
                id: this.generateId(),
                title: 'Tiny Tina\'s Wonderlands',
                platform: 'Multi-platform',
                genre: 'FPS',
                year: 2022,
                rating: 4,
                review: 'Borderlands s fantasy tématikou.',
                description: 'Looter shooter ve fantasy světě. Humor Borderlands s D&D mechanikami.',
                image: 'https://via.placeholder.com/900x300/1e2749/667eea?text=Tiny+Tinas',
                status: 'Owned'
            },
            {
                id: this.generateId(),
                title: 'Evil Dead: The Game',
                platform: 'Multi-platform',
                genre: 'Horror',
                year: 2022,
                rating: 3,
                review: 'Zábavné s přáteli.',
                description: 'Asymetrický multiplayer horror. Zábavné pro fanoušky série, ale rychle omrzí.',
                image: 'https://via.placeholder.com/900x300/1e2749/667eea?text=Evil+Dead',
                status: 'Download'
            },
            {
                id: this.generateId(),
                title: 'Stray',
                platform: 'Multi-platform',
                genre: 'Adventure',
                year: 2022,
                rating: 5,
                review: 'Hrajete za kočku!',
                description: 'Prozkoumávejte cyberpunk město jako toulavá kočka. Unikátní perspektiva a krásná atmosféra.',
                image: 'https://via.placeholder.com/900x300/1e2749/667eea?text=Stray',
                status: 'Completed'
            },
            {
                id: this.generateId(),
                title: 'Vampire Survivors',
                platform: 'Multi-platform',
                genre: 'Action',
                year: 2022,
                rating: 5,
                review: 'Návyková indie perla.',
                description: 'Minimalistický roguelike. "Ještě jeden run" se změní v hodiny hraní.',
                image: 'https://via.placeholder.com/900x300/1e2749/667eea?text=Vampire+Survivors',
                status: 'Owned'
            },
            {
                id: this.generateId(),
                title: 'Cult of the Lamb',
                platform: 'Multi-platform',
                genre: 'Strategy',
                year: 2022,
                rating: 4,
                review: 'Roztomilý kult simulátor.',
                description: 'Budujte kult jako roztomilé jehňátko. Mix dungeon crawlingu a managementu.',
                image: 'https://via.placeholder.com/900x300/1e2749/667eea?text=Cult+of+Lamb',
                status: 'Installed'
            },
            {
                id: this.generateId(),
                title: 'Tunic',
                platform: 'Multi-platform',
                genre: 'Adventure',
                year: 2022,
                rating: 4,
                review: 'Zelda-like s tajemstvími.',
                description: 'Hrajte za lišku v izometrickém světě. Plné skrytých tajemství a náročných bossů.',
                image: 'https://via.placeholder.com/900x300/1e2749/667eea?text=Tunic',
                status: 'Completed'
            },
            {
                id: this.generateId(),
                title: 'Scorn',
                platform: 'Multi-platform',
                genre: 'Horror',
                year: 2022,
                rating: 2,
                review: 'Vizuálně zajímavé, hratelně nudné.',
                description: 'Biomechanický horror inspirovaný H.R. Gigerem. Úžasný art design, ale slabý gameplay.',
                image: 'https://via.placeholder.com/900x300/1e2749/667eea?text=Scorn',
                status: 'Wishlist'
            },
            {
                id: this.generateId(),
                title: 'Nier: Automata',
                platform: 'Multi-platform',
                genre: 'Action',
                year: 2017,
                rating: 5,
                review: 'Filozofické akční RPG.',
                description: 'Androidi bojují proti strojům. Několik playthrough odhaluje různé perspektivy příběhu.',
                image: 'https://via.placeholder.com/900x300/1e2749/667eea?text=Nier+Automata',
                status: 'Completed'
            },
            {
                id: this.generateId(),
                title: 'Metro Exodus',
                platform: 'Multi-platform',
                genre: 'FPS',
                year: 2019,
                rating: 4,
                review: 'Atmosférický post-apo FPS.',
                description: 'Cestujte vlakem napříč post-apokalyptickým Ruskem. Krásná grafika a tísnivá atmosféra.',
                image: 'https://via.placeholder.com/900x300/1e2749/667eea?text=Metro+Exodus',
                status: 'Owned'
            },
            {
                id: this.generateId(),
                title: 'The Quarry',
                platform: 'Multi-platform',
                genre: 'Horror',
                year: 2022,
                rating: 4,
                review: 'Interaktivní horor film.',
                description: 'Od tvůrců Until Dawn. Vaše rozhodnutí určují, kdo přežije noc v táboře.',
                image: 'https://via.placeholder.com/900x300/1e2749/667eea?text=The+Quarry',
                status: 'Completed'
            },
            {
                id: this.generateId(),
                title: 'Wo Long: Fallen Dynasty',
                platform: 'Multi-platform',
                genre: 'Action',
                year: 2023,
                rating: 3,
                review: 'Solidní soulslike.',
                description: 'Soulslike v Three Kingdoms éře Číny. Rychlejší než Dark Souls, ale méně pamětihodné.',
                image: 'https://via.placeholder.com/900x300/1e2749/667eea?text=Wo+Long',
                status: 'Installed'
            },
            {
                id: this.generateId(),
                title: 'High on Life',
                platform: 'Multi-platform',
                genre: 'FPS',
                year: 2022,
                rating: 3,
                review: 'Rick and Morty humor.',
                description: 'FPS s mluvícími zbraněmi. Humor není pro každého, ale gameplay je zábavný.',
                image: 'https://via.placeholder.com/900x300/1e2749/667eea?text=High+on+Life',
                status: 'Owned'
            },
            {
                id: this.generateId(),
                title: 'Dead Space Remake',
                platform: 'Multi-platform',
                genre: 'Horror',
                year: 2023,
                rating: 5,
                review: 'Perfektní remake klasiky.',
                description: 'Survival horror na vesmírné lodi. Remake vylepšuje vše, co bylo skvělé na originálu.',
                image: 'https://via.placeholder.com/900x300/1e2749/667eea?text=Dead+Space',
                status: 'Completed'
            },
            {
                id: this.generateId(),
                title: 'Remnant II',
                platform: 'Multi-platform',
                genre: 'Action',
                year: 2023,
                rating: 4,
                review: 'Soulslike shooter.',
                description: 'Kooperativní third-person shooter s prvky Dark Souls. Procedurálně generované světy.',
                image: 'https://via.placeholder.com/900x300/1e2749/667eea?text=Remnant+II',
                status: 'Installed'
            },
            {
                id: this.generateId(),
                title: 'Payday 3',
                platform: 'Multi-platform',
                genre: 'FPS',
                year: 2023,
                rating: 2,
                review: 'Krok zpět od dvojky.',
                description: 'Kooperativní loupežná hra. Méně obsahu než Payday 2 a technické problémy.',
                image: 'https://via.placeholder.com/900x300/1e2749/667eea?text=Payday+3',
                status: 'Download'
            },
            {
                id: this.generateId(),
                title: 'Armored Core VI',
                platform: 'Multi-platform',
                genre: 'Action',
                year: 2023,
                rating: 4,
                review: 'Mecha akce od FromSoftware.',
                description: 'Pilotujte obří mechy v rychlých soubojích. Náročné, ale odměňující.',
                image: 'https://via.placeholder.com/900x300/1e2749/667eea?text=Armored+Core+VI',
                status: 'Owned'
            },
            {
                id: this.generateId(),
                title: 'Cities: Skylines II',
                platform: 'Multi-platform',
                genre: 'Simulation',
                year: 2023,
                rating: 3,
                review: 'Ambiciózní, ale buggy.',
                description: 'Městský simulátor. Skvělé nápady, ale technická optimalizace je katastrofální.',
                image: 'https://via.placeholder.com/900x300/1e2749/667eea?text=Cities+Skylines+II',
                status: 'Wishlist'
            },
            {
                id: this.generateId(),
                title: 'Alan Wake II',
                platform: 'Multi-platform',
                genre: 'Horror',
                year: 2023,
                rating: 5,
                review: 'Mistrovské dílo survival horroru.',
                description: 'Pokračování kultovní hry po 13 letech. Dva protagonisté, temný příběh a úžasná atmosféra.',
                image: 'https://via.placeholder.com/900x300/1e2749/667eea?text=Alan+Wake+II',
                status: 'Completed'
            },
            {
                id: this.generateId(),
                title: 'Mortal Kombat 1',
                platform: 'Multi-platform',
                genre: 'Fighting',
                year: 2023,
                rating: 4,
                review: 'Brutální reboot série.',
                description: 'Nový začátek pro MK. Kameo fighters přidávají novou dimenzi do soubojů.',
                image: 'https://via.placeholder.com/900x300/1e2749/667eea?text=Mortal+Kombat+1',
                status: 'Installed'
            },
            {
                id: this.generateId(),
                title: 'The Texas Chain Saw Massacre',
                platform: 'Multi-platform',
                genre: 'Horror',
                year: 2023,
                rating: 3,
                review: 'Asymetrický horor pro fanoušky.',
                description: 'Utečte před Leatherface a jeho rodinou. Zábavné, ale rychle omrzí.',
                image: 'https://via.placeholder.com/900x300/1e2749/667eea?text=Texas+Chainsaw',
                status: 'Owned'
            },
            {
                id: this.generateId(),
                title: 'Robocop: Rogue City',
                platform: 'Multi-platform',
                genre: 'FPS',
                year: 2023,
                rating: 4,
                review: 'Překvapivě dobrá licencovaná hra.',
                description: 'Staňte se Robocopem a čistěte ulice. Respektuje původní filmy a je zábavná.',
                image: 'https://via.placeholder.com/900x300/1e2749/667eea?text=Robocop',
                status: 'Completed'
            }
        ];
    }

    // Save games to localStorage
    saveGames() {
        localStorage.setItem('gameDatabase', JSON.stringify(this.games));
    }

    // Generate unique ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Add new game
    addGame(gameData) {
        const newGame = {
            id: this.generateId(),
            ...gameData
        };
        this.games.unshift(newGame);
        this.saveGames();
        return newGame;
    }

    // Update game
    updateGame(id, gameData) {
        const index = this.games.findIndex(game => game.id === id);
        if (index !== -1) {
            this.games[index] = { id, ...gameData };
            this.saveGames();
            return this.games[index];
        }
        return null;
    }

    // Delete game
    deleteGame(id) {
        this.games = this.games.filter(game => game.id !== id);
        this.saveGames();
    }

    // Get game by ID
    getGame(id) {
        return this.games.find(game => game.id === id);
    }

    // Get filtered games
    getFilteredGames() {
        return this.games.filter(game => {
            // Search filter
            if (this.currentFilter.search) {
                const searchLower = this.currentFilter.search.toLowerCase();
                if (!game.title.toLowerCase().includes(searchLower)) {
                    return false;
                }
            }

            // Platform filter
            if (this.currentFilter.platform && game.platform !== this.currentFilter.platform) {
                return false;
            }

            // Genre filter
            if (this.currentFilter.genre && game.genre !== this.currentFilter.genre) {
                return false;
            }

            // Status filter
            if (this.currentFilter.status && game.status !== this.currentFilter.status) {
                return false;
            }

            return true;
        });
    }

    // Update filter
    updateFilter(filterType, value) {
        this.currentFilter[filterType] = value;
    }
}

// UI Controller
class UIController {
    constructor(database) {
        this.db = database;
        this.initElements();
        this.initEventListeners();
        this.render();
    }

    initElements() {
        // Form elements
        this.form = document.getElementById('game-form');
        this.formTitle = document.getElementById('form-title');
        this.editGameId = document.getElementById('edit-game-id');
        this.titleInput = document.getElementById('game-title');
        this.platformInput = document.getElementById('game-platform');
        this.genreInput = document.getElementById('game-genre');
        this.yearInput = document.getElementById('game-year');
        this.statusInput = document.getElementById('game-status');
        this.ratingInput = document.getElementById('game-rating');
        this.reviewInput = document.getElementById('game-review');
        this.submitBtn = document.getElementById('submit-btn');
        this.cancelBtn = document.getElementById('cancel-btn');

        // Rating stars
        this.ratingStars = document.querySelectorAll('#rating-input .star');

        // Filter elements
        this.searchInput = document.getElementById('search-input');
        this.filterPlatform = document.getElementById('filter-platform');
        this.filterGenre = document.getElementById('filter-genre');
        this.filterStatus = document.getElementById('filter-status');

        // Display elements
        this.gamesGrid = document.getElementById('games-grid');
        this.emptyState = document.getElementById('empty-state');

        // Modal elements
        this.modal = document.getElementById('game-modal');
        this.modalClose = document.getElementById('modal-close');
        this.modalImage = document.getElementById('modal-image');
        this.modalTitle = document.getElementById('modal-title');
        this.modalPlatform = document.getElementById('modal-platform');
        this.modalGenre = document.getElementById('modal-genre');
        this.modalStatus = document.getElementById('modal-status');
        this.modalYear = document.getElementById('modal-year');
        this.modalRating = document.getElementById('modal-rating');
        this.modalDescription = document.getElementById('modal-description');
        this.modalReview = document.getElementById('modal-review');
        this.modalReviewSection = document.getElementById('modal-review-section');
    }

    initEventListeners() {
        // Form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });

        // Cancel edit
        this.cancelBtn.addEventListener('click', () => {
            this.cancelEdit();
        });

        // Rating stars
        this.ratingStars.forEach(star => {
            star.addEventListener('click', () => {
                const rating = parseInt(star.dataset.rating);
                this.setRating(rating);
            });

            star.addEventListener('mouseenter', () => {
                const rating = parseInt(star.dataset.rating);
                this.highlightStars(rating);
            });
        });

        document.getElementById('rating-input').addEventListener('mouseleave', () => {
            const currentRating = parseInt(this.ratingInput.value) || 0;
            this.highlightStars(currentRating);
        });

        // Filters
        this.searchInput.addEventListener('input', (e) => {
            this.db.updateFilter('search', e.target.value);
            this.render();
        });

        this.filterPlatform.addEventListener('change', (e) => {
            this.db.updateFilter('platform', e.target.value);
            this.render();
        });

        this.filterGenre.addEventListener('change', (e) => {
            this.db.updateFilter('genre', e.target.value);
            this.render();
        });

        this.filterStatus.addEventListener('change', (e) => {
            this.db.updateFilter('status', e.target.value);
            this.render();
        });

        // Modal event listeners
        this.modalClose.addEventListener('click', () => {
            this.closeModal();
        });

        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }

    setRating(rating) {
        this.ratingInput.value = rating;
        this.highlightStars(rating);
    }

    highlightStars(rating) {
        this.ratingStars.forEach(star => {
            const starRating = parseInt(star.dataset.rating);
            if (starRating <= rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    handleFormSubmit() {
        const gameData = {
            title: this.titleInput.value.trim(),
            platform: this.platformInput.value,
            genre: this.genreInput.value,
            year: parseInt(this.yearInput.value),
            rating: parseInt(this.ratingInput.value) || 0,
            review: this.reviewInput.value.trim(),
            status: this.statusInput.value
        };

        const editId = this.editGameId.value;
        if (editId) {
            // Update existing game
            this.db.updateGame(editId, gameData);
        } else {
            // Add new game
            this.db.addGame(gameData);
        }

        this.resetForm();
        this.render();
    }

    resetForm() {
        this.form.reset();
        this.editGameId.value = '';
        this.ratingInput.value = '0';
        this.highlightStars(0);
        this.formTitle.textContent = '➕ Přidat novou hru';
        this.submitBtn.textContent = 'Přidat hru';
        this.cancelBtn.style.display = 'none';
    }

    cancelEdit() {
        this.resetForm();
    }

    editGame(id) {
        const game = this.db.getGame(id);
        if (!game) return;

        this.editGameId.value = game.id;
        this.titleInput.value = game.title;
        this.platformInput.value = game.platform;
        this.genreInput.value = game.genre;
        this.yearInput.value = game.year;
        this.statusInput.value = game.status;
        this.ratingInput.value = game.rating;
        this.reviewInput.value = game.review;
        this.setRating(game.rating);

        this.formTitle.textContent = '✏️ Upravit hru';
        this.submitBtn.textContent = 'Uložit změny';
        this.cancelBtn.style.display = 'inline-block';

        // Scroll to form
        document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
    }

    deleteGame(id) {
        if (confirm('Opravdu chcete smazat tuto hru?')) {
            this.db.deleteGame(id);
            this.render();
        }
    }

    showGameDetail(id) {
        const game = this.db.getGame(id);
        if (!game) return;

        // Set modal content
        this.modalTitle.textContent = game.title;
        this.modalPlatform.textContent = game.platform;
        this.modalGenre.textContent = game.genre;
        this.modalStatus.textContent = game.status;
        this.modalYear.textContent = game.year;

        // Update status badge class
        this.modalStatus.className = 'badge badge-status ' + game.status.toLowerCase();

        // Set image
        if (game.image) {
            this.modalImage.src = game.image;
            this.modalImage.alt = game.title;
        } else {
            this.modalImage.src = 'https://via.placeholder.com/900x300/1e2749/667eea?text=' + encodeURIComponent(game.title);
            this.modalImage.alt = game.title;
        }

        // Set rating stars
        const stars = Array.from({ length: 5 }, (_, i) => {
            const isActive = i < game.rating ? 'active' : '';
            return `<span class="star ${isActive}">★</span>`;
        }).join('');
        this.modalRating.innerHTML = stars;

        // Set description
        if (game.description) {
            this.modalDescription.textContent = game.description;
        } else {
            this.modalDescription.textContent = 'Popis není k dispozici.';
        }

        // Set review
        if (game.review) {
            this.modalReview.textContent = game.review;
            this.modalReviewSection.style.display = 'block';
        } else {
            this.modalReviewSection.style.display = 'none';
        }

        // Show modal
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    render() {
        const games = this.db.getFilteredGames();

        if (games.length === 0) {
            this.gamesGrid.innerHTML = '';
            this.emptyState.style.display = 'block';
            return;
        }

        this.emptyState.style.display = 'none';
        this.gamesGrid.innerHTML = games.map((game, index) => this.createGameCard(game, index)).join('');

        // Add event listeners to cards
        games.forEach(game => {
            const card = document.querySelector(`[data-game-id="${game.id}"]`);
            const editBtn = document.getElementById(`edit-${game.id}`);
            const deleteBtn = document.getElementById(`delete-${game.id}`);

            if (card) {
                card.addEventListener('click', (e) => {
                    // Don't open modal if clicking on action buttons
                    if (!e.target.closest('.game-actions')) {
                        this.showGameDetail(game.id);
                    }
                });
                card.style.cursor = 'pointer';
            }

            if (editBtn) {
                editBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.editGame(game.id);
                });
            }

            if (deleteBtn) {
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.deleteGame(game.id);
                });
            }
        });
    }

    createGameCard(game, index) {
        const stars = Array.from({ length: 5 }, (_, i) => {
            const isActive = i < game.rating ? 'active' : '';
            return `<span class="star ${isActive}">★</span>`;
        }).join('');

        const statusClass = game.status.toLowerCase();

        return `
      <div class="game-card" data-game-id="${game.id}" style="--card-index: ${index}">
        <div class="game-header">
          <div>
            <h3 class="game-title">${this.escapeHtml(game.title)}</h3>
            <div class="game-year">${game.year}</div>
          </div>
          <div class="game-actions">
            <button class="icon-btn" id="edit-${game.id}" title="Upravit">✏️</button>
            <button class="icon-btn delete" id="delete-${game.id}" title="Smazat">🗑️</button>
          </div>
        </div>
        
        <div class="game-meta">
          <span class="badge badge-platform">${this.escapeHtml(game.platform)}</span>
          <span class="badge badge-genre">${this.escapeHtml(game.genre)}</span>
          <span class="badge badge-status ${statusClass}">${this.escapeHtml(game.status)}</span>
        </div>
        
        <div class="game-rating">
          ${stars}
        </div>
        
        ${game.review ? `
          <div class="game-review">
            ${this.escapeHtml(game.review)}
          </div>
        ` : ''}
      </div>
    `;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    const database = new GameDatabase();
    const ui = new UIController(database);

    // Save data before page unload
    window.addEventListener('beforeunload', () => {
        database.saveGames();
    });
});
