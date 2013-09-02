define(['box2d', 'aug'], function (b2, aug) {
	var canvas        = document.createElement('canvas')
	,   ctx           = canvas.getContext('2d')
	,   body          = document.body
	,   b2            = {} // flattened box2dweb
	,   b2ClassRegex  = /^b2/
	,   i             = 0 // general purpose iterators
	,   j             = 0 // general purpose iterators
	;

	function isEmptyObj (obj) {
		var name;
		for (name in obj) {
			return false;
		}
		return true;
	}

	// box2dweb has annoying namespaces around all the juicy classes
	// this function flattens namespaces based on typeof and a regex
	function flatter (obj, match, replaceWhat, replaceWith) {
		var replace       = (replaceWhat && replaceWhat instanceof RegExp && typeof replaceWith === 'string')
		,   tmp           = null // description - a tmp variable
		;
		
		function getJuicyObject (obj) {
			var children = {}
			,   juicyChildren = {}
			;

			// recurse over all JavaScripts children, but honor those who conform to the mighty regex
			for (i in obj) {
				if (obj.hasOwnProperty(i)) {
					if (typeof obj[i] === 'object') {
						children[i] = obj[i];
					}

					if (match.test(i)) {
						tmp = (replace) ? i.replace(replaceWhat, replaceWith) : i;
						juicyChildren[tmp] = obj[i];
					}
				}
			}

			// no more children, just return the juicy ones
			if (isEmptyObj(children)) {
				return juicyChildren;
			}

			// merge any subsequent juicy children with current
			for (i in children) {
				juicyChildren = aug(juicyChildren, getJuicyObject(children[i]));
			}

			return juicyChildren;
		}

		return getJuicyObject(obj);
	}

	canvas.width = 640;
	canvas.height = 300;
	body.appendChild(canvas);
	
	return {
		Box2D:      Box2D,
		b2:         flatter(Box2D, b2ClassRegex, b2ClassRegex, ''),
		aug:        aug,
		canvas:     canvas,
		flatter:    flatter,
		isEmptyObj: isEmptyObj,
		ctx:        ctx
	};
});
