"use client";
import * as React from "react";
import Image from "next/image";
import "./styles.css"; // Import the CSS for the animation

const GeneralSecretaryMessage = () => {
  return (
    <section class="flex justify-center m-4 sm:w-4/5 mx-auto">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-4xl">
        <div class="text-center mb-8">
          <h1 class="font-bold text-4xl text-blue-900 dark:text-white">
            महासचिवको अपील <br />
            Appeal from the Secretary-General
          </h1>
        </div>
        <div class="flex flex-col items-center mb-8">
          <div class="animate-border-pulse rounded-full p-2">
            {" "}
            {/* Wrapper for the animated border */}
            <Image
              src="/Members/RAJENDRAKUMARKARKI.png"
              width={200}
              height={200}
              alt="RAJENDRA KUMAR KARKI"
              class="rounded-full border-4 border-blue-500 shadow-lg"
            />
          </div>
        </div>
        <div class="text-left text-gray-700 dark:text-gray-300">
          <p class="text-lg leading-relaxed mb-6">
            मातृभूमीबाट पृथ्वीकै अर्को पाटोमा आफ्नो कर्मबाट फरक र सम्पन्न जीवनका
            निम्ति अहोरात्र मेहनत गर्नुहुने तपाईं सबै लङ्ग- आईल्यान्ड निवासी
            आमा- बुवा , दाजुभाई र दिदिबहिनीहरुमा म बर्तमान कार्यसमीति महासचिव
            राजेन्द्र कार्कीको मनै देखि हार्दिक नमस्कार ! लङ्ग आईल्यान्ड नेपाली
            समाजको स्थापनाको अघिल्लो बर्ष यानेकी 2009 देखि म यसै पावन भूमिमा
            मेरी श्रीमति, एक छोरा र छोरीको साथमा हिक्स्भिलमा बसोवास गर्दै आएको
            छु।
          </p>

          <p class="text-lg leading-relaxed mb-6">
            आफ्नो बसाई, जीवन भोगाई र यहाँको सामाजिक संरचना, बढ्दो संख्या र
            दैनिकी भित्र लङ्ग आईल्यान्ड नेपाली समाज कहाँ छ, के गर्दै छ र के
            गर्नु पर्छ भन्ने प्रश्नका उत्तरलाई आफ्नो ठम्याईका आधारमा तपाईंसँग
            केही शब्द लिएर जोडिने यो अवसरका निम्ति सिङ्गो कार्यसमिति प्रति
            हार्दिक आभार व्यक्त गर्दछु।
          </p>

          <p class="text-lg leading-relaxed mb-6">
            १४ बर्षे किशोरवयको लङ्ग आईल्यान्ड नेपाली समाजले हरेक बर्ष आफ्नो
            कार्यगत क्यालेन्डर बढाउँदै लगेको छ। हिजो केबल दशै्ं - तिहार, तीज,
            नयाँ बर्ष र पिकनिकमा सीमित लङ्ग आईल्यान्ड नेपाली समाज न्युयोर्कले आज
            साँस्कृतिक घेराभन्दा फराकिलो कदम समाजमा राख्दै छ।
          </p>

          <p class="text-lg leading-relaxed mb-6">
            आज हामीलाई स्थायी छानोको आवश्यकता छ, जहाँ सबै गतिविधिहरू नियमित
            रूपमा संचालन गर्न सकिन्छ। हामी नेपाली भाषा, नृत्य, खेलकूद,
            पास्पोर्ट, स्वास्थ्य क्याम्प र समुदायसँगको अन्तर्क्रिया जस्ता
            गतिविधिहरूलाई स्थायी केन्द्रबाट संचालन गर्ने प्रयत्न गर्दैछौं।
          </p>

          <p class="text-lg leading-relaxed mb-6">
            हामी दृढ संकल्पित छौं कि सामुदायिक भवनको निर्माणले सबै सामाजिक र
            साँस्कृतिक कार्यहरू एकै ठाउँमा सम्पन्न गर्न सघाउ पुगोस्। हामीलाई
            अवसर र चुनौती दुवै छन्, तर हामी तपाईं सबैको समर्थन लिएर यो कार्य
            सम्पन्न गर्न प्रतिबद्ध छौं।
          </p>

          <p class="text-lg leading-relaxed mb-6">
            जय लङ्गआईल्यान्ड नेपाली समाज!
            <br />
            राजेन्द्र कार्की
            <br />
            महासचिव
            <br />
            लङ्गआईल्यान्ड नेपाली समाज न्युयोर्क
          </p>

          <p class="text-lg leading-relaxed mb-6">
            Heartfelt greetings to all the mothers, fathers, brothers, and
            sisters residing in Long Island who work tirelessly day and night
            for a better and prosperous life far from our homeland. I am
            Rajendra Karki, the current General Secretary of the Long Island
            Nepali Society.
          </p>

          <p class="text-lg leading-relaxed mb-6">
            Since the year before the establishment of the Long Island Nepali
            Society, in 2009, I have been living in Hicksville with my wife,
            son, and daughter. I am grateful for this opportunity to connect
            with you and share some words about where the Long Island Nepali
            Society stands, what it is doing, and what needs to be done based on
            my understanding of our community's growth and daily life.
          </p>

          <p class="text-lg leading-relaxed mb-6">
            We all understand the importance of a community building. It is a
            place that supports life from birth to death, accommodating
            ceremonies like baby showers, naming ceremonies, rice feeding,
            coming-of-age, weddings, anniversaries, birthdays, memorials, death
            rites, and other cultural and auspicious events. It is our duty to
            contribute to this endeavor.
          </p>

          <p class="text-lg leading-relaxed mb-6">
            We are committed to building an infrastructure-rich community center
            that can host all our social activities in one place. We face both
            challenges and opportunities. We must overcome the invisible
            boundaries marked by elections and politics through sincere social
            work and timely results.
          </p>

          <p class="text-lg leading-relaxed mb-6">
            Long live the Long Island Nepali Society!
            <br />
            Rajendra Karki
            <br />
            General Secretary
            <br />
            Long Island Nepali Society New York.
          </p>
        </div>
      </div>
    </section>
  );
};

export default GeneralSecretaryMessage;
