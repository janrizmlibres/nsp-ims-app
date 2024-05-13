import Student from "../models/student/student.js";
import PersonalInfo from "../models/student/personal_info.js";
import ContactInfo from "../models/student/contact_info.js";
import EmergencyPerson from "../models/student/emergency_person.js";
import ParentalInfo from "../models/student/parental_info.js";
import PreviousSchool from "../models/student/previous_school.js";

import Term from "../models/term.js";
import ClassLevel from "../models/class_level.js";
import LearningStrand from "../models/learning_strand.js";
import Module from "../models/module.js";
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
  // Student-PersonalInfo Relationship
  Student.hasOne(PersonalInfo);
  PersonalInfo.belongsTo(Student);

  // Student-ContactInfo Relationship
  Student.hasOne(ContactInfo);
  ContactInfo.belongsTo(Student);

  // Student-EmergencyPerson Relationship
  Student.hasOne(EmergencyPerson);
  EmergencyPerson.belongsTo(Student);

  // Student-ParentalInfo Relationship
  Student.hasOne(ParentalInfo);
  ParentalInfo.belongsTo(Student);

  // Student-PreviousSchool Relationship
  Student.hasOne(PreviousSchool);
  PreviousSchool.belongsTo(Student);

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
  Student.belongsToMany(ClassLevel, { through: Enrollment });
  ClassLevel.belongsToMany(Student, { through: Enrollment });
  ClassLevel.hasMany(Enrollment);
  Enrollment.belongsTo(ClassLevel);
  Student.hasMany(Enrollment);
  Enrollment.belongsTo(Student);

  // Student-Class Learning Strand Relationship
  Student.belongsToMany(Session, { through: Attendance });
  Session.belongsToMany(Student, { through: Attendance });
  Session.hasMany(Attendance);
  Attendance.belongsTo(Session);
  Student.hasMany(Attendance);
  Attendance.belongsTo(Student);

  // Student-Module Relationship
  Student.belongsToMany(Module, { through: ModuleSubmission });
  Module.belongsToMany(Student, { through: ModuleSubmission });
  Module.hasMany(ModuleSubmission);
  ModuleSubmission.belongsTo(Module);
  Student.hasMany(ModuleSubmission);
  ModuleSubmission.belongsTo(Student);

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
