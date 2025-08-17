# Commit Verification Guide

This repository includes a helper script (`verify.sh`) and associated
public key material to allow anyone to verify that commits were signed
by the expected maintainer.

## Requirements

-   macOS or Linux
-   `git`
-   `gpg` (GnuPG)
-   `curl`

Check installation:

``` bash
git --version
gpg --version
```

If `gpg` is missing on macOS, install via Homebrew:

``` bash
brew install gnupg
```

## Usage

Run the verification script with the commit SHA you want to check:

``` bash
./verify.sh <commit-sha>
```

Example:

``` bash
./verify.sh d34db33fd34db33fd34db33fd34db33fd34db33f
```

## What the script does

1.  Clones this repository into a temporary directory (without full
    history).
2.  Downloads and validates the expected public key (`public-key.asc`).
3.  Imports the key into a temporary keyring.
4.  Ensures the provided commit SHA exists.
5.  Verifies the commit signature.
6.  Confirms the signature's fingerprint matches the expected
    fingerprint.

If all checks succeed, you will see:

    OK: Commit exists, signature good, and signed by expected fingerprint (FPR).

If anything fails (bad SHA, invalid signature, wrong key), an error
message is displayed but your shell remains active.

## Security Note

-   Only **public** key material and fingerprints are included here.
-   No private keys or secrets are exposed.
-   This setup is safe to publish and intended for auditors or anyone
    wishing to validate repository integrity.

