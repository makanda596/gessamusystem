export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email - GESSAMU, Moi University</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 0;
            background-color: #f0f8ff; /* Light Blue */
        }
        .header {
            background: linear-gradient(to right, #008000, #00CED1); /* Green to Blue */
            padding: 25px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .header h1 {
            color: white;
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }
        .content {
            background-color: white;
            padding: 30px;
            border-radius: 0 0 8px 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .verification-code {
            background-color: #e0fae0; /* Light Green */
            padding: 20px;
            border-radius: 6px;
            text-align: center;
            margin: 30px 0;
            font-size: 28px;
            font-weight: bold;
            letter-spacing: 4px;
            color: #008000; /* Green */
            border: 1px dashed #008000;
        }
        .button {
            display: inline-block;
            padding: 14px 28px;
            background: linear-gradient(to right, #008000, #00CED1); /* Green to Blue */
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            color: #777;
            font-size: 12px;
        }
        .highlight-green {
            color: #008000;
            font-weight: 600;
        }
        .highlight-blue {
            color: #00CED1;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Welcome to <span class="highlight-green">GESSAMU</span></h1>
    </div>
    <div class="content">
        <p>Dear Student,</p>

        <p>Thank you for joining the <span class="highlight-green">Geography and Environmental Studies Students' Association of Moi University (GESSAMU)</span>!</p>

        <p>Your verification code is:</p>

        <div class="verification-code">
            {verificationToken}
        </div>

        <p>Enter this code in our app or website to complete your registration and unlock opportunities in geospatial technologies and environmental studies.</p>

        <p style="font-style: italic; color: #777;">This code will expire in 15 minutes for security reasons.</p>

        <p>As a verified member of <span class="highlight-green">GESSAMU</span>, you'll gain access to:</p>
        <ul style="padding-left: 20px;">
            <li>Exclusive <span class="highlight-blue">training sessions</span> in Surveying, GIS, Remote Sensing, and more.</li>
            <li>Networking opportunities with fellow Geography and Environmental Studies students.</li>
            <li>Workshops and seminars to enhance your geospatial skills.</li>
            <li>Information on upcoming events, projects, and career prospects.</li>
            <li>Resources and support to excel in your academic and professional journey.</li>
        </ul>

        <p>Stay connected with <span class="highlight-green">GESSAMU</span> and empower your future in the dynamic fields of geography and environmental science!</p>

        <p>If you didn't create this account, please ignore this email or contact our support team immediately.</p>
<p>or reach out to our gessamu support team through gessamusuport@gmail.com</p>
        <p>Welcome aboard!<br>
        <strong>The GESSAMU Organizing Committee</strong></p>
    </div>
    <div class="footer">
        <p>This is an automated message. Please do not reply to this email.</p>
        <p>&copy; {new Date().getFullYear()} GESSAMU, Moi University. Empowering Geospatial and Environmental Leaders.</p>
    </div>
</body>
</html>
`;
export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset - GESSAMU, Moi University</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #777;
            max-width: 600px;
            margin: 0 auto;
            padding: 0;
            background-color: #f0f8ff; /* Light Blue */
        }
        .header {
            background: linear-gradient(to right, #008000, #00CED1); /* Green to Blue */
            padding: 25px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .header h1 {
            color: white;
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }
        .content {
            background-color: white;
            padding: 30px;
            border-radius: 0 0 8px 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .button {
            display: inline-block;
            padding: 14px 28px;
            background-color: #008000; /* Green */
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            color: #777;
            font-size: 12px;
        }
        .highlight-green {
            color: #008000;
            font-weight: 600;
        }
        .highlight-blue {
            color: #00CED1;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Password Reset Request</h1>
    </div>
    <div class="content">
        <p>Dear Student,</p>

        <p>We received a request to reset your password for your <span class="highlight-green">GESSAMU</span> account.</p>

        <p>To reset your password, please click the button below:</p>

        <div style="text-align: center;">
            <a href="{RESET_URL}" class="button">Reset Password</a>
        </div>
    </div>

    <p style="font-style: italic; color: #777;">This link will expire in 20 minutes for security reasons.</p>

    <p>If you didn't request this password reset, please secure your account by:</p>
    <ol style="padding-left: 20px;">
        <li>Changing your password immediately</li>
        <li>Consider enabling any available account security features</li>
        <li>Contacting the GESSAMU technical team if you have concerns</li>
    </ol>

    <p>For your security, never share your password or this link with anyone.</p>

    <p>Best regards,<br>
    <strong>The GESSAMU Technical Team</strong></p>
    </div>
    <div class="footer">
        <p>This is an automated message. Please do not reply to this email.</p>
        <p>&copy; {new Date().getFullYear()} GESSAMU, Moi University. Empowering Geospatial and Environmental Leaders.</p>
    </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Updated - GESSAMU, Moi University</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 0;
            background-color: #f0f8ff; /* Light Blue */
        }
        .header {
            background: linear-gradient(to right, #008000, #00CED1); /* Green to Blue */
            padding: 25px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .header h1 {
            color: white;
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }
        .content {
            background-color: white;
            padding: 30px;
            border-radius: 0 0 8px 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .success-icon {
            text-align: center;
            margin: 25px 0;
        }
        .checkmark {
            background-color: #00CED1; /* Blue */
            color: white;
            width: 60px;
            height: 60px;
            line-height: 60px;
            border-radius: 50%;
            display: inline-block;
            font-size: 30px;
            font-weight: bold;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            color: #777;
            font-size: 12px;
        }
        .highlight-green {
            color: #008000;
            font-weight: 600;
        }
        .highlight-blue {
            color: #00CED1;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Password Successfully Updated</h1>
    </div>
    <div class="content">
        <p>Dear Student {username},</p>

        <div class="success-icon">
            <div class="checkmark">✓</div>
        </div>

        <p>We're confirming that your <span class="highlight-green">GESSAMU</span> account password has been successfully updated.</p>

        <p>If you made this change, you can safely disregard this email.</p>

        <p>If you <strong>did not</strong> change your password:</p>
        <ol style="padding-left: 20px;">
            <li>Immediately reset your password using the "Forgot Password" option.</li>
            <li>Review your account security settings.</li>
            <li>Contact the GESSAMU technical team at <span class="highlight-blue">gessamu.support@mu.ac.ke</span> (example email).</li>
        </ol>

        <p>For your protection, we recommend:</p>
        <ul style="padding-left: 20px;">
            <li>Using a unique password just for your GESSAMU account.</li>
            <li>Consider enabling any available account security features.</li>
            <li>Regularly updating your password.</li>
        </ul>

        <p>Thank you for helping keep the GESSAMU community secure!</p>

        <p>Best regards,<br>
        <strong>The GESSAMU Technical Team</strong></p>
    </div>
    <div class="footer">
        <p>This is an automated message. Please do not reply to this email.</p>
        <p>&copy; {new Date().getFullYear()} GESSAMU, Moi University. Empowering Geospatial and Environmental Leaders.</p>
    </div>
</body>
</html>
`;
export const SIGNUP_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to GESSAMU, Moi University</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 0;
            background-color: #f0f8ff; /* Light Blue */
        }
        .header {
            background: linear-gradient(to right, #008000, #00CED1); /* Green to Blue */
            padding: 25px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .header h1 {
            color: white;
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }
        .content {
            background-color: white;
            padding: 30px;
            border-radius: 0 0 8px 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .verification-code {
            background-color: #e0fae0; /* Light Green */
            padding: 20px;
            border-radius: 6px;
            text-align: center;
            margin: 25px 0;
            font-size: 28px;
            font-weight: bold;
            letter-spacing: 4px;
            color: #008000; /* Green */
            border: 1px dashed #008000;
        }
        .button {
            display: inline-block;
            padding: 14px 28px;
            background: linear-gradient(to right, #008000, #00CED1); /* Green to Blue */
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            color: #777;
            font-size: 12px;
        }
        .highlight-green {
            color: #008000;
            font-weight: 600;
        }
        .highlight-blue {
            color: #00CED1;
            font-weight: 600;
        }
        .benefits {
            background-color: #F5F5F5;
            padding: 15px;
            border-radius: 6px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Welcome to <span class="highlight-green">GESSAMU</span>!</h1>
    </div>
    <div class="content">
        <p>Dear {email},</p>

        <p>Thank you for joining the <span class="highlight-green">Geography and Environmental Studies Students' Association of Moi University (GESSAMU)</span> - your hub for geospatial and environmental opportunities!</p>

        <div class="benefits">
            <p>As a verified member, you can:</p>
            <ul style="padding-left: 20px;">
                <li>Access exclusive <span class="highlight-blue">training sessions</span> in Surveying, GIS, Remote Sensing, and more.</li>
                <li>Network with fellow Geography and Environmental Studies students and professionals.</li>
                <li><span class="highlight-green">Post your projects</span> and collaborate with others.</li>
                <li><span class="highlight-blue">View posted projects</span> by other students.</li>
                <li><span class="highlight-green">Try and submit tasks</span> for available projects.</li>
                <li>Stay updated on workshops, seminars, and events.</li>
                <li>Access valuable resources for your academic and professional growth.</li>
            </ul>
        </div>

        <p>Start exploring the platform now to discover projects, connect with peers, and enhance your skills in geospatial technologies and environmental studies!</p>

        <p>If you didn't create this account, please contact our support team immediately.</p>
        <p>gessamusuport@gmail.com</>

        <p>Welcome to the <span class="highlight-green">GESSAMU</span> community!<br>
        <strong>The GESSAMU Organizing Committee</strong></p>
    </div>
    <div class="footer">
        <p>This is an automated message. Please do not reply to this email.</p>
        <p>&copy; {new Date().getFullYear()} GESSAMU, Moi University. Empowering Geospatial and Environmental Leaders.</p>
    </div>
</body>
</html>
`;

