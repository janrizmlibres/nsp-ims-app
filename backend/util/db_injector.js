import AcademicYear from "../models/academic_year.js";
import Staff from "../models/staff.js";
import bcrypt from "bcryptjs";

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
