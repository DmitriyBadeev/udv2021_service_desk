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
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
  Uuid: any;
};




export enum ApplyPolicy {
  BeforeResolver = 'BEFORE_RESOLVER',
  AfterResolver = 'AFTER_RESOLVER'
}

export type ClientCreateDtoInput = {
  name?: Maybe<Scalars['String']>;
  licenseIds?: Maybe<Array<Scalars['Int']>>;
};

export type ClientDto = {
  __typename?: 'ClientDto';
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  isActive: Scalars['Boolean'];
  creationDate: Scalars['DateTime'];
  lockDate?: Maybe<Scalars['DateTime']>;
  licenseIds?: Maybe<Array<Scalars['Int']>>;
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


export type LicenseCreateDtoInput = {
  number?: Maybe<Scalars['String']>;
  startDate: Scalars['DateTime'];
  expiresDate: Scalars['DateTime'];
  countOfUsers: Scalars['Int'];
  clientId?: Maybe<Scalars['Int']>;
  softwareId: Scalars['Int'];
};

export type LicenseDto = {
  __typename?: 'LicenseDto';
  id: Scalars['Int'];
  number?: Maybe<Scalars['String']>;
  startDate: Scalars['DateTime'];
  expiresDate: Scalars['DateTime'];
  countOfUsers: Scalars['Int'];
  clientId?: Maybe<Scalars['Int']>;
  client?: Maybe<Scalars['String']>;
  softwareId: Scalars['Int'];
  software?: Maybe<Scalars['String']>;
};

export type Mutations = {
  __typename?: 'Mutations';
  testMutation?: Maybe<Scalars['String']>;
  createClient?: Maybe<Scalars['String']>;
  editClient?: Maybe<ClientDto>;
  deleteClient?: Maybe<Scalars['String']>;
  createRequest?: Maybe<Scalars['String']>;
  editRequest?: Maybe<RequestDto>;
  deleteRequest?: Maybe<Scalars['String']>;
  newRequest?: Maybe<Scalars['String']>;
  registrationRequest?: Maybe<Scalars['String']>;
  inWorkRequest?: Maybe<Scalars['String']>;
  closingRequest?: Maybe<Scalars['String']>;
  rejectRequest?: Maybe<Scalars['String']>;
  reopenRequest?: Maybe<Scalars['String']>;
  createComment?: Maybe<Scalars['String']>;
  editComment?: Maybe<CommentDto>;
  deleteComment?: Maybe<Scalars['String']>;
  createRequestAttachment?: Maybe<Scalars['String']>;
  deleteRequestAttachment?: Maybe<Scalars['String']>;
  createLicense?: Maybe<Scalars['String']>;
  editLicense?: Maybe<LicenseDto>;
  deleteLicense?: Maybe<Scalars['String']>;
  createSoftware?: Maybe<Scalars['String']>;
  editSoftware?: Maybe<SoftwareDto>;
  deleteSoftware?: Maybe<Scalars['String']>;
  createSoftwareModule?: Maybe<Scalars['String']>;
  editSoftwareModule?: Maybe<SoftwareModuleDto>;
  deleteSoftwareModule?: Maybe<Scalars['String']>;
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


export type MutationsNewRequestArgs = {
  id: Scalars['Uuid'];
};


export type MutationsRegistrationRequestArgs = {
  id: Scalars['Uuid'];
};


export type MutationsInWorkRequestArgs = {
  id: Scalars['Uuid'];
};


export type MutationsClosingRequestArgs = {
  id: Scalars['Uuid'];
};


export type MutationsRejectRequestArgs = {
  id: Scalars['Uuid'];
};


export type MutationsReopenRequestArgs = {
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


export type MutationsCreateRequestAttachmentArgs = {
  requestAttachmentCreateDto?: Maybe<RequestAttachmentCreateDtoInput>;
};


export type MutationsDeleteRequestAttachmentArgs = {
  requestAttachmentId: Scalars['Int'];
};


export type MutationsCreateLicenseArgs = {
  licenseCreateDto?: Maybe<LicenseCreateDtoInput>;
};


export type MutationsEditLicenseArgs = {
  id: Scalars['Int'];
  licenseCreateDto?: Maybe<LicenseCreateDtoInput>;
};


export type MutationsDeleteLicenseArgs = {
  id: Scalars['Int'];
};


export type MutationsCreateSoftwareArgs = {
  softwareCreateDto?: Maybe<SoftwareCreateDtoInput>;
};


export type MutationsEditSoftwareArgs = {
  id: Scalars['Int'];
  softwareCreateDto?: Maybe<SoftwareCreateDtoInput>;
};


export type MutationsDeleteSoftwareArgs = {
  id: Scalars['Int'];
};


export type MutationsCreateSoftwareModuleArgs = {
  softwareModuleCreateDto?: Maybe<SoftwareModuleCreateDtoInput>;
};


export type MutationsEditSoftwareModuleArgs = {
  id: Scalars['Int'];
  softwareModuleCreateDto?: Maybe<SoftwareModuleCreateDtoInput>;
};


export type MutationsDeleteSoftwareModuleArgs = {
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
  attachment?: Maybe<RequestAttachmentDto>;
  attachments?: Maybe<Array<Maybe<RequestAttachmentDto>>>;
  requestAttachments?: Maybe<Array<Maybe<RequestAttachmentDto>>>;
  license?: Maybe<LicenseDto>;
  licenses?: Maybe<Array<Maybe<LicenseDto>>>;
  pageLicenses?: Maybe<Array<Maybe<LicenseDto>>>;
  software?: Maybe<SoftwareDto>;
  softwares?: Maybe<Array<Maybe<SoftwareDto>>>;
  pageSoftwares?: Maybe<Array<Maybe<SoftwareDto>>>;
  softwareModule?: Maybe<SoftwareModuleDto>;
  softwareModules?: Maybe<Array<Maybe<SoftwareModuleDto>>>;
  pageSoftwareModules?: Maybe<Array<Maybe<SoftwareModuleDto>>>;
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


export type QueriesAttachmentArgs = {
  id: Scalars['Int'];
};


export type QueriesRequestAttachmentsArgs = {
  requestId: Scalars['Uuid'];
};


export type QueriesLicenseArgs = {
  licenseId: Scalars['Int'];
};


export type QueriesPageLicensesArgs = {
  pageNumber: Scalars['Int'];
  count: Scalars['Int'];
};


export type QueriesSoftwareArgs = {
  id: Scalars['Int'];
};


export type QueriesPageSoftwaresArgs = {
  pageNumber: Scalars['Int'];
  count: Scalars['Int'];
};


export type QueriesSoftwareModuleArgs = {
  id: Scalars['Int'];
};


export type QueriesPageSoftwareModulesArgs = {
  pageNumber: Scalars['Int'];
  count: Scalars['Int'];
};

export type RequestAttachmentCreateDtoInput = {
  requestId: Scalars['Uuid'];
  file?: Maybe<Scalars['Upload']>;
};

export type RequestAttachmentDto = {
  __typename?: 'RequestAttachmentDto';
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  sizeMb?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['String']>;
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
  clientName?: Maybe<Scalars['String']>;
};

export type SoftwareCreateDtoInput = {
  title?: Maybe<Scalars['String']>;
};

export type SoftwareDto = {
  __typename?: 'SoftwareDto';
  id: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
};

export type SoftwareModuleCreateDtoInput = {
  title?: Maybe<Scalars['String']>;
  softwareId: Scalars['Int'];
};

export type SoftwareModuleDto = {
  __typename?: 'SoftwareModuleDto';
  id: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
  softwareId: Scalars['Int'];
  software?: Maybe<Scalars['String']>;
};



export type GetClientQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetClientQuery = (
  { __typename?: 'Queries' }
  & { client?: Maybe<(
    { __typename?: 'ClientDto' }
    & Pick<ClientDto, 'id' | 'name' | 'isActive' | 'creationDate' | 'lockDate' | 'licenseIds'>
  )> }
);

export type GetClientsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetClientsQuery = (
  { __typename?: 'Queries' }
  & { clients?: Maybe<Array<Maybe<(
    { __typename?: 'ClientDto' }
    & Pick<ClientDto, 'id' | 'name' | 'isActive' | 'creationDate' | 'licenseIds'>
  )>>> }
);

export type CreateClientMutationVariables = Exact<{
  name: Scalars['String'];
  licenseIds?: Maybe<Array<Scalars['Int']> | Scalars['Int']>;
}>;


export type CreateClientMutation = (
  { __typename?: 'Mutations' }
  & Pick<Mutations, 'createClient'>
);

export type EditClientMutationVariables = Exact<{
  id: Scalars['Int'];
  name: Scalars['String'];
  licenseIds?: Maybe<Array<Scalars['Int']> | Scalars['Int']>;
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
  & Pick<Mutations, 'createRequest'>
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
      & Pick<RequestDto, 'id' | 'theme' | 'software' | 'clientName'>
    )>>> }
  )>>> }
);

