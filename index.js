const core = require('@actions/core');
const github = require('@actions/github');

try {
    const base = core.getInput('base')
    const compare = core.getInput('compare')
    const token = core.getInput('token')

    console.log(`base : ${base}, compare : ${compare}`)

    const payload = JSON.stringify(github.context.payload, undefined, 2)
    const octokit = github.getOctokit(token)
    const repository = github.context.payload.repository
    const ownerName = repository.owner.name
    const repositoryName = repository.name;

    let compareCommits = octokit.rest.compareCommits({
        ownerName,
        repositoryName,
        base,
        compare,
    });

    const result = JSON.stringify(compareCommits, undefined, 2);
    console.log(`result : ${result}`)

} catch (error) {
    core.setFailed(error.message);
}