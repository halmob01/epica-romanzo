/* Illustrazioni SVG originali, coerenti con il prologo di sito-feudo.
   Gli elementi reagiscono alle tre misure della simulazione. */
(function (root) {
  'use strict';
  const INK = '#1c1416', RED = '#c8102e', PAPER = '#fbf7f2';
  const defs = `<defs>
    <pattern id="stones" width="21" height="14" patternUnits="userSpaceOnUse"><path d="M0 7H21M10 0V7M2 7V14" fill="none" stroke="#bcafa4" stroke-width="1"/></pattern>
  </defs>`;
  const f = n => Number.isFinite(Number(n)) ? Number(n) : 0;
  function human(x,y,scale=1,red=RED) {
    return `<g transform="translate(${x} ${y}) scale(${scale})" stroke="${INK}" stroke-width="2.5" stroke-linecap="round">
      <path d="M-5 9L-13 30M5 9L13 30M-5 -18L-13 5M5 -18L17 0" fill="none"/>
      <path d="M-8 -24L8 -24L10 8L-10 8Z" fill="${red}"/>
      <circle cx="0" cy="-35" r="10" fill="#f2d3b3"/>
      <path d="M-11 -37L-14 -50L10 -50L12 -37Z" fill="#e5b84a"/>
    </g>`;
  }
  function sky(night=false) {
    return `<rect width="480" height="270" fill="${night?'#374455':'#f8efe3'}"/><path d="M0 173Q80 146 164 165T330 163T480 155V270H0Z" fill="${night?'#87918c':'#e1d4bd'}"/>${night?'<circle cx="405" cy="45" r="20" fill="#f6dfab"/><g fill="#f7e4c1"><circle cx="50" cy="40" r="2"/><circle cx="175" cy="28" r="2"/><circle cx="300" cy="62" r="2"/></g>':'<circle cx="392" cy="47" r="29" fill="#eabf77"/>'}`;
  }
  function walls(values={}) {
    const def=f(values.difesa ?? 65), prov=f(values.provviste ?? 60), fid=f(values.fiducia ?? 60);
    const weak=def<35;
    const houses=`<g fill="#fff" stroke="${INK}" stroke-width="2.4">
      <rect x="118" y="126" width="72" height="52"/><path d="M108 126L153 90L198 126Z" fill="${RED}"/>
      <rect x="208" y="122" width="61" height="55"/><path d="M199 122L238 91L277 122Z" fill="${RED}"/>
      <rect x="287" y="137" width="56" height="40"/><path d="M280 137L315 111L351 137Z" fill="${RED}"/>
      <path d="M152 154v24m82-25v24m77-21v21" stroke-width="11"/>
      </g>`;
    const reserves=Array.from({length:Math.max(0,Math.ceil(prov/20))},(_,i)=>`<g transform="translate(${23+i*22} 202)" stroke="${INK}" stroke-width="2"><path d="M0 31Q-5 7 8 2Q21 9 18 31Z" fill="#d6ac68"/><path d="M2 11H16" /></g>`).join('');
    const people=Array.from({length:fid>65?5:fid>35?3:1},(_,i)=>human(316+i*25,238,.4,i%2?INK:RED)).join('');
    return `<g>${houses}
      <path d="M0 170H480V251H0Z" fill="#d5c8b7" stroke="${INK}" stroke-width="3"/>
      <path d="M0 170H480V251H0Z" fill="url(#stones)" opacity=".76"/>
      <path d="M0 170H480V251H0Z" fill="none" stroke="${INK}" stroke-width="4"/>
      ${[15,104,377,458].map(x=>`<g stroke="${INK}" stroke-width="3"><rect x="${x}" y="140" width="35" height="111" fill="#c4b4a2"/><path d="M${x-5} 140v-13h10v-8h10v8h10v-8h10v8h5v13Z" fill="#eee4da"/></g>`).join('')}
      <path d="M189 251V204Q226 158 265 204V251Z" fill="${weak?'#6b4c42':'#4b3c36'}" stroke="${INK}" stroke-width="4"/>
      <path d="M227 180V250" stroke="#d4b07c" stroke-width="3"/>
      ${weak?'<path d="M0 170l26 28 19-17 25 31M365 173l-25 27-21-12" stroke="#793e3e" stroke-width="5" fill="none"/>':''}
      ${reserves}
      ${people}
      <g transform="translate(430 0)"><path d="M0 140V53" stroke="${INK}" stroke-width="4"/><path d="M0 55H-49V81H0Z" fill="${RED}" stroke="${INK}" stroke-width="3"/></g>
    </g>`;
  }
  function family() {
    return `<rect x="0" y="188" width="480" height="82" fill="#e9dfca"/>
      <path d="M70 188V92H395V188" stroke="${INK}" stroke-width="5" fill="#fff"/>
      <path d="M54 92L230 35L411 92Z" fill="${RED}" stroke="${INK}" stroke-width="4"/>
      ${human(168,202,1.45,RED)}${human(300,204,1.18,'#d0ad81')}
      <g stroke="${INK}" stroke-width="2.2" transform="translate(239 213)"><circle cx="0" cy="-13" r="8" fill="#f2d3b3"/><path d="M-6 -4H6V12H-6Z" fill="#e5b84a"/><path d="M-3 12L-8 22M3 12L8 22" fill="none"/></g>`;
  }
  function helmet() {
    return `${family()}<g transform="translate(149 193)" stroke="${INK}" stroke-width="3"><path d="M-21 -67Q0 -112 22 -67L27 -42H-26Z" fill="#e5b84a"/><path d="M-22 -74Q0 -132 24 -74" fill="none" stroke="${RED}" stroke-width="9"/><path d="M-28 -38H30" /></g><path d="M202 189Q223 180 232 202" fill="none" stroke="${RED}" stroke-width="3" stroke-dasharray="4 6"/>`;
  }
  function soldiers() {
    return `<path d="M0 240H480" stroke="${INK}" stroke-width="4"/>${human(142,229,1.65)}${human(343,232,1.35,'#5d6982')}
      <g transform="translate(190 85)" stroke="${INK}" stroke-width="3"><path d="M0 100V0" /><path d="M0 0L-7 16H7Z" fill="#ddd"/></g>
      <g transform="translate(390 107)" stroke="${INK}" stroke-width="3"><path d="M0 98V0"/><path d="M0 0L-7 16H7Z" fill="#ddd"/></g>`;
  }
  function storehouse(values) {
    let count=Math.max(1,Math.ceil(f(values.provviste??60)/16));
    const sacks=Array.from({length:count},(_,i)=>`<path d="M${105+i*41} 205Q${94+i*41} 169 ${124+i*41} 163Q${144+i*41} 181 ${136+i*41} 205Z" fill="#d9b77a" stroke="${INK}" stroke-width="3"/>`).join('');
    return `<rect x="65" y="84" width="360" height="150" fill="#eee2cf" stroke="${INK}" stroke-width="4"/><path d="M48 84L245 24L441 84Z" fill="${RED}" stroke="${INK}" stroke-width="4"/>
      <rect x="80" y="99" width="330" height="120" fill="#fbf7f2" stroke="${INK}" stroke-width="2"/>${sacks}`;
  }
  function markup(art='troia', values={}, storyId='ettore') {
    const atNight=art==='notte';
    let detail;
    if (art==='famiglia') detail=family();
    else if (art==='elmo') detail=helmet();
    else if (art==='magazzino') detail=storehouse(values);
    else if (art==='scelta') detail=soldiers();
    else detail=walls(values);
    const title=storyId==='achille'?'Il campo di battaglia':'La città di Troia';
    return `<svg viewBox="0 0 480 270" role="img" aria-label="${title}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      ${defs}${sky(atNight)}${detail}
      ${atNight?'<g fill="#f2b05e" opacity=".7"><circle cx="48" cy="243" r="7"><animate attributeName="opacity" values=".3;1;.3" dur="2s" repeatCount="indefinite"/></circle><circle cx="416" cy="241" r="5"><animate attributeName="opacity" values="1;.4;1" dur="2.4s" repeatCount="indefinite"/></circle></g>':''}
    </svg>`;
  }
  const API={markup};
  if (typeof module === 'object' && module.exports) module.exports=API;
  else root.EpicaMap=API;
})(typeof globalThis === 'object' ? globalThis : this);
