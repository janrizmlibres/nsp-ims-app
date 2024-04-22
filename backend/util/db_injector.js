import Staff from "../models/staff";
import bcrypt from "bcryptjs";

export async function injectStaff() {
  const janpass = await bcrypt.hash("janrizpass", 12);
  await Staff.create({
    last_name: "Libres",
    first_name: "Janriz",
    username: "janrizlibs",
    hashed_pw: janpass,
  });

  const joypass = await bcrypt.hash("joypass", 12);
  await Staff.create({
    last_name: "Etom",
    first_name: "Joy",
    username: "joyetom",
    hashed_pw: joypass,
  });
}
