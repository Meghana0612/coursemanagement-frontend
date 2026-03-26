import { Routes, Route, Navigate } from 'react-router-dom'
import Home            from '../pages/Home'
import Courses         from '../pages/Courses'
import AddCourse       from '../pages/AddCourse'
import EditCourse      from '../pages/EditCourse'
import EnrolledCourses from '../pages/EnrolledCourses'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/"                index element={<Home />} />
      <Route path="/courses"         element={<Courses />} />
      <Route path="/courses/add"     element={<AddCourse />} />
      <Route path="/courses/edit/:id" element={<EditCourse />} />
      <Route path="/enrolled"        element={<EnrolledCourses />} />
      <Route path="*"                element={<Navigate to="/" replace />} />
    </Routes>
  )
}
