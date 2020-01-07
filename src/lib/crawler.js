import axios from 'axios';

export default async function getData() {
    let body;
    try {
        const uri = 'http://www.jejunu.ac.kr/camp/sai/academyschedule';
        const { data } = await axios.get(uri);
        body = data;
    } catch(err) {
        console.error(err);
    } finally {
        return body;
    }
    
}