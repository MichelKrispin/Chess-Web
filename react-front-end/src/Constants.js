export const baseURL = '/api/'; //'http://127.0.0.1:5000/api/';
export const homePath = '/';
export const toHomePath = '/';
export const gamePath = '/:id';
export const toGamePath = (index) => { return '/' + index }; // Needs an index

export const refreshInterval = 5000; // The refresh interval in milliseconds
