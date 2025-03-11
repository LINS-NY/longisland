'use client';
import * as React from 'react';
import Image from 'next/image';

const PresidentialMessage = () => {
    return (
        <section className="flex flex-col items-center justify-center p-6 sm:p-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-lg border border-white/10 dark:border-gray-700/10">
            {/* Heading */}
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400 mb-8">
                Presidential Message
            </h1>

            {/* Profile Image */}
            <div className="flex justify-center mb-8">
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                    <Image
                        src="/Members/RajanGouli.png"
                        width={200}
                        height={200}
                        alt="Rajan Gouli"
                        className="rounded-full border-4 border-white dark:border-gray-800 shadow-md"
                    />
                </div>
            </div>

            {/* Message Content */}
            <div className="max-w-3xl text-center sm:text-left">
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                    Dear Valuable and Respected Members of the Long-island Nepalese Society New York,
                    <br /><br />
                    It is with immense gratitude and humility that I address you as the elected President of
                    our Nepali community, the <strong>Long Island Nepalese Society</strong>, here in New York. First and foremost,
                    I extend my heartfelt appreciation to each and every one of you who participated in the democratic process,
                    whether through casting your vote or contributing to the vibrant discussions that shape our community.
                    <br /><br />
                    As we embark on this journey together, I am filled with a deep sense of responsibility and optimism for
                    what we can achieve collectively. Our community represents the rich variety of Nepali culture, tradition,
                    and values, and it is our shared duty to preserve and celebrate these treasures while also embracing the
                    opportunities that lie ahead.
                    <br /><br />
                    One of the primary goals during my tenure is to initiate the establishment of a <strong>Nepali Community and
                    Cultural Center</strong>. This center will serve as a place for us to come together, share our heritage, celebrate
                    festivals, and provide support for each other in times of need. It will be a beacon for our future generations
                    to stay connected with their roots and a symbol of our unity and strength here in the USA.
                    <br /><br />
                    To bring this vision to life, I am calling on all of you for collaboration, unity, and support. Whether
                    through financial contributions, volunteering your time, or sharing your expertise, we need every hand on
                    deck to make this dream a reality. The success of this endeavor depends on our collective commitment and
                    dedication.
                    <br /><br />
                    I firmly believe that our diversity is our strength, and by coming together with respect, compassion,
                    and understanding, we can overcome any challenge and achieve our collective aspirations. Let us build
                    bridges of friendship and cooperation, not only within our Nepali community but also with our fellow
                    citizens and neighbors from all walks of life.
                    <br /><br />
                    In the days and months ahead, I look forward to engaging with each of you, listening to your ideas,
                    and working hand in hand to build a brighter future for our community and generations to come.
                    <br /><br />
                    Together, let us write the next chapter of our journey with courage, resilience, and unwavering determination.
                    <br /><br />
                    Thank You and Namaste,
                    <br /><strong>Kul P Gouli (Rajan)</strong>
                    <br />President
                    <br />(Term 2024-2026)
                    <br /><strong>Long Island Nepalese Society New York</strong>
                </p>
            </div>
        </section>
    );
};

export default PresidentialMessage;