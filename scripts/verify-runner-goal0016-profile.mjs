import fs from "node:fs";
const manifest=JSON.parse(fs.readFileSync(new URL("../ops/runner/manifest.json",import.meta.url),"utf8"));
if(manifest.repositoryId!=="yymethod"||manifest.repositoryFullName!=="yymethod/website") throw new Error("repository identity mismatch");
const readiness=manifest.profiles?.find(x=>x.profileId==="goal-0016-site-readiness");
const deploy=manifest.profiles?.find(x=>x.profileId==="goal-0016-deploy-production");
if(!readiness||!deploy) throw new Error("required profiles missing");
if(readiness.branchRegex!=="^goal-0016-run-[A-Za-z0-9._-]+$"||deploy.branchRegex!=="^goal-0016-run-[A-Za-z0-9._-]+$") throw new Error("branch authority widened");
console.log("yymethod GOAL-0016 runner profiles ok");
