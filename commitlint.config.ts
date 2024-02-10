import {
  RuleConfigCondition,
  RuleConfigSeverity,
  type UserConfig,
} from '@commitlint/types';
import commitizenConfig from './.cz-config.js';

const Configuration: UserConfig = {
  extends: ['git-commit-emoji'],
  rules: {
    'type-enum': [
      RuleConfigSeverity.Error,
      'always',
      commitizenConfig.types.map(({ value }) => value),
    ] as [RuleConfigSeverity, RuleConfigCondition, string[]],
    'type-case': [RuleConfigSeverity.Error, 'always', 'lower-case'] as const,
    'scope-empty': [RuleConfigSeverity.Disabled, 'never'] as const,
    'subject-empty': [RuleConfigSeverity.Error, 'never'] as const,
  },
};

module.exports = Configuration;
