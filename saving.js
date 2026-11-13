// SKY BAZAAR - FIXED Saving Popup - Ab har page pe chalega
let skyProgTimer = null;
function createSavingPopup(){
  if(document.getElementById('savingOverlay')) return;
  let css = document.createElement('style');
  css.innerHTML = "#savingOverlay{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.75);z-index:99999;justify-content:center;align-items:center;padding:20px;box-sizing:border-box}#savingOverlay .saveBox{background:#fff;width:100%;max-width:320px;padding:28px 20px;border-radius:20px;text-align:center;box-shadow:0 10px 40px #0008}.spinner{width:55px;height:55px;border:5px solid #ffe9a8;border-top:5px solid #f5a800;border-radius:50%;margin:0 auto 14px auto;animation:skySpin 0.8s linear infinite}@keyframes skySpin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}.saveDots:after{content:'';animation:skyDots 1s infinite}@keyframes skyDots{0%{content:''}33%{content:'.'}66%{content:'..'}100%{content:'...'}}.progressBar{width:100%;height:8px;background:#eee;border-radius:10px;overflow:hidden;margin-top:14px}.progressBar div{height:100%;width:0%;background:linear-gradient(90deg,#FFD700,#f5a800);border-radius:10px;transition:width 0.4s}";
  document.head.appendChild(css);
  let div = document.createElement('div');
  div.id = 'savingOverlay';
  div.innerHTML = '<div class="saveBox"><div class="spinner"></div><h3 style="margin:0;color:#0a1a3d">⏳ Zara Rukiye<span class="saveDots"></span></h3><p id="saveMsgBig">Save Ho Raha Hai...<br><b style="color:red">⚠️ Back Ya Refresh Mat Dabaiye</b><br><span style="font-size:12px;color:#888">Thora wait karein, 2-5 second lagenge</span></p><div class="progressBar"><div id="saveProgress"></div></div><p style="font-size:12px;color:#888;margin:8px 0 0 0" id="savePercent">0% Ho Gaya...</p></div>';
  document.body.appendChild(div);
}
if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', createSavingPopup);
} else {
  createSavingPopup();
}
function showSaving(text){
  createSavingPopup();
  let o = document.getElementById('savingOverlay');
  if(!o) return;
  if(text) document.getElementById('saveMsgBig').innerHTML = text + '<br><b style="color:red">⚠️ Back Ya Refresh Mat Dabaiye</b><br><span style="font-size:12px;color:#888">Thora wait karein, 2-5 second lagenge</span>';
  o.style.display = 'flex';
  let prog = 10;
  document.getElementById('saveProgress').style.width = '10%';
  document.getElementById('savePercent').innerText = '10% Ho Gaya...';
  clearInterval(skyProgTimer);
  skyProgTimer = setInterval(()=>{
    prog += 10; if(prog > 90) prog = 90;
    document.getElementById('saveProgress').style.width = prog + '%';
    document.getElementById('savePercent').innerText = prog + '% Ho Gaya... Zara Rukiye';
  }, 400);
}
function hideSaving(successMsg){
  clearInterval(skyProgTimer);
  let o = document.getElementById('savingOverlay');
  if(!o) return;
  if(successMsg){
    document.getElementById('saveProgress').style.width = '100%';
    document.getElementById('savePercent').innerText = '100% Ho Gaya! ✅';
    document.getElementById('saveMsgBig').innerHTML = '✅ <b style="color:green;font-size:18px">' + successMsg + '</b><br>Ab aap wapis ja sakte hain.';
    setTimeout(()=>{
      document.getElementById('savingOverlay').style.display = 'none';
      document.getElementById('saveProgress').style.width = '0%';
    }, 2000);
  } else {
    document.getElementById('savingOverlay').style.display = 'none';
    document.getElementById('saveProgress').style.width = '0%';
  }
}