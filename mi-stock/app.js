
/* ===================== DATOS ===================== */
// Escala de temperatura: 0 frío, 1 fresco, 2 templado, 3 calor, 4 calor extremo
const TEMP = ["Frío","Fresco","Templado","Calor","Calor extremo"];
const FAM = {fresco:"Fresco",acuatico:"Acuático",citrico:"Cítrico",dulce:"Dulce",gourmand:"Gourmand",especiado:"Especiado",amaderado:"Amaderado",floral:"Floral",frutal:"Frutal",aromatico:"Aromático",ambar:"Ámbar",ahumado:"Ahumado",cremoso:"Cremoso",salado:"Salado",cuero:"Cuero y tabaco"};
const OC = {dia:"Día",oficina:"Oficina",noche:"Noche",cita:"Cita",fiesta:"Fiesta"};
const PR = ["","Accesible","Medio","Premium"];

// Catálogo Essence & Co (precios actualizados el 2 de noviembre de 2026). t: A árabe, D diseñador, C Cuba, B body mist.
// precios por pieza según total del pedido: [1–4, 5–14, 15–24, 25–49, 50–99, 100+]. costo: precio del proveedor (IanCarloMV) en los mismos niveles; stock: existencias del proveedor al 2 de noviembre de 2026. Familias, clima y demanda: clasificación a partir de las notas.
const BASE = window.__BASE__ || [];
// [id, nombre, población Censo 2020 (millones), personas en pobreza 2024 (miles, INEGI), temp. verano, temp. invierno, humedad, ciudades, nota]
const ESTADOS = [
 ["ags","Aguascalientes",1.425,255.4,2,1,"baja","Aguascalientes","Industria automotriz. La Feria de San Marcos (abril–mayo) mueve mucho regalo y compra."],
 ["bc","Baja California",3.769,373.4,3,1,"baja","Tijuana, Mexicali, Ensenada","Mexicali pasa de 45 °C en verano; Tijuana y Ensenada son templadas. Frontera: el cliente compara con precios de EUA."],
 ["bcs","Baja California Sur",0.798,89.3,3,2,"media","La Paz, Los Cabos","Turismo en Los Cabos y La Paz. Calor seco con brisa de mar."],
 ["camp","Campeche",0.928,347.5,4,3,"alta","Campeche, Cd. del Carmen","Calor húmedo todo el año. Cd. del Carmen tiene trabajadores de la industria petrolera."],
 ["coah","Coahuila",3.147,421.8,4,1,"baja","Saltillo, Torreón, Monclova","Torreón es muy caluroso en verano; Saltillo es más templado. Inviernos fríos y fuerte base industrial."],
 ["col","Colima",0.731,108.8,4,3,"alta","Colima, Manzanillo","Calor húmedo; Manzanillo es puerto. Mercado pequeño con buen nivel de ingreso."],
 ["chis","Chiapas",5.544,3866.0,3,2,"alta","Tuxtla Gutiérrez, Tapachula, San Cristóbal","Tuxtla y Tapachula son calurosas; San Cristóbal es fría. Es el estado con más pobreza: decants y árabes accesibles."],
 ["chih","Chihuahua",3.742,587.3,3,0,"baja","Cd. Juárez, Chihuahua","Veranos calurosos y secos; inviernos de los más fríos del país, con heladas y nieve. Cd. Juárez es frontera."],
 ["cdmx","Ciudad de México",9.209,1843.5,2,1,"media","Toda la ciudad","Templado casi todo el año, con mañanas frías en invierno. Mucha desigualdad: hay zonas de alto poder adquisitivo y zonas populares."],
 ["dgo","Durango",1.833,529.0,3,1,"baja","Durango, Gómez Palacio, Lerdo","La capital tiene inviernos fríos; La Laguna (Gómez Palacio, Lerdo) es muy calurosa en verano."],
 ["gto","Guanajuato",6.167,1642.9,2,1,"baja","León, Irapuato, Celaya, San Francisco del Rincón","Tu base: puedes entregar en persona. Clima templado y seco."],
 ["gro","Guerrero",3.541,2092.6,4,3,"alta","Acapulco, Chilpancingo, Zihuatanejo, Iguala","Costa con calor húmedo todo el año. Nivel económico bajo: prioriza precio y decants."],
 ["hgo","Hidalgo",3.082,1140.5,2,1,"media","Pachuca, Tulancingo","Pachuca es fría y con mucho viento; la Huasteca hidalguense es cálida."],
 ["jal","Jalisco",8.348,1626.4,3,2,"media","Guadalajara, Zapopan, Puerto Vallarta","Guadalajara tiene calor seco en abril–mayo y lluvias en verano. Puerto Vallarta: calor húmedo todo el año."],
 ["mex","Estado de México",16.992,5530.4,2,1,"media","Toluca, Ecatepec, Naucalpan, Nezahualcóyotl","El mercado más grande del país por población. Toluca es de las ciudades más frías del centro."],
 ["mich","Michoacán",4.749,1694.1,3,2,"media","Morelia, Uruapan, Lázaro Cárdenas","Morelia es templada; Tierra Caliente y Lázaro Cárdenas son muy calurosas."],
 ["mor","Morelos",1.971,697.2,3,2,"media","Cuernavaca, Cuautla","Cuernavaca es templada todo el año; Cuautla y el oriente son más calurosos."],
 ["nay","Nayarit",1.235,292.1,4,3,"alta","Tepic, Bahía de Banderas","Calor húmedo en la costa (Riviera Nayarit); Tepic es más templado."],
 ["nl","Nuevo León",5.784,648.5,4,1,"media","Monterrey y zona metropolitana","Monterrey supera los 38 °C en verano y tiene inviernos cortos pero fríos. Uno de los niveles de ingreso más altos."],
 ["oax","Oaxaca",4.132,2203.5,3,2,"media","Oaxaca, Salina Cruz, Puerto Escondido","Valles centrales templados; la costa es caliente y húmeda. Nivel económico bajo."],
 ["pue","Puebla",6.583,2865.0,2,1,"media","Puebla, Tehuacán, Atlixco","Templado con inviernos frescos. Cerca de CDMX; gran mercado."],
 ["qro","Querétaro",2.368,414.0,2,1,"baja","Querétaro, San Juan del Río","Ciudad en crecimiento con industria y empleo formal. Clima templado y seco."],
 ["qroo","Quintana Roo",1.858,339.8,4,3,"alta","Cancún, Playa del Carmen, Chetumal","Calor húmedo todo el año y muchos trabajadores del turismo."],
 ["slp","San Luis Potosí",2.822,874.8,3,1,"baja","San Luis Potosí, Cd. Valles","La capital es templada y seca; la Huasteca potosina es calurosa y húmeda."],
 ["sin","Sinaloa",3.027,533.1,4,3,"alta","Culiacán, Mazatlán, Los Mochis","Verano muy caluroso y húmedo. Inviernos suaves."],
 ["son","Sonora",2.944,431.7,4,2,"baja","Hermosillo, Cd. Obregón, Nogales","Hermosillo supera los 45 °C en verano, con calor seco. Inviernos templados."],
 ["tab","Tabasco",2.402,881.5,4,3,"alta","Villahermosa","Calor húmedo todo el año, de los más intensos del país."],
 ["tamps","Tamaulipas",3.527,720.4,4,2,"alta","Tampico, Reynosa, Matamoros, Nuevo Laredo","Tampico es húmedo; Reynosa, Matamoros y Nuevo Laredo son calurosos y fronterizos."],
 ["tlax","Tlaxcala",1.343,598.7,2,1,"media","Tlaxcala, Apizaco","Templado-frío. Estado pequeño, cerca de Puebla."],
 ["ver","Veracruz",8.063,3601.9,4,3,"alta","Veracruz, Xalapa, Coatzacoalcos, Poza Rica","El puerto y Coatzacoalcos tienen calor húmedo. Xalapa es templada y lluviosa."],
 ["yuc","Yucatán",2.320,633.6,4,3,"alta","Mérida, Progreso, Valladolid","Mérida pasa de 40 °C en abril–mayo y es húmeda. Inviernos suaves."],
 ["zac","Zacatecas",1.622,605.3,2,0,"baja","Zacatecas, Fresnillo","Semiseco con inviernos fríos; de los estados más fríos del centro-norte."]
].map(a=>({id:a[0],n:a[1],pob:a[2],pobres:a[3],v:a[4],i:a[5],hum:a[6],ciudades:a[7],nota:a[8]}));
// Porcentajes publicados por INEGI para los tres estados con menos pobreza; el resto es aproximado con la población del Censo 2020
const POBREZA_PUBLICADA = {bc:9.9,bcs:10.2,nl:10.6};

const MESES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
const TEMPORADA = [
 "Reyes (6 de enero) y cuesta de enero: ofrece decants y opciones económicas.",
 "14 de febrero: la fecha fuerte para regalar perfume a la pareja. Arma kits de regalo desde finales de enero.",
 "Empieza la primavera: suben los perfumes frescos. Prepara inventario para Semana Santa.",
 "Semana Santa y calor: frescos y acuáticos se venden más.",
 "10 de mayo (Día de las Madres): perfumes de mujer y sets de regalo.",
 "Día del Padre (tercer domingo de junio): perfumes de hombre.",
 "Vacaciones de verano: frescos, cítricos y decants de viaje.",
 "Regreso a clases: el gasto se va a útiles. Ofrece decants y opciones accesibles.",
 "Fiestas patrias. Buen momento para conseguir revendedores nuevos antes de fin de año.",
 "Prepara fin de año: los revendedores compran inventario para el Buen Fin y Navidad.",
 "Buen Fin (mediados de noviembre) y arranque de la temporada navideña: la mejor época para revendedores. Los dulces y especiados empiezan a venderse más.",
 "Navidad, aguinaldo e intercambios: el mes más fuerte para regalos."
];

/* ===================== ESTADO Y GUARDADO ===================== */
let S = {clientes:[], borrados:[], cat:{}, extra:[], cfg:{diaCompra:4}};
let dbRef = null, saveMode = "local", saving = false, pending = false;
const LS_KEY = "essence-centro-v1";
function lsGet(){ try{ const r = localStorage.getItem(LS_KEY); return r? JSON.parse(r): null; }catch(e){ return null; } }
function lsSet(){ try{ localStorage.setItem(LS_KEY, JSON.stringify(S)); return true; }catch(e){ return false; } }
function setPill(txt, cls){ const p = document.getElementById("savePill"); p.textContent = txt; p.className = "pill " + (cls||""); }
let saveTimer = null, saveTimerVivo = false;
const SOLO_CONSULTA = !window.__BASE__;
async function saveFinanzas(){
  S.finanzas = finz();
  if(!SOLO_CONSULTA){ save(); return; }
  lsSet();
  if(!dbRef){ return; }
  try{ setPill("Guardando…","plain"); await dbRef.update({finanzas:S.finanzas, extra:S.extra||[]}); setPill("Guardado en tu cuenta","good"); }
  catch(e){ setPill("No se pudo guardar","bad"); }
}
function save(){
  if(SOLO_CONSULTA){ toast("Esta versión es solo de consulta: registra los cambios en la página de GitHub"); setTimeout(()=>location.reload(), 1800); return; }
  lsSet();
  if(saveMode !== "db"){ setPill(lsSet()? "Guardado en este navegador" : "Sin guardar", lsSet()? "warn":"bad"); return; }
  clearTimeout(saveTimer);
  setPill("Guardando…","plain");
  remotoPendiente = null; // lo local es más nuevo
  saveTimerVivo = true;
  saveTimer = setTimeout(()=>{ saveTimerVivo = false; flush(); }, 600);
}
async function flush(){
  if(!dbRef) return;
  if(saving){ pending = true; return; }
  saving = true;
  try{
    await dbRef.set({clientes:S.clientes, borrados:S.borrados||[], finanzas:finz(), cat:S.cat, extra:S.extra, cfg:S.cfg||{}, persona:yo(), actualizado:new Date().toISOString()});
    setPill("Guardado en tu cuenta","good");
  }catch(e){
    if(e && e.code === "unavailable"){ await new Promise(r=>setTimeout(r, 800+Math.random()*800)); saving=false; return flush(); }
    if(e && e.code === "invalid_argument"){ saving=false; setPill("Tu acceso es solo de lectura: pide a Braulio que te comparta como Colaborador","bad"); return; }
    setPill("No se pudo guardar en tu cuenta; quedó en este navegador","warn");
  }
  saving = false;
  remotoPendiente = null; // lo que llegó mientras guardabas es anterior a tu cambio
  if(pending){ pending = false; flush(); }
}
let OTROS = {}, MI_UID = null, ES_DUENO = null, migrado = false, remotoPendiente = null;
function saveTimer_activo(){ return !!saveTimerVivo; }
const SOCIOS_EQ = ["Braulio","Santiago"];
function yo(){ return (S.cfg&&S.cfg.persona) || (ES_DUENO===false? "Santiago" : "Braulio"); }
function cargarS(d){ S = {finanzas: JSON.parse(JSON.stringify(d.finanzas||{gastos:[],pagosIan:[],restocks:[]})), clientes: JSON.parse(JSON.stringify(d.clientes||[])), borrados: JSON.parse(JSON.stringify(d.borrados||[])), cat: JSON.parse(JSON.stringify(d.cat||{})), extra: JSON.parse(JSON.stringify(d.extra||[])), cfg: JSON.parse(JSON.stringify(d.cfg||{diaCompra:4}))}; }
async function initStore(){
  const local = lsGet();
  if(local){ S = Object.assign({clientes:[],cat:{},extra:[],cfg:{diaCompra:4}}, local); }
  setPill(local? "Guardado en este navegador":"Listo", local? "warn":"plain");
  renderAll();
  if(!window.claude || !window.claude.use) return;
  try{
    const [db, user] = await Promise.all([claude.use("db"), claude.use("user")]);
    if(!db || !user) return;
    const uid = await user.id();
    if(!uid) return;
    MI_UID = uid;
    try{ ES_DUENO = user.isOwner? !!(await user.isOwner()) : null; }catch(e){ ES_DUENO = null; }
    const privado = db.doc("data/users/" + uid + "/centro");
    dbRef = db.doc("equipo/" + uid);
    let first = true;
    const t = setTimeout(()=>{ if(first) setPill("No se pudo conectar; usando este navegador","warn"); }, 10000);
    db.collection("equipo").onSnapshot(async qs=>{
      if(!qs.metadata.fromCache) clearTimeout(t);
      const otros = {}; let mio = null;
      qs.docs.forEach(d=>{ if(!d.exists) return; if(d.id===uid) mio = d; else otros[d.id] = d.data(); });
      OTROS = otros;
      saveMode = "db";
      if(mio){
        if(!mio.metadata.hasPendingWrites){
          const nuevo = mio.data();
          if($("#ov").classList.contains("on") || saving || saveTimer_activo()) remotoPendiente = nuevo;
          else { cargarS(nuevo); lsSet(); }
        }
        setPill("Guardado en tu cuenta","good");
      } else if(first && !qs.metadata.fromCache && !migrado){
        migrado = true;
        // primera vez con la versión compartida: trae lo que estaba guardado antes
        try{ const old = await privado.get(); if(old.exists) cargarS(old.data()); }catch(e){}
        S.cfg = S.cfg||{diaCompra:4};
        if(!S.cfg.persona) S.cfg.persona = (ES_DUENO===false? "Santiago" : "Braulio");
        if(S.clientes.length || Object.keys(S.cat||{}).length || (S.extra||[]).length || S.cfg.persona) flush();
      }
      if(!qs.metadata.fromCache) first = false;
      renderAll();
    }, err=>{ clearTimeout(t); saveMode="local"; setPill("Guardado en este navegador","warn"); renderAll(); });
  }catch(e){ /* sin capacidad: se queda en el navegador */ }
}

/* ===================== UTILIDADES ===================== */
const $ = s=>document.querySelector(s);
const esc = s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const money = n=>"$" + (Math.round(n)||0).toLocaleString("es-MX");
const uid = ()=>Math.random().toString(36).slice(2,10);
function hoyISO(){ const d=new Date(); d.setMinutes(d.getMinutes()-d.getTimezoneOffset()); return d.toISOString().slice(0,10); }
function addDays(iso, n){ const d = new Date(iso+"T12:00:00"); d.setDate(d.getDate()+n); return d.toISOString().slice(0,10); }
function diffDays(a, b){ return Math.round((new Date(a+"T12:00:00") - new Date(b+"T12:00:00"))/86400000); }
function fecha(iso){ const d=new Date(iso+"T12:00:00"); return d.toLocaleDateString("es-MX",{day:"numeric",month:"short"}); }
function toast(t){ const el=$("#toast"); el.textContent=t; el.classList.add("on"); clearTimeout(el._t); el._t=setTimeout(()=>el.classList.remove("on"),1800); }
async function copiar(txt){
  try{ await navigator.clipboard.writeText(txt); toast("Mensaje copiado"); }
  catch(e){
    const ta=document.createElement("textarea"); ta.value=txt; document.body.appendChild(ta); ta.select();
    let ok=false; try{ ok=document.execCommand("copy"); }catch(_){}
    ta.remove(); toast(ok? "Mensaje copiado" : "No se pudo copiar: mantén presionado el texto para copiarlo");
  }
}
function waLink(tel, txt){ const n=String(tel||"").replace(/\D/g,""); if(!n) return ""; const full = n.length===10? "52"+n : n; return "https://wa.me/"+full+"?text="+encodeURIComponent(txt); }
document.addEventListener("click", e=>{
  const b = e.target.closest("[data-copy]");
  if(b){ const src = document.getElementById(b.dataset.copy); if(src) copiar(src.textContent); }
  const bf = e.target.closest("[data-notapdf],[data-notaxls]");
  if(bf){ const [cid,pid] = (bf.dataset.notapdf||bf.dataset.notaxls).split("|"); const c = clientesVista().concat(S.borrados||[]).find(x=>x.id===cid); const p = c && (c.pedidos||[]).find(x=>x.id===pid); if(c&&p){ bf.disabled=true; (bf.dataset.notapdf? notaPDF(c,p) : notaExcel(c,p)).catch(err=>toast("No se pudo crear el archivo. Revisa tu conexión e inténtalo otra vez")).finally(()=>bf.disabled=false); } }
  const bn = e.target.closest("[data-copynota]");
  if(bn){ const [cid,pid] = bn.dataset.copynota.split("|"); const c = clientesVista().concat(S.borrados||[]).find(x=>x.id===cid); const p = c && (c.pedidos||[]).find(x=>x.id===pid); if(c&&p) copiarTabla(c,p); }
});

function perfumes(){ const ids=new Set(BASE.map(p=>p.id).concat((S.extra||[]).map(p=>p.id))); const otros=[]; Object.values(OTROS).forEach(d=>((d&&d.extra)||[]).forEach(p=>{ if(p&&p.id&&!ids.has(p.id)){ ids.add(p.id); otros.push(p); } })); return BASE.concat(S.extra||[], otros); }
function catDueno(){ const d = Object.values(OTROS).find(x=>x&&x.persona==="Braulio"); return (d&&d.cat)||{}; }
function info(p){ return S.cat[p.id] || (yo()!=="Braulio"? catDueno()[p.id] : null) || {}; }
function costoDe(p, pz){ const o=info(p).costo; const t=tierIdx(pz||1); if(o) return o*(1-[0,.10,.15,.18,.20,.22][t]); return p.costo? p.costo[t] : 0; }
function agotado(p){ const i=info(p); if(typeof i.agotado==="boolean") return i.agotado; if(p.stock==null) return !String(p.id).startsWith("x"); return p.stock<=0; }
// Regla de margen de Braulio (sobre el costo del proveedor)
function margenRegla(c){ return c<300? .35 : c<=700? .20 : c<=1500? .15 : c<=2500? .10 : .08; }
function minRegla(c){ return c<300? 0 : c<=700? 100 : c<=1500? 140 : c<=2500? 225 : 250; }
function precioRegla(c){ return Math.round(Math.max(c*(1+margenRegla(c)), c+minRegla(c))/5)*5; }
const TIPO = {A:"Árabe",D:"Diseñador",C:"Cuba",B:"Body mist"};
function tierIdx(pz){ return pz>=100?5: pz>=50?4: pz>=25?3: pz>=15?2: pz>=5?1: 0; }
function precioDe(p, pz){ const pr=p.precios||[]; return pr[tierIdx(pz||1)] || pr[0] || 0; }
function precioTxt(p, rev){ const a=precioDe(p,1); if(!a) return ""; return rev? `${money(precioDe(p,5))} en mayoreo (5+ piezas)` : money(a); }
function fotoHTML(p, cls){ return p && p.img? `<img class="foto ${cls||""}" src="img/${p.id}.jpg" alt="${esc(p.n)}" loading="lazy" width="56" height="56">` : `<span class="foto nofoto ${cls||""}">Sin foto</span>`; }
function huele(p){
  if(p.huele) return p.huele;
  const parts=(p.notas||[]).map(x=>(x||"").split(",").map(y=>y.trim()).filter(Boolean));
  const pick=[...(parts[0]||[]).slice(0,2),...(parts[1]||[]).slice(0,1),...(parts[2]||[]).slice(0,1)];
  if(!pick.length) return "—";
  return pick.length===1? pick[0] : pick.slice(0,-1).join(", ")+" y "+pick[pick.length-1].toLowerCase();
}
function estadoById(id){ return ESTADOS.find(e=>e.id===id); }
function pobrezaPct(e){ return POBREZA_PUBLICADA[e.id] || (e.pobres/1000)/e.pob*100; }
function nivelEcon(e){
  const p = pobrezaPct(e);
  if(p<16) return {n:5,t:"Alto"}; if(p<22) return {n:4,t:"Medio-alto"}; if(p<33) return {n:3,t:"Medio"}; if(p<45) return {n:2,t:"Medio-bajo"}; return {n:1,t:"Bajo"};
}
function climaMes(e, m){ // m 0-11
  if(m>=3 && m<=9) return {t:e.v, s:"Temporada de calor y lluvias"};
  if(m===11 || m<=1) return {t:e.i, s:"Invierno"};
  return {t:Math.min(e.v, e.i+1), s: m===10? "Otoño: días templados, noches frescas" : "Primavera: empieza el calor"};
}
function generoOk(p, g){ return g==="T" || p.g===g || p.g==="U"; }

/* Puntaje de un perfume para un contexto */
function puntaje(p, ctx){
  let s = 0, why = [];
  const t = ctx.t;
  if(t < p.cmin){ s -= (p.cmin-t)*3; } else if(t > p.cmax){ s -= (t-p.cmax)*3; } else { s += 3; why.push("va bien con clima " + TEMP[t].toLowerCase()); }
  const fresco = p.fam.some(f=>["acuatico","citrico","fresco"].includes(f));
  if(ctx.hum==="alta" && t>=3){
    if(p.int===3) s -= 2;
    if(p.fam.includes("gourmand")) s -= 2;
    if(fresco){ s += 1; why.push("aguanta la humedad sin empalagar"); }
  }
  if(t<=1 && p.int>=2 && !fresco){ s += 0.5; }
  const w = ctx.tipo==="rev"? 1.5 : 0.8;
  s += p.dem * w;
  if(p.dem===3) why.push(ctx.tipo==="rev"? "alta rotación: se vende rápido" : "de los más buscados");
  if(ctx.econ){
    const ideal = ctx.econ<=2? 1 : ctx.econ===3? 1.5 : ctx.econ===4? 2 : 2.5;
    const d = Math.abs(p.pr - ideal);
    s -= d * (ctx.tipo==="rev"? 1.6 : 1.0);
    if(d<=0.5) why.push("precio acorde a la zona");
  }
  if(ctx.pres){ s -= Math.abs(p.pr - ctx.pres) * 2; }
  if(ctx.estilo && ctx.estilo!=="nose"){
    const mapa = {fresco:["fresco","acuatico","citrico","aromatico"],dulce:["dulce","gourmand","cremoso","ambar"],amaderado:["amaderado","especiado","ahumado","ambar"],floral:["floral","frutal"]};
    if(p.fam.some(f=>mapa[ctx.estilo].includes(f))){ s += 4; why.push("es del estilo que le gusta"); } else s -= 2;
  }
  if(ctx.momento){
    const mm = ctx.momento==="noche"? ["noche","fiesta"] : [ctx.momento];
    if(p.oc.some(o=>mm.includes(o))){ s += 2; why.push("ideal para " + (OC[ctx.momento]||ctx.momento).toLowerCase()); } else s -= 1;
  }
  if(ctx.gusta){
    const g = perfumes().find(x=>x.id===ctx.gusta);
    if(g && g.id!==p.id){ const c = p.fam.filter(f=>g.fam.includes(f)).length; s += c*1.5; if(c>=2) why.push("se parece en estilo a " + g.n); }
    if(g && g.id===p.id) s -= 5;
  }
  if(p.t==="C"||p.t==="B") s -= 3;
  return {s, why};
}
function recomendar(ctx, n){
  let lista = perfumes().filter(p=>generoOk(p, ctx.g));
  lista = lista.filter(p=>!agotado(p));
  if(!ctx.extra) lista = lista.filter(p=>p.t!=="C" && p.t!=="B");
  if(ctx.linea==="A" || ctx.linea==="D") lista = lista.filter(p=>p.t===ctx.linea);
  return lista.map(p=>Object.assign({p}, puntaje(p, ctx))).sort((a,b)=>b.s-a.s).slice(0,n);
}
function consejosClima(t, hum){
  if(t>=3 && hum==="alta") return {si:["Cítricos","Acuáticos","Frutales ligeros","Frescos"], no:"Gourmands muy dulces e intensos de día: con calor húmedo se vuelven empalagosos.", tip:"Recomienda 2 o 3 atomizaciones y llevar un decant para retocar."};
  if(t>=3) return {si:["Frescos especiados","Aromáticos","Acuáticos","Dulces solo de noche"], no:"Perfumes muy pesados de día con el calor más fuerte.", tip:"Con calor seco el perfume se evapora rápido: ofrece los de buena duración y un decant para retocar."};
  if(t===2) return {si:["Versátiles","Frescos de día","Dulces y amaderados de noche"], no:"Casi nada: es el clima más fácil para vender de todo.", tip:"Ofrece un fresco para el día y uno dulce para la noche: dos ventas en lugar de una."};
  return {si:["Dulces","Gourmand","Especiados","Ámbar y vainilla"], no:"Acuáticos muy ligeros: con frío casi no se notan.", tip:"Con frío los perfumes intensos lucen más y duran más: es buen momento para los árabes dulces."};
}
function consejoEcon(n){
  return ["",
   "Prioriza árabes accesibles y decants. Ofrece apartado o pagos en partes y sets de decants para probar.",
   "La mayoría en árabes, con 1 o 2 de diseñador muy conocidos para quien quiera marca.",
   "Mezcla árabes con diseñador. Los árabes dan la ganancia; el diseñador da confianza.",
   "Buen poder de compra: más diseñador y árabes premium. Cuida la presentación y el empaque.",
   "El cliente valora marca y originalidad: diseñador, árabes premium y kits de regalo bien presentados."][n];
}

