import eslintJs from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'

export default defineConfig(eslintJs.configs.recommended, tseslint.configs.recommended, {
  files: ['app/js/**/*.ts'],
  languageOptions: {
    globals: {
      ...globals.browser,
    },
  },
})
