require.config({
    baseUrl: './assets/js',

    paths: {
        // App (kicks things off)
        app: 'app',

        // Libraries (third party stuff)
        jquery: 'vendor/jquery',
    },

    shim: {
    }

});


require(['app']);