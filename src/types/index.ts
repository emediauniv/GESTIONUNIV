export interface User {
  id: string;
  email: string;
  role: 'admin' | 'teacher' | 'student' | 'staff';
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  createdAt: string;
}

export interface Student extends User {
  studentId: string;
  level: 'L1' | 'L2' | 'L3' | 'M1' | 'M2';
  semester: number;
  specialization: string;
  enrollmentDate: string;
  status: 'active' | 'suspended' | 'graduated';
  address?: string;
  emergencyContact?: string;
}

export interface Teacher extends User {
  teacherId: string;
  department: string;
  specialization: string;
  qualification: string;
  hireDate: string;
  salary?: number;
}

export interface Staff extends User {
  staffId: string;
  department: string;
  position: string;
  hireDate: string;
  salary?: number;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  description?: string;
  credits: number;
  level: 'L1' | 'L2' | 'L3' | 'M1' | 'M2';
  semester: number;
  teacherId: string;
  teacher?: Teacher;
  teachingUnits: TeachingUnit[];
  createdAt: string;
}

export interface TeachingUnit {
  id: string;
  courseId: string;
  name: string;
  code: string;
  credits: number;
  elements: ConstitutiveElement[];
}

export interface ConstitutiveElement {
  id: string;
  teachingUnitId: string;
  name: string;
  code: string;
  coefficient: number;
  hours: number;
}

export interface Payment {
  id: string;
  studentId: string;
  student?: Student;
  amount: number;
  type: 'tuition' | 'registration' | 'exam' | 'other';
  description: string;
  status: 'pending' | 'paid' | 'overdue';
  dueDate: string;
  paidDate?: string;
  proofUrl?: string;
  receiptUrl?: string;
  createdAt: string;
}

export interface Exam {
  id: string;
  courseId: string;
  course?: Course;
  type: 'midterm' | 'final' | 'makeup';
  date: string;
  duration: number;
  location: string;
  semester: number;
  academicYear: string;
  createdAt: string;
}

export interface Grade {
  id: string;
  studentId: string;
  student?: Student;
  examId: string;
  exam?: Exam;
  score: number;
  maxScore: number;
  grade: string;
  createdAt: string;
}

export interface Transcript {
  id: string;
  studentId: string;
  student?: Student;
  semester: number;
  academicYear: string;
  grades: Grade[];
  gpa: number;
  totalCredits: number;
  status: 'in_progress' | 'completed';
  createdAt: string;
}