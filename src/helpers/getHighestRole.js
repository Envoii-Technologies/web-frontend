export default (userData) =>
{
    const isOwner = userData.hasRole('app_intern');
    const isAdmin = userData.hasRole('app_admin');
    const isManager = userData.hasRole('app_manager');
    const isEditor = userData.hasRole('app_editor');
    const isUser = userData.hasRole('app_user');

    if(isOwner) return { role: "Owner", allRoles: [
        isOwner && "owner",
        isAdmin && "admin",
        isManager && "manager",
        isEditor && "editor",
        isUser && "user"
    ] };
    if(isAdmin) return { role: "Admin", allRoles: [
        isOwner && "owner",
        isAdmin && "admin",
        isManager && "manager",
        isEditor && "editor",
        isUser && "user"
    ] };
    if(isManager) return { role: "Manager", allRoles: [
        isOwner && "owner",
        isAdmin && "admin",
        isManager && "manager",
        isEditor && "editor",
        isUser && "user"
    ] };
    if(isEditor) return { role: "Editor", allRoles: [
        isOwner && "owner",
        isAdmin && "admin",
        isManager && "manager",
        isEditor && "editor",
        isUser && "user"
    ] };
    if(isUser) return { role: "User", allRoles: [
        isOwner && "owner",
        isAdmin && "admin",
        isManager && "manager",
        isEditor && "editor",
        isUser && "user"
    ] };
}