/* ===================== HOY ===================== */
const EJEMPLOS = [
  {id:"ej1",nombre:"Mariana (ejemplo)",tel:"",estado:"gto",ciudad:"León",tipo:"rev",entrega:"local",notas:"Vende en su trabajo",ejemplo:true,pedidos:[{id:"p1",fecha:addDays(hoyISO(),-14),entregado:true,fechaEntrega:addDays(hoyISO(),-14),semanas:4,piezas:6,total:3340,anticipo:1000,abonos:[{fecha:addDays(hoyISO(),-7),monto:585}],items:[{n:"Khamrah",m:"Lattafa",q:2,precio:615},{n:"Yara Moi EDP",m:"Lattafa",q:2,precio:560},{n:"Asad EDP",m:"Lattafa",q:2,precio:510}],perfumes:"Khamrah x2, Yara Moi x2, Asad x2",seg:{d7:addDays(hoyISO(),-7)},garantia:{}}]},
  {id:"ej2",nombre:"Jorge (ejemplo)",tel:"",estado:"nl",ciudad:"Monterrey",tipo:"per",entrega:"paqueteria",notas:"",ejemplo:true,pedidos:[{id:"p2",fecha:addDays(hoyISO(),-3),enviado:true,paqueteria:"Estafeta",guia:"7012345678",fechaEnvio:addDays(hoyISO(),-2),piezas:1,total:2335,anticipo:2335,envioCobrado:140,items:[{n:"Ultra Male EDT",m:"Jean Paul Gaultier",q:1,precio:2195}],perfumes:"Ultra Male EDT",seg:{},garantia:{}}]},
  {id:"ej3",nombre:"Luis (ejemplo)",tel:"",estado:"gto",ciudad:"San Francisco del Rincón",tipo:"per",entrega:"local",notas:"",ejemplo:true,pedidos:[{id:"p3",fecha:addDays(hoyISO(),-1),entregado:false,piezas:1,total:690,anticipo:300,items:[{n:"Odyssey Mandarin Sky",m:"Armaf",q:1,precio:690}],perfumes:"Odyssey Mandarin Sky",seg:{},garantia:{}}]}
];
EJEMPLOS.forEach(c=>c.pedidos.forEach(p=>(p.items||[]).forEach(it=>{ const f=BASE.find(x=>x.n===it.n && x.m===it.m); if(f) it.id=f.id; })));
function vendCliente(c){ if(!c) return yo(); if(c.vend) return c.vend; const ps=(c.pedidos||[]).filter(p=>p.vend); if(ps.length){ const n={}; ps.forEach(p=>n[p.vend]=(n[p.vend]||0)+1); return Object.keys(n).sort((a,b)=>n[b]-n[a])[0]; } return yo(); }
let filtroVend = "todos";
document.addEventListener("click", e=>{ const b=e.target.closest("[data-cv]"); if(!b) return; filtroVend=b.dataset.cv; document.querySelectorAll("[data-cv]").forEach(x=>x.setAttribute("aria-pressed", x===b?"true":"false")); renderClientes(); });
function clientesVista(){ return S.clientes.length? S.clientes : EJEMPLOS; }
function piezasTot(c){ return (c.pedidos||[]).reduce((a,p)=>a+(+p.piezas||0),0); }
function nivelSocio(c){
  if(c.tipo!=="rev") return {t:"Cliente",cls:"plain"};
  const n = piezasTot(c);
  if(n>=75) return {t:"Socio Oro",cls:"amber"};
  if(n>=30) return {t:"Socio Plata",cls:""};
  if(n>0) return {t:"Socio",cls:"good"};
  return {t:"Prospecto",cls:"plain"};
}
const PAQUETERIAS = ["Estafeta","DHL","FedEx","Paquetexpress","J&T Express","99 Minutos","Redpack","Correos de México","Otra"];
function entregaDe(c,p){ return c.entrega || (p&&p.entrega) || (c.estado==="gto"? "local" : "paqueteria"); }
function garantiaAplica(c,p){ return c.tipo==="rev" && +p.piezas>=5 && entregaDe(c,p)==="local"; }
function fueEntregado(p){ return p.entregado!=null? !!p.entregado : p.estado==="Entregado"; }
function fueEnviado(p){ return p.enviado!=null? !!p.enviado : (p.estado==="Enviado"||p.estado==="Entregado"); }
function pagado(p){ return (+p.anticipo||0) + (p.abonos||[]).reduce((a,x)=>a+(+x.monto||0),0); }
function saldo(p){ return Math.max(0, Math.round((+p.total||0) - pagado(p))); }
function pagoSemanal(p){ const n=+p.semanas||0; if(!n) return 0; return Math.ceil(Math.max(0,(+p.total||0)-(+p.anticipo||0))/n); }
function proxCobro(c,p){ if(entregaDe(c,p)!=="local" || !(+p.semanas) || saldo(p)<=0 || !fueEntregado(p)) return null; return addDays(p.fechaEntrega||p.fecha, 7*((p.abonos||[]).length+1)); }
function estadoPed(c,p){
  const s = saldo(p), sem = +p.semanas>0;
  if(entregaDe(c,p)==="local"){
    if(!fueEntregado(p)) return {t:"Por entregar", cls:"warn", fin:false};
    if(s>0) return {t: sem? "Pagando a semanas" : "Entregado, con saldo", cls:"warn", fin:false};
    return {t: sem? "Liquidado" : "Entregado y pagado", cls:"good", fin:true};
  }
  if(!fueEnviado(p)) return {t:"Por enviar", cls:"warn", fin:false};
  if(s>0) return {t:"Enviado, con saldo", cls:"warn", fin:false};
  return {t:"Enviado y pagado", cls:"good", fin:true};
}
function catPed(c,p){
  const loc = entregaDe(c,p)==="local", sem = +p.semanas>0, s = saldo(p);
  return {porEnviar: loc? !fueEntregado(p) : !fueEnviado(p), enviados: !loc && fueEnviado(p), semanas: sem && s>0, liquidados: sem && s<=0};
}
function oroElegible(p){ const o=info(p).oro; if(typeof o==="boolean") return o; if(!p || !p.precios || !costoDe(p,5) || p.t==="C" || p.t==="B") return false; const g=precioDe(p,15)-costoDe(p,5); return g>=60 && g/precioDe(p,15)>=0.10; }
function tierLabel(pz){ return ["1–4","5–14","15–24","25–49","50–99","100+"][tierIdx(pz)] + " piezas"; }
function perfById(id){ return perfumes().find(x=>x.id===id); }
function calcPedido(lines, desc, envCob, envCosto, pzPrecio){
  const pz = lines.reduce((a,l)=>a+(+l.q||0),0), pzP = Math.max(pz, +pzPrecio||0);
  let sub=0, costo=0;
  const det = lines.map(l=>{ const p=perfById(l.id); const oro = !!(p && pzP>pz && oroElegible(p)); const pr = (l.pm!=null && l.pm!=="")? (+l.pm||0) : p? precioDe(p, oro? pzP : pz) : (+l.precio||0); const c = p? costoDe(p,pz) : 0; sub += pr*l.q; costo += c*l.q; return {l,p,pr,oro}; });
  const total = Math.max(0, sub - (+desc||0)) + (+envCob||0);
  return {pz, sub, costo, total, det, gan: sub - (+desc||0) + (+envCob||0) - (+envCosto||0) - costo};
}
function primerNombre(c){ return c.nombre.replace(/ \(ejemplo\)$/,"").split(" ")[0]; }
function notaPedido(c, p){
  const items = (p.items||[]).map(it=>`• ${it.q} × ${it.n} (${it.m}) – ${money(it.precio)} c/u = ${money(it.precio*it.q)}`).join("\n") || (p.perfumes? "• "+p.perfumes : "");
  const loc = entregaDe(c,p)==="local", s = saldo(p);
  let t = `¡Hola ${primerNombre(c)}! Este es tu pedido de Essence & Co (${fecha(p.fecha)}):\n\n${items}\n\nPiezas: ${p.piezas} (precio de ${tierLabel(p.piezas)})` +
    (p.subtotal!=null? `\nSubtotal: ${money(p.subtotal)}`:"") + (+p.descuento? `\nDescuento: -${money(p.descuento)}`:"") +
    (loc? `\nEntrega en persona` : (+p.envioCobrado? `\nEnvío por paquetería: ${money(p.envioCobrado)}` : `\nEnvío por paquetería: te paso el costo según tu código postal`)) +
    `\nTotal: ${money(p.total)}`;
  if(pagado(p)) t += `\nPagado: ${money(pagado(p))}`;
  if(s>0) t += `\nResta: ${money(s)}`;
  if(loc && +p.semanas && s>0) t += `\n\nPlan de pagos: ${p.semanas} semana${+p.semanas===1?"":"s"} de ${money(pagoSemanal(p))}. Próximo pago: ${fecha(proxCobro(c,p)||addDays(p.fechaEntrega||p.fecha,7))}.`;
  if(!loc && fueEnviado(p) && p.guia) t += `\n\nTu pedido ya va en camino por ${p.paqueteria||"paquetería"}. Número de guía: ${p.guia}`;
  if(garantiaAplica(c,p)) t += `\n\nComo te lo entrego en persona, si en 30 días algún perfume sellado no se te vende, te lo cambio por otro del mismo precio (hasta el ${fecha(addDays(p.fecha,30))}).`;
  return t + `\n\n¡Gracias por tu compra!`;
}
/* Nota en forma de tabla: en WhatsApp sale como cuadrícula (texto monoespaciado) y en Excel/Sheets se pega en celdas */
function notaTabla(c, p){
  const W = 32, loc = entregaDe(c,p)==="local", s = saldo(p);
  const pad = (t,n)=>{ t=String(t); return t.length>=n? t.slice(0,n) : t+" ".repeat(n-t.length); };
  const lpad = (t,n)=>{ t=String(t); return t.length>=n? t : " ".repeat(n-t.length)+t; };
  const corta = (t,n)=>{ const ws=String(t).split(/\s+/), out=[]; let l=""; ws.forEach(w=>{ while(w.length>n){ if(l){ out.push(l); l=""; } out.push(w.slice(0,n)); w=w.slice(n); } if(!w) return; if((l?l+" "+w:w).length>n){ out.push(l); l=w; } else l = l? l+" "+w : w; }); if(l) out.push(l); return out.length? out : [""]; };
  const linea = ch=>ch.repeat(W);
  const fila = (izq,der)=> pad(izq, W-String(der).length-1)+" "+der;
  const its = (p.items||[]).length? p.items : (p.perfumes? [{q:p.piezas||1, n:p.perfumes, m:"", precio:(+p.subtotal||+p.total||0)/(p.piezas||1)}] : []);
  let L = [];
  L.push(pad("CANT",4)+" "+pad("PERFUME",18)+" "+lpad("IMPORTE",8));
  L.push(linea("─"));
  its.forEach(it=>{
    const nom = corta(it.n, 18);
    L.push(lpad(it.q,3)+"  "+pad(nom[0],18)+" "+lpad(money(it.precio*it.q),8));
    nom.slice(1).forEach(x=>L.push("     "+x));
    L.push("     "+pad(((it.m? it.m+" · ":"")+money(it.precio)+" c/u"),27));
  });
  L.push(linea("─"));
  L.push(fila("Piezas", String(p.piezas)));
  L.push(fila("Precio de", tierLabel(p.piezas)));
  if(p.subtotal!=null) L.push(fila("Subtotal", money(p.subtotal)));
  if(+p.descuento) L.push(fila("Descuento", "-"+money(p.descuento)));
  L.push(fila("Envío", loc? "En persona" : (+p.envioCobrado? money(p.envioCobrado) : "Por cotizar")));
  L.push(linea("═"));
  L.push(fila("TOTAL", money(p.total)));
  if(pagado(p)) L.push(fila("Pagado", money(pagado(p))));
  if(s>0) L.push(fila("RESTA", money(s)));
  let t = `¡Hola ${primerNombre(c)}! Este es tu pedido de Essence & Co (${fecha(p.fecha)}):\n\n\`\`\`\n${L.map(x=>x.replace(/\s+$/,"")).join("\n")}\n\`\`\``;
  let extra = [];
  if(loc && +p.semanas && s>0) extra.push(`Plan de pagos: ${p.semanas} semana${+p.semanas===1?"":"s"} de ${money(pagoSemanal(p))}. Próximo pago: ${fecha(proxCobro(c,p)||addDays(p.fechaEntrega||p.fecha,7))}.`);
  if(!loc && fueEnviado(p) && p.guia) extra.push(`Tu pedido ya va en camino por ${p.paqueteria||"paquetería"}. Número de guía: ${p.guia}`);
  if(garantiaAplica(c,p)) extra.push(`Como te lo entrego en persona, si en 30 días algún perfume sellado no se te vende, te lo cambio por otro del mismo precio (hasta el ${fecha(addDays(p.fecha,30))}).`);
  t += (extra.length? "\n\n"+extra.join("\n\n") : "") + `\n\n¡Gracias por tu compra!`;
  // versión para Excel / Google Sheets
  const td = (v,al)=>`<td style="border:1px solid #999;padding:4px 8px;${al?"text-align:right;":""}">${esc(v)}</td>`;
  const th = v=>`<th style="border:1px solid #999;padding:4px 8px;background:#3A3A3C;color:#F2E6D8">${esc(v)}</th>`;
  let h = `<table style="border-collapse:collapse;font-family:Arial;font-size:11pt"><tr><td colspan="5"><b>Essence &amp; Co · Pedido de ${esc(c.nombre)} · ${esc(fecha(p.fecha))}</b></td></tr><tr>${th("Cantidad")}${th("Perfume")}${th("Marca")}${th("Precio c/u")}${th("Importe")}</tr>`;
  its.forEach(it=>{ h += `<tr>${td(it.q,1)}${td(it.n)}${td(it.m||"")}${td(money(it.precio),1)}${td(money(it.precio*it.q),1)}</tr>`; });
  const tot = (k,v,b)=>{ h += `<tr><td colspan="3"></td>${td(b? k.toUpperCase():k)}<td style="border:1px solid #999;padding:4px 8px;text-align:right;${b?"font-weight:bold;":""}">${esc(v)}</td></tr>`; };
  tot("Piezas", String(p.piezas)); if(p.subtotal!=null) tot("Subtotal", money(p.subtotal)); if(+p.descuento) tot("Descuento", "-"+money(p.descuento));
  tot("Envío", loc? "En persona" : (+p.envioCobrado? money(p.envioCobrado) : "Por cotizar")); tot("Total", money(p.total), 1);
  if(pagado(p)) tot("Pagado", money(pagado(p))); if(s>0) tot("Resta", money(s), 1);
  h += `</table>`;
  return {t, h};
}
/* ---- Nota como archivo (PDF o Excel) ---- */
function cargarScript(src){ return new Promise((res,rej)=>{ if(document.querySelector(`script[data-lib="${src}"]`)) return res(); const sc=document.createElement("script"); sc.src=src; sc.dataset.lib=src; sc.onload=res; sc.onerror=()=>{ sc.remove(); rej(new Error("no cargó")); }; document.head.appendChild(sc); }); }
const LIB = { jspdf:"https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js", autotable:"https://cdn.jsdelivr.net/npm/jspdf-autotable@3.8.2/dist/jspdf.plugin.autotable.min.js", exceljs:"https://cdn.jsdelivr.net/npm/exceljs@4.4.0/dist/exceljs.min.js" };
function datosNota(c, p){
  const loc = entregaDe(c,p)==="local", s = saldo(p);
  const its = (p.items||[]).length? p.items : (p.perfumes? [{q:p.piezas||1, n:p.perfumes, m:"", precio:(+p.subtotal||+p.total||0)/(p.piezas||1)}] : []);
  const tot = [["Piezas", String(p.piezas)], ["Precio de", tierLabel(p.piezas)]];
  if(p.subtotal!=null) tot.push(["Subtotal", money(p.subtotal)]);
  if(+p.descuento) tot.push(["Descuento", "-"+money(p.descuento)]);
  tot.push(["Envío", loc? "Entrega en persona" : (+p.envioCobrado? money(p.envioCobrado) : "Por cotizar según tu C.P.")]);
  tot.push(["TOTAL", money(p.total), 1]);
  if(pagado(p)) tot.push(["Pagado", money(pagado(p))]);
  if(s>0) tot.push(["RESTA", money(s), 1]);
  const extra = [];
  if(loc && +p.semanas && s>0) extra.push(`Plan de pagos: ${p.semanas} semana${+p.semanas===1?"":"s"} de ${money(pagoSemanal(p))}. Próximo pago: ${fecha(proxCobro(c,p)||addDays(p.fechaEntrega||p.fecha,7))}.`);
  if((p.abonos||[]).length) extra.push("Pagos registrados: " + [(+p.anticipo? `anticipo ${money(p.anticipo)}` : "")].concat(p.abonos.map(a=>`${fecha(a.fecha)} ${money(a.monto)}`)).filter(Boolean).join(" · ") + ".");
  if(!loc && fueEnviado(p) && p.guia) extra.push(`Tu pedido va en camino por ${p.paqueteria||"paquetería"}. Número de guía: ${p.guia}`);
  if(garantiaAplica(c,p)) extra.push(`Garantía de rotación: si en 30 días algún perfume sellado no se te vende, te lo cambio por otro del mismo precio (hasta el ${fecha(addDays(p.fecha,30))}).`);
  const archivo = ("Pedido " + (c.nombre||"cliente") + " " + (p.fecha||hoyISO())).normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^A-Za-z0-9 _-]/g,"").trim().replace(/\s+/g,"-");
  return {its, tot, extra, archivo, cliente:c.nombre||"Cliente", fechaTxt:fecha(p.fecha)+" "+String(p.fecha||hoyISO()).slice(0,4), lugar:[c.ciudad, (ESTADOS.find(e=>e[0]===c.estado)||[])[1]].filter(Boolean).join(", "), entrega: loc? "En persona" : "Paquetería"};
}
async function entregarArchivo(blob, nombre){
  const f = new File([blob], nombre, {type: blob.type});
  if(/Android|iPhone|iPad|iPod/i.test(navigator.userAgent) && navigator.canShare && navigator.canShare({files:[f]})){
    try{ await navigator.share({files:[f], title:nombre}); return; }catch(e){ if(e && e.name==="AbortError") return; }
  }
  const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download=nombre; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(a.href), 5000); toast("Archivo listo: "+nombre);
}
async function notaPDF(c, p){
  toast("Creando PDF…");
  await cargarScript(LIB.jspdf); await cargarScript(LIB.autotable);
  const d = datosNota(c, p), {jsPDF} = window.jspdf;
  const doc = new jsPDF({unit:"mm", format:"a5"}), W = doc.internal.pageSize.getWidth(), M = 10;
  const STORM=[58,58,60], CREAM=[242,230,216], GOLD=[140,106,63];
  doc.setFillColor(...STORM); doc.rect(0,0,W,28,"F");
  doc.setTextColor(...CREAM); doc.setFont("helvetica","bold"); doc.setFontSize(20); doc.text("ESSENCE & CO", M, 15);
  doc.setFont("helvetica","normal"); doc.setFontSize(9); doc.setTextColor(201,164,110); doc.text("NOTA DE PEDIDO", M, 22);
  doc.setTextColor(...CREAM); doc.text(d.fechaTxt, W-M, 22, {align:"right"});
  doc.setTextColor(40,40,40); doc.setFontSize(10);
  let y = 36;
  doc.setFont("helvetica","bold"); doc.text("Cliente:", M, y); doc.setFont("helvetica","normal"); doc.text(d.cliente + (d.lugar? "  ·  "+d.lugar : ""), M+16, y);
  y += 5; doc.setFont("helvetica","bold"); doc.text("Entrega:", M, y); doc.setFont("helvetica","normal"); doc.text(d.entrega, M+16, y);
  doc.autoTable({ startY: y+5, margin:{left:M, right:M}, theme:"grid",
    head:[["Cant","Perfume","Marca","Precio c/u","Importe"]],
    body: d.its.map(it=>[it.q, it.n, it.m||"", money(it.precio), money(it.precio*it.q)]),
    styles:{fontSize:8.5, cellPadding:2, lineColor:[210,200,188], lineWidth:.2, textColor:[40,40,40]},
    headStyles:{fillColor:STORM, textColor:CREAM, fontStyle:"bold"},
    alternateRowStyles:{fillColor:[248,244,238]},
    columnStyles:{0:{halign:"center", cellWidth:12}, 3:{halign:"right", cellWidth:22}, 4:{halign:"right", cellWidth:22}} });
  doc.autoTable({ startY: doc.lastAutoTable.finalY+3, margin:{left:W/2, right:M}, theme:"plain",
    body: d.tot.map(r=>[r[0], r[1]]),
    styles:{fontSize:9, cellPadding:1.4, textColor:[40,40,40]},
    columnStyles:{1:{halign:"right"}},
    didParseCell: h=>{ const r=d.tot[h.row.index]; if(r && r[2]){ h.cell.styles.fontStyle="bold"; h.cell.styles.fillColor=CREAM; h.cell.styles.textColor=STORM; } } });
  y = doc.lastAutoTable.finalY + 6;
  doc.setFontSize(8.5); doc.setTextColor(70,70,70);
  d.extra.forEach(t=>{ const ls = doc.splitTextToSize(t, W-2*M); if(y + ls.length*4 > doc.internal.pageSize.getHeight()-16){ doc.addPage(); y = 14; } doc.text(ls, M, y); y += ls.length*4 + 2; });
  const H = doc.internal.pageSize.getHeight();
  doc.setDrawColor(...GOLD); doc.setLineWidth(.3); doc.line(M, H-14, W-M, H-14);
  doc.setFontSize(9); doc.setTextColor(...GOLD); doc.setFont("helvetica","bold"); doc.text("¡Gracias por tu compra!", W/2, H-9, {align:"center"});
  doc.setFont("helvetica","normal"); doc.setFontSize(7.5); doc.setTextColor(110,110,110); doc.text("Essence & Co  ·  WhatsApp 476 110 2899", W/2, H-5, {align:"center"});
  await entregarArchivo(doc.output("blob"), d.archivo + ".pdf");
}
async function notaExcel(c, p){
  toast("Creando Excel…");
  await cargarScript(LIB.exceljs);
  const d = datosNota(c, p), wb = new ExcelJS.Workbook(), ws = wb.addWorksheet("Pedido", {views:[{showGridLines:false}]});
  ws.columns = [{width:8},{width:38},{width:18},{width:14},{width:14}];
  const STORM="FF3A3A3C", CREAM="FFF2E6D8", GOLD="FF8C6A3F", borde={top:{style:"thin",color:{argb:"FFD2C8BC"}},left:{style:"thin",color:{argb:"FFD2C8BC"}},bottom:{style:"thin",color:{argb:"FFD2C8BC"}},right:{style:"thin",color:{argb:"FFD2C8BC"}}};
  ws.mergeCells("A1:E1"); const t=ws.getCell("A1"); t.value="ESSENCE & CO · Nota de pedido"; t.font={bold:true,size:16,color:{argb:CREAM}}; t.fill={type:"pattern",pattern:"solid",fgColor:{argb:STORM}}; t.alignment={vertical:"middle"}; ws.getRow(1).height=30;
  ws.addRow([]); ws.addRow(["Cliente", d.cliente + (d.lugar? " · "+d.lugar : "")]); ws.addRow(["Fecha", d.fechaTxt]); ws.addRow(["Entrega", d.entrega]);
  [3,4,5].forEach(r=>{ ws.getCell("A"+r).font={bold:true,color:{argb:GOLD}}; });
  ws.addRow([]);
  const hr = ws.addRow(["Cant.","Perfume","Marca","Precio c/u","Importe"]);
  hr.eachCell(cl=>{ cl.font={bold:true,color:{argb:CREAM}}; cl.fill={type:"pattern",pattern:"solid",fgColor:{argb:STORM}}; cl.border=borde; cl.alignment={horizontal:"center"}; });
  const fmt = '"$"#,##0';
  d.its.forEach((it,i)=>{ const r = ws.addRow([+it.q, it.n, it.m||"", +it.precio, null]); r.getCell(5).value = {formula:`A${r.number}*D${r.number}`, result: it.q*it.precio};
    r.eachCell({includeEmpty:true}, (cl,ci)=>{ cl.border=borde; if(i%2) cl.fill={type:"pattern",pattern:"solid",fgColor:{argb:"FFF8F4EE"}}; if(ci>=4) cl.numFmt=fmt; if(ci===1) cl.alignment={horizontal:"center"}; if(ci===2) cl.alignment={wrapText:true}; }); });
  ws.addRow([]);
  d.tot.forEach(rw=>{ const num = /^-?\$[\d,]+(\.\d+)?$/.test(rw[1])? Number(rw[1].replace(/[$,]/g,"")) : (rw[0]==="Piezas"? +rw[1] : rw[1]); const r = ws.addRow(["","","",rw[0], num]); if(typeof num==="number" && rw[0]!=="Piezas") r.getCell(5).numFmt='"$"#,##0'; r.getCell(5).alignment={horizontal:"right"};
    if(rw[2]){ [4,5].forEach(ci=>{ const cl=r.getCell(ci); cl.font={bold:true,color:{argb:STORM}}; cl.fill={type:"pattern",pattern:"solid",fgColor:{argb:CREAM}}; }); } else r.getCell(4).font={color:{argb:"FF555555"}}; });
  if(d.extra.length){ ws.addRow([]); d.extra.forEach(x=>{ const r=ws.addRow([x]); ws.mergeCells(`A${r.number}:E${r.number}`); r.getCell(1).alignment={wrapText:true,vertical:"top"}; r.height = 15*Math.ceil(x.length/95); r.getCell(1).font={size:10,color:{argb:"FF555555"}}; }); }
  ws.addRow([]); const g = ws.addRow(["¡Gracias por tu compra! · Essence & Co · WhatsApp 476 110 2899"]); ws.mergeCells(`A${g.number}:E${g.number}`); g.getCell(1).font={bold:true,color:{argb:GOLD}}; g.getCell(1).alignment={horizontal:"center"};
  ws.pageSetup = {paperSize:9, orientation:"portrait", fitToPage:true, fitToWidth:1, fitToHeight:0, margins:{left:.4,right:.4,top:.5,bottom:.5,header:.2,footer:.2}};
  const buf = await wb.xlsx.writeBuffer();
  await entregarArchivo(new Blob([buf], {type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}), d.archivo + ".xlsx");
}
async function copiarTabla(c, p){
  const {t, h} = notaTabla(c, p);
  try{
    if(window.ClipboardItem && navigator.clipboard && navigator.clipboard.write){
      await navigator.clipboard.write([new ClipboardItem({"text/plain": new Blob([t],{type:"text/plain"}), "text/html": new Blob([h],{type:"text/html"})})]);
      toast("Nota copiada: pégala en WhatsApp o en Excel"); return;
    }
  }catch(e){}
  copiar(t);
}
function formAbono(c, p){
  const sug = Math.min(saldo(p), pagoSemanal(p) || saldo(p));
  abrir(`<h3 id="ovTitle">Registrar pago de ${esc(c.nombre)}</h3>
  <form id="fAb" style="display:grid;gap:10px">
    <p class="meta">Total ${money(p.total)} · pagado ${money(pagado(p))} · resta <strong>${money(saldo(p))}</strong>${+p.semanas? ` · pago semanal ${money(pagoSemanal(p))}`:""}</p>
    <div class="fields">
      <label for="faMonto">Monto recibido ($)<input id="faMonto" type="number" inputmode="decimal" min="1" value="${sug}" required></label>
      <label for="faFecha">Fecha<input id="faFecha" type="date" value="${hoyISO()}" required></label>
    </div>
    ${(p.abonos||[]).length? `<div class="meta">Pagos anteriores: ${p.abonos.map(a=>`${fecha(a.fecha)} ${money(a.monto)}`).join(" · ")}</div>`:""}
    <div class="row" style="justify-content:flex-end"><button type="button" class="quiet" data-cerrar>Cancelar</button><button type="submit">Guardar pago</button></div>
  </form>`);
  $("#fAb").addEventListener("submit", ev=>{
    ev.preventDefault();
    const m = +$("#faMonto").value||0; if(m<=0) return;
    { const cAct = S.clientes.find(x=>x.id===c.id); const pAct = cAct && (cAct.pedidos||[]).find(x=>x.id===p.id); if(pAct) p = pAct; }
    p.abonos = p.abonos||[]; p.abonos.push({fecha:$("#faFecha").value, monto:m});
    save(); cerrar(); renderAll(); toast(saldo(p)<=0? "¡Pedido liquidado!" : `Pago guardado. Resta ${money(saldo(p))}`);
  });
}
function tareas(){
  const hoy = hoyISO(), out = [];
  clientesVista().forEach(c=>{
    (c.pedidos||[]).forEach(p=>{
      const seg = p.seg||{};
      const list = c.tipo==="rev"? [["d7",7],["d21",21]] : [["d90",90]];
      list.forEach(([k,d])=>{
        if(seg[k]) return;
        const due = addDays(p.fecha, d);
        const dd = diffDays(due, hoy);
        if(dd<=7) out.push({c,p,k,due,dd});
      });
      const pc = proxCobro(c,p);
      if(pc){ const dd = diffDays(pc, hoy); if(dd<=3) out.push({c,p,k:"cobro",due:pc,dd}); }
    });
  });
  return out.sort((a,b)=>a.dd-b.dd);
}
function textoTarea(k, c, p){
  const nom = primerNombre(c);
  if(k==="cobro") return `¡Hola ${nom}! Te recuerdo tu pago de esta semana de ${money(Math.min(pagoSemanal(p),saldo(p)))} por tu pedido de perfumes. Te quedan ${money(saldo(p))} por pagar. ¿Me avisas cuando lo hagas? ¡Gracias!`;
  if(k==="d7") return `¡Hola ${nom}! ¿Cómo vas con los perfumes? ¿Qué te han preguntado tus clientes? Si necesitas fotos, textos o ayuda para cerrar una venta, aquí estoy.`;
  if(k==="d21") return `¡Hola ${nom}! ¿Qué se te vendió más de tu pedido? Te armo el resurtido con lo que más se mueve.${garantiaAplica(c,p)? ` Recuerda que si algún perfume sellado no se te ha vendido, tienes hasta el ${fecha(addDays(p.fecha,30))} para cambiarlo por otro.` : ""}`;
  return `¡Hola ${nom}! ¿Cómo te ha ido con tu ${p.perfumes||"perfume"}? Seguro ya se te está acabando. ¿Te aparto otro o te recomiendo algo nuevo para la temporada?`;
}
function renderHoy(){
  const hoy = hoyISO(), m = new Date().getMonth();
  $("#hoyFecha").textContent = new Date().toLocaleDateString("es-MX",{weekday:"long",day:"numeric",month:"long"});
  const cs = clientesVista(), ts = tareas();
  const vencidas = ts.filter(t=>t.dd<=0).length;
  const garantias = [], enProceso = [];
  let porCobrar = 0;
  cs.forEach(c=>(c.pedidos||[]).forEach(p=>{
    if(garantiaAplica(c,p) && !(p.garantia||{}).usada){ const v=addDays(p.fecha,30); const dd=diffDays(v,hoy); if(dd>=0) garantias.push({c,p,v,dd}); }
    porCobrar += saldo(p);
    if(!estadoPed(c,p).fin) enProceso.push({c,p});
  }));
  const ej = !S.clientes.length;
  $("#hoyTiles").innerHTML = [
    [cs.length,"clientes registrados"],[vencidas,"mensajes para hoy"],[enProceso.length,"pedidos pendientes"],[money(porCobrar),"por cobrar"]
  ].map(([n,t])=>`<div class="tile ${ej?"example":""}"><b>${n}</b><span>${t}</span></div>`).join("");
  $("#hoyTareas").innerHTML = (ej? `<p class="pill amber" style="justify-self:start">Ejemplo: agrega tu primer cliente en la pestaña Clientes y esto se llenará con tus datos</p>`:"") + (ts.length? ts.map((t,ix)=>{
    const txt = textoTarea(t.k,t.c,t.p), id="tt"+ix, wa = waLink(t.c.tel, txt);
    const lbl = {d7:"Seguimiento 7 días",d21:"Seguimiento 21 días: resurtido",d90:"Recordatorio 3 meses",cobro:`Cobro semanal ${(t.p.abonos||[]).length+1} de ${t.p.semanas}`}[t.k];
    const when = t.dd<0? `Atrasado ${-t.dd} día${t.dd===-1?"":"s"}` : t.dd===0? "Hoy" : `En ${t.dd} día${t.dd===1?"":"s"} (${fecha(t.due)})`;
    const accion = t.c.ejemplo? "" : t.k==="cobro"? `<button class="small quiet" data-abono="${t.c.id}|${t.p.id}">Registrar pago</button>` : `<button class="small quiet" data-hecho="${t.c.id}|${t.p.id}|${t.k}">Marcar como hecho</button>`;
    return `<div class="item ${t.dd<=0?"due":"soon"} ${t.c.ejemplo?"example":""}">
      <div class="row between"><strong>${esc(t.c.nombre)}</strong><span class="pill ${t.dd<=0?"bad":"warn"}">${when}</span></div>
      <div class="meta">${lbl} · pedido del ${fecha(t.p.fecha)} · ${esc(t.p.piezas)} pieza${t.p.piezas==1?"":"s"}${t.k==="cobro"?` · resta ${money(saldo(t.p))}`:""}</div>
      <div class="msg" id="${id}">${esc(txt)}</div>
      <div class="row"><button class="small" data-copy="${id}">Copiar mensaje</button>${wa?`<a class="btn small ghost" href="${wa}" target="_blank" rel="noopener">Abrir WhatsApp</a>`:""}${accion}</div>
    </div>`;}).join("") : `<p class="empty">No tienes mensajes pendientes esta semana.</p>`);
  $("#hoyGarantias").innerHTML = garantias.length? garantias.sort((a,b)=>a.dd-b.dd).map(g=>`<div class="item ${g.dd<=5?"soon":"okk"} ${g.c.ejemplo?"example":""}"><div class="row between"><strong>${esc(g.c.nombre)}</strong><span class="pill ${g.dd<=5?"warn":"good"}">Vence ${fecha(g.v)}</span></div><div class="meta">${esc(g.p.piezas)} piezas · ${esc(g.p.perfumes||"")}</div></div>`).join("") : `<p class="empty">Ninguna garantía activa.</p>`;
  $("#hoyTemporada").textContent = TEMPORADA[m];
  const pc = porComprar(), pzc = pc.reduce((a,x)=>a+(+x.p.piezas||0),0), pdc = proxDiaCompra();
  $("#hoyCompra").innerHTML = `<div class="row between"><h3>Día de compra</h3><span class="pill ${pdc.diff===0?"warn":"plain"}">${pdc.diff===0? "Hoy" : pdc.nombre+" "+fecha(pdc.iso)}</span></div>
    <p>${pc.length? `Tienes ${pc.length} pedido${pc.length===1?"":"s"} (${pzc} piezas) por comprarle a Ian.` : "No tienes pedidos pendientes por comprar."}</p>
    ${pc.length? `<a class="btn small ghost" href="#compras" style="justify-self:start">Ver la compra de la semana</a>`:""}`;
  $("#hoyPedidos").innerHTML = enProceso.length? enProceso.sort((a,b)=>a.p.fecha.localeCompare(b.p.fecha)).map(({c,p})=>{ const st=estadoPed(c,p), s=saldo(p); return `<div class="item ${s>0?"soon":"okk"} ${c.ejemplo?"example":""}">
      <div class="row between"><strong>${esc(c.nombre)}</strong><span class="pill ${st.cls}">${st.t}</span></div>
      <div class="meta">${fecha(p.fecha)} · ${esc(p.piezas)} pz · ${money(p.total)} · ${entregaDe(c,p)==="local"?"Local":"Paquetería"}${s>0? ` · <strong style="color:var(--warn)">Resta ${money(s)}</strong>`:" · Pagado"}${+p.semanas&&s>0?` · ${money(pagoSemanal(p))} por semana`:""}</div>
      <div class="meta">${esc(p.perfumes||"")}</div>
      ${c.ejemplo?"":`<div class="row"><button class="small quiet" data-editped="${c.id}|${p.id}">Actualizar pedido</button>${s>0?`<button class="small quiet" data-abono="${c.id}|${p.id}">Registrar pago</button>`:""}</div>`}
    </div>`; }).join("") : `<p class="empty">No hay pedidos pendientes.</p>`;
}
document.addEventListener("click", e=>{
  const b = e.target.closest("[data-hecho]"); if(!b) return;
  const [cid,pid,k] = b.dataset.hecho.split("|");
  const c = S.clientes.find(x=>x.id===cid); if(!c) return;
  const p = c.pedidos.find(x=>x.id===pid); if(!p) return;
  p.seg = p.seg||{}; p.seg[k] = hoyISO(); save(); renderAll(); toast("Marcado como hecho");
});

