export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  credits: number;
  subscription: 'free' | 'starter' | 'pro';
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}

export interface ImageEditRequest {
  id: string;
  userId: string;
  prompt: string;
  originalImage?: string;
  editedImage: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  processingTime: number;
  creditsUsed: number;
  createdAt: Date;
  completedAt?: Date;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  credits: number;
  features: string[];
  popular: boolean;
  period: 'monthly' | 'yearly';
}

export interface PaymentSession {
  id: string;
  userId: string;
  planId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  stripeSessionId: string;
  createdAt: Date;
  completedAt?: Date;
}

export interface AIModel {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  processingTime: number;
  creditsRequired: number;
  isActive: boolean;
}