import Mock from 'mockjs';
import axios from 'axios';

Mock.mock('/api/login', 'post', (options) => {
    const { username, password } = JSON.parse(options.body);
    if (username === 'developer' && password === 'developer') {
        return { role: 'developer' };
    } else if (username === 'tester' && password === 'tester') {
        return { role: 'tester' };
    } else if (username === 'operator' && password === 'operator') {
        return { role: 'operator' };
    } else {
        return { role: 'guest' };
    }
});

Mock.mock('/api/interfaces', 'get', {
    'interfaces|5-10': [
        {
            'id|+1': 1,
            'name': '@title',
            'description': '@sentence',
            'url': '@url',
        },
    ],
});


