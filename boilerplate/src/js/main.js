require.config({
    baseUrl: './assets/js',
    paths: {
        app: 'app',
        // Libraries
        jquery: '//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min'
    }
});

require(['app']);