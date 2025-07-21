import { Resend } from "resend";
import { Event } from "@/app/generated/prisma";
import { NewEmailEventTemplate } from "@/app/components/NewEventEmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);
const adminEmail = process.env.ADMIN_EMAIL ?? "";

export async function sendNewEventNotificationEmail(event: Event) {
  try {
    const { error } = await resend.emails.send({
      from: "pgh.events <admin@pgh.events>",
      to: [adminEmail],
      subject: "New Event Submission",
      react: NewEmailEventTemplate({ event }),
    });

    if (error !== null) {
      console.log("email error");
      console.error(error);
    }
  } catch (e) {
    console.log("email error");
    console.log(e);
  }
}
