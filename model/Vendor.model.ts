import {Document, Model, model, Schema} from 'mongoose';
import {MunicipalityDoc} from "./Municipality.model";
import {OwnerDoc} from "./Owner.model";
import {ISetIdDate} from "./Helper";

interface VendorAttrs {
  storeCode: string;
  name: string;
  businessEmail: string;
  address: string;
  phoneNumber: string;
  telephoneNumber?: string;
  municipality: MunicipalityDoc;
  orderTimeAllowance: number;
  itemProcessingTime: number;
  driverPerHour: number;
  driverCommission: number;
  deliveryStart: Date;
  deliveryEnd: Date;
  closedAt: Date;
  owners: OwnerDoc[];
  businessStart: Date;
  businessEnd: Date;
  businessStatus: string;
  socialFB: string;
}

export interface VendorDoc extends Document, VendorAttrs, ISetIdDate {
  id: string;
}

interface VendorModel extends  Model<VendorDoc> {
  build(attrs:VendorAttrs) : VendorDoc
}

const vendorSchema = new Schema({
  storeCode: { type: String, required: true},
  name: { type: String, required: true},
  businessEmail: { type: String, required: true},
  address: { type: String, required: true},
  phoneNumber: { type: String, required: true},
  telephoneNumber: { type: String, required: true},
  municipality: { type: Schema.Types.ObjectId, required: true, ref: 'Municipality'},
  orderTimeAllowance: { type: Number, required: true},
  itemProcessingTime: { type: Number, required: true},
  driverPerHour: { type: Number, required: true},
  driverCommission: { type: Number, required: true},
  deliveryStart: { type: Date, required: true},
  deliveryEnd: { type: Date, required: true},
  owners: [{ type: Schema.Types.ObjectId, required: true, ref: 'Owner'}],
  businessStart: { type: Date, required: true},
  businessEnd: { type: Date, required: true},
  businessStatus: { type: String, required: true, enum: ['active', 'inactive']},
  closedAt: { type: Date, required: true},
  socialFB: { type: String, required: true},
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

vendorSchema.statics.build = (attrs: VendorAttrs) => {
  return new Vendor(attrs)
}

const Vendor = model<VendorDoc, VendorModel>('Vendor', vendorSchema);

export {Vendor}


