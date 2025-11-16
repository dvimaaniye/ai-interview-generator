import type { Control } from 'react-hook-form';

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { PasswordInput } from '@/components/ui/password';
import type { SettingsDataType } from '@/types/settings';

export function Settings({ control }: { control: Control<SettingsDataType> }) {
	return (
		<>
			<FormField
				control={control}
				name="geminiApiKey"
				render={({ field }) => (
					<FormItem>
						<div className="flex items-center gap-2">
							<FormLabel>Gemini API Key</FormLabel>
						</div>
						<FormControl>
							<PasswordInput placeholder="Enter a Gemini API Key" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	);
}
