# Mapování obrázků her

Tento soubor obsahuje seznam všech placeholder obrázků, které je třeba nahradit skutečnými obrázky her.

## Formát:
`placeholder_nazev.jpg` → Název hry

## Seznam placeholderů:

### Nově přidané hry (50):

1. `placeholder_nomanssky.jpg` → No Man's Sky
2. `placeholder_bf2042.jpg` → Battlefield 2042
3. `placeholder_spiderman.jpg` → Spider-Man Remastered
4. `placeholder_fifa23.jpg` → FIFA 23
5. `placeholder_acvalhalla.jpg` → Assassin's Creed Valhalla
6. `placeholder_tlou.jpg` → The Last of Us Part I
7. `placeholder_ow2.jpg` → Overwatch 2
8. `placeholder_starfield.jpg` → Starfield
9. `placeholder_liesp.jpg` → Lies of P
10. `placeholder_sf6.jpg` → Street Fighter 6
11. `placeholder_redfall.jpg` → Redfall
12. `placeholder_hogwarts.jpg` → Hogwarts Legacy
13. `placeholder_d4.jpg` → Diablo IV
14. `placeholder_re8.jpg` → Resident Evil Village
15. `placeholder_b4b.jpg` → Back 4 Blood
16. `placeholder_returnal.jpg` → Returnal
17. `placeholder_deathloop.jpg` → Deathloop
18. `placeholder_gotham.jpg` → Gotham Knights
19. `placeholder_atomic.jpg` → Atomic Heart
20. `placeholder_sifu.jpg` → Sifu
21. `placeholder_ghostwire.jpg` → Ghostwire: Tokyo
22. `placeholder_ratchet.jpg` → Ratchet & Clank: Rift Apart
23. `placeholder_kena.jpg` → Kena: Bridge of Spirits
24. `placeholder_saintsrow.jpg` → Saints Row (2022)
25. `placeholder_gotg.jpg` → Guardians of the Galaxy
26. `placeholder_forspoken.jpg` → Forspoken
27. `placeholder_plague.jpg` → A Plague Tale: Requiem
28. `placeholder_dl2.jpg` → Dying Light 2
29. `placeholder_tina.jpg` → Tiny Tina's Wonderlands
30. `placeholder_evildead.jpg` → Evil Dead: The Game
31. `placeholder_stray.jpg` → Stray
32. `placeholder_vampire.jpg` → Vampire Survivors
33. `placeholder_cult.jpg` → Cult of the Lamb
34. `placeholder_tunic.jpg` → Tunic
35. `placeholder_scorn.jpg` → Scorn
36. `placeholder_nier.jpg` → Nier: Automata
37. `placeholder_metro.jpg` → Metro Exodus
38. `placeholder_quarry.jpg` → The Quarry
39. `placeholder_wolong.jpg` → Wo Long: Fallen Dynasty
40. `placeholder_highonlife.jpg` → High on Life
41. `placeholder_deadspace.jpg` → Dead Space Remake
42. `placeholder_remnant2.jpg` → Remnant II
43. `placeholder_payday3.jpg` → Payday 3
44. `placeholder_ac6.jpg` → Armored Core VI
45. `placeholder_cities2.jpg` → Cities: Skylines II
46. `placeholder_alanwake2.jpg` → Alan Wake II
47. `placeholder_mk1.jpg` → Mortal Kombat 1
48. `placeholder_tcm.jpg` → The Texas Chain Saw Massacre
49. `placeholder_robocop.jpg` → Robocop: Rogue City

## Jak nahradit obrázky:

### Možnost 1: Stažení z internetu
1. Najděte oficiální cover art nebo screenshot hry
2. Stáhněte obrázek (doporučená velikost: 900x300px nebo 16:9 poměr)
3. Přejmenujte na odpovídající placeholder název
4. Umístěte do složky `v2/images/`

### Možnost 2: Použití Steam API
Mnoho her již má URL ze Steam CDN (např. The Witcher 3):
```
https://cdn.cloudflare.steamstatic.com/steam/apps/[APP_ID]/header.jpg
```

### Možnost 3: Generování AI obrázků
Použijte AI generátor obrázků s promptem:
"Video game cover art for [název hry], cinematic, game cover style, high quality"

## Automatická náhrada:

Po umístění obrázků do složky `images/`, aktualizujte cesty v `app.js`:
- Změňte `placeholder_nazev.jpg` na `images/placeholder_nazev.jpg`
- Nebo nahraďte celou cestu skutečnou URL

## Tip:
Pro rychlé testování můžete použít placeholder službu:
```
https://via.placeholder.com/900x300/1e2749/667eea?text=Název+Hry
```
