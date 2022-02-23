module.exports = {
  // url: "mongodb://localhost:27017/EstimateBuddyTestV1"
  // url: "mongodb+srv://admin:Mg91947$@cluster0.6bigj.mongodb.net/EstimateBuddy"
  url: process.env.mongoConnString || "mongodb+srv://admin:Mg91947$@cluster0.6bigj.mongodb.net/EstimateBuddy"
};