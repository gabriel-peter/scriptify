export const transferRequestEmailHtml = (ToAddresses: string[], transferLink: string, message: string) => {
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
                      <h3> Personal Message from Patient: </h3>
                      <p>${message}</p>
                      <a href=${transferLink}>${transferLink}</a>
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