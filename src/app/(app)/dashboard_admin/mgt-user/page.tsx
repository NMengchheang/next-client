import { fetchUser } from "@/app/action";
import UserList from "@/components/dashboard_admin/mgt-user/UserList";

export default async function page() {
    const users = await fetchUser();
    return (
        <>
            <UserList users={users}/>
        </>
    )
}
