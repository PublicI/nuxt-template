var chalk = require('chalk'),
    yeoman = require('yeoman-generator'),
    yosay = require('yosay'),
    s = require('underscore.string');

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);

    this.s = s;
  },
  prompting: function () {

    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.white.bgRed('Public Integrity') + ' app generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'appname',
      message: 'What\'s the name of this project?',
      default: 'New project'
    }];

    this.prompt(prompts, function (props) {
      this.props = props;

      this.props.year = (new Date()).getFullYear();
      this.props.month = ('0' + ((new Date()).getMonth()+1)).slice(-2);

      this.width = '<%= width %>'; // hack

      done();
    }.bind(this));
  },

  writing: {
    pkg: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        this,
        { interpolate: /<%=([\s\S]+?)%>/g }
      );
    },
    gitignore: function () {
      this.fs.copy(
        this.templatePath('_.gitignore'),
        this.destinationPath('.gitignore'),
        this,
        { interpolate: /<%=([\s\S]+?)%>/g }
      );
    },
    config: function () {
      this.fs.copy(
        this.templatePath('config.yml.example'),
        this.destinationPath('config.yml.example'),
        this,
        { interpolate: /<%=([\s\S]+?)%>/g }
      );
    },
    gulpfile: function () {
      this.fs.copyTpl(
        this.templatePath('gulpfile.js'),
        this.destinationPath('gulpfile.js'),
        this,
        { interpolate: /<%=([\s\S]+?)%>/g }
      );
    },
    readme: function () {
      this.fs.copyTpl(
        this.templatePath('README.md'),
        this.destinationPath('README.md'),
        this,
        { interpolate: /<%=([\s\S]+?)%>/g }
      );
    },
    src: function () {
      this.fs.copyTpl(
        this.templatePath('src/*'),
        this.destinationPath('src'),
        this,
        { interpolate: /<%=([\s\S]+?)%>/g }
      );
    },
    data: function () {
      this.fs.copy(
        this.templatePath('src/data/*'),
        this.destinationPath('src/data'),
        this,
        { interpolate: /<%=([\s\S]+?)%>/g }
      );
    },
    script: function () {
      this.fs.copyTpl(
        this.templatePath('src/script/*'),
        this.destinationPath('src/script'),
        this,
        { interpolate: /<%=([\s\S]+?)%>/g }
      );
    },
    lib: function () {
      this.fs.copy(
        this.templatePath('src/script/lib/**'),
        this.destinationPath('src/script/lib'),
        this,
        { interpolate: /<%=([\s\S]+?)%>/g }
      );
    },
    style: function () {
      this.fs.copyTpl(
        this.templatePath('src/style/*'),
        this.destinationPath('src/style'),
        this,
        { interpolate: /<%=([\s\S]+?)%>/g }
      );
    },
    util: function () {
      this.fs.copy(
        this.templatePath('src/util/*'),
        this.destinationPath('src/util'),
        this,
        { interpolate: /<%=([\s\S]+?)%>/g }
      );
    }
  },

  install: function () {
    this.yarnInstall();
  }
});
