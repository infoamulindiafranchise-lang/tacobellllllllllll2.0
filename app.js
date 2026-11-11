const header=document.getElementById('siteHeader')
const progress=document.getElementById('scrollProgress')
const menuButton=document.getElementById('menuButton')
const mobileMenu=document.getElementById('mobileMenu')
const mobileLinks=mobileMenu.querySelectorAll('a')
const faqItems=document.querySelectorAll('.faq-item')
const revealItems=document.querySelectorAll('.reveal')
const mobileCta=document.querySelector('.mobile-cta')
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches
function updateScroll(){
const y=window.scrollY
const height=document.documentElement.scrollHeight-window.innerHeight
header.classList.toggle('scrolled',y>12)
progress.style.width=(height>0?Math.min(100,y/height*100):0)+'%'
if(mobileCta){
const show=window.innerWidth<=900&&y>Math.min(520,window.innerHeight*.65)
mobileCta.classList.toggle('visible',show)
}
}
function setMenu(open){
mobileMenu.classList.toggle('open',open)
menuButton.classList.toggle('active',open)
menuButton.setAttribute('aria-expanded',String(open))
menuButton.setAttribute('aria-label',open?'Close navigation':'Open navigation')
mobileMenu.setAttribute('aria-hidden',String(!open))
document.body.classList.toggle('menu-open',open)
}
menuButton.addEventListener('click',()=>setMenu(!mobileMenu.classList.contains('open')))
mobileLinks.forEach(link=>link.addEventListener('click',()=>setMenu(false)))
document.addEventListener('keydown',event=>{
if(event.key==='Escape')setMenu(false)
})
faqItems.forEach(item=>{
const button=item.querySelector('button')
const answer=item.querySelector('.faq-answer')
const icon=button.querySelector('b')
button.addEventListener('click',()=>{
const open=item.classList.contains('open')
faqItems.forEach(other=>{
other.classList.remove('open')
other.querySelector('button').setAttribute('aria-expanded','false')
other.querySelector('button b').textContent='+'
other.querySelector('.faq-answer').style.maxHeight=null
})
if(!open){
item.classList.add('open')
button.setAttribute('aria-expanded','true')
icon.textContent='−'
answer.style.maxHeight=answer.scrollHeight+'px'
}
})
})
const initiallyOpen=document.querySelector('.faq-item.open .faq-answer')
if(initiallyOpen)initiallyOpen.style.maxHeight=initiallyOpen.scrollHeight+'px'
if(reducedMotion){
revealItems.forEach(item=>item.classList.add('visible'))
}else{
const observer=new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add('visible')
observer.unobserve(entry.target)
}
})
},{threshold:.12,rootMargin:'0px 0px -40px'})
revealItems.forEach(item=>observer.observe(item))
}
window.addEventListener('scroll',updateScroll,{passive:true})
window.addEventListener('resize',()=>{
const openItem=document.querySelector('.faq-item.open .faq-answer')
if(openItem)openItem.style.maxHeight=openItem.scrollHeight+'px'
if(window.innerWidth>1180)setMenu(false)
})
updateScroll()
