import { useState } from 'react';
import { Toaster } from 'sonner';

import QuestionGeneratorForm from '@/components/question-generator/form';
import ResultsDisplay from '@/components/question-generator/result-display';

import type { ResultsData } from './types/form-response';

function App() {
	const [results, setResults] = useState<ResultsData>([]);
	return (
		<main className="container mx-auto px-4">
			<Toaster />
			<QuestionGeneratorForm
				onSuccess={(data: ResultsData) => setResults(data)}
			/>
			{results.length > 0 && <ResultsDisplay results={results} />}
		</main>
	);
}

export default App;
