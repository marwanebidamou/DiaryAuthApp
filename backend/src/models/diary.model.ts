import mongoose, { Schema, model, InferSchemaType, pluralize } from 'mongoose';

pluralize(null);


const diarySchema = new Schema({
    user_id: mongoose.Types.ObjectId,
    title: String,
    description: String,
}, {
    timestamps: true
})

export type Diary = InferSchemaType<typeof diarySchema>;

export const DiaryModel = model<Diary>('diary', diarySchema);
