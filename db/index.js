const mongoose = require('mongoose');
try {
    mongoose.connect("mongodb+srv://admin:DEB07banerJEE@cluster0.lhwmubf.mongodb.net/new_db");
    console.log("connected");
} catch (err) {
    console.log(err);
}
const AdminSchema = new mongoose.Schema({
    username: String,
    password: String,
});
const UserSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageLink: String,
    price: Number,
    purchasesCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    }]
});
const CourseSchema = new mongoose.Schema({
});
const Admin = mongoose.model('admins', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);
module.exports = {
    Admin,
    User,
    Course
}