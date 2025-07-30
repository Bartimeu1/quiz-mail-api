import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { MailService } from './mail.service';

import { SendEmailDto, SendRoomInvitesDto } from './dto';

@Controller()
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @MessagePattern('send-email')
  async sendMail(@Payload() sendMailDto: SendEmailDto) {
    await this.mailService.sendEmail(sendMailDto);
  }

  @MessagePattern('send-room-invites')
  async sendRoomInvites(@Payload() sendRoomInvitesDto: SendRoomInvitesDto) {
    return this.mailService.sendRoomInvites(sendRoomInvitesDto);
  }
}
