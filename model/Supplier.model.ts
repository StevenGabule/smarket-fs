import {Document, Model, model, Schema} from 'mongoose'
import {UserDoc} from "./User.model";
import {ISetIdDate} from "./Helper";

interface SupplierAttr {
  name: string;
  contactPerson: string;
  phoneNumber: string;
  phoneNumberIs: boolean;
  email: string;
  note?: string;
  addedBy: UserDoc;
}

export interface SupplierDoc extends Document, SupplierAttr, ISetIdDate {
  id: string;
}

interface SupplierModel extends Model<SupplierDoc>{
  build(attrs: SupplierAttr) : SupplierDoc
}

const supplierSchema = new Schema({
  name: {type: String, required: true},
  contactPerson: {type: String, required: true},
  phoneNumber: {type: String, required: true, unique: true},
  phoneNumberIs: {type: Boolean, default: true},
  email: {type: String, required: true, unique: true},
  note: {type: String},
  addedBy : {type: Schema.Types.ObjectId, required: true, ref: 'User'},
}, {
  timestamps: true,
  toJSON: {
    transform(_,ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    }
  }
});

supplierSchema.statics.build = (attrs: SupplierAttr) => {
  return new Supplier(attrs)
}

const Supplier = model<SupplierDoc, SupplierModel>('Supplier', supplierSchema);

export {Supplier}