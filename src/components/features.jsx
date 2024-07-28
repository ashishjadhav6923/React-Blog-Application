import React from "react";

const Features = () => {
  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="max-w-screen-md mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
          Discover Our Key Features
          </h2>
          <p className="text-gray-500 sm:text-xl">
          "Explore the powerful features that make our platform the perfect place for both writers and readers. From an intuitive writing editor to personalized content recommendations, we’ve designed every aspect to enhance your blogging experience. Dive in and see what makes us stand out!"
          </p>
        </div>
        <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
          <div>
            <h3 className="mb-2 text-xl font-bold">User-Friendly Editor</h3>
            <p className="text-gray-500">
              "Create and Publish with Ease" Our intuitive editor makes it
              simple to write, format, and publish your blogs. Whether you’re a
              beginner or an experienced writer, you’ll find all the tools you
              need to express your ideas creatively.
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-xl font-bold">Diverse Categories</h3>
            <p className="text-gray-500">
              "Discover Content Across Various Interests" Explore a wide range
              of categories including Technology, Lifestyle, Travel, Food, and
              more. Find the topics that interest you the most and dive into a
              world of diverse and engaging content.
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-xl font-bold">Community Interaction</h3>
            <p className="text-gray-500">
            "Connect with Like-Minded Readers and Writers"
            Engage with a vibrant community of readers and writers. Comment on posts, share your thoughts, and connect with others who share your passions.
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-xl font-bold">Personalized Recommendations</h3>
            <p className="text-gray-500">
            "Get Content Tailored Just for You"
            Receive personalized blog recommendations based on your reading habits and interests. Never miss out on content that you’ll love.
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-xl font-bold">Author Profiles</h3>
            <p className="text-gray-500">
            "Showcase Your Writing Journey"
            Create a detailed author profile to showcase your writing journey. Share your bio, link to your social media, and display all your published works in one place.
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-xl font-bold">Mobile-Friendly Design</h3>
            <p className="text-gray-500">
            "Read and Write on the Go"
            Our website is optimized for all devices, so you can enjoy reading and writing blogs whether you’re on your desktop, tablet, or smartphone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
