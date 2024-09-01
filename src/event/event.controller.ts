import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './event.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  /**
   * Handles the creation of a new event.
   *
   * @param event - The event data from the request body.
   * @returns The created event object.
   */
  @Post('create')
  createEvent(@Body() event: CreateEventDto) {
    return this.eventService.createEvent(event);
  }

  /**
   * Handles the updating of an existing event by ID.
   *
   * @param id - The ID of the event to update.
   * @param event - The updated event data from the request body.
   * @returns The updated event object.
   */
  @Patch('update/:id')
  updateEvent(@Param('id') id: string, @Body() event: CreateEventDto) {
    return this.eventService.updateEvent(id, event);
  }

  /**
   * Retrieves events associated with a specific email.
   *
   * @param email - The email address to filter events by.
   * @returns A list of events associated with the provided email.
   */
  @Get('/:email')
  getEventsByEmail(@Param('email') email: string) {
    return this.eventService.getEventsByEmail(email);
  }

  /**
   * Retrieves vendor details associated with a specific email.
   *
   * @param email - The email address to filter vendors by.
   * @returns The vendor details associated with the provided email.
   */
  @Get('/vendors/:email')
  getVendorByEmail(@Param('email') email: string) {
    return this.eventService.getVendorByEmail(email);
  }
}
