// supplier.js - SKY BAZAAR Supplier Logic
let selectedFile=null;
function goStep(n){
  for(let i=1;i<=3;i++){ let el=document.getElementById('step'+i); if(el){ el.style.display='none'; el.classList.add('hidden'); } }
  let show=document.getElementById('step'+n); if(show){ show.style.display='block'; show.classList.remove('hidden'); }
  const t={1:["Step 1: Contact Information","Apni basic details batayein","13%"],2:["Step 2: Supplier Details","Tell us about your business and product categories","38%"],3:["Step 3: Business Verification","Upload your documents to complete the verification process","63%"]};
  document.getElementById('stepTitle').innerText=t[n][0]; document.getElementById('stepSub').innerText=t[n][1];
  document.getElementById('progText').innerText=t[n][2]+" complete"; document.getElementById('progFill').style.width=t[n][2]; document.getElementById('progFill').innerText=t[n][2];
  document.getElementById('c2').className='circle '+(n>=2?'done':''); document.getElementById('c3').className='circle '+(n>=3?'done':'');
  if(n>=2) document.getElementById('c2').innerText='✓'; if(n>=3) document.getElementById('c3').innerText='✓';
  if(n==3){ let f=document.getElementById('supplierForm'); let fd=new FormData(f); document.getElementById('summaryBox').innerHTML='<b>Check Karo:</b><br>🏪 Shop: '+(fd.get('shopName')||'')+'<br>👤 Naam: '+(fd.get('ownerName')||'')+'<br>📱 WhatsApp: '+(fd.get('whatsapp')||'')+'<br>📍 City: '+(fd.get('city')||'')+'<br>📦 Product: '+(fd.get('productName')||'')+'<br>💰 Rate: Rs. '+(fd.get('supplierPrice')||'')+' (Milega Rs. '+((Number(fd.get('supplierPrice')||0))-100)+')<br>📂 Category: '+(fd.get('category')||''); }
  window.scrollTo(0,0);
}
function checkOtherCat(){ let v=document.getElementById('catSelect').value; document.getElementById('otherCat').style.display=(v=='Other')?'block':'none'; }
function previewPic(input){ let file=input.files[0]; if(!file) return; selectedFile=file; let r=new FileReader(); r.onload=function(e){ let img=document.getElementById('picPreview'); img.src=e.target.result; img.style.display='block'; document.getElementById('picStatus').innerText='✅ Pic select ho gayi'; document.getElementById('imageLink').value=''; }; r.readAsDataURL(file); }
function canvasToBlob(c,q){ return new Promise(res=>c.toBlob(b=>res(b),'image/jpeg',q)); }
async function compressImage(file){
  if(file.size <= 80*1024) return file;
  let dataUrl=await new Promise((res,rej)=>{ let r=new FileReader(); r.onload=e=>res(e.target.result); r.onerror=rej; r.readAsDataURL(file); });
  let img=await new Promise((res,rej)=>{ let im=new Image(); im.onload=()=>res(im); im.onerror=rej; im.src=dataUrl; });
  let w=img.width,h=img.height; if(w>800||h>800){ let s=Math.min(800/w,800/h); w=Math.round(w*s); h=Math.round(h*s); }
  let canvas=document.createElement('canvas'); canvas.width=w; canvas.height=h; canvas.getContext('2d').drawImage(img,0,0,w,h);
  let blob=null; for(let q of [0.85,0.7,0.55,0.4,0.3,0.2]){ blob=await canvasToBlob(canvas,q); if(blob.size<=80*1024) break; }
  return blob;
}
function calcSupplier(){ let rate=Number(document.getElementById('rateInput').value||0); if(!rate){document.getElementById('calcBox').innerText='Tumhara rate likho, hisaab aa jayega...';return;} document.getElementById('calcBox').innerHTML='Tumhara Rate: <b>Rs. '+rate+'</b><br>Sky Fee: <b>- Rs. 100</b><br><b style="color:green">Tumhe Milega: Rs. '+(rate-100)+' per order</b>'; }
function cleanWa(v){ return (v||'').toString().replace(/[^0-9]/g,''); }
function waMatch(a,b){ a=cleanWa(a); b=cleanWa(b); if(!a||!b) return false; return a==b || a.endsWith(b.slice(-10)) || b.endsWith(a.slice(-10)); }
async function show(){ try{ let snap=await db.collection('sky_products').orderBy('createdAt','desc').limit(50).get(); let list=[]; snap.forEach(d=>{let p=d.data(); list.push(p);}); let myShop=localStorage.getItem('sky_supplier_shop')||''; let myWa=localStorage.getItem('sky_supplier_wa')||''; if(myShop){ list=list.filter(p=>{ return ((p.supplier||p.shop||'').toLowerCase().trim()==myShop.toLowerCase().trim()) && (!myWa || waMatch(p.whatsapp||p.phone||'',myWa)); }); } else list=[]; document.getElementById('myProducts').innerHTML=list.map(p=>'<p style="border-bottom:1px solid #eee;padding:8px 0"><b>'+p.name+'</b> - Rs. '+(p.price||p.supplierPrice)+' | '+(p.category||'')+' | <b>'+(p.status||'Pending')+'</b></p>').join('')||'Abhi koi product nahi bheja.'; }catch(e){ document.getElementById('myProducts').innerText='Load nahi hua'; } }

