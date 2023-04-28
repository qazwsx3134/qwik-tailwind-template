import{d as f,f as A,l as R,u as g,A as S,n as C,R as U,m as F,B as l,_ as u,T as _,j as I}from"./q-7dd09273.js";import{u as L}from"./q-b6a39dc0.js";import{k as O}from"./q-12e0727d.js";import{f as E,g as N,O as M,T as k,l as W,r as H,a as G,W as B,n as Y,C as j,s as q}from"./q-9971923b.js";const X=`#bg{position:fixed;top:0;left:0}.main{position:absolute;width:100vw;color:#fff;z-index:99;margin:0 auto;padding:120px 0;display:grid;grid-template-columns:repeat(12,1fr)}.container{display:flex;transform:scale(1.2)}
`,J=X,K=()=>{const[e]=f();e.instance&&e.instance.play()},Z=()=>{const[e]=f();e.instance&&e.instance.setSize(window.innerWidth,window.innerHeight)},$=()=>{var r;const[e,a]=f(),i=window.pageYOffset;(r=e.guiStore.gui)==null||r.updateDisplay(),a.value=i},Q=()=>{const e=O(),a=A(),i=A(e.query.get("debug")==="true");R(l(()=>u(()=>Promise.resolve().then(()=>c),void 0),"s_5NbohcUFdSY"));const r={parallaxVal:1,scale:1},n={fps:60,blur:!0,intensity:.45,speed:.3,brightness:.75,normal:.85,zoom:1.5,panning:!1,lighting:!1},t=L(),h=A(0),d=g({instance:void 0}),w=g({instance:void 0}),p=g({instance:void 0}),o=g({instance:void 0}),s=g({instance:void 0});return S("scroll",l(()=>u(()=>Promise.resolve().then(()=>c),void 0),"s_Zzw4AobWppI",[t,h])),S("mousemove",l(()=>u(()=>Promise.resolve().then(()=>c),void 0),"s_repJ0SMMyNA",[a,r])),C("resize",l(()=>u(()=>Promise.resolve().then(()=>c),void 0),"s_wUA29ca4V2o",[s])),S("click",l(()=>u(()=>Promise.resolve().then(()=>c),void 0),"s_EFKQR5Puf8I",[d])),S("touchstart",l(()=>u(()=>Promise.resolve().then(()=>c),void 0),"s_6RBosaJUFCo",[d])),U(l(()=>u(()=>Promise.resolve().then(()=>c),void 0),"s_G9aZF9HFGe4",[d,p,o,a,n,t,i,s,w])),F("div",{ref:a},{class:"container"},F("canvas",null,{id:"bg"},null,3,null),3,"9S_0")},nn=()=>{const[e]=f();e.instance&&e.instance.play()},en=e=>{const[a,i]=f(),r=(window.innerWidth-e.pageX*i.parallaxVal)/90,n=(window.innerHeight-e.pageY*i.parallaxVal)/90;a.value&&(a.value.style.transform=`translateX(${r}px) translateY(${n}px) scale(1.2)`)},tn=`// Heartfelt - by Martijn Steinrucken aka BigWings - 2017
// Email:countfrolic@gmail.com Twitter:@The_ArtOfCode
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.

#ifdef GL_ES
precision highp float;
#endif

in vec2 uvInterpolator;
uniform bool u_blur;
uniform sampler2D u_tex0;
uniform vec2 u_tex0_resolution;
uniform float u_time;
uniform vec2 u_resolution;
uniform float u_speed;
uniform float u_intensity;
uniform float u_normal;
uniform float u_brightness;
uniform float u_zoom;
uniform bool u_panning;
uniform bool u_post_processing;
uniform bool u_lightning;

#define S(a, b, t) smoothstep(a, b, t)
// #define USE_POST_PROCESSING
// #define CHEAP_NORMALS

vec3 N13(float p) {
    //  from DAVE HOSKINS
    vec3 p3 = fract(vec3(p) * vec3(.1031, .11369, .13787));
    p3 += dot(p3, p3.yzx + 19.19);
    return fract(vec3((p3.x + p3.y) * p3.z, (p3.x + p3.z) * p3.y, (p3.y + p3.z) * p3.x));
}

vec4 N14(float t) {
    return fract(sin(t * vec4(123., 1024., 1456., 264.)) * vec4(6547., 345., 8799., 1564.));
}
float N(float t) {
    return fract(sin(t * 12345.564) * 7658.76);
}

float Saw(float b, float t) {
    return S(0., b, t) * S(1., b, t);
}

vec2 DropLayer2(vec2 uv, float t) {
    vec2 UV = uv;

    uv.y += t * 0.75;
    vec2 a = vec2(6., 1.);
    vec2 grid = a * 2.;
    vec2 id = floor(uv * grid);

    float colShift = N(id.x);
    uv.y += colShift;

    id = floor(uv * grid);
    vec3 n = N13(id.x * 35.2 + id.y * 2376.1);
    vec2 st = fract(uv * grid) - vec2(.5, 0);

    float x = n.x - .5;

    float y = UV.y * 20.;
    float wiggle = sin(y + sin(y));
    x += wiggle * (.5 - abs(x)) * (n.z - .5);
    x *= .7;
    float ti = fract(t + n.z);
    y = (Saw(.85, ti) - .5) * .9 + .5;
    vec2 p = vec2(x, y);

    float d = length((st - p) * a.yx);

    float mainDrop = S(.4, .0, d);

    float r = sqrt(S(1., y, st.y));
    float cd = abs(st.x - x);
    float trail = S(.23 * r, .15 * r * r, cd);
    float trailFront = S(-.02, .02, st.y - y);
    trail *= trailFront * r * r;

    y = UV.y;
    float trail2 = S(.2 * r, .0, cd);
    float droplets = max(0., (sin(y * (1. - y) * 120.) - st.y)) * trail2 * trailFront * n.z;
    y = fract(y * 10.) + (st.y - .5);
    float dd = length(st - vec2(x, y));
    droplets = S(.3, 0., dd);
    float m = mainDrop + droplets * r * trailFront;

    //m += st.x>a.y*.45 || st.y>a.x*.165 ? 1.2 : 0.;
    return vec2(m, trail);
}

float StaticDrops(vec2 uv, float t) {
    uv *= 40.;

    vec2 id = floor(uv);
    uv = fract(uv) - .5;
    vec3 n = N13(id.x * 107.45 + id.y * 3543.654);
    vec2 p = (n.xy - .5) * .7;
    float d = length(uv - p);

    float fade = Saw(.025, fract(t + n.z));
    float c = S(.3, 0., d) * fract(n.z * 10.) * fade;
    return c;
}

vec2 Drops(vec2 uv, float t, float l0, float l1, float l2) {
    float s = StaticDrops(uv, t) * l0;
    vec2 m1 = DropLayer2(uv, t) * l1;
    vec2 m2 = DropLayer2(uv * 1.85, t) * l2;

    float c = s + m1.x + m2.x;
    c = S(.3, 1., c);

    return vec2(c, max(m1.y * l0, m2.y * l1));
}

//random no.
float N21(vec2 p) {
    p = fract(p * vec2(123.34, 345.45));
    p += dot(p, p + 34.345);
    return fract(p.x * p.y);
}

void main() {
    vec2 uv = (gl_FragCoord.xy - .5 * u_resolution.xy) / u_resolution.y;
    vec2 UV = gl_FragCoord.xy / u_resolution.xy;//-.5;
    float T = u_time;

    //uniform texture scaling
    float screenAspect = u_resolution.x / u_resolution.y;
    float textureAspect = u_tex0_resolution.x / u_tex0_resolution.y;
    float scaleX = 1., scaleY = 1.;
    if(textureAspect > screenAspect)
        scaleX = screenAspect / textureAspect;
    else
        scaleY = textureAspect / screenAspect;
    UV = vec2(scaleX, scaleY) * (UV - 0.5) + 0.5;

    float t = T * .2 * u_speed;

    float rainAmount = u_intensity;
    float maxBlur = mix(3., 6., rainAmount);
    float minBlur = 1.;

    float zoom = u_panning ? -cos(T * .2) : 0.;
    uv *= (.7 + zoom * .3) * u_zoom;

    float staticDrops = S(-.5, 1., rainAmount) * 2.;
    float layer1 = S(.25, .75, rainAmount);
    float layer2 = S(.0, .5, rainAmount);

    vec2 c = Drops(uv, t, staticDrops, layer1, layer2);
    #ifdef CHEAP_NORMALS
        vec2 n = vec2(dFdx(c.x), dFdy(c.x));// cheap normals (3x cheaper, but 2 times shittier ;))
    #else
        vec2 e = vec2(.001, 0.) * u_normal;
        float cx = Drops(uv + e, t, staticDrops, layer1, layer2).x;
        float cy = Drops(uv + e.yx, t, staticDrops, layer1, layer2).x;
        vec2 n = vec2(cx - c.x, cy - c.x);		// expensive normals
    #endif

    float focus = mix(maxBlur-c.y, minBlur, S(.1, .2, c.x));
    vec3 col = textureLod(u_tex0, UV + n,focus).rgb;
    vec4 texCoord = vec4(UV.x + n.x, UV.y + n.y, 0, 1.0 * 25. * 0.01 / 7.);

    // if(u_blur) {
    //     float blur = 0.4 * 0.01;
    //     int blurIterations = 8;
    //     float a = N21(gl_FragCoord.xy) * 6.2831;
    //     for(int m = 0; m < blurIterations; m++) {
    //         vec2 offs = vec2(sin(a), cos(a)) * blur;
    //         float d = fract(sin((float(m) + 1.) * 546.) * 5424.);
    //         d = sqrt(d);
    //         offs *= d;
    //         col += texture2D(u_tex0, texCoord.xy + vec2(offs.x, offs.y)).xyz;
    //         a++;
    //     }
    //     col /= float(blurIterations);
    // }

    t = (T + 3.) * .5;			// make time sync with first lightnoing
    float fade = S(0., 10., T);							// fade in at the start
    if(u_post_processing) {
        //float colFade = sin(t * .2) * .5 + .5;
        col *= mix(vec3(1.), vec3(.8, .9, 1.3), 1.);	// subtle color shift
    }
    

    if(u_lightning) {
        float lightning = sin(t * sin(t * 10.));				// lighting flicker
        lightning *= pow(max(0., sin(t + sin(t))), 10.);		// lightning flash
        col *= 1. + lightning * fade * mix(1., .1, 0.);	// composite lightning
    }
    col *= 1. - dot(UV -= .5, UV) * 1.; // vignette

    gl_FragColor = vec4(col * u_brightness, 1);
}`,on=`// Raindrop vert shader
out vec2 uvInterpolator;

void main(){
    uvInterpolator = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,an=async()=>{var V,T;const[e,a,i,r,n,t,h,d,w]=f(),p=new j;q.enabled=!0;const o={u_tex0:{value:void 0,type:"t"},u_time:{value:0,type:"f"},u_blur:{value:!1,type:"b"},u_intensity:{value:.4,type:"f"},u_speed:{value:.25,type:"f"},u_brightness:{value:.75,type:"f"},u_normal:{value:.8,type:"f"},u_zoom:{value:1.4,type:"f"},u_panning:{value:!1,type:"b"},u_post_processing:{value:!1,type:"b"},u_lightning:{value:!1,type:"b"},u_resolution:{value:new E(window.innerWidth,window.innerHeight),type:"v2"},u_tex0_resolution:{value:new E(window.innerWidth,window.innerHeight),type:"v2"}},s=new N;w.instance=_(s);const b=new M(-1,1,1,-1,0,1);i.instance=_(b);const m=await new k().loadAsync("../../images/fujisan-tommy-silver-unsplash.webp");a.instance=_(m);const P=new W(50,50,1,1),v=new H({vertexShader:on,fragmentShader:tn,uniforms:o});v.uniforms.u_tex0.value=m,v.uniforms.u_tex0_resolution.value=new E(m.image.width,m.image.height);const z=new G(P,v),y=new B({canvas:document.querySelector("#bg"),antialias:!0,alpha:!0});d.instance=_(y),y.setPixelRatio(1),y.setSize(window.innerWidth,window.innerHeight),t.guiStore.gui&&(t.guiStore.gui.add(n,"fps").min(1).max(120).step(1),t.guiStore.gui.add(n,"blur").name("Blur"),t.guiStore.gui.add(n,"intensity").min(.1).max(1).step(.05),t.guiStore.gui.add(n,"speed").min(.1).max(1).step(.05),t.guiStore.gui.add(n,"brightness").min(.1).max(1).step(.05),t.guiStore.gui.add(n,"normal").min(.1).max(1).step(.05),t.guiStore.gui.add(n,"zoom").min(0).max(10).step(.05),t.guiStore.gui.add(n,"panning"),t.guiStore.gui.add(n,"lighting")),s.fog=new Y(1842218,.002),s.add(z),h.value&&t.guiStore.gui?t.guiStore.gui.show():(V=t.guiStore.gui)==null||V.hide();const D=()=>{setTimeout(()=>{requestAnimationFrame(D)},1e3/n.fps),t.guiStore.gui&&(o.u_blur.value=n.blur,o.u_intensity.value=n.intensity,o.u_speed.value=n.speed,o.u_brightness.value=n.brightness,o.u_normal.value=n.normal,o.u_zoom.value=n.zoom,o.u_panning.value=n.panning,o.u_lightning.value=n.lighting),p.getElapsedTime()>21600&&p.start(),v.uniforms.u_time.value=p.getElapsedTime(),y.render(s,b)};D();const x=await new Audio("../../audio/rain.mp3");x.loop=!0,x.autoplay=!0,e.instance=_(x),(T=r.value)==null||T.appendChild(x)},c=Object.freeze(Object.defineProperty({__proto__:null,_hW:I,s_5NbohcUFdSY:J,s_6RBosaJUFCo:K,s_EFKQR5Puf8I:nn,s_G9aZF9HFGe4:an,s_Zzw4AobWppI:$,s_gvyyswKs67c:Q,s_repJ0SMMyNA:en,s_wUA29ca4V2o:Z},Symbol.toStringTag,{value:"Module"}));export{I as _hW,J as s_5NbohcUFdSY,K as s_6RBosaJUFCo,nn as s_EFKQR5Puf8I,an as s_G9aZF9HFGe4,$ as s_Zzw4AobWppI,Q as s_gvyyswKs67c,en as s_repJ0SMMyNA,Z as s_wUA29ca4V2o};
