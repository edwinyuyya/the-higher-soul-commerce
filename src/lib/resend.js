export async function sendBlueprintEmail({ to, fullName, pdfBuffer, fileName }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !from) {
    throw new Error("RESEND_API_KEY / RESEND_FROM_EMAIL belum diset di environment variables.");
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject: "Blueprint-mu Sudah Siap 🔮",
      html: `<p>Halo ${fullName},</p><p>Laporan pribadimu sudah selesai dan terlampir di email ini dalam format PDF.</p><p>Terima kasih sudah mempercayai The Higher Soul.</p>`,
      attachments: [{ filename: fileName, content: pdfBuffer.toString("base64") }],
    }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Gagal mengirim email lewat Resend");
  }
}
