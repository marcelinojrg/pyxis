# QA-REGRESSION — Regression dan Release Sign-off

## Regression minimum

- [ ] Guest dapat membuka 8 route publik.
- [ ] Guest ditolak dari semua route admin.
- [ ] Admin valid dapat login.
- [ ] Admin invalid ditolak.
- [ ] Produk CRUD berhasil.
- [ ] Blog draft/publish/delete berhasil.
- [ ] Karier draft/publish/delete berhasil.
- [ ] Upload dan delete ImageKit berhasil.
- [ ] Contact valid/invalid sesuai expected.
- [ ] Responsive dan keyboard test lulus.
- [ ] Health endpoint 200.
- [ ] Typecheck, lint, build lulus.

## Sign-off

Catat:

- Build/commit:
- Environment: Local / Preview / Production
- Tester:
- Tanggal:
- PASS:
- FAIL:
- BLOCKED:
- Bug critical/high terbuka:
- Keputusan release: GO / NO-GO

## Stop release jika

- Authentication bypass.
- Data user/content hilang.
- Migration gagal.
- Upload menyimpan secret di client.
- Health endpoint gagal.
- CRUD inti gagal.
- Bug critical/high belum memiliki keputusan.
