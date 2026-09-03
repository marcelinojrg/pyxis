# QA-PUBLIC — Halaman Publik

## Route checklist

Uji sebagai guest:

- [ ] `/`
- [ ] `/about`
- [ ] `/products`
- [ ] `/blog`
- [ ] `/careers`
- [ ] `/contact`
- [ ] `/legal`
- [ ] `/partners`

Expected setiap route:

- [ ] HTTP 200.
- [ ] Tidak blank page.
- [ ] Navbar dan footer tampil.
- [ ] Link internal tidak 404.
- [ ] Tidak ada error di browser console.

## Detail dinamis

- [ ] `/products/[slug]` valid menampilkan detail.
- [ ] `/products/slug-tidak-ada` menampilkan not found.
- [ ] `/blog/[slug]` valid menampilkan artikel terbit.
- [ ] `/blog/slug-tidak-ada` menampilkan not found.
- [ ] `/careers/[slug]` valid menampilkan lowongan aktif.
- [ ] Slug draft/nonaktif tidak dapat diakses publik.
