"use server"
import { sesClient } from "@/utils/email/client";
import { SendEmailCommand } from "@aws-sdk/client-ses"; // ES Modules import
import { transferRequestEmailHtml } from "./email-templates";

export async function sendTransferRequestEmail(toAddresses: string[], redirectLink: string, message: string) {
    const input = transferRequestEmailHtml(toAddresses, redirectLink, message)
    const command = new SendEmailCommand(input);
    return sesClient.send(command, (err, data) => {
        if (err) {
            console.error('Error:', err);
        } else {
            console.debug('Email sent:', data);
        }
    });
}