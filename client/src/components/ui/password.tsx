import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';

import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from './input-group';

function PasswordInput({ className, ...props }: React.ComponentProps<'input'>) {
	const [visible, setVisible] = useState(false);
	return (
		<InputGroup>
			<InputGroupInput
				type={visible ? 'text' : 'password'}
				data-slot="input"
				className={cn(className)}
				{...props}
			/>
			<InputGroupAddon align="inline-end">
				<InputGroupButton
					type="button"
					className="cursor-pointer"
					variant="ghost"
					onClick={() => setVisible((prev) => !prev)}
				>
					{visible ? <EyeIcon /> : <EyeOffIcon />}
				</InputGroupButton>
			</InputGroupAddon>
		</InputGroup>
	);
}

export { PasswordInput };
