import { ItemStatus } from "@sevenfood/common";
import mongoose from "mongoose";

interface ItemAttrs {
    id?: string;
    name: string;
    price: string;
}

export interface ItemDoc extends mongoose.Document {
    id?: string;
    name: string;
    price: number;
    status: ItemStatus;
    visibility: boolean;
}

interface ItemModel extends mongoose.Model<ItemAttrs> {
    build(attrs: ItemAttrs): ItemDoc;
}

const itemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            required: true,
            enum: Object.values(ItemStatus),
            default: ItemStatus.Pending
        },
        visibility: {
            type: Boolean,
            default: true
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


itemSchema.statics.build = (attrs: ItemAttrs) => {
    return new Item(attrs)
}

const Item = mongoose.model<ItemDoc, ItemModel>('Item', itemSchema);

export { Item };