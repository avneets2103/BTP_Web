import twilio from 'twilio';
import { messageBodyGen } from '../constants.js';

const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const sendWAMessage = (toPhoneNumber, otp) => {
    client.messages
    .create({
        body: messageBodyGen(otp),
        from: 'whatsapp:+14155238886',
        to: `whatsapp:+91${toPhoneNumber}`,
    })
    .then((message) => {
        console.log(`Message sent successfully with SID: ${message.sid}`);
    })
    .catch((error) => {
        console.error('Error sending message:', error);
    })
};

export {sendWAMessage}