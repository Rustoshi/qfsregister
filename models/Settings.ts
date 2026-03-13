import mongoose, { Schema, Document } from 'mongoose';

export interface ISettings extends Document {
  qfsActivationCode: string;
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);
