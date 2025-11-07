import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@radix-ui/react-tooltip';
import { Info } from 'lucide-react';
import { type Control } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox';
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { experienceLevels } from '@/constants';
import { type FormData, ResumeSchema } from '@/types/form';

interface FormFieldProps {
	control: Control<FormData>;
}

export function ExperienceLevelField({ control }: FormFieldProps) {
	return (
		<FormField
			control={control}
			name="experienceLevel"
			render={({ field }) => (
				<FormItem className="flex flex-col">
					<FormLabel>Experience Level</FormLabel>
					<Select onValueChange={field.onChange} defaultValue={field.value}>
						<SelectTrigger className="w-[200px]">
							<SelectValue placeholder="Experience Level" />
						</SelectTrigger>
						<SelectContent>
							{experienceLevels.map((expLevel) => (
								<SelectItem value={expLevel.value} key={expLevel.value}>
									{expLevel.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<FormDescription>
						Your current experience level in the industry
					</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

export function TechnicalLanguagesField({ control }: FormFieldProps) {
	return (
		<FormField
			control={control}
			name="technicalLanguages"
			render={({ field }) => (
				<FormItem>
					<div className="flex items-center gap-2">
						<FormLabel>Technical Languages</FormLabel>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Info className="h-4 w-4 text-muted-foreground cursor-help" />
								</TooltipTrigger>
								<TooltipContent side="right">
									<p className="max-w-xs text-sm text-black/40 bg-muted/80 rounded-md p-2 shadow-md border">
										List programming languages you're proficient in, separated
										by commas
									</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
					<FormControl>
						<Input
							placeholder="JavaScript, TypeScript, Python etc"
							{...field}
						/>
					</FormControl>
					<FormDescription>Familiar Technical languages</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

export function NumberOfQuestionsField({ control }: FormFieldProps) {
	return (
		<FormField
			control={control}
			name="numOfQuestions"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Number of Questions</FormLabel>
					<FormControl>
						<Input
							type="number"
							placeholder="Enter number of questions"
							{...field}
							onChange={(e) => field.onChange(Number(e.target.value))}
						/>
					</FormControl>
					<FormDescription>Number of questions to generate</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

export function ResumeTextField({ control }: FormFieldProps) {
	return (
		<FormField
			control={control}
			name="resumeText"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Resume (as text)</FormLabel>
					<FormControl>
						<Textarea
							placeholder="Paste your resume content here..."
							className="resize-y max-h-60"
							{...field}
						/>
					</FormControl>
					<FormDescription className="flex">
						<span>Resume content</span>
						<span className="ml-auto">
							{field.value?.trim().length || 0}/{ResumeSchema.maxLength}
						</span>
					</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

export function GenerateAnswersField({ control }: FormFieldProps) {
	return (
		<FormField
			control={control}
			name="shouldGenerateAnswer"
			render={({ field }) => (
				<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
					<FormControl>
						<Checkbox checked={field.value} onCheckedChange={field.onChange} />
					</FormControl>
					<div className="space-y-1 leading-none">
						<FormLabel>Generate answers</FormLabel>
						<FormDescription>
							Do you want to generate an answer for each question?
						</FormDescription>
						<FormMessage />
					</div>
				</FormItem>
			)}
		/>
	);
}
