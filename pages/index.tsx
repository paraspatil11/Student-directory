import { useState } from 'react'
import Head from 'next/head'

interface Student {
  id: number;
  name: string;
  major: string;
  email: string;
  graduationYear: number;
}

export default function Home() {
  const [students, setStudents] = useState<Student[]>([
    { 
      id: 1, 
      name: 'Emily Rodriguez', 
      major: 'Computer Science', 
      email: 'emily.rodriguez@university.edu',
      graduationYear: 2025 
    },
    { 
      id: 2, 
      name: 'Michael Chen', 
      major: 'Data Science', 
      email: 'michael.chen@university.edu',
      graduationYear: 2024 
    },
    { 
      id: 3, 
      name: 'Sarah Johnson', 
      major: 'Software Engineering', 
      email: 'sarah.johnson@university.edu',
      graduationYear: 2026 
    }
  ])

  const [newStudent, setNewStudent] = useState({
    name: '',
    major: '',
    email: '',
    graduationYear: 2024
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewStudent(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const addStudent = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newStudent.name || !newStudent.major || !newStudent.email) {
      alert('Please fill in all fields')
      return
    }

    const studentToAdd = {
      ...newStudent,
      id: students.length + 1,
      graduationYear: Number(newStudent.graduationYear)
    }

    setStudents([...students, studentToAdd])
    
    // Reset form
    setNewStudent({
      name: '',
      major: '',
      email: '',
      graduationYear: 2024
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Student Directory</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Student Directory</h1>
        
        {/* Student List */}
        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Current Students</h2>
          <div className="space-y-4">
            {students.map(student => (
              <div 
                key={student.id} 
                className="border-b pb-3 last:border-b-0 hover:bg-gray-50 transition"
              >
                <h3 className="font-medium">{student.name}</h3>
                <p className="text-gray-600">
                  {student.major} | Graduation: {student.graduationYear}
                </p>
                <p className="text-sm text-blue-600">{student.email}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Add Student Form */}
        <section className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Add New Student</h2>
          <form onSubmit={addStudent} className="space-y-4">
            <div>
              <label className="block mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={newStudent.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter student name"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Major</label>
              <input
                type="text"
                name="major"
                value={newStudent.major}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter student major"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={newStudent.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter student email"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Graduation Year</label>
              <select
                name="graduationYear"
                value={newStudent.graduationYear}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              >
                {[2024, 2025, 2026, 2027].map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              Add Student
            </button>
          </form>
        </section>
      </main>
    </div>
  )
}