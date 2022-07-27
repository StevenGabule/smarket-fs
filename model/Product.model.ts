import {Document, Model, model, Schema} from "mongoose";
import {CategoryDoc} from "./Category.model";
import {UserDoc} from "./User.model";
import {ISetIdDate} from "./Helper";

interface ProductAttrs {
  productCode: string;
  title: string;
  slug: string;
  mainCategory: CategoryDoc;
  subCategory: CategoryDoc;
  shortDescription: string;
  detailDescription: string;
  unit: string;
  avatar: string[];
  addedBy: UserDoc
  archivedBy: UserDoc
  destroyBy: UserDoc
  deletedAt: Date
  archivedAt: Date
}

export interface ProductDoc extends Document, ProductAttrs, ISetIdDate{
  id: string;
}

interface ProductModel extends Model<ProductDoc> {
  build(attrs: ProductAttrs) : ProductDoc
}

const productSchema = new Schema({
  productCode: {type: String, required: true, unique: true},
  title: {type: String, required: true, unique: true},
  slug: {type: String, required: true, unique: true},
  mainCategory: {type: Schema.Types.ObjectId, required: true, ref: 'Category'},
  subCategory: {type: Schema.Types.ObjectId, required: true, ref: 'Category'},
  shortDescription: {type: String, required: true},
  detailDescription: {type: String, required: true},
  unit: {type: String, required: true},
  avatar: [{type: String, required: true}],
  addedBy: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
  archivedBy: {type: Schema.Types.ObjectId, ref: 'User'},
  destroyBy: {type: Schema.Types.ObjectId, ref: 'User'},
  deletedAt: {type: Date},
  archivedAt: {type: Date},
}, {
  timestamps: true,
  toJSON: {
    transform(_,ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    }
  }
})

productSchema.statics.build = (attrs: ProductAttrs) => {
  return new Product(attrs);
}

const Product = model<ProductDoc, ProductModel>('Product', productSchema)

export {Product}
