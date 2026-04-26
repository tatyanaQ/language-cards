export type Question = {
  _id: string
  item: string
  translation: string
  language: string
  tags: string[]
  note?: string
}

export type AiQuestion = {
  itemLanguage: string
  translationLanguage: string
  cardIds: string[]
}
