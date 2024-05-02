import Student from "../models/student.js";
import Application from "../models/application.js";
import PersonalInfo from "../models/personal_info.js";
import ContactInfo from "../models/contact_info.js";
import PreviousSchool from "../models/previous_school.js";
import ParentalInfo from "../models/parental_info.js";
import EmergencyPerson from "../models/emergency_person.js";

import Term from "../models/term.js";
import ClassLevel from "../models/class_level.js";
import Staff from "../models/staff.js";
import Permission from "../models/permission.js";
import LearningStrand from "../models/learning_strand.js";
import Module from "../models/module.js";
import Enrollment from "../models/enrollment.js";
import ModuleSubmission from "../models/module_submission.js";
import ClassLearningStrand from "../models/class_learning_strand.js";
import ClassSchedule from "../models/class_schedule.js";

function setAssociations() {
  // Staff-Permission Relationship
  Staff.hasOne(Permission);
  Permission.belongsTo(Staff);

  // Student-Application Relationship
  Student.hasOne(Application);
  Application.belongsTo(Student);

  // Student-PersonalInfo Relationship
  Student.hasOne(PersonalInfo);
  PersonalInfo.belongsTo(Student);

  // Student-ContactInfo Relationship
  Student.hasOne(ContactInfo);
  ContactInfo.belongsTo(Student);

  // Student-PreviousSchool Relationship
  Student.hasOne(PreviousSchool);
  PreviousSchool.belongsTo(Student);

  // Student-ParentalInfo Relationship
  Student.hasOne(ParentalInfo);
  ParentalInfo.belongsTo(Student);

  // Student-EmergencyPerson Relationship
  Student.hasOne(EmergencyPerson);
  EmergencyPerson.belongsTo(Student);

  // Year-Class Relationship
  Term.hasMany(ClassLevel, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  });
  ClassLevel.belongsTo(Term);

  // Class-LearningStrand Relationship
  ClassLevel.belongsToMany(LearningStrand, { through: ClassLearningStrand });
  LearningStrand.belongsToMany(ClassLevel, { through: ClassLearningStrand });
  LearningStrand.hasMany(ClassLearningStrand);
  ClassLearningStrand.belongsTo(LearningStrand);
  ClassLevel.hasMany(ClassLearningStrand);
  ClassLearningStrand.belongsTo(ClassLevel);

  // ClassLearningStrand-Schedule Relationship
  ClassLearningStrand.hasMany(ClassSchedule);
  ClassSchedule.belongsTo(ClassLearningStrand);

  // ClassLearningStrand-Module Relationship
  ClassLearningStrand.hasMany(Module, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  });
  Module.belongsTo(ClassLearningStrand);

  // Student-ClassLevel Relationship
  Student.belongsToMany(ClassLevel, { through: Enrollment });
  ClassLevel.belongsToMany(Student, { through: Enrollment });

  // // Student-Class Schedule Relationship
  // Student.belongsToMany(ClassLearningStrand, { through: Attendance });
  // ClassLearningStrand.belongsToMany(Student, { through: Attendance });

  // Student-Module Relationship
  Student.belongsToMany(Module, { through: ModuleSubmission });
  Module.belongsToMany(Student, { through: ModuleSubmission });
}

export default setAssociations;
