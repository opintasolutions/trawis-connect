import Layout from '../components/layout';

const contentData = [
  {
    heading: 'Overview',
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. `,
    imgUrl: `/static/about_style.png`,
  },
  {
    heading: 'Our Vision',
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. `,
    imgUrl: `/static/about_style2.png`,
  },
  {
    heading: 'Facility Management',
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. `,
    imgUrl: `/static/about_style.png`,
  },
  {
    heading: 'Our Services',
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. `,
    imgUrl: `/static/about_style2.png`,
  },
];

const AboutPage = () => (
  <Layout title="About">
    <div className="bg-div">
      <h1>About Page</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <iframe
        src="https://www.youtube.com/embed/6rcbPwXQUjo?controls=0"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
    </div>
    {contentData.map(data => (
      <div className="capsule">
        <div>
          <h1>{data.heading}</h1>
          <p className="underline" />
          <p className="text">{data.text}</p>
          <p className="text">{data.text}</p>
        </div>
        <img src={data.imgUrl} />
      </div>
    ))}
    <style jsx>{`
      .bg-div {
        background: #264172;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        height: 80vh;
      }
      .bg-div p {
        margin-bottom: 35px;
        max-width: 600px;
        padding: 0 20px;
        color: #ccc;
        text-align: center;
        font-size: 14px;
        line-height: 1.5;
      }
      .capsule {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin: 20px 0;
      }
      .capsule:nth-child(odd) {
        flex-direction: row-reverse;
      }
      .capsule div {
        padding: 20px;
      }
      .capsule img {
        max-width: 400px;
        max-height: 100%;
      }
      .text {
        max-width: 600px;
        padding: 10px 0;
        color: #393939;
        font-size: 13px;
        line-height: 1.5;
      }
      iframe {
        width: 500px;
        height: 281px;
        margin-bottom: 50px;
      }
      .capsule h1 {
        margin: 15px 0;
      }
      .underline {
        border-bottom: 2px solid black;
        width: 60px;
        margin: 0;
      }
      @media (max-width: 700px) {
        iframe {
          width: 270px;
          height: 200px;
        }
        .capsule {
          flex-wrap: wrap;
        }
        .capsule img {
          width: 270px;
        }
      }
    `}</style>
  </Layout>
);

export default AboutPage;
