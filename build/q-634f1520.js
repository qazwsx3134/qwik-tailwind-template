import{l as I,a as b,t as L,r as H,b as M,c as U,u as j,d as N,e as q,C as Q,D as z,R as W,f as J,g as X,h as B}from"./q-535b1a5a.js";import{_ as r,d as x,v as F,P as S,T as Y,e as G,u as g,E as K,f as C,g as _,h as Z,$ as tt,i as et,B as k,j as at}from"./q-d56ffaf9.js";const d=()=>r(()=>import("./q-ff371bfa.js"),["build/q-ff371bfa.js","build/q-d56ffaf9.js"]),T=[[/^\/$/,[d,()=>r(()=>import("./q-632c90ab.js"),["build/q-632c90ab.js","build/q-d56ffaf9.js"])]],[/^\/demo\/flower\/?$/,[d,()=>r(()=>import("./q-e2080f68.js"),["build/q-e2080f68.js","build/q-d56ffaf9.js"])]],[/^\/demo\/rain-world\/?$/,[d,()=>r(()=>import("./q-2f9f6392.js"),["build/q-2f9f6392.js","build/q-d56ffaf9.js"])]],[/^\/demo\/rain\/?$/,[d,()=>r(()=>import("./q-1eda8ca1.js"),["build/q-1eda8ca1.js","build/q-d56ffaf9.js"])]],[/^\/demo\/todolist\/?$/,[d,()=>r(()=>import("./q-6cb1c079.js"),["build/q-6cb1c079.js","build/q-d56ffaf9.js","build/q-535b1a5a.js"])]],[/^\/demo\/universe\/?$/,[d,()=>r(()=>import("./q-62a1b27f.js"),["build/q-62a1b27f.js","build/q-d56ffaf9.js"])]],[/^\/demo\/?$/,[d,()=>r(()=>import("./q-52beaceb.js"),["build/q-52beaceb.js","build/q-d56ffaf9.js"])]]],y=[];const O=!0;const ot=({track:t})=>{const[u,s,a,o,c,p,l,n]=x();async function v(){const[f,E]=t(()=>[l.value,u.value]),w=F("");let e=new URL(f,n.url),h,D=null;{e.pathname.endsWith("/")||(e.pathname+="/");let P=I(T,y,O,e.pathname);const m=S(),R=h=await b(e,m,!0,E);if(!R){l.untrackedValue=L(e);return}const A=R.href,i=new URL(A,e.href);i.pathname!==e.pathname&&(e=i,P=I(T,y,O,e.pathname)),D=await P}if(D){const[P,m,R]=D,A=m[m.length-1];n.url=e,n.href=e.href,n.pathname=e.pathname,n.params={...P},n.query=e.searchParams,l.untrackedValue=L(e);const i=H(h,n,m,w);s.headings=A.headings,s.menu=R,a.value=Y(m),o.links=i.links,o.meta=i.meta,o.styles=i.styles,o.title=i.title,o.frontmatter=i.frontmatter;{const V=h==null?void 0:h.loaders;V&&Object.assign(p,V),M.clear(),U(window,e,l),n.isNavigating=!1}}}v()},nt=()=>{const t=j();if(!(t!=null&&t.params))throw new Error("Missing Qwik City Env Data");const u=G("url");if(!u)throw new Error("Missing Qwik URL Env Data");const s=new URL(u),a=g({url:s,href:s.href,pathname:s.pathname,query:s.searchParams,params:t.params,isNavigating:!1}),o=K(g(t.response.loaders)),c=C(L(s)),p=g(N),l=g({headings:void 0,menu:void 0}),n=C(),v=t.response.action,f=v?t.response.loaders[v]:void 0,E=C(f?{id:v,data:t.response.formData,output:{result:f,status:t.response.status}}:void 0),w=k(()=>r(()=>Promise.resolve().then(()=>$),void 0),"s_fX0bDjeJa0E",[E,c,a]);return _(q,l),_(Q,n),_(z,p),_(W,a),_(J,w),_(X,o),_(B,E),Z(k(()=>r(()=>Promise.resolve().then(()=>$),void 0),"s_02wMImzEAbk",[E,l,n,p,t,o,c,a])),tt(et,null,3,"qY_0")},st=async(t,u)=>{const[s,a,o]=x();t===void 0?(t=a.value,a.value=""):u&&(a.value="");const c=new URL(t,o.url);t=L(c),!(!u&&a.value===t)&&(a.value=t,b(c,S()),I(T,y,O,c.pathname),s.value=void 0,o.isNavigating=!0)},$=Object.freeze(Object.defineProperty({__proto__:null,_hW:at,s_02wMImzEAbk:ot,s_TxCFOy819ag:nt,s_fX0bDjeJa0E:st},Symbol.toStringTag,{value:"Module"}));export{at as _hW,ot as s_02wMImzEAbk,nt as s_TxCFOy819ag,st as s_fX0bDjeJa0E};
