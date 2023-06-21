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

    let pullRequests = new Map()
    response.data.commits.forEach(function (commit) {
        octokit.request(`GET /repos/${ownerName}/${repositoryName}/commits/${commit.sha}/pulls`)
            .then(response => {
                response.data.forEach(function (pull) {
                    console.log(`number : ${pull.number}, title : ${pull.title}, user.login : ${pull.user.login}`)
                    pullRequests.set(pull.number, {
                        'number': `${pull.number}`,
                        'title': `${pull.title}`,
                        'login': `${pull.user.login}`
                    })
                })
            })
        console.log('-----')
        pullRequests.forEach(function(data){
            console.log(data)
        })
    })



}

main();