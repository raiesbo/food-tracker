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
                { name: 'Events', url: '/events' }
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
