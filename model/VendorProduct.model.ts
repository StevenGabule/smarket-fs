import {Document, Model, model, Schema} from 'mongoose'
import {ProductDoc} from "./Product.model";
import {VendorDoc} from "./Vendor.model";
import {UserDoc} from "./User.model";
import {SupplierDoc} from "./Supplier.model";
import {ISetIdDate} from "./Helper";

interface VendorProductAttrs {
  product: ProductDoc
  vendor: VendorDoc
  qty: number;
  reOrderQty: number;
  supplierPrice: number;
  retailPrice: number;
  itemStatus: boolean;
  addedBy: UserDoc;
  supplier: SupplierDoc[];
}

export interface VendorProductDoc extends Document, VendorProductAttrs, ISetIdDate {
  id: string;
}

interface VendorProductModel extends Model<VendorProductDoc> {
  build(attrs: VendorProductAttrs): VendorProductDoc
}

const vendorProductSchema = new Schema({
  product: {type: Schema.Types.ObjectId, required: true, ref: 'Product'},
  vendor: {type: Schema.Types.ObjectId, required: true, ref: 'Vendor'},
  addedBy: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
  suppliers: [{type: Schema.Types.ObjectId, required: true, ref: 'Supplier'}],
  qty: {type: Number, default: 0},
  reOrderQty: {type: Number, default: 0},
  supplierPrice: {type: Number, default: 0},
  retailPrice: {type: Number, default: 0},
  itemStatus: {type: Boolean, default: false},
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

vendorProductSchema.statics.build = (attrs: VendorProductAttrs) => {
  return new VendorProduct(attrs)
}

const VendorProduct = model<VendorProductDoc, VendorProductModel>('VendorProduct', vendorProductSchema)

export {VendorProduct}





