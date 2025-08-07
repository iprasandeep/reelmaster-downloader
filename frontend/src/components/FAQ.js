import React, { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "Is Reelmaster free to use?",
      answer: "Yes, Reelmaster is completely free with no hidden charges. Download unlimited videos from all supported platforms without any restrictions or premium subscriptions."
    },
    {
      question: "Which platforms are currently supported?",
      answer: "We support Instagram, YouTube Shorts, Pinterest, TikTok, Facebook, and Twitter. More platforms are being added regularly."
    },
    {
      question: "Is it safe to use Reelmaster?",
      answer: "Absolutely! We don't store any of your data or videos. All processing happens securely and your privacy is our top priority."
    },
    {
      question: "What video qualities are available?",
      answer: "We support multiple quality options including HD (720p, 1080p), standard definition, and audio-only formats depending on the source platform."
    },
    {
      question: "Can I download private videos?",
      answer: "No, we only support public videos that are accessible to everyone. Private or restricted content cannot be downloaded for privacy and security reasons."
    },
    {
      question: "How fast are the downloads?",
      answer: "Downloads are typically instant or take just a few seconds depending on the video size and your internet connection. No waiting in queues!"
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqData.map((faq, index) => (
          <div 
            key={index}
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            onClick={() => toggleFAQ(index)}
            style={{ '--faq-index': index }}
          >
            <div className="faq-question">
              {faq.question}
            </div>
            <div className={`faq-answer ${activeIndex === index ? 'active' : ''}`}>
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;