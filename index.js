const core = require('@actions/core');
const github = require('@actions/github');

try {
    const base = core.getInput('base')
    const compare = core.getInput('compare')
    const token = core.getInput('token')

    console.log(`base : ${base}, compare : ${compare}`)

    const payload = JSON.stringify(github.context.payload, undefined, 2)
    const octokit = github.getOctokit(token)
    let repository = github.context.payload.repository;

    let compareCommits = octokit.rest.compareCommits({
        repository.owner.name,
        repository.name,
        base,
        compare,
    });

    const result = JSON.stringify(compareCommits, undefined, 2);
    console.log(`result : ${result}`)

} catch (error) {
    core.setFailed(error.message);
}