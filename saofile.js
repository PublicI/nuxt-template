module.exports = {
    prompts() {
        return [
            {
                name: "name",
                message: "Project name",
                default: this.outFolder,
                filter: (val) => val.toLowerCase().replace(/ /g, "-"),
            },
            {
                name: "description",
                message: "Project description",
                default: ``,
            },
            {
                name: "author",
                message: "Author",
                default: this.gitUser.name,
                store: true,
            },
            {
                name: "host",
                message: "Domain",
                default: "apps.publicintegrity.org",
                store: true,
            },
        ];
    },
    templateDir: '.',
    actions: [
        {
            type: "add",
            files: "**",
            filters: {
                "**/.DS_Store": false,
            },
        },
        {
            type: "remove",
            files: 'saofile.js',
        },
        {
            type: "move",
            patterns: {
                "_package.json": "package.json",
            },
        },
        {
            type: "move",
            patterns: {
                "_README.md": "README.md",
            },
        },
    ],
    async completed() {
        this.gitInit();
        await this.npmInstall({
            npmClient: "npm",
        });
        this.showProjectTips();

        console.log(`To start a development server which serves the project at http://localhost:3000/${this.outDir}, navigate to that directory and run "npm run dev".`);
    },
};
