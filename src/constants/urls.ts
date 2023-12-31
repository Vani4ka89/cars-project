const baseURL = 'http://owu.linkpc.net/carsAPI/v2';

const cars = '/cars';
const auth = '/auth';
const urls = {
    cars: {
        cars,
        byId: (id: number): string => `${cars}/${id}`,
        addPhoto: (id: number): string => `${cars}/${id}/photo`,
    },
    auth: {
        register: '/users',
        login: auth,
        refresh: `${auth}/refresh`,
        me: `${auth}/me`
    }
}

export {
    baseURL,
    urls
}