import mongoose from "mongoose";

interface CountryAttrs {
    name: string;
    code: string;
    status: boolean;
}

export interface CountryDoc extends mongoose.Document {
    name: string;
    code: string;
    status: boolean;
}

interface CountryModel extends mongoose.Model<CountryAttrs> {
    build(attrs: CountryAttrs): CountryDoc;
}

const countrySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        code: {
            type: String,
            required: true
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


countrySchema.statics.build = (attrs: CountryAttrs) => {
    return new Country(attrs)
}

const Country = mongoose.model<CountryDoc, CountryModel>('Country', countrySchema);

export { Country };