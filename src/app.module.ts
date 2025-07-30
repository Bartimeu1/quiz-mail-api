import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailModule } from './modules/mail/mail.module';
import { KafkaClientModule } from './modules/kafka-client/kafka-client.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailModule,
    KafkaClientModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('MAIL_HOST'),
          port: configService.get<number>('MAIL_PORT'),
          secure: false,
          auth: {
            user: configService.get<string>('MAIL_USER'),
            pass: configService.get<string>('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: configService.get<string>('MAIL_SENDER'),
        },
      }),
    }),
  ],
})
export class AppModule {}
