import Staff from "../models/staff.js";
import Permission from "../models/permission.js";
import AcademicYear from "../models/academic_year.js";
import Class from "../models/class.js";
import LearningStrand from "../models/learning_strand.js";
import ClassSchedule from "../models/class_schedule.js";
import Module from "../models/module.js";
// import Attendance from "../models/attendance.js";
// import ModuleSubmission from "../models/module_submission.js";

Staff.hasOne(Permission);
Permission.belongsTo(Staff);

// Year-Class Relationship
AcademicYear.hasMany(Class, {
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});
Class.belongsTo(AcademicYear);

// Class-LearningStrand Relationship
Class.belongsToMany(LearningStrand, { through: ClassSchedule });
LearningStrand.belongsToMany(Class, { through: ClassSchedule });

Class.belongsToMany(LearningStrand, { through: Module });
LearningStrand.belongsToMany(Class, { through: Module });

// Student-Class Schedule Relationship
// Student.belongsToMany(ClassSchedule, { through: Attendance });
// ClassSchedule.belongsToMany(Student, { through: Attendance });

// // Student-Module Relationship
// Student.belongsToMany(Module, { through: ModuleSubmission });
// Module.belongsToMany(Module, { through: ModuleSubmission });
