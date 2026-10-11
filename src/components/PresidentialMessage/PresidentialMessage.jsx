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
                        src="/Members/SabitraSiwakoti.png"
                        width={200}
                        height={200}
                        alt="Sabitra Siwakoti"
                        className="rounded-full border-4 border-white dark:border-gray-800 shadow-md"
                    />
                </div>
            </div>

            {/* Message Content */}
            <div className="max-w-3xl text-center sm:text-left">
<p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
    आदरणीय संस्थापकज्यूहरू, पूर्व अध्यक्षज्यूहरू, सल्लाहकारज्यूहरू, आजीवन सदस्यज्यूहरू, साधारण सदस्यज्यूहरू, स्वयंसेवकज्यूहरू तथा नेपाली समुदायका सम्पूर्ण आदरणीय सदस्यज्यूहरू,
    <br /><br />
    नमस्कार!
    <br /><br />
    सन् २०२६–२०२८ कार्यकालका लागि न्युयोर्कस्थित लङ आइल्याण्ड नेपाली समाजको अध्यक्षका रूपमा सेवा गर्ने अवसर प्राप्त भएकोमा म आफूलाई अत्यन्त गौरवान्वित र कृतज्ञ महसुस गर्दछु। तपाईंहरूले मप्रति व्यक्त गर्नुभएको विश्वासलाई म व्यक्तिगत उपलब्धिका रूपमा नभई हाम्रो समुदायको सेवामा अझ बढी समर्पण र जिम्मेवारीका साथ लाग्ने अवसरका रूपमा लिएकी छु।
    <br /><br />
    सन् २०१० मा दूरदर्शी सोच भएका केही नेपालीहरूको पहलमा स्थापना भएको लङ आइल्याण्ड नेपाली समाज आज लङ आइल्याण्डभरि छरिएर रहेका नेपाली समुदायलाई जोड्ने एक महत्वपूर्ण संस्थाका रूपमा विकसित भएको छ। नेपालीहरूलाई एकताबद्ध गर्ने, आफ्ना परम्पराहरू मनाउने तथा सुखदुःखका समयमा एकअर्कालाई सहयोग गर्ने उद्देश्यबाट सुरु भएको यो प्रयास क्रमशः भाषा शिक्षा, सांस्कृतिक संरक्षण, स्वास्थ्य, खेलकुद तथा विभिन्न सामुदायिक सेवाका क्षेत्रमा क्रियाशील संस्थाका रूपमा अघि बढेको छ।
    <br /><br />
    यो यात्रा सधैँ सहज भने रहेन। हाम्रा संस्थापकहरूको दूरदृष्टि, विगतका नेतृत्वहरूको अथक प्रयास, स्वयंसेवकहरूको निःस्वार्थ योगदान तथा सदस्यहरूको निरन्तर सहयोगले नै हाम्रो समाजलाई आजको अवस्थामा पुर्‍याएको हो। यस गौरवपूर्ण यात्रामा योगदान पुर्‍याउनुहुने सम्पूर्ण व्यक्तित्वहरूप्रति म यस अवसरमा हार्दिक आभार तथा सम्मान व्यक्त गर्न चाहन्छु।
    <br /><br />
    दशैँ, तिहार, तीज, नेपाली नयाँ वर्षलगायत विभिन्न सांस्कृतिक पर्वहरूको उत्सवले आफ्नो मातृभूमिबाट हजारौँ माइल टाढा रहँदा पनि हाम्रो नेपाली पहिचानलाई जीवन्त राख्न महत्वपूर्ण भूमिका खेलेको छ। नेपाली भाषा कक्षाहरू, सामुदायिक स्वास्थ्य शिविरहरू, खेलकुद प्रतियोगिताहरू, महिलाको सहभागिता अभिवृद्धिसम्बन्धी कार्यक्रमहरू, घुम्ती राहदानी सेवा तथा विभिन्न सामाजिक गतिविधिजस्ता पहलहरूले हाम्रो समाजलाई मुख्यतः सांस्कृतिक पर्वहरू मनाउन केन्द्रित संस्थाबाट विकसित गर्दै हाम्रो बढ्दो समुदायका व्यावहारिक आवश्यकताहरूलाई समेत सम्बोधन गर्ने संस्थाका रूपमा अगाडि बढाएका छन्।
    <br /><br />
    अब हाम्रो जिम्मेवारी विगतका उपलब्धिहरूको संरक्षण र निरन्तरतालाई कायम राख्नुमा मात्र सीमित छैन। बदलिँदो सामुदायिक आवश्यकताअनुरूप अझ व्यवस्थित, समावेशी र उत्तरदायी संस्था बनाउन हाम्रो संस्थागत संरचनालाई थप सुदृढ गर्नु पनि उत्तिकै आवश्यक छ।
    <br /><br />
    मेरो विशेष प्राथमिकतामध्ये एक भनेको हाम्रा बालबालिका तथा युवा पुस्ताले अमेरिकी समाजका आत्मविश्वासी र सफल सदस्यका रूपमा आफ्नो भविष्य निर्माण गर्दै गर्दा नेपाली भाषा, संस्कृति र सम्पदासँगको अर्थपूर्ण सम्बन्ध पनि कायम राख्न सकून् भन्ने सुनिश्चित गर्न सहयोग गर्नु हो। यसका लागि हामी नेपाली भाषा शिक्षालाई थप सुदृढ बनाउने, नेतृत्व तथा स्वयंसेवी गतिविधिहरूमा युवाहरूको सहभागिता बढाउन प्रोत्साहित गर्ने र समुदायका सदस्यहरूले शैक्षिक, व्यावसायिक तथा सामाजिक क्षेत्रमा एकअर्कालाई सहयोग गर्न सक्ने अवसरहरू सिर्जना गर्ने दिशामा काम गर्नेछौँ।
    <br /><br />
    हाम्रो समाजको अर्को महत्वपूर्ण साझा आकाङ्क्षा स्थायी नेपाली सामुदायिक तथा सांस्कृतिक केन्द्रको स्थापना गर्नु हो। विगतका नेतृत्व तथा समुदायका सदस्यहरूले अघि बढाउनुभएका प्रयासहरूलाई आधार बनाउँदै आर्थिक पारदर्शिता, सामूहिक सहभागिता र व्यावहारिक योजनाका माध्यमबाट यस पहललाई निरन्तर अगाडि बढाउनुपर्छ। हाम्रो परिकल्पना यो केन्द्रलाई एउटा भौतिक भवनमा मात्र सीमित नराख्ने हो। हामी चाहन्छौँ, यो यस्तो साझा घर बनोस् जहाँ हाम्रा बालबालिकाले आफ्नो भाषा सिक्न सकून्, युवा पुस्ताले आफ्नो सांस्कृतिक सम्पदालाई नजिकबाट चिन्न सकून्, ज्येष्ठ नागरिकहरूले आत्मीय साथ र सहचर्य पाउन सकून् तथा सम्पूर्ण समुदायले अपनत्वको अनुभूतिसहित एकै ठाउँमा भेला हुन सकून्।
    <br /><br />
    त्यत्तिकै महत्वपूर्ण कुरा, म हाम्रो समाजलाई आवश्यक परेको बेला सहयोगका लागि भरोसा गर्न सकिने संस्थाका रूपमा विकास गर्न चाहन्छु। नवआगन्तुक नेपाली परिवारहरूले उचित मार्गदर्शन पाउन सक्ने, महिला, ज्येष्ठ नागरिक तथा युवाहरूले अर्थपूर्ण रूपमा सहभागी हुने अवसर पाउने र हरेक पृष्ठभूमिबाट आएका नेपालीहरूले समान रूपमा स्वागत, सम्मान र महत्व पाएको अनुभूति गर्ने संस्था निर्माण गर्नु हाम्रो साझा लक्ष्य हुनुपर्छ।
    <br /><br />
    हाम्रो समाजको सफलता अध्यक्ष वा कार्यसमितिको प्रयासले मात्र सम्भव हुँदैन। यो संस्था हामी सबैको हो र यसको भविष्यप्रतिको जिम्मेवारी पनि हामी सबैको साझा जिम्मेवारी हो। त्यसैले म यहाँहरू सबैका विचार, रचनात्मक सुझाव तथा आलोचना, अनुभव, समय, प्रतिभा र सक्रिय सहभागितालाई हार्दिक स्वागत गर्दछु। पारदर्शिता, आपसी सम्मान, सहकार्य र जवाफदेहिता हाम्रा आगामी कार्यदिशाका प्रमुख आधारका रूपमा रहनेछन्।
    <br /><br />
    हामी नेपालका विभिन्न भूभागबाट आएका छौँ र विविध भाषा, जातजाति, संस्कृति तथा परम्पराहरूको प्रतिनिधित्व गर्दछौँ। यो विविधता हाम्रो सामूहिक शक्तिको सबैभन्दा महत्वपूर्ण आधारहरूमध्ये एक हो। हाम्रा दृष्टिकोण र पृष्ठभूमिमा भिन्नता हुँदाहुँदै पनि साझा हितका लागि एकजुट हुन सक्ने हाम्रो क्षमताले नै हाम्रो समाजको सफलतालाई सबैभन्दा अर्थपूर्ण रूपमा प्रतिबिम्बित गर्नेछ।
    <br /><br />
    यो जिम्मेवारी सम्हाल्दै गर्दा मेरो हार्दिक आशा छ—हामीभन्दा अघि यस संस्थाको जग बसाल्नुहुने अग्रजहरूले स्थापित गर्नुभएको आधारलाई अझ मजबुत बनाउँदै, हाम्रो सामूहिक प्रयासबाट यसलाई थप सुदृढ गर्नेछौँ र भावी पुस्ताका लागि अर्थपूर्ण तथा दीर्घकालीन महत्व राख्ने विरासत छोडेर जानेछौँ।
    <br /><br />
    आउनुहोस्, विगतका उपलब्धिहरूप्रति गर्व गरौँ, वर्तमानका जिम्मेवारीहरूलाई आत्मसात् गरौँ र भोलिका सम्भावनाहरूलाई वास्तविकतामा रूपान्तरण गर्न मिलेर अघि बढौँ।
    <br /><br />
    यहाँहरूबाट आगामी दिनहरूमा पनि निरन्तर विश्वास, हौसला, सहकार्य र सहयोग प्राप्त हुने अपेक्षा गर्दछु।
    <br /><br />
    धन्यवाद।
    <br /><br />
    नमस्कार!
    <br /><br />
    <strong>श्रीमती सबित्रा सिवाकोटी</strong>
    <br />अध्यक्ष (कार्यकाल २०२६–२०२८)
    <br /><strong>लङ आइल्याण्ड नेपाली समाज</strong>
    <br /><strong>न्युयोर्क</strong>
    <br /><br /><br /><br />

    Dear Founders, Former Presidents, Advisors, Life Members, General Members, Volunteers, and Members of the Nepali Community,
    <br /><br />
    Namaste!
    <br /><br />
    I am deeply honored and grateful for the opportunity to serve as President of the Long Island Nepalese Society, New York, for the 2026–2028 term. I regard the trust you have placed in me not as a personal achievement, but as an opportunity to serve our community with greater dedication and responsibility.
    <br /><br />
    Since its establishment in 2010 through the initiative of a small group of visionary Nepalis, the Long Island Nepalese Society has grown into an important organization connecting the Nepali community across Long Island. What began as an effort to bring people together, celebrate our traditions, and support one another in times of joy and difficulty has gradually evolved into an institution engaged in cultural preservation, language education, health, sports, and various community services.
    <br /><br />
    This journey has not always been easy. The vision of our founders, the tireless efforts of past leadership, the selfless contributions of volunteers, and the continued support of our members have brought our society to where it stands today. I take this opportunity to express my sincere appreciation and respect for everyone who has contributed to this remarkable journey.
    <br /><br />
    Our celebrations of Dashain, Tihar, Teej, Nepali New Year, and other cultural festivals have helped keep our Nepali identity alive, even thousands of miles from our homeland. Initiatives such as Nepali language classes, community health camps, sports tournaments, women's participation programs, mobile passport services, and various social activities have gradually transformed our society from an organization primarily focused on cultural celebrations into one that also addresses the practical needs of our growing community.
    <br /><br />
    Our responsibility now is not only to preserve and continue these achievements, but also to strengthen our institution so that it becomes more organized, inclusive, and responsive to the changing needs of our community.
    <br /><br />
    One of my particular priorities is to help our children and younger generations maintain a meaningful connection with the Nepali language, culture, and heritage while growing into confident and successful members of American society. We will work toward strengthening Nepali language education, encouraging greater youth participation in leadership and volunteer activities, and creating opportunities for our community members to support one another in their educational, professional, and social endeavors.
    <br /><br />
    Another important shared aspiration of our society is the establishment of a permanent Nepali Community and Cultural Center. Building upon the efforts already undertaken by previous leadership and community members, we must continue moving this initiative forward through financial transparency, collective participation, and practical planning. Our vision is for this center to become much more than a physical building. We hope it will serve as a shared home where our children can learn their language, younger generations can discover their cultural heritage, our elders can find companionship, and the entire community can come together with a sense of belonging.
    <br /><br />
    Equally important, I hope to help develop our society into an organization that people can turn to when they need support, where newly arrived Nepali families can find guidance, where women, senior citizens, and young people have meaningful opportunities to participate, and where Nepalis from every background feel equally welcomed and valued.
    <br /><br />
    The success of our society cannot depend on the efforts of its president or executive committee alone. This organization belongs to all of us, and its future is our shared responsibility. I therefore warmly welcome your ideas, constructive criticism, experiences, time, talents, and active participation. Transparency, mutual respect, collaboration, and accountability will remain central to how we move forward.
    <br /><br />
    We come from different regions of Nepal and represent diverse languages, ethnicities, cultures, and traditions. This diversity is one of our greatest collective strengths. Our ability to come together for the common good, despite differences in our perspectives and backgrounds, will be among the most meaningful measures of our society's success.
    <br /><br />
    As I begin this responsibility, my sincere hope is that we can build upon the foundation established by those who came before us, strengthen it through our collective efforts, and leave something meaningful and lasting for the generations that follow.
    <br /><br />
    Let us take pride in our past achievements, embrace the responsibilities of the present, and work together to turn the possibilities of tomorrow into reality.
    <br /><br />
    I look forward to your continued trust, encouragement, cooperation, and support.
    <br /><br />
    Thank you.
    <br /><br />
    Namaste!
    <br /><br />
    <strong>Mrs. Sabitra Siwakoti</strong>
    <br />President (Term 2026–2028)
    <br /><strong>Long Island Nepalese Society</strong>
    <br /><strong>New York</strong>
</p>
            </div>
        </section>
    );
};

export default PresidentialMessage;