/* ===================== ESTADOS ===================== */
function fillSelects(){
  const opts = ESTADOS.map(e=>`<option value="${e.id}">${esc(e.n)}</option>`).join("");
  const wv = $("#wEstado").value;
  $("#eEstado").innerHTML = opts; $("#qEstado").innerHTML = opts; $("#wEstado").innerHTML = opts;
  $("#eEstado").value = "gto"; $("#qEstado").value = "gto"; $("#wEstado").value = wv || "gto";
  $("#eMes").innerHTML = MESES.map((m,i)=>`<option value="${i}">${m}</option>`).join("");
  $("#eMes").value = new Date().getMonth();
  const lst = perfumes().slice().sort((a,b)=>(a.m+a.n).localeCompare(b.m+b.n)).map(p=>`<option value="${p.id}">${esc(p.m)} · ${esc(p.n)}</option>`).join("");
  $("#qGusta").innerHTML = `<option value="">Ninguno</option>` + lst;
  const kv = $("#kPerf").value; $("#kPerf").innerHTML = `<option value="">Escribir precios a mano</option>` + lst; $("#kPerf").value = kv;
}
function renderEstado(){
  const e = estadoById($("#eEstado").value), m = +$("#eMes").value;
  const cl = climaMes(e, m), ne = nivelEcon(e), cons = consejosClima(cl.t, e.hum);
  const ctx = {t:cl.t, hum:e.hum, econ:ne.n, tipo:$("#eTipo").value, g:$("#eGenero").value, extra:$("#eExtra").checked, linea:$("#eLinea").value};
  const recs = recomendar(ctx, 8);
  const pct = pobrezaPct(e);
  const lvl = `<div class="levelbar" aria-hidden="true">${[1,2,3,4,5].map(i=>`<i class="${i<=ne.n?"on":""}"></i>`).join("")}</div>`;
  const msgTxt = `¡Hola! Para ${e.n} en ${MESES[m].toLowerCase()} te recomiendo:\n` + recs.slice(0,5).map((r,i)=>`${i+1}. ${r.p.n} (${r.p.m})${precioTxt(r.p, ctx.tipo==="rev")?" – "+precioTxt(r.p, ctx.tipo==="rev"):""}: ${huele(r.p).toLowerCase()}.`).join("\n") +
    (ctx.tipo==="rev"? `\n\nSon de los que más rotan para esta zona y temporada.${e.id==="gto"?" Como te lo entrego en persona, si en 30 días alguno sellado no se te vende, te lo cambio por otro.":""} ¿Te armo un pedido con ganancia calculada?` : `\n\n¿Cuál te late más? Si quieres, primero pruébalo en decant.`);
  $("#estadoOut").innerHTML = `
  <div class="card hl">
    <div class="row between"><h3>${esc(e.n)}</h3><span class="pill">${esc(cl.s)}</span></div>
    <div class="facts">
      <div class="fact"><small>Clima en ${MESES[m].toLowerCase()}</small><strong>${TEMP[cl.t]}</strong></div>
      <div class="fact"><small>Humedad</small><strong>${e.hum[0].toUpperCase()+e.hum.slice(1)}</strong></div>
      <div class="fact"><small>Nivel económico</small><strong>${ne.t}</strong>${lvl}</div>
      <div class="fact"><small>Población</small><strong class="num">${e.pob.toLocaleString("es-MX",{maximumFractionDigits:1})} millones</strong></div>
    </div>
    <p>${esc(e.nota)}</p>
    <p class="meta">Ciudades clave: ${esc(e.ciudades)}</p>
    <p class="note">Personas en pobreza en 2024: ${(e.pobres/1000).toLocaleString("es-MX",{maximumFractionDigits:2})} millones (INEGI)${POBREZA_PUBLICADA[e.id]? `, ${pct}% de la población`:`, cerca de ${Math.round(pct)}% de la población (aproximado)`}.</p>
  </div>
  <div class="grid2">
    <div class="card"><h3>Qué funciona aquí</h3>
      <div class="tags">${cons.si.map(x=>`<span class="pill">${x}</span>`).join("")}</div>
      <p><strong>Evita:</strong> ${cons.no}</p><p class="meta">${cons.tip}</p></div>
    <div class="card"><h3>Precio y mezcla</h3><p>${consejoEcon(ne.n)}</p><p class="meta">${TEMPORADA[m]}</p></div>
  </div>
  <div class="card">
    <div class="row between"><h3>Los 8 que más te convienen</h3><span class="meta">${ctx.tipo==="rev"?"Para revender":"Para uso personal"} · ${{H:"solo hombre",M:"solo mujer",T:"hombre y mujer"}[ctx.g]} · ${{mix:"árabes y diseñador",A:"solo árabes",D:"solo diseñador"}[ctx.linea]}</span></div>
    ${recs.length? `<div class="list">${recs.map((r,i)=>perfCard(r,i,ctx.tipo==="rev")).join("")}</div>` : `<p class="empty">No hay perfumes con ese filtro.</p>`}
  </div>
  <div class="card">
    <h3>Mensaje para el cliente</h3>
    <div class="msg" id="eMsg">${esc(msgTxt)}</div>
    <div class="row"><button data-copy="eMsg">Copiar mensaje</button></div>
  </div>`;
}
function perfCard(r, i, rev){
  const p = r.p, inf = info(p), n = p.notas||[];
  const precio = precioDe(p,1);
  return `<div class="perf">
    <div class="row" style="align-items:flex-start;flex-wrap:nowrap"><span class="rank">${i+1}</span>${fotoHTML(p,"lg")}
    <div style="display:grid;gap:4px;flex:1;min-width:0">
      <div class="row between"><h4>${esc(p.n)} <span class="meta">· ${esc(p.m)}${p.ml?" · "+esc(p.ml):""}</span></h4>${precio?`<span class="num" style="text-align:right"><strong>${money(precio)}</strong><br><span class="meta">${money(precioDe(p,5))} desde 5 pz</span></span>`:""}</div>
      <div class="tags"><span class="pill ${p.t==="A"?"amber":p.t==="D"?"":"plain"}">${TIPO[p.t]||""}</span><span class="tag">${PR[p.pr]}</span>${p.fam.map(f=>`<span class="tag">${FAM[f]||f}</span>`).join("")}</div>
      ${n.length? `<p class="why"><strong>Salida:</strong> ${esc(n[0]||"—")} · <strong>Corazón:</strong> ${esc(n[1]||"—")} · <strong>Fondo:</strong> ${esc(n[2]||"—")}</p>` : `<p class="why">Huele a: ${esc(huele(p))}.</p>`}
      ${p.comp?`<p class="why">Se compara con ${esc(p.comp)}.</p>`:""}
      ${r.why.length?`<p class="why"><strong>Por qué:</strong> ${esc(r.why.slice(0,3).join("; "))}.</p>`:""}
      ${costoDe(p,1)&&precio?`<p class="why">Tu ganancia: ${money(precio-costoDe(p,1))} por pieza (1–4) · ${money(precioDe(p,5)-costoDe(p,5))} desde 5 piezas.</p>`:""}
    </div></div></div>`;
}

/* ===================== AROMA ===================== */
function renderAroma(){
  const e = estadoById($("#qEstado").value), cl = climaMes(e, new Date().getMonth());
  const ctx = {t:cl.t, hum:e.hum, tipo:"per", g:$("#qPara").value, estilo:$("#qEstilo").value, momento:$("#qMomento").value, pres:+$("#qPres").value, gusta:$("#qGusta").value};
  const recs = recomendar(ctx, 3);
  const nom = ($("#qNombre").value||"").trim();
  const txt = `¡Hola${nom?" "+nom:""}! Con lo que me contaste, estas son mis 3 recomendaciones para ti:\n\n` +
    recs.map((r,i)=>`${i+1}. ${r.p.n} (${r.p.m})${precioTxt(r.p)?" – "+precioTxt(r.p):""}\n   Huele a ${huele(r.p).toLowerCase()}.`).join("\n\n") +
    `\n\nSi no te decides, te puedo mandar las 3 en decant para que las pruebes, y si luego compras el frasco te descuento lo que pagaste por los decants. ¿Cuál te late más?`;
  $("#aromaOut").innerHTML = `
  <div class="card"><div class="row between"><h3>Mis 3 recomendaciones</h3><span class="meta">Clima actual en ${esc(e.n)}: ${TEMP[cl.t].toLowerCase()}</span></div>
  <div class="list">${recs.map((r,i)=>perfCard(r,i)).join("")}</div></div>
  <div class="card"><h3>Mensaje para mandar</h3><div class="msg" id="aMsg">${esc(txt)}</div><div class="row"><button data-copy="aMsg">Copiar mensaje</button></div></div>`;
}

