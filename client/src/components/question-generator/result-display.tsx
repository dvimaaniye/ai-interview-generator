import { Check, Copy, Download } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatResultItemAsText, formatResultsAsText } from '@/lib/utils';
import { type ResultsData } from '@/types/form-response';

interface ResultsDisplayProps {
	results: ResultsData;
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
	const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
	const [copiedAll, setCopiedAll] = useState(false);
	const resultAsText = useMemo(() => formatResultsAsText(results), [results]);

	const copyToClipboard = async (text: string, index?: number) => {
		try {
			await navigator.clipboard.writeText(text);

			if (index !== undefined) {
				setCopiedIndex(index);
				setTimeout(() => setCopiedIndex(null), 2000);
			} else {
				setCopiedAll(true);
				setTimeout(() => setCopiedAll(false), 2000);
			}
		} catch (error) {
			console.error('Failed to copy:', error);
			toast.error('Failed to copy');
		}
	};

	const downloadAsFile = () => {
		const text = resultAsText;
		const blob = new Blob([text], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);

		const link = document.createElement('a');
		link.href = url;
		link.hidden = true;
		link.download = `interview-questions-${new Date().toISOString()}.txt`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);

		URL.revokeObjectURL(url);
	};

	const copyIndividualQuestion = (item: ResultsData[number]) => {
		copyToClipboard(formatResultItemAsText(item), item.id);
	};

	return (
		<div className="space-y-6 max-w-3xl mx-auto py-10">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-2xl font-bold">Generated Questions</h2>
					<p className="text-muted-foreground">
						{results.length} question{results.length !== 1 ? 's' : ''} generated
					</p>
				</div>

				<div className="flex gap-2">
					<Button
						variant="outline"
						onClick={() => copyToClipboard(resultAsText)}
						className="gap-2"
					>
						{copiedAll ? (
							<Check className="h-4 w-4" />
						) : (
							<Copy className="h-4 w-4" />
						)}
						{copiedAll ? 'Copied!' : 'Copy All'}
					</Button>

					<Button variant="outline" onClick={downloadAsFile} className="gap-2">
						<Download className="h-4 w-4" />
						Download
					</Button>
				</div>
			</div>

			<Separator />

			<div className="space-y-4">
				{results.map((item) => (
					<Card key={item.id}>
						<CardHeader className="pb-3">
							<div className="flex items-start justify-between">
								<CardTitle className="text-lg">Question {item.id}</CardTitle>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => copyIndividualQuestion(item)}
									className="gap-1"
								>
									{copiedIndex === item.id ? (
										<Check className="h-3 w-3" />
									) : (
										<Copy className="h-3 w-3" />
									)}
									{copiedIndex === item.id ? 'Copied' : 'Copy'}
								</Button>
							</div>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<p className="font-medium text-sm text-muted-foreground mb-2">
									Question:
								</p>
								<p className="text-foreground">{item.question}</p>
							</div>

							{item.answer && (
								<>
									<Separator />
									<div>
										<p className="font-medium text-sm text-muted-foreground mb-2">
											Answer:
										</p>
										<p className="text-foreground leading-relaxed">
											{item.answer}
										</p>
									</div>
								</>
							)}
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
