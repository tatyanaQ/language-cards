import { Schema, model } from 'mongoose'

interface IQuestion {
  item: string
  tags?: string[]
}

const questionSchema = new Schema<IQuestion>({
  item: { type: String, required: true },
  tags: { type: [String] },
})

export const Question = model<IQuestion>('Question', questionSchema)
