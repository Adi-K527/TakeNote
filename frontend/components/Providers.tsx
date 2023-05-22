"use client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

export const Providers = ({ children }: { children: React.ReactNode }) => {
	const client = new ApolloClient({
		uri: "https://takenoteapi.onrender.com/:5000/graphql",
		cache: new InMemoryCache(),
	});
	return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

