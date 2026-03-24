# Review dokumentace SEM
*Provedeno: 2026-03-24*

---

## Kritické problémy (vysoká priorita)

1. **`sandbox.html` je prázdný** – krok 3 průvodce přechodem odkazuje na prázdnou stránku. Blokuje ověření implementace.
2. ~~`review_email` chybí v tabulce `user-data.html`~~ – **ZRUŠENO.** `review_email` je parametr události `Purchase` (v `event_data`), ne součást `user_data`. Ve schématu v `user_data` není. Je správně zdokumentován v events.html (Purchase) a s2s.html.
3. **`value` bez DPH není explicitně v `konverze.html`** – tabulka nastavení konverze neříká "bez DPH", zatímco events.html ano. Riziko chybného výpočtu PNO.
4. **GTM stránka – nejasnost kolem SEM ID vs. SUL ID** – callout varuje před tlačítkem "Zobrazit kód", ale není vysvětleno proč (vrací SUL ID, ne SEM ID). Pro neinformovaného uživatele matoucí.

---

## Střední priorita

5. **Chybějící screenshoty** – konverze.html (přehled Správy měření), sem-id.html (pokročilé nastavení S2S), platformy.html (Shoptet). Placeholdery jsou na místě, ale stránky vypadají nedokončeně.
6. ~~`user-data.html` – chybí parametry~~ – **ZRUŠENO.** Tabulka obsahuje všechny parametry ze schématu včetně `st`, `zp`, `sr`, `country`. Bylo to již zapracováno.
7. **S2S – chybí curl/HTTP příklad** – JSON payload je, ale chybí ukázka samotného HTTP volání. Vývojář musí domýšlet.
8. **S2S – cookies `sid` a `udid`** – je řečeno "přečtěte z cookies", ale chybí kódový příklad jak cookies číst z JS.

---

## Nízká priorita / návrhy na zlepšení

9. **Cross-reference "Viz také"** – konverze.html po textu o RTG seznamech by měl linkovat na retargeting.html, drtg.html by měl linkovat na events.html#viewcontent.
10. **Rozhodovací strom pro výběr metody** – jak-nasadit.html má tabulku metod, ale chybí jednoduchý průvodce: "Máte GTM? → GTM šablona. Shoptet? → Plugin." Pro začátečníka by pomohl.
11. **S2S – chybí error handling** – žádná stránka nezmiňuje HTTP status kódy, retry strategii ani timeouty.
12. **index.html – kroky přechodu** – kroky jsou jasné, ale chybí stručné *proč* u každého kroku (pro začátečníka).

---

## Zjištění ze schématu `sem-hit-schema-v2.json`

Schema potvrzuje nebo upřesňuje několik věcí v dokumentaci:

### Potvrzená správnost
- `schema_version: "v2"` – správně v s2s.html
- `event_id` – UUID-7 doporučeno, schema říká "if missing, logger generates UUID v7" – správně
- `consent_mode` – Google Consent Mode v2 klíče sedí s consent.html
- `user_data` parametry `em, ph, fn, ln, ge, db, ct, st, zp, sr, country` – potvrzuje co chybí v user-data.html (body 6)

### Nepřesnosti v dokumentaci odhalené schématem

**A. `event_time` jsou milisekundy, ne sekundy**
- Schema: `"title": "Unix time in milliseconds"`
- `s2s.html` uvádí jen "UTC Unix timestamp" bez specifikace jednotky
- **Doporučení:** Doplnit "v milisekundách" do s2s.html

**B. `event_type` má 5 hodnot: `web`, `app`, `rtgconv`, `geo`, `poi`**
- `s2s.html` uvádí jen `"rtgconv"` jako hodnotu `event_type` pro S2S
- Schema ale říká, že `web` a `app` jsou také validní typy
- Hodnoty `geo` a `poi` pravděpodobně nejsou relevantní pro inzerenty
- **Doporučení:** Upřesnit v s2s.html, že `event_type` pro RTG/konverze je `"rtgconv"`, pro ostatní eventy z webu `"web"`, z aplikace `"app"`

**C. `sandbox` pole – klíč pro sandbox testování**
- Schema obsahuje pole `sandbox` s tokenem pro testovací prostředí
- `sandbox.html` je prázdná, ale schema odhaluje, jak sandbox technicky funguje – přes tento token
- **Doporučení:** Použít při tvorbě obsahu sandbox.html

**D. `user_data.sid` má specifický pattern**
- `sid` musí odpovídat: `^id=([0-9]+)|t=(0-9)+\.(0-9){3}|...`
- V dokumentaci toto není zmíněno – vývojář neví, v jakém formátu cookie číst
- **Doporučení:** Přidat poznámku do s2s.html, že `sid` se předává jako raw hodnota cookie (ne jen číslo)

**E. `s2s_headers` – Client Hints jsou volitelné**
- Schema obsahuje `sec_ch_ua`, `sec_ch_ua_mobile`, `sec_ch_ua_platform` atd.
- V s2s.html jsou zmíněny jen `client_ip_address` a `user_agent`
- **Doporučení:** Doplnit zmínku o Client Hints jako volitelných polích pro přesnější identifikaci zařízení

---

## Co funguje dobře

- **Navigace a struktura** – logické rozdělení do sekcí Začínáme / Implementace / Reference událostí / Pokročilé. Prolinkování mezi stránkami je konzistentní.
- **Terminologie** – "Správa měření", "SEM ID", "Dynamický retargeting" jsou používány jednotně.
- **Callout boxy** – důležitá upozornění (přepnutí nelze vrátit, review_email nesmí být hashován, SUL vs. SEM ID) jsou viditelná.
- **Kódové příklady** – syntax highlighting, copy button, srozumitelné komentáře v kódu.
- **events.html** – přehledová tabulka s UI názvy i kódovými názvy je velmi užitečná pro oba typy uživatelů.
- **retargeting.html** – typy RTG seznamů, podmínky + parametry na jednom místě jsou přehledné.
- **sem-id.html** – oddělení SEM ID a SEM ID pro S2S s tabulkou je správné řešení.
- **jak-nasadit.html** – 7 kroků s badge "Pouze při přechodu" je vhodné řešení pro oba typy uživatelů.

---

## Poznámky ke srozumitelnosti

**Pro začátečníka:** Stránky jako `index.html`, `jak-nasadit.html`, `platformy.html` jsou srozumitelné. Problém nastane na `s2s.html` – ta předpokládá vývojářské znalosti a je správně. Riziko je `sandbox.html` (prázdná) a absence vysvětlení *proč* u kroků přechodu.

**Pro vývojáře/analytika:** `events.html` a `s2s.html` jsou dobře zpracované. Chybí curl příklady a čtení cookies pro S2S. Parametrová tabulka v retargeting.html (event_source → Zdroj události) je užitečná.
