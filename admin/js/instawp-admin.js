(function( $ ) {
	'use strict';
	
	var token;
	var account_id;

	function getCookie(name) {
		var value = "; " + document.cookie;
		var parts = value.split("; " + name + "=");
		if (parts.length == 2) return parts.pop().split(";").shift();
	}

	function getAccount(token) {
		var settings = {
			"async": true,
			"crossDomain": true,
			"url": "https://api.instascaler.com/v2/users/me",
			"method": "GET",
			"headers": {
				"origin": "https://dashboard.instascaler.com",
				"authorization": token,
				"content-type": "application/json",
				"authority": "api.instascaler.com",
			}
		}
		return $.ajax(settings)
	}

	window.instawpLogin = function (e) {
		$.ajax({
			type: "POST",
			url: "https://api.instascaler.com/v2/users/signin",
			data: $("#sign-in-form").serialize(),
			dataType: "json"
		}).done(function (auth_response) {
			token = auth_response.access_token;
			document.cookie = "accessToken=" + token;
			getAccount(token)
				.done(function (account_response) {
					reload_iframe(account_response, token);
				});
		}).fail(function () {
			$(".error-message").show();
		});
		function reload_iframe(account_response, token) {
			account_id = account_response.user_role.account;
			document.cookie = "account_id=" + account_id;
			$("#sign-in-form").hide();
			$(".instascaler-image").hide();
			$(".form-container").hide();
			$("#dashboard-frame").show();
			$("#dashboard-frame").on("click", function() {
				window.open("https://dashboard.instascaler.com/report?token=" + token + "&id=" + account_id + "&email=undefined", '_blank');
			});
		}
	}

	$(function () {
		$("<div class=\"instascaler-image\"></div>\
			<div class=\"form-container\">\
				<div class=\"login-message\">\
					<h1>Log In to InstaScaler</h1>\
					<p>Enter your details below</p>\
				</div>\
				<form class=\"uk-form\" class=\"signup-form-container\" id=\"sign-in-form\" onsubmit=\"return false\">\
						<div class=\"uk-margin\">\
							<label class=\"uk-form-label input-label\" for=\"email\">Email <span class=\"label-required\">*</span></label>\
							<input placeholder=\"Enter your Email\" required type=\"email\" name=\"email\" id=\"user\" class=\"uk-input\" />\
						</div>\
						<div class=\"uk-margin\">\
							<label class=\"uk-form-label input-label\" for=\"password\">Password <span class=\"label-required\">*</span></label>\
							<div class=\"password-input-container\">\
									<input placeholder=\"Enter your Password\" required type=\"password\" name=\"password\" id=\"password\" class=\"uk-input password-input\" />\
									<div class=\"password-icon\">\
										<span toggle=\"#password\" class=\"uk-icon uk-icon-image icon-eye toggle-password\"></span>\
									</div>\
							</div>\
						</div>\
						<div class=\"uk-margin-small-top uk-margin-small-bottom uk-tile uk-tile-muted uk-padding-small error-message\">\
							<q class=\"uk-text-danger\">I don\'t recognize your email address! Please make sure it\'s correct and try again.</q>\
						</div>\
						<div class=\"uk-margin-medium-top\">\
							<button type=\"submit\" value=\"submit\" onclick=\"instawpLogin()\"  name=\"action\" class=\"_2dmJpinx5w0oqdltX4QKfA _1VwRz6D0-Lvmb12IJ7U4CQ auth\">Log In</button>\
						</div>\
						<div class=\"external-links\">\
							<a href=\"https://dashboard-testing.instascaler.com/forgetpassword\" target=\"_blank\">Forgot your password?</a>\
							<p>Need an account on InstaScaler?<a class=\"createAccount\" href=\"https://dashboard-testing.instascaler.com/signup\" target=\"_blank\">Create an account</a></p>\
						</div>\
				</form>\
				<div class=\"signup-footer uk-text-center\">\
							<div class=\"term-condition\">\
								<a href=\"https://instascaler.com/terms\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"terms-links\">Terms &amp; Conditions</a>\
								<a href=\"https://instascaler.com/privacy\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"privacy-link\">Privacy Policy</a>\
							</div>\
							<p class=\"signup-footer-p\">Copyright 2018. InstaScaler All Rights Reserved.</p>\
				</div>\
			</div>\
			<div id=\"dashboard-frame\">\
				<div>\
					<p>\
						You are now logged in.\
					</p>\
					<button class=\"_2dmJpinx5w0oqdltX4QKfA _1VwRz6D0-Lvmb12IJ7U4CQ\">Open Dashboard</button>\
				</div>\
			</div>\
			").appendTo(".page-container").hide();

		$(".toggle-password").click(function () {
			var input = $($(this).attr("toggle"));
			if (input.attr("type") == "password") {
				input.attr("type", "text");
			} else {
				input.attr("type", "password");
			}
		});

		if (getCookie("accessToken")) {
			var token = getCookie("accessToken");
			getAccount(token)
				.done(function (account_response) {
					$("#sign-in-form").hide();
					$(".instascaler-image").hide();
					$(".form-container").hide();
					$("#dashboard-frame").show();
					account_id = getCookie("account_id");
					$("#dashboard-frame").on("click", function () {
						window.open("https://dashboard.instascaler.com/report?token=" + token + "&id=" + account_id + "&email=undefined", '_blank');
					});
				}).fail(function () {
					$("#sign-in-form").show();
					$(".signup-footer").show();
					$(".instascaler-image").show();
					$(".form-container").show();
					$("#dashboard-frame").hide();
				});
		} else {
			$("#sign-in-form").show();
			$(".signup-footer").show();
			$(".instascaler-image").show();
			$(".form-container").show();
			$("#dashboard-frame").hide();
		}
	});

})( jQuery );
