import Term from "../models/term.js";
import LearningStrand from "../models/learning_strand.js";
import Staff from "../models/staff.js";
import ClassLevel from "../models/class_level.js";
import bcrypt from "bcryptjs";
import Learner from "../models/learner.js";
import Volunteer from "../models/volunteer.js";

export async function injectStaff() {
  const staffData = [
    [
      {
        lastName: "Istrator",
        firstName: "Admin",
        id: "91267",
        accessLevel: 1,
        password: "rootpass",
      },
      {
        canMgStuds: true,
        canMgEnrollment: true,
        canMgVolunteer: true,
        canMgClass: true,
        canMgTerm: true,
        canMgLs: true,
        canMgStudReq: true,
        canMgStaff: true,
      },
      {
        id: 7,
        description: "Added Staff with ID: 53725",
        date: new Date(),
      },
    ],
    [
      {
        lastName: "Caga",
        firstName: "John",
        id: "11267",
        accessLevel: 2,
        password: "rootpass",
      },
      {
        canMgStuds: true,
        canMgEnrollment: true,
        canMgVolunteer: true,
        canMgClass: true,
        canMgTerm: true,
        canMgLs: true,
        canMgStudReq: true,
        canMgStaff: true,
      },
      {
        id: 2,
        description: "Added Staff with ID: 53697",
        date: new Date(),
      },
    ],
    [
      {
        lastName: "Portman",
        firstName: "Natalie",
        id: "21267",
        accessLevel: 2,
        password: "rootpass",
      },
      {
        canMgStuds: true,
        canMgEnrollment: true,
        canMgVolunteer: true,
        canMgClass: true,
        canMgTerm: true,
        canMgLs: true,
        canMgStudReq: true,
        canMgStaff: true,
      },
      {
        id: 3,
        description: "Added Staff with ID: 53698",
        date: new Date(),
      },
    ],
    [
      {
        lastName: "Dimal",
        firstName: "Nazib",
        id: "53697",
        accessLevel: 3,
        password: "nazpass",
      },
      {
        canMgStuds: true,
        canMgVolunteer: true,
        canMgClass: true,
      },
      {
        id: 4,
        description: "Added Staff with ID: 53699",
        date: new Date(),
      },
    ],
    [
      {
        lastName: "Rola",
        firstName: "Xander",
        id: "55166",
        accessLevel: 3,
        password: "xandpass",
      },
      {
        canMgStuds: true,
        canMgVolunteer: true,
        canMgLs: true,
        canMgStudReq: true,
        canMgStaff: true,
      },
      {
        id: 5,
        description: "Added Staff with ID: 53723",
        date: new Date(),
      },
    ],
    [
      {
        lastName: "Umel",
        firstName: "Ace",
        id: "57381",
        accessLevel: 3,
        password: "acepass",
      },
      {
        canMgVolunteer: true,
        canMgClass: true,
        canMgStudReq: true,
      },
      {
        id: 6,
        description: "Added Staff with ID: 53724",
        date: new Date(),
      },
    ],
  ];

  const createStaff = async (staffData) => {
    const [staff, perms, audit] = staffData;

    staff.hashedPw = await bcrypt.hash(staff.password, 12);
    delete staff.password;

    const createdStaff = await Staff.create(staff);
    await createdStaff.createPermission(perms);
    await createdStaff.createAudit(audit);
  };

  await Promise.all(staffData.map(createStaff));
}

