"use server"

import { z } from "zod"
import nodemailer from "nodemailer"
import type { Transporter } from "nodemailer"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

type FormData = z.infer<typeof formSchema>

export async function sendEmail(formData: FormData | FormData) {
  try {
    // If FormData object is passed, convert it to regular object
    let data: FormData

    if (formData instanceof FormData) {
      data = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        message: formData.get("message") as string,
      }
    } else {
      data = formData
    }

    // Validate the data
    const validatedFields = formSchema.safeParse(data)

    if (!validatedFields.success) {
      return {
        success: false,
        message: "Validation failed. Please check your inputs.",
      }
    }

    // Create a transporter
    const transporter: Transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "lumion.corps@gmail.com",
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false, // Helps with some Gmail connection issues
      },
    })

    // Email content
    const mailOptions = {
      from: `"${data.name}" <${data.email}>`,
      to: "lumion.corps@gmail.com",
      subject: `New Contact Form Submission from ${data.name}`,
      text: `
Name: ${data.name}
Email: ${data.email}
Message: ${data.message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
            ${data.message.replace(/\n/g, "<br>")}
          </div>
          <p style="color: #777; margin-top: 20px; font-size: 12px;">This email was sent from your website contact form.</p>
        </div>
      `,
    }

    // Send email
    const info = await transporter.sendMail(mailOptions)

    console.log("Email sent successfully:", info.messageId)

    return {
      success: true,
      message: "Your message has been sent successfully! We'll get back to you soon.",
    }
  } catch (error) {
    console.error("Error sending email:", error)

    // Try to provide more specific error messages
    let errorMessage = "Failed to send email. Please try again later."

    if (error instanceof Error) {
      if (error.message.includes("authentication")) {
        errorMessage = "Email authentication failed. Please contact us directly at lumion.corps@gmail.com"
      } else if (error.message.includes("connection")) {
        errorMessage = "Connection to email server failed. Please try again later."
      }
    }

    return {
      success: false,
      message: errorMessage,
    }
  }
}

