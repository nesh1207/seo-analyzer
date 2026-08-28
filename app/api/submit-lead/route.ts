import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      companyName,
      contactNumber,
      email,
      location,
      url,
      grade = 'A',
      overallScore = 88,
      checklistCompletionPercent = 0,
    } = body;

    // 1. Validate required fields
    if (!name || !companyName || !contactNumber || !email || !location) {
      return NextResponse.json(
        { error: 'Missing required lead fields (Name, Company, Contact Number, Email, Location).' },
        { status: 400 }
      );
    }

    const recipientEmail = process.env.RECIPIENT_EMAIL || 'contact@zoneseo.online';

    // 2. Fetch credentials explicitly matching the .env.local file
    const emailUser = process.env.EMAIL_USER?.trim();
    const emailPass = process.env.EMAIL_PASS?.replace(/\s/g, '');
    const smtpHost = process.env.SMTP_HOST || 'smtp.zoho.com';
    const smtpPort = Number(process.env.SMTP_PORT) || 465;

    if (!emailUser || !emailPass) {
      console.error('Missing EMAIL_USER or EMAIL_PASS in .env.local');
      return NextResponse.json(
        { error: 'Missing email credentials in .env.local' },
        { status: 500 }
      );
    }

    const emailSubject = `🚀 New Lead: ${name} (${companyName}) - Audit Grade ${grade} [${url}]`;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #09090b; color: #f4f4f5; padding: 24px; }
            .container { max-width: 600px; margin: 0 auto; background: #18181b; border-radius: 16px; padding: 28px; border: 1px solid #27272a; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5); }
            .header { border-bottom: 2px solid #10b981; padding-bottom: 16px; margin-bottom: 24px; text-align: center; }
            .header h2 { margin: 0; color: #10b981; font-size: 24px; font-weight: 800; }
            .badge { display: inline-block; background: #064e3b; color: #34d399; font-weight: bold; padding: 6px 16px; border-radius: 9999px; border: 1px solid #059669; font-size: 14px; }
            .table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            .table td { padding: 10px 14px; border-bottom: 1px solid #27272a; font-size: 14px; }
            .table td.key { font-weight: bold; color: #a1a1aa; width: 40%; }
            .table td.val { color: #f4f4f5; font-weight: 500; }
            .footer { margin-top: 28px; font-size: 12px; color: #71717a; text-align: center; border-top: 1px solid #27272a; padding-top: 16px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🚀 New Zone SEO Lead Submission</h2>
              <p style="margin: 6px 0 0 0; color: #a1a1aa; font-size: 13px;">Zone SEO Pulse Diagnostic Engine</p>
            </div>

            <div style="text-align: center; margin-bottom: 20px;">
              <span class="badge">Grade ${grade} (${overallScore}/100 Avg) • ${checklistCompletionPercent}% Checklist Done</span>
            </div>

            <table class="table">
              <tr>
                <td class="key">Target Website URL:</td>
                <td class="val"><a href="${url}" target="_blank" style="color: #34d399; text-decoration: underline;">${url}</a></td>
              </tr>
              <tr>
                <td class="key">Full Name:</td>
                <td class="val">${name}</td>
              </tr>
              <tr>
                <td class="key">Company Name:</td>
                <td class="val">${companyName}</td>
              </tr>
              <tr>
                <td class="key">Contact Number:</td>
                <td class="val"><a href="tel:${contactNumber}" style="color: #60a5fa;">${contactNumber}</a></td>
              </tr>
              <tr>
                <td class="key">Email Address:</td>
                <td class="val"><a href="mailto:${email}" style="color: #60a5fa;">${email}</a></td>
              </tr>
              <tr>
                <td class="key">Business Location:</td>
                <td class="val">${location}</td>
              </tr>
              <tr>
                <td class="key">Overall Audit Grade:</td>
                <td class="val"><strong>Grade ${grade}</strong> (${overallScore}/100)</td>
              </tr>
              <tr>
                <td class="key">Action Checklist Status:</td>
                <td class="val">${checklistCompletionPercent}% Tasks Checked</td>
              </tr>
            </table>

            <div class="footer">
              <p>© ${new Date().getFullYear()} Powered by Zone SEO </p>
            </div>
          </div>
        </body>
      </html>
    `;

    // 3. Direct Gmail SMTP Configuration
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
      tls: {
        rejectUnauthorized: false, //Prevent local network/ antivirus cert blocks
      },
    });

    // 4. Dispatch Email
    const info = await transporter.sendMail({
      from: `"Zone SEO Leads" <${emailUser}>`,
      to: recipientEmail,
      subject: emailSubject,
      html: emailHtml,
    });

    console.log('Email sent successfully:', info.messageId);

    return NextResponse.json({
      success: true,
      message: 'Lead submitted successfully.',
    });

  } catch (error: any) {
    console.error('Mail error:', error.message || error);
    return NextResponse.json(
      { error: 'Failed to process lead submission.', details: error?.message },
      { status: 500 }
    );
  }
}