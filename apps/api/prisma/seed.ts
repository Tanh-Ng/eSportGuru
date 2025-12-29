import bcrypt from "bcrypt"

import {
  PrismaClient,
  Role,
  SherpaAvailability,
  BookingStatus
} from "@prisma/client";

const prisma = new PrismaClient();

const games = [
  { name: "Valorant", imageUrl: "hhh" },
  { name: "League of Legends", imageUrl: "hhh" },
  { name: "Dota 2", imageUrl: "hhh" },
  { name: "CS2", imageUrl: "hhh" },
  { name: "Apex Legends", imageUrl: "hhh" },
  { name: "PUBG", imageUrl: "hhh" },
  { name: "Overwatch 2", imageUrl: "hhh" },
  { name: "Fortnite", imageUrl: "hhh" },
  { name: "Rainbow Six Siege", imageUrl: "hhh" },
  { name: "Rocket League", imageUrl: "hhh" },
];

export const mockExpertsExtra = [
  { name: "Sora Nakano", avatar: "https://i.pravatar.cc/150?img=1", experience: 4, rating: 4.9 },
  { name: "Yuki Hiroshi", avatar: "https://i.pravatar.cc/150?img=2", experience: 6, rating: 5.0 },
  { name: "Aimi Tanaka", avatar: "https://i.pravatar.cc/150?img=5", experience: 3, rating: 4.7 },
  { name: "Kaito Shira", avatar: "https://i.pravatar.cc/150?img=8", experience: 5, rating: 4.8 },
  { name: "Rina Sakuragi", avatar: "https://i.pravatar.cc/150?img=9", experience: 2, rating: 4.5 },
  { name: "Kenji Sato", avatar: "https://i.pravatar.cc/150?img=12", experience: 7, rating: 4.9 },
  { name: "Hana Midori", avatar: "https://i.pravatar.cc/150?img=16", experience: 4, rating: 4.6 },
  { name: "Tatsuya Fujii", avatar: "https://i.pravatar.cc/150?img=18", experience: 8, rating: 5.0 },
  { name: "Mei Misaki", avatar: "https://i.pravatar.cc/150?img=21", experience: 3, rating: 4.4 },
  { name: "Ren Ichigo", avatar: "https://i.pravatar.cc/150?img=33", experience: 5, rating: 4.7 },
  { name: "Kiyomi Nara", avatar: "https://i.pravatar.cc/150?img=32", experience: 2, rating: 4.3 },
  { name: "Haru Yoshida", avatar: "https://i.pravatar.cc/150?img=11", experience: 6, rating: 4.8 },
  { name: "Sayuri Hime", avatar: "https://i.pravatar.cc/150?img=26", experience: 4, rating: 4.9 },
  { name: "Ryota Zen", avatar: "https://i.pravatar.cc/150?img=13", experience: 7, rating: 4.7 },
  { name: "Akane Kuro", avatar: "https://i.pravatar.cc/150?img=23", experience: 5, rating: 4.6 },
  { name: "Shinichi Kai", avatar: "https://i.pravatar.cc/150?img=14", experience: 9, rating: 5.0 },
  { name: "Yumi Azusa", avatar: "https://i.pravatar.cc/150?img=25", experience: 3, rating: 4.5 },
  { name: "Kazuto Kirigaya", avatar: "https://i.pravatar.cc/150?img=15", experience: 6, rating: 4.8 },
  { name: "Miku Hatsune", avatar: "https://i.pravatar.cc/150?img=20", experience: 2, rating: 4.9 },
  { name: "Sho Kurusu", avatar: "https://i.pravatar.cc/150?img=17", experience: 4, rating: 4.4 },
  { name: "Nozomi Toujou", avatar: "https://i.pravatar.cc/150?img=24", experience: 5, rating: 4.7 },
  { name: "Genji Shimada", avatar: "https://i.pravatar.cc/150?img=27", experience: 10, rating: 5.0 },
  { name: "Eri Ayase", avatar: "https://i.pravatar.cc/150?img=28", experience: 4, rating: 4.8 },
  { name: "Zoro Ronoa", avatar: "https://i.pravatar.cc/150?img=29", experience: 8, rating: 4.9 },
  { name: "Nami Orange", avatar: "https://i.pravatar.cc/150?img=30", experience: 6, rating: 4.7 }
];


/////
async function seedGames() {
  for (const game of games) {
    await prisma.game.upsert({
      where: { name: game.name },
      update: {
        imageUrl: game.imageUrl, // ✅ update game cũ
      },
      create: {
        name: game.name,
        imageUrl: game.imageUrl,
      },
    });
  }
  console.log("✅ Games seeded");
}

