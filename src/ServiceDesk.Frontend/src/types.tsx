import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: any;
  Uuid: any;
};




export enum ApplyPolicy {
  BeforeResolver = 'BEFORE_RESOLVER',
  AfterResolver = 'AFTER_RESOLVER'
}

export type ClientCreateDtoInput = {
  name?: Maybe<Scalars['String']>;
};

export type ClientDto = {
  __typename?: 'ClientDto';
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  isActive: Scalars['Boolean'];
  creationDate: Scalars['DateTime'];
  lockDate?: Maybe<Scalars['DateTime']>;
};

export type CommentCreateDtoInput = {
  text?: Maybe<Scalars['String']>;
  requestId: Scalars['Uuid'];
};

export type CommentDto = {
  __typename?: 'CommentDto';
  id: Scalars['Int'];
  text?: Maybe<Scalars['String']>;
  authorId?: Maybe<Scalars['String']>;
  creationDate: Scalars['DateTime'];
};


export type Mutations = {
  __typename?: 'Mutations';
  testMutation?: Maybe<Scalars['String']>;
  createClient?: Maybe<ClientDto>;
  editClient?: Maybe<ClientDto>;
  deleteClient?: Maybe<Scalars['String']>;
  createRequest?: Maybe<RequestDto>;
  editRequest?: Maybe<RequestDto>;
  deleteRequest?: Maybe<Scalars['String']>;
  createComment?: Maybe<CommentDto>;
  editComment?: Maybe<CommentDto>;
  deleteComment?: Maybe<Scalars['String']>;
};


export type MutationsCreateClientArgs = {
  clientCreateDto?: Maybe<ClientCreateDtoInput>;
};


export type MutationsEditClientArgs = {
  id: Scalars['Int'];
  clientCreateDto?: Maybe<ClientCreateDtoInput>;
};


export type MutationsDeleteClientArgs = {
  id: Scalars['Int'];
};


export type MutationsCreateRequestArgs = {
  requestCreateDto?: Maybe<RequestCreateDtoInput>;
};


export type MutationsEditRequestArgs = {
  id: Scalars['Uuid'];
  requestCreateDto?: Maybe<RequestCreateDtoInput>;
};


export type MutationsDeleteRequestArgs = {
  id: Scalars['Uuid'];
};


export type MutationsCreateCommentArgs = {
  commentCreateDto?: Maybe<CommentCreateDtoInput>;
};


export type MutationsEditCommentArgs = {
  id: Scalars['Int'];
  commentCreateDto?: Maybe<CommentCreateDtoInput>;
};


export type MutationsDeleteCommentArgs = {
  id: Scalars['Int'];
};

export type Queries = {
  __typename?: 'Queries';
  testQuery?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  developerMethod?: Maybe<Scalars['String']>;
  customerMethod?: Maybe<Scalars['String']>;
  secret?: Maybe<Scalars['String']>;
  client?: Maybe<ClientDto>;
  clients?: Maybe<Array<Maybe<ClientDto>>>;
  pageClients?: Maybe<Array<Maybe<ClientDto>>>;
  request?: Maybe<RequestDto>;
  requests?: Maybe<Array<Maybe<RequestDto>>>;
  pageRequests?: Maybe<Array<Maybe<RequestDto>>>;
  requestBoards?: Maybe<Array<Maybe<RequestBoardDto>>>;
  clientRequests?: Maybe<Array<Maybe<RequestDto>>>;
  comment?: Maybe<CommentDto>;
  comments?: Maybe<Array<Maybe<CommentDto>>>;
  pageComments?: Maybe<Array<Maybe<CommentDto>>>;
  requestComments?: Maybe<Array<Maybe<CommentDto>>>;
};


export type QueriesClientArgs = {
  clientId: Scalars['Int'];
};


export type QueriesPageClientsArgs = {
  pageNumber: Scalars['Int'];
  count: Scalars['Int'];
};


export type QueriesRequestArgs = {
  requestId: Scalars['Uuid'];
};


export type QueriesPageRequestsArgs = {
  pageNumber: Scalars['Int'];
  count: Scalars['Int'];
};


