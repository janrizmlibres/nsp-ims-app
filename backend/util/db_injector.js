import bcrypt from "bcryptjs";

import Student from "../models/student/student.js";
import Staff from "../models/staff/staff.js";
import Term from "../models/term.js";
import LearningStrand from "../models/learning_strand.js";
import Volunteer from "../models/volunteer/volunteer.js";
import VolunteerPersonalInformation from "../models/volunteer/volunteer_personal_information.js";
import VolunteerContactInformation from "../models/volunteer/volunteer_contact_information.js";
import VolunteerEmergency from "../models/volunteer/volunteer_emergency_contact.js";
import VolunteerSpecialization from "../models/volunteer/volunteer_specialization.js";
import VolunteerAvailability from "../models/volunteer/volunteer_availability.js";
import StudentVolunteer from "../models/volunteer/student_volunteer.js";
import ProfessionalVolunteer from "../models/volunteer/professional_volunteer.js";
import ClassLevel from "../models/class/class_level.js";
import ClassLearningStrand from "../models/class/class_learning_strand.js";

export async function injectAll() {
  await injectStaff();
  await injectLearningStrand();
  await injectAcademicYear();
  await injectStudent();
  await injectVolunteer();
}

export async function injectStudent() {
  const studentData = [
    {
      lrn: 1242312145189,
      lastName: "Dela Cruz",
      firstName: "Juan",
      category: "Out-of-School Youth",
    },
    {
      lrn: 1242312145145,
      lastName: "Bautista",
      firstName: "Felix",
      middleName: "Polso",
      category: "Out-of-School Youth",
    },
    {
      lastName: "Amidrano",
      firstName: "Nicolette",
      middleName: "Bucio",
      category: "Out-of-School Youth",
    },
    {
      lastName: "Fernandez",
      firstName: "Hero",
      middleName: "Baltazar",
      category: "Out-of-School Youth",
    },
    {
      lrn: 1242312145714,
      lastName: "Santos",
      firstName: "Dominic",
      middleName: "Dicolano",
      category: "Out-of-School Youth",
    },
    {
      lrn: 1242562145189,
      lastName: "Fulminar",
      firstName: "Ashley",
      middleName: "De Guzman",
      category: "Out-of-School Youth",
    },
    {
      lastName: "Quintos",
      firstName: "Ariel",
      middleName: "Furtonado",
      category: "Out-of-School Youth",
    },
    {
      lastName: "Hilot",
      firstName: "Van",
      middleName: "Culminares",
      category: "Out-of-School Youth",
    },
    {
      lrn: 1247192145189,
      lastName: "Alonto",
      firstName: "Princess Aliah",
      category: "Out-of-School Youth",
    },
    {
      lastName: "Montecillo",
      firstName: "Dirk",
      middleName: "Santocildis",
      category: "Out-of-School Youth",
    },
  ];

  await Promise.all(
    studentData.map(async (student) => {
      await Student.create(student);
    })
  );

  function getRandomStatus() {
    let status = ["Inactive", "Active", "Drop"];
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
              modularity: "Regular",
            },
          });

          const classLearningStrands = await ClassLearningStrand.findAll({
            where: {classLevelId: class_level.id}
          });

          await Promise.all(
            classLearningStrands.map(async (classLearningStrand) => {
              classLearningStrand.addEnrollment(enrollment)
            })
          )
        })
      );
    })
  );
}

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

  const academic_years = await Term.findAll()
  const learningStrands = await LearningStrand.findAll()

  await Promise.all(
    academic_years.map(async (academic_year) => {
      classLevelData.map(async (class_level) => {
        const classLevel = await academic_year.createClass_level({
          school_level: class_level.school_level,
        });
        learningStrands.map(async (learningStrand) => {
          await classLevel.addLearning_strand(learningStrand)
        })
      })
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

export async function injectVolunteer() {
  const volunteerData = [
    {
      volunteerId: 1,
      affiliation: "Student",
      lastName: "Dela Cruz",
      firstName: "Shelly",
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
    {
      volunteerId: 4,
      affiliation: "Student",
      lastName: "Horticullado",
      firstName: "Gabriel",
    },
    {
      volunteerId: 5,
      affiliation: "Student",
      lastName: "Santos",
      firstName: "John",
    },
    {
      volunteerId: 6,
      affiliation: "Student",
      lastName: "Dapin",
      firstName: "Job",
    },
    {
      volunteerId: 7,
      affiliation: "Student",
      lastName: "Roa",
      firstName: "Wilson",
    },
    {
      volunteerId: 8,
      affiliation: "Student",
      lastName: "Dimagiba",
      firstName: "Felixson",
    },
    {
      volunteerId: 9,
      affiliation: "Student",
      lastName: "Goma",
      firstName: "Fernan",
    },
    {
      volunteerId: 10,
      affiliation: "Student",
      lastName: "Lopez",
      firstName: "Kenneth",
    },
    {
      volunteerId: 11,
      affiliation: "Student",
      lastName: "Sayson",
      firstName: "Daisy",
    },
  ];

  const volunteerPersonalInformationData = [
    {
      nickname: "John",
      sex: "Male",
      birthday: new Date(1980, 1, 1),
      housing: "123 Main St",
      barangay: "Barangay 1",
      city: "City A",
      province: "Province A"
    },
    {
      nickname: "Jane",
      sex: "Female",
      birthday: new Date(1985, 1, 1),
      housing: "456 Maple Ave",
      barangay: "Barangay 2",
      city: "City B",
      province: "Province B"
    },
    {
      nickname: "Bob",
      sex: "Male",
      birthday: new Date(1990, 1, 1),
      housing: "789 Oak St",
      barangay: "Barangay 3",
      city: "City C",
      province: "Province C"
    },
    {
      nickname: "Alice",
      sex: "Female",
      birthday: new Date(1995, 1, 1),
      housing: "1011 Pine Ave",
      barangay: "Barangay 4",
      city: "City D",
      province: "Province D"
    },
    {
      nickname: "Charlie",
      sex: "Male",
      birthday: new Date(1985, 1, 1),
      housing: "1213 Birch Blvd",
      barangay: "Barangay 5",
      city: "City E",
      province: "Province E"
    },
    {
      nickname: "Diana",
      sex: "Female",
      birthday: new Date(1990, 1, 1),
      housing: "1415 Cedar Ct",
      barangay: "Barangay 6",
      city: "City F",
      province: "Province F"
    },
    {
      nickname: "Ethan",
      sex: "Male",
      birthday: new Date(1995, 1, 1),
      housing: "1617 Dogwood Dr",
      barangay: "Barangay 7",
      city: "City G",
      province: "Province G"
    },
    {
      nickname: "Fiona",
      sex: "Female",
      birthday: new Date(2000, 1, 1),
      housing: "1819 Elm St",
      barangay: "Barangay 8",
      city: "City H",
      province: "Province H"
    },
    {
      nickname: "George",
      sex: "Male",
      birthday: new Date(1980, 1, 1),
      housing: "2021 Fir St",
      barangay: "Barangay 9",
      city: "City I",
      province: "Province I"
    },
    {
      nickname: "Hannah",
      sex: "Female",
      birthday: new Date(1985, 1, 1),
      housing: "2223 Grove St",
      barangay: "Barangay 10",
      city: "City J",
      province: "Province J"
    },
    {
      nickname: "Ian",
      sex: "Male",
      birthday: new Date(1990, 1, 1),
      housing: "2425 Hickory St",
      barangay: "Barangay 11",
      city: "City K",
      province: "Province K"
    },
    // ... add more entries here ...
  ];

  const volunteerEmergencyContacts = [
    { firstName: "John", lastName: "Doe", contactNumber: 1234567890, relationship: "Brother" },
    { firstName: "Jane", lastName: "Doe", contactNumber: 2345678901, relationship: "Sister" },
    { firstName: "Jim", lastName: "Doe", contactNumber: 3456789012, relationship: "Brother" },
    { firstName: "Jill", lastName: "Doe", contactNumber: 4567890123, relationship: "Sister" },
    { firstName: "Joe", lastName: "Doe", contactNumber: 5678901234, relationship: "Brother" },
    { firstName: "Jenny", lastName: "Doe", contactNumber: 6789012345, relationship: "Sister" },
    { firstName: "Jerry", lastName: "Doe", contactNumber: 7890123456, relationship: "Brother" },
    { firstName: "Jess", lastName: "Doe", contactNumber: 8901234567, relationship: "Sister" },
    { firstName: "Jack", lastName: "Doe", contactNumber: 9012345678, relationship: "Brother" },
    { firstName: "Jasmine", lastName: "Doe", contactNumber: 1234567890, relationship: "Sister" },
    { firstName: "Jacob", lastName: "Doe", contactNumber: 2345678901, relationship: "Brother" }
  ];

  function getRandomAvailability() {
    let availability = ["M", "T", "W", "TH", "F", "S"];
    return availability[Math.floor(Math.random() * 2)];
  }

  function getSpecialization() {
    let area = ["LS1-E", "LS1-F", "LS2-S", "LS3-M", "LS4-CLS", "LS5-UTS", "LS6-DL", "Homeroom", ];
    return area[Math.floor(Math.random() * 2)];
  }

  await Promise.all(
    volunteerData.map(async (data, index) => {
      const volunteer = await Volunteer.create(data);

      volunteer.createVolunteer_personal_information(volunteerPersonalInformationData[index])
      volunteer.createVolunteer_emergency_contact(volunteerEmergencyContacts[index])
      volunteer.createVolunteer_availability({day: getRandomAvailability()})
      volunteer.createVolunteer_specialization({area: getSpecialization()})
    })
  );
}
