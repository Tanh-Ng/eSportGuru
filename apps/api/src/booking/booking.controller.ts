import { Body, Controller, Get, Param, Post, Patch } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  /**
   * @desc    Tạo mới một yêu cầu đặt lịch dạy
   * @route   POST /booking
   * @access  Learner
   */
  @Post()
  async create(@Body() dto: CreateBookingDto) {
    return await this.bookingService.create(dto);
  }

  /**
   * @desc    Sherpa xác nhận buổi học và kích hoạt phòng Discord
   * @route   PATCH /booking/:id/confirm
   * @access  Sherpa
   */
  @Patch(':id/confirm')
  async confirm(@Param('id') id: string) {
    return await this.bookingService.confirm(id);
  }

  /**
   * @desc    Sherpa từ chối hoặc Learner hủy yêu cầu (Soft Delete)
   * @route   PATCH /booking/:id/reject
   * @access  Sherpa / Learner
   */
  @Patch(':id/reject')
  async reject(@Param('id') id: string) {
    // Chuyển trạng thái sang CANCELLED để giữ lại lịch sử 
    return await this.bookingService.cancel(id);
  }

  /**
   * @desc    Lấy thông tin phòng Discord của buổi học
   * @route   GET /booking/:id/invite
   * @access  Các bên liên quan (Learner & Sherpa)
   */
  @Get(':id/invite')
  async invite(@Param('id') id: string) {
    const booking = await this.bookingService.findById(id);
    return { 
      inviteLink: booking.discordInviteLink, 
      discordChannelId: booking.discordChannelId 
    };
  }

  /**
   * @desc    Lấy danh sách booking dành cho Sherpa
   * @route   GET /booking/sherpa/:sherpaId
   * @access  Sherpa / Admin
   */
  @Get('sherpa/:sherpaId')
  async listForSherpa(@Param('sherpaId') sherpaId: string) {
    return await this.bookingService.listForSherpa(sherpaId);
  }

  /**
   * @desc    Lấy danh sách booking dành cho Learner
   * @route   GET /booking/learner/:learnerId
   * @access  Learner / Admin
   */
  @Get('learner/:learnerId')
  async listForLearner(@Param('learnerId') learnerId: string) {
    return await this.bookingService.listForLearner(learnerId);
  }
}