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
export const getChannel = /* GraphQL */ `query GetChannel($id: ID!) {
  getChannel(id: $id) {
    id
    chatSpaceId
    apiHost
    chatflowId
    name
    initialPrompts {
      display
      prompt
      __typename
    }
    isLive
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetChannelQueryVariables,
  APITypes.GetChannelQuery
>;
export const listChannels = /* GraphQL */ `query ListChannels(
  $filter: ModelChannelFilterInput
  $limit: Int
  $nextToken: String
) {
  listChannels(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      chatSpaceId
      apiHost
      chatflowId
      name
      initialPrompts {
        display
        prompt
        __typename
      }
      isLive
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
  APITypes.ListChannelsQueryVariables,
  APITypes.ListChannelsQuery
>;
export const channelsByChatSpaceId = /* GraphQL */ `query ChannelsByChatSpaceId(
  $chatSpaceId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelChannelFilterInput
  $limit: Int
  $nextToken: String
) {
  channelsByChatSpaceId(
    chatSpaceId: $chatSpaceId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      chatSpaceId
      apiHost
      chatflowId
      name
      initialPrompts {
        display
        prompt
        __typename
      }
      isLive
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
  APITypes.ChannelsByChatSpaceIdQueryVariables,
  APITypes.ChannelsByChatSpaceIdQuery
>;
export const getChannelUserAccess = /* GraphQL */ `query GetChannelUserAccess($accessId: String!, $channelId: ID!) {
  getChannelUserAccess(accessId: $accessId, channelId: $channelId) {
    accessId
    channelId
    channelOwnerId
    role
    channelName
    channelDescription
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetChannelUserAccessQueryVariables,
  APITypes.GetChannelUserAccessQuery
>;
export const listChannelUserAccesses = /* GraphQL */ `query ListChannelUserAccesses(
  $accessId: String
  $channelId: ModelIDKeyConditionInput
  $filter: ModelChannelUserAccessFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listChannelUserAccesses(
    accessId: $accessId
    channelId: $channelId
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      accessId
      channelId
      channelOwnerId
      role
      channelName
      channelDescription
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
  APITypes.ListChannelUserAccessesQueryVariables,
  APITypes.ListChannelUserAccessesQuery
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
export const getChannelItem = /* GraphQL */ `query GetChannelItem($ownerId: ID!, $channelId: ID!, $id: ID!) {
  getChannelItem(ownerId: $ownerId, channelId: $channelId, id: $id) {
    ownerId
    channelId
    id
    type
    content
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetChannelItemQueryVariables,
  APITypes.GetChannelItemQuery
>;
export const listChannelItems = /* GraphQL */ `query ListChannelItems(
  $ownerId: ID
  $channelIdId: ModelChannelItemPrimaryCompositeKeyConditionInput
  $filter: ModelChannelItemFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listChannelItems(
    ownerId: $ownerId
    channelIdId: $channelIdId
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      ownerId
      channelId
      id
      type
      content
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
  APITypes.ListChannelItemsQueryVariables,
  APITypes.ListChannelItemsQuery
>;
export const getChatSpace = /* GraphQL */ `query GetChatSpace($id: ID!) {
  getChatSpace(id: $id) {
    id
    hostType
    name
    isPublic
    isMultiChannel
    defaultChannelId
    themeId
    language
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
    text {
      welcomeMessage
      returnWelcomeMessage
      brandName
      inputPlaceholder
      suggestedPromptsTitle
      viewMedia
      close
      copyText
      copyTextSuccess
      share
      historyTabTitle
      navigationTabTitle
      today
      yesterday
      previous
      noHistory
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
  $filter: ModelChatSpaceFilterInput
  $limit: Int
  $nextToken: String
) {
  listChatSpaces(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      hostType
      name
      isPublic
      isMultiChannel
      defaultChannelId
      themeId
      language
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
      text {
        welcomeMessage
        returnWelcomeMessage
        brandName
        inputPlaceholder
        suggestedPromptsTitle
        viewMedia
        close
        copyText
        copyTextSuccess
        share
        historyTabTitle
        navigationTabTitle
        today
        yesterday
        previous
        noHistory
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
    email
    admin
    createdAt
    updatedAt
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
      email
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
  APITypes.ListOrganizationsQueryVariables,
  APITypes.ListOrganizationsQuery
>;
export const getUser = /* GraphQL */ `query GetUser($id: String!) {
  getUser(id: $id) {
    id
    email
    cognitoId
    roles
    organizationId
    chatSpaceId
    invitedOn
    joinedOn
    status
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listUsers = /* GraphQL */ `query ListUsers(
  $id: String
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listUsers(
    id: $id
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      id
      email
      cognitoId
      roles
      organizationId
      chatSpaceId
      invitedOn
      joinedOn
      status
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
export const chatSpaceByChatSpaceId = /* GraphQL */ `query ChatSpaceByChatSpaceId(
  $chatSpaceId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  chatSpaceByChatSpaceId(
    chatSpaceId: $chatSpaceId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      email
      cognitoId
      roles
      organizationId
      chatSpaceId
      invitedOn
      joinedOn
      status
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
  APITypes.ChatSpaceByChatSpaceIdQueryVariables,
  APITypes.ChatSpaceByChatSpaceIdQuery
>;
