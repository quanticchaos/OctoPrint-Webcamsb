# OctoPrint-Webcamsb
This plugin allows you to add a streaming URL to the sidebar of your Octoprint client in order to keep an eye on your print.
In version.
This plugin doesn't intefere with the default Webcam stream but if you don't define another stream in its preferences, it will also try to use that stream. 
The plugin will try to set itself on top of the sidebar.
Please reload your server after installing it. If you have any problerms after reloading Octoprint, try using CTRL+F5 to reload the webpage.

## Changes

- 0.1.1 - Special thanks to jneilliii for helping pointing issues and suggesting fixes. Implementation of some of his suggestions to avoid conflicts with his great Widescreen plugin.
- 0.1.0 - you can add up to 4 different streams and can see an expanded image clicking on the stream. 

## Notes

- As OutsourcedGuru pointed out on Octoprint's forum, depending on what you are using as an Octoprint server, you should be aware that you might not be able to use 4 USB streams without performance issues so, if you want to use more than one stream, the use of IP cameras or an external USB stream is recommended (You can attach multiple webcams to another RPI and stream them with ffmpeg, for example).  

## Setup

Install via the bundled [Plugin Manager](https://github.com/foosel/OctoPrint/wiki/Plugin:-Plugin-Manager)
or manually using this URL:

    https://github.com/quanticchaos/OctoPrint-Webcamsb/archive/master.zip

## Configuration

You can set your stream URL in Octoprint's settings.
