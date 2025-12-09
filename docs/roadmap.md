# Roadmap & Checklist tới MVP

## Nguyên tắc
- Ưu tiên dòng chảy Booking → Confirm → Join Discord → Feedback log.
- Mọi hạng mục đánh dấu `[ ]` và cập nhật khi hoàn thành.

## Backend (NestJS + Prisma + Postgres) — 1-2 ngày
- [ ] Kết nối Postgres, `npx prisma migrate dev` + `prisma generate`.
- [ ] Implement repo/service Booking (create/confirm/cancel) lưu DB, tính `price` từ hourlyRate, set `discordChannelId`/`inviteLink` từ mock DiscordService.
- [ ] API invite: GET `/booking/:id/invite` trả invite + channel; thêm validation cơ bản DTO.

## Discord Integration (giữ mock để ra MVP) — 0.5 ngày
- [ ] Duy trì mock `createPrivateRoom`, đảm bảo invite deterministic và trả về trên confirm.
- [ ] Hook mock vào Booking confirm flow và UI Join button.
- [ ] (Ghi chú) Chuẩn bị interface để sau tuần này có thể swap Discord.js.

## Frontend (Next.js + Tailwind) — 2 ngày
- [ ] Gọi API booking từ Home (Book) và lưu booking PENDING.
- [ ] Sherpa dashboard: fetch pending by sherpaId, Accept/Reject → confirm/cancel API.
- [ ] Learner dashboard: fetch confirmed by learnerId, nút Join dùng invite API; thêm loading/error tối giản.

## AuthN/AuthZ (mock nhanh) — 0.5-1 ngày
- [ ] Mock session bằng query/header (learnerId/sherpaId) để test flow.
- [ ] Hardcode role check tối thiểu ở controller (Learner tạo booking, Sherpa confirm/cancel).
- [ ] Ghi chú kế hoạch tích hợp OAuth/Discord sau MVP.

## Payments/Credits (giản lược) — 0.5 ngày
- [ ] Lưu `price` vào booking dựa trên `SherpaProfile.hourlyRate`.
- [ ] Ghi TODO cho thanh toán thực (Stripe/credit) sau MVP; không chặn luồng.

## Observability & Quality (tối giản tuần 1) — 0.5 ngày
- [ ] Healthcheck endpoint.
- [ ] Logger cơ bản (console/pino lite).
- [ ] Happy-path test cho booking confirm (1-2 case) hoặc postman collection.

## DevEx & Ops (tối giản) — 0.5 ngày
- [ ] Scripts sẵn: `npm run dev` (client), `npm run start:dev` (api).
- [ ] Seed tối thiểu: games + 1-2 sherpa profiles.
- [ ] Thêm `.env.example` (DB, PORT, placeholder Discord).

## Launch Checklist (MVP tuần 1)
- [ ] Flow booking end-to-end chạy với Postgres thật.
- [ ] Join Discord (mock invite) hoạt động từ Learner dashboard.
- [ ] Feedback log endpoint nhận payload và lưu SessionLog (chưa cần UI).
- [ ] UI Learner/Sherpa dùng được trên desktop, mobile cơ bản.
- [ ] Tài liệu cập nhật: README, guide, roadmap trạng thái mới nhất.

