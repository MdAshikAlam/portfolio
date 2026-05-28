import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { name, email, company, roleOpportunity, message } = await request.json();

    if (!name || !email || !roleOpportunity || !message) {
      return NextResponse.json(
        { error: "Name, email, role/opportunity, and message are required." },
        { status: 400 }
      );
    }

    // Configure the SMTP transporter using environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true", // true for port 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 1. Email notification to the portfolio owner (Md Ashik Alam)
    const adminMailOptions = {
      from: `"${name}" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECEIVER_EMAIL || "mdashikalam05@gmail.com",
      replyTo: email,
      subject: `New Portfolio Inquiry [${roleOpportunity}] from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || "N/A"}\nRole / Opportunity: ${roleOpportunity}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 25px; color: #333; max-width: 600px; border: 1px solid #e0e0e0; border-radius: 12px; background-color: #ffffff;">
          <h2 style="color: #0b2545; border-bottom: 2px solid #d6b85a; padding-bottom: 12px; margin-top: 0; font-family: Georgia, serif;">New Portfolio Inquiry</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555; width: 35%;">Full Name:</td>
              <td style="padding: 8px 0; color: #0b2545; font-weight: 500;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Email Address:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #123a6b; text-decoration: none; font-weight: 500;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Company Name:</td>
              <td style="padding: 8px 0; color: #333;">${company || "<em>Not Specified</em>"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Role / Opportunity:</td>
              <td style="padding: 8px 0; color: #d6b85a; font-weight: bold;">${roleOpportunity}</td>
            </tr>
          </table>
          <div style="margin-top: 25px; padding: 20px; background-color: #f7f5f0; border-radius: 8px; border-left: 4px solid #0b2545;">
            <p style="margin: 0; font-weight: bold; color: #0b2545; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Message Details:</p>
            <p style="white-space: pre-wrap; margin-top: 12px; line-height: 1.6; color: #444; font-size: 15px;">${message}</p>
          </div>
        </div>
      `,
    };

    // 2. Automated Auto-Reply confirmation to the sender
    const autoReplyMailOptions = {
      from: `"Md Ashik Alam" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Thanks for Contacting Ashik",
      text: `Hi ${name},\n\nThank you for contacting me through my portfolio website.\n\nI have received your message regarding ${roleOpportunity} and will respond as soon as possible.\n\nVisit my portfolio: https://portfolio-swart-three-89.vercel.app/\n\nBest Regards,\nMd Ashik Alam\nFull Stack Developer`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 25px; color: #333; max-width: 600px; border: 1px solid #e0e0e0; border-radius: 12px; background-color: #ffffff;">
          <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 0;">Hi <strong>${name}</strong>,</p>
          <p style="font-size: 16px; line-height: 1.6; color: #333;">Thank you for contacting me through my portfolio website.</p>
          <p style="font-size: 16px; line-height: 1.6; color: #333;">I have received your message regarding <strong>${roleOpportunity}</strong> and will respond as soon as possible.</p>
          
          <div style="margin: 25px 0;">
            <a href="https://portfolio-swart-three-89.vercel.app/" target="_blank" style="display: inline-block; padding: 12px 24px; background-color: #0b2545; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 15px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">Visit Portfolio Website</a>
          </div>
          
          <div style="border-top: 1px solid #eee; padding-top: 15px; margin-top: 15px;">
            <p style="margin: 0; font-size: 15px; font-weight: bold; color: #0b2545;">Best Regards,</p>
            <p style="margin: 5px 0 0 0; font-size: 16px; font-weight: bold; color: #d6b85a;">Md Ashik Alam</p>
            <p style="margin: 2px 0 0 0; font-size: 14px; color: #6b7e94; font-style: italic;">Full Stack Developer</p>
          </div>
        </div>
      `,
    };

    // Send both emails in parallel
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(autoReplyMailOptions),
    ]);

    return NextResponse.json({ success: true, message: "Email sent successfully!" });
  } catch (error: any) {
    console.error("SMTP error sending email:", error);
    return NextResponse.json(
      { error: error.message || "Failed to send email." },
      { status: 500 }
    );
  }
}
