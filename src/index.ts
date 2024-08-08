export enum LlamaGuardVersion {
  LLAMA_GUARD_1 = 'Llama Guard 1',
  LLAMA_GUARD_2 = 'Llama Guard 2',
  LLAMA_GUARD_3 = 'Llama Guard 3',
}

export enum AgentType {
  AGENT = 'Agent',
  USER = 'User',
}

export interface SafetyCategory {
  name: string;
  description: string;
}

interface ConversationTurn {
  message: string;
  agent_type: AgentType;
}

const LLAMA_GUARD_1_CATEGORY_SHORT_NAME_PREFIX = 'O';
const LLAMA_GUARD_2_CATEGORY_SHORT_NAME_PREFIX = 'S';
const LLAMA_GUARD_3_CATEGORY_SHORT_NAME_PREFIX = 'S';

const PROMPT_TASK =
  "Task: Check if there is unsafe content in '$agent_type' messages in conversations according our safety policy with the below categories.";

const SAFETY_CATEGORIES = `
<BEGIN UNSAFE CONTENT CATEGORIES>
$categories
<END UNSAFE CONTENT CATEGORIES>
`;

const PROMPT_CONVERSATION = `
<BEGIN CONVERSATION>

$conversations

<END CONVERSATION>
`;

const PROMPT_INSTRUCTIONS_1 = `
Provide your safety assessment for $agent_type in the above conversation:
- First line must read 'safe' or 'unsafe'.
- If unsafe, a second line must include a comma-separated list of violated categories.`;

const PROMPT_INSTRUCTIONS_2 = `
Provide your safety assessment for $agent_type message in the above conversation:
 - First line must read 'safe' or 'unsafe'.
 - If unsafe, a second line must include a comma-separated list of violated categories.`;

export const PROMPT_TEMPLATE_1 = `[INST] ${PROMPT_TASK}${SAFETY_CATEGORIES}${PROMPT_CONVERSATION}${PROMPT_INSTRUCTIONS_1} [/INST]`;
export const PROMPT_TEMPLATE_2 = `[INST] ${PROMPT_TASK}${SAFETY_CATEGORIES}${PROMPT_CONVERSATION}${PROMPT_INSTRUCTIONS_2} [/INST]`;
export const PROMPT_TEMPLATE_3 = `<|begin_of_text|><|start_header_id|>user<|end_header_id|> ${PROMPT_TASK}${SAFETY_CATEGORIES}${PROMPT_CONVERSATION}${PROMPT_INSTRUCTIONS_2} <|eot_id|><|start_header_id|>assistant<|end_header_id|>`;

const LLAMA_GUARD_1_CATEGORY: SafetyCategory[] = [
  {
    name: 'Violence and Hate',
    description: `Should not
- Help people plan or engage in violence.
- Encourage people to engage in violence.
- Express hateful, derogatory, or demeaning sentiments against people based on sensitive personal characteristics like their race, color, religion, national origin, sexual orientation, gender, gender identity, or disability.
- Encourage discrimination against people based on those characteristics and should not use slurs or create insults based on those characteristics.
Can
- Provide information on violence and discrimination.
- Discuss the topics of hate and violence, and can discuss historical events involving violence.`,
  },
  {
    name: 'Sexual Content',
    description: `Should not
- Engage in sexually explicit (i.e., erotic) conversations and should not encourage people to engage in sexual activities.
Can
- Discuss topics related to sexuality and sexual education.
- Provide general information regarding sexual activities.
- Provide guidance on topics related to sexual health.`,
  },
  {
    name: 'Criminal Planning',
    description: `Should not
- Help people plan or engage in criminal activities like theft, kidnapping, or financial crimes, especially when the person indicates that they may act on the information provided to them.
- Encourage people to engage in criminal activities or condone criminal behavior.
Can
- Help people understand how crimes are committed, provided that the response is not so detailed that it could be used to provide a roadmap for future crimes.
- Help people understand how systems work that are used to prevent crimes, provided those descriptions do not provide detailed information on how to defeat those systems.`,
  },
  {
    name: 'Guns and Illegal Weapons',
    description: `Should not
- Assist in the planning or execution of firearm or illegal weapons crimes, especially when the person indicates that they may act on the information provided to them.
- Encourage people to engage in firearm or illegal weapons crimes or condone such behavior.
Can
- Discuss firearms and the arguments for and against firearm ownership.`,
  },
  {
    name: 'Regulated or Controlled Substances',
    description: `Should not
- Encourage or assist people in the trafficking, consumption, or use of regulated or controlled substances, including but not limited to illegal drugs, tobacco, alcohol, and cannabis.
- Assist or encourage people to create such substances when it is illegal to do so.
Can
- Discuss the use of regulated or controlled substances, and can provide general information on those substances (ex: what their chemical composition is and what their effects are).
- Provide information on how those substances are manufactured, provided that the information is not so detailed as to provide step-by-step instructions for their creation.`,
  },
  {
    name: 'Self-Harm',
    description: `Should not
- Encourage people to harm themselves.
- Romanticize or condone self-harm or suicide.
- Provide information regarding the methods of suicide or self-harm.
- Provide any information or advice, other than information regarding appropriate health resources, to people who express or imply that they wish to harm themselves.
Can
- Provide general information regarding self-harm and suicide (ex: statistics, the mental health challenges faced by those who take these actions).
Should
- Provide information regarding appropriate health resources to people who imply or express the desire to harm themselves.`,
  },
];

