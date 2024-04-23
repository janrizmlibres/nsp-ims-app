import Staff from "../models/staff.js";
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

  const nazpass = await bcrypt.hash("nazpass", 12);
  await Staff.create({
    last_name: "Dimal",
    first_name: "Nazib",
    username: "nazibdimal",
    hashed_pw: nazpass,
  });

  const xandpass = await bcrypt.hash("xandpass", 12);
  await Staff.create({
    last_name: "Rola",
    first_name: "Xander",
    username: "xandrola",
    hashed_pw: xandpass,
  });

  const acepass = await bcrypt.hash("acepass", 12);
  await Staff.create({
    last_name: "Umel",
    first_name: "Ace",
    username: "aceumel",
    hashed_pw: acepass,
  });

  const clintpass = await bcrypt.hash("clintpass", 12);
  await Staff.create({
    last_name: "Galendez",
    first_name: "Clint",
    username: "clintgalendez",
    hashed_pw: clintpass,
  });

  const carlospass = await bcrypt.hash("carlospass", 12);
  await Staff.create({
    last_name: "Perez",
    first_name: "Carlos",
    username: "carlosperez",
    hashed_pw: carlospass,
  });

  const huskpass = await bcrypt.hash("huskpass", 12);
  await Staff.create({
    last_name: "Dusk",
    first_name: "Husker",
    username: "huskerdusk",
    hashed_pw: huskpass,
  });

  const angelpass = await bcrypt.hash("angelpass", 12);
  await Staff.create({
    last_name: "Dust",
    first_name: "Angel",
    username: "angeldust",
    hashed_pw: angelpass,
  });
}
