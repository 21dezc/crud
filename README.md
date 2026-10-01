# Student CRUD + Streaming + Authentication (Next.js)

โปรเจกต์ระบบจัดการข้อมูลนักศึกษา (Student CRUD) ที่พัฒนาต่อยอดเป็น 3 ส่วน

1. **Next.js CRUD** จัดการข้อมูลนักศึกษา (เพิ่ม / อ่าน / แก้ไข / ลบ)
2. **Streaming** ตรวจสอบฟอร์มด้วย Zod, Loading / Suspense / Skeleton, not-found และ Error
3. **Authentication** เข้าสู่ระบบด้วย Email & Password และ GitHub พร้อมแบ่งสิทธิ์ตาม Role

## เทคโนโลยีที่ใช้

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Prisma 7 + SQLite (better-sqlite3 adapter)
- Zod
- Auth.js (next-auth v5 beta) + bcryptjs

## ฟีเจอร์

### 1) Student CRUD
- แสดงรายชื่อนักศึกษาทั้งหมดและจำนวนนักศึกษา
- เพิ่มนักศึกษาใหม่
- แก้ไขข้อมูลนักศึกษา
- ลบนักศึกษา (มีหน้าต่างยืนยันก่อนลบ)

### 2) Streaming
- ตรวจสอบข้อมูลฟอร์มด้วย **Zod** ก่อนบันทึกลงฐานข้อมูล แสดง error ใต้ช่องที่กรอกผิด
- หน้า Blogs แสดง **Loading, Suspense และ Skeleton** ระหว่างรอข้อมูลจาก API
- หน้า **not-found** (404) และหน้า **Error / Global Error**

### 3) Authentication
- สมัครสมาชิกและเข้าสู่ระบบด้วย Email / Password (เข้ารหัสรหัสผ่านด้วย bcrypt)
- เข้าสู่ระบบด้วย GitHub (OAuth)
- แบ่งสิทธิ์ตาม Role (ADMIN / STAFF / USER) เช่น `/admin` เข้าได้เฉพาะ ADMIN

## วิธีติดตั้ง

ต้องมี [Node.js](https://nodejs.org) (แนะนำเวอร์ชัน 20 ขึ้นไป) และ Git

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
- `AUTH_GITHUB_ID` และ `AUTH_GITHUB_SECRET` ได้จาก GitHub OAuth App (ดูหัวข้อ "ตั้งค่า GitHub OAuth App")
- ถ้าไม่ใช้ส่วน Login ด้วย GitHub ก็ยังรันส่วน CRUD ได้ แต่ต้องมี `DATABASE_URL`

**4. สร้างฐานข้อมูลและ Prisma Client**

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

### หน้าทั้งหมด

| ส่วน | หน้า | ลิงก์ | คำอธิบาย |
| --- | --- | --- | --- |
| CRUD | รายชื่อนักศึกษา | `/students` | ดูรายชื่อ มีปุ่มแก้ไขและลบในแต่ละแถว |
| CRUD | เพิ่มนักศึกษา | `/students/create` | กรอกรหัสนักศึกษา, ชื่อ, Email, สาขา, ชั้นปี |
| CRUD | แก้ไขนักศึกษา | `/students/[id]/edit` | แก้ไขข้อมูลตาม id |
| Streaming | Blogs | `/blogs` | รายการบทความ แสดง Skeleton ระหว่างโหลด |
| Streaming | รายละเอียดบทความ | `/blogs/[id]` | ถ้าไม่พบ id จะแสดงหน้า 404 |
| Auth | สมัครสมาชิก | `/signup` | สร้างบัญชีด้วย ชื่อ, Email, Password |
| Auth | เข้าสู่ระบบ | `/login` | Login ด้วย Email/Password หรือ GitHub |
| Auth | Login ด้วย GitHub | `/login-github` | หน้า login แบบ GitHub อย่างเดียว |
| Auth | Admin | `/admin` | เฉพาะ ADMIN ถ้าไม่ใช่จะถูกส่งไป `/unauthorized` |
| Auth | ไม่มีสิทธิ์ | `/unauthorized` | แจ้งว่าไม่มีสิทธิ์เข้าถึง |

### วิธีทดสอบ

**CRUD**
1. ไปที่ `/students` กดปุ่ม **เพิ่มนักศึกษา** แล้วกรอกข้อมูล กดบันทึก
2. กลับมาที่รายชื่อ กด **แก้ไข** เพื่อแก้ข้อมูล หรือ **ลบ** เพื่อลบ (จะมีหน้าต่างให้ยืนยัน)

**Streaming**
1. ไปที่ `/students/create` กดบันทึกโดยไม่กรอกอะไร จะเห็นข้อความ error จาก Zod
2. ไปที่ `/blogs` จะเห็น Skeleton ระหว่างรอข้อมูล แล้วจึงแสดงรายการบทความ
3. ไปที่ `/blogs/ไอดีที่ไม่มีอยู่จริง` จะเห็นหน้า 404 ของ Blogs

**Authentication**
1. ไปที่ `/signup` สมัครบัญชีใหม่ แล้วไปที่ `/login` เข้าสู่ระบบ
2. ลองเข้า `/admin` ถ้าบัญชีเป็น USER จะถูกส่งไปหน้า `/unauthorized`
3. ลองกดปุ่ม Sign in with GitHub

### วิธีเปลี่ยนบัญชีเป็น ADMIN

```bash
npx prisma studio
```

เปิดตาราง `User` แล้วแก้คอลัมน์ `role` ของบัญชีที่ต้องการเป็น `ADMIN`

## โครงสร้างโปรเจกต์

```
app/
├── students/              CRUD นักศึกษา
│   ├── page.tsx           รายชื่อนักศึกษา
│   ├── actions.ts         Server Action สำหรับลบ
│   ├── delete-button.tsx  ปุ่มลบ
│   ├── validation.ts      Zod schema
│   ├── create/            หน้าเพิ่ม + create-student-form.tsx
│   └── [id]/edit/         หน้าแก้ไข
├── blogs/                 รายการบทความ + loading / error / not-found
├── ui/                    blogs, my-fallback, my-skeleton
├── login/                 หน้า login
├── login-github/          หน้า login ด้วย GitHub
├── signup/                หน้าสมัครสมาชิก + server action
├── admin/                 หน้าเฉพาะ ADMIN
├── unauthorized/          หน้าไม่มีสิทธิ์
├── api/auth/[...nextauth]/route.ts
├── auth.ts                ตั้งค่า Auth.js
├── global-error.tsx       หน้า error ระดับทั้งแอป
└── lib/prisma.ts          Prisma client
prisma/
└── schema.prisma          โครงสร้างฐานข้อมูล (Student, User)
types/
└── next-auth.d.ts
```

## หมายเหตุ

- ไฟล์ `.env` และ `dev.db` ไม่ถูกอัพขึ้น GitHub (อยู่ใน `.gitignore`) ต้องสร้างเองในเครื่อง
- ฐานข้อมูลเริ่มต้นยังไม่มีข้อมูลนักศึกษา ให้เพิ่มเองผ่านหน้า `/students/create`
