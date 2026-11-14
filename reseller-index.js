document.addEventListener('DOMContentLoaded', ()=>{
  let f = document.getElementById('resellerForm');
  if(!f){ alert('❌ Form nahi mila - resellerForm ID ka masla hai'); return; }
  alert('✅ reseller-index.js load ho gaya - ab form bharo');
  f.addEventListener('submit', async (e)=>{
    e.preventDefault();
    alert('✅ Button daba diya - ab save kar raha hoon...');
    let d = Object.fromEntries(new FormData(f).entries());
    alert('Data mila: ' + d.fullName + ' | ' + d.whatsapp + ' | ' + d.city);
    let data = {
      name: d.fullName, fullName: d.fullName,
      whatsapp: d.whatsapp, phone: d.whatsapp,
      email: d.email, city: d.city, address: d.address,
      accountNumber: d.accountNumber, paymentNumber: d.accountNumber,
      status: 'Pending', type: 'reseller',
      createdAt: Date.now(), date: new Date().toLocaleString()
    };
    try{
      if(typeof db === 'undefined'){ alert('❌ db nahi mila - firebase-config.js ka masla hai'); return; }
      await db.collection('sky_resellers').add(data);
      alert('✅ sky_resellers me SAVE HO GAYA!');
      await db.collection('resellers').add(data);
      alert('✅ resellers me bhi SAVE HO GAYA! Ab Admin me check karo');
      f.reset();
    }catch(err){ alert('❌ SAVE FAIL: ' + err.message); console.log(err); }
  });
});