export type GetRequestQueryVariables = Exact<{
  id: Scalars['Uuid'];
}>;


export type GetRequestQuery = (
  { __typename?: 'Queries' }
  & { request?: Maybe<(
    { __typename?: 'RequestDto' }
    & Pick<RequestDto, 'id' | 'theme' | 'text' | 'creationDate' | 'processingDate' | 'developerRepresentativeId' | 'authorId' | 'software' | 'softwareModule' | 'requestStatus' | 'clientId'>
  )> }
);

export type GetAppealCommentsQueryVariables = Exact<{
  requestId: Scalars['Uuid'];
}>;


export type GetAppealCommentsQuery = (
  { __typename?: 'Queries' }
  & { requestComments?: Maybe<Array<Maybe<(
    { __typename?: 'CommentDto' }
    & Pick<CommentDto, 'id' | 'text' | 'authorId' | 'creationDate'>
  )>>> }
);

export type GetRequestAttachmentsQueryVariables = Exact<{
  requestId: Scalars['Uuid'];
}>;


export type GetRequestAttachmentsQuery = (
  { __typename?: 'Queries' }
  & { requestAttachments?: Maybe<Array<Maybe<(
    { __typename?: 'RequestAttachmentDto' }
    & Pick<RequestAttachmentDto, 'id' | 'name' | 'sizeMb' | 'reference'>
  )>>> }
);

export type AttachMutationVariables = Exact<{
  id: Scalars['Uuid'];
  file: Scalars['Upload'];
}>;


export type AttachMutation = (
  { __typename?: 'Mutations' }
  & Pick<Mutations, 'createRequestAttachment'>
);

export type DeleteAttachMutationVariables = Exact<{
  attachId: Scalars['Int'];
}>;


export type DeleteAttachMutation = (
  { __typename?: 'Mutations' }
  & Pick<Mutations, 'deleteRequestAttachment'>
);

export type CreateCommentMutationVariables = Exact<{
  text: Scalars['String'];
  appealId: Scalars['Uuid'];
}>;


