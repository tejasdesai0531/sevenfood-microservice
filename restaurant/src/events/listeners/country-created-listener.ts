import { Message } from 'node-nats-streaming';
import { Subjects, Listener, CountryCreatedEvent } from '@sevenfood/common';
import { Country } from '../../models/country';
import { queueGroupName } from './queue-group-name';

export class CountryCreatedListener extends Listener<CountryCreatedEvent> {
  subject: Subjects.CountryCreated = Subjects.CountryCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: CountryCreatedEvent['data'], msg: Message) {
    const { id, name, code, status } = data;

    const country = Country.build({
      id,
      name,
      code,
      status
    });
    await country.save();

    console.log("Country create event", country)

    msg.ack();
  }
}
