"use client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

export const Providers = ({ children }: { children: React.ReactNode }) => {
	const client = new ApolloClient({
		uri: "https://takenotebackend.onrender.com/graphql",
		cache: new InMemoryCache(),
	});
	return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