export type CreateCommentMutation = (
  { __typename?: 'Mutations' }
  & Pick<Mutations, 'createComment'>
);

export type ToNewStatusMutationVariables = Exact<{
  id: Scalars['Uuid'];
}>;


export type ToNewStatusMutation = (
  { __typename?: 'Mutations' }
  & Pick<Mutations, 'newRequest'>
);

export type ToRegistrationStatusMutationVariables = Exact<{
  id: Scalars['Uuid'];
}>;


export type ToRegistrationStatusMutation = (
  { __typename?: 'Mutations' }
  & Pick<Mutations, 'registrationRequest'>
);

export type ToWorkStatusMutationVariables = Exact<{
  id: Scalars['Uuid'];
}>;


export type ToWorkStatusMutation = (
  { __typename?: 'Mutations' }
  & Pick<Mutations, 'inWorkRequest'>
);

export type ToClosingStatusMutationVariables = Exact<{
  id: Scalars['Uuid'];
}>;


export type ToClosingStatusMutation = (
  { __typename?: 'Mutations' }
  & Pick<Mutations, 'closingRequest'>
);

export type ToRejectStatusMutationVariables = Exact<{
  id: Scalars['Uuid'];
}>;


export type ToRejectStatusMutation = (
  { __typename?: 'Mutations' }
  & Pick<Mutations, 'rejectRequest'>
);

export type ToReopenStatusMutationVariables = Exact<{
  id: Scalars['Uuid'];
}>;


export type ToReopenStatusMutation = (
  { __typename?: 'Mutations' }
  & Pick<Mutations, 'reopenRequest'>
);

export type GetSoftwaresQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSoftwaresQuery = (
  { __typename?: 'Queries' }
  & { softwares?: Maybe<Array<Maybe<(
    { __typename?: 'SoftwareDto' }
    & Pick<SoftwareDto, 'id' | 'title'>
  )>>> }
);

export type CreateSoftwareMutationVariables = Exact<{
  title: Scalars['String'];
}>;


export type CreateSoftwareMutation = (
  { __typename?: 'Mutations' }
  & Pick<Mutations, 'createSoftware'>
);

export type EditSoftwareMutationVariables = Exact<{
  id: Scalars['Int'];
  title: Scalars['String'];
}>;


export type EditSoftwareMutation = (
  { __typename?: 'Mutations' }
  & { editSoftware?: Maybe<(
    { __typename?: 'SoftwareDto' }
    & Pick<SoftwareDto, 'id'>
  )> }
);

export type DeleteSoftwareMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteSoftwareMutation = (
  { __typename?: 'Mutations' }
  & Pick<Mutations, 'deleteSoftware'>
);

export type GetModulesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetModulesQuery = (
  { __typename?: 'Queries' }
  & { softwareModules?: Maybe<Array<Maybe<(
    { __typename?: 'SoftwareModuleDto' }
    & Pick<SoftwareModuleDto, 'id' | 'title' | 'software' | 'softwareId'>
  )>>> }
);

export type CreateModuleMutationVariables = Exact<{
  softwareId: Scalars['Int'];
  title: Scalars['String'];
}>;


export type CreateModuleMutation = (
  { __typename?: 'Mutations' }
  & Pick<Mutations, 'createSoftwareModule'>
);

export type EditModuleMutationVariables = Exact<{
  id: Scalars['Int'];
  title: Scalars['String'];
  softwareId: Scalars['Int'];
}>;


export type EditModuleMutation = (
  { __typename?: 'Mutations' }
  & { editSoftwareModule?: Maybe<(
    { __typename?: 'SoftwareModuleDto' }
    & Pick<SoftwareModuleDto, 'id'>
  )> }
);

export type DeleteModuleMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteModuleMutation = (
  { __typename?: 'Mutations' }
  & Pick<Mutations, 'deleteSoftwareModule'>
);

export type GetLicensesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLicensesQuery = (
  { __typename?: 'Queries' }
  & { licenses?: Maybe<Array<Maybe<(
    { __typename?: 'LicenseDto' }
    & Pick<LicenseDto, 'id' | 'number' | 'startDate' | 'expiresDate' | 'countOfUsers' | 'client' | 'clientId' | 'software' | 'softwareId'>
  )>>> }
);

export type CreateLicenseMutationVariables = Exact<{
  number: Scalars['String'];
  startDate: Scalars['DateTime'];
  expiresDate: Scalars['DateTime'];
  countUsers: Scalars['Int'];
  clientId?: Maybe<Scalars['Int']>;
  softwareId: Scalars['Int'];
}>;


export type CreateLicenseMutation = (
  { __typename?: 'Mutations' }
  & Pick<Mutations, 'createLicense'>
);

export type EditLicenseMutationVariables = Exact<{
  id: Scalars['Int'];
  number: Scalars['String'];
  startDate: Scalars['DateTime'];
  expiresDate: Scalars['DateTime'];
  countUsers: Scalars['Int'];
  clientId?: Maybe<Scalars['Int']>;
  softwareId: Scalars['Int'];
}>;


export type EditLicenseMutation = (
  { __typename?: 'Mutations' }
  & { editLicense?: Maybe<(
    { __typename?: 'LicenseDto' }
    & Pick<LicenseDto, 'id'>
  )> }
);

