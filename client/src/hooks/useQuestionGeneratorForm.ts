import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useCallback, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { defaultFormValues } from '@/constants';
import { type FormData, formSchema } from '@/types/form';
import type {
	ResultsData,
	ValidationErrorResponse,
} from '@/types/form-response';

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_URL,
});

interface QuestionGeneratorFormProps {
	onSuccess: (data: ResultsData) => void;
}

export function useQuestionGeneratorForm({
	onSuccess,
}: QuestionGeneratorFormProps) {
	const abortControllerRef = useRef<AbortController>(undefined);

	const form = useForm<FormData>({
		defaultValues: defaultFormValues,
		resolver: zodResolver(formSchema),
	});

	const onSubmit = useCallback(
		async (values: FormData) => {
			if (abortControllerRef.current) {
				abortControllerRef.current.abort();
				console.log('Previous request aborted');
			}

			abortControllerRef.current = new AbortController();

			try {
				const response = await axiosInstance.post(
					'/generate-interview',
					values,
					{
						signal: abortControllerRef.current.signal,
					},
				);

				onSuccess(response.data);
				console.log('Response:', response.data);
				toast.success('Questions generated successfully!');
				form.reset();
			} catch (err) {
				if (axios.isAxiosError(err) && err.response?.status === 422) {
					const errorData = err.response.data as ValidationErrorResponse;
					const fieldErrors = errorData.error.properties;

					Object.entries(fieldErrors).forEach(([field, errors]) => {
						if (errors.errors && errors.errors.length > 0) {
							form.setError(field as keyof FormData, {
								type: 'server',
								message: errors.errors[0],
							});
						}
					});
					toast.error(errorData.message || 'Please correct the form errors.');
				} else {
					console.error('Unknown error from server: ', err);
					toast.error('Server error occurred');
				}
			} finally {
				abortControllerRef.current = undefined; // Clear controller after request completion
			}
		},
		[form],
	);

	const handleSubmit = form.handleSubmit(onSubmit);

	return {
		form,
		onSubmit: handleSubmit,
		isSubmitting: form.formState.isSubmitting,
		errors: form.formState.errors,
	};
}
