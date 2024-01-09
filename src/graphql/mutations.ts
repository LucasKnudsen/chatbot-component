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
` as GeneratedMutation<
  APITypes.CreateChannelMutationVariables,
  APITypes.CreateChannelMutation
>;
export const updateChannel = /* GraphQL */ `mutation UpdateChannel(
  $input: UpdateChannelInput!
  $condition: ModelChannelConditionInput
) {
  updateChannel(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateChannelMutationVariables,
  APITypes.UpdateChannelMutation
>;
export const deleteChannel = /* GraphQL */ `mutation DeleteChannel(
  $input: DeleteChannelInput!
  $condition: ModelChannelConditionInput
) {
  deleteChannel(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteChannelMutationVariables,
  APITypes.DeleteChannelMutation
>;
export const createChannelDocument = /* GraphQL */ `mutation CreateChannelDocument(
  $input: CreateChannelDocumentInput!
  $condition: ModelChannelDocumentConditionInput
) {
  createChannelDocument(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteChannelDocumentMutationVariables,
  APITypes.DeleteChannelDocumentMutation
>;
export const createChatSpace = /* GraphQL */ `mutation CreateChatSpace(
  $input: CreateChatSpaceInput!
  $condition: ModelChatSpaceConditionInput
) {
  createChatSpace(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateChatSpaceMutationVariables,
  APITypes.CreateChatSpaceMutation
>;
export const updateChatSpace = /* GraphQL */ `mutation UpdateChatSpace(
  $input: UpdateChatSpaceInput!
  $condition: ModelChatSpaceConditionInput
) {
  updateChatSpace(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateChatSpaceMutationVariables,
  APITypes.UpdateChatSpaceMutation
>;
export const deleteChatSpace = /* GraphQL */ `mutation DeleteChatSpace(
  $input: DeleteChatSpaceInput!
  $condition: ModelChatSpaceConditionInput
) {
  deleteChatSpace(input: $input, condition: $condition) {
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
    admin
    createdAt
    updatedAt
    owner
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
    admin
    createdAt
    updatedAt
    owner
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
    admin
    createdAt
    updatedAt
    owner
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
    email
    cognitoId
    organizationId
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
    email
    cognitoId
    organizationId
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
    email
    cognitoId
    organizationId
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
