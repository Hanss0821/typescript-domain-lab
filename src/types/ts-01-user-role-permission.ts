interface User {
  id: string;
  name: string;
  roles: Role[]; // 角色存在多个
}

interface Role {
  id: string;
  name: RoleType;
  permissions: Permission[];
}

type RoleType = "admin" | "common";
// type Permission = "admin:user:read" | "admin:user:write" | "common:user:read";

type Permission = `${RoleType}:${string}:${string}`; // 模板字面量类型
const okPermission: Permission = "admin:user:read";
// @ts-expect-error 第一段不是已知角色
const badRole: Permission = "guest:user:read";
// @ts-expect-error 不是三段式
const badShape: Permission = "admin:user";

const fourSegments: Permission = "admin:a:b:c";

// 获取当前用户的所有权限
function canAccess(user: User, permission: Permission): boolean {
  return user.roles.some((role) => {
    return role.permissions.includes(permission);
  });
}
