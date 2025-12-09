# eSportGuru – Hướng dẫn nhanh

## Giới thiệu
Nền tảng kết nối Learner và Sherpa (coach eSports). Web quản lý booking, Discord là nơi dạy/học. Backend NestJS + Prisma/PostgreSQL, Frontend Next.js App Router + Tailwind, Discord mock để Join Room ngay.

## Cách chạy dự án (local)
1) Cài Node 18+ (khuyến nghị 20) và PostgreSQL.  
2) Clone repo, cài dependency gốc:
```bash
npm install
```
3) Backend:
```bash
cd apps/api
npm install
echo DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/esportguru" > .env
echo PORT=3001 >> .env
# Sau khi dùng Prisma: npx prisma migrate dev --name init && npx prisma generate
npm run start:dev
```
API mặc định: http://localhost:3001

4) Frontend:
```bash
cd apps/client
npm install
npm run dev
```
Web: http://localhost:3000

## Cách sử dụng (MVP flow)
- Learner book Sherpa: POST `/booking` (status PENDING).
- Sherpa confirm: POST `/booking/:id/confirm` -> sinh `discordChannelId` + `inviteLink` giả.
- Learner/Sherpa lấy link join: GET `/booking/:id/invite`, bấm “Join Discord Room” trên UI.
- Sherpa reject: POST `/booking/:id/reject`.

## Thư mục chính
- `apps/api`: NestJS modules (Booking, Sherpa, Discord mock), Prisma schema.
- `apps/client`: Next.js pages (Home, Sherpa Dashboard, Learner Dashboard), Tailwind config.
- `apps/api/prisma/schema.prisma`: mô hình DB.

## Lưu ý
- Discord Service đang giả lập; khi có bot thật, thay thế logic trong `discord.service.ts`.
- Services booking/sherpa đang in-memory để demo; cần nối Prisma/Postgres cho môi trường thật.

