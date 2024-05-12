import Term from "../models/term.js";
import ClassLevel from "../models/class_level.js";
import LearningStrand from "../models/learning_strand.js";
import Module from "../models/module.js";
import Grade from "../models/grade.js";
import Student from "../models/student/student.js";
import Enrollment from "../models/enrollment.js";
import Attendance from "../models/attendance.js";
import ModuleSubmission from "../models/module_submission.js";
import ClassLearningStrand from "../models/class_learning_strand.js";
import ClassSchedule from "../models/class_schedule.js";
import Session from "../models/session.js";
import Staff from "../models/staff/staff.js";
import Permission from "../models/staff/permission.js";
import Audit from "../models/staff/audit.js";
import Volunteer from "../models/volunteer/volunteer.js";
import StudentVolunteer from "../models/volunteer/student_volunteer.js";
import ProfessionalVolunteer from "../models/volunteer/professional_volunteer.js";
import VolunteerPersonalInformation from "../models/volunteer/volunteer_personal_information.js";
import VolunteerContactInformation from "../models/volunteer/volunteer_contact_information.js";
import VolunteerEmergency from "../models/volunteer/volunteer_emergency_contact.js";
import VolunteerSpecialization from "../models/volunteer/volunteer_specialization.js";
import VolunteerAvailability from "../models/volunteer/volunteer_availability.js";

function setAssociations() {
  // Staff-Permission Relationship
  Staff.hasOne(Permission);
  Permission.belongsTo(Staff);

  // Staff-Audit Relationship
  Staff.hasMany(Audit);
  Audit.belongsTo(Staff);

  // Year-Class Relationship
  Term.hasMany(ClassLevel, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  });
  ClassLevel.belongsTo(Term);

  // Class Learning Strand Relationship
  ClassLevel.belongsToMany(LearningStrand, { through: ClassLearningStrand });
  LearningStrand.belongsToMany(ClassLevel, { through: ClassLearningStrand });
  LearningStrand.hasMany(ClassLearningStrand);
  ClassLearningStrand.belongsTo(LearningStrand);
  ClassLevel.hasMany(ClassLearningStrand);
  ClassLearningStrand.belongsTo(ClassLevel);

  // Class Learning Strand-Schedule Relationship
  ClassLearningStrand.belongsToMany(Volunteer, { through: ClassSchedule});
  Volunteer.belongsToMany(ClassLearningStrand, { through: ClassSchedule });
  Volunteer.hasMany(ClassSchedule)
  ClassSchedule.belongsTo(Volunteer)
  ClassLearningStrand.hasMany(ClassSchedule)
  ClassSchedule.belongsTo(ClassLearningStrand)

  // Class Learning Strand-Module Relationship
  ClassLearningStrand.hasMany(Module)
  Module.belongsTo(ClassLearningStrand)

  // Student-ClassLevel Relationship
  Student.belongsToMany(ClassLevel, { through: Enrollment });
  ClassLevel.belongsToMany(Student, { through: Enrollment });
  ClassLevel.hasMany(Enrollment)
  Enrollment.belongsTo(ClassLevel)
  Student.hasMany(Enrollment)
  Enrollment.belongsTo(Student)

  // Class Learning Strand-Session Relationship
  ClassLearningStrand.hasMany(Session)
  Session.belongsTo(ClassLearningStrand)

  // Student-Session Relationship
  Student.belongsToMany(Session, { through: Attendance });
  Session.belongsToMany(Student, { through: Attendance });
  Session.hasMany(Attendance)
  Attendance.belongsTo(Session)
  Student.hasMany(Attendance)
  Attendance.belongsTo(Student)

  // Student-Class Learning Strand Relationship
  Student.belongsToMany(ClassLearningStrand, { through: Grade });
  ClassLearningStrand.belongsToMany(Student, { through: Grade });
  ClassLearningStrand.hasMany(Grade)
  Grade.belongsTo(ClassLearningStrand)
  Student.hasMany(Grade)
  Grade.belongsTo(Student)

  // Student-Module Relationship
  Student.belongsToMany(Module, { through: ModuleSubmission });
  Module.belongsToMany(Student, { through: ModuleSubmission });
  Module.hasMany(ModuleSubmission)
  ModuleSubmission.belongsTo(Module)
  Student.hasMany(ModuleSubmission)
  ModuleSubmission.belongsTo(Student)

  // Volunteer-Affiliation Relationship
  Volunteer.hasOne(StudentVolunteer)
  StudentVolunteer.belongsTo(Volunteer)
  Volunteer.hasOne(ProfessionalVolunteer)
  ProfessionalVolunteer.belongsTo(Volunteer)

  // Volunteer-Personal Information Relationship
  Volunteer.hasOne(VolunteerPersonalInformation)
  VolunteerPersonalInformation.belongsTo(Volunteer)

  // Volunteer-Contact Information Relationship
  Volunteer.hasOne(VolunteerContactInformation)
  VolunteerContactInformation.belongsTo(Volunteer)

  // Volunteer-Emergency Contact Relationship
  Volunteer.hasOne(VolunteerEmergency)
  VolunteerEmergency.belongsTo(Volunteer)

  // Volunteer-Availability Relationship
  Volunteer.hasOne(VolunteerAvailability)
  VolunteerAvailability.belongsTo(Volunteer)

  // Volunteer-Specialization Relationship
  Volunteer.hasOne(VolunteerSpecialization)
  VolunteerSpecialization.belongsTo(Volunteer)
}

export default setAssociations;