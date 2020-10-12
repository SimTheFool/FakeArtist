import jobs from "./_fakeDatabase.js";

export function get(req, res, next)
{
    res.end(JSON.stringify(jobs));
}

export function post(req, res, next)
{
    const {name} = req.body;
    jobs.push({id: 3, name});
    res.end(JSON.stringify(jobs));
}