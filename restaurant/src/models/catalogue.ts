import mongoose from "mongoose";
import { ItemStatus } from "@sevenfood/common"

interface CatalogueAttrs {
    outletId: string;
    categories?: [
        {
            id?: string;
            name: string;
            subcategories?: [
                {
                    id?: string;
                    name: string;
                    items?: [
                        {
                            id?: string;
                            name: string;
                            price: number;
                            status?: ItemStatus;
                            visibility?: boolean;
                        }
                    ]
                }
            ]
        }
    ];
}

export interface CatalogueDoc extends mongoose.Document {
    outletId: string;
    categories?: [
        {
            id?: string;
            name: string;
            subcategories?: [
                {
                    id?: string;
                    name: string;
                    items?: [
                        {
                            id?: string;
                            name: string;
                            price: number;
                            status?: ItemStatus;
                            visibility?: boolean;
                        }
                    ]
                }
            ]
        }
    ];
}

interface CatalogueModel extends mongoose.Model<CatalogueAttrs> {
    build(attrs: CatalogueAttrs): CatalogueDoc;
}

const catalogueSchema = new mongoose.Schema(
    {
        outletId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Outlet'
        },
        categories: [
            {
                name: {
                    type: String,
                    required: true
                },
                subcategories: [
                    {
                        name: {
                            type: String,
                            required: true
                        },
                        items: [{
                            type: mongoose.Schema.Types.ObjectId,
                            ref: 'Item'
                        }]
                    }
                ],
            }
        ],
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


catalogueSchema.statics.build = (attrs: CatalogueAttrs) => {
    return new Catalogue(attrs)
}

const Catalogue = mongoose.model<CatalogueDoc, CatalogueModel>('Catalogue', catalogueSchema);

export { Catalogue };