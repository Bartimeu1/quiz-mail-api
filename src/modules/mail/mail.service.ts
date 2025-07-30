import {
  Injectable,
  Inject,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';

import { MailerService } from '@nestjs-modules/mailer';

import { SendEmailDto, SendRoomInvitesDto } from './dto';

import { roomInvitationTemplate } from './templates/room-invitation.template';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { GetUserResponse } from '../../types/user';

const PATTERNS_TO_SUBSCRIBE = ['find-user-by'];

@Injectable()
export class MailService implements OnModuleInit {
  constructor(
    @Inject('MAIL_SERVICE') private readonly kafkaClient: ClientKafka,
    private readonly mailerService: MailerService,
  ) {}

  async onModuleInit() {
    PATTERNS_TO_SUBSCRIBE.forEach((pattern) =>
      this.kafkaClient.subscribeToResponseOf(pattern),
    );
    await this.kafkaClient.connect();
  }

  async sendEmail(sendEmailDto: SendEmailDto) {
    const { recipients, subject, text, html } = sendEmailDto;

    try {
      await this.mailerService.sendMail({
        from: process.env.MAIL_USER,
        to: recipients,
        subject,
        text,
        html,
      });
    } catch {
      throw new RpcException(new Error('Failed to send email'));
    }
  }

  async sendRoomInvites(sendRoomInvitesDto: SendRoomInvitesDto) {
    const { newRoomId, usersIds } = sendRoomInvitesDto;
    const roomLink = `${process.env.FRONTEND_HOST}/room/${newRoomId}`;

    await Promise.all(
      usersIds.map(async (userId) => {
        const { data: user }: GetUserResponse = await firstValueFrom(
          this.kafkaClient.send('find-user-by', {
            value: {
              key: 'id',
              value: userId,
            },
          }),
        );

        if (!user) {
          throw new RpcException(
            new NotFoundException('User with this email not found'),
          );
        }

        await this.sendEmail({
          recipients: [user.email],
          subject: 'Invitation to Testing Room',
          html: roomInvitationTemplate.html(user.name, roomLink),
          text: roomInvitationTemplate.text(user.name, roomLink),
        });
      }),
    );
  }
}
