import React from 'react';
import './Notification.css';

export default function Notification({ message }) {
	if (message.text === '') return null;
	return (
		<div
			className={`notification_window ${
				message.type === 'success' ? 'success' : 'error'
			}-message`}
		>
			{message.text}
		</div>
	);
}
