import { useCallback, useRef, useState } from 'react';
import { Toaster } from 'sonner';

import QuestionGeneratorForm from '@/components/question-generator/form';
import ResultsDisplay from '@/components/question-generator/result-display';

import type { ResultsData } from './types/form-response';

function App() {
	const [results, setResults] = useState<ResultsData>([]);
	const resultsRef = useRef<HTMLDivElement | null>(null);

	const handleFormSuccess = useCallback((data: ResultsData) => {
		setResults(data);
		setTimeout(() => {
			resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
		}, 100);
	}, []);

	return (
		<main className="container max-w-3xl mx-auto px-4 py-8">
			<div>
				<h1 className="text-blue-950 text-3xl font-extrabold text-center">
					AI Interview Generator
				</h1>
			</div>

			<QuestionGeneratorForm onSuccess={handleFormSuccess} />

			{results.length > 0 && (
				<div ref={resultsRef}>
					<ResultsDisplay results={results} />
				</div>
			)}
			<Toaster />
		</main>
	);
}

export default App;
