# QA-DEPLOY — Health dan Deployment

## Quality gate

```powershell
npm run typecheck
npm run lint
npm run build
```

Expected semua command exit code `0`.

## Health

```powershell
Invoke-WebRequest http://localhost:3000/api/health | Select-Object StatusCode, Content
```

Expected saat database sehat:

```json
{"status":"ok","service":"pyxis"}
```

Expected status HTTP: `200`.

## Preview

- [ ] Environment Preview lengkap.
- [ ] `DATABASE_URL` memakai pooler aplikasi.
- [ ] `DIRECT_URL` memakai koneksi migration.
- [ ] Migration sudah dijalankan.
- [ ] Admin login berhasil.
- [ ] CRUD CMS berhasil.
- [ ] ImageKit upload/delete berhasil.
- [ ] Public smoke test berhasil.

## Production gate

- [ ] Backup dibuat.
- [ ] Restore backup pernah diuji.
- [ ] Commit yang diuji sudah dicatat.
- [ ] Migration production disetujui.
- [ ] Rollback aplikasi dipahami.
- [ ] Monitoring/error log aktif.
- [ ] Tidak ada secret di repository.
