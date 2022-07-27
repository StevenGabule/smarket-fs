import {Document, Model, model, Schema} from 'mongoose'
import {UserDoc} from "./User.model";
import {VendorDoc} from "./Vendor.model";
import {ISetIdDate} from "./Helper";

interface CartAttrs {
  customer: UserDoc;
  vendorProduct: UserDoc; // product from vendor
  vendor: VendorDoc
  qty: number;
}

export interface CartDoc extends Document, CartAttrs, ISetIdDate {
  id: string;
}

interface CartModel extends Model<CartDoc> {
  build(attrs: CartAttrs): CartDoc
}

const cartSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, required: true, ref: 'User'},
  vendorProduct: { type: Schema.Types.ObjectId, required: true, ref: 'VendorProduct'},
  vendor: { type: Schema.Types.ObjectId, required: true, ref: 'Vendor'},
  qty: {type: Number, default: 0}
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

cartSchema.statics.build = (attrs: CartAttrs) => {
  return new Cart(attrs)
}

const Cart = model<CartDoc, CartModel>('Cart', cartSchema)

export {Cart}