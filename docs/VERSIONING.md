# Versioning Pyxis

Project belum membutuhkan workflow versioning custom.

## Aturan

- Gunakan version di `package.json`.
- Gunakan Semantic Versioning saat release publik dimulai.
- Tag release hanya setelah migration, build, smoke test, dan rollback plan lolos.
- Changelog harus menjelaskan perubahan user-facing, migration, environment variable, dan risiko rollback.
- Gunakan npm; tidak ada script version custom saat ini.

Jangan membuat automation versioning sebelum release process nyata membutuhkan.
