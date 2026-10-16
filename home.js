const header=document.querySelector('.site-header');
const revealItems=document.querySelectorAll('.reveal');
const menuBtn=document.querySelector('.menu-btn');
const nav=document.querySelector('.nav');

menuBtn?.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded',open);
});

document.querySelectorAll('.nav a').forEach(a=>{
  a.addEventListener('click',()=>{
    nav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded','false');
  });
});

const io=new IntersectionObserver((entries)=>{
  entries.forEach((entry,index)=>{
    if(entry.isIntersecting){
      setTimeout(()=>entry.target.classList.add('in'),index*90);
      io.unobserve(entry.target);
    }
  });
},{threshold:.15,rootMargin:'0px 0px -8% 0px'});

revealItems.forEach(item=>io.observe(item));

let lastY=0;
window.addEventListener('scroll',()=>{
  const y=window.scrollY;
  header.classList.toggle('scrolled',y>20);
  lastY=y;
},{passive:true});

document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener('click',e=>{
    const target=document.querySelector(link.getAttribute('href'));
    if(!target)return;
    e.preventDefault();
    window.scrollTo({top:target.getBoundingClientRect().top+window.scrollY-70,behavior:'smooth'});
  });
});