export type QueriesClientRequestsArgs = {
  clientId: Scalars['Int'];
};


export type QueriesCommentArgs = {
  id: Scalars['Int'];
};


export type QueriesPageCommentsArgs = {
  pageNumber: Scalars['Int'];
  count: Scalars['Int'];
};


export type QueriesRequestCommentsArgs = {
  requestId: Scalars['Uuid'];
};

export type RequestBoardDto = {
  __typename?: 'RequestBoardDto';
  name?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<RequestDto>>>;
};

export type RequestCreateDtoInput = {
  theme?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  clientId: Scalars['Int'];
  developerRepresentativeId?: Maybe<Scalars['String']>;
  softwareModuleId?: Maybe<Scalars['Int']>;
};

export type RequestDto = {
  __typename?: 'RequestDto';
  id: Scalars['Uuid'];
  theme?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  creationDate: Scalars['DateTime'];
  processingDate?: Maybe<Scalars['DateTime']>;
  developerRepresentativeId?: Maybe<Scalars['String']>;
  authorId?: Maybe<Scalars['String']>;
  software?: Maybe<Scalars['String']>;
  softwareModule?: Maybe<Scalars['String']>;
  requestStatus?: Maybe<Scalars['String']>;
  clientId: Scalars['Int'];
};


export type GetClientQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetClientQuery = (
  { __typename?: 'Queries' }
  & { client?: Maybe<(
    { __typename?: 'ClientDto' }
    & Pick<ClientDto, 'id' | 'name' | 'isActive' | 'creationDate' | 'lockDate'>
  )> }
);

export type GetClientsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetClientsQuery = (
  { __typename?: 'Queries' }
  & { clients?: Maybe<Array<Maybe<(
    { __typename?: 'ClientDto' }
    & Pick<ClientDto, 'id' | 'name' | 'isActive' | 'creationDate'>
  )>>> }
);

export type CreateClientMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateClientMutation = (
  { __typename?: 'Mutations' }
  & { createClient?: Maybe<(
    { __typename?: 'ClientDto' }
    & Pick<ClientDto, 'id'>
  )> }
);

export type EditClientMutationVariables = Exact<{
  id: Scalars['Int'];
  name: Scalars['String'];
}>;


export type EditClientMutation = (
  { __typename?: 'Mutations' }
  & { editClient?: Maybe<(
    { __typename?: 'ClientDto' }
    & Pick<ClientDto, 'id'>
  )> }
);

export type DeleteClientMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteClientMutation = (
  { __typename?: 'Mutations' }
  & Pick<Mutations, 'deleteClient'>
);

export type CreateRequestMutationVariables = Exact<{
  title: Scalars['String'];
  text: Scalars['String'];
  clientId: Scalars['Int'];
}>;


export type CreateRequestMutation = (
  { __typename?: 'Mutations' }
  & { createRequest?: Maybe<(
    { __typename?: 'RequestDto' }
    & Pick<RequestDto, 'id'>
  )> }
);

export type EditRequestMutationVariables = Exact<{
  id: Scalars['Uuid'];
  theme: Scalars['String'];
  text: Scalars['String'];
  clientId: Scalars['Int'];
}>;


export type EditRequestMutation = (
  { __typename?: 'Mutations' }
  & { editRequest?: Maybe<(
    { __typename?: 'RequestDto' }
    & Pick<RequestDto, 'id'>
  )> }
);

export type DeleteRequestMutationVariables = Exact<{
  id: Scalars['Uuid'];
}>;


export type DeleteRequestMutation = (
  { __typename?: 'Mutations' }
  & Pick<Mutations, 'deleteRequest'>
);

export type GetCustomerRequestsQueryVariables = Exact<{
  customerId: Scalars['Int'];
}>;


export type GetCustomerRequestsQuery = (
  { __typename?: 'Queries' }
  & { clientRequests?: Maybe<Array<Maybe<(
    { __typename?: 'RequestDto' }
    & Pick<RequestDto, 'id' | 'theme' | 'text' | 'requestStatus' | 'software' | 'creationDate'>
  )>>> }
);

export type RequestBoardsQueryVariables = Exact<{ [key: string]: never; }>;


