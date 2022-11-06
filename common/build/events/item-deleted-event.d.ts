import { Subjects } from './subjects';
export interface ItemDeletedEvent {
    subject: Subjects.ItemDeleted;
    data: {
        id: string;
        categoryId: string;
        subcategoryId: string;
        outletId: string;
    };
}
