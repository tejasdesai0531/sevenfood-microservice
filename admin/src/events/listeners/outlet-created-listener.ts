import { Message } from 'node-nats-streaming';
import { Subjects, Listener, OutletCreatedEvent } from '@sevenfood/common';
import { Outlet } from '../../models/outlet';
import { queueGroupName } from './queue-group-name';

export class OutletCreatedListener extends Listener<OutletCreatedEvent> {
  subject: Subjects.OutletCreated = Subjects.OutletCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OutletCreatedEvent['data'], msg: Message) {

    const outlet = Outlet.build(data);
    await outlet.save();

    console.log("Outlet created event", outlet)

    msg.ack();
  }
}
