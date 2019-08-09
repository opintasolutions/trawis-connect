import Link from 'next/link';

const Index = () => (
  <div className="welcome-section">
    <div className="welcome-text">
      <h1>
        Don't Travel Alone.
        <br />
        Find Partners to Travel with
      </h1>
      <p>
        Whether you want to share your photos and stories, meet up with someone
        while you’re traveling, or find reviews from other travelers you've come
        to the right place.
      </p>
      <Link href="/register">
        <button className="call-to-action">Get Started</button>
      </Link>
    </div>
    <div className="icons">
      <img className="cloud" src="/static/Path 153.svg" />
      <img src="/static/OBJECTS.svg" />
    </div>
    <style jsx>{`
      div {
        padding: 10px;
      }
      h1 {
        font-weight: normal;
      }
      .welcome-section {
        height: 100vh;
        background: #264172;
        display: flex;
        align-items: center;
        justify-content: space-around;
      }
      .welcome-text {
        color: white;
      }
      img {
        max-width: 400px;
        padding: 20px;
      }
      .cloud {
        max-width: 270px;
      }
      p {
        max-width: 470px;
        line-height: 1.5;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.9);
      }
      .call-to-action {
        padding: 14px;
        font-size: 15px;
        background: #368fd8;
        color: white;
        box-shadow: 0px 23px 24px rgba(0, 0, 0, 0.08);
      }
      .icons-wrapper {
        display: flex;
      }
      .icons {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      @media (max-width: 700px) {
        .welcome-section {
          flex-wrap: wrap;
          height: 100%;
        }
        img {
          max-width: 300px;
        }
      }
    `}</style>
  </div>
);

Index.getInitialProps = async () => {
  return {title: 'Home'};
};

export default Index;
