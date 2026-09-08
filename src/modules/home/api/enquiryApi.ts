import { apiClient } from '@/lib/apiClient';

export interface EnquiryPayload {
  enquiryFullName: string;
  enquiryEmail: string;
  enquiryMobile: string;
  enquiryProduct: string;
  enquiryMessage: string;
  utm_medium?: string;
  utm_source?: string;
  utm_campaign?: string;
}

export interface EnquiryResponse {
  status?: boolean | string;
  success?: boolean;
  message?: string;
  data?: unknown;
  [key: string]: unknown;
}

const ENQUIRY_ENDPOINT = '/enquiry.php';

/**
 * POST https://agsdemo.in/vvs/api/enquiry.php
 * Content-Type: application/json
 */
export async function submitEnquiry(payload: EnquiryPayload): Promise<EnquiryResponse> {
  const { data } = await apiClient.post<EnquiryResponse>(ENQUIRY_ENDPOINT, payload);
  return data;
}
