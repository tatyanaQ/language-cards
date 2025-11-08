import React from 'react'
import { Question } from '../../types'

const GoogleTranslateLink: React.FC<{ item: string }> = ({ item }) => (
  <a
    href={`https://translate.google.com/?sl=lt&tl=en&text=${encodeURIComponent(
      item
    )}&op=translate`}
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      width="24"
      alt="Logo of Google Translate"
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Google_Translate_logo.svg/512px-Google_Translate_logo.svg.png?20210606111727"
    />
  </a>
)

const CooljugatorLink: React.FC<{ item: string }> = ({ item }) => (
  <a
    href={`https://cooljugator.com/lt/${encodeURIComponent(item)}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      width="24"
      alt="Logo of Cooljugator"
      src="https://cooljugator.com/lib/images/misc/alligator-welcome.png"
    />
  </a>
)

const CardTitle: React.FC<{ question: Question }> = ({ question }) => {
  const { item, tags } = question

  const isWord = tags && !tags.includes('rule')
  const isVerb = tags && tags.includes('verb')

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <span>{item}</span>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        {isWord ? <GoogleTranslateLink item={item} /> : null}
        {isVerb ? <CooljugatorLink item={item} /> : null}
      </div>
    </div>
  )
}

export default CardTitle
