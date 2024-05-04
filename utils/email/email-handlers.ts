"use server"
/**
 * Name
Fault
Details
AccountSendingPausedException	
client
Indicates that email sending is disabled for your entire Amazon SES account.

You can enable or disable email sending for your Amazon SES account using UpdateAccountSendingEnabled.

ConfigurationSetDoesNotExistException	
client
Indicates that the configuration set does not exist.

ConfigurationSetSendingPausedException	
client
Indicates that email sending is disabled for the configuration set.

You can enable or disable email sending for a configuration set using UpdateConfigurationSetSendingEnabled.

MailFromDomainNotVerifiedException	
client
Indicates that the message could not be sent because Amazon SES could not read the MX record required to use the specified MAIL FROM domain. For information about editing the custom MAIL FROM domain settings for an identity, see the Amazon SES Developer Guide 
.

MessageRejected	
client
Indicates that the action failed, and the message could not be sent. Check the error stack for more information about what caused the error.

SESServiceException	
Base exception class for all service exceptions from SES service.
 */
import { sesClient } from "@/utils/email/client";
import { SendEmailCommand } from "@aws-sdk/client-ses"; // ES Modules import
import { transferRequestEmailHtml } from "./email-templates";

export async function sendTransferRequestEmail(toAddresses: string[], redirectLink: string, message: string) {
    const input = transferRequestEmailHtml(toAddresses, redirectLink, message)
    const command = new SendEmailCommand(input);
    return sesClient.send(command);
}