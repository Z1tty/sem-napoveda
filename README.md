# SEM – Sklik Event Measurement

Dokumentace nového jednotného měřicího systému Sklik, který nahrazuje původní retargetingový a konverzní skript.

## O projektu

SEM (Sklik Event Measurement) je univerzální měřicí vrstva pro inzerenty na Skliku. Umožňuje měřit události na webu a předávat je do Skliku pro optimalizaci kampaní, retargeting a vyhodnocování konverzí – vše přes jediný skript a jediné ID.

### Klíčové vlastnosti

- **Jeden skript** místo dvou (retargeting + konverze)
- **Jednotné SEM ID** pro správu měření
- **Flexibilní implementace** – HTML skript, GTM, e-commerce platformy nebo Server-to-Server (S2S)
- **Standardizované události** podle schématu blízkého GA4 a Meta Pixel
- **Consent Mode** – podpora pro správu souhlasů (GDPR)

## Obsah dokumentace

### Začínáme

| Stránka | Popis |
|---|---|
| `docs/index.html` | Úvod, přehled výhod a postup přechodu |
| `docs/sem-id.html` | Kde najdu SEM ID – přehled identifikátorů |
| `docs/jak-nasadit.html` | Nasazení a přechod na SEM (7 kroků) |
| `docs/sandbox.html` | Testování implementace |

### Implementace

| Stránka | Popis |
|---|---|
| `docs/skript.html` | Přímá implementace HTML skriptu |
| `docs/gtm.html` | Implementace přes Google Tag Manager |
| `docs/platformy.html` | Doplňky pro e-commerce platformy |
| `docs/s2s.html` | Server-to-Server implementace |

### Reference událostí

| Stránka | Popis |
|---|---|
| `docs/events.html` | Přehled všech událostí a jejich parametrů |

### Pokročilé

| Stránka | Popis |
|---|---|
| `docs/consent.html` | Consent Mode a práce se souhlasy |
| `docs/user-data.html` | Předávání uživatelských dat |
| `docs/retargeting.html` | Retargeting – typy seznamů, podmínky |
| `docs/drtg.html` | Dynamický retargeting (produkty a kategorie) |
| `docs/konverze.html` | Správa konverzí |

## Technické detaily

- **Skript:** `l.seznam.cz/sul.js?id={SEM_ID}`
- **S2S endpoint:** `https://sem.seznam.cz/rtgconv` (POST, Content-Type: application/json)
- **Schema verze:** `v2`
- **Povinné parametry Purchase:** `order_id`, `value`, `value_tax`, `currency`
- **Zboží.cz:** kombinované SEM ID (účet + provozovna)
