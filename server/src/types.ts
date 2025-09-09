import { z } from 'zod';

export const experienceLevels = [
	{
		label: 'Fresher',
		value: 'fresher',
	},
	{
		label: 'Mid-Level',
		value: 'midLevel',
	},
	{
		label: 'Senior',
		value: 'senior',
	},
] as const;

export const ExperienceLevelSchema = z.enum(
	experienceLevels.map((level) => level.value),
	{ error: 'Please select a valid experience level' },
);

export const TechnicalLanguagesSchema = z
	.string({ error: 'Technical languages is required' })
	.trim()
	.min(1, { error: 'Cannot be left blank' })
	.max(100, { error: (iss) => `Max ${iss.maximum} characters allowed` });

export const NumOfQuestionsSchema = z
	.number({ error: 'Number between 1 and 100 is required' })
	.min(1, { error: 'At least one question must be generated' })
	.max(100, {
		error: (iss) => `Max ${iss.maximum} can be generated at once`,
	});

export const ResumeSchema = z
	.string({ error: 'Need resume data' })
	.trim()
	.min(100, { error: 'More data is needed' })
	.max(5000, { error: (iss) => `Max ${iss.maximum} characters allowed` });

export const formSchema = z.strictObject({
	experienceLevel: ExperienceLevelSchema,
	technicalLanguages: TechnicalLanguagesSchema,
	numOfQuestions: NumOfQuestionsSchema,
	resumeText: ResumeSchema,
	shouldGenerateAnswer: z.boolean(),
});

export type GenerateInterviewDto = z.infer<typeof formSchema>;
