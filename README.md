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
language?: string // two letter language code e.g. 'en' 'dk'
initialPrompts?: Prompt[]
text?: Partial<TextConfig>
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
type TextConfig = {
  welcomeMessage: string
  returnWelcomeMessage: string
  inputPlaceholder: string
  suggestedPromptsTitle: string
  viewMedia: string

  // Nav
  close: string

  // Settings Dropdown
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
type Theme = {
  primaryColor: string
  primaryAccent: string
  textColor: string
  textSecondary: string
  textAccent: string
  backgroundColor: string
  backgroundImageUrl: string
  borderColor: string
  textInputTextColor: string
  textInputBackgroundColor: string
  surfaceBackground: string
  surfaceHoveredBackground: string
}

```
