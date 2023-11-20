import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { gql } from "@apollo/client";

export default async function Home() {
  const httpLink = createHttpLink({
    uri: "https://api-mumbai.lens.dev/",
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        "user-agent": "spectaql",
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  const publicationQuery = gql`
    query publication {
      publication(
        request: {
          forId: "0x01c298-0x11-DA-0c729d0d"
          forTxHash: "s7oHihNLxH3rwCGh8-yK6P17bwjR0YHSXW8BxTCakVU"
        }
      ) {
        ... on Post {
          id
          publishedOn {
            id
          }
          isHidden
          momoka {
            proof
          }
          txHash
          createdAt
          by {
            id
            ownedBy {
              address
              chainId
            }
            txHash
            createdAt
            stats {
              id
              followers
              following
              comments
              posts
              mirrors
              quotes
              publications
              reactions
              reacted
              countOpenActions
            }
          }
        }
      }
    }
  `;

  try {
    const response = await client.query({
      query: publicationQuery,
    });

    console.log("Publication data: ", response.data);

    if (response.errors) {
      console.error("GraphQL errors:", response.errors);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching data:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
  }

  return <></>;
}