export type RequestBoardsQuery = (
  { __typename?: 'Queries' }
  & { requestBoards?: Maybe<Array<Maybe<(
    { __typename?: 'RequestBoardDto' }
    & Pick<RequestBoardDto, 'name'>
    & { items?: Maybe<Array<Maybe<(
      { __typename?: 'RequestDto' }
      & Pick<RequestDto, 'id' | 'theme' | 'software' | 'authorId'>
    )>>> }
  )>>> }
);

export type SecretQueryVariables = Exact<{ [key: string]: never; }>;


export type SecretQuery = (
  { __typename?: 'Queries' }
  & Pick<Queries, 'userId'>
);


export const GetClientDocument = gql`
    query getClient($id: Int!) {
  client(clientId: $id) {
    id
    name
    isActive
    creationDate
    lockDate
  }
}
    `;

/**
 * __useGetClientQuery__
 *
 * To run a query within a React component, call `useGetClientQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClientQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClientQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetClientQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetClientQuery, GetClientQueryVariables>) {
        return ApolloReactHooks.useQuery<GetClientQuery, GetClientQueryVariables>(GetClientDocument, baseOptions);
      }
export function useGetClientLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetClientQuery, GetClientQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetClientQuery, GetClientQueryVariables>(GetClientDocument, baseOptions);
        }
export type GetClientQueryHookResult = ReturnType<typeof useGetClientQuery>;
export type GetClientLazyQueryHookResult = ReturnType<typeof useGetClientLazyQuery>;
export type GetClientQueryResult = ApolloReactCommon.QueryResult<GetClientQuery, GetClientQueryVariables>;
export const GetClientsDocument = gql`
    query getClients {
  clients {
    id
    name
    isActive
    creationDate
  }
}
    `;

/**
 * __useGetClientsQuery__
 *
 * To run a query within a React component, call `useGetClientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClientsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClientsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetClientsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetClientsQuery, GetClientsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetClientsQuery, GetClientsQueryVariables>(GetClientsDocument, baseOptions);
      }
export function useGetClientsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetClientsQuery, GetClientsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetClientsQuery, GetClientsQueryVariables>(GetClientsDocument, baseOptions);
        }
export type GetClientsQueryHookResult = ReturnType<typeof useGetClientsQuery>;
export type GetClientsLazyQueryHookResult = ReturnType<typeof useGetClientsLazyQuery>;
export type GetClientsQueryResult = ApolloReactCommon.QueryResult<GetClientsQuery, GetClientsQueryVariables>;
export const CreateClientDocument = gql`
    mutation createClient($name: String!) {
  createClient(clientCreateDto: {name: $name}) {
    id
  }
}
    `;
export type CreateClientMutationFn = ApolloReactCommon.MutationFunction<CreateClientMutation, CreateClientMutationVariables>;

/**
 * __useCreateClientMutation__
 *
 * To run a mutation, you first call `useCreateClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createClientMutation, { data, loading, error }] = useCreateClientMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateClientMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateClientMutation, CreateClientMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateClientMutation, CreateClientMutationVariables>(CreateClientDocument, baseOptions);
      }
export type CreateClientMutationHookResult = ReturnType<typeof useCreateClientMutation>;
export type CreateClientMutationResult = ApolloReactCommon.MutationResult<CreateClientMutation>;
export type CreateClientMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateClientMutation, CreateClientMutationVariables>;
export const EditClientDocument = gql`
    mutation editClient($id: Int!, $name: String!) {
  editClient(id: $id, clientCreateDto: {name: $name}) {
    id
  }
}
    `;
export type EditClientMutationFn = ApolloReactCommon.MutationFunction<EditClientMutation, EditClientMutationVariables>;

/**
 * __useEditClientMutation__
 *
 * To run a mutation, you first call `useEditClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editClientMutation, { data, loading, error }] = useEditClientMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useEditClientMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EditClientMutation, EditClientMutationVariables>) {
        return ApolloReactHooks.useMutation<EditClientMutation, EditClientMutationVariables>(EditClientDocument, baseOptions);
      }
export type EditClientMutationHookResult = ReturnType<typeof useEditClientMutation>;
export type EditClientMutationResult = ApolloReactCommon.MutationResult<EditClientMutation>;
export type EditClientMutationOptions = ApolloReactCommon.BaseMutationOptions<EditClientMutation, EditClientMutationVariables>;
export const DeleteClientDocument = gql`
    mutation deleteClient($id: Int!) {
  deleteClient(id: $id)
}
    `;
export type DeleteClientMutationFn = ApolloReactCommon.MutationFunction<DeleteClientMutation, DeleteClientMutationVariables>;

/**
 * __useDeleteClientMutation__
 *
 * To run a mutation, you first call `useDeleteClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteClientMutation, { data, loading, error }] = useDeleteClientMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteClientMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteClientMutation, DeleteClientMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteClientMutation, DeleteClientMutationVariables>(DeleteClientDocument, baseOptions);
      }
export type DeleteClientMutationHookResult = ReturnType<typeof useDeleteClientMutation>;
export type DeleteClientMutationResult = ApolloReactCommon.MutationResult<DeleteClientMutation>;
export type DeleteClientMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteClientMutation, DeleteClientMutationVariables>;
export const CreateRequestDocument = gql`
    mutation createRequest($title: String!, $text: String!, $clientId: Int!) {
  createRequest(
    requestCreateDto: {theme: $title, text: $text, developerRepresentativeId: null, softwareModuleId: null, clientId: $clientId}
  ) {
    id
  }
}
    `;
export type CreateRequestMutationFn = ApolloReactCommon.MutationFunction<CreateRequestMutation, CreateRequestMutationVariables>;

/**
 * __useCreateRequestMutation__
 *
 * To run a mutation, you first call `useCreateRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRequestMutation, { data, loading, error }] = useCreateRequestMutation({
 *   variables: {
 *      title: // value for 'title'
 *      text: // value for 'text'
 *      clientId: // value for 'clientId'
 *   },
 * });
 */
