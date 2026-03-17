import mongoose, { Schema, Document } from 'mongoose';

export interface ISettings extends Document {
  qfsActivationCode: string;
  defaultBalance: string;
  telegramLink: string;
  createdAt: Date;
  updatedAt: Date;
}

const SettingsSchema: Schema = new Schema(
  {
    qfsActivationCode: {
      type: String,
      required: true,
      default: 'QFS-DEFAULT-12345',
    },
    defaultBalance: {
      type: String,
      required: true,
      default: '653,000,000',
    },
    telegramLink: {
      type: String,
      required: true,
      default: 'https://t.me/qfscommunity',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);
