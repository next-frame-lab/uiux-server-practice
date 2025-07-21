import { useEffect, useState } from "react";

interface UserInfo {
	user_id: string;
	image: string;
	name: string;
	email: string;
}

interface ProfileProps {
	shouldFail?: boolean;
}

export default function Profile({ shouldFail = false }: ProfileProps) {
	const [user, setUser] = useState<UserInfo | null>(null);
	const [error, setError] = useState(false);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				if (shouldFail) throw new Error("불러오기 실패");

				const mockData = {
					code: "SUCCESS",
					data: {
						user_id: "1",
						image: "/image/user_1.png",
						name: "오준택",
						email: "handsomegay@naver.com",
					},
				};

				await new Promise((res) => setTimeout(res, 300));
				setUser(mockData.data);
			} catch (err) {
				setError(true);
			}
		};

		fetchUser();
	}, [shouldFail]);

	return (
		<div>
			<h2>Profile</h2>
			{error ? (
				<p>사용자 정보를 불러오는 데 실패했습니다.</p>
			) : user ? (
				<div>
					<p>이름: {user.name}</p>
					<p>이메일: {user.email}</p>
					<img src={user.image} alt="사용자 프로필 이미지" width={100} />
				</div>
			) : (
				<p>로딩 중...</p>
			)}
		</div>
	);
}