/* ===================== CLIENTES ===================== */
let filtro = "todos", filtroPed = "todos";
function renderClientes(){
  const q = ($("#cBuscar").value||"").toLowerCase();
  const ej = !S.clientes.length;
  document.querySelectorAll("[data-yo]").forEach(b=>b.setAttribute("aria-pressed", b.dataset.yo===yo()?"true":"false"));
  let cs = clientesVista().filter(c=>filtro==="todos"||c.tipo===filtro).filter(c=>c.ejemplo||filtroVend==="todos"||vendCliente(c)===filtroVend);
  if(q) cs = cs.filter(c=>[c.nombre,c.ciudad,(estadoById(c.estado)||{}).n].join(" ").toLowerCase().includes(q));
  const pedOk = (c,p)=> filtroPed==="todos" || catPed(c,p)[filtroPed];
  if(filtroPed!=="todos") cs = cs.filter(c=>(c.pedidos||[]).some(p=>pedOk(c,p)));
  const hoy = hoyISO();
  $("#cLista").innerHTML = (ej? `<p class="pill amber" style="justify-self:start">Estos son ejemplos. Desaparecen cuando agregues tu primer cliente.</p>`:"") + (cs.length? cs.map(c=>{
    const nv = nivelSocio(c), pz = piezasTot(c), e = estadoById(c.estado);
    const total = (c.pedidos||[]).reduce((a,p)=>a+(+p.total||0),0), debe = (c.pedidos||[]).reduce((a,p)=>a+saldo(p),0);
    const falta = c.tipo==="rev"? (pz<30? `Le faltan ${30-pz} piezas para Plata` : pz<75? `Le faltan ${75-pz} piezas para Oro` : "Nivel máximo") : "";
    const peds = (c.pedidos||[]).filter(p=>pedOk(c,p)).slice().sort((a,b)=>b.fecha.localeCompare(a.fecha)).map(p=>{
      const g = p.garantia||{}, v = addDays(p.fecha,30), activa = garantiaAplica(c,p) && !g.usada && diffDays(v,hoy)>=0;
      const s = saldo(p), st = estadoPed(c,p), nid = "np_"+c.id+"_"+p.id, loc = entregaDe(c,p)==="local", pc = proxCobro(c,p);
      return `<div style="border-top:1px solid var(--line);padding-top:8px;display:grid;gap:6px">
        <div class="row between"><span class="meta"><strong style="color:var(--ink)">${fecha(p.fecha)}</strong> · ${esc(p.piezas)} pz · ${money(p.total)}${s>0?` · <strong style="color:var(--warn)">Resta ${money(s)}</strong>`:""}</span>
        <span class="row"><span class="pill ${st.cls}">${st.t}</span>${activa?`<span class="pill good">Garantía hasta ${fecha(v)}</span>${c.ejemplo?"":`<button class="small quiet" data-garantia="${c.id}|${p.id}">Usar garantía</button>`}`: g.usada? `<span class="pill plain">Garantía usada</span>`:""}</span></div>
        ${p.items&&p.items.length? `<div class="meta">${p.items.map(it=>`${it.q} × ${esc(it.n)} (${money(it.precio)})`).join(" · ")}</div>` : (p.perfumes?`<div class="meta">${esc(p.perfumes)}</div>`:"")}
        ${loc && +p.semanas? `<div class="meta">Paga en ${p.semanas} semana${+p.semanas===1?"":"s"} de ${money(pagoSemanal(p))} · lleva ${(p.abonos||[]).length} pago${(p.abonos||[]).length===1?"":"s"}${pc?` · próximo: ${fecha(pc)}`:""}</div>`:""}
        ${!loc && fueEnviado(p)? `<div class="meta">Enviado${p.fechaEnvio?" el "+fecha(p.fechaEnvio):""} por ${esc(p.paqueteria||"paquetería")}${p.guia?` · Guía: <strong style="color:var(--ink)">${esc(p.guia)}</strong>`:" · falta número de guía"}</div>`:""}
        ${(p.abonos||[]).length? `<div class="meta">Pagos: anticipo ${money(p.anticipo||0)} · ${p.abonos.map(a=>`${fecha(a.fecha)} ${money(a.monto)}`).join(" · ")}</div>`:""}
        ${p.ganancia!=null?`<div class="meta">Tu ganancia: ${money(p.ganancia)}</div>`:""}
        <div class="msg" id="${nid}" style="display:none">${esc(notaTabla(c,p).t)}</div>
        <div class="row"><button class="small ghost" data-copynota="${c.id}|${p.id}">Copiar nota</button><button class="small ghost" data-notapdf="${c.id}|${p.id}">Nota en PDF</button><button class="small ghost" data-notaxls="${c.id}|${p.id}">Nota en Excel</button>${c.ejemplo?"":`${s>0?`<button class="small" data-abono="${c.id}|${p.id}">Registrar pago</button>`:""}<button class="small quiet" data-editped="${c.id}|${p.id}">Editar</button><button class="small quiet" data-delped="${c.id}|${p.id}">Cancelar pedido</button>`}</div>
      </div>`;}).join("");
    return `<div class="item ${c.ejemplo?"example":""}">
      <div class="row between"><strong style="font-size:1.05rem">${esc(c.nombre)}</strong><span class="row" style="gap:6px">${c.ejemplo?"":`<span class="pill plain">Cliente de ${esc(vendCliente(c))}</span>`}<span class="pill ${nv.cls}">${nv.t}</span></span></div>
      <div class="meta">${c.tipo==="rev"?"Revendedor":"Uso personal"} · ${entregaDe(c)==="local"?"Local (entrega en persona)":"Fuera (paquetería)"} · ${esc(c.ciudad||"")}${c.ciudad&&e?", ":""}${e?esc(e.n):""}${c.tel?" · "+esc(c.tel):""}</div>
      <div class="meta num">${pz} piezas · ${money(total)} comprados${debe>0?` · <strong style="color:var(--warn)">debe ${money(debe)}</strong>`:""}${falta?" · "+falta:""}</div>
      ${c.notas?`<div class="meta">Notas: ${esc(c.notas)}</div>`:""}
      ${peds}
      ${histCancelados(c)}
      ${c.ejemplo?"":`<div class="row"><button class="small" data-pedido="${c.id}">Registrar pedido</button><button class="small ghost" data-recom="${c.id}">Recomendar para su estado</button><button class="small quiet" data-editc="${c.id}">Editar</button><button class="small danger" data-delcli="${c.id}">Borrar cliente</button></div>`}
    </div>`;}).join("") : `<p class="empty">No hay clientes con ese filtro.</p>`) + histBorrados(q);
}
function histCancelados(c){
  const cs = c.cancelados||[]; if(!cs.length) return "";
  return `<div style="border-top:1px dashed var(--line);padding-top:8px;opacity:.65;display:grid;gap:4px"><span class="meta"><strong>Pedidos cancelados (historial)</strong></span>${cs.slice().sort((a,b)=>(b.cancelado||"").localeCompare(a.cancelado||"")).map(p=>`<span class="meta"><s>${p.fecha?fecha(p.fecha):""} · ${esc(p.piezas||"")} pz · ${money(p.total)}</s> · ${esc(p.perfumes||"")} · cancelado el ${p.cancelado?fecha(p.cancelado):""}${p.canceladoPor?" por "+esc(p.canceladoPor):""}</span>`).join("")}</div>`;
}
function histBorrados(q){
  let bs = (S.borrados||[]).slice(); if(q) bs = bs.filter(c=>[c.nombre,c.ciudad].join(" ").toLowerCase().includes(q));
  if(!bs.length) return "";
  bs.sort((a,b)=>(b.borrado||"").localeCompare(a.borrado||""));
  return `<details class="card" style="opacity:.85"><summary><strong>Clientes borrados (${bs.length})</strong> <span class="meta">· siguen en el historial</span></summary><div class="list" style="margin-top:10px">${bs.map(c=>{
    const total=(c.pedidos||[]).reduce((a,p)=>a+(+p.total||0),0), pz=(c.pedidos||[]).reduce((a,p)=>a+(+p.piezas||0),0);
    return `<div class="item" style="background:transparent;border-style:dashed"><div class="row between"><strong style="color:var(--muted)"><s>${esc(c.nombre)}</s></strong><span class="pill plain">Borrado el ${c.borrado?fecha(c.borrado):""}${c.borradoPor?" por "+esc(c.borradoPor):""}</span></div>
      <div class="meta"><strong>${c.sinEntregar? "No se le entregaron los perfumes: regresaron al stock y no cuentan como venta" : "Ya tenía sus perfumes: siguen descontados del stock"}</strong></div>
      <div class="meta">${esc(c.ciudad||"")}${c.tel?" · "+esc(c.tel):""} · ${(c.pedidos||[]).length} pedido${(c.pedidos||[]).length===1?"":"s"} · ${pz} piezas · ${money(total)}</div>
      ${(c.pedidos||[]).map(p=>`<div class="meta">${p.fecha?fecha(p.fecha):""} · ${esc(p.perfumes||"")} · ${money(p.total)}${saldo(p)>0?` · debía ${money(saldo(p))}`:""}</div>`).join("")}
      ${histCancelados(c)}
      <div class="row"><button class="small quiet" data-restc="${c.id}">Restaurar cliente</button></div></div>`; }).join("")}</div></details>`;
}
document.querySelectorAll("[data-f]").forEach(b=>b.addEventListener("click",()=>{
  filtro = b.dataset.f; document.querySelectorAll("[data-f]").forEach(x=>x.setAttribute("aria-pressed", x===b?"true":"false")); renderClientes();
}));
document.querySelectorAll("[data-fp]").forEach(b=>b.addEventListener("click",()=>{
  filtroPed = b.dataset.fp; document.querySelectorAll("[data-fp]").forEach(x=>x.setAttribute("aria-pressed", x===b?"true":"false")); renderClientes();
}));
function abrir(html){ $("#ovBody").innerHTML = html; $("#ov").classList.add("on"); const f=$("#ovBody").querySelector("input,select,textarea,button"); if(f) f.focus(); }
function cerrar(){ $("#ov").classList.remove("on"); setTimeout(aplicarRemoto, 0); }
function aplicarRemoto(){ if(!remotoPendiente || $("#ov").classList.contains("on") || saving || saveTimerVivo) return; const d = remotoPendiente; remotoPendiente = null; cargarS(d); lsSet(); renderAll(); }
$("#ov").addEventListener("click", e=>{ if(e.target.id==="ov" || e.target.closest("[data-cerrar]")) cerrar(); });
document.addEventListener("keydown", e=>{ if(e.key==="Escape") cerrar(); });

function formCliente(c){
  c = c || {nombre:"",tel:"",estado:"gto",ciudad:"",tipo:"rev",notas:""};
  abrir(`<h3 id="ovTitle">${c.id?"Editar cliente":"Nuevo cliente"}</h3>
  <form id="fCli" style="display:grid;gap:10px">
    <label for="fcVend">¿De quién es este cliente?<select id="fcVend">${SOCIOS_EQ.map(x=>`<option ${vendCliente(c)===x?"selected":""}>${x}</option>`).join("")}</select></label>
    <label for="fcNombre">Nombre<input id="fcNombre" required value="${esc(c.nombre)}"></label>
    <div class="fields">
      <label for="fcTel">WhatsApp (10 dígitos)<input id="fcTel" inputmode="tel" value="${esc(c.tel)}"></label>
      <label for="fcTipo">Tipo<select id="fcTipo"><option value="rev">Revendedor</option><option value="per">Uso personal</option></select></label>
      <label for="fcEstado">Estado<select id="fcEstado">${ESTADOS.map(e=>`<option value="${e.id}">${esc(e.n)}</option>`).join("")}</select></label>
      <label for="fcCiudad">Ciudad<input id="fcCiudad" value="${esc(c.ciudad)}"></label>
      <label for="fcEntrega">¿Cómo le entregas?<select id="fcEntrega"><option value="local">Local: en persona</option><option value="paqueteria">Fuera: por paquetería</option></select></label>
    </div>
    <label for="fcNotas">Notas<textarea id="fcNotas">${esc(c.notas)}</textarea></label>
    <div class="row between">${c.id?`<button type="button" class="danger small" id="fcDel">Borrar cliente</button>`:"<span></span>"}<span class="row"><button type="button" class="quiet" data-cerrar>Cancelar</button><button type="submit">Guardar</button></span></div>
  </form>`);
  $("#fcTipo").value = c.tipo; $("#fcEstado").value = c.estado; $("#fcEntrega").value = entregaDe(c);
  let tocado = !!c.entrega;
  $("#fcEntrega").addEventListener("change", ()=>{ tocado = true; });
  $("#fcEstado").addEventListener("change", ()=>{ if(!tocado) $("#fcEntrega").value = $("#fcEstado").value==="gto"? "local" : "paqueteria"; });
  $("#fCli").addEventListener("submit", ev=>{
    ev.preventDefault();
    const d = {vend:$("#fcVend").value, nombre:$("#fcNombre").value.trim(), tel:$("#fcTel").value.trim(), tipo:$("#fcTipo").value, estado:$("#fcEstado").value, ciudad:$("#fcCiudad").value.trim(), entrega:$("#fcEntrega").value, notas:$("#fcNotas").value.trim()};
    if(!d.nombre) return;
    if(c.id){ Object.assign(S.clientes.find(x=>x.id===c.id), d); }
    else S.clientes.push(Object.assign({id:uid(), creado:hoyISO(), pedidos:[]}, d));
    save(); cerrar(); renderAll(); toast("Cliente guardado");
  });
  const del = $("#fcDel");
  if(del) del.addEventListener("click", ()=>{
    preguntarBorrar(del, c, true);
  });
}
function formPedido(c, ped){
  const ed = !!ped, loc = entregaDe(c)==="local";
  ped = ped || {fecha:hoyISO(), items:[], anticipo:0, descuento:0, envioCobrado:0, envioCosto:0, notas:""};
  let lines = (ped.items||[]).map(it=>({id:it.id, n:it.n, m:it.m, q:it.q, precio:it.precio, pm:it.pm}));
  const semOpts = `<option value="0">Ya pagó todo / no aplica</option>` + [1,2,3,4,5,6,8,10,12].map(n=>`<option value="${n}">${n} semana${n===1?"":"s"}</option>`).join("");
  abrir(`<h3 id="ovTitle">${ed?"Editar pedido":"Nuevo pedido"} de ${esc(c.nombre)}</h3>
  <p class="meta">${loc? "Cliente local: entrega en persona." : "Cliente de fuera: envío por paquetería."} Lo cambias en los datos del cliente.</p>
  <form id="fPed" style="display:grid;gap:12px">
    <label for="fpVend">¿Quién hizo la venta?<select id="fpVend">${SOCIOS_EQ.map(x=>`<option ${(ped.vend||vendCliente(c))===x?"selected":""}>${x}</option>`).join("")}</select></label>
    <label for="fpFecha">Fecha del pedido<input id="fpFecha" type="date" value="${esc(ped.fecha)}" required></label>
    <label for="fpBuscar">Tu catálogo (escribe para filtrar)<input id="fpBuscar" placeholder="Escribe nombre o marca, ej. Yara, Armaf, Hawas" autocomplete="off"></label>
    <p class="meta" id="fpCuenta" style="margin:4px 0 2px"></p><div class="results" id="fpRes" style="max-height:300px;overscroll-behavior:contain;border:1px solid var(--line,#ddd);border-radius:10px;padding:6px"></div>
    <div><strong>Perfumes del pedido</strong></div>
    <div class="lines" id="fpLines"></div>
    <div class="fields">
      <label for="fpDesc">Descuento ($)<input id="fpDesc" type="number" inputmode="decimal" min="0" value="${+ped.descuento||0}"></label>
      ${loc? "" : `<label for="fpEnvCob">Envío que cobras ($)<input id="fpEnvCob" type="number" inputmode="decimal" min="0" value="${+ped.envioCobrado||0}"></label>
      <label for="fpEnvCosto">Envío que pagas tú ($)<input id="fpEnvCosto" type="number" inputmode="decimal" min="0" value="${+ped.envioCosto||0}"></label>`}
    </div>
    <div class="fields">
      <label for="fpPago">¿Cómo va el pago?<select id="fpPago"><option value="liquido">Ya liquidó (pagó todo)</option><option value="anticipo">Dio anticipo</option><option value="nada">No ha pagado nada</option></select></label>
      <label for="fpAnt" id="fpAntL">Anticipo recibido ($)<input id="fpAnt" type="number" inputmode="decimal" min="0" value="${+ped.anticipo||0}"></label>
    </div>
    ${loc? `<div class="card" style="padding:12px">
      <label for="fpEntregado">¿Ya le entregaste el perfume?<select id="fpEntregado"><option value="no">No, todavía no</option><option value="si">Sí, ya se lo di</option></select></label>
      <div class="fields" id="fpEntBox">
        <label for="fpFechaEnt">Fecha en que se lo diste<input id="fpFechaEnt" type="date" value="${esc(ped.fechaEntrega||hoyISO())}"></label>
        <label for="fpSemanas">¿En cuántas semanas te lo paga?<select id="fpSemanas">${semOpts}</select></label>
      </div>
      <p class="meta" id="fpPlan"></p>
    </div>` : `<div class="card" style="padding:12px">
      <label for="fpEnviado">¿Ya lo enviaste?<select id="fpEnviado"><option value="no">No, todavía no</option><option value="si">Sí, ya lo envié</option></select></label>
      <div class="fields" id="fpEnvBox">
        <label for="fpPaq">Paquetería<select id="fpPaq">${PAQUETERIAS.map(x=>`<option>${x}</option>`).join("")}</select></label>
        <label for="fpGuia">Número de guía<input id="fpGuia" value="${esc(ped.guia||"")}" placeholder="Ej. 1234567890"></label>
        <label for="fpFechaEnv">Fecha de envío<input id="fpFechaEnv" type="date" value="${esc(ped.fechaEnvio||hoyISO())}"></label>
      </div>
    </div>`}
    ${nivelSocio(c).t==="Socio Oro"? `<label class="row" style="font-weight:500;color:var(--ink);flex-wrap:nowrap"><input type="checkbox" id="fpOro" style="width:auto" ${ped.oro===false?"":"checked"}> Aplicar precio de Socio Oro (precio de 15–24 piezas desde 5 piezas, solo en perfumes marcados como Oro)</label>` : ""}
    <label class="row" style="font-weight:500;color:var(--ink);flex-wrap:nowrap"><input type="checkbox" id="fpComprado" style="width:auto" ${(ped.comprado||!ed)?"checked":""}> Ya lo tengo en stock (desmárcalo solo si se lo tienes que pedir a Ian; así aparece en tu Día de compra)</label>
    <label for="fpNotas">Notas<input id="fpNotas" value="${esc(ped.notas||"")}" placeholder="Ej. Lo recoge el sábado"></label>
    <div class="res" id="fpSum"></div>
    <p class="note" id="fpNota"></p>
    <div class="row" style="justify-content:flex-end"><button type="button" class="quiet" data-cerrar>Cancelar</button><button type="submit">Guardar pedido</button></div>
  </form>`);
  const v = id=>{ const el=$(id); return el? el.value : 0; };
  const pzOro = ()=>{ const el=$("#fpOro"); const n=lines.reduce((a,l)=>a+(+l.q||0),0); return el&&el.checked&&n>=5? 15 : 0; };
  const pagAb = (ped.abonos||[]).reduce((a,x)=>a+(+x.monto||0),0);
  $("#fpPago").value = !ed? "anticipo" : (ped.total && pagado(ped)>=ped.total? "liquido" : (+ped.anticipo||pagAb)? "anticipo" : "nada");
  const antDe = r=>{ const m=$("#fpPago").value; return m==="liquido"? Math.max(0, r.total - pagAb) : m==="nada"? 0 : (+v("#fpAnt")||0); };
  if(loc){ $("#fpEntregado").value = fueEntregado(ped)? "si":"no"; $("#fpSemanas").value = String(+ped.semanas||0); }
  else { $("#fpEnviado").value = fueEnviado(ped)? "si":"no"; $("#fpPaq").value = ped.paqueteria || "Estafeta"; }
  const resumen = ()=>{
    const r = calcPedido(lines, v("#fpDesc"), v("#fpEnvCob"), v("#fpEnvCosto"), pzOro());
    $("#fpLines").innerHTML = lines.length? r.det.map((d,ix)=>`<div class="line">
      <div><strong>${esc(d.l.n)}</strong> <span class="meta">· ${esc(d.l.m)}</span>${d.l.pm!=null&&d.l.pm!==""?` <span class="pill amber">Precio especial</span>`:(d.oro?` <span class="pill amber">Precio Oro</span>`:"")}<br><span class="meta num">${money(d.pr*d.l.q)} en total${d.p&&d.p.stock!=null&&(d.p.stock-(ed?0:d.l.q))<0?` · <span style="color:var(--bad)">No te alcanza el stock</span>`:""}</span>
      <label class="meta" style="display:flex;align-items:center;gap:6px;margin-top:4px;flex-wrap:wrap">Precio c/u $<input type="number" min="0" step="5" inputmode="numeric" value="${d.pr}" data-lpi="${ix}" style="width:96px" aria-label="Precio por pieza de ${esc(d.l.n)}">${d.l.pm!=null&&d.l.pm!==""&&d.p?`<button type="button" class="small quiet" data-lpr="${ix}">Volver a ${money(precioDe(d.p, d.oro? Math.max(r.pz,pzOro()) : r.pz))}</button>`:""}</label></div>
      <span class="qty"><button type="button" class="small quiet" data-lq="${ix}|-1" aria-label="Quitar una pieza">−</button><input type="number" min="0" value="${d.l.q}" data-lqi="${ix}" aria-label="Piezas de ${esc(d.l.n)}"><button type="button" class="small quiet" data-lq="${ix}|1" aria-label="Agregar una pieza">+</button></span>
    </div>`).join("") : `<p class="empty">Busca y agrega perfumes arriba.</p>`;
    const modoPago = $("#fpPago").value, ant = antDe(r);
    $("#fpAntL").style.display = modoPago==="anticipo"? "" : "none";
    const resta = Math.max(0, r.total - ant - pagAb);
    $("#fpSum").innerHTML = `<div><small>Piezas</small><b>${r.pz}</b></div><div><small>Escala</small><b style="font-size:1rem">${r.pz?tierLabel(r.pz):"—"}${r.det.some(d=>d.oro)?" + Oro":""}</b></div>
      <div><small>Total a cobrar</small><b>${money(r.total)}</b></div><div><small>Resta por cobrar</small><b>${money(resta)}</b></div>
      <div><small>Lo que te costó</small><b>${money(r.costo)}</b></div><div><small>Tu ganancia</small><b style="color:${r.gan>=0?"var(--good)":"var(--bad)"}">${money(r.gan)}</b></div>`;
    if(loc){
      const ent = $("#fpEntregado").value==="si", n = modoPago==="liquido"? 0 : (+$("#fpSemanas").value||0);
      $("#fpEntBox").style.display = ent? "" : "none";
      $("#fpSemanas").closest("label").style.display = modoPago==="liquido"? "none" : "";
      const base = Math.max(0, r.total - ant);
      $("#fpPlan").textContent = ent && n && base>0 ? `Te paga ${money(Math.ceil(base/n))} por semana durante ${n} semana${n===1?"":"s"}. Primer pago: ${fecha(addDays($("#fpFechaEnt").value||hoyISO(),7))}.` : (ent && resta>0 && !n ? `Resta ${money(resta)}. Si te lo va a pagar en partes, elige las semanas.` : "");
    } else {
      $("#fpEnvBox").style.display = $("#fpEnviado").value==="si"? "" : "none";
    }
    const sig = r.pz<5 && r.pz>0 ? ` Con ${5-r.pz} pieza${5-r.pz===1?"":"s"} más baja a precio de ${pzOro()===0&&$("#fpOro")? "Socio Oro" : "5–14 piezas"}.` : (r.pz>=5 && r.pz<15 && !pzOro() ? ` Con ${15-r.pz} más baja a precio de 15–24 piezas.` : "");
    const nvl = nivelSocio(c).t, extra = nvl==="Socio Plata"? " Es Socio Plata: lleva 2 decants extra de regalo." : nvl==="Socio Oro"? " Es Socio Oro: lleva 2 decants extra de regalo." : "";
    $("#fpNota").textContent = extra.trim() + (extra?" ":"") + (c.tipo==="rev" ? (loc ? (r.pz>=5? "Lleva garantía de rotación de 30 días (entrega en persona, 5 piezas o más). " : "La garantía de rotación aplica desde 5 piezas con entrega en persona. ") : "Por paquetería no lleva garantía de rotación. ") + "Te recordaré escribirle a los 7 y a los 21 días." : "Te recordaré escribirle a los 3 meses.") + sig;
  };
  const buscar = ()=>{
    const q = ($("#fpBuscar").value||"").toLowerCase().trim();
    const ps = perfumes().filter(p=>!q || (p.n+" "+p.m).toLowerCase().includes(q)).sort((a,b)=>(agotado(a)-agotado(b)) || (a.m+" "+a.n).localeCompare(b.m+" "+b.n,"es"));
    $("#fpCuenta").textContent = q? `${ps.length} encontrados` : `${ps.length} perfumes · baja con la rueda del mouse`;
    $("#fpRes").innerHTML = ps.length? ps.map(p=>`<div class="result"><span class="row" style="flex-wrap:nowrap;align-items:center">${fotoHTML(p,"sm")}<span><strong>${esc(p.n)}</strong> <span class="meta">· ${esc(p.m)}${p.ml?" · "+esc(p.ml):""}</span><br><span class="meta num">${money(precioDe(p,1))} · ${money(precioDe(p,5))} desde 5 pz</span> ${agotado(p)?`<span class="pill bad">Sin existencia</span>`:(p.stock!=null?(p.stock<=0&&p.pv>0?`<span class="pill amber">Preventa: ${p.pv}</span>`:`<span class="pill good">Tienes: ${p.stock}</span>`):"")}</span></span><button type="button" class="small" data-addp="${p.id}">Agregar</button></div>`).join("") : `<p class="empty">No encontré ese perfume en tu catálogo.</p>`;
  };
  $("#fpBuscar").addEventListener("input", buscar); buscar();
  $("#fPed").addEventListener("click", e=>{
    let b;
    if((b=e.target.closest("[data-addp]"))){ const p=perfById(b.dataset.addp); const l=lines.find(x=>x.id===p.id); if(l) l.q++; else lines.push({id:p.id,n:p.n,m:p.m,q:1}); resumen(); toast(`${p.n} agregado`); }
    else if((b=e.target.closest("[data-lpr]"))){ const ix=+b.dataset.lpr; if(lines[ix]) delete lines[ix].pm; resumen(); }
    else if((b=e.target.closest("[data-lq]"))){ const [ix,d]=b.dataset.lq.split("|").map(Number); lines[ix].q=Math.max(0,lines[ix].q+d); if(!lines[ix].q) lines.splice(ix,1); resumen(); }
  });
  $("#fPed").addEventListener("change", e=>{ const pi=e.target.closest("[data-lpi]"); if(pi){ const ix=+pi.dataset.lpi; if(lines[ix]) lines[ix].pm = Math.max(0, +pi.value||0); } const i=e.target.closest("[data-lqi]"); if(i){ const ix=+i.dataset.lqi; if(lines[ix]){ lines[ix].q=Math.max(0,+i.value||0); if(!lines[ix].q) lines.splice(ix,1); } } setTimeout(resumen,0); });
  $("#fPed").addEventListener("input", e=>{ if(e.target.matches("#fpDesc,#fpEnvCob,#fpEnvCosto,#fpAnt")) resumen(); });
  $("#fpPago").addEventListener("change", resumen);
  resumen();
  $("#fPed").addEventListener("submit", ev=>{
    ev.preventDefault();
    if(!lines.length){ toast("Agrega al menos un perfume"); return; }
    const r = calcPedido(lines, v("#fpDesc"), v("#fpEnvCob"), v("#fpEnvCosto"), pzOro());
    const data = {vend: $("#fpVend")? $("#fpVend").value : yo(), oro: $("#fpOro")? $("#fpOro").checked : undefined, comprado: $("#fpComprado").checked? (ped.comprado || hoyISO()) : null, fecha:$("#fpFecha").value, entrega: loc? "local":"paqueteria",
      items: r.det.map(d=>{ const o={id:d.l.id, n:d.l.n, m:d.l.m, q:d.l.q, precio:d.pr}; if(d.l.pm!=null && d.l.pm!=="") o.pm=+d.l.pm; return o; }), piezas:r.pz, subtotal:r.sub, descuento:+v("#fpDesc")||0,
      envioCobrado:+v("#fpEnvCob")||0, envioCosto:+v("#fpEnvCosto")||0, total:r.total, costo:Math.round(r.costo), ganancia:Math.round(r.gan),
      anticipo:antDe(r), notas:$("#fpNotas").value.trim(), perfumes: r.det.map(d=>d.l.n+(d.l.q>1?" x"+d.l.q:"")).join(", ")};
    if(loc){ const ent=$("#fpEntregado").value==="si"; Object.assign(data,{entregado:ent, fechaEntrega: ent? $("#fpFechaEnt").value : null, semanas: ent && $("#fpPago").value!=="liquido"? (+$("#fpSemanas").value||0) : 0}); }
    else { const env=$("#fpEnviado").value==="si"; Object.assign(data,{enviado:env, paqueteria: env? $("#fpPaq").value : "", guia: env? $("#fpGuia").value.trim() : "", fechaEnvio: env? $("#fpFechaEnv").value : null}); }
    // si mientras llenabas el formulario llegaron datos nuevos, usa el cliente y pedido actuales
    const cAct = S.clientes.find(x=>x.id===c.id); if(cAct) c = cAct; else if(!S.clientes.includes(c)) S.clientes.push(c);
    if(ed){ const pAct = (c.pedidos||[]).find(x=>x.id===ped.id); if(pAct) ped = pAct; }
    delete ped.estado;
    c.pedidos = c.pedidos||[];
    if(ed){ Object.assign(ped, data); } else c.pedidos.push(Object.assign({id:uid(), seg:{}, garantia:{}, abonos:[]}, data));
    save(); cerrar(); renderAll(); toast("Pedido guardado");
  });
}
$("#btnNuevoCliente").addEventListener("click", ()=>formCliente());
document.addEventListener("click", e=>{
  let b;
  if((b = e.target.closest("[data-pedido]"))){ const c=S.clientes.find(x=>x.id===b.dataset.pedido); if(c) formPedido(c); }
  else if((b = e.target.closest("[data-editped]"))){ const [cid,pid]=b.dataset.editped.split("|"); const c=S.clientes.find(x=>x.id===cid); const p=c&&c.pedidos.find(x=>x.id===pid); if(c&&p) formPedido(c,p); }
  else if((b = e.target.closest("[data-abono]"))){ const [cid,pid]=b.dataset.abono.split("|"); const c=S.clientes.find(x=>x.id===cid); const p=c&&c.pedidos.find(x=>x.id===pid); if(c&&p) formAbono(c,p); }
  else if((b = e.target.closest("[data-delcli]"))){
    const c=S.clientes.find(x=>x.id===b.dataset.delcli); if(!c) return;
    preguntarBorrar(b, c);
  }
  else if((b = e.target.closest("[data-editc]"))){ const c=S.clientes.find(x=>x.id===b.dataset.editc); if(c) formCliente(c); }
  else if((b = e.target.closest("[data-recom]"))){ const c=S.clientes.find(x=>x.id===b.dataset.recom); if(c){ $("#eEstado").value=c.estado; $("#eTipo").value=c.tipo; location.hash="estados"; renderEstado(); } }
  else if((b = e.target.closest("[data-garantia]"))){
    if(!b.dataset.ok){ b.dataset.ok="1"; b.textContent="Confirmar cambio"; return; }
    const [cid,pid]=b.dataset.garantia.split("|"); const c=S.clientes.find(x=>x.id===cid); const p=c&&c.pedidos.find(x=>x.id===pid);
    if(p){ p.garantia={usada:hoyISO()}; save(); renderAll(); toast("Garantía registrada"); }
  }
  else if((b = e.target.closest("[data-delped]"))){
    if(!b.dataset.ok){ b.dataset.ok="1"; b.textContent="¿Cancelar? Toca otra vez"; return; }
    const [cid,pid]=b.dataset.delped.split("|"); const c=S.clientes.find(x=>x.id===cid);
    if(c){ const p=c.pedidos.find(x=>x.id===pid); if(p){ c.cancelados=c.cancelados||[]; c.cancelados.push(Object.assign({}, p, {cancelado:hoyISO(), canceladoPor:yo()})); } c.pedidos=c.pedidos.filter(x=>x.id!==pid); save(); renderAll(); toast("Pedido cancelado: quedó en el historial y las piezas regresan al stock"); }
  }
});

