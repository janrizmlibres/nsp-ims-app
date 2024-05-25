import bcrypt from "bcryptjs";

import ClassLevel from "../models/class/class_level.js"
import ClassLearningStrand from "../models/class/class_learning_strand.js"
import Student from "../models/student/student.js";
import User from "../models/user/user.js";
import Term from "../models/term.js";
import LearningStrand from "../models/learning_strand.js";
import StudentRequirement from "../models/student_requirement.js";
import StudentCategory from "../models/student_category.js";
import Volunteer from "../models/volunteer/volunteer.js";
import PersonalInfo from "../models/student/personal_info.js";
import ContactInfo from "../models/student/contact_info.js";
import EmergencyPerson from "../models/student/emergency_person.js";
import PreviousSchool from "../models/student/previous_school.js";

export async function injectAll() {
  await injectUser();
  await injectLearningStrand();
  await injectAcademicYear();
  await injectStudent();
  await injectVolunteer();
  await injectStudentRequirement();
  await injectStudentCategory();
}

export async function injectStudent() {
  const student1 = await Student.create({
    lrn: "198765150721",
    category: "Street Children",
    firstName: "Gordon",
    lastName: "Ramsay",
    photoUrl: "images/gordon.jpg",
  });

  await PersonalInfo.create({
    birthday: new Date(),
    bloodType: "O+",
    birthBarangay: "Iponan",
    birthCity: "New York City",
    birthProvince: "Misamis Oriental",
    religion: "Roman Catholic",
    sex: "M",
    civilStatus: "Single",
    homeBlkLtSt: "Lackadaisy Hotel",
    homeBarangay: "St. Missouri",
    homeCity: "New York City",
    homeProvince: "Misamis Oriental",
    studentId: student1.id,
  });

  await ContactInfo.create({
    contactNum: "09123456789",
    studentId: student1.id,
  });

  await EmergencyPerson.create({
    firstName: "Mitzi",
    lastName: "May",
    contactNum: "09987654321",
    relationship: "Spouse",
    studentId: student1.id,
  });

  await PreviousSchool.create({
    name: "St. Larlar Musician School",
    schoolType: "Private",
    schoolAffiliation: "Non-Sectarian",
    lastSyAttended: "1920-1921",
    highestEducation: "Secondary education",
    gradeStopped: "Grade 10",
    reason: "Sleeps anywhere",
    street: "Marigold St.",
    barangay: "Balulang",
    city: "Cagayan de Oro City",
    province: "Misamis Oriental",
    studentId: student1.id,
  });

  const student2 = await Student.create({
    lrn: "123456789012345",
    category: "Child Laborer",
    firstName: "Kim",
    lastName: "Chiu",
    photoUrl: "images/kim.jpg",
  });

  await PersonalInfo.create({
    birthday: new Date("1998-05-14"),
    bloodType: "A-",
    birthBarangay: "Carmen",
    birthCity: "Cagayan de Oro City",
    birthProvince: "Misamis Oriental",
    religion: "Islam",
    sex: "F",
    civilStatus: "Single",
    homeBlkLtSt: "123 Happy Street",
    homeBarangay: "Agora",
    homeCity: "Cagayan de Oro City",
    homeProvince: "Misamis Oriental",
    studentId: student2.id,
  });

  await ContactInfo.create({
    contactNum: "09051234567",
    studentId: student2.id,
  });

  await EmergencyPerson.create({
    firstName: "Pedro",
    lastName: "Cruz",
    contactNum: "09187654321",
    relationship: "Father",
    studentId: student2.id,
  });

  await PreviousSchool.create({
    name: "Saint Ignatius School",
    schoolType: "Private",
    schoolAffiliation: "Sectarian",
    lastSyAttended: "2022-2023",
    highestEducation: "No formal education",
    gradeStopped: "Kindergarten",
    reason: "Graduated",
    street: "Mabini Street",
    barangay: "Macabalan",
    city: "Cagayan de Oro City",
    province: "Misamis Oriental",
    studentId: student2.id,
  });

  // const studentData = [
  //   {
  //     lrn: 1242312145189,
  //     lastName: "Dela Cruz",
  //     firstName: "Juan",
  //     category: "Out-of-School Youth",
  //   },
  //   {
  //     lrn: 1242312145145,
  //     lastName: "Bautista",
  //     firstName: "Felix",
  //     middleName: "Polso",
  //     category: "Out-of-School Youth",
  //   },
  //   {
  //     lastName: "Amidrano",
  //     firstName: "Nicolette",
  //     middleName: "Bucio",
  //     category: "Out-of-School Youth",
  //   },
  //   {
  //     lastName: "Fernandez",
  //     firstName: "Hero",
  //     middleName: "Baltazar",
  //     category: "Out-of-School Youth",
  //   },
  //   {
  //     lrn: 1242312145714,
  //     lastName: "Santos",
  //     firstName: "Dominic",
  //     middleName: "Dicolano",
  //     category: "Out-of-School Youth",
  //   },
  //   {
  //     lrn: 1242562145189,
  //     lastName: "Fulminar",
  //     firstName: "Ashley",
  //     middleName: "De Guzman",
  //     category: "Out-of-School Youth",
  //   },
  //   {
  //     lastName: "Quintos",
  //     firstName: "Ariel",
  //     middleName: "Furtonado",
  //     category: "Out-of-School Youth",
  //   },
  //   {
  //     lastName: "Hilot",
  //     firstName: "Van",
  //     middleName: "Culminares",
  //     category: "Out-of-School Youth",
  //   },
  //   {
  //     lrn: 1247192145189,
  //     lastName: "Alonto",
  //     firstName: "Princess Aliah",
  //     category: "Out-of-School Youth",
  //   },
  //   {
  //     lastName: "Montecillo",
  //     firstName: "Dirk",
  //     middleName: "Santocildis",
  //     category: "Out-of-School Youth",
  //   },
  // ];

  // await Promise.all(
  //   studentData.map(async (student) => {
  //     await Student.create(student);
  //   })
  // );

  function getRandomStatus() {
    let status = ["Inactive", "Active", "Drop"];
    return status[Math.floor(Math.random() * 2)];
  }

  function getRegularity() {
    let status = ["Regular", "Hybrid"];
    return status[Math.floor(Math.random() * 2)];
  }

  const students = await Student.findAll();

  await Promise.all(
    students.map(async (student) => {
      const class_levels = await ClassLevel.findAll();
      await Promise.all(
        class_levels.map(async (class_level) => {
          const enrollment = await class_level.addStudent(student, {
            through: {
              hasEnrollmentForm: true,
              status: getRandomStatus(),
              regularity: getRegularity(),
            },
          });

          const classLearningStrands = await ClassLearningStrand.findAll({
            where: { classLevelId: class_level.id },
          });

          await Promise.all(
            classLearningStrands.map(async (classLearningStrand) => {
              classLearningStrand.addEnrollment(enrollment);
            })
          );
        })
      );
    })
  );
}

