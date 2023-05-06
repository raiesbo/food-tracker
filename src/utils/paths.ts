export const paths = {
    home: '/',
    aboutUs: '/about-us',
    restaurants: '/food-trucks',
    myFoodTrucks: '/my-food-trucks',
    login: '/login',
    auth0: {
        callback: '/auth/auth/callback',
        login: '/auth/auth/login',
        logout: '/auth/auth/logout'
    },
    components: {
        AppBar: {
            visitor: [
                { name: 'Home', url: '/' },
                { name: 'Sign Up', url: '/signup' },
                { name: 'Login', url: '/api/auth/login' }
            ],
            customer: [
                { name: 'Home', url: '/' },
                { name: 'Profile', url: '/profile' },
                { name: 'Logout', url: '/api/auth/logout' }
            ]
        },
        NavigtionMenu: {
            visitor: [
                { name: 'Home', url: '/' },
                { name: 'Food Trucks', url: '/food-trucks' },
                { name: 'Sign Up', url: '/signup' },
                { name: 'Login', url: '/api/auth/login' }
            ],
            customer: [
                { name: 'Home', url: '/' },
                { name: 'Restaurants', url: '/restaurants' },
                { name: 'Dashboard', url: '/my-food-trucks' },
                // { name: 'My Reviews', url: '/reviews' },
                { name: 'Logout', url: '/api/auth/logout' }
            ],
            serviceProvider: [
                { name: 'Home', url: '/' },
                { name: 'Food Trucks', url: '/food-trucks' },
                { name: 'Dashboard', url: '/profile' },
                // { name: 'My Food Trucks', url: '/my-food-trucks' },
                { name: 'Logout', url: '/api/auth/logout' }
            ]
        },
        Dashboard: {
            basic: [
                { name: 'Personal Data', url: '/profile' },
                { name: 'My Reviews', url: '/reviews' },
                { name: 'My Orders', url: '/orders' }
            ],
            business: [
                { name: 'Food Trucks', url: '/my-food-trucks' },
                { name: 'Categories', url: '/categories' },
                { name: 'Reviews', url: '/business-reviews' },
                { name: 'Orders', url: '/business-orders' },
                { name: 'Events', url: '/{userId}/events' }
            ]
        },
        footer: [
            { name: 'Feedback', url: '/feedback' }
        ]
    },
    401: '/401',
    404: '/404',
    500: '/500'
};
