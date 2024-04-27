import Staff from "../models/staff";
import Permission from "../models/permission";

Staff.hasOne(Permission);
Permission.belongsTo(Staff);
