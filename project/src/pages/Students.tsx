import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Eye, Edit, Trash2, Plus, Search } from 'lucide-react';
import { StudentModal } from '../components/StudentModal';

export function Students() {
  const [students, setStudents] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchStudents = async () => {
    try {
      setIsLoading(true);
      const studentsQuery = query(collection(db, 'students'), orderBy('name'));
      const querySnapshot = await getDocs(studentsQuery);
      const studentsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setStudents(studentsList);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteDoc(doc(db, 'students', id));
        await fetchStudents();
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Students List</h1>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.id.slice(0, 8)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.class}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.section}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.rollNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-3">
                        <button className="text-blue-600 hover:text-blue-800 transition-colors">
                          <Eye size={20} />
                        </button>
                        <button className="text-green-600 hover:text-green-800 transition-colors">
                          <Edit size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(student.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredStudents.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      No students found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <StudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchStudents}
      />
    </div>
  );
}