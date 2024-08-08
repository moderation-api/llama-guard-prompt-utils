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

export interface ConversationTurn {
  message: string;
  agent_type: AgentType;
}

export function buildDefaultPrompt(params: {
  conversations: ConversationTurn[];
  agent_type?: AgentType;
  llama_guard_version?: LlamaGuardVersion;
}): string;

export function buildCustomPrompt(params: {
  conversations: ConversationTurn[];
  agent_type?: AgentType;
  categories?: SafetyCategory[];
  prompt_template?: string;
  category_short_name_prefix?: string;
  with_policy?: boolean;
}): string;

export function getCategoryFromShortName(
  category_short_name: string,
  categories: SafetyCategory[],
  category_short_name_prefix?: string
): SafetyCategory | undefined;

export const LLAMA_GUARD_3_CATEGORY: SafetyCategory[];
export const PROMPT_TEMPLATE_1: string;
export const PROMPT_TEMPLATE_2: string;
export const PROMPT_TEMPLATE_3: string;
