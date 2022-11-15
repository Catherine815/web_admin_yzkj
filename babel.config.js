/*
 * @Description: file desc
 * @Author: zhangwang
 * @Date: 2022-04-13 13:38:42
 * @LastEditors: zhangwang
 * @LastEditTime: 2022-04-20 12:47:41
 * @FilePath: \explorer\babel.config.js
 */
module.exports = {
  'presets': [
    '@vue/cli-plugin-babel/preset'
  ],
  'env': {
    'development': {
      // babel-plugin-dynamic-import-node plugin only does one thing by converting all import() to require().
      // This plugin can significantly increase the speed of hot updates, when you have a large number of pages.
      // https://panjiachen.github.io/vue-element-admin-site/guide/advanced/lazy-loading.html
      'plugins': ['dynamic-import-node']
    }
  },
  'plugins': [
    [
      'component',
      {
        'libraryName': 'element-ui',
        'styleLibraryName': 'theme-chalk'
      }
    ]
  ]
}
