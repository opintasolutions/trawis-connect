import App, {Container} from 'next/app';
import {ApolloProvider} from 'react-apollo';
import withData from '../lib/withData';
import Layout from '../components/layout';

class MyApp extends App {
  render() {
    const {Component, apollo, pageProps} = this.props;
    console.log(pageProps);
    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Layout title={pageProps.title || ''}>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withData(MyApp);
