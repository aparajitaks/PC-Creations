import { ObjectId } from 'mongodb';

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
  createdAt: Date;
  updatedAt: Date;
}

export type ContactStatus = ContactSubmission['status'];