/////
async function seedUsers() {
  const admins = [
    { email: "admin1@esportguru.com", roles: [Role.ADMIN] },
    { email: "admin2@esportguru.com", roles: [Role.ADMIN] },
  ];

  const learners = Array.from({ length: 18 }).map((_, i) => ({
    email: `learner${i + 1}@test.com`,
    roles: [Role.LEARNER],
  }));

  const sherpas = Array.from({ length: 10 }).map((_, i) => ({
    email: `sherpa${i + 1}@test.com`,
    roles: [Role.SHERPA],
  }));

  const allUsers = [...admins, ...learners, ...sherpas];

  // 🔐 hash password 1 lần
  const hashedPassword = await bcrypt.hash("password123", 10);

  for (const user of allUsers) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {
        password: hashedPassword, // ✅ QUAN TRỌNG
      },
      create: {
        email: user.email,
        password: hashedPassword,
        roles: user.roles,
        balance: 0,
      },
    });
  }

  console.log("✅ Users seeded");

  return sherpas.map((s) => s.email);
}

/////
async function seedSherpaProfiles(sherpaEmails: string[]) {
  const games = await prisma.game.findMany()

  if (games.length === 0) {
    throw new Error("No games found. Seed games first!")
  }

  const experts = mockExpertsExtra.slice(0, sherpaEmails.length)

  for (let i = 0; i < sherpaEmails.length; i++) {
    const email = sherpaEmails[i]
    const expert = experts[i]

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user || !expert) continue

    await prisma.sherpaProfile.upsert({
      where: { userId: user.id },
      update: {
        name: expert.name,
        avatar: expert.avatar,
        experience: expert.experience,
        rating: expert.rating,
        availability: SherpaAvailability.AVAILABLE,
      },
      create: {
        userId: user.id,

        // 🔥 mock expert fields
        name: expert.name,
        avatar: expert.avatar,
        experience: expert.experience,
        rating: expert.rating,

        // 🔧 system fields
        gameId: games[Math.floor(Math.random() * games.length)].id,
        bio: "Experienced esports coach",
        hourlyRate: 1500,
        availability: SherpaAvailability.AVAILABLE,
      },
    })
  }

  console.log("✅ Sherpa profiles seeded with mock experts")
}

/////
async function seedBookings() {
  console.log("Seeding bookings...")

  // 1. Lấy learner
  const learners = await prisma.user.findMany({
    where: {
      roles: {
        has: Role.LEARNER,
      },
    },
  })

  // 2. Lấy sherpa profile
  const sherpaProfiles = await prisma.sherpaProfile.findMany()

  if (learners.length === 0 || sherpaProfiles.length === 0) {
    throw new Error("Không có learner hoặc sherpa để seed booking")
  }

  const bookingsData = Array.from({ length: 20 }).map(() => {
    const learner = learners[Math.floor(Math.random() * learners.length)]
    const sherpa = sherpaProfiles[Math.floor(Math.random() * sherpaProfiles.length)]

    const startTime = new Date()

    const isPast = Math.random() < 0.3 // 30% quá khứ

    if (isPast) {
      startTime.setDate(startTime.getDate() - Math.floor(Math.random() * 7))
    } else {
      startTime.setDate(startTime.getDate() + Math.floor(Math.random() * 7))
    }

    const endTime = new Date(startTime)
    endTime.setHours(endTime.getHours() + 1)

    const status = isPast
      ? BookingStatus.COMPLETED
      : [BookingStatus.PENDING, BookingStatus.CONFIRMED][
          Math.floor(Math.random() * 2)
        ]

    return {
      learnerId: learner.id,
      sherpaId: sherpa.userId,
      status,
      startTime,
      endTime,
      price: 100000,
      notes: "Seeded booking",
    }
  })

  const existing = await prisma.booking.count()
  if (existing > 0) {
    console.log("⚠️ Bookings already exist, skip seeding")
    return
  }
  await prisma.booking.createMany({
    data: bookingsData,
  })

  console.log("Bookings seeded successfully")
}

/////
async function seedSessionLogs() {
  console.log("Seeding session logs...")

  // 1. Lấy booking đã completed
  const completedBookings = await prisma.booking.findMany({
    where: {
      status: BookingStatus.COMPLETED,
    },
  })

  if (completedBookings.length === 0) {
    console.log("No completed bookings found, skip session logs")
    return
  }

  // 2. Kiểm tra đã có session log chưa
  const existingLogs = await prisma.sessionLog.findMany({
    where: {
      bookingId: {
        in: completedBookings.map(b => b.id),
      },
    },
  })

  const existingBookingIds = new Set(
    existingLogs.map(log => log.bookingId)
  )

  const logsData = completedBookings
    .filter(b => !existingBookingIds.has(b.id))
    .map(b => {
      const durationSeconds =
        b.endTime && b.startTime
          ? Math.floor(
              (b.endTime.getTime() - b.startTime.getTime()) / 1000
            )
          : 3600

      return {
        bookingId: b.id,
        recordingUrl: "https://example.com/recording.mp4",
        durationSeconds,
        botNotes: "Session completed successfully",
        metadata: {
          platform: "Discord",
          quality: "HD",
        },
      }
    })

  if (logsData.length === 0) {
    console.log("Session logs already exist, skip seeding")
    return
  }

  await prisma.sessionLog.createMany({
    data: logsData,
  })

  console.log("Session logs seeded successfully")
}

/////
async function main() {
  await seedGames();
  const sherpaEmails = await seedUsers();
  await seedSherpaProfiles(sherpaEmails);
  await seedBookings(); 
  await seedSessionLogs()
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
