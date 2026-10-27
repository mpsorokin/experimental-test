(() => {
"use strict";
const $ = (s,root=document)=>root.querySelector(s);
const $$ = (s,root=document)=>[...root.querySelectorAll(s)];
const menu=$("#menu"),nav=$("#site-nav"),form=$("#filter-form"),cards=$$(".job");
$("#year").textContent=String(new Date().getFullYear());
function closeMenu(){nav.classList.remove("open");menu.setAttribute("aria-expanded","false");menu.setAttribute("aria-label","Open menu");}
menu.addEventListener("click",()=>{const open=menu.getAttribute("aria-expanded")==="true";nav.classList.toggle("open",!open);menu.setAttribute("aria-expanded",String(!open));menu.setAttribute("aria-label",open?"Open menu":"Close menu");});
$$(".links a").forEach(a=>a.addEventListener("click",closeMenu));
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeMenu();});
function filter(scroll){const rank=$("#rank").value,vessel=$("#vessel").value;let count=0;cards.forEach(c=>{const visible=(rank==="all"||c.dataset.rank===rank)&&(vessel==="all"||c.dataset.vessel===vessel);c.hidden=!visible;if(visible)count++;});$("#count").textContent=String(count).padStart(2,"0");$("#empty").hidden=count>0;if(scroll)$("#jobs").scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"});}
form.addEventListener("submit",e=>{e.preventDefault();filter(true);});
function reset(){$("#rank").value="all";$("#vessel").value="all";filter(false);}
$("#reset").addEventListener("click",reset);$("#empty-reset").addEventListener("click",reset);
const jobDialog=$("#job-dialog"),contactDialog=$("#contact-dialog");
function open(d){d.showModal();}
function close(d){d.close();}
$$("[data-close]").forEach(b=>b.addEventListener("click",()=>close(b.closest("dialog"))));
[jobDialog,contactDialog].forEach(d=>d.addEventListener("click",e=>{const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close(d);}));
cards.forEach(c=>{function show(){ $("#job-title").textContent=c.dataset.title;$("#detail-ship").textContent=c.dataset.ship;$("#detail-route").textContent=c.dataset.route;$("#detail-contract").textContent=c.dataset.contract;$("#detail-pay").textContent=c.dataset.pay;open(jobDialog);}c.addEventListener("click",e=>{if(!e.target.closest("button"))show();});$("button",c).addEventListener("click",show);});
$$("[data-contact]").forEach(b=>b.addEventListener("click",()=>{$("#contact-form").hidden=false;$("#thankyou").hidden=true;$("#contact-form").reset();open(contactDialog);}));
$("#contact-form").addEventListener("submit",e=>{e.preventDefault();if(!e.currentTarget.reportValidity())return;e.currentTarget.reset();e.currentTarget.hidden=true;$("#thankyou").hidden=false;});
})();