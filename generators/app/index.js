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
      'Welcome to the ' + chalk.white.bgRed('Public Integrity App') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'appname',
      message: 'What\'s the name of this project?',
      default: 'newproject'
      /*
      filter: function(response) {
        return this.s.slugify(response);
      }.bind(this)*/
    }];

    this.prompt(prompts, function (props) {
      this.props = props;

      this.props.year = (new Date()).getFullYear();
      this.props.month = ('0' + ((new Date()).getMonth()+1)).slice(-2);

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
    }
  },

  install: function () {
    this.npmInstall();
  }
});
