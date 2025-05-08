'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

interface WorkData {
  title: string;
  description: string;
  location: string;
  completionDate: string;
  inaugurationDate: string;
  category: string;
  politicianName: string;
  constituency: string;
  photo: File | null;
}

export default function WorkUploadForm() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const bucketName = 'politician-work';

  const [workData, setWorkData] = useState<WorkData>({
    title: '',
    description: '',
    location: '',
    completionDate: '',
    inaugurationDate: '',
    category: 'infrastructure',
    politicianName: '',
    constituency: '',
    photo: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setWorkData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setWorkData((prev) => ({ ...prev, photo: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      if (!workData.photo) {
        alert('Please upload a photo of the work');
        setIsSubmitting(false);
        return;
      }

      const fileExt = workData.photo.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, workData.photo);

      if (uploadError) {
        console.error('Upload failed:', uploadError);
        alert(`Upload failed: ${uploadError.message}`);
        setIsSubmitting(false);
        return;
      }

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

      const photoUrl = publicUrlData.publicUrl;

      // Send to backend API with all fields
      const response = await fetch('/api/save-work', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: workData.title,
          description: workData.description,
          location: workData.location,
          completionDate: workData.completionDate,
          inaugurationDate: workData.inaugurationDate || null,
          category: workData.category,
          politicianName: workData.politicianName,
          constituency: workData.constituency,
          photoUrl, 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save work to database');
      }

      // Success!
      alert('Uploaded successfully and saved to database!');
      setSubmitSuccess(true);
      setWorkData({
        title: '',
        description: '',
        location: '',
        completionDate: '',
        inaugurationDate: '',
        category: 'infrastructure',
        politicianName: '',
        constituency: '',
        photo: null,
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong while submitting. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoHome = () => {

    router.push('/');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Upload Your Work</h1>

      {submitSuccess && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
          Work submitted successfully! Thank you for sharing your accomplishments.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Politician Name */}
        <div>
          <label htmlFor="politicianName" className="block text-sm font-medium text-gray-700">
            Politician Name*
          </label>
          <input
            type="text"
            id="politicianName"
            name="politicianName"
            value={workData.politicianName}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          />
        </div>

        {/* Constituency */}
        <div>
          <label htmlFor="constituency" className="block text-sm font-medium text-gray-700">
            Constituency*
          </label>
          <input
            type="text"
            id="constituency"
            name="constituency"
            value={workData.constituency}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          />
        </div>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Work Title*
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={workData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description*
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={workData.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          />
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location*
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={workData.location}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="completionDate" className="block text-sm font-medium text-gray-700">
              Completion Date*
            </label>
            <input
              type="date"
              id="completionDate"
              name="completionDate"
              value={workData.completionDate}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            />
          </div>

          <div>
            <label htmlFor="inaugurationDate" className="block text-sm font-medium text-gray-700">
              Inauguration Date
            </label>
            <input
              type="date"
              id="inaugurationDate"
              name="inaugurationDate"
              value={workData.inaugurationDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category*
          </label>
          <select
            id="category"
            name="category"
            value={workData.category}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          >
            <option value="infrastructure">Infrastructure</option>
            <option value="education">Education</option>
            <option value="healthcare">Healthcare</option>
            <option value="agriculture">Agriculture</option>
            <option value="welfare">Welfare Scheme</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Photo Upload */}
        <div>
          <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
            Upload Photo of the Work*
          </label>
          <input
            type="file"
            id="photo"
            name="photo"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            required
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {workData.photo && (
            <p className="mt-2 text-sm text-gray-600">Selected: {workData.photo.name}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-md shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 
              ${isSubmitting ? 'bg-gray-400' : 'bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600'}`}
          >
            {isSubmitting ? 'Submitting...' : 'Upload Work'}
          </button>
          
          <button
            type="button"
            onClick={handleGoHome}
            className="w-full mt-4 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Go to Home Page
          </button>
        </div>
      </form>
    </div>
  );
}
