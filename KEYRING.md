# 🔑 KEYRING

This repository uses **signed commits and tags** with GPG for provenance.

---

## 🔐 Active Keys

### Key 1
- **Owner**: Ben Chan
- **Email**: benchanviolin@gmail.com
- **Fingerprint**: 63FC60BA7F66F645CFBF9C8482BBD72944B8168E
- **Created**: 2025-08-16
- **Purpose**: Commit and tag signing
- **Public key**: [`keys/public-key.asc`](keys/public-key.asc)

---

## 🗃️ Retired Keys

*(List any old fingerprints here when you rotate keys. Keep them for historical verification.)*

- **Fingerprint**: `OLD-FPR-HERE`
- **Retired**: YYYY-MM-DD
- **Notes**: Used before rotation.

---

## 🔍 Verification Instructions

1. **Import the public key**  
   ```bash
   gpg --import keys/public-key.asc

## Key Scope and Rotation Policy

- This GPG key (fingerprint: 63FC60BA7F66F645CFBF9C8482BBD72944B8168E) currently signs commits and releases
  across all of my repositories.
- If projects grow in scope, I may introduce **project-specific release keys**.
- Any new keys will be published in this KEYRING.md, Archive.org, and social
  channels, with revocation certificates for old keys where applicable.
- Auditors should always cross-check fingerprints against at least two
  independent sources (e.g. repo + Archive.org, or repo + X/Bluesky).

