import { Toaster } from 'sonner';

import QuestionGeneratorForm from '@/components/question-generator/form';

function App() {
	return (
		<main className="container mx-auto px-4">
			<Toaster />
			<QuestionGeneratorForm />
		</main>
	);
}

export default App;
