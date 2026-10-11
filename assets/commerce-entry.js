(() => {
 const slide=document.querySelector('#slide-9.commerce-entry');
 if(!slide)return;
 const website='https://one-g-modules-demo.pale-finch-0947.chatgpt.site';
 const items=[
  {src:'assets/one-g-commerce-demo-catalog.png',title:['ONE-G 官网 · 示例','ONE-G Website · Demo'],caption:['产品目录与模块选配示例','Product catalog and module configuration demo'],href:website,kind:'website'},
  {src:'assets/one-g-commerce-demo-scenario.png',title:['ONE-G 官网 · 场景选配示例','ONE-G Website · Use-case Demo'],caption:['按应用场景组合模块，整理项目需求','Combine modules by use case and define project requirements'],href:website+'#solutions',kind:'website'},
  {src:'assets/developer-robodock-diagnostics.png',title:['开发平台 · 界面示例','Developer Platform · UI Example'],caption:['RoboDock 快速检查：设备通讯、主机环境与检测报告。界面数据为示例。','RoboDock diagnostics: device connections, host environment and reports. Interface data is illustrative.']}
 ];
 const icons={zoom:document.querySelector('#fullscreen-btn svg'),external:document.querySelector('#slide-4 .fa-reference-caption svg')};
 slide.querySelectorAll('[data-entry-icon]').forEach(slot=>{const icon=icons[slot.dataset.entryIcon];if(icon)slot.append(icon.cloneNode(true));});
 const buttons=[...slide.querySelectorAll('[data-entry-preview]')];
 buttons.forEach(button=>button.addEventListener('click',()=>document.dispatchEvent(new CustomEvent('oneg:image-preview',{detail:{opener:button,index:Number(button.dataset.entryPreview),items}}))));
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
 }
 new MutationObserver(refresh).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 refresh();
})();
