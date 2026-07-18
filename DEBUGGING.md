# Debugging Log

This file documents errors encountered during the development of Gondrong Exchange and their respective solutions, demonstrating professional problem-solving practices.

## How to use this log
- **Date**: When the error occurred.
- **Error**: The exact error message or symptom.
- **Cause**: Brief explanation of why it happened.
- **Solution**: Step-by-step how it was fixed.

---

## [Date] - [Brief Error Description]
- **Error**: [Paste exact error message]
- **Cause**: [Brief explanation of why it happened]
- **Solution**: [Step-by-step how it was fixed]

## 2026-07-18 - Module Not Found: Can't resolve './providers'
- **Error**: `Module not found: Can't resolve './providers' in app/layout.tsx`
- **Cause**: File `app/providers.tsx` belum terbuat atau salah lokasi saat mencoba mengimpor Wallet Provider ke `layout.tsx`.
- **Solution**: 
  1. Membuat file baru bernama `providers.tsx` secara manual di dalam folder `app/`.
  2. Menyalin kode konfigurasi `ConnectionProvider` dan `WalletProvider` (mengarah ke Devnet) ke dalam file tersebut.
  3. Menyimpan file (`Ctrl + S`) agar Next.js Turbopack mendeteksi perubahan dan melakukan hot-reload.