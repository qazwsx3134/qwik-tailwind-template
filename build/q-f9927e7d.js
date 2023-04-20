import{d as m,f as b,l as E,u,A as D,n as F,R as C,m as V,B as c,_ as f,T as v,j as U}from"./q-aabedc31.js";import{u as R}from"./q-405860ff.js";import{V as g,c as I,O as N,T as M,h as O,n as L,a as W,W as H,j as k,C as G,o as Y}from"./q-86d13d31.js";const j=`#bg{position:fixed;top:0;left:0}.main{position:absolute;width:100vw;color:#fff;z-index:99;margin:0 auto;padding:120px 0;display:grid;grid-template-columns:repeat(12,1fr)}.container{transform:scale(1.2)}
`,q=j,X=()=>{const[t]=m();t.instance&&t.instance.setSize(window.innerWidth,window.innerHeight)},Z=()=>{var n;const[t,a]=m(),o=window.pageYOffset;(n=t.guiStore.gui)==null||n.updateDisplay(),a.value=o},B=()=>{const t=b(),a=b(!1);E(c(()=>f(()=>Promise.resolve().then(()=>d),void 0),"s_5NbohcUFdSY"));const o={parallaxVal:1,scale:1},n={fps:60,blur:!0,intensity:.35,speed:.35,brightness:.75,normal:.55,zoom:2.8,panning:!1,lighting:!1},e=R(),_=b(0),y=u({instance:void 0}),x=u({instance:void 0}),S=u({instance:void 0}),i=u({instance:{u_speed:{value:.25,type:"f"}}}),r=u({instance:void 0});return D("scroll",c(()=>f(()=>Promise.resolve().then(()=>d),void 0),"s_Zzw4AobWppI",[e,_])),D("mousemove",c(()=>f(()=>Promise.resolve().then(()=>d),void 0),"s_repJ0SMMyNA",[t,o])),F("resize",c(()=>f(()=>Promise.resolve().then(()=>d),void 0),"s_wUA29ca4V2o",[r])),C(c(()=>f(()=>Promise.resolve().then(()=>d),void 0),"s_G9aZF9HFGe4",[x,S,o,n,e,a,r,y,i])),V("div",{ref:t},{class:"container"},V("canvas",null,{id:"bg"},null,3,null),3,"9S_0")},$=t=>{const[a,o]=m(),n=(window.innerWidth-t.pageX*o.parallaxVal)/90,e=(window.innerHeight-t.pageY*o.parallaxVal)/90;a.value&&(a.value.style.transform=`translateX(${n}px) translateY(${e}px) scale(1.2)`)},J="/build/q-d33c192e.webp",K=`// Heartfelt - by Martijn Steinrucken aka BigWings - 2017\r
// Email:countfrolic@gmail.com Twitter:@The_ArtOfCode\r
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.\r
\r
#ifdef GL_ES\r
precision highp float;\r
#endif\r
\r
in vec2 uvInterpolator;\r
uniform bool u_blur;\r
uniform sampler2D u_tex0;\r
uniform vec2 u_tex0_resolution;\r
uniform float u_time;\r
uniform vec2 u_resolution;\r
uniform float u_speed;\r
uniform float u_intensity;\r
uniform float u_normal;\r
uniform float u_brightness;\r
uniform float u_zoom;\r
uniform bool u_panning;\r
uniform bool u_post_processing;\r
uniform bool u_lightning;\r
\r
#define S(a, b, t) smoothstep(a, b, t)\r
#define USE_POST_PROCESSING\r
//#define CHEAP_NORMALS\r
\r
vec3 N13(float p) {\r
    //  from DAVE HOSKINS\r
    vec3 p3 = fract(vec3(p) * vec3(.1031, .11369, .13787));\r
    p3 += dot(p3, p3.yzx + 19.19);\r
    return fract(vec3((p3.x + p3.y) * p3.z, (p3.x + p3.z) * p3.y, (p3.y + p3.z) * p3.x));\r
}\r
\r
vec4 N14(float t) {\r
    return fract(sin(t * vec4(123., 1024., 1456., 264.)) * vec4(6547., 345., 8799., 1564.));\r
}\r
float N(float t) {\r
    return fract(sin(t * 12345.564) * 7658.76);\r
}\r
\r
float Saw(float b, float t) {\r
    return S(0., b, t) * S(1., b, t);\r
}\r
\r
vec2 DropLayer2(vec2 uv, float t) {\r
    vec2 UV = uv;\r
\r
    uv.y += t * 0.75;\r
    vec2 a = vec2(6., 1.);\r
    vec2 grid = a * 2.;\r
    vec2 id = floor(uv * grid);\r
\r
    float colShift = N(id.x);\r
    uv.y += colShift;\r
\r
    id = floor(uv * grid);\r
    vec3 n = N13(id.x * 35.2 + id.y * 2376.1);\r
    vec2 st = fract(uv * grid) - vec2(.5, 0);\r
\r
    float x = n.x - .5;\r
\r
    float y = UV.y * 20.;\r
    float wiggle = sin(y + sin(y));\r
    x += wiggle * (.5 - abs(x)) * (n.z - .5);\r
    x *= .7;\r
    float ti = fract(t + n.z);\r
    y = (Saw(.85, ti) - .5) * .9 + .5;\r
    vec2 p = vec2(x, y);\r
\r
    float d = length((st - p) * a.yx);\r
\r
    float mainDrop = S(.4, .0, d);\r
\r
    float r = sqrt(S(1., y, st.y));\r
    float cd = abs(st.x - x);\r
    float trail = S(.23 * r, .15 * r * r, cd);\r
    float trailFront = S(-.02, .02, st.y - y);\r
    trail *= trailFront * r * r;\r
\r
    y = UV.y;\r
    float trail2 = S(.2 * r, .0, cd);\r
    float droplets = max(0., (sin(y * (1. - y) * 120.) - st.y)) * trail2 * trailFront * n.z;\r
    y = fract(y * 10.) + (st.y - .5);\r
    float dd = length(st - vec2(x, y));\r
    droplets = S(.3, 0., dd);\r
    float m = mainDrop + droplets * r * trailFront;\r
\r
    //m += st.x>a.y*.45 || st.y>a.x*.165 ? 1.2 : 0.;\r
    return vec2(m, trail);\r
}\r
\r
float StaticDrops(vec2 uv, float t) {\r
    uv *= 40.;\r
\r
    vec2 id = floor(uv);\r
    uv = fract(uv) - .5;\r
    vec3 n = N13(id.x * 107.45 + id.y * 3543.654);\r
    vec2 p = (n.xy - .5) * .7;\r
    float d = length(uv - p);\r
\r
    float fade = Saw(.025, fract(t + n.z));\r
    float c = S(.3, 0., d) * fract(n.z * 10.) * fade;\r
    return c;\r
}\r
\r
vec2 Drops(vec2 uv, float t, float l0, float l1, float l2) {\r
    float s = StaticDrops(uv, t) * l0;\r
    vec2 m1 = DropLayer2(uv, t) * l1;\r
    vec2 m2 = DropLayer2(uv * 1.85, t) * l2;\r
\r
    float c = s + m1.x + m2.x;\r
    c = S(.3, 1., c);\r
\r
    return vec2(c, max(m1.y * l0, m2.y * l1));\r
}\r
\r
//random no.\r
float N21(vec2 p) {\r
    p = fract(p * vec2(123.34, 345.45));\r
    p += dot(p, p + 34.345);\r
    return fract(p.x * p.y);\r
}\r
\r
void main() {\r
    vec2 uv = (gl_FragCoord.xy - .5 * u_resolution.xy) / u_resolution.y;\r
    vec2 UV = gl_FragCoord.xy / u_resolution.xy;//-.5;\r
    float T = u_time;\r
\r
    //uniform texture scaling\r
    float screenAspect = u_resolution.x / u_resolution.y;\r
    float textureAspect = u_tex0_resolution.x / u_tex0_resolution.y;\r
    float scaleX = 1., scaleY = 1.;\r
    if(textureAspect > screenAspect)\r
        scaleX = screenAspect / textureAspect;\r
    else\r
        scaleY = textureAspect / screenAspect;\r
    UV = vec2(scaleX, scaleY) * (UV - 0.5) + 0.5;\r
\r
    float t = T * .2 * u_speed;\r
\r
    float rainAmount = u_intensity;\r
\r
    float zoom = u_panning ? -cos(T * .2) : 0.;\r
    uv *= (.7 + zoom * .3) * u_zoom;\r
\r
    float staticDrops = S(-.5, 1., rainAmount) * 2.;\r
    float layer1 = S(.25, .75, rainAmount);\r
    float layer2 = S(.0, .5, rainAmount);\r
\r
    vec2 c = Drops(uv, t, staticDrops, layer1, layer2);\r
    #ifdef CHEAP_NORMALS\r
    vec2 n = vec2(dFdx(c.x), dFdy(c.x));// cheap normals (3x cheaper, but 2 times shittier ;))\r
    #else\r
    vec2 e = vec2(.001, 0.) * u_normal;\r
    float cx = Drops(uv + e, t, staticDrops, layer1, layer2).x;\r
    float cy = Drops(uv + e.yx, t, staticDrops, layer1, layer2).x;\r
    vec2 n = vec2(cx - c.x, cy - c.x);		// expensive normals\r
    #endif\r
\r
    vec3 col = texture2D(u_tex0, UV + n).rgb;\r
    vec4 texCoord = vec4(UV.x + n.x, UV.y + n.y, 0, 1.0 * 25. * 0.01 / 7.);\r
\r
    if(u_blur) {\r
        float blur = 0.4 * 0.01;\r
        int blurIterations = 16;\r
        float a = N21(gl_FragCoord.xy) * 6.2831;\r
        for(int m = 0; m < blurIterations; m++) {\r
            vec2 offs = vec2(sin(a), cos(a)) * blur;\r
            float d = fract(sin((float(m) + 1.) * 546.) * 5424.);\r
            d = sqrt(d);\r
            offs *= d;\r
            col += texture2D(u_tex0, texCoord.xy + vec2(offs.x, offs.y)).xyz;\r
            a++;\r
        }\r
        col /= float(blurIterations);\r
    }\r
\r
    t = (T + 3.) * .5;			// make time sync with first lightnoing\r
    if(u_post_processing) {\r
        //float colFade = sin(t * .2) * .5 + .5;\r
        col *= mix(vec3(1.), vec3(.8, .9, 1.3), 1.);	// subtle color shift\r
    }\r
    float fade = S(0., 10., T);							// fade in at the start\r
\r
    if(u_lightning) {\r
        float lightning = sin(t * sin(t * 10.));				// lighting flicker\r
        lightning *= pow(max(0., sin(t + sin(t))), 10.);		// lightning flash\r
        col *= 1. + lightning * fade * mix(1., .1, 0.);	// composite lightning\r
    }\r
    col *= 1. - dot(UV -= .5, UV) * 1.; // vignette\r
\r
    gl_FragColor = vec4(col * u_brightness, 1);\r
}`,Q=`// Raindrop vert shader\r
out vec2 uvInterpolator;\r
\r
void main(){\r
    uvInterpolator = uv;\r
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r
}`,nn=async()=>{var z;const[t,a,o,n,e,_,y,x,S]=m(),i=new G;Y.enabled=!0;const r={u_tex0:{value:void 0,type:"t"},u_time:{value:0,type:"f"},u_blur:{value:!1,type:"b"},u_intensity:{value:.4,type:"f"},u_speed:{value:.25,type:"f"},u_brightness:{value:.75,type:"f"},u_normal:{value:.5,type:"f"},u_zoom:{value:2.61,type:"f"},u_panning:{value:!1,type:"b"},u_post_processing:{value:!0,type:"b"},u_lightning:{value:!1,type:"b"},u_resolution:{value:new g(window.innerWidth,window.innerHeight),type:"v2"},u_tex0_resolution:{value:new g(window.innerWidth,window.innerHeight),type:"v2"}};S.instance.u_speed=r.u_speed;const s=new I;x.instance=v(s);const h=new N(-1,1,1,-1,0,1);a.instance=v(h);const w=await new M().loadAsync(J);t.instance=v(w);const P=new O(2,2,1,1),l=new L({vertexShader:Q,fragmentShader:K,uniforms:r});l.uniforms.u_tex0.value=w,l.uniforms.u_tex0_resolution.value=new g(1920,1080);const T=new W(P,l),p=new H({canvas:document.querySelector("#bg"),antialias:!1});y.instance=v(p),p.setPixelRatio(window.devicePixelRatio),p.setSize(window.innerWidth,window.innerHeight),l.uniforms.u_tex0_resolution.value=new g(window.innerWidth*o.scale,window.innerHeight*o.scale),e.guiStore.gui&&(e.guiStore.gui.add(n,"fps").min(1).max(120).step(1),e.guiStore.gui.add(n,"blur").name("Blur"),e.guiStore.gui.add(n,"intensity").min(.1).max(1).step(.05),e.guiStore.gui.add(n,"speed").min(.1).max(1).step(.05),e.guiStore.gui.add(n,"brightness").min(.1).max(1).step(.05),e.guiStore.gui.add(n,"normal").min(.1).max(1).step(.05),e.guiStore.gui.add(n,"zoom").min(0).max(10).step(.05),e.guiStore.gui.add(n,"panning"),e.guiStore.gui.add(n,"lighting")),s.fog=new k(1842218,.002),s.add(T),_.value&&e.guiStore.gui?e.guiStore.gui.show():(z=e.guiStore.gui)==null||z.hide();const A=()=>{setTimeout(()=>{requestAnimationFrame(A)},1e3/n.fps),e.guiStore.gui&&(r.u_blur.value=n.blur,r.u_intensity.value=n.intensity,r.u_speed.value=n.speed,r.u_brightness.value=n.brightness,r.u_normal.value=n.normal,r.u_zoom.value=n.zoom,r.u_panning.value=n.panning,r.u_lightning.value=n.lighting),i.getElapsedTime()>21600&&i.start(),l.uniforms.u_time.value=i.getElapsedTime(),p.render(s,h)};A()},d=Object.freeze(Object.defineProperty({__proto__:null,_hW:U,s_5NbohcUFdSY:q,s_G9aZF9HFGe4:nn,s_Zzw4AobWppI:Z,s_gvyyswKs67c:B,s_repJ0SMMyNA:$,s_wUA29ca4V2o:X},Symbol.toStringTag,{value:"Module"}));export{U as _hW,q as s_5NbohcUFdSY,nn as s_G9aZF9HFGe4,Z as s_Zzw4AobWppI,B as s_gvyyswKs67c,$ as s_repJ0SMMyNA,X as s_wUA29ca4V2o};
