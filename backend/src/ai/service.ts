import { queryModel } from './model'
import { QuestionDocument } from '../db/models/question'

type SentencePair = {
  itemLanguage: string
  translationLanguage: string
}

export async function generateSentences(
  questions: QuestionDocument[]
): Promise<SentencePair[]> {
  const prompt = `Using ITEMS
${questions.map(({ item }) => item).join(', ')}
and their TRANSLATIONS
${questions.map(({ translation }) => translation).join(', ')},
create sentences in the ITEMS language.
Level A2-B1.
Make several short sentences with 4-10 words, using as many ITEMS as possible but maintaing the common sense.
Additionally, use pronouns, prepositions, conjunctions and conjunctive words, present, past or future tense, singular and plural forms.
When necessary, use words not from the list to make the sentence more natural. These can be simple verbs like buy, go, do, say and so on. There can be nouns like person, house, car, city and so on. There can be adjectives like good, bad, beautiful, big, red and so on.
Create as many sentences as needed to use all the items, but try to use each item just once.
After creating sentences in the ITEMS language, translate them into the TRANSLATIONS language, using the exact translations were possible or using common translations.
Return only a JSON array with sentences in ITEMS and TRANSLATIONS languages in the format [{ "itemLanguage": "...", "translationLanguage": "..." }], so it can be parsed.
Example:
ITEMS: langas, valyti, skruostas
TRANSLATIONS: окно, чистить, щека
Output: [{ "itemLanguage": "Aš valau langą", "translationLanguage": "Я мою окно" }, { "itemLanguage": "Jų skruostai yra raudoni", "translationLanguage": "У нее красные щеки" }]
`

  const result = await queryModel(prompt)
  return JSON.parse(result) as SentencePair[]
}
