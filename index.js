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
    const repositoryName = repository.name
    const response = await octokit.request(`GET /repos/${ownerName}/${repositoryName}/compare/${base}...${compare}`)

    let pullRequests = []
    response.data.commits.forEach(function(commit){
        octokit.request(`GET /repos/${ownerName}/${repositoryName}/commits/${commit.sha}/pulls`)
            .then(response => {
                const result = JSON.stringify(response.data, undefined, 2)
                console.log(`number : ${result.number}, title : ${result.title}, user.login : ${result.user.login}`)
            });
    })

}

main();