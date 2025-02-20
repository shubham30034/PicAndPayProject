import React from 'react';
import { useNavigate } from 'react-router-dom';

const PromoPage = () => {

  const navigate = useNavigate()

  const goToMainPage = ()=>{
    navigate("/home")
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-500 via-indigo-500 to-purple-600 animate-gradient-x flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-6xl w-full transform transition-all hover:scale-[1.01] hover:shadow-3xl">
        <div className="flex flex-col md:flex-row">
          {/* Promotional Image */}
          <div className="md:w-1/2 relative group overflow-hidden">
            <img
              src="https://i.ytimg.com/vi/zCPI2LCfI7U/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCh2ZdivT9t9ppvRZyH0Cxj9cCD_Q"
              alt="Pic & Pay in action"
              className=" object-contain h-full w-full transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
          
          {/* Call-to-Action Section */}
          <div className="md:w-1/2 p-8 lg:p-12 flex flex-col justify-center space-y-6">
            <h1 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
              Pic & Pay
            </h1>
            
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
              Revolutionize your payment experience with our seamless, stylish solution. 
              Enjoy these benefits:
            </p>
            
            <ul className="space-y-3">
              {[
                '⚡ Instant transaction processing',
                '🔒 Military-grade security',
                '🎨 Customizable payment themes',
                '💸 Zero hidden fees'
              ].map((item) => (
                <li key={item} className="flex items-center text-gray-700">
                  <span className="mr-3 text-cyan-600">➔</span>
                  <span className="text-base lg:text-lg">{item}</span>
                </li>
              ))}
            </ul>
            
            <button 
             onClick={()=> goToMainPage()}
            className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-bold text-white rounded-xl group bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
              <span className="text-lg lg:text-xl">Start Using Pic & Pay</span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </button>
            
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Trusted by over 1 million users worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoPage;