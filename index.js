'use strict';

const fs = require('fs');
const path = require('path');
const createIndex = require('create-eslint-index');

const rules = {};
for (const file of fs.readdirSync(`${__dirname}/rules`)) {
  const ruleName = path.basename(file, path.extname(file));
  rules[ruleName] = require(`./rules/${ruleName}`);
}

const externalRecommendedRules = {
  'no-var': 'error'
};

const internalRecommendedRules = createIndex.createConfig({
  plugin: 'fp',
  field: 'meta.docs.recommended'
}, rules);

module.exports = {
  rules,
  configs: {
    recommended: {
      rules: Object.assign({}, internalRecommendedRules, externalRecommendedRules)
    }
  }
};
