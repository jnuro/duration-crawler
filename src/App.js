import { crawler, parser } from './lib';
import git from 'simple-git/promise'

const USER = process.env['USER'];
const PASSWORD = process.env['PASSWORD'];
const REPONAME = process.env['REPONAME'];
const REPO = process.env['REPO']

export default async function App() {
    const data = await crawler();
    const arr = parser(data);
    const remote = `https://${USER}:${PASSWORD}@${REPO}`;
    console.log(arr);
    // try {
    //     await git().clone(remote);
    //     console.log('database was successfully cloned');

    //     const databaseGit = await git(`${__dirname}/../${REPONAME}`);
    //     console.log(await databaseGit.status())

    // } catch(err) {
    //     console.error('failed: ', err)
    // }
    
}