import{u as a,R as r,m as e,B as t,_ as i,d as o,T as u,j as c}from"./q-a2f13917.js";import{g as d}from"./q-4ac7c995.js";const m=()=>{const l=a({timeline:void 0}),n=t(()=>i(()=>Promise.resolve().then(()=>s),void 0),"s_ccIalOfHGLY",[l]);return r(t(()=>i(()=>Promise.resolve().then(()=>s),void 0),"s_kDbVo2bfSeQ",[l])),e("div",null,{class:"overflow-hidden m-0 h-screen flex flex-col"},[e("div",null,{class:"header h-10 bg-red-400"},e("div",null,{class:"links h-full flex justify-around items-center text-white"},[e("div",null,{class:"link"}," link 1",3,null),e("div",null,{class:"link"}," link 2",3,null),e("div",null,{class:"link"}," link 3",3,null)],3,null),3,null),e("div",null,{class:"content flex flex-grow justify-between"},[e("div",null,{class:"sidebar left w-12 bg-green-500"}," ",3,null),e("button",null,{type:"button",class:"button align-middle",onClick$:n},"Reverse",3,null),e("div",null,{class:"sidebar right w-12 bg-green-500"}," ",3,null)],3,null),e("div",null,{class:"footer h-12 bg-cyan-600"},null,3,null)],3,"a0_0")},f=()=>{const[l]=o();l.timeline&&(l.timeline.timeScale(2),l.timeline.reverse())},_=()=>{const[l]=o(),n=d.timeline({defaults:{ease:"power1.out",duration:1}});l.timeline=u(n),n.from(".header",{y:"-100%",duration:1.5,delay:.5}).from(".link",{opacity:0,stagger:.5,duration:1},"-=1").from(".right",{duration:1,x:"-100vw",ease:"power2.in"},1).from(".left",{duration:1,x:"-100%",ease:"power2.in"},"<1").fromTo(".button",{opacity:0,scale:0,rotation:720},{opacity:1,scale:1,rotation:0,ease:"elastic"})},s=Object.freeze(Object.defineProperty({__proto__:null,_hW:c,s_ccIalOfHGLY:f,s_hxysCYSc5zo:m,s_kDbVo2bfSeQ:_},Symbol.toStringTag,{value:"Module"}));export{c as _hW,f as s_ccIalOfHGLY,m as s_hxysCYSc5zo,_ as s_kDbVo2bfSeQ};
