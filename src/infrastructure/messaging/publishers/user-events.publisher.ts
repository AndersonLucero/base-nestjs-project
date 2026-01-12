import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserCreatedEvent } from '../events/user-created.event';

@Injectable()
export class UserEventsPublisher {
    constructor(private eventEmitter: EventEmitter2) { }

    publishUserCreated(event: UserCreatedEvent) {
        this.eventEmitter.emit('user.created', event);
    }
}