export function useCreateRequestMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateRequestMutation, CreateRequestMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateRequestMutation, CreateRequestMutationVariables>(CreateRequestDocument, baseOptions);
      }
export type CreateRequestMutationHookResult = ReturnType<typeof useCreateRequestMutation>;
export type CreateRequestMutationResult = ApolloReactCommon.MutationResult<CreateRequestMutation>;
export type CreateRequestMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateRequestMutation, CreateRequestMutationVariables>;
export const EditRequestDocument = gql`
    mutation editRequest($id: Uuid!, $theme: String!, $text: String!, $clientId: Int!) {
  editRequest(
    id: $id
    requestCreateDto: {theme: $theme, text: $text, clientId: $clientId, developerRepresentativeId: null, softwareModuleId: null}
  ) {
    id
  }
}
    `;
export type EditRequestMutationFn = ApolloReactCommon.MutationFunction<EditRequestMutation, EditRequestMutationVariables>;

/**
 * __useEditRequestMutation__
 *
 * To run a mutation, you first call `useEditRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editRequestMutation, { data, loading, error }] = useEditRequestMutation({
 *   variables: {
 *      id: // value for 'id'
 *      theme: // value for 'theme'
 *      text: // value for 'text'
 *      clientId: // value for 'clientId'
 *   },
 * });
 */
export function useEditRequestMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EditRequestMutation, EditRequestMutationVariables>) {
        return ApolloReactHooks.useMutation<EditRequestMutation, EditRequestMutationVariables>(EditRequestDocument, baseOptions);
      }
export type EditRequestMutationHookResult = ReturnType<typeof useEditRequestMutation>;
export type EditRequestMutationResult = ApolloReactCommon.MutationResult<EditRequestMutation>;
export type EditRequestMutationOptions = ApolloReactCommon.BaseMutationOptions<EditRequestMutation, EditRequestMutationVariables>;
export const DeleteRequestDocument = gql`
    mutation deleteRequest($id: Uuid!) {
  deleteRequest(id: $id)
}
    `;
export type DeleteRequestMutationFn = ApolloReactCommon.MutationFunction<DeleteRequestMutation, DeleteRequestMutationVariables>;

