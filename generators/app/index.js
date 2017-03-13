var chalk = require('chalk'),
    Generator = require('yeoman-generator'),
    yosay = require('yosay'),
    s = require('underscore.string');

module.exports = Generator.extend({
    prompting: {
        prompt() {
            const done = this.async();

            // Have Yeoman greet the user.
            this.log(yosay(
                `Welcome to the ${chalk.white.bgRed('Public Integrity')} app generator!`
            ));

            const prompts = [{
                type: 'input',
                name: 'appname',
                message: 'What\'s the name of this project?',
                default: 'New project'
            }];

            this.prompt(prompts, props => {
                this.props = props;

                this.props.year = (new Date()).getFullYear();
                this.props.month = (`0${(new Date()).getMonth()+1}`).slice(-2);

                this.width = '<%= width %>'; // hack

                done();
            });
        }
    },

    writing: {
        pkg() {
            this.fs.copyTpl(
                this.templatePath('_package.json'),
                this.destinationPath('package.json'),
                this, { interpolate: /<%=([\s\S]+?)%>/g }
            );
        },
        gitignore() {
            this.fs.copy(
                this.templatePath('_.gitignore'),
                this.destinationPath('.gitignore'),
                this, { interpolate: /<%=([\s\S]+?)%>/g }
            );
        },
        config() {
            this.fs.copy(
                this.templatePath('config.yml.example'),
                this.destinationPath('config.yml.example'),
                this, { interpolate: /<%=([\s\S]+?)%>/g }
            );
        },
        gulpfile() {
            this.fs.copyTpl(
                this.templatePath('gulpfile.js'),
                this.destinationPath('gulpfile.js'),
                this, { interpolate: /<%=([\s\S]+?)%>/g }
            );
        },
        readme() {
            this.fs.copyTpl(
                this.templatePath('README.md'),
                this.destinationPath('README.md'),
                this, { interpolate: /<%=([\s\S]+?)%>/g }
            );
        },
        src() {
            this.fs.copyTpl(
                this.templatePath('src/*'),
                this.destinationPath('src'),
                this, { interpolate: /<%=([\s\S]+?)%>/g }
            );
        },
        data() {
            this.fs.copy(
                this.templatePath('src/data/*'),
                this.destinationPath('src/data'),
                this, { interpolate: /<%=([\s\S]+?)%>/g }
            );
        },
        script() {
            this.fs.copyTpl(
                this.templatePath('src/script/*'),
                this.destinationPath('src/script'),
                this, { interpolate: /<%=([\s\S]+?)%>/g }
            );
        },
        lib() {
            this.fs.copy(
                this.templatePath('src/script/lib/**'),
                this.destinationPath('src/script/lib'),
                this, { interpolate: /<%=([\s\S]+?)%>/g }
            );
        },
        style() {
            this.fs.copyTpl(
                this.templatePath('src/style/*'),
                this.destinationPath('src/style'),
                this, { interpolate: /<%=([\s\S]+?)%>/g }
            );
        },
        util() {
            this.fs.copy(
                this.templatePath('src/util/*'),
                this.destinationPath('src/util'),
                this, { interpolate: /<%=([\s\S]+?)%>/g }
            );
        }
    },

    installing: {
        install() {
            this.yarnInstall();
        }
    }
});
