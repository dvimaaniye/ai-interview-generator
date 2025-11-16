import { zodResolver } from '@hookform/resolvers/zod';
import { Settings as SettingsIcon } from 'lucide-react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { SettingsPopupContext } from '@/contexts';
import { SettingsDataSchema, type SettingsDataType } from '@/types/settings';

import { Settings } from './settings';

export function SettingsPopup() {
	const popupContext = useContext(SettingsPopupContext);
	const form = useForm<SettingsDataType>({
		defaultValues: {
			geminiApiKey: localStorage.getItem('geminiApiKey') || '',
			resetFormAfterSubmit:
				localStorage.getItem('resetFormAfterSubmit') === 'true' ? true : false,
		},
		resolver: zodResolver(SettingsDataSchema),
	});

	const onSubmit = (values: SettingsDataType) => {
		popupContext?.setIsOpen(false);
		for (const [option, value] of Object.entries(values)) {
			localStorage.setItem(option, String(value).trim());
		}
	};

	return (
		<Dialog open={popupContext?.isOpen} onOpenChange={popupContext?.setIsOpen}>
			<DialogTrigger asChild>
				<Button type="button" variant="ghost" className="cursor-pointer">
					<SettingsIcon className="size-5 bg-transparent text-black/40" />
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Settings</DialogTitle>
					<DialogDescription className="sr-only">
						App settings
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
						<div className="space-y-6">
							<Settings control={form.control} />
						</div>

						<DialogFooter className="pt-4">
							<DialogClose asChild>
								<Button variant="outline">Cancel</Button>
							</DialogClose>
							<Button type="submit">Save changes</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
