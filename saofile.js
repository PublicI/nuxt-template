module.exports = {
  prompts() {
    return [
      {
        name: 'name',
        message: 'Project name',
        default: this.outFolder,
        filter: val => val.toLowerCase().replace(/ /g, '-')
      },
      {
        name: 'description',
        message: 'Project description',
        default: ``
      },
      {
        name: 'author',
        message: 'Author',
        default: this.gitUser.name,
        store: true
      },
      {
        name: 'host',
        message: 'Domain',
        default: 'apps.publicintegrity.org',
        store: true
      }
    ];
  },
  actions: [
    {
      type: 'add',
      files: '**',
      filters: {
          '**/.DS_Store': false
      }
    }
  ],
  async completed() {
    this.gitInit();
    await this.npmInstall({
      npmClient: 'npm'
    });
    this.showProjectTips();
  }
};
