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
