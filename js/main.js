require.config({
    paths: {
        'box2d': 'vendor/Box2dWeb-2.1.a.3',
		'aug':   'vendor/aug.min'
    },
    shim: {
        'box2d': {
            exports: 'Box2D'
        },
		'aug': { 
			exports: 'aug'
		}
    }
});

require(['game'], function (){});
