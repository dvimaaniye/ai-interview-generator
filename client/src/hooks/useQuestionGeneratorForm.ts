import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useCallback, useContext, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { defaultFormValues } from '@/constants';
import { SettingsPopupContext } from '@/contexts';
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
	const settingsPopupContext = useContext(SettingsPopupContext);

	const onSubmit = useCallback(
		async (values: FormData) => {
			if (abortControllerRef.current) {
				abortControllerRef.current.abort();
				console.log('Previous request aborted');
			}

			const apiKey = localStorage.getItem('geminiApiKey');
			if (!apiKey) {
				settingsPopupContext?.setIsOpen(true);
				console.log('Enter a Gemini API key');
				return;
			}

			abortControllerRef.current = new AbortController();

			try {
				const response = await axiosInstance.post(
					'/generate-interview',
					values,
					{
						headers: { 'X-AI-API-KEY': apiKey },
						signal: abortControllerRef.current.signal,
					},
				);

				onSuccess(response.data);
				toast.success('Questions generated successfully!');
				if (localStorage.getItem('resetFormAfterSubmit') === 'true') {
					form.reset();
				}
			} catch (err: any) {
				if (axios.isAxiosError(err) && err.response?.status === 422) {
					const errorData = err.response.data as ValidationErrorResponse;
					const fieldErrors = errorData.error.properties;

					if (!fieldErrors || !fieldErrors.length) {
						console.error(errorData.message || 'Unknown form error occurred');
						toast.error(errorData.message || 'Unknown form error occurred');
					} else {
						Object.entries(fieldErrors).forEach(([field, errors]) => {
							if (errors.errors && errors.errors.length > 0) {
								form.setError(field as keyof FormData, {
									type: 'server',
									message: errors.errors[0],
								});
							}
						});

						console.error(
							errorData.message || 'Please correct the form errors.',
						);
						toast.error(errorData.message || 'Please correct the form errors.');
					}
				} else {
					console.error('Unknown error from server: ', err);
					toast.error(err?.response?.data?.message || 'Server error occurred');
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
