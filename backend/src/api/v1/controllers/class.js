import {
  Attendance,
  ClassLearningStrand,
  ClassLevel,
  ClassSchedule,
  Grade,
  Module,
  ModuleSubmission,
  Session,
} from "../models/class/index.js";

import { Enrollment, Term } from "../models/index.js";
import { Student } from "../models/student/index.js";
import { Volunteer } from "../models/volunteer/volunteer.js";

export async function getClass(req, res, next) {
  const classId = req.params.classId;

  try {
    const classLevel = await ClassLevel.findByPk(classId, {
      include: [Term]
    });
    
    res.status(200).json({
      message: "Fetched class successfully.",
      data: classLevel,
    });
  } catch(error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

export async function getClassSchedules(req, res, next) {
  const classId = req.params.classId;

  try {
    const classLearningStrands = await ClassLearningStrand.findAll({
      where: { classLevelId: classId },
      include: [
        {
          model: ClassSchedule,
          include: [Volunteer],
          order: [["start_time", "ASC"]]
        },
      ],
      order: [["code", "ASC"]],
    });

    res.status(200).json({
      message: "Fetched class schedules successfully!",
      data: classLearningStrands,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

export async function addLearningStrands(req, res, next) {
  try {
    await ClassLearningStrand.bulkCreate(req.body)

    res.status(201).json({
      message: "Added learning strands successfully!",
    });
  } catch (error) {
      if (!error.statusCode) {
          error.statusCode = 500;
      }
      next(error);
  }
}

export async function getAllStrands(req, res, next) {
  const classId = req.params.classId;

  try {
      const learningStrands = await ClassLearningStrand.findAll({
          where: {classLevelId: classId}, 
          include: [ 
            {model: ClassSchedule, include: [Volunteer], order: [["start_time", "ASC"]]},
            Module
          ],
          order: [["code", "ASC"]]
      })

      res.status(201).json({ 
          message: "Learning strand added!",
          data: learningStrands
      });
  } catch (error) {
      if (!error.statusCode) {
          error.statusCode = 500;
      }
      next(error);
  }
}

export async function removeStrands(req, res, next) {
  const { learningStrandIds } = req.body;

  try {
    await ClassLearningStrand.destroy({
      where: { id: learningStrandIds },
    });

    res.status(201).json({
      message: "Deleted class learning strands successfully!",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

export async function getAllModules(req, res, next) {
  const classId = req.params.classId;
  
  try {
      const classLevel = await ClassLevel.findByPk(classId, {
          include: {model: ClassLearningStrand, include: [Module]}
      })
      
      const modules = []
      classLevel.class_learning_strands.forEach(learningStrand => {
          modules.push(...learningStrand.modules)
      });

      res.status(201).json({ 
          message: "Fetched all modules successfully!",
          data: modules
      });
  } catch (error) {
      if (!error.statusCode) {
          error.statusCode = 500;
      }
      next(error);
  }
}

export async function getAllStudents(req, res, next) {
  const classId = req.params.classId;

  try {
    const activeStudents = await ClassLevel.findByPk(classId, {
        include: {model: Enrollment, 
            where: {
                status: 'Active'
            },
            include: [Student]}
    })

    const inactiveStudents = await ClassLevel.findByPk(classId, {
        include: {model: Enrollment, 
            where: {
                status: 'Inactive'
            },
            include: [Student]}
    })

    const dropStudents = await ClassLevel.findByPk(classId, {
        include: {model: Enrollment, 
            where: {
                status: 'Drop'
            },
            include: [Student]}
    })

    res.status(201).json({ 
        message: "Fetched all students successfully!",
        data: {
            active: activeStudents, 
            inactive: inactiveStudents, 
            drop: dropStudents
        }
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

export async function getStudent(req, res, next) {
  const enrollmentId = req.params.enrollmentId;
  const classId = req.params.classId;

  try {
    const classLearningStrands = await ClassLearningStrand.findAll({
      where: { classLevelId: classId },
      include: [
        { model: Grade, where: { enrollmentId: enrollmentId } },
        {
          model: Module,
          include: [
            { model: ModuleSubmission, where: { enrollmentId: enrollmentId } },
          ],
        },
        {
          model: Session,
          include: [
            { model: Attendance, where: { enrollmentId: enrollmentId } },
          ],
        },
      ],
    });

    res.status(200).json({
      message: "Fetched student successfully!",
      data: classLearningStrands,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}
