module.exports = mongoose => {
  const EstimateRequest = mongoose.model(
    "estimateRequest",
    mongoose.Schema(
      {
        username: String,
        shopName: String,
        insuranceCompany: String,
        vin: String,
        year: String,
        make: String,
        model: String,
        description: String,
        files: Array,
        awaiting: Boolean,
        closed: Boolean
      },
      { timestamps: true }
    )
  );
  return EstimateRequest;
};