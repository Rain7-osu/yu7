#!/usr/bin/env node

const packageJson = require('../package.json');
const { program } = require('commander');
const path = require('path');
const fe = require('fs-extra');
const fs = require('fs');
const chalk = require('chalk');
const execa = require('execa');
const prompts = require('prompts');

const { info, error, br, log } = require('./lib');

const { version } = packageJson;

let targetDir;

const DEFAULT_PROJECT_NAME = 'yu-project';

const TEMPLATES = [
  {
    name: 'react-ts',
    files: [
      'src',
      'script',
      '.husky',
      '.eslintrc.js',
      'index.html',
      'package.json',
      'tsconfig.json',
      'vite.config.ts',
      '.gitignore',
    ],
    info: (appName) => {
      return `Please use these command to run your project.
        cd ${appName}
        pnpm i
        pnpm dev
      `;
    },
  },
  {
    name: 'express-reverse-proxy',
    files: [
      'index.js',
      'package.json',
    ],
    info: (appName) => {
      return `Please use these command to run your project.
        cd ${appName}
        pnpm i
        npm start
      `;
    },
  },
  {
    name: 'wx-mini-ts',
    files: [
      'miniprogram',
      'typings',
      '.eslintrc.js',
      '.gitignore',
      'package.json',
      'project.config.json',
      'tsconfig.json',
      '.husky',
      'script',
    ],
    info: (appName) => {
      return `
        Please use these command to run your project.
        cd ${appName}
        pnpm i
        npx tsc --watch
      `
    }
  }
];

const FRAMEWORKS = [
  chalk.green(`${TEMPLATES[0].name} ${chalk.gray('(react-router, styled-components, classNames, dva, vite)')}`),
  chalk.blue(`${TEMPLATES[1].name} ${chalk.gray('(http-proxy-middleware)')}`),
  chalk.green(`${TEMPLATES[2].name} ${chalk.gray('(wx-mini-program, typescript, eslint, husky)')}`),
];

async function init() {
  program.version(version);

  program.option('-v --version', 'Show the Version');

  program.command('init [targetDir]').action(async (name) => {
    targetDir = name;

    let result = {};

    try {
      result = await prompts([
        {
          type: targetDir ? null : 'text',
          name: 'projectName',
          message: 'Project name:',
          initial: DEFAULT_PROJECT_NAME,
          onState: (state) => {
            targetDir = state.value.trim() || DEFAULT_PROJECT_NAME;
          },
        },
        {
          type: () => {
            return (!fs.existsSync(targetDir) || isEmpty(targetDir)) ? null : 'confirm';
          },
          name: 'overwrite',
          message: () => {
            const prefixMsg = targetDir === '.' ? 'Current directory' : `Target directory "${targetDir}"`;
            return `${prefixMsg} is not empty. Remove existing files and continue?`;
          },
        },
        {
          type: (_, { overwrite } = {}) => {
            if (overwrite === false) {
              throw new Error(chalk.red('×') + ' Operation cancelled');
            }

            return null;
          },
          name: 'overwriteChecker',
        },
        {
          type: 'select',
          name: 'framework',
          message: 'Select a framework:',
          initial: 0,
          choices: FRAMEWORKS.map((framework, value) => {
            return {
              title: framework,
              value,
            };
          }),
        },
      ], {
        onCancel: () => {
          throw new Error(chalk.red('×') + ' Operation cancelled');
        },
      });
    } catch (e) {
      console.log(e.message);
      return;
    }

    const { framework, overwrite } = result;

    await createApp(targetDir);

    async function createApp(name) {
      const root = path.resolve(name);
      const appName = path.basename(root);

      if (overwrite) {
        fe.emptydirSync(root);
      } else {
        fe.ensureDirSync(root);
      }

      const gitInit = async () => {
        const { stdout } = await execa('git', ['init', appName]);
        info(stdout);
      };

      await gitInit();

      for (const file of TEMPLATES[framework].files) {
        try {
          await fe.copy(path.resolve(__dirname, '..', `packages/template-${TEMPLATES[framework].name}`, file), path.resolve(root, file));
          info(`generate ${chalk.underline(file)} success.`);
        } catch (err) {
          error(err);
        }
      }

      br();
      log(TEMPLATES[framework].info(appName));
    }
  });

  program.parse(process.argv);

  const options = program.opts();

  if (options.version) {
    log(version);
  }

  // function isValidPackageName(projectName) {
  //   return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(
  //     projectName,
  //   );
  // }

  function isEmpty(path) {
    return fs.readdirSync(path).length === 0;
  }
}

init().catch(console.log);
