// SKY BAZAAR - Saving Popup + Sound System
let _savingBox = null;

function playSound(type){
  try{
    // Web Audio se sound - koi file download nahi karni
    let ctx = new (window.AudioContext || window.webkitAudioContext)();
    if(type=='start'){
      // Saving shuru - 1 lambi Ting
      let o = ctx.createOscillator(); let g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.type='sine'; o.frequency.value=880;
      g.gain.setValueAtTime(0.3, ctx.currentTime);
      o.start(); o.stop(ctx.currentTime+0.4);
    } else {
      // Ho gaya - 2 choti Ting-Ting
      [523, 784].forEach((f,i)=>{
        let o = ctx.createOscillator(); let g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.type='sine'; o.frequency.value=f;
        let t = ctx.currentTime + i*0.18;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.3, t+0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t+0.3);
        o.start(t); o.stop(t+0.35);
      });
    }
    // Mobile pe vibrate bhi
    if(navigator.vibrate) navigator.vibrate(type=='start' ? 100 : [80,50,80]);
  }catch(e){}
}

function showSaving(msg){
  playSound('start'); // 🔔 Saving wali awaz
  if(_savingBox) _savingBox.remove();
  _savingBox = document.createElement('div');
  _savingBox.id = 'skySavingBox';
  _savingBox.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.6);z-index:99999;display:flex;align-items:center;justify-content:center;';
  _savingBox.innerHTML = '<div style="background:#fff;padding:24px 20px;border-radius:18px;text-align:center;max-width:300px;width:90%;box-shadow:0 10px 30px rgba(0,0,0,0.3)"><div style="font-size:44px">⏳</div><div style="font-size:16px;font-weight:700;margin:10px 0 4px">Zara Rukiye...</div><div style="font-size:13px;color:#666">'+(msg||'Save Ho Raha Hai...')+'</div><div style="margin-top:12px"><span style="display:inline-block;width:30px;height:30px;border:3px solid #eee;border-top:3px solid #0a7a42;border-radius:50%;animation:skySpin 0.8s linear infinite"></span></div><style>@keyframes skySpin{to{transform:rotate(360deg)}}</style></div>';
  document.body.appendChild(_savingBox);
}

function hideSaving(msg){
  playSound('done'); // ✅✅ Ho gaya wali awaz
  if(_savingBox) _savingBox.remove();
  _savingBox = document.createElement('div');
  _savingBox.id = 'skySavingBox';
  _savingBox.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.6);z-index:99999;display:flex;align-items:center;justify-content:center;';
  _savingBox.innerHTML = '<div style="background:#fff;padding:24px 20px;border-radius:18px;text-align:center;max-width:300px;width:90%;box-shadow:0 10px 30px rgba(0,0,0,0.3)"><div style="font-size:44px">✅</div><div style="font-size:16px;font-weight:700;margin:10px 0 4px">Ho Gaya!</div><div style="font-size:13px;color:#666">'+(msg||'Save Ho Gaya!')+'</div></div>';
  document.body.appendChild(_savingBox);
  setTimeout(()=>{ if(_savingBox){ _savingBox.remove(); _savingBox=null; } }, 1800);
}