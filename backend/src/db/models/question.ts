import { Schema, model, Document, Types } from 'mongoose'

interface IQuestion {
  item: string
  translation: string
  tags?: string[]
  note?: string
}

const questionSchema = new Schema<IQuestion>({
  item: { type: String, required: true },
  translation: { type: String, required: true },
  tags: { type: [String] },
  note: { type: String },
})

export const Question = model<IQuestion>('Question', questionSchema)

export type QuestionDocument = { _id: Types.ObjectId } & IQuestion & Document
