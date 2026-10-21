/* ===== EDIT YOUR BUSINESS DETAILS HERE ===== */
const BRAND={name:'Tiny Thread',currency:'₦',ship:2500,whatsapp:''}; // whatsapp e.g. '2348012345678' (adds a chat button)
const CATS={baby:['Baby','0–12 months','#E8D59A'],girls:['Girls','2–9 years','#D9A3A8'],boys:['Boys','2–9 years','#A9B8D6'],sleepwear:['Sleepwear','All ages','#A9C5B4']};
const COL=['#E8D59A','#D9A3A8','#A9C5B4','#A9B8D6']; // colour swatches shown on every product
/* ===== EDIT YOUR PRODUCTS HERE (n=name c=category t=shape p=price d=description) ===== */
const P=[
{id:1,n:'Cloud Cotton Romper',c:'baby',t:'tee',p:7500,d:'Soft organic cotton, snap buttons.'},
{id:2,n:'Little Bear Hoodie',c:'baby',t:'hoodie',p:9800,d:'Warm, light and easy to layer.'},
{id:3,n:'Blossom Twirl Dress',c:'girls',t:'dress',p:12500,d:'Flowy cotton that moves with her.'},
{id:4,n:'Sunday Pinafore',c:'girls',t:'dress',p:11000,d:'School to parties, effortlessly.'},
{id:5,n:'Everyday Tee Set',c:'girls',t:'tee',p:8900,d:'Two breathable tees, pre-washed.'},
{id:6,n:'Explorer Shorts',c:'boys',t:'shorts',p:8200,d:'Stretch waist, deep pockets.'},
{id:7,n:'Weekend Pullover',c:'boys',t:'hoodie',p:13500,d:'Brushed inside, built for play.'},
{id:8,n:'Classic Polo',c:'boys',t:'tee',p:9200,d:'Smart enough for Sunday best.'},
{id:9,n:'Dreamy Pyjama Set',c:'sleepwear',t:'tee',p:10500,d:'Ultra-soft top and bottoms.'},
{id:10,n:'Moonlight Nightgown',c:'sleepwear',t:'dress',p:9500,d:'Light, loose and cosy.'}];
P.forEach(p=>p.k=CATS[p.c][2]);
const SH={tee:'M30 18 42 14Q50 22 58 14L70 18 88 34 78 44 70 38V84H30V38L22 44 12 34Z',dress:'M38 14H62L60 34 72 86H28L40 34Z',hoodie:'M28 22 40 16Q50 28 60 16L72 22 90 62 78 68 72 52V86H28V52L22 68 10 62Z',shorts:'M26 24H74L80 78H56L50 50 44 78H20Z'};
const AGES=c=>c=='baby'?['0–3m','3–6m','6–12m']:['2–3y','4–5y','6–7y','8–9y'];
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const money=n=>BRAND.currency+n.toLocaleString('en-NG');
const get=()=>{try{return JSON.parse(localStorage.getItem('tt_cart'))||[]}catch(e){return window._c||[]}};
const set=c=>{window._c=c;try{localStorage.setItem('tt_cart',JSON.stringify(c))}catch(e){}count()};
const count=()=>{const e=$('#cc');if(e)e.textContent=get().reduce((a,i)=>a+i.q,0)};
const art=(p,k)=>{k=k||p.k;return`<div class="art" style="background:${k}40"><svg viewBox="0 0 100 100" aria-hidden="true"><path d="${SH[p.t]}" fill="${k}" stroke="#2B2A4C" stroke-opacity=".3" stroke-width="1.5" stroke-linejoin="round"/>${p.t=='hoodie'?'<ellipse cx="50" cy="20" rx="11" ry="7" fill="none" stroke="#2B2A4C" stroke-opacity=".3" stroke-width="1.5"/>':''}</svg></div>`};
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(toast.h);toast.h=setTimeout(()=>t.classList.remove('show'),2000)}
function sw(b,id){const c=b.closest('.card');$$('.sw',c).forEach(x=>x.classList.remove('on'));b.classList.add('on');$('.art',c).outerHTML=art(P.find(p=>p.id==id),b.dataset.k)}
function add(id,btn){const c=btn.closest('.card'),a=$('select',c).value,k=$('.sw.on',c).dataset.k,l=get(),i=l.find(x=>x.id==id&&x.a==a&&x.k==k);i?i.q++:l.push({id,a,k,q:1});set(l);toast('Added to cart ✓')}
const card=p=>`<article class="card glass">${art(p)}<h3>${p.n}</h3><p>${p.d}</p><div class="sws">${COL.map(k=>`<button class="sw${k==p.k?' on':''}" data-k="${k}" style="background:${k}" aria-label="Colour" onclick="sw(this,${p.id})"></button>`).join('')}</div><div class="price">${money(p.p)}</div><div class="buy"><select aria-label="Size">${AGES(p.c).map(a=>`<option>${a}</option>`).join('')}</select><button class="btn" onclick="add(${p.id},this)">Add</button></div></article>`;
const MARK='<svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="15" fill="#2B2A4C"/><path d="M9 21c4-10 10-10 14 0M12 16.5h8" stroke="#E8D59A" stroke-width="2.2" fill="none" stroke-linecap="round"/></svg>';
function layout(){
document.title=document.title.replace('Tiny Thread',BRAND.name);
document.body.insertAdjacentHTML('afterbegin',`<header class="glass nav" id="nav"><a class="logo" href="index.html">${MARK}${BRAND.name}</a><div class="right"><a class="cartl" href="cart.html">Cart<b id="cc">0</b></a><button id="burger" aria-label="Open menu" aria-expanded="false">☰</button></div><nav><a href="index.html">Home</a><div class="dd"><button class="ddb" aria-haspopup="true">Categories ▾</button><div class="ddm glass">${Object.entries(CATS).map(([k,v])=>`<a href="products.html?cat=${k}">${v[0]}</a>`).join('')}<a href="products.html">All products</a></div></div><a href="products.html">Products</a><a href="about.html">About</a></nav></header><div id="toast" class="glass" role="status"></div>`);
document.body.insertAdjacentHTML('beforeend',`<footer class="glass"><div><b class="logo">${BRAND.name}</b>Thoughtful clothes for little people.</div><div>Delivery across Nigeria · Easy 7-day exchanges<br>© ${new Date().getFullYear()} ${BRAND.name}</div></footer>${BRAND.whatsapp?`<a class="wa neo" href="https://wa.me/${BRAND.whatsapp}" target="_blank" rel="noopener">Chat with us</a>`:''}`);
$('#burger').onclick=e=>{const o=$('#nav').classList.toggle('open');e.target.setAttribute('aria-expanded',o)};
$('.ddb').onclick=()=>$('.dd').classList.toggle('open');
document.addEventListener('click',e=>{if(!e.target.closest('.dd'))$('.dd').classList.remove('open')});
count()}
function home(){
$('#cats').innerHTML=Object.entries(CATS).map(([k,v])=>`<a class="cat glass" href="products.html?cat=${k}" style="background:${v[2]}66"><h3>${v[0]}</h3><span>${v[1]}</span></a>`).join('');
$('#feat').innerHTML=[3,6,1,9].map(i=>card(P.find(p=>p.id==i))).join('');
$('#stack').innerHTML=[3,6,2].map(i=>`<div class="glass">${art(P.find(p=>p.id==i))}</div>`).join('')}
function shop(){
const q=new URLSearchParams(location.search).get('cat')||'all';
const draw=c=>{$$('.chip').forEach(b=>b.classList.toggle('on',b.dataset.c==c));$('#list').innerHTML=P.filter(p=>c=='all'||p.c==c).map(card).join('');$('#ttl').textContent=c=='all'?'All products':CATS[c][0]};
$('#chips').innerHTML=['all',...Object.keys(CATS)].map(k=>`<button class="chip" data-c="${k}">${k=='all'?'All':CATS[k][0]}</button>`).join('');
$$('.chip').forEach(b=>b.onclick=()=>draw(b.dataset.c));draw(CATS[q]?q:'all')}
const total=()=>get().reduce((a,i)=>a+P.find(p=>p.id==i.id).p*i.q,0);
const sumHtml=()=>`<div class="sum"><span>Subtotal</span><span>${money(total())}</span></div><div class="sum"><span>Delivery</span><span>${money(BRAND.ship)}</span></div><div class="sum t"><span>Total</span><span>${money(total()+BRAND.ship)}</span></div>`;
function cart(){
const c=get();
if(!c.length){$('#cartwrap').innerHTML='<div class="empty glass panel" style="grid-column:1/-1"><h2>Your cart is empty</h2><p>Find something soft and lovely for your little one.</p><a class="btn" href="products.html">Start shopping</a></div>';return}
$('#items').innerHTML=c.map((i,x)=>{const p=P.find(p=>p.id==i.id);return`<div class="line">${art(p,i.k)}<div><b>${p.n}</b><br><small>Size ${i.a} <span class="dot" style="background:${i.k}"></span> ${money(p.p)}</small><div class="qty"><button aria-label="Less" onclick="chg(${x},-1)">−</button>${i.q}<button aria-label="More" onclick="chg(${x},1)">+</button><button class="rm" onclick="chg(${x},-99)">Remove</button></div></div><b>${money(p.p*i.q)}</b></div>`}).join('');
$('#sum').innerHTML=sumHtml()}
function chg(x,d){const c=get();c[x].q+=d;if(c[x].q<1)c.splice(x,1);set(c);cart()}
function checkout(){
const c=get();if(!c.length){$('#cowrap').innerHTML='<div class="empty glass panel" style="grid-column:1/-1"><h2>Nothing to check out yet</h2><p>Add a few pieces first.</p><a class="btn" href="products.html">Browse products</a></div>';return}
$('#mini').innerHTML=c.map(i=>{const p=P.find(p=>p.id==i.id);return`<div class="sum"><span>${p.n} (${i.a}) × ${i.q}</span><span>${money(p.p*i.q)}</span></div>`}).join('')+sumHtml();
$('#form').onsubmit=e=>{e.preventDefault();const ref='TT'+Math.floor(100000+Math.random()*900000);set([]);$('#cowrap').innerHTML=`<div class="empty glass panel" style="grid-column:1/-1"><h2>Thank you, ${$('#nm').value.split(' ')[0]}!</h2><p>Order <b>${ref}</b> is confirmed. We will call you on ${$('#ph').value} to arrange delivery.</p><a class="btn" href="index.html">Back to home</a></div>`;scrollTo(0,0)}}
layout();const pg=document.body.dataset.page;({home,shop,cart,checkout}[pg]||(()=>{}))();
