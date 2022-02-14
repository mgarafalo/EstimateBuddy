module.exports = mongoose => {
  const EstimateRequest = mongoose.model(
    "estimateRequest",
    mongoose.Schema(
      {
        shopName: String,
        vin: String,
        year: String,
        make: String,
        model: String,
        description: String,
      },
      { timestamps: true }
    )
  );
  return EstimateRequest;
};