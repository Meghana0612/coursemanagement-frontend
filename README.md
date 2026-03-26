# Course Management Frontend

A modern React + Vite frontend for the Course Management platform.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+
- Backend running on `http://localhost:8080`

### Install & Run
```bash
npm install
npm run dev
```

App runs at: `http://localhost:3000`

---

## 🗂 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx       — Top navigation with search
│   ├── CourseCard.jsx   — Course display card with enroll/edit/delete
│   ├── CourseForm.jsx   — Reusable create/edit form
│   └── Footer.jsx       — Site footer
├── pages/
│   ├── Home.jsx         — Landing page with hero + featured courses
│   ├── Courses.jsx      — Browse/search/filter all courses
│   ├── AddCourse.jsx    — Create new course
│   ├── EditCourse.jsx   — Edit existing course
│   └── EnrolledCourses.jsx — My learning dashboard
├── services/
│   └── courseService.js — Axios API client
├── routes/
│   └── AppRoutes.jsx    — React Router v6 routes
├── App.jsx
├── main.jsx
└── index.css            — Design system & global styles
```

---

## 🎨 Design System

- **Font**: Syne (headings) + DM Sans (body)
- **Theme**: Dark with purple accent (`#7c6aff`)
- **Colors**: Teal, amber, red, green semantic palette
- **Animations**: Fade-up stagger on page load

---

## 📡 API Endpoints Used

| Action           | Method | Endpoint                          |
|------------------|--------|-----------------------------------|
| List courses     | GET    | `/api/courses`                    |
| Get course       | GET    | `/api/courses/:id`                |
| Create course    | POST   | `/api/courses`                    |
| Update course    | PUT    | `/api/courses/:id`                |
| Delete course    | DELETE | `/api/courses/:id`                |
| Search           | GET    | `/api/courses/search?keyword=`    |
| By category      | GET    | `/api/courses/category/:category` |
| Enroll           | POST   | `/api/courses/:id/enroll`         |

---

## 🛠 Tech Stack

- **React 18** + **Vite 5**
- **React Router v6**
- **Axios** for HTTP
- **React Hot Toast** for notifications
- **React Icons** (Feather Icons)
"# course-backend" 
