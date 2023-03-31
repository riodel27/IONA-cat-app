import { FC } from 'react';
import { StyledAlert } from './styled';

interface CustomAlertProps {
	message: string;
	variant?: string;
	onClose: () => void;
}

export const CustomAlert: FC<CustomAlertProps> = ({
	message,
	variant = 'info',
	onClose,
}) => {
	return (
		<StyledAlert variant={variant} onClose={onClose} dismissible>
			{message}
		</StyledAlert>
	);
};
