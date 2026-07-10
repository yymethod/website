#!/usr/bin/env node
// Stamps partials/header.html and partials/footer.html into every page listed
// below, between the SITE-HEADER / SITE-FOOTER marker comments. Output is
// plain static HTML (no client-side include) so crawlers and no-JS clients
// see the real header/footer. Edit the partials, then re-run this script.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const PAGES = [
  'index.html',
  'work/index.html',
  'violin/index.html',
];

function stamp(marker, partialContent, pageContent, pageName) {
  const startTag = `<!-- SITE-${marker}:START -->`;
  const endTag = `<!-- SITE-${marker}:END -->`;
  const re = new RegExp(`${startTag}[\\s\\S]*?${endTag}`);
  if (!re.test(pageContent)) {
    throw new Error(`${pageName}: missing ${startTag} ... ${endTag} markers`);
  }
  const replacement = `${startTag}\n${partialContent.trim()}\n${endTag}`;
  return pageContent.replace(re, replacement);
}

const header = fs.readFileSync(path.join(ROOT, 'partials/header.html'), 'utf8');
const footer = fs.readFileSync(path.join(ROOT, 'partials/footer.html'), 'utf8');

for (const page of PAGES) {
  const file = path.join(ROOT, page);
  let content = fs.readFileSync(file, 'utf8');
  content = stamp('HEADER', header, content, page);
  content = stamp('FOOTER', footer, content, page);
  fs.writeFileSync(file, content);
  console.log(`synced ${page}`);
}
