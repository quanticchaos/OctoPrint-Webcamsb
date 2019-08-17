/*
 * View model for OctoPrint-Webcamsb
 *
 * Author: Luis Magar Brunner
 * License: AGPLv3
 */
$(function() {
    function WebcamSBViewModel(parameters) {
        var self = this;
		self.settings = parameters[0];
		self.onBeforeBinding = function() {
			var lacam = $("#sidewebcam");
			var set = self.settings.settings.plugins.webcamSB.url();
			if (set == "") {
				set = $('#settings-webcamStreamUrl').val();
			}
			if (set != "") { 
				set += "?" + new Date().getTime();
				lacam.attr("src", set);
			} else {
				$('#webcamsb').html("<p style='font-size:0.9em;text-align:center'>Stream not set</p>");
			}
		};
		self.onAfterBinding = function() {
			$('#sidebar_plugin_webcamSB_wrapper .accordion-heading a').prepend('<i class="fa icon-black fa-camera"/>');		
        };			
    };

    OCTOPRINT_VIEWMODELS.push({
        construct: WebcamSBViewModel,
        dependencies: ["settingsViewModel"],
        elements: ["#sidebar_plugin_webcamSB_wrapper"]
    });
});
