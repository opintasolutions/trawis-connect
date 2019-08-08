import App, {Container} from 'next/app';
import {ApolloProvider} from 'react-apollo';
import withData from '../lib/withData';

class MyApp extends App {
  render() {
    const {Component, apollo, pageProps} = this.props;

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}

export default withData(MyApp);
