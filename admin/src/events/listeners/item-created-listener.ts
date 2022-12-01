import { Message } from 'node-nats-streaming';
import { Subjects, Listener, ItemCreatedEvent } from '@sevenfood/common';
import { Item } from '../../models/item';
import { queueGroupName } from './queue-group-name';

export class ItemCreatedListener extends Listener<ItemCreatedEvent> {
  subject: Subjects.ItemCreated = Subjects.ItemCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: ItemCreatedEvent['data'], msg: Message) {
    const { 
      id, 
      name,
      price, 
      categoryId,
      categoryName,
      subcategoryId,
      subCategoryName,
      outletId 
    } = data;


    // const country = Item.build({
      
    // });
    // await country.save();

    // console.log("Item create event", country)

    msg.ack();
  }
}
