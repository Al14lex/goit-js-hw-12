import{a as q,S as P,i as d}from"./assets/vendor-95dc692e.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function l(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=l(e);fetch(e.href,r)}})();async function m(t,o){const l="https://pixabay.com/api/",s={key:"43045926-d10eb038526040017b5fd39ad",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:o};return(await q.get(l,{params:s})).data}function g(t){function o({webformatURL:e,largeImageURL:r,tags:a,likes:b,views:L,comments:v,downloads:M}){return`<li class="gallery-item">
            <a class="gallery-link" href="${e}">
          <img loading="lazy" class="gallery-image" src="${r}" alt="${a}" />
        </a>
          <div class="image-info">
      <ul class="infoBlock">
      <li class="title">Likes</li>
      <li class="info">${b}</li>
      </ul>
      <ul class="infoBlock">
      <li class="title">Views</li>
      <li class="info">${L}</li>
      </ul>
      <ul class="infoBlock">
      <li class="title">Comments</li>
      <li class="info">${v}</li>
      </ul>
      <ul class="infoBlock">
      <li class="title">Downloads</li>
      <li class="info">${M}</li>
      </ul>
      </div>
    </li>`}function l(e){return e.map(o).join("")}const s=l(t);i.gallery.insertAdjacentHTML("beforeend",s),w.refresh()}const w=new P(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250});let c=1,u,p=0;const S=15,i={form:document.querySelector(".form"),loader:document.querySelector(".loader"),gallery:document.querySelector(".gallery-img"),btnMore:document.querySelector(".btn-load-more")};i.form.addEventListener("submit",B);i.btnMore.addEventListener("clicl",O);n();f();function $(){i.btnMore.classList.remove("is-hidden")}function f(){i.btnMore.classList.add("is-hidden")}function n(){i.loader.classList.add("is-hidden")}function h(){i.loader.classList.remove("is-hidden")}async function B(t){if(t.preventDefault(),h(),u=t.target.elements.request.value.trim(),i.gallery.innerHTML="",c=1,!u){n(),f(),d.error({message:"Please enter a request",position:"topRight"});return}try{const o=await m(u,c);if(o.hits.length===0){n(),d.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}p=Math.ceil(o.totalHits/S),g(o.hits)}catch(o){console.log(o)}n(),y(),i.form.reset()}async function O(){c+=1,h();try{const t=await m(u,c);g(t.hits)}catch(t){console.log(t)}x(),y(),n()}function y(){c>=p?(f(),d.error({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):$()}function x(){const t=i.gallery.firstChild.getBoundingClientRect().size;scrollBy({top:t,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
