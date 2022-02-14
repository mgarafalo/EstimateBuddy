module.exports = mongoose => {
  const Shop = mongoose.model(
    "shop",
    mongoose.Schema(
      {
        shopName: String,
        email: String,
        phoneNumber: String,
        username: String,
        password: String
      },
      { timestamps: true }
    )
  );
  return Shop;
};