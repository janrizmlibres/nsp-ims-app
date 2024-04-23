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
    {
      last_name: "Galendez",
      first_name: "Clint",
      username: "clintgalendez",
      password: "clintpass",
    },
    {
      last_name: "Perez",
      first_name: "Carlos",
      username: "carlosperez",
      password: "carlospass",
    },
    {
      last_name: "Dusk",
      first_name: "Husker",
      username: "huskerdusk",
      password: "huskpass",
    },
    {
      last_name: "Dust",
      first_name: "Angel",
      username: "angeldust",
      password: "angelpass",
    },
  ];

  const createStaff = async (staff) => {
    staff.hashed_pw = await bcrypt.hash(staff.password, 12);
    delete staff.password;
    await Staff.create(staff);
  };

  await Promise.all(staffData.map(createStaff));
}
