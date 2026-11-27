// Password admin disimpan di environment variable ADMIN_PASSWORD (Vercel → Settings → Environment Variables).
export function isAdmin(password) {
  const expected = process.env.ADMIN_PASSWORD;
  return Boolean(expected) && password === expected;
}
