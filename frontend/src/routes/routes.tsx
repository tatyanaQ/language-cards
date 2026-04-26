import Cards from '../pages/cards'
import Card from '../pages/cards/card'
import WorkOut from '../pages/work-out'
import WorkOutAI from '../pages/work-out-ai'

export const routes = [
  {
    key: 'cards',
    label: 'Cards',
    element: <Cards />,
  },
  {
    key: 'cards/:id',
    label: 'Card',
    element: <Card />,
    hidden: true,
  },
  {
    key: 'work-out',
    label: 'Work out',
    element: <WorkOut />,
  },
  {
    key: 'work-out-ai',
    label: 'Work out AI',
    element: <WorkOutAI />,
  },
]
