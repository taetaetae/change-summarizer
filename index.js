const core = require('@actions/core');
const github = require('@actions/github');

async function main() {
    const base = core.getInput('base')
    const compare = core.getInput('compare')
    const token = core.getInput('token')

    console.log(`base : ${base}, compare : ${compare}, token : ${token}`)

    const octokit = github.getOctokit(token)
    const repository = github.context.payload.repository
    const ownerName = repository.owner.name
    const repositoryName = repository.name;
    const response = await octokit.request(`GET /repos/${ownerName}/${repositoryName}/compare/${base}...${compare}`)

    const commits = response.data.commits;
    for (const commit in commits) {
        console.log(`sha : ${JSON.stringify(commit, undefined, 2)}`)
    }
    const result = JSON.stringify(response.data.commits, undefined, 2);
}


    main();