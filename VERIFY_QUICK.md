# ✅ Quick Verification Checklist

For auditors who need the shortest path.  
Each check is deterministic — if it passes, immutability is guaranteed.  
For details, see `VERIFY.md`.

---

## 1. File Integrity (SHA256)
```bash
shasum -a 256 keys/public-key.asc
# Must equal: 4560c6d0fe25d7af8f217d412b3ddcf24fef8d8e8f57b828aa07e548b891d227
```

---

## 2. Fingerprint
```bash
gpg --show-keys --with-colons keys/public-key.asc | awk -F: '/^fpr:/ {print toupper($10); exit}'
# Must equal: 63FC60BA7F66F645CFBF9C8482BBD72944B8168E
```

---

## 3. Signed Commit/Tag
```bash
git log --show-signature -1 <commit-sha>
# OR
git tag -v <tag-name>
```
✅ Output must say `Good signature` and show the fingerprint.

---

## 4. Out-of-Band Check
Compare `keys/public-key.asc` hash against any copy here:  
- X: https://x.com/yymethod2025  
- Bluesky: https://bsky.app/profile/benchantech.bsky.social  
- Archive.org: https://archive.org/details/keyring_202508  

✅ All hashes must match.

---

## 5. Bitcoin Timestamp (OTS)
```bash
ots upgrade keys/public-key.asc.ots
ots verify --file keys/public-key.asc keys/public-key.asc.ots
```
✅ Must return a successful timestamp with UTC time.

---

### 🔒 Done
If all checks pass:  
- File is authentic  
- Key is valid  
- Commit is signed  
- Proofs are immutable  
