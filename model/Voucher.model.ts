import {Document, Model, Schema, model} from 'mongoose'
import {UserDoc} from "./User.model";
import {VendorDoc} from "./Vendor.model";
import {ISetIdDate} from "./Helper";

interface VoucherAttrs {
  customer: UserDoc[]
  code: string;
  details?: string;
  expiredDate?: Date;
  vendor: VendorDoc[]
  pesoDisc: number;
  percentageDisc: number;
  minAmount: number;
  usability: number;
}

export interface VoucherDoc extends Document, VoucherAttrs, ISetIdDate {
  id: string;
}

interface VoucherModel extends Model<VoucherDoc> {
  build(attrs: VoucherAttrs): VoucherDoc
}

const voucherSchema = new Schema({
  vendors: [{type: Schema.Types.ObjectId, required: true, ref: 'Vendor'}],
  customers: [{type: Schema.Types.ObjectId, required: true, ref: 'User'}],
  code: {type: String, required: true},
  details: {type: String},
  expiredDate: {type: Date},
  pesoDisc: {type: Number, default: 0},
  percentageDisc: {type: Number, default: 0},
  minAmount: {type: Number, default: 0},
  usability: {type: Number, default: 0}, // TODO: need to investigated
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

voucherSchema.statics.build = (attrs: VoucherAttrs) => {
  return new Voucher(attrs);
}

const Voucher = model<VoucherDoc, VoucherModel>('Voucher', voucherSchema)

export {Voucher}