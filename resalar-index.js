// Index wala Reseller Form - Poora data Admin ko jayega
document.addEventListener('DOMContentLoaded', ()=>{
  let f = document.getElementById('resellerForm');
  if(!f) return;
  f.addEventListener('submit', async (e)=>{
    e.preventDefault();
    let d = Object.fromEntries(new FormData(f).entries());
    let btn = document.getElementById('joinBtn');
    if(btn){ btn.disabled=true; btn.innerText='⏳ Save Ho Raha Hai...'; }
    let data = {
      name: d.fullName, fullName: d.fullName, resellerName: d.fullName,
      whatsapp: d.whatsapp, phone: d.whatsapp, number: d.whatsapp,
      email: d.email, Email: d.email,
      city: d.city, City: d.city,
      address: d.address, Address: d.address,
      accountNumber: d.accountNumber, paymentNumber: d.accountNumber, jazzcash: d.accountNumber, easypaisa: d.accountNumber,
      status: 'Pending', type: 'reseller',
      createdAt: Date.now(), date: new Date().toLocaleString()
    };
    try{
      await db.collection('sky_resellers').add(data);
      await db.collection('resellers').add(data);
      document.getElementById('msg').innerText = '✅ Ho Gaya '+d.fullName+'! Admin ko poora data mil gaya.';
      alert('✅ Mubarak Ho '+d.fullName+'!\nTumhara poora form Admin ko mil gaya hai.\nNaam, Email, City, Address, Account Number - sab.');
      f.reset();
    }catch(err){ console.log(err); document.getElementById('msg').innerText='❌ Save nahi hua, dobara try karo'; }
    if(btn){ btn.disabled=false; btn.innerText='Apply Now - FREE'; }
  });
});