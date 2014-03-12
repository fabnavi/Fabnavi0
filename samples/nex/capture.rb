#!/usr/bin/ruby
#
# nex6-capture.rb - sample program for Sony NEX-6 (Smart Remocon App)
#
require "socket"
require 'json'
require "pp"
require "open-uri"
require "uri"
 
$host = "10.0.0.1"
$port = 10000
 
# enable preview
#s = TCPSocket.open($host, $port)
#s.print("POST /sony/camera HTTP/1.1\r\nContent-Length: 60\r\n\r\n{\"method\":\"startRecMode\",\"params\":[],\"id\":5,\"version\":\"1.0\"}")
#s.flush
#body = s.read.split(/\r\n\r\n/)[1]
#p JSON.parse(body)
#s.close
 
# waiting for starting preview...?
# sleep 7
 
s = TCPSocket.open($host, $port)
s.print("POST /sony/camera HTTP/1.1\r\nContent-Length: 62\r\n\r\n{\"method\":\"getShootMode\",\"params\":[],\"id\":0,\"version\":\"1.0\"}")
s.flush
# \"actZoom\"
#body = s.read.split(/\r\n\r\n/)[1]
#puts body;
s.close

# zoom
s = TCPSocket.open($host, $port)
s.print("POST /sony/camera HTTP/1.1\r\nContent-Length: 65\r\n\r\n{\"method\":\"actZoom\",\"params\":[100000],\"id\":0,\"version\":\"1.0\"}")
s.flush
#body = s.read.split(/\r\n\r\n/)[1]
#puts body;
s.close

# sleep 3

# take picture
s = TCPSocket.open($host, $port)
s.print("POST /sony/camera HTTP/1.1\r\nContent-Length: 63\r\n\r\n{\"method\":\"actTakePicture\",\"params\":[],\"id\":10,\"version\":\"1.0\"}")
s.flush
body = s.read.split(/\r\n\r\n/)[1]
doc = JSON.parse(body)
s.close
 
# {"id":10,"result":[["http://192.168.122.1:8080/postview/pict20130614_175010_0.JPG"]]}
result_url = doc["result"][0][0]
result_url = URI.unescape(result_url);
puts doc
result_filename = File.split(result_url)[1]
 
# download picture
jpeg = open(result_url).read
open(result_filename, "wb"){|f|f.write(jpeg)}
 
puts "capture image=#{result_filename}"