export async function injectAcademicYear() {
  const termData = [
    {
      batch_number: 1,
      academic_year: "2015-2016",
      start_date: new Date("2015-06-01"),
      end_date: new Date("2016-03-31"),
      status: false,
    },
    {
      batch_number: 2,
      academic_year: "2016-2017",
      start_date: new Date("2016-06-01"),
      end_date: new Date("2017-03-31"),
      status: false,
    },
    {
      batch_number: 3,
      academic_year: "2017-2018",
      start_date: new Date("2017-06-01"),
      end_date: new Date("2018-03-31"),
      status: false,
    },
    {
      batch_number: 4,
      academic_year: "2018-2019",
      start_date: new Date("2018-06-01"),
      end_date: new Date("2019-03-31"),
      status: false,
    },
    {
      batch_number: 5,
      academic_year: "2019-2020",
      start_date: new Date("2020-08-01"),
      end_date: new Date("2021-05-31"),
      status: false,
    },
    {
      batch_number: 6,
      academic_year: "2021-2022",
      start_date: new Date("2021-08-01"),
      end_date: new Date("2022-05-31"),
      status: false,
    },
    {
      batch_number: 7,
      academic_year: "2022-2023",
      start_date: new Date("2022-08-01"),
      end_date: new Date("2023-05-31"),
      status: false,
    },
    {
      batch_number: 8,
      academic_year: "2023-2024",
      start_date: new Date("2023-08-01"),
      end_date: new Date("2024-05-31"),
      status: true,
    },
  ];

  const classLevelData = [
    {
      school_level: "Grade School",
    },
    {
      school_level: "Junior High School",
    },
  ];

  await Promise.all(
    termData.map(async (academic_year) => {
      await Term.create(academic_year);
    })
  );

  const active_year = await Term.findOne({ where: { status: true } });

  await Promise.all(
    classLevelData.map(async (class_level) => {
      await active_year.createClass_level({
        school_level: class_level.school_level,
      });
    })
  );
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

  const class_levels = await ClassLevel.findAll()

  function getRandomStatus() {
    let status = ['Inactive', 'Active', 'Drop']
    return status[Math.floor(Math.random() * 2)];
  }

  await Promise.all(class_levels.map(async (class_level) => {
    const learners = await Learner.findAll()

    await Promise.all(learners.map(async (learner) => {
      class_level.addLearner(learner, {
        through: {
          hasEnrollmentForm: true,
          status: getRandomStatus(),
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
      name: "Communication Skills - English",
    },
    {
      code: "LS2",
      name: "Communication Skills - Filipino",
    },
    {
      code: "LS3",
      name: "Science",
    },
    {
      code: "LS4",
      name: "Mathematics",
    },
    {
      code: "LS5",
      name: "Career and Life Skills",
    },
    {
      code: "LS6",
      name: "Understanding the Self and Society",
    },
    {
      code: "LS7",
      name: "Digital Literacy",
    },
    {
      code: "HVE",
      name: "Homeroom/Values Education",
    },
  ];

  await Promise.all(
    learningStrandData.map(async (learning_strand) => {
      await LearningStrand.create(learning_strand);
    })
  );
}

export async function injectVolunteer() {
  const volunteerData = [
    {
      volunteerId: 1,
      affiliation: 'Student',
      lastName: 'Dela Cruz',
      firstName: 'Shelly'
    },
    {
      volunteerId: 2,
      affiliation: 'Student',
      lastName: 'Fuentes',
      firstName: 'Alonzo'
    },
    {
      volunteerId: 3,
      affiliation: 'Student',
      lastName: 'Firma',
      firstName: 'Alejandra'
    },
    {
      volunteerId: 4,
      affiliation: 'Student',
      lastName: 'Horticullado',
      firstName: 'Gabriel'
    },
    {
      volunteerId: 5,
      affiliation: 'Student',
      lastName: 'Santos',
      firstName: 'John'
    },
    {
      volunteerId: 6,
      affiliation: 'Student',
      lastName: 'Dapin',
      firstName: 'Job'
    },
    {
      volunteerId: 7,
      affiliation: 'Student',
      lastName: 'Roa',
      firstName: 'Wilson'
    },
    {
      volunteerId: 8,
      affiliation: 'Student',
      lastName: 'Dimagiba',
      firstName: 'Felixson'
    },
    {
      volunteerId: 9,
      affiliation: 'Student',
      lastName: 'Goma',
      firstName: 'Fernan'
    },
    {
      volunteerId: 10,
      affiliation: 'Student',
      lastName: 'Lopez',
      firstName: 'Kenneth'
    },
    {
      volunteerId: 11,
      affiliation: 'Student',
      lastName: 'Sayson',
      firstName: 'Daisy'
    },
  ]

  await Promise.all(
    volunteerData.map(async (volunteer) => {
      await Volunteer.create(volunteer);
    })
  );
}
