const core = require('@actions/core');
const github = require('@actions/github');

try {
    const token = core.getInput('token');
    console.log(`token : ${token}!`);
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    console.log(`token : ${time}!`);
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}