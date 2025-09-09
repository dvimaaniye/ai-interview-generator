'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useQuestionGeneratorForm } from '@/hooks/useQuestionGeneratorForm';

import {
	ExperienceLevelField,
	GenerateAnswersField,
	NumberOfQuestionsField,
	ResumeTextField,
	TechnicalLanguagesField,
} from './form-fields';

export default function QuestionGeneratorForm() {
	const { form, onSubmit, isSubmitting } = useQuestionGeneratorForm();

	return (
		<Form {...form}>
			<form onSubmit={onSubmit} className="space-y-8 max-w-3xl mx-auto py-10">
				<ExperienceLevelField control={form.control} />

				<TechnicalLanguagesField control={form.control} />

				<NumberOfQuestionsField control={form.control} />

				<ResumeTextField control={form.control} />

				<GenerateAnswersField control={form.control} />

				<Button type="submit" disabled={isSubmitting}>
					{isSubmitting ? 'Generating...' : 'Submit'}
				</Button>
			</form>
		</Form>
	);
}
