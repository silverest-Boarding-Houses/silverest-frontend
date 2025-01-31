
import { CheckCircleIcon, HomeIcon } from '@heroicons/react/solid';
import { UserGroupIcon } from '@heroicons/react/solid';

export default function ThreeSteps() {
  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-base text-green-500 font-semibold tracking-wide uppercase">
          We Follow 3 Steps
        </h2>
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          How We Make It Happen
        </p>
        <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
          This is how you can find a boarding house and secure a room using our website
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Step 1: Explore Boarding Houses */}
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <div className="flex flex-col items-center">
              <div className="bg-green-500 text-white p-6 rounded-full">
                <HomeIcon className="h-10 w-10" />
              </div>
              <h3 className="mt-5 text-lg leading-6 font-medium text-gray-900">
                Explore Boarding Houses
              </h3>
              <p className="mt-2 text-base text-gray-500">
                Select boarding houses that match your preferences from the explore button and houses section on the top menu
              </p>
            </div>
          </div>

          {/* Step 2: Meet Your Agent */}
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <div className="flex flex-col items-center">
              <div className="bg-green-500 text-white p-6 rounded-full">
                <UserGroupIcon className="h-10 w-10" /> {/* Added UserGroupIcon here */}
              </div>
              <h3 className="mt-5 text-lg leading-6 font-medium text-gray-900">
                Meet Your Agent
              </h3>
              <p className="mt-2 text-base text-gray-500">
                Select an agent to guide you through the booking process
              </p>
            </div>
          </div>

          {/* Step 3: Close The Deal */}
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <div className="flex flex-col items-center">
              <div className="bg-green-500 text-white p-6 rounded-full">
                <CheckCircleIcon className="h-10 w-10" />
              </div>
              <h3 className="mt-5 text-lg leading-6 font-medium text-gray-900">
                Close The Deal
              </h3>
              <p className="mt-2 text-base text-gray-500">
                Upon booking, you will receive a booking number which will be sent to your email and used for reference when physically visiting the boarding house
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