/**
 * __useDeleteRequestMutation__
 *
 * To run a mutation, you first call `useDeleteRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRequestMutation, { data, loading, error }] = useDeleteRequestMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteRequestMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteRequestMutation, DeleteRequestMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteRequestMutation, DeleteRequestMutationVariables>(DeleteRequestDocument, baseOptions);
      }
export type DeleteRequestMutationHookResult = ReturnType<typeof useDeleteRequestMutation>;
export type DeleteRequestMutationResult = ApolloReactCommon.MutationResult<DeleteRequestMutation>;
export type DeleteRequestMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteRequestMutation, DeleteRequestMutationVariables>;
export const GetCustomerRequestsDocument = gql`
    query getCustomerRequests($customerId: Int!) {
  clientRequests(clientId: $customerId) {
    id
    theme
    text
    requestStatus
    software
    creationDate
  }
}
    `;

/**
 * __useGetCustomerRequestsQuery__
 *
 * To run a query within a React component, call `useGetCustomerRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomerRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomerRequestsQuery({
 *   variables: {
 *      customerId: // value for 'customerId'
 *   },
 * });
 */
export function useGetCustomerRequestsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCustomerRequestsQuery, GetCustomerRequestsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetCustomerRequestsQuery, GetCustomerRequestsQueryVariables>(GetCustomerRequestsDocument, baseOptions);
      }
export function useGetCustomerRequestsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCustomerRequestsQuery, GetCustomerRequestsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetCustomerRequestsQuery, GetCustomerRequestsQueryVariables>(GetCustomerRequestsDocument, baseOptions);
        }
export type GetCustomerRequestsQueryHookResult = ReturnType<typeof useGetCustomerRequestsQuery>;
export type GetCustomerRequestsLazyQueryHookResult = ReturnType<typeof useGetCustomerRequestsLazyQuery>;
export type GetCustomerRequestsQueryResult = ApolloReactCommon.QueryResult<GetCustomerRequestsQuery, GetCustomerRequestsQueryVariables>;
export const RequestBoardsDocument = gql`
    query requestBoards {
  requestBoards {
    name
    items {
      id
      theme
      software
      authorId
    }
  }
}
    `;

/**
 * __useRequestBoardsQuery__
 *
 * To run a query within a React component, call `useRequestBoardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRequestBoardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRequestBoardsQuery({
 *   variables: {
 *   },
 * });
 */
export function useRequestBoardsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RequestBoardsQuery, RequestBoardsQueryVariables>) {
        return ApolloReactHooks.useQuery<RequestBoardsQuery, RequestBoardsQueryVariables>(RequestBoardsDocument, baseOptions);
      }
export function useRequestBoardsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RequestBoardsQuery, RequestBoardsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<RequestBoardsQuery, RequestBoardsQueryVariables>(RequestBoardsDocument, baseOptions);
        }
export type RequestBoardsQueryHookResult = ReturnType<typeof useRequestBoardsQuery>;
export type RequestBoardsLazyQueryHookResult = ReturnType<typeof useRequestBoardsLazyQuery>;
export type RequestBoardsQueryResult = ApolloReactCommon.QueryResult<RequestBoardsQuery, RequestBoardsQueryVariables>;
export const SecretDocument = gql`
    query Secret {
  userId
}
    `;

/**
 * __useSecretQuery__
 *
 * To run a query within a React component, call `useSecretQuery` and pass it any options that fit your needs.
 * When your component renders, `useSecretQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSecretQuery({
 *   variables: {
 *   },
 * });
 */
export function useSecretQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SecretQuery, SecretQueryVariables>) {
        return ApolloReactHooks.useQuery<SecretQuery, SecretQueryVariables>(SecretDocument, baseOptions);
      }
export function useSecretLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SecretQuery, SecretQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SecretQuery, SecretQueryVariables>(SecretDocument, baseOptions);
        }
export type SecretQueryHookResult = ReturnType<typeof useSecretQuery>;
export type SecretLazyQueryHookResult = ReturnType<typeof useSecretLazyQuery>;
export type SecretQueryResult = ApolloReactCommon.QueryResult<SecretQuery, SecretQueryVariables>;