export type DeleteLicenseMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteLicenseMutation = (
  { __typename?: 'Mutations' }
  & Pick<Mutations, 'deleteLicense'>
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
    licenseIds
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
    licenseIds
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
    mutation createClient($name: String!, $licenseIds: [Int!]) {
  createClient(clientCreateDto: {name: $name, licenseIds: $licenseIds})
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
 *      licenseIds: // value for 'licenseIds'
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
    mutation editClient($id: Int!, $name: String!, $licenseIds: [Int!]) {
  editClient(id: $id, clientCreateDto: {name: $name, licenseIds: $licenseIds}) {
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
 *      licenseIds: // value for 'licenseIds'
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
  )
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
      clientName
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
export const GetRequestDocument = gql`
    query getRequest($id: Uuid!) {
  request(requestId: $id) {
    id
    theme
    text
    creationDate
    processingDate
    developerRepresentativeId
    authorId
    software
    softwareModule
    requestStatus
    clientId
  }
}
    `;

/**
 * __useGetRequestQuery__
 *
 * To run a query within a React component, call `useGetRequestQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRequestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRequestQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetRequestQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetRequestQuery, GetRequestQueryVariables>) {
        return ApolloReactHooks.useQuery<GetRequestQuery, GetRequestQueryVariables>(GetRequestDocument, baseOptions);
      }
export function useGetRequestLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetRequestQuery, GetRequestQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetRequestQuery, GetRequestQueryVariables>(GetRequestDocument, baseOptions);
        }
export type GetRequestQueryHookResult = ReturnType<typeof useGetRequestQuery>;
export type GetRequestLazyQueryHookResult = ReturnType<typeof useGetRequestLazyQuery>;
export type GetRequestQueryResult = ApolloReactCommon.QueryResult<GetRequestQuery, GetRequestQueryVariables>;
export const GetAppealCommentsDocument = gql`
    query getAppealComments($requestId: Uuid!) {
  requestComments(requestId: $requestId) {
    id
    text
    authorId
    creationDate
  }
}
    `;

/**
 * __useGetAppealCommentsQuery__
 *
 * To run a query within a React component, call `useGetAppealCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAppealCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAppealCommentsQuery({
 *   variables: {
 *      requestId: // value for 'requestId'
 *   },
 * });
 */
export function useGetAppealCommentsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAppealCommentsQuery, GetAppealCommentsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetAppealCommentsQuery, GetAppealCommentsQueryVariables>(GetAppealCommentsDocument, baseOptions);
      }
export function useGetAppealCommentsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAppealCommentsQuery, GetAppealCommentsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetAppealCommentsQuery, GetAppealCommentsQueryVariables>(GetAppealCommentsDocument, baseOptions);
        }
export type GetAppealCommentsQueryHookResult = ReturnType<typeof useGetAppealCommentsQuery>;
export type GetAppealCommentsLazyQueryHookResult = ReturnType<typeof useGetAppealCommentsLazyQuery>;
export type GetAppealCommentsQueryResult = ApolloReactCommon.QueryResult<GetAppealCommentsQuery, GetAppealCommentsQueryVariables>;
export const GetRequestAttachmentsDocument = gql`
    query getRequestAttachments($requestId: Uuid!) {
  requestAttachments(requestId: $requestId) {
    id
    name
    sizeMb
    reference
  }
}
    `;

/**
 * __useGetRequestAttachmentsQuery__
 *
 * To run a query within a React component, call `useGetRequestAttachmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRequestAttachmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRequestAttachmentsQuery({
 *   variables: {
 *      requestId: // value for 'requestId'
 *   },
 * });
 */
export function useGetRequestAttachmentsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetRequestAttachmentsQuery, GetRequestAttachmentsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetRequestAttachmentsQuery, GetRequestAttachmentsQueryVariables>(GetRequestAttachmentsDocument, baseOptions);
      }
export function useGetRequestAttachmentsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetRequestAttachmentsQuery, GetRequestAttachmentsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetRequestAttachmentsQuery, GetRequestAttachmentsQueryVariables>(GetRequestAttachmentsDocument, baseOptions);
        }
export type GetRequestAttachmentsQueryHookResult = ReturnType<typeof useGetRequestAttachmentsQuery>;
export type GetRequestAttachmentsLazyQueryHookResult = ReturnType<typeof useGetRequestAttachmentsLazyQuery>;
export type GetRequestAttachmentsQueryResult = ApolloReactCommon.QueryResult<GetRequestAttachmentsQuery, GetRequestAttachmentsQueryVariables>;
export const AttachDocument = gql`
    mutation attach($id: Uuid!, $file: Upload!) {
  createRequestAttachment(
    requestAttachmentCreateDto: {requestId: $id, file: $file}
  )
}
    `;
export type AttachMutationFn = ApolloReactCommon.MutationFunction<AttachMutation, AttachMutationVariables>;

/**
 * __useAttachMutation__
 *
 * To run a mutation, you first call `useAttachMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAttachMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [attachMutation, { data, loading, error }] = useAttachMutation({
 *   variables: {
 *      id: // value for 'id'
 *      file: // value for 'file'
 *   },
 * });
 */
export function useAttachMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AttachMutation, AttachMutationVariables>) {
        return ApolloReactHooks.useMutation<AttachMutation, AttachMutationVariables>(AttachDocument, baseOptions);
      }
export type AttachMutationHookResult = ReturnType<typeof useAttachMutation>;
export type AttachMutationResult = ApolloReactCommon.MutationResult<AttachMutation>;
export type AttachMutationOptions = ApolloReactCommon.BaseMutationOptions<AttachMutation, AttachMutationVariables>;
export const DeleteAttachDocument = gql`
    mutation deleteAttach($attachId: Int!) {
  deleteRequestAttachment(requestAttachmentId: $attachId)
}
    `;
export type DeleteAttachMutationFn = ApolloReactCommon.MutationFunction<DeleteAttachMutation, DeleteAttachMutationVariables>;

