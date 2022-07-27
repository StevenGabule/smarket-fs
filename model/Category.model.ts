import {Model, model, Schema, Document} from 'mongoose'
import {ISetIdDate} from "./Helper";

interface CategoryAttrs {
  name: string;
  mainCategory: CategoryDoc;
}

export interface CategoryDoc extends Document, CategoryAttrs, ISetIdDate{
  id: string;
}

interface CategoryModel extends Model<CategoryDoc>{
  build(attrs: CategoryAttrs) : CategoryDoc
}

const categorySchema = new Schema({
  name: { type: String, required: true},
  mainCategory: {type: Schema.Types.ObjectId, ref: 'Category'}
}, {
  timestamps: true,
  toJSON: {
    transform(_, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    }
  }
})

categorySchema.statics.build = (attrs: CategoryAttrs) => {
  return new Category(attrs)
}

const Category = model<CategoryDoc, CategoryModel>('Category', categorySchema)

export {Category}