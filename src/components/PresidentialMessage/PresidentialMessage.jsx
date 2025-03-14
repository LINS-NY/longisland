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
                    आदरणिय मेरा सम्मानित लँगआईल्यान्ड नेपाली समाजका सदस्य ज्युहरु,
                    <br /><br />
                    अमेरिकाको एक सम्मानित र पुरानो नेपाली सँस्थाः ‘लङ्ग आईल्यान्ड नेपाली समाज’ न्यूयोर्कको निर्वाचित अध्यक्षको पदिय 
                    हैसियतले यहाँहरू समक्ष कृतज्ञता ब्यक्त गर्दै विनम्रताको साथ म केहिकुरा सम्बोधन गर्दैछु।सर्बप्रथम प्रत्यक्ष चुनामा भागलिएर 
                    होस् वा महत्वपुर्ण छलफल र योजनामा सहयोग साथ दिनुहुने तपाईं हरेक प्रत्येक सदस्यप्रति हार्दिक आभार व्यक्त गर्न चाहन्छु ।
                    <br /><br />
                    हामी सबै मिलेर यो यात्रामा अघि बढ्दै गर्दा, मलाई तपाईहरुले दिनुभएको जिम्मेवारीलाई अत्यन्तै महत्वपूर्ण रुपमा लिई भविष्यमा 
                    हुने समाजका हरेक अवसरहरू प्रति ठूलो आशाबादि भएको छु। नेपाली संस्कृति, परम्परा, मूल्य र मान्यताहरुको जगेर्ना र 
                    विकास गर्नु हाम्रो सँस्थाको प्राथमिकतामा राख्दै नेपाली हित र भाईचाराको बिकास गर्ने प्रतिनिधित्व मुलक सँस्था हो। बिदेसमा 
                    रहेर पनि यी अमूल्य नेपाली साँस्कृतिक परम्पराहरुलाई जोगाउनु र उत्सव मनाउनु हाम्रो साझा कर्तव्य हो। सामाजिक दायित्वको 
                    रुपमा समाज अगाडि बढ्नका लागि आउने सबै अवसरहरू र चुनैतीलाई आत्मसात् गर्नु पनि उत्तिकै महत्त्वपूर्ण रुपमा मैले लिनेछु ।
                    <br /><br />
                    मेरो कार्यकालको प्रमुख लक्ष्यमध्ये एक ‘नेपाली समुदाय तथा सांस्कृतिक केन्द्र’ हाम्रो घर स्थापनाको पहल गर्नु हो। यो केन्द्र हाम्रो 
                    समुदायका सबै सदस्यहरू जमधटहुने हुने स्थल मात्र नभई, हाम्रो सांस्कृतिक धरोहर संरक्षण गर्ने, चाडपर्वहरू मनाउने, र 
                    आवश्यक पर्दा एक-अर्कालाई सहयोग पुर्याउने थलो बन्नेछ। यसले हाम्रो भविष्यका पुस्ताहरूलाई आफ्ना पुर्खा र पहिचानसँग 
                    जोडिराख्ने प्रेरणाको स्रोतका रूपमा काम गर्नेछ साथै अमेरिकामा हाम्रो नेपाली एकता र सामूहिकबलको प्रतीक पनि बन्नेछ।
                    <br /><br />
                    यो महान् लक्ष्यलाई साकार पार्न म हाम्रो कार्यसमिती र मेरो तर्फबाट तपाईंहरु सबैलाई एकताबद्द भई सहयोग, र 
                    समर्थनका लागि सामुहिक आह्वान गर्दछौ। हामीलाई प्रत्येक व्यक्तिहरुले आर्थिक सहयोग गरेर , समय दिएर होस 
                    वा अन्य कुनै न कुनै तबरको योगदान आवश्यकको जरुरत रहन्छ। एक्लो ब्यक्तीको प्रयासले मात्र यो महान योजना 
                    सफल नहुने र यस अभियानको सफलता तपाईहाम्रो सामूहिक प्रतिबद्धता र सहयोगमा निर्भर रहेको हुन्छ। तर यसको 
                    नेतृत्व लिने र सकेको आर्थिक, प्राबिधीक  तथा तपाईहरुले लगाएको काम पुरा गर्ने सारथी भने पक्कै बन्ने छु।
                    <br /><br />
                    म पुन दृढ विश्वास राख्छु कि हाम्रो विविधता नै हाम्रो बल हो। हामी एकअर्काको परस्पर सम्मान, माया र 
                    समझदारीका साथ एकजुट भएमात्र हामी जुनसकै चुनौती पनि पार गर्न सक्छौं र हाम्रा सामूहिक उद्देश्य हासिल 
                    गर्न सक्छौं। आउनुहोस्, हामी हाम्रो लँगआईल्यान्ड नेपाली समुदायभित्र मात्र नभई सबै समुदायहरूसँग मित्रता र 
                    सहकार्यका हातेमालो र सहकार्य गरौँ।
                    <br /><br />
                    आगामी दिनहरूमा तपाईंहरूसँग संवाद गर्ने, यहाँहरूको सुझाव सुन्ने, र यहाँहरुसंग हातेमालो गरी हाम्रो समुदायको 
                    उज्ज्वल भविष्य निर्माण गर्न म आतुर छु।
                    <br /><br />
                    हामी सबै मिलेर, हाम्रा साहस, दृढता, र अटल संकल्पकोसाथ एउटा असल समाज निर्माण गर्ने यात्राको अर्को अध्याय लेखौँ।
                    <br />
                    धन्यवाद तथा नमस्ते! 
                    <br /><br />
                    जय लिन्स!
                    <br /><strong>कुल प्र. गौली (राजन)<br /></strong>
                    अध्यक्ष (कार्यकाल 2024-2026)
                    <br /><strong>लङ्ग आईल्यान्ड नेपाली समाज, न्यूयोर्क</strong>
                    <br /><br />
                    <br /><br />

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