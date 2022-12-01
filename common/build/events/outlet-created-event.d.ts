import { Subjects } from './subjects';
export interface OutletCreatedEvent {
    subject: Subjects.OutletCreated;
    data: {
        id: string;
        userId: string;
        name: string;
        address: string;
        location: {
            latitude: number;
            longitude: number;
        };
        countryCode: string;
        cityCode: string;
        contact: string;
        restaurantType: [string];
        cuisines: [string];
        timing: {
            startsAt: Date;
            closesAt: Date;
        };
        workingDays: [string];
    };
}
