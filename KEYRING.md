# Maintainer Signing Key

### Key 1

-   **Owner**: Ben Chan
-   **Email**: benchanviolin@gmail.com
-   **Fingerprint**: `63FC60BA7F66F645CFBF9C8482BBD72944B8168E`
-   **SHA256 of `keys/public-key.asc`**:
    `4560c6d0fe25d7af8f217d412b3ddcf24fef8d8e8f57b828aa07e548b891d227`
-   **Created**: 2025-08-16
-   **Purpose**: Commit and tag signing
-   **Key ID (long)**: `0x82BBD72944B8168E`
-   **Algorithm / Size**: \<FILL IN: e.g., ed25519 or RSA-4096\>
-   **Public key**: [`keys/public-key.asc`](keys/public-key.asc)
-   **X**: https://x.com/yymethod2025 (pinned fingerprint)
-   **Bluesky**: https://bsky.app/profile/benchantech.bsky.social
    (pinned fingerprint)
-   **Archive.org snapshots**:
    -   `public-key.asc`: `<PASTE_VERSIONED_SNAPSHOT_URL>`{=html}
    -   `KEYRING.md`: `<PASTE_VERSIONED_SNAPSHOT_URL>`{=html}

------------------------------------------------------------------------

## 🔍 Verification Instructions

1)  Verify file integrity (SHA256)

``` bash
shasum -a 256 keys/public-key.asc
# Must equal: 4560c6d0fe25d7af8f217d412b3ddcf24fef8d8e8f57b828aa07e548b891d227
```

2)  Import the key and confirm fingerprint

``` bash
gpg --import keys/public-key.asc
gpg --with-colons keys/public-key.asc | awk -F: '/^fpr:/ {print toupper($10); exit}'
# Must equal: 63FC60BA7F66F645CFBF9C8482BBD72944B8168E
```

3)  Verify a commit or tag

``` bash
# commit
git log --show-signature -1 <commit-sha>
# or, tag
git tag -v <tag-name>
```

Signature must be **Good** and the signer's fingerprint must match:
`63FC60BA7F66F645CFBF9C8482BBD72944B8168E`.

------------------------------------------------------------------------

## 🚨 Compromise & Rotation Procedure

If this key is suspected compromised or retired: 1. Publish a signed
revocation certificate. 2. Add the revoked key under **Retired Keys**
with date and reason. 3. Introduce the new key here with fingerprint +
SHA256. 4. Update pinned posts (X/Bluesky) and add new Archive.org
snapshots. 5. Add a signed Git tag note in this repo announcing the new
fingerprint. 6. Keep both old (revoked) and new keys documented for
audit continuity.

------------------------------------------------------------------------

## Retired Keys

*No retired keys at this time.*

When a key is retired, document it here with: - Fingerprint - SHA256 of
the exported public key - Date of retirement - Reason (rotation,
compromise, deprecation) - Revocation certificate block (if available) -
Replacement key reference

------------------------------------------------------------------------

## Machine-Readable Metadata

``` json
{
  "owner": "Ben Chan",
  "email": "benchanviolin@gmail.com",
  "fingerprint": "63FC60BA7F66F645CFBF9C8482BBD72944B8168E",
  "public_key_path": "keys/public-key.asc",
  "sha256_public_key": "4560c6d0fe25d7af8f217d412b3ddcf24fef8d8e8f57b828aa07e548b891d227",
  "created": "2025-08-16",
  "purpose": ["commit-signing", "tag-signing"],
  "out_of_band": {
    "x": "https://x.com/yymethod2025",
    "bluesky": "https://bsky.app/profile/benchantech.bsky.social",
    "archive_public_key": "<PASTE_VERSIONED_SNAPSHOT_URL>",
    "archive_keyring": "<PASTE_VERSIONED_SNAPSHOT_URL>"
  }
}
```
