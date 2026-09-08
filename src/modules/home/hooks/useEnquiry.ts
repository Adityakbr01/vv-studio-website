import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { submitEnquiry, type EnquiryPayload, type EnquiryResponse } from '../api/enquiryApi';

export const enquiryKeys = {
  all: ['enquiry'] as const,
};

/**
 * React Query mutation for the website enquiry form.
 *
 * Usage:
 *   const { mutate, mutateAsync, isPending } = useSubmitEnquiry();
 *   mutate({
 *     enquiryFullName: 'Test',
 *     enquiryEmail: 'test@gmail.com',
 *     enquiryMobile: '9876543210',
 *     enquiryProduct: 'Website Enquiry',
 *     enquiryMessage: 'This is a test enquiry.',
 *     utm_medium: 'website',
 *     utm_source: 'google',
 *     utm_campaign: 'test',
 *   });
 */
export function useSubmitEnquiry(): UseMutationResult<EnquiryResponse, Error, EnquiryPayload> {
  return useMutation<EnquiryResponse, Error, EnquiryPayload>({
    mutationFn: submitEnquiry,
  });
}
