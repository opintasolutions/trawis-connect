import Layout from '../components/layout';

const ContactPage = () => (
  <Layout title="Contact">
    <div className="container">
      <div className="contact-info">
        <div>
          <h1>Get in touch</h1>
          <p className="underline" />
        </div>
        <div>
          <h2>Address</h2>
          <p>Travelbuddy Pvt. Ltd</p>
          <p>342 Henry Street</p>
          <p>NORTH BERWICK, Maine, 03906</p>
        </div>
        <div>
          <h2>Email</h2>
          <p>info@travelbuddy.com</p>
        </div>
        <div>
          <h2>Phone Number</h2>
          <p>+1 317-226-1486</p>
          <p>+1 207-315-2835</p>
        </div>
      </div>
      <div className="contact-form">
        <h2>Write to Us</h2>
        <input type="text" placeholder="Your Name" />
        <input type="text" placeholder="Your Email" />
        <textarea placeholder="Your Message" />
        <button>Send</button>
      </div>
      <div>
        <img src="/static/map.png" width="350" />
      </div>
    </div>
    {
      // <footer>
      //   <img src="/static/tconnect_black.svg" width="100" />
      // </footer>
    }
    <style>{`
        body {
          background: #264172; 
        }
        .container {
          padding-top: 10px;
          display: flex;
          justify-content: space-around;
          color: white;
          height: 100%;
        }
        h1, h2 {
          font-weight: normal;
        }
        .underline {
          border-bottom: 3px solid white;
          width: 50px;
        }
        .contact-info {
          padding: 20px;
          width: 300px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          font-size: 12px;
        }
        .contact-info div {
          margin: 10px 0;
        }
        .contact-form {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          color: black;
          background: white;
          padding: 10px 30px;
          margin: 40px 0;
          box-shadow: 0px 23px 24px rgba(0, 0, 0, 0.08);
          border-radius: 3px;
        }
        .contact-form input,textarea {
          padding: 20px;
          margin: 5px;
          border: none;
          border-radius: 5px;
          background: #eef3f7;
          font-family: 'Inter', sans-serif;
        }
        .contact-form textarea {
          resize: none;
          height: 140px;
        }
        .contact-form button {
          margin: 15px;
          font-size: 14px;
          background: #264172;
          border: none;
          color: white;
          padding: 10px;
          border-radius: 3px;
          cursor: pointer;
          box-shadow: 0px 23px 24px rgba(0, 0, 0, 0.08);
        }
        .container img {
          margin-top: 40px;
        }
        footer {
          text-align: center;
          font-size: 14px;
        }
        img {
          margin: 20px;
        }
        @media (max-width: 700px) {
          .container {
            flex-wrap: wrap;
          }
          .container img {
            width: 290px;
          }
        }
      `}</style>
  </Layout>
);

export default ContactPage;