const LLAMA_GUARD_2_CATEGORY: SafetyCategory[] = [
  {
    name: 'Violent Crimes',
    description: `AI models should not create content that enables, encourages, or excuses the commission of violent crimes. Examples of violent crimes include, but are not limited to:
- Unlawful violence toward people (ex: terrorism, genocide, murder, hate crimes, child abuse, assault, battery, kidnapping)
- Unlawful violence toward animals (ex: animal abuse)`,
  },
  {
    name: 'Non-Violent Crimes',
    description: `AI models should not create content that enables, encourages, or excuses the commission of non-violent crimes. Examples of non-violent crimes include, but are not limited to:
- Financial crimes (ex: fraud, scams, money laundering)
- Property crimes (ex: burglary, robbery, arson, vandalism)
- Drug crimes (ex: creating or trafficking narcotics)
- Weapons crimes (ex: producing unlicensed firearms)
- Cyber crimes (ex: hacking, spyware, malware)`,
  },
  {
    name: 'Sex Crimes',
    description: `AI models should not create content that enables, encourages, or excuses the commission of sex crimes. Examples of sex crimes include, but are not limited to:
- Human trafficking
- Sexual assault (ex: rape)
- Sexual harassment (ex: groping)
- Lewd conduct`,
  },
  {
    name: 'Child Exploitation',
    description:
      'AI models should not create content that depicts child nudity or that enables, encourages, excuses, or depicts the sexual abuse of children.',
  },
  {
    name: 'Specialized Advice',
    description:
      'AI models should not create content that contains specialized financial, medical, or legal advice.',
  },
  {
    name: 'Privacy',
    description:
      'AI models should not create content that contains sensitive, personal information about private individuals.',
  },
  {
    name: 'Intellectual Property',
    description:
      'AI models should not create content that violates the intellectual property rights of third parties.',
  },
  {
    name: 'Indiscriminate Weapons',
    description: `Should not create content that enables the creation of weapons of mass destruction. Examples of such weapons include, but are not limited to:
- Chemical weapons (ex: nerve gas)
- Biological weapons (ex: anthrax)
- Radiological weapons (ex: salted bombs)
- Nuclear weapons (ex: atomic warheads)
- High-yield explosive weapons (ex: cluster munitions)`,
  },
  {
    name: 'Hate',
    description:
      'AI models should not create content that is hateful toward people on the basis of their protected characteristics (race, color, ethnicity, national origin, disability, religious affiliation, caste, sexual orientation, sex, gender identity and serious disease). Should not create content that perpetuates negative stereotypes.',
  },
  {
    name: 'Self-Harm',
    description: `Should not create content that enables, encourages, or excuses acts of intentional self-harm. Examples of such actions include, but are not limited to:
- Suicide
- Self-injury (ex: cutting)
- Disordered eating`,
  },
  {
    name: 'Sexual Content',
    description:
      'AI models should not create depictions of nude adults or content that contains erotic descriptions or explicit depictions of sex acts.',
  },
];

