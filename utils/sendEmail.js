const nodemailer = require("nodemailer")

const sendEmail = async (options) => {
  // Create transporter
  const transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  // Email templates
  const templates = {
    emailVerification: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #10b981;">Welcome to EVMatch!</h2>
        <p>Hi ${data.name},</p>
        <p>Thank you for joining EVMatch. Please verify your email address by clicking the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${data.verificationUrl}" 
             style="background-color: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Verify Email Address
          </a>
        </div>
        <p>If the button doesn't work, copy and paste this link into your browser:</p>
        <p><a href="${data.verificationUrl}">${data.verificationUrl}</a></p>
        <p>This link will expire in 24 hours.</p>
        <p>Best regards,<br>The EVMatch Team</p>
      </div>
    `,
    passwordReset: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #10b981;">Password Reset Request</h2>
        <p>Hi ${data.name},</p>
        <p>You requested a password reset for your EVMatch account. Click the button below to reset your password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${data.resetUrl}" 
             style="background-color: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Reset Password
          </a>
        </div>
        <p>If the button doesn't work, copy and paste this link into your browser:</p>
        <p><a href="${data.resetUrl}">${data.resetUrl}</a></p>
        <p>This link will expire in 10 minutes.</p>
        <p>If you didn't request this password reset, please ignore this email.</p>
        <p>Best regards,<br>The EVMatch Team</p>
      </div>
    `,
  }

  // Generate HTML content
  const htmlContent = templates[options.template]
    ? templates[options.template](options.data)
    : options.html || options.message

  // Email options
  const mailOptions = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    html: htmlContent,
  }

  // Send email
  const info = await transporter.sendMail(mailOptions)
  console.log("Email sent:", info.messageId)

  return info
}

module.exports = sendEmail
