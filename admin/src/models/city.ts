import mongoose from "mongoose";
import { CountryDoc } from "./country";

interface CityAttrs {
    name: string;
    code: string;
    country: CountryDoc;
    status: boolean;
}

interface CityDoc extends mongoose.Document {
    name: string;
    code: string;
    country: CountryDoc;
    status: boolean;
}

interface CityModel extends mongoose.Model<CityAttrs> {
    build(attrs: CityAttrs): CityDoc;
}

const citySchema = new mongoose.Schema(
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
        country: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Country',
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
                delete ret._id
            }
        }
    }
)


citySchema.statics.build = (attrs: CityAttrs) => {
    return new City(attrs)
}

const City = mongoose.model<CityDoc, CityModel>('City', citySchema);

export { City };