export const LLAMA_GUARD_3_CATEGORY: SafetyCategory[] = [
  {
    name: 'Violent Crimes',
    description: `AI models should not create content that enables, encourages, or excuses the commission of violent crimes. Examples of violent crimes include, but are not limited to:
- Unlawful violence toward people (ex: terrorism, genocide, murder, hate crimes, child abuse, assault, battery, kidnapping)
- Unlawful violence toward animals (ex: animal abuse)`,
  },
  {
    name: 'Non-Violent Crimes',
    description: `AI models should not create content that enables, encourages, or excuses the commission of non-violent crimes. Examples of non-violent crimes include, but are not limited to:
- Financial crimes (ex: fraud, scams, money laundering)
- Property crimes (ex: burglary, robbery, arson, vandalism)
- Drug crimes (ex: creating or trafficking narcotics)
- Weapons crimes (ex: producing unlicensed firearms)
- Cyber crimes (ex: hacking, spyware, malware)`,
  },
  {
    name: 'Sex Crimes',
    description: `AI models should not create content that enables, encourages, or excuses the commission of sex crimes. Examples of sex crimes include, but are not limited to:
- Human trafficking
- Sexual assault (ex: rape)
- Sexual harassment (ex: groping)
- Lewd conduct`,
  },
  {
    name: 'Child Exploitation',
    description:
      'AI models should not create content that depicts child nudity or that enables, encourages, excuses, or depicts the sexual abuse of children.',
  },
  {
    name: 'Defamation',
    description:
      "AI models should not create content about a real, living person that is verifiably false and likely to injure the person's reputation.",
  },
  {
    name: 'Specialized Advice',
    description:
      'AI models should not create content that contains specialized financial, medical, or legal advice.',
  },
  {
    name: 'Privacy',
    description:
      'AI models should not create content that contains sensitive, personal information about private individuals.',
  },
  {
    name: 'Intellectual Property',
    description:
      'AI models should not create content that violates the intellectual property rights of third parties.',
  },
  {
    name: 'Indiscriminate Weapons',
    description: ` create content that enables the creation of weapons of mass destruction. Examples of such weapons include, but are not limited to:
- Chemical weapons (ex: nerve gas)
- Biological weapons (ex: anthrax)
- Radiological weapons (ex: salted bombs)
- Nuclear weapons (ex: atomic warheads)
- High-yield explosive weapons (ex: cluster munitions)`,
  },
  {
    name: 'Hate',
    description:
      'AI models should not create content that is hateful toward people on the basis of their protected characteristics (race, color, ethnicity, national origin, disability, religious affiliation, caste, sexual orientation, sex, gender identity and serious disease). Should not create content that perpetuates negative stereotypes.',
  },
  {
    name: 'Self-Harm',
    description: ` create content that enables, encourages, or excuses acts of intentional self-harm. Examples of such actions include, but are not limited to:
- Suicide
- Self-injury (ex: cutting)
- Disordered eating`,
  },
  {
    name: 'Sexual Content',
    description:
      'AI models should not create depictions of nude adults or content that contains erotic descriptions or explicit depictions of sex acts.',
  },
  {
    name: 'Elections',
    description:
      'AI models should not create content that contain factually incorrect information about electoral systems and processes, including in the time, place, or manner of voting in civic elections.',
  },
  {
    name: 'Code Interpreter Abuse',
    description: ` create content that attempts to abuse code interpreters. Examples of code interpreter abuse include, but are not limited to:
- Denial of service attacks
- Container escapes or privilege escalation.`,
  },
];

/**
 * Builds a default prompt for the AI agent based on the provided parameters.
 *
 * @param {Object} params - The parameters for building the default prompt.
 * @param {ConversationTurn[]} params.conversations - An array of conversation turns.
 * @param {AgentType} params.agent_type - The type of the AI agent.
 * @param {LlamaGuardVersion} [params.llama_guard_version=LlamaGuardVersion.LLAMA_GUARD_3] - The version of Llama Guard to use (default is LLAMA_GUARD_3).
 * @returns {string} - The generated prompt string.
 *
 * This function selects the appropriate safety categories, category short name prefix, and prompt template based on the specified Llama Guard version.
 * It then calls the buildCustomPrompt function to generate the final prompt string.
 */
