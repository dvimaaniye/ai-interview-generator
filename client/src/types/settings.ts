import z from 'zod';

export const SettingsDataSchema = z.object({
	geminiApiKey: z.string(),
	resetFormAfterSubmit: z.boolean(),
});

export type SettingsDataType = z.infer<typeof SettingsDataSchema>;
