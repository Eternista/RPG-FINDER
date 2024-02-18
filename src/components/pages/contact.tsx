import React, { useState } from 'react';
import ContactImage from '../../assets/images/contact-image.png';

interface ValidationState {
  name: boolean;
  email: boolean;
  subject: boolean;
  description: boolean;
}

export default function Contact() {
  const [canSend, setCanSend] = useState(false);
  const [validation, setValidation] = useState<ValidationState>({
    name: false,
    email: false,
    subject: false,
    description: false,
  });

  const validateName = (name: string) => {
    setValidation((prevValidation) => ({
      ...prevValidation,
      name: name.length >= 4,
    }));
  };

  const validateEmail = (email: string) => {
    // Prosta walidacja adresu email (możesz rozszerzyć według potrzeb)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setValidation((prevValidation) => ({
      ...prevValidation,
      email: emailRegex.test(email),
    }));
  };

  const validateSubject = (subject: string) => {
    setValidation((prevValidation) => ({
      ...prevValidation,
      subject: subject.length >= 4,
    }));
  };

  const validateDescription = (description: string) => {
    setValidation((prevValidation) => ({
      ...prevValidation,
      description: description.length >= 10,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

  };

  return (
    <>
      <section className="l-sec l-sec--contact">
        <div className="container">
          <div className="row contact">
            <div className="col-lg-6 col-sm-12 contact-image">
              <h2>Any questions?</h2>
              <h3 className="mb-3">
                Maybe you don't know how to start your RPG Journey?
              </h3>
              <img
                src={ContactImage}
                alt="Photo of mechanics who's fixing machine"
              />
            </div>
            <div className="col-lg-6 col-sm-12 contact-form">
              <form action="https://formsubmit.io/send/rafal.ziolkowski1234@gmail.com">
                <label className="d-block mb-3" htmlFor="name">
                  <input
                    onChange={(e) => validateName(e.target.value)}
                    type="text"
                    className={`btn btn--input ${
                      validation.name ? 'complate' : ''
                    }`}
                    id="name"
                    placeholder="Name"
                    name="name"
                    required
                  />
                </label>
                <label className="d-block mb-3" htmlFor="email">
                  <input
                    onChange={(e) => validateEmail(e.target.value)}
                    type="email"
                    className={`btn btn--input ${
                      validation.email ? 'complate' : ''
                    }`}
                    name="email"
                    id="email"
                    placeholder="Email Address"
                    required
                  />
                </label>
                <label className="d-block mb-3" htmlFor="subject">
                  <input
                    onChange={(e) => validateSubject(e.target.value)}
                    type="text"
                    className={`btn btn--input ${
                      validation.subject ? 'complate' : ''
                    }`}
                    id="subject"
                    placeholder="Subject"
                    name="subject"
                    required
                  />
                </label>
                <label className="d-block mb-3" htmlFor="description">
                  <textarea
                    onChange={(e) => validateDescription(e.target.value)}
                    className={`btn btn--input textarea ${
                      validation.description ? 'complate' : ''
                    }`}
                    name="description"
                    id="description"
                    placeholder="What's going on adventurer?"
                    required
                  ></textarea>
                </label>
                {validation.name && validation.email && validation.subject && validation.description ? (
                  <button type="submit" className="btn btn--submit">
                    Send
                  </button>
                ) : (
                  <button type="submit" className="btn btn--submit" disabled>
                    Send
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
