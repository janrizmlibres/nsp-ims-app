import AcademicYear from "../models/academic_year.js";
import LearningStrand from "../models/learning_strand.js";
import Staff from "../models/staff.js";
import bcrypt from "bcryptjs";

export async function injectStaff() {
  const staffData = [
    {
      last_name: "Libres",
      first_name: "Janriz",
      username: "janrizlibs",
      password: "janrizpass",
    },
    {
      last_name: "Etom",
      first_name: "Joy",
      username: "joyetom",
      password: "joypass",
    },
    {
      last_name: "Dimal",
      first_name: "Nazib",
      username: "nazibdimal",
      password: "nazpass",
    },
    {
      last_name: "Rola",
      first_name: "Xander",
      username: "xandrola",
      password: "xandpass",
    },
    {
      last_name: "Umel",
      first_name: "Ace",
      username: "aceumel",
      password: "acepass",
    },
  ];

  const createStaff = async (staff) => {
    staff.hashed_pw = await bcrypt.hash(staff.password, 12);
    delete staff.password;
    await Staff.create(staff);
  };

  await Promise.all(staffData.map(createStaff));
}

export async function injectAcademicYear() {
  const staffData = [
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


  await Promise.all(staffData.map(async (academic_year) => {
    await AcademicYear.create(academic_year);
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