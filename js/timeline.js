
(function(){

	function TimeLine (parentId, content) {
		this.parentId = parentId || '';
		this.content = content || '';
		this.parentElem = (this.parentId) ? document.getElementById(parentId) : null;
	}

	TimeLine.prototype.createHTML = function () {

		var html = '';

		html += this.createButton();

		if (this.content) {
			for (var i = 0, amount = this.content.length; i < amount; i++) {
				html += this.createBlock(this.content[i]);
			}
		}

		html += this.createButton();

		if (this.parentElem) {
			this.parentElem.innerHTML = html;
		}


	}

	TimeLine.prototype.createButton = function(type) {

		var html = '';
		var buttonText = '+ expand all';

		html += '<button class="timeline-toggle">'+buttonText+'</button>';
		html +=	'<br class="clear">';

		return html;

	}

	TimeLine.prototype.createBlock = function(block) {

		var html = '';

		if (!block) {
			return '';
		}

		html += ['<div class="timeline-wrapper">',
				 '<h2 class="timeline-time"><span>'+block.decade+'</span></h2>',
				 '<dl class="timeline-series">'].join('');

		if (block['games']) {
			for (var i = 0, amount = block['games'].length; i < amount; i++) {
				html += this.createBlockItem(block['games'][i]);
			}	
		}

		html += ['</dl>', '</div>'].join('');


		return html;

	}

	TimeLine.prototype.createBlockItem = function(item) {

		var html = '';
		var nameLowerTrimmed = ''; // lowercase without spaces

		if (!item) {
			return '';
		}

		html += '<span class="tick tick-before"></span>';
		
		if (item.name) {

			nameLowerTrimmed = item.name.replace(/ /g,'').toLowerCase();

			html += '<dt id="'+nameLowerTrimmed+'"><a>'+ item.year +' - '+ item.name+'</a></dt>';	
		}
		
		html += '<span class="tick tick-after"></span>';
		html += '<dd class="timeline-event-content" id="'+nameLowerTrimmed+'EX" style="display: none;">';
		html += '<div class="media">';

		// add main image
		if (item.main_img) {

			var image_name = (item['main_img'].name) ? item['main_img'].name : item['main_img']; // temp
			html += '<img src="'+ this.getBaseImagePath(item) + image_name + '" alt="">';	
		}

		html += '</div>';	
		
		// add year
		html += '<p><b>Ano:</b> ' + item.year + '</p>';

		// adding authors
		if (item.authors.length > 0) {
			html += '<p><b>Criador:</b> ' + item.authors.join(', ') + '</p>';	
		}

		// adding resume
		if (item.resume) {
			html += '<p>' + item.resume + '</p>';
		}

		// adding video
		if (item.video_gameplay.length > 0) {
			html += '<p><b>';
			html += '<a href="'+item.video_gameplay[0].url+'" class="venobox_custom" data-type="youtube" data-overlay="rgba(0,0,0,0.5)">Gameplay Video</a>';
			html += '</b></p>';
		}

		// adding demos
		if (item.demos.length > 0) {
			html += '<p><b>'+ 'Demos:' +'</b></p>';
			html += '<ol>';
			for (var i=0, amount=item.demos.length; i < amount; i++) {
				html += '<li>' + '<a target="_blank" href="'+item.demos[i].url+'">' + item.demos[i].caption + '</a>' + '</li>';
			}
			html += '</ol>';
		}

		// adding references
		if (item.references.length > 0) {
			html += '<p><b>'+ 'Referências:' +'</b></p>';
			html += '<ol>';
			for (var i=0, amount=item.references.length; i < amount; i++) {
				html += '<li>' + '<a target="_blank" href="'+item.references[i].url+'">' + item.references[i].caption + '</a>' + '</li>';
			}
			html += '</ol>';
		}

		html += '<br class="clear">';
		html += '</dd>';

		return html;
	}

	TimeLine.prototype.getBaseImagePath = function(item) {

		var path = '';
		var nameLowerTrimmed = '';

		if (!item) {
			return '';
		}

		nameLowerTrimmed = item.name.replace(/ /g,'').toLowerCase();

		path = 'images/' + item.type + '/' + item.year +'/'+ nameLowerTrimmed + '/';

		return path;

	}


	// make it global
	if (!window.TimeLine) {
		window.TimeLine = TimeLine;	
	}
	

})();


