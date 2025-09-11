import { Check, Copy, Download } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
	copyToClipboard,
	downloadAsFile,
	formatResultItemAsText,
	formatResultsAsText,
} from '@/lib/utils';
import { type ResultsData } from '@/types/form-response';

import QuestionCard from './question-card';

interface ResultsDisplayProps {
	results: ResultsData;
}
export default function ResultsDisplay({ results }: ResultsDisplayProps) {
	const [copiedAll, setCopiedAll] = useState(false);
	const resultAsText = useMemo(() => formatResultsAsText(results), [results]);

	const handleCopy = useCallback(
		async (text: string) => {
			const copyError = await copyToClipboard(text);
			if (copyError) {
				console.log('Failed to copy', copyError);
				toast.error('Failed to copy');
				return false;
			}
			return true;
		},
		[copyToClipboard],
	);

	const handleCopyAll = async () => {
		const success = await handleCopy(resultAsText);
		if (!success) return;
		setCopiedAll(true);
		setTimeout(() => setCopiedAll(false), 2000);
	};

	const handleCopyIndividualQuestion = useCallback(
		async (item: ResultsData[number]) => {
			const success = await handleCopy(formatResultItemAsText(item));
			if (!success) return;
		},
		[handleCopy],
	);

	return (
		<div className="space-y-6 max-w-3xl mx-auto py-10">
			<div className="flex flex-col gap-y-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h2 className="text-2xl font-bold">Generated Questions</h2>
					<p className="text-muted-foreground">
						{results.length} question{results.length !== 1 ? 's' : ''} generated
					</p>
				</div>

				<div className="flex gap-2">
					<Button
						variant="outline"
						onClick={() => handleCopyAll()}
						className="gap-2"
					>
						{copiedAll ? (
							<Check className="h-4 w-4" />
						) : (
							<Copy className="h-4 w-4" />
						)}
						{copiedAll ? 'Copied!' : 'Copy All'}
					</Button>

					<Button
						variant="outline"
						onClick={() => downloadAsFile(resultAsText)}
						className="gap-2"
					>
						<Download className="h-4 w-4" />
						Download
					</Button>
				</div>
			</div>

			<Separator />

			<div className="space-y-4">
				{results.map((item) => (
					<QuestionCard
						key={item.id}
						onCopy={handleCopyIndividualQuestion}
						item={item}
					/>
				))}
			</div>
		</div>
	);
}
