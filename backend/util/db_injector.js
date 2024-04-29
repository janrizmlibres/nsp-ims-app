import AcademicYear from "../models/academic_year.js";
import Staff from "../models/staff.js";
import bcrypt from "bcryptjs";

export async function injectStaff() {
  const staffData = [
    [
      {
        last_name: "Dimal",
        first_name: "Nazib",
        id: "53697",
        password: "nazpass",
      },
      {
        can_mg_studs: true,
        can_mg_volunteer: true,
        can_mg_class: true,
      },
    ],
    [
      {
        last_name: "Rola",
        first_name: "Xander",
        id: "55166",
        password: "xandpass",
      },
      {
        can_mg_studs: true,
        can_mg_volunteer: true,
        can_mg_class: true,
        can_mg_ls: true,
        can_mg_stud_req: true,
        can_mg_staff: true,
      },
    ],
    [
      {
        last_name: "Umel",
        first_name: "Ace",
        id: "57381",
        password: "acepass",
      },
      {
        can_mg_volunteer: true,
        can_mg_class: true,
        can_mg_stud_req: true,
      },
    ],
  ];

  const createStaff = async (staffData) => {
    const [staff, perms] = staffData;

    staff.hashed_pw = await bcrypt.hash(staff.password, 12);
    delete staff.password;

    const createdStaff = await Staff.create(staff);
    await createdStaff.createPermission(perms);
  };

  await Promise.all(staffData.map(createStaff));
}

export async function injectAcademicYear() {
  const staffData = [
    {
      batch_number: 1,
      start_date: new Date("2015-06-01"),
      end_date: new Date("2016-03-31"),
    },
    {
      batch_number: 2,
      start_date: new Date("2015-06-01"),
      end_date: new Date("2016-03-31"),
    },
    {
      batch_number: 3,
      start_date: new Date("2015-06-01"),
      end_date: new Date("2016-03-31"),
    },
    {
      batch_number: 4,
      start_date: new Date("2015-06-01"),
      end_date: new Date("2016-03-31"),
    },
    {
      batch_number: 5,
      start_date: new Date("2015-06-01"),
      end_date: new Date("2016-03-31"),
    },
    {
      batch_number: 6,
      start_date: new Date("2015-06-01"),
      end_date: new Date("2016-03-31"),
    },
    {
      batch_number: 7,
      start_date: new Date("2015-06-01"),
      end_date: new Date("2016-03-31"),
    },
    {
      batch_number: 8,
      start_date: new Date("2015-06-01"),
      end_date: new Date("2016-03-31"),
    },
  ];

  await Promise.all(
    staffData.map(async (academic_year) => {
      await AcademicYear.create(academic_year);
    })
  );
}
