import React from 'react';
import type { RestaurantInfo } from '../types';

interface RestaurantInfoFormProps {
  info: RestaurantInfo;
  setInfo: React.Dispatch<React.SetStateAction<RestaurantInfo>>;
}

export const RestaurantInfoForm: React.FC<RestaurantInfoFormProps> = ({ info, setInfo }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInfo(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Restaurant Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={info.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="tagline" className="block text-sm font-medium text-gray-700">
            Tagline / Slogan
          </label>
          <input
            type="text"
            id="tagline"
            name="tagline"
            value={info.tagline}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
};
