export const paths = {
    home: '/',
    aboutUs: '/about-us',
    restaurants: '/restaurants',
    createNewRestaurant: '/my-restaurants/new',
    login: '/login',
    auth0: {
        callback: '/auth/auth/callback',
        login: '/auth/auth/login'
    },
    components: {
        NavigtionMenu: {
            visitor: [
                { name: 'Home', url: '/' },
                { name: 'Restaurants', url: '/restaurants' },
                { name: 'Sign Up', url: '/signup' },
                { name: 'Login', url: '/api/auth/login' }
            ],
            customer: [
                { name: 'Home', url: '/' },
                { name: 'Restaurants', url: '/restaurants' },
                { name: 'Profile', url: '/profile' },
                { name: 'My Reviews', url: '/reviews' },
                { name: 'Logout', url: '/api/auth/logout' }
            ],
            serviceProvider: [
                { name: 'Home', url: '/' },
                { name: 'Restaurants', url: '/restaurants' },
                { name: 'Profile', url: '/profile' },
                { name: 'My Restaurants', url: '/my-restaurants' },
                { name: 'Logout', url: '/api/auth/logout' }
            ]

        },
        dataDisplay: {
            detailLists: '/components/data-display/detail-lists',
            tables: '/components/data-display/tables',
            quickStats: '/components/data-display/quick-stats'
        },
    },
    401: '/401',
    404: '/404',
    500: '/500'
};
