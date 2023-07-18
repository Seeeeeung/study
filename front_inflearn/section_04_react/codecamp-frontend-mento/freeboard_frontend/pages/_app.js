import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
	const client = new ApolloClient({
		uri: "https://backendonline.codebootcamp.co.kr/graphql",
		cache: new InMemoryCache()
	})

  return (
		<ApolloProvider client={client}>
			<Component {...pageProps} />
		</ApolloProvider>
	)
}

export default MyApp
