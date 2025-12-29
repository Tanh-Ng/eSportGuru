import { SherpaDTO } from "../api/sherpa.api";

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

export const addMockFields = (expert: SherpaDTO) => {
  // Lấy ID chuẩn từ dữ liệu bạn log (là expert.id)
  const expertId = expert.id || "0";

  // Thuật toán băm để chọn index cố định từ danh sách 25 người
  let hash = 0;
  for (let i = 0; i < expertId.length; i++) {
    hash = expertId.charCodeAt(i) + ((hash << 5) - hash);
  }
  const mockIndex = Math.abs(hash) % mockExpertsExtra.length;
  const mock = mockExpertsExtra[mockIndex];

  // Trả về object: Giữ lại expert gốc và ghi đè các trường mock
  return {
    ...expert, // Giữ lại id, game, hourlyRate, createdAt...
    name: mock.name,
    avatar: mock.avatar,
    experience: mock.experience,
    rating: mock.rating,
  };
};