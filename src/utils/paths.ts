export const paths = {
    index: '/',
    checkout: '/checkout',
    contact: '/contact',
    pricing: '/pricing',
    auth: {
        auth0: {
            callback: '/auth/auth/callback',
            login: '/auth/auth/login'
        }
    },
    components: {
        NavigtionMenu: {
            withoutAuth: [
                { name: 'Home', url: '/' },
                { name: 'Restaurants', url: '/restaurants' },
                { name: 'Login', url: '/api/auth/login' },
            ],
            withAuth: [
                { name: 'Home', url: '/' },
                { name: 'Restaurants', url: '/restaurants' },
                { name: 'Profile', url: '/profile' },
                { name: 'My Reviews', url: '/reviews' },
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
