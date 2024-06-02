import bcrypt from "bcrypt";

import {
  Student,
  PersonalInfo,
  ContactInfo,
  EmergencyPerson,
  PreviousSchool,
  RequirementInfo,
} from "../api/v1/models/student/index.js";

import { User } from "../api/v1/models/user/index.js";
import { Grade } from "../api/v1/models/class/index.js";

import {
  Term,
  LearningStrand,
  StudentRequirement,
  StudentCategory,
  Enrollment,
} from "../api/v1/models/index.js";

import { Volunteer } from "../api/v1/models/volunteer/volunteer.js";

export async function injectAll() {
  await injectUser();
  await injectLearningStrand();
  await injectAcademicYear();
  await injectStudent();
  await injectVolunteer();
  await injectStudentRequirement();
  await injectStudentCategory();
  await injectRequirementInfo();
}

export async function injectStudent() {
  const student1 = await Student.create({
    lrn: "198765150721",
    category: "Street Children",
    firstName: "Gordon",
    lastName: "Ramsay",
    photoUrl: "static/images/gordon.jpg",
  });

  await PersonalInfo.create({
    birthday: new Date(2020, 4, 2),
    bloodType: "O+",
    birthCity: "New York City",
    birthProvince: "Misamis Oriental",
    religion: "Roman Catholic",
    sex: "M",
    civilStatus: "Single",
    homeDistrict: "1st District",
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
    city: "Cagayan de Oro City",
    province: "Misamis Oriental",
    studentId: student1.id,
  });

  const student2 = await Student.create({
    lrn: "123456789012345",
    category: "Child Laborer",
    firstName: "Kim",
    lastName: "Chiu",
    photoUrl: "static/images/kim.jpg",
  });

  await PersonalInfo.create({
    birthday: new Date("1998-05-14"),
    bloodType: "A-",
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
    city: "Cagayan de Oro City",
    province: "Misamis Oriental",
    studentId: student2.id,
  });

  const student3 = await Student.create({
    lrn: "987654321098765",
    category: "Indigenous People",
    firstName: "Maria",
    lastName: "Gonzalez",
  });

  await PersonalInfo.create({
    birthday: new Date("2005-10-20"),
    bloodType: "AB+",
    birthCity: "Manila",
    birthProvince: "Metro Manila",
    religion: "Roman Catholic",
    sex: "F",
    civilStatus: "Single",
    homeBlkLtSt: "456 Sunshine Avenue",
    homeBarangay: "Makati",
    homeCity: "Makati City",
    homeProvince: "Metro Manila",
    studentId: student3.id,
  });

  await ContactInfo.create({
    contactNum: "09187654321",
    studentId: student3.id,
  });

  await EmergencyPerson.create({
    firstName: "Juan",
    lastName: "Gonzalez",
    contactNum: "09987654321",
    relationship: "Father",
    studentId: student3.id,
  });

  await PreviousSchool.create({
    name: "San Juan Elementary School",
    schoolType: "Public",
    schoolAffiliation: "Non-Sectarian",
    lastSyAttended: "2022-2023",
    highestEducation: "Elementary education",
    gradeStopped: "Grade 6",
    reason: "Transferred",
    street: "Sunset Boulevard",
    city: "Manila",
    province: "Metro Manila",
    studentId: student3.id,
  });

  const student4 = await Student.create({
    lrn: "543210987654321",
    category: "Child Laborer",
    firstName: "Juan",
    lastName: "Del Cruz",
    photoUrl: "images/juan.jpg",
  });

  await PersonalInfo.create({
    birthday: new Date("2007-03-15"),
    bloodType: "B+",
    birthCity: "Manila",
    birthProvince: "Metro Manila",
    religion: "Roman Catholic",
    sex: "M",
    civilStatus: "Single",
    homeBlkLtSt: "789 Moonlight Street",
    homeBarangay: "Tondo",
    homeCity: "Manila",
    homeProvince: "Metro Manila",
    studentId: student4.id,
  });

  await ContactInfo.create({
    contactNum: "09123456789",
    studentId: student4.id,
  });

  await EmergencyPerson.create({
    firstName: "Maria",
    lastName: "Del Cruz",
    contactNum: "09987654321",
    relationship: "Mother",
    studentId: student4.id,
  });

  await PreviousSchool.create({
    name: "Tondo Elementary School",
    schoolType: "Public",
    schoolAffiliation: "Non-Sectarian",
    lastSyAttended: "2022-2023",
    highestEducation: "Elementary education",
    gradeStopped: "Grade 5",
    reason: "Transferred",
    street: "Sunrise Avenue",
    city: "Manila",
    province: "Metro Manila",
    studentId: student4.id,
  });

  const student5 = await Student.create({
    lrn: "135792468013579",
    category: "Street Children",
    firstName: "Liza",
    lastName: "Soberano",
    photoUrl: "images/liza.jpg",
  });

  await PersonalInfo.create({
    birthday: new Date("1997-01-04"),
    bloodType: "O-",
    birthCity: "Manila",
    birthProvince: "Metro Manila",
    religion: "Roman Catholic",
    sex: "F",
    civilStatus: "Single",
    homeBlkLtSt: "101 Starlight Avenue",
    homeBarangay: "Santa Mesa",
    homeCity: "Manila",
    homeProvince: "Metro Manila",
    studentId: student5.id,
  });

  await ContactInfo.create({
    contactNum: "09051234567",
    studentId: student5.id,
  });

  await EmergencyPerson.create({
    firstName: "John",
    lastName: "Doe",
    contactNum: "09123456789",
    relationship: "Guardian",
    studentId: student5.id,
  });

  await PreviousSchool.create({
    name: "Santa Mesa Elementary School",
    schoolType: "Public",
    schoolAffiliation: "Non-Sectarian",
    lastSyAttended: "2022-2023",
    highestEducation: "Elementary education",
    gradeStopped: "Grade 4",
    reason: "Transferred",
    street: "Moonlight Avenue",
    city: "Manila",
    province: "Metro Manila",
    studentId: student5.id,
  });
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

    user.hashedPw = await bcrypt.hash(
      user.password,
      Number(process.env.PW_SALT)
    );
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
      batch_number: 8,
      academic_year: "2023-2024",
      start_date: new Date("2023-08-01"),
      end_date: new Date("2024-05-31"),
      status: true,
    },
    {
      batch_number: 7,
      academic_year: "2022-2023",
      start_date: new Date("2022-08-01"),
      end_date: new Date("2023-05-31"),
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
      batch_number: 5,
      academic_year: "2020-2021",
      start_date: new Date("2020-08-01"),
      end_date: new Date("2021-05-31"),
      status: false,
    },
    {
      batch_number: 4,
      academic_year: "2019-2020",
      start_date: new Date("2019-08-01"),
      end_date: new Date("2020-05-31"),
      status: false,
    },
    {
      batch_number: 3,
      academic_year: "2018-2019",
      start_date: new Date("2018-08-01"),
      end_date: new Date("2019-05-31"),
      status: false,
    },
    {
      batch_number: 2,
      academic_year: "2017-2018",
      start_date: new Date("2017-08-01"),
      end_date: new Date("2018-05-31"),
      status: false,
    },
    {
      batch_number: 1,
      academic_year: "2016-2017",
      start_date: new Date("2016-08-01"),
      end_date: new Date("2017-05-31"),
      status: false,
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

  await Promise.all(
    academic_years.map(async (academic_year) => {
      classLevelData.map(async (class_level) => {
        await academic_year.createClass_level({
          school_level: class_level.school_level,
        });
      });
    })
  );
}

