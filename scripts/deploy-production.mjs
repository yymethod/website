import {execFileSync} from "node:child_process";
execFileSync("vercel",["deploy","--prod","--yes"],{stdio:"inherit"});
console.log("yymethod production deployment command completed");
