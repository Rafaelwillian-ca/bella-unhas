import { useState } from "react";

const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
:root{--rose:#c8756b;--rose-lt:#e8a09a;--blush:#f7ece9;--nude:#f0dcd8;--gold:#b8966e;--cream:#fdf8f5;--ink:#2a1f1c;--ink-mid:#5a3f39;--ink-lt:#a08078;--white:#ffffff;--r:12px;--rl:24px;--sh:0 8px 40px rgba(42,31,28,.12)}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'DM Sans',sans-serif;background:var(--cream);color:var(--ink);-webkit-font-smoothing:antialiased}
button{font-family:inherit;cursor:pointer;border:none;background:none}
a{color:inherit;text-decoration:none}
.wrap{min-height:100vh;display:flex;flex-direction:column}

/* NAV */
.nav{position:sticky;top:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:0 24px;height:64px;background:rgba(253,248,245,.95);backdrop-filter:blur(16px);border-bottom:1px solid rgba(200,117,107,.12);box-shadow:0 2px 12px rgba(42,31,28,.06)}
.brand{display:flex;align-items:center;gap:8px;font-family:'Playfair Display',serif;font-size:1.2rem;cursor:pointer}
.brand-star{color:var(--rose);animation:spin 8s linear infinite;display:inline-block}
@keyframes spin{to{transform:rotate(360deg)}}
.navlinks{display:flex;align-items:center;gap:2px;flex-wrap:wrap}
.nb{padding:7px 14px;border-radius:99px;font-size:.82rem;color:var(--ink-mid);transition:.2s}
.nb:hover{background:var(--nude);color:var(--rose)}
.nb.act{color:var(--rose);font-weight:500}
.nb.cta{background:var(--rose);color:#fff;box-shadow:0 4px 14px rgba(200,117,107,.4)}
.nb.cta:hover{background:var(--ink)}

/* SECTION */
section{padding:72px 0}
.ctr{width:min(1100px,100%);margin-inline:auto;padding-inline:20px}
.slabel{display:inline-flex;align-items:center;gap:8px;font-size:10px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:var(--rose);margin-bottom:12px}
.slabel::before,.slabel::after{content:'';display:block;width:24px;height:1px;background:var(--rose-lt)}
.stitle{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,4.5vw,3rem);font-weight:400;line-height:1.15}
.stitle em{font-style:italic;color:var(--rose)}
.tc{text-align:center}.tc .slabel{justify-content:center}

/* HERO */
.hero{min-height:calc(100vh - 64px);display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;padding:48px 0;position:relative;overflow:hidden}
.hero-bg{position:absolute;inset:0;background:radial-gradient(ellipse 80% 60% at 70% 40%,rgba(232,160,154,.2) 0%,transparent 60%),radial-gradient(ellipse 50% 70% at 10% 80%,rgba(212,180,138,.12) 0%,transparent 50%),var(--cream);z-index:0}
.hero-l{position:relative;z-index:1}
.hero-eye{display:inline-flex;align-items:center;gap:8px;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--rose);margin-bottom:20px}
.hero-eye span{display:block;width:28px;height:1px;background:var(--rose-lt)}
.hero-h{font-family:'Playfair Display',serif;font-size:clamp(2.4rem,5.5vw,4.2rem);font-weight:400;line-height:1.08;margin-bottom:20px}
.hero-h em{font-style:italic;color:var(--rose)}
.hero-p{font-size:.95rem;color:var(--ink-lt);line-height:1.8;max-width:440px;margin-bottom:32px}
.hero-btns{display:flex;gap:12px;flex-wrap:wrap}
.btn{display:inline-flex;align-items:center;gap:8px;padding:12px 26px;border-radius:99px;font-size:.88rem;font-weight:500;transition:.25s;cursor:pointer}
.btn-p{background:var(--rose);color:#fff;box-shadow:0 5px 20px rgba(200,117,107,.4)}
.btn-p:hover{background:var(--ink);transform:translateY(-2px)}
.btn-o{background:transparent;color:var(--ink);border:1.5px solid var(--nude)}
.btn-o:hover{border-color:var(--rose);color:var(--rose);background:var(--blush)}
.btn-g{background:var(--gold);color:#fff;box-shadow:0 5px 20px rgba(184,150,110,.4)}
.btn-g:hover{background:var(--ink);transform:translateY(-2px)}
.hstats{display:flex;gap:36px;margin-top:44px;padding-top:32px;border-top:1px solid var(--nude)}
.snum{font-family:'Playfair Display',serif;font-size:2rem;color:var(--rose);line-height:1}
.slbl{font-size:.75rem;color:var(--ink-lt);margin-top:4px}
.hero-r{position:relative;z-index:1;display:flex;justify-content:center}
.blob{width:420px;height:420px;border-radius:60% 40% 50% 60%/50% 60% 40% 50%;background:linear-gradient(135deg,var(--nude),var(--blush),rgba(232,160,154,.4));display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding:28px;align-items:center;box-shadow:var(--sh);animation:morph 8s ease-in-out infinite}
@keyframes morph{0%,100%{border-radius:60% 40% 50% 60%/50% 60% 40% 50%}33%{border-radius:50% 60% 40% 55%/60% 45% 55% 40%}66%{border-radius:40% 55% 60% 45%/55% 40% 60% 50%}}
.hcard{background:rgba(255,255,255,.7);border-radius:var(--r);padding:14px 10px;text-align:center;border:1px solid rgba(255,255,255,.9);transition:.3s}
.hcard:hover{transform:translateY(-3px);background:rgba(255,255,255,.95)}
.hcard .e{font-size:1.8rem;margin-bottom:5px}
.hcard p{font-size:.68rem;color:var(--ink-mid);font-weight:500}

/* SERVICES */
.sgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:20px;margin-top:48px}
.scard{background:var(--white);border-radius:var(--rl);padding:28px;border:1px solid var(--nude);box-shadow:0 2px 12px rgba(42,31,28,.06);transition:.3s;position:relative;overflow:hidden}
.scard::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--rose),var(--gold));transform:scaleX(0);transform-origin:left;transition:.3s}
.scard:hover{transform:translateY(-5px);box-shadow:var(--sh)}
.scard:hover::before{transform:scaleX(1)}
.sicon{font-size:2.2rem;margin-bottom:12px}
.sname{font-family:'Playfair Display',serif;font-size:1.15rem;margin-bottom:6px}
.sdesc{font-size:.82rem;color:var(--ink-lt);line-height:1.7;margin-bottom:16px}
.sfooter{display:flex;align-items:center;justify-content:space-between}
.sprice{font-family:'Playfair Display',serif;font-size:1.4rem;color:var(--rose)}
.sdur{font-size:.75rem;color:var(--ink-lt)}
.sbadge{position:absolute;top:14px;right:14px;background:var(--blush);color:var(--rose);font-size:.68rem;font-weight:500;letter-spacing:.08em;padding:3px 9px;border-radius:99px;text-transform:uppercase}

