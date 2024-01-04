/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./types";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getCodeItem = /* GraphQL */ `query GetCodeItem(
  $tenantCode: String!
  $tableCode: String!
  $itemCode: String!
) {
  getCodeItem(
    tenantCode: $tenantCode
    tableCode: $tableCode
    itemCode: $itemCode
  ) {
    tenantCode
    tableCode
    itemCode
    internalName
    internalDescription
    isEditable
    isActive
    isDisplayed
    isExtended
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetCodeItemQueryVariables,
  APITypes.GetCodeItemQuery
>;
export const listCodeItems = /* GraphQL */ `query ListCodeItems(
  $tenantCode: String
  $tableCodeItemCode: ModelCodeItemPrimaryCompositeKeyConditionInput
  $filter: ModelCodeItemFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listCodeItems(
    tenantCode: $tenantCode
    tableCodeItemCode: $tableCodeItemCode
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      tenantCode
      tableCode
      itemCode
      internalName
      internalDescription
      isEditable
      isActive
      isDisplayed
      isExtended
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCodeItemsQueryVariables,
  APITypes.ListCodeItemsQuery
>;
export const getLanguageItem = /* GraphQL */ `query GetLanguageItem(
  $languageCode: String!
  $tableCode: String!
  $itemCode: String!
) {
  getLanguageItem(
    languageCode: $languageCode
    tableCode: $tableCode
    itemCode: $itemCode
  ) {
    languageCode
    tableCode
    itemCode
    text
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetLanguageItemQueryVariables,
  APITypes.GetLanguageItemQuery
>;
export const listLanguageItems = /* GraphQL */ `query ListLanguageItems(
  $languageCode: String
  $tableCodeItemCode: ModelLanguageItemPrimaryCompositeKeyConditionInput
  $filter: ModelLanguageItemFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listLanguageItems(
    languageCode: $languageCode
    tableCodeItemCode: $tableCodeItemCode
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      languageCode
      tableCode
      itemCode
      text
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListLanguageItemsQueryVariables,
  APITypes.ListLanguageItemsQuery
>;
export const getChannel = /* GraphQL */ `query GetChannel($chatSpaceId: ID!, $id: ID!) {
  getChannel(chatSpaceId: $chatSpaceId, id: $id) {
    chatSpaceId
    id
    apiHost
    chatflowId
    name
    isLive
    admin
    members
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetChannelQueryVariables,
  APITypes.GetChannelQuery
>;
export const listChannels = /* GraphQL */ `query ListChannels(
  $chatSpaceId: ID
  $id: ModelIDKeyConditionInput
  $filter: ModelChannelFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listChannels(
    chatSpaceId: $chatSpaceId
    id: $id
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      chatSpaceId
      id
      apiHost
      chatflowId
      name
      isLive
      admin
      members
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListChannelsQueryVariables,
  APITypes.ListChannelsQuery
>;
export const getChannelDocument = /* GraphQL */ `query GetChannelDocument($channelId: ID!, $id: ID!) {
  getChannelDocument(channelId: $channelId, id: $id) {
    channelId
    id
    s3Key
    fileType
    fileName
    fileSize
    admin
    members
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetChannelDocumentQueryVariables,
  APITypes.GetChannelDocumentQuery
>;
export const listChannelDocuments = /* GraphQL */ `query ListChannelDocuments(
  $channelId: ID
  $id: ModelIDKeyConditionInput
  $filter: ModelChannelDocumentFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listChannelDocuments(
    channelId: $channelId
    id: $id
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      channelId
      id
      s3Key
      fileType
      fileName
      fileSize
      admin
      members
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListChannelDocumentsQueryVariables,
  APITypes.ListChannelDocumentsQuery
>;
export const getChatSpace = /* GraphQL */ `query GetChatSpace($ownerId: ID!, $id: ID!) {
  getChatSpace(ownerId: $ownerId, id: $id) {
    ownerId
    id
    name
    isPublic
    isMultiChannel
    defaultChannelId
    themeId
    language
    initialPrompts {
      display
      prompt
      __typename
    }
    theme {
      isDark
      navbarLogoUrl
      primaryColor
      primaryAccent
      textColor
      textSecondary
      onPrimary
      backgroundColor
      backgroundAccent
      backgroundImageUrl
      bubbleButtonColor
      bubbleButtonLogoUrl
      drawerBackground
      borderColor
      textInputTextColor
      textInputBackgroundColor
      surfaceBackground
      surfaceHoveredBackground
      __typename
    }
    settings {
      autoOpen
      __typename
    }
    admin
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetChatSpaceQueryVariables,
  APITypes.GetChatSpaceQuery
>;
export const listChatSpaces = /* GraphQL */ `query ListChatSpaces(
  $ownerId: ID
  $id: ModelIDKeyConditionInput
  $filter: ModelChatSpaceFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listChatSpaces(
    ownerId: $ownerId
    id: $id
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      ownerId
      id
      name
      isPublic
      isMultiChannel
      defaultChannelId
      themeId
      language
      initialPrompts {
        display
        prompt
        __typename
      }
      theme {
        isDark
        navbarLogoUrl
        primaryColor
        primaryAccent
        textColor
        textSecondary
        onPrimary
        backgroundColor
        backgroundAccent
        backgroundImageUrl
        bubbleButtonColor
        bubbleButtonLogoUrl
        drawerBackground
        borderColor
        textInputTextColor
        textInputBackgroundColor
        surfaceBackground
        surfaceHoveredBackground
        __typename
      }
      settings {
        autoOpen
        __typename
      }
      admin
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListChatSpacesQueryVariables,
  APITypes.ListChatSpacesQuery
>;
export const getOrganization = /* GraphQL */ `query GetOrganization($id: ID!) {
  getOrganization(id: $id) {
    id
    name
    logo
    admin
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetOrganizationQueryVariables,
  APITypes.GetOrganizationQuery
>;
export const listOrganizations = /* GraphQL */ `query ListOrganizations(
  $filter: ModelOrganizationFilterInput
  $limit: Int
  $nextToken: String
) {
  listOrganizations(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      logo
      admin
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListOrganizationsQueryVariables,
  APITypes.ListOrganizationsQuery
>;
export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    email
    cognitoId
    organizationId
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listUsers = /* GraphQL */ `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      email
      cognitoId
      organizationId
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
