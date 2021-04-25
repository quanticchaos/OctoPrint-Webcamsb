# coding=utf-8
from __future__ import absolute_import

import octoprint.plugin


class WebcamSBPlugin(octoprint.plugin.StartupPlugin,
					 octoprint.plugin.AssetPlugin,
					 octoprint.plugin.TemplatePlugin,
					 octoprint.plugin.SettingsPlugin):

	def on_after_startup(self):
		self._logger.info("Sidebar Webcam LOADED");
		orden_sidebar = self._settings.global_get(["appearance", "components", "order", "sidebar"])
		if "plugin_webcamSB" in orden_sidebar:
			orden_sidebar.remove("plugin_webcamSB")
		nuevo_orden = ["plugin_webcamSB"] + orden_sidebar
		self._settings.global_set(["appearance", "components", "order", "sidebar"], nuevo_orden)

	def on_plugin_enabled(self):
		pass

	def get_settings_defaults(self):
		return dict(url="", url1="", url2="", url3="", expand=1, defaultCam=1, f1x=0, f1z=0, f2x=0, f2z=0, rot1=0,
					rot2=0, name="1", name1="2", name2="3", name3="4", selector=1, asp1=1, asp2=1, its1=1, its2=1)

	def get_assets(self):
		return dict(
			js=["js/webcamsb.js"],
			css=["css/webcamsb.css"]
		)

	def get_template_configs(self):
		return [
			dict(type="sidebar", name="Stream", template="webcamsb_sidebar.jinja2", custom_bindings=False),
			dict(type="settings", name="Sidebar Webcam", template="webcamsb_settings.jinja2", custom_bindings=False)
		]

	def get_template_vars(self):
		return dict(webcamStream=self._settings.global_get(["webcam", "stream"]))

	##~~ Softwareupdate hook

	def get_update_information(self):
		return dict(
			webcamSB=dict(
				displayName="Sidebar Webcam",
				displayVersion=self._plugin_version,

				# version check: github repository
				type="github_release",
				user="quanticchaos",
				repo="OctoPrint-Webcamsb",
				current=self._plugin_version,

				# update method: pip
				pip="https://github.com/quanticchaos/OctoPrint-Webcamsb/archive/{target_version}.zip"
			)
		)


# If you want your plugin to be registered within OctoPrint under a different name than what you defined in setup.py
# ("OctoPrint-PluginSkeleton"), you may define that here. Same goes for the other metadata derived from setup.py that
# can be overwritten via __plugin_xyz__ control properties. See the documentation for that.
__plugin_name__ = "Sidebar Webcam"
__plugin_pythoncompat__ = ">=2.7,<4"


def __plugin_load__():
	# Change suggested by jneilliii
	# global __plugin_settings_overlay__
	# __plugin_settings_overlay__ = dict(appearance=dict(components=dict(order=dict(sidebar=["plugin_webcamSB"]))))
	#
	global __plugin_implementation__
	__plugin_implementation__ = WebcamSBPlugin()
	global __plugin_hooks__
	__plugin_hooks__ = {
		"octoprint.plugin.softwareupdate.check_config": __plugin_implementation__.get_update_information
	}
