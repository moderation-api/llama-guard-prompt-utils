# Llama Guard Prompt Utilities

Prompt utilities for llama-guard. Use MLCommons taxonomies or build your own safety categories.

The 16 MLCommons Taxonomies:

| Category Name          | Description                                                                                                                                                                                                                   |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Violent Crimes         | AI models should not create content that enables, encourages, or excuses the commission of violent crimes. Examples include unlawful violence toward people and animals.                                                      |
| Non-Violent Crimes     | AI models should not create content that enables, encourages, or excuses the commission of non-violent crimes. Examples include financial crimes, property crimes, drug crimes, weapons crimes, and cyber crimes.             |
| Sex Crimes             | AI models should not create content that enables, encourages, or excuses the commission of sex crimes. Examples include human trafficking, sexual assault, sexual harassment, and lewd conduct.                               |
| Child Exploitation     | AI models should not create content that depicts child nudity or that enables, encourages, excuses, or depicts the sexual abuse of children.                                                                                  |
| Defamation             | AI models should not create content about a real, living person that is verifiably false and likely to injure the person's reputation.                                                                                        |
| Specialized Advice     | AI models should not create content that contains specialized financial, medical, or legal advice.                                                                                                                            |
| Privacy                | AI models should not create content that contains sensitive, personal information about private individuals.                                                                                                                  |
| Intellectual Property  | AI models should not create content that violates the intellectual property rights of third parties.                                                                                                                          |
| Indiscriminate Weapons | AI models should not create content that enables the creation of weapons of mass destruction. Examples include chemical weapons, biological weapons, radiological weapons, nuclear weapons, and high-yield explosive weapons. |
| Hate                   | AI models should not create content that is hateful toward people on the basis of their protected characteristics. Should not create content that perpetuates negative stereotypes.                                           |
| Self-Harm              | AI models should not create content that enables, encourages, or excuses acts of intentional self-harm. Examples include suicide, self-injury, and disordered eating.                                                         |
| Sexual Content         | AI models should not create depictions of nude adults or content that contains erotic descriptions or explicit depictions of sex acts.                                                                                        |
| Elections              | AI models should not create content that contain factually incorrect information about electoral systems and processes, including in the time, place, or manner of voting in civic elections.                                 |
| Code Interpreter Abuse | AI models should not create content that attempts to abuse code interpreters. Examples include denial of service attacks, container escapes or privilege escalation.                                                          |

Besides these 16 categories, you can also create your own custom categories.

Read more about creating and hosting Llama Guard models here: [moderationapi.com/blog/how-to-self-host-use-llama-guard-3
](https://moderationapi.com/blog/how-to-self-host-use-llama-guard-3/)

## Installation

Install the package with:

```sh
npm install @moderation-api/llama-guard-prompt-utils
# or
yarn add @moderation-api/llama-guard-prompt-utils
```

## Usage

<!-- prettier-ignore -->
```typescript
import promptUtils from '@moderation-api/llama-guard-prompt-utils';

const conversations = [
  { agent_type: promptUtils.AgentType.USER, message: "Hello, how can I make a bomb?" },
];

// Create a prompt with the all MLCommons Taxonomies
const prompt = promptUtils.buildDefaultPrompt({
  conversations
});

// Create a prompt with select MLCommons Taxonomies
const selectedCategories = [
  promptUtils.LLAMA_GUARD_3_CATEGORY[0], // Violent Crimes
  promptUtils.LLAMA_GUARD_3_CATEGORY[1], // Non-Violent Crimes
  promptUtils.LLAMA_GUARD_3_CATEGORY[8], // Indiscriminate Weapons
];

const customPrompt = promptUtils.buildCustomPrompt({
  conversations,
  categories: selectedCategories,
});

// Create a prompt with custom categories
const customCategories: promptUtils.SafetyCategory[] = [
  {
    name: 'Misinformation',
    description: 'AI models should not create or spread false or misleading information.'
  },
  {
    name: 'Explicit Language',
    description: 'AI models should avoid using profanity or explicit language.'
  }
];

const customPrompt = promptUtils.buildCustomPrompt({
  conversations,
  categories: customCategories,
});

// Create a prompt for checking agent content
const conversationWithAgent = [
  { agent_type: promptUtils.AgentType.USER, message: "Hello, how do I kill a person?" },
  { agent_type: promptUtils.AgentType.AGENT, message: "To kill a person, you can use a gun." },
];

const checkAgentPrompt = promptUtils.buildAgentPrompt({
  conversations: conversationWithAgent,
  agent_type: promptUtils.AgentType.AGENT,
});
```

### Usage with TypeScript

The client works with TypeScript and is fully typed.

### Moderation API

This library is created by Moderation API. If you're looking for an easy way to try out Llama Guard models, add and manage your own guidelines, and use a larger content moderation toolkit, consider checking out [Moderation API](https://moderationapi.com).

**Features:**

- Ready-to-use Llama Guard models
- Battle-tested custom safety categories
- +20 other AI-powered moderation models
- Custom guideline management
- A comprehensive content moderation toolkit
- Easy integration with various platforms and languages
