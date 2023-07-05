import {Router} from "express";
import axios from "axios"
import sgMail from '@sendgrid/mail';

const router = Router()

router.get("/", async (req, res) => (
    res.send("cookingTogether entry")
))

router.get("/findCookingBuddy",async (req, res) => {
    try {

        const response = await axios.get('http://ss2023_wa_foodiemate_user_api:20063/users/getUserCTG')
        const users = response.data.users

        // Extrahiere Datum und Benutzernamen
        const filteredUsers = users.map(user => ({
            date: user.cookingTogetherDate,
            username: user.userName,
            email: user.emailAddress
        }));

        res.status(200).json({ users: filteredUsers });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post("/inviteCookingBuddy", async (req, res) => {
    const { email, contactData } = req.body;

    // API Key from SendGrid-API
    const apiKey = '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';

    console.log(email)
    console.log(contactData)

    sgMail.setApiKey(apiKey);

    const msg = {
        to: email,
        from: 'h.lendeckel@web.de',
        subject: 'Invitation for Cooking Buddy',
        text: contactData,
        html: `<p>Hi, you have been invited to be a cooking buddy! Please find the contact information below:</p><p>${contactData}</p>`,
    };

    try {
        await sgMail.send(msg);
        console.log('Email sent');
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Failed to send email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});
export { router }