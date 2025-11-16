import { createContext } from 'react';

export const SettingsPopupContext = createContext<{
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
} | null>(null);
