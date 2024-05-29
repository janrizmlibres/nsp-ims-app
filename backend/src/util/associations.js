import {
  Student,
  PersonalInfo,
  ContactInfo,
  EmergencyPerson,
  ParentalInfo,
  PreviousSchool,
  RequirementInfo,
} from "../api/v1/models/student/index.js";

import {
  ClassLearningStrand,
  ClassSchedule,
  ClassLevel,
  Module,
  ModuleSubmission,
  Grade,
  Session,
  Attendance,
} from "../api/v1/models/class/index.js";

import {
  Term,
  LearningStrand,
  StudentRequirement,
  Enrollment,
} from "../api/v1/models/index.js";

import { User, Permission, Audit } from "../api/v1/models/user/index.js";

import {
  Volunteer,
  StudentVolunteer,
  ProfessionalVolunteer,
  VolunteerPersonalInformation,
  VolunteerContactInformation,
  VolunteerEmergency,
  VolunteerSpecialization,
  VolunteerAvailability,
} from "../api/v1/models/volunteer/index.js";

export default setAssociations = () => {
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
};