/* CATS */
.cats{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px}
.cat{padding:7px 16px;border-radius:99px;font-size:.8rem;transition:.2s;cursor:pointer;border:1.5px solid var(--nude);color:var(--ink-lt);background:transparent}
.cat.act{background:var(--rose);color:#fff;border-color:var(--rose)}

/* SCHEDULE */
.sched-wrap{display:grid;grid-template-columns:1fr 1.2fr;gap:48px;align-items:start;margin-top:48px}
.sched-info h3{font-family:'Playfair Display',serif;font-size:1.4rem;margin-bottom:14px}
.sched-info p{color:var(--ink-lt);line-height:1.8;margin-bottom:20px;font-size:.9rem}
.perks{display:flex;flex-direction:column;gap:10px}
.perk{display:flex;align-items:center;gap:12px;font-size:.875rem}
.pi{width:34px;height:34px;background:var(--blush);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.9rem;flex-shrink:0}
.bform{background:var(--white);border-radius:var(--rl);padding:32px;box-shadow:var(--sh);border:1px solid var(--nude)}
.bform h3{font-family:'Playfair Display',serif;font-size:1.3rem;margin-bottom:22px}
.fgrid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.fg{display:flex;flex-direction:column;gap:5px}
.fg.full{grid-column:1/-1}
.fg label{font-size:.77rem;font-weight:500;color:var(--ink-mid)}
.fg input,.fg select,.fg textarea{padding:10px 14px;border-radius:var(--r);border:1.5px solid var(--nude);background:var(--cream);font-family:'DM Sans',sans-serif;font-size:.88rem;color:var(--ink);outline:none;transition:.2s}
.fg input:focus,.fg select:focus,.fg textarea:focus{border-color:var(--rose-lt);box-shadow:0 0 0 3px rgba(200,117,107,.1)}
.fg textarea{resize:vertical;min-height:80px}
.tslots{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-top:3px}
.ts{padding:9px 4px;border-radius:var(--r);border:1.5px solid var(--nude);font-size:.77rem;text-align:center;color:var(--ink-mid);background:var(--cream);cursor:pointer;transition:.2s}
.ts:hover{border-color:var(--rose-lt);color:var(--rose);background:var(--blush)}
.ts.sel{border-color:var(--rose);background:var(--rose);color:#fff}
.ts.busy{opacity:.4;cursor:not-allowed;background:var(--nude)}
.alert{padding:12px 16px;border-radius:var(--r);font-size:.83rem;margin-bottom:16px;display:flex;gap:8px;align-items:flex-start}
.aok{background:#f0fdf4;border:1px solid #bbf7d0;color:#166534}
.aerr{background:#fff1f2;border:1px solid #fecdd3;color:#9f1239}

/* TESTIMONIALS */
.tstims{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px;margin-top:48px}
.tcard{background:var(--white);border-radius:var(--rl);padding:28px;box-shadow:0 2px 12px rgba(42,31,28,.06);transition:.3s}
.tcard:hover{transform:translateY(-4px);box-shadow:var(--sh)}
.stars{color:var(--gold);font-size:1rem;margin-bottom:12px}
.ttext{font-family:'Playfair Display',serif;font-size:1rem;font-style:italic;line-height:1.7;color:var(--ink-mid);margin-bottom:16px}
.tauth{display:flex;align-items:center;gap:10px}
.tav{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,var(--nude),var(--rose-lt));display:flex;align-items:center;justify-content:center;font-size:1.1rem}
.taname{font-weight:500;font-size:.875rem}
.tasince{font-size:.75rem;color:var(--ink-lt)}

/* CONTACT */
.cwrap{display:grid;grid-template-columns:1fr 1.3fr;gap:48px;align-items:start;margin-top:48px}
.cinfo{display:flex;flex-direction:column;gap:16px}
.citem{display:flex;gap:14px;align-items:flex-start;padding:18px;background:var(--white);border-radius:var(--r);border:1px solid var(--nude);box-shadow:0 2px 12px rgba(42,31,28,.06)}
.citem-icon{font-size:1.3rem}
.citem h4{font-size:.82rem;font-weight:500;margin-bottom:3px}
.citem p{font-size:.82rem;color:var(--ink-lt);line-height:1.6}

/* ADMIN */
.admin-bg{min-height:100vh;background:var(--cream)}
.adm-hdr{background:var(--ink);color:#fff;padding:24px 32px;display:flex;align-items:center;justify-content:space-between}
.adm-hdr h1{font-family:'Playfair Display',serif;font-size:1.5rem}
.adm-tabs{display:flex;background:var(--white);border-bottom:1px solid var(--nude);padding:0 24px;overflow-x:auto}
.adm-tab{padding:14px 20px;font-size:.83rem;font-weight:500;color:var(--ink-lt);border-bottom:2px solid transparent;transition:.2s;cursor:pointer;white-space:nowrap}
.adm-tab.act{color:var(--rose);border-color:var(--rose)}
.adm-body{padding:28px}
.astats{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px}
.astat{background:var(--white);border-radius:var(--r);padding:20px;box-shadow:0 2px 12px rgba(42,31,28,.06);border-left:3px solid var(--rose)}
.astat .n{font-family:'Playfair Display',serif;font-size:1.8rem;color:var(--rose)}
.astat .l{font-size:.77rem;color:var(--ink-lt);margin-top:3px}
.atable{width:100%;border-collapse:collapse;background:var(--white);border-radius:var(--rl);overflow:hidden;box-shadow:0 2px 12px rgba(42,31,28,.06)}
.atable th{background:var(--blush);padding:12px 16px;text-align:left;font-size:.75rem;letter-spacing:.08em;text-transform:uppercase;color:var(--rose);font-weight:500}
.atable td{padding:12px 16px;border-top:1px solid var(--nude);font-size:.82rem}
.atable tr:hover td{background:var(--cream)}
.sbadge2{display:inline-block;padding:3px 10px;border-radius:99px;font-size:.72rem;font-weight:500}
.s-conf{background:#f0fdf4;color:#166534}
.s-pend{background:#fffbeb;color:#92400e}
.s-canc{background:#fff1f2;color:#9f1239}

/* GALLERY */
.gal{display:grid;grid-template-columns:repeat(6,1fr);gap:6px;margin-top:40px;border-radius:var(--rl);overflow:hidden}
.gitem{aspect-ratio:1;background:var(--nude);display:flex;align-items:center;justify-content:center;font-size:2.2rem;transition:.3s;cursor:pointer;position:relative;overflow:hidden}
.gitem:hover{transform:scale(1.05);z-index:1}

/* WHATSAPP */
.wf{position:fixed;bottom:28px;right:28px;z-index:200;width:52px;height:52px;border-radius:50%;background:#25d366;color:#fff;display:flex;align-items:center;justify-content:center;font-size:1.5rem;box-shadow:0 6px 20px rgba(37,211,102,.45);transition:.25s;text-decoration:none;animation:pulse 3s ease-in-out infinite}
@keyframes pulse{0%,100%{box-shadow:0 6px 20px rgba(37,211,102,.45)}50%{box-shadow:0 6px 36px rgba(37,211,102,.7)}}
.wf:hover{transform:scale(1.1)}

/* FOOTER */
.foot{background:var(--ink);color:rgba(255,255,255,.65);padding:56px 0 0}
.foot-in{display:grid;grid-template-columns:1.5fr 1fr 1.2fr 1fr;gap:36px;padding:0 20px;max-width:1100px;margin:0 auto}
.foot h4{color:#fff;font-size:.75rem;letter-spacing:.12em;text-transform:uppercase;margin-bottom:14px;font-weight:500}
.foot .brand{color:#fff}
.foot-links{display:flex;flex-direction:column;gap:7px}
.foot-links button{font-size:.83rem;color:rgba(255,255,255,.55);transition:.2s;text-align:left}
.foot-links button:hover{color:var(--rose-lt)}
.foot-contact p{font-size:.83rem;margin-bottom:5px}
.foot-social{display:flex;flex-direction:column;gap:9px}
.foot-social a{font-size:.83rem;color:rgba(255,255,255,.55);transition:.2s}
.foot-social a:hover{color:var(--rose-lt)}
.foot-bot{margin-top:40px;padding:16px 20px;border-top:1px solid rgba(255,255,255,.1);display:flex;justify-content:space-between;align-items:center;max-width:1100px;margin-inline:auto;font-size:.77rem}
.al{color:rgba(255,255,255,.2);font-size:.72rem}
.al:hover{color:var(--rose-lt)}

/* LOGIN */
.login-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,var(--ink) 0%,#3d2a26 100%)}
.login-box{background:var(--white);border-radius:var(--rl);padding:44px 36px;width:min(400px,90vw);box-shadow:0 24px 80px rgba(0,0,0,.35);text-align:center}
.login-box h2{font-family:'Playfair Display',serif;font-size:1.5rem;margin-bottom:6px}
.login-box p{color:var(--ink-lt);font-size:.83rem;margin-bottom:24px}

@media(max-width:900px){
  .hero{grid-template-columns:1fr;text-align:center}.hero-r{display:none}.hero-p{margin-inline:auto}.hero-btns{justify-content:center}.hstats{justify-content:center}
  .sched-wrap,.cwrap{grid-template-columns:1fr}
  .foot-in{grid-template-columns:1fr 1fr}
  .astats{grid-template-columns:1fr 1fr}
  .gal{grid-template-columns:repeat(4,1fr)}
}
@media(max-width:600px){
  .navlinks{gap:0}.nb{padding:6px 10px;font-size:.78rem}
  .fgrid{grid-template-columns:1fr}.fg.full{grid-column:unset}
  .tslots{grid-template-columns:repeat(3,1fr)}
  .foot-in{grid-template-columns:1fr}
  .gal{grid-template-columns:repeat(3,1fr)}
  .astats{grid-template-columns:1fr}
}
`;

const SERVICES = [
  { id:1, icon:"💅", name:"Esmaltação Simples",    price:"R$ 35",  dur:"30 min", cat:"Mãos",          desc:"Esmaltação caprichada com base, cor e finalizador de qualidade.", badge:null },
  { id:2, icon:"💅", name:"Esmaltação em Gel",      price:"R$ 55",  dur:"45 min", cat:"Mãos",          desc:"Esmalte gel que dura até 2 semanas sem descascar.", badge:null },
  { id:3, icon:"✨", name:"Gel UV Alongamento",      price:"R$ 150", dur:"2h",     cat:"Gel & Acrílico", desc:"Alongamento em gel com molde. Resultado duradouro e natural.", badge:"Premium" },
  { id:4, icon:"✨", name:"Manutenção de Gel",       price:"R$ 90",  dur:"1h",     cat:"Gel & Acrílico", desc:"Refil do gel já aplicado, mantém comprimento e renova a cor.", badge:null },
  { id:5, icon:"💎", name:"Acrílico com Fibra",      price:"R$ 170", dur:"2h30",   cat:"Gel & Acrílico", desc:"Acrílico reforçado com fibra de vidro. Ultra resistente.", badge:"Premium" },
  { id:6, icon:"🌸", name:"Nail Art Completa",       price:"R$ 80",  dur:"1h",     cat:"Nail Art",      desc:"Arte elaborada nas 10 unhas com glitter, pedras ou efeitos.", badge:"Popular" },
  { id:7, icon:"🔮", name:"Efeito Chrome/Mirror",    price:"R$ 60",  dur:"45 min", cat:"Nail Art",      desc:"Efeito espelhado em pó chrome. Acabamento holográfico.", badge:null },
  { id:8, icon:"💆", name:"Spa de Mãos Completo",    price:"R$ 90",  dur:"1h15",   cat:"Spa & Cuidados", desc:"Esfoliação, parafina, hidratação profunda, massagem e esmaltação.", badge:"Especial" },
  { id:9, icon:"🌺", name:"Pedicure Spa",            price:"R$ 80",  dur:"1h",     cat:"Pés",           desc:"Pedicure completa com esfoliação, hidratação e esmaltação.", badge:null },
  { id:10,icon:"🦋", name:"Press-On Personalizadas", price:"R$ 120", dur:"1h",     cat:"Nail Art",      desc:"Unhas postiças customizadas. Kit para reutilização incluso.", badge:null },
];
const CATS = ["Todos","Mãos","Gel & Acrílico","Nail Art","Spa & Cuidados","Pés"];
const ALL_SLOTS = ["09:00","09:30","10:00","10:30","11:00","11:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30"];
const BUSY = ["10:00","11:30","14:30","16:00"];

function Header({ setPage, page }) {
  const nav = [{id:"home",l:"Início"},{id:"services",l:"Serviços"},{id:"schedule",l:"Agendar"},{id:"contact",l:"Contato"}];
  return (
    <header className="nav">
      <div className="brand" onClick={() => setPage("home")}>
        <span className="brand-star">✦</span> Bella Unhas
      </div>
      <nav className="navlinks">
        {nav.map(n => (
          <button key={n.id} className={`nb ${page===n.id?"act":""}`} onClick={() => setPage(n.id)}>{n.l}</button>
        ))}
        <button className="nb cta" onClick={() => setPage("schedule")}>Agendar</button>
      </nav>
    </header>
  );
}

function Home({ setPage }) {
  const cards = [["💅","Esmaltação"],["✨","Gel UV"],["🌸","Nail Art"],["💆","Spa Mãos"],["🦋","Press-On"],["💎","Acrílico"],["🌺","Pedicure"],["🎨","Decoração"],["🔮","Chrome"]];
  const gallery = ["💅","✨","🌸","💎","🦋","🎨","🌺","🔮","💜","💗","🌟","🦚"];
  const testimonials = [
    { text:"Melhor salão! A qualidade é impecável e a Bella é super atenciosa. Saio sempre linda!", author:"Mariana S.", av:"👩🏻", since:"Cliente há 2 anos" },
    { text:"O gel UV dura mais de 3 semanas sem lascar. Já indiquei para todas as minhas amigas!", author:"Camila R.", av:"👩🏽", since:"Cliente há 1 ano" },
    { text:"Nail art incrível! Capturaram exatamente o design que eu queria. Ambiente lindo!", author:"Fernanda L.", av:"👩🏼", since:"Cliente há 6 meses" },
  ];
  return (
    <>
      {/* HERO */}
      <section style={{padding:"48px 0",minHeight:"calc(100vh - 64px)",display:"flex",alignItems:"center"}}>
        <div className="ctr">
          <div className="hero">
            <div className="hero-bg" />
            <div className="hero-l">
              <div className="hero-eye"><span/>Salão Premium de Nail Design<span/></div>
              <h1 className="hero-h">Arte nas<br/>pontas dos<br/><em>seus dedos</em></h1>
              <p className="hero-p">Experiência de beleza premium com produtos de alta qualidade, nail artists especializadas e o cuidado que você merece.</p>
              <div className="hero-btns">
                <button className="btn btn-p" onClick={() => setPage("schedule")}>✦ Agendar Horário</button>
                <button className="btn btn-o" onClick={() => setPage("services")}>Ver Serviços</button>
              </div>
              <div className="hstats">
                <div><div className="snum">2.400+</div><div className="slbl">Clientes felizes</div></div>
                <div><div className="snum">5★</div><div className="slbl">Avaliação média</div></div>
                <div><div className="snum">8 anos</div><div className="slbl">De experiência</div></div>
              </div>
            </div>
            <div className="hero-r">
              <div className="blob">
                {cards.map(([e,l],i) => <div className="hcard" key={i}><div className="e">{e}</div><p>{l}</p></div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section style={{padding:"0 0 64px"}}>
        <div className="ctr">
          <div className="tc"><span className="slabel">Nossa galeria</span><h2 className="stitle">Trabalhos <em>recentes</em></h2></div>
          <div className="gal">{gallery.map((e,i) => <div className="gitem" key={i}>{e}</div>)}</div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section style={{background:"var(--blush)"}}>
        <div className="ctr">
          <div className="tc"><span className="slabel">O que oferecemos</span><h2 className="stitle">Nossos <em>serviços</em></h2></div>
          <div className="sgrid">
            {SERVICES.slice(0,4).map(s => (
              <div className="scard" key={s.id}>
                {s.badge && <span className="sbadge">{s.badge}</span>}
                <div className="sicon">{s.icon}</div>
                <h3 className="sname">{s.name}</h3>
                <p className="sdesc">{s.desc}</p>
                <div className="sfooter"><span className="sprice">{s.price}</span><span className="sdur">⏱ {s.dur}</span></div>
              </div>
            ))}
          </div>
          <div className="tc" style={{marginTop:32}}>
            <button className="btn btn-o" onClick={() => setPage("services")}>Ver todos os serviços →</button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section>
        <div className="ctr tc">
          <span className="slabel">Depoimentos</span>
          <h2 className="stitle">O que dizem nossas <em>clientes</em></h2>
          <div className="tstims">
            {testimonials.map((t,i) => (
              <div className="tcard" key={i}>
                <div className="stars">★★★★★</div>
                <p className="ttext">"{t.text}"</p>
                <div className="tauth">
                  <div className="tav">{t.av}</div>
                  <div><div className="taname">{t.author}</div><div className="tasince">{t.since}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{background:"var(--ink)"}}>
        <div className="ctr tc">
          <p style={{color:"var(--rose-lt)",fontSize:"10px",letterSpacing:".18em",textTransform:"uppercase",marginBottom:12}}>Pronta para se cuidar?</p>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1.8rem,4vw,3rem)",color:"#fff",fontWeight:400,marginBottom:12}}>Agende seu horário <em style={{color:"var(--rose-lt)",fontStyle:"italic"}}>hoje</em></h2>
          <p style={{color:"rgba(255,255,255,.5)",marginBottom:28,maxWidth:440,marginInline:"auto",fontSize:".9rem"}}>Agenda online disponível 24h. Confirmação em poucos cliques.</p>
          <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
            <button className="btn btn-p" onClick={() => setPage("schedule")}>✦ Agendar Horário</button>
            <a href="https://wa.me/5511999998888" className="btn btn-o" style={{color:"#25d366",borderColor:"#25d366"}} target="_blank" rel="noopener noreferrer">💬 WhatsApp</a>
          </div>
        </div>
      </section>
    </>
  );
}

function Services({ setPage }) {
  const [cat, setCat] = useState("Todos");
  const filtered = cat === "Todos" ? SERVICES : SERVICES.filter(s => s.cat === cat);
  return (
    <div>
      <div style={{background:"linear-gradient(135deg,var(--blush),var(--nude))",padding:"48px 0 40px",textAlign:"center",borderBottom:"1px solid var(--nude)"}}>
        <div className="ctr"><span className="slabel">Cardápio completo</span><h1 className="stitle">Nossos <em>serviços</em></h1></div>
      </div>
      <div style={{background:"var(--white)",borderBottom:"1px solid var(--nude)",position:"sticky",top:64,zIndex:50,boxShadow:"0 2px 12px rgba(42,31,28,.06)"}}>
        <div className="ctr"><div className="cats" style={{padding:"12px 0"}}>{CATS.map(c => <button key={c} className={`cat ${cat===c?"act":""}`} onClick={() => setCat(c)}>{c}</button>)}</div></div>
      </div>
      <section>
        <div className="ctr">
          <div className="sgrid">
            {filtered.map(s => (
              <div className="scard" key={s.id}>
                {s.badge && <span className="sbadge">{s.badge}</span>}
                <div className="sicon">{s.icon}</div>
                <div style={{display:"inline-block",background:"var(--blush)",color:"var(--rose)",fontSize:".68rem",padding:"2px 9px",borderRadius:99,marginBottom:8,fontWeight:500}}>{s.cat}</div>
                <h3 className="sname">{s.name}</h3>
                <p className="sdesc">{s.desc}</p>
                <div className="sfooter"><span className="sprice">{s.price}</span><span className="sdur">⏱ {s.dur}</span></div>
                <button className="btn btn-p" style={{width:"100%",marginTop:14,padding:"10px",fontSize:".83rem",justifyContent:"center"}} onClick={() => setPage("schedule")}>Agendar</button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{background:"var(--blush)",padding:"48px 0"}}>
        <div className="ctr tc">
          <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.3rem",marginBottom:10}}>Pacotes e <em>combos especiais</em></h3>
          <p style={{color:"var(--ink-lt)",marginBottom:24,maxWidth:480,marginInline:"auto",fontSize:".88rem",lineHeight:1.8}}>Combine serviços e economize! Pergunte sobre nossos pacotes mensais e planos de fidelidade.</p>
          <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
            <a href="https://wa.me/5511999998888" className="btn btn-g" target="_blank" rel="noopener noreferrer">💬 Consultar pacotes</a>
            <button className="btn btn-p" onClick={() => setPage("schedule")}>✦ Agendar agora</button>
          </div>
        </div>
      </section>
    </div>
  );
}

function Schedule() {
  const [form, setForm] = useState({ nome:"", telefone:"", email:"", servico:"", data:new Date().toISOString().split("T")[0], horario:"", obs:"" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [bookings, setBookings] = useState([]);
  const ch = e => { setForm(f => ({...f,[e.target.name]:e.target.value})); setStatus(null); };
  const selSlot = s => { if(!BUSY.includes(s)) { setForm(f=>({...f,horario:s})); setStatus(null); } };
  const submit = async () => {
    if(!form.nome||!form.telefone||!form.email||!form.servico||!form.horario){setStatus("err");return;}
    setLoading(true);
    await new Promise(r=>setTimeout(r,1100));
    setBookings(p=>[{id:Date.now(),...form},...p]);
    setStatus("ok");
    setForm(f=>({...f,nome:"",telefone:"",email:"",servico:"",horario:"",obs:""}));
    setLoading(false);
  };
  return (
    <div>
      <div style={{background:"linear-gradient(135deg,var(--nude),var(--blush))",padding:"48px 0 40px",textAlign:"center",borderBottom:"1px solid var(--nude)"}}>
        <div className="ctr"><span className="slabel">Agenda online</span><h1 className="stitle">Agende seu <em>horário</em></h1></div>
      </div>
      <section>
        <div className="ctr">
          <div className="sched-wrap">
            <div className="sched-info">
              <h3>Como funciona?</h3>
              <p>Preencha o formulário com seus dados e preferências. Confirmação por WhatsApp em até 15 minutos.</p>
              <div className="perks">
                {[["📱","Confirmação via WhatsApp"],["✉️","E-mail automático"],["🔔","Lembrete 1h antes"],["❌","Cancelamento gratuito até 2h"],["⏰","Seg–Sáb, 9h às 19h"]].map(([i,t],k)=>(
                  <div className="perk" key={k}><div className="pi">{i}</div><span>{t}</span></div>
                ))}
              </div>
              {bookings.length > 0 && (
                <div style={{marginTop:32}}>
                  <h4 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.05rem",marginBottom:12}}>Reservas recentes</h4>
                  {bookings.slice(0,3).map(b=>(
                    <div key={b.id} style={{background:"var(--white)",border:"1px solid var(--nude)",borderRadius:"var(--r)",padding:"12px 14px",marginBottom:8,fontSize:".82rem"}}>
                      <div style={{display:"flex",justifyContent:"space-between"}}><strong>{b.nome}</strong><span className="sbadge2 s-conf">✓ Confirmado</span></div>
                      <div style={{color:"var(--ink-lt)",marginTop:3}}>{b.data} às {b.horario}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="bform">
              <h3>Preencha seus dados</h3>
              {status==="ok" && <div className="alert aok">✅ <div><strong>Reserva confirmada!</strong> Você receberá confirmação por e-mail e WhatsApp.</div></div>}
              {status==="err" && <div className="alert aerr">⚠️ Preencha todos os campos e selecione um horário.</div>}
              <div className="fgrid">
                <div className="fg"><label>Nome completo *</label><input name="nome" placeholder="Seu nome" value={form.nome} onChange={ch}/></div>
                <div className="fg"><label>Telefone *</label><input name="telefone" placeholder="(11) 99999-8888" value={form.telefone} onChange={ch}/></div>
                <div className="fg full"><label>E-mail *</label><input name="email" type="email" placeholder="seuemail@email.com" value={form.email} onChange={ch}/></div>
                <div className="fg full">
                  <label>Serviço *</label>
                  <select name="servico" value={form.servico} onChange={ch}>
                    <option value="">Selecione…</option>
                    {SERVICES.map(s=><option key={s.id} value={s.id}>{s.name} – {s.price}</option>)}
                  </select>
                </div>
                <div className="fg"><label>Data *</label><input name="data" type="date" min={new Date().toISOString().split("T")[0]} value={form.data} onChange={ch}/></div>
                <div className="fg full">
                  <label>Horário * <span style={{color:"var(--rose-lt)",fontSize:".72rem"}}>(cinza = ocupado)</span></label>
                  <div className="tslots">
                    {ALL_SLOTS.map(s=>(
                      <button key={s} type="button" onClick={()=>selSlot(s)}
                        className={`ts ${form.horario===s?"sel":""} ${BUSY.includes(s)?"busy":""}`}>{s}</button>
                    ))}
                  </div>
                </div>
                <div className="fg full"><label>Observações</label><textarea name="obs" placeholder="Design, alergias, etc." value={form.obs} onChange={ch} rows={3}/></div>
              </div>
              <button className="btn btn-p" style={{width:"100%",marginTop:20,justifyContent:"center",padding:"13px",opacity:loading?.7:1}} onClick={submit} disabled={loading}>
                {loading?"⏳ Confirmando…":"✦ Confirmar Agendamento"}
              </button>
              <p style={{textAlign:"center",fontSize:".73rem",color:"var(--ink-lt)",marginTop:10}}>Ao agendar, você concorda com nossa política de cancelamento.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Contact() {
  const [form, setForm] = useState({ nome:"", email:"", assunto:"", msg:"" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const ch = e => setForm(f=>({...f,[e.target.name]:e.target.value}));
  const submit = async () => {
    if(!form.nome||!form.email||!form.msg) return;
    setLoading(true);
    await new Promise(r=>setTimeout(r,900));
    setSent(true); setLoading(false);
  };
  return (
    <div>
      <div style={{background:"linear-gradient(135deg,var(--blush),var(--nude))",padding:"48px 0 40px",textAlign:"center",borderBottom:"1px solid var(--nude)"}}>
        <div className="ctr"><span className="slabel">Fale conosco</span><h1 className="stitle">Entre em <em>contato</em></h1></div>
      </div>
      <section>
        <div className="ctr">
          <div className="cwrap">
            <div className="cinfo">
              {[["📍","Endereço","Rua das Flores, 123 – Centro\nSão Paulo, SP – CEP 01310-100"],["📞","Telefone & WhatsApp","(11) 99999-8888\nResposta rápida via WhatsApp"],["✉️","E-mail","contato@bellaunhas.com.br\nRespondemos em até 24h"],["⏰","Horário","Seg–Sex: 09h às 19h\nSáb: 09h às 17h\nDom: Fechado"],["📸","Redes Sociais","@bellaunhas no Instagram\nBella Unhas Studio no Facebook"]].map(([i,h,p],k)=>(
                <div className="citem" key={k}>
                  <div className="citem-icon">{i}</div>
                  <div><h4>{h}</h4><p style={{whiteSpace:"pre-line"}}>{p}</p></div>
                </div>
              ))}
            </div>
            <div className="bform">
              <h3>Envie uma mensagem</h3>
              {sent ? (
                <div style={{textAlign:"center",padding:"32px 16px"}}>
                  <div style={{fontSize:"3rem",marginBottom:16}}>✅</div>
                  <h4 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.3rem",marginBottom:8}}>Mensagem enviada!</h4>
                  <p style={{color:"var(--ink-lt)",lineHeight:1.8,fontSize:".88rem"}}>Recebemos seu contato e responderemos em breve.</p>
                  <button className="btn btn-o" style={{marginTop:20}} onClick={()=>{setSent(false);setForm({nome:"",email:"",assunto:"",msg:""})}}>Enviar outra</button>
                </div>
              ) : (
                <>
                  <div className="fgrid">
                    <div className="fg"><label>Nome *</label><input name="nome" placeholder="Seu nome" value={form.nome} onChange={ch}/></div>
                    <div className="fg"><label>E-mail *</label><input name="email" type="email" placeholder="email@email.com" value={form.email} onChange={ch}/></div>
                    <div className="fg full"><label>Assunto</label><select name="assunto" value={form.assunto} onChange={ch}><option value="">Selecione…</option><option>Dúvida sobre serviços</option><option>Agendamento</option><option>Pacotes e promoções</option><option>Sugestão ou reclamação</option><option>Outro</option></select></div>
                    <div className="fg full"><label>Mensagem *</label><textarea name="msg" placeholder="Escreva sua mensagem…" value={form.msg} onChange={ch} rows={5}/></div>
                  </div>
                  <button className="btn btn-p" style={{width:"100%",marginTop:18,justifyContent:"center",padding:"13px",opacity:(loading||!form.nome||!form.email||!form.msg)?.6:1}} onClick={submit} disabled={loading||!form.nome||!form.email||!form.msg}>
                    {loading?"⏳ Enviando…":"✦ Enviar Mensagem"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const MOCK_RESERVAS = [
  {id:1,cliente:"Ana Paula Souza",tel:"(11) 98765-4321",servico:"Gel UV Alongamento",data:"2025-01-20",hr:"10:00",status:"confirmado"},
  {id:2,cliente:"Beatriz Lima",tel:"(11) 91234-5678",servico:"Nail Art Completa",data:"2025-01-20",hr:"14:00",status:"confirmado"},
  {id:3,cliente:"Camila Santos",tel:"(11) 97777-8888",servico:"Spa de Mãos",data:"2025-01-21",hr:"09:00",status:"pendente"},
  {id:4,cliente:"Daniela Rocha",tel:"(11) 99999-1111",servico:"Esmaltação Simples",data:"2025-01-21",hr:"11:00",status:"confirmado"},
  {id:5,cliente:"Eduarda Costa",tel:"(11) 92222-3333",servico:"Pedicure Spa",data:"2025-01-22",hr:"15:00",status:"cancelado"},
];
const MOCK_CLI = [
  {id:1,nome:"Ana Paula Souza",tel:"(11) 98765-4321",email:"ana@email.com",visitas:12,ultima:"2025-01-20"},
  {id:2,nome:"Beatriz Lima",tel:"(11) 91234-5678",email:"beatriz@email.com",visitas:8,ultima:"2025-01-20"},
  {id:3,nome:"Camila Santos",tel:"(11) 97777-8888",email:"camila@email.com",visitas:3,ultima:"2025-01-19"},
  {id:4,nome:"Daniela Rocha",tel:"(11) 99999-1111",email:"daniela@email.com",visitas:22,ultima:"2025-01-18"},
];

function Admin({ setPage }) {
  const [tab, setTab] = useState("dash");
  const [reservas, setReservas] = useState(MOCK_RESERVAS);
  const [auth, setAuth] = useState(false);
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  const login = () => { if(pw==="admin123"){setAuth(true)}else{setErr(true);setTimeout(()=>setErr(false),2000)} };
  const cancel = id => setReservas(p=>p.map(r=>r.id===id?{...r,status:"cancelado"}:r));
  const confirm = id => setReservas(p=>p.map(r=>r.id===id?{...r,status:"confirmado"}:r));
  const stats = { total:reservas.length, conf:reservas.filter(r=>r.status==="confirmado").length, pend:reservas.filter(r=>r.status==="pendente").length };

  if(!auth) return (
    <div className="login-wrap">
      <div className="login-box">
        <div style={{fontSize:"2.2rem",marginBottom:12}}>🔐</div>
        <h2>Painel Admin</h2>
        <p>Área restrita — Bella Unhas Studio<br/><small style={{color:"var(--rose)"}}>Senha demo: admin123</small></p>
        <div className="fg" style={{textAlign:"left",marginBottom:16}}>
          <label>Senha de acesso</label>
          <input type="password" placeholder="Digite a senha…" value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&login()} style={{borderColor:err?"var(--rose)":undefined}}/>
          {err && <p style={{color:"var(--rose)",fontSize:".75rem",marginTop:4}}>Senha incorreta.</p>}
        </div>
        <button className="btn btn-p" style={{width:"100%",justifyContent:"center"}} onClick={login}>Entrar</button>
      </div>
    </div>
  );
  return (
    <div className="admin-bg" style={{paddingTop:0}}>
      <div className="adm-hdr">
        <div><h1>✦ Painel Administrativo</h1><p style={{fontSize:".78rem",opacity:.5,marginTop:3}}>Bella Unhas Studio — Bem-vinda!</p></div>
        <button className="btn" style={{color:"rgba(255,255,255,.6)",border:"1.5px solid rgba(255,255,255,.2)",padding:"8px 18px"}} onClick={()=>setAuth(false)}>Sair</button>
      </div>
      <div className="adm-tabs">
        {[["dash","📊 Dashboard"],["res","📅 Reservas"],["cli","👥 Clientes"],["srv","💅 Serviços"]].map(([id,l])=>(
          <button key={id} className={`adm-tab ${tab===id?"act":""}`} onClick={()=>setTab(id)}>{l}</button>
        ))}
      </div>
      <div className="adm-body">
        {tab==="dash" && (
          <>
            <div className="astats">
              <div className="astat"><div className="n">{stats.total}</div><div className="l">Total Reservas</div></div>
              <div className="astat" style={{borderColor:"var(--gold)"}}><div className="n" style={{color:"var(--gold)"}}>{stats.conf}</div><div className="l">Confirmadas</div></div>
              <div className="astat" style={{borderColor:"#f59e0b"}}><div className="n" style={{color:"#f59e0b"}}>{stats.pend}</div><div className="l">Pendentes</div></div>
              <div className="astat" style={{borderColor:"#10b981"}}><div className="n" style={{color:"#10b981"}}>R$ 17.835</div><div className="l">Receita Total</div></div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
              <div style={{background:"var(--white)",borderRadius:"var(--r)",padding:20,boxShadow:"0 2px 12px rgba(42,31,28,.06)"}}>
                <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"1rem",marginBottom:12}}>Próximas reservas</h3>
                {reservas.filter(r=>r.status!=="cancelado").slice(0,4).map(r=>(
                  <div key={r.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:"1px solid var(--nude)",fontSize:".8rem"}}>
                    <div><strong>{r.cliente}</strong><div style={{color:"var(--ink-lt)",fontSize:".75rem"}}>{r.data} às {r.hr}</div></div>
                    <span className={`sbadge2 s-${r.status.slice(0,4)}`}>{r.status}</span>
                  </div>
                ))}
              </div>
              <div style={{background:"var(--white)",borderRadius:"var(--r)",padding:20,boxShadow:"0 2px 12px rgba(42,31,28,.06)"}}>
                <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"1rem",marginBottom:14}}>Serviços populares</h3>
                {[["Gel UV",48],["Nail Art",32],["Spa de Mãos",28],["Esmaltação",65],["Pedicure",41]].map(([n,v],i)=>(
                  <div key={i} style={{marginBottom:10}}>
                    <div style={{display:"flex",justifyContent:"space-between",fontSize:".77rem",marginBottom:3}}>
                      <span style={{fontWeight:500}}>{n}</span><span style={{color:"var(--rose)"}}>{v}x</span>
                    </div>
                    <div style={{background:"var(--nude)",borderRadius:4,height:5}}>
                      <div style={{background:"linear-gradient(90deg,var(--rose),var(--gold))",height:"100%",borderRadius:4,width:`${(v/65)*100}%`}}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        {tab==="res" && (
          <div style={{overflowX:"auto"}}>
            <table className="atable">
              <thead><tr><th>#</th><th>Cliente</th><th>Telefone</th><th>Serviço</th><th>Data</th><th>Hr</th><th>Status</th><th>Ações</th></tr></thead>
              <tbody>
                {reservas.map(r=>(
                  <tr key={r.id}>
                    <td>{r.id}</td><td><strong>{r.cliente}</strong></td><td>{r.tel}</td><td>{r.servico}</td><td>{r.data}</td><td>{r.hr}</td>
                    <td><span className={`sbadge2 s-${r.status.slice(0,4)}`}>{r.status}</span></td>
                    <td>
                      <div style={{display:"flex",gap:5}}>
                        {r.status==="pendente"&&<button onClick={()=>confirm(r.id)} style={{background:"#f0fdf4",color:"#166534",border:"1px solid #bbf7d0",borderRadius:5,padding:"3px 9px",fontSize:".72rem",cursor:"pointer"}}>✓ Confirmar</button>}
                        {r.status!=="cancelado"&&<button onClick={()=>cancel(r.id)} style={{background:"#fff1f2",color:"#9f1239",border:"1px solid #fecdd3",borderRadius:5,padding:"3px 9px",fontSize:".72rem",cursor:"pointer"}}>✕ Cancelar</button>}
                        <a href={`https://wa.me/55${r.tel.replace(/\D/g,"")}`} target="_blank" rel="noopener noreferrer" style={{background:"#f0fdf4",color:"#15803d",border:"1px solid #bbf7d0",borderRadius:5,padding:"3px 9px",fontSize:".72rem",display:"inline-block"}}>💬</a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {tab==="cli" && (
          <div style={{overflowX:"auto"}}>
            <table className="atable">
              <thead><tr><th>#</th><th>Nome</th><th>Telefone</th><th>E-mail</th><th>Visitas</th><th>Última visita</th><th>Contato</th></tr></thead>
              <tbody>
                {MOCK_CLI.map(c=>(
                  <tr key={c.id}>
                    <td>{c.id}</td><td><strong>{c.nome}</strong></td><td>{c.tel}</td><td>{c.email}</td>
                    <td><span style={{background:"var(--blush)",color:"var(--rose)",padding:"2px 9px",borderRadius:99,fontSize:".75rem",fontWeight:600}}>{c.visitas}x</span></td>
                    <td>{c.ultima}</td>
                    <td><a href={`https://wa.me/55${c.tel.replace(/\D/g,"")}`} target="_blank" rel="noopener noreferrer" style={{background:"#dcfce7",color:"#15803d",border:"1px solid #bbf7d0",borderRadius:5,padding:"5px 11px",fontSize:".75rem",display:"inline-block"}}>💬 WhatsApp</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {tab==="srv" && (
          <div style={{overflowX:"auto"}}>
            <table className="atable">
              <thead><tr><th>Serviço</th><th>Preço</th><th>Duração</th><th>Agendamentos</th><th>Receita</th></tr></thead>
              <tbody>
                {SERVICES.map(s=>(
                  <tr key={s.id}>
                    <td><strong>{s.name}</strong></td><td>{s.price}</td><td>{s.dur}</td>
                    <td>{Math.floor(Math.random()*50+5)}</td>
                    <td style={{color:"#166534",fontWeight:500}}>R$ {(parseInt(s.price.replace(/\D/g,""))*Math.floor(Math.random()*30+5)).toLocaleString("pt-BR")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function Footer({ setPage }) {
  const nav = [{id:"home",l:"Início"},{id:"services",l:"Serviços"},{id:"schedule",l:"Agendar"},{id:"contact",l:"Contato"}];
  return (
    <footer className="foot">
      <div className="foot-in">
        <div><div className="brand"><span className="brand-star">✦</span> Bella Unhas</div><p style={{marginTop:10,fontSize:".83rem",lineHeight:1.8}}>Arte nas pontas dos dedos.<br/>Beleza com qualidade e carinho.</p></div>
        <div><h4>Navegação</h4><div className="foot-links">{nav.map(n=><button key={n.id} onClick={()=>setPage(n.id)}>{n.l}</button>)}</div></div>
        <div><h4>Contato</h4><div className="foot-contact"><p>📍 Rua das Flores, 123</p><p>📞 (11) 99999-8888</p><p>✉️ contato@bellaunhas.com.br</p><p>⏰ Seg–Sáb: 09h às 19h</p></div></div>
        <div><h4>Redes Sociais</h4><div className="foot-social"><a href="#">📸 Instagram</a><a href="https://wa.me/5511999998888" target="_blank" rel="noopener noreferrer">💬 WhatsApp</a><a href="#">👍 Facebook</a></div></div>
      </div>
      <div className="foot-bot">
        <p>© 2025 Bella Unhas Studio</p>
        <button className="al" onClick={()=>setPage("admin")}>Área Admin</button>
      </div>
    </footer>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  return (
    <div className="wrap">
      <style>{STYLE}</style>
      <Header setPage={setPage} page={page} />
      <main style={{flex:1}}>
        {page==="home" && <Home setPage={setPage}/>}
        {page==="services" && <Services setPage={setPage}/>}
        {page==="schedule" && <Schedule/>}
        {page==="contact" && <Contact/>}
        {page==="admin" && <Admin setPage={setPage}/>}
      </main>
      {page!=="admin" && <Footer setPage={setPage}/>}
      <a href="https://wa.me/5511999998888?text=Olá! Gostaria de agendar." className="wf" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">💬</a>
    </div>
  );
}
