import Term from "../models/term.js";
import LearningStrand from "../models/learning_strand.js";
import Staff from "../models/staff.js";
import ClassLevel from "../models/class_level.js";
import bcrypt from "bcryptjs";
import Learner from "../models/learner.js";
import Student from "../models/nsp_student.js";

export async function injectStaff() {
  const staffData = [
    [
      {
        lastName: "Dimal",
        firstName: "Nazib",
        id: "53697",
        password: "nazpass",
      },
      {
        canMgStuds: true,
        canMgVolunteer: true,
        canMgClass: true,
      },
    ],
    [
      {
        lastName: "Rola",
        firstName: "Xander",
        id: "55166",
        password: "xandpass",
      },
      {
        canMgStuds: true,
        canMgVolunteer: true,
        canMgClass: true,
        canMgLs: true,
        canMgStudReq: true,
        canMgStaff: true,
      },
    ],
    [
      {
        lastName: "Umel",
        firstName: "Ace",
        id: "57381",
        password: "acepass",
      },
      {
        canMgVolunteer: true,
        canMgClass: true,
        canMgStudReq: true,
      },
    ],
  ];

  const createStaff = async (staffData) => {
    const [staff, perms] = staffData;

    staff.hashedPw = await bcrypt.hash(staff.password, 12);
    delete staff.password;

    const createdStaff = await Staff.create(staff);
    await createdStaff.createPermission(perms);
  };

  await Promise.all(staffData.map(createStaff));
}

export async function injectAcademicYear() {
  const termData = [
    {
      batch_number: 1,
      academic_year: '2015-2016',
      start_date: new Date("2015-06-01"),
      end_date: new Date("2016-03-31"),
      status: false
    },
    {
      batch_number: 2,
      academic_year: '2016-2017',
      start_date: new Date("2016-06-01"),
      end_date: new Date("2017-03-31"),
      status: false
    },
    {
      batch_number: 3,
      academic_year: '2017-2018',
      start_date: new Date("2017-06-01"),
      end_date: new Date("2018-03-31"),
      status: false
    },
    {
      batch_number: 4,
      academic_year: '2018-2019',
      start_date: new Date("2018-06-01"),
      end_date: new Date("2019-03-31"),
      status: false
    },
    {
      batch_number: 5,
      academic_year: '2019-2020',
      start_date: new Date("2020-08-01"),
      end_date: new Date("2021-05-31"),
      status: false
    },
    {
      batch_number: 6,
      academic_year: '2021-2022',
      start_date: new Date("2021-08-01"),
      end_date: new Date("2022-05-31"),
      status: false
    },
    {
      batch_number: 7,
      academic_year: '2022-2023',
      start_date: new Date("2022-08-01"),
      end_date: new Date("2023-05-31"),
      status: false
    },
    {
      batch_number: 8,
      academic_year: '2023-2024',
      start_date: new Date("2023-08-01"),
      end_date: new Date("2024-05-31"),
      status: true
    },
  ];

  const classLevelData = [
    {
      school_level: "Grade School"
    },
    {
      school_level: "Junior High School"
    },
  ];

  await Promise.all(termData.map(async (academic_year) => {
    await Term.create(academic_year);
  }));

  const active_year = await Term.findOne(
      { where: { status: true } }
  );

  await Promise.all(classLevelData.map(async (class_level) => {
    await active_year.createClass_level(
      {
        school_level: class_level.school_level
      }
    )
  }));
}
1242312145189
export async function injectLearner() {
  const learnerData = [
    {
      lrn: 1242312145189,
      lastName: 'Dela Cruz',
      firstName: 'Juan',
      category: 'Out-of-School Youth'
    },
    {
      lrn: 1242312145145,
      lastName: 'Bautista',
      firstName: 'Felix',
      middleName: 'Polso',
      category: 'Out-of-School Youth'
    },
    {
      lastName: 'Amidrano',
      firstName: 'Nicolette',
      middleName: 'Bucio',
      category: 'Out-of-School Youth'
    },
    {
      lastName: 'Fernandez',
      firstName: 'Hero',
      middleName: 'Baltazar',
      category: 'Out-of-School Youth'
    },
    {
      lrn: 1242312145714,
      lastName: 'Santos',
      firstName: 'Dominic',
      middleName: 'Dicolano',
      category: 'Out-of-School Youth'
    },
    {
      lrn: 1242562145189,
      lastName: 'Fulminar',
      firstName: 'Ashley',
      middleName: 'De Guzman',
      category: 'Out-of-School Youth'
    },
    {
      lastName: 'Quintos',
      firstName: 'Ariel',
      middleName: 'Furtonado',
      category: 'Out-of-School Youth'
    },
    {
      lastName: 'Hilot',
      firstName: 'Van',
      middleName: 'Culminares',
      category: 'Out-of-School Youth'
    },
    {
      lrn: 1247192145189,
      lastName: 'Alonto',
      firstName: 'Princess Aliah',
      category: 'Out-of-School Youth'
    },
    {
      lastName: 'Montecillo',
      firstName: 'Dirk',
      middleName: 'Santocildis',
      category: 'Out-of-School Youth'
    },
  ]

  await Promise.all(learnerData.map(async (learner) => {
    await Learner.create(learner);
  }));

  const learners = await Learner.findAll()

  await Promise.all(learners.map(async (learner) => {
    await learner.createStudent(
      {
        ftl_pretest: getRandomInt(0, 100)
      }
    )
  }));

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const class_levels = await ClassLevel.findAll()

  await Promise.all(class_levels.map(async (class_level) => {
    const students = await Student.findAll()

    await Promise.all(students.map(async (student) => {
      class_level.addStudent(student, {
        through: {
          hasEnrollmentForm: true,
          status: 'Active',
          modularity: 'Regular',
        }
      })
    }));
  }));
}

export async function injectLearningStrand() {
  const learningStrandData = [
    {
      code: "LS1",
      name: "Communication Skills - English"
    },
    {
      code: "LS2",
      name: "Communication Skills - Filipino"
    },
    {
      code: "LS3",
      name: "Science"
    },
    {
      code: "LS4",
      name: "Mathematics"
    },
    {
      code: "LS5",
      name: "Career and Life Skills"
    },
    {
      code: "LS6",
      name: "Understanding the Self and Society"
    },
    {
      code: "LS7",
      name: "Digital Literacy"
    },
    {
      code: "HVE",
      name: "Homeroom/Values Education"
    },
  ];


  await Promise.all(learningStrandData.map(async (learning_strand) => {
    await LearningStrand.create(learning_strand);
  }));
}