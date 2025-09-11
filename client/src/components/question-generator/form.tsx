'use client';

import { memo } from 'react';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useQuestionGeneratorForm } from '@/hooks/useQuestionGeneratorForm';
import type { ResultsData } from '@/types/form-response';

import {
	ExperienceLevelField,
	GenerateAnswersField,
	NumberOfQuestionsField,
	ResumeTextField,
	TechnicalLanguagesField,
} from './form-fields';

interface QuestionGeneratorFormProps {
	onSuccess: (data: ResultsData) => void;
}

export function QuestionGeneratorForm({
	onSuccess,
}: QuestionGeneratorFormProps) {
	const { form, onSubmit, isSubmitting } = useQuestionGeneratorForm({
		onSuccess,
	});

	return (
		<Form {...form}>
			<form onSubmit={onSubmit} className="space-y-8 max-w-3xl mx-auto py-10">
				<ExperienceLevelField control={form.control} />

				<TechnicalLanguagesField control={form.control} />

				<NumberOfQuestionsField control={form.control} />

				<ResumeTextField control={form.control} />

				<GenerateAnswersField control={form.control} />

				<Button type="submit" disabled={isSubmitting}>
					{isSubmitting ? 'Generating...' : 'Generate Interview'}
				</Button>
			</form>
		</Form>
	);
}

export default memo(QuestionGeneratorForm);
