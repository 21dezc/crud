# CRUD + Authentication (Next.js)

โปรเจกต์ระบบจัดการข้อมูลนักเรียน/บล็อก พร้อมระบบเข้าสู่ระบบด้วย **Email & Password** และ **GitHub** แบ่งสิทธิ์ผู้ใช้ตาม Role (ADMIN / STAFF / USER)

## ฟีเจอร์

- สมัครสมาชิก (Sign up) และเข้าสู่ระบบด้วย Email / Password (เข้ารหัสรหัสผ่านด้วย bcrypt)
- เข้าสู่ระบบด้วย GitHub (OAuth)
- แบ่งสิทธิ์ตาม Role เช่น หน้า `/admin` เข้าได้เฉพาะ ADMIN
- หน้า `/unauthorized` สำหรับคนที่ไม่มีสิทธิ์
- จัดการข้อมูลนักเรียน (CRUD) และหน้า Blogs

## เทคโนโลยีที่ใช้

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Prisma + SQLite
- Auth.js (next-auth v5 beta) + bcryptjs

## วิธีติดตั้ง

**1. โคลนโปรเจกต์**

```bash
git clone https://github.com/21dezc/crud.git
cd crud
```

**2. ติดตั้ง package**

```bash
npm install
```

**3. สร้างไฟล์ `.env`** ที่โฟลเดอร์หลักของโปรเจกต์ (ดูตัวอย่างใน `.env.example`)

```env
DATABASE_URL="file:./dev.db"
AUTH_SECRET="ใส่-secret-ของคุณ"
AUTH_GITHUB_ID="ใส่-client-id"
AUTH_GITHUB_SECRET="ใส่-client-secret"
```

- สร้าง `AUTH_SECRET` ได้ด้วยคำสั่ง `npx auth secret`
- `AUTH_GITHUB_ID` และ `AUTH_GITHUB_SECRET` ได้จากการสร้าง GitHub OAuth App (ดูหัวข้อถัดไป)

**4. สร้างฐานข้อมูล**

```bash
npx prisma migrate dev
npx prisma generate
```

**5. รันโปรเจกต์**

```bash
npm run dev
```

เปิดเบราว์เซอร์ไปที่ <http://localhost:3000>

## ตั้งค่า GitHub OAuth App

1. เข้า GitHub → **Settings** → **Developer settings** → **OAuth Apps** → **New OAuth App**
2. กรอกข้อมูล

   | ช่อง | ค่า |
   | --- | --- |
   | Application name | ตั้งชื่อเองได้ |
   | Homepage URL | `http://localhost:3000` |
   | Authorization callback URL | `http://localhost:3000/api/auth/callback/github` |

3. กด Register แล้วนำ **Client ID** และ **Client secret** ไปใส่ในไฟล์ `.env`

## วิธีใช้งาน

| หน้า | ลิงก์ | คำอธิบาย |
| --- | --- | --- |
| สมัครสมาชิก | `/signup` | สร้างบัญชีด้วย ชื่อ, Email, Password |
| เข้าสู่ระบบ | `/login` | Login ด้วย Email/Password หรือปุ่ม Sign in with GitHub |
| Login ด้วย GitHub | `/login-github` | หน้า login แบบ GitHub อย่างเดียว |
| Admin | `/admin` | เข้าได้เฉพาะ ADMIN ถ้าไม่ใช่จะถูกส่งไป `/unauthorized` |
| ไม่มีสิทธิ์ | `/unauthorized` | แจ้งว่าไม่มีสิทธิ์เข้าถึง |
| Blogs | `/blogs` | รายการบล็อก |

**วิธีทดสอบ**

1. ไปที่ `/signup` สมัครบัญชีใหม่
2. ไปที่ `/login` เข้าสู่ระบบ
3. ลองเข้า `/admin` ถ้าบัญชีเป็น USER จะถูกส่งไปหน้า `/unauthorized`

**วิธีเปลี่ยนบัญชีเป็น ADMIN**

```bash
npx prisma studio
```

เปิดตาราง `User` แล้วแก้คอลัมน์ `role` ของบัญชีที่ต้องการเป็น `ADMIN`

## โครงสร้างโปรเจกต์

```
app/
├── login/            หน้า login
├── login-github/     หน้า login ด้วย GitHub
├── signup/           หน้าสมัครสมาชิก + server action
├── admin/            หน้าเฉพาะ ADMIN
├── unauthorized/     หน้าไม่มีสิทธิ์
├── api/auth/[...nextauth]/route.ts
├── auth.ts           ตั้งค่า Auth.js
└── lib/prisma.ts     Prisma client
prisma/
└── schema.prisma     โครงสร้างฐานข้อมูล
```

## หมายเหตุ

- ไฟล์ `.env` และ `dev.db` ไม่ถูกอัพขึ้น GitHub (อยู่ใน `.gitignore`) ต้องสร้างเองในเครื่อง
