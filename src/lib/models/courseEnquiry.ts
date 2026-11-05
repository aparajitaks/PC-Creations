import { ObjectId } from 'mongodb';

export interface CourseEnquiry {
  _id?: ObjectId;
  name: string;
  email: string;
  phone: string;
  paymentOption: 'registration_fee' | 'course_fee' | 'both';
  paymentOptionLabel: string;
  amount: number;
  paymentScreenshot?: {
    filename: string;
    contentType: string;
    size: number;
    dataBase64?: string;
  };
  emailNotification: {
    status: 'pending' | 'sent' | 'failed' | 'not_configured';
    sentAt?: Date;
    error?: string;
    messageId?: string;
  };
  status: 'new' | 'verified' | 'contacted' | 'enrolled' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}
