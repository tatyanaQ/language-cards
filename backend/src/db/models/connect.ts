import { connect } from 'mongoose'

export const dbConnect = async () => {
  const uri =
    process.env.MONGODB_DB_URI ||
    'mongodb://root:root@mongo:27017/lanuage-cards?authSource=admin'
  console.log('NODE_ENV', process.env.NODE_ENV)
  console.log('uri ends with', uri.slice(-50))
  await connect(uri)
}
