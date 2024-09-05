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
    apiKey
    name
    subtitle
    avatar
    description
    shouldUseFraiaAPI
    botDisplayName
    initialPrompts {
      display
      prompt
      __typename
    }
    overrideConfig {
      chatflowId
      apiHost
      apiKey
      topK
      responsePrompt
      rephrasePrompt
      temperature
      elevenLabsVoiceId
      heygenVoiceId
      heygenAvatarId
      whisperVoiceId
      voiceMode
      __typename
    }
    isPublic
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
      apiKey
      name
      subtitle
      avatar
      description
      shouldUseFraiaAPI
      botDisplayName
      initialPrompts {
        display
        prompt
        __typename
      }
      overrideConfig {
        chatflowId
        apiHost
        apiKey
        topK
        responsePrompt
        rephrasePrompt
        temperature
        elevenLabsVoiceId
        heygenVoiceId
        heygenAvatarId
        whisperVoiceId
        voiceMode
        __typename
      }
      isPublic
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
      apiKey
      name
      subtitle
      avatar
      description
      shouldUseFraiaAPI
      botDisplayName
      initialPrompts {
        display
        prompt
        __typename
      }
      overrideConfig {
        chatflowId
        apiHost
        apiKey
        topK
        responsePrompt
        rephrasePrompt
        temperature
        elevenLabsVoiceId
        heygenVoiceId
        heygenAvatarId
        whisperVoiceId
        voiceMode
        __typename
      }
      isPublic
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
    chatSpaceId
    channelHostId
    channelHostType
    accessType
    channelName
    channelDescription
    channelSubtitle
    channelAvatar
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
      chatSpaceId
      channelHostId
      channelHostType
      accessType
      channelName
      channelDescription
      channelSubtitle
      channelAvatar
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
export const channelUserAccessByChannelId = /* GraphQL */ `query ChannelUserAccessByChannelId(
  $channelId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelChannelUserAccessFilterInput
  $limit: Int
  $nextToken: String
) {
  channelUserAccessByChannelId(
    channelId: $channelId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      accessId
      channelId
      chatSpaceId
      channelHostId
      channelHostType
      accessType
      channelName
      channelDescription
      channelSubtitle
      channelAvatar
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
  APITypes.ChannelUserAccessByChannelIdQueryVariables,
  APITypes.ChannelUserAccessByChannelIdQuery
>;
export const channelUserAccessByChannelHostId = /* GraphQL */ `query ChannelUserAccessByChannelHostId(
  $channelHostId: String!
  $sortDirection: ModelSortDirection
  $filter: ModelChannelUserAccessFilterInput
  $limit: Int
  $nextToken: String
) {
  channelUserAccessByChannelHostId(
    channelHostId: $channelHostId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      accessId
      channelId
      chatSpaceId
      channelHostId
      channelHostType
      accessType
      channelName
      channelDescription
      channelSubtitle
      channelAvatar
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
  APITypes.ChannelUserAccessByChannelHostIdQueryVariables,
  APITypes.ChannelUserAccessByChannelHostIdQuery
>;
export const getChannelDocument = /* GraphQL */ `query GetChannelDocument($channelId: ID!, $id: ID!) {
  getChannelDocument(channelId: $channelId, id: $id) {
    channelId
    id
    title
    s3KeyRawText
    s3KeyOriginal
    description
    includeInLibrary
    documentType
    source
    fileName
    fileType
    fileSuffix
    fileSize
    uploadedBy
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
      title
      s3KeyRawText
      s3KeyOriginal
      description
      includeInLibrary
      documentType
      source
      fileName
      fileType
      fileSuffix
      fileSize
      uploadedBy
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
export const getChannelHistoryItem = /* GraphQL */ `query GetChannelHistoryItem(
  $ownerId: ID!
  $channelId: ID!
  $timestamp: AWSDateTime!
) {
  getChannelHistoryItem(
    ownerId: $ownerId
    channelId: $channelId
    timestamp: $timestamp
  ) {
    ownerId
    channelId
    timestamp
    question
    answer
    resources {
      id
      source
      type
      value
      header
      description
      thumbnail
      __typename
    }
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetChannelHistoryItemQueryVariables,
  APITypes.GetChannelHistoryItemQuery
>;
export const listChannelHistoryItems = /* GraphQL */ `query ListChannelHistoryItems(
  $ownerId: ID
  $channelIdTimestamp: ModelChannelHistoryItemPrimaryCompositeKeyConditionInput
  $filter: ModelChannelHistoryItemFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listChannelHistoryItems(
    ownerId: $ownerId
    channelIdTimestamp: $channelIdTimestamp
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      ownerId
      channelId
      timestamp
      question
      answer
      resources {
        id
        source
        type
        value
        header
        description
        thumbnail
        __typename
      }
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListChannelHistoryItemsQueryVariables,
  APITypes.ListChannelHistoryItemsQuery
>;
export const channelHistoryItemsByChannelId = /* GraphQL */ `query ChannelHistoryItemsByChannelId(
  $channelId: ID!
  $timestamp: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelChannelHistoryItemFilterInput
  $limit: Int
  $nextToken: String
) {
  channelHistoryItemsByChannelId(
    channelId: $channelId
    timestamp: $timestamp
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      ownerId
      channelId
      timestamp
      question
      answer
      resources {
        id
        source
        type
        value
        header
        description
        thumbnail
        __typename
      }
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ChannelHistoryItemsByChannelIdQueryVariables,
  APITypes.ChannelHistoryItemsByChannelIdQuery
>;
export const getChatSpace = /* GraphQL */ `query GetChatSpace($id: ID!) {
  getChatSpace(id: $id) {
    id
    hostId
    hostType
    chatMode
    name
    isPublic
    isMultiChannel
    defaultChannelId
    isOneClick
    themeId
    defaultLanguage
    theme {
      isDark
      navbarLogoUrl
      primaryColor
      primaryAccent
      textColor
      textSecondary
      onPrimary
      errorColor
      backgroundColor
      backgroundAccent
      backgroundImageUrl
      backgroundOverlay
      bubbleButtonColor
      bubbleButtonLogoUrl
      overridePortalButtonUrl
      drawerBackground
      borderColor
      textInputTextColor
      textInputBackgroundColor
      surfaceBackground
      surfaceSoftBackground
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
    admin
    database
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
      hostId
      hostType
      chatMode
      name
      isPublic
      isMultiChannel
      defaultChannelId
      isOneClick
      themeId
      defaultLanguage
      theme {
        isDark
        navbarLogoUrl
        primaryColor
        primaryAccent
        textColor
        textSecondary
        onPrimary
        errorColor
        backgroundColor
        backgroundAccent
        backgroundImageUrl
        backgroundOverlay
        bubbleButtonColor
        bubbleButtonLogoUrl
        overridePortalButtonUrl
        drawerBackground
        borderColor
        textInputTextColor
        textInputBackgroundColor
        surfaceBackground
        surfaceSoftBackground
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
      admin
      database
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
export const chatSpaceByHostId = /* GraphQL */ `query ChatSpaceByHostId(
  $hostId: ID!
  $id: ModelIDKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelChatSpaceFilterInput
  $limit: Int
  $nextToken: String
) {
  chatSpaceByHostId(
    hostId: $hostId
    id: $id
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      hostId
      hostType
      chatMode
      name
      isPublic
      isMultiChannel
      defaultChannelId
      isOneClick
      themeId
      defaultLanguage
      theme {
        isDark
        navbarLogoUrl
        primaryColor
        primaryAccent
        textColor
        textSecondary
        onPrimary
        errorColor
        backgroundColor
        backgroundAccent
        backgroundImageUrl
        backgroundOverlay
        bubbleButtonColor
        bubbleButtonLogoUrl
        overridePortalButtonUrl
        drawerBackground
        borderColor
        textInputTextColor
        textInputBackgroundColor
        surfaceBackground
        surfaceSoftBackground
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
      admin
      database
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ChatSpaceByHostIdQueryVariables,
  APITypes.ChatSpaceByHostIdQuery
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
    organizationId
    chatSpaceId
    email
    cognitoId
    name
    owner
    invitedOn
    joinedOn
    status
    createdAt
    updatedAt
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
      organizationId
      chatSpaceId
      email
      cognitoId
      name
      owner
      invitedOn
      joinedOn
      status
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
export const userByOrganizationId = /* GraphQL */ `query UserByOrganizationId(
  $organizationId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  userByOrganizationId(
    organizationId: $organizationId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      organizationId
      chatSpaceId
      email
      cognitoId
      name
      owner
      invitedOn
      joinedOn
      status
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.UserByOrganizationIdQueryVariables,
  APITypes.UserByOrganizationIdQuery
>;
export const userByChatSpaceIdId = /* GraphQL */ `query UserByChatSpaceIdId(
  $chatSpaceId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  userByChatSpaceIdId(
    chatSpaceId: $chatSpaceId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      organizationId
      chatSpaceId
      email
      cognitoId
      name
      owner
      invitedOn
      joinedOn
      status
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.UserByChatSpaceIdIdQueryVariables,
  APITypes.UserByChatSpaceIdIdQuery
>;
export const getPrompt = /* GraphQL */ `query GetPrompt($associationId: ID!, $promptId: String!) {
  getPrompt(associationId: $associationId, promptId: $promptId) {
    associationId
    promptId
    prompt
    variables
    strategy {
      topK
      temperature
      model
      __typename
    }
    settings {
      chatflowId
      apiHost
      apiKey
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetPromptQueryVariables, APITypes.GetPromptQuery>;
export const listPrompts = /* GraphQL */ `query ListPrompts(
  $associationId: ID
  $promptId: ModelStringKeyConditionInput
  $filter: ModelPromptFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listPrompts(
    associationId: $associationId
    promptId: $promptId
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      associationId
      promptId
      prompt
      variables
      strategy {
        topK
        temperature
        model
        __typename
      }
      settings {
        chatflowId
        apiHost
        apiKey
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPromptsQueryVariables,
  APITypes.ListPromptsQuery
>;
export const getPromptVariable = /* GraphQL */ `query GetPromptVariable($promptId: String!, $variableId: String!) {
  getPromptVariable(promptId: $promptId, variableId: $variableId) {
    promptId
    variableId
    value
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetPromptVariableQueryVariables,
  APITypes.GetPromptVariableQuery
>;
export const listPromptVariables = /* GraphQL */ `query ListPromptVariables(
  $promptId: String
  $variableId: ModelStringKeyConditionInput
  $filter: ModelPromptVariableFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listPromptVariables(
    promptId: $promptId
    variableId: $variableId
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      promptId
      variableId
      value
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPromptVariablesQueryVariables,
  APITypes.ListPromptVariablesQuery
>;
export const getAgent = /* GraphQL */ `query GetAgent($associationId: ID!, $agentId: ID!) {
  getAgent(associationId: $associationId, agentId: $agentId) {
    associationId
    agentId
    name
    description
    schema
    actions {
      headers {
        key
        value
        __typename
      }
      endpoint
      input {
        name
        __typename
      }
      output {
        type
        fields {
          name
          __typename
        }
        __typename
      }
      __typename
    }
    responsePrompt
    isActive
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetAgentQueryVariables, APITypes.GetAgentQuery>;
export const listAgents = /* GraphQL */ `query ListAgents(
  $associationId: ID
  $agentId: ModelIDKeyConditionInput
  $filter: ModelAgentFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listAgents(
    associationId: $associationId
    agentId: $agentId
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      associationId
      agentId
      name
      description
      schema
      actions {
        headers {
          key
          value
          __typename
        }
        endpoint
        input {
          name
          __typename
        }
        output {
          type
          fields {
            name
            __typename
          }
          __typename
        }
        __typename
      }
      responsePrompt
      isActive
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListAgentsQueryVariables,
  APITypes.ListAgentsQuery
>;
export const getClientErrorLog = /* GraphQL */ `query GetClientErrorLog($logId: ID!) {
  getClientErrorLog(logId: $logId) {
    logId
    priority
    message
    error
    stack
    timestamp
    updatedAt
    context
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetClientErrorLogQueryVariables,
  APITypes.GetClientErrorLogQuery
>;
export const listClientErrorLogs = /* GraphQL */ `query ListClientErrorLogs(
  $logId: ID
  $filter: ModelClientErrorLogFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listClientErrorLogs(
    logId: $logId
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      logId
      priority
      message
      error
      stack
      timestamp
      updatedAt
      context
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListClientErrorLogsQueryVariables,
  APITypes.ListClientErrorLogsQuery
>;
export const clientErrorLogsByPriority = /* GraphQL */ `query ClientErrorLogsByPriority(
  $priority: Priority!
  $timestamp: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelClientErrorLogFilterInput
  $limit: Int
  $nextToken: String
) {
  clientErrorLogsByPriority(
    priority: $priority
    timestamp: $timestamp
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      logId
      priority
      message
      error
      stack
      timestamp
      updatedAt
      context
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ClientErrorLogsByPriorityQueryVariables,
  APITypes.ClientErrorLogsByPriorityQuery
>;
export const fetchChannels = /* GraphQL */ `query FetchChannels($input: FetchChannelsInput!) {
  fetchChannels(input: $input) {
    id
    chatSpaceId
    apiHost
    chatflowId
    apiKey
    name
    subtitle
    avatar
    description
    shouldUseFraiaAPI
    botDisplayName
    initialPrompts {
      display
      prompt
      __typename
    }
    overrideConfig {
      chatflowId
      apiHost
      apiKey
      topK
      responsePrompt
      rephrasePrompt
      temperature
      elevenLabsVoiceId
      heygenVoiceId
      heygenAvatarId
      whisperVoiceId
      voiceMode
      __typename
    }
    isPublic
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<
  APITypes.FetchChannelsQueryVariables,
  APITypes.FetchChannelsQuery
>;
