import { connect } from 'mongoose'

export const dbConnect = async () => {
  await connect('mongodb://root:root@mongo:27017/lanuage-cards?authSource=admin')
}
