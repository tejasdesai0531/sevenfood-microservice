import { Subjects } from './subjects';

export interface ItemUpdatedEvent {
  subject: Subjects.ItemUpdated;
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