function borrarCliente(id, entregado){
  const c = S.clientes.find(x=>x.id===id); if(!c) return;
  S.clientes = S.clientes.filter(x=>x.id!==id);
  S.borrados = S.borrados||[]; S.borrados.push(Object.assign(c, {borrado:hoyISO(), borradoPor:yo(), sinEntregar: !entregado}));
  save(); renderAll(); toast(entregado? "Cliente borrado: sus perfumes siguen descontados del stock" : "Cliente borrado: sus perfumes regresaron al stock");
}
function preguntarBorrar(btn, c, enForm){
  const pz = (c.pedidos||[]).reduce((a,p)=>a+(+p.piezas||(p.items||[]).reduce((x,i)=>x+(+i.q||0),0)),0);
  const box = document.createElement("div");
  box.className = "item"; box.style.cssText = "border-color:var(--bad);display:grid;gap:8px;width:100%";
  box.innerHTML = pz? `<strong>¿Le diste los perfumes a ${esc(primerNombre(c))}?</strong><span class="meta">Tiene ${pz} pieza${pz===1?"":"s"} en sus pedidos. Si ya se los diste, siguen descontadas del stock; si no, regresan al stock para venderlas a alguien más.</span>
    <div class="row"><button type="button" class="small" data-bc="si">Sí, ya se los di</button><button type="button" class="small ghost" data-bc="no">No, regrésalos al stock</button><button type="button" class="small quiet" data-bc="x">No borrar</button></div>`
    : `<strong>¿Borrar a ${esc(primerNombre(c))}?</strong><span class="meta">No tiene perfumes en sus pedidos. Quedará en el historial de clientes borrados.</span><div class="row"><button type="button" class="small danger" data-bc="si">Sí, borrar</button><button type="button" class="small quiet" data-bc="x">No borrar</button></div>`;
  const row = btn.closest(".row") || btn.parentNode;
  row.style.display = "none"; row.insertAdjacentElement("afterend", box);
  box.addEventListener("click", e=>{
    const b = e.target.closest("[data-bc]"); if(!b) return;
    if(b.dataset.bc==="x"){ box.remove(); row.style.display = ""; return; }
    if(enForm) cerrar();
    borrarCliente(c.id, b.dataset.bc==="si");
  });
}
document.addEventListener("click", e=>{
  const b = e.target.closest("[data-restc]"); if(!b) return;
  const c = (S.borrados||[]).find(x=>x.id===b.dataset.restc); if(!c) return;
  S.borrados = S.borrados.filter(x=>x.id!==c.id); delete c.borrado; delete c.borradoPor; delete c.sinEntregar; S.clientes.push(c);
  save(); renderAll(); toast("Cliente restaurado");
});


/* ===================== GASTOS, PAGOS A IAN Y RESTOCK ===================== */
const CAT_GASTO = ["Envíos y paquetería","Empaque y etiquetas","Publicidad","Transporte y gasolina","Sueldos","Decants y frascos","Comisiones","Otro"];
const PAGADOR = ["Caja del negocio","Braulio","Santiago"];
function finz(){ S.finanzas = S.finanzas || {}; ["gastos","pagosIan","restocks"].forEach(k=>{ if(!Array.isArray(S.finanzas[k])) S.finanzas[k]=[]; }); return S.finanzas; }
function todasFin(){ const out={gastos:[],pagosIan:[],restocks:[]}; const add=(f,quien,mio)=>{ if(!f) return; ["gastos","pagosIan","restocks"].forEach(k=>(f[k]||[]).forEach(x=>{ if(x) out[k].push(Object.assign({_quien:quien, _mio:mio}, x)); })); }; add(finz(), yo(), true); Object.values(OTROS).forEach(d=>{ if(d) add(d.finanzas, d.persona||"Santiago", false); }); return out; }
function restockPorPerfume(){ const m={}; const add=f=>((f&&f.restocks)||[]).filter(r=>r&&!r.yaEnStock).forEach(r=>(r.items||[]).forEach(it=>{ if(it&&it.id) m[it.id]=(m[it.id]||0)+(+it.q||0); })); add(S.finanzas); Object.values(OTROS).forEach(d=>add(d&&d.finanzas)); return m; }
function pagadoRestock(r, pagos){ return pagos.filter(p=>p.restock===r.id).reduce((a,p)=>a+(+p.monto||0),0); }
function estadoRestock(r, pagos){
  const total=+r.total||0, pag=pagadoRestock(r,pagos), resta=Math.max(0,total-pag), sem=+r.semanas||0;
  const semanal = sem? (+r.pagoSemanal || Math.ceil((total-(+r.anticipo||0))/sem)) : resta;
  const inicio = r.primerPago || addDays(r.fecha, 7);
  const pagadoPlan = Math.max(0, pag-(+r.anticipo||0));
  const n = semanal>0? Math.floor(pagadoPlan/semanal + 1e-6) : 0;
  const prox = resta<=0? null : (sem? addDays(inicio, 7*Math.min(n, sem-1)) : inicio);
  const proxMonto = resta<=0? 0 : Math.min(resta, semanal || resta);
  const atrasado = prox && diffDays(prox, hoyISO())<0;
  return {total, pag, resta, semanal, prox, proxMonto, atrasado, sem};
}
let gMesSel = null;
function renderGastos(){
  if(!$("#v-gastos")) return;
  const F = todasFin(), hoy = hoyISO(), mes = hoy.slice(0,7);
  if(!gMesSel) gMesSel = mes;
  const meses = [...new Set([mes].concat(F.gastos.map(g=>(g.fecha||"").slice(0,7)).filter(Boolean)))].sort().reverse();
  const nomMes = m=>{ const d=new Date(m+"-15T12:00:00"); return d.toLocaleDateString("es-MX",{month:"long",year:"numeric"}); };
  $("#gMes").innerHTML = meses.map(m=>`<option value="${m}" ${m===gMesSel?"selected":""}>${nomMes(m)}</option>`).join("");
  const gMes = F.gastos.filter(g=>(g.fecha||"").startsWith(gMesSel)).sort((a,b)=>(b.fecha||"").localeCompare(a.fecha||""));
  const deudas = F.restocks.map(r=>({r, e:estadoRestock(r, F.pagosIan)}));
  const deuda = deudas.reduce((a,x)=>a+x.e.resta,0);
  const proxs = deudas.filter(x=>x.e.prox).sort((a,b)=>a.e.prox.localeCompare(b.e.prox));
  const pagMes = F.pagosIan.filter(p=>(p.fecha||"").startsWith(mes)).reduce((a,p)=>a+(+p.monto||0),0);
  const pagTot = F.pagosIan.reduce((a,p)=>a+(+p.monto||0),0);
  // dinero que queda: lo cobrado de las ventas menos lo que salió de la caja del negocio
  const peds = todosPedidos();
  const cobrado = peds.reduce((a,x)=>a+(+pagado(x.p)||0),0);
  const porCobrar = peds.reduce((a,x)=>a+Math.max(0,+saldo(x.p)||0),0);
  const deCaja = x=>!x.pagadoPor || x.pagadoPor==="Caja del negocio";
  const pagIanCaja = F.pagosIan.filter(deCaja).reduce((a,p)=>a+(+p.monto||0),0);
  const gastCaja = F.gastos.filter(deCaja).reduce((a,g)=>a+(+g.monto||0),0);
  const queda = cobrado - pagIanCaja - gastCaja;
  const prox0 = proxs[0];
  $("#gCaja").innerHTML = `<div class="row between" style="flex-wrap:wrap;gap:8px"><h3>Dinero que nos queda</h3><span class="pill ${queda<0?"bad":"good"}">${queda<0? "Faltan "+money(-queda) : "Disponible"}</span></div>
    <div class="res">
      <div><small>Cobrado de las ventas</small><b>${money(cobrado)}</b></div>
      <div><small>Menos pagos a Ian</small><b>−${money(pagIanCaja)}</b></div>
      <div><small>Menos gastos</small><b>−${money(gastCaja)}</b></div>
      <div style="border-color:var(--gold-2,#A88454)"><small>Nos queda</small><b>${money(queda)}</b></div>
    </div>
    <p class="meta">Cuenta lo que ya les pagaron los clientes (anticipos y abonos) de los dos, menos lo que salió de la caja del negocio. Los gastos o pagos que alguno pagó de su bolsa no se restan aquí.${porCobrar? ` Todavía les deben ${money(porCobrar)} de clientes.`:""}${prox0? ` Para el próximo pago a Ian (${fecha(prox0.e.prox)}) se necesitan ${money(prox0.e.proxMonto)}${queda>=prox0.e.proxMonto? ": sí alcanza." : `: faltan ${money(prox0.e.proxMonto-Math.max(0,queda))}.`}` : ""}</p>`;
  $("#gTiles").innerHTML = [
    [money(F.gastos.filter(g=>(g.fecha||"").startsWith(mes)).reduce((a,g)=>a+(+g.monto||0),0)), "gastos este mes"],
    [money(pagMes), "pagado a Ian este mes"],
    [money(deuda), "le debemos a Ian"],
    [proxs[0]? money(proxs[0].e.proxMonto) : "—", proxs[0]? `próximo pago · ${fecha(proxs[0].e.prox)}${proxs[0].e.atrasado?" (atrasado)":""}` : "sin pagos pendientes"]
  ].map(([v,t])=>`<div class="tile"><b>${v}</b><span>${t}</span></div>`).join("");
  $("#gDeudaTxt").textContent = deuda? `Total pendiente ${money(deuda)}` : "";
  $("#gRestocks").innerHTML = deudas.length? deudas.sort((a,b)=>(b.r.fecha||"").localeCompare(a.r.fecha||"")).map(({r,e})=>{
    const pct = e.total? Math.min(100, Math.round(e.pag/e.total*100)) : 100;
    const pz = (r.items||[]).reduce((a,i)=>a+(+i.q||0),0);
    return `<div class="item ${e.resta<=0?"okk": e.atrasado?"due":"soon"}" style="display:grid;gap:6px">
      <div class="row between"><strong>Restock del ${fecha(r.fecha)} · ${pz} pieza${pz===1?"":"s"}</strong><span class="pill ${e.resta<=0?"good": e.atrasado?"bad":"warn"}">${e.resta<=0? "Pagado" : e.atrasado? "Pago atrasado" : "Debemos "+money(e.resta)}</span></div>
      <div class="meta">${r.yaEnStock? "Compra del stock inicial: estas piezas ya estaban en tu inventario. " : ""}${esc((r.items||[]).map(i=>i.q+" × "+i.n).join(", "))}</div>
      <div class="prog"><i style="width:${pct}%"></i></div>
      <div class="row between" style="flex-wrap:wrap;gap:6px"><span class="num">Total ${money(e.total)} · pagado ${money(e.pag)} · resta <strong>${money(e.resta)}</strong></span>
        <span class="meta">${e.sem? `${e.sem} semana${e.sem===1?"":"s"} de ${money(e.semanal)}` : "De contado"}${e.prox? ` · próximo pago ${fecha(e.prox)} por ${money(e.proxMonto)}` : ""}</span></div>
      ${r.notas? `<div class="meta">${esc(r.notas)}</div>`:""}
      ${(r.archivos||[]).length? `<div class="row" style="gap:6px;flex-wrap:wrap">${r.archivos.map((a,i)=>`<button class="small ghost" data-vernota="${r.id}|${i}">${a.tipo==="application/pdf"? "Ver PDF de la nota" : "Ver foto de la nota"}${r.archivos.length>1? " "+(i+1):""}</button>`).join("")}</div>`:""}
      <div class="row" style="gap:6px">${r._mio? `<label class="small ghost" style="display:inline-flex;align-items:center;gap:6px;cursor:pointer;border:1px solid rgba(242,230,216,.45);border-radius:999px;padding:6px 14px;font-size:.74rem;text-transform:uppercase;letter-spacing:.05em;color:var(--cream)">${(r.archivos||[]).length? "Agregar otra foto":"Subir foto de la nota"}<input type="file" accept="image/*,application/pdf" multiple data-subirnota="${r.id}" style="display:none"></label>`:""}${e.resta>0? `<button class="small" data-pagarr="${r.id}">Registrar pago</button>`:""}${r._mio? `<button class="small quiet" data-delr="${r.id}">Borrar restock</button>`:`<span class="meta">Registrado por ${esc(r._quien)}</span>`}</div>
    </div>`; }).join("") : `<p class="empty">Todavía no hay restocks. Cuando le compren a Ian, usen "Agregar restock": las piezas se suman a tu stock y aquí ves cuánto se le debe y cuándo pagar.</p>`;
  const pagos = F.pagosIan.slice().sort((a,b)=>(b.fecha||"").localeCompare(a.fecha||""));
  $("#gPagosTxt").textContent = pagTot? `Total pagado ${money(pagTot)}` : "";
  $("#gPagos").innerHTML = pagos.length? pagos.slice(0,40).map(p=>{ const r=F.restocks.find(x=>x.id===p.restock);
    return `<div class="item"><div class="row between"><strong>${money(p.monto)}</strong><span class="meta">${fecha(p.fecha)}</span></div>
      <div class="meta">${r? `Restock del ${fecha(r.fecha)}` : "Pago suelto"} · pagó ${esc(p.pagadoPor||"Caja del negocio")}${p.notas? " · "+esc(p.notas):""}</div>
      ${p._mio? `<div class="row"><button class="small quiet" data-delpi="${p.id}">Borrar</button></div>` : `<div class="meta">Registrado por ${esc(p._quien)}</div>`}</div>`; }).join("") : `<p class="empty">Todavía no hay pagos a Ian registrados.</p>`;
  const totMes = gMes.reduce((a,g)=>a+(+g.monto||0),0), porCat = {};
  gMes.forEach(g=>porCat[g.categoria||"Otro"]=(porCat[g.categoria||"Otro"]||0)+(+g.monto||0));
  $("#gGastos").innerHTML = (gMes.length? `<div class="meta"><strong>Total ${money(totMes)}</strong> · ${Object.entries(porCat).sort((a,b)=>b[1]-a[1]).map(([k,v])=>esc(k)+" "+money(v)).join(" · ")}</div>` : "") +
    (gMes.length? gMes.map(g=>`<div class="item"><div class="row between"><strong>${esc(g.concepto||g.categoria)}</strong><span class="num">${money(g.monto)}</span></div>
      <div class="meta">${fecha(g.fecha)} · ${esc(g.categoria||"Otro")} · pagó ${esc(g.pagadoPor||"Caja del negocio")}${g.notas? " · "+esc(g.notas):""}</div>
      ${g._mio? `<div class="row" style="gap:6px"><button class="small quiet" data-editg="${g.id}">Editar</button><button class="small quiet" data-delg="${g.id}">Borrar</button></div>` : `<div class="meta">Registrado por ${esc(g._quien)}</div>`}</div>`).join("")
    : `<p class="empty">No hay gastos registrados en este mes.</p>`);
}
function formGasto(g){
  g = g || {fecha:hoyISO(), categoria:CAT_GASTO[0], pagadoPor:PAGADOR[0]};
  abrir(`<h3 id="ovTitle">${g.id?"Editar gasto":"Registrar gasto"}</h3>
  <form id="fGasto" style="display:grid;gap:10px">
    <div class="fields">
      <label for="ggCon">¿En qué se gastó?<input id="ggCon" required placeholder="Ej. Guías de envío, bolsas, anuncio en Facebook" value="${esc(g.concepto||"")}"></label>
      <label for="ggMonto">¿Cuánto? ($)<input id="ggMonto" type="number" inputmode="decimal" min="1" step="any" required value="${g.monto||""}"></label>
      <label for="ggCat">Categoría<select id="ggCat">${CAT_GASTO.map(c=>`<option ${c===g.categoria?"selected":""}>${c}</option>`).join("")}</select></label>
      <label for="ggQuien">¿Con qué dinero?<select id="ggQuien">${PAGADOR.map(c=>`<option ${c===g.pagadoPor?"selected":""}>${c}</option>`).join("")}</select></label>
      <label for="ggFecha">Fecha<input id="ggFecha" type="date" required value="${g.fecha}"></label>
    </div>
    <label for="ggNotas">Notas (opcional)<input id="ggNotas" value="${esc(g.notas||"")}"></label>
    <div class="row" style="justify-content:flex-end"><button type="button" class="quiet" data-cerrar>Cancelar</button><button type="submit">Guardar gasto</button></div>
  </form>`);
  $("#fGasto").addEventListener("submit", ev=>{
    ev.preventDefault();
    const d = {concepto:$("#ggCon").value.trim(), monto:+$("#ggMonto").value||0, categoria:$("#ggCat").value, pagadoPor:$("#ggQuien").value, fecha:$("#ggFecha").value, notas:$("#ggNotas").value.trim()};
    if(d.monto<=0) return;
    const f = finz();
    if(g.id){ const x=f.gastos.find(y=>y.id===g.id); if(x) Object.assign(x,d); } else f.gastos.push(Object.assign({id:uid(), por:yo()}, d));
    saveFinanzas(); cerrar(); renderAll(); toast("Gasto guardado");
  });
}
function formPagoIan(rid){
  const F = todasFin(), pend = F.restocks.map(r=>({r, e:estadoRestock(r,F.pagosIan)})).filter(x=>x.e.resta>0);
  const sel = rid || (pend[0] && pend[0].r.id) || "";
  const sug = id=>{ const x=pend.find(y=>y.r.id===id); return x? x.e.proxMonto : ""; };
  abrir(`<h3 id="ovTitle">Registrar pago a Ian</h3>
  <form id="fPagoIan" style="display:grid;gap:10px">
    <div class="fields">
      <label for="piRes">¿De qué compra?<select id="piRes">${pend.map(x=>`<option value="${x.r.id}" ${x.r.id===sel?"selected":""}>Restock del ${fecha(x.r.fecha)} · debemos ${money(x.e.resta)}</option>`).join("")}<option value="" ${sel===""?"selected":""}>Pago suelto (sin restock)</option></select></label>
      <label for="piMonto">¿Cuánto le pagaron? ($)<input id="piMonto" type="number" inputmode="decimal" min="1" step="any" required value="${sug(sel)}"></label>
      <label for="piQuien">¿Con qué dinero?<select id="piQuien">${PAGADOR.map(c=>`<option>${c}</option>`).join("")}</select></label>
      <label for="piFecha">Fecha<input id="piFecha" type="date" required value="${hoyISO()}"></label>
    </div>
    <label for="piNotas">Notas (opcional)<input id="piNotas" placeholder="Ej. transferencia, efectivo"></label>
    <div class="row" style="justify-content:flex-end"><button type="button" class="quiet" data-cerrar>Cancelar</button><button type="submit">Guardar pago</button></div>
  </form>`);
  $("#piRes").addEventListener("change", ()=>{ const v=sug($("#piRes").value); if(v) $("#piMonto").value=v; });
  $("#fPagoIan").addEventListener("submit", ev=>{
    ev.preventDefault();
    const m=+$("#piMonto").value||0; if(m<=0) return;
    finz().pagosIan.push({id:uid(), restock:$("#piRes").value||null, monto:m, pagadoPor:$("#piQuien").value, fecha:$("#piFecha").value, notas:$("#piNotas").value.trim(), por:yo()});
    saveFinanzas(); cerrar(); renderAll(); toast("Pago a Ian guardado");
  });
}
function formRestock(){
  let lines = [];
  const lista = perfumes().slice().sort((a,b)=>(a.m+a.n).localeCompare(b.m+b.n));
  const costoDe = p=>Array.isArray(p.costo)? +p.costo[0]||0 : (+p.costo||0);
  abrir(`<h3 id="ovTitle">Agregar restock (compra a Ian)</h3>
  <form id="fRestock" style="display:grid;gap:12px">
    <p class="meta">Agrega los perfumes que compraron. Las piezas se suman a tu stock al guardar.</p>
    <div class="fields">
      <label for="rsPerf">Perfume<select id="rsPerf"><option value="">Elige un perfume…</option>${lista.map(p=>`<option value="${p.id}">${esc(p.m+" · "+p.n)}</option>`).join("")}<option value="__nuevo">+ Perfume nuevo (no está en la lista)</option></select></label>
      <label for="rsQ">Piezas<input id="rsQ" type="number" inputmode="numeric" min="1" value="1"></label>
      <label for="rsC">Costo por pieza ($)<input id="rsC" type="number" inputmode="decimal" min="0" step="any"></label>
    </div>
    <div id="rsNuevo" class="fields" style="display:none">
      <label for="rsNn">Nombre del perfume<input id="rsNn" placeholder="Ej. Khamrah EDP"></label>
      <label for="rsNm">Marca<input id="rsNm" placeholder="Ej. Lattafa"></label>
      <label for="rsNg">Para<select id="rsNg"><option value="H">Hombre</option><option value="M">Mujer</option><option value="U">Unisex</option></select></label>
      <label for="rsNt">Tipo<select id="rsNt"><option value="A">Árabe</option><option value="D">Diseñador</option><option value="C">Cuba</option></select></label>
      <label for="rsNp">Precio de venta 1–4 pz ($)<input id="rsNp" type="number" inputmode="decimal" min="0"></label>
    </div>
    <div class="row"><button type="button" class="small ghost" id="rsAdd">Agregar a la lista</button></div>
    <div class="list" id="rsLines"></div>
    <div class="fields">
      <label for="rsFecha">Fecha de la compra<input id="rsFecha" type="date" required value="${hoyISO()}"></label>
      <label for="rsAnt">¿Cuánto le pagaron hoy? ($)<input id="rsAnt" type="number" inputmode="decimal" min="0" step="any" value="0"></label>
      <label for="rsQuien">¿Con qué dinero?<select id="rsQuien">${PAGADOR.map(c=>`<option>${c}</option>`).join("")}</select></label>
      <label for="rsSem">¿En cuántas semanas le pagamos el resto?<select id="rsSem"><option value="0">De contado (sin plazo)</option>${[1,2,3,4,5,6,8,10,12].map(n=>`<option value="${n}" ${n===4?"selected":""}>${n} semana${n===1?"":"s"}</option>`).join("")}</select></label>
      <label for="rsSemM">¿Cuánto cada semana? ($)<input id="rsSemM" type="number" inputmode="decimal" min="0" step="any"></label>
      <label for="rsPrimer">Primer pago<input id="rsPrimer" type="date" value="${addDays(hoyISO(),7)}"></label>
    </div>
    <label for="rsNotas">Notas (opcional)<input id="rsNotas" placeholder="Ej. nota NC-000130"></label>
    <label for="rsArch">Foto o archivo de la nota de Ian (opcional)<input id="rsArch" type="file" accept="image/*,application/pdf" multiple></label>
    <p class="meta" style="margin-top:-6px">En el celular puedes tomarle foto directo a la nota. También acepta PDF.</p>
    <div class="res" id="rsRes"></div>
    <div class="row" style="justify-content:flex-end"><button type="button" class="quiet" data-cerrar>Cancelar</button><button type="submit">Guardar restock</button></div>
  </form>`);
  let semManual = false;
  const total = ()=>lines.reduce((a,l)=>a+l.q*l.costo,0);
  const resumen = ()=>{
    $("#rsLines").innerHTML = lines.length? lines.map((l,i)=>`<div class="item row between" style="gap:8px"><span><strong>${l.q} × ${esc(l.n)}</strong> <span class="meta">${esc(l.m)}${l.nuevo?" · nuevo":""} · ${money(l.costo)} c/u</span></span><span class="row" style="gap:8px"><span class="num">${money(l.q*l.costo)}</span><button type="button" class="small quiet" data-rsdel="${i}">Quitar</button></span></div>`).join("") : `<p class="empty">Todavía no agregas perfumes.</p>`;
    const t = total(), ant = Math.min(t, +$("#rsAnt").value||0), sem = +$("#rsSem").value||0;
    if(!semManual) $("#rsSemM").value = sem? Math.ceil((t-ant)/sem) : "";
    $("#rsSemM").disabled = !sem; $("#rsPrimer").disabled = !sem;
    const pz = lines.reduce((a,l)=>a+l.q,0);
    $("#rsRes").innerHTML = `<div><small>Piezas</small><b>${pz}</b></div><div><small>Total de la compra</small><b>${money(t)}</b></div><div><small>Pagado hoy</small><b>${money(ant)}</b></div><div><small>Le quedaremos a deber</small><b>${money(t-ant)}</b></div>${sem? `<div><small>Plan</small><b>${sem} × ${money(+$("#rsSemM").value||0)}</b></div>`:""}`;
  };
  $("#rsPerf").addEventListener("change", ()=>{ const v=$("#rsPerf").value; $("#rsNuevo").style.display = v==="__nuevo"? "" : "none"; const p=lista.find(x=>x.id===v); if(p) $("#rsC").value = costoDe(p)||""; });
  $("#rsAdd").addEventListener("click", ()=>{
    const v=$("#rsPerf").value, q=Math.max(1,+$("#rsQ").value||1), c=+$("#rsC").value||0;
    if(!v){ toast("Elige un perfume"); return; }
    if(v==="__nuevo"){
      const n=$("#rsNn").value.trim(), m=$("#rsNm").value.trim(); if(!n){ toast("Escribe el nombre del perfume nuevo"); return; }
      lines.push({nuevo:true, id:"x"+uid(), n, m, q, costo:c, g:$("#rsNg").value, t:$("#rsNt").value, p1:+$("#rsNp").value||0});
    } else { const p=lista.find(x=>x.id===v); const ex=lines.find(l=>l.id===v); if(ex){ ex.q+=q; ex.costo=c; } else lines.push({id:v, n:p.n, m:p.m, q, costo:c}); }
    $("#rsPerf").value=""; $("#rsQ").value=1; $("#rsC").value=""; $("#rsNuevo").style.display="none"; ["#rsNn","#rsNm","#rsNp"].forEach(s=>$(s).value="");
    resumen();
  });
  $("#fRestock").addEventListener("click", e=>{ const b=e.target.closest("[data-rsdel]"); if(b){ lines.splice(+b.dataset.rsdel,1); resumen(); } });
  $("#rsSemM").addEventListener("input", ()=>{ semManual=true; resumen(); });
  ["#rsAnt"].forEach(s=>$(s).addEventListener("input", resumen));
  $("#rsSem").addEventListener("change", ()=>{ semManual=false; resumen(); });
  resumen();
  $("#fRestock").addEventListener("submit", ev=>{
    ev.preventDefault();
    if(!lines.length){ toast("Agrega al menos un perfume"); return; }
    const t = total(), ant = Math.min(t, +$("#rsAnt").value||0), sem = +$("#rsSem").value||0, f = finz();
    S.extra = S.extra||[];
    lines.filter(l=>l.nuevo).forEach(l=>{ const p1 = l.p1 || Math.ceil(l.costo*1.25/50)*50; const p2 = Math.round(p1*0.94/50)*50 || p1;
      S.extra.push({id:l.id, n:l.n, m:l.m, t:l.t, g:l.g, fam:["amaderado"], int:2, cmin:1, cmax:3, dem:2, pr: p1<700?1: p1<1300?2:3, oc:["dia","cita"], huele:"—", comp:"", precios:[p1,p2,p2,p2,p2,p2], costo:[l.costo,l.costo,l.costo,l.costo,l.costo,l.costo], compra:0, img:0}); });
    const r = {id:uid(), fecha:$("#rsFecha").value, items:lines.map(l=>({id:l.id, n:l.n, m:l.m, q:l.q, costo:l.costo})), total:t, anticipo:ant, semanas:sem, pagoSemanal: sem? (+$("#rsSemM").value||Math.ceil((t-ant)/sem)) : 0, primerPago: sem? $("#rsPrimer").value : null, notas:$("#rsNotas").value.trim(), por:yo()};
    const archivos = [...($("#rsArch").files||[])];
    f.restocks.push(r);
    if(archivos.length) adjuntarNotas(r, archivos);
    if(ant>0) f.pagosIan.push({id:uid(), restock:r.id, monto:ant, pagadoPor:$("#rsQuien").value, fecha:r.fecha, notas:"Pago el día de la compra", por:yo()});
    saveFinanzas(); cerrar(); renderAll(); toast(`Restock guardado: ${lines.reduce((a,l)=>a+l.q,0)} piezas sumadas a tu stock`);
  });
}
document.addEventListener("click", e=>{
  let b;
  if(e.target.closest("#btnGasto")) formGasto();
  else if(e.target.closest("#btnPagoIan")) formPagoIan();
  else if(e.target.closest("#btnRestock")) formRestock();
  else if((b=e.target.closest("[data-pagarr]"))) formPagoIan(b.dataset.pagarr);
  else if((b=e.target.closest("[data-editg]"))){ const g=finz().gastos.find(x=>x.id===b.dataset.editg); if(g) formGasto(g); }
  else if((b=e.target.closest("[data-delg],[data-delpi],[data-delr]"))){
    if(!b.dataset.ok){ b.dataset.ok="1"; b.textContent="¿Seguro? Toca otra vez"; return; }
    const f=finz();
    if(b.dataset.delg) f.gastos=f.gastos.filter(x=>x.id!==b.dataset.delg);
    if(b.dataset.delpi) f.pagosIan=f.pagosIan.filter(x=>x.id!==b.dataset.delpi);
    if(b.dataset.delr){ f.restocks=f.restocks.filter(x=>x.id!==b.dataset.delr); f.pagosIan=f.pagosIan.filter(x=>x.restock!==b.dataset.delr); }
    saveFinanzas(); renderAll(); toast("Borrado");
  }
});
document.addEventListener("change", e=>{ if(e.target.id==="gMes"){ gMesSel=e.target.value; renderGastos(); } });
/* ---- Fotos / archivos de la nota de Ian ---- */
function leerDataURL(file){ return new Promise((res,rej)=>{ const fr=new FileReader(); fr.onload=()=>res(fr.result); fr.onerror=rej; fr.readAsDataURL(file); }); }
async function comprimirImagen(file, maxLargo){
  const url = await leerDataURL(file);
  const img = await new Promise((res,rej)=>{ const i=new Image(); i.onload=()=>res(i); i.onerror=rej; i.src=url; });
  let lado = maxLargo, q = .72, out = url;
  for(let k=0;k<6;k++){
    const esc_ = Math.min(1, lado/Math.max(img.width, img.height));
    const cv=document.createElement("canvas"); cv.width=Math.round(img.width*esc_); cv.height=Math.round(img.height*esc_);
    const cx=cv.getContext("2d"); cx.fillStyle="#fff"; cx.fillRect(0,0,cv.width,cv.height); cx.drawImage(img,0,0,cv.width,cv.height);
    out = cv.toDataURL("image/jpeg", q);
    if(out.length < (window.__SB__? 900000 : 230000)) break;
    lado = Math.round(lado*.8); q = Math.max(.45, q-.08);
  }
  return out;
}
async function dataURLaBlob(d){ return await (await fetch(d)).blob(); }
async function guardarArchivo(file){
  const id = uid(), esImg = (file.type||"").startsWith("image/"), tipo = esImg? "image/jpeg" : (file.type||"application/pdf");
  if(window.__SB__){
    const sb = window.__SB__, path = `${window.__UID__}/${id}.${esImg? "jpg" : "pdf"}`;
    const body = esImg? await dataURLaBlob(await comprimirImagen(file, 1800)) : file;
    if(!esImg && file.size > 10*1024*1024) throw new Error("El PDF pesa más de 10 MB");
    const {error} = await sb.storage.from("notas").upload(path, body, {contentType:tipo, upsert:false});
    if(error) throw error;
    return {ref:"sb:"+path, nombre:file.name, tipo, fecha:hoyISO()};
  }
  const db = await claude.use("db"); if(!db) throw new Error("sin conexión");
  let data;
  if(esImg) data = await comprimirImagen(file, 1300);
  else { if(file.size > 170000) throw new Error("En esta versión de prueba el PDF debe pesar menos de 170 KB; mejor súbelo como foto"); data = await leerDataURL(file); }
  await db.doc("notas/"+id).set({data, nombre:file.name, tipo, fecha:hoyISO()});
  return {ref:"db:"+id, nombre:file.name, tipo, fecha:hoyISO()};
}
async function adjuntarNotas(r, archivos){
  toast(`Subiendo ${archivos.length===1? "la nota" : archivos.length+" archivos"}…`);
  const ok=[];
  for(const f of archivos){ try{ ok.push(await guardarArchivo(f)); }catch(e){ toast("No se pudo subir "+(f.name||"el archivo")+": "+(e.message||"error")); } }
  if(!ok.length) return;
  const rr = finz().restocks.find(x=>x.id===r.id) || r;
  rr.archivos = (rr.archivos||[]).concat(ok);
  await saveFinanzas(); renderAll(); toast(ok.length===1? "Nota guardada" : ok.length+" archivos guardados");
}
async function verNota(a){
  try{
    let src;
    if(a.ref.startsWith("sb:")){ const {data, error} = await window.__SB__.storage.from("notas").createSignedUrl(a.ref.slice(3), 3600); if(error) throw error; src = data.signedUrl; }
    else { const db = await claude.use("db"); const d = await db.doc("notas/"+a.ref.slice(3)).get(); if(!d.exists) throw new Error("no encontrada"); src = d.data().data; }
    if(a.tipo==="application/pdf"){
      const url = src.startsWith("data:")? URL.createObjectURL(await dataURLaBlob(src)) : src;
      abrir(`<h3 id="ovTitle">Nota de Ian (PDF)</h3><p class="meta">${esc(a.nombre||"")} · ${a.fecha? fecha(a.fecha):""}</p><iframe src="${url}" style="width:100%;height:70vh;border:1px solid var(--line);border-radius:12px;background:#fff" title="Nota en PDF"></iframe><div class="row" style="justify-content:flex-end"><a class="btn small ghost" href="${url}" target="_blank" rel="noopener">Abrir en otra pestaña</a><button type="button" class="quiet" data-cerrar>Cerrar</button></div>`);
    } else {
      abrir(`<h3 id="ovTitle">Nota de Ian</h3><p class="meta">${esc(a.nombre||"")} · ${a.fecha? fecha(a.fecha):""}</p><img src="${src}" alt="Foto de la nota de Ian" style="width:100%;border-radius:12px;background:#fff"><div class="row" style="justify-content:flex-end">${src.startsWith("http")? `<a class="btn small ghost" href="${src}" target="_blank" rel="noopener">Abrir en otra pestaña</a>`:""}<button type="button" class="quiet" data-cerrar>Cerrar</button></div>`);
    }
  }catch(e){ toast("No se pudo abrir la nota"); }
}
document.addEventListener("click", e=>{ const b=e.target.closest("[data-vernota]"); if(!b) return; const [rid,i]=b.dataset.vernota.split("|"); const r=todasFin().restocks.find(x=>x.id===rid); const a=r&&(r.archivos||[])[+i]; if(a) verNota(a); });
document.addEventListener("change", e=>{ const inp=e.target.closest("[data-subirnota]"); if(!inp) return; const r=finz().restocks.find(x=>x.id===inp.dataset.subirnota); const fs=[...(inp.files||[])]; if(r&&fs.length) adjuntarNotas(r, fs); inp.value=""; });