/**
 * __useDeleteAttachMutation__
 *
 * To run a mutation, you first call `useDeleteAttachMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAttachMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAttachMutation, { data, loading, error }] = useDeleteAttachMutation({
 *   variables: {
 *      attachId: // value for 'attachId'
 *   },
 * });
 */
export function useDeleteAttachMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteAttachMutation, DeleteAttachMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteAttachMutation, DeleteAttachMutationVariables>(DeleteAttachDocument, baseOptions);
      }
export type DeleteAttachMutationHookResult = ReturnType<typeof useDeleteAttachMutation>;
export type DeleteAttachMutationResult = ApolloReactCommon.MutationResult<DeleteAttachMutation>;
export type DeleteAttachMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteAttachMutation, DeleteAttachMutationVariables>;
export const CreateCommentDocument = gql`
    mutation createComment($text: String!, $appealId: Uuid!) {
  createComment(commentCreateDto: {text: $text, requestId: $appealId})
}
    `;
export type CreateCommentMutationFn = ApolloReactCommon.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      text: // value for 'text'
 *      appealId: // value for 'appealId'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, baseOptions);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = ApolloReactCommon.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const ToNewStatusDocument = gql`
    mutation toNewStatus($id: Uuid!) {
  newRequest(id: $id)
}
    `;
export type ToNewStatusMutationFn = ApolloReactCommon.MutationFunction<ToNewStatusMutation, ToNewStatusMutationVariables>;

/**
 * __useToNewStatusMutation__
 *
 * To run a mutation, you first call `useToNewStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToNewStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toNewStatusMutation, { data, loading, error }] = useToNewStatusMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useToNewStatusMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ToNewStatusMutation, ToNewStatusMutationVariables>) {
        return ApolloReactHooks.useMutation<ToNewStatusMutation, ToNewStatusMutationVariables>(ToNewStatusDocument, baseOptions);
      }
export type ToNewStatusMutationHookResult = ReturnType<typeof useToNewStatusMutation>;
export type ToNewStatusMutationResult = ApolloReactCommon.MutationResult<ToNewStatusMutation>;
export type ToNewStatusMutationOptions = ApolloReactCommon.BaseMutationOptions<ToNewStatusMutation, ToNewStatusMutationVariables>;
export const ToRegistrationStatusDocument = gql`
    mutation toRegistrationStatus($id: Uuid!) {
  registrationRequest(id: $id)
}
    `;
export type ToRegistrationStatusMutationFn = ApolloReactCommon.MutationFunction<ToRegistrationStatusMutation, ToRegistrationStatusMutationVariables>;

