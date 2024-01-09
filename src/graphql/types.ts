/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type SubscriptionEvent = {
  __typename: "SubscriptionEvent",
  sessionId: string,
  data: string,
};

export type CreateCodeItemInput = {
  tenantCode: string,
  tableCode: string,
  itemCode: string,
  internalName: string,
  internalDescription?: string | null,
  isEditable: boolean,
  isActive: boolean,
  isDisplayed?: boolean | null,
  isExtended?: boolean | null,
};

export type ModelCodeItemConditionInput = {
  internalName?: ModelStringInput | null,
  internalDescription?: ModelStringInput | null,
  isEditable?: ModelBooleanInput | null,
  isActive?: ModelBooleanInput | null,
  isDisplayed?: ModelBooleanInput | null,
  isExtended?: ModelBooleanInput | null,
  and?: Array< ModelCodeItemConditionInput | null > | null,
  or?: Array< ModelCodeItemConditionInput | null > | null,
  not?: ModelCodeItemConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type CodeItem = {
  __typename: "CodeItem",
  tenantCode: string,
  tableCode: string,
  itemCode: string,
  internalName: string,
  internalDescription?: string | null,
  isEditable: boolean,
  isActive: boolean,
  isDisplayed?: boolean | null,
  isExtended?: boolean | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateCodeItemInput = {
  tenantCode: string,
  tableCode: string,
  itemCode: string,
  internalName?: string | null,
  internalDescription?: string | null,
  isEditable?: boolean | null,
  isActive?: boolean | null,
  isDisplayed?: boolean | null,
  isExtended?: boolean | null,
};

export type DeleteCodeItemInput = {
  tenantCode: string,
  tableCode: string,
  itemCode: string,
};

export type CreateLanguageItemInput = {
  languageCode: string,
  tableCode: string,
  itemCode: string,
  text: string,
};

export type ModelLanguageItemConditionInput = {
  text?: ModelStringInput | null,
  and?: Array< ModelLanguageItemConditionInput | null > | null,
  or?: Array< ModelLanguageItemConditionInput | null > | null,
  not?: ModelLanguageItemConditionInput | null,
};

export type LanguageItem = {
  __typename: "LanguageItem",
  languageCode: string,
  tableCode: string,
  itemCode: string,
  text: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateLanguageItemInput = {
  languageCode: string,
  tableCode: string,
  itemCode: string,
  text?: string | null,
};

export type DeleteLanguageItemInput = {
  languageCode: string,
  tableCode: string,
  itemCode: string,
};

export type CreateChannelInput = {
  chatSpaceId: string,
  id?: string | null,
  apiHost?: string | null,
  chatflowId?: string | null,
  name: string,
  isLive: boolean,
  admin: string,
  members?: Array< string > | null,
};

export type ModelChannelConditionInput = {
  apiHost?: ModelStringInput | null,
  chatflowId?: ModelStringInput | null,
  name?: ModelStringInput | null,
  isLive?: ModelBooleanInput | null,
  admin?: ModelStringInput | null,
  members?: ModelStringInput | null,
  and?: Array< ModelChannelConditionInput | null > | null,
  or?: Array< ModelChannelConditionInput | null > | null,
  not?: ModelChannelConditionInput | null,
};

export type Channel = {
  __typename: "Channel",
  chatSpaceId: string,
  id: string,
  apiHost?: string | null,
  chatflowId?: string | null,
  name: string,
  isLive: boolean,
  admin: string,
  members?: Array< string > | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateChannelInput = {
  chatSpaceId: string,
  id: string,
  apiHost?: string | null,
  chatflowId?: string | null,
  name?: string | null,
  isLive?: boolean | null,
  admin?: string | null,
  members?: Array< string > | null,
};

export type DeleteChannelInput = {
  chatSpaceId: string,
  id: string,
};

export type CreateChannelDocumentInput = {
  channelId: string,
  id?: string | null,
  s3Key?: string | null,
  fileType?: string | null,
  fileName?: string | null,
  fileSize?: number | null,
  admin: string,
  members?: Array< string > | null,
};

export type ModelChannelDocumentConditionInput = {
  s3Key?: ModelStringInput | null,
  fileType?: ModelStringInput | null,
  fileName?: ModelStringInput | null,
  fileSize?: ModelIntInput | null,
  admin?: ModelStringInput | null,
  members?: ModelStringInput | null,
  and?: Array< ModelChannelDocumentConditionInput | null > | null,
  or?: Array< ModelChannelDocumentConditionInput | null > | null,
  not?: ModelChannelDocumentConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ChannelDocument = {
  __typename: "ChannelDocument",
  channelId: string,
  id: string,
  s3Key?: string | null,
  fileType?: string | null,
  fileName?: string | null,
  fileSize?: number | null,
  admin: string,
  members?: Array< string > | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateChannelDocumentInput = {
  channelId: string,
  id: string,
  s3Key?: string | null,
  fileType?: string | null,
  fileName?: string | null,
  fileSize?: number | null,
  admin?: string | null,
  members?: Array< string > | null,
};

export type DeleteChannelDocumentInput = {
  channelId: string,
  id: string,
};

export type CreateChatSpaceInput = {
  ownerId: string,
  id?: string | null,
  name: string,
  isPublic: boolean,
  isMultiChannel: boolean,
  defaultChannelId?: string | null,
  themeId?: string | null,
  language?: string | null,
  initialPrompts?: Array< InitialPromptInput > | null,
  theme?: ChatSpaceThemeInput | null,
  text?: ChatSpaceTextInput | null,
  settings: ChatSpaceSettingsInput,
  admin: string,
};

export type InitialPromptInput = {
  display?: string | null,
  prompt: string,
};

export type ChatSpaceThemeInput = {
  isDark?: boolean | null,
  navbarLogoUrl?: string | null,
  primaryColor?: string | null,
  primaryAccent?: string | null,
  textColor?: string | null,
  textSecondary?: string | null,
  onPrimary?: string | null,
  backgroundColor?: string | null,
  backgroundAccent?: string | null,
  backgroundImageUrl?: string | null,
  bubbleButtonColor?: string | null,
  bubbleButtonLogoUrl?: string | null,
  drawerBackground?: string | null,
  borderColor?: string | null,
  textInputTextColor?: string | null,
  textInputBackgroundColor?: string | null,
  surfaceBackground?: string | null,
  surfaceHoveredBackground?: string | null,
};

export type ChatSpaceTextInput = {
  welcomeMessage?: string | null,
  returnWelcomeMessage?: string | null,
  brandName?: string | null,
  inputPlaceholder?: string | null,
  suggestedPromptsTitle?: string | null,
  viewMedia?: string | null,
  close?: string | null,
  copyText?: string | null,
  copyTextSuccess?: string | null,
  share?: string | null,
  historyTabTitle?: string | null,
  navigationTabTitle?: string | null,
  today?: string | null,
  yesterday?: string | null,
  previous?: string | null,
  noHistory?: string | null,
};

export type ChatSpaceSettingsInput = {
  autoOpen?: boolean | null,
};

export type ModelChatSpaceConditionInput = {
  name?: ModelStringInput | null,
  isPublic?: ModelBooleanInput | null,
  isMultiChannel?: ModelBooleanInput | null,
  defaultChannelId?: ModelStringInput | null,
  themeId?: ModelStringInput | null,
  language?: ModelStringInput | null,
  admin?: ModelStringInput | null,
  and?: Array< ModelChatSpaceConditionInput | null > | null,
  or?: Array< ModelChatSpaceConditionInput | null > | null,
  not?: ModelChatSpaceConditionInput | null,
};

export type ChatSpace = {
  __typename: "ChatSpace",
  ownerId: string,
  id: string,
  name: string,
  isPublic: boolean,
  isMultiChannel: boolean,
  defaultChannelId?: string | null,
  themeId?: string | null,
  language?: string | null,
  initialPrompts?:  Array<InitialPrompt > | null,
  theme?: ChatSpaceTheme | null,
  text?: ChatSpaceText | null,
  settings: ChatSpaceSettings,
  admin: string,
  createdAt: string,
  updatedAt: string,
};

export type InitialPrompt = {
  __typename: "InitialPrompt",
  display?: string | null,
  prompt: string,
};

export type ChatSpaceTheme = {
  __typename: "ChatSpaceTheme",
  isDark?: boolean | null,
  navbarLogoUrl?: string | null,
  primaryColor?: string | null,
  primaryAccent?: string | null,
  textColor?: string | null,
  textSecondary?: string | null,
  onPrimary?: string | null,
  backgroundColor?: string | null,
  backgroundAccent?: string | null,
  backgroundImageUrl?: string | null,
  bubbleButtonColor?: string | null,
  bubbleButtonLogoUrl?: string | null,
  drawerBackground?: string | null,
  borderColor?: string | null,
  textInputTextColor?: string | null,
  textInputBackgroundColor?: string | null,
  surfaceBackground?: string | null,
  surfaceHoveredBackground?: string | null,
};

export type ChatSpaceText = {
  __typename: "ChatSpaceText",
  welcomeMessage?: string | null,
  returnWelcomeMessage?: string | null,
  brandName?: string | null,
  inputPlaceholder?: string | null,
  suggestedPromptsTitle?: string | null,
  viewMedia?: string | null,
  close?: string | null,
  copyText?: string | null,
  copyTextSuccess?: string | null,
  share?: string | null,
  historyTabTitle?: string | null,
  navigationTabTitle?: string | null,
  today?: string | null,
  yesterday?: string | null,
  previous?: string | null,
  noHistory?: string | null,
};

export type ChatSpaceSettings = {
  __typename: "ChatSpaceSettings",
  autoOpen?: boolean | null,
};

export type UpdateChatSpaceInput = {
  ownerId: string,
  id: string,
  name?: string | null,
  isPublic?: boolean | null,
  isMultiChannel?: boolean | null,
  defaultChannelId?: string | null,
  themeId?: string | null,
  language?: string | null,
  initialPrompts?: Array< InitialPromptInput > | null,
  theme?: ChatSpaceThemeInput | null,
  text?: ChatSpaceTextInput | null,
  settings?: ChatSpaceSettingsInput | null,
  admin?: string | null,
};

export type DeleteChatSpaceInput = {
  ownerId: string,
  id: string,
};

export type CreateOrganizationInput = {
  id?: string | null,
  name: string,
  logo?: string | null,
  admin: string,
};

export type ModelOrganizationConditionInput = {
  name?: ModelStringInput | null,
  logo?: ModelStringInput | null,
  admin?: ModelStringInput | null,
  and?: Array< ModelOrganizationConditionInput | null > | null,
  or?: Array< ModelOrganizationConditionInput | null > | null,
  not?: ModelOrganizationConditionInput | null,
};

export type Organization = {
  __typename: "Organization",
  id: string,
  name: string,
  logo?: string | null,
  admin: string,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateOrganizationInput = {
  id: string,
  name?: string | null,
  logo?: string | null,
  admin?: string | null,
};

export type DeleteOrganizationInput = {
  id: string,
};

export type CreateUserInput = {
  id?: string | null,
  email: string,
  cognitoId: string,
  organizationId?: string | null,
};

export type ModelUserConditionInput = {
  email?: ModelStringInput | null,
  cognitoId?: ModelStringInput | null,
  organizationId?: ModelIDInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type User = {
  __typename: "User",
  id: string,
  email: string,
  cognitoId: string,
  organizationId?: string | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateUserInput = {
  id: string,
  email?: string | null,
  cognitoId?: string | null,
  organizationId?: string | null,
};

export type DeleteUserInput = {
  id: string,
};

export type ModelCodeItemPrimaryCompositeKeyConditionInput = {
  eq?: ModelCodeItemPrimaryCompositeKeyInput | null,
  le?: ModelCodeItemPrimaryCompositeKeyInput | null,
  lt?: ModelCodeItemPrimaryCompositeKeyInput | null,
  ge?: ModelCodeItemPrimaryCompositeKeyInput | null,
  gt?: ModelCodeItemPrimaryCompositeKeyInput | null,
  between?: Array< ModelCodeItemPrimaryCompositeKeyInput | null > | null,
  beginsWith?: ModelCodeItemPrimaryCompositeKeyInput | null,
};

export type ModelCodeItemPrimaryCompositeKeyInput = {
  tableCode?: string | null,
  itemCode?: string | null,
};

export type ModelCodeItemFilterInput = {
  tenantCode?: ModelStringInput | null,
  tableCode?: ModelStringInput | null,
  itemCode?: ModelStringInput | null,
  internalName?: ModelStringInput | null,
  internalDescription?: ModelStringInput | null,
  isEditable?: ModelBooleanInput | null,
  isActive?: ModelBooleanInput | null,
  isDisplayed?: ModelBooleanInput | null,
  isExtended?: ModelBooleanInput | null,
  and?: Array< ModelCodeItemFilterInput | null > | null,
  or?: Array< ModelCodeItemFilterInput | null > | null,
  not?: ModelCodeItemFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelCodeItemConnection = {
  __typename: "ModelCodeItemConnection",
  items:  Array<CodeItem | null >,
  nextToken?: string | null,
};

export type ModelLanguageItemPrimaryCompositeKeyConditionInput = {
  eq?: ModelLanguageItemPrimaryCompositeKeyInput | null,
  le?: ModelLanguageItemPrimaryCompositeKeyInput | null,
  lt?: ModelLanguageItemPrimaryCompositeKeyInput | null,
  ge?: ModelLanguageItemPrimaryCompositeKeyInput | null,
  gt?: ModelLanguageItemPrimaryCompositeKeyInput | null,
  between?: Array< ModelLanguageItemPrimaryCompositeKeyInput | null > | null,
  beginsWith?: ModelLanguageItemPrimaryCompositeKeyInput | null,
};

export type ModelLanguageItemPrimaryCompositeKeyInput = {
  tableCode?: string | null,
  itemCode?: string | null,
};

export type ModelLanguageItemFilterInput = {
  languageCode?: ModelStringInput | null,
  tableCode?: ModelStringInput | null,
  itemCode?: ModelStringInput | null,
  text?: ModelStringInput | null,
  and?: Array< ModelLanguageItemFilterInput | null > | null,
  or?: Array< ModelLanguageItemFilterInput | null > | null,
  not?: ModelLanguageItemFilterInput | null,
};

export type ModelLanguageItemConnection = {
  __typename: "ModelLanguageItemConnection",
  items:  Array<LanguageItem | null >,
  nextToken?: string | null,
};

export type ModelIDKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelChannelFilterInput = {
  chatSpaceId?: ModelIDInput | null,
  id?: ModelIDInput | null,
  apiHost?: ModelStringInput | null,
  chatflowId?: ModelStringInput | null,
  name?: ModelStringInput | null,
  isLive?: ModelBooleanInput | null,
  admin?: ModelStringInput | null,
  members?: ModelStringInput | null,
  and?: Array< ModelChannelFilterInput | null > | null,
  or?: Array< ModelChannelFilterInput | null > | null,
  not?: ModelChannelFilterInput | null,
};

export type ModelChannelConnection = {
  __typename: "ModelChannelConnection",
  items:  Array<Channel | null >,
  nextToken?: string | null,
};

export type ModelChannelDocumentFilterInput = {
  channelId?: ModelIDInput | null,
  id?: ModelIDInput | null,
  s3Key?: ModelStringInput | null,
  fileType?: ModelStringInput | null,
  fileName?: ModelStringInput | null,
  fileSize?: ModelIntInput | null,
  admin?: ModelStringInput | null,
  members?: ModelStringInput | null,
  and?: Array< ModelChannelDocumentFilterInput | null > | null,
  or?: Array< ModelChannelDocumentFilterInput | null > | null,
  not?: ModelChannelDocumentFilterInput | null,
};

export type ModelChannelDocumentConnection = {
  __typename: "ModelChannelDocumentConnection",
  items:  Array<ChannelDocument | null >,
  nextToken?: string | null,
};

export type ModelChatSpaceFilterInput = {
  ownerId?: ModelIDInput | null,
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  isPublic?: ModelBooleanInput | null,
  isMultiChannel?: ModelBooleanInput | null,
  defaultChannelId?: ModelStringInput | null,
  themeId?: ModelStringInput | null,
  language?: ModelStringInput | null,
  admin?: ModelStringInput | null,
  and?: Array< ModelChatSpaceFilterInput | null > | null,
  or?: Array< ModelChatSpaceFilterInput | null > | null,
  not?: ModelChatSpaceFilterInput | null,
};

export type ModelChatSpaceConnection = {
  __typename: "ModelChatSpaceConnection",
  items:  Array<ChatSpace | null >,
  nextToken?: string | null,
};

export type ModelOrganizationFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  logo?: ModelStringInput | null,
  admin?: ModelStringInput | null,
  and?: Array< ModelOrganizationFilterInput | null > | null,
  or?: Array< ModelOrganizationFilterInput | null > | null,
  not?: ModelOrganizationFilterInput | null,
};

export type ModelOrganizationConnection = {
  __typename: "ModelOrganizationConnection",
  items:  Array<Organization | null >,
  nextToken?: string | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  email?: ModelStringInput | null,
  cognitoId?: ModelStringInput | null,
  organizationId?: ModelIDInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionCodeItemFilterInput = {
  tenantCode?: ModelSubscriptionStringInput | null,
  tableCode?: ModelSubscriptionStringInput | null,
  itemCode?: ModelSubscriptionStringInput | null,
  internalName?: ModelSubscriptionStringInput | null,
  internalDescription?: ModelSubscriptionStringInput | null,
  isEditable?: ModelSubscriptionBooleanInput | null,
  isActive?: ModelSubscriptionBooleanInput | null,
  isDisplayed?: ModelSubscriptionBooleanInput | null,
  isExtended?: ModelSubscriptionBooleanInput | null,
  and?: Array< ModelSubscriptionCodeItemFilterInput | null > | null,
  or?: Array< ModelSubscriptionCodeItemFilterInput | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionLanguageItemFilterInput = {
  languageCode?: ModelSubscriptionStringInput | null,
  tableCode?: ModelSubscriptionStringInput | null,
  itemCode?: ModelSubscriptionStringInput | null,
  text?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionLanguageItemFilterInput | null > | null,
  or?: Array< ModelSubscriptionLanguageItemFilterInput | null > | null,
};

export type ModelSubscriptionChannelFilterInput = {
  chatSpaceId?: ModelSubscriptionIDInput | null,
  id?: ModelSubscriptionIDInput | null,
  apiHost?: ModelSubscriptionStringInput | null,
  chatflowId?: ModelSubscriptionStringInput | null,
  name?: ModelSubscriptionStringInput | null,
  isLive?: ModelSubscriptionBooleanInput | null,
  and?: Array< ModelSubscriptionChannelFilterInput | null > | null,
  or?: Array< ModelSubscriptionChannelFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionChannelDocumentFilterInput = {
  channelId?: ModelSubscriptionIDInput | null,
  id?: ModelSubscriptionIDInput | null,
  s3Key?: ModelSubscriptionStringInput | null,
  fileType?: ModelSubscriptionStringInput | null,
  fileName?: ModelSubscriptionStringInput | null,
  fileSize?: ModelSubscriptionIntInput | null,
  and?: Array< ModelSubscriptionChannelDocumentFilterInput | null > | null,
  or?: Array< ModelSubscriptionChannelDocumentFilterInput | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionChatSpaceFilterInput = {
  ownerId?: ModelSubscriptionIDInput | null,
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  isPublic?: ModelSubscriptionBooleanInput | null,
  isMultiChannel?: ModelSubscriptionBooleanInput | null,
  defaultChannelId?: ModelSubscriptionStringInput | null,
  themeId?: ModelSubscriptionStringInput | null,
  language?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionChatSpaceFilterInput | null > | null,
  or?: Array< ModelSubscriptionChatSpaceFilterInput | null > | null,
};

export type ModelSubscriptionOrganizationFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  logo?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionOrganizationFilterInput | null > | null,
  or?: Array< ModelSubscriptionOrganizationFilterInput | null > | null,
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  email?: ModelSubscriptionStringInput | null,
  cognitoId?: ModelSubscriptionStringInput | null,
  organizationId?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
};

export type Publish2channelMutationVariables = {
  sessionId: string,
  data: string,
};

export type Publish2channelMutation = {
  publish2channel?:  {
    __typename: "SubscriptionEvent",
    sessionId: string,
    data: string,
  } | null,
};

export type CreateCodeItemMutationVariables = {
  input: CreateCodeItemInput,
  condition?: ModelCodeItemConditionInput | null,
};

export type CreateCodeItemMutation = {
  createCodeItem?:  {
    __typename: "CodeItem",
    tenantCode: string,
    tableCode: string,
    itemCode: string,
    internalName: string,
    internalDescription?: string | null,
    isEditable: boolean,
    isActive: boolean,
    isDisplayed?: boolean | null,
    isExtended?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCodeItemMutationVariables = {
  input: UpdateCodeItemInput,
  condition?: ModelCodeItemConditionInput | null,
};

export type UpdateCodeItemMutation = {
  updateCodeItem?:  {
    __typename: "CodeItem",
    tenantCode: string,
    tableCode: string,
    itemCode: string,
    internalName: string,
    internalDescription?: string | null,
    isEditable: boolean,
    isActive: boolean,
    isDisplayed?: boolean | null,
    isExtended?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCodeItemMutationVariables = {
  input: DeleteCodeItemInput,
  condition?: ModelCodeItemConditionInput | null,
};

export type DeleteCodeItemMutation = {
  deleteCodeItem?:  {
    __typename: "CodeItem",
    tenantCode: string,
    tableCode: string,
    itemCode: string,
    internalName: string,
    internalDescription?: string | null,
    isEditable: boolean,
    isActive: boolean,
    isDisplayed?: boolean | null,
    isExtended?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateLanguageItemMutationVariables = {
  input: CreateLanguageItemInput,
  condition?: ModelLanguageItemConditionInput | null,
};

export type CreateLanguageItemMutation = {
  createLanguageItem?:  {
    __typename: "LanguageItem",
    languageCode: string,
    tableCode: string,
    itemCode: string,
    text: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateLanguageItemMutationVariables = {
  input: UpdateLanguageItemInput,
  condition?: ModelLanguageItemConditionInput | null,
};

export type UpdateLanguageItemMutation = {
  updateLanguageItem?:  {
    __typename: "LanguageItem",
    languageCode: string,
    tableCode: string,
    itemCode: string,
    text: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteLanguageItemMutationVariables = {
  input: DeleteLanguageItemInput,
  condition?: ModelLanguageItemConditionInput | null,
};

export type DeleteLanguageItemMutation = {
  deleteLanguageItem?:  {
    __typename: "LanguageItem",
    languageCode: string,
    tableCode: string,
    itemCode: string,
    text: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateChannelMutationVariables = {
  input: CreateChannelInput,
  condition?: ModelChannelConditionInput | null,
};

export type CreateChannelMutation = {
  createChannel?:  {
    __typename: "Channel",
    chatSpaceId: string,
    id: string,
    apiHost?: string | null,
    chatflowId?: string | null,
    name: string,
    isLive: boolean,
    admin: string,
    members?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateChannelMutationVariables = {
  input: UpdateChannelInput,
  condition?: ModelChannelConditionInput | null,
};

export type UpdateChannelMutation = {
  updateChannel?:  {
    __typename: "Channel",
    chatSpaceId: string,
    id: string,
    apiHost?: string | null,
    chatflowId?: string | null,
    name: string,
    isLive: boolean,
    admin: string,
    members?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteChannelMutationVariables = {
  input: DeleteChannelInput,
  condition?: ModelChannelConditionInput | null,
};

export type DeleteChannelMutation = {
  deleteChannel?:  {
    __typename: "Channel",
    chatSpaceId: string,
    id: string,
    apiHost?: string | null,
    chatflowId?: string | null,
    name: string,
    isLive: boolean,
    admin: string,
    members?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateChannelDocumentMutationVariables = {
  input: CreateChannelDocumentInput,
  condition?: ModelChannelDocumentConditionInput | null,
};

export type CreateChannelDocumentMutation = {
  createChannelDocument?:  {
    __typename: "ChannelDocument",
    channelId: string,
    id: string,
    s3Key?: string | null,
    fileType?: string | null,
    fileName?: string | null,
    fileSize?: number | null,
    admin: string,
    members?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateChannelDocumentMutationVariables = {
  input: UpdateChannelDocumentInput,
  condition?: ModelChannelDocumentConditionInput | null,
};

export type UpdateChannelDocumentMutation = {
  updateChannelDocument?:  {
    __typename: "ChannelDocument",
    channelId: string,
    id: string,
    s3Key?: string | null,
    fileType?: string | null,
    fileName?: string | null,
    fileSize?: number | null,
    admin: string,
    members?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteChannelDocumentMutationVariables = {
  input: DeleteChannelDocumentInput,
  condition?: ModelChannelDocumentConditionInput | null,
};

export type DeleteChannelDocumentMutation = {
  deleteChannelDocument?:  {
    __typename: "ChannelDocument",
    channelId: string,
    id: string,
    s3Key?: string | null,
    fileType?: string | null,
    fileName?: string | null,
    fileSize?: number | null,
    admin: string,
    members?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateChatSpaceMutationVariables = {
  input: CreateChatSpaceInput,
  condition?: ModelChatSpaceConditionInput | null,
};

export type CreateChatSpaceMutation = {
  createChatSpace?:  {
    __typename: "ChatSpace",
    ownerId: string,
    id: string,
    name: string,
    isPublic: boolean,
    isMultiChannel: boolean,
    defaultChannelId?: string | null,
    themeId?: string | null,
    language?: string | null,
    initialPrompts?:  Array< {
      __typename: "InitialPrompt",
      display?: string | null,
      prompt: string,
    } > | null,
    theme?:  {
      __typename: "ChatSpaceTheme",
      isDark?: boolean | null,
      navbarLogoUrl?: string | null,
      primaryColor?: string | null,
      primaryAccent?: string | null,
      textColor?: string | null,
      textSecondary?: string | null,
      onPrimary?: string | null,
      backgroundColor?: string | null,
      backgroundAccent?: string | null,
      backgroundImageUrl?: string | null,
      bubbleButtonColor?: string | null,
      bubbleButtonLogoUrl?: string | null,
      drawerBackground?: string | null,
      borderColor?: string | null,
      textInputTextColor?: string | null,
      textInputBackgroundColor?: string | null,
      surfaceBackground?: string | null,
      surfaceHoveredBackground?: string | null,
    } | null,
    text?:  {
      __typename: "ChatSpaceText",
      welcomeMessage?: string | null,
      returnWelcomeMessage?: string | null,
      brandName?: string | null,
      inputPlaceholder?: string | null,
      suggestedPromptsTitle?: string | null,
      viewMedia?: string | null,
      close?: string | null,
      copyText?: string | null,
      copyTextSuccess?: string | null,
      share?: string | null,
      historyTabTitle?: string | null,
      navigationTabTitle?: string | null,
      today?: string | null,
      yesterday?: string | null,
      previous?: string | null,
      noHistory?: string | null,
    } | null,
    settings:  {
      __typename: "ChatSpaceSettings",
      autoOpen?: boolean | null,
    },
    admin: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateChatSpaceMutationVariables = {
  input: UpdateChatSpaceInput,
  condition?: ModelChatSpaceConditionInput | null,
};

export type UpdateChatSpaceMutation = {
  updateChatSpace?:  {
    __typename: "ChatSpace",
    ownerId: string,
    id: string,
    name: string,
    isPublic: boolean,
    isMultiChannel: boolean,
    defaultChannelId?: string | null,
    themeId?: string | null,
    language?: string | null,
    initialPrompts?:  Array< {
      __typename: "InitialPrompt",
      display?: string | null,
      prompt: string,
    } > | null,
    theme?:  {
      __typename: "ChatSpaceTheme",
      isDark?: boolean | null,
      navbarLogoUrl?: string | null,
      primaryColor?: string | null,
      primaryAccent?: string | null,
      textColor?: string | null,
      textSecondary?: string | null,
      onPrimary?: string | null,
      backgroundColor?: string | null,
      backgroundAccent?: string | null,
      backgroundImageUrl?: string | null,
      bubbleButtonColor?: string | null,
      bubbleButtonLogoUrl?: string | null,
      drawerBackground?: string | null,
      borderColor?: string | null,
      textInputTextColor?: string | null,
      textInputBackgroundColor?: string | null,
      surfaceBackground?: string | null,
      surfaceHoveredBackground?: string | null,
    } | null,
    text?:  {
      __typename: "ChatSpaceText",
      welcomeMessage?: string | null,
      returnWelcomeMessage?: string | null,
      brandName?: string | null,
      inputPlaceholder?: string | null,
      suggestedPromptsTitle?: string | null,
      viewMedia?: string | null,
      close?: string | null,
      copyText?: string | null,
      copyTextSuccess?: string | null,
      share?: string | null,
      historyTabTitle?: string | null,
      navigationTabTitle?: string | null,
      today?: string | null,
      yesterday?: string | null,
      previous?: string | null,
      noHistory?: string | null,
    } | null,
    settings:  {
      __typename: "ChatSpaceSettings",
      autoOpen?: boolean | null,
    },
    admin: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteChatSpaceMutationVariables = {
  input: DeleteChatSpaceInput,
  condition?: ModelChatSpaceConditionInput | null,
};

export type DeleteChatSpaceMutation = {
  deleteChatSpace?:  {
    __typename: "ChatSpace",
    ownerId: string,
    id: string,
    name: string,
    isPublic: boolean,
    isMultiChannel: boolean,
    defaultChannelId?: string | null,
    themeId?: string | null,
    language?: string | null,
    initialPrompts?:  Array< {
      __typename: "InitialPrompt",
      display?: string | null,
      prompt: string,
    } > | null,
    theme?:  {
      __typename: "ChatSpaceTheme",
      isDark?: boolean | null,
      navbarLogoUrl?: string | null,
      primaryColor?: string | null,
      primaryAccent?: string | null,
      textColor?: string | null,
      textSecondary?: string | null,
      onPrimary?: string | null,
      backgroundColor?: string | null,
      backgroundAccent?: string | null,
      backgroundImageUrl?: string | null,
      bubbleButtonColor?: string | null,
      bubbleButtonLogoUrl?: string | null,
      drawerBackground?: string | null,
      borderColor?: string | null,
      textInputTextColor?: string | null,
      textInputBackgroundColor?: string | null,
      surfaceBackground?: string | null,
      surfaceHoveredBackground?: string | null,
    } | null,
    text?:  {
      __typename: "ChatSpaceText",
      welcomeMessage?: string | null,
      returnWelcomeMessage?: string | null,
      brandName?: string | null,
      inputPlaceholder?: string | null,
      suggestedPromptsTitle?: string | null,
      viewMedia?: string | null,
      close?: string | null,
      copyText?: string | null,
      copyTextSuccess?: string | null,
      share?: string | null,
      historyTabTitle?: string | null,
      navigationTabTitle?: string | null,
      today?: string | null,
      yesterday?: string | null,
      previous?: string | null,
      noHistory?: string | null,
    } | null,
    settings:  {
      __typename: "ChatSpaceSettings",
      autoOpen?: boolean | null,
    },
    admin: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateOrganizationMutationVariables = {
  input: CreateOrganizationInput,
  condition?: ModelOrganizationConditionInput | null,
};

export type CreateOrganizationMutation = {
  createOrganization?:  {
    __typename: "Organization",
    id: string,
    name: string,
    logo?: string | null,
    admin: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateOrganizationMutationVariables = {
  input: UpdateOrganizationInput,
  condition?: ModelOrganizationConditionInput | null,
};

export type UpdateOrganizationMutation = {
  updateOrganization?:  {
    __typename: "Organization",
    id: string,
    name: string,
    logo?: string | null,
    admin: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteOrganizationMutationVariables = {
  input: DeleteOrganizationInput,
  condition?: ModelOrganizationConditionInput | null,
};

export type DeleteOrganizationMutation = {
  deleteOrganization?:  {
    __typename: "Organization",
    id: string,
    name: string,
    logo?: string | null,
    admin: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    email: string,
    cognitoId: string,
    organizationId?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    email: string,
    cognitoId: string,
    organizationId?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    email: string,
    cognitoId: string,
    organizationId?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type GetCodeItemQueryVariables = {
  tenantCode: string,
  tableCode: string,
  itemCode: string,
};

export type GetCodeItemQuery = {
  getCodeItem?:  {
    __typename: "CodeItem",
    tenantCode: string,
    tableCode: string,
    itemCode: string,
    internalName: string,
    internalDescription?: string | null,
    isEditable: boolean,
    isActive: boolean,
    isDisplayed?: boolean | null,
    isExtended?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCodeItemsQueryVariables = {
  tenantCode?: string | null,
  tableCodeItemCode?: ModelCodeItemPrimaryCompositeKeyConditionInput | null,
  filter?: ModelCodeItemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListCodeItemsQuery = {
  listCodeItems?:  {
    __typename: "ModelCodeItemConnection",
    items:  Array< {
      __typename: "CodeItem",
      tenantCode: string,
      tableCode: string,
      itemCode: string,
      internalName: string,
      internalDescription?: string | null,
      isEditable: boolean,
      isActive: boolean,
      isDisplayed?: boolean | null,
      isExtended?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetLanguageItemQueryVariables = {
  languageCode: string,
  tableCode: string,
  itemCode: string,
};

export type GetLanguageItemQuery = {
  getLanguageItem?:  {
    __typename: "LanguageItem",
    languageCode: string,
    tableCode: string,
    itemCode: string,
    text: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListLanguageItemsQueryVariables = {
  languageCode?: string | null,
  tableCodeItemCode?: ModelLanguageItemPrimaryCompositeKeyConditionInput | null,
  filter?: ModelLanguageItemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListLanguageItemsQuery = {
  listLanguageItems?:  {
    __typename: "ModelLanguageItemConnection",
    items:  Array< {
      __typename: "LanguageItem",
      languageCode: string,
      tableCode: string,
      itemCode: string,
      text: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetChannelQueryVariables = {
  chatSpaceId: string,
  id: string,
};

export type GetChannelQuery = {
  getChannel?:  {
    __typename: "Channel",
    chatSpaceId: string,
    id: string,
    apiHost?: string | null,
    chatflowId?: string | null,
    name: string,
    isLive: boolean,
    admin: string,
    members?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListChannelsQueryVariables = {
  chatSpaceId?: string | null,
  id?: ModelIDKeyConditionInput | null,
  filter?: ModelChannelFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListChannelsQuery = {
  listChannels?:  {
    __typename: "ModelChannelConnection",
    items:  Array< {
      __typename: "Channel",
      chatSpaceId: string,
      id: string,
      apiHost?: string | null,
      chatflowId?: string | null,
      name: string,
      isLive: boolean,
      admin: string,
      members?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetChannelDocumentQueryVariables = {
  channelId: string,
  id: string,
};

export type GetChannelDocumentQuery = {
  getChannelDocument?:  {
    __typename: "ChannelDocument",
    channelId: string,
    id: string,
    s3Key?: string | null,
    fileType?: string | null,
    fileName?: string | null,
    fileSize?: number | null,
    admin: string,
    members?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListChannelDocumentsQueryVariables = {
  channelId?: string | null,
  id?: ModelIDKeyConditionInput | null,
  filter?: ModelChannelDocumentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListChannelDocumentsQuery = {
  listChannelDocuments?:  {
    __typename: "ModelChannelDocumentConnection",
    items:  Array< {
      __typename: "ChannelDocument",
      channelId: string,
      id: string,
      s3Key?: string | null,
      fileType?: string | null,
      fileName?: string | null,
      fileSize?: number | null,
      admin: string,
      members?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetChatSpaceQueryVariables = {
  ownerId: string,
  id: string,
};

export type GetChatSpaceQuery = {
  getChatSpace?:  {
    __typename: "ChatSpace",
    ownerId: string,
    id: string,
    name: string,
    isPublic: boolean,
    isMultiChannel: boolean,
    defaultChannelId?: string | null,
    themeId?: string | null,
    language?: string | null,
    initialPrompts?:  Array< {
      __typename: "InitialPrompt",
      display?: string | null,
      prompt: string,
    } > | null,
    theme?:  {
      __typename: "ChatSpaceTheme",
      isDark?: boolean | null,
      navbarLogoUrl?: string | null,
      primaryColor?: string | null,
      primaryAccent?: string | null,
      textColor?: string | null,
      textSecondary?: string | null,
      onPrimary?: string | null,
      backgroundColor?: string | null,
      backgroundAccent?: string | null,
      backgroundImageUrl?: string | null,
      bubbleButtonColor?: string | null,
      bubbleButtonLogoUrl?: string | null,
      drawerBackground?: string | null,
      borderColor?: string | null,
      textInputTextColor?: string | null,
      textInputBackgroundColor?: string | null,
      surfaceBackground?: string | null,
      surfaceHoveredBackground?: string | null,
    } | null,
    text?:  {
      __typename: "ChatSpaceText",
      welcomeMessage?: string | null,
      returnWelcomeMessage?: string | null,
      brandName?: string | null,
      inputPlaceholder?: string | null,
      suggestedPromptsTitle?: string | null,
      viewMedia?: string | null,
      close?: string | null,
      copyText?: string | null,
      copyTextSuccess?: string | null,
      share?: string | null,
      historyTabTitle?: string | null,
      navigationTabTitle?: string | null,
      today?: string | null,
      yesterday?: string | null,
      previous?: string | null,
      noHistory?: string | null,
    } | null,
    settings:  {
      __typename: "ChatSpaceSettings",
      autoOpen?: boolean | null,
    },
    admin: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListChatSpacesQueryVariables = {
  ownerId?: string | null,
  id?: ModelIDKeyConditionInput | null,
  filter?: ModelChatSpaceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListChatSpacesQuery = {
  listChatSpaces?:  {
    __typename: "ModelChatSpaceConnection",
    items:  Array< {
      __typename: "ChatSpace",
      ownerId: string,
      id: string,
      name: string,
      isPublic: boolean,
      isMultiChannel: boolean,
      defaultChannelId?: string | null,
      themeId?: string | null,
      language?: string | null,
      initialPrompts?:  Array< {
        __typename: "InitialPrompt",
        display?: string | null,
        prompt: string,
      } > | null,
      theme?:  {
        __typename: "ChatSpaceTheme",
        isDark?: boolean | null,
        navbarLogoUrl?: string | null,
        primaryColor?: string | null,
        primaryAccent?: string | null,
        textColor?: string | null,
        textSecondary?: string | null,
        onPrimary?: string | null,
        backgroundColor?: string | null,
        backgroundAccent?: string | null,
        backgroundImageUrl?: string | null,
        bubbleButtonColor?: string | null,
        bubbleButtonLogoUrl?: string | null,
        drawerBackground?: string | null,
        borderColor?: string | null,
        textInputTextColor?: string | null,
        textInputBackgroundColor?: string | null,
        surfaceBackground?: string | null,
        surfaceHoveredBackground?: string | null,
      } | null,
      text?:  {
        __typename: "ChatSpaceText",
        welcomeMessage?: string | null,
        returnWelcomeMessage?: string | null,
        brandName?: string | null,
        inputPlaceholder?: string | null,
        suggestedPromptsTitle?: string | null,
        viewMedia?: string | null,
        close?: string | null,
        copyText?: string | null,
        copyTextSuccess?: string | null,
        share?: string | null,
        historyTabTitle?: string | null,
        navigationTabTitle?: string | null,
        today?: string | null,
        yesterday?: string | null,
        previous?: string | null,
        noHistory?: string | null,
      } | null,
      settings:  {
        __typename: "ChatSpaceSettings",
        autoOpen?: boolean | null,
      },
      admin: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetOrganizationQueryVariables = {
  id: string,
};

export type GetOrganizationQuery = {
  getOrganization?:  {
    __typename: "Organization",
    id: string,
    name: string,
    logo?: string | null,
    admin: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListOrganizationsQueryVariables = {
  filter?: ModelOrganizationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListOrganizationsQuery = {
  listOrganizations?:  {
    __typename: "ModelOrganizationConnection",
    items:  Array< {
      __typename: "Organization",
      id: string,
      name: string,
      logo?: string | null,
      admin: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    email: string,
    cognitoId: string,
    organizationId?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      email: string,
      cognitoId: string,
      organizationId?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type Subscribe2channelSubscriptionVariables = {
  sessionId: string,
};

export type Subscribe2channelSubscription = {
  subscribe2channel?:  {
    __typename: "SubscriptionEvent",
    sessionId: string,
    data: string,
  } | null,
};

export type OnCreateCodeItemSubscriptionVariables = {
  filter?: ModelSubscriptionCodeItemFilterInput | null,
};

export type OnCreateCodeItemSubscription = {
  onCreateCodeItem?:  {
    __typename: "CodeItem",
    tenantCode: string,
    tableCode: string,
    itemCode: string,
    internalName: string,
    internalDescription?: string | null,
    isEditable: boolean,
    isActive: boolean,
    isDisplayed?: boolean | null,
    isExtended?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCodeItemSubscriptionVariables = {
  filter?: ModelSubscriptionCodeItemFilterInput | null,
};

export type OnUpdateCodeItemSubscription = {
  onUpdateCodeItem?:  {
    __typename: "CodeItem",
    tenantCode: string,
    tableCode: string,
    itemCode: string,
    internalName: string,
    internalDescription?: string | null,
    isEditable: boolean,
    isActive: boolean,
    isDisplayed?: boolean | null,
    isExtended?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCodeItemSubscriptionVariables = {
  filter?: ModelSubscriptionCodeItemFilterInput | null,
};

export type OnDeleteCodeItemSubscription = {
  onDeleteCodeItem?:  {
    __typename: "CodeItem",
    tenantCode: string,
    tableCode: string,
    itemCode: string,
    internalName: string,
    internalDescription?: string | null,
    isEditable: boolean,
    isActive: boolean,
    isDisplayed?: boolean | null,
    isExtended?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateLanguageItemSubscriptionVariables = {
  filter?: ModelSubscriptionLanguageItemFilterInput | null,
};

export type OnCreateLanguageItemSubscription = {
  onCreateLanguageItem?:  {
    __typename: "LanguageItem",
    languageCode: string,
    tableCode: string,
    itemCode: string,
    text: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateLanguageItemSubscriptionVariables = {
  filter?: ModelSubscriptionLanguageItemFilterInput | null,
};

export type OnUpdateLanguageItemSubscription = {
  onUpdateLanguageItem?:  {
    __typename: "LanguageItem",
    languageCode: string,
    tableCode: string,
    itemCode: string,
    text: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteLanguageItemSubscriptionVariables = {
  filter?: ModelSubscriptionLanguageItemFilterInput | null,
};

export type OnDeleteLanguageItemSubscription = {
  onDeleteLanguageItem?:  {
    __typename: "LanguageItem",
    languageCode: string,
    tableCode: string,
    itemCode: string,
    text: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateChannelSubscriptionVariables = {
  filter?: ModelSubscriptionChannelFilterInput | null,
};

export type OnCreateChannelSubscription = {
  onCreateChannel?:  {
    __typename: "Channel",
    chatSpaceId: string,
    id: string,
    apiHost?: string | null,
    chatflowId?: string | null,
    name: string,
    isLive: boolean,
    admin: string,
    members?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateChannelSubscriptionVariables = {
  filter?: ModelSubscriptionChannelFilterInput | null,
};

export type OnUpdateChannelSubscription = {
  onUpdateChannel?:  {
    __typename: "Channel",
    chatSpaceId: string,
    id: string,
    apiHost?: string | null,
    chatflowId?: string | null,
    name: string,
    isLive: boolean,
    admin: string,
    members?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteChannelSubscriptionVariables = {
  filter?: ModelSubscriptionChannelFilterInput | null,
};

export type OnDeleteChannelSubscription = {
  onDeleteChannel?:  {
    __typename: "Channel",
    chatSpaceId: string,
    id: string,
    apiHost?: string | null,
    chatflowId?: string | null,
    name: string,
    isLive: boolean,
    admin: string,
    members?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateChannelDocumentSubscriptionVariables = {
  filter?: ModelSubscriptionChannelDocumentFilterInput | null,
};

export type OnCreateChannelDocumentSubscription = {
  onCreateChannelDocument?:  {
    __typename: "ChannelDocument",
    channelId: string,
    id: string,
    s3Key?: string | null,
    fileType?: string | null,
    fileName?: string | null,
    fileSize?: number | null,
    admin: string,
    members?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateChannelDocumentSubscriptionVariables = {
  filter?: ModelSubscriptionChannelDocumentFilterInput | null,
};

export type OnUpdateChannelDocumentSubscription = {
  onUpdateChannelDocument?:  {
    __typename: "ChannelDocument",
    channelId: string,
    id: string,
    s3Key?: string | null,
    fileType?: string | null,
    fileName?: string | null,
    fileSize?: number | null,
    admin: string,
    members?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteChannelDocumentSubscriptionVariables = {
  filter?: ModelSubscriptionChannelDocumentFilterInput | null,
};

export type OnDeleteChannelDocumentSubscription = {
  onDeleteChannelDocument?:  {
    __typename: "ChannelDocument",
    channelId: string,
    id: string,
    s3Key?: string | null,
    fileType?: string | null,
    fileName?: string | null,
    fileSize?: number | null,
    admin: string,
    members?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateChatSpaceSubscriptionVariables = {
  filter?: ModelSubscriptionChatSpaceFilterInput | null,
};

export type OnCreateChatSpaceSubscription = {
  onCreateChatSpace?:  {
    __typename: "ChatSpace",
    ownerId: string,
    id: string,
    name: string,
    isPublic: boolean,
    isMultiChannel: boolean,
    defaultChannelId?: string | null,
    themeId?: string | null,
    language?: string | null,
    initialPrompts?:  Array< {
      __typename: "InitialPrompt",
      display?: string | null,
      prompt: string,
    } > | null,
    theme?:  {
      __typename: "ChatSpaceTheme",
      isDark?: boolean | null,
      navbarLogoUrl?: string | null,
      primaryColor?: string | null,
      primaryAccent?: string | null,
      textColor?: string | null,
      textSecondary?: string | null,
      onPrimary?: string | null,
      backgroundColor?: string | null,
      backgroundAccent?: string | null,
      backgroundImageUrl?: string | null,
      bubbleButtonColor?: string | null,
      bubbleButtonLogoUrl?: string | null,
      drawerBackground?: string | null,
      borderColor?: string | null,
      textInputTextColor?: string | null,
      textInputBackgroundColor?: string | null,
      surfaceBackground?: string | null,
      surfaceHoveredBackground?: string | null,
    } | null,
    text?:  {
      __typename: "ChatSpaceText",
      welcomeMessage?: string | null,
      returnWelcomeMessage?: string | null,
      brandName?: string | null,
      inputPlaceholder?: string | null,
      suggestedPromptsTitle?: string | null,
      viewMedia?: string | null,
      close?: string | null,
      copyText?: string | null,
      copyTextSuccess?: string | null,
      share?: string | null,
      historyTabTitle?: string | null,
      navigationTabTitle?: string | null,
      today?: string | null,
      yesterday?: string | null,
      previous?: string | null,
      noHistory?: string | null,
    } | null,
    settings:  {
      __typename: "ChatSpaceSettings",
      autoOpen?: boolean | null,
    },
    admin: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateChatSpaceSubscriptionVariables = {
  filter?: ModelSubscriptionChatSpaceFilterInput | null,
};

export type OnUpdateChatSpaceSubscription = {
  onUpdateChatSpace?:  {
    __typename: "ChatSpace",
    ownerId: string,
    id: string,
    name: string,
    isPublic: boolean,
    isMultiChannel: boolean,
    defaultChannelId?: string | null,
    themeId?: string | null,
    language?: string | null,
    initialPrompts?:  Array< {
      __typename: "InitialPrompt",
      display?: string | null,
      prompt: string,
    } > | null,
    theme?:  {
      __typename: "ChatSpaceTheme",
      isDark?: boolean | null,
      navbarLogoUrl?: string | null,
      primaryColor?: string | null,
      primaryAccent?: string | null,
      textColor?: string | null,
      textSecondary?: string | null,
      onPrimary?: string | null,
      backgroundColor?: string | null,
      backgroundAccent?: string | null,
      backgroundImageUrl?: string | null,
      bubbleButtonColor?: string | null,
      bubbleButtonLogoUrl?: string | null,
      drawerBackground?: string | null,
      borderColor?: string | null,
      textInputTextColor?: string | null,
      textInputBackgroundColor?: string | null,
      surfaceBackground?: string | null,
      surfaceHoveredBackground?: string | null,
    } | null,
    text?:  {
      __typename: "ChatSpaceText",
      welcomeMessage?: string | null,
      returnWelcomeMessage?: string | null,
      brandName?: string | null,
      inputPlaceholder?: string | null,
      suggestedPromptsTitle?: string | null,
      viewMedia?: string | null,
      close?: string | null,
      copyText?: string | null,
      copyTextSuccess?: string | null,
      share?: string | null,
      historyTabTitle?: string | null,
      navigationTabTitle?: string | null,
      today?: string | null,
      yesterday?: string | null,
      previous?: string | null,
      noHistory?: string | null,
    } | null,
    settings:  {
      __typename: "ChatSpaceSettings",
      autoOpen?: boolean | null,
    },
    admin: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteChatSpaceSubscriptionVariables = {
  filter?: ModelSubscriptionChatSpaceFilterInput | null,
};

export type OnDeleteChatSpaceSubscription = {
  onDeleteChatSpace?:  {
    __typename: "ChatSpace",
    ownerId: string,
    id: string,
    name: string,
    isPublic: boolean,
    isMultiChannel: boolean,
    defaultChannelId?: string | null,
    themeId?: string | null,
    language?: string | null,
    initialPrompts?:  Array< {
      __typename: "InitialPrompt",
      display?: string | null,
      prompt: string,
    } > | null,
    theme?:  {
      __typename: "ChatSpaceTheme",
      isDark?: boolean | null,
      navbarLogoUrl?: string | null,
      primaryColor?: string | null,
      primaryAccent?: string | null,
      textColor?: string | null,
      textSecondary?: string | null,
      onPrimary?: string | null,
      backgroundColor?: string | null,
      backgroundAccent?: string | null,
      backgroundImageUrl?: string | null,
      bubbleButtonColor?: string | null,
      bubbleButtonLogoUrl?: string | null,
      drawerBackground?: string | null,
      borderColor?: string | null,
      textInputTextColor?: string | null,
      textInputBackgroundColor?: string | null,
      surfaceBackground?: string | null,
      surfaceHoveredBackground?: string | null,
    } | null,
    text?:  {
      __typename: "ChatSpaceText",
      welcomeMessage?: string | null,
      returnWelcomeMessage?: string | null,
      brandName?: string | null,
      inputPlaceholder?: string | null,
      suggestedPromptsTitle?: string | null,
      viewMedia?: string | null,
      close?: string | null,
      copyText?: string | null,
      copyTextSuccess?: string | null,
      share?: string | null,
      historyTabTitle?: string | null,
      navigationTabTitle?: string | null,
      today?: string | null,
      yesterday?: string | null,
      previous?: string | null,
      noHistory?: string | null,
    } | null,
    settings:  {
      __typename: "ChatSpaceSettings",
      autoOpen?: boolean | null,
    },
    admin: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateOrganizationSubscriptionVariables = {
  filter?: ModelSubscriptionOrganizationFilterInput | null,
  owner?: string | null,
};

export type OnCreateOrganizationSubscription = {
  onCreateOrganization?:  {
    __typename: "Organization",
    id: string,
    name: string,
    logo?: string | null,
    admin: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateOrganizationSubscriptionVariables = {
  filter?: ModelSubscriptionOrganizationFilterInput | null,
  owner?: string | null,
};

export type OnUpdateOrganizationSubscription = {
  onUpdateOrganization?:  {
    __typename: "Organization",
    id: string,
    name: string,
    logo?: string | null,
    admin: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteOrganizationSubscriptionVariables = {
  filter?: ModelSubscriptionOrganizationFilterInput | null,
  owner?: string | null,
};

export type OnDeleteOrganizationSubscription = {
  onDeleteOrganization?:  {
    __typename: "Organization",
    id: string,
    name: string,
    logo?: string | null,
    admin: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    email: string,
    cognitoId: string,
    organizationId?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    email: string,
    cognitoId: string,
    organizationId?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    email: string,
    cognitoId: string,
    organizationId?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
