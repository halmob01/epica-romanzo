/* SVG originali per Epica. Stesso sistema visivo del feudo:
 * forme nette, inchiostro, rosso, crema. Nessuna immagine esterna.
 * La vista della città dipende dallo stato della simulazione, non da numeri storici. */
(function (root) {
  'use strict';
  const INK='#1c1416', RED='#c8102e', PAPER='#fbf7f2', STONE='#d8c6ae', GOLD='#d5a456', BLUE='#576d86';
  const n=(value,fallback=60)=>Number.isFinite(Number(value))?Math.max(0,Math.min(100,Number(value))):fallback;
  const svg=body=>`<svg viewBox="0 0 480 270" role="img" aria-label="Illustrazione della storia" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
  const sky=(night=false)=>`<rect width="480" height="270" fill="${night?'#323d52':'#f8efe3'}"/>
    <circle cx="403" cy="44" r="${night?19:28}" fill="${night?'#f3dfa6':'#e4b86c'}"/>
    ${night?'<g fill="#f3dfa6"><circle cx="61" cy="40" r="2"/><circle cx="174" cy="24" r="2"/><circle cx="321" cy="49" r="2"/></g>':''}
    <path d="M0 160Q95 119 180 151T354 133T480 145V270H0Z" fill="${night?'#777b84':'#e8ddc9'}"/>
    <path d="M0 204Q90 176 210 195T480 179V270H0Z" fill="${night?'#a8a397':'#ddcaaa'}"/>`;
  const frame=(s,extra='')=>svg(sky(false)+s+extra);

  function figure(x,y,s=1,color=RED,helmet=true) {
    return `<g transform="translate(${x} ${y}) scale(${s})" stroke="${INK}" stroke-width="2.3" stroke-linejoin="round" stroke-linecap="round">
      <path d="M-7 5L-12 28M7 5L12 28M-7 -21L-21 1M7 -21L19 -4" fill="none"/>
      <path d="M-10 -26L10 -26L11 8L-11 8Z" fill="${color}"/>
      <circle cy="-40" r="10" fill="#f2d2b0"/>
      ${helmet?`<path d="M-12 -45Q-15 -62 0 -65Q15 -62 12 -45L8 -39H-8Z" fill="${GOLD}"/><path d="M-10 -58Q0 -79 11 -58" stroke="${RED}" stroke-width="5" fill="none"/>`:'<path d="M-8 -47Q0 -53 8 -47" stroke="#58453b" fill="none"/>'}
    </g>`;
  }
  const child=(x,y,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})" stroke="${INK}" stroke-width="2">
    <circle cy="-19" r="8" fill="#f2d2b0"/><path d="M-7 -11H7V9H-7Z" fill="${GOLD}"/>
    <path d="M-4 9L-7 18M4 9L7 18M-7 -7L-12 1M7 -7L12 1" fill="none"/></g>`;
  function house(x,y,w=50) {
    return `<g stroke="${INK}" stroke-width="2.4" stroke-linejoin="round">
      <rect x="${x}" y="${y}" width="${w}" height="49" fill="#fff"/>
      <rect x="${x-6}" y="${y-8}" width="${w+12}" height="10" fill="${RED}"/><path d="M${x+8} ${y-8}v-7m${w-17} 7v-7" stroke="${INK}" stroke-width="3"/>
      <rect x="${x+w/2-6}" y="${y+21}" width="12" height="28" fill="${INK}"/>
      <rect x="${x+8}" y="${y+10}" width="10" height="11" fill="#efd9b3"/>
    </g>`;
  }
  function sack(x,y,scale=1) {
    return `<g transform="translate(${x} ${y}) scale(${scale})" stroke="${INK}" stroke-width="2">
      <path d="M-10 0Q-18 -17 -6 -27H6Q18 -17 10 0Z" fill="#d8aa62"/>
      <path d="M-7 -23H7" stroke="#855e33"/></g>`;
  }
  function shield(x,y,scale=1,col=RED) {
    return `<path d="M${x} ${y}m0 -18l${17*scale} ${7*scale}v${21*scale}q-${17*scale} ${21*scale} -${34*scale} 0v-${21*scale}Z" transform="translate(${17*scale} 0)" fill="${col}" stroke="${INK}" stroke-width="2.5"/>`;
  }
  function wallArt(values={}, night=false) {
    const defense=n(values.difesa,65), provisions=n(values.provviste,60), trust=n(values.fiducia,60);
    const defenders=Math.max(1,Math.ceil(defense/18));
    const crowd=Math.max(1,Math.ceil(trust/20));
    const supplies=Math.max(0,Math.ceil(provisions/20));
    const cracked=defense<35;
    const bg=sky(night);
    const houses=[house(88,125,59),house(170,113,55),house(248,130,56),house(328,108,68)].join('');
    const arms=Array.from({length:defenders},(_,i)=>figure(32+i*100,184,.46,i%2?INK:RED)).join('');
    const food=Array.from({length:supplies},(_,i)=>sack(58+i*24,255,.72)).join('');
    const citizens=Array.from({length:crowd},(_,i)=>figure(328+i*24,257,.43,i%2?'#8b7b65':RED,false)).join('');
    return `${bg}
      <g opacity=".7" stroke="${INK}" stroke-width="2">
        ${[25,58,400,430].map(x=>`<path d="M${x} 156V87M${x} 87l-14 9v-18Z" fill="${RED}"/>`).join('')}
      </g>
      ${houses}
      <path d="M0 178H480V252H0Z" fill="${STONE}" stroke="${INK}" stroke-width="3.5"/>
      <path d="M0 178H480V252H0Z" fill="none" stroke="#aa9483" stroke-width="1.5" stroke-dasharray="24 8"/>
      <path d="M0 178v-12h12v-12h17v12h15v-12h17v12h15v-12h17v12h15v-12h17v12h15v-12h17v12h15v-12h17v12h15v-12h17v12h15v-12h17v12h15v-12h17v12h15v-12h17v12h15v-12h17v12h15v-12h17v12h15v-12h17v12h15v-12h17v12h12v12"
        stroke="${INK}" stroke-width="3.5" fill="none"/>
      ${[15,437].map(x=>`<g stroke="${INK}" stroke-width="3"><rect x="${x}" y="142" width="31" height="109" fill="#bba68f"/><path d="M${x-4} 142v-13h9v-9h9v9h9v-9h9v9h5v13Z" fill="#f0e4d5"/></g>`).join('')}
      <path d="M195 252V215Q237 155 280 215V252Z" fill="#51423a" stroke="${INK}" stroke-width="4"/>
      <path d="M237 184V251" stroke="#b99d82" stroke-width="3"/>
      ${arms}
      ${cracked?'<path data-feature="cracks" d="M9 182l18 13-7 19 29 20M377 181l-13 23 17 18-12 28" fill="none" stroke="#8e4844" stroke-width="6"/>':''}
      <g data-feature="supplies">${food}</g><g data-feature="citizens">${citizens}</g>
      <g stroke="${INK}" stroke-width="2.5"><path d="M424 128V46"/><g class="ep-svg-flag"><path d="M424 47H364V77H424Z" fill="${RED}"/></g></g>
      <g font-family="system-ui,sans-serif" font-weight="800" font-size="12">
        <rect x="11" y="14" width="94" height="24" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
        <text x="19" y="31" fill="${INK}">DIFESA ${defense}</text>
        <rect x="12" y="230" width="104" height="21" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
        <text x="18" y="245" fill="${INK}">SCORTE ${provisions}</text>
        <rect x="331" y="230" width="137" height="21" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
        <text x="337" y="245" fill="${INK}">FIDUCIA ${trust}</text>
      </g>`;
  }
  function household(helmetOff=false) {
    return `${sky(false)}
      <rect x="52" y="112" width="377" height="140" fill="#fff" stroke="${INK}" stroke-width="4"/>
      <rect x="42" y="95" width="397" height="18" fill="${RED}" stroke="${INK}" stroke-width="4"/><rect x="62" y="76" width="359" height="19" fill="#eee2d0" stroke="${INK}" stroke-width="3"/>
      <path d="M62 232H414" stroke="#d2b38d" stroke-width="9"/>
      <rect x="200" y="145" width="76" height="106" fill="#f1ddba" stroke="${INK}" stroke-width="3"/>
      ${figure(152,212,1.5,RED,!helmetOff)}
      ${figure(332,219,1.38,BLUE,false)}
      ${child(242,219,1.2)}
      ${helmetOff?`<g transform="translate(105 220)" stroke="${INK}" stroke-width="2.5">
          <path d="M-20 0Q-20 -39 0 -45Q20 -39 20 0Z" fill="${GOLD}"/>
          <path d="M-13 -42Q0 -70 12 -42" fill="none" stroke="${RED}" stroke-width="7"/></g>
        <path d="M187 191Q213 182 224 195" fill="none" stroke="${INK}" stroke-width="2.5" stroke-dasharray="5 5"/>
        `:'<path d="M190 196Q211 196 223 210" stroke="#aa9483" stroke-width="3" fill="none"/>'}
      <g font-family="system-ui,sans-serif" font-size="12" font-weight="800" fill="${INK}">
        <text x="110" y="262">ETTORE</text><text x="289" y="262">ANDROMACA</text>
      </g>`;
  }
  function magazine(values={}) {
    const provisions=n(values.provviste,60), sacks=Math.max(0,Math.ceil(provisions/12));
    return `${sky(false)}
      <g stroke="${INK}" stroke-width="4"><rect x="56" y="89" width="368" height="149" fill="#f0e7d8"/>
      <rect x="41" y="72" width="398" height="19" fill="${RED}"/>
      <rect x="82" y="111" width="319" height="116" fill="${PAPER}"/></g>
      <path d="M82 178H401" stroke="#9f8d7d" stroke-width="3"/>
      ${Array.from({length:sacks},(_,i)=>sack(116+(i%7)*42,i<7?173:224,1.15)).join('')}
      ${figure(45,234,1.06,RED)}${figure(436,234,1.06,BLUE,false)}
      <text x="240" y="258" text-anchor="middle" font-size="14" font-weight="800" font-family="system-ui,sans-serif" fill="${INK}">LE PROVVISTE DIMINUISCONO</text>`;
  }
  function battlefield(night=false) {
    return `${sky(night)}
      <path d="M0 230Q120 198 250 228T480 217V270H0Z" fill="#cdbda3"/>
      ${[90,190,310,410].map((x,i)=>`<g transform="translate(${x} 20)">${figure(0,201,1.2,i%2?BLUE:RED)}
        <path d="M24 172l28 -18v36Z" fill="${i%2?'#d8b36b':RED}" stroke="${INK}" stroke-width="3"/>
        </g>`).join('')}
      <path d="M245 100V220M245 100l-9 17h18Z" fill="#d3a660" stroke="${INK}" stroke-width="3"/>`;
  }
  function relations(role=null) {
    const targets=[
      {id:'marito',x:116,y:84,fill:'#fff',label:'ANDROMACA'},
      {id:'padre',x:366,y:82,fill:'#fff',label:'ASTIANATTE'},
      {id:'difensore',x:240,y:215,fill:'#fff',label:'TROIA'}
    ];
    const node=(target)=>{
      const active=role===target.id;
      return `<g data-role-art="${target.id}" opacity="${!role||active?1:.33}">
        <circle cx="${target.x}" cy="${target.y}" r="${active?41:35}" fill="${active?'#f8dade':'#fff'}"
          stroke="${active?RED:INK}" stroke-width="${active?5:3}"/>
        ${target.id==='marito'?figure(116,100,.6,BLUE,false):target.id==='padre'?child(366,98,.8):`
          <path d="M211 230V199H269V230M204 198l36 -29 36 29" stroke="${INK}" stroke-width="3" fill="${STONE}"/>`}
        <rect x="${target.x-51}" y="${target.y+41}" width="102" height="23" fill="#fff" stroke="${INK}" stroke-width="2"/>
        <text x="${target.x}" y="${target.y+57}" text-anchor="middle" font-size="10" font-weight="800" fill="${INK}" font-family="system-ui,sans-serif">${target.label}</text>
      </g>`;
    };
    return `${sky(false)}
      <path d="M242 145L116 84M242 145L366 82M242 145V215" fill="none" stroke="${role?RED:INK}" stroke-width="${role?4:2}" stroke-dasharray="${role?'0':'6 7'}"/>
      ${figure(242,173,1.14,RED)}
      <rect x="192" y="179" width="100" height="25" fill="#fff" stroke="${INK}" stroke-width="2.5"/>
      <text x="242" y="196" font-weight="800" font-size="12" font-family="system-ui,sans-serif" fill="${RED}" text-anchor="middle">ETTORE</text>
      ${targets.map(node).join('')}`;
  }
function woman(x,y,scale=1,color='#576d86') {
  return `<g transform="translate(${x} ${y}) scale(${scale})" stroke="#1c1416" stroke-width="2.5" stroke-linecap="round">
    <path d="M-7 8L-12 32M7 8L12 32M-8 -25L-19 0M8 -25L19 0" fill="none"/>
    <path d="M-12 -27H12L17 10H-17Z" fill="${color}"/>
    <path d="M-11 -48Q0 -64 12 -48L15 -32H-14Z" fill="#352d2c"/>
    <circle cy="-43" r="10" fill="#f0c9a9"/></g>`;
}

function cityItaca(values={}) {
  const supply=Math.max(1,Math.ceil(n(values.casa,58)/17));
  const loyal=Math.max(1,Math.ceil(n(values.sostegno,48)/17));
  const time=n(values.tempo,35);
  return sky(false)+`<path d="M0 195Q80 185 180 193T480 188V270H0Z" fill="#d5c2a6"/>
    <g stroke="${INK}" stroke-width="3.5"><rect x="77" y="77" width="322" height="142" fill="#f4e8d6"/>
      <path d="M63 79H413V96H63Z" fill="${RED}"/>
      <rect x="102" y="112" width="42" height="105" fill="#e0c4a1"/>
      <rect x="329" y="112" width="42" height="105" fill="#e0c4a1"/>
      <rect x="201" y="128" width="75" height="90" fill="#9a7357"/>
      <path d="M239 128V215M93 105H392" stroke="${INK}" stroke-width="2"/></g>
    <g data-feature="loyal-servants">${Array.from({length:loyal},(_,i)=>woman(115+i*33,246,.46,i%2?BLUE:RED)).join('')}</g>
    <g data-feature="stores">${Array.from({length:supply},(_,i)=>sack(325+i*20,250,.63)).join('')}</g>
    <g><rect x="21" y="18" width="128" height="27" fill="#fff" stroke="${INK}" stroke-width="2"/>
      <text x="30" y="36" font-size="12" font-weight="800" font-family="system-ui" fill="${INK}">ATTESA ${time}</text></g>`;
}

function itacaDetail(art,values={},role=null) {
  if(art==='legami-itaca'){
    const pts=[{id:'penelope',label:'PENELOPE',x:89,y:100},{id:'telemaco',label:'TELEMACO',x:244,y:100},{id:'ulisse',label:'ULISSE',x:398,y:100}];
    return sky(false)+`<path d="M0 226H480" stroke="${INK}" stroke-width="4"/>`+
      pts.map((p,i)=>`<g data-view="${p.id}" opacity="${role&&role!==p.id?.25:1}">
        <rect x="${p.x-64}" y="60" width="128" height="165" fill="${role===p.id?'#f9e0e3':'#fff'}" stroke="${role===p.id?RED:INK}" stroke-width="${role===p.id?5:3}"/>
        ${i===0?woman(p.x,174,1.36,BLUE):figure(p.x,174,1.28,i===1?BLUE:RED,i===2)}
        <text x="${p.x}" y="203" text-anchor="middle" font-family="system-ui,sans-serif" font-weight="800" font-size="12" fill="${INK}">${p.label}</text>
      </g>`).join('')+
      `<path d="M152 132H180M308 132H334" stroke="${INK}" stroke-width="3" stroke-dasharray="5 6"/>`;
  }
  if(art==='tela'){
    const threads=Array.from({length:17},(_,i)=>`<line x1="${125+i*14}" y1="103" x2="${125+i*14}" y2="233" stroke="#d5bfa3" stroke-width="2"/>`).join('');
    const woven=Array.from({length:Math.ceil(n(values.tempo,35)/9)},(_,i)=>`<line x1="120" y1="${124+i*11}" x2="353" y2="${124+i*11}" stroke="${i%2?RED:BLUE}" stroke-width="5" opacity=".85"/>`).join('');
    return sky(false)+`<rect x="79" y="48" width="315" height="210" fill="#fbf6ec" stroke="${INK}" stroke-width="4"/>
      <rect x="115" y="82" width="246" height="168" fill="#efe8d7" stroke="${INK}" stroke-width="4"/>${threads}${woven}
      ${woman(72,219,1.1,BLUE)}
      <path d="M81 199L120 169" stroke="${INK}" stroke-width="3"/>`;
  }
  if(art==='proci'){
    return cityItaca(values)+Array.from({length:4},(_,i)=>figure(135+i*59,240,.83,i%2?'#7b6a57':BLUE,false)).join('')+
      `<rect x="171" y="227" width="131" height="13" fill="#d0ae7d" stroke="${INK}" stroke-width="2"/>`;
  }
  if(art==='nave'){
    return sky(false)+`<rect y="190" width="480" height="80" fill="#b8ced1"/>
      <path d="M25 215Q110 199 200 214T480 208" fill="none" stroke="#fff" stroke-width="3"/>
      <path d="M115 176H393L359 219H149Z" fill="#805b48" stroke="${INK}" stroke-width="4"/>
      <path d="M242 175V61" stroke="${INK}" stroke-width="5"/>
      <path d="M238 67V171H156Z" fill="#fff" stroke="${INK}" stroke-width="3"/>
      <path d="M250 77V169H326Z" fill="${RED}" stroke="${INK}" stroke-width="3"/>
      ${figure(220,182,.7,RED)}
      <path d="M401 181L451 160L479 177" fill="#d6c5ac" stroke="${INK}" stroke-width="3"/>`;
  }
  return cityItaca(values);
}

function modernPerson(x,y,scale=1,color=RED) {
  return `<g transform="translate(${x} ${y}) scale(${scale})" stroke="${INK}" stroke-width="2.5" stroke-linecap="round">
    <path d="M-10 10L-12 38M9 10L12 38M-11 -27L-21 2M11 -27L21 2" fill="none"/>
    <path d="M-13 -29H13V13H-13Z" fill="${color}"/>
    <circle cy="-42" r="10.5" fill="#efc7a7"/>
    <path d="M-12 -48Q-2 -62 12 -50L9 -52Q-1 -46 -12 -48" fill="${INK}"/></g>`;
}

function modernScene(art,values={},role=null) {
  const future=n(values.futuro,45), links=n(values.legami,60), together=n(values.insieme,38);
  const school=art==='ragazza', bus=art==='autobus', split=art==='due-sguardi';
  const factory=sky(false)+`<g stroke="${INK}" stroke-width="3">
      <rect x="45" y="97" width="390" height="146" fill="#e8ded2"/>
      <path d="M45 99L102 78L102 99L162 78L162 99L223 78L223 99H435" fill="#b7a99c"/>
      <rect x="318" y="41" width="41" height="58" fill="#d8cabc"/><rect x="369" y="26" width="33" height="73" fill="#d8cabc"/>
      <rect x="176" y="147" width="110" height="96" fill="${INK}"/>
      <path d="M193 161H267M193 175H267M193 189H267M193 203H267" stroke="#b8aaa0" stroke-width="3"/>
      <rect x="66" y="124" width="83" height="40" fill="#fff"/>
      <text x="107" y="150" text-anchor="middle" font-size="14" font-family="system-ui,sans-serif" font-weight="800" fill="${RED}">CHIUSA</text></g>
      <path d="M0 243H480" stroke="${INK}" stroke-width="4"/>`;
  const crowd=Array.from({length:Math.max(1,Math.ceil(together/20))},(_,i)=>modernPerson(40+i*51,239,.5,i%2?BLUE:RED)).join('');
  if(art==='fabbrica')return factory+`<g data-feature="community">${crowd}</g>`;
  if(art==='quartiere')return sky(false)+
    [42,177,315].map((x,i)=>`<g stroke="${INK}" stroke-width="3"><rect x="${x}" y="${68+i%2*16}" width="112" height="167" fill="#efe8dc"/>
      <rect x="${x-5}" y="${64+i%2*16}" width="122" height="12" fill="${i===1?RED:BLUE}"/>
      ${[0,1,2].map(k=>`<rect x="${x+13+k*32}" y="${97+i%2*16}" width="19" height="25" fill="#bbced0"/>
      <rect x="${x+13+k*32}" y="${140+i%2*16}" width="19" height="25" fill="#bbced0"/>`).join('')}
      <rect x="${x+45}" y="190" width="29" height="45" fill="${INK}"/></g>`).join('')+
    `<path d="M0 237H480" stroke="${INK}" stroke-width="4"/><g data-feature="community">${crowd}</g>`;
  if(school)return sky(false)+`<rect x="20" y="112" width="440" height="116" fill="#e4d8c9" stroke="${INK}" stroke-width="4"/>
    <rect x="37" y="105" width="406" height="10" fill="${RED}"/>
    <rect x="60" y="133" width="100" height="69" fill="#fff" stroke="${INK}" stroke-width="3"/>
    <text x="110" y="169" text-anchor="middle" font-size="13" font-family="system-ui" font-weight="800" fill="${INK}">SCUOLA</text>
    ${modernPerson(303,215,1.4,RED)}
    <path d="M332 205Q360 195 375 205V230H335Z" fill="${BLUE}" stroke="${INK}" stroke-width="3"/>
    <path d="M311 87Q355 54 397 85V112H311Z" fill="#fff" stroke="${INK}" stroke-width="2"/>
    <text x="353" y="103" text-anchor="middle" font-size="12" font-weight="800" fill="${RED}" font-family="system-ui">DOMANI?</text>`;
  if(bus)return sky(false)+`<path d="M0 235H480" stroke="${INK}" stroke-width="5"/>
    <rect x="49" y="113" width="331" height="113" rx="9" fill="#e5b54e" stroke="${INK}" stroke-width="4"/>
    ${Array.from({length:4},(_,i)=>`<rect x="${68+i*73}" y="134" width="63" height="51" fill="#bfd0d1" stroke="${INK}" stroke-width="2.5"/>`).join('')}
    <circle cx="120" cy="226" r="23" fill="${INK}"/><circle cx="313" cy="226" r="23" fill="${INK}"/>
    <circle cx="120" cy="226" r="11" fill="#fff"/><circle cx="313" cy="226" r="11" fill="#fff"/>
    <path d="M408 223V84M394 84H448V109H394Z" fill="#fff" stroke="${INK}" stroke-width="3"/>
    <text x="421" y="103" font-size="14" font-family="system-ui" font-weight="800" text-anchor="middle" fill="${RED}">BUS</text>`;
  if(split){
    const wide=(role==='insieme'),near=(role==='vicino');
    return `<rect width="480" height="270" fill="${PAPER}"/>
      <g data-view="insieme" opacity="${near?.28:1}">
      <rect x="5" y="5" width="232" height="260" fill="#e7ded2" stroke="${wide?RED:INK}" stroke-width="${wide?7:3}"/>
      <rect x="35" y="99" width="165" height="118" fill="#bcaea3" stroke="${INK}" stroke-width="3"/>
      <path d="M27 98L50 75 50 98 77 75 77 98 104 75 104 98H205" fill="#ddd4c9" stroke="${INK}" stroke-width="3"/>
      <rect x="88" y="150" width="58" height="67" fill="${INK}"/>
      <text x="120" y="246" text-anchor="middle" font-family="system-ui" font-weight="800" font-size="13" fill="${INK}">IL QUARTIERE</text></g>
      <g data-view="vicino" opacity="${wide?.28:1}">
      <rect x="243" y="5" width="232" height="260" fill="#fff" stroke="${near?RED:INK}" stroke-width="${near?7:3}"/>
      ${modernPerson(354,206,2,RED)}
      <text x="359" y="246" text-anchor="middle" font-family="system-ui" font-weight="800" font-size="13" fill="${INK}">NADIA</text></g>`;
  }
  return factory;
}
  function markup(art='troia', values={}, storyId='ettore', options={}) {
    const night=art==='notte';
    let inner;
    if(storyId==='penelope') inner=itacaDetail(art,values,options.role || null);
    else if(storyId==='oggi') inner=modernScene(art,values,options.role || null);
    else if(art==='ruoli') inner=relations(options.role || null);
    else if(art==='famiglia') inner=household(false);
    else if(art==='elmo') inner=household(true);
    else if(art==='magazzino') inner=magazine(values);
    else if(art==='scelta') inner=battlefield(false);
    else inner=wallArt(values,night);
    return svg(inner);
  }
  const API={markup};
  if(typeof module==='object' && module.exports) module.exports=API;
  else root.EpicaMap=API;
})(typeof globalThis==='object'?globalThis:this);
