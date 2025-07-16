interface User {
	name: string;
	email: string;
	image: string;
}

interface ProfileProps {
	user: User | null;
}

export const Profile = ({ user }: ProfileProps) => {
	if (!user) {
		return <div>사용자 정보를 불러올 수 없습니다</div>;
	}

	return (
		<div>
			<img
				src={user.image}
				alt="사용자 이미지"
				width={120}
				height={120}
			/>
			<h2>{user.name}</h2>
			<p>{user.email}</p>
		</div>
	);
};