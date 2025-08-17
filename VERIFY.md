# 🔍 Verification Instructions

This document shows how anyone can independently verify that the signing key and commits in this repository are authentic and immutable.  
No prior knowledge of GPG or Bitcoin is required — just follow the steps in order.

---

## 📊 Trust Layers Overview

```
GitHub repo   -> Primary publication
   |
   +-- X / Bluesky -> Out-of-band witness
   |
   +-- Archive.org -> (optional) Immutable institutional backup
   |
   +-- OpenTimestamps -> Bitcoin cryptographic anchor
           |
           +-- Miners -> Global consensus security
```

Each layer is independent. Even if one is compromised, the others remain valid.

---

## 1. Verify the Public Key Integrity

Check that the `public-key.asc` file has not been altered.

```bash
shasum -a 256 keys/public-key.asc
# Must equal: 4560c6d0fe25d7af8f217d412b3ddcf24fef8d8e8f57b828aa07e548b891d227
```

✅ If the hash matches exactly, the file is authentic.

---

## 2. Import the Key and Confirm Its Fingerprint

```bash
gpg --import keys/public-key.asc
gpg --show-keys --with-colons keys/public-key.asc | awk -F: '/^fpr:/ {print toupper($10); exit}'
# Must equal: 63FC60BA7F66F645CFBF9C8482BBD72944B8168E
```

✅ If the fingerprint matches, you are using the correct key.

---

## 3. Verify Commits or Tags Signed with the Key

To confirm a specific commit or tag was signed with this key:

```bash
# For a commit
git log --show-signature -1 <commit-sha>

# For a tag
git tag -v <tag-name>
```

✅ Output should show `Good signature from "Ben Chan …"` and the correct fingerprint.

---

## 4. Verify Out-of-Band Publication (Redundancy)

The same public key is also published outside GitHub, so you can confirm it matches:

- X: https://x.com/yymethod2025  
- Bluesky: https://bsky.app/profile/benchantech.bsky.social  
- Archive.org: https://archive.org/details/keyring_202508  

✅ Download the public key from these links and compare it to `keys/public-key.asc` — the SHA256 hash must be identical.

---

## 5. Verify Bitcoin Timestamp Proofs (OpenTimestamps)

Each file is cryptographically anchored into the Bitcoin blockchain. This makes the timestamp immutable and independent of GitHub or any website.

### Install OpenTimestamps
```bash
brew install pipx
pipx install opentimestamps-client
```

### Check the proofs
```bash
# Verify the public key timestamp
ots upgrade keys/public-key.asc.ots
ots verify --file keys/public-key.asc keys/public-key.asc.ots

# Verify the KEYRING.md timestamp
ots upgrade KEYRING.md.ots
ots verify --file KEYRING.md KEYRING.md.ots
```

✅ Once Bitcoin confirmations are in, you will see output like:  
```
Success! File timestamped at 2025-08-16 14:22:37 UTC
```

Record this UTC time as the permanent anchor.

---

## 6. (Optional) Archive.org Snapshots

Immutable snapshots of this repository and key files **can also be stored** at Archive.org (Wayback Machine).  
At present, this step is not enforced because automated archiving has been unreliable.  

If/when working:  
- Example link format:  
  https://web.archive.org/web/<TIMESTAMP>/https://raw.githubusercontent.com/yymethod/website/<commit>/keys/public-key.asc

✅ Compare the archived file against your local copy — the SHA256 hash must be identical.

Treat this as **future redundancy**. All core immutability layers (SHA256, GPG, OTS) already provide strong guarantees. Archive.org adds extra resilience but is not required for verification today.

---

## ✅ Summary

By completing the above steps you confirm:  
1. The file has the correct SHA256 hash.  
2. The GPG fingerprint matches.  
3. Commits/tags are signed with this key.  
4. The same key is published on multiple independent platforms.  
5. The key and metadata are anchored immutably in Bitcoin.  
6. (Optional) Archive.org can provide historical snapshots in the future.  

This layered approach ensures **independent, global, and permanent verification**.
