import type { Control } from 'react-hook-form';

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { PasswordInput } from '@/components/ui/password';
import { Switch } from '@/components/ui/switch';
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
							<PasswordInput
								autoFocus
								placeholder="Enter a Gemini API Key"
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={control}
				name="resetFormAfterSubmit"
				render={({ field: { value, onChange, ...switchProps } }) => (
					<FormItem>
						<FormControl>
							<div className="flex gap-2">
								<Switch
									id="resetFormAfterSubmit"
									checked={value}
									onCheckedChange={onChange}
									{...switchProps}
								/>
								<FormLabel htmlFor="resetFormAfterSubmit">
									Reset form after submission
								</FormLabel>
							</div>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	);
}
