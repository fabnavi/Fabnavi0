class CameraAPI
  def initialize
  end

  def generateQuery op
    return "POST /sony/camera HTTP/1.1\r\nContent-Length: "+ op.length.to_s+ "\r\n\r\n" + op
  end

  def generateOp (type,params)
    if params == "[\"true\"]" then 
      params = "[true]" 
    end

    if params == "[\"false\"]" then 
      params = "[false]" 
    end
    op = "{\"method\":\""+type+"\",\"params\":"+params.to_s+",\"id\":10,\"version\":\"1.0\"}"
    return generateQuery op
  end

  def fire query
    save_pict "http://www.google.co.jp/imgres?imgurl=http%3A%2F%2Fwww.lisperati.com%2Flisplogo_alien_256.png&imgrefurl=http%3A%2F%2Fwww.lisperati.com%2Flogo.html&h=150&w=256&tbnid=btOUQId011ersM%3A&zoom=1&docid=Es_nEeQt--nrGM&hl=ja&ei=FPFXU9DYDIqlkgW2koCoCA&tbm=isch&client=firefox-a&ved=0CFIQMygBMAE&iact=rc&uact=3&dur=1543&page=1&start=0&ndsp=24"
    puts "***** Query: " + query
    s = TCPSocket.open($host, $port)
    s.print(query);
    s.flush
    body = s.read.split(/\r\n\r\n/)[1]
    s.close
    puts "***** Result: " + body
    JSON.parse(body)
  end
end