window.addEventListener('load', ()=>{
  let s=localStorage.getItem('sky_supplier_shop'), w=localStorage.getItem('sky_supplier_wa'), o=localStorage.getItem('sky_supplier_owner'), c=localStorage.getItem('sky_supplier_city');
  if(s) document.getElementById('shopNameInput').value=s;
  if(w) document.getElementById('waInput').value=w;
  if(o) document.getElementById('ownerNameInput').value=o;
  if(c) document.getElementById('cityInput').value=c;
  if(s && w){ document.getElementById('welcomeBox').style.display='block'; document.getElementById('welcomeBox').innerHTML='👋 <b>Welcome back, '+s+'!</b> Sirf Product add karo.'; goStep(2); }
  document.getElementById('btnToStep2').addEventListener('click', ()=>{
    let shop=document.getElementById('shopNameInput').value.trim(), owner=document.getElementById('ownerNameInput').value.trim(), wa=document.getElementById('waInput').value.trim();
    if(!shop) return alert('Shop Ka Naam likho'); if(!owner) return alert('Apna Naam likho'); if(!wa) return alert('WhatsApp likho');
    localStorage.setItem('sky_supplier_shop',shop); localStorage.setItem('sky_supplier_wa',wa); localStorage.setItem('sky_supplier_owner',owner); localStorage.setItem('sky_supplier_city',document.getElementById('cityInput').value.trim());
    goStep(2);
  });
  document.getElementById('btnToStep3').addEventListener('click', ()=>{
    let pn=document.querySelector('[name="productName"]').value.trim(), rate=document.getElementById('rateInput').value.trim(), stock=document.querySelector('[name="stock"]').value.trim(), cat=document.getElementById('catSelect').value;
    if(!pn) return alert('Product Naam likho'); if(!rate) return alert('Rate likho'); if(!stock) return alert('Stock likho'); if(!cat) return alert('Category chuno');
    goStep(3);
  });
  show();
});

document.getElementById('supplierForm').addEventListener('submit', async e=>{
  e.preventDefault(); let d=Object.fromEntries(new FormData(e.target).entries()); let supplierPrice=parseInt(d.supplierPrice);
  if(!selectedFile && !d.image) return alert('Pic lagao');
  let finalCat=d.category=='Other'?(d.otherCat||'Other'):d.category;
  localStorage.setItem('sky_supplier_shop',d.shopName); localStorage.setItem('sky_supplier_wa',d.whatsapp); localStorage.setItem('sky_supplier_owner',d.ownerName||''); localStorage.setItem('sky_supplier_city',d.city||'');
  let finalImg=d.image||''; let btn=document.getElementById('submitBtn'); btn.disabled=true; btn.innerText='⏳ Upload ho raha hai...';
  if(selectedFile){ try{ let smallBlob=await compressImage(selectedFile); let fileName='sky_products/'+Date.now()+'.jpg'; let ref=firebase.storage().ref(fileName); await ref.put(smallBlob); finalImg=await ref.getDownloadURL(); }catch(err){ btn.disabled=false; btn.innerText='✅ Product Bhejo'; alert('❌ Pic Upload nahi hui! Storage Rules check karo'); return; } }
  let product={ name:d.productName, supplier:d.shopName, shop:d.shopName, shopName:d.shopName, owner:d.ownerName, whatsapp:d.whatsapp, phone:d.whatsapp, price:supplierPrice, supplierPrice:supplierPrice, stock:Number(d.stock), img:finalImg, image:finalImg, desc:d.desc, category:finalCat, city:d.city||'', cnic:d.cnic||'', ntn:d.ntn||'', status:'Pending', createdAt:Date.now(), date:new Date().toLocaleString() };
  try{ await db.collection('sky_products').add(product); await db.collection('sky_suppliers').add({ shop:d.shopName, name:d.ownerName, whatsapp:d.whatsapp, city:d.city||'', category:finalCat, createdAt:Date.now() }); }catch(err){ document.getElementById('msg').innerText='❌ Save nahi hua'; btn.disabled=false; btn.innerText='✅ Product Bhejo'; return; }
  document.getElementById('msg').innerText='✅ Added! Admin approve karega. Milega Rs. '+(supplierPrice-100);
  let sShop=d.shopName, sWa=d.whatsapp, sOwner=d.ownerName, sCity=d.city; e.target.reset();
  document.getElementById('shopNameInput').value=sShop; document.getElementById('waInput').value=sWa; document.getElementById('ownerNameInput').value=sOwner; document.getElementById('cityInput').value=sCity;
  selectedFile=null; document.getElementById('picPreview').style.display='none'; btn.disabled=false; btn.innerText='✅ Product Bhejo - Admin Approve Karega'; goStep(2); show();
});