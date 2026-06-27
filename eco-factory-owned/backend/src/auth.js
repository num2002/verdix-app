import jwt from "jsonwebtoken";
import { query } from "./db.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev-only-change-me";

export function signToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" },
  );
}

export function publicUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    email: user.email,
    fullName: user.full_name ?? user.fullName ?? "",
    role: user.role || "standard_user",
    organization: user.organization || "",
    phone: user.phone || "",
    position: user.position || "",
    extNumber: user.ext_number || "",
    fax: user.fax || "",
    mobile: user.mobile || "",
    education: user.education || "",
    isActive: user.is_active ?? true,
    isEmailVerified: user.is_email_verified ?? false,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
  };
}

export function isAdminRole(role) {
  return role === "admin" || role === "super_admin";
}

export function isAuditorRole(role) {
  return role === "auditor" || isAdminRole(role);
}

export function isStandardUserRole(role) {
  return role === "standard_user" || role === "factory";
}

export function hasRole(userRole, allowedRoles) {
  return allowedRoles.some((role) => {
    if (role === userRole) return true;
    if (role === "admin") return isAdminRole(userRole);
    if (role === "auditor") return isAuditorRole(userRole);
    if (role === "factory" || role === "standard_user") return isStandardUserRole(userRole);
    return false;
  });
}

export async function requireAuth(req, res, next) {
  try {
    const header = req.get("authorization") || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : "";
    if (!token) return res.status(401).json({ message: "กรุณาเข้าสู่ระบบก่อน" });

    const payload = jwt.verify(token, JWT_SECRET);
    const { rows } = await query("select * from users where id = $1 and is_active = true", [payload.sub]);
    if (!rows[0]) return res.status(401).json({ message: "บัญชีผู้ใช้ไม่ถูกต้อง" });

    req.user = rows[0];
    next();
  } catch {
    res.status(401).json({ message: "กรุณาเข้าสู่ระบบก่อน" });
  }
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !hasRole(req.user.role, roles)) {
      return res.status(403).json({ message: "ไม่มีสิทธิ์ใช้งานส่วนนี้" });
    }
    next();
  };
}
