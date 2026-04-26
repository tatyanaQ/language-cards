import { queryModel } from './model'
import { QuestionDocument } from '../db/models/question'

type AiLesson = {
  itemLanguage: string
  translationLanguage: string
  cardIds: string[]
}

export async function generateLesson(
  questions: QuestionDocument[]
): Promise<AiLesson[]> {
  const prompt = `Using lamguage memory cards
${JSON.stringify(questions.map(({ _id, item, translation }) => ({ _id, item, translation })))},
create sentences in the ITEMS language.
Level A2-B1.
Make several short sentences with 4-10 words, using as many ITEMS as possible but maintaing the common sense.
Additionally, use pronouns, prepositions, conjunctions and conjunctive words, present, past or future tense, singular and plural forms.
When necessary, use words not from the list to make the sentence more natural. These can be simple verbs like buy, go, do, say and so on. There can be nouns like person, house, car, city and so on. There can be adjectives like good, bad, beautiful, big, red and so on.
Create as many sentences as needed to use all the items, but try to use each item just once.
After creating sentences in the ITEMS language, translate them into the TRANSLATIONS language, using the exact translations were possible or using common translations.
Return only a JSON array with sentences in ITEMS and TRANSLATIONS languages as well as ids of the used cards in the format [{ "itemLanguage": "...", "translationLanguage": "...", cardIds: ["..."] }], so it can be parsed.
Example:
memory cards: [{"_id": "1", "item": "langas", "translation": "окно" }, {"_id": "2", "item": "valyti", "translation": "чистить" }, {"_id": "3", "item": "skruostas", "translation": "щека" }]
output: [{ "itemLanguage": "Aš valau langą", "translationLanguage": "Я мою окно", "cardIds": ["1", "2"] }, { "itemLanguage": "Jų skruostai yra raudoni", "translationLanguage": "У нее красные щеки", "cardIds": ["3"] }]
`

  const result = await queryModel(prompt)
  return JSON.parse(result) as AiLesson[]
}
