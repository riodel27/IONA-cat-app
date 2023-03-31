import { FC, useState, createContext, useContext, Context } from 'react';
import { CustomAlert } from '../components/CustomAlert/CustomAlert';

interface AlertContextType {
	addAlert: (message: string, variant?: string) => void;
}

interface AlertProviderProps {
	children: React.ReactNode;
}

const AlertContext: Context<AlertContextType> = createContext<AlertContextType>(
	{
		addAlert: () => {},
	}
);

export const useAlert = () => useContext(AlertContext);

const AlertProvider: FC<AlertProviderProps> = ({ children }) => {
	const [alerts, setAlerts] = useState<
		{ id: number; message: string; variant?: string }[]
	>([]);

	const addAlert = (message: string, variant?: string) => {
		setAlerts([...alerts, { id: alerts.length + 1, message, variant }]);
	};

	const removeAlert = (id: number) => {
		setAlerts(alerts.filter((alert) => alert.id !== id));
	};

	return (
		<AlertContext.Provider value={{ addAlert }}>
			{alerts.map((alert, index) => (
				<CustomAlert
					key={index}
					message={alert.message}
					variant={alert.variant}
					onClose={() => removeAlert(alert.id)}
				/>
			))}
			{children}
		</AlertContext.Provider>
	);
};

export default AlertProvider;
