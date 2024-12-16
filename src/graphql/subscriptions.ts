/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./types";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

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
    apiKey
    name
    subtitle
    avatar
    description
    defaultChatMode
    defaultVoiceMode
    defaultEntryAgentId
    shouldUseFraiaAPI
    botDisplayName
    welcomeText
    welcomeBackText
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
    apiKey
    name
    subtitle
    avatar
    description
    defaultChatMode
    defaultVoiceMode
    defaultEntryAgentId
    shouldUseFraiaAPI
    botDisplayName
    welcomeText
    welcomeBackText
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
    apiKey
    name
    subtitle
    avatar
    description
    defaultChatMode
    defaultVoiceMode
    defaultEntryAgentId
    shouldUseFraiaAPI
    botDisplayName
    welcomeText
    welcomeBackText
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
` as GeneratedSubscription<
  APITypes.OnDeleteChannelDocumentSubscriptionVariables,
  APITypes.OnDeleteChannelDocumentSubscription
>;
export const onCreateChannelHistoryItem = /* GraphQL */ `subscription OnCreateChannelHistoryItem(
  $filter: ModelSubscriptionChannelHistoryItemFilterInput
  $owner: String
) {
  onCreateChannelHistoryItem(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateChannelHistoryItemSubscriptionVariables,
  APITypes.OnCreateChannelHistoryItemSubscription
>;
export const onUpdateChannelHistoryItem = /* GraphQL */ `subscription OnUpdateChannelHistoryItem(
  $filter: ModelSubscriptionChannelHistoryItemFilterInput
  $owner: String
) {
  onUpdateChannelHistoryItem(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateChannelHistoryItemSubscriptionVariables,
  APITypes.OnUpdateChannelHistoryItemSubscription
>;
export const onDeleteChannelHistoryItem = /* GraphQL */ `subscription OnDeleteChannelHistoryItem(
  $filter: ModelSubscriptionChannelHistoryItemFilterInput
  $owner: String
) {
  onDeleteChannelHistoryItem(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteChannelHistoryItemSubscriptionVariables,
  APITypes.OnDeleteChannelHistoryItemSubscription
>;
export const onCreateChatSpace = /* GraphQL */ `subscription OnCreateChatSpace($filter: ModelSubscriptionChatSpaceFilterInput) {
  onCreateChatSpace(filter: $filter) {
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
    settings {
      isSpeechBubbleEnabled
      speechBubbleDelay
      speechBubbleText
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
` as GeneratedSubscription<
  APITypes.OnCreateChatSpaceSubscriptionVariables,
  APITypes.OnCreateChatSpaceSubscription
>;
export const onUpdateChatSpace = /* GraphQL */ `subscription OnUpdateChatSpace($filter: ModelSubscriptionChatSpaceFilterInput) {
  onUpdateChatSpace(filter: $filter) {
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
    settings {
      isSpeechBubbleEnabled
      speechBubbleDelay
      speechBubbleText
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
` as GeneratedSubscription<
  APITypes.OnUpdateChatSpaceSubscriptionVariables,
  APITypes.OnUpdateChatSpaceSubscription
>;
export const onDeleteChatSpace = /* GraphQL */ `subscription OnDeleteChatSpace($filter: ModelSubscriptionChatSpaceFilterInput) {
  onDeleteChatSpace(filter: $filter) {
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
    settings {
      isSpeechBubbleEnabled
      speechBubbleDelay
      speechBubbleText
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserSubscriptionVariables,
  APITypes.OnDeleteUserSubscription
>;
export const onCreatePrompt = /* GraphQL */ `subscription OnCreatePrompt($filter: ModelSubscriptionPromptFilterInput) {
  onCreatePrompt(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreatePromptSubscriptionVariables,
  APITypes.OnCreatePromptSubscription
>;
export const onUpdatePrompt = /* GraphQL */ `subscription OnUpdatePrompt($filter: ModelSubscriptionPromptFilterInput) {
  onUpdatePrompt(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdatePromptSubscriptionVariables,
  APITypes.OnUpdatePromptSubscription
>;
export const onDeletePrompt = /* GraphQL */ `subscription OnDeletePrompt($filter: ModelSubscriptionPromptFilterInput) {
  onDeletePrompt(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeletePromptSubscriptionVariables,
  APITypes.OnDeletePromptSubscription
>;
export const onCreatePromptVariable = /* GraphQL */ `subscription OnCreatePromptVariable(
  $filter: ModelSubscriptionPromptVariableFilterInput
) {
  onCreatePromptVariable(filter: $filter) {
    promptId
    variableId
    value
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreatePromptVariableSubscriptionVariables,
  APITypes.OnCreatePromptVariableSubscription
>;
export const onUpdatePromptVariable = /* GraphQL */ `subscription OnUpdatePromptVariable(
  $filter: ModelSubscriptionPromptVariableFilterInput
) {
  onUpdatePromptVariable(filter: $filter) {
    promptId
    variableId
    value
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdatePromptVariableSubscriptionVariables,
  APITypes.OnUpdatePromptVariableSubscription
>;
export const onDeletePromptVariable = /* GraphQL */ `subscription OnDeletePromptVariable(
  $filter: ModelSubscriptionPromptVariableFilterInput
) {
  onDeletePromptVariable(filter: $filter) {
    promptId
    variableId
    value
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeletePromptVariableSubscriptionVariables,
  APITypes.OnDeletePromptVariableSubscription
>;
export const onCreateAgent = /* GraphQL */ `subscription OnCreateAgent($filter: ModelSubscriptionAgentFilterInput) {
  onCreateAgent(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateAgentSubscriptionVariables,
  APITypes.OnCreateAgentSubscription
>;
export const onUpdateAgent = /* GraphQL */ `subscription OnUpdateAgent($filter: ModelSubscriptionAgentFilterInput) {
  onUpdateAgent(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateAgentSubscriptionVariables,
  APITypes.OnUpdateAgentSubscription
>;
export const onDeleteAgent = /* GraphQL */ `subscription OnDeleteAgent($filter: ModelSubscriptionAgentFilterInput) {
  onDeleteAgent(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteAgentSubscriptionVariables,
  APITypes.OnDeleteAgentSubscription
>;
export const onCreateClientErrorLog = /* GraphQL */ `subscription OnCreateClientErrorLog(
  $filter: ModelSubscriptionClientErrorLogFilterInput
) {
  onCreateClientErrorLog(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateClientErrorLogSubscriptionVariables,
  APITypes.OnCreateClientErrorLogSubscription
>;
export const onUpdateClientErrorLog = /* GraphQL */ `subscription OnUpdateClientErrorLog(
  $filter: ModelSubscriptionClientErrorLogFilterInput
) {
  onUpdateClientErrorLog(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateClientErrorLogSubscriptionVariables,
  APITypes.OnUpdateClientErrorLogSubscription
>;
export const onDeleteClientErrorLog = /* GraphQL */ `subscription OnDeleteClientErrorLog(
  $filter: ModelSubscriptionClientErrorLogFilterInput
) {
  onDeleteClientErrorLog(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteClientErrorLogSubscriptionVariables,
  APITypes.OnDeleteClientErrorLogSubscription
>;
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
