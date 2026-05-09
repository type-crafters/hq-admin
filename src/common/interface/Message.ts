export interface Message {
    id: string;
    firstName: string;
    lastName: string;
    mailTo: string;
    subject: string;
    content: string;
    receivedAt: Date;
    readAt: Date | null; 
    repliedAt: Date | null;
    ipAddress: string;
    userAgent: string;
}