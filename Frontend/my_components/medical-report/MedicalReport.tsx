import React, { useState } from 'react';
import cuteGirl from '@/public/images/cute-girl-image.png';
import Image from 'next/image';
// import { Message } from 'postcss';

// interface MessageProps {
//   text: string;
//   isPatient: boolean;
// }

// interface Message {
//     text: string;
//     sender: 'doctor' | 'user';
// }

// const Message: React.FC<MessageProps> = ({ text, isPatient }) => {
//   return (
//     <div className={`sn-message ${isPatient ? 'sn-patient' : 'sn-doctor'}`}>
//       {text}
//     </div>
//   );
// };

const MedicalReport: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState('Diagnosis');


    // const [messages, setMessages] = useState<Message[]>([
    //     { text: 'Good afternoon, Naren', sender: 'user' },
    //     { text: 'I wanted to know if you are allergic to paracetamol?', sender: 'user' },
    //     { text: 'It can be causing your rashes', sender: 'user' },
    //     { text: 'If yes, then replace it with Advil', sender: 'user' },
    // ]);

    // const [input, setInput] = useState<string>('');

    // const handleSendMessage = () => {
    //     if (input.trim() === '') return;

    //     const newMessage: Message = { text: input.trim(), sender: 'user' };
    //     setMessages([...messages, newMessage]);
    //     setInput('');
    // };



    const renderContent = () => {
        switch (selectedTab) {
          case 'Reports':
            return (
              <div className="sn-section">
                <h2 className="sn-title">Medical History</h2>
                <p className="sn-text">
                  22-year-old with a medical history that includes childhood chickenpox, an appendectomy at age 13, mild anemia managed with supplements, and mild asthma controlled with an inhaler. She has seasonal pollen allergies and a known allergy to penicillin. She has a family history of hypertension, diabetes, high cholesterol, osteoporosis, and heart disease. She leads an active lifestyle, enjoying yoga and jogging, and maintains a mostly vegetarian diet. Recently, she has managed mild anxiety related to academic pressures through mindfulness and counseling. Her immunizations are up-to-date, including the COVID-19 vaccine, and she experiences regular menstrual cycles with no significant gynecological concerns.
                </p>
              </div>
            );
          case 'Diagnosis':
            return (
              <>
                <div className="sn-section">
                  <h2 className="sn-title">Current Symptoms</h2>
                  <p className="sn-text">
                    The patient is experiencing a high body temperature ranging from 100-104°F (38-40°C), accompanied by chills and sweating. They report headaches, body aches, and joint pain, leading to a feeling of fatigue and weakness. Respiratory symptoms include a sore throat, cough, and congestion. The patient also has gastrointestinal complaints such as nausea, vomiting, and diarrhea. Additional symptoms include loss of appetite, a runny or stuffy nose, red eyes, and occasionally, a skin rash. These symptoms appeared suddenly and have persisted for several days.
                  </p>
                </div>
                <div className="sn-section">
                  <h2 className="sn-title">Assistive Diagnosis</h2>
                  <p className="sn-text">
                    Based on the symptoms observed, my diagnosis is viral fever. The patient is exhibiting a high body temperature between 100-104°F (38-40°C), along with chills, sweating, headaches, body aches, and joint pain, which are common signs of viral infections. Additionally, the presence of respiratory symptoms such as a sore throat, cough, and congestion, along with gastrointestinal issues like nausea, vomiting, and diarrhea, suggests a systemic viral infection. The sudden onset of these symptoms, combined with fatigue, loss of appetite, runny or stuffy nose, red eyes, and occasional skin rash, further supports this diagnosis. These symptoms are characteristic of viral fever, which is typically caused by common viruses such as influenza, adenovirus, or enterovirus.
                  </p>
                </div>
              </>
            );
          case 'Health Vitals':
            return (
              <div className="sn-section">
                <h2 className="sn-title">Treatment Plan</h2>
                <p className="sn-text">
                  The patient is advised to take antiviral medication and maintain proper hydration. Rest is essential, along with taking over-the-counter antipyretics like acetaminophen to manage the fever. The patient should monitor symptoms closely and return for a follow-up if the condition does not improve.
                </p>
              </div>
            );
          default:
            return null;
        }
      };


  return (
    <div className="sn-ChatInterfaceDoc-container flex flex-col bg-white text-black ">
        <div className='sn-chat-doc-header' >
            <h3 className="sn-ChatInterfaceDoc-header font-bold text-center pb-4 ">Ms. Khushi Shah</h3>
        </div>
        <div className='flex' >
            <div className="sn-patient-info">
                <Image
                src={cuteGirl}
                alt="Patient"
                className="sn-patient-image"
                />
                <div className="sn-patient-details">
                <p>Sex: Female</p>
                <p>Age: 22</p>
                <p>Condition: Lupus</p>
                <p>Blood Group: O-</p>
                <span>📞</span>
                <span>💬</span>
                </div>
                {/* <div className="sn-patient-contact">
                
                </div> */}
            </div>
            {/* <div className="sn-ChatInterfaceDoc-content">
                <p className="sn-ChatInterfaceDoc-date">Today</p>
                <Message text="Good afternoon, Naren" isPatient={true} />
                <Message text="I wanted to know if you are allergic to paracetamol?" isPatient={true} />
                <Message text="It can be causing your rashes" isPatient={true} />
                <Message text="If yes, then replace it with Advil" isPatient={true} />
                <button className="sn-remove-patient-button">Remove Patient</button>
            </div> */}
            {/* import React from 'react';
import './MedicalReport.css';  // Import the CSS file

const MedicalReport = () => {
  return ( */}

            {/* switch(selectedTab){ */}
            {/* <div className="sn-container bg-[#f0f0f0] p-4 mr-4 mb-4 w-[75%] ">
                <div className="sn-header flex center justify-center bg-[#d9d9d9] rounded-lg m-2 ">
                    <button className="sn-tab">Reports</button>
                    <button className="sn-tab">Diagnosis</button>
                    <button className="sn-tab">Health Vitals</button>
                </div>

                <div className="sn-section">
                    <h2 className="sn-title">Medical History</h2>
                    <p className="sn-text">
                    22-year-old with a medical history that includes childhood chickenpox, an appendectomy at age 13, mild anemia managed with supplements, and mild asthma controlled with an inhaler. She has seasonal pollen allergies and a known allergy to penicillin. She has a family history of hypertension, diabetes, high cholesterol, osteoporosis, and heart disease. She leads an active lifestyle, enjoying yoga and jogging, and maintains a mostly vegetarian diet. Recently, she has managed mild anxiety related to academic pressures through mindfulness and counseling. Her immunizations are up-to-date, including the COVID-19 vaccine, and she experiences regular menstrual cycles with no significant gynecological concerns.
                    </p>
                </div>

                <div className="sn-section">
                    <h2 className="sn-title">Current Symptoms</h2>
                    <p className="sn-text">
                    The patient is experiencing a high body temperature ranging from 100-104°F (38-40°C), accompanied by chills and sweating. They report headaches, body aches, and joint pain, leading to a feeling of fatigue and weakness. Respiratory symptoms include a sore throat, cough, and congestion. The patient also has gastrointestinal complaints such as nausea, vomiting, and diarrhea. Additional symptoms include loss of appetite, a runny or stuffy nose, red eyes, and occasionally, a skin rash. These symptoms appeared suddenly and have persisted for several days.
                    </p>
                </div>

                <div className="sn-section">
                    <h2 className="sn-title">Assistive Diagnosis</h2>
                    <p className="sn-text">
                    Based on the symptoms observed, my diagnosis is viral fever. The patient is exhibiting a high body temperature between 100-104°F (38-40°C), along with chills, sweating, headaches, body aches, and joint pain, which are common signs of viral infections. Additionally, the presence of respiratory symptoms such as a sore throat, cough, and congestion, along with gastrointestinal issues like nausea, vomiting, and diarrhea, suggests a systemic viral infection. The sudden onset of these symptoms, combined with fatigue, loss of appetite, runny or stuffy nose, red eyes, and occasional skin rash, further supports this diagnosis. These symptoms are characteristic of viral fever, which is typically caused by common viruses such as influenza, adenovirus, or enterovirus.
                    </p>
                </div>

                <div className="sn-section">
                    <h2 className="sn-title">Treatment Plan</h2>
                    <p className="sn-text">
                    The patient is advised to take antiviral medication and maintain proper hydration. Rest is essential, along with taking over-the-counter antipyretics like acetaminophen to manage the fever. The patient should monitor symptoms closely and return for a follow-up if the condition does not improve.
                    </p>
                </div>
            </div> */}
                {/* //   ); */}
                {/* }; */}

                {/* export default MedicalReport; */}


            <div className="sn-container bg-[#f0f0f0] p-4 mr-4 mb-4 w-[75%]">
                <div className="sn-header flex center justify-center bg-[#d9d9d9] rounded-lg m-2">
                    <button
                    className={`sn-tab ${selectedTab === 'Reports' ? 'sn-tab-active' : ''}`}
                    onClick={() => setSelectedTab('Reports')}
                    >
                    Reports
                    </button>
                    <button
                    className={`sn-tab ${selectedTab === 'Diagnosis' ? 'sn-tab-active' : ''}`}
                    onClick={() => setSelectedTab('Diagnosis')}
                    >
                    Diagnosis
                    </button>
                    <button
                    className={`sn-tab ${selectedTab === 'Health Vitals' ? 'sn-tab-active' : ''}`}
                    onClick={() => setSelectedTab('Health Vitals')}
                    >
                    Health Vitals
                    </button>
                </div>

                {renderContent()}
            </div>

        </div>
    </div>
  );
};

export default MedicalReport;
