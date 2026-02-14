import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const data = JSON.parse(event.body);
    const {
      playerName,
      age,
      email,
      phone,
      parentName,
      program,
      emergencyContact,
      emergencyPhone,
    } = data;

    // Email to camp organizers
    const emailResult = await resend.emails.send({
      from: 'AAA Sports Camp <registrations@yourdomain.com>', // Change this to your verified domain
      to: [process.env.ADMIN_EMAIL || 'your-email@example.com'], // Your email address
      subject: `🎉 New Registration: ${playerName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #E53935 0%, #1E88E5 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .section { background: white; padding: 20px; margin-bottom: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
              .section h2 { color: #E53935; margin-top: 0; font-size: 18px; border-bottom: 2px solid #E53935; padding-bottom: 10px; }
              .info-row { display: flex; padding: 8px 0; border-bottom: 1px solid #eee; }
              .info-label { font-weight: bold; width: 180px; color: #666; }
              .info-value { flex: 1; color: #333; }
              .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 28px;">⚽ New Registration Received!</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">AAA Sports Camp Registration System</p>
              </div>
              
              <div class="content">
                <div class="section">
                  <h2>🏃 Player Information</h2>
                  <div class="info-row">
                    <div class="info-label">Player Name:</div>
                    <div class="info-value"><strong>${playerName}</strong></div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">Age:</div>
                    <div class="info-value">${age} years old</div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">Program:</div>
                    <div class="info-value"><strong>${program}</strong></div>
                  </div>
                </div>

                <div class="section">
                  <h2>👨‍👩‍👧 Parent/Guardian Information</h2>
                  <div class="info-row">
                    <div class="info-label">Parent Name:</div>
                    <div class="info-value">${parentName}</div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">Email:</div>
                    <div class="info-value"><a href="mailto:${email}" style="color: #1E88E5;">${email}</a></div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">Phone:</div>
                    <div class="info-value"><a href="tel:${phone}" style="color: #1E88E5;">${phone}</a></div>
                  </div>
                </div>

                <div class="section">
                  <h2>🚨 Emergency Contact</h2>
                  <div class="info-row">
                    <div class="info-label">Contact Name:</div>
                    <div class="info-value">${emergencyContact}</div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">Emergency Phone:</div>
                    <div class="info-value"><a href="tel:${emergencyPhone}" style="color: #1E88E5;">${emergencyPhone}</a></div>
                  </div>
                </div>

                <div class="section" style="background: #fff3cd; border-left: 4px solid #ffc107;">
                  <p style="margin: 0; color: #856404;">
                    <strong>⚠️ Next Steps:</strong><br>
                    • Payment status will update when Stripe processes the payment<br>
                    • Check your Supabase dashboard for the complete registration record<br>
                    • Send a confirmation email to the parent
                  </p>
                </div>
              </div>

              <div class="footer">
                <p>This email was automatically generated by the AAA Sports Camp registration system.</p>
                <p style="color: #999;">Registration received on ${new Date().toLocaleString('en-US', { 
                  timeZone: 'America/Los_Angeles',
                  dateStyle: 'full',
                  timeStyle: 'short'
                })}</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        message: 'Email sent successfully',
        id: emailResult.data?.id 
      }),
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to send email',
        message: error.message 
      }),
    };
  }
};
