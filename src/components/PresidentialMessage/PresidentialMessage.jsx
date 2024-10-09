"use client";
import * as React from "react";
import Image from "next/image";
import "./styles.css"; // Import the CSS for the animation

const PresidentialMessage = () => {
  return (
    <section class="flex justify-center m-4 sm:w-4/5 mx-auto">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-4xl">
        <div class="text-center mb-8">
          <h1 class="font-bold text-4xl text-blue-900 dark:text-white">
            Presidential Message
          </h1>
        </div>
        <div class="flex flex-col items-center mb-8">
          <div class="animate-border-pulse rounded-full p-2">
            {" "}
            {/* Wrapper for the animated border */}
            <Image
              src="/Members/RajanGouli.png"
              width={200}
              height={200}
              alt="Rajan Gauli"
              class="rounded-full border-4 border-blue-500 shadow-lg"
            />
          </div>
        </div>
        <div class="text-left text-gray-700 dark:text-gray-300">
          <p class="text-lg leading-relaxed mb-6">
            Dear Valuable and Respected Members of the Long-island Nepalese
            Society New York. It is with immense gratitude and humility that I
            address you as the elected President of our Nepali community ‘Long
            ISland Nepalese Society’ here in New York. First and foremost, I
            extend my heartfelt appreciation to each and every one of you who
            participated in the democratic process, whether through casting your
            vote or contributing to the vibrant discussions that shape our
            community.
          </p>

          <p class="text-lg leading-relaxed mb-6">
            As we embark on this journey together, I am filled with a deep sense
            of responsibility and optimism for what we can achieve collectively.
            Our community represents the rich variety of Nepali culture,
            tradition, and values, and it is our shared duty to preserve and
            celebrate these treasures while also embracing the opportunities
            that lie ahead.
          </p>

          <p class="text-lg leading-relaxed mb-6">
            One of the primary goals during my tenure is to initiate the
            establishment of a ‘Nepali Community and Cultural Center’. This
            center will serve as a place for us to come together, share our
            heritage, celebrate festivals, and provide support for each other in
            times of need. It will be a beacon for our future generations to
            stay connected with their roots and a symbol of our unity and
            strength here in the USA.
          </p>

          <p class="text-lg leading-relaxed mb-6">
            To bring this vision to life, I am calling on all of you for
            collaboration, unity, and support. Whether through financial
            contributions, volunteering your time, or sharing your expertise, we
            need every hand on deck to make this dream a reality. The success of
            this endeavor depends on our collective commitment and dedication.
          </p>

          <p class="text-lg leading-relaxed mb-6">
            I firmly believe that our diversity is our strength, and by coming
            together with respect, compassion, and understanding, we can
            overcome any challenge and achieve our collective aspirations. Let
            us build bridges of friendship and cooperation, not only within our
            Nepali community but also with our fellow citizens and neighbors
            from all walks of life.
          </p>

          <p class="text-lg leading-relaxed mb-6">
            In the days and months ahead, I look forward to engaging with each
            of you, listening to your ideas, and working hand in hand to build a
            brighter future for our community and generations to come.
          </p>

          <p class="text-lg leading-relaxed mb-6">
            Together, let us write the next chapter of our journey with courage,
            resilience, and unwavering determination.
          </p>

          <p class="text-lg leading-relaxed">
            Thank You and Namaste,
            <br />
            <br />
            Sincerely,
            <br />
            <strong>Kul P Gouli (Rajan)</strong>
            <br />
            President (Term 2024-2026)
            <br />
            Long Island Nepalese Society New York
          </p>
        </div>
      </div>
    </section>
  );
};

export default PresidentialMessage;
