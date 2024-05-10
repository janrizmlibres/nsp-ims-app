import Term from "../models/term.js";
import ClassLevel from "../models/class_level.js";
import LearningStrand from "../models/learning_strand.js";
import Module from "../models/module.js";
import Learner from "../models/learner.js";
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

function setAssociations() {
  // Staff-Permission Relationship
  Staff.hasOne(Permission);
  Permission.belongsTo(Staff);

  // Staff-Audit Relationship
  Staff.hasMany(Audit);
  Audit.belongsTo(Staff);

  // Year-Class Relationship
  Term.hasMany(ClassLevel);
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
  ClassLearningStrand.hasMany(Module);
  Module.belongsTo(ClassLearningStrand);

  // Student-ClassLevel Relationship
  Learner.belongsToMany(ClassLevel, { through: Enrollment });
  ClassLevel.belongsToMany(Learner, { through: Enrollment });
  ClassLevel.hasMany(Enrollment);
  Enrollment.belongsTo(ClassLevel);
  Learner.hasMany(Enrollment);
  Enrollment.belongsTo(Learner);

  // Student-Class Learning Strand Relationship
  Learner.belongsToMany(Session, { through: Attendance });
  Session.belongsToMany(Learner, { through: Attendance });
  Session.hasMany(Attendance);
  Attendance.belongsTo(Session);
  Learner.hasMany(Attendance);
  Attendance.belongsTo(Learner);

  // Student-Module Relationship
  Learner.belongsToMany(Module, { through: ModuleSubmission });
  Module.belongsToMany(Learner, { through: ModuleSubmission });
  Module.hasMany(ModuleSubmission);
  ModuleSubmission.belongsTo(Module);
  Learner.hasMany(ModuleSubmission);
  ModuleSubmission.belongsTo(Learner);

  // Volunteer-Affiliation Relationship
  Volunteer.hasOne(StudentVolunteer);
  StudentVolunteer.belongsTo(Volunteer);
  Volunteer.hasOne(ProfessionalVolunteer);
  ProfessionalVolunteer.belongsTo(Volunteer);

  // Volunteer-Personal Information Relationship
  Volunteer.hasOne(VolunteerPersonalInformation);
  VolunteerPersonalInformation.belongsTo(Volunteer);

  // Volunteer-Contact Information Relationship
  Volunteer.hasOne(VolunteerContactInformation);
  VolunteerContactInformation.belongsTo(Volunteer);

  // Volunteer-Emergency Contact Relationship
  Volunteer.hasOne(VolunteerEmergency);
  VolunteerEmergency.belongsTo(Volunteer);

  // Volunteer-Availability Relationship
  Volunteer.hasOne(VolunteerSpecialization);
  VolunteerSpecialization.belongsTo(Volunteer);

  // Volunteer-Specialization Relationship
  Volunteer.hasOne(VolunteerSpecialization);
  VolunteerSpecialization.belongsTo(Volunteer);
}

export default setAssociations;
