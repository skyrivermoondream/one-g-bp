(() => {
 const slide=document.querySelector('#slide-9.commerce-entry');
 if(!slide)return;
 const website='https://one-g-modules-demo.pale-finch-0947.chatgpt.site';
 const items=[
  {src:'assets/one-g-commerce-demo-catalog.png',title:['ONE-G 官网 · 示例','ONE-G Website · Demo'],caption:['产品目录与模块选配示例','Product catalog and module configuration demo'],href:website,kind:'website'},
  {src:'assets/one-g-commerce-demo-scenario.png',title:['ONE-G 官网 · 场景选配示例','ONE-G Website · Use-case Demo'],caption:['按应用场景组合模块，整理项目需求','Combine modules by use case and define project requirements'],href:website+'#solutions',kind:'website'}
 ];
 const icons={zoom:document.querySelector('#fullscreen-btn svg'),external:document.querySelector('#slide-4 .fa-reference-caption svg'),play:document.querySelector('.video-start svg')};
 slide.querySelectorAll('[data-entry-icon]').forEach(slot=>{const icon=icons[slot.dataset.entryIcon];if(icon)slot.append(icon.cloneNode(true));});
 const buttons=[...slide.querySelectorAll('[data-entry-preview]')];
 buttons.forEach(button=>button.addEventListener('click',()=>document.dispatchEvent(new CustomEvent('oneg:image-preview',{detail:{opener:button,index:Number(button.dataset.entryPreview),items}}))));
 const inlineVideo=slide.querySelector('#entry-platform-video'),videoButton=slide.querySelector('[data-entry-video]');
 const dialog=document.createElement('dialog');
 dialog.id='entry-video-dialog';dialog.setAttribute('aria-labelledby','entry-video-title');
 dialog.innerHTML=`<header class="entry-video-head"><h2 id="entry-video-title"></h2><button type="button" class="icon-button" data-entry-close>${document.querySelector('#overview .close-dialog svg').outerHTML}</button></header><video controls muted playsinline preload="none"></video>`;
 document.body.append(dialog);
 const video=dialog.querySelector('video'),close=dialog.querySelector('[data-entry-close]');
 video.poster=inlineVideo.poster;
 let resumeInline=false,resumeModal=false,seekTime=0;
 const isActive=()=>slide.classList.contains('is-active')&&!document.hidden;
 function playModal(){
  if(!dialog.open||!isActive())return;
  video.play().then(()=>{if(!dialog.open||!isActive())video.pause();}).catch(()=>{});
 }
 videoButton.addEventListener('click',()=>{
  if(dialog.open)return;
  resumeInline=!inlineVideo.paused;seekTime=inlineVideo.currentTime;inlineVideo.pause();
  video.muted=true;video.src=inlineVideo.dataset.src;video.load();
  videoButton.setAttribute('aria-expanded','true');dialog.showModal();close.focus({preventScroll:true});
  playModal();
 });
 video.addEventListener('loadedmetadata',()=>{if(dialog.open&&Number.isFinite(seekTime))video.currentTime=seekTime;});
 close.addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',event=>{
  if(event.target!==dialog)return;
  const r=dialog.getBoundingClientRect();
  if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();
 });
 dialog.addEventListener('close',()=>{
  if(dialog.open)return;
  const time=video.currentTime;
  video.pause();video.removeAttribute('src');video.load();resumeModal=false;
  if(inlineVideo.readyState>0&&Number.isFinite(time))inlineVideo.currentTime=time;
  videoButton.setAttribute('aria-expanded','false');
  if(isActive()){
   videoButton.focus({preventScroll:true});
   if(resumeInline)inlineVideo.play().then(()=>{if(!isActive()||dialog.open)inlineVideo.pause();}).catch(()=>{});
  }
  resumeInline=false;
 });
 // Keep the deck's navigation shortcuts from changing slides behind the video.
 document.addEventListener('keydown',event=>{if(dialog.open)event.stopImmediatePropagation();},true);
 document.addEventListener('visibilitychange',()=>{
  if(!dialog.open)return;
  if(document.hidden){resumeModal=!video.paused;video.pause();}
  else if(resumeModal){resumeModal=false;playModal();}
 });
 new MutationObserver(()=>{if(dialog.open&&!slide.classList.contains('is-active'))dialog.close();}).observe(slide,{attributes:true,attributeFilter:['class']});
 function refresh(){
  const en=document.documentElement.lang==='en';
  const number=slide.dataset.pageNumber;
  slide.setAttribute('aria-label',en?`Slide ${number}: Commerce Website & Developer Platform`:`第 ${number} 页：商业官网与开发平台`);
  buttons.forEach(button=>{
   const index=Number(button.dataset.entryPreview),title=items[index].title[en?1:0];
   const label=en?`Enlarge ${title}`:`放大查看${title}`;
   button.title=label;button.setAttribute('aria-label',label);
   const image=button.querySelector('img');if(image)image.alt=items[index].caption[en?1:0];
  });
  const title=en?'RoboDock Developer Platform Demo':'RoboDock 开发平台演示';
  dialog.querySelector('h2').textContent=title;
  [inlineVideo,video].forEach(player=>player.setAttribute('aria-label',title));
  const labels=[[videoButton,en?'Enlarge RoboDock demo':'放大观看 RoboDock 演示'],[close,en?'Close video':'关闭视频'],[slide.querySelector('.video-start'),en?'Play RoboDock demo':'播放 RoboDock 演示']];
  labels.forEach(([element,label])=>{element.title=label;element.setAttribute('aria-label',label);});
 }
 new MutationObserver(refresh).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 refresh();
})();
