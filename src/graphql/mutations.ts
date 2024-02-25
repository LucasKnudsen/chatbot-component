/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./types";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const publish2channel = /* GraphQL */ `mutation Publish2channel($sessionId: String!, $data: AWSJSON!) {
  publish2channel(sessionId: $sessionId, data: $data) {
    sessionId
    data
    __typename
  }
}
` as GeneratedMutation<
  APITypes.Publish2channelMutationVariables,
  APITypes.Publish2channelMutation
>;
export const createCodeItem = /* GraphQL */ `mutation CreateCodeItem(
  $input: CreateCodeItemInput!
  $condition: ModelCodeItemConditionInput
) {
  createCodeItem(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateCodeItemMutationVariables,
  APITypes.CreateCodeItemMutation
>;
export const updateCodeItem = /* GraphQL */ `mutation UpdateCodeItem(
  $input: UpdateCodeItemInput!
  $condition: ModelCodeItemConditionInput
) {
  updateCodeItem(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateCodeItemMutationVariables,
  APITypes.UpdateCodeItemMutation
>;
export const deleteCodeItem = /* GraphQL */ `mutation DeleteCodeItem(
  $input: DeleteCodeItemInput!
  $condition: ModelCodeItemConditionInput
) {
  deleteCodeItem(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteCodeItemMutationVariables,
  APITypes.DeleteCodeItemMutation
>;
export const createLanguageItem = /* GraphQL */ `mutation CreateLanguageItem(
  $input: CreateLanguageItemInput!
  $condition: ModelLanguageItemConditionInput
) {
  createLanguageItem(input: $input, condition: $condition) {
    languageCode
    tableCode
    itemCode
    text
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateLanguageItemMutationVariables,
  APITypes.CreateLanguageItemMutation
>;
export const updateLanguageItem = /* GraphQL */ `mutation UpdateLanguageItem(
  $input: UpdateLanguageItemInput!
  $condition: ModelLanguageItemConditionInput
) {
  updateLanguageItem(input: $input, condition: $condition) {
    languageCode
    tableCode
    itemCode
    text
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateLanguageItemMutationVariables,
  APITypes.UpdateLanguageItemMutation
>;
export const deleteLanguageItem = /* GraphQL */ `mutation DeleteLanguageItem(
  $input: DeleteLanguageItemInput!
  $condition: ModelLanguageItemConditionInput
) {
  deleteLanguageItem(input: $input, condition: $condition) {
    languageCode
    tableCode
    itemCode
    text
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteLanguageItemMutationVariables,
  APITypes.DeleteLanguageItemMutation
>;
export const createChannel = /* GraphQL */ `mutation CreateChannel(
  $input: CreateChannelInput!
  $condition: ModelChannelConditionInput
) {
  createChannel(input: $input, condition: $condition) {
    id
    chatSpaceId
    apiHost
    chatflowId
    indexChatflowId
    apiKey
    name
    subtitle
    avatar
    description
    initialPrompts {
      display
      prompt
      __typename
    }
    isPublic
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateChannelMutationVariables,
  APITypes.CreateChannelMutation
>;
export const updateChannel = /* GraphQL */ `mutation UpdateChannel(
  $input: UpdateChannelInput!
  $condition: ModelChannelConditionInput
) {
  updateChannel(input: $input, condition: $condition) {
    id
    chatSpaceId
    apiHost
    chatflowId
    indexChatflowId
    apiKey
    name
    subtitle
    avatar
    description
    initialPrompts {
      display
      prompt
      __typename
    }
    isPublic
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateChannelMutationVariables,
  APITypes.UpdateChannelMutation
>;
export const deleteChannel = /* GraphQL */ `mutation DeleteChannel(
  $input: DeleteChannelInput!
  $condition: ModelChannelConditionInput
) {
  deleteChannel(input: $input, condition: $condition) {
    id
    chatSpaceId
    apiHost
    chatflowId
    indexChatflowId
    apiKey
    name
    subtitle
    avatar
    description
    initialPrompts {
      display
      prompt
      __typename
    }
    isPublic
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteChannelMutationVariables,
  APITypes.DeleteChannelMutation
>;
export const createChannelUserAccess = /* GraphQL */ `mutation CreateChannelUserAccess(
  $input: CreateChannelUserAccessInput!
  $condition: ModelChannelUserAccessConditionInput
) {
  createChannelUserAccess(input: $input, condition: $condition) {
    accessId
    channelId
    chatSpaceId
    channelHostId
    channelHostType
    accessType
    channelName
    channelDescription
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateChannelUserAccessMutationVariables,
  APITypes.CreateChannelUserAccessMutation
>;
export const updateChannelUserAccess = /* GraphQL */ `mutation UpdateChannelUserAccess(
  $input: UpdateChannelUserAccessInput!
  $condition: ModelChannelUserAccessConditionInput
) {
  updateChannelUserAccess(input: $input, condition: $condition) {
    accessId
    channelId
    chatSpaceId
    channelHostId
    channelHostType
    accessType
    channelName
    channelDescription
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateChannelUserAccessMutationVariables,
  APITypes.UpdateChannelUserAccessMutation
>;
export const deleteChannelUserAccess = /* GraphQL */ `mutation DeleteChannelUserAccess(
  $input: DeleteChannelUserAccessInput!
  $condition: ModelChannelUserAccessConditionInput
) {
  deleteChannelUserAccess(input: $input, condition: $condition) {
    accessId
    channelId
    chatSpaceId
    channelHostId
    channelHostType
    accessType
    channelName
    channelDescription
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteChannelUserAccessMutationVariables,
  APITypes.DeleteChannelUserAccessMutation
>;
export const createChannelDocument = /* GraphQL */ `mutation CreateChannelDocument(
  $input: CreateChannelDocumentInput!
  $condition: ModelChannelDocumentConditionInput
) {
  createChannelDocument(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateChannelDocumentMutationVariables,
  APITypes.CreateChannelDocumentMutation
>;
export const updateChannelDocument = /* GraphQL */ `mutation UpdateChannelDocument(
  $input: UpdateChannelDocumentInput!
  $condition: ModelChannelDocumentConditionInput
) {
  updateChannelDocument(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateChannelDocumentMutationVariables,
  APITypes.UpdateChannelDocumentMutation
>;
export const deleteChannelDocument = /* GraphQL */ `mutation DeleteChannelDocument(
  $input: DeleteChannelDocumentInput!
  $condition: ModelChannelDocumentConditionInput
) {
  deleteChannelDocument(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteChannelDocumentMutationVariables,
  APITypes.DeleteChannelDocumentMutation
>;
export const createChannelHistoryItem = /* GraphQL */ `mutation CreateChannelHistoryItem(
  $input: CreateChannelHistoryItemInput!
  $condition: ModelChannelHistoryItemConditionInput
) {
  createChannelHistoryItem(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateChannelHistoryItemMutationVariables,
  APITypes.CreateChannelHistoryItemMutation
>;
export const updateChannelHistoryItem = /* GraphQL */ `mutation UpdateChannelHistoryItem(
  $input: UpdateChannelHistoryItemInput!
  $condition: ModelChannelHistoryItemConditionInput
) {
  updateChannelHistoryItem(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateChannelHistoryItemMutationVariables,
  APITypes.UpdateChannelHistoryItemMutation
>;
export const deleteChannelHistoryItem = /* GraphQL */ `mutation DeleteChannelHistoryItem(
  $input: DeleteChannelHistoryItemInput!
  $condition: ModelChannelHistoryItemConditionInput
) {
  deleteChannelHistoryItem(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteChannelHistoryItemMutationVariables,
  APITypes.DeleteChannelHistoryItemMutation
>;
export const createChatSpace = /* GraphQL */ `mutation CreateChatSpace(
  $input: CreateChatSpaceInput!
  $condition: ModelChatSpaceConditionInput
) {
  createChatSpace(input: $input, condition: $condition) {
    id
    hostId
    hostType
    name
    isPublic
    isMultiChannel
    defaultChannelId
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
    admin
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateChatSpaceMutationVariables,
  APITypes.CreateChatSpaceMutation
>;
export const updateChatSpace = /* GraphQL */ `mutation UpdateChatSpace(
  $input: UpdateChatSpaceInput!
  $condition: ModelChatSpaceConditionInput
) {
  updateChatSpace(input: $input, condition: $condition) {
    id
    hostId
    hostType
    name
    isPublic
    isMultiChannel
    defaultChannelId
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
    admin
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateChatSpaceMutationVariables,
  APITypes.UpdateChatSpaceMutation
>;
export const deleteChatSpace = /* GraphQL */ `mutation DeleteChatSpace(
  $input: DeleteChatSpaceInput!
  $condition: ModelChatSpaceConditionInput
) {
  deleteChatSpace(input: $input, condition: $condition) {
    id
    hostId
    hostType
    name
    isPublic
    isMultiChannel
    defaultChannelId
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
    admin
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteChatSpaceMutationVariables,
  APITypes.DeleteChatSpaceMutation
>;
export const createOrganization = /* GraphQL */ `mutation CreateOrganization(
  $input: CreateOrganizationInput!
  $condition: ModelOrganizationConditionInput
) {
  createOrganization(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateOrganizationMutationVariables,
  APITypes.CreateOrganizationMutation
>;
export const updateOrganization = /* GraphQL */ `mutation UpdateOrganization(
  $input: UpdateOrganizationInput!
  $condition: ModelOrganizationConditionInput
) {
  updateOrganization(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateOrganizationMutationVariables,
  APITypes.UpdateOrganizationMutation
>;
export const deleteOrganization = /* GraphQL */ `mutation DeleteOrganization(
  $input: DeleteOrganizationInput!
  $condition: ModelOrganizationConditionInput
) {
  deleteOrganization(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteOrganizationMutationVariables,
  APITypes.DeleteOrganizationMutation
>;
export const createUser = /* GraphQL */ `mutation CreateUser(
  $input: CreateUserInput!
  $condition: ModelUserConditionInput
) {
  createUser(input: $input, condition: $condition) {
    id
    organizationId
    chatSpaceId
    email
    cognitoId
    name
    invitedOn
    joinedOn
    status
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const updateUser = /* GraphQL */ `mutation UpdateUser(
  $input: UpdateUserInput!
  $condition: ModelUserConditionInput
) {
  updateUser(input: $input, condition: $condition) {
    id
    organizationId
    chatSpaceId
    email
    cognitoId
    name
    invitedOn
    joinedOn
    status
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserMutationVariables,
  APITypes.UpdateUserMutation
>;
export const deleteUser = /* GraphQL */ `mutation DeleteUser(
  $input: DeleteUserInput!
  $condition: ModelUserConditionInput
) {
  deleteUser(input: $input, condition: $condition) {
    id
    organizationId
    chatSpaceId
    email
    cognitoId
    name
    invitedOn
    joinedOn
    status
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
export const handleChannels = /* GraphQL */ `mutation HandleChannels($input: HandleChannelsInput!) {
  handleChannels(input: $input) {
    id
    chatSpaceId
    apiHost
    chatflowId
    indexChatflowId
    apiKey
    name
    subtitle
    avatar
    description
    initialPrompts {
      display
      prompt
      __typename
    }
    isPublic
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.HandleChannelsMutationVariables,
  APITypes.HandleChannelsMutation
>;
export const handleChannelDocuments = /* GraphQL */ `mutation HandleChannelDocuments($input: HandleChannelsInput!) {
  handleChannelDocuments(input: $input) {
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
` as GeneratedMutation<
  APITypes.HandleChannelDocumentsMutationVariables,
  APITypes.HandleChannelDocumentsMutation
>;
export const handleChannelHistory = /* GraphQL */ `mutation HandleChannelHistory($input: HandleChannelHistoryInput!) {
  handleChannelHistory(input: $input) {
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
` as GeneratedMutation<
  APITypes.HandleChannelHistoryMutationVariables,
  APITypes.HandleChannelHistoryMutation
>;
export const handleStorage = /* GraphQL */ `mutation HandleStorage($input: HandleStorageInput!) {
  handleStorage(input: $input) {
    signedUrls
    __typename
  }
}
` as GeneratedMutation<
  APITypes.HandleStorageMutationVariables,
  APITypes.HandleStorageMutation
>;
export const indexKnowledge = /* GraphQL */ `mutation IndexKnowledge($input: AWSJSON!) {
  indexKnowledge(input: $input) {
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
` as GeneratedMutation<
  APITypes.IndexKnowledgeMutationVariables,
  APITypes.IndexKnowledgeMutation
>;
