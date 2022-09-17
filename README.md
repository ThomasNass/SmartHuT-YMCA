# YMCA
Ett grupparbete gjort av

[Rami Alqanbar](https://github.com/AlqanbarRami) | 
[Kim Kristiansson](https://github.com/kimkristianssonJU) | 
[Thomas Näss](https://github.com/ThomasNass) | 
[Sara Linda Maria Rados](https://github.com/sararados)

För [Campus Värnamo, Webbutvecklare .NET](https://www.varnamo.se/campusvarnamo/utbildning/utbildningsarkiv/webbutvecklarenet.5.f0c3e6e174960600f056fb.html)
# Frontend

*Patch:* `./YMCA/YMCA-frontend`

 **Kör `npm install` i rotmappen för *YMCA-frontend innan du börjar***
I mappen YMCA-frontend React-projektet som utgör hela utvecklingen av klientgränssnittet. 
Här kan du starta projektet på en lokal server, fristående från YMCA-backend genom `npm start`.

#### Frontend tillsammans med backend
Du kan även utveckla fronend tillsamman med backenden för att få tillgång till data från SmartHut och SignalR.

 1. Starta backed-servern. 
 2. Navigera din terminal till rotmappen för frontend
    (`C:\..\SmartHuT-YMCA\YMCA\YMCA-frontend`)  och utför kommandot `npm
    run watch`.

### CLI
#### `npm run watch`
`npm run watch` kör en skript som är definierad i *package.json* filen i frontend-projektet. Skripten skapar och bygger om de automatiskt genererade filerna som Parcel skapar. Skripten tillåter dig även att utveckla direkt till byggfilerna som *wwwroot* ska innehålla

#### `npm run build`
Detta kommando kör en skript som liknar `npm run watch`, skillnaden är att `npm run build` bygger inte om filerna automatisk och du är inte heller uppkopplad till HMR (Hot Module Replacement).

### CSS Modules
CSS Modules är ett användbart verktyg för att pynta de olika komponenterna i ett React-projekt med vanlig CSS. CSS Module genererar unika namn på de CSS-klasser som skapas, baserat på förhållanden den CSS-fil som klasserna är definierade, alternativt också filens namn. 
Destu mer användbart är det i ett grupparbete där flera namngivna CSS-klasses från olika utvecklare ska existera i samma DOM.

CSS modules är ett verktyg som finns tillgängligt *by default* i Parcel JS.

#### Namngivning
CSS Modules namngivningsmönster är `YMCA-[hash]-[name]-[local]`.

 - `[hash]` - automatiskt genererad sträng, unikt för den CSS-klassen
 - `[name]` - namnet på CSS Module-filen för att enkelt kunna identifiera elementen och klasserna i browsern
 -  `[local]` - namnet på CSS-klassen du har skapat.

Ett exempel på hur namngivningen går till:
En React-komponent, ex. `App.jsx`, importerar klasser ifån CSS Module-filen `App.module.css`.
En av klasserna kan till exempel heta `my-header`.
I `App.jsx` kan då klassen `my-header` användas genom `myClassers["my-header"]` i en *key-value pair*. När komponenten senare rendreras ut så får CSS-klassen ett unikt namn i förhållande till dess *scope*.

Namngivningen går att omformatera i `package.json`

Läs mer i källor och material.

*Källor och material:*
HMR (Hot Module Replacemnet): https://en.parceljs.org/hmr.html
CLI (Command-Line Interface): https://en.parceljs.org/cli.html
CSS Modules (Parcel): https://parceljs.org/languages/css#css-modules
