import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfigModule } from '@nestjs/config';
import { MailController } from './mail.controller';
import { KafkaClientModule } from '../kafka-client/kafka-client.module';

@Module({
  imports: [ConfigModule, KafkaClientModule],
  providers: [MailService],
  controllers: [MailController],
})
export class MailModule {}