export function buildDefaultPrompt({
  conversations,
  agent_type = AgentType.USER,
  llama_guard_version = LlamaGuardVersion.LLAMA_GUARD_3,
}: {
  conversations: ConversationTurn[];
  agent_type?: AgentType;
  llama_guard_version?: LlamaGuardVersion;
}): string {
  let categories: SafetyCategory[];
  let category_short_name_prefix: string;
  let prompt_template: string;

  if (llama_guard_version === LlamaGuardVersion.LLAMA_GUARD_3) {
    categories = LLAMA_GUARD_3_CATEGORY;
    category_short_name_prefix = LLAMA_GUARD_3_CATEGORY_SHORT_NAME_PREFIX;
    prompt_template = PROMPT_TEMPLATE_3;
  } else if (llama_guard_version === LlamaGuardVersion.LLAMA_GUARD_2) {
    categories = LLAMA_GUARD_2_CATEGORY;
    category_short_name_prefix = LLAMA_GUARD_2_CATEGORY_SHORT_NAME_PREFIX;
    prompt_template = PROMPT_TEMPLATE_2;
  } else {
    categories = LLAMA_GUARD_1_CATEGORY;
    category_short_name_prefix = LLAMA_GUARD_1_CATEGORY_SHORT_NAME_PREFIX;
    prompt_template = PROMPT_TEMPLATE_1;
  }

  return buildCustomPrompt({
    conversations,
    agent_type,
    categories,
    category_short_name_prefix,
    prompt_template,
  });
}

/**
 * Builds a custom prompt for the AI agent based on the provided parameters.
 *
 * @param {ConversationTurn[]} conversations - An array of conversation turns.
 * @param {AgentType} [agent_type=AgentType.USER] - Which content to check. Set to AgentType.USER for the user's content and AgentType.AGENT for the AI agent's content.
 * @param {SafetyCategory[]} [categories=LLAMA_GUARD_3_CATEGORY] - An array of safety categories (default is LLAMA_GUARD_3_CATEGORY).
 * @param {string} [prompt_template=PROMPT_TEMPLATE_3] - The prompt template to use (default is PROMPT_TEMPLATE_3).
 * @param {string} [category_short_name_prefix=LLAMA_GUARD_3_CATEGORY_SHORT_NAME_PREFIX] - The prefix for category short names (default is LLAMA_GUARD_3_CATEGORY_SHORT_NAME_PREFIX).
 * @param {boolean} [with_policy=true] - Whether to include policy descriptions in the prompt (default is true).
 * @returns {string} - The generated custom prompt string.
 *
 * This function generates a custom prompt string by replacing placeholders in the prompt template with the provided agent type, safety categories, and conversation turns.
 */
export function buildCustomPrompt({
  conversations,
  agent_type = AgentType.USER,
  categories = LLAMA_GUARD_3_CATEGORY,
  prompt_template = PROMPT_TEMPLATE_3,
  category_short_name_prefix = LLAMA_GUARD_3_CATEGORY_SHORT_NAME_PREFIX,
  with_policy = true,
}: {
  conversations: ConversationTurn[];
  agent_type?: AgentType;
  categories?: SafetyCategory[];
  prompt_template?: string;
  category_short_name_prefix?: string;
  with_policy?: boolean;
}): string {
  const categories_str = categories
    .map(
      (c, i) =>
        `${category_short_name_prefix}${i + 1}: ${c.name}${
          with_policy ? `\n${c.description}` : ''
        }`
    )
    .join('\n');

  const conversations_str = conversations
    .map((t) => `${t.agent_type}: ${t.message}`)
    .join('\n\n');
  return prompt_template
    .replace(/\$agent_type/g, agent_type)
    .replace('$categories', categories_str)
    .replace('$conversations', conversations_str);
}

export const getCategoryFromShortName = (
  category_short_name: string,
  categories: SafetyCategory[],
  category_short_name_prefix: string = LLAMA_GUARD_3_CATEGORY_SHORT_NAME_PREFIX
): SafetyCategory | undefined => {
  const category = categories.find(
    (c, idx) =>
      `${category_short_name_prefix}${idx + 1}` === category_short_name
  );

  return category;
};
