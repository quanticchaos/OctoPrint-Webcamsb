# OctoPrint-Webcamsb
This plugin allows you to add up to 4 streaming URLs or snapshots to the sidebar of your Octoprint client.
This plugin doesn't interfere with the default Webcam stream in "Control" tab.
The plugin will try to automatically set itself on top of the sidebar (see notes).

## Changes

- 0.1.7 - Added highlight color to selected stream button. 
- 0.1.6 - Fixed 3AM version information error (forgot to update it in previous release, sorry).
- 0.1.5 - Fixed fullscreen image resizing error when resizing browser reported by offroadguy56.
- 0.1.4 - Added rotate image requested by the community (aspect is needed to be able to correctly fit the rotated image). 
  - Added the possibility to rename streams as requested by offroadguy56.
- 0.1.3 - Added flip image by request of the_real_orca.
- 0.1.2 - Small changes in CSS, Templates and Javascript.
- 0.1.1 - Special thanks to jneilliii for helping pointing issues and suggesting fixes. Implementation of some of his suggestions to avoid conflicts with his great Widescreen plugin.
- 0.1.0 - Added the possibility to add up to 4 different streams and see an expanded image clicking on the stream (see notes). 

## Notes

- As OutsourcedGuru pointed out on Octoprint's forum, depending on what you are using as an Octoprint server, you should be aware that you might not be able to use 4 USB streams without getting performance issues so, if you want to use more than one stream, the use of IP cameras or an external USB stream is recommended (You can attach multiple webcams to another RPI and stream them with ffmpeg, for example).  
- If you are using a plugin that re-orders elements of the sidebar, like OctoPrint-SidebarOrder, you can use plugin_webcamSB as the plugin identifier.

## Setup

Install via the bundled [Plugin Manager](https://github.com/foosel/OctoPrint/wiki/Plugin:-Plugin-Manager)
or manually using this URL:

    https://github.com/quanticchaos/OctoPrint-Webcamsb/archive/master.zip

## Configuration

If you already have a stream set as default webcam, the plugin will try to use it as its default and will use it till you change the FIRST stream URL.
You can change the name of the streams, flip or rotate the first two and select the default one in the plugin settings.
Until today, the plugin is barely using knockout so you'll need to save and refresh your browser to apply changes.