export async function injectLearningStrand() {
  const learningStrandData = [
    {
      code: "Learning Strand 1 English",
      name: "Communication Skills - English",
    },
    {
      code: "Learning Strand 1 Filipino",
      name: "Communication Skills - Filipino",
    },
    {
      code: "Learning Strand 3",
      name: "Science",
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

function getRandomDate() {
  const start = new Date(2016, 0, 1); // Start date: January 1, 2016
  const end = new Date(); // End date: today
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

export async function injectEnrollment() {
  const enrollmentData = [
    {
      studentId: 1,
      classLevelId: 1,
      dateEnrolled: getRandomDate(), // Random date between 2016 and now
      status: "Active",
    },
    {
      studentId: 2,
      classLevelId: 1,
      dateEnrolled: getRandomDate(), // Random date between 2016 and now
      status: "Active",
    },
    {
      studentId: 3,
      classLevelId: 1,
      dateEnrolled: getRandomDate(), // Random date between 2016 and now
      status: "Inactive",
    },
    {
      studentId: 4,
      classLevelId: 1,
      dateEnrolled: getRandomDate(), // Random date between 2016 and now
      status: "Inactive",
    },
    {
      studentId: 5,
      classLevelId: 1,
      dateEnrolled: getRandomDate(), // Random date between 2016 and now
      status: "Active",
    },

    // Add more enrollment data here...
  ];

  await Promise.all(
    enrollmentData.map(async (enrollment) => {
      await Enrollment.create(enrollment);
    })
  );

  await Promise.resolve(
    await Grade.create({
      enrollmentId: 1,
      classLearningStrandId: 1,
    })
  );
}

export async function injectVolunteer() {
  const volunteerData = [
    {
      affiliation: "Student",
      lastName: "Dela Cruz",
      firstName: "Shelly",
      middleName: "eyy",
      suffix: "Jr.",
    },
    {
      affiliation: "Student",
      lastName: "Fuentes",
      firstName: "Alonzo",
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
  ];

  function getRandomAvailability() {
    let availability = ["M", "T", "W", "Th", "F", "S"];
    return availability[Math.floor(Math.random() * 2)];
  }

  function getSpecialization() {
    let area = ["LS1-E", "LS1-F"];
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

export async function injectRequirementInfo() {
  const students = await Student.findAll();

  const studentRequirements = await StudentRequirement.findAll();

  for (const student of students) {
    for (const studentRequirement of studentRequirements) {
      await RequirementInfo.create({
        studentId: student.id,
        studentRequirementId: studentRequirement.id,
        met: true,
      });
    }
  }
}
