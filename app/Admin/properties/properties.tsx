import React from "react";
import ShieldCheckIcon from '@heroicons/react/solid/ShieldCheckIcon';
import BriefcaseIcon from '@heroicons/react/solid/BriefcaseIcon';
import ChartBarIcon from '@heroicons/react/solid/ChartBarIcon';


const Values = [
  {
    id: 1,
    icon: <ShieldCheckIcon className="h-12 w-12 text-blue-600 mx-auto" />,
    title: 'Integrity',
    description: 'We uphold the highest ethical standards, ensuring transparency and honesty in all our transactions. Our commitment to ethical practices builds trust and confidence with every client.'
  },
  {
    id: 2,
    icon: <BriefcaseIcon className="h-12 w-12 text-blue-600 mx-auto" />,
    title: 'Experience',
    description: 'With years of experience in the real estate industry, our team offers unparalleled market knowledge and expertise. We leverage our deep understanding to provide insightful guidance and achieve the best outcomes for our clients.'
  },
]

export default function Mission() {
  return (
    <div className="bg-gray-300 py-10">
      
      <div className="flex flex-col md:flex-row flex-wrap justify-center items-center mt-8">
        {Values.map((value) => (
          <div
            key={value.id}
            className="bg-gray-200 m-4 p-6 shadow-lg w-80 md:w-[350px] rounded-lg"
          >
            <div className="flex justify-center mt-4">
              {value.icon}
            </div>
            <h3 className="text-xl md:text-2xl pt-4 text-center font-semibold">{value.title}</h3>
            <p className="mt-3 text-xs md:text-sm text-gray-900 text-center">
              {value.description}
            </p>
          </div>
        ))}
      </div>
    

    </div>
  );
}
