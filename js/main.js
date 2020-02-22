$.noConflict();

(function($) {
	try {
		// Submit Contact Form
		var contactFormSubmit = function () {
			$(document).on('click', '#contactFormSubmitButton', function (e) {
				e.preventDefault();
				var contactFormData = $('#contact-form').serialize();
				$.ajax({
					type: 'POST',
					url: 'https://u04coj5ojl.execute-api.eu-west-1.amazonaws.com/prod/message',
					data: contactFormData,
					success: function(msg) {
						$('#contact-form').find('input[type=text], input[type=email], textarea').prop('disabled', true);
						$('#contact-form > div.buttons-set').hide();
						$('.contactFormSuccess').show();
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						$('#contact-form').find('input[type=text], input[type=email], textarea').prop('disabled', true);
						$('#contact-form > div.buttons-set').hide();
						$('.contactFormError').show();
					}
				});
			});
		};
		// Submit Newsletter Form
		var newsletterFormSubmit = function () {
			$(document).on('click', '#footer-newsletter > div.buttons-set > button', function (e) {
				e.preventDefault();
				var newsletterFormData = $('#newsletter-email').val();
				$.ajax({
					type: 'POST',
					url: 'https://u04coj5ojl.execute-api.eu-west-1.amazonaws.com/prod/message',
					data: 'name=Newsletter&email=&subject=newsletter&message=' + newsletterFormData,
					success: function(msg){
						$('#footer-newsletter').hide();
						$('.newsletterFormSuccess').show();
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						$('#footer-newsletter').hide();
						$('.newsletterFormError').show();
					}
				});
			});
		};
		// Anchor Smooth Scroll
		var smoothScrolling = function () {
			$(document).on('click', 'a[href^="#"]', function (e) {
				var id = $(this).attr('href');
				if ($(id).length === 0) {
					return;
				}
				e.preventDefault();
				var pos = $(id).offset().top - 10;
				$('body, html').animate(
					{scrollTop: pos},
					800,
					'swing'
				);
			});
		};
		// Initialize functions
		(function initialize () {
			smoothScrolling();
			contactFormSubmit();
			newsletterFormSubmit();
		})();
	} catch (err) {
		console.log(err);
	}
})(jQuery);
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
           .register('./service-worker.js')
           .then(function() { console.log('Service Worker Registered'); });
}
