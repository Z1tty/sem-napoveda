# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Always respond in Czech language.

## Projekt

Statická HTML dokumentace pro **SEM (Sklik Event Measurement)** – měřicí systém Skliku. Nasazena přes GitLab Pages na `sem-documentation-*.glpages.seznam.net`. Žádný build systém ani testy – změny se pushují přímo na `main`.

```bash
git add -A && git commit -m "..." && git push
```

## Struktura

```
docs/
  *.html          # Stránky dokumentace
  assets/
    style.css     # Veškeré styly včetně tok-* pro syntax highlighting
    main.js       # Copy button, nav active state
  img/            # Screenshoty – názvy popisují obsah (kebab-case)
*.docx            # Zdrojová technická dokumentace (podklady)
```

## Klíčové architektonické detaily

### Navigace je inline v každém souboru
Nav sidebar je zkopírován do každého `.html`. Při přidání stránky nebo přejmenování odkazu je nutné aktualizovat všechny soubory. Použij Python skript přes `Write` + `Bash`:

```python
import glob
for path in glob.glob('docs/*.html'):
    # replace nav string across all files
```

### Syntax highlighting – ruční tok-* spany
Nepoužívá se žádná knihovna. Kód se zvýrazňuje ručně pomocí `<span class="tok-*">`:
- `tok-keyword`, `tok-string`, `tok-number`, `tok-property`, `tok-comment`, `tok-function`, `tok-tag`, `tok-attr`

Každý `<pre><code>` musí být uvnitř `<div class="code-block">` s `code-block-header` a `copy-btn`.

### Callout-body – inline `<strong>` vyžaduje `<p>` wrapper
CSS: `.callout-body > strong { display: block }` – platí jen pro přímé potomky.
Pokud je za nadpisovým `<strong>` další text nebo inline `<strong>`, musí být text zabalen do `<p>`:

```html
<div class="callout-body">
  <strong>Nadpis calloutu</strong>
  <p>Text s <strong>inline strong</strong> zde.</p>
</div>
```

### URL parametry pro Správu měření
- Konverze: `https://www.sklik.cz/event-management?view=conversions`
- Retargeting: `https://www.sklik.cz/event-management?view=retargetings`
- SEM ID: `https://www.sklik.cz/settings`

## Zdrojové podklady

Technické detaily implementace čerpej z těchto souborů:
- `SEM_dokumentace_napoveda.docx` – kompletní technická dokumentace
- `Dokumentace k SEMu (1).docx` – retargeting, konverze, DRTG chování
- `Test_SEM.docx` – průvodce testováním
