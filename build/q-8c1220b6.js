import{d as c,k as u,m,$ as l,i as d,F as r,B as p,_}from"./q-d56ffaf9.js";import{i as b}from"./q-535b1a5a.js";const f=async(a,e)=>{const[s]=c(),t=new FormData(e),o=new URLSearchParams;t.forEach((n,i)=>{typeof n=="string"&&o.append(i,n)}),s("?"+o.toString(),!0).then(()=>{e.getAttribute("data-spa-reset")==="true"&&e.reset(),e.dispatchEvent(new CustomEvent("submitcompleted",{bubbles:!1,cancelable:!1,composed:!1,detail:{status:200}}))})},v=a=>{const e=u(a,["action","spaReset","reloadDocument","onSubmit$"]),s=b();return m("form",{...e,onSubmit$:p(()=>_(()=>Promise.resolve().then(()=>S),void 0),"s_p9MSze0ojs4",[s])},{action:"get","preventdefault:submit":r(t=>!t.reloadDocument,[a],"!p0.reloadDocument"),"data-spa-reset":r(t=>t.spaReset?"true":void 0,[a],'p0.spaReset?"true":undefined')},l(d,null,3,"BC_0"),0,"BC_1")},S=Object.freeze(Object.defineProperty({__proto__:null,s_Nk9PlpjQm9Y:v,s_p9MSze0ojs4:f},Symbol.toStringTag,{value:"Module"}));export{v as s_Nk9PlpjQm9Y,f as s_p9MSze0ojs4};