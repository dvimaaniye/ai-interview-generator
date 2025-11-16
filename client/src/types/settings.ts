import z from 'zod';

export const SettingsDataSchema = z.object({
	geminiApiKey: z.string(),
});

export type SettingsDataType = z.infer<typeof SettingsDataSchema>;
