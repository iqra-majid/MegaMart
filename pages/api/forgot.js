import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";


const handler = async (req, res) => {
  if (req.method === "POST") {
    const { email } = req.body;
    try {
      // Check if the user exists in the database
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "User with this email does not exist." });
      }
      // Generate a reset token
      const resetToken = jwt.sign({ email }, process.env.JWT_KEY, {
        expiresIn: "1h",
      });

      // Create a reset link
      const resetLink = `${process.env.NEXT_PUBLIC_HOST}/resetpassword?token=${resetToken}`;

      // Send an email to the user
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER, // Your email
          pass: process.env.EMAIL_PASS, // Your email password
        },
      });

      let mailOptions = {
        from: `"MegaMart" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Reset Your Password",
        html: `
          <p>Hello,</p>
          <p>We received a request to reset your password. Click the button below to reset it:</p>
          <a href="${resetLink}">Reset Password</a>
          <p>If you did not request a password reset, please ignore this email or contact support if you have questions.</p>
          <p>Thank you,<br>The MegaMart Team</p>
        `,
      };
      await transporter.sendMail(mailOptions);

      res
        .status(200)
        .json({
          success: true,
          message: "Password reset email sent successfully.",
        });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error." });
    }
  }else {
    res.status(400).json({ error: "Bad Request" });
  }
 
};

export default connectDb(handler);
