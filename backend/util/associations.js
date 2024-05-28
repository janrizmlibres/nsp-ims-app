import Student from "../models/student/student.js";
import PersonalInfo from "../models/student/personal_info.js";
import ContactInfo from "../models/student/contact_info.js";
import EmergencyPerson from "../models/student/emergency_person.js";
import ParentalInfo from "../models/student/parental_info.js";
import PreviousSchool from "../models/student/previous_school.js";
import StudentRequirement from "../models/student_requirement.js";
import RequirementInfo from "../models/student/requirement_info.js";

import ClassLearningStrand from "../models/class/class_learning_strand.js";
import ClassSchedule from "../models/class/class_schedule.js";
import Module from "../models/class/module.js";
import ModuleSubmission from "../models/class/module_submission.js";
import Grade from "../models/class/grade.js";
import Session from "../models/class/session.js";
import Attendance from "../models/class/attendance.js";

import Term from "../models/term.js";
import ClassLevel from "../models/class/class_level.js";
import LearningStrand from "../models/learning_strand.js";

import Enrollment from "../models/enrollment.js";

import User from "../models/user/user.js";
import Permission from "../models/user/permission.js";
import Audit from "../models/user/audit.js";

import Volunteer from "../models/volunteer/volunteer.js";
import StudentVolunteer from "../models/volunteer/student_volunteer.js";
import ProfessionalVolunteer from "../models/volunteer/professional_volunteer.js";
import VolunteerPersonalInformation from "../models/volunteer/volunteer_personal_information.js";
import VolunteerContactInformation from "../models/volunteer/volunteer_contact_information.js";
import VolunteerEmergency from "../models/volunteer/volunteer_emergency_contact.js";
import VolunteerSpecialization from "../models/volunteer/volunteer_specialization.js";
import VolunteerAvailability from "../models/volunteer/volunteer_availability.js";

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

  // Student-RequirementInfo Relationship
  Student.hasMany(RequirementInfo);
  RequirementInfo.belongsTo(Student);

  StudentRequirement.hasMany(RequirementInfo);
  RequirementInfo.belongsTo(StudentRequirement);

  // Student-PreviousSchool Relationship
  Student.hasOne(PreviousSchool);
  PreviousSchool.belongsTo(Student);

  // User-Permission Relationship
  User.hasOne(Permission);
  Permission.belongsTo(User);

  // User-Audit Relationship
  User.hasMany(Audit);
  Audit.belongsTo(User);

  // Year-Class Relationship
  Term.hasMany(ClassLevel);
  ClassLevel.belongsTo(Term);

  // Class Learning Strand Relationship
  ClassLevel.belongsToMany(LearningStrand, { through: ClassLearningStrand });
  LearningStrand.belongsToMany(ClassLevel, { through: ClassLearningStrand });
  LearningStrand.hasMany(ClassLearningStrand);
  ClassLearningStrand.belongsTo(LearningStrand);
  ClassLevel.hasMany(ClassLearningStrand);
  ClassLearningStrand.belongsTo(ClassLevel);

  // Class Learning Strand-Schedule Relationship
  ClassLearningStrand.belongsToMany(Volunteer, { through: ClassSchedule });
  Volunteer.belongsToMany(ClassLearningStrand, { through: ClassSchedule });
  Volunteer.hasMany(ClassSchedule);
  ClassSchedule.belongsTo(Volunteer);
  ClassLearningStrand.hasMany(ClassSchedule);
  ClassSchedule.belongsTo(ClassLearningStrand);

  // Class Learning Strand-Module Relationship
  ClassLearningStrand.hasMany(Module);
  Module.belongsTo(ClassLearningStrand);

  // Student-ClassLevel Relationship
  Student.belongsToMany(ClassLevel, { through: Enrollment });
  ClassLevel.belongsToMany(Student, { through: Enrollment });
  ClassLevel.hasMany(Enrollment);
  Enrollment.belongsTo(ClassLevel);
  Student.hasMany(Enrollment);
  Enrollment.belongsTo(Student);

  // Class Learning Strand-Session Relationship
  ClassLearningStrand.hasMany(Session);
  Session.belongsTo(ClassLearningStrand);

  // Student-Session Relationship
  Enrollment.belongsToMany(Session, { through: Attendance });
  Session.belongsToMany(Enrollment, { through: Attendance });
  Session.hasMany(Attendance);
  Attendance.belongsTo(Session);
  Enrollment.hasMany(Attendance);
  Attendance.belongsTo(Enrollment);

  // Student-Class Learning Strand Relationship
  Enrollment.belongsToMany(ClassLearningStrand, { through: Grade });
  ClassLearningStrand.belongsToMany(Enrollment, { through: Grade });
  ClassLearningStrand.hasMany(Grade);
  Grade.belongsTo(ClassLearningStrand);
  Enrollment.hasMany(Grade);
  Grade.belongsTo(Enrollment);

  // Student-Module Relationship
  Enrollment.belongsToMany(Module, { through: ModuleSubmission });
  Module.belongsToMany(Enrollment, { through: ModuleSubmission });
  Module.hasMany(ModuleSubmission);
  ModuleSubmission.belongsTo(Module);
  Enrollment.hasMany(ModuleSubmission);
  ModuleSubmission.belongsTo(Enrollment);

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
  Volunteer.hasOne(VolunteerAvailability);
  VolunteerAvailability.belongsTo(Volunteer);

  // Volunteer-Specialization Relationship
  Volunteer.hasOne(VolunteerSpecialization);
  VolunteerSpecialization.belongsTo(Volunteer);
}

export default setAssociations;
