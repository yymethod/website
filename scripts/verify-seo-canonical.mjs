import fs from "node:fs";
const canonicals={"index.html":"https://yymethod.com/","doctrine/index.html":"https://yymethod.com/doctrine/","work/index.html":"https://yymethod.com/work/","violin/index.html":"https://yymethod.com/violin/","music-practice-rpg/index.html":"https://yymethod.com/music-practice-rpg/","violin-pitch-builder/index.html":"https://yymethod.com/violin-pitch-builder/","violin-for-parents/index.html":"https://yymethod.com/violin-for-parents/","privacy/index.html":"https://yymethod.com/privacy/","terms/index.html":"https://yymethod.com/terms/","cookies/index.html":"https://yymethod.com/cookies/","accessibility/index.html":"https://yymethod.com/accessibility/","ai-disclosure/index.html":"https://yymethod.com/ai-disclosure/","copyright/index.html":"https://yymethod.com/copyright/","contact/index.html":"https://yymethod.com/contact/"};
for(const [file,url] of Object.entries(canonicals)){
  const html=fs.readFileSync(new URL("../"+file,import.meta.url),"utf8");
  const expected='<link rel="canonical" href="'+url+'" />';
  if(!html.includes(expected)) throw new Error(file+" missing self-canonical");
  if((html.match(/rel="canonical"/g)||[]).length!==1) throw new Error(file+" must have exactly one canonical");
}
const vercel=JSON.parse(fs.readFileSync(new URL("../vercel.json",import.meta.url),"utf8"));
if(vercel.trailingSlash!==true) throw new Error("Vercel trailingSlash must be true");
const work=fs.readFileSync(new URL("../work/index.html",import.meta.url),"utf8");
if(work.includes("home.yymethod.com/#yy-method-home")) throw new Error("/work/ still contains Home Edition identity JSON-LD");
const sitemap=fs.readFileSync(new URL("../sitemap.xml",import.meta.url),"utf8");
if(sitemap.includes("https://yymethod.com/authenticity/")) throw new Error("undeployed authenticity URL remains in sitemap");
if((sitemap.match(/<url>/g)||[]).length!==14) throw new Error("sitemap must contain 14 deployed HTML URLs");
console.log("yymethod canonical SEO contract ok");
