import React, { useRef } from "react";
import styled from "styled-components";
import emailjs from "@emailjs/browser";
import EarthCanvas from "../canvas/Earth";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.background};
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 600;
  text-align: center;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 12px;
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const EarthWrapper = styled.div`
  width: 300px;
  height: 220px;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    width: 250px;
    height: 180px;
  }
`;

const Form = styled.form`
  width: 100%;
  max-width: 600px;
  background: rgba(17, 25, 40, 0.83);
  border: 1px solid rgba(255, 255, 255, 0.125);
  padding: 20px;
  border-radius: 12px;
  box-shadow: rgba(23, 92, 230, 0.1) 0px 4px 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
    max-width: 400px;
    }   
  @media (max-width: 500px){
    max-width: 300px;

    }
`;

const Input = styled.input`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  border-radius: 8px;
  padding: 10px;
  color: ${({ theme }) => theme.text_primary};
  font-size: 16px;
  outline: none;
  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const Textarea = styled.textarea`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  border-radius: 8px;
  padding: 10px;
  color: ${({ theme }) => theme.text_primary};
  font-size: 16px;
  outline: none;
  resize: none;
  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const Button = styled.input`
  background: hsla(271, 100%, 50%, 1);
  color: ${({ theme }) => theme.text_primary};
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
`;

const Contact = () => {
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_tox7kqs",
        "template_nv7k7mj",
        form.current,
        "SybVGsYS52j2TfLbi"
      )
      .then(
        () => alert("Message Sent!"),
        (error) => alert(error.text)
      );
  };

  return (
    <Container id="Contact">
      <Title>Contact</Title>
      <EarthWrapper>
        <EarthCanvas />
      </EarthWrapper>
      <Form ref={form} onSubmit={handleSubmit}>
        <Input type="email" placeholder="Your Email" name="from_email" required />
        <Input type="text" placeholder="Your Name" name="from_name" required />
        <Input type="text" placeholder="Subject" name="subject" required />
        <Textarea placeholder="Message" name="message" rows="4" required />
        <Button type="submit" value="Send" />
      </Form>
    </Container>
  );
};

export default Contact;
