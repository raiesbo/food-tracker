export const paths = {
    home: '/',
    aboutUs: '/about-us',
    restaurants: '/restaurants',
    myFoodTrucks: '/my-food-trucks',
    login: '/login',
    auth0: {
        callback: '/auth/auth/callback',
        login: '/auth/auth/login'
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
                { name: 'Restaurants', url: '/restaurants' },
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
                { name: 'Restaurants', url: '/restaurants' },
                { name: 'Dashboard', url: '/profile' },
                // { name: 'My Food Trucks', url: '/my-food-trucks' },
                { name: 'Logout', url: '/api/auth/logout' }
            ]
        },
        Dashboard: {
            basic: [
                { name: 'Personal Data', url: '/profile', icon: 'AccountBoxIcon' },
                { name: 'My Reviews', url: '/reviews', icon: 'RateReviewIcon' },
                { name: 'My Orders', url: '/orders', icon: 'ShoppingCartIcon' }
            ],
            business: [
                { name: 'Food Trucks', url: '/my-food-trucks', icon: 'StorefrontIcon' },
                { name: 'Reviews', url: '/business-reviews', icon: 'RateReviewIcon' },
                { name: 'Orders', url: '/business-orders', icon: 'FilterFramesIcon' },
                { name: 'Events', url: '/events', icon: 'EventAvailableIcon' }
            ]
        },
        footer: {
            feedback: '/feedback'
        }
    },
    401: '/401',
    404: '/404',
    500: '/500'
};
