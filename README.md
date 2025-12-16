# 🎮 Herní Databáze - Verze 2.0

Webová aplikace pro správu osobní databáze her s hodnocením, recenzemi a sledováním stavu.

## ✨ Funkce

- **97 her** v databázi (47 původních + 50 nově přidaných)
- **Detailní informace** o každé hře: název, platforma, žánr, rok, hodnocení, recenze, popis
- **Modální okna** s obrázky a plnými popisy her
- **Filtrování** podle platformy, žánru, statusu
- **Vyhledávání** podle názvu hry
- **Lokální úložiště** - data se ukládají do localStorage
- **Responzivní design** - funguje na všech zařízeních

## 🎯 Hodnocení her

Aplikace obsahuje mix her s různým hodnocením:
- **5 hvězdiček (⭐⭐⭐⭐⭐)**: 15 her - vynikající hry
- **4 hvězdičky (⭐⭐⭐⭐)**: 20 her - velmi dobré hry
- **3 hvězdičky (⭐⭐⭐)**: 10 her - průměrné hry
- **2 hvězdičky (⭐⭐)**: 5 her - zklamání

## 🚀 Jak spustit

1. Stáhněte nebo naklonujte tento repozitář
2. Otevřete `index.html` v moderním prohlížeči
3. Aplikace funguje offline - žádná instalace není potřeba!

### Doporučené prohlížeče:
- Mozilla Firefox (doporučeno)
- Google Chrome
- Microsoft Edge
- Safari

## 📁 Struktura projektu

```
hernidatabaze/
├── index.html          # Hlavní HTML soubor
├── index.css           # Styly aplikace
├── app.js              # JavaScript logika + databáze 97 her
├── v2/                 # Verze 2 (identická s hlavní složkou)
│   ├── index.html
│   ├── index.css
│   ├── app.js
│   ├── README.md
│   ├── CHANGELOG.md
│   ├── GAME_LIST.md
│   ├── IMAGES_MAPPING.md
│   ├── INSTRUCTIONS.md
│   └── START.html
└── README.md           # Tento soubor
```

## 🎮 Příklady her v databázi

### Vynikající hry (5⭐):
- The Witcher 3: Wild Hunt
- Spider-Man Remastered
- The Last of Us Part I
- Stray
- Alan Wake II
- Dead Space Remake
- Resident Evil Village
- Baldur's Gate 3
- Elden Ring
- Portal 2

### Zklamání (2⭐):
- Battlefield 2042
- Redfall
- Gotham Knights
- Forspoken
- Saints Row (2022)
- Scorn
- Payday 3

## 🖼️ Obrázky

- **Původní hry (47)**: Používají Steam CDN URL
- **Nové hry (50)**: Používají placeholder obrázky z placeholder.com s názvy her

## 📝 Poznámky

- Data se ukládají do **localStorage** prohlížeče
- Můžete přidávat, upravovat a mazat hry
- Aplikace je plně funkční offline
- Žádné externí závislosti

## 🔧 Technologie

- **HTML5** - struktura
- **CSS3** - moderní design s animacemi
- **Vanilla JavaScript** - žádné frameworky
- **localStorage API** - perzistence dat

## 📅 Verze

- **v2.0** (16.12.2025) - Přidáno 50 nových her, opraveny obrázky
- **v1.0** (09.12.2025) - Původní verze s 47 hrami

## 👨‍💻 Autor

Vytvořeno pomocí Antigravity AI

## 📄 Licence

Tento projekt je volně k použití pro osobní účely.
