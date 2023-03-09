module.exports = {
  development: {
    port: process.env.PORT || 3000,
    privetKey: process.env.PRIVATE_KEY,
    databaseUrl: `mongodb+srv://user:${process.env.PASSWORD}@${process.env.DATABASE_CLUSTER_NAME}.dg6bv.mongodb.net/${process.env.DATABASE_COLLECTION_NAME}?retryWrites=true&w=majority`,
  },
  production: {},
};
