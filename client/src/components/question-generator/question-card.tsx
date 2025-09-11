import { Separator } from '@radix-ui/react-select';
import { Check, Copy } from 'lucide-react';
import { memo, useState } from 'react';

import type { ResultsData } from '@/types/form-response';

import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface QuestionCardProps {
	item: ResultsData[number];
	onCopy: (item: ResultsData[number]) => void;
}

export function QuestionCard({ item, onCopy }: QuestionCardProps) {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		onCopy(item);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<Card>
			<CardHeader className="pb-3">
				<div className="flex items-start justify-between">
					<CardTitle className="text-lg">Question {item.id}</CardTitle>
					<Button
						variant="ghost"
						size="sm"
						onClick={handleCopy}
						className="gap-1"
					>
						{copied ? (
							<Check className="h-3 w-3" />
						) : (
							<Copy className="h-3 w-3" />
						)}
						{copied ? 'Copied' : 'Copy'}
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
							<p className="text-foreground leading-relaxed">{item.answer}</p>
						</div>
					</>
				)}
			</CardContent>
		</Card>
	);
}

export default memo(QuestionCard);
