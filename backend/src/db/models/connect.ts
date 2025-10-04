import { connect } from 'mongoose'

export const dbConnect = async () => {
  const uri =
    process.env.MONGODB_DB_URI ||
    'mongodb://root:root@mongo:27017/lanuage-cards?authSource=admin'
  await connect(uri)
}
