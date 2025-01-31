import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa"; // Import social media icons
import Image from 'next/image'; // Import Image component

export default function TopAgents() {
  const agents = [
    {
      id: 1,
      name: 'Pokera Chilikumtima',
      role: 'Main Agent',
      description: 'I am pleased to get you the best service.',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    },
    {
      id: 2,
      name: 'Malumbo Ponderani',
      role: 'Agent',
      description: 'I am pleased to get you the best service.',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    },
    // Add more agents as needed
  ];

  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-green-500 font-semibold tracking-wide uppercase">
            Get Connected with Top Agents
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Meet our top-performing agents
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Learn more about our team of expert, considerate, and proactive agents.
          </p>
        </div>

        {/* Responsive grid container */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative w-full h-56 mb-4 overflow-hidden rounded-lg">
                <Image
                  className="w-full h-full object-cover"
                  src={agent.imageUrl || '/default-image.jpg'}
                  alt={agent.name}
                  width={500} // Customize width based on your design
                  height={400} // Customize height based on your design
                />
              </div>
              <h3 className="text-lg font-medium text-gray-900">{agent.name}</h3>
              <p className="text-sm text-green-500">{agent.role}</p>
              <p className="mt-3 text-base text-gray-500">{agent.description}</p>
              <div className="flex justify-center mt-4 space-x-3">
                <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                  <FaFacebook size={20} />
                </a>
                <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors">
                  <FaTwitter size={20} />
                </a>
                <a href="#" className="text-gray-500 hover:text-blue-700 transition-colors">
                  <FaLinkedin size={20} />
                </a>
              </div>
            </div>
          ))}

          {/* Apply to be an Agent card */}
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-center items-center w-full h-56 bg-green-500 text-white font-bold rounded-lg">
              <p>Apply to be an Agent</p>
            </div>
            <div className="mt-6">
              <p className="text-base text-gray-500">
                Interested in joining our team? Apply now!
              </p>
              <a href="/Apply">
                <button className="mt-4 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors">
                  Apply Now
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
