import{d as h,T as d,l as w,f as m,u as g,n as y,R as C,m as e,B as u,_ as p,j as T}from"./q-7dd09273.js";import{S}from"./q-42d31154.js";import{g as i}from"./q-4ac7c995.js";const k=()=>{const[t,a,n,l]=h();i.registerPlugin(S);const r={video:{frame:0}};t.value&&t.value.getContext("2d")&&(t.value.width=1920,t.value.height=1080,a.context=d(t.value.getContext("2d")||void 0));const f=()=>{var s,c;console.log(r);const o=a.context;o==null||o.drawImage(n.value[r.video.frame],0,0,((s=t.value)==null?void 0:s.width)||1920,((c=t.value)==null?void 0:c.height)||1080)};for(let o=1;o<511;o++){const s=new Image,c=`${o}`.padStart(3,"0");s.src=`../../../video/sequence/star/login_${c}.webp`,n.value.push(s)}n.value[0].onload=()=>{f()};const b=i.timeline().from("#scrollTextContainer",{y:-50,opacity:0,duration:1});l.init=d(b);const x=i.timeline({repeat:-1,repeatDelay:1}).fromTo("#scrollTextContainer",{y:0},{y:5,duration:.05,repeat:5,yoyo:!0,ease:"power1.inOut"}).fromTo(".landscapeReminder",{opacity:.8},{opacity:1,rotate:90});l.shake=d(x);const _=i.timeline().fromTo("#scrollDownButtonLayer",{clipPath:"polygon(0 100%, 100% 100%, 100% 100%, 0 100%)"},{clipPath:"polygon(0 100%, 100% 100%, 100% 0.1%, 0 0.1%)",scrollTrigger:{trigger:"#scrollContainer",start:"top top",end:()=>{var o;return`${(((o=document.getElementById("firstScreen"))==null?void 0:o.offsetHeight)||0)*1} top`},scrub:1,pin:"#scrollContainer"}}).to(".video",{opacity:0,scrollTrigger:{trigger:"#scrollContainer",start:()=>"1px top",end:()=>"10px top",scrub:1,pin:"#scrollContainer",onLeave:()=>{console.log("leave")},onEnterBack:()=>{console.log("enter back")}}});l.video=d(_),i.to(".animateButtonWrapper",{visibility:"hidden",scrollTrigger:{trigger:"#scrollContainer",start:()=>"1x top",end:()=>"1px top",scrub:.5,pin:"#scrollContainer"}}),i.to(r.video,{frame:510,snap:"frame",ease:"none",scrollTrigger:{scrub:.5,start:()=>"5px top",end:()=>"+=511",pin:"#scrollContainer",pinSpacing:!0},onUpdate:f})},j=`@media screen and (min-aspect-ratio: 1/1){.landscapeReminder{display:none}.videoContainer,.videoCanvas{aspect-ratio:16 / 9}.scrollTextContainer{position:absolute;z-index:10;left:50%;top:85%;width:15rem;height:5rem;transform:translate(-50%,-50%)}.animateButtonWrapper{display:contents;position:absolute;z-index:10;left:50%;top:50%;transform:translate(-50%,-50%)}}@media screen and (max-aspect-ratio: 1/1){.landscapeReminder{display:flex;flex-direction:column;position:absolute;justify-content:center;align-items:center;width:50px;z-index:10;left:50%;top:50%;transform:translate(-50%,-50%)}.videoContainer,.videoCanvas{aspect-ratio:9 / 20}.scrollTextContainer{position:absolute;z-index:10;left:50%;top:75%;width:15rem;height:5rem;transform:translate(-50%,-50%)}.animateButtonWrapper{display:contents;position:absolute;z-index:10;left:50%;top:50%;transform:translate(-50%,-50%)}}.videoContainer{position:relative;width:100%}.video{position:absolute;z-index:10;top:0;left:0;margin:auto;display:block;width:100%;height:100%;-o-object-fit:cover;object-fit:cover;-o-object-position:74%;object-position:74%}.videoCanvas{aspect-ratio:16 / 9;z-index:9;position:absolute;top:0;left:0;-o-object-fit:cover;object-fit:cover;-o-object-position:74%;object-position:74%}
`,P=j,R=()=>{w(u(()=>p(()=>Promise.resolve().then(()=>v),void 0),"s_96r4HlMhAoI"));const t=m(),a=m([]),n=g({context:void 0}),l=g({init:void 0,shake:void 0,video:void 0});return y("scroll",u(()=>p(()=>Promise.resolve().then(()=>v),void 0),"s_RwgTf4tBzu0",[l])),C(u(()=>p(()=>Promise.resolve().then(()=>v),void 0),"s_0N4CTvNDlWo",[t,n,a,l])),e("div",null,{id:"scrollContainer",class:"section w-full min-h-screen bg-black"},[e("div",null,{id:"firstScreen",class:"h-screen relative w-full"},[e("div",null,{id:"videoContainer",class:"videoContainer h-full"},[e("video",null,{class:"video hidden",autoPlay:!0,muted:!0,loop:!0},[e("source",null,{src:"../../../video/star_m.mp4",type:"video/mp4"},null,3,null),e("h1",null,null,"You can place a title over the video like this...",3,null)],3,null),e("canvas",{ref:t},{id:"videoCanvas",class:"videoCanvas h-full w-full"},null,3,null)],1,null),e("div",null,{class:"landscapeReminder text-white"},[e("i",null,{class:"fa-solid fa-rotate-right text-4xl"},null,3,null),e("i",null,{class:"fa-solid fa-mobile text-6xl"},null,3,null)],3,null),e("div",null,{id:"scrollTextContainer",class:"scrollTextContainer"},e("div",null,{class:"animateButtonWrapper"},[e("div",null,{id:"scrollDownButton",class:"border-solid border border-white p-3 rounded-full w-48 absolute left-1/2 top-0 translate-x-[-50%]"},e("div",null,{class:"text-white font-semibold text-xl tracking-widest text-center"},"Scroll Down",3,null),3,null),e("div",null,{id:"scrollDownButtonLayer",class:"border-solid border border-black bg-white p-3 rounded-full w-48 absolute left-1/2 top-0 translate-x-[-50%]"},e("div",null,{class:"text-black font-semibold text-xl tracking-widest text-center"},"Scroll Down",3,null),3,null),e("div",null,{class:"flex mt-2 absolute left-1/2 bottom-0 justify-center items-center"},e("i",null,{class:"fa-solid fa-arrow-down",style:"color: #ffffff;"},null,3,null),3,null)],3,null),3,null)],1,null),e("div",null,{class:"bg-black h-1"},null,3,null)],1,"YM_0")},B=()=>{var n,l;const[t]=h();if(window.scrollY>0){(n=t.shake)==null||n.pause();return}else{(l=t.shake)==null||l.play();return}},v=Object.freeze(Object.defineProperty({__proto__:null,_hW:T,s_0N4CTvNDlWo:k,s_96r4HlMhAoI:P,s_RwgTf4tBzu0:B,s_llZkXbU8adY:R},Symbol.toStringTag,{value:"Module"}));export{T as _hW,k as s_0N4CTvNDlWo,P as s_96r4HlMhAoI,B as s_RwgTf4tBzu0,R as s_llZkXbU8adY};
