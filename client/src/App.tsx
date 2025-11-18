import { useCallback, useEffect, useRef, useState } from 'react';
import { Toaster } from 'sonner';

import QuestionGeneratorForm from '@/components/question-generator/form';
import ResultsDisplay from '@/components/question-generator/result-display';
import { SettingsPopup } from '@/components/settings/settings-popup';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuestionGeneratorForm } from '@/hooks/useQuestionGeneratorForm';
import type { ResultsData } from '@/types/form-response';

import { SettingsPopupContext } from './contexts';

function App() {
	const [results, setResults] = useState<ResultsData>([]);
	const resultsRef = useRef<HTMLDivElement | null>(null);
	const skeletonRef = useRef<HTMLDivElement | null>(null);
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);

	const handleFormSuccess = useCallback((data: ResultsData) => {
		setResults(data);
		setTimeout(() => {
			resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
		}, 100);
	}, []);

	const questionGeneratorForm = useQuestionGeneratorForm({
		onSuccess: handleFormSuccess,
	});

	useEffect(() => {
		if (questionGeneratorForm.isSubmitting) {
			setResults([]);
			setTimeout(() => {
				skeletonRef.current?.scrollIntoView({ behavior: 'smooth' });
			});
		}
	}, [questionGeneratorForm.isSubmitting]);

	return (
		<SettingsPopupContext
			value={{ isOpen: isSettingsOpen, setIsOpen: setIsSettingsOpen }}
		>
			<main className="container max-w-3xl mx-auto px-4 py-8">
				<div className="flex flex-col">
					<h1 className="text-blue-950 text-3xl font-extrabold text-center">
						AI Interview Generator
					</h1>

					<div className="ml-auto">
						<SettingsPopup />
					</div>
				</div>

				<QuestionGeneratorForm questionGeneratorForm={questionGeneratorForm} />

				{questionGeneratorForm.isSubmitting && (
					<div ref={skeletonRef} className="space-y-6">
						{[
							...Array(
								questionGeneratorForm.form.getValues('numOfQuestions'),
							).keys(),
						].map((idx) => (
							<div key={idx}>
								<Skeleton className="bg-transparent p-4 space-y-4 shadow-sm">
									<Skeleton className="w-1/4 h-4" />

									<div className="space-y-2">
										<Skeleton className="w-full h-4" />
										<Skeleton className="w-3/4 h-4" />
									</div>

									{questionGeneratorForm.form.getValues(
										'shouldGenerateAnswer',
									) && (
										<div className="space-y-2">
											<Skeleton className="w-full h-4" />
											<Skeleton className="w-3/4 h-4" />
										</div>
									)}
								</Skeleton>
							</div>
						))}
					</div>
				)}

				{results.length > 0 && (
					<div ref={resultsRef}>
						<ResultsDisplay results={results} />
					</div>
				)}

				<Toaster />
			</main>
		</SettingsPopupContext>
	);
}

export default App;