export async function injectUser() {
  const userData = [
    [
      {
        lastName: "Istrator",
        firstName: "Admin",
        id: "91267",
        accessLevel: 1,
        password: "rootpass",
        contactNum: "09052153867",
        position: "Administrator",
      },
      {},
      {
        description: "Added User with ID: 53725",
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
        contactNum: "09123456789",
        position: "Program Head",
      },
      {},
      {
        description: "Added User with ID: 53697",
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
        contactNum: "09987654321",
        position: "Program Coordinator",
        lastLogin: new Date(2023, 1, 20),
      },
      {},
      {
        description: "Added User with ID: 53698",
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
        contactNum: "09987654322",
        position: "Computer Systems Officer",
        email: "test2@gmail.com",
        lastLogin: new Date(2023, 3, 30),
      },
      {
        canMgStuds: true,
        canMgVolunteer: true,
        canMgClass: true,
      },
      {
        description: "Added User with ID: 53699",
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
        contactNum: "09987654323",
        position: "Executive Officer",
        lastLogin: new Date(2020, 11, 29),
      },
      {
        canMgStuds: true,
        canMgVolunteer: true,
        canMgUser: true,
      },
      {
        description: "Added User with ID: 53723",
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
        contactNum: "09987654324",
        position: "Information Executive",
        email: "test@gmail.com",
      },
      {
        canMgVolunteer: true,
        canMgClass: true,
      },
      {
        description: "Added User with ID: 53724",
        date: new Date(),
      },
    ],
  ];

  const createUser = async (userData) => {
    const [user, perms, audit] = userData;

    user.hashedPw = await bcrypt.hash(user.password, 12);
    delete user.password;

    const createdUser = await User.create(user);
    await createdUser.createPermission(perms);
    await createdUser.createAudit(audit);
  };

  await Promise.all(userData.map(createUser));
}

