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
		self.expanded_cam = 0; //Change suggested by jneilliii
		self.onBeforeBinding = function() {	
			self.streams = [self.settings.settings.plugins.webcamSB.url(),self.settings.settings.plugins.webcamSB.url1(),self.settings.settings.plugins.webcamSB.url2(),self.settings.settings.plugins.webcamSB.url3()];		
			var num_cams = 0;
			var def_cam = self.settings.settings.plugins.webcamSB.defaultCam();
			if (self.streams[0] == "") self.streams[0] = $('#settings-webcamStreamUrl').val();
			var botones = document.createElement("div");
			botones.setAttribute("id","webcsb_botones");
			$(botones).append("Stream: ");
			for (var x=0; x<=3; x++) {
				if (self.streams[x] != "") {
					$(botones).append('<button class="btn" data-bind="click: wcsb_cargaCam.bind($data, '+x+')">'+(x+1)+'</button>');
					num_cams++;
				}
			}	
			if (num_cams > 1) $('#webcamsb').append(botones);
			if (num_cams == 0) {
				$('#webcamsb').html("<p style='font-size:0.9em;text-align:center'>Stream not set</p>"); return;
			}
			var x = 3;
			while (x >= 0) {
				if (def_cam == x+1 && self.streams[x] == "") {
					def_cam--; x--; continue; 
				} else {
					self.wcsb_cargaCam(def_cam-1);
					break;
				}
				x--;
			}
		};
		self.wcsb_cargaCam = function(cual) {
			var str = self.streams[cual];
			var lacam = $("#sidewebcam"); 
			str += "?" + new Date().getTime();
			lacam.attr("src", str);	
		}
		self.wcsbPOC = function() {
			var posl = 0; var post = 0;
			var tamw = '100%';
			var pos = 'relative';
			var tamh = 'auto';
			if (self.settings.settings.plugins.webcamSB.expand() == 1) {
				if (self.expanded_cam > 0) { 
					tamw = '100%'; tamh = 'auto'; pos = 'relative'; posl= 0; post = 0;
					$('#wcsb_bk').remove();
					self.expanded_cam = 0;
				} else { 
					tamw = 'auto'; tamh = ($(window).height()-20)+'px'; pos = 'fixed'; posl = 0; post = 10;
					$('#webcamsb').append('<div id="wcsb_bk"></div>');
					$('#wcsb_bk').css({"display":"block","position":"fixed","background-color":"#000","left":0,"top":0,"width":"100%","height":"100%","z-index":9});
					$('#wcsb_bk').fadeTo("fast", 0.50);	
					self.expanded_cam = 1;
				}
				$('#webcamsb').css({"position":"relative"});
				$('#sidewebcam').css({"display":"block","position":pos,"z-index":10,"width":tamw,"height":tamh,"left":posl,"top":post});
				if (self.expanded_cam > 0) {
					posl=(($(window).width()-$('#sidewebcam').width())/2);
					$('#sidewebcam').css("left",posl);
				}
			}
		}
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