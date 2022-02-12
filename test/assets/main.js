$(function() {

var API_URL = '/public_test';
var API_REQUEST_PERIOD = 15000;

var $blocks = $('.block');
var langs = ['ru', 'en'];
var blocks = langs.map(function(lang, i) {
  return {
    lang: lang,
    container: $blocks.filter('.' + lang).find('.block-releases')
  };
});

var i18n = {
  server: {
    ru: 'Сервер',
    en: 'Server'
  }
};

var ClientType = {
  FLASH: 'FLASH',
  HTML5New: 'HTML5 New'
};



function createClientUrl(clientType, domain, lang) {
  var baseUrl = 'https://' + domain + '%PLACEHOLDER%' + 'config=https://c1.'
    + domain + '/config.xml&locale=' + lang + '&lang=' + lang;

  var baseUrlnew = 'https://' + domain + '%PLACEHOLDER%' + 'https://c{server}.'
      + domain + '/config.xml&resources=../resources&balancer=https://balancer.'+ domain + '/balancer';

  var partFlash = '/flash/index.html?';
  var partHtmlNew = '/browser-public/index.html?config-template=';

  switch (clientType) {
    case ClientType.FLASH:
      return baseUrl.replace('%PLACEHOLDER%', partFlash);
	case ClientType.HTML5New:
      return baseUrlnew.replace('%PLACEHOLDER%', partHtmlNew);
  }
}

function createReleaseBlock(releaseInfo, index, lang) {
  var template = [
    '<div class="release-block"><span class="server-label">',
    i18n.server[lang] + ' ' + index + ': ',
    releaseInfo.UserCount,
    '<span class="userpic-holder"><i class="icon-userpic"></i></span></span>',
    '<a class="client-button" href="' + createClientUrl(ClientType.FLASH, releaseInfo.Domain, lang) + '">',
    ClientType.FLASH,
    '</a>',
	  '<a class="client-button" href="' + createClientUrl(ClientType.HTML5New, releaseInfo.Domain) + '">',
    ClientType.HTML5New,
    '</a>',
    '</div>'
  ].join('');
  return $(template);
}

function tick() {
  $.getJSON(API_URL + '?v=' + Date.now(), function(releases) {
    blocks.forEach(function(_block) {
      _block.container.empty();
      $.each(releases, function(index, releaseInfo) {
        _block.container.append(createReleaseBlock(releaseInfo, index + 1, _block.lang));
      });
    });
  });
}

tick();
window.setInterval(tick, API_REQUEST_PERIOD);
});