/* ===================== SOCIOS ===================== */
const NIVELES = [{t:"Socio",min:1,ben:"Kit de inicio, asesoría por WhatsApp y garantía de rotación si es local"},{t:"Socio Plata",min:30,ben:"2 decants extra de regalo en cada pedido y prioridad en novedades"},{t:"Socio Oro",min:75,ben:"Precio de 15–24 piezas desde 5 piezas en los perfumes seleccionados"}];
function renderSocios(){
  const hoy = hoyISO(), ej = !S.clientes.length;
  const revs = clientesVista().filter(c=>c.tipo==="rev").map(c=>{
    const pz = piezasTot(c), peds = (c.pedidos||[]).slice().sort((a,b)=>b.fecha.localeCompare(a.fecha));
    const ult = peds[0], dias = ult? diffDays(hoy, ult.fecha) : null;
    let i = NIVELES.length-1; while(i>=0 && pz<NIVELES[i].min) i--;
    const sig = NIVELES[i+1] || null, ant = i>=0? NIVELES[i].min : 0;
    const pct = sig? Math.min(100, Math.round((pz-ant)/(sig.min-ant)*100)) : 100;
    return {c, pz, ult, dias, nivel: i>=0? NIVELES[i] : null, sig, pct, total: peds.reduce((a,p)=>a+(+p.total||0),0)};
  }).sort((a,b)=>b.pz-a.pz);
  const cuenta = t=>revs.filter(r=>r.nivel&&r.nivel.t===t).length;
  $("#sTiles").innerHTML = [[cuenta("Socio"),"Socios"],[cuenta("Socio Plata"),"Socios Plata"],[cuenta("Socio Oro"),"Socios Oro"],[revs.filter(r=>r.dias!=null&&r.dias>30).length,"sin comprar en 30 días"]]
    .map(([n,t])=>`<div class="tile ${ej?"example":""}"><b>${n}</b><span>${t}</span></div>`).join("");
  $("#sLista").innerHTML = (ej? `<p class="pill amber" style="justify-self:start">Ejemplo: aquí aparecerán tus revendedores cuando los registres en Clientes</p>`:"") + (revs.length? revs.map((r,ix)=>{
    const nom = primerNombre(r.c), id = "sm"+ix;
    const msg = !r.nivel? `¡Hola ${nom}! Con tu primer pedido ya eres Socio de Essence & Co: te armo tu kit de inicio y te asesoro para elegir qué vender.` :
      `¡Hola ${nom}! Ya llevas ${r.pz} piezas con Essence & Co y eres ${r.nivel.t}.` + (r.sig? ` Te faltan ${r.sig.min-r.pz} piezas para ser ${r.sig.t}, donde tendrás: ${r.sig.ben.toLowerCase()}.` : ` Ya estás en el nivel más alto: ${r.nivel.ben.toLowerCase()}.`) + ` ¿Te armo tu resurtido?`;
    const alerta = r.dias!=null && r.dias>30;
    return `<div class="item ${alerta?"soon":""} ${r.c.ejemplo?"example":""}">
      <div class="row between"><strong style="font-size:1.05rem">${esc(r.c.nombre)}</strong><span class="pill ${r.nivel? (r.nivel.t==="Socio Oro"?"amber":r.nivel.t==="Socio Plata"?"":"good") : "plain"}">${r.nivel? r.nivel.t : "Prospecto"}</span></div>
      <div class="meta num">${r.pz} piezas acumuladas · ${money(r.total)} comprados · ${(r.c.pedidos||[]).length} pedido${(r.c.pedidos||[]).length===1?"":"s"}${r.ult? ` · último hace ${r.dias} día${r.dias===1?"":"s"}`:""}</div>
      <div class="prog" role="progressbar" aria-valuenow="${r.pct}" aria-valuemin="0" aria-valuemax="100" aria-label="Avance al siguiente nivel"><i style="width:${r.pct}%"></i></div>
      <div class="meta">${r.sig? `Le faltan <strong style="color:var(--ink)">${r.sig.min-r.pz} piezas</strong> para ${r.sig.t} (${r.pct}%)` : "Nivel máximo"}${r.nivel? ` · Hoy tiene: ${esc(r.nivel.ben)}` : ""}</div>
      ${alerta? `<div class="meta" style="color:var(--warn)"><strong>Lleva ${r.dias} días sin comprar: escríbele.</strong></div>` : ""}
      <div class="msg" id="${id}">${esc(msg)}</div>
      <div class="row"><button class="small" data-copy="${id}">Copiar mensaje</button>${r.c.tel? `<a class="btn small ghost" href="${waLink(r.c.tel,msg)}" target="_blank" rel="noopener">Abrir WhatsApp</a>`:""}${r.c.ejemplo?"":`<button class="small quiet" data-pedido="${r.c.id}">Registrar pedido</button>`}</div>
    </div>`; }).join("") : `<p class="empty">Todavía no tienes revendedores registrados. Agrégalos en Clientes con tipo "Revendedor".</p>`);
}

/* ===================== DÍA DE COMPRA ===================== */
const DIAS = ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];
const TIER_MIN = [1,5,15,25,50,100];
let dcSel = null;
function porComprar(){
  const out = [];
  clientesVista().forEach(c=>(c.pedidos||[]).forEach(p=>{ if(!p.comprado && (p.items||[]).some(it=>it.id) && !(entregaDe(c,p)==="local"? fueEntregado(p) : fueEnviado(p))) out.push({c,p,key:c.id+"|"+p.id}); }));
  return out.sort((a,b)=>a.p.fecha.localeCompare(b.p.fecha));
}
function proxDiaCompra(){ const d = +((S.cfg||{}).diaCompra ?? 4), hoy = new Date(); const diff = (d - hoy.getDay() + 7) % 7; return {diff, iso: addDays(hoyISO(), diff), nombre: DIAS[d]}; }
function renderCompras(){
  $("#dcDia").value = String((S.cfg||{}).diaCompra ?? 4);
  const pd = proxDiaCompra();
  $("#dcProx").textContent = pd.diff===0? `Hoy es tu día de compra (${pd.nombre}).` : `Tu próximo día de compra es el ${pd.nombre} ${fecha(pd.iso)}, en ${pd.diff} día${pd.diff===1?"":"s"}.`;
  const pend = porComprar();
  if(!dcSel) dcSel = new Set(pend.map(x=>x.key));
  pend.forEach(x=>{ if(!dcSel.has(x.key) && !dcSel.has("!"+x.key)) dcSel.add(x.key); });
  const sel = pend.filter(x=>dcSel.has(x.key));
  const ej = !S.clientes.length;
  if(!pend.length){ $("#dcOut").innerHTML = `<div class="card"><p class="empty">No tienes pedidos pendientes por comprarle a Ian. Cuando registres pedidos que todavía no le compras, aparecen aquí.</p></div>`; return; }
  const agg = {};
  sel.forEach(({p})=>(p.items||[]).forEach(it=>{ if(!it.id) return; agg[it.id] = (agg[it.id]||0) + (+it.q||0); }));
  const ids = Object.keys(agg), tot = ids.reduce((a,id)=>a+agg[id],0);
  const costoJunto = ids.reduce((a,id)=>{ const p=perfById(id); return a + (p? agg[id]*costoDe(p,tot) : 0); },0);
  const costoSep = sel.reduce((a,{p})=>{ const pz=(p.items||[]).reduce((x,it)=>x+(+it.q||0),0); return a + (p.items||[]).reduce((x,it)=>{ const pp=perfById(it.id); return x + (pp? it.q*costoDe(pp,pz) : 0); },0); },0);
  const ti = tierIdx(tot), sigMin = TIER_MIN[ti+1];
  let extra = "";
  if(sigMin && tot>0){
    const falta = sigMin - tot;
    const ahorroSig = ids.reduce((a,id)=>{ const p=perfById(id); return a + (p? agg[id]*(costoDe(p,tot)-costoDe(p,sigMin)) : 0); },0);
    const sug = perfumes().filter(p=>p.t==="A" && p.dem===3 && !agotado(p) && costoDe(p,1)).sort((a,b)=>(b.stock||0)-(a.stock||0)).slice(0,4);
    extra = `<div class="card"><h3>Te faltan ${falta} pieza${falta===1?"":"s"} para el precio de ${tierLabel(sigMin)}</h3>
      <p>Si llegas a ${sigMin} piezas, todo el pedido te sale ${money(ahorroSig)} más barato, además de que las piezas extra te cuestan menos.${falta<=10? " Puedes completarlas con perfumes para tener en stock, de los que más se venden:" : ""}</p>
      ${falta<=10? `<ul class="clean">${sug.map(p=>`<li>${esc(p.n)} <span class="meta">· ${esc(p.m)} · te costaría ${money(costoDe(p,sigMin))} c/u · tienes ${p.stock}</span></li>`).join("")}</ul>` : `<p class="meta">Con tan pocas piezas no conviene comprar stock solo para llegar; espera a juntar más pedidos.</p>`}
    </div>`;
  }
  const lista = ids.map(id=>{ const p=perfById(id); return {p, q:agg[id]}; }).sort((a,b)=>b.q-a.q);
  const msgIan = `¡Hola Ian! Te encargo este pedido:\n` + lista.map(x=>`• ${x.q} × ${x.p? x.p.n : "?"} (${x.p? x.p.m : ""})`).join("\n") + `\n\nTotal: ${tot} piezas. ¿Me confirmas existencia y total? ¡Gracias!`;
  $("#dcOut").innerHTML = `
  <div class="card hl">
    <div class="row between"><h3>Pedidos por comprarle a Ian</h3><span class="meta">Desmarca los que no quieras incluir</span></div>
    ${ej? `<p class="pill amber" style="justify-self:start">Ejemplo con pedidos de prueba</p>`:""}
    <div class="list">${pend.map(({c,p,key})=>`<label class="result" style="font-weight:500;color:var(--ink);justify-content:flex-start;gap:10px"><input type="checkbox" style="width:auto" data-dc="${key}" ${dcSel.has(key)?"checked":""}><span><strong>${esc(c.nombre)}</strong> <span class="meta">· pedido del ${fecha(p.fecha)} · ${p.piezas} pz · ${esc(p.perfumes||"")}</span></span></label>`).join("")}</div>
  </div>
  ${tot? `<div class="card">
    <h3>Lo que vas a comprar: ${tot} piezas</h3>
    <ul class="clean">${lista.map(x=>`<li><strong>${x.q} ×</strong> ${esc(x.p? x.p.n : "?")} <span class="meta">· ${esc(x.p? x.p.m : "")} · ${money(x.p? costoDe(x.p,tot) : 0)} c/u</span>${x.p && x.p.stock!=null && x.p.stock<x.q? ` <span class="pill bad">Ian tiene ${Math.max(0,x.p.stock)}</span>`:""}</li>`).join("")}</ul>
    <div class="res">
      <div><small>Comprando todo junto</small><b>${money(costoJunto)}</b></div>
      <div><small>Comprando cada pedido por separado</small><b>${money(costoSep)}</b></div>
      <div><small>Te ahorras</small><b style="color:var(--good)">${money(costoSep-costoJunto)}</b></div>
      <div><small>Escala con Ian</small><b style="font-size:1rem">${tierLabel(tot)}</b></div>
    </div>
    <div class="msg" id="dcMsg">${esc(msgIan)}</div>
    <div class="row"><button data-copy="dcMsg">Copiar pedido para Ian</button>${ej?"":`<button class="ghost" id="dcHecho">Ya los compré</button>`}</div>
    <p class="note">Los costos son los precios de Ian guardados en tu catálogo; confirma con él el total antes de pagar.</p>
  </div>${extra}` : ""}`;
  const h = $("#dcHecho");
  if(h) h.addEventListener("click", ()=>{
    if(!h.dataset.ok){ h.dataset.ok="1"; h.textContent=`Confirmar: marcar ${sel.length} pedido${sel.length===1?"":"s"} como comprados`; return; }
    sel.forEach(({p})=>{ p.comprado = hoyISO(); }); dcSel = null; save(); renderAll(); toast("Pedidos marcados como comprados");
  });
}
document.addEventListener("change", e=>{
  const el = e.target.closest("[data-dc]"); if(!el) return;
  const k = el.dataset.dc;
  if(el.checked){ dcSel.add(k); dcSel.delete("!"+k); } else { dcSel.delete(k); dcSel.add("!"+k); }
  renderCompras();
});
$("#dcDia").addEventListener("change", ()=>{ S.cfg = S.cfg||{}; S.cfg.diaCompra = +$("#dcDia").value; save(); renderCompras(); renderHoy(); });

