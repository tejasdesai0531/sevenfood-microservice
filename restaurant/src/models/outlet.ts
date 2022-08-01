import mongoose from "mongoose";

interface OutletAttrs {
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
    restaurantYype: [string];
    cuisines: [string];
    timing: {
        startsAt: Date;
        closesAt: Date;
    };
    workingDays: [string];
}

interface OutletDoc extends mongoose.Document {
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
    restaurantYype: [string];
    cuisines: [string];
    timing: {
        startsAt: Date;
        closesAt: Date;
    };
    workingDays: [string];
    isApproved: boolean
}

interface OutletModel extends mongoose.Model<OutletAttrs> {
    build(attrs: OutletAttrs): OutletDoc;
}

const outletSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        location: {
            latitude: {
                type: Number,
                required: true
            },
            longitude: {
                type: Number,
                required: true
            },
        },
        countryCode: {
            type: String,
            required: true
        },
        cityCode: {
            type: String,
            required: true
        },
        contact: {
            type: String,
            required: true
        },
        restaurantType: {
            type: [String],
            required: true
        },
        cuisines: {
            type: [String],
            required :true
        },
        timing: {
            startsAt: {
                type: Date,
                required: true
            },
            closesAt: {
                type: Date,
                required: true
            },
        },
        workingDays: {
            type: [String],
            required: true
        }
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id
            }
        }
    }
)


outletSchema.statics.build = (attrs: OutletAttrs) => {
    return new Outlet(attrs)
}

const Outlet = mongoose.model<OutletDoc, OutletModel>('Outlet', outletSchema);

export { Outlet };