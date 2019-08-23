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
		self.expanded_cam = ko.observable(false); //Change suggested by jneilliii
		self.onBeforeBinding = function() {
			$('#webcamsb').html('<img id="sidewebcam" src="" data-bind="click: wcsbPOC">');
			var u = [self.settings.settings.plugins.webcamSB.url(),self.settings.settings.plugins.webcamSB.url1(),self.settings.settings.plugins.webcamSB.url2(),self.settings.settings.plugins.webcamSB.url3()];
			var num_cams = 0;
			var def_cam = self.settings.settings.plugins.webcamSB.defaultCam();
			if (u[0] == "") u[0] = $('#settings-webcamStreamUrl').val();
			if (u[1] != "" || u[2] != "" || u[3] != "") { 
				$('#webcamsb').prepend('<div id="webcsb_botones"></div>');
			}
			if (u[0] != "") {
				$('#webcsb_botones').append('<button class="btn" data-bind="click: wcsbSC1">Cam 1</button>');
				num_cams++;
			}
			if (u[1] != "") {
				$('#webcsb_botones').append('<button class="btn" data-bind="click: wcsbSC2">Cam 2</button>');
				num_cams++;
			}			
			if (u[2] != "") {
				$('#webcsb_botones').append('<button class="btn" data-bind="click: wcsbSC3">Cam 3</button>');
				num_cams++;
			}
			if (u[3] != "") {
				$('#webcsb_botones').append('<button class="btn" data-bind="click: wcsbSC4">Cam 4</button>');
				num_cams++;
			}		
			if (num_cams < 2) $('#webcsb_botones').remove();
			if (num_cams == 0) {
				$('#webcamsb').html("<p style='font-size:0.9em;text-align:center'>Stream not set</p>"); return;
			}
			var x = 3;
			while (x >= 0) {
				if (def_cam == x+1 && u[x] == "") {
					def_cam--; x--; continue; 
				} else {
					self.wcsb_cargaCam(def_cam);
					break;
				}
				x--;
			}
		};
		self.wcsb_cargaCam = function(cual) {
			var str = "";
			if (cual == 1) {
				str = self.settings.settings.plugins.webcamSB.url();
				if (str == "") str = $('#settings-webcamStreamUrl').val();
			}
			if (cual == 2) str = self.settings.settings.plugins.webcamSB.url1();
			if (cual == 3) str = self.settings.settings.plugins.webcamSB.url2();
			if (cual == 4) str = self.settings.settings.plugins.webcamSB.url3();
			var lacam = $("#sidewebcam"); 
			str += "?" + new Date().getTime();
			lacam.attr("src", str);	
		}		
		self.wcsbSC1 = function() { self.wcsb_cargaCam(1); }
		self.wcsbSC2 = function() { self.wcsb_cargaCam(2); }
		self.wcsbSC3 = function() { self.wcsb_cargaCam(3); }
		self.wcsbSC4 = function() { self.wcsb_cargaCam(4); }
		self.wcsbPOC = function() {
			var posl = 0; var post = 0;
			var tamw = '100%';
			var pos = 'relative';
			var tamh = 'auto';
			if (self.settings.settings.plugins.webcamSB.expand() == 1) {
				if (self.expanded_cam()) { 
					tamw = '100%'; tamh = 'auto'; pos = 'relative'; posl= 0; post = 0;
					$('#wcsb_bk').remove();
					self.expanded_cam(false);
				} else { 
					tamw = 'auto'; tamh = ($(window).height()-20)+'px'; pos = 'fixed'; posl = 0; post = 10;
					$('#webcamsb').append('<div id="wcsb_bk"></div>');
					$('#wcsb_bk').css({"display":"block","position":"fixed","background-color":"#000","left":0,"top":0,"width":"100%","height":"100%","z-index":9});
					$('#wcsb_bk').fadeTo("fast", 0.50);	
					self.expanded_cam(true);
					//self.expanded = 1;
				}
				$('#webcamsb').css({"position":"relative"});
				$('#sidewebcam').css({"display":"block","position":pos,"z-index":10,"width":tamw,"height":tamh,"left":posl,"top":post});
				if (self.expanded_cam()) {
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
