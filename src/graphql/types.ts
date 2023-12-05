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
  id?: string | null,
  tenantId: string,
  apiHost?: string | null,
  chatflowId?: string | null,
  name: string,
};

export type ModelChannelConditionInput = {
  tenantId?: ModelStringInput | null,
  apiHost?: ModelStringInput | null,
  chatflowId?: ModelStringInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelChannelConditionInput | null > | null,
  or?: Array< ModelChannelConditionInput | null > | null,
  not?: ModelChannelConditionInput | null,
};

export type Channel = {
  __typename: "Channel",
  id: string,
  tenantId: string,
  apiHost?: string | null,
  chatflowId?: string | null,
  name: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateChannelInput = {
  id: string,
  tenantId?: string | null,
  apiHost?: string | null,
  chatflowId?: string | null,
  name?: string | null,
};

export type DeleteChannelInput = {
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

export type ModelChannelFilterInput = {
  id?: ModelIDInput | null,
  tenantId?: ModelStringInput | null,
  apiHost?: ModelStringInput | null,
  chatflowId?: ModelStringInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelChannelFilterInput | null > | null,
  or?: Array< ModelChannelFilterInput | null > | null,
  not?: ModelChannelFilterInput | null,
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

export type ModelChannelConnection = {
  __typename: "ModelChannelConnection",
  items:  Array<Channel | null >,
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
  id?: ModelSubscriptionIDInput | null,
  tenantId?: ModelSubscriptionStringInput | null,
  apiHost?: ModelSubscriptionStringInput | null,
  chatflowId?: ModelSubscriptionStringInput | null,
  name?: ModelSubscriptionStringInput | null,
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
    id: string,
    tenantId: string,
    apiHost?: string | null,
    chatflowId?: string | null,
    name: string,
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
    id: string,
    tenantId: string,
    apiHost?: string | null,
    chatflowId?: string | null,
    name: string,
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
    id: string,
    tenantId: string,
    apiHost?: string | null,
    chatflowId?: string | null,
    name: string,
    createdAt: string,
    updatedAt: string,
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
  id: string,
};

export type GetChannelQuery = {
  getChannel?:  {
    __typename: "Channel",
    id: string,
    tenantId: string,
    apiHost?: string | null,
    chatflowId?: string | null,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListChannelsQueryVariables = {
  filter?: ModelChannelFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListChannelsQuery = {
  listChannels?:  {
    __typename: "ModelChannelConnection",
    items:  Array< {
      __typename: "Channel",
      id: string,
      tenantId: string,
      apiHost?: string | null,
      chatflowId?: string | null,
      name: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ChannelsByTenantIdQueryVariables = {
  tenantId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelChannelFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ChannelsByTenantIdQuery = {
  channelsByTenantId?:  {
    __typename: "ModelChannelConnection",
    items:  Array< {
      __typename: "Channel",
      id: string,
      tenantId: string,
      apiHost?: string | null,
      chatflowId?: string | null,
      name: string,
      createdAt: string,
      updatedAt: string,
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
    id: string,
    tenantId: string,
    apiHost?: string | null,
    chatflowId?: string | null,
    name: string,
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
    id: string,
    tenantId: string,
    apiHost?: string | null,
    chatflowId?: string | null,
    name: string,
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
    id: string,
    tenantId: string,
    apiHost?: string | null,
    chatflowId?: string | null,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
