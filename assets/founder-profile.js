(() => {
 const slide=document.querySelector('#slide-12.founder-profile');
 if(!slide)return;
 const previewButtons=[...slide.querySelectorAll('[data-founder-preview]')];
 const icons={zoom:document.querySelector('#fullscreen-btn svg'),external:document.querySelector('#slide-4 .fa-reference-caption svg')};
 slide.querySelectorAll('[data-founder-icon]').forEach(slot=>{
  const icon=icons[slot.dataset.founderIcon];
  if(icon)slot.replaceChildren(icon.cloneNode(true));
 });
 const items=[
  {src:'assets/image9.jpg',title:['李晓文','Li Xiaowen'],caption:['李晓文','Li Xiaowen']},
  {src:'assets/founder-industrial-robotics-center-clean.png',href:'assets/founder-industrial-robotics-center.jpg',title:['行业应用机器人技术创新中心','Industrial Application Robotics Technology Innovation Center'],caption:['浙江清华长三角研究院','Yangtze Delta Region Institute of Tsinghua']},
  {src:'assets/founder-team-background.jpg',title:['团队合影','Team Photo'],caption:['团队合影','Team photo']},
  {src:'assets/founder-huzhou-robotics-center-toned.svg',href:'assets/founder-huzhou-robotics-center.png',title:['智能跨域机器人研究中心','Intelligent Cross-Domain Robotics Research Center'],caption:['浙江大学湖州研究院','Huzhou Institute of Zhejiang University']}
 ];
 const label=(element,text)=>{element.title=text;element.setAttribute('aria-label',text);};
 function refresh(){
  const en=document.documentElement.lang==='en';
  previewButtons.forEach(button=>{
   const index=Number(button.dataset.founderPreview);
   label(button,en?`Enlarge ${items[index].title[1]}`:`放大查看${items[index].title[0]}`);
   const image=button.querySelector('img');if(image)image.alt=items[index].title[en?1:0];
  });
  slide.querySelector('.founder-team-background img').alt=en?'Team photo':'团队合影';
  label(slide.querySelector('.founder-publications'),en?'21 papers · View Google Scholar profile':'21篇论文 · 查看谷歌学术主页');
  slide.querySelectorAll('[data-founder-link-label]').forEach(link=>label(link,en?link.dataset.founderLinkLabelEn:link.dataset.founderLinkLabel));
  slide.querySelectorAll('.founder-source-logo img').forEach((image,index)=>{image.alt=en?['People.cn','CCTV.com'][index]:['人民网','央视网'][index];});
 }
 previewButtons.forEach(button=>button.addEventListener('click',()=>document.dispatchEvent(new CustomEvent('oneg:image-preview',{detail:{opener:button,index:Number(button.dataset.founderPreview),items}}))));
 new MutationObserver(refresh).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 refresh();
})();
