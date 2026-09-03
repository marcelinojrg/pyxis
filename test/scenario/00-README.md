# QA Test Plan Pyxis

## Urutan eksekusi

1. Baca `01-environment.md`.
2. Jalankan smoke test otomatis.
3. Jalankan auth dan CMS.
4. Jalankan public, security, responsive, SEO, dan deployment.
5. Catat bug di `13-bug-report.md`.

## Perintah otomatis

```powershell
npm run typecheck
npm run lint
npm run build
npm run test:cms
npm exec -- playwright test test/test-case/cms-crud-live.spec.ts
```

## Aturan QA

- Gunakan data uji dengan prefix `QA-YYYYMMDD-`.
- Jangan memakai password production untuk test lokal.
- Jangan publish data uji ke halaman publik.
- Hapus data uji setelah test selesai.
- Jangan menguji atau mengirim email; email/SMTP masih ditunda.
- Jangan menyimpan secret, token, atau password di screenshot/report.

## Status hasil

- `PASS`: hasil aktual sesuai expected.
- `FAIL`: hasil berbeda dan ada bukti.
- `BLOCKED`: tidak dapat diuji karena dependency/environment.
- `N/A`: tidak termasuk scope test tersebut.
