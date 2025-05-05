import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import emailjs from '@emailjs/browser';
import { Snackbar, Alert } from '@mui/material';
import './Contact.css';

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
position: relative;
z-index: 1;
align-items: center;
@media (max-width: 960px) {
    padding: 0px;
}
`

const Wrapper = styled.div`
position: relative;
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: column;
width: 100%;
max-width: 1350px;
padding: 0px 0px 80px 0px;
gap: 12px;
@media (max-width: 960px) {
    flex-direction: column;
}
`

const Title = styled.div`
font-size: 42px;
text-align: center;
font-weight: 600;
margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
      margin-top: 12px;
      font-size: 32px;
  }
`;

const Desc = styled.div`
    font-size: 18px;
    text-align: center;
    max-width: 600px;
    color: ${({ theme }) => theme.text_secondary};
    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 16px;
    }
`;


const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.card};
  padding: 32px;
  border-radius: 16px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`

const ContactTitle = styled.div`
  font-size: 24px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`

const ContactButton = styled.input`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: hsla(271, 100%, 50%, 1);
  background: linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  background: -moz-linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  background: -webkit-linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
`



const Contact = () => {
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');
  const [formData, setFormData] = useState({
    from_email: '',
    from_name: '',
    phone: '',
    message: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const form = useRef();

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const indianPhoneRegex = /^(\+91[ \-]?)?[0]?(91)?[6789]\d{9}$/;

    if (!formData.from_email) {
      errors.from_email = 'Email is required';
    } else if (!emailRegex.test(formData.from_email)) {
      errors.from_email = 'Invalid email format';
    }

    if (!formData.from_name) {
      errors.from_name = 'Name is required';
    }

    if (!formData.phone) {
      errors.phone = 'Phone number is required';
    } else if (!indianPhoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      errors.phone = 'Invalid Indian phone number format';
    }

    if (!formData.message) {
      errors.message = 'Message is required';
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for phone numbers
    if (name === 'phone') {
      // Allow +91 prefix and format for Indian numbers
      const cleaned = value.replace(/[^\d+]/g, '');
      let formattedPhone = cleaned;
      
      // Format as +91 XXXXX XXXXX if it has enough digits
      if (cleaned.startsWith('+91') && cleaned.length > 3) {
        const number = cleaned.substring(3);
        if (number.length > 5) {
          formattedPhone = `+91 ${number.substring(0, 5)} ${number.substring(5, 10)}`;
        } else {
          formattedPhone = `+91 ${number}`;
        }
      } else if (!cleaned.startsWith('+') && cleaned.length > 5) {
        // Format as XXXXX XXXXX for 10-digit numbers without prefix
        formattedPhone = `${cleaned.substring(0, 5)} ${cleaned.substring(5, 10)}`;
      }
      
      setFormData({
        ...formData,
        [name]: formattedPhone.substring(0, 16) // Limit to a reasonable length
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Add phone number to form data for emailjs
    const templateParams = {
      from_name: formData.from_name,
      from_email: formData.from_email,
      phone: formData.phone,
      message: formData.message
    };

    emailjs.send('service_fdqy0ol', 'template_bw5it7f', templateParams, 'u2C2gywejcJEqCk6M')
      .then((result) => {
        setAlertType('success');
        setAlertMessage('Email sent successfully!');
        setOpen(true);
        setFormData({
          from_email: '',
          from_name: '',
          phone: '',
          message: ''
        });
        form.current.reset();
      }, (error) => {
        setAlertType('error');
        setAlertMessage('Failed to send email. Please try again.');
        setOpen(true);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="contact-container">
      <div className="contact-wrapper">
        <div className="contact-title">Contact</div>
        <div className="contact-desc">Feel free to reach out to me for any questions or opportunities!</div>
        <form className="contact-form" ref={form} onSubmit={handleSubmit}>
          <div className="contact-form-title">Email Me 🚀</div>
          
          <div className="input-group">
            <input 
              className={`contact-input ${formErrors.from_email ? 'error' : ''}`}
              placeholder="Your Email" 
              name="from_email" 
              type="email"
              value={formData.from_email}
              onChange={handleChange}
            />
            {formErrors.from_email && <div className="error-message">{formErrors.from_email}</div>}
          </div>
          
          <div className="input-group">
            <input 
              className={`contact-input ${formErrors.from_name ? 'error' : ''}`}
              placeholder="Your Name" 
              name="from_name"
              value={formData.from_name}
              onChange={handleChange}
            />
            {formErrors.from_name && <div className="error-message">{formErrors.from_name}</div>}
          </div>
          
          <div className="input-group">
            <input 
              className={`contact-input ${formErrors.phone ? 'error' : ''}`}
              placeholder="Phone Number" 
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
            />
            {formErrors.phone && <div className="error-message">{formErrors.phone}</div>}
          </div>
          
          <div className="input-group">
            <textarea 
              className={`contact-input-message ${formErrors.message ? 'error' : ''}`}
              placeholder="Message" 
              rows="4" 
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
            {formErrors.message && <div className="error-message">{formErrors.message}</div>}
          </div>
          
          <input className="contact-button" type="submit" value="Send" />
        </form>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
            {alertMessage}
          </Alert>
        </Snackbar>
      </div>
    </div>
  )
}

export default Contact