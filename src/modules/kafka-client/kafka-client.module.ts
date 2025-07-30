import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { DEFAULT_KAFKA_HOST } from '../../constants/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MAIL_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'mail-client',
            brokers: [process.env.KAFKA_HOST || DEFAULT_KAFKA_HOST],
          },
          consumer: {
            groupId: 'mail-consumer-group',
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class KafkaClientModule {}
