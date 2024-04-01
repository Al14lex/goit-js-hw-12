import{a as v,i as g,S as w}from"./assets/vendor-550cebad.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function u(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=u(e);fetch(e.href,o)}})();async function f(t,r){const u="https://pixabay.com/api/",n={key:"43045926-d10eb038526040017b5fd39ad",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:r};return(await v.get(u,{params:n})).data}function m(t){if(document.querySelector(".gallery-img"),t.length===0){g.info({title:"Info",color:"red",position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"});return}const r=t.map(({webformatURL:n,largeImageURL:e,tags:o,likes:a,views:b,comments:L,downloads:q})=>`<a href="${e}" class="gallery-item" data-lightbox="gallery">
    <img src="${n}" alt="${o}" />
    <div class="info">
      <p><strong>Likes:</strong> ${a}</p>
      <p><strong>Views:</strong> ${b}</p>
      <p><strong>Comments:</strong> ${L}</p>
      <p><strong>Downloads:</strong> ${q}</p>
    </div>
  </a>`).join("");s.gallery.insertAdjacentHTML("beforeend",r),new w(".gallery-item",{captionsData:"alt"}).refresh()}const S=15;let l=1,d,p=0;const s={form:document.querySelector(".form"),input:document.getElementById("query"),loader:document.querySelector(".loader"),gallery:document.querySelector(".gallery-img"),btnMore:document.querySelector(".btn-load-more")};s.form.addEventListener("submit",P);s.btnMore.addEventListener("click",M);const i=t=>s.loader.classList[t?"remove":"add"]("is-hidden"),c=t=>s.btnMore.classList[t?"remove":"add"]("is-hidden");i(!1);c(!1);async function P(t){if(t.preventDefault(),i(!0),d=s.input.value.trim(),l=1,s.gallery.innerHTML="",!d){g.error({message:"Please enter a request",position:"topRight"}),c(!1),y();return}try{const r=await f(d,l);if(r.hits.length===0){c(!1),i(!1),g.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}p=Math.ceil(r.totalHits/S),m(r.hits)}catch(r){console.error(r)}i(!1),h(),s.form.reset()}async function M(){l+=1,i(!0);try{const t=await f(d,l);m(t.hits)}catch(t){console.error(t)}y(),h(),i(!1)}function h(){l>=p?(c(!1),g.error({message:"We're sorry, but you've reached the end of search results.",position:"topRight",color:"yellow"})):c(!0)}function y(){const t=s.gallery.firstChild.getBoundingClientRect().height,r=window.pageYOffset||document.documentElement.scrollTop;window.scroll({top:r+t*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
