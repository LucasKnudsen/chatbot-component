/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./types";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const subscribe2channel = /* GraphQL */ `subscription Subscribe2channel($sessionId: String!) {
  subscribe2channel(sessionId: $sessionId) {
    sessionId
    data
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.Subscribe2channelSubscriptionVariables,
  APITypes.Subscribe2channelSubscription
>;
export const onCreateCodeItem = /* GraphQL */ `subscription OnCreateCodeItem($filter: ModelSubscriptionCodeItemFilterInput) {
  onCreateCodeItem(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateCodeItemSubscriptionVariables,
  APITypes.OnCreateCodeItemSubscription
>;
export const onUpdateCodeItem = /* GraphQL */ `subscription OnUpdateCodeItem($filter: ModelSubscriptionCodeItemFilterInput) {
  onUpdateCodeItem(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateCodeItemSubscriptionVariables,
  APITypes.OnUpdateCodeItemSubscription
>;
export const onDeleteCodeItem = /* GraphQL */ `subscription OnDeleteCodeItem($filter: ModelSubscriptionCodeItemFilterInput) {
  onDeleteCodeItem(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteCodeItemSubscriptionVariables,
  APITypes.OnDeleteCodeItemSubscription
>;
export const onCreateLanguageItem = /* GraphQL */ `subscription OnCreateLanguageItem(
  $filter: ModelSubscriptionLanguageItemFilterInput
) {
  onCreateLanguageItem(filter: $filter) {
    languageCode
    tableCode
    itemCode
    text
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateLanguageItemSubscriptionVariables,
  APITypes.OnCreateLanguageItemSubscription
>;
export const onUpdateLanguageItem = /* GraphQL */ `subscription OnUpdateLanguageItem(
  $filter: ModelSubscriptionLanguageItemFilterInput
) {
  onUpdateLanguageItem(filter: $filter) {
    languageCode
    tableCode
    itemCode
    text
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateLanguageItemSubscriptionVariables,
  APITypes.OnUpdateLanguageItemSubscription
>;
export const onDeleteLanguageItem = /* GraphQL */ `subscription OnDeleteLanguageItem(
  $filter: ModelSubscriptionLanguageItemFilterInput
) {
  onDeleteLanguageItem(filter: $filter) {
    languageCode
    tableCode
    itemCode
    text
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteLanguageItemSubscriptionVariables,
  APITypes.OnDeleteLanguageItemSubscription
>;
export const onCreateChannel = /* GraphQL */ `subscription OnCreateChannel(
  $filter: ModelSubscriptionChannelFilterInput
  $owner: String
) {
  onCreateChannel(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateChannelSubscriptionVariables,
  APITypes.OnCreateChannelSubscription
>;
export const onUpdateChannel = /* GraphQL */ `subscription OnUpdateChannel(
  $filter: ModelSubscriptionChannelFilterInput
  $owner: String
) {
  onUpdateChannel(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateChannelSubscriptionVariables,
  APITypes.OnUpdateChannelSubscription
>;
export const onDeleteChannel = /* GraphQL */ `subscription OnDeleteChannel(
  $filter: ModelSubscriptionChannelFilterInput
  $owner: String
) {
  onDeleteChannel(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteChannelSubscriptionVariables,
  APITypes.OnDeleteChannelSubscription
>;
export const onCreateChannelUserAccess = /* GraphQL */ `subscription OnCreateChannelUserAccess(
  $filter: ModelSubscriptionChannelUserAccessFilterInput
  $owner: String
) {
  onCreateChannelUserAccess(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateChannelUserAccessSubscriptionVariables,
  APITypes.OnCreateChannelUserAccessSubscription
>;
export const onUpdateChannelUserAccess = /* GraphQL */ `subscription OnUpdateChannelUserAccess(
  $filter: ModelSubscriptionChannelUserAccessFilterInput
  $owner: String
) {
  onUpdateChannelUserAccess(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateChannelUserAccessSubscriptionVariables,
  APITypes.OnUpdateChannelUserAccessSubscription
>;
export const onDeleteChannelUserAccess = /* GraphQL */ `subscription OnDeleteChannelUserAccess(
  $filter: ModelSubscriptionChannelUserAccessFilterInput
  $owner: String
) {
  onDeleteChannelUserAccess(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteChannelUserAccessSubscriptionVariables,
  APITypes.OnDeleteChannelUserAccessSubscription
>;
export const onCreateChannelDocument = /* GraphQL */ `subscription OnCreateChannelDocument(
  $filter: ModelSubscriptionChannelDocumentFilterInput
) {
  onCreateChannelDocument(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateChannelDocumentSubscriptionVariables,
  APITypes.OnCreateChannelDocumentSubscription
>;
export const onUpdateChannelDocument = /* GraphQL */ `subscription OnUpdateChannelDocument(
  $filter: ModelSubscriptionChannelDocumentFilterInput
) {
  onUpdateChannelDocument(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateChannelDocumentSubscriptionVariables,
  APITypes.OnUpdateChannelDocumentSubscription
>;
export const onDeleteChannelDocument = /* GraphQL */ `subscription OnDeleteChannelDocument(
  $filter: ModelSubscriptionChannelDocumentFilterInput
) {
  onDeleteChannelDocument(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteChannelDocumentSubscriptionVariables,
  APITypes.OnDeleteChannelDocumentSubscription
>;
export const onCreateChannelItem = /* GraphQL */ `subscription OnCreateChannelItem(
  $filter: ModelSubscriptionChannelItemFilterInput
  $owner: String
) {
  onCreateChannelItem(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateChannelItemSubscriptionVariables,
  APITypes.OnCreateChannelItemSubscription
>;
export const onUpdateChannelItem = /* GraphQL */ `subscription OnUpdateChannelItem(
  $filter: ModelSubscriptionChannelItemFilterInput
  $owner: String
) {
  onUpdateChannelItem(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateChannelItemSubscriptionVariables,
  APITypes.OnUpdateChannelItemSubscription
>;
export const onDeleteChannelItem = /* GraphQL */ `subscription OnDeleteChannelItem(
  $filter: ModelSubscriptionChannelItemFilterInput
  $owner: String
) {
  onDeleteChannelItem(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteChannelItemSubscriptionVariables,
  APITypes.OnDeleteChannelItemSubscription
>;
export const onCreateChatSpace = /* GraphQL */ `subscription OnCreateChatSpace($filter: ModelSubscriptionChatSpaceFilterInput) {
  onCreateChatSpace(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateChatSpaceSubscriptionVariables,
  APITypes.OnCreateChatSpaceSubscription
>;
export const onUpdateChatSpace = /* GraphQL */ `subscription OnUpdateChatSpace($filter: ModelSubscriptionChatSpaceFilterInput) {
  onUpdateChatSpace(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateChatSpaceSubscriptionVariables,
  APITypes.OnUpdateChatSpaceSubscription
>;
export const onDeleteChatSpace = /* GraphQL */ `subscription OnDeleteChatSpace($filter: ModelSubscriptionChatSpaceFilterInput) {
  onDeleteChatSpace(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteChatSpaceSubscriptionVariables,
  APITypes.OnDeleteChatSpaceSubscription
>;
export const onCreateOrganization = /* GraphQL */ `subscription OnCreateOrganization(
  $filter: ModelSubscriptionOrganizationFilterInput
) {
  onCreateOrganization(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateOrganizationSubscriptionVariables,
  APITypes.OnCreateOrganizationSubscription
>;
export const onUpdateOrganization = /* GraphQL */ `subscription OnUpdateOrganization(
  $filter: ModelSubscriptionOrganizationFilterInput
) {
  onUpdateOrganization(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateOrganizationSubscriptionVariables,
  APITypes.OnUpdateOrganizationSubscription
>;
export const onDeleteOrganization = /* GraphQL */ `subscription OnDeleteOrganization(
  $filter: ModelSubscriptionOrganizationFilterInput
) {
  onDeleteOrganization(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteOrganizationSubscriptionVariables,
  APITypes.OnDeleteOrganizationSubscription
>;
export const onCreateUser = /* GraphQL */ `subscription OnCreateUser(
  $filter: ModelSubscriptionUserFilterInput
  $owner: String
) {
  onCreateUser(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateUserSubscriptionVariables,
  APITypes.OnCreateUserSubscription
>;
export const onUpdateUser = /* GraphQL */ `subscription OnUpdateUser(
  $filter: ModelSubscriptionUserFilterInput
  $owner: String
) {
  onUpdateUser(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserSubscriptionVariables,
  APITypes.OnUpdateUserSubscription
>;
export const onDeleteUser = /* GraphQL */ `subscription OnDeleteUser(
  $filter: ModelSubscriptionUserFilterInput
  $owner: String
) {
  onDeleteUser(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserSubscriptionVariables,
  APITypes.OnDeleteUserSubscription
>;
