import { crawler, parser } from './lib';
import git from 'simple-git/promise'
import fs from 'fs';

const USER = process.env['GITUSER'];
const PASSWORD = process.env['GITPASSWORD'];
const REPONAME = process.env['GITREPONAME'];
const REPO = process.env['GITREPO']

export default async function App() {
    const data = await crawler();
    const arr = parser(data);
    const remote = `https://${USER}:${PASSWORD}@${REPO}`;
    console.log(arr);
    try {
        await git().silent(true).clone(remote);
        console.log('database was successfully cloned');
        const loc = `${__dirname}/../${REPONAME}`
        
        await fs.writeFile(`${loc}/a.json`, JSON.stringify(arr), 'utf8', (err) => {
            if(err) throw err;
            console.log("file was saved")
        });

        const databaseGit = git(loc);
        console.log(await databaseGit.getRemotes())

    } catch(err) {
        console.error('failed: ', err)
    }
    
}