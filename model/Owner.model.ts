import {Document, Model, model, Schema} from 'mongoose'
import {ISetIdDate} from "./Helper";

interface OwnerAttrs {
  name: string;
  email: string;
  phone_number: string;
  avatar?: string;
}

export interface OwnerDoc extends Document, OwnerAttrs, ISetIdDate {
  id: string;
}

interface OwnerModel extends Model<OwnerDoc>{
  build(attrs: OwnerAttrs) : OwnerDoc
}

const ownerSchema = new Schema({
  name: { type: String, required: true},
  email: { type: String, required: true},
  phone_number: { type: String, required: true},
  avatar: { type: String},
}, {
  timestamps: true,
  toJSON: {
    transform(_, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    }
  }
});

ownerSchema.statics.build = (attrs: OwnerAttrs) => {
  return new Owner(attrs)
}

const Owner = model<OwnerDoc, OwnerModel>('Owner', ownerSchema)

export {Owner}