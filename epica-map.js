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
  function markup(art='troia', values={}, storyId='ettore', options={}) {
    const night=art==='notte';
    let inner;
    if(art==='ruoli') inner=relations(options.role || null);
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
