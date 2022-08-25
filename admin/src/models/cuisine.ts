import mongoose from "mongoose";

interface CuisineAttrs {
    name: string;
    code: string;
    status: boolean;
}

export interface CuisineDoc extends mongoose.Document {
    name: string;
    code: string;
    status: boolean;
}

interface CuisineModel extends mongoose.Model<CuisineAttrs> {
    build(attrs: CuisineAttrs): CuisineDoc;
}

const cuisineSchema = new mongoose.Schema(
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


cuisineSchema.statics.build = (attrs: CuisineAttrs) => {
    return new Cuisine(attrs)
}

const Cuisine = mongoose.model<CuisineDoc, CuisineModel>('Cuisine', cuisineSchema);

export { Cuisine };