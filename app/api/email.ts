"use server"
import { sesClient } from "@/utils/email/client";
import { createClient } from "@/utils/supabase/server";
import { SendEmailCommand } from "@aws-sdk/client-ses"; // ES Modules import
// const { SESClient, SendRawEmailCommand } = require("@aws-sdk/client-ses"); // CommonJS import

const transferRequestEmailHtml = (ToAddresses: string[], transferLink: string) => {
    return { 
        Destination: {
        ToAddresses: ToAddresses // Specify recipient email address(es)
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: `
              <!DOCTYPE html>
              <html lang="en">
              <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>ScriptifyRx Prescription Transfer Request</title>
              </head>
              <body>
                  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                      <h2>ScriptifyRx Prescription Transfer Request</h2>
                      <p>Hello,</p>
                      <p>A patient has requested to transfer their prescription to your pharmacy using ScriptifyRx. Please click the link below to complete the transfer:</p>
                      <p><a href=${transferLink}>Transfer Prescription</a></p>
                      <p>If you have any questions or concerns, please contact us at support@scriptifyrx.com.</p>
                      <p>Thank you,</p>
                      <p>The ScriptifyRx Team</p>
                  </div>
              </body>
              </html>
            `
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'ScriptifyRx Prescription Transfer Request' // Specify email subject
        }
      },
      Source: 'noreply@scriptifyrx.com' // Specify sender email address
    };
}


export async function TestOTP() {
// const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses"); // CommonJS import
const input = transferRequestEmailHtml(['gabepeter0817@gmail.com'], 'localhost:3000/')
const command = new SendEmailCommand(input);
console.log("COMMAND", command)
sesClient.send(command, (err, data) => {
    if (err) {
      console.error('Error:', err);
    } else {
      console.log('Email sent:', data);
    }
});
// console.log("RESPONSE", response)

}