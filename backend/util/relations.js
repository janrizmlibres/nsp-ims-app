import Term from "../models/term.js";
import ClassLevel from "../models/class_level.js"
import Staff from "../models/staff.js";
import Permission from "../models/permission.js";
import LearningStrand from "../models/learning_strand.js";
import Module from "../models/module.js";
import Student from "../models/nsp_student.js";
import Enrollment from "../models/enrollment.js";
import Attendance from "../models/attendance.js";
import ModuleSubmission from "../models/module_submission.js";
import ClassLearningStrand from "../models/class_learning_strand.js";
import ClassSchedule from "../models/class_schedule.js";
import Session from "../models/session.js";
import Learner from "../models/learner.js";

function setAssociations() {
    // Staff-Permission Relationship
    Staff.hasOne(Permission);
    Permission.belongsTo(Staff);

    // Year-Class Relationship
    Term.hasMany(ClassLevel, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
    })
    ClassLevel.belongsTo(Term)

    // Class-LearningStrand Relationship
    ClassLevel.belongsToMany(LearningStrand, { through: ClassLearningStrand });
    LearningStrand.belongsToMany(ClassLevel, { through: ClassLearningStrand });
    LearningStrand.hasMany(ClassLearningStrand)
    ClassLearningStrand.belongsTo(LearningStrand)
    ClassLevel.hasMany(ClassLearningStrand)
    ClassLearningStrand.belongsTo(ClassLevel)

    // ClassLearningStrand-Schedule Relationship
    ClassLearningStrand.hasMany(ClassSchedule)
    ClassSchedule.belongsTo(ClassLearningStrand)

    // ClassLearningStrand-Module Relationship
    ClassLearningStrand.hasMany(Module, {
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
    })
    Module.belongsTo(ClassLearningStrand)

    // Learner-Student Relationship
    Learner.hasOne(Student)
    Student.belongsTo(Learner)

    // Student-ClassLevel Relationship
    Student.belongsToMany(ClassLevel, { through: Enrollment });
    ClassLevel.belongsToMany(Student, { through: Enrollment });
    ClassLevel.hasMany(Enrollment)
    Enrollment.belongsTo(ClassLevel)
    Student.hasMany(Enrollment)
    Enrollment.belongsTo(Student)

    // Student-Class Learning Strand Relationship
    Student.belongsToMany(Session, { through: Attendance });
    Session.belongsToMany(Student, { through: Attendance });
    Session.hasMany(Attendance)
    Attendance.belongsTo(Session)
    Student.hasMany(Attendance)
    Attendance.belongsTo(Student)

    // Student-Module Relationship
    Student.belongsToMany(Module, { through: ModuleSubmission });
    Module.belongsToMany(Student, { through: ModuleSubmission });
    Module.hasMany(ModuleSubmission)
    ModuleSubmission.belongsTo(Module)
    Student.hasMany(ModuleSubmission)
    ModuleSubmission.belongsTo(Student)
}

export default setAssociations




