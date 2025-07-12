// Modèle de données pour Course
export interface Course {
  id: string;
  title: string;
  description: string;
  // ...autres propriétés...
}

// Exemple de schéma Mongoose
// import mongoose from 'mongoose';
// const CourseSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   // ...
// });
// export default mongoose.model('Course', CourseSchema);
