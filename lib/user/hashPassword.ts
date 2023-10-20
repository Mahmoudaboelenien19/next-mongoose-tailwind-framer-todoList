import bcyrpt from "bcrypt";
export const hashPassword = (pass: string) => {
  return bcyrpt.hashSync(pass + process.env.BCYRPT_SECRET, 10);
};
