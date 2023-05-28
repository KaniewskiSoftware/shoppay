import nc from "next-connect";
import { validateEmail } from "@/utils/validation";
import db from "../../../utils/db";

const handler = nc();

handler.post(async (req, res) => {
  try {
    await db.connectDb();
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ message: "Please fill all the fields" });
      return;
    }
    if (!validateEmail(email)) {
      res.status(400).json({ message: "Please enter a valid email" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
