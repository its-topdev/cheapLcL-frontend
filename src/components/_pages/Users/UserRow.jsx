import ActionsBtn from "./ActionsBtn";
import { dateTimeFormat } from '../../../constants/general';

export default function UserRow({ user, onFetchUsers }) {
    return (
        <>
            <tr>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.company}</td>
                <td>{user.createdAt && dateTimeFormat(user.createdAt)}</td>
                <td>{user.userStatus && user.userStatus.name && user.userStatus.name.toUpperCase()}</td>
                <td>{user.role}</td>
                <td className="actions">
                    <ActionsBtn
                        user={user}
                        onFetchUsers={onFetchUsers}
                    />
                </td>
            </tr>
        </>
    );
}