/* ===================== MENSAJES ===================== */
const GUION_UNO = [
 ["Saludo","¡Hola{n}! Soy Braulio de Essence & Co. ¿Buscas un perfume para ti o para regalar?"],
 ["Preguntas para encontrar su aroma","¡Con gusto te ayudo a encontrar tu aroma{n}! Cuéntame:\n1. ¿Es para ti o para regalo?\n2. ¿Te gustan más dulces, frescos o amaderados?\n3. ¿Lo usarías de día o de noche?\n4. ¿Qué perfume has usado y te ha gustado?\n5. ¿Más o menos cuánto quieres gastar?"],
 ["Si no sabe cuál elegir","Te puedo mandar 3 decants para que los pruebes. Si después compras el frasco completo, te descuento lo que pagaste por los decants."],
 ["Precio","Este perfume está en $____. Es original, en su caja sellada. ¿Te lo aparto?"],
 ["Entrega y envío","Si estás en León, San Francisco del Rincón o alrededores, te lo entrego en persona. Si estás en otra ciudad, te lo mando por paquetería: el costo depende de tu código postal y te lo paso antes de que pagues."],
 ["Cierre","¿Cuál te late más? Te lo aparto y te paso los datos de pago."],
 ["Si no contesta (24 horas después)","¡Hola{n}! Te dejo apartado tu perfume hasta mañana. ¿Lo cerramos?"],
 ["Confianza","Antes de enviarlo te mando video del perfume real en mano, y tu guía de paquetería en cuanto sale. Aquí sabes exactamente lo que compras."],
 ["Pago a semanas (solo local)","Si quieres, te lo entrego ya con un anticipo y lo terminas de pagar en pagos semanales. Por ejemplo: anticipo de $____ y ____ semanas de $____."],
 ["Ya va en camino","¡Hola{n}! Tu perfume ya va en camino por ____. Tu número de guía es ____. Con él puedes rastrearlo en la página de la paquetería."],
 ["Pedir testimonio","¡Hola{n}! ¿Ya te llegó tu perfume? Si me mandas una foto o video recibiéndolo, me ayudas muchísimo y te regalo un decant en tu próxima compra."],
 ["Recordatorio a los 3 meses","¡Hola{n}! ¿Cómo te ha ido con tu perfume? Seguro ya se te está acabando. ¿Te aparto otro o te recomiendo algo nuevo para la temporada?"]
];
const GUION_MAY = [
 ["Saludo","¡Hola{n}! Soy Braulio de Essence & Co. ¿Te interesa revender perfumes o surtir tu tienda?"],
 ["Preguntas","¡Qué bien{n}! Para armarte algo que sí se venda, cuéntame:\n1. ¿Ya vendes perfumes o vas empezando?\n2. ¿De qué ciudad eres?\n3. ¿Más o menos cuánto quieres invertir?\n4. ¿Tus clientes son más hombres, mujeres o de todo?"],
 ["Precios por cantidad","Mis precios bajan según el total de piezas de tu pedido, y puedes combinar modelos:\n• 1 a 4 piezas: precio normal\n• 5 a 14 piezas: 10% menos\n• 15 a 24 piezas: 15% menos\n• 25 a 49 piezas: 18% menos\n• 50 a 99 piezas: 20% menos\n• 100 o más: 22% menos"],
 ["Propuesta","Con eso te armo varias opciones con lo que más se vende en tu zona, con tu precio de compra y cuánto ganarías al revender cada una."],
 ["Kit de inicio","Tu primer pedido de 5 piezas o más incluye:\n• Lista de precios sugeridos con tu ganancia por pieza\n• Decants para que tus clientes huelan antes de comprar\n• Fotos y textos listos para tus estados\n• Asesoría por WhatsApp para elegir qué vender"],
 ["Garantía (solo entrega en persona)","Como te lo entrego en persona, si en 30 días algún perfume sellado no se te vende, te lo cambio por otro del mismo precio."],
 ["Entrega y envío","Si estás en León, San Francisco del Rincón o alrededores, te lo entrego en persona. Para otras ciudades lo mando por paquetería: el costo depende de tu código postal y del tamaño del pedido, y te lo paso antes de que pagues."],
 ["Apartado y pago","Para apartarte el pedido necesito un anticipo de $____, y el resto antes de la entrega o del envío."],
 ["Si no contesta (24 horas después)","¡Hola{n}! Te dejo apartadas las piezas hasta mañana, porque algunas tienen poca existencia. ¿Lo cerramos?"],
 ["Pago a semanas (solo local)","Como te lo entrego en persona, puedes llevarte el pedido con un anticipo y pagar el resto en pagos semanales. Por ejemplo: anticipo de $____ y ____ semanas de $____."],
 ["Ya va en camino","¡Hola{n}! Tu pedido ya va en camino por ____. Tu número de guía es ____. Con él puedes rastrearlo en la página de la paquetería."],
 ["Seguimiento a los 7 días","¡Hola{n}! ¿Cómo vas con los perfumes? ¿Qué te han preguntado tus clientes? Si necesitas fotos, textos o ayuda para cerrar una venta, aquí estoy."],
 ["Resurtido a los 21 días","¡Hola{n}! ¿Qué se te vendió más de tu pedido? Te armo el resurtido con lo que más se mueve."],
 ["Pedir testimonio","¡Hola{n}! ¿Ya te llegó tu pedido? Si me mandas una foto o video recibiéndolo, me ayudas muchísimo y te regalo un decant en tu próxima compra."]
];
const GUION_SOCIOS = [
 ["Cómo funciona el programa (completo)","¡Hola{n}! Te cuento cómo funciona el Programa de Socios de Essence & Co.\n\nEntre más piezas me compras en total, más beneficios tienes. Las piezas se suman de todos tus pedidos, así que no tienes que comprar todo de golpe.\n\n*Socio* (desde tu primer pedido):\n• Kit de inicio: lista de precios sugeridos con tu ganancia, decants de prueba para tus clientes, y fotos y textos listos para publicar\n• Asesoría por WhatsApp para elegir qué vender\n• Si te entrego en persona: garantía de rotación. Si en 30 días un perfume sellado no se te vende, te lo cambio por otro del mismo precio (en pedidos de 5 piezas o más)\n\n*Socio Plata* (al llegar a 30 piezas en total):\n• 2 decants extra de regalo en cada pedido\n• Prioridad cuando llegan novedades o hay poca existencia\n\n*Socio Oro* (al llegar a 75 piezas en total):\n• Precio de 15 a 24 piezas desde que tu pedido es de 5 piezas, en perfumes seleccionados\n\nLos beneficios aplican desde el pedido siguiente a que subes de nivel, y tu nivel no se pierde.\n\nEjemplo: si me compras 10 piezas en noviembre, 12 en diciembre y 8 en enero, ya llevas 30 y eres Socio Plata.\n\nTe acompaño hasta que vendas. ¿Te armo tu primer pedido?"],
 ["Versión corta","¡Hola{n}! En Essence & Co tengo un programa para revendedores: entre más piezas me compras en total, más beneficios tienes.\n• Socio (primer pedido): kit de inicio y asesoría\n• Plata (30 piezas): 2 decants de regalo en cada pedido y prioridad en novedades\n• Oro (75 piezas): precio de 15 a 24 piezas desde 5 piezas en perfumes seleccionados\nLas piezas se suman de todos tus pedidos. ¿Te cuento más?"],
 ["Cuando sube a Socio Plata","¡Felicidades{n}! Con tu último pedido llegaste a 30 piezas y ya eres *Socio Plata* de Essence & Co. Desde tu próximo pedido te llevas 2 decants extra de regalo y eres de los primeros en saber cuando llegan novedades. ¡Gracias por tu confianza!"],
 ["Cuando sube a Socio Oro","¡Felicidades{n}! Ya llevas 75 piezas y eres *Socio Oro* de Essence & Co, el nivel más alto. Desde tu próximo pedido tienes precio de 15 a 24 piezas desde 5 piezas en los perfumes seleccionados, además de tus decants de regalo. ¡Gracias por crecer conmigo!"],
 ["Para avisarle su avance","¡Hola{n}! Ya llevas ____ piezas con Essence & Co y eres ____. Te faltan ____ piezas para ser ____, donde tendrás ____. ¿Te armo tu resurtido?"],
 ["Si lleva tiempo sin comprar","¡Hola{n}! ¿Cómo vas con tus ventas? Ya llevas ____ piezas como socio de Essence & Co y te faltan ____ para subir de nivel. Llegaron perfumes que se están vendiendo mucho; ¿te mando opciones para tu resurtido?"]
];
let msgModo = "uno";
document.querySelectorAll("[data-mm]").forEach(b=>b.addEventListener("click",()=>{
  msgModo = b.dataset.mm; document.querySelectorAll("[data-mm]").forEach(x=>x.setAttribute("aria-pressed", x===b?"true":"false")); renderMensajes();
}));
function renderMensajes(){
  const n = ($("#mNombre").value||"").trim(), G = msgModo==="may"? GUION_MAY : GUION_UNO;
  $("#mSocios").style.display = msgModo==="may"? "grid" : "none";
  $("#mSociosLista").innerHTML = GUION_SOCIOS.map(([t,x],i)=>`<div class="item"><div class="row between"><strong>${i+1}. ${t}</strong><button class="small" data-copy="gs${i}">Copiar</button></div><div class="msg" id="gs${i}">${esc(x.replace(/\{n\}/g, n? " "+n : ""))}</div></div>`).join("");
  $("#mLista").innerHTML = G.map(([t,x],i)=>`<div class="item"><div class="row between"><strong>${i+1}. ${t}</strong><button class="small" data-copy="gm${i}">Copiar</button></div><div class="msg" id="gm${i}">${esc(x.replace(/\{n\}/g, n? " "+n : ""))}</div></div>`).join("");
}

/* ===================== MAYOREO ===================== */
let aromaModo = "uno";
document.querySelectorAll("[data-am]").forEach(b=>b.addEventListener("click",()=>{
  aromaModo = b.dataset.am;
  document.querySelectorAll("[data-am]").forEach(x=>x.setAttribute("aria-pressed", x===b?"true":"false"));
  $("#aromaUno").style.display = aromaModo==="uno"? "grid" : "none";
  $("#aromaMay").style.display = aromaModo==="may"? "grid" : "none";
  if(aromaModo==="may") renderMayoreo();
}));
function capDe(p, max){ return (p.stock!=null && p.stock>0)? Math.min(max, p.stock) : (p.pv>0? Math.min(max,p.pv) : max); }
function totalDe(items){
  const pz = items.reduce((a,i)=>a+i.q,0);
  return {pz, total: items.reduce((a,i)=>a+i.q*precioDe(i.p,pz),0), costo: items.reduce((a,i)=>a+i.q*costoDe(i.p,pz),0)};
}
function armar(orden, modo, obj, max, estilo){
  const items = [];
  const cnt = p=>{ const it=items.find(i=>i.p===p); return it? it.q : 0; };
  const add = p=>{ const it=items.find(i=>i.p===p); if(it) it.q++; else items.push({p,q:1}); };
  const undo = p=>{ const it=items.find(i=>i.p===p); it.q--; if(!it.q) items.splice(items.indexOf(it),1); };
  const lim = modo==="pz"? (()=>totalDe(items).pz<=obj) : (()=>totalDe(items).total<=obj);
  const done = ()=> modo==="pz" && totalDe(items).pz>=obj;
  if(estilo==="variedad"){
    for(let r=1; r<=max && !done(); r++) for(const p of orden){ if(done()) break; if(cnt(p)<r && cnt(p)<capDe(p,max)){ add(p); if(!lim()) undo(p); } }
  } else {
    for(const p of orden){ if(done()) break; for(let k=0; k<capDe(p,max) && !done(); k++){ add(p); if(!lim()){ undo(p); break; } } }
  }
  if(modo!=="pz" && totalDe(items).total < obj){
    for(const p of orden){ if(cnt(p)>=capDe(p,max)) continue; add(p); if(totalDe(items).total<=obj+200) break; undo(p); }
  }
  return items.sort((a,b)=>b.q-a.q || precioDe(b.p,1)-precioDe(a.p,1));
}
function intercalar(a, b){ const out=[]; for(let i=0;i<Math.max(a.length,b.length);i++){ if(a[i]) out.push(a[i]); if(b[i]) out.push(b[i]); } return out; }
function renderMayoreo(){
  const e = estadoById($("#wEstado").value), cl = climaMes(e, new Date().getMonth()), ne = nivelEcon(e);
  const modo = $("#wModo").value, obj = modo==="pz"? +$("#wPiezas").value : (+$("#wMonto").value||0);
  $("#wMontoL").style.display = modo==="pz"? "none":""; $("#wPiezasL").style.display = modo==="pz"? "":"none";
  const g = $("#wPara").value, linea = $("#wLinea").value, max = +$("#wMax").value, nuevo = $("#wNivel").value==="nuevo";
  const m = (+$("#wMargen").value||0)/100, nom = ($("#wNombre").value||"").trim();
  const ctx = {t:cl.t, hum:e.hum, econ:ne.n, tipo:"rev", g, linea};
  let base = perfumes().filter(p=>generoOk(p,g) && !agotado(p) && p.t!=="C" && p.t!=="B" && (p.precios||[])[0]);
  if(linea==="A"||linea==="D") base = base.filter(p=>p.t===linea);
  base = base.map(p=>{ const r=puntaje(p,ctx); let s=r.s; if(nuevo){ if(p.dem===3) s+=1.5; if(p.pr===1) s+=1; } return {p, s}; }).sort((a,b)=>b.s-a.s).map(x=>x.p);
  if(!base.length || obj<=0){ $("#mayOut").innerHTML = `<div class="card"><p class="empty">No hay perfumes con esos filtros o falta el presupuesto.</p></div>`; return; }
  const top = base.slice(0,40);
  const fit = p=> (cl.t>=p.cmin && cl.t<=p.cmax)? 2 : -Math.min(Math.abs(cl.t-p.cmin),Math.abs(cl.t-p.cmax));
  const fresco = p=>p.fam.some(f=>["fresco","acuatico","citrico","aromatico"].includes(f));
  const tope = modo==="pz"? Infinity : obj/4; // en presupuesto, que alcance para al menos 4 piezas
  const caro = p=> precioDe(p,5) <= tope;
  const est = [
    ["Los más vendidos", [...top].sort((a,b)=>b.dem-a.dem), "llenar"],
    ["Más variedad de aromas", top, "variedad"],
    [`Hechos para el clima de ${e.n}`, [...top].sort((a,b)=>fit(b)-fit(a)), "llenar"],
    ["Más piezas por tu dinero", top.slice(0,25).sort((a,b)=>precioDe(a,1)-precioDe(b,1)), "llenar"],
    ["Premium", [...top.slice(0,25)].filter(caro).sort((a,b)=>precioDe(b,1)-precioDe(a,1)), "variedad"],
    g==="T"? ["Mitad hombre, mitad mujer", intercalar(top.filter(p=>p.g!=="M"), top.filter(p=>p.g==="M")), "variedad"]
           : ["Para el día y para la noche", intercalar(top.filter(fresco), top.filter(p=>!fresco(p))), "variedad"],
    ["La que más ganancia te deja a ti", [...top.slice(0,30)].filter(caro).sort((a,b)=>(precioDe(b,5)-costoDe(b,5))-(precioDe(a,5)-costoDe(a,5))), "llenar"]
  ];
  const vistos = new Set(), props = [];
  est.forEach(([t,orden,estilo])=>{
    let items, sig, k=0;
    do { const o = k? orden.slice(k).concat(orden.slice(0,k)) : orden; items = armar(o, modo, obj, max, estilo); sig = items.map(i=>i.p.id+":"+i.q).sort().join(","); k++; } while(vistos.has(sig) && k<6);
    vistos.add(sig);
    if(items.length) props.push({t, items, ...totalDe(items)});
  });
  const r10 = x=>Math.round(x/10)*10;
  const gar = e.id==="gto";
  const bloques = props.map((pp,i)=>{
    const ganRev = pp.items.reduce((a,it)=>a+it.q*(r10(precioDe(it.p,pp.pz)*(1+m))-precioDe(it.p,pp.pz)),0);
    const cliente = `Opción ${i+1}: ${pp.t}\n` + pp.items.map(it=>`• ${it.q} × ${it.p.n} (${it.p.m}) – ${money(precioDe(it.p,pp.pz))} c/u`).join("\n") +
      `\nTotal: ${pp.pz} piezas por ${money(pp.total)} (precio de ${tierLabel(pp.pz)})` + (m? `\nSi los revendes con ${Math.round(m*100)}% de ganancia, ganarías aprox. ${money(ganRev)}.` : "");
    const interno = `Opción ${i+1}: ${pp.t} – ${pp.pz} pz – cobras ${money(pp.total)} – costo Ian ${money(pp.costo)} – tu ganancia ${money(pp.total-pp.costo)}\n` +
      pp.items.map(it=>`  ${it.q} × ${it.p.n}: ${money(precioDe(it.p,pp.pz))} (Ian ${money(costoDe(it.p,pp.pz))})`).join("\n");
    return {pp, ganRev, cliente, interno};
  });
  const intro = `¡Hola${nom?" "+nom:""}! Te armé ${bloques.length} opciones con lo que más se vende en ${e.n}. Los precios por pieza bajan según el total de piezas del pedido:\n\n`;
  const cierre = `\n\n${gar? "Como te lo entrego en persona, si en 30 días algún perfume sellado no se te vende, te lo cambio por otro del mismo precio.\n\n" : "El envío por paquetería se cotiza según tu código postal y te lo paso antes de pagar.\n\n"}¿Cuál te late más? Te la aparto con un anticipo.`;
  const todo = intro + bloques.map(b=>b.cliente).join("\n\n") + cierre;
  const internoTodo = `Propuestas para ${nom||"cliente"} (${e.n}) – ${modo==="pz"? obj+" piezas" : "presupuesto "+money(obj)}\n\n` + bloques.map(b=>b.interno).join("\n\n");
  $("#mayOut").innerHTML = `
    <div class="card hl"><div class="row between"><h3>${bloques.length} propuestas para ${esc(e.n)}</h3><span class="meta">Clima ${TEMP[cl.t].toLowerCase()} · nivel económico ${ne.t.toLowerCase()}</span></div>
      <div class="row"><button data-copy="wTodo">Copiar las ${bloques.length} para el cliente</button><button class="ghost" data-copy="wInt">Copiar versión interna</button></div>
      <div class="msg" id="wTodo" style="display:none">${esc(todo)}</div><div class="msg" id="wInt" style="display:none">${esc(internoTodo)}</div>
    </div>` + bloques.map((b,i)=>{ const pp=b.pp, gan=pp.total-pp.costo; return `<div class="card prop">
      <div class="row between"><h3>Opción ${i+1}: ${esc(pp.t)}</h3><span class="pill">${pp.pz} piezas · ${money(pp.total)}</span></div>
      <ul>${pp.items.map(it=>`<li><strong>${it.q} ×</strong> ${esc(it.p.n)} <span class="meta">· ${esc(it.p.m)} · ${TIPO[it.p.t]}</span> — <span class="num">${money(precioDe(it.p,pp.pz))} c/u</span></li>`).join("")}</ul>
      <p class="meta">Precio de ${tierLabel(pp.pz)}${modo!=="pz"? (pp.total>obj? ` · se pasa ${money(pp.total-obj)} del presupuesto` : ` · le sobran ${money(obj-pp.total)}`) : ""}. Si revende con ${Math.round(m*100)}% de ganancia, gana aprox. <strong>${money(b.ganRev)}</strong>.</p>
      <div class="internal"><strong>Solo para ti</strong><span>Costo con Ian: ${money(pp.costo)} · Tu ganancia: ${money(gan)} (${pp.total? Math.round(gan/pp.total*100):0}% de lo que cobras)</span></div>
      <div class="msg" id="wm${i}">${esc(b.cliente)}</div>
      <div class="row"><button class="small" data-copy="wm${i}">Copiar esta opción</button></div>
    </div>`; }).join("");
}
["#wModo","#wMonto","#wPiezas","#wEstado","#wPara","#wLinea","#wMax","#wNivel","#wMargen","#wNombre"].forEach(s=>{ const el=$(s); el.addEventListener(el.tagName==="INPUT"?"input":"change", renderMayoreo); });


/* ===================== CALCULADORA ===================== */
function descuento(p){ return p>=100?22: p>=50?20: p>=25?18: p>=15?15: p>=5?10: 0; }
function calcPerfume(){
  const p = perfumes().find(x=>x.id===$("#kPerf").value); if(!p) return;
  const pz = Math.max(1,+$("#kPiezas").value||1);
  $("#kVenta").value = precioDe(p, pz);
  const c = costoDe(p,1); if(c) $("#kLista").value = Math.round(c);
}
function renderCalc(){
  const lista=+$("#kLista").value||0, pz=Math.max(1,+$("#kPiezas").value||1), venta=+$("#kVenta").value||0, envio=+$("#kEnvio").value||0;
  const dec=+$("#kDecants").value||0, decC=+$("#kDecCosto").value||0, rev=+$("#kRev").value||0;
  const d = descuento(pz), costo = lista*(1-d/100);
  const ingreso = venta*pz, gasto = costo*pz + envio + dec*decC, gan = ingreso-gasto;
  const margen = ingreso? gan/ingreso*100 : 0;
  const ganRev = (rev-venta)*pz;
  $("#kOut").innerHTML = `
    <div><small>Descuento del proveedor</small><b>${d}%</b></div>
    <div><small>Te cuesta cada pieza</small><b>${money(costo)}</b></div>
    <div><small>Cobras en total</small><b>${money(ingreso)}</b></div>
    <div><small>Tu ganancia del pedido</small><b style="color:${gan>=0?"var(--good)":"var(--bad)"}">${money(gan)}</b></div>
    <div><small>Tu margen</small><b>${margen.toFixed(0)}%</b></div>
    <div><small>Ganancia de tu revendedor</small><b>${money(ganRev)}</b></div>`;
}

