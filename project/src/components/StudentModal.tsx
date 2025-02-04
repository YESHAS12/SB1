import React from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import { db } from '../lib/firebase';
import { addDoc, collection } from 'firebase/firestore';

interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function StudentModal({ isOpen, onClose, onSuccess }: StudentModalProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await addDoc(collection(db, 'students'), {
        ...data,
        createdAt: new Date().toISOString(),
      });
      reset();
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Add New Student</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                {...register('name', { required: 'Name is required' })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                type="text"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message?.toString()}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Roll Number</label>
              <input
                {...register('rollNumber', { required: 'Roll number is required' })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                type="text"
              />
              {errors.rollNumber && <p className="mt-1 text-sm text-red-600">{errors.rollNumber.message?.toString()}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Class</label>
              <select
                {...register('class', { required: 'Class is required' })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Class</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>Class {i + 1}</option>
                ))}
              </select>
              {errors.class && <p className="mt-1 text-sm text-red-600">{errors.class.message?.toString()}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Section</label>
              <select
                {...register('section', { required: 'Section is required' })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Section</option>
                {['A', 'B', 'C', 'D'].map((section) => (
                  <option key={section} value={section}>Section {section}</option>
                ))}
              </select>
              {errors.section && <p className="mt-1 text-sm text-red-600">{errors.section.message?.toString()}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                {...register('dateOfBirth', { required: 'Date of birth is required' })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                type="date"
              />
              {errors.dateOfBirth && <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message?.toString()}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                {...register('gender', { required: 'Gender is required' })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender.message?.toString()}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Blood Group</label>
              <select
                {...register('bloodGroup', { required: 'Blood group is required' })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Blood Group</option>
                {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((group) => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
              {errors.bloodGroup && <p className="mt-1 text-sm text-red-600">{errors.bloodGroup.message?.toString()}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Number</label>
              <input
                {...register('contactNumber', {
                  required: 'Contact number is required',
                  pattern: {
                    value: /^\d{10}$/,
                    message: 'Please enter a valid 10-digit number'
                  }
                })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                type="tel"
              />
              {errors.contactNumber && <p className="mt-1 text-sm text-red-600">{errors.contactNumber.message?.toString()}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                type="email"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message?.toString()}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Parent's Name</label>
              <input
                {...register('parentName', { required: "Parent's name is required" })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                type="text"
              />
              {errors.parentName && <p className="mt-1 text-sm text-red-600">{errors.parentName.message?.toString()}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <textarea
                {...register('address', { required: 'Address is required' })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                rows={3}
              />
              {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message?.toString()}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Emergency Contact</label>
              <input
                {...register('emergencyContact', {
                  required: 'Emergency contact is required',
                  pattern: {
                    value: /^\d{10}$/,
                    message: 'Please enter a valid 10-digit number'
                  }
                })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                type="tel"
              />
              {errors.emergencyContact && <p className="mt-1 text-sm text-red-600">{errors.emergencyContact.message?.toString()}</p>}
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Adding...
                </div>
              ) : (
                'Add Student'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}