// src/components/ui/MySettings.tsx
import { useState } from "react";

interface MySettingsProps {
	onChange?: (enabled: boolean) => void;
}

export default function MySettings({ onChange }: MySettingsProps) {
	const [enabled, setEnabled] = useState(false);

	const toggleNotification = () => {
		const newValue = !enabled;
		setEnabled(newValue);
		if (onChange) {
			onChange(newValue); // 서버 요청으로 간주
		}
	};

	return (
		<section>
			<h2>알림 설정</h2>
			<label>
				<input
					role="checkbox"
					type="checkbox"
					checked={enabled}
					onChange={toggleNotification}
				/>
				알림 수신
			</label>
		</section>
	);
}