/* ===================== CATALOGO ===================== */
function renderCatalogo(){
  const q = ($("#pBuscar").value||"").toLowerCase(), g = $("#pGenero").value, t = $("#pTipo").value;
  const soloOro = $("#pOro").checked;
  const ps = perfumes().filter(p=>(p.n+" "+p.m).toLowerCase().includes(q) && (!g || p.g===g) && (!t || p.t===t) && (!soloOro || oroElegible(p)));
  const sinCosto = perfumes().filter(p=>!costoDe(p,1)).length, sinStock = perfumes().filter(agotado).length;
  const conMk = perfumes().filter(p=>(info(p).mercado||p.fra)), arriba = conMk.filter(p=>precioDe(p,1)>(info(p).mercado||p.fra)).length;
  $("#pResumen").textContent = `${ps.length} de ${perfumes().length} perfumes · ${sinStock} sin existencia (no se recomiendan) · ${sinCosto} sin costo del proveedor · ${conMk.length} con precio de mercado, ${arriba} arriba del mercado`;
  const ei = +$("#pEscala").value, EL = ["1–4","5–14","15–24","25–49","50–99","100+"][ei] + " pz", pzE = TIER_MIN[ei];
  $("#pTabla").innerHTML = `<thead><tr><th>Perfume</th><th>Tipo</th><th>Estilo</th><th>Tu precio ${esc(EL)}</th><th>Lo que pagaste</th><th>Ganancia ${esc(EL)}</th><th>% sobre costo</th>${ei===0?"<th>Precio con tu regla</th><th>Precio de mercado</th>":""}<th>Tienes</th><th>Agotado</th><th>Precio Oro</th></tr></thead><tbody>` +
    ps.map(p=>{ const i=info(p), pr=p.precios||[], c1=costoDe(p,1), cE=costoDe(p,pzE), pE=precioDe(p,pzE);
      const mk = i.mercado || p.fra || 0, gE = (cE&&pE)? pE-cE : null, mg = gE!=null? Math.round(gE/cE*100) : null, pR = c1? precioRegla(c1) : null, dif = (pR&&pr[0])? pr[0]-pR : 0;
      const st = p.stock==null? `<span class="meta">No está en su lista</span>` : p.stock<=0? (p.pv>0? `` : `<span class="pill bad">Se acabó</span>`) : `<span class="pill good">${p.stock}</span>`;
      return `<tr><td><div class="row" style="flex-wrap:nowrap;align-items:flex-start;min-width:220px">${fotoHTML(p)}<div><strong>${esc(p.n)}</strong>${p.nuevo?` <span class="pill good">Nuevo</span>`:""}<br><span class="meta">${esc(p.m)}${p.ml?" · "+esc(p.ml):""} · ${{H:"Hombre",M:"Mujer",U:"Unisex"}[p.g]}</span>${p.comp?`<br><span class="meta">Se compara con ${esc(p.comp)}</span>`:""}</div></div></td>
      <td>${TIPO[p.t]||""}</td><td class="meta">${p.fam.map(f=>FAM[f]||f).join(", ")}</td>
      <td class="num"><strong>${pE?money(pE):"—"}</strong></td>
      <td>${ei===0? `<input type="number" inputmode="decimal" aria-label="Costo ${esc(p.n)}" data-cat="${p.id}" data-k="costo" value="${i.costo||""}" placeholder="${p.costo?p.costo[0]:""}">` : `<span class="num">${cE?money(cE):"—"}</span>`}</td>
      <td class="num">${gE!=null? `<span style="color:${gE>=0?"var(--good)":"var(--bad)"}">${money(gE)}</span>`:"<span class='meta'>—</span>"}</td>
      <td class="num">${mg!=null? `<span class="pill ${ei===0&&dif<-15?"bad":"plain"}">${mg}%</span>`:"—"}</td>
      ${ei===0? `<td class="num">${pR? (dif<-15? `<strong>${money(pR)}</strong><br><span class="pill warn">Sube ${money(-dif)}</span>` : money(pR)) : "—"}</td>
      <td>${p.fra? `<span class="meta">Framora: <strong style="color:var(--ink)">${money(p.fra)}</strong></span><br>`:""}<input type="number" inputmode="decimal" aria-label="Precio de mercado ${esc(p.n)}" data-cat="${p.id}" data-k="mercado" value="${i.mercado||""}" placeholder="${p.fra? "Otra tienda" : "ML / Walmart / Framora"}">${mk&&pr[0]? (pr[0]>mk? `<br><span class="pill bad">Estás ${money(pr[0]-mk)} arriba</span>` : `<br><span class="pill good">Estás ${money(mk-pr[0])} abajo</span>`) : ""}${mk&&c1&&mk<c1? `<br><span class="pill warn">El mercado está abajo de tu costo</span>`:""}</td>` : ""}
      <td>${st}</td>
      <td><input type="checkbox" style="width:auto" aria-label="Agotado ${esc(p.n)}" data-cat="${p.id}" data-k="agotado" ${agotado(p)?"checked":""}></td>
      <td><input type="checkbox" style="width:auto" aria-label="Precio Oro ${esc(p.n)}" data-cat="${p.id}" data-k="oro" ${oroElegible(p)?"checked":""}></td></tr>`; }).join("") + `</tbody>`;
}
$("#pTabla").addEventListener("change", e=>{
  const el = e.target.closest("[data-cat]"); if(!el) return;
  const id = el.dataset.cat, k = el.dataset.k;
  S.cat[id] = S.cat[id]||{};
  S.cat[id][k] = (k==="agotado"||k==="oro")? el.checked : (+el.value||0);
  if((k==="costo"||k==="mercado") && !S.cat[id][k]) delete S.cat[id][k];
  save(); renderCatalogo(); renderCalc();
});
$("#btnNuevoPerf").addEventListener("click", ()=>{
  abrir(`<h3 id="ovTitle">Agregar perfume</h3>
  <form id="fPerf" style="display:grid;gap:10px">
    <div class="fields">
      <label for="fnN">Nombre<input id="fnN" required></label>
      <label for="fnM">Marca<input id="fnM" required></label>
      <label for="fnT">Tipo<select id="fnT"><option value="A">Árabe</option><option value="D">Diseñador</option><option value="C">Cuba</option><option value="B">Body mist</option></select></label>
      <label for="fnG">Para<select id="fnG"><option value="H">Hombre</option><option value="M">Mujer</option><option value="U">Unisex</option></select></label>
      <label for="fnF">Estilo principal<select id="fnF"><option value="fresco">Fresco</option><option value="acuatico">Acuático</option><option value="citrico">Cítrico</option><option value="dulce">Dulce</option><option value="gourmand">Gourmand</option><option value="especiado">Especiado</option><option value="amaderado">Amaderado</option><option value="floral">Floral</option><option value="frutal">Frutal</option></select></label>
      <label for="fnI">Intensidad<select id="fnI"><option value="1">Ligero</option><option value="2" selected>Medio</option><option value="3">Intenso</option></select></label>
      <label for="fnP1">Precio 1–4 piezas<input id="fnP1" type="number" inputmode="decimal" required></label>
      <label for="fnP2">Precio 5–14 piezas<input id="fnP2" type="number" inputmode="decimal"></label>
      <label for="fnD">¿Qué tanto se vende?<select id="fnD"><option value="1">Poco</option><option value="2" selected>Normal</option><option value="3">Mucho</option></select></label>
    </div>
    <label for="fnH">¿A qué huele?<input id="fnH" placeholder="Ej. Vainilla, canela y ámbar"></label>
    <div class="row" style="justify-content:flex-end"><button type="button" class="quiet" data-cerrar>Cancelar</button><button type="submit">Agregar</button></div>
  </form>`);
  $("#fPerf").addEventListener("submit", ev=>{
    ev.preventDefault();
    const f = $("#fnF").value, i = +$("#fnI").value, p1=+$("#fnP1").value||0, p2=+$("#fnP2").value||Math.round(p1*0.9);
    const fresh = ["fresco","acuatico","citrico"].includes(f), warm = ["dulce","gourmand","especiado"].includes(f);
    S.extra.push({id:"x"+uid(), n:$("#fnN").value.trim(), m:$("#fnM").value.trim(), t:$("#fnT").value, g:$("#fnG").value, fam:[f], int:i,
      cmin: fresh?2: warm?0:1, cmax: fresh?4: warm?2:3, dem:+$("#fnD").value, pr: p1<700?1: p1<1300?2:3, oc: fresh?["dia","oficina"]: warm?["noche","cita"]:["dia","cita"],
      huele:$("#fnH").value.trim()||"—", comp:"", precios:[p1,p2,p2,p2,p2,p2]});
    save(); cerrar(); fillSelects(); renderAll(); toast("Perfume agregado");
  });
});

/* ===================== NAVEGACIÓN ===================== */
const VIEWS = ["hoy","estados","aroma","clientes","ventas","gastos","socios","compras","mensajes","calculadora","catalogo"];
function route(){
  let v = (location.hash||"").slice(1); if(!VIEWS.includes(v)) v = "hoy";
  VIEWS.forEach(x=>{ document.getElementById("v-"+x).classList.toggle("on", x===v); });
  document.querySelectorAll("nav.tabs a").forEach(a=>{ if(a.dataset.v===v) a.setAttribute("aria-current","page"); else a.removeAttribute("aria-current"); });
  const cur = document.querySelector('nav.tabs a[aria-current="page"]'); if(cur && cur.scrollIntoView) cur.scrollIntoView({block:"nearest",inline:"nearest"});
}
window.addEventListener("hashchange", ()=>{ route(); window.scrollTo(0,0); });
["#eEstado","#eMes","#eGenero","#eTipo","#eExtra","#eLinea"].forEach(s=>$(s).addEventListener("change", renderEstado));
["#qPara","#qEstilo","#qMomento","#qEstado","#qPres","#qGusta"].forEach(s=>$(s).addEventListener("change", renderAroma));
$("#qNombre").addEventListener("input", renderAroma);
$("#mNombre").addEventListener("input", renderMensajes);
$("#cBuscar").addEventListener("input", renderClientes);
$("#pBuscar").addEventListener("input", renderCatalogo);
$("#pGenero").addEventListener("change", renderCatalogo);
$("#pTipo").addEventListener("change", renderCatalogo);
$("#pOro").addEventListener("change", renderCatalogo);
$("#pEscala").addEventListener("change", renderCatalogo);
document.querySelectorAll("#v-calculadora input").forEach(i=>i.addEventListener("input", ()=>{ if(i.id==="kPiezas") calcPerfume(); renderCalc(); }));
$("#kPerf").addEventListener("change", ()=>{ calcPerfume(); renderCalc(); });

function normalizar(){
  S.clientes = Array.isArray(S.clientes)? S.clientes.filter(c=>c&&typeof c==="object") : [];
  S.clientes.forEach(c=>{ c.nombre = String(c.nombre||"Sin nombre"); c.pedidos = Array.isArray(c.pedidos)? c.pedidos.filter(p=>p&&typeof p==="object") : []; c.pedidos.forEach(p=>{ if(!p.id) p.id=uid(); if(typeof p.fecha!=="string"||!p.fecha) p.fecha=hoyISO(); if(!Array.isArray(p.items)) p.items=[]; if(!Array.isArray(p.abonos)) p.abonos=[]; p.seg=p.seg||{}; p.garantia=p.garantia||{}; }); });
  if(!Array.isArray(S.borrados)) S.borrados=[]; S.clientes.forEach(c=>{ if(!c.vend) c.vend = vendCliente(c); }); S.clientes.concat(S.borrados).forEach(c=>{ if(!Array.isArray(c.cancelados)) c.cancelados=[]; }); if(!S.cat||typeof S.cat!=="object") S.cat={}; if(!Array.isArray(S.extra)) S.extra=[]; if(!S.cfg||typeof S.cfg!=="object") S.cfg={diaCompra:4};
}
function seguro(fn){ try{ fn(); }catch(e){ console.error(e); } }
function todosPedidos(){ const out=[]; const add=(cl,dueno,mio)=>(cl||[]).forEach(c=>(c&&c.pedidos||[]).forEach(pd=>{ if(pd) out.push({c, p:pd, vend: pd.vend || c.vend || dueno, mio}); })); add((S.clientes||[]).concat((S.borrados||[]).filter(c=>!c.sinEntregar)), yo(), true); Object.values(OTROS).forEach(d=>{ if(d) add((d.clientes||[]).concat((d.borrados||[]).filter(c=>c&&!c.sinEntregar)), d.persona||"Santiago", false); }); return out; }
function existencias(){ const v={}; Object.values(OTROS).forEach(d=>((d&&d.clientes)||[]).concat(((d&&d.borrados)||[]).filter(c=>c&&!c.sinEntregar)).forEach(c=>(c&&c.pedidos||[]).forEach(pd=>(pd&&pd.items||[]).forEach(it=>{ if(it&&it.id) v[it.id]=(v[it.id]||0)+(+it.q||0); })))); (S.clientes||[]).concat((S.borrados||[]).filter(c=>!c.sinEntregar)).forEach(c=>(c.pedidos||[]).forEach(pd=>(pd.items||[]).forEach(it=>{ if(it.id) v[it.id]=(v[it.id]||0)+(+it.q||0); }))); const rq = restockPorPerfume(); perfumes().forEach(p=>{ if(p.compra!=null || rq[p.id]) p.stock=(+p.compra||0)+(rq[p.id]||0)-(v[p.id]||0); }); }
let vSocio = null;
function renderVentas(){
  if(!vSocio) vSocio = yo();
  document.querySelectorAll("[data-yo]").forEach(b=>b.setAttribute("aria-pressed", b.dataset.yo===yo()?"true":"false"));
  document.querySelectorAll("[data-vs]").forEach(b=>b.setAttribute("aria-pressed", b.dataset.vs===vSocio?"true":"false"));
  const n = Object.keys(OTROS).length;
  $("#vSync").textContent = saveMode!=="db"? "Sin conexión a la cuenta: solo ves lo de este navegador, así que el stock de tu socio no se está sumando." : (n? "Conectado: el stock incluye las ventas de los dos." : "Conectado. Cuando tu socio abra este artefacto con su cuenta y registre ventas, aparecerán aquí y se descontarán del stock.");
  const ps = todosPedidos().filter(x=>vSocio==="todos" || x.vend===vSocio).sort((a,b)=>(b.p.fecha||"").localeCompare(a.p.fecha||""));
  const sum = f=>ps.reduce((a,x)=>a+(+f(x)||0),0);
  const pz = sum(x=>x.p.piezas || (x.p.items||[]).reduce((a,i)=>a+(+i.q||0),0)), tot = sum(x=>x.p.total), gan = sum(x=>x.p.ganancia), deb = sum(x=>saldo(x.p));
  const mes = hoyISO().slice(0,7), pm = ps.filter(x=>(x.p.fecha||"").startsWith(mes));
  $("#vTiles").innerHTML = [[ps.length,"pedidos"],[pz,"piezas vendidas"],[money(tot),"vendido"],[money(gan),"ganancia"],[money(deb),"por cobrar"],[money(pm.reduce((a,x)=>a+(+x.p.total||0),0)),"vendido este mes"]].map(([v,t])=>`<div class="tile"><b>${v}</b><span>${t}</span></div>`).join("");
  $("#vLista").innerHTML = ps.length? ps.map(x=>{ const p=x.p, d=saldo(p); return `<div class="item"><div class="row between"><strong>${esc(x.c.nombre||"Cliente")}${x.c.borrado?` <span class="pill plain">Cliente borrado el ${fecha(x.c.borrado)}</span>`:""}</strong><span class="meta">${p.fecha? fecha(p.fecha):""}${vSocio==="todos"? " · "+esc(x.vend):""}</span></div><div class="meta">${esc(p.perfumes || (p.items||[]).map(i=>i.n+(i.q>1?" x"+i.q:"")).join(", "))}</div><div class="row between"><span class="num">${money(p.total)} · ganancia ${money(p.ganancia)}</span>${d>0? `<span class="pill amber">Debe ${money(d)}</span>` : `<span class="pill good">Pagado</span>`}</div>${x.mio? "" : `<p class="meta">Registrado desde la cuenta de ${esc(x.vend)}</p>`}</div>`; }).join("") : `<p class="empty">${vSocio==="todos"? "Todavía no hay ventas registradas." : "Todavía no hay ventas de "+esc(vSocio)+"."}</p>`;
}
document.addEventListener("click", e=>{
  let b;
  if((b=e.target.closest("[data-vs]"))){ vSocio = b.dataset.vs; renderVentas(); }
  else if((b=e.target.closest("[data-yo]"))){ S.cfg = S.cfg||{}; S.cfg.persona = b.dataset.yo; vSocio = b.dataset.yo; save(); renderAll(); toast("Ahora registras como "+b.dataset.yo); }
});
function renderAll(){ normalizar(); existencias(); [renderHoy, renderSocios, renderCompras, renderEstado, renderAroma].forEach(seguro); if(aromaModo==="may") seguro(renderMayoreo); [renderClientes, renderVentas, renderGastos, renderMensajes, renderCalc, renderCatalogo].forEach(seguro); }
seguro(fillSelects); seguro(route); initStore().catch(e=>console.error(e));

/* parallax: el titular se mueve más lento que el fondo; las nubes siguen ligeramente el mouse */
(function(){ if(matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const os=[...document.querySelectorAll("#aura i")], k=[22,-30,14], brand=document.querySelector(".brand"); let mx=0,my=0,raf=0;
  const pinta=()=>{ raf=0; const y=scrollY; if(brand) brand.style.transform=`translate3d(0,${Math.min(y,400)*0.45}px,0)`;
    os.forEach((o,i)=>o.style.transform=`translate3d(${mx*k[i]}px,${my*k[i] - y*(0.12+i*0.06)}px,0)`); };
  const pide=()=>{ if(!raf) raf=requestAnimationFrame(pinta); };
  addEventListener("scroll", pide, {passive:true});
  addEventListener("pointermove", e=>{ mx=e.clientX/innerWidth-.5; my=e.clientY/innerHeight-.5; pide(); }, {passive:true}); pinta(); })();

/* listas desplegables personalizadas: la <select> real sigue funcionando por debajo */
(function(){
  const P = HTMLSelectElement.prototype;
  ["value","selectedIndex"].forEach(k=>{ const d=Object.getOwnPropertyDescriptor(P,k); if(!d||!d.set) return;
    Object.defineProperty(P,k,{configurable:true,enumerable:d.enumerable,get(){return d.get.call(this);},set(v){d.set.call(this,v); if(this._dd) this._dd.sync();}}); });
  let abierto = null;
  function cerrarDD(){ if(!abierto) return; const a=abierto; abierto=null; a.panel.remove(); a.btn.setAttribute("aria-expanded","false"); }
  function enhance(sel){
    if(sel._dd || sel.multiple || sel.size>1) return;
    const btn=document.createElement("button"); btn.type="button"; btn.className="dd-btn"; btn.setAttribute("aria-haspopup","listbox"); btn.setAttribute("aria-expanded","false");
    const txt=document.createElement("span"); btn.appendChild(txt);
    sel.classList.add("dd-native"); sel.tabIndex=-1; sel.setAttribute("aria-hidden","true"); sel.insertAdjacentElement("afterend",btn);
    if(sel.style.width) btn.style.width=sel.style.width;
    const sync=()=>{ const o=sel.options[sel.selectedIndex]; txt.textContent = o? o.textContent : ""; btn.disabled = sel.disabled; };
    const elegir=(i)=>{ if(sel.options[i].disabled) return; const cambia = sel.selectedIndex!==i; sel.selectedIndex=i; cerrarDD(); btn.focus(); if(cambia){ sel.dispatchEvent(new Event("input",{bubbles:true})); sel.dispatchEvent(new Event("change",{bubbles:true})); } };
    const abrir=()=>{
      if(abierto && abierto.sel===sel){ cerrarDD(); return; } cerrarDD(); sync();
      const panel=document.createElement("div"); panel.className="dd-panel"; panel.setAttribute("role","listbox");
      let act = sel.selectedIndex;
      [...sel.children].forEach(ch=>{
        const add=(o)=>{ const i=[...sel.options].indexOf(o); const d=document.createElement("div"); d.className="dd-opt"; d.setAttribute("role","option"); d.dataset.i=i; d.textContent=o.textContent; d.setAttribute("aria-selected", i===sel.selectedIndex?"true":"false"); if(o.disabled) d.setAttribute("aria-disabled","true"); panel.appendChild(d); };
        if(ch.tagName==="OPTGROUP"){ const g=document.createElement("div"); g.className="dd-grp"; g.textContent=ch.label; panel.appendChild(g); [...ch.children].forEach(add); } else if(ch.tagName==="OPTION") add(ch);
      });
      document.body.appendChild(panel);
      let haciaArriba = null;
      const pos=()=>{ const r=btn.getBoundingClientRect(), vh=innerHeight, abajo=vh-r.bottom-8, arriba=r.top-8;
        if(r.bottom<0 || r.top>vh){ cerrarDD(); return; }
        panel.style.minWidth=r.width+"px"; panel.style.maxWidth=Math.max(r.width, Math.min(420, innerWidth-16))+"px"; panel.style.left=Math.max(8, Math.min(r.left, innerWidth-panel.offsetWidth-8))+"px";
        if(haciaArriba===null) haciaArriba = abajo<220 && arriba>abajo;
        if(haciaArriba){ panel.style.maxHeight=Math.min(300,arriba)+"px"; panel.style.top=(r.top-6-panel.offsetHeight)+"px"; } else { panel.style.maxHeight=Math.max(120,Math.min(300,abajo))+"px"; panel.style.top=(r.bottom+6)+"px"; } };
      pos();
      const sel0=panel.querySelector('[aria-selected="true"]'); if(sel0) sel0.scrollIntoView({block:"nearest"});
      const marcar=(i)=>{ act=i; panel.querySelectorAll(".dd-opt").forEach(d=>d.classList.toggle("act", +d.dataset.i===i)); const d=panel.querySelector(`.dd-opt[data-i="${i}"]`); if(d) d.scrollIntoView({block:"nearest"}); };
      panel.addEventListener("mousedown", e=>e.preventDefault());
      panel.addEventListener("click", e=>{ const d=e.target.closest(".dd-opt"); if(d) elegir(+d.dataset.i); });
      btn.setAttribute("aria-expanded","true");
      abierto={sel,btn,panel,marcar,pos,get act(){return act;},elegir};
    };
    btn.addEventListener("click", abrir);
    btn.addEventListener("keydown", e=>{
      const n=sel.options.length;
      if(!abierto || abierto.sel!==sel){ if(["ArrowDown","ArrowUp","Enter"," "].includes(e.key)){ e.preventDefault(); abrir(); } return; }
      if(e.key==="Escape"){ e.preventDefault(); cerrarDD(); }
      else if(e.key==="ArrowDown"){ e.preventDefault(); abierto.marcar(Math.min(n-1, abierto.act+1)); }
      else if(e.key==="ArrowUp"){ e.preventDefault(); abierto.marcar(Math.max(0, abierto.act-1)); }
      else if(e.key==="Enter"||e.key===" "){ e.preventDefault(); abierto.elegir(abierto.act); }
      else if(e.key==="Tab"){ cerrarDD(); }
      else if(e.key.length===1){ const k=e.key.toLowerCase(); const i=[...sel.options].findIndex((o,j)=>j>abierto.act && o.textContent.trim().toLowerCase().startsWith(k)); const i2 = i>=0? i : [...sel.options].findIndex(o=>o.textContent.trim().toLowerCase().startsWith(k)); if(i2>=0) abierto.marcar(i2); }
    });
    sel.addEventListener("change", sync);
    new MutationObserver(sync).observe(sel,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:["disabled"]});
    sel._dd={sync}; sync();
    // la etiqueta abre la lista
    const lab = sel.closest("label") || (sel.id && document.querySelector(`label[for="${sel.id}"]`));
    if(lab && !lab._dd){ lab._dd=1; lab.addEventListener("click", e=>{ if(e.target===lab){ e.preventDefault(); btn.focus(); } }); }
  }
  const scan=(root)=>{ if(root.tagName==="SELECT") enhance(root); else if(root.querySelectorAll) root.querySelectorAll("select").forEach(enhance); };
  scan(document);
  new MutationObserver(ms=>ms.forEach(m=>m.addedNodes.forEach(n=>{ if(n.nodeType===1) scan(n); }))).observe(document.body,{childList:true,subtree:true});
  document.addEventListener("mousedown", e=>{ if(abierto && !abierto.panel.contains(e.target) && e.target!==abierto.btn && !abierto.btn.contains(e.target)) cerrarDD(); });
  addEventListener("resize", cerrarDD);
  document.addEventListener("scroll", e=>{ if(abierto && !abierto.panel.contains(e.target)) abierto.pos(); }, true);
})();
