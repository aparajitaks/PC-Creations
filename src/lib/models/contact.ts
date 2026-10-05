import { ObjectId } from 'mongodb';

export interface WhatsAppNotification {
  status: 'pending' | 'sent' | 'failed';
  sentAt?: Date;
  error?: string;
}

export interface ContactSubmission {
  _id?: ObjectId;
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  budget?: string;
  message: string;
  status: 'new' | 'contacted' | 'in_progress' | 'converted' | 'closed';
  whatsappNotification: WhatsAppNotification;
  createdAt: Date;
  updatedAt: Date;
}

export type ContactStatus = ContactSubmission['status'];
