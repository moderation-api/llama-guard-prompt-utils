export declare enum LlamaGuardVersion {
    LLAMA_GUARD_1 = "Llama Guard 1",
    LLAMA_GUARD_2 = "Llama Guard 2",
    LLAMA_GUARD_3 = "Llama Guard 3"
}
export declare enum AgentType {
    AGENT = "Agent",
    USER = "User"
}
export interface SafetyCategory {
    name: string;
    description: string;
}
interface ConversationTurn {
    message: string;
    agent_type: AgentType;
}
export declare const PROMPT_TEMPLATE_1: string;
export declare const PROMPT_TEMPLATE_2: string;
export declare const PROMPT_TEMPLATE_3: string;
export declare const LLAMA_GUARD_3_CATEGORY: SafetyCategory[];
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
export declare function buildDefaultPrompt({ conversations, agent_type, llama_guard_version, }: {
    conversations: ConversationTurn[];
    agent_type?: AgentType;
    llama_guard_version?: LlamaGuardVersion;
}): string;
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
export declare function buildCustomPrompt({ conversations, agent_type, categories, prompt_template, category_short_name_prefix, with_policy, }: {
    conversations: ConversationTurn[];
    agent_type?: AgentType;
    categories?: SafetyCategory[];
    prompt_template?: string;
    category_short_name_prefix?: string;
    with_policy?: boolean;
}): string;
export declare const getCategoryFromShortName: (category_short_name: string, categories: SafetyCategory[], category_short_name_prefix?: string) => SafetyCategory | undefined;
export {};
