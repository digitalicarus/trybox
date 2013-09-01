require.config({
    paths: {
        'box2d': 'vendor/box2d'
    },
    shim: {
        'box2d': {
            exports: 'Box2D'
        }
    }
});
require(['game'], function (){});
