import { Subjects } from './subjects';

export interface ItemCreatedEvent {
  subject: Subjects.ItemCreated;
  data: {
    id: string;
    name: string;
    price: number;
    categoryId: string,
    categoryName: string,
    subcategoryId: string,
    subCategoryName: string,
    outletId: string
  };
}
