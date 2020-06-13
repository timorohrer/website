const metalsmith        = require('metalsmith'),
      markdown          = require('metalsmith-markdown'),
      layouts           = require('metalsmith-layouts'),
      permalinks        = require('metalsmith-permalinks'),
      collections       = require('metalsmith-collections'),
      handlebars        = require('handlebars');

handlebars.registerHelper('moment', require('helper-moment'));

metalsmith(__dirname)
  .source('./src')
  .destination('./build')
  .clean(true)
  .use(collections({
    posts: {
      pattern: 'blog/**/*.md',
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(markdown())
  .use(permalinks({
    relative: false
  }))
  .use(layouts({
    default: 'article.hbs',
  }))
  .build(function(err) {
    if (err) throw err;
  });