/**
 * __useToRegistrationStatusMutation__
 *
 * To run a mutation, you first call `useToRegistrationStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToRegistrationStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toRegistrationStatusMutation, { data, loading, error }] = useToRegistrationStatusMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useToRegistrationStatusMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ToRegistrationStatusMutation, ToRegistrationStatusMutationVariables>) {
        return ApolloReactHooks.useMutation<ToRegistrationStatusMutation, ToRegistrationStatusMutationVariables>(ToRegistrationStatusDocument, baseOptions);
      }
export type ToRegistrationStatusMutationHookResult = ReturnType<typeof useToRegistrationStatusMutation>;
export type ToRegistrationStatusMutationResult = ApolloReactCommon.MutationResult<ToRegistrationStatusMutation>;
export type ToRegistrationStatusMutationOptions = ApolloReactCommon.BaseMutationOptions<ToRegistrationStatusMutation, ToRegistrationStatusMutationVariables>;
export const ToWorkStatusDocument = gql`
    mutation toWorkStatus($id: Uuid!) {
  inWorkRequest(id: $id)
}
    `;
export type ToWorkStatusMutationFn = ApolloReactCommon.MutationFunction<ToWorkStatusMutation, ToWorkStatusMutationVariables>;

/**
 * __useToWorkStatusMutation__
 *
 * To run a mutation, you first call `useToWorkStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToWorkStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toWorkStatusMutation, { data, loading, error }] = useToWorkStatusMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useToWorkStatusMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ToWorkStatusMutation, ToWorkStatusMutationVariables>) {
        return ApolloReactHooks.useMutation<ToWorkStatusMutation, ToWorkStatusMutationVariables>(ToWorkStatusDocument, baseOptions);
      }
export type ToWorkStatusMutationHookResult = ReturnType<typeof useToWorkStatusMutation>;
export type ToWorkStatusMutationResult = ApolloReactCommon.MutationResult<ToWorkStatusMutation>;
export type ToWorkStatusMutationOptions = ApolloReactCommon.BaseMutationOptions<ToWorkStatusMutation, ToWorkStatusMutationVariables>;
export const ToClosingStatusDocument = gql`
    mutation toClosingStatus($id: Uuid!) {
  closingRequest(id: $id)
}
    `;
export type ToClosingStatusMutationFn = ApolloReactCommon.MutationFunction<ToClosingStatusMutation, ToClosingStatusMutationVariables>;

/**
 * __useToClosingStatusMutation__
 *
 * To run a mutation, you first call `useToClosingStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToClosingStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toClosingStatusMutation, { data, loading, error }] = useToClosingStatusMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useToClosingStatusMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ToClosingStatusMutation, ToClosingStatusMutationVariables>) {
        return ApolloReactHooks.useMutation<ToClosingStatusMutation, ToClosingStatusMutationVariables>(ToClosingStatusDocument, baseOptions);
      }
export type ToClosingStatusMutationHookResult = ReturnType<typeof useToClosingStatusMutation>;
export type ToClosingStatusMutationResult = ApolloReactCommon.MutationResult<ToClosingStatusMutation>;
export type ToClosingStatusMutationOptions = ApolloReactCommon.BaseMutationOptions<ToClosingStatusMutation, ToClosingStatusMutationVariables>;
export const ToRejectStatusDocument = gql`
    mutation toRejectStatus($id: Uuid!) {
  rejectRequest(id: $id)
}
    `;
export type ToRejectStatusMutationFn = ApolloReactCommon.MutationFunction<ToRejectStatusMutation, ToRejectStatusMutationVariables>;

/**
 * __useToRejectStatusMutation__
 *
 * To run a mutation, you first call `useToRejectStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToRejectStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toRejectStatusMutation, { data, loading, error }] = useToRejectStatusMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useToRejectStatusMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ToRejectStatusMutation, ToRejectStatusMutationVariables>) {
        return ApolloReactHooks.useMutation<ToRejectStatusMutation, ToRejectStatusMutationVariables>(ToRejectStatusDocument, baseOptions);
      }
export type ToRejectStatusMutationHookResult = ReturnType<typeof useToRejectStatusMutation>;
export type ToRejectStatusMutationResult = ApolloReactCommon.MutationResult<ToRejectStatusMutation>;
export type ToRejectStatusMutationOptions = ApolloReactCommon.BaseMutationOptions<ToRejectStatusMutation, ToRejectStatusMutationVariables>;
export const ToReopenStatusDocument = gql`
    mutation toReopenStatus($id: Uuid!) {
  reopenRequest(id: $id)
}
    `;
export type ToReopenStatusMutationFn = ApolloReactCommon.MutationFunction<ToReopenStatusMutation, ToReopenStatusMutationVariables>;

/**
 * __useToReopenStatusMutation__
 *
 * To run a mutation, you first call `useToReopenStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToReopenStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toReopenStatusMutation, { data, loading, error }] = useToReopenStatusMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useToReopenStatusMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ToReopenStatusMutation, ToReopenStatusMutationVariables>) {
        return ApolloReactHooks.useMutation<ToReopenStatusMutation, ToReopenStatusMutationVariables>(ToReopenStatusDocument, baseOptions);
      }
export type ToReopenStatusMutationHookResult = ReturnType<typeof useToReopenStatusMutation>;
export type ToReopenStatusMutationResult = ApolloReactCommon.MutationResult<ToReopenStatusMutation>;
export type ToReopenStatusMutationOptions = ApolloReactCommon.BaseMutationOptions<ToReopenStatusMutation, ToReopenStatusMutationVariables>;
export const GetSoftwaresDocument = gql`
    query getSoftwares {
  softwares {
    id
    title
  }
}
    `;

/**
 * __useGetSoftwaresQuery__
 *
 * To run a query within a React component, call `useGetSoftwaresQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSoftwaresQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSoftwaresQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSoftwaresQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetSoftwaresQuery, GetSoftwaresQueryVariables>) {
        return ApolloReactHooks.useQuery<GetSoftwaresQuery, GetSoftwaresQueryVariables>(GetSoftwaresDocument, baseOptions);
      }
export function useGetSoftwaresLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetSoftwaresQuery, GetSoftwaresQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetSoftwaresQuery, GetSoftwaresQueryVariables>(GetSoftwaresDocument, baseOptions);
        }
export type GetSoftwaresQueryHookResult = ReturnType<typeof useGetSoftwaresQuery>;
export type GetSoftwaresLazyQueryHookResult = ReturnType<typeof useGetSoftwaresLazyQuery>;
export type GetSoftwaresQueryResult = ApolloReactCommon.QueryResult<GetSoftwaresQuery, GetSoftwaresQueryVariables>;
export const CreateSoftwareDocument = gql`
    mutation createSoftware($title: String!) {
  createSoftware(softwareCreateDto: {title: $title})
}
    `;
export type CreateSoftwareMutationFn = ApolloReactCommon.MutationFunction<CreateSoftwareMutation, CreateSoftwareMutationVariables>;

/**
 * __useCreateSoftwareMutation__
 *
 * To run a mutation, you first call `useCreateSoftwareMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSoftwareMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSoftwareMutation, { data, loading, error }] = useCreateSoftwareMutation({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreateSoftwareMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateSoftwareMutation, CreateSoftwareMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateSoftwareMutation, CreateSoftwareMutationVariables>(CreateSoftwareDocument, baseOptions);
      }
export type CreateSoftwareMutationHookResult = ReturnType<typeof useCreateSoftwareMutation>;
export type CreateSoftwareMutationResult = ApolloReactCommon.MutationResult<CreateSoftwareMutation>;
export type CreateSoftwareMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateSoftwareMutation, CreateSoftwareMutationVariables>;
export const EditSoftwareDocument = gql`
    mutation editSoftware($id: Int!, $title: String!) {
  editSoftware(id: $id, softwareCreateDto: {title: $title}) {
    id
  }
}
    `;
export type EditSoftwareMutationFn = ApolloReactCommon.MutationFunction<EditSoftwareMutation, EditSoftwareMutationVariables>;

/**
 * __useEditSoftwareMutation__
 *
 * To run a mutation, you first call `useEditSoftwareMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditSoftwareMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editSoftwareMutation, { data, loading, error }] = useEditSoftwareMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useEditSoftwareMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EditSoftwareMutation, EditSoftwareMutationVariables>) {
        return ApolloReactHooks.useMutation<EditSoftwareMutation, EditSoftwareMutationVariables>(EditSoftwareDocument, baseOptions);
      }
export type EditSoftwareMutationHookResult = ReturnType<typeof useEditSoftwareMutation>;
export type EditSoftwareMutationResult = ApolloReactCommon.MutationResult<EditSoftwareMutation>;
export type EditSoftwareMutationOptions = ApolloReactCommon.BaseMutationOptions<EditSoftwareMutation, EditSoftwareMutationVariables>;
export const DeleteSoftwareDocument = gql`
    mutation deleteSoftware($id: Int!) {
  deleteSoftware(id: $id)
}
    `;
export type DeleteSoftwareMutationFn = ApolloReactCommon.MutationFunction<DeleteSoftwareMutation, DeleteSoftwareMutationVariables>;

/**
 * __useDeleteSoftwareMutation__
 *
 * To run a mutation, you first call `useDeleteSoftwareMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSoftwareMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSoftwareMutation, { data, loading, error }] = useDeleteSoftwareMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteSoftwareMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteSoftwareMutation, DeleteSoftwareMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteSoftwareMutation, DeleteSoftwareMutationVariables>(DeleteSoftwareDocument, baseOptions);
      }
export type DeleteSoftwareMutationHookResult = ReturnType<typeof useDeleteSoftwareMutation>;
export type DeleteSoftwareMutationResult = ApolloReactCommon.MutationResult<DeleteSoftwareMutation>;
export type DeleteSoftwareMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteSoftwareMutation, DeleteSoftwareMutationVariables>;
export const GetModulesDocument = gql`
    query getModules {
  softwareModules {
    id
    title
    software
    softwareId
  }
}
    `;

/**
 * __useGetModulesQuery__
 *
 * To run a query within a React component, call `useGetModulesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetModulesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetModulesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetModulesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetModulesQuery, GetModulesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetModulesQuery, GetModulesQueryVariables>(GetModulesDocument, baseOptions);
      }
export function useGetModulesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetModulesQuery, GetModulesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetModulesQuery, GetModulesQueryVariables>(GetModulesDocument, baseOptions);
        }
export type GetModulesQueryHookResult = ReturnType<typeof useGetModulesQuery>;
export type GetModulesLazyQueryHookResult = ReturnType<typeof useGetModulesLazyQuery>;
export type GetModulesQueryResult = ApolloReactCommon.QueryResult<GetModulesQuery, GetModulesQueryVariables>;
export const CreateModuleDocument = gql`
    mutation createModule($softwareId: Int!, $title: String!) {
  createSoftwareModule(
    softwareModuleCreateDto: {title: $title, softwareId: $softwareId}
  )
}
    `;
export type CreateModuleMutationFn = ApolloReactCommon.MutationFunction<CreateModuleMutation, CreateModuleMutationVariables>;

/**
 * __useCreateModuleMutation__
 *
 * To run a mutation, you first call `useCreateModuleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateModuleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createModuleMutation, { data, loading, error }] = useCreateModuleMutation({
 *   variables: {
 *      softwareId: // value for 'softwareId'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreateModuleMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateModuleMutation, CreateModuleMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateModuleMutation, CreateModuleMutationVariables>(CreateModuleDocument, baseOptions);
      }
export type CreateModuleMutationHookResult = ReturnType<typeof useCreateModuleMutation>;
export type CreateModuleMutationResult = ApolloReactCommon.MutationResult<CreateModuleMutation>;
export type CreateModuleMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateModuleMutation, CreateModuleMutationVariables>;
export const EditModuleDocument = gql`
    mutation editModule($id: Int!, $title: String!, $softwareId: Int!) {
  editSoftwareModule(
    id: $id
    softwareModuleCreateDto: {softwareId: $softwareId, title: $title}
  ) {
    id
  }
}
    `;
export type EditModuleMutationFn = ApolloReactCommon.MutationFunction<EditModuleMutation, EditModuleMutationVariables>;

/**
 * __useEditModuleMutation__
 *
 * To run a mutation, you first call `useEditModuleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditModuleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editModuleMutation, { data, loading, error }] = useEditModuleMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      softwareId: // value for 'softwareId'
 *   },
 * });
 */
