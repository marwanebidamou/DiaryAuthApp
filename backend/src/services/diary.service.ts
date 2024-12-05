import mongoose from "mongoose";
import { DiaryModel } from "../models/diary.model";


export async function CreateDiary() {
    let id = new mongoose.Types.ObjectId();

    return await DiaryModel.create({ title: "test", description: 'test', user_id: id });
}