const MembershipFormPage = () => {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-600 to-blue-500 text-white p-6">
        <div className="max-w-3xl text-center mb-10">
          <h1 className="text-5xl font-bold mb-6 text-shadow-lg">
            Become a LINS Member
          </h1>
          <p className="text-xl opacity-90 leading-relaxed">
            Thank You for Your Interest in Joining Long Island Nepalese Society!
          </p>
          <p className="text-xl opacity-90 leading-relaxed">
            Please fill out the form below to become a Member.
          </p>
        </div>
        
        {/* Google Form Embed */}
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLScBvtALULxVns8zdsn0ng6_x1vj_nKorp1ua37U0hud8NgJAg/viewform?embedded=true"
          width="100%"
          height="2398"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          className="w-full max-w-4xl rounded-lg shadow-2xl bg-white"
        >
          Loading…
        </iframe>
      </div>
    );
  };
  
  export default MembershipFormPage;