export function useEditModuleMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EditModuleMutation, EditModuleMutationVariables>) {
        return ApolloReactHooks.useMutation<EditModuleMutation, EditModuleMutationVariables>(EditModuleDocument, baseOptions);
      }
export type EditModuleMutationHookResult = ReturnType<typeof useEditModuleMutation>;
export type EditModuleMutationResult = ApolloReactCommon.MutationResult<EditModuleMutation>;
export type EditModuleMutationOptions = ApolloReactCommon.BaseMutationOptions<EditModuleMutation, EditModuleMutationVariables>;
export const DeleteModuleDocument = gql`
    mutation deleteModule($id: Int!) {
  deleteSoftwareModule(id: $id)
}
    `;
export type DeleteModuleMutationFn = ApolloReactCommon.MutationFunction<DeleteModuleMutation, DeleteModuleMutationVariables>;

/**
 * __useDeleteModuleMutation__
 *
 * To run a mutation, you first call `useDeleteModuleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteModuleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteModuleMutation, { data, loading, error }] = useDeleteModuleMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteModuleMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteModuleMutation, DeleteModuleMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteModuleMutation, DeleteModuleMutationVariables>(DeleteModuleDocument, baseOptions);
      }
export type DeleteModuleMutationHookResult = ReturnType<typeof useDeleteModuleMutation>;
export type DeleteModuleMutationResult = ApolloReactCommon.MutationResult<DeleteModuleMutation>;
export type DeleteModuleMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteModuleMutation, DeleteModuleMutationVariables>;
export const GetLicensesDocument = gql`
    query getLicenses {
  licenses {
    id
    number
    startDate
    expiresDate
    countOfUsers
    client
    clientId
    software
    softwareId
  }
}
    `;

/**
 * __useGetLicensesQuery__
 *
 * To run a query within a React component, call `useGetLicensesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLicensesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLicensesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLicensesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetLicensesQuery, GetLicensesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetLicensesQuery, GetLicensesQueryVariables>(GetLicensesDocument, baseOptions);
      }
export function useGetLicensesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetLicensesQuery, GetLicensesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetLicensesQuery, GetLicensesQueryVariables>(GetLicensesDocument, baseOptions);
        }
export type GetLicensesQueryHookResult = ReturnType<typeof useGetLicensesQuery>;
export type GetLicensesLazyQueryHookResult = ReturnType<typeof useGetLicensesLazyQuery>;
export type GetLicensesQueryResult = ApolloReactCommon.QueryResult<GetLicensesQuery, GetLicensesQueryVariables>;
export const CreateLicenseDocument = gql`
    mutation createLicense($number: String!, $startDate: DateTime!, $expiresDate: DateTime!, $countUsers: Int!, $clientId: Int, $softwareId: Int!) {
  createLicense(
    licenseCreateDto: {number: $number, startDate: $startDate, expiresDate: $expiresDate, countOfUsers: $countUsers, clientId: $clientId, softwareId: $softwareId}
  )
}
    `;
export type CreateLicenseMutationFn = ApolloReactCommon.MutationFunction<CreateLicenseMutation, CreateLicenseMutationVariables>;

/**
 * __useCreateLicenseMutation__
 *
 * To run a mutation, you first call `useCreateLicenseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLicenseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLicenseMutation, { data, loading, error }] = useCreateLicenseMutation({
 *   variables: {
 *      number: // value for 'number'
 *      startDate: // value for 'startDate'
 *      expiresDate: // value for 'expiresDate'
 *      countUsers: // value for 'countUsers'
 *      clientId: // value for 'clientId'
 *      softwareId: // value for 'softwareId'
 *   },
 * });
 */
