import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    // Imports the UsersModule to provide user-related services.
    UsersModule,

    // Registers the microservices client with RabbitMQ as the transport layer.
    ClientsModule.register([
      {
        name: 'EVENT_SERVICE',
        transport: Transport.RMQ, // Specifies RabbitMQ as the transport protocol.
        options: {
          urls: ['amqp://localhost:5672'], // URL of the RabbitMQ server.
          queue: 'events-queue', // Name of the queue to connect to.
        },
      },
    ]),
  ],

  // Registers the EventController to handle HTTP requests.
  controllers: [EventController],

  // Registers the EventService to handle the business logic for events.
  providers: [EventService],
})
export class EventModule {}
