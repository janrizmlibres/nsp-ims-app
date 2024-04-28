import Term from "../models/term.js";
import ClassLevel from "../models/class_level.js"
import Staff from "../models/staff";
import Permission from "../models/permission";
import LearningStrand from "../models/learning_strand.js";
import Module from "../models/module.js";
import Student from "../models/nsp_student.js";
import Enrollment from "../models/enrollment.js";
// import Attendance from "../models/attendance.js";
// import ModuleSubmission from "../models/module_submission.js";
import ClassLearningStrand from "../models/class_learning_strand.js";

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

    // ClassLearningStrand-Module Relationship
    ClassLearningStrand.hasMany(Module, {
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
    })
    Module.belongsTo(ClassLearningStrand)

    // Student-ClassLevel Relationship
    Student.belongsToMany(ClassLevel, { through: Enrollment });
    ClassLevel.belongsToMany(Student, { through: Enrollment });

    // // Student-Class Schedule Relationship
    // Student.belongsToMany(ClassLearningStrand, { through: Attendance });
    // ClassLearningStrand.belongsToMany(Student, { through: Attendance });

    // // Student-Module Relationship
    // Student.belongsToMany(Module, { through: ModuleSubmission });
    // Module.belongsToMany(Module, { through: ModuleSubmission });
}

export default setAssociations




