import AcademicYear from "../models/academic_year.js";
import Class from "../models/class.js"
import LearningStrand from "../models/learning_strand.js";
import ClassSchedule from "../models/class_learning_strand.js";
import Module from "../models/module.js";
import Attendance from "../models/attendance.js";
import ModuleSubmission from "../models/module_submission.js";
import ClassLearningStrand from "../models/class_learning_strand.js";

// Year-Class Relationship
AcademicYear.hasMany(Class, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
})
Class.belongsTo(AcademicYear)

// Class-LearningStrand Relationship
Class.belongsToMany(LearningStrand, { through: ClassLearningStrand });
LearningStrand.belongsToMany(Class, { through: ClassLearningStrand });

// ClassLearningStrand-Module Relationship
ClassLearningStrand.hasMany(Module, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
})
Module.belongsTo(ClassLearningStrand)

// Student-Class Schedule Relationship
Student.belongsToMany(ClassLearningStrand, { through: Attendance });
ClassLearningStrand.belongsToMany(Student, { through: Attendance });

// Student-Module Relationship
Student.belongsToMany(Module, { through: ModuleSubmission });
Module.belongsToMany(Module, { through: ModuleSubmission });




