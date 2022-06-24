const apiUrl: string = process.env.NODE_ENV === 'development' ? 'http://localhost:1986' : (process.env.REACT_APP_API ?? '');

export default apiUrl;
