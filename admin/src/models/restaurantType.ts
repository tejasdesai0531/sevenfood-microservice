import mongoose from "mongoose";

interface RestaurantTypeAttrs {
    name: string;
    code: string;
    status: boolean;
}

export interface RestaurantTypeDoc extends mongoose.Document {
    name: string;
    code: string;
    status: boolean;
}

interface RestaurantTypeModel extends mongoose.Model<RestaurantTypeAttrs> {
    build(attrs: RestaurantTypeAttrs): RestaurantTypeDoc;
}

const restaurantTypeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        code: {
            type: String,
            required: true,
            unique: true
        },
        status: {
            type: Boolean,
            required: true
        }
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            }
        }
    }
)


restaurantTypeSchema.statics.build = (attrs: RestaurantTypeAttrs) => {
    return new RestaurantType(attrs)
}

const RestaurantType = mongoose.model<RestaurantTypeDoc, RestaurantTypeModel>('RestaurantType', restaurantTypeSchema);

export { RestaurantType };