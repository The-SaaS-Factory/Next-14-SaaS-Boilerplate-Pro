import { Resend } from "resend";

export async function POST(request: Request) {
  const body = await request.text();
  const data = JSON.parse(body);
  const today = new Date(); // Get the current date and time
  const formattedDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }); // Format in US style (MM-DD-YYYY)

  const htmlContent = `
    <strong>Hi Cracks,</strong><br><br>
    Recibimos una solicitud de trabajo en The SaaS Factory.<br><br>
    <strong>Fecha:</strong> ${formattedDate}<br> 
    <ul>
      <li><strong>Project Name:</strong> ${data.projectName}</li>
      <li><strong>Budget:</strong> ${data.budget}</li>
      <li><strong>Description:</strong> ${data.description}</li>
      <li><strong>Urgency:</strong> ${data.urgency}</li>
      <li><strong>Stack:</strong> ${data.stack}</li>
      <li><strong>Organization:</strong>  ${data.userName} Email:${data.userEmail} ID: ${data.userId}</li>
    </ul><br>
    Our team will be in touch shortly to discuss your project further.<br><br>
    Best regards,<br>
    The The SaaS Factory Team
  `;

  const resend = new Resend("re_8fsUos8q_BAnbnQTxtLYDRt7vLAcy3WV4");

  const { error } = await resend.emails.send({
    from: "Royler <send@roylermarichal.com>",
    to: ["roylermarichalcarrazana@gmail.com"],
    subject: "Nuevo Trabajo en The SaaS Factory",
    html: htmlContent,
  });

  if (error) {
    return console.error({ error });
  }

  return Response.json({ code: 200 });
}