export async function injectAcademicYear() {
  const termData = [
    {
      id: 1,
      academic_year: "2016-2017",
      start_date: new Date("2016-06-01"),
      end_date: new Date("2017-03-31"),
      status: false,
    },
    {
      id: 2,
      academic_year: "2017-2018",
      start_date: new Date("2017-06-01"),
      end_date: new Date("2018-03-31"),
      status: false,
    },
    {
      id: 3,
      academic_year: "2018-2019",
      start_date: new Date("2018-06-01"),
      end_date: new Date("2019-03-31"),
      status: false,
    },
    {
      id: 4,
      academic_year: "2019-2020",
      start_date: new Date("2019-06-01"),
      end_date: new Date("2020-03-31"),
      status: false,
    },
    {
      id: 5,
      academic_year: "2020-2021",
      start_date: new Date("2020-08-01"),
      end_date: new Date("2021-05-31"),
      status: false,
    },
    {
      id: 6,
      academic_year: "2021-2022",
      start_date: new Date("2021-08-01"),
      end_date: new Date("2022-05-31"),
      status: false,
    },
    {
      id: 7,
      academic_year: "2022-2023",
      start_date: new Date("2022-08-01"),
      end_date: new Date("2023-05-31"),
      status: false,
    },
    {
      id: 8,
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

  const academic_years = await Term.findAll();
  const learningStrands = await LearningStrand.findAll();

  await Promise.all(
    academic_years.map(async (academic_year) => {
      classLevelData.map(async (class_level) => {
        const classLevel = await academic_year.createClass_level({
          school_level: class_level.school_level,
        });
        learningStrands.map(async (learningStrand) => {
          await classLevel.addLearning_strand(learningStrand);
        });
      });
    })
  );
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

export async function injectStudentRequirement() {
  const studentRequirementData = [
    {
      requirement_name: "Enrollment Form",
    },
    {
      requirement_name: "CSWD Endorsement Letter",
    },
    {
      requirement_name: "Birth Certificate",
    },
    {
      requirement_name: "Barangay Clearance",
    },
    {
      requirement_name: "Certificate of Residency",
    },
    {
      requirement_name: "Health Records",
    },
    {
      requirement_name: "Waiver for Photos",
    },
    {
      requirement_name: "Vaccination Card",
    },
  ];

  await Promise.all(
    studentRequirementData.map(async (student_requirement) => {
      await StudentRequirement.create(student_requirement);
    })
  );
}

export async function injectStudentCategory() {
  const studentCategoryData = [
    {
      category_name: "Out-of-School Youth",
    },
    {
      category_name: "Indigenous People",
    },
    {
      category_name: "Person with Disability",
    },
    {
      category_name: "Solo Parent",
    },
    {
      category_name: "Pantawid Pamilyang Pilipino Program (4Ps) Beneficiary",
    },
    {
      category_name: "Child Laborer",
    },
    {
      category_name: "Victim of Child Abuse",
    },
    {
      category_name: "Victim of Human Trafficking",
    },
    {
      category_name: "Street Children",
    },
    {
      category_name: "Drug Dependents",
    },
    {
      category_name: "Children in Conflict with the Law",
    },
    {
      category_name: "Children in Especially Difficult Circumstances",
    },
  ];

  await Promise.all(
    studentCategoryData.map(async (student_category) => {
      await StudentCategory.create(student_category);
    })
  );
}

export async function injectVolunteer() {
  const volunteerData = [
    {
      volunteerId: 1,
      affiliation: "Student",
      lastName: "Dela Cruz",
      firstName: "Shelly",
      middleName: "eyy",
      suffix: "Jr.",
    },
    {
      volunteerId: 2,
      affiliation: "Student",
      lastName: "Fuentes",
      firstName: "Alonzo",
    },
    {
      volunteerId: 3,
      affiliation: "Student",
      lastName: "Firma",
      firstName: "Alejandra",
    },
  ];

  const volunteerPersonalInformationData = [
    {
      nickname: "Shelly",
      sex: "F",
      birthday: new Date(1980, 1, 1),
      housing: "123 Main St",
      barangay: "Barangay 1",
      city: "City A",
      province: "Province A",
    },
    {
      nickname: "Alonzo",
      sex: "M",
      birthday: new Date(1985, 1, 1),
      housing: "456 Maple Ave",
      barangay: "Barangay 2",
      city: "City B",
      province: "Province B",
    },
    {
      nickname: "Alejandra",
      sex: "F",
      birthday: new Date(1990, 1, 1),
      housing: "789 Oak St",
      barangay: "Barangay 3",
      city: "City C",
      province: "Province C",
    },
    // ... add more entries here ...
  ];

  const volunteerEmergencyContacts = [
    {
      firstName: "John",
      lastName: "Doe",
      contactNumber: "+639123456789",
      relationship: "Brother",
    },
    {
      firstName: "Jane",
      lastName: "Doe",
      contactNumber: "+639234567890",
      relationship: "Sister",
    },
    {
      firstName: "Jim",
      lastName: "Doe",
      contactNumber: "+639345678901",
      relationship: "Brother",
    },
  ];

  const StudentVolunteer = [
    {
      program: "BS PSY",
      year: "1st",
    },
    {
      program: "BS CS",
      year: "2nd",
    },
    {
      program: "BS IT",
      year: "3rd",
    },
  ];

  const volunteerContactInformationData = [
    {
      contactNumber: "+639123456789",
      facebook: "Shelly-Cruz",
      email: "shelly-cruz@example.com",
    },
    {
      contactNumber: "+639123456788",
      facebook: "Alonzo-Fuentes",
      email: "alonzo-fuentes@example.com",
    },
    {
      contactNumber: "+639123456787",
      facebook: "Alejandra-Firma",
      email: "alejandra-firma@example.com",
    },
    // ... add more entries here ...
  ];

  function getRandomAvailability() {
    let availability = ["M", "T", "W", "Th", "F", "S"];
    return availability[Math.floor(Math.random() * 2)];
  }

  function getSpecialization() {
    let area = [
      "LS1-E",
      "LS1-F",
      "LS2-S",
      "LS3-M",
      "LS4-CLS",
      "LS5-UTS",
      "LS6-DL",
      "Homeroom",
    ];
    return area[Math.floor(Math.random() * 2)];
  }

  await Promise.all(
    volunteerData.map(async (data, index) => {
      const volunteer = await Volunteer.create(data);

      await volunteer.createStudent_volunteer(StudentVolunteer[index]);
      await volunteer.createVolunteer_personal_information(
        volunteerPersonalInformationData[index]
      );
      await volunteer.createVolunteer_emergency_contact(
        volunteerEmergencyContacts[index]
      );
      await volunteer.createVolunteer_contact_information(
        volunteerContactInformationData[index]
      );
      await volunteer.createVolunteer_availability({
        day: getRandomAvailability(),
      });
      await volunteer.createVolunteer_specialization({
        area: getSpecialization(),
      });
    })
  );
}
