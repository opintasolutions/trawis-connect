const Index = () => (
  <div>
    <h2>Welcome to Trawis Connect!</h2>
    <p>Click on the links above to find your way around</p>
    <style jsx>{`
      div {
        padding: 20px;
      }
    `}</style>
  </div>
);

Index.getInitialProps = async () => {
  return {title: 'Home'};
};

export default Index;
