import {Document, Model, Schema, model} from 'mongoose'
import {ISetIdDate} from "./Helper";

interface PaymentAttrs {
  name: string;
  status: boolean;
  logo?: string;
}

export interface PaymentDoc extends Document, PaymentAttrs, ISetIdDate {
  id: string;
}

interface PaymentModel extends Model<PaymentDoc> {
  build(attrs: PaymentAttrs): PaymentDoc
}

const paymentSchema = new Schema({
  name: {type: String, required: true},
  status: {type: Boolean, default: false},
  logo: {type: String},
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

paymentSchema.statics.build = (attrs: PaymentAttrs) => {
  return new Payment(attrs);
}

const Payment = model<PaymentDoc, PaymentModel>('Payment', paymentSchema)

export {Payment}