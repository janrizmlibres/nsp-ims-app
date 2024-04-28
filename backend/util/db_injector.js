import AcademicYear from "../models/academic_year.js";
import Staff from "../models/staff.js";
import bcrypt from "bcryptjs";

export async function injectStaff() {
  const staffData = [
    {
      last_name: "Libres",
      first_name: "Janriz",
      id: "52673",
      password: "janrizpass",
    },
    {
      last_name: "Etom",
      first_name: "Joy",
      id: "52698",
      password: "joypass",
    },
    {
      last_name: "Dimal",
      first_name: "Nazib",
      id: "53697",
      password: "nazpass",
    },
    {
      last_name: "Rola",
      first_name: "Xander",
      id: "55166",
      password: "xandpass",
    },
    {
      last_name: "Umel",
      first_name: "Ace",
      id: "57381",
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
      start_date: new Date("2015-06-01"),
      end_date: new Date("2016-03-31")
    },
    {
      batch_number: 2,
      start_date: new Date("2015-06-01"),
      end_date: new Date("2016-03-31")
    },
    {
      batch_number: 3,
      start_date: new Date("2015-06-01"),
      end_date: new Date("2016-03-31")
    },
    {
      batch_number: 4,
      start_date: new Date("2015-06-01"),
      end_date: new Date("2016-03-31")
    },
    {
      batch_number: 5,
      start_date: new Date("2015-06-01"),
      end_date: new Date("2016-03-31")
    },
    {
      batch_number: 6,
      start_date: new Date("2015-06-01"),
      end_date: new Date("2016-03-31")
    },
    {
      batch_number: 7,
      start_date: new Date("2015-06-01"),
      end_date: new Date("2016-03-31")
    },
    {
      batch_number: 8,
      start_date: new Date("2015-06-01"),
      end_date: new Date("2016-03-31")
    },
  ];


  await Promise.all(staffData.map(async (academic_year) => {
    await AcademicYear.create(academic_year);
  }));
}