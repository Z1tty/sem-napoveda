# SEM – Sklik Event Measurement

Dokumentace nového jednotného měřicího systému Sklik, který nahrazuje původní retargetingový a konverzní skript.

## O projektu

SEM (Sklik Event Measurement) je univerzální měřicí vrstva pro inzerenty na Skliku. Umožňuje měřit události na webu a předávat je do Skliku pro optimalizaci kampaní, retargeting a vyhodnocování konverzí – vše přes jediný skript a jediné ID.

### Klíčové vlastnosti

- **Jeden skript** místo dvou (retargeting + konverze)
- **Jednotné SEM ID** pro správu měření
- **Flexibilní implementace** – HTML skript, GTM, Shoptet, Upgates nebo Server-to-Server (S2S)
- **Standardizované události** podle schématu blízkého GA4 a Meta Pixel
- **Consent Mode** – podpora pro správu souhlasů (GDPR)

## Obsah dokumentace

| Stránka | Popis |
|---|---|
| `docs/index.html` | Úvod a přehled SEM |
| `docs/jak-nasadit.html` | Jak nasadit SEM (4 metody implementace) |
| `docs/events.html` | Přehled všech událostí a jejich parametrů |
| `docs/drtg.html` | Dynamický retargeting (produkty a kategorie) |
| `docs/konverze.html` | Správa měření a konverzí |
| `docs/consent.html` | Consent Mode a práce se souhlasy |
| `docs/s2s.html` | Server-to-Server implementace |
| `docs/gtm.html` | Implementace přes Google Tag Manager |
| `docs/platformy.html` | Shoptet, Upgates a další platformy |
| `docs/skript.html` | Přímá implementace HTML skriptu |
| `docs/migrace.html` | Migrace ze starých skriptů |
| `docs/user-data.html` | Předávání uživatelských dat |
| `docs/sandbox.html` | Sandbox pro testování implementace |

## Technické detaily

- **Skript:** `l.seznam.cz/sul.js?id={SEM_ID}`
- **S2S endpoint:** samostatné SEM ID pro serverové volání
- **Povinné parametry:** pouze u události Purchase (`order_id`, `value`, `value_tax`, `currency`)
- **Zboží.cz:** kombinované SEM ID (account + provozovna)
