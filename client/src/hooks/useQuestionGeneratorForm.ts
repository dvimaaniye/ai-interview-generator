import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { type FormData, defaultFormValues, formSchema } from '@/types/form';

export function useQuestionGeneratorForm() {
	const form = useForm<FormData>({
		defaultValues: defaultFormValues,
		resolver: zodResolver(formSchema),
	});

	const onSubmit = async (values: FormData) => {
		try {
			console.log('Form values:', values);
			toast.success('Questions generated successfully!');
			// form.reset();
		} catch (error) {
			console.error('Form submission error:', error);
			toast.error('Failed to generate questions. Please try again.');
		}
	};

	const handleSubmit = form.handleSubmit(onSubmit);

	return {
		form,
		onSubmit: handleSubmit,
		isSubmitting: form.formState.isSubmitting,
		errors: form.formState.errors,
	};
}
