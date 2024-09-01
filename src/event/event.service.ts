import { Inject, Injectable } from '@nestjs/common';
import { CreateEventDto } from './event.dto';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs';

@Injectable()
export class EventService {
  constructor(@Inject('EVENT_SERVICE') private RabbitClient: ClientProxy) {}

  /**
   * Emits an event to create a new event.
   *
   * @param event - The event data to be created.
   * @returns An object containing the status code and a success message.
   */
  createEvent(event: CreateEventDto) {
    this.RabbitClient.emit('event_created', event);

    return {
      statusCode: 200,
      message: 'Event created successfully',
    };
  }

  /**
   * Emits an event to update an existing event by ID.
   *
   * @param id - The ID of the event to update.
   * @param event - The updated event data.
   * @returns An object containing the status code and a success message.
   */
  updateEvent(id: string, event: CreateEventDto) {
    this.RabbitClient.emit('event_updated', {
      id,
      ...event,
    });

    return {
      statusCode: 200,
      message: 'Event updated successfully',
    };
  }

  /**
   * Sends a request to retrieve vendor details by email.
   *
   * @param email - The email address to filter vendors by.
   * @returns An observable that emits the vendor details associated with the provided email.
   */
  getVendorByEmail(email: string) {
    return this.RabbitClient.send('get-vendor-by-email', email).pipe(
      timeout(5000),
    );
  }

  /**
   * Sends a request to retrieve events associated with a specific email.
   *
   * @param email - The email address to filter events by.
   * @returns An observable that emits a list of events associated with the provided email.
   */
  getEventsByEmail(email: string) {
    return this.RabbitClient.send('get-events-by-email', email).pipe(
      timeout(5000),
    );
  }
}
