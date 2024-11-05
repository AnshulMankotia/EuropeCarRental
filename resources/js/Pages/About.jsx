import Guest from '@/Layouts/GuestLayout';
import React from 'react'

const About = () => {
  return (
    <div className="bg-white mb-spacing mt-spacing">
    <div className="container max-w-screen-xl mx-auto h-full">
      {/* About Us Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-red">About Us</h1>
        <p className="text-lg mb-6 text-mediumGray">From luxury sedans to budget-friendly compacts, we have got something for every journey</p>
      </div>

      {/* Lorem Ipsum Section */}
      <div className=" mx-auto mb-12">
        <p className="text-gray-600 mb-4">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
        <p className="text-gray-600">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        </p>
      </div>

      {/* Renewed Group Executive Committee Team Section */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-6 text-red">Renewed Group Executive Committee team</h2>
      </div>

      {/* Image Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <img
          src="/images/about-us-image-1.jpeg"
          alt="Executive Team 1"
          className="rounded-lg shadow-lg"
        />
        <img
          src="/images/about-us-image-2.jpeg"
          alt="Executive Team 2"
          className="rounded-lg shadow-lg"
        />
      </div>

      {/* Description Section */}
      <div className=" text-gray-600 mb-8">
        <p>Qualified career specialist with over 20 years of experience.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      {/* Insurance Details Section */}
      <div className=" mx-auto">
        <ul className="list-disc text-left text-gray-600 pl-6">
          <li className="mb-2">
            <strong>Term Life Insurance:</strong> Provides coverage for a specific period, typically 10, 20, or 30 years. Its generally more affordable and straightforward, making it ideal for temporary needs like covering a mortgage or providing for children until they become financially independent.
          </li>
          <li>
            <strong>Term Life Insurance:</strong> Provides coverage for a specific period, typically 10, 20, or 30 years. Its generally more affordable and straightforward, making it ideal for temporary needs like covering a mortgage or providing for children until they become financially independent.
          </li>
        </ul>
      </div>
    </div>
  </div>
  )
}

export default About;
About.layout = page => <Guest title="Home" children={page}/>