export function useCreateLicenseMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateLicenseMutation, CreateLicenseMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateLicenseMutation, CreateLicenseMutationVariables>(CreateLicenseDocument, baseOptions);
      }
export type CreateLicenseMutationHookResult = ReturnType<typeof useCreateLicenseMutation>;
export type CreateLicenseMutationResult = ApolloReactCommon.MutationResult<CreateLicenseMutation>;
export type CreateLicenseMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateLicenseMutation, CreateLicenseMutationVariables>;
export const EditLicenseDocument = gql`
    mutation editLicense($id: Int!, $number: String!, $startDate: DateTime!, $expiresDate: DateTime!, $countUsers: Int!, $clientId: Int, $softwareId: Int!) {
  editLicense(
    id: $id
    licenseCreateDto: {number: $number, startDate: $startDate, expiresDate: $expiresDate, countOfUsers: $countUsers, clientId: $clientId, softwareId: $softwareId}
  ) {
    id
  }
}
    `;
export type EditLicenseMutationFn = ApolloReactCommon.MutationFunction<EditLicenseMutation, EditLicenseMutationVariables>;

/**
 * __useEditLicenseMutation__
 *
 * To run a mutation, you first call `useEditLicenseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditLicenseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editLicenseMutation, { data, loading, error }] = useEditLicenseMutation({
 *   variables: {
 *      id: // value for 'id'
 *      number: // value for 'number'
 *      startDate: // value for 'startDate'
 *      expiresDate: // value for 'expiresDate'
 *      countUsers: // value for 'countUsers'
 *      clientId: // value for 'clientId'
 *      softwareId: // value for 'softwareId'
 *   },
 * });
 */
export function useEditLicenseMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EditLicenseMutation, EditLicenseMutationVariables>) {
        return ApolloReactHooks.useMutation<EditLicenseMutation, EditLicenseMutationVariables>(EditLicenseDocument, baseOptions);
      }
export type EditLicenseMutationHookResult = ReturnType<typeof useEditLicenseMutation>;
export type EditLicenseMutationResult = ApolloReactCommon.MutationResult<EditLicenseMutation>;
export type EditLicenseMutationOptions = ApolloReactCommon.BaseMutationOptions<EditLicenseMutation, EditLicenseMutationVariables>;
export const DeleteLicenseDocument = gql`
    mutation deleteLicense($id: Int!) {
  deleteLicense(id: $id)
}
    `;
export type DeleteLicenseMutationFn = ApolloReactCommon.MutationFunction<DeleteLicenseMutation, DeleteLicenseMutationVariables>;

/**
 * __useDeleteLicenseMutation__
 *
 * To run a mutation, you first call `useDeleteLicenseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLicenseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLicenseMutation, { data, loading, error }] = useDeleteLicenseMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteLicenseMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteLicenseMutation, DeleteLicenseMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteLicenseMutation, DeleteLicenseMutationVariables>(DeleteLicenseDocument, baseOptions);
      }
export type DeleteLicenseMutationHookResult = ReturnType<typeof useDeleteLicenseMutation>;
export type DeleteLicenseMutationResult = ApolloReactCommon.MutationResult<DeleteLicenseMutation>;
export type DeleteLicenseMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteLicenseMutation, DeleteLicenseMutationVariables>;
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