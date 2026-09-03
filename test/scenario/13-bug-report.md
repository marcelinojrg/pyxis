# QA Bug Report

## Template

```text
ID:
Judul:
Severity: Blocker / Critical / High / Medium / Low
Environment: Local / Preview / Production
Build/commit:
Tester:
Tanggal:

Precondition:
Langkah reproduksi:
Expected result:
Actual result:
Frequency: Always / Intermittent / Once
Evidence: screenshot/video/log tanpa secret
Data uji:
Status: Open / In progress / Fixed / Retest / Closed
```

## Severity

- `Blocker`: test/release tidak dapat berjalan.
- `Critical`: bypass auth, kehilangan data, atau crash fitur inti.
- `High`: CRUD inti gagal atau data salah tersimpan.
- `Medium`: fungsi masih bisa dipakai dengan workaround.
- `Low`: visual, copy, atau minor usability.

## Retest

- [ ] Gunakan build terbaru.
- [ ] Ulangi langkah reproduksi.
- [ ] Pastikan fix tidak merusak area terkait.
- [ ] Update status dan evidence.
