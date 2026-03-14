# YY Method Applied: Walkthrough

This is a point-by-point account of how the YY Method was applied to a domain I previously knew nothing about: **cryptographic immutability proofs** (GPG, commit signing, timestamping).  
The goal was to prove that I could reach fluency in hours, not months, and leave behind artifacts that anyone can verify.  

---

## Step-by-Step

### 1. Baseline Setup
- Began with zero knowledge of GPG or commit signing.  
- Used only a laptop, terminal, and public documentation.  
- Constraint: no outside tutors, only iterative testing + AI queries.  

### 2. Core Script
- Wrote a shell script that:  
  - Cloned a repo.  
  - Imported a public key.  
  - Verified commit signatures.  
  - Checked fingerprints against expected values.  
- Hardened it to handle bad input safely.  

### 3. Key Identity
- Generated a public PGP key.  
- Exported it as `public-key.asc`.  
- Calculated its SHA256 checksum.  
- Confirmed the fingerprint matched expectations.  
- Documented these in `KEYRING.md`.  

### 4. Verification Process
- Built two guides:  
  - `VERIFY.md` → full step-by-step instructions for auditors.  
  - `VERIFY_QUICK.md` → a compressed checklist for those short on time.  
- Tested both workflows myself as if I were an external auditor.  

### 5. Out-of-Band Anchors
- Published signals on social platforms (posts containing the checksum + fingerprint).  
- Attempted archiving on external services (some worked, some did not).  
- This ensured proof wasn’t locked only to the repo.  

### 6. Bitcoin Anchoring
- Used OpenTimestamps to anchor the public key file into the Bitcoin blockchain.  
- Received `.ots` proof files.  
- Verified against multiple calendars, awaiting confirmations.  

### 7. Attack Simulation
- Tested scenarios:  
  - Tampered keys.  
  - Imposter keys.  
  - Missing fingerprints.  
- Ensured my process caught all failures.  

### 8. Fluency Achieved
- At this point, I had:  
  - A working immutability verification system.  
  - Auditor-ready documentation.  
  - Anchors in multiple out-of-band systems.  
- Time taken: ~5 hours.  

---

## Why This Matters
- Shows the **YY Method’s compression effect**: fluency from zero in hours.  
- Leaves behind public, verifiable artifacts.  
- Demonstrates resilience against tampering.  
- Provides both a **story** (this walkthrough) and **proof** (the repo artifacts).  

---

## Next Steps
If you find this process compelling:  
- The **compressed case study** is available in the repo root.  
- **Planned:** office hours + community support. These will require an external signal.  
- Bookmark **[yymethod.com](https://yymethod.com)** and watch for updates, including an opportunity to join an email list.  
