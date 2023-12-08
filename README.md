# Fraia Embed

Javascript script for implementing a Fraia chatbot on your website

## Usage

In `<head>`

```
<script type="module">
  import Chatbot from 'https://xxx.yyy';

  Chatbot.init({
    channelId: '<channelId>',
  });
</script>
```

## Config

Almost everything you see in fraia is customizable to fit your brand

```
channelId: string
language?: string // two letter language code e.g. 'en' 'dk'
initialPrompts?: Prompt[]
text?: Partial<TextConfig>
themeId?: 'bubbles' | 'midnight' // sets the base theme, which can be overrided using theme below
theme?: Partial<ThemeConfig>
```

See below for expanded types

### Prompt

The initial prompt suggestions shown in the sidebar

```
type Prompt = string | {
      display: string
      prompt: string
    }
```

### TextConfig

```
export type TextConfig = {
  welcomeMessage: string
  returnWelcomeMessage: string
  inputPlaceholder: string
  suggestedPromptsTitle: string
  viewMedia: string

  // Nav bar
  close: string

  // Settings dropdown
  copyText: string
  copyTextSuccess: string
  share: string

  // Sidebar
  historyTabTitle: string
  navigationTabTitle: string
  today: string
  yesterday: string
  previous: string
  noHistory: string
}
```

### Theme

```
export type Theme = {
  isDark: boolean
  customIconSrc: string
  primaryColor: string
  primaryAccent: string
  textColor: string
  textSecondary: string
  onPrimary: string
  backgroundColor: string
  backgroundAccent: string
  backgroundImageUrl?: string
  drawerBackground: string
  borderColor: string
  textInputTextColor: string
  textInputBackgroundColor: string
  surfaceBackground: string
  surfaceHoveredBackground: string
}
```
