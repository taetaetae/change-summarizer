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
    octokit.request(`GET /repos/${ownerName}/${repositoryName}/compare/${base}...${compare}`)
        .then(response => {
            const result = JSON.stringify(response.data, undefined, 2);
            console.log(`result : ${result}`)
        });
}

main();