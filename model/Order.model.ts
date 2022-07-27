import {Document, Model, Schema, model, Types, now} from 'mongoose'
import {UserDoc} from "./User.model";
import {VendorDoc} from "./Vendor.model";
import {VoucherDoc} from "./Voucher.model";
import {PaymentDoc} from "./Payment.model";
import {StreetDoc} from "./Street.model";
import {BarangayDoc} from "./Barangay.model";
import {MunicipalityDoc} from "./Municipality.model";
import {ProvinceDoc} from "./Province.model";
import {ProductDoc} from "./Product.model";
import {ISetIdDate} from "./Helper";

interface OrderItem {
  _id: string;
  product: ProductDoc
  price: number;
  discount: number;
  quantity: number;
  itemStatus: boolean;
  supplierPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

interface DeliveryPersonnel {
  _id: string;
  driver: UserDoc;
  deliveryRating: number;
  feedbackNote: string;
  deliveryEarning: number;
  bonus?: number;
  departureTime: Date;
  arrivalTime: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface OrderAttrs {
  customer: UserDoc
  vendor: VendorDoc
  orderDate: Date
  deliveryDateTime: Date
  totalTimeProcessing: Date
  deliveryFee: number;
  voucher?: VoucherDoc;
  payment: PaymentDoc
  eta?: string;
  orderStatus: number;
  street: StreetDoc
  barangay: BarangayDoc
  municipality: MunicipalityDoc
  province: ProvinceDoc
  note?: string
  fastLane: boolean
  getter?: UserDoc
  checker?: UserDoc
  cashier?: UserDoc
  paymentDate: Date
  deliveryCategory: number;
  orderItem: OrderItem[];
  deliveryAt?: Date;
  delivery: DeliveryPersonnel
}

export interface OrderDoc extends Document, OrderAttrs, ISetIdDate {
  id: string;
}

interface OrderModel extends Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc
}

const orderSchema = new Schema({
  customer: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
  vendor: {type: Schema.Types.ObjectId, required: true, ref: 'Vendor'},
  orderDate: {type: Date, default: Date.now},
  deliveryDateTime: {type: Date, default: Date.now},
  totalTimeProcessing: {type: Date},
  deliveryFee: {type: Number, required: true},
  voucher: {type: Schema.Types.ObjectId, required: true, ref: 'Voucher'},
  payment: {type: Schema.Types.ObjectId, required: true, ref: 'Payment', comment: '1-COD|2-PayPal|3-E-wallet|4-GCash|5-PayMaya'},
  paymentDate: {type: Date, required: true},
  eta: {type: String},
  orderStatus: {
    type: Number,
    required: true,
    enum: [0, 1, 2, 3, 4, 5, 6],
    comment: '0-Cancel|1-Pending|2-Delivery|3-Completed'
  },
  street: {type: Schema.Types.ObjectId, required: true, ref: 'Street'},
  barangay: {type: Schema.Types.ObjectId, required: true, ref: 'Barangay'},
  municipality: {type: Schema.Types.ObjectId, required: true, ref: 'Municipality'},
  province: {type: Schema.Types.ObjectId, required: true, ref: 'Province'},
  note: {type: String},
  fastLane: {type: Boolean, default: false},
  getter: {type: Schema.Types.ObjectId,ref: 'User'},
  checker: {type: Schema.Types.ObjectId,ref: 'User'},
  cashier: {type: Schema.Types.ObjectId,ref: 'User'},
  deliveryCategory: {
    type: Number,
    default: 1,
    comment: '1-light|2-heavy'
  },
  orderItem: [
    {
      _id: {type: String, required: true},
      product: {type: Schema.Types.ObjectId, ref: 'Product'},
      price: {type: Number, required: true},
      discount: {type: Number, required: true},
      quantity: {type: Number, required: true},
      itemStatus: {type: Boolean, default: true},
      supplierPrice: {type: Number, required: true}
    }
  ],
  deliveryAt: {type: Date},
  delivery: {
    _id: {type: String, required: true},
    driver: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    deliveryRating: {type: Number},
    feedbackNote: {type: String},
    deliveryEarning: {type: Number},
    bonus: {type: Number},
    departureTime: {type: Date},
    arrivalTime: {type: Date},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
  }
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

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
}

const Order = model<OrderDoc, OrderModel>('Order', orderSchema);

export {Order}





