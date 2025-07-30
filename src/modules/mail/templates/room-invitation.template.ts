export const roomInvitationTemplate = {
  subject: 'Test Room Invitation',
  html: (username: string, roomLink: string) => `
    <h1 style="color: #333; font-family: Arial, sans-serif;">Hello, ${username}!</h1>
    <p style="color: #555; font-family: Arial, sans-serif;">You've been invited to join a quiz room.</p>
    <p style="color: #555; font-family: Arial, sans-serif;">Access link:</p>
    <a href="${roomLink}"
       style="display: inline-block; padding: 12px 24px; background: #3b82f6; color: white; 
              text-decoration: none; border-radius: 6px; font-family: Arial, sans-serif;
              font-weight: bold; margin: 10px 0;">
       Join the Room
    </a>
    <p style="color: #777; font-family: Arial, sans-serif; font-size: 14px;">
      If the button doesn't work, please copy and paste this link into your browser:<br>
      <span style="word-break: break-all;">${roomLink}</span>
    </p>
    <p style="color: #555; font-family: Arial, sans-serif; margin-top: 20px;">
      Best regards,<br>
      <strong>Quiz App</strong>
    </p>
  `,
  text: (username: string, roomLink: string) => `
    Hello ${username},

    You've been invited to join a room.
    Please use the following link to access the room:

    ${roomLink}

    Best regards,
    Quiz